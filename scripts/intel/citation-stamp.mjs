#!/usr/bin/env node
/**
 * Sprint 1 — Analytics Intelligence (Linha A)
 * Pos-processador deterministico do relatorio markdown gerado pelo skill.
 *
 * O skill gera markdown com claims numericos seguidos de placeholders tipo
 * `{{cite:gsc.summary.deltas.clicks}}`. Esse script:
 * 1. Le o markdown gerado
 * 2. Le os JSONs de evidencia (gsc.json, ga4.json, audit.json)
 * 3. Substitui cada {{cite:path}} por footnote numerada com source + valor
 * 4. Adiciona secao "Fontes" no fim do relatorio com links pros JSONs
 *
 * Pattern Anthropic: separa "scientist" (skill que reasoning) de "librarian"
 * (este script que estampa). Reduz hallucination — claim sem citacao valida
 * do JSON gera erro explicito (nao silencioso).
 *
 * Uso:
 *   node scripts/intel/citation-stamp.mjs \
 *     --input docs/seo/reports/2026-W19.draft.md \
 *     --gsc tmp/intel/gsc-2026-W19.json \
 *     --ga4 tmp/intel/ga4-2026-W19.json \
 *     --audit tmp/intel/audit-2026-W19.json \
 *     --output docs/seo/reports/2026-W19.md
 *
 * Pattern de citacao no draft:
 *   `{{cite:gsc.summary.period.clicks}}`     -> resolve via path no JSON
 *   `{{cite:ga4.conversions.whatsapp_click.total}}` -> idem
 *   `{{cite:audit.stats.titleTooLong}}` -> idem
 *
 * Confidence levels (skill marca explicitamente):
 *   {{cite:src.path|confidence:confirmed}}  -> [^N] sem aviso
 *   {{cite:src.path|confidence:likely}}     -> [^N⚠] com aviso
 *   {{cite:src.path|confidence:hypothesis}} -> [^N?] com disclaimer
 */

import fs from "node:fs/promises"
import process from "node:process"

const args = process.argv.slice(2)
const getArg = (flag) => {
  const idx = args.indexOf(flag)
  return idx >= 0 ? args[idx + 1] : null
}

const inputPath = getArg("--input")
const outputPath = getArg("--output") || inputPath?.replace(".draft.md", ".md")
const gscPath = getArg("--gsc")
const ga4Path = getArg("--ga4")
const auditPath = getArg("--audit")

if (!inputPath || !outputPath) {
  console.error("✗ --input e --output sao obrigatorios")
  console.error("Uso: node scripts/intel/citation-stamp.mjs --input draft.md --gsc gsc.json --ga4 ga4.json --audit audit.json --output final.md")
  process.exit(1)
}

async function loadJsonOrEmpty(path) {
  if (!path) return null
  try {
    const raw = await fs.readFile(path, "utf-8")
    return JSON.parse(raw)
  } catch (err) {
    console.error(`⚠ Nao consegui ler ${path}: ${err.message} (continuando sem)`)
    return null
  }
}

function getByPath(obj, path) {
  if (!obj) return undefined
  return path.split(".").reduce((cur, key) => {
    if (cur == null) return undefined
    // Suporte a array indexing: foo[0].bar
    const arrayMatch = key.match(/^(.+)\[(\d+)\]$/)
    if (arrayMatch) {
      return cur[arrayMatch[1]]?.[Number(arrayMatch[2])]
    }
    return cur[key]
  }, obj)
}

function formatValue(v) {
  if (v == null) return "N/D"
  if (typeof v === "number") {
    if (v > 0 && v < 1) return (v * 100).toFixed(2) + "%"
    if (Number.isInteger(v)) return v.toString()
    return v.toFixed(2)
  }
  if (Array.isArray(v)) return `[${v.length} itens]`
  if (typeof v === "object") return JSON.stringify(v).slice(0, 80)
  return String(v)
}

const sourceLabels = {
  gsc: "Google Search Console (period compare 7d/7d)",
  ga4: "Google Analytics 4 (Analytics Data API)",
  audit: "scripts/seo-gaps-audit.py snapshot",
}

async function main() {
  const draft = await fs.readFile(inputPath, "utf-8")
  const sources = {
    gsc: await loadJsonOrEmpty(gscPath),
    ga4: await loadJsonOrEmpty(ga4Path),
    audit: await loadJsonOrEmpty(auditPath),
  }

  const citations = [] // { source, path, value, confidence }
  const errors = []
  let citeCounter = 0

  // Regex captura {{cite:src.path[|confidence:level]}}
  const citeRegex = /\{\{cite:([^}|]+)(?:\|confidence:([^}]+))?\}\}/g

  let body = draft.replace(citeRegex, (_full, citation, confidence = "confirmed") => {
    const [src, ...pathParts] = citation.split(".")
    const dotPath = pathParts.join(".")
    const sourceData = sources[src]
    if (!sourceData) {
      errors.push(`Fonte desconhecida ou nao carregada: ${src} (citation: ${citation})`)
      return `[${src}.${dotPath} ✗]`
    }
    const value = getByPath(sourceData, dotPath)
    if (value === undefined) {
      errors.push(`Path nao encontrado em ${src}: ${dotPath}`)
      return `[${src}.${dotPath} ✗]`
    }
    citeCounter++
    citations.push({
      n: citeCounter,
      source: src,
      path: dotPath,
      value: formatValue(value),
      confidence,
    })
    const marker =
      confidence === "hypothesis" ? `[^${citeCounter}?]`
      : confidence === "likely" ? `[^${citeCounter}⚠]`
      : `[^${citeCounter}]`
    return marker
  })

  // Append fontes no final
  if (citations.length > 0) {
    body += "\n\n---\n\n## Fontes\n\n"
    body += "Cada numero acima e rastreavel ao JSON de evidencia (commit do report inclui timestamp).\n\n"
    for (const c of citations) {
      const label = sourceLabels[c.source] || c.source
      const confSuffix =
        c.confidence === "hypothesis" ? " (HIPOTESE — confirmar antes de agir)"
        : c.confidence === "likely" ? " (PROVAVEL — validar)"
        : ""
      body += `[^${c.n}]: \`${c.source}.${c.path}\` = **${c.value}**${confSuffix} — ${label}\n`
    }
  }

  // Append meta dos JSONs (timestamps + periods cobertos)
  body += "\n\n## Metadados das fontes\n\n"
  for (const [key, data] of Object.entries(sources)) {
    if (!data) continue
    const meta = data.meta || {}
    body += `- **${sourceLabels[key]}**: ${meta.generatedAt || "?"}`
    if (meta.period) body += ` · periodo ${meta.period.start} → ${meta.period.end}`
    if (meta.weekISO) body += ` · ${meta.weekISO}`
    body += "\n"
  }

  if (errors.length > 0) {
    body += "\n\n## ⚠ Erros de citacao (corrigir antes de publicar)\n\n"
    errors.forEach((e) => (body += `- ${e}\n`))
  }

  await fs.writeFile(outputPath, body, "utf-8")

  console.error(`✓ ${citations.length} citacoes processadas`)
  console.error(`✓ Salvo em ${outputPath}`)
  if (errors.length > 0) {
    console.error(`⚠ ${errors.length} erros de citacao (ver final do markdown)`)
    process.exit(2) // exit code 2 — warning, nao falha
  }
}

main().catch((err) => {
  console.error("✗ Erro:", err.message)
  process.exit(1)
})
