import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import { SearchPageSearchBar } from "@/components/search/SearchPageSearchBar"
import { PropertyListingGrid } from "@/components/search/PropertyListingGrid"
import { SkeletonsGrid } from "@/components/search/SkeletonsGrid"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { SaveSearchButton } from "@/components/search/SaveSearchButton"
import { SortDropdown } from "@/components/search/SortDropdown"
import { MapPin } from "lucide-react"
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
  bairros: string[]
  cidades: string[]
  tipos: PropertyType[]
  finalidades: PropertyFinalidade[]
  quartos?: number
  busca?: string
  canonicalQuery: string
  fullQuery: string
}

const PAGE_SIZE = 24
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

function parseCsvParam(value: string | undefined): string[] {
  if (!value) return []
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function normalizeTypes(values: string[]): PropertyType[] {
  const normalized = new Set<PropertyType>()

  for (const value of values) {
    const parsed = TYPE_BY_SLUG[slugify(value)]
    if (parsed) normalized.add(parsed)
  }

  return Array.from(normalized)
}

function normalizeFinalidades(values: string[]): PropertyFinalidade[] {
  const normalized = new Set<PropertyFinalidade>()

  for (const value of values) {
    const parsed = FINALIDADE_BY_SLUG[slugify(value)]
    if (parsed) normalized.add(parsed)
  }

  return Array.from(normalized)
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
  const tipos = normalizeTypes(parseCsvParam(getParamValue(searchParams.tipo)))
  const finalidades = normalizeFinalidades(
    parseCsvParam(getParamValue(searchParams.finalidade))
  )
  const bairros = parseCsvParam(getParamValue(searchParams.bairro))
  const cidades = parseCsvParam(getParamValue(searchParams.cidade))
  const codigo = getParamValue(searchParams.codigo)
  const busca = getParamValue(searchParams.busca)
  const precoMin = parseNumberParam(getParamValue(searchParams.precoMin))
  const precoMax = parseNumberParam(getParamValue(searchParams.precoMax))
  const areaMin = parseNumberParam(getParamValue(searchParams.areaMin))
  const areaMax = parseNumberParam(getParamValue(searchParams.areaMax))
  const vagasMin = parseNumberParam(getParamValue(searchParams.vagasMin))
  const suitesMin = parseNumberParam(getParamValue(searchParams.suitesMin))
  const banheirosMin = parseNumberParam(getParamValue(searchParams.banheirosMin))
  const quartos =
    parseNumberParam(getParamValue(searchParams.quartos)) ??
    parseNumberParam(getParamValue(searchParams.dormitoriosMin))
  const orderBy = normalizeOrderBy(getParamValue(searchParams.orderBy))
  const page = Math.max(1, parseNumberParam(getParamValue(searchParams.page)) ?? 1)

  const filters: PropertyFilters = {
    page,
    limit: PAGE_SIZE,
  }

  if (tipos.length > 0) {
    filters.tipos = tipos
    if (tipos.length === 1) filters.tipo = tipos[0]
  }
  if (finalidades.length > 0) {
    filters.finalidades = finalidades
    if (finalidades.length === 1) filters.finalidade = finalidades[0]
  }
  if (bairros.length > 0) {
    filters.bairros = bairros
    if (bairros.length === 1) filters.bairro = bairros[0]
  }
  if (cidades.length > 0) {
    filters.cidades = cidades
    if (cidades.length === 1) filters.cidade = cidades[0]
  }
  if (codigo) filters.codigo = codigo
  if (precoMin) filters.precoMin = precoMin
  if (precoMax) filters.precoMax = precoMax
  if (areaMin) filters.areaMin = areaMin
  if (areaMax) filters.areaMax = areaMax
  if (vagasMin) filters.vagasMin = vagasMin
  if (suitesMin) filters.suitesMin = suitesMin
  if (banheirosMin) filters.banheirosMin = banheirosMin
  if (quartos) {
    filters.quartosMin = quartos
    filters.dormitoriosMin = quartos
  }
  if (busca) filters.busca = busca
  if (orderBy) filters.orderBy = orderBy

  const fullQuery = toUrlSearchParams(searchParams).toString()

  const canonicalParams = new URLSearchParams()
  if (cidades.length > 0) canonicalParams.set("cidade", cidades.join(","))
  if (bairros.length > 0) canonicalParams.set("bairro", bairros.join(","))
  if (tipos.length > 0) canonicalParams.set("tipo", tipos.map(slugify).join(","))
  if (finalidades.length > 0) {
    canonicalParams.set("finalidade", finalidades.map(slugify).join(","))
  }
  if (quartos) canonicalParams.set("quartos", String(quartos))
  if (precoMin) canonicalParams.set("precoMin", String(precoMin))
  if (precoMax) canonicalParams.set("precoMax", String(precoMax))
  if (busca) canonicalParams.set("busca", busca)

  return {
    filters,
    page,
    bairros,
    cidades,
    tipos,
    finalidades,
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

  const titleParts: string[] = ["Busca de imóveis"]

  if (state.tipos.length > 0) titleParts.push(state.tipos[0])
  if (state.bairros.length > 0) {
    titleParts.push(`no ${state.bairros[0]}`)
  } else if (state.cidades.length > 0) {
    titleParts.push(`em ${state.cidades[0]}`)
  } else {
    titleParts.push("em Curitiba")
  }

  if (state.quartos) {
    titleParts.push(`com ${state.quartos}+ quartos`)
  }

  const title = titleParts.join(" ")

  const descriptionParts = [
    `${title}.`,
    "Filtros por localização, faixa de preço, quartos e tipo.",
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
  const appliedParams = new URLSearchParams(state.fullQuery)
  appliedParams.delete("page")
  const hasAppliedFilters = appliedParams.toString().length > 0
  const itemListSchema = generateItemListSchema(properties, pagePath)
  const searchResultsSchema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: "Resultados de busca de imóveis em Curitiba",
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

      <div className="flex flex-wrap items-center justify-end gap-2 pb-4">
        <div className="flex items-center gap-2">
          <Suspense fallback={null}>
            <SortDropdown />
          </Suspense>
          <Suspense fallback={null}>
            <SaveSearchButton />
          </Suspense>
          {hasAppliedFilters && (
            <Link
              href="/busca"
              className="whitespace-nowrap text-xs text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground"
            >
              Limpar filtros
            </Link>
          )}
        </div>
      </div>

      <PropertyListingGrid properties={properties} totalLabel="imóveis" />

      {totalPages > 1 && (
        <nav
          aria-label="Paginação dos resultados"
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
            Página {state.page} de {totalPages}
          </span>
          {state.page < totalPages && (
            <PaginationLink
              searchParams={searchParams}
              page={state.page + 1}
              label="Próximo"
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
    <div className="w-full px-4 py-8 md:px-12 lg:px-20 2xl:px-32">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Busca", url: "/busca" },
        ]}
      />

      <h1 className="sr-only">Busca de imóveis em Curitiba</h1>

      <div className="mt-6">
        <SearchPageSearchBar
          bairros={bairros.map((item) => item.bairro)}
          tipos={tipos.map((item) => item.tipo)}
          cidades={cidades}
          priceBounds={{ min: minPrice, max: maxPrice }}
          bairroSummaries={bairros}
          tipoSummaries={tipos}
          sticky
        />
      </div>

      <div className="mt-10">
        <Suspense key={state.fullQuery || "default-search"} fallback={<SkeletonsGrid />}>
          <SearchResults searchParams={params} />
        </Suspense>
      </div>
    </div>
  )
}
