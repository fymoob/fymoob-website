"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ComponentType,
} from "react"
import { useRouter } from "next/navigation"
import {
  Bath,
  BedDouble,
  Building2,
  Car,
  ChevronDown,
  Hash,
  ListChecks,
  MapPin,
  Maximize2,
  Search,
  Tag,
  X,
} from "lucide-react"

import dynamic from "next/dynamic"
import { type PriceBounds } from "@/components/search/filters/search-state"
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

// Filtros LEVES (poucas linhas, sem @base-ui heavy) — imports eagers OK
import { BedroomsFilter } from "@/components/search/filters/BedroomsFilter"
import { CountedMultiSelect } from "@/components/search/filters/CountedMultiSelect"
import { TypeFilter } from "@/components/search/filters/TypeFilter"
import { FilterSection } from "@/components/search/filters/FilterSection"
import { PriceFilter } from "@/components/search/filters/PriceFilter"
import { NumberSelector } from "@/components/search/filters/AdvancedFields"

// Filtros PESADOS — so carregam quando o usuario abre o popover/sheet
// Skeleton leve enquanto baixa (evita layout shift). ssr:false mantido em
// dynamic aqui pois todos sao puramente interativos — nao beneficiam de SSR.
const skeleton = () => <div className="h-32 w-full animate-pulse rounded-lg bg-neutral-100" />

const EmpreendimentoFilter = dynamic(
  () => import("@/components/search/filters/EmpreendimentoFilter").then((m) => ({ default: m.EmpreendimentoFilter })),
  { ssr: false, loading: skeleton }
)
const LocationFilter = dynamic(
  () => import("@/components/search/filters/LocationFilter").then((m) => ({ default: m.LocationFilter })),
  { ssr: false, loading: skeleton }
)
const CityFilter = dynamic(
  () => import("@/components/search/filters/CityFilter").then((m) => ({ default: m.CityFilter })),
  { ssr: false, loading: skeleton }
)
const BairroFilter = dynamic(
  () => import("@/components/search/filters/BairroFilter").then((m) => ({ default: m.BairroFilter })),
  { ssr: false, loading: skeleton }
)
const AreaRangeInput = dynamic(
  () => import("@/components/search/filters/AdvancedFields").then((m) => ({ default: m.AreaRangeInput })),
  { ssr: false, loading: () => <div className="h-10 w-full animate-pulse rounded-md bg-neutral-100" /> }
)
const CaracteristicasCheckboxes = dynamic(
  () => import("@/components/search/filters/AdvancedFields").then((m) => ({ default: m.CaracteristicasCheckboxes })),
  { ssr: false, loading: skeleton }
)

const AdvancedFiltersModal = dynamic(() => import("@/components/search/filters/AdvancedFiltersModal").then(m => m.AdvancedFiltersModal))
import { cn } from "@/lib/utils"
import { useSearchBarController } from "./useSearchBarController"
import { SlidersHorizontal } from "lucide-react"

type SearchMode = "filters" | "code"

import type { BairroSummary, TypeSummary } from "@/types/property"

