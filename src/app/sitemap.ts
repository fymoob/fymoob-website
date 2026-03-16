import type { MetadataRoute } from "next"
import { getAllBairros, getAllSlugs, getAllTypes } from "@/services/loft"
import { getAllSlugs as getAllBlogSlugs } from "@/services/blog"
import type { PropertyType } from "@/types/property"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com"

const TIPO_SLUG_MAP: Record<PropertyType, string> = {
  Apartamento: "apartamentos",
  Casa: "casas",
  Sobrado: "sobrados",
  Terreno: "terrenos",
}

const TIPO_STATIC_PAGES: Record<PropertyType, string> = {
  Apartamento: "apartamentos-curitiba",
  Casa: "casas-curitiba",
  Sobrado: "sobrados-curitiba",
  Terreno: "terrenos-curitiba",
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, bairros, types, blogSlugs] = await Promise.all([
    getAllSlugs(),
    getAllBairros(),
    getAllTypes(),
    getAllBlogSlugs(),
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

  // Type landing pages (e.g., /apartamentos-curitiba)
  const typePages: MetadataRoute.Sitemap = types.map((t) => ({
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
    ...propertyPages,
    ...blogListingPage,
    ...blogPostPages,
    ...faqPage,
  ]
}
