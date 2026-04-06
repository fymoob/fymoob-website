import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { getProperties, getAllBairros, getAllTypes, getAllCities, getPropertyStats } from "@/services/loft"
import { SearchPageSearchBar } from "@/components/search/SearchPageSearchBar"
import { formatPrice } from "@/lib/utils"
import {
  generateLandingTitle,
  generateLandingDescription,
  generateItemListSchema,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGrid } from "@/components/search/PropertyGrid"

export async function generateMetadata(): Promise<Metadata> {
  const { properties } = await getProperties({ tipo: "Casa", limit: 1000 })
  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)

  return {
    title: generateLandingTitle("Casa"),
    description: generateLandingDescription("Casa", undefined, properties.length, {
      min: precos.length > 0 ? Math.min(...precos) : null,
      max: precos.length > 0 ? Math.max(...precos) : null,
    }),
    alternates: {
      canonical: "/casas-curitiba",
    },
  }
}

export default async function CasasCuritibaPage() {
  const [{ properties }, bairros, tipos, cidades, stats] = await Promise.all([
    getProperties({ tipo: "Casa", limit: 1000 }),
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

  const bairrosComCasa = bairros.filter((b) =>
    b.tipos.some((t) => t.tipo === "Casa" && t.count >= 3)
  )

  const itemListSchema = generateItemListSchema(properties, "/casas-curitiba")

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

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

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Casas em Curitiba", url: "/casas-curitiba" },
          ]}
        />

        <h1 className="font-display text-2xl font-bold text-fymoob-gray-dark sm:text-3xl">
          Casas à Venda e Aluguel em Curitiba
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-fymoob-gray-mid">
          <span>
            <span className="font-semibold text-fymoob-gray-dark">
              {properties.length}
            </span>{" "}
            casas disponíveis
          </span>
          {precoMin && precoMax && (
            <span>
              De{" "}
              <span className="font-semibold text-fymoob-gray-dark">
                {formatPrice(precoMin)}
              </span>{" "}
              a{" "}
              <span className="font-semibold text-fymoob-gray-dark">
                {formatPrice(precoMax)}
              </span>
            </span>
          )}
        </div>

        <div className="mt-6">
          <p className="max-w-3xl text-fymoob-gray-mid">
            Encontre a casa perfeita em Curitiba. A FYMOOB oferece casas à venda e para alugar
            nos melhores bairros, com opções para todos os perfis e orçamentos. Casas com
            quintal, garagem e muito mais.
          </p>
        </div>

        {bairrosComCasa.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {bairrosComCasa.map((b) => (
              <Link
                key={b.slug}
                href={`/imoveis/${b.slug}/casas`}
                className="rounded-full border border-fymoob-gray-light px-4 py-1.5 text-sm text-fymoob-gray-dark transition-colors hover:border-fymoob-blue hover:text-fymoob-blue"
              >
                {b.bairro}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8">
          <PropertyGrid properties={properties} />
        </div>
      </div>
    </>
  )
}
