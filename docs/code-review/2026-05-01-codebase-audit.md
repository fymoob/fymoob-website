# Codebase Audit Consolidado — FYMOOB

**Data:** 2026-05-01
**Escopo:** Análise completa em 3 eixos paralelos (arquitetura, performance, code quality)
**Total de achados:** 41 acionáveis (6 critical, 21 medium, 14 minor)
**Método:** 3 agentes especializados rodaram em paralelo + cross-reference manual

---

## Sumário executivo

Codebase **bem estruturado** pra um site de 14 dias em produção: convenções App Router seguidas, server components default, ISR bem configurado, types fortes em geral. Os achados são predominantemente **otimizações e dívida técnica acumulável**, não bugs bloqueantes.

**Padrão central observado:** o código foi escrito rápido (cutover urgente), com várias soluções pontuais que agora podem ser DRY-ificadas. Nenhum problema crítico de produção, mas se ignorados ao longo de 3-6 meses geram custo de manutenção real.

### Status por categoria

| Eixo | Achados | Crítico | Estado geral |
|---|---|---|---|
| Arquitetura | 12 | 1 (auth admin) | 🟡 Bom — alguns layer leaks pontuais |
| Performance | 12 | 0 (8 medium) | 🟡 Bom — otimizações deixadas na mesa |
| Code Quality | 17 | 5 (DRY, complexity, types) | 🟡 Bom — débito DRY acumulando |

### Achados que aparecem em 2+ eixos (alta prioridade)

> Quando 2 agentes independentes apontam a mesma área, é sinal forte.

| Área | Eixos que apontaram | Severidade combinada |
|---|---|---|
| **`useSearchBarController.ts`** — fetch direto + cache no-store | Arquitetura #1 + Performance #2 | 🔴 |
| **`src/lib/seo.ts`** gigante (1000+ linhas) | Arquitetura #5 + Code Quality #4 | 🔴 |
| **`src/services/loft.ts`** — type assertions, complexidade, sandbox hardcoded | Arquitetura #10 + Code Quality #4,5 | 🔴 |
| **Landing pages programáticas** — copy/paste + overfetch limit:1000 | Arquitetura #2 + Performance #7,12 | 🔴 |
| **Magic numbers / DRY violations** | Code Quality #2,8,9 | 🟡 |

---

## Wave 1 — Quick wins (1-2 dias dev, alto ROI)

> Tudo abaixo de 1h cada. Soma ~6h dev. Atacar primeiro.

