/**
 * Fix retroativo — substitui placeholders `FYMOOB_BLOCK_N` que escaparam
 * da migracao MDX→BlockNote pelos blocos custom corretos.
 *
 * Causa raiz (commit anterior do mdx-to-blocknote.mjs): placeholder usava
 * `__FYMOOB_BLOCK_N__` que em markdown vira `<strong>FYMOOB_BLOCK_N</strong>`
 * antes do detector pegar. Resultado: 15/15 blog posts com placeholders
 * vazando como texto bold no body.
 *
 * Estrategia desse fix:
 * 1. Pra cada blog post afetado:
 * 2. Le MDX original em content/blog/{slug}.mdx
 * 3. Extrai componentes custom em ordem (mesmo regex original)
 * 4. Detecta paragraphs no body com texto FYMOOB_BLOCK_N
 * 5. Substitui pelo bloco BlockNote correspondente
 * 6. UPDATE no Supabase
 *
 * Uso: node scripts/fix-fymoob-block-placeholders.mjs
 *      node scripts/fix-fymoob-block-placeholders.mjs --dry-run  (so reporta)
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import fs from "node:fs"
import path from "node:path"
import { randomUUID } from "node:crypto"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

// ───────────────────────────────────────────────────────────
// Reuso da logica de extracao do mdx-to-blocknote.mjs
// ───────────────────────────────────────────────────────────

const COMPONENT_RE =
  /<(MethodologyBox|CalloutBox|CTABox|Changelog)([^>]*?)(?:\/>|>([\s\S]*?)<\/\1>)/g

function parseJsxAttrs(raw) {
  const attrs = {}
  if (!raw) return attrs
  const re = /(\w+)\s*=\s*(?:"([^"]*)"|\{([^}]*(?:\{[^}]*\}[^}]*)*)\})/g
  let m
  while ((m = re.exec(raw)) !== null) {
    const [, key, strVal, exprVal] = m
    attrs[key] = strVal !== undefined ? strVal : exprVal
  }
  return attrs
}

function extractCustomBlocks(mdxRaw) {
  const blocks = []
  mdxRaw.replace(COMPONENT_RE, (_match, tag, attrsRaw, inner) => {
    const attrs = parseJsxAttrs(attrsRaw)
    blocks.push({ tag, attrs, inner: inner ? inner.trim() : "" })
    return ""
  })
  return blocks
}

function customBlockToNote(custom) {
  const { tag, attrs, inner } = custom
  switch (tag) {
    case "MethodologyBox":
      return {
        id: randomUUID(),
        type: "methodologyBox",
        props: {
          period: attrs.period ?? "",
          sample: attrs.sample ?? "",
          treatment: attrs.treatment ?? "",
          sources: Array.isArray(attrs.sources)
            ? attrs.sources.join(", ")
            : (attrs.sources ?? ""),
          lastUpdate: attrs.lastUpdate ?? "",
          nextReview: attrs.nextReview ?? "",
        },
        children: [],
      }
    case "CalloutBox": {
      const text = inner.trim()
      const variant =
        attrs.variant === "warning" || attrs.variant === "alert"
          ? attrs.variant
          : "info"
      return {
        id: randomUUID(),
        type: "calloutBox",
        props: { variant },
        content: [{ type: "text", text, styles: {} }],
        children: [],
      }
    }
    case "CTABox":
      return {
        id: randomUUID(),
        type: "ctaBox",
        props: {
          title: attrs.title ?? "",
          description: attrs.description ?? "",
          href: attrs.href ?? "",
          label: attrs.label ?? "",
        },
        children: [],
      }
    case "Changelog": {
      let entries = []
      if (attrs.entries) {
        try {
          entries = Function(`"use strict"; return (${attrs.entries})`)()
        } catch {
          entries = []
        }
      }
      return {
        id: randomUUID(),
        type: "changelog",
        props: { entries: JSON.stringify(entries) },
        children: [],
      }
    }
    default:
      return null
  }
}

// ───────────────────────────────────────────────────────────
// Detector de placeholder no body BlockNote
// ───────────────────────────────────────────────────────────

const PLACEHOLDER_RE = /^FYMOOB_BLOCK_(\d+)$/

function detectPlaceholderBlock(block) {
  if (block?.type !== "paragraph") return null
  const content = block.content
  if (!Array.isArray(content) || content.length !== 1) return null
  const item = content[0]
  if (item?.type !== "text" || typeof item.text !== "string") return null
  const m = PLACEHOLDER_RE.exec(item.text.trim())
  return m ? parseInt(m[1], 10) : null
}

// ───────────────────────────────────────────────────────────
// Fix por artigo
// ───────────────────────────────────────────────────────────

const BLOG_DIR = path.join(process.cwd(), "content/blog")

const { data: articles, error } = await sb
  .from("articles")
  .select("id, slug, title, body")
  .order("slug")

if (error) {
  console.error(error)
  process.exit(1)
}

let fixedCount = 0
let totalReplacements = 0

for (const article of articles) {
  const bodyJson = JSON.stringify(article.body ?? [])
  if (!bodyJson.includes("FYMOOB_BLOCK_")) continue

  const mdxPath = path.join(BLOG_DIR, `${article.slug}.mdx`)
  if (!fs.existsSync(mdxPath)) {
    console.log(`⚠️  ${article.slug}: MDX original nao existe — pulo`)
    continue
  }

  const mdxRaw = fs.readFileSync(mdxPath, "utf-8")
  const customs = extractCustomBlocks(mdxRaw)

  // Substitui no body
  const body = article.body
  let replacements = 0
  let unmatched = 0
  const newBody = body.map((block) => {
    const idx = detectPlaceholderBlock(block)
    if (idx === null) return block
    const custom = customs[idx]
    if (!custom) {
      unmatched++
      console.log(`   ⚠️  bloco ${idx} nao encontrado no MDX (${article.slug})`)
      return block
    }
    const replaced = customBlockToNote(custom)
    if (!replaced) {
      unmatched++
      return block
    }
    replacements++
    return replaced
  })

  if (replacements === 0) continue

  console.log(
    `✓ ${article.slug}: ${replacements} placeholders substituidos${
      unmatched > 0 ? ` (${unmatched} sem match)` : ""
    }`
  )
  fixedCount++
  totalReplacements += replacements

  if (!DRY_RUN) {
    const { error: updateErr } = await sb
      .from("articles")
      .update({ body: newBody })
      .eq("id", article.id)
    if (updateErr) {
      console.error(`  ❌ erro ao atualizar: ${updateErr.message}`)
    }
  }
}

console.log(
  `\n${DRY_RUN ? "[DRY-RUN] " : ""}${fixedCount} artigos corrigidos, ${totalReplacements} blocos substituidos.`
)
