#!/usr/bin/env node
/**
 * Gera variantes do favicon a partir do SVG mestre em src/app/icon.svg:
 *
 *   - src/app/icon.png         512x512  (Next.js auto-serve como /icon.png)
 *   - src/app/apple-icon.png   180x180  (iOS home screen)
 *   - src/app/favicon.ico      multi-size (16/32/48) — Google SERP prioriza
 *
 * Next.js 15+ le automaticamente esses arquivos em src/app/ e gera as tags
 * <link rel="icon"> corretas no <head>. Nao precisa mexer em layout.tsx.
 *
 * Uso: node scripts/generate-favicons.mjs
 */
import sharp from "sharp"
import pngToIco from "png-to-ico"
import { readFileSync, writeFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

const SVG_SRC = resolve(ROOT, "src/app/icon.svg")
const OUTPUTS = [
  { path: "src/app/icon.png", size: 512 },
  { path: "src/app/apple-icon.png", size: 180 },
]

const svgBuffer = readFileSync(SVG_SRC)

for (const { path, size } of OUTPUTS) {
  const outPath = resolve(ROOT, path)
  await sharp(svgBuffer, { density: 600 })
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9, quality: 100 })
    .toBuffer()
    .then((buf) => writeFileSync(outPath, buf))
  console.log(`wrote ${path} (${size}x${size})`)
}

const icoSizes = [16, 32, 48]
const icoBuffers = await Promise.all(
  icoSizes.map((size) =>
    sharp(svgBuffer, { density: 600 })
      .resize(size, size, { fit: "contain" })
      .png()
      .toBuffer()
  )
)
const icoBuffer = await pngToIco(icoBuffers)
writeFileSync(resolve(ROOT, "src/app/favicon.ico"), icoBuffer)
console.log(`wrote src/app/favicon.ico (${icoSizes.join("/")})`)
