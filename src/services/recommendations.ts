/**
 * Sprint design 06/05/2026 — Sistema de recomendacoes do blog.
 *
 * Algoritmo aprovado em `docs/intel/working/recommendations-algorithm-v2.md`:
 *   score = 0.40·cliques_norm + 0.20·ctr_adj_norm + 0.15·recency + 0.15·MMR + 0.10·evergreen_boost
 *
 * Janela GSC: 30 dias (compromise entre estabilidade e responsividade).
 *
 * Cache: tabela Supabase `recommendations_cache` populada pelo cron
 * `/api/cron/recommendations-refresh` daily seg-sex 11h UTC. Service le
 * direto da tabela (sem chamar GSC em runtime).
 *
 * Fallback: se cache vazio/stale (>14d), retorna `getRecentPosts(limit)`.
 *
 * Server-side only — usa Supabase admin/anon keys + tipos do dual blog.
 */

import { revalidateTag } from "next/cache"
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
} from "@/lib/supabase-admin"
import { getAllPosts, getRecentPosts } from "@/services/blog"
import type { BlogPost } from "@/types/blog"

// ────────────────────────── Tipos ──────────────────────────

export interface RecommendationCacheRow {
  slug: string
  clicks_30d: number
  impressions_30d: number
  ctr_pct: number
  position_avg: number
  ctr_position_adj: number
  score: number
  cluster_id: string
  is_evergreen: boolean
  computed_at: string
}

interface ScoredPost {
  post: BlogPost
  score: number
  cluster_id: string
}

export type RecommendationContext = "home" | "blog" | "sidebar"

// Stale threshold: cache nao atualizado em 14d => fallback recents
const STALE_THRESHOLD_DAYS = 14

// ────────────────────────── Helpers de score ──────────────────────────

const HALF_LIFE_DAYS = 365
const DECAY_LAMBDA = Math.LN2 / HALF_LIFE_DAYS

/**
 * Recency score com decay exponencial. Half-life 365d = artigo de hoje
 * vale 1.0, 1 ano vale 0.5, 2 anos vale 0.25. Nunca zera.
 *
 * Modelo classico (CEUR-WS Vol-2038, 2017).
 */
export function recencyScore(publishedAt: string): number {
  const days =
    (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60 * 24)
  return Math.exp(-DECAY_LAMBDA * Math.max(0, days))
}

/**
 * Min-max normalize array de numeros pra [0,1]. Quando max==min, todos
 * recebem 0.5 (valor neutro — evita NaN e bias).
 */
function normalize(values: number[]): Map<number, number> {
  if (values.length === 0) return new Map()
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min
  if (span === 0) return new Map(values.map((v) => [v, 0.5]))
  return new Map(values.map((v) => [v, (v - min) / span]))
}

/**
 * Curva de CTR esperado por posicao GSC (industria — Backlinko, Advanced
 * Web Ranking). Usada pra calcular `ctr_position_adj = ctr / expected`.
 */
export function expectedCtrAt(position: number): number {
  const p = Math.round(Math.max(1, position))
  // Curva conservadora (Advanced Web Ranking 2024, media B2B/B2C)
  const curve: Record<number, number> = {
    1: 0.30,
    2: 0.15,
    3: 0.10,
    4: 0.07,
    5: 0.05,
    6: 0.035,
    7: 0.025,
    8: 0.018,
    9: 0.014,
    10: 0.011,
  }
  if (p <= 10) return curve[p]
  // Posicoes 11-20: ~0.5% (page 2)
  if (p <= 20) return 0.005
  return 0.002 // page 3+
}

/**
 * Jaccard similarity entre 2 arrays de tags. |A ∩ B| / |A ∪ B|.
 * Usado em related posts (similarity contextual no /blog/[slug]).
 */
export function jaccard(a: string[], b: string[]): number {
  const setA = new Set(a)
  const setB = new Set(b)
  const inter = [...setA].filter((x) => setB.has(x)).length
  const union = new Set([...a, ...b]).size
  return union === 0 ? 0 : inter / union
}

/**
 * MMR rerank pra diversidade — Carbonell & Goldstein 1998.
 * λ=0.7 (relevance-leaning) na home, λ=0.5 (mais diversidade) em related.
 *
 * Penaliza candidatos similares aos ja selecionados (mesmo cluster ou
 * tag overlap) pra evitar 3 cards do mesmo subtema.
 */
