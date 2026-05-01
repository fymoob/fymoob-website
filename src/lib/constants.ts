/**
 * Constantes compartilhadas — Fase 20.W1.1.
 *
 * Antes: SITE_URL hardcoded em 11+ arquivos. Mudanca de dominio = 11 edits
 * + risco de divergencia. Centralizado aqui.
 *
 * Magic numbers de scoring (property-relevance) e SEO meta agrupados
 * pra facilitar tuning sem buscar em multiplos arquivos (Fase 20.W1.10).
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com.br"

/**
 * Limite Google SERP pra meta description antes de truncar com "...".
 * Pesquisa: 130-160 chars otima (Backlinko 4M results study). Trunca-se
 * em 160 pra evitar elipses no SERP.
 */
export const MAX_META_DESCRIPTION_LENGTH = 160

/**
 * Pesos do score de relevancia em src/lib/property-relevance.ts.
 * Algoritmo: superDestaque > destaque > foto count > recencia > fotos OK.
 * Bruno pode ajustar aqui sem garimpar o algoritmo.
 */
export const SCORING_WEIGHTS = {
  /** SuperDestaqueWeb da Loft API — peso maximo */
  SUPER_DESTAQUE: 150,
  /** DestaqueWeb da Loft API — peso medio-alto */
  DESTAQUE: 100,
  /** Pontos por foto adicional (cada uma) */
  PHOTO_PER_UNIT: 3,
  /** Cap maximo do bonus de fotos pra evitar inflacao */
  MAX_PHOTO_SCORE: 15,
  /** Bonus por descricao com mais de DESCRIPTION_MIN_CHARS */
  RICH_DESCRIPTION: 15,
  /** Threshold de chars pra considerar descricao "rica" */
  DESCRIPTION_MIN_CHARS: 200,
  /** Bonus por ter coordenadas geo (lat/lng) */
  HAS_GEO: 10,
  /** Bonus por area + quartos + banheiros preenchidos */
  COMPLETE_FIELDS: 10,
  /** Bonus por imovel cadastrado nos ultimos 7 dias */
  RECENT_7D: 30,
  /** Bonus por imovel cadastrado nos ultimos 30 dias */
  RECENT_30D: 20,
  /** Bonus por imovel cadastrado nos ultimos 90 dias */
  RECENT_90D: 10,
} as const
