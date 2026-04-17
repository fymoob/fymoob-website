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
 * 1. Dual (ambos precos > 0) = isDual true, independente de Finalidade
 *    (CRM pode ter Finalidade vazia mesmo sendo dual)
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
export function getPropertyPriceDisplay(
  property: Property,
  priceContext: PriceContext = null
): PriceDisplay {
  const venda = property.precoVenda && property.precoVenda > 0 ? property.precoVenda : null
  const aluguel = property.precoAluguel && property.precoAluguel > 0 ? property.precoAluguel : null
  const isDual = !!venda && !!aluguel

  // Decide se o primario eh aluguel baseado em finalidade + priceContext.
  // NAO confia em isDual derivado de finalidade='Venda e Locacao' sozinho
  // (CRM as vezes tem finalidade vazia mesmo com ambos precos).
  let primaryIsRental: boolean
  if (property.finalidade === "Locação") {
    primaryIsRental = true
  } else if (property.finalidade === "Venda") {
    primaryIsRental = false
  } else if (property.finalidade === "Venda e Locação") {
    primaryIsRental = priceContext === "locacao"
  } else {
    // Fallback: sem venda mas com aluguel -> rental
    primaryIsRental = !venda && !!aluguel
  }

  const price = primaryIsRental ? (aluguel ?? venda) : (venda ?? aluguel)
  const secondaryPrice = isDual ? (primaryIsRental ? venda : aluguel) : null

  return { price, secondaryPrice, isRental: primaryIsRental, isDual }
}