function mmrRerank(
  candidates: ScoredPost[],
  k: number,
  lambda: number,
): ScoredPost[] {
  const sorted = [...candidates].sort((a, b) => b.score - a.score)
  const selected: ScoredPost[] = []
  const remaining = [...sorted]

  while (selected.length < k && remaining.length > 0) {
    if (selected.length === 0) {
      selected.push(remaining.shift()!)
      continue
    }
    let bestIdx = 0
    let bestMmr = -Infinity
    for (let i = 0; i < remaining.length; i++) {
      const cand = remaining[i]
      const maxSim = Math.max(
        ...selected.map((s) => {
          if (s.cluster_id === cand.cluster_id && s.cluster_id !== "uncategorized") return 1
          const overlap = jaccard(s.post.tags, cand.post.tags)
          if (overlap > 0.5) return 0.5
          if (overlap > 0) return 0.3
          return 0
        }),
      )
      const mmr = lambda * cand.score - (1 - lambda) * maxSim
      if (mmr > bestMmr) {
        bestMmr = mmr
        bestIdx = i
      }
    }
    selected.push(remaining.splice(bestIdx, 1)[0])
  }
  return selected
}

// ────────────────────────── Cache fetch ──────────────────────────

/**
 * Le toda a tabela recommendations_cache. Retorna Map<slug, row>. Vazio
 * se Supabase nao configurado ou erro de query.
 */
export async function getRecommendationCache(): Promise<
  Map<string, RecommendationCacheRow>
> {
  if (!isSupabaseConfigured()) {
    console.warn(
      "[recommendations] Supabase nao configurado — cache vazio, fallback ativado",
    )
    return new Map()
  }

  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from("recommendations_cache")
      .select("*")

    if (error) {
      console.error("[recommendations] cache fetch error:", error)
      return new Map()
    }
    if (!data || data.length === 0) return new Map()

    return new Map(
      data.map((r) => [r.slug, r as RecommendationCacheRow]),
    )
  } catch (err) {
    console.error("[recommendations] cache fetch exception:", err)
    return new Map()
  }
}

/**
 * Verifica se cache esta stale (> 14 dias). Stale != vazio — ainda pode
 * ser usado, so loga warning. So fallback de verdade quando vazio.
 */
function isCacheStale(cache: Map<string, RecommendationCacheRow>): boolean {
  if (cache.size === 0) return true
  const ages = [...cache.values()].map(
    (r) => (Date.now() - new Date(r.computed_at).getTime()) / (1000 * 60 * 60 * 24),
  )
  const oldest = Math.max(...ages)
  return oldest > STALE_THRESHOLD_DAYS
}

// ────────────────────────── Score combinado ──────────────────────────

/**
 * Calcula score combinado pra cada post usando os pesos default v2.
 * Aceita pesos customizaveis pra A/B testing futuro.
 */
function scorePost(
  post: BlogPost,
  row: RecommendationCacheRow | undefined,
  norms: { clicks: Map<number, number>; ctrAdj: Map<number, number> },
  weights: { clicks: number; ctr: number; recency: number; evergreen: number },
): number {
  const clicksN = norms.clicks.get(row?.clicks_30d ?? 0) ?? 0
  const ctrAdjN = norms.ctrAdj.get(row?.ctr_position_adj ?? 0) ?? 0
  const recN = recencyScore(post.date)

  let score =
    weights.clicks * clicksN +
    weights.ctr * ctrAdjN +
    weights.recency * recN

  if (row?.is_evergreen) score *= 1 + weights.evergreen
  return score
}

// ────────────────────────── Public API ──────────────────────────

interface GetRecommendedPostsOptions {
  limit?: number
  context?: RecommendationContext
}

/**
 * Recomendacoes de blog rankiadas pelo algoritmo hibrido v2. Usa cache
 * Supabase + MMR rerank pra diversidade.
 *
 * Fallback: getRecentPosts(limit) quando cache vazio. Stale (>14d) loga
 * warning mas usa.
 */
