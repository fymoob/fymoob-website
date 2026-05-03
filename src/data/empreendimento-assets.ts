/**
 * Static marketing assets for empreendimentos.
 * These are provided by construtoras with authorization.
 * When an empreendimento has assets here, the landing page uses them
 * for a richer, more immersive experience.
 */

export interface EmpreendimentoAssets {
  logo?: string
  heroImage: string
  heroOverlayImage?: string
  parallaxImages: string[]
  implantacaoImage?: string
  lifestyleImage?: string
  torres?: {
    nome: string
    slug?: string
    logo?: string
    render?: string
    planta?: string
    plantas?: string[]
    descricao?: string
  }[]
  plantas?: string[]
  videoUrl?: string
  mapEmbedUrl?: string
  descricaoMarketing?: string
  tagline?: string
  subtitulo?: string
}

const assetsMap: Record<string, EmpreendimentoAssets> = {
  "reserva-barigui": {
    logo: "/images/empreendimentos/reserva-barigui/logo-reserva-barigui.png",
    heroImage: "/images/empreendimentos/reserva-barigui/folhas-bg.jpg",
    heroOverlayImage: "/images/empreendimentos/reserva-barigui/folhas-hero.png",
    parallaxImages: [
      "/images/empreendimentos/reserva-barigui/piscina.jpg",
      "/images/empreendimentos/reserva-barigui/panoramica.jpg",
      "/images/empreendimentos/reserva-barigui/localizacao.jpg",
    ],
    implantacaoImage: "/images/empreendimentos/reserva-barigui/implantacao.jpg",
    lifestyleImage: "/images/empreendimentos/reserva-barigui/lifestyle.jpg",
    tagline: "CURITIBA | REGIÃO DO BARIGUI",
    subtitulo: "LANÇAMENTO",
    torres: [
      {
        nome: "Reserva Lago",
        slug: "reserva-barigui",
        logo: "/images/empreendimentos/reserva-barigui/logo-lago.png",
        render: "/images/empreendimentos/reserva-barigui/fachada-lago.jpg",
        descricao: "Apartamentos com 1 a 2 quartos, em formato de studio, loft, garden, ou duplex. Entrega prevista para Agosto/26.",
        plantas: [
          "/images/empreendimentos/reserva-barigui/plantas/lago-1.png",
          "/images/empreendimentos/reserva-barigui/plantas/lago-2.png",
          "/images/empreendimentos/reserva-barigui/plantas/lago-3.png",
        ],
      },
      {
        nome: "Reserva Colina",
        slug: "reserva-colina",
        logo: "/images/empreendimentos/reserva-barigui/logo-colina.png",
        render: "/images/empreendimentos/reserva-barigui/render-colina.jpg",
        descricao: "Apartamentos de 3 a 4 suítes, com plantas de garden, laje, ou coberturas duplex. Entrega prevista para Julho/27.",
        plantas: [
          "/images/empreendimentos/reserva-barigui/plantas/colina-1.png",
          "/images/empreendimentos/reserva-barigui/plantas/colina-2.png",
          "/images/empreendimentos/reserva-barigui/plantas/colina-3.png",
        ],
      },
      {
        nome: "Reserva Mirante",
        slug: "reserva-mirante",
        logo: "/images/empreendimentos/reserva-barigui/logo-mirante.png",
        render: "/images/empreendimentos/reserva-barigui/render-mirante.jpg",
        descricao: "Salas comerciais, lojas e lajes corporativas, de 38m² a 1.222m². Entrega prevista para Setembro/27.",
        plantas: [
          "/images/empreendimentos/reserva-barigui/plantas/mirante-1.webp",
          "/images/empreendimentos/reserva-barigui/plantas/mirante-2.webp",
          "/images/empreendimentos/reserva-barigui/plantas/mirante-3.webp",
          "/images/empreendimentos/reserva-barigui/plantas/mirante-4.webp",
        ],
      },
    ],
    videoUrl: "https://www.youtube.com/embed/8F1lKx4xgEo",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.0946163108147!2d-49.318648700000004!3d-25.4351001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce3d178de8429%3A0x9d7c4792a4141dc0!2sR.%20Clara%20Vendramin%2C%20445%20-%20Mossungu%C3%AA%2C%20Curitiba%20-%20PR%2C%2081200-170!5e0!3m2!1spt-BR!2sbr!4v1670858575948!5m2!1spt-BR!2sbr",
    descricaoMarketing: "Na frente, o Parque. Ao lado, o Shopping. No centro, você.\n\nUm complexo imobiliário de alto padrão para você morar e trabalhar com a mais bela moldura do Parque Barigui — um ícone de sofisticação, design e bem-estar.\n\nCercado por uma mata nativa preservada e um bosque de 8 mil m², o Reserva Barigui é um condomínio de três empreendimentos. Assine ao vídeo e descubra os detalhes de alto padrão construtivo que tornam este lugar verdadeiramente excepcional.",
  },
}

