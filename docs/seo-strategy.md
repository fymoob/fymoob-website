# Estratégia SEO — Referência Técnica

## Schema Markup — Templates

### RealEstateListing (página de imóvel)
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "[Tipo] [Quartos] Quartos no [Bairro] - Curitiba",
  "description": "[Descrição truncada 155 chars]",
  "url": "https://fymoob.com/imovel/[slug]",
  "datePosted": "[DataCadastro]",
  "offers": {
    "@type": "Offer",
    "price": "[ValorVenda]",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Endereco]",
    "addressLocality": "Curitiba",
    "addressRegion": "PR",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[Latitude]",
    "longitude": "[Longitude]"
  },
  "numberOfRooms": "[Dormitorio]",
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": "[AreaPrivativa]",
    "unitCode": "MTK"
  }
}
```

### Organization (layout raiz)
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "FYMOOB Imobiliária",
  "url": "https://fymoob.com",
  "logo": "https://fymoob.com/logo.png",
  "telephone": "+554199978-0517",
  "email": "fymoob@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Engenheiro Heitor Soares Gomes, 778",
    "addressLocality": "Curitiba",
    "addressRegion": "PR",
    "postalCode": "80330-350",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -25.4614,
    "longitude": -49.2917
  },
  "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-13:00"
}
```

### BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fymoob.com" },
    { "@type": "ListItem", "position": 2, "name": "[Bairro]", "item": "https://fymoob.com/imoveis/[bairro]" },
    { "@type": "ListItem", "position": 3, "name": "[Título do imóvel]" }
  ]
}
```

## Meta Tags — Padrões por Tipo de Página

### BlogPosting (artigos do blog)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[Título do artigo]",
  "description": "[Primeiros 155 chars]",
  "url": "https://fymoob.com/blog/[slug]",
  "datePublished": "[Data de publicação]",
  "dateModified": "[Data de atualização]",
  "author": {
    "@type": "Organization",
    "name": "FYMOOB Imobiliária"
  },
  "publisher": {
    "@type": "Organization",
    "name": "FYMOOB Imobiliária",
    "logo": {
      "@type": "ImageObject",
      "url": "https://fymoob.com/logo.png"
    }
  }
}
```

### FAQPage (perguntas frequentes)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Pergunta]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Resposta]"
      }
    }
  ]
}
```

### Página de imóvel
```
title: "[Tipo] [Quartos] Quartos à Venda no [Bairro] | R$ [Preço] | FYMOOB"
description: "[Tipo] com [Quartos] quartos, [Area]m², [Vagas] vaga(s) no [Bairro], Curitiba. [Primeiros 100 chars da descrição]"
og:image: [FotoDestaque]
```

### Landing por bairro
```
title: "Imóveis à Venda no [Bairro], Curitiba | FYMOOB"
description: "Encontre [N] imóveis à venda no [Bairro], Curitiba. Apartamentos a partir de R$ [Menor]. Casas, sobrados e mais."
```

### Landing por tipo
```
title: "Apartamentos à Venda em Curitiba | FYMOOB"
description: "Veja [N] apartamentos à venda em Curitiba. Preços de R$ [Menor] a R$ [Maior]. Bairros: [Top 3 bairros]."
```

### Blog
```
title: "[Título do artigo] | Blog FYMOOB"
description: "[Primeiros 155 chars do artigo]"
```

## Sitemap — Prioridades
| Tipo de página | Priority | changefreq |
|----------------|----------|------------|
| Home | 1.0 | daily |
| Imóvel individual | 0.8 | weekly |
| Landing por bairro | 0.7 | weekly |
| Landing por tipo | 0.7 | weekly |
| Blog | 0.6 | monthly |
| Sobre/Contato | 0.3 | monthly |

## robots.txt
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /favoritos
Disallow: /comparar

Sitemap: https://fymoob.com/sitemap.xml
```

## Campos API Loft → SEO Mapping
| Campo Loft | Uso SEO |
|------------|---------|
| Descricao | meta description (truncar 155 chars) + conteúdo da página |
| Categoria + Bairro + Cidade | title tag |
| ValorVenda / ValorLocacao | schema offers.price |
| FotoDestaque | og:image |
| Endereco + Lat + Long | schema address + geo |
| Dormitorio, Suites, Vagas, Area | schema numberOfRooms, floorSize |
| DataCadastro / DataAtualizacao | schema datePosted + sitemap lastmod |
| Codigo | slug + canonical URL |

## Bairros com Imóveis (para landing pages)
Baseado nos dados do scraper, os bairros com imóveis ativos incluem:
Batel, Água Verde, Ecoville, Mossunguê, Novo Mundo, Portão, Bigorrilho,
Centro, Campina do Siqueira, Uberaba, Umbará, Tatuquara, Sítio Cercado,
Cidade Industrial, Santa Quitéria, Xaxim, Mercês, Cabral, Seminário,
Campo Comprido, São Miguel, entre outros.

Regra: só criar landing page se o bairro tiver >= 3 imóveis ativos.

## Metas de Performance
| Métrica | Meta 6 meses | Meta 12 meses |
|---------|-------------|--------------|
| Páginas indexadas | 300+ | 500+ |
| Tráfego orgânico/mês | 150-300 | 300-500+ |
| Leads orgânicos/mês | 5-10 | 10-20 |
| Core Web Vitals (LCP) | < 2.5s | < 2.0s |
| Keywords ranqueando | 100+ | 300+ |