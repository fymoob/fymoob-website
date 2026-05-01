/**
 * @deprecated — Fase 20.W3.3: codigo movido pra `@/services/property/price`.
 * Este arquivo eh um re-export pra manter compat com imports antigos.
 * Migrar callers gradualmente, depois remover este arquivo.
 */
export {
  getPriceDisplayFromFields,
  getPropertyPriceDisplay,
  type PriceContext,
  type PriceDisplay,
  type PriceInput,
} from "@/services/property/price"
