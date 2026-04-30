/**
 * Articles service — leitura e escrita do blog custom (Fase 18).
 *
 * Substitui o `src/services/blog.ts` legado (Sanity + MDX) quando
 * `BLOG_SOURCE=supabase`. Durante a janela de cutover, o legado segue
 * funcionando — quem chama escolhe via `getArticleSourceMode()`.
 *
 * Convencoes:
 * - Funcoes `list*` / `get*` sao read-only e podem usar anon (read das
 *   policies). Aqui usamos service role direto pra simplificar e porque
 *   ja estamos no servidor.
 * - Funcoes de escrita (create/update/publish/...) sao usadas apenas em
 *   server actions com `auth()` check antes.
 * - Datas internas: ISO strings, conversao client-side.
 */

import "server-only"
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin"
import {
  articleSchema,
  type Article,
  type ArticleStatus,
} from "@/lib/schemas/article"
import { authorSchema, type Author } from "@/lib/schemas/author"

const BLOG_SOURCE = process.env.BLOG_SOURCE ?? "sanity"

/**
 * Modo do blog publico:
 * - `supabase`: le exclusivamente da nova infra (Fase 18). Requer migracao 18.G feita.
 * - `sanity`: comportamento antigo via `services/blog.ts` (Sanity + MDX fallback). Default.
 *
 * Toggle por env var. Permite rollback rapido durante cutover (Fase 18.H).
 */
export function getArticleSourceMode(): "supabase" | "sanity" {
  if (BLOG_SOURCE === "supabase" && isSupabaseConfigured()) return "supabase"
  return "sanity"
}

// ───────────────────────────────────────────────────────────────────
// Tipos publicos do servico (auxiliam routes/UI)
// ───────────────────────────────────────────────────────────────────

export interface ArticleListItem {
  id: string
  slug: string
  title: string
  description: string
  cover_image_url: string | null
  cover_image_alt: string | null
  status: ArticleStatus
  published_at: string | null
  updated_at: string
  tags: string[]
  reading_time_min: number | null
  word_count: number | null
  author: Pick<Author, "id" | "slug" | "name" | "role" | "photo_url"> | null
}

export interface ArticleFull extends Article {
  author: Author | null
}

// ───────────────────────────────────────────────────────────────────
// Helpers de query
// ───────────────────────────────────────────────────────────────────

/**
 * Colunas joineadas com author. Usamos string literal seguindo formato
 * do Supabase (`author:authors!articles_author_id_fkey(...)`) — o alias
 * vira propriedade `author` no resultado.
 */
const ARTICLE_LIST_COLUMNS = `
  id, slug, title, description, cover_image_url, cover_image_alt,
  status, published_at, updated_at, tags, reading_time_min, word_count,
  author:authors!articles_author_id_fkey ( id, slug, name, role, photo_url )
`

const ARTICLE_FULL_COLUMNS = `
  id, slug, title, description, body, cover_image_url, cover_image_alt,
  status, published_at, scheduled_at, author_id, tags, schema_type,
  reading_time_min, word_count, reviewed_by, next_review, methodology,
  seo_meta_title, seo_meta_description, seo_canonical, seo_no_index, seo_og_image_url,
  created_by, created_at, updated_at,
  author:authors!articles_author_id_fkey ( * )
`

// ───────────────────────────────────────────────────────────────────
// Reads — publicos (so artigos publicados)
// ───────────────────────────────────────────────────────────────────

/**
 * Lista publica de artigos publicados, ordenados por publish desc.
 * Retorna formato leve (sem body) — usado em /blog e cards.
 */
export async function listPublishedArticles(): Promise<ArticleListItem[]> {
  if (!isSupabaseConfigured()) return []
  const sb = getSupabaseAdmin()
  const { data, error } = await sb
    .from("articles")
    .select(ARTICLE_LIST_COLUMNS)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })

  if (error) {
    console.error("[articles.ts] listPublishedArticles failed:", error)
    return []
  }
  return (data ?? []) as unknown as ArticleListItem[]
}

/**
 * Lista todos os slugs publicados (pra `generateStaticParams` + sitemap).
 */
