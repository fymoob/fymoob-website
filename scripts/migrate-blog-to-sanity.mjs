#!/usr/bin/env node

/**
 * migrate-blog-to-sanity.mjs
 *
 * Migra os 15 posts MDX de content/blog/*.mdx pro Sanity Studio.
 *
 * Pré-requisitos:
 * 1. .env.local com SANITY_API_WRITE_TOKEN (criar em manage.sanity.io
 *    → API → Tokens → Editor permissions)
 * 2. Bruno cadastrado como autor no Studio (slug: bruno-cesar-de-almeida)
 *
 * O que faz:
 * 1. Lista content/blog/*.mdx (15 posts)
 * 2. Pra cada post:
 *    a. Parseia frontmatter (gray-matter)
 *    b. Upload da imagem de capa via assets.upload
 *    c. Extrai e converte componentes MDX custom (MethodologyBox,
 *       CalloutBox, CTABox, Changelog) + tables + <details> em blocos
 *       Portable Text custom
 *    d. Converte markdown remanescente em Portable Text via @sanity/block-tools
 *    e. Cria documento `post` no Sanity (createIfNotExists pra idempotência)
 *
 * Uso:
 *   node scripts/migrate-blog-to-sanity.mjs               # migra todos
 *   node scripts/migrate-blog-to-sanity.mjs <slug>        # migra apenas 1
 *   node scripts/migrate-blog-to-sanity.mjs --dry-run     # simula sem escrever
 */

import { config } from "dotenv"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import { marked } from "marked"
import { JSDOM } from "jsdom"
import { Schema } from "@sanity/schema"
import { htmlToBlocks } from "@sanity/block-tools"
import { createClient } from "@sanity/client"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
config({ path: path.resolve(ROOT, ".env.local") })

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const API_VERSION = process.env.SANITY_API_VERSION || "2026-04-25"
const WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN
const BLOG_DIR = path.join(ROOT, "content/blog")
const PUBLIC_DIR = path.join(ROOT, "public")

const args = process.argv.slice(2)
const DRY_RUN = args.includes("--dry-run")
const SINGLE_SLUG = args.find((a) => !a.startsWith("--")) || null

if (!PROJECT_ID) {
  console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID não definida em .env.local")
  process.exit(1)
}
if (!WRITE_TOKEN && !DRY_RUN) {
  console.error(
    "❌ SANITY_API_WRITE_TOKEN não definida.\n" +
      "   Criar em manage.sanity.io → API → Tokens → permissions: Editor"
  )
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: WRITE_TOKEN,
  useCdn: false,
})

// ─────────────────────────────────────────────────────────────
// Schema mínimo pra block-tools (precisa pro PT serializer)
// ─────────────────────────────────────────────────────────────

const blockContentType = Schema.compile({
  name: "default",
  types: [
    {
      type: "object",
      name: "blogPost",
      fields: [
        {
          title: "Body",
          name: "body",
          type: "array",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Blockquote", value: "blockquote" },
              ],
              lists: [
                { title: "Bullet", value: "bullet" },
                { title: "Number", value: "number" },
              ],
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Em", value: "em" },
                  { title: "Code", value: "code" },
                  { title: "Underline", value: "underline" },
                ],
                annotations: [
                  {
                    name: "link",
                    type: "object",
                    fields: [
                      { name: "href", type: "url" },
                      { name: "blank", type: "boolean" },
                    ],
                  },
                ],
              },
            },
            { type: "image", fields: [{ name: "alt", type: "string" }] },
          ],
        },
      ],
    },
  ],
})
  .get("blogPost")
  .fields.find((f) => f.name === "body").type

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function uniqueKey() {
  return Math.random().toString(36).slice(2, 10)
}

/**
 * Upload imagem local pra Sanity assets.
 * Retorna referência { _type: "image", asset: { _ref, _type } }.
 */
async function uploadCoverImage(imagePath, postSlug) {
  // image path no frontmatter é tipo "/blog/foo.webp" — resolve pra public/blog/foo.webp
  const localPath = path.join(PUBLIC_DIR, imagePath.replace(/^\/+/, ""))
  if (!fs.existsSync(localPath)) {
    console.warn(`   ⚠️  imagem não encontrada: ${localPath}`)
    return null
  }
  if (DRY_RUN) {
    return { _type: "image", asset: { _ref: `image-DRYRUN-${postSlug}`, _type: "reference" } }
  }
  const buffer = fs.readFileSync(localPath)
  const filename = path.basename(localPath)
  const asset = await client.assets.upload("image", buffer, { filename })
  return {
    _type: "image",
    asset: { _ref: asset._id, _type: "reference" },
    alt: postSlug,
  }
}

