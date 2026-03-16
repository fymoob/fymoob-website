import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost, BlogFrontmatter } from "@/types/blog"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length
  return Math.ceil(words / 200)
}

function getPostFromFile(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  const frontmatter = data as BlogFrontmatter

  return {
    slug,
    ...frontmatter,
    readingTime: calculateReadingTime(content),
    content,
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "")
    return getPostFromFile(slug)
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return getPostFromFile(slug)
}

export async function getAllSlugs(): Promise<string[]> {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))
  return files.map((f) => f.replace(/\.mdx$/, ""))
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
