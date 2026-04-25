#!/usr/bin/env node

/**
 * convert-blog-images-to-webp.mjs
 *
 * Converte todas as imagens JPG de blog (em public/images/blog/) pra WebP
 * otimizado (1200x630 OG-ready, quality 85), salvando em public/blog/.
 *
 * Mapeamento manual JPG → slug do post (nome do arquivo de destino):
 * - bairros-familias.jpg → melhores-bairros-familias-curitiba.webp
 * - batel-vs-agua-verde.jpg → batel-vs-agua-verde-curitiba.webp
 * - checklist-compra.jpg → checklist-compra-imovel.webp
 * - custo-vida-curitiba.jpg → custo-de-vida-curitiba.webp
 * - ecoville-vs-bigorrilho.jpg → ecoville-vs-bigorrilho-curitiba.webp
 * - financiamento-comparativo.jpg → financiamento-comparativo.webp
 * - itbi-curitiba.jpg → itbi-curitiba.webp
 * - mercado-curitiba-2026.jpg → mercado-imobiliario-curitiba-2026.webp
 * - planta-vs-pronto.jpg → imovel-planta-vs-pronto-curitiba.webp
 * - preco-m2-curitiba.jpg → preco-metro-quadrado-curitiba-bairro.webp
 *
 * Uso:
 *   node scripts/convert-blog-images-to-webp.mjs
 *
 * Após rodar:
 * 1. Revisar arquivos gerados em public/blog/
 * 2. Atualizar frontmatter dos posts (image: "/blog/<nome>.webp")
 * 3. (Opcional) deletar JPGs originais em public/images/blog/
 */

import sharp from "sharp"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SOURCE_DIR = path.join(ROOT, "public/images/blog")
const TARGET_DIR = path.join(ROOT, "public/blog")

const MAPPING = {
  "bairros-familias.jpg": "melhores-bairros-familias-curitiba.webp",
  "batel-vs-agua-verde.jpg": "batel-vs-agua-verde-curitiba.webp",
  "checklist-compra.jpg": "checklist-compra-imovel.webp",
  "custo-vida-curitiba.jpg": "custo-de-vida-curitiba.webp",
  "ecoville-vs-bigorrilho.jpg": "ecoville-vs-bigorrilho-curitiba.webp",
  "financiamento-comparativo.jpg": "financiamento-comparativo.webp",
  "itbi-curitiba.jpg": "itbi-curitiba.webp",
  "mercado-curitiba-2026.jpg": "mercado-imobiliario-curitiba-2026.webp",
  "planta-vs-pronto.jpg": "imovel-planta-vs-pronto-curitiba.webp",
  "preco-m2-curitiba.jpg": "preco-metro-quadrado-curitiba-bairro.webp",
}

const TARGET_WIDTH = 1200
const TARGET_HEIGHT = 630
const QUALITY = 85

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true })
}

console.log("📸 Convertendo blog images JPG → WebP")
console.log("=".repeat(60))
console.log(`Source: ${SOURCE_DIR}`)
console.log(`Target: ${TARGET_DIR}`)
console.log(`Output: ${TARGET_WIDTH}x${TARGET_HEIGHT}, quality ${QUALITY}`)
console.log()

const results = []
let totalSavedBytes = 0

for (const [src, dst] of Object.entries(MAPPING)) {
  const srcPath = path.join(SOURCE_DIR, src)
  const dstPath = path.join(TARGET_DIR, dst)

  if (!fs.existsSync(srcPath)) {
    console.log(`  ⚠️  ${src} não encontrado — pulando`)
    results.push({ src, dst, status: "skipped", reason: "source missing" })
    continue
  }

  const srcStat = fs.statSync(srcPath)
  const srcSize = srcStat.size

  try {
    await sharp(srcPath)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: "cover",
        position: "center",
      })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(dstPath)

    const dstStat = fs.statSync(dstPath)
    const dstSize = dstStat.size
    const reduction = (((srcSize - dstSize) / srcSize) * 100).toFixed(1)
    totalSavedBytes += srcSize - dstSize

    console.log(
      `  ✅ ${src.padEnd(35)} → ${dst.padEnd(45)} ` +
        `(${(srcSize / 1024).toFixed(0)}kb → ${(dstSize / 1024).toFixed(0)}kb, -${reduction}%)`
    )
    results.push({ src, dst, status: "ok", srcSize, dstSize, reduction })
  } catch (err) {
    console.error(`  ❌ ${src} falhou: ${err.message}`)
    results.push({ src, dst, status: "error", error: err.message })
  }
}

console.log()
console.log(`Total economia: ${(totalSavedBytes / 1024).toFixed(0)}kb`)
console.log(`Convertidos: ${results.filter((r) => r.status === "ok").length}/${results.length}`)
console.log()
console.log("Próximos passos:")
console.log("  1. Atualizar frontmatter de cada post (image: '/blog/<nome>.webp')")
console.log("  2. Após validar build, deletar JPGs originais em public/images/blog/")
