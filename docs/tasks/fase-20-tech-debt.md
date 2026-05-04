# Fase 20 — Code Quality & Tech Debt

> Waves 1-4: DRY, refactors, tests, UI debt.
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


## Fase 20 — Code Quality & Tech Debt [PRIORITARIO 02-15/05/2026]

> **Origem:** audit completo do codebase em 01/05/2026 via 3 agentes
> paralelos (arquitetura, performance, code quality). Achados em
> `docs/code-review/2026-05-01-codebase-audit.md` — 41 acionaveis
> distribuidos em 4 waves por ROI/urgencia.

### Fase 20.W1 — Quick wins [~6h dev, alto ROI]

- [x] **20.W1.1** Extract `SITE_URL` constant (11 arquivos duplicam)
  - Criar `src/lib/constants.ts` com `export const SITE_URL`
  - Substituir em 11 paths
  - Esforco: S (30min)

- [x] **20.W1.2** Extract `formatCompactCurrency` duplicado
  - Consolidar em `src/lib/utils.ts`
  - Paths: `PriceFilter.tsx:23-50`, `useSearchBarController.ts:75-93`
  - Esforco: S (15min)

- [x] **20.W1.3** Fix `formatPrice` redefinido localmente
  - Path: `src/app/imoveis/[bairro]/page.tsx:103`
  - Importar de `@/lib/utils`, remover redefinicao
  - Esforco: S (5min)

- [x] **20.W1.4** Remover `cache: "no-store"` em `/api/search/facets`
  - Path: `src/components/search/useSearchBarController.ts:247`
  - Impacto: +80-120ms LCP economizado/sessao
  - Esforco: S (5min)

- [x] **20.W1.5** Parallelizar `generateStaticParams` em faixa preco
  - Path: `src/app/imoveis/preco/[faixa]/page.tsx:82-94`
  - Impacto: -2s build time (Promise.all em vez de sequencial)
  - Esforco: S (30min)

- [x] **20.W1.6** Loft API sandbox toggle via env var
  - Path: `src/services/loft.ts:20` — endpoint hardcoded
  - Adicionar `LOFT_API_BASE_URL` em `.env.example`
  - Esforco: S (30min)

- [~] **20.W1.7** `FavoriteButton` localStorage defer
  - Path: `src/components/property/card/FavoriteButton.tsx`
  - Wrap leitura em `requestIdleCallback`
  - Impacto: -50-100ms TBT em pages com 24+ cards
  - Esforco: S (30min)

- [x] **20.W1.8** `PropertyMap` CSS preload
  - Adicionar `<link rel="preload">` no layout `/imovel/[slug]`
  - Impacto: CLS -0.05 quando mapa entra viewport
  - Esforco: S (30min)

- [x] **20.W1.9** Reduzir `limit: 1000` → `limit: 500` em landings
  - Paths: `apartamentos-curitiba`, `casas`, `sobrados`, `terrenos`, `imoveis/[bairro]`
  - Catalogo total ~248 imoveis — 1000 e overfetch
  - Impacto: -100-150ms CPU + -80KB cache size por pagina
  - Esforco: S (1h total)

- [x] **20.W1.10** Magic numbers: SCORING_WEIGHTS + MAX_META_DESCRIPTION_LENGTH
  - Paths: `property-relevance.ts:21-150` (15 magic numbers), `seo.ts:355,484` (`160`)
  - Extract em `constants.ts` com nomes claros
  - Esforco: S (1h)

- [~] **20.W1.11** Remove `getAllBairros` redundante na home
  - Path: `src/app/page.tsx:76`
  - Home chama getAllBairros() E getAllBairrosByCidade() — usar so segunda
  - Esforco: S (10min)

- [x] **20.W1.12** Remove redundant comments (CLAUDE.md violation)
  - Paths: `src/lib/utils.ts:94-95`, `PriceFilter.tsx:6-8`
  - Comentarios que repetem nome da funcao (proibido)
  - Esforco: S (15min)

### Fase 20.W2 — Refactors medios [~10h dev]

- [x] **20.W2.1** Landing pages factory pattern (eliminar copy-paste)
  - 4 arquivos com 42 linhas identicas: `apartamentos/[finalidade]`, `casas`, `sobrados`, `terrenos`
  - Criar `src/app/_templates/tipo-finalidade-page.ts` factory
  - Esforco: M (2-3h)

- [x] **20.W2.2** Services wrapper pra fetch client (eliminar layer leaks)
  - Paths offenders: `useSearchBarController.ts:233`, `ContactForm.tsx:88`, `ContactSidebar.tsx`
  - Criar `src/services/search-client.ts` com `getFacets()`, `submitLead()`
  - Esforco: M (2-3h)

- [x] **20.W2.3** `mapRawToProperty`: extract `determineFinalidade`
  - Path: `src/services/loft.ts:311-326` — chain de 6 if/else
  - Extrair em funcao nomeada com switch claro
  - Esforco: M (1h)

- [x] **20.W2.4** Type safety: `Record<string, unknown>` → tipos reais
  - Path: `src/services/loft.ts:253-263` (8 ocorrencias)
  - Estender `LoftPropertyRaw` com `LoftCharacteristics` type
  - Remover assertions duplas
  - Esforco: M (2h)

- [x] **20.W2.5** `PropertyType` validation com whitelist
  - Path: `src/services/loft.ts:354`
  - Criar `parsePropertyType(cat: unknown): PropertyType` com whitelist
  - Esforco: M (1h)

