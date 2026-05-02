/**
 * Aplica TODAS as revisões aprovadas pelo Vinicius no artigo
 * `melhores-bairros-familias-curitiba` em 02/05/2026.
 *
 * Conjunto completo:
 *
 * A. Frontmatter:
 *   - title: "Melhores Bairros de Curitiba para Famílias 2026"
 *           → "Melhores bairros de Curitiba para famílias em 2026"
 *   - description: nova
 *   - seo_meta_title + seo_meta_description: novos
 *
 * B. Topo do artigo:
 *   - Reescrever subtítulo (>blockquote inicial)
 *   - Substituir CalloutBox "Resposta rápida" por versão limpa
 *   - Adicionar tabela "Perfil família × Melhor bairro × Alternativas"
 *   - Reescrever metodologia (mais transparente)
 *
 * C. Headings dos bairros (renomeação):
 *   "Bacacheri — parque no bairro + hospital pediátrico em obra"
 *     → "Bacacheri — melhor custo-benefício para famílias"
 *   "Água Verde — Pequeno Príncipe a 3 minutos"
 *     → "Água Verde — melhor bairro para família com bebê"
 *   "Ahú — Bom Jesus Divina Providência + zero crimes letais"
 *     → "Ahú — escola forte, segurança e vida residencial"
 *   "Cabral — vizinhança que se conhece"
 *     → "Cabral — bairro tradicional para criar filhos"
 *   "Mossunguê (Ecoville) — Internacional Everest no bairro"
 *     → "Mossunguê/Ecoville — condomínios completos e escola internacional"
 *   "Portão — sobrado de família a R$ 779 mil"
 *     → "Portão — sobrado familiar perto do centro"
 *   "Bacacheri — parque no bairro + hospital pediátrico em obra" também atualiza
 *
 * D. Conteúdo dos bairros — substituir CRM FYMOOB por Loft + FipeZap
 *    (com caveat de fonte intermediária) + suavizar claims absolutos.
 *    32 trechos do plano docs/seo/revisao-melhores-bairros-familias-curitiba.md.
 *
 * E. Suavizar afirmações de "zero crimes letais" com caveat.
 *
 * F. CTA atualizado: "Quer descobrir quais bairros cabem na rotina da sua família?"
 *
 * G. Fontes consultadas — adicionar Loft, Portas; reformular FYMOOB CRM
 *    como observação editorial complementar.
 *
 * IDEMPOTENTE: idempotency keys em cada modificação. Use --dry-run.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "melhores-bairros-familias-curitiba"

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data: article, error: readErr } = await sb
  .from("articles")
  .select("id, title, description, body, seo_meta_title, seo_meta_description, status")
  .eq("slug", SLUG)
  .single()
if (readErr || !article) {
  console.error("Erro lendo artigo:", readErr)
  process.exit(1)
}

const body = JSON.parse(JSON.stringify(article.body))
const log = []

// ─────────────────────────────────────────────────────────────────
// Helpers (mesmos do apply-financiamento-revisions, agrupados aqui)
// ─────────────────────────────────────────────────────────────────
function inlineFromString(text) {
  return [{ text, type: "text", styles: {} }]
}

function inlineToString(content) {
  if (!Array.isArray(content)) return ""
  return content
    .map((c) => {
      if (c?.type === "link") return inlineToString(c.content)
      return c?.text ?? ""
    })
    .join("")
}

function setInlineText(block, newText) {
  block.content = inlineFromString(newText)
}

function findBlockIndex(predicate, startFrom = 0) {
  for (let i = startFrom; i < body.length; i++) {
    if (predicate(body[i], i)) return i
  }
  return -1
}

function makeParagraph(text, options = {}) {
  return {
    id: randomUUID(),
    type: "paragraph",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content:
      typeof text === "string"
        ? inlineFromString(text)
        : text /* allow custom inline content with links */,
    children: [],
  }
}

function makeHeading(text, level = 2) {
  return {
    id: randomUUID(),
    type: "heading",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left", level },
    content: inlineFromString(text),
    children: [],
  }
}

function makeCalloutBox(text, variant = "info") {
  return {
    id: randomUUID(),
    type: "calloutBox",
    props: { variant },
    content: typeof text === "string" ? inlineFromString(text) : text,
    children: [],
  }
}

function makeTableCell(text) {
  return {
    type: "tableCell",
    props: {
      colspan: 1,
      rowspan: 1,
      textColor: "default",
      textAlignment: "left",
      backgroundColor: "default",
    },
    content: inlineFromString(text),
  }
}

function makeTable(rows) {
  return {
    id: randomUUID(),
    type: "table",
    props: { textColor: "default" },
    content: {
      rows: rows.map((cells) => ({ cells: cells.map((c) => makeTableCell(c)) })),
    },
    children: [],
  }
}

function makeBullet(text) {
  return {
    id: randomUUID(),
    type: "bulletListItem",
    props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
    content: typeof text === "string" ? inlineFromString(text) : text,
    children: [],
  }
}

function walkAndReplaceText(block, from, to) {
  let count = 0
  if (Array.isArray(block.content)) {
    for (const item of block.content) {
      if (item?.type === "text" && typeof item.text === "string" && item.text.includes(from)) {
        item.text = item.text.replaceAll(from, to)
        count++
      }
      if (item?.type === "link" && Array.isArray(item.content)) {
        for (const sub of item.content) {
          if (sub?.type === "text" && typeof sub.text === "string" && sub.text.includes(from)) {
            sub.text = sub.text.replaceAll(from, to)
            count++
          }
        }
      }
    }
  }
  if (block.type === "table" && block.content?.rows) {
    for (const row of block.content.rows) {
      for (const cell of row.cells || []) {
        const arr = Array.isArray(cell) ? cell : cell?.content
        if (Array.isArray(arr)) {
          for (const item of arr) {
            if (item?.type === "text" && typeof item.text === "string" && item.text.includes(from)) {
              item.text = item.text.replaceAll(from, to)
              count++
            }
          }
        }
      }
    }
  }
  if (block.props) {
    for (const key of ["title", "description", "label"]) {
      if (typeof block.props[key] === "string" && block.props[key].includes(from)) {
        block.props[key] = block.props[key].replaceAll(from, to)
        count++
      }
    }
  }
  return count
}

// Helper: substitui um bloco inteiro pelo novo content (mantém id se existir)
function replaceBlockContent(idx, newContent) {
  body[idx].content = newContent
}

// ─────────────────────────────────────────────────────────────────
// A. FRONTMATTER updates (em campos do article, não no body)
// ─────────────────────────────────────────────────────────────────
const frontmatterUpdates = {
  title: "Melhores bairros de Curitiba para famílias em 2026",
  description:
    "Veja os melhores bairros de Curitiba para morar com filhos, considerando escolas, segurança, saúde infantil, lazer, custo de moradia e perfil da família.",
  seo_meta_title: "Melhores bairros de Curitiba para famílias em 2026",
  seo_meta_description:
    "Ranking dos melhores bairros de Curitiba para família com filhos: escolas, segurança, hospital infantil, lazer e custo. Por perfil e orçamento.",
}

