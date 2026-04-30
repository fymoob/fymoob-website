import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import { SearchPageSearchBar } from "@/components/search/SearchPageSearchBar"
import { PropertyListingGrid } from "@/components/search/PropertyListingGrid"
import { SkeletonsGrid } from "@/components/search/SkeletonsGrid"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { SaveSearchButton } from "@/components/search/SaveSearchButton"
import { SortDropdown } from "@/components/search/SortDropdown"
import { generateItemListSchema , safeJsonLd} from "@/lib/seo"
import { slugify } from "@/lib/utils"
import {
  getAllBairros,
  getAllBairrosByCidade,
  getAllCaracteristicas,
  getAllCities,
  getAllEmpreendimentos,
  getAllTypes,
  getProperties,
  getPropertyStats,
} from "@/services/loft"
import type { PropertyFilters, PropertyFinalidade, PropertyType } from "@/types/property"
import { projectForCard } from "@/lib/property-projection"

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
  quartosMax?: number
  caracteristicasUnidade: string[]
  caracteristicasCondominio: string[]
  busca?: string
  canonicalQuery: string
  fullQuery: string
}

const PAGE_SIZE = 24
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com.br"

const TYPE_BY_SLUG: Record<string, PropertyType> = {
  apartamento: "Apartamento",
  casa: "Casa",
  sobrado: "Sobrado",
  terreno: "Terreno",
}

const FINALIDADE_BY_SLUG: Record<string, PropertyFinalidade> = {
  venda: "Venda",
  locacao: "Locação",
  aluguel: "Locação",
  "venda-e-locacao": "Venda e Locação",
  "venda-e-aluguel": "Venda e Locação",
}

