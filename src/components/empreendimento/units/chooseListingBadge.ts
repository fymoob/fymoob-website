import type { Property } from "@/types/property"

export type ListingBadge = "launch" | "typology" | null

/**
 * Sprint design 06/05/2026 — D1.
 *
 * Decide qual badge faz sentido mostrar quando renderizamos um conjunto
 * de imoveis num bloco editorial (UnitFeaturedCard + UnitsTable). Regra:
 * **badge so vale quando diferencia.**
 *
 * Cenarios:
 * - Todos os imoveis com `lancamento=true` (caso Reserva Barigui hoje):
 *   o badge "LANCAMENTO" e redundante. Trocamos pela tipologia (Studio,
 *   Cobertura, Garden, Loja, etc) que diferencia as unidades entre si.
 * - Mix entre lancamento e pronto: badge LANCAMENTO faz sentido — sinaliza
 *   ao comprador qual unidade ainda esta em obra vs pronta pra entregar.
 * - Tudo igual e tipo unico: nao mostrar badge.
 *
 * Retornos:
 * - "launch":   mostrar "LANCAMENTO" so nos imoveis em lancamento
 * - "typology": mostrar tipo do imovel como badge em todos
 * - null:       nao mostrar badge (nada diferencia)
 */
export function chooseListingBadge(properties: Property[]): ListingBadge {
  if (properties.length === 0) return null

  const launchCount = properties.filter((p) => p.lancamento).length
  const isAllLaunch = launchCount === properties.length
  const isNoneLaunch = launchCount === 0

  // Mix: badge LANCAMENTO diferencia
  if (!isAllLaunch && !isNoneLaunch) return "launch"

  // Variedade de tipos: badge tipologia diferencia
  const uniqueTypes = new Set(properties.map((p) => p.tipo))
  if (uniqueTypes.size > 1) return "typology"

  // Tudo igual em tudo: omitir badge
  return null
}

/**
 * Helper auxiliar — retorna o texto curto do badge pra renderizar.
 * Para 'typology', extrai do property atual. Para 'launch', so mostra
 * quando o property em si e lancamento (filtrar antes).
 */
export function getBadgeLabel(
  badge: ListingBadge,
  property: Property,
): string | null {
  if (badge === "launch") {
    return property.lancamento ? "Lançamento" : null
  }
  if (badge === "typology") {
    return property.tipo || null
  }
  return null
}
