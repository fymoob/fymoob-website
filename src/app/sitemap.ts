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

// Next.js generates /sitemap.xml as the index automatically when generateSitemaps
// is exported. Each id becomes /sitemap/[id].xml. Splitting into 4 segments keeps
// each child small (<5MB) and helps GSC reporting by category.
export async function generateSitemaps() {
  return [
    { id: 0 }, // imoveis
    { id: 1 }, // bairros + combinações
    { id: 2 }, // blog + guias + pillars
    { id: 3 }, // static + institucional + empreendimentos
  ]
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Segment 0: imóveis individuais
  if (id === 0) {
    const slugs = await getAllSlugs()
    return slugs.map((slug) => ({
      url: `${SITE_URL}/imovel/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  }

  // Segment 1: bairros + combinações (tipo, finalidade, quartos, preço)
  if (id === 1) {
    const [bairros, types] = await Promise.all([getAllBairros(), getAllTypes()])

    const typePages: MetadataRoute.Sitemap = types
      .filter((t) => TIPO_STATIC_PAGES[t.tipo])
      .map((t) => ({
        url: `${SITE_URL}/${TIPO_STATIC_PAGES[t.tipo]}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))

    const bairroPages: MetadataRoute.Sitemap = bairros.map((b) => ({
      url: `${SITE_URL}/imoveis/${b.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

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

    const tipoFinalidadePages: MetadataRoute.Sitemap = ["apartamentos", "casas", "sobrados", "terrenos"].flatMap(
      (tipo) => [
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
      ]
    )

    const finalidadePages: MetadataRoute.Sitemap = bairros.flatMap((b) => {
      const urls: MetadataRoute.Sitemap = []
      const vendaCount = b.porFinalidade["Venda"] ?? 0
      const aluguelCount = b.porFinalidade["Locação"] ?? 0
      if (vendaCount >= 2)
        urls.push({
          url: `${SITE_URL}/imoveis/${b.slug}/venda`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })
      if (aluguelCount >= 2)
        urls.push({
          url: `${SITE_URL}/imoveis/${b.slug}/aluguel`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })
      return urls
    })

    const quartosPages: MetadataRoute.Sitemap = bairros.flatMap((b) =>
      [1, 2, 3, 4, 5].flatMap((q) => {
        const qKey = q === 5 ? "5+" : String(q)
        const count = b.porQuartos?.[qKey] ?? 0
        if (count < 2) return []
        return [
          {
            url: `${SITE_URL}/imoveis/${b.slug}/${q}-quartos`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.6,
          },
        ]
      })
    )

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

    return [
      ...typePages,
      ...bairroPages,
      ...combinedPages,
      ...tipoFinalidadePages,
      ...finalidadePages,
      ...quartosPages,
      ...priceRangePages,
    ]
  }

  // Segment 2: blog + guias + pillars
  if (id === 2) {
    const [blogSlugs, guiaSlugs] = await Promise.all([getAllBlogSlugs(), getAllGuiaSlugs()])

    const pillarPages: MetadataRoute.Sitemap = [
      {
        url: `${SITE_URL}/comprar-imovel-curitiba`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/morar-em-curitiba`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/alugar-curitiba`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      },
    ]

    const blogListing: MetadataRoute.Sitemap = [
      {
        url: `${SITE_URL}/blog`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
    ]

    const blogPostPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

    const guiaPages: MetadataRoute.Sitemap = guiaSlugs.map((slug) => ({
      url: `${SITE_URL}/guia/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))

    return [...pillarPages, ...blogListing, ...blogPostPages, ...guiaPages]
  }

  // Segment 3: static + institucional + empreendimentos
  if (id === 3) {
    const empreendimentos = await getAllEmpreendimentos()

    const staticPages: MetadataRoute.Sitemap = [
      {
        url: SITE_URL,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/busca`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.8,
      },
    ]

    const institutionalPages: MetadataRoute.Sitemap = [
      { url: `${SITE_URL}/sobre`, priority: 0.5 },
      { url: `${SITE_URL}/contato`, priority: 0.6 },
      { url: `${SITE_URL}/anuncie`, priority: 0.7 },
      { url: `${SITE_URL}/empreendimentos`, priority: 0.8 },
      { url: `${SITE_URL}/lancamentos`, priority: 0.9 },
      { url: `${SITE_URL}/faq`, priority: 0.6 },
      { url: `${SITE_URL}/politica-editorial`, priority: 0.3 },
    ].map((p) => ({
      ...p,
      lastModified: now,
      changeFrequency: "monthly" as const,
    }))

    const empreendimentoPages: MetadataRoute.Sitemap = empreendimentos.map((e) => ({
      url: `${SITE_URL}/empreendimento/${e.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))

    return [...staticPages, ...institutionalPages, ...empreendimentoPages]
  }

  return []
}
