/**
 * Aplica 2ª rodada de revisão no artigo `itbi-curitiba-valor-como-pagar`
 * em 03/05/2026.
 *
 * Este e o artigo juridico mais sensivel do cluster — precisa de
 * formulacao mais cautelosa do Tema 1113/STJ e remocao de tom
 * acusatorio contra a Prefeitura. A tese precisa mudar de
 * "Prefeitura cobra errado, voce recupera R$ 12 mil" para
 * "A base do ITBI pode ser contestavel quando a Prefeitura usa
 * valor superior ao mercado sem procedimento adequado, conforme
 * Tema 1113/STJ".
 *
 * Foco:
 *   1. Title sentence case sem "Pegadinha"
 *   2. Description sem "STJ mandou mudar / quem sabe recupera"
 *   3. Block 0 (lead) — reescrita inteira com formulacao tecnica
 *   4. Block 5 (callout) — "aí é que mora a pegadinha" → suavizar
 *   5. Block 6 (heading) — "A pegadinha do valor venal" →
 *      "Valor venal de referência: ponto de atenção no cálculo"
 *   6. Block 7-8 — Reescrita
 *   7. Block 10 (heading) + 11-15 — Tema 1113 com formulacao
 *      tecnica precisa
 *   8. Block 14 — "ela tem que abrir processo administrativo e te
 *      chamar. Nao pode arbitrar sozinha" → versao tecnica
 *   9. Block 15 + 16 — "A conta que o STJ mandou refazer" + "A
 *      gente ja viu esse erro 30 vezes" → suavizar
 *  10. Block 22 (callout) — "blinda o venal contra contestacao /
 *      caminho efetivo e judicial" → suavizar
 *  11. Block 26 — "10-15%, voce tem motivo pra contestar"
 *  12. Block 30 — "Taxa de sucesso no TJ-PR alta"
 *  13. Block 47 (CTA intermediario) — "Quer rodar a conta pra seu
 *      caso?" → "Quer conferir o ITBI antes de assinar?"
 *  14. Block 68 — "A guia chega automatica... Quem nao souber paga
 *      a conta da Prefeitura" → suavizar
 *  15. FAQ — adicionar pergunta "Posso declarar valor menor para
 *      pagar menos ITBI?" com caveat contra subdeclaracao
 *  16. Substituicoes: "pra/pro" → "para/para o", "dá pra" →
 *      "pode" / "permite", "blinda" → "dificulta", "umas 30 vezes"
 *      → caveat
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "itbi-curitiba-valor-como-pagar"

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

function makeParagraph(content) {
  return {
    id: randomUUID(),
    type: "paragraph",
    props: { textColor: "default", textAlignment: "left", backgroundColor: "default" },
    content: Array.isArray(content) ? content : [t(content)],
    children: [],
  }
}

// ──────────────────────────────────────────────────────────────────
// 0. Frontmatter
// ──────────────────────────────────────────────────────────────────
const NEW_TITLE = "ITBI em Curitiba 2026: alíquota, cálculo e como pagar"
const NEW_DESC = "Entenda a alíquota de 2,7%, a base de cálculo, quando contestar o valor usado pela Prefeitura e como pagar o ITBI em Curitiba passo a passo."

let titleUpdate = null
let descUpdate = null

if (article.title !== NEW_TITLE) {
  titleUpdate = NEW_TITLE
  log.push(`[frontmatter] title — sentence case sem "Pegadinha do ITBI"`)
}
if (article.description !== NEW_DESC) {
  descUpdate = NEW_DESC
  log.push(`[frontmatter] description — versão sem "STJ mandou mudar / quem sabe recupera"`)
}

// ──────────────────────────────────────────────────────────────────
// Block 0 (lead) — reescrita inteira
// ──────────────────────────────────────────────────────────────────
{
  const blk = body[0]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("a conta está errada") &&
    !txt.includes("ponto sensível não é só a alíquota, mas a base de cálculo")
  ) {
    blk.content = [
      t("Em Curitiba, o ITBI tem alíquota padrão de "),
      b("2,7%"),
      t(". O ponto sensível não é só a alíquota, mas a base de cálculo: em alguns casos, a guia pode sair sobre valor municipal superior ao valor negociado. Desde o "),
      link("https://www.stj.jus.br/sites/portalp/Paginas/Comunicacao/Noticias/09032022-Base-de-calculo-do-ITBI-e-o-valor-do-imovel-transmitido-em-condicoes-normais-de-mercado--decide-Primeira-Secao.aspx", "Tema 1113 do STJ"),
      t(", o valor declarado pelo contribuinte tem presunção de compatibilidade com o valor de mercado, e a Prefeitura não pode usar a base do IPTU como piso automático sem procedimento próprio. Neste guia, veja como calcular, pagar e quando vale contestar o ITBI."),
    ]
    log.push(`[block 0] lead — reescrito sem "conta está errada / Prefeitura cobra errado / dá pra recuperar"`)
  }
}

// ──────────────────────────────────────────────────────────────────
// Block 5 (callout) — "aí é que mora a pegadinha"
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " — aí é que mora a pegadinha.",
    " — esse é o ponto sensível que vamos detalhar abaixo."
  )
  if (n > 0) log.push(`[block 5] callout — "aí é que mora a pegadinha" → "esse é o ponto sensível"`)
}

// ──────────────────────────────────────────────────────────────────
// Block 6 (heading) — "A pegadinha do valor venal de referência"
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "A pegadinha do valor venal de referência",
    "Valor venal de referência: ponto de atenção no cálculo"
  )
  if (n > 0) log.push(`[block 6] heading "A pegadinha" → "Valor venal de referência: ponto de atenção"`)
}

// ──────────────────────────────────────────────────────────────────
// Block 8 — "Não é o que a Prefeitura faz / venal de referência"
// ──────────────────────────────────────────────────────────────────
{
  const blk = body[7]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Parece óbvio") &&
    txt.includes("Não é o que a Prefeitura faz") &&
    !txt.includes("Em alguns casos, isso difere do valor efetivamente negociado")
  ) {
    blk.content = [
      t("A LC 108/2017 diz que o ITBI deve ser calculado sobre o valor do imóvel \"em condições normais de mercado\". Em alguns casos, isso difere do valor efetivamente negociado, gerando dúvida sobre qual base aplicar."),
    ]
    log.push(`[block 7] "Parece óbvio... Não é o que a Prefeitura faz" → versão técnica`)
  }
}

{
  const blk = body[8]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Na prática, o sistema do portal ITBI emite a guia sobre o") &&
    !txt.includes("Em Curitiba, a guia do ITBI pode usar valor de referência municipal")
  ) {
    blk.content = [
      t("Em Curitiba, a guia do ITBI pode usar "),
      b("valor de referência municipal"),
      t(" superior ao valor negociado. Essa base costuma ser calculada com referência ao Cadastro Imobiliário (o mesmo do IPTU). Em bairros de alto padrão como Batel, Cabral e Bigorrilho, a diferença pode ser relevante. Quando isso acontece sem procedimento administrativo individualizado, o Tema 1113/STJ pode sustentar contestação."),
    ]
    log.push(`[block 8] "Prefeitura faz" → "guia pode usar valor de referência municipal"`)
  }
}

// ──────────────────────────────────────────────────────────────────
// Block 9 — "Aí entra o que o STJ decidiu"
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Aí entra o que o STJ decidiu.", "É aí que entra o entendimento do STJ.")
  if (n > 0) log.push(`[block 9] "Aí entra o que o STJ decidiu" → "É aí que entra o entendimento do STJ"`)
}

// ──────────────────────────────────────────────────────────────────
// Block 10 (heading) — "O que o Tema 1113 diz, em linguagem de gente"
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "O que o Tema 1113 diz, em linguagem de gente",
    "O que o Tema 1113 do STJ definiu"
  )
  if (n > 0) log.push(`[block 10] heading "Tema 1113 em linguagem de gente" → "Tema 1113 do STJ definiu"`)
}

// ──────────────────────────────────────────────────────────────────
// Block 11 — "Em março de 2022..."
// ──────────────────────────────────────────────────────────────────
{
  const blk = body[11]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Em março de 2022") &&
    !txt.includes("O STJ definiu, em linhas gerais, que")
  ) {
    blk.content = [
      t("Em "),
      b("março de 2022"),
      t(", a Primeira Seção do STJ julgou o "),
      link("https://www.stj.jus.br/sites/portalp/Paginas/Comunicacao/Noticias/09032022-Base-de-calculo-do-ITBI-e-o-valor-do-imovel-transmitido-em-condicoes-normais-de-mercado--decide-Primeira-Secao.aspx", "Tema Repetitivo 1.113"),
      t(", em recurso especial sob o rito repetitivo. O STJ definiu, em linhas gerais, que:"),
    ]
    log.push(`[block 11] "Em março de 2022" → "O STJ definiu, em linhas gerais, que"`)
  }
}

// ──────────────────────────────────────────────────────────────────
// Block 12 — bullet "O valor do ITBI é o que você pagou pelo imóvel"
// ──────────────────────────────────────────────────────────────────
{
  const blk = body[12]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("o que você pagou pelo imóvel") &&
    !txt.includes("valor do imóvel transmitido em condições normais de mercado")
  ) {
    blk.content = [
      t("a base de cálculo do ITBI é o "),
      b("valor do imóvel transmitido em condições normais de mercado"),
      t("; o valor declarado pelo contribuinte tem presunção de compatibilidade com esse valor;"),
    ]
    log.push(`[block 12] bullet 1 — "o que você pagou pelo imóvel" → "valor em condições normais de mercado"`)
  }
}

// Block 13 — bullet "O valor do IPTU não serve de piso pro ITBI"
{
  const blk = body[13]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("IPTU não serve de piso") &&
    !txt.includes("base do IPTU não pode ser usada como piso automático")
  ) {
    blk.content = [
      t("a base do IPTU "),
      b("não pode ser usada como piso automático"),
      t(" para o ITBI — são tributos diferentes, com bases distintas;"),
    ]
    log.push(`[block 13] bullet 2 — "IPTU não serve de piso pro ITBI" → "não pode ser usada como piso automático"`)
  }
}

// Block 14 — bullet "Se a Prefeitura quiser cobrar mais, ela tem que abrir processo administrativo e te chamar"
{
  const blk = body[14]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("ela tem que abrir processo administrativo e te chamar") &&
    !txt.includes("o município pode afastar o valor declarado, mas deve instaurar processo administrativo próprio")
  ) {
    blk.content = [
      t("o município "),
      b("pode afastar o valor declarado"),
      t(", mas deve instaurar processo administrativo próprio, com fundamentação e direito ao contraditório."),
    ]
    log.push(`[block 14] bullet 3 — "abrir processo e te chamar / arbitrar sozinha" → versão técnica`)
  }
}

// Block 15 — "A conta que o STJ mandou refazer, a Prefeitura continua fazendo igual"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " A conta que o STJ mandou refazer, a Prefeitura continua fazendo igual.",
    " O Tema 1113 traz fundamento para contestação, mas a aplicação prática depende do caso concreto e do procedimento usado pelo município."
  )
  if (n > 0) log.push(`[block 15] "A conta que o STJ mandou refazer / continua fazendo igual" → "O Tema 1113 traz fundamento para contestação"`)
}

// Block 16 — "A gente já viu esse erro no boleto umas 30 vezes em 2026"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "A gente já viu esse erro no boleto umas 30 vezes em 2026.",
    "Em alguns casos acompanhados pela FYMOOB em 2026, a guia saiu com base superior ao valor da escritura — vale conferir caso a caso."
  )
  if (n > 0) log.push(`[block 16] "A gente já viu esse erro 30 vezes" → "Em alguns casos acompanhados pela FYMOOB"`)
}

// ──────────────────────────────────────────────────────────────────
// Block 18 — "A conta pega aqui. Três cenários reais de Curitiba"
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "A conta pega aqui. Três cenários reais de Curitiba em abril de 2026 — valores típicos de FipeZap, Quinto Andar e fechamentos FYMOOB:",
    "Três cenários estimativos para Curitiba em abril de 2026, com valores referenciais (FipeZap, Quinto Andar, fechamentos FYMOOB):"
  )
  if (n > 0) log.push(`[block 18] "A conta pega aqui. Três cenários reais" → "Três cenários estimativos com valores referenciais"`)
}

// ──────────────────────────────────────────────────────────────────
// Block 20 — "O último cenário é o do título. Não é hipótese de blog"
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "O último cenário é o do título. Não é hipótese de blog: ",
    "O cenário com diferença de R$ 12.150 não é uma hipótese isolada: "
  )
  if (n > 0) log.push(`[block 20] "O último cenário é o do título / não é hipótese de blog" → "não é uma hipótese isolada"`)
}

// ──────────────────────────────────────────────────────────────────
// Block 22 (callout) — "blinda o venal de referência / caminho efetivo é judicial"
// ──────────────────────────────────────────────────────────────────
{
  const blk = body[22]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "calloutBox" &&
    txt.includes("blinda") &&
    !txt.includes("dificulta a contestação administrativa em casos específicos")
  ) {
    blk.content = [
      b("Por que isso aparece com frequência em Curitiba?"),
      t(" A LC 108/2017 dá à Prefeitura o poder de avaliar o imóvel com base em \"elementos do Cadastro Imobiliário e normas da ABNT\". Na prática, isso pode dificultar a contestação administrativa em casos específicos. Em algumas situações, o caminho judicial — com fundamento no Tema 1113/STJ — tem sido utilizado para discutir restituição. A escolha entre administrativo e judicial depende do valor envolvido, da documentação e da urgência do fechamento, e deve ser avaliada caso a caso."),
    ]
    log.push(`[block 22] callout — "blinda... caminho efetivo é judicial" → versão consultiva`)
  }
}

// ──────────────────────────────────────────────────────────────────
// Block 26 — "10-15%, você tem motivo pra contestar"
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se o venal está acima da sua escritura em mais de 10-15%, você tem motivo pra contestar.",
    "Se o valor de referência está significativamente acima da escritura, pode haver fundamento para contestação — a avaliação depende do caso concreto e da documentação disponível."
  )
  if (n > 0) log.push(`[block 26] "10-15%, você tem motivo pra contestar" → versão consultiva`)
}

// ──────────────────────────────────────────────────────────────────
// Block 30 — "Taxa de sucesso no TJ-PR pós-Tema 1113: alta"
// (texto fragmentado: "Taxa de sucesso..." em texto plano, "alta" em bold)
// ──────────────────────────────────────────────────────────────────
{
  for (const block of body) {
    if (block?.type !== "bulletListItem" || !Array.isArray(block.content)) continue
    const txt = inlineToString(block.content)
    if (!txt.includes("Taxa de sucesso no TJ-PR pós-Tema 1113")) continue
    if (txt.includes("O Tema 1113 oferece fundamento")) break // já aplicado
    // Find the index of " Taxa de sucesso..." text node and replace from there
    let touched = false
    for (let i = 0; i < block.content.length; i++) {
      const node = block.content[i]
      if (node?.type === "text" && typeof node.text === "string" && node.text.endsWith("Taxa de sucesso no TJ-PR pós-Tema 1113: ")) {
        // Replace this node + bold "alta" + trailing "."
        node.text = node.text.replace(" Taxa de sucesso no TJ-PR pós-Tema 1113: ", " O Tema 1113 oferece fundamento para a discussão, mas o resultado depende do caso concreto, da documentação e da posição do juízo.")
        // Remove the next node ("alta") and the one after if it's just ".":
        const removeCount = (block.content[i + 1]?.text === "alta" ? 1 : 0) + (block.content[i + 2]?.text === "." ? 1 : 0)
        if (removeCount > 0) block.content.splice(i + 1, removeCount)
        touched = true
        break
      }
    }
    if (touched) {
      log.push(`[block 30] "Taxa de sucesso alta" → "resultado depende do caso concreto"`)
      break
    }
  }
}

// ──────────────────────────────────────────────────────────────────
// Block 31 — "Sem ITBI quitado, cartório não lavra" (bold node)
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Sem ITBI quitado, cartório não lavra",
    "Em regra, sem ITBI quitado, o cartório não lavra"
  )
  if (n > 0) log.push(`[block 31] "Sem ITBI quitado, cartório não lavra" → "Em regra, sem ITBI quitado, o cartório não lavra"`)
}

// ──────────────────────────────────────────────────────────────────
// Block 44 — "Se a diferença passa de R$ 5 mil, vale pedir avaliação contraditória"
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se a diferença entre o ITBI cobrado e o devido passa de R$ 5 mil",
    "Quando a diferença entre o ITBI cobrado e o que seria devido pelo valor de mercado for relevante (na prática, a partir de alguns milhares de reais)"
  )
  if (n > 0) log.push(`[block 44] "passa de R$ 5 mil, vale pedir" → "diferença relevante a partir de milhares de reais"`)
}

// ──────────────────────────────────────────────────────────────────
// Block 45 — "Se você já pagou e a diferença é acima de R$ 8 mil"
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se você já pagou e a diferença é acima de R$ 8 mil",
    "Em casos de diferença relevante já paga (na prática, a partir de alguns milhares de reais)"
  )
  if (n > 0) log.push(`[block 45] "diferença acima de R$ 8 mil" → "diferença relevante a partir de milhares"`)
}

// ──────────────────────────────────────────────────────────────────
// Block 47 (CTA intermediário)
// ──────────────────────────────────────────────────────────────────
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Quer rodar a conta pra seu caso?"
    ) {
      block.props.title = "Quer conferir o ITBI antes de assinar?"
      block.props.description = "A FYMOOB ajuda a revisar valor de compra, base da guia, documentação, escritura e custos de fechamento antes de você seguir para o cartório."
      block.props.label = "Conferir meu ITBI"
      log.push(`[block 47] CTA intermediário — "Quer rodar a conta pra seu caso?" → "Conferir meu ITBI"`)
      break
    }
  }
}

// ──────────────────────────────────────────────────────────────────
// Block 50 — Mito "Primeiro imóvel tem 50% de desconto" (manter)
// Block 50 — "**'Primeiro imóvel tem 50% de desconto no ITBI.'** Errado."
// ──────────────────────────────────────────────────────────────────
// Just ensure word "Errado" stays neutral. Skip — already short statement.

// Block 65 — "peça pro tabelionato gerar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " peça pro tabelionato gerar", " peça ao tabelionato para gerar")
  if (n > 0) log.push(`[block 65] "peça pro tabelionato gerar" → "peça ao tabelionato para gerar"`)
}

// Block 66 — "tem motivo pra agir / vale pedir / vale entrar com repetição"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " Se a diferença passa de 15%, você tem motivo pra agir.",
    " Diferenças significativas podem justificar avaliação caso a caso."
  )
  if (n > 0) log.push(`[block 66] "Se a diferença passa de 15%, você tem motivo pra agir" → versão consultiva`)
}

// ──────────────────────────────────────────────────────────────────
// Block 64 (heading) — "Três coisas pra fazer antes de assinar"
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Três coisas pra fazer antes de assinar a escritura em Curitiba",
    "Três passos antes de assinar a escritura em Curitiba"
  )
  if (n > 0) log.push(`[block 64] heading "Três coisas pra fazer" → "Três passos antes de assinar"`)
}

// ──────────────────────────────────────────────────────────────────
// Block 68 — "A guia chega automática... Quem não souber paga a conta"
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "A guia chega automática. A tese do STJ não chega sozinha. Quem souber fazer a conta antes da escritura paga o que deve. Quem não souber paga a conta da Prefeitura.",
    "A guia chega automaticamente, mas a aplicação do entendimento do STJ exige iniciativa do contribuinte. Conferir a base de cálculo antes da escritura é a etapa que mais reduz risco de pagar a maior."
  )
  if (n > 0) log.push(`[block 68] "Quem não souber paga a conta da Prefeitura" → versão consultiva`)
}

// ──────────────────────────────────────────────────────────────────
// FAQ — adicionar pergunta "Posso declarar valor menor para pagar menos ITBI?"
// ──────────────────────────────────────────────────────────────────
{
  // Find the FAQ section and the last existing FAQ paragraph
  const faqHeadingIdx = body.findIndex(
    (blk) => blk?.type === "heading" && inlineToString(blk?.content) === "Perguntas frequentes"
  )
  if (faqHeadingIdx >= 0) {
    // Check if pergunta about subdeclaração já existe
    const subdeclaracaoIdx = body.findIndex(
      (blk, i) => i > faqHeadingIdx && blk?.type === "heading" && inlineToString(blk?.content).includes("declarar valor menor")
    )
    if (subdeclaracaoIdx === -1) {
      // Insert between block 63 (Reforma Tributária answer) and block 64 (heading "Três coisas...")
      // Find the last FAQ paragraph
      const reformaIdx = body.findIndex(
        (blk, i) => i > faqHeadingIdx && blk?.type === "paragraph" && inlineToString(blk?.content).startsWith("Não. ITBI é tributo municipal")
      )
      if (reformaIdx >= 0) {
        // Insert heading + paragraph after reformaIdx
        const newHeading = makeHeading("Posso declarar valor menor para pagar menos ITBI?", 3)
        const newParagraph = makeParagraph([
          t("Não. A discussão sobre o Tema 1113/STJ é sobre usar o "),
          b("valor real de mercado"),
          t(" do imóvel, com documentos que comprovem a negociação e as condições do bem — não sobre declarar valor artificialmente menor. Subdeclaração pode gerar risco fiscal, cartorial e contratual, e não se confunde com a tese do STJ."),
        ])
        body.splice(reformaIdx + 1, 0, newHeading, newParagraph)
        log.push(`[FAQ] adicionada pergunta "Posso declarar valor menor para pagar menos ITBI?" com caveat contra subdeclaração`)
      }
    }
  }
}

// ──────────────────────────────────────────────────────────────────
// Substituições gerais — pra/pro
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "que cai pra 0,5%", "que cai para 0,5%")
    n += walkAndReplace(block, "valor venal cai pra ", "valor venal cai para ")
    n += walkAndReplace(block, "advogado tributarista em Curitiba pra essa causa", "advogado tributarista em Curitiba para essa causa")
    n += walkAndReplace(block, " que o post antigo não cobria", " que muitos guias antigos não cobriam")
    n += walkAndReplace(block, " desconto de 90%) pra imóveis", " desconto de 90%) para imóveis")
    n += walkAndReplace(block, "transferir imóvel pra uma pessoa jurídica", "transferir imóvel para uma pessoa jurídica")
    n += walkAndReplace(block, "ITBI cai de 2,7% pra ", "ITBI cai de 2,7% para ")
    n += walkAndReplace(block, " 2% em comerciais", " 2% para comerciais")
  }
  if (n > 0) log.push(`[multi] pra/pro → para/para o em ~8 ocorrências`)
}

// ──────────────────────────────────────────────────────────────────
// Block 4 — "vale a conta" + "cai pra 0,5%"
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "a parte financiada de R$ 200 mil cai pra 0,5%", "a parte financiada de R$ 200 mil cai para 0,5%")
  }
  if (n > 0) log.push(`[block 4] "cai pra 0,5%" → "cai para 0,5%"`)
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

const { error: updErr } = await sb.from("articles").update(update).eq("id", article.id)
if (updErr) {
  console.error("Erro atualizando:", updErr)
  process.exit(1)
}

console.log("\n✓ Artigo atualizado no Supabase.")
