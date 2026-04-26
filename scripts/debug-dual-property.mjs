#!/usr/bin/env node
// Investiga conflito entre tela de detalhes e busca no imovel 69804378.
// E busca outros casos de "Venda e Locacao" potencialmente buggados.

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
if (!KEY) { console.error("missing LOFT_API_KEY"); process.exit(1) }

async function getDetails(codigo) {
  const pesquisa = JSON.stringify({
    fields: [
      "Codigo", "Status", "Finalidade", "Categoria", "BairroComercial",
      "ValorVenda", "ValorLocacao", "ValorCondominio", "ValorIptu",
      "Fci", "SeguroIncendio",
      "TituloSite", "DescricaoWeb",
      "ExibirNoSite", "DestaqueWeb", "SuperDestaqueWeb", "Lancamento",
    ],
  })
  const url = new URL(`${BASE}/imoveis/detalhes`)
  url.searchParams.set("key", KEY)
  url.searchParams.set("imovel", codigo)
  url.searchParams.set("pesquisa", pesquisa)
  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10000),
  })
  return { status: res.status, body: await res.json() }
}

// 1. Investigar o caso especifico
console.log("=".repeat(70))
console.log("CASO ESPECIFICO — Codigo 69804378")
console.log("=".repeat(70))
const r = await getDetails("69804378")
if (r.status === 200) {
  console.log(JSON.stringify(r.body, null, 2))
}

// 2. Listar todos os imoveis com ValorVenda E ValorLocacao preenchidos
// (potenciais "Venda e Locacao" ou dados ambiguos)
console.log("\n" + "=".repeat(70))
console.log("IMOVEIS COM AMBOS ValorVenda E ValorLocacao")
console.log("=".repeat(70))

const pesquisa = JSON.stringify({
  fields: ["Codigo", "Status", "Finalidade", "ValorVenda", "ValorLocacao", "Categoria", "BairroComercial"],
  filter: { ExibirNoSite: "Sim" },
  paginacao: { pagina: 1, quantidade: 50 },
})

const urlList = new URL(`${BASE}/imoveis/listar`)
urlList.searchParams.set("key", KEY)
urlList.searchParams.set("pesquisa", pesquisa)
urlList.searchParams.set("showtotal", "1")

const listRes = await fetch(urlList.toString(), {
  headers: { Accept: "application/json" },
  signal: AbortSignal.timeout(15000),
})
const listData = await listRes.json()

const duais = []
const statusVenda_comAluguel = []
const statusLocacao_comVenda = []

for (const [key, value] of Object.entries(listData)) {
  if (["total", "paginas", "pagina", "quantidade"].includes(key)) continue
  if (!value || typeof value !== "object" || !("Codigo" in value)) continue

  const v = parseFloat(value.ValorVenda || "0")
  const l = parseFloat(value.ValorLocacao || "0")
  const status = value.Status
  const fin = value.Finalidade

  if (v > 0 && l > 0) {
    duais.push({
      codigo: value.Codigo,
      status,
      finalidade: fin,
      venda: v,
      locacao: l,
      categoria: value.Categoria,
      bairro: value.BairroComercial,
    })

    // Casos potencialmente buggados:
    // Status=Venda mas com aluguel tambem
    // Status=Aluguel mas com venda tambem
    if (status === "Venda" && l > 0) statusVenda_comAluguel.push(value.Codigo)
    if (status === "Aluguel" && v > 0) statusLocacao_comVenda.push(value.Codigo)
  }
}

console.log(`\nTotal com AMBOS precos: ${duais.length}`)
console.log(`\nStatus=Venda MAS com ValorLocacao > 0 (inconsistente):`)
console.log(statusVenda_comAluguel.length > 0 ? statusVenda_comAluguel.join(", ") : "(nenhum)")
console.log(`\nStatus=Aluguel MAS com ValorVenda > 0 (inconsistente):`)
console.log(statusLocacao_comVenda.length > 0 ? statusLocacao_comVenda.join(", ") : "(nenhum)")

console.log(`\nDetalhes dos ${duais.length} casos com ambos precos:`)
for (const d of duais.slice(0, 15)) {
  console.log(`  #${d.codigo} | Status=${d.status} | Fin=${d.finalidade} | V=R$${d.venda.toLocaleString()} | L=R$${d.locacao.toLocaleString()}`)
}
if (duais.length > 15) console.log(`  ... +${duais.length - 15} mais`)
