import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllBairros, getProperties } from "@/services/loft"
import { slugify, formatPrice } from "@/lib/utils"
import type { PropertyType } from "@/types/property"
import {
  generateLandingTitle,
  generateLandingDescription,
  generateItemListSchema,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGrid } from "@/components/search/PropertyGrid"

const TIPO_SLUG_MAP: Record<string, PropertyType> = {
  apartamentos: "Apartamento",
  casas: "Casa",
  sobrados: "Sobrado",
  terrenos: "Terreno",
}

const TIPO_PLURAL: Record<PropertyType, string> = {
  Apartamento: "Apartamentos",
  Casa: "Casas",
  Sobrado: "Sobrados",
  Terreno: "Terrenos",
}

interface CombinadaPageProps {
  params: Promise<{ bairro: string; tipo: string }>
}

export async function generateStaticParams() {
  const bairros = await getAllBairros()
  const params: { bairro: string; tipo: string }[] = []

  for (const b of bairros) {
    for (const { tipo, count } of b.tipos) {
      if (count >= 3) {
        params.push({
          bairro: b.slug,
          tipo: `${slugify(tipo)}s`,
        })
      }
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: CombinadaPageProps): Promise<Metadata> {
  const { bairro: bairroSlug, tipo: tipoSlug } = await params
  const bairros = await getAllBairros()
  const bairro = bairros.find((b) => b.slug === bairroSlug)
  const tipoKey = TIPO_SLUG_MAP[tipoSlug]

  if (!bairro || !tipoKey) return {}

  const { properties } = await getProperties({
    bairro: bairro.bairro,
    tipo: tipoKey,
    limit: 1000,
  })

  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)

  return {
    title: generateLandingTitle(tipoKey, bairro.bairro),
    description: generateLandingDescription(tipoKey, bairro.bairro, properties.length, {
      min: precos.length > 0 ? Math.min(...precos) : null,
      max: precos.length > 0 ? Math.max(...precos) : null,
    }),
    alternates: {
      canonical: `/imoveis/${bairroSlug}/${tipoSlug}`,
    },
  }
}

export default async function CombinadaPage({ params }: CombinadaPageProps) {
  const { bairro: bairroSlug, tipo: tipoSlug } = await params
  const bairros = await getAllBairros()
  const bairro = bairros.find((b) => b.slug === bairroSlug)
  const tipoKey = TIPO_SLUG_MAP[tipoSlug]

  if (!bairro || !tipoKey) notFound()

  const { properties } = await getProperties({
    bairro: bairro.bairro,
    tipo: tipoKey,
    limit: 1000,
  })

  const plural = TIPO_PLURAL[tipoKey]
  const itemListSchema = generateItemListSchema(
    properties,
    `/imoveis/${bairroSlug}/${tipoSlug}`
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
            { name: plural, url: `/imoveis/${bairroSlug}/${tipoSlug}` },
          ]}
        />

        <h1 className="font-display text-2xl font-bold text-fymoob-gray-dark sm:text-3xl">
          {plural} no {bairro.bairro}, Curitiba
        </h1>

        <p className="mt-2 text-sm text-fymoob-gray-mid">
          <span className="font-semibold text-fymoob-gray-dark">
            {properties.length}
          </span>{" "}
          {properties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
        </p>

        {/* Internal links */}
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link
            href={`/imoveis/${bairroSlug}`}
            className="text-fymoob-blue transition-colors hover:text-fymoob-blue-dark"
          >
            Todos os imóveis no {bairro.bairro}
          </Link>
          <Link
            href={`/${tipoSlug}-curitiba`}
            className="text-fymoob-blue transition-colors hover:text-fymoob-blue-dark"
          >
            {plural} em Curitiba
          </Link>
        </div>

        <div className="mt-8">
          <PropertyGrid properties={properties} />
        </div>
      </div>
    </>
  )
}
