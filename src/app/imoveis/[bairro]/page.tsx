import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllBairros, getProperties } from "@/services/loft"
import { slugify, formatPrice } from "@/lib/utils"
import {
  generateLandingTitle,
  generateLandingDescription,
  generateItemListSchema,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGrid } from "@/components/search/PropertyGrid"

interface BairroPageProps {
  params: Promise<{ bairro: string }>
}

export async function generateStaticParams() {
  const bairros = await getAllBairros()
  return bairros.map((b) => ({ bairro: b.slug }))
}

export async function generateMetadata({
  params,
}: BairroPageProps): Promise<Metadata> {
  const { bairro: bairroSlug } = await params
  const bairros = await getAllBairros()
  const bairro = bairros.find((b) => b.slug === bairroSlug)
  if (!bairro) return {}

  const { properties } = await getProperties({ bairro: bairro.bairro, limit: 1000 })
  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)

  return {
    title: generateLandingTitle(undefined, bairro.bairro),
    description: generateLandingDescription(
      undefined,
      bairro.bairro,
      bairro.total,
      {
        min: precos.length > 0 ? Math.min(...precos) : null,
        max: precos.length > 0 ? Math.max(...precos) : null,
      }
    ),
    alternates: {
      canonical: `/imoveis/${bairroSlug}`,
    },
  }
}

export default async function BairroPage({ params }: BairroPageProps) {
  const { bairro: bairroSlug } = await params
  const bairros = await getAllBairros()
  const bairro = bairros.find((b) => b.slug === bairroSlug)

  if (!bairro) notFound()

  const { properties } = await getProperties({
    bairro: bairro.bairro,
    limit: 1000,
  })

  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)
  const precoMin = precos.length > 0 ? Math.min(...precos) : null
  const precoMax = precos.length > 0 ? Math.max(...precos) : null
  const precoMedio =
    precos.length > 0
      ? Math.round(precos.reduce((a, b) => a + b, 0) / precos.length)
      : null

  const itemListSchema = generateItemListSchema(
    properties,
    `/imoveis/${bairroSlug}`
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Imóveis", url: "/busca" },
            { name: bairro.bairro, url: `/imoveis/${bairroSlug}` },
          ]}
        />

        <h1 className="font-display text-2xl font-bold text-fymoob-gray-dark sm:text-3xl">
          Imóveis no {bairro.bairro}, Curitiba
        </h1>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-fymoob-gray-mid">
          <span>
            <span className="font-semibold text-fymoob-gray-dark">
              {properties.length}
            </span>{" "}
            imóveis disponíveis
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
          {precoMedio && (
            <span>
              Preço médio:{" "}
              <span className="font-semibold text-fymoob-gray-dark">
                {formatPrice(precoMedio)}
              </span>
            </span>
          )}
        </div>

        {/* Type links */}
        {bairro.tipos.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {bairro.tipos.map(({ tipo, count }) => (
              <Link
                key={tipo}
                href={`/imoveis/${bairroSlug}/${slugify(tipo)}s`}
                className="rounded-full border border-fymoob-gray-light px-4 py-1.5 text-sm text-fymoob-gray-dark transition-colors hover:border-fymoob-blue hover:text-fymoob-blue"
              >
                {tipo}s ({count})
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
