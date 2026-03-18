import type {
  Property,
  PropertyFilters,
  BairroSummary,
  TypeSummary,
  MockPropertyData,
  PropertyType,
} from "@/types/property"
import { slugify } from "@/lib/utils"
import mockData from "../../data/mock-properties.json"

const data = mockData as MockPropertyData

interface IndexedProperty {
  property: Property
  bairroSlug: string
  cidadeSlug: string
  finalidadeSlug: string
  searchableText: string
  price: number | null
}

const indexedProperties: IndexedProperty[] = data.imoveis.map((property) => ({
  property,
  bairroSlug: slugify(property.bairro),
  cidadeSlug: slugify(property.cidade),
  finalidadeSlug: slugify(property.finalidade),
  searchableText: slugify(
    `${property.titulo} ${property.descricao} ${property.bairro} ${property.tipo} ${property.codigo}`
  ),
  price: property.precoVenda ?? property.precoAluguel,
}))

function applyFilters(properties: Property[], filters: PropertyFilters): Property[] {
  const includedSlugs = new Set(properties.map((property) => property.slug))

  const bairroSlugSet =
    filters.bairros && filters.bairros.length > 0
      ? new Set(filters.bairros.map((bairro) => slugify(bairro)))
      : filters.bairro
        ? new Set([slugify(filters.bairro)])
        : null
  const cidadeSlugSet =
    filters.cidades && filters.cidades.length > 0
      ? new Set(filters.cidades.map((cidade) => slugify(cidade)))
      : filters.cidade
        ? new Set([slugify(filters.cidade)])
        : null
  const finalidadeSlugSet =
    filters.finalidades && filters.finalidades.length > 0
      ? new Set(filters.finalidades.map((finalidade) => slugify(finalidade)))
      : filters.finalidade
        ? new Set([slugify(filters.finalidade)])
        : null
  const tipoSet =
    filters.tipos && filters.tipos.length > 0
      ? new Set(filters.tipos)
      : filters.tipo
        ? new Set([filters.tipo])
        : null
  const quartosMin = filters.quartosMin ?? filters.dormitoriosMin ?? null
  const codigo = filters.codigo?.trim().toLowerCase() ?? null
  const searchTerms = filters.busca
    ? slugify(filters.busca)
        .split("-")
        .filter(Boolean)
    : []

  const result: Property[] = []

  for (const indexed of indexedProperties) {
    const property = indexed.property
    if (!includedSlugs.has(property.slug)) continue

    if (tipoSet && !tipoSet.has(property.tipo)) continue
    if (finalidadeSlugSet && !finalidadeSlugSet.has(indexed.finalidadeSlug)) {
      continue
    }
    if (bairroSlugSet && !bairroSlugSet.has(indexed.bairroSlug)) continue
    if (cidadeSlugSet && !cidadeSlugSet.has(indexed.cidadeSlug)) continue

    if (codigo && !property.codigo.toLowerCase().includes(codigo)) continue

    if (filters.precoMin && (indexed.price === null || indexed.price < filters.precoMin)) {
      continue
    }

    if (filters.precoMax && (indexed.price === null || indexed.price > filters.precoMax)) {
      continue
    }

    if (quartosMin && (property.dormitorios === null || property.dormitorios < quartosMin)) {
      continue
    }

    if (filters.areaMin && (property.areaPrivativa === null || property.areaPrivativa < filters.areaMin)) {
      continue
    }

    if (filters.areaMax && (property.areaPrivativa === null || property.areaPrivativa > filters.areaMax)) {
      continue
    }

    if (filters.vagasMin && (property.vagas === null || property.vagas < filters.vagasMin)) {
      continue
    }

    if (
      searchTerms.length > 0 &&
      !searchTerms.every((term) => indexed.searchableText.includes(term))
    ) {
      continue
    }

    result.push(property)
  }

  // Sorting
  if (filters.orderBy) {
    switch (filters.orderBy) {
      case "preco-asc":
        result.sort(
          (a, b) =>
            (a.precoVenda ?? a.precoAluguel ?? 0) -
            (b.precoVenda ?? b.precoAluguel ?? 0)
        )
        break
      case "preco-desc":
        result.sort(
          (a, b) =>
            (b.precoVenda ?? b.precoAluguel ?? 0) -
            (a.precoVenda ?? a.precoAluguel ?? 0)
        )
        break
      case "area-asc":
        result.sort(
          (a, b) => (a.areaPrivativa ?? 0) - (b.areaPrivativa ?? 0)
        )
        break
      case "area-desc":
        result.sort(
          (a, b) => (b.areaPrivativa ?? 0) - (a.areaPrivativa ?? 0)
        )
        break
      case "recente":
        result.sort((a, b) => {
          const dateA = a.dataAtualizacao ?? a.dataCadastro
          const dateB = b.dataAtualizacao ?? b.dataCadastro
          if (!dateA && !dateB) return 0
          if (!dateA) return 1
          if (!dateB) return -1
          return dateB.localeCompare(dateA)
        })
        break
    }
  }

  return result
}

