import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getAllBairros, getProperties, getAllTypes, getAllCities, getPropertyStats, getBairroMarketStats } from "@/services/loft"
import { getAllGuiaSlugs } from "@/services/guias"
import { SeoInternalLinks } from "@/components/seo/SeoInternalLinks"
import { SearchPageSearchBar } from "@/components/search/SearchPageSearchBar"
import { slugify, formatPrice } from "@/lib/utils"
import {
  generateLandingTitle,
  generateLandingDescription,
  generateItemListSchema,
  generateLandingStats,
  generateDynamicFAQ,
  safeJsonLd,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyListingGrid } from "@/components/search/PropertyListingGrid"
import { projectForCard } from "@/lib/property-projection"
import { DynamicFAQ } from "@/components/seo/DynamicFAQ"
import { RelatedPages } from "@/components/seo/RelatedPages"
import { BairroMarketStats } from "@/components/bairro/BairroMarketStats"
import { SITE_URL } from "@/lib/constants"

interface BairroPageProps {
  params: Promise<{ bairro: string }>
}

// Slugs com acento (boqueirão), typos ou bairros inexistentes retornam 404 real
// no roteamento — sem dynamicParams: false, notFound() em ISR cacheia como 200
// + noindex meta, e o Google reporta como "Excluída pela tag noindex" (vide
// incidente GSC 27/04/2026 com 44 URLs). Custo: novos bairros no CRM exigem
// redeploy pra serem servidos. Aceitável: Bruno adiciona imóveis em bairros
// existentes, raramente cadastra bairro novo.
export const dynamicParams = false

