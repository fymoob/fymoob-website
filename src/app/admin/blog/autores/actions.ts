"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import {
  authorInputSchema,
  type AuthorInput,
} from "@/lib/schemas/author"
import {
  uploadImage,
  removeFile,
  pathFromPublicUrl,
  isUploadError,
} from "@/lib/supabase-storage"
import { slugify } from "@/lib/utils"

export interface ActionResult {
  ok: boolean
  message?: string
  fieldErrors?: Record<string, string>
  id?: string
}

/**
 * Auth guard reusavel. Throws redirect pra login se nao autenticado.
 */
async function requireAdmin(): Promise<{ email: string }> {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/admin/login")
  }
  return { email: session.user.email }
}

/**
 * Coleta input de form em shape AuthorInput. Lida com array de expertise (chips
 * separados por virgula) e social_links (campos individuais).
 */
function parseAuthorForm(formData: FormData): {
  data: Partial<AuthorInput>
  raw: { photoFile?: File | null; photoExistingUrl?: string }
} {
  const get = (k: string) => {
    const v = formData.get(k)
    return typeof v === "string" ? v.trim() : ""
  }

  const expertiseRaw = get("expertise")
  const expertise = expertiseRaw
    ? expertiseRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : []

  const social_links = {
    linkedin: get("social_linkedin") || undefined,
    instagram: get("social_instagram") || undefined,
    twitter: get("social_twitter") || undefined,
    website: get("social_website") || undefined,
  }

  const slugRaw = get("slug")
  const nameRaw = get("name")
  const slug = slugRaw || (nameRaw ? slugify(nameRaw) : "")

  const data: Partial<AuthorInput> = {
    slug,
    name: nameRaw,
    role: (get("role") || "Corretor de Imóveis") as AuthorInput["role"],
    creci: get("creci") || null,
    bio_short: get("bio_short") || null,
    photo_alt: get("photo_alt") || null,
    email: get("email") || null,
    expertise,
    social_links,
  }

  const photoFileEntry = formData.get("photo")
  const photoFile =
    photoFileEntry instanceof File && photoFileEntry.size > 0
      ? photoFileEntry
      : null

  return {
    data,
    raw: {
      photoFile,
      photoExistingUrl: get("photo_url_existing") || undefined,
    },
  }
}

// ───────────────────────────────────────────────────────────────────
// CREATE
// ───────────────────────────────────────────────────────────────────

export async function createAuthor(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin()
  const { data, raw } = parseAuthorForm(formData)

  // Foto e obrigatoria pra autor (E-E-A-T) — schema permite null mas UI exige
  if (!raw.photoFile) {
    return { ok: false, message: "Selecione uma foto do autor (obrigatoria pra E-E-A-T)." }
  }

  // Upload da foto antes da insercao do registro
  const upload = await uploadImage("authors", raw.photoFile, {
    subfolder: data.slug || "novo",
  })
  if (isUploadError(upload)) {
    return { ok: false, message: upload.error }
  }
  const photoData = {
    photo_url: upload.url,
    photo_alt: data.photo_alt || `Foto de ${data.name ?? "autor"}`,
  }

  const parsed = authorInputSchema.safeParse({ ...data, ...photoData })
  if (!parsed.success) {
    // Cleanup do upload — registro nao foi criado
    await removeFile("authors", upload.path)
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path.join(".")] = issue.message
    }
    return {
      ok: false,
      message: "Verifique os campos do formulario.",
      fieldErrors,
    }
  }

  const sb = getSupabaseAdmin()
  const { data: inserted, error } = await sb
    .from("authors")
    .insert({
      ...parsed.data,
      // Postgres devolve `null` por default em campos opcionais
    })
    .select("id")
    .single()

  if (error || !inserted) {
    await removeFile("authors", upload.path)
    if (error?.code === "23505") {
      return { ok: false, message: "Ja existe um autor com este slug. Escolha outro." }
    }
    return { ok: false, message: error?.message ?? "Falha ao criar autor." }
  }

  revalidateTag(`autor:${parsed.data.slug}`, { expire: 0 })
  revalidatePath("/admin/blog/autores")
  redirect(`/admin/blog/autores/${inserted.id}?ok=1`)
}

