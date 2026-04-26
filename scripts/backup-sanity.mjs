#!/usr/bin/env node

/**
 * backup-sanity.mjs — Backup completo do dataset Sanity (Disaster Recovery N1)
 *
 * Exporta TODOS os documentos publicados (não-draft) em JSON único,
 * salvo em docs/sanity-backups/<YYYY-MM-DD>.json. Mantém os últimos 30
 * backups (cleanup automático).
 *
 * Diferente do sync-to-mdx (que converte e baixa imagens), este script
 * é o tarball "raw" — preserva a estrutura nativa Sanity (Portable Text,
 * referências de assets, metadata do schema). Útil pra:
 * - Restaurar dataset em outro projeto Sanity
 * - Migrar pra outro CMS preservando estrutura
 * - Auditoria histórica do conteúdo
 *
 * Uso:
 *   node scripts/backup-sanity.mjs
 *
 * Pré-requisitos: SANITY_API_READ_TOKEN no .env.local
 */

import { config } from "dotenv"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@sanity/client"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
config({ path: path.resolve(ROOT, ".env.local") })

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const API_VERSION = process.env.SANITY_API_VERSION || "2026-04-25"
const READ_TOKEN = process.env.SANITY_API_READ_TOKEN

const BACKUP_DIR = path.join(ROOT, "docs/sanity-backups")
const KEEP_LAST_N_BACKUPS = 30

if (!PROJECT_ID || PROJECT_ID === "placeholder") {
  console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID não configurada")
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: READ_TOKEN,
  useCdn: false,
})

if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true })

async function main() {
  const today = new Date().toISOString().split("T")[0]
  const filename = `${today}.json`
  const filepath = path.join(BACKUP_DIR, filename)

  console.log(`📦 Backup Sanity dataset → ${filename}`)
  console.log(`   Project: ${PROJECT_ID} / dataset: ${DATASET}`)

  // Pega TODOS documentos não-draft (drafts.<id> são excluídos)
  const docs = await client.fetch(
    `*[!(_id in path("drafts.**"))] | order(_type asc, _createdAt asc)`
  )

  console.log(`   ${docs.length} documentos`)

  // Sumário por tipo
  const byType = docs.reduce((acc, d) => {
    acc[d._type] = (acc[d._type] || 0) + 1
    return acc
  }, {})
  for (const [type, count] of Object.entries(byType)) {
    console.log(`     ${type}: ${count}`)
  }

  // Salva backup
  const payload = {
    backup_date: today,
    backup_time_iso: new Date().toISOString(),
    sanity_project_id: PROJECT_ID,
    sanity_dataset: DATASET,
    api_version: API_VERSION,
    document_count: docs.length,
    by_type: byType,
    documents: docs,
  }

  fs.writeFileSync(filepath, JSON.stringify(payload, null, 2), "utf-8")
  const sizeKb = (fs.statSync(filepath).size / 1024).toFixed(1)
  console.log(`   ✅ ${sizeKb} KB salvos em ${filepath}`)

  // Cleanup: mantém últimos N backups
  const allBackups = fs
    .readdirSync(BACKUP_DIR)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort()
    .reverse()

  const toDelete = allBackups.slice(KEEP_LAST_N_BACKUPS)
  if (toDelete.length > 0) {
    console.log(`\n🧹 Cleanup: removendo ${toDelete.length} backup(s) antigo(s)`)
    for (const f of toDelete) {
      fs.unlinkSync(path.join(BACKUP_DIR, f))
      console.log(`   - ${f}`)
    }
  }

  console.log(`\n📚 Total de backups mantidos: ${Math.min(allBackups.length, KEEP_LAST_N_BACKUPS)}`)
  console.log(`\n💡 Dica: pra disaster recovery completo, rodar também:`)
  console.log(`   node scripts/sanity-to-mdx.mjs    # converte pra MDX + baixa imagens`)
}

main().catch((err) => {
  console.error("❌ Erro fatal:", err)
  process.exit(1)
})
