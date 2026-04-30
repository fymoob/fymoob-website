# Playbook SEO FYMOOB — Estratégias Aplicadas e Validadas

**Versão:** 1.0
**Última atualização:** 2026-04-30
**Mantenedor:** Vinicius (dev) + Bruno (corretor responsável CRECI J 9420)

> Documento centralizado consolidando TODAS as estratégias SEO implementadas no
> site `fymoob.com.br` desde Fase 0 até Fase 19. Use como referência canônica
> quando criar novas páginas, novas funcionalidades ou auditar mudanças.
>
> **Princípio orientador:** SEO técnico bem feito + conteúdo denso + autoridade
> local construída ao longo do tempo. Não tentamos bater marketplaces (Viva Real,
> ZAP, Imovelweb) de cara — foco em cauda longa e bater regionais (Apolar,
> JBA, Isidório, Razzi) que têm SEO técnico fraco.

---

## 1. Arquitetura de URLs (Fase 8 — SEO Programático)

### URL Pattern por tipo de página

```
/                                    → Home
/imovel/[slug]                       → Página individual do imóvel (250+ URLs)
/imoveis/[bairro]                    → Landing por bairro (36 URLs ativas)
/imoveis/[bairro]/[tipo]             → Bairro + tipo (110+ URLs)
/imoveis/[bairro]/[finalidade]       → Bairro + venda/aluguel
/imoveis/[bairro]/[N]-quartos        → Bairro + N quartos
/imoveis/preco/[faixa]               → Faixas de preço (5 URLs)
/apartamentos-curitiba               → Landing tipo (estática)
/apartamentos-curitiba/[finalidade]  → Tipo + venda/aluguel
/casas-curitiba                      → idem casas
/sobrados-curitiba                   → idem sobrados
/terrenos-curitiba                   → idem terrenos
/empreendimento/[slug]               → Empreendimento individual
/empreendimentos                     → Listagem de empreendimentos
/lancamentos                         → Lançamentos
/blog                                → Listagem blog
/blog/[slug]                         → Posts blog (15 ativos)
/guia/[bairro]                       → Guia bairro (10 ativos com MDX)
/comprar-imovel-curitiba             → Pillar (priority 0.9)
/morar-em-curitiba                   → Pillar (priority 0.9)
/alugar-curitiba                     → Pillar (priority 0.9)
/autor/[slug] /autores/[slug]        → Páginas de autor (E-E-A-T)
/sobre /contato /anuncie /faq        → Institucionais
```

### Regras de URL
1. **Slugs em kebab-case** (`apartamentos-venda`, `cidade-industrial`)
2. **Sem extensões** (.html bloqueado)
3. **Sem trailing slash** (`/imoveis/portao` não `/imoveis/portao/`)
4. **Canonical sempre HTTPS** sem hash, sem params (exceto onde semanticamente válido)
5. **Slugs estáveis** — qualquer mudança requer 301 redirect (Fase 19 imóveis com área alterada)

### Sitemap shards (Fase 8.7)
```
/sitemap.xml             → index principal (gerado automaticamente)
/sitemap/0.xml           → 250+ imóveis individuais (priority 0.6)
/sitemap/1.xml           → bairros + combinações (110+ URLs, priority 0.6-0.8)
/sitemap/2.xml           → blog + guias + pillars (priority 0.6-0.9)
/sitemap/3.xml           → estáticas + empreendimentos (priority 0.5-0.9)
```

**Quality gates aplicados:**
- Bairros com <2 imóveis → não geram página (anti-thin content)
- Empreendimentos com layout editorial → priority 0.9 (vs 0.8 padrão)
- Pillars → priority 0.9 (alta autoridade)

---

## 2. Schema.org (JSON-LD) Implementado

### Por tipo de página

