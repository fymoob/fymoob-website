#!/usr/bin/env node
// Testa quais fields sao validos em /clientes/listar + baixa OpenAPI spec.

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
if (!KEY) { console.error("missing key"); process.exit(1) }

async function call(endpoint, params = {}) {
  const url = new URL(BASE + endpoint)
  url.searchParams.set("key", KEY)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10000),
  })
  return { status: res.status, body: await res.text() }
}

// 1. Testa fields individualmente pra descobrir quais sao validos
const CANDIDATE_FIELDS = [
  "Codigo", "Nome", "Email", "EmailPrincipal", "EmailResidencial", "EmailComercial",
  "Fone", "FonePrincipal", "FoneResidencial", "FoneComercial", "Celular",
  "DataCadastro", "Observacoes", "ObservacoesProp",
  "Veiculo", "VeiculoCaptacao", "Midia", "Campanha", "CampanhaImportacao",
  "Status", "Interesse", "Profissao", "DataProposta",
  "MailingList", "ReceberInformacoes", "ClienteImportado",
  "Cidade", "Bairro", "CEP",
  "Comprador", "Investidor", "Fiador", "Potencial",
  "CPF_CGC", "CPFCNPJ", "RG", "Nascimento",
  "Imovelprocurado", "ValorPerfil", "DormitoriosPerfil",
  "DataEntrada", "DataAssinatura",
  "Proprietario", "Corretor", "CodigoCorretor",
]

const validFields = []
const invalidFields = []

for (const field of CANDIDATE_FIELDS) {
  const r = await call("/clientes/listar", {
    pesquisa: JSON.stringify({
      fields: ["Codigo", field],
      paginacao: { pagina: 1, quantidade: 1 },
    }),
  })
  if (r.status === 200) {
    validFields.push(field)
    // Mostra exemplo de valor do primeiro registro
    try {
      const json = JSON.parse(r.body)
      const firstKey = Object.keys(json)[0]
      const sample = firstKey ? json[firstKey][field] : null
      console.log(`✅ ${field}  →  ${JSON.stringify(sample)?.slice(0, 60) ?? "(null)"}`)
    } catch {
      console.log(`✅ ${field}`)
    }
  } else {
    invalidFields.push(field)
    const msg = r.body.slice(0, 150)
    if (r.status !== 400 || !/dispon/i.test(msg)) {
      console.log(`❌ [${r.status}] ${field}  →  ${msg}`)
    }
  }
}

console.log(`\n--- Resumo ---`)
console.log(`Válidos (${validFields.length}): ${validFields.join(", ")}`)
console.log(`Inválidos (${invalidFields.length}): ${invalidFields.join(", ")}`)

// 2. Baixa OpenAPI spec do /doc
console.log("\n--- OpenAPI spec em /doc ---")
const doc = await fetch(`${BASE}/doc`, {
  headers: { Accept: "text/html" },
})
const html = await doc.text()
// Extrai o JSON do <script id="swagger-data">
const match = html.match(/<script id="swagger-data"[^>]*>(\{[\s\S]*?\})<\/script>/)
if (match) {
  try {
    const specWrapper = JSON.parse(match[1])
    const spec = specWrapper.spec
    const paths = Object.keys(spec.paths || {})
    const clientesPaths = paths.filter((p) => /client|lead|cadastro/i.test(p))
    console.log(`\nEndpoints encontrados: ${paths.length} total`)
    console.log(`Relacionados a cliente/lead (${clientesPaths.length}):`)
    for (const p of clientesPaths) {
      const methods = Object.keys(spec.paths[p])
      console.log(`  ${methods.map((m) => m.toUpperCase()).join("/")} ${p}`)
    }

    // Salva spec completo pra referencia
    fs.writeFileSync(
      path.join(process.cwd(), "scripts/vista-api-spec.json"),
      JSON.stringify(spec, null, 2)
    )
    console.log(`\n✅ Spec completo salvo em: scripts/vista-api-spec.json`)
  } catch (err) {
    console.log(`Erro parse spec: ${err.message}`)
  }
} else {
  console.log("Nao encontrou swagger-data no HTML")
}
