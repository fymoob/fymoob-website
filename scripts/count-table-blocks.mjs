/**
 * Read-only — conta tabelas por artigo + detecta shape (legado vs wrapped).
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data: articles, error } = await sb
  .from("articles")
  .select("slug, body, status")
  .order("slug")

if (error) {
  console.error(error)
  process.exit(1)
}

let totalTables = 0
let wrapped = 0
let legacy = 0
let mixed = 0

for (const a of articles) {
  const body = Array.isArray(a.body) ? a.body : []
  const tables = body.filter((b) => b?.type === "table")
  if (tables.length === 0) continue

  let perArticleWrapped = 0
  let perArticleLegacy = 0

  for (const t of tables) {
    const rows = t?.content?.rows ?? []
    for (const r of rows) {
      for (const c of r.cells ?? []) {
        if (Array.isArray(c)) perArticleLegacy++
        else if (c?.type === "tableCell") perArticleWrapped++
      }
    }
  }

  totalTables += tables.length
  const shape =
    perArticleWrapped > 0 && perArticleLegacy > 0
      ? "MIXED"
      : perArticleWrapped > 0
        ? "wrapped"
        : "legacy"
  if (shape === "wrapped") wrapped++
  else if (shape === "legacy") legacy++
  else mixed++

  console.log(
    `[${a.status.padEnd(9)}] ${a.slug}: ${tables.length} tabela(s), shape=${shape} (wrapped=${perArticleWrapped}, legacy=${perArticleLegacy})`
  )
}

console.log(
  `\nTotal: ${totalTables} tabelas em ${wrapped + legacy + mixed} artigos. wrapped=${wrapped} legacy=${legacy} mixed=${mixed}`
)