| Página | Schemas |
|---|---|
| `RootLayout` (todas páginas) | Organization, RealEstateAgent (LocalBusiness), GeoCoordinates, ContactPoint, EducationalOccupationalCredential (CRECI), PostalAddress, OpeningHoursSpecification |
| `/imovel/[slug]` | **RealEstateListing** (rico: name, description, datePosted, offers, address, geo, floorSize, numberOfRooms, numberOfBathroomsTotal, realEstateAgent, reviewedBy) + **FAQPage** + BreadcrumbList |
| `/apartamentos-curitiba` (e similares) | **ItemList** com `Apartment` items (rico: numberOfRooms, floorSize, address, offers) + **FAQPage** + BreadcrumbList + Organization (via layout) |
| `/imoveis/[bairro]` | ItemList (rico) + **Dataset** (estatísticas mercado: preço médio, m², variação) + FAQPage + BreadcrumbList |
| `/imoveis/[bairro]/[tipo]` | ItemList (rico) + FAQPage + BreadcrumbList |
| `/imoveis/preco/[faixa]` | ItemList (rico) + FAQPage + BreadcrumbList |
| `/empreendimento/[slug]` | RealEstateListing + ItemList (rico) + FAQPage + BreadcrumbList |
| `/lancamentos` | ItemList (rico) + FAQPage + BreadcrumbList |
| `/comprar-imovel-curitiba` | BlogPosting + Person (autor) + FAQPage + BreadcrumbList |
| `/morar-em-curitiba` | idem |
| `/alugar-curitiba` | idem |
| `/blog/[slug]` | BlogPosting + Person + BreadcrumbList |
| `/guia/[bairro]` | BlogPosting + Place + FAQPage + BreadcrumbList |
| `/sobre` | Organization rica + Person (Bruno + Wagner) + BreadcrumbList |
| `/faq` | FAQPage com 19 Q&A + BreadcrumbList |

### Funções centrais em `src/lib/seo.ts`

| Função | Uso |
|---|---|
| `generateOrganizationSchema()` | Layout raiz |
| `generateLocalBusinessSchema()` | Layout raiz |
| `generatePropertySchema(property)` | `/imovel/[slug]` |
| `generateItemListSchema(properties, url)` | **TODAS listagens** (rico desde Fase 19.P0.2) |
| `generateLandingFAQ(tipo, total, min, max)` | 4 landings tipadas |
| `generatePillarFAQ(pillar)` | 3 pillars |
| `generatePropertyDetailFAQ(property)` | `/imovel/[slug]` |
| `generateLancamentosFAQ(total)` | `/lancamentos` |
| `generateDynamicFAQ(stats, bairro, tipo)` | bairro + tipo + preço (legado, ainda em uso) |
| `generateBairroDatasetSchema(stats, bairro)` | `/imoveis/[bairro]` |
| `generatePillarSchema(meta)` | 3 pillars (BlogPosting) |
| `generateBlogPostSchema(post, author)` | blog posts |
| `generateGuiaSchema(...)` | guias |

### Regras
1. **JSON-LD sempre** (nunca microdata ou RDFa)
2. **`safeJsonLd(schema)`** wrapper escapa caracteres perigosos
3. **Datas em ISO 8601** quando aplicável
4. **URLs absolutas** em campos `image`, `url`
5. **Linkar entidades** via `@id` (Organization, Person)

---

## 3. Metadados On-Page

### Title (regras)
- Máximo **60 caracteres** (Google trunca em ~60-70)
- Padrão landings: `{Tipo}s à Venda e Aluguel em Curitiba | FYMOOB Imobiliária`
- Padrão property: `{Título do CRM} | FYMOOB`
- Padrão pillar: `{Tema} em Curitiba — Guia Completo {ANO} | FYMOOB`
- Padrão imóvel: usa título do CRM (Bruno revisa via planilha de sugestões)
- **Com número** quando possível (`120 Apartamentos...`, `408 edifícios...`)

### Description (regras)
- Máximo **160 caracteres**
- Sempre menciona **número** (X apartamentos, Y bairros, R$ Z mil)
- Sempre cita FYMOOB Imobiliária
- Para landings tipadas: `Encontre {tipo} a venda e para alugar em Curitiba. {N} opções disponíveis. Preços de R$ X a R$ Y. FYMOOB Imobiliária.`

### H1 (regras — Fase 19.P0.3)
- **Único por página**
- **Com número específico** quando aplicável (`{total} Apartamentos a Venda em {N}+ Bairros`)
- Não usa `sr-only` quando logo visualmente substitui (caso /empreendimento/[slug] resolvido em Fase 19.P0)
- Hierarquia clara H1 → H2 → H3

### Open Graph + Twitter
- `og:type` = `website` (listagens) ou `article` (blog/pillars)
- `og:image` 1200x630
- `og:locale` = `pt_BR`
- `og:site_name` = `FYMOOB Imobiliária`
- `twitter:card` = `summary_large_image`

