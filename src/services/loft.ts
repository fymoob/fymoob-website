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

function applyFilters(properties: Property[], filters: PropertyFilters): Property[] {
  let result = [...properties]

  if (filters.tipo) {
    result = result.filter((p) => p.tipo === filters.tipo)
  }

  if (filters.finalidade) {
    result = result.filter((p) => p.finalidade === filters.finalidade)
  }

  if (filters.bairro) {
    result = result.filter(
      (p) => slugify(p.bairro) === slugify(filters.bairro!)
    )
  }

  if (filters.cidade) {
    result = result.filter(
      (p) => slugify(p.cidade) === slugify(filters.cidade!)
    )
  }

  if (filters.precoMin) {
    result = result.filter((p) => {
      const preco = p.precoVenda ?? p.precoAluguel
      return preco !== null && preco >= filters.precoMin!
    })
  }

  if (filters.precoMax) {
    result = result.filter((p) => {
      const preco = p.precoVenda ?? p.precoAluguel
      return preco !== null && preco <= filters.precoMax!
    })
  }

  if (filters.dormitoriosMin) {
    result = result.filter(
      (p) => p.dormitorios !== null && p.dormitorios >= filters.dormitoriosMin!
    )
  }

  if (filters.areaMin) {
    result = result.filter(
      (p) =>
        p.areaPrivativa !== null && p.areaPrivativa >= filters.areaMin!
    )
  }

  if (filters.areaMax) {
    result = result.filter(
      (p) =>
        p.areaPrivativa !== null && p.areaPrivativa <= filters.areaMax!
    )
  }

  if (filters.vagasMin) {
    result = result.filter(
      (p) => p.vagas !== null && p.vagas >= filters.vagasMin!
    )
  }

  if (filters.busca) {
    const term = filters.busca.toLowerCase()
    result = result.filter(
      (p) =>
        p.titulo.toLowerCase().includes(term) ||
        p.descricao.toLowerCase().includes(term) ||
        p.bairro.toLowerCase().includes(term)
    )
  }

  // Sorting
  if (filters.orderBy) {
    switch (filters.orderBy) {
      case "preco-asc":
        result.sort(
          (a, b) => (a.precoVenda ?? a.precoAluguel ?? 0) - (b.precoVenda ?? b.precoAluguel ?? 0)
        )
        break
      case "preco-desc":
        result.sort(
          (a, b) => (b.precoVenda ?? b.precoAluguel ?? 0) - (a.precoVenda ?? a.precoAluguel ?? 0)
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
        // Mock data doesn't have reliable dates, keep original order
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
