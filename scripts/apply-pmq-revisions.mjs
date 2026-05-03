/**
 * Aplica TODAS as revisões aprovadas pelo Vinicius (validadas com ChatGPT)
 * no artigo `preco-metro-quadrado-curitiba-bairro` em 02/05/2026.
 *
 * Esse artigo é a fonte de verdade interna do site — todos os outros
 * 6 artigos do cluster referenciam ele. Auditoria detectou 5 bugs
 * que comprometiam credibilidade.
 *
 * 3 decisões pendentes do doc foram resolvidas pelo ChatGPT:
 *
 * 1. Mossunguê vs Campina do Siqueira no #3 → Opção C: trocar pra
 *    "Região Barigui/Ecoville (Mossunguê / Campina do Siqueira /
 *    Campo Comprido) — R$ 12.000-14.500/m²" sem cravar bairro
 *    individual. Granularidade FipeZap por bairro vem de
 *    intermediárias e varia.
 * 2. CIC valor → R$ 8.998/m² no ranking principal (FipeZap oficial).
 *    R$ 6.477 só na tabela de rentabilidade como subamostra FYMOOB
 *    com nota explicativa. R$ 3.998 (typo) e R$ 5.980 (que é Capão
 *    Raso, não CIC) ambos saem.
 * 3. Rentabilidade premium → preservar Batel agregado em ~2,0% a.a.
 *    (cálculo correto: R$ 29,90/m² × 12 / R$ 17.924/m²) MAS adicionar
 *    nota: "imóveis premium específicos podem ficar em 0,25-0,33%/mês
 *    (cerca de 3-4% a.a.)". Distinção entre leitura agregada e leitura
 *    por tipo de imóvel.
 *
 * Outras correções:
 * - Datas FipeZap: "abril/2026" → "março/2026" (FipeZap publica com
 *   defasagem mensal). FYMOOB observação fica em "abril/2026".
 * - Lead reescrito (sai typo CIC R$ 3.998 + "FYMOOB vende toda semana")
 * - Description: "Campina do Siqueira surpreende" → "bairros fora do
 *   eixo tradicional ganham força"
 * - Cascatinha: caveat SESP-PR padrão do cluster
 * - methodologyBox completamente atualizado
 *
 * IDEMPOTENTE: cada mudança tem marker textual de detecção. Use --dry-run.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "preco-metro-quadrado-curitiba-bairro"

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
  console.error("Erro lendo:", readErr)
  process.exit(1)
}

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

function makeParagraph(content) {
  return {
    id: randomUUID(),
    type: "paragraph",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: Array.isArray(content) ? content : [t(content)],
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
  if (node?.type === "table" && node.content?.rows) {
    for (const row of node.content.rows) {
      for (const cell of row.cells || []) {
        if (Array.isArray(cell.content)) count += walkAndReplace(cell.content, from, to)
      }
    }
  }
  return count
}

// ─────────────────────────────────────────────────────────────────
// A. Frontmatter
// ─────────────────────────────────────────────────────────────────
const NEW_DESC = "Ranking dos 30 bairros de Curitiba por m² em março/2026. Batel a R$ 17.924, Ahú lidera valorização (+12,5%), bairros fora do eixo tradicional ganham força. Dados FipeZap."
const NEW_SEO_DESC = "Batel lidera, Ahú dispara e bairros fora do eixo tradicional ganham força. Veja o preço do m² por bairro e onde ainda há oportunidade. Dados FipeZap."

const descChanged = article.description !== NEW_DESC
const seoDescChanged = article.seo_meta_description !== NEW_SEO_DESC

if (descChanged) log.push(`[A] description atualizada (sem cravar Campina do Siqueira)`)
if (seoDescChanged) log.push(`[A] seo_meta_description atualizada`)

// ─────────────────────────────────────────────────────────────────
// B. Block 0 — Lead reescrito
// ─────────────────────────────────────────────────────────────────
const LEAD_MARKER = "história mais importante não é só o preço"
const idx0 = body.findIndex(
  (bl, i) =>
    i === 0 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("R$ 3.998")
)
if (idx0 >= 0 && !inlineToString(body[idx0].content).includes(LEAD_MARKER)) {
  body[idx0].content = [
    t("O "),
    link("/imoveis/batel", "Batel"),
    t(" fechou março/2026 em "),
    b("R$ 17.924/m²"),
    t(", segundo o "),
    link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap"),
    t(". No outro extremo do ranking ampliado, bairros como Boqueirão e "),
    link("/imoveis/capao-raso", "Capão Raso"),
    t(" aparecem abaixo de R$ 6 mil/m². Entre esses extremos, a história mais importante não é só o preço — é a "),
    b("valorização em 12 meses"),
    t(". Ahú subiu +12,5%, Juvevê +11,5% e "),
    link("/imoveis/cidade-industrial", "Cidade Industrial"),
    t(" +10,2%, enquanto o Batel avançou só +6,5%. Este é o mapa completo dos 30 bairros analisados, com FipeZap como base principal e observação complementar do estoque acompanhado pela FYMOOB em abril/2026."),
  ]
  log.push("[B] block 0 (lead) reescrito — sai typo CIC R$ 3.998 + 'FYMOOB vende toda semana'")
} else if (idx0 >= 0) {
  log.push("[B] block 0 já tem marker novo — skip")
} else {
  log.push("[B] !!! block 0 não encontrado")
}

// ─────────────────────────────────────────────────────────────────
// C. Substituições "abril" → "março" (FipeZap)
// ─────────────────────────────────────────────────────────────────
// 9 ocorrências confirmadas via inspeção. Tudo FipeZap (sem FYMOOB).
const dateReplacements = [
  { from: "Tabela completa — preço do m² por bairro, abril/2026", to: "Tabela completa — preço do m² por bairro, março/2026" },
  { from: "Curitiba capital em abril/2026", to: "Curitiba capital em março/2026" },
  { from: "ultrapassaram R$ 12.000/m² em abril/2026", to: "ultrapassaram R$ 12.000/m² em março/2026" },
  { from: "compõem esse faixa em abril/2026", to: "compõem essa faixa em março/2026" },
  { from: "régua prática, por faixa de preço em abril/2026", to: "régua prática, por faixa de preço em março/2026" },
  { from: "preço médio de R$ 17.924/m² em abril de 2026", to: "preço médio de R$ 17.924/m² em março de 2026" },
  { from: "Em abril de 2026, o preço médio do m² em Curitiba está", to: "Em março de 2026, o preço médio do m² em Curitiba está" },
  { from: "+12,5% entre abril/2025 e abril/2026", to: "+12,5% entre março/2025 e março/2026" },
]
for (const { from, to } of dateReplacements) {
  let count = 0
  for (const block of body) count += walkAndReplace(block, from, to)
  if (count > 0) log.push(`[C] datas: "${from.slice(0, 50)}..." → ajustado (${count}x)`)
}

// ─────────────────────────────────────────────────────────────────
// D. Block 3 — fontes (rebaixar FYMOOB se aparece)
// ─────────────────────────────────────────────────────────────────
// Block 3 já está OK (só lista fontes). Só conferir.
const idx3 = body.findIndex(
  (bl, i) =>
    i === 3 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Preço médio Curitiba capital")
)
if (idx3 >= 0) {
  // OK — já tem só fontes oficiais
  log.push("[D] block 3 (fontes) — OK, sem mudanças (já lista FipeZap/Quinto Andar/Secovi)")
}

// ─────────────────────────────────────────────────────────────────
// E. Block 6 — lista premium (remover Campina do Siqueira do rol top)
// ─────────────────────────────────────────────────────────────────
const PREMIUM_MARKER = "Bigorrilho, Juvevê, Ahú"
const idx6 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Bigorrilho, Campina do Siqueira, Juvevê")
)
if (idx6 >= 0 && !inlineToString(body[idx6].content).includes(PREMIUM_MARKER)) {
  // Substituir só "Bigorrilho, Campina do Siqueira, Juvevê, Ahú" → "Bigorrilho, Juvevê, Ahú"
  walkAndReplace(body[idx6], "Bigorrilho, Campina do Siqueira, Juvevê, Ahú", "Bigorrilho, Juvevê, Ahú")
  walkAndReplace(body[idx6], "os sete bairros que ultrapassaram", "os bairros que ultrapassaram")
  log.push("[E] block 6 — Campina do Siqueira removida da lista premium (movida pra região Barigui/Ecoville)")
} else if (idx6 >= 0) {
  log.push("[E] block 6 já corrigido — skip")
}

// ─────────────────────────────────────────────────────────────────
// F. Tabela 2 (ranking principal) — trocar #3 + adicionar nota abaixo
// ─────────────────────────────────────────────────────────────────
const idxTabela2 = body.findIndex(
  (bl, i) =>
    i === 2 &&
    bl.type === "table" &&
    (bl.content?.rows ?? []).some((r) =>
      r.cells.some((c) => inlineToString(c.content).includes("17.924"))
    )
)
if (idxTabela2 >= 0) {
  const rows = body[idxTabela2].content.rows
  const findRow = (substr) =>
    rows.findIndex((r) => r.cells.some((c) => inlineToString(c.content) === substr))
  const idxCampina = findRow("Campina do Siqueira")
  const idxMossungue = findRow("Mossunguê")

  // Já corrigido? checar se Campina do Siqueira ainda existe na #3
  const alreadyFixed = idxCampina === -1 || (idxCampina >= 0 && rows[idxCampina].cells[0] && inlineToString(rows[idxCampina].cells[0].content) !== "3")

  if (!alreadyFixed && idxCampina >= 0) {
    // Substituir #3 (Campina do Siqueira) pela região
    const row = rows[idxCampina]
    row.cells[1].content = [t("Região Barigui/Ecoville")]
    row.cells[2].content = [t("R$ 12.000–14.500")]
    row.cells[3].content = [t("variável")]
    row.cells[4].content = [t("Premium (regional)")]
    log.push("[F.1] tabela 2 — #3 substituído por 'Região Barigui/Ecoville (R$ 12.000–14.500)'")
  } else {
    log.push("[F.1] tabela 2 #3 já corrigido — skip")
  }

  // Remover Mossunguê de #22 (já está implícito na região)
  if (idxMossungue >= 0) {
    rows.splice(idxMossungue, 1)
    log.push("[F.2] tabela 2 — Mossunguê removido (incluído na região #3)")

    // Re-numerar posições subsequentes (todas após #21 caem 1 posição)
    for (let i = 0; i < rows.length; i++) {
      const posCell = rows[i].cells[0]
      if (!posCell) continue
      const txt = inlineToString(posCell.content).trim()
      const num = parseInt(txt, 10)
      if (!isNaN(num) && num > 22) {
        posCell.content = [t(String(num - 1))]
      }
    }
    log.push("[F.3] tabela 2 — posições > #22 re-numeradas")
  } else {
    log.push("[F.2] Mossunguê já removido — skip")
  }
} else {
  log.push("[F] !!! tabela 2 não encontrada")
}

// Inserir nota abaixo da tabela (block 3 já é a nota; vou ANEXAR uma frase)
const NOTA_GRANULARIDADE_MARKER = "FipeZap não publica granular por bairro"
const idx3Note = body.findIndex(
  (bl, i) =>
    i === 3 &&
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Preço médio Curitiba capital")
)
if (idx3Note >= 0 && !inlineToString(body[idx3Note].content).includes(NOTA_GRANULARIDADE_MARKER)) {
  body[idx3Note].content = [
    t("Preço médio Curitiba capital em março/2026: "),
    b("R$ 11.621/m²"),
    t(" (+6,26% em 12m). Fonte principal: "),
    link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap"),
    t(". Complementar: Quinto Andar Index, Zap Imóveis Index, Secovi-PR. "),
    t("O FipeZap não publica granular por bairro de forma padronizada — valores por bairro vêm de intermediárias (MySide, BemBrasil) que compilam o índice oficial com fontes complementares. Por isso a #3 do ranking aparece como faixa regional (Mossunguê / Campina do Siqueira / Campo Comprido).", { italic: true }),
  ]
  log.push("[F.4] block 3 (nota da tabela) — adicionado caveat de granularidade FipeZap")
}

// ─────────────────────────────────────────────────────────────────
// G + H. Block 10 (heading) + Block 11 (parágrafo) — Campina #3 → região
// ─────────────────────────────────────────────────────────────────
const HEADING_REGIAO_MARKER = "Região Barigui/Ecoville"
const idx10 = body.findIndex(
  (bl) =>
    bl.type === "heading" &&
    inlineToString(bl.content).includes("Campina do Siqueira") &&
    inlineToString(bl.content).includes("R$ 14.062")
)
if (idx10 >= 0 && !inlineToString(body[idx10].content).includes(HEADING_REGIAO_MARKER)) {
  body[idx10].content = [t("Região Barigui/Ecoville — Mossunguê, Campina do Siqueira e Campo Comprido")]
  // Block 11 (parágrafo seguinte) — reescrever
  if (body[idx10 + 1]?.type === "paragraph") {
    body[idx10 + 1].content = [
      t("A região entre Mossunguê, Campina do Siqueira e Campo Comprido ficou difícil de comparar bairro a bairro em 2026, porque as intermediárias do FipeZap agrupam parte do Ecoville expandido de formas diferentes. Em vez de cravar uma diferença falsa entre bairros vizinhos, a leitura mais segura é trabalhar com faixa: imóveis familiares e lançamentos na região aparecem entre "),
      b("R$ 12.000 e R$ 14.500/m²"),
      t(" em março/2026, com Campo Comprido mais barato no agregado oficial e Mossunguê puxando o topo da região. O motivo de fundo é o BRT Leste-Oeste — edital saiu em março, com obras previstas para começar até o fim do ano. Quem compra na região hoje pode ter ganho relevante de infraestrutura nos próximos 24 meses."),
    ]
    log.push("[G+H] block 10 (heading) + block 11 (parágrafo) — Campina #3 → Região Barigui/Ecoville")
  }
} else if (idx10 >= 0) {
  log.push("[G+H] block 10 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// J. Tabela 20 (top valorização) — Campina #5 → Região
// ─────────────────────────────────────────────────────────────────
const idxTabela20 = body.findIndex(
  (bl) =>
    bl.type === "table" &&
    (bl.content?.rows ?? []).some((r) =>
      r.cells.some((c) => inlineToString(c.content).includes("Escape de quem queria Batel"))
    )
)
if (idxTabela20 >= 0) {
  const rows = body[idxTabela20].content.rows
  for (const row of rows) {
    const bairro = inlineToString(row.cells[1]?.content ?? "").trim()
    if (bairro === "Campina do Siqueira") {
      row.cells[1].content = [t("Região Barigui/Ecoville")]
      row.cells[2].content = [t("+8,2% (aprox.)")]
      row.cells[3].content = [t("R$ 12.000–14.500")]
      row.cells[4].content = [t("BRT Leste-Oeste passa pela região; Mossunguê, Campina do Siqueira e Campo Comprido")]
      log.push("[J] tabela 20 (top valorização) — Campina do Siqueira #5 → Região Barigui/Ecoville")
      break
    }
  }
}

// ─────────────────────────────────────────────────────────────────
// K. Block 22 — CRM como autoridade
// ─────────────────────────────────────────────────────────────────
const CRM_MARKER = "imóveis no CIC acompanhados pela FYMOOB"
const idx22 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("clientes FYMOOB fecharem imóveis no CIC")
)
if (idx22 >= 0 && !inlineToString(body[idx22].content).includes(CRM_MARKER)) {
  body[idx22].content = [
    t("Entre os imóveis no CIC acompanhados pela FYMOOB em janeiro, a faixa de fechamento ficou em torno de R$ 8.000-8.500/m²; em abril, na mesma região, fechamentos próximos a R$ 9.000-9.500/m² apareceram — sinal de movimento que a tabela agregada (atualizada com defasagem mensal) ainda não capturou. Como sempre, observação interna de amostra reduzida — usar como sinal direcional, não como regra do bairro."),
  ]
  log.push("[K] block 22 (CRM CIC) — reformulado com caveat de amostra")
} else if (idx22 >= 0) {
  log.push("[K] block 22 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// M. Block 30 — Cascatinha SESP-PR
// ─────────────────────────────────────────────────────────────────
const CASCATINHA_MARKER = "indicador, não como garantia"
const idx30 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Cascatinha (R$ 8.940") &&
    inlineToString(bl.content).includes("Zero vítimas")
)
if (idx30 >= 0 && !inlineToString(body[idx30].content).includes(CASCATINHA_MARKER)) {
  body[idx30].content = [
    t("Cascatinha (R$ 8.940, +5,5%) virou \"Santa Felicidade alto padrão\" silenciosamente. Nicho de casa (não apartamento), R$ 900 mil a R$ 15 milhões. Na agregação consultada (SESP-PR / CAPE, jan-set/2025), não aparecem homicídios letais reportados para Cascatinha; como esse recorte por bairro não é publicado de forma padronizada pela SESP-PR, o dado deve ser lido como "),
    b("indicador, não como garantia"),
    t("."),
  ]
  log.push("[M] block 30 (Cascatinha) — caveat SESP-PR adicionado")
} else if (idx30 >= 0) {
  log.push("[M] block 30 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// N. Block 40 (tabela rentabilidade) — Batel + nota cabeçalho
// ─────────────────────────────────────────────────────────────────
// Manter ~2,0% mas atualizar nota subsequente (block 41) com explicação
const idx41 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Fonte aluguel: Secovi-PR")
)
const NOTA_RENT_MARKER = "agregado por m² subestima o yield real"
if (idx41 >= 0 && !inlineToString(body[idx41].content).includes(NOTA_RENT_MARKER)) {
  body[idx41].content = [
    t("Fonte: aluguel "),
    link("https://secovi-pr.com.br/", "Secovi-PR"),
    t(", relatório jul/2025; venda FipeZap mar/2026. Rentabilidade calculada como aluguel anual ÷ preço de venda, sem considerar vacância e custos de manutenção. "),
    t("Importante: o cálculo agregado por m² subestima o yield real em bairros premium — em unidades menores ou bem posicionadas para locação, Batel e Bigorrilho ficam em torno de 0,25% a 0,33% ao mês (cerca de 3% a 4% ao ano).", { italic: true }),
  ]
  log.push("[N] block 41 (nota tabela rentabilidade) — adicionada distinção agregado vs específico")
}

// ─────────────────────────────────────────────────────────────────
// R. Block 57 — Batel rentabilidade (dupla leitura)
// ─────────────────────────────────────────────────────────────────
const BATEL_DUPLA_MARKER = "agregado por m²"
const idx57 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Confundir") &&
    inlineToString(bl.content).includes("rentabilidade alta")
)
if (idx57 >= 0 && !inlineToString(body[idx57].content).includes(BATEL_DUPLA_MARKER)) {
  body[idx57].content = [
    t("Confundir \"aluguel caro\" com \"rentabilidade alta\". Batel tem aluguel nominal de R$ 29,90/m²/mês — alto em valor absoluto. Mas o preço de venda é tão alto que o "),
    b("rendimento agregado por m² fica perto de 2% ao ano"),
    t(". Em imóveis específicos (unidades menores, bem posicionadas para locação), a faixa premium costuma subir para "),
    b("0,25% a 0,33% ao mês (cerca de 3% a 4% ao ano)"),
    t(" — ainda abaixo da média de Curitiba (4,74% a.a., FipeZap mar/2026). Em ambos os casos, a conclusão é a mesma: Prado Velho, "),
    link("/imoveis/portao", "Portão"),
    t(" e "),
    link("/imoveis/centro", "Centro"),
    t(" rendem mais que qualquer bairro de alto padrão. Batel, Bigorrilho e Mossunguê são reserva de valor, não renda."),
  ]
  log.push("[R] block 57 (Batel rentabilidade) — dupla leitura: agregado ~2% + específico 0,25-0,33%/mês")
} else if (idx57 >= 0) {
  log.push("[R] block 57 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// V. Block 71 — intro tabela rentabilidade investidor
// ─────────────────────────────────────────────────────────────────
const RENT_INTRO_MARKER = "amostra reduzida acompanhada pela FYMOOB"
const idx71 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("rentabilidade de aluguel") &&
    inlineToString(bl.content).includes("agregados genéricos")
)
if (idx71 >= 0 && !inlineToString(body[idx71].content).includes(RENT_INTRO_MARKER)) {
  body[idx71].content = [
    t("A rentabilidade de aluguel (quanto o aluguel anual representa sobre o valor do imóvel) em Curitiba muda bastante por bairro. Os agregados genéricos (\"rende 0,5% a 0,7% ao mês\") escondem essa diferença. Abaixo, retorno medido em "),
    b("amostra reduzida acompanhada pela FYMOOB"),
    t(" — observação complementar, não índice oficial. Use como sinal direcional + triangular com Secovi-PR e FipeZap Locação antes de decidir."),
  ]
  log.push("[V] block 71 (intro rentabilidade investidor) — caveat de amostra reforçado")
} else if (idx71 >= 0) {
  log.push("[V] block 71 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// W. Block 73 — após tabela 72: nota CIC subamostra
// ─────────────────────────────────────────────────────────────────
const CIC_SUBAMOSTRA_MARKER = "subamostra de imóveis acompanhados"
const idx73 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Xaxim rendendo 13,4%")
)
if (idx73 >= 0 && !inlineToString(body[idx73].content).includes(CIC_SUBAMOSTRA_MARKER)) {
  body[idx73].content = [
    t("Leitura honesta: Xaxim rendendo 13,4% ao ano é caso fora da curva — amostra pequena, provavelmente puxada por estúdio mobiliado específico. Use como indicativo, não como regra do bairro. Cidade Industrial e Campo de Santana, rendendo 4% a 5% ao ano, são mais coerentes com a média da cidade. "),
    t("Importante: o valor de venda usado nesta tabela vem da subamostra de imóveis acompanhados pela FYMOOB para cálculo de rentabilidade — por isso difere do R$ 8.998/m² que aparece na tabela principal do CIC (FipeZap mar/2026).", { italic: true }),
  ]
  log.push("[W] block 73 — adicionada nota explicando diferença CIC R$ 6.477 (subamostra) vs R$ 8.998 (FipeZap)")
} else if (idx73 >= 0) {
  log.push("[W] block 73 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// X. Block 74 — faixa premium (dupla leitura)
// ─────────────────────────────────────────────────────────────────
const FAIXA_PREMIUM_MARKER = "depende do tipo de imóvel"
const idx74 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Pra bairros de alto preço") &&
    inlineToString(bl.content).includes("0,28% e 0,38%")
)
if (idx74 >= 0 && !inlineToString(body[idx74].content).includes(FAIXA_PREMIUM_MARKER)) {
  body[idx74].content = [
    t("Nos bairros de alto preço (Batel, Bigorrilho, Mossunguê, Água Verde), a rentabilidade depende do tipo de imóvel. No "),
    b("agregado por m²"),
    t(", o Batel fica perto de 2% ao ano, porque o preço de venda é muito alto. Em "),
    b("unidades menores ou bem posicionadas para locação"),
    t(", a faixa de alto padrão costuma ficar em torno de "),
    b("0,25% a 0,33% ao mês (cerca de 3% a 4% ao ano)"),
    t(" — ainda abaixo da média de Curitiba (4,74% a.a., FipeZap mar/2026). Em ambos os casos, a conclusão é a mesma: bairros de alto padrão são mais fortes como reserva de valor do que como renda mensal de aluguel."),
  ]
  log.push("[X] block 74 (faixa premium) — dupla leitura agregado vs específico")
} else if (idx74 >= 0) {
  log.push("[X] block 74 já tem marker novo — skip")
}

// ─────────────────────────────────────────────────────────────────
// S+T+U. FAQ — substituir Campina do Siqueira na ordem (block 61, 67)
// ─────────────────────────────────────────────────────────────────
const FAQ_61_MARKER = "Mossunguê / Campina do Siqueira / Campo Comprido"
const idx61 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("preço médio de R$ 17.924/m²") &&
    inlineToString(bl.content).includes("Campina do Siqueira (R$ 14.062)")
)
if (idx61 >= 0 && !inlineToString(body[idx61].content).includes(FAQ_61_MARKER)) {
  body[idx61].content = [
    t("O Batel, com preço médio de R$ 17.924/m² em março de 2026 ("),
    link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap"),
    t("). Seguido por Bigorrilho (R$ 14.117), região Barigui/Ecoville (Mossunguê / Campina do Siqueira / Campo Comprido — R$ 12.000-14.500), Juvevê (R$ 13.897) e Ahú (R$ 13.022)."),
  ]
  log.push("[S] FAQ bairro mais caro — região Barigui/Ecoville em vez de Campina")
}

const FAQ_67_MARKER = "Região Barigui/Ecoville (~+8,2%"
const idx67 = body.findIndex(
  (bl) =>
    bl.type === "paragraph" &&
    inlineToString(bl.content).includes("Campina do Siqueira (+8,2%)") &&
    inlineToString(bl.content).includes("+12,5%")
)
if (idx67 >= 0 && !inlineToString(body[idx67].content).includes(FAQ_67_MARKER)) {
  body[idx67].content = [
    t("O Ahú, com +12,5% entre março/2025 e março/2026 ("),
    link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap"),
    t("). Seguido por Juvevê (+11,5%), CIC (+10,2%), Bom Retiro (+9,1%) e Região Barigui/Ecoville (~+8,2% no agregado intermediário). Três desses cinco (CIC, Campo Comprido e parte da região Barigui/Ecoville) estão no traçado do BRT Leste-Oeste, com edital aberto em março/2026."),
  ]
  log.push("[U] FAQ valorização — região Barigui/Ecoville em vez de Campina")
}

// ─────────────────────────────────────────────────────────────────
// Y. methodologyBox
// ─────────────────────────────────────────────────────────────────
const NEW_SOURCES_MB = JSON.stringify([
  "FipeZap mar/2026 (FGV + Fipe + Zap) — preço m² agregado por capital + bairros representativos",
  "MySide / BemBrasil — recorte FipeZap por bairro (intermediárias)",
  "Quinto Andar Index — aluguel padronizado",
  "Secovi-PR — Pesquisa de Locação CWB jul/2025",
  "FipeZap Locação — rendimento agregado",
  "FYMOOB — observação complementar do estoque ativo (~242 imóveis em 66 bairros, snapshot abr/2026)",
])
const NEW_TREATMENT_MB =
  "FipeZap não publica granular por bairro de forma padronizada — valores por bairro vêm de intermediárias que compilam o índice oficial com fontes complementares. Variação 12 meses calculada do índice agregado por bairro publicado pelas intermediárias. Rentabilidade de aluguel calculada como aluguel anual ÷ preço de venda, sem considerar vacância, condomínio, IPTU, manutenção e corretagem. Bairros de alto padrão têm rendimento agregado por m² abaixo da média de Curitiba (4,74% a.a.) por concentração histórica; em unidades específicas, a faixa premium fica em torno de 0,25-0,33% ao mês (3-4% a.a.). CRM FYMOOB usado como observação complementar de campo, não índice estatístico."

const idxMethBox = body.findIndex((bl) => bl.type === "methodologyBox")
if (idxMethBox >= 0) {
  let touched = false
  if (body[idxMethBox].props.period !== "Março/2026 (FipeZap) + observação FYMOOB abril/2026") {
    body[idxMethBox].props.period = "Março/2026 (FipeZap) + observação FYMOOB abril/2026"
    touched = true
  }
  if (body[idxMethBox].props.sample !== "30 bairros + 1 região (Barigui/Ecoville agrupado pelas intermediárias FipeZap)") {
    body[idxMethBox].props.sample = "30 bairros + 1 região (Barigui/Ecoville agrupado pelas intermediárias FipeZap)"
    touched = true
  }
  if (body[idxMethBox].props.sources !== NEW_SOURCES_MB) {
    body[idxMethBox].props.sources = NEW_SOURCES_MB
    touched = true
  }
  if (body[idxMethBox].props.treatment !== NEW_TREATMENT_MB) {
    body[idxMethBox].props.treatment = NEW_TREATMENT_MB
    touched = true
  }
  if (body[idxMethBox].props.lastUpdate !== "2026-05-02") {
    body[idxMethBox].props.lastUpdate = "2026-05-02"
    touched = true
  }
  if (touched) log.push("[Y] methodologyBox — period/sample/sources/treatment atualizados")
  else log.push("[Y] methodologyBox já atualizado — skip")
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
log.push(`[Z] body: ${article.body.length} blocks → ${body.length} blocks`)
log.push(`[Z] novo word_count: ${wordCount}, reading_time_min: ${readingTimeMin}`)

// ─────────────────────────────────────────────────────────────────
console.log("=".repeat(72))
console.log("Preço do m² CWB — revisões")
console.log("=".repeat(72))
log.forEach((l) => console.log(l))
console.log("=".repeat(72))

if (DRY_RUN) {
  console.log("\n[DRY-RUN] sem persistência.")
  process.exit(0)
}

const update = { body, word_count: wordCount, reading_time_min: readingTimeMin }
if (descChanged) update.description = NEW_DESC
if (seoDescChanged) update.seo_meta_description = NEW_SEO_DESC

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
      const r = await fetch(`${baseUrl}/api/revalidate?path=${encodeURIComponent(target)}&secret=${cronSecret}`, { method: "POST" })
      console.log(`revalidate ${target}: ${r.status}`)
    } catch (e) {
      console.warn(`revalidate ${target} failed:`, e.message)
    }
  }
} else {
  console.log("(sem CRON_SECRET local — pular revalidate; ISR pega na próxima visita)")
}
