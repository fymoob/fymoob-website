/**
 * Patch idempotente — harmoniza a faixa de rendimento premium em
 * `mercado-imobiliario-curitiba-2026` com os outros 2 artigos do
 * cluster (quanto-custa-batel + melhores-bairros-curitiba), que usam
 * 0,25-0,33% ao mês (~3% a.a.) pra Batel/Bigorrilho/Cabral.
 *
 * Antes: "0,32% a 0,38% ao mês (~4,0% a 4,7% ao ano)"
 * Depois: "0,25% a 0,33% ao mês (cerca de 3% a 4% ao ano)"
 *
 * Justificativa: Batel/Bigorrilho/Cabral são alto padrão saturado;
 * yield acima de 4% a.a. seria otimista. Faixa 3-4% bate com:
 * - FipeZap CWB capital 4,74% a.a. (média da cidade)
 * - Premium tipicamente abaixo da média -> ~3% a.a. faz sentido
 * - Mercado-imobiliario usa "aluguel rende em média 4,74% ao ano" no
 *   block 61 — premium DEVE ficar ABAIXO desse 4,74%
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "mercado-imobiliario-curitiba-2026"

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data: article } = await sb
  .from("articles")
  .select("id, body")
  .eq("slug", SLUG)
  .single()

const body = JSON.parse(JSON.stringify(article.body))
const log = []

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
  if (node && typeof node === "object" && Array.isArray(node.content)) {
    count += walkAndReplace(node.content, from, to)
  }
  return count
}

const patches = [
  {
    from: "0,32% a 0,38% ao mês (~4,0% a 4,7% ao ano)",
    to: "0,25% a 0,33% ao mês (cerca de 3% a 4% ao ano)",
  },
]

let totalTouched = 0
for (const { from, to } of patches) {
  let perPatch = 0
  for (const block of body) {
    perPatch += walkAndReplace(block, from, to)
  }
  if (perPatch > 0) {
    log.push(`✓ "${from}" → "${to}"  (${perPatch} ocorrência(s))`)
    totalTouched += perPatch
  } else {
    log.push(`○ "${from}" → "${to}"  (já corrigido — skip)`)
  }
}

console.log("=".repeat(60))
console.log("Mercado Imobiliário — harmonização premium")
console.log("=".repeat(60))
log.forEach((l) => console.log(l))
console.log("=".repeat(60))

if (DRY_RUN) {
  console.log("\n[DRY-RUN] sem persistência.")
  process.exit(0)
}

if (totalTouched > 0) {
  const { error } = await sb.from("articles").update({ body }).eq("id", article.id)
  if (error) {
    console.error("!!! erro:", error)
    process.exit(1)
  }
  console.log(`\n✅ ${totalTouched} substituição(ões) salvas.`)
} else {
  console.log("\n(nada pra salvar — já idempotente)")
}
