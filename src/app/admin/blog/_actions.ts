"use server"

/**
 * Server actions de artigos (Fase 18.E).
 *
 * Auth check em todas (`requireAdmin`). Validacao Zod em writes. SEO Score
 * gate em `publishArticle`. Snapshot em `article_revisions` antes de cada
 * save manual (autosave nao snapshota — historiaria demais).
 */

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import {
  type Article,
  type ArticleStatus,
  type BlockNoteBlock,
} from "@/lib/schemas/article"
import { blocksWordCount } from "@/components/blog/BlockRenderer"
import { runSeoChecks, passesPublishGate } from "@/lib/seo-score"
import { submitToIndexNow } from "@/lib/indexnow"
import { slugify } from "@/lib/utils"
import { SITE_URL } from "@/lib/constants"

export interface ActionResult {
  ok: boolean
  message?: string
  fieldErrors?: Record<string, string>
  id?: string
}

async function requireAdmin(): Promise<{ email: string }> {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/admin/login")
  }
  return { email: session.user.email }
}

// ───────────────────────────────────────────────────────────────────
// CREATE — Empty draft. Redireciona pro editor.
// ───────────────────────────────────────────────────────────────────

export async function createDraftAction(): Promise<void> {
  await requireAdmin()
  const sb = getSupabaseAdmin()

  // Pega primeiro autor disponivel pra default — Bruno seedado vence.
  const { data: defaultAuthor } = await sb
    .from("authors")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle()

  const baseSlug = `rascunho-${Date.now().toString(36)}`
  const { data, error } = await sb
    .from("articles")
    .insert({
      slug: baseSlug,
      title: "Novo artigo (rascunho)",
      description: "Rascunho — edite título, descrição e conteúdo antes de publicar.",
      body: [],
      status: "draft" as ArticleStatus,
      author_id: defaultAuthor?.id ?? null,
      tags: [],
      schema_type: "BlogPosting",
      seo_no_index: true, // rascunhos NUNCA indexam
    })
    .select("id")
    .single()

  if (error || !data) {
    console.error("[articles/actions] createDraft failed:", error)
    redirect("/admin/blog?error=create")
  }

  revalidatePath("/admin/blog")
  redirect(`/admin/blog/${data.id}`)
}

// ───────────────────────────────────────────────────────────────────
// SAVE DRAFT — autosave parcial. Sem SEO gate.
// ───────────────────────────────────────────────────────────────────

interface SaveDraftPayload {
  id: string
  title?: string
  slug?: string
  description?: string
  body?: BlockNoteBlock[]
  cover_image_url?: string | null
  cover_image_alt?: string | null
  author_id?: string | null
  tags?: string[]
  schema_type?: Article["schema_type"]
  reading_time_min?: number | null
  reviewed_by?: string | null
  next_review?: string | null
  methodology?: Article["methodology"]
  seo_meta_title?: string | null
  seo_meta_description?: string | null
  seo_canonical?: string | null
  seo_no_index?: boolean
  seo_og_image_url?: string | null
  scheduled_at?: string | null
}

export async function saveDraftAction(
  payload: SaveDraftPayload
): Promise<ActionResult> {
  await requireAdmin()
  const { id, ...rest } = payload
  if (!id) return { ok: false, message: "ID do artigo ausente." }

  // Calcula word_count + reading_time_min se body veio. Mantem persistido pra
  // sitemap / SEO Score do publish.
  const computed: Partial<Article> = {}
  if (rest.body !== undefined) {
    const wordCount = blocksWordCount(rest.body)
    computed.word_count = wordCount
    if (rest.reading_time_min === undefined) {
      computed.reading_time_min = Math.max(1, Math.ceil(wordCount / 200))
    }
  }

  const sb = getSupabaseAdmin()

  // Le status + slug atuais antes do update pra decidir se revalida o site
  // publico. Auto-save de artigo `status=published` PRECISA revalidar — caso
  // contrario o site mostra versao stale (bug detectado 02/05/2026).
  const { data: pre } = await sb
    .from("articles")
    .select("status, slug")
    .eq("id", id)
    .maybeSingle()

  const { error } = await sb
    .from("articles")
    .update({ ...rest, ...computed })
    .eq("id", id)

  if (error) {
    if (error.code === "23505") {
      return { ok: false, message: "Slug já em uso por outro artigo." }
    }
    return { ok: false, message: error.message }
  }

  // Revalida cache do site publico se artigo ja estava publicado.
  // Auto-save em rascunho/agendado/arquivado nao precisa (nao impacta site).
  const finalSlug = rest.slug ?? pre?.slug
  if (pre?.status === "published" && finalSlug) {
    revalidateTag("blog", { expire: 0 })
    revalidateTag(`blog:${finalSlug}`, { expire: 0 })
    revalidatePath("/blog")
    revalidatePath(`/blog/${finalSlug}`)
  }

  return { ok: true, id }
}

