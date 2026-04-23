"use client"

import { useCallback, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { slugify } from "@/lib/utils"
import type { MultiSelectOption } from "@/components/search/filters/types"
import type { BairroSummary, TypeSummary } from "@/types/property"
import {
  FINALIDADE_OPTIONS,
  applyDraftToSearchParams,
  createDraftFromSearchParams,
  type PriceBounds,
  type SearchDraftFilters,
} from "@/components/search/filters/search-state"

export interface GroupedBairroOptions {
  cidade: string
  bairros: (MultiSelectOption & { count: number })[]
}

export interface CountedOption extends MultiSelectOption {
  count: number
  cidade?: string
}

interface SearchFacetsResponse {
  cidades: CountedOption[]
  bairros: CountedOption[]
  tipos: CountedOption[]
  quartosDisponiveis: string[]
  priceBounds: PriceBounds
}

export interface SearchBarControllerProps {
  bairros: string[]
  cidades: string[]
  tipos: string[]
  empreendimentos?: string[]
  priceBounds: PriceBounds
  targetPath?: string
  bairroSummaries?: BairroSummary[]
  tipoSummaries?: TypeSummary[]
  scope?: Record<string, string>
}

export interface SearchBarController {
  pendingFilters: SearchDraftFilters
  setPendingFilters: Dispatch<SetStateAction<SearchDraftFilters>>
  bairroOptions: MultiSelectOption[]
  cidadeOptions: MultiSelectOption[]
  tipoOptions: MultiSelectOption[]
  filteredTipoOptions: MultiSelectOption[]
  groupedBairroOptions: GroupedBairroOptions[]
  cidadeSummaries: { label: string; slug: string; count: number }[]
  facetedCidadeOptions: CountedOption[]
  facetedBairroOptions: CountedOption[]
  quartosOptions: string[]
  effectivePriceBounds: PriceBounds
  locationLabel: string
  cityLabel: string
  bairroLabel: string
  priceLabel: string
  quartosLabel: string
  typeLabel: string
  finalidadeLabel: string
  minPrice: number
  maxPrice: number
  applyFilters: () => void
  applyCodeSearch: (code: string) => void
}

const DEFAULT_BEDROOM_OPTIONS = ["1", "2", "3", "4", "5"]

function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toLocaleString("pt-BR", {
      maximumFractionDigits: 1,
    })} mi`
  }

  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toLocaleString("pt-BR", {
      maximumFractionDigits: 0,
    })} mil`
  }

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  })
}

function summarizeSelection(
  selectedValues: string[],
  valueLabelMap: Map<string, string>,
  pluralLabel: string,
  fallback: string
): string {
  if (selectedValues.length === 0) return fallback

  if (selectedValues.length === 1) {
    return valueLabelMap.get(selectedValues[0]) ?? selectedValues[0]
  }

  return `${selectedValues.length} ${pluralLabel}`
}

function uniqueStringArray(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)))
}

function normalizePriceBounds(bounds: PriceBounds, fallback: PriceBounds): PriceBounds {
  const min = Number(bounds.min)
  const max = Number(bounds.max)
  if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) {
    return fallback
  }
  return { min, max }
}

function normalizeFacetResponse(raw: unknown, fallbackPriceBounds: PriceBounds): SearchFacetsResponse | null {
  if (!raw || typeof raw !== "object") return null
  const data = raw as Record<string, unknown>

  const normalizeCountedOptions = (input: unknown, includeCidade = false): CountedOption[] => {
    if (!Array.isArray(input)) return []
    return input
      .filter((item) => item && typeof item === "object")
      .map((item) => item as Record<string, unknown>)
      .map((item) => {
        const value = typeof item.value === "string" ? item.value : ""
        const label = typeof item.label === "string" ? item.label : ""
        const count = Number(item.count)
        const cidade =
          includeCidade && typeof item.cidade === "string" ? item.cidade : undefined

        if (!value || !label || !Number.isFinite(count) || count < 0) return null
        return { value, label, count, ...(cidade ? { cidade } : {}) }
      })
      .filter((item): item is CountedOption => item !== null)
  }

  const quartosDisponiveis = Array.isArray(data.quartosDisponiveis)
    ? uniqueStringArray(
        data.quartosDisponiveis
          .filter((value): value is string => typeof value === "string")
          .map((value) => value.trim())
      ).sort((a, b) => Number(a) - Number(b))
    : []

  const rawPriceBounds =
    data.priceBounds && typeof data.priceBounds === "object"
      ? (data.priceBounds as Record<string, unknown>)
      : {}
  const normalizedPriceBounds = normalizePriceBounds(
    {
      min: Number(rawPriceBounds.min),
      max: Number(rawPriceBounds.max),
    },
    fallbackPriceBounds
  )

  return {
    cidades: normalizeCountedOptions(data.cidades),
    bairros: normalizeCountedOptions(data.bairros, true),
    tipos: normalizeCountedOptions(data.tipos),
    quartosDisponiveis,
    priceBounds: normalizedPriceBounds,
  }
}

