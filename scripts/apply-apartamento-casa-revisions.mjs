/**
 * Aplica revisões aprovadas pelo Vinicius (validadas com ChatGPT) no
 * artigo `apartamento-ou-casa-curitiba` em 03/05/2026.
 *
 * Sprint B item 4. Plano em docs/seo/revisao-apartamento-ou-casa.md.
 *
 * Mudanças (15 in-place + 1 inserção):
 *
 * A. Frontmatter — title curto sentence case + description + seo_meta_*
 * B. Block 0 (lead) — simplificação de data
 * C. Block 2 (callout) — rebaixar CRM, sem cravar "+42%/23%" no início
 * D. Block 7 (Imobi Press) — wording cauteloso (sem cravar 49%/59%)
 * E. Block 9 — "mediana real" → "mediana observada"
 * F. Block 10 (tabela) — cabeçalho + nota de caveat
 * G. Block 13 — wording
 * H. Block 14 (tabela) — nota curta de caveat
 * I. Block 25 — Inpespar 2024 com nota
 * J. Block 47 — Decreto 2668/2025 + LC 149/2025 + EC 132/2023
 * K. Block 64 — +97% horizontais como referência histórica
 * L. Block 73 — FipeZap não cobre casas (versão técnica)
 * M. Block 79 — "casa-conceito" → "grupo casa"
 * N. Block 97 — CTA "Comparar casa × apartamento"
 * O. Block 3 — methodologyBox preenchido
 * P. Inserção — tabela inicial "Qual cabe no seu perfil?" (5 linhas)
 *
 * Substituições gerais:
 * - "casa-conceito" → "grupo casa" (multiple occurrences)
 * - "snapshot" → "recorte" (multiple occurrences)
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "apartamento-ou-casa-curitiba"

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
  if (node?.type === "table" && node.content?.rows) {
    for (const row of node.content.rows) {
      for (const cell of row.cells || []) {
        if (Array.isArray(cell.content)) count += walkAndReplace(cell.content, from, to)
      }
    }
  }
  return count
}

// ─────────────────────────────────────────────────────────────────
// A. Frontmatter
// ─────────────────────────────────────────────────────────────────
const NEW_TITLE = "Casa ou apartamento em Curitiba? Comparativo 2026"
const NEW_DESC = "Curitiba ainda mora mais em casa, mas o mercado vira apartamento. Compare preço, custos invisíveis, manutenção, pet, bairro e perfil ideal."
const NEW_SEO_T = "Casa ou apartamento em Curitiba? Comparativo 2026"
const NEW_SEO_D = "Curitiba ainda mora mais em casa, mas o mercado vira apartamento. Compare preço, custos invisíveis, manutenção, pet, bairro e perfil ideal."

const titleChanged = article.title !== NEW_TITLE
const descChanged = article.description !== NEW_DESC
const seoTChanged = article.seo_meta_title !== NEW_SEO_T
const seoDChanged = article.seo_meta_description !== NEW_SEO_D

if (titleChanged) log.push(`[A] title — sem número + sentence case`)
if (descChanged) log.push(`[A] description versão GPT`)
if (seoTChanged) log.push(`[A] seo_meta_title (era NULL)`)
if (seoDChanged) log.push(`[A] seo_meta_description (era NULL)`)

// ─────────────────────────────────────────────────────────────────
// B. Block 0 (lead) — simplificar data
// ─────────────────────────────────────────────────────────────────
let count_b = 0
for (const block of body) {
  count_b += walkAndReplace(block, "Em abril/2026, 59,3% dos curitibanos", "Em 2026, 59,3% dos curitibanos")
}
if (count_b > 0) log.push(`[B] block 0 (lead) — "abril/2026" → "2026" (evita redundância)`)

// ─────────────────────────────────────────────────────────────────
// C. Block 2 (callout) — rebaixar CRM, sem cravar +42/-23
// ─────────────────────────────────────────────────────────────────
const CALLOUT_MARKER = "diferença entre casa e apartamento muda muito por bairro"
const idx2 = body.findIndex(
  (bl, i) =>
    i === 2 &&
    bl.type === "calloutBox" &&
    inlineToString(bl.content).includes("60% das famílias")
)
if (idx2 >= 0 && !inlineToString(body[idx2].content).includes(CALLOUT_MARKER)) {
  body[idx2].content = [
    t("Em Curitiba, "),
    b("cerca de 60% das famílias ainda moram em casa"),
    t(" ("),
    link("https://www.bemparana.com.br/noticias/parana/curitiba-tem-mais-casas-ou-apartamentos-e-o-parana-pesquisa-responde/", "IBGE PNAD 2026"),
    t("), mas o apartamento avança rápido. Como observação complementar, no estoque acompanhado pela FYMOOB em abril/2026, a diferença entre casa e apartamento muda muito por bairro: no Portão, a casa aparece mais cara que o apartamento no valor mediano; em Água Verde, o sobrado entrega muito mais área pelo mesmo orçamento. "),
    b("A escolha depende do bairro."),
  ]
  log.push("[C] block 2 (callout) — CRM rebaixado, sem cravar +42/-23 no início")
}

// ─────────────────────────────────────────────────────────────────
// D. Block 7 (Imobi Press) — suavizar
// ─────────────────────────────────────────────────────────────────
const IMOBI_MARKER = "sinal de tendência, não como estatística oficial"
const idx7 = body.findIndex(
  (bl, i) =>
    i === 7 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Imobi Press")
)
if (idx7 >= 0 && !inlineToString(body[idx7].content).includes(IMOBI_MARKER)) {
  body[idx7].content = [
    t("A geração que está comprando reforça a tendência. Uma pesquisa nacional de 2025 citada pelo "),
    link("https://imobipress.com.br/", "Imobi Press"),
    t(" sugere que parte relevante dos jovens adultos pretende comprar imóvel nos próximos anos e que o apartamento aparece como preferência nesse grupo. Como a pesquisa primária não está disponível publicamente, o dado deve ser lido como sinal de tendência, não como estatística oficial. Em Curitiba, o "),
    link("https://inpespar.com.br/", "Inpespar/Radar Imobiliário (abril/2026)"),
    t(" registrou que 67% das buscas em portais imobiliários da cidade são por apartamento de até 70 m² — em 2023, eram 60%. É busca, não fechamento de venda. Mas o sinal é claro: o ponto ideal do mercado é o 2 quartos compacto."),
  ]
  log.push("[D] block 7 — Imobi Press suavizado (sem cravar 49%/59%)")
}

// ─────────────────────────────────────────────────────────────────
// E. Block 9 — "mediana real do CRM"
// ─────────────────────────────────────────────────────────────────
let count_e = 0
for (const block of body) {
  count_e += walkAndReplace(block, "mediana real do CRM FYMOOB", "mediana observada no estoque acompanhado pela FYMOOB")
}
if (count_e > 0) log.push(`[E] block 9 — "mediana real CRM" → "mediana observada"`)

// ─────────────────────────────────────────────────────────────────
// F. Block 10 (tabela comparativo) + nota
// ─────────────────────────────────────────────────────────────────
const idxTabela10 = body.findIndex(
  (bl) =>
    bl.type === "table" &&
    (bl.content?.rows ?? []).some((r) =>
      r.cells.some((c) => inlineToString(c.content).includes("R$/m² mediano CWB (CRM FYMOOB)"))
    )
)
if (idxTabela10 >= 0) {
  for (const row of body[idxTabela10].content.rows) {
    const first = inlineToString(row.cells[0]?.content ?? "")
    if (first === "R$/m² mediano CWB (CRM FYMOOB)") {
      row.cells[0].content = [t("R$/m² mediano (amostra FYMOOB, n=214)")]
      log.push("[F.1] tabela 10 — cabeçalho 'CRM FYMOOB' → 'amostra FYMOOB, n=214'")
      break
    }
  }
}

// Adicionar nota curta abaixo do block 11 (intro do block seguinte) — opcional via marker no block 11
const NOTA_AMOSTRA_MARKER = "Use como leitura direcional"
const idx11 = body.findIndex(
  (bl, i) =>
    i === 11 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("ranking puro de R$/m²")
)
if (idx11 >= 0 && !inlineToString(body[idx11].content).includes(NOTA_AMOSTRA_MARKER)) {
  body[idx11].content = [
    t("Amostra FYMOOB: n=214 imóveis com valor de venda declarado em abril/2026. Use como leitura direcional; para preço médio de mercado da cidade, a referência principal é "),
    link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap"),
    t(". Para ranking puro de R$/m² por bairro (sem cortar por tipo), veja "),
    link("/blog/preco-metro-quadrado-curitiba-bairro", "o mapa de preço por bairro"),
    t(". Para cruzar bairro com perfil de família, "),
    link("/blog/melhores-bairros-curitiba-2026", "confira o ranking dos melhores bairros 2026"),
    t("."),
  ]
  log.push("[F.2] block 11 — nota de amostra + cross-links")
}

// ─────────────────────────────────────────────────────────────────
// G. Block 13 — wording
// ─────────────────────────────────────────────────────────────────
let count_g = 0
for (const block of body) {
  count_g += walkAndReplace(
    block,
    "Estes são números do snapshot do CRM FYMOOB de 25/abril/2026",
    "Os números abaixo vêm do estoque acompanhado pela FYMOOB em 25/abril/2026"
  )
}
if (count_g > 0) log.push(`[G] block 13 — "snapshot do CRM FYMOOB" → "estoque acompanhado"`)

// ─────────────────────────────────────────────────────────────────
// H. Block 14 (tabela bairros) — adicionar nota antes do block 15
// ─────────────────────────────────────────────────────────────────
const NOTA_BAIRROS_MARKER = "Os dados FYMOOB vêm do estoque acompanhado em abril/2026"
const idx15 = body.findIndex(
  (bl, i) =>
    i === 15 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Em Água Verde, o ângulo")
)
if (idx15 >= 0 && !inlineToString(body[idx15].content).includes(NOTA_BAIRROS_MARKER)) {
  body[idx15].content = [
    b("Nota: "),
    t("os dados FYMOOB vêm do estoque acompanhado em abril/2026 e servem como observação de mercado, não como índice estatístico. As amostras por bairro são pequenas (n=4-11) e podem ter viés de captação. "),
    t("Em Água Verde, o ângulo \"casa mais barata\" e \"apartamento mais caro por m²\" convivem ao mesmo tempo — porque a casa é 2× maior em área. Quem compara valor absoluto vê casa 23% mais barata. Quem compara R$/m² unitário vê apartamento +176% mais caro que casa."),
  ]
  log.push("[H] block 15 — nota curta de caveat de amostra antes do contexto")
}

// ─────────────────────────────────────────────────────────────────
// I. Block 25 — Inpespar 2024
// ─────────────────────────────────────────────────────────────────
let count_i = 0
for (const block of body) {
  count_i += walkAndReplace(
    block,
    "1,3% do total (Inpespar 2024)",
    "1,3% do total (Inpespar 2024 — número antigo, mas a proporção historicamente é baixa)"
  )
}
if (count_i > 0) log.push(`[I] block 25 — Inpespar 2024 com caveat de data`)

// ─────────────────────────────────────────────────────────────────
// J. Block 47 — IPTU + Decreto
// ─────────────────────────────────────────────────────────────────
const DECRETO_MARKER = "Decreto Municipal 2668/2025"
const idx47 = body.findIndex(
  (bl) =>
    bl.type === "bulletListItem" &&
    inlineToString(bl.content).includes("alíquota residencial CWB de 0,20% a 0,65%")
)
if (idx47 >= 0 && !inlineToString(body[idx47].content).includes(DECRETO_MARKER)) {
  body[idx47].content = [
    b("IPTU: "),
    t("a alíquota residencial em Curitiba varia conforme o valor venal (faixa de 0,20% a 0,65%). Para 2026, o "),
    link("https://www.legisweb.com.br/legislacao/?id=488328", "Decreto Municipal 2668/2025"),
    t(" (assinado em 19/12/2025) atualizou a Planta Genérica de Valores, sob a regra da "),
    link("https://www.curitiba.pr.gov.br/noticias/decreto-municipal-estabelece-nova-base-de-calculo-do-iptu-80-dos-imoveis-terao-imposto-corrigido-apenas-pela-inflacao-em-2026/81201", "LC 149/2025"),
    t(" e da exigência da EC 132/2023 (Reforma Tributária). Segundo a Prefeitura, "),
    b("80% dos imóveis"),
    t(" tiveram correção apenas pelo IPCA em 2026. Apartamentos compactos com valor venal baixo podem entrar em faixas de isenção ou redução, conforme enquadramento cadastral."),
  ]
  log.push("[J] block 47 — IPTU com Decreto 2668/2025 + LC 149/2025 + EC 132/2023 nominados")
}

// ─────────────────────────────────────────────────────────────────
// K. Block 64 — +97% horizontais H1/2023
// ─────────────────────────────────────────────────────────────────
const HIST_MARKER = "referência histórica, não o retrato exato de 2026"
const idx64 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("+97% no primeiro semestre de 2023")
)
if (idx64 >= 0 && !inlineToString(body[idx64].content).includes(HIST_MARKER)) {
  body[idx64].content = [
    t("No outro eixo, lançamentos de casas em condomínio horizontal subiram "),
    b("+97% no primeiro semestre de 2023 contra o mesmo período de 2022"),
    t(", segundo "),
    link("https://www.ademi-pr.com.br/", "pesquisa ADEMI-PR"),
    t(". É uma referência histórica, não o retrato exato de 2026: a base era pequena (apenas 494 unidades em casas e lotes em condomínios fechados em CWB no semestre) e o mercado mudou desde então. Ainda assim, o dado mostra uma tendência importante — a casa isolada perde espaço, enquanto a casa em condomínio fechado ganhou relevância. Os bairros líderes na ocasião eram São Braz, Santa Felicidade, Pilarzinho e Campo Comprido."),
  ]
  log.push("[K] block 64 — +97% horizontais marcado como referência histórica")
}

// ─────────────────────────────────────────────────────────────────
// L. Block 73 — FipeZap não cobre casas
// ─────────────────────────────────────────────────────────────────
const FIPE_CASAS_MARKER = "FipeZap mostra melhor o comportamento de apartamentos prontos"
const idx73 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Casas grandes (≥3 quartos) tendem a valorizar")
)
if (idx73 >= 0 && !inlineToString(body[idx73].content).includes(FIPE_CASAS_MARKER)) {
  body[idx73].content = [
    t("Em Curitiba 2025, o "),
    link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap"),
    t(" registrou +6,52% de alta no m² médio de venda residencial — a 2ª maior em 11 anos. O índice mostra melhor o comportamento de apartamentos prontos do que de casas avulsas, porque os anúncios FipeZap são majoritariamente verticais. Apartamentos compactos (1 quarto) cresceram +7,80% em 12 meses no agregado nacional FipeZap; tipologias com 4 quartos ou mais, só +5,57%. Por isso, não dá para concluir que toda casa grande valoriza menos. O que dá para dizer é: apartamentos compactos têm liquidez mais visível nos índices, enquanto casas dependem mais de terreno, localização e escassez do bairro. Em bairros consolidados (Cabral, Juvevê, Cascatinha), o terreno embutido em casa térrea não desvaloriza — e bairros em tendência de alta podem inverter o jogo."),
  ]
  log.push("[L] block 73 — claim 'casas grandes valorizam menos' suavizado + limitação FipeZap explicada")
}

// ─────────────────────────────────────────────────────────────────
// M. casa-conceito → grupo casa (substituição global)
// ─────────────────────────────────────────────────────────────────
let count_m = 0
for (const block of body) {
  count_m += walkAndReplace(block, "casa-conceito (Casa avulsa + Sobrado + Casa em Condomínio)", "grupo casa (casa avulsa, sobrado e casa em condomínio)")
  count_m += walkAndReplace(block, "casa-conceito (Casa avulsa + Sobrado + Casa em Condomínio)", "grupo casa (casa avulsa, sobrado e casa em condomínio)")
  count_m += walkAndReplace(block, "casa-conceito mediana", "grupo casa — mediana")
  count_m += walkAndReplace(block, "casa-conceito", "grupo casa")
}
if (count_m > 0) log.push(`[M] "casa-conceito" → "grupo casa" (${count_m} ocorrência(s))`)

// ─────────────────────────────────────────────────────────────────
// snapshot → recorte (substituição global, exceto methodologyBox que será reescrito)
// ─────────────────────────────────────────────────────────────────
let count_snapshot = 0
for (const block of body) {
  if (block.type === "methodologyBox") continue
  count_snapshot += walkAndReplace(block, "snapshot 2026-04-25", "recorte 2026-04-25")
  count_snapshot += walkAndReplace(block, "no snapshot)", "no recorte)")
  count_snapshot += walkAndReplace(block, "no snapshot.", "no recorte.")
}
if (count_snapshot > 0) log.push(`[M.2] "snapshot" → "recorte" (${count_snapshot} ocorrência(s))`)

// ─────────────────────────────────────────────────────────────────
// N. Block 97 — CTA
// ─────────────────────────────────────────────────────────────────
const idx97 = body.findIndex(
  (bl) =>
    bl.type === "ctaBox" &&
    bl.props?.title?.includes("Procurando casa ou apartamento")
)
if (idx97 >= 0) {
  body[idx97].props.title = "Quer comparar casa × apartamento para o seu perfil?"
  body[idx97].props.description = "A FYMOOB cruza orçamento, bairro-alvo e custo total real (parcela + condomínio + manutenção amortizada) para indicar se casa ou apartamento faz mais sentido no seu caso."
  body[idx97].props.label = "Comparar casa × apartamento"
  log.push("[N] block 97 (CTA) — atualizado para 'Comparar casa × apartamento'")
}

// ─────────────────────────────────────────────────────────────────
// O. Block 3 — methodologyBox
// ─────────────────────────────────────────────────────────────────
const NEW_SAMPLE = "Brasil — IBGE Censo 2022 (cobertura nacional) e PNAD Contínua 2026 (719 mil domicílios em CWB). Curitiba — FipeZap mar/2026 (R$ 11.621/m² médio cidade); estoque acompanhado pela FYMOOB em abril/2026 (n=214 imóveis com valor de venda declarado em 66 bairros)."
const NEW_TREATMENT = "Fontes oficiais (IBGE, FipeZap, ADEMI-PR, STJ) usadas como referência primária. Observação FYMOOB usada como sinal direcional para diferença casa × apartamento por bairro — amostra reduzida (n=4-11 por bairro) com viés de captação (portfólio tende a alto-padrão). Cenário de manutenção amortizada (R$ 1.000-3.500/mês para casa de 200 m²) é construção autoral baseada em heurística internacional de gestão patrimonial (0,5-1% do valor do imóvel ao ano), não fonte primária publicada."

const idx3 = body.findIndex((bl) => bl.type === "methodologyBox")
if (idx3 >= 0) {
  let touched = false
  if (body[idx3].props.period !== "Março/2026 (FipeZap) + abril/2026 (PNAD + observação FYMOOB)") {
    body[idx3].props.period = "Março/2026 (FipeZap) + abril/2026 (PNAD + observação FYMOOB)"
    touched = true
  }
  if (body[idx3].props.sample !== NEW_SAMPLE) {
    body[idx3].props.sample = NEW_SAMPLE
    touched = true
  }
  if (body[idx3].props.treatment !== NEW_TREATMENT) {
    body[idx3].props.treatment = NEW_TREATMENT
    touched = true
  }
  if (body[idx3].props.lastUpdate !== "2026-05-03") {
    body[idx3].props.lastUpdate = "2026-05-03"
    touched = true
  }
  if (touched) log.push("[O] block 3 (methodologyBox) — period/sample/treatment/lastUpdate atualizados")
}

// ─────────────────────────────────────────────────────────────────
// P. Inserção: tabela inicial "Qual cabe no seu perfil?"
// ─────────────────────────────────────────────────────────────────
const TABELA_INICIAL_MARKER = "Qual cabe no seu perfil?"
const tabelaInicialExists = body.some(
  (bl) => bl.type === "heading" && inlineToString(bl.content).trim() === TABELA_INICIAL_MARKER
)
if (!tabelaInicialExists) {
  // Inserir após o lead (block 0) e antes do heading "Resposta direta" (block 1)
  const idxRespostaDireta = body.findIndex(
    (bl) =>
      bl.type === "heading" &&
      inlineToString(bl.content).trim() === "Resposta direta"
  )
  if (idxRespostaDireta > 0) {
    const headingTabela = makeHeading("Qual cabe no seu perfil?", 2)
    const introTabela = makeParagraph([
      t("Antes do comparativo detalhado, um atalho de leitura: a tabela abaixo resume quem tende a vencer em cada perfil — o resto do post explica o porquê:"),
    ])
    const tabela = makeTable([
      ["Perfil", "Tende a vencer", "Por quê (resumo)"],
      ["Solteiro ou casal jovem sem filhos", "Apartamento compacto", "Mais fácil viver sem carro em bairros como Centro, Batel, Bigorrilho e Água Verde"],
      ["Família com filhos pequenos", "Depende do bairro", "Apartamento novo em Bacacheri/Cabral/Mossunguê ou casa em Cascatinha/Santa Felicidade/Pilarzinho"],
      ["Família com filhos adolescentes", "Bairro pesa mais que tipologia", "Escola, deslocamento e segurança importam mais que casa ou apartamento isoladamente"],
      ["Investidor de aluguel", "Apartamento compacto", "Mais liquidez, demanda maior e gestão mais simples"],
      ["Quem quer espaço e quintal", "Casa ou sobrado", "Melhor para rotina com cachorro, jardim, oficina, brinquedos e área externa"],
    ])
    body.splice(idxRespostaDireta, 0, headingTabela, introTabela, tabela)
    log.push(`[P] tabela inicial "Qual cabe no seu perfil?" inserida antes de "Resposta direta"`)
  }
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
log.push(`[Q] body: ${article.body.length} blocks → ${body.length} blocks`)
log.push(`[Q] word_count: ${wordCount}, reading_time_min: ${readingTimeMin}`)

console.log("=".repeat(72))
console.log("Casa ou Apartamento — revisões")
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
