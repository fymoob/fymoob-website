#!/usr/bin/env node
/**
 * Extrai layout-shift-elements dos raw JSONs do Lighthouse.
 * Uso ad-hoc para forensic attribution de CLS.
 */

const fs = require("fs")
const path = require("path")
const os = require("os")

const tmpDir = os.tmpdir()
const files = [
  { name: "lh-raw-busca-0.json", label: "baseline run 0" },
  { name: "lh-raw-busca-1.json", label: "baseline run 1" },
  { name: "lh-raw-busca-2.json", label: "baseline run 2" },
  { name: "lh-raw-busca-3.json", label: "baseline run 3" },
  { name: "lh-raw-busca-4.json", label: "baseline run 4" },
  { name: "lh-raw-busca-post-H001-0.json", label: "post-H001 v1 run 0" },
  { name: "lh-raw-busca-post-H001-1.json", label: "post-H001 v1 run 1" },
  { name: "lh-raw-busca-post-H001-2.json", label: "post-H001 v1 run 2" },
  { name: "lh-raw-busca-post-H001-3.json", label: "post-H001 v1 run 3" },
  { name: "lh-raw-busca-post-H001-4.json", label: "post-H001 v1 run 4" },
  { name: "lh-raw-busca-post-H001-v2-0.json", label: "post-H001 v2 run 0" },
  { name: "lh-raw-busca-post-H001-v2-1.json", label: "post-H001 v2 run 1" },
  { name: "lh-raw-busca-post-H001-v2-2.json", label: "post-H001 v2 run 2" },
  { name: "lh-raw-busca-post-H001-v2-3.json", label: "post-H001 v2 run 3" },
  { name: "lh-raw-busca-post-H001-v2-4.json", label: "post-H001 v2 run 4" },
]

for (const { name, label } of files) {
  const file = path.join(tmpDir, name)
  try {
    const d = JSON.parse(fs.readFileSync(file, "utf8"))
    const cls = d.audits["cumulative-layout-shift"].numericValue
    if (cls === 0) {
      console.log(`\n=== ${label} | CLS=0.000 (skip) ===`)
      continue
    }
    console.log(`\n=== ${label} | CLS=${cls.toFixed(4)} ===`)
    const audit = d.audits["layout-shift-elements"]
    if (audit?.details?.items?.length > 0) {
      for (const item of audit.details.items) {
        console.log(`  score:    ${(item.score ?? "N/A")}`)
        console.log(`  selector: ${item.node?.selector ?? "N/A"}`)
        const snippet = (item.node?.snippet ?? "").replace(/\s+/g, " ").slice(0, 200)
        console.log(`  snippet:  ${snippet}`)
        console.log()
      }
    } else {
      console.log("  (sem layout-shift-elements registrados)")
    }
  } catch (e) {
    console.log(`[skip] ${name}: ${e.message}`)
  }
}
