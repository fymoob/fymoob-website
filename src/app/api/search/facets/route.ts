import { NextRequest, NextResponse } from "next/server"

import { slugify } from "@/lib/utils"
import { getAllTypes, getProperties, getPropertyStats } from "@/services/loft"
import type { Property, PropertyFilters, PropertyFinalidade, PropertyType } from "@/types/property"

type FacetRequestBody = {
  finalidades?: string[]
  cidades?: string[]
  bairros?: string[]
  tipos?: string[]
  quartosMin?: string
  quartosMax?: string
  scope?: Record<string, string>
}

type FacetOption = { value: string; label: string; count: number }

type FacetBairroOption = FacetOption & { cidade: string }

type FacetResponse = {
  cidades: FacetOption[]
  bairros: FacetBairroOption[]
  tipos: FacetOption[]
  quartosDisponiveis: string[]
  priceBounds: { min: number; max: number }
}

const MAX_LIMIT = 10_000
const FALLBACK_PRICE_BOUNDS = { min: 50_000, max: 5_000_000 }

const FINALIDADE_BY_SLUG: Record<string, PropertyFinalidade> = {
  venda: "Venda",
  locacao: "Loca\u00e7\u00e3o",
  aluguel: "Loca\u00e7\u00e3o",
  "venda-e-locacao": "Venda e Loca\u00e7\u00e3o",
  "venda-e-aluguel": "Venda e Loca\u00e7\u00e3o",
}

function toStringArray(input: unknown, max = 30): string[] {
  if (!Array.isArray(input)) return []
  return input
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, max)
}

function parseBedroom(value: unknown): number | undefined {
  if (typeof value !== "string") return undefined
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) return undefined
  return Math.round(parsed)
}

function mergeDistinct<T>(a: T[], b: T[]): T[] {
  if (a.length === 0) return b
  if (b.length === 0) return a
  const setB = new Set(b)
  return a.filter((item) => setB.has(item))
}

function pickCanonicalLabel(variants: Map<string, number>): string {
  let best = ""
  let bestCount = -1

  for (const [label, count] of variants.entries()) {
    if (count > bestCount || (count === bestCount && label.localeCompare(best, "pt-BR") < 0)) {
      best = label
      bestCount = count
    }
  }

  return best
}

