#!/usr/bin/env node
// Conta quantos imoveis tem ValorVenda E ValorLocacao preenchidos, paginando todo catalogo.
// Identifica os casos potencialmente buggados.

import fs from "node:fs"
import path from "node:path"

function loadEnvLocal() {
  try {
    const content = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf-8")
    for (const line of content.split("\n")) {
      const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/)
      if (match) {
        const [, key, rawValue] = match
        if (!process.env[key]) process.env[key] = rawValue.replace(/^["']|["']$/g, "")
      }
    }
  } catch {}
}

loadEnvLocal()
const KEY = process.env.LOFT_API_KEY
const BASE = "https://brunoces-rest.vistahost.com.br"
if (!KEY) { console.error("missing"); process.exit(1) }

async function fetchPage(pagina) {
  const pesquisa = JSON.stringify({
    fields: ["Codigo", "Status", "Finalidade", "ValorVenda", "ValorLocacao", "Categoria", "BairroComercial", "ExibirNoSite"],
    filter: { ExibirNoSite: "Sim" },
    paginacao: { pagina, quantidade: 50 },
  })
  const url = new URL(`${BASE}/imoveis/listar`)
  url.searchParams.set("key", KEY)
  url.searchParams.set("pesquisa", pesquisa)
  url.searchParams.set("showtotal", "1")
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } })
  return res.json()
}

const all = []
let pagina = 1
let total = 0
while (true) {
  const data = await fetchPage(pagina)
  if (pagina === 1) total = parseInt(data.total || "0", 10)
  for (const [key, value] of Object.entries(data)) {
    if (["total", "paginas", "pagina", "quantidade"].includes(key)) continue
    if (value && typeof value === "object" && "Codigo" in value) {
      all.push(value)
    }
  }
  if (all.length >= total || pagina >= Math.ceil(total / 50)) break
  pagina++
}

console.log(`\nTotal imoveis ExibirNoSite=Sim: ${all.length} (de ${total} reportados)\n`)

const dualCasos = []
for (const p of all) {
  const v = parseFloat(p.ValorVenda || "0")
  const l = parseFloat(p.ValorLocacao || "0")
  if (v > 0 && l > 0) {
    dualCasos.push({
      codigo: p.Codigo,
      status: p.Status,
      finalidade: p.Finalidade || "(vazio)",
      venda: v,
      locacao: l,
      categoria: p.Categoria,
      bairro: p.BairroComercial,
    })
  }
}

console.log(`Imoveis com AMBOS ValorVenda e ValorLocacao > 0: ${dualCasos.length}`)
console.log(`(${(dualCasos.length / all.length * 100).toFixed(1)}% do catalogo)\n`)

// Agrupa por Status
const porStatus = {}
for (const d of dualCasos) {
  const key = `${d.status} / finalidade="${d.finalidade}"`
  porStatus[key] = (porStatus[key] || 0) + 1
}

console.log("Distribuicao por Status/Finalidade:")
for (const [k, count] of Object.entries(porStatus).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${count}x  ${k}`)
}

console.log("\nCasos buggados (primeiros 20):")
for (const d of dualCasos.slice(0, 20)) {
  const bugFlag = (d.status === "Aluguel" || d.status === "Venda") && (d.venda > 0 && d.locacao > 0) ? "⚠️" : ""
  console.log(`  ${bugFlag} #${d.codigo} | Status=${d.status} | Finalidade="${d.finalidade}" | V=R$${d.venda.toLocaleString()} | L=R$${d.locacao.toLocaleString()} | ${d.categoria} ${d.bairro}`)
}
