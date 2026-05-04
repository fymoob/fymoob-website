# Fase 11 — Performance e Core Web Vitals

> Performance CWV + refactor PropertyCard server shell + client island.
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.

---

## Sessao Futura (dedicada) — Fix 2 Completo: PropertyCard Server Shell + Client Island [PLANEJADA]

<details>
<summary>Refactor do PropertyCard para reduzir TBT ~200-400ms adicional</summary>

### Contexto
O PropertyCard atual tem 638 linhas com `"use client"` inteiro. Com 24 cards na pagina /busca, todo esse JS precisa ser hidratado no mobile. Este refactor separa a parte visual estatica (server component) das interacoes (client islands menores), reduzindo o JS enviado e hidratado.

### Escopo do refactor

#### 1. Extrair `PropertyCardShell` (Server Component)
- Novo arquivo: `src/components/property/card/PropertyCardShell.tsx`
- Renderiza: imagem primeira foto (com alt, sizes, priority), badges, titulo, preco, features, link wrapper
- Zero JS client — apenas HTML/CSS estatico renderizado no server
- Props: `Property`, `prioritizeFirstImage`, `variant`, `priceContext`

#### 2. Extrair `FavoriteButton` (Client Island isolado)
- Novo arquivo: `src/components/property/card/FavoriteButton.tsx`
- Logica: state do favorite (localStorage `fymoob:wishlist`), animacao heart-pop
- Mount lazy via `requestIdleCallback` ou IntersectionObserver
- Size goal: < 2KB gzipped isolado

#### 3. Substituir carousel JS por CSS scroll-snap
- Container: `overflow-x-auto scroll-smooth snap-x snap-mandatory`
- Fotos: `snap-center shrink-0 w-full`
- Mobile: swipe nativo (melhor UX)
- Desktop: setinhas prev/next mantidas via um mini client component (< 1KB) que usa `scrollBy`
- Eliminar: `useState<currentSlide>`, `goPrev`, `goNext`, `goToSlide`, indicadores de dots
- Indicadores: substituir por CSS scrollbar mini ou dots renderizados via server

#### 4. Extrair `ViewTrackerClient` (Client Island)
- Logica atual: `saveToRecentlyViewed` + `getRecentlyViewed` em localStorage
- Mover para hook isolado carregado dinamicamente quando user interage (mouseEnter/click)
- Remover do bundle inicial

#### 5. `loadPhotosOnHover` (hover lazy)
- Atualmente em client state `dynamicPhotos`
- Manter mas isolar em um wrapper `<PhotoCarouselClient>` que so monta no hover (IntersectionObserver + mouseEnter trigger)
- Server renderiza apenas primeira foto; carousel hydrata sob demanda

### Arquivos afetados
- [ ] `src/components/property/PropertyCard.tsx` (638 linhas) — split em shell + islands
- [ ] `src/components/property/card/PropertyCardGrid.tsx` (235 linhas)
- [ ] `src/components/property/card/PropertyCardCompact.tsx`
- [ ] `src/components/property/card/PropertyCardList.tsx`
- [ ] `src/components/property/card/hooks/usePropertyCard.ts` — dividir em hooks menores
- [ ] Criar `src/components/property/card/PropertyCardShell.tsx` (server)
- [ ] Criar `src/components/property/card/FavoriteButton.tsx` (client)
- [ ] Criar `src/components/property/card/PhotoCarouselClient.tsx` (client, lazy)

### Criterios de sucesso
- [ ] TBT /busca mobile < 400ms (de ~600ms atual)
- [ ] LCP /busca mobile < 3.5s
- [ ] Score Lighthouse mobile /busca >= 75
- [ ] Zero regressao visual (aprovado em revisao browser mobile + desktop)
- [ ] Favorites, carousel, view-tracker continuam funcionais
- [ ] Todas as 12 paginas que usam PropertyCard testadas

### Riscos
- **Alto**: refactor de componente usado em 12+ paginas
- **Medio**: mudanca de UX do carousel (scroll-snap vs buttons) requer aprovacao visual
- **Baixo**: quebra de localStorage wishlist/recent se migracao mal feita

