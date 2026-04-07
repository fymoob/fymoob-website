import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { getProperties, getAllBairros, getAllTypes, getAllCities, getPropertyStats } from "@/services/loft"
import { SearchPageSearchBar } from "@/components/search/SearchPageSearchBar"
import { SeoInternalLinks, buildBairrosGroup } from "@/components/seo/SeoInternalLinks"
import { formatPrice } from "@/lib/utils"
import {
  generateLandingTitle,
  generateLandingDescription,
  generateItemListSchema,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyListingGrid } from "@/components/search/PropertyListingGrid"

export async function generateMetadata(): Promise<Metadata> {
  const { properties } = await getProperties({ tipo: "Sobrado", limit: 1000 })
  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)

  return {
    title: generateLandingTitle("Sobrado"),
    description: generateLandingDescription("Sobrado", undefined, properties.length, {
      min: precos.length > 0 ? Math.min(...precos) : null,
      max: precos.length > 0 ? Math.max(...precos) : null,
    }),
    alternates: {
      canonical: "/sobrados-curitiba",
    },
  }
}

export default async function SobradosCuritibaPage() {
  const [{ properties }, bairros, tipos, cidades, stats] = await Promise.all([
    getProperties({ tipo: "Sobrado", limit: 1000 }),
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

  const bairrosComSobrado = bairros.filter((b) =>
    b.tipos.some((t) => t.tipo === "Sobrado" && t.count >= 3)
  )

  const itemListSchema = generateItemListSchema(
    properties,
    "/sobrados-curitiba"
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="w-full px-4 py-8 md:px-12 lg:px-20 2xl:px-32">
        <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Sobrados em Curitiba", url: "/sobrados-curitiba" }]} />

        <h1 className="mt-2 font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
          Sobrados à Venda e Aluguel em Curitiba
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-600">
          <span><span className="font-semibold text-neutral-900">{properties.length}</span> sobrados disponíveis</span>
          {precoMin && precoMax && (
            <span>De <span className="font-semibold text-neutral-900">{formatPrice(precoMin)}</span> a <span className="font-semibold text-neutral-900">{formatPrice(precoMax)}</span></span>
          )}
        </div>

        <p className="mt-4 max-w-4xl text-neutral-600">
          Sobrados em Curitiba com o espaço e conforto que sua família precisa. A FYMOOB oferece sobrados à venda e para alugar com múltiplos pavimentos, garagem e áreas de lazer nos melhores bairros.
        </p>

        <div className="mt-8 mb-8">
          <Suspense fallback={null}>
            <SearchPageSearchBar bairros={bairros.map((b) => b.bairro)} tipos={tipos.map((t) => t.tipo)} cidades={cidades} priceBounds={{ min: stats.precoMin ?? 50_000, max: stats.precoMax ?? 5_000_000 }} bairroSummaries={bairros} tipoSummaries={tipos} sticky />
          </Suspense>
        </div>

        <PropertyListingGrid properties={properties} totalLabel="sobrados" />
      </div>

      <SeoInternalLinks groups={[buildBairrosGroup(bairrosComSobrado, { tipoSlug: "sobrados", title: "Sobrados por Bairro" })]} />
    </>
  )
}
