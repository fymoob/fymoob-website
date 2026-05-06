// Baixa assets oficiais Avantti pra `public/images/empreendimentos/reserva-barigui/avantti-source/`
// Source: 3 URLs CloudFront extraídas via Playwright em 2026-05-06.
// Filtra: descarta logos sociais, ícones, stock photos, decorações.
// Mantém: renders/amenities/fachadas/plantas/vistas com nome legível.
//
// Uso: node scripts/download-avantti-assets.mjs

import { mkdir, writeFile, stat } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT_DIR = join(ROOT, "public/images/empreendimentos/reserva-barigui/avantti-source")
const CDN = "https://d9hhrg4mnvzow.cloudfront.net/www.grupoavantti.com"

// Lista curada — só assets com valor editorial. Cada entry:
//   [<subdir>, <slug-renomeado>, <path-cdn-relativo>]
// Subdir agrupa por origem: hub | lago | colina
const assets = [
  // ───── HUB (reservabarigui) — vista geral, fachadas, hero amenity
  ["hub", "vista-barigui-1140",                 "reservabarigui/f0f8cd81-vista-barigui_10vo0ei000000000000028.png"],
  ["hub", "panoramica-manha",                   "reservabarigui/55b8c565-panoramica-manha_10le08w0by08w04q00001o.jpg"],
  ["hub", "piscina-hero",                       "reservabarigui/a50937aa-piscina-v7_100000000000000000001o.jpg"],
  ["hub", "lago-fachada-pequena",               "reservabarigui/f5ed92b0-lago-fachada_10gt09g0gt08a00000l01o.jpg"],
  ["hub", "render-externo-lago",                "reservabarigui/7ec59e8f-04-mc-im-067-pe-ex-ac-r03_10ec0820cs08200s00001o.jpg"],
  ["hub", "render-externo-mirante-avenida",     "reservabarigui/7958d0d6-06-mc-im-034-pe-ex-ac-r05-perspectiva-externa-nivel-praca-avenida_10fr08v0d108v01d00001o.jpg"],
  ["hub", "imagem-mirante",                     "reservabarigui/0056bd71-imagem-barigui-mirante_10x30m30e30gm0b105h01o.jpg"],
  ["hub", "lounge-externo",                     "reservabarigui/6ccc2378-04-mc-im-016-pe-ex-ac-r03-lounge-externo_10ga0960c109602400001o.jpg"],
  ["hub", "vista2",                             "reservabarigui/7ea45790-vista2_10lh0900by08w04q00401o.jpg"],
  ["hub", "vista-barigui-png",                  "reservabarigui/1710e2a4-vista-barigui_10mp0ae0by08w0am00d028.png"],
  ["hub", "vista-lago-2-bg",                    "reservabarigui/a3d3576f-vista-lago-2_1000000000000000000028.png"],
  ["hub", "imagem-1104",                        "reservabarigui/2f8db393-imagem-1104_100000000000000000001o.jpg"],
  ["hub", "prancheta-1",                        "reservabarigui/799e8a97-prancheta-1_100000000000000000001o.jpg"],
  ["hub", "colina-e-lago-thumb",                "reservabarigui/e2e52d26-colina-e-lago_100000000000000000001o.jpg"],
  ["hub", "imagem-lago-01",                     "reservabarigui/ea971fd8-imagem-lago-01_10en09s0dc07s01201f01o.jpg"],
  ["hub", "logo-bacoccinni",                    "reservabarigui/a7adbf76-logo-bacocinni_106y03x06y02n00000n028.png"],
  ["hub", "logo-takeda",                        "reservabarigui/dab127da-takeda-design-1_106x03v06x01k000015028.png"],

  // ───── LAGO — amenities (BG alta resolução), renders interior decorados, plantas
  ["lago", "amenity-tikibar",                   "reservalago/bbc71911-05-mc-im-001-pe-in-ac-r01-tikibar_10op0dw0m80dw01800001o.jpg"],
  ["lago", "amenity-rooftop-torre-harmonia",    "reservalago/b45f1319-05-mc-im-012-pe-in-ac-r01-rooftop-torre-harmonia_10op0dw0m80dw01800001o.jpg"],
  ["lago", "amenity-lounge-salao-festas",       "reservalago/d111b416-05-mc-im-003-pe-in-ac-r02-lounge-salao-de-festas_10op0dw0m80dw01800001o.jpg"],
  ["lago", "amenity-perspectiva-externa",       "reservalago/758b859e-05-mc-im-032-pe-ex-ac-r03_10op0dw0m80dw01800001o.jpg"],
  ["lago", "amenity-piscina-interna",           "reservalago/5e576184-05-mc-im-010-pe-in-ac-r00-piscina-interna_10op0dw0m80dw01800001o.jpg"],
  ["lago", "vista-definitiva-bg",               "reservalago/73c0598d-vista-definitiva_100000000000000000001o.jpg"],
  ["lago", "piscina-colina-bg",                 "reservalago/237eba3f-piscina-colina_11hc0zb000000000000028.png"],
  ["lago", "fachada-predio-lago",               "reservalago/10f508c6-foto-predio-lago_10s90e10ky0ac00r000028.png"],
  ["lago", "image-hero-section",                "reservalago/ae7639a2-image-hero-section_109i04y09h04y00000001o.jpg"],
  ["lago", "lago-altopadrao",                   "reservalago/91232ad1-lago-altopadrao_10gb0960c109602500001o.jpg"],
  ["lago", "imagem-mirante-712",                "reservalago/263302eb-imagem-barigui-mirante-1_10ky0dz0js08l00s02801o.jpg"],
  ["lago", "decorado-101",                      "reservalago/10d2f114-05-mc-im-101-ph-in-ap-r03_105z0ac05z08w00000q028.png"],
  ["lago", "decorado-102",                      "reservalago/afd9358b-05-mc-im-102-ph-in-ap-r03_10ft08w06b08w04n000028.png"],
  ["lago", "decorado-103",                      "reservalago/775f8a7e-05-mc-im-103-ph-in-ap-r03_109u08w00000000000001o.jpg"],
  ["lago", "decorado-105",                      "reservalago/c0aa6f16-05-mc-im-105-ph-in-ap-r03_105z0bm05z08w00001d028.png"],
  ["lago", "decorado-105-1",                    "reservalago/df51a011-05-mc-im-105-ph-in-ap-r03-1_105209u05208z00000h028.png"],
  ["lago", "decorado-106",                      "reservalago/180ffd57-05-mc-im-106-ph-in-ap-r03_105z09805z08w000006028.png"],
  ["lago", "decorado-110",                      "reservalago/cff84ebc-05-mc-im-110-ph-in-ap-r03_106x08w00000000000001o.jpg"],
  ["lago", "lago-tipo-2q",                      "reservalago/b9a7f841-lago-tipo-2q_106x08w06r08w003000028.png"],
  ["lago", "logo-tag-lago",                     "reservalago/0a3b9bec-logo-e-tag-lago_107y0ag07y04v000000028.png"],
  ["lago", "planta-36m",                        "reservalago/85f72c91-36m_100000000000000000001o.jpg"],
  ["lago", "planta-48m",                        "reservalago/bc80c972-48m_100000000000000000001o.jpg"],
  ["lago", "planta-58m",                        "reservalago/3cb7af9f-58m_100000000000000000001o.jpg"],
  ["lago", "planta-71m",                        "reservalago/845a7d6e-71m_10000000bb06d00000001o.jpg"],
  ["lago", "planta-95m",                        "reservalago/07ab998e-95m_10000000ba06d00000001o.jpg"],

  // ───── COLINA — amenities (BG), renders Tipo/Cobertura/Garden, plantas, decorados
  ["colina", "amenity-lounge-externo",          "reservacolina/8f063be6-04-mc-im-016-pe-ex-ac-r03-lounge-externo_10op0dw0m80dw01800001o.jpg"],
  ["colina", "amenity-centro-poliesportivo",    "reservacolina/ab4dc67d-04-mc-im-059-pe-ex-ac-r03-centro-poliesportivo_10op0dw0m80dw01800001o.jpg"],
  ["colina", "amenity-gourmet-sports-bar",      "reservacolina/5c023202-04-mc-im-001-pe-in-ac-r03-gourmet-sports-bar_10op0dw0m80dw01800001o.jpg"],
  ["colina", "amenity-pe-in-ac-r03",            "reservacolina/f5411f68-04-mc-im-010-pe-in-ac-r03_10op0dw0m80dw01800001o.jpg"],
  ["colina", "amenity-piscina-interna",         "reservacolina/399f140a-04-mc-im-007-pe-in-ac-r02-piscina-interna_10op0dw0m80dw01800001o.jpg"],
  ["colina", "fachada-predio-colina-heather",   "reservacolina/39a09eab-predio-colina-heather_110b0kf0l90dl0dt00h028.png"],
  ["colina", "tipo-1-1",                        "reservacolina/5b12b98b-tipo-1-1_10gw0890eh089017000028.png"],
  ["colina", "tipo-1-2",                        "reservacolina/5d30c11e-tipo-1-2_10i708w0dn08w02a000028.png"],
  ["colina", "tipo-1-3",                        "reservacolina/7d2b1538-tipo-1-3_10fv07r0dk07r015000028.png"],
  ["colina", "cobertura-1-1",                   "reservacolina/9ab81a74-cobertura-1-1_10i708w0g208w01g000028.png"],
  ["colina", "cobertura-1-2",                   "reservacolina/4d2fa4ad-cobertura-1-2_10go0850fm08500j000028.png"],
  ["colina", "cobertura-2-1",                   "reservacolina/61746db6-cobertura-2-1_10i708w0eb08w021000028.png"],
  ["colina", "cobertura-2-2",                   "reservacolina/4b4b5add-cobertura-2-2_10i708w0ez08w01m000028.png"],
  ["colina", "cobertura-3-1",                   "reservacolina/f7913615-cobertura-3-1_10i708w0ei08w01x000028.png"],
  ["colina", "cobertura-3-2",                   "reservacolina/48cf2c97-cobertura-3-2_10i708w0ez08w01m000028.png"],
  ["colina", "garden-1-1",                      "reservacolina/659051a6-gardens-1-1_10fb07h0ee07h00g000028.png"],
  ["colina", "garden-1-2",                      "reservacolina/6db0bc9f-gardens-1-2_10fb07h0ee07h00g000028.png"],
  ["colina", "garden-2-1",                      "reservacolina/57d7a6ee-gardens-2-1_10ef0710ds06j00i005028.png"],
  ["colina", "garden-2-2",                      "reservacolina/f864ccb1-gardens-2-2_10ef0710b906x01a004028.png"],
  ["colina", "planta-184m",                     "reservacolina/f9e55a17-184m_1000000000000000000028.png"],
  ["colina", "planta-255m",                     "reservacolina/c97efe6e-255_10000000ag06d00e00k028.png"],
  ["colina", "decorado-01",                     "reservacolina/fb5584b0-1_100000000000000000001o.jpg"],
  ["colina", "decorado-02",                     "reservacolina/d37be2b7-2_100000000000000000001o.jpg"],
  ["colina", "decorado-03",                     "reservacolina/fbee5242-3_100000000000000000001o.jpg"],
  ["colina", "decorado-04",                     "reservacolina/58380439-4_100000000000000000001o.jpg"],
  ["colina", "decorado-05",                     "reservacolina/e213295d-5_100000000000000000001o.jpg"],
  ["colina", "decorado-06",                     "reservacolina/db448f19-6_100000000000000000001o.jpg"],
  ["colina", "decorado-07",                     "reservacolina/c2953c60-7_100000000000000000001o.jpg"],
  ["colina", "decorado-08",                     "reservacolina/ed4935e9-8_100000000000000000001o.jpg"],
  ["colina", "decorado-09",                     "reservacolina/93d729ee-9_100000000000000000001o.jpg"],
  ["colina", "decorado-10",                     "reservacolina/38e5d233-10_100000000000000000001o.jpg"],
  ["colina", "logo-reserva-colina-negativo",    "reservacolina/cc7aa15f-reserva-colina-logo-negativo_109o035000000000000028.png"],
  ["colina", "logo-colina-grande",              "reservacolina/a13688ab-logo-colina_108q071000000000000028.png"],
]

