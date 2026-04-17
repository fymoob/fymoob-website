#!/usr/bin/env node
// Explora /clientes/listar para descobrir campos válidos e ver se leads aparecem lá.

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

if (!KEY) {
  console.error("LOFT_API_KEY missing")
  process.exit(1)
}

async function call(endpoint, params = {}) {
  const url = new URL(BASE + endpoint)
  url.searchParams.set("key", KEY)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10000),
  })
  const text = await res.text()
  return { status: res.status, ok: res.ok, body: text }
}

// 1. Descobrir campos disponíveis pra clientes via listarcampos
console.log("=== 1. /imoveis/listarcampos?tipo=clientes ===")
const r1 = await call("/imoveis/listarcampos", { tipo: "clientes" })
console.log(`[${r1.status}] ${r1.body.slice(0, 500)}\n`)

console.log("=== 2. /imoveis/listarcampos?tipo=Cliente ===")
const r2 = await call("/imoveis/listarcampos", { tipo: "Cliente" })
console.log(`[${r2.status}] ${r2.body.slice(0, 500)}\n`)

console.log("=== 3. /imoveis/listarcampos (sem tipo) — procura chaves 'cliente*' ===")
const r3 = await call("/imoveis/listarcampos")
try {
  const json = JSON.parse(r3.body)
  const keys = Object.keys(json)
  console.log(`[${r3.status}] Chaves: ${keys.join(", ")}`)
  // Procura chaves relacionadas a cliente/lead
  for (const k of keys) {
    if (/client|lead|conta|contato/i.test(k)) {
      console.log(`\n  [${k}] ${json[k].length} campos:`)
      console.log(`  ${json[k].slice(0, 30).join(", ")}...`)
    }
  }
} catch {
  console.log(`[${r3.status}] Parse failed: ${r3.body.slice(0, 300)}`)
}
console.log()

console.log("=== 4. /clientes/listarcampos ===")
const r4 = await call("/clientes/listarcampos")
console.log(`[${r4.status}] ${r4.body.slice(0, 500)}\n`)

// 5. Tenta /clientes/listar com campo mínimo (Codigo)
console.log("=== 5. /clientes/listar com fields=['Codigo'] ===")
const r5 = await call("/clientes/listar", {
  pesquisa: JSON.stringify({
    fields: ["Codigo"],
    paginacao: { pagina: 1, quantidade: 5 },
  }),
})
console.log(`[${r5.status}] ${r5.body.slice(0, 800)}\n`)

// 6. Tenta /clientes/listar com campo Nome (mais provável de existir)
console.log("=== 6. /clientes/listar com fields=['Nome'] ===")
const r6 = await call("/clientes/listar", {
  pesquisa: JSON.stringify({
    fields: ["Nome"],
    paginacao: { pagina: 1, quantidade: 5 },
  }),
})
console.log(`[${r6.status}] ${r6.body.slice(0, 800)}\n`)

// 7. Tenta /clientes/listarcampos com diferentes tipos
for (const tipo of ["clientes", "Clientes", "cliente"]) {
  console.log(`=== 7. /clientes/listarcampos?tipo=${tipo} ===`)
  const r = await call("/clientes/listarcampos", { tipo })
  console.log(`[${r.status}] ${r.body.slice(0, 400)}\n`)
}

// 8. Abrir /doc
console.log("=== 8. /doc (pode listar endpoints oficiais) ===")
const r8 = await call("/doc")
console.log(`[${r8.status}] ${r8.body.slice(0, 600)}\n`)
