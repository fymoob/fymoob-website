/**
 * Aplica 2ª rodada de revisão no artigo
 * `financiamento-caixa-itau-bradesco-comparativo` em 03/05/2026.
 *
 * Foco principal:
 *   1. Corrigir "30 anos" → "35 anos" no block 6 (lead-in da simulação)
 *   2. "CET real" → "CET estimado" (block 1 callout + block 104 tabela)
 *   3. Tabela block 3 — refinar wording dos cells
 *   4. Suavizar claims absolutos (Itaú "só permite 10%", BRB "virou nacional",
 *      Bradesco "Pula Parcela 1x/ano")
 *   5. Reescritas: block 31 (Pró-Cotista fila), block 109 (R$ 50-100 mil),
 *      block 18 (Inter), block 14 row 3 (Inter)
 *   6. FAQ block 133 — "5 perguntas mais pesquisadas" → genérico
 *   7. Substituir jargões: "rankeiam", "app excelente", "portabilidade
 *      agressiva", "taxa balcão", "pede pro gerente"
 *   8. Trocar "pra/pro" por "para/para o" em ~20 ocorrências
 *   9. CTA bloco 132 — refinar título e descrição
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SLUG = "financiamento-caixa-itau-bradesco-comparativo"

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
// Reescritas pontuais (com markers idempotentes)
// ──────────────────────────────────────────────────────────────────

// Block 0 — "Em abril de 2026" → "Em abril/2026"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Em abril de 2026, a diferença", "Em abril/2026, a diferença")
  if (n > 0) log.push(`[block 0] "abril de 2026" → "abril/2026"`)
}

// Block 1 (callout) — "CET real" → "CET estimado e a proposta formal"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Santander e Bradesco só devem ser descartados depois de comparar o CET real.",
    "Santander e Bradesco só devem ser descartados depois de comparar o CET estimado e a proposta formal de cada banco."
  )
  if (n > 0) log.push(`[block 1] resposta rápida — "CET real" → "CET estimado e proposta formal"`)
}

// Block 3 (tabela 5 bancos) — refinar coluna "Melhor para"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Menor taxa / MCMV / FGTS", "Menor taxa, MCMV e FGTS")
    n += walkAndReplace(block, "CET competitivo e renda composta", "CET competitivo e composição de renda")
    n += walkAndReplace(block, "Atendimento presencial/autônomos", "Atendimento presencial e autônomos")
  }
  if (n > 0) log.push(`[block 3] tabela 5 bancos — coluna "Melhor para" refinada`)
}

// Block 6 — "30 anos" → "35 anos" + "no #2" → "em 2º lugar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Abaixo, quanto isso custa em 30 anos e por que o BRB apareceu no #2.",
    "Abaixo, quanto isso custa em 35 anos e por que o BRB apareceu em 2º lugar."
  )
  if (n > 0) log.push(`[block 6] "30 anos" → "35 anos" + "no #2" → "em 2º lugar"`)
}

// Block 14 (tabela simulação Caixa/Bradesco/Inter) — Inter wording
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Inter (pior das taxas que comparamos)",
    "Inter (maior taxa observada no recorte ampliado)"
  )
  if (n > 0) log.push(`[block 14] célula Inter — "pior das taxas" → "maior taxa observada"`)
}

// Block 18 (callout R$ 161.567)
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "R$ 161.567 de diferença entre Caixa e o banco com a pior das taxas que comparamos pro mesmo imóvel de R$ 500 mil.",
    "R$ 161.567 de diferença entre Caixa e o banco com a maior taxa observada no recorte para o mesmo imóvel de R$ 500 mil."
  )
  if (n > 0) log.push(`[block 18] callout — "pior das taxas / pro mesmo imóvel" reescrito`)
}

// Block 23 — "Taxa balcão" → "Taxa de balcão"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Taxa balcão de 11,19%", "Taxa de balcão de 11,19%")
  if (n > 0) log.push(`[block 23] "Taxa balcão" → "Taxa de balcão"`)
}

// Block 24 — "pra correntistas"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " pra correntistas com salário", " para correntistas com salário")
  if (n > 0) log.push(`[block 24] "pra correntistas" → "para correntistas"`)
}

// Block 26 — "pra quem contribui há 3+ anos"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " pra quem contribui há 3+ anos", " para quem contribui há 3+ anos")
  if (n > 0) log.push(`[block 26] "pra quem contribui" → "para quem contribui"`)
}

// Block 29 — "Pra faixa etária"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra faixa etária acima de 50 anos", "Para faixa etária acima de 50 anos")
  if (n > 0) log.push(`[block 29] "Pra faixa etária" → "Para faixa etária"`)
}

// Block 30 — "marcada pra 30 dias"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "marcada pra 30 dias", "marcada para 30 dias")
  if (n > 0) log.push(`[block 30] "pra 30 dias" → "para 30 dias"`)
}

// Block 31 — Pró-Cotista fila: reescrita inteira
{
  const idx = 31
  const blk = body[idx]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "numberedListItem" &&
    txt.includes("Chegou primeiro leva")
  ) {
    blk.content = [
      b("Pró-Cotista tem disponibilidade limitada."),
      t(" A linha voltou em 2026 para imóveis até R$ 500 mil, mas o volume de recursos pode ser menor que a demanda. Quem pretende usar essa modalidade deve simular cedo e confirmar disponibilidade antes de fazer proposta."),
    ]
    log.push(`[block 31] Pró-Cotista — "Chegou primeiro leva" reescrito`)
  }
}

// Block 38 (heading BRB) — "virou nacional em 2026"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "BRB (11,36%): o banco regional que virou nacional em 2026",
    "BRB (11,36%): banco regional com atuação nacional no crédito imobiliário"
  )
  if (n > 0) log.push(`[block 38] heading BRB — "virou nacional em 2026" suavizado`)
}

// Block 41 — "só perde pra Caixa"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "+ TR — só perde pra Caixa", "+ TR — só perde para a Caixa")
  if (n > 0) log.push(`[block 41] "só perde pra Caixa" → "para a Caixa"`)
}

// Block 46 — "Pra quem quer gerente presencial"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Pra quem quer gerente presencial", "Para quem quer gerente presencial")
  if (n > 0) log.push(`[block 46] "Pra quem quer gerente" → "Para quem quer gerente"`)
}

// Block 58 — Itaú "só o Itaú permite entrada de 10%"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " do imóvel — só o Itaú permite entrada de 10% em 2026",
    " do imóvel em alguns perfis — diferencial relevante para quem tem entrada menor"
  )
  if (n > 0) log.push(`[block 58] Itaú — "só o Itaú permite 10%" suavizado`)
}

// Block 60 — "Portabilidade agressiva"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Portabilidade agressiva", "Estratégia ativa de portabilidade")
    n += walkAndReplace(block, " — cobre taxa de outros bancos pra trazer seu financiamento", " — pode cobrir a taxa de outros bancos para trazer seu financiamento")
  }
  if (n > 0) log.push(`[block 60] "Portabilidade agressiva / pra trazer" → consultivo`)
}

// Block 61 — "App excelente"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "App excelente", "Aplicativo com boa experiência de uso")
  if (n > 0) log.push(`[block 61] "App excelente" → "Aplicativo com boa experiência de uso"`)
}

// Block 70 — Itaú "Quem entra com 10% só (nenhum outro banco permite)"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Quem entra com 10% só (nenhum outro banco permite)",
    "Quem tem entrada na faixa de 10% e prefere não puxar mais recursos para a entrada"
  )
  if (n > 0) log.push(`[block 70] Itaú — "nenhum outro banco permite" suavizado`)
}

// Block 71 — "trocar pro Itaú"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "trocar pro Itaú", "trocar para o Itaú")
  if (n > 0) log.push(`[block 71] "trocar pro Itaú" → "trocar para o Itaú"`)
}

// Block 72 — "pra quem já é correntista"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " pra quem já é correntista", " para quem já é correntista")
  if (n > 0) log.push(`[block 72] "pra quem já é correntista" → "para quem"`)
}

// Block 74 — "rankeiam lado a lado"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Os dois bancos rankeiam lado a lado", "Os dois bancos aparecem praticamente empatados")
  if (n > 0) log.push(`[block 74] "rankeiam lado a lado" → "aparecem praticamente empatados"`)
}

// Block 77 — "Flexibilidade alta pra composição de renda"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Flexibilidade alta pra composição de renda", "Flexibilidade alta para composição de renda")
  if (n > 0) log.push(`[block 77] "Flexibilidade alta pra" → "para"`)
}

// Block 85 — Bradesco "Pula Parcela 1x/ano"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "\"Pula Parcela\" 1x/ano",
    "Possibilidade de pausa ou pulo de parcela em condições específicas, conforme contrato"
  )
  if (n > 0) log.push(`[block 85] Bradesco — "Pula Parcela 1x/ano" suavizado`)
}

// Block 89 — "pra quem quer atendimento presencial"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " pra quem quer atendimento presencial", " para quem quer atendimento presencial")
  if (n > 0) log.push(`[block 89] "pra quem quer atendimento" → "para"`)
}

// Block 101 — "pra pessoas acima de 50 anos"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " pra pessoas acima de 50 anos", " para pessoas acima de 50 anos")
  if (n > 0) log.push(`[block 101] "pra pessoas" → "para pessoas"`)
}

// Block 104 (tabela CET) — "CET real" → "CET estimado"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "CET real", "CET estimado")
  if (n > 0) log.push(`[block 104] cabeçalho tabela — "CET real" → "CET estimado"`)
}

// Block 109 — "o onde tem conta" + "R$ 50-100 mil"
{
  const idx = 109
  const blk = body[idx]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("o onde tem conta")
  ) {
    blk.content = [
      t("A maioria dos compradores simula apenas no banco onde já tem conta. Dependendo do valor financiado e do prazo, essa escolha pode custar R$ 50 mil a R$ 100 mil ao longo do contrato. Simular nos 5 leva 1 semana e tudo é digital."),
    ]
    log.push(`[block 109] "o onde tem conta / R$ 50-100 mil" reescrito`)
  }
}

// Block 120 — "ligue pro seu gerente"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "ligue pro seu gerente", "ligue para o seu gerente")
  if (n > 0) log.push(`[block 120] "ligue pro seu gerente" → "para o seu gerente"`)
}

// Block 124 — "Se a diferença pro segundo colocado"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " Se a diferença pro segundo colocado", " Se a diferença para o segundo colocado")
  if (n > 0) log.push(`[block 124] "pro segundo colocado" → "para o segundo colocado"`)
}

// Block 127 — "DECORE pra autônomos"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "DECORE pra autônomos", "DECORE para autônomos")
  if (n > 0) log.push(`[block 127] "DECORE pra autônomos" → "para autônomos"`)
}

// Block 132 (CTA principal) — refinar título + descrição
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Quer comparar os bancos antes de fazer proposta?"
    ) {
      block.props.title = "Quer comparar financiamento antes de fazer proposta?"
      block.props.description = "A FYMOOB compara Caixa, BRB, Itaú, Santander e Bradesco com os dados reais do imóvel: CET, parcela inicial, prazo, entrada e custo total. Sem custo para quem compra com a gente em Curitiba."
      log.push(`[block 132] CTA principal — título e descrição refinados`)
      break
    }
  }
}

// Block 133 (heading FAQ) — "5 mais pesquisadas no Google"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Perguntas frequentes (as 5 mais pesquisadas no Google)",
    "Perguntas frequentes sobre financiamento imobiliário"
  )
  if (n > 0) log.push(`[block 133] heading FAQ — sem "5 perguntas"`)
}

// Block 135 (FAQ Caixa) — "Pra correntista" + "cai pra 10,26%"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Pra correntista com relacionamento", "Para correntista com relacionamento")
    n += walkAndReplace(block, " a taxa preferencial cai pra 10,26%", " a taxa preferencial cai para 10,26%")
  }
  if (n > 0) log.push(`[block 135] FAQ Caixa — "Pra correntista / cai pra"`)
}

// Block 138 (heading FAQ Caixa ou Itaú) — "pra financiar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "Caixa ou Itaú: qual é melhor pra financiar em 2026?", "Caixa ou Itaú: qual é melhor para financiar em 2026?")
  if (n > 0) log.push(`[block 138] heading FAQ — "pra financiar" → "para financiar"`)
}

// Block 139 (FAQ Caixa ou Itaú) — "portabilidade agressiva"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, ", e faz portabilidade agressiva.", ", e atua ativamente em portabilidade.")
  if (n > 0) log.push(`[block 139] FAQ — "portabilidade agressiva" → "atua ativamente em portabilidade"`)
}

// Block ~144 (FAQ portabilidade) — "pede pro gerente"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, " pede pro gerente a planilha", " peça ao gerente a planilha")
  if (n > 0) log.push(`[FAQ portabilidade] "pede pro gerente" → "peça ao gerente"`)
}

// Block 143 (FAQ portabilidade) — "portabilidade pra Caixa" + "pra reta final"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "portabilidade pra Caixa", "portabilidade para Caixa")
  if (n > 0) log.push(`[FAQ portabilidade] "portabilidade pra Caixa" → "para Caixa"`)
}

// Block 147 (FAQ banco onde já tem conta) — "mudar pra outro"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "mudar pra outro banco", "mudar para outro banco")
  if (n > 0) log.push(`[FAQ relacionamento] "mudar pra outro banco" → "para outro banco"`)
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
