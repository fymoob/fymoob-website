import type { Property, PropertyType } from "@/types/property"
import type { BlogPost } from "@/types/blog"
import { formatPrice, formatArea, getPropertyImage } from "@/lib/utils"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com"

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FYMOOB Imobiliária",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description:
      "Imobiliária em Curitiba especializada em apartamentos, casas e sobrados. Encontre seu imóvel ideal com a FYMOOB.",
    telephone: ["+554199978-0517", "+554132655051"],
    email: "fymoob@gmail.com",
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
    sameAs: [],
  }
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "FYMOOB Imobiliária",
    description:
      "Imobiliária em Curitiba — CRECI J 9420. Apartamentos, casas e sobrados à venda e para alugar.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/logo.svg`,
    telephone: "+554199978-0517",
    email: "fymoob@gmail.com",
    priceRange: "R$ 15.000 - R$ 11.000.000",
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
        opens: "09:00",
        closes: "18:00",
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
      streetAddress: property.endereco || undefined,
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
    parts.push(formatArea(property.areaPrivativa))
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
    parts.push(`e ${formatArea(property.areaPrivativa)}`)
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
      "@type": "Organization",
      name: "FYMOOB Imobiliária",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "FYMOOB Imobiliária",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
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
