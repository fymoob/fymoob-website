#!/usr/bin/env node

/**
 * Script: extract-stock-by-bairro.mjs
 *
 * Extrai estoque FYMOOB ativo por bairro: quantos imóveis em venda, aluguel, total.
 * Output usado em posts pra dar autoridade factual ("FYMOOB tem N imóveis ativos no Batel").
 *
 * Uso:
 *   node scripts/research/extract-stock-by-bairro.mjs
 *   node scripts/research/extract-stock-by-bairro.mjs --format=json > stock.json
 *   node scripts/research/extract-stock-by-bairro.mjs --bairro=batel
 *
 * Fonte: API Loft/Vista (LOFT_API_KEY obrigatório).
 * Protocolo: FYMOOB Research Protocol v1.0, Script #2.
 */

import { config } from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.resolve(__dirname, "../../.env.local") })

const LOFT_API_KEY = process.env.LOFT_API_KEY
const LOFT_BASE_URL = "https://brunoces-rest.vistahost.com.br"

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

function slugify(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
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

async function fetchLoftPage(pagina = 1, pageSize = 50) {
  const params = new URLSearchParams({
    key: LOFT_API_KEY,
    showtotal: "1",
    pesquisa: JSON.stringify({
      fields: ["Codigo", "Bairro", "Cidade", "Finalidade", "Categoria", "ValorVenda", "ValorLocacao", "Status"],
      filter: { ExibirNoSite: "Sim" },
      paginacao: { pagina, quantidade: pageSize },
    }),
  })
  const res = await fetch(`${LOFT_BASE_URL}/imoveis/listar?${params}`, {
    headers: { Accept: "application/json" },
  })
  if (!res.ok) throw new Error(`Loft API: ${res.status}`)
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

function extractStock(properties, bairroSlugFilter = null) {
  const byBairro = new Map()

  for (const p of properties) {
    const bairro = p.Bairro || "Desconhecido"
    const slug = slugify(bairro)
    if (bairroSlugFilter && slug !== bairroSlugFilter) continue

    if (!byBairro.has(slug)) {
      byBairro.set(slug, {
        bairro,
        slug,
        total: 0,
        venda: 0,
        aluguel: 0,
        dual: 0,
        por_categoria: new Map(),
        valores_venda: [],
        valores_aluguel: [],
      })
    }

    const group = byBairro.get(slug)
    group.total++

    const valorVenda = toNumber(p.ValorVenda)
    const valorLocacao = toNumber(p.ValorLocacao)
    const hasVenda = valorVenda > 0
    const hasAluguel = valorLocacao > 0

    if (hasVenda && hasAluguel) group.dual++
    if (hasVenda) {
      group.venda++
      group.valores_venda.push(valorVenda)
    }
    if (hasAluguel) {
      group.aluguel++
      group.valores_aluguel.push(valorLocacao)
    }

    const cat = p.Categoria || "Outros"
    group.por_categoria.set(cat, (group.por_categoria.get(cat) || 0) + 1)
  }

  const results = []
  for (const [, g] of byBairro) {
    const minVenda = g.valores_venda.length ? Math.min(...g.valores_venda) : null
    const maxVenda = g.valores_venda.length ? Math.max(...g.valores_venda) : null
    const avgVenda = g.valores_venda.length ? Math.round(g.valores_venda.reduce((a, b) => a + b, 0) / g.valores_venda.length) : null

    results.push({
      bairro: g.bairro,
      slug: g.slug,
      total: g.total,
      venda: g.venda,
      aluguel: g.aluguel,
      dual: g.dual,
      min_venda: minVenda,
      max_venda: maxVenda,
      avg_venda: avgVenda,
      top_categoria: [...g.por_categoria.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null,
    })
  }
  results.sort((a, b) => b.total - a.total)
  return results
}

function printTable(results) {
  console.log(`\n📦 Estoque FYMOOB por bairro — ${new Date().toLocaleDateString("pt-BR")}\n`)
  const header = ["Bairro", "Total", "Venda", "Aluguel", "Dual", "Ticket médio venda", "Top categoria"]
  const widths = [22, 7, 7, 9, 6, 22, 22]
  const sep = "│"
  const line = (cells) => cells.map((c, i) => String(c || "").padEnd(widths[i])).join(sep)
  console.log(line(header))
  console.log(widths.map((w) => "─".repeat(w)).join("┼"))

  for (const r of results.slice(0, 50)) {
    console.log(
      line([
        r.bairro.slice(0, 21),
        r.total,
        r.venda,
        r.aluguel,
        r.dual,
        r.avg_venda ? `R$ ${r.avg_venda.toLocaleString("pt-BR")}` : "-",
        (r.top_categoria || "").slice(0, 21),
      ])
    )
  }
  console.log(`\n📊 ${results.length} bairros. Total imóveis ativos: ${results.reduce((a, b) => a + b.total, 0)}\n`)
}

async function main() {
  const silent = args.format === "json"
  if (!silent) console.log("🔎 Buscando estoque FYMOOB...")
  const properties = await fetchAllProperties()
  if (!silent) console.log(`   ${properties.length} imóveis ativos\n`)

  const results = extractStock(properties, args.bairro ? slugify(args.bairro) : null)

  if (args.format === "json") {
    console.log(
      JSON.stringify(
        {
          generated_at: new Date().toISOString(),
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
