"use client"

import {
  forwardRef,
  useState,
  type ComponentPropsWithoutRef,
  type ComponentType,
} from "react"
import {
  BedDouble,
  Building2,
  ChevronDown,
  MapPin,
  Search,
  Tag,
  X,
} from "lucide-react"

import { BedroomsFilter } from "@/components/search/filters/BedroomsFilter"
import { LocationFilter } from "@/components/search/filters/LocationFilter"
import { PriceFilter } from "@/components/search/filters/PriceFilter"
import { FINALIDADE_OPTIONS, type PriceBounds } from "@/components/search/filters/search-state"
import { TypeFilter } from "@/components/search/filters/TypeFilter"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useSearchBarController } from "./useSearchBarController"

type SearchMode = "filters" | "code"

export interface SearchBarProps {
  bairros: string[]
  cidades: string[]
  tipos: string[]
  priceBounds: PriceBounds
  sticky?: boolean
  targetPath?: string
  className?: string
  context?: "home" | "search"
}

interface SegmentTriggerProps extends ComponentPropsWithoutRef<"button"> {
  title: string
  value: string
  active?: boolean
  withDivider?: boolean
  icon: ComponentType<{ className?: string }>
  context: "home" | "search"
  onClear?: () => void
}

const SegmentTrigger = forwardRef<HTMLButtonElement, SegmentTriggerProps>(
  function SegmentTrigger(
    {
      title,
      value,
      active,
      withDivider = false,
      icon: Icon,
      context,
      onClear,
      className,
      ...buttonProps
    },
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
        <Icon className={cn("size-4 shrink-0", active ? "text-[#29ABE2]" : "text-neutral-400")} />
        <div className="min-w-0 flex-1">
          {active ? (
            <>
              <p className="truncate text-sm font-semibold tracking-tight text-[#0B1120]">
                {value}
              </p>
              {context === "search" && (
                <p className="hidden truncate text-[11px] text-neutral-400 md:block">
                  {title}
                </p>
              )}
            </>
          ) : (
            <p className="truncate text-sm font-medium tracking-tight text-neutral-400 group-hover:text-neutral-600">
              {title}
            </p>
          )}
        </div>
        {active && onClear ? (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation()
                onClear()
              }
            }}
            className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
            aria-label={`Limpar ${title}`}
          >
            <X className="size-3.5" />
          </span>
        ) : (
          <ChevronDown className="ml-auto size-4 shrink-0 text-neutral-400" />
        )}
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
  context = "search",
}: SearchBarProps) {
  const [searchMode, setSearchMode] = useState<SearchMode>("filters")
  const [codigo, setCodigo] = useState("")

  const {
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
  } = useSearchBarController({
    bairros,
    cidades,
    tipos,
    priceBounds,
    targetPath,
  })

  const isHome = context === "home"
  const modeToggleLabel =
    searchMode === "filters" ? "Buscar por código" : "Buscar por filtros"

  const hasAnyFilter =
    pendingFilters.bairros.length > 0 ||
    pendingFilters.cidades.length > 0 ||
    pendingFilters.tipos.length > 0 ||
    pendingFilters.finalidades.length > 0 ||
    Boolean(pendingFilters.quartos) ||
    minPrice > priceBounds.min ||
    maxPrice < priceBounds.max

  const clearAllFilters = () =>
    setPendingFilters({
      bairros: [],
      cidades: [],
      tipos: [],
      finalidades: [],
      quartos: "",
      priceRange: [priceBounds.min, priceBounds.max],
    })

  return (
    <aside
      className={cn(
        sticky && "sticky top-16 z-40 bg-white/80 py-3 backdrop-blur-md",
        className
      )}
    >
      <div className="w-full">
        <div className="relative">
          <div
            className={cn(
              "mx-auto origin-center transition-all duration-500 ease-out",
              searchMode === "filters"
                ? "max-w-full opacity-100"
                : "pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-[60%] opacity-0"
            )}
          >
            <div className="w-full max-w-full rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl md:rounded-full md:p-0 md:shadow-lg">
              <div className="flex flex-col md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center md:gap-0">
                <div className="border-b border-neutral-200 md:border-b-0">
                  <Popover>
                    <PopoverTrigger
                      render={
                        <SegmentTrigger
                          context={context}
                          icon={MapPin}
                          title="Localização"
                          value={locationLabel}
                          active={
                            pendingFilters.bairros.length > 0 ||
                            pendingFilters.cidades.length > 0
                          }
                          onClear={() =>
                            setPendingFilters((c) => ({ ...c, bairros: [], cidades: [] }))
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
                          context={context}
                          icon={Tag}
                          title="Preço"
                          value={priceLabel}
                          active={minPrice > priceBounds.min || maxPrice < priceBounds.max}
                          onClear={() =>
                            setPendingFilters((c) => ({
                              ...c,
                              priceRange: [priceBounds.min, priceBounds.max],
                            }))
                          }
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
                          context={context}
                          icon={BedDouble}
                          title="Quartos"
                          value={quartosLabel}
                          active={Boolean(pendingFilters.quartos)}
                          onClear={() =>
                            setPendingFilters((c) => ({ ...c, quartos: "" }))
                          }
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
                          context={context}
                          icon={Building2}
                          title="Tipo"
                          value={typeLabel}
                          active={
                            pendingFilters.tipos.length > 0 ||
                            pendingFilters.finalidades.length > 0
                          }
                          onClear={() =>
                            setPendingFilters((c) => ({ ...c, tipos: [], finalidades: [] }))
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

                {isHome ? (
                  <div className="hidden justify-end md:flex md:pr-2">
                    <button
                      type="button"
                      onClick={applyFilters}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0B1120] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#111827]"
                    >
                      <Search className="size-4" />
                      Buscar
                    </button>
                  </div>
                ) : (
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
                )}
              </div>

              <button
                type="button"
                onClick={applyFilters}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#0B1120] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#111827] md:hidden"
              >
                Buscar
              </button>
            </div>
          </div>

          <div
            className={cn(
              "mx-auto origin-center transition-all duration-500 ease-out",
              searchMode === "code"
                ? "max-w-full opacity-100"
                : "pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-[60%] opacity-0"
            )}
          >
            <form
              className="w-full max-w-full rounded-3xl bg-white p-3 shadow-xl md:rounded-full md:p-2 md:shadow-md"
              onSubmit={(event) => {
                event.preventDefault()
                applyCodeSearch(codigo)
              }}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <Input
                  value={codigo}
                  onChange={(event) => setCodigo(event.target.value)}
                  placeholder="Digite o código do imóvel..."
                  className="h-11 flex-1 border-0 rounded-xl bg-transparent text-sm shadow-none focus-visible:ring-0 md:rounded-full"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0B1120] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#111827] md:w-auto md:rounded-full"
                >
                  <Search className="size-4" />
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() =>
              setSearchMode((current) => (current === "filters" ? "code" : "filters"))
            }
            className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <Search className="size-4" />
            {modeToggleLabel}
          </button>

          {hasAnyFilter && searchMode === "filters" && (
            <>
              <span className="text-white/30">|</span>
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
              >
                <X className="size-3.5" />
                Limpar filtros
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
