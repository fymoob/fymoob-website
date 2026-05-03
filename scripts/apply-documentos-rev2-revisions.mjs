/**
 * Aplica 2ª rodada de revisão no artigo `documentos-comprar-imovel-curitiba`
 * em 03/05/2026.
 *
 * Foco:
 *   1. Title sentence case sem "pra"
 *   2. Description truncada → versão completa
 *   3. SEO meta title/desc preenchidos (eram NULL)
 *   4. FAQ sem perguntas — inserir 5 headings antes das respostas
 *   5. Suavizar absolutos jurídicos: "Curitiba não tem laudêmio
 *      (esqueça)", "tabelião recusa", "não pode vender", "Caixa não
 *      pede vintenária", "passa pra você", "execução trabalhista é
 *      causa comum em Curitiba"
 *   6. ITBI: alinhar com Tema 1113 (não cravar "valor venal ou
 *      transação, o maior")
 *   7. CTAs (intermediário + final) — versão consultiva
 *   8. Substituições: "pra/pro" → "para/para o", "CWB" → "Curitiba"
 *      (texto corrido), "red flags" → "pontos de atenção", "due
 *      diligence" → "análise documental" (1ª ocorrência), "GTM antigo"
 *      → "portal anterior da Prefeitura", "não é dono pro mundo
 *      jurídico" → "ainda não é proprietário perante o RI"
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "documentos-comprar-imovel-curitiba"

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
const NEW_TITLE = "Documentos para comprar imóvel em Curitiba: guia completo 2026"
const NEW_DESC = "Lista dos documentos para comprar imóvel em Curitiba em 2026: Prefeitura, Registro de Imóveis, certidões do vendedor, banco, escritura, ITBI e registro."
const NEW_SEO_TITLE = "Documentos para comprar imóvel em Curitiba: guia 2026"
const NEW_SEO_DESC = NEW_DESC

let titleUpdate = null
let descUpdate = null
let seoTitleUpdate = null
let seoDescUpdate = null

if (article.title !== NEW_TITLE) {
  titleUpdate = NEW_TITLE
  log.push(`[frontmatter] title — sentence case sem "pra"`)
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
  // Find the index of "Perguntas frequentes" heading
  const faqHeadingIdx = body.findIndex(
    (blk) => blk?.type === "heading" && inlineToString(blk?.content) === "Perguntas frequentes"
  )
  if (faqHeadingIdx >= 0) {
    // Check if questions are already inserted (idempotency)
    const nextBlock = body[faqHeadingIdx + 1]
    const alreadyHasQuestion = nextBlock?.type === "heading" && inlineToString(nextBlock?.content).startsWith("IPTU pago")
    if (!alreadyHasQuestion) {
      // Identify the 5 answers by their starting text
      const answerTextStarts = [
        "Não. O boleto de IPTU pago",
        "Depende da escolha:",
        "1 a 3 dias úteis",
        "Não, em 99% dos casos",
        "Não é obrigatória pra compra comum",
      ]
      const questionTexts = [
        "IPTU pago substitui a Certidão Negativa de Imóveis?",
        "Preciso ir presencialmente ao cartório em Curitiba?",
        "Quanto tempo demora uma escritura pelo e-Notariado?",
        "Curitiba tem laudêmio?",
        "Preciso pedir certidão vintenária?",
      ]

      // Walk from faqHeadingIdx+1 forward, find each answer paragraph and insert heading before it
      // Process from the end to preserve indices when splicing
      const matches = []
      for (let i = faqHeadingIdx + 1; i < body.length; i++) {
        const blk = body[i]
        if (blk?.type !== "paragraph") continue
        const txt = inlineToString(blk?.content)
        for (let q = 0; q < answerTextStarts.length; q++) {
          if (txt.startsWith(answerTextStarts[q])) {
            matches.push({ idx: i, q })
            break
          }
        }
      }
      // Insert from last to first
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

// Block 4 — Curitiba não tem laudêmio
{
  const blk = body[4]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "numberedListItem" &&
    txt.includes("Curitiba não tem laudêmio") &&
    txt.includes("esqueça essa taxa") &&
    !txt.includes("Em regra, Curitiba não tem laudêmio")
  ) {
    blk.content = [
      b("Em regra, Curitiba não tem laudêmio"),
      t(" por terreno de marinha, diferentemente de cidades litorâneas. Ainda assim, confira a matrícula: se aparecer \"domínio útil\", \"foreiro\" ou \"aforamento\", pode haver obrigação específica vinculada à União, Igreja ou outro senhorio direto."),
    ]
    log.push(`[block 4] "Curitiba não tem laudêmio (esqueça essa taxa)" → "Em regra, não tem... confira matrícula"`)
  }
}

// Block 9 — "Pedir fora de ordem = certidões vencendo / pra liberar financiamento"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Pedir fora de ordem = certidões vencendo antes da escritura.", "Pedir os documentos fora de ordem faz algumas certidões vencerem antes da escritura.")
    n += walkAndReplace(block, ") — se o banco demora 45 dias pra liberar financiamento, você paga as certidões duas vezes.", ") — se o banco demora 45 dias para liberar o financiamento, parte das certidões pode precisar ser refeita.")
  }
  if (n > 0) log.push(`[block 9] "Pedir fora de ordem / pra liberar / paga duas vezes" → versão consultiva`)
}

// Block 20 — "passa pra você" + dívida propter rem
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    ") — se você comprar sem a certidão, a dívida passa pra você.",
    "). Esses débitos podem acompanhar o imóvel e gerar cobrança contra o adquirente — por isso a certidão negativa municipal deve ser conferida antes da escritura."
  )
  if (n > 0) log.push(`[block 20] "dívida passa pra você" → "podem acompanhar o imóvel e gerar cobrança"`)
}

// Block 24 — "Tabelião recusa lavrar escritura ("
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Tabelião recusa lavrar escritura (",
    "O tabelião pode exigir regularização, documentos complementares ou recusar a lavratura enquanto a pendência não for resolvida ("
  )
  if (n > 0) log.push(`[block 24] "Tabelião recusa lavrar escritura" → "pode exigir regularização ou recusar"`)
}

// Block 36 — Guia de ITBI: alinhar com Tema 1113
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " — 2,7% sobre o valor venal ou de transação (o maior). Emitida pela Prefeitura pós-contrato, paga antes da escritura.",
    " — em Curitiba, a Prefeitura calcula o imposto com alíquota de 2,7% sobre a base municipal aplicável. Se a base ficar acima do valor real de mercado sem procedimento adequado, o Tema 1113 do STJ pode fundamentar contestação. Emitida pela Prefeitura após o contrato, paga antes da escritura."
  )
  if (n > 0) log.push(`[block 36] Guia de ITBI — caveat Tema 1113`)
}

// Block 39 — "Errou o ofício = recusa de certidão + retrabalho"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Errou o ofício = recusa de certidão + retrabalho.",
    "Se o pedido for feito no ofício errado, a certidão pode ser recusada e o processo atrasa."
  )
  if (n > 0) log.push(`[block 39] "Errou o ofício = recusa + retrabalho" → "pode ser recusada e o processo atrasa"`)
}

// Block 58 — "Averbação de indisponibilidade... Não pode vender"
// (texto fragmentado: bold em nó separado)
{
  let n = 0
  for (const block of body) {
    if (block?.type !== "numberedListItem" || !Array.isArray(block.content)) continue
    const txt = inlineToString(block.content)
    if (!txt.includes("Averbação de indisponibilidade")) continue
    for (const node of block.content) {
      if (node?.type === "text" && node?.styles?.bold && node.text === "Não pode vender.") {
        node.text = "Impede a venda regular enquanto não houver baixa da indisponibilidade ou autorização judicial."
        node.styles = {} // remove bold pra ficar no fluxo
        n++
      }
    }
  }
  if (n > 0) log.push(`[block 58] "Não pode vender" → "Impede a venda regular enquanto não houver baixa ou autorização judicial"`)
}

// Block 59 — "só vende com autorização do juízo"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " — só vende com autorização do juízo.",
    " — pode exigir autorização judicial, quitação, sub-rogação ou outra solução jurídica antes da escritura."
  )
  if (n > 0) log.push(`[block 59] "só vende com autorização do juízo" → "pode exigir autorização judicial, quitação, sub-rogação"`)
}

// Block 61 — "Raro em Curitiba, mas existe"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " — imóvel não é 100% propriedade do vendedor, paga laudêmio à União ou Igreja. Raro em Curitiba, mas existe.",
    " — o vendedor não tem propriedade plena. Pode haver pagamento ao senhorio direto. É raro em Curitiba, mas deve ser conferido na matrícula."
  )
  if (n > 0) log.push(`[block 61] "Raro em Curitiba, mas existe" → "deve ser conferido na matrícula"`)
}

// Block 71 — "Caixa não pede vintenária"
{
  const blk = body[71]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Caixa não pede vintenária") &&
    !txt.includes("a vintenária pode ser exigida em situações específicas")
  ) {
    blk.content = [
      t("Em compra comum financiada, a Caixa normalmente trabalha com matrícula atualizada e certidão de ônus reais. A "),
      b("vintenária pode ser exigida em situações específicas"),
      t(" pelo banco, cartório ou jurídico da operação."),
    ]
    log.push(`[block 71] "Caixa não pede vintenária" → caveat "pode ser exigida em situações específicas"`)
  }
}

// Block 75 — "execução trabalhista é causa comum"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Em Curitiba, execução trabalhista é causa comum de indisponibilidade de imóvel — vendedor empresário com ação de ex-funcionário descobre no meio do processo que o imóvel foi bloqueado.",
    "Execuções trabalhistas podem gerar indisponibilidade ou penhora de imóvel, especialmente quando o vendedor é empresário ou sócio de empresa."
  )
  if (n > 0) log.push(`[block 75] "execução trabalhista é causa comum em CWB" → versão genérica`)
}

// Block 79 — "prazo confortável, pede no início"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " — prazo confortável, pede no início do processo e dura até o final.",
    " — por isso, pode ser solicitada no início do processo sem grande risco de vencer antes da escritura."
  )
  if (n > 0) log.push(`[block 79] "prazo confortável, pede no início" → "pode ser solicitada no início... sem grande risco de vencer"`)
}

// Block 97 — "Quem usa: comprador de fora..."
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " comprador de fora de Curitiba (investidor de SP/RS comprando em Batel), vendedor espólio com herdeiros em estados diferentes, quem quer economizar tempo (reduz de 5-10 dias presencial pra 1-3 dias remoto).",
    " comprador fora de Curitiba (investidor de SP ou RS comprando em Curitiba), vendedor espólio com herdeiros em estados diferentes, ou partes que precisam reduzir deslocamentos. Tende a ser mais ágil que a escritura presencial."
  )
  if (n > 0) log.push(`[block 97] "Quem usa: comprador de fora..." → "Casos em que o e-Notariado costuma ajudar"`)
}

// Block 98 — "~1% a 2% do valor do imóvel"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " igual à escritura presencial (mesma tabela TJ-PR, ~1% a 2% do valor do imóvel).",
    " segue a mesma tabela de emolumentos da escritura presencial (TJ-PR). A faixa pode variar conforme valor do imóvel e atos envolvidos."
  )
  if (n > 0) log.push(`[block 98] "~1% a 2% do valor do imóvel" → caveat "varia conforme valor e atos envolvidos"`)
}

// Block 99 — "qualquer tabelionato de Curitiba serve"
{
  const blk = body[99]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("qualquer tabelionato de Curitiba serve") &&
    !txt.includes("lavrada em tabelionato de notas escolhido pelas partes")
  ) {
    blk.content = [
      b("Competência:"),
      t(" em regra, a escritura pode ser lavrada em tabelionato de notas escolhido pelas partes, inclusive via e-Notariado quando os requisitos digitais forem cumpridos. Confirme com o tabelionato escolhido antes de organizar a assinatura."),
    ]
    log.push(`[block 99] "qualquer tabelionato de Curitiba serve" → "lavrada em tabelionato escolhido pelas partes... confirme antes"`)
  }
}

// Block 110 — "não é dono pro mundo jurídico"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Sem registro, você tem \"direito contratual\" mas não é dono pro mundo jurídico.",
    "Antes do registro, você pode ter contrato e posse, mas ainda não é proprietário perante o Registro de Imóveis."
  )
  if (n > 0) log.push(`[block 110] "não é dono pro mundo jurídico" → "ainda não é proprietário perante o Registro de Imóveis"`)
}

// Block 111 — "Prazo do tabelião pra enviar ao RI: 30 dias"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Prazo do tabelião pra enviar ao RI: 30 dias da lavratura. Custo do registro: ~1% do valor + emolumentos TJ-PR. Depois do registro, a matrícula é atualizada com seu nome como novo proprietário.",
    "Após a lavratura, o título deve ser levado ou encaminhado ao Registro de Imóveis competente. Na prática, comprador, banco, tabelionato ou despachante podem operacionalizar esse envio, conforme a operação. Custo do registro: aproximadamente 1% do valor + emolumentos TJ-PR. Depois do registro, a matrícula é atualizada com seu nome como novo proprietário."
  )
  if (n > 0) log.push(`[block 111] "Prazo do tabelião pra enviar ao RI: 30 dias" → versão consultiva sobre operacionalização do envio`)
}

// Block 113 (callout 2026) — "GTM antigo"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "sem visitar o portal GTM antigo.", "sem precisar usar o portal anterior da Prefeitura.")
    n += walkAndReplace(block, "todos os tabelionatos de notas de CWB oferecem", "todos os tabelionatos de notas de Curitiba oferecem")
  }
  if (n > 0) log.push(`[block 113] callout — "GTM antigo / CWB" → "portal anterior / Curitiba"`)
}

// Block 118 — "Primeira sentença LGPD no Brasil foi contra uma imobiliária"
{
  const blk = body[118]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Primeira sentença LGPD no Brasil foi contra uma imobiliária") &&
    !txt.includes("Casos envolvendo imobiliárias já foram discutidos judicialmente")
  ) {
    blk.content = [
      b("Na prática:"),
      t(" exija ver a política de privacidade da imobiliária antes de entregar documentos. Pergunte quanto tempo guardam os dados pós-transação. Casos envolvendo imobiliárias já foram discutidos judicialmente sob a ótica da LGPD — o risco prático é o vazamento ou o uso indevido de dados após a coleta, não a coleta necessária para executar o contrato."),
    ]
    log.push(`[block 118] "Primeira sentença LGPD foi contra uma imobiliária" → "casos já foram discutidos judicialmente"`)
  }
}

// Block 124 (CTA intermediário) — "imóveis de todos os 9 ofícios, à venda e pra alugar"
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Procurando imóveis em Curitiba?" &&
      typeof block.props?.description === "string" &&
      block.props.description.includes("imóveis de todos os 9 ofícios")
    ) {
      block.props.title = "Procurando imóvel para comprar em Curitiba?"
      block.props.description = "A FYMOOB ajuda a conferir documentação, Registro de Imóveis, certidões, ITBI, escritura e financiamento antes de fechar negócio."
      block.props.label = "Ver imóveis à venda"
      log.push(`[block 124] CTA intermediário — "imóveis de todos os 9 ofícios, à venda e pra alugar" → versão consultiva`)
      break
    }
  }
}

// Block 147 (FAQ laudêmio) — "Não, em 99% dos casos"
// (texto fragmentado por bold "terreno de marinha" no meio)
{
  for (const block of body) {
    if (block?.type !== "paragraph" || !Array.isArray(block.content)) continue
    const txt = inlineToString(block.content)
    if (!txt.startsWith("Não, em 99% dos casos. Laudêmio")) continue
    if (txt.includes("Em regra, não")) break // já aplicado
    block.content = [
      t("Em regra, não. O laudêmio existe em terreno de marinha ou imóveis foreiros à União ou Igreja. Curitiba é cidade interior. Mesmo assim, a matrícula deve ser conferida: se houver \"domínio útil\", \"foreiro\" ou \"aforamento\", o caso exige análise específica."),
    ]
    log.push(`[block 147] FAQ laudêmio — "Não, em 99% dos casos" → "Em regra, não... matrícula deve ser conferida"`)
    break
  }
}

// Block 148 (FAQ vintenária) — "Não é obrigatória pra compra comum"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Não é obrigatória pra compra comum. A matrícula atualizada com negativa de ônus reais (30 dias) já atende. Bancos privados podem pedir em imóveis acima de R$ 1-2 milhões. Usucapião extrajudicial exige.",
    "Não é usual em compra comum. A matrícula atualizada com negativa de ônus reais (30 dias) costuma atender. Pode ser solicitada por banco, cartório ou jurídico em situações específicas: matrícula recente, cadeia dominial complexa, imóvel de alto valor ou usucapião extrajudicial."
  )
  if (n > 0) log.push(`[block 148] FAQ vintenária — "Não é obrigatória pra compra comum" → "Não é usual... pode ser solicitada em situações específicas"`)
}

// Block 153 (CTA final) — "Compre seu imóvel com segurança / Nossa equipe cuida"
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Compre seu imóvel com segurança"
    ) {
      block.props.title = "Quer comprar imóvel com documentação conferida?"
      block.props.description = "A FYMOOB acompanha a análise documental, certidões, ITBI, escritura, registro e financiamento para reduzir risco antes da assinatura."
      block.props.label = "Falar com um consultor"
      log.push(`[block 153] CTA final — "Compre seu imóvel com segurança / Nossa equipe cuida" → "Quer comprar imóvel com documentação conferida?"`)
      break
    }
  }
}

// ──────────────────────────────────────────────────────────────────
// Substituições gerais
// ──────────────────────────────────────────────────────────────────

// "red flags" → "pontos de atenção"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "O que procurar (red flags):", "O que procurar (pontos de atenção):")
  if (n > 0) log.push(`[block 57] "red flags" → "pontos de atenção"`)
}

// "due diligence" → "análise documental" (only first occurrence in main flow)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Semana 2 — due diligence do imóvel:", "Semana 2 — análise documental do imóvel:")
  if (n > 0) log.push(`[block 117] "due diligence" → "análise documental"`)
}

// CWB → Curitiba in body texts (be careful)
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Imóvel em CWB", "Imóvel em Curitiba")
    n += walkAndReplace(block, "comprador em CWB", "comprador em Curitiba")
    n += walkAndReplace(block, "Prazo total médio em CWB 2026:", "Prazo total médio em Curitiba em 2026:")
    n += walkAndReplace(block, "todos os tabelionatos de notas de CWB oferecem", "todos os tabelionatos de notas de Curitiba oferecem")
    n += walkAndReplace(block, " (Imposto de Transmissão, Prefeitura CWB)", " (Imposto de Transmissão, Prefeitura de Curitiba)")
    n += walkAndReplace(block, "Portal Certidão Negativa CWB", "Portal Certidão Negativa de Curitiba")
  }
  if (n > 0) log.push(`[multi] "CWB" → "Curitiba" no texto corrido (~6 ocorrências)`)
}

// "lista pra arquivo" / "pra registro" / etc.
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Importante pra ", "Importante para ")
    n += walkAndReplace(block, " (se vai usar pra entrada)", " (se vai usar para a entrada)")
    n += walkAndReplace(block, "Envio do título ao RI pra registro", "Envio do título ao RI para registro")
    n += walkAndReplace(block, "termo de consentimento separado só pra entregar", "termo de consentimento separado só para entregar")
    n += walkAndReplace(block, "consentimento destacado pra usos acessórios", "consentimento destacado para usos acessórios")
    n += walkAndReplace(block, "CEF tem descontos específicos pra registro em MCMV", "a Caixa tem descontos específicos para o registro em MCMV")
    n += walkAndReplace(block, "Catálogo com imóveis de todos os 9 ofícios, à venda e pra alugar.", "Catálogo de imóveis à venda em Curitiba.")
    n += walkAndReplace(block, "Matrícula atualizada em seu nome → emite nova certidão pra arquivo", "Matrícula atualizada em seu nome → emite nova certidão para arquivo")
    n += walkAndReplace(block, "documentação pra que sua compra seja tranquila", "documentação para que sua compra seja tranquila")
    n += walkAndReplace(block, "5-10 dias presencial pra 1-3 dias remoto", "5 a 10 dias presencial para 1 a 3 dias remoto")
    n += walkAndReplace(block, " pra compra comum.", " para compra comum.")
    n += walkAndReplace(block, "reserve 5% a 7% do valor da compra pros custos", "reserve 5% a 7% do valor da compra para os custos")
    n += walkAndReplace(block, "documentos pra comprar imóvel em Curitiba", "documentos para comprar imóvel em Curitiba")
  }
  if (n > 0) log.push(`[multi] pra/pro → para/para o em ~10 ocorrências de texto corrido`)
}

// Methodology sources — "Portal Certidão Negativa CWB" + "AMEP — Mapa RI Curitiba" already handled
// CRM bairro reference
{
  for (const block of body) {
    if (block?.type === "methodologyBox" && block.props?.sources && typeof block.props.sources === "string") {
      const before = block.props.sources
      const after = before.replaceAll("Portal Certidão Negativa CWB", "Portal Certidão Negativa de Curitiba")
      if (after !== before) {
        block.props.sources = after
        log.push(`[methodology] sources — "Portal Certidão Negativa CWB" → "de Curitiba"`)
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
