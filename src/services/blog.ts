/**
 * Blog service — dual-source (Supabase Fase 18 / MDX legado).
 *
 * Estratégia:
 * 1. `BLOG_SOURCE=supabase` (cutover Fase 18.G): le exclusivamente da nova
 *    infra Supabase via `services/articles.ts`. MDX ignorado.
 * 2. Default: MDX legado em `content/blog/*.mdx` (15 posts originais).
 *
 * Sanity foi removido em 30/04/2026 (Fase 18.H). Os 15 MDX files seguem como
 * safety net até `BLOG_SOURCE=supabase` virar default em prod, depois podem
 * ser removidos numa limpeza futura.
 */

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost, BlogFrontmatter } from "@/types/blog"
import {
  getArticleSourceMode,
  listPublishedArticles,
  listPublishedSlugs,
  getPublishedArticleBySlug,
  type ArticleFull,
  type ArticleListItem,
} from "@/services/articles"
import { blocksWordCount } from "@/components/blog/BlockRenderer"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

// ─────────────────────────────────────────────────────────────
// MDX (legacy)
// ─────────────────────────────────────────────────────────────

function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length
  return Math.ceil(words / 200)
}

function getPostFromMdxFile(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  const frontmatter = data as BlogFrontmatter

  return {
    slug,
    ...frontmatter,
    readingTime: calculateReadingTime(content),
    content,
    source: "mdx",
  }
}

function listMdxSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

// ─────────────────────────────────────────────────────────────
// Supabase adapters (Fase 18) — converte ArticleFull/ListItem → BlogPost
// ─────────────────────────────────────────────────────────────

function articleListItemToBlogPost(item: ArticleListItem): BlogPost {
  return {
    slug: item.slug,
    title: item.title,
    description: item.description,
    date: item.published_at ?? item.updated_at,
    author: item.author?.name ?? "FYMOOB Imobiliária",
    image: item.cover_image_url ?? "",
    tags: item.tags,
    readingTime: item.reading_time_min ?? 1,
    source: "supabase",
  }
}

function articleFullToBlogPost(article: ArticleFull): BlogPost {
  const reading =
    article.reading_time_min ??
    Math.max(1, Math.ceil((article.word_count ?? blocksWordCount(article.body)) / 200))
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    date: article.published_at ?? article.created_at,
    author: article.author?.name ?? "FYMOOB Imobiliária",
    image: article.cover_image_url ?? "",
    tags: article.tags,
    readingTime: reading,
    source: "supabase",
    updatedAt: article.updated_at,
    reviewedBy: article.reviewed_by ?? undefined,
    nextReview: article.next_review ?? undefined,
    _supabase: article,
  }
}

// ─────────────────────────────────────────────────────────────
// Public API (toggle BLOG_SOURCE)
// ─────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<BlogPost[]> {
  if (getArticleSourceMode() === "supabase") {
    const items = await listPublishedArticles()
    return items.map(articleListItemToBlogPost)
  }

  // Fallback MDX
  const mdxSlugs = listMdxSlugs()
  const posts = mdxSlugs
    .map((slug) => {
      try {
        return getPostFromMdxFile(slug)
      } catch (err) {
        console.error(`[blog.ts] MDX read failed for "${slug}":`, err)
        return null
      }
    })
    .filter((p): p is BlogPost => p !== null)

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (getArticleSourceMode() === "supabase") {
    const article = await getPublishedArticleBySlug(slug)
    return article ? articleFullToBlogPost(article) : null
  }

  // Fallback MDX
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return getPostFromMdxFile(slug)
}

export async function getAllSlugs(): Promise<string[]> {
  if (getArticleSourceMode() === "supabase") {
    return listPublishedSlugs()
  }
  return listMdxSlugs()
}

export async function getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.slice(0, limit)
}

export async function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): Promise<BlogPost[]> {
  const posts = await getAllPosts()

  const scored = posts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => ({
      post,
      score: post.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)

  // Se houver menos posts relacionados que `limit`, completa com posts recentes
  if (scored.length < limit) {
    const remaining = posts
      .filter((p) => p.slug !== currentSlug && !scored.some((r) => r.slug === p.slug))
      .slice(0, limit - scored.length)
    return [...scored, ...remaining]
  }

  return scored
}
