/**
 * Fix idempotente — tabelas com `content` sem `type: 'tableContent'`
 * (BlockNote nao consegue parsear, gera "Unreachable case: undefined").
 *
 * Causa: scripts de revisao anteriores inseriram tabelas com `{ rows }` em
 * vez do shape canonico `{ type: 'tableContent', columnWidths: [], rows: [] }`.
 *
 * Idempotente: skip se ja corrigido.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

function fixBody(body) {
  let touched = 0
  const next = body.map((block) => {
    if (block.type !== "table") return block
    const c = block.content
    if (!c || typeof c !== "object" || Array.isArray(c)) return block
    if (c.type === "tableContent") return block

    const rows = Array.isArray(c.rows) ? c.rows : []
    const cols = rows[0]?.cells?.length ?? 0
    const fixedContent = {
      type: "tableContent",
      columnWidths: Array(cols).fill(null),
      rows,
    }
    touched++
    return { ...block, content: fixedContent }
  })
  return { body: next, touched }
}

const { data: articles, error } = await sb
  .from("articles")
  .select("id, slug, title, body")
if (error) {
  console.error(error)
  process.exit(1)
}

let totalArticles = 0
let totalBlocks = 0
for (const a of articles) {
  if (!Array.isArray(a.body)) continue
  const { body, touched } = fixBody(a.body)
  if (touched === 0) continue

  console.log(`[fix] ${a.slug} — ${touched} tabela(s)`)
  const { error: upErr } = await sb
    .from("articles")
    .update({ body })
    .eq("id", a.id)
  if (upErr) {
    console.error(`  failed:`, upErr.message)
    process.exit(1)
  }
  totalArticles++
  totalBlocks += touched
}

console.log(
  `\nDone. ${totalArticles} artigo(s), ${totalBlocks} tabela(s) corrigida(s).`
)
