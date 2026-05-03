/**
 * Aplica 2ª rodada de revisão no artigo `custo-de-vida-curitiba` em
 * 03/05/2026. Foco: português, fluidez, harmonização com cluster PMQ
 * e suavização de claims absolutos.
 *
 * Reescritas de parágrafo (full content reset, idempotente via marker):
 *   - Block 6: "4 perfis" intro
 *   - Block 37: aposentado
 *   - Block 45: variação 4,5× → "superior a 3 vezes"
 *   - Block 55: URBS "única capital do Sul" → "tarifa mantida em 2026"
 *   - Block 56: "Domingão paga Meia derruba" → "reduz a tarifa para R$ 3,00"
 *   - Block 62: "menor temperatura média / mínimas -2°C" suavizado
 *   - Block 65: saúde "R$ 350-600 sem qualificar" + UPA 24h em todos
 *   - Block 74: "capital BR com mais opção gratuita por habitante"
 *   - Block 83: IPS markdown quebrado
 *   - Block 110: FAQ bairros baratos (Cidade Industrial caveat)
 *
 * Substituições pontuais (texto):
 *   - Block 0: "É cara pra quem" → "é cara para qual perfil"
 *   - Block 1: "(caiu pra 1,9%)" → "(caiu para 1,9%)"
 *   - Headings 5, 91, 103, 109: "pra" → "para"
 *   - Tabela 7: "1Q/2Q/3-4Q" → quartos por extenso, "plano saúde" → "plano de saúde", "bairro mediano" → "bairro intermediário"
 *   - Bullets perfis (11, 13, 20, 22, 28, 29, 32, 39, 40):
 *       "Utilities" → "Contas da casa"
 *       "Plano saúde" → "Plano de saúde"
 *       "3-4Q" → "3-4 quartos"
 *   - Block 25, 112: "sobe pra" → "sobe para"
 *   - Block 27: "É o perfil que mais sofre com a escolha de bairro" → "altera o orçamento"
 *   - Block 49: "compromete metade do salário só pra abastecer a despensa" → consultivo
 *   - Block 59: "passou de 3,5% pra" + "menor IPVA do Brasil em 2026" → suavizado
 *   - Block 70: "UFPR e UTFPR são gratuitas e bem ranqueadas" → "públicas, gratuitas e bem avaliadas"
 *   - Block 72: "plano de entrada 300MB sai R$ 80-100/mês" → "Plano de entrada de 300 Mb"
 *   - Block 85, 88, 94, 95, 100: "pra" → "para"
 *   - Block 106 (FAQ): "menor IPVA do Brasil" → "um dos menores IPVAs do país"; "pesa pra quem" → "para quem"
 *   - CTA block 121: refinar título + descrição
 *   - CTA outro: "pro seu orçamento" → "para o seu orçamento"
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "custo-de-vida-curitiba"

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
// 1. Block-level rewrites
// ──────────────────────────────────────────────────────────────────

// Block 6 — "4 perfis" intro
{
  const blk = body[6]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Quase todo guia responde com um número médio só") &&
    !txt.includes("Guias que usam apenas uma média")
  ) {
    blk.content = [
      t("Guias que usam apenas uma média mensal acabam escondendo a diferença real entre perfis. Em Curitiba, o mesmo padrão de vida pode custar R$ 3 mil ou mais de R$ 20 mil por mês, dependendo de bairro, carro, escola, plano de saúde e tamanho do imóvel."),
    ]
    log.push(`[block 6] "Quase todo guia... no escuro" → versão consultiva`)
  }
}

// Block 37 — Aposentado
{
  const blk = body[37]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Aposentado de SP, RJ ou interior se mudando pra CWB") &&
    !txt.includes("Aposentados vindos de São Paulo")
  ) {
    blk.content = [
      t("Aposentados vindos de São Paulo, Rio de Janeiro ou do interior têm buscado Curitiba pela combinação de qualidade urbana, rede de saúde, clima ameno e custo menor que o de capitais mais caras. Apartamento de 1 a 2 quartos em Água Verde, Cabral, Hugo Lange ou Centro retrofit, sem carro."),
    ]
    log.push(`[block 37] Aposentado — reescrita consultiva`)
  }
}

// Block 45 — Variação 4,5× → 3×
{
  const blk = body[45]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("variação de cerca de") &&
    txt.includes("4,5×") &&
    !txt.includes("variação superior a 3 vezes")
  ) {
    blk.content = [
      t("Curitiba tem variação superior a "),
      b("3 vezes"),
      t(" no preço do m² entre bairros premium e bairros mais acessíveis. Em março/2026, o "),
      link("https://www.myside.com.br/", "ranking FipeZap publicado por MySide"),
      t(" coloca Batel no topo ("),
      b("R$ 17.924/m²"),
      t("), seguido por Bigorrilho ("),
      b("R$ 14.117"),
      t(") e Mossunguê/Ecoville ("),
      b("R$ 14.062"),
      t("). Na ponta acessível, bairros como Tatuquara, Boqueirão, Capão Raso e Cidade Industrial aparecem entre as opções mais acessíveis nos recortes de mercado — os números variam conforme tipologia e fonte, então use como faixa de referência. O ranking completo, com variação 12 meses por bairro, está em "),
      link("/blog/preco-metro-quadrado-curitiba-bairro", "preço do metro quadrado em Curitiba por bairro 2026"),
      t("."),
    ]
    log.push(`[block 45] "4,5×" → "superior a 3 vezes" + Cidade Industrial como faixa`)
  }
}

// Block 55 — URBS "única capital"
{
  const blk = body[55]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("é a única capital do Sul que") &&
    !txt.includes("foi mantida nesse patamar")
  ) {
    blk.content = [
      t("A passagem URBS é "),
      b("R$ 6,00 desde 2023"),
      t(". Em 2026, a tarifa foi mantida nesse patamar, segundo "),
      link("https://www.curitiba.pr.gov.br/noticias/prefeitura-de-curitiba-mantem-tarifa-de-onibus-em-r-6-e-programas-sociais-no-transporte-em-2026/81220", "comunicado da Prefeitura"),
      t(". Florianópolis cobra R$ 6,40, Porto Alegre R$ 5,80 e Belo Horizonte R$ 5,75. São Paulo reajustou para R$ 5,00 em 2026."),
    ]
    log.push(`[block 55] URBS — "única capital do Sul" → "tarifa mantida em 2026"`)
  }
}

// Block 56 — Domingão paga Meia
{
  const blk = body[56]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Domingão paga Meia derruba a tarifa pra R$ 3,00") &&
    !txt.includes("reduz a tarifa para R$ 3,00")
  ) {
    blk.content = [
      t("A conta avulsa fica em R$ 264/mês (22 dias × 2 viagens). Mas o "),
      b("cartão Curitiba+ custa R$ 180/mês"),
      t(" com uso ilimitado em horário programado — economia de R$ 84/mês ou R$ 1.008/ano. "),
      b("Aos domingos e feriados, o programa Domingão Paga Meia reduz a tarifa para R$ 3,00."),
      t(" Quem mora na rota do BRT vive sem carro com conforto — algo difícil em BH ou Salvador."),
    ]
    log.push(`[block 56] "Domingão paga Meia derruba" → "reduz a tarifa para R$ 3,00"`)
  }
}

// Block 62 — "menor temperatura média / mínimas -2°C" suavizado
{
  const blk = body[62]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("menor temperatura média entre as capitais") &&
    !txt.includes("Curitiba está entre as capitais mais frias")
  ) {
    blk.content = [
      b("O custo invisível: o inverno paranaense."),
      t(" Curitiba está entre as capitais mais frias do Brasil. No inverno, o chuveiro elétrico no modo \"inverno\" gasta "),
      b("35% mais energia"),
      t(" que no \"verão\" — e o banho pode chegar a 35% da conta de luz no Q3, contra 25% na média nacional. Conta Copel típica de R$ 250 sobe para R$ 320-350 em junho-agosto. Quem chega do Nordeste descobre o frio na primeira fatura."),
    ]
    log.push(`[block 62] "menor temperatura média / mínimas -2°C" suavizado`)
  }
}

// Block 65 — saúde + UPA 24h em todos os bairros
{
  const blk = body[65]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("não R$ 350-600 sem qualificar idade") &&
    !txt.includes("não faz sentido citar uma faixa única")
  ) {
    blk.content = [
      t("Plano individual em Curitiba "),
      b("varia de R$ 200 (jovem em Hapvida) a R$ 2.500 (60+ em Unimed nacional)"),
      t("; por isso, não faz sentido citar uma faixa única sem considerar idade, tipo de plano e rede de atendimento. A "),
      link("https://www.gov.br/ans/pt-br/assuntos/noticias/beneficiario/ans-define-teto-de-6-06-para-reajuste-de-planos-individuais-e-familiares", "ANS aprovou teto de 6,06% para o reajuste 2025-2026 em planos individuais"),
      t("; coletivos empresariais e por adesão ficam comumente entre 12-18% ao ano."),
    ]
    log.push(`[block 65] saúde — "R$ 350-600 sem qualificar idade" reescrito`)
  }
}

// Block 66 — também tem "que individual. Medprev e similares...SUS de Curitiba tem UPA 24h em todos os bairros."
// Note: o trecho da UPA está em outro parágrafo (block 66). Vou checar e tratar via walkAndReplace.
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(
      block,
      "SUS de Curitiba tem UPA 24h em todos os bairros.",
      "Curitiba tem rede de UPAs 24h distribuída por regiões da cidade, além de unidades básicas de saúde nos bairros."
    )
  }
  if (n > 0) log.push(`[block 66] "SUS UPA 24h em todos os bairros" → "rede distribuída por regiões"`)
}

// Block 74 — "capital BR com mais opção gratuita por habitante"
{
  const blk = body[74]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("provavelmente a capital BR com") &&
    !txt.includes("oferta forte de lazer gratuito")
  ) {
    blk.content = [
      t("Curitiba tem uma oferta forte de lazer gratuito, especialmente em parques, museus e eventos públicos. O argumento real do \"vale a pena\" mora nesta rubrica."),
    ]
    log.push(`[block 74] "capital BR com mais opção gratuita" → "oferta forte de lazer gratuito"`)
  }
}

// Block 83 — IPS markdown quebrado
{
  const blk = body[83]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("**capital com melhor qualidade de vida do Brasil pelo **")
  ) {
    blk.content = [
      t("Curitiba foi classificada como a "),
      b("capital com melhor qualidade de vida do Brasil"),
      t(" pelo "),
      link("https://www.curitiba.pr.gov.br/noticias/ips-2025-curitiba-e-a-capital-brasileira-com-melhor-qualidade-de-vida/79934", "IPS 2025 — Índice de Progresso Social", { bold: true }),
      t(". Soma transporte funcional, parques públicos extensos, segurança acima da média e IDH 0,823 (10º entre cidades brasileiras)."),
    ]
    log.push(`[block 83] IPS — markdown quebrado corrigido`)
  }
}

// Block 110 — FAQ bairros baratos
{
  const blk = body[110]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Tatuquara (R$ 5.210)") &&
    txt.includes("Cidade Industrial (R$ 5.980)") &&
    !txt.includes("diferentes recortes aparecem")
  ) {
    blk.content = [
      t("Em R$/m² no FipeZap mar/26 (publicado por MySide), Tatuquara aparece em torno de "),
      b("R$ 5,2 mil/m²"),
      t("; Cidade Industrial exige cuidado porque diferentes recortes aparecem entre aproximadamente "),
      b("R$ 6 mil e R$ 9 mil/m²"),
      t(", conforme tipologia e fonte. Bairros muito periféricos como Campo de Santana, Boqueirão e Fazendinha não estão na cobertura regular do FipeZap, mas, pelo padrão de mercado em abril/2026, ficam em torno de "),
      b("R$ 5.200 a R$ 5.800/m²"),
      t(". Para região central com desconto, Portão custa em torno de "),
      b("R$ 9.200/m²"),
      t(" — cerca de 35% mais barato que Bigorrilho (R$ 14.117), andando 2 km."),
    ]
    log.push(`[block 110] FAQ bairros baratos — Cidade Industrial com caveat de recorte`)
  }
}

// ──────────────────────────────────────────────────────────────────
// 2. Substituições pontuais (texto)
// ──────────────────────────────────────────────────────────────────

// Block 0 — "É cara pra quem" → "é cara para qual perfil"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    ". A pergunta não é se Curitiba é cara. É cara pra quem.",
    ". A pergunta não é apenas se Curitiba é cara — é cara para qual perfil."
  )
  if (n > 0) log.push(`[block 0] "É cara pra quem" → "é cara para qual perfil"`)
}

// Block 1 — "(caiu pra 1,9%"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "(caiu pra 1,9% em janeiro/2026)", "(caiu para 1,9% em janeiro/2026)")
  if (n > 0) log.push(`[block 1] "caiu pra 1,9%" → "caiu para 1,9%"`)
}

// Block 5 (heading) — "4 perfis: quanto custa morar em Curitiba pra você?"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "4 perfis: quanto custa morar em Curitiba pra você?", "4 perfis: quanto custa morar em Curitiba para você?")
  if (n > 0) log.push(`[block 5] heading "pra você" → "para você"`)
}

// Block 7 (table 4 perfis) — refinar células
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "1Q em bairro popular, sem carro, transporte URBS", "1 dormitório em bairro popular, sem carro, transporte URBS")
    n += walkAndReplace(block, "2Q em bairro mediano, 1 carro, plano saúde", "2 dormitórios em bairro intermediário, 1 carro e plano de saúde")
    n += walkAndReplace(block, "Apartamento 3-4Q, escola particular, depende muito do bairro", "Apartamento 3-4 quartos, escola particular e grande variação por bairro")
    n += walkAndReplace(block, "2Q em bairro tranquilo, sem carro, plano saúde sênior", "1-2 quartos em bairro tranquilo, sem carro e plano de saúde sênior")
  }
  if (n > 0) log.push(`[block 7] tabela 4 perfis — quartos por extenso + "plano de saúde"`)
}

// Bullets perfis — "Utilities" / "Plano saúde"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Utilities (Copel + Sanepar + gás P13) + internet", "Contas da casa (Copel + Sanepar + gás P13) + internet")
    n += walkAndReplace(block, "Utilities + internet + 2 celulares", "Contas da casa + internet + 2 celulares")
    n += walkAndReplace(block, "Utilities + internet + celular", "Contas da casa + internet + celular")
    n += walkAndReplace(block, "+ utilities + internet", "+ contas da casa + internet")
    n += walkAndReplace(block, "Plano saúde jovem", "Plano de saúde jovem")
    n += walkAndReplace(block, "Plano saúde 2 adultos", "Plano de saúde 2 adultos")
    n += walkAndReplace(block, "Plano saúde família 4", "Plano de saúde família 4")
    n += walkAndReplace(block, "Plano saúde 60+", "Plano de saúde 60+")
  }
  if (n > 0) log.push(`[bullets perfis] "Utilities" → "Contas da casa"; "Plano saúde" → "Plano de saúde"`)
}

// Block 25 — "sobe pra R$ 9-12 mil"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "o cenário casal sobe pra R$ 9-12 mil", "o cenário casal sobe para R$ 9-12 mil")
  if (n > 0) log.push(`[block 25] "sobe pra R$ 9-12 mil" → "sobe para"`)
}

// Block 27 — "É o perfil que mais sofre com a escolha de bairro."
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "É o perfil que mais sofre com a escolha de bairro.",
    "É o perfil em que a escolha de bairro mais altera o orçamento."
  )
  if (n > 0) log.push(`[block 27] "mais sofre com a escolha de bairro" → "altera o orçamento"`)
}

// Block 28 — "Aluguel/parcela 3-4Q"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Aluguel/parcela 3-4Q:", "Aluguel/parcela 3-4 quartos:")
  if (n > 0) log.push(`[block 28] "3-4Q" → "3-4 quartos"`)
}

// Block 49 — "compromete metade do salário só pra abastecer a despensa"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "quem ganha o piso compromete metade do salário só pra abastecer a despensa",
    "quem ganha o piso compromete cerca de metade da renda líquida apenas com a cesta básica"
  )
  if (n > 0) log.push(`[block 49] "compromete metade do salário só pra abastecer" → consultivo`)
}

// Block 59 — "passou de 3,5% pra" + "menor IPVA do Brasil em 2026"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "passou de 3,5% pra ", "passou de 3,5% para ")
    n += walkAndReplace(block, "menor IPVA do Brasil em 2026", "entre os menores IPVAs do país em 2026")
  }
  if (n > 0) log.push(`[block 59] "3,5% pra 1,9%" + "menor IPVA do Brasil" → suavizado`)
}

// Block 70 — "UFPR e UTFPR são gratuitas e bem ranqueadas"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "UFPR e UTFPR são gratuitas e bem ranqueadas.", "UFPR e UTFPR são públicas, gratuitas e bem avaliadas.")
  if (n > 0) log.push(`[block 70] "ranqueadas" → "bem avaliadas" + "públicas"`)
}

// Block 72 — "plano de entrada 300MB sai R$ 80-100/mês"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "plano de entrada 300MB sai R$ 80-100/mês", "Plano de entrada de 300 Mb sai por R$ 80-100/mês")
  if (n > 0) log.push(`[block 72] "300MB sai R$ 80-100" → "300 Mb sai por R$ 80-100"`)
}

// Block 85 (heading) — "5 estratégias pra economizar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "5 estratégias pra economizar em Curitiba", "5 estratégias para economizar em Curitiba")
  if (n > 0) log.push(`[block 85] heading "pra economizar" → "para economizar"`)
}

// Block 88 — "pra cesta mensal" + "cai pra R$ 580-650"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, " pra cesta mensal: R$ 769 cai pra R$ 580-650", " para cesta mensal: R$ 769 cai para R$ 580-650")
  }
  if (n > 0) log.push(`[block 88] "pra cesta mensal / cai pra" → "para cesta / cai para"`)
}

// Block 91 (heading)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Quanto preciso ganhar pra morar em Curitiba?", "Quanto preciso ganhar para morar em Curitiba?")
  if (n > 0) log.push(`[blocks 91+103] heading "pra morar" → "para morar"`)
}

// Block 94 — "salário mínimo necessário pra família 4"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "salário mínimo necessário pra família 4 no Brasil", "salário mínimo necessário para família 4 no Brasil")
  if (n > 0) log.push(`[block 94] "pra família 4" → "para família 4"`)
}

// Block 95 — "lista de documentos pra comprar imóvel"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "a lista de documentos pra comprar imóvel em Curitiba", "a lista de documentos para comprar imóvel em Curitiba")
  if (n > 0) log.push(`[block 95] link "documentos pra comprar" → "para comprar"`)
}

// Block 100 — "Pra conforto básico"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " Pra conforto básico, renda mínima de R$ 4.500/mês.", " Para conforto básico, renda mínima de R$ 4.500/mês.")
  if (n > 0) log.push(`[block 100] "Pra conforto básico" → "Para conforto básico"`)
}

// Block 106 — "menor IPVA do Brasil" + "pesa pra quem"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, " e o menor IPVA do Brasil. Contrapartida:", " e um dos menores IPVAs do país. Contrapartida:")
    n += walkAndReplace(block, " e o frio pesa pra quem vem do Nordeste.", " e o frio pesa para quem vem do Nordeste.")
  }
  if (n > 0) log.push(`[block 106] FAQ vale a pena — "menor IPVA do Brasil" + "pesa pra quem"`)
}

// Block 109 (heading)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Quais bairros baratos pra morar em Curitiba?", "Quais bairros baratos para morar em Curitiba?")
  if (n > 0) log.push(`[block 109] heading "pra morar" → "para morar"`)
}

// Block 112 — "sobe pra R$ 320-350"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Conta Copel de R$ 250 sobe pra R$ 320-350", "Conta Copel de R$ 250 sobe para R$ 320-350")
  if (n > 0) log.push(`[block 112] FAQ inverno — "sobe pra R$ 320-350"`)
}

// Block 121 (CTA principal) — refinar título e descrição
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Quer saber quanto Curitiba custaria pro seu perfil?"
    ) {
      block.props.title = "Quer saber quanto Curitiba custaria para o seu perfil?"
      block.props.description = "A FYMOOB cruza bairro, aluguel, condomínio, financiamento e rotina para montar uma simulação realista antes de você escolher onde morar."
      log.push(`[block 121] CTA principal — "pro seu perfil / pra montar" → "para o seu / para montar"`)
      break
    }
  }
}

// CTA 2 — "imóvel ideal pro seu orçamento"
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      typeof block.props?.description === "string" &&
      block.props.description.includes("imóvel ideal pro seu orçamento")
    ) {
      block.props.description = block.props.description.replace(
        "imóvel ideal pro seu orçamento",
        "imóvel ideal para o seu orçamento"
      )
      log.push(`[CTA 2] "imóvel ideal pro seu orçamento" → "para o seu orçamento"`)
    }
  }
}

// Bonus housekeeping — "compras pra você" if exists, etc.
// Block 5295: "estoque ativo... usado pra sentido prático"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "(242 imóveis em 66 bairros) — usado pra sentido prático", "(242 imóveis em 66 bairros) — usado para sentido prático")
  if (n > 0) log.push(`[fontes] "usado pra sentido prático" → "para sentido prático"`)
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
