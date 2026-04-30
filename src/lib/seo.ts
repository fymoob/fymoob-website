import type { Property, PropertyType } from "@/types/property"
import type { BlogPost } from "@/types/blog"
import type { Author } from "@/lib/schemas/author"
import type { ArticleFull } from "@/services/articles"
import { formatPrice, formatArea, getPropertyImage } from "@/lib/utils"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com.br"

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "FYMOOB Imobiliária",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    foundingDate: "2024",
    description:
      "Imobiliária em Curitiba especializada em apartamentos, casas e sobrados. Encontre seu imóvel ideal com a FYMOOB.",
    telephone: ["+5541999780517", "+554132655051"],
    email: "fymoob@gmail.com",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+5541999780517",
      contactType: "customer service",
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "CRECI J 9420",
    },
    founder: [
      { "@id": `${SITE_URL}/sobre#bruno` },
      { "@id": `${SITE_URL}/sobre#wagner` },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Engenheiro Heitor Soares Gomes, 778, Esquina",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      postalCode: "80330-350",
      addressCountry: "BR",
    },
    areaServed: {
      "@type": "City",
      name: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    sameAs: [
      "https://www.instagram.com/fymoob",
      "https://www.facebook.com/profile.php?id=61556949541662",
      "https://www.tiktok.com/@fymoob",
    ],
  }
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "FYMOOB Imobiliária",
    description:
      "Imobiliária em Curitiba — CRECI J 9420. Apartamentos, casas e sobrados à venda e para alugar.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    telephone: "+5541999780517",
    email: "fymoob@gmail.com",
    priceRange: "$$",
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "CRECI J 9420",
    },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    employee: [
      { "@id": `${SITE_URL}/sobre#bruno` },
      { "@id": `${SITE_URL}/sobre#wagner` },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Engenheiro Heitor Soares Gomes, 778, Esquina",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      postalCode: "80330-350",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -25.4615,
      longitude: -49.2935,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
    },
  }
}

export function generatePropertySchema(property: Property) {
  const price = property.precoVenda ?? property.precoAluguel
  const rawImage = getPropertyImage(property)
  // Schema.org RealEstateListing exige URL absoluta em image
  const image = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${SITE_URL}${rawImage}`
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.titulo,
    description: property.descricao,
    url: `${SITE_URL}/imovel/${property.slug}`,
    ...(image && { image }),
    // datePosted/dateModified: so incluir se datas forem validas (null quebra validacao Google).
    // datePosted = quando foi listado pela primeira vez. dateModified = ultima edicao no CRM.
    ...(property.dataCadastro && { datePosted: property.dataCadastro }),
    ...(price && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
    }),
    address: {
      "@type": "PostalAddress",
      streetAddress: [property.endereco, property.numero].filter(Boolean).join(", ") || undefined,
      addressLocality: property.bairro || property.cidade,
      addressRegion: property.estado,
      postalCode: property.cep || undefined,
      addressCountry: "BR",
    },
    ...(property.latitude &&
      property.longitude && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: property.latitude,
          longitude: property.longitude,
        },
      }),
    ...(property.areaPrivativa && {
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.areaPrivativa,
        unitCode: "MTK",
      },
    }),
    numberOfRooms: property.dormitorios ?? undefined,
    numberOfBathroomsTotal: property.banheiros ?? undefined,
    // Conectar ao grafo de entidades (FYMOOB + Bruno + Wagner)
    realEstateAgent: [
      { "@id": `${SITE_URL}/#localbusiness` },
      { "@id": `${SITE_URL}/sobre#bruno` },
    ],
    provider: { "@id": `${SITE_URL}/#organization` },
    // Sinal E-E-A-T: imóvel revisado por corretor responsável com CRECI
    reviewedBy: { "@id": `${SITE_URL}/sobre#bruno` },
    ...((property.dataAtualizacao || property.dataCadastro) && {
      dateModified: property.dataAtualizacao ?? property.dataCadastro,
    }),
  }
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function generatePropertyTitle(property: Property): string {
  const parts: string[] = [property.tipo]

  if (property.dormitorios) {
    parts.push(
      `com ${property.dormitorios} ${property.dormitorios === 1 ? "quarto" : "quartos"}`
    )
  }

  if (property.areaPrivativa) {
    parts.push(`${formatArea(property.areaPrivativa)} m²`)
  }

  parts.push(`no ${property.bairro}`)
  parts.push("Curitiba")

  return parts.join(" ")
}

export function generatePropertyDescription(property: Property): string {
  const parts: string[] = []

  parts.push(`${property.tipo} ${property.finalidade === "Locação" ? "para alugar" : "à venda"}`)
  parts.push(`no ${property.bairro}, Curitiba`)

  if (property.dormitorios) {
    parts.push(
      `com ${property.dormitorios} ${property.dormitorios === 1 ? "quarto" : "quartos"}`
    )
  }

  if (property.areaPrivativa) {
    parts.push(`e ${formatArea(property.areaPrivativa)} m²`)
  }

  const price = property.precoVenda ?? property.precoAluguel
  if (price) {
    parts.push(`por ${formatPrice(price)}`)
  }

  parts.push("- FYMOOB Imobiliária")

  return parts.join(" ")
}

export function generateLandingTitle(tipo?: PropertyType | string, bairro?: string): string {
  if (tipo && bairro) {
    const plural = tipo === "Apartamento" ? "Apartamentos" :
      tipo === "Casa" ? "Casas" :
      tipo === "Sobrado" ? "Sobrados" :
      tipo === "Terreno" ? "Terrenos" : `${tipo}s`
    return `${plural} no ${bairro}, Curitiba`
  }
  if (bairro) {
    return `Imóveis à Venda e Aluguel no ${bairro}, Curitiba`
  }
  if (tipo) {
    const plural = tipo === "Apartamento" ? "Apartamentos" :
      tipo === "Casa" ? "Casas" :
      tipo === "Sobrado" ? "Sobrados" :
      tipo === "Terreno" ? "Terrenos" : `${tipo}s`
    return `${plural} à Venda e Aluguel em Curitiba`
  }
  return "Imóveis à Venda e Aluguel em Curitiba"
}

export function generateLandingDescription(
  tipo?: PropertyType | string,
  bairro?: string,
  count?: number,
  priceRange?: { min: number | null; max: number | null }
): string {
  const parts: string[] = []

  if (tipo && bairro) {
    const plural = tipo === "Apartamento" ? "apartamentos" :
      tipo === "Casa" ? "casas" :
      tipo === "Sobrado" ? "sobrados" :
      tipo === "Terreno" ? "terrenos" : `${tipo.toLowerCase()}s`
    parts.push(`Encontre ${plural} no ${bairro}, Curitiba.`)
  } else if (bairro) {
    parts.push(`Encontre imóveis à venda e para alugar no ${bairro}, Curitiba.`)
  } else if (tipo) {
    const plural = tipo === "Apartamento" ? "apartamentos" :
      tipo === "Casa" ? "casas" :
      tipo === "Sobrado" ? "sobrados" :
      tipo === "Terreno" ? "terrenos" : `${tipo.toLowerCase()}s`
    parts.push(`Encontre ${plural} à venda e para alugar em Curitiba.`)
  }

  if (count) {
    parts.push(`${count} opções disponíveis.`)
  }

  if (priceRange?.min && priceRange?.max) {
    parts.push(`Preços de ${formatPrice(priceRange.min)} a ${formatPrice(priceRange.max)}.`)
  }

  parts.push("FYMOOB Imobiliária.")

  return parts.join(" ")
}

