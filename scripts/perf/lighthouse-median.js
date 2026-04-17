#!/usr/bin/env node
/**
 * Lighthouse median runner — FYMOOB perf toolkit.
 *
 * Roda N vezes (default 5) Lighthouse mobile e reporta mediana + CoV.
 * Aborta com exit code 1 se CoV > 10% (medicao muito ruidosa).
 *
 * Referencia: https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md
 *
 * Uso:
 *   node scripts/perf/lighthouse-median.js <url> [--runs=5] [--label=busca]
 *
 * Gera:
 *   docs/perf/baselines/YYYY-MM-DD-<label>.json  (resumo versionado)
 *   /tmp/lh-raw-<label>-<run>.json                (raw full JSON, nao versionado)
 */

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")
const os = require("os")

function parseArgs() {
  const args = process.argv.slice(2)
  const url = args[0]
  if (!url || url.startsWith("--")) {
    console.error("Usage: node scripts/perf/lighthouse-median.js <url> [--runs=5] [--label=<name>]")
    process.exit(1)
  }
  const runs = Number(args.find(a => a.startsWith("--runs="))?.split("=")[1] ?? 5)
  const label = args.find(a => a.startsWith("--label="))?.split("=")[1] ?? urlToLabel(url)
  return { url, runs, label }
}

function urlToLabel(url) {
  try {
    const u = new URL(url)
    const pathSlug = (u.pathname === "/" ? "home" : u.pathname.replace(/^\//, "").replace(/\//g, "-")) || "home"
    return pathSlug
  } catch {
    return "unknown"
  }
}

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function mean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

function stdDev(arr) {
  const m = mean(arr)
  const variance = arr.reduce((acc, x) => acc + Math.pow(x - m, 2), 0) / arr.length
  return Math.sqrt(variance)
}

function cov(arr) {
  return (stdDev(arr) / mean(arr)) * 100
}

function runLighthouse(url, runIdx, label) {
  const tmpDir = os.tmpdir()
  const outPath = path.join(tmpDir, `lh-raw-${label}-${runIdx}.json`)
  const cmd = [
    "npx lighthouse",
    `"${url}"`,
    "--only-categories=performance",
    "--form-factor=mobile",
    "--screenEmulation.mobile",
    `--chrome-flags="--headless=new --no-sandbox"`,
    "--output=json",
    `--output-path="${outPath}"`,
    "--quiet",
  ].join(" ")

  console.log(`  Run ${runIdx + 1}: lighthouse ${url}...`)
  try {
    execSync(cmd, { stdio: "pipe", maxBuffer: 1024 * 1024 * 200 })
  } catch (e) {
    // Windows EPERM cleanup error is cosmetic — JSON still gets generated
    if (!fs.existsSync(outPath)) {
      console.error(`  ❌ Run ${runIdx + 1} failed: ${e.message}`)
      return null
    }
  }

  const raw = JSON.parse(fs.readFileSync(outPath, "utf8"))
  return {
    score: Math.round((raw.categories?.performance?.score ?? 0) * 100),
    lcp_ms: raw.audits?.["largest-contentful-paint"]?.numericValue ?? null,
    tbt_ms: raw.audits?.["total-blocking-time"]?.numericValue ?? null,
    cls: raw.audits?.["cumulative-layout-shift"]?.numericValue ?? null,
    fcp_ms: raw.audits?.["first-contentful-paint"]?.numericValue ?? null,
    si_ms: raw.audits?.["speed-index"]?.numericValue ?? null,
    rawPath: outPath,
  }
}

function main() {
  const { url, runs, label } = parseArgs()

  console.log(`\n📊 Lighthouse median for ${url} (${runs} runs, label="${label}")\n`)

  const results = []
  for (let i = 0; i < runs; i++) {
    const r = runLighthouse(url, i, label)
    if (r) results.push(r)
  }

  if (results.length < 3) {
    console.error(`\n❌ Too few successful runs (${results.length}/${runs}). Aborting.`)
    process.exit(1)
  }

  const metrics = {
    score: results.map(r => r.score),
    lcp_ms: results.map(r => r.lcp_ms).filter(v => v !== null),
    tbt_ms: results.map(r => r.tbt_ms).filter(v => v !== null),
    cls: results.map(r => r.cls).filter(v => v !== null),
    fcp_ms: results.map(r => r.fcp_ms).filter(v => v !== null),
    si_ms: results.map(r => r.si_ms).filter(v => v !== null),
  }

  const summary = {}
  for (const [key, arr] of Object.entries(metrics)) {
    if (arr.length === 0) continue
    summary[key] = {
      samples: arr,
      median: Number(median(arr).toFixed(2)),
      mean: Number(mean(arr).toFixed(2)),
      stdDev: Number(stdDev(arr).toFixed(2)),
      cov_pct: Number(cov(arr).toFixed(2)),
    }
  }

  // Print table
  console.log("\n📈 Results:")
  console.log("Metric     | Median   | Mean     | StdDev   | CoV%   | Samples")
  console.log("-----------|----------|----------|----------|--------|" + "-".repeat(40))
  for (const [key, s] of Object.entries(summary)) {
    const medStr = key === "cls" ? s.median.toFixed(3) : s.median.toFixed(0)
    console.log(
      `${key.padEnd(10)} | ${medStr.padStart(8)} | ${s.mean.toFixed(0).padStart(8)} | ${s.stdDev.toFixed(1).padStart(8)} | ${s.cov_pct.toFixed(1).padStart(5)}% | [${s.samples.map(x => key === "cls" ? x.toFixed(3) : x.toFixed(0)).join(", ")}]`
    )
  }

  // Reliability check — CoV gate
  const tbtCov = summary.tbt_ms?.cov_pct ?? 0
  const lcpCov = summary.lcp_ms?.cov_pct ?? 0
  const scoreCov = summary.score?.cov_pct ?? 0
  const maxCov = Math.max(tbtCov, lcpCov, scoreCov)

  console.log(`\nMax CoV (score/LCP/TBT): ${maxCov.toFixed(1)}%`)
  let reliability
  if (maxCov < 5) reliability = "EXCELLENT"
  else if (maxCov < 10) reliability = "ACCEPTABLE"
  else if (maxCov < 20) reliability = "NOISY (rodar mais vezes ou investigar setup)"
  else reliability = "BROKEN (throttling/background processes)"
  console.log(`Reliability: ${reliability}`)

  // Persist summary
  const date = new Date().toISOString().slice(0, 10)
  const outDir = path.resolve("docs/perf/baselines")
  fs.mkdirSync(outDir, { recursive: true })
  const outFile = path.join(outDir, `${date}-${label}.json`)

  const doc = {
    meta: {
      url,
      label,
      date,
      runs: results.length,
      tool: "lighthouse",
      form_factor: "mobile",
    },
    summary,
    reliability,
    max_cov_pct: Number(maxCov.toFixed(2)),
  }

  fs.writeFileSync(outFile, JSON.stringify(doc, null, 2))
  console.log(`\n✅ Saved: ${outFile}`)

  if (maxCov >= 10) {
    console.error(`\n⚠️  CoV >= 10% — medicao muito ruidosa (CoV=${maxCov.toFixed(1)}%).`)
    console.error("   Conforme STATISTICAL-RIGOR.md, esta medicao NAO deve ser usada para claim.")
    console.error("   Rode novamente com mais samples ou investigue setup de throttling.")
    process.exit(1)
  }
}

main()
