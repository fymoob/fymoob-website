/**
 * Sprint cirurgica — aplica 9 alteracoes editoriais no artigo
 * `financiamento-caixa-itau-bradesco-comparativo` conforme aprovacao
 * do Vinicius (02/05/2026).
 *
 * Mudancas:
 *   #7  Adicionar CalloutBox "Resposta rapida" antes do ranking
 *   #8  Reformular MCMV "Caixa e o unico banco" -> "Caixa comecou a operar"
 *   #9  Adicionar secao "Qual banco escolher pelo seu perfil" com tabela
 *   #10 Adicionar secao "SAC ou Price: qual tabela usar?"
 *   #11 Atualizar CTA "5 simulacoes" -> "Comparar meu financiamento"
 *   #12 Adicionar 2 FAQ + reformular pergunta head
 *   #13 Suavizar tom: pegadinhas, todo banco esconde, banco errado, etc
 *   #14 Adicionar nota metodologica (CalloutBox)
 *   #15 Title ja foi atualizado em script anterior (Sprint 1)
 *
 * IDEMPOTENTE: roda multiplas vezes sem duplicar nada (busca por
 * marcadores antes de aplicar). Use --dry-run pra ver o que mudaria.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { randomUUID } from "node:crypto"

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
  .select("id, body, slug, status")
  .eq("slug", SLUG)
  .single()
if (readErr || !article) {
  console.error("Erro lendo artigo:", readErr)
  process.exit(1)
}

const body = JSON.parse(JSON.stringify(article.body)) // deep clone
const log = []

// ────────────────────────────────────────────────────────────────────
// Helpers de manipulacao de inline content
// ────────────────────────────────────────────────────────────────────
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

// Modifica texto inline de um bloco (apenas paragraphs/headings/listItems
// onde content e array). Substitui a string inteira por nova.
function setInlineText(block, newText) {
  block.content = inlineFromString(newText)
}

// Modifica trecho dentro do inline preservando os links e estilos.
// Faz replace de pattern por replacement na concatenacao final.
// Suporta apenas substituicao em texto puro (nao toca em links).
function replaceInlineText(block, pattern, replacement) {
  if (!Array.isArray(block.content)) return false
  for (const item of block.content) {
    if (item?.type === "text" && typeof item.text === "string") {
      if (item.text.includes(pattern)) {
        item.text = item.text.replaceAll(pattern, replacement)
        return true
      }
    }
  }
  return false
}

// Encontra o indice de um bloco por matching de texto (substring)
function findBlockIndex(predicate, startFrom = 0) {
  for (let i = startFrom; i < body.length; i++) {
    if (predicate(body[i], i)) return i
  }
  return -1
}

function blockContainsText(text) {
  return (b) => {
    const s = inlineToString(b.content)
    return s.includes(text)
  }
}

// ────────────────────────────────────────────────────────────────────
// Builders de blocos
// ────────────────────────────────────────────────────────────────────
function makeParagraph(text) {
  return {
    id: randomUUID(),
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: inlineFromString(text),
    children: [],
  }
}

function makeHeading(text, level = 2) {
  return {
    id: randomUUID(),
    type: "heading",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
      level,
    },
    content: inlineFromString(text),
    children: [],
  }
}

function makeCalloutBox(text, variant = "info") {
  return {
    id: randomUUID(),
    type: "calloutBox",
    props: { variant },
    content: inlineFromString(text),
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
      rows: rows.map((cells) => ({
        cells: cells.map((c) => makeTableCell(c)),
      })),
    },
    children: [],
  }
}

// ────────────────────────────────────────────────────────────────────
// Mudanca #7 — Inserir CalloutBox "Resposta rapida" antes do ranking
// ────────────────────────────────────────────────────────────────────
{
  const RESPOSTA_TEXT =
    "Resposta rápida: em abril/2026, a Caixa tende a ser a melhor opção para quem busca menor taxa, especialmente com FGTS, Pró-Cotista ou Minha Casa Minha Vida. O BRB aparece como alternativa competitiva para quem aceita processo digital. O Itaú vale para quem tem pressa ou precisa financiar até 90%. Santander e Bradesco só devem ser descartados depois de comparar o CET real."

  const alreadyExists = body.some(
    (b) => b.type === "calloutBox" && inlineToString(b.content).startsWith("Resposta rápida")
  )
  if (alreadyExists) {
    log.push("#7 SKIP — CalloutBox 'Resposta rápida' já existe")
  } else {
    const rankingIdx = findBlockIndex(
      (b) => b.type === "heading" && inlineToString(b.content).includes("Ranking completo")
    )
    if (rankingIdx === -1) {
      log.push("#7 ERRO — heading 'Ranking completo' não encontrada")
    } else {
      body.splice(rankingIdx, 0, makeCalloutBox(RESPOSTA_TEXT, "info"))
      log.push(`#7 OK — CalloutBox 'Resposta rápida' inserido antes do bloco ${rankingIdx}`)
    }
  }
}

// ────────────────────────────────────────────────────────────────────
// Mudanca #8 — MCMV: trocar "Caixa e o unico banco" por wording oficial
// ────────────────────────────────────────────────────────────────────
{
  const idx = findBlockIndex(
    (b) =>
      b.type === "bulletListItem" &&
      inlineToString(b.content).includes("Caixa é o único banco que opera a Faixa 4 ampliada")
  )
  if (idx === -1) {
    // Talvez ja foi reescrito; verifica se existe a versao nova
    const novoExiste = findBlockIndex(
      (b) =>
        b.type === "bulletListItem" &&
        inlineToString(b.content).includes("Caixa começou a operar as novas condições do MCMV")
    )
    if (novoExiste !== -1) {
      log.push("#8 SKIP — wording novo já presente")
    } else {
      log.push("#8 ERRO — bullet do MCMV não encontrado")
    }
  } else {
    // Substitui o conteudo. Mantem o link interno se houver
    const novoTexto =
      "Minha Casa Minha Vida: a Caixa começou a operar as novas condições do MCMV Faixa 4 em 22/04/2026, com renda familiar de até R$ 13 mil e imóveis de até R$ 600 mil."
    // Vou reconstruir o content preservando o link interno [Veja as novas regras...]
    body[idx].content = [
      { type: "text", text: novoTexto + " ", styles: {} },
      {
        type: "link",
        href: "/blog/como-financiar-minha-casa-minha-vida",
        content: [
          { type: "text", text: "Veja as novas regras do MCMV 2026", styles: {} },
        ],
      },
      { type: "text", text: ".", styles: {} },
    ]
    log.push("#8 OK — bullet MCMV reformulado preservando link interno")
  }
}

// ────────────────────────────────────────────────────────────────────
// Mudanca #9 — Inserir secao "Qual banco escolher pelo seu perfil"
// ────────────────────────────────────────────────────────────────────
{
  const alreadyExists = body.some(
    (b) =>
      b.type === "heading" &&
      inlineToString(b.content).includes("Qual banco escolher pelo seu perfil")
  )
  if (alreadyExists) {
    log.push("#9 SKIP — seção 'Qual banco escolher pelo seu perfil' já existe")
  } else {
    const cetIdx = findBlockIndex(
      (b) =>
        b.type === "heading" &&
        inlineToString(b.content).startsWith("CET > taxa nominal")
    )
    if (cetIdx === -1) {
      log.push("#9 ERRO — heading 'CET > taxa nominal' não encontrada")
    } else {
      const novosBlocos = [
        makeHeading("Qual banco escolher pelo seu perfil?"),
        makeParagraph(
          "Com as taxas, prazos e CETs comparados, fica mais fácil traduzir tudo isso em decisão prática. Resumo por perfil de comprador:"
        ),
        makeTable([
          ["Perfil do comprador", "Banco que deve simular primeiro", "Por quê"],
          ["Primeiro imóvel até R$ 600 mil", "Caixa", "MCMV, FGTS e taxa menor"],
          ["Tem 3+ anos de FGTS", "Caixa", "Possibilidade de Pró-Cotista (8,66%)"],
          ["Precisa de aprovação rápida", "Itaú ou Bradesco", "Processo digital mais ágil"],
          ["Tem só 10% de entrada", "Itaú", "Pode financiar até 90%"],
          [
            "Não tem relacionamento bancário forte",
            "BRB",
            "Taxa competitiva sem depender tanto de pacote",
          ],
          [
            "Autônomo ou renda complexa",
            "Santander/Bradesco",
            "Mais flexibilidade documental",
          ],
          [
            "Quer atendimento presencial",
            "Caixa ou Bradesco",
            "Rede física mais ampla em Curitiba",
          ],
        ]),
        makeParagraph(
          "Esta tabela é ponto de partida — não substitui simulação real com seu CPF e seu imóvel. Bonificação relacional, score de crédito e idade podem mudar a ordem em casos específicos."
        ),
      ]
      body.splice(cetIdx, 0, ...novosBlocos)
      log.push(
        `#9 OK — seção 'Qual banco escolher pelo seu perfil' (${novosBlocos.length} blocos) inserida antes do bloco ${cetIdx}`
      )
    }
  }
}

// ────────────────────────────────────────────────────────────────────
// Mudanca #10 — Inserir secao "SAC ou Price"
// Posicao: apos paragraph que explica a simulacao SAC e antes do callout warning
// ────────────────────────────────────────────────────────────────────
{
  const alreadyExists = body.some(
    (b) =>
      b.type === "heading" &&
      inlineToString(b.content).includes("SAC ou Price")
  )
  if (alreadyExists) {
    log.push("#10 SKIP — seção 'SAC ou Price' já existe")
  } else {
    // Inserir apos paragraph "Esta simulação usa taxa nominal, tabela SAC..."
    const idx = findBlockIndex(
      (b) =>
        b.type === "paragraph" &&
        inlineToString(b.content).includes("Esta simulação usa taxa nominal, tabela SAC")
    )
    if (idx === -1) {
      log.push("#10 ERRO — paragraph que menciona SAC não encontrado")
    } else {
      const novosBlocos = [
        makeHeading("SAC ou Price: qual tabela usar?"),
        makeParagraph(
          "Na tabela SAC, a parcela começa mais alta e cai ao longo do tempo, porque a amortização é constante. Na Price, a parcela começa menor e fica mais estável, mas o total de juros costuma ser maior. Para comparar bancos com justiça, use sempre a mesma tabela, o mesmo prazo e o mesmo valor financiado. As simulações deste post usam SAC."
        ),
      ]
      body.splice(idx + 1, 0, ...novosBlocos)
      log.push(
        `#10 OK — seção 'SAC ou Price' (${novosBlocos.length} blocos) inserida após bloco ${idx}`
      )
    }
  }
}

// ────────────────────────────────────────────────────────────────────
// Mudanca #11 — Atualizar CTA "Quer as 5 simulacoes"
// ────────────────────────────────────────────────────────────────────
{
  const idx = findBlockIndex(
    (b) =>
      b.type === "ctaBox" &&
      typeof b.props?.title === "string" &&
      b.props.title.includes("5 simulações")
  )
  if (idx === -1) {
    // Talvez ja foi atualizado
    const novoExiste = findBlockIndex(
      (b) =>
        b.type === "ctaBox" &&
        typeof b.props?.title === "string" &&
        b.props.title.includes("Comparar meu financiamento")
    )
    if (novoExiste !== -1) {
      log.push("#11 SKIP — CTA já foi atualizado")
    } else {
      log.push("#11 ERRO — ctaBox '5 simulações' não encontrado")
    }
  } else {
    body[idx].props = {
      ...body[idx].props,
      title: "Quer comparar os bancos antes de fazer proposta?",
      description:
        "A FYMOOB simula Caixa, BRB, Itaú, Santander e Bradesco com os dados reais do imóvel e entrega uma comparação por CET, parcela inicial, prazo, entrada e custo total. Sem custo para quem compra com a gente em Curitiba.",
      label: "Comparar meu financiamento",
      // mantém href existente
    }
    log.push(`#11 OK — CTA bloco ${idx} atualizado (title + description + label)`)
  }
}

// ────────────────────────────────────────────────────────────────────
// Mudanca #12 — Reformular FAQ #1 + adicionar 2 FAQs novas
// ────────────────────────────────────────────────────────────────────
{
  // 12a — Reformular pergunta #1
  const faqHeadingIdx = findBlockIndex(
    (b) =>
      b.type === "heading" &&
      inlineToString(b.content) ===
        "Qual é o banco com a menor taxa de financiamento imobiliário em 2026?"
  )
  if (faqHeadingIdx === -1) {
    const reformuladoExiste = findBlockIndex(
      (b) =>
        b.type === "heading" &&
        inlineToString(b.content).startsWith(
          "Qual banco tem o financiamento imobiliário mais barato"
        )
    )
    if (reformuladoExiste !== -1) {
      log.push("#12a SKIP — pergunta #1 já reformulada")
    } else {
      log.push("#12a ERRO — pergunta #1 não encontrada")
    }
  } else {
    setInlineText(
      body[faqHeadingIdx],
      "Qual banco tem o financiamento imobiliário mais barato em 2026?"
    )
    log.push(`#12a OK — pergunta #1 reformulada (bloco ${faqHeadingIdx})`)
  }

  // 12b — Adicionar 2 perguntas novas antes da heading "Próximo passo"
  const novasFAQsExistem = body.some(
    (b) =>
      b.type === "heading" &&
      inlineToString(b.content).startsWith("Posso financiar imóvel usado pelo Minha Casa")
  )
  if (novasFAQsExistem) {
    log.push("#12b SKIP — FAQs novas já existem")
  } else {
    const proximoIdx = findBlockIndex(
      (b) =>
        b.type === "heading" &&
        inlineToString(b.content) === "Próximo passo"
    )
    if (proximoIdx === -1) {
      log.push("#12b ERRO — heading 'Próximo passo' não encontrada")
    } else {
      const novasFAQs = [
        makeHeading("Posso financiar imóvel usado pelo Minha Casa Minha Vida?", 3),
        makeParagraph(
          "Sim, dependendo da faixa, do valor do imóvel, da renda familiar e das regras vigentes do programa. O imóvel precisa estar habitável (com Habite-se ou CVCO emitido), dentro do teto da sua faixa MCMV e com matrícula sem pendências. Em Curitiba, parte dos imóveis vendidos via MCMV é de usados — bairros consolidados costumam ter pouco lançamento dentro do teto de cada faixa."
        ),
        makeHeading("Vale a pena financiar com o banco onde já tenho conta?", 3),
        makeParagraph(
          "Só se o CET final for competitivo. Relacionamento bancário pode reduzir a taxa nominal em 0,3 a 0,5 ponto percentual via bonificação relacional, mas isso não garante menor custo total. Em alguns casos, mudar pra outro banco com taxa pior na ponta resulta em CET menor por causa de seguros ou tarifas. Compare sempre o CET por escrito antes de decidir."
        ),
      ]
      body.splice(proximoIdx, 0, ...novasFAQs)
      log.push(`#12b OK — 2 FAQs novas (${novasFAQs.length} blocos) inseridas antes de 'Próximo passo'`)
    }
  }
}

// ────────────────────────────────────────────────────────────────────
// Mudanca #13 — Suavizar tom "internet"
// Substituicoes pontuais em blocos especificos.
// ────────────────────────────────────────────────────────────────────
{
  const replacements = [
    // pegadinhas
    {
      from: "ainda o mais barato, mas com 3 pegadinhas",
      to: "ainda o mais barato, mas com 3 pontos de atenção",
    },
    { from: "As 3 pegadinhas", to: "3 pontos de atenção" },
    // todo banco esconde
    {
      from: "Agora, uma verdade que todo banco esconde:",
      to: "Agora, um ponto que nem sempre aparece na primeira simulação:",
    },
    // banco com a pior taxa do mercado
    {
      from: "banco com a pior taxa do mercado",
      to: "banco com a pior das taxas que comparamos",
    },
    {
      from: "Inter (pior taxa do mercado)",
      to: "Inter (pior das taxas que comparamos)",
    },
    // a maior dos 5 grandes bancos
    {
      from: "a maior dos 5 grandes bancos",
      to: "a maior entre os 5 que comparamos em abril/2026",
    },
    // sem enrolação
    { from: "sem custo e sem enrolação", to: "sem custo e com orientação objetiva" },
    // (texto "banco errado custa R$ 162 mil" ja foi removido em edicao anterior do post)
    // mesmo que o gerente te ligue 3 vezes
    {
      from: "mesmo que seja chato, mesmo que você já seja correntista há 10 anos, mesmo que o gerente te ligue 3 vezes",
      to: "mesmo que pareça inconveniente, mesmo sendo correntista de longa data",
    },
  ]

  // Busca recursiva em todos os locais onde texto aparece:
  // - block.content (paragraph/heading/listItem inline)
  // - block.props.title/description/label/sources (custom blocks)
  // - block.content.rows[i].cells[j].content (tableCells)
  function walkAndReplaceText(block, from, to) {
    let count = 0
    // 1. inline content
    if (Array.isArray(block.content)) {
      for (const item of block.content) {
        if (item?.type === "text" && typeof item.text === "string" && item.text.includes(from)) {
          item.text = item.text.replaceAll(from, to)
          count++
        }
        // texto dentro de link
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
    // 2. tableCells dentro de table
    if (block.type === "table" && block.content?.rows) {
      for (const row of block.content.rows) {
        for (const cell of row.cells || []) {
          if (Array.isArray(cell)) {
            // formato legado
            for (const item of cell) {
              if (item?.type === "text" && typeof item.text === "string" && item.text.includes(from)) {
                item.text = item.text.replaceAll(from, to)
                count++
              }
            }
          } else if (cell?.content) {
            // formato wrapped
            for (const item of cell.content) {
              if (item?.type === "text" && typeof item.text === "string" && item.text.includes(from)) {
                item.text = item.text.replaceAll(from, to)
                count++
              }
            }
          }
        }
      }
    }
    // 3. props textuais (CTA, callout, methodology, changelog)
    if (block.props) {
      for (const key of ["title", "description", "label", "text", "period", "sample", "treatment", "sources"]) {
        if (typeof block.props[key] === "string" && block.props[key].includes(from)) {
          block.props[key] = block.props[key].replaceAll(from, to)
          count++
        }
      }
    }
    return count
  }

  for (const { from, to } of replacements) {
    let count = 0
    for (const block of body) count += walkAndReplaceText(block, from, to)
    if (count > 0) {
      log.push(`#13 OK — "${from.slice(0, 50)}..." substituído (${count} ocorrências)`)
    } else {
      // Pode ja ter sido aplicado — checa se o "to" ja existe
      const toExists = body.some(
        (b) =>
          Array.isArray(b.content) &&
          b.content.some((i) => i?.type === "text" && typeof i.text === "string" && i.text.includes(to.slice(0, 30)))
      )
      if (toExists) {
        log.push(`#13 SKIP — "${from.slice(0, 50)}..." já substituído`)
      } else {
        log.push(`#13 WARN — "${from.slice(0, 50)}..." não encontrado e novo wording também não`)
      }
    }
  }
}

// ────────────────────────────────────────────────────────────────────
// Mudanca #14 — Adicionar nota metodologica
// CalloutBox info logo apos o paragraph "Taxas a partir de"
// ────────────────────────────────────────────────────────────────────
{
  const alreadyExists = body.some(
    (b) =>
      b.type === "calloutBox" &&
      inlineToString(b.content).startsWith("Metodologia: levantamento feito")
  )
  if (alreadyExists) {
    log.push("#14 SKIP — nota metodológica já existe")
  } else {
    const idx = findBlockIndex(
      (b) =>
        b.type === "paragraph" &&
        inlineToString(b.content).includes("Taxas \"a partir de\"")
    )
    if (idx === -1) {
      log.push("#14 ERRO — paragraph 'Taxas a partir de' não encontrado")
    } else {
      const calloutMetodologico = makeCalloutBox(
        "Metodologia: levantamento feito em abril/2026 com taxas públicas dos 5 bancos, simuladores oficiais e agregadores independentes (Larya, MySide, SpImóvel). As taxas são \"a partir de\" e podem variar por idade, renda, relacionamento, score de crédito, valor de entrada, tipo de imóvel e cidade. Para decisão final, compare sempre o CET enviado pelo banco na proposta.",
        "info"
      )
      body.splice(idx + 1, 0, calloutMetodologico)
      log.push(`#14 OK — nota metodológica inserida após bloco ${idx}`)
    }
  }
}

// ────────────────────────────────────────────────────────────────────
// Print do log + commit
// ────────────────────────────────────────────────────────────────────
console.log(`\n${DRY_RUN ? "[DRY-RUN] " : ""}Aplicando alterações em ${SLUG}\n`)
console.log(`Status: ${article.status}`)
console.log(`Blocos antes: ${article.body.length}`)
console.log(`Blocos depois: ${body.length}\n`)
for (const line of log) console.log(line)

if (DRY_RUN) {
  console.log(`\n[DRY-RUN] sem write`)
  process.exit(0)
}

const { error: updErr } = await sb
  .from("articles")
  .update({ body })
  .eq("id", article.id)

if (updErr) {
  console.error(`\n❌ Erro no UPDATE:`, updErr)
  process.exit(1)
}

console.log(`\n✓ Body atualizado no Supabase. Total de blocos: ${body.length}`)

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
