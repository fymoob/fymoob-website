#!/usr/bin/env node

/**
 * Script: calculate-yield-by-bairro.mjs
 *
 * Calcula yield real por bairro usando aluguel e venda da API Loft/FYMOOB CRM.
 * Output: tabela com yield mensal e anual por bairro, com amostra declarada.
 *
 * Regra: só mostra yield "confiável" quando n ≥ 7 em cada categoria (venda + aluguel).
 * Bairros com n < 7 aparecem como INDICATIVOS.
 *
 * Uso:
 *   node scripts/research/calculate-yield-by-bairro.mjs
 *   node scripts/research/calculate-yield-by-bairro.mjs --bairro=batel
 *   node scripts/research/calculate-yield-by-bairro.mjs --format=json > yields.json
 *
 * Fonte: API Loft/Vista (LOFT_API_KEY obrigatório).
 * Protocolo: FYMOOB Research Protocol v1.0, Script #1 prioritário.
 */

import { config } from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, "../../.env.local")
config({ path: envPath })

const LOFT_API_KEY = process.env.LOFT_API_KEY
const LOFT_BASE_URL = "https://brunoces-rest.vistahost.com.br"
const MIN_SAMPLE_SIZE = 7

if (!LOFT_API_KEY) {
  console.error("❌ LOFT_API_KEY não encontrada em .env.local")
  process.exit(1)
}

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=")
    return [k, v ?? true]
  })
)

async function fetchLoftPage(pagina = 1, pageSize = 50) {
  const params = new URLSearchParams({
    key: LOFT_API_KEY,
    showtotal: "1",
    pesquisa: JSON.stringify({
      fields: [
        "Codigo",
        "Bairro",
        "Cidade",
        "Finalidade",
        "Categoria",
        "ValorVenda",
        "ValorLocacao",
        "AreaPrivativa",
        "AreaTotal",
        "Dormitorios",
        "Status",
      ],
      filter: { ExibirNoSite: "Sim" },
      paginacao: { pagina, quantidade: pageSize },
    }),
  })
  const url = `${LOFT_BASE_URL}/imoveis/listar?${params}`
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  if (!res.ok) throw new Error(`Loft API: ${res.status} ${res.statusText}`)
  return res.json()
}

function extractProperties(data) {
  const results = []
  for (const [key, value] of Object.entries(data)) {
    if (["total", "paginas", "pagina", "quantidade"].includes(key)) continue
    if (value && typeof value === "object" && "Codigo" in value) {
      results.push(value)
    }
  }
  return results
}

async function fetchAllProperties() {
  const all = []
  const pageSize = 50
  const first = await fetchLoftPage(1, pageSize)
  const total = Number(first.total) || 0
  const totalPages = Math.min(Math.ceil(total / pageSize), 40)
  all.push(...extractProperties(first))
  for (let p = 2; p <= totalPages; p++) {
    const data = await fetchLoftPage(p, pageSize)
    all.push(...extractProperties(data))
  }
  return all
}