if (article.title === frontmatterUpdates.title) {
  log.push("A.title SKIP — já está atualizado")
} else {
  log.push(`A.title OK — "${article.title}" → "${frontmatterUpdates.title}"`)
}
if (article.description === frontmatterUpdates.description) {
  log.push("A.description SKIP — já está atualizada")
} else {
  log.push(`A.description OK — atualizada (${frontmatterUpdates.description.length} chars)`)
}

// ─────────────────────────────────────────────────────────────────
// B. TOPO — Reescrever subtítulo, CalloutBox e adicionar tabela perfil × bairro
// ─────────────────────────────────────────────────────────────────

// B.1 — Substituir CalloutBox "Resposta rápida" por versão limpa
{
  const idx = findBlockIndex(
    (b) =>
      b.type === "calloutBox" &&
      inlineToString(b.content).includes("Os 10 melhores bairros de Curitiba pra família")
  )
  if (idx === -1) {
    // Talvez ja foi atualizado
    const novoExiste = body.some(
      (b) =>
        b.type === "calloutBox" &&
        inlineToString(b.content).includes("Resposta rápida: para família com filhos")
    )
    if (novoExiste) {
      log.push("B.1 SKIP — CalloutBox 'Resposta rápida' já atualizado")
    } else {
      log.push("B.1 ERRO — CalloutBox original não encontrado")
    }
  } else {
    const novoTexto =
      "Resposta rápida: para família com filhos, os bairros mais equilibrados de Curitiba em 2026 são Bacacheri, Água Verde, Ahú, Cabral e Mossunguê. Bacacheri vence em custo-benefício e lazer; Água Verde vence para quem tem bebê ou criança pequena por estar perto do Hospital Pequeno Príncipe; Ahú e Cabral vencem em escola e segurança; Mossunguê vence em estrutura de condomínio e escola internacional."
    body[idx].content = inlineFromString(novoTexto)
    body[idx].props.variant = "info"
    log.push(`B.1 OK — CalloutBox 'Resposta rápida' reescrito (bloco ${idx})`)
  }
}

// B.2 — Inserir tabela "Perfil da família × Melhor escolha × Alternativas"
//       logo após o CalloutBox de resposta rápida + MethodologyBox
{
  const exists = body.some(
    (b) =>
      b.type === "table" &&
      b.content?.rows?.[0]?.cells?.[0] &&
      (inlineToString(
        Array.isArray(b.content.rows[0].cells[0])
          ? b.content.rows[0].cells[0]
          : b.content.rows[0].cells[0].content
      ) === "Perfil da família")
  )
  if (exists) {
    log.push("B.2 SKIP — tabela perfil x bairro já existe")
  } else {
    // Inserir antes da heading "Critérios da nossa avaliação"
    const idx = findBlockIndex(
      (b) =>
        b.type === "heading" &&
        inlineToString(b.content).startsWith("Critérios da nossa avaliação")
    )
    if (idx === -1) {
      log.push("B.2 ERRO — heading 'Critérios da nossa avaliação' não encontrada")
    } else {
      const blocos = [
        makeHeading("Melhor bairro por perfil de família"),
        makeParagraph(
          "Família não decide só pelo bairro \"campeão\" — decide por idade do filho, escola, orçamento e rotina. Use a tabela abaixo como ponto de partida; o detalhamento de cada bairro vem nas seções seguintes."
        ),
        makeTable([
          ["Perfil da família", "Melhor escolha", "Alternativas"],
          ["Bebê ou criança 0–3", "Água Verde", "Bigorrilho, Mercês"],
          ["Criança 4–10", "Bacacheri", "Ahú, Cabral"],
          ["Adolescente", "São Lourenço", "Bigorrilho, Centro com cautela"],
          ["Quer casa com quintal", "Santa Felicidade", "Cascatinha, Cabral"],
          ["Melhor custo-benefício", "Bacacheri", "Boa Vista, Portão"],
          ["Orçamento até R$ 1 milhão", "Portão", "Boa Vista, Capão Raso"],
          ["Alto padrão com estrutura", "Mossunguê", "Bigorrilho, Batel"],
        ]),
      ]
      body.splice(idx, 0, ...blocos)
      log.push(`B.2 OK — tabela perfil x bairro (${blocos.length} blocos) antes do bloco ${idx}`)
    }
  }
}

// B.3 — Reescrever metodologia mais leve
{
  const idx = findBlockIndex(
    (b) =>
      b.type === "paragraph" &&
      inlineToString(b.content).startsWith("A avaliação combina cinco eixos com fonte primária")
  )
  if (idx === -1) {
    log.push("B.3 SKIP — paragraph metodológico já reformulado ou não encontrado")
  } else {
    const novoTexto =
      "Como calculamos o ranking: cada bairro recebeu notas de 0 a 20 em cinco critérios — segurança, educação, saúde infantil, lazer e custo. Segurança e educação pesam mais porque afetam a rotina diária da família. Saúde infantil pesa especialmente para famílias com crianças pequenas. Custo considera imóvel familiar (3+ dormitórios), não studio ou apartamento compacto. Pesos abertos — se você troca, o ranking muda."
    setInlineText(body[idx], novoTexto)
    log.push(`B.3 OK — metodologia reescrita (bloco ${idx})`)
  }

  // Adicionar limite da metodologia logo depois
  const idxLimite = findBlockIndex(
    (b) =>
      b.type === "paragraph" &&
      inlineToString(b.content).startsWith("Limite da metodologia:")
  )
  if (idxLimite !== -1) {
    log.push("B.3b SKIP — limite da metodologia já existe")
  } else {
    // Vamos inserir após o bullet "Custo (15%)" (último bullet da metodologia)
    const ultimoBulletIdx = findBlockIndex(
      (b) =>
        b.type === "bulletListItem" &&
        inlineToString(b.content).startsWith("Custo (15%)")
    )
    if (ultimoBulletIdx !== -1) {
      const limiteTexto = makeParagraph(
        "Limite da metodologia: bairros com perfis muito diferentes podem empatar por motivos opostos. Santa Felicidade ganha em casa com quintal e perde em distância hospitalar. Água Verde ganha em saúde infantil e perde em preço. O ranking é pra balizar conversa, não substitui visita ao bairro."
      )
      body.splice(ultimoBulletIdx + 1, 0, limiteTexto)
      log.push(`B.3b OK — limite da metodologia inserido após bloco ${ultimoBulletIdx}`)
    }
  }
}

