import type { Metadata } from "next"
import { safeJsonLd } from "@/lib/seo"
import { Suspense } from "react"
import { getProperties, getAllBairros, getAllTypes, getAllCities, getPropertyStats } from "@/services/loft"
import { SeoInternalLinks, buildBairrosGroup } from "@/components/seo/SeoInternalLinks"
import { SearchPageSearchBar } from "@/components/search/SearchPageSearchBar"
import { formatPrice } from "@/lib/utils"
import {
  generateLandingTitle,
  generateLandingDescription,
  generateItemListSchema,
  generateLandingFAQ,
  generateAggregateOfferSchema,
  generateLocalBusinessSchema,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyListingGrid } from "@/components/search/PropertyListingGrid"
import { projectForCard } from "@/lib/property-projection"
import { Pagination } from "@/components/search/Pagination"
import { DynamicFAQ } from "@/components/seo/DynamicFAQ"
import { LandingSEOContent } from "@/components/seo/LandingSEOContent"
import { BairroPriceTable } from "@/components/seo/BairroPriceTable"

export async function generateMetadata(): Promise<Metadata> {
  const { properties } = await getProperties({ tipo: "Apartamento", limit: 500 })
  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)

  return {
    title: generateLandingTitle("Apartamento", undefined, properties.length),
    description: generateLandingDescription("Apartamento", undefined, properties.length, {
      min: precos.length > 0 ? Math.min(...precos) : null,
      max: precos.length > 0 ? Math.max(...precos) : null,
    }),
    alternates: {
      canonical: "/apartamentos-curitiba",
    },
  }
}

const PAGE_SIZE = 24

export default async function ApartamentosCuritibaPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1)

  // Fetch paralelo: pagina visivel (24) + amostra ampla pra BairroPriceTable.
  // 500 e suficiente pra agregar 15 top bairros com ~15-30 imoveis cada
  // sem custo adicional vs todas as queries (cache compartilhado).
  const [{ properties, total }, allApartmentsForStats, bairros, tipos, cidades, stats] = await Promise.all([
    getProperties({ tipo: "Apartamento", page, limit: PAGE_SIZE }),
    getProperties({ tipo: "Apartamento", limit: 500 }),
    getAllBairros(),
    getAllTypes(),
    getAllCities(),
    getPropertyStats(),
  ])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)
  const precoMin = precos.length > 0 ? Math.min(...precos) : null
  const precoMax = precos.length > 0 ? Math.max(...precos) : null

  // Bairros com 3+ apartamentos: alvo de internal linking. Antes mostrava ~6,
  // agora mostra 15+ pra nivelar com MySide (Fase 19.P0.5).
  const bairrosComApto = bairros.filter((b) =>
    b.tipos.some((t) => t.tipo === "Apartamento" && t.count >= 3)
  )

  // Schema rico — cada item tem @type Apartment com numberOfRooms, floorSize,
  // address, offers (Fase 19.P0.2). Substitui o ItemList simples anterior.
  const itemListSchema = generateItemListSchema(properties, "/apartamentos-curitiba")

  // AggregateOffer — Fase 19.P2.Q.bonus. Rich snippet com faixa de preco
  // total no SERP ("R$ X – R$ Y · 120 disponiveis"). Empreendimentos /standard
  // ja usam (Sessao B), agora estendido pra landing tipada.
  const aggregateOfferSchema =
    precoMin && precoMax && total > 0
      ? generateAggregateOfferSchema({
          pagePath: "/apartamentos-curitiba",
          name: "Apartamentos a Venda e Aluguel em Curitiba",
          lowPrice: precoMin,
          highPrice: precoMax,
          offerCount: total,
          itemType: "Apartment",
        })
      : null

  // RealEstateAgent — Fase 19.P2.Q.bonus. Reforca entidade FYMOOB na pagina
  // especifica (alem do schema global no layout). Sinaliza pro Google
  // "isto e uma imobiliaria real, nao agregador".
  const agentSchema = generateLocalBusinessSchema()

  // FAQ ricas — 8 Q&A com dados externos (FipeZAP, IBGE, Caixa). Fase 19.P0.1
  // (gap mais critico vs MySide). DynamicFAQ ja cuida do schema FAQPage.
  const faqQuestions = generateLandingFAQ("Apartamento", total, precoMin, precoMax)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListSchema) }}
      />
      {aggregateOfferSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(aggregateOfferSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(agentSchema) }}
      />

      <div className="w-full bg-slate-50 px-4 py-8 md:px-12 lg:px-20 2xl:px-32">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Apartamentos em Curitiba", url: "/apartamentos-curitiba" },
          ]}
        />

        {/* H1 com numero especifico — Fase 19.P0.3.
            Padrao MySide: "Apartamentos a venda em 408 edificios em Curitiba".
            FYMOOB usa total real do catalogo + #bairros cobertos. */}
        <h1 className="mt-2 font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
          {total} Apartamentos à Venda e Aluguel em {bairrosComApto.length}+ Bairros de Curitiba
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-600">
          <span>
            <span className="font-semibold text-neutral-900">{properties.length}</span> apartamentos disponíveis
          </span>
          {precoMin && precoMax && (
            <span>
              De <span className="font-semibold text-neutral-900">{formatPrice(precoMin)}</span> a{" "}
              <span className="font-semibold text-neutral-900">{formatPrice(precoMax)}</span>
            </span>
          )}
        </div>

        <p className="mt-4 max-w-4xl text-neutral-600">
          Procurando apartamento em Curitiba? A FYMOOB tem as melhores opções de apartamentos
          à venda e para alugar nos principais bairros da cidade. Encontre apartamentos com
          diferentes metragens, quartos e faixas de preço.
        </p>

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
              scope={{ tipo: "apartamento" }}
            />
          </Suspense>
        </div>

        <PropertyListingGrid properties={properties.map(p => projectForCard(p))} total={total} totalLabel="apartamentos" cardContext="search" />
        <Pagination currentPage={page} totalPages={totalPages} basePath="/apartamentos-curitiba" />
      </div>

      {/* Bloco SEO textual ~1000 palavras — Fase 19.P0.4. Antes da FAQ pra
          dar contexto crawlavel rico (Google indexa texto, nao cards). */}
      <LandingSEOContent tipo="Apartamento" total={total} />

      {/* Tabela "Preço por bairro" dinamica — Fase 19.P2.Q.bonus.
          Conteudo unico baseado em dados ao vivo do CRM. Bairros linkados
          pra landings combinadas distribuem PageRank. */}
      <BairroPriceTable
        properties={allApartmentsForStats.properties}
        tipoSlug="apartamentos"
        title="Preço médio de apartamentos por bairro em Curitiba"
        limit={15}
      />

      {/* FAQ + Internal Links */}
      <section className="bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <DynamicFAQ
            questions={faqQuestions}
            title="Perguntas frequentes sobre apartamentos em Curitiba"
          />
        </div>
      </section>

      <SeoInternalLinks groups={[buildBairrosGroup(bairrosComApto, { tipoSlug: "apartamentos", title: "Apartamentos por Bairro" })]} />
    </>
  )
}
