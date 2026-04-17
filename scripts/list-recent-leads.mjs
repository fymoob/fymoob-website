#!/usr/bin/env node
// Lista leads recentes originados do Site FYMOOB (pos-cutover).
// READ-ONLY — nao muta nada no CRM.

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

// Busca leads mais recentes filtrando por VeiculoCaptacao "Site FYMOOB"
// (identificador que nosso /api/lead seta em todos os leads via campo `veiculo`).
const pesquisa = JSON.stringify({
  fields: [
    "Codigo", "Nome", "EmailResidencial", "FonePrincipal",
    "DataCadastro", "VeiculoCaptacao", "Interesse", "Status",
    "Observacoes", "Corretor",
  ],
  filter: { VeiculoCaptacao: "Site FYMOOB" },
  order: { DataCadastro: "desc" },
  paginacao: { pagina: 1, quantidade: 20 },
})

const url = new URL(`${BASE}/clientes/listar`)
url.searchParams.set("key", KEY)
url.searchParams.set("pesquisa", pesquisa)
url.searchParams.set("showtotal", "1")

const res = await fetch(url.toString(), {
  headers: { Accept: "application/json" },
  signal: AbortSignal.timeout(10000),
})

const data = await res.json()
console.log(`\n📋 Leads com VeiculoCaptacao="Site FYMOOB"\n`)
console.log(`Status: ${res.status} | Total reportado: ${data.total ?? "?"}\n`)

const entries = Object.entries(data).filter(([k]) => /^\d+$/.test(k))
if (entries.length === 0) {
  console.log("⚠️  Nenhum lead encontrado com VeiculoCaptacao='Site FYMOOB'.")
  console.log("    Talvez o POST /lead mapeie 'veiculo' pra outro campo (ex: 'Midia').")
  console.log("    Vou tentar sem filtro pra ver os ultimos leads de todos os veiculos...\n")

  const urlAll = new URL(`${BASE}/clientes/listar`)
  urlAll.searchParams.set("key", KEY)
  urlAll.searchParams.set("pesquisa", JSON.stringify({
    fields: ["Codigo", "Nome", "EmailResidencial", "FonePrincipal", "DataCadastro", "VeiculoCaptacao", "Observacoes"],
    order: { DataCadastro: "desc" },
    paginacao: { pagina: 1, quantidade: 10 },
  }))
  urlAll.searchParams.set("showtotal", "1")

  const res2 = await fetch(urlAll.toString(), { headers: { Accept: "application/json" } })
  const data2 = await res2.json()
  const entries2 = Object.entries(data2).filter(([k]) => /^\d+$/.test(k))

  console.log(`📋 Ultimos 10 leads (qualquer veiculo):`)
  for (const [, lead] of entries2) {
    console.log(`\n  Código ${lead.Codigo} — ${lead.DataCadastro}`)
    console.log(`    Nome: ${lead.Nome}`)
    console.log(`    Email: ${lead.EmailResidencial || "—"}`)
    console.log(`    Fone: ${lead.FonePrincipal || "—"}`)
    console.log(`    Veiculo: ${lead.VeiculoCaptacao || "—"}`)
    console.log(`    Obs: ${(lead.Observacoes || "").slice(0, 80)}`)
  }
} else {
  console.log(`Encontrados ${entries.length} leads:\n`)
  for (const [, lead] of entries) {
    console.log(`─ Código ${lead.Codigo} | ${lead.DataCadastro} | Status: ${lead.Status}`)
    console.log(`  ${lead.Nome}  (Interesse: ${lead.Interesse || "—"})`)
    console.log(`  📧 ${lead.EmailResidencial || "—"}  |  📞 ${lead.FonePrincipal || "—"}`)
    console.log(`  Corretor atribuido: ${lead.Corretor}`)
    if (lead.Observacoes) {
      console.log(`  💬 ${lead.Observacoes.slice(0, 120)}`)
    }
    console.log()
  }
}
