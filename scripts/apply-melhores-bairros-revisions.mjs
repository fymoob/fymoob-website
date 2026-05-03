/**
 * Aplica TODAS as revisões aprovadas pelo Vinicius (validadas com ChatGPT)
 * no artigo `melhores-bairros-curitiba-2026` em 02/05/2026.
 *
 * Padrão editorial: linguagem PT-BR limpa — sem jargões em inglês,
 * sem palavras duplicadas, sem frases provocativas absolutas.
 *
 * Conjunto:
 *
 * A. Frontmatter — title sentence case + seo_meta_*
 * B. Lead reescrito (versão GPT amigável e direta)
 * C. Insert: parágrafo "Como calculamos" em prosa antes da metodologia técnica
 * D. Insert: tabela inicial "Qual bairro combina com seu perfil?" após o lead
 * E. Tabela 4 — corrigir empate 8/8/10 + renomear Ecoville → Mossunguê (Ecoville)
 * F. Insert: tabela "Como os pesos mudam o ranking" depois do block 6
 * G. Block 11 — Pequeno Príncipe wording oficial + Newsweek
 * H. Block 25 — Juvevê "perfil residencial baixo padrão" (erro factual) → wording correto
 * I. Block 27 — "liquidez/vacância" → linguagem leiga ("facilidade de vender ou alugar / risco de ficar vazio")
 * J. Block 28 — Prado Velho 12% com caveat tipológico explícito
 * K. Block 29 — "Armadilha clássica" → "Erro comum de análise" + rentabilidade 0,25-0,33%/mês + explicação leiga
 * L. Block 30 — CTA reformulada ("Comparar bairros" + descrição GPT)
 * M. Block 35 — Cascatinha caveat SESP-PR + remove "4 mais seguras BR"
 * N. Block 41 — Ecoville R$ 16.800 → R$ 14.062 (FipeZap mar/26) + tom suavizado
 * O. Block 52 — "premium" → "alto padrão"
 * P. Block 61 — methodologyBox sources qualificados + treatment com pesos
 *
 * IDEMPOTENTE: cada mudança tem marker textual de detecção. Use --dry-run.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

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
const link = (href, text) => ({ type: "link", href, content: [t(text)] })

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

function makeHeading(text, level = 2) {
  return {
    id: randomUUID(),
    type: "heading",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left", level, isToggleable: false },
    content: [t(text)],
    children: [],
  }
}

function makeTableCell(cellContent) {
  return {
    type: "tableCell",
    props: { colspan: 1, rowspan: 1, textColor: "default", textAlignment: "left", backgroundColor: "default" },
    content: typeof cellContent === "string" ? [t(cellContent)] : cellContent,
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

// ─────────────────────────────────────────────────────────────────
// A. Frontmatter
// ─────────────────────────────────────────────────────────────────
const NEW_TITLE = "Melhores bairros de Curitiba em 2026: ranking por perfil"
const NEW_DESC =
  "Veja os melhores bairros de Curitiba em 2026 para morar ou investir, com ranking por segurança, educação, infraestrutura, preço e perfil de morador."
const NEW_SEO_META_TITLE = "Melhores bairros de Curitiba em 2026: ranking por perfil"
const NEW_SEO_META_DESC =
  "30 bairros de Curitiba avaliados em segurança, educação, infraestrutura e preço — com pesos diferentes para família, jovem, aposentado e investidor."

const titleChanged = article.title !== NEW_TITLE
const descChanged = article.description !== NEW_DESC
const seoTitleChanged = article.seo_meta_title !== NEW_SEO_META_TITLE
const seoDescChanged = article.seo_meta_description !== NEW_SEO_META_DESC

if (titleChanged) log.push(`[A] title atualizado`)
if (descChanged) log.push(`[A] description atualizada`)
if (seoTitleChanged) log.push(`[A] seo_meta_title atualizado (era NULL)`)
if (seoDescChanged) log.push(`[A] seo_meta_description atualizado (era NULL)`)

// ─────────────────────────────────────────────────────────────────
// B. Lead (block 0) — versão final GPT
// ─────────────────────────────────────────────────────────────────
const LEAD_MARKER = "Este ranking mostra os melhores bairros"
const idx0 = body.findIndex(
  (bl, i) =>
    i === 0 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Todo blog de imobiliária")
)
if (idx0 >= 0 && !inlineToString(body[idx0].content).includes(LEAD_MARKER)) {
  body[idx0].content = [
    t("A maioria dos guias coloca o Batel como o melhor bairro de Curitiba. Mas quando segurança, educação, infraestrutura e preço entram com o mesmo peso, o resultado muda: o Batel fica em 3º lugar, e o "),
    b("Ahú"),
    t(" aparece na liderança. Este ranking mostra os melhores bairros de Curitiba em 2026 no geral e também por perfil — família com filhos, jovem sem filhos, aposentado e investidor."),
  ]
  log.push("[B] block 0 (lead) — wording suavizado")
} else if (idx0 >= 0) {
  log.push("[B] block 0 já tem marker novo — skip")
} else {
  log.push("[B] !!! block 0 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// E. Tabela 4 — corrigir empate + renomear Ecoville → Mossunguê (Ecoville)
// (faço antes das inserções pra ainda saber posições por marker)
// ─────────────────────────────────────────────────────────────────
const idxTabelaGeral = body.findIndex(
  (bl) =>
    bl.type === "table" &&
    (bl.content?.rows ?? []).some((r) =>
      r.cells.some((c) => inlineToString(c.content).includes("Ahú"))
    ) &&
    (bl.content?.rows ?? []).some((r) =>
      r.cells.some((c) => inlineToString(c.content).includes("Cristo Rei"))
    )
)
if (idxTabelaGeral >= 0) {
  const rows = body[idxTabelaGeral].content.rows
  // Reconstruir a ordem das linhas: Bigorrilho 56, Mossunguê 56 (era Ecoville), Cristo Rei 55
  // Localizar cada uma
  const findRowIdx = (substr) =>
    rows.findIndex((r) => r.cells.some((c) => inlineToString(c.content).includes(substr)))
  const idxBigorrilho = findRowIdx("Bigorrilho")
  const idxCristoRei = findRowIdx("Cristo Rei")
  const idxEcoville = findRowIdx("Ecoville")

  // Já está corrigido? checar se Mossunguê (Ecoville) já está no nome
  const ecovilleNameRow = idxEcoville >= 0 ? rows[idxEcoville] : null
  const ecovilleName = ecovilleNameRow ? inlineToString(ecovilleNameRow.cells[1]?.content) : ""
  const alreadyFixed = ecovilleName.includes("Mossunguê")

  if (!alreadyFixed && idxBigorrilho > 0 && idxCristoRei > 0 && idxEcoville > 0) {
    // Renomear Ecoville → Mossunguê (Ecoville)
    const ecovilleRow = rows[idxEcoville]
    // A célula do bairro pode ser um link no JSON. Preservar estrutura.
    // Se for link, atualizar o texto interno; senão substituir.
    const cellBairro = ecovilleRow.cells[1]
    if (Array.isArray(cellBairro.content)) {
      // Substituir conteúdo pelo texto novo (sem link, mantendo simples)
      cellBairro.content = [t("Mossunguê (Ecoville)")]
    }
    // Atualizar posição: era 10, agora é 8 (empatado com Bigorrilho)
    ecovilleRow.cells[0].content = [t("8")]
    // Cristo Rei: era 9, agora é 10
    rows[idxCristoRei].cells[0].content = [t("10")]

    // Reordenar as linhas: garantir que Bigorrilho (8), Mossunguê (8), Cristo Rei (10) ficam em sequência
    // Remover Cristo Rei e re-inserir após Mossunguê
    const cristoRow = rows[idxCristoRei]
    rows.splice(idxCristoRei, 1)
    // Como removeu Cristo Rei, o índice do Ecoville pode ter mudado se Cristo estava antes
    const idxEcovilleAfter = rows.findIndex((r) =>
      r.cells.some((c) => inlineToString(c.content).includes("Mossunguê"))
    )
    if (idxEcovilleAfter >= 0) {
      rows.splice(idxEcovilleAfter + 1, 0, cristoRow)
    }
    log.push(`[E] tabela ranking geral — empate 8/8/10 corrigido + Ecoville → Mossunguê (Ecoville)`)
  } else if (alreadyFixed) {
    log.push("[E] tabela ranking geral já corrigida — skip")
  } else {
    log.push(`[E] !!! falha ao localizar linhas (B=${idxBigorrilho}, C=${idxCristoRei}, E=${idxEcoville})`)
  }
} else {
  log.push("[E] !!! tabela ranking geral não encontrada")
}

// ─────────────────────────────────────────────────────────────────
// G. Block 11 — Pequeno Príncipe (versão final GPT, mais enxuta)
// ─────────────────────────────────────────────────────────────────
const PP_MARKER = "exclusivamente pediátrico"
const idxPP = body.findIndex(
  (bl) =>
    bl.type === "bulletListItem" &&
    inlineToString(bl.content).includes("Pequeno Príncipe")
)
if (idxPP >= 0 && !inlineToString(body[idxPP].content).includes(PP_MARKER)) {
  body[idxPP].content = [
    b("Infraestrutura: "),
    t("próximo ao "),
    link("https://pequenoprincipe.org.br/institucional/quem-somos/", "Hospital Pequeno Príncipe"),
    t(" — maior hospital exclusivamente pediátrico do Brasil e melhor hospital exclusivamente pediátrico da América Latina segundo o ranking Newsweek 2025. BRT do "),
    link("/imoveis/cabral", "Cabral"),
    t(" a 5 minutos, Praça do Japão e Parque São Lourenço vizinhos."),
  ]
  log.push("[G] block 11 (Pequeno Príncipe) — wording oficial + Newsweek")
} else if (idxPP >= 0) {
  log.push("[G] block 11 já tem marker novo — skip")
} else {
  log.push("[G] !!! block 11 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// H. Block 25 (tabela aposentado) — Juvevê wording
// ─────────────────────────────────────────────────────────────────
const idxTabelaAposentado = body.findIndex(
  (bl) =>
    bl.type === "table" &&
    (bl.content?.rows ?? []).some((r) =>
      r.cells.some((c) => inlineToString(c.content).includes("Hospital Cardiológico"))
    )
)
if (idxTabelaAposentado >= 0) {
  let touched = false
  for (const row of body[idxTabelaAposentado].content.rows) {
    const bairro = inlineToString(row.cells[1]?.content ?? []).trim()
    if (bairro.includes("Juvevê")) {
      const desc = inlineToString(row.cells[2]?.content ?? [])
      if (desc.includes("baixo padrão") && !desc.includes("baixa verticalização")) {
        row.cells[2].content = [
          t("Silencioso, arborizado, preço R$ 13.897/m². Perfil residencial tradicional, baixa verticalização. Pequeno Príncipe a 8 min."),
        ]
        touched = true
      }
    }
  }
  if (touched) {
    log.push("[H] tabela aposentado — Juvevê 'baixo padrão' → 'tradicional, baixa verticalização'")
  } else {
    log.push("[H] tabela aposentado já tem wording correto — skip")
  }
} else {
  log.push("[H] !!! tabela aposentado não encontrada")
}

// ─────────────────────────────────────────────────────────────────
// I. Block 27 — substituir liquidez/vacância
// ─────────────────────────────────────────────────────────────────
const PESOS_MARKER = "facilidade de vender ou alugar"
const idx27 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Investidor não mora") &&
    inlineToString(bl.content).includes("liquidez")
)
if (idx27 >= 0 && !inlineToString(body[idx27].content).includes(PESOS_MARKER)) {
  body[idx27].content = [
    t("Pesos: 40% rendimento de aluguel + 25% facilidade de vender ou alugar (tempo no mercado) + 20% valorização esperada + 15% risco de ficar vazio. Investidor não mora — quer renda e saída fácil."),
  ]
  log.push("[I] block 27 (pesos investidor) — liquidez/vacância → linguagem leiga")
} else if (idx27 >= 0) {
  log.push("[I] block 27 já tem marker novo — skip")
} else {
  log.push("[I] !!! block 27 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// J. Block 28 (tabela investidor) — Prado Velho com caveat
// ─────────────────────────────────────────────────────────────────
const idxTabelaInvest = body.findIndex(
  (bl) =>
    bl.type === "table" &&
    (bl.content?.rows ?? []).some((r) =>
      r.cells.some((c) => inlineToString(c.content).includes("Prado Velho"))
    )
)
if (idxTabelaInvest >= 0) {
  let touched = false
  for (const row of body[idxTabelaInvest].content.rows) {
    const bairro = inlineToString(row.cells[1]?.content ?? []).trim()
    if (bairro === "Prado Velho") {
      const retorno = inlineToString(row.cells[2]?.content ?? [])
      if (!retorno.includes("Não é rendimento médio do bairro")) {
        row.cells[2].content = [
          t("~12% ao ano em estúdios mobiliados (PUC/Santa Casa, locação de temporada) — observação acompanhada pela FYMOOB. Não é rendimento médio do bairro."),
        ]
        touched = true
      }
    }
  }
  if (touched) {
    log.push("[J] tabela investidor — Prado Velho com caveat tipológico explícito")
  } else {
    log.push("[J] tabela investidor já tem caveat — skip")
  }
} else {
  log.push("[J] !!! tabela investidor não encontrada")
}

// ─────────────────────────────────────────────────────────────────
// K. Block 29 — Armadilha clássica + rentabilidade
// ─────────────────────────────────────────────────────────────────
const ARMADILHA_MARKER = "Erro comum de análise"
const idx29 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Armadilha clássica")
)
if (idx29 >= 0 && !inlineToString(body[idx29].content).includes(ARMADILHA_MARKER)) {
  body[idx29].content = [
    b("Erro comum de análise: "),
    link("/imoveis/batel", "Batel"),
    t(" e "),
    link("/imoveis/bigorrilho", "Bigorrilho"),
    t(" têm aluguel caro em reais absolutos, mas o rendimento sobre o preço de compra fica em torno de "),
    b("0,25% a 0,33% ao mês (cerca de 3% ao ano)"),
    t(" — abaixo da média de Curitiba (4,74% a.a., FipeZap mar/2026) por serem bairros de alto padrão historicamente saturados. Em outras palavras: o aluguel é caro, mas o imóvel também é muito caro, então o retorno percentual costuma ser menor. São reserva de valor, não renda. "),
    link("/blog/preco-metro-quadrado-curitiba-bairro", "Ranking completo de preço do m²"),
    t("."),
  ]
  log.push("[K] block 29 — 'Armadilha clássica' → 'Erro comum de análise' + rentabilidade harmonizada")
} else if (idx29 >= 0) {
  log.push("[K] block 29 já tem marker novo — skip")
} else {
  log.push("[K] !!! block 29 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// L. Block 30 — CTA "Comparar bairros"
// ─────────────────────────────────────────────────────────────────
const CTA_NEW_TITLE = "Quer comparar bairros para o seu perfil?"
const idx30 = body.findIndex(
  (bl) =>
    bl.type === "ctaBox" &&
    bl.props?.title?.includes("Quer que a gente calcule a rentabilidade")
)
if (idx30 >= 0 && body[idx30].props.title !== CTA_NEW_TITLE) {
  body[idx30].props.title = CTA_NEW_TITLE
  body[idx30].props.description =
    "A FYMOOB cruza orçamento, rotina, tipo de imóvel, escola, transporte e potencial de valorização para indicar bairros que fazem sentido para você."
  body[idx30].props.label = "Comparar bairros"
  log.push("[L] block 30 (CTA) — atualizada para 'Comparar bairros'")
} else if (idx30 >= 0) {
  log.push("[L] block 30 já atualizada — skip")
} else {
  log.push("[L] !!! block 30 não encontrada")
}

// ─────────────────────────────────────────────────────────────────
// M. Block 35 — Cascatinha caveat
// ─────────────────────────────────────────────────────────────────
const CASCATINHA_MARKER = "indicador, não como garantia"
const idx35 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Cascatinha") &&
    inlineToString(bl.content).includes("zero homicídios")
)
if (idx35 >= 0 && !inlineToString(body[idx35].content).includes(CASCATINHA_MARKER)) {
  body[idx35].content = [
    t("Na agregação consultada (SESP-PR / CAPE, jan-set/2025), não aparecem homicídios letais reportados para Cascatinha. Como esse recorte por bairro não é publicado de forma padronizada pela SESP-PR, o dado deve ser lido como "),
    b("indicador, não como garantia"),
    t(". O bairro se destaca pelo perfil residencial, baixa verticalização e concentração de casas de alto padrão. Drenagem nova pelo pacote PRO Curitiba (R$ 2,9 bilhões em obras). Virou \"Santa Felicidade alto padrão\" em silêncio — nicho de casa (R$ 900 mil a R$ 15 milhões), não apartamento."),
  ]
  log.push("[M] block 35 (Cascatinha) — caveat SESP-PR + remove '4 mais seguras BR'")
} else if (idx35 >= 0) {
  log.push("[M] block 35 já tem marker novo — skip")
} else {
  log.push("[M] !!! block 35 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// N. Block 41 — Ecoville mito (versão GPT suavizada)
// ─────────────────────────────────────────────────────────────────
const ECOVILLE_MARKER = "Mossunguê, região que concentra"
const idx41 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Ecoville custa R$ 16.800")
)
if (idx41 >= 0 && !inlineToString(body[idx41].content).includes(ECOVILLE_MARKER)) {
  body[idx41].content = [
    link("/busca?bairro=Ecoville", "Ecoville"),
    t(" como \"modernidade acessível\". Um guia de 2015 colocava o Ecoville como \"Batel dos jovens\". Em "),
    b("março de 2026, o FipeZap publica Mossunguê, região que concentra boa parte do Ecoville, em R$ 14.062/m²"),
    t(" — praticamente empatado com Bigorrilho, a R$ 14.117/m². Mais barato que o Batel? Sim. \"Acessível\"? Não. O perfil mudou: hoje é casa de alto padrão em condomínio fechado, comprada por família vinda de outras capitais. A percepção antiga já não acompanha o preço atual."),
  ]
  log.push("[N] block 41 (Ecoville) — número FipeZap + tom suavizado")
} else if (idx41 >= 0) {
  log.push("[N] block 41 já tem marker novo — skip")
} else {
  log.push("[N] !!! block 41 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// O. Block 52 — "premium" → "alto padrão"
// ─────────────────────────────────────────────────────────────────
const idx52 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Vale, por 2 razões concretas") &&
    inlineToString(bl.content).includes("entre os premium")
)
if (idx52 >= 0) {
  for (const item of body[idx52].content) {
    if (item?.type === "text" && typeof item.text === "string" && item.text.includes("entre os premium")) {
      item.text = item.text.replaceAll("entre os premium", "entre os bairros de alto padrão")
    }
  }
  log.push("[O] block 52 — 'entre os premium' → 'entre os bairros de alto padrão'")
} else {
  log.push("[O] block 52 já corrigido ou não encontrado — skip")
}

// ─────────────────────────────────────────────────────────────────
// P. Block 61 — methodologyBox sources + treatment
// ─────────────────────────────────────────────────────────────────
const NEW_SOURCES_MB = JSON.stringify([
  "FipeZap mar/2026 (FGV + Fipe + Zap) — preço m² por bairro",
  "SESP-PR / CAPE Estatísticas — crimes letais (recorte agregado, sem granularidade oficial por bairro)",
  "INEP — IDEB 2024 (escolas públicas) + ENEM 2024 (escolas particulares)",
  "IPPUC — áreas verdes, transporte, equipamentos urbanos",
  "Prefeitura de Curitiba — IPTU 2026 (Decreto 2668/2025) e equipamentos públicos",
  "Secovi-PR — Pesquisa de Locação CWB",
])
const NEW_TREATMENT =
  "Pesos do ranking geral: 25% cada critério (igualdade). Pesos por perfil: Família com filhos pequenos — 35% educação + 30% segurança + 20% infraestrutura + 15% preço. Jovem solteiro/casal sem filhos — 30% infraestrutura/vida urbana + 25% preço + 25% transporte + 20% segurança. Aposentado/família madura — 35% segurança + 25% tranquilidade + 20% saúde + 20% preço. Investidor — 40% rendimento de aluguel + 25% facilidade de vender ou alugar + 20% valorização esperada + 15% risco de ficar vazio."

const idx61 = body.findIndex((bl) => bl.type === "methodologyBox")
if (idx61 >= 0) {
  let touched = false
  if (body[idx61].props.sources !== NEW_SOURCES_MB) {
    body[idx61].props.sources = NEW_SOURCES_MB
    touched = true
  }
  if (body[idx61].props.treatment !== NEW_TREATMENT) {
    body[idx61].props.treatment = NEW_TREATMENT
    touched = true
  }
  if (body[idx61].props.lastUpdate !== "2026-05-02") {
    body[idx61].props.lastUpdate = "2026-05-02"
    touched = true
  }
  if (touched) {
    log.push("[P] methodologyBox — sources + treatment + lastUpdate atualizados")
  } else {
    log.push("[P] methodologyBox já atualizado — skip")
  }
} else {
  log.push("[P] !!! methodologyBox não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// INSERÇÕES (mexem índices — fazer DEPOIS dos in-place)
// ─────────────────────────────────────────────────────────────────

// D. Insert: tabela inicial "Qual bairro combina com seu perfil?" (após lead)
const TABELA_INICIAL_MARKER = "Qual bairro combina com seu perfil?"
const tabelaInicialExists = body.some(
  (bl) =>
    bl.type === "heading" &&
    inlineToString(bl.content).trim() === TABELA_INICIAL_MARKER
)
if (!tabelaInicialExists) {
  // Inserir DEPOIS do lead (block 0) e ANTES do heading "Metodologia (em 3 frases)"
  const idxMetodologia = body.findIndex(
    (bl) =>
      bl.type === "heading" &&
      inlineToString(bl.content).includes("Metodologia")
  )
  if (idxMetodologia > 0) {
    const headingTabela = makeHeading("Qual bairro combina com seu perfil?", 2)
    const introTabela = makeParagraph([
      t("Antes do ranking detalhado, um atalho de leitura. Os bairros abaixo aparecem com mais força em cada situação — depois mostramos a metodologia e o ranking completo:"),
    ])
    const tabelaInicial = makeTable([
      ["Se você procura...", "Comece por estes bairros"],
      ["Melhor equilíbrio geral", "Ahú, Água Verde, Batel"],
      ["Família com filhos", "Bacacheri, Água Verde, Cabral"],
      ["Vida urbana e praticidade", "Alto da Glória, Centro, Água Verde"],
      ["Tranquilidade para aposentado", "Cabral, Jardim Social, Juvevê"],
      ["Casa com quintal", "Santa Felicidade, Cascatinha, Jardim Social"],
      ["Investimento para aluguel", "Prado Velho, Portão, Centro"],
      ["Alto padrão com facilidade de vender", "Batel, Bigorrilho, Mossunguê (Ecoville)"],
    ])
    body.splice(idxMetodologia, 0, headingTabela, introTabela, tabelaInicial)
    log.push(`[D] inserida tabela inicial "Qual bairro combina com seu perfil?" antes da metodologia`)
  } else {
    log.push("[D] !!! heading 'Metodologia' não encontrado para ancorar tabela inicial")
  }
} else {
  log.push("[D] tabela inicial já existe — skip")
}

// C. Insert: parágrafo "Como calculamos" em prosa antes da metodologia técnica
const PROSA_METODOLOGIA_MARKER = "Como calculamos:"
const prosaExists = body.some(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).startsWith("Como calculamos:")
)
if (!prosaExists) {
  // Inserir DEPOIS do heading "Metodologia (em 3 frases)" e ANTES do parágrafo técnico atual
  const idxMetodologiaH = body.findIndex(
    (bl) =>
      bl.type === "heading" &&
      inlineToString(bl.content).includes("Metodologia")
  )
  if (idxMetodologiaH > 0) {
    const prosaPara = makeParagraph([
      b("Como calculamos: "),
      t("cada bairro recebeu notas de 0 a 20 em quatro critérios — segurança, educação, infraestrutura e preço. No ranking geral, todos têm o mesmo peso. Nos rankings por perfil, os pesos mudam: família valoriza mais escola e segurança; jovem valoriza transporte e vida urbana; aposentado valoriza tranquilidade e saúde; investidor valoriza rendimento, facilidade de vender ou alugar e risco de ficar vazio."),
    ])
    body.splice(idxMetodologiaH + 1, 0, prosaPara)
    log.push(`[C] inserido parágrafo 'Como calculamos' em prosa após heading metodologia`)
  } else {
    log.push("[C] !!! heading 'Metodologia' não encontrado para ancorar prosa")
  }
} else {
  log.push("[C] parágrafo 'Como calculamos' já existe — skip")
}

// F. Insert: tabela "Como os pesos mudam o ranking" depois do block "intro do ranking geral"
const TABELA_PESOS_MARKER = "Como os pesos mudam o ranking"
const tabelaPesosExists = body.some(
  (bl) =>
    bl.type === "heading" &&
    inlineToString(bl.content).trim() === TABELA_PESOS_MARKER
)
if (!tabelaPesosExists) {
  // Localizar o parágrafo "A posição 1 do Ahú não é acaso" (era block 6)
  const idxIntro = body.findIndex(
    (bl) =>
      bl.type === "paragraph" &&
      inlineToString(bl.content).includes("A posição 1 do Ahú não é acaso")
  )
  if (idxIntro > 0) {
    const headingPesos = makeHeading("Como os pesos mudam o ranking", 2)
    const introPesos = makeParagraph([
      t("O ranking geral usa peso igual em todos os critérios. Mas a maioria dos leitores tem um perfil — e mudar os pesos muda quem aparece no topo. A tabela abaixo resume o que sobe e o que cai conforme o foco:"),
    ])
    const tabelaPesos = makeTable([
      ["Perfil", "Lidera", "Cai no ranking", "Sobe no ranking"],
      ["Geral (peso igual)", "Ahú", "Batel (cai para 3º)", "Santa Felicidade (sobe para 5º)"],
      ["Família com filhos", "Bacacheri", "Centro, Alto da Glória", "Água Verde, Cristo Rei"],
      ["Jovem solteiro/casal", "Alto da Glória", "Bacacheri, Santa Felicidade", "Centro"],
      ["Aposentado", "Cabral", "Centro, Alto da Glória", "Jardim Social"],
      ["Investidor (renda)", "Prado Velho (estúdio mobiliado)", "Batel, Bigorrilho (rendimento ~3% a.a.)", "Portão, Cidade Industrial"],
    ])
    body.splice(idxIntro + 1, 0, headingPesos, introPesos, tabelaPesos)
    log.push(`[F] inserida tabela "Como os pesos mudam o ranking" após intro do ranking geral`)
  } else {
    log.push("[F] !!! parágrafo intro do ranking não encontrado")
  }
} else {
  log.push("[F] tabela 'Como os pesos mudam o ranking' já existe — skip")
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

log.push(`[R] body: ${article.body.length} blocks → ${body.length} blocks`)
log.push(`[R] novo word_count: ${wordCount}, reading_time_min: ${readingTimeMin}`)

// ─────────────────────────────────────────────────────────────────
// Persistir
// ─────────────────────────────────────────────────────────────────
console.log("=".repeat(72))
console.log("Melhores Bairros CWB — revisões")
console.log("=".repeat(72))
log.forEach((l) => console.log(l))
console.log("=".repeat(72))

if (DRY_RUN) {
  console.log("\n[DRY-RUN] sem persistência. Re-rode sem --dry-run pra aplicar.")
  process.exit(0)
}

const update = { body, word_count: wordCount, reading_time_min: readingTimeMin }
if (titleChanged) update.title = NEW_TITLE
if (descChanged) update.description = NEW_DESC
if (seoTitleChanged) update.seo_meta_title = NEW_SEO_META_TITLE
if (seoDescChanged) update.seo_meta_description = NEW_SEO_META_DESC

const { error: upErr } = await sb
  .from("articles")
  .update(update)
  .eq("id", article.id)

if (upErr) {
  console.error("\n!!! Erro ao salvar:", upErr)
  process.exit(1)
}

console.log("\n✅ Artigo salvo com sucesso.")

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
