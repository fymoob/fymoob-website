import type { Metadata } from "next"
import Link from "next/link"
import { getProperties, getAllBairros } from "@/services/loft"
import { formatPrice, slugify } from "@/lib/utils"
import {
  generateLandingTitle,
  generateLandingDescription,
  generateItemListSchema,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGrid } from "@/components/search/PropertyGrid"

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
  const [{ properties }, bairros] = await Promise.all([
    getProperties({ tipo: "Apartamento", limit: 1000 }),
    getAllBairros(),
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

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Apartamentos em Curitiba", url: "/apartamentos-curitiba" },
          ]}
        />

        <h1 className="font-display text-2xl font-bold text-fymoob-gray-dark sm:text-3xl">
          Apartamentos à Venda e Aluguel em Curitiba
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-fymoob-gray-mid">
          <span>
            <span className="font-semibold text-fymoob-gray-dark">
              {properties.length}
            </span>{" "}
            apartamentos disponíveis
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
            Procurando apartamento em Curitiba? A FYMOOB tem as melhores opções de apartamentos
            à venda e para alugar nos principais bairros da cidade. Encontre apartamentos com
            diferentes metragens, quartos e faixas de preço.
          </p>
        </div>

        {bairrosComApto.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {bairrosComApto.map((b) => (
              <Link
                key={b.slug}
                href={`/imoveis/${b.slug}/apartamentos`}
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
