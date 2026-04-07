import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { getProperties, getAllBairros, getAllTypes, getAllCities, getPropertyStats } from "@/services/loft"
import { SeoInternalLinks, buildBairrosGroup } from "@/components/seo/SeoInternalLinks"
import { SearchPageSearchBar } from "@/components/search/SearchPageSearchBar"
import { formatPrice, slugify } from "@/lib/utils"
import {
  generateLandingTitle,
  generateLandingDescription,
  generateItemListSchema,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyListingGrid } from "@/components/search/PropertyListingGrid"

export async function generateMetadata(): Promise<Metadata> {
  const { properties } = await getProperties({ tipo: "Apartamento", limit: 1000 })
  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)

  return {
    title: generateLandingTitle("Apartamento"),
    description: generateLandingDescription("Apartamento", undefined, properties.length, {
      min: precos.length > 0 ? Math.min(...precos) : null,
      max: precos.length > 0 ? Math.max(...precos) : null,
    }),
    alternates: {
      canonical: "/apartamentos-curitiba",
    },
  }
}

export default async function ApartamentosCuritibaPage() {
  const [{ properties }, bairros, tipos, cidades, stats] = await Promise.all([
    getProperties({ tipo: "Apartamento", limit: 1000 }),
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

  const bairrosComApto = bairros.filter((b) =>
    b.tipos.some((t) => t.tipo === "Apartamento" && t.count >= 3)
  )

  const itemListSchema = generateItemListSchema(
    properties,
    "/apartamentos-curitiba"
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="w-full bg-slate-50 px-4 py-8 md:px-12 lg:px-20 2xl:px-32">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Apartamentos em Curitiba", url: "/apartamentos-curitiba" },
          ]}
        />

        <h1 className="mt-2 font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
          Apartamentos à Venda e Aluguel em Curitiba
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-600">
          <span>
            <span className="font-semibold text-neutral-900">{properties.length}</span> apartamentos disponíveis
          </span>
          {precoMin && precoMax && (
            <span>
              De <span className="font-semibold text-neutral-900">{formatPrice(precoMin)}</span> a{" "}
              <span className="font-semibold text-neutral-900">{formatPrice(precoMax)}</span>
            </span>
          )}
        </div>

        <p className="mt-4 max-w-4xl text-neutral-600">
          Procurando apartamento em Curitiba? A FYMOOB tem as melhores opções de apartamentos
          à venda e para alugar nos principais bairros da cidade. Encontre apartamentos com
          diferentes metragens, quartos e faixas de preço.
        </p>

        <div className="mt-8 mb-8">
          <Suspense fallback={null}>
            <SearchPageSearchBar
              bairros={bairros.map((b) => b.bairro)}
              tipos={tipos.map((t) => t.tipo)}
              cidades={cidades}
              priceBounds={{ min: stats.precoMin ?? 50_000, max: stats.precoMax ?? 5_000_000 }}
              bairroSummaries={bairros}
              tipoSummaries={tipos}
              sticky
            />
          </Suspense>
        </div>

        <PropertyListingGrid properties={properties} totalLabel="apartamentos" />
      </div>

      <SeoInternalLinks groups={[buildBairrosGroup(bairrosComApto, { tipoSlug: "apartamentos", title: "Apartamentos por Bairro" })]} />
    </>
  )
}
