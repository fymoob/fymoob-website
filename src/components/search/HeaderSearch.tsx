"use client"

import { useCallback, useEffect, useMemo, useState, type ComponentType } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, MapPin, Search, Tag, BedDouble, Building2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface HeaderSearchProps {
  bairros: string[]
  cidades: string[]
  tipos: string[]
  priceBounds: {
    min: number
    max: number
  }
}

const PRICE_STEP = 50_000

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

function SegmentTrigger({
  label,
  value,
  active,
  withDivider = false,
  icon: Icon,
}: {
  label: string
  value: string
  active?: boolean
  withDivider?: boolean
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <PopoverTrigger
      className={cn(
        "flex h-14 w-full min-w-0 items-center gap-2 px-5 text-left transition-colors",
        withDivider && "border-r border-neutral-200",
        active ? "text-[#0B1120]" : "text-neutral-600 hover:text-[#0B1120]"
      )}
    >
      <Icon className="size-4 shrink-0 text-neutral-400" />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
          {label}
        </p>
        <p className="truncate text-sm font-medium tracking-tight">{value}</p>
      </div>
      <ChevronDown className="ml-auto size-4 shrink-0 text-neutral-400" />
    </PopoverTrigger>
  )
}

export function HeaderSearch({
  bairros,
  cidades,
  tipos,
  priceBounds,
}: HeaderSearchProps) {
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

  const selectedMinPrice =
    parseNumber(searchParams.get("precoMin")) ?? priceBounds.min
  const selectedMaxPrice =
    parseNumber(searchParams.get("precoMax")) ?? priceBounds.max

  const [priceRange, setPriceRange] = useState<[number, number]>(() => [
    selectedMinPrice,
    selectedMaxPrice,
  ])

  useEffect(() => {
    setPriceRange([selectedMinPrice, selectedMaxPrice])
  }, [selectedMaxPrice, selectedMinPrice])

  const updateParams = useCallback(
    (updates: Record<string, string | number | null | undefined>) => {
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
      router.push(href, { scroll: false })
    },
    [paramsString, pathname, router]
  )

  const onSearchClick = () => {
    const query = new URLSearchParams(paramsString).toString()
    const href = query ? `${pathname}?${query}` : pathname
    router.push(href, { scroll: false })
  }

  const onPriceCommitted = (value: readonly number[]) => {
    const [min, max] = normalizeRange(value, priceBounds)
    updateParams({
      precoMin: min > priceBounds.min ? min : null,
      precoMax: max < priceBounds.max ? max : null,
    })
  }

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
    ]
    return keys.some((key) => searchParams.has(key))
  }, [searchParams])

  const locationLabel = bairro || cidade || "Qualquer lugar"
  const priceLabel =
    selectedMinPrice > priceBounds.min || selectedMaxPrice < priceBounds.max
      ? `${formatCompactCurrency(selectedMinPrice)} - ${formatCompactCurrency(selectedMaxPrice)}`
      : "Qualquer preco"
  const quartosLabel = quartos ? `${quartos}+ quartos` : "Qualquer quarto"
  const typeLabel = tipo || "Todos os tipos"

  return (
    <aside className="sticky top-4 z-50 -mx-4 bg-white/40 py-2 backdrop-blur-sm sm:-mx-6 lg:-mx-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto pb-1">
          <div className="min-w-[780px] rounded-full border border-neutral-200 bg-white shadow-md">
            <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center">
              <Popover>
                <SegmentTrigger
                  icon={MapPin}
                  label="Localizacao"
                  value={locationLabel}
                  active={Boolean(cidade || bairro)}
                  withDivider
                />
                <PopoverContent className="w-80 space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="header-search-cidade"
                      className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
                    >
                      Cidade
                    </label>
                    <select
                      id="header-search-cidade"
                      value={cidade}
                      onChange={(event) =>
                        updateParams({ cidade: event.target.value || null })
                      }
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
                    <label
                      htmlFor="header-search-bairro"
                      className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
                    >
                      Bairro
                    </label>
                    <select
                      id="header-search-bairro"
                      value={bairro}
                      onChange={(event) =>
                        updateParams({ bairro: event.target.value || null })
                      }
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
                <SegmentTrigger
                  icon={Tag}
                  label="Preco"
                  value={priceLabel}
                  active={
                    selectedMinPrice > priceBounds.min ||
                    selectedMaxPrice < priceBounds.max
                  }
                  withDivider
                />
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
                <SegmentTrigger
                  icon={BedDouble}
                  label="Quartos"
                  value={quartosLabel}
                  active={Boolean(quartos)}
                  withDivider
                />
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
                <SegmentTrigger
                  icon={Building2}
                  label="Tipo"
                  value={typeLabel}
                  active={Boolean(tipo || finalidade)}
                />
                <PopoverContent className="w-80 space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="header-search-tipo"
                      className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
                    >
                      Tipo
                    </label>
                    <select
                      id="header-search-tipo"
                      value={tipo}
                      onChange={(event) =>
                        updateParams({ tipo: event.target.value || null })
                      }
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
                    <label
                      htmlFor="header-search-finalidade"
                      className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
                    >
                      Finalidade
                    </label>
                    <select
                      id="header-search-finalidade"
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

              <div className="pr-2">
                <button
                  type="button"
                  onClick={onSearchClick}
                  className="inline-flex size-10 items-center justify-center rounded-full bg-brand-primary text-white transition-transform duration-200 hover:scale-105 hover:bg-brand-primary-hover"
                  aria-label="Aplicar busca"
                >
                  <Search className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-2 flex justify-end">
            <Button
              variant="ghost"
              className="h-8 rounded-full px-3 text-xs text-neutral-500 hover:text-neutral-900"
              onClick={() =>
                updateParams({
                  cidade: null,
                  bairro: null,
                  quartos: null,
                  precoMin: null,
                  precoMax: null,
                  tipo: null,
                  finalidade: null,
                })
              }
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}
