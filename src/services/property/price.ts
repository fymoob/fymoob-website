import type { Property } from "@/types/property"

/**
 * Logica de exibicao de preco — Fase 20.W3.3 movido de /lib pra /services.
 *
 * Por que aqui: regras de preco sao logica de DOMINIO imobiliario (CRM Loft
 * vs UI), nao utility generica. /services agrupa logicas que conhecem
 * detalhes do CRM (loft.ts, articles.ts, taxonomy.ts).
 *
 * Compat: src/lib/property-price.ts re-exporta tudo daqui.
 */

export type PriceContext = "venda" | "locacao" | null

export interface PriceDisplay {
  /** Preco primario (o destacado) */
  price: number | null
  /** Preco secundario (quando imovel eh dual: mostra o outro preco embaixo) */
  secondaryPrice: number | null
  /** Se o preco primario eh aluguel (adiciona "/mes", muda label) */
  isRental: boolean
  /** Se o imovel tem ambos precos (venda + aluguel) */
  isDual: boolean
  /**
   * Label da pill de finalidade pra exibir na UI.
   * Se isDual=true, eh "Venda e Locação" independente do Status CRM.
   */
  pillLabel: "Venda" | "Aluguel" | "Venda e Locação" | null
}

export interface PriceInput {
  precoVenda: number | null
  precoAluguel: number | null
  finalidade: Property["finalidade"]
}

/**
 * Centraliza logica de exibicao de preco de imovel.
 *
 * Por que existir: dados do CRM Loft/Vista nem sempre sao consistentes.
 * Alguns imoveis tem Status="Aluguel" mas ValorVenda preenchido tambem
 * (ex: codigo 69804378). A finalidade normalizada em loft.ts ja resolve,
 * mas ainda precisamos exibir corretamente quando dual.
 *
 * Regras:
 * 1. Dual so quando finalidade="Venda e Locacao" E ambos precos > 0
 * 2. Finalidade="Locacao" → aluguel primario
 * 3. Finalidade="Venda" → venda primario
 * 4. Finalidade="Venda e Locacao" → priceContext decide
 */
export function getPriceDisplayFromFields(
  input: PriceInput,
  priceContext: PriceContext = null
): PriceDisplay {
  const venda = input.precoVenda && input.precoVenda > 0 ? input.precoVenda : null
  const aluguel = input.precoAluguel && input.precoAluguel > 0 ? input.precoAluguel : null
  const hasBothPrices = !!venda && !!aluguel

  // Parse defensivo: aceita variacoes de encoding (ex: "LocaÃ§Ã£o").
  const finalidadeRaw = `${input.finalidade ?? ""}`.toLowerCase()
  const hasVenda = finalidadeRaw.includes("venda")
  const hasLocacao = finalidadeRaw.includes("loca") || finalidadeRaw.includes("alugu")
  const isFinalidadeVenda = hasVenda && !hasLocacao
  const isFinalidadeLocacao = hasLocacao && !hasVenda
  const isFinalidadeDual = hasVenda && hasLocacao

  const isDual = isFinalidadeDual && hasBothPrices

  let primaryIsRental: boolean
  if (isFinalidadeLocacao) {
    primaryIsRental = true
  } else if (isFinalidadeVenda) {
    primaryIsRental = false
  } else if (isFinalidadeDual) {
    primaryIsRental = priceContext === "locacao"
  } else {
    primaryIsRental = !venda && !!aluguel
  }

  const price = primaryIsRental ? aluguel ?? venda : venda ?? aluguel
  const secondaryPrice = isDual ? (primaryIsRental ? venda : aluguel) : null

  let pillLabel: PriceDisplay["pillLabel"] = null
  if (isDual) {
    pillLabel = "Venda e Locação"
  } else if (isFinalidadeVenda) {
    pillLabel = "Venda"
  } else if (isFinalidadeLocacao || isFinalidadeDual) {
    pillLabel = "Aluguel"
  } else if (aluguel) {
    pillLabel = "Aluguel"
  } else if (venda) {
    pillLabel = "Venda"
  }

  return { price, secondaryPrice, isRental: primaryIsRental, isDual, pillLabel }
}

/** Wrapper pra Property completo */
export function getPropertyPriceDisplay(
  property: Property,
  priceContext: PriceContext = null
): PriceDisplay {
  return getPriceDisplayFromFields(
    {
      precoVenda: property.precoVenda,
      precoAluguel: property.precoAluguel,
      finalidade: property.finalidade,
    },
    priceContext
  )
}
