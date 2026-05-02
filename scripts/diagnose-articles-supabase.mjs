/**
 * Diagnostico read-only do estado dos artigos no Supabase.
 *
 * Checa:
 * - status (draft / scheduled / published / archived)
 * - body vazio ou com poucos blocos
 * - placeholders FYMOOB_BLOCK_N ainda escapando
 * - texto literal "<strong>FYMOOB" / "**FYMOOB" residuo do bug do mdx-to-blocknote
 * - blocos com type desconhecido (corrupted)
 * - published_at no futuro / null pra status=published
 * - seo_no_index
 *
 * USO: node scripts/diagnose-articles-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const KNOWN_BLOCK_TYPES = new Set([
  "paragraph", "heading", "bulletListItem", "numberedListItem",
  "checkListItem", "table", "image", "video", "audio", "file",
  "codeBlock", "quote", "divider",
  // custom FYMOOB
  "methodologyBox", "calloutBox", "ctaBox", "changelog", "faqItem", "imovelDestaque",
])

const PLACEHOLDER_RE = /FYMOOB_BLOCK_\d+/g

function summarizeBlock(block) {
  const t = block?.type ?? "?"
  if (t === "paragraph" || t === "heading") {
    const text = (block.content ?? [])
      .map((c) => (typeof c?.text === "string" ? c.text : ""))
      .join("")
    return `${t}: ${text.slice(0, 80)}`
  }
  return t
}

const { data: articles, error } = await sb
  .from("articles")
  .select("id, slug, title, description, status, published_at, scheduled_at, updated_at, seo_no_index, body, cover_image_url, cover_image_alt, author_id, tags")
  .order("slug")

if (error) {
  console.error("Erro ao ler articles:", error)
  process.exit(1)
}

console.log(`\n=== Total: ${articles.length} artigos no Supabase ===\n`)

const byStatus = {}
const issues = []

for (const a of articles) {
  byStatus[a.status] = (byStatus[a.status] ?? 0) + 1

  const body = Array.isArray(a.body) ? a.body : []
  const bodyJson = JSON.stringify(body)
  const placeholderMatches = bodyJson.match(PLACEHOLDER_RE) ?? []
  const hasStrongPlaceholder = bodyJson.includes("<strong>FYMOOB") || bodyJson.includes("**FYMOOB")

  const unknownBlockTypes = body
    .map((b) => b?.type)
    .filter((t) => t && !KNOWN_BLOCK_TYPES.has(t))

  const empty = body.length === 0
  const tinyBody = !empty && body.length < 5

  // detecta paragrafo vazio com so 1 bloco (sintoma de body-em-branco apos save bugado)
  const onlyEmptyParagraph =
    body.length === 1 &&
    body[0]?.type === "paragraph" &&
    (!body[0]?.content || body[0].content.length === 0)

  const problems = []
  if (placeholderMatches.length > 0)
    problems.push(`${placeholderMatches.length} placeholder(s) FYMOOB_BLOCK_N`)
  if (hasStrongPlaceholder) problems.push("texto <strong>FYMOOB ou **FYMOOB no body")
  if (unknownBlockTypes.length > 0)
    problems.push(`tipos de bloco desconhecidos: ${[...new Set(unknownBlockTypes)].join(", ")}`)
  if (empty) problems.push("body vazio (zero blocos)")
  else if (onlyEmptyParagraph) problems.push("body com apenas 1 paragrafo VAZIO")
  else if (tinyBody) problems.push(`body curto (${body.length} blocos)`)

  if (a.status === "published" && !a.published_at)
    problems.push("status=published sem published_at")
  if (a.status === "published" && a.published_at && new Date(a.published_at) > new Date())
    problems.push("published_at no FUTURO (nao aparece no /blog)")
  if (a.status === "published" && a.seo_no_index)
    problems.push("status=published mas seo_no_index=true (Google nao indexa)")

  if (problems.length > 0) {
    issues.push({ slug: a.slug, status: a.status, blocks: body.length, problems, body })
  }
}

console.log("Status distribution:")
for (const [status, count] of Object.entries(byStatus)) {
  console.log(`  ${status}: ${count}`)
}

console.log(`\n=== Artigos com problemas: ${issues.length} ===\n`)

for (const i of issues) {
  console.log(`[${i.status}] ${i.slug}  (${i.blocks} blocos)`)
  for (const p of i.problems) console.log(`   - ${p}`)
  if (i.blocks <= 3) {
    console.log(`   sample blocks:`)
    for (const b of i.body) console.log(`     · ${summarizeBlock(b)}`)
  }
  console.log("")
}

// Mostra todos os published com seu count de blocos pra contexto rapido
console.log("\n=== Resumo published (que apareceria em /blog) ===")
const pub = articles
  .filter((a) => a.status === "published")
  .sort((a, b) => (a.body?.length ?? 0) - (b.body?.length ?? 0))
for (const a of pub) {
  const n = Array.isArray(a.body) ? a.body.length : 0
  console.log(`  ${n.toString().padStart(3)} blocos  | ${a.slug}`)
}

// ────────────────────────────────────────────────────────────────
// Simula o gate de publicacao (passesPublishGate) pra cada draft
// Reproduz src/lib/seo-score.ts — `block` severity:
//   - title vazio
//   - description vazia
//   - cover_image_url null
//   - cover_image_alt null ou <5 chars
//   - author_id null
//   - slug nao kebab-case
//   - word count < 300
// ────────────────────────────────────────────────────────────────

function countWordsInBlock(block) {
  if (!block) return 0
  const content = block.content
  if (!Array.isArray(content)) return 0
  let total = 0
  for (const item of content) {
    if (typeof item?.text === "string") {
      total += item.text.trim().split(/\s+/).filter(Boolean).length
    }
  }
  return total
}

function blocksWordCount(blocks) {
  if (!Array.isArray(blocks)) return 0
  return blocks.reduce((sum, b) => sum + countWordsInBlock(b), 0)
}

console.log("\n=== Gate de publicacao por draft ===")
console.log("(checks bloqueantes — se aparecer 1 ou mais, botao Publicar negaria)\n")

const drafts = articles.filter((a) => a.status === "draft" && !a.slug.startsWith("rascunho-"))
const blockedSummary = []

for (const a of drafts) {
  const blockers = []
  if (!a.title || a.title.length === 0) blockers.push("title vazio")
  if (!a.description || a.description.length === 0) blockers.push("description vazia")
  if (!a.cover_image_url) blockers.push("cover_image_url null")
  if (!a.cover_image_alt || a.cover_image_alt.length < 5) blockers.push("cover_image_alt insuficiente")
  if (!a.author_id) blockers.push("author_id null")
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug)) blockers.push("slug invalido")
  const wc = blocksWordCount(a.body)
  if (wc < 300) blockers.push(`word_count<300 (${wc})`)

  const status = blockers.length === 0 ? "PASSA" : "BLOQUEADO"
  console.log(`[${status}] ${a.slug} (${wc} palavras)`)
  for (const b of blockers) console.log(`   - ${b}`)
  blockedSummary.push({ slug: a.slug, blockers })
}

const okCount = blockedSummary.filter((x) => x.blockers.length === 0).length
console.log(`\n${okCount}/${drafts.length} drafts passariam direto no gate de publicacao.`)
