# Baseline de Performance — FYMOOB

Referência canônica do estado atual de performance. **Atualizar após cada mudança material** (`npm run perf:baseline` + `npm run perf:bundle`).

> Última atualização: **2026-04-16**
> Commit de referência: `61bb4e7` (FilterSection details) — fim da sessão de otimização de abril.

---

## Stack + infra de medição ativa

- **Framework:** Next.js 16.1.6 (App Router + Turbopack)
- **Deploy:** Vercel Edge
- **CDN imagens:** cdn.vistahost.com.br (CRM Loft)
- **Analytics:** GA4 via `DeferredGA` (1º scroll/click OU 12s fallback — zero impacto Lighthouse mobile)
- **Ferramentas de medição:**
  - `@next/bundle-analyzer` — `ANALYZE=true npm run build`
  - `size-limit` — `.size-limit.json` + `npm run size`
  - `source-map-explorer` — `npx source-map-explorer .next/static/chunks/*.js`
  - `scripts/perf/lighthouse-median.js` — 5 runs, mediana, CoV gate < 10%
  - `scripts/perf/bundle-snapshot.js` — extrai build-manifest.json
  - `scripts/perf/diff-snapshots.js` — diff antes/depois

---

## Bundle — First Load JS por categoria

Medido em build de produção (`.next/static/chunks/`). Números RAW (sem gzip/brotli).

| Categoria | Tamanho | Conteúdo dominante |
|-----------|---------|--------------------|
| **rootMainFiles** (shared em toda rota) | **400.7 KB** | react-dom 218 + Next runtime 82.5 + navigation 48.6 + core 32.1 + boot 9.3 + turbopack 10 |
| **polyfill legacy** (`<script nomodule>`) | **110.0 KB** | core-js + Promise + Symbol — **browsers modernos ignoram** |
| **/busca rota-específica** (12 chunks) | **247.7 KB** | @base-ui 3 chunks (~102 KB) + SearchBar+Cards 40 KB + layout 30 KB + outros |
| **Lucide icons parasita** (99% unused no runtime) | **~75 KB** | `4bafbefc9e420439.js` — barrel não faz tree-shake para shadcn aliases |
| **TOTAL /busca first-load** | **~763 KB raw / ~240 KB gzip estimado** | |

### Shared chunks (rootMainFiles) detalhado
- `69be39811437728d.js` — 218.2 KB — **react-dom** (framework, intocável)
- `068649e8eb29b8d9.js` — 82.5 KB — Next runtime (layout-router, hydration)
- `d8faa6dfe10b9fc9.js` — 48.6 KB — Next redirect/navigation
- `f091501564eb2ea3.js` — 32.1 KB — Next client core
- `3f246955183e6fd4.js` — 9.3 KB — Next bootstrap
- `turbopack-*.js` — 10.0 KB — Turbopack runtime

---

## Lighthouse mobile — `/busca` (MEDIÇÃO OFICIAL 2026-04-17)

**Fonte:** `docs/perf/baselines/2026-04-17-busca.json` — 5 runs, mediana, CoV gate < 10%, script `lighthouse-median.js` v1.

| Métrica | Mediana | Mean | StdDev | CoV | Samples | Reliability |
|---------|---------|------|--------|-----|---------|-------------|
| **Score** | **65** | 65 | 1.0 | 1.6% | [65, 66, 65, 67, 64] | ✅ Excelente |
| **LCP** | **4.84s** | 4.74s | 429ms | 9.1% | [3.9s, 4.75s, 5.19s, 4.84s, 4.98s] | ✅ Aceitável |
| **TBT** | **645ms** | 638ms | 30ms | 4.7% | [647, 683, 627, 591, 645] | ✅ Excelente |
| **CLS** | **0.000** | 0.031 | 0.039 | 122.5% | [0.078, 0, 0, 0, 0.078] | ⚠️ 2 samples com shift |
| **FCP** | **1.23s** | 1.28s | 103ms | 8.1% | [1.49s, 1.23s, 1.22s, 1.24s, 1.23s] | ✅ Aceitável |
| **SI** | **2.55s** | 3.09s | 1182ms | 38.3% | [5.45s, 2.55s, 2.47s, 2.37s, 2.61s] | ❌ Muito ruidoso |

**Max CoV (score/LCP/TBT): 9.1% — passa gate de 10%. Medição aceita como baseline canônico.**

**Observações importantes:**
- TBT **645ms** (não 580ms como estimei em sessões anteriores sem rigor) — medições pontuais pré-protocolo estavam dentro da variance. Valor real é mais alto.
- CLS tem 2/5 samples com 0.078 — mediana dá 0 mas há algo shiftando intermitentemente. Investigar.
- Speed Index com CoV 38% indica que a run 1 foi outlier (5.45s) — típico do "first cold start" em Vercel. Valor mediano confiável: 2.55s.

---

## LCP breakdown atual — onde está o gargalo

Média 3 runs do `lcp-breakdown-insight`:

