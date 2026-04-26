#!/usr/bin/env node
// Investiga por que imoveis especificos nao carregam imagem no site.
// Compara FotoDestaque + campo Foto[] entre os que funcionam e os quebrados.

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

// Codigos identificados do screenshot do user:
// QUEBRADOS (sem imagem):
//   69804172 — Bloma Apartamentos 3 quartos
//   69805550 — Bloma térreo Garden
//   69803421 — Apartamento Agua Verde
// OK (funcionando):
//   69803813 — Chácara Vila David Antônio
const CODES = [
  { codigo: "69804172", status: "BROKEN" },
  { codigo: "69805550", status: "BROKEN" },
  { codigo: "69803421", status: "BROKEN" },
  { codigo: "69803813", status: "OK" },
]

async function getDetails(codigo) {
  const pesquisa = JSON.stringify({
    fields: [
      "Codigo", "FotoDestaque", "FotoDestaquePequena", "FotoDestaqueEmpreendimento",
      "Categoria", "BairroComercial", "Status", "ExibirNoSite",
      { Foto: ["Foto", "FotoPequena", "Ordem", "Tipo", "ExibirNoSite", "Destaque"] },
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

function analyze({ codigo, status }, data) {
  console.log(`\n${"=".repeat(70)}`)
  console.log(`Codigo: ${codigo} — esperado: ${status}`)
  console.log(`${"=".repeat(70)}`)

  const fd = data.FotoDestaque
  const fdp = data.FotoDestaquePequena
  const fde = data.FotoDestaqueEmpreendimento

  console.log(`Categoria: ${data.Categoria}`)
  console.log(`Bairro: ${data.BairroComercial}`)
  console.log(`Status: ${data.Status}`)
  console.log(`ExibirNoSite: ${data.ExibirNoSite}`)
  console.log(``)

  console.log(`FotoDestaque:`)
  console.log(`  Tipo: ${typeof fd}`)
  console.log(`  Valor: ${fd ? fd.slice(0, 120) : "(vazio/null)"}`)
  console.log(`  startsWith https: ${typeof fd === "string" && fd.startsWith("https://")}`)

  console.log(`FotoDestaquePequena:`)
  console.log(`  Valor: ${fdp ? fdp.slice(0, 120) : "(vazio/null)"}`)

  console.log(`FotoDestaqueEmpreendimento:`)
  console.log(`  Valor: ${fde ? fde.slice(0, 120) : "(vazio/null)"}`)

  const fotos = data.Foto
  if (fotos && typeof fotos === "object") {
    const count = Object.keys(fotos).length
    console.log(`\nArray Foto[] (${count} fotos):`)
    const sorted = Object.values(fotos).sort((a, b) => parseInt(a.Ordem || "0") - parseInt(b.Ordem || "0"))
    sorted.slice(0, 5).forEach((f, i) => {
      const ok = typeof f.Foto === "string" && f.Foto.startsWith("https://")
      console.log(`  [${i}] ${ok ? "✓" : "✗"} Foto="${(f.Foto || "").slice(0, 100)}" Ordem=${f.Ordem} Tipo=${f.Tipo} Destaque=${f.Destaque}`)
    })
  } else {
    console.log(`\nArray Foto[]: AUSENTE ou vazio`)
  }
}

// Executa
for (const target of CODES) {
  const { status, body } = await getDetails(target.codigo)
  if (status !== 200) {
    console.log(`\n❌ Codigo ${target.codigo}: HTTP ${status}`)
    continue
  }
  analyze(target, body)
}

console.log(`\n${"=".repeat(70)}\nComparacao concluida.\n`)
