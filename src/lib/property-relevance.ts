import type { Property } from "@/types/property"
import { SCORING_WEIGHTS as W } from "@/lib/constants"

/**
 * Score composto para ordenação "Mais relevantes" na busca.
 *
 * Sinais combinados (pesos calibrados para site imobiliário local):
 *
 * 1. DESTAQUE (CRM Loft)           — 0-150 pts  → Bruno marca no CRM o que deve bombar
 * 2. QUALIDADE DO CADASTRO         — 0-50  pts  → fotos, descrição, coordenadas, campos completos
 * 3. RECÊNCIA                      — 0-30  pts  → dataAtualizacao/dataCadastro
 *
 * Total máximo: ~230 pts. Diferenciais marcados pelo corretor sempre ganham do tempo.
 *
 * Pesos editáveis em src/lib/constants.ts → SCORING_WEIGHTS.
 *
 * NÃO personaliza por usuário (site local, dataset pequeno, não justifica ML).
 * Match de busca por keyword fica pra Fase 2 quando houver campo de busca textual.
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

  // Recência usa dataAtualizacao se disponível, senão dataCadastro.
  // > 90 dias: 0 pts (não prejudica, só não impulsiona).
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
 * Ordena uma lista de imóveis por relevância (desc) com recência como desempate.
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