export async function listPublishedSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return []
  const sb = getSupabaseAdmin()
  const { data, error } = await sb
    .from("articles")
    .select("slug")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())

  if (error) {
    console.error("[articles.ts] listPublishedSlugs failed:", error)
    return []
  }
  return (data ?? []).map((row) => row.slug as string)
}

/**
 * Busca artigo publicado por slug. Retorna null se nao encontrado / nao publicado.
 */
export async function getPublishedArticleBySlug(
  slug: string
): Promise<ArticleFull | null> {
  if (!isSupabaseConfigured()) return null
  const sb = getSupabaseAdmin()
  const { data, error } = await sb
    .from("articles")
    .select(ARTICLE_FULL_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle()

  if (error) {
    console.error(`[articles.ts] getPublishedArticleBySlug("${slug}") failed:`, error)
    return null
  }
  if (!data) return null

  return parseArticleFull(data)
}

/**
 * Posts relacionados — mesmo conjunto de tags, mais recentes primeiro.
 * Usado em /blog/[slug].
 */
export async function getRelatedArticles(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): Promise<ArticleListItem[]> {
  if (!isSupabaseConfigured() || tags.length === 0) return []
  const sb = getSupabaseAdmin()

  const { data, error } = await sb
    .from("articles")
    .select(ARTICLE_LIST_COLUMNS)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .neq("slug", currentSlug)
    .overlaps("tags", tags)
    .order("published_at", { ascending: false })
    .limit(limit * 2) // sobreseleciona pra ranquear por #tags em comum no client

  if (error) {
    console.error("[articles.ts] getRelatedArticles failed:", error)
    return []
  }

  const tagSet = new Set(tags)
  const ranked = (data ?? [])
    .map((post) => {
      const overlap = (post as { tags: string[] }).tags.filter((t) => tagSet.has(t)).length
      return { post, overlap }
    })
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((r) => r.post as unknown as ArticleListItem)

  return ranked
}

// ───────────────────────────────────────────────────────────────────
// Reads — autores
// ───────────────────────────────────────────────────────────────────

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  if (!isSupabaseConfigured()) return null
  const sb = getSupabaseAdmin()
  const { data, error } = await sb
    .from("authors")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error) {
    console.error(`[articles.ts] getAuthorBySlug("${slug}") failed:`, error)
    return null
  }
  if (!data) return null
  const parsed = authorSchema.safeParse(data)
  return parsed.success ? parsed.data : null
}

export async function listAuthors(): Promise<Author[]> {
  if (!isSupabaseConfigured()) return []
  const sb = getSupabaseAdmin()
  const { data, error } = await sb
    .from("authors")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    console.error("[articles.ts] listAuthors failed:", error)
    return []
  }
  return (data ?? [])
    .map((row) => authorSchema.safeParse(row))
    .filter((r) => r.success)
    .map((r) => r.data)
}

export async function listPublishedArticlesByAuthor(
  authorId: string
): Promise<ArticleListItem[]> {
  if (!isSupabaseConfigured()) return []
  const sb = getSupabaseAdmin()
  const { data, error } = await sb
    .from("articles")
    .select(ARTICLE_LIST_COLUMNS)
    .eq("status", "published")
    .eq("author_id", authorId)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })

  if (error) {
    console.error("[articles.ts] listPublishedArticlesByAuthor failed:", error)
    return []
  }
  return (data ?? []) as unknown as ArticleListItem[]
}

// ───────────────────────────────────────────────────────────────────
// Internals
// ───────────────────────────────────────────────────────────────────

interface RawArticleWithAuthor {
  author?: unknown
  [key: string]: unknown
}

function parseArticleFull(raw: RawArticleWithAuthor): ArticleFull | null {
  // Separa o join "author" do resto pra cada um passar pelo seu schema.
  const { author, ...articleData } = raw
  const articleParsed = articleSchema.safeParse(articleData)
  if (!articleParsed.success) {
    console.error("[articles.ts] articleSchema parse failed:", articleParsed.error)
    return null
  }
  const authorParsed = author ? authorSchema.safeParse(author) : null
  return {
    ...articleParsed.data,
    author: authorParsed && authorParsed.success ? authorParsed.data : null,
  }
}