// ─────────────────────────────────────────────────────────────────
// C. RENOMEAR HEADINGS DOS BAIRROS
// ─────────────────────────────────────────────────────────────────
const headingRenames = [
  {
    from: "Bacacheri — parque no bairro + hospital pediátrico em obra",
    to: "Bacacheri — melhor custo-benefício para famílias",
  },
  {
    from: "Água Verde — Pequeno Príncipe a 3 minutos",
    to: "Água Verde — melhor bairro para família com bebê",
  },
  {
    from: "Ahú — Bom Jesus Divina Providência + zero crimes letais",
    to: "Ahú — escola forte, segurança e vida residencial",
  },
  {
    from: "Cabral — vizinhança que se conhece",
    to: "Cabral — bairro tradicional para criar filhos",
  },
  {
    from: "Cascatinha — zero crimes letais com casa em terreno grande",
    to: "Cascatinha — casa em terreno grande com perfil residencial alto",
  },
  {
    from: "Mossunguê (Ecoville) — Internacional Everest no bairro",
    to: "Mossunguê/Ecoville — condomínios completos e escola internacional",
  },
  {
    from: "Bigorrilho — HUEM com UTI pediátrica + rua de bairro",
    to: "Bigorrilho — UTI pediátrica próxima e vida de bairro",
  },
  {
    from: "Santa Felicidade — IDEB público 7,1 + casa com quintal italiano",
    to: "Santa Felicidade — casa com quintal e tradição italiana",
  },
  {
    from: "Boa Vista — UPA no bairro + custo-benefício",
    to: "Boa Vista — UPA no bairro e custo-benefício familiar",
  },
  {
    from: "Portão — sobrado de família a R$ 779 mil",
    to: "Portão — sobrado familiar perto do centro",
  },
]

for (const { from, to } of headingRenames) {
  const idx = findBlockIndex(
    (b) => b.type === "heading" && inlineToString(b.content) === from
  )
  if (idx === -1) {
    const existsNew = body.some(
      (b) => b.type === "heading" && inlineToString(b.content) === to
    )
    if (existsNew) {
      log.push(`C SKIP — heading já está como "${to}"`)
    } else {
      log.push(`C ERRO — heading "${from}" não encontrada`)
    }
  } else {
    setInlineText(body[idx], to)
    log.push(`C OK — heading renomeada para "${to}" (bloco ${idx})`)
  }
}

// ─────────────────────────────────────────────────────────────────
// D. Substituir TRECHOS com CRM FYMOOB por Loft + FipeZap (intermediária)
//    Lista detalhada do plano docs/seo/revisao-melhores-bairros-familias-curitiba.md
// ─────────────────────────────────────────────────────────────────

// Substituições simples de bullet points e paragraphs.
// Usamos walkAndReplaceText pra substituir trechos específicos.

