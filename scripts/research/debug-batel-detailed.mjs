#!/usr/bin/env node
// Batel-specific profile with studio bucket (<40m²) and IQR.
// Aggregated only — writer does not copy volume.
import { config } from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.resolve(__dirname, "../../.env.local") })

const LOFT_API_KEY = process.env.LOFT_API_KEY
const LOFT_BASE_URL = "https://brunoces-rest.vistahost.com.br"

function num(raw) {
  if (raw == null || raw === "") return 0
  const s = String(raw).replace(/[^\d.,\-]/g, "")
  const c = s.includes(",") && s.lastIndexOf(",") > s.lastIndexOf(".")
    ? s.replace(/\./g, "").replace(",", ".")
    : s.replace(/,/g, "")
  const n = Number(c)
  return isFinite(n) && n > 0 ? n : 0
}

async function fetchPage(p, size = 50) {
  const qs = new URLSearchParams({
    key: LOFT_API_KEY,
    showtotal: "1",
    pesquisa: JSON.stringify({
      fields: [
        "Codigo","Bairro","Cidade","Finalidade","Categoria",
        "ValorVenda","ValorLocacao","AreaPrivativa","AreaTotal",
        "Dormitorios","Suites","Status"
      ],
      filter: { ExibirNoSite: "Sim", Bairro: "Batel" },
      paginacao: { pagina: p, quantidade: size },
    }),
  })
  const r = await fetch(`${LOFT_BASE_URL}/imoveis/listar?${qs}`, { headers: { Accept: "application/json" }})
  return r.json()
}
function extract(data) {
  const out = []
  for (const [k, v] of Object.entries(data)) {
    if (["total","paginas","pagina","quantidade"].includes(k)) continue
    if (v && typeof v === "object" && "Codigo" in v) out.push(v)
  }
  return out
}

const size = 50
const first = await fetchPage(1, size)
const total = Number(first.total) || 0
console.error("API reporta total Batel:", total)
const pages = Math.min(Math.ceil(total / size), 10)
const props = extract(first)
for (let p = 2; p <= pages; p++) props.push(...extract(await fetchPage(p, size)))
console.error("Fetched:", props.length)

const summary = props.map(p => ({
  codigo: p.Codigo,
  categoria: p.Categoria,
  finalidade: p.Finalidade,
  bairro: p.Bairro,
  cidade: p.Cidade,
  valorVenda: num(p.ValorVenda),
  valorLocacao: num(p.ValorLocacao),
  areaPrivativa: num(p.AreaPrivativa),
  areaTotal: num(p.AreaTotal),
  dormitorios: Number(p.Dormitorios) || 0,
  suites: Number(p.Suites) || 0,
}))

const buckets = { studio_lt40: 0, compacto_40_70: 0, medio_70_150: 0, grande_gt150: 0, sem_area: 0 }
const dormMix = { d0: 0, d1: 0, d2: 0, d3: 0, d4plus: 0 }
const tickets = []
const tipologias = {}
let vendaCount = 0, aluguelCount = 0
const areas = []

for (const p of summary) {
  if (p.cidade && p.cidade !== "Curitiba") continue
  tipologias[p.categoria || "?"] = (tipologias[p.categoria || "?"] || 0) + 1
  const area = p.areaPrivativa || p.areaTotal
  if (area > 0 && area < 2000) {
    areas.push(area)
    if (area < 40) buckets.studio_lt40++
    else if (area < 70) buckets.compacto_40_70++
    else if (area <= 150) buckets.medio_70_150++
    else buckets.grande_gt150++
  } else {
    buckets.sem_area++
  }
  const d = p.dormitorios
  if (d === 0) dormMix.d0++
  else if (d === 1) dormMix.d1++
  else if (d === 2) dormMix.d2++
  else if (d === 3) dormMix.d3++
  else if (d >= 4) dormMix.d4plus++
  if (p.valorVenda > 0) { vendaCount++; tickets.push(p.valorVenda) }
  if (p.valorLocacao > 0) aluguelCount++
}

tickets.sort((a, b) => a - b)
function quantile(arr, q) {
  if (!arr.length) return null
  const pos = (arr.length - 1) * q
  const base = Math.floor(pos)
  const rest = pos - base
  if (arr[base + 1] != null) return arr[base] + rest * (arr[base + 1] - arr[base])
  return arr[base]
}

const nTipicos = summary.filter(p => !p.cidade || p.cidade === "Curitiba").length

const out = {
  generated_at: new Date().toISOString(),
  bairro: "Batel",
  n_total: nTipicos,
  n_venda: vendaCount,
  n_aluguel: aluguelCount,
  tipologias,
  buckets_por_metragem_contagem: buckets,
  pct_por_metragem: areas.length ? {
    studio_lt40: Math.round(100 * buckets.studio_lt40 / areas.length),
    compacto_40_70: Math.round(100 * buckets.compacto_40_70 / areas.length),
    medio_70_150: Math.round(100 * buckets.medio_70_150 / areas.length),
    grande_gt150: Math.round(100 * buckets.grande_gt150 / areas.length),
  } : null,
  dorm_mix_contagem: dormMix,
  dorm_mix_pct: nTipicos ? {
    studio_d0: Math.round(100 * dormMix.d0 / nTipicos),
    d1: Math.round(100 * dormMix.d1 / nTipicos),
    d2: Math.round(100 * dormMix.d2 / nTipicos),
    d3: Math.round(100 * dormMix.d3 / nTipicos),
    d4plus: Math.round(100 * dormMix.d4plus / nTipicos),
  } : null,
  area_stats_m2: areas.length ? {
    min: Math.min(...areas),
    max: Math.max(...areas),
    media: Math.round(areas.reduce((a,b)=>a+b,0) / areas.length),
    mediana: quantile([...areas].sort((a,b)=>a-b), 0.5),
  } : null,
  ticket_venda: tickets.length ? {
    n: tickets.length,
    min: tickets[0],
    max: tickets[tickets.length - 1],
    media: Math.round(tickets.reduce((a,b)=>a+b,0) / tickets.length),
    q1: Math.round(quantile(tickets, 0.25)),
    mediana: Math.round(quantile(tickets, 0.5)),
    q3: Math.round(quantile(tickets, 0.75)),
    IQR: Math.round(quantile(tickets, 0.75) - quantile(tickets, 0.25)),
  } : null,
  detalhe: summary,
}

console.log(JSON.stringify(out, null, 2))