function slugify(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function toNumber(raw) {
  if (raw == null || raw === "") return 0
  const s = String(raw).replace(/[^\d.,\-]/g, "")
  const cleaned = s.includes(",") && s.lastIndexOf(",") > s.lastIndexOf(".") ? s.replace(/\./g, "").replace(",", ".") : s.replace(/,/g, "")
  const n = Number(cleaned)
  return isFinite(n) && n > 0 ? n : 0
}

function calcYield(properties, bairroSlugFilter = null) {
  const byBairro = new Map()

  for (const p of properties) {
    const bairro = p.Bairro || "Desconhecido"
    const slug = slugify(bairro)
    if (bairroSlugFilter && slug !== bairroSlugFilter) continue

    if (!byBairro.has(slug)) {
      byBairro.set(slug, { bairro, slug, venda: [], aluguel: [] })
    }
    const group = byBairro.get(slug)

    const valorVenda = toNumber(p.ValorVenda)
    const valorLocacao = toNumber(p.ValorLocacao)
    const area = toNumber(p.AreaPrivativa) || toNumber(p.AreaTotal)

    if (valorVenda > 0 && area > 0) {
      group.venda.push({ preco: valorVenda, area, precoM2: valorVenda / area })
    }
    if (valorLocacao > 0 && area > 0) {
      group.aluguel.push({ preco: valorLocacao, area, precoM2: valorLocacao / area })
    }
  }

  const results = []
  for (const [, group] of byBairro) {
    const nVenda = group.venda.length
    const nAluguel = group.aluguel.length
    const nMin = Math.min(nVenda, nAluguel)

    const avgVendaM2 = nVenda > 0 ? group.venda.reduce((a, b) => a + b.precoM2, 0) / nVenda : null
    const avgAluguelM2 = nAluguel > 0 ? group.aluguel.reduce((a, b) => a + b.precoM2, 0) / nAluguel : null

    let yieldAno = null
    let yieldMes = null
    if (avgVendaM2 && avgAluguelM2 && avgVendaM2 > 0) {
      yieldAno = ((avgAluguelM2 * 12) / avgVendaM2) * 100
      yieldMes = (avgAluguelM2 / avgVendaM2) * 100
    }

    const confiabilidade =
      nVenda >= MIN_SAMPLE_SIZE && nAluguel >= MIN_SAMPLE_SIZE
        ? "alta"
        : nMin >= 3
        ? "media"
        : "baixa"

    results.push({
      bairro: group.bairro,
      slug: group.slug,
      n_venda: nVenda,
      n_aluguel: nAluguel,
      n_min: nMin,
      confiabilidade,
      avg_venda_m2: avgVendaM2 ? Math.round(avgVendaM2) : null,
      avg_aluguel_m2: avgAluguelM2 ? Math.round(avgAluguelM2 * 100) / 100 : null,
      yield_mes_pct: yieldMes ? Math.round(yieldMes * 1000) / 1000 : null,
      yield_ano_pct: yieldAno ? Math.round(yieldAno * 100) / 100 : null,
    })
  }

  results.sort((a, b) => (b.n_min || 0) - (a.n_min || 0))
  return results
}

function printTable(results) {
  console.log(`\n📊 Yield por bairro — FYMOOB CRM, ${new Date().toLocaleDateString("pt-BR")}`)
  console.log(`    Amostra mínima pra alta confiança: n ≥ ${MIN_SAMPLE_SIZE}\n`)

  const header = ["Bairro", "n venda", "n aluguel", "Avg venda/m²", "Avg aluguel/m²", "Yield %/mês", "Yield %/ano", "Confiab."]
  const widths = [22, 8, 10, 14, 16, 12, 12, 9]
  const sep = "│"

  const line = (cells) => cells.map((c, i) => String(c || "").padEnd(widths[i])).join(sep)
  console.log(line(header))
  console.log(widths.map((w) => "─".repeat(w)).join("┼"))

  for (const r of results) {
    const flag = r.confiabilidade === "alta" ? "🟢" : r.confiabilidade === "media" ? "🟡" : "🔴"
    console.log(
      line([
        r.bairro.slice(0, 21),
        r.n_venda,
        r.n_aluguel,
        r.avg_venda_m2 ? `R$ ${r.avg_venda_m2.toLocaleString("pt-BR")}` : "-",
        r.avg_aluguel_m2 ? `R$ ${r.avg_aluguel_m2.toFixed(2)}` : "-",
        r.yield_mes_pct != null ? `${r.yield_mes_pct.toFixed(2)}%` : "-",
        r.yield_ano_pct != null ? `${r.yield_ano_pct.toFixed(1)}%` : "-",
        `${flag} ${r.confiabilidade}`,
      ])
    )
  }

  const altaConf = results.filter((r) => r.confiabilidade === "alta")
  console.log(`\n✅ ${altaConf.length} bairros com confiança alta (n ≥ ${MIN_SAMPLE_SIZE} em venda + aluguel)`)
  console.log(`   Use estes em posts com número direto. Os demais precisam de disclaimer "indicativo".\n`)
}

async function main() {
  const silent = args.format === "json"
  if (!silent) console.log("🔎 Buscando imóveis da API Loft/FYMOOB CRM...")
  const properties = await fetchAllProperties()
  if (!silent) console.log(`   ${properties.length} imóveis ativos encontrados\n`)

  const results = calcYield(properties, args.bairro ? slugify(args.bairro) : null)

  if (args.format === "json") {
    console.log(
      JSON.stringify(
        {
          generated_at: new Date().toISOString(),
          sample_min_for_high_confidence: MIN_SAMPLE_SIZE,
          total_properties: properties.length,
          results,
        },
        null,
        2
      )
    )
  } else {
    printTable(results)
  }
}

main().catch((err) => {
  console.error("❌ Erro:", err.message)
  process.exit(1)
})
