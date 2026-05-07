/**
 * Cron — atualiza recommendations_cache com dados frescos do GSC.
 *
 * Roda daily seg-sex 11h UTC (08h Curitiba) — configurado em vercel.json.
 * Vercel adiciona header `Authorization: Bearer ${CRON_SECRET}` automaticamente.
 *
 * Logica (algoritmo aprovado em recommendations-algorithm-v2.md):
 *   1. Auth + valida Supabase + Google Service Account
 *   2. Lista todos os slugs do blog (Supabase ou MDX)
 *   3. Chama GSC searchanalytics.query (1 request, 30d window, todos os slugs /blog/*)
 *   4. Pra cada slug calcula:
 *      - clicks_30d, impressions_30d, ctr_pct, position_avg
 *      - ctr_position_adj = ctr / expectedCtrAt(position)
 *      - score combinado (40 cliques + 20 ctr + 15 recency + 10 evergreen)
 *      - cluster_id (lookup config OR uncategorized)
 *   5. UPSERT batch no recommendations_cache
 *   6. invalidateRecommendationsCache() => revalidateTag("blog")
 *
 * Idempotente — rodar 2x = mesmo estado final.
 */

import { NextResponse } from "next/server"
import { google } from "googleapis"
import { revalidateTag } from "next/cache"
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin"
import { getAllPosts } from "@/services/blog"
import {
  recencyScore,
  expectedCtrAt,
  type RecommendationCacheRow,
} from "@/services/recommendations"
import type { BlogPost } from "@/types/blog"

// Janela de analise (30d — compromise entre estabilidade 90d e responsividade 7d)
const WINDOW_DAYS = 30

// Conjunto de slugs evergreen (manualmente curado por ora — futuramente
// deriva de tag `evergreen` no frontmatter / Supabase). Estes artigos
// recebem boost de 10% no score final por serem intemporais.
const EVERGREEN_SLUGS = new Set<string>([
  "itbi-curitiba-valor-como-pagar",
  "documentos-comprar-imovel-curitiba",
  "checklist-compra-imovel",
  "como-financiar-minha-casa-minha-vida",
  "financiamento-caixa-itau-bradesco-comparativo",
])

// Cluster topical curado (usado por MMR + smart-related). Slugs sem entry
// caem em "uncategorized". Quando criarmos `clusters.json`, mover pra la.
const CLUSTER_MAP: Record<string, string> = {
  "preco-metro-quadrado-curitiba-bairro": "mercado_preco",
  "mercado-imobiliario-curitiba-2026": "mercado_preco",
  "custo-de-vida-curitiba": "mercado_preco",
  "quanto-custa-morar-batel-curitiba": "mercado_preco",

  "melhores-bairros-curitiba-2026": "bairros_comparativos",
  "melhores-bairros-familias-curitiba": "bairros_comparativos",
  "batel-vs-agua-verde-curitiba": "bairros_comparativos",
  "ecoville-vs-bigorrilho-curitiba": "bairros_comparativos",

  "checklist-compra-imovel": "compra_processo",
  "documentos-comprar-imovel-curitiba": "compra_processo",
  "imovel-planta-vs-pronto-curitiba": "compra_processo",
  "apartamento-ou-casa-curitiba": "compra_processo",

  "itbi-curitiba-valor-como-pagar": "financiamento_tributos",
  "como-financiar-minha-casa-minha-vida": "financiamento_tributos",
  "financiamento-caixa-itau-bradesco-comparativo": "financiamento_tributos",
}

// ────────────────────────── Auth helpers ──────────────────────────

function getServiceAccountCreds() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!json) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON ausente")
  return JSON.parse(json) as {
    client_email: string
    private_key: string
    project_id: string
  }
}

async function getGscClient() {
  const creds = getServiceAccountCreds()
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  })
  await auth.authorize()
  return google.searchconsole({ version: "v1", auth })
}

// ────────────────────────── GSC fetch ──────────────────────────

interface GscRow {
  slug: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

async function fetchGscMetrics(slugs: string[]): Promise<Map<string, GscRow>> {
  const siteUrl = process.env.GSC_SITE_URL || "sc-domain:fymoob.com.br"
  const gsc = await getGscClient()

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - WINDOW_DAYS)
  const fmt = (d: Date) => d.toISOString().slice(0, 10)

