#!/usr/bin/env node
// Discover endpoints de listagem de leads na Vista API.
// Uso: node scripts/discover-lead-endpoints.mjs
// Precisa de LOFT_API_KEY em .env.local ou como env var.

import fs from "node:fs"
import path from "node:path"

// Carrega .env.local manualmente (sem dependencia externa)
function loadEnvLocal() {
  try {
    const content = fs.readFileSync(
      path.join(process.cwd(), ".env.local"),
      "utf-8"
    )
    for (const line of content.split("\n")) {
      const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/)
      if (match) {
        const [, key, rawValue] = match
        if (!process.env[key]) {
          process.env[key] = rawValue.replace(/^["']|["']$/g, "")
        }
      }
    }
  } catch {
    // ignore — pode ser que a key venha do ambiente
  }
}

loadEnvLocal()

const KEY = process.env.LOFT_API_KEY
if (!KEY) {
  console.error("❌ LOFT_API_KEY não encontrada")
  console.error("   Coloque em .env.local ou export LOFT_API_KEY=...")
  process.exit(1)
}

const BASE = "https://brunoces-rest.vistahost.com.br"

// Candidatos a endpoint de listagem de leads. Ordem por probabilidade.
// Cada tentativa: primeiro GET (REST style), depois GET com pesquisa
// (padrão Vista com fields explicitos).
const CANDIDATES = [
  { method: "GET", path: "/lead/listar" },
  { method: "GET", path: "/leads/listar" },
  { method: "GET", path: "/lead/detalhes" },
  { method: "GET", path: "/leads" },
  { method: "GET", path: "/lead" },
  { method: "GET", path: "/cadastro/listar" },
  { method: "GET", path: "/clientes/listar" },
  { method: "GET", path: "/proprietarios/listar" },
  { method: "GET", path: "/prontuarios/listar" },
]

// pesquisa básica — lista os últimos 5 leads com campos essenciais
const pesquisa = JSON.stringify({
  fields: ["Codigo", "Nome", "Email", "Fone", "Veiculo", "DataCadastro"],
  paginacao: { pagina: 1, quantidade: 5 },
})

async function probe({ method, path: endpoint }) {
  const urlPlain = new URL(BASE + endpoint)
  urlPlain.searchParams.set("key", KEY)

  const urlWithQuery = new URL(BASE + endpoint)
  urlWithQuery.searchParams.set("key", KEY)
  urlWithQuery.searchParams.set("pesquisa", pesquisa)

  for (const [label, url] of [
    ["plain", urlPlain],
    ["+pesquisa", urlWithQuery],
  ]) {
    try {
      const res = await fetch(url.toString(), {
        method,
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      })

      const text = await res.text()
      const short = text.slice(0, 200).replace(/\s+/g, " ")
      const ok = res.ok ? "✅" : "❌"
      console.log(`${ok} [${res.status}] ${method} ${endpoint} (${label})`)
      if (res.ok) {
        console.log(`   └─ ${short}`)
        // Se o JSON tem "total" ou chaves que parecem leads, reporta
        try {
          const json = JSON.parse(text)
          const keys = Object.keys(json).slice(0, 5)
          console.log(`   └─ keys: ${keys.join(", ")}`)
        } catch {
          /* ignore */
        }
      } else if (res.status !== 404 && res.status !== 401) {
        console.log(`   └─ ${short}`)
      }
    } catch (err) {
      console.log(`⚠️  ${method} ${endpoint} (${label}) — ${err.message}`)
    }
  }
}

console.log(`\nProbing Vista API em ${BASE}\n`)
console.log(`Documentação oficial: ${BASE}/doc\n`)

for (const candidate of CANDIDATES) {
  await probe(candidate)
}

console.log("\nPronto. Endpoints com ✅ [200] são candidatos válidos.")
console.log("Aqueles com ❌ [401] existem mas pedem permissão extra na key.")
console.log("❌ [404] não existem.\n")
