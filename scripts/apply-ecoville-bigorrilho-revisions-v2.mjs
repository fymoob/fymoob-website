/**
 * Refinamentos pos-validacao GPT no `ecoville-vs-bigorrilho-curitiba`.
 * Aplicado em 02/05/2026 apos primeiro patch (apply-ecoville-bigorrilho-revisions.mjs).
 *
 * GPT auditou e pediu 18 refinamentos extras em cima do que ja apliquei.
 * Ponto central: a tese "Ecoville tem 3 precos" estava cravando numeros
 * especificos quando a granularidade da regiao Barigui/Ecoville
 * (harmonizada no PMQ) deveria ser FAIXA. Tudo alinhado ao PMQ revisado.
 *
 * 18 mudancas:
 *
 * A. Description — sem cravar 3 precos
 * B. Block 0 (lead) — versao GPT (em vez de 3 numeros, faixa + Bigorrilho como referencia limpa)
 * C. Block 1 (heading "3 colunas") — wording menos absoluto
 * D. Block 2 (tabela inicial) — substituir por tabela vertical com FAIXAS
 * E. Block 4 (heading) — "nao existe operacionalmente" → "por que engana"
 * F. Block 5 (paragrafo) — wording cuidadoso, sem absoluto
 * G. Block 9 — "Bigorrilho 100% apartamento" → "essencialmente verticalizado"
 * H. Block 11 — Everest "#5 ENEM 2024 PR" → "entre os melhores em CWB"
 * I. Block 12 — "Park Shopping Curitiba" + "Kidzania-style" → "ParkShoppingBarigui" + "atividades infantis"
 * J. Block 23 — "apto antigo descontinuado" → suavizar
 * K. Block 30 — rentabilidade Bigorrilho com wording consultivo
 * L. Block 48 — "socialmente frio" + "vizinho do fundo" → suavizar
 * M. Block 51 — "mulher troca feirinha", "cachorro 2x/semana" → suavizar
 * N. Block 58 — "falso absoluto" → "depende do recorte"
 * O. Block 60 — "fluxo demografico real" → "valorizacao nao prova migracao"
 * P. Block 61 — "esta errado quem cita +17%" → "pode estar usando recorte antigo"
 * Q. Block 67 — "Mossungue" → "principalmente Mossungue, partes de CC e CS"
 * R. Block 71 — "100% apartamento" + numeros cravados → suavizar
 * S. Block 82 — methodologyBox: limitacao Ecoville como regiao comercial
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "ecoville-vs-bigorrilho-curitiba"

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data: article } = await sb
  .from("articles")
  .select("id, description, body")
  .eq("slug", SLUG)
  .single()

const body = JSON.parse(JSON.stringify(article.body))
const log = []

const t = (text, styles = {}) => ({ type: "text", text, styles })
const b = (text) => t(text, { bold: true })
const link = (href, text) => ({ type: "link", href, content: [t(text)] })

function inlineToString(content) {
  if (!Array.isArray(content)) return ""
  return content
    .map((c) => (c?.type === "link" ? inlineToString(c.content) : c?.text ?? ""))
    .join("")
}

function makeTableCell(textOrInline) {
  return {
    type: "tableCell",
    props: { colspan: 1, rowspan: 1, textColor: "default", textAlignment: "left", backgroundColor: "default" },
    content: typeof textOrInline === "string" ? [t(textOrInline)] : textOrInline,
  }
}

function makeTable(rows) {
  const cols = rows[0]?.length ?? 0
  return {
    id: randomUUID(),
    type: "table",
    props: { textColor: "default" },
    content: {
      type: "tableContent",
      columnWidths: Array(cols).fill(null),
      rows: rows.map((cells) => ({ cells: cells.map((c) => makeTableCell(c)) })),
    },
    children: [],
  }
}

function walkAndReplace(node, from, to) {
  let count = 0
  if (Array.isArray(node)) {
    for (const item of node) {
      if (item?.type === "text" && typeof item.text === "string" && item.text.includes(from)) {
        item.text = item.text.replaceAll(from, to)
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
  return count
}

// ─────────────────────────────────────────────────────────────────
// A. Description nova
// ─────────────────────────────────────────────────────────────────
const NEW_DESC =
  "Ecoville mistura apartamento usado, lançamento e casa em condomínio; Bigorrilho é mais homogêneo. Compare preço, rotina, parque, hospital e perfil ideal."
const descChanged = article.description !== NEW_DESC
if (descChanged) log.push(`[A] description atualizada (sem cravar 3 preços)`)

// ─────────────────────────────────────────────────────────────────
// B. Block 0 (lead) — reescrita v2 (mais cuidadosa)
// ─────────────────────────────────────────────────────────────────
const LEAD_V2_MARKER = "Por isso, em vez de falar em \"preço médio do Ecoville\""
const idx0 = body.findIndex(
  (bl, i) =>
    i === 0 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Três mercados")
)
if (idx0 >= 0 && !inlineToString(body[idx0].content).includes(LEAD_V2_MARKER)) {
  body[idx0].content = [
    t("No Bigorrilho, a comparação é mais limpa: o bairro é majoritariamente verticalizado, com apartamentos consolidados e referência de "),
    b("R$ 14.117/m² no FipeZap mar/2026"),
    t(". No Ecoville, a conta é menos direta: o nome comercial cobre principalmente Mossunguê e partes de Campo Comprido e Campina do Siqueira, com produtos muito diferentes — apartamento usado, lançamento e casa em condomínio. Por isso, em vez de falar em \"preço médio do Ecoville\", a leitura correta é por "),
    b("faixa e tipo de imóvel"),
    t(": apartamentos usados tendem a entrar abaixo do Bigorrilho; lançamentos e casas em condomínio podem superá-lo com folga. Este post mostra como decidir entre os dois em 4 perfis: família, jovem, investidor e aposentado."),
  ]
  log.push("[B] block 0 (lead) reescrito v2 — sem cravar 3 preços específicos")
}

// ─────────────────────────────────────────────────────────────────
// C. Block 1 (heading) — wording menos absoluto
// ─────────────────────────────────────────────────────────────────
const idx1 = body.findIndex(
  (bl, i) =>
    i === 1 &&
    bl.type === "heading" &&
    inlineToString(bl.content).includes("3 colunas")
)
if (idx1 >= 0) {
  body[idx1].content = [t("A comparação certa: Ecoville em 3 produtos, Bigorrilho em 1 mercado")]
  log.push("[C] block 1 (heading) reescrito")
}

// ─────────────────────────────────────────────────────────────────
// D. Block 2 (tabela inicial) — substituir por tabela vertical c/ FAIXAS
// ─────────────────────────────────────────────────────────────────
const idx2 = body.findIndex(
  (bl, i) =>
    i === 2 &&
    bl.type === "table" &&
    (bl.content?.rows ?? []).some((r) =>
      r.cells.some((c) => inlineToString(c.content).includes("Ecoville-apto usado"))
    )
)
if (idx2 >= 0) {
  body[idx2] = makeTable([
    ["Produto", "Preço por m²", "Como ler"],
    ["Ecoville — apartamento usado", "~R$ 9.000–11.000/m²", "Recorte de unidades antigas (anos 90-2010); pode variar muito por prédio"],
    ["Ecoville — lançamento ou apto novo", "~R$ 16.000–17.500/m²", "Recorte de imóveis novos e na planta; faixa apto.vc com grande variação"],
    ["Ecoville — casa em condomínio", "~R$ 16.800–25.000/m²", "Alto padrão, baixa comparabilidade; sub-amostra de mercado local"],
    ["Bigorrilho — apartamento", "R$ 14.117/m²", "Referência mais limpa pelo FipeZap mar/2026"],
  ])
  log.push("[D] tabela 2 substituída — vertical com 3 colunas (Produto/Preço/Como ler)")
}

// ─────────────────────────────────────────────────────────────────
// E. Block 4 (heading)
// ─────────────────────────────────────────────────────────────────
const idx4 = body.findIndex(
  (bl, i) =>
    i === 4 &&
    bl.type === "heading" &&
    inlineToString(bl.content).includes("não existe operacionalmente")
)
if (idx4 >= 0) {
  body[idx4].content = [t("Por que o preço médio do Ecoville engana")]
  log.push("[E] block 4 (heading) — wording menos absoluto")
}

// ─────────────────────────────────────────────────────────────────
// F. Block 5 (parágrafo)
// ─────────────────────────────────────────────────────────────────
const idx5 = body.findIndex(
  (bl, i) =>
    i === 5 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("declaração editorial")
)
if (idx5 >= 0) {
  body[idx5].content = [
    t("Como \"Ecoville\" é uma região comercial e não um bairro oficial único, o preço médio muda muito conforme a fonte inclui apartamento usado, lançamento, casa em condomínio, Mossunguê, Campo Comprido ou Campina do Siqueira. Por isso, comparar \"Ecoville vs Bigorrilho\" sem separar o tipo de imóvel gera conclusão errada. A regra pra este post: quando alguém disser \"o Ecoville custa R$ X\", peça pra detalhar qual produto. Sem essa detalhamento, a frase costuma estar misturando 3 mercados."),
  ]
  log.push("[F] block 5 (parágrafo) — wording cuidadoso, sem absoluto")
}

// ─────────────────────────────────────────────────────────────────
// G. Block 9 — "Bigorrilho 100% apartamento"
// ─────────────────────────────────────────────────────────────────
let count_g = 0
for (const block of body) {
  count_g += walkAndReplace(block, "Bigorrilho é 100% apartamento, zero casa-condomínio.", "Bigorrilho é essencialmente verticalizado; casa em condomínio fechado não é produto relevante no bairro.")
}
if (count_g > 0) log.push(`[G] block 9 — "100% apartamento" → "essencialmente verticalizado"`)

// ─────────────────────────────────────────────────────────────────
// H. Block 11 — Everest
// ─────────────────────────────────────────────────────────────────
const idx11 = body.findIndex(
  (bl) =>
    bl.type === "bulletListItem" &&
    inlineToString(bl.content).includes("Everest") &&
    inlineToString(bl.content).includes("675,93")
)
if (idx11 >= 0) {
  body[idx11].content = [
    link("https://www.bomjesus.br/", "Colégio Internacional Everest"),
    t(" dentro do bairro — entre as escolas com melhor desempenho no ENEM 2024 em Curitiba, com média próxima de 675 pontos em rankings baseados nos microdados públicos do "),
    link("https://www.gov.br/inep/pt-br/assuntos/enem", "INEP"),
    t(". Mensalidade alta (~R$ 5.500/mês), mas relevante pra família que prioriza educação top."),
  ]
  log.push("[H] block 11 — Everest sem cravar #5 PR")
}

// ─────────────────────────────────────────────────────────────────
// I. Block 12 — Park Shopping
// ─────────────────────────────────────────────────────────────────
let count_i = 0
for (const block of body) {
  count_i += walkAndReplace(block, "Park Shopping Curitiba — cinemas IMAX, praça de alimentação grande, atividades pra criança (Kidzania-style). Resolve o sábado chuvoso.", "ParkShoppingBarigüi — shopping regional com cinema, praça de alimentação grande, atividades infantis e lazer em dia de chuva.")
  count_i += walkAndReplace(block, "Park Shopping premium com IMAX", "ParkShoppingBarigüi com cinema")
  count_i += walkAndReplace(block, "Park Shopping atrai", "ParkShoppingBarigüi atrai")
}
if (count_i > 0) log.push(`[I] block 12+48+36 — "Park Shopping Curitiba" → "ParkShoppingBarigüi" (${count_i}x)`)

// ─────────────────────────────────────────────────────────────────
// J. Block 23 — Ecoville apto antigo
// ─────────────────────────────────────────────────────────────────
let count_j = 0
for (const block of body) {
  count_j += walkAndReplace(block, "(mais em conta, mas prédio dos anos 90 descontinuado)", "(mais acessível, em prédios mais antigos)")
}
if (count_j > 0) log.push(`[J] block 23 — "prédio dos anos 90 descontinuado" → "prédios mais antigos"`)

// ─────────────────────────────────────────────────────────────────
// K. Block 30 — rentabilidade Bigorrilho (wording consultivo)
// ─────────────────────────────────────────────────────────────────
const RENT_V2_MARKER = "previsível, mas não é campeão de retorno"
const idx30 = body.findIndex(
  (bl) =>
    bl.type === "bulletListItem" &&
    inlineToString(bl.content).includes("Bigorrilho tem rendimento de aluguel")
)
if (idx30 >= 0 && !inlineToString(body[idx30].content).includes(RENT_V2_MARKER)) {
  body[idx30].content = [
    t("Bigorrilho tende a render menos que bairros como "),
    link("/imoveis/portao", "Portão"),
    t(", "),
    link("/imoveis/centro", "Centro"),
    t(" e Prado Velho. Em imóveis de alto padrão, a faixa costuma ficar abaixo da média de Curitiba (4,74% a.a., FipeZap mar/2026); em unidades menores e bem localizadas para locação, pode se aproximar de "),
    b("0,25% a 0,33% ao mês"),
    t(" ("),
    link("https://secovi-pr.com.br/", "Secovi-PR"),
    t(" + FipeZap Locação). Para investidor de renda, Bigorrilho é previsível, mas não é campeão de retorno."),
  ]
  log.push("[K] block 30 — rentabilidade Bigorrilho com wording consultivo")
}

// ─────────────────────────────────────────────────────────────────
// L. Block 48 — Ecoville bairro-resort (suavizar "socialmente frio")
// ─────────────────────────────────────────────────────────────────
const idx48 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("bairro-resort") &&
    inlineToString(bl.content).includes("Socialmente frio")
)
if (idx48 >= 0) {
  body[idx48].content = [
    t("Ecoville é um \"bairro-resort\" de Curitiba — usando o termo no sentido de ambiente fechado e organizado, não pejorativo. Muro alto, condomínio fechado horizontal ou torre vertical recente, ParkShoppingBarigüi com cinema, proximidade do Parque Barigui (especialmente nas quadras mais próximas da Av. Cândido Hartmann e entorno). Desenhado pra família 35-50 recém-chegada de SP, BH ou Porto Alegre que quer qualidade de vida controlada. Carro-dependente, vida de rua menos intensa, silencioso à noite. As relações de vizinhança tendem a ser mais privadas do que num bairro tradicional verticalizado."),
  ]
  log.push("[L] block 48 — 'socialmente frio' + 'vizinho do fundo' suavizados")
}

// ─────────────────────────────────────────────────────────────────
// M. Block 51 — Erro frequente (suavizar caricaturas)
// ─────────────────────────────────────────────────────────────────
const idx51 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).startsWith("Erro frequente de quem muda")
)
if (idx51 >= 0 && inlineToString(body[idx51].content).includes("Mulher troca feirinha")) {
  body[idx51].content = [
    t("Erro frequente de quem muda de Bigorrilho para o Ecoville: paga mais caro por m² (no lançamento ou casa em condomínio) para perder vida de bairro. Criança deixa de andar de bicicleta na rua e passa a pedalar dentro do muro; a família troca comércio de rua por shopping e hipermercado; cachorro vai de caminhada na rua arborizada para idas ao Barigui de carro. É troca de cidade por região controlada — só compensa para perfil muito específico."),
  ]
  log.push("[M] block 51 — caricaturas suavizadas (sem 'mulher troca feirinha')")
}

// ─────────────────────────────────────────────────────────────────
// N. Block 58 — "falso absoluto" → "depende do recorte"
// ─────────────────────────────────────────────────────────────────
let count_n = 0
for (const block of body) {
  count_n += walkAndReplace(block, "Verdade no apto usado (-33%), falso no apto novo (+19% Ecoville) e falso absoluto em casa-condomínio (+30-70% Ecoville).", "Depende do recorte: em apartamento usado, sim (Ecoville costuma sair mais barato); em apto novo e casa em condomínio, não (Ecoville geralmente é mais caro).")
}
if (count_n > 0) log.push(`[N] block 58 — "falso absoluto" → "depende do recorte"`)

// ─────────────────────────────────────────────────────────────────
// O. Block 60 — fluxo demográfico
// ─────────────────────────────────────────────────────────────────
const idx60 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("fluxo demográfico real")
)
if (idx60 >= 0) {
  body[idx60].content = [
    b("\"Moradores estão migrando de Bigorrilho para o Ecoville em 2026.\" "),
    t("Não exatamente. O que os dados mostram é outra coisa: Ahú e "),
    link("/imoveis/juveve", "Juvevê"),
    t(" valorizaram mais que Bigorrilho e Ecoville em 12 meses (+12,5% e +11,5% respectivamente, FipeZap mar/2026). A valorização sugere maior pressão de demanda nesses bairros, mas não prova fluxo demográfico direto Bigorrilho → Ecoville. Falar em migração entre bairros exigiria dados residenciais que não estão disponíveis publicamente."),
  ]
  log.push("[O] block 60 — 'fluxo demográfico real' suavizado para 'valorização ≠ migração'")
}

// ─────────────────────────────────────────────────────────────────
// P. Block 61 — +17% Ecoville
// ─────────────────────────────────────────────────────────────────
const idx61 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Ecoville valorizou +17%")
)
if (idx61 >= 0) {
  body[idx61].content = [
    b("\"Ecoville valorizou +17% em 12 meses.\" "),
    t("Alguns conteúdos citam altas maiores para o Ecoville, mas normalmente estão usando recortes específicos, anos anteriores (o +17% mais comum vem do Senior Index 2024) ou produtos diferentes. Para 2026, a leitura precisa separar apartamento usado, lançamento e casa em condomínio — e o FipeZap oficial não publica granular único para a região."),
  ]
  log.push("[P] block 61 — '+17%' suavizado")
}

// ─────────────────────────────────────────────────────────────────
// Q. Block 67 — FAQ Ecoville oficial
// ─────────────────────────────────────────────────────────────────
const idx67 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).startsWith("Não. \"Ecoville\"") &&
    inlineToString(bl.content).includes("Mossunguê")
)
if (idx67 >= 0) {
  body[idx67].content = [
    t("Não. \"Ecoville\" é um nome comercial usado pelo mercado para uma região que se concentra "),
    b("principalmente em Mossunguê"),
    t(" e, dependendo da fonte, também inclui partes de Campo Comprido e Campina do Siqueira. Oficialmente, na nomenclatura da "),
    link("https://ippuc.org.br/", "Prefeitura/IPPUC"),
    t(", o bairro é Mossunguê. Nosso catálogo lista os imóveis da região em "),
    link("/imoveis/mossungue", "/imoveis/mossungue"),
    t("."),
  ]
  log.push("[Q] block 67 (FAQ Ecoville oficial) — wording mais cuidadoso")
}

// ─────────────────────────────────────────────────────────────────
// R. Block 71 — qual mais caro
// ─────────────────────────────────────────────────────────────────
const idx71 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Apto usado no Ecoville (R$ 9.430")
)
if (idx71 >= 0) {
  body[idx71].content = [
    t("Depende do produto. No "),
    b("apto usado"),
    t(", o Ecoville costuma sair mais barato que o Bigorrilho — recortes intermediários colocam o usado na faixa de R$ 9.000-11.000/m² contra R$ 14.117/m² em Bigorrilho. No "),
    b("apto novo (lançamento)"),
    t(", o Ecoville sobe para R$ 16.000-17.500/m² (apto.vc com grande variação por empreendimento), ficando acima do Bigorrilho. Em "),
    b("casa em condomínio"),
    t(", o Ecoville fica em R$ 16.800-25.000/m² — Bigorrilho não tem casa em condomínio como produto relevante, é essencialmente verticalizado."),
  ]
  log.push("[R] block 71 (FAQ qual mais caro) — números virou faixas + sem '100% apartamento'")
}

// ─────────────────────────────────────────────────────────────────
// S. Block 82 — methodologyBox v2 (com limitação Ecoville)
// ─────────────────────────────────────────────────────────────────
const NEW_TREATMENT_V2 =
  "Ecoville não é um bairro oficial único: é um nome comercial usado para a região que se concentra em Mossunguê e, dependendo da fonte, também inclui partes de Campo Comprido e Campina do Siqueira. Por isso, os preços do Ecoville variam muito conforme a fonte considera o recorte — apartamento usado, lançamento, casa em condomínio. Bigorrilho tem métrica direta no FipeZap (R$ 14.117/m² mar/2026) por ser bairro homogêneo, essencialmente verticalizado. Rendimento de aluguel calculado como aluguel anual ÷ preço de venda; bairros de alto padrão têm rendimento abaixo da média de Curitiba (4,74% a.a., FipeZap) por concentração histórica."

const idx82 = body.findIndex((bl) => bl.type === "methodologyBox")
if (idx82 >= 0 && body[idx82].props.treatment !== NEW_TREATMENT_V2) {
  body[idx82].props.treatment = NEW_TREATMENT_V2
  body[idx82].props.lastUpdate = "2026-05-02"
  log.push("[S] methodologyBox treatment v2 — limitação Ecoville como região comercial")
}

// ─────────────────────────────────────────────────────────────────
// Re-cálculo word_count
// ─────────────────────────────────────────────────────────────────
function blockText(bl) {
  if (Array.isArray(bl.content)) return inlineToString(bl.content)
  if (bl.type === "table") {
    return (bl.content?.rows ?? [])
      .map((r) => r.cells.map((c) => inlineToString(c.content)).join(" "))
      .join(" ")
  }
  if (bl.type === "calloutBox") return inlineToString(bl.content)
  if (bl.type === "ctaBox") return `${bl.props?.title ?? ""} ${bl.props?.description ?? ""}`
  if (bl.type === "methodologyBox")
    return Object.values(bl.props ?? {}).filter((v) => typeof v === "string").join(" ")
  return ""
}
const totalText = body.map(blockText).join(" ")
const wordCount = totalText.split(/\s+/).filter(Boolean).length
const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200))
log.push(`[T] body: ${article.body.length} blocks → ${body.length} blocks`)
log.push(`[T] novo word_count: ${wordCount}, reading_time_min: ${readingTimeMin}`)

console.log("=".repeat(72))
console.log("Ecoville vs Bigorrilho — refinamentos pós-GPT (v2)")
console.log("=".repeat(72))
log.forEach((l) => console.log(l))
console.log("=".repeat(72))

if (DRY_RUN) {
  console.log("\n[DRY-RUN] sem persistência.")
  process.exit(0)
}

const update = { body, word_count: wordCount, reading_time_min: readingTimeMin }
if (descChanged) update.description = NEW_DESC

const { error: upErr } = await sb.from("articles").update(update).eq("id", article.id)
if (upErr) {
  console.error("\n!!! Erro:", upErr)
  process.exit(1)
}
console.log("\n✅ Artigo salvo com sucesso.")
