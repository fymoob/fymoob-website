/**
 * Aplica 2ª rodada* de revisão no artigo `ecoville-vs-bigorrilho-curitiba`
 * em 03/05/2026.
 *
 * (* terceira intervenção total: 1ª = revisão completa 2026-04-24,
 * 2ª = refinamentos pos-GPT v2 em 2026-04-26, esta = polimento de
 * fluidez e consistência com cluster pos-PMQ harmonizado.)
 *
 * Foco:
 *   1. Corrigir typo "Sem essa detalhamento" → "Sem esse detalhamento"
 *   2. Block 3: "Preços de abril/2026" → "Preços FipeZap mar/2026 +
 *      observações de mercado em abril/2026"; "quase 100% apartamento
 *      padrão" → "essencialmente verticalizado"
 *   3. Block 11/65/73: "Everest #5 ENEM 2024 no Paraná" → "entre os
 *      melhores desempenhos no ENEM 2024 em Curitiba"
 *   4. Block 15: "zero BRT, ônibus convencional escasso, ciclovia de
 *      bairro inexistente" + "Sem Uber ou carro particular, não tem como
 *      viver no bairro" → versão suavizada
 *   5. Block 22: HNSG "200+ leitos, 3 UTIs" → remove números sem fonte
 *   6. Block 34: "Bigorrilho é bairro 'sempre cheio'" → demanda constante
 *   7. Block 35: "Tempo médio pra vender também rápido (qualitativo)" →
 *      caveat de leitura qualitativa, não índice
 *   8. Block 43: "Movimentação baixa — Ecoville tem obra, visitante de
 *      shopping, fluxo de adolescente" → versão consultiva
 *   9. Block 46-49: "DNA do bairro / DNAs incompatíveis" → "perfil
 *      predominante / lógica de moradia"
 *  10. Block 51: "Erro frequente de quem muda de Bigorrilho para o
 *      Ecoville: paga mais caro por m²" — especificar "em lançamento ou
 *      casa em condomínio"
 *  11. Block 56: "vantagem imbatível pra cão grande" → "vantagem
 *      importante para quem tem cachorro grande"
 *  12. Block 57 heading: "Mitos sobre Ecoville e Bigorrilho (desmentidos
 *      com dados)" → "Mitos e pontos de atenção"
 *  13. Block 62 (CTA intermediário): "Quer que a gente rode a conta pro
 *      seu perfil?" → "Quer comparar Ecoville e Bigorrilho para o seu
 *      perfil?"
 *  14. Block 80: '"clima" define o empate' → "atmosfera do bairro costuma
 *      decidir"
 *  15. Block 81: "perfil casa" → "perfil combina"
 *  16. Block 84 (CTA final): "(apto, casa, studio)" → "(apartamento,
 *      casa, sobrado, estúdio)"
 *  17. ~25 substituições pra/pro, "apto" (texto corrido), "DNA",
 *      "escola/educação top"
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "ecoville-vs-bigorrilho-curitiba"

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

// Block 2 (tabela) — "Ecoville — lançamento ou apto novo"
{
  const blk = body[2]
  if (blk?.type === "table" && blk.content?.rows) {
    let n = 0
    for (const row of blk.content.rows) {
      for (const cell of row.cells || []) {
        n += walkAndReplace(cell, "Ecoville — lançamento ou apto novo", "Ecoville — lançamento ou apartamento novo")
        n += walkAndReplace(cell, "Recorte de imóveis novos e na planta; faixa apto.vc com grande variação", "Recorte de imóveis novos e na planta; faixa com grande variação por prédio")
        n += walkAndReplace(cell, "Referência mais limpa pelo FipeZap mar/2026", "Referência mais limpa no recorte FipeZap mar/2026 (bairro essencialmente verticalizado)")
      }
    }
    if (n > 0) log.push(`[block 2] tabela 4 produtos — "apto novo / referência mais limpa"`)
  }
}

// Block 3 — "Preços de abril/2026" + "quase 100% apartamento padrão"
{
  const blk = body[3]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.startsWith("Preços de abril/2026.") &&
    !txt.includes("Preços FipeZap mar/2026 + observações de mercado em abril/2026")
  ) {
    blk.content = [
      t("Preços FipeZap mar/2026 + observações de mercado em abril/2026. O Ecoville é composto por 3 mercados distintos — o FipeZap oficial não cobre o Ecoville em tabela própria por causa dessa mistura (a amostra de apartamento + casa não fecha como agregado estatístico). As "),
      link("https://myside.com.br/", "intermediárias FipeZap (MySide, BemBrasil) publicam Mossunguê"),
      t(" — bairro oficial do Ecoville no IPPUC — em torno de R$ 14.062/m² em março/2026, mas esse número agrupa as 3 tipologias e não diz qual delas você está olhando. O Bigorrilho é mais fácil de comparar porque é essencialmente verticalizado e tem mercado concentrado em apartamentos."),
    ]
    log.push(`[block 3] "Preços de abril/2026 / quase 100% apartamento padrão" → versão alinhada com cluster`)
  }
}

// Block 5 — "Sem essa detalhamento" + "A regra pra este post" + "peça pra detalhar"
{
  const blk = body[5]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Sem essa detalhamento") &&
    !txt.includes("Sem esse detalhamento")
  ) {
    blk.content = [
      t("Como \"Ecoville\" é uma região comercial e não um bairro oficial único, o preço médio muda muito conforme a fonte inclui apartamento usado, lançamento, casa em condomínio, Mossunguê, Campo Comprido ou Campina do Siqueira. Por isso, comparar \"Ecoville vs Bigorrilho\" sem separar o tipo de imóvel gera conclusão errada. A regra deste post: quando alguém disser \"o Ecoville custa R$ X\", peça para detalhar qual produto. Sem esse detalhamento, a frase costuma misturar três mercados diferentes."),
    ]
    log.push(`[block 5] typo "Sem essa detalhamento" + "A regra pra este post / peça pra detalhar" reescrito`)
  }
}

// Block 7 — "imóvel pra morar 10-15 anos"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " procurando imóvel pra morar 10-15 anos.", " procurando imóvel para morar nos próximos 10 a 15 anos.")
  if (n > 0) log.push(`[block 7] "imóvel pra morar 10-15 anos" → "para morar nos próximos 10 a 15 anos"`)
}

// Block 9 — "DNA do bairro"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " — DNA do bairro, raro em Curitiba. Quintal, segurança perimetral, criança anda de bicicleta dentro do muro. Bigorrilho é essencialmente verticalizado; casa em condomínio fechado não é produto relevante no bairro.",
    " — perfil predominante do Ecoville e produto raro no resto de Curitiba. Quintal, segurança perimetral, criança andando de bicicleta dentro do muro. O Bigorrilho é essencialmente verticalizado e a casa em condomínio fechado não é produto relevante no bairro."
  )
  if (n > 0) log.push(`[block 9] "DNA do bairro / criança anda de bicicleta dentro do muro" reescrito`)
}

// Block 10 — "Parque Barigui na porta" + "Bigorrilho depende de carro pra chegar"
{
  const blk = body[10]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("Parque Barigui na porta") &&
    !txt.includes("especialmente nas quadras próximas da Av. Cândido Hartmann")
  ) {
    blk.content = [
      link("https://www.curitiba.pr.gov.br/parquebarigui", "Proximidade com o Parque Barigui", { bold: true }),
      t(", especialmente nas quadras próximas da Av. Cândido Hartmann e do entorno do parque — 1,4 milhão de m² de área verde. Bicicleta, caminhada com o cachorro, playground amplo. No Bigorrilho, chegar ao parque normalmente exige carro."),
    ]
    log.push(`[block 10] "Parque Barigui na porta / Bigorrilho depende de carro pra chegar" → versão consultiva`)
  }
}

// Block 11 — "entre as escolas com melhor desempenho" — already cautious
// (Vinicius validated this wording was good in corpo). Skip.

// Block 11 — "Mensalidade alta... pra família que prioriza educação top"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Mensalidade alta (~R$ 5.500/mês), mas relevante pra família que prioriza educação top.",
    "Mensalidade alta (cerca de R$ 5.500/mês), mas relevante para famílias que priorizam educação de alto padrão."
  )
  if (n > 0) log.push(`[block 11] "pra família / educação top" → "para famílias / educação de alto padrão"`)
}

// Block 15 — "zero BRT / inexistente / Sem Uber não tem como viver"
{
  const blk = body[15]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("zero BRT, ônibus convencional escasso, ciclovia de bairro inexistente") &&
    !txt.includes("rotina fica muito menos prática")
  ) {
    blk.content = [
      t("O Ecoville é "),
      b("carro-dependente"),
      t(". A região tem menos oferta de transporte estrutural e depende mais de carro do que o Bigorrilho. Sem carro próprio ou transporte por aplicativo, a rotina fica muito menos prática. Família com 1 carro só pode ter dificuldade. Adolescente sem carteira depende dos pais para tudo (escola, lazer, vida social)."),
    ]
    log.push(`[block 15] "zero BRT / não tem como viver no bairro" → versão consultiva`)
  }
}

// Block 22 — HNSG "200+ leitos, 3 UTIs"
{
  const blk = body[22]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("200+ leitos, 3 UTIs") &&
    !txt.includes("referência hospitalar tradicional")
  ) {
    blk.content = [
      b("Hospital Nossa Senhora das Graças"),
      t(" no bairro — referência hospitalar tradicional em Curitiba. Aposentado e família com criança pequena evitam deslocamento longo em emergência. O Ecoville não tem hospital de referência no próprio bairro."),
    ]
    log.push(`[block 22] HNSG — números sem fonte ("200+ leitos, 3 UTIs") removidos`)
  }
}

// Block 23 — "apto novo R$ 16.863/m² / apto antigo R$ 9.430/m²"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " No Ecoville, o equivalente é apto novo R$ 16.863/m² (~R$ 1,5 milhão) ou apto antigo R$ 9.430/m² (mais acessível, em prédios mais antigos).",
    " No Ecoville, o equivalente é apartamento novo a cerca de R$ 16.863/m² (~R$ 1,5 milhão) ou apartamento antigo na faixa de R$ 9.430/m² (mais acessível, em prédios anos 90-2000)."
  )
  if (n > 0) log.push(`[block 23] "apto novo / apto antigo" → "apartamento novo / apartamento antigo"`)
}

// Block 23 — "Preço menor pra apartamento 2Q-3Q novo"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Preço menor pra apartamento 2Q-3Q novo", "Preço menor para apartamento de 2 a 3 quartos novo")
  if (n > 0) log.push(`[block 23] "apartamento 2Q-3Q" → "apartamento de 2 a 3 quartos"`)
}

// Block 29 — "não há dado FipeZap limpo pro Ecoville"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "não há dado FipeZap limpo pro Ecoville", "não há dado FipeZap limpo para o Ecoville")
  if (n > 0) log.push(`[block 29] "pro Ecoville" → "para o Ecoville"`)
}

// Block 30 — "tende a render menos / Ambos perdem pra"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Ambos perdem pra ", "Ambos perdem para ")
  if (n > 0) log.push(`[block 31] "Ambos perdem pra" → "para"`)
}

// Block 34 — "Bigorrilho é bairro 'sempre cheio'"
{
  const blk = body[34]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("Bigorrilho é bairro \"sempre cheio\"") &&
    !txt.includes("demanda constante por locação")
  ) {
    blk.content = [
      b("Demanda de locação mais previsível"),
      t(" — o Bigorrilho costuma manter demanda constante por locação, especialmente pela proximidade com Batel, hospitais (HNSG), comércio e transporte."),
    ]
    log.push(`[block 34] "Bigorrilho é bairro 'sempre cheio'" → "demanda constante por locação"`)
  }
}

// Block 35 — "Tempo médio pra vender também rápido (qualitativo)"
{
  const blk = body[35]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("Tempo médio pra vender também rápido") &&
    !txt.includes("leitura qualitativa, não índice oficial de liquidez")
  ) {
    blk.content = [
      b("Saída prevista mais curta na revenda"),
      t(" — na observação FYMOOB, apartamentos bem precificados no Bigorrilho tendem a ter tempo de venda mais previsível. É leitura qualitativa, não índice oficial de liquidez por bairro."),
    ]
    log.push(`[block 35] "Tempo médio pra vender também rápido (qualitativo)" → caveat de leitura qualitativa`)
  }
}

// Block 43 — "Movimentação baixa — Ecoville tem obra, visitante de shopping..."
{
  const blk = body[43]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("Movimentação baixa") &&
    !txt.includes("Rotina mais previsível")
  ) {
    blk.content = [
      b("Rotina mais previsível"),
      t(" — o Bigorrilho tem comércio e hospital, mas tende a ter menos fluxo de shopping e menos dependência de grandes deslocamentos internos do que a região do Ecoville."),
    ]
    log.push(`[block 43] "Movimentação baixa" → "Rotina mais previsível"`)
  }
}

// Block 46 (heading) — "O DNA de cada bairro (onde dinheiro não resolve)"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "O DNA de cada bairro (onde dinheiro não resolve)", "A lógica de moradia de cada bairro (onde dinheiro não resolve)")
  if (n > 0) log.push(`[block 46] heading "O DNA de cada bairro" → "A lógica de moradia de cada bairro"`)
}

// Block 47 — "Os dois bairros têm DNAs incompatíveis"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Os dois bairros têm DNAs incompatíveis:",
    "Os dois bairros têm propostas de moradia diferentes:"
  )
  if (n > 0) log.push(`[block 47] "DNAs incompatíveis" → "propostas de moradia diferentes"`)
}

// Block 48 — "Desenhado pra família 35-50 recém-chegada de SP, BH"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " Desenhado pra família 35-50 recém-chegada de SP, BH ou Porto Alegre que quer qualidade de vida controlada.",
    " Costuma atrair famílias de 35 a 50 anos, muitas vezes vindas de outras capitais (SP, BH, Porto Alegre), que buscam condomínio, parque e rotina mais controlada."
  )
  if (n > 0) log.push(`[block 48] "Desenhado pra família 35-50 recém-chegada" → versão consultiva`)
}

// Block 49 — "É onde a família curitibana classe A que rejeitou o Batel foi morar há 15 anos"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "É onde a família curitibana classe A que rejeitou o Batel foi morar há 15 anos",
    "É um destino clássico para famílias de alta renda em Curitiba que gostam da proximidade do Batel, mas preferem vida de bairro mais residencial"
  )
  if (n > 0) log.push(`[block 49] "família curitibana classe A que rejeitou o Batel" → versão consultiva`)
}

// Block 50 — "padaria America pra pão quente"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "padaria America pra pão quente", "padaria America para o pão quente")
  if (n > 0) log.push(`[block 50] "padaria America pra pão quente" → "para o pão quente"`)
}

// Block 51 — "paga mais caro por m² (no lançamento ou casa em condomínio)" — already specifies
// Just verify the wording is OK. Looking at block 51:
// "Erro frequente de quem muda de Bigorrilho para o Ecoville: paga mais caro por m² (no lançamento ou casa em condomínio) para perder vida de bairro."
// already specifies in the parenthesis. OK.
// Actually let me re-check:
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Erro frequente de quem muda de Bigorrilho para o Ecoville: paga mais caro por m²",
    "Erro frequente de quem troca Bigorrilho por lançamento ou casa em condomínio no Ecoville: pagar mais caro por m²"
  )
  if (n > 0) log.push(`[block 51] "Erro frequente de quem muda de Bigorrilho para o Ecoville" → especifica lançamento/casa`)
}

// Block 56 — "vantagem imbatível pra cão grande"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " Ecoville tem quintal + Barigui colado — vantagem imbatível pra cão grande.",
    " O Ecoville tem quintal e Parque Barigui adjacente — vantagem importante para quem tem cachorro grande."
  )
  if (n > 0) log.push(`[block 56] "vantagem imbatível pra cão grande" → "para quem tem cachorro grande"`)
}

// Block 57 (heading) — "Mitos sobre Ecoville e Bigorrilho (desmentidos com dados)"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Mitos sobre Ecoville e Bigorrilho (desmentidos com dados)", "Mitos e pontos de atenção sobre Ecoville e Bigorrilho")
  if (n > 0) log.push(`[block 57] heading "Mitos desmentidos com dados" → "Mitos e pontos de atenção"`)
}

// Block 58 — "pra apartamento padrão família em prédio novo"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " pra apartamento padrão família em prédio novo, o Ecoville é mais caro.", " para apartamento padrão familiar em prédio novo, o Ecoville costuma ser mais caro.")
  if (n > 0) log.push(`[block 58] "pra apartamento padrão família" → "para apartamento padrão familiar"`)
}

// Block 62 (CTA intermediário) — refinar
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Quer que a gente rode a conta pro seu perfil?"
    ) {
      block.props.title = "Quer comparar Ecoville e Bigorrilho para o seu perfil?"
      block.props.description = "A FYMOOB cruza tipo de imóvel, orçamento, rotina, escola, parque, hospital e potencial de valorização para indicar qual bairro faz mais sentido para você."
      block.props.label = "Comparar bairros"
      log.push(`[block 62] CTA intermediário — "rode a conta pro seu perfil" → "Comparar bairros"`)
      break
    }
  }
}

// Block 64 (heading FAQ) — "Qual é melhor pra morar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Qual é melhor pra morar em Curitiba, Ecoville ou Bigorrilho?", "Qual é melhor para morar em Curitiba, Ecoville ou Bigorrilho?")
  if (n > 0) log.push(`[block 64] heading FAQ — "pra morar" → "para morar"`)
}

// Block 65 (FAQ Qual é melhor) — "Pra família / DINK / Everest #5 ENEM / DNAs incompatíveis"
{
  const blk = body[65]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Pra família com filhos pequenos que quer casa em condomínio fechado") &&
    !txt.includes("Para família com filhos pequenos")
  ) {
    blk.content = [
      b("Depende do perfil."),
      t(" Para família com filhos pequenos que quer casa em condomínio fechado, parque próximo e escola de alto desempenho, o Ecoville tende a vencer (Colégio Internacional Everest, entre os melhores desempenhos no ENEM 2024 em Curitiba, e Parque Barigui adjacente). Para jovem profissional, casal sem filhos com dupla renda, investidor ou aposentado que valoriza vida a pé, hospital no bairro e proximidade do Batel, o Bigorrilho tende a vencer. Nenhum é melhor \"no geral\" — são propostas de moradia diferentes."),
    ]
    log.push(`[block 65] FAQ "Qual é melhor" — Pra/DINK/#5 ENEM/DNAs reescrito`)
  }
}

// Block 71 (FAQ qual é mais caro) — "apto usado / apto novo (lançamento)"
// (texto fragmentado: bold em nó separado)
{
  let n = 0
  for (const block of body) {
    // Match exact bold text-node "apto usado" inside a paragraph that has o
    // contexto "Depende do produto. No"
    if (block?.type !== "paragraph" || !Array.isArray(block.content)) continue
    const txt = inlineToString(block.content)
    if (!txt.startsWith("Depende do produto. No ")) continue
    for (const node of block.content) {
      if (node?.type === "text" && node?.styles?.bold) {
        if (node.text === "apto usado") {
          node.text = "apartamento usado"
          n++
        } else if (node.text === "apto novo (lançamento)") {
          node.text = "apartamento novo (lançamento)"
          n++
        }
      }
    }
  }
  if (n > 0) log.push(`[block 71] FAQ — "apto usado / apto novo" → "apartamento usado / apartamento novo"`)
}

// Block 72 (heading FAQ) — "pra família com criança pequena"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Ecoville ou Bigorrilho pra família com criança pequena?", "Ecoville ou Bigorrilho para família com criança pequena?")
  if (n > 0) log.push(`[block 72] heading FAQ — "pra família" → "para família"`)
}

// Block 73 (FAQ família) — Everest #5 ENEM 2024 no Paraná
{
  const blk = body[73]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Colégio Internacional Everest (#5 ENEM 2024 no Paraná)") &&
    !txt.includes("entre os melhores desempenhos no ENEM 2024 em Curitiba")
  ) {
    blk.content = [
      b("Ecoville tende a vencer"),
      t(", especialmente em casa em condomínio fechado + proximidade do Parque Barigui + Colégio Internacional Everest (entre os melhores desempenhos no ENEM 2024 em Curitiba) dentro do bairro. Ressalva: o Ecoville é carro-dependente — família com 1 carro só pode ter dificuldade. O Bigorrilho é alternativa se o filho vai em escola tradicional (Positivo, Marista) e a família valoriza vida a pé."),
    ]
    log.push(`[block 73] FAQ família — "Everest (#5 ENEM 2024 no Paraná)" → "entre os melhores desempenhos no ENEM 2024 em Curitiba"`)
  }
}

// Block 78 (numbered Próximo passo 2) — "Apto usado / apto novo / pro Ecoville"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Apto usado (preço mais baixo + barganha), apto novo (preço médio-alto)", "Apartamento usado (preço mais baixo, espaço para barganha), apartamento novo (preço médio-alto)")
  }
  if (n > 0) log.push(`[block 78] próximo passo — "Apto usado / apto novo" → "Apartamento usado / apartamento novo"`)
}

// Block 80 — '"clima" define o empate'
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Sábado 9h da manhã — Feirinha Pasteur no Bigorrilho e Barigui no Ecoville. Ambos no mesmo dia. A \"clima\" define o empate.",
    "Visite em dois momentos: sábado às 9h na Feirinha Pasteur, no Bigorrilho, e no Parque Barigui, no Ecoville. A atmosfera do bairro costuma decidir quando os números empatam."
  )
  if (n > 0) log.push(`[block 80] "A 'clima' define o empate" → "atmosfera do bairro costuma decidir"`)
}

// Block 81 — "Se a matemática fecha E o perfil casa"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se a matemática fecha E o perfil casa, você tem o vencedor.",
    "Se a matemática fecha e o perfil combina com o bairro, você tem o vencedor."
  )
  if (n > 0) log.push(`[block 81] "perfil casa" → "perfil combina com o bairro"`)
}

// Block 84 (CTA final) — "(apto, casa, studio)"
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      typeof block.props?.description === "string" &&
      block.props.description.includes("(apto, casa, studio)")
    ) {
      block.props.description = block.props.description.replace(
        "(apto, casa, studio)",
        "(apartamento, casa, sobrado, estúdio)"
      )
      log.push(`[block 84] CTA final — "(apto, casa, studio)" → "(apartamento, casa, sobrado, estúdio)"`)
    }
  }
}

// ──────────────────────────────────────────────────────────────────
// CTA WhatsApp link em block 62
// ──────────────────────────────────────────────────────────────────
{
  for (const block of body) {
    if (block?.type === "ctaBox" && typeof block.props?.href === "string") {
      const before = block.props.href
      const after = before
        .replaceAll("pra meu perfil", "para meu perfil")
        .replaceAll("pro meu perfil", "para o meu perfil")
        .replaceAll("pra simular", "para simular")
      if (after !== before) {
        block.props.href = after
        log.push(`[CTA href] link "pra/pro" → "para"`)
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
