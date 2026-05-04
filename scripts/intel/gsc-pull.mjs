#!/usr/bin/env node
/**
 * Sprint 1 — Analytics Intelligence (Linha A)
 * Evidence collector pra GSC. Roda deterministico, gera JSON, ZERO LLM.
 *
 * Uso:
 *   node scripts/intel/gsc-pull.mjs                     # Output stdout
 *   node scripts/intel/gsc-pull.mjs --output tmp/intel/gsc-2026-W19.json
 *   node scripts/intel/gsc-pull.mjs --site sc-domain:fymoob.com.br
 *
 * Env vars:
 *   GOOGLE_SERVICE_ACCOUNT_JSON  — JSON inteiro do service account (obrigatorio)
 *   GSC_SITE_URL                  — sc-domain:fymoob.com.br (default)
 *
 * Pre-requisito: service account adicionado em GSC > Settings > Users and
 * permissions com role "Restricted" (suficiente pra leitura).
 *
 * Output JSON estrutura:
 *   {
 *     meta: { generatedAt, weekISO, period, comparePeriod, site },
 *     summary: { clicks, impressions, ctr, position, deltas },
 *     topQueries: [...],          // top 50 com deltas
 *     topPages: [...],             // top 50 com deltas
 *     bigMovers: { up: [...], down: [...] },  // posicao mudou >5
 *     opportunities: { lowCtrTopRanked: [...] }, // pos<10 + CTR<1%
 *     sitemaps: [...]
 *   }
 */

import { google } from "googleapis"
import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"

const SITE_URL_DEFAULT = process.env.GSC_SITE_URL || "sc-domain:fymoob.com.br"

// Parse CLI args
const args = process.argv.slice(2)
const getArg = (flag) => {
  const idx = args.indexOf(flag)
  return idx >= 0 ? args[idx + 1] : null
}

const outputPath = getArg("--output")
const siteUrl = getArg("--site") || SITE_URL_DEFAULT

// ─────────────────────────────────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────────────────────────────────

function getServiceAccount() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) {
    console.error("✗ GOOGLE_SERVICE_ACCOUNT_JSON nao definida no env.")
    console.error("  Setup: GA4 + GSC compartilham 1 service account. Ver")
    console.error("  docs/analytics/intel-setup.md.")
    process.exit(1)
  }
  try {
    return JSON.parse(raw)
  } catch (err) {
    console.error("✗ GOOGLE_SERVICE_ACCOUNT_JSON nao e JSON valido:", err.message)
    process.exit(1)
  }
}

async function getAuthClient() {
  const credentials = getServiceAccount()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  })
  return await auth.getClient()
}

// ─────────────────────────────────────────────────────────────────────────
// Helpers de data
// ─────────────────────────────────────────────────────────────────────────

function ymd(date) {
  return date.toISOString().slice(0, 10)
}

function isoWeek(date) {
  const target = new Date(date.valueOf())
  const dayNr = (date.getUTCDay() + 6) % 7
  target.setUTCDate(target.getUTCDate() - dayNr + 3)
  const firstThursday = target.valueOf()
  target.setUTCMonth(0, 1)
  if (target.getUTCDay() !== 4) {
    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7)
  }
  const year = new Date(firstThursday).getUTCFullYear()
  const week = 1 + Math.ceil((firstThursday - target) / 604800000)
  return { year, week }
}

function computePeriods(refDate = new Date()) {
  // GSC tem latencia de ~3 dias. Janela analise: D-10 a D-3.
  // Compare: D-17 a D-10 (semana anterior, mesma janela).
  const end = new Date(refDate)
  end.setUTCDate(end.getUTCDate() - 3)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 6) // 7 dias inclusivo

  const compareEnd = new Date(start)
  compareEnd.setUTCDate(compareEnd.getUTCDate() - 1)
  const compareStart = new Date(compareEnd)
  compareStart.setUTCDate(compareStart.getUTCDate() - 6)

  return {
    period: { start: ymd(start), end: ymd(end) },
    compare: { start: ymd(compareStart), end: ymd(compareEnd) },
  }
}

// ─────────────────────────────────────────────────────────────────────────
// GSC fetchers
// ─────────────────────────────────────────────────────────────────────────

async function querySearchAnalytics(searchconsole, siteUrl, range, dimensions, rowLimit = 100) {
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: range.start,
      endDate: range.end,
      dimensions,
      rowLimit,
      dataState: "all",
    },
  })
  return res.data.rows || []
}