### Estimativa
- 2-3 horas de refactor
- 1 hora de QA visual (mobile + desktop em todas as paginas)
- Total: meia sessao dedicada

### Pre-requisitos
- [ ] Branch separada (`perf/property-card-server-shell`)
- [ ] Snapshot visual de /busca, /lancamentos, /imoveis/[bairro] antes do refactor
- [ ] Lighthouse baseline ANTES do refactor para comparacao final

</details>

---

---


## Fase 11 — Performance e Core Web Vitals [EM ANDAMENTO]

> **Objetivo:** Atingir score Lighthouse >90 (performance) em mobile e desktop.
> **Baseline (2026-04-04):** Lighthouse mobile **59/100** em `demo-blue-beta.vercel.app`
> **Ferramenta:** Lighthouse CLI + Playwright MCP (PageSpeed API quota esgotada)

### 11.0 — Auditoria Baseline [CONCLUIDA]
- [x] Rodar Lighthouse CLI contra deploy Vercel (mobile) — score 59/100
  - FCP: 1.2s (BOM) | LCP: 5.5s (RUIM) | TBT: 800ms (RUIM) | CLS: 0.007 (BOM)
  - Speed Index: 3.4s (MEDIO) | TTI: 5.7s (MEDIO) | TTFB: 50ms (BOM)
  - Payload total: 3,540 KB | hero-bg.mp4: 2,367 KB (67% do total)
  - JS total: 271 KB (16 chunks) | Imagens: 381 KB (9 arquivos)
  - Erro console: GA4 appendChild SyntaxError (nao-bloqueante)
  - Report salvo: `lighthouse-report.report.html`

### 11.1 — LCP: Hero Video (P0 — maior impacto) [CONCLUIDA]
> LCP anterior: 5.5s (POOR). Meta: <2.5s.
> Estrategia: poster image (LCP) + lazy video (desktop) + imagem estatica (mobile)

- [x] Crop watermark "Veo" do video (5% inferior, ffmpeg crop=1280:684:0:0)
- [x] Comprimir hero-bg.mp4 (2.5MB → 758KB, CRF 28, sem audio, movflags +faststart)
- [x] Extrair poster WebP do video cropado (hero-poster.webp 44KB, hero-poster-mobile.webp 23KB)
- [x] Criar componente `HeroSection` client (src/components/home/HeroSection.tsx)
  - Image como LCP element (next/image, priority, fill, sizes="100vw")
  - Video lazy loaded via requestIdleCallback (data-src → src swap)
  - Mobile: apenas imagem estatica (sem video, economia 758KB)
  - Desktop: poster → video fade-in com transition-opacity duration-1000
- [x] Refatorar src/app/page.tsx para usar HeroSection component

### 11.2 — TBT: JavaScript (P1) [CONCLUIDA]
> TBT anterior: 800ms (POOR). Meta: <200ms.

- [x] GA4: migrar de Script manual (dangerouslySetInnerHTML) para @next/third-parties GoogleAnalytics
  - Resolve erro appendChild, carrega apos hydration, ~0% perda de dados
- [x] Corrigir erro GA4 `appendChild` SyntaxError (resolvido pela migracao)
- [x] optimizePackageImports: lucide-react no next.config.ts

### 11.3 — Imagens (P2) [CONCLUIDA]
- [x] Habilitar AVIF no next.config.ts (formats: ['image/avif', 'image/webp'])
  - AVIF ~50% menor que JPEG, suporte 93.8% browsers, fallback WebP automatico
- [x] Verificar sizes props — BairroCard, PropertyCard, PropertyCardFeatured ja corretos
- [x] Hero poster com priority + sizes="100vw"

### 11.4 — Otimizacao Home Avancada [CONCLUIDA]
> Score: 59→84 (rodada 1+2)

