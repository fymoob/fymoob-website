import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin, Building2, TrendingUp } from "lucide-react"
import { getAllBairros, getProperties } from "@/services/loft"
import { slugify, formatPrice } from "@/lib/utils"
import {
  generateLandingTitle,
  generateLandingDescription,
  generateItemListSchema,
  generateLandingStats,
  generateDynamicFAQ,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGrid } from "@/components/search/PropertyGrid"
import { DynamicFAQ } from "@/components/seo/DynamicFAQ"
import { RelatedPages } from "@/components/seo/RelatedPages"

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

const bairroDescriptions: Record<string, string> = {
  "Batel": "O Batel é um dos bairros mais nobres de Curitiba, conhecido pela vida noturna, gastronomia refinada e comércio de alto padrão. Localizado próximo ao centro, oferece fácil acesso a toda a cidade com infraestrutura completa.",
  "Agua Verde": "O Água Verde combina conveniência urbana com qualidade de vida. Com fartura de comércio, serviços, escolas e fácil acesso ao transporte público, é um dos bairros mais procurados para morar em Curitiba.",
  "Portao": "O Portão é um bairro tradicional e bem estruturado, com excelente rede de transporte, comércio variado e opções de lazer. Ideal para famílias que buscam praticidade no dia a dia.",
  "Centro": "O Centro de Curitiba reúne história, cultura e praticidade. Com acesso a todos os serviços essenciais, transporte público abundante e vida cultural ativa, é perfeito para quem valoriza a vida urbana.",
  "Bigorrilho": "O Bigorrilho é vizinho do Batel e compartilha de sua infraestrutura premium. Bairro residencial com ruas arborizadas, comércio sofisticado e excelente qualidade de vida.",
  "Ecoville": "O Ecoville é um dos bairros mais modernos de Curitiba, com prédios novos, amplas áreas verdes e infraestrutura de primeiro mundo. Ideal para quem busca conforto e modernidade.",
  "Merces": "O Mercês é um bairro residencial tranquilo, próximo ao Batel e ao Bigorrilho. Oferece boa infraestrutura, ruas calmas e fácil acesso aos principais pontos da cidade.",
  "Juveve": "O Juvevê é um bairro charmoso e bem localizado, com ruas arborizadas, comércio local variado e proximidade ao centro. Perfeito para quem busca tranquilidade sem abrir mão da conveniência.",
  "Cabral": "O Cabral é um bairro nobre com excelente infraestrutura, próximo ao Jardim Botânico e ao centro. Ruas arborizadas, boas escolas e comércio completo fazem dele um dos mais desejados.",
  "Santa Felicidade": "Santa Felicidade é famoso pela gastronomia italiana e pelo charme interiorano dentro da cidade. Com grandes terrenos e casas amplas, é ideal para quem busca espaço e tranquilidade.",
}

function getBairroDescription(bairroName: string): string {
  return bairroDescriptions[bairroName] ||
    `Descubra os melhores imóveis disponíveis no ${bairroName}, em Curitiba. Apartamentos, casas e sobrados com as melhores condições do mercado. A FYMOOB te ajuda a encontrar o imóvel ideal neste bairro.`
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

  const descricao = getBairroDescription(bairro.bairro)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-neutral-950 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Imóveis", url: "/busca" },
              { name: bairro.bairro, url: `/imoveis/${bairroSlug}` },
            ]}
          />

          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Imóveis no {bairro.bairro}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-300">
            {descricao}
          </p>

          {/* Stats cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <Building2 size={20} className="shrink-0 text-brand-primary" />
              <div>
                <p className="text-2xl font-bold text-white">{properties.length}</p>
                <p className="text-xs text-neutral-400">imóveis disponíveis</p>
              </div>
            </div>
            {precoMin && precoMax && (
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <TrendingUp size={20} className="shrink-0 text-brand-primary" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {formatPrice(precoMin)} - {formatPrice(precoMax)}
                  </p>
                  <p className="text-xs text-neutral-400">faixa de preço</p>
                </div>
              </div>
            )}
            {precoMedio && (
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <MapPin size={20} className="shrink-0 text-brand-primary" />
                <div>
                  <p className="text-lg font-bold text-white">{formatPrice(precoMedio)}</p>
                  <p className="text-xs text-neutral-400">preço médio</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Type filter links */}
      {bairro.tipos.length > 0 && (
        <div className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 py-4">
              {bairro.tipos.map(({ tipo, count }) => (
                <Link
                  key={tipo}
                  href={`/imoveis/${bairroSlug}/${slugify(tipo)}s`}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-200 hover:border-brand-primary hover:text-brand-primary"
                >
                  {tipo}s ({count})
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Property grid */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PropertyGrid properties={properties} />
        </div>
      </section>

      {/* SEO content + FAQ + Related */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          {/* About neighborhood */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-950">
              Sobre o bairro {bairro.bairro}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-600">
              <p>{descricao}</p>
              <p>
                Atualmente temos <strong className="text-neutral-950">{properties.length} imóveis</strong> disponíveis
                no {bairro.bairro}{precoMedio && (<>, com preço médio de <strong className="text-neutral-950">{formatPrice(precoMedio)}</strong></>)}.
                {bairro.tipos.length > 0 && (
                  <> Os tipos mais comuns são: {bairro.tipos.map(t => `${t.tipo}s (${t.count})`).join(", ")}.</>
                )}
              </p>
            </div>
          </div>

          {/* Dynamic FAQ with schema */}
          <DynamicFAQ
            questions={generateDynamicFAQ(
              generateLandingStats(properties),
              bairro.bairro
            )}
            title={`Perguntas frequentes sobre imóveis no ${bairro.bairro}`}
          />

          {/* Cross-linking */}
          <RelatedPages
            title="Explore também"
            links={[
              { href: `/guia/${bairroSlug}`, label: `Guia completo: Morar no ${bairro.bairro}` },
              ...bairro.tipos
                .filter((t) => t.count >= 3)
                .map((t) => ({
                  href: `/imoveis/${bairroSlug}/${slugify(t.tipo)}s`,
                  label: `${t.tipo}s no ${bairro.bairro}`,
                })),
              ...bairros
                .filter((b) => b.slug !== bairroSlug && b.total >= 5)
                .slice(0, 8)
                .map((b) => ({
                  href: `/imoveis/${b.slug}`,
                  label: `Imóveis no ${b.bairro}`,
                })),
            ]}
          />
        </div>
      </section>
    </>
  )
}
