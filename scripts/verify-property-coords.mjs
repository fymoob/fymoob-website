/**
 * Read-only — verifica coordenadas dos imoveis vindo da API Loft.
 * Confirma o bug do parseNumber rejeitando negativos.
 *
 * Uso: node scripts/verify-property-coords.mjs              # amostra primeiros 50
 *      node scripts/verify-property-coords.mjs 69805739     # imovel especifico
 */
import { config } from "dotenv"
config({ path: ".env.local" })

const LOFT_KEY = process.env.LOFT_API_KEY
const LOFT_BASE = process.env.LOFT_API_BASE_URL || "https://brunoces-rest.vistahost.com.br"
const codigoArg = process.argv[2]

const fields = JSON.stringify([
  "Codigo", "Bairro", "Endereco", "Numero",
  "Latitude", "Longitude", "GMapsLatitude", "GMapsLongitude",
])

if (codigoArg) {
  // Detalhes de 1 imovel
  const url = `https://${LOFT_BASE.replace(/^https?:\/\//, "")}/imoveis/detalhes?key=${LOFT_KEY}&imovel=${codigoArg}&pesquisa=${encodeURIComponent(JSON.stringify({ fields: JSON.parse(fields) }))}`
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  const data = await res.json()
  console.log(JSON.stringify(data, null, 2))
  process.exit(0)
}

// Listagem de amostra
const pesquisa = JSON.stringify({
  fields: JSON.parse(fields),
  paginacao: { pagina: 1, quantidade: 50 },
})
const url = `https://${LOFT_BASE.replace(/^https?:\/\//, "")}/imoveis/listar?key=${LOFT_KEY}&pesquisa=${encodeURIComponent(pesquisa)}`
const res = await fetch(url, { headers: { Accept: "application/json" } })
const data = await res.json()

const codigos = Object.keys(data).filter((k) => k !== "paginacao" && k !== "total")
console.log(`Sample size: ${codigos.length}`)
console.log()

let comCoord = 0
let semCoord = 0
let zerados = 0
const sample = []

for (const codigo of codigos) {
  const item = data[codigo]
  const lat = item.Latitude ?? item.GMapsLatitude
  const lng = item.Longitude ?? item.GMapsLongitude
  const latNum = parseFloat(lat)
  const lngNum = parseFloat(lng)

  if (!lat || !lng) {
    semCoord++
  } else if (latNum === 0 || lngNum === 0) {
    zerados++
  } else {
    comCoord++
    if (sample.length < 5) {
      sample.push({ codigo, bairro: item.Bairro, lat, lng })
    }
  }
}

console.log(`Com coordenadas validas: ${comCoord} / ${codigos.length}`)
console.log(`Sem coordenadas (null/empty): ${semCoord}`)
console.log(`Zerados (0,0):              ${zerados}`)
console.log()
console.log("Amostra de coordenadas validas:")
for (const s of sample) {
  console.log(`  ${s.codigo} (${s.bairro}): ${s.lat}, ${s.lng}`)
}
