import Link from "next/link"
import { BlogCard } from "@/components/blog/BlogCard"
import { getRecommendedPosts, type RecommendationContext } from "@/services/recommendations"

interface RecommendedPostsProps {
  /** Quantidade de posts a renderizar. Default 3. */
  limit?: number
  /** Contexto define MMR lambda (home=0.7, blog=0.5). */
  context?: RecommendationContext
  /**
   * Quando passado, renderiza header com titulo + link "Ver todos".
   * Quando ausente, retorna so o grid (caller controla wrapper).
   */
  title?: string
  /** URL pro "Ver todos". Default `/blog`. */
  viewAllHref?: string
  /** Texto do link de "Ver todos". Default "Ver todos". */
  viewAllLabel?: string
  /** className extra pro <section> wrapper (so quando title presente). */
  className?: string
}

/**
 * Sprint design 06/05/2026 — D2/D3.
 *
 * Server Component que substitui `getRecentPosts(N)` na home + `/blog` por
 * ranking algoritmico baseado em GSC (cliques + CTR ajustado + recency +
 * evergreen boost). Usa MMR pra diversidade de cluster topical.
 *
 * Fallback gracioso: se cache vazio (cron nunca rodou), service retorna
 * `getRecentPosts` automaticamente — zero risco de tela vazia.
 *
 * Reutiliza `<BlogCard>` existente — zero novo padrao visual.
 *
 * Renderiza nada se nao houver posts.
 */
export async function RecommendedPosts({
  limit = 3,
  context = "home",
  title,
  viewAllHref = "/blog",
  viewAllLabel = "Ver todos",
  className = "",
}: RecommendedPostsProps) {
  const posts = await getRecommendedPosts({ limit, context })

  if (posts.length === 0) return null

  // Grid de cards — colunas escalam por viewport
  const grid = (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {posts.map((post) => (
        <div key={post.slug}>
          <BlogCard post={post} />
        </div>
      ))}
    </div>
  )

  // Sem title => so o grid (caller fornece wrapper)
  if (!title) return grid

  // Com title => section completa
  return (
    <section className={`py-10 md:py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950 md:text-3xl md:font-bold">
            {title}
          </h2>
          <Link
            href={viewAllHref}
            className="text-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover"
          >
            {viewAllLabel}
          </Link>
        </div>
        <div className="mt-8">{grid}</div>
      </div>
    </section>
  )
}
