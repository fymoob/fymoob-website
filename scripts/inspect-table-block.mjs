/**
 * Read-only — extrai blocos type=table do artigo `quanto-custa-morar-batel-curitiba`
 * e imprime a estrutura JSON completa pra comparar com o que renderTable espera.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const slug = process.argv[2] ?? "quanto-custa-morar-batel-curitiba"

const { data, error } = await sb
  .from("articles")
  .select("slug, body")
  .eq("slug", slug)
  .single()

if (error || !data) {
  console.error("Erro:", error)
  process.exit(1)
}

const tables = (data.body ?? []).filter((b) => b?.type === "table")
console.log(`\n=== ${slug}: ${tables.length} tabela(s) ===\n`)

for (const [i, t] of tables.entries()) {
  console.log(`Tabela #${i}:`)
  console.log(JSON.stringify(t, null, 2))
  console.log("---")
}
