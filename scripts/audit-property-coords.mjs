/**
 * Read-only — audita coordenadas de TODOS os imoveis ativos no Loft.
 *
 * Categoriza em 3 grupos:
 *   OK      — lat/lng dentro do bounding box de Curitiba/RM
 *   FALTA   — sem coord (null/empty) ou zerado (0,0)
 *   ERRADA  — coord existe mas esta fora do range Curitiba (dado ruim no CRM)
 *
 * Imprime tabela markdown ordenada por bairro, e CSV em
 * docs/audit-coords-2026-05-02.csv pro Bruno conferir no CRM.
 *
 * Curitiba bounding box (generoso, abrange RM):
 *   lat: -25.0 a -26.2 (sul)
 *   lng: -48.5 a -50.0 (oeste)
 */
import { config } from "dotenv"
import fs from "node:fs"

config({ path: ".env.local" })

const LOFT_KEY = process.env.LOFT_API_KEY
const LOFT_BASE = process.env.LOFT_API_BASE_URL || "https://brunoces-rest.vistahost.com.br"

const CTBA_LAT_MIN = -26.2
const CTBA_LAT_MAX = -25.0
const CTBA_LNG_MIN = -50.0
const CTBA_LNG_MAX = -48.5

const fields = ["Codigo", "Bairro", "Endereco", "Numero", "Cidade", "Categoria", "Status",
                "Latitude", "Longitude", "GMapsLatitude", "GMapsLongitude"]

