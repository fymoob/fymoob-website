import { slugify } from "@/lib/utils"
import type { MultiSelectOption } from "./types"

export interface PriceBounds {
  min: number
  max: number
}

export interface SearchDraftFilters {
  bairros: string[]
  cidades: string[]
  tipos: string[]
  finalidades: string[]
  quartosMin: string
  quartosMax: string
  priceRange: [number, number]
  codigo: string
  suitesMin: string
  banheirosMin: string
  vagasMin: string
  areaMin: string
  areaMax: string
  caracteristicasUnidade: string[]
  caracteristicasCondominio: string[]
  empreendimento: string
}

export const PRICE_STEP = 50_000

export const FINALIDADE_OPTIONS: MultiSelectOption[] = [
  { value: "venda", label: "Comprar" },
  { value: "locacao", label: "Alugar" },
  { value: "venda-e-locacao", label: "Venda e Aluguel" },
]

function parseNumber(value: string | null): number | null {
  if (!value) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function parseCsvParam(value: string | null): string[] {
  if (!value) return []
  return value
    .split(",")
    .map((item) => slugify(item.trim()))
    .filter(Boolean)
}

export function normalizeRange(
  values: readonly number[],
  bounds: PriceBounds
): [number, number] {
  const first = values[0] ?? bounds.min
  const second = values[1] ?? bounds.max
  const min = Math.max(bounds.min, Math.min(first, second))
  const max = Math.min(bounds.max, Math.max(first, second))
  return [min, max]
}

export function createDraftFromSearchParams(
  params: URLSearchParams,
  bounds: PriceBounds
): SearchDraftFilters {
  const minFromUrl = parseNumber(params.get("precoMin")) ?? bounds.min
  const maxFromUrl = parseNumber(params.get("precoMax")) ?? bounds.max

  return {
    bairros: parseCsvParam(params.get("bairro")),
    cidades: parseCsvParam(params.get("cidade")),
    tipos: parseCsvParam(params.get("tipo")),
    finalidades: parseCsvParam(params.get("finalidade")),
    quartosMin:
      params.get("quartosMin") ??
      params.get("quartos") ??
      params.get("dormitoriosMin") ??
      "",
    quartosMax: params.get("quartosMax") ?? "",
    priceRange: normalizeRange([minFromUrl, maxFromUrl], bounds),
    codigo: params.get("codigo") ?? "",
    suitesMin: params.get("suitesMin") ?? "",
    banheirosMin: params.get("banheirosMin") ?? "",
    vagasMin: params.get("vagasMin") ?? "",
    areaMin: params.get("areaMin") ?? "",
    areaMax: params.get("areaMax") ?? "",
    caracteristicasUnidade: (params.get("caracUnidade") ?? "")
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean),
    caracteristicasCondominio: (params.get("caracCondominio") ?? "")
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean),
    empreendimento: params.get("empreendimento") ?? "",
  }
}

export function applyDraftToSearchParams(
  params: URLSearchParams,
  draft: SearchDraftFilters,
  bounds: PriceBounds
): URLSearchParams {
  const setCsvParam = (key: string, values: string[]) => {
    const uniqueValues = Array.from(new Set(values.filter(Boolean)))
    if (uniqueValues.length === 0) {
      params.delete(key)
      return
    }
    params.set(key, uniqueValues.join(","))
  }

  setCsvParam("bairro", draft.bairros)
  setCsvParam("cidade", draft.cidades)
  setCsvParam("tipo", draft.tipos)
  setCsvParam("finalidade", draft.finalidades)

  if (draft.quartosMin) {
    params.set("quartosMin", draft.quartosMin)
  } else {
    params.delete("quartosMin")
  }
  if (draft.quartosMax) {
    params.set("quartosMax", draft.quartosMax)
  } else {
    params.delete("quartosMax")
  }
  // Legacy params — cleaned up in favor of quartosMin/quartosMax
  params.delete("quartos")
  params.delete("dormitoriosMin")

  const [minPrice, maxPrice] = draft.priceRange
  if (minPrice > bounds.min) {
    params.set("precoMin", String(minPrice))
  } else {
    params.delete("precoMin")
  }

  if (maxPrice < bounds.max) {
    params.set("precoMax", String(maxPrice))
  } else {
    params.delete("precoMax")
  }

  // Advanced filters
  if (draft.codigo) {
    params.set("codigo", draft.codigo)
  } else {
    params.delete("codigo")
  }

  if (draft.suitesMin) {
    params.set("suitesMin", draft.suitesMin)
  } else {
    params.delete("suitesMin")
  }

  if (draft.banheirosMin) {
    params.set("banheirosMin", draft.banheirosMin)
  } else {
    params.delete("banheirosMin")
  }

  if (draft.vagasMin) {
    params.set("vagasMin", draft.vagasMin)
  } else {
    params.delete("vagasMin")
  }

  if (draft.areaMin) {
    params.set("areaMin", draft.areaMin)
  } else {
    params.delete("areaMin")
  }

  if (draft.areaMax) {
    params.set("areaMax", draft.areaMax)
  } else {
    params.delete("areaMax")
  }

  if (draft.caracteristicasUnidade.length > 0) {
    params.set("caracUnidade", draft.caracteristicasUnidade.join(","))
  } else {
    params.delete("caracUnidade")
  }
  if (draft.caracteristicasCondominio.length > 0) {
    params.set("caracCondominio", draft.caracteristicasCondominio.join(","))
  } else {
    params.delete("caracCondominio")
  }
  // Legacy single-bucket param — cleaned up in favor of split params
  params.delete("caracteristicas")

  if (draft.empreendimento) {
    params.set("empreendimento", draft.empreendimento)
  } else {
    params.delete("empreendimento")
  }

  params.delete("page")
  return params
}
