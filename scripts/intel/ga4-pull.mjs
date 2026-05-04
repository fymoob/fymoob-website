#!/usr/bin/env node
/**
 * Sprint 1 — Analytics Intelligence (Linha A)
 * Evidence collector pra GA4. Roda deterministico, gera JSON, ZERO LLM.
 *
 * Foco em eventos de conversao do site (commit 6b41c28):
 *   - whatsapp_click (com data-source: float, footer, hero_primary, etc)
 *   - generate_lead (com form_id: contact_form, contact_sidebar, etc)
 *   - property_contact_click (legado, channel: whatsapp/phone)
 *
 * Uso:
 *   node scripts/intel/ga4-pull.mjs                    # stdout
 *   node scripts/intel/ga4-pull.mjs --output tmp/intel/ga4-2026-W19.json
 *   node scripts/intel/ga4-pull.mjs --mock             # mock data (dev)
 *
 * Env vars:
 *   GOOGLE_SERVICE_ACCOUNT_JSON  — service account JSON (compartilhado com GSC)
 *   GA4_PROPERTY_ID              — ID numerico (ex: 123456789)
 *
 * Pre-requisito: service account com role Viewer no GA4 property +
 * "Google Analytics Data API" habilitada no Google Cloud project.
 *
 * Output JSON estrutura:
 *   {
 *     meta: { generatedAt, weekISO, period, comparePeriod, propertyId },
 *     pageviews: { period, compare, deltas },
 *     conversions: {
 *       whatsapp_click: { total, byPeriod, bySource: { float: N, footer: N, ... } },
 *       generate_lead: { total, byPeriod, byForm: { contact_sidebar: N, ... } },
 *     },
 *     funnels: { pageView: N, whatsappClick: N, generateLead: N },
 *     topConvertingPages: [...]  // top 20 pages by conversions
 *   }
 */

import { BetaAnalyticsDataClient } from "@google-analytics/data"
import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"

const args = process.argv.slice(2)
const getArg = (flag) => {
  const idx = args.indexOf(flag)
  return idx >= 0 ? args[idx + 1] : null
}
const outputPath = getArg("--output")
const useMock = args.includes("--mock")

// ─────────────────────────────────────────────────────────────────────────
// Helpers de data (mesma logica do gsc-pull.mjs pra alinhar periodos)
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
  // GA4 tem latencia menor que GSC (~1-2 dias), mas alinhamos com GSC
  // (D-10 a D-3 + compare D-17 a D-10) pra correlacao.
  const end = new Date(refDate)
  end.setUTCDate(end.getUTCDate() - 3)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 6)

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
// Mock data (dev sem service account configurada)
// ─────────────────────────────────────────────────────────────────────────

function buildMockOutput(meta) {
  return {
    meta: { ...meta, source: "MOCK DATA — service account nao configurada" },
    pageviews: {
      period: { sessions: 420, pageviews: 1200, users: 380 },
      compare: { sessions: 390, pageviews: 1100, users: 350 },
      deltas: { sessions: 30, pageviews: 100, users: 30 },
    },
    conversions: {
      whatsapp_click: {
        total: 24,
        compareTotal: 18,
        delta: 6,
        bySource: { float: 11, footer: 3, hero_primary: 5, card: 4, landing_seo: 1 },
      },
      generate_lead: {
        total: 7,
        compareTotal: 5,
        delta: 2,
        byForm: { contact_sidebar: 4, mobile_inline: 2, contact_form: 1 },
      },
      property_contact_click: {
        total: 18,
        byChannel: { whatsapp: 14, phone: 4 },
      },
    },
    funnels: {
      pageView: 1200,
      whatsappClick: 24,
      generateLead: 7,
      ctaClickRate: "2.0%",
      leadConversionRate: "0.58%",
    },
    topConvertingPages: [
      { page: "/imovel/apartamento-batel-...", conversions: 3, source: "contact_sidebar" },
      { page: "/empreendimento/reserva-barigui", conversions: 2, source: "whatsapp_click:hero_primary" },
    ],
  }
}

// ─────────────────────────────────────────────────────────────────────────
// GA4 client
// ─────────────────────────────────────────────────────────────────────────

function getServiceAccount() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch (err) {
    console.error("✗ GOOGLE_SERVICE_ACCOUNT_JSON nao e JSON valido:", err.message)
    return null
  }
}

function getClient() {
  const credentials = getServiceAccount()
  if (!credentials) return null
  return new BetaAnalyticsDataClient({ credentials })
}

async function runReport(client, propertyId, body) {
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    ...body,
  })
  return response
}

function rowsToObject(response) {
  if (!response.rows) return []
  return response.rows.map((row) => {
    const obj = {}
    response.dimensionHeaders.forEach((h, i) => {
      obj[h.name] = row.dimensionValues[i].value
    })
    response.metricHeaders.forEach((h, i) => {
      const v = row.metricValues[i].value
      obj[h.name] = isNaN(Number(v)) ? v : Number(v)
    })
    return obj
  })
}

// ─────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────

