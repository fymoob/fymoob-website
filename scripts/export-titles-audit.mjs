#!/usr/bin/env node
/**
 * Export de auditoria de títulos SEO FYMOOB.
 *
 * Puxa todos os imóveis ExibirNoSite=Sim com TituloSite atual + campos
 * relevantes pra reescrita (tipo, bairro, quartos, características, infra,
 * valores). Gera markdown organizado pra enviar a agentes especializados
 * em SEO imobiliário pra sugerirem novos títulos seguindo o padrão de
 * 55 chars definido em docs/seo/title-optimization-research.md.
 *
 * Output: docs/seo/titles-audit-YYYY-MM-DD.md
 *
 * Uso: node scripts/export-titles-audit.mjs
 */
import fs from "node:fs"
import path from "node:path"

function loadEnvLocal() {
  try {
    const content = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf-8")
    for (const line of content.split("\n")) {
      const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/)
      if (match) {
        const [, key, rawValue] = match
        if (!process.env[key]) process.env[key] = rawValue.replace(/^["']|["']$/g, "")
      }
    }
  } catch {}
}

loadEnvLocal()
const KEY = process.env.LOFT_API_KEY
const BASE = "https://brunoces-rest.vistahost.com.br"
if (!KEY) {
  console.error("LOFT_API_KEY nao encontrado em .env.local")
  process.exit(1)
}

// Campos da API oficialmente relevantes pro título SEO
// V2 (enriquecido): inclui DescricaoWeb + TextoAnuncio pra agentes entenderem
// o contexto completo de cada imóvel. KeywordsWeb pra saber o que Bruno já
// escolheu. Todas as 81 caracteristicas + 77 infraestrutura via Caracteristicas
// e InfraEstrutura (iteradas por chave "Sim" no output).
const CARD_FIELDS = [
  "Codigo",
  "Referencia",
  "TituloSite",
  "DescricaoWeb",
  "TextoAnuncio",
  "KeywordsWeb",
  "Categoria",
  "BairroComercial",
  "Cidade",
  "UF",
  "Dormitorios",
  "Suites",
  "Vagas",
  "VagasCobertas",
  "TotalBanheiros",
  "AreaPrivativa",
  "AreaTotal",
  "AreaTerreno",
  "Finalidade",
  "Status",
  "ValorVenda",
  "ValorLocacao",
  "ValorCondominio",
  "Empreendimento",
  "Lancamento",
  "DataEntrega",
  "DataLancamento",
  "AnoConstrucao",
  "IdadeDoImovel",
  "Exclusivo",
  "AceitaFinanciamento",
  "AceitaPermuta",
  "Mobiliado",
  "ExibirNoSite",
  "AndarDoApto",
  "Andares",
  "PadraoConstrucao",
]

// V2: não filtramos mais — pegamos TODAS as caracteristicas e infraestruturas
// marcadas como "Sim" no output, agrupadas em listas no markdown.
// Assim os agentes enxergam cada diferencial real do imóvel.
const MAX_DESCRICAO_CHARS = 800 // trunca descrição pra manter arquivo navegável

async function fetchPage(pagina) {
  const pesquisa = JSON.stringify({
    fields: [
      ...CARD_FIELDS,
      "Caracteristicas",
      "InfraEstrutura",
    ],
    filter: { ExibirNoSite: "Sim" },
    paginacao: { pagina, quantidade: 50 },
  })
  const url = new URL(`${BASE}/imoveis/listar`)
  url.searchParams.set("key", KEY)
  url.searchParams.set("pesquisa", pesquisa)
  url.searchParams.set("showtotal", "1")
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`)
  }
  return res.json()
}

console.log("Fetching catalog from Loft...")
const all = []
let pagina = 1
let totalApi = 0
while (true) {
  const data = await fetchPage(pagina)
  if (pagina === 1) totalApi = parseInt(data.total || "0", 10)
  for (const [key, value] of Object.entries(data)) {
    if (["total", "paginas", "pagina", "quantidade"].includes(key)) continue
    if (value && typeof value === "object" && "Codigo" in value) {
      all.push(value)
    }
  }
  console.log(`  page ${pagina}: ${all.length}/${totalApi}`)
  if (all.length >= totalApi || pagina >= Math.ceil(totalApi / 50)) break
  pagina++
}

console.log(`\nTotal coletado: ${all.length} imoveis`)

// Analisa títulos
const stats = {
  total: all.length,
  comTitulo: 0,
  semTitulo: 0,
  dentro55: 0,
  entre56e70: 0,
  acima70: 0,
  caixaAlta: 0,
  comRef: 0,
  comEmpreendimentoNoInicio: 0,
}

function analyzeTitle(t, empreendimento) {
  if (!t || t.trim().length === 0) {
    stats.semTitulo++
    return { len: 0, issues: ["SEM TÍTULO"] }
  }
  stats.comTitulo++
  const len = t.length
  const issues = []

  if (len <= 55) stats.dentro55++
  else if (len <= 70) stats.entre56e70++
  else stats.acima70++

  if (len > 55) issues.push(`${len} chars (+${len - 55})`)

  const upperCount = (t.match(/[A-Z\u00C0-\u00DA]/g) || []).length
  const letterCount = (t.match(/[A-Za-zÀ-ú]/g) || []).length
  if (letterCount > 0 && upperCount / letterCount > 0.5) {
    stats.caixaAlta++
    issues.push("CAIXA ALTA")
  }

  if (/ref\.?\s*\d+|cod\.?\s*\d+/i.test(t)) {
    stats.comRef++
    issues.push("cita REF/COD")
  }

  if (empreendimento && t.trim().toLowerCase().startsWith(String(empreendimento).trim().toLowerCase())) {
    stats.comEmpreendimentoNoInicio++
    issues.push("empreendimento no início")
  }

  return { len, issues }
}

// Converte caracteristicas nested object em lista de TODAS as keys = "Sim"
// (sem filtro — v2 dá aos agentes visão completa das features de cada imóvel).
function pickAllFlags(obj) {
  if (!obj || typeof obj !== "object") return []
  const list = []
  for (const [k, v] of Object.entries(obj)) {
    if (v === "Sim") list.push(k)
  }
  return list.sort()
}

// Humaniza nome de feature (camelCase → "Camel Case")
function humanize(key) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .trim()
}

// Limpa descrição pra caber no markdown: strip tags HTML, normaliza espaços, trunca.
function cleanDescricao(raw, maxChars = MAX_DESCRICAO_CHARS) {
  if (!raw) return null
  const stripped = String(raw)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim()
  if (!stripped) return null
  if (stripped.length <= maxChars) return stripped
  return stripped.slice(0, maxChars).replace(/\s+\S*$/, "") + "…"
}

function formatPrice(raw) {
  const n = parseFloat(raw || "0")
  if (!n || n <= 0) return null
  return `R$ ${n.toLocaleString("pt-BR")}`
}

function formatFinalidade(p) {
  const v = parseFloat(p.ValorVenda || "0")
  const l = parseFloat(p.ValorLocacao || "0")
  if (v > 0 && l > 0) return "Venda e Locação"
  if (v > 0) return "Venda"
  if (l > 0) return "Locação"
  return p.Finalidade || "?"
}

// Agrupa por bairro pra facilitar leitura
const byBairro = new Map()
for (const p of all) {
  const bairro = p.BairroComercial || "(sem bairro)"
  if (!byBairro.has(bairro)) byBairro.set(bairro, [])
  byBairro.get(bairro).push(p)
}

const sortedBairros = [...byBairro.entries()].sort((a, b) => {
  if (b[1].length !== a[1].length) return b[1].length - a[1].length
  return a[0].localeCompare(b[0])
})

const today = new Date().toISOString().split("T")[0]
const outPath = `docs/seo/titles-audit-${today}.md`

// Pre-compute analise de cada imovel (chamar analyzeTitle so 1x por imovel
// pra nao dobrar os stats)
const analise = new Map()
for (const p of all) {
  analise.set(p.Codigo, analyzeTitle(p.TituloSite, p.Empreendimento))
}

const lines = []
lines.push(`# Auditoria de Títulos SEO — Catálogo FYMOOB`)
lines.push(``)
lines.push(`> Gerado em ${today} via \`scripts/export-titles-audit.mjs\`.`)
lines.push(`> Padrão alvo: **55 chars**, estrutura \`[Diferencial] + [Tipo/Quartos] + [Bairro] + [Gancho]\``)
lines.push(`> Referência: [docs/seo/title-optimization-research.md](title-optimization-research.md)`)
lines.push(``)
lines.push(`---`)
lines.push(``)
lines.push(`## Sumário do catálogo`)
lines.push(``)
lines.push(`| Métrica | Valor |`)
lines.push(`|---|---|`)

lines.push(`| Total de imóveis (ExibirNoSite=Sim) | ${stats.total} |`)
lines.push(`| Com TituloSite preenchido | ${stats.comTitulo} |`)
lines.push(`| Sem TituloSite | ${stats.semTitulo} |`)
lines.push(`| **Dentro do padrão (≤55 chars)** | **${stats.dentro55} (${(stats.dentro55/stats.total*100).toFixed(1)}%)** |`)
lines.push(`| Entre 56-70 chars | ${stats.entre56e70} |`)
lines.push(`| Acima de 70 chars (ruim) | ${stats.acima70} |`)
lines.push(`| CAIXA ALTA excessiva | ${stats.caixaAlta} |`)
lines.push(`| Cita Ref/Cod no título | ${stats.comRef} |`)
lines.push(`| Empreendimento no início | ${stats.comEmpreendimentoNoInicio} |`)
lines.push(``)
lines.push(`---`)
lines.push(``)
lines.push(`## Como os agentes devem usar este documento`)
lines.push(``)
lines.push(`Cada imóvel abaixo tem **Código**, **Título atual** (com len e issues detectados) e **Dados relevantes** (tipo, quartos, bairro, características, infra, valor).`)
lines.push(``)
lines.push(`Tarefa do agente: **propor um novo título** pra cada imóvel seguindo:`)
lines.push(``)
lines.push(`- **Limite estrito: 55 chars**`)
lines.push(`- **Estrutura:** \`[Diferencial forte] [Tipo/Quartos] [Bairro] [Gancho opcional]\``)
lines.push(`- **Usar Tier S** (Pronto pra morar, Vista panorâmica, Suíte master, Mobiliado, Lazer completo, Aceita financiamento, etc)`)
lines.push(`- **NUNCA usar Tier C** (Ótimo, Imperdível, Aconchegante, Charmoso, Potencial, CAIXA ALTA, emojis, códigos Ref, preço)`)
lines.push(`- **Empreendimento só no FIM** (nunca no início — pessoa não busca por nome de empreendimento)`)
lines.push(`- **Número concreto** (quartos, m², distância) no meio se possível`)
lines.push(``)
lines.push(`Formato de resposta por imóvel: \`[código] novo título sugerido (N chars)\``)
lines.push(``)
lines.push(`---`)
lines.push(``)
lines.push(`## Imóveis agrupados por bairro`)
lines.push(``)

for (const [bairro, imoveis] of sortedBairros) {
  lines.push(`### ${bairro} (${imoveis.length} imóveis)`)
  lines.push(``)
  for (const p of imoveis) {
    const { len, issues } = analise.get(p.Codigo)
    const cod = p.Codigo
    const ref = p.Referencia ? ` · Ref ${p.Referencia}` : ""
    const tituloLine = p.TituloSite ? `"${p.TituloSite}"` : "*(vazio)*"
    const issuesLine = issues.length > 0 ? ` — **${issues.join(", ")}**` : ""

    lines.push(`#### \`${cod}\`${ref}`)
    lines.push(``)
    lines.push(`**Título atual:** ${tituloLine} *(${len} chars${issuesLine})*`)
    lines.push(``)

    const carac = pickAllFlags(p.Caracteristicas)
    const infra = pickAllFlags(p.InfraEstrutura)
    const specs = []
    if (p.Categoria) specs.push(`**Tipo:** ${p.Categoria}`)
    specs.push(`**Finalidade:** ${formatFinalidade(p)}`)
    if (p.Dormitorios && parseInt(p.Dormitorios) > 0) specs.push(`**Quartos:** ${p.Dormitorios}`)
    if (p.Suites && parseInt(p.Suites) > 0) specs.push(`**Suítes:** ${p.Suites}`)
    if (p.Vagas && parseInt(p.Vagas) > 0) specs.push(`**Vagas:** ${p.Vagas}`)
    if (p.VagasCobertas && parseInt(p.VagasCobertas) > 0) specs.push(`**Vagas cobertas:** ${p.VagasCobertas}`)
    if (p.TotalBanheiros && parseInt(p.TotalBanheiros) > 0) specs.push(`**Banheiros:** ${p.TotalBanheiros}`)
    if (p.AreaPrivativa && parseFloat(p.AreaPrivativa) > 0) specs.push(`**Área privativa:** ${p.AreaPrivativa} m²`)
    if (p.AreaTotal && parseFloat(p.AreaTotal) > 0) specs.push(`**Área total:** ${p.AreaTotal} m²`)
    if (p.AreaTerreno && parseFloat(p.AreaTerreno) > 0) specs.push(`**Área terreno:** ${p.AreaTerreno} m²`)
    if (p.AndarDoApto) specs.push(`**Andar:** ${p.AndarDoApto}`)

    lines.push(specs.join(" · "))
    lines.push(``)

    const meta = []
    if (p.Empreendimento) meta.push(`**Empreendimento:** ${p.Empreendimento}`)
    if (p.Lancamento === "Sim") meta.push(`**Lançamento:** Sim`)
    if (p.DataEntrega) meta.push(`**Entrega:** ${p.DataEntrega}`)
    if (p.DataLancamento) meta.push(`**Data lançamento:** ${p.DataLancamento}`)
    if (p.AnoConstrucao) meta.push(`**Ano construção:** ${p.AnoConstrucao}`)
    if (p.IdadeDoImovel) meta.push(`**Idade:** ${p.IdadeDoImovel}`)
    if (p.PadraoConstrucao) meta.push(`**Padrão:** ${p.PadraoConstrucao}`)
    if (p.Exclusivo === "Sim") meta.push(`**Exclusivo:** Sim`)
    if (p.Mobiliado === "Sim") meta.push(`**Mobiliado:** Sim`)
    if (p.AceitaFinanciamento === "Sim") meta.push(`**Aceita financiamento:** Sim`)
    if (p.AceitaPermuta === "Sim") meta.push(`**Aceita permuta:** Sim`)
    if (meta.length > 0) {
      lines.push(meta.join(" · "))
      lines.push(``)
    }

    const venda = formatPrice(p.ValorVenda)
    const locacao = formatPrice(p.ValorLocacao)
    const valores = []
    if (venda) valores.push(`Venda: ${venda}`)
    if (locacao) valores.push(`Locação: ${locacao}/mês`)
    if (valores.length > 0) {
      lines.push(`**Valores:** ${valores.join(" · ")}`)
      lines.push(``)
    }

    if (carac.length > 0) {
      // Humaniza labels pros agentes lerem facil
      const labeled = carac.map(humanize).join(", ")
      lines.push(`**Características (unidade — ${carac.length}):** ${labeled}`)
      lines.push(``)
    }
    if (infra.length > 0) {
      const labeled = infra.map(humanize).join(", ")
      lines.push(`**Infraestrutura (condomínio — ${infra.length}):** ${labeled}`)
      lines.push(``)
    }

    if (p.KeywordsWeb) {
      lines.push(`**Keywords SEO atuais (Loft):** ${p.KeywordsWeb}`)
      lines.push(``)
    }

    const descricao = cleanDescricao(p.DescricaoWeb)
    if (descricao) {
      lines.push(`**Descrição Web:**`)
      lines.push(``)
      lines.push(`> ${descricao}`)
      lines.push(``)
    }

    const textoAnuncio = cleanDescricao(p.TextoAnuncio, 400)
    if (textoAnuncio && textoAnuncio !== descricao) {
      lines.push(`**Texto do Anúncio:**`)
      lines.push(``)
      lines.push(`> ${textoAnuncio}`)
      lines.push(``)
    }

    lines.push(`---`)
    lines.push(``)
  }
}

lines.push(``)
lines.push(`## Final do catálogo`)
lines.push(``)
lines.push(`Total exportado: **${all.length} imóveis** em **${byBairro.size} bairros**.`)
lines.push(``)

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, lines.join("\n"), "utf-8")

console.log(`\n✅ Exportado pra ${outPath}`)
console.log(`   ${all.length} imoveis em ${byBairro.size} bairros`)
console.log(`   ${stats.dentro55} ja dentro do padrao (≤55 chars), ${stats.acima70} acima de 70 chars`)
