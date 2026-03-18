"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  BedDouble,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  Tag,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { cn } from "@/lib/utils"

interface FilterBarProps {
  bairros: string[]
  cidades: string[]
  tipos: string[]
  priceBounds: {
    min: number
    max: number
  }
}

const PRICE_STEP = 50_000
const SEARCH_DEBOUNCE_MS = 300

function parseNumber(value: string | null): number | null {
  if (!value) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  })
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

  return formatCurrency(value)
}

function normalizeRange(
  values: readonly number[],
  bounds: { min: number; max: number }
): [number, number] {
  const first = values[0] ?? bounds.min
  const second = values[1] ?? bounds.max
  const min = Math.max(bounds.min, Math.min(first, second))
  const max = Math.min(bounds.max, Math.max(first, second))
  return [min, max]
}

function buildPillClassName(active: boolean): string {
  return cn(
    "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium tracking-tight transition-colors",
    active
      ? "border-brand-primary/40 bg-brand-primary-light text-neutral-900"
      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:text-neutral-950"
  )
}

const ORDER_OPTIONS = [
  { value: "recente", label: "Mais recentes" },
  { value: "preco-asc", label: "Menor preco" },
  { value: "preco-desc", label: "Maior preco" },
  { value: "area-desc", label: "Maior area" },
] as const