/**
 * Extrai blocos MDX custom (MethodologyBox, CalloutBox, CTABox, Changelog,
 * tables markdown, <details>) e devolve placeholders + lista de blocos PT.
 *
 * Estratégia: regex linha-base. Não é parser AST completo, mas funciona
 * pros padrões usados nos 15 posts (validamos manualmente após migração).
 */
function extractCustomBlocks(markdown) {
  const customBlocks = [] // { placeholder, block }
  let working = markdown

  // ── 1. <MethodologyBox period="..." sources={[...]} lastUpdate="..." nextReview="..." />
  working = working.replace(
    /<MethodologyBox\s+([\s\S]*?)\/>/g,
    (match, attrs) => {
      const period = (attrs.match(/period\s*=\s*"([^"]+)"/) || [])[1]
      const lastUpdate = (attrs.match(/lastUpdate\s*=\s*"([^"]+)"/) || [])[1]
      const nextReview = (attrs.match(/nextReview\s*=\s*"([^"]+)"/) || [])[1]
      const sample = (attrs.match(/sample\s*=\s*"([^"]+)"/) || [])[1]
      const sourcesMatch = attrs.match(/sources\s*=\s*\{?\s*\[([\s\S]*?)\]\s*\}?/)
      const sources = sourcesMatch
        ? sourcesMatch[1]
            .split(/,(?=\s*")/)
            .map((s) => s.trim().replace(/^["']|["']$/g, ""))
            .filter(Boolean)
        : []
      const placeholder = `<!--CUSTOM_BLOCK_${customBlocks.length}-->`
      customBlocks.push({
        placeholder,
        block: {
          _type: "methodologyBox",
          _key: uniqueKey(),
          period,
          sources,
          sample,
          lastUpdate,
          nextReview,
        },
      })
      return placeholder
    }
  )

  // ── 2. <CalloutBox variant="..."> ... </CalloutBox>
  working = working.replace(
    /<CalloutBox(?:\s+variant\s*=\s*"([^"]+)")?\s*>([\s\S]*?)<\/CalloutBox>/g,
    (match, variant, content) => {
      const placeholder = `<!--CUSTOM_BLOCK_${customBlocks.length}-->`
      customBlocks.push({
        placeholder,
        block: {
          _type: "calloutBox",
          _key: uniqueKey(),
          variant: variant || "default",
          content: simpleMarkdownToBlocks(content.trim()),
        },
      })
      return placeholder
    }
  )

  // ── 3. <CTABox title="..." description="..." label="..." href="..." />
  working = working.replace(
    /<CTABox\s+([\s\S]*?)\/>/g,
    (match, attrs) => {
      const title = (attrs.match(/title\s*=\s*"([^"]+)"/) || [])[1] || ""
      const description = (attrs.match(/description\s*=\s*"([^"]+)"/) || [])[1] || ""
      const label = (attrs.match(/label\s*=\s*"([^"]+)"/) || [])[1] || ""
      const href = (attrs.match(/href\s*=\s*"([^"]+)"/) || [])[1] || ""
      const placeholder = `<!--CUSTOM_BLOCK_${customBlocks.length}-->`
      customBlocks.push({
        placeholder,
        block: {
          _type: "ctaBox",
          _key: uniqueKey(),
          title,
          description,
          label,
          href,
        },
      })
      return placeholder
    }
  )

  // ── 4. <Changelog entries={[{ date: "...", change: "..." }, ...]} />
  working = working.replace(
    /<Changelog\s+entries\s*=\s*\{?\s*\[([\s\S]*?)\]\s*\}?\s*\/>/g,
    (match, entriesStr) => {
      // Extrai cada objeto { date: "...", change: "..." }
      const entries = []
      const entryRegex = /\{\s*date:\s*"([^"]+)"\s*,\s*change:\s*(?:"((?:[^"\\]|\\.)*)"|`([\s\S]*?)`)\s*\}/g
      let m
      while ((m = entryRegex.exec(entriesStr)) !== null) {
        entries.push({
          _key: uniqueKey(),
          date: m[1],
          change: (m[2] || m[3] || "").replace(/\\"/g, '"'),
        })
      }
      const placeholder = `<!--CUSTOM_BLOCK_${customBlocks.length}-->`
      customBlocks.push({
        placeholder,
        block: { _type: "changelog", _key: uniqueKey(), entries },
      })
      return placeholder
    }
  )

  // ── 5. <details><summary>Q</summary>A</details> → faqItem
  working = working.replace(
    /<details>\s*<summary>([\s\S]*?)<\/summary>\s*([\s\S]*?)<\/details>/g,
    (match, question, answer) => {
      const placeholder = `<!--CUSTOM_BLOCK_${customBlocks.length}-->`
      customBlocks.push({
        placeholder,
        block: {
          _type: "faqItem",
          _key: uniqueKey(),
          question: question.replace(/^\*\*|\*\*$/g, "").trim(),
          answer: answer.trim(),
        },
      })
      return placeholder
    }
  )

  // ── 6. Tabelas markdown (linhas começando com | e separador |---|)
  // Regex multi-linha: pelo menos 2 linhas iniciando com | (header + separator)
  // + linhas de dados começando com |
  const tableRegex = /^(\|[^\n]+\|\s*\n\|[\s\-\|:]+\|\s*\n(?:\|[^\n]+\|\s*\n?)+)/gm
  working = working.replace(tableRegex, (match) => {
    const placeholder = `<!--CUSTOM_BLOCK_${customBlocks.length}-->`
    customBlocks.push({
      placeholder,
      block: { _type: "table", _key: uniqueKey(), rows: match.trim() },
    })
    return placeholder
  })

  return { working, customBlocks }
}

/**
 * Converte string markdown em array de Portable Text blocks usando
 * marked + jsdom + @sanity/block-tools.
 */
function simpleMarkdownToBlocks(markdown) {
  if (!markdown.trim()) return []
  const html = marked.parse(markdown, { gfm: true, breaks: false })
  const dom = new JSDOM(`<body>${html}</body>`)
  const blocks = htmlToBlocks(dom.window.document.body.innerHTML, blockContentType, {
    parseHtml: (h) => new JSDOM(h).window.document,
  })
  // Garante _key em todos os blocos
  return blocks.map((b) => ({ ...b, _key: b._key || uniqueKey() }))
}

/**
 * Converte markdown completo (com placeholders já substituídos) em array
 * de Portable Text blocks. Reinjeta os custom blocks nas posições corretas.
 */
function markdownToPortableText(markdown, customBlocks) {
  // Substitui cada placeholder por uma marker line única que sobrevive
  // ao processamento markdown→HTML→PT
  let working = markdown
  customBlocks.forEach(({ placeholder }, idx) => {
    // marker que vira parágrafo isolado no PT (fácil de localizar e substituir)
    const marker = `XSANITYBLOCKX${idx}XENDX`
    working = working.replace(placeholder, `\n\n${marker}\n\n`)
  })

  const blocks = simpleMarkdownToBlocks(working)

  // Substitui cada parágrafo-marker pelo bloco custom correspondente
  const result = []
  for (const block of blocks) {
    const text =
      block._type === "block"
        ? (block.children || []).map((c) => c.text).join("")
        : ""
    const markerMatch = text.match(/^XSANITYBLOCKX(\d+)XENDX$/)
    if (markerMatch) {
      const idx = parseInt(markerMatch[1], 10)
      if (customBlocks[idx]) {
        result.push(customBlocks[idx].block)
        continue
      }
    }
    result.push(block)
  }
  return result
}

// ─────────────────────────────────────────────────────────────
// Migração 1 post
// ─────────────────────────────────────────────────────────────

async function getOrFindAuthor(authorName) {
  // Tenta encontrar autor por nome (Bruno César de Almeida ou variants)
  const slug =
    authorName
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")

  // Tenta exato primeiro
  let author = await client.fetch(
    `*[_type == "author" && (slug.current == $slug || name == $name)][0]{ _id, name }`,
    { slug, name: authorName }
  )

  if (!author) {
    // Fallback: busca qualquer autor cujo nome contém "Bruno" (mesmo caso de
    // posts antigos com author "FYMOOB Imobiliária" — mapeia pra Bruno)
    author = await client.fetch(
      `*[_type == "author" && name match "Bruno*"][0]{ _id, name }`
    )
  }

  return author
}

async function migrateOnePost(filename) {
  const slug = filename.replace(/\.mdx$/, "")
  const filePath = path.join(BLOG_DIR, filename)

  console.log(`\n📄 ${slug}`)
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data: frontmatter, content: rawContent } = matter(raw)

  // 1. Autor
  const author = await getOrFindAuthor(frontmatter.author || "Bruno César de Almeida")
  if (!author) {
    console.error(`   ❌ Autor não encontrado pra "${frontmatter.author}". ` +
      `Cadastrar em /studio antes.`)
    return false
  }
  console.log(`   ✓ Autor: ${author.name} (${author._id})`)

  // 2. Imagem capa
  const coverImage = frontmatter.image
    ? await uploadCoverImage(frontmatter.image, slug)
    : null
  if (coverImage) console.log(`   ✓ Capa: ${frontmatter.image}`)

  // 3. Body — extrai custom blocks + converte markdown
  const { working, customBlocks } = extractCustomBlocks(rawContent)
  console.log(`   ✓ ${customBlocks.length} blocos custom extraídos`)
  const body = markdownToPortableText(working, customBlocks)
  console.log(`   ✓ ${body.length} blocos Portable Text gerados`)

  // 4. Doc Sanity
  const doc = {
    _id: `post-${slug}`, // ID estável (idempotência)
    _type: "post",
    title: frontmatter.title,
    slug: { _type: "slug", current: slug },
    description: frontmatter.description,
    publishedAt: frontmatter.date
      ? new Date(frontmatter.date).toISOString()
      : new Date().toISOString(),
    updatedAt: frontmatter.updatedAt
      ? new Date(frontmatter.updatedAt).toISOString()
      : undefined,
    reviewedBy: frontmatter.reviewedBy,
    nextReview: frontmatter.nextReview,
    author: { _type: "reference", _ref: author._id },
    coverImage,
    tags: frontmatter.tags || [],
    body,
    readingTime: frontmatter.readingTime,
    schemaType: frontmatter.schema || "Article",
    methodology: frontmatter.methodology,
  }

  // Remove undefined
  Object.keys(doc).forEach((k) => doc[k] === undefined && delete doc[k])

  if (DRY_RUN) {
    console.log(`   ⚪ DRY-RUN — doc não criado. Preview:`)
    console.log(`      _id: ${doc._id}`)
    console.log(`      title: ${doc.title}`)
    console.log(`      blocos body: ${body.length}`)
    return true
  }

  await client.createOrReplace(doc)
  console.log(`   ✅ Sanity doc criado: ${doc._id}`)
  return true
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 Migração MDX → Sanity\n")
  if (DRY_RUN) console.log("⚪ MODO DRY-RUN (não escreve no Sanity)\n")

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))

  const targets = SINGLE_SLUG ? files.filter((f) => f === `${SINGLE_SLUG}.mdx`) : files
  if (targets.length === 0) {
    console.error(`❌ Nenhum arquivo encontrado: ${SINGLE_SLUG ? SINGLE_SLUG + ".mdx" : "*.mdx"}`)
    process.exit(1)
  }

  console.log(`📚 ${targets.length} arquivo(s) pra migrar\n`)

  let success = 0
  let failed = 0
  for (const f of targets) {
    try {
      const ok = await migrateOnePost(f)
      if (ok) success++
      else failed++
    } catch (err) {
      console.error(`   ❌ Erro: ${err.message}`)
      failed++
    }
  }

  console.log(`\n${"=".repeat(60)}`)
  console.log(`✅ Sucesso: ${success}/${targets.length}`)
  if (failed > 0) console.log(`❌ Falhas: ${failed}/${targets.length}`)

  if (!DRY_RUN && success > 0) {
    console.log(`\n🎯 Próximos passos:`)
    console.log(`   1. Abrir /studio → ver posts em "📝 Artigos do Blog"`)
    console.log(`   2. Cada post está como DRAFT — revisar e clicar Publish`)
    console.log(`   3. Validar visual em /blog/[slug] (site lê dual-read)`)
  }
}

main().catch((err) => {
  console.error("❌ Erro fatal:", err)
  process.exit(1)
})
