/**
 * Static marketing assets for empreendimentos.
 * These are provided by construtoras with authorization.
 * When an empreendimento has assets here, the landing page uses them
 * for a richer, more immersive experience.
 */

import type { Property } from "@/types/property"

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
    // Hero & parallax recriados em alta qualidade (03/05/2026). PNGs source
    // (~2MB cada) convertidos pra WebP q85 (-95% bytes, qualidade visual
    // intacta). PNGs originais ficam no repo pra possivel re-export futuro.
    // - folhas.webp 217KB (1672x941): hero background, servido via <Image>
    //   do Next que ainda pode converter pra AVIF via Accept header em prod.
    // - pool.webp 98KB (1536x1024): parallax CSS background — nao passa pelo
    //   Next Image Optimizer, por isso WebP direto e essencial.
    heroImage: "/images/empreendimentos/reserva-barigui/folhas.webp",
    heroOverlayImage: "/images/empreendimentos/reserva-barigui/folhas-hero.png",
    parallaxImages: [
      "/images/empreendimentos/reserva-barigui/pool.webp",
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
    descricaoMarketing: "Um empreendimento de alto padrão em uma das regiões mais desejadas de Curitiba, com a natureza do Parque Barigui como moldura.\n\nCom apenas 10 unidades, o Reserva Barigui combina privacidade, conveniência e arquitetura contemporânea no Mossunguê.",
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

/**
 * Sprint B' (03/05/2026) — Classificacao automatica de imovel pra torre.
 *
 * Caso Reserva Barigui: o CRM nao segmenta unidades por torre — todos os 10
 * imoveis estao sob `Empreendimento: "Reserva Barigui"` (+ 1 typo "Reserva
 * Bairgui"). Pra cada sub-rota mostrar so as unidades da sua torre, este
 * mapeamento aplica regra heuristica baseada nas descricoes editoriais
 * curadas:
 *   - Reserva Lago: 1-2 quartos, formato studio/loft/garden/duplex
 *   - Reserva Colina: 3-4 suites, garden/laje/coberturas duplex
 *   - Reserva Mirante: salas comerciais, lojas, lajes corporativas
 *
 * Quando Wagner reclassificar imoveis no CRM (Sprint B caminho 2), trocar
 * pra match exato `p.empreendimento === "Reserva Lago"` etc.
 *
 * Cada hub editorial pode ter sua propria classifier — registrada aqui.
 * Hubs sem classifier nao tem sub-rotas com filtro de unidades (sub-rota
 * mostraria todas as unidades do hub mesmo).
 */
type TorreClassifier = (p: Property) => string

const HUB_CLASSIFIERS: Record<string, TorreClassifier> = {
  "reserva-barigui": (p: Property) => {
    const tipo = (p.tipo || "").toLowerCase()
    const COMERCIAL = ["sala comercial", "loja", "ponto comercial", "salas/conjuntos", "sala/conjuntos", "sala/conjunto"]
    if (COMERCIAL.some((c) => tipo.includes(c))) return "mirante"
    if ((p.dormitorios ?? 0) >= 3) return "colina"
    return "lago"
  },
}

/**
 * Classifica imovel em torre dentro do hub. Retorna torre short slug ("lago",
 * "colina", "mirante") ou null se hub nao tem classifier registrado.
 */
export function classifyTorreFor(hubSlug: string, p: Property): string | null {
  const fn = HUB_CLASSIFIERS[hubSlug]
  return fn ? fn(p) : null
}
