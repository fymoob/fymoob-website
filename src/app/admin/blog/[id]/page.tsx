/**
 * Editor de artigo — `/admin/blog/[id]`.
 *
 * Layout: 3 colunas em desktop:
 * - Esquerda: editor BlockNote (autosave debounceado)
 * - Direita: sidebar com 4 tabs (Conteudo / Metadados / YMYL / SEO)
 * - Topo: barra de acoes (status, salvar, preview, publicar, agendar, mais...)
 *
 * Mobile: tabs viram bottom-sheet, editor full-width.
 */

import type { Metadata } from "next"
import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin"
import { listAuthors } from "@/services/articles"
import type { Article, BlockNoteBlock } from "@/lib/schemas/article"
import { ArticleEditorPage } from "./ArticleEditorPage"

export const metadata: Metadata = {
  title: "Editar artigo",
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: PageProps) {
  const session = await auth()
  if (!session?.user?.email) redirect("/admin/login")

  const { id } = await params
  if (!isSupabaseConfigured()) notFound()

  const sb = getSupabaseAdmin()
  const [{ data: articleRow }, authors] = await Promise.all([
    sb.from("articles").select("*").eq("id", id).maybeSingle(),
    listAuthors(),
  ])

  if (!articleRow) notFound()

  // Cast direto pra Article — readonly server-side, sem precisar parse Zod
  // (UI tolera campos null). Riscos de format invalido sao baixos: o DB
  // foi populado pela mesma camada que escreve.
  const article = articleRow as Article & { body: BlockNoteBlock[] }

  // Carrega revisoes (max 30 mais recentes) pro drawer historico
  const { data: revisions } = await sb
    .from("article_revisions")
    .select("id, title, edited_at")
    .eq("article_id", id)
    .order("edited_at", { ascending: false })
    .limit(30)

  return (
    <ArticleEditorPage
      article={article}
      authors={authors.map((a) => ({
        id: a.id ?? "",
        name: a.name,
        role: a.role,
        photo_url: a.photo_url ?? null,
      }))}
      revisions={(revisions ?? []).map((r) => ({
        id: r.id as string,
        title: r.title as string,
        edited_at: r.edited_at as string,
      }))}
    />
  )
}
