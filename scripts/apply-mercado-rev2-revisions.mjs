/**
 * Aplica 2ª rodada de revisão no artigo `mercado-imobiliario-curitiba-2026`
 * em 03/05/2026. Foco:
 *   1. Atualizar Selic de 14,75% → 14,50% (corte Copom 29/04/2026)
 *   2. FAQ bolha: remover "7 critérios do UBS" (Curitiba não é classificada)
 *   3. FAQ endividamento: 49,7% → 49,9% (alinhar com corpo)
 *   4. Tabela ranking: "Preço médio m² abr/2026 R$ 11.800" → "mar/2026 R$ 11.621"
 *   5. "Por que? O captação." → "Por quê? A captação."
 *   6. "Pra a maioria" → "Para boa parte"
 *   7. Suavizar "assustaria qualquer relatório do Sinduscon"
 *   8. Substituir "triangular" por "comparar com"
 *   9. CTA final mais alinhado com tese do artigo
 *  10. Suavizar absolutos (FipeZap +78% 10 anos, ~10% PIB, "Top 3 menores")
 *  11. Ajustar Lei 16.361 "gabarito era de 6"
 *  12. Várias trocas pra/pro → para/para o
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

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
  .select("id, slug, title, body")
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
// 1. Block-level rewrites (idempotent via marker)
// ──────────────────────────────────────────────────────────────────

// Block 2 (tabela ranking) — Preço médio m² + Top 3 menores
{
  const blk = body[2]
  if (blk?.type === "table" && blk.content?.rows) {
    for (const row of blk.content.rows) {
      for (const cell of row.cells || []) {
        let n = 0
        n += walkAndReplace(cell, "Preço médio m² (abr/2026)", "Preço médio m² (mar/2026)")
        n += walkAndReplace(cell, "~R$ 11.800", "~R$ 11.621")
        n += walkAndReplace(cell, "Top 3 menores do país", "Entre os menores no recorte FipeZap")
        if (n > 0) log.push(`[block 2] tabela ranking — célula atualizada`)
      }
    }
  }
}
// dedupe block 2 logs
{
  const set = new Set(log)
  log.length = 0
  for (const l of set) log.push(l)
}

// Block 3 (footer table) — adicionar caveat FipeZap mar/2026
{
  const blk = body[3]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.startsWith("Dados consolidados em abril/2026.") &&
    !txt.includes("FipeZap mar/2026 para preço de venda")
  ) {
    blk.content = [
      t("Dados consolidados em abril/2026, com "),
      link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap mar/2026"),
      t(" para preço de venda. Outras fontes cruzadas: "),
      link("https://www.ademi-pr.com.br/", "ADEMI-PR"),
      t(", "),
      link("https://sinduscon-pr.com.br/", "Sinduscon-PR"),
      t("."),
    ]
    log.push(`[block 3] footer da tabela — competência FipeZap mar/2026 explícita`)
  }
}

// Block 9 — Lei 16.361/2024 "gabarito era de 6"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(
      block,
      "que liberou edifícios de 10 andares no Batel e no Alto da XV, quando o gabarito era de 6.",
      "que liberou edifícios de 10 andares no Batel e no Alto da XV, em áreas onde o limite anterior era menor."
    )
  }
  if (n > 0) log.push(`[block 9] Lei 16.361 — "gabarito era de 6" → "limite anterior era menor"`)
}

// Block 10 (callout) — "pra onde o dinheiro está indo"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(
      block,
      " valorização em 12m é o sinal de pra onde o dinheiro está indo ",
      " valorização em 12 meses é um sinal de onde a demanda está mais forte "
    )
    n += walkAndReplace(
      block,
      ". Preço absoluto é onde ele ",
      ". Preço absoluto é onde ela "
    )
  }
  if (n > 0) log.push(`[block 10] callout — "pra onde o dinheiro" + "onde ele já foi" reescrito`)
}

// Block 13 — FipeZap +78% 10 anos: suavizar
{
  const blk = body[13]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("FipeZap Curitiba acumulou +78% em 10 anos") &&
    !txt.includes("o preço nominal de Curitiba ficou abaixo da inflação acumulada")
  ) {
    blk.content = [
      b("Crescimento real (ajustado pela inflação):"),
      t(" pela série histórica usada no artigo, o preço nominal de Curitiba ficou abaixo da inflação acumulada no período 2014–2024 (FipeZap +78% vs IPCA +85,8%). Isso afasta o padrão clássico de bolha de crescimento real explosivo, embora não elimine riscos de preço/renda em 2026."),
    ]
    log.push(`[block 13] "+78% 10 anos / oposto do sinal de bolha" → suavizado`)
  }
}

// Block 14 — Crédito ~10% do PIB: suavizar
{
  const blk = body[14]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("crédito imobiliário brasileiro é ~10% do PIB") &&
    !txt.includes("ainda é baixo como proporção do PIB quando comparado")
  ) {
    blk.content = [
      b("Preço relativo ao PIB:"),
      t(" o crédito imobiliário brasileiro ainda é baixo como proporção do PIB quando comparado a mercados que passaram por bolhas clássicas, como os EUA antes de 2008."),
    ]
    log.push(`[block 14] "~10% do PIB / EUA 60%+" → versão suavizada`)
  }
}

// Block 18 — "4,74% ao ano (FipeZap) é um dos três menores retornos do país"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "4,74% ao ano (FipeZap) é um dos três menores retornos do país.",
    "4,74% ao ano é um dos menores retornos entre as capitais avaliadas no recorte FipeZap mar/2026."
  )
  if (n > 0) log.push(`[block 18] "três menores do país" → caveat de capitais avaliadas`)
}

// Block 21 — "Quem fecha venda toda semana" + "assustaria Sinduscon"
{
  const blk = body[21]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Quem fecha venda toda semana em Curitiba vê primeiro") &&
    !txt.includes("Quem acompanha negociações semanalmente")
  ) {
    blk.content = [
      t("A estatística nacional demora a circular. Quem acompanha negociações semanalmente em Curitiba costuma perceber esses sinais antes de eles aparecerem nos relatórios consolidados. O que está sendo visto nas últimas 8 semanas é uma combinação que exigiria atenção em qualquer relatório setorial: endividamento das famílias em recorde absoluto e poupança em resgate líquido sustentado."),
    ]
    log.push(`[block 21] "Quem fecha venda... assustaria Sinduscon" → versão consultiva`)
  }
}

// Block 27 — bank repassa Selic
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "queda da Selic pro crédito imobiliário", "queda da Selic para o crédito imobiliário")
    n += walkAndReplace(block, "reduziu a taxa do crédito de 11,70% pra 11,60%", "reduziu a taxa do crédito de 11,70% para 11,60%")
    n += walkAndReplace(block, "Quando caiu de 15% pra 14,75% em março", "Quando caiu de 15% para 14,75% em março")
    n += walkAndReplace(block, ". Está segurando margem pra proteger o captação.", ". Está segurando margem para proteger a captação.")
  }
  if (n > 0) log.push(`[block 27] várias "pra" → "para" + "o captação" → "a captação"`)
}

// Block 35 — snapshot → recorte
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "snapshot abr/2026", "recorte abr/2026")
  if (n > 0) log.push(`[block 35] "snapshot" → "recorte" (cluster rule)`)
}

// Block 35 — "triangular com FipeZap Locação"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Antes de fechar, triangular com FipeZap Locação", "Antes de fechar, comparar com FipeZap Locação")
    n += walkAndReplace(block, "número fechado pra modelar investimento", "número fechado para modelar investimento")
    n += walkAndReplace(block, " Pra cálculo fechado em um imóvel específico,", " Para cálculo fechado em um imóvel específico,")
  }
  if (n > 0) log.push(`[block 35] "triangular / pra modelar / Pra cálculo fechado"`)
}

// Block 38 — Selic 14,75% → 14,50% (Copom 29/04/2026)
{
  const blk = body[38]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Selic está em") &&
    txt.includes("14,75%") &&
    !txt.includes("14,50% a.a.")
  ) {
    blk.content = [
      t("A Selic caiu para "),
      b("14,50% a.a."),
      t(" em 29/04/2026, após novo corte de 0,25 ponto percentual pelo Copom. Mesmo assim, as taxas dos bancos no crédito imobiliário "),
      b("não acompanham 1:1"),
      t(" — o funding do crédito habitacional depende de poupança, FGTS, apetite dos bancos e risco de crédito, não apenas da taxa básica."),
    ]
    log.push(`[block 38] Selic 14,75% → 14,50% (Copom 29/04/2026)`)
  }
}

// Block 39 — "três meses de Selic caindo e as taxas imobiliárias quase paradas"
{
  const blk = body[39]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("três meses de Selic caindo e as taxas imobiliárias quase paradas") &&
    !txt.includes("seguem praticamente estáveis")
  ) {
    blk.content = [
      t("A Caixa continua com taxa de balcão em 11,19% a.a. + TR (10,26% para correntista com relacionamento). O Itaú em 11,60%. Bradesco em 11,70%. BRB, o segundo menor do país, em 11,36%. Mesmo com cortes recentes na Selic, as taxas imobiliárias seguem praticamente estáveis, porque o funding do crédito habitacional depende de poupança, FGTS, apetite dos bancos e risco de crédito — não apenas da taxa básica."),
    ]
    log.push(`[block 39] "três meses de Selic caindo / taxas paradas" → versão consultiva`)
  }
}

// Block 40 — "Por que? O captação."
{
  const blk = body[40]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Por que? O captação") &&
    !txt.includes("Por quê? Porque a captação está apertada")
  ) {
    blk.content = [
      t("Por quê? Porque a captação está apertada. O crédito imobiliário brasileiro não depende diretamente da Selic; ele depende principalmente de "),
      b("poupança (SBPE) + FGTS"),
      t(". E os dois estão apertados:"),
    ]
    log.push(`[block 40] "Por que? O captação" → "Por quê? Porque a captação está apertada"`)
  }
}

// Block 43 — pra/pro
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "puxar a Selic real (descontada inflação) pra baixo", "puxar a Selic real (descontada inflação) para baixo")
    n += walkAndReplace(block, "\"a Selic cair pra comprar\"", "\"a Selic cair para comprar\"")
  }
  if (n > 0) log.push(`[block 43] "pra baixo / pra comprar" → "para baixo / para comprar"`)
}

// Block 44 — "qual faz sentido pra cada perfil" + "Melhor banco pra financiar"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "qual faz sentido pra cada perfil", "qual faz sentido para cada perfil")
    n += walkAndReplace(block, "Melhor banco pra financiar imóvel em 2026", "Melhor banco para financiar imóvel em 2026")
  }
  if (n > 0) log.push(`[block 44] "pra cada perfil / Melhor banco pra financiar" → "para"`)
}

// Block 52 — "minuta previstas pra Câmara"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "minuta previstas pra Câmara", "minuta prevista para a Câmara")
  if (n > 0) log.push(`[block 52] "minuta previstas pra Câmara" → "minuta prevista para a Câmara"`)
}

// Block 55 (table) — pra → para nas células
{
  const blk = body[55]
  if (blk?.type === "table" && blk.content?.rows) {
    let n = 0
    for (const row of blk.content.rows) {
      for (const cell of row.cells || []) {
        n += walkAndReplace(cell, "Compra pra morar 7+ anos", "Compra para morar por 7+ anos")
        n += walkAndReplace(cell, "Compra pra revender em 1-3 anos", "Compra para revender em 1–3 anos")
        n += walkAndReplace(cell, "Investe pra renda mensal", "Investe para renda mensal")
        n += walkAndReplace(cell, "Investe pra valorização", "Investe para valorização")
      }
    }
    if (n > 0) log.push(`[block 55] tabela situação do comprador — "pra" → "para"`)
  }
}

// Block 56 — "Pra a maioria"
{
  const blk = body[56]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Pra a maioria dos compradores em Curitiba") &&
    !txt.includes("Para boa parte dos compradores")
  ) {
    blk.content = [
      t("Para boa parte dos compradores em Curitiba, a conta hoje empata: financiar um imóvel parecido com o alugado gera uma saída mensal semelhante. O ganho real está em "),
      b("trocar de bairro"),
      t(" — sair de uma região com aluguel/preço caro e valorização parada (Batel) para uma região onde o ciclo está acelerando (Ahú, Juvevê, Bom Retiro). Para quem ainda está decidindo entre apartamento e casa, o "),
      link("/blog/apartamento-ou-casa-curitiba", "comparativo casa ou apartamento em Curitiba"),
      t(" mostra a diferença de preço por bairro com base no FipeZap por tipologia."),
    ]
    log.push(`[block 56] "Pra a maioria" → "Para boa parte" + reescrita consultiva`)
  }
}

// Block 58 (table) — "Bairros pra olhar primeiro"
{
  const blk = body[58]
  if (blk?.type === "table" && blk.content?.rows) {
    let n = 0
    for (const row of blk.content.rows) {
      for (const cell of row.cells || []) {
        n += walkAndReplace(cell, "Bairros pra olhar primeiro", "Bairros para olhar primeiro")
      }
    }
    if (n > 0) log.push(`[block 58] tabela melhor bairro — "pra olhar" → "para olhar"`)
  }
}

// Block 61 (FAQ vale a pena investir) — "Pra investidor focado em renda" + "triangular"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, " Pra investidor focado em renda,", " Para investidor focado em renda,")
    n += walkAndReplace(block, "triangular com FipeZap Locação", "comparar com FipeZap Locação e pesquisa Secovi-PR")
    n += walkAndReplace(block, " Pra valorização, os bairros em ", " Para valorização, os bairros em ")
  }
  if (n > 0) log.push(`[block 61] FAQ — "Pra investidor / triangular / Pra valorização"`)
}

// Block 65 (FAQ bolha) — full rewrite
{
  const blk = body[65]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Dos 7 critérios do UBS Global Real Estate Bubble Index") &&
    !txt.includes("não é avaliada formalmente pelo UBS")
  ) {
    blk.content = [
      b("Não na definição clássica."),
      t(" Curitiba não é avaliada formalmente pelo "),
      link("https://www.ubs.com/global/en/media/display-page-ndp/en-20250923-grebi25.html", "UBS Global Real Estate Bubble Index"),
      t(", então não dá para dizer que a cidade \"passou\" ou \"reprovou\" nos critérios do relatório. A leitura precisa ser indireta: São Paulo, única cidade brasileira no UBS 2025, aparece em "),
      b("baixo risco de bolha"),
      t(". Para Curitiba, os alertas são preço/renda alto e aluguel rendendo pouco sobre o preço do imóvel; os fatores que afastam uma bolha clássica são crescimento real de longo prazo mais comportado, crédito imobiliário ainda baixo em relação ao PIB e ausência de alavancagem generalizada como em crises imobiliárias clássicas. O endividamento das famílias está em "),
      b("49,9% da renda anual acumulada"),
      t(", com comprometimento mensal de 29,7% — pressão nos fundamentos do crédito sem caracterizar bolha."),
    ]
    log.push(`[block 65] FAQ bolha — "7 critérios UBS" + 49,7% → reescrita completa com 49,9%`)
  }
}

// Block 67 (FAQ Selic Focus 13%) — datar previsão
{
  const blk = body[67]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("se o Focus estiver certo (Selic em 13% no fim de 2026)") &&
    !txt.includes("Se as projeções de mercado se confirmarem")
  ) {
    blk.content = [
      t("Depende da relação aluguel atual vs. valor do imóvel-alvo. Se você paga aluguel de 0,50%/mês ou mais do valor do imóvel, comprar já faz sentido. Se paga menos de 0,45%, pode valer esperar 6-12 meses. Se as projeções de mercado se confirmarem e a Selic continuar caindo ao longo de 2026, as taxas imobiliárias podem recuar gradualmente — mas não necessariamente na mesma proporção."),
    ]
    log.push(`[block 67] FAQ Selic — "Focus em 13% no fim de 2026" → projeção genérica datada`)
  }
}

// Block 69 (FAQ Lei 16.361) — "gabarito era 6" + "preço pressionado pra baixo" + "estender essa regra pra outros bairros"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(
      block,
      "A lei liberou edifícios de até 10 andares em bairros onde o gabarito era 6 (Batel, Alto da XV).",
      "A lei liberou edifícios de até 10 andares em bairros onde o limite anterior era menor (Batel, Alto da XV)."
    )
    n += walkAndReplace(block, "preço pressionado pra baixo", "preço pressionado para baixo")
    n += walkAndReplace(block, "pode estender essa regra pra outros bairros", "pode estender essa regra para outros bairros")
  }
  if (n > 0) log.push(`[block 69] FAQ Lei 16.361 — "gabarito era 6 / pra baixo / pra outros bairros"`)
}

// Block 9 — também tem "preço pressionado pra baixo" no corpo
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "preço pressionado pra baixo. Ahú e Juvevê", "preço pressionado para baixo. Ahú e Juvevê")
  if (n > 0) log.push(`[block 9] corpo Lei 16.361 — "pressionado pra baixo" → "para baixo"`)
}

// Block 73 (CTA final) — refinar
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Ver imóveis em Curitiba em 2026"
    ) {
      block.props.title = "Quer comparar bairros antes de comprar?"
      block.props.description = "A FYMOOB cruza objetivo, orçamento, financiamento, rentabilidade de aluguel e valorização por bairro para indicar onde faz sentido comprar em Curitiba em 2026."
      block.props.label = "Comparar bairros"
      log.push(`[block 73] CTA final — refinado para "Comparar bairros"`)
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

const { error: updErr } = await sb
  .from("articles")
  .update({ body, updated_at: new Date().toISOString() })
  .eq("id", article.id)
if (updErr) {
  console.error("Erro atualizando:", updErr)
  process.exit(1)
}

console.log("\n✓ Artigo atualizado no Supabase.")
