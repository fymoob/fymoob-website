/**
 * Aplica TODAS as revisões aprovadas pelo Vinicius (validadas com ChatGPT)
 * no artigo `custo-de-vida-curitiba` em 02/05/2026.
 *
 * Conjunto:
 *
 * A. Frontmatter:
 *   - title: novo (sem números cravados)
 *   - description: nova (com "renda recomendada")
 *   - seo_meta_title / seo_meta_description: alinhados
 *
 * B. Resposta direta (calloutBox):
 *   - Reescrever pra versão escaneável por perfil
 *
 * C. Conflito interno com `preco-metro-quadrado-curitiba-bairro`:
 *   - Block 45: trocar CRM FYMOOB por FipeZap mar/26 (4,5x; Batel 17.924,
 *     Bigorrilho 14.117, Mossunguê 14.062, Tatuquara 5.210, CIC 5.980, Tarumã 6.340)
 *   - Block 46: Bigorrilho → Portão com FipeZap (~14.117 → 9.200, -35%) +
 *     nota distinção m² vs aluguel
 *   - Block 110 (FAQ): bairros baratos com FipeZap publicado vs estimativa
 *   - Block 90 (estratégia 5): -35% Bigorrilho → Portão (FipeZap)
 *
 * D. Aluguel 0,4-0,6%:
 *   - Block 47: explicitar como "regra prática de mercado"
 *
 * E. Cesta DIEESE bruto vs líquido:
 *   - Block 49: 47,5% bruto + 51,33% líquido (metodologia DIEESE)
 *
 * F. Fontes consultadas (Block 114):
 *   - Reorganizar: Tier 1 oficiais primeiro, FYMOOB CRM como observação complementar
 *
 * G. CTA principal (Block 115):
 *   - Trocar pra "Calcular meu custo em Curitiba" (mais alinhado à intenção do leitor)
 *
 * H. FAQs novas (3) inseridas antes de "Fontes consultadas":
 *   - "Curitiba é boa para família?" → cross-link melhores-bairros-familias
 *   - "Qual bairro tem melhor custo-benefício em Curitiba?" → cross-link PMQ + bairros
 *   - "Alugar ou comprar em Curitiba em 2026?" → cross-link financiamento + MCMV
 *
 * IDEMPOTENTE: cada mudança tem marker textual de detecção. Re-rodar não corrompe.
 * Use --dry-run pra preview.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

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
  .select("id, title, description, body, seo_meta_title, seo_meta_description, status, slug")
  .eq("slug", SLUG)
  .single()

if (readErr || !article) {
  console.error("Erro lendo artigo:", readErr)
  process.exit(1)
}

const body = JSON.parse(JSON.stringify(article.body))
const log = []

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────
const t = (text, styles = {}) => ({ type: "text", text, styles })
const b = (text) => t(text, { bold: true })
const link = (href, text) => ({
  type: "link",
  href,
  content: [t(text)],
})

function inlineToString(content) {
  if (!Array.isArray(content)) return ""
  return content
    .map((c) => (c?.type === "link" ? inlineToString(c.content) : c?.text ?? ""))
    .join("")
}

function makeParagraph(content) {
  return {
    id: randomUUID(),
    type: "paragraph",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: Array.isArray(content) ? content : [t(content)],
    children: [],
  }
}

function makeHeading(text, level = 3) {
  return {
    id: randomUUID(),
    type: "heading",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left", level, isToggleable: false },
    content: [t(text)],
    children: [],
  }
}

// ─────────────────────────────────────────────────────────────────
// A. Frontmatter
// ─────────────────────────────────────────────────────────────────
const NEW_TITLE = "Quanto custa morar em Curitiba em 2026? Guia completo"
const NEW_DESC =
  "Solteiro, casal, família e aposentado: veja o custo real em Curitiba em 2026 com aluguel, mercado, transporte, saúde e renda recomendada."

const newSeoMetaTitle = NEW_TITLE
const newSeoMetaDescription = NEW_DESC

let titleChanged = false
let descChanged = false
if (article.title !== NEW_TITLE) {
  titleChanged = true
  log.push(`[A] title: "${article.title}" → "${NEW_TITLE}"`)
}
if (article.description !== NEW_DESC) {
  descChanged = true
  log.push(`[A] description atualizada (${NEW_DESC.length} chars)`)
}

// ─────────────────────────────────────────────────────────────────
// B. Resposta direta (block 3 — calloutBox)
// ─────────────────────────────────────────────────────────────────
const RESPOSTA_MARKER = "A maior variável é moradia: bairro, metragem"
const idx3 = body.findIndex(
  (bl) => bl.type === "calloutBox" && inlineToString(bl.content).includes("Quanto custa morar em Curitiba em 2026?")
)
if (idx3 >= 0 && !inlineToString(body[idx3].content).includes(RESPOSTA_MARKER)) {
  body[idx3].content = [
    b("Resposta rápida:"),
    t(" morar em Curitiba em 2026 custa de "),
    b("R$ 3.200 a R$ 4.000/mês"),
    t(" para um solteiro econômico, "),
    b("R$ 5.500 a R$ 8.000/mês"),
    t(" para casal sem filhos, "),
    b("R$ 9.000 a R$ 22.000/mês"),
    t(" para família com dois filhos e "),
    b("R$ 3.500 a R$ 5.500/mês"),
    t(" para aposentado sozinho. A maior variável é moradia: bairro, metragem e condomínio mudam a conta mais do que alimentação ou transporte. Cesta DIEESE-CWB mar/26 fechou em "),
    b("R$ 769,61"),
    t(" — 12,9% mais barata que SP."),
  ]
  log.push("[B] block 3 (calloutBox) reescrito por perfil")
} else if (idx3 >= 0) {
  log.push("[B] block 3 já tem marker novo — skip")
} else {
  log.push("[B] !!! calloutBox de Resposta direta não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// C.1 Block 45 — abertura "Aluguel: o maior peso da conta"
// ─────────────────────────────────────────────────────────────────
const FIPEZAP_MARKER = "ranking FipeZap publicado por MySide"
const idx45 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Campina do Siqueira")
)
if (idx45 >= 0 && !inlineToString(body[idx45].content).includes(FIPEZAP_MARKER)) {
  body[idx45].content = [
    t("Curitiba tem variação de cerca de "),
    b("4,5×"),
    t(" no preço por m² entre o bairro mais caro e o mais barato. Em março/2026, o "),
    link("https://www.myside.com.br/", "ranking FipeZap publicado por MySide"),
    t(" coloca Batel no topo ("),
    b("R$ 17.924/m²"),
    t("), seguido por Bigorrilho ("),
    b("R$ 14.117"),
    t(") e Mossunguê ("),
    b("R$ 14.062"),
    t("). Na ponta acessível, Tatuquara fecha em "),
    b("R$ 5.210"),
    t(", Cidade Industrial em "),
    b("R$ 5.980"),
    t(" e Tarumã em "),
    b("R$ 6.340"),
    t(" — variação suficiente pra mudar perfil financeiro com poucos quilômetros de deslocamento. O ranking completo, com variação 12 meses por bairro, está em "),
    link("/blog/preco-metro-quadrado-curitiba-bairro", "preço do metro quadrado em Curitiba por bairro 2026"),
    t("."),
  ]
  log.push("[C.1] block 45 (abertura aluguel) — CRM → FipeZap")
} else if (idx45 >= 0) {
  log.push("[C.1] block 45 já tem marker novo — skip")
} else {
  log.push("[C.1] !!! block 45 não encontrado (Campina do Siqueira)")
}

// ─────────────────────────────────────────────────────────────────
// C.2 Block 46 — atalho Bigorrilho → Portão
// ─────────────────────────────────────────────────────────────────
const ATALHO_MARKER = "preço do m² é custo patrimonial, não aluguel"
const idx46 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("R$ 19.509")
)
// idx46 vai falhar após primeira execução pq R$ 19.509 some. Tentar com marker velho OU novo.
const idx46Alt =
  idx46 >= 0
    ? idx46
    : body.findIndex(
        (bl) =>
          bl.type === "paragraph" &&
          inlineToString(bl.content).includes("Bigorrilho → Portão") &&
          inlineToString(bl.content).includes("ranking completo")
      )
if (idx46Alt >= 0 && !inlineToString(body[idx46Alt].content).includes(ATALHO_MARKER)) {
  body[idx46Alt].content = [
    t("Pra quem aceita andar 2 km, o atalho mais óbvio é Bigorrilho → Portão: "),
    b("R$ 14.117/m² vira cerca de R$ 9.200/m²"),
    t(", queda próxima de 35% (FipeZap mar/26). Mas atenção: "),
    b("preço do m² é custo patrimonial, não aluguel"),
    t(" — ele influencia o aluguel, mas a decisão mensal depende também de aluguel praticado, condomínio, IPTU e deslocamento. Ranking dos 30 bairros com variação 12 meses em "),
    link("/blog/preco-metro-quadrado-curitiba-bairro", "preço do metro quadrado em Curitiba por bairro"),
    t("."),
  ]
  log.push("[C.2] block 46 (atalho Bigorrilho → Portão) — números FipeZap + nota m² vs aluguel")
} else if (idx46Alt >= 0) {
  log.push("[C.2] block 46 já tem marker novo — skip")
} else {
  log.push("[C.2] !!! block 46 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// D. Block 47 — aluguel 0,4-0,6%
// ─────────────────────────────────────────────────────────────────
const REGRA_MARKER = "regra prática de mercado"
const idx47 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("0,4% e 0,6% do valor de venda")
)
if (idx47 >= 0 && !inlineToString(body[idx47].content).includes(REGRA_MARKER)) {
  body[idx47].content = [
    t("Como "),
    b("regra prática de mercado"),
    t(", muitos imóveis residenciais em Curitiba alugam entre 0,4% e 0,6% do valor de venda ao mês. Apartamento de R$ 800 mil tende a cair na faixa de R$ 3.200-4.800, mas o número real muda bastante por bairro, idade do prédio, vaga, mobília e condomínio. Para comparativo direto entre bairros nobres, "),
    link("/blog/batel-vs-agua-verde-curitiba", "Batel vs Água Verde"),
    t(" coloca os dois lado a lado."),
  ]
  log.push("[D] block 47 (regra 0,4-0,6%) — explicitada como regra prática")
} else if (idx47 >= 0) {
  log.push("[D] block 47 já tem marker novo — skip")
} else {
  log.push("[D] !!! block 47 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// E. Block 49 — cesta DIEESE bruto vs líquido
// ─────────────────────────────────────────────────────────────────
const DIEESE_MARKER = "salário mínimo líquido"
const idx49 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("R$ 769,61") &&
    inlineToString(bl.content).includes("47,5%")
)
if (idx49 >= 0 && !inlineToString(body[idx49].content).includes(DIEESE_MARKER)) {
  body[idx49].content = [
    t("A cesta básica de Curitiba em "),
    b("março/2026 fechou em R$ 769,61"),
    t(", alta de 3,23% no mês e 4,30% acumulado no 1º trimestre, segundo o "),
    link(
      "https://www.coreconpr.gov.br/noticias/pesquisa-da-cesta-basica-em-curitiba-em-marco-de-2026-em-parceria-com-a-conab/",
      "DIEESE-PR em parceria com a CONAB"
    ),
    t(". Isso equivale a "),
    b("47,5% do salário mínimo bruto"),
    t(" de R$ 1.621 e a "),
    b("51,33% do salário mínimo líquido"),
    t(" pela metodologia DIEESE — quem ganha o piso compromete metade do salário só pra abastecer a despensa."),
  ]
  log.push("[E] block 49 (cesta DIEESE) — bruto + líquido (51,33%)")
} else if (idx49 >= 0) {
  log.push("[E] block 49 já tem marker novo — skip")
} else {
  log.push("[E] !!! block 49 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// F. Block 90 — estratégia 5 (-43%)
// ─────────────────────────────────────────────────────────────────
const EST5_MARKER = "cerca de -35%"
const idx90 = body.findIndex(
  (bl) =>
    bl.type === "numberedListItem" &&
    inlineToString(bl.content).includes("Bigorrilho → Portão")
)
if (idx90 >= 0 && !inlineToString(body[idx90].content).includes(EST5_MARKER)) {
  body[idx90].content = [
    b("Escolha de bairro estratégico."),
    t(" Bigorrilho → Portão é "),
    b("cerca de -35%"),
    t(" no R$/m² andando 2 km (FipeZap mar/26). Ranking completo em "),
    link("/blog/preco-metro-quadrado-curitiba-bairro", "preço do m² em Curitiba por bairro"),
    t("."),
  ]
  log.push("[F] block 90 (estratégia 5) — -43% → -35% (FipeZap)")
} else if (idx90 >= 0) {
  log.push("[F] block 90 já tem marker novo — skip")
} else {
  log.push("[F] !!! block 90 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// G. Block 110 — FAQ "Quais bairros baratos"
// ─────────────────────────────────────────────────────────────────
const FAQ_BAIRROS_MARKER = "não estão na cobertura regular do FipeZap"
const idx110 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Campo de Santana") &&
    inlineToString(bl.content).includes("Tatuquara") &&
    inlineToString(bl.content).includes("Boqueirão")
)
if (idx110 >= 0 && !inlineToString(body[idx110].content).includes(FAQ_BAIRROS_MARKER)) {
  body[idx110].content = [
    t("Em R$/m² no FipeZap mar/26 (publicado por MySide), os mais acessíveis do ranking de 30 bairros são "),
    b("Tatuquara (R$ 5.210)"),
    t(" e "),
    b("Cidade Industrial (R$ 5.980)"),
    t(". Bairros muito periféricos como Campo de Santana, Boqueirão e Fazendinha não estão na cobertura regular do FipeZap mas, pelo padrão de mercado em abril/2026, ficam entre "),
    b("R$ 5.200 e R$ 5.800/m²"),
    t(". Pra região central com desconto, Portão custa em torno de "),
    b("R$ 9.200/m²"),
    t(" — ~35% mais barato que Bigorrilho (R$ 14.117), andando 2 km."),
  ]
  log.push("[G] block 110 (FAQ bairros baratos) — separar FipeZap publicado de estimativa")
} else if (idx110 >= 0) {
  log.push("[G] block 110 já tem marker novo — skip")
} else {
  log.push("[G] !!! block 110 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// H. Block 114 — Fontes consultadas
// ─────────────────────────────────────────────────────────────────
const FONTES_MARKER = "Observação complementar"
const idx114 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("FYMOOB CRM (snapshot")
)
// fallback: bloco logo após heading "Fontes consultadas"
const idxFontesH = body.findIndex(
  (bl) => bl.type === "heading" && inlineToString(bl.content).trim() === "Fontes consultadas"
)
const idx114Resolved =
  idx114 >= 0
    ? idx114
    : idxFontesH >= 0 && body[idxFontesH + 1]?.type === "paragraph"
      ? idxFontesH + 1
      : -1

if (idx114Resolved >= 0 && !inlineToString(body[idx114Resolved].content).includes(FONTES_MARKER)) {
  body[idx114Resolved].content = [
    b("Fontes primárias (Tier 1): "),
    link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap mar/2026"),
    t(", "),
    link(
      "https://www.coreconpr.gov.br/noticias/pesquisa-da-cesta-basica-em-curitiba-em-marco-de-2026-em-parceria-com-a-conab/",
      "DIEESE/CONAB-PR (cesta CWB mar/26)"
    ),
    t(", "),
    link(
      "https://www.ibge.gov.br/estatisticas/sociais/trabalho/9173-pesquisa-nacional-por-amostra-de-domicilios-continua-trimestral.html",
      "IBGE — PNAD Contínua 3T/2025, Censo 2022, IPCA-RM"
    ),
    t(", "),
    link("https://www3.bcb.gov.br/sgspub/", "Banco Central — séries temporais"),
    t(", "),
    link("https://www.aneel.gov.br/", "ANEEL Res. 3.472/2025"),
    t(", "),
    link("https://www.curitiba.pr.gov.br/", "Prefeitura de Curitiba"),
    t(", "),
    link("https://www.fazenda.pr.gov.br/", "SEFA-PR — IPVA Lei 21.951/2024"),
    t(", "),
    link("https://www.urbs.curitiba.pr.gov.br/", "URBS"),
    t(", "),
    link("https://www.gov.br/ans/", "ANS"),
    t(", "),
    link("https://www.gov.br/anp/", "ANP — Síntese Semanal"),
    t(". "),
    b("Observação complementar:"),
    t(" estoque ativo acompanhado pela FYMOOB em abril/2026 (242 imóveis em 66 bairros) — usado pra sentido prático de mercado, não como referência estatística."),
  ]
  log.push("[H] block 114 (Fontes) — Tier 1 oficiais + FYMOOB como observação complementar")
} else if (idx114Resolved >= 0) {
  log.push("[H] block 114 já tem marker novo — skip")
} else {
  log.push("[H] !!! block de Fontes não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// I. Block 115 — CTA principal: "Calcular meu custo em Curitiba"
// ─────────────────────────────────────────────────────────────────
const CTA_PRIMARY_TITLE = "Quer saber quanto Curitiba custaria pro seu perfil?"
const idx115 = body.findIndex(
  (bl) =>
    bl.type === "ctaBox" &&
    bl.props?.title === "Procurando imóveis em Curitiba?"
)
if (idx115 >= 0 && body[idx115].props.title !== CTA_PRIMARY_TITLE) {
  body[idx115].props.title = CTA_PRIMARY_TITLE
  body[idx115].props.description =
    "A FYMOOB cruza bairro, aluguel, condomínio, financiamento e rotina pra montar uma simulação realista antes de você escolher onde morar."
  body[idx115].props.label = "Calcular meu custo em Curitiba"
  body[idx115].props.href = "/contato?assunto=simulacao-custo-vida"
  log.push("[I] block 115 (CTA) — atualizado pra simulação personalizada")
} else if (idx115 >= 0) {
  log.push("[I] block 115 (CTA) já atualizado — skip")
} else {
  log.push("[I] !!! block 115 (CTA) não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// J. FAQs novas — inserir antes do heading "Fontes consultadas"
// ─────────────────────────────────────────────────────────────────
const FAQ_FAMILIA_MARKER = "Curitiba é boa para família?"
const jaTemFaqFamilia = body.some(
  (bl) =>
    bl.type === "heading" &&
    inlineToString(bl.content).trim() === FAQ_FAMILIA_MARKER
)

if (!jaTemFaqFamilia) {
  const insertAt = body.findIndex(
    (bl) => bl.type === "heading" && inlineToString(bl.content).trim() === "Fontes consultadas"
  )
  if (insertAt < 0) {
    log.push("[J] !!! heading 'Fontes consultadas' não encontrado — não dá pra inserir FAQs novas")
  } else {
    const newFaqs = [
      makeHeading("Curitiba é boa para família?", 3),
      makeParagraph([
        t("Sim. Curitiba é a "),
        b("1ª capital BR no IPS 2025"),
        t(", tem o maior parque urbano por habitante entre as capitais e bairros como Bigorrilho, Água Verde, Cabral e Portão concentram boa rede de escolas particulares e hospitais. O custo varia de R$ 9.000 a R$ 22.000/mês conforme escola e bairro — ranking completo em "),
        link("/blog/melhores-bairros-familias-curitiba", "melhores bairros de Curitiba para famílias em 2026"),
        t("."),
      ]),
      makeHeading("Qual bairro tem melhor custo-benefício em Curitiba?", 3),
      makeParagraph([
        t("Depende do perfil, mas Ahú aparece como destaque em 2026: "),
        b("R$ 13.022/m²"),
        t(" com valorização de "),
        b("+12,5% em 12 meses"),
        t(" (FipeZap mar/26), bom acesso ao Centro e vida residencial sem o premium de Batel. Análise completa em "),
        link("/blog/preco-metro-quadrado-curitiba-bairro", "preço do m² em Curitiba por bairro"),
        t(" e "),
        link("/blog/melhores-bairros-curitiba-2026", "melhores bairros de Curitiba 2026"),
        t("."),
      ]),
      makeHeading("Alugar ou comprar em Curitiba em 2026?", 3),
      makeParagraph([
        t("Regra prática: se o aluguel é menor que "),
        b("0,5% do valor de venda"),
        t(" ao mês, costuma valer alugar e investir a entrada. Se for maior que 0,6%, financiar tende a fazer mais sentido. A conta depende da Selic atual ("),
        b("14,75%"),
        t(" desde mar/26), prazo do financiamento e patrimônio inicial. Pra simular, ver "),
        link(
          "/blog/financiamento-caixa-itau-bradesco-comparativo",
          "comparativo Caixa, Itaú, Bradesco e BRB"
        ),
        t(" e "),
        link("/blog/como-financiar-minha-casa-minha-vida", "como financiar Minha Casa Minha Vida"),
        t("."),
      ]),
    ]
    body.splice(insertAt, 0, ...newFaqs)
    log.push(`[J] inseridas 3 FAQs novas (6 blocos) antes do "Fontes consultadas" em idx ${insertAt}`)
  }
} else {
  log.push("[J] FAQs novas já presentes — skip")
}

// ─────────────────────────────────────────────────────────────────
// Re-cálculo word_count + reading_time_min
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

log.push(`[K] word_count: ${article.body.length} blocks → ${body.length} blocks`)
log.push(`[K] novo word_count: ${wordCount}, reading_time_min: ${readingTimeMin}`)

// ─────────────────────────────────────────────────────────────────
// Persistir
// ─────────────────────────────────────────────────────────────────
console.log("=".repeat(72))
console.log("Custo de Vida — revisões")
console.log("=".repeat(72))
log.forEach((l) => console.log(l))
console.log("=".repeat(72))

if (DRY_RUN) {
  console.log("\n[DRY-RUN] sem persistência. Re-rode sem --dry-run pra aplicar.")
  process.exit(0)
}

const update = {
  body,
  word_count: wordCount,
  reading_time_min: readingTimeMin,
}
if (titleChanged) update.title = NEW_TITLE
if (descChanged) update.description = NEW_DESC
if (article.seo_meta_title !== newSeoMetaTitle) update.seo_meta_title = newSeoMetaTitle
if (article.seo_meta_description !== newSeoMetaDescription)
  update.seo_meta_description = newSeoMetaDescription

const { error: upErr } = await sb
  .from("articles")
  .update(update)
  .eq("id", article.id)

if (upErr) {
  console.error("\n!!! Erro ao salvar:", upErr)
  process.exit(1)
}

console.log("\n✅ Artigo salvo com sucesso.")

// Revalidar cache via fetch /api/revalidate (best-effort)
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fymoob.com.br"
const cronSecret = process.env.CRON_SECRET
if (cronSecret) {
  for (const target of [`/blog/${SLUG}`, "/blog"]) {
    try {
      const r = await fetch(`${baseUrl}/api/revalidate?path=${encodeURIComponent(target)}&secret=${cronSecret}`, {
        method: "POST",
      })
      console.log(`revalidate ${target}: ${r.status}`)
    } catch (e) {
      console.warn(`revalidate ${target} failed:`, e.message)
    }
  }
} else {
  console.log("(sem CRON_SECRET local — pular revalidate; ISR pega na próxima visita)")
}
