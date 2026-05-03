/**
 * Aplica 2ª rodada de revisão no artigo `imovel-planta-vs-pronto-curitiba`
 * em 03/05/2026.
 *
 * Foco:
 *   1. Title sentence case sem "Planta ou Pronto"
 *   2. Description truncada → versão completa
 *   3. SEO meta title/desc preenchidos (eram NULL)
 *   4. INCC: explicar diferença INCC-DI vs INCC-M e citar abr/2026
 *   5. Lei 13.786/2018: tolerância 180 dias formulada conforme texto
 *      legal (cláusula expressa, não automática)
 *   6. FAQ sem perguntas — inserir 8 headings antes das respostas
 *   7. Suavizar "INCC devora boa parte do desconto" → "pode reduzir
 *      parte relevante"
 *   8. CTAs (intermediário + final) — versão consultiva
 *   9. Substituições: "pra/pro" → "para/para o", "CWB" → "Curitiba"
 *      (texto corrido), "rodar a conta" → "comparar"
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "imovel-planta-vs-pronto-curitiba"

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data: article, error: readErr } = await sb
  .from("articles")
  .select("id, slug, title, description, seo_meta_title, seo_meta_description, body")
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

function makeHeading(text, level = 3) {
  return {
    id: randomUUID(),
    type: "heading",
    props: { level, textColor: "default", textAlignment: "left", backgroundColor: "default", isToggleable: false },
    content: [t(text)],
    children: [],
  }
}

// ──────────────────────────────────────────────────────────────────
// 0. Frontmatter
// ──────────────────────────────────────────────────────────────────
const NEW_TITLE = "Imóvel na planta ou pronto em Curitiba: guia de decisão 2026"
const NEW_DESC = "Compare imóvel na planta e pronto em Curitiba em 2026: INCC, juros, prazo de entrega, risco de obra, custo de aluguel, liquidez e perfil ideal."
const NEW_SEO_TITLE = "Imóvel na planta ou pronto em Curitiba? Guia 2026"
const NEW_SEO_DESC = NEW_DESC

let titleUpdate = null
let descUpdate = null
let seoTitleUpdate = null
let seoDescUpdate = null

if (article.title !== NEW_TITLE) {
  titleUpdate = NEW_TITLE
  log.push(`[frontmatter] title — sentence case "Imóvel na planta ou pronto"`)
}
if (article.description !== NEW_DESC) {
  descUpdate = NEW_DESC
  log.push(`[frontmatter] description — versão completa sem truncamento`)
}
if (article.seo_meta_title !== NEW_SEO_TITLE) {
  seoTitleUpdate = NEW_SEO_TITLE
  log.push(`[frontmatter] seo_meta_title preenchido (era NULL)`)
}
if (article.seo_meta_description !== NEW_SEO_DESC) {
  seoDescUpdate = NEW_SEO_DESC
  log.push(`[frontmatter] seo_meta_description preenchido (era NULL)`)
}

// ──────────────────────────────────────────────────────────────────
// FAQ — inserir headings antes de cada resposta
// ──────────────────────────────────────────────────────────────────
{
  const faqHeadingIdx = body.findIndex(
    (blk) => blk?.type === "heading" && inlineToString(blk?.content) === "Perguntas frequentes"
  )
  if (faqHeadingIdx >= 0) {
    const nextBlock = body[faqHeadingIdx + 1]
    const alreadyHasQuestion = nextBlock?.type === "heading" && inlineToString(nextBlock?.content).includes("planta vs pronto")
    if (!alreadyHasQuestion) {
      const answerStarts = [
        "Planta é imóvel em construção ou lançamento",
        "Depende do bairro e do perfil. Em CWB 2026",
        "INCC-DI mar/2026 = +5,86%",
        "A Lei 13.786/2018 dá tolerância de",
        "A [Lei 10.931/2004]",
        "Sem patrimônio de afetação: até 25%",
        "Segundo a [ADEMI-PR]",
        "Pode — mas o financiamento bancário",
      ]
      // Block 100 starts with "A " then a link, so its inline string starts with "A Lei 10.931/2004"
      const questionTexts = [
        "O que é planta vs pronto?",
        "Imóvel na planta é sempre mais barato?",
        "O que é INCC e quanto ele custa em 2026?",
        "A construtora pode atrasar 180 dias?",
        "O que é patrimônio de afetação?",
        "Quanto perco se distratar?",
        "Quais bairros lideram lançamentos em Curitiba?",
        "Posso financiar imóvel na planta?",
      ]

      const matches = []
      for (let i = faqHeadingIdx + 1; i < body.length; i++) {
        const blk = body[i]
        if (blk?.type !== "paragraph") continue
        const txt = inlineToString(blk?.content)
        for (let q = 0; q < answerStarts.length; q++) {
          // Check if already matched
          if (matches.some((m) => m.q === q)) continue
          // Strip [link] markdown for matching: use plain text
          const pattern = answerStarts[q].replace(/\[/g, "").replace(/\]/g, "")
          if (txt.startsWith(pattern.split("[")[0]) || txt.startsWith(pattern)) {
            // Special case: "A Lei 10.931/2004" — txt starts with "A " then link
            if (q === 4 && !txt.startsWith("A ")) continue
            matches.push({ idx: i, q })
            break
          }
        }
      }

      // Sort matches by question order, then insert from last to first
      matches.sort((a, b) => b.idx - a.idx)
      for (const m of matches) {
        body.splice(m.idx, 0, makeHeading(questionTexts[m.q], 3))
      }
      if (matches.length > 0) log.push(`[FAQ] inseridos ${matches.length} headings de pergunta antes das respostas`)
    }
  }
}

// ──────────────────────────────────────────────────────────────────
// Block-level rewrites
// ──────────────────────────────────────────────────────────────────

// Block 0 (lead) — adicionar caveat INCC-M abr/2026
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "devora boa parte do \"desconto da planta\"",
    "pode consumir parte relevante do \"desconto da planta\""
  )
  if (n > 0) log.push(`[block 0] lead — "devora boa parte do desconto" → "pode consumir parte relevante"`)
}

// Block 9 (INCC explanation) — adicionar caveat INCC-M
{
  const blk = body[9]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("INCC-DI da FGV marcou") &&
    !txt.includes("Em abril/2026, o INCC-M")
  ) {
    blk.content = [
      b("O número vivo:"),
      t(" o INCC-DI da FGV marcou "),
      b("+5,86% acumulado em 12 meses em março de 2026"),
      t(" ("),
      link("https://brasilindicadores.com.br/incc-di/", "Brasil Indicadores"),
      t(", com cross-check em "),
      link("https://portal.fgv.br/noticias/incc-m-2026", "Portal FGV"),
      t("). Em abril/2026, o INCC-M — outro índice da família INCC, também calculado pela FGV — acelerou para 6,28% em 12 meses, reforçando a tendência. Esse percentual incidente sobre o saldo devedor durante a obra pode consumir parte relevante do desconto da planta."),
    ]
    log.push(`[block 9] INCC — adicionado caveat INCC-M abr/2026 (6,28% em 12m) e diferenciação dos índices`)
  }
}

// Block 41 (Lei do Distrato 180 dias) — formulação conforme Lei 13.786/2018
{
  const blk = body[41]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("180 dias de tolerância") &&
    txt.includes("sem multa") &&
    !txt.includes("quando essa cláusula está prevista de forma clara")
  ) {
    blk.content = [
      t("A "),
      link("https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13786.htm", "Lei 13.786/2018 (Lei do Distrato)"),
      t(" prevê que contratos de imóvel na planta podem trazer cláusula de tolerância de até "),
      b("180 dias corridos"),
      t(" para entrega. Quando essa cláusula está prevista de forma clara, a entrega dentro da tolerância não gera, por si só, resolução do contrato ou penalidade ao incorporador. Ultrapassada a tolerância, o comprador pode avaliar (conforme contrato e caso concreto):"),
    ]
    log.push(`[block 41] Lei 13.786/2018 — formulação alinhada com texto legal (cláusula expressa, sem promessa automática)`)
  }
}

// Block 25 — "Pra esse perfil"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " Pra esse perfil, o ", " Para esse perfil, o ")
  if (n > 0) log.push(`[block 25] "Pra esse perfil" → "Para esse perfil"`)
}

// Block 29 — "Pra família com filho pequeno e CMEI urgente"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra família com filho pequeno e CMEI urgente", "Para família com filho pequeno e CMEI urgente")
  if (n > 0) log.push(`[block 29] "Pra família com filho pequeno" → "Para família"`)
}

// Block 32 — "Pra esse perfil"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra esse perfil, **a planta só faz sentido", "Para esse perfil, a planta só faz sentido")
  if (n > 0) log.push(`[block 32] "Pra esse perfil" (planta) → "Para esse perfil"`)
}

// Block 36 — "normalmente cai pra 3,5-4% líquido"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "normalmente cai pra 3,5-4% líquido", "normalmente cai para 3,5-4% líquido")
  if (n > 0) log.push(`[block 36] "cai pra 3,5-4%" → "cai para 3,5-4%"`)
}

// Block 37 — "pra investidor que prioriza"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " pra investidor que prioriza renda. Planta de alto padrão com patrimônio de afetação averbado pode fazer sentido pra perfil", " para investidor que prioriza renda. Planta de alto padrão com patrimônio de afetação averbado pode fazer sentido para perfil")
  if (n > 0) log.push(`[block 37] "pra investidor / pra perfil" → "para"`)
}

// Block 47 — "patrimônio do empreendimento da quebra... pra concluir"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " contratar nova construtora pra concluir.", " contratar nova construtora para concluir.")
  if (n > 0) log.push(`[block 47] "pra concluir" → "para concluir"`)
}

// Block 56 — "remessa para a 2ª Seção pra uniformização"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " — provável remessa para a 2ª Seção pra uniformização.", " — provável remessa para a 2ª Seção para uniformização.")
  if (n > 0) log.push(`[block 56] "pra uniformização" → "para uniformização"`)
}

// Block 64 (CDC) — "5 anos pra vícios ocultos / 90 dias pra vícios aparentes"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "5 anos pra vícios ocultos", "5 anos para vícios ocultos")
    n += walkAndReplace(block, "90 dias pra vícios aparentes", "90 dias para vícios aparentes")
  }
  if (n > 0) log.push(`[block 64] CDC art. 26 — "pra vícios" → "para vícios"`)
}

// Block 68 — "leve um engenheiro independente pra inspeção"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " e leve um engenheiro independente pra inspeção", " e leve um engenheiro independente para inspeção")
  if (n > 0) log.push(`[block 68] "pra inspeção" → "para inspeção"`)
}

// Block 70 — "documentos pra comprar imóvel" (link text in Curitiba de Volta ao Centro section)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "documentos pra comprar imóvel em Curitiba", "documentos para comprar imóvel em Curitiba")
  if (n > 0) log.push(`[block 70] link text "pra comprar imóvel" → "para comprar imóvel"`)
}

// Block 78-82 (Curitiba de Volta ao Centro) — várias "pra"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "São R$ 163 milhões em incentivos fiscais até 2032 pra retrofit + obra nova no Centro:", "São R$ 163 milhões em incentivos fiscais até 2032 para retrofit + obra nova no Centro:")
    n += walkAndReplace(block, " Válido pra primeira aquisição pós-retrofit", " Válido para a primeira aquisição pós-retrofit")
    n += walkAndReplace(block, "sobre a base de cálculo pra retrofit residencial até 2032", "sobre a base de cálculo para retrofit residencial até 2032")
    n += walkAndReplace(block, "em obras de retrofit. Primeiro edital previsto pra ", "em obras de retrofit. Primeiro edital previsto para ")
  }
  if (n > 0) log.push(`[blocks 78-82] Curitiba de Volta ao Centro — "pra" → "para"`)
}

// Block 83 — "Se o perfil é studio ou 1 dormitório (45% do lançamento CWB 2025)"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "(45% do lançamento CWB 2025)", "(45% do lançamento em Curitiba em 2025)")
  if (n > 0) log.push(`[block 83] "lançamento CWB 2025" → "lançamento em Curitiba em 2025"`)
}

// Block 91 (heading) — "Mercado CWB 2025-2026 — contexto"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Mercado CWB 2025-2026 — contexto", "Mercado de Curitiba em 2025-2026 — contexto")
  if (n > 0) log.push(`[block 91] heading "Mercado CWB" → "Mercado de Curitiba"`)
}

// Block 94 — "Pra aprofundar custo de vida / pra perfis familiares"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Pra aprofundar custo de vida e condomínio,", "Para aprofundar custo de vida e condomínio,")
    n += walkAndReplace(block, " pra perfis familiares e creche/CMEI,", " para perfis familiares e creche/CMEI,")
  }
  if (n > 0) log.push(`[block 94] "Pra aprofundar / pra perfis familiares" → "Para"`)
}

// Block 103 (FAQ FGTS / financiamento) — "FGTS pode ser usado em 2 momentos: 1) durante a obra... pra reduzir o financiamento"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " pra reduzir o financiamento", " para reduzir o financiamento")
  if (n > 0) log.push(`[block 103] FAQ — "pra reduzir o financiamento" → "para reduzir"`)
}

// Block 103 — "diretamente pra construtora"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "diretamente pra construtora", "diretamente para a construtora")
  if (n > 0) log.push(`[block 103] FAQ — "pra construtora" → "para a construtora"`)
}

// Block 0 (lead end) — "verificar construtora sem precisar te indicar nome nenhum"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " os 5 passos que aplico no atendimento pra verificar construtora", " os 5 passos que aplico no atendimento para verificar construtora")
  if (n > 0) log.push(`[block 0] lead — "pra verificar construtora" → "para verificar construtora"`)
}

// Block 17 — "Olhando o estoque ativo da FYMOOB em 25 de abril de 2026"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "região metropolitana de CWB",
    "região metropolitana de Curitiba"
  )
  if (n > 0) log.push(`[multi] "região metropolitana de CWB" → "de Curitiba"`)
}

// Block 24 — "Pra esse perfil, o pronto retrofitado no Centro"
// (outro "Pra esse perfil" residual)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra esse perfil, o pronto retrofitado", "Para esse perfil, o pronto retrofitado")
  if (n > 0) log.push(`[block 25] "Pra esse perfil retrofitado" → "Para esse perfil"`)
}

// Block 28 — "concentram lançamentos de 2 dormitórios em CWB"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "concentram lançamentos de 2 dormitórios em CWB médio padrão", "concentram lançamentos de 2 dormitórios em Curitiba, no médio padrão")
  if (n > 0) log.push(`[block 28] "lançamentos em CWB médio padrão" → "em Curitiba, no médio padrão"`)
}

// Block 36 — "Studio em CWB rende"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Studio em CWB rende em média", "Estúdio em Curitiba rende em média")
  if (n > 0) log.push(`[block 36] "Studio em CWB" → "Estúdio em Curitiba"`)
}

// Block 37 — "FipeZap CWB"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "FipeZap CWB marca", "FipeZap em Curitiba marca")
  if (n > 0) log.push(`[block 37] "FipeZap CWB" → "FipeZap em Curitiba"`)
}

// Block 22 — "perfis abaixo cobrem ~85% do mercado FYMOOB em 2026"
// ok, keep

// Block 118 (CTA intermediário)
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Quer rodar a conta planta vs pronto pro seu caso?"
    ) {
      block.props.title = "Quer comparar planta e pronto para o seu caso?"
      block.props.description = "A FYMOOB cruza prazo de mudança, aluguel atual, entrada, INCC, financiamento, bairro e custo total até a chave para indicar se imóvel na planta ou pronto faz mais sentido."
      block.props.label = "Comparar planta × pronto"
      // also fix WhatsApp link
      if (typeof block.props.href === "string") {
        block.props.href = block.props.href.replace("Quero rodar a conta com vocês", "Quero comparar planta e pronto com vocês")
      }
      log.push(`[block 118] CTA intermediário — "Quer rodar a conta planta vs pronto pro seu caso?" → "Comparar planta × pronto"`)
      break
    }
  }
}

// Block 120 (CTA final) — keep but minor refine
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Veja o estoque ativo de planta e pronto na FYMOOB" &&
      typeof block.props?.description === "string" &&
      block.props.description.includes("251 imóveis")
    ) {
      block.props.description = "Catálogo de imóveis em Curitiba e região metropolitana, com filtro por bairro, tipo, faixa de preço e status (lançamento ou pronto para morar)."
      log.push(`[block 120] CTA final — descrição reescrita sem "251 imóveis" e "pronto pra morar"`)
      break
    }
  }
}

// ──────────────────────────────────────────────────────────────────
// Substituições gerais — pra/pro/CWB remanescentes
// ──────────────────────────────────────────────────────────────────

// "CWB 2026" / "CWB 2025" / etc.
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Em CWB 2026", "Em Curitiba em 2026")
    n += walkAndReplace(block, "em CWB 2026", "em Curitiba em 2026")
    n += walkAndReplace(block, "compradores em CWB", "compradores em Curitiba")
    n += walkAndReplace(block, "(45% do lançamento na mesma categoria", "(45% dos lançamentos na mesma categoria")
  }
  if (n > 0) log.push(`[multi] "Em CWB 2026" → "Em Curitiba em 2026" + ajustes`)
}

// "vícios ocultos (CDC art. 26) — válido pra qualquer subsistema" inside table cell
{
  for (const block of body) {
    if (block?.type === "table" && block.content?.rows) {
      for (const row of block.content.rows) {
        for (const cell of row.cells || []) {
          walkAndReplace(cell, "Vícios ocultos (CDC art. 26) — válido pra qualquer subsistema", "Vícios ocultos (CDC art. 26) — válido para qualquer subsistema")
        }
      }
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
if (titleUpdate) update.title = titleUpdate
if (descUpdate) update.description = descUpdate
if (seoTitleUpdate) update.seo_meta_title = seoTitleUpdate
if (seoDescUpdate) update.seo_meta_description = seoDescUpdate

const { error: updErr } = await sb.from("articles").update(update).eq("id", article.id)
if (updErr) {
  console.error("Erro atualizando:", updErr)
  process.exit(1)
}

console.log("\n✓ Artigo atualizado no Supabase.")