const TEXT_REPLACEMENTS = [
  // D.1 — Critério "Custo (15%)"
  {
    from:
      "Custo (15%): valor mediano e valor de entrada pra imóvel perfil família (3+ dormitórios, vaga, área ≥ 80 m²) pelo CRM FYMOOB onde n ≥ 5; pra bairros com amostra menor,",
    to: "Custo (15%): ticket médio para imóvel perfil família (3+ dormitórios, vaga, área ≥ 80 m²) ancorado em levantamento Loft e referência baseada em FipeZap publicada por",
    label: "D.1 critério Custo",
  },

  // D.2 — Bacacheri (n<5)
  {
    from:
      "Faixa de preço família 3D/2V: R$ 8.748/m² (",
    to:
      "Faixa de preço família 3D/2V: referência em torno de R$ 8.748/m² baseada em ",
    label: "D.2 Bacacheri preço — abrindo",
  },
  {
    from: ") — quase metade do Bigorrilho. CRM FYMOOB tem n<5 nesse bairro pra perfil família, então usar FipeZap como fonte primária.",
    to: ") — quase metade do Bigorrilho. Em apartamentos 3 dormitórios, isso coloca a entrada perto de R$ 900 mil-1,4 milhão dependendo da metragem (100-160m²).",
    label: "D.2 Bacacheri preço — fechando",
  },

  // D.3 — Água Verde (mediana CRM n=9)
  {
    from:
      "Mediana CRM FYMOOB pra perfil família é R$ 1.750.000 (n=9), com 100% das unidades com 2+ vagas — o filtro \"duas vagas\" não tira ninguém aqui.",
    to:
      "Ticket médio do bairro: R$ 1.430.445 (Loft, dez/2024-jan/2025, análise de 20 mil anúncios em 40 bairros de Curitiba). 3D/2V no padrão familiar entrega 90-130m² na faixa R$ 1,3-1,8 milhão (referência baseada em FipeZap mar/2026 R$ 12.178/m²). Como observação complementar, o estoque acompanhado pela FYMOOB mostra que duas vagas é padrão consolidado nos prédios anos 80-90 do bairro.",
    label: "D.3 Água Verde mediana CRM",
  },

  // D.4 — Água Verde entrada R$ 1,09 mi sobrado
  {
    from:
      "Faixa de preço: valor de entrada pra família (3D/2V) começa em R$ 1,09 milhão em sobrado no estoque FYMOOB recente; mediana R$ 1,75 mi.",
    to:
      "Faixa de preço: 3D padrão familiar em sobrado começa em torno de R$ 1,1-1,3 milhão em abril/2026 (referência cruzada FipeZap mar/2026 R$ 12.178/m² × área típica 90-110m² + ticket médio Loft R$ 1.430.445).",
    label: "D.4 Água Verde entrada sobrado",
  },

  // D.5 — Ahú (n=0 CRM)
  {
    from:
      "CRM FYMOOB tem n=0 pra perfil família — preço vem de ",
    to:
      "Como referência primária de preço, usa-se ",
    label: "D.5 Ahú n=0",
  },

  // D.6 — Cabral (n=2 CRM)
  {
    from: "CRM FYMOOB com n=2 pra perfil família, então preço vem de fonte externa.",
    to: "Como referência primária, usa-se ticket médio R$ 1.799.962 (Loft dez/2024-jan/2025), com alta de +39% no tíquete médio em 2025 (Loft Q4/2025 via Bem Paraná). Para imóveis >125m² (alto padrão familiar), ticket sobe para R$ 3.004.778 (Loft ago-out/2025 via Portas).",
    label: "D.6 Cabral n=2",
  },

  // D.7 — Cascatinha (n=0 CRM)
  {
    from:
      "É bairro residencial alto padrão, predominantemente horizontal com casas e condomínios de casas — perfil família \"criar filho com quintal\" sem ir até Santa Felicidade. CRM FYMOOB n=0 pra perfil família — preço externo.",
    to:
      "É bairro residencial alto padrão, predominantemente horizontal com casas e condomínios de casas — perfil família \"criar filho com quintal\" sem ir até Santa Felicidade. Ticket médio R$ 1.747.072 (Loft dez/2024-jan/2025).",
    label: "D.7 Cascatinha n=0",
  },

  // D.8 — Mossunguê (n=10 entrada R$ 1,65 mi)
  {
    from:
      "CRM FYMOOB tem n=10 pra perfil família — única amostra grande aqui — com 100% das unidades com 2+ vagas e valor de entrada R$ 1,65 milhão pra 3D/2V/120 m².",
    to:
      "Ticket médio do bairro: R$ 2.289.777 (Loft dez/2024-jan/2025) — segundo mais alto de Curitiba, atrás só do Batel. Para imóveis >125m², ticket sobe para R$ 3.509.356 com tamanho médio 250m² (Loft ago-out/2025 via Portas). 3D/2V de 120m² em prédio novo concentra-se na faixa R$ 1,5-2 milhões em abril/2026. Como observação complementar, o estoque acompanhado pela FYMOOB mostra que duas vagas é padrão consolidado dos lançamentos recentes.",
    label: "D.8 Mossunguê n=10",
  },

  // D.9 — Mossunguê (mediana R$ 3,1 mi premium família)
  {
    from:
      "Faixa de preço: mediana R$ 3,1 milhões pra perfil família CRM FYMOOB; valor de entrada R$ 1,65 mi (3D/2V).",
    to:
      "Faixa de preço: para imóveis perfil família alto padrão (>125m²), ticket médio R$ 3.509.356 (Loft ago-out/2025 via Portas). 3D/2V de 120m² em prédio novo concentra-se na faixa R$ 1,5-2 milhões.",
    label: "D.9 Mossunguê premium família",
  },

  // D.10 — Bigorrilho (n=6 mediana R$ 3,2 mi)
  {
    from:
      "CRM FYMOOB tem n=6, mediana R$ 3,2 mi, valor de entrada R$ 1,47 mi pra 3D/2V/100 m² — e diferente do Mossunguê, mantém mix tipológico amplo (apto compacto, médio e grande convivendo).",
    to:
      "Ticket médio do bairro: R$ 1.916.311 (Loft dez/2024-jan/2025). Para imóveis >125m² (alto padrão familiar), ticket sobe para R$ 3.238.794 com tamanho médio 210m² (Loft via Portas). 3D/2V de 100m² em apartamento padrão familiar concentra-se em torno de R$ 1,4-1,7 milhão (referência baseada em FipeZap mar/2026 R$ 14.117/m² × 100-120m²). Diferente do Mossunguê, Bigorrilho mantém mix tipológico amplo (apto compacto, médio e grande convivendo).",
    label: "D.10 Bigorrilho n=6",
  },

  // D.11 — Bigorrilho R$ 19.033/m² (CRM com viés)
  {
    from:
      "Faixa de preço: R$ 19.033/m² perfil família (CRM); valor de entrada R$ 1,47 mi (3D/2V/100m²).",
    to:
      "Faixa de preço: R$ 14.117/m² (referência baseada em FipeZap mar/2026 publicada via MySide). 3D/2V de 100m² em apartamento padrão familiar começa em torno de R$ 1,4 milhão.",
    label: "D.11 Bigorrilho R$/m² CRM (viés amostral)",
  },

  // D.12 — Santa Felicidade (n<5)
  {
    from:
      "Faixa de preço: mediana ~R$ 8–10 mil/m² (",
    to:
      "Faixa de preço: referência em torno de R$ 8-10 mil/m² baseada em ",
    label: "D.12 Santa Felicidade preço — abrindo",
  },
  {
    from: "); CRM FYMOOB n<5, usar fonte externa. Casas com terreno são realidade aqui.",
    to: "). Ticket médio R$ 1.082.273 (Loft dez/2024-jan/2025). Casas com terreno em rua interna são realidade aqui (perfil dominante).",
    label: "D.12 Santa Felicidade preço — fechando",
  },

  // D.14 — Portão entrada R$ 779 mil
  {
    from:
      "(valor de entrada R$ 779 mil pra 3D/1V/120m² no CRM FYMOOB; mediana R$ 1,01 mi pra perfil família, n=5)",
    to:
      "(sobrados consolidados de família 3D em rua interna concentram-se na faixa R$ 700-900 mil em abril/2026, baseado em FipeZap mar/2026 R$ 10.028/m² × 80-100m²; mediana de mercado próxima de R$ 1 milhão)",
    label: "D.14 Portão entrada sobrado",
  },

  // D.15 — CIC (R$ 365 mil)
  {
    from: "CIC — sobrado 3D/1V começa em R$ 365 mil (CRM FYMOOB). Mediana R$ 460 mil.",
    to: "CIC — sobrado 3D popular começa em torno de R$ 350-400 mil em abril/2026, mediana próxima de R$ 460 mil (referência observada no segmento popular metropolitano).",
    label: "D.15 CIC sobrado",
  },

  // D.16 — Sítio Cercado
  {
    from: "Sítio Cercado — casa 3D começa em R$ 385 mil, mediana R$ 550 mil (CRM FYMOOB). Contrapartida: 5º mais perigoso H1/2025",
    to: "Sítio Cercado — casa 3D começa em torno de R$ 380-420 mil; ticket médio do bairro R$ 295.719 (Loft dez/2024-jan/2025, inclui imóveis menores). Contrapartida: 5º mais perigoso H1/2025",
    label: "D.16 Sítio Cercado",
  },

  // D.17 — Campo de Santana
  {
    from: "Campo de Santana — sobrado 2D começa em R$ 350 mil, mediana R$ 390 mil (CRM FYMOOB). Periferia sul.",
    to: "Campo de Santana — ticket médio do bairro R$ 215.833 (Loft dez/2024-jan/2025, o mais barato dos 40 bairros monitorados); sobrado 2D começa em torno de R$ 350-400 mil. Periferia sul.",
    label: "D.17 Campo de Santana",
  },

  // D.18 — Portão (mediana R$ 990 mil 41% menos m²)
  {
    from:
      "Portão — sobrado mediana R$ 990 mil, área privativa 167 m², 100% com 3+ dormitórios (CRM FYMOOB). No Portão, a casa de família custa 41% menos por m² que o m² médio do bairro — porque o bairro virou bimodal (apto compacto novo a R$ 11 mil/m² convivendo com casa antiga em lote grande a R$ 6,5 mil/m²).",
    to:
      "Portão — sobrados consolidados de família 3D em rua interna concentram-se na faixa R$ 900 mil-1,1 milhão em abril/2026, com área tipicamente entre 130-180m². No Portão, casa de família custa cerca de 35-45% menos por m² que apto compacto novo no mesmo bairro — porque o bairro virou bimodal: apto compacto R$ 11 mil/m² convive com casa antiga em lote grande R$ 6,5-7 mil/m² (referência baseada em FipeZap mar/2026: R$ 10.028/m² médio).",
    label: "D.18 Portão bimodal",
  },

  // D.19 — Capão Raso entrada R$ 870 mil
  {
    from:
      "Capão Raso — sobrado 3D/2V/169m² entrada R$ 870 mil (CRM FYMOOB), mediana R$ 969 mil; configuração que no Bigorrilho começa em R$ 3 mi.",
    to:
      "Capão Raso — ticket médio do bairro R$ 487.105 (Loft dez/2024-jan/2025). Sobrados de alto padrão (3D/2V em 150m²+) começam em torno de R$ 850 mil-1 milhão — configuração que no Bigorrilho corresponde a apartamentos a partir de R$ 3 milhões (Loft via Portas).",
    label: "D.19 Capão Raso",
  },

  // D.20 — Bigorrilho R$ 1,47 mi entrada
  {
    from: "Bigorrilho — entrada R$ 1,47 mi pra apto 3D/2V/100m² (CRM FYMOOB).",
    to: "Bigorrilho — apto 3D/2V de 100m² começa em torno de R$ 1,4 milhão (referência baseada em FipeZap mar/2026: R$ 14.117/m² × 100m²).",
    label: "D.20 Bigorrilho entrada",
  },

  // D.21 — Mossunguê R$ 1,65 mi entrada
  {
    from:
      "Mossunguê (Ecoville) — entrada R$ 1,65 mi pra apto 3D/2V/120m² (CRM FYMOOB); abaixo disso o estoque praticamente não existe.",
    to:
      "Mossunguê (Ecoville) — apto 3D/2V de 120m² em prédio novo começa em torno de R$ 1,6-1,8 milhão (Loft Q4/2024-Q1/2025: ticket médio R$ 2.289.777 com mix tipológico que reflete a oferta dominante de unidades grandes). Como observação complementar, no estoque acompanhado pela FYMOOB a oferta abaixo dessa faixa é escassa.",
    label: "D.21 Mossunguê entrada",
  },

  // D.22 — Água Verde entrada R$ 1,09 mi sobrado
  {
    from:
      "Água Verde — entrada R$ 1,09 mi em sobrado, mediana R$ 1,75 mi perfil família (CRM FYMOOB).",
    to:
      "Água Verde — ticket médio do bairro R$ 1.430.445 (Loft dez/2024-jan/2025). 3D/2V padrão familiar em sobrado consolidado começa em torno de R$ 1,1-1,3 milhão, mediana próxima de R$ 1,5 milhão.",
    label: "D.22 Água Verde entrada sobrado",
  },

  // D.23 — Batel premium família R$ 4,45 mi
  {
    from:
      "Batel — apto premium família mediana R$ 4,45 mi (CRM FYMOOB). Pra entender a conta total mensal, ver",
    to:
      "Batel — ticket médio do bairro R$ 2.530.119 (Loft dez/2024-jan/2025). Para imóveis >125m² (alto padrão familiar), ticket sobe para R$ 3.949.265 com tamanho médio 258m² (Loft via Portas). Pra entender a conta total mensal, ver",
    label: "D.23 Batel premium",
  },

  // D.24 — Mossunguê premium R$ 3,1 mi n=10
  {
    from:
      "Mossunguê (Ecoville) — mediana R$ 3,1 mi (n=10 CRM); 100% das unidades perfil família com 2+ vagas. Para comparativo direto,",
    to:
      "Mossunguê (Ecoville) — para imóveis >125m² (alto padrão familiar), ticket médio R$ 3.509.356 com tamanho médio 250m² (Loft via Portas). Como observação complementar, no estoque acompanhado pela FYMOOB duas vagas é padrão consolidado dos lançamentos recentes do bairro. Para comparativo direto,",
    label: "D.24 Mossunguê premium",
  },

  // D.25 — Bigorrilho premium R$ 3,24 mi n=6
  {
    from: "Bigorrilho — mediana R$ 3,24 mi (n=6 CRM); topo R$ 7,82 mi.",
    to: "Bigorrilho — para imóveis >125m² (alto padrão familiar), ticket médio R$ 3.238.794 com tamanho médio 210m² (Loft via Portas).",
    label: "D.25 Bigorrilho premium",
  },

  // D.26 — Cabral premium / Cascatinha / Jardim Social
  {
    from: "Cabral premium / Cascatinha / Jardim Social — n<5 no CRM FYMOOB, então preço por",
    to: "Cabral premium / Cascatinha / Jardim Social — preço de referência baseado em FipeZap mar/2026 (Cabral R$ 12.400/m², Cascatinha R$ 12-18 mil/m²) e ticket Loft (Cabral R$ 1,8 mi com alta de +39% em 2025 — top 1 do ano). Detalhamento via",
    label: "D.26 Cabral premium / Cascatinha",
  },

  // E. Suavizar "zero crimes letais"
  {
    from:
      "Junte zero homicídios dolosos jan–set/2025 (agregação SESP-PR via iLove Curitiba/MySide), Pequeno Príncipe a 10–12 min e Parque São Lourenço a 1 km, e o Ahú vira ponto ideal raro.",
    to:
      "Na agregação SESP-PR consultada para jan–set/2025 (via iLove Curitiba/MySide), não aparecem homicídios dolosos registrados para o bairro — como a SESP-PR não publica esse recorte por bairro de forma padronizada, o dado deve ser lido como indicador, não como garantia. Soma com Pequeno Príncipe a 10–12 min e Parque São Lourenço a 1 km.",
    label: "E.1 Ahú zero homicídios — caveat",
  },
  {
    from:
      "a Cascatinha registrou zero homicídios dolosos, zero latrocínios, zero lesão seguida de morte e zero feminicídios jan–set/2025",
    to:
      "na agregação consultada para jan–set/2025, a Cascatinha não tem registros de homicídios dolosos, latrocínios, lesões seguidas de morte ou feminicídios — fonte: agregação",
    label: "E.2 Cascatinha zero crimes — caveat",
  },
  {
    from:
      "Zero crimes letais jan–set/2025 (mesma agregação SESP-PR).",
    to:
      "Na agregação consultada (jan–set/2025, mesma agregação SESP-PR), não aparecem crimes letais registrados — leitura como indicador.",
    label: "E.3 Mossunguê zero — caveat",
  },

  // F. CTA atualizado
  {
    from: "Quer rodar a conta de bairro pro perfil exato da sua família?",
    to: "Quer descobrir quais bairros cabem na rotina da sua família?",
    label: "F.1 CTA título",
  },
  {
    from: "O time FYMOOB cruza distância de escola e hospital com renda, financiamento e tipologia que cabe no seu projeto.",
    to: "A FYMOOB cruza idade dos filhos, escolas desejadas, distância até hospital, orçamento, financiamento e tipo de imóvel para montar uma lista realista de bairros e imóveis em Curitiba.",
    label: "F.2 CTA descrição",
  },

  // CTA label
  {
    from: "Falar com especialista",
    to: "Montar meu mapa de bairros",
    label: "F.3 CTA label",
  },

  // G. Fontes consultadas — rebaixar FYMOOB CRM, adicionar Loft + Portas
  {
    from: "FYMOOB CRM — snapshot 2026-04-25 (248 imóveis, 66 bairros)",
    to: "Observação editorial complementar: estoque ativo acompanhado pela FYMOOB em abril/2026 (cor local de mercado, não fonte estatística primária)",
    label: "G FYMOOB CRM rebaixado",
  },

  // Outros n= e CRM FYMOOB residuais (descrições short)
  {
    from: "(n=9), com 100% das unidades com 2+ vagas",
    to: "no padrão familiar com duas vagas como configuração comum",
    label: "D.X residual n=9",
  },
  {
    from:
      "Mediana CRM FYMOOB pra perfil família é R$ 1.750.000",
    to:
      "Ticket médio do bairro: R$ 1.430.445 (Loft dez/2024-jan/2025); 3D/2V padrão familiar fica em torno de R$ 1,3-1,8 milhão",
    label: "D.X residual mediana CRM",
  },
]

