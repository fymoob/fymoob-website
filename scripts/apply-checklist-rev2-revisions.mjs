/**
 * Aplica 2ª rodada de revisão no artigo `checklist-compra-imovel` em
 * 03/05/2026.
 *
 * Foco:
 *   1. Title sentence case + remoção do "R$ 80 mil" do H1 (mantido no
 *      lead/description)
 *   2. Description (frontmatter) — versão sem "pra" + sem "R$ 80 mil"
 *      como média
 *   3. Block 0: "custa, em média, R$ 80 mil" → "pode gerar prejuízo de
 *      dezenas de milhares de reais. Em um cenário realista... pode
 *      chegar perto de R$ 80 mil"
 *   4. Block 4-5: "Os 3 erros que fazem brasileiros perderem mais
 *      dinheiro / R$ 80 mil que comprador médio perde por ignorância"
 *      → suavizar
 *   5. Block 8: "reforma-documento" → "regularização documental"
 *   6. Block 11+82+111: dívida condominial — remover "não existe limite
 *      de tempo / herda tudo / Sem limite de meses"
 *   7. Block 16-18 (ITBI): formulação Tema 1113 mais técnica
 *   8. Block 29-30: Resolução CMN 4.676/2018 — não cravar "permite até
 *      30% da renda bruta"
 *   9. Block 45 (heading): "tamanho REAL" → "tamanho real" sem caps
 *  10. Block 53: "Foto valia ouro" → "Foto vale ouro"
 *  11. Block 56: "Porteiro sabe tudo / 10 minutos = 10 visitas" → versão
 *      consultiva
 *  12. Block 79: "Se esquecer: você perde tudo" → versão suavizada
 *  13. Block 88: "assina contrato inválido / ação judicial pra anular" →
 *      versão suavizada
 *  14. Block 92: "Imóvel acima de R$ 35 mil exige escritura pública (Lei
 *      7.433/1985)" → "art. 108 do Código Civil + 30 salários mínimos"
 *  15. Block 99: "imóvel registrado só depois do pagamento" → versão
 *      mais clara sobre transferência da propriedade
 *  16. Block 104: "Se esquecer: fica sem água no Natal" → versão neutra
 *  17. Block 106-107: IRPF — adicionar nota sobre benfeitorias com
 *      comprovante
 *  18. Block 108 (CTA): "transferência dos contadores" → "transferência
 *      das contas"
 *  19. Block 111: FAQ dívida condomínio reformulada
 *  20. Block 113: FAQ averbação — "desvaloriza 20-40%" → "pode gerar
 *      desconto relevante"
 *  21. Block 115: FAQ certidões — "Pra PJ" → "Para vendedor pessoa
 *      jurídica"
 *  22. Block 117: FAQ usado vs planta — "armadilha" → "risco principal"
 *  23. Block 119: FAQ custo fechamento — caveat "avaliação bancária
 *      quando houver"
 *  24. Block 121-126: Próximo passo — "vira zero" + "existe pra uma
 *      razão" → versão consultiva
 *  25. Block 127 (methodology): treatment + lastUpdate
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "checklist-compra-imovel"

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
// 0. Frontmatter — title + description
// ──────────────────────────────────────────────────────────────────
const NEW_TITLE = "Checklist para comprar imóvel: evite prejuízo antes de assinar"
const NEW_DESC = "Veja 25 itens para conferir antes de comprar imóvel: matrícula, averbação, condomínio, certidões, ITBI, escritura, registro e pós-compra."

let titleUpdate = null
let descUpdate = null
let seoTitleUpdate = null
let seoDescUpdate = null

if (article.title !== NEW_TITLE) {
  titleUpdate = NEW_TITLE
  log.push(`[frontmatter] title — sentence case sem "R$ 80 mil"`)
}
if (article.description !== NEW_DESC) {
  descUpdate = NEW_DESC
  log.push(`[frontmatter] description — versão sem "pra" e sem "R$ 80 mil" como média`)
}
if (article.seo_meta_title !== NEW_TITLE) seoTitleUpdate = NEW_TITLE
if (article.seo_meta_description !== NEW_DESC) seoDescUpdate = NEW_DESC

// ──────────────────────────────────────────────────────────────────
// Block-level rewrites
// ──────────────────────────────────────────────────────────────────

// Block 0 (lead) — "custa, em média, R$ 80 mil"
{
  const blk = body[0]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("custa, em média, R$ 80 mil") &&
    !txt.includes("pode gerar prejuízo de dezenas de milhares")
  ) {
    blk.content = [
      t("Comprar um imóvel sem checar matrícula, averbação, condomínio, ITBI e certidões pode gerar "),
      b("prejuízo de dezenas de milhares de reais"),
      t(" — e a pegadinha não aparece em nenhum anúncio. Em um cenário realista, a soma de averbação pendente, dívida de condomínio, ITBI cobrado a maior e reforma estrutural oculta pode chegar perto de "),
      b("R$ 80 mil"),
      t(". O problema mora em 3 lugares que quase ninguém olha: na matrícula do imóvel, na dívida de condomínio (propter rem) e na base de cálculo do ITBI. Este checklist mostra os 25 itens que você precisa validar antes de assinar — separados nas 5 fases do processo de compra."),
    ]
    log.push(`[block 0] lead — "custa, em média, R$ 80 mil" → "pode gerar prejuízo de dezenas de milhares / cenário realista"`)
  }
}

// Block 5 — "Os 3 erros que fazem brasileiros perderem"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Em 2026, estes 3 itens somam a maior parte do R$ 80 mil que comprador médio perde por ignorância:",
    "Em um cenário realista de risco, estes 3 itens costumam concentrar boa parte do prejuízo evitável na compra de imóvel:"
  )
  if (n > 0) log.push(`[block 5] "comprador médio perde por ignorância" → "cenário realista de risco / prejuízo evitável"`)
}

// Block 4 (heading) — "Os 3 erros que fazem brasileiros perderem mais dinheiro"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Os 3 erros que fazem brasileiros perderem mais dinheiro",
    "Os 3 erros que costumam concentrar mais prejuízo na compra"
  )
  if (n > 0) log.push(`[block 4] heading "Os 3 erros que fazem brasileiros perderem" → "que costumam concentrar mais prejuízo"`)
}

// Block 8 — "reforma-documento" + "Pra regularizar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " Pra regularizar, custa entre R$ 25 mil e R$ 45 mil em cartório, taxas e reforma-documento.",
    " Para regularizar, costuma envolver entre R$ 25 mil e R$ 45 mil em cartório, taxas, projeto, engenheiro e regularização documental."
  )
  if (n > 0) log.push(`[block 8] "Pra regularizar / reforma-documento" → "regularização documental"`)
}

// Block 9 — "Se esquecer: você herda até R$ 180 mil de perda na revenda"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se esquecer: você herda até R$ 180 mil de perda na revenda + dificuldade de financiamento.",
    "Se esquecer: pode haver perda relevante na revenda e dificuldade de financiamento."
  )
  if (n > 0) log.push(`[block 9] "Se esquecer: você herda até R$ 180 mil" → "pode haver perda relevante"`)
}

// Block 11 — "passa pro novo dono / 99% dos checklists esquece"
{
  const blk = body[11]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("passa pro novo dono junto com o imóvel") &&
    !txt.includes("é obrigação propter rem: acompanha o imóvel")
  ) {
    blk.content = [
      t("Este é o item que costuma passar despercebido. O Código Civil, "),
      b("artigo 1.345"),
      t(", estabelece que a dívida de condomínio é obrigação "),
      b("propter rem"),
      t(": acompanha o imóvel e pode ser cobrada do adquirente. O "),
      link("https://www.jusbrasil.com.br/jurisprudencia/stj/1345331", "STJ confirmou no REsp 1.345.331/RS"),
      t(" que o débito de condomínio se vincula ao imóvel — por isso, o comprador deve exigir declaração de quitação emitida pela administradora antes de assinar, porque débitos antigos podem gerar cobrança judicial e negociação difícil."),
    ]
    log.push(`[block 11] dívida condomínio — "passa pro novo dono / não existe limite" → "obrigação propter rem / cobrança judicial"`)
  }
}

// Block 13 — "você herda a dívida integral na data da escritura"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se esquecer: você herda a dívida integral na data da escritura.",
    "Se esquecer: o comprador pode ser acionado para responder pelo débito; não assuma que \"o vendedor resolve depois\". Exija quitação formal antes da escritura."
  )
  if (n > 0) log.push(`[block 13] "você herda a dívida integral" → "comprador pode ser acionado / exija quitação formal"`)
}

// Block 16 (ITBI) — "STJ te dá razão / Tema 1113"
{
  const blk = body[16]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Em Curitiba a alíquota é") &&
    txt.includes("STJ te dá razão") &&
    !txt.includes("base de cálculo do ITBI é o valor do imóvel transmitido em condições normais de mercado")
  ) {
    blk.content = [
      t("Quando você compra, o município cobra ITBI. Em Curitiba, a alíquota é "),
      b("2,7%"),
      t(" sobre o \"valor venal de referência\" — tabela interna da Prefeitura. O problema: essa tabela frequentemente está acima do valor real da transação. No "),
      link("https://www.stj.jus.br/", "Tema 1113"),
      t(", o STJ definiu que a base de cálculo do ITBI é o valor do imóvel transmitido em condições normais de mercado, e que a base do IPTU não pode ser usada como piso automático. O valor declarado pelo contribuinte tem presunção de compatibilidade com o mercado, mas pode ser questionado pelo município mediante processo administrativo. O Tema 1113 pode sustentar contestação quando a base usada pela Prefeitura estiver acima do valor de mercado sem processo administrativo adequado."),
    ]
    log.push(`[block 16] ITBI — "STJ te dá razão / Tema 1113" reformulado tecnicamente`)
  }
}

// Block 26 — "pra pré-aprovar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "demoram 24-72h pra pré-aprovar hoje", "demoram 24 a 72 horas para emitir pré-aprovação")
  if (n > 0) log.push(`[block 26] "pra pré-aprovar" → "para emitir pré-aprovação"`)
}

// Block 29 — "Resolução CMN 4.676/2018 permite até 30% da renda bruta"
{
  const blk = body[29]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("permite até 30% da renda bruta") &&
    !txt.includes("regra prática conservadora")
  ) {
    blk.content = [
      t("Bancos costumam usar comprometimento de renda como critério de crédito, mas o limite aprovado varia por instituição, renda, dívidas existentes, idade, sistema de amortização e perfil do imóvel. A "),
      link("https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Resolu%C3%A7%C3%A3o%20CMN&numero=4676", "Resolução CMN 4.676/2018"),
      t(" trata das condições para financiamento imobiliário no SBPE/SFH/SFI, mas não fixa uma regra simples e universal. Como "),
      b("regra prática conservadora"),
      t(", limite a parcela do financiamento a cerca de "),
      b("30% da renda líquida"),
      t(" (depois do imposto). Para renda líquida de R$ 10 mil, a parcela máxima sustentável fica em torno de R$ 3 mil."),
    ]
    log.push(`[block 29] Resolução CMN 4.676/2018 — "permite até 30% da renda bruta" → "regra prática conservadora"`)
  }
}

// Block 45 (heading) — "tamanho REAL"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "9. Confira vaga de garagem (tamanho REAL)", "9. Confira o tamanho real da vaga de garagem")
  if (n > 0) log.push(`[block 45] heading "(tamanho REAL)" → "Confira o tamanho real da vaga de garagem"`)
}

// Block 53 — "Foto valia ouro"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Foto valia ouro na hora de negociar — \"está com problema X, aceito R$ 30 mil a menos\".",
    "Fotografias ajudam na negociação: \"há problema X, então a proposta precisa refletir esse custo\"."
  )
  if (n > 0) log.push(`[block 53] "Foto valia ouro" → "Fotografias ajudam na negociação"`)
}

// Block 56 — "Porteiro sabe tudo / 10 minutos = 10 visitas"
{
  const blk = body[56]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Porteiro sabe tudo") &&
    !txt.includes("Converse com o porteiro ou zelador")
  ) {
    blk.content = [
      t("Converse com o porteiro ou zelador. Ele costuma saber sobre obras recentes, perfil dos moradores, problemas recorrentes e histórico do condomínio. Dez minutos de conversa podem revelar informações que não aparecem na visita."),
    ]
    log.push(`[block 56] "Porteiro sabe tudo / 10 min = 10 visitas" → versão consultiva`)
  }
}

// Block 79 — "imóvel pode ser alvo de execução trabalhista ou fiscal e você perde tudo"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se esquecer: imóvel pode ser alvo de execução trabalhista ou fiscal e você perde tudo.",
    "Se esquecer: o imóvel pode ser envolvido em disputa judicial, execução ou fraude contra credores, com risco de perda financeira relevante."
  )
  if (n > 0) log.push(`[block 79] "execução trabalhista / você perde tudo" → "disputa judicial / risco de perda financeira"`)
}

// Block 82 — "Sem limite de meses"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se esquecer: você herda o que o vendedor deve. Sem limite de meses.",
    "Se esquecer: o comprador pode ser cobrado pelos débitos vinculados ao imóvel, conforme o caso concreto e o histórico de cobrança."
  )
  if (n > 0) log.push(`[block 82] "Sem limite de meses" → "conforme o caso concreto e o histórico"`)
}

// Block 87 (Inventário + cláusulas restritivas) — reescrito
{
  const blk = body[87]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Se há cláusula de impenhorabilidade, usufruto vitalício ou usufruto retido") &&
    !txt.includes("Se houver usufruto, cláusula restritiva, inventário pendente ou vendedor incapaz")
  ) {
    blk.content = [
      t("Se o vendedor herdou o imóvel, o inventário precisa estar concluído. Se houver usufruto, cláusula restritiva, inventário pendente ou vendedor incapaz, a venda pode exigir anuência, baixa de restrição, autorização judicial ou conclusão de procedimento antes da escritura."),
    ]
    log.push(`[block 87] inventário + cláusulas — versão consultiva mais ampla`)
  }
}

// Block 88 — "assina contrato inválido / ação judicial pra anular / perde entrada já paga"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se esquecer: assina contrato inválido, ação judicial pra anular, perde entrada já paga.",
    "Se esquecer: a compra pode ficar travada, exigir autorização judicial ou gerar disputa sobre validade e devolução de valores."
  )
  if (n > 0) log.push(`[block 88] "assina contrato inválido / ação judicial pra anular" → "compra pode ficar travada / disputa sobre validade"`)
}

// Block 92 — "Imóvel acima de R$ 35 mil exige escritura pública (Lei 7.433/1985)"
{
  const blk = body[92]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Imóvel acima de R$ 35 mil exige") &&
    !txt.includes("art. 108 do Código Civil")
  ) {
    blk.content = [
      t("Negócios imobiliários de valor superior a "),
      b("30 salários mínimos"),
      t(" exigem escritura pública, salvo exceções legais, conforme o "),
      b("art. 108 do Código Civil"),
      t(". O contrato particular pode formalizar a promessa de compra e venda, mas a propriedade só é transferida com o registro do título no Cartório de Registro de Imóveis."),
    ]
    log.push(`[block 92] escritura pública — "R$ 35 mil / Lei 7.433/1985" → "30 salários mínimos / art. 108 CC"`)
  }
}

// Block 93 — "juridicamente o imóvel não é seu"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se esquecer: juridicamente o imóvel não é seu.",
    "Se esquecer: o contrato particular não substitui a escritura pública, e a propriedade só é transferida com o registro."
  )
  if (n > 0) log.push(`[block 93] "juridicamente o imóvel não é seu" → versão técnica`)
}

// Block 96 — "paga até R$ 12 mil a mais"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se esquecer: paga até R$ 12 mil a mais.",
    "Se esquecer: a base usada pode estar acima do valor de mercado, gerando ITBI cobrado a maior."
  )
  if (n > 0) log.push(`[block 96] "paga até R$ 12 mil a mais" → versão neutra`)
}

// Block 99 — "imóvel registrado só depois do pagamento — sem registro, a propriedade não é sua"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se esquecer: imóvel registrado só depois do pagamento — sem registro, a propriedade não é sua.",
    "Se esquecer: só depois do registro da escritura o imóvel passa juridicamente para o comprador. Antes disso, você pode ter contrato e posse, mas ainda não tem propriedade registrada."
  )
  if (n > 0) log.push(`[block 99] "sem registro, a propriedade não é sua" → "só depois do registro o imóvel passa juridicamente para o comprador"`)
}

// Block 102 (heading) — "Transfira contas... pro seu nome"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "24. Transfira contas de luz, água, gás e IPTU pro seu nome", "24. Transfira contas de luz, água, gás e IPTU para o seu nome")
  if (n > 0) log.push(`[block 102] heading "pro seu nome" → "para o seu nome"`)
}

// Block 104 — "Se esquecer: fica sem água no Natal"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se esquecer: fica sem água no Natal.",
    "Se esquecer: pode haver atraso na transferência de titularidade, cobrança duplicada ou risco de corte do serviço."
  )
  if (n > 0) log.push(`[block 104] "Se esquecer: fica sem água no Natal" → versão neutra`)
}

// Block 106 — IRPF benfeitorias com comprovante
{
  const blk = body[106]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Informe o custo total (imóvel + ITBI + registro + reforma)") &&
    !txt.includes("guarde notas fiscais e comprovantes de benfeitorias")
  ) {
    blk.content = [
      t("Na declaração de IR do ano de compra, inclua o imóvel em \"Bens e Direitos\". Informe o custo total (imóvel + ITBI + registro + reforma) e "),
      b("guarde notas fiscais e comprovantes de benfeitorias"),
      t(", porque elas podem compor o custo de aquisição e reduzir o ganho de capital em uma futura venda."),
    ]
    log.push(`[block 106] IRPF — adicionada nota sobre benfeitorias com comprovante`)
  }
}

// Block 108 (CTA intermediário) — "transferência dos contadores" → "transferência das contas"
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      typeof block.props?.description === "string" &&
      block.props.description.includes("transferência dos contadores")
    ) {
      block.props.title = "Quer aplicar este checklist no seu imóvel?"
      block.props.description = "A FYMOOB acompanha as 5 fases da compra: pré-aprovação, visita, análise documental, proposta, escritura, registro e transferência das contas. A conferência documental entra no atendimento, sem custo extra para quem compra com a gente."
      block.props.label = "Aplicar checklist no meu imóvel"
      log.push(`[block 108] CTA — "transferência dos contadores" (typo) → "transferência das contas" + título refinado`)
      break
    }
  }
}

// Block 111 (FAQ dívida condomínio) — reescrito
{
  const blk = body[111]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("não existe limite de tempo") &&
    !txt.includes("é obrigação propter rem: acompanha o imóvel")
  ) {
    blk.content = [
      b("Sim."),
      t(" A dívida de condomínio é obrigação "),
      b("propter rem"),
      t(": acompanha o imóvel e pode ser cobrada do adquirente, conforme o art. 1.345 do Código Civil. O "),
      link("https://www.jusbrasil.com.br/jurisprudencia/stj/1345331", "STJ confirmou no REsp 1.345.331/RS"),
      t(" que o débito condominial se vincula ao imóvel. Por isso, o comprador deve exigir "),
      b("declaração de quitação de cotas"),
      t(" emitida pela administradora antes de assinar — débitos antigos podem gerar cobrança judicial e negociação difícil. A responsabilidade pode recair sobre o adquirente, o vendedor ou ambos, conforme o caso."),
    ]
    log.push(`[block 111] FAQ dívida — "não existe limite de tempo / herda tudo" → versão técnica + propter rem`)
  }
}

// Block 113 (FAQ averbação) — "desvaloriza 20-40%"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " — mesmo que esteja construído 50% maior. As consequências:",
    " — mesmo que esteja construído 50% maior. Esse descompasso pode gerar:"
  )
  if (n > 0) log.push(`[block 113] FAQ averbação — "consequências" → "esse descompasso pode gerar"`)
}
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "desvaloriza 20-40%", "pode gerar desconto relevante na revenda e dificultar financiamento")
  if (n > 0) log.push(`[block 113] FAQ averbação — "desvaloriza 20-40%" → "pode gerar desconto relevante na revenda"`)
}

// Block 115 (FAQ certidões) — "Pra PJ"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " Pra PJ, adicione contrato social + CND INSS + FGTS.", " Para vendedor pessoa jurídica, adicione contrato social + CND INSS + FGTS.")
  if (n > 0) log.push(`[block 115] FAQ certidões — "Pra PJ" → "Para vendedor pessoa jurídica"`)
}

// Block 117 (FAQ usado vs planta) — "armadilha"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Cada um tem armadilha diferente.", "Cada um tem riscos diferentes.")
  if (n > 0) log.push(`[block 117] FAQ usado vs planta — "armadilha" → "riscos"`)
}

// Block 119 (FAQ custo fechamento) — caveat avaliação bancária
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, " (R$ 2.800-4.500) + ", ", quando houver, conforme banco e operação + ")
  }
  if (n > 0) log.push(`[block 119] FAQ custo fechamento — "Avaliação bancária (R$ 2.800-4.500)" → "quando houver, conforme banco e operação"`)
}

// Block 121 — "Este checklist existe pra uma razão" + 90% das pessoas
{
  const blk = body[121]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Este checklist existe pra uma razão") &&
    !txt.includes("Este checklist existe por uma razão")
  ) {
    const sourceTxt = txt
      .replace("Este checklist existe pra uma razão", "Este checklist existe por uma razão")
      .replace("R$ 10 mil é o teto do que vale pra correr o risco. Acima, nunca.", "R$ 10 mil é o teto do que costuma valer arriscar. Acima, prefira validar.")
    blk.content = [t(sourceTxt)]
    log.push(`[block 121] "Este checklist existe pra uma razão" → "por uma razão"`)
  }
}

// Block 125 — "R$ 10 mil é o teto do que vale pra correr o risco"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "R$ 10 mil é o teto do que vale pra correr o risco. Acima, nunca.",
    "R$ 10 mil é o teto do que costuma valer arriscar. Acima desse valor, prefira validar."
  )
  if (n > 0) log.push(`[block 125] "vale pra correr o risco" → "costuma valer arriscar"`)
}

// Block 126 — "vira zero"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Com os 25 itens validados nas 5 fases, o R$ 80 mil que pode se perder vira zero.",
    "Com os 25 itens validados, o risco de prejuízo cai muito — mas não desaparece. A compra de imóvel sempre depende de documentação, negociação, aprovação bancária e análise do caso concreto."
  )
  if (n > 0) log.push(`[block 126] "R$ 80 mil... vira zero" → "risco cai muito, mas não desaparece"`)
}

// Block 127 (methodology) — treatment + lastUpdate
{
  const blk = body[127]
  if (blk?.type === "methodologyBox" && blk.props) {
    let touched = false
    if (blk.props.lastUpdate !== "2026-05-03") {
      blk.props.lastUpdate = "2026-05-03"
      touched = true
    }
    if (!blk.props.treatment || blk.props.treatment.length === 0) {
      blk.props.treatment = "Os valores de prejuízo são cenários estimativos, não média estatística. As referências jurídicas foram usadas para mapear risco documental; custos variam por cartório, município, banco, tipo de imóvel e caso concreto."
      touched = true
    }
    if (touched) log.push(`[block 127] methodology — lastUpdate atualizado + treatment preenchido`)
  }
}

// ──────────────────────────────────────────────────────────────────
// Substituições gerais remanescentes
// ──────────────────────────────────────────────────────────────────

// Block 7 — "o banco não financia... o valor da planta original. Pior:"
// Não precisa mudar.

// Block 11 — "passa pro novo dono junto com o imóvel" — already handled in rewrite

// Block 14 — "passa pro novo dono"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "passa pro novo dono junto com o imóvel, mesmo sem você saber", "acompanha o imóvel e pode ser cobrada do adquirente")
  if (n > 0) log.push(`[block 14] "passa pro novo dono junto com o imóvel" → "acompanha o imóvel e pode ser cobrada"`)
}

// Block 30 — "Pra renda líquida"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra renda líquida de R$ 10 mil, parcela máxima sã é R$ 3 mil.", "Para renda líquida de R$ 10 mil, parcela máxima sustentável é R$ 3 mil.")
  if (n > 0) log.push(`[block 30] "Pra renda líquida / parcela máxima sã" → "Para / sustentável"`)
}

// Block 95 — "pra Avaliação Contraditória"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " peça a [Avaliação Contraditória da Prefeitura](/blog/itbi-curitiba-valor-como-pagar)", " peça a Avaliação Contraditória da Prefeitura")
  if (n > 0) log.push(`[block 95] (limpeza markdown link)`) // probably not needed
}

// Block 113 — "passa pro novo dono"  ... wait, that was already in 14.
// Skip.

// ──────────────────────────────────────────────────────────────────
// Persistência
// ──────────────────────────────────────────────────────────────────

if (log.length === 0 && !titleUpdate && !descUpdate) {
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
