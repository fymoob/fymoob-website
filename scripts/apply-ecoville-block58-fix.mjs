/**
 * Fix focado no block 58 do ecoville-vs-bigorrilho que ficou de fora
 * do v2 (texto fragmentado em 5 inline nodes; walkAndReplace nao pegou).
 *
 * Item N do plano GPT: "falso absoluto" -> "depende do recorte"
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data: article } = await sb
  .from("articles")
  .select("id, body")
  .eq("slug", "ecoville-vs-bigorrilho-curitiba")
  .single()

const body = JSON.parse(JSON.stringify(article.body))

const t = (text, styles = {}) => ({ type: "text", text, styles })
const b = (text) => t(text, { bold: true })

function inlineToString(content) {
  if (!Array.isArray(content)) return ""
  return content.map((c) => c?.text ?? "").join("")
}

const idx58 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Ecoville é mais barato que Bigorrilho") &&
    inlineToString(bl.content).includes("falso absoluto")
)

if (idx58 < 0) {
  console.log("block 58 já corrigido (ou não encontrado) — skip")
  process.exit(0)
}

body[idx58].content = [
  b("\"Ecoville é mais barato que Bigorrilho.\""),
  t(" Depende do recorte: em apartamento usado, sim — o Ecoville costuma sair mais barato. Em apto novo (lançamento) e casa em condomínio, não — o Ecoville geralmente é mais caro. Quem afirma genericamente que \"Ecoville é mais barato\" está misturando os 3 mercados; pra apartamento padrão família em prédio novo, o Ecoville é mais caro."),
]

const { error } = await sb
  .from("articles")
  .update({ body })
  .eq("id", article.id)

if (error) {
  console.error("Erro:", error)
  process.exit(1)
}

console.log("✅ block 58 corrigido — 'falso absoluto' → 'depende do recorte'")