export function generateBlogPostingSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "RealEstateAgent",
      "@id": `${SITE_URL}/sobre#bruno`,
      name: "Bruno César de Almeida",
      jobTitle: "Corretor de Imóveis",
      url: `${SITE_URL}/sobre#bruno`,
      image: `${SITE_URL}/images/team/bruno.jpeg`,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "CRECI/PR 24.494",
      },
      worksFor: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "FYMOOB Imobiliária",
        url: SITE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "FYMOOB Imobiliária",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  }
}

/**
 * Serializa objeto JSON-LD de forma segura para embed em <script>.
 * Escapa `<` como \u003c para prevenir que um `</script>` injetado via
 * campo de dado (descricao de imovel vinda do CRM, titulo de blog post
 * de MDX, etc) encerre o script e permita HTML/JS injection.
 *
 * Defense-in-depth: em prod o admin controla o CRM, mas uma conta
 * comprometida ou typo colocando `</script>` numa descrição quebra a
 * pagina sem esse escape.
 *
 * Referencia: OWASP JSON.stringify in script context.
 */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c")
}

interface PillarSchemaInput {
  title: string
  description: string
  image?: string
  date: string
  pagePath: string // ex: "/morar-em-curitiba"
}

// Usado pelos pillar pages (morar-em, comprar-imovel, alugar) e guia de bairro.
// Reutiliza a mesma estrutura do BlogPosting para manter consistencia de E-E-A-T:
// author/publisher/mainEntityOfPage/hasCredential.
export function generatePillarSchema(input: PillarSchemaInput) {
  const absoluteImage = input.image
    ? input.image.startsWith("http")
      ? input.image
      : `${SITE_URL}${input.image}`
    : `${SITE_URL}/opengraph-image`

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    image: absoluteImage,
    datePublished: input.date,
    dateModified: input.date,
    author: {
      "@type": "RealEstateAgent",
      "@id": `${SITE_URL}/sobre#bruno`,
      name: "Bruno César de Almeida",
      jobTitle: "Corretor de Imóveis",
      url: `${SITE_URL}/sobre#bruno`,
      image: `${SITE_URL}/images/team/bruno.jpeg`,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "CRECI/PR 24.494",
      },
      worksFor: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "FYMOOB Imobiliária",
        url: SITE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "FYMOOB Imobiliária",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${input.pagePath}`,
    },
  }
}

export function generateFAQPageSchema(
  questions: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }
}

// ─────────────────────────────────────────────────────────────────
// Fase 18 — Article schema parametrizado (Author dinamico)
// ─────────────────────────────────────────────────────────────────

/**
 * Constroi nó Person/RealEstateAgent a partir do registro de autor.
 * Caira em RealEstateAgent quando ha CRECI, em Person caso contrario.
 * Inclui sameAs/knowsAbout pra reforço E-E-A-T.
 */
export function generateAuthorSchema(author: Author) {
  const id = `${SITE_URL}/autor/${author.slug}#person`
  const photo = author.photo_url
    ? author.photo_url.startsWith("http")
      ? author.photo_url
      : `${SITE_URL}${author.photo_url}`
    : undefined

  const sameAs: string[] = []
  const social = author.social_links ?? {}
  if (social.linkedin) sameAs.push(social.linkedin)
  if (social.instagram) sameAs.push(social.instagram)
  if (social.twitter) sameAs.push(social.twitter)
  if (social.website) sameAs.push(social.website)

  const isAgent = Boolean(author.creci)

  return {
    "@context": "https://schema.org",
    "@type": isAgent ? "RealEstateAgent" : "Person",
    "@id": id,
    name: author.name,
    url: `${SITE_URL}/autor/${author.slug}`,
    jobTitle: author.role,
    ...(photo && { image: photo }),
    ...(author.bio_short && { description: author.bio_short }),
    ...(author.email && { email: author.email }),
    ...(author.expertise.length > 0 && { knowsAbout: author.expertise }),
    ...(sameAs.length > 0 && { sameAs }),
    ...(isAgent &&
      author.creci && {
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: author.creci,
        },
      }),
    worksFor: { "@id": `${SITE_URL}/#organization` },
  }
}

/**
 * Schema completo de artigo (Fase 18). Usa autor da tabela `authors`,
 * nao hard-code Bruno como o `generateBlogPostingSchema` legado faz.
 *
 * Renderiza @type variavel (Article, BlogPosting, NewsArticle, HowTo)
 * conforme `schema_type` do post. Inclui wordCount, articleSection,
 * keywords, inLanguage (pt-BR) — sinais E-E-A-T 2026.
 */
export function generateArticleSchema(article: ArticleFull) {
  const url = `${SITE_URL}/blog/${article.slug}`
  const cover = article.cover_image_url
    ? article.cover_image_url.startsWith("http")
      ? article.cover_image_url
      : `${SITE_URL}${article.cover_image_url}`
    : `${SITE_URL}/opengraph-image`

  const author = article.author
  const datePublished = article.published_at ?? article.created_at
  const dateModified = article.updated_at

  return {
    "@context": "https://schema.org",
    "@type": article.schema_type,
    headline: article.title,
    description: article.description,
    image: [cover],
    datePublished,
    dateModified,
    inLanguage: "pt-BR",
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog#blog`,
      name: "Blog FYMOOB",
      url: `${SITE_URL}/blog`,
    },
    ...(article.word_count && { wordCount: article.word_count }),
    ...(article.tags.length > 0 && {
      keywords: article.tags.join(", "),
      articleSection: article.tags[0],
    }),
    author: author
      ? generateAuthorSchema(author)
      : {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "FYMOOB Imobiliária",
          url: SITE_URL,
        },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "FYMOOB Imobiliária",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(article.reviewed_by && {
      reviewedBy: {
        "@type": "Person",
        name: article.reviewed_by,
      },
    }),
  }
}

// --- Phase 8: Dynamic content & FAQ generators ---

export function generateLandingIntro(
  properties: Property[],
  bairro?: string,
  tipo?: string
): string {
  const count = properties.length
  if (count === 0) return ""

  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)

  const areas = properties
    .map((p) => p.areaPrivativa ?? p.areaTotal)
    .filter((a): a is number => a !== null && a > 0)

  const minPreco = precos.length > 0 ? Math.min(...precos) : null
  const avgPreco = precos.length > 0 ? Math.round(precos.reduce((a, b) => a + b, 0) / precos.length) : null
  const avgArea = areas.length > 0 ? Math.round(areas.reduce((a, b) => a + b, 0) / areas.length) : null

  const tipoPlural = tipo ? getPluralTipo(tipo) : "imóveis"
  const local = bairro ? `no ${bairro}` : "em Curitiba"

  let intro = `Encontre ${count} ${tipoPlural.toLowerCase()} disponíveis ${local}.`

  if (minPreco) {
    intro += ` Preços a partir de ${formatPrice(minPreco)}`
    if (avgPreco && avgPreco !== minPreco) {
      intro += `, com valor médio de ${formatPrice(avgPreco)}`
    }
    intro += "."
  }

  if (avgArea) {
    intro += ` Área média de ${avgArea} m².`
  }

  return intro
}