// ───────────────────────────────────────────────────────────────────
// UPDATE
// ───────────────────────────────────────────────────────────────────

export async function updateAuthor(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin()
  const id = String(formData.get("id") ?? "")
  if (!id) return { ok: false, message: "ID do autor ausente." }

  const { data, raw } = parseAuthorForm(formData)

  let photoData: { photo_url?: string; photo_alt?: string | null } = {}
  let oldPathToRemove: string | null = null

  if (raw.photoFile) {
    const upload = await uploadImage("authors", raw.photoFile, {
      subfolder: data.slug || id,
    })
    if (isUploadError(upload)) {
      return { ok: false, message: upload.error }
    }
    photoData = {
      photo_url: upload.url,
      photo_alt: data.photo_alt || `Foto de ${data.name ?? "autor"}`,
    }
    if (raw.photoExistingUrl) {
      oldPathToRemove = pathFromPublicUrl(raw.photoExistingUrl, "authors")
    }
  } else if (raw.photoExistingUrl) {
    photoData = {
      photo_url: raw.photoExistingUrl,
      photo_alt: data.photo_alt || null,
    }
  }

  const parsed = authorInputSchema.safeParse({ ...data, ...photoData })
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path.join(".")] = issue.message
    }
    return {
      ok: false,
      message: "Verifique os campos do formulario.",
      fieldErrors,
    }
  }

  const sb = getSupabaseAdmin()
  const { error } = await sb
    .from("authors")
    .update(parsed.data)
    .eq("id", id)

  if (error) {
    if (error.code === "23505") {
      return { ok: false, message: "Slug ja em uso por outro autor." }
    }
    return { ok: false, message: error.message }
  }

  // Limpa foto antiga apenas APOS update bem-sucedido (ordem importa)
  if (oldPathToRemove) {
    await removeFile("authors", oldPathToRemove)
  }

  revalidateTag(`autor:${parsed.data.slug}`, { expire: 0 })
  revalidatePath("/admin/blog/autores")
  revalidatePath(`/admin/blog/autores/${id}`)
  return { ok: true, message: "Autor atualizado.", id }
}

// ───────────────────────────────────────────────────────────────────
// DELETE
// ───────────────────────────────────────────────────────────────────

/**
 * Bloqueia exclusao se houver artigos publicados/draft do autor — sugere
 * arquivar ou reatribuir antes. Limpa foto do storage apos delete.
 */
export async function deleteAuthor(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin()
  const id = String(formData.get("id") ?? "")
  if (!id) return { ok: false, message: "ID ausente." }

  const sb = getSupabaseAdmin()

  // Guard: artigos referenciam o autor? FK e ON DELETE RESTRICT — falharia
  // no DB de qualquer forma, mas mensagem amigavel aqui.
  const { count } = await sb
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("author_id", id)

  if ((count ?? 0) > 0) {
    return {
      ok: false,
      message: `Este autor tem ${count} artigo(s) vinculado(s). Reatribua ou arquive antes de excluir.`,
    }
  }

  // Pega URL da foto antes do delete pra cleanup
  const { data: existing } = await sb
    .from("authors")
    .select("photo_url, slug")
    .eq("id", id)
    .maybeSingle()

  const { error } = await sb.from("authors").delete().eq("id", id)
  if (error) return { ok: false, message: error.message }

  if (existing?.photo_url) {
    const path = pathFromPublicUrl(existing.photo_url, "authors")
    if (path) await removeFile("authors", path)
  }
  if (existing?.slug) {
    revalidateTag(`autor:${existing.slug}`, { expire: 0 })
  }
  revalidatePath("/admin/blog/autores")
  redirect("/admin/blog/autores?deleted=1")
}