const ORDER_BY_VALUES = new Set<PropertyFilters["orderBy"]>([
  "preco-asc",
  "preco-desc",
  "area-asc",
  "area-desc",
  "recente",
  "relevante",
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
    parseNumberParam(getParamValue(searchParams.quartosMin)) ??
    parseNumberParam(getParamValue(searchParams.quartos)) ??
    parseNumberParam(getParamValue(searchParams.dormitoriosMin))
  const quartosMax = parseNumberParam(getParamValue(searchParams.quartosMax))
  const caracteristicasUnidade = (getParamValue(searchParams.caracUnidade) ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)
  const caracteristicasCondominio = (getParamValue(searchParams.caracCondominio) ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)
  const empreendimentosParam =
    getParamValue(searchParams.empreendimentos) ?? getParamValue(searchParams.empreendimento) ?? ""
  const empreendimentosSelected = empreendimentosParam
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
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
  if (quartosMax) filters.quartosMax = quartosMax
  if (caracteristicasUnidade.length > 0) filters.caracteristicasUnidade = caracteristicasUnidade
  if (caracteristicasCondominio.length > 0) filters.caracteristicasCondominio = caracteristicasCondominio
  if (empreendimentosSelected.length > 0) {
    filters.empreendimentos = empreendimentosSelected
    if (empreendimentosSelected.length === 1) filters.empreendimento = empreendimentosSelected[0]
  }
  if (busca) filters.busca = busca
  if (orderBy) filters.orderBy = orderBy
  const lancamento = getParamValue(searchParams.lancamento)
  if (lancamento === "true") filters.lancamento = true

  const fullQuery = toUrlSearchParams(searchParams).toString()

  const canonicalParams = new URLSearchParams()
  if (cidades.length > 0) canonicalParams.set("cidade", cidades.join(","))
  if (bairros.length > 0) canonicalParams.set("bairro", bairros.join(","))
  if (tipos.length > 0) canonicalParams.set("tipo", tipos.map(slugify).join(","))
  if (finalidades.length > 0) {
    canonicalParams.set("finalidade", finalidades.map(slugify).join(","))
  }
  if (quartos) canonicalParams.set("quartosMin", String(quartos))
  if (quartosMax) canonicalParams.set("quartosMax", String(quartosMax))
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
    quartos: quartos ?? undefined,
    quartosMax: quartosMax ?? undefined,
    caracteristicasUnidade,
    caracteristicasCondominio,
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

  if (state.quartos && state.quartosMax) {
    titleParts.push(
      state.quartos === state.quartosMax
        ? `com ${state.quartos} quartos`
        : `com ${state.quartos} a ${state.quartosMax} quartos`
    )
  } else if (state.quartos) {
    titleParts.push(`com ${state.quartos}+ quartos`)
  } else if (state.quartosMax) {
    titleParts.push(`até ${state.quartosMax} quartos`)
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

  return (
    <section aria-labelledby="search-results-title" className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListSchema) }}
      />


      <PropertyListingGrid
        properties={properties.map(p => projectForCard(p))}
        total={total}
        totalLabel="imóveis"
        cardContext="search"
        priceContext={
          state.finalidades.length === 1 && state.finalidades[0] === "Locação"
            ? "locacao"
            : state.finalidades.length === 1 && state.finalidades[0] === "Venda"
              ? "venda"
              : null
        }
        toolbarActions={
          <>
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
          </>
        }
      />

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

  const [bairros, bairrosByCidade, caracteristicas, tipos, cidades, stats, empreendimentos] = await Promise.all([
    getAllBairros(),
    getAllBairrosByCidade(),
    getAllCaracteristicas(),
    getAllTypes(),
    getAllCities(),
    getPropertyStats(),
    getAllEmpreendimentos(),
  ])

  const minPrice = stats.precoMin ?? 50_000
  const maxPrice = stats.precoMax ?? 5_000_000

  return (
    <div
      className="w-full bg-white px-4 py-8 md:px-12 lg:px-20 2xl:px-32"
      style={{
        // Minimal architectural mesh: deep cerulean + warm ocre, both at
        // very low opacity. Sober, premium feel (Aesop/Apple/Loft pattern)
        // — the gradient is a background accent, not a protagonist.
        backgroundImage: [
          "radial-gradient(ellipse 1300px 620px at 12% -12%, rgba(2, 132, 199, 0.10), transparent 72%)",
          "radial-gradient(ellipse 1100px 600px at 88% -8%, rgba(180, 142, 102, 0.07), transparent 72%)",
        ].join(", "),
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 560px, 100% 560px",
      }}
    >
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
          empreendimentos={empreendimentos.map((e) => e.nome)}
          priceBounds={{ min: minPrice, max: maxPrice }}
          bairroSummaries={bairrosByCidade.map(({ bairro, slug, total, cidade, tipos: t, porFinalidade }) => ({ bairro, slug, total, cidade, tipos: t, porFinalidade }))}
          tipoSummaries={tipos.map(({ tipo, slug, total, porFinalidade }) => ({ tipo, slug, total, porFinalidade }))}
          caracteristicas={caracteristicas}
          sticky
        />
      </div>

      <div className="mt-6">
        <Suspense key={state.fullQuery || "default-search"} fallback={<SkeletonsGrid />}>
          <SearchResults searchParams={params} />
        </Suspense>
      </div>

      {/* Bloco SEO denso — Fase 19.P0.13 (gap pos-audit). /busca tinha
          apenas 38 palavras, super thin. Adiciona ~400 palavras de
          conteudo educativo + internal links pra capturar queries
          genericas e reforcar autoridade da pagina. */}
      <section className="mt-16 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10">
        <h2 className="font-display text-xl font-bold text-neutral-900 md:text-2xl">
          Como buscar imóveis em Curitiba na FYMOOB
        </h2>
        <div className="mt-5 space-y-4 leading-relaxed text-neutral-700">
          <p>
            A busca da <strong>FYMOOB Imobiliária</strong> (CRECI J 9420) cobre todo o catálogo
            ativo de Curitiba e região metropolitana — apartamentos, casas, sobrados, terrenos,
            lojas e salas comerciais. Os filtros permitem refinar por <strong>cidade, bairro,
            tipo, finalidade (venda/aluguel), número de quartos, faixa de preço, área privativa
            </strong> e características específicas (mobiliado, pet, lazer, etc).
          </p>
          <p>
            Os resultados são <strong>atualizados em tempo real</strong> — quando um imóvel é
            vendido ou alugado, ele sai da listagem em até 60 minutos. Não trabalhamos com
            anúncios fantasma. Cada imóvel exibe foto principal, valor, área, número de quartos,
            bairro e botão direto pra WhatsApp da FYMOOB <strong>(41) 99978-0517</strong>.
          </p>
          <p>
            Para uma busca mais focada por intenção, use também as landings dedicadas:{" "}
            <Link href="/apartamentos-curitiba" className="font-semibold text-brand-primary hover:underline">apartamentos em Curitiba</Link>,{" "}
            <Link href="/casas-curitiba" className="font-semibold text-brand-primary hover:underline">casas</Link>,{" "}
            <Link href="/sobrados-curitiba" className="font-semibold text-brand-primary hover:underline">sobrados</Link>,{" "}
            <Link href="/terrenos-curitiba" className="font-semibold text-brand-primary hover:underline">terrenos</Link>,{" "}
            <Link href="/lancamentos" className="font-semibold text-brand-primary hover:underline">lançamentos</Link> ou{" "}
            <Link href="/empreendimentos" className="font-semibold text-brand-primary hover:underline">empreendimentos completos</Link>.
            Para faixas específicas:{" "}
            <Link href="/imoveis/preco/ate-300-mil" className="text-brand-primary hover:underline">imóveis até R$ 300 mil</Link>,{" "}
            <Link href="/imoveis/preco/300-a-500-mil" className="text-brand-primary hover:underline">de R$ 300-500 mil</Link>,{" "}
            <Link href="/imoveis/preco/500-mil-a-1-milhao" className="text-brand-primary hover:underline">R$ 500 mil-1 mi</Link>,{" "}
            <Link href="/imoveis/preco/1-a-3-milhoes" className="text-brand-primary hover:underline">1-3 mi</Link>{" "}
            e <Link href="/imoveis/preco/acima-3-milhoes" className="text-brand-primary hover:underline">acima de R$ 3 mi</Link>.
          </p>
          <p>
            Bairros mais procurados:{" "}
            <Link href="/imoveis/batel" className="text-brand-primary hover:underline">Batel</Link>,{" "}
            <Link href="/imoveis/bigorrilho" className="text-brand-primary hover:underline">Bigorrilho</Link>,{" "}
            <Link href="/imoveis/agua-verde" className="text-brand-primary hover:underline">Água Verde</Link>,{" "}
            <Link href="/imoveis/ecoville" className="text-brand-primary hover:underline">Ecoville</Link>,{" "}
            <Link href="/imoveis/mossungue" className="text-brand-primary hover:underline">Mossunguê</Link>,{" "}
            <Link href="/imoveis/cabral" className="text-brand-primary hover:underline">Cabral</Link>,{" "}
            <Link href="/imoveis/portao" className="text-brand-primary hover:underline">Portão</Link>,{" "}
            <Link href="/imoveis/cristo-rei" className="text-brand-primary hover:underline">Cristo Rei</Link>,{" "}
            <Link href="/imoveis/centro" className="text-brand-primary hover:underline">Centro</Link>,{" "}
            <Link href="/imoveis/juveve" className="text-brand-primary hover:underline">Juvevê</Link>.
            Para detalhes sobre cada bairro (escolas, infraestrutura, custo de vida), consulte
            os{" "}
            <Link href="/morar-em-curitiba" className="font-semibold text-brand-primary hover:underline">
              guias de morar em Curitiba
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
