# Attribution — Rastrear causa real, não estimar

Quando o Lighthouse diz "TBT piorou" ou "bundle cresceu", o protocolo para descobrir **O QUÊ exatamente causou** antes de propor correção.

**Regra:** não propor fix sem primeiro atribuir a causa a um artefato identificável (chunk, task, resource, elemento).

## Por tipo de métrica

### 1. Bundle size changes

**Sinal:** bundle total cresceu/diminuiu após um commit.

**Ferramentas (em ordem):**

1. `npm run perf:bundle` antes + depois, diff → identifica chunks com delta
2. `ANALYZE=true npm run build` → abre `.next/analyze/client.html` — treemap interativo com os 2 estados se rodar antes/depois
3. `npx source-map-explorer .next/static/chunks/<chunk-id>.js` — se um chunk específico cresceu, source-map diz **qual arquivo do seu código** contribuiu

**Output esperado da attribution:**
> "Chunk `X.js` cresceu +12KB. `source-map-explorer` aponta +10KB em `node_modules/@some-pkg/heavy-module.js` e +2KB em `src/components/NewFeature.tsx`."

**NÃO aceitar:** "o bundle cresceu por causa do React" — sem evidência de chunk + file.

### 2. TBT — tempo de scripting

**Sinal:** TBT piorou.

**Ferramentas:**

1. Lighthouse JSON → audit `long-tasks`:
   ```js
   // Extrair:
   lighthouse.audits['long-tasks'].details.items
   // Cada item tem: duration, startTime, url (atribuição), ...
   ```
2. Filtrar: tasks com `duration > 50ms` — essas bloqueiam o main thread
3. Identificar o `url` atribuído a cada task — se for um chunk do seu app, cruzar com bundle-analyzer
4. [Long Tasks API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming) em RUM se precisar produção real

**Output esperado:**
> "Chunk `app/busca/page-chunk.js` executa 238ms em `long-tasks`, causando 188ms de blocking. Bundle-analyzer aponta que 60% desse chunk é `@base-ui/react/dialog`. Hipótese: migrar `<Sheet>` para `<dialog>` nativo removeria esse módulo."

**NÃO aceitar:** "TBT piorou porque o código ficou mais pesado" — sem apontar chunk + task.

### 3. LCP — pintura do elemento principal

**Sinal:** LCP piorou (ou não melhorou com fetchpriority).

**Ferramentas (Lighthouse audits):**

1. `largest-contentful-paint-element` → qual elemento é o LCP (ex: `<img class="...">`)
2. `lcp-discovery-insight` → está `eagerlyLoaded`? `priorityHinted`? `requestDiscoverable`?
3. `lcp-breakdown-insight` → quanto tempo em cada sub-part:
   - **TTFB** (tempo até HTML chegar)
   - **Resource Load Delay** (tempo entre HTML chegar e o browser decidir baixar a imagem)
   - **Resource Load Duration** (download em si)
   - **Element Render Delay** (tempo entre imagem baixada e pintada)

**Output esperado:**
> "LCP = 4.9s. Breakdown: TTFB 134ms + Load Delay 680ms + Duration 78ms + Render Delay 960ms. O gargalo é o Render Delay — main thread ocupado impede paint. Não adianta preload ou fetchpriority — preciso reduzir TBT."

**NÃO aceitar:** "LCP vai melhorar com `fetchpriority=high`" sem ter verificado se o gargalo atual é `Resource Load Delay` (onde fetchpriority ajuda) ou `Render Delay` (onde não ajuda).

### 4. HTML size (qualquer mudança que toque o HTML servido)

**Sinal:** mudança que pode alterar o HTML de resposta (inlineCss, inline schemas, streaming changes, SSR output, after() API, parallel routes).

**Ferramenta obrigatória antes do commit:**

```bash
# Build local + curl ANTES de push
npm run build && npm start &
# Em outro terminal:
curl -sL http://localhost:3000/<rota> | wc -c
kill %1
```

**Compare com baseline anterior. Se crescer > predicted, investigue antes de commitar.**

**Por que isso importa:** nem sempre o número que Lighthouse ou docs reportam bate com a realidade. Ex: `render-blocking-resources` audit fala em "25 KB CSS crítico" mas `inlineCss` embute o CSS **total** da página (pode ser 10× maior).

**Caso real (H-20260417-004):** `inlineCss: true` foi predicted +20-30KB (baseado em audit), virou +326KB real (CSS total do Tailwind + componentes). Teria sido detectado em 10s de `curl | wc -c` local antes do deploy. Regressão de LCP +238ms, TBT +237ms em prod.

**Output esperado da attribution:**
> "Local build: curl /busca antes = 682KB, depois = 1008KB. +326KB, acima do predicted +30KB. Investigar antes de deployar."

### 5. Third-party cost

**Sinal:** suspeita de GA4, Turnstile, Analytics causando TBT.

**Ferramentas:**

1. Lighthouse audit `third-party-summary` — retorna por domínio: bytes transferred, main-thread time, blocking time
2. Se `items: []` → zero impacto de third-party (foi o caso do fymoob nesta sessão)
3. Se há impacto, identifica domínio → trabalhar defer/lazy dele específico

**Output esperado:**
> "third-party-summary vazio, zero impacto de third-parties em mobile Lighthouse. Não atacar GA4."

### 6. CLS — layout shift

**Sinal:** CLS aumentou de ~0 para > 0.1.

**Ferramentas:**

1. Lighthouse audit `layout-shift-elements` — qual elemento shiftou
2. `cumulative-layout-shift` → valor e sessões
3. Chrome DevTools → Performance → Layout Shift records (manual)

**Output esperado:**
> "Elemento `div.h-96` em `LazyContactSidebar.tsx:13` shiftou 0.078 porque o placeholder h-96 é menor que o sidebar real (altura ~480px). Fix: ajustar placeholder para h-[480px]."

## Checklist de attribution

Antes de propor fix, confirmar:

- [ ] A métrica que está tentando melhorar (TBT/LCP/CLS/bundle) foi medida e tem CoV aceitável
- [ ] Identifiquei o **artefato específico** (chunk-id / url da task / elemento do CLS / arquivo source)
- [ ] O artefato está **na minha árvore** (não é third-party — se for, decisão diferente)
- [ ] O **mecanismo causal** está claro (por que esse artefato causa essa métrica?)
- [ ] Se a minha hipótese assume X, validei X (ex: "assumimos que o polyfill executa em mobile" → grep HTML revelou `nomodule` → assumption invalid)

## Exemplo — sessão polyfill (o que NÃO deveria ter acontecido)

**Estimativa original (inflada):** "Remover polyfill salva 110KB TBT"

**Attribution que NÃO foi feita:**
```bash
curl -s https://fymoob-website.vercel.app/busca | grep -oE '<script[^>]*polyfill[^>]*>'
# → <script src="/_next/static/chunks/a6dad97*" noModule="">
#   noModule → browsers modernos ignoram → ganho zero em mobile
```

Se tivéssemos feito o grep **antes** de começar a tentar remover, 30 minutos economizados.

## Referências

- [Long Tasks API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming)
- [LCP breakdown explained (web.dev)](https://web.dev/articles/optimize-lcp)
- [source-map-explorer](https://github.com/danvk/source-map-explorer)
- [Lighthouse audits reference](https://developer.chrome.com/docs/lighthouse/overview)
