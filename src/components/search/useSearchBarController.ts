"use client"

import { useCallback, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { slugify } from "@/lib/utils"
import type { MultiSelectOption } from "@/components/search/filters/types"
import {
  FINALIDADE_OPTIONS,
  applyDraftToSearchParams,
  createDraftFromSearchParams,
  type PriceBounds,
  type SearchDraftFilters,
} from "@/components/search/filters/search-state"

export interface SearchBarControllerProps {
  bairros: string[]
  cidades: string[]
  tipos: string[]
  priceBounds: PriceBounds
  targetPath?: string
}

export interface SearchBarController {
  pendingFilters: SearchDraftFilters
  setPendingFilters: Dispatch<SetStateAction<SearchDraftFilters>>
  bairroOptions: MultiSelectOption[]
  cidadeOptions: MultiSelectOption[]
  tipoOptions: MultiSelectOption[]
  locationLabel: string
  priceLabel: string
  quartosLabel: string
  typeLabel: string
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
      bairros.map((bairro) => ({
        value: slugify(bairro),
        label: bairro,
      })),
    [bairros]
  )

  const cidadeOptions = useMemo<MultiSelectOption[]>(
    () =>
      cidades.map((cidade) => ({
        value: slugify(cidade),
        label: cidade,
      })),
    [cidades]
  )

  const tipoOptions = useMemo<MultiSelectOption[]>(
    () =>
      tipos.map((tipo) => ({
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
    const total = pendingFilters.tipos.length + pendingFilters.finalidades.length
    if (total === 0) return "Todos os tipos"

    if (total === 1) {
      if (pendingFilters.tipos.length === 1) {
        return tipoMap.get(pendingFilters.tipos[0]) ?? pendingFilters.tipos[0]
      }

      return (
        finalidadeMap.get(pendingFilters.finalidades[0]) ??
        pendingFilters.finalidades[0]
      )
    }

    return `${total} filtros`
  }, [finalidadeMap, pendingFilters.finalidades, pendingFilters.tipos, tipoMap])

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
    locationLabel,
    priceLabel,
    quartosLabel,
    typeLabel,
    minPrice,
    maxPrice,
    applyFilters,
    applyCodeSearch,
  }
}