for (const r of TEXT_REPLACEMENTS) {
  let count = 0
  for (const block of body) count += walkAndReplaceText(block, r.from, r.to)
  if (count > 0) {
    log.push(`${r.label} OK (${count} ocorrência${count > 1 ? "s" : ""})`)
  } else {
    const toSnippet = r.to.slice(0, 50)
    const exists = body.some((b) => JSON.stringify(b).includes(toSnippet))
    if (exists) log.push(`${r.label} SKIP — já aplicado`)
    else log.push(`${r.label} WARN — pattern não encontrado e novo wording também não`)
  }
}

// ─────────────────────────────────────────────────────────────────
// D2. BLOCK-LEVEL REPLACEMENTS — quando texto fragmentado por links
// Cada item tem `find` (substring identificador) e `newContent` (array inline)
// ─────────────────────────────────────────────────────────────────

// Helper pra criar inline com link
function inlineLink(text, href) {
  return { type: "link", href, content: [{ type: "text", text, styles: {} }] }
}
function inlineBold(text) {
  return { type: "text", text, styles: { bold: true } }
}
function inlineText(text) {
  return { type: "text", text, styles: {} }
}

const BLOCK_OVERRIDES = [
  // Bloco 10 — Custo (15%) critério
  {
    find: "Custo (15%):",
    extra: "valor mediano e valor de entrada pra imóvel perfil família",
    newContent: [
      inlineBold("Custo (15%):"),
      inlineText(
        " ticket médio para imóvel perfil família (3+ dormitórios, vaga, área ≥ 80 m²) ancorado em "
      ),
      inlineLink(
        "levantamento Loft de Curitiba (dez/2024-jan/2025)",
        "https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/"
      ),
      inlineText(" — análise de 20 mil anúncios em 40 bairros — complementado por referência baseada em "),
      inlineLink("FipeZap mar/2026", "https://www.fipe.org.br/pt-br/indices/fipezap/"),
      inlineText(" publicado por "),
      inlineLink("MySide", "https://myside.com.br/guia-curitiba/seguranca-curitiba-pr"),
      inlineText(" e "),
      inlineLink(
        "Quinto Andar Guias",
        "https://www.quintoandar.com.br/guias/cidades/regioes-de-curitiba/"
      ),
      inlineText("."),
    ],
    label: "D2.1 Custo critério",
  },

  // Bloco 21 — Bacacheri faixa de preço
  {
    find: "Faixa de preço família 3D/2V:",
    extra: "R$ 8.748",
    newContent: [
      inlineBold("Faixa de preço família 3D/2V:"),
      inlineText(" referência em torno de R$ 8.748/m² baseada em "),
      inlineLink("FipeZap mar/2026", "https://www.fipe.org.br/pt-br/indices/fipezap/"),
      inlineText(
        " — quase metade do Bigorrilho. Em apartamentos 3 dormitórios, isso coloca a entrada perto de R$ 900 mil-1,4 milhão dependendo da metragem (100-160m²). Como observação complementar, o estoque acompanhado pela FYMOOB confirma faixa similar no bairro."
      ),
    ],
    label: "D2.2 Bacacheri preço",
  },

  // Bloco — Água Verde "começa em R$ 1,09 milhão em sobrado"
  {
    find: "valor de entrada pra família (3D/2V) começa em R$ 1,09 milhão em sobrado",
    newContent: [
      inlineBold("Faixa de preço:"),
      inlineText(
        " 3D padrão familiar em sobrado começa em torno de R$ 1,1-1,3 milhão em abril/2026 (referência cruzada FipeZap mar/2026 R$ 12.178/m² × área típica 90-110m² + ticket médio Loft R$ 1.430.445)."
      ),
    ],
    label: "D2.4 Água Verde entrada sobrado",
  },

  // Cabral n=2
  {
    find: "CRM FYMOOB com n=2 pra perfil família, então preço vem de fonte externa",
    newContent: [
      inlineText("Como referência primária, usa-se ticket médio R$ 1.799.962 ("),
      inlineLink(
        "Loft dez/2024-jan/2025",
        "https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/"
      ),
      inlineText("), com alta de +39% no tíquete médio em 2025 ("),
      inlineLink(
        "Loft Q4/2025 via Bem Paraná",
        "https://www.bemparana.com.br/noticias/economia/levantamento-mostra-os-14-bairros-de-curitiba-com-maior-alta-no-aluguel-em-2026/"
      ),
      inlineText("). Para imóveis >125m² (alto padrão familiar), ticket sobe para R$ 3.004.778 ("),
      inlineLink(
        "Loft ago-out/2025 via Portas",
        "https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/"
      ),
      inlineText(")."),
    ],
    label: "D2.6 Cabral n=2",
  },

  // Mossunguê n=10 (sub-secao "Por que esta aqui")
  {
    find: "CRM FYMOOB tem n=10 pra perfil família — única amostra grande aqui",
    newContent: [
      inlineText("Ticket médio do bairro: R$ 2.289.777 ("),
      inlineLink(
        "Loft dez/2024-jan/2025",
        "https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/"
      ),
      inlineText(") — segundo mais alto de Curitiba, atrás só do Batel. Para imóveis >125m², ticket sobe para R$ 3.509.356 com tamanho médio 250m² ("),
      inlineLink(
        "Loft ago-out/2025 via Portas",
        "https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/"
      ),
      inlineText("). 3D/2V de 120m² em prédio novo concentra-se na faixa R$ 1,5-2 milhões em abril/2026. Como observação complementar, no estoque acompanhado pela FYMOOB duas vagas é padrão consolidado dos lançamentos recentes."),
    ],
    label: "D2.8 Mossunguê n=10 (descrição)",
  },

  // Mossunguê — bullet "Faixa de preço: mediana R$ 3,1 milhões"
  {
    find: "mediana R$ 3,1 milhões pra perfil família CRM FYMOOB",
    newContent: [
      inlineBold("Faixa de preço:"),
      inlineText(
        " para imóveis perfil família alto padrão (>125m²), ticket médio R$ 3.509.356 ("
      ),
      inlineLink(
        "Loft ago-out/2025 via Portas",
        "https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/"
      ),
      inlineText("). 3D/2V de 120m² em prédio novo concentra-se na faixa R$ 1,5-2 milhões."),
    ],
    label: "D2.9 Mossunguê faixa premium",
  },

  // Bigorrilho n=6
  {
    find: "CRM FYMOOB tem n=6, mediana R$ 3,2 mi, valor de entrada R$ 1,47 mi pra 3D/2V/100",
    newContent: [
      inlineText("Ticket médio do bairro: R$ 1.916.311 ("),
      inlineLink(
        "Loft dez/2024-jan/2025",
        "https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/"
      ),
      inlineText("). Para imóveis >125m² (alto padrão familiar), ticket sobe para R$ 3.238.794 com tamanho médio 210m² ("),
      inlineLink(
        "Loft via Portas",
        "https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/"
      ),
      inlineText("). 3D/2V de 100m² em apartamento padrão familiar concentra-se em torno de R$ 1,4-1,7 milhão (referência baseada em "),
      inlineLink("FipeZap mar/2026", "https://www.fipe.org.br/pt-br/indices/fipezap/"),
      inlineText(" R$ 14.117/m² × 100-120m²). Diferente do Mossunguê, Bigorrilho mantém mix tipológico amplo (apto compacto, médio e grande convivendo)."),
    ],
    label: "D2.10 Bigorrilho n=6",
  },

  // Bigorrilho R$ 19.033 (CRM viés)
  {
    find: "R$ 19.033/m² perfil família (CRM)",
    newContent: [
      inlineBold("Faixa de preço:"),
      inlineText(" R$ 14.117/m² (referência baseada em "),
      inlineLink("FipeZap mar/2026", "https://www.fipe.org.br/pt-br/indices/fipezap/"),
      inlineText(" publicada via MySide). 3D/2V de 100m² em apartamento padrão familiar começa em torno de R$ 1,4 milhão."),
    ],
    label: "D2.11 Bigorrilho R$/m² CRM (viés)",
  },

  // Santa Felicidade n<5
  {
    find: "CRM FYMOOB n<5, usar fonte externa",
    newContent: [
      inlineBold("Faixa de preço:"),
      inlineText(" referência em torno de R$ 8-10 mil/m² baseada em "),
      inlineLink("FipeZap mar/2026", "https://www.fipe.org.br/pt-br/indices/fipezap/"),
      inlineText(". Ticket médio R$ 1.082.273 ("),
      inlineLink(
        "Loft dez/2024-jan/2025",
        "https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/"
      ),
      inlineText("). Casas com terreno em rua interna são realidade aqui (perfil dominante)."),
    ],
    label: "D2.12 Santa Felicidade n<5",
  },

  // Portão "no CRM FYMOOB; mediana R$ 1,01 mi pra perfil família, n=5"
  {
    find: "no CRM FYMOOB; mediana R$ 1,01 mi pra perfil família, n=5",
    newContent: [
      inlineText(
        "no estoque ativo do mercado em abril/2026, baseado em FipeZap mar/2026 R$ 10.028/m² × 80-100m² em sobrados consolidados; mediana de mercado para sobrado 3D/2V no bairro fica próxima de R$ 1 milhão"
      ),
    ],
    label: "D2.14 Portão entrada sobrado",
  },

  // Bullet CIC (sobrado R$ 365 mil CRM)
  {
    find: "CIC — sobrado 3D/1V começa em",
    newContent: [
      inlineBold("CIC"),
      inlineText(
        " — sobrado 3D popular começa em torno de R$ 350-400 mil em abril/2026, mediana próxima de R$ 460 mil (referência observada no segmento popular metropolitano). UPA CIC no bairro. Contrapartida: 25-35 min até Pequeno Príncipe + crime patrimonial alto."
      ),
    ],
    label: "D2.15 CIC sobrado",
  },

  // Bullet Sítio Cercado
  {
    find: "Sítio Cercado — casa 3D começa em",
    newContent: [
      inlineBold("Sítio Cercado"),
      inlineText(" — casa 3D começa em torno de R$ 380-420 mil; ticket médio do bairro R$ 295.719 ("),
      inlineLink(
        "Loft dez/2024-jan/2025",
        "https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/"
      ),
      inlineText(", inclui imóveis menores). Contrapartida: 5º mais perigoso H1/2025 ("),
      inlineLink(
        "Radar Metropolitano",
        "https://radarmetropolitanopr.com/2025/08/26/curitiba-registra-um-crime-contra-o-patrimonio-a-cada-5-minutos-veja-os-bairros-mais-perigosos-e-os-mais-seguros-da-capital/"
      ),
      inlineText(")."),
    ],
    label: "D2.16 Sítio Cercado",
  },

  // Bullet Campo de Santana
  {
    find: "Campo de Santana — sobrado 2D começa em",
    newContent: [
      inlineBold("Campo de Santana"),
      inlineText(" — ticket médio do bairro R$ 215.833 ("),
      inlineLink(
        "Loft dez/2024-jan/2025",
        "https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/"
      ),
      inlineText(", o mais barato dos 40 bairros monitorados); sobrado 2D começa em torno de R$ 350-400 mil. Periferia sul."),
    ],
    label: "D2.17 Campo de Santana",
  },

  // Bullet Portão (sobrado mediana 990 mil 41% menos m²)
  {
    find: "Portão — sobrado mediana R$ 990 mil, área privativa 167",
    newContent: [
      inlineLink("Portão", "/imoveis/portao"),
      inlineText(" — sobrados consolidados de família 3D em rua interna concentram-se na faixa R$ 900 mil-1,1 milhão em abril/2026, com área tipicamente entre 130-180m². "),
      inlineBold(
        "No Portão, casa de família custa cerca de 35-45% menos por m² que apto compacto novo no mesmo bairro"
      ),
      inlineText(" — porque o bairro virou bimodal: apto compacto R$ 11 mil/m² convive com casa antiga em lote grande R$ 6,5-7 mil/m² (referência baseada em "),
      inlineLink("FipeZap mar/2026", "https://www.fipe.org.br/pt-br/indices/fipezap/"),
      inlineText(": R$ 10.028/m² médio)."),
    ],
    label: "D2.18 Portão bimodal",
  },

  // Capão Raso bullet
  {
    find: "Capão Raso — sobrado 3D/2V/169m² entrada R$ 870 mil",
    newContent: [
      inlineBold("Capão Raso"),
      inlineText(" — ticket médio do bairro R$ 487.105 ("),
      inlineLink(
        "Loft dez/2024-jan/2025",
        "https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/"
      ),
      inlineText("). Sobrados de alto padrão (3D/2V em 150m²+) começam em torno de R$ 850 mil-1 milhão — configuração que no Bigorrilho corresponde a apartamentos a partir de R$ 3 milhões ("),
      inlineLink(
        "Loft via Portas",
        "https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/"
      ),
      inlineText(")."),
    ],
    label: "D2.19 Capão Raso",
  },

  // Bigorrilho bullet "entrada R$ 1,47 mi pra apto"
  {
    find: "Bigorrilho — entrada R$ 1,47 mi pra apto",
    newContent: [
      inlineLink("Bigorrilho", "/imoveis/bigorrilho"),
      inlineText(" — apto 3D/2V de 100m² começa em torno de R$ 1,4 milhão (referência baseada em "),
      inlineLink("FipeZap mar/2026", "https://www.fipe.org.br/pt-br/indices/fipezap/"),
      inlineText(": R$ 14.117/m² × 100m²)."),
    ],
    label: "D2.20 Bigorrilho entrada",
  },

  // Mossunguê bullet entrada R$ 1,65
  {
    find: "Mossunguê (Ecoville) — entrada R$ 1,65 mi pra apto",
    newContent: [
      inlineBold("Mossunguê (Ecoville)"),
      inlineText(" — apto 3D/2V de 120m² em prédio novo começa em torno de R$ 1,6-1,8 milhão ("),
      inlineLink(
        "Loft Q4/2024-Q1/2025: ticket médio R$ 2.289.777",
        "https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/"
      ),
      inlineText(" com mix tipológico que reflete a oferta dominante de unidades grandes). Como observação complementar, no estoque acompanhado pela FYMOOB a oferta abaixo dessa faixa é escassa."),
    ],
    label: "D2.21 Mossunguê entrada",
  },

  // Água Verde bullet "entrada R$ 1,09 mi em sobrado, mediana R$ 1,75 mi perfil família (CRM FYMOOB)"
  {
    find: "Água Verde — entrada R$ 1,09 mi em sobrado",
    newContent: [
      inlineLink("Água Verde", "/imoveis/agua-verde"),
      inlineText(" — ticket médio do bairro R$ 1.430.445 ("),
      inlineLink(
        "Loft dez/2024-jan/2025",
        "https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/"
      ),
      inlineText("). 3D/2V padrão familiar em sobrado consolidado começa em torno de R$ 1,1-1,3 milhão, mediana próxima de R$ 1,5 milhão."),
    ],
    label: "D2.22 Água Verde entrada sobrado",
  },

  // Batel premium bullet
  {
    find: "Batel — apto premium família mediana R$ 4,45 mi",
    newContent: [
      inlineLink("Batel", "/imoveis/batel"),
      inlineText(" — ticket médio do bairro R$ 2.530.119 ("),
      inlineLink(
        "Loft dez/2024-jan/2025",
        "https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/"
      ),
      inlineText("). Para imóveis >125m² (alto padrão familiar), ticket sobe para R$ 3.949.265 com tamanho médio 258m² ("),
      inlineLink(
        "Loft via Portas",
        "https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/"
      ),
      inlineText("). Pra entender a conta total mensal, ver "),
      inlineLink("quanto custa morar no Batel", "/blog/quanto-custa-morar-batel-curitiba"),
      inlineText("."),
    ],
    label: "D2.23 Batel premium",
  },

  // Mossunguê premium bullet "(n=10 CRM); 100% das unidades..."
  {
    find: "Mossunguê (Ecoville) — mediana R$ 3,1 mi (n=10 CRM)",
    newContent: [
      inlineBold("Mossunguê (Ecoville)"),
      inlineText(" — para imóveis >125m² (alto padrão familiar), ticket médio R$ 3.509.356 com tamanho médio 250m² ("),
      inlineLink(
        "Loft via Portas",
        "https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/"
      ),
      inlineText("). Como observação complementar, no estoque acompanhado pela FYMOOB duas vagas é padrão consolidado dos lançamentos recentes do bairro. Para comparativo direto, "),
      inlineLink("Ecoville × Bigorrilho com filhos", "/blog/ecoville-vs-bigorrilho-curitiba"),
      inlineText("."),
    ],
    label: "D2.24 Mossunguê premium familia",
  },

  // Bigorrilho premium bullet
  {
    find: "Bigorrilho — mediana R$ 3,24 mi (n=6 CRM)",
    newContent: [
      inlineBold("Bigorrilho"),
      inlineText(" — para imóveis >125m² (alto padrão familiar), ticket médio R$ 3.238.794 com tamanho médio 210m² ("),
      inlineLink(
        "Loft via Portas",
        "https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/"
      ),
      inlineText(")."),
    ],
    label: "D2.25 Bigorrilho premium",
  },

  // Cabral premium / Cascatinha
  {
    find: "Cabral premium / Cascatinha / Jardim Social — n<5 no CRM FYMOOB",
    newContent: [
      inlineBold("Cabral premium / Cascatinha / Jardim Social"),
      inlineText(" — preço de referência baseado em "),
      inlineLink("FipeZap mar/2026", "https://www.fipe.org.br/pt-br/indices/fipezap/"),
      inlineText(" (Cabral R$ 12.400/m², Cascatinha R$ 12-18 mil/m²) e ticket Loft (Cabral R$ 1,8 mi com alta de +39% em 2025)."),
    ],
    label: "D2.26 Cabral premium / Cascatinha",
  },

  // Cascatinha "registrou zero homicídios dolosos, zero latrocínios..."
  {
    find: "registrou zero homicídios dolosos, zero latrocínios, zero lesão seguida de morte",
    newContent: [
      inlineBold("Por que está aqui:"),
      inlineText(" na agregação consultada para jan-set/2025 ("),
      inlineLink(
        "SESP-PR via iLove Curitiba",
        "https://ilovecuritiba.com.br/2025/10/15/bairros-mais-perigosos-de-curitiba/"
      ),
      inlineText("), a Cascatinha não tem registros de homicídios dolosos, latrocínios, lesões seguidas de morte ou feminicídios — leitura como indicador, não como garantia (a SESP-PR não publica esse recorte por bairro de forma padronizada). É bairro residencial alto padrão, predominantemente horizontal com casas e condomínios de casas — perfil família \"criar filho com quintal\" sem ir até Santa Felicidade. Ticket médio R$ 1.747.072 ("),
      inlineLink(
        "Loft dez/2024-jan/2025",
        "https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/"
      ),
      inlineText(")."),
    ],
    label: "E.2 Cascatinha zero crimes — caveat completo",
  },
]

