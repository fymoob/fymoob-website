/**
 * Read-only — encontra trechos onde "FYMOOB" e variações sao usados como
 * fonte/autoridade. Esses precisam ser substituidos por fontes externas
 * verificaveis OU ter o numero removido.
 *
 * Patterns sensiveis:
 *   - "dados internos da FYMOOB"
 *   - "comparacao da FYMOOB"
 *   - "FYMOOB pesquisa/levantou/mostra/coletou"
 *   - "(FYMOOB)" entre parenteses (citacao tipo fonte)
 *   - "CRM FYMOOB"
 *   - "segundo a FYMOOB"
 *   - "estoque FYMOOB"
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import fs from "node:fs"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data: articles } = await sb
  .from("articles")
  .select("slug, body")
  .eq("status", "published")
  .order("slug")

function flat(blocks) {
  let s = ""
  for (const b of blocks ?? []) {
    if (b.type === "table" && b.content?.rows) {
      for (const r of b.content.rows) {
        for (const c of r.cells || []) {
          if (Array.isArray(c)) for (const i of c) s += (i.text ?? "") + " "
          else for (const i of (c.content ?? [])) s += (i.text ?? "") + " "
        }
      }
      continue
    }
    if (Array.isArray(b.content)) for (const i of b.content) s += (i.text ?? "")
    if (b.props?.text) s += " [" + b.props.text + "] "
    if (b.props?.title) s += " [" + b.props.title + "] "
    if (b.props?.description) s += " [" + b.props.description + "] "
    if (b.props?.sources) s += " [sources: " + b.props.sources + "] "
    if (b.props?.sample) s += " [sample: " + b.props.sample + "] "
    s += "\n"
  }
  return s
}

const PATTERNS = [
  /(segundo|conforme|fonte:?|de acordo com)?\s*(dados?|estoque|catalogo|cat[áa]logo|levantamento|pesquisa|comparativo|comparacao|comparação|amostra|estimativa|estudo)\s*(da |do |interno?s?\s*(da|do)\s*)?fym(oob|0ob)/gi,
  /\(\s*fym(oob|0ob)\b[^)]*\)/gi,
  /\bfym(oob|0ob)\b\s+(coletou|levantou|pesquisou|mostra|aponta|registrou|consolidou|analisou|cruzou|fez|observa|verificou)/gi,
  /\bcrm\s+fym(oob|0ob)/gi,
  /\bn=\d+\b/gi, // amostras tipo "n=9"
  /\bdados? (internos?|proprios?|próprios?)\b/gi,
]

const findings = []

for (const a of articles) {
  const text = flat(a.body)
  const seen = new Set()

  for (const re of PATTERNS) {
    const matches = [...text.matchAll(re)]
    for (const m of matches) {
      const start = Math.max(0, m.index - 120)
      const end = Math.min(text.length, m.index + m[0].length + 200)
      const ctx = text.slice(start, end).replace(/\s+/g, " ").trim()
      if (seen.has(ctx)) continue
      seen.add(ctx)
      findings.push({
        slug: a.slug,
        match: m[0].trim(),
        ctx,
      })
    }
  }
}

console.log(`\n${findings.length} trechos com citacao FYMOOB ou similar (precisam revisao):\n`)

const byArt = {}
for (const f of findings) {
  byArt[f.slug] = byArt[f.slug] ?? []
  byArt[f.slug].push(f)
}

for (const slug of Object.keys(byArt).sort()) {
  console.log(`\n=== ${slug} (${byArt[slug].length}) ===`)
  for (const f of byArt[slug]) {
    console.log(`  [${f.match}]`)
    console.log(`    "...${f.ctx.slice(0, 280)}..."`)
  }
}

// salva markdown
const md = []
md.push(`# Auditoria de citacoes FYMOOB nos artigos — ${new Date().toISOString().slice(0, 10)}`)
md.push(``)
md.push(`Total: **${findings.length}** trechos onde FYMOOB e citado como fonte/autoridade.`)
md.push(``)
md.push(`Substituir por fonte externa veridica OU remover o numero/comparativo.`)
md.push(``)
for (const slug of Object.keys(byArt).sort()) {
  md.push(`## ${slug} (${byArt[slug].length})`)
  md.push(``)
  for (const f of byArt[slug]) {
    md.push(`**Match:** \`${f.match}\``)
    md.push(``)
    md.push(`> ${f.ctx}`)
    md.push(``)
  }
}

fs.writeFileSync("docs/audit/fymoob-citations-2026-05-02.md", md.join("\n"))
console.log(`\n✓ docs/audit/fymoob-citations-2026-05-02.md`)
