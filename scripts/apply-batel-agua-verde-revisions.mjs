/**
 * Aplica revisões aprovadas pelo Vinicius (validadas com ChatGPT) no
 * artigo `batel-vs-agua-verde-curitiba` em 02/05/2026.
 *
 * Sprint B item 3 (após PMQ + Ecoville×Bigorrilho).
 *
 * Mudanças:
 *
 * A. Frontmatter — title sentence case + description nova (versão GPT)
 *    + seo_meta_title/description preenchidos
 * B. Block 0 (lead) — "abril de 2026" → "março/2026"
 * C. Block 3 (nota da tabela) — adicionar nota com dupla leitura
 *    (rejeitar linha extra na tabela; nota fica abaixo)
 * D. Block 7 — "100% é apartamento" → "essencialmente verticalizado"
 * E. Block 19 — heading: "casal DINK" → "casal sem filhos com dupla renda"
 * F. Block 31 — rentabilidade com dupla leitura
 * G. Block 35 — Airbnb suavizado (sem ~10%)
 * H. Block 39 — "ironia clara" suavizada
 * I. Block 46 — "SESP-PR publica boletins por bairro" → "agregação
 *    Radar Gazeta do Povo / SESP-PR"
 * J. Block 49 — callout: remover "iLove Curitiba e MySide" (ficamos
 *    só com Radar Gazeta do Povo no block 46)
 * K. Block 54 — "Casal DINK 40-55" + "Depende 100%" → versões suavizadas
 * L. Block 56 — CTA principal: "Comparar bairros"
 * M. Block 65 — aluguel Batel com dupla leitura explicita
 * N. Block 76 — methodologyBox com sources qualificados + treatment
 * O. Inserção: tabela inicial "Qual cabe no seu perfil?" após o lead
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "batel-vs-agua-verde-curitiba"

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

function makeParagraph(content) {
  return {
    id: randomUUID(),
    type: "paragraph",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: Array.isArray(content) ? content : [t(content)],
    children: [],
  }
}

function makeHeading(text, level = 2) {
  return {
    id: randomUUID(),
    type: "heading",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left", level, isToggleable: false },
    content: [t(text)],
    children: [],
  }
}

function makeTableCell(cellContent) {
  return {
    type: "tableCell",
    props: { colspan: 1, rowspan: 1, textColor: "default", textAlignment: "left", backgroundColor: "default" },
    content: typeof cellContent === "string" ? [t(cellContent)] : cellContent,
  }
}

function makeTable(rows) {
  const cols = rows[0]?.length ?? 0
  return {
    id: randomUUID(),
    type: "table",
    props: { textColor: "default" },
    content: {
      type: "tableContent",
      columnWidths: Array(cols).fill(null),
      rows: rows.map((cells) => ({ cells: cells.map((c) => makeTableCell(c)) })),
    },
    children: [],
  }
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
const NEW_TITLE = "Batel vs Água Verde: qual bairro escolher em Curitiba em 2026"
const NEW_DESC = "Batel custa mais, Água Verde entrega melhor custo-benefício. Compare preço do m², aluguel, segurança, rotina e perfil ideal em 2026."
const NEW_SEO_T = "Batel ou Água Verde em 2026? Comparativo por perfil"
const NEW_SEO_D = "Batel ganha em prestígio e valorização; Água Verde ganha em renda e liquidez. Comparativo por perfil — família, jovem, investidor e aposentado."

const titleChanged = article.title !== NEW_TITLE
const descChanged = article.description !== NEW_DESC
const seoTChanged = article.seo_meta_title !== NEW_SEO_T
const seoDChanged = article.seo_meta_description !== NEW_SEO_D

if (titleChanged) log.push(`[A] title sentence case`)
if (descChanged) log.push(`[A] description nova (versão GPT)`)
if (seoTChanged) log.push(`[A] seo_meta_title (era NULL)`)
if (seoDChanged) log.push(`[A] seo_meta_description (era NULL)`)

// ─────────────────────────────────────────────────────────────────
// B. Block 0 (lead) — abril → março
// ─────────────────────────────────────────────────────────────────
let count_b = 0
for (const block of body) {
  count_b += walkAndReplace(block, "Em abril de 2026 o m²", "Em março/2026, o m²")
}
if (count_b > 0) log.push(`[B] lead — "abril de 2026" → "março/2026"`)

// ─────────────────────────────────────────────────────────────────
// C. Block 3 (nota da tabela) — adicionar dupla leitura
// ─────────────────────────────────────────────────────────────────
const NOTA_DUPLA_MARKER = "leitura agregada por m²"
const idx3 = body.findIndex(
  (bl, i) =>
    i === 3 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Preços FipeZap")
)
if (idx3 >= 0 && !inlineToString(body[idx3].content).includes(NOTA_DUPLA_MARKER)) {
  body[idx3].content = [
    t("Preços FipeZap março/2026. A rentabilidade da tabela é uma "),
    b("leitura agregada por m²"),
    t(": aluguel médio anual dividido pelo preço médio do m². Em imóveis específicos bem posicionados para locação, especialmente unidades menores, a faixa de alto padrão pode subir para "),
    b("0,25-0,33% ao mês (cerca de 3% a 4% ao ano)"),
    t(" — abaixo da média de Curitiba (4,74% a.a., FipeZap). Ainda assim, Água Verde tende a render mais que Batel pela diferença de preço de entrada. Tempo médio é observação acompanhada pela FYMOOB nos últimos 12 meses; SESP-PR e Secovi não publicam tempo médio por bairro de forma padronizada."),
  ]
  log.push("[C] block 3 (nota tabela) — dupla leitura agregada vs específica + caveat tempo médio")
} else if (idx3 >= 0) {
  log.push("[C] block 3 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// D. Block 7 — "100% é apartamento"
// ─────────────────────────────────────────────────────────────────
const VERTICALIZADO_MARKER = "essencialmente verticalizado"
const idx7 = body.findIndex(
  (bl, i) =>
    i === 7 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("100% é apartamento")
)
if (idx7 >= 0 && !inlineToString(body[idx7].content).includes(VERTICALIZADO_MARKER)) {
  body[idx7].content = [
    t("Nas captações recentes da FYMOOB, mais da metade dos imóveis do Batel tem área acima de 150m² — comportamento de alto padrão consolidado. O bairro é "),
    b("essencialmente verticalizado"),
    t(", com casas de rua e casas em condomínio sendo presença marginal no estoque. Na Água Verde, o mix é mais variado: apartamentos, sobrados e casas de rua convivem, e cerca de um terço do estoque acompanhado ainda é casa."),
  ]
  log.push("[D] block 7 — '100% é apartamento' → 'essencialmente verticalizado'")
} else if (idx7 >= 0) {
  log.push("[D] block 7 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// E. Block 19 — heading "casal DINK"
// ─────────────────────────────────────────────────────────────────
let count_e = 0
for (const block of body) {
  count_e += walkAndReplace(block, "casal DINK", "casal sem filhos com dupla renda")
  count_e += walkAndReplace(block, "Casal DINK", "Casal sem filhos com dupla renda")
}
if (count_e > 0) log.push(`[E] "casal DINK" → "casal sem filhos com dupla renda" (${count_e} ocorrência(s))`)

// ─────────────────────────────────────────────────────────────────
// F. Block 31 — rentabilidade com dupla leitura
// ─────────────────────────────────────────────────────────────────
const RENT_MARKER = "leitura agregada por m²"
const idx31 = body.findIndex(
  (bl) =>
    bl.type === "bulletListItem" &&
    inlineToString(bl.content).includes("Rentabilidade 49% maior")
)
if (idx31 >= 0 && !inlineToString(body[idx31].content).includes(RENT_MARKER)) {
  body[idx31].content = [
    b("Rentabilidade visivelmente maior na leitura agregada por m²: "),
    t("~3,0% ao ano (Água Verde) vs ~2,0% (Batel). Num imóvel de R$ 1 milhão, a diferença para um equivalente em Batel fica na ordem de R$ 10 mil por ano no bolso. Em unidades específicas (1Q ou 2Q bem posicionados), a faixa de alto padrão pode se aproximar de "),
    b("0,25-0,33% ao mês"),
    t(" — ainda assim, Água Verde tende a render mais por causa do preço de entrada menor."),
  ]
  log.push("[F] block 31 — rentabilidade com dupla leitura")
} else if (idx31 >= 0) {
  log.push("[F] block 31 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// G. Block 35 — Airbnb suavizado
// ─────────────────────────────────────────────────────────────────
const AIRBNB_MARKER = "validação imóvel a imóvel"
const idx35 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Airbnb") &&
    inlineToString(bl.content).includes("Polo corporativo")
)
if (idx35 >= 0 && !inlineToString(body[idx35].content).includes(AIRBNB_MARKER)) {
  body[idx35].content = [
    b("Contra-argumento honesto: "),
    t("para locação por temporada, o Batel pode oferecer vantagem. O bairro concentra vida noturna, gastronomia, demanda corporativa e turismo de negócios — o que tende a sustentar diárias na faixa de R$ 400-700. Esse modelo costuma render mais que aluguel tradicional, mas exige operação ativa (check-in, limpeza, gestão de hóspedes), tem variação por sazonalidade, depende do regulamento do condomínio e tem risco de vacância. Não há índice público oficial de ocupação por bairro em Curitiba, então a conta precisa de validação imóvel a imóvel."),
  ]
  log.push("[G] block 35 (Airbnb) — '~10% a.a.' removido + validação imóvel a imóvel")
} else if (idx35 >= 0) {
  log.push("[G] block 35 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// H. Block 39 — "ironia clara"
// ─────────────────────────────────────────────────────────────────
const IRONIA_MARKER = "Vale notar que, em guias mais antigos"
const idx39 = body.findIndex(
  (bl) =>
    bl.type === "bulletListItem" &&
    inlineToString(bl.content).includes("Menor movimentação") &&
    inlineToString(bl.content).includes("ironia clara")
)
if (idx39 >= 0 && !inlineToString(body[idx39].content).includes(IRONIA_MARKER)) {
  body[idx39].content = [
    b("Menor movimentação e menos ruído. "),
    t("Vale notar que, em guias mais antigos, o Batel era apresentado como o bairro \"mais tranquilo\" — mas a realidade de 2026, com 5 obras simultâneas no Batel, inverteu esse cenário em alguns trechos do bairro."),
  ]
  log.push("[H] block 39 — 'ironia clara' suavizada")
} else if (idx39 >= 0) {
  log.push("[H] block 39 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// I. Block 46 — SESP-PR via Radar Gazeta do Povo
// ─────────────────────────────────────────────────────────────────
const SESP_RADAR_MARKER = "agregação consultada"
const idx46 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("SESP-PR") &&
    inlineToString(bl.content).includes("publica boletins por bairro")
)
if (idx46 >= 0 && !inlineToString(body[idx46].content).includes(SESP_RADAR_MARKER)) {
  body[idx46].content = [
    t("A agregação consultada, baseada em dados SESP-PR organizados por veículos como o "),
    link("https://www.gazetadopovo.com.br/parana/cidades/curitiba/seguranca/", "Radar Gazeta do Povo"),
    t(", coloca Água Verde no top 4 de crimes patrimoniais absolutos de Curitiba em H1/2025 (1.895 casos) — Batel fica fora do top 10. Leitura bruta: \"Batel é mais seguro\". Esse número precisa ser lido com cuidado: bairro com mais comércio, circulação e população flutuante tende a registrar mais ocorrências absolutas."),
  ]
  log.push("[I] block 46 — 'SESP-PR publica boletins por bairro' → 'agregação Radar Gazeta do Povo / SESP-PR'")
} else if (idx46 >= 0) {
  log.push("[I] block 46 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// J. Block 49 — callout: remover "iLove Curitiba e MySide"
// ─────────────────────────────────────────────────────────────────
let count_j = 0
for (const block of body) {
  count_j += walkAndReplace(block, "redação via iLove Curitiba e MySide agrega boletins. Crime patrimonial absoluto aparece na Radar da Gazeta do Povo, mas sem correção por densidade.", "redação via Radar Gazeta do Povo agrega boletins. Crime patrimonial absoluto aparece sem correção por densidade populacional ou comercial.")
}
if (count_j > 0) log.push(`[J] block 49 (callout) — fontes consolidadas em Radar Gazeta do Povo`)

// ─────────────────────────────────────────────────────────────────
// K. Block 54 — "Depende 100%" → "Depende principalmente"
// ─────────────────────────────────────────────────────────────────
let count_k = 0
for (const block of body) {
  count_k += walkAndReplace(block, "Depende 100% do que o casal valoriza", "Depende principalmente do que o casal valoriza")
}
if (count_k > 0) log.push(`[K] block 54 — 'Depende 100%' → 'Depende principalmente'`)

// ─────────────────────────────────────────────────────────────────
// L. Block 56 — CTA principal "Comparar bairros"
// ─────────────────────────────────────────────────────────────────
const CTA_NEW_TITLE = "Quer comparar bairros para o seu perfil?"
const idx56 = body.findIndex(
  (bl) =>
    bl.type === "ctaBox" &&
    bl.props?.title?.includes("rode a conta")
)
if (idx56 >= 0 && body[idx56].props.title !== CTA_NEW_TITLE) {
  body[idx56].props.title = CTA_NEW_TITLE
  body[idx56].props.description =
    "A FYMOOB cruza orçamento, rotina, tipo de imóvel e potencial de valorização para indicar bairros que fazem sentido para você — não só Batel × Água Verde."
  body[idx56].props.label = "Comparar bairros"
  log.push("[L] block 56 (CTA) — 'rode a conta' → 'Comparar bairros'")
} else if (idx56 >= 0) {
  log.push("[L] block 56 já atualizado — skip")
}

// ─────────────────────────────────────────────────────────────────
// M. Block 65 — aluguel Batel dupla leitura
// ─────────────────────────────────────────────────────────────────
const ALUGUEL_MARKER = "leitura agregada por m²"
const idx65 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("alugar no Batel e comprar na Água Verde")
)
if (idx65 >= 0 && !inlineToString(body[idx65].content).includes(ALUGUEL_MARKER)) {
  body[idx65].content = [
    t("Em 2026, alugar no Batel e comprar na Água Verde pode ser racional para quem não tem certeza de ficar 10+ anos. O aluguel no Batel tende a ficar próximo de "),
    b("0,17% ao mês"),
    t(" do valor do imóvel na leitura agregada por m² (R$ 29,90/m²/mês ÷ R$ 17.924/m² ≈ 1,67% a.a.) — barato em termos relativos. Comprar na Água Verde rende aluguel próximo de "),
    b("3% a.a."),
    t(". Para quem vai morar 15+ anos no Batel, comprar ainda faz sentido pelo \"aluguel não pago\" + reserva de valor — e em unidades menores e bem posicionadas, a faixa pode subir para 0,25-0,33% ao mês."),
  ]
  log.push("[M] block 65 (alugar Batel) — dupla leitura explícita")
} else if (idx65 >= 0) {
  log.push("[M] block 65 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// N. Block 76 — methodologyBox
// ─────────────────────────────────────────────────────────────────
const NEW_SOURCES = JSON.stringify([
  "FipeZap mar/2026 (FGV + Fipe + Zap) — preço m² por bairro",
  "Secovi-PR — Pesquisa de Locação CWB",
  "SESP-PR / Radar Gazeta do Povo — crimes patrimoniais (recorte agregado, sem correção por densidade)",
  "INEP — ENEM 2024",
  "IPPUC — definição oficial de bairros",
  "Loft — variação 12m por tipologia",
  "FYMOOB — observação complementar do estoque ativo",
])
const NEW_TREATMENT =
  "Rentabilidade calculada como aluguel anual ÷ preço de venda na leitura agregada por m². Em unidades específicas (1Q ou 2Q bem posicionados), a faixa de alto padrão pode subir para 0,25-0,33% ao mês (cerca de 3% a 4% ao ano), abaixo da média de Curitiba (4,74% a.a., FipeZap). Tempo médio para vender é observação FYMOOB acompanhada nos últimos 12 meses — não há índice oficial publicado por bairro. CRM FYMOOB usado como observação complementar de campo, não índice estatístico."

const idx76 = body.findIndex((bl) => bl.type === "methodologyBox")
if (idx76 >= 0) {
  let touched = false
  if (body[idx76].props.period !== "Março/2026 (FipeZap) + observação FYMOOB abril/2026") {
    body[idx76].props.period = "Março/2026 (FipeZap) + observação FYMOOB abril/2026"
    touched = true
  }
  if (body[idx76].props.sources !== NEW_SOURCES) {
    body[idx76].props.sources = NEW_SOURCES
    touched = true
  }
  if (body[idx76].props.treatment !== NEW_TREATMENT) {
    body[idx76].props.treatment = NEW_TREATMENT
    touched = true
  }
  if (body[idx76].props.lastUpdate !== "2026-05-02") {
    body[idx76].props.lastUpdate = "2026-05-02"
    touched = true
  }
  if (touched) log.push("[N] methodologyBox — period/sources/treatment atualizados")
  else log.push("[N] methodologyBox já atualizado — skip")
}

// ─────────────────────────────────────────────────────────────────
// O. Inserção: tabela inicial "Qual cabe no seu perfil?"
// ─────────────────────────────────────────────────────────────────
const TABELA_INICIAL_MARKER = "Qual cabe no seu perfil?"
const tabelaInicialExists = body.some(
  (bl) => bl.type === "heading" && inlineToString(bl.content).trim() === TABELA_INICIAL_MARKER
)
if (!tabelaInicialExists) {
  // Inserir após o lead (block 0) e antes do heading "O retrato em 4 números" (block 1)
  const idxRetrato = body.findIndex(
    (bl) =>
      bl.type === "heading" &&
      inlineToString(bl.content).includes("retrato em 4 números")
  )
  if (idxRetrato > 0) {
    const headingTabela = makeHeading("Qual cabe no seu perfil?", 2)
    const introTabela = makeParagraph([
      t("Antes do comparativo detalhado, um atalho de leitura: a tabela abaixo resume quem vence em cada perfil — o resto do post explica o porquê:"),
    ])
    const tabela = makeTable([
      ["Perfil", "Vence", "Por quê (resumo)"],
      ["Família com filhos pequenos", "Água Verde", "Mais área pelo mesmo orçamento, hospitais próximos e rotina mais prática"],
      ["Jovem solteiro ou casal sem filhos", "Batel", "Vida noturna, restaurantes, studios e endereço prestigiado"],
      ["Investidor de aluguel tradicional", "Água Verde", "Melhor relação entre preço de compra, liquidez e aluguel"],
      ["Aposentado ou família madura", "Água Verde", "Comércio a pé, hospitais, menos custo fixo e rotina mais calma"],
      ["Investidor de curta temporada", "Batel", "Demanda corporativa e turística maior — exige operação ativa"],
    ])
    body.splice(idxRetrato, 0, headingTabela, introTabela, tabela)
    log.push(`[O] tabela inicial "Qual cabe no seu perfil?" inserida antes de "O retrato em 4 números"`)
  } else {
    log.push("[O] !!! heading 'O retrato em 4 números' não encontrado")
  }
} else {
  log.push("[O] tabela inicial já existe — skip")
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
log.push(`[P] body: ${article.body.length} blocks → ${body.length} blocks`)
log.push(`[P] word_count: ${wordCount}, reading_time_min: ${readingTimeMin}`)

console.log("=".repeat(72))
console.log("Batel vs Água Verde — revisões")
console.log("=".repeat(72))
log.forEach((l) => console.log(l))
console.log("=".repeat(72))

if (DRY_RUN) {
  console.log("\n[DRY-RUN] sem persistência.")
  process.exit(0)
}

const update = { body, word_count: wordCount, reading_time_min: readingTimeMin }
if (titleChanged) update.title = NEW_TITLE
if (descChanged) update.description = NEW_DESC
if (seoTChanged) update.seo_meta_title = NEW_SEO_T
if (seoDChanged) update.seo_meta_description = NEW_SEO_D

const { error: upErr } = await sb.from("articles").update(update).eq("id", article.id)
if (upErr) {
  console.error("\n!!! Erro:", upErr)
  process.exit(1)
}
console.log("\n✅ Artigo salvo com sucesso.")
