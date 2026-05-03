/**
 * Aplica revisões no artigo `ecoville-vs-bigorrilho-curitiba` em 02/05/2026.
 *
 * Artigo já é forte editorialmente (a tese central de "Ecoville tem 3
 * mercados" é honesta e auditável). Auditoria detectou só correções
 * cirúrgicas:
 *
 * A. Frontmatter — title sentence case + seo_meta_* (eram NULL)
 * B. Block 0 (lead) — manter mas alinhar com PMQ revisado (faixa
 *    Mossunguê via intermediárias)
 * C. Block 3 (nota da tabela) — caveat de granularidade FipeZap
 * D. Block 13 — Mossunguê SESP-PR caveat (padrão do cluster)
 * E. Block 16 — "casal DINK" → "casal sem filhos com dupla renda"
 * F. Block 30 — rentabilidade Bigorrilho 2,80% → 0,25-0,33%/mês
 *    (harmonizado com cluster pós-Sprint A)
 * G. Block 36 — claim Airbnb sem fonte — suavizar
 * H. Block 51 — "Armadilha real" → "Erro frequente" (suavização editorial)
 * I. Block 56 — "Casal DINK" → "Casal sem filhos com dupla renda"
 * J. Block 60 — FipeZap fluxo demográfico — alinhar com PMQ (mar/2026)
 * K. Block 69 — FAQ "Ecoville é seguro?" SESP-PR caveat
 * L. Block 82 — methodologyBox sources qualificados + treatment
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "ecoville-vs-bigorrilho-curitiba"

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data: article } = await sb
  .from("articles")
  .select("id, title, description, body, seo_meta_title, seo_meta_description")
  .eq("slug", SLUG)
  .single()

const body = JSON.parse(JSON.stringify(article.body))
const log = []

const t = (text, styles = {}) => ({ type: "text", text, styles })
const b = (text) => t(text, { bold: true })
const link = (href, text) => ({ type: "link", href, content: [t(text)] })

function inlineToString(content) {
  if (!Array.isArray(content)) return ""
  return content
    .map((c) => (c?.type === "link" ? inlineToString(c.content) : c?.text ?? ""))
    .join("")
}

function walkAndReplace(node, from, to) {
  let count = 0
  if (Array.isArray(node)) {
    for (const item of node) {
      if (item?.type === "text" && typeof item.text === "string" && item.text.includes(from)) {
        item.text = item.text.replaceAll(from, to)
        count++
      }
      if (item?.type === "link" && Array.isArray(item.content)) {
        count += walkAndReplace(item.content, from, to)
      }
    }
    return count
  }
  if (node && typeof node === "object" && Array.isArray(node.content)) {
    count += walkAndReplace(node.content, from, to)
  }
  return count
}

// ─────────────────────────────────────────────────────────────────
// A. Frontmatter
// ─────────────────────────────────────────────────────────────────
const NEW_TITLE = "Ecoville vs Bigorrilho: qual bairro escolher em 2026"
const NEW_SEO_META_TITLE = "Ecoville ou Bigorrilho: qual bairro escolher em 2026?"
const NEW_SEO_META_DESC =
  "Comparativo Ecoville × Bigorrilho em 2026: 4 perfis (família, jovem, investidor, aposentado), 3 mercados do Ecoville e os trechos onde cada bairro vence."

const titleChanged = article.title !== NEW_TITLE
const seoTitleChanged = article.seo_meta_title !== NEW_SEO_META_TITLE
const seoDescChanged = article.seo_meta_description !== NEW_SEO_META_DESC

if (titleChanged) log.push(`[A] title sentence case`)
if (seoTitleChanged) log.push(`[A] seo_meta_title atualizado (era NULL)`)
if (seoDescChanged) log.push(`[A] seo_meta_description atualizado (era NULL)`)

// ─────────────────────────────────────────────────────────────────
// B. Block 0 (lead) — alinhar com PMQ
// ─────────────────────────────────────────────────────────────────
const LEAD_MARKER = "FipeZap publica Mossunguê em recortes intermediários"
const idx0 = body.findIndex(
  (bl, i) =>
    i === 0 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("apto.vc, BemBrasil, Senior Index")
)
if (idx0 >= 0 && !inlineToString(body[idx0].content).includes(LEAD_MARKER)) {
  body[idx0].content = [
    t("No Ecoville, o m² fechou abril/2026 em "),
    b("R$ 9.430"),
    t(" para apartamento usado, "),
    b("R$ 16.863"),
    t(" para apartamento novo e entre "),
    b("R$ 16.800 e R$ 25.000"),
    t(" para casa em condomínio fechado (apto.vc, BemBrasil, Senior Index, com observação complementar do estoque acompanhado pela FYMOOB). Três mercados dentro do mesmo bairro, com perfis de comprador diferentes. No Bigorrilho, "),
    b("R$ 14.117/m²"),
    t(" pelo "),
    link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap mar/2026"),
    t(" — métrica única e direta. O FipeZap publica Mossunguê em recortes intermediários a R$ 14.062 (mar/2026, via MySide), mas o ranking agregado não captura os 3 mercados separadamente do Ecoville. Esse desencontro de métrica explica metade da confusão entre os dois bairros — e este post mostra como decidir entre eles em 4 perfis: família, jovem, investidor e aposentado."),
  ]
  log.push("[B] block 0 (lead) — alinhado com PMQ + faixa Mossunguê via intermediárias")
} else if (idx0 >= 0) {
  log.push("[B] block 0 já tem marker novo — skip")
} else {
  log.push("[B] !!! block 0 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// C. Block 3 (nota da tabela)
// ─────────────────────────────────────────────────────────────────
const NOTA_TABELA_MARKER = "intermediárias FipeZap (MySide, BemBrasil) publicam Mossunguê"
const idx3 = body.findIndex(
  (bl, i) =>
    i === 3 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Preços de abril/2026")
)
if (idx3 >= 0 && !inlineToString(body[idx3].content).includes(NOTA_TABELA_MARKER)) {
  body[idx3].content = [
    t("Preços de abril/2026. O Ecoville é composto de 3 mercados distintos — o FipeZap oficial não cobre o Ecoville em tabela própria por causa dessa mistura (a amostra apto + casa não fecha como agregado estatístico). As "),
    link("https://myside.com.br/", "intermediárias FipeZap (MySide, BemBrasil) publicam Mossunguê"),
    t(" — bairro oficial do Ecoville no IPPUC — em torno de R$ 14.062/m² em março/2026, mas esse número agrupa as 3 tipologias e não diz qual delas você está olhando. O Bigorrilho tem métrica direta no FipeZap porque o bairro é quase 100% apartamento padrão, sem mistura."),
  ]
  log.push("[C] block 3 (nota tabela) — caveat de granularidade FipeZap + número Mossunguê alinhado com PMQ")
} else if (idx3 >= 0) {
  log.push("[C] block 3 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// D + K. Mossunguê SESP-PR caveat (blocks 13 + 69)
// ─────────────────────────────────────────────────────────────────
const SESP_MARKER = "indicador, não como garantia"

const idx13 = body.findIndex(
  (bl) =>
    bl.type === "bulletListItem" &&
    inlineToString(bl.content).includes("Mossunguê registrou zero homicídios")
)
if (idx13 >= 0 && !inlineToString(body[idx13].content).includes(SESP_MARKER)) {
  body[idx13].content = [
    b("Segurança: "),
    t("na agregação consultada (SESP-PR / CAPE, jan-set/2025, via "),
    link("https://www.gazetadopovo.com.br/parana/cidades/curitiba/seguranca/", "Radar da Gazeta do Povo"),
    t("), não aparecem homicídios letais reportados para Mossunguê. Como esse recorte por bairro não é publicado de forma padronizada pela SESP-PR, o dado deve ser lido como "),
    b("indicador, não como garantia"),
    t("."),
  ]
  log.push("[D] block 13 (Mossunguê segurança) — caveat SESP-PR")
} else if (idx13 >= 0) {
  log.push("[D] block 13 já tem marker novo — skip")
}

const idx69 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).startsWith("Sim. Mossunguê registrou zero homicídios")
)
if (idx69 >= 0 && !inlineToString(body[idx69].content).includes(SESP_MARKER)) {
  body[idx69].content = [
    t("Em geral, sim. Na agregação consultada (SESP-PR / CAPE, jan-set/2025, via Radar da Gazeta do Povo), não aparecem homicídios letais reportados para Mossunguê. Como esse recorte por bairro não é publicado de forma padronizada pela SESP-PR, o dado deve ser lido como indicador, não como garantia. Em crime patrimonial absoluto, o bairro fica em posição intermediária — volume menor que Água Verde e Centro, mas presente. Condomínio fechado e perimetria privada são padrão na região e ajudam a explicar a sensação de segurança real."),
  ]
  log.push("[K] block 69 (FAQ segurança) — caveat SESP-PR")
} else if (idx69 >= 0) {
  log.push("[K] block 69 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// E + I. "casal DINK" → "casal sem filhos com dupla renda"
// ─────────────────────────────────────────────────────────────────
let dinkCount = 0
for (const block of body) {
  dinkCount += walkAndReplace(block, "casal DINK", "casal sem filhos com dupla renda")
  dinkCount += walkAndReplace(block, "Casal DINK", "Casal sem filhos com dupla renda")
}
if (dinkCount > 0) log.push(`[E+I] "casal DINK" → "casal sem filhos com dupla renda" (${dinkCount} ocorrência(s))`)
else log.push(`[E+I] DINK não encontrado — já corrigido`)

// ─────────────────────────────────────────────────────────────────
// F. Block 30 — rentabilidade Bigorrilho harmonizada
// ─────────────────────────────────────────────────────────────────
const RENT_MARKER = "0,25% a 0,33% ao mês"
const idx30 = body.findIndex(
  (bl) =>
    bl.type === "bulletListItem" &&
    inlineToString(bl.content).includes("Bigorrilho tem rentabilidade") &&
    inlineToString(bl.content).includes("2,80%")
)
if (idx30 >= 0 && !inlineToString(body[idx30].content).includes(RENT_MARKER)) {
  body[idx30].content = [
    t("Bigorrilho tem rendimento de aluguel em torno de "),
    b("0,25% a 0,33% ao mês (cerca de 3% a 4% ao ano)"),
    t(" segundo "),
    link("https://secovi-pr.com.br/", "Secovi-PR"),
    t(" e FipeZap Locação — abaixo da média de Curitiba (4,74% a.a., FipeZap mar/2026) por ser bairro de alto padrão historicamente saturado."),
  ]
  log.push("[F] block 30 (rentabilidade Bigorrilho) — 2,80% → 0,25-0,33%/mês (harmonizado cluster)")
} else if (idx30 >= 0) {
  log.push("[F] block 30 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// G. Block 36 — Airbnb claim suavizado
// ─────────────────────────────────────────────────────────────────
const AIRBNB_MARKER = "demanda sazonal pode existir"
const idx36 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Airbnb") &&
    inlineToString(bl.content).includes("Parque Barigui")
)
if (idx36 >= 0 && !inlineToString(body[idx36].content).includes(AIRBNB_MARKER)) {
  body[idx36].content = [
    b("Ressalva: "),
    t("para investidor de locação por temporada, o Ecoville pode oferecer vantagem — Parque Barigui é destino turístico relevante e o Park Shopping atrai visitante de outras cidades. A demanda sazonal pode existir, mas precisa ser validada caso a caso (taxa de ocupação, sazonalidade do bairro, regulamentação do condomínio). Não há índice oficial público de ocupação de temporada por bairro em Curitiba."),
  ]
  log.push("[G] block 36 (Airbnb) — suavizado, sem cravar 'Ecoville vence'")
} else if (idx36 >= 0) {
  log.push("[G] block 36 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// H. Block 51 — "Armadilha real" → "Erro frequente"
// ─────────────────────────────────────────────────────────────────
const idx51 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).startsWith("Armadilha real")
)
if (idx51 >= 0) {
  let touched = walkAndReplace(body[idx51], "Armadilha real de quem muda", "Erro frequente de quem muda")
  if (touched > 0) log.push("[H] block 51 — 'Armadilha real' → 'Erro frequente'")
  else log.push("[H] block 51 já corrigido — skip")
}

// ─────────────────────────────────────────────────────────────────
// J. Block 60 — fluxo demográfico FipeZap (data)
// ─────────────────────────────────────────────────────────────────
let dateCount = 0
for (const block of body) {
  dateCount += walkAndReplace(block, "FipeZap, abril/2026", "FipeZap mar/2026")
}
if (dateCount > 0) log.push(`[J] datas FipeZap → mar/2026 (${dateCount}x)`)

// ─────────────────────────────────────────────────────────────────
// L. Block 82 — methodologyBox
// ─────────────────────────────────────────────────────────────────
const NEW_SOURCES = JSON.stringify([
  "FipeZap mar/2026 (FGV + Fipe + Zap) — preço m² Bigorrilho",
  "MySide / BemBrasil — recorte FipeZap por bairro (intermediárias)",
  "Apto.vc — apartamento novo Mossunguê/Ecoville",
  "Senior Index 2024-2025 — apartamento usado Mossunguê",
  "Secovi-PR — Pesquisa de Locação CWB",
  "INEP — ENEM 2024 (Colégio Internacional Everest)",
  "SESP-PR / CAPE Estatísticas — crimes letais (recorte agregado, sem granularidade oficial por bairro)",
  "IPPUC — definição oficial de bairros",
  "FYMOOB — observação complementar do estoque ativo",
])
const NEW_TREATMENT =
  "FipeZap não publica granular por bairro de forma padronizada. Para Mossunguê (Ecoville), as intermediárias publicam em torno de R$ 14.062/m² em mar/2026, mas o número agrega as 3 tipologias do Ecoville (apto usado, apto novo e casa em condomínio). Por isso o post desmembra cada mercado com fonte específica. Bigorrilho tem métrica direta no FipeZap por ser bairro homogêneo (apartamento padrão). Rendimento de aluguel calculado como aluguel anual ÷ preço de venda, sem considerar vacância e custos de manutenção. Bairros de alto padrão têm rendimento abaixo da média de Curitiba (4,74% a.a.) por concentração histórica."

const idx82 = body.findIndex((bl) => bl.type === "methodologyBox")
if (idx82 >= 0) {
  let touched = false
  if (body[idx82].props.sources !== NEW_SOURCES) {
    body[idx82].props.sources = NEW_SOURCES
    touched = true
  }
  if (body[idx82].props.treatment !== NEW_TREATMENT) {
    body[idx82].props.treatment = NEW_TREATMENT
    touched = true
  }
  if (body[idx82].props.lastUpdate !== "2026-05-02") {
    body[idx82].props.lastUpdate = "2026-05-02"
    touched = true
  }
  if (touched) log.push("[L] methodologyBox — sources qualificados + treatment com caveat granularidade")
  else log.push("[L] methodologyBox já atualizado — skip")
}

// ─────────────────────────────────────────────────────────────────
// Re-cálculo word_count
// ─────────────────────────────────────────────────────────────────
function blockText(bl) {
  if (Array.isArray(bl.content)) return inlineToString(bl.content)
  if (bl.type === "table") {
    return (bl.content?.rows ?? [])
      .map((r) => r.cells.map((c) => inlineToString(c.content)).join(" "))
      .join(" ")
  }
  if (bl.type === "calloutBox") return inlineToString(bl.content)
  if (bl.type === "ctaBox") return `${bl.props?.title ?? ""} ${bl.props?.description ?? ""}`
  if (bl.type === "methodologyBox")
    return Object.values(bl.props ?? {}).filter((v) => typeof v === "string").join(" ")
  return ""
}
const totalText = body.map(blockText).join(" ")
const wordCount = totalText.split(/\s+/).filter(Boolean).length
const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200))
log.push(`[M] body: ${article.body.length} blocks → ${body.length} blocks`)
log.push(`[M] word_count: ${wordCount}, reading_time_min: ${readingTimeMin}`)

console.log("=".repeat(72))
console.log("Ecoville vs Bigorrilho — revisões")
console.log("=".repeat(72))
log.forEach((l) => console.log(l))
console.log("=".repeat(72))

if (DRY_RUN) {
  console.log("\n[DRY-RUN] sem persistência.")
  process.exit(0)
}

const update = { body, word_count: wordCount, reading_time_min: readingTimeMin }
if (titleChanged) update.title = NEW_TITLE
if (seoTitleChanged) update.seo_meta_title = NEW_SEO_META_TITLE
if (seoDescChanged) update.seo_meta_description = NEW_SEO_META_DESC

const { error: upErr } = await sb.from("articles").update(update).eq("id", article.id)
if (upErr) {
  console.error("\n!!! Erro:", upErr)
  process.exit(1)
}
console.log("\n✅ Artigo salvo com sucesso.")

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fymoob.com.br"
const cronSecret = process.env.CRON_SECRET
if (cronSecret) {
  for (const target of [`/blog/${SLUG}`, "/blog"]) {
    try {
      const r = await fetch(`${baseUrl}/api/revalidate?path=${encodeURIComponent(target)}&secret=${cronSecret}`, { method: "POST" })
      console.log(`revalidate ${target}: ${r.status}`)
    } catch (e) {
      console.warn(`revalidate ${target} failed:`, e.message)
    }
  }
}
