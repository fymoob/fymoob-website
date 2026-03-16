# Session Log — FYMOOB

Registro de progresso do projeto. Atualizado automaticamente via `/project:checkpoint`.

---

<!-- Novas sessões são adicionadas no topo -->

## Sessão 2026-03-14 (5)
**Fase:** 4 — Blog e Conteúdo
**Tarefas concluídas:**
- Blog types: `src/types/blog.ts` (BlogFrontmatter, BlogPost interfaces)
- Blog service: `src/services/blog.ts` (getAllPosts, getPostBySlug, getAllSlugs, getRecentPosts, getRelatedPosts — fs + gray-matter)
- SEO schemas: generateBlogPostingSchema() + generateFAQPageSchema() adicionados a seo.ts
- MDX components: `src/lib/mdx-components.tsx` (h2, h3, p, a, ul, ol, li, blockquote, table, th, td, img, strong + CTABox)
- Blog components: BlogCard (imagem, título, descrição, data, reading time, tags), RelatedPosts (grid 3 posts)
- Blog listing page: `src/app/blog/page.tsx` com generateMetadata, Breadcrumbs, canonical /blog
- Blog article page: `src/app/blog/[slug]/page.tsx` com generateStaticParams, generateMetadata, JSON-LD BlogPosting, MDXRemote, RelatedPosts
- 5 artigos MDX em `content/blog/`:
  - `melhores-bairros-curitiba-2026.mdx` (~1800 palavras, links para /imoveis/portao, /apartamentos-curitiba, /casas-curitiba, /sobrados-curitiba)
  - `como-financiar-minha-casa-minha-vida.mdx` (~1500 palavras, links para /busca, /imoveis/portao, blog cruzado)
  - `documentos-comprar-imovel-curitiba.mdx` (~1200 palavras, links para /contato, /busca, blog cruzado)
  - `apartamento-ou-casa-curitiba.mdx` (~1500 palavras, links para /apartamentos-curitiba, /casas-curitiba, /sobrados-curitiba)
  - `quanto-custa-morar-batel-curitiba.mdx` (~1500 palavras, links para /imoveis/portao, /apartamentos-curitiba, /casas-curitiba)
- 5 placeholder images SVG em `public/blog/` (1200x630, FYMOOB blue background)
- FAQ data: `src/data/faq-data.ts` (19 perguntas em 5 categorias: fymoob, compra, aluguel, financiamento, documentação)
- FAQ page: `src/app/faq/page.tsx` com Accordion shadcn, generateMetadata, JSON-LD FAQPage, Breadcrumbs
- Sitemap atualizado: blog listing + 5 artigos + FAQ
- Header atualizado: link "Blog" adicionado ao navLinks
- Home page atualizada: seção "Do Blog" com 3 posts recentes via BlogCard

**Arquivos criados:**
- `src/types/blog.ts`
- `src/services/blog.ts`
- `src/lib/mdx-components.tsx`
- `src/components/blog/BlogCard.tsx`
- `src/components/blog/RelatedPosts.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/data/faq-data.ts`
- `src/app/faq/page.tsx`
- `content/blog/melhores-bairros-curitiba-2026.mdx`
- `content/blog/como-financiar-minha-casa-minha-vida.mdx`
- `content/blog/documentos-comprar-imovel-curitiba.mdx`
- `content/blog/apartamento-ou-casa-curitiba.mdx`
- `content/blog/quanto-custa-morar-batel-curitiba.mdx`
- `public/blog/melhores-bairros-curitiba.jpg` (SVG placeholder)
- `public/blog/financiamento-mcmv.jpg` (SVG placeholder)
- `public/blog/documentos-compra-imovel.jpg` (SVG placeholder)
- `public/blog/apartamento-ou-casa.jpg` (SVG placeholder)
- `public/blog/custo-morar-batel.jpg` (SVG placeholder)

**Arquivos modificados:**
- `src/lib/seo.ts` — generateBlogPostingSchema + generateFAQPageSchema
- `src/app/sitemap.ts` — blog + FAQ URLs
- `src/components/layout/Header.tsx` — Blog nav link
- `src/app/page.tsx` — seção "Do Blog" com 3 posts recentes
- `package.json` — next-mdx-remote + gray-matter dependencies

