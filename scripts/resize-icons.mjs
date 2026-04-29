/**
 * Gera versões otimizadas dos ícones a partir de public/ico.png.
 *
 * Pré-requisito: public/ico.png já com fundo transparente (RGBA, 4 channels).
 *
 * Pipeline:
 *   1. Resize com `fit: contain` preservando alpha (background transparente)
 *   2. PNG otimizado: quality 90 + compressionLevel 9
 *
 * Roda sob demanda quando ico.png for atualizado.
 */
import sharp from 'sharp'
import { unlinkSync, existsSync } from 'fs'

const SRC = 'c:/Users/Vine/fymoob/public/ico.png'

const tasks = [
  { dest: 'c:/Users/Vine/fymoob/src/app/icon.png', size: 512 },
  { dest: 'c:/Users/Vine/fymoob/src/app/apple-icon.png', size: 180 },
  { dest: 'c:/Users/Vine/fymoob/public/apple-touch-icon.png', size: 180 },
  { dest: 'c:/Users/Vine/fymoob/public/icon-512.png', size: 512 },
  { dest: 'c:/Users/Vine/fymoob/public/icon-192.png', size: 192 },
  { dest: 'c:/Users/Vine/fymoob/public/favicon-32.png', size: 32 },
  { dest: 'c:/Users/Vine/fymoob/public/favicon-16.png', size: 16 },
]

for (const { dest, size } of tasks) {
  await sharp(SRC)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(dest)
  console.log(`✓ ${dest} (${size}x${size})`)
}

// favicon.ico - 48x48 PNG transparente renomeado (browsers + Google aceitam)
await sharp(SRC)
  .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('c:/Users/Vine/fymoob/public/favicon.ico')
console.log('✓ public/favicon.ico (48x48)')

// Cleanup — apaga app/favicon.ico e app/icon.svg se ainda existirem
const appFavicon = 'c:/Users/Vine/fymoob/src/app/favicon.ico'
if (existsSync(appFavicon)) {
  unlinkSync(appFavicon)
  console.log('✗ Removido: src/app/favicon.ico (servimos via public/ agora)')
}
const appIconSvg = 'c:/Users/Vine/fymoob/src/app/icon.svg'
if (existsSync(appIconSvg)) {
  unlinkSync(appIconSvg)
  console.log('✗ Removido: src/app/icon.svg')
}

// Apaga preview e script auxiliar (limpeza pós-trabalho)
const transparentPreview = 'c:/Users/Vine/fymoob/public/ico-transparent.png'
if (existsSync(transparentPreview)) {
  unlinkSync(transparentPreview)
  console.log('✗ Removido: public/ico-transparent.png (preview)')
}
const transparentizeScript = 'c:/Users/Vine/fymoob/scripts/transparentize-icon.mjs'
if (existsSync(transparentizeScript)) {
  unlinkSync(transparentizeScript)
  console.log('✗ Removido: scripts/transparentize-icon.mjs (auxiliar)')
}

console.log('\n✅ Done')
