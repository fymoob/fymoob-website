import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import { FilterBar } from "@/components/search/FilterBar"
import { PropertyGrid } from "@/components/search/PropertyGrid"
import { SkeletonsGrid } from "@/components/search/SkeletonsGrid"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { generateItemListSchema } from "@/lib/seo"
import { slugify } from "@/lib/utils"
import {
  getAllBairros,
  getAllCities,
  getAllTypes,
  getProperties,
  getPropertyStats,
} from "@/services/loft"
import type { PropertyFilters, PropertyFinalidade, PropertyType } from "@/types/property"

type SearchParamValue = string | string[] | undefined
type SearchParamsMap = Record<string, SearchParamValue>

interface BuscaPageProps {
  searchParams: Promise<SearchParamsMap>
}

interface ParsedSearchState {
  filters: PropertyFilters
  page: number
  bairro?: string
  cidade?: string
  tipo?: PropertyType
  quartos?: number
  busca?: string
  canonicalQuery: string
  fullQuery: string
}

const PAGE_SIZE = 12
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com"

const TYPE_BY_SLUG: Record<string, PropertyType> = {
  apartamento: "Apartamento",
  casa: "Casa",
  sobrado: "Sobrado",
  terreno: "Terreno",
}

const FINALIDADE_BY_SLUG: Record<string, PropertyFinalidade> = {
  venda: "Venda",
  locacao: "Locação",
  "venda-e-locacao": "Venda e Locação",
}

const ORDER_BY_VALUES = new Set<PropertyFilters["orderBy"]>([
  "preco-asc",
  "preco-desc",
  "area-asc",
  "area-desc",
  "recente",
])

function getParamValue(param: SearchParamValue): string | undefined {
  if (!param) return undefined
  if (Array.isArray(param)) return param.find(Boolean)
  return param
}

function parseNumberParam(value: string | undefined): number | undefined {
  if (!value) return undefined
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return undefined
  return parsed
}

function normalizeType(value: string | undefined): PropertyType | undefined {
  if (!value) return undefined
  return TYPE_BY_SLUG[slugify(value)]
}

function normalizeFinalidade(value: string | undefined): PropertyFinalidade | undefined {
  if (!value) return undefined
  return FINALIDADE_BY_SLUG[slugify(value)]
}

function normalizeOrderBy(
  value: string | undefined
): PropertyFilters["orderBy"] | undefined {
  if (!value) return undefined
  return ORDER_BY_VALUES.has(value as PropertyFilters["orderBy"])
    ? (value as PropertyFilters["orderBy"])
    : undefined
}

function toUrlSearchParams(searchParams: SearchParamsMap): URLSearchParams {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(searchParams)) {
    const resolved = getParamValue(value)
    if (resolved) {
      params.set(key, resolved)
    }
  }

  return params
}

function parseSearchState(searchParams: SearchParamsMap): ParsedSearchState {
  const tipo = normalizeType(getParamValue(searchParams.tipo))
  const finalidade = normalizeFinalidade(getParamValue(searchParams.finalidade))
  const bairro = getParamValue(searchParams.bairro)
  const cidade = getParamValue(searchParams.cidade)
  const codigo = getParamValue(searchParams.codigo)
  const busca = getParamValue(searchParams.busca)
  const precoMin = parseNumberParam(getParamValue(searchParams.precoMin))
  const precoMax = parseNumberParam(getParamValue(searchParams.precoMax))
  const areaMin = parseNumberParam(getParamValue(searchParams.areaMin))
  const areaMax = parseNumberParam(getParamValue(searchParams.areaMax))
  const vagasMin = parseNumberParam(getParamValue(searchParams.vagasMin))
  const quartos =
    parseNumberParam(getParamValue(searchParams.quartos)) ??
    parseNumberParam(getParamValue(searchParams.dormitoriosMin))
  const orderBy = normalizeOrderBy(getParamValue(searchParams.orderBy))
  const page = Math.max(1, parseNumberParam(getParamValue(searchParams.page)) ?? 1)

  const filters: PropertyFilters = {
    page,
    limit: PAGE_SIZE,
  }

  if (tipo) filters.tipo = tipo
  if (finalidade) filters.finalidade = finalidade
  if (bairro) filters.bairro = bairro
  if (cidade) filters.cidade = cidade
  if (codigo) filters.codigo = codigo
  if (precoMin) filters.precoMin = precoMin
  if (precoMax) filters.precoMax = precoMax
  if (areaMin) filters.areaMin = areaMin
  if (areaMax) filters.areaMax = areaMax
  if (vagasMin) filters.vagasMin = vagasMin
  if (quartos) {
    filters.quartosMin = quartos
    filters.dormitoriosMin = quartos
  }
  if (busca) filters.busca = busca
  if (orderBy) filters.orderBy = orderBy

  const fullQuery = toUrlSearchParams(searchParams).toString()

  const canonicalParams = new URLSearchParams()
  if (cidade) canonicalParams.set("cidade", cidade)
  if (bairro) canonicalParams.set("bairro", bairro)
  if (tipo) canonicalParams.set("tipo", tipo)
  if (finalidade) canonicalParams.set("finalidade", finalidade)
  if (quartos) canonicalParams.set("quartos", String(quartos))
  if (precoMin) canonicalParams.set("precoMin", String(precoMin))
  if (precoMax) canonicalParams.set("precoMax", String(precoMax))
  if (busca) canonicalParams.set("busca", busca)

  return {
    filters,
    page,
    bairro,
    cidade,
    tipo,
    quartos,
    busca,
    canonicalQuery: canonicalParams.toString(),
    fullQuery,
  }
}

