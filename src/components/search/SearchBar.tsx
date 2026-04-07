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

import { AdvancedFiltersModal } from "@/components/search/filters/AdvancedFiltersModal"
import { BedroomsFilter } from "@/components/search/filters/BedroomsFilter"
import { LocationAutocomplete } from "@/components/search/filters/LocationAutocomplete"
import { LocationFilter } from "@/components/search/filters/LocationFilter"
import { PriceFilter } from "@/components/search/filters/PriceFilter"
import { type PriceBounds } from "@/components/search/filters/search-state"
import { TypeFilter } from "@/components/search/filters/TypeFilter"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useSearchBarController } from "./useSearchBarController"
import { SlidersHorizontal } from "lucide-react"

type SearchMode = "filters" | "code"

import type { BairroSummary, TypeSummary } from "@/types/property"

export interface SearchBarProps {
  bairros: string[]
  cidades: string[]
  tipos: string[]
  priceBounds: PriceBounds
  bairroSummaries?: BairroSummary[]
  tipoSummaries?: TypeSummary[]
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
        <Icon className={cn("size-4 shrink-0", active ? "text-[#29ABE2]" : "text-neutral-500")} />
        <div className="min-w-0 flex-1">
          {active ? (
            <>
              <p className="truncate text-sm font-semibold tracking-tight text-[#0B1120]">
                {value}
              </p>
              {context === "search" && (
                <p className="hidden truncate text-[11px] text-neutral-500 md:block">
                  {title}
                </p>
              )}
            </>
          ) : (
            <p className="truncate text-sm font-medium tracking-tight text-neutral-500 group-hover:text-neutral-700">
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
            className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
            aria-label={`Limpar ${title}`}
          >
            <X className="size-3.5" />
          </span>
        ) : (
          <ChevronDown className="ml-auto size-4 shrink-0 text-neutral-500" />
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
  bairroSummaries,
  tipoSummaries,
  sticky = false,
  targetPath = "/busca",
  className,
  context = "search",
}: SearchBarProps) {
  const [searchMode, setSearchMode] = useState<SearchMode>("filters")
  const [codigo, setCodigo] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [locationPopoverOpen, setLocationPopoverOpen] = useState(false)

  const {
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
  } = useSearchBarController({
    bairros,
    cidades,
    tipos,
    priceBounds,
    targetPath,
    bairroSummaries,
    tipoSummaries,
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

  const [sheetOpen, setSheetOpen] = useState(false)

  const clearAllFilters = () =>
    setPendingFilters({
      bairros: [],
      cidades: [],
      tipos: [],
      finalidades: [],
      quartos: "",
      priceRange: [priceBounds.min, priceBounds.max],
      codigo: "",
      suitesMin: "",
      banheirosMin: "",
      vagasMin: "",
      areaMin: "",
      areaMax: "",
    })

  const advancedFilterCount =
    (pendingFilters.codigo ? 1 : 0) +
    (pendingFilters.suitesMin ? 1 : 0) +
    (pendingFilters.banheirosMin ? 1 : 0) +
    (pendingFilters.vagasMin ? 1 : 0) +
    (pendingFilters.areaMin ? 1 : 0) +
    (pendingFilters.areaMax ? 1 : 0)

  const activeFilterCount =
    (pendingFilters.finalidades.length > 0 ? 1 : 0) +
    (pendingFilters.bairros.length > 0 || pendingFilters.cidades.length > 0 ? 1 : 0) +
    (pendingFilters.tipos.length > 0 ? 1 : 0) +
    (pendingFilters.quartos ? 1 : 0) +
    (minPrice > priceBounds.min || maxPrice < priceBounds.max ? 1 : 0) +
    advancedFilterCount

  // Chip definitions for mobile — order: Finalidade → Location → Tipo → Quartos → Preço
  const chips = [
    {
      label: finalidadeLabel,
      active: pendingFilters.finalidades.length > 0,
      icon: Building2,
    },
    {
      label: pendingFilters.bairros.length > 0 || pendingFilters.cidades.length > 0
        ? locationLabel : "Localização",
      active: pendingFilters.bairros.length > 0 || pendingFilters.cidades.length > 0,
      icon: MapPin,
    },
    {
      label: pendingFilters.tipos.length > 0 ? typeLabel : "Tipo",
      active: pendingFilters.tipos.length > 0,
      icon: Building2,
    },
    {
      label: pendingFilters.quartos ? quartosLabel : "Quartos",
      active: Boolean(pendingFilters.quartos),
      icon: BedDouble,
    },
    {
      label: minPrice > priceBounds.min || maxPrice < priceBounds.max
        ? priceLabel : "Preço",
      active: minPrice > priceBounds.min || maxPrice < priceBounds.max,
      icon: Tag,
    },
  ]

  return (
    <>
    <aside
      className={cn(
        sticky && "sticky top-14 z-40 bg-white/80 py-3 backdrop-blur-md md:top-16",
        className
      )}
    >
      <div className="w-full">
        {/* ── Mobile: Chips + Bottom Sheet ── */}
        {!isHome && (
          <div className="md:hidden">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {/* Filter button */}
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger
                  render={
                    <button
                      type="button"
                      className={cn(
                        "relative inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-colors",
                        activeFilterCount > 0
                          ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                          : "border-neutral-200 bg-white text-neutral-700"
                      )}
                    />
                  }
                >
                  <SlidersHorizontal className="size-3.5" />
                  Filtros
                  {activeFilterCount > 0 && (
                    <span className="flex size-4 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </SheetTrigger>

                <SheetContent side="bottom" className="flex max-h-[85dvh] flex-col rounded-t-2xl">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 space-y-6 overflow-y-auto px-4 pb-4">
                    {/* Finalidade — Comprar/Alugar */}
                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-neutral-700">O que deseja?</h3>
                      <div className="flex gap-2">
                        {(["comprar", "alugar"] as const).map((f) => {
                          const isActive = f === "comprar"
                            ? !pendingFilters.finalidades.includes("locacao")
                            : pendingFilters.finalidades.includes("locacao")
                          return (
                            <button
                              key={f}
                              type="button"
                              onClick={() =>
                                setPendingFilters((c) => ({
                                  ...c,
                                  finalidades: f === "alugar" ? ["locacao"] : ["venda"],
                                }))
                              }
                              className={cn(
                                "flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all",
                                isActive
                                  ? "bg-brand-primary text-white"
                                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                              )}
                            >
                              {f === "comprar" ? "Comprar" : "Alugar"}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-neutral-700">Localização</h3>
                      <LocationFilter
                        bairros={bairroOptions}
                        cidades={cidadeOptions}
                        groupedBairros={groupedBairroOptions}
                        selectedBairros={pendingFilters.bairros}
                        selectedCidades={pendingFilters.cidades}
                        onBairrosChange={(values) =>
                          setPendingFilters((c) => ({ ...c, bairros: values }))
                        }
                        onCidadesChange={(values) =>
                          setPendingFilters((c) => ({ ...c, cidades: values }))
                        }
                      />
                    </div>

                    {/* Type */}
                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-neutral-700">Tipo de imóvel</h3>
                      <TypeFilter
                        typeOptions={filteredTipoOptions}
                        selectedTipos={pendingFilters.tipos}
                        onTiposChange={(values) =>
                          setPendingFilters((c) => ({ ...c, tipos: values }))
                        }
                      />
                    </div>

                    {/* Bedrooms */}
                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-neutral-700">Quartos</h3>
                      <BedroomsFilter
                        value={pendingFilters.quartos}
                        onChange={(value) =>
                          setPendingFilters((c) => ({ ...c, quartos: value }))
                        }
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-neutral-700">Preço</h3>
                      <PriceFilter
                        value={pendingFilters.priceRange}
                        bounds={priceBounds}
                        onChange={(value) =>
                          setPendingFilters((c) => ({ ...c, priceRange: value }))
                        }
                      />
                    </div>

                    {/* Mais filtros button → opens modal */}
                    <div className="border-t border-neutral-200 pt-4">
                      <button
                        type="button"
                        onClick={() => { setSheetOpen(false); setTimeout(() => setModalOpen(true), 200) }}
                        className={cn(
                          "flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-colors",
                          advancedFilterCount > 0
                            ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                            : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                        )}
                      >
                        <SlidersHorizontal className="size-4" />
                        Mais filtros
                        {advancedFilterCount > 0 && (
                          <span className="flex size-5 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white">
                            {advancedFilterCount}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  <SheetFooter className="sticky bottom-0 border-t border-neutral-100 bg-white pb-safe">
                    <div className="flex gap-3">
                      {hasAnyFilter && (
                        <button
                          type="button"
                          onClick={clearAllFilters}
                          className="flex-1 rounded-xl border border-neutral-200 py-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
                        >
                          Limpar
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          applyFilters()
                          setSheetOpen(false)
                        }}
                        className="flex-[2] rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
                      >
                        Aplicar filtros
                      </button>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              {/* Chips */}
              {chips.map((chip) => {
                const Icon = chip.icon
                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => setSheetOpen(true)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors",
                      chip.active
                        ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                        : "border-neutral-200 bg-white text-neutral-600"
                    )}
                  >
                    <Icon className="size-3.5" />
                    {chip.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Desktop: Full search bar (also mobile for home context) ── */}
        <div className={cn(!isHome && "hidden md:block")}>

        {/* Comprar / Alugar toggle — above search bar on home */}
        {isHome && (
          <div className="mb-4 flex justify-center">
            <div className="inline-flex rounded-full bg-black/30 p-1 backdrop-blur-sm">
              {(["comprar", "alugar"] as const).map((f) => {
                const isActive = f === "comprar"
                  ? !pendingFilters.finalidades.includes("locacao")
                  : pendingFilters.finalidades.includes("locacao")
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() =>
                      setPendingFilters((c) => ({
                        ...c,
                        finalidades: f === "alugar" ? ["locacao"] : ["venda"],
                      }))
                    }
                    className={cn(
                      "rounded-full px-6 py-2 text-sm font-semibold transition-all",
                      isActive
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {f === "comprar" ? "Comprar" : "Alugar"}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="relative">
          <div
            className={cn(
              "mx-auto origin-center transition-all duration-500 ease-out",
              searchMode === "filters"
                ? "max-w-full opacity-100"
                : "pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-[60%] opacity-0"
            )}
          >
            <div className="w-full max-w-full rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm md:rounded-full md:p-0 md:shadow-lg">
              <div className={cn(
                "flex flex-col md:items-center md:gap-0",
                isHome
                  ? "md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1fr)_auto]"
                  : "md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_auto]"
              )}>

                {/* 1. Localização — Smart Autocomplete */}
                <div className="border-b border-neutral-200 md:border-b-0">
                  <Popover open={locationPopoverOpen} onOpenChange={setLocationPopoverOpen}>
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
                    <PopoverContent className="w-[calc(100vw-2rem)] max-w-md p-4 md:w-[420px]">
                      <LocationAutocomplete
                        groupedBairros={groupedBairroOptions}
                        cidades={cidadeSummaries}
                        selectedBairros={pendingFilters.bairros}
                        selectedCidades={pendingFilters.cidades}
                        onSelect={(item) => {
                          if (item.type === "cidade") {
                            setPendingFilters((c) => ({
                              ...c,
                              cidades: [item.slug],
                              bairros: [],
                            }))
                          } else {
                            setPendingFilters((c) => ({
                              ...c,
                              bairros: [item.slug],
                              cidades: [],
                            }))
                          }
                          setLocationPopoverOpen(false)
                        }}
                        onClose={() => setLocationPopoverOpen(false)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 2. Tipo */}
                <div className="border-b border-neutral-200 md:border-b-0">
                  <Popover>
                    <PopoverTrigger
                      render={
                        <SegmentTrigger
                          context={context}
                          icon={Building2}
                          title="Tipo"
                          value={typeLabel}
                          active={pendingFilters.tipos.length > 0}
                          onClear={() =>
                            setPendingFilters((c) => ({ ...c, tipos: [] }))
                          }
                          withDivider
                        />
                      }
                    />
                    <PopoverContent className="w-[calc(100vw-2rem)] max-w-sm p-3 md:w-80 md:p-4">
                      <TypeFilter
                        typeOptions={filteredTipoOptions}
                        selectedTipos={pendingFilters.tipos}
                        onTiposChange={(values) =>
                          setPendingFilters((current) => ({ ...current, tipos: values }))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 3. Quartos */}
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

                {/* 4. Preço */}
                <div className="md:border-b-0">
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

                {/* 5. Mais filtros (search context only) */}
                {!isHome && (
                  <div className="hidden md:block">
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="group flex h-14 w-full items-center gap-2 px-5 text-left transition-colors"
                    >
                      <SlidersHorizontal className={cn("size-4 shrink-0", advancedFilterCount > 0 ? "text-brand-primary" : "text-neutral-500")} />
                      <span className={cn(
                        "truncate text-sm font-medium tracking-tight",
                        advancedFilterCount > 0 ? "font-semibold text-neutral-900" : "text-neutral-500 group-hover:text-neutral-700"
                      )}>
                        {advancedFilterCount > 0 ? `Mais filtros (${advancedFilterCount})` : "Mais filtros"}
                      </span>
                    </button>
                  </div>
                )}

                {isHome ? (
                  <div className="hidden justify-end md:flex md:pr-2">
                    <button
                      type="button"
                      onClick={applyFilters}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
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
                      className="inline-flex size-10 items-center justify-center rounded-full bg-brand-primary text-white transition-transform duration-200 hover:scale-105 hover:bg-brand-primary-hover"
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
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover md:hidden"
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
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover md:w-auto md:rounded-full"
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
      </div>
    </aside>

    {/* Advanced filters modal — portal outside aside */}
    <AdvancedFiltersModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      pendingFilters={pendingFilters}
      setPendingFilters={setPendingFilters}
      priceBounds={priceBounds}
      bairroOptions={bairroOptions}
      cidadeOptions={cidadeOptions}
      tipoOptions={filteredTipoOptions}
      groupedBairroOptions={groupedBairroOptions}
      onApply={applyFilters}
      onClear={clearAllFilters}
    />
    </>
  )
}
