/**
 * Sprint 1 SEO — aplica seo_meta_title + seo_meta_description em 6 posts
 * conforme aprovacao do Vinicius (02/05/2026).
 *
 * Usa o servico Supabase admin direto. Apos UPDATE, pinga IndexNow pra
 * Google reprocessar os snippets em <24h em vez de aguardar crawl natural.
 *
 * Idempotente: re-rodar nao quebra nada (so faz UPDATE com mesmos valores).
 *
 * Uso: node scripts/apply-sprint1-snippets.mjs --dry-run
 *      node scripts/apply-sprint1-snippets.mjs
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com.br"

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const snippets = [
  {
    slug: "financiamento-caixa-itau-bradesco-comparativo",
    title: "Melhor banco para financiar imóvel em 2026: comparativo",
    description:
      "Compare Caixa, Itaú, BRB, Santander e Bradesco: taxa, CET, prazo máximo e impacto da escolha no custo total do financiamento em 2026.",
  },
  {
    slug: "custo-de-vida-curitiba",
    title: "Quanto custa morar em Curitiba em 2026? Guia completo",
    description:
      "Solteiro, casal, família e aposentado: custo real em abril/2026 com aluguel, mercado, transporte, saúde, lazer e contas básicas.",
  },
  {
    slug: "itbi-curitiba-valor-como-pagar",
    title: "ITBI em Curitiba 2026: alíquota, cálculo e como pagar",
    description:
      "Entenda a alíquota de 2,7%, a base de cálculo, quando contestar o valor venal e como pagar o ITBI em Curitiba passo a passo.",
  },
  {
    slug: "mercado-imobiliario-curitiba-2026",
    title: "Mercado imobiliário em Curitiba 2026: vale comprar?",
    description:
      "Curitiba valorizou forte, bairros mudaram de posição e o crédito ficou mais pesado. Veja uma leitura realista antes de comprar em 2026.",
  },
  {
    slug: "preco-metro-quadrado-curitiba-bairro",
    title: "Preço do m² em Curitiba 2026: ranking por bairro",
    description:
      "Batel lidera, Ahú dispara e Campina do Siqueira surpreende. Veja o preço do m² por bairro e onde ainda há oportunidade. Dados FipeZap.",
  },
  {
    slug: "checklist-compra-imovel",
    title: "Checklist para comprar imóvel: evite prejuízo antes de assinar",
    description:
      "Veja os documentos, dívidas e riscos que você precisa conferir antes da escritura para evitar prejuízo na compra do imóvel.",
  },
]

console.log(`\n${DRY_RUN ? "[DRY-RUN] " : ""}Sprint 1 — aplicando 6 snippets...\n`)

const updatedSlugs = []

for (const s of snippets) {
  const { data: pre, error: readErr } = await sb
    .from("articles")
    .select("seo_meta_title, seo_meta_description, status")
    .eq("slug", s.slug)
    .maybeSingle()

  if (readErr || !pre) {
    console.error(`❌ ${s.slug}: nao encontrado`)
    continue
  }

  console.log(`[${pre.status}] ${s.slug}`)
  console.log(`  Title (${s.title.length}c): ${s.title}`)
  console.log(`  Desc  (${s.description.length}c): ${s.description}`)

  const changed =
    pre.seo_meta_title !== s.title ||
    pre.seo_meta_description !== s.description

  if (!changed) {
    console.log(`  → ja igual (no-op)`)
    continue
  }

  if (DRY_RUN) {
    console.log(`  → [DRY-RUN] sem write\n`)
    continue
  }

  const { error: updErr } = await sb
    .from("articles")
    .update({
      seo_meta_title: s.title,
      seo_meta_description: s.description,
    })
    .eq("slug", s.slug)

  if (updErr) {
    console.error(`  ❌ erro: ${updErr.message}`)
  } else {
    console.log(`  ✓ atualizado`)
    if (pre.status === "published") updatedSlugs.push(s.slug)
  }
  console.log()
}

if (DRY_RUN || updatedSlugs.length === 0) {
  console.log(`\nSnippets aplicados: ${updatedSlugs.length}`)
  process.exit(0)
}

// IndexNow ping pros 6 slugs publicados — Google reprocessa em <24h
console.log(`\nPingando IndexNow pra ${updatedSlugs.length} URL(s)...`)
const indexnowKey = process.env.INDEXNOW_KEY
if (!indexnowKey) {
  console.log(`⚠️  INDEXNOW_KEY nao setada — pulei o ping (Google indexa via crawl normal)`)
} else {
  const urls = updatedSlugs.map((slug) => `${SITE_URL}/blog/${slug}`)
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: SITE_URL.replace(/^https?:\/\//, ""),
        key: indexnowKey,
        keyLocation: `${SITE_URL}/${indexnowKey}.txt`,
        urlList: urls,
      }),
    })
    if (res.ok) console.log(`✓ IndexNow OK (${res.status})`)
    else console.log(`⚠️  IndexNow ${res.status}: ${await res.text()}`)
  } catch (err) {
    console.log(`⚠️  IndexNow falhou: ${err.message}`)
  }
}

console.log(`\n✓ Sprint 1 done. ${updatedSlugs.length} snippets aplicados.`)
console.log(`  Prox passo: deploy do fix do generateMetadata (commit em paralelo)`)
console.log(`  Apos deploy: Google reprocessa snippets em ~7-14 dias (ou 1-2 dias com IndexNow)`)
