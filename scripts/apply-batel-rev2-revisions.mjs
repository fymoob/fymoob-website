/**
 * Aplica 2ª rodada de revisão no artigo `quanto-custa-morar-batel-curitiba`
 * em 03/05/2026.
 *
 * Foco:
 *   1. Title sentence case + "Guia completo"
 *   2. Tabela 4: "studio" → "estúdio"; "apto" → "apartamento" em células
 *   3. Block 53: "abril de 2026" (FipeZap) → "março/2026"
 *   4. Block 56: "O mito 'Batel > São Paulo' foi verdade em 2022" → suavizar
 *   5. Block 57: caveat em "aluguel 50-125% mais barato"
 *   6. Block 61: "fluxo SP → Batel cresceu" → tratar como observação FYMOOB
 *   7. Block 81: "Mesma região, mesma CEP" + "vai pro Batel pelo endereço mas
 *      não tem valor pra avenida" → reescrita
 *   8. Block 85 (heading): "Quem NÃO vai gostar" → "Para quem o Batel pode
 *      não fazer sentido"
 *   9. Block 88: "Em 18 meses, volta pra SP — já vimos" → suavizar
 *  10. Block 89: "criança pequena anda de bicicleta em praça fechada"
 *      reescrito
 *  11. Block 92: IPTU — "Pra imóveis" → "Para imóveis"
 *  12. Block 94 (FAQ rentabilidade): adicionar dupla leitura (agregado por m²
 *      vs imóveis específicos)
 *  13. Block 96 (CTA intermediário): "pra simular" → "para simular"
 *  14. Block 122: "perfil casa com o bairro / os alternativos pagam melhor"
 *      → reescrita
 *  15. Block 125 (CTA final): "Ver imóveis no Batel" → "Comparar bairros"
 *  16. Substituições globais: ~25 ocorrências pra/pro, "studio"→"estúdio",
 *      "apto"→"apartamento", "snapshot"→"recorte", "tá"→"está"
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "quanto-custa-morar-batel-curitiba"

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
// 0. Frontmatter — title sentence case + "Guia completo"
// ──────────────────────────────────────────────────────────────────
let titleUpdate = null
if (article.title === "Quanto custa morar no Batel (Curitiba) em 2026") {
  titleUpdate = "Quanto custa morar no Batel em 2026? Guia completo"
  log.push(`[title] "Quanto custa morar no Batel (Curitiba) em 2026" → "Quanto custa morar no Batel em 2026? Guia completo"`)
}

// ──────────────────────────────────────────────────────────────────
// 1. Block 0 (lead) — pra/Pra
// ──────────────────────────────────────────────────────────────────
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "R$ 22.500 por mês pra casal sem filhos", "R$ 22.500 por mês para casal sem filhos")
    n += walkAndReplace(block, " Pra família com 2 filhos em escola top ENEM, a conta vai pra ", " Para família com 2 filhos em escola top ENEM, a conta vai para ")
    n += walkAndReplace(block, ". Pra solteiro em studio novo, ", ". Para solteiro em estúdio novo, ")
  }
  if (n > 0) log.push(`[block 0] lead — "pra casal / Pra família / Pra solteiro / studio" reescrito`)
}

// ──────────────────────────────────────────────────────────────────
// 2. Tabela 4 — células "studio" → "estúdio", "apto" → "apartamento"
// ──────────────────────────────────────────────────────────────────
{
  const blk = body[4]
  if (blk?.type === "table" && blk.content?.rows) {
    let n = 0
    for (const row of blk.content.rows) {
      for (const cell of row.cells || []) {
        n += walkAndReplace(cell, "Solteiro (studio 30m² em prédio novo)", "Solteiro (estúdio 30m² em prédio novo)")
        n += walkAndReplace(cell, "Casal sem filhos (apto 120m² 3Q)", "Casal sem filhos (apartamento 120m², 3 dormitórios)")
        n += walkAndReplace(cell, "Família 2 filhos em escola top (apto 200m² 4Q)", "Família com 2 filhos em escola top (apartamento 200m², 4 dormitórios)")
      }
    }
    if (n > 0) log.push(`[block 4] tabela 3 cenários — "studio/apto/3Q/4Q" → versão por extenso`)
  }
}

// Block 5 — "snapshot abr/2026" → "recorte abr/2026"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Cenários pra financiamento 30 anos SAC", "Cenários para financiamento 30 anos SAC")
  if (n > 0) log.push(`[block 5] "Cenários pra financiamento" → "para financiamento"`)
}

// Block 6 — "Solteiro em studio come fora"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Solteiro em studio come fora", "Solteiro em estúdio come fora")
  if (n > 0) log.push(`[block 6] "Solteiro em studio come fora" → "estúdio"`)
}

// Block 8 — "apto 120m² 3Q em rua interna"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, ", apto 120m² 3Q em rua interna do Batel.", ", apartamento de 120m² (3 dormitórios) em rua interna do Batel.")
  if (n > 0) log.push(`[block 8] "apto 120m² 3Q" → "apartamento de 120m² (3 dormitórios)"`)
}

// Block 20 — "Pra folga real, precisa de R$ 30-35 mil"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " Pra folga real, precisa de R$ 30-35 mil. Ninguém fala isso na visita ao imóvel.",
    " Para folga real, precisa de R$ 30 a 35 mil. Esse detalhe geralmente não aparece na visita ao imóvel."
  )
  if (n > 0) log.push(`[block 20] "Pra folga real / Ninguém fala isso" → versão consultiva`)
}

// Block 35 — "precisa de R$ 70 mil/mês confortável" + "Pra renda"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, " Pra renda de R$ 50 mil, margem apertada", " Para renda de R$ 50 mil, margem apertada")
    n += walkAndReplace(block, "precisa de R$ 70 mil/mês confortável", "precisa de cerca de R$ 70 mil/mês para manter folga no orçamento")
  }
  if (n > 0) log.push(`[block 35] "Pra renda / R$ 70 mil/mês confortável"`)
}

// Block 37 (heading) — "studio novo"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Solteiro em studio novo: a nova economia do Batel", "Solteiro em estúdio novo: a nova economia do Batel")
  if (n > 0) log.push(`[block 37] heading "studio" → "estúdio"`)
}

// Block 38 — "studio 25-35m²"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "studio 25-35m² em prédio novo do Batel", "estúdio de 25-35m² em prédio novo do Batel")
  if (n > 0) log.push(`[block 38] "studio 25-35m²" → "estúdio de 25-35m²"`)
}

// Block 40 — "studio pequeno"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "(studio pequeno)", "(estúdio pequeno)")
  if (n > 0) log.push(`[block 40] "studio pequeno" → "estúdio pequeno"`)
}

// Block 49 — "Pra renda de R$ 15 mil"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Pra renda de R$ 15 mil, sobra pra poupar ou investir. Solteiro no Batel vive bem com R$ 18 mil confortável.",
    "Para renda de R$ 15 mil, sobra para poupar ou investir. Solteiro no Batel costuma viver bem a partir de R$ 18 mil confortáveis."
  )
  if (n > 0) log.push(`[block 49] "Pra renda / pra poupar" → "Para renda / para poupar"`)
}

// Block 53 — "abril de 2026" (FipeZap) → "março/2026"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "A comparação honesta por m² em abril de 2026:",
    "A comparação honesta por m², com base no FipeZap mar/2026:"
  )
  if (n > 0) log.push(`[block 53] "abril de 2026" (FipeZap) → "FipeZap mar/2026"`)
}

// Block 56 — "O mito 'Batel > São Paulo' foi verdade em 2022"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " O mito \"Batel > São Paulo\" foi verdade em 2022. Em 2026, não é mais.",
    " A percepção de que o Batel ficou mais caro que bairros nobres de São Paulo fez sentido em alguns recortes anteriores, mas não se sustenta da mesma forma em 2026."
  )
  if (n > 0) log.push(`[block 56] "mito Batel > SP foi verdade em 2022" → versão suavizada`)
}

// Block 57 — caveat em "aluguel 50-125% mais barato"
{
  const blk = body[57]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("aluguel no Batel é 50-125% MAIS BARATO que em Pinheiros ou Jardins") &&
    !txt.includes("ordem de grandeza, não como média oficial")
  ) {
    blk.content = [
      t("E aí vem a inversão que pouca gente calcula: no recorte usado, "),
      b("a diferença estimada de aluguel pode chegar a 50% a 125%"),
      t(" entre Batel e Pinheiros ou Jardins. Um 3 quartos de 120m² que sai R$ 6.800 no Batel pode custar R$ 10.000 a R$ 12.500 em Pinheiros. Num ano, a diferença ficaria entre R$ 38 mil e R$ 68 mil — mas esse intervalo deve ser lido como ordem de grandeza, não como média oficial dos bairros (varia por rua, prédio, vaga, mobília e padrão do imóvel)."),
    ]
    log.push(`[block 57] "aluguel 50-125% mais barato" → caveat de ordem de grandeza`)
  }
}

// Block 61 — "fluxo SP → Batel cresceu" + "É esse o perfil que o Batel recebe"
{
  const blk = body[61]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("É esse o perfil que o Batel recebe com braços abertos em 2026") &&
    !txt.includes("Esse é o tipo de perfil que a FYMOOB tem observado")
  ) {
    blk.content = [
      t("Profissional que recebe salário de capital paulista e se muda para o Batel pode economizar em torno de R$ 12 mil/mês no mesmo padrão de vida. Esse é o tipo de perfil que a FYMOOB tem observado com mais frequência em mudanças de São Paulo para Curitiba. "),
      b("A comparação com Pinheiros é uma estimativa de ordem de grandeza, combinando preço do m², aluguel, serviços e padrão de consumo — serve para comparar padrão de vida, não como mediana oficial do bairro."),
    ]
    log.push(`[block 61] "fluxo SP → Batel cresceu / braços abertos" → observação FYMOOB`)
  }
}

// Block 63 — "Pra muita gente"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " Pra muita gente que está olhando Batel,", " Para boa parte de quem está olhando Batel,")
  if (n > 0) log.push(`[block 63] "Pra muita gente" → "Para boa parte"`)
}

// Block 64 (table) — "Investir pra aluguel" + "Dá pra morar bem"
{
  const blk = body[64]
  if (blk?.type === "table" && blk.content?.rows) {
    let n = 0
    for (const row of blk.content.rows) {
      for (const cell of row.cells || []) {
        n += walkAndReplace(cell, "Investir pra aluguel", "Investir para renda de aluguel")
        n += walkAndReplace(cell, "Dá pra morar bem sem precisar de casa grande", "Dá para morar bem sem precisar de casa grande")
      }
    }
    if (n > 0) log.push(`[block 64] tabela alternativas — "pra aluguel / Dá pra"`)
  }
}

// Block 66 — "tá morando lá"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "que só aparece quando você já tá morando lá", "que só aparece quando você já está morando lá")
  if (n > 0) log.push(`[block 66] "tá morando lá" → "está morando lá"`)
}

// Block 70 — "vai pra R$ 200-320"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Cobertura de R$ 3,5 milhões vai pra R$ 200-320.", "Cobertura de R$ 3,5 milhões sobe para R$ 200-320.")
  if (n > 0) log.push(`[block 70] "vai pra R$ 200-320" → "sobe para R$ 200-320"`)
}

// Block 80 — "ali sai mais em conta"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " O Batel \"antigo\" é acessível pra quem aceita imóvel dos anos 80.", " O Batel \"antigo\" é acessível para quem aceita imóvel dos anos 80.")
  if (n > 0) log.push(`[block 80] "acessível pra quem" → "para quem"`)
}

// Block 81 — "Mesma região, mesma CEP" + "Quem vai pro Batel pelo endereço mas não tem valor pra avenida"
{
  const blk = body[81]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Mesma região, mesma CEP") &&
    !txt.includes("Mesma região, endereços próximos")
  ) {
    blk.content = [
      t("A diferença entre morar num prédio novo da Av. do Batel (R$ 20 mil/m²) e num prédio antigo da Rua Eurico Dufour (R$ 11 mil/m²) é de cerca de 45%. Mesma região, endereços próximos, experiências de moradia diferentes. Quem quer morar no Batel pelo endereço, mas não quer pagar o prêmio da avenida, deve olhar para as ruas internas — ali a conta sai mais leve e a \"vida de Batel\" continua viável a pé."),
    ]
    log.push(`[block 81] "Mesma região, mesma CEP / pro Batel sem valor pra avenida" → versão consultiva`)
  }
}

// Block 83 — "Pra ser honesto"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra ser honesto: Batel não é pra todo perfil.", "Para ser honesto: o Batel não é para todo perfil.")
  if (n > 0) log.push(`[block 83] "Pra ser honesto: Batel não é pra todo perfil" → "Para ser honesto"`)
}

// Block 85 (heading) — "Quem NÃO vai gostar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Quem NÃO vai gostar de morar no Batel", "Para quem o Batel pode não fazer sentido")
  if (n > 0) log.push(`[block 85] heading "Quem NÃO vai gostar" → "Para quem o Batel pode não fazer sentido"`)
}

// Block 86 — "Pra ser honesto"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra ser honesto:\n", "Para ser honesto:\n")
  if (n > 0) log.push(`[block 86] (alt)`)
}
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra ser honesto:", "Para ser honesto:")
  if (n > 0) log.push(`[block 86] "Pra ser honesto:" → "Para ser honesto:"`)
}

// Block 88 — "Em 18 meses, volta pra SP — já vimos"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " Em 18 meses, volta pra SP — já vimos isso acontecer mais de uma vez.",
    " Esse perfil pode se frustrar se esperar a mesma densidade de vida noturna, gastronomia e rede profissional de Pinheiros ou Vila Madalena."
  )
  if (n > 0) log.push(`[block 88] "Em 18 meses volta pra SP — já vimos" → versão consultiva`)
}

// Block 89 — "criança pequena anda de bicicleta em praça fechada"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " Criança pequena anda de bicicleta em praça fechada, não no bairro.",
    " Para criança pequena, a bicicleta tende a ficar restrita a praças, condomínios e áreas protegidas, não à rua."
  )
  if (n > 0) log.push(`[block 89] "criança pequena anda de bicicleta em praça fechada" → versão consultiva`)
}

// Block 90 — "Quem tem orçamento apertado pra 'fazer funcionar'"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Quem tem orçamento apertado pra \"fazer funcionar\".",
    "Quem precisa apertar o orçamento para fazer o Batel caber."
  )
  if (n > 0) log.push(`[block 90] "orçamento apertado pra fazer funcionar" → versão consultiva`)
}

// Block 92 — IPTU "Pra imóveis"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " Pra imóveis com aumento real de valor venal,", " Para imóveis com aumento real de valor venal,")
  if (n > 0) log.push(`[block 92] IPTU — "Pra imóveis" → "Para imóveis"`)
}

// Block 94 (FAQ rentabilidade) — adicionar dupla leitura
{
  const blk = body[94]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Faixa mais defensável pra Batel") &&
    !txt.includes("No agregado por m², o retorno pode ficar perto de 2% ao ano")
  ) {
    blk.content = [
      b("\"Comprar no Batel rende mais que investir em CDB.\""),
      t(" Falso em 2026. Batel valorizou +6,5% em 12 meses (FipeZap mar/2026), mas a "),
      b("rentabilidade de aluguel"),
      t(" tende a ficar abaixo da média de Curitiba (4,74% ao ano, FipeZap), por ser bairro de alto padrão historicamente saturado. No agregado por m², o retorno pode ficar perto de "),
      b("2% ao ano"),
      t(", porque o preço de venda é muito alto. Em unidades específicas, especialmente menores ou bem posicionadas para locação, a faixa defensável fica em torno de "),
      b("0,25% a 0,33% ao mês"),
      t(", ou cerca de 3% a 4% ao ano. Mesmo somando valorização e aluguel, o retorno total nominal fica perto de 9,5% a 10,5% ao ano — ainda abaixo de um CDB 100% CDI em parte de 2026 (~13% ao ano). O Batel tende a funcionar melhor como reserva de valor e uso próprio do que como investimento puro para renda — então o \"aluguel não pago\" entra como receita implícita."),
    ]
    log.push(`[block 94] FAQ rentabilidade — dupla leitura (agregado por m² ~2% / unidades específicas 3-4%) explícita`)
  }
}

// Block 96 (CTA intermediário) — "pra simular"
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Quer saber se o Batel cabe no seu orçamento?" &&
      block.props?.description?.includes("pra simular")
    ) {
      block.props.description = "A FYMOOB cruza renda, financiamento, aluguel, condomínio, escola, carro e padrão de consumo para simular se o Batel faz sentido — ou se outro bairro entrega melhor equilíbrio."
      log.push(`[block 96] CTA intermediário — "pra simular" → "para simular"`)
      break
    }
  }
}

// Block 99 (FAQ) — "Solteiro em studio"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Solteiro em studio: R$ 6.200-9.500/mês", "Solteiro em estúdio: R$ 6.200-9.500/mês")
  if (n > 0) log.push(`[block 99] FAQ — "Solteiro em studio" → "estúdio"`)
}

// Block 101 (FAQ aluguel) — "1 quarto ou studio"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "1 quarto ou studio R$ 2.000-4.000/mês", "1 quarto ou estúdio R$ 2.000-4.000/mês")
  if (n > 0) log.push(`[block 101] FAQ aluguel — "1 quarto ou studio" → "estúdio"`)
}

// Block 103 (FAQ vale a pena) — "Vale pra perfil certo / Não vale pra aposentado / Pra comparar"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Vale **pra perfil certo**:", "Vale **para perfil certo**:")
    n += walkAndReplace(block, " pra aposentado buscando silêncio", " para aposentado buscando silêncio")
    n += walkAndReplace(block, " Pra comparar com outros bairros nobres", " Para comparar com outros bairros nobres")
  }
  if (n > 0) log.push(`[block 103] FAQ vale a pena — "pra perfil / pra aposentado / Pra comparar"`)
}

// Block 105 (FAQ Batel ou Pinheiros) — "fluxo SP → Batel cresceu"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " É por isso que o fluxo SP → Batel cresceu em 2025-2026.",
    " Isso ajuda a explicar por que profissionais vindos de São Paulo aparecem com frequência na demanda por Batel."
  )
  if (n > 0) log.push(`[block 105] FAQ — "fluxo SP → Batel cresceu" → versão consultiva`)
}

// Block 107 (FAQ Quanto sobra) — "pra quem mora no Batel" + "Pra folga real"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Quanto sobra do salário pra quem mora no Batel?", "Quanto sobra do salário para quem mora no Batel?")
  }
  if (n > 0) log.push(`[block 107] heading FAQ — "pra quem mora no Batel"`)
}

// Block 113 (FAQ comprar ou alugar) — "Pra uso próprio / Pra flexibilidade / pra financiar"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Pra **uso próprio com horizonte de 7+ anos**,", "Para **uso próprio com horizonte de 7+ anos**,")
    n += walkAndReplace(block, "Pra **flexibilidade ou investimento financeiro puro**,", "Para **flexibilidade ou investimento financeiro puro**,")
    n += walkAndReplace(block, "Comparativo de bancos pra financiar em ", "Comparativo de bancos para financiar em ")
  }
  if (n > 0) log.push(`[block 113] FAQ comprar ou alugar — "Pra uso próprio / Pra flexibilidade / pra financiar"`)
}

// Block 117 — "ecossistema financeiro completo. Antes de fechar"
// Block 118: "9 rubricas. Moradia... Vida social real."
// Block 120: "pra poupança"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Quanto sobra depois de Batel pra poupança", "Quanto sobra depois de Batel para poupança")
  if (n > 0) log.push(`[block 120] "pra poupança" → "para poupança"`)
}

// Block 122 — "perfil casa com o bairro / os alternativos pagam melhor"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Se a matemática fecha E o perfil casa com o bairro (vida social densa, mobilidade urbana por carro, tolerância a obras), Batel vale. Se algum dos dois não fecha, os alternativos pagam melhor.",
    "Se a matemática fecha e o perfil combina com o bairro (vida social densa, mobilidade urbana por carro, tolerância a obras), o Batel costuma valer. Se algum dos dois não fecha, bairros alternativos tendem a entregar melhor relação entre custo e benefício."
  )
  if (n > 0) log.push(`[block 122] "perfil casa com o bairro / alternativos pagam melhor" → versão consultiva`)
}

// Block 125 (CTA final) — "Ver imóveis no Batel" → "Comparar bairros"
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Ver imóveis à venda no Batel"
    ) {
      block.props.title = "Quer comparar o Batel com bairros alternativos?"
      block.props.description = "A FYMOOB compara custo mensal, perfil de imóvel, financiamento e rotina para indicar se Batel, Água Verde, Bigorrilho ou Ahú faz mais sentido para você."
      block.props.label = "Comparar bairros"
      log.push(`[block 125] CTA final — "Ver imóveis no Batel" → "Comparar bairros"`)
      break
    }
  }
}

// ──────────────────────────────────────────────────────────────────
// Substituições remanescentes
// ──────────────────────────────────────────────────────────────────

// Sources sample: "snapshot abr/2026" → "recorte abr/2026"
{
  let n = 0
  for (const block of body) {
    if (block?.type === "methodologyBox" && block.props?.sources && typeof block.props.sources === "string") {
      const before = block.props.sources
      const after = before.replaceAll("snapshot abr/2026", "recorte abr/2026")
      if (after !== before) {
        block.props.sources = after
        n++
      }
    }
  }
  if (n > 0) log.push(`[methodology] sources — "snapshot abr/2026" → "recorte abr/2026"`)
}

// CTA WhatsApp link pra meu perfil
{
  for (const block of body) {
    if (block?.type === "ctaBox" && typeof block.props?.href === "string" && block.props.href.includes("custo total de morar no Batel pro meu perfil")) {
      block.props.href = block.props.href.replace("custo total de morar no Batel pro meu perfil", "custo total de morar no Batel para meu perfil")
      log.push(`[CTA WhatsApp] link "pro meu perfil" → "para meu perfil"`)
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

const { error: updErr } = await sb.from("articles").update(update).eq("id", article.id)
if (updErr) {
  console.error("Erro atualizando:", updErr)
  process.exit(1)
}

console.log("\n✓ Artigo atualizado no Supabase.")
