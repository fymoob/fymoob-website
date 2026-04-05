import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProperties } from "@/services/loft"
import { formatPrice } from "@/lib/utils"
import {
  generateItemListSchema,
  generateLandingStats,
  generateDynamicFAQ,
  generateLandingIntro,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGrid } from "@/components/search/PropertyGrid"
import { DynamicFAQ } from "@/components/seo/DynamicFAQ"
import { RelatedPages } from "@/components/seo/RelatedPages"
import { DollarSign, Home, Maximize2, BedDouble } from "lucide-react"

interface FaixaConfig {
  slug: string
  label: string
  title: string
  description: string
  min: number | null
  max: number | null
}

const FAIXAS: FaixaConfig[] = [
  {
    slug: "ate-300-mil",
    label: "Até R$ 300 mil",
    title: "Imóveis até R$ 300 mil em Curitiba",
    description: "Encontre imóveis com preços acessíveis em Curitiba. Apartamentos, casas e terrenos até R$ 300 mil com ótimas condições.",
    min: null,
    max: 300000,
  },
  {
    slug: "300-a-500-mil",
    label: "R$ 300 a 500 mil",
    title: "Imóveis de R$ 300 a 500 mil em Curitiba",
    description: "Imóveis na faixa de R$ 300 a 500 mil em Curitiba. Apartamentos e casas com bom custo-benefício nos melhores bairros.",
    min: 300000,
    max: 500000,
  },
  {
    slug: "500-mil-a-1-milhao",
    label: "R$ 500 mil a 1 milhão",
    title: "Imóveis de R$ 500 mil a R$ 1 milhão em Curitiba",
    description: "Imóveis de médio a alto padrão em Curitiba. Apartamentos amplos e casas em bairros valorizados.",
    min: 500000,
    max: 1000000,
  },
  {
    slug: "1-a-3-milhoes",
    label: "R$ 1 a 3 milhões",
    title: "Imóveis de R$ 1 a 3 milhões em Curitiba",
    description: "Imóveis de alto padrão em Curitiba. Coberturas, apartamentos e casas nos bairros mais nobres da cidade.",
    min: 1000000,
    max: 3000000,
  },
  {
    slug: "acima-3-milhoes",
    label: "Acima de R$ 3 milhões",
    title: "Imóveis acima de R$ 3 milhões em Curitiba",
    description: "Imóveis de luxo em Curitiba. As melhores propriedades com acabamento premium e localização privilegiada.",
    min: 3000000,
    max: null,
  },
]

function getFaixa(slug: string): FaixaConfig | undefined {
  return FAIXAS.find((f) => f.slug === slug)
}

interface FaixaPageProps {
  params: Promise<{ faixa: string }>
}

export async function generateStaticParams() {
  return FAIXAS.map((f) => ({ faixa: f.slug }))
}

export async function generateMetadata({ params }: FaixaPageProps): Promise<Metadata> {
  const { faixa: faixaSlug } = await params
  const faixa = getFaixa(faixaSlug)
  if (!faixa) return {}

  return {
    title: faixa.title,
    description: faixa.description,
    alternates: { canonical: `/imoveis/preco/${faixaSlug}` },
  }
}

export default async function FaixaPrecoPage({ params }: FaixaPageProps) {
  const { faixa: faixaSlug } = await params
  const faixa = getFaixa(faixaSlug)
  if (!faixa) notFound()

  const { properties } = await getProperties({
    precoMin: faixa.min ?? undefined,
    precoMax: faixa.max ?? undefined,
    limit: 1000,
  })

  const stats = generateLandingStats(properties)
  const intro = generateLandingIntro(properties)
  const faqQuestions = generateDynamicFAQ(stats).map((q) => ({
    ...q,
    question: q.question.replace("em Curitiba", `na faixa ${faixa.label} em Curitiba`),
  }))
  const itemListSchema = generateItemListSchema(properties, `/imoveis/preco/${faixaSlug}`)

  const otherFaixas = FAIXAS.filter((f) => f.slug !== faixaSlug).map((f) => ({
    href: `/imoveis/preco/${f.slug}`,
    label: f.label,
  }))

  // Top neighborhoods in this range
  const bairroMap = new Map<string, number>()
  for (const p of properties) {
    if (p.bairro) bairroMap.set(p.bairro, (bairroMap.get(p.bairro) || 0) + 1)
  }
  const topBairros = Array.from(bairroMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([bairro, count]) => ({
      href: `/imoveis/${bairro.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`,
      label: `${bairro} (${count})`,
    }))

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
              { name: "Imóveis", url: "/busca" },
              { name: faixa.label, url: `/imoveis/preco/${faixaSlug}` },
            ]}
          />

          <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            {faixa.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
            {intro || faixa.description}
          </p>

          {stats.total > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                <Home className="size-4 text-brand-primary" />
                <span><strong>{stats.total}</strong> imóveis</span>
              </div>
              {stats.precoMin && stats.precoMax && (
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                  <DollarSign className="size-4 text-brand-primary" />
                  <span>{formatPrice(stats.precoMin)} — {formatPrice(stats.precoMax)}</span>
                </div>
              )}
              {stats.areaMedio && (
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                  <Maximize2 className="size-4 text-brand-primary" />
                  <span>Média <strong>{stats.areaMedio} m²</strong></span>
                </div>
              )}
              {stats.quartosMedio && (
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                  <BedDouble className="size-4 text-brand-primary" />
                  <span>Média <strong>{stats.quartosMedio} quartos</strong></span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {properties.length > 0 ? (
            <PropertyGrid properties={properties} />
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-neutral-500">
                Nenhum imóvel encontrado nesta faixa de preço no momento.
              </p>
              <a href="/busca" className="mt-4 inline-block text-brand-primary hover:underline">
                Ver todos os imóveis
              </a>
            </div>
          )}
        </div>
      </section>

      {/* FAQ + Related */}
      <section className="border-t border-neutral-100 bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          {faqQuestions.length > 0 && (
            <DynamicFAQ
              questions={faqQuestions}
              title={`Perguntas sobre imóveis ${faixa.label.toLowerCase()}`}
            />
          )}
          <RelatedPages title="Outras faixas de preço" links={otherFaixas} />
          {topBairros.length > 0 && (
            <RelatedPages title="Bairros com mais opções nesta faixa" links={topBairros} />
          )}
        </div>
      </section>
    </>
  )
}
