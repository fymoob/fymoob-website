import type { Property } from "@/types/property"

/**
 * Strips a full Property object down to only the fields needed by PropertyCard
 * and its variants (PropertyCardGrid, PropertyCardCompact, PropertyCardList).
 *
 * This reduces RSC payload by removing descricao (~1KB), caracteristicas[] (~2KB),
 * infraestrutura[] (~3KB), and extra fotos[] (~3KB) per property.
 * On a page with 100 properties, this saves ~200-600KB of serialized HTML.
 */
export function projectForCard(property: Property, maxPhotos = 3): Property {
  return {
    ...property,
    // Strip heavy text fields not used by cards
    descricao: "",
    tituloSite: null,
    textoAnuncio: null,
    keywordsWeb: null,
    // Strip arrays not used by cards
    caracteristicas: [],
    infraestrutura: [],
    // Limit photos (cards show 1, hover loads rest via /api/photos)
    fotos: property.fotos.slice(0, maxPhotos),
    fotosPorTipo: [],
    // Strip location details not used by cards
    complemento: null,
    bloco: null,
    // Strip other unused fields
    referencia: null,
    url: "",
    situacao: null,
    ocupacao: null,
  }
}