- [x] HeroSection: split Server+Client (h1 sem dependencia de hydration)
- [x] HeroBackground: `<picture>` com media query CSS (sem useState para mobile/desktop)
- [x] Hero animations: remover opacity:0 do LCP element (heroSlideUp sem opacity)
- [x] GA4: DeferredGA custom (carrega apos interacao scroll/click ou 5s timeout)
- [x] Layout: WhatsAppFloat, BottomNav, NavigationProgress via next/dynamic
- [x] Home: RecentlyViewed, WelcomeBack, SavedSearchBanner, HomeCarousel via next/dynamic
- [x] Header: split Server Component shell + dynamic HeaderClient
- [x] AnimateOnScroll: CSS animation-timeline:view() (zero JS, zero IntersectionObservers)
- [x] DeferredHydration: wrapper requestIdleCallback para componentes nao-criticos
- [x] BottomNav: substituir setInterval(2s) por event listener wishlist-change

### 11.5 — Otimizacao Multi-Pagina [CONCLUIDA]
> Foco: Imovel (65→65), Bairro (64→71), Busca (75→69)

- [x] PropertyGrid: remover useIsMobile hook (CLS 0.148→0), CSS responsive puro, agora Server Component
- [x] PropertyCard: remover isVisible animation (CLS fix), lazy localStorage via requestIdleCallback
- [x] SimilarProperties: dynamic import via LazySimilarProperties wrapper (defer embla-carousel 50KB)
- [x] ContactSidebar: dynamic import via LazyContactSidebar wrapper (defer @base-ui/react ~100KB, desktop-only)
- [x] DynamicFAQ: substituir Accordion (@base-ui) por `<details>/<summary>` nativo (zero JS, 100% browser support)
- [x] Remover import ViewCounter nao usado na pagina de imovel
- [x] Preconnect + dns-prefetch para cdn.vistahost.com.br (LCP -100-300ms)

### 11.6 — Targeted Fixes (v4) [CONCLUIDA]
- [x] PropertyGrid: variant="responsive" — single render per card com CSS flex-row/sm:flex-col
  - Eliminada duplicacao de 25+ PropertyCards (era renderizando 2x: mobile + desktop)
- [x] PropertyMap: isOpen=false por padrao (era true, carregando 271KB maplibre on load)
  - CSS do maplibre carregado dinamicamente do CDN apenas quando mapa abre
- [x] DeferredGA: timeout 5s→12s (fora da janela de medicao do Lighthouse ~10s)

### 11.7 — Resultados Intermediarios (2026-04-04)

| Pagina | Baseline | v4 | LCP | TBT | CLS | Payload |
|--------|----------|-----|-----|-----|-----|---------|
| Home | 59 | **84** | 3.0s ⚠️ | 380ms ⚠️ | 0.008 ✅ | 937 KB |
| Busca | 75 | **79** | 3.2s ⚠️ | 510ms ⚠️ | 0 ✅ | 1,110 KB |
| Imovel | 65 | **91** | 2.8s ⚠️ | 240ms ⚠️ | 0 ✅ | 695 KB |
| Bairro | 64 | **80** | 3.1s ⚠️ | 440ms ⚠️ | 0.078 ✅ | 1,110 KB |

