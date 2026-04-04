import type { MetadataRoute } from "next"
import { getAllBairros, getAllSlugs, getAllTypes, getAllEmpreendimentos } from "@/services/loft"
import { getAllSlugs as getAllBlogSlugs } from "@/services/blog"
import { getAllGuiaSlugs } from "@/services/guias"
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
  const [slugs, bairros, types, blogSlugs, empreendimentos, guiaSlugs] = await Promise.all([
    getAllSlugs(),
    getAllBairros(),
    getAllTypes(),
    getAllBlogSlugs(),
    getAllEmpreendimentos(),
    getAllGuiaSlugs(),
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

  // Tipo + finalidade pages (e.g., /apartamentos-curitiba/venda)
  const tipoFinalidadePages: MetadataRoute.Sitemap = [
    "apartamentos", "casas", "sobrados", "terrenos",
  ].flatMap((tipo) => [
    {
      url: `${SITE_URL}/${tipo}-curitiba/venda`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${tipo}-curitiba/aluguel`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ])

  // Bairro + finalidade pages (e.g., /imoveis/batel/venda, /imoveis/batel/aluguel)
  const finalidadePages: MetadataRoute.Sitemap = bairros
    .filter((b) => b.total >= 3)
    .flatMap((b) => [
      {
        url: `${SITE_URL}/imoveis/${b.slug}/venda`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/imoveis/${b.slug}/aluguel`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
    ])

  // Bairro + quartos pages (e.g., /imoveis/batel/3-quartos)
  const quartosPages: MetadataRoute.Sitemap = bairros
    .filter((b) => b.total >= 5)
    .flatMap((b) =>
      [2, 3, 4].map((q) => ({
        url: `${SITE_URL}/imoveis/${b.slug}/${q}-quartos`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))
    )

  // Price range landing pages
  const priceRangePages: MetadataRoute.Sitemap = [
    "ate-300-mil",
    "300-a-500-mil",
    "500-mil-a-1-milhao",
    "1-a-3-milhoes",
    "acima-3-milhoes",
  ].map((faixa) => ({
    url: `${SITE_URL}/imoveis/preco/${faixa}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Institutional pages
  const institutionalPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/sobre`, priority: 0.5 },
    { url: `${SITE_URL}/contato`, priority: 0.6 },
    { url: `${SITE_URL}/anuncie`, priority: 0.7 },
    { url: `${SITE_URL}/empreendimentos`, priority: 0.8 },
  ].map((p) => ({
    ...p,
    lastModified: now,
    changeFrequency: "monthly" as const,
  }))

  // Pillar pages (guias completos)
  const pillarPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/comprar-imovel-curitiba`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/morar-em-curitiba`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/alugar-curitiba`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ]

  // Neighborhood guides (guias de bairro)
  const guiaPages: MetadataRoute.Sitemap = guiaSlugs.map((slug) => ({
    url: `${SITE_URL}/guia/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...pillarPages,
    ...typePages,
    ...tipoFinalidadePages,
    ...bairroPages,
    ...combinedPages,
    ...finalidadePages,
    ...quartosPages,
    ...priceRangePages,
    ...empreendimentoPages,
    ...guiaPages,
    ...propertyPages,
    ...blogListingPage,
    ...blogPostPages,
    ...institutionalPages,
    ...faqPage,
  ]
}