async function fetchPage(pagina) {
  const pesquisa = JSON.stringify({
    fields,
    paginacao: { pagina, quantidade: 50 },
    filter: { ExibirNoSite: "Sim" },
  })
  const url = `${LOFT_BASE}/imoveis/listar?key=${LOFT_KEY}&pesquisa=${encodeURIComponent(pesquisa)}`
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

const all = {}
let pagina = 1
let totalReported = null

while (true) {
  const data = await fetchPage(pagina)
  const codigos = Object.keys(data).filter((k) => !["paginacao", "total"].includes(k))
  if (codigos.length === 0) break
  for (const codigo of codigos) all[codigo] = data[codigo]
  if (data.paginacao?.total_de_registros) {
    totalReported = parseInt(data.paginacao.total_de_registros)
  }
  if (totalReported && Object.keys(all).length >= totalReported) break
  if (codigos.length < 50) break
  pagina++
  if (pagina > 60) break
}

const codigos = Object.keys(all).sort()
console.log(`\n=== Auditoria coordenadas — ${codigos.length} imoveis ativos ===\n`)

const ok = []
const falta = []
const errada = []

for (const codigo of codigos) {
  const item = all[codigo]
  const latRaw = item.Latitude ?? item.GMapsLatitude
  const lngRaw = item.Longitude ?? item.GMapsLongitude

  if (!latRaw || !lngRaw) {
    falta.push({ codigo, bairro: item.Bairro, endereco: item.Endereco, numero: item.Numero, motivo: "Sem coord no CRM" })
    continue
  }

  const lat = parseFloat(latRaw)
  const lng = parseFloat(lngRaw)

  if (isNaN(lat) || isNaN(lng)) {
    errada.push({ codigo, bairro: item.Bairro, endereco: item.Endereco, numero: item.Numero, lat: latRaw, lng: lngRaw, motivo: "Nao e numero" })
    continue
  }

  if (lat === 0 || lng === 0) {
    falta.push({ codigo, bairro: item.Bairro, endereco: item.Endereco, numero: item.Numero, motivo: "Coord 0,0 (sentinela)" })
    continue
  }

  if (lat < CTBA_LAT_MIN || lat > CTBA_LAT_MAX || lng < CTBA_LNG_MIN || lng > CTBA_LNG_MAX) {
    errada.push({
      codigo, bairro: item.Bairro, endereco: item.Endereco, numero: item.Numero,
      lat: lat.toFixed(6), lng: lng.toFixed(6),
      motivo: `Fora de Curitiba (esperado lat ${CTBA_LAT_MIN}..${CTBA_LAT_MAX}, lng ${CTBA_LNG_MIN}..${CTBA_LNG_MAX})`,
    })
    continue
  }

  ok.push({ codigo, bairro: item.Bairro, lat: lat.toFixed(6), lng: lng.toFixed(6) })
}

console.log(`Resultado:`)
console.log(`  ✓ OK             ${ok.length.toString().padStart(4)} (${(ok.length / codigos.length * 100).toFixed(1)}%)`)
console.log(`  ✗ FALTA          ${falta.length.toString().padStart(4)} (${(falta.length / codigos.length * 100).toFixed(1)}%) — sem coord ou zerado`)
console.log(`  ✗ ERRADA         ${errada.length.toString().padStart(4)} (${(errada.length / codigos.length * 100).toFixed(1)}%) — fora de Curitiba`)
console.log(``)

// Tabela markdown — apenas FALTA e ERRADA (acoes requeridas pelo Bruno)
const lines = []
lines.push(`# Auditoria de coordenadas — ${new Date().toISOString().slice(0, 10)}`)
lines.push(``)
lines.push(`Total de imoveis ativos: **${codigos.length}**`)
lines.push(`  - OK (plotam exatos no site): **${ok.length}** (${(ok.length / codigos.length * 100).toFixed(1)}%)`)
lines.push(`  - Sem coord (caem no centroide do bairro): **${falta.length}** (${(falta.length / codigos.length * 100).toFixed(1)}%)`)
lines.push(`  - Coord ERRADA (precisam correcao no CRM): **${errada.length}** (${(errada.length / codigos.length * 100).toFixed(1)}%)`)
lines.push(``)

if (errada.length > 0) {
  lines.push(`## URGENTE — Imoveis com coord ERRADA (${errada.length})`)
  lines.push(`Estes plotam fora de Curitiba apos o fix. Bruno precisa abrir cada um no CRM, conferir e ajustar.`)
  lines.push(``)
  lines.push(`| Codigo | Bairro | Endereco | Lat | Lng | Motivo |`)
  lines.push(`|--------|--------|----------|-----|-----|--------|`)
  for (const e of errada) {
    lines.push(`| ${e.codigo} | ${e.bairro ?? ""} | ${[e.endereco, e.numero].filter(Boolean).join(", ")} | ${e.lat} | ${e.lng} | ${e.motivo} |`)
  }
  lines.push(``)
}

if (falta.length > 0) {
  lines.push(`## Imoveis sem coord (${falta.length})`)
  lines.push(`Estes caem no centroide do bairro (Localizacao aproximada). Bruno cadastra lat/lng no CRM ou esperamos geocoding automatico.`)
  lines.push(``)
  // Agrupa por bairro
  const porBairro = {}
  for (const f of falta) {
    const b = f.bairro || "(sem bairro)"
    porBairro[b] = porBairro[b] || []
    porBairro[b].push(f)
  }
  const bairrosOrdenados = Object.keys(porBairro).sort((a, b) => porBairro[b].length - porBairro[a].length)
  lines.push(`| Bairro | Qtd | Codigos |`)
  lines.push(`|--------|-----|---------|`)
  for (const b of bairrosOrdenados) {
    const codes = porBairro[b].map((f) => f.codigo).join(", ")
    lines.push(`| ${b} | ${porBairro[b].length} | ${codes} |`)
  }
  lines.push(``)
}

const outDir = "docs/audit"
fs.mkdirSync(outDir, { recursive: true })
const outFile = `${outDir}/coords-${new Date().toISOString().slice(0, 10)}.md`
fs.writeFileSync(outFile, lines.join("\n"))
console.log(`Tabela salva em ${outFile}`)

// CSV bruto pra importar em planilha
const csvLines = ["codigo,bairro,endereco,numero,status,lat,lng,motivo"]
for (const e of errada) csvLines.push(`${e.codigo},"${e.bairro ?? ""}","${e.endereco ?? ""}",${e.numero ?? ""},ERRADA,${e.lat},${e.lng},"${e.motivo}"`)
for (const f of falta) csvLines.push(`${f.codigo},"${f.bairro ?? ""}","${f.endereco ?? ""}",${f.numero ?? ""},FALTA,,,"${f.motivo}"`)
const csvFile = `${outDir}/coords-${new Date().toISOString().slice(0, 10)}.csv`
fs.writeFileSync(csvFile, csvLines.join("\n"))
console.log(`CSV salvo em ${csvFile}`)