function getPluralTipo(tipo: string): string {
  const plurals: Record<string, string> = {
    Apartamento: "Apartamentos",
    Casa: "Casas",
    Sobrado: "Sobrados",
    Terreno: "Terrenos",
    Cobertura: "Coberturas",
    Kitnet: "Kitnets",
    Studio: "Studios",
    Loja: "Lojas",
  }
  return plurals[tipo] || `${tipo}s`
}

export function generateLandingStats(properties: Property[]) {
  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)

  const areas = properties
    .map((p) => p.areaPrivativa ?? p.areaTotal)
    .filter((a): a is number => a !== null && a > 0)

  const quartos = properties
    .map((p) => p.dormitorios)
    .filter((d): d is number => d !== null && d > 0)

  return {
    total: properties.length,
    precoMin: precos.length > 0 ? Math.min(...precos) : null,
    precoMax: precos.length > 0 ? Math.max(...precos) : null,
    precoMedio: precos.length > 0 ? Math.round(precos.reduce((a, b) => a + b, 0) / precos.length) : null,
    areaMedio: areas.length > 0 ? Math.round(areas.reduce((a, b) => a + b, 0) / areas.length) : null,
    quartosMedio: quartos.length > 0 ? Math.round(quartos.reduce((a, b) => a + b, 0) / quartos.length) : null,
    quartosMin: quartos.length > 0 ? Math.min(...quartos) : null,
    quartosMax: quartos.length > 0 ? Math.max(...quartos) : null,
  }
}

export function generateDynamicFAQ(
  stats: ReturnType<typeof generateLandingStats>,
  bairro?: string,
  tipo?: string
): { question: string; answer: string }[] {
  const faq: { question: string; answer: string }[] = []
  const tipoPlural = tipo ? getPluralTipo(tipo).toLowerCase() : "imóveis"
  const local = bairro || "Curitiba"

  if (stats.total > 0) {
    faq.push({
      question: `Quantos ${tipoPlural} estão disponíveis ${bairro ? `no ${bairro}` : "em Curitiba"}?`,
      answer: `Atualmente existem ${stats.total} ${tipoPlural} disponíveis ${bairro ? `no ${bairro}` : "em Curitiba"} no site da FYMOOB. O catálogo é atualizado automaticamente conforme novos imóveis são cadastrados.`,
    })
  }

  if (stats.precoMin && stats.precoMedio) {
    faq.push({
      question: `Qual o preço médio de ${tipoPlural} ${bairro ? `no ${bairro}` : "em Curitiba"}?`,
      answer: `O preço médio de ${tipoPlural} ${bairro ? `no ${bairro}` : "em Curitiba"} é de ${formatPrice(stats.precoMedio)}. Os valores variam de ${formatPrice(stats.precoMin)} a ${formatPrice(stats.precoMax)}.`,
    })
  }

  if (stats.areaMedio) {
    faq.push({
      question: `Qual a área média dos ${tipoPlural} ${bairro ? `no ${bairro}` : "em Curitiba"}?`,
      answer: `A área média dos ${tipoPlural} ${bairro ? `no ${bairro}` : "em Curitiba"} é de aproximadamente ${stats.areaMedio} m². Você pode filtrar por área na página de busca para encontrar o tamanho ideal.`,
    })
  }

  if (stats.quartosMin && stats.quartosMax && stats.quartosMin !== stats.quartosMax) {
    faq.push({
      question: `Quantos quartos têm os ${tipoPlural} ${bairro ? `no ${bairro}` : "em Curitiba"}?`,
      answer: `Os ${tipoPlural} ${bairro ? `no ${bairro}` : "em Curitiba"} variam de ${stats.quartosMin} a ${stats.quartosMax} quartos. A média é de ${stats.quartosMedio} quartos.`,
    })
  }

  faq.push({
    question: `Como visitar um ${tipo ? tipo.toLowerCase() : "imóvel"} ${bairro ? `no ${bairro}` : "em Curitiba"}?`,
    answer: `Você pode agendar uma visita pelo WhatsApp da FYMOOB ou pelo formulário de contato na página do imóvel. Nossos corretores atendem de segunda a sexta das 8h30 às 17h e sábados das 9h às 13h.`,
  })

  return faq
}

/**
 * Map property type to most-specific Schema.org type. Apartment, House,
 * SingleFamilyResidence sao concretos. Fallback Accommodation cobre
 * categorias raras (Loft, Salas, Pontos Comerciais). Eligibilidade pra
 * rich result no Google — Fase 19.P0.2.
 */
function mapPropertyTypeToSchema(tipo: string): string {
  const t = tipo.toLowerCase()
  if (t.includes("apartamento")) return "Apartment"
  if (t.includes("cobertura")) return "Apartment"
  if (t.includes("studio") || t.includes("kitnet") || t.includes("loft")) return "Apartment"
  if (t.includes("casa") || t.includes("sobrado")) return "House"
  if (t.includes("chácara") || t.includes("chacara")) return "House"
  if (t.includes("terreno")) return "Place"
  return "Accommodation"
}

/**
 * ItemList enriched com embedded items (Apartment/House/Place) por property —
 * Fase 19.P0.2.
 *
 * Marketplaces concorrentes (MySide, Imovelweb) usam esse padrao pra ganhar
 * rich result no SERP. ItemList puro com so `name` nao basta — Google
 * prefere quando cada item tem propriedades concretas: numberOfRooms,
 * floorSize, address, offers.
 *
 * IMPORTANTE: ESTE e o gerador padrao usado por todas as listagens
 * (apartamentos-curitiba, casas-curitiba, sobrados-curitiba, terrenos-curitiba,
 * /imoveis/[bairro], /imoveis/[bairro]/[tipo], /imoveis/preco/[faixa],
 * /apartamentos-curitiba/[finalidade], /lancamentos, /empreendimento/[slug],
 * /busca). Mantem nome `generateItemListSchema` (em vez de Rich) pra
 * compatibilidade com call sites existentes — Fase 19 consolidacao.
 */