### Canonical
- **Sempre** definir `alternates.canonical`
- Para listagens com filtros: canonical aponta pra URL com **params canônicos** (cidade, bairro, tipo, finalidade, quartosMin, quartosMax, precoMin, precoMax, busca) — outros params são strippados via 301 redirect (Fase 19)
- Para imóveis com slug alterado: 301 redirect pro slug atual (Fase 19)

### Robots
- Layout raiz: `index: true, follow: true`
- `/admin`, `/favoritos`, `/comparar`, `/internal-optout`: noindex via robots.txt
- `/api/*`: noindex via robots.txt
- Sem dynamicParams: bairros que não existem retornam 404 real (não soft 404)

---

## 4. Conteúdo SEO

### Hierarquia de conteúdo

| Tier | Tipo | Tamanho | Exemplo |
|---|---|---|---|
| **1. Pillars** | Mega-guides MDX | 5000-8000 palavras | `/comprar-imovel-curitiba`, `/morar-em-curitiba`, `/alugar-curitiba` |
| **2. Guias de bairro** | MDX por bairro | 2000-3500 palavras | `/guia/portao`, `/guia/agua-verde`, ... (10 ativos) |
| **3. Blog posts** | MDX/Sanity | 1500-2500 palavras | `/blog/checklist-compra-imovel`, ... (15 ativos) |
| **4. Landings tipadas** | TSX + bloco ~1000 palavras | 1000-1500 palavras | `/apartamentos-curitiba`, ... |
| **5. Bairro pages** | TSX dinâmica | 500-800 palavras | `/imoveis/[bairro]` |
| **6. Property pages** | TSX dinâmica + descricao CRM | 200-500 palavras | `/imovel/[slug]` |

### FAQ schema (Fase 19 — gap principal vs MySide)

**8 Q&A ricas** em landings tipadas com:
- Citações de dados externos (FipeZAP mar/2026: R$ 11.621/m², variação 5,92%)
- Listas de bairros, construtoras, faixas de preço
- Respostas 200-400 caracteres
- Atualizar trimestralmente

**Funções FAQ disponíveis:**
- `generateLandingFAQ()` — landings tipadas (apt/casas/sob/ter)
- `generatePillarFAQ()` — 3 pillars
- `generatePropertyDetailFAQ()` — property detail
- `generateLancamentosFAQ()` — lançamentos
- `generateDynamicFAQ()` — bairro/tipo/preço (legado)

### Bloco SEO textual (Fase 19.P0.4)

Componente `LandingSEOContent` em landings tipadas:
- **H2 "Conheça o mercado..."** + panorama com FipeZAP
- **H3 "Bairros mais procurados"** + 10 bairros linkados
- **H3 "Como escolher seu imóvel"** + dicas técnicas
- **H3 "Para investimento"** + ROI por bairro
- **H3 "Por que comprar com FYMOOB"** + CRECI + atendimento

### Internal linking
- `RelatedPages` component em todas listagens (links contextuais)
- `SeoInternalLinks` component em landings tipadas (bairros agrupados)
- Cross-link entre tipos de página: bairro ↔ tipo ↔ pillar
- Footer com links pra landings principais

---

## 5. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

### Sinais aplicados

| Sinal | Onde |
|---|---|
| **CRECI J 9420** (empresa) | Footer, sobre, schema Organization, FAQs |
| **CRECI/PR 24.494** (Bruno) | Sobre, schema Person, schema realEstateAgent dos imóveis |
| **AuthorBio** | Pillars, blog posts |
| **`reviewedBy`** | Schema RealEstateListing dos imóveis (revisado por Bruno) |
| **Empresa fundada em 2024** | Schema Organization |
| **Foto da equipe** | /sobre |
| **Política editorial** | /politica-editorial |
| **Dataset schema** | `/imoveis/[bairro]` (creator: FYMOOB, license CC-BY-4.0) |
| **Citações externas** | FAQs citam FipeZAP, IBGE, Caixa, Lei 13.786/2018 |
| **Endereço físico** | Schema PostalAddress + footer |

### Falta implementar (futuro)
- AggregateRating (avaliações do GMN)
- Backlinks editoriais (G1 PR, Tribuna PR, GazetaMaringá)
- Mais autores (corretores convidados)
- Press mentions

---

## 6. Performance (Fase 11 — CWV)

### Metas e estado atual

| Métrica | Meta | Estado (Lighthouse mobile) |
|---|---|---|
| Performance | >80 | Home 88, Busca 86, Imóvel 91 |
| LCP | <2.5s | OK |
| CLS | <0.1 | OK |
| TBT | <200ms | OK |
| Bundle size | <200KB initial | Monitorado via size-limit |