  const res = await gsc.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ["page"],
      rowLimit: 1000,
    },
  })

  const result = new Map<string, GscRow>()
  for (const row of res.data.rows ?? []) {
    const url = (row.keys ?? [])[0] ?? ""
    const match = url.match(/\/blog\/([^/?#]+)/)
    if (!match) continue
    const slug = match[1]
    if (!slugs.includes(slug)) continue

    result.set(slug, {
      slug,
      clicks: row.clicks ?? 0,
      impressions: row.impressions ?? 0,
      ctr: row.ctr ?? 0,
      position: row.position ?? 0,
    })
  }
  return result
}

// ────────────────────────── Score computation ──────────────────────────

interface ScoredRow {
  row: Omit<RecommendationCacheRow, "computed_at">
  rawClicks: number
  rawCtrAdj: number
}

/**
 * Computa score combinado dos posts com base nos sinais GSC + recency +
 * evergreen. Score nao-normalizado nessa fase — feito numa segunda
 * passada com min-max sobre todos os posts pra evitar bias de escala.
 */
function buildScoredRows(
  posts: BlogPost[],
  gscData: Map<string, GscRow>,
): ScoredRow[] {
  const rows: ScoredRow[] = []
  for (const post of posts) {
    const gsc = gscData.get(post.slug)
    const clicks = gsc?.clicks ?? 0
    const impressions = gsc?.impressions ?? 0
    const ctr = gsc?.ctr ?? 0
    const position = gsc?.position ?? 0
    const expected = position > 0 ? expectedCtrAt(position) : 0
    const ctrAdj = expected > 0 ? ctr / expected : 0

    rows.push({
      row: {
        slug: post.slug,
        clicks_30d: clicks,
        impressions_30d: impressions,
        ctr_pct: Number(ctr.toFixed(4)),
        position_avg: Number(position.toFixed(2)),
        ctr_position_adj: Number(ctrAdj.toFixed(4)),
        score: 0, // calculado abaixo apos normalize
        cluster_id: CLUSTER_MAP[post.slug] ?? "uncategorized",
        is_evergreen: EVERGREEN_SLUGS.has(post.slug),
      },
      rawClicks: clicks,
      rawCtrAdj: ctrAdj,
    })
  }
  return rows
}

/**
 * Aplica min-max normalize nos sinais brutos e calcula score combinado
 * com pesos default v2 (40/20/15/10).
 */
function applyScores(rows: ScoredRow[], posts: BlogPost[]): void {
  if (rows.length === 0) return

  const allClicks = rows.map((r) => r.rawClicks)
  const allCtrAdj = rows.map((r) => r.rawCtrAdj)

  const minMax = (values: number[]) => {
    const max = Math.max(...values)
    const min = Math.min(...values)
    const span = max - min
    return (v: number) => (span === 0 ? 0.5 : (v - min) / span)
  }

  const normClicks = minMax(allClicks)
  const normCtrAdj = minMax(allCtrAdj)
  const postBySlug = new Map(posts.map((p) => [p.slug, p]))

  for (const r of rows) {
    const post = postBySlug.get(r.row.slug)
    const recN = post ? recencyScore(post.date) : 0
    let score =
      0.40 * normClicks(r.rawClicks) +
      0.20 * normCtrAdj(r.rawCtrAdj) +
      0.15 * recN
    if (r.row.is_evergreen) score *= 1.10
    r.row.score = Number(score.toFixed(4))
  }
}

// ────────────────────────── Route ──────────────────────────

export async function GET(request: Request) {
  // Auth — Vercel cron envia este header. Sem ele em prod = 401.
  const authHeader = request.headers.get("authorization")
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (process.env.CRON_SECRET && authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase nao configurado" },
      { status: 503 },
    )
  }

  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return NextResponse.json(
      { error: "GOOGLE_SERVICE_ACCOUNT_JSON ausente" },
      { status: 503 },
    )
  }

  const startedAt = Date.now()

  try {
    // 1. Lista todos os posts do blog
    const posts = await getAllPosts()
    if (posts.length === 0) {
      return NextResponse.json({
        ok: true,
        message: "Nenhum post no blog — nada a fazer.",
        rows: 0,
      })
    }

    const slugs = posts.map((p) => p.slug)

    // 2. Busca metricas GSC
    const gscData = await fetchGscMetrics(slugs)

    // 3. Constroi rows + aplica score normalizado
    const rows = buildScoredRows(posts, gscData)
    applyScores(rows, posts)

    // 4. UPSERT batch no Supabase
    const sb = getSupabaseAdmin()
    const upsertPayload = rows.map((r) => ({
      ...r.row,
      computed_at: new Date().toISOString(),
    }))

    const { error: upsertError } = await sb
      .from("recommendations_cache")
      .upsert(upsertPayload, { onConflict: "slug" })

    if (upsertError) {
      console.error("[cron/reco-refresh] upsert failed:", upsertError)
      return NextResponse.json(
        { error: upsertError.message },
        { status: 500 },
      )
    }

    // 5. Invalida cache Next.js — força re-render dos componentes
    revalidateTag("blog", { expire: 0 })

    const elapsedMs = Date.now() - startedAt

    return NextResponse.json({
      ok: true,
      window_days: WINDOW_DAYS,
      total_posts: posts.length,
      gsc_matched: gscData.size,
      upserted: rows.length,
      elapsed_ms: elapsedMs,
      top: rows
        .slice()
        .sort((a, b) => b.row.score - a.row.score)
        .slice(0, 5)
        .map((r) => ({
          slug: r.row.slug,
          score: r.row.score,
          clicks: r.row.clicks_30d,
          ctr_adj: r.row.ctr_position_adj,
        })),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[cron/reco-refresh] exception:", err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
