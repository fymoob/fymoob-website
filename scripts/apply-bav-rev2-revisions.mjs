/**
 * Aplica 2ª rodada de revisão no artigo `batel-vs-agua-verde-curitiba`
 * em 03/05/2026.
 *
 * Foco:
 *   1. Bloco de saúde (block 18 + 44): Pilar NÃO está dentro do Água Verde;
 *      Pequeno Príncipe SIM, na Rua Desembargador Motta, 1070
 *   2. Block 0: "dinheiro que comprado em outro ativo" → erro de português
 *   3. Tabela 3 e 5 + headings: substituir "studios", "DINK", "DNA"
 *   4. Block 49 + 66 (FAQ segurança): caveat "agregação consultada com base
 *      em dados SESP-PR", não "pela SESP-PR"
 *   5. Block 67 (FAQ comprar/alugar): pergunta não bate com resposta —
 *      "Faz sentido alugar no Batel e comprar na Água Verde?"
 *   6. Block 81 (CTA final): alinhar com tese do artigo
 *   7. Substituições: pra/pro, studios, DINK, commute, iFood premium, etc.
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "batel-vs-agua-verde-curitiba"

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
// Block-level rewrites
// ──────────────────────────────────────────────────────────────────

// Block 0 — "dinheiro que comprado em outro ativo" (erro de português) +
// "Este post mostra pra qual perfil"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " — dinheiro que comprado em outro ativo muda a conta. Este post mostra pra qual perfil cada bairro faz sentido em 2026.",
    " — valor que, se investido ou usado como entrada em outro imóvel, pode mudar a conta. Este post mostra para qual perfil cada bairro faz sentido em 2026."
  )
  if (n > 0) log.push(`[block 0] "dinheiro que comprado em outro ativo / pra qual perfil" → versão correta`)
}

// Tabela 3 (Qual cabe no seu perfil) — "studios"
{
  const blk = body[3]
  if (blk?.type === "table" && blk.content?.rows) {
    let n = 0
    for (const row of blk.content.rows) {
      for (const cell of row.cells || []) {
        n += walkAndReplace(cell, "Vida noturna, restaurantes, studios e endereço prestigiado", "Vida noturna, restaurantes, estúdios e endereço prestigiado")
      }
    }
    if (n > 0) log.push(`[block 3] tabela perfil — "studios" → "estúdios"`)
  }
}

// Tabela 5 (4 números) — "Tempo médio pra vender"
{
  const blk = body[5]
  if (blk?.type === "table" && blk.content?.rows) {
    let n = 0
    for (const row of blk.content.rows) {
      for (const cell of row.cells || []) {
        n += walkAndReplace(cell, "Tempo médio pra vender", "Tempo médio para vender")
      }
    }
    if (n > 0) log.push(`[block 5] tabela 4 números — "pra vender" → "para vender"`)
  }
}

// Block 11 — "studios novos"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "casas de rua e studios novos.", "casas de rua e estúdios novos.")
  if (n > 0) log.push(`[block 11] "studios novos" → "estúdios novos"`)
}

// Block 13 (heading) — "Pra família"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra família com filhos pequenos: Água Verde vence", "Para família com filhos pequenos: Água Verde vence")
  if (n > 0) log.push(`[block 13] heading "Pra família" → "Para família"`)
}

// Block 14 — "imóvel pra morar próximos 10-15 anos"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " buscando imóvel pra morar próximos 10-15 anos.", " buscando imóvel para morar nos próximos 10-15 anos.")
  if (n > 0) log.push(`[block 14] "imóvel pra morar próximos" → "para morar nos próximos"`)
}

// Block 16 — "reserva pra educação ou entrada em segundo imóvel"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " Diferença entra em reserva pra educação ou entrada em segundo imóvel.", " A diferença entra como reserva para educação ou entrada em um segundo imóvel.")
  if (n > 0) log.push(`[block 16] "reserva pra educação" → "para educação"`)
}

// Block 17 — "Criança chega na escola de ônibus" → versão consultiva
{
  const blk = body[17]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("Criança chega na escola de ônibus") &&
    !txt.includes("ganha mais alternativas de deslocamento")
  ) {
    blk.content = [
      b("Transporte público superior"),
      t(" — a Av. República Argentina é eixo estrutural sul, com "),
      link("https://www.urbs.curitiba.pr.gov.br/transporte/rede-integrada-de-transporte/19", "BRT direto"),
      t(" (linha Santa Cândida–Pinheirinho). A família ganha mais alternativas de deslocamento, inclusive para adolescentes que já usam transporte público."),
    ]
    log.push(`[block 17] BRT — "Criança chega na escola de ônibus" → versão mais natural`)
  }
}

// Block 18 — Hospital Pilar não está dentro do Água Verde
{
  const blk = body[18]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("Hospital Pilar (referência materno-infantil) dentro") &&
    !txt.includes("Hospital Pequeno Príncipe, na Rua Desembargador Motta, 1070")
  ) {
    blk.content = [
      b("Saúde no bairro"),
      t(" — o Água Verde concentra referências importantes, como o "),
      link("https://pequenoprincipe.org.br/", "Hospital Pequeno Príncipe"),
      t(" (Rua Desembargador Motta, 1070). O "),
      link("https://www.vitacuritiba.com.br/", "VITA Curitiba"),
      t(" também atende a região, com pronto-socorro 24h e estrutura hospitalar. O Hospital Pilar é citado em alguns guias como referência materno-infantil, mas o endereço oficial fica no Bom Retiro — não dentro do Água Verde."),
    ]
    log.push(`[block 18] saúde — Pilar fora do AV; Pequeno Príncipe nominado com endereço`)
  }
}

// Block 21 — "colégio top 10 ENEM"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " família de alta renda (R$ 35 mil+/mês) que quer filho em colégio top 10 ENEM (Marista Santa Maria #7, Sion, Escola Internacional) tem ",
    " família de alta renda (R$ 35 mil ou mais por mês) que quer filho em colégio com alto desempenho no ENEM (Marista Santa Maria, Sion, Escola Internacional) tem "
  )
  if (n > 0) log.push(`[block 21] "colégio top 10 ENEM" → "colégio com alto desempenho no ENEM"`)
}

// Block 22 (heading) — "Pra jovem profissional"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Pra jovem profissional solteiro ou casal sem filhos com dupla renda: Batel vence",
    "Para jovem profissional solteiro ou casal sem filhos com dupla renda: Batel vence"
  )
  if (n > 0) log.push(`[block 22] heading "Pra jovem profissional" → "Para jovem profissional"`)
}

// Block 23 — "trajeto curto pro trabalho"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "trajeto curto pro trabalho", "trajeto curto para o trabalho")
  if (n > 0) log.push(`[block 23] "pro trabalho" → "para o trabalho"`)
}

// Block 26 — "Studios novos 2026"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Studios novos 2026", "Estúdios novos em 2026")
  if (n > 0) log.push(`[block 26] "Studios novos 2026" → "Estúdios novos em 2026"`)
}

// Block 28 — "Rede social densa"
{
  const blk = body[28]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("Rede social densa") &&
    !txt.includes("Rede de contatos profissionais")
  ) {
    blk.content = [
      b("Rede de contatos profissionais"),
      t(" — o Batel concentra restaurantes, cafés, escritórios e moradores com perfil profissional de alta renda. Quem depende de relacionamento e vida social de negócios tende a valorizar essa densidade."),
    ]
    log.push(`[block 28] "Rede social densa" → "Rede de contatos profissionais"`)
  }
}

// Block 29 — "iFood premium"
{
  const blk = body[29]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("iFood premium") &&
    !txt.includes("Delivery e gastronomia de alto padrão")
  ) {
    blk.content = [
      b("Delivery e gastronomia de alto padrão"),
      t(" — restaurantes japoneses, italianos, hamburguerias artesanais e casas autorais atendem o Batel com mais densidade. A entrega chega em 20 a 35 minutos. A Água Verde tem volume de delivery, não necessariamente o mesmo padrão premium."),
    ]
    log.push(`[block 29] "iFood premium" → "Delivery e gastronomia de alto padrão"`)
  }
}

// Block 30 — "studio novo na Água Verde" + "primeiro imóvel próprio"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "1 quarto ou studio novo na Água Verde", "1 quarto ou estúdio novo na Água Verde")
    n += walkAndReplace(block, " quem quer **primeiro imóvel próprio** (não aluguel) com orçamento R$ 350-550 mil", " quem quer **primeiro imóvel próprio** (em vez de aluguel) com orçamento de R$ 350 a R$ 550 mil")
  }
  if (n > 0) log.push(`[block 30] "studio novo / primeiro imóvel próprio" reescrito`)
}

// Block 31 (heading) — "Pra investidor"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra investidor de renda (aluguel de longo prazo): Água Verde vence", "Para investidor de renda (aluguel de longo prazo): Água Verde vence")
  if (n > 0) log.push(`[block 31] heading "Pra investidor" → "Para investidor"`)
}

// Block 35 — "Vacância menor"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " Vacância menor.",
    " Tende a ter menor risco de vacância em imóveis bem precificados de 1 ou 2 quartos."
  )
  if (n > 0) log.push(`[block 35] "Vacância menor" → caveat de menor risco em imóveis bem precificados`)
}

// Block 38 — "diárias na faixa de R$ 400-700" caveat
{
  const blk = body[38]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("diárias na faixa de R$ 400-700") &&
    !txt.includes("a faixa real varia por prédio")
  ) {
    blk.content = [
      b("Contra-argumento honesto:"),
      t(" para locação por temporada, o Batel pode oferecer vantagem. O bairro concentra vida noturna, gastronomia, demanda corporativa e turismo de negócios — em alguns imóveis, esse cenário pode sustentar diárias na faixa de R$ 400 a R$ 700, mas a faixa real varia por prédio, mobília, nota do anúncio, sazonalidade e regras do condomínio. Esse modelo costuma render mais que aluguel tradicional, mas exige operação ativa (check-in, limpeza, gestão de hóspedes), tem variação por sazonalidade, depende do regulamento do condomínio e tem risco de vacância. Não há índice público oficial de ocupação por bairro em Curitiba, então a conta precisa de validação imóvel a imóvel."),
    ]
    log.push(`[block 38] "diárias R$ 400-700" → caveat de variação por imóvel`)
  }
}

// Block 39 (heading) — "Pra aposentado"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra aposentado ou casal 60+: Água Verde vence", "Para aposentado ou casal 60+: Água Verde vence")
  if (n > 0) log.push(`[block 39] heading "Pra aposentado" → "Para aposentado"`)
}

// Block 44 — "2 hospitais grandes dentro (Pilar + Vita Água Verde)"
{
  const blk = body[44]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("(Pilar + Vita Água Verde)") &&
    !txt.includes("Pequeno Príncipe e VITA Curitiba")
  ) {
    blk.content = [
      b("Saúde a pé ou de carro"),
      t(" — o Água Verde concentra Hospital Pequeno Príncipe e VITA Curitiba, ambos com estrutura relevante. O aposentado evita deslocamento longo em emergência."),
    ]
    log.push(`[block 44] "Pilar + Vita Água Verde dentro" → corrigido (Pequeno Príncipe + VITA)`)
  }
}

// Block 46 — "Vizinhança se conhece" reescrito
{
  const blk = body[46]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("Aposentado conhece o porteiro pelo nome") &&
    !txt.includes("rotina tende a ser mais previsível")
  ) {
    blk.content = [
      b("Vida de bairro consolidada"),
      t(" — a rotina tende a ser mais previsível e residencial: comércio conhecido, prestadores próximos e menor dependência de shopping."),
    ]
    log.push(`[block 46] "Vizinhança se conhece / Aposentado conhece o porteiro pelo nome" → versão consultiva`)
  }
}

// Block 49 — caveat "agregação consultada com base em dados SESP-PR"
// (já está bem encaminhado: "A agregação consultada, baseada em dados
// SESP-PR..."). Vou apenas verificar que está OK e não mexer.

// Block 58 — "commute" + "Dados param de diferenciar"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "commute mais curto para o trabalho", "deslocamento diário mais curto até o trabalho")
    n += walkAndReplace(block, ". Dados param de diferenciar.", ". Os dados deixam de diferenciar claramente os dois bairros.")
  }
  if (n > 0) log.push(`[block 58] "commute / Dados param de diferenciar" → versão consultiva`)
}

// Block 61 (heading FAQ) — "Qual é melhor pra morar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Qual é melhor pra morar em Curitiba, Batel ou Água Verde?",
    "Qual é melhor para morar em Curitiba, Batel ou Água Verde?"
  )
  if (n > 0) log.push(`[block 61] heading FAQ — "pra morar" → "para morar"`)
}

// Block 62 — "Pra família com filhos / Pra jovem profissional / DINK"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Pra família com filhos pequenos e renda mediana de alto padrão", "Para família com filhos pequenos e renda mediana de alto padrão")
    n += walkAndReplace(block, "Pra jovem profissional solteiro ou DINK que valoriza", "Para jovem profissional solteiro ou casal sem filhos com dupla renda que valoriza")
  }
  if (n > 0) log.push(`[block 62] FAQ "Qual é melhor" — "Pra / DINK" reescritos`)
}

// Block 66 (FAQ segurança) — caveat
{
  const blk = body[66]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Água Verde aparece no top 4 de crimes patrimoniais absolutos de Curitiba pela SESP-PR H1/2025") &&
    !txt.includes("agregação consultada com base em dados SESP-PR")
  ) {
    blk.content = [
      b("Não há diferença material em risco residencial."),
      t(" A agregação consultada com base em dados SESP-PR coloca o Água Verde entre os bairros com maior volume absoluto de crimes patrimoniais em H1/2025. Mas esse dado é afetado por densidade comercial (Av. República Argentina, shoppings, terminal), circulação e população flutuante; não deve ser lido como risco residencial direto. O Batel tem menor volume comercial e menos registros, mas não é estatisticamente mais seguro em lares. Em homicídios letais, nenhum dos dois aparece como destaque negativo em 2025."),
    ]
    log.push(`[block 66] FAQ segurança — caveat "agregação consultada com base em dados SESP-PR"`)
  }
}

// Block 67 (heading FAQ) — pergunta confusa
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Vale mais a pena comprar no Batel ou alugar na Água Verde?",
    "Faz sentido alugar no Batel e comprar na Água Verde?"
  )
  if (n > 0) log.push(`[block 67] heading FAQ — pergunta corrigida ("alugar no Batel e comprar na Água Verde")`)
}

// Block 70 — "DNA do bairro"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " O DNA do bairro é apartamento 3 quartos tradicional",
    " O perfil predominante do bairro é apartamento de 3 quartos tradicional"
  )
  if (n > 0) log.push(`[block 70] "DNA do bairro" → "perfil predominante do bairro"`)
}

// Block 75 — "DINK"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " (família/DINK/jovem/aposentado)",
    " (família, casal sem filhos, jovem profissional, aposentado ou investidor)"
  )
  if (n > 0) log.push(`[block 75] próximo passo — "(família/DINK/jovem/aposentado)" reescrito`)
}

// Block 77 — "Rode a conta financeira / se for pra investir"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Rode a conta financeira", "Calcule a conta financeira")
    n += walkAndReplace(block, "rentabilidade de aluguel se for pra investir", "rentabilidade de aluguel se for para investir")
  }
  if (n > 0) log.push(`[block 77] próximo passo — "Rode / pra investir"`)
}

// Block 78 — "não dá pra decidir" (se existe — só por garantia)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "não dá pra decidir", "não é possível decidir")
  if (n > 0) log.push(`[block 78] "não dá pra decidir"`)
}

// Block 81 (CTA final) — alinhar com tese
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Ver imóveis no Batel e na Água Verde"
    ) {
      block.props.title = "Quer comparar Batel, Água Verde e alternativas?"
      block.props.description = "A FYMOOB cruza orçamento, rotina, tipo de imóvel, financiamento e potencial de valorização para indicar qual bairro faz sentido para o seu perfil."
      block.props.label = "Comparar bairros"
      log.push(`[block 81] CTA final — "Ver imóveis Batel e AV" → "Comparar bairros"`)
      break
    }
  }
}

// CTA WhatsApp link "pra família/DINK"
{
  for (const block of body) {
    if (block?.type === "ctaBox" && typeof block.props?.href === "string") {
      const before = block.props.href
      const after = before
        .replaceAll("pra meu perfil", "para meu perfil")
        .replaceAll("pro meu perfil", "para o meu perfil")
      if (after !== before) {
        block.props.href = after
        log.push(`[CTA WhatsApp] link href — "pra/pro meu perfil" → "para meu perfil"`)
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

const { error: updErr } = await sb
  .from("articles")
  .update({ body, updated_at: new Date().toISOString() })
  .eq("id", article.id)
if (updErr) {
  console.error("Erro atualizando:", updErr)
  process.exit(1)
}

console.log("\n✓ Artigo atualizado no Supabase.")