### Patterns aplicados
- **Server Components por padrão** — 'use client' apenas em interatividade
- **`next/image`** com `priority` só no LCP element
- **Dynamic import** componentes pesados (mapa, embla, gallery)
- **`requestIdleCallback`** para localStorage
- **Fonts via `localFont` `display: optional`** (anti-CLS)
- **GA4 deferred** (carrega após interação ou 12s)
- **CSS `animation-timeline: view()`** com fallback (anti JS)
- **FAQ via `<details>/<summary>`** (zero JS)
- **Hero `clamp()` typography** (Fase 19 — fluid sem breakpoint jumps)
- **`max-w-4xl xl:5xl 2xl:6xl`** (Fase 19 — proporcional)

### Patterns banidos
- ❌ `useIsMobile` (CLS por hidration mismatch)
- ❌ Carousel JS no fold inicial
- ❌ `inlineCss` (revertido em H-20260417-004 — +326KB)
- ❌ Decisão de layout via JS (sempre Tailwind responsive)

---

## 7. Indexação e Crawl

### Setup
- `robots.txt` permitindo Googlebot, Googlebot-Image, Bingbot
- `Disallow: /api/, /favoritos, /comparar, /admin, /internal-optout`
- 4 sitemaps shards (`/sitemap/0.xml` a `3.xml`)
- Submetido em `sc-domain:fymoob.com.br` (GSC)

### Cross-domain (Fase pré-cutover)
- Site antigo `fymoob.com` (Atomicat) com 301 redirects pra `fymoob.com.br`
- GSC Change of Address Tool ativo (180 dias) desde 17/04/2026
- Banner "Site sendo movido" visível em ambas propriedades

### Limpeza GSC (Fase 19)
- Redirects 301 de querystrings legadas (`?SuperDestaqueWeb=`, `?DestaqueWeb=`, `?Lancamento=`, `?order=`, `?listagem=`, `?min=`)
- Permanent redirect quando slug de imóvel muda (área alterada → novo slug)
- Resultado: GSC report "Pagina alternativa com tag canonica adequada" deve diminuir

### Request Indexing (manual via GSC)
Lista de URLs prioritárias após cada deploy maior:
1. Home
2. /apartamentos-curitiba (e demais 3 landings tipadas)
3. /comprar-imovel-curitiba (e demais 2 pillars)
4. /favicon.ico (se favicon mudar)
5. Top 10 bairros: /imoveis/portao, /imoveis/batel, /imoveis/agua-verde, etc

---

## 8. Mobile-First

### Implementado
- Viewport correto, sem zoom-pinch issues
- Tap targets >=44x44px
- BottomNav fixo (auto-hide on scroll em property pages)
- Inputs com `inputMode` correto (text pra códigos com letras, numeric pra números)
- WhatsApp Float persistente
- Search bar pill mobile (compact) → expande pra bottom sheet

### Paradigm
- Mobile = experiência primária
- Desktop = enhancement
- Não usar JS pra detectar mobile — Tailwind classes (`sm:`, `md:`, `lg:`)

---

## 9. Análise Competitiva (Fase 19)

### Top concorrentes "apartamentos curitiba"

| # | Site | Tipo | SEO técnico | Estratégia |
|---|---|---|---|---|
| 1 | Viva Real | Marketplace | Forte | Autoridade + 16k imóveis + programmatic SEO |
| 2 | Imovelweb | Marketplace | Forte | "49.239 apartamentos" no title |
| 3 | ZAP | Marketplace | Forte | Mesma família Viva Real |
| 4 | Apolar | Regional | **❌ SPA Vue sem SSR** | Marca histórica |
| 5 | JBA | Regional | **❌ 404 em URLs tipadas** | Autoridade domínio |
| 6 | Isidório | Regional | **❌ H1 "Carregando..."** + canonical HTTP | 933 imóveis |
| 7 | MySide | SaaS imob | ⭐ **Best in class** | 8 schemas, FAQ, 3001 palavras, 26 H2 |

### Estratégia FYMOOB
- **Não tentar bater marketplaces** — focar em cauda longa
- **Bater regionais com SEO técnico** (Apolar/JBA/Isidório/Razzi)
- **Espelhar MySide** em FAQs ricas + Apartment schema
- **Diferenciar com E-E-A-T** (CRECI, autores reais, dataset bairro)

