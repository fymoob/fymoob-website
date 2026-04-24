#!/usr/bin/env node
// Ecoville (Mossunguê + Ecoville) vs Bigorrilho detailed profile.
// Aggregated only — writer does not copy volume.
// Specific asks:
//   - Ecoville: split apartamento vs casa-em-condomínio (% e ticket)
//   - Bigorrilho: split apartamento 2Q (padrão família) vs apto 3Q+ alto padrão
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

async function fetchPageFor(bairroFilter, p, size = 50) {
  const qs = new URLSearchParams({
    key: LOFT_API_KEY,
    showtotal: "1",
    pesquisa: JSON.stringify({
      fields: [
        "Codigo","Bairro","Cidade","Finalidade","Categoria",
        "ValorVenda","ValorLocacao","AreaPrivativa","AreaTotal",
        "Dormitorios","Suites","Status"
      ],
      filter: { ExibirNoSite: "Sim", Bairro: bairroFilter },
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

async function fetchBairro(bairroFilter) {
  const size = 50
  const first = await fetchPageFor(bairroFilter, 1, size)
  const total = Number(first.total) || 0
  const pages = Math.min(Math.ceil(total / size), 10)
  const props = extract(first)
  for (let p = 2; p <= pages; p++) props.push(...extract(await fetchPageFor(bairroFilter, p, size)))
  return { apiTotal: total, props }
}

function quantile(arr, q) {
  if (!arr.length) return null
  const sorted = [...arr].sort((a, b) => a - b)
  const pos = (sorted.length - 1) * q
  const base = Math.floor(pos)
  const rest = pos - base
  if (sorted[base + 1] != null) return sorted[base] + rest * (sorted[base + 1] - sorted[base])
  return sorted[base]
}

function pct(part, total) {
  if (!total) return null
  return Math.round(100 * part / total)
}

function classifyTipo(cat) {
  const c = (cat || "").toLowerCase()
  if (c.includes("apart")) return "apto"
  if (c.includes("sobrado")) return "sobrado"
  if (c.includes("casa")) return "casa"
  if (c.includes("terreno")) return "terreno"
  return "outro"
}

function profileSubset(props, label) {
  const onlyCuritiba = props.filter(p => !p.Cidade || p.Cidade === "Curitiba")
  const tipologias = {}
  const buckets = { lt70: 0, m70_150: 0, gt150: 0, sem_area: 0 }
  const dormMix = { d0: 0, d1: 0, d2: 0, d3: 0, d4plus: 0 }
  const tickets = []
  const areas = []
  let vendaCount = 0, aluguelCount = 0
  let aptosCount = 0, casasCount = 0, sobradosCount = 0
  const aptoTickets = [], casaTickets = [], sobradoTickets = []
  const apto2Tickets = [], apto3Tickets = [], apto4plusTickets = []
  const apto2Areas = [], apto3Areas = [], apto4plusAreas = []

  for (const p of onlyCuritiba) {
    const cat = p.Categoria || "?"
    tipologias[cat] = (tipologias[cat] || 0) + 1
    const tipo = classifyTipo(cat)
    if (tipo === "apto") aptosCount++
    else if (tipo === "casa") casasCount++
    else if (tipo === "sobrado") sobradosCount++

    const area = num(p.AreaPrivativa) || num(p.AreaTotal)
    if (area > 0 && area < 2000) {
      areas.push(area)
      if (area < 70) buckets.lt70++
      else if (area <= 150) buckets.m70_150++
      else buckets.gt150++
    } else {
      buckets.sem_area++
    }

    const d = Number(p.Dormitorios) || 0
    if (d === 0) dormMix.d0++
    else if (d === 1) dormMix.d1++
    else if (d === 2) dormMix.d2++
    else if (d === 3) dormMix.d3++
    else if (d >= 4) dormMix.d4plus++

    const vv = num(p.ValorVenda)
    const vl = num(p.ValorLocacao)
    if (vv > 0) {
      vendaCount++
      tickets.push(vv)
      if (tipo === "apto") {
        aptoTickets.push(vv)
        if (d === 2) { apto2Tickets.push(vv); if (area > 0) apto2Areas.push(area) }
        else if (d === 3) { apto3Tickets.push(vv); if (area > 0) apto3Areas.push(area) }
        else if (d >= 4) { apto4plusTickets.push(vv); if (area > 0) apto4plusAreas.push(area) }
      } else if (tipo === "casa") casaTickets.push(vv)
      else if (tipo === "sobrado") sobradoTickets.push(vv)
    }
    if (vl > 0) aluguelCount++
  }

  const n = onlyCuritiba.length
  const areasN = areas.length

  const statBlock = (arr) => arr.length ? {
    n: arr.length,
    min: Math.round(Math.min(...arr)),
    max: Math.round(Math.max(...arr)),
    media: Math.round(arr.reduce((a,b)=>a+b,0) / arr.length),
    q1: Math.round(quantile(arr, 0.25)),
    mediana: Math.round(quantile(arr, 0.5)),
    q3: Math.round(quantile(arr, 0.75)),
    IQR: Math.round(quantile(arr, 0.75) - quantile(arr, 0.25)),
  } : null

  return {
    label,
    n_total: n,
    n_venda: vendaCount,
    n_aluguel: aluguelCount,
    tipologias,
    tipo_split_pct: {
      apto: pct(aptosCount, n),
      casa: pct(casasCount, n),
      sobrado: pct(sobradosCount, n),
      casa_mais_sobrado: pct(casasCount + sobradosCount, n),
    },
    tipo_split_contagem: {
      apto: aptosCount,
      casa: casasCount,
      sobrado: sobradosCount,
    },
    buckets_metragem_contagem: buckets,
    pct_por_metragem: areasN ? {
      compacto_lt70: pct(buckets.lt70, areasN),
      medio_70_150: pct(buckets.m70_150, areasN),
      grande_gt150: pct(buckets.gt150, areasN),
    } : null,
    dorm_mix_contagem: dormMix,
    dorm_mix_pct: n ? {
      d0_studio: pct(dormMix.d0, n),
      d1: pct(dormMix.d1, n),
      d2: pct(dormMix.d2, n),
      d3: pct(dormMix.d3, n),
      d4plus: pct(dormMix.d4plus, n),
    } : null,
    area_stats_m2: statBlock(areas),
    ticket_venda_total: statBlock(tickets),
    ticket_apto: statBlock(aptoTickets),
    ticket_casa_sobrado: statBlock([...casaTickets, ...sobradoTickets]),
    ticket_apto_2dorm: statBlock(apto2Tickets),
    ticket_apto_3dorm: statBlock(apto3Tickets),
    ticket_apto_4plus: statBlock(apto4plusTickets),
    area_apto_2dorm: statBlock(apto2Areas),
    area_apto_3dorm: statBlock(apto3Areas),
    area_apto_4plus: statBlock(apto4plusAreas),
  }
}

// ---- Fetch both bairros
console.error("Fetching Mossunguê...")
const moss = await fetchBairro("Mossunguê")
console.error(`  api_total=${moss.apiTotal}, fetched=${moss.props.length}`)

console.error("Fetching Ecoville (nome literal)...")
let eco = { apiTotal: 0, props: [] }
try {
  eco = await fetchBairro("Ecoville")
  console.error(`  api_total=${eco.apiTotal}, fetched=${eco.props.length}`)
} catch (e) {
  console.error(`  err: ${e.message}`)
}

console.error("Fetching Bigorrilho...")
const big = await fetchBairro("Bigorrilho")
console.error(`  api_total=${big.apiTotal}, fetched=${big.props.length}`)

// Merge: "Ecoville" macro = Mossunguê + Ecoville nominal (se existir)
const ecovilleMacroProps = [...moss.props, ...eco.props]

const ecovilleMacro = profileSubset(ecovilleMacroProps, "Ecoville (Mossunguê + Ecoville)")
const mossungueOnly = profileSubset(moss.props, "Mossunguê (só)")
const ecovilleOnly = profileSubset(eco.props, "Ecoville (nome literal)")
const bigorrilho = profileSubset(big.props, "Bigorrilho")

// Detalhe das amostras (útil pra debug de casa em condomínio no Ecoville)
const detalheEco = ecovilleMacroProps.filter(p => !p.Cidade || p.Cidade === "Curitiba").map(p => ({
  codigo: p.Codigo,
  bairro: p.Bairro,
  categoria: p.Categoria,
  dorm: Number(p.Dormitorios) || 0,
  valor_venda: num(p.ValorVenda),
  area_priv: num(p.AreaPrivativa),
  area_total: num(p.AreaTotal),
}))
const detalheBig = big.props.filter(p => !p.Cidade || p.Cidade === "Curitiba").map(p => ({
  codigo: p.Codigo,
  bairro: p.Bairro,
  categoria: p.Categoria,
  dorm: Number(p.Dormitorios) || 0,
  valor_venda: num(p.ValorVenda),
  area_priv: num(p.AreaPrivativa),
  area_total: num(p.AreaTotal),
}))

const out = {
  generated_at: new Date().toISOString(),
  source: "Loft/Vista API FYMOOB CRM",
  nota: "Ecoville oficialmente é Mossunguê; alguns registros podem vir como 'Ecoville'. Agregação Ecoville = union.",
  ecoville_macro: ecovilleMacro,
  mossunguê_apenas: mossungueOnly,
  ecoville_literal: ecovilleOnly,
  bigorrilho,
  detalhe_ecoville: detalheEco,
  detalhe_bigorrilho: detalheBig,
}

console.log(JSON.stringify(out, null, 2))
