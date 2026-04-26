#!/usr/bin/env node

/**
 * sanity-to-mdx.mjs — Sync reverso Sanity → MDX (Disaster Recovery N2)
 *
 * Converte todos os posts publicados no Sanity de volta pra MDX em
 * content/blog/<slug>.mdx, mantendo o backup local sempre sincronizado.
 *
 * Pra cada post:
 * 1. Lê documento Sanity (incluindo body Portable Text)
 * 2. Reconstrói frontmatter YAML com todos os campos
 * 3. Converte Portable Text → markdown (com 4 blocos custom revertidos pra JSX)
 * 4. Baixa imagem capa (cdn.sanity.io) → public/blog/<slug>.webp
 * 5. Baixa imagens inline → public/blog/inline-<asset_id>.webp
 * 6. Substitui referências CDN por path local
 * 7. Salva em content/blog/<slug>.mdx
 *
 * Uso:
 *   node scripts/sanity-to-mdx.mjs               # sincroniza todos
 *   node scripts/sanity-to-mdx.mjs <slug>        # apenas 1 post
 *   node scripts/sanity-to-mdx.mjs --dry-run     # simula sem escrever
 *
 * Pré-requisitos: SANITY_API_READ_TOKEN no .env.local
 */

import { config } from "dotenv"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@sanity/client"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
config({ path: path.resolve(ROOT, ".env.local") })

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const API_VERSION = process.env.SANITY_API_VERSION || "2026-04-25"
const READ_TOKEN = process.env.SANITY_API_READ_TOKEN

const BLOG_DIR = path.join(ROOT, "content/blog")
const PUBLIC_BLOG_DIR = path.join(ROOT, "public/blog")

const args = process.argv.slice(2)
const DRY_RUN = args.includes("--dry-run")
const SINGLE_SLUG = args.find((a) => !a.startsWith("--")) || null

if (!PROJECT_ID || PROJECT_ID === "placeholder") {
  console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID não configurada")
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: READ_TOKEN,
  useCdn: false,
})

if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true })
if (!fs.existsSync(PUBLIC_BLOG_DIR)) fs.mkdirSync(PUBLIC_BLOG_DIR, { recursive: true })

// ─────────────────────────────────────────────────────────────
// Imagem CDN Sanity → arquivo local
// ─────────────────────────────────────────────────────────────

/**
 * Sanity asset _ref formato: image-<assetId>-<dimensions>-<format>
 * URL CDN: https://cdn.sanity.io/images/<projectId>/<dataset>/<assetId>-<dim>.<format>
 */
function assetRefToCdnUrl(ref) {
  if (!ref || typeof ref !== "string") return null
  const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/)
  if (!match) return null
  const [, assetId, dim, format] = match
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${assetId}-${dim}.${format}`
}

async function downloadImage(url, destPath) {
  if (DRY_RUN) {
    console.log(`   [dry] download ${url} → ${path.basename(destPath)}`)
    return true
  }
  try {
    const res = await fetch(url, { headers: { Accept: "image/*" } })
    if (!res.ok) {
      console.warn(`   ⚠️  fetch falhou (${res.status}): ${url}`)
      return false
    }
    const buffer = Buffer.from(await res.arrayBuffer())
    fs.writeFileSync(destPath, buffer)
    return true
  } catch (err) {
    console.warn(`   ⚠️  erro download: ${err.message}`)
    return false
  }
}

// ─────────────────────────────────────────────────────────────
// Portable Text → Markdown / MDX
// ─────────────────────────────────────────────────────────────

function escapeYaml(str) {
  if (!str) return '""'
  // Escapa aspas duplas e quebra linha pra YAML literal seguro
  const escaped = String(str).replace(/"/g, '\\"').replace(/\n/g, " ")
  return `"${escaped}"`
}

function yamlList(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return "[]"
  return `[${arr.map((s) => escapeYaml(s)).join(", ")}]`
}

function yamlObjectInline(obj) {
  if (!obj || typeof obj !== "object") return null
  const lines = []
  for (const [k, v] of Object.entries(obj)) {
    if (v == null) continue
    if (Array.isArray(v)) {
      lines.push(`  ${k}: ${yamlList(v)}`)
    } else if (typeof v === "object") {
      // skip nested complex
    } else {
      lines.push(`  ${k}: ${escapeYaml(v)}`)
    }
  }
  return lines.length > 0 ? lines.join("\n") : null
}

/** Inline marks (strong/em/code/link) → markdown */
function spansToMarkdown(children, markDefs = []) {
  if (!Array.isArray(children)) return ""
  return children
    .map((span) => {
      let text = span.text || ""
      const marks = span.marks || []

      for (const mark of marks) {
        // Decorator simples
        if (mark === "strong") text = `**${text}**`
        else if (mark === "em") text = `*${text}*`
        else if (mark === "code") text = `\`${text}\``
        else if (mark === "underline") text = `<u>${text}</u>`
        else {
          // Annotation (link, etc.) — busca em markDefs por _key
          const def = markDefs.find((d) => d._key === mark)
          if (def?._type === "link" && def.href) {
            text = `[${text}](${def.href})`
          }
        }
      }
      return text
    })
    .join("")
}

