/**
 * Aplica 2ª rodada de revisão no artigo `melhores-bairros-curitiba-2026`
 * em 03/05/2026.
 *
 * Foco:
 *   1. Suavizar absolutos: "4º mais seguro do Brasil", "único bairro
 *      verdadeiramente andável", "Segurança máxima", "todo guia",
 *      "ninguém fala", "Não é próximo Batel"
 *   2. Caveats SESP-PR em segurança (block 16, 55)
 *   3. Harmonizar Ahú (FAQ block 59) — foco em valorização, não renda
 *   4. Harmonizar Campina do Siqueira com PMQ (FAQ block 61, table 35)
 *   5. Substituir jargões: "DNA casa alto padrão", "Investidor não mora",
 *      "o dinheiro está indo pra lá", "a lógica diz", "empoeiramento",
 *      "seguir cego", "Rode a conta"
 *   6. CTA final alinhado com CTA intermediário ("Comparar bairros")
 *   7. ~15 ocorrências pra/pro → para/para o em headings, FAQs, bullets
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "melhores-bairros-curitiba-2026"

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

function replaceCellContent(table, rowIdx, colIdx, newContent) {
  if (!table?.content?.rows?.[rowIdx]?.cells?.[colIdx]) return false
  table.content.rows[rowIdx].cells[colIdx].content = newContent
  return true
}

// ──────────────────────────────────────────────────────────────────
// Block-level rewrites
// ──────────────────────────────────────────────────────────────────

// Block 9 — Pontuação composta abril/2026 + caveat
{
  const blk = body[9]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt === "Pontuação composta abril/2026. Cada critério 0-20, peso igual. Fonte primária de cada critério listada na metodologia."
  ) {
    blk.content = [
      t("Pontuação composta em abril/2026, usando FipeZap mar/2026 para preço do m² e fontes atualizadas até maio/2026. Cada critério vale de 0 a 20 com peso igual. A fonte primária de cada critério está listada na metodologia."),
    ]
    log.push(`[block 9] caveat de período/fonte explícito (FipeZap mar/2026 para preço)`)
  }
}

// Block 10 — "cai pro 3º"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "por que o Batel, apesar do prestígio, cai pro 3º quando você soma tudo",
    "por que o Batel, apesar do prestígio, cai para o 3º lugar quando você soma tudo"
  )
  if (n > 0) log.push(`[block 10] "cai pro 3º" → "cai para o 3º lugar"`)
}

// Block 16 — Ahú segurança "zero homicídios letais em Curitiba no bairro"
{
  const blk = body[16]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("zero homicídios letais em Curitiba no bairro") &&
    !txt.includes("não aparecem homicídios letais reportados no Ahú")
  ) {
    blk.content = [
      b("Segurança:"),
      t(" na agregação consultada para janeiro a setembro de 2025 ("),
      link("https://www.seguranca.pr.gov.br/CAPE/Estatisticas", "SESP-PR / CAPE"),
      t(", via iLove Curitiba e MySide), não aparecem homicídios letais reportados no Ahú. Como a SESP-PR não publica esse recorte por bairro de forma padronizada, o dado deve ser lido como indicador, não como garantia."),
    ]
    log.push(`[block 16] Ahú segurança — "zero homicídios em Curitiba no bairro" → caveat de agregação`)
  }
}

// Block 21 — "o dinheiro está indo pra lá / a lógica diz"
{
  const blk = body[21]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("o dinheiro está indo pra lá") &&
    !txt.includes("a demanda está se deslocando para o Ahú")
  ) {
    blk.content = [
      t("É um caso de \"ponto ideal\" factual: a demanda está se deslocando para o Ahú antes de o preço se aproximar do Batel. Se a valorização relativa continuar, a diferença de preço entre Ahú e Batel tende a diminuir nos próximos anos."),
    ]
    log.push(`[block 21] "o dinheiro está indo pra lá / a lógica diz" → versão consultiva`)
  }
}

// Block 23 (heading) — "Top 5 bairros pra família com filhos pequenos"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Top 5 bairros pra família com filhos pequenos", "Top 5 bairros para família com filhos pequenos")
  if (n > 0) log.push(`[block 23] heading "pra família" → "para família"`)
}

// Block 25 (table) — Ecoville DNA + Santa Felicidade 4º mais seguro
{
  const blk = body[25]
  if (blk?.type === "table" && blk.content?.rows) {
    let n = 0
    // Row 3 col 2 (Ecoville)
    const r3c2 = inlineToString(blk.content.rows?.[3]?.cells?.[2]?.content)
    if (r3c2.includes("DNA casa alto padrão em condomínio fechado")) {
      replaceCellContent(blk, 3, 2, [
        t("Mossunguê/Ecoville — perfil de alto padrão, com condomínios fechados, apartamentos grandes e famílias vindas de outras capitais. Parque Barigui adjacente."),
      ])
      n++
    }
    // Row 5 col 2 (Santa Felicidade)
    const r5c2 = inlineToString(blk.content.rows?.[5]?.cells?.[2]?.content)
    if (r5c2.includes("4º mais seguro do Brasil em crimes letais")) {
      replaceCellContent(blk, 5, 2, [
        t("Bom indicador de segurança na agregação consultada, vida de bairro forte e tradição residencial. Colégios Medianeira e Santa Maria Curitiba próximos."),
      ])
      n++
    }
    if (n > 0) log.push(`[block 25] tabela família — "DNA casa" + "4º mais seguro do Brasil" suavizados`)
  }
}

// Block 26 — "Pra repensar na família"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra repensar na família:", "Para repensar na família:")
  if (n > 0) log.push(`[block 26] "Pra repensar" → "Para repensar"`)
}

// Block 27 (heading)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Top 5 bairros pra jovem profissional solteiro ou casal sem filhos", "Top 5 bairros para jovem profissional solteiro ou casal sem filhos")
  if (n > 0) log.push(`[block 27] heading "pra jovem" → "para jovem"`)
}

// Block 29 (table) — Alto da Glória "único bairro verdadeiramente andável"
{
  const blk = body[29]
  if (blk?.type === "table" && blk.content?.rows) {
    const r1c2 = inlineToString(blk.content.rows?.[1]?.cells?.[2]?.content)
    if (r1c2.includes("Único bairro verdadeiramente andável de CWB")) {
      replaceCellContent(blk, 1, 2, [
        b("Um dos bairros mais caminháveis da região central."),
        t(" Mercado Municipal, Passeio Público, Nestor de Castro. Café e restaurante a pé."),
      ])
      log.push(`[block 29] tabela jovem — "único bairro verdadeiramente andável" suavizado`)
    }
  }
}

// Block 30 (heading)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Top 5 bairros pra aposentado ou família madura", "Top 5 bairros para aposentado ou família madura")
  if (n > 0) log.push(`[block 30] heading "pra aposentado" → "para aposentado"`)
}

// Block 32 (table) — Jardim Social telegráfico + Santa Felicidade Segurança máxima + Ahú "pra patrimônio"
{
  const blk = body[32]
  if (blk?.type === "table" && blk.content?.rows) {
    let n = 0
    const r3c2 = inlineToString(blk.content.rows?.[3]?.cells?.[2]?.content)
    if (r3c2.includes("Clube Curitibano, ruas largas, vida social do Paraná tradicional")) {
      replaceCellContent(blk, 3, 2, [
        t("Ruas largas, perfil residencial tradicional e proximidade com o Clube Curitibano."),
      ])
      n++
    }
    const r4c2 = inlineToString(blk.content.rows?.[4]?.cells?.[2]?.content)
    if (r4c2.includes("Segurança máxima, vida de bairro")) {
      replaceCellContent(blk, 4, 2, [
        t("Bom indicador de segurança, vida de bairro e preço ainda competitivo. Tradição italiana — comunidade consolidada."),
      ])
      n++
    }
    const r5c2 = inlineToString(blk.content.rows?.[5]?.cells?.[2]?.content)
    if (r5c2.includes("bom pra patrimônio")) {
      replaceCellContent(blk, 5, 2, [
        t("Calmo, seguro, infraestrutura completa. Único da lista que também valoriza forte (+12,5% em 12 meses) — bom para patrimônio."),
      ])
      n++
    }
    if (n > 0) log.push(`[block 32] tabela aposentado — Jardim Social/Santa Felicidade/Ahú reescritos`)
  }
}

// Block 33 (heading)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Top 5 bairros pra investidor (renda de aluguel)", "Top 5 bairros para investidor (renda de aluguel)")
  if (n > 0) log.push(`[block 33] heading "pra investidor" → "para investidor"`)
}

// Block 34 — "Investidor não mora"
{
  const blk = body[34]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Investidor não mora — quer renda e saída fácil") &&
    !txt.includes("Para investidor, o foco é rendimento")
  ) {
    blk.content = [
      b("Pesos:"),
      t(" 40% rendimento de aluguel + 25% facilidade de vender ou alugar (tempo no mercado) + 20% valorização esperada + 15% risco de ficar vazio. Para investidor, o foco é rendimento, facilidade de venda ou locação e baixo risco de o imóvel ficar vazio."),
    ]
    log.push(`[block 34] "Investidor não mora — quer renda e saída fácil" → versão consultiva`)
  }
}

// Block 35 (table) — Campina do Siqueira "Dado indicativo"
{
  const blk = body[35]
  if (blk?.type === "table" && blk.content?.rows) {
    const r5c2 = inlineToString(blk.content.rows?.[5]?.cells?.[2]?.content)
    const r5c3 = inlineToString(blk.content.rows?.[5]?.cells?.[3]?.content)
    if (r5c2.startsWith("Dado indicativo") || r5c3.includes("Preço ainda pré-boom")) {
      replaceCellContent(blk, 5, 2, [t("Leitura ainda indicativa")])
      replaceCellContent(blk, 5, 3, [
        t("O traçado do BRT Leste-Oeste passa pela região, e o preço ainda não incorporou totalmente esse potencial."),
      ])
      log.push(`[block 35] tabela investidor — Campina do Siqueira "Dado indicativo" reescrito`)
    }
  }
}

// Block 40 — Bacacheri "Todo guia foca no eixo Batel-Bigorrilho-Água Verde"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Todo guia foca no eixo Batel-Bigorrilho-Água Verde.",
    "Muitos guias focam no eixo Batel–Bigorrilho–Água Verde."
  )
  if (n > 0) log.push(`[block 40] "Todo guia" → "Muitos guias"`)
}

// Block 44 — São Lourenço "Ninguém fala como bairro pra morar"
{
  const blk = body[44]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.startsWith("Ninguém fala como \"bairro pra morar\"") &&
    !txt.startsWith("São Lourenço costuma aparecer mais como bairro de escolas")
  ) {
    blk.content = [
      t("São Lourenço costuma aparecer mais como bairro de escolas do que como bairro para morar. Acontece que abriga dois colégios no top 10 ENEM particulares do Paraná: "),
      b("Bosque Mananciais (#1)"),
      t(" e "),
      b("Marista Santa Maria (#7)"),
      t(". Morador que valoriza educação acima de tudo encontra ali um diferencial específico — preço de m² acessível, escola de excelência ao alcance e vida residencial tranquila."),
    ]
    log.push(`[block 44] São Lourenço "Ninguém fala" → versão consultiva`)
  }
}

// Block 47 — Batel: várias mudanças
{
  const blk = body[47]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("pra família com criança pequena ou aposentado") &&
    !txt.includes("para família com criança pequena ou aposentado")
  ) {
    blk.content = [
      link("/imoveis/batel", "Batel", { bold: true }),
      b(" para família com criança pequena ou aposentado."),
      t(" O Batel continua imbatível como endereço, mas a "),
      link("https://www.curitiba.pr.leg.br/informacao/projetos-especiais/plano-de-recuperacao-1/projetos-do-plano-de-recuperacao/mudancas-no-itbi", "Lei Complementar 16.361/2024"),
      t(" liberou edifícios de 10 andares (limite anterior era menor). Isso significa pelo menos 3 anos de obras simultâneas (Porto Batel, Sublime, Grand Lodge, A. Andersen, Emiliano 724): trânsito, barulho e poeira de obra. Para quem está no auge da carreira e passa pouco tempo em casa, ainda funciona. Para quem quer criança brincando no chão e aposentado tomando café na varanda com calma para dormir, vale adiar 3 anos."),
    ]
    log.push(`[block 47] Batel — "pra família / pra quem tá / empoeiramento / pra dormir" → versão consultiva`)
  }
}

// Block 49 — Mercês "Não é próximo Batel. Pode virar"
{
  const blk = body[49]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Não é próximo Batel. Pode virar") &&
    !txt.includes("ainda não se comporta como um \"próximo Batel\"")
  ) {
    blk.content = [
      link("/busca?bairro=Merces", "Mercês", { bold: true }),
      b(" como \"próximo Batel\"."),
      t(" Algumas listas colocam Mercês como emergente. FipeZap março/2026: Mercês valorizou "),
      b("+3,8% em 12 meses — abaixo do IPCA (+3,81%)"),
      t(". Hoje, Mercês ainda não se comporta como um \"próximo Batel\" em valorização. Isso pode mudar se a revisão do Plano Diretor ampliar o potencial construtivo da região."),
    ]
    log.push(`[block 49] Mercês "Não é próximo Batel. Pode virar" → versão consultiva`)
  }
}

// Block 50 (callout) — "Essas 3 observações valem pra hoje"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Essas 3 observações valem pra hoje (abril/2026).", "Essas 3 observações valem para hoje (abril/2026).")
  if (n > 0) log.push(`[block 50] callout "valem pra hoje" → "valem para hoje"`)
}

// Block 55 (FAQ Cascatinha lidera em crimes letais)
{
  const blk = body[55]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Cascatinha lidera em crimes letais") &&
    !txt.includes("um dos melhores indicadores de segurança na agregação consultada")
  ) {
    blk.content = [
      t("Entre os bairros do ranking, Cascatinha aparece com um dos melhores indicadores de segurança na agregação consultada para janeiro a setembro de 2025 (não aparecem homicídios letais reportados). Mas esse dado deve ser lido com cautela: a SESP-PR não publica um ranking oficial padronizado de homicídios por bairro, e os recortes usados vêm de agregações feitas pela imprensa local. Ahú, "),
      link("/imoveis/cabral", "Cabral"),
      t(" e "),
      link("/busca?bairro=Santa+Felicidade", "Santa Felicidade"),
      t(" também aparecem entre os mais bem indicados em segurança no recorte consultado."),
    ]
    log.push(`[block 55] FAQ segurança — "Cascatinha lidera em crimes letais" → caveat`)
  }
}

// Block 59 (FAQ Ahú rentabilidade) — harmonizar
{
  const blk = body[59]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Rentabilidade de aluguel fica na faixa 0,32-0,38% ao mês — comparável ao Batel") &&
    !txt.includes("o argumento principal do Ahú é valorização")
  ) {
    blk.content = [
      t("Vale, por 2 razões concretas: valorização de "),
      b("+12,5% em 12 meses"),
      t(" (líder entre os bairros de alto padrão, FipeZap março/2026) e preço 27% abaixo do Batel. A tese é que o gap de preço entre Ahú e Batel pode diminuir nos próximos 2-3 anos à medida que a demanda premium se desloque. Como bairro de alto padrão em valorização, o Ahú tende a fazer mais sentido para patrimônio e valorização do que para renda mensal — em imóveis específicos, a rentabilidade pode se aproximar da faixa premium de 0,25% a 0,33% ao mês, mas o argumento principal não é renda. Para renda mensal, "),
      link("/imoveis/portao", "Portão"),
      t(" e "),
      link("/imoveis/centro", "Centro"),
      t(" costumam ser mais competitivos."),
    ]
    log.push(`[block 59] FAQ Ahú rentabilidade — harmonizado com cluster (foco em valorização)`)
  }
}

// Block 61 (FAQ valorização Campina do Siqueira) — harmonizar com PMQ
{
  const blk = body[61]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Três dos cinco (CIC, Campina do Siqueira e Campo Comprido) estão no traçado do BRT Leste-Oeste") &&
    !txt.includes("granularidade por bairro varia entre fontes")
  ) {
    blk.content = [
      t("Os 5 que mais subiram em 12 meses, conforme o recorte usado no PMQ (FipeZap março/2026), incluem Ahú +12,5%, "),
      link("/imoveis/juveve", "Juvevê"),
      t(" +11,5%, "),
      link("/imoveis/cidade-industrial", "Cidade Industrial"),
      t(" +10,2%, Bom Retiro +9,1% e a região Barigui/Ecoville expandido. O traçado do BRT Leste-Oeste — com edital saído em março — passa por trechos da CIC, "),
      link("/imoveis/campina-do-siqueira", "Campina do Siqueira"),
      t(" e Campo Comprido, e tende a sustentar a tese de valorização nesses recortes. Como a granularidade por bairro varia entre fontes, Campina do Siqueira, Mossunguê e Campo Comprido devem ser lidos com cautela. Detalhes completos em "),
      link("/blog/preco-metro-quadrado-curitiba-bairro", "Preço do m² em Curitiba 2026"),
      t("."),
    ]
    log.push(`[block 61] FAQ valorização — harmonizado com PMQ (Campina do Siqueira com cautela)`)
  }
}

// Block 62 (heading) — "Como usar esse ranking pra decidir"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Como usar esse ranking pra decidir", "Como usar esse ranking para decidir")
  if (n > 0) log.push(`[block 62] heading "pra decidir" → "para decidir"`)
}

// Block 63 — "O ranking não é pra você seguir cego"
{
  const blk = body[63]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("O ranking não é pra você seguir cego") &&
    !txt.includes("ranking como ponto de partida")
  ) {
    blk.content = [
      t("Use o ranking como ponto de partida, não como decisão final. Ele serve para você "),
      b("mudar os pesos"),
      t(" conforme seu caso e ver o que muda."),
    ]
    log.push(`[block 63] "seguir cego" → "ponto de partida, não decisão final"`)
  }
}

// Block 65 — "pra fechar o orçamento"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " pra fechar o orçamento.", " para fechar o orçamento.")
  if (n > 0) log.push(`[block 65] "pra fechar o orçamento" → "para fechar o orçamento"`)
}

// Block 67 — "Rode a conta específica do imóvel"
{
  const blk = body[67]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "numberedListItem" &&
    txt.includes("Rode a conta específica do imóvel") &&
    !txt.includes("Valide a conta do imóvel específico")
  ) {
    blk.content = [
      b("Valide a conta do imóvel específico:"),
      t(" rentabilidade de aluguel, CET do financiamento, "),
      link("/blog/itbi-curitiba-valor-como-pagar", "ITBI que o Município cobra em Curitiba hoje"),
      t(" e custos de fechamento. Se a matemática fechar, a compra faz sentido."),
    ]
    log.push(`[block 67] "Rode a conta específica" → "Valide a conta do imóvel específico"`)
  }
}

// Block 70 (CTA final) — alinhar com CTA intermediário
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Ver imóveis à venda em Curitiba"
    ) {
      block.props.title = "Quer comparar bairros antes de escolher imóvel?"
      block.props.description = "A FYMOOB cruza orçamento, rotina, tipo de imóvel, escola, transporte e potencial de valorização para indicar bairros que fazem sentido para você."
      block.props.label = "Comparar bairros"
      log.push(`[block 70] CTA final — alinhado com CTA intermediário ("Comparar bairros")`)
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
