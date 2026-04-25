#!/usr/bin/env node

/**
 * Script: analyze-planta-vs-pronto.mjs
 *
 * Pesquisa pra reescrita do post "imovel-planta-vs-pronto-curitiba".
 * Snapshot diário não tem Situacao/Construtora/Empreendimento/Lancamento/AnoConstrucao,
 * então este script faz fetch live com os campos extras.
 *
 * Output: stdout JSON consolidado pra colar em doc Markdown.
 *
 * Privacidade: NÃO expõe volumes granulares (Bruno pediu cautela competitiva).
 * Apenas mediana/faixa/% e top-N anonimizado.
 */

import { config } from "dotenv"
import path from "node:path"
import fs from "node:fs"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.resolve(__dirname, "../../.env.local") })

const LOFT_API_KEY = process.env.LOFT_API_KEY
const LOFT_BASE_URL = "https://brunoces-rest.vistahost.com.br"

if (!LOFT_API_KEY) {
  console.error("LOFT_API_KEY não encontrada")
  process.exit(1)
}

const FIELDS = [
  "Codigo", "Bairro", "Cidade", "Finalidade", "Categoria", "Status",
  "ValorVenda", "ValorLocacao", "AreaPrivativa", "AreaTotal",
  "Dormitorios", "Suites", "Vagas",
  "Situacao", "Lancamento", "AnoConstrucao",
  "Empreendimento", "Construtora", "CodigoEmpreendimento",
  "ExibirNoSite", "DataCadastro", "DataAtualizacao",
]

function toNumber(raw) {
  if (raw == null || raw === "") return 0
  const s = String(raw).replace(/[^\d.,\-]/g, "")
  const cleaned = s.includes(",") && s.lastIndexOf(",") > s.lastIndexOf(".")
    ? s.replace(/\./g, "").replace(",", ".")
    : s.replace(/,/g, "")
  const n = Number(cleaned)
  return isFinite(n) && n > 0 ? n : 0
}

async function fetchLoftPage(pagina, pageSize = 50) {
  const params = new URLSearchParams({
    key: LOFT_API_KEY,
    showtotal: "1",
    pesquisa: JSON.stringify({
      fields: FIELDS,
      filter: { ExibirNoSite: "Sim" },
      paginacao: { pagina, quantidade: pageSize },
    }),
  })
  const url = `${LOFT_BASE_URL}/imoveis/listar?${params}`
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(30000),
  })
  if (!res.ok) throw new Error(`Loft API: ${res.status}`)
  return res.json()
}

function extractProperties(data) {
  const results = []
  for (const [key, value] of Object.entries(data)) {
    if (["total", "paginas", "pagina", "quantidade"].includes(key)) continue
    if (value && typeof value === "object" && "Codigo" in value) results.push(value)
  }
  return results
}

async function fetchAll() {
  const all = []
  const first = await fetchLoftPage(1, 50)
  const total = Number(first.total) || 0
  const totalPages = Math.min(Math.ceil(total / 50), 40)
  all.push(...extractProperties(first))
  process.stderr.write(`página 1/${totalPages} (${all.length})\n`)
  for (let p = 2; p <= totalPages; p++) {
    const data = await fetchLoftPage(p, 50)
    all.push(...extractProperties(data))
    process.stderr.write(`página ${p}/${totalPages} (${all.length})\n`)
  }
  return { all, totalAPI: total }
}