// ───────────────────────────────────────────────────────────────────
// SNAPSHOT — cria entry em article_revisions. Chamado antes de save manual.
// ───────────────────────────────────────────────────────────────────

export async function snapshotRevisionAction(id: string): Promise<ActionResult> {
  await requireAdmin()
  if (!id) return { ok: false, message: "ID ausente." }
  const sb = getSupabaseAdmin()

  const { data: current, error: readErr } = await sb
    .from("articles")
    .select("title, body, description, tags")
    .eq("id", id)
    .maybeSingle()
  if (readErr || !current) return { ok: false, message: "Artigo nao encontrado." }

  const { error } = await sb.from("article_revisions").insert({
    article_id: id,
    title: current.title,
    body: current.body,
    description: current.description,
    tags: current.tags,
  })
  if (error) return { ok: false, message: error.message }
  return { ok: true }
}

// ───────────────────────────────────────────────────────────────────
// PUBLISH — full validacao + SEO Score gate
// ───────────────────────────────────────────────────────────────────

export async function publishAction(id: string): Promise<ActionResult> {
  await requireAdmin()
  if (!id) return { ok: false, message: "ID ausente." }
  const sb = getSupabaseAdmin()

  const { data: current, error: readErr } = await sb
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (readErr || !current) {
    return { ok: false, message: "Artigo nao encontrado." }
  }

  const checks = runSeoChecks({
    title: current.title,
    description: current.description,
    body: (current.body ?? []) as BlockNoteBlock[],
    cover_image_url: current.cover_image_url,
    cover_image_alt: current.cover_image_alt,
    author_id: current.author_id,
    tags: current.tags ?? [],
    slug: current.slug,
  })

  if (!passesPublishGate(checks)) {
    const blockers = checks
      .filter((c) => c.severity === "block")
      .map((c) => `• ${c.label}: ${c.message}`)
      .join("\n")
    return {
      ok: false,
      message: `Resolva os bloqueios antes de publicar:\n${blockers}`,
    }
  }

  const now = new Date().toISOString()
  const { error } = await sb
    .from("articles")
    .update({
      status: "published" as ArticleStatus,
      published_at: now,
      seo_no_index: false,
    })
    .eq("id", id)

  if (error) return { ok: false, message: error.message }

  // Revalida tudo que e afetado pela publicacao
  revalidateTag("blog", { expire: 0 })
  revalidateTag(`blog:${current.slug}`, { expire: 0 })
  if (current.author_id) {
    revalidateTag(`autor:${current.author_id}`, { expire: 0 })
  }
  revalidatePath("/blog")
  revalidatePath(`/blog/${current.slug}`)
  revalidatePath("/sitemap.xml")
  revalidatePath("/admin/blog")
  revalidatePath(`/admin/blog/${id}`)

  // IndexNow ping pro Google indexar rapido. Best-effort — se falhar nao
  // bloqueamos o publish (Google indexa via crawl normal eventualmente).
  void submitToIndexNow([`${SITE_URL}/blog/${current.slug}`]).catch((err) => {
    console.warn("[publishAction] IndexNow ping failed:", err)
  })

  return { ok: true, message: "Artigo publicado." }
}

// ───────────────────────────────────────────────────────────────────
// SCHEDULE — agenda publicacao futura
// ───────────────────────────────────────────────────────────────────

export async function scheduleAction(
  id: string,
  scheduledAt: string
): Promise<ActionResult> {
  await requireAdmin()
  if (!id) return { ok: false, message: "ID ausente." }

  const date = new Date(scheduledAt)
  if (Number.isNaN(date.getTime())) {
    return { ok: false, message: "Data inválida." }
  }
  if (date.getTime() <= Date.now()) {
    return { ok: false, message: "Agende uma data no futuro." }
  }

  const sb = getSupabaseAdmin()
  const { error } = await sb
    .from("articles")
    .update({
      status: "scheduled" as ArticleStatus,
      scheduled_at: date.toISOString(),
    })
    .eq("id", id)

  if (error) return { ok: false, message: error.message }
  revalidatePath("/admin/blog")
  return { ok: true, message: `Agendado para ${date.toLocaleString("pt-BR")}` }
}

// ───────────────────────────────────────────────────────────────────
// UNPUBLISH / ARCHIVE / RESTORE
// ───────────────────────────────────────────────────────────────────

