/**
 * Aplica TODAS as revisões aprovadas pelo Vinicius (validadas com ChatGPT)
 * no artigo `quanto-custa-morar-batel-curitiba` em 02/05/2026.
 *
 * Conjunto:
 *
 * A. Frontmatter:
 *   - title: "Quanto Custa Morar..." → "Quanto custa morar..." (sentence case)
 *   - description: versão limpa GPT
 *   - seo_meta_title + seo_meta_description (eram NULL)
 *
 * B. Block 5 — fontes reordenadas (Tier 1 + FYMOOB observação complementar)
 * C. Block 6 — "80% num Condor Gourmet" → wording GPT sem precisão estatística
 * D. Block 51 (callout) — remover marcas, manter ponto editorial
 * E. Block 54 (tabela SP) — Itaim Bibi R$ 19.500-21.000 → R$ 19.511 (FipeZap mar/26)
 * F. Block 56 — "perde pra Itaim Bibi em 9-17%" → wording GPT
 * G. Block 60-61 — Pinheiros R$ 34.800 marcado como estimativa de ordem de grandeza
 * H. Block 86 — Decreto 2668/2025 + LC 149/2025 + EC 132/2023 wording GPT
 * I. Block 88 — rentabilidade ~2% → 3-4% a.a. (faixa 0,25-0,33% ao mês)
 * J. Block 95 (FAQ aluguel) — CRM rebaixado pra observação complementar
 * K. Block 109 (methodologyBox) — sources reordenados
 *
 * L. Adições GPT:
 *   - Block 90 (CTA) — "Quer que a gente rode a conta..." → "Simular meu custo no Batel"
 *   - Nova seção "Batel vs alternativas em Curitiba" (heading + tabela 6 linhas)
 *     inserida após o comparativo SP (block 61)
 *   - Nova seção "Quem deveria mesmo morar no Batel?" (heading + tabela 6 linhas)
 *     inserida antes de "Quem NÃO vai gostar"
 *   - 4 FAQs novas inseridas antes de "Próximo passo":
 *     - Qual renda precisa para morar no Batel?
 *     - Batel é bom para família?
 *     - Vale mais comprar ou alugar no Batel?
 *     - Batel é mais caro que Bigorrilho e Água Verde?
 *
 * IDEMPOTENTE: cada mudança tem marker textual de detecção. Use --dry-run.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "quanto-custa-morar-batel-curitiba"

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
      rows: rows.map((cells) => ({ cells: cells.map((c) => makeTableCell(c)) })),
    },
    children: [],
  }
}

// ─────────────────────────────────────────────────────────────────
// A. Frontmatter
// ─────────────────────────────────────────────────────────────────
const NEW_TITLE = "Quanto custa morar no Batel (Curitiba) em 2026"
const NEW_DESC =
  "Veja quanto custa morar no Batel em 2026 para solteiro, casal e família, com aluguel, condomínio, mercado, IPTU, escola, lazer e comparação com São Paulo."
const NEW_SEO_META_TITLE = "Quanto custa morar no Batel em 2026? Guia completo"
const NEW_SEO_META_DESC = NEW_DESC

const titleChanged = article.title !== NEW_TITLE
const descChanged = article.description !== NEW_DESC
const seoTitleChanged = article.seo_meta_title !== NEW_SEO_META_TITLE
const seoDescChanged = article.seo_meta_description !== NEW_SEO_META_DESC

if (titleChanged) log.push(`[A] title atualizado`)
if (descChanged) log.push(`[A] description atualizada`)
if (seoTitleChanged) log.push(`[A] seo_meta_title atualizado (era NULL)`)
if (seoDescChanged) log.push(`[A] seo_meta_description atualizado (era NULL)`)

// ─────────────────────────────────────────────────────────────────
// B. Block 5 — fontes da tabela
// ─────────────────────────────────────────────────────────────────
const FONTES_MARKER = "observação complementar do estoque ativo"
const idx5 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Valores mensais somando 9 rubricas") &&
    inlineToString(bl.content).includes("FYMOOB")
)
if (idx5 >= 0 && !inlineToString(body[idx5].content).includes(FONTES_MARKER)) {
  body[idx5].content = [
    t("Valores mensais somando 9 rubricas. "),
    b("Fontes primárias: "),
    link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap mar/2026"),
    t(", "),
    link(
      "https://www.curitiba.pr.gov.br/noticias/decreto-municipal-estabelece-nova-base-de-calculo-do-iptu-80-dos-imoveis-terao-imposto-corrigido-apenas-pela-inflacao-em-2026/81201",
      "Prefeitura CWB — IPTU 2026 (Decreto 2668/2025)"
    ),
    t(", Copel/Sanepar tarifas residenciais, "),
    link("https://secovi-pr.com.br/", "Secovi-PR"),
    t(", "),
    link("https://www.dieese.org.br/", "DIEESE-PR"),
    t(", com observação complementar do estoque ativo acompanhado pela FYMOOB. Cenários pra financiamento 30 anos SAC com 20% de entrada. Detalhe de cada rubrica nos H2 seguintes."),
  ]
  log.push("[B] block 5 (fontes) — Tier 1 com link + FYMOOB rebaixada")
} else if (idx5 >= 0) {
  log.push("[B] block 5 já tem marker novo — skip")
} else {
  log.push("[B] !!! block 5 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// C. Block 6 — Condor Gourmet 80%
// ─────────────────────────────────────────────────────────────────
const CONDOR_MARKER = "concentrar boa parte das compras"
const idx6 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("80% do mercado num Condor")
)
if (idx6 >= 0 && !inlineToString(body[idx6].content).includes(CONDOR_MARKER)) {
  body[idx6].content = [
    t("O número que pega: entre o solteiro (R$ 7.600) e a família (R$ 44.000), há um fator de "),
    b("5,8 vezes"),
    t(". A diferença não é só espaço — é estilo de vida. Solteiro em studio come fora com frequência; família com 2-3 filhos tende a concentrar boa parte das compras em supermercado de bairro de alto padrão (Condor Gourmet, Muffato Max), e não em atacarejo. Esse detalhe muda a conta mensal mais do que parece."),
  ]
  log.push("[C] block 6 (Condor Gourmet) — wording GPT sem precisão estatística falsa")
} else if (idx6 >= 0) {
  log.push("[C] block 6 já tem marker novo — skip")
} else {
  log.push("[C] !!! block 6 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// D. Block 51 — callout "Conta da vida real"
// ─────────────────────────────────────────────────────────────────
const CALLOUT_MARKER = "supermercado de bairro alto-padrão em vez de atacarejo"
const idx51 = body.findIndex(
  (bl) =>
    bl.type === "calloutBox" &&
    inlineToString(bl.content).includes("padrão clássico Batel")
)
if (idx51 >= 0 && !inlineToString(body[idx51].content).includes(CALLOUT_MARKER)) {
  body[idx51].content = [
    b("Conta da vida real: "),
    t("os 3 cenários assumem padrão de consumo compatível com Batel — supermercado de bairro alto-padrão em vez de atacarejo, academia boutique em vez de Smart Fit, iFood frequente em vez de comida caseira, 2 carros em vez de transporte público. Quem mora no Batel \"em modo econômico\" consegue cortar R$ 2-4 mil/mês trocando rotina (atacarejo + Smart Fit + transporte público). Mas daí a pergunta é: por que o Batel?"),
  ]
  log.push("[D] block 51 (callout vida real) — sem nome de marca + ponto editorial mantido")
} else if (idx51 >= 0) {
  log.push("[D] block 51 já tem marker novo — skip")
} else {
  log.push("[D] !!! block 51 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// E. Block 54 — tabela comparativo SP (Itaim Bibi)
// ─────────────────────────────────────────────────────────────────
const idxTabelaSP = body.findIndex(
  (bl) =>
    bl.type === "table" &&
    (bl.content?.rows ?? []).some((r) =>
      r.cells.some((c) => inlineToString(c.content).includes("Itaim Bibi"))
    )
)
if (idxTabelaSP >= 0) {
  let touched = 0
  for (const row of body[idxTabelaSP].content.rows) {
    const bairro = inlineToString(row.cells[0]?.content ?? []).trim()
    if (bairro === "Itaim Bibi (SP)") {
      const currentPrice = inlineToString(row.cells[1]?.content ?? []).trim()
      if (currentPrice !== "R$ 19.511") {
        row.cells[1].content = [t("R$ 19.511")]
        row.cells[2].content = [t("+8,9%")]
        touched++
      }
    }
  }
  if (touched > 0) {
    log.push(`[E] block ${idxTabelaSP} (tabela SP) — Itaim Bibi atualizado pra R$ 19.511 / +8,9%`)
  } else {
    log.push("[E] tabela SP já atualizada — skip")
  }
} else {
  log.push("[E] !!! tabela SP não encontrada")
}

// ─────────────────────────────────────────────────────────────────
// F. Block 56 — wording sobre Batel vs Itaim Bibi
// ─────────────────────────────────────────────────────────────────
const BATEL_NAOBARATO_MARKER = "Batel não é barato"
const idx56 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Batel é mais caro que Moema")
)
if (idx56 >= 0 && !inlineToString(body[idx56].content).includes(BATEL_NAOBARATO_MARKER)) {
  body[idx56].content = [
    b("Batel não é barato. "),
    t("Mas, comparado aos bairros de elite de São Paulo, ele entrega padrão urbano parecido com m² ainda abaixo de Itaim Bibi e Pinheiros. O mito \"Batel > São Paulo\" foi verdade em 2022. Em 2026, não é mais."),
  ]
  log.push("[F] block 56 — wording GPT (Batel não é barato + comparação amena)")
} else if (idx56 >= 0) {
  log.push("[F] block 56 já tem marker novo — skip")
} else {
  log.push("[F] !!! block 56 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// G. Block 61 — disclaimer da estimativa Pinheiros
// ─────────────────────────────────────────────────────────────────
const PINHEIROS_DISCLAIMER_MARKER = "estimativa de ordem de grandeza"
const idx61 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Profissional que recebe salário de capital paulista")
)
if (idx61 >= 0 && !inlineToString(body[idx61].content).includes(PINHEIROS_DISCLAIMER_MARKER)) {
  body[idx61].content = [
    t("Profissional que recebe salário de capital paulista e se muda pro Batel economiza ~R$ 12 mil/mês no mesmo padrão de vida. É esse o perfil que o Batel recebe com braços abertos em 2026. "),
    t("A comparação com Pinheiros é uma estimativa de ordem de grandeza, combinando preço do m², aluguel, serviços e padrão de consumo — serve pra comparar padrão de vida, não como mediana oficial do bairro.", { italic: true }),
  ]
  log.push("[G] block 61 (Pinheiros) — adicionado disclaimer de estimativa")
} else if (idx61 >= 0) {
  log.push("[G] block 61 já tem marker novo — skip")
} else {
  log.push("[G] !!! block 61 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// H. Block 86 — IPTU + Decreto 2668/2025
// ─────────────────────────────────────────────────────────────────
const DECRETO_MARKER = "Decreto Municipal nº 2668/2025"
const idx86 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("IPTU do Batel explodiu") &&
    inlineToString(bl.content).includes("decreto municipal")
)
if (idx86 >= 0 && !inlineToString(body[idx86].content).includes(DECRETO_MARKER)) {
  body[idx86].content = [
    b("\"IPTU do Batel explodiu em 2026.\" "),
    t("Não exatamente. O "),
    link(
      "https://www.legisweb.com.br/legislacao/?id=488328",
      "Decreto Municipal nº 2668/2025"
    ),
    t(", assinado em 19/12/2025, atualizou a Planta Genérica de Valores (PGV) do IPTU 2026 em Curitiba — sob a regra da "),
    link(
      "https://www.curitiba.pr.gov.br/noticias/decreto-municipal-estabelece-nova-base-de-calculo-do-iptu-80-dos-imoveis-terao-imposto-corrigido-apenas-pela-inflacao-em-2026/81201",
      "Lei Complementar 149/2025"
    ),
    t(" e da exigência da EC 132/2023 (Reforma Tributária). Segundo a Prefeitura, "),
    b("80% dos imóveis"),
    t(" tiveram correção apenas pela inflação. Pra imóveis com aumento real de valor venal, a trava de reajuste limita a alta anual a 18% + IPCA entre 2026 e 2029, salvo casos específicos como mudança de uso, reforma declarada ou correção de distorção histórica."),
  ]
  log.push("[H] block 86 (IPTU) — Decreto 2668/2025 + LC 149/2025 + EC 132/2023 com links")
} else if (idx86 >= 0) {
  log.push("[H] block 86 já tem marker novo — skip")
} else {
  log.push("[H] !!! block 86 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// I. Block 88 — rentabilidade Batel ~2% → 3-4% a.a.
// ─────────────────────────────────────────────────────────────────
const RENT_MARKER = "abaixo da média de Curitiba"
const idx88 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Comprar no Batel rende mais que investir em CDB") &&
    inlineToString(bl.content).includes("~2% a.a.")
)
if (idx88 >= 0 && !inlineToString(body[idx88].content).includes(RENT_MARKER)) {
  body[idx88].content = [
    b("\"Comprar no Batel rende mais que investir em CDB.\" "),
    t("Falso em 2026. Batel valorizou +6,5% em 12m (FipeZap mar/26), mas a "),
    b("rentabilidade de aluguel"),
    t(" tende a ficar abaixo da média de Curitiba (4,74% a.a., FipeZap) por ser bairro de alto padrão historicamente saturado. Faixa mais defensável pra Batel: "),
    b("0,25% a 0,33% ao mês (~3% a 4% ao ano)"),
    t(", dependendo do imóvel. Mesmo somando valorização e aluguel, o retorno total nominal fica perto de 9,5% a 10,5% ao ano — ainda abaixo de um CDB 100% CDI em parte de 2026 (~13% a.a.). Batel como investimento financeiro puro perde pro CDB. Só vence quando o objetivo é reserva de valor + uso próprio (morar) — então o \"aluguel não pago\" entra como receita."),
  ]
  log.push("[I] block 88 (rentabilidade Batel) — 2% → 3-4% a.a. com contexto premium")
} else if (idx88 >= 0) {
  log.push("[I] block 88 já tem marker novo — skip")
} else {
  log.push("[I] !!! block 88 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// J. Block 95 — FAQ aluguel
// ─────────────────────────────────────────────────────────────────
const FAQ_ALUGUEL_MARKER = "observação complementar do estoque acompanhado"
const idx95 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Faixas por tipologia em abril/2026") &&
    inlineToString(bl.content).includes("CRM FYMOOB")
)
if (idx95 >= 0 && !inlineToString(body[idx95].content).includes(FAQ_ALUGUEL_MARKER)) {
  body[idx95].content = [
    t("Faixas por tipologia em abril/2026: 1 quarto ou studio R$ 2.000-4.000/mês; 2 quartos R$ 3.500-6.500; 3 quartos 120m² (o mais comum) R$ 5.000-12.000; cobertura alto padrão R$ 10.000-30.000 ("),
    link("https://secovi-pr.com.br/", "Secovi-PR Pesquisa de Locação"),
    t(" + FipeZap Locação, com observação complementar do estoque acompanhado pela FYMOOB). Média do m² de aluguel no bairro é R$ 49/m², mas varia muito por subárea (Av. do Batel cobra prêmio; ruas internas saem mais barato)."),
  ]
  log.push("[J] block 95 (FAQ aluguel) — CRM FYMOOB rebaixada pra observação complementar")
} else if (idx95 >= 0) {
  log.push("[J] block 95 já tem marker novo — skip")
} else {
  log.push("[J] !!! block 95 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// K. Block 109 — methodologyBox sources
// ─────────────────────────────────────────────────────────────────
const NEW_SOURCES = [
  "FipeZap mar/2026 (FGV + Fipe + Zap)",
  "Prefeitura de Curitiba — Decreto 2668/2025 + LC 149/2025 (IPTU 2026)",
  "Copel — tarifa residencial",
  "Sanepar — tarifa residencial",
  "ANP — Síntese Semanal (gás e combustível)",
  "DIEESE-PR — cesta básica + salário mínimo necessário",
  "Secovi-PR — Pesquisa de Locação CWB",
  "Secovi-SP — comparativo aluguel SP",
  "FYMOOB — observação complementar do estoque ativo (~242 imóveis em 66 bairros, snapshot abr/2026)",
]
const NEW_SOURCES_JSON = JSON.stringify(NEW_SOURCES)
const idx109 = body.findIndex((bl) => bl.type === "methodologyBox")
if (idx109 >= 0 && body[idx109].props?.sources !== NEW_SOURCES_JSON) {
  body[idx109].props.sources = NEW_SOURCES_JSON
  body[idx109].props.lastUpdate = "2026-05-02"
  log.push("[K] block 109 (methodologyBox) — sources reordenados (Tier 1 + FYMOOB observação)")
} else if (idx109 >= 0) {
  log.push("[K] block 109 (methodologyBox) já atualizado — skip")
} else {
  log.push("[K] !!! block 109 (methodologyBox) não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// L.1 Block 90 — CTA principal "Simular meu custo no Batel"
// ─────────────────────────────────────────────────────────────────
const CTA_NEW_TITLE = "Quer saber se o Batel cabe no seu orçamento?"
const idx90 = body.findIndex(
  (bl) =>
    bl.type === "ctaBox" &&
    bl.props?.title?.includes("Quer que a gente rode a conta")
)
if (idx90 >= 0 && body[idx90].props.title !== CTA_NEW_TITLE) {
  body[idx90].props.title = CTA_NEW_TITLE
  body[idx90].props.description =
    "A FYMOOB cruza renda, financiamento, aluguel, condomínio, escola, carro e padrão de consumo pra simular se o Batel faz sentido — ou se outro bairro entrega melhor equilíbrio."
  body[idx90].props.label = "Simular meu custo no Batel"
  log.push("[L.1] block 90 (CTA principal) — atualizado pra simulação")
} else if (idx90 >= 0) {
  log.push("[L.1] block 90 já atualizado — skip")
} else {
  log.push("[L.1] !!! block 90 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// L.2 Inserir tabela "Batel vs alternativas em Curitiba" após block 61
// ─────────────────────────────────────────────────────────────────
const ALT_TABLE_MARKER = "Batel vs alternativas em Curitiba"
const altTableExists = body.some(
  (bl) => bl.type === "heading" && inlineToString(bl.content).trim() === ALT_TABLE_MARKER
)
if (!altTableExists) {
  // Localizar block 61 (último bloco do comparativo SP — "Profissional que recebe salário")
  const idxAfterSP = body.findIndex(
    (bl) =>
      bl.type === "paragraph" &&
      inlineToString(bl.content).includes("Profissional que recebe salário de capital paulista")
  )
  if (idxAfterSP >= 0) {
    const headingAlt = makeHeading("Batel vs alternativas em Curitiba", 2)
    const introAlt = makeParagraph([
      t("O comparativo com São Paulo é só metade da história. Pra muita gente que está olhando Batel, a decisão real é "),
      b("Batel ou outro bairro de Curitiba"),
      t(" — e a resposta varia bastante por objetivo:"),
    ])
    const tableAlt = makeTable([
      ["Se você quer...", "Batel", "Alternativa em Curitiba"],
      ["Alto padrão mais familiar", "Bom, mas caro", "Cabral ou Bigorrilho"],
      ["Vida urbana com menor custo", "Excelente, mas premium", "Água Verde"],
      ["Casa/quintal", "Fraco", "Santa Felicidade ou Cascatinha"],
      ["Investir pra aluguel", "Yield menor", "Centro, Portão, Água Verde"],
      ["Proximidade de serviços", "Excelente", "Água Verde e Bigorrilho"],
      ["Status e liquidez", "Muito forte", "Poucos substitutos diretos"],
    ])
    body.splice(idxAfterSP + 1, 0, headingAlt, introAlt, tableAlt)
    log.push(`[L.2] inserida seção "Batel vs alternativas em Curitiba" após block ${idxAfterSP} (3 blocos)`)
  } else {
    log.push("[L.2] !!! block 61 (paragrafo SP) não encontrado pra inserir tabela alternativas")
  }
} else {
  log.push('[L.2] tabela "Batel vs alternativas" já existe — skip')
}

// ─────────────────────────────────────────────────────────────────
// L.3 Inserir tabela "Quem deveria mesmo morar no Batel?" antes do "Quem NÃO vai gostar"
// ─────────────────────────────────────────────────────────────────
const QUEM_TABLE_MARKER = "Quem deveria mesmo morar no Batel?"
const quemTableExists = body.some(
  (bl) => bl.type === "heading" && inlineToString(bl.content).trim() === QUEM_TABLE_MARKER
)
if (!quemTableExists) {
  const idxQuemNaoGosta = body.findIndex(
    (bl) =>
      bl.type === "heading" &&
      inlineToString(bl.content).includes("Quem NÃO vai gostar")
  )
  if (idxQuemNaoGosta >= 0) {
    const headingQuem = makeHeading("Quem deveria mesmo morar no Batel?", 2)
    const introQuem = makeParagraph([
      t("Pra ser honesto: Batel não é pra todo perfil. A tabela abaixo mostra quem ganha morando lá e quem provavelmente paga mais sem ganhar tanto:"),
    ])
    const tableQuem = makeTable([
      ["Perfil", "Batel faz sentido?", "Por quê"],
      ["Solteiro renda alta", "Sim", "Studio, restaurantes, vida urbana e baixo deslocamento"],
      ["Casal sem filhos", "Sim, se valoriza conveniência", "Dá pra morar bem sem precisar de casa grande"],
      ["Família com 2 filhos", "Só com renda alta", "Escola, carro, mercado e condomínio elevam muito a conta"],
      ["Aposentado renda alta", "Sim", "Serviços próximos, saúde, segurança e vida caminhável"],
      ["Investidor de aluguel", "Nem sempre", "Yield tende a ser menor que bairros mais mistos"],
      ["Quem busca custo-benefício", "Não", "Água Verde, Bigorrilho, Cabral e Portão entregam melhor equilíbrio"],
    ])
    body.splice(idxQuemNaoGosta, 0, headingQuem, introQuem, tableQuem)
    log.push(`[L.3] inserida seção "Quem deveria mesmo morar no Batel?" antes de "Quem NÃO vai gostar" (3 blocos)`)
  } else {
    log.push("[L.3] !!! 'Quem NÃO vai gostar' não encontrado pra ancorar inserção")
  }
} else {
  log.push('[L.3] tabela "Quem deveria mesmo morar" já existe — skip')
}

// ─────────────────────────────────────────────────────────────────
// L.4 Inserir 4 FAQs novas antes de "Próximo passo"
// ─────────────────────────────────────────────────────────────────
const FAQ_RENDA_MARKER = "Qual renda precisa para morar no Batel?"
const faqRendaExists = body.some(
  (bl) =>
    bl.type === "heading" && inlineToString(bl.content).trim() === FAQ_RENDA_MARKER
)
if (!faqRendaExists) {
  const idxProximoPasso = body.findIndex(
    (bl) =>
      bl.type === "heading" &&
      inlineToString(bl.content).trim() === "Próximo passo"
  )
  if (idxProximoPasso >= 0) {
    const newFaqs = [
      makeHeading("Qual renda precisa para morar no Batel?", 3),
      makeParagraph([
        t("Solteiro confortável em studio: a partir de "),
        b("R$ 15-20 mil/mês"),
        t(" (cabe sem aperto). Casal sem filhos em 3Q: a partir de "),
        b("R$ 30-35 mil/mês"),
        t(" (folga real, com poupança). Família com 2 filhos em escola top ENEM: a partir de "),
        b("R$ 60-70 mil/mês"),
        t(" (sem apertar com escola particular premium). Quem ganha menos vive — mas a conta aperta. Pra esse perfil, Água Verde, Bigorrilho ou Ahú entregam padrão similar com R$ 4-8 mil/mês a menos."),
      ]),
      makeHeading("Batel é bom para família?", 3),
      makeParagraph([
        t("Sim, com renda alta. Batel concentra escolas top ENEM (Sion, Marista Santa Maria, Escola Internacional), pediátricos de referência (Pequeno Príncipe a 6 km), supermercados de alto padrão e parques bem mantidos. O ponto fraco é a densidade de obras simultâneas em 2026 (5 lançamentos), trânsito pesado em horário de pico e falta de ciclofaixa contínua. Famílias que valorizam silêncio + criança andando de bicicleta no bairro podem ficar melhor em Cabral, Mossunguê (Ecoville) ou Bacacheri. Ranking completo em "),
        link("/blog/melhores-bairros-familias-curitiba", "melhores bairros de Curitiba para famílias em 2026"),
        t("."),
      ]),
      makeHeading("Vale mais comprar ou alugar no Batel?", 3),
      makeParagraph([
        t("Pra "),
        b("uso próprio com horizonte de 7+ anos"),
        t(", comprar costuma fazer sentido — dilui custos de cartório/ITBI e o aluguel não pago entra como receita implícita. Pra "),
        b("flexibilidade ou investimento financeiro puro"),
        t(", alugar tende a vencer: o Batel rende ~3% a.a. de aluguel, abaixo do CDB. Quem revende em 1-3 anos paga ITBI, escritura e corretagem que comem boa parte do ganho. Comparativo de bancos pra financiar em "),
        link("/blog/financiamento-caixa-itau-bradesco-comparativo", "Caixa, Itaú, Bradesco e BRB"),
        t("."),
      ]),
      makeHeading("Batel é mais caro que Bigorrilho e Água Verde?", 3),
      makeParagraph([
        t("Sim, normalmente. FipeZap mar/26: Batel "),
        b("R$ 17.924/m²"),
        t(", Bigorrilho R$ 14.117/m², Água Verde R$ 12.178/m². Batel é ~27% mais caro que Bigorrilho e ~47% mais caro que Água Verde. Mas o "),
        b("padrão de consumo"),
        t(" (academia, restaurante, supermercado) também é maior no Batel — então o custo total mensal sobe ainda mais. Quem quer alto padrão em CWB com custo mais leve geralmente acaba em Bigorrilho ou Água Verde — ranking completo dos bairros em "),
        link("/blog/preco-metro-quadrado-curitiba-bairro", "preço do m² em Curitiba por bairro"),
        t("."),
      ]),
    ]
    body.splice(idxProximoPasso, 0, ...newFaqs)
    log.push(`[L.4] inseridas 4 FAQs novas antes de "Próximo passo" (8 blocos)`)
  } else {
    log.push('[L.4] !!! "Próximo passo" não encontrado pra ancorar FAQs')
  }
} else {
  log.push("[L.4] FAQs novas já presentes — skip")
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
console.log("Quanto Custa Morar no Batel — revisões")
console.log("=".repeat(72))
log.forEach((l) => console.log(l))
console.log("=".repeat(72))

if (DRY_RUN) {
  console.log("\n[DRY-RUN] sem persistência. Re-rode sem --dry-run pra aplicar.")
  process.exit(0)
}

const update = { body, word_count: wordCount, reading_time_min: readingTimeMin }
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
