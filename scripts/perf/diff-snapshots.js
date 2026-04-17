#!/usr/bin/env node
/**
 * Diff snapshots — compara 2 bundle snapshots (ou 2 lighthouse baselines).
 *
 * Auto-detecta os 2 arquivos mais recentes em docs/perf/bundle-snapshots/
 * se nao passar args. Pra comparar especificos:
 *   node scripts/perf/diff-snapshots.js <before.json> <after.json>
 */

const fs = require("fs")
const path = require("path")

function latestTwoIn(dir) {
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .map(f => ({ name: f, path: path.join(dir, f), mtime: fs.statSync(path.join(dir, f)).mtime }))
    .sort((a, b) => b.mtime - a.mtime)
  return files.slice(0, 2).map(f => f.path)
}

function fmtDelta(before, after, unit = "KB") {
  const delta = after - before
  const pct = before > 0 ? ((delta / before) * 100).toFixed(1) : "N/A"
  const sign = delta > 0 ? "+" : ""
  const arrow = delta > 0 ? "📈" : delta < 0 ? "📉" : "➖"
  return `${arrow} ${sign}${delta.toFixed(1)} ${unit} (${sign}${pct}%)`
}

function diffBundles(beforePath, afterPath) {
  const before = JSON.parse(fs.readFileSync(beforePath, "utf8"))
  const after = JSON.parse(fs.readFileSync(afterPath, "utf8"))

  console.log("\n📊 Bundle Diff")
  console.log(`Before: ${path.basename(beforePath)} (${before.meta.date})`)
  console.log(`After : ${path.basename(afterPath)} (${after.meta.date})`)

  console.log("\n--- Shared chunks ---")
  console.log(`Before: ${before.shared.total_kb} KB`)
  console.log(`After : ${after.shared.total_kb} KB`)
  console.log(`Delta : ${fmtDelta(before.shared.total_kb, after.shared.total_kb)}`)

  console.log("\n--- Polyfill ---")
  console.log(`Before: ${before.polyfill.total_kb} KB`)
  console.log(`After : ${after.polyfill.total_kb} KB`)
  console.log(`Delta : ${fmtDelta(before.polyfill.total_kb, after.polyfill.total_kb)}`)

  console.log("\n--- Por rota (mudancas notaveis) ---")
  const routes = new Set([...Object.keys(before.routes || {}), ...Object.keys(after.routes || {})])
  const diffs = []
  for (const route of routes) {
    const b = before.routes?.[route]?.first_load_js_kb ?? 0
    const a = after.routes?.[route]?.first_load_js_kb ?? 0
    const delta = a - b
    if (Math.abs(delta) >= 0.5) diffs.push({ route, before: b, after: a, delta })
  }
  diffs.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))

  for (const { route, before: b, after: a, delta } of diffs.slice(0, 15)) {
    const r = route.length > 45 ? route.slice(0, 42) + "..." : route.padEnd(45)
    const sign = delta > 0 ? "+" : ""
    console.log(`  ${r} | ${b.toFixed(1).padStart(6)} → ${a.toFixed(1).padStart(6)} KB | ${sign}${delta.toFixed(1)} KB`)
  }
  if (diffs.length === 0) {
    console.log("  (nenhuma mudanca >= 0.5 KB)")
  }
}

function diffLighthouse(beforePath, afterPath) {
  const before = JSON.parse(fs.readFileSync(beforePath, "utf8"))
  const after = JSON.parse(fs.readFileSync(afterPath, "utf8"))

  console.log("\n⚡ Lighthouse Diff")
  console.log(`Before: ${path.basename(beforePath)} (${before.meta.date}, url=${before.meta.url})`)
  console.log(`After : ${path.basename(afterPath)} (${after.meta.date}, url=${after.meta.url})`)

  const keys = ["score", "lcp_ms", "tbt_ms", "cls", "fcp_ms", "si_ms"]
  console.log("\nMetric     | Before | After  | Delta        | Reliability")
  console.log("-".repeat(72))
  for (const k of keys) {
    const b = before.summary?.[k]?.median
    const a = after.summary?.[k]?.median
    if (b === undefined || a === undefined) continue
    const bCov = before.summary[k].cov_pct
    const aCov = after.summary[k].cov_pct
    const delta = a - b
    const fmtB = k === "cls" ? b.toFixed(3) : b.toFixed(0)
    const fmtA = k === "cls" ? a.toFixed(3) : a.toFixed(0)
    const fmtD = k === "cls" ? delta.toFixed(3) : delta.toFixed(0)
    const unit = k === "score" || k === "cls" ? "" : "ms"
    const sign = delta > 0 ? "+" : ""
    // Delta significance: > 2x max CoV rule (STATISTICAL-RIGOR)
    const maxCov = Math.max(bCov, aCov)
    const threshold = 2 * (maxCov / 100) * b
    const significant = Math.abs(delta) > threshold
    const marker = significant ? "🟢 SIGNIF" : "🟡 within noise"
    console.log(`${k.padEnd(10)} | ${fmtB.padStart(6)} | ${fmtA.padStart(6)} | ${sign}${fmtD}${unit.padEnd(2)} (CoV ${aCov.toFixed(1)}%) | ${marker}`)
  }
}

function main() {
  const args = process.argv.slice(2)
  let beforePath, afterPath

  if (args.length === 2) {
    beforePath = args[0]
    afterPath = args[1]
  } else {
    // Auto: detecta bundle ou lighthouse baseado em pasta
    const bundleDir = path.resolve("docs/perf/bundle-snapshots")
    const baselineDir = path.resolve("docs/perf/baselines")
    const [b2, b1] = latestTwoIn(bundleDir)
    const [l2, l1] = latestTwoIn(baselineDir)
    if (b1 && b2) {
      console.log(`(auto: comparando 2 ultimos bundle snapshots)`)
      beforePath = b1
      afterPath = b2
    } else if (l1 && l2) {
      console.log(`(auto: comparando 2 ultimos lighthouse baselines)`)
      beforePath = l1
      afterPath = l2
    } else {
      console.error("❌ Sem snapshots suficientes. Rode `npm run perf:bundle` ou `npm run perf:baseline` 2 vezes antes.")
      process.exit(1)
    }
  }

  // Detectar tipo pelo conteudo
  const sample = JSON.parse(fs.readFileSync(beforePath, "utf8"))
  if (sample.shared && sample.routes) {
    diffBundles(beforePath, afterPath)
  } else if (sample.summary) {
    diffLighthouse(beforePath, afterPath)
  } else {
    console.error("❌ Formato de snapshot nao reconhecido.")
    process.exit(1)
  }
}

main()