// Sub-empreendimentos with simple asset entries (plantas only, no full editorial)
assetsMap["reserva-colina"] = {
  heroImage: "/images/empreendimentos/reserva-barigui/render-colina.jpg",
  parallaxImages: [],
  plantas: [
    "/images/empreendimentos/reserva-barigui/plantas/colina-1.png",
    "/images/empreendimentos/reserva-barigui/plantas/colina-2.png",
    "/images/empreendimentos/reserva-barigui/plantas/colina-3.png",
  ],
}

assetsMap["reserva-mirante"] = {
  heroImage: "/images/empreendimentos/reserva-barigui/render-mirante.jpg",
  parallaxImages: [],
  plantas: [
    "/images/empreendimentos/reserva-barigui/plantas/mirante-1.webp",
    "/images/empreendimentos/reserva-barigui/plantas/mirante-2.webp",
    "/images/empreendimentos/reserva-barigui/plantas/mirante-3.webp",
    "/images/empreendimentos/reserva-barigui/plantas/mirante-4.webp",
  ],
}

export function getEmpreendimentoAssets(slug: string): EmpreendimentoAssets | null {
  return assetsMap[slug] || null
}

export function hasEditorialLayout(slug: string): boolean {
  const assets = assetsMap[slug]
  return !!(assets && assets.torres && assets.torres.length > 0)
}

/**
 * Sprint B.V (03/05/2026) — Slug curto da torre dentro do hub.
 * "Reserva Lago" -> "lago", "Reserva Colina" -> "colina", "Reserva Mirante" -> "mirante".
 * Usado pra:
 * - Anchor IDs (#torre-lago, #torre-colina) — ja existia inline em [slug]/page.tsx
 * - URL da sub-rota /empreendimento/[slug]/[torre] (Sprint B.7)
 * - Schema containsPlace.url (Sprint B.V)
 *
 * Centralizado aqui pra evitar drift entre os 3 consumers.
 */
export function getTorreShortSlug(torreNome: string): string {
  return torreNome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/^reserva-?/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Sprint B.7 (03/05/2026) — Resolve uma torre pelo seu short slug dentro do hub.
 * Ex: getTorreFromShortSlug("reserva-barigui", "lago") devolve a torre Reserva Lago.
 * Devolve null quando o slug do hub nao tem editorial ou a torre nao existe.
 */
export function getTorreFromShortSlug(
  hubSlug: string,
  torreSlug: string,
): { hub: EmpreendimentoAssets; torre: NonNullable<EmpreendimentoAssets["torres"]>[number] } | null {
  const hub = assetsMap[hubSlug]
  if (!hub?.torres) return null
  const torre = hub.torres.find((t) => getTorreShortSlug(t.nome) === torreSlug)
  if (!torre) return null
  return { hub, torre }
}