| Subpart | Média | % do LCP | Diagnóstico |
|---------|-------|----------|-------------|
| TTFB | 117ms | 5% | ✅ Excelente (Vercel Edge) |
| Resource Load Delay | 680ms | 28% | Browser espera main-thread liberar |
| Resource Load Duration | 78ms | 3% | ✅ CDN Vistahost rápida |
| **Element Render Delay** | **960ms** | **40%** | ❌ **Principal gargalo** — main thread ocupado |

**Interpretação:** o LCP não é limitado por network ou CDN. É limitado por **JS execution** bloqueando o paint. Reduzir TBT → reduz Element Render Delay → reduz LCP.

---

## Top JS execution culprits (Lighthouse v5)

Por tempo de scripting (média 3 runs, mobile throttled):

| Chunk | Scripting | Natureza | Mitigação possível |
|-------|-----------|----------|--------------------|
| `69be39811437728d.js` | **~1.7s** | react-dom (218 KB) | Intocável (é o framework) |
| /busca document | ~977ms | Hydration + SSR eval | Reduzir client components |
| `3f246955183e6fd4.js` | ~230ms | Next bootstrap (9 KB) | Intocável |
| `068649e8eb29b8d9.js` | ~200ms | Next runtime (82 KB) | Intocável |
| `ee11f1c795565975.js` | ~87ms | Route-specific (32 KB) | Investigar conteúdo |

**Terceiros:** zero impacto (`third-party-summary` vazio).

---

## Sessão de otimização abril 2026 — o que foi medido vs estimado

| Commit | Esperado | Medido (delta vs sessão anterior) |
|--------|----------|-----------------------------------|
| `bb2d0c0` Sessão A (SearchPageSearchBar SSR + PriceFilter dynamic) | -100-200ms TBT | medido: -40% TBT cumulativo |
| `b6159ce` Sessão B (filtros pesados dynamic) | -200-400ms TBT | consolidado no mesmo v2 |
| `26e5750` fetchPriority high | -400-600ms LCP | **0ms** (já era `priority`) |
| `e9186b4` LocationFilter sem cmdk | -15 KB JS | ~estável (cmdk tinha menos impacto que esperado) |
| `a16ec04` priority só mobile | -100ms TBT | ~estável |
| `4e21016` Fix 2 completo (CSS scroll-snap + islands) | -200-400ms TBT | **~0ms** (gargalo não era carousel JS) |
| `61bb4e7` FilterSection details | -10-20ms TBT | medido: estável (marginal) |

**Lições aprendidas (registradas em `.claude/protocols/MEASURE-BEFORE-CLAIM.md`):**

1. Polyfill `a6dad97` — "removê-lo salva 110KB" era falso (`nomodule`, browsers modernos ignoram)
2. Lucide modularize — "tree-shake salva 60KB" quebrou build (shadcn usa aliases `CheckIcon` incompatíveis com transform)
3. 4 de 7 commits tiveram delta próximo de zero — atribuição original de causa estava errada

---

## Metas (próximo ciclo de otimização)

Não partir pra próxima mudança **sem** hipótese em `docs/perf/hypotheses/` (template: `.claude/protocols/HYPOTHESIS.md`).

| Métrica | Atual (oficial 2026-04-17) | Meta | Gap |
|---------|---------------------------|------|-----|
| Score mobile | 65 | ≥ 80 | +15 pts |
| LCP mobile | 4.84s | < 3.5s | -1.34s |
| TBT mobile | 645ms | < 400ms | -245ms |
| CLS | 0 mediana (2/5 samples 0.078) | < 0.1 | ⚠️ investigar intermitência |
| Bundle /busca total | 758 KB | < 600 KB | -158 KB |

**Hipóteses priorizadas** (cada uma deve virar um arquivo `docs/perf/hypotheses/H-*.md` antes de implementar):
1. Trocar `@base-ui/react` Popover/Sheet por HTML nativo (`<details>`, `<dialog>`) — **predicted -100 KB raw, MEASUREMENT_REQUIRED para TBT**
2. Split `SearchBar.tsx` (1170 linhas) em Mobile/Desktop separados — **predicted -20 KB por viewport, MEASUREMENT_REQUIRED**
3. Lucide tree-shaking manual — editar 8 arquivos shadcn para usar nomes sem sufixo `Icon` — **predicted -60 KB raw**
4. `PropertyCard` server shell refactor completo — **MEASUREMENT_REQUIRED** (alto risco, escopo grande)

---

## Como atualizar este baseline

```bash
# 1. Build limpo
rm -rf .next && npm run build

# 2. Bundle snapshot
npm run perf:bundle

# 3. Lighthouse baselines (mudar URL conforme rota)
npm run perf:baseline -- https://fymoob-website.vercel.app/busca --label=busca

# 4. Atualizar este arquivo com os números mais recentes
# 5. Commitar junto com os arquivos gerados em docs/perf/baselines/ e bundle-snapshots/
```

---

## Referências

- Protocolos: `.claude/protocols/HYPOTHESIS.md`, `.claude/protocols/MEASURE-BEFORE-CLAIM.md`, `.claude/protocols/STATISTICAL-RIGOR.md`, `.claude/protocols/ATTRIBUTION.md`
- Plano: `C:\Users\Vine\.claude\plans\reactive-wishing-hummingbird.md`
- Commits relevantes: `git log --grep="perf" --oneline`
