"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ComponentType,
} from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BedDouble, Building2, ChevronDown, MapPin, Search, Tag } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn, slugify } from "@/lib/utils"
import { BedroomsFilter } from "@/components/search/filters/BedroomsFilter"
import { LocationFilter } from "@/components/search/filters/LocationFilter"
import { PriceFilter } from "@/components/search/filters/PriceFilter"
import {
  FINALIDADE_OPTIONS,
  applyDraftToSearchParams,
  createDraftFromSearchParams,
  type PriceBounds,
  type SearchDraftFilters,
} from "@/components/search/filters/search-state"
import { TypeFilter } from "@/components/search/filters/TypeFilter"
import type { MultiSelectOption } from "@/components/search/filters/types"

export interface SearchBarProps {
  bairros: string[]
  cidades: string[]
  tipos: string[]
  priceBounds: PriceBounds
  sticky?: boolean
  targetPath?: string
  className?: string
}

interface SegmentTriggerProps extends ComponentPropsWithoutRef<"button"> {
  label: string
  value: string
  active?: boolean
  withDivider?: boolean
  icon: ComponentType<{ className?: string }>
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

const SegmentTrigger = forwardRef<HTMLButtonElement, SegmentTriggerProps>(
  function SegmentTrigger(
    { label, value, active, withDivider = false, icon: Icon, className, ...buttonProps },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "group flex h-14 w-full min-w-0 items-center gap-2 px-1 text-left transition-colors md:px-5",
          withDivider && "md:border-r md:border-neutral-200",
          className
        )}
        {...buttonProps}
      >
        <Icon className="size-4 shrink-0 text-neutral-400" />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            {label}
          </p>
          <p
            className={cn(
              "truncate text-sm tracking-tight",
              active
                ? "font-semibold text-[#0B1120]"
                : "font-medium text-neutral-700 group-hover:text-[#0B1120]"
            )}
          >
            {value}
          </p>
        </div>
        <ChevronDown className="ml-auto size-4 shrink-0 text-neutral-400" />
      </button>
    )
  }
)

export function SearchBar({
  bairros,
  cidades,
  tipos,
  priceBounds,
  sticky = false,
  targetPath = "/busca",
  className,
}: SearchBarProps) {
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
      : "Qualquer preco"

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

  return (
    <aside
      className={cn(
        sticky && "sticky top-4 z-50 py-2 backdrop-blur-sm",
        className
      )}
    >
      <div className="w-full">
        <div className="w-full max-w-full rounded-3xl border border-neutral-200 bg-white p-5 shadow-xl md:rounded-full md:p-0 md:shadow-md">
          <div className="flex flex-col md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center md:gap-0">
            <div className="border-b border-neutral-200 md:border-b-0">
              <Popover>
                <PopoverTrigger
                  render={
                    <SegmentTrigger
                      icon={MapPin}
                      label="Localizacao"
                      value={locationLabel}
                      active={
                        pendingFilters.bairros.length > 0 ||
                        pendingFilters.cidades.length > 0
                      }
                      withDivider
                    />
                  }
                />
                <PopoverContent className="w-[calc(100vw-2rem)] max-w-md p-3 md:w-96 md:p-4">
                  <LocationFilter
                    bairros={bairroOptions}
                    cidades={cidadeOptions}
                    selectedBairros={pendingFilters.bairros}
                    selectedCidades={pendingFilters.cidades}
                    onBairrosChange={(values) =>
                      setPendingFilters((current) => ({ ...current, bairros: values }))
                    }
                    onCidadesChange={(values) =>
                      setPendingFilters((current) => ({ ...current, cidades: values }))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="border-b border-neutral-200 md:border-b-0">
              <Popover>
                <PopoverTrigger
                  render={
                    <SegmentTrigger
                      icon={Tag}
                      label="Preco"
                      value={priceLabel}
                      active={minPrice > priceBounds.min || maxPrice < priceBounds.max}
                      withDivider
                    />
                  }
                />
                <PopoverContent className="w-[calc(100vw-2rem)] max-w-md p-3 md:w-96 md:p-4">
                  <PriceFilter
                    value={pendingFilters.priceRange}
                    bounds={priceBounds}
                    onChange={(value) =>
                      setPendingFilters((current) => ({ ...current, priceRange: value }))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="border-b border-neutral-200 md:border-b-0">
              <Popover>
                <PopoverTrigger
                  render={
                    <SegmentTrigger
                      icon={BedDouble}
                      label="Quartos"
                      value={quartosLabel}
                      active={Boolean(pendingFilters.quartos)}
                      withDivider
                    />
                  }
                />
                <PopoverContent className="w-[calc(100vw-2rem)] max-w-xs p-3 md:w-72 md:p-4">
                  <BedroomsFilter
                    value={pendingFilters.quartos}
                    onChange={(value) =>
                      setPendingFilters((current) => ({ ...current, quartos: value }))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="md:border-b-0">
              <Popover>
                <PopoverTrigger
                  render={
                    <SegmentTrigger
                      icon={Building2}
                      label="Tipo"
                      value={typeLabel}
                      active={
                        pendingFilters.tipos.length > 0 ||
                        pendingFilters.finalidades.length > 0
                      }
                    />
                  }
                />
                <PopoverContent className="w-[calc(100vw-2rem)] max-w-sm p-3 md:w-80 md:p-4">
                  <TypeFilter
                    typeOptions={tipoOptions}
                    finalidadeOptions={FINALIDADE_OPTIONS}
                    selectedTipos={pendingFilters.tipos}
                    selectedFinalidades={pendingFilters.finalidades}
                    onTiposChange={(values) =>
                      setPendingFilters((current) => ({ ...current, tipos: values }))
                    }
                    onFinalidadesChange={(values) =>
                      setPendingFilters((current) => ({
                        ...current,
                        finalidades: values,
                      }))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="hidden justify-end md:flex md:pr-2">
              <button
                type="button"
                onClick={applyFilters}
                className="inline-flex size-10 items-center justify-center rounded-full bg-[#0B1120] text-white transition-transform duration-200 hover:scale-105 hover:bg-[#111827]"
                aria-label="Aplicar busca"
              >
                <Search className="size-4" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={applyFilters}
            className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-[#0B1120] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#111827] md:hidden"
          >
            Buscar
          </button>
        </div>
      </div>
    </aside>
  )
}