function clampPriceRange(
  range: [number, number],
  bounds: PriceBounds
): [number, number] {
  const nextMin = Math.max(bounds.min, range[0])
  const nextMax = Math.min(bounds.max, range[1])
  if (nextMin > nextMax) {
    return [bounds.min, bounds.max]
  }
  return [nextMin, nextMax]
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  for (let index = 0; index < a.length; index += 1) {
    if (a[index] !== b[index]) return false
  }
  return true
}

function rangesEqual(a: [number, number], b: [number, number]): boolean {
  return a[0] === b[0] && a[1] === b[1]
}

export function useSearchBarController({
  bairros,
  cidades,
  tipos,
  priceBounds,
  targetPath = "/busca",
  bairroSummaries,
  tipoSummaries,
  scope,
}: SearchBarControllerProps): SearchBarController {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const paramsString = searchParams.toString()
  const isTargetCurrentPath = pathname === targetPath

  const [pendingFilters, setPendingFilters] = useState<SearchDraftFilters>(() =>
    createDraftFromSearchParams(new URLSearchParams(paramsString), priceBounds)
  )

  const [facets, setFacets] = useState<SearchFacetsResponse | null>(null)

  useEffect(() => {
    // Sync local draft with URL state changes (back/forward, shared links).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPendingFilters(
      createDraftFromSearchParams(new URLSearchParams(paramsString), priceBounds)
    )
  }, [paramsString, priceBounds, setPendingFilters])

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/search/facets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            finalidades: pendingFilters.finalidades,
            cidades: pendingFilters.cidades,
            bairros: pendingFilters.bairros,
            tipos: pendingFilters.tipos,
            quartosMin: pendingFilters.quartosMin,
            quartosMax: pendingFilters.quartosMax,
            scope: scope ?? {},
          }),
          cache: "no-store",
          signal: controller.signal,
        })

        if (!response.ok) return
        const raw = (await response.json()) as unknown
        const normalized = normalizeFacetResponse(raw, priceBounds)
        if (normalized) {
          setFacets(normalized)
        }
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return
      }
    }, 150)

    return () => {
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [
    pendingFilters.finalidades,
    pendingFilters.cidades,
    pendingFilters.bairros,
    pendingFilters.tipos,
    pendingFilters.quartosMin,
    pendingFilters.quartosMax,
    scope,
    priceBounds,
  ])

  const bairroOptions = useMemo<MultiSelectOption[]>(
    () =>
      [...bairros]
        .sort((a, b) => a.localeCompare(b, "pt-BR"))
        .map((bairro) => ({
          value: slugify(bairro),
          label: bairro,
        })),
    [bairros]
  )

  const cidadeOptions = useMemo<MultiSelectOption[]>(
    () =>
      [...cidades]
        .sort((a, b) => a.localeCompare(b, "pt-BR"))
        .map((cidade) => ({
          value: slugify(cidade),
          label: cidade,
        })),
    [cidades]
  )

  const tipoOptions = useMemo<MultiSelectOption[]>(
    () =>
      [...tipos]
        .sort((a, b) => a.localeCompare(b, "pt-BR"))
        .map((tipo) => ({
          value: slugify(tipo),
          label: tipo,
        })),
    [tipos]
  )

  const tipoMap = useMemo(
    () => new Map(tipoOptions.map((option) => [option.value, option.label] as const)),
    [tipoOptions]
  )
  const finalidadeMap = useMemo(
    () =>
      new Map(
        FINALIDADE_OPTIONS.map((option) => [option.value, option.label] as const)
      ),
    []
  )

  const isAlugar = pendingFilters.finalidades.includes("locacao")
  const getBairroCount = useCallback((summary: BairroSummary) => {
    if (pendingFilters.finalidades.length === 0) return summary.total
    if (isAlugar) {
      return (summary.porFinalidade["Loca\u00e7\u00e3o"] ?? 0) +
        (summary.porFinalidade["Venda e Loca\u00e7\u00e3o"] ?? 0)
    }
    return (summary.porFinalidade["Venda"] ?? 0) +
      (summary.porFinalidade["Venda e Loca\u00e7\u00e3o"] ?? 0)
  }, [pendingFilters.finalidades, isAlugar])

  const cidadeSummaries = useMemo(() => {
    if (!bairroSummaries || bairroSummaries.length === 0) {
      return cidades.map((cidade) => ({ label: cidade, slug: slugify(cidade), count: 0 }))
    }
    const cityCount = new Map<string, number>()
    for (const summary of bairroSummaries) {
      const count = getBairroCount(summary)
      if (count === 0) continue
      const cidadeLabel = summary.cidade || "Outros"
      cityCount.set(cidadeLabel, (cityCount.get(cidadeLabel) ?? 0) + count)
    }
    return Array.from(cityCount.entries())
      .map(([label, count]) => ({ label, slug: slugify(label), count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "pt-BR"))
  }, [bairroSummaries, cidades, getBairroCount])

  const groupedBairroOptions = useMemo<GroupedBairroOptions[]>(() => {
    if (!bairroSummaries || bairroSummaries.length === 0) return []

    const groups = new Map<string, (MultiSelectOption & { count: number })[]>()
    for (const summary of bairroSummaries) {
      const count = getBairroCount(summary)
      if (count === 0) continue
      const cidadeLabel = summary.cidade || "Outros"
      if (!groups.has(cidadeLabel)) groups.set(cidadeLabel, [])
      groups.get(cidadeLabel)!.push({
        value: slugify(summary.bairro),
        label: summary.bairro,
        count,
      })
    }

    return Array.from(groups.entries())
      .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], "pt-BR"))
      .map(([cidadeLabel, bairrosList]) => ({
        cidade: cidadeLabel,
        bairros: bairrosList.sort((a, b) => a.label.localeCompare(b.label, "pt-BR")),
      }))
  }, [bairroSummaries, getBairroCount])

  const fallbackFilteredTipoOptions = useMemo(() => {
    if (!tipoSummaries || tipoSummaries.length === 0) return tipoOptions

    let validByFinalidade: Set<string> | null = null
    if (pendingFilters.finalidades.length > 0) {
      validByFinalidade = new Set(
        tipoSummaries
          .filter((summary) => {
            if (summary.total === 0) return false
            if (isAlugar) {
              return (summary.porFinalidade["Loca\u00e7\u00e3o"] ?? 0) > 0 ||
                (summary.porFinalidade["Venda e Loca\u00e7\u00e3o"] ?? 0) > 0
            }
            return (summary.porFinalidade["Venda"] ?? 0) > 0 ||
              (summary.porFinalidade["Venda e Loca\u00e7\u00e3o"] ?? 0) > 0
          })
          .map((summary) => summary.slug)
      )
    }

    let validByLocation: Set<string> | null = null
    if (bairroSummaries && bairroSummaries.length > 0) {
      const hasBairros = pendingFilters.bairros.length > 0
      const hasCidades = pendingFilters.cidades.length > 0
      if (hasBairros || hasCidades) {
        validByLocation = new Set<string>()
        for (const summary of bairroSummaries) {
          const bairroMatch =
            hasBairros && pendingFilters.bairros.includes(slugify(summary.bairro))
          const cidadeMatch =
            hasCidades && pendingFilters.cidades.includes(slugify(summary.cidade))
          if (!bairroMatch && !cidadeMatch) continue
          for (const tipo of summary.tipos) {
            validByLocation.add(slugify(tipo.tipo))
          }
        }
      }
    }

    return tipoOptions.filter((option) => {
      if (validByFinalidade && !validByFinalidade.has(option.value)) return false
      if (validByLocation && !validByLocation.has(option.value)) return false
      const summary = tipoSummaries.find((item) => item.slug === option.value)
      if (summary && summary.total === 0) return false
      return true
    })
  }, [
    tipoOptions,
    tipoSummaries,
    bairroSummaries,
    pendingFilters.finalidades,
    pendingFilters.bairros,
    pendingFilters.cidades,
    isAlugar,
  ])

  const facetedCidadeOptions = useMemo<CountedOption[]>(() => {
    if (facets?.cidades && facets.cidades.length > 0) {
      return facets.cidades
    }
    return cidadeSummaries.map((summary) => ({
      value: summary.slug,
      label: summary.label,
      count: summary.count,
    }))
  }, [facets, cidadeSummaries])

  const facetedBairroOptions = useMemo<CountedOption[]>(() => {
    if (facets?.bairros && facets.bairros.length > 0) {
      return facets.bairros
    }

    if (groupedBairroOptions.length === 0) {
      return bairroOptions.map((option) => ({ ...option, count: 0 }))
    }

    const activeCitySet =
      pendingFilters.cidades.length > 0 ? new Set(pendingFilters.cidades) : null
    const map = new Map<string, CountedOption>()

    for (const group of groupedBairroOptions) {
      if (activeCitySet && !activeCitySet.has(slugify(group.cidade))) continue
      for (const bairro of group.bairros) {
        const existing = map.get(bairro.value)
        if (existing) {
          existing.count += bairro.count
          continue
        }
        map.set(bairro.value, {
          value: bairro.value,
          label: bairro.label,
          count: bairro.count,
          cidade: group.cidade,
        })
      }
    }

    return Array.from(map.values()).sort(
      (a, b) => b.count - a.count || a.label.localeCompare(b.label, "pt-BR")
    )
  }, [facets, groupedBairroOptions, bairroOptions, pendingFilters.cidades])

  const filteredTipoOptions = useMemo<MultiSelectOption[]>(() => {
    if (facets?.tipos && facets.tipos.length > 0) {
      return facets.tipos.map((option) => ({
        value: option.value,
        label: option.label,
      }))
    }
    return fallbackFilteredTipoOptions
  }, [facets, fallbackFilteredTipoOptions])

  const quartosOptions = useMemo(() => {
    const fromFacets = facets?.quartosDisponiveis ?? []
    if (fromFacets.length > 0) return fromFacets
    return DEFAULT_BEDROOM_OPTIONS
  }, [facets?.quartosDisponiveis])

  const effectivePriceBounds = useMemo(
    () =>
      normalizePriceBounds(facets?.priceBounds ?? priceBounds, priceBounds),
    [facets?.priceBounds, priceBounds]
  )

  useEffect(() => {
    const validCitySet = new Set(facetedCidadeOptions.map((option) => option.value))
    const validBairroSet = new Set(facetedBairroOptions.map((option) => option.value))
    const validTypeSet = new Set(filteredTipoOptions.map((option) => option.value))
    const validQuartosSet = new Set(quartosOptions)

    // Auto-prune invalid downstream selections after facets refresh.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPendingFilters((current) => {
      const nextCities = current.cidades.filter((value) => validCitySet.has(value))
      const nextBairros = current.bairros.filter((value) => validBairroSet.has(value))
      const nextTipos = current.tipos.filter((value) => validTypeSet.has(value))

      let nextQuartosMin = current.quartosMin
      let nextQuartosMax = current.quartosMax
      if (nextQuartosMin && !validQuartosSet.has(nextQuartosMin)) {
        nextQuartosMin = ""
      }
      if (nextQuartosMax && !validQuartosSet.has(nextQuartosMax)) {
        nextQuartosMax = ""
      }
      if (
        nextQuartosMin &&
        nextQuartosMax &&
        Number(nextQuartosMin) > Number(nextQuartosMax)
      ) {
        nextQuartosMax = nextQuartosMin
      }

      const nextPriceRange = clampPriceRange(current.priceRange, effectivePriceBounds)

      const hasChanges =
        !arraysEqual(current.cidades, nextCities) ||
        !arraysEqual(current.bairros, nextBairros) ||
        !arraysEqual(current.tipos, nextTipos) ||
        current.quartosMin !== nextQuartosMin ||
        current.quartosMax !== nextQuartosMax ||
        !rangesEqual(current.priceRange, nextPriceRange)

      if (!hasChanges) return current

      return {
        ...current,
        cidades: nextCities,
        bairros: nextBairros,
        tipos: nextTipos,
        quartosMin: nextQuartosMin,
        quartosMax: nextQuartosMax,
        priceRange: nextPriceRange,
      }
    })
  }, [
    facetedCidadeOptions,
    facetedBairroOptions,
    filteredTipoOptions,
    quartosOptions,
    effectivePriceBounds,
    setPendingFilters,
  ])

  const facetedCidadeMap = useMemo(
    () => new Map(facetedCidadeOptions.map((option) => [option.value, option.label] as const)),
    [facetedCidadeOptions]
  )
  const facetedBairroMap = useMemo(
    () => new Map(facetedBairroOptions.map((option) => [option.value, option.label] as const)),
    [facetedBairroOptions]
  )

  const cityLabel = useMemo(
    () =>
      summarizeSelection(
        pendingFilters.cidades,
        facetedCidadeMap,
        "Cidades",
        "Todas cidades"
      ),
    [pendingFilters.cidades, facetedCidadeMap]
  )

  const bairroLabel = useMemo(
    () =>
      summarizeSelection(
        pendingFilters.bairros,
        facetedBairroMap,
        "Bairros",
        "Todos bairros"
      ),
    [pendingFilters.bairros, facetedBairroMap]
  )

  const locationLabel = useMemo(() => {
    if (pendingFilters.bairros.length > 0 && pendingFilters.cidades.length > 0) {
      return `${pendingFilters.bairros.length + pendingFilters.cidades.length} Locais`
    }
    if (pendingFilters.bairros.length > 0) return bairroLabel
    if (pendingFilters.cidades.length > 0) return cityLabel
    return "Qualquer lugar"
  }, [pendingFilters.bairros.length, pendingFilters.cidades.length, bairroLabel, cityLabel])

  const [minPrice, maxPrice] = pendingFilters.priceRange
  const priceLabel =
    minPrice > effectivePriceBounds.min || maxPrice < effectivePriceBounds.max
      ? `${formatCompactCurrency(minPrice)} - ${formatCompactCurrency(maxPrice)}`
      : "Qualquer preco"

  const quartosLabel = (() => {
    const min = pendingFilters.quartosMin
    const max = pendingFilters.quartosMax
    if (!min && !max) return "Qualquer quarto"
    if (min && max && min === max) {
      return `${min} ${Number(min) === 1 ? "quarto" : "quartos"}`
    }
    if (min && max) return `${min} a ${max} quartos`
    if (min) return `${min}+ quartos`
    return `ate ${max} quartos`
  })()

  const typeLabel = useMemo(() => {
    if (pendingFilters.tipos.length === 0) return "Todos os tipos"
    if (pendingFilters.tipos.length === 1) {
      return tipoMap.get(pendingFilters.tipos[0]) ?? pendingFilters.tipos[0]
    }
    return `${pendingFilters.tipos.length} tipos`
  }, [pendingFilters.tipos, tipoMap])

  const finalidadeLabel = useMemo(() => {
    if (pendingFilters.finalidades.length === 0) return "Comprar"
    if (pendingFilters.finalidades.length === 1) {
      return finalidadeMap.get(pendingFilters.finalidades[0]) ?? "Comprar"
    }
    return "Comprar e alugar"
  }, [pendingFilters.finalidades, finalidadeMap])

  const applyFilters = useCallback(() => {
    const baseParams = isTargetCurrentPath
      ? new URLSearchParams(paramsString)
      : new URLSearchParams()

    const params = applyDraftToSearchParams(baseParams, pendingFilters, effectivePriceBounds)
    if (scope) {
      for (const [key, value] of Object.entries(scope)) {
        params.set(key, value)
      }
    }
    const query = params.toString()
    const href = query ? `${targetPath}?${query}` : targetPath
    router.push(href, { scroll: false })
  }, [
    isTargetCurrentPath,
    paramsString,
    pendingFilters,
    effectivePriceBounds,
    router,
    targetPath,
    scope,
  ])

  const applyCodeSearch = useCallback(
    (code: string) => {
      const normalized = code.trim()
      if (!normalized) return

      const params = new URLSearchParams()
      params.set("codigo", normalized)
      if (scope) {
        for (const [key, value] of Object.entries(scope)) {
          params.set(key, value)
        }
      }
      router.push(`${targetPath}?${params.toString()}`, { scroll: false })
    },
    [router, targetPath, scope]
  )

  return {
    pendingFilters,
    setPendingFilters,
    bairroOptions,
    cidadeOptions,
    tipoOptions,
    filteredTipoOptions,
    groupedBairroOptions,
    cidadeSummaries,
    facetedCidadeOptions,
    facetedBairroOptions,
    quartosOptions,
    effectivePriceBounds,
    locationLabel,
    cityLabel,
    bairroLabel,
    priceLabel,
    quartosLabel,
    typeLabel,
    finalidadeLabel,
    minPrice,
    maxPrice,
    applyFilters,
    applyCodeSearch,
  }
}
