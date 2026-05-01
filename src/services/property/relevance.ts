import type { Property } from "@/types/property"
import { SCORING_WEIGHTS as W } from "@/lib/constants"

/**
 * Score composto para ordenacao "Mais relevantes" na busca.
 *
 * Fase 20.W3.3: movido de /lib pra /services/property/.
 * /lib/property-relevance.ts mantem re-export pra compat.
 *
 * Sinais combinados (pesos calibrados para site imobiliario local):
 *
 * 1. DESTAQUE (CRM Loft)           — 0-150 pts → Bruno marca no CRM o que deve bombar
 * 2. QUALIDADE DO CADASTRO         — 0-50  pts → fotos, descricao, geo, campos completos
 * 3. RECENCIA                      — 0-30  pts → dataAtualizacao/dataCadastro
 *
 * Total maximo: ~230 pts. Diferenciais marcados pelo corretor sempre ganham
 * do tempo. Pesos editaveis em src/lib/constants.ts → SCORING_WEIGHTS.
 *
 * NAO personaliza por usuario (site local, dataset pequeno, nao justifica ML).
 */
export function scoreProperty(property: Property, now: Date = new Date()): number {
  let score = 0

  if (property.superDestaqueWeb) score += W.SUPER_DESTAQUE
  if (property.destaqueWeb) score += W.DESTAQUE

  const photoCount = Array.isArray(property.fotos) ? property.fotos.length : 0
  score += Math.min(W.MAX_PHOTO_SCORE, photoCount * W.PHOTO_PER_UNIT)

  if (property.descricao && property.descricao.length > W.DESCRIPTION_MIN_CHARS) {
    score += W.RICH_DESCRIPTION
  }

  if (property.latitude && property.longitude) score += W.HAS_GEO

  if (property.areaPrivativa && property.dormitorios && property.banheiros) {
    score += W.COMPLETE_FIELDS
  }

  // Recencia usa dataAtualizacao se disponivel, senao dataCadastro.
  // > 90 dias: 0 pts (nao prejudica, so nao impulsiona).
  const dateStr = property.dataAtualizacao ?? property.dataCadastro
  if (dateStr) {
    const date = new Date(dateStr)
    const daysDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    if (daysDiff < 7) score += W.RECENT_7D
    else if (daysDiff < 30) score += W.RECENT_30D
    else if (daysDiff < 90) score += W.RECENT_90D
  }

  return score
}

/**
 * Ordena lista de imoveis por relevancia (desc) com recencia como desempate.
 */
export function sortByRelevance(properties: Property[]): Property[] {
  const now = new Date()
  return [...properties].sort((a, b) => {
    const scoreA = scoreProperty(a, now)
    const scoreB = scoreProperty(b, now)
    if (scoreB !== scoreA) return scoreB - scoreA

    const dateA = a.dataAtualizacao ?? a.dataCadastro
    const dateB = b.dataAtualizacao ?? b.dataCadastro
    if (!dateA && !dateB) return 0
    if (!dateA) return 1
    if (!dateB) return -1
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })
}
