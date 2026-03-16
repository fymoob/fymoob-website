import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { getProperties, getAllBairros, getAllTypes } from "@/services/loft"
import { SearchFilters } from "@/components/search/SearchFilters"
import { PropertyGrid } from "@/components/search/PropertyGrid"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import type { PropertyFilters, PropertyType, PropertyFinalidade } from "@/types/property"

interface BuscaPageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

export async function generateMetadata({
  searchParams,
}: BuscaPageProps): Promise<Metadata> {
  const params = await searchParams
  const parts: string[] = ["Imóveis"]

  if (params.tipo) parts.push(params.tipo)
  if (params.bairro) parts.push(`no ${params.bairro}`)
  parts.push("em Curitiba")

  const title = parts.join(" ")
  return {
    title,
    description: `Busque ${title.toLowerCase()}. Filtros por tipo, bairro, preço e mais. FYMOOB Imobiliária.`,
    alternates: {
      canonical: "/busca",
    },
  }
}

async function BuscaContent({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>
}) {
  const filters: PropertyFilters = {}
  const page = Number(searchParams.page) || 1

  if (searchParams.tipo) filters.tipo = searchParams.tipo as PropertyType
  if (searchParams.finalidade)
    filters.finalidade = searchParams.finalidade as PropertyFinalidade
  if (searchParams.bairro) filters.bairro = searchParams.bairro
  if (searchParams.precoMin) filters.precoMin = Number(searchParams.precoMin)
  if (searchParams.precoMax) filters.precoMax = Number(searchParams.precoMax)
  if (searchParams.dormitoriosMin)
    filters.dormitoriosMin = Number(searchParams.dormitoriosMin)
  if (searchParams.areaMin) filters.areaMin = Number(searchParams.areaMin)
  if (searchParams.orderBy)
    filters.orderBy = searchParams.orderBy as PropertyFilters["orderBy"]
  if (searchParams.busca) filters.busca = searchParams.busca

  filters.page = page
  filters.limit = 20

  const [{ properties, total }, bairros, types] = await Promise.all([
    getProperties(filters),
    getAllBairros(),
    getAllTypes(),
  ])

  const totalPages = Math.ceil(total / 20)
  const bairroNames = bairros.map((b) => b.bairro)
  const tipoNames = types.map((t) => t.tipo)

  return (
    <>
      <SearchFilters bairros={bairroNames} tipos={tipoNames} />

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-fymoob-gray-mid">
          <span className="font-semibold text-fymoob-gray-dark">{total}</span>{" "}
          {total === 1 ? "imóvel encontrado" : "imóveis encontrados"}
        </p>
      </div>

      <div className="mt-6">
        <PropertyGrid properties={properties} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {page > 1 && (
            <PaginationLink
              searchParams={searchParams}
              page={page - 1}
              label="Anterior"
            />
          )}
          <span className="px-4 text-sm text-fymoob-gray-mid">
            Página {page} de {totalPages}
          </span>
          {page < totalPages && (
            <PaginationLink
              searchParams={searchParams}
              page={page + 1}
              label="Próximo"
            />
          )}
        </div>
      )}
    </>
  )
}

function PaginationLink({
  searchParams,
  page,
  label,
}: {
  searchParams: Record<string, string | undefined>
  page: number
  label: string
}) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(searchParams)) {
    if (value && key !== "page") params.set(key, value)
  }
  params.set("page", String(page))

  return (
    <Link
      href={`/busca?${params.toString()}`}
      className="rounded-md border border-fymoob-gray-light px-4 py-2 text-sm font-medium text-fymoob-gray-dark transition-colors hover:bg-fymoob-blue hover:text-white"
    >
      {label}
    </Link>
  )
}

export default async function BuscaPage({ searchParams }: BuscaPageProps) {
  const params = await searchParams

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Busca", url: "/busca" },
        ]}
      />

      <h1 className="font-display text-2xl font-bold text-fymoob-gray-dark sm:text-3xl">
        Buscar Imóveis
      </h1>
      <p className="mt-2 text-fymoob-gray-mid">
        Encontre o imóvel ideal em Curitiba com nossos filtros avançados.
      </p>

      <div className="mt-6">
        <Suspense
          fallback={
            <p className="py-12 text-center text-fymoob-gray-mid">
              Carregando...
            </p>
          }
        >
          <BuscaContent searchParams={params} />
        </Suspense>
      </div>
    </div>
  )
}