export async function getRecommendedPosts({
  limit = 3,
  context = "home",
}: GetRecommendedPostsOptions = {}): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  if (allPosts.length === 0) return []

  const cache = await getRecommendationCache()

  // Fallback total: cache vazio => recents
  if (cache.size === 0) {
    return getRecentPosts(limit)
  }

  if (isCacheStale(cache)) {
    console.warn(
      "[recommendations] cache stale (>14d) — usando assim mesmo, agendar refresh",
    )
  }

  // Pesos default v2 (40/20/15/10 + MMR aplicado no rerank)
  const weights = { clicks: 0.40, ctr: 0.20, recency: 0.15, evergreen: 0.10 }
  // MMR lambda — home preserva relevance, related da mais diversidade
  const lambda = context === "home" ? 0.7 : 0.5

  // Normalize sinais brutos (min-max sobre todos os posts)
  const allClicks = allPosts.map((p) => cache.get(p.slug)?.clicks_30d ?? 0)
  const allCtrAdj = allPosts.map(
    (p) => cache.get(p.slug)?.ctr_position_adj ?? 0,
  )
  const norms = {
    clicks: normalize(allClicks),
    ctrAdj: normalize(allCtrAdj),
  }

  const scored: ScoredPost[] = allPosts.map((post) => {
    const row = cache.get(post.slug)
    const score = scorePost(post, row, norms, weights)
    return {
      post,
      score,
      cluster_id: row?.cluster_id ?? "uncategorized",
    }
  })

  // MMR rerank pra diversidade + slice limit
  return mmrRerank(scored, limit, lambda).map((s) => s.post)
}

interface GetSmartRelatedPostsOptions {
  limit?: number
}

/**
 * Recomendacoes contextuais pra `/blog/[slug]`. Difere da home porque
 * o usuario JA leu um artigo — relevancia topical pesa mais que
 * popularidade absoluta.
 *
 * Pesos: 0.30 Jaccard tags + 0.30 cluster + 0.25 popularidade + 0.15 recency.
 *
 * Hard filter anti-duplicate: slug atual + tag overlap >= 80%.
 */
export async function getSmartRelatedPosts(
  currentSlug: string,
  tags: string[],
  { limit = 3 }: GetSmartRelatedPostsOptions = {},
): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  const current = allPosts.find((p) => p.slug === currentSlug)
  if (!current) return []

  const cache = await getRecommendationCache()
  const currentRow = cache.get(currentSlug)
  const currentCluster = currentRow?.cluster_id

  // Anti-duplicate: tag overlap >= 80% e slug atual
  const candidates = allPosts.filter((p) => {
    if (p.slug === currentSlug) return false
    const overlap = jaccard(p.tags, tags)
    return overlap < 0.80
  })

  // Fallback: cache vazio => Jaccard puro nas tags
  if (cache.size === 0) {
    const scored = candidates
      .map((post) => ({ post, score: jaccard(post.tags, tags) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((s) => s.post)

    if (scored.length < limit) {
      const remaining = candidates
        .filter((p) => !scored.some((r) => r.slug === p.slug))
        .slice(0, limit - scored.length)
      return [...scored, ...remaining]
    }
    return scored
  }

  // Score completo
  const allClicks = candidates.map(
    (p) => cache.get(p.slug)?.clicks_30d ?? 0,
  )
  const popN = normalize(allClicks)

  const scored: ScoredPost[] = candidates.map((post) => {
    const row = cache.get(post.slug)
    const tagSim = jaccard(post.tags, tags)
    const clusterSim =
      row?.cluster_id && currentCluster && row.cluster_id === currentCluster
        ? 1.0
        : 0
    const popularity = popN.get(row?.clicks_30d ?? 0) ?? 0
    const recency = recencyScore(post.date)

    const score =
      0.30 * tagSim +
      0.30 * clusterSim +
      0.25 * popularity +
      0.15 * recency

    return {
      post,
      score,
      cluster_id: row?.cluster_id ?? "uncategorized",
    }
  })

  // MMR com lambda menor pra mais diversidade nos related
  const ranked = mmrRerank(scored, limit, 0.5).map((s) => s.post)

  // Fallback gracioso se ranking < limit
  if (ranked.length < limit) {
    const remaining = candidates
      .filter((p) => !ranked.some((r) => r.slug === p.slug))
      .slice(0, limit - ranked.length)
    return [...ranked, ...remaining]
  }

  return ranked
}

/**
 * Helper pro cron — invalidar cache do blog apos UPSERT no
 * recommendations_cache. Force re-render dos componentes que usam o
 * service em pages com `revalidateTag("blog")`.
 */
export function invalidateRecommendationsCache(): void {
  revalidateTag("blog", { expire: 0 })
}
