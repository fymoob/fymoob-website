/**
 * Aplica 2ª rodada de revisão de português/fluidez no artigo
 * `melhores-bairros-familias-curitiba` em 03/05/2026.
 *
 * Foco: corrigir erros de português, negritos quebrados, jargões em
 * inglês ("indoor", "ticket médio", "Trade-offs", "Park Shopping"),
 * concordâncias erradas ("mesmo contrapartida", "o pontuação"),
 * abreviações de mensagem ("pra", "pro", "apto", "3D/2V" em texto
 * corrido) e "zero crimes letais"/"zero homicídios" sem caveat.
 *
 * Reescritas direcionadas:
 *   - Block 0: lead — "tem bronquiolite" → "está com bronquiolite"
 *   - Block 8: metodologia "studio/apartamento compacto" plural
 *   - Block 12: "oferta indoor" → "oferta em ambiente fechado"
 *   - Block 13: "ticket médio" → "preço médio"
 *   - Block 14: "balizar a conversa" → "orientar a decisão"
 *   - Block 16 (heading): "Top 10 bairros pra família" → "Os 10 melhores"
 *   - Block 28 (Água Verde): negrito quebrado, reescrita do parágrafo
 *   - Block 40 (Ahú contrapartida): reescrita
 *   - Block 47 (Cabral contrapartida): negrito quebrado + reescrita
 *   - Block 54 (Cascatinha contrapartida): reescrita
 *   - Block 56/63 (Mossunguê/Bigorrilho): "ticket médio" → "valor médio"
 *   - Block 60 (Mossunguê preço): "perfil família" → "alto padrão familiar"
 *   - Block 61 (Mossunguê contrapartida): "25 min em horário de pico é longo"
 *   - Block 68 (Bigorrilho contrapartida): reescrita
 *   - Block 70 (Santa Felicidade): "essa é a contrapartida central"
 *   - Block 73 (Santa Felicidade hospital): "horário de pico"
 *   - Block 74 (Santa Felicidade lazer): "indoor" → "em ambiente fechado"
 *   - Block 78 (Boa Vista): reescrita com renda mensal explícita
 *   - Block 85 (Portão): wording de área típica + acesso ao Centro
 *   - Block 124 (Portão R$ 779 mil): remove "(CRM FYMOOB)" + reescrita
 *   - Block 157 (FAQ Pequeno Príncipe): negrito quebrado + reescrita
 *   - Block 159 (FAQ seguro): caveat de agregação consultada
 *   - Block 169 (FAQ Ecoville): caveat + "Trade-offs" → "Contrapartidas"
 *
 * Substituições globais (texto):
 *   - "pra" → "para" / "Pra " → "Para " (em contextos seguros)
 *   - "ticket médio" → "valor médio" (exceto block 13 → "preço médio")
 *   - "apto compacto" → "apartamento compacto"
 *   - "apto 3D/2V" → "apartamento de 3 dormitórios e 2 vagas"
 *   - "3D/2V" → "3 dormitórios e 2 vagas" (texto corrido)
 *   - "3D/1V/120m²" → "3 dormitórios e 1 vaga, 120 m²"
 *   - "Trade-offs" → "Contrapartidas"
 *   - "indoor" → "em ambiente fechado" (Boliche)
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

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

function walkAndReplaceRegex(node, regex, replacer) {
  let count = 0
  if (Array.isArray(node)) {
    for (const item of node) {
      if (item?.type === "text" && typeof item.text === "string" && regex.test(item.text)) {
        const newText = item.text.replace(regex, replacer)
        if (newText !== item.text) {
          item.text = newText
          count++
        }
      }
      if (item?.type === "link" && Array.isArray(item.content)) {
        count += walkAndReplaceRegex(item.content, regex, replacer)
      }
    }
    return count
  }
  if (node && typeof node === "object" && Array.isArray(node.content)) {
    count += walkAndReplaceRegex(node.content, regex, replacer)
  }
  if (node?.type === "table" && node.content?.rows) {
    for (const row of node.content.rows) {
      for (const cell of row.cells || []) {
        if (Array.isArray(cell.content)) count += walkAndReplaceRegex(cell.content, regex, replacer)
      }
    }
  }
  return count
}

// ──────────────────────────────────────────────────────────────────
// Reescritas pontuais (idempotentes via marker)
// ──────────────────────────────────────────────────────────────────

// Block 0 — lead
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "quando o filho tem bronquiolite", "quando o filho está com bronquiolite")
  if (n > 0) log.push(`[lead] "tem bronquiolite" → "está com bronquiolite"`)
}

// Block 8 — metodologia
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "não studio ou apartamento compacto", "não estúdios ou apartamentos compactos")
  if (n > 0) log.push(`[metodologia] "studio/apartamento compacto" → "estúdios/apartamentos compactos"`)
}

// Block 12 — "oferta indoor"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "oferta indoor", "oferta em ambiente fechado")
  if (n > 0) log.push(`[block 12] "oferta indoor" → "oferta em ambiente fechado"`)
}

// Block 13 — "ticket médio para imóvel familiar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "ticket médio para imóvel familiar", "preço médio para imóvel familiar")
  if (n > 0) log.push(`[block 13] "ticket médio" → "preço médio" (custo metodologia)`)
}

// Block 14 — "balizar a conversa" → "orientar a decisão"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "O ranking é para balizar a conversa, não substitui visita ao bairro.", "O ranking serve para orientar a decisão, mas não substitui visita ao bairro.")
  if (n > 0) log.push(`[block 14] "balizar a conversa" → "orientar a decisão"`)
}

// Block 15 — "Pra ranking" / "Pra preço" / "Pra somar"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Pra ranking geral", "Para o ranking geral")
    n += walkAndReplace(block, "Pra preço por m²", "Para o preço por m²")
    n += walkAndReplace(block, "Pra somar com escola", "Para somar com escola")
  }
  if (n > 0) log.push(`[block 15] "Pra X" → "Para X"`)
}

// Block 16 (heading)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Top 10 bairros pra família — ranking geral", "Os 10 melhores bairros para família — ranking geral")
  if (n > 0) log.push(`[block 16] heading "Top 10 ... pra família" → "Os 10 melhores ... para família"`)
}

// Block 18 — "Pra Cascatinha"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra Cascatinha,", "Para Cascatinha,")
  if (n > 0) log.push(`[block 18] "Pra Cascatinha" → "Para Cascatinha"`)
}

// Block 21 + 157 — "está prevista pra 2026"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "está prevista pra 2026", "está prevista para 2026")
  if (n > 0) log.push(`[blocks 21+157] "prevista pra 2026" → "para 2026"`)
}

// Block 21 — "menos confortável pra criança"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "menos confortável pra criança", "menos confortável para a criança")
  if (n > 0) log.push(`[block 21] "menos confortável pra criança" → "para a criança"`)
}

// Block 25 — Faixa de preço família 3D/2V
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Faixa de preço família 3D/2V:", "Faixa de preço, 3 dormitórios e 2 vagas:")
  if (n > 0) log.push(`[block 25] "Faixa de preço família 3D/2V" → "3 dormitórios e 2 vagas"`)
}

// Block 28 — Água Verde
{
  const idx = 28
  const blk = body[idx]
  if (
    blk?.type === "paragraph" &&
    inlineToString(blk.content).includes("Hospital Pequeno Príncipe está dentro do")
  ) {
    blk.content = [
      b("Por que está aqui:"),
      t(" o "),
      link("/imoveis/agua-verde", "Água Verde", { bold: true }),
      t(" é a escolha mais racional para famílias com bebê ou criança pequena porque a sede do "),
      b("Hospital Pequeno Príncipe"),
      t(" fica no próprio bairro, na "),
      b("Rua Desembargador Motta, 1070"),
      t(", o que desbalanceia o jogo para qualquer família com criança em fase de bronquiolite, asma ou histórico de emergência respiratória. Bom Jesus Água Verde (R. Nestor Victor 910) fica a 5 minutos. Marista Santa Maria, em "),
      link("https://santamaria.colegiosmaristas.com.br/contato/", "São Lourenço"),
      t(", a 15 minutos. O valor médio do bairro é R$ 1.430.445 (Loft, dez/2024-jan/2025, análise de 20 mil anúncios em 40 bairros de Curitiba). 3 dormitórios e 2 vagas no padrão familiar entrega 90-130 m² na faixa de R$ 1,3 a 1,8 milhão (referência baseada em FipeZap mar/2026, R$ 12.178/m²). Como observação complementar, o estoque acompanhado pela FYMOOB mostra que duas vagas é padrão consolidado nos prédios anos 80-90 do bairro."),
    ]
    log.push(`[block 28] Água Verde — negrito quebrado corrigido + reescrita`)
  }
}

// Block 32 — "ticket médio Loft R$ 1.430.445"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "ticket médio Loft R$ 1.430.445", "valor médio Loft R$ 1.430.445")
  if (n > 0) log.push(`[block 32] "ticket médio Loft" → "valor médio Loft"`)
}

// Block 39 — "3D/2V mediano em torno de R$ 1,3–1,8 milhão"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "3D/2V mediano em torno de R$ 1,3–1,8 milhão", "3 dormitórios e 2 vagas, mediana em torno de R$ 1,3 a 1,8 milhão")
  if (n > 0) log.push(`[block 39] "3D/2V mediano" → "3 dormitórios e 2 vagas, mediana"`)
}

// Block 40 — Ahú contrapartida
{
  const idx = 40
  const blk = body[idx]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("sem hospital pediátrico próprio no bairro")
  ) {
    blk.content = [
      b("Contrapartida honesta:"),
      t(" não há hospital pediátrico dentro do bairro — a família depende do Pequeno Príncipe, no Água Verde — e o perfil é verticalizado. Para quem quer \"casa com quintal\", não é aqui."),
    ]
    log.push(`[block 40] Ahú — frase reescrita ("sem hospital pediátrico próprio")`)
  }
}

// Block 42 — Cabral: ticket → valor
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Como referência primária, usa-se ticket médio R$ 1.799.962", "Como referência primária, usa-se valor médio R$ 1.799.962")
    n += walkAndReplace(block, "alta de +39% no tíquete médio em 2025", "alta de +39% no valor médio em 2025")
    n += walkAndReplace(block, "ticket sobe para R$ 3.004.778", "valor médio sobe para R$ 3.004.778")
  }
  if (n > 0) log.push(`[block 42] Cabral — "ticket médio/tíquete médio" → "valor médio"`)
}

// Block 47 — Cabral contrapartida (idempotent: skip if rewrite marker present)
{
  const idx = 47
  const blk = body[idx]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("Colégio Militar fica no") &&
    !txt.includes("como alguns guias sugerem")
  ) {
    blk.content = [
      b("Contrapartida honesta:"),
      t(" o "),
      link("https://www.cmc.eb.mil.br/", "Colégio Militar"),
      t(" fica no Tarumã, na Praça Conselheiro Thomaz Coelho, 1 — não no Cabral, como alguns guias sugerem."),
    ]
    log.push(`[block 47] Cabral — negrito quebrado corrigido + reescrita`)
  }
}

// Block 49 — Cascatinha: "perfil família" + "Ticket médio"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "perfil família \"criar filho com quintal\"", "perfil familiar \"criar filho com quintal\"")
    n += walkAndReplace(block, "Ticket médio R$ 1.747.072", "Valor médio R$ 1.747.072")
  }
  if (n > 0) log.push(`[block 49] Cascatinha — "perfil família" + "Ticket médio"`)
}

// Block 54 — Cascatinha contrapartida
{
  const idx = 54
  const blk = body[idx]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("a mesma contrapartida do Mossunguê")
  ) {
    blk.content = [
      b("Contrapartida honesta:"),
      t(" a contrapartida é a mesma do Mossunguê — distância maior até o Pequeno Príncipe e ausência de UPA no bairro. É um perfil dependente de carro."),
    ]
    log.push(`[block 54] Cascatinha — reescrita ("a mesma contrapartida")`)
  }
}

// Block 56/63 — "Ticket médio do bairro" + "ticket sobe"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplaceRegex(block, /Ticket médio do bairro: R\$ ([0-9.]+)/g, "Valor médio do bairro: R$ $1")
    n += walkAndReplaceRegex(block, /Para imóveis >125m², ticket sobe para/g, "Para imóveis >125 m², o valor médio sobe para")
  }
  if (n > 0) log.push(`[blocks 56,63] "Ticket médio do bairro" / "ticket sobe" → "valor médio"`)
}

// Block 60 — Mossunguê preço
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "para imóveis perfil família alto padrão (>125m²), ticket médio", "para imóveis no perfil familiar de alto padrão (>125 m²), valor médio")
  if (n > 0) log.push(`[block 60] Mossunguê — "perfil família alto padrão / ticket médio"`)
}

// Block 56 — "3D/2V de 120m² em prédio novo concentra-se na faixa R$ 1,5-2 milhões em abril/2026"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "3D/2V de 120m² em prédio novo concentra-se na faixa R$ 1,5-2 milhões em abril/2026", "3 dormitórios e 2 vagas, com 120 m² em prédio novo, concentra-se na faixa de R$ 1,5 a 2 milhões em abril/2026")
  if (n > 0) log.push(`[block 56] "3D/2V de 120m²" reescrito (com data)`)
}

// Block 60 — "3D/2V de 120m² em prédio novo concentra-se na faixa R$ 1,5-2 milhões."
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "3D/2V de 120m² em prédio novo concentra-se na faixa R$ 1,5-2 milhões.", "3 dormitórios e 2 vagas, com 120 m² em prédio novo, concentra-se na faixa de R$ 1,5 a 2 milhões.")
  if (n > 0) log.push(`[block 60] "3D/2V de 120m²" reescrito (sem data)`)
}

// Block 61 — Mossunguê contrapartida
{
  const idx = 61
  const blk = body[idx]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("25 min em horário de pico é longo")
  ) {
    blk.content = [
      b("Contrapartida honesta:"),
      t(" carro-dependente, tudo no shopping ou de carro. Em uma emergência pediátrica grave, 25 minutos em horário de pico é muito tempo."),
    ]
    log.push(`[block 61] Mossunguê — "25 min em h-pico é longo" reescrito`)
  }
}

// Block 63 — Bigorrilho: "3D/2V de 100m²"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "3D/2V de 100m² em apartamento padrão familiar concentra-se em torno de R$ 1,4-1,7 milhão", "3 dormitórios e 2 vagas, com 100 m² no padrão familiar, concentra-se em torno de R$ 1,4 a 1,7 milhão")
  if (n > 0) log.push(`[block 63] Bigorrilho — "3D/2V de 100m²" reescrito`)
}

// Block 67 — Bigorrilho preço
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "3D/2V de 100m² em apartamento padrão familiar começa em torno de R$ 1,4 milhão", "3 dormitórios e 2 vagas, com 100 m² no padrão familiar, começa em torno de R$ 1,4 milhão")
  if (n > 0) log.push(`[block 67] Bigorrilho — "3D/2V de 100m²" preço reescrito`)
}

// Block 68 — Bigorrilho contrapartida
{
  const idx = 68
  const blk = body[idx]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("Bigorrilho não publica mensalidade do Marista")
  ) {
    blk.content = [
      b("Contrapartida honesta:"),
      t(" o Bigorrilho não tem mensalidades escolares publicadas de forma padronizada para todas as escolas do entorno. Use as faixas de mercado disponíveis ("),
      link("https://querobolsa.com.br/", "Querobolsa"),
      t(" e cobertura local da Gazeta do Povo) e evite cravar valor específico. É o bairro mais verticalizado de Curitiba — playground na rua é exceção; a vida da criança roda em condomínio e shopping."),
    ]
    log.push(`[block 68] Bigorrilho — reescrita da contrapartida`)
  }
}

// Block 70 — Santa Felicidade: "essa é a contrapartida central"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "essa é a contrapartida central", "essa é a principal contrapartida")
  if (n > 0) log.push(`[block 70] Santa Felicidade — "contrapartida central" → "principal contrapartida"`)
}

// Block 73 — Santa Felicidade hospital (anchored: only se ainda tiver "25–40 min." sem "minutos")
{
  let n = 0
  for (const block of body) {
    n += walkAndReplaceRegex(
      block,
      /Pequeno Príncipe a 25–40 min(?!utos)/g,
      "Pequeno Príncipe a 25–40 minutos em horário de pico"
    )
  }
  if (n > 0) log.push(`[block 73] Santa Felicidade — "25–40 min" → "25–40 minutos em horário de pico"`)
}
// Block 73 cleanup — limpar "(horário de pico)" duplicado em qualquer text node do bloco 73
{
  const idx = 73
  const blk = body[idx]
  if (blk?.type === "bulletListItem" && Array.isArray(blk.content)) {
    let n = 0
    const hasPico = blk.content.some((c) => c?.type === "text" && c.text?.includes("em horário de pico"))
    if (hasPico) {
      for (const node of blk.content) {
        if (node?.type === "text" && typeof node.text === "string" && node.text.includes(" (horário de pico)")) {
          node.text = node.text.replaceAll(" (horário de pico)", "")
          n++
        }
      }
    }
    if (n > 0) log.push(`[block 73] limpeza duplicação "(horário de pico)" em inline node separado`)
  }
}

// Block 74 — "Boliche Strike 7 indoor"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Boliche Strike 7 indoor", "Boliche Strike 7 (lazer em ambiente fechado)")
  if (n > 0) log.push(`[block 74] Santa Felicidade — "indoor" → "em ambiente fechado"`)
}

// Block 75 — "Ticket médio R$ 1.082.273"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Ticket médio R$ 1.082.273", "Valor médio R$ 1.082.273")
  if (n > 0) log.push(`[block 75] Santa Felicidade — "Ticket médio"`)
}

// Block 78 — Boa Vista
{
  const idx = 78
  const blk = body[idx]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("monta vida com filho sem comprometer demais o orçamento")
  ) {
    blk.content = [
      b("Por que está aqui:"),
      t(" a Boa Vista é um bairro de classe média onde uma família com renda mensal de R$ 8 mil a R$ 14 mil consegue montar uma vida com filhos sem comprometer demais o orçamento. Tem "),
      b("UPA Boa Vista no bairro"),
      t(" (Av. Paraná 3654 — "),
      link("https://www.curitiba.pr.gov.br/servicos/unidades-de-pronto-atendimento-upas/235", "Prefeitura CWB"),
      t("), Pequeno Príncipe a 15 minutos, escolas particulares com mensalidades acessíveis. O núcleo regional Boa Vista atende Bacacheri, Tarumã e Tingui — fila de CMEI moderada, menor que Tatuquara e CIC."),
    ]
    log.push(`[block 78] Boa Vista — reescrita com renda mensal explícita`)
  }
}

// Block 82 — "3D/2V acessível na faixa R$ 500–700 mil"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "3D/2V acessível na faixa R$ 500–700 mil", "3 dormitórios e 2 vagas, faixa acessível de R$ 500 a 700 mil")
  if (n > 0) log.push(`[block 82] Boa Vista — "3D/2V acessível"`)
}

// Block 85 — Portão
{
  const idx = 85
  const blk = body[idx]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("área típica entre 80 e 130 m²")
  ) {
    blk.content = [
      t("No "),
      link("/imoveis/portao", "Portão"),
      t(", sobrados familiares de 3 dormitórios em ruas internas concentram-se na faixa de "),
      b("R$ 900 mil a R$ 1,1 milhão"),
      t(" em abril/2026, com área típica entre 130 e 180 m². O bairro combina acesso rápido ao Centro, Água Verde e Batel com preço ainda inferior ao dos bairros premium. A referência usa "),
      link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap mar/2026"),
      t(" (R$ 10.028/m² no bairro) com observação complementar do mercado local."),
    ]
    log.push(`[block 85] Portão — área típica ajustada + acesso ao Centro`)
  }
}

// Block 91 — Portão contrapartida
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "apto compacto novo R$ 11 mil/m² convivendo com casa antiga", "apartamento compacto novo R$ 11 mil/m² convivendo com casa antiga")
  if (n > 0) log.push(`[block 91] Portão contrapartida — "apto" → "apartamento"`)
}

// Blocks 121,122,127,133,137 — "ticket médio do bairro R$ X" → "valor médio do bairro R$ X"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplaceRegex(block, /ticket médio do bairro R\$ ([0-9.]+)/g, "valor médio do bairro R$ $1")
  }
  if (n > 0) log.push(`[blocks 121-137] "ticket médio do bairro" → "valor médio do bairro"`)
}

// Blocks 138, 139 — "ticket médio R$ X" inline
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "ticket médio R$ 3.509.356", "valor médio R$ 3.509.356")
    n += walkAndReplace(block, "ticket médio R$ 3.238.794", "valor médio R$ 3.238.794")
  }
  if (n > 0) log.push(`[blocks 138-139] "ticket médio R$ X" → "valor médio"`)
}

// Block 124 — Portão R$ 779 mil
{
  const idx = 124
  const blk = body[idx]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "bulletListItem" &&
    txt.includes("R$ 779 mil pra sobrado")
  ) {
    blk.content = [
      link("/imoveis/portao", "Portão", { bold: true }),
      t(" — sobrados familiares de 3 dormitórios começam em torno de R$ 900 mil, com mediana próxima de R$ 1 milhão. Já se aproxima de R$ 800 mil, mas é uma das melhores relações entre tipologia, segurança e distância nessa faixa de orçamento."),
    ]
    log.push(`[block 124] Portão — remove "R$ 779 mil pra sobrado 3D/1V/120m² (CRM FYMOOB)" + reescrita`)
  }
}

// Block 126 — "apto compacto" (duas ocorrências)
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "apto compacto R$ 11 mil/m² convive com casa antiga", "apartamento compacto R$ 11 mil/m² convive com casa antiga")
    n += walkAndReplace(block, "apto compacto novo no mesmo bairro", "apartamento compacto novo no mesmo bairro")
  }
  if (n > 0) log.push(`[block 126] Portão por orçamento — "apto compacto" → "apartamento compacto"`)
}

// Block 131 — Bigorrilho preço
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "apto 3D/2V de 100m² começa em torno de R$ 1,4 milhão", "apartamento de 3 dormitórios e 2 vagas, com 100 m², começa em torno de R$ 1,4 milhão")
  if (n > 0) log.push(`[block 131] Bigorrilho — "apto 3D/2V de 100m²"`)
}

// Block 132 — Mossunguê preço
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "apto 3D/2V de 120m² em prédio novo começa em torno de R$ 1,6-1,8 milhão", "apartamento de 3 dormitórios e 2 vagas, com 120 m² em prédio novo, começa em torno de R$ 1,6 a 1,8 milhão")
  if (n > 0) log.push(`[block 132] Mossunguê — "apto 3D/2V de 120m²"`)
}

// Block 133 — Água Verde preço
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "3D/2V padrão familiar em sobrado consolidado", "3 dormitórios e 2 vagas em sobrado consolidado padrão familiar")
  if (n > 0) log.push(`[block 133] Água Verde — "3D/2V padrão familiar"`)
}

// Block 134 — Ahú
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "3D na faixa R$ 1,3–1,8 mi", "3 dormitórios na faixa de R$ 1,3 a 1,8 milhão")
  if (n > 0) log.push(`[block 134] Ahú — "3D na faixa"`)
}

// Block 135 — Bacacheri
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "3D acessível na faixa R$ 900 mil–1,4 mi", "3 dormitórios acessíveis na faixa de R$ 900 mil a 1,4 milhão")
  if (n > 0) log.push(`[block 135] Bacacheri — "3D acessível"`)
}

// Block 142 (heading) — "Bairros pra repensar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Bairros pra repensar com filhos pequenos", "Bairros para repensar com filhos pequenos")
  if (n > 0) log.push(`[block 142] heading "Bairros pra repensar" → "para repensar"`)
}

// Block 144 — "vida de bairro pra criança"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "baixa vida de bairro pra criança", "baixa vida de bairro para criança")
  if (n > 0) log.push(`[block 144] Centro Cívico — "pra criança" → "para criança"`)
}

// Block 147 (heading)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "5 estratégias práticas pra escolher bairro pra família", "5 estratégias práticas para escolher bairro para família")
  if (n > 0) log.push(`[block 147] heading 5 estratégias`)
}

// Block 148 — "Mapeie distância pra escola E pra hospital pediátrico"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Mapeie distância pra escola E pra hospital pediátrico antes de fechar.", "Mapeie distância para a escola E para o hospital pediátrico antes de fechar.")
  if (n > 0) log.push(`[block 148] estratégia 1 — "pra escola E pra hospital"`)
}

// Block 149 — "creche pública pra voltar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "creche pública pra voltar ao trabalho", "creche pública para voltar ao trabalho")
  if (n > 0) log.push(`[block 149] estratégia 2 — "pra voltar"`)
}

// Block 150, 162 — "pra família com renda até"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " pra família com renda até ", " para família com renda até ")
  if (n > 0) log.push(`[blocks 150,162] "pra família com renda" → "para família com renda"`)
}

// Block 152 — "eixo direto pra escola" + "Pra orçamento" + "documentos pra"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "eixo direto pra escola", "eixo direto para escola")
    n += walkAndReplace(block, "Pra orçamento R$ 700 mil–1,2 mi,", "Para orçamento de R$ 700 mil a R$ 1,2 milhão,")
    n += walkAndReplace(block, "documentos pra comprar imóvel em Curitiba", "documentos para comprar imóvel em Curitiba")
  }
  if (n > 0) log.push(`[block 152] estratégia 5 — "pra escola" + "Pra orçamento" + "documentos pra"`)
}

// Block 154 (heading)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Qual o melhor bairro de Curitiba pra família?", "Qual o melhor bairro de Curitiba para família?")
  if (n > 0) log.push(`[block 154] heading FAQ "pra família" → "para família"`)
}

// Block 157 — FAQ Pequeno Príncipe (idempotent: skip se já tem rewrite marker)
{
  const idx = 157
  const blk = body[idx]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Hospital Pequeno Príncipe") &&
    txt.includes("47 especialidades") &&
    !txt.includes("maior hospital exclusivamente pediátrico do Brasil")
  ) {
    blk.content = [
      t("O "),
      b("Hospital Pequeno Príncipe"),
      t(", maior hospital exclusivamente pediátrico do Brasil, com 47 especialidades, fica na "),
      b("Rua Desembargador Motta, 1070"),
      t(", no "),
      link("/imoveis/agua-verde", "Água Verde", { bold: true }),
      t(" ("),
      link("https://pequenoprincipe.org.br/", "Pequeno Príncipe oficial"),
      t("). O Hospital Pequeno Príncipe Norte está em construção no Bacacheri, com primeira etapa (Hospital-Dia) prevista para 2026 ("),
      link("https://www.saude.pr.gov.br/Noticia/Uniao-de-forcas-comecam-obras-do-Hospital-Pequeno-Principe-Norte-em-Curitiba", "SESA-PR"),
      t(")."),
    ]
    log.push(`[block 157] FAQ Pequeno Príncipe — negrito corrigido + endereço com vírgula`)
  }
}

// Block 158 (heading)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Qual o bairro mais seguro de Curitiba pra família?", "Qual o bairro mais seguro de Curitiba para família?")
  if (n > 0) log.push(`[block 158] heading FAQ — "pra família"`)
}

// Block 159 — FAQ seguro: caveat
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(
      block,
      "Cascatinha, Mossunguê, Hugo Lange, Juvevê e Ahú registraram zero homicídios dolosos, latrocínios, lesões fatais e feminicídios",
      "Na agregação consultada para jan–set/2025, Cascatinha, Mossunguê, Hugo Lange, Juvevê e Ahú aparecem sem registros de homicídios dolosos, latrocínios, lesões fatais ou feminicídios"
    )
  }
  if (n > 0) log.push(`[block 159] FAQ seguro — caveat de agregação consultada`)
}

// Block 166 (heading)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Bacacheri é bom pra família?", "Bacacheri é bom para família?")
  if (n > 0) log.push(`[block 166] heading FAQ Bacacheri`)
}

// Block 168 (heading)
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Vale a pena Ecoville pra família?", "Vale a pena Ecoville para família?")
  if (n > 0) log.push(`[block 168] heading FAQ Ecoville`)
}

// Block 169 — FAQ Ecoville
{
  const idx = 169
  const blk = body[idx]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("zero crimes letais jan–set/2025")
  ) {
    blk.content = [
      t("Para família consolidada com renda alta e 1+ carro por adulto, sim — Mossunguê (zona residencial central do Ecoville) tem Internacional Everest no bairro, ParkShoppingBarigüi com Fun Park e Smart Zoo, Parque Barigui adjacente. Na agregação consultada para jan–set/2025, não aparecem crimes letais registrados para Mossunguê/Ecoville; como esse recorte por bairro não é publicado de forma padronizada pela SESP-PR, o dado deve ser lido como indicador, não como garantia. "),
      b("As contrapartidas reais:"),
      t(" Pequeno Príncipe a 20–30 minutos, ausência de UPA 24h no bairro e rotina mais dependente de carro. Para família com bebê 0–3 ou criança com condição respiratória, a contrapartida de saúde pesa."),
    ]
    log.push(`[block 169] FAQ Ecoville — caveat + "Trade-offs reais" → "contrapartidas reais"`)
  }
}

// Block 200 (CTA)
{
  let n = 0
  for (const block of body) {
    if (block?.type === "ctaBox" && block.props?.title?.includes("pra sua família")) {
      block.props.title = block.props.title.replace("pra sua família", "para sua família")
      n++
    }
  }
  if (n > 0) log.push(`[block 200] CTA — "pra sua família" → "para sua família"`)
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
