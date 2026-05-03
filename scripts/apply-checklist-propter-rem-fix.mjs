/**
 * Substitui "(propter rem)" no LEAD do artigo checklist-compra-imovel
 * por explicação mais acessível ao leitor não-jurídico. O termo técnico
 * é mantido nas seções aprofundadas (heading dívida de condomínio, FAQ),
 * onde já vem com explicação contextual.
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "checklist-compra-imovel"

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

function walkAndReplace(node, from, to) {
  let count = 0
  if (Array.isArray(node)) {
    for (const item of node) {
      if (item?.type === "text" && typeof item.text === "string" && item.text.includes(from)) {
        item.text = item.text.split(from).join(to)
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

let n = 0
for (const block of body) n += walkAndReplace(
  block,
  "na dívida de condomínio (propter rem) e na base de cálculo do ITBI",
  "na dívida de condomínio (que acompanha o imóvel — não fica com o vendedor) e na base de cálculo do ITBI"
)

if (n === 0) {
  console.log("Nada pra mudar (idempotente OK).")
  process.exit(0)
}

console.log(`✓ Lead atualizado: "(propter rem)" → "(que acompanha o imóvel — não fica com o vendedor)"`)

if (DRY_RUN) {
  console.log("[DRY RUN] Nada gravado.")
  process.exit(0)
}

const { error } = await sb
  .from("articles")
  .update({ body, updated_at: new Date().toISOString() })
  .eq("id", article.id)
if (error) {
  console.error("Erro:", error)
  process.exit(1)
}
console.log("\n✓ Artigo atualizado no Supabase.")
