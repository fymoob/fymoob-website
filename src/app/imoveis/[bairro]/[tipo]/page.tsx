import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllBairros, getProperties } from "@/services/loft"
import { slugify } from "@/lib/utils"
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

      {/* Hero */}
      <section className="bg-neutral-950 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: bairro.bairro, url: `/imoveis/${bairroSlug}` },
              { name: plural, url: `/imoveis/${bairroSlug}/${tipoSlug}` },
            ]}
          />

          <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            {plural} no {bairro.bairro}, Curitiba
          </h1>

          <p className="mt-3 text-neutral-300">
            <span className="font-semibold text-white">
              {properties.length}
            </span>{" "}
            {properties.length === 1 ? "imovel encontrado" : "imoveis encontrados"}
          </p>

          {/* Internal links */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              href={`/imoveis/${bairroSlug}`}
              className="text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover"
            >
              Todos os imoveis no {bairro.bairro}
            </Link>
            <Link
              href={`/${tipoSlug}-curitiba`}
              className="text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover"
            >
              {plural} em Curitiba
            </Link>
          </div>
        </div>
      </section>

      {/* Property grid */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PropertyGrid properties={properties} />
        </div>
      </section>
    </>
  )
}