export interface SearchBarProps {
  bairros: string[]
  cidades: string[]
  tipos: string[]
  empreendimentos?: string[]
  priceBounds: PriceBounds
  bairroSummaries?: BairroSummary[]
  tipoSummaries?: TypeSummary[]
  /**
   * Caracteristicas agregadas do catalogo (ja ordenadas por frequencia
   * e com group "unidade"|"condominio" inferido). Derivado dinamicamente
   * de Property.caracteristicas + .infraestrutura de todos imoveis ativos.
   * Bruno adiciona caracteristica nova no CRM → aparece aqui automatico
   * apos proximo revalidate do cache (~1h).
   */
  caracteristicas?: import("@/services/taxonomy").CaracteristicaOption[]
  sticky?: boolean
  targetPath?: string
  className?: string
  context?: "home" | "search"
  /** Fixed params merged into every search (e.g. { lancamento: "true" }) */
  scope?: Record<string, string>
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
          withDivider && "md:border-r md:border-slate-200",
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
  empreendimentos,
  priceBounds,
  bairroSummaries,
  tipoSummaries,
  caracteristicas,
  sticky = false,
  targetPath = "/busca",
  className,
  context = "search",
  scope,
}: SearchBarProps) {
  const isHome = context === "home"
  const [searchMode, setSearchMode] = useState<SearchMode>("filters")
  const [heroTab, setHeroTab] = useState<"comprar" | "alugar" | "lancamentos">("comprar")
  const [codigo, setCodigo] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const heroRouter = useRouter()

  // Pill "Lancamentos" agora funciona tanto em /home quanto em /busca —
  // quando ativa, redireciona pra /lancamentos em vez de ficar em /busca.
  const isLancamentos = heroTab === "lancamentos"

  const {
    pendingFilters,
    setPendingFilters,
    bairroOptions,
    cidadeOptions,
    filteredTipoOptions,
    groupedBairroOptions,
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
    applyFilters: applyFiltersBase,
    applyCodeSearch,
  } = useSearchBarController({
    bairros,
    cidades,
    tipos,
    priceBounds,
    targetPath,
    bairroSummaries,
    tipoSummaries,
    scope,
  })
  // Ensure "Comprar" default on home sets finalidade=venda
  useEffect(() => {
    if (isHome && pendingFilters.finalidades.length === 0) {
      setPendingFilters((c) => ({ ...c, finalidades: ["venda"] }))
    }
  }, [isHome]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sincroniza pill heroTab com o estado atual dos filtros — necessario pra
  // deep-links (ex: chegar em /busca?finalidade=alugar deve mostrar "Alugar"
  // ativo no pill). Lancamentos e intencao de navegacao explicita do usuario;
  // nao sobrescrevemos automaticamente.
  useEffect(() => {
    const nextTab: "comprar" | "alugar" = pendingFilters.finalidades.includes("locacao")
      ? "alugar"
      : "comprar"
    setHeroTab((current) => (current === "lancamentos" ? current : nextTab))
  }, [pendingFilters.finalidades])

  const handleHeroTab = useCallback((tab: "comprar" | "alugar" | "lancamentos") => {
    setHeroTab(tab)
    if (tab !== "lancamentos") {
      setPendingFilters((c) => ({
        ...c,
        finalidades: tab === "alugar" ? ["locacao"] : ["venda"],
      }))
    }
  }, [setPendingFilters])

  const applyLancamentosSearch = useCallback(() => {
    const params = new URLSearchParams()
    if (pendingFilters.bairros.length > 0) params.set("bairro", pendingFilters.bairros.join(","))
    if (pendingFilters.cidades.length > 0) params.set("cidade", pendingFilters.cidades.join(","))
    if (pendingFilters.tipos.length > 0) params.set("tipo", pendingFilters.tipos.join(","))
    if (pendingFilters.quartosMin) params.set("quartosMin", pendingFilters.quartosMin)
    if (pendingFilters.quartosMax) params.set("quartosMax", pendingFilters.quartosMax)
    if (minPrice > effectivePriceBounds.min) params.set("precoMin", String(minPrice))
    if (maxPrice < effectivePriceBounds.max) params.set("precoMax", String(maxPrice))
    const query = params.toString()
    heroRouter.push(query ? `/lancamentos?${query}` : "/lancamentos")
  }, [pendingFilters.bairros, pendingFilters.cidades, pendingFilters.quartosMin, pendingFilters.quartosMax, pendingFilters.tipos, minPrice, maxPrice, effectivePriceBounds, heroRouter])

  const applyFilters = isLancamentos ? applyLancamentosSearch : applyFiltersBase

  const modeToggleLabel =
    searchMode === "filters" ? "Buscar por código" : "Buscar por filtros"

  const hasAnyFilter =
    pendingFilters.bairros.length > 0 ||
    pendingFilters.cidades.length > 0 ||
    pendingFilters.tipos.length > 0 ||
    pendingFilters.finalidades.length > 0 ||
    Boolean(pendingFilters.quartosMin || pendingFilters.quartosMax) ||
    minPrice > effectivePriceBounds.min ||
    maxPrice < effectivePriceBounds.max

  const [sheetOpen, setSheetOpen] = useState(false)
  const [activeChipSheet, setActiveChipSheet] = useState<"cidade" | "bairro" | "type" | "bedrooms" | "price" | null>(null)

  const clearAllFilters = () =>
    setPendingFilters({
      bairros: [],
      cidades: [],
      tipos: [],
      finalidades: [],
      quartosMin: "",
      quartosMax: "",
      priceRange: [priceBounds.min, priceBounds.max],
      codigo: "",
      suitesMin: "",
      banheirosMin: "",
      vagasMin: "",
      areaMin: "",
      areaMax: "",
      caracteristicasUnidade: [],
      caracteristicasCondominio: [],
      empreendimentos: [],
    })

  const advancedFilterCount =
    (pendingFilters.codigo ? 1 : 0) +
    (pendingFilters.suitesMin ? 1 : 0) +
    (pendingFilters.banheirosMin ? 1 : 0) +
    (pendingFilters.vagasMin ? 1 : 0) +
    (pendingFilters.areaMin ? 1 : 0) +
    (pendingFilters.areaMax ? 1 : 0) +
    (pendingFilters.caracteristicasUnidade.length > 0 ? 1 : 0) +
    (pendingFilters.caracteristicasCondominio.length > 0 ? 1 : 0) +
    (pendingFilters.empreendimentos.length > 0 ? 1 : 0)

  const activeFilterCount =
    (pendingFilters.finalidades.length > 0 ? 1 : 0) +
    (pendingFilters.bairros.length > 0 || pendingFilters.cidades.length > 0 ? 1 : 0) +
    (pendingFilters.tipos.length > 0 ? 1 : 0) +
    (pendingFilters.quartosMin || pendingFilters.quartosMax ? 1 : 0) +
    (minPrice > effectivePriceBounds.min || maxPrice < effectivePriceBounds.max ? 1 : 0) +
    advancedFilterCount

  // Chip definitions for mobile — order: Finalidade → Cidade → Bairro → Tipo → Quartos → Preço
  // Paridade com desktop: 2 chips separados pra Cidade e Bairro em vez de
  // um unico "Localizacao" combinado. Cada chip abre seu proprio overlay.
  const cidadeChipLabel =
    pendingFilters.cidades.length === 0
      ? "Cidade"
      : pendingFilters.cidades.length === 1
        ? pendingFilters.cidades[0]
        : `${pendingFilters.cidades.length} cidades`
  const bairroChipLabel =
    pendingFilters.bairros.length === 0
      ? "Bairro"
      : pendingFilters.bairros.length === 1
        ? pendingFilters.bairros[0]
        : `${pendingFilters.bairros.length} bairros`
  const chips: { label: string; active: boolean; icon: ComponentType<{ className?: string }>; sheetKey: "cidade" | "bairro" | "type" | "bedrooms" | "price" | null }[] = [
    ...(pendingFilters.finalidades.includes("locacao")
      ? [
          {
            label: finalidadeLabel,
            active: true as const,
            icon: Building2,
            sheetKey: null,
          },
        ]
      : []),
    {
      label: cidadeChipLabel,
      active: pendingFilters.cidades.length > 0,
      icon: MapPin,
      sheetKey: "cidade" as const,
    },
    {
      label: bairroChipLabel,
      active: pendingFilters.bairros.length > 0,
      icon: MapPin,
      sheetKey: "bairro" as const,
    },
    {
      label: pendingFilters.tipos.length > 0 ? typeLabel : "Tipo",
      active: pendingFilters.tipos.length > 0,
      icon: Building2,
      sheetKey: "type" as const,
    },
    {
      label: pendingFilters.quartosMin || pendingFilters.quartosMax ? quartosLabel : "Quartos",
      active: Boolean(pendingFilters.quartosMin || pendingFilters.quartosMax),
      icon: BedDouble,
      sheetKey: "bedrooms" as const,
    },
    {
      label: minPrice > effectivePriceBounds.min || maxPrice < effectivePriceBounds.max
        ? priceLabel : "Preço",
      active: minPrice > effectivePriceBounds.min || maxPrice < effectivePriceBounds.max,
      icon: Tag,
      sheetKey: "price" as const,
    },
  ]

  // On home hero (dark image bg), links need both higher opacity AND a
  // subtle drop shadow to pass WCAG AA contrast over the bright parts of
  // the photo (sofa, sunset, window). Netflix/Spotify pattern.
  const secondaryControlsClass = isHome
    ? "text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.45)] hover:text-white"
    : "text-neutral-500 hover:text-neutral-800"
  const secondarySeparatorClass = isHome
    ? "text-white/50 [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]"
    : "text-neutral-300"

  return (
    <>
    <aside
      className={cn(
        // Sticky wrapper is fully transparent — the inner pill container
        // (rounded-full bg-white/60 + backdrop-blur-xl) handles visual
        // separation. Keeping the wrapper transparent means the mesh
        // gradient is never cut by an outer rectangle.
        sticky && "sticky top-14 z-40 py-3 md:top-16",
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

                  <div className="flex-1 overflow-y-auto px-4 pb-4">
                    {/* Finalidade — always expanded (short) */}
                    <FilterSection title="O que deseja?" alwaysOpen>
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
                    </FilterSection>

                    {/* Cidade — dropdown dedicado (paridade com desktop popover) */}
                    <FilterSection
                      title="Cidade"
                      icon={MapPin}
                      activeCount={pendingFilters.cidades.length}
                      selectionSummary={
                        pendingFilters.cidades.length > 0
                          ? pendingFilters.cidades.slice(0, 3).join(", ")
                          : null
                      }
                    >
                      <CityFilter
                        cidades={cidadeOptions}
                        selectedCidades={pendingFilters.cidades}
                        onCidadesChange={(values) =>
                          setPendingFilters((c) => ({ ...c, cidades: values }))
                        }
                      />
                    </FilterSection>

                    {/* Bairro — dropdown dedicado, filtrado pelas cidades selecionadas */}
                    <FilterSection
                      title="Bairro"
                      icon={MapPin}
                      activeCount={pendingFilters.bairros.length}
                      selectionSummary={
                        pendingFilters.bairros.length > 0
                          ? pendingFilters.bairros.slice(0, 3).join(", ")
                          : null
                      }
                    >
                      <BairroFilter
                        bairros={bairroOptions}
                        groupedBairros={groupedBairroOptions}
                        selectedBairros={pendingFilters.bairros}
                        selectedCidades={pendingFilters.cidades}
                        onBairrosChange={(values) =>
                          setPendingFilters((c) => ({ ...c, bairros: values }))
                        }
                      />
                    </FilterSection>

                    {/* Type — collapsed (many options) */}
                    <FilterSection
                      title="Tipo de imóvel"
                      icon={Building2}
                      activeCount={pendingFilters.tipos.length}
                      selectionSummary={
                        pendingFilters.tipos.length > 0
                          ? pendingFilters.tipos.slice(0, 3).join(", ")
                          : null
                      }
                    >
                      <TypeFilter
                        typeOptions={filteredTipoOptions}
                        selectedTipos={pendingFilters.tipos}
                        onTiposChange={(values) =>
                          setPendingFilters((c) => ({ ...c, tipos: values }))
                        }
                      />
                    </FilterSection>

                    {/* Bedrooms — always expanded (short) */}
                    <FilterSection title="Quartos" icon={BedDouble} alwaysOpen>
                      <BedroomsFilter
                        options={quartosOptions}
                        minValue={pendingFilters.quartosMin}
                        maxValue={pendingFilters.quartosMax}
                        onMinChange={(value) =>
                          setPendingFilters((c) => ({ ...c, quartosMin: value }))
                        }
                        onMaxChange={(value) =>
                          setPendingFilters((c) => ({ ...c, quartosMax: value }))
                        }
                      />
                    </FilterSection>

                    {/* Price — always expanded (short) */}
                    <FilterSection title="Preço" icon={Tag} alwaysOpen>
                      <PriceFilter
                        value={pendingFilters.priceRange}
                        bounds={effectivePriceBounds}
                        onChange={(value) =>
                          setPendingFilters((c) => ({ ...c, priceRange: value }))
                        }
                      />
                    </FilterSection>

                    {/* Área privativa — collapsed */}
                    <FilterSection
                      title="Área privativa (m²)"
                      icon={Maximize2}
                      activeCount={(pendingFilters.areaMin ? 1 : 0) + (pendingFilters.areaMax ? 1 : 0)}
                      selectionSummary={
                        pendingFilters.areaMin || pendingFilters.areaMax
                          ? `${pendingFilters.areaMin || "0"} a ${pendingFilters.areaMax || "—"} m²`
                          : null
                      }
                    >
                      <AreaRangeInput
                        minValue={pendingFilters.areaMin}
                        maxValue={pendingFilters.areaMax}
                        onMinChange={(v) => setPendingFilters((c) => ({ ...c, areaMin: v }))}
                        onMaxChange={(v) => setPendingFilters((c) => ({ ...c, areaMax: v }))}
                      />
                    </FilterSection>

                    {/* Suítes — collapsed */}
                    <FilterSection
                      title="Suítes"
                      icon={BedDouble}
                      activeCount={pendingFilters.suitesMin ? 1 : 0}
                      selectionSummary={pendingFilters.suitesMin ? `${pendingFilters.suitesMin}+ suítes` : null}
                    >
                      <NumberSelector
                        value={pendingFilters.suitesMin}
                        onChange={(v) => setPendingFilters((c) => ({ ...c, suitesMin: v }))}
                      />
                    </FilterSection>

                    {/* Banheiros — collapsed */}
                    <FilterSection
                      title="Banheiros"
                      icon={Bath}
                      activeCount={pendingFilters.banheirosMin ? 1 : 0}
                      selectionSummary={pendingFilters.banheirosMin ? `${pendingFilters.banheirosMin}+ banheiros` : null}
                    >
                      <NumberSelector
                        value={pendingFilters.banheirosMin}
                        onChange={(v) => setPendingFilters((c) => ({ ...c, banheirosMin: v }))}
                      />
                    </FilterSection>

                    {/* Vagas — collapsed */}
                    <FilterSection
                      title="Vagas de garagem"
                      icon={Car}
                      activeCount={pendingFilters.vagasMin ? 1 : 0}
                      selectionSummary={pendingFilters.vagasMin ? `${pendingFilters.vagasMin}+ vagas` : null}
                    >
                      <NumberSelector
                        value={pendingFilters.vagasMin}
                        onChange={(v) => setPendingFilters((c) => ({ ...c, vagasMin: v }))}
                      />
                    </FilterSection>

                    {/* Características — collapsed (long list, two groups) */}
                    <FilterSection
                      title="Características"
                      icon={ListChecks}
                      activeCount={
                        pendingFilters.caracteristicasUnidade.length +
                        pendingFilters.caracteristicasCondominio.length
                      }
                      selectionSummary={
                        pendingFilters.caracteristicasUnidade.length +
                          pendingFilters.caracteristicasCondominio.length >
                        0
                          ? [
                              ...pendingFilters.caracteristicasUnidade,
                              ...pendingFilters.caracteristicasCondominio,
                            ]
                              .slice(0, 3)
                              .join(", ")
                          : null
                      }
                    >
                      <CaracteristicasCheckboxes
                        caracteristicas={caracteristicas ?? []}
                        selectedUnidade={pendingFilters.caracteristicasUnidade}
                        selectedCondominio={pendingFilters.caracteristicasCondominio}
                        onToggleUnidade={(label) =>
                          setPendingFilters((c) => ({
                            ...c,
                            caracteristicasUnidade: c.caracteristicasUnidade.includes(label)
                              ? c.caracteristicasUnidade.filter((x) => x !== label)
                              : [...c.caracteristicasUnidade, label],
                          }))
                        }
                        onToggleCondominio={(label) =>
                          setPendingFilters((c) => ({
                            ...c,
                            caracteristicasCondominio: c.caracteristicasCondominio.includes(label)
                              ? c.caracteristicasCondominio.filter((x) => x !== label)
                              : [...c.caracteristicasCondominio, label],
                          }))
                        }
                      />
                    </FilterSection>

                    {/* Empreendimento — collapsed (multi-select autocomplete) */}
                    {empreendimentos && empreendimentos.length > 0 && (
                      <FilterSection
                        title="Empreendimento"
                        icon={Building2}
                        activeCount={pendingFilters.empreendimentos.length}
                        selectionSummary={
                          pendingFilters.empreendimentos.length > 0
                            ? pendingFilters.empreendimentos.slice(0, 2).join(", ")
                            : null
                        }
                      >
                        <EmpreendimentoFilter
                          options={empreendimentos}
                          values={pendingFilters.empreendimentos}
                          onChange={(v) =>
                            setPendingFilters((c) => ({ ...c, empreendimentos: v }))
                          }
                        />
                      </FilterSection>
                    )}

                    {/* Código — collapsed */}
                    <FilterSection
                      title="Código do imóvel"
                      icon={Hash}
                      activeCount={pendingFilters.codigo ? 1 : 0}
                      selectionSummary={pendingFilters.codigo || null}
                    >
                      <Input
                        type="text"
                        inputMode="text"
                        autoCapitalize="characters"
                        autoComplete="off"
                        value={pendingFilters.codigo}
                        onChange={(e) =>
                          setPendingFilters((c) => ({ ...c, codigo: e.target.value.toUpperCase() }))
                        }
                        placeholder="Ex: AP00296 ou 69803208"
                        className="h-10 rounded-xl text-sm"
                      />
                    </FilterSection>
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
                    onClick={() => chip.sheetKey ? setActiveChipSheet(chip.sheetKey) : setSheetOpen(true)}
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

            {/* Individual filter sheets rendered outside aside via portal below */}

            <Sheet open={activeChipSheet === "bedrooms"} onOpenChange={(open) => !open && setActiveChipSheet(null)}>
              <SheetContent side="bottom" className="flex flex-col rounded-t-2xl">
                <SheetHeader><SheetTitle>Quartos</SheetTitle></SheetHeader>
                <div className="px-4 pb-4">
                  <BedroomsFilter
                    options={quartosOptions}
                    minValue={pendingFilters.quartosMin}
                    maxValue={pendingFilters.quartosMax}
                    onMinChange={(value) => setPendingFilters((c) => ({ ...c, quartosMin: value }))}
                    onMaxChange={(value) => setPendingFilters((c) => ({ ...c, quartosMax: value }))}
                  />
                </div>
                <SheetFooter className="sticky bottom-0 border-t border-neutral-100 bg-white pb-safe">
                  <div className="flex gap-3">
                    {(pendingFilters.quartosMin || pendingFilters.quartosMax) && (
                      <button type="button" onClick={() => setPendingFilters((c) => ({ ...c, quartosMin: "", quartosMax: "" }))}
                        className="flex-1 rounded-xl border border-neutral-200 py-3 text-sm font-medium text-neutral-600">
                        Limpar
                      </button>
                    )}
                    <button type="button" onClick={() => { applyFilters(); setActiveChipSheet(null) }}
                      className="flex-[2] rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white">
                      Aplicar
                    </button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Sheet open={activeChipSheet === "price"} onOpenChange={(open) => !open && setActiveChipSheet(null)}>
              <SheetContent side="bottom" className="flex flex-col rounded-t-2xl">
                <SheetHeader><SheetTitle>Faixa de preço</SheetTitle></SheetHeader>
                <div className="px-4 pb-4">
                  <PriceFilter
                    value={pendingFilters.priceRange}
                    bounds={effectivePriceBounds}
                    onChange={(value) => setPendingFilters((c) => ({ ...c, priceRange: value }))}
                  />
                </div>
                <SheetFooter className="sticky bottom-0 border-t border-neutral-100 bg-white pb-safe">
                  <div className="flex gap-3">
                    {(minPrice > effectivePriceBounds.min || maxPrice < effectivePriceBounds.max) && (
                      <button type="button" onClick={() => setPendingFilters((c) => ({ ...c, priceRange: [effectivePriceBounds.min, effectivePriceBounds.max] }))}
                        className="flex-1 rounded-xl border border-neutral-200 py-3 text-sm font-medium text-neutral-600">
                        Limpar
                      </button>
                    )}
                    <button type="button" onClick={() => { applyFilters(); setActiveChipSheet(null) }}
                      className="flex-[2] rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white">
                      Aplicar
                    </button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        )}

        {/* ── Desktop: Full search bar (also mobile for home context) ── */}
        <div className={cn(!isHome && "hidden md:block")}>

        {/* Comprar / Alugar / Lançamentos toggle — aparece acima da search bar
            tanto no home (hero escuro, pill branca sobre bg dark) quanto em
            /busca (fundo claro, pill branca sobre bg slate). */}
        <div className="mb-4 flex justify-center">
          <div className={cn(
            "inline-flex rounded-full p-1",
            isHome
              ? "bg-black/30 backdrop-blur-sm"
              : "bg-slate-100 ring-1 ring-slate-200"
          )}>
            {(["comprar", "alugar", "lancamentos"] as const).map((tab) => {
              const isActive = heroTab === tab
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleHeroTab(tab)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all sm:px-6 sm:text-sm",
                    isActive
                      ? "bg-white text-neutral-900 shadow-sm"
                      : isHome
                        ? "text-white/80 hover:text-white"
                        : "text-neutral-600 hover:text-neutral-900"
                  )}
                >
                  {tab === "comprar" ? "Comprar" : tab === "alugar" ? "Alugar" : "Lançamentos"}
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative">
          <div
            className={cn(
              "mx-auto origin-center transition-all duration-500 ease-out",
              searchMode === "filters"
                ? "max-w-full opacity-100"
                : "pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-[60%] opacity-0"
            )}
          >
            <div className={cn(
              "w-full max-w-full rounded-3xl p-4 md:rounded-full md:p-0",
              isHome
                ? "bg-white border border-neutral-200 shadow-sm md:shadow-[0_20px_52px_-18px_rgba(15,23,42,0.55),0_8px_20px_-12px_rgba(15,23,42,0.42)] md:ring-1 md:ring-white/60"
                // Frosted glass on search page — lets the gradient show through
                // instead of a solid white rectangle cutting the bg
                : "bg-white/70 backdrop-blur-xl border border-slate-200/80 ring-1 ring-slate-900/[0.04] shadow-[0_4px_16px_-4px_rgba(15,23,42,0.08),0_12px_40px_-12px_rgba(15,23,42,0.12)] transition-shadow hover:shadow-[0_8px_28px_-4px_rgba(15,23,42,0.14),0_20px_48px_-12px_rgba(15,23,42,0.18)]"
            )}>
              <div className={cn(
                "flex flex-col md:items-center md:gap-0",
                isHome
                  ? "md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,0.8fr)_minmax(0,1fr)_auto]"
                  : "md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_auto]"
              )}>

                {/* 1. Cidade */}
                <div className="border-b border-neutral-200 md:border-b-0">
                  <Popover>
                    <PopoverTrigger
                      render={
                        <SegmentTrigger
                          context={context}
                          icon={MapPin}
                          title="Cidade"
                          value={cityLabel}
                          active={pendingFilters.cidades.length > 0}
                          onClear={() =>
                            setPendingFilters((c) => ({ ...c, cidades: [] }))
                          }
                          withDivider
                        />
                      }
                    />
                    <PopoverContent className="w-[calc(100vw-2rem)] max-w-md p-4 md:w-[420px]">
                      <CountedMultiSelect
                        options={facetedCidadeOptions}
                        selectedValues={pendingFilters.cidades}
                        onChange={(values) =>
                          setPendingFilters((current) => ({ ...current, cidades: values }))
                        }
                        searchPlaceholder="Buscar cidade..."
                        emptyText="Nenhuma cidade disponivel."
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 2. Bairro */}
                <div className="border-b border-neutral-200 md:border-b-0">
                  <Popover>
                    <PopoverTrigger
                      render={
                        <SegmentTrigger
                          context={context}
                          icon={MapPin}
                          title="Bairro"
                          value={bairroLabel}
                          active={pendingFilters.bairros.length > 0}
                          onClear={() =>
                            setPendingFilters((c) => ({ ...c, bairros: [] }))
                          }
                          withDivider
                        />
                      }
                    />
                    <PopoverContent className="w-[calc(100vw-2rem)] max-w-md p-4 md:w-[420px]">
                      <CountedMultiSelect
                        options={facetedBairroOptions.map((opt) => ({
                          value: opt.value,
                          label: opt.label,
                          count: opt.count,
                          description: opt.cidade,
                        }))}
                        selectedValues={pendingFilters.bairros}
                        onChange={(values) =>
                          setPendingFilters((current) => ({ ...current, bairros: values }))
                        }
                        searchPlaceholder="Buscar bairro..."
                        emptyText="Nenhum bairro disponivel."
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 3. Tipo */}
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

                {/* 4. Quartos */}
                <div className="border-b border-neutral-200 md:border-b-0">
                  <Popover>
                    <PopoverTrigger
                      render={
                        <SegmentTrigger
                          context={context}
                          icon={BedDouble}
                          title="Quartos"
                          value={quartosLabel}
                          active={Boolean(pendingFilters.quartosMin || pendingFilters.quartosMax)}
                          onClear={() =>
                            setPendingFilters((c) => ({ ...c, quartosMin: "", quartosMax: "" }))
                          }
                          withDivider
                        />
                      }
                    />
                    <PopoverContent className="w-[calc(100vw-2rem)] max-w-xs p-3 md:w-80 md:p-4">
                      <BedroomsFilter
                        options={quartosOptions}
                        minValue={pendingFilters.quartosMin}
                        maxValue={pendingFilters.quartosMax}
                        onMinChange={(value) =>
                          setPendingFilters((current) => ({ ...current, quartosMin: value }))
                        }
                        onMaxChange={(value) =>
                          setPendingFilters((current) => ({ ...current, quartosMax: value }))
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
                          active={minPrice > effectivePriceBounds.min || maxPrice < effectivePriceBounds.max}
                          onClear={() =>
                            setPendingFilters((c) => ({
                              ...c,
                              priceRange: [effectivePriceBounds.min, effectivePriceBounds.max],
                            }))
                          }
                        />
                      }
                    />
                    <PopoverContent className="w-[calc(100vw-2rem)] max-w-md p-3 md:w-96 md:p-4">
                      <PriceFilter
                        value={pendingFilters.priceRange}
                        bounds={effectivePriceBounds}
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

        <div className={cn(
          "mt-2 flex items-center gap-4",
          isHome ? "justify-center" : "justify-end"
        )}>
          <button
            type="button"
            onClick={() =>
              setSearchMode((current) => (current === "filters" ? "code" : "filters"))
            }
            className={cn(
              "inline-flex items-center gap-1.5 text-sm transition-colors cursor-pointer",
              isHome
                ? secondaryControlsClass
                : "text-slate-500 hover:text-brand-primary"
            )}
          >
            <Search className="size-3.5" />
            {modeToggleLabel}
          </button>

          {isHome && hasAnyFilter && searchMode === "filters" && (
            <>
              <span className={secondarySeparatorClass}>|</span>
              <button
                type="button"
                onClick={clearAllFilters}
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm transition-colors",
                  secondaryControlsClass
                )}
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

    {/* Cidade — full-screen overlay (paridade com desktop popover "Cidade") */}
    {activeChipSheet === "cidade" && (
      <div className="fixed inset-0 z-[9999] flex flex-col bg-white md:hidden">
        <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
          <h2 className="text-lg font-semibold text-neutral-900">Cidade</h2>
          <button type="button" onClick={() => setActiveChipSheet(null)}
            aria-label="Fechar"
            className="flex size-9 items-center justify-center rounded-full hover:bg-neutral-100">
            <X className="size-5 text-neutral-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <CityFilter
            cidades={cidadeOptions}
            selectedCidades={pendingFilters.cidades}
            onCidadesChange={(values) => setPendingFilters((c) => ({ ...c, cidades: values }))}
          />
        </div>
        <div className="sticky bottom-0 border-t border-neutral-100 bg-white px-4 py-3 pb-safe">
          <div className="flex gap-3">
            {pendingFilters.cidades.length > 0 && (
              <button type="button" onClick={() => setPendingFilters((c) => ({ ...c, cidades: [] }))}
                className="flex-1 rounded-xl border border-neutral-200 py-3 text-sm font-medium text-neutral-600">
                Limpar
              </button>
            )}
            <button type="button" onClick={() => { applyFilters(); setActiveChipSheet(null) }}
              className="flex-[2] rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white">
              Aplicar
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Bairro — full-screen overlay (paridade com desktop popover "Bairro").
        Bairros sao filtrados pelas cidades selecionadas (se houver). */}
    {activeChipSheet === "bairro" && (
      <div className="fixed inset-0 z-[9999] flex flex-col bg-white md:hidden">
        <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
          <h2 className="text-lg font-semibold text-neutral-900">Bairro</h2>
          <button type="button" onClick={() => setActiveChipSheet(null)}
            aria-label="Fechar"
            className="flex size-9 items-center justify-center rounded-full hover:bg-neutral-100">
            <X className="size-5 text-neutral-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <BairroFilter
            bairros={bairroOptions}
            groupedBairros={groupedBairroOptions}
            selectedBairros={pendingFilters.bairros}
            selectedCidades={pendingFilters.cidades}
            onBairrosChange={(values) => setPendingFilters((c) => ({ ...c, bairros: values }))}
          />
        </div>
        <div className="sticky bottom-0 border-t border-neutral-100 bg-white px-4 py-3 pb-safe">
          <div className="flex gap-3">
            {pendingFilters.bairros.length > 0 && (
              <button type="button" onClick={() => setPendingFilters((c) => ({ ...c, bairros: [] }))}
                className="flex-1 rounded-xl border border-neutral-200 py-3 text-sm font-medium text-neutral-600">
                Limpar
              </button>
            )}
            <button type="button" onClick={() => { applyFilters(); setActiveChipSheet(null) }}
              className="flex-[2] rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white">
              Aplicar
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Type — bottom sheet (no text input, no keyboard) */}
    <Sheet open={activeChipSheet === "type"} onOpenChange={(open) => !open && setActiveChipSheet(null)}>
      <SheetContent side="bottom" className="flex max-h-[70dvh] flex-col rounded-t-2xl">
        <SheetHeader><SheetTitle>Tipo de imóvel</SheetTitle></SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <TypeFilter
            typeOptions={filteredTipoOptions}
            selectedTipos={pendingFilters.tipos}
            onTiposChange={(values) => setPendingFilters((c) => ({ ...c, tipos: values }))}
          />
        </div>
        <SheetFooter className="sticky bottom-0 border-t border-neutral-100 bg-white pb-safe">
          <div className="flex gap-3">
            {pendingFilters.tipos.length > 0 && (
              <button type="button" onClick={() => setPendingFilters((c) => ({ ...c, tipos: [] }))}
                className="flex-1 rounded-xl border border-neutral-200 py-3 text-sm font-medium text-neutral-600">
                Limpar
              </button>
            )}
            <button type="button" onClick={() => { applyFilters(); setActiveChipSheet(null) }}
              className="flex-[2] rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white">
              Aplicar
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>

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
      empreendimentos={empreendimentos}
      caracteristicas={caracteristicas}
      onApply={applyFilters}
      onClear={clearAllFilters}
    />
    </>
  )
}
