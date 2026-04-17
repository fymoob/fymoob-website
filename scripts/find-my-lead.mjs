#!/usr/bin/env node
// Procura o lead do user (nome=TESTE, email=teste@gmail.com) por varios caminhos.

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

async function search(label, filter) {
  const url = new URL(`${BASE}/clientes/listar`)
  url.searchParams.set("key", KEY)
  url.searchParams.set("pesquisa", JSON.stringify({
    fields: ["Codigo", "Nome", "EmailResidencial", "FonePrincipal", "DataCadastro", "VeiculoCaptacao", "Observacoes", "Status"],
    filter,
    paginacao: { pagina: 1, quantidade: 20 },
  }))
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } })
  const data = await res.json()
  const entries = Object.entries(data).filter(([k]) => /^\d+$/.test(k))
  console.log(`\n🔎 ${label} — ${entries.length} resultado(s):`)
  for (const [, lead] of entries.slice(0, 5)) {
    console.log(`  #${lead.Codigo} | ${lead.DataCadastro} | ${lead.Nome} | ${lead.EmailResidencial} | Veiculo: "${lead.VeiculoCaptacao}" | Status: ${lead.Status}`)
    if (lead.Observacoes) console.log(`    💬 ${lead.Observacoes.slice(0, 100)}`)
  }
}

await search('Nome = "TESTE"', { Nome: "TESTE" })
await search('Nome LIKE "%TESTE%"', { Nome: { LIKE: "TESTE" } })
await search('Email = "teste@gmail.com"', { EmailResidencial: "teste@gmail.com" })
await search('VeiculoCaptacao = "Site FYMOOB"', { VeiculoCaptacao: "Site FYMOOB" })
await search('VeiculoCaptacao LIKE "FYMOOB"', { VeiculoCaptacao: { LIKE: "FYMOOB" } })
await search('DataCadastro = "2026-04-17"', { DataCadastro: "2026-04-17" })

// Busca geral tudo que foi criado hoje filtrando por DataCadastro
console.log("\n\n🔎 Todos os leads criados HOJE (2026-04-17):")
const today = new Date().toISOString().split("T")[0]
const urlToday = new URL(`${BASE}/clientes/listar`)
urlToday.searchParams.set("key", KEY)
urlToday.searchParams.set("pesquisa", JSON.stringify({
  fields: ["Codigo", "Nome", "EmailResidencial", "DataCadastro", "VeiculoCaptacao"],
  filter: { DataCadastro: "2026-04-17" },
  order: { Codigo: "desc" },
  paginacao: { pagina: 1, quantidade: 50 },
}))
const resT = await fetch(urlToday.toString(), { headers: { Accept: "application/json" } })
const dataT = await resT.json()
const entriesT = Object.entries(dataT).filter(([k]) => /^\d+$/.test(k))
console.log(`  ${entriesT.length} leads hoje`)
const fymoobToday = entriesT.filter(([, l]) => /FYMOOB|fymoob/i.test(l.VeiculoCaptacao || "") || /TESTE/i.test(l.Nome || ""))
if (fymoobToday.length) {
  console.log(`  Filtrando FYMOOB/TESTE:`)
  for (const [, l] of fymoobToday) {
    console.log(`    #${l.Codigo} ${l.Nome} ${l.EmailResidencial} veiculo=${l.VeiculoCaptacao}`)
  }
} else {
  console.log(`  ⚠️  Nenhum com FYMOOB/TESTE. Veiculos vistos hoje:`)
  const veiculos = new Set(entriesT.map(([, l]) => l.VeiculoCaptacao).filter(Boolean))
  for (const v of veiculos) console.log(`     - ${v}`)
}
