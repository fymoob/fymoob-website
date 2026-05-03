#!/usr/bin/env node
/**
 * Gera os 6 favicons definitivos do FYMOOB em public/.
 *
 * Estratégia atual (validada 03/05/2026): usar /public com URLs estáveis
 * (sem hash do Next.js) porque Google exige URL estável pro favicon
 * crawler. Layout.tsx aponta pra /public/ direto.
 *
 * Aprovação visual: scale 70% (validado em 03/05/2026).
 *
 * Características do desenho:
 *   - Fundo azul sólido #29ABE2 (preenche os 4 cantos, sem transparência)
 *   - "fy" branco bold ocupando 70% da altura
 *   - Centralizado (x=50%, y=46% — compensa descender do "y")
 *   - Sem cantos arredondados — Google faz crop circular sozinho
 *
 * Uso: node scripts/generate-favicons.mjs
 */
import sharp from "sharp"
import pngToIco from "png-to-ico"
import { writeFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

const SCALE = 0.70

const svg = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="#29ABE2"/>
  <text x="50%" y="46%"
    font-family="Poppins, Satoshi, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    font-weight="900"
    font-size="${size * SCALE}"
    fill="white"
    text-anchor="middle"
    dominant-baseline="central"
    style="letter-spacing: -0.04em;">fy</text>
</svg>`

// PNGs em public/
const pngTargets = [
  { path: "public/favicon-16.png", size: 16 },
  { path: "public/favicon-32.png", size: 32 },
  { path: "public/icon-192.png", size: 192 },
  { path: "public/icon-512.png", size: 512 },
  { path: "public/apple-touch-icon.png", size: 180 },
]

for (const { path, size } of pngTargets) {
  const outPath = resolve(ROOT, path)
  const buf = await sharp(Buffer.from(svg(size)))
    .png({ compressionLevel: 9 })
    .toBuffer()
  writeFileSync(outPath, buf)
  console.log(`✓ ${path} (${size}×${size})`)
}

// favicon.ico multi-size (16/32/48) usando png-to-ico
const icoSizes = [16, 32, 48]
const icoBuffers = await Promise.all(
  icoSizes.map((size) =>
    sharp(Buffer.from(svg(size))).png().toBuffer()
  )
)
const icoBuffer = await pngToIco(icoBuffers)
writeFileSync(resolve(ROOT, "public/favicon.ico"), icoBuffer)
console.log(`✓ public/favicon.ico (multi-size: ${icoSizes.join("/")})`)

console.log(`\n✓ ${pngTargets.length + 1} favicons gerados a ${SCALE * 100}%.`)
