import type { Property, PropertyType } from "@/types/property"
import type { BlogPost } from "@/types/blog"
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
    telephone: ["+554199978-0517", "+554132655051"],
    email: "fymoob@gmail.com",
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
    telephone: "+554199978-0517",
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

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.titulo,
    description: property.descricao,
    url: `${SITE_URL}/imovel/${property.slug}`,
    image: getPropertyImage(property),
    datePosted: property.dataCadastro,
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
      addressLocality: property.cidade,
      addressRegion: property.estado,
      addressCountry: "BR",
      ...(property.bairro && {
        addressRegion: `${property.bairro}, ${property.cidade} - ${property.estado}`,
      }),
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
    dateModified: property.dataCadastro,
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

export function generateItemListSchema(properties: Property[], pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: pageUrl.startsWith("http") ? pageUrl : `${SITE_URL}${pageUrl}`,
    numberOfItems: properties.length,
    itemListElement: properties.map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/imovel/${property.slug}`,
      name: property.titulo,
    })),
  }
}
