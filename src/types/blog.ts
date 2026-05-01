import type { ArticleFull } from "@/services/articles"

export interface BlogFrontmatter {
  title: string
  description: string
  date: string
  author: string
  image: string
  tags: string[]
  /**
   * FAQ Q&A schema — Fase 19.P2.C.3. Adicionado no frontmatter dos posts
   * MDX legacy pra eligibilidade de rich result FAQPage no Google. Posts
   * Supabase usam blocos `faqItem` via collectFaqItems.
   */
  faq?: Array<{ question: string; answer: string }>
}

export interface BlogPost extends BlogFrontmatter {
  slug: string
  readingTime: number
  /** Source-of-truth marker — Supabase (Fase 18) ou MDX legado */
  source: "mdx" | "supabase"
  /** MDX raw content (somente posts MDX legacy) */
  content?: string
  /** YMYL fields (Supabase-only) */
  updatedAt?: string
  reviewedBy?: string
  nextReview?: string
  /**
   * Article completo do Supabase (Fase 18) — quando `source === "supabase"`.
   * Carrega body BlockNote, autor rico, methodology, SEO overrides, etc.
   */
  _supabase?: ArticleFull
}
