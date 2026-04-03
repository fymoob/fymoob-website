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
  generateLandingIntro,
  generateLandingStats,
  generateDynamicFAQ,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGrid } from "@/components/search/PropertyGrid"
import { DynamicFAQ } from "@/components/seo/DynamicFAQ"
import { RelatedPages } from "@/components/seo/RelatedPages"
import { Home, Maximize2, BedDouble, DollarSign } from "lucide-react"

const TIPO_SLUG_MAP: Record<string, PropertyType> = {
  apartamentos: "Apartamento",
  casas: "Casa",
  sobrados: "Sobrado",
  terrenos: "Terreno",
}

const TIPO_PLURAL: Partial<Record<PropertyType, string>> = {
  Apartamento: "Apartamentos",
  "Apartamento Duplex": "Apartamentos Duplex",
  Casa: "Casas",
  "Casa em Condomínio": "Casas em Condomínio",
  Chácara: "Chácaras",
  Cobertura: "Coberturas",
  Kitnet: "Kitnets",
  Loja: "Lojas",
  "Ponto Comercial": "Pontos Comerciais",
  "Prédio Comercial": "Prédios Comerciais",
  "Sala Comercial": "Salas Comerciais",
  "Salas/Conjuntos": "Salas/Conjuntos",
  Sobrado: "Sobrados",
  Studio: "Studios",
  Terreno: "Terrenos",
  "Terreno Comercial": "Terrenos Comerciais",
  Empreendimento: "Empreendimentos",
}

const ALL_TIPO_SLUGS = ["apartamentos", "casas", "sobrados", "terrenos"]

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

  const plural = TIPO_PLURAL[tipoKey] || `${tipoKey}s`
  const stats = generateLandingStats(properties)
  const intro = generateLandingIntro(properties, bairro.bairro, tipoKey)
  const faqQuestions = generateDynamicFAQ(stats, bairro.bairro, tipoKey)
  const itemListSchema = generateItemListSchema(
    properties,
    `/imoveis/${bairroSlug}/${tipoSlug}`
  )

  // Cross-linking: other types in same neighborhood
  const otherTypes = ALL_TIPO_SLUGS
    .filter((s) => s !== tipoSlug)
    .map((s) => {
      const tipoMatch = bairro.tipos.find(
        (t) => `${slugify(t.tipo)}s` === s && t.count >= 3
      )
      if (!tipoMatch) return null
      const p = TIPO_PLURAL[TIPO_SLUG_MAP[s]] || s
      return { href: `/imoveis/${bairroSlug}/${s}`, label: `${p} no ${bairro.bairro}` }
    })
    .filter(Boolean) as { href: string; label: string }[]

  // Cross-linking: nearby/popular neighborhoods with same type
  const otherBairros = bairros
    .filter((b) => b.slug !== bairroSlug && b.tipos.some((t) => t.tipo === tipoKey && t.count >= 3))
    .slice(0, 6)
    .map((b) => ({
      href: `/imoveis/${b.slug}/${tipoSlug}`,
      label: `${plural} no ${b.bairro}`,
    }))

  const relatedLinks = [
    { href: `/imoveis/${bairroSlug}`, label: `Todos os imoveis no ${bairro.bairro}` },
    { href: `/${tipoSlug}-curitiba`, label: `${plural} em Curitiba` },
    ...otherTypes,
    ...otherBairros,
  ]

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

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
            {intro}
          </p>

          {/* Stats cards */}
          {stats.total > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                <Home className="size-4 text-brand-primary" />
                <span><strong>{stats.total}</strong> {stats.total === 1 ? "imovel" : "imoveis"}</span>
              </div>
              {stats.precoMin && (
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                  <DollarSign className="size-4 text-brand-primary" />
                  <span>A partir de <strong>{formatPrice(stats.precoMin)}</strong></span>
                </div>
              )}
              {stats.areaMedio && (
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                  <Maximize2 className="size-4 text-brand-primary" />
                  <span>Media <strong>{stats.areaMedio} m²</strong></span>
                </div>
              )}
              {stats.quartosMedio && (
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                  <BedDouble className="size-4 text-brand-primary" />
                  <span>Media <strong>{stats.quartosMedio} quartos</strong></span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Property grid */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PropertyGrid properties={properties} />
        </div>
      </section>

      {/* FAQ + Related — SEO content */}
      <section className="border-t border-neutral-100 bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <DynamicFAQ
            questions={faqQuestions}
            title={`Perguntas frequentes sobre ${plural.toLowerCase()} no ${bairro.bairro}`}
          />
          <RelatedPages
            title="Explore tambem"
            links={relatedLinks}
          />
        </div>
      </section>
    </>
  )
}
