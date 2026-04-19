#!/usr/bin/env node
/**
 * Gera variantes PNG do favicon a partir do SVG mestre em src/app/icon.svg.
 * Rodar apos editar icon.svg pra propagar pros formatos necessarios:
 *
 *   - src/app/icon.png         512x512  (Next.js auto-serve como favicon.png)
 *   - src/app/apple-icon.png   180x180  (iOS home screen)
 *
 * Next.js 15+ le automaticamente esses arquivos em src/app/ e gera as tags
 * <link rel="icon"> corretas no <head>. Nao precisa mexer em layout.tsx.
 *
 * Requisitos: sharp (ja instalado como dependencia)
 * Uso: node scripts/generate-favicons.mjs
 */
import sharp from "sharp"
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
