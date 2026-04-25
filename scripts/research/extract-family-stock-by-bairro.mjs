#!/usr/bin/env node

/**
 * Script: extract-family-stock-by-bairro.mjs
 *
 * Extrai estoque FYMOOB target família por bairro a partir do snapshot diário.
 * Definição "target família":
 *   - dormitorios >= 3 E vagas >= 1 E area_privativa >= 80
 *   OU
 *   - categoria casa/sobrado (qualquer tamanho) com area_terreno > 0 (proxy de quintal)
 *
 * Uso:
 *   node scripts/research/extract-family-stock-by-bairro.mjs
 *   node scripts/research/extract-family-stock-by-bairro.mjs --snapshot=2026-04-25
 *   node scripts/research/extract-family-stock-by-bairro.mjs --format=json > out.json
 *
 * Fonte: docs/research/snapshots/YYYY-MM-DD.json (não chama API).
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SNAPSHOTS_DIR = path.resolve(__dirname, "../../docs/research/snapshots")

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=")
    return [k, v ?? true]
  })
)

const CASA_CATEGORIES = new Set(["Casa", "Sobrado", "Casa em Condomínio"])
const APTO_CATEGORIES = new Set(["Apartamento", "Apt Duplex", "Cobertura"])
const STUDIO_CATEGORIES = new Set(["Studio", "Kitnet"])

function pickSnapshot() {
  if (args.snapshot) {
    return path.resolve(SNAPSHOTS_DIR, `${args.snapshot}.json`)
  }
  const files = fs.readdirSync(SNAPSHOTS_DIR).filter((f) => f.endsWith(".json")).sort().reverse()
  if (!files.length) throw new Error("Nenhum snapshot encontrado")
  return path.resolve(SNAPSHOTS_DIR, files[0])
}

function isFamilyTarget(p) {
  if (p.cidade !== "Curitiba") return false
  // Casa com qualquer dorm + algum terreno
  if (CASA_CATEGORIES.has(p.categoria) && (p.area_terreno || p.area_total)) return true
  // Apto/cobertura grande pra família
  if (
    (APTO_CATEGORIES.has(p.categoria) || CASA_CATEGORIES.has(p.categoria)) &&
    (p.dormitorios || 0) >= 3 &&
    (p.vagas || 0) >= 1 &&
    (p.area_privativa || 0) >= 80
  )
    return true
  return false
}

function median(arr) {
  if (!arr.length) return null
  const s = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(s.length / 2)
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2)
}

function pct(num, total) {
  if (!total) return 0
  return Math.round((num / total) * 100)
}

function isCasa(p) {
  return CASA_CATEGORIES.has(p.categoria)
}

function categoria(p) {
  if (CASA_CATEGORIES.has(p.categoria)) return "casa"
  if (APTO_CATEGORIES.has(p.categoria)) return "apto"
  return "outro"
}

function analyzeByBairro(properties) {
  const targets = properties.filter(isFamilyTarget).filter((p) => p.valor_venda > 0)

  const byBairro = new Map()
  for (const p of targets) {
    if (!byBairro.has(p.bairro)) byBairro.set(p.bairro, [])
    byBairro.get(p.bairro).push(p)
  }

  const results = []
  for (const [bairro, items] of byBairro) {
    if (items.length < 5) continue
    const valores = items.map((p) => p.valor_venda).filter(Boolean)
    const areas = items.map((p) => p.area_privativa).filter((v) => v > 0)
    const com_4plus = items.filter((p) => (p.dormitorios || 0) >= 4).length
    const com_2vagas = items.filter((p) => (p.vagas || 0) >= 2).length
    const casas = items.filter(isCasa).length
    const aptos = items.filter((p) => APTO_CATEGORIES.has(p.categoria)).length

    const r_m2_arr = items
      .filter((p) => p.valor_venda > 0 && p.area_privativa > 0)
      .map((p) => p.valor_venda / p.area_privativa)
    const r_m2 = median(r_m2_arr)

    results.push({
      bairro,
      n: items.length,
      mediana_venda: median(valores),
      min_venda: Math.min(...valores),
      max_venda: Math.max(...valores),
      mediana_area: median(areas),
      r_m2_mediano: r_m2 ? Math.round(r_m2) : null,
      pct_4plus_dorm: pct(com_4plus, items.length),
      pct_2plus_vagas: pct(com_2vagas, items.length),
      pct_casa: pct(casas, items.length),
      pct_apto: pct(aptos, items.length),
    })
  }
  results.sort((a, b) => b.n - a.n)
  return { results, total_targets: targets.length }
}

function bucketByOrcamento(properties) {
  const targets = properties.filter(isFamilyTarget).filter((p) => p.valor_venda > 0)
  const buckets = {
    "400_600k": { min: 400000, max: 600000, byBairro: new Map() },
    "600_900k": { min: 600000, max: 900000, byBairro: new Map() },
    "900k_1_5M": { min: 900000, max: 1500000, byBairro: new Map() },
    "1_5M_plus": { min: 1500000, max: Infinity, byBairro: new Map() },
  }

  for (const p of targets) {
    const v = p.valor_venda
    for (const [, b] of Object.entries(buckets)) {
      if (v >= b.min && v < b.max) {
        if (!b.byBairro.has(p.bairro)) b.byBairro.set(p.bairro, [])
        b.byBairro.get(p.bairro).push(p)
      }
    }
  }

  const out = {}
  for (const [k, b] of Object.entries(buckets)) {
    out[k] = []
    for (const [bairro, items] of b.byBairro) {
      if (items.length < 3) continue
      const valores = items.map((p) => p.valor_venda)
      out[k].push({
        bairro,
        n: items.length,
        mediana: median(valores),
        casas: items.filter(isCasa).length,
        aptos: items.filter((p) => APTO_CATEGORIES.has(p.categoria)).length,
      })
    }
    out[k].sort((a, b) => b.n - a.n)
  }
  return out
}

function casasComQuintal(properties) {
  const casas = properties.filter(
    (p) => p.cidade === "Curitiba" && CASA_CATEGORIES.has(p.categoria) && p.valor_venda > 0
  )
  const byBairro = new Map()
  for (const p of casas) {
    if (!byBairro.has(p.bairro)) byBairro.set(p.bairro, [])
    byBairro.get(p.bairro).push(p)
  }
  const out = []
  for (const [bairro, items] of byBairro) {
    if (items.length < 3) continue
    const valores = items.map((p) => p.valor_venda)
    const terrenos = items.map((p) => p.area_terreno).filter((v) => v > 0)
    const areas = items.map((p) => p.area_privativa).filter((v) => v > 0)
    out.push({
      bairro,
      n: items.length,
      mediana_venda: median(valores),
      min_venda: Math.min(...valores),
      max_venda: Math.max(...valores),
      mediana_terreno: median(terrenos),
      mediana_area: median(areas),
      pct_3plus_dorm: pct(items.filter((p) => (p.dormitorios || 0) >= 3).length, items.length),
    })
  }
  out.sort((a, b) => b.n - a.n)
  return out
}

function priceM2GeralVsFamily(properties) {
  // R$/m² geral por bairro (qualquer tipologia residencial venda)
  const all = properties.filter(
    (p) =>
      p.cidade === "Curitiba" &&
      p.valor_venda > 0 &&
      p.area_privativa > 0 &&
      (APTO_CATEGORIES.has(p.categoria) || CASA_CATEGORIES.has(p.categoria) || STUDIO_CATEGORIES.has(p.categoria))
  )
  const byBairro = new Map()
  for (const p of all) {
    if (!byBairro.has(p.bairro)) byBairro.set(p.bairro, { all: [], target34: [] })
    const obj = byBairro.get(p.bairro)
    obj.all.push(p.valor_venda / p.area_privativa)
    const dorm = p.dormitorios || 0
    if ((dorm === 3 || dorm === 4) && (p.vagas || 0) >= 1 && p.area_privativa >= 80) {
      obj.target34.push(p.valor_venda / p.area_privativa)
    }
  }

  const out = []
  for (const [bairro, { all: a, target34 }] of byBairro) {
    if (a.length < 3 || target34.length < 2) continue
    const m2_geral = median(a)
    const m2_fam = median(target34)
    out.push({
      bairro,
      n_geral: a.length,
      n_target34: target34.length,
      r_m2_geral: m2_geral ? Math.round(m2_geral) : null,
      r_m2_target34: m2_fam ? Math.round(m2_fam) : null,
      premio_pct: m2_geral ? Math.round(((m2_fam - m2_geral) / m2_geral) * 100) : null,
    })
  }
  out.sort((a, b) => Math.abs(b.premio_pct || 0) - Math.abs(a.premio_pct || 0))
  return out
}

function dormitoriosBreakdown(properties) {
  const targets = properties.filter(isFamilyTarget)
  const breakdown = {}
  for (const p of targets) {
    const k = p.dormitorios || 0
    breakdown[k] = (breakdown[k] || 0) + 1
  }
  return breakdown
}

function main() {
  const snapshotPath = pickSnapshot()
  const data = JSON.parse(fs.readFileSync(snapshotPath, "utf8"))
  const props = data.properties

  const byBairro = analyzeByBairro(props)
  const buckets = bucketByOrcamento(props)
  const casas = casasComQuintal(props)
  const m2compare = priceM2GeralVsFamily(props)
  const dormBreakdown = dormitoriosBreakdown(props)

  const output = {
    snapshot_file: path.basename(snapshotPath),
    snapshot_date: data.snapshot_date,
    total_properties: props.length,
    total_family_targets: byBairro.total_targets,
    target_definition:
      "(>=3 dormitorios E >=1 vaga E area_privativa>=80) OU (casa/sobrado com area_terreno>0)",
    family_targets_dorm_breakdown: dormBreakdown,
    by_bairro: byBairro.results,
    by_orcamento: buckets,
    casas_com_quintal: casas,
    r_m2_geral_vs_target34_por_bairro: m2compare,
  }

  if (args.format === "json") {
    console.log(JSON.stringify(output, null, 2))
    return
  }

  console.log(`\n=== Snapshot: ${output.snapshot_file} ===`)
  console.log(`Total imóveis: ${output.total_properties}`)
  console.log(`Total target família (Curitiba): ${output.total_family_targets}`)
  console.log(`Breakdown por dormitórios:`, dormBreakdown)

  console.log(`\n--- Top bairros target família (n>=5) ---`)
  for (const r of output.by_bairro) {
    console.log(
      `${r.bairro.padEnd(22)} n=${String(r.n).padStart(2)}  med=R$${r.mediana_venda.toLocaleString("pt-BR").padStart(11)}  m2=R$${r.r_m2_mediano}  area=${r.mediana_area}m²  4+dorm=${r.pct_4plus_dorm}%  2+vagas=${r.pct_2plus_vagas}%  casa=${r.pct_casa}%`
    )
  }

  console.log(`\n--- Por orçamento ---`)
  for (const [k, arr] of Object.entries(buckets)) {
    console.log(`\n${k} (n>=3):`)
    for (const b of arr) {
      console.log(`  ${b.bairro.padEnd(22)} n=${b.n}  med=R$${b.mediana.toLocaleString("pt-BR")}  casas=${b.casas}/aptos=${b.aptos}`)
    }
  }

  console.log(`\n--- Casas com quintal por bairro (n>=3) ---`)
  for (const c of casas) {
    console.log(
      `${c.bairro.padEnd(22)} n=${c.n}  med=R$${c.mediana_venda.toLocaleString("pt-BR")}  terreno=${c.mediana_terreno}m²  area=${c.mediana_area}m²  3+dorm=${c.pct_3plus_dorm}%`
    )
  }

  console.log(`\n--- R$/m² geral vs target 3-4 dorm (n>=2 target) ---`)
  for (const m of m2compare) {
    console.log(
      `${m.bairro.padEnd(22)} m2_geral=R$${m.r_m2_geral}  m2_target=R$${m.r_m2_target34}  diff=${m.premio_pct > 0 ? "+" : ""}${m.premio_pct}%  (n_geral=${m.n_geral}, n_target=${m.n_target34})`
    )
  }
}

main()