/** Bloco texto comum (parágrafo, heading, quote, lista) */
function blockToMarkdown(block) {
  const text = spansToMarkdown(block.children, block.markDefs)
  switch (block.style) {
    case "h2":
      return `## ${text}`
    case "h3":
      return `### ${text}`
    case "h4":
      return `#### ${text}`
    case "blockquote":
      return `> ${text}`
    case "normal":
    default:
      return text
  }
}

/** Lista de blocos consecutivos com listItem agrupados em bullet/number */
function groupListItems(blocks) {
  const result = []
  let current = null

  for (const block of blocks) {
    const isListItem =
      block._type === "block" && (block.listItem === "bullet" || block.listItem === "number")

    if (isListItem) {
      if (!current || current.type !== block.listItem) {
        if (current) result.push(current)
        current = { type: block.listItem, items: [] }
      }
      current.items.push(block)
    } else {
      if (current) {
        result.push(current)
        current = null
      }
      result.push(block)
    }
  }
  if (current) result.push(current)
  return result
}

/** Bloco custom: imagem, table, faqItem, methodologyBox, calloutBox, ctaBox, changelog */
function customBlockToMdx(block, imageRefs) {
  switch (block._type) {
    case "image": {
      const url = assetRefToCdnUrl(block.asset?._ref)
      if (!url) return ""
      const localPath = registerInlineImage(block.asset._ref, imageRefs)
      const alt = block.alt || ""
      const caption = block.caption ? `\n*${block.caption}*` : ""
      return `![${alt}](${localPath})${caption}`
    }

    case "table": {
      // Já vem como markdown raw — só retorna
      return block.rows || ""
    }

    case "faqItem":
      return `<details>\n<summary>**${block.question}**</summary>\n\n${block.answer}\n\n</details>`

    case "methodologyBox": {
      const sources = (block.sources || [])
        .map((s) => `"${s.replace(/"/g, '\\"')}"`)
        .join(", ")
      const props = []
      if (block.period) props.push(`  period="${block.period}"`)
      if (block.sources?.length)
        props.push(`  sources={[${sources}]}`)
      if (block.sample) props.push(`  sample="${block.sample}"`)
      if (block.lastUpdate) props.push(`  lastUpdate="${block.lastUpdate}"`)
      if (block.nextReview) props.push(`  nextReview="${block.nextReview}"`)
      return `<MethodologyBox\n${props.join("\n")}\n/>`
    }

    case "calloutBox": {
      const variant = block.variant && block.variant !== "default" ? ` variant="${block.variant}"` : ""
      const content = (block.content || []).map(blockToMarkdown).join("\n\n")
      return `<CalloutBox${variant}>\n${content}\n</CalloutBox>`
    }

    case "ctaBox": {
      // Escape de aspas em href (links wa.me com texto encoded)
      const escAttr = (s) => (s || "").replace(/"/g, "&quot;")
      return `<CTABox\n  title="${escAttr(block.title)}"\n  description="${escAttr(block.description)}"\n  label="${escAttr(block.label)}"\n  href="${escAttr(block.href)}"\n/>`
    }

    case "changelog": {
      const entries = (block.entries || [])
        .map(
          (e) =>
            `    {\n      date: "${e.date}",\n      change: "${(e.change || "").replace(/"/g, '\\"').replace(/\n/g, " ")}"\n    }`
        )
        .join(",\n")
      return `<Changelog\n  entries={[\n${entries}\n  ]}\n/>`
    }

    default:
      return ""
  }
}

/** Cada imagem inline ganha path local (e baixaremos depois) */
function registerInlineImage(assetRef, imageRefs) {
  const id = assetRef.split("-")[1]
  const ext = assetRef.split("-").pop()
  const localFilename = `inline-${id}.${ext}`
  imageRefs.push({
    assetRef,
    localFilename,
    cdnUrl: assetRefToCdnUrl(assetRef),
  })
  return `/blog/${localFilename}`
}

/** Body completo (array de blocks) → markdown body */
function portableTextToMarkdown(body, imageRefs) {
  if (!Array.isArray(body) || body.length === 0) return ""

  const grouped = groupListItems(body)
  const sections = []

  for (const item of grouped) {
    if (item.type === "bullet" || item.type === "number") {
      // Lista
      const lines = item.items.map((b, idx) => {
        const text = spansToMarkdown(b.children, b.markDefs)
        const prefix = item.type === "bullet" ? "-" : `${idx + 1}.`
        return `${prefix} ${text}`
      })
      sections.push(lines.join("\n"))
    } else if (item._type === "block") {
      sections.push(blockToMarkdown(item))
    } else {
      sections.push(customBlockToMdx(item, imageRefs))
    }
  }

  return sections.filter(Boolean).join("\n\n")
}

// ─────────────────────────────────────────────────────────────
// Frontmatter YAML
// ─────────────────────────────────────────────────────────────

function buildFrontmatter(post, imageLocalPath) {
  const lines = ["---"]
  lines.push(`title: ${escapeYaml(post.title)}`)
  lines.push(`description: ${escapeYaml(post.description)}`)
  if (post.publishedAt)
    lines.push(`date: ${escapeYaml(post.publishedAt.split("T")[0])}`)
  if (post.updatedAt)
    lines.push(`updatedAt: ${escapeYaml(post.updatedAt.split("T")[0])}`)
  lines.push(`author: ${escapeYaml(post.author?.name || "FYMOOB Imobiliária")}`)
  if (post.reviewedBy) lines.push(`reviewedBy: ${escapeYaml(post.reviewedBy)}`)
  if (post.nextReview)
    lines.push(`nextReview: ${escapeYaml(post.nextReview.split("T")[0])}`)
  if (imageLocalPath) lines.push(`image: ${escapeYaml(imageLocalPath)}`)
  if (post.tags?.length) lines.push(`tags: ${yamlList(post.tags)}`)
  if (post.readingTime) lines.push(`readingTime: ${escapeYaml(post.readingTime)}`)
  if (post.schemaType) lines.push(`schema: ${escapeYaml(post.schemaType)}`)

  if (post.methodology) {
    const obj = yamlObjectInline(post.methodology)
    if (obj) {
      lines.push("methodology:")
      lines.push(obj)
    }
  }

  lines.push("---")
  return lines.join("\n")
}

// ─────────────────────────────────────────────────────────────
// Sync 1 post
// ─────────────────────────────────────────────────────────────

async function syncOne(post) {
  const slug = post.slug?.current
  if (!slug) {
    console.error(`   ❌ post sem slug — pulando`)
    return false
  }

  console.log(`\n📥 ${slug}`)
  const imageRefs = []

  // 1. Cover image
  let coverLocalPath = null
  if (post.coverImage?.asset?._ref) {
    const url = assetRefToCdnUrl(post.coverImage.asset._ref)
    if (url) {
      const ext = post.coverImage.asset._ref.split("-").pop()
      const filename = `${slug}.${ext}`
      coverLocalPath = `/blog/${filename}`
      const destPath = path.join(PUBLIC_BLOG_DIR, filename)
      const ok = await downloadImage(url, destPath)
      console.log(`   ${ok ? "✓" : "⚠"} capa: ${filename}`)
    }
  }

  // 2. Body Portable Text → markdown
  const bodyMd = portableTextToMarkdown(post.body || [], imageRefs)

  // 3. Imagens inline (registradas durante conversão)
  for (const ref of imageRefs) {
    if (!ref.cdnUrl) continue
    const destPath = path.join(PUBLIC_BLOG_DIR, ref.localFilename)
    if (fs.existsSync(destPath) && !DRY_RUN) {
      // Já existe — pula download
      continue
    }
    await downloadImage(ref.cdnUrl, destPath)
  }
  if (imageRefs.length > 0) console.log(`   ✓ ${imageRefs.length} imagens inline`)

  // 4. Frontmatter
  const frontmatter = buildFrontmatter(post, coverLocalPath)

  // 5. Arquivo final
  const final = `${frontmatter}\n\n${bodyMd}\n`
  const outPath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (DRY_RUN) {
    console.log(`   ⚪ DRY-RUN — preview ${final.length} chars`)
    return true
  }

  fs.writeFileSync(outPath, final, "utf-8")
  console.log(`   ✅ ${slug}.mdx (${final.length} chars)`)
  return true
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log("🔄 Sync reverso Sanity → MDX")
  console.log("=".repeat(60))
  if (DRY_RUN) console.log("⚪ MODO DRY-RUN\n")

  // Query: todos posts publicados (sem drafts)
  const query = `*[_type == "post" && !(_id in path("drafts.**"))${
    SINGLE_SLUG ? ` && slug.current == "${SINGLE_SLUG}"` : ""
  }] | order(publishedAt desc) {
    _id, title, "slug": slug,
    description, publishedAt, updatedAt,
    reviewedBy, nextReview, schemaType, readingTime,
    "author": author->{ name, role, "slug": slug.current },
    coverImage, tags, body, methodology
  }`

  const posts = await client.fetch(query)
  console.log(`📚 ${posts.length} post(s) pra sincronizar\n`)

  let success = 0
  let failed = 0
  for (const post of posts) {
    try {
      const ok = await syncOne(post)
      if (ok) success++
      else failed++
    } catch (err) {
      console.error(`   ❌ erro: ${err.message}`)
      failed++
    }
  }

  console.log(`\n${"=".repeat(60)}`)
  console.log(`✅ Sucesso: ${success}/${posts.length}`)
  if (failed > 0) console.log(`❌ Falhas: ${failed}/${posts.length}`)

  if (!DRY_RUN && success > 0) {
    console.log(`\n🎯 MDX local sincronizado com Sanity em ${BLOG_DIR}`)
    console.log(`   Imagens em ${PUBLIC_BLOG_DIR}`)
    console.log(`   Em caso de Sanity offline, site cai automaticamente pro MDX.`)
  }
}

main().catch((err) => {
  console.error("❌ Erro fatal:", err)
  process.exit(1)
})
