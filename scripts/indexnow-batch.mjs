// Sprint B.W batch (03/05/2026) — Dispara IndexNow ping pra TODAS as URLs do
// sitemap pos-deploy. Notifica Bing/Yandex em massa que o site mudou.
// Google ignora (so usa crawl normal), mas Bing leva a serio (~70% market
// share conjunto Bing+Yandex no LATAM).
//
// Uso:
//   node scripts/indexnow-batch.mjs                 # dispara real (todas URLs)
//   INDEXNOW_DRY=1 node scripts/indexnow-batch.mjs  # dry-run (so imprime)
//   node scripts/indexnow-batch.mjs --source=prod   # le sitemap de prod (default)
//   node scripts/indexnow-batch.mjs --source=local  # le sitemap do .next local
//
// Pre-requisito: arquivo public/<key>.txt deve estar em prod com a chave
// abaixo. Ja esta versionado em public/d7ce36f0...txt.
//
// Idempotente — Bing aceita pings repetidos sem penalidade.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com.br"
const INDEXNOW_KEY =
  "d7ce36f0730ca0d491f787e07907b113b89651d7f297a09a2bec64e2cd09e43f"
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
const BATCH_SIZE = 500 // Bing aceita ate 10k por POST; 500 e batch confortavel

const args = process.argv.slice(2)
const sourceArg = args.find((a) => a.startsWith("--source="))?.split("=")[1] || "prod"
const dryRun = process.env.INDEXNOW_DRY === "1"

async function readSitemapFromProd() {
  const shards = [0, 1, 2, 3]
  const allUrls = new Set()
  for (const id of shards) {
    const url = `${SITE_URL}/sitemap/${id}.xml`
    const r = await fetch(url)
    if (!r.ok) {
      console.error(`✗ Falha ao buscar ${url}: HTTP ${r.status}`)
      continue
    }
    const xml = await r.text()
    const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    for (const m of matches) allUrls.add(m[1])
  }
  return Array.from(allUrls)
}

async function readSitemapFromLocal() {
  const fs = await import("node:fs/promises")
  const path = await import("node:path")
  const allUrls = new Set()
  const shards = [0, 1, 2, 3]
  for (const id of shards) {
    const file = path.join(".next/server/app/sitemap", `${id}.xml.body`)
    try {
      const xml = await fs.readFile(file, "utf-8")
      const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      for (const m of matches) allUrls.add(m[1])
    } catch (err) {
      console.error(`✗ Falha lendo ${file}: ${err.message}`)
    }
  }
  return Array.from(allUrls)
}

async function pingBatch(urls) {
  const host = new URL(SITE_URL).host
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  })
  return { status: res.status, ok: res.ok }
}

console.log(`\n=== IndexNow batch ping ===`)
console.log(`Source: ${sourceArg}`)
console.log(`Site:   ${SITE_URL}`)
console.log(`Dry-run: ${dryRun}\n`)

const urls =
  sourceArg === "local" ? await readSitemapFromLocal() : await readSitemapFromProd()

if (urls.length === 0) {
  console.error("Nenhuma URL encontrada. Aborto.")
  process.exit(1)
}

console.log(`✓ ${urls.length} URLs encontradas no sitemap`)
console.log(`✓ Quebrando em ${Math.ceil(urls.length / BATCH_SIZE)} batches de ate ${BATCH_SIZE} URLs\n`)

// Sample primeiras/ultimas 5 pra inspecao
console.log("Sample URLs (primeiras 5):")
urls.slice(0, 5).forEach((u) => console.log(`  - ${u}`))
console.log("Sample URLs (ultimas 5):")
urls.slice(-5).forEach((u) => console.log(`  - ${u}`))

if (dryRun) {
  console.log("\n[DRY-RUN] Nao envia ping. Re-rode sem INDEXNOW_DRY=1 pra disparar real.")
  process.exit(0)
}

console.log("\nDisparando pings...")
let totalOk = 0
let totalFail = 0
for (let i = 0; i < urls.length; i += BATCH_SIZE) {
  const batch = urls.slice(i, i + BATCH_SIZE)
  const batchNum = Math.floor(i / BATCH_SIZE) + 1
  const totalBatches = Math.ceil(urls.length / BATCH_SIZE)
  process.stdout.write(`  Batch ${batchNum}/${totalBatches} (${batch.length} URLs)... `)
  const result = await pingBatch(batch)
  if (result.ok || result.status === 202) {
    console.log(`✓ HTTP ${result.status}`)
    totalOk += batch.length
  } else {
    console.log(`✗ HTTP ${result.status}`)
    totalFail += batch.length
    if (result.status === 422) {
      console.error("    HTTP 422: chave nao bate com /<key>.txt em prod. Verificar.")
    } else if (result.status === 429) {
      console.error("    HTTP 429: rate-limit. Aguarde alguns minutos.")
      break
    }
  }
  // Pequena pausa entre batches pra nao agitar o IndexNow
  if (i + BATCH_SIZE < urls.length) await new Promise((r) => setTimeout(r, 1000))
}

console.log(`\n=== Resultado ===`)
console.log(`✓ Aceitas: ${totalOk}`)
console.log(`✗ Falharam: ${totalFail}`)
if (totalOk > 0) {
  console.log(`\nBing/Yandex farao crawl das URLs nas proximas horas/dias.`)
}