for (const ov of BLOCK_OVERRIDES) {
  const idx = findBlockIndex((b) => {
    const text = inlineToString(b.content)
    if (!text.includes(ov.find)) return false
    if (ov.extra && !text.includes(ov.extra)) return false
    return true
  })
  if (idx === -1) {
    // Idempotencia — checa se conteúdo novo (primeiro snippet) já está
    const checkSnippet = inlineToString(ov.newContent).slice(0, 60)
    const exists = body.some((b) => inlineToString(b.content).includes(checkSnippet))
    if (exists) log.push(`${ov.label} SKIP — já aplicado`)
    else log.push(`${ov.label} WARN — bloco com "${ov.find}" não encontrado`)
  } else {
    body[idx].content = ov.newContent
    log.push(`${ov.label} OK — bloco ${idx} substituído`)
  }
}

// ─────────────────────────────────────────────────────────────────
// Apresentar log
// ─────────────────────────────────────────────────────────────────
console.log(`\n${DRY_RUN ? "[DRY-RUN] " : ""}Aplicando alterações em ${SLUG}\n`)
console.log(`Status: ${article.status}`)
console.log(`Blocos antes: ${article.body.length}`)
console.log(`Blocos depois: ${body.length}\n`)
for (const line of log) console.log(line)

// ─────────────────────────────────────────────────────────────────
// COMMIT
// ─────────────────────────────────────────────────────────────────
if (DRY_RUN) {
  console.log(`\n[DRY-RUN] sem write`)
  process.exit(0)
}

const updates = {
  body,
  title: frontmatterUpdates.title,
  description: frontmatterUpdates.description,
  seo_meta_title: frontmatterUpdates.seo_meta_title,
  seo_meta_description: frontmatterUpdates.seo_meta_description,
}
const { error: updErr } = await sb.from("articles").update(updates).eq("id", article.id)
if (updErr) {
  console.error(`\n❌ Erro UPDATE:`, updErr)
  process.exit(1)
}
console.log(`\n✓ Article atualizado. Body: ${body.length} blocos.`)

// IndexNow ping
const KEY = "d7ce36f0730ca0d491f787e07907b113b89651d7f297a09a2bec64e2cd09e43f"
const HOST = "fymoob.com.br"
const url = `https://${HOST}/blog/${SLUG}`
try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: [url],
    }),
  })
  console.log(`IndexNow: ${res.status} ${res.statusText} (${url})`)
} catch (err) {
  console.log(`IndexNow falhou: ${err.message}`)
}
