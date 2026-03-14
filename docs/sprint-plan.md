# Plano de Sprints — FYMOOB

## Visão Geral
- **Duração total:** 5-6 semanas (full-time) / 12 semanas (meio período)
- **Fases:** 8 (Fase 0-7)
- **Dependência de API Loft:** apenas Fase 5
- **~70% do projeto executável sem chave da API**

## Status
- [ ] Fase 0 — Fundação
- [ ] Fase 1 — Páginas de imóvel
- [ ] Fase 2 — Listagens e landing pages
- [ ] Fase 3 — SEO técnico
- [ ] Fase 4 — Blog e conteúdo
- [ ] Fase 5 — API Loft real
- [ ] Fase 6 — Institucional e polish
- [ ] Fase 7 — QA e deploy

---

## Fase 0 — Fundação (Sprint 1, ~2 dias)
**Objetivo:** Projeto base rodando com dados mockados.
**Depende de API:** Não

### Tarefas
- [ ] `create-next-app` com App Router, TypeScript, Tailwind (com `src/` directory)
- [ ] Estrutura de pastas: `src/app`, `src/lib`, `src/services`, `src/types`, `src/components`
- [ ] Mover `data/mock-properties.json` para raiz (já existe do scraper — validar formato)
- [ ] Definir types em `src/types/property.ts` baseado nos campos do mock-properties.json
- [ ] Criar `src/services/loft.ts` com abstração (lê mock agora, API depois)
- [ ] Funções do service: `getProperties()`, `getPropertyBySlug()`, `getPropertiesByBairro()`, `getPropertiesByType()`, `getAllBairros()`, `getAllTypes()`
- [ ] Configurar `.env.local` baseado no `.env.example`
- [ ] Configurar `next.config.ts` (domínios de imagem: cdn.vistahost.com.br, ppbxdsyojwqujdrmnxdv.storage.sa-east-1.nhost.run)
- [ ] Criar `src/lib/utils.ts` (formatPrice, slugify, generatePropertySlug)
- [ ] Criar `src/lib/seo.ts` (generatePropertySchema, generateBreadcrumbs, generateOrganizationSchema)
- [ ] `src/app/layout.tsx` — Layout raiz com: fontes, Tailwind, header placeholder, footer placeholder
- [ ] Configurar Tailwind com palette de cores do projeto

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
- [ ] `src/app/imovel/[slug]/page.tsx` com `generateStaticParams()`
- [ ] Componente `PropertyGallery` (galeria de fotos com lightbox)
- [ ] Componente `PropertyDetails` (preço, tipo, quartos, área, vagas)
- [ ] Componente `PropertyDescription` (descrição completa)
- [ ] Componente `PropertyContact` (formulário de contato / WhatsApp)
- [ ] Componente `PropertyMap` (localização — pode ser estático inicialmente)
- [ ] Componente `PropertyCard` (card reutilizável para listagens)
- [ ] Componente `SimilarProperties` (imóveis semelhantes)
- [ ] ISR configurado com `revalidate: 3600`

#### Critério de aceite
- Navegando para `/imovel/[slug]` mostra página completa com dados do mock
- `npm run build` gera 244 páginas estáticas sem erros
- Layout responsivo (mobile + desktop)

### Sessão 1B — SEO da página de imóvel
**Objetivo:** Meta tags e schema markup completos.
**Depende de API:** Não

#### Tarefas
- [ ] `generateMetadata()` com title, description, og:image dinâmicos
- [ ] Title format: "[Tipo] [Quartos] Quartos à Venda no [Bairro] | R$ [Preço] | FYMOOB"
- [ ] JSON-LD `RealEstateListing` com: name, description, offers.price, address, geo, numberOfRooms, floorSize
- [ ] Componente `Breadcrumbs` com schema `BreadcrumbList`
- [ ] Canonical URL configurada
- [ ] Open Graph tags (og:title, og:description, og:image, og:type)

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
- [ ] `src/app/page.tsx` — Home com: hero, destaques, lançamentos, bairros em destaque
- [ ] `src/app/busca/page.tsx` — SSR com filtros (tipo, bairro, preço, quartos)
- [ ] Componente `SearchFilters` (sidebar ou top bar com filtros)
- [ ] Componente `PropertyGrid` (grid de PropertyCards com paginação)
- [ ] Componente `BairroCard` (card de bairro para home)
- [ ] `generateMetadata()` dinâmico para busca baseado nos filtros

#### Critério de aceite
- Home mostra imóveis em destaque
- `/busca?tipo=apartamento&bairro=batel` filtra corretamente
- Paginação funciona

### Sessão 2B — Landing pages geográficas e por tipo
**Objetivo:** As páginas que geram as 500-1500 URLs indexáveis.
**Depende de API:** Não

#### Tarefas
- [ ] `src/app/imoveis/[bairro]/page.tsx` — Landing por bairro
- [ ] `src/app/apartamentos-curitiba/page.tsx` — Landing por tipo (estática)
- [ ] `src/app/casas-curitiba/page.tsx` — Landing por tipo (estática)
- [ ] `src/app/sobrados-curitiba/page.tsx` — Landing por tipo (estática)
- [ ] `src/app/terrenos-curitiba/page.tsx` — Landing por tipo (estática)
- [ ] `src/app/imoveis/[bairro]/[tipo]/page.tsx` — Landing combinada (bairro+tipo)
- [ ] `generateStaticParams()` gerando todas as combinações válidas (mín. 3 imóveis por página)
- [ ] `generateMetadata()` para cada landing page
- [ ] Conteúdo automático por página: contagem de imóveis, faixa de preço, preço médio/m²
- [ ] Linkagem interna entre páginas relacionadas

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
- [ ] `src/app/sitemap.ts` — Sitemap dinâmico com todas as páginas
- [ ] `src/app/robots.ts` — Allow all exceto /api, /favoritos, /comparar
- [ ] Schema `Organization` no layout raiz (nome, CRECI, endereço, telefone, logo)
- [ ] Schema `LocalBusiness` no layout raiz (coordenadas, horário)
- [ ] Canonical URLs em todas as páginas
- [ ] Componente `<OptimizedImage />` wrapper do Next Image com alt automático
- [ ] Headers de segurança via `next.config.ts` (X-Frame-Options, CSP básico)
- [ ] Favicon e manifest.json em `/public`
- [ ] Verificar que TODOS os remotePatterns de imagem estão configurados

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
- [ ] `src/app/blog/page.tsx` — Lista de artigos
- [ ] `src/app/blog/[slug]/page.tsx` — Página de artigo
- [ ] Sistema de conteúdo via MDX (arquivos em `/content/blog/`)
- [ ] Schema `BlogPosting` em cada artigo
- [ ] `generateMetadata()` para cada artigo
- [ ] 5 artigos iniciais:
  - [ ] "Melhores bairros para morar em Curitiba em 2026"
  - [ ] "Como financiar seu imóvel pelo Minha Casa Minha Vida"
  - [ ] "Documentos necessários para comprar imóvel em Curitiba"
  - [ ] "Guia completo: apartamento ou casa em Curitiba?"
  - [ ] "Quanto custa morar no Batel, Curitiba"
- [ ] `src/app/faq/page.tsx` com schema `FAQPage`
- [ ] Linkagem interna: blog → bairros → imóveis

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