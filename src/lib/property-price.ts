import type { Property } from "@/types/property"

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
   * Caso contrario usa Finalidade direto.
   */
  pillLabel: "Venda" | "Aluguel" | "Venda e Locação" | null
}

/**
 * Centraliza a logica de como exibir preco de um imovel.
 *
 * Por que existir: dados do CRM Loft/Vista nem sempre sao consistentes.
 * Alguns imoveis tem Status="Aluguel" mas ValorVenda preenchido tambem
 * (ex: codigo 69804378 — descricao menciona "INTERESSADOS NA COMPRA"
 * e "INTERESSADOS NA LOCACAO" mas Bruno so marcou Status=Aluguel).
 *
 * Regras:
 * 1. Dual so quando a finalidade normalizada e "Venda e Locacao" E ambos
 *    os precos existem (>0). Evita falso-dual por preco residual.
 * 2. Finalidade = "Locacao" -> aluguel eh primario, mesmo se venda existir
 * 3. Finalidade = "Venda" -> venda eh primario, mesmo se aluguel existir
 * 4. Finalidade = "Venda e Locacao" -> priceContext decide (busca por aluguel
 *    mostra aluguel primeiro; busca sem filtro mostra venda primeiro)
 * 5. Secundario sempre renderizado se isDual
 *
 * Uso:
 *   const { price, secondaryPrice, isRental, isDual } = getPropertyPriceDisplay(property)
 *   const { price } = getPropertyPriceDisplay(property, "locacao")  // filtro busca
 */
export interface PriceInput {
  precoVenda: number | null
  precoAluguel: number | null
  finalidade: Property["finalidade"]
}

/**
 * Versao que aceita campos avulsos. Usada em components que recebem os
 * precos como props separados (ex: ContactSidebar desktop).
 */
export function getPriceDisplayFromFields(
  input: PriceInput,
  priceContext: PriceContext = null
): PriceDisplay {
  const venda = input.precoVenda && input.precoVenda > 0 ? input.precoVenda : null
  const aluguel = input.precoAluguel && input.precoAluguel > 0 ? input.precoAluguel : null
  const hasBothPrices = !!venda && !!aluguel
  // Parse defensivo: aceita "Locação"/"Aluguel" e tambem variações com
  // encoding quebrado (ex: "LocaÃ§Ã£o") sem depender de igualdade exata.
  const finalidadeRaw = `${input.finalidade ?? ""}`.toLowerCase()
  const hasVenda = finalidadeRaw.includes("venda")
  const hasLocacao = finalidadeRaw.includes("loca") || finalidadeRaw.includes("alugu")
  const isFinalidadeVenda = hasVenda && !hasLocacao
  const isFinalidadeLocacao = hasLocacao && !hasVenda
  const isFinalidadeDual = hasVenda && hasLocacao

  // Fonte de verdade para dual deve ser a finalidade ja normalizada no mapper
  // (src/services/loft.ts). Isso evita falso-dual quando sobra ValorLocacao
  // residual em imovel explicitamente marcado como "Venda" no CRM.
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

  const price = primaryIsRental ? (aluguel ?? venda) : (venda ?? aluguel)
  const secondaryPrice = isDual ? (primaryIsRental ? venda : aluguel) : null

  // Pill label segue a finalidade normalizada. Exibimos "Venda e Locacao"
  // apenas quando a regra de negocio marcou o imovel como dual e ha ambos
  // os precos disponiveis.
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
