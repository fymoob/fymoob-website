/**
 * Aplica 2ª rodada de revisão no artigo `preco-metro-quadrado-curitiba-bairro`
 * em 03/05/2026.
 *
 * Foco:
 *   1. Tabela 2 (ranking): "3 | Região Barigui/Ecoville" → "3*" + nota explicativa
 *   2. Block 33 (heading): "Bairros Acessíveis — abaixo de R$ 6.000/m²" →
 *      "Bairros acessíveis e de entrada — até R$ 9.000/m²"
 *   3. Block 9: "É store of value, não crescimento" → "reserva de valor, não crescimento"
 *   4. Block 15: "Charme residencial baixo" → "Baixa verticalização" + suavizar
 *      "passou Cabral por 4 posições no ranking"
 *   5. Block 17 (callout): "Bigorrilho, Ecoville e Jardim Social" →
 *      "Bigorrilho, parte da região Barigui/Ecoville e Jardim Social"
 *   6. Block 19: "Antes de descer pro faixa médio" → "para a faixa média"
 *   7. Block 24/27/29/31/32: várias correções "o faixa / do faixa / pro Alto-Médio"
 *   8. Block 34: "Oito bairros fecham o ranking" → reescrita
 *   9. Block 39: "A matemática do m² de venda mente" → suavizar
 *  10. Block 42: Prado Velho — suavizar "12% ao ano / AirBnB / 8% e 10% líquidos"
 *  11. Block 44 (CTA intermediário): "dado de fechamento real, não média
 *      genérica" → consultivo + label "Calcular rentabilidade"
 *  12. Block 56: "Bigorrilho ou Ecoville" → "ou em lançamentos da região
 *      Barigui/Ecoville"
 *  13. Block 78 (CTA final): "Campina do Siqueira" → "região Barigui/Ecoville"
 *  14. Substituições: pra/pro, store of value, AirBnB, studios, scan
 *
 * IDEMPOTENTE.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

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

function replaceCellContent(table, rowIdx, colIdx, newContent) {
  if (!table?.content?.rows?.[rowIdx]?.cells?.[colIdx]) return false
  table.content.rows[rowIdx].cells[colIdx].content = newContent
  return true
}

// ──────────────────────────────────────────────────────────────────
// Block-level rewrites
// ──────────────────────────────────────────────────────────────────

// Block 2 (tabela ranking) — Linha região Barigui/Ecoville: "3" → "3*"
{
  const blk = body[2]
  if (blk?.type === "table" && blk.content?.rows?.[3]) {
    const r3 = blk.content.rows[3]
    const r3c0 = inlineToString(r3.cells?.[0]?.content)
    if (r3c0.trim() === "3") {
      replaceCellContent(blk, 3, 0, [t("3*")])
      log.push(`[block 2] tabela ranking — linha região #3 → "3*" (faixa regional)`)
    }
  }
}

// Block 3 (footer da tabela) — adicionar nota explicativa do "3*"
{
  const blk = body[3]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("a #3 do ranking aparece como faixa regional") &&
    !txt.includes("o asterisco em #3* indica faixa regional")
  ) {
    blk.content = [
      t("Preço médio de Curitiba capital em março/2026: "),
      b("R$ 11.621/m²"),
      t(" (+6,26% em 12 meses). Fonte principal: "),
      link("https://www.fipe.org.br/pt-br/indices/fipezap/", "FipeZap"),
      t(". Complementar: Quinto Andar Index, Zap Imóveis Index, Secovi-PR. O FipeZap não publica granularidade por bairro de forma padronizada — valores por bairro vêm de intermediárias (MySide, BemBrasil) que compilam o índice oficial com fontes complementares. Por isso, o asterisco em #3* indica que a posição corresponde a uma faixa regional (Mossunguê / Campina do Siqueira / Campo Comprido), e não a um único bairro com posição exata."),
    ]
    log.push(`[block 3] footer da tabela — nota explicativa do "3*" reescrita`)
  }
}

// Block 4 — "Quem só olha preço compra no topo" suavizar
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    ". Quem só olha preço compra no topo. Quem lê variação compra no começo da subida.",
    ". Quem olha apenas preço pode entrar tarde no ciclo; quem combina preço com valorização recente tende a enxergar melhor onde a demanda está se deslocando."
  )
  if (n > 0) log.push(`[block 4] "compra no topo / começo da subida" suavizado`)
}

// Block 9 — "É store of value, não crescimento"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " É store of value, não crescimento.",
    " É reserva de valor, não tese de crescimento."
  )
  if (n > 0) log.push(`[block 9] "store of value, não crescimento" → "reserva de valor, não tese de crescimento"`)
}

// Block 13 — "Comprador do Ahú hoje é quem queria o Batel 5 anos atrás"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Comprador do Ahú hoje é quem queria o Batel 5 anos atrás.",
    "Parte do comprador do Ahú hoje é o mesmo perfil que, alguns anos atrás, olharia primeiro para Batel ou Juvevê."
  )
  if (n > 0) log.push(`[block 13] "comprador do Ahú... Batel 5 anos atrás" suavizado`)
}

// Block 15 — "passou Cabral por 4 posições" + "Charme residencial baixo"
{
  const blk = body[15]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("passou Cabral (que era seu vizinho direto em preço) por 4 posições no ranking") &&
    !txt.includes("Baixa verticalização")
  ) {
    blk.content = [
      t("Juvevê e Ahú são o par vencedor da valorização 2025-2026. Juvevê subiu "),
      b("+11,5% em 12 meses"),
      t(" e se distanciou de bairros tradicionais do eixo norte, como Cabral. Baixa verticalização, ruas arborizadas, boa distância do Centro — perfil residencial tradicional que compradores de 35-50 anos estão pagando acima da média."),
    ]
    log.push(`[block 15] Juvevê — "passou Cabral por 4 posições / Charme residencial baixo" reescrito`)
  }
}

// Block 17 (callout) — "Bigorrilho, Ecoville e Jardim Social"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " Bigorrilho, Ecoville e Jardim Social estão nessa faixa em 2026.",
    " Bigorrilho, parte da região Barigui/Ecoville e Jardim Social estão nessa faixa em 2026."
  )
  if (n > 0) log.push(`[block 17] callout — "Bigorrilho, Ecoville e Jardim Social" → padronizado para "região Barigui/Ecoville"`)
}

// Block 19 — "Antes de descer pro faixa médio"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Antes de descer pro faixa médio, vale quebrar a ordem.",
    "Antes de descer para a faixa média, vale quebrar a ordem."
  )
  if (n > 0) log.push(`[block 19] "pro faixa médio" → "para a faixa média"`)
}

// Block 21 — "obras previstas pra começar até o fim do ano"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "obras previstas pra começar até o fim do ano", "obras previstas para começar até o fim do ano")
  if (n > 0) log.push(`[block 21] "obras previstas pra começar" → "para começar"`)
}

// Block 24 — "é o faixa que mais contém valorização"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, " e é o faixa que mais contém valorização acima do IPCA em 2026.", " e é a faixa que mais concentra valorização acima do IPCA em 2026.")
  }
  if (n > 0) log.push(`[block 24] "o faixa que mais contém" → "a faixa que mais concentra"`)
}

// Block 27 — "porta de entrada pro Alto-Médio com o melhor retorno de aluguel do faixa"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, " é a porta de entrada pro Alto-Médio", " é a porta de entrada para o Alto-Médio")
    n += walkAndReplace(block, "melhor retorno de aluguel do faixa", "melhor retorno de aluguel da faixa")
    n += walkAndReplace(block, " Studios e 1-quarto aqui continuam sendo o melhor ativo de renda pra quem compra investindo.", " Estúdios e imóveis de 1 dormitório aqui continuam sendo o melhor ativo de renda para quem compra para investir.")
  }
  if (n > 0) log.push(`[block 27] Portão — "pro Alto-Médio / do faixa / Studios / pra quem compra investindo"`)
}

// Block 31 — "em 2027 sai do faixa Médio"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "em 2027 sai do faixa Médio", "em 2027 sai da faixa Médio")
  if (n > 0) log.push(`[block 31] "sai do faixa Médio" → "sai da faixa Médio"`)
}

// Block 32 — "é o clássico do faixa"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "é o clássico do faixa", "é o clássico da faixa")
  if (n > 0) log.push(`[block 32] "do faixa" → "da faixa"`)
}

// Block 33 (heading) — "Bairros Acessíveis — abaixo de R$ 6.000/m²"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Bairros Acessíveis — abaixo de R$ 6.000/m²",
    "Bairros acessíveis e de entrada — até R$ 9.000/m²"
  )
  if (n > 0) log.push(`[block 33] heading — corrigida ("abaixo de R$ 6.000" → "até R$ 9.000")`)
}

// Block 34 — "Oito bairros fecham o ranking"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Oito bairros fecham o ranking. Historicamente ignorados pela narrativa de investimento curitibana, mas são onde está acontecendo a história de 2026.",
    "Esta faixa concentra os bairros mais acessíveis do ranking, historicamente ignorados pela narrativa de investimento em Curitiba — mas são onde está acontecendo parte da história de 2026."
  )
  if (n > 0) log.push(`[block 34] "Oito bairros fecham" → versão sem cravar contagem`)
}

// Block 36 — Santa Felicidade "comprador pra morar / pra investir"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Comprador pra morar gosta da tradição; comprador pra investir olha hotelaria",
    "Comprador para morar gosta da tradição; comprador para investir costuma olhar para hotelaria"
  )
  if (n > 0) log.push(`[block 36] Santa Felicidade — "comprador pra morar / pra investir" → "para morar / para investir"`)
}

// Block 37 — "formam o faixa de preço baixo"
{
  let n = 0
  for (const block of body) n += walkAndReplace(block, "formam o faixa de preço baixo", "formam a faixa de preço baixo")
  if (n > 0) log.push(`[block 37] "formam o faixa" → "formam a faixa"`)
}

// Block 39 — "A matemática do m² de venda mente se você compra pra alugar"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "A matemática do m² de venda mente se você compra pra alugar.",
    "O preço do m² de venda não conta a história inteira para quem compra para alugar."
  )
  if (n > 0) log.push(`[block 39] "A matemática do m² de venda mente" suavizado`)
}

// Block 42 — Prado Velho "12% ao ano / AirBnB / 8% e 10% líquidos"
{
  const blk = body[42]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Studios mobiliados rendem até 12% ao ano") &&
    !txt.includes("Estúdios mobiliados podem apresentar rendimento acima da média")
  ) {
    blk.content = [
      b("Prado Velho é a surpresa."),
      t(" Bairro universitário próximo à PUC-PR e à Santa Casa. R$ 53,52/m²/mês coloca o bairro no topo do recorte Secovi-PR consultado — acima de Cascatinha e Alto da Rua XV. Estúdios mobiliados podem apresentar rendimento acima da média em recortes específicos, especialmente perto da PUC-PR e da Santa Casa. Em operações bem geridas de locação por temporada, a rentabilidade pode superar o aluguel tradicional, mas não há índice público padronizado por bairro que permita cravar retorno líquido. Use como oportunidade a validar imóvel a imóvel, levando em conta mobília, vacância, gestão ativa, sazonalidade e regras do condomínio — não como retorno garantido do bairro."),
    ]
    log.push(`[block 42] Prado Velho — "12% / AirBnB / 8-10% líquidos" suavizado`)
  }
}

// Block 43 — Batel "É reserva de valor, não renda"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "É reserva de valor, não renda.",
    "É reserva de valor, não renda mensal."
  )
  if (n > 0) log.push(`[block 43] Batel — "É reserva de valor, não renda" → "não renda mensal"`)
}

// Block 44 (CTA intermediário) — "dado de fechamento real, não média genérica"
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Quer calcular a rentabilidade real de um imóvel?" &&
      block.props?.description?.includes("dado de fechamento real, não média genérica")
    ) {
      block.props.description = "O time FYMOOB estima a rentabilidade cruzando aluguel praticado no bairro, preço de venda atual, tipo de imóvel e custos de aquisição."
      block.props.label = "Calcular rentabilidade"
      log.push(`[block 44] CTA intermediário — "dado de fechamento real, não média genérica" reescrito + label "Calcular rentabilidade"`)
      break
    }
  }
}

// Block 47 — "[Boa Vista] e [Bairro Alto] cobrem família consolidada"
// Block 49 — same paragraph
// Block 50 — bullets, OK
// Block 51 — Ahú venceu Juvevê
// Block 53 — "Pra quem quer renda / Pra valorização"
{
  let n = 0
  for (const block of body) {
    n += walkAndReplace(block, "Pra quem quer renda de aluguel:", "Para quem quer renda de aluguel:")
    n += walkAndReplace(block, ". Pra valorização de 3-5 anos:", ". Para valorização de 3-5 anos:")
  }
  if (n > 0) log.push(`[block 53] "Pra quem quer renda / Pra valorização" → "Para"`)
}

// Block 56 — "compra apartamento na planta em Bigorrilho ou Ecoville" — full rewrite
{
  const blk = body[56]
  const txt = inlineToString(blk?.content)
  if (
    blk?.type === "paragraph" &&
    txt.includes("Se você compra apartamento na planta em Bigorrilho (+2,9%/12m) ou") &&
    !txt.includes("ou em lançamentos da região Barigui/Ecoville")
  ) {
    blk.content = [
      b("Imóvel na planta com INCC acima da valorização do bairro."),
      t(" O INCC-M acumulou +5,81% em 12 meses (FGV, mar/2026). Se você compra apartamento na planta em Bigorrilho (+2,9% em 12 meses) ou em lançamentos da região Barigui/Ecoville (+2,7% no agregado), o reajuste INCC entre o início da obra e a entrega consome a valorização. Compra na planta só faz sentido em bairro valorizando acima do INCC — Ahú, Juvevê, Cidade Industrial e parte da região Barigui/Ecoville se encaixam."),
    ]
    log.push(`[block 56] "Bigorrilho ou Ecoville (+2,7%/12m)" → padronizado para região Barigui/Ecoville`)
  }
}

// Block 57 — "Confundir 'aluguel caro' com 'rentabilidade alta'"
// (already OK)

// Block 65 (FAQ mais baratos) — keep, OK
// Block 67 (FAQ valorização) — already correct
// Block 68 heading — "Onde investir em Curitiba em 2026 pra aluguel?"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "Onde investir em Curitiba em 2026 pra aluguel?",
    "Onde investir em Curitiba em 2026 para renda de aluguel?"
  )
  if (n > 0) log.push(`[block 68] heading FAQ — "pra aluguel" → "para renda de aluguel"`)
}

// Block 69 — "rentabilidade ~12% ao ano em studios mobiliados"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    " (rentabilidade ~12% ao ano em studios mobiliados)",
    " (rentabilidade observada em estúdios mobiliados pode superar a média do agregado, mas depende de mobília, vacância e gestão ativa)"
  )
  if (n > 0) log.push(`[block 69] FAQ — "12% ao ano em studios" suavizado com caveat`)
}

// Block 76 — "scan"
{
  let n = 0
  for (const block of body) n += walkAndReplace(
    block,
    "A tabela do topo é só scan.",
    "A tabela do topo é só uma visão rápida."
  )
  if (n > 0) log.push(`[block 76] "só scan" → "só uma visão rápida"`)
}

// Block 78 (CTA final) — refinar + remover Campina do Siqueira
{
  for (const block of body) {
    if (
      block?.type === "ctaBox" &&
      block.props?.title === "Ver imóveis à venda em Curitiba"
    ) {
      block.props.title = "Quer comparar bairros antes de comprar?"
      block.props.description = "A FYMOOB cruza preço do m², valorização, rentabilidade de aluguel, financiamento e perfil do imóvel para indicar onde a compra faz sentido. Filtros por bairros e regiões em valorização: Ahú, Juvevê, Cidade Industrial e região Barigui/Ecoville."
      block.props.label = "Comparar bairros"
      log.push(`[block 78] CTA final — "Ver imóveis" → "Comparar bairros" (Campina removida, região Barigui/Ecoville adicionada)`)
      break
    }
  }
}

// ──────────────────────────────────────────────────────────────────
// Outras substituições pontuais
// ──────────────────────────────────────────────────────────────────

// Block 40 (tabela aluguel) — "Studios mobiliados, PUC/Santa Casa" + "Studios retrofit"
{
  const blk = body[40]
  if (blk?.type === "table" && blk.content?.rows) {
    let n = 0
    for (const row of blk.content.rows) {
      for (const cell of row.cells || []) {
        n += walkAndReplace(cell, "Studios mobiliados, PUC/Santa Casa", "Estúdios mobiliados, PUC/Santa Casa")
        n += walkAndReplace(cell, "Studios retrofit", "Estúdios retrofit")
      }
    }
    if (n > 0) log.push(`[block 40] tabela aluguel — "Studios" → "Estúdios"`)
  }
}

// Other "Studios" outside block 40
// Block 27 already handled. Remaining: block 42 already rewrote.

// "Premium" stays as category in tables.
// "compra investindo" no block 27 done above.

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
