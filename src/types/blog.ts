import type { PortableTextBlock } from "@portabletext/types"

export interface BlogFrontmatter {
  title: string
  description: string
  date: string
  author: string
  image: string
  tags: string[]
}

export interface SanityAuthor {
  name: string
  slug?: string
  role?: string
  creci?: string
  bio?: string
  photo?: { asset?: { _ref?: string }; alt?: string }
  email?: string
}

export interface BlogPost extends BlogFrontmatter {
  slug: string
  readingTime: number
  /** Source-of-truth marker — Sanity vs MDX */
  source: "sanity" | "mdx"
  /** MDX raw content (somente posts MDX legacy) */
  content?: string
  /** Portable Text body (somente posts Sanity) */
  body?: PortableTextBlock[]
  /** Author rich data (somente posts Sanity); MDX só tem string em `author` */
  authorData?: SanityAuthor
  /** YMYL fields (Sanity-only) */
  updatedAt?: string
  reviewedBy?: string
  nextReview?: string
  /** ID Sanity (pra invalidação cache em webhook) */
  _id?: string
}
