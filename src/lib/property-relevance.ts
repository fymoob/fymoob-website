import type { Property } from "@/types/property"

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
 * NÃO personaliza por usuário (site local, dataset pequeno, não justifica ML).
 * Match de busca por keyword fica pra Fase 2 quando houver campo de busca textual.
 */
export function scoreProperty(p: Property, now: Date = new Date()): number {
  let score = 0

  // 1. Destaque (sinal mais forte — Bruno marca intencionalmente no CRM)
  if (p.superDestaqueWeb) score += 150
  if (p.destaqueWeb) score += 100

  // 2. Qualidade do cadastro (máx 50 pts)
  // 2a. Fotos: até 15 pts (5+ fotos = cheio)
  const photoCount = Array.isArray(p.fotos) ? p.fotos.length : 0
  score += Math.min(15, photoCount * 3)

  // 2b. Descrição rica: +15 se tem mais de 200 chars
  if (p.descricao && p.descricao.length > 200) score += 15

  // 2c. Geolocalização: +10 (permite mostrar no mapa)
  if (p.latitude && p.longitude) score += 10

  // 2d. Campos completos: +10 (área + quartos + banheiros preenchidos)
  if (p.areaPrivativa && p.dormitorios && p.banheiros) score += 10

  // 3. Recência (máx 30 pts)
  // Usa dataAtualizacao se disponível, senão dataCadastro
  const dateStr = p.dataAtualizacao ?? p.dataCadastro
  if (dateStr) {
    const date = new Date(dateStr)
    const daysDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    if (daysDiff < 7) score += 30
    else if (daysDiff < 30) score += 20
    else if (daysDiff < 90) score += 10
    // > 90 dias: 0 pts (não prejudica, só não impulsiona)
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

    // Desempate: mais recente primeiro
    const dateA = a.dataAtualizacao ?? a.dataCadastro
    const dateB = b.dataAtualizacao ?? b.dataCadastro
    if (!dateA && !dateB) return 0
    if (!dateA) return 1
    if (!dateB) return -1
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })
}