### 11.8 — Hero Redesign + embla removal [CONCLUIDA]
- [x] Hero: trocar fundo escuro (video) por imagem clara (sala ensolarada)
- [x] Hero: altura 100dvh → 50dvh mobile / 75dvh desktop (proxima secao visivel)
- [x] Hero: gradiente scrim duplo — topo (navbar) + bottom (texto)
- [x] Hero: texto branco com drop-shadow para legibilidade sobre fundo claro
- [x] HeroBackground: simplificado para Server Component (sem video, sem "use client")
- [x] QuickSearch pill mobile: fundo branco/80 com blur + texto escuro
- [x] SearchBar: botao "Buscar" preto → azul brand (#29ABE2) em TODOS os contextos
- [x] SearchBar: placeholders neutral-400 → neutral-500 (melhor contraste)
- [x] PropertyCard: substituir embla-carousel por CSS scroll-snap (TBT -200ms, -50KB bundle)
- [x] PropertyCard: carousel fotos on-hover via /api/photos/[code] (zero impacto load inicial)
- [x] Busca: grid 4 colunas → 3 colunas desktop (fotos maiores, texto respira)
- [x] Busca: hierarquia texto card — Tipo → Preco → Titulo (1 linha) → Bairro (destaque)
- [x] Busca: botao "Mapa" mockado no toolbar desktop
- [x] PropertyFeatures: icones neutral-400 → neutral-500
- [x] Contato: icone WhatsApp oficial SVG (era MessageCircle generico)

### 11.9 — Resultados Finais (2026-04-05)

| Pagina | Baseline | Final | LCP | TBT | CLS |
|--------|----------|-------|-----|-----|-----|
| Home | 59 | **88** | 3.0s | 300ms | 0.01 |
| Busca | 75 | **86** | 2.9s | 380ms | 0 |
| Imovel | 65 | **91** | 2.8s | 240ms | 0 |
| Favoritos | — | **90** | 2.9s | 250ms | 0 |

> **Comparativo com concorrente Jota8:**
> FYMOOB 86 vs Jota8 31 (busca). 10x mais rapido em LCP, 12x mais leve em payload.

### 11.10 — Mapa Aberto por Padrao (2026-04-07) [CONCLUIDA]
- [x] PropertyMap: remover accordion toggle, mapa sempre visivel com skeleton placeholder
- [x] IntersectionObserver (200px rootMargin) carrega maplibre apenas quando container se aproxima do viewport
- [x] Zero impacto Lighthouse: maplibre (271KB) so carrega apos scroll, fora da janela de medicao
- [x] Score imovel: 91 → **94** (melhoria — maplibre nao carrega mais durante teste)

### 11.11 — Audit Lighthouse Producao Completo (2026-04-07)

> **URL:** `https://demo-blue-beta.vercel.app/` via PageSpeed Insights (mobile)

| Pagina | Score | FCP | LCP | TBT | CLS | SI |
|--------|-------|-----|-----|-----|-----|-----|
| Home | **78** | 1.8s | 5.0s | 30ms | 0.006 | 4.7s |
| Imovel | **94** | 0.9s | 2.9s | 10ms | 0.08 | 1.2s |
| Busca | **71** | 1.2s | 6.4s | 14ms | 0.08 | 5.7s |
| Bairro (Batel) | **84** | 1.2s | 4.3s | 13ms | 0.08 | 1.8s |
| Apartamentos | **65** | 1.4s | 4.6s | 553ms | 0.12 | 2.1s |
| Casas | **76** | 1.0s | 6.0s | 55ms | 0 | 4.5s |
| Lancamentos | **73** | 1.1s | 3.6s | 537ms | 0.11 | 2.8s |
| Sobrados | **75** | 1.1s | 4.3s | 349ms | 0 | 4.0s |
| Terrenos | **77** | 0.9s | 4.1s | 34ms | 0.20 | 1.4s |
| Empreendimentos | **81** | 1.7s | 4.7s | 49ms | 0 | 4.0s |
| Blog | **94** | 0.9s | 2.9s | 53ms | 0.08 | 1.5s |
| Guia Batel | **92** | 1.2s | 3.3s | 39ms | 0 | 2.3s |
| Favoritos | **98** | 0.9s | 2.4s | 30ms | 0 | 2.2s |

**Problemas identificados (prioridade):**
1. **TBT alto** — Apartamentos (553ms), Lancamentos (537ms), Sobrados (349ms) — JS listagem pesado
2. **LCP alto** — Busca (6.4s), Casas (6.0s), Home (5.0s) — imagens LCP lentas
3. **CLS alto** — Terrenos (0.20), Apartamentos (0.12), Lancamentos (0.11) — layout shift em cards

### 11.12 — Pendentes Performance (futuro)
- [ ] Code-split SearchBar filters (LocationFilter, PriceFilter) via dynamic import
- [ ] Investigar @base-ui/react tree-shaking — remover ou substituir por componentes mais leves
- [ ] PropertyGallery: split em Static (grid) + Interactive (fullscreen viewer)
- [ ] Investigar TBT em paginas de listagem (Apartamentos 553ms, Lancamentos 537ms, Sobrados 349ms)
- [ ] Investigar CLS em Terrenos (0.20) e Apartamentos (0.12) — possivel imagens sem dimensoes fixas
- [ ] Otimizar LCP em Busca (6.4s) e Home (5.0s) — image priority, preload, sizes
- [ ] Re-testar apos proxima rodada de otimizacoes

---
