/**
 * Read-only — extrai texto completo de todos os artigos publicados e
 * detecta claims potencialmente arriscadas:
 *
 * 1. SUPERLATIVOS: o maior/menor, líder absoluto, primeiro/último,
 *    mais barato, mais caro
 * 2. PERCENTUAIS DE MERCADO sem fonte: "X% dos imóveis", "% do mercado"
 * 3. RANKINGS NACIONAIS: "#1 do Brasil", "líder do setor"
 * 4. AFIRMACOES UNIVERSAIS: sempre, nunca, todos, ninguém, todo banco
 * 5. POSICOES NUMERICAS: "2ª capital", "3º colocado" (sem ano/fonte)
 * 6. AFIRMACOES JURIDICAS: "tem direito", "obriga", "garante"
 *    (precisam de citacao de lei/STJ)
 *
 * Output: docs/audit/absolute-claims-2026-05-02.md (markdown navegavel
 * com slug, contexto, claim, categoria de risco)
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import fs from "node:fs"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data: articles, error } = await sb
  .from("articles")
  .select("slug, title, body")
  .eq("status", "published")
  .order("slug")

if (error) {
  console.error(error)
  process.exit(1)
}

console.log(`\n=== ${articles.length} artigos publicados ===\n`)

// Patterns suspeitos. Ordem importa — patterns mais especificos primeiro.
const PATTERNS = [
  // 1. Superlativos absolutos
  {
    cat: "SUPERLATIVO",
    re: /\b(o|a) (maior|menor|melhor|pior|mais (barato|caro|rapido|forte|antig[oa]|recente|robusto)|principal|mais |único|única) [a-záéíóúçãõâêô]+/gi,
    note: "afirmacao superlativa — exige fonte ou suavizar",
  },
  {
    cat: "SUPERLATIVO",
    re: /\b(líder|lider) (absoluto|nacional|do (setor|mercado|brasil|país)|geral)/gi,
    note: "claim de lideranca de mercado — exige fonte",
  },
  {
    cat: "SUPERLATIVO",
    re: /\bdomina\s+\d+%|\bdomina\s+(o|a|do|da)/gi,
    note: "afirmacao de dominacao de mercado",
  },

  // 2. Percentuais sem fonte aparente
  {
    cat: "PERCENTUAL_MERCADO",
    re: /\b(mais de |cerca de |aproximadamente )?\d{1,3}([,\.]\d+)?% (do(s)? (imóv[eé]is|merc[oa]do|brasil|brasileiros|consumidores|fam[ií]lias|finac?iamentos?|empr[eé]stimos?))/gi,
    note: "percentual de mercado — exige citacao",
  },

  // 3. Posicoes numericas em ranking
  {
    cat: "RANKING_NACIONAL",
    re: /\b\d[ºªa]?\s+(capital|cidade|estado|munic[ií]pio|banco|imobili[áa]ria|construtora|empresa) (do (brasil|pa[ií]s|mundo)|nacional)/gi,
    note: "posicao em ranking nacional — exige fonte",
  },
  {
    cat: "RANKING_NACIONAL",
    re: /\b#\d\s+(no|do)\s+(ranking|brasil|pa[ií]s|mercado|setor)/gi,
    note: "ranking #X — exige fonte",
  },

  // 4. Universais
  {
    cat: "UNIVERSAL",
    re: /\b(sempre|nunca|todos os|todas as|nenhum[ao] |ningu[eé]m|qualquer (banco|imov[eé]l|comprador|cliente))/gi,
    note: "afirmacao universal — pode ter excecao",
  },

  // 5. Juridico forte sem citacao explicita
  {
    cat: "JURIDICO",
    re: /\b(tem direito (a|de|à)|garante (que|ao|a)|obriga (a|o)|imp[oõ]e|determina (que|a)|stj decidiu|stj mandou)/gi,
    note: "afirmacao juridica forte — exige citacao de lei/decisao",
  },

  // 6. Tempo absoluto / declaracao prospectiva
  {
    cat: "PROSPECTIVO",
    re: /\b(vai (ser|virar|liderar|dominar|cair|subir|aumentar|diminuir)|sera (o|a)|com certeza|certamente)\b/gi,
    note: "previsao categorica do futuro",
  },

  // 7. Comparativos entre empresas/marcas
  {
    cat: "COMPARATIVO_MARCA",
    re: /\b(caixa|ita[uú]|bradesco|santander|brb|banco do brasil|bb)\s+(é|e)\s+(o|a|um[a]?)\s+(banco|melhor|mais|principal|maior|menor)/gi,
    note: "afirmacao comparativa entre bancos especificos",
  },
]

const allFindings = []
const byArticle = {}

function extractText(blocks) {
  if (!Array.isArray(blocks)) return ""
  const parts = []
  function walk(block) {
    if (!block || typeof block !== "object") return
    // tabela
    if (block.type === "table" && block.content?.rows) {
      for (const row of block.content.rows) {
        for (const cell of row.cells || []) {
          if (Array.isArray(cell)) {
            for (const it of cell) parts.push(it.text || "")
          } else if (cell?.content) {
            for (const it of cell.content) parts.push(it.text || "")
          }
        }
      }
      return
    }
    // bloco com content[] de inline
    if (Array.isArray(block.content)) {
      for (const item of block.content) {
        if (typeof item?.text === "string") parts.push(item.text)
        if (Array.isArray(item?.content)) {
          for (const sub of item.content) parts.push(sub?.text || "")
        }
      }
    }
    // bloco com children
    if (Array.isArray(block.children)) {
      for (const c of block.children) walk(c)
    }
    // calloutBox content e {text, ...}
    if (block.props?.text) parts.push(block.props.text)
    if (block.props?.title) parts.push(block.props.title)
    if (block.props?.description) parts.push(block.props.description)
  }
  for (const b of blocks) walk(b)
  return parts.join(" ")
}

for (const a of articles) {
  const text = extractText(a.body)
  byArticle[a.slug] = { text, findings: [] }

  for (const p of PATTERNS) {
    const matches = [...text.matchAll(p.re)]
    for (const m of matches) {
      const start = Math.max(0, m.index - 80)
      const end = Math.min(text.length, m.index + m[0].length + 80)
      const ctx = text.slice(start, end).replace(/\s+/g, " ").trim()
      const finding = {
        slug: a.slug,
        cat: p.cat,
        match: m[0].trim(),
        context: ctx,
        note: p.note,
      }
      allFindings.push(finding)
      byArticle[a.slug].findings.push(finding)
    }
  }
}

// Dedupe — mesma frase pode bater em mais de um pattern
const seen = new Set()
const dedup = allFindings.filter((f) => {
  const k = `${f.slug}::${f.context}`
  if (seen.has(k)) return false
  seen.add(k)
  return true
})

console.log(`Total findings (dedup): ${dedup.length}\n`)

// Resumo por categoria
const byCat = {}
for (const f of dedup) byCat[f.cat] = (byCat[f.cat] ?? 0) + 1
console.log("Por categoria:")
for (const [c, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${c}: ${n}`)
}

// Resumo por artigo
console.log("\nPor artigo:")
for (const slug of Object.keys(byArticle).sort()) {
  const n = byArticle[slug].findings.length
  console.log(`  ${n.toString().padStart(3)} ${slug}`)
}

// Output markdown completo
const md = []
md.push(`# Auditoria de claims absolutas — ${new Date().toISOString().slice(0, 10)}`)
md.push(``)
md.push(`Total: **${dedup.length}** claims potencialmente arriscadas em **${articles.length}** artigos publicados.`)
md.push(``)
md.push(`Categorias de risco:`)
for (const [c, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
  md.push(`- **${c}**: ${n}`)
}
md.push(``)
md.push(`---`)
md.push(``)

for (const slug of Object.keys(byArticle).sort()) {
  const findings = byArticle[slug].findings
  if (findings.length === 0) continue
  md.push(`## ${slug} (${findings.length})`)
  md.push(``)
  md.push(`| # | Categoria | Trecho | Contexto |`)
  md.push(`|---|---|---|---|`)
  // dedup intra-artigo
  const ssn = new Set()
  let i = 1
  for (const f of findings) {
    const k = f.context
    if (ssn.has(k)) continue
    ssn.add(k)
    const ctxEsc = f.context.replace(/\|/g, "\\|").slice(0, 200)
    md.push(`| ${i++} | ${f.cat} | \`${f.match}\` | ${ctxEsc}${f.context.length > 200 ? "..." : ""} |`)
  }
  md.push(``)
}

const outDir = "docs/audit"
fs.mkdirSync(outDir, { recursive: true })
const outFile = `${outDir}/absolute-claims-2026-05-02.md`
fs.writeFileSync(outFile, md.join("\n"))
console.log(`\n✓ Markdown salvo em ${outFile}`)