export async function getProperties(
  filters: PropertyFilters = {}
): Promise<{ properties: Property[]; total: number }> {
  const filtered = applyFilters(data.imoveis, filters)
  const page = filters.page ?? 1
  const limit = filters.limit ?? 20
  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return {
    properties: paginated,
    total: filtered.length,
  }
}

export async function getPropertyBySlug(
  slug: string
): Promise<Property | null> {
  return data.imoveis.find((p) => p.slug === slug) ?? null
}

export async function getPropertiesByBairro(
  bairro: string,
  limit?: number
): Promise<Property[]> {
  const filtered = data.imoveis.filter(
    (p) => slugify(p.bairro) === slugify(bairro)
  )
  return limit ? filtered.slice(0, limit) : filtered
}

export async function getPropertiesByType(
  tipo: PropertyType,
  limit?: number
): Promise<Property[]> {
  const filtered = data.imoveis.filter((p) => p.tipo === tipo)
  return limit ? filtered.slice(0, limit) : filtered
}

export async function getAllBairros(limit?: number): Promise<BairroSummary[]> {
  const { bairroImages } = await import("@/lib/bairro-images")

  const bairroMap = new Map<
    string,
    { total: number; tipos: Map<PropertyType, number> }
  >()

  for (const p of data.imoveis) {
    const key = p.bairro
    if (!bairroMap.has(key)) {
      bairroMap.set(key, { total: 0, tipos: new Map() })
    }
    const entry = bairroMap.get(key)!
    entry.total++
    entry.tipos.set(p.tipo, (entry.tipos.get(p.tipo) ?? 0) + 1)
  }

  const result = Array.from(bairroMap.entries())
    .map(([bairro, info]) => ({
      bairro,
      slug: slugify(bairro),
      total: info.total,
      tipos: Array.from(info.tipos.entries()).map(([tipo, count]) => ({
        tipo,
        count,
      })),
      imageUrl: bairroImages[bairro],
    }))
    .sort((a, b) => b.total - a.total)

  return limit ? result.slice(0, limit) : result
}

export async function getAllCities(): Promise<string[]> {
  const citySet = new Set<string>()

  for (const property of data.imoveis) {
    citySet.add(property.cidade)
  }

  return Array.from(citySet).sort((a, b) => a.localeCompare(b, "pt-BR"))
}

export async function getSimilarProperties(
  property: Property,
  limit: number = 4
): Promise<Property[]> {
  // Find similar properties by type first, then by bairro
  const similar = data.imoveis.filter(
    (p) =>
      p.slug !== property.slug &&
      (p.tipo === property.tipo || p.bairro === property.bairro)
  )
  return similar.slice(0, limit)
}

export async function getAllSlugs(): Promise<string[]> {
  return data.imoveis.map((p) => p.slug)
}

export async function getAllTypes(): Promise<TypeSummary[]> {
  const typeMap = new Map<PropertyType, number>()

  for (const p of data.imoveis) {
    typeMap.set(p.tipo, (typeMap.get(p.tipo) ?? 0) + 1)
  }

  return Array.from(typeMap.entries()).map(([tipo, total]) => ({
    tipo,
    slug: slugify(tipo),
    total,
  }))
}

export async function getFeaturedProperties(limit: number = 8): Promise<Property[]> {
  const withPhotos = data.imoveis.filter(
    (p) => p.fotoDestaque && p.fotos.length > 0
  )
  return withPhotos.slice(0, limit)
}

export interface PropertyStats {
  total: number
  precoMin: number | null
  precoMax: number | null
  porTipo: { tipo: PropertyType; count: number }[]
}

export async function getPropertyStats(): Promise<PropertyStats> {
  const precos = data.imoveis
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)

  const tipoMap = new Map<PropertyType, number>()
  for (const p of data.imoveis) {
    tipoMap.set(p.tipo, (tipoMap.get(p.tipo) ?? 0) + 1)
  }

  return {
    total: data.imoveis.length,
    precoMin: precos.length > 0 ? Math.min(...precos) : null,
    precoMax: precos.length > 0 ? Math.max(...precos) : null,
    porTipo: Array.from(tipoMap.entries()).map(([tipo, count]) => ({
      tipo,
      count,
    })),
  }
}
