/**
 * Read-only — extrai cada artigo publicado em formato markdown estruturado
 * pra revisao editorial. Output em docs/audit/articles-raw/<slug>.md
 *
 * Cada arquivo tem:
 * - Frontmatter com metadados
 * - Texto linear (paragraphs + headings + list items + tables como pipe)
 * - Custom blocks marcados (CALLOUT, METHODOLOGY, CTA, FAQ, CHANGELOG)
 *
 * Esses arquivos sao a referencia de leitura — o doc de revisao em
 * docs/seo/article-revision-plan-2026-05-02.md aponta pra trechos.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import fs from "node:fs"
import path from "node:path"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data: articles } = await sb
  .from("articles")
  .select("slug, title, description, body, tags, word_count, methodology, seo_meta_title, seo_meta_description")
  .eq("status", "published")
  .order("slug")

const OUT_DIR = "docs/audit/articles-raw"
fs.mkdirSync(OUT_DIR, { recursive: true })

function inlineToText(content) {
  if (!Array.isArray(content)) return ""
  return content
    .map((it) => {
      if (it?.type === "link") {
        const inner = inlineToText(it.content)
        return `[${inner}](${it.href || "?"})`
      }
      if (typeof it?.text === "string") {
        let t = it.text
        if (it.styles?.bold) t = `**${t}**`
        if (it.styles?.italic) t = `*${t}*`
        return t
      }
      return ""
    })
    .join("")
}

function blockToMd(block, depth = 0) {
  if (!block || typeof block !== "object") return ""
  switch (block.type) {
    case "heading": {
      const lvl = Math.min(Math.max(block.props?.level ?? 2, 2), 4)
      return `\n${"#".repeat(lvl)} ${inlineToText(block.content)}\n`
    }
    case "paragraph":
      return `${inlineToText(block.content)}\n`
    case "bulletListItem":
      return `${"  ".repeat(depth)}- ${inlineToText(block.content)}\n`
    case "numberedListItem":
      return `${"  ".repeat(depth)}1. ${inlineToText(block.content)}\n`
    case "checkListItem":
      return `${"  ".repeat(depth)}- [ ] ${inlineToText(block.content)}\n`
    case "quote":
      return `> ${inlineToText(block.content)}\n`
    case "divider":
      return `\n---\n`
    case "table": {
      const rows = block.content?.rows ?? []
      if (rows.length === 0) return ""
      const cellText = (cell) => {
        if (Array.isArray(cell)) return inlineToText(cell)
        if (cell?.content) return inlineToText(cell.content)
        return ""
      }
      const lines = []
      const [head, ...body] = rows
      lines.push(`| ${head.cells.map(cellText).join(" | ")} |`)
      lines.push(`|${head.cells.map(() => "---").join("|")}|`)
      for (const r of body) lines.push(`| ${r.cells.map(cellText).join(" | ")} |`)
      return `\n${lines.join("\n")}\n`
    }
    case "calloutBox": {
      const variant = block.props?.variant ?? "info"
      const text = inlineToText(block.content)
      return `\n> **[CALLOUT-${variant.toUpperCase()}]** ${text}\n`
    }
    case "methodologyBox": {
      const p = block.props ?? {}
      return [
        `\n> **[METODOLOGIA]**`,
        `> - Periodo: ${p.period || "-"}`,
        `> - Amostra: ${p.sample || "-"}`,
        `> - Tratamento: ${p.treatment || "-"}`,
        `> - Fontes: ${p.sources || "-"}`,
        `> - Atualizado: ${p.lastUpdate || "-"}`,
        ``,
      ].join("\n")
    }
    case "ctaBox": {
      const p = block.props ?? {}
      return `\n> **[CTA]** ${p.title || ""} → ${p.label || ""} (${p.href || "?"})\n> ${p.description || ""}\n`
    }
    case "faqItem": {
      const p = block.props ?? {}
      return `\n**Q: ${p.question || "?"}**\n${p.answer || ""}\n`
    }
    case "changelog": {
      let entries = []
      try {
        entries = JSON.parse(block.props?.entries || "[]")
      } catch {}
      const lines = entries.map((e) => `- ${e.date}: ${e.change}`).join("\n")
      return `\n> **[CHANGELOG]**\n${lines}\n`
    }
    case "imovelDestaque": {
      const p = block.props ?? {}
      return `\n> **[IMOVEL_DESTAQUE]** ${p.fallbackTitle || p.codigo} → ${p.fallbackUrl || ""}\n`
    }
    default:
      return inlineToText(block.content) + "\n"
  }
}

for (const a of articles) {
  const lines = []
  lines.push(`---`)
  lines.push(`slug: ${a.slug}`)
  lines.push(`title: "${a.title.replace(/"/g, '\\"')}"`)
  lines.push(`description: "${(a.description || "").replace(/"/g, '\\"')}"`)
  lines.push(`tags: [${(a.tags || []).map((t) => JSON.stringify(t)).join(", ")}]`)
  lines.push(`word_count: ${a.word_count ?? 0}`)
  lines.push(`seo_meta_title: "${a.seo_meta_title || ""}"`)
  lines.push(`seo_meta_description: "${a.seo_meta_description || ""}"`)
  if (a.methodology) {
    lines.push(`methodology:`)
    for (const [k, v] of Object.entries(a.methodology)) {
      lines.push(`  ${k}: ${JSON.stringify(v)}`)
    }
  }
  lines.push(`---`)
  lines.push(``)
  lines.push(`# ${a.title}`)
  lines.push(``)
  lines.push(`> ${a.description || ""}`)
  lines.push(``)
  for (const block of a.body ?? []) {
    lines.push(blockToMd(block))
  }
  fs.writeFileSync(path.join(OUT_DIR, `${a.slug}.md`), lines.join("\n"))
}

console.log(`✓ ${articles.length} artigos exportados pra ${OUT_DIR}/`)