async function fetchSitemaps(searchconsole, siteUrl) {
  const res = await searchconsole.sitemaps.list({ siteUrl })
  return (res.data.sitemap || []).map((s) => ({
    path: s.path,
    type: s.type,
    isPending: s.isPending,
    isSitemapsIndex: s.isSitemapsIndex,
    lastSubmitted: s.lastSubmitted,
    lastDownloaded: s.lastDownloaded,
    errors: s.errors,
    warnings: s.warnings,
    contents: s.contents,
  }))
}

function computeRowDeltas(currentRows, previousRows, keyField = "key") {
  const prevMap = new Map(previousRows.map((r) => [r.keys[0], r]))
  return currentRows.map((r) => {
    const k = r.keys[0]
    const prev = prevMap.get(k)
    return {
      [keyField]: k,
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
      deltas: prev
        ? {
            clicks: r.clicks - prev.clicks,
            impressions: r.impressions - prev.impressions,
            ctr: r.ctr - prev.ctr,
            position: r.position - prev.position, // negativo = subiu (melhor)
          }
        : null,
    }
  })
}

// ─────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────

async function main() {
  const auth = await getAuthClient()
  const searchconsole = google.searchconsole({ version: "v1", auth })

  const ref = new Date()
  const { period, compare } = computePeriods(ref)
  const { year, week } = isoWeek(ref)

  console.error(`▸ GSC pull pra ${siteUrl}`)
  console.error(`  Period:  ${period.start} → ${period.end}`)
  console.error(`  Compare: ${compare.start} → ${compare.end}`)

  // 1. Summary (sem dimensions = totais)
  const [periodTotals, compareTotals] = await Promise.all([
    querySearchAnalytics(searchconsole, siteUrl, period, [], 1),
    querySearchAnalytics(searchconsole, siteUrl, compare, [], 1),
  ])

  const summary = {
    period: periodTotals[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    compare: compareTotals[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 },
  }
  summary.deltas = {
    clicks: summary.period.clicks - summary.compare.clicks,
    impressions: summary.period.impressions - summary.compare.impressions,
    ctr: summary.period.ctr - summary.compare.ctr,
    position: summary.period.position - summary.compare.position,
  }

  // 2. Top queries com deltas
  const [queriesNow, queriesPrev] = await Promise.all([
    querySearchAnalytics(searchconsole, siteUrl, period, ["query"], 100),
    querySearchAnalytics(searchconsole, siteUrl, compare, ["query"], 100),
  ])
  const topQueries = computeRowDeltas(queriesNow, queriesPrev, "query").slice(0, 50)

  // 3. Top pages com deltas
  const [pagesNow, pagesPrev] = await Promise.all([
    querySearchAnalytics(searchconsole, siteUrl, period, ["page"], 100),
    querySearchAnalytics(searchconsole, siteUrl, compare, ["page"], 100),
  ])
  const topPages = computeRowDeltas(pagesNow, pagesPrev, "page").slice(0, 50)

  // 4. Big movers de posicao (>5 posicoes)
  const positionMovers = topQueries
    .filter((q) => q.deltas && Math.abs(q.deltas.position) > 5)
    .sort((a, b) => a.deltas.position - b.deltas.position)
  const bigMovers = {
    up: positionMovers.filter((q) => q.deltas.position < 0).slice(0, 15), // melhorou
    down: positionMovers.filter((q) => q.deltas.position > 0).slice(0, 15), // piorou
  }

  // 5. Oportunidades: pos<10 mas CTR<1% (snippet/title fraco)
  const opportunities = {
    lowCtrTopRanked: topQueries
      .filter((q) => q.position < 10 && q.ctr < 0.01 && q.impressions >= 50)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 20),
  }

  // 6. Sitemaps
  const sitemaps = await fetchSitemaps(searchconsole, siteUrl)

  const result = {
    meta: {
      generatedAt: new Date().toISOString(),
      weekISO: `${year}-W${String(week).padStart(2, "0")}`,
      period,
      comparePeriod: compare,
      site: siteUrl,
      source: "GSC Search Analytics API v1 (period compare)",
    },
    summary,
    topQueries,
    topPages,
    bigMovers,
    opportunities,
    sitemaps,
  }

  const json = JSON.stringify(result, null, 2)

  if (outputPath) {
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, json, "utf-8")
    console.error(`✓ Salvo em ${outputPath} (${json.length} bytes)`)
  } else {
    console.log(json)
  }
}

main().catch((err) => {
  console.error("✗ Erro:", err.message)
  if (err.errors) console.error(JSON.stringify(err.errors, null, 2))
  process.exit(1)
})
