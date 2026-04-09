import type {
  Property,
  PropertyPageVariant,
  PropertyPageVariantOverride,
  PropertyType,
} from "@/types/property"

export const STANDARD_MAX_PRICE = 1_500_000
export const PREMIUM_MIN_PRICE = 3_000_000

export const PREMIUM_HINT_BAIRROS = [
  "Batel",
  "Bigorrilho",
  "Mercês",
  "Cabral",
  "Ecoville",
  "Mossunguê",
  "Seminário",
  "Juvevê",
] as const

const PREMIUM_HINT_CATEGORIES: PropertyType[] = [
  "Cobertura",
  "Casa em Condomínio",
  "Apartamento Duplex",
  "Casa",
]

export const PROPERTY_PAGE_VARIANT_OVERRIDES: Record<string, PropertyPageVariantOverride> = {}

export type PropertyPriceBucket =
  | "consult_price"
  | "lte_1_5m"
  | "1_5m_to_3m"
  | "gte_3m"
  | "rental_or_unknown"

function normalize(value: string | null | undefined): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
}

export function getPropertyVariantOverride(codigo: string): PropertyPageVariantOverride {
  return PROPERTY_PAGE_VARIANT_OVERRIDES[codigo] ?? "auto"
}

export function isConsultPriceProperty(property: Property): boolean {
  return property.valorSobConsulta
}

function getSaleReferencePrice(property: Property): number | null {
  if (property.precoVenda) return property.precoVenda
  if (property.finalidade === "Venda e Locação") return property.precoVenda
  return null
}

function countPremiumSignals(property: Property): number {
  let signals = 0

  const hasRichMedia =
    property.fotos.length >= 12 || property.temTourVirtual || Boolean(property.urlVideo)
  if (hasRichMedia) signals++

  if (PREMIUM_HINT_CATEGORIES.includes(property.tipo)) signals++

  const isPremiumBairro = PREMIUM_HINT_BAIRROS.some(
    (bairro) => normalize(bairro) === normalize(property.bairro)
  )
  if (isPremiumBairro) signals++

  return signals
}

export function resolvePropertyPageVariant(property: Property): PropertyPageVariant {
  const override = getPropertyVariantOverride(property.codigo)
  if (override === "standard" || override === "premium") return override

  if (isConsultPriceProperty(property) && property.finalidade !== "Locação") {
    return "premium"
  }

  const salePrice = getSaleReferencePrice(property)

  if (salePrice !== null && salePrice <= STANDARD_MAX_PRICE) return "standard"
  if (salePrice !== null && salePrice >= PREMIUM_MIN_PRICE) return "premium"
  if (salePrice === null) return "standard"

  return countPremiumSignals(property) >= 2 ? "premium" : "standard"
}

export function getPropertyPriceBucket(property: Property): PropertyPriceBucket {
  if (isConsultPriceProperty(property)) return "consult_price"

  const salePrice = getSaleReferencePrice(property)
  if (salePrice === null) return "rental_or_unknown"
  if (salePrice <= STANDARD_MAX_PRICE) return "lte_1_5m"
  if (salePrice >= PREMIUM_MIN_PRICE) return "gte_3m"
  return "1_5m_to_3m"
}