function median(arr) {
  if (!arr.length) return null
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function brl(n) {
  if (n == null) return "—"
  return "R$ " + Math.round(n).toLocaleString("pt-BR")
}

async function main() {
  const { all, totalAPI } = await fetchAll()
  process.stderr.write(`\nTotal API: ${totalAPI} | Coletados: ${all.length}\n`)

  // Distribuição bruta de Situacao + Lancamento + AnoConstrucao
  const situacaoDist = {}
  const lancamentoDist = {}
  const anoConstrucaoDist = {}
  const construtoraDist = {}
  const empreendimentoDist = {}

  // Categorizar planta vs pronto
  // CRITICO: validar valores reais antes de mapear
  const planta = []
  const pronto = []
  const indefinido = []

  for (const p of all) {
    const sit = p.Situacao || ""
    const lanc = p.Lancamento || ""
    const ano = p.AnoConstrucao || ""

    situacaoDist[sit || "(vazio)"] = (situacaoDist[sit || "(vazio)"] || 0) + 1
    lancamentoDist[lanc || "(vazio)"] = (lancamentoDist[lanc || "(vazio)"] || 0) + 1
    anoConstrucaoDist[ano || "(vazio)"] = (anoConstrucaoDist[ano || "(vazio)"] || 0) + 1

    const constr = p.Construtora || ""
    if (constr) construtoraDist[constr] = (construtoraDist[constr] || 0) + 1
    const emp = p.Empreendimento || ""
    if (emp) empreendimentoDist[emp] = (empreendimentoDist[emp] || 0) + 1

    // Classificação validada pela amostra real:
    // - Situacao = "Construção" => planta (em obras)
    // - Situacao = "Lancamento" => planta (lançamento)
    // - Lancamento = "Sim" => planta (independente de Situacao)
    // - Situacao = "Usado" => pronto
    // - Situacao = "Novo" + Lancamento = "Nao" => pronto (entregue, novo)
    // - vazio + Lancamento = "Nao" => pronto provavelmente (estoque antigo sem flag)
    const sitLower = sit.toLowerCase()
    const isPlanta =
      sitLower === "construção" ||
      sitLower === "construcao" ||
      sitLower === "lancamento" ||
      sitLower === "lançamento" ||
      lanc === "Sim"
    const isProntoUsado = sitLower === "usado"
    const isProntoNovo = sitLower === "novo" && lanc === "Nao"
    const isProntoVazio = sit === "" && lanc === "Nao"

    if (isPlanta) planta.push(p)
    else if (isProntoUsado || isProntoNovo || isProntoVazio) pronto.push(p)
    else indefinido.push(p)
  }

  // Análise por bairro
  function analyzeByBairro(arr) {
    const byBairro = {}
    for (const p of arr) {
      const b = p.Bairro || "(sem bairro)"
      if (!byBairro[b]) byBairro[b] = []
      byBairro[b].push(p)
    }
    const result = []
    for (const [b, items] of Object.entries(byBairro)) {
      const valores = items.map((x) => toNumber(x.ValorVenda)).filter((n) => n > 0)
      const areas = items.map((x) => toNumber(x.AreaPrivativa)).filter((n) => n > 0)
      const m2 = items
        .map((x) => {
          const v = toNumber(x.ValorVenda)
          const a = toNumber(x.AreaPrivativa)
          return v > 0 && a > 0 ? v / a : 0
        })
        .filter((n) => n > 0)
      result.push({
        bairro: b,
        n: items.length,
        mediana_valor: median(valores),
        mediana_area: median(areas),
        mediana_m2: median(m2),
        min_valor: valores.length ? Math.min(...valores) : null,
        max_valor: valores.length ? Math.max(...valores) : null,
      })
    }
    return result.sort((a, b) => b.n - a.n)
  }

  const plantaPorBairro = analyzeByBairro(planta)
  const prontoPorBairro = analyzeByBairro(pronto)

  // Spread planta vs pronto mesmo bairro (n>=3 em ambos)
  const spread = []
  for (const pl of plantaPorBairro) {
    if (pl.n < 3) continue
    const pr = prontoPorBairro.find((x) => x.bairro === pl.bairro)
    if (!pr || pr.n < 3) continue
    if (!pl.mediana_m2 || !pr.mediana_m2) continue
    const diff = pl.mediana_m2 - pr.mediana_m2
    const diffPct = ((pl.mediana_m2 / pr.mediana_m2) - 1) * 100
    spread.push({
      bairro: pl.bairro,
      n_planta: pl.n,
      n_pronto: pr.n,
      m2_planta: Math.round(pl.mediana_m2),
      m2_pronto: Math.round(pr.mediana_m2),
      diff_rs: Math.round(diff),
      diff_pct: Number(diffPct.toFixed(1)),
      planta_mais_caro: diff > 0,
    })
  }

  // Tickets de entrada (faixa)
  const valoresPlanta = planta.map((p) => toNumber(p.ValorVenda)).filter((n) => n > 0)
  const valoresPronto = pronto.map((p) => toNumber(p.ValorVenda)).filter((n) => n > 0)

  // Top construtoras (sem volume — apenas lista)
  const topConstrutoras = Object.entries(construtoraDist)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([nome, n]) => ({ nome, n }))

  const output = {
    meta: {
      data: new Date().toISOString(),
      total_api: totalAPI,
      total_coletado: all.length,
    },
    distribuicoes_brutas: {
      situacao: Object.entries(situacaoDist).sort((a, b) => b[1] - a[1]),
      lancamento: Object.entries(lancamentoDist).sort((a, b) => b[1] - a[1]),
      ano_construcao_top10: Object.entries(anoConstrucaoDist).sort((a, b) => b[1] - a[1]).slice(0, 10),
    },
    universo: {
      planta_count: planta.length,
      pronto_count: pronto.length,
      indefinido_count: indefinido.length,
      pct_planta: ((planta.length / all.length) * 100).toFixed(1),
      pct_pronto: ((pronto.length / all.length) * 100).toFixed(1),
      pct_indefinido: ((indefinido.length / all.length) * 100).toFixed(1),
    },
    planta_por_bairro_top10: plantaPorBairro.slice(0, 10),
    pronto_por_bairro_top10: prontoPorBairro.slice(0, 10),
    spread_planta_vs_pronto: spread.sort((a, b) => Math.abs(b.diff_pct) - Math.abs(a.diff_pct)),
    tickets: {
      planta: {
        min: valoresPlanta.length ? Math.min(...valoresPlanta) : null,
        max: valoresPlanta.length ? Math.max(...valoresPlanta) : null,
        mediana: median(valoresPlanta),
      },
      pronto: {
        min: valoresPronto.length ? Math.min(...valoresPronto) : null,
        max: valoresPronto.length ? Math.max(...valoresPronto) : null,
        mediana: median(valoresPronto),
      },
    },
    construtoras_top15: topConstrutoras,
    empreendimentos_count: Object.keys(empreendimentoDist).length,
    sample_planta: planta.slice(0, 5).map((p) => ({
      codigo: p.Codigo, bairro: p.Bairro, situacao: p.Situacao, lancamento: p.Lancamento,
      construtora: p.Construtora, empreendimento: p.Empreendimento,
      ano: p.AnoConstrucao, valor: toNumber(p.ValorVenda), area: toNumber(p.AreaPrivativa),
    })),
    sample_pronto: pronto.slice(0, 5).map((p) => ({
      codigo: p.Codigo, bairro: p.Bairro, situacao: p.Situacao, lancamento: p.Lancamento,
      ano: p.AnoConstrucao, valor: toNumber(p.ValorVenda), area: toNumber(p.AreaPrivativa),
    })),
    sample_indefinido: indefinido.slice(0, 5).map((p) => ({
      codigo: p.Codigo, bairro: p.Bairro, situacao: p.Situacao, lancamento: p.Lancamento,
      ano: p.AnoConstrucao, construtora: p.Construtora,
    })),
  }

  console.log(JSON.stringify(output, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
