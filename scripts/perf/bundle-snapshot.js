#!/usr/bin/env node
/**
 * Bundle snapshot — extrai sizes do .next/build-manifest.json
 *
 * Requer: `npm run build` previo (le artifacts em .next/).
 * Gera: docs/perf/bundle-snapshots/YYYY-MM-DD-HHMMSS.json
 */

const fs = require("fs")
const path = require("path")

function fileSizeKB(filePath) {
  try {
    return fs.statSync(filePath).size / 1024
  } catch {
    return 0
  }
}

function main() {
  const nextDir = path.resolve(".next")
  const manifestPath = path.join(nextDir, "build-manifest.json")

  if (!fs.existsSync(manifestPath)) {
    console.error("❌ .next/build-manifest.json nao existe. Rode `npm run build` primeiro.")
    process.exit(1)
  }

  const bm = JSON.parse(fs.readFileSync(manifestPath, "utf8"))

  // 1. Shared root chunks (entram em toda rota)
  const sharedChunks = []
  let sharedTotal = 0
  for (const f of bm.rootMainFiles || []) {
    const size = fileSizeKB(path.join(nextDir, f))
    sharedChunks.push({ file: f, size_kb: Number(size.toFixed(1)) })
    sharedTotal += size
  }

  // 2. Polyfill (browsers legados — nomodule)
  const polyfillChunks = []
  let polyfillTotal = 0
  for (const f of bm.polyfillFiles || []) {
    const size = fileSizeKB(path.join(nextDir, f))
    polyfillChunks.push({ file: f, size_kb: Number(size.toFixed(1)) })
    polyfillTotal += size
  }

  // 3. Per-route chunks (extraidos do page_client-reference-manifest.js de cada rota)
  const appDir = path.join(nextDir, "server", "app")
  const routes = {}

  function walkAppDir(dir, routePath = "") {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walkAppDir(full, routePath + "/" + entry.name)
      } else if (entry.name === "page_client-reference-manifest.js") {
        const m = fs.readFileSync(full, "utf8")
        const chunks = new Set()
        const re = /static\/chunks\/([a-f0-9]+\.js)/g
        let match
        while ((match = re.exec(m)) !== null) chunks.add(match[1])
        let total = 0
        const chunkList = []
        for (const c of chunks) {
          const size = fileSizeKB(path.join(nextDir, "static", "chunks", c))
          chunkList.push({ file: c, size_kb: Number(size.toFixed(1)) })
          total += size
        }
        chunkList.sort((a, b) => b.size_kb - a.size_kb)
        routes[routePath || "/"] = {
          chunks: chunkList.length,
          total_kb: Number(total.toFixed(1)),
          top5: chunkList.slice(0, 5),
        }
      }
    }
  }
  walkAppDir(appDir)

  // 4. Aggregate total per route
  const routeSummary = {}
  for (const [route, data] of Object.entries(routes)) {
    routeSummary[route] = {
      first_load_js_kb: Number((sharedTotal + polyfillTotal + data.total_kb).toFixed(1)),
      route_specific_kb: data.total_kb,
      chunks: data.chunks,
      top5: data.top5,
    }
  }

  const doc = {
    meta: {
      date: new Date().toISOString(),
      next_version: require(path.resolve("package.json")).dependencies?.next ?? "unknown",
    },
    shared: {
      total_kb: Number(sharedTotal.toFixed(1)),
      chunks: sharedChunks,
    },
    polyfill: {
      total_kb: Number(polyfillTotal.toFixed(1)),
      note: "Served as <script nomodule> — NOT loaded by modern browsers",
      chunks: polyfillChunks,
    },
    routes: routeSummary,
  }

  // Persistir
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)
  const outDir = path.resolve("docs/perf/bundle-snapshots")
  fs.mkdirSync(outDir, { recursive: true })
  const outFile = path.join(outDir, `${timestamp}.json`)
  fs.writeFileSync(outFile, JSON.stringify(doc, null, 2))

  // Print summary
  console.log("\n📦 Bundle Snapshot")
  console.log(`\nShared (rootMainFiles)   : ${sharedTotal.toFixed(1)} KB  (${sharedChunks.length} chunks)`)
  console.log(`Polyfill (nomodule)      : ${polyfillTotal.toFixed(1)} KB  (${polyfillChunks.length} chunks)`)
  console.log(`\nPor rota (top ordenadas por first-load JS):`)

  const sortedRoutes = Object.entries(routeSummary).sort((a, b) => b[1].first_load_js_kb - a[1].first_load_js_kb)
  console.log("Route" + " ".repeat(45) + "| First Load | Route-specific")
  console.log("-".repeat(50) + "|" + "-".repeat(11) + "|" + "-".repeat(16))
  for (const [route, data] of sortedRoutes.slice(0, 15)) {
    const r = route.length > 48 ? route.slice(0, 45) + "..." : route.padEnd(48)
    console.log(`${r}  | ${data.first_load_js_kb.toFixed(1).padStart(7)} KB | ${data.route_specific_kb.toFixed(1).padStart(9)} KB`)
  }

  console.log(`\n✅ Saved: ${outFile}`)
}

main()
