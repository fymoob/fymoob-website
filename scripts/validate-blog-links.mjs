#!/usr/bin/env node

/**
 * validate-blog-links.mjs
 *
 * CI-grade validador de links internos nos posts do blog FYMOOB.
 *
 * Cross-check de:
 * - /imoveis/[bairro]: bairro existe no CRM com count ≥ 2 (mesma regra do
 *   generateStaticParams em src/app/imoveis/[bairro]/page.tsx)
 * - /blog/[slug]: arquivo .mdx existe em content/blog/
 *
 * Uso local:
 *   node scripts/validate-blog-links.mjs
 *
 * Uso em CI / pre-build:
 *   npm run validate:blog-links
 *
 * Sai com exit 1 se algum link 404 for detectado.
 *
 * Origem: criado após audit que pegou 62 links 404 em 5 posts (25/04/2026).
 * Causa raiz: posts assumiam que toda menção de bairro vira link, mas
 * generateStaticParams filtra por count >= 2 — bairros com 1 imóvel ou
 * inexistentes no CRM viram 404.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const BLOG_DIR = path.join(ROOT, "content/blog")
const SNAPSHOT_DIR = path.join(ROOT, "docs/research/snapshots")

const MIN_BAIRRO_COUNT = 2 // Mesma regra do generateStaticParams

// Slugify idêntica a src/lib/utils.ts
function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function getValidBairroSlugs() {
  if (!fs.existsSync(SNAPSHOT_DIR)) {
    console.error(`❌ Diretório de snapshots não encontrado: ${SNAPSHOT_DIR}`)
    process.exit(1)
  }

  const files = fs
    .readdirSync(SNAPSHOT_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort()

  if (files.length === 0) {
    console.error(`❌ Nenhum snapshot CRM em ${SNAPSHOT_DIR}.`)
    console.error(`   Rodar: node scripts/research/snapshot-crm-daily.mjs`)
    process.exit(1)
  }

  const latest = files[files.length - 1]
  const data = JSON.parse(fs.readFileSync(path.join(SNAPSHOT_DIR, latest), "utf-8"))
  const properties = data.properties || data.imoveis || []

  const counts = new Map()
  for (const item of properties) {
    const bairro = item.bairro || item.Bairro
    if (!bairro) continue
    const slug = slugify(bairro)
    counts.set(slug, (counts.get(slug) || 0) + 1)
  }

  const valid = new Set(
    [...counts.entries()].filter(([, c]) => c >= MIN_BAIRRO_COUNT).map(([slug]) => slug)
  )

  return { valid, all: counts, snapshot: latest }
}

function getValidBlogSlugs() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))
  return new Set(files.map((f) => f.replace(/\.mdx$/, "")))
}

function extractLinks(content) {
  // Captura links MDX inline: [anchor](url) — exclui imagens ![]()
  const linkRegex = /(?<!!)\[([^\]]+)\]\((\/[^)]+)\)/g
  const links = []
  let match
  while ((match = linkRegex.exec(content)) !== null) {
    const lineNumber = content.substring(0, match.index).split("\n").length
    links.push({ anchor: match[1], url: match[2], line: lineNumber })
  }
  return links
}

function main() {
  console.log("📋 FYMOOB Blog Links Validator")
  console.log("=".repeat(50))

  const { valid: validBairros, all: allBairros, snapshot } = getValidBairroSlugs()
  const validBlogs = getValidBlogSlugs()

  console.log(`Snapshot: ${snapshot}`)
  console.log(`Bairros válidos (count ≥ ${MIN_BAIRRO_COUNT}): ${validBairros.size}`)
  console.log(`Bairros com count 1 (thin, NÃO geram página): ${allBairros.size - validBairros.size}`)
  console.log(`Posts blog ativos: ${validBlogs.size}`)
  console.log()

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))
  const broken = []
  let totalLinks = 0

  for (const file of files) {
    const content = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
    const links = extractLinks(content)
    totalLinks += links.length

    for (const { anchor, url, line } of links) {
      const pureUrl = url.split("?")[0].split("#")[0]

      // /imoveis/[bairro]
      const bairroMatch = pureUrl.match(/^\/imoveis\/([a-z0-9-]+)$/)
      if (bairroMatch) {
        const slug = bairroMatch[1]
        if (!validBairros.has(slug)) {
          const inCrm = allBairros.has(slug)
          broken.push({
            file,
            line,
            url: pureUrl,
            anchor,
            type: inCrm ? "BAIRRO_THIN" : "BAIRRO_NOT_IN_CRM",
            crmCount: allBairros.get(slug) || 0,
          })
        }
        continue
      }

      // /blog/[slug]
      const blogMatch = pureUrl.match(/^\/blog\/([a-z0-9-]+)$/)
      if (blogMatch) {
        const slug = blogMatch[1]
        if (!validBlogs.has(slug)) {
          broken.push({
            file,
            line,
            url: pureUrl,
            anchor,
            type: "BLOG_404",
          })
        }
        continue
      }

      // Links pra /imovel/[slug] e /empreendimento/[slug] não são validados
      // (geração dinâmica da API Loft, fora do escopo deste script).
    }
  }

  console.log(`Total de links internos: ${totalLinks}`)
  console.log()

  if (broken.length === 0) {
    console.log("✅ Zero links 404 detectados. Build seguro.")
    return 0
  }

  console.error(`❌ ${broken.length} links quebrados detectados:\n`)

  // Agrupar por arquivo
  const byFile = new Map()
  for (const b of broken) {
    if (!byFile.has(b.file)) byFile.set(b.file, [])
    byFile.get(b.file).push(b)
  }

  for (const [file, items] of byFile) {
    console.error(`  📄 content/blog/${file} (${items.length} quebra${items.length > 1 ? "s" : ""})`)
    for (const { line, url, anchor, type, crmCount } of items) {
      const detail = type === "BAIRRO_THIN" ? ` [count CRM: ${crmCount}]` : ""
      console.error(`    L${line}  ${type}${detail}`)
      console.error(`           [${anchor}](${url})`)
    }
    console.error("")
  }

  console.error("Estratégia C recomendada (ver docs/audit/blog-broken-links-2026-04-25.md):")
  console.error("  - BAIRRO_NOT_IN_CRM → trocar por texto plano (remover link)")
  console.error("  - BAIRRO_THIN       → trocar por /busca?bairro=<Label>")
  console.error("  - BLOG_404          → corrigir slug")
  console.error("")

  return 1
}

const exitCode = main()
process.exit(exitCode)