export function generateItemListSchema(properties: Property[], pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: pageUrl.startsWith("http") ? pageUrl : `${SITE_URL}${pageUrl}`,
    numberOfItems: properties.length,
    itemListElement: properties.map((property, index) => {
      const schemaType = mapPropertyTypeToSchema(property.tipo)
      const price = property.precoVenda || property.precoAluguel || null
      const propertyUrl = `${SITE_URL}/imovel/${property.slug}`
      const item: Record<string, unknown> = {
        "@type": schemaType,
        name: property.titulo,
        url: propertyUrl,
        ...(property.fotoDestaque && { image: property.fotoDestaque }),
        // Schema.org: addressLocality = cidade. Bairro vai em
        // addressLocality como sub-localidade (Google aceita ambos os
        // niveis em fallback) — usar cidade como principal e adicionar
        // bairro como streetAddress quando relevante.
        address: {
          "@type": "PostalAddress",
          ...(property.bairro && { streetAddress: property.bairro }),
          addressLocality: property.cidade || "Curitiba",
          addressRegion: "PR",
          addressCountry: "BR",
        },
      }
      if (property.dormitorios) item.numberOfRooms = property.dormitorios
      if (property.banheiros) item.numberOfBathroomsTotal = property.banheiros
      if (property.areaPrivativa) {
        item.floorSize = {
          "@type": "QuantitativeValue",
          value: property.areaPrivativa,
          unitCode: "MTK", // m² (UN/CEFACT)
        }
      }
      if (price) {
        item.offers = {
          "@type": "Offer",
          price,
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          url: propertyUrl,
        }
      }
      return {
        "@type": "ListItem",
        position: index + 1,
        url: propertyUrl,
        item,
      }
    }),
  }
}

/**
 * FAQPage schema com Q&A ricas pra landings de tipo (apartamentos, casas, sobrados, terrenos).
 * Fase 19.P0.1 — gap mais critico identificado vs MySide.
 *
 * Dados externos citados: Indice FipeZAP (mar/2026), CRECI/PR, Caixa Economica.
 * Atualizar `FIPEZAP_M2_CURITIBA` mensalmente quando dado mudar.
 */
const FIPEZAP_M2_CURITIBA = "R$ 11.621/m²"
const FIPEZAP_VARIACAO_12M = "5,92%"
const FIPEZAP_DATA = "março de 2026"

export function generateLandingFAQ(
  tipo: "Apartamento" | "Casa" | "Sobrado" | "Terreno",
  total: number,
  precoMin?: number | null,
  precoMax?: number | null
): { question: string; answer: string }[] {
  const tipoLower = tipo.toLowerCase()
  const tipoPlural = tipo === "Casa" ? "casas" : `${tipoLower}s`
  const artigo = tipo === "Casa" ? "uma" : "um"

  const faq: { question: string; answer: string }[] = [
    {
      question: `Quantos ${tipoPlural} estão disponíveis em Curitiba na FYMOOB?`,
      answer: `Atualmente a FYMOOB tem ${total} ${tipoPlural} disponíveis em Curitiba${precoMin && precoMax ? `, com valores entre ${formatPrice(precoMin)} e ${formatPrice(precoMax)}` : ""}. O catálogo é atualizado automaticamente a partir do CRM toda hora, então as opções refletem disponibilidade real.`,
    },
    {
      question: `Como é morar em Curitiba?`,
      answer: `Curitiba é referência nacional em qualidade de vida e planejamento urbano. A cidade tem o sistema de BRT (Bus Rapid Transit) mais antigo do Brasil, mais de 50 parques (Parque Barigui, Tanguá, Botânico, São Lourenço), e infraestrutura de saúde, educação e segurança acima da média. O custo de vida é menor que São Paulo e Rio, mas o padrão de imóvel é alto. Bairros como Batel, Bigorrilho, Água Verde e Ecoville são clássicos do alto padrão; Cabral, Juvevê e Cristo Rei oferecem ótima relação custo-benefício para famílias.`,
    },
    {
      question: `Quanto custa em média ${artigo} ${tipoLower} em Curitiba?`,
      answer:
        tipo === "Apartamento"
          ? `O preço médio de um apartamento em Curitiba varia muito por região e padrão. Você encontra apartamentos compactos (studios, 1 quarto) a partir de R$ 190 mil em bairros como Cidade Industrial, São Braz e Sítio Cercado. Apartamentos de 2-3 quartos em bairros médios (Portão, Cabral, Boa Vista) ficam entre R$ 350 mil e R$ 700 mil. Empreendimentos de alto padrão em Batel, Ecoville e Mossunguê chegam a passar dos R$ 3 milhões. O valor médio do metro quadrado em Curitiba, segundo o Índice FipeZAP de ${FIPEZAP_DATA}, é ${FIPEZAP_M2_CURITIBA}, com variação de ${FIPEZAP_VARIACAO_12M} nos últimos 12 meses.`
          : tipo === "Casa"
            ? `O preço de uma casa em Curitiba depende do bairro, terreno e padrão de construção. Casas em bairros mais afastados (Cidade Industrial, Tatuquara, Sítio Cercado) começam em torno de R$ 280 mil. Em bairros médios (Portão, Boa Vista, Cabral) o ticket fica entre R$ 500 mil e R$ 1 milhão. Casas de alto padrão em Mossunguê, Cascatinha, Champagnat e Santa Felicidade superam R$ 2 milhões. Casas em condomínio fechado têm precificação distinta — geralmente +30-50% sobre casas avulsas equivalentes.`
            : tipo === "Sobrado"
              ? `Sobrados em Curitiba seguem precificação parecida com casas, mas geralmente em bairros mais consolidados. A faixa típica é R$ 400 mil a R$ 1,5 milhão para sobrados padrão (3-4 quartos, 2 vagas) em bairros como Capão Raso, Boqueirão, Portão e Cabral. Sobrados de alto padrão em condomínio fechado (Cascatinha, Mossunguê, Lamenha Pequena) podem passar de R$ 3 milhões.`
              : `Terrenos em Curitiba variam de R$ 80 mil (Tatuquara, Caximba) até R$ 5+ milhões (Mossunguê, Champagnat). Terrenos de 250-360m² em bairros médios ficam entre R$ 250 mil e R$ 600 mil. Terrenos comerciais de alto padrão em Batel/Ecoville chegam a R$ 10 mil/m². Sempre verificar zoneamento da Prefeitura (IPPUC) antes de comprar.`,
    },
    {
      question: `Qual o valor do metro quadrado em Curitiba em 2026?`,
      answer: `Segundo o Índice FipeZAP de ${FIPEZAP_DATA}, o valor médio do metro quadrado para imóveis à venda em Curitiba é ${FIPEZAP_M2_CURITIBA}, com variação de ${FIPEZAP_VARIACAO_12M} nos últimos 12 meses. O valor varia muito por bairro: Batel e Ecoville superam R$ 13 mil/m², bairros médios como Cabral e Juvevê ficam em R$ 7-9 mil/m², e bairros mais afastados (Cidade Industrial, Tatuquara) ficam abaixo de R$ 4 mil/m². Para imóveis novos (lançamentos), o valor é geralmente 15-25% acima do usado.`,
    },
    {
      question: `Quais são os melhores bairros de Curitiba para morar?`,
      answer: `Os bairros mais procurados de Curitiba combinam infraestrutura, segurança e proximidade do centro. Para alto padrão: **Batel, Bigorrilho, Ecoville, Mossunguê, Cabral, Champagnat**. Para custo-benefício familiar: **Água Verde, Juvevê, Cristo Rei, Alto da Glória, Boa Vista, Portão**. Para investimento (valorização): **Centro Cívico, Hugo Lange, Vila Izabel, Jardim Botânico, Capão Raso**. Para perfil tranquilo/áreas verdes: **Santa Felicidade, Mercês, Campo Comprido, Bom Retiro**. A FYMOOB cobre os principais bairros — verifique imóveis disponíveis em cada um.`,
    },
    {
      question: `Vale a pena comprar ${artigo} ${tipoLower} na planta em Curitiba?`,
      answer: `Comprar na planta tem vantagens (preço de lançamento 15-25% abaixo do pronto, escolha de planta/posição, valorização durante a obra) e riscos (atraso na entrega, possível variação de mercado, custo de aluguel paralelo). Em Curitiba, lançamentos de construtoras consolidadas (Avantti, Plaenge, Cyrela, Helbor) tradicionalmente entregam no prazo e valorizam bem. Verifique sempre: registro de incorporação na Prefeitura, idoneidade da construtora, condições de pagamento e cláusulas contratuais. A FYMOOB tem CRECI J 9420 e acompanha lançamentos com responsabilidade.`,
    },
    {
      question: `Como funciona o financiamento Caixa de imóvel em Curitiba?`,
      answer: `A Caixa Econômica Federal é o principal banco de financiamento imobiliário no Brasil, com condições especiais via SBPE e FGTS. Em geral: entrada mínima de 20% (pode usar FGTS), prazo até 35 anos, taxa de juros entre 9% e 12% ao ano (varia conforme renda e perfil) + TR. Para imóveis dentro do Programa MCMV (até R$ 350 mil em Curitiba), juros mais baixos. O processo: avaliação do imóvel pela Caixa (~R$ 3 mil), análise de crédito, ITBI (~3% do valor), escritura, registro em cartório. Tempo total: 60-90 dias da proposta ao registro. A FYMOOB ajuda em todas as etapas.`,
    },
    {
      question: `Quanto tempo demora pra fechar uma compra de imóvel em Curitiba?`,
      answer: `Da proposta aceita ao registro final, o prazo médio é **60-90 dias**. Etapas: 1) Proposta + análise inicial (1-2 semanas), 2) Análise de crédito do banco (15-30 dias), 3) Avaliação do imóvel (1-2 semanas), 4) Aprovação final + emissão do contrato (1 semana), 5) Pagamento do ITBI (3% do valor venal), 6) Escritura no cartório (1-2 dias), 7) Registro de imóvel (~30 dias). Para compra à vista o prazo cai pra 30-45 dias. A FYMOOB acompanha todas as etapas e indica advogado/despachante especializado quando necessário.`,
    },
  ]

  return faq
}

