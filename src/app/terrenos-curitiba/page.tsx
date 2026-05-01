import type { Metadata } from "next"
import { safeJsonLd } from "@/lib/seo"
import { Suspense } from "react"
import { getProperties, getAllBairros, getAllTypes, getAllCities, getPropertyStats } from "@/services/loft"
import { SearchPageSearchBar } from "@/components/search/SearchPageSearchBar"
import { SeoInternalLinks, buildBairrosGroup } from "@/components/seo/SeoInternalLinks"
import { formatPrice } from "@/lib/utils"
import {
  generateLandingTitle,
  generateLandingDescription,
  generateItemListSchema,
  generateLandingFAQ,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyListingGrid } from "@/components/search/PropertyListingGrid"
import { projectForCard } from "@/lib/property-projection"
import { Pagination } from "@/components/search/Pagination"
import { DynamicFAQ } from "@/components/seo/DynamicFAQ"
import { LandingSEOContent } from "@/components/seo/LandingSEOContent"

export async function generateMetadata(): Promise<Metadata> {
  const { properties } = await getProperties({ tipo: "Terreno", limit: 500 })
  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)

  return {
    title: generateLandingTitle("Terreno", undefined, properties.length),
    description: generateLandingDescription("Terreno", undefined, properties.length, {
      min: precos.length > 0 ? Math.min(...precos) : null,
      max: precos.length > 0 ? Math.max(...precos) : null,
    }),
    alternates: {
      canonical: "/terrenos-curitiba",
    },
  }
}

const PAGE_SIZE = 24

export default async function TerrenosCuritibaPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1)

  const [{ properties, total }, bairros, tipos, cidades, stats] = await Promise.all([
    getProperties({ tipo: "Terreno", page, limit: PAGE_SIZE }),
    getAllBairros(),
    getAllTypes(),
    getAllCities(),
    getPropertyStats(),
  ])

  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)
  const precoMin = precos.length > 0 ? Math.min(...precos) : null
  const precoMax = precos.length > 0 ? Math.max(...precos) : null

  const bairrosComTerreno = bairros.filter((b) =>
    b.tipos.some((t) => t.tipo === "Terreno" && t.count >= 3)
  )

  const itemListSchema = generateItemListSchema(properties, "/terrenos-curitiba")
  const faqQuestions = generateLandingFAQ("Terreno", total, precoMin, precoMax)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListSchema) }}
      />

      <div className="w-full bg-slate-50 px-4 py-8 md:px-12 lg:px-20 2xl:px-32">
        <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Terrenos em Curitiba", url: "/terrenos-curitiba" }]} />

        {/* H1 com numero especifico — Fase 19.P0.3 */}
        <h1 className="mt-2 font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
          {total} Terrenos à Venda em {bairrosComTerreno.length}+ Bairros de Curitiba
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-600">
          <span><span className="font-semibold text-neutral-900">{properties.length}</span> terrenos disponíveis</span>
          {precoMin && precoMax && (
            <span>De <span className="font-semibold text-neutral-900">{formatPrice(precoMin)}</span> a <span className="font-semibold text-neutral-900">{formatPrice(precoMax)}</span></span>
          )}
        </div>

        <p className="mt-4 max-w-4xl text-neutral-600">
          Terrenos à venda em Curitiba para construir o imóvel dos seus sonhos. A FYMOOB oferece terrenos em diversos bairros, com diferentes metragens e condições de pagamento.
        </p>

        <div className="mt-8 mb-8">
          <Suspense fallback={null}>
            <SearchPageSearchBar bairros={bairros.map((b) => b.bairro)} tipos={tipos.map((t) => t.tipo)} cidades={cidades} priceBounds={{ min: stats.precoMin ?? 50_000, max: stats.precoMax ?? 5_000_000 }} bairroSummaries={bairros} tipoSummaries={tipos} sticky scope={{ tipo: "terreno" }} />
          </Suspense>
        </div>

        <PropertyListingGrid properties={properties.map(p => projectForCard(p))} total={total} totalLabel="terrenos" cardContext="search" />
        <Pagination currentPage={page} totalPages={Math.max(1, Math.ceil(total / PAGE_SIZE))} basePath="/terrenos-curitiba" />
      </div>

      {/* Bloco SEO 1000 palavras — Fase 19.P0.4 */}
      <LandingSEOContent tipo="Terreno" total={total} />

      {/* FAQ + internal links */}
      <section className="bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <DynamicFAQ
            questions={faqQuestions}
            title="Perguntas frequentes sobre terrenos em Curitiba"
          />
        </div>
      </section>

      <SeoInternalLinks groups={[buildBairrosGroup(bairrosComTerreno, { tipoSlug: "terrenos", title: "Terrenos por Bairro" })]} />
    </>
  )
}
