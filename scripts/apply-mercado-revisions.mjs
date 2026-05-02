/**
 * Aplica TODAS as revisões aprovadas pelo Vinicius (validadas com ChatGPT)
 * no artigo `mercado-imobiliario-curitiba-2026` em 02/05/2026.
 *
 * Conjunto:
 *
 * A. Frontmatter:
 *   - title visível desfaz canibalização com `preco-metro-quadrado-curitiba-bairro`
 *   - description menos "telegráfica", mais evergreen
 *   - seo_meta_title alinhado
 *
 * B. Lead reescrito (block 0): da "filtro vs boom" pra "leitura de decisão"
 *
 * C. Conflito interno com PMQ — tabela top 10 valorização (block 8):
 *   - Bigorrilho 13.500 → 14.117 (FipeZap mar/26)
 *   - Ecoville 9.800 → Mossunguê (Ecoville) 14.062
 *   - Bom Retiro 10.300 → 10.623
 *   - Centro 8.100 → 8.430
 *   - Mercês 10.600 → 10.820
 *
 * D. UBS Bubble Index — wording cauteloso (blocks 12 + 15):
 *   - Curitiba NÃO foi avaliada pelo UBS — usar SP como referência
 *   - 21 cidades → 25 cidades
 *   - Score "-0,10" não publicado pelo UBS 2025 — remover
 *   - Adicionar link UBS 2025
 *
 * E. Endividamento famílias — fonte errada CRÍTICA (blocks 22 + 23 + 24):
 *   - "49,7%" → "49,9%" (BCB série RNDBF, fev/2026)
 *   - Distinguir estoque de dívida vs comprometimento mensal (29,7%)
 *   - Trocar fonte Peic/CNC por BCB direto
 *
 * F. Selic/COPOM datado (block 38):
 *   - Remover trecho "próximo COPOM (28-29/04) pode cortar"
 *
 * G. Rentabilidade por bairro CRM (blocks 30, 31, 35):
 *   - Reformular "FYMOOB pode entregar" → "observação complementar"
 *   - Adicionar caveat de amostra
 *
 * H. CTA rentabilidade (block 36):
 *   - Remover "não média genérica do agregado"
 *
 * I. ADEMI-PR contexto novo (blocks 49 + 50):
 *   - Adicionar queda 19% em lançamentos 2025
 *   - Adicionar mix: 45% studios+1Q, MCMV só 5%
 *
 * J. Comprar agora ou esperar (blocks 55-56-57):
 *   - Substituir 2 bullets por tabela 6 linhas (mais escaneável)
 *   - Reescrever parágrafo 57 como contexto + lead pra próxima seção
 *
 * K. Nova seção "Melhor bairro por objetivo":
 *   - Heading + tabela 5 linhas inserida ANTES da FAQ
 *
 * L. FAQ ajustes (blocks 60, 62, 57):
 *   - "0,45% ao mês" como faixa indicativa
 *   - "dados FYMOOB CRM" → "FipeZap por tipologia"
 *   - Bigorrilho R$ 13.500 → R$ 14.117
 *
 * IDEMPOTENTE: cada mudança tem marker textual de detecção. Re-rodar não corrompe.
 * Use --dry-run pra preview.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "mercado-imobiliario-curitiba-2026"

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data: article, error: readErr } = await sb
  .from("articles")
  .select("id, title, description, body, seo_meta_title, seo_meta_description, status, slug")
  .eq("slug", SLUG)
  .single()

if (readErr || !article) {
  console.error("Erro lendo artigo:", readErr)
  process.exit(1)
}

const body = JSON.parse(JSON.stringify(article.body))
const log = []

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────
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

function makeTableCell(textOrInline) {
  return {
    type: "tableCell",
    props: { colspan: 1, rowspan: 1, textColor: "default", textAlignment: "left", backgroundColor: "default" },
    content: typeof textOrInline === "string" ? [t(textOrInline)] : textOrInline,
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
      rows: rows.map((cells) => ({
        cells: cells.map((c) => makeTableCell(c)),
      })),
    },
    children: [],
  }
}

// ─────────────────────────────────────────────────────────────────
// A. Frontmatter
// ─────────────────────────────────────────────────────────────────
const NEW_TITLE = "Mercado imobiliário em Curitiba 2026: ainda vale comprar?"
const NEW_DESC =
  "Curitiba valorizou forte em 2025, mas aluguel rende menos e o crédito ficou mais seletivo. Veja onde ainda vale comprar ou investir em 2026."
const NEW_SEO_META_TITLE = "Mercado imobiliário em Curitiba 2026: vale comprar?"
const NEW_SEO_META_DESC = NEW_DESC

let titleChanged = article.title !== NEW_TITLE
let descChanged = article.description !== NEW_DESC
let seoTitleChanged = article.seo_meta_title !== NEW_SEO_META_TITLE
let seoDescChanged = article.seo_meta_description !== NEW_SEO_META_DESC

if (titleChanged) log.push(`[A] title atualizado`)
if (descChanged) log.push(`[A] description atualizada`)
if (seoTitleChanged) log.push(`[A] seo_meta_title atualizado`)
if (seoDescChanged) log.push(`[A] seo_meta_description atualizado`)

// ─────────────────────────────────────────────────────────────────
// B. Lead (block 0)
// ─────────────────────────────────────────────────────────────────
const LEAD_MARKER = "leitura de decisão"
const idx0 = body.findIndex(
  (bl, i) => i === 0 && bl.type === "paragraph" && inlineToString(bl.content).includes("Curitiba ficou 17,86%")
)
if (idx0 >= 0 && !inlineToString(body[idx0].content).includes(LEAD_MARKER)) {
  body[idx0].content = [
    t("Curitiba valorizou "),
    b("17,86% em 2025"),
    t(" e ficou entre as capitais que mais subiram no Brasil. Mas esse número não conta a história inteira. Em 2026, o mercado está mais seletivo: bairros como "),
    b("Ahú e Juvevê"),
    t(" ainda puxam valorização, enquanto o "),
    b("Batel"),
    t(" perde velocidade; o aluguel rende menos sobre o preço do imóvel; e o "),
    b("endividamento das famílias"),
    t(" limita a capacidade de financiamento. A pergunta não é só se vale comprar em Curitiba — é "),
    b("onde, com qual objetivo e a que preço"),
    t(". Este post é leitura de decisão, não previsão."),
  ]
  log.push("[B] block 0 (lead) reescrito")
} else if (idx0 >= 0) {
  log.push("[B] block 0 já tem marker novo — skip")
} else {
  log.push("[B] !!! block 0 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// C. Tabela top 10 valorização (block 8)
// ─────────────────────────────────────────────────────────────────
// Estratégia: identificar a tabela cujas células contém "Ahú" + "Juvevê" + "Batel"
// e atualizar cells específicas.
const idxTabela = body.findIndex((bl) => {
  if (bl.type !== "table") return false
  const flat = (bl.content?.rows ?? [])
    .map((r) => r.cells.map((c) => inlineToString(c.content)).join(" | "))
    .join("\n")
  return flat.includes("Ahú") && flat.includes("Juvevê") && flat.includes("Batel")
})

if (idxTabela >= 0) {
  const updates = {
    "Bigorrilho": "R$ 14.117",
    "Ecoville": "R$ 14.062",
    "Bom Retiro": "R$ 10.623",
    "Centro": "R$ 8.430",
    "Mercês": "R$ 10.820",
  }
  let touched = 0
  for (const row of body[idxTabela].content.rows) {
    const bairro = inlineToString(row.cells[0]?.content ?? []).trim()
    // Atualizar nome Ecoville → Mossunguê (Ecoville)
    if (bairro === "Ecoville") {
      row.cells[0].content = [t("Mossunguê (Ecoville)")]
      touched++
    }
    if (updates[bairro]) {
      const currentPrice = inlineToString(row.cells[1]?.content ?? []).trim()
      const newPrice = updates[bairro]
      if (currentPrice !== newPrice) {
        row.cells[1].content = [t(newPrice)]
        touched++
      }
    }
  }
  if (touched > 0) {
    log.push(`[C] block ${idxTabela} (tabela top 10) — ${touched} células atualizadas pra FipeZap mar/26`)
  } else {
    log.push("[C] tabela top 10 já tem números FipeZap — skip")
  }
} else {
  log.push("[C] !!! tabela top 10 não encontrada")
}

// ─────────────────────────────────────────────────────────────────
// D. UBS Bubble Index — block 12 (abertura "Tem bolha")
// ─────────────────────────────────────────────────────────────────
const UBS_INTRO_MARKER = "Curitiba não está na lista"
const idx12 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("UBS Global Real Estate Bubble Index") &&
    inlineToString(bl.content).includes("21 cidades")
)
const idx12Alt =
  idx12 >= 0
    ? idx12
    : body.findIndex(
        (bl) =>
          bl.type === "paragraph" &&
          inlineToString(bl.content).includes("UBS Global Real Estate Bubble Index") &&
          inlineToString(bl.content).includes("não, não tem bolha clássica")
      )

if (idx12Alt >= 0 && !inlineToString(body[idx12Alt].content).includes(UBS_INTRO_MARKER)) {
  body[idx12Alt].content = [
    t("Resposta objetiva: não, não tem bolha clássica em Curitiba em 2026. Curitiba não está na lista do "),
    link(
      "https://www.ubs.com/global/en/media/display-page-ndp/en-20250923-grebi25.html",
      "UBS Global Real Estate Bubble Index 2025"
    ),
    t(" — então o relatório não permite dizer que a cidade foi classificada formalmente. Como referência brasileira, São Paulo é a única cidade do país avaliada e aparece em "),
    b("baixo risco de bolha"),
    t(", a categoria mais segura entre as 25 cidades globais analisadas. Aplicando os mesmos fundamentos pra leitura indireta de Curitiba, o cenário se divide em fortalezas e alertas:"),
  ]
  log.push("[D] block 12 (UBS abertura) — wording cauteloso, não afirma classificação Curitiba")
} else if (idx12Alt >= 0) {
  log.push("[D] block 12 já tem marker novo — skip")
} else {
  log.push("[D] !!! block 12 (UBS) não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// D.2 UBS bullet (block 15 — "UBS 2025: SP -0,10")
// ─────────────────────────────────────────────────────────────────
const UBS_BULLET_MARKER = "preços ainda estão"
const idx15 = body.findIndex(
  (bl) =>
    bl.type === "bulletListItem" &&
    inlineToString(bl.content).includes("UBS 2025") &&
    inlineToString(bl.content).includes("São Paulo")
)
if (idx15 >= 0 && !inlineToString(body[idx15].content).includes(UBS_BULLET_MARKER)) {
  body[idx15].content = [
    b("UBS 2025: "),
    t("São Paulo está na categoria "),
    b("baixo risco de bolha"),
    t(" — mesma de Londres, Paris, Milão, Nova York, San Francisco e Hong Kong. Entre as 25 cidades avaliadas, SP é a de "),
    b("menor risco"),
    t(". Em termos reais (descontada inflação), os preços em SP ainda estão ~20% abaixo do pico de 2014."),
  ]
  log.push("[D.2] block 15 (UBS bullet) — fiel ao UBS 2025 + 25 cidades + contexto preços reais")
} else if (idx15 >= 0) {
  log.push("[D.2] block 15 já tem marker novo — skip")
} else {
  log.push("[D.2] !!! block 15 (UBS bullet) não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// E.1 Heading endividamento (block 22): 49,7% → 49,9%
// ─────────────────────────────────────────────────────────────────
const idx22 = body.findIndex(
  (bl) =>
    bl.type === "heading" &&
    inlineToString(bl.content).includes("49,7%") &&
    inlineToString(bl.content).includes("Endividamento")
)
if (idx22 >= 0) {
  body[idx22].content = [t("1. Endividamento das famílias em 49,9% da renda — recorde absoluto")]
  log.push("[E.1] block 22 (heading) — 49,7% → 49,9%")
} else {
  // verifica se já está em 49,9%
  const idx22b = body.findIndex(
    (bl) => bl.type === "heading" && inlineToString(bl.content).includes("49,9%")
  )
  log.push(idx22b >= 0 ? "[E.1] block 22 já tem 49,9% — skip" : "[E.1] !!! block 22 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// E.2 Parágrafo endividamento (block 23): adicionar comprometimento 29,7%
// ─────────────────────────────────────────────────────────────────
const ENDIV_MARKER = "comprometimento de renda"
const idx23 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("maior número da série histórica") &&
    inlineToString(bl.content).includes("metade da renda")
)
if (idx23 >= 0 && !inlineToString(body[idx23].content).includes(ENDIV_MARKER)) {
  body[idx23].content = [
    t("É o maior número da série histórica do Banco Central, iniciada em 2005. Acima do pico anterior ("),
    b("49,88% em julho/2022"),
    t(") e bem acima de qualquer ponto da crise 2015-2016. Importante distinguir: 49,9% é o "),
    b("estoque de dívida"),
    t(" das famílias dividido pela renda anual — não é "),
    b("metade da renda mensal indo pra dívida"),
    t(". A métrica mensal correta é o "),
    link(
      "https://dadosabertos.bcb.gov.br/dataset/29037-endividamento-das-familias-com-o-sistema-financeiro-nacional-em-relacao-a-renda-acumulada-dos",
      "comprometimento de renda"
    ),
    t(", que mede quanto do orçamento mensal vai pra pagamento de dívidas — está em "),
    b("29,7%"),
    t(" (BCB fev/2026). Mesmo distinguindo, o número agregado mostra famílias com pouco espaço pra assumir nova prestação — mesmo com Selic caindo."),
  ]
  log.push("[E.2] block 23 (parágrafo endividamento) — distinção estoque vs comprometimento + 29,7%")
} else if (idx23 >= 0) {
  log.push("[E.2] block 23 já tem marker novo — skip")
} else {
  log.push("[E.2] !!! block 23 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// E.3 Fonte (block 24): trocar Peic/CNC por BCB
// ─────────────────────────────────────────────────────────────────
const FONTE_MARKER = "série RNDBF"
const idx24 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).startsWith("Fonte:") &&
    inlineToString(bl.content).includes("Peic")
)
if (idx24 >= 0 && !inlineToString(body[idx24].content).includes(FONTE_MARKER)) {
  body[idx24].content = [
    b("Fonte:"),
    t(" "),
    link(
      "https://dadosabertos.bcb.gov.br/dataset/29037-endividamento-das-familias-com-o-sistema-financeiro-nacional-em-relacao-a-renda-acumulada-dos",
      "Banco Central — Endividamento das Famílias com o SFN em relação à renda 12m"
    ),
    t(" (série RNDBF, leitura de fevereiro/2026 divulgada em 27/04/2026)."),
  ]
  log.push("[E.3] block 24 (fonte) — Peic/CNC → BCB direto")
} else if (idx24 >= 0) {
  log.push("[E.3] block 24 já tem marker novo — skip")
} else {
  log.push("[E.3] !!! block 24 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// F. Selic/COPOM datado (block 38)
// ─────────────────────────────────────────────────────────────────
const COPOM_REMOVED_MARKER = "queda gradual da Selic ao longo de 2026"
const idx38 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("próximo COPOM") &&
    inlineToString(bl.content).includes("28-29/04")
)
if (idx38 >= 0 && !inlineToString(body[idx38].content).includes(COPOM_REMOVED_MARKER)) {
  body[idx38].content = [
    t("Selic está em "),
    b("14,75%"),
    t(" desde 18 de março de 2026. Mesmo com expectativa de queda gradual da Selic ao longo de 2026 — o mercado projeta encerrar o ano em torno de 13% — as taxas dos bancos no crédito imobiliário "),
    b("não acompanham 1:1"),
    t("."),
  ]
  log.push("[F] block 38 (Selic/COPOM) — removido trecho datado da reunião 28-29/04")
} else if (idx38 >= 0) {
  log.push("[F] block 38 já tem marker novo — skip")
} else {
  log.push("[F] !!! block 38 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// G.1 Block 30 — abertura rentabilidade
// ─────────────────────────────────────────────────────────────────
const RENT_INTRO_MARKER = "granularidade não está em fonte pública"
const idx30 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("FYMOOB pode entregar")
)
if (idx30 >= 0 && !inlineToString(body[idx30].content).includes(RENT_INTRO_MARKER)) {
  body[idx30].content = [
    t("O "),
    link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap"),
    t(" publica rentabilidade agregada de Curitiba (4,74% ao ano em mar/2026 — um dos três menores índices entre capitais avaliadas). Por bairro, a granularidade não está em fonte pública regular: Quinto Andar Index e FipeZap Locação cobrem alguns recortes; Secovi-PR publica m² aluguel por bairro mas não a relação aluguel/venda."),
  ]
  log.push("[G.1] block 30 (abertura rentabilidade) — FipeZap como fonte primária + caveat de cobertura pública")
} else if (idx30 >= 0) {
  log.push("[G.1] block 30 já tem marker novo — skip")
} else {
  log.push("[G.1] !!! block 30 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// G.2 Block 31 — intro dos bullets de faixa
// ─────────────────────────────────────────────────────────────────
const RENT_BULLET_INTRO_MARKER = "estoque ativo acompanhado pela FYMOOB"
const idx31 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("faixa que a gente vê")
)
if (idx31 >= 0 && !inlineToString(body[idx31].content).includes(RENT_BULLET_INTRO_MARKER)) {
  body[idx31].content = [
    t("Como "),
    b("observação complementar"),
    t(", o estoque ativo acompanhado pela FYMOOB em abril/2026 sugere três faixas claras de rentabilidade por perfil de bairro:"),
  ]
  log.push("[G.2] block 31 (intro bullets) — reformulado como observação complementar")
} else if (idx31 >= 0) {
  log.push("[G.2] block 31 já tem marker novo — skip")
} else {
  log.push("[G.2] !!! block 31 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// G.3 Block 35 — caveat + CTA inline
// ─────────────────────────────────────────────────────────────────
const RENT_CAVEAT_MARKER = "amostra reduzida"
const idx35 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Essas faixas são indicativas") &&
    inlineToString(bl.content).includes("fale com o time FYMOOB")
)
if (idx35 >= 0 && !inlineToString(body[idx35].content).includes(RENT_CAVEAT_MARKER)) {
  body[idx35].content = [
    b("Caveat: "),
    t("essas faixas vêm de uma amostra reduzida (~242 imóveis em 66 bairros, snapshot abr/2026) e podem ter viés de captação, já que o portfólio FYMOOB tende a alto-padrão. Use como sinal direcional, não como número fechado pra modelar investimento. Antes de fechar, triangular com FipeZap Locação e pesquisa Secovi-PR. Pra cálculo fechado em um imóvel específico, "),
    link(
      "https://wa.me/554199978-0517?text=Gostaria%20de%20calcular%20a%20rentabilidade%20de%20um%20im%C3%B3vel%20em%20Curitiba",
      "fale com o time FYMOOB"
    ),
    t(" — a gente cruza o aluguel observado por tipologia/bairro com o preço do imóvel-alvo."),
  ]
  log.push("[G.3] block 35 (caveat + CTA inline) — adicionado caveat + removido 'fechamento real do bairro vs média genérica'")
} else if (idx35 >= 0) {
  log.push("[G.3] block 35 já tem marker novo — skip")
} else {
  log.push("[G.3] !!! block 35 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// H. CTA rentabilidade (block 36) — refinar copy
// ─────────────────────────────────────────────────────────────────
const idx36 = body.findIndex(
  (bl) =>
    bl.type === "ctaBox" &&
    bl.props?.title === "Calcule a rentabilidade real do seu investimento"
)
const NEW_CTA_DESC =
  "Informe bairro, tipo de imóvel e preço-alvo. A FYMOOB cruza aluguel observado por tipologia, liquidez do bairro e custo de aquisição pra estimar a faixa realista de retorno."
if (idx36 >= 0 && body[idx36].props.description !== NEW_CTA_DESC) {
  body[idx36].props.description = NEW_CTA_DESC
  body[idx36].props.label = "Calcular rentabilidade"
  log.push("[H] block 36 (CTA rentabilidade) — copy refinada (sem 'média genérica do agregado')")
} else if (idx36 >= 0) {
  log.push("[H] block 36 (CTA) já atualizado — skip")
} else {
  log.push("[H] !!! block 36 (CTA) não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// I. ADEMI-PR contexto (blocks 49 + 50)
// ─────────────────────────────────────────────────────────────────
const ADEMI_HEADING_MARKER = "queda de 19% em lançamentos"
const idx49 = body.findIndex(
  (bl) =>
    bl.type === "heading" &&
    inlineToString(bl.content).includes("Estoque ADEMI-PR em ~13 meses")
)
if (idx49 >= 0 && !inlineToString(body[idx49].content).includes(ADEMI_HEADING_MARKER)) {
  body[idx49].content = [
    t("2. Estoque ADEMI-PR em ~13 meses de venda — em meio a queda de 19% em lançamentos"),
  ]
  log.push("[I.1] block 49 (heading ADEMI) — adicionado contexto queda 19%")
} else if (idx49 >= 0) {
  log.push("[I.1] block 49 já tem marker novo — skip")
} else {
  log.push("[I.1] !!! block 49 (heading ADEMI) não encontrado")
}

const ADEMI_PARA_MARKER = "Brain Inteligência Estratégica"
const idx50 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Considerado saudável historicamente")
)
if (idx50 >= 0 && !inlineToString(body[idx50].content).includes(ADEMI_PARA_MARKER)) {
  body[idx50].content = [
    t("A pesquisa anual da "),
    link(
      "https://ademipr.com.br/mercado-imobiliario-de-curitiba-mantem-valorizacao-com-queda-no-estoque-e-perspectivas-para-novos-lancamentos/",
      "ADEMI-PR"
    ),
    t(", conduzida pela Brain Inteligência Estratégica e divulgada em março/2026, mostrou três sinais simultâneos: lançamentos caíram "),
    b("19% em 2025"),
    t(" vs 2024 (sinal de cautela das incorporadoras), vendas estáveis ("),
    b("10.200 unidades"),
    t(") produzindo R$ 7,4 bi em VGV, e mix concentrado em compactos — "),
    b("45% dos lançamentos foram studios ou 1 dormitório"),
    t("; MCMV foi só "),
    b("5%"),
    t(" dos projetos. Considerado saudável historicamente, o estoque de 13 meses é puxado por construtoras locais que seguram preço acima do mercado. Se uma decide rodar estoque com desconto agressivo, pode vazar no preço da cidade. O sinal de queda em lançamentos amortece esse risco mas não elimina."),
  ]
  log.push("[I.2] block 50 (parágrafo ADEMI) — expandido com queda 19%, mix 45% studios, MCMV 5%")
} else if (idx50 >= 0) {
  log.push("[I.2] block 50 já tem marker novo — skip")
} else {
  log.push("[I.2] !!! block 50 (parágrafo ADEMI) não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// J + K. Reestruturar "Comprar agora ou esperar" + nova seção "Melhor bairro por objetivo"
// ─────────────────────────────────────────────────────────────────
// Estratégia: detectar marker da nova tabela "Situação do comprador" — se já existe, skip tudo.
// Senão, encontrar os 2 bullets (block 55-56) + paragrafo 57 e substituir por:
//   tabela "Comprar agora ou esperar?" + paragrafo curto + heading "Melhor bairro por objetivo" + tabela "objetivo"

const COMPRAR_TABLE_MARKER = "Situação do comprador"
const objetivoHeadingExists = body.some(
  (bl) =>
    bl.type === "heading" &&
    inlineToString(bl.content).trim() === "Melhor bairro por objetivo"
)
const tabelaExists = body.some(
  (bl) =>
    bl.type === "table" &&
    (bl.content?.rows ?? []).some((r) =>
      r.cells.some((c) => inlineToString(c.content).includes(COMPRAR_TABLE_MARKER))
    )
)

if (!tabelaExists && !objetivoHeadingExists) {
  // Localizar os 2 bullets
  const bullet1Idx = body.findIndex(
    (bl) =>
      bl.type === "bulletListItem" &&
      inlineToString(bl.content).includes("aluguel hoje é menor que 0,45%")
  )
  const bullet2Idx = body.findIndex(
    (bl) =>
      bl.type === "bulletListItem" &&
      inlineToString(bl.content).includes("aluguel está em 0,50% ou mais")
  )
  // Paragrafo 57 ("Para a maioria dos compradores em Curitiba")
  const para57Idx = body.findIndex(
    (bl) =>
      bl.type === "paragraph" &&
      inlineToString(bl.content).includes("Para a maioria dos compradores em Curitiba")
  )

  if (bullet1Idx >= 0 && bullet2Idx >= 0 && para57Idx >= 0 && bullet2Idx === bullet1Idx + 1 && para57Idx === bullet2Idx + 1) {
    // Construir tabela "Comprar agora ou esperar?"
    const tableComprar = makeTable([
      ["Situação do comprador", "Melhor decisão em 2026", "Motivo"],
      ["Paga aluguel acima de 0,50% do valor do imóvel", "Comprar pode fazer sentido", "Aluguel já compete com custo de posse"],
      ["Paga aluguel abaixo de 0,45%", "Esperar pode ser racional", "Juros ainda pesam e aluguel não pressiona"],
      ["Compra pra morar 7+ anos", "Comprar faz sentido", "Dilui custos de entrada e cartório"],
      ["Compra pra revender em 1-3 anos", "Cuidado", "ITBI, escritura, corretagem e juros comem ganho"],
      ["Investe pra renda mensal", "Escolher bairro por yield", "Centro, Portão, Água Verde tendem a render mais"],
      ["Investe pra valorização", "Escolher bairro em virada", "Ahú, Juvevê, Bom Retiro têm narrativa melhor"],
    ])

    // Parágrafo curto reformulado (substitui o longo + preserva cross-link
    // pro artigo casa-vs-apto, mas trocando "dados FYMOOB CRM" por "FipeZap
    // por tipologia" — o L.3 do plano)
    const novoPara = makeParagraph([
      t("Pra a maioria dos compradores em Curitiba a conta hoje empata: financiar imóvel similar ao alugado dá saída parecida. O ganho real está em "),
      b("trocar de bairro"),
      t(" — sair de uma região com aluguel/preço caro e valorização parada (Batel) pra uma região onde o ciclo está acelerando (Ahú, Juvevê, Bom Retiro). Pra quem ainda está decidindo entre apartamento e casa, o "),
      link("/blog/apartamento-ou-casa-curitiba", "comparativo casa ou apto em Curitiba"),
      t(" mostra a diferença de preço por bairro com base no FipeZap por tipologia."),
    ])

    // Nova seção "Melhor bairro por objetivo"
    const headingObjetivo = makeHeading("Melhor bairro por objetivo", 2)
    const tableObjetivo = makeTable([
      ["Objetivo", "Bairros pra olhar primeiro", "Cuidado"],
      ["Morar com liquidez", "Água Verde, Bigorrilho, Cabral", "Preço já alto"],
      ["Valorização patrimonial", "Ahú, Juvevê, Bom Retiro", "Entrada cara após alta recente"],
      ["Renda de aluguel", "Centro, Portão, Água Verde", "Vacância e perfil do inquilino"],
      ["Alto padrão", "Batel, Mossunguê (Ecoville)", "Yield menor, valorização travada no Batel"],
      ["Compra familiar", "Cabral, Água Verde, Bacacheri", "Filtrar escola, vaga e condomínio"],
    ])

    // Substituir bullets 55-56 + para57 (3 blocos) por:
    //   tableComprar + novoPara + headingObjetivo + tableObjetivo (4 blocos)
    body.splice(bullet1Idx, 3, tableComprar, novoPara, headingObjetivo, tableObjetivo)
    log.push(`[J] substituído 2 bullets + paragrafo (idx ${bullet1Idx}-${para57Idx}) por tabela "Comprar agora ou esperar?" + paragrafo + heading + tabela`)
    log.push(`[K] inserida nova seção "Melhor bairro por objetivo" com tabela 6 linhas`)
  } else {
    log.push(`[J/K] !!! não consegui localizar a sequência exata bullets+paragrafo (b1=${bullet1Idx}, b2=${bullet2Idx}, p=${para57Idx})`)
  }
} else {
  log.push(`[J/K] tabela "Comprar agora ou esperar?" e/ou seção "Melhor bairro por objetivo" já presentes — skip`)
}

// ─────────────────────────────────────────────────────────────────
// L.1 FAQ block 60 — "vale a pena investir": 0,45% como faixa indicativa
// ─────────────────────────────────────────────────────────────────
const FAQ_INVESTIR_MARKER = "faixa observada de 0,40-0,48%"
const idxFaq60 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Pra investidor focado em renda") &&
    inlineToString(bl.content).includes("Centro e Portão")
)
if (idxFaq60 >= 0 && !inlineToString(body[idxFaq60].content).includes(FAQ_INVESTIR_MARKER)) {
  body[idxFaq60].content = [
    t("Vale, com critérios. O mercado valorizou 17,86% em 2025 e Curitiba foi a 2ª capital mais valorizada do Brasil. Mas o aluguel rende em média "),
    b("4,74% ao ano"),
    t(" sobre o preço do imóvel (baixo historicamente — FipeZap mar/2026) e o risco está na escolha do bairro: Ahú e Juvevê estão valorizando duas vezes mais que Batel. Pra investidor focado em renda, bairros como Centro, Portão e Água Verde tendem a render mais (faixa observada de 0,40-0,48% ao mês na amostra acompanhada pela FYMOOB; triangular com FipeZap Locação). Pra valorização, os bairros em \"virada\" (Ahú, Juvevê, Bom Retiro) têm maior potencial."),
  ]
  log.push("[L.1] block FAQ vale a pena — '0,45%' substituído por faixa indicativa observada")
} else if (idxFaq60 >= 0) {
  log.push("[L.1] block FAQ vale a pena já tem marker novo — skip")
} else {
  log.push("[L.1] !!! FAQ vale a pena investir não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// L.2 FAQ block 62 — atualizar Bigorrilho R$ 13.500 → 14.117
// ─────────────────────────────────────────────────────────────────
const FAQ_PRECO_MARKER = "Mossunguê (R$ 14.062)"
const idxFaq62 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Média geral:") &&
    inlineToString(bl.content).includes("Bigorrilho")
)
if (idxFaq62 >= 0 && !inlineToString(body[idxFaq62].content).includes(FAQ_PRECO_MARKER)) {
  body[idxFaq62].content = [
    t("Média geral: ~"),
    b("R$ 11.621/m²"),
    t(" (FipeZap mar/2026, publicado por MySide). Bairros mais caros: "),
    b("Batel (R$ 17.924)"),
    t(", "),
    b("Bigorrilho (R$ 14.117)"),
    t(", "),
    b("Mossunguê (R$ 14.062)"),
    t(", "),
    b("Juvevê (R$ 13.897)"),
    t(". Bairros que mais valorizaram em 12 meses: Ahú "),
    b("+12,5%"),
    t(", Juvevê "),
    b("+11,5%"),
    t(", Bom Retiro "),
    b("+9,1%"),
    t(". Batel subiu só 6,5% — fica com preço alto e valorização abaixo da média da cidade."),
  ]
  log.push("[L.2] FAQ preço médio — atualizado pra FipeZap mar/26 + Bigorrilho 14.117 + Mossunguê adicionado")
} else if (idxFaq62 >= 0) {
  log.push("[L.2] FAQ preço médio já tem marker novo — skip")
} else {
  log.push("[L.2] !!! FAQ preço médio não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// L.3 Block 57 (FAQ "comprar agora") — "dados FYMOOB CRM" → "FipeZap por tipologia"
// ─────────────────────────────────────────────────────────────────
// Observação: o block 57 original foi mexido na seção J, então este bloco
// pode estar em outro índice agora. Procuro pelo texto.
const FAQ_CASA_MARKER = "FipeZap por tipologia"
const idxFaqCasa = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("decidindo entre apartamento e casa") &&
    inlineToString(bl.content).includes("dados FYMOOB CRM")
)
if (idxFaqCasa >= 0 && !inlineToString(body[idxFaqCasa].content).includes(FAQ_CASA_MARKER)) {
  // Reescrever este bloco (provavelmente o 57 antigo, agora em outro lugar)
  body[idxFaqCasa].content = [
    t("Trocar por imóvel em bairro de valorização acelerada (Ahú, Juvevê) pode fazer sentido — o ganho na valorização compensa a taxa maior do financiamento em 2026. Pra quem ainda está decidindo entre apartamento e casa, o "),
    link("/blog/apartamento-ou-casa-curitiba", "comparativo casa ou apto em Curitiba"),
    t(" mostra a diferença real de preço por bairro com base no FipeZap por tipologia."),
  ]
  log.push("[L.3] FAQ apto/casa — 'dados FYMOOB CRM' → 'FipeZap por tipologia'")
} else if (idxFaqCasa >= 0) {
  log.push("[L.3] FAQ apto/casa já tem marker novo — skip")
} else {
  // pode ser que tenha sumido na reestruturação J — verifica
  log.push("[L.3] FAQ apto/casa não encontrado (pode ter sido removido na seção J — verificar)")
}

// ─────────────────────────────────────────────────────────────────
// Re-cálculo word_count + reading_time_min
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
log.push(`[M] novo word_count: ${wordCount}, reading_time_min: ${readingTimeMin}`)

// ─────────────────────────────────────────────────────────────────
// Persistir
// ─────────────────────────────────────────────────────────────────
console.log("=".repeat(72))
console.log("Mercado Imobiliário CWB — revisões")
console.log("=".repeat(72))
log.forEach((l) => console.log(l))
console.log("=".repeat(72))

if (DRY_RUN) {
  console.log("\n[DRY-RUN] sem persistência. Re-rode sem --dry-run pra aplicar.")
  process.exit(0)
}

const update = {
  body,
  word_count: wordCount,
  reading_time_min: readingTimeMin,
}
if (titleChanged) update.title = NEW_TITLE
if (descChanged) update.description = NEW_DESC
if (seoTitleChanged) update.seo_meta_title = NEW_SEO_META_TITLE
if (seoDescChanged) update.seo_meta_description = NEW_SEO_META_DESC

const { error: upErr } = await sb
  .from("articles")
  .update(update)
  .eq("id", article.id)

if (upErr) {
  console.error("\n!!! Erro ao salvar:", upErr)
  process.exit(1)
}

console.log("\n✅ Artigo salvo com sucesso.")

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fymoob.com.br"
const cronSecret = process.env.CRON_SECRET
if (cronSecret) {
  for (const target of [`/blog/${SLUG}`, "/blog"]) {
    try {
      const r = await fetch(`${baseUrl}/api/revalidate?path=${encodeURIComponent(target)}&secret=${cronSecret}`, {
        method: "POST",
      })
      console.log(`revalidate ${target}: ${r.status}`)
    } catch (e) {
      console.warn(`revalidate ${target} failed:`, e.message)
    }
  }
} else {
  console.log("(sem CRON_SECRET local — pular revalidate; ISR pega na próxima visita)")
}