**Decisões:**
- MDX via next-mdx-remote/rsc (Server Components, sem client-side hydration)
- FAQ sem MDX (perguntas curtas, dados em TypeScript + Accordion shadcn)
- Blog images como SVG placeholders (.jpg extension) até imagens reais serem fornecidas
- CTABox component inline nos artigos para conversão (link para /contato ou /busca)

**Build:** 267 páginas geradas (260 + 5 blog + blog listing + FAQ), 0 erros, lint limpo

**Próxima tarefa:**
- Fase 5 — Integração API Loft real (precisa chave API)
- Ou Fase 6 — Institucional e Polish (sobre, contato, anuncie, 404 customizado, analytics)

---

## Sessão 2026-03-14 (4)
**Fase:** 3 — SEO Técnico
**Tarefas concluídas:**
- `src/app/sitemap.ts` — Sitemap dinâmico com todas as URLs (home, busca, 4 tipos estáticos, bairros, bairro+tipo combinadas, 244 imóveis)
- `src/app/robots.ts` — Allow all exceto /api/, /favoritos, /comparar; inclui link para sitemap
- Schema `Organization` atualizado em seo.ts (endereço completo, CRECI, 2 telefones, email real)
- Schema `LocalBusiness` (RealEstateAgent) adicionado em seo.ts (geo coords, horário seg-sex 9-18, sáb 9-13, priceRange)
- Layout raiz atualizado com ambos schemas JSON-LD (Organization + LocalBusiness)
- Headers de segurança em next.config.ts (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control)
- Favicon SVG via src/app/icon.svg (auto-served pelo App Router)
- manifest (public/site.webmanifest) com branding FYMOOB (#29ABE2)
- Manifest link + msapplication-TileColor adicionados ao metadata do layout
- Componente OptimizedImage (src/components/shared/OptimizedImage.tsx) — wrapper do Next Image com alt automático via propertyInfo
- Canonical URLs adicionadas a TODAS as 9 páginas (home, busca, bairro, bairro+tipo, apartamentos, casas, sobrados, terrenos + imovel já tinha)

**Arquivos criados:**
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/icon.svg`
- `public/site.webmanifest`
- `src/components/shared/OptimizedImage.tsx`

**Arquivos modificados:**
- `src/lib/seo.ts` — Organization schema expandido + generateLocalBusinessSchema() adicionado
- `src/app/layout.tsx` — LocalBusiness schema, manifest link, msapplication-TileColor
- `next.config.ts` — security headers via async headers()
- `src/app/page.tsx` — canonical URL
- `src/app/busca/page.tsx` — canonical URL
- `src/app/imoveis/[bairro]/page.tsx` — canonical URL
- `src/app/imoveis/[bairro]/[tipo]/page.tsx` — canonical URL
- `src/app/apartamentos-curitiba/page.tsx` — canonical URL
- `src/app/casas-curitiba/page.tsx` — canonical URL
- `src/app/sobrados-curitiba/page.tsx` — canonical URL
- `src/app/terrenos-curitiba/page.tsx` — canonical URL

**Build:** 260 páginas geradas, 0 erros, lint limpo (2 warnings pré-existentes)

**Próxima tarefa:**
- Fase 3 restante: verificar se falta algo (favicon PNG para PWA icons 192/512 — placeholder por enquanto)
- Fase 4 — Blog e Conteúdo: sistema MDX, 5 artigos, FAQ com schema FAQPage

---

## Sessão 2026-03-14 (3)
**Fase:** 2 — Listagens e Landing Pages
**Tarefas concluídas:**
- Service layer: getFeaturedProperties(), getPropertyStats() adicionados a loft.ts
- SEO helpers: generateLandingTitle(), generateLandingDescription(), generateItemListSchema() adicionados a seo.ts
- Componente SearchBar (client) — 3 selects inline + botão buscar, hero search form
- Componente BairroCard (server) — card com gradiente azul, link para landing do bairro
- Componente PropertyGrid (server) — grid responsivo 1→2→3→4 colunas
- Componente SearchFilters (client) — 6 filtros (tipo, finalidade, bairro, quartos, preço, ordenação)
- Home page reescrita: hero com SearchBar, oportunidade destaque, destaques lançamento, bairros em destaque, buscar por tipo
- Página /busca (SSR): filtros via searchParams, paginação, counter de resultados, generateMetadata dinâmico
- Landing /imoveis/[bairro] (SSG): stats, faixa de preço, preço médio, links para subpáginas por tipo
- Landing /imoveis/[bairro]/[tipo] (SSG): combinada bairro+tipo, mín 3 imóveis, linkagem interna
- Landing /apartamentos-curitiba: página estática com SEO text, links para bairros
- Landing /casas-curitiba: página estática com SEO text, links para bairros
- Landing /sobrados-curitiba: página estática com SEO text, links para bairros
- Landing /terrenos-curitiba: página estática com SEO text, links para bairros
- Todas as landing pages com generateMetadata(), JSON-LD ItemList, Breadcrumbs

**Arquivos criados:**
- `src/components/search/SearchBar.tsx`
- `src/components/search/SearchFilters.tsx`
- `src/components/search/PropertyGrid.tsx`
- `src/components/search/BairroCard.tsx`
- `src/app/busca/page.tsx`
- `src/app/imoveis/[bairro]/page.tsx`
- `src/app/imoveis/[bairro]/[tipo]/page.tsx`
- `src/app/apartamentos-curitiba/page.tsx`
- `src/app/casas-curitiba/page.tsx`
- `src/app/sobrados-curitiba/page.tsx`
- `src/app/terrenos-curitiba/page.tsx`

**Arquivos modificados:**
- `src/app/page.tsx` — reescrita completa da home page
- `src/services/loft.ts` — getFeaturedProperties, getPropertyStats
- `src/lib/seo.ts` — landing page SEO helpers

**Decisões:**
- Native HTML selects em vez de shadcn Select (base-ui) para SearchBar/Filters — mais simples, acessível e confiável
- Paginação server-side via searchParams (não client-side) para SEO
- Landing combinadas só geradas com ≥3 imóveis (evita thin content)
- Tipo slug pattern: plural + "-curitiba" para estáticas, plural simples para combinadas (e.g., /imoveis/portao/apartamentos)

**Build:** 257 páginas geradas (244 imóveis + 1 home + 1 busca + 1 bairro + 3 bairro/tipo + 4 tipo + 1 not-found + extras)

**Próxima tarefa:**
- Fase 3 — SEO Técnico: sitemap.ts, robots.ts, favicon, manifest.json, headers de segurança

---

## Sessão 2026-03-14 (2)
**Fase:** 1 — Páginas de Imóvel (Sessão 1A)
**Tarefas concluídas:**
- Shared components: PriceDisplay, PropertyBadge, PropertyFeatures, WhatsAppButton
- Layout components: Header (client, nav + mobile Sheet), Footer (4 colunas), WhatsAppFloat (fixed button)
- Layout raiz atualizado com Header, Footer e WhatsAppFloat
- SEO: Breadcrumbs com schema BreadcrumbList
- Property components: PropertyGallery (carousel + lightbox), PropertyDetails, PropertyDescription, PropertyContact (form), PropertyCharacteristics (accordion com mapa OpenStreetMap), PropertyCard, PropertyCardFeatured, SimilarProperties
- Página `/imovel/[slug]` com generateStaticParams, generateMetadata, JSON-LD RealEstateListing, canonical URL, ISR revalidate 3600
- Service: getSimilarProperties() e getAllSlugs() adicionados ao loft.ts

**Arquivos criados/modificados:**
- `src/components/shared/PriceDisplay.tsx`
- `src/components/shared/PropertyBadge.tsx`
- `src/components/shared/PropertyFeatures.tsx`
- `src/components/shared/WhatsAppButton.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/WhatsAppFloat.tsx`
- `src/components/seo/Breadcrumbs.tsx`
- `src/components/property/PropertyGallery.tsx`
- `src/components/property/PropertyDetails.tsx`
- `src/components/property/PropertyDescription.tsx`
- `src/components/property/PropertyContact.tsx`
- `src/components/property/PropertyCharacteristics.tsx`
- `src/components/property/PropertyCard.tsx`
- `src/components/property/PropertyCardFeatured.tsx`
- `src/components/property/SimilarProperties.tsx`
- `src/app/imovel/[slug]/page.tsx`
- `src/app/layout.tsx` — atualizado com Header, Footer, WhatsAppFloat
- `src/services/loft.ts` — getSimilarProperties, getAllSlugs adicionados

**Build:** 248 páginas geradas (244 imóveis + extras), lint sem erros

**Próxima tarefa:**
- Fase 1 — Sessão 1B: SEO da página de imóvel (já parcialmente coberto: generateMetadata, JSON-LD, Breadcrumbs estão feitos)
- Revisar e validar: title format, canonical, Open Graph
- Fase 2 — Home page e busca

---

## Sessão 2026-03-14
**Fase:** 0 — Fundação
**Tarefas concluídas:**
- Scaffold Next.js 16.1.6 com App Router, TypeScript, Tailwind v4
- Inicialização shadcn/ui v4 (17 componentes instalados)
- Design tokens FYMOOB integrados via CSS (`@theme inline` — Tailwind v4)
- Configuração next.config.ts com remotePatterns (cdn.vistahost, nhost storage)
- Criação .env.local a partir do .env.example
- Estrutura de pastas completa (layout, property, search, seo, shared, services, types)
- Types definidos em src/types/property.ts (Property, PropertyFilters, BairroSummary, etc.)
- Service layer em src/services/loft.ts (6 funções, lê mock JSON)
- Utilidades em src/lib/utils.ts (formatPrice, slugify, formatArea, generateImageAlt, etc.)
- SEO helpers em src/lib/seo.ts (Organization, Property, Breadcrumb schemas)
- Layout raiz com Poppins+Inter, metadata base, JSON-LD Organization
- Página home placeholder com dashboard de stats (244 imóveis, bairros, tipos)
- Logo SVG placeholder em public/logo.svg

**Arquivos criados/modificados:**
- `package.json` — fymoob, Next.js 16, shadcn deps
- `tsconfig.json` — gerado pelo create-next-app
- `eslint.config.mjs` — gerado
- `postcss.config.mjs` — Tailwind v4 postcss plugin
- `next.config.ts` — remotePatterns para CDN vistahost + nhost
- `src/app/globals.css` — FYMOOB tokens + shadcn vars (Tailwind v4 format)
- `src/app/layout.tsx` — Poppins+Inter, metadata, JSON-LD Organization
- `src/app/page.tsx` — Stats dashboard (total, bairros, tipos)
- `src/types/property.ts` — Property, PropertyFilters, BairroSummary, etc.
- `src/services/loft.ts` — 6 funções de acesso a dados (mock)
- `src/lib/utils.ts` — cn + formatPrice, slugify, formatArea, etc.
- `src/lib/seo.ts` — generateOrganizationSchema, generatePropertySchema, etc.
- `src/components/ui/*.tsx` — 17 componentes shadcn
- `.env.local` — vars de ambiente
- `public/logo.svg` — placeholder SVG
- `components.json` — config shadcn

**Decisões:**
- **Tailwind v4 (CSS-based):** create-next-app instalou Tailwind v4 — sem tailwind.config.ts, tudo via `@theme inline {}` no CSS
- **shadcn v4:** Usa @base-ui/react ao invés de Radix primitives
- **Next.js 16:** Versão mais recente gerada pelo create-next-app
- **Logo como SVG:** Placeholder em SVG ao invés de PNG, será substituído pelo logo real
- **Cores FYMOOB em hex direto:** Nos `:root` vars, mapeadas para shadcn semantic tokens (primary=#29ABE2)

**Próxima tarefa:**
- Fase 1 — Sessão 1A: Layout e componentes da página de imóvel individual (`/imovel/[slug]`)
- Construir Header e Footer definitivos
- Criar PropertyCard, PropertyGallery, PropertyDetails, PropertyContact