// FAQPage schema usa o `generateFAQPageSchema` existente (linha ~422),
// chamado automaticamente pelo componente DynamicFAQ.

/**
 * FAQ ricas pra pillars editoriais (Fase 19.P0.6).
 *
 * Pillars `/comprar-imovel-curitiba`, `/morar-em-curitiba`, `/alugar-curitiba`
 * sao paginas de alta autoridade (priority 0.9 no sitemap) que ainda NAO
 * tinham FAQ — gap detectado em audit pos-P0 inicial. Adicionar FAQ rica =
 * eligibilidade pra rich result + indexacao com perguntas like "como
 * comprar imovel curitiba", "morar curitiba vale a pena", etc.
 */
export function generatePillarFAQ(
  pillar: "comprar" | "morar" | "alugar"
): { question: string; answer: string }[] {
  if (pillar === "comprar") {
    return [
      {
        question: "Quais são os passos para comprar um imóvel em Curitiba?",
        answer: `Comprar imóvel em Curitiba envolve 10 etapas: 1) Definir orçamento e perfil (cidade, bairro, tipo, m²); 2) Pré-aprovação de financiamento na Caixa, Itaú ou Bradesco; 3) Pesquisa de imóveis e visitas; 4) Proposta + negociação com vendedor; 5) Análise de documentação (matrícula atualizada, certidões de ônus, IPTU em dia); 6) Avaliação do imóvel pelo banco (~R$ 3 mil); 7) Contrato de compra e venda; 8) Pagamento do ITBI (3% do valor venal em Curitiba); 9) Escritura no cartório; 10) Registro de imóvel (~30 dias). Tempo total: 60-90 dias para financiados, 30-45 dias à vista.`,
      },
      {
        question: "Quais documentos preciso pra comprar um imóvel em Curitiba?",
        answer: `Do comprador: RG, CPF, comprovante de residência, comprovante de renda (3 últimos contracheques ou DECORE), certidão negativa Federal e Estadual, certidão conjunta de ações trabalhistas, FGTS atualizado se for usar. Do imóvel: matrícula atualizada (cartório de registro), certidão de ônus reais, certidão negativa de IPTU, declaração de quitação de condomínio, ART do imóvel (se houver reforma estrutural). Para casas/sobrados também: alvará de "habite-se", planta aprovada na Prefeitura. A FYMOOB tem CRECI J 9420 e checa toda a documentação antes da compra.`,
      },
      {
        question: "Quanto custa o ITBI em Curitiba e como pagar?",
        answer: `O ITBI (Imposto de Transmissão de Bens Imóveis) em Curitiba é de **3% do valor venal** (ou do valor de compra, o que for maior). Por exemplo: imóvel de R$ 500 mil paga ITBI de R$ 15 mil. Pagamento via boleto da Prefeitura de Curitiba antes da escritura. **Desconto de 50% para o primeiro imóvel residencial financiado pelo SFH** (até o limite SFH atual). Pagamento à vista no boleto único; é possível parcelar em alguns casos via decreto especial. A guia se obtém no portal da Receita Municipal de Curitiba.`,
      },
      {
        question: "Vale mais a pena comprar pronto ou na planta em Curitiba?",
        answer: `Depende do perfil. **Comprar pronto** dá: mudança imediata, pagamento de IPTU/condomínio só após posse, sem risco de atraso, possibilidade de avaliar acabamento real. **Comprar na planta** dá: preço 15-25% abaixo do pronto, escolha de unidade/posição/finishing, valorização durante a obra (3-7% ao ano em Curitiba), possibilidade de uso do FGTS na entrada/durante. Risco da planta: atraso na entrega (regulamentado por lei: até 180 dias sem multa, depois multa de 1% ao mês). Construtoras tradicionais em Curitiba (Avantti, Plaenge, Cyrela, Helbor) têm bom histórico de entrega.`,
      },
      {
        question: "Como funciona o financiamento imobiliário em Curitiba?",
        answer: `Os principais bancos em Curitiba são: Caixa (líder, taxas 9-11% ao ano + TR), Itaú (9.5-11.5%), Bradesco (10-12%), Santander (10-12%) e Banco do Brasil (9.5-11%). Características: entrada mínima 20% (pode usar FGTS para complementar), prazo até 35 anos, financia até 80% do valor do imóvel. Para imóveis até R$ 350 mil pode entrar no MCMV (Minha Casa Minha Vida) com taxas 4.25-7%. A análise de crédito leva 15-30 dias. Documentos: comprovação de renda (3-5x parcela), CPF limpo, FGTS ativo. A FYMOOB indica correspondente bancário gratuito.`,
      },
      {
        question: "Posso usar o FGTS pra comprar imóvel em Curitiba?",
        answer: `Sim! Pode usar FGTS para: **entrada do financiamento**, **amortização ou liquidação do saldo devedor**, ou **redução do valor da prestação por até 12 meses**. Requisitos: ter pelo menos 3 anos de trabalho com carteira assinada (somando todos os contratos), não ter outro imóvel próprio em zona urbana, imóvel deve ser residencial (não comercial), valor do imóvel até o limite SFH (R$ 1,5 mi em Curitiba/PR atualmente), imóvel localizado na cidade ou região metropolitana onde o trabalhador exerce função. O Banco solicita extrato do FGTS e libera o uso na assinatura do contrato.`,
      },
      {
        question: "Quais bairros de Curitiba têm melhor valorização?",
        answer: `Os bairros com maior valorização nos últimos 5 anos em Curitiba são: **Centro Cívico** (+25-30%, gentrificação + Linha Verde), **Hugo Lange** (+20-25%, retrofit + classe alta), **Capão Raso** (+15-20%, BRT + comércio), **Mossunguê** (+18-22%, lançamentos alto padrão), **Vila Izabel** (+15-18%, próximo Batel), **Jardim Botânico** (+12-15%, área verde + UFPR). Bairros tradicionais como Batel e Bigorrilho mantêm valorização estável de 5-8% ao ano. Para investimento de aluguel, bairros próximos a hospitais (Cajuru, Champagnat, Cristo Rei) e universidades (Centro, Cabral) têm liquidez alta.`,
      },
      {
        question: "A FYMOOB cobra alguma taxa do comprador?",
        answer: `Não. A FYMOOB Imobiliária (CRECI J 9420) atende compradores **gratuitamente** — nossa comissão é paga pelo proprietário/construtora vendedora. Você não paga nada à imobiliária. As únicas despesas do comprador são as cobradas pelo banco/cartório/prefeitura: ITBI (3%), avaliação bancária (~R$ 3 mil), tarifas do contrato, escritura (~1-2% no cartório), registro (~1.5%). A FYMOOB ajuda em todas as etapas — visita, proposta, análise de docs, acompanhamento até as chaves — sem cobrar do comprador.`,
      },
    ]
  }
  if (pillar === "morar") {
    return [
      {
        question: "Vale a pena morar em Curitiba?",
        answer: `Curitiba é a 5ª cidade brasileira em IDH (IBGE 2025), com qualidade de vida acima da média. Pontos fortes: planejamento urbano (BRT, ciclofaixas, parques), segurança superior a outras capitais (54º no ranking de violência), saúde (Hospital Pequeno Príncipe, Erasto Gaertner), educação (UFPR, PUC-PR, escolas Bom Jesus, Internacional), clima ameno (média 17°C). Pontos negativos: dias frios e úmidos (junho-agosto), trânsito em horários de pico, custo de vida acima da média do Brasil mas abaixo de SP/RJ. Para famílias e profissionais que valorizam infraestrutura e segurança, Curitiba é uma das melhores opções do Sul.`,
      },
      {
        question: "Quais são os melhores bairros pra morar em Curitiba?",
        answer: `Para alto padrão: **Batel, Bigorrilho, Ecoville, Mossunguê, Cabral, Champagnat**. Custo-benefício familiar: **Água Verde, Juvevê, Cristo Rei, Alto da Glória, Boa Vista, Portão**. Bairros tranquilos com áreas verdes: **Santa Felicidade, Mercês, Campo Comprido, Bom Retiro, Pilarzinho**. Investimento (valorização): **Centro Cívico, Hugo Lange, Vila Izabel, Jardim Botânico**. Próximos da UFPR Centro: **Centro Cívico, Alto da Glória, Cabral**. Bairros com menor custo: **Cidade Industrial, Tatuquara, Sítio Cercado, Boqueirão** (mas considere distância ao centro).`,
      },
      {
        question: "Como é o clima de Curitiba?",
        answer: `Curitiba tem clima subtropical úmido com inverno frio (média mínima 8-12°C, raras geadas) e verão ameno (máxima 25-28°C). Quatro estações bem definidas. Chuvas distribuídas o ano todo, mais frequentes no verão. Umidade alta (75-85% média anual). Para quem vem de cidades quentes (SP, RJ, Salvador), o inverno pode ser desafiador — agasalhos pesados são essenciais entre maio e setembro. Mas o clima ameno do verão é confortável: poucos dias acima de 30°C, raríssimas ondas de calor. Casas em Curitiba geralmente têm aquecimento (gás ou elétrico) e isolamento térmico — verifique ao visitar.`,
      },
      {
        question: "Como funciona o transporte público em Curitiba?",
        answer: `Curitiba é referência mundial em transporte público: o sistema **BRT (Bus Rapid Transit)** foi inaugurado em 1974 e inspirou cidades como Bogotá, Istambul e Los Angeles. A rede integrada: 6 linhas troncais (azuis), expressos (vermelhos), alimentadores (laranjas), interbairros (verdes). Tarifa única R$ 6,00 (2026) com integração. Pagamento via cartão Cartão Transporte, dinheiro ou aproximação. Frequência alta (a cada 5-10 min no horário de pico). O sistema cobre praticamente toda Curitiba — bairros bem servidos: Batel, Centro, Cabral, Portão, Boqueirão. Bairros de alto padrão (Mossunguê, Ecoville) têm cobertura média.`,
      },
      {
        question: "Quais escolas e universidades têm em Curitiba?",
        answer: `Curitiba é polo educacional do Sul com instituições renomadas. Universidades públicas: **UFPR** (Federal do Paraná, top 5 do Brasil), **UTFPR** (Tecnológica). Privadas: **PUC-PR**, **UP** (Positivo), **Uninter**, **UniBrasil**, **FAE Centro Universitário**. Escolas particulares de prestígio: **Bom Jesus**, **Internacional**, **Marista**, **Medianeira**, **Sion**, **Positivo**, **Opet**, **Lourenço Filho**. Escolas públicas: rede municipal (CMEIs e ensino fundamental) e estadual (médio). A cidade é considerada um dos melhores ensinos públicos do país (PISA 2022). Para famílias com filhos, Batel/Cabral/Bigorrilho têm proximidade às melhores escolas particulares.`,
      },
      {
        question: "Qual o custo de vida em Curitiba?",
        answer: `Custo de vida mensal em Curitiba (família 4 pessoas, classe média, 2026): aluguel apartamento 3qts em bairro médio (R$ 2.500-4.000), condomínio (R$ 600-1.200), IPTU (R$ 200-500), supermercado (R$ 2.500-4.000), escola particular por filho (R$ 1.500-3.500), plano de saúde 4 pessoas (R$ 2.000-4.000), transporte (R$ 600-1.500 — carro ou ônibus), academia (R$ 100-200), lazer (R$ 500-1.500). **Total mínimo: R$ 8-12 mil/mês**. Custo 25-30% menor que São Paulo, 15-20% menor que Rio, 10-15% maior que Maringá ou Florianópolis. Salário médio em Curitiba: R$ 3.800 (IBGE 2024).`,
      },
    ]
  }
  // pillar === "alugar"
  return [
    {
      question: "Como funciona o aluguel de imóveis em Curitiba?",
      answer: `O aluguel em Curitiba segue padrão nacional: **contrato de 30 meses** (típico) ou 12 meses (mais raro). **Garantias** aceitas: caução em dinheiro (3 meses de aluguel, devolvido ao final), fiador (com imóvel quitado em Curitiba), seguro-fiança (Porto Seguro, Tokio Marine — 70-130% do aluguel/ano), título de capitalização (Caixa Capitaliza, Brasilcap). **Custos do início**: primeiro aluguel + caução (3 meses) + taxa de cadastro (~R$ 200) + vistoria (R$ 150-300). Pagamento mensal: aluguel + condomínio + IPTU (proporcional). Reajuste anual pelo IGP-M ou IPCA conforme contrato.`,
    },
    {
      question: "Quanto custa em média alugar um apartamento em Curitiba?",
      answer: `Aluguel médio em Curitiba (2026): apartamento 1 quarto em bairro médio: R$ 1.200-2.000; 2 quartos: R$ 1.800-3.500; 3 quartos: R$ 2.500-5.000. Em bairros alto padrão (Batel, Bigorrilho, Ecoville): 1 qto R$ 2.000-3.500, 2 qts R$ 3.000-5.500, 3 qts R$ 4.500-9.000+. Em bairros mais afastados (Cidade Industrial, Tatuquara): valores 30-40% menores. Casas custam 20-40% acima de apartamentos equivalentes. Adicionar condomínio (R$ 400-1.500/mês) + IPTU (proporcional). FYMOOB tem catálogo atualizado de aluguel — valores reais sempre na página do imóvel.`,
    },
    {
      question: "Aceitam pet em apartamentos de aluguel em Curitiba?",
      answer: `A maioria dos condomínios em Curitiba **aceita pets** (Lei 14.453/22 garante o direito), mas pode ter regras: porte limitado, uso de coleira em áreas comuns, registro do pet na portaria, restrições em elevador específico (social vs serviço). Sempre verificar a convenção do condomínio antes de assinar. Bairros com maior aceitação de pet: Batel, Bigorrilho, Cabral, Juvevê (apartamentos novos). Casas e sobrados têm aceitação total de pets. Se você tem pet de grande porte, prefira casas ou apartamentos térreos com pequeno quintal — disponíveis em Cristo Rei, Boa Vista e Mercês.`,
    },
    {
      question: "Quais documentos preciso pra alugar um imóvel em Curitiba?",
      answer: `Documentação padrão: RG, CPF, comprovante de residência atual (3 meses), comprovante de renda (3 últimos contracheques — renda mínima 3x o valor do aluguel), CTPS (carteira de trabalho), declaração de IR. Casados: certidão de casamento + docs do cônjuge. Para fiador: imóvel quitado em Curitiba (matrícula), comprovante de renda 3x o aluguel, RG/CPF/comprovante residência. Para seguro-fiança: análise de crédito + cartão de crédito ou débito automático. **Análise da imobiliária**: 1-3 dias úteis. Após aprovação, vistoria + contrato + chaves em 5-7 dias.`,
    },
    {
      question: "Quem paga o IPTU e taxa de lixo no aluguel em Curitiba?",
      answer: `Por padrão, o **IPTU é responsabilidade do inquilino** (Lei do Inquilinato 8.245/91, art. 22) — pago em 12 parcelas via boleto da imobiliária. Taxa de lixo (gerida pela Prefeitura de Curitiba) também fica com o inquilino. O **proprietário paga**: condomínio extraordinário (obras estruturais, pintura, fachada), IPTU em atraso anterior ao contrato, seguro do prédio. Despesas que ficam **com o inquilino**: condomínio ordinário (limpeza, salário porteiro, água/luz áreas comuns), conta individual de água/luz/gás/internet, manutenção interna do imóvel.`,
    },
    {
      question: "Pode rescindir o contrato de aluguel antes do prazo?",
      answer: `Sim, o inquilino pode rescindir antes do prazo, mas **com multa proporcional**. Regra: multa = 3 meses de aluguel proporcionais ao tempo restante. Exemplo: contrato de 30 meses, sai no mês 12 — pagou 12, faltam 18 meses. Multa = (3 / 30) × 18 = 1,8 mês de aluguel. Notificar com **30 dias de antecedência** por escrito. Após 12 meses de contrato, dispensa multa em algumas situações: transferência de trabalho (com comprovação) ou desemprego involuntário. **Para o proprietário**, retomar o imóvel antes do prazo só por motivos previstos em lei (uso próprio, descumprimento, etc).`,
    },
  ]
}

