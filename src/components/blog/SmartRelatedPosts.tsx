import { BlogCard } from "@/components/blog/BlogCard"
import { getSmartRelatedPosts } from "@/services/recommendations"

interface SmartRelatedPostsProps {
  /** Slug do artigo atual — excluido do ranking. */
  slug: string
  /** Tags do artigo atual — entrada pro Jaccard similarity. */
  tags: string[]
  /** Quantidade. Default 3. */
  limit?: number
  /** Titulo da secao. Default "Você pode gostar". */
  title?: string
  /** className extra pro <section>. */
  className?: string
}

/**
 * Sprint design 06/05/2026.
 *
 * Substitui `<RelatedPosts>` (tag overlap simples) em /blog/[slug] por
 * ranking que combina:
 *   0.30 Jaccard tags (similarity contextual)
 *   0.30 cluster topical (mesmo tema editorial)
 *   0.25 popularidade GSC (cliques 30d normalizados)
 *   0.15 recency (half-life 365d)
 *
 * Hard filter anti-duplicate: tag overlap >= 80% excluido (evita "Studio
 * Lago" recomendar "Studio Lago Variante" que e quase identico).
 *
 * MMR rerank lambda=0.5 (mais diversidade que home — pra related, mostrar
 * variedade temática vale mais que pure popularity).
 *
 * Server Component — zero JS no client. Reutiliza `<BlogCard>` existente.
 */
export async function SmartRelatedPosts({
  slug,
  tags,
  limit = 3,
  title = "Você pode gostar",
  className = "",
}: SmartRelatedPostsProps) {
  const posts = await getSmartRelatedPosts(slug, tags, { limit })
  if (posts.length === 0) return null

  return (
    <section className={`py-10 md:py-14 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950 md:text-2xl">
          {title}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