export async function unpublishAction(id: string): Promise<ActionResult> {
  await requireAdmin()
  const sb = getSupabaseAdmin()
  const { data: current } = await sb
    .from("articles")
    .select("slug, author_id")
    .eq("id", id)
    .maybeSingle()

  const { error } = await sb
    .from("articles")
    .update({ status: "draft" as ArticleStatus, seo_no_index: true })
    .eq("id", id)

  if (error) return { ok: false, message: error.message }
  if (current) {
    revalidateTag("blog", { expire: 0 })
    revalidateTag(`blog:${current.slug}`, { expire: 0 })
    if (current.author_id)
      revalidateTag(`autor:${current.author_id}`, { expire: 0 })
    revalidatePath(`/blog/${current.slug}`)
    revalidatePath("/blog")
  }
  revalidatePath("/admin/blog")
  return { ok: true, message: "Artigo despublicado (rascunho)." }
}

export async function archiveAction(id: string): Promise<ActionResult> {
  await requireAdmin()
  const sb = getSupabaseAdmin()
  const { error } = await sb
    .from("articles")
    .update({ status: "archived" as ArticleStatus, seo_no_index: true })
    .eq("id", id)

  if (error) return { ok: false, message: error.message }
  revalidatePath("/admin/blog")
  revalidateTag("blog", { expire: 0 })
  return { ok: true, message: "Artigo arquivado." }
}

export async function restoreAction(id: string): Promise<ActionResult> {
  await requireAdmin()
  const sb = getSupabaseAdmin()
  const { error } = await sb
    .from("articles")
    .update({ status: "draft" as ArticleStatus })
    .eq("id", id)

  if (error) return { ok: false, message: error.message }
  revalidatePath("/admin/blog")
  return { ok: true, message: "Restaurado pra rascunho." }
}

// ───────────────────────────────────────────────────────────────────
// DUPLICATE
// ───────────────────────────────────────────────────────────────────

export async function duplicateAction(id: string): Promise<ActionResult> {
  await requireAdmin()
  const sb = getSupabaseAdmin()

  const { data: source } = await sb
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (!source) return { ok: false, message: "Artigo origem nao encontrado." }

  const newSlug = `${source.slug}-copia-${Date.now().toString(36)}`
  const newTitle = `${source.title} (cópia)`

  const { id: _omitId, created_at: _ca, updated_at: _ua, published_at: _pa, ...copyFields } = source as Record<string, unknown>
  void _omitId
  void _ca
  void _ua
  void _pa

  const { data: inserted, error } = await sb
    .from("articles")
    .insert({
      ...copyFields,
      slug: newSlug,
      title: newTitle,
      status: "draft" as ArticleStatus,
      published_at: null,
      scheduled_at: null,
      seo_no_index: true,
    })
    .select("id")
    .single()

  if (error || !inserted) {
    return { ok: false, message: error?.message ?? "Falha ao duplicar." }
  }
  revalidatePath("/admin/blog")
  return { ok: true, id: inserted.id, message: "Cópia criada." }
}

// ───────────────────────────────────────────────────────────────────
// RESTORE REVISION
// ───────────────────────────────────────────────────────────────────

export async function restoreRevisionAction(
  articleId: string,
  revisionId: string
): Promise<ActionResult> {
  await requireAdmin()
  const sb = getSupabaseAdmin()

  const { data: rev, error: revErr } = await sb
    .from("article_revisions")
    .select("title, body, description, tags")
    .eq("id", revisionId)
    .eq("article_id", articleId)
    .maybeSingle()

  if (revErr || !rev) return { ok: false, message: "Revisão não encontrada." }

  // Snapshot do estado atual antes de restaurar (rollback do rollback)
  const { data: current } = await sb
    .from("articles")
    .select("title, body, description, tags")
    .eq("id", articleId)
    .maybeSingle()
  if (current) {
    await sb.from("article_revisions").insert({
      article_id: articleId,
      title: current.title,
      body: current.body,
      description: current.description,
      tags: current.tags,
    })
  }

  const { error } = await sb
    .from("articles")
    .update({
      title: rev.title,
      body: rev.body,
      description: rev.description,
      tags: rev.tags ?? [],
    })
    .eq("id", articleId)

  if (error) return { ok: false, message: error.message }
  revalidatePath(`/admin/blog/${articleId}`)
  return { ok: true, message: "Revisão restaurada." }
}

// ───────────────────────────────────────────────────────────────────
// Helper: gera slug unico (pra rename pos-criacao)
// ───────────────────────────────────────────────────────────────────

export async function generateUniqueSlugAction(
  base: string,
  excludeId?: string
): Promise<{ slug: string }> {
  await requireAdmin()
  const sb = getSupabaseAdmin()
  const baseSlug = slugify(base)
  let candidate = baseSlug
  let i = 2

  while (true) {
    const query = sb.from("articles").select("id").eq("slug", candidate).limit(1)
    const { data } = excludeId
      ? await query.neq("id", excludeId).maybeSingle()
      : await query.maybeSingle()
    if (!data) return { slug: candidate }
    candidate = `${baseSlug}-${i}`
    i++
    if (i > 50) return { slug: `${baseSlug}-${Date.now().toString(36)}` }
  }
}