### W1.1 — Extract `SITE_URL` constant
**Severidade:** 🔴 | **Esforço:** S (30min)
**Paths:** 11 arquivos com `process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com.br"` duplicado
- [src/lib/seo.ts:7](src/lib/seo.ts#L7), [src/app/sitemap.ts:13](src/app/sitemap.ts#L13), [src/app/robots.ts:3](src/app/robots.ts#L3), [src/app/sobre/page.tsx:97](src/app/sobre/page.tsx#L97), [src/app/llms.txt/route.ts:5](src/app/llms.txt/route.ts#L5), [src/app/busca/page.tsx:50](src/app/busca/page.tsx#L50), [src/app/imoveis/[bairro]/page.tsx:163](src/app/imoveis/[bairro]/page.tsx), [src/app/autor/[slug]/page.tsx:30](src/app/autor/[slug]/page.tsx), [src/app/empreendimento/[slug]/page.tsx:172](src/app/empreendimento/[slug]/page.tsx), [src/app/api/cron/publish-scheduled/route.ts:22](src/app/api/cron/publish-scheduled/route.ts), [src/app/admin/blog/_actions.ts:25](src/app/admin/blog/_actions.ts)

**Fix:** criar `src/lib/constants.ts` com `export const SITE_URL = ...`, importar em todos.

### W1.2 — Extract `formatCompactCurrency` duplicado
**Severidade:** 🔴 | **Esforço:** S (15min)
**Paths:** [src/components/search/filters/PriceFilter.tsx:23-50](src/components/search/filters/PriceFilter.tsx#L23) + [src/components/search/useSearchBarController.ts:75-93](src/components/search/useSearchBarController.ts#L75)

**Fix:** consolidar em `src/lib/utils.ts` como `formatCompactPrice(value)`.

### W1.3 — Fix `formatPrice` redefinido localmente
**Severidade:** 🟡 | **Esforço:** S (5min)
**Path:** [src/app/imoveis/[bairro]/page.tsx:103](src/app/imoveis/[bairro]/page.tsx) — redefine função local que ignora `style: "currency"` do utils

**Fix:** importar de `@/lib/utils`, remover redefinição.

### W1.4 — Remover `cache: "no-store"` em `/api/search/facets`
**Severidade:** 🟡 | **Esforço:** S (5min)
**Path:** [src/components/search/useSearchBarController.ts:247](src/components/search/useSearchBarController.ts#L247)
**Impacto:** +80-120ms LCP economizado/sessão (cache Vercel reativado)

**Fix:** remover prop `cache: "no-store"` — facets só mudam a cada 15min, faz sentido cachear.

### W1.5 — Parallelizar `generateStaticParams` em faixa de preço
**Severidade:** 🟡 | **Esforço:** S (30min)
**Path:** [src/app/imoveis/preco/[faixa]/page.tsx:82-94](src/app/imoveis/preco/[faixa]/page.tsx)
**Impacto:** -2s build time (5 fetches sequenciais → paralelos)

**Fix:** `await Promise.all(FAIXAS.map(...))`.

### W1.6 — Loft API sandbox toggle via env
**Severidade:** 🟡 | **Esforço:** S (30min)
**Path:** [src/services/loft.ts:20](src/services/loft.ts#L20) — endpoint hardcoded `brunoces-rest.vistahost.com.br`
**Por que:** CLAUDE.md exige testes em sandbox, mas não há mecanismo. Dev tem que editar código.

**Fix:** adicionar `LOFT_API_BASE_URL` env var (default produção). Documentar em `.env.example`.

### W1.7 — `FavoriteButton` localStorage defer
**Severidade:** 🟡 | **Esforço:** S (30min)
**Path:** [src/components/property/card/FavoriteButton.tsx](src/components/property/card/FavoriteButton.tsx)
**Impacto:** -50-100ms TBT em pages com 24+ cards

**Fix:** envolver leitura inicial em `requestIdleCallback` + fallback "loading":
```ts
useEffect(() => {
  requestIdleCallback(() => setIsWishlisted(isInWishlist(codigo)))
}, [])
```

### W1.8 — `PropertyMap` CSS preload
**Severidade:** 🟡 | **Esforço:** S (30min)
**Path:** [src/components/property/PropertyMap.tsx:57-62](src/components/property/PropertyMap.tsx#L57)
**Impacto:** CLS -0.05 quando mapa entra viewport

**Fix:** adicionar `<link rel="preload" href="...maplibre-gl.css" as="style">` no layout do `/imovel/[slug]`.

### W1.9 — Reduzir `limit: 1000` → `limit: 500` em landings
**Severidade:** 🟡 | **Esforço:** S (15min × 5 páginas = 1h)
**Paths:** [src/app/apartamentos-curitiba/page.tsx:25](src/app/apartamentos-curitiba/page.tsx#L25), `casas-curitiba`, `sobrados-curitiba`, `terrenos-curitiba`, `imoveis/[bairro]/page.tsx:51`
**Impacto:** -100-150ms CPU + -80KB cache size por página

**Fix:** Não há razão pra fetch 1000 (catálogo total ~248). Reduzir pra 500 (margem de segurança).

### W1.10 — Magic numbers: scoring weights + meta length
**Severidade:** 🟡 | **Esforço:** S (1h)
**Paths:** [src/lib/property-relevance.ts:21-150](src/lib/property-relevance.ts) (15 magic numbers), [src/lib/seo.ts:355,484](src/lib/seo.ts) (`160` chars)

**Fix:** extrair em `constants.ts`:
```ts
export const SCORING_WEIGHTS = {
  SUPER_DESTAQUE: 150,
  DESTAQUE: 100,
  PHOTO_PER_UNIT: 3,
  MAX_PHOTO_SCORE: 15,
} as const
export const MAX_META_DESCRIPTION_LENGTH = 160
```

### W1.11 — Remove `getAllBairros` redundante na home
**Severidade:** 🟡 | **Esforço:** S (10min)
**Path:** [src/app/page.tsx:76](src/app/page.tsx#L76) — chama `getAllBairros()` E `getAllBairrosByCidade()` em paralelo, ambas derivam dos mesmos dados

**Fix:** usar só `getAllBairrosByCidade()` (já tem cidade explícita pro autocomplete).

### W1.12 — Remove redundant comments (`formatArea`, `PriceFilter`)
**Severidade:** 🟡 | **Esforço:** S (15min)
**Paths:** [src/lib/utils.ts:94-95](src/lib/utils.ts#L94), [src/components/search/filters/PriceFilter.tsx:6-8](src/components/search/filters/PriceFilter.tsx#L6)

**Fix:** remover comentários que repetem o nome da função (CLAUDE.md proíbe).

**Subtotal Wave 1:** ~6h, todos S, alto ROI

---

## Wave 2 — Refactors médios (3-5 dias dev)

### W2.1 — Landing pages: factory pattern
**Severidade:** 🔴 | **Esforço:** M (2-3h)
**Paths:** 4 arquivos quase idênticos:
- [src/app/apartamentos-curitiba/[finalidade]/page.tsx](src/app/apartamentos-curitiba/[finalidade]/page.tsx)
- `casas-curitiba/[finalidade]/page.tsx`
- `sobrados-curitiba/[finalidade]/page.tsx`
- `terrenos-curitiba/[finalidade]/page.tsx`

**Por que:** 42 linhas idênticas em 4 arquivos = 168 LOC duplicado. Mudança em padrão = 4 edits.

**Fix:** criar `src/app/_templates/tipo-finalidade-page.ts` que exporta factory:
```ts
export function createTipoFinalidadePage(config: { tipo, tipoPlural, tipoSlug }) {
  return { generateStaticParams, generateMetadata, default: PageComponent }
}
```
Cada page.tsx vira:
```ts
export const { generateStaticParams, generateMetadata, default } =
  createTipoFinalidadePage({ tipo: "Apartamento", tipoPlural: "apartamentos", tipoSlug: "apartamentos-curitiba" })
```

**Bonus:** futuras páginas (`/coberturas-curitiba`) precisam só 3 linhas em vez de 42.

### W2.2 — Services wrapper pra fetch client (eliminar layer leaks)
**Severidade:** 🟡 | **Esforço:** M (2-3h)
**Paths:**
- [src/components/search/useSearchBarController.ts:233](src/components/search/useSearchBarController.ts#L233) → fetch direto `/api/search/facets`
- [src/components/shared/ContactForm.tsx:88](src/components/shared/ContactForm.tsx#L88) → fetch direto `/api/lead`
- [src/components/property/ContactSidebar.tsx](src/components/property/ContactSidebar.tsx) → mesma chamada

**Fix:** criar `src/services/search-client.ts`:
```ts
"use client"
export async function getFacets(filters: FacetFilters): Promise<FacetResponse> {
  const res = await fetch("/api/search/facets", { method: "POST", body: JSON.stringify(filters) })
  if (!res.ok) throw new ApiError(res)
  return res.json()
}
```
Componentes só chamam `getFacets(...)` — testável, mockável, type-safe.

### W2.3 — `mapRawToProperty`: extract `determineFinalidade`
**Severidade:** 🔴 | **Esforço:** M (1h)
**Path:** [src/services/loft.ts:311-326](src/services/loft.ts#L311) — chain de 6 if/else (incidente 22/04 documentado)

**Fix:** extrair em função nomeada:
```ts
function determineFinalidade(
  status: string,
  valorVenda: number,
  valorLoc: number
): Property["finalidade"] {
  // switch claro
}
```
Comentário do incidente fica na função extraída.

### W2.4 — Type safety: `Record<string, unknown>` → tipos reais
**Severidade:** 🔴 | **Esforço:** M (2h)
**Path:** [src/services/loft.ts:253,255,261,263](src/services/loft.ts#L253) (8 ocorrências)

**Fix:** estender `LoftPropertyRaw` com:
```ts
type LoftCharacteristics = Record<string, "Sim" | "Não">
type LoftPropertyRaw = {
  // ... fields existentes
  Caracteristicas?: LoftCharacteristics
  InfraEstrutura?: LoftCharacteristics
}
```
Remover assertions duplas em todos os call sites.

### W2.5 — `PropertyType` validation (whitelist)
**Severidade:** 🟡 | **Esforço:** M (1h)
**Path:** [src/services/loft.ts:354](src/services/loft.ts#L354) — `(raw.Categoria || "Apartamento") as PropertyType`

**Fix:**
```ts
const VALID_PROPERTY_TYPES = ["Apartamento", "Casa", "Sobrado", ...] as const
function parsePropertyType(cat: unknown): PropertyType {
  if (typeof cat === "string" && VALID_PROPERTY_TYPES.includes(cat as never)) {
    return cat as PropertyType
  }
  return "Apartamento" // fallback documentado
}
```

### W2.6 — Revalidate uniformizar 3600s (1h)
**Severidade:** 🟡 | **Esforço:** S (5min)
**Path:** [src/services/loft.ts:26](src/services/loft.ts#L26) — `REVALIDATE_SECONDS = 900`
**Impacto:** -2.16K writes ISR/mês (~R$10-20/mês economia infra)

**Fix:** mudar pra `3600` (já é o valor de `/imovel/[slug]`). Bruno não muda imóveis a cada 15min.

### W2.7 — Extract types `CARAC_LABELS` pra `/types`
**Severidade:** 🟢 | **Esforço:** S (30min)
**Path:** [src/services/loft.ts:10-60](src/services/loft.ts#L10) — `CARAC_FIELDS`, `CARAC_LABELS`, `INFRA_FIELDS`, `INFRA_LABELS`

**Fix:** mover pra `src/types/characteristics.ts` (componentes de filtro importam de types, não services).

**Subtotal Wave 2:** ~10h, M predominante

---

## Wave 3 — Strategic (1-2 semanas)

### W3.1 — Split `src/lib/seo.ts` em 3 arquivos
**Severidade:** 🔴 | **Esforço:** L (4-6h)
**Path:** [src/lib/seo.ts](src/lib/seo.ts) — 1000+ linhas, 3 responsabilidades misturadas

**Fix:**
- `src/lib/seo/schema.ts` — `generate*Schema` (RealEstateAgent, Article, FAQPage, HowTo, AggregateOffer, etc)
- `src/lib/seo/faq.ts` — `generateLandingFAQ`, `generateDynamicFAQ`, `generateComprarApartamentoFAQ`
- `src/lib/seo/metadata.ts` — `generateLandingTitle`, `generateLandingDescription`, `generatePropertyDescription`
- `src/lib/seo/index.ts` — re-exports pra compat

**Cuidado:** ~50+ imports em todo codebase. Fazer em 1 PR único, não fragmentar.

### W3.2 — Admin isolation security audit
**Severidade:** 🔴 | **Esforço:** M (2-3h)
**Path:** `src/app/admin/*`, `src/app/api/admin/*` (se existir)
**Por que crítico:** não há evidência clara que cada server action de escrita valida `auth()`. Risco de exposição de CRUD de blog/autor por usuário não-autenticado.

**Fix:**
1. Auditar cada `_actions.ts` em admin/ — confirmar `await auth()` + redirect/throw em cada export
2. Testar manualmente: requisição direta sem cookie → deve 403
3. Documentar padrão em CLAUDE.md (regra de escrita admin)

**Não pular esse.** Bug aqui = vazamento de dados.

### W3.3 — Domain logic mover de `/lib` pra `/services`
**Severidade:** 🟡 | **Esforço:** L (4-6h)
**Paths:**
- [src/lib/property-relevance.ts](src/lib/property-relevance.ts) — algoritmo de score (lógica de domínio)
- [src/lib/property-price.ts](src/lib/property-price.ts) — regras de preço display
- Lógica de FAQ dinâmica em `seo.ts` — domínio imobiliário

**Por que:** `/lib` é pra utilities genéricas. `/services` é pra lógica de domínio. Padrão melhora coesão + testabilidade.

**Fix:** mover funções pra `src/services/property/relevance.ts`, `price.ts`. Atualizar imports.

**Pode diferir:** não bloqueia nada, mas evita acumular mais código de domínio em `/lib`.

### W3.4 — `loft.ts` unit tests (regressão)
**Severidade:** 🟡 | **Esforço:** M (2-3h)
**Path:** novo `src/services/__tests__/loft.test.ts`
**Por que:** `mapRawToProperty` parseia 100+ campos, edge cases (foto quebrada, status ambíguo) já causaram incidente em 22/04. Nenhum teste hoje.

**Fix:** Vitest + fixtures de payload Loft real:
- Casos do incidente 22/04 (status ambíguo, preço residual)
- Fotos quebradas / sem foto destaque
- Slug collisions em 250 imóveis (mock)
- `applyFilters` casos de borda

**Nota:** memory `feedback_no_suppositions` proíbe mocks DB, mas testes unitários de mapping são isolados (mockar só `fetchLoftAPI` resposta).

### W3.5 — `DeferredHydration` audit + apply
**Severidade:** 🟢 | **Esforço:** M (3-4h)
**Path:** [src/components/shared/DeferredHydration.tsx](src/components/shared/DeferredHydration.tsx)
**Por que:** componente bem feito mas usado só 2x. Vários componentes `'use client'` não-interativos poderiam usar.

**Fix:**
1. Listar top 20 `'use client'` components via grep
2. Avaliar interatividade real de cada
3. Aplicar `<DeferredHydration>` ou `next/dynamic({ ssr: false })` nos pesados sem interação inicial

### W3.6 — `getProperties(limit)` em metadata: deduplicar com page render
**Severidade:** 🟡 | **Esforço:** M (1.5h)
**Path:** [src/app/imoveis/[bairro]/page.tsx:51](src/app/imoveis/[bairro]/page.tsx) (e similares)
**Impacto:** -50-80ms LCP em landings

**Fix:** computar stats (precoMin/Max) em função compartilhada, memoizar, reusar em metadata + render.

### W3.7 — `PropertyCard` variants pattern
**Severidade:** 🟢 | **Esforço:** M (2-3h)
**Paths:** `PropertyCardGrid`, `PropertyCardList`, `PropertyCardCompact`, `PropertyCard`

**Fix:** export composto `<PropertyCard.Grid>`, `<PropertyCard.List>` ou `variant` prop. Reduz risco de divergência visual.

**Subtotal Wave 3:** ~20h, mistura M/L

---

## Wave 4 — Backlog (não urgente)

### W4.1 — Rate-limit middleware (mover de handlers pra middleware)
🟢 Minor | M (2h) | [src/app/api/lead/route.ts:15-26](src/app/api/lead/route.ts) hoje implementa per-handler

### W4.2 — `blog.ts` wrapper deprecation
🟢 Minor | S (1h) | quando Supabase 100% estável (3+ sprints), remover dual-source

### W4.3 — API response format padronização
🟢 Minor | M (1-2h) | criar `src/lib/api-response.ts` com `apiSuccess()` / `apiError()` helpers

### W4.4 — Test coverage geral
🟢 Minor | L (8-16h) | hoje só smoke test 25 rotas. Adicionar Vitest setup + cobertura crítica

### W4.5 — Component-level: `HomeCarousel` server shuffle
🟢 Minor | S (30min) | mover Fisher-Yates pro server, evitar TBT no client

### W4.6 — `DeferredGA` singleton
🟢 Minor | S (30min) | garantir único listener via global flag

### W4.7 — `generatePropertySlug` dead code check
🟢 Minor | S (15min) | função retorna sempre o param já fornecido — verificar callers, remover ou estender

### W4.8 — Fix `any` em 4 arquivos
🟡 Medium | M (1-2h) | layout.tsx, BedroomsFilter, AdvancedFields, PropertyGallery

---

## Métricas pós-implementação esperadas

Se Wave 1 + Wave 2 forem aplicadas:

| Métrica | Atual | Pós-W1+W2 | Delta |
|---|---|---|---|
| Build time landings | ~120s | ~110s | -10s |
| LCP médio mobile | ? (medir) | -100-150ms | -10% |
| TBT médio mobile | ? | -50-100ms | melhoria |
| Bundle JS landings | ~? | -3-5KB | small |
| ISR writes/mês | ~3.6K | ~1.5K | -2.1K |
| Custo Vercel/mês | ~? | -R$10-20 | small |
| LOC duplicado | ~250+ | ~50 | -80% |
| Layer leaks | 3 | 0 | -100% |

Se Wave 3 também for aplicada:
- `seo.ts` legibilidade ++
- Test coverage 0% → ~30% áreas críticas
- Risco segurança admin: auditado e fechado

---

## Plano executivo recomendado

### Próxima sprint (1 semana)
- **Wave 1 completa** (~6h dev) — todas quick wins
- **W3.2 — Admin audit** (2-3h) — segurança, não dá pra pular
- **W2.6 — Revalidate uniform 3600s** (5min, vem com W1)

### Sprint seguinte (1-2 semanas)
- **Wave 2 completa** (~10h dev)
- Foco: landing factory + services wrapper + loft.ts refactor

### Mês seguinte
- **W3.1 — Split seo.ts** (4-6h) — quanto mais cresce, mais difícil
- **W3.4 — loft.ts unit tests** (2-3h) — segurar contra regressão
- Resto Wave 3 conforme necessidade

### Backlog (recolher quando aplicável)
- Wave 4 inteira

---

## Pontos positivos (não tocar)

✅ **Server Components por padrão** — bem aplicado
✅ **ISR + unstable_cache** — granularidade correta
✅ **Schema markup rico** — diferencial vs concorrentes
✅ **Type system forte** em geral (Property, PropertyType bem modelados)
✅ **Comentários de trade-off** documentam incidentes (22/04, hipóteses)
✅ **DeferredGA + 12s timeout** — pattern correto
✅ **Dynamic imports** pra mapa, carousel — corretos
✅ **PropertyGallery sem Next/Image em fullscreen** — UX-aware
✅ **React Compiler habilitado** — reduz re-renders compile-time
✅ **propertyProjection** — payload mínimo na rede
✅ **Smoke test 25 rotas** automatizado pós-deploy
✅ **CLAUDE.md aplicado consistentemente** — convenções respeitadas

---

## Apêndice — Achados não priorizados

Achados que **não foram listados acima** porque são minor + baixo ROI:
- HomeCarousel shuffle no client (5-15ms INP) — fix em W4
- DeferredGA listener orphans (<1ms) — fix em W4
- PropertyGallery cleanup edge case (<1ms) — não impacta
- Comentários "what" em 2-3 lugares (já listados em W1.12)

---

## Origem do relatório

3 agentes executados em paralelo:
- **Architecture Agent** — Explore subagent | 12 achados | 47 tool uses | 120s
- **Performance Agent** — Explore subagent | 12 achados | 41 tool uses | 112s
- **Code Quality Agent** — Explore subagent | 17 achados | 67 tool uses | 156s

**Total tokens consumidos:** ~240K | **Tempo de investigação:** ~2.5 min em paralelo

Achados deduplicados via cross-reference manual. 41 únicos identificados, agrupados em 4 waves por ROI/urgência.
