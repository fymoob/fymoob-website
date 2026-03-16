# Plano de Sprints — FYMOOB

## Visão Geral
- **Duração total:** 5-6 semanas (full-time) / 12 semanas (meio período)
- **Fases:** 8 (Fase 0-7)
- **Dependência de API Loft:** apenas Fase 5
- **~70% do projeto executável sem chave da API**

## Status
- [x] Fase 0 — Fundação
- [x] Fase 1 — Páginas de imóvel
- [x] Fase 2 — Listagens e landing pages
- [x] Fase 3 — SEO técnico
- [x] Fase 4 — Blog e conteúdo
- [ ] Fase 5 — API Loft real
- [ ] Fase 6 — Institucional e polish
- [ ] Fase 7 — QA e deploy

---

## Fase 0 — Fundação (Sprint 1, ~2 dias)
**Objetivo:** Projeto base rodando com dados mockados.
**Depende de API:** Não

### Tarefas
- [x] `create-next-app` com App Router, TypeScript, Tailwind (com `src/` directory)
- [x] `npx shadcn@latest init` (estilo: New York, cor base: Zinc, CSS variables: yes)
- [x] Instalar componentes shadcn: button, card, input, select, badge, separator, dialog, sheet, carousel, tabs, accordion, form, label, textarea, breadcrumb, dropdown-menu, navigation-menu, skeleton
- [x] Configurar fontes: Poppins + Inter via `next/font/google`
- [x] Configurar design tokens FYMOOB azul (#29ABE2) em `globals.css` (ver `.claude/skills/frontend-design/SKILL.md`)
- [x] Configurar `tailwind.config.ts` com cores fymoob e fontFamily
- [x] Estrutura de pastas: `src/app`, `src/lib`, `src/services`, `src/types`, `src/components/{ui,layout,property,search,seo,shared}`
- [x] Mover `data/mock-properties.json` para raiz (já existe do scraper — validar formato)
- [x] Definir types em `src/types/property.ts` baseado nos campos do mock-properties.json
- [x] Criar `src/services/loft.ts` com abstração (lê mock agora, API depois)
- [x] Funções do service: `getProperties()`, `getPropertyBySlug()`, `getPropertiesByBairro()`, `getPropertiesByType()`, `getAllBairros()`, `getAllTypes()`
- [x] Configurar `.env.local` baseado no `.env.example`
- [x] Configurar `next.config.ts` (domínios de imagem: cdn.vistahost.com.br, ppbxdsyojwqujdrmnxdv.storage.sa-east-1.nhost.run)
- [x] Criar `src/lib/utils.ts` (cn utility do shadcn + formatPrice, slugify, generatePropertySlug)
- [x] Criar `src/lib/seo.ts` (generatePropertySchema, generateBreadcrumbs, generateOrganizationSchema)
- [x] `src/app/layout.tsx` — Layout raiz com: fontes, Tailwind, Header placeholder, Footer placeholder
- [x] Salvar logo FYMOOB em `public/logo.svg` (SVG placeholder)

### Critério de aceite
- `npm run dev` roda sem erros
- `getProperties()` retorna os 244 imóveis mockados
- `getPropertyBySlug('apartamento-batel-curitiba-pr-263m2-69803405')` retorna o imóvel correto
- Types cobrem todos os campos da API Loft

---

## Fase 1 — Páginas de Imóvel Individual (Sprint 1-2, ~3 dias)

### Sessão 1A — Layout e componentes
**Objetivo:** Página `/imovel/[slug]` funcional com todos os componentes.
**Depende de API:** Não

#### Tarefas
- [x] `src/app/imovel/[slug]/page.tsx` com `generateStaticParams()`
- [x] `src/components/property/PropertyGallery.tsx` (Carousel shadcn + Dialog lightbox + thumbnails)
- [x] `src/components/property/PropertyDetails.tsx` (preço azul, tipo, quartos, área, vagas — ícones azuis)
- [x] `src/components/property/PropertyDescription.tsx` (descrição completa)
- [x] `src/components/property/PropertyContact.tsx` (Form proposta: nome, email, tel, dúvidas + botão azul)
- [x] `src/components/property/PropertyMap.tsx` (OpenStreetMap embed via iframe no accordion)
- [x] `src/components/property/PropertyCharacteristics.tsx` (Accordion shadcn — "Características", "Mapa")
- [x] `src/components/property/PropertyCard.tsx` (Card com overlay badges + carousel por card)
- [x] `src/components/property/PropertyCardFeatured.tsx` (Card grande: imagem esquerda + info direita)
- [x] `src/components/property/SimilarProperties.tsx` (grid de cards semelhantes)
- [x] `src/components/shared/PriceDisplay.tsx` (preço em azul FYMOOB)
- [x] `src/components/shared/PropertyBadge.tsx` (Badge azul: Apartamento, Venda, Cód)
- [x] `src/components/shared/PropertyFeatures.tsx` (ícones azuis: quartos, vagas, área, banheiros)
- [x] `src/components/shared/WhatsAppButton.tsx` (bg verde #25D366 + ícone)
- [x] `src/components/layout/WhatsAppFloat.tsx` (botão flutuante fixed bottom-right)
- [x] ISR configurado com `revalidate: 3600`

#### Critério de aceite
- Navegando para `/imovel/[slug]` mostra página completa com dados do mock
- `npm run build` gera 244 páginas estáticas sem erros
- Layout responsivo (mobile + desktop)

### Sessão 1B — SEO da página de imóvel
**Objetivo:** Meta tags e schema markup completos.
**Depende de API:** Não

#### Tarefas
- [x] `generateMetadata()` com title, description, og:image dinâmicos
- [x] Title format: "[Tipo] [Quartos] Quartos à Venda no [Bairro] | R$ [Preço] | FYMOOB"
- [x] JSON-LD `RealEstateListing` com: name, description, offers.price, address, geo, numberOfRooms, floorSize
- [x] Componente `Breadcrumbs` com schema `BreadcrumbList`
- [x] Canonical URL configurada
- [x] Open Graph tags (og:title, og:description, og:image, og:type)

#### Critério de aceite
- Google Rich Results Test passa sem erros para qualquer página de imóvel
- View source mostra HTML completo (não "Carregando...")
- Cada página tem title e description únicos

---

## Fase 2 — Listagens e Landing Pages (Sprint 2-3, ~4 dias)

### Sessão 2A — Home e busca
**Objetivo:** Home page e página de busca funcional.
**Depende de API:** Não

#### Tarefas
- [x] `src/app/page.tsx` — Home com: hero, destaques, lançamentos, bairros em destaque
- [x] `src/app/busca/page.tsx` — SSR com filtros (tipo, bairro, preço, quartos)
- [x] Componente `SearchFilters` (sidebar ou top bar com filtros)
- [x] Componente `PropertyGrid` (grid de PropertyCards com paginação)
- [x] Componente `BairroCard` (card de bairro para home)
- [x] `generateMetadata()` dinâmico para busca baseado nos filtros

#### Critério de aceite
- Home mostra imóveis em destaque
- `/busca?tipo=apartamento&bairro=batel` filtra corretamente
- Paginação funciona

### Sessão 2B — Landing pages geográficas e por tipo
**Objetivo:** As páginas que geram as 500-1500 URLs indexáveis.
**Depende de API:** Não

#### Tarefas
- [x] `src/app/imoveis/[bairro]/page.tsx` — Landing por bairro
- [x] `src/app/apartamentos-curitiba/page.tsx` — Landing por tipo (estática)
- [x] `src/app/casas-curitiba/page.tsx` — Landing por tipo (estática)
- [x] `src/app/sobrados-curitiba/page.tsx` — Landing por tipo (estática)
- [x] `src/app/terrenos-curitiba/page.tsx` — Landing por tipo (estática)
- [x] `src/app/imoveis/[bairro]/[tipo]/page.tsx` — Landing combinada (bairro+tipo)
- [x] `generateStaticParams()` gerando todas as combinações válidas (mín. 3 imóveis por página)
- [x] `generateMetadata()` para cada landing page
- [x] Conteúdo automático por página: contagem de imóveis, faixa de preço, preço médio/m²
- [x] Linkagem interna entre páginas relacionadas

#### Critério de aceite
- `/imoveis/batel` mostra todos os imóveis do Batel com meta tags únicos
- `/apartamentos-curitiba` lista todos os apartamentos
- `/imoveis/batel/apartamentos` lista apartamentos no Batel
- `npm run build` gera 500+ páginas sem erros
- Nenhuma página tem menos de 3 imóveis (sem thin content)

---

## Fase 3 — SEO Técnico e Infraestrutura (Sprint 3, ~2 dias)
**Objetivo:** Tudo que o Google precisa para indexar corretamente.
**Depende de API:** Não

### Tarefas
- [x] `src/app/sitemap.ts` — Sitemap dinâmico com todas as páginas
- [x] `src/app/robots.ts` — Allow all exceto /api, /favoritos, /comparar
- [x] Schema `Organization` no layout raiz (nome, CRECI, endereço, telefone, logo)
- [x] Schema `LocalBusiness` no layout raiz (coordenadas, horário)
- [x] Canonical URLs em todas as páginas
- [x] Componente `<OptimizedImage />` wrapper do Next Image com alt automático
- [x] Headers de segurança via `next.config.ts` (X-Frame-Options, CSP básico)
- [x] Favicon e manifest.json em `/public`
- [x] Verificar que TODOS os remotePatterns de imagem estão configurados

### Critério de aceite
- `/sitemap.xml` lista 500+ URLs com lastmod
- `/robots.txt` está correto
- Lighthouse SEO score > 95 na home
- Rich Results Test passa para Organization e LocalBusiness

---

## Fase 4 — Blog e Conteúdo (Sprint 3-4, ~2 dias)
**Objetivo:** Blog funcional com artigos iniciais.
**Depende de API:** Não

### Tarefas
- [x] `src/app/blog/page.tsx` — Lista de artigos
- [x] `src/app/blog/[slug]/page.tsx` — Página de artigo
- [x] Sistema de conteúdo via MDX (arquivos em `/content/blog/`)
- [x] Schema `BlogPosting` em cada artigo
- [x] `generateMetadata()` para cada artigo
- [x] 5 artigos iniciais:
  - [x] "Melhores bairros para morar em Curitiba em 2026"
  - [x] "Como financiar seu imóvel pelo Minha Casa Minha Vida"
  - [x] "Documentos necessários para comprar imóvel em Curitiba"
  - [x] "Guia completo: apartamento ou casa em Curitiba?"
  - [x] "Quanto custa morar no Batel, Curitiba"
- [x] `src/app/faq/page.tsx` com schema `FAQPage`
- [x] Linkagem interna: blog → bairros → imóveis

### Critério de aceite
- `/blog` lista os 5 artigos
- Cada artigo tem schema BlogPosting válido
- FAQ tem schema FAQPage válido

---

## Fase 5 — Integração Real com API Loft (Sprint 4, ~2 dias)
**Objetivo:** Trocar mocks por dados reais do CRM.
**Depende de API:** ⚠️ SIM — precisa da chave

### Tarefas
- [ ] Configurar `LOFT_API_KEY` no `.env.local`
- [ ] Ajustar `services/loft.ts` para chamar API REST real
- [ ] Mapear campos reais → types (ajustar nomes se diferente do mock)
- [ ] Implementar paginação da API (max 50/request)
- [ ] Criar `src/app/api/webhooks/loft/route.ts` para revalidação on-demand
- [ ] Testar fluxo: imóvel atualizado no CRM → webhook → página regenerada
- [ ] Criar `src/app/api/revalidate/route.ts` como fallback manual
- [ ] Ajustar remotePatterns das imagens se URLs mudarem

### Critério de aceite
- Site carrega dados reais do CRM Loft
- Webhook de revalidação funciona
- Novo imóvel no CRM aparece no site em < 5 minutos

---

## Fase 6 — Institucional e Polish (Sprint 4-5, ~2 dias)
**Objetivo:** Páginas finais e ajustes de design.
**Depende de API:** Não (parcialmente)

### Tarefas
- [ ] `src/app/sobre/page.tsx` — Sobre nós com foto equipe, CRECI, história
- [ ] `src/app/contato/page.tsx` — Formulário de contato (integra com CRM se possível)
- [ ] `src/app/anuncie/page.tsx` — Página para anunciar imóvel
- [ ] Header e Footer definitivos com navegação completa
- [ ] Design responsivo — teste em mobile, tablet, desktop
- [ ] Loading states e skeleton loaders
- [ ] Error boundaries e 404 customizado
- [ ] Analytics: Google Analytics 4 + evento de lead

### Critério de aceite
- Todas as páginas navegáveis
- Formulário de contato funciona
- Responsivo em todos os breakpoints

---

## Fase 7 — QA, Deploy e Go-Live (Sprint 5, ~2 dias)
**Objetivo:** Site no ar, indexado pelo Google.
**Depende de API:** Sim

### Tarefas
- [ ] Deploy na Vercel com domínio fymoob.com
- [ ] Configurar DNS do domínio
- [ ] Submeter sitemap no Google Search Console
- [ ] Verificar propriedade no Search Console
- [ ] Configurar Google Business Profile com fotos e horários
- [ ] Lighthouse em todas as páginas-chave (>90 performance, >95 SEO)
- [ ] Rich Results Test em 5+ páginas representativas
- [ ] Testar todos os formulários de contato
- [ ] Configurar redirects do site antigo (se URLs mudaram)
- [ ] Monitorar indexação nos primeiros 7 dias

### Critério de aceite
- Site live em fymoob.com
- Sitemap submetido no Search Console
- Google Business Profile configurado
- Zero erros no Search Console
- Lighthouse: Performance >90, SEO >95

---

## Notas de Execução

### Gestão de Contexto (Claude Code)
- Usar `/clear` entre fases
- Usar `/project:resume` no início e `/project:checkpoint` no final de cada sessão
- Usar subagentes para investigação (não polui contexto principal)
- Skills em `.claude/skills/` para padrões reutilizáveis (API Loft, schema markup)

### Prioridade de Entrega
1. Páginas de imóvel com SEO (maior impacto de indexação)
2. Landing pages por bairro/tipo (volume de páginas)
3. Sitemap + robots (Google encontra as páginas)
4. Blog (tráfego informacional)
5. Integração API real (dados ao vivo)
6. Polish e institucional (conversão)

### Riscos
- **API Loft com campos diferentes do esperado:** Mitigação: mock data cobre o desenvolvimento, ajuste é rápido
- **Cliente demora para enviar chave:** Mitigação: 70% do projeto independe da chave
- **Volume de páginas combinadas gera thin content:** Mitigação: mínimo de 3 imóveis por landing page
- **Imagens do CDN Vistahost lentas:** Mitigação: Next Image com otimização automática