/**
 * Read-only — dump da estrutura BlockNote do post de financiamento
 * para mapear onde cada mudança entra.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data } = await sb
  .from("articles")
  .select("title, body")
  .eq("slug", "financiamento-caixa-itau-bradesco-comparativo")
  .single()

console.log(`TITLE: ${data.title}\n`)
console.log(`BLOCKS: ${data.body.length}\n`)

for (const [i, b] of data.body.entries()) {
  let preview = ""
  if (Array.isArray(b.content)) {
    preview = b.content.map((c) => c.text ?? "").join("").slice(0, 110)
  } else if (b.props?.title) {
    preview = `[${b.type}] title=${b.props.title}`
  } else if (b.type === "table") {
    const rows = b.content?.rows ?? []
    preview = `[table ${rows.length} rows]`
  } else if (b.type === "calloutBox") {
    preview = `[callout ${b.props?.variant}] ${(b.content ?? []).map(c => c.text ?? "").join("").slice(0, 90)}`
  } else if (b.type === "ctaBox") {
    preview = `[CTA] ${b.props?.title ?? "?"}`
  } else if (b.type === "faqItem") {
    preview = `[FAQ Q] ${b.props?.question?.slice(0, 80) ?? "?"}`
  } else if (b.type === "methodologyBox") {
    preview = `[METHODOLOGY]`
  } else if (b.type === "changelog") {
    preview = `[CHANGELOG]`
  }
  console.log(`${i.toString().padStart(3)} [${b.type.padEnd(20)}] ${preview}`)
}
