#!/usr/bin/env node
/**
 * Sprint 1 — Analytics Intelligence (Linha A)
 * Wrapper deterministico do audit existente. Le `docs/seo-reports/page-audit-all.json`
 * (gerado por scripts/seo-gaps-audit.py) e produz JSON consolidado pro skill.
 *
 * Se o audit estiver mais velho que --max-age-days (default 7), aborta com
 * mensagem orientando re-rodar o python script. Nao re-roda automaticamente
 * pra evitar runs longos no skill (audit completo leva 10+min em 588 URLs).
 *
 * Uso:
 *   node scripts/intel/audit-snapshot.mjs
 *   node scripts/intel/audit-snapshot.mjs --output tmp/intel/audit-2026-W19.json
 *   node scripts/intel/audit-snapshot.mjs --max-age-days 14
 *
 * Output JSON estrutura:
 *   {
 *     meta: { generatedAt, auditAgeDays, totalPages },
 *     stats: { titleTooLong, descriptionTooShort, missingCanonical, ... },
 *     criticalIssues: [...]   // top 30 paginas com mais problemas
 *   }
 */

import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"

const args = process.argv.slice(2)
const getArg = (flag) => {
  const idx = args.indexOf(flag)
  return idx >= 0 ? args[idx + 1] : null
}

const outputPath = getArg("--output")
const maxAgeDays = Number(getArg("--max-age-days") || 7)
const auditFile = getArg("--audit-file") || "docs/seo-reports/page-audit-all.json"

async function main() {
  let raw
  try {
    raw = await fs.readFile(auditFile, "utf-8")
  } catch (err) {
    console.error(`✗ Audit file nao encontrado: ${auditFile}`)
    console.error(`  Rode: python scripts/seo-gaps-audit.py --all`)
    process.exit(1)
  }

  const stat = await fs.stat(auditFile)
  const ageDays = (Date.now() - stat.mtimeMs) / (1000 * 60 * 60 * 24)
  if (ageDays > maxAgeDays) {
    console.error(`✗ Audit muito velho (${ageDays.toFixed(1)}d, max ${maxAgeDays}d)`)
    console.error(`  Re-rode: python scripts/seo-gaps-audit.py --all`)
    console.error(`  Ou aumenta limite: --max-age-days N`)
    process.exit(1)
  }

  const audit = JSON.parse(raw)
  if (!Array.isArray(audit)) {
    console.error("✗ Audit JSON nao e array — formato inesperado")
    process.exit(1)
  }

  console.error(`▸ Audit snapshot: ${audit.length} paginas, ${ageDays.toFixed(1)}d de idade`)

  // Stats agregadas
  const stats = {
    totalPages: audit.length,
    titleTooLong: 0,        // >65
    titleTooShort: 0,       // <30
    descriptionTooLong: 0,  // >160
    descriptionTooShort: 0, // <120
    missingCanonical: 0,
    missingOgImage: 0,
    missingFaqSchema: 0,
    thinContent: 0,         // word_count < 300
    fewInternalLinks: 0,    // < 5
  }

  for (const p of audit) {
    if (p.title_len > 65) stats.titleTooLong++
    if (p.title_len > 0 && p.title_len < 30) stats.titleTooShort++
    if (p.description_len > 160) stats.descriptionTooLong++
    if (p.description_len > 0 && p.description_len < 120) stats.descriptionTooShort++
    if (!p.canonical) stats.missingCanonical++
    if (!p.og_image) stats.missingOgImage++
    if (!p.has_faq_schema) stats.missingFaqSchema++
    if ((p.word_count || 0) < 300) stats.thinContent++
    if ((p.internal_links || 0) < 5) stats.fewInternalLinks++
  }

  // Critical issues — paginas com >2 problemas
  const scoreIssues = (p) => {
    let score = 0
    if (p.title_len > 65) score++
    if (p.title_len > 0 && p.title_len < 30) score++
    if (p.description_len > 160) score++
    if (p.description_len > 0 && p.description_len < 120) score++
    if (!p.canonical) score++
    if (!p.og_image) score++
    if (!p.has_faq_schema) score++
    if ((p.word_count || 0) < 300) score++
    if ((p.internal_links || 0) < 5) score++
    return score
  }

  const criticalIssues = audit
    .map((p) => ({
      url: p.url,
      issuesCount: scoreIssues(p),
      problems: {
        titleLen: p.title_len,
        descriptionLen: p.description_len,
        wordCount: p.word_count,
        missingCanonical: !p.canonical,
        missingOgImage: !p.og_image,
        missingFaqSchema: !p.has_faq_schema,
        internalLinks: p.internal_links,
      },
    }))
    .filter((p) => p.issuesCount >= 2)
    .sort((a, b) => b.issuesCount - a.issuesCount)
    .slice(0, 30)

  const result = {
    meta: {
      generatedAt: new Date().toISOString(),
      auditFile,
      auditAgeDays: ageDays.toFixed(2),
      totalPages: audit.length,
      source: "scripts/seo-gaps-audit.py via audit-snapshot.mjs",
    },
    stats,
    criticalIssues,
  }

  const json = JSON.stringify(result, null, 2)
  if (outputPath) {
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, json, "utf-8")
    console.error(`✓ Salvo em ${outputPath} (${json.length} bytes)`)
  } else {
    console.log(json)
  }
}

main().catch((err) => {
  console.error("✗ Erro:", err.message)
  process.exit(1)
})