export async function generateStaticParams() {
  const bairros = await getAllBairros()
  // Only bairros with >=2 imoveis get a dedicated page — avoid thin content.
  return bairros.filter((b) => b.total >= 2).map((b) => ({ bairro: b.slug }))
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
    // Fase 19.P2.A.1 — title com count: "${total} Imóveis no ${bairro}, Curitiba"
    title: generateLandingTitle(undefined, bairro.bairro, bairro.total),
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

// Descricoes SEO curadas pros bairros premium de Curitiba.
// Bairros fora dessa lista recebem descricao gerada dinamicamente a partir
// de stats reais (volume + faixa de preco). Chaves usam nome exato da API.
const bairroDescriptions: Record<string, string> = {
  "Batel": "O Batel é um dos bairros mais nobres de Curitiba, conhecido pela vida noturna, gastronomia refinada e comércio de alto padrão. Localizado próximo ao centro, oferece fácil acesso a toda a cidade com infraestrutura completa.",
  "Água Verde": "O Água Verde combina conveniência urbana com qualidade de vida. Com fartura de comércio, serviços, escolas e fácil acesso ao transporte público, é um dos bairros mais procurados para morar em Curitiba.",
  "Portão": "O Portão é um bairro tradicional e bem estruturado, com excelente rede de transporte, comércio variado e opções de lazer. Ideal para famílias que buscam praticidade no dia a dia.",
  "Centro": "O Centro de Curitiba reúne história, cultura e praticidade. Com acesso a todos os serviços essenciais, transporte público abundante e vida cultural ativa, é perfeito para quem valoriza a vida urbana.",
  "Bigorrilho": "O Bigorrilho é vizinho do Batel e compartilha de sua infraestrutura premium. Bairro residencial com ruas arborizadas, comércio sofisticado e excelente qualidade de vida.",
  "Ecoville": "O Ecoville é um dos bairros mais modernos de Curitiba, com prédios novos, amplas áreas verdes e infraestrutura de primeiro mundo. Ideal para quem busca conforto e modernidade.",
  "Mercês": "O Mercês é um bairro residencial tranquilo, próximo ao Batel e ao Bigorrilho. Oferece boa infraestrutura, ruas calmas e fácil acesso aos principais pontos da cidade.",
  "Juvevê": "O Juvevê é um bairro charmoso e bem localizado, com ruas arborizadas, comércio local variado e proximidade ao centro. Perfeito para quem busca tranquilidade sem abrir mão da conveniência.",
  "Cabral": "O Cabral é um bairro nobre com excelente infraestrutura, próximo ao Jardim Botânico e ao centro. Ruas arborizadas, boas escolas e comércio completo fazem dele um dos mais desejados.",
  "Santa Felicidade": "Santa Felicidade é famoso pela gastronomia italiana e pelo charme interiorano dentro da cidade. Com grandes terrenos e casas amplas, é ideal para quem busca espaço e tranquilidade.",
}

interface BairroStatsForDescription {
  total: number
  cidade: string
  precoMin: number | null
  precoMax: number | null
  tiposPredominantes?: string[]
}

// Gera descricao SEO rica e dinamica pros bairros sem curadoria. Usa dados
// reais do catalogo (volume + faixa de preco) pra evitar thin content quando
// Bruno cadastra bairros novos. Inclui keywords de volume + geografia.
function generateDescriptionFromStats(bairro: string, stats: BairroStatsForDescription): string {
  const { total, cidade, precoMin, precoMax, tiposPredominantes } = stats
  const tiposText = tiposPredominantes && tiposPredominantes.length > 0
    ? tiposPredominantes.slice(0, 3).join(", ").toLowerCase()
    : "apartamentos, casas e sobrados"
  const volumeText = total === 1
    ? `1 imóvel disponível`
    : `${total} imóveis disponíveis`
  const precoText = precoMin && precoMax && precoMin !== precoMax
    ? ` com valores entre ${formatPrice(precoMin)} e ${formatPrice(precoMax)}`
    : precoMin
      ? ` a partir de ${formatPrice(precoMin)}`
      : ""
  return `Explore ${tiposText} no bairro ${bairro}, em ${cidade}. ${volumeText}${precoText}. A FYMOOB ajuda você a encontrar o imóvel ideal com atendimento personalizado e negociações justas.`
}

function getBairroDescription(
  bairroName: string,
  stats?: BairroStatsForDescription
): string {
  const curated = bairroDescriptions[bairroName]
  if (curated) return curated
  if (stats) return generateDescriptionFromStats(bairroName, stats)
  return `Descubra os melhores imóveis disponíveis no ${bairroName}. Apartamentos, casas e sobrados com as melhores condições do mercado. A FYMOOB te ajuda a encontrar o imóvel ideal neste bairro.`
}

export default async function BairroPage({ params }: BairroPageProps) {
  const { bairro: bairroSlug } = await params
  const [bairros, tipos, cidades, stats, marketStats, guiaSlugs] = await Promise.all([
    getAllBairros(),
    getAllTypes(),
    getAllCities(),
    getPropertyStats(),
    getBairroMarketStats(bairroSlug),
    getAllGuiaSlugs(),
  ])
  const hasGuia = guiaSlugs.includes(bairroSlug)
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

  const datasetSchema = marketStats && marketStats.precoMedioVenda
    ? {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: `Dados de mercado imobiliário — ${bairro.bairro}, Curitiba`,
        description: `Estatísticas em tempo real do mercado imobiliário no bairro ${bairro.bairro}: preço médio, preço por m², faixa de valores e área média. Baseado em ${marketStats.totalAtivos} imóveis ativos.`,
        url: `${SITE_URL}/imoveis/${bairroSlug}`,
        creator: { "@id": `${SITE_URL}/#organization` },
        spatialCoverage: {
          "@type": "Place",
          name: `${bairro.bairro}, Curitiba, PR, Brasil`,
        },
        temporalCoverage: new Date().toISOString().slice(0, 10),
        license: "https://creativecommons.org/licenses/by/4.0/",
        keywords: [
          `preço m² ${bairro.bairro}`,
          `mercado imobiliário ${bairro.bairro}`,
          `imóveis ${bairro.bairro} Curitiba`,
        ],
        variableMeasured: [
          marketStats.precoMedioVenda && "Preço médio de venda",
          marketStats.precoM2Medio && "Preço médio por m²",
          marketStats.precoMedioAluguel && "Preço médio de aluguel",
          marketStats.areaMediaVenda && "Área média",
        ].filter(Boolean),
      }
    : null

  const descricao = getBairroDescription(bairro.bairro, {
    total: bairro.total,
    cidade: bairro.cidade || "Curitiba",
    precoMin,
    precoMax,
    tiposPredominantes: bairro.tipos
      ?.slice()
      .sort((a, b) => b.count - a.count)
      .map((t) => t.tipo),
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListSchema) }}
      />
      {datasetSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(datasetSchema) }}
        />
      )}

      <div className="w-full bg-slate-50 px-4 py-8 md:px-12 lg:px-20 2xl:px-32">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Imóveis", url: "/busca" },
            { name: bairro.bairro, url: `/imoveis/${bairroSlug}` },
          ]}
        />

        <h1 className="mt-2 font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
          Imóveis no {bairro.bairro}
        </h1>

        <p className="mt-4 max-w-4xl text-neutral-600">{descricao}</p>

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
              scope={{ bairro: bairroSlug }}
            />
          </Suspense>
        </div>

        <PropertyListingGrid properties={properties.map(p => projectForCard(p))} cardContext="search" />
      </div>

      {/* Dados de mercado agregados (Fase 13.8.2 V1) */}
      {marketStats && <BairroMarketStats stats={marketStats} />}

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

          {/* Cross-linking — inclui pillar pages (comprar/morar/alugar) no topo
              pra reforcar internal linking e sinalizar autoridade ao Google */}
          <RelatedPages
            title="Explore também"
            links={[
              // Guia so aparece se existir MDX em content/guias/{slug}.mdx —
              // evita 404s que o Google estava reportando pros 50+ bairros
              // sem guia dedicado (so 10 tem MDX atualmente). Bug reportado
              // no GSC em 22/04/2026.
              ...(hasGuia
                ? [{ href: `/guia/${bairroSlug}`, label: `Guia completo: Morar no ${bairro.bairro}` }]
                : []),
              { href: "/comprar-imovel-curitiba", label: "Como comprar imóvel em Curitiba" },
              { href: "/morar-em-curitiba", label: "Morar em Curitiba — guia dos bairros" },
              { href: "/alugar-curitiba", label: "Alugar imóvel em Curitiba" },
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

      <SeoInternalLinks groups={[{
        title: `Tipos no ${bairro.bairro}`,
        links: bairro.tipos.map(({ tipo, count }) => ({
          label: `${tipo}s (${count})`,
          href: `/imoveis/${bairroSlug}/${slugify(tipo)}s`,
        })),
      }]} />
    </>
  )
}