function buildCityFacets(properties: Property[]): FacetOption[] {
  const map = new Map<string, { labels: Map<string, number>; count: number }>()

  for (const property of properties) {
    if (!property.cidade) continue
    const value = slugify(property.cidade)
    if (!value) continue
    if (!map.has(value)) {
      map.set(value, { labels: new Map<string, number>(), count: 0 })
    }
    const entry = map.get(value)!
    entry.count += 1
    entry.labels.set(property.cidade, (entry.labels.get(property.cidade) ?? 0) + 1)
  }

  return Array.from(map.entries())
    .map(([value, info]) => ({
      value,
      label: pickCanonicalLabel(info.labels),
      count: info.count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "pt-BR"))
}

function buildBairroFacets(properties: Property[]): FacetBairroOption[] {
  const map = new Map<
    string,
    {
      bairroLabels: Map<string, number>
      cidadeLabels: Map<string, number>
      count: number
    }
  >()

  for (const property of properties) {
    if (!property.bairro) continue
    const value = slugify(property.bairro)
    if (!value) continue
    if (!map.has(value)) {
      map.set(value, {
        bairroLabels: new Map<string, number>(),
        cidadeLabels: new Map<string, number>(),
        count: 0,
      })
    }
    const entry = map.get(value)!
    entry.count += 1
    entry.bairroLabels.set(property.bairro, (entry.bairroLabels.get(property.bairro) ?? 0) + 1)
    if (property.cidade) {
      entry.cidadeLabels.set(property.cidade, (entry.cidadeLabels.get(property.cidade) ?? 0) + 1)
    }
  }

  return Array.from(map.entries())
    .map(([value, info]) => ({
      value,
      label: pickCanonicalLabel(info.bairroLabels),
      cidade: pickCanonicalLabel(info.cidadeLabels) || "",
      count: info.count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "pt-BR"))
}

function buildTipoFacets(properties: Property[]): FacetOption[] {
  const map = new Map<string, { labels: Map<string, number>; count: number }>()

  for (const property of properties) {
    if (!property.tipo) continue
    const value = slugify(property.tipo)
    if (!value) continue
    if (!map.has(value)) {
      map.set(value, { labels: new Map<string, number>(), count: 0 })
    }
    const entry = map.get(value)!
    entry.count += 1
    entry.labels.set(property.tipo, (entry.labels.get(property.tipo) ?? 0) + 1)
  }

  return Array.from(map.entries())
    .map(([value, info]) => ({
      value,
      label: pickCanonicalLabel(info.labels),
      count: info.count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "pt-BR"))
}

function buildQuartosFacets(properties: Property[]): string[] {
  const set = new Set<string>()

  for (const property of properties) {
    if (!property.dormitorios || property.dormitorios <= 0) continue
    const value = property.dormitorios >= 5 ? "5" : String(property.dormitorios)
    set.add(value)
  }

  return Array.from(set).sort((a, b) => Number(a) - Number(b))
}

function buildPriceBounds(properties: Property[], fallback: { min: number; max: number }) {
  const prices = properties
    .map((property) => property.precoVenda ?? property.precoAluguel)
    .filter((price): price is number => typeof price === "number" && Number.isFinite(price) && price > 0)

  if (prices.length === 0) return fallback

  const min = Math.min(...prices)
  const max = Math.max(...prices)
  if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) return fallback

  return { min, max }
}

function withArrayFilter<T>(
  base: T[] | undefined,
  input: T[] | undefined
): T[] | undefined {
  const left = base ?? []
  const right = input ?? []
  const merged = mergeDistinct(left, right)
  if (left.length > 0 && right.length > 0) {
    return merged.length > 0 ? merged : left
  }
  const result = left.length > 0 ? left : right
  return result.length > 0 ? result : undefined
}

function parseScopeFilters(
  scope: Record<string, string>,
  typeBySlug: Map<string, PropertyType>
): PropertyFilters {
  const filters: PropertyFilters = {}

  const scopeCidade =
    typeof scope.cidade === "string"
      ? toStringArray(scope.cidade.split(","))
      : []
  const scopeBairro =
    typeof scope.bairro === "string"
      ? toStringArray(scope.bairro.split(","))
      : []
  const scopeFinalidade =
    typeof scope.finalidade === "string"
      ? toStringArray(scope.finalidade.split(","))
      : []
  const scopeTipoSlugs =
    typeof scope.tipo === "string"
      ? toStringArray(scope.tipo.split(",")).map((value) => slugify(value))
      : []

  const tipos = scopeTipoSlugs
    .map((slug) => typeBySlug.get(slug) ?? typeBySlug.get(slug.endsWith("s") ? slug.slice(0, -1) : slug))
    .filter((item): item is PropertyType => Boolean(item))

  const finalidades = scopeFinalidade
    .map((value) => FINALIDADE_BY_SLUG[slugify(value)])
    .filter((item): item is PropertyFinalidade => Boolean(item))

  if (scopeCidade.length > 0) filters.cidades = scopeCidade.map((value) => slugify(value))
  if (scopeBairro.length > 0) filters.bairros = scopeBairro.map((value) => slugify(value))
  if (tipos.length > 0) filters.tipos = tipos
  if (finalidades.length > 0) filters.finalidades = finalidades

  if (scope.lancamento === "true") filters.lancamento = true

  return filters
}

function buildFilters(
  scopeFilters: PropertyFilters,
  stage: {
    finalidades: PropertyFinalidade[]
    cidades: string[]
    bairros: string[]
    tipos: PropertyType[]
    quartosMin?: number
    quartosMax?: number
  }
): PropertyFilters {
  const filters: PropertyFilters = {
    page: 1,
    limit: MAX_LIMIT,
  }

  filters.finalidades = withArrayFilter(scopeFilters.finalidades, stage.finalidades)
  filters.cidades = withArrayFilter(scopeFilters.cidades, stage.cidades)
  filters.bairros = withArrayFilter(scopeFilters.bairros, stage.bairros)
  filters.tipos = withArrayFilter(scopeFilters.tipos, stage.tipos)

  if (scopeFilters.lancamento === true) filters.lancamento = true

  if (stage.quartosMin) {
    filters.quartosMin = stage.quartosMin
    filters.dormitoriosMin = stage.quartosMin
  }
  if (stage.quartosMax) filters.quartosMax = stage.quartosMax

  return filters
}

export async function POST(request: NextRequest) {
  let body: FacetRequestBody
  try {
    body = (await request.json()) as FacetRequestBody
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 })
  }

  const rawScope = body?.scope
  const scope = rawScope && typeof rawScope === "object" ? rawScope : {}
  const requestedFinalidades = toStringArray(body?.finalidades).map((value) => slugify(value))
  const requestedCidades = toStringArray(body?.cidades).map((value) => slugify(value))
  const requestedBairros = toStringArray(body?.bairros).map((value) => slugify(value))
  const requestedTipos = toStringArray(body?.tipos).map((value) => slugify(value))
  const quartosMin = parseBedroom(body?.quartosMin)
  const quartosMax = parseBedroom(body?.quartosMax)

  const [allTypes, stats] = await Promise.all([getAllTypes(), getPropertyStats()])
  const typeBySlug = new Map<string, PropertyType>(
    allTypes.map((item) => [slugify(item.tipo), item.tipo] as const)
  )

  const requestedTipoValues = requestedTipos
    .map((slug) => typeBySlug.get(slug) ?? typeBySlug.get(slug.endsWith("s") ? slug.slice(0, -1) : slug))
    .filter((item): item is PropertyType => Boolean(item))

  const requestedFinalidadeValues = requestedFinalidades
    .map((slug) => FINALIDADE_BY_SLUG[slug])
    .filter((item): item is PropertyFinalidade => Boolean(item))

  const scopeFilters = parseScopeFilters(scope, typeBySlug)

  // cityStage: considera bairros selecionados pra cascata reversa — se o
  // usuario marcou "Agua Verde" primeiro, o dropdown de Cidade so mostra
  // cidades que contem "Agua Verde" (tipicamente Curitiba). Evita UX
  // confusa onde user seleciona cidade errada e o bairro some por
  // auto-prune. Ignora tipos/quartos de proposito — esses sao downstream
  // e nao deveriam restringir o dominio de cidades.
  const cityStageFilters = buildFilters(scopeFilters, {
    finalidades: requestedFinalidadeValues,
    cidades: [],
    bairros: requestedBairros,
    tipos: [],
  })

  const { properties: cityStageProperties } = await getProperties(cityStageFilters)

  const bairroStageFilters = buildFilters(scopeFilters, {
    finalidades: requestedFinalidadeValues,
    cidades: requestedCidades,
    bairros: [],
    tipos: [],
  })

  const { properties: bairroStageProperties } = await getProperties(bairroStageFilters)

  const tipoStageFilters = buildFilters(scopeFilters, {
    finalidades: requestedFinalidadeValues,
    cidades: requestedCidades,
    bairros: requestedBairros,
    tipos: [],
  })

  const { properties: tipoStageProperties } = await getProperties(tipoStageFilters)

  const quartosStageFilters = buildFilters(scopeFilters, {
    finalidades: requestedFinalidadeValues,
    cidades: requestedCidades,
    bairros: requestedBairros,
    tipos: requestedTipoValues,
  })

  const { properties: quartosStageProperties } = await getProperties(quartosStageFilters)

  const precoStageFilters = buildFilters(scopeFilters, {
    finalidades: requestedFinalidadeValues,
    cidades: requestedCidades,
    bairros: requestedBairros,
    tipos: requestedTipoValues,
    quartosMin,
    quartosMax,
  })

  const { properties: precoStageProperties } = await getProperties(precoStageFilters)

  const fallbackBounds = {
    min: stats.precoMin ?? FALLBACK_PRICE_BOUNDS.min,
    max: stats.precoMax ?? FALLBACK_PRICE_BOUNDS.max,
  }

  const response: FacetResponse = {
    cidades: buildCityFacets(cityStageProperties),
    bairros: buildBairroFacets(bairroStageProperties),
    tipos: buildTipoFacets(tipoStageProperties),
    quartosDisponiveis: buildQuartosFacets(quartosStageProperties),
    priceBounds: buildPriceBounds(precoStageProperties, fallbackBounds),
  }

  return NextResponse.json(response, {
    headers: { "Cache-Control": "no-store" },
  })
}
