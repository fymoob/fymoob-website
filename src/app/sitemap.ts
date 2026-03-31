import type { MetadataRoute } from "next"
import { getAllBairros, getAllSlugs, getAllTypes, getAllEmpreendimentos } from "@/services/loft"
import { getAllSlugs as getAllBlogSlugs } from "@/services/blog"
import type { PropertyType } from "@/types/property"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com"

const TIPO_SLUG_MAP: Partial<Record<PropertyType, string>> = {
  Apartamento: "apartamentos",
  "Apartamento Duplex": "apartamentos-duplex",
  Casa: "casas",
  "Casa em Condomínio": "casas-em-condominio",
  Chácara: "chacaras",
  Cobertura: "coberturas",
  Kitnet: "kitnets",
  Loja: "lojas",
  "Ponto Comercial": "pontos-comerciais",
  "Prédio Comercial": "predios-comerciais",
  "Sala Comercial": "salas-comerciais",
  "Salas/Conjuntos": "salas-conjuntos",
  Sobrado: "sobrados",
  Studio: "studios",
  Terreno: "terrenos",
  "Terreno Comercial": "terrenos-comerciais",
  Empreendimento: "empreendimentos",
}

const TIPO_STATIC_PAGES: Partial<Record<PropertyType, string>> = {
  Apartamento: "apartamentos-curitiba",
  Casa: "casas-curitiba",
  Sobrado: "sobrados-curitiba",
  Terreno: "terrenos-curitiba",
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, bairros, types, blogSlugs, empreendimentos] = await Promise.all([
    getAllSlugs(),
    getAllBairros(),
    getAllTypes(),
    getAllBlogSlugs(),
    getAllEmpreendimentos(),
  ])

  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/busca`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ]

  // Type landing pages (e.g., /apartamentos-curitiba) — only types with static pages
  const typePages: MetadataRoute.Sitemap = types
    .filter((t) => TIPO_STATIC_PAGES[t.tipo])
    .map((t) => ({
      url: `${SITE_URL}/${TIPO_STATIC_PAGES[t.tipo]}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))

  // Bairro landing pages (e.g., /imoveis/portao)
  const bairroPages: MetadataRoute.Sitemap = bairros.map((b) => ({
    url: `${SITE_URL}/imoveis/${b.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Combined bairro+tipo pages (e.g., /imoveis/portao/apartamentos)
  const combinedPages: MetadataRoute.Sitemap = bairros.flatMap((b) =>
    b.tipos
      .filter((t) => t.count >= 3)
      .filter((t) => TIPO_SLUG_MAP[t.tipo])
      .map((t) => ({
        url: `${SITE_URL}/imoveis/${b.slug}/${TIPO_SLUG_MAP[t.tipo]}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))
  )

  // Individual property pages (e.g., /imovel/slug)
  const propertyPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/imovel/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // Blog pages
  const blogListingPage: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ]

  const blogPostPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Empreendimento pages
  const empreendimentoPages: MetadataRoute.Sitemap = empreendimentos.map((e) => ({
    url: `${SITE_URL}/empreendimento/${e.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // FAQ page
  const faqPage: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  return [
    ...staticPages,
    ...typePages,
    ...bairroPages,
    ...combinedPages,
    ...empreendimentoPages,
    ...propertyPages,
    ...blogListingPage,
    ...blogPostPages,
    ...faqPage,
  ]
}