async function exists(p) {
  try { await stat(p); return true } catch { return false }
}

async function download(url, dest) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 FYMOOB/asset-sync" } })
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`)
  const buf = Buffer.from(await r.arrayBuffer())
  await writeFile(dest, buf)
  return buf.length
}

async function main() {
  let ok = 0, skipped = 0, failed = 0
  const results = []

  for (const [subdir, slug, path] of assets) {
    const ext = path.endsWith(".png") ? "png" : path.endsWith(".jpeg") ? "jpeg" : "jpg"
    const url = `${CDN}/${path}`
    const dir = join(OUT_DIR, subdir)
    const dest = join(dir, `${slug}.${ext}`)

    await mkdir(dir, { recursive: true })

    if (await exists(dest)) {
      skipped++
      results.push({ slug: `${subdir}/${slug}`, status: "skipped", note: "ja existe" })
      continue
    }

    try {
      const bytes = await download(url, dest)
      ok++
      results.push({ slug: `${subdir}/${slug}`, status: "ok", bytes })
      console.log(`✓ ${subdir}/${slug}.${ext} (${(bytes/1024).toFixed(1)} KB)`)
    } catch (err) {
      failed++
      results.push({ slug: `${subdir}/${slug}`, status: "failed", error: String(err) })
      console.error(`✗ ${subdir}/${slug}: ${err}`)
    }
  }

  console.log(`\n=== RESUMO ===`)
  console.log(`OK: ${ok} · skipped: ${skipped} · failed: ${failed}`)
  if (failed > 0) {
    console.log("\nFalhas:")
    for (const r of results.filter(r => r.status === "failed")) {
      console.log(`  ${r.slug}: ${r.error}`)
    }
  }
}

main().catch(err => {
  console.error("Fatal:", err)
  process.exit(1)
})
