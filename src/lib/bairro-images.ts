/**
 * Imagens dos bairros em destaque (curadoria manual).
 *
 * Chave = nome exato do bairro na API Loft. Substituir por fotos reais
 * quando disponíveis. Bairros fora dessa lista recebem fallback dinâmico
 * via `getBairroImage` — ex: foto de um imóvel ativo daquele bairro.
 *
 * Por que mantemos dict curado em vez de só dinâmico:
 * - Bairros premium (Batel, Bigorrilho) tem fotos editoriais
 *   (drone/arquitetura) que performam melhor em SEO que foto de apto
 * - Fallback dinâmico cobre bairros novos/pequenos sem risco de landing
 *   sem imagem
 */
export const bairroImages: Record<string, string> = {
  "Portão": "/images/bairros/portao.jpg",
  "Cidade Industrial": "/images/bairros/cidade-industrial.jpg",
  "Mossunguê": "/images/bairros/mossungue.jpg",
  "Sítio Cercado": "/images/bairros/sitio-cercado.jpg",
  "Água Verde": "/images/bairros/agua-verde.jpg",
  "Tatuquara": "/images/bairros/tatuquara.jpg",
  "Campo de Santana": "/images/bairros/campo-de-santana.jpg",
  "Campina do Siqueira": "/images/bairros/campina-do-siqueira.jpg",
  "Xaxim": "/images/bairros/xaxim.jpg",
  "Bigorrilho": "/images/bairros/bigorrilho.jpg",
  "Batel": "/images/bairros/batel.jpg",
  "Novo Mundo": "/images/bairros/novo-mundo.jpg",
}

/**
 * Retorna URL de imagem pra um bairro seguindo prioridade:
 * 1. Curadoria em `bairroImages` (editorial, para bairros premium)
 * 2. Foto fallback (ex: `property.fotoDestaque` de um imóvel ativo)
 * 3. `undefined` — consumer mostra gradiente placeholder (ver BairroCard)
 *
 * Garante que bairros novos cadastrados no CRM nunca apareçam sem
 * representação visual mesmo antes da curadoria manual.
 */
export function getBairroImage(
  bairro: string,
  fallbackPhoto?: string | null
): string | undefined {
  const curated = bairroImages[bairro]
  if (curated) return curated
  if (fallbackPhoto && fallbackPhoto.trim().length > 0) return fallbackPhoto
  return undefined
}
