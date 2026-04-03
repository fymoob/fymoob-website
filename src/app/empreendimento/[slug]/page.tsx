import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Building2, MapPin, DollarSign, Home } from "lucide-react"
import {
  getAllEmpreendimentos,
  getPropertiesByEmpreendimento,
} from "@/services/loft"
import { slugify, formatPrice } from "@/lib/utils"
import { generateItemListSchema, generateLandingStats, generateDynamicFAQ } from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGrid } from "@/components/search/PropertyGrid"
import { DynamicFAQ } from "@/components/seo/DynamicFAQ"
import { RelatedPages } from "@/components/seo/RelatedPages"

interface EmpreendimentoPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 900 // 15 minutes
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const empreendimentos = await getAllEmpreendimentos()
    return empreendimentos.map((e) => ({ slug: e.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: EmpreendimentoPageProps): Promise<Metadata> {
  const { slug } = await params
  const empreendimentos = await getAllEmpreendimentos()
  const emp = empreendimentos.find((e) => e.slug === slug)
  if (!emp) return {}

  const precoText =
    emp.precoMin && emp.precoMax
      ? `Preços de ${formatPrice(emp.precoMin)} a ${formatPrice(emp.precoMax)}.`
      : ""
  const bairroText = emp.bairros.length > 0 ? emp.bairros.join(", ") : "Curitiba"

  return {
    title: `${emp.nome} | ${bairroText}`,
    description: `${emp.nome} em ${bairroText}, Curitiba. ${emp.total} imóveis disponíveis. ${precoText} ${emp.construtora ? `Construtora ${emp.construtora}.` : ""} FYMOOB Imobiliária.`.trim(),
    alternates: {
      canonical: `/empreendimento/${slug}`,
    },
    openGraph: {
      title: `${emp.nome} | ${bairroText} - Curitiba`,
      description: `${emp.total} imóveis disponíveis no ${emp.nome}. ${precoText}`,
      images: emp.imageUrl ? [{ url: emp.imageUrl, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default async function EmpreendimentoPage({
  params,
}: EmpreendimentoPageProps) {
  const { slug } = await params
  const empreendimentos = await getAllEmpreendimentos()
  const emp = empreendimentos.find((e) => e.slug === slug)

  if (!emp) notFound()

  const properties = await getPropertiesByEmpreendimento(emp.nome)

  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)
  const precoMin = precos.length > 0 ? Math.min(...precos) : null
  const precoMax = precos.length > 0 ? Math.max(...precos) : null
  const areas = properties
    .map((p) => p.areaPrivativa)
    .filter((a): a is number => a !== null && a > 0)
  const areaMin = areas.length > 0 ? Math.min(...areas) : null
  const areaMax = areas.length > 0 ? Math.max(...areas) : null

  const tipos = [...new Set(properties.map((p) => p.tipo))]
  const bairros = [...new Set(properties.map((p) => p.bairro).filter(Boolean))]
  const descricao = properties.find((p) => p.descricaoEmpreendimento)?.descricaoEmpreendimento

  const itemListSchema = generateItemListSchema(
    properties,
    `/empreendimento/${slug}`
  )

  const realEstateSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: emp.nome,
    description: descricao || `${emp.total} imóveis disponíveis no ${emp.nome} em ${bairros.join(", ") || "Curitiba"}`,
    url: `https://fymoob.com/empreendimento/${slug}`,
    image: emp.imageUrl || undefined,
    offers: precoMin
      ? {
          "@type": "AggregateOffer",
          lowPrice: precoMin,
          highPrice: precoMax || precoMin,
          priceCurrency: "BRL",
          offerCount: properties.length,
        }
      : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([realEstateSchema, itemListSchema]),
        }}
      />

      <section className="relative bg-neutral-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Empreendimentos", url: "/busca" },
              { name: emp.nome, url: `/empreendimento/${slug}` },
            ]}
          />

          <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            {emp.nome}
          </h1>

          {emp.construtora && (
            <p className="mt-2 text-neutral-300">
              <Building2 className="mr-1 inline h-4 w-4" />
              Construtora {emp.construtora}
            </p>
          )}

          {bairros.length > 0 && (
            <p className="mt-1 text-neutral-400">
              <MapPin className="mr-1 inline h-4 w-4" />
              {bairros.join(", ")}, Curitiba
            </p>
          )}

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <Home className="h-5 w-5 text-brand-primary" />
              <p className="mt-2 text-2xl font-bold text-white">
                {properties.length}
              </p>
              <p className="text-sm text-neutral-400">
                {properties.length === 1 ? "Unidade" : "Unidades"}
              </p>
            </div>

            {precoMin && (
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <DollarSign className="h-5 w-5 text-brand-primary" />
                <p className="mt-2 text-lg font-bold text-white">
                  {formatPrice(precoMin)}
                </p>
                <p className="text-sm text-neutral-400">A partir de</p>
              </div>
            )}

            {areaMin && areaMax && (
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="mt-2 text-lg font-bold text-white">
                  {areaMin === areaMax
                    ? `${areaMin} m²`
                    : `${areaMin} - ${areaMax} m²`}
                </p>
                <p className="text-sm text-neutral-400">Área privativa</p>
              </div>
            )}

            {tipos.length > 0 && (
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="mt-2 text-lg font-bold text-white">
                  {tipos.join(", ")}
                </p>
                <p className="text-sm text-neutral-400">
                  {tipos.length === 1 ? "Tipo" : "Tipos"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {descricao && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-neutral-900">
            Sobre o {emp.nome}
          </h2>
          <div className="mt-4 whitespace-pre-line text-neutral-600 leading-relaxed">
            {descricao}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-neutral-900">
          Unidades disponíveis ({properties.length})
        </h2>

        <div className="mt-6">
          <PropertyGrid properties={properties} />
        </div>
      </section>

      {/* FAQ + Related */}
      <section className="border-t border-neutral-100 bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <DynamicFAQ
            questions={(() => {
              const stats = generateLandingStats(properties)
              const baseFaq = generateDynamicFAQ(stats, bairros[0])
              return [
                {
                  question: `Quantas unidades estao disponiveis no ${emp.nome}?`,
                  answer: `O ${emp.nome} possui ${properties.length} ${properties.length === 1 ? "unidade disponivel" : "unidades disponiveis"} no site da FYMOOB.${precoMin ? ` Precos a partir de ${formatPrice(precoMin)}.` : ""}`,
                },
                ...baseFaq.slice(1),
              ]
            })()}
            title={`Perguntas frequentes sobre o ${emp.nome}`}
          />
          <RelatedPages
            title="Explore tambem"
            links={[
              ...bairros.map((bairro) => ({
                href: `/imoveis/${slugify(bairro)}`,
                label: `Imoveis no ${bairro}`,
              })),
              ...empreendimentos
                .filter((e) => e.slug !== slug && e.total >= 3)
                .slice(0, 6)
                .map((e) => ({
                  href: `/empreendimento/${e.slug}`,
                  label: e.nome,
                })),
            ]}
          />
        </div>
      </section>
    </>
  )
}
