#!/usr/bin/env node
// Lista os leads mais recentes sem filtro — pra achar onde nosso POST /lead caiu.

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

const url = new URL(`${BASE}/clientes/listar`)
url.searchParams.set("key", KEY)
url.searchParams.set("pesquisa", JSON.stringify({
  fields: [
    "Codigo", "Nome", "EmailResidencial", "FonePrincipal",
    "DataCadastro", "VeiculoCaptacao", "Observacoes", "Interesse",
    "ClienteImportado", "CampanhaImportacao",
  ],
  order: { Codigo: "desc" }, // mais recentes tem Codigo mais alto
  paginacao: { pagina: 1, quantidade: 15 },
}))
url.searchParams.set("showtotal", "1")

const res = await fetch(url.toString(), {
  headers: { Accept: "application/json" },
  signal: AbortSignal.timeout(10000),
})
const data = await res.json()
const entries = Object.entries(data).filter(([k]) => /^\d+$/.test(k))

console.log(`\n📋 Ultimos ${entries.length} leads (ordenados por Codigo desc):\n`)
console.log(`Total clientes no CRM: ${data.total}\n`)

for (const [, lead] of entries) {
  console.log(`── Código ${lead.Codigo} | DataCadastro: ${lead.DataCadastro}`)
  console.log(`   Nome: "${lead.Nome}"`)
  console.log(`   Email: ${lead.EmailResidencial || "—"}`)
  console.log(`   Fone: ${lead.FonePrincipal || "—"}`)
  console.log(`   Veiculo: "${lead.VeiculoCaptacao || "—"}"`)
  console.log(`   Interesse: ${lead.Interesse || "—"}`)
  if (lead.Observacoes) {
    console.log(`   Obs: "${lead.Observacoes.slice(0, 120)}"`)
  }
  console.log()
}
