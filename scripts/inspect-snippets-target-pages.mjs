/**
 * Read-only — extrai estado atual dos snippets (title/meta/description)
 * dos 5 blog posts que vamos otimizar na Sprint 1.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const slugs = [
  "financiamento-caixa-itau-bradesco-comparativo",
  "custo-de-vida-curitiba",
  "itbi-curitiba-valor-como-pagar",
  "mercado-imobiliario-curitiba-2026",
  "preco-metro-quadrado-curitiba-bairro",
]

const { data, error } = await sb
  .from("articles")
  .select("slug, title, description, seo_meta_title, seo_meta_description, word_count, body, tags")
  .in("slug", slugs)

if (error) {
  console.error(error)
  process.exit(1)
}

for (const a of data) {
  console.log(`\n${"=".repeat(80)}`)
  console.log(`SLUG: ${a.slug}`)
  console.log(`TAGS: ${(a.tags ?? []).join(", ")}`)
  console.log(`WORD COUNT: ${a.word_count}`)
  console.log(`${"=".repeat(80)}`)
  console.log(`TITLE (post):       ${a.title}  (${a.title?.length} chars)`)
  console.log(`DESCRIPTION (post): ${a.description}  (${a.description?.length} chars)`)
  console.log(`SEO META TITLE:     ${a.seo_meta_title || "(vazio — usa title)"}  (${a.seo_meta_title?.length ?? "—"} chars)`)
  console.log(`SEO META DESC:      ${a.seo_meta_description || "(vazio — usa description)"}  (${a.seo_meta_description?.length ?? "—"} chars)`)

  // Primeiros 2 paragrafos do body — pra entender o gancho
  const intro = (a.body ?? [])
    .filter((b) => b.type === "paragraph")
    .slice(0, 2)
    .map((b) => (b.content ?? []).map((c) => c.text ?? "").join(""))
    .join(" || ")
  console.log(`\nINTRO (2 paragrafos): ${intro.slice(0, 400)}${intro.length > 400 ? "..." : ""}`)
}
