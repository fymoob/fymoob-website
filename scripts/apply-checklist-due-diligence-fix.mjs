/**
 * Substitui "due diligence" por "análise documental" no artigo
 * checklist-compra-imovel. Mantém termo técnico onde já é
 * convencionado em finanças/imobiliário (sem alteração)? Não — o
 * usuário pediu pra trocar todas as ocorrências.
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
const log = []

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

// Substituições (ordem importa: mais específicas primeiro)
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Fase 3 — Due diligence (antes de fechar a proposta)", "Fase 3 — Análise documental (antes de fechar a proposta)")
    n += walkAndReplace(block, "Ignorar a Fase 3 (due diligence) é o erro mais caro", "Ignorar a Fase 3 (análise documental) é o erro mais caro")
    n += walkAndReplace(block, "Verifique averbação na Fase 3 (due diligence)", "Verifique averbação na Fase 3 (análise documental)")
    n += walkAndReplace(block, "due diligence completa", "análise documental completa")
    n += walkAndReplace(block, "due diligence do imóvel", "análise documental do imóvel")
    // genérico (qualquer ocorrência remanescente)
    n += walkAndReplace(block, "due diligence", "análise documental")
  }
  if (n > 0) log.push(`${n} ocorrência(s) de "due diligence" → "análise documental"`)
}

if (log.length === 0) {
  console.log("Nada pra mudar (idempotente OK).")
  process.exit(0)
}

console.log("\nMudanças aplicadas:")
for (const l of log) console.log("  -", l)

if (DRY_RUN) {
  console.log("\n[DRY RUN] Nada gravado.")
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
