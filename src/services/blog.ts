/**
 * Blog service — dual-read (Sanity primário + MDX fallback)
 *
 * Estratégia de migração:
 * 1. Tenta buscar do Sanity primeiro (via GROQ)
 * 2. Se não encontrar (post não migrado ainda OU Sanity offline),
 *    fallback pro MDX legado em content/blog/*.mdx
 *
 * Quando todos 15 posts forem migrados E validados visualmente,
 * remover branch MDX (cutover). Tracked em docs/architecture/sanity-setup-guide.md.
 */

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost, BlogFrontmatter } from "@/types/blog"
import { sanityClient } from "@/sanity/lib/client"
import {
  ALL_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POSTS_SLUGS_QUERY,
} from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

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
// Sanity
// ─────────────────────────────────────────────────────────────

interface SanityPostListItem {
  _id: string
  title: string
  slug: string
  description: string
  publishedAt: string
  updatedAt?: string
  author?: { name: string; role?: string; slug?: string }
  coverImage?: { asset?: { _ref?: string }; alt?: string }
  tags?: string[]
  readingTime?: string
}

interface SanityPostFull extends SanityPostListItem {
  reviewedBy?: string
  nextReview?: string
  schemaType?: string
  body?: import("@portabletext/types").PortableTextBlock[]
  methodology?: {
    period?: string
    sources?: string[]
    sample?: string
    lastUpdate?: string
    nextReview?: string
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    canonical?: string
    noIndex?: boolean
  }
  author?: {
    name: string
    role?: string
    slug?: string
    creci?: string
    bio?: string
    photo?: { asset?: { _ref?: string }; alt?: string }
    email?: string
  }
}

function isSanityConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  return !!projectId && projectId !== "placeholder"
}

function sanityPostToBlogPost(post: SanityPostFull): BlogPost {
  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1200).quality(85).url() || ""
    : ""

  // Reading time calculado do número de blocos do body como heurística
  // (Portable Text não tem string contínua; aproximação: 1 bloco ≈ 30 palavras)
  const readingTime = post.body
    ? Math.max(1, Math.ceil((post.body.length * 30) / 200))
    : 1

  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.publishedAt,
    author: post.author?.name || "FYMOOB Imobiliária",
    image: imageUrl,
    tags: post.tags || [],
    readingTime,
    source: "sanity",
    body: post.body,
    authorData: post.author,
    updatedAt: post.updatedAt,
    reviewedBy: post.reviewedBy,
    nextReview: post.nextReview,
    _id: post._id,
  }
}

async function fetchSanityPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured()) return null
  try {
    const post = await sanityClient.fetch<SanityPostFull | null>(
      POST_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: 60, tags: ["blog", `blog:${slug}`] } }
    )
    if (!post) return null
    return sanityPostToBlogPost(post)
  } catch (err) {
    console.error(`[blog.ts] Sanity fetch failed for slug "${slug}":`, err)
    return null
  }
}

async function fetchAllSanityPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) return []
  try {
    const posts = await sanityClient.fetch<SanityPostFull[]>(
      ALL_POSTS_QUERY,
      {},
      { next: { revalidate: 60, tags: ["blog"] } }
    )
    return posts.map(sanityPostToBlogPost)
  } catch (err) {
    console.error("[blog.ts] Sanity fetchAll failed:", err)
    return []
  }
}

async function fetchAllSanitySlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return []
  try {
    return await sanityClient.fetch<string[]>(POSTS_SLUGS_QUERY)
  } catch (err) {
    console.error("[blog.ts] Sanity slugs fetch failed:", err)
    return []
  }
}

// ─────────────────────────────────────────────────────────────
// Public API (dual-read)
// ─────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<BlogPost[]> {
  const [sanityPosts, mdxSlugs] = await Promise.all([
    fetchAllSanityPosts(),
    Promise.resolve(listMdxSlugs()),
  ])

  const sanitySlugs = new Set(sanityPosts.map((p) => p.slug))

  // Posts MDX que NÃO estão no Sanity (não migrados ainda)
  const mdxOnly = mdxSlugs
    .filter((slug) => !sanitySlugs.has(slug))
    .map((slug) => {
      try {
        return getPostFromMdxFile(slug)
      } catch (err) {
        console.error(`[blog.ts] MDX read failed for "${slug}":`, err)
        return null
      }
    })
    .filter((p): p is BlogPost => p !== null)

  const all = [...sanityPosts, ...mdxOnly]
  return all.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // 1. Tenta Sanity
  const sanityPost = await fetchSanityPostBySlug(slug)
  if (sanityPost) return sanityPost

  // 2. Fallback MDX
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return getPostFromMdxFile(slug)
}

export async function getAllSlugs(): Promise<string[]> {
  const [sanitySlugs, mdxSlugs] = await Promise.all([
    fetchAllSanitySlugs(),
    Promise.resolve(listMdxSlugs()),
  ])

  // Union dos 2 conjuntos (slug Sanity tem precedência mas ambos contam pra static params)
  return Array.from(new Set([...sanitySlugs, ...mdxSlugs]))
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
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((s) => s.post)
}
