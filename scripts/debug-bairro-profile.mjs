#!/usr/bin/env node
// Profile per bairro for the "melhores bairros" blog post.
// Aggregated only — no volumes exposed per bairro.

import { config } from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.resolve(__dirname, "../.env.local") })

const LOFT_API_KEY = process.env.LOFT_API_KEY
const LOFT_BASE_URL = "https://brunoces-rest.vistahost.com.br"

function slugify(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
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
        "Dormitorios","Status"
      ],
      filter: { ExibirNoSite: "Sim" },
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

async function all() {
  const size = 50
  const first = await fetchPage(1, size)
  const total = Number(first.total) || 0
  const pages = Math.min(Math.ceil(total / size), 40)
  const out = extract(first)
  for (let p = 2; p <= pages; p++) out.push(...extract(await fetchPage(p, size)))
  return out
}

function profile(props) {
  const map = new Map()
  for (const p of props) {
    const bairro = p.Bairro || "Desconhecido"
    const slug = slugify(bairro)
    if (p.Cidade && p.Cidade !== "Curitiba") continue
    if (!map.has(slug)) {
      map.set(slug, {
        bairro, slug,
        total: 0,
        aptos: 0, casas: 0, sobrados: 0, terrenos: 0, outros: 0,
        vendaCount: 0, aluguelCount: 0,
        ticketSum: 0, ticketN: 0,
        tickets: [],
        areaSum: 0, areaN: 0,
        compactos: 0, medios: 0, grandes: 0,
        dorm1: 0, dorm2: 0, dorm3: 0, dorm4plus: 0,
      })
    }
    const g = map.get(slug)
    g.total++
    const cat = (p.Categoria || "").toLowerCase()
    if (cat.includes("apart")) g.aptos++
    else if (cat.includes("sobrado")) g.sobrados++
    else if (cat.includes("casa")) g.casas++
    else if (cat.includes("terreno")) g.terrenos++
    else g.outros++

    const vv = num(p.ValorVenda)
    const vl = num(p.ValorLocacao)
    if (vv > 0) {
      g.vendaCount++
      g.ticketSum += vv
      g.ticketN++
      g.tickets.push(vv)
    }
    if (vl > 0) g.aluguelCount++

    const area = num(p.AreaPrivativa) || num(p.AreaTotal)
    if (area > 0 && area < 2000) {
      g.areaSum += area
      g.areaN++
      if (area < 70) g.compactos++
      else if (area <= 150) g.medios++
      else g.grandes++
    }
    const d = Number(p.Dormitorios) || 0
    if (d === 1) g.dorm1++
    else if (d === 2) g.dorm2++
    else if (d === 3) g.dorm3++
    else if (d >= 4) g.dorm4plus++
  }

  const rows = []
  for (const [, g] of map) {
    const casasTotal = g.casas + g.sobrados
    const tipicosTotal = g.aptos + casasTotal
    const pctApto = tipicosTotal ? Math.round((g.aptos / tipicosTotal) * 100) : null
    const pctCasa = tipicosTotal ? Math.round((casasTotal / tipicosTotal) * 100) : null
    const ticketMed = g.ticketN ? Math.round(g.ticketSum / g.ticketN) : null
    const sortedTickets = [...g.tickets].sort((a, b) => a - b)
    const median = sortedTickets.length
      ? sortedTickets[Math.floor(sortedTickets.length / 2)]
      : null
    const areaMed = g.areaN ? Math.round(g.areaSum / g.areaN) : null
    const pctCompacto = g.areaN ? Math.round((g.compactos / g.areaN) * 100) : null
    const pctGrande = g.areaN ? Math.round((g.grandes / g.areaN) * 100) : null

    rows.push({
      bairro: g.bairro, slug: g.slug,
      total: g.total,
      pct_apto: pctApto, pct_casa: pctCasa,
      ticket_medio: ticketMed,
      ticket_mediano: median,
      area_media_m2: areaMed,
      pct_compacto_lt70: pctCompacto,
      pct_grande_gt150: pctGrande,
      perfil: (
        pctCompacto != null && pctCompacto >= 50 ? "jovem-solteiro-casal"
        : pctGrande != null && pctGrande >= 40 ? "familia-consolidada"
        : "misto"
      ),
      dorm_mix: {
        d1: g.dorm1, d2: g.dorm2, d3: g.dorm3, d4plus: g.dorm4plus
      }
    })
  }
  return rows.sort((a, b) => b.total - a.total)
}

const props = await all()
console.error(`Fetched ${props.length} properties`)
const rows = profile(props)

const topN = rows.slice(0, 15)
console.log(JSON.stringify({
  generated_at: new Date().toISOString(),
  total_fetched: props.length,
  top_bairros: topN,
  all_rows_count: rows.length,
}, null, 2))