- [x] **20.W2.6** Revalidate uniformizar 3600s (1h)
  - Path: `src/services/loft.ts:26` — `REVALIDATE_SECONDS = 900`
  - Mudar pra 3600 (Bruno nao muda imoveis a cada 15min)
  - Impacto: -2.16K writes ISR/mes (~R$10-20 economia infra)
  - Esforco: S (5min)

- [x] **20.W2.7** Extract `CARAC_LABELS` pra `/types`
  - Path: `src/services/loft.ts:10-60`
  - Mover pra `src/types/characteristics.ts`
  - Esforco: S (30min)

### Fase 20.W3 — Strategic [~20h dev]

- [ ] **20.W3.1** Split `src/lib/seo.ts` em 3 arquivos
  - 1000+ linhas com 3 responsabilidades misturadas (schema + faq + metadata)
  - Split: `seo/schema.ts`, `seo/faq.ts`, `seo/metadata.ts`, `seo/index.ts` (re-exports)
  - Cuidado: ~50+ imports em todo codebase — fazer em 1 PR unico
  - Esforco: L (4-6h)

- [x] **20.W3.2** [CRITICO] Admin isolation security audit
  - Paths: `src/app/admin/*`, `src/app/api/admin/*`
  - Auditar cada `_actions.ts` — confirmar `await auth()` + redirect/throw
  - Testar manualmente: requisicao sem cookie → deve 403
  - Documentar padrao em CLAUDE.md
  - Risco se ignorado: vazamento de dados (CRUD blog/autor expostos)
  - Esforco: M (2-3h)

- [x] **20.W3.3** Domain logic mover de `/lib` pra `/services`
  - `lib/property-relevance.ts` → `services/property/relevance.ts`
  - `lib/property-price.ts` → `services/property/price.ts`
  - Logica de FAQ dinamica em seo.ts → `services/seo/faq.ts`
  - Padrao: lib = utilities genericas, services = lógica de domínio
  - Esforco: L (4-6h) — pode diferir, nao bloqueia nada

- [ ] **20.W3.4** `loft.ts` unit tests (regressao)
  - Novo `src/services/__tests__/loft.test.ts`
  - Casos do incidente 22/04 (status ambiguo, preco residual)
  - `mapRawToProperty` edge cases (foto quebrada, sem foto destaque)
  - `applyFilters` casos de borda
  - Setup Vitest se ainda nao existe
  - Esforco: M (2-3h)

- [ ] **20.W3.5** `DeferredHydration` audit + apply
  - Componente bem feito mas usado so 2x
  - Listar top 20 `'use client'` components, avaliar interatividade real
  - Aplicar em pesados sem interacao inicial
  - Esforco: M (3-4h)

- [ ] **20.W3.6** `getProperties(limit)` em metadata: deduplicar com page render
  - Path: `imoveis/[bairro]/page.tsx:51` (e similares)
  - Computar stats em funcao compartilhada, memoizar, reusar
  - Impacto: -50-80ms LCP em landings
  - Esforco: M (1.5h)

- [ ] **20.W3.7** `PropertyCard` variants pattern
  - 4 variantes (Grid/List/Compact/Card) sem base compartilhada clara
  - Export composto `<PropertyCard.Grid>` ou `variant` prop
  - Esforco: M (2-3h)

### Fase 20.W4 — Backlog (nao urgente)

- [ ] **20.W4.1** Rate-limit middleware (mover de handlers)
- [ ] **20.W4.2** `blog.ts` wrapper deprecation (quando Supabase 100% estavel)
- [ ] **20.W4.3** API response format padronizacao (`apiSuccess`/`apiError` helpers)
- [ ] **20.W4.4** Test coverage geral (Vitest + cobertura critica)
- [ ] **20.W4.5** `HomeCarousel` server shuffle
- [ ] **20.W4.6** `DeferredGA` singleton pattern
- [x] **20.W4.7** `generatePropertySlug` dead code check
- [ ] **20.W4.8** Fix `any` em 4 arquivos (layout, BedroomsFilter, AdvancedFields, PropertyGallery)

### Fase 20 — Estimativa pos-implementacao

| Metrica | Atual | Pos W1+W2 | Delta |
|---|---|---|---|
| Build time landings | ~120s | ~110s | -10s |
| LCP medio mobile | ? | -100-150ms | -10% |
| TBT medio mobile | ? | -50-100ms | melhoria |
| ISR writes/mes | ~3.6K | ~1.5K | -2.1K |
| Custo Vercel/mes | ~? | -R$10-20 | small |
| LOC duplicado | ~250+ | ~50 | -80% |
| Layer leaks | 3 | 0 | -100% |

**Documentos:** `docs/code-review/2026-05-01-codebase-audit.md`

---

### Fase 19 — Estimativa de impacto consolidada

| Acao | Impacto SERP esperado | Tempo | ROI |
|---|---|---|---|
| 19.1 FAQPage 8 Q&A | +5-15 posicoes | 2h | Alto |
| 19.2 Apartment schema | +3-8 posicoes + rich result | 3h | Alto |
| 19.3 H1 com numero | +1-3 posicoes + CTR +5-10% | 30min | Medio |
| 19.4 Bloco SEO 1000 palavras | +5-10 posicoes | 4h | Alto |
| 19.5 Bairros 6→15 | autoridade nas combos | 1h | Medio |
| 19.8 AggregateRating | Rich result com estrelas (CTR +20%) | 4h | Alto |
| 19.9 Pillar 5000 palavras | +10-25 posicoes em 3-6 meses | 12h | Muito alto |

**Estimativa conjunta P0+P1:** FYMOOB pode entrar **top 10 em 60-90 dias** pra "apartamentos curitiba". Cauda longa **top 3 em 30-60 dias**.

---