export async function generateMetadata({
  searchParams,
}: BuscaPageProps): Promise<Metadata> {
  const params = await searchParams
  const state = parseSearchState(params)

  const titleParts: string[] = ["Busca de imoveis"]

  if (state.tipo) titleParts.push(state.tipo)
  if (state.bairro) {
    titleParts.push(`no ${state.bairro}`)
  } else if (state.cidade) {
    titleParts.push(`em ${state.cidade}`)
  } else {
    titleParts.push("em Curitiba")
  }

  if (state.quartos) {
    titleParts.push(`com ${state.quartos}+ quartos`)
  }

  const title = titleParts.join(" ")

  const descriptionParts = [
    `${title}.`,
    "Filtros por localizacao, faixa de preco, quartos e tipo.",
  ]
  if (state.busca) {
    descriptionParts.push(`Termo ativo: ${state.busca}.`)
  }
  descriptionParts.push("Resultados atualizados em tempo real na FYMOOB.")

  return {
    title,
    description: descriptionParts.join(" "),
    alternates: {
      canonical: state.canonicalQuery ? `/busca?${state.canonicalQuery}` : "/busca",
    },
  }
}

async function SearchResults({ searchParams }: { searchParams: SearchParamsMap }) {
  const state = parseSearchState(searchParams)
  const { properties, total } = await getProperties(state.filters)
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const pagePath = state.fullQuery ? `/busca?${state.fullQuery}` : "/busca"
  const itemListSchema = generateItemListSchema(properties, pagePath)
  const searchResultsSchema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: "Resultados de busca de imoveis em Curitiba",
    url: `${SITE_URL}${pagePath}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: total,
      itemListElement: properties.map((property, index) => ({
        "@type": "ListItem",
        position: (state.page - 1) * PAGE_SIZE + index + 1,
        url: `${SITE_URL}/imovel/${property.slug}`,
        name: property.titulo,
      })),
    },
  }

  return (
    <section aria-labelledby="search-results-title" className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchResultsSchema) }}
      />

      <div className="flex items-center justify-between">
        <p id="search-results-title" className="text-sm text-neutral-500">
          <span className="font-semibold text-neutral-950">{total}</span>{" "}
          {total === 1 ? "imovel encontrado" : "imoveis encontrados"}
        </p>
      </div>

      <PropertyGrid properties={properties} />

      {totalPages > 1 && (
        <nav
          aria-label="Paginacao dos resultados"
          className="flex items-center justify-center gap-2"
        >
          {state.page > 1 && (
            <PaginationLink
              searchParams={searchParams}
              page={state.page - 1}
              label="Anterior"
            />
          )}
          <span className="px-4 text-sm text-neutral-500">
            Pagina {state.page} de {totalPages}
          </span>
          {state.page < totalPages && (
            <PaginationLink
              searchParams={searchParams}
              page={state.page + 1}
              label="Proximo"
            />
          )}
        </nav>
      )}
    </section>
  )
}

function PaginationLink({
  searchParams,
  page,
  label,
}: {
  searchParams: SearchParamsMap
  page: number
  label: string
}) {
  const params = toUrlSearchParams(searchParams)
  params.set("page", String(page))

  return (
    <Link
      href={`/busca?${params.toString()}`}
      className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-brand-primary hover:text-brand-primary"
    >
      {label}
    </Link>
  )
}

export default async function BuscaPage({ searchParams }: BuscaPageProps) {
  const params = await searchParams
  const state = parseSearchState(params)

  const [bairros, tipos, cidades, stats] = await Promise.all([
    getAllBairros(),
    getAllTypes(),
    getAllCities(),
    getPropertyStats(),
  ])

  const minPrice = stats.precoMin ?? 50_000
  const maxPrice = stats.precoMax ?? 5_000_000

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Busca", url: "/busca" },
        ]}
      />

      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
          Busca de imoveis em Curitiba
        </h1>
        <p className="max-w-3xl text-neutral-500">
          Descubra opcoes selecionadas com filtros inteligentes, visual premium e
          resultado indexavel por URL para SEO de cauda longa.
        </p>
      </header>

      <div className="mt-6">
        <FilterBar
          bairros={bairros.map((item) => item.bairro)}
          tipos={tipos.map((item) => item.tipo)}
          cidades={cidades}
          priceBounds={{ min: minPrice, max: maxPrice }}
        />
      </div>

      <div className="mt-6">
        <Suspense key={state.fullQuery || "default-search"} fallback={<SkeletonsGrid />}>
          <SearchResults searchParams={params} />
        </Suspense>
      </div>
    </div>
  )
}
