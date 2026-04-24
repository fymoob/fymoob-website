#!/usr/bin/env node

/**
 * Script: snapshot-crm-daily.mjs
 *
 * CRITICO: Este é o script que começa o "dia zero" do histórico FYMOOB.
 * Roda diariamente (GitHub Action cron 03:00 BRT) e salva snapshot completo
 * do estado do CRM. Após 60-90 dias, permite calcular:
 * - Valorização real por bairro (delta de preço entre snapshots)
 * - Tempo médio no mercado (imóvel X foi listado em DATA, saiu em DATA')
 * - Rotação de estoque
 *
 * Output: docs/research/snapshots/YYYY-MM-DD.json
 *
 * Campos salvos (privacy-safe — zero dado pessoal de cliente):
 * - Código do imóvel, bairro, cidade, finalidade, categoria
 * - ValorVenda, ValorLocacao, AreaPrivativa, AreaTotal
 * - Dormitorios, Suites, Vagas, Banheiros
 * - Status (ativo/inativo)
 * - DataCadastro e DataAtualizacao (crítico pra tempo médio)
 *
 * Uso local:
 *   node scripts/research/snapshot-crm-daily.mjs
 *
 * Uso em cron:
 *   configured in .github/workflows/crm-snapshot.yml (cron 03:00 BRT)
 *
 * Protocolo: FYMOOB Research Protocol v1.0, Script #3 (crítico — bootstrap B).
 */

import { config } from "dotenv"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.resolve(__dirname, "../../.env.local") })

const LOFT_API_KEY = process.env.LOFT_API_KEY
const LOFT_BASE_URL = "https://fymoob.vistahost.com.br"
const SNAPSHOT_DIR = path.resolve(__dirname, "../../docs/research/snapshots")

if (!LOFT_API_KEY) {
  console.error("❌ LOFT_API_KEY não encontrada")
  process.exit(1)
}

async function fetchLoftPage(offset = 0, pageSize = 50) {
  const params = new URLSearchParams({
    key: LOFT_API_KEY,
    pesquisa: JSON.stringify({
      fields: [
        "Codigo",
        "Bairro",
        "Cidade",
        "UF",
        "Finalidade",
        "Categoria",
        "ValorVenda",
        "ValorLocacao",
        "ValorIptu",
        "ValorCondominio",
        "AreaPrivativa",
        "AreaTotal",
        "AreaTerreno",
        "Dormitorios",
        "Suites",
        "Vagas",
        "BanheiroSocialQtd",
        "Status",
        "ExibirNoSite",
        "DataCadastro",
        "DataAtualizacao",
      ],
      order: { Codigo: "asc" },
      paginacao: { pagina: Math.floor(offset / pageSize) + 1, quantidade: pageSize },
    }),
  })
  const url = `${LOFT_BASE_URL}/imoveis/listar?${params}`
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) })
  if (!res.ok) throw new Error(`Loft API: ${res.status} ${res.statusText}`)
  return res.json()
}

async function fetchAllProperties() {
  const all = []
  let offset = 0
  const pageSize = 50
  let pages = 0
  while (true) {
    const data = await fetchLoftPage(offset, pageSize)
    const page = Object.entries(data)
      .filter(([k]) => !isNaN(Number(k)))
      .map(([, v]) => v)
    if (page.length === 0) break
    all.push(...page)
    pages++
    process.stdout.write(`\r   página ${pages} — ${all.length} imóveis`)
    if (page.length < pageSize) break
    offset += pageSize
    if (offset > 10000) break
  }
  process.stdout.write("\n")
  return all
}

function toNumber(raw) {
  if (raw == null || raw === "") return 0
  const s = String(raw).replace(/[^\d.,\-]/g, "")
  const cleaned = s.includes(",") && s.lastIndexOf(",") > s.lastIndexOf(".") ? s.replace(/\./g, "").replace(",", ".") : s.replace(/,/g, "")
  const n = Number(cleaned)
  return isFinite(n) ? n : 0
}

function normalizeProperty(p) {
  return {
    codigo: String(p.Codigo || ""),
    bairro: p.Bairro || null,
    cidade: p.Cidade || null,
    uf: p.UF || null,
    finalidade: p.Finalidade || null,
    categoria: p.Categoria || null,
    valor_venda: toNumber(p.ValorVenda) || null,
    valor_locacao: toNumber(p.ValorLocacao) || null,
    valor_iptu: toNumber(p.ValorIptu) || null,
    valor_condominio: toNumber(p.ValorCondominio) || null,
    area_privativa: toNumber(p.AreaPrivativa) || null,
    area_total: toNumber(p.AreaTotal) || null,
    area_terreno: toNumber(p.AreaTerreno) || null,
    dormitorios: Number(p.Dormitorios) || null,
    suites: Number(p.Suites) || null,
    vagas: Number(p.Vagas) || null,
    banheiros: Number(p.BanheiroSocialQtd) || null,
    status: p.Status || null,
    exibir_no_site: p.ExibirNoSite || null,
    data_cadastro: p.DataCadastro || null,
    data_atualizacao: p.DataAtualizacao || null,
  }
}

async function main() {
  const now = new Date()
  const dateStr = now.toISOString().slice(0, 10)
  const snapshotPath = path.join(SNAPSHOT_DIR, `${dateStr}.json`)

  if (fs.existsSync(snapshotPath) && !process.argv.includes("--force")) {
    console.log(`⚠️  Snapshot de ${dateStr} já existe. Use --force pra sobrescrever.`)
    process.exit(0)
  }

  if (!fs.existsSync(SNAPSHOT_DIR)) {
    fs.mkdirSync(SNAPSHOT_DIR, { recursive: true })
  }

  console.log(`📸 Snapshot CRM FYMOOB — ${dateStr}`)
  console.log(`   Protocolo: FYMOOB Research Protocol v1.0`)
  console.log(`   Destino: ${snapshotPath}\n`)

  const rawProperties = await fetchAllProperties()
  const properties = rawProperties.map(normalizeProperty).filter((p) => p.codigo)

  // Estatísticas agregadas pra ter contexto sem precisar re-parsear
  const stats = {
    total: properties.length,
    por_finalidade: properties.reduce((acc, p) => {
      const key = p.finalidade || "sem_finalidade"
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {}),
    por_cidade: properties.reduce((acc, p) => {
      const key = p.cidade || "sem_cidade"
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {}),
    bairros_distintos: new Set(properties.map((p) => p.bairro).filter(Boolean)).size,
  }

  const snapshot = {
    snapshot_date: dateStr,
    snapshot_time_iso: now.toISOString(),
    schema_version: "1.0",
    protocol: "FYMOOB Research Protocol v1.0",
    total: properties.length,
    stats,
    properties,
  }

  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2))

  const sizeMB = (fs.statSync(snapshotPath).size / 1024 / 1024).toFixed(2)
  console.log(`✅ Snapshot salvo`)
  console.log(`   ${properties.length} imóveis`)
  console.log(`   ${stats.bairros_distintos} bairros distintos`)
  console.log(`   Tamanho: ${sizeMB} MB`)
  console.log(`\n   Finalidade:`)
  for (const [k, v] of Object.entries(stats.por_finalidade).sort((a, b) => b[1] - a[1])) {
    console.log(`     ${k}: ${v}`)
  }
}

main().catch((err) => {
  console.error("❌ Erro:", err.message)
  process.exit(1)
})