export function FilterBar({
  bairros,
  cidades,
  tipos,
  priceBounds,
}: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const paramsString = searchParams.toString()

  const cidade = searchParams.get("cidade") ?? ""
  const bairro = searchParams.get("bairro") ?? ""
  const tipo = searchParams.get("tipo") ?? ""
  const quartos =
    searchParams.get("quartos") ?? searchParams.get("dormitoriosMin") ?? ""
  const finalidade = searchParams.get("finalidade") ?? ""
  const orderBy = searchParams.get("orderBy") ?? ""
  const buscaParam = searchParams.get("busca") ?? ""

  const selectedMinPrice =
    parseNumber(searchParams.get("precoMin")) ?? priceBounds.min
  const selectedMaxPrice =
    parseNumber(searchParams.get("precoMax")) ?? priceBounds.max

  const [searchText, setSearchText] = useState(buscaParam)
  const [priceRange, setPriceRange] = useState<[number, number]>(() => [
    selectedMinPrice,
    selectedMaxPrice,
  ])
  const debouncedSearchText = useDebouncedValue(searchText, SEARCH_DEBOUNCE_MS)

  useEffect(() => {
    setSearchText(buscaParam)
  }, [buscaParam])

  useEffect(() => {
    setPriceRange([selectedMinPrice, selectedMaxPrice])
  }, [selectedMaxPrice, selectedMinPrice])

  const updateParams = useCallback(
    (
      updates: Record<string, string | number | null | undefined>,
      options?: { replace?: boolean }
    ) => {
      const params = new URLSearchParams(paramsString)

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === undefined || value === "") {
          params.delete(key)
        } else {
          params.set(key, String(value))
        }
      }

      if ("quartos" in updates) {
        params.delete("dormitoriosMin")
      }

      params.delete("page")
      const query = params.toString()
      const href = query ? `${pathname}?${query}` : pathname

      if (options?.replace) {
        router.replace(href, { scroll: false })
        return
      }

      router.push(href, { scroll: false })
    },
    [paramsString, pathname, router]
  )

  useEffect(() => {
    if (debouncedSearchText === buscaParam) return
    updateParams({ busca: debouncedSearchText.trim() || null }, { replace: true })
  }, [buscaParam, debouncedSearchText, updateParams])

  const hasActiveFilters = useMemo(() => {
    const keys = [
      "cidade",
      "bairro",
      "quartos",
      "dormitoriosMin",
      "precoMin",
      "precoMax",
      "tipo",
      "finalidade",
      "orderBy",
      "busca",
    ]
    return keys.some((key) => searchParams.has(key))
  }, [searchParams])

  const locationLabel = bairro || cidade || "Localizacao"
  const priceLabel =
    selectedMinPrice > priceBounds.min || selectedMaxPrice < priceBounds.max
      ? `${formatCompactCurrency(selectedMinPrice)} - ${formatCompactCurrency(selectedMaxPrice)}`
      : "Preco"
  const quartosLabel = quartos ? `${quartos}+ quartos` : "Quartos"
  const typeLabel = tipo || "Tipo"
  const sortLabel =
    ORDER_OPTIONS.find((option) => option.value === orderBy)?.label || "Ordenar"

  const onPriceCommitted = (value: readonly number[]) => {
    const [min, max] = normalizeRange(value, priceBounds)
    updateParams({
      precoMin: min > priceBounds.min ? min : null,
      precoMax: max < priceBounds.max ? max : null,
    })
  }

  return (
    <aside className="sticky top-16 z-40 -mx-4 border-y border-neutral-200/70 bg-white/80 py-3 backdrop-blur-xl sm:-mx-6 lg:-mx-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400" />
          <Input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Busque por bairro, tipo ou codigo"
            className="h-11 rounded-full border-neutral-300 bg-white pl-11 pr-4 text-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Popover>
            <PopoverTrigger className={buildPillClassName(Boolean(cidade || bairro))}>
              <MapPin className="size-4" />
              {locationLabel}
              <ChevronDown className="size-4 text-neutral-400" />
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-4">
              <div className="space-y-2">
                <label htmlFor="filter-cidade" className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Cidade
                </label>
                <select
                  id="filter-cidade"
                  value={cidade}
                  onChange={(event) => updateParams({ cidade: event.target.value || null })}
                  className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-brand-primary"
                >
                  <option value="">Todas</option>
                  {cidades.map((cidadeOption) => (
                    <option key={cidadeOption} value={cidadeOption}>
                      {cidadeOption}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="filter-bairro" className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Bairro
                </label>
                <select
                  id="filter-bairro"
                  value={bairro}
                  onChange={(event) => updateParams({ bairro: event.target.value || null })}
                  className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-brand-primary"
                >
                  <option value="">Todos</option>
                  {bairros.map((bairroOption) => (
                    <option key={bairroOption} value={bairroOption}>
                      {bairroOption}
                    </option>
                  ))}
                </select>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger
              className={buildPillClassName(
                selectedMinPrice > priceBounds.min || selectedMaxPrice < priceBounds.max
              )}
            >
              <Tag className="size-4" />
              {priceLabel}
              <ChevronDown className="size-4 text-neutral-400" />
            </PopoverTrigger>
            <PopoverContent className="w-96 space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold tracking-tight text-neutral-950">
                  Faixa de preco
                </p>
                <p className="text-xs text-neutral-500">
                  {formatCurrency(priceRange[0])} ate {formatCurrency(priceRange[1])}
                </p>
              </div>

              <Slider
                thumbCount={2}
                min={priceBounds.min}
                max={priceBounds.max}
                step={PRICE_STEP}
                minStepsBetweenValues={1}
                value={priceRange}
                onValueChange={(value) =>
                  setPriceRange(normalizeRange(value, priceBounds))
                }
                onValueCommitted={onPriceCommitted}
                aria-label="Faixa de preco"
              />

              <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
                <span>{formatCompactCurrency(priceBounds.min)}</span>
                <span>{formatCompactCurrency(priceBounds.max)}</span>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className={buildPillClassName(Boolean(quartos))}>
              <BedDouble className="size-4" />
              {quartosLabel}
              <ChevronDown className="size-4 text-neutral-400" />
            </PopoverTrigger>
            <PopoverContent className="w-72 space-y-3">
              <p className="text-sm font-semibold tracking-tight text-neutral-950">
                Quartos minimos
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((value) => {
                  const active = quartos === String(value)
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateParams({ quartos: value })}
                      className={cn(
                        "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "border-brand-primary bg-brand-primary-light text-neutral-950"
                          : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                      )}
                    >
                      {value}+
                    </button>
                  )
                })}
              </div>
              <Button
                variant="ghost"
                className="h-8 px-2 text-sm text-neutral-500 hover:text-neutral-900"
                onClick={() => updateParams({ quartos: null })}
              >
                Limpar quartos
              </Button>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className={buildPillClassName(Boolean(tipo || finalidade))}>
              <SlidersHorizontal className="size-4" />
              {typeLabel}
              <ChevronDown className="size-4 text-neutral-400" />
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-4">
              <div className="space-y-2">
                <label htmlFor="filter-tipo" className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Tipo
                </label>
                <select
                  id="filter-tipo"
                  value={tipo}
                  onChange={(event) => updateParams({ tipo: event.target.value || null })}
                  className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-brand-primary"
                >
                  <option value="">Todos</option>
                  {tipos.map((tipoOption) => (
                    <option key={tipoOption} value={tipoOption}>
                      {tipoOption}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="filter-finalidade" className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Finalidade
                </label>
                <select
                  id="filter-finalidade"
                  value={finalidade}
                  onChange={(event) =>
                    updateParams({ finalidade: event.target.value || null })
                  }
                  className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-brand-primary"
                >
                  <option value="">Todas</option>
                  <option value="Venda">Venda</option>
                  <option value={"Loca\u00e7\u00e3o"}>Locacao</option>
                  <option value={"Venda e Loca\u00e7\u00e3o"}>Venda e Locacao</option>
                </select>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className={buildPillClassName(Boolean(orderBy))}>
              {sortLabel}
              <ChevronDown className="size-4 text-neutral-400" />
            </PopoverTrigger>
            <PopoverContent className="w-72 space-y-2">
              {ORDER_OPTIONS.map((option) => {
                const selected = orderBy === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateParams({ orderBy: option.value })}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition-colors",
                      selected
                        ? "border-brand-primary bg-brand-primary-light text-neutral-950"
                        : "border-neutral-200 text-neutral-700 hover:border-neutral-300"
                    )}
                  >
                    <span>{option.label}</span>
                    {selected && <span className="text-xs font-semibold">Ativo</span>}
                  </button>
                )
              })}
              <Button
                variant="ghost"
                className="mt-1 h-8 px-2 text-sm text-neutral-500 hover:text-neutral-900"
                onClick={() => updateParams({ orderBy: null })}
              >
                Limpar ordenacao
              </Button>
            </PopoverContent>
          </Popover>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              className="h-10 rounded-full px-4 text-sm text-neutral-600 hover:text-neutral-950"
              onClick={() =>
                updateParams({
                  cidade: null,
                  bairro: null,
                  quartos: null,
                  precoMin: null,
                  precoMax: null,
                  tipo: null,
                  finalidade: null,
                  orderBy: null,
                  busca: null,
                })
              }
            >
              Limpar filtros
            </Button>
          )}
        </div>
      </div>
    </aside>
  )
}
