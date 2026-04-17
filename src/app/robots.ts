import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com.br"

// Next 16 NAO gera /sitemap.xml index automaticamente com generateSitemaps;
// so cria shards individuais /sitemap/<id>.xml. Apontamos robots.txt direto
// para cada shard (pattern valido — Google aceita multiplas diretivas
// Sitemap num robots.txt). Manter sincronizado com generateSitemaps em
// src/app/sitemap.ts.
const SITEMAP_SHARDS = [0, 1, 2, 3]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/favoritos", "/comparar", "/admin"],
      },
    ],
    sitemap: SITEMAP_SHARDS.map((id) => `${SITE_URL}/sitemap/${id}.xml`),
  }
}
