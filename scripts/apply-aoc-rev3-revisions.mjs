/**
 * Aplica 3ª intervenção no artigo `apartamento-ou-casa-curitiba` em 03/05/2026.
 * (1ª = revisão completa 25357f6 / 2ª = esta rodada de polimento.)
 *
 * Foco:
 *   1. Frontmatter — description "Comparativo casa × apartamento em
 *      Curitiba em 2026: IBGE, FipeZap, custos invisíveis..."
 *   2. Block 5 (callout resposta direta): wording mais específico
 *   3. Tabelas (block 13, 17): "CWB" / "Casa-conceito" → "Curitiba" /
 *      "Grupo casa"
 *   4. Block 19: "100% apto / 100% grupo casa" → versão consultiva
 *   5. Block 52 (frio): "menor temperatura média entre as capitais" →
 *      "está entre as capitais mais frias do Brasil"
 *   6. Block 53: "chuveiro 35% da conta" → "fatia relevante"
 *   7. Block 57 + 72 (pets): "juiz decide a favor" → suavizar
 *   8. Block 64: "casa em CWB no inverno pesa R$ 200-400" → "Em casas
 *      maiores, o aquecimento pode adicionar..."
 *   9. Block 82: "Casa de R$ 220 mil em Tatuquara existe" → caveat
 *  10. Block 95: Fontes IPTU — "Tabela IPTU e Decreto IPTU 2026" →
 *      "Decreto Municipal 2668/2025, LC 149/2025 e IPTU 2026"
 *  11. Block 99: "CRM FYMOOB — recorte 2026-04-25, n=214 imóveis CWB" →
 *      "Estoque acompanhado pela FYMOOB"
 *  12. Block 100 (CTA): "custo total real" → "custo total estimado"
 *  13. Substituições globais: "CWB" → "Curitiba" (texto corrido), "apto"
 *      → "apartamento", "DIY" → "por conta própria", "ROI" →
 *      "rentabilidade bruta", "studio/Studio" → "estúdio/Estúdio",
 *      "casa-vs-apto" → "casa × apartamento", pra/pro → para/para o
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "apartamento-ou-casa-curitiba"

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data: article, error: readErr } = await sb
  .from("articles")
  .select("id, slug, title, description, seo_meta_description, body")
  .eq("slug", SLUG)
  .single()

if (readErr || !article) {
  console.error("Erro lendo artigo:", readErr)
  process.exit(1)
}

const body = JSON.parse(JSON.stringify(article.body))
const log = []

const t = (text, styles = {}) => ({ type: "text", text, styles })
const b = (text) => t(text, { bold: true })
const link = (href, text, opts = {}) => ({
  type: "link",
  href,
  content: [opts.bold ? b(text) : t(text)],
})

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
        item.text = item.text.split(from).join(to)
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

// ──────────────────────────────────────────────────────────────────
// 0. Frontmatter — description e seo_meta_description
// ──────────────────────────────────────────────────────────────────
const NEW_DESC = "Comparativo casa × apartamento em Curitiba em 2026: IBGE, FipeZap, custos invisíveis, manutenção, condomínio, pet e decisão por bairro e perfil."
let descUpdate = null
let seoDescUpdate = null
if (article.description !== NEW_DESC) {
  descUpdate = NEW_DESC
  log.push(`[frontmatter] description atualizada para versão consolidada (IBGE + FipeZap + custos invisíveis)`)
}
if (article.seo_meta_description !== NEW_DESC) {
  seoDescUpdate = NEW_DESC
}

// ──────────────────────────────────────────────────────────────────
// Block-level rewrites
// ──────────────────────────────────────────────────────────────────

// Block 0 — "casa ou apto?" → "casa ou apartamento?"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "A pergunta \"casa ou apto?\" tem resposta diferente por bairro, perfil e prazo.", "A pergunta \"casa ou apartamento?\" tem resposta diferente por bairro, perfil, prazo e custo de manutenção.")
  if (n > 0) log.push(`[block 0] lead — "casa ou apto?" → "casa ou apartamento?"`)
}

// Block 5 (callout) — wording mais consultivo
{
  const blk = body[5]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "calloutBox" &&
    txt.includes("o sobrado entrega muito mais área pelo mesmo orçamento") &&
    !txt.includes("custo total de posse")
  ) {
    blk.content = [
      t("Em Curitiba, "),
      b("a maioria das famílias ainda mora em casa"),
      t(" ("),
      link("https://www.bemparana.com.br/noticias/parana/curitiba-tem-mais-casas-ou-apartamentos-e-o-parana-pesquisa-responde/", "IBGE PNAD 2026"),
      t("), mas o apartamento avança rápido. Como observação complementar, no estoque acompanhado pela FYMOOB em abril/2026, a diferença entre casa e apartamento muda muito por bairro: no Portão, casas e sobrados aparecem mais caros no valor mediano; em Água Verde, sobrados grandes podem custar menos que apartamentos menores em valor absoluto. "),
      b("A escolha depende do bairro, da rotina e do custo total de posse."),
    ]
    log.push(`[block 5] callout — wording consultivo + "custo total de posse"`)
  }
}

// Block 6 (methodology) — sample/sources "CWB" → "Curitiba" / "snapshot" → "recorte"
{
  const blk = body[6]
  if (blk?.type === "methodologyBox" && blk.props) {
    let touched = false
    if (typeof blk.props.sample === "string" && blk.props.sample.includes("719 mil domicílios em CWB")) {
      blk.props.sample = blk.props.sample.replaceAll("719 mil domicílios em CWB", "719 mil domicílios em Curitiba")
      touched = true
    }
    if (typeof blk.props.sources === "string" && blk.props.sources.includes("(CWB 59,3% casas / 40,5% aptos)")) {
      blk.props.sources = blk.props.sources
        .replaceAll("(CWB 59,3% casas / 40,5% aptos)", "(Curitiba 59,3% casas / 40,5% apartamentos)")
        .replaceAll("R$ 11.621/m² CWB", "R$ 11.621/m² em Curitiba")
        .replaceAll("R$ 587 mediano CWB", "R$ 587 mediano em Curitiba")
        .replaceAll("FYMOOB CRM snapshot 2026-04-25 (n=214 CWB", "Estoque acompanhado pela FYMOOB em abril/2026 (n=214 imóveis em Curitiba")
      touched = true
    }
    if (touched) log.push(`[block 6] methodology — "CWB" → "Curitiba"; "FYMOOB CRM snapshot" → "Estoque acompanhado"`)
  }
}

// Block 8 — "33,65% em apto"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " (33,65% em apto, segundo Censo)", " (33,65% em apartamento, segundo Censo)")
  if (n > 0) log.push(`[block 8] "33,65% em apto" → "em apartamento"`)
}

// Block 9 — "fatia de aptos em CWB"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " a fatia de aptos em CWB já é ", " a fatia de apartamentos em Curitiba já é ")
  if (n > 0) log.push(`[block 9] "fatia de aptos em CWB" → "apartamentos em Curitiba"`)
}

// Block 9 — "aptos crescendo +27%"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "com aptos crescendo +27% no estoque.", "com apartamentos crescendo +27% no estoque.")
  if (n > 0) log.push(`[block 9] "aptos crescendo" → "apartamentos crescendo"`)
}

// Block 13 (tabela) — "Mediana de venda CWB" / "Condomínio mensal CWB"
{
  const blk = body[13]
  if (blk?.type === "table" && blk.content?.rows) {
    let n = 0
    for (const row of blk.content.rows) {
      for (const cell of row.cells || []) {
        n += walkAndReplace(cell, "Mediana de venda CWB", "Mediana de venda em Curitiba")
        n += walkAndReplace(cell, "Condomínio mensal CWB", "Condomínio mensal em Curitiba")
      }
    }
    if (n > 0) log.push(`[block 13] tabela — "CWB" → "em Curitiba"`)
  }
}

// Block 16 — "casa-vs-apto"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "casa-vs-apto", "casa × apartamento")
  if (n > 0) log.push(`[block 16] "casa-vs-apto" → "casa × apartamento"`)
}

// Block 17 (tabela bairros) — "Casa-conceito mediana (n)" + "apto de 130 m²"
{
  const blk = body[17]
  if (blk?.type === "table" && blk.content?.rows) {
    let n = 0
    for (const row of blk.content.rows) {
      for (const cell of row.cells || []) {
        n += walkAndReplace(cell, "Casa-conceito mediana (n)", "Grupo casa mediana (n)")
        n += walkAndReplace(cell, "Apto mediana (n)", "Apartamento mediana (n)")
        n += walkAndReplace(cell, "Apto Portão é 1–2Q novo", "Apartamento Portão é de 1 a 2 quartos novo")
        n += walkAndReplace(cell, "apto de 130 m²", "apartamento de 130 m²")
      }
    }
    if (n > 0) log.push(`[block 17] tabela bairros — "Casa-conceito / Apto" → "Grupo casa / Apartamento"`)
  }
}

// Block 19 — "100% apto / 100% grupo casa" → versão consultiva
{
  const blk = body[19]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("100% apto") &&
    txt.includes("100% grupo casa") &&
    !txt.includes("Na amostra FYMOOB com n ≥ 3")
  ) {
    blk.content = [
      t("A regra de bolso \"casa é sempre mais barata\" só vale em parte do mapa. Em "),
      b("Xaxim"),
      t(" e "),
      b("Sítio Cercado"),
      t(", a casa custa mais que o apartamento (-15% e -17% no R$/m²) porque o estoque vertical desses bairros é compacto e mais barato por unidade. Em "),
      b("Cidade Industrial"),
      t(", a faixa popular faz a escolha quase neutra no orçamento. "),
      b("Na amostra FYMOOB com n ≥ 3"),
      t(", Bigorrilho, Batel, Centro, Mossunguê/Ecoville e Boa Vista aparecem praticamente só com apartamentos — por isso, casa não é uma opção representativa nesse recorte. Capão Raso, Fazendinha e São Braz aparecem majoritariamente no grupo casa dentro da amostra observada."),
    ]
    log.push(`[block 19] "100% apto / 100% grupo casa" → versão consultiva com caveat de amostra`)
  }
}

// Block 28 — "estoque de locação residencial CWB / Casa pra alugar em CWB / Studio/1Q / ROI 36 meses"
{
  const blk = body[28]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("estoque de locação residencial CWB") &&
    !txt.includes("estoque de locação residencial em Curitiba")
  ) {
    blk.content = [
      t("Apartamento compacto vence quase sempre. O estoque de locação residencial em Curitiba é "),
      b("1,3% do total"),
      t(" ("),
      link("https://hapenimoveis.com.br/blog/imobiliaria-curitiba/investir-em-imoveis-em-curitiba-em-2025/", "Inpespar 2024"),
      t(") e a maioria é apartamento. Casa para alugar em Curitiba é nicho. O aluguel residencial valorizou "),
      b("+10,98% em 12 meses até dezembro/2025"),
      t(" segundo FipeZap — quase o dobro da venda (+6,52% no fechamento de 2025). Estúdios e apartamentos de 1 quarto em bairros centrais entregam rentabilidade bruta de aluguel entre "),
      b("5,5% e 7% ao ano"),
      t(". Outro eixo de decisão paralelo é "),
      link("/blog/imovel-planta-vs-pronto-curitiba", "planta vs pronto"),
      t(", que muda a rentabilidade nos 36 meses iniciais."),
    ]
    log.push(`[block 28] investidor — "Studio/1Q / ROI / Casa pra alugar em CWB" reescrito`)
  }
}

// Block 31 — "casa de 200 m² em CWB"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Faixa típica para casa de 200 m² em CWB:", "Faixa típica para casa de 200 m² em Curitiba:")
  if (n > 0) log.push(`[block 31] "casa de 200 m² em CWB" → "em Curitiba"`)
}

// Block 35 — "DIY ou terceirizada"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " R$ 200 a R$ 600/mês (DIY ou terceirizada)", " R$ 200 a R$ 600/mês, fazendo por conta própria ou contratando terceiros")
  if (n > 0) log.push(`[block 35] "DIY ou terceirizada" → "fazendo por conta própria ou contratando terceiros"`)
}

// Block 52 (frio) — "menor temperatura média entre as capitais"
{
  const blk = body[52]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Curitiba tem a menor temperatura média entre as capitais") &&
    !txt.includes("está entre as capitais mais frias do Brasil")
  ) {
    blk.content = [
      t("Curitiba está entre as capitais mais frias do Brasil. No inverno, casa térrea tende a exigir mais aquecimento de ambiente, enquanto apartamento costuma ganhar calor passivo das paredes vizinhas. Em casa, o aquecimento de ambiente vira necessidade. Lenha de eucalipto seca para lareira em Curitiba roda "),
      b("R$ 560 a R$ 1.800 por temporada"),
      t(", dependendo do consumo e do fornecedor. Aquecedor a gás central ou aquecedor split em quartos só pesa em casa: em apartamento, paredes encostadas geram efeito caixa que reduz a necessidade."),
    ]
    log.push(`[block 52] "menor temperatura média entre as capitais / -2°C em julho" → versão suavizada`)
  }
}

// Block 53 — "chuveiro 35% da conta de luz"
{
  const blk = body[53]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("chuveiro — que sobe pra cerca de **35% da conta de luz no inverno paranaense**".replaceAll("**","")) &&
    !txt.includes("uma fatia relevante da conta")
  ) {
    blk.content = [
      t("No apartamento, o aquecimento elétrico costuma se concentrar no "),
      b("chuveiro"),
      t(", que pode representar uma fatia relevante da conta de luz no inverno (em Curitiba, observa-se algo em torno de 35%, contra cerca de 25% na média nacional). Mas o apartamento ganha calor passivo das paredes vizinhas (efeito caixa: paredes encostadas em outros apartamentos quentes). Apartamentos premium de Mossunguê, Batel e Bigorrilho com "),
      b("piscina aquecida"),
      t(" entregam vantagem real no inverno — o custo está embutido no condomínio."),
    ]
    log.push(`[block 53] "chuveiro sobe pra 35% da conta no inverno paranaense" → caveat`)
  }
}

// Block 57 (pets juiz decide a favor)
{
  const blk = body[57]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("juiz decide a favor do morador") &&
    !txt.includes("contestáveis, mas o caso concreto ainda pode depender")
  ) {
    blk.content = [
      t("A maioria dos condomínios em prédios novos em Curitiba aceita pets de pequeno e médio porte sem grande fricção (estimativa de mercado, abr/2026). Convenções antigas com proibição genérica tendem a ser contestáveis na justiça, mas o caso concreto ainda pode depender de barulho, higiene, segurança e regras de circulação. O conflito real costuma ser com cão grande (golden, labrador, são bernardo) em apartamento pequeno, onde a contrapartida é prática: elevador, área comum, barulho."),
    ]
    log.push(`[block 57] "juiz decide a favor do morador" → "tendem a ser contestáveis na justiça, mas caso concreto pode depender"`)
  }
}

// Block 59 (heading) — "5 estratégias pra decidir"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "5 estratégias pra decidir", "5 estratégias para decidir")
  if (n > 0) log.push(`[block 59] heading — "pra decidir" → "para decidir"`)
}

// Block 60 — "parcela do apto + condomínio"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "ao orçamento mensal antes de comparar com a parcela do apto + condomínio.", "ao orçamento mensal antes de comparar com a parcela do apartamento + condomínio.")
  if (n > 0) log.push(`[block 60] estratégia 1 — "parcela do apto" → "do apartamento"`)
}

// Block 61 — "peça orçamento de apto e casa"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " peça orçamento de apto e casa ", " peça orçamento de apartamento e casa ")
  if (n > 0) log.push(`[block 61] "orçamento de apto e casa" → "de apartamento e casa"`)
}

// Block 63 — "apto Centro/Batel poupa"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " apto Centro/Batel poupa R$ 1.200 a R$ 2.000/mês", " apartamento no Centro/Batel poupa R$ 1.200 a R$ 2.000/mês")
  if (n > 0) log.push(`[block 63] estratégia 4 — "apto Centro/Batel" → "apartamento no Centro/Batel"`)
}

// Block 64 — "casa em CWB no inverno pesa R$ 200 a R$ 400/mês"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " — casa em CWB no inverno pesa R$ 200 a R$ 400/mês a mais em conta de gás, lenha ou aquecimento elétrico de ambiente.",
    " — em casas maiores, o aquecimento no inverno pode adicionar R$ 200 a R$ 400/mês em gás, lenha ou energia, dependendo do padrão de uso."
  )
  if (n > 0) log.push(`[block 64] "casa em CWB no inverno pesa" → "em casas maiores... pode adicionar"`)
}

// Block 65 (heading) — "Mercado CWB 2025 (contexto)"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Mercado CWB 2025 (contexto)", "Mercado de Curitiba em 2025 (contexto)")
  if (n > 0) log.push(`[block 65] heading "Mercado CWB 2025" → "Mercado de Curitiba em 2025"`)
}

// Block 67 — "studios e 1 quarto"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " foram studios e 1 quarto — o público jovem e o investidor de compacto puxam o ciclo.", " foram estúdios e apartamentos de 1 quarto — o público jovem e o investidor de compacto puxam o ciclo.")
  if (n > 0) log.push(`[block 67] "studios e 1 quarto" → "estúdios e apartamentos de 1 quarto"`)
}

// Block 67 — "casas e lotes em condomínios fechados em CWB"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "casas e lotes em condomínios fechados em CWB no semestre", "casas e lotes em condomínios fechados em Curitiba no semestre")
  if (n > 0) log.push(`[block 67] "em CWB no semestre" → "em Curitiba no semestre"`)
}

// Block 67 — "casa morreu" → versão consultiva
// (já bem encaminhado: "a casa isolada perde espaço, enquanto a casa em
// condomínio fechado ganhou relevância". OK)

// Block 69 (heading FAQ) — "Casa custa menos que apto em Curitiba?"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Casa custa menos que apto em Curitiba?", "Casa custa menos que apartamento em Curitiba?")
  if (n > 0) log.push(`[block 69] heading FAQ — "apto" → "apartamento"`)
}

// Block 71 (heading FAQ) — "Apto pode proibir pet"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Apto pode proibir pet em Curitiba?", "Apartamento pode proibir pet em Curitiba?")
  if (n > 0) log.push(`[block 71] heading FAQ — "Apto pode proibir pet" → "Apartamento pode proibir pet"`)
}

// Block 72 (FAQ pet) — "Em CWB"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " Em CWB, prédios novos majoritariamente aceitam pets", " Em Curitiba, prédios novos costumam aceitar pets")
  if (n > 0) log.push(`[block 72] FAQ pet — "Em CWB, prédios novos majoritariamente aceitam" → "costumam aceitar"`)
}

// Block 74 — "casa de 200 m² em CWB"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "para casa de 200 m² em CWB:", "para casa de 200 m² em Curitiba:")
  if (n > 0) log.push(`[block 74] FAQ manutenção — "casa de 200 m² em CWB" → "em Curitiba"`)
}

// Block 78 — "100% apto" no FAQ
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " sair de \"59% em casa\" para \"100% apto\" levaria décadas no ritmo atual.", " sair de \"59% em casa\" para \"100% apartamento\" levaria décadas no ritmo atual.")
  if (n > 0) log.push(`[block 78] FAQ — "100% apto" → "100% apartamento"`)
}

// Block 78 — "casas caíram 6,8% e aptos cresceram"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "casas caíram 6,8% e aptos cresceram 53,7%", "casas caíram 6,8% e apartamentos cresceram 53,7%")
  if (n > 0) log.push(`[block 78] FAQ — "aptos cresceram" → "apartamentos cresceram"`)
}

// Block 78 — "40,5% em apto e 59,3% em casa"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "40,5% em apto e 59,3% em casa", "40,5% em apartamento e 59,3% em casa")
  if (n > 0) log.push(`[block 78] FAQ — "40,5% em apto" → "em apartamento"`)
}

// Block 79 (heading FAQ) — "Vale a pena casa ou apto pra família"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Vale a pena casa ou apto pra família com filhos pequenos?", "Vale a pena casa ou apartamento para família com filhos pequenos?")
  if (n > 0) log.push(`[block 79] heading FAQ — "casa ou apto pra família" → "casa ou apartamento para família"`)
}

// Block 82 (FAQ casa barata) — "No CRM FYMOOB / Casa de R$ 220 mil em Tatuquara existe"
{
  const blk = body[82]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("No CRM FYMOOB, grupo casa") &&
    !txt.includes("Na amostra FYMOOB, aparecem casas em Tatuquara em faixas próximas de R$ 220 mil")
  ) {
    blk.content = [
      t("Como observação complementar, no estoque acompanhado pela FYMOOB em abril/2026, o grupo casa (casa avulsa, sobrado e casa em condomínio) abaixo de R$ 400 mil se concentra em "),
      b("Tatuquara, Sítio Cercado, Campo de Santana e Cidade Industrial"),
      t(" — todos na zona sul/sudoeste. Na amostra FYMOOB, aparecem casas em Tatuquara em faixas próximas de R$ 220 mil, mas isso deve ser lido como recorte de estoque, não como preço médio do bairro. Em bairros nobres acima de R$ 1,5 milhão, a casa praticamente desaparece do estoque (apenas 4 imóveis do grupo casa em todo o universo de Curitiba com valor de venda no recorte)."),
    ]
    log.push(`[block 82] FAQ casa barata — "No CRM FYMOOB / Casa de R$ 220 mil existe" → caveat de recorte`)
  }
}

// Block 83 (heading FAQ) — "Apto em Curitiba rende mais que casa em aluguel?"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Apto em Curitiba rende mais que casa em aluguel?", "Apartamento em Curitiba rende mais que casa em aluguel?")
  if (n > 0) log.push(`[block 83] heading FAQ — "Apto rende mais" → "Apartamento rende mais"`)
}

// Block 84 (FAQ aluguel) — "estoque residencial em locação CWB / Aluguel residencial CWB / Studio e 1 quarto"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Sim, no agregado. O estoque residencial em locação CWB é ", "Sim, no agregado. O estoque residencial em locação em Curitiba é ")
    n += walkAndReplace(block, " e a esmagadora maioria é apto. Casa em locação residencial é nicho. Aluguel residencial CWB valorizou ", " e a maioria é apartamento. Casa em locação residencial é nicho. O aluguel residencial em Curitiba valorizou ")
    n += walkAndReplace(block, ") — quase o dobro da venda. Studio e 1 quarto em bairros centrais entregam rentabilidade bruta de aluguel entre 5,5% e 7% ao ano.", ") — quase o dobro da venda. Estúdios e apartamentos de 1 quarto em bairros centrais entregam rentabilidade bruta de aluguel entre 5,5% e 7% ao ano.")
  }
  if (n > 0) log.push(`[block 84] FAQ aluguel — "CWB / Studio / apto" → "Curitiba / estúdios / apartamento"`)
}

// Block 86 (Fontes) — "59,3% casas / 40,5% aptos em CWB"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " — 59,3% casas / 40,5% aptos em CWB", " — 59,3% casas / 40,5% apartamentos em Curitiba")
  if (n > 0) log.push(`[block 86] Fontes — "aptos em CWB" → "apartamentos em Curitiba"`)
}

// Block 87 — "aptos +96,79% em 22 anos"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " aptos +96,79% em 22 anos, casas +18,02%", " apartamentos +96,79% em 22 anos, casas +18,02%")
  if (n > 0) log.push(`[block 87] Fontes — "aptos +96,79%" → "apartamentos +96,79%"`)
}

// Block 88 — "m² médio CWB R$ 11.621"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " — m² médio CWB R$ 11.621, 2025 fechado +6,52%", " — m² médio em Curitiba R$ 11.621, 2025 fechado +6,52%")
  if (n > 0) log.push(`[block 88] Fontes — "m² médio CWB" → "em Curitiba"`)
}

// Block 89 — "67% das buscas por apto"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " — 67% das buscas por apto até 70 m²", " — 67% das buscas por apartamento até 70 m²")
  if (n > 0) log.push(`[block 89] Fontes — "67% buscas por apto" → "por apartamento"`)
}

// Block 90 — "R$ 587 mediano CWB"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " — R$ 587 mediano CWB, +25% ano a ano", " — R$ 587 mediano em Curitiba, +25% ano a ano")
  if (n > 0) log.push(`[block 90] Fontes — "R$ 587 mediano CWB" → "em Curitiba"`)
}

// Block 91 — "VGV apto novo"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " — R$ 7,4 bi VGV apto novo", " — R$ 7,4 bi em VGV de apartamento novo")
  if (n > 0) log.push(`[block 91] Fontes — "VGV apto novo" → "VGV de apartamento novo"`)
}

// Block 95 (Fontes IPTU)
{
  const blk = body[95]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("Tabela IPTU") &&
    !txt.includes("Decreto Municipal 2668/2025, LC 149/2025")
  ) {
    blk.content = [
      link("https://www.curitiba.pr.gov.br/conteudo/tabela-do-iptu/368", "Prefeitura de Curitiba — Decreto Municipal 2668/2025, LC 149/2025 e IPTU 2026"),
      t(" — base legal e detalhes da Planta Genérica de Valores 2026."),
    ]
    log.push(`[block 95] Fontes IPTU — "Tabela IPTU e Decreto IPTU 2026" → "Decreto 2668/2025 + LC 149/2025"`)
  }
}

// Block 97 — "aluguel CWB +10,98% 12m"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " — aluguel CWB +10,98% 12m", " — aluguel em Curitiba +10,98% em 12 meses")
  if (n > 0) log.push(`[block 97] Fontes FipeZap Locação — "aluguel CWB" → "aluguel em Curitiba"`)
}

// Block 99 — "CRM FYMOOB — recorte 2026-04-25, n=214 imóveis CWB"
{
  const blk = body[99]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("CRM FYMOOB — recorte 2026-04-25") &&
    !txt.includes("Estoque acompanhado pela FYMOOB")
  ) {
    blk.content = [
      t("Estoque acompanhado pela FYMOOB — recorte de 25/04/2026, com n=214 imóveis em Curitiba e valor de venda declarado."),
    ]
    log.push(`[block 99] Fontes — "CRM FYMOOB / imóveis CWB" → "Estoque acompanhado pela FYMOOB / imóveis em Curitiba"`)
  }
}

// Block 100 (CTA) — "custo total real" → "custo total estimado"
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      typeof block.props?.description === "string" &&
      block.props.description.includes("custo total real")
    ) {
      block.props.description = "A FYMOOB cruza orçamento, bairro-alvo e custo total estimado — parcela, condomínio, manutenção e rotina — para indicar se casa ou apartamento faz mais sentido no seu caso."
      log.push(`[block 100] CTA — "custo total real" → "custo total estimado" + descrição reescrita`)
      break
    }
  }
}

// ──────────────────────────────────────────────────────────────────
// Persistência
// ──────────────────────────────────────────────────────────────────

if (log.length === 0) {
  console.log("Nada pra mudar (idempotente OK).")
  process.exit(0)
}

console.log("\nMudanças aplicadas:")
for (const l of log) console.log("  -", l)
console.log(`\nTotal: ${log.length}`)

if (DRY_RUN) {
  console.log("\n[DRY RUN] Nada gravado.")
  process.exit(0)
}

const update = { body, updated_at: new Date().toISOString() }
if (descUpdate) update.description = descUpdate
if (seoDescUpdate) update.seo_meta_description = seoDescUpdate

const { error: updErr } = await sb
  .from("articles")
  .update(update)
  .eq("id", article.id)
if (updErr) {
  console.error("Erro atualizando:", updErr)
  process.exit(1)
}

console.log("\n✓ Artigo atualizado no Supabase.")