/**
 * FAQ generica pro property detail (`/imovel/[slug]`) — Fase 19.P0.7.
 *
 * 250+ paginas individuais nao tinham FAQ. Adicionar Q&A genericas (mas
 * adaptadas ao tipo + finalidade) maximiza eligibilidade pra rich result
 * sem precisar gerar conteudo unico por imovel.
 */
export function generatePropertyDetailFAQ(
  property: Property
): { question: string; answer: string }[] {
  const tipo = property.tipo
  const tipoLower = tipo.toLowerCase()
  const isAluguel = (property.precoAluguel ?? 0) > 0 && (property.precoVenda ?? 0) === 0
  const finalidade = isAluguel ? "aluguel" : "venda"
  const acao = isAluguel ? "alugar" : "comprar"
  const bairro = property.bairro
  const cidade = property.cidade || "Curitiba"

  const faq: { question: string; answer: string }[] = [
    {
      question: `Como agendar uma visita pra esse ${tipoLower}?`,
      answer: `Você pode agendar uma visita ao ${tipoLower} pelo WhatsApp da FYMOOB: (41) 99978-0517. Atendimento de segunda a sexta, das 8h30 às 17h. Visitas geralmente são marcadas com 24-48h de antecedência, conforme disponibilidade do proprietário/construtora. Bruno (CRECI/PR 24.494) ou um dos corretores da equipe acompanha você in loco, mostra todos os detalhes do imóvel e tira dúvidas sobre documentação, financiamento e processo de compra.`,
    },
    ...(property.codigo
      ? [
          {
            question: `Qual o código desse ${tipoLower} no CRM?`,
            answer: `O código deste ${tipoLower} é **${property.codigo}**. Use esse código ao falar com o atendimento da FYMOOB pra agilizar o atendimento — vai direto pra ficha técnica completa do imóvel no nosso CRM.`,
          },
        ]
      : []),
    ...(isAluguel
      ? [
          {
            question: `Quais garantias são aceitas pra alugar esse ${tipoLower}?`,
            answer: `Aceitamos as garantias padrão de aluguel em Curitiba: **caução em dinheiro** (3 meses de aluguel, devolvido ao final), **fiador** (com imóvel quitado em Curitiba e renda 3x o aluguel), **seguro-fiança** (Porto Seguro, Tokio Marine, custo 70-130% do aluguel/ano) ou **título de capitalização** (Caixa, Brasilcap). A escolha da garantia depende do perfil do inquilino e disponibilidade do proprietário. Análise de crédito leva 1-3 dias úteis.`,
          },
        ]
      : [
          {
            question: `Esse ${tipoLower} aceita financiamento bancário?`,
            answer: `Sim, este imóvel está apto a financiamento pelos principais bancos brasileiros (Caixa, Itaú, Bradesco, Santander, Banco do Brasil). Condições típicas: entrada mínima 20% (pode usar FGTS), prazo até 35 anos, juros 9-12% ao ano + TR. ${property.precoVenda && property.precoVenda < 350000 ? "Como o valor está dentro do limite MCMV (até R$ 350 mil), pode haver condições especiais de juros mais baixos." : ""} A FYMOOB indica correspondente bancário gratuitamente — a análise de crédito leva 15-30 dias.`,
          },
          {
            question: `Quais documentos preciso pra ${acao} esse ${tipoLower}?`,
            answer: `Do comprador: RG, CPF, comprovante de residência, comprovante de renda (3 últimos contracheques ou DECORE), certidão negativa Federal e Estadual, certidão conjunta trabalhista, FGTS atualizado se for usar. Do imóvel: matrícula atualizada, certidões de ônus, IPTU em dia, declaração de quitação de condomínio, ART (se houver reforma). A FYMOOB checa toda documentação antes da assinatura — você fica seguro de não ter surpresas.`,
          },
        ]),
    {
      question: `O ${tipoLower} fica em qual bairro de Curitiba? Como é a região?`,
      answer: `Este ${tipoLower} fica no bairro **${bairro}**, em ${cidade}. Veja imóveis similares na mesma região na nossa landing dedicada: /imoveis/${bairro.toLowerCase().replace(/\s+/g, "-")}. Para conhecer infraestrutura, escolas, transporte e perfil do bairro, consulte o guia da FYMOOB sobre ${bairro} ou visite o imóvel pessoalmente — agendamos com 24h de antecedência.`,
    },
    {
      question: `Como faço uma proposta pra esse ${tipoLower}?`,
      answer: `Após visitar o imóvel e decidir prosseguir, você faz a proposta diretamente pela FYMOOB. O processo: 1) WhatsApp ou e-mail com sua proposta (valor, condições, prazo); 2) Apresentação ao proprietário/construtora; 3) Negociação de detalhes (preço, prazo de pagamento, mobília inclusa, etc); 4) Aceitação por escrito; 5) Assinatura de contrato preliminar com sinal (5-10% do valor); 6) Análise documental + financiamento; 7) Escritura final. ${finalidade === "venda" ? "Tempo total: 60-90 dias da proposta às chaves." : "Tempo total para começar a alugar: 5-15 dias da aprovação cadastral."} A FYMOOB acompanha você em todas as etapas.`,
    },
  ]

  return faq
}