async function main() {
  const ref = new Date()
  const { period, compare } = computePeriods(ref)
  const { year, week } = isoWeek(ref)

  const meta = {
    generatedAt: new Date().toISOString(),
    weekISO: `${year}-W${String(week).padStart(2, "0")}`,
    period,
    comparePeriod: compare,
    propertyId: process.env.GA4_PROPERTY_ID || null,
    source: "GA4 Analytics Data API v1beta",
  }

  // Modo mock (dev local sem credentials)
  if (useMock || (!getServiceAccount() && !process.env.GA4_PROPERTY_ID)) {
    const result = buildMockOutput(meta)
    const json = JSON.stringify(result, null, 2)
    if (outputPath) {
      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await fs.writeFile(outputPath, json, "utf-8")
      console.error(`✓ Salvo em ${outputPath} (MOCK DATA, ${json.length} bytes)`)
    } else {
      console.log(json)
    }
    return
  }

  const propertyId = process.env.GA4_PROPERTY_ID
  if (!propertyId) {
    console.error("✗ GA4_PROPERTY_ID nao definida no env. Use --mock pra dev.")
    process.exit(1)
  }

  const client = getClient()
  if (!client) {
    console.error("✗ GOOGLE_SERVICE_ACCOUNT_JSON nao configurada. Use --mock pra dev.")
    process.exit(1)
  }

  console.error(`▸ GA4 pull pra property ${propertyId}`)
  console.error(`  Period:  ${period.start} → ${period.end}`)
  console.error(`  Compare: ${compare.start} → ${compare.end}`)

  // 1. Pageviews + sessions (period vs compare)
  const buildSessionsRequest = (range) => ({
    dateRanges: [{ startDate: range.start, endDate: range.end }],
    metrics: [
      { name: "sessions" },
      { name: "screenPageViews" },
      { name: "totalUsers" },
    ],
  })
  const [sessionsPeriod, sessionsCompare] = await Promise.all([
    runReport(client, propertyId, buildSessionsRequest(period)),
    runReport(client, propertyId, buildSessionsRequest(compare)),
  ])
  const periodTotals = rowsToObject(sessionsPeriod)[0] || { sessions: 0, screenPageViews: 0, totalUsers: 0 }
  const compareTotals = rowsToObject(sessionsCompare)[0] || { sessions: 0, screenPageViews: 0, totalUsers: 0 }

  // 2. whatsapp_click por source (data-source param)
  const whatsappReport = await runReport(client, propertyId, {
    dateRanges: [{ startDate: period.start, endDate: period.end }],
    dimensions: [{ name: "customEvent:source" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: { fieldName: "eventName", stringFilter: { value: "whatsapp_click" } },
    },
    limit: 50,
  })
  const whatsappBySource = rowsToObject(whatsappReport).reduce((acc, r) => {
    acc[r["customEvent:source"] || "unknown"] = r.eventCount
    return acc
  }, {})

  // 3. generate_lead por form_id
  const leadReport = await runReport(client, propertyId, {
    dateRanges: [{ startDate: period.start, endDate: period.end }],
    dimensions: [{ name: "customEvent:form_id" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: { fieldName: "eventName", stringFilter: { value: "generate_lead" } },
    },
    limit: 50,
  })
  const leadByForm = rowsToObject(leadReport).reduce((acc, r) => {
    acc[r["customEvent:form_id"] || "unknown"] = r.eventCount
    return acc
  }, {})

  // 4. Compare: totais de cada evento na semana anterior
  const compareEventCounts = async (eventName) => {
    const r = await runReport(client, propertyId, {
      dateRanges: [{ startDate: compare.start, endDate: compare.end }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: { fieldName: "eventName", stringFilter: { value: eventName } },
      },
    })
    return rowsToObject(r)[0]?.eventCount || 0
  }
  const [whatsappCompareTotal, leadCompareTotal] = await Promise.all([
    compareEventCounts("whatsapp_click"),
    compareEventCounts("generate_lead"),
  ])
  const whatsappTotal = Object.values(whatsappBySource).reduce((s, v) => s + v, 0)
  const leadTotal = Object.values(leadByForm).reduce((s, v) => s + v, 0)

  // 5. Top converting pages — paginas com mais eventos de conversao
  const topPagesReport = await runReport(client, propertyId, {
    dateRanges: [{ startDate: period.start, endDate: period.end }],
    dimensions: [{ name: "pagePath" }, { name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: { values: ["whatsapp_click", "generate_lead", "property_contact_click"] },
      },
    },
    limit: 100,
  })
  const topConvertingPages = rowsToObject(topPagesReport)
    .sort((a, b) => b.eventCount - a.eventCount)
    .slice(0, 20)

  const result = {
    meta,
    pageviews: {
      period: {
        sessions: periodTotals.sessions,
        pageviews: periodTotals.screenPageViews,
        users: periodTotals.totalUsers,
      },
      compare: {
        sessions: compareTotals.sessions,
        pageviews: compareTotals.screenPageViews,
        users: compareTotals.totalUsers,
      },
      deltas: {
        sessions: periodTotals.sessions - compareTotals.sessions,
        pageviews: periodTotals.screenPageViews - compareTotals.screenPageViews,
        users: periodTotals.totalUsers - compareTotals.totalUsers,
      },
    },
    conversions: {
      whatsapp_click: {
        total: whatsappTotal,
        compareTotal: whatsappCompareTotal,
        delta: whatsappTotal - whatsappCompareTotal,
        bySource: whatsappBySource,
      },
      generate_lead: {
        total: leadTotal,
        compareTotal: leadCompareTotal,
        delta: leadTotal - leadCompareTotal,
        byForm: leadByForm,
      },
    },
    funnels: {
      pageView: periodTotals.screenPageViews,
      whatsappClick: whatsappTotal,
      generateLead: leadTotal,
      ctaClickRate: periodTotals.screenPageViews
        ? ((whatsappTotal / periodTotals.screenPageViews) * 100).toFixed(2) + "%"
        : "0%",
      leadConversionRate: periodTotals.screenPageViews
        ? ((leadTotal / periodTotals.screenPageViews) * 100).toFixed(2) + "%"
        : "0%",
    },
    topConvertingPages,
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
