/**
 * Auditoria read-only — rastreia duplicações de palavra e jargões em
 * inglês nos artigos já revisados na Sprint A.
 *
 * Detecta:
 * 1. Palavra duplicada (ex: "profissionais profissional", "muito muito",
 *    "para para", "que que", etc) — só palavras com 4+ letras pra
 *    evitar falsos positivos com "que que" na linguagem coloquial.
 * 2. Jargões em inglês comuns no setor financeiro/imobiliário que
 *    podem confundir leitor brasileiro mediano.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const SLUGS = [
  "melhores-bairros-familias-curitiba",
  "financiamento-caixa-itau-bradesco-comparativo",
  "custo-de-vida-curitiba",
  "mercado-imobiliario-curitiba-2026",
  "quanto-custa-morar-batel-curitiba",
]

// Jargões em inglês a rastrear. Vou listar e decidir caso a caso o
// que vale traduzir vs manter (alguns viraram padrão BR).
const JARGONS = [
  "DINK",
  "yield",
  "wine bar",
  "wine-bar",
  "lifestyle",
  "premium", // muito comum, pode ficar
  "boutique",
  "brunch",
  "co-working",
  "coworking",
  "pipeline",
  "framework",
  "trade-off",
  "tradeoff",
  "happy hour",
  "drive-thru",
  "fast food",
  "food truck",
  "skyline",
  "downtown",
  "showroom",
  "feedback",
  "marketplace",
  "deal",
  "trend",
  "smart money",
  "off-market",
  "dual income",
  "no kids",
  "blue chip",
  "highlight",
  "preview",
  "delivery",
  "follow up",
  "off",
  "save",
  "spread",
  "mid",
  "hype",
  "hub",
]

function inlineToString(content) {
  if (!Array.isArray(content)) return ""
  return content
    .map((c) => (c?.type === "link" ? inlineToString(c.content) : c?.text ?? ""))
    .join("")
}

function blockText(b) {
  if (Array.isArray(b.content)) return inlineToString(b.content)
  if (b.type === "table") {
    return (b.content?.rows ?? [])
      .map((r) => r.cells.map((c) => inlineToString(c.content)).join(" "))
      .join(" ")
  }
  if (b.type === "calloutBox") return inlineToString(b.content)
  if (b.type === "ctaBox") return `${b.props?.title ?? ""} ${b.props?.description ?? ""}`
  if (b.type === "methodologyBox")
    return Object.values(b.props ?? {}).filter((v) => typeof v === "string").join(" ")
  return ""
}

// Detecta duplicações de palavra (mesma palavra de 4+ letras adjacente)
function findDuplicateWords(text) {
  const dups = []
  const re = /\b(\w{4,})\s+\1\b/gi
  let m
  while ((m = re.exec(text))) {
    // ignora alguns falsos positivos óbvios
    const w = m[1].toLowerCase()
    if (["andar", "anos"].includes(w)) continue
    dups.push({ word: m[1], context: text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40) })
  }
  return dups
}

function findJargons(text) {
  const found = []
  for (const term of JARGONS) {
    const re = new RegExp("\\b" + term.replace(/-/g, "[-\\s]") + "\\b", "gi")
    let m
    while ((m = re.exec(text))) {
      found.push({
        term,
        match: m[0],
        context: text.slice(Math.max(0, m.index - 30), m.index + m[0].length + 60),
      })
    }
  }
  return found
}

for (const slug of SLUGS) {
  const { data } = await sb.from("articles").select("body").eq("slug", slug).single()
  if (!data) continue

  console.log("\n" + "═".repeat(72))
  console.log(`▼ ${slug}`)
  console.log("═".repeat(72))

  let anyDup = false
  let anyJargon = false

  for (const [i, b] of data.body.entries()) {
    const text = blockText(b)
    const dups = findDuplicateWords(text)
    const jargons = findJargons(text)

    if (dups.length > 0) {
      anyDup = true
      for (const d of dups) {
        console.log(`  [DUP][block ${i} ${b.type}] "${d.word} ${d.word}" → ...${d.context}...`)
      }
    }
    if (jargons.length > 0) {
      anyJargon = true
      for (const j of jargons) {
        console.log(`  [JRG][block ${i} ${b.type}] "${j.match}" → ...${j.context.replace(/\s+/g, " ")}...`)
      }
    }
  }

  if (!anyDup && !anyJargon) console.log("  (sem ocorrências)")
}