/**
 * FAQ ricas pra /lancamentos — Fase 19.P0.8.
 *
 * Pagina de lancamentos é alvo de queries de alto valor ("lançamentos
 * curitiba", "imovel na planta curitiba", "apartamento novo curitiba").
 * FAQ adicional captura intent + rich result.
 */
export function generateLancamentosFAQ(total: number): { question: string; answer: string }[] {
  return [
    {
      question: `Quantos lançamentos a FYMOOB tem disponíveis em Curitiba?`,
      answer: `Atualmente a FYMOOB trabalha com ${total} lançamentos e imóveis na planta em Curitiba. Catálogo atualizado em tempo real com construtoras parceiras (Avantti, Plaenge, Cyrela, Helbor, Dirani, entre outras). Veja todos disponíveis na nossa página de lançamentos com fotos, plantas, preços e prazo de entrega.`,
    },
    {
      question: `O que é um imóvel "na planta" em Curitiba?`,
      answer: `Imóvel na planta é aquele que ainda está em construção (ou pré-construção) — você compra antes da entrega das chaves. Em Curitiba, o ciclo típico é: lançamento (preço promocional) → obras 24-36 meses → entrega das chaves. Pagamento durante a obra geralmente em parcelas + financiamento bancário pós-entrega. Vantagens: preço 15-25% abaixo do pronto, escolha de unidade/posição, valorização durante a obra. Desvantagens: precisa esperar pra morar, risco de atraso (regulamentado: até 180 dias sem multa).`,
    },
    {
      question: `Quais construtoras estão lançando em Curitiba?`,
      answer: `As principais construtoras com lançamentos ativos em Curitiba: **Avantti** (Reserva Barigui, Reserva Lago), **Plaenge** (Plaenge Artis, Lange Turin), **Cyrela** (alto padrão Batel/Bigorrilho), **Helbor** (My Place Jardim Botânico), **Dirani** (Audace, Insight), **CR2** (Sensia Horizon, K&ra), **Diálogo** (Bioma, Liv.In), **Castro** (Pine Blue), **EBM** (Plus Portão), **AYA** (AYA Residence). A FYMOOB é parceira oficial dessas construtoras — preços de tabela direta da fábrica, sem intermediação extra.`,
    },
    {
      question: `Vale a pena comprar imóvel na planta em Curitiba em 2026?`,
      answer: `Comprar na planta vale a pena em 3 cenários: 1) Você não precisa morar imediatamente (uso próprio futuro ou investimento); 2) Tem perfil pra esperar 24-36 meses; 3) Quer travar o preço atual antes da valorização da obra. Em Curitiba, o mercado de lançamentos vem aquecido: SBPE recordou em 2025 com R$ 35 bi nacional, e Curitiba registra valorização média de 7-10% ao ano em empreendimentos novos. Para investimento, lançamentos próximos ao Parque Barigui, Mossunguê e Centro Cívico têm ROI elevado.`,
    },
    {
      question: `Quanto pago de entrada e como funciona o financiamento na planta?`,
      answer: `Estrutura típica de pagamento na planta: **Sinal** (5-10% do valor) na assinatura. **Pagamento durante a obra** (15-30%) parcelado mensalmente até a entrega. **Financiamento bancário pós-entrega** (60-80%) — a Caixa, Itaú e Bradesco financiam sob garantia de alienação fiduciária. Pode usar FGTS na entrada e durante. Algumas construtoras oferecem opções alternativas: pagamento direto sem banco (juros próprios da construtora), uso de imóvel como permuta, parcelamento em até 200 meses da própria construtora. A FYMOOB simula todas as opções pra você.`,
    },
    {
      question: `O que acontece se a construtora atrasar a entrega?`,
      answer: `A Lei 13.786/2018 regula atrasos: a construtora pode atrasar **até 180 dias sem multa** (prazo de tolerância). Após esse período: **multa de 1% ao mês sobre o valor pago** + correção monetária. Se o atraso passar de 180 dias e o comprador desistir: **devolução de 100% dos valores pagos** + correção pelo INCC + multa proporcional. Em Curitiba, construtoras consolidadas (citadas na resposta sobre construtoras) têm histórico baixo de atrasos. Para minimizar risco: verifique CNPJ na Junta Comercial, certidões da incorporação no Cartório de Registro de Imóveis, conheça empreendimentos anteriores entregues pela mesma construtora.`,
    },
  ]
}
