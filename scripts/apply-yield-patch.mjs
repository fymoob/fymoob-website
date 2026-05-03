/**
 * Patch idempotente — substitui "yield" (jargão financeiro em inglês)
 * por "rendimento" / "rendimento de aluguel" nos artigos revisados que
 * usam o termo em tabelas decisórias.
 *
 * Outros termos da auditoria foram MANTIDOS por estarem dicionarizados
 * em PT-BR ou serem categorias de mercado comuns: premium, boutique,
 * brunch, iFood, Smart Fit.
 *
 * Detecta zero duplicações de palavra nos 5 artigos revisados —
 * audit-revised-articles.mjs limpo nessa dimensão.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

// Substituições por slug — { from: to }
const PATCHES = {
  "mercado-imobiliario-curitiba-2026": [
    { from: "Escolher bairro por yield", to: "Escolher bairro por rendimento" },
    { from: "Yield menor", to: "Rendimento menor" },
  ],
  "quanto-custa-morar-batel-curitiba": [
    { from: "Yield menor", to: "Rendimento menor" },
    { from: "Yield tende a ser menor", to: "Rendimento tende a ser menor" },
  ],
}

function inlineToString(content) {
  if (!Array.isArray(content)) return ""
  return content
    .map((c) => (c?.type === "link" ? inlineToString(c.content) : c?.text ?? ""))
    .join("")
}

function walkAndReplace(node, from, to) {
  let count = 0
  if (Array.isArray(node)) {
    for (const item of node) {
      if (item?.type === "text" && typeof item.text === "string" && item.text.includes(from)) {
        item.text = item.text.replaceAll(from, to)
        count++
      }
      if (item?.type === "link" && Array.isArray(item.content)) {
        count += walkAndReplace(item.content, from, to)
      }
    }
    return count
  }
  if (node && typeof node === "object") {
    if (Array.isArray(node.content)) count += walkAndReplace(node.content, from, to)
    if (node.type === "table" && node.content?.rows) {
      for (const row of node.content.rows) {
        for (const cell of row.cells || []) {
          if (Array.isArray(cell.content)) count += walkAndReplace(cell.content, from, to)
        }
      }
    }
  }
  return count
}

for (const [slug, patches] of Object.entries(PATCHES)) {
  const { data: article } = await sb
    .from("articles")
    .select("id, body")
    .eq("slug", slug)
    .single()

  if (!article) {
    console.log(`!!! ${slug} não encontrado`)
    continue
  }

  const body = JSON.parse(JSON.stringify(article.body))
  let totalTouched = 0

  console.log(`\n▼ ${slug}`)
  for (const { from, to } of patches) {
    let perPatch = 0
    for (const block of body) {
      perPatch += walkAndReplace(block, from, to)
    }
    if (perPatch > 0) {
      console.log(`  ✓ "${from}" → "${to}"  (${perPatch} ocorrência(s))`)
      totalTouched += perPatch
    } else {
      console.log(`  ○ "${from}" → "${to}"  (já corrigido — skip)`)
    }
  }

  if (totalTouched > 0 && !DRY_RUN) {
    const { error } = await sb.from("articles").update({ body }).eq("id", article.id)
    if (error) {
      console.error("!!! erro ao salvar:", error)
      continue
    }
    console.log(`  ✅ ${totalTouched} substituição(ões) salvas.`)
  } else if (totalTouched === 0) {
    console.log(`  (nada pra salvar — já idempotente)`)
  } else {
    console.log(`  [DRY-RUN] ${totalTouched} substituição(ões) prontas mas não persistidas.`)
  }
}
