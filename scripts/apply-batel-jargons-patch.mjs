/**
 * Patch idempotente — limpeza de jargões e typos no
 * `quanto-custa-morar-batel-curitiba`.
 *
 * 1. "casal DINK sem filhos" → "casal sem filhos com dupla renda"
 *    (DINK é jargão financeiro em inglês; leitor brasileiro mediano
 *    não conhece. Mantive 'studio' porque virou padrão do mercado
 *    imobiliário BR; idem 'boutique', 'brunch', 'iFood'.)
 * 2. "Wine bar" → "Bar de vinho"
 * 3. Typo "profissionais profissional" → "profissionais"
 *    (heading e parágrafo)
 * 4. "(+9-17%)" → "(+8,9%)" — alinha com a tabela revisada (R$ 19.511
 *    Itaim Bibi = +8,9% vs Batel R$ 17.924).
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "quanto-custa-morar-batel-curitiba"

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

function replaceInBlock(blockIdx, from, to, label) {
  const bl = body[blockIdx]
  if (!bl || !Array.isArray(bl.content)) return false
  let touched = false
  for (const item of bl.content) {
    if (item?.type === "text" && typeof item.text === "string" && item.text.includes(from)) {
      item.text = item.text.replaceAll(from, to)
      touched = true
    }
    if (item?.type === "link" && Array.isArray(item.content)) {
      for (const sub of item.content) {
        if (sub?.type === "text" && typeof sub.text === "string" && sub.text.includes(from)) {
          sub.text = sub.text.replaceAll(from, to)
          touched = true
        }
      }
    }
  }
  if (touched) log.push(`[${label}] block ${blockIdx}: "${from}" → "${to}"`)
  else log.push(`[${label}] block ${blockIdx}: já corrigido — skip`)
  return touched
}

// 1. DINK
const idxDink = body.findIndex(
  (bl) => bl.type === "paragraph" && inlineToString(bl.content).includes("casal DINK sem filhos")
)
if (idxDink >= 0) {
  replaceInBlock(idxDink, "casal DINK sem filhos", "casal sem filhos com dupla renda", "1.DINK")
} else {
  log.push("[1.DINK] não encontrado — provavelmente já corrigido")
}

// 2. Wine bar
const idxWine = body.findIndex(
  (bl) => bl.type === "paragraph" && inlineToString(bl.content).includes("Wine bar")
)
if (idxWine >= 0) {
  replaceInBlock(idxWine, "Wine bar", "Bar de vinho", "2.WineBar")
} else {
  log.push("[2.WineBar] não encontrado — provavelmente já corrigido")
}

// 3. Typo "profissionais profissional" — em 2 blocos (heading + paragraph)
const typoIndices = []
for (const [i, bl] of body.entries()) {
  if (Array.isArray(bl.content)) {
    if (inlineToString(bl.content).includes("profissionais profissional")) {
      typoIndices.push(i)
    }
  }
}
if (typoIndices.length > 0) {
  for (const i of typoIndices) {
    replaceInBlock(i, "profissionais profissional", "profissionais", "3.Typo")
  }
} else {
  log.push("[3.Typo] não encontrado — já corrigido")
}

// 4. "+9-17%" → "+8,9%"
const idx9_17 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Itaim Bibi (+9-17%)")
)
if (idx9_17 >= 0) {
  replaceInBlock(idx9_17, "Itaim Bibi (+9-17%)", "Itaim Bibi (+8,9%)", "4.Itaim%")
} else {
  log.push("[4.Itaim%] não encontrado — já corrigido")
}

console.log("=".repeat(60))
console.log("Batel — limpeza de jargões e typos")
console.log("=".repeat(60))
log.forEach((l) => console.log(l))
console.log("=".repeat(60))

if (DRY_RUN) {
  console.log("\n[DRY-RUN] sem persistência.")
  process.exit(0)
}

const { error: upErr } = await sb
  .from("articles")
  .update({ body })
  .eq("id", article.id)

if (upErr) {
  console.error("\n!!! Erro ao salvar:", upErr)
  process.exit(1)
}

console.log("\n✅ Salvo.")
