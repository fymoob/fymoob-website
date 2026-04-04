import fs from "fs"
import path from "path"
import matter from "gray-matter"

const GUIAS_DIR = path.join(process.cwd(), "content/guias")

export interface GuiaFrontmatter {
  title: string
  description: string
  bairro: string
  date: string
  author: string
  image: string
}

export interface Guia extends GuiaFrontmatter {
  slug: string
  readingTime: number
  content: string
}

function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length
  return Math.ceil(words / 200)
}

function getGuiaFromFile(slug: string): Guia {
  const filePath = path.join(GUIAS_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  const frontmatter = data as GuiaFrontmatter

  return {
    slug,
    ...frontmatter,
    readingTime: calculateReadingTime(content),
    content,
  }
}

export async function getAllGuias(): Promise<Guia[]> {
  if (!fs.existsSync(GUIAS_DIR)) return []
  const files = fs.readdirSync(GUIAS_DIR).filter((f) => f.endsWith(".mdx"))
  return files
    .map((file) => getGuiaFromFile(file.replace(/\.mdx$/, "")))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getGuiaBySlug(slug: string): Promise<Guia | null> {
  const filePath = path.join(GUIAS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return getGuiaFromFile(slug)
}

export async function getAllGuiaSlugs(): Promise<string[]> {
  if (!fs.existsSync(GUIAS_DIR)) return []
  const files = fs.readdirSync(GUIAS_DIR).filter((f) => f.endsWith(".mdx"))
  return files.map((f) => f.replace(/\.mdx$/, ""))
}
