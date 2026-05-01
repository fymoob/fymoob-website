/**
 * Detector — encontra artigos no Supabase cujo body contem placeholders
 * `FYMOOB_BLOCK_N` que escaparam da migracao.
 *
 * Uso: node scripts/check-fymoob-block-placeholders.mjs
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error("Missing SUPABASE env vars")
  process.exit(1)
}

const sb = createClient(url, key, { auth: { persistSession: false } })

const { data, error } = await sb
  .from("articles")
  .select("id, slug, title, body")
  .order("slug")

if (error) {
  console.error(error)
  process.exit(1)
}

const PLACEHOLDER_RE = /FYMOOB_BLOCK_\d+/

let total = 0
for (const a of data ?? []) {
  const json = JSON.stringify(a.body ?? [])
  const matches = json.match(/FYMOOB_BLOCK_\d+/g)
  if (matches) {
    total++
    console.log(`\n📄 ${a.slug}`)
    console.log(`   Placeholders: ${[...new Set(matches)].join(", ")}`)
  }
}

console.log(`\n${total}/${data?.length ?? 0} artigos afetados`)
