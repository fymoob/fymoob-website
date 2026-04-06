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

export interface SearchBarControllerProps {
  bairros: string[]
  cidades: string[]
  tipos: string[]
  priceBounds: PriceBounds
  targetPath?: string
  bairroSummaries?: BairroSummary[]
  tipoSummaries?: TypeSummary[]
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
  locationLabel: string
  priceLabel: string
  quartosLabel: string
  typeLabel: string
  finalidadeLabel: string
  minPrice: number
  maxPrice: number
  applyFilters: () => void
  applyCodeSearch: (code: string) => void
}

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

export function useSearchBarController({
  bairros,
  cidades,
  tipos,
  priceBounds,
  targetPath = "/busca",
  bairroSummaries,
  tipoSummaries,
}: SearchBarControllerProps): SearchBarController {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const paramsString = searchParams.toString()
  const isTargetCurrentPath = pathname === targetPath

  const [pendingFilters, setPendingFilters] = useState<SearchDraftFilters>(() =>
    createDraftFromSearchParams(new URLSearchParams(paramsString), priceBounds)
  )

  useEffect(() => {
    setPendingFilters(
      createDraftFromSearchParams(new URLSearchParams(paramsString), priceBounds)
    )
  }, [paramsString, priceBounds.max, priceBounds.min])

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

  const bairroMap = useMemo(
    () => new Map(bairroOptions.map((option) => [option.value, option.label])),
    [bairroOptions]
  )
  const cidadeMap = useMemo(
    () => new Map(cidadeOptions.map((option) => [option.value, option.label])),
    [cidadeOptions]
  )
  const tipoMap = useMemo(
    () => new Map(tipoOptions.map((option) => [option.value, option.label])),
    [tipoOptions]
  )
  const finalidadeMap = useMemo(
    () =>
      new Map(
        FINALIDADE_OPTIONS.map((option) => [option.value, option.label] as const)
      ),
    []
  )

  const locationLabel = useMemo(() => {
    if (pendingFilters.bairros.length > 0 && pendingFilters.cidades.length > 0) {
      return `${pendingFilters.bairros.length + pendingFilters.cidades.length} Locais`
    }

    if (pendingFilters.bairros.length > 0) {
      return summarizeSelection(
        pendingFilters.bairros,
        bairroMap,
        "Bairros",
        "Qualquer lugar"
      )
    }

    if (pendingFilters.cidades.length > 0) {
      return summarizeSelection(
        pendingFilters.cidades,
        cidadeMap,
        "Cidades",
        "Qualquer lugar"
      )
    }

    return "Qualquer lugar"
  }, [bairroMap, cidadeMap, pendingFilters.bairros, pendingFilters.cidades])

  const [minPrice, maxPrice] = pendingFilters.priceRange
  const priceLabel =
    minPrice > priceBounds.min || maxPrice < priceBounds.max
      ? `${formatCompactCurrency(minPrice)} - ${formatCompactCurrency(maxPrice)}`
      : "Qualquer preço"

  const quartosLabel = pendingFilters.quartos
    ? `${pendingFilters.quartos}+ quartos`
    : "Qualquer quarto"

  const typeLabel = useMemo(() => {
    if (pendingFilters.tipos.length === 0) return "Todos os tipos"
    if (pendingFilters.tipos.length === 1) {
      return tipoMap.get(pendingFilters.tipos[0]) ?? pendingFilters.tipos[0]
    }
    return `${pendingFilters.tipos.length} tipos`
  }, [pendingFilters.tipos, tipoMap])

  const finalidadeLabel = useMemo(() => {
    if (pendingFilters.finalidades.length === 0) return "Comprar"
    if (pendingFilters.finalidades.includes("locacao")) return "Alugar"
    return "Comprar"
  }, [pendingFilters.finalidades])

  // Task 8: Filter tipos by selected finalidade AND location
  const filteredTipoOptions = useMemo(() => {
    if (!tipoSummaries || tipoSummaries.length === 0) return tipoOptions

    // Step 1: Get types valid for the selected finalidade
    let validTypeSlugs: Set<string> | null = null
    if (pendingFilters.finalidades.length > 0) {
      const isAlugar = pendingFilters.finalidades.includes("locacao")
      const activeTipos = tipoSummaries.filter((ts) => {
        if (ts.total === 0) return false
        if (isAlugar) {
          return (ts.porFinalidade["Aluguel"] ?? 0) > 0 ||
                 (ts.porFinalidade["Locação"] ?? 0) > 0 ||
                 (ts.porFinalidade["Venda e Aluguel"] ?? 0) > 0 ||
                 (ts.porFinalidade["Venda e Locação"] ?? 0) > 0
        }
        return (ts.porFinalidade["Venda"] ?? 0) > 0 ||
               (ts.porFinalidade["Venda e Aluguel"] ?? 0) > 0 ||
               (ts.porFinalidade["Venda e Locação"] ?? 0) > 0
      })
      validTypeSlugs = new Set(activeTipos.map((ts) => ts.slug))
    }

    // Step 2: Get types valid for the selected location (bairro or cidade)
    let locationTypeSlugs: Set<string> | null = null
    if (bairroSummaries && bairroSummaries.length > 0) {
      const hasBairro = pendingFilters.bairros.length > 0
      const hasCidade = pendingFilters.cidades.length > 0
      if (hasBairro || hasCidade) {
        locationTypeSlugs = new Set<string>()
        for (const bs of bairroSummaries) {
          if (bs.total === 0) continue
          const bairroMatch = hasBairro && pendingFilters.bairros.includes(slugify(bs.bairro))
          const cidadeMatch = hasCidade && pendingFilters.cidades.includes(slugify(bs.cidade))
          if (bairroMatch || cidadeMatch) {
            for (const t of bs.tipos) {
              locationTypeSlugs.add(slugify(t.tipo))
            }
          }
        }
      }
    }

    // Step 3: Intersect — type must pass all active filters
    return tipoOptions.filter((opt) => {
      if (validTypeSlugs && !validTypeSlugs.has(opt.value)) return false
      if (locationTypeSlugs && !locationTypeSlugs.has(opt.value)) return false
      // Also exclude types with zero total
      const ts = tipoSummaries.find((t) => t.slug === opt.value)
      if (ts && ts.total === 0) return false
      return true
    })
  }, [tipoOptions, tipoSummaries, bairroSummaries, pendingFilters.finalidades, pendingFilters.bairros, pendingFilters.cidades])

  // Helper: get finalidade-filtered count for a bairro
  const isAlugar = pendingFilters.finalidades.includes("locacao")
  const getBairroCount = useCallback((bs: BairroSummary) => {
    if (pendingFilters.finalidades.length === 0) return bs.total
    if (isAlugar) {
      return (bs.porFinalidade["Aluguel"] ?? 0) +
             (bs.porFinalidade["Locação"] ?? 0) +
             (bs.porFinalidade["Venda e Aluguel"] ?? 0) +
             (bs.porFinalidade["Venda e Locação"] ?? 0)
    }
    return (bs.porFinalidade["Venda"] ?? 0) +
           (bs.porFinalidade["Venda e Aluguel"] ?? 0) +
           (bs.porFinalidade["Venda e Locação"] ?? 0)
  }, [pendingFilters.finalidades, isAlugar])

  // City summaries with counts filtered by finalidade
  const cidadeSummaries = useMemo(() => {
    if (!bairroSummaries || bairroSummaries.length === 0) {
      return cidades.map((c) => ({ label: c, slug: slugify(c), count: 0 }))
    }
    const cityCount = new Map<string, number>()
    for (const bs of bairroSummaries) {
      const count = getBairroCount(bs)
      if (count === 0) continue
      const c = bs.cidade || "Outros"
      cityCount.set(c, (cityCount.get(c) ?? 0) + count)
    }
    return Array.from(cityCount.entries())
      .map(([label, count]) => ({ label, slug: slugify(label), count }))
      .sort((a, b) => b.count - a.count)
  }, [bairroSummaries, cidades, getBairroCount])

  // Task 6: Group bairros by city, filtered by finalidade
  const groupedBairroOptions = useMemo<GroupedBairroOptions[]>(() => {
    if (!bairroSummaries || bairroSummaries.length === 0) return []
    const groups = new Map<string, (MultiSelectOption & { count: number })[]>()
    for (const bs of bairroSummaries) {
      const count = getBairroCount(bs)
      if (count === 0) continue
      const cidade = bs.cidade || "Outros"
      if (!groups.has(cidade)) groups.set(cidade, [])
      groups.get(cidade)!.push({
        value: slugify(bs.bairro),
        label: bs.bairro,
        count,
      })
    }
    return Array.from(groups.entries())
      .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], "pt-BR"))
      .map(([cidade, bairros]) => ({
        cidade,
        bairros: bairros.sort((a, b) => a.label.localeCompare(b.label, "pt-BR")),
      }))
  }, [bairroSummaries, getBairroCount])

  const applyFilters = useCallback(() => {
    const baseParams = isTargetCurrentPath
      ? new URLSearchParams(paramsString)
      : new URLSearchParams()

    const params = applyDraftToSearchParams(baseParams, pendingFilters, priceBounds)
    const query = params.toString()
    const href = query ? `${targetPath}?${query}` : targetPath
    router.push(href, { scroll: false })
  }, [
    isTargetCurrentPath,
    paramsString,
    pendingFilters,
    priceBounds,
    router,
    targetPath,
  ])

  const applyCodeSearch = useCallback(
    (code: string) => {
      const normalized = code.trim()
      if (!normalized) return

      const params = new URLSearchParams()
      params.set("codigo", normalized)
      router.push(`${targetPath}?${params.toString()}`, { scroll: false })
    },
    [router, targetPath]
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
    locationLabel,
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
