/**
 * Preview interno de artigo — `/admin/blog/preview/[id]`.
 *
 * Renderiza qualquer status (rascunho, agendado, publicado) com a mesma
 * estilização da página pública /blog/[slug]. Permite Bruno ver "como vai
 * ficar" antes de publicar.
 *
 * Acesso protegido por auth. URL nunca indexada (admin layout aplica robots
 * noindex no metadata).
 */

import type { Metadata } from "next"
import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, Clock } from "lucide-react"
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin"
import { authorSchema } from "@/lib/schemas/author"
import type { Article, BlockNoteBlock } from "@/lib/schemas/article"
import {
  BlockRenderer,
  blocksWordCount,
} from "@/components/blog/BlockRenderer"

export const metadata: Metadata = {
  title: "Preview do artigo",
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ArticlePreviewPage({ params }: PageProps) {
  const session = await auth()
  if (!session?.user?.email) redirect("/admin/login")

  const { id } = await params
  if (!isSupabaseConfigured()) notFound()

  const sb = getSupabaseAdmin()
  const { data: row } = await sb
    .from("articles")
    .select(`*, author:authors!articles_author_id_fkey(*)`)
    .eq("id", id)
    .maybeSingle()

  if (!row) notFound()

  const article = row as Article & { body: BlockNoteBlock[]; author: unknown }
  const authorParsed = article.author ? authorSchema.safeParse(article.author) : null
  const author = authorParsed && authorParsed.success ? authorParsed.data : null

  const wordCount = article.word_count ?? blocksWordCount(article.body)
  const readingTime = article.reading_time_min ?? Math.max(1, Math.ceil(wordCount / 200))
  const formattedDate = new Date(article.published_at ?? article.created_at).toLocaleDateString(
    "pt-BR",
    { day: "2-digit", month: "long", year: "numeric" }
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Banner de preview no topo */}
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-900">
        🔒 Preview privado — status: <strong>{article.status}</strong> · não indexado pelo Google
        {" · "}
        <Link
          href={`/admin/blog/${article.id}`}
          className="underline hover:text-amber-700"
        >
          ← Voltar pro editor
        </Link>
      </div>

      {/* Replica visual da pagina /blog/[slug] */}
      {article.cover_image_url && (
        <div className="relative overflow-hidden bg-neutral-950">
          <div className="relative mx-auto aspect-[16/9] w-full max-w-7xl sm:aspect-[21/9]">
            <Image
              src={article.cover_image_url}
              alt={article.cover_image_alt ?? article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              unoptimized
            />
          </div>
        </div>
      )}

      <div className="border-b border-neutral-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-3 max-w-4xl font-display text-2xl font-extrabold leading-[1.1] tracking-tight text-neutral-950 sm:text-3xl lg:text-4xl">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="max-w-2xl text-lg leading-relaxed text-neutral-600">
          {article.description}
        </p>

        <div className="mt-6 flex items-center gap-4 border-b border-neutral-200 pb-6 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-brand-primary" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-brand-primary" />
            {readingTime} min de leitura
          </span>
          {author && (
            <span className="ml-auto text-xs">
              por <strong className="text-neutral-900">{author.name}</strong>
            </span>
          )}
        </div>

        <article className="prose-fymoob mt-10">
          {article.body.length === 0 ? (
            <p className="italic text-neutral-500">
              Conteúdo vazio. Volte ao editor pra escrever.
            </p>
          ) : (
            <BlockRenderer blocks={article.body} />
          )}
        </article>
      </div>
    </div>
  )
}
