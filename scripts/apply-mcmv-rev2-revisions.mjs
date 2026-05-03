/**
 * Aplica 2ª rodada de revisão no artigo `como-financiar-minha-casa-minha-vida`
 * em 03/05/2026.
 *
 * Foco:
 *   1. Title menos sensacionalista, sentence case
 *   2. SEO title/desc preenchidos (eram NULL)
 *   3. Block 0 (lead): "ontem" → datado; reescrita com caveat
 *   4. Block 6 + 25: "ninguém ainda está falando" / "a seção que prometi
 *      acima" → versão consultiva
 *   5. Block 32 (heading): "4 em cada 10 candidatos esquecem" → suavizar
 *   6. Block 34 (callout CadÚnico): "4 em cada 10 candidatos... segundo
 *      dados de cartórios de Curitiba" → caveat de fonte
 *   7. Block 50 (CTA intermediário): "10 minutos por WhatsApp e diz
 *      exatamente em qual faixa" → "Simular meu enquadramento"
 *   8. Block 73-77 (passo 4 análise crédito): adicionar caveat sobre
 *      aprovação não ser automática
 *   9. Block 83 (FAQ usado): "cerca de 60% dos imóveis vendidos via
 *      MCMV são usados" → caveat
 *  10. Block 91 (CTA final): "mais de 200 financiamentos MCMV / passam
 *      na primeira tentativa" → versão consultiva
 *  11. Substituições: "pra/pro" → "para/para o", "ontem" → "22/04/2026"
 *  12. Adicionar separação Faixa 1 subsidiada (Prefeitura) vs
 *      financiamento Caixa direto no FAQ ou seção apropriada
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "como-financiar-minha-casa-minha-vida"

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

// ──────────────────────────────────────────────────────────────────
// 0. Frontmatter
// ──────────────────────────────────────────────────────────────────
const NEW_TITLE = "Como financiar pelo Minha Casa Minha Vida em 2026: guia completo"
const NEW_DESC = "Faixas de renda, valores de imóvel, documentação, simulação e regras 2026 do Minha Casa Minha Vida. Veja como saber se você entra no programa."
const NEW_SEO_TITLE = "Como financiar pelo Minha Casa Minha Vida em 2026: guia completo"
const NEW_SEO_DESC = "Faixas de renda atualizadas em 2026, valores de imóvel, documentação, simulação e passo a passo do Minha Casa Minha Vida. Saiba se você entra."

let titleUpdate = null
let descUpdate = null
let seoTitleUpdate = null
let seoDescUpdate = null

if (article.title !== NEW_TITLE) {
  titleUpdate = NEW_TITLE
  log.push(`[frontmatter] title — versão sentence case sem "ontem"`)
}
if (article.description !== NEW_DESC) {
  descUpdate = NEW_DESC
  log.push(`[frontmatter] description — versão sem promessa "veja se você entra"`)
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
// Block-level rewrites
// ──────────────────────────────────────────────────────────────────

// Block 0 (lead) — "ontem" + caveat
{
  const blk = body[0]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes(" — ontem.") &&
    !txt.includes("Em 22 de abril de 2026")
  ) {
    blk.content = [
      t("As novas regras do "),
      b("Minha Casa Minha Vida entraram em vigor em 22/04/2026"),
      t(". A mudança de maior impacto foi a "),
      b("ampliação da Faixa 4"),
      t(", que agora permite financiar imóveis de até "),
      b("R$ 600 mil"),
      t(" (antes R$ 500 mil) com renda mensal bruta de até "),
      b("R$ 13 mil"),
      t(" (antes R$ 12 mil). Outras faixas também mudaram. Mas o programa não funciona igual para todos: a faixa de renda, o valor do imóvel, o uso do FGTS, a avaliação da Caixa e a documentação definem juros, entrada, prazo e chance de aprovação. Este guia mostra como financiar pelo MCMV em Curitiba sem confundir subsídio, pré-aprovação e contrato final."),
    ]
    log.push(`[block 0] lead — "ontem" → "22/04/2026" + caveat sobre subsídio/aprovação`)
  }
}

// Block 2 (heading) — "O que mudou desde ontem (22/04)"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "O que mudou desde ontem (22/04): o quadro completo", "O que mudou em 22/04/2026: o quadro completo")
  if (n > 0) log.push(`[block 2] heading "desde ontem" → "em 22/04/2026"`)
}

// Block 6 — "ninguém ainda está falando dele"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Existe um detalhe nessa tabela que muda o jogo pra quem ganha entre R$ 5.000 e R$ 9.600 — e ninguém ainda está falando dele. A gente volta nele depois da próxima seção.",
    "Há um detalhe nessa tabela que muda bastante a conta para quem ganha entre R$ 5.000 e R$ 9.600. Voltamos nele depois da próxima seção."
  )
  if (n > 0) log.push(`[block 6] "muda o jogo / ninguém ainda está falando" → versão consultiva`)
}

// Block 10 — "Elevou o teto de renda de R$ 12 mil pra R$ 13 mil"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, " de R$ 12 mil pra ", " de R$ 12 mil para ")
    n += walkAndReplace(block, " de R$ 500 mil pra ", " de R$ 500 mil para ")
    n += walkAndReplace(block, "eram empurradas pro SBPE caro", "eram empurradas para o SBPE com taxas mais altas")
  }
  if (n > 0) log.push(`[blocks 10-15] "pra / empurradas pro SBPE caro" → versão neutra`)
}

// Block 17 — "Se sua renda dá pra Faixa 3"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Se sua renda dá pra Faixa 3", "Se sua renda permite enquadramento na Faixa 3")
  if (n > 0) log.push(`[block 17] "Se sua renda dá pra Faixa 3" → "permite enquadramento"`)
}

// Block 17 — "Atenção" caveat: existing OK ("Faixa 4 não tem subsídio")
// add explicit reinforcement that subsidy isn't automatic
{
  const blk = body[17]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Faixa 4 não tem subsídio") &&
    txt.includes("Faixa 3 continua sendo mais vantajosa") &&
    !txt.includes("Subsídio não é automático")
  ) {
    blk.content = [
      b("Atenção:"),
      t(" a Faixa 4 "),
      b("não tem subsídio"),
      t(" (auxílio do governo) como as Faixas 1 e 2. O que ela oferece é teto maior e juros intermediários (~10% a.a. vs ~11% do SBPE). Se sua renda permite enquadramento na Faixa 3, a Faixa 3 costuma ser mais vantajosa financeiramente. Subsídio não é automático: depende de renda, faixa, composição familiar, localização do imóvel, disponibilidade orçamentária e regras vigentes."),
    ]
    log.push(`[block 17] Faixa 4 — adicionado caveat "Subsídio não é automático"`)
  }
}

// Block 19 — "puxada pra Faixa 2"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " — faixa que antes era puxada pra Faixa 2", " — faixa que antes era enquadrada na Faixa 2")
  if (n > 0) log.push(`[block 19] "puxada pra Faixa 2" → "enquadrada na Faixa 2"`)
}

// Block 25 — "Aqui está a seção que prometi acima"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Aqui está a seção que prometi acima.", "Aqui entra o detalhe que vale destacar.")
  if (n > 0) log.push(`[block 25] "Aqui está a seção que prometi acima" → "Aqui entra o detalhe que vale destacar"`)
}

// Block 31 — "regra do banco" caveat
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Parcela inicial: **~R$ 2.180/mês** (dentro dos 30% da renda, regra do banco)",
    "Parcela inicial: ~R$ 2.180/mês (como regra prática conservadora, a Caixa considera que a prestação não pode ultrapassar 30% da renda familiar mensal bruta)"
  )
  // The bold ** is markdown notation, won't match. Try simpler version:
  if (n === 0) {
    for (const block of body) n += walkAndReplace(block, " (dentro dos 30% da renda, regra do banco)", " (como regra prática conservadora, a Caixa considera que a prestação não pode ultrapassar 30% da renda familiar mensal bruta — mas a aprovação ainda depende de score, dívidas, idade, prazo e avaliação do imóvel)")
  }
  if (n > 0) log.push(`[block 31] "(dentro dos 30%, regra do banco)" → caveat completo de capacidade de pagamento`)
}

// Block 32 (heading) — "4 em cada 10 candidatos esquecem"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Documentos necessários: o detalhe que 4 em cada 10 candidatos esquecem", "Documentos necessários: o item que costuma ser deixado de lado")
  if (n > 0) log.push(`[block 32] heading "4 em cada 10 candidatos esquecem" → "item que costuma ser deixado de lado"`)
}

// Block 34 (callout CadÚnico) — "4 em cada 10 candidatos... segundo dados de cartórios de Curitiba"
{
  const blk = body[34]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "calloutBox" &&
    txt.includes("4 em cada 10 candidatos à Faixa 1 são reprovados na triagem inicial por causa disso, segundo dados de cartórios de Curitiba") &&
    !txt.includes("é uma das principais causas de reprovação")
  ) {
    blk.content = [
      b("Regra crítica:"),
      t(" para a Faixa 1 (e em alguns casos para faixas superiores), o CadÚnico precisa estar atualizado nos últimos "),
      b("2 anos"),
      t(" em CRAS ou online. CadÚnico desatualizado é uma das principais causas de reprovação na triagem inicial — verificar antes de simular evita perder tempo no processo."),
    ]
    log.push(`[block 34] callout CadÚnico — "4 em cada 10... segundo dados de cartórios" → "uma das principais causas de reprovação"`)
  }
}

// Block 50 (CTA intermediário) — refinar
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Vai simular o MCMV e não sabe qual faixa é a sua?"
    ) {
      block.props.title = "Quer saber se você entra no Minha Casa Minha Vida?"
      block.props.description = "A FYMOOB cruza renda, FGTS, entrada, valor do imóvel e documentação para estimar sua faixa, simular a parcela e indicar imóveis que têm chance real de enquadramento em Curitiba."
      block.props.label = "Simular meu enquadramento"
      log.push(`[block 50] CTA intermediário — "Vai simular MCMV / 10 minutos diz exatamente" → "Simular meu enquadramento"`)
      break
    }
  }
}

// Block 71 — "imóveis parecerem compatíveis... travados por averbação pendente (problema frequente em Curitiba)"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "é comum imóveis parecerem compatíveis com MCMV mas estarem travados por averbação pendente (problema frequente em Curitiba).",
    "alguns imóveis parecem compatíveis com o MCMV mas ficam travados por averbação pendente — é uma das ocorrências mais comuns na due diligence."
  )
  if (n > 0) log.push(`[block 71] "problema frequente em Curitiba" → "uma das ocorrências mais comuns na due diligence"`)
}

// Block 73-77 — Passo 4: adicionar caveat de que aprovação não é automática
{
  const blk = body[77]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt === "Prazo típico: 15-30 dias." &&
    body[78]?.type === "heading"
  ) {
    // Insert caveat between block 77 and block 78. Actually safer to extend block 77.
    blk.content = [
      t("Prazo típico: 15 a 30 dias. A aprovação depende de score, dívidas existentes, idade, prazo, entrada, valor do imóvel, documentação e avaliação do bem — ter renda dentro da faixa não significa aprovação automática."),
    ]
    log.push(`[block 77] Passo 4 — adicionado caveat "renda dentro da faixa não significa aprovação automática"`)
  }
}

// Block 81 (FAQ FGTS) — "Posso usar FGTS pra dar entrada?"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Posso usar FGTS pra dar entrada?", "Posso usar FGTS para dar entrada?")
  if (n > 0) log.push(`[block 81] FAQ FGTS — "pra dar entrada" → "para dar entrada"`)
}

// Block 83 (FAQ usado) — "cerca de 60% dos imóveis vendidos via MCMV são usados"
{
  const blk = body[83]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("60% dos imóveis vendidos via MCMV são usados") &&
    !txt.includes("aceita imóveis novos e usados, desde que o imóvel esteja regular")
  ) {
    blk.content = [
      b("Posso comprar imóvel usado pelo MCMV?"),
      t(" Sim. O programa aceita imóveis novos e usados, desde que o imóvel esteja regular, seja aprovado na avaliação da Caixa e se enquadre nas regras de valor, localização e modalidade. Em Curitiba, parte relevante das compras via MCMV envolve usado, especialmente em bairros consolidados onde imóvel novo dentro do teto da faixa é mais raro."),
    ]
    log.push(`[block 83] FAQ usado — "60% dos imóveis vendidos via MCMV são usados" → caveat de regularidade e avaliação`)
  }
}

// Block 84 (FAQ prazo máximo) — "pra quem financia acima de 55 anos"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " Na prática, pra quem financia acima de 55 anos, o banco reduz o prazo pra que a última parcela", " Na prática, para quem financia acima de 55 anos, o banco reduz o prazo para que a última parcela")
  if (n > 0) log.push(`[block 84] FAQ prazo — "pra quem financia / pra que a última parcela" → "para"`)
}

// Block 86 (FAQ PJ/autônomo) — "Com renda PJ/autônomo dá pra entrar?"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Com renda PJ/autônomo dá pra entrar?", "Quem é PJ ou autônomo consegue entrar?")
  if (n > 0) log.push(`[block 86] FAQ PJ/autônomo — "dá pra entrar" → "consegue entrar"`)
}

// Block 87 (FAQ condomínio fechado) — "vários condomínios em Santa Felicidade"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Em Curitiba, vários condomínios em Santa Felicidade, Campo Comprido e região do Ecoville têm unidades dentro do teto da Faixa 4 (R$ 600 mil).",
    "Em Curitiba, alguns condomínios em Santa Felicidade, Campo Comprido e região do Ecoville costumam ter unidades dentro do teto da Faixa 4 (R$ 600 mil) — sempre validar caso a caso."
  )
  if (n > 0) log.push(`[block 87] FAQ condomínio — "vários condomínios" → "alguns condomínios... sempre validar caso a caso"`)
}

// Block 89 — "as mudanças que entraram em vigor ontem"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "As mudanças que entraram em vigor ontem", "As mudanças que entraram em vigor em 22/04/2026")
  if (n > 0) log.push(`[block 89] "que entraram em vigor ontem" → "em 22/04/2026"`)
}

// Block 91 (CTA final) — "mais de 200 financiamentos MCMV / passam na primeira tentativa"
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Quer ver imóveis em Curitiba que entram no MCMV 2026?" &&
      typeof block.props?.description === "string" &&
      block.props.description.includes("mais de 200 financiamentos MCMV")
    ) {
      block.props.description = "A FYMOOB tem opções em todas as 4 faixas — do Tatuquara ao Batel compacto. A equipe acompanha o processo e ajuda a verificar enquadramento, documentação e regularidade do imóvel antes da proposta."
      log.push(`[block 91] CTA final — "mais de 200 financiamentos / passam na primeira tentativa" → versão consultiva`)
      break
    }
  }
}

// Block 98 — disclaimer final está bom. OK.

// CTA WhatsApp link — pra/pro nos hrefs
{
  for (const block of body) {
    if (block?.type === "ctaBox" && typeof block.props?.href === "string") {
      const before = block.props.href
      const after = before
        .replaceAll("pra simular", "para simular")
        .replaceAll("pra entender", "para entender")
        .replaceAll("pra qual faixa", "para qual faixa")
      if (after !== before) {
        block.props.href = after
        log.push(`[CTA href] link — "pra/pro" → "para/para o"`)
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