---

## 10. Estimativa de impacto e prazo

### Após Fase 19.P0 implementada
| Janela | Cauda longa | Cauda média | "Apartamentos Curitiba" (genérica) |
|---|---|---|---|
| 30 dias | Top 3 (bairro+tipo, empreendimento) | Top 20 | Top 50 |
| 60-90 dias | Top 1-3 | Top 10 | Top 20 |
| 6 meses | Top 1 | Top 5 | Top 10 |
| 12 meses | Top 1 dominante | Top 3 | Top 5-7 (depende de backlinks) |

### Ações para acelerar (P1+P2 — backlog)
1. **Backlinks editoriais** (G1, Tribuna, GazetaMaringá, Sindico Net) — +autoridade domínio
2. **Pillar `/comprar-apartamento-curitiba`** (5000+ palavras) — capturar cauda média
3. **Capturar 18+ empreendimentos populares** como landing pages — espelhar MySide
4. **AggregateRating** com reviews GMN — rich result CTR +20-30%
5. **Página "Mercado Imobiliário Curitiba 2026"** atualizada mensalmente — fonte citável

---

## 11. Manutenção e governança

### Atualizações periódicas necessárias

| Item | Frequência | Onde |
|---|---|---|
| Dados FipeZAP nas FAQs | Trimestral | `src/lib/seo.ts` constantes `FIPEZAP_*` |
| Lista de construtoras | Semestral | Manual em `seo.ts` + LandingSEOContent |
| Catálogo de imóveis | Tempo real | Auto via CRM Loft |
| Sitemap | Toda 1h | Auto (revalidate) |
| Indices Google (GMN reviews) | Mensal | Manual no admin |
| Pillars (revisão) | Anual | MDX em `/content/pillar/` |
| Blog posts | Semanal | MDX/Sanity |
| Guias de bairro | Quando criar bairro novo | MDX em `/content/guias/` |

### Quando criar nova página
**Checklist obrigatório:**
- [ ] `generateMetadata()` com title <60, description <160
- [ ] `alternates.canonical` definido
- [ ] OG image específica
- [ ] Schema apropriado (consultar Seção 2)
- [ ] Breadcrumbs com BreadcrumbList schema
- [ ] FAQ se aplicável (consultar Seção 4)
- [ ] H1 único, com número se possível
- [ ] Internal links via RelatedPages ou SeoInternalLinks
- [ ] Adicionar URL no sitemap shard correto
- [ ] Smoke test (/scripts/smoke-test.mjs)

### Quando alterar URL
- 301 redirect obrigatório do slug antigo pro novo
- Adicionar regra em `next.config.ts` `async redirects()`
- Submit GSC URL Inspection da nova URL
- Esperar 7-14 dias pra Google reindexar

---

## 12. Tracking de mudanças SEO

| Data | Fase | Commit | Resumo |
|---|---|---|---|
| 2026-04-30 | 19 | 6b64190 | Fase 19.P0 completa: FAQs em ~270 páginas + Apartment schema + bloco SEO + H1 com número |
| 2026-04-30 | 19 | 10d60da | Redirects 301 querystrings legadas + slug change |
| 2026-04-30 | 19 | 9a0a47c | Favicon URLs estáveis (sem hash Next.js) |
| 2026-04-29 | 16 | efbffa5 | Favicon FYMOOB "fy" novo (anti Vercel triangle) |
| 2026-04-22 | 12.5 | (várias) | Planilha de títulos V2 (251 imóveis) |
| 2026-04-17 | pré-cutover | 0d7b19f-6b13794 | Security hardening + 25 CRITICAL/HIGH SEO |
| 2026-04-15 | 13.8 | (várias) | SEO programático Zillow-inspired |
| 2026-04-15 | 13.9 | (várias) | 2026 Playbook (AI Search, E-E-A-T) |

### Audits realizados
- 2026-04-30: Análise competitiva top SERP "apartamentos curitiba" → `docs/seo/competitor-analysis-curitiba-2026-04-30.md`
- 2026-04-23: Baseline pós-cutover GSC → `docs/seo-reports/2026-04-23-baseline.md`
- 2026-04-17: Audit pré-cutover (4 rodadas) → 25 CRITICAL/HIGH fixados
- 2026-04-30: Audit FAQ coverage → 5 páginas com FAQ adicionada (3 pillars + imovel + lancamentos)
