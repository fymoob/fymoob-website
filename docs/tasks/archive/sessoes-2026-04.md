# Archive — Sessoes de Abril/2026 (historico)

> Sessoes de abril/2026 (perf /busca, security hardening, PDP, Visual Premium).
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


---

**Sessao 2026-04-17 extras:**
- Fase 15 marcada concluida — form lead `/api/lead` esta em prod, roda via POST Loft com rate-limit + Turnstile + LGPD (fluxo ja implementado, ver `Estado atual dos formularios`).
- Nova Fase 15.A — decisao Supabase vs Nhost para backend storage (recomendacao: Supabase, por Auth.js adapter first-party + dashboard cliente-friendly + sa-east-1 confirmado). 10 tasks pra setup inicial antes de persistir leads (Fase 15.17).
- Favoritos mobile: card simplificado (commit `ccecfe2`) — sem carousel, trash inline, validado via Playwright (arrows=0, trash=2, remove funciona).

**Sessao 2026-04-18:**
- Fix pills cards ("Locacao" em vez de "Aluguel") — commit `aca89aa`.
- Fix autocomplete RMC: Bruno reportou Colombo nao aparecer no filtro de Localizacao. Bug estrutural em `getAllBairros()` agregava bairros homonimos entre cidades. Nova funcao `getAllBairrosByCidade()` com chave composta `cidade|bairro` — usada SO pelo autocomplete. Rotas `/imoveis/[bairro]` inalteradas.
- Documentacao da decisao: `docs/url-structure-multi-city.md`. Fase 2 (refactor URL pra `/imoveis/[cidade]/[bairro]` estilo Zap/VivaReal) condicionada a gatilhos: volume fora de Curitiba > 15% OU decisao estrategica RMC OU colisao de SEO no GSC.
- Fix finalidade por precos: `mapRawToProperty` agora detecta "Venda e Locacao" quando ambos precos > 0 (antes confiava so no Status do CRM que vinha incorreto). Commit `a03b889`.
- Fix grafias inconsistentes: `getAllBairros`, `getAllBairrosByCidade`, `getAllCities` agregam por slug e escolhem label canonico (mais frequente + mais diacriticos) — unifica "Sitio Cercado" vs "Sítio Cercado". Commit `db7a24b`.
- Fix descricao do imovel: paragrafos justificados + `;` preservado nos itens de lista (era removido). Commit `fbe2b3b`.
- Fix pill dual na detail page: `PropertyBadge` alinhada com paleta pastel dos cards, novo variant "dual" em amber. Commit `9282eec`.
- Fix P0 filtros dinamicos: `bairro-images.ts` virou funcao `getBairroImage` com fallback pra foto de imovel ativo; `bairroDescriptions` aceita stats e gera descricao SEO dinamica quando bairro nao tem curadoria. Commit `a1e0791`.
- Titulo do imovel passa a ser exibido exatamente como vem do CRM (removido `generateShortTitle` nos pontos visiveis ao usuario). Commit `286a95e`.

**Sessao 2026-04-19:**
- Fix rotacao de destaques na home: `HomeCarousel` embaralha client-side via Fisher-Yates a cada visita (prop `shuffle`). Pool aumentado de 15 pra 30. Commits `62242b3` + `deb5b5b`.
- Fix badge "DESTAQUE": aparece em ambos `destaqueWeb` e `superDestaqueWeb` (antes so super). Commit `4c1da09`.
- Threshold "RECEM PUBLICADO": 30d -> 7d com pulse primeiros 3d. Commit `d227663`.
- Fix "Imoveis semelhantes": hard filters em finalidade + cidade + faixa de preco (tier progressivo ±30%/±50%/±80%). Commits `9b54fd7` + `0ccd555`.
- Redesign favicon: SVG com "fy" centralizado em paths fechados (sem degrau no f, ponto V afiado no y), PNGs 512x512/180x180 gerados via `scripts/generate-favicons.mjs`. Commits `4f149b3` + `e0d36d4` + `b10f769`.
- Auditoria Google SEO Starter Guide (19/04): ~85% atendido. Gaps fechados: sitemap de imagem (shard 0 + 3 agora incluem `images`), `rel=nofollow` nos links Loft externos. Author schema do blog ja tinha `RealEstateAgent` + CRECI + foto — OK.

---


### Request Indexing pós-reescrita 15 posts (relatório 2026-04-26)

> Google ainda não tinha visto as reescritas dos 15 posts do blog (last
> crawl 18-22/04 vs reescrita 23-25/04). Solicitação manual de indexação
> via GSC URL Inspection acelera recrawl em 24-72h.
>
> Relatório completo: [docs/seo-reports/2026-04-26-pos-reescrita.md](seo-reports/2026-04-26-pos-reescrita.md).

#### ✅ Solicitado em 26/04/2026 (5 URLs prioritárias)

- [x] `/blog/financiamento-caixa-itau-bradesco-comparativo` — 427 imp, CTR 0,23% (urgente: title novo aplicado) — **✅ INDEXED 2026-04-26 21:47** (recrawl confirmado via GSC API, status PASS)
- [x] `/blog/custo-de-vida-curitiba` — 93 imp, pos 12,5 (subir top 10)
- [x] `/blog/como-financiar-minha-casa-minha-vida` — 22 imp, pos 9,6
- [x] `/blog/batel-vs-agua-verde-curitiba` — 14 imp, pos 5,9
- [x] `/blog/melhores-bairros-familias-curitiba` — sem imp ainda mas YMYL Family alto

#### ✅ Solicitado em 30/04/2026 (9 de 10 URLs — quota GSC excedida no último)

- [x] `/blog/apartamento-ou-casa-curitiba`
- [x] `/blog/checklist-compra-imovel`
- [x] `/blog/documentos-comprar-imovel-curitiba`
- [x] `/blog/ecoville-vs-bigorrilho-curitiba`
- [x] `/blog/imovel-planta-vs-pronto-curitiba`
- [x] `/blog/itbi-curitiba-valor-como-pagar`
- [x] `/blog/melhores-bairros-curitiba-2026`
- [x] `/blog/mercado-imobiliario-curitiba-2026`
- [x] `/blog/preco-metro-quadrado-curitiba-bairro`
- [ ] `/blog/quanto-custa-morar-batel-curitiba` — **quota excedida em 30/04, refazer em 01/05**

**Status:** 9 dos 10 reescritos solicitados em 30/04. O `quanto-custa-morar-batel-curitiba` bateu na quota dinâmica do GSC (Google nunca publicou limite hard; retorna `Quota exceeded` explicitamente quando bloqueia). Resubmeter no dia seguinte. Esperar 24-72h pra Google reprocessar os 14 já enviados.

#### ✅ Solicitado em 03/05/2026 (11 URLs pós-2ª rodada de revisão de português)

> Após 2ª rodada de revisão de português/fluidez aplicada nos 15 artigos do
> blog (commits `29dfcc2` a `b617900`, ~370 correções editoriais). 8 artigos
> tiveram mudança de title/description; 7 tiveram mudança grande de conteúdo
> (FAQ inserida, tabelas reescritas, harmonização de cluster). Reindex
> manual via GSC URL Inspection.

- [x] `/blog/checklist-compra-imovel` — title novo
- [x] `/blog/como-financiar-minha-casa-minha-vida` — title novo
- [x] `/blog/documentos-comprar-imovel-curitiba` — title novo
- [x] `/blog/imovel-planta-vs-pronto-curitiba` — title novo
- [x] `/blog/itbi-curitiba-valor-como-pagar` — title novo + Tema 1113 reescrito
- [x] `/blog/quanto-custa-morar-batel-curitiba` — title novo
- [x] `/blog/apartamento-ou-casa-curitiba` — description nova
- [x] `/blog/mercado-imobiliario-curitiba-2026` — Selic 14,75% → 14,50%
- [x] `/blog/melhores-bairros-familias-curitiba` — bloco de blocos reescritos
- [x] `/blog/financiamento-caixa-itau-bradesco-comparativo` — CET real → estimado
- [x] `/blog/preco-metro-quadrado-curitiba-bairro` — heading "abaixo de R$ 6.000" corrigido

**Status:** 11 URLs aceitas em 03/05/2026. Quota excedida na 12ª.

#### ⏳ Pendente — refazer em 04/05/2026 (4 URLs restantes da 2ª rodada)

> Quota GSC bateu após 11 URLs em 03/05. Resubmeter as 4 abaixo no dia
> seguinte (quota reseta a cada 24h).

- [ ] `/blog/melhores-bairros-curitiba-2026` — Ahú rentabilidade harmonizada, caveats SESP-PR
- [ ] `/blog/batel-vs-agua-verde-curitiba` — correção factual saúde (Pilar não no Água Verde), pergunta FAQ corrigida
- [ ] `/blog/custo-de-vida-curitiba` — IPS markdown corrigido, "única capital" suavizado, UPA 24h corrigida
- [ ] `/blog/ecoville-vs-bigorrilho-curitiba` — Everest #5 ENEM corrigido, HNSG sem números fabricados

**Após reindex:** acompanhar GSC > Performance > comparar 7 dias antes vs
7 dias depois (impressões, CTR, posição) por URL — meta é confirmar
zero degradação e idealmente bump em CTR pelos titles novos.

#### Próxima revisão GSC: 2026-05-10

Verificar:
- Recrawl dos **15 posts** (last crawled deve ser >30/04 — incluir os 10 novos)
- CTR `/blog/financiamento-...` antes (0,23%) vs depois do title novo — meta 5-8%
- Posição `/blog/custo-de-vida-curitiba` antes (12,5) vs depois — meta top 10
- Posição dos 10 novos solicitados em 30/04 — sentir impacto inicial
- Sitemap `/sitemap/0.xml` warning resolvido?

#### Outras ações SEO pendentes do relatório 26/04

- [x] Investigar warning `sitemap/0.xml` (status "Has warnings", 251 URLs) — **DIAGNÓSTICO 2026-04-26:** GSC reporta 1187 warnings mas 100% dos URLs amostrados retornam HTTP 200. Sitemap atual tem estrutura válida (251 URLs com `lastmod`/`changefreq`/`priority`). Warnings são acumulados de submissões anteriores (legacy de URLs já removidas do CRM). **Mitigação possível futura:** usar `DataAtualizacao` real do Loft em `lastmod` (em vez de build timestamp uniforme) — não é blocker.
- [x] Reescrever title de `/casas-curitiba` (pos 3,2 sem clique) — **APLICADO 2026-04-26:** "{count} Casas em Curitiba à Venda e Aluguel | FYMOOB" (number drop dinâmico via `getProperties().length`)
- [x] Reescrever title de `/blog` lista (pos 2,9 sem clique) — **APLICADO 2026-04-26:** "Blog FYMOOB: {count} guias sobre imóveis em Curitiba" (number drop dinâmico via `getAllPosts().length`)
- [x] Reescrever title de `/blog/mercado-imobiliario-curitiba-2026` (pos 2,5, 0 clicks) — **APLICADO 2026-04-26:** "Curitiba 2026: +17,86% e 2ª capital em valorização (boom?)" (data hook + ranking, ressincronizado pro Sanity)

#### URLs com erro/status no GSC (auditoria 2026-04-27)

**32 URLs com 404 — solicitada remoção via GSC URL Removal Tool em 27/04:**

- 28× `/guia/[bairro]` pra bairros sem MDX (campo-comprido, pilarzinho, eucaliptos, campina-do-siqueira, sao-braz, seminario, povoado-do-boa-vista, lindoia, alto-da-rua-xv, guaira, cristo-rei, campo-de-santana, capao-da-imbuia, maracana, alto-da-gloria, guatupe, barreirinha, santo-antonio, nacoes, cidade-jardim, campina-das-pedras, vila-verde, ganchinho, guaraituba, reboucas, santa-candida, uberaba, fazendinha) — causa raiz: `RelatedPages` em `/imoveis/[bairro]` linkava `/guia/{slug}` mesmo sem MDX existir. **JÁ CORRIGIDO** em commits `72f2d98` (22/04) e `4fec270` (27/04).
- 4× URLs absurdas (`/m²`, `/&`, `/mês`, `/$`) — causa raiz inconclusiva (provável Sanity Portable Text mal formatado). Submetida remoção como mitigação. Investigar via GSC "Inspecionar URL" → "Página de referência" caso voltem.

**Pendente após remoção:** verificar em ~3 dias se sumiram do índice. Se as 4 URLs absurdas voltarem, sanitizar regex de `PortableTextRenderer.tsx:94` pra rejeitar href que não comece com `http://`, `https://`, `/`, `#` ou `mailto:`.

**9 URLs como "Página alternativa com tag canônica adequada" — comportamento SAUDÁVEL, sem ação:**

- 7× `/busca?...` com filtros legacy (`DestaqueWeb`, `SuperDestaqueWeb`, `Lancamento`, `order=menor-preco`, `listagem=lista`, `min=10000`) — herança do site antigo. Canonical aponta pra `/busca` ou `/busca?tipo=X` (sem params legacy). Google obedece. De-indexa naturalmente em 4-6 semanas.
- 2× `/imovel/[slug]` cujos dados Bruno editou no CRM:
  - `69803208` (Campo Comprido) — área mudou de 211m² → 268.09m², slug atualizado, canonical aponta pra slug novo.
  - `69804752` — bairro mudou de Seminário → Água Verde, canonical aponta pra slug novo.
  - Sem ação no código (slug é dinâmico do CRM, canonical já resolve). Trade-off de não fazer redirect 301 do slug antigo: requer histórico de slugs, esforço alto vs ganho marginal.


---

---

## Sessao 2026-04-16/17 - Otimizacao de Performance (/busca) [EM ANDAMENTO]

<details>
<summary>Sessao de perf intensiva: 3 subsessoes de otimizacao + refatoracao do sistema de pesquisa empirica</summary>

### Contexto

Sessao dividida em 4 fases, culminando em mudanca de metodologia:
1. Sessao A + B (bundle split, dynamic imports)
2. Fix LCP (fetchPriority), Op\u00e7\u00e3o A (LocationFilter sem cmdk), Fix 2-t\u00e1tico B
3. Fix 2 completo (PhotoCarousel + FavoriteButton islands + CSS scroll-snap)
4. Fase 1 tentada (Lucide/polyfill) \u2014 2 de 4 items REVERTIDOS por n\u00e3o materializarem
5. **Meta-mudanca**: montagem de sistema de pesquisa empirica (bundle-analyzer, size-limit, scripts perf, 4 protocolos) motivada por 4/7 estimativas nao terem materializado

### Baseline oficial registrado (5 runs, CoV 4.7%)

`docs/perf/baselines/2026-04-17-busca.json`:
- Score: 65 (CoV 1.6%)
- LCP:   4.84s (CoV 9.1%)
- TBT:   645ms (CoV 4.7%)
- CLS:   0 mediana, 2/5 samples 0.078 (intermitente)
- Bundle /busca: 758 KB raw (revisado: 431 KB ap\u00f3s Agent 1 incluir dynamic chunks)

### Tier 0 \u2014 Pre-requisitos de medi\u00e7\u00e3o [CONCLUIDO 2026-04-17]

- [x] `productionBrowserSourceMaps: true` em next.config.ts (destrava source-map-explorer)
- [x] Instalar `@vercel/speed-insights` e inserir no layout root (destrava RUM field data) \u2014 +4KB bundle
- [x] Remover `searchResultsSchema` duplicado em src/app/busca/page.tsx (sobrep\u00f5e 100% com itemListSchema)
- [ ] Atualizar baseline-current.md corrigindo bundle /busca total (247 KB \u2192 431 KB com dynamic) \u2014 pr\u00f3ximo run de baseline

### Tier 1 \u2014 Flags de baixo risco [CONCLUIDO 2026-04-17]

- [x] **`F` \u2014 `font-display: optional`** \u2014 H-20260417-001 **PARTIAL**: CLS rate 40%\u219220%, TBT -110ms (inesperado), LCP +61ms. Mantido.
- [x] **Investiga\u00e7\u00e3o CLS remanescente** \u2014 H-20260417-002 **STOP**: attribution ao `<main>`, 4 op\u00e7\u00f5es avaliadas, trade-off aceito aguardando Speed Insights field data
- [x] **`B` \u2014 `reactCompiler: true`** \u2014 H-20260417-003 **SUCCESS**: TBT -68ms (-10.5%), LCP neutro, bundle +20KB, CLS rate 40%\u219220%. Mantido.
- [x] **`D` \u2014 `experimental.inlineCss: true`** \u2014 H-20260417-004 **FAILED (revertido)**: HTML +326KB, LCP +238ms, TBT +237ms. Kill em 4 de 5. Li\u00e7\u00e3o adicionada ao protocolo ATTRIBUTION (validar HTML size local antes de commit).

### Tier 2 \u2014 Cirurgico em @base-ui

- [x] **SortDropdown mobile: Sheet \u2192 `<select>` nativo** \u2014 H-20260417-005 **REVERTIDO (UX regression)**: tecnicamente funcionou (-1.6KB, -50 linhas), mas picker Android \u00e9 dark-themed, quebra est\u00e9tica do site. Design > ganho marginal de perf. Revertido via hotfix.
- [ ] AdvancedFiltersModal: trocar Dialog @base-ui por `<dialog>` nativo

### Tier extra \u2014 Navega\u00e7\u00e3o quente (client router cache)

- [x] **`staleTimes.dynamic: 30`** \u2014 H-20260417-006 **SUCCESS**: fix de navega\u00e7\u00e3o home \u2194 /busca lenta em 2\u00aa+ vezes reportado pelo user em mobile. Validado qualitativamente ("resolveu, era exatamente isso"). Zero impacto em Lighthouse synthetic (mede cold start). Mantido.

### Tier 3 \u2014 Refactor moderado (s\u00f3 depois de Tier 1+2 validados via Speed Insights)

- [ ] Parallel routes `/busca/@filters` + `@results` (estimado -150-400ms LCP)
- [ ] Split SearchBar.tsx (1170 linhas) em Mobile/Desktop (exige refactor real do source, n\u00e3o depende de bundler)

### Tier 4 \u2014 Condicional / adiado

- [ ] Mobile Sheet filtros \u2192 `<dialog side=bottom>` (validar anima\u00e7\u00e3o slide-up Safari 17 primeiro)
- [ ] Desktop Popover \u2192 Popover API nativo (validar % iOS 17 em GA4 primeiro)
- [ ] Lucide manual em /imovel/* (n\u00e3o em /busca \u2014 chunk 4bafbefc n\u00e3o \u00e9 carregado l\u00e1)

### Opcoes DESCARTADAS (com razao)

- **PPR / Cache Components** \u2014 issue [#86383](https://github.com/vercel/next.js/issues/86383) relata regressao TBT at\u00e9 3.1s em Next 16. Esperar 16.3+.
- **Edge Runtime para /busca** \u2014 incompat\u00edvel com `unstable_cache`, exige refactor massivo.
- **Self-host CDN vistahost** \u2014 custo/benef\u00edcio ruim (j\u00e1 temos preconnect + AVIF).
- **Desinstalar @base-ui completamente** \u2014 12+ outros componentes usam (Slider, Checkbox, Field, Select, Tabs...).
- **Fix Lucide manual no /busca** \u2014 chunk 4bafbefc (74.7KB) n\u00e3o \u00e9 carregado em /busca (descoberto via Agent 1 forense). Vale atacar em /imovel/* separadamente.

### Infra de pesquisa empirica (Fase II) - CONCLUIDA

- [x] `@next/bundle-analyzer` ativado (next.config.ts com withBundleAnalyzer wrapper)
- [x] `size-limit` instalado + `.size-limit.json` com budgets
- [x] `source-map-explorer` instalado
- [x] `scripts/perf/lighthouse-median.js` (5 runs, mediana, CoV gate <10%)
- [x] `scripts/perf/bundle-snapshot.js` (extrai sizes do build-manifest)
- [x] `scripts/perf/diff-snapshots.js` (compara antes/depois)
- [x] `docs/perf/baseline-current.md` (canonico)
- [x] `docs/perf/baselines/` (primeira medicao oficial 2026-04-17)
- [x] `docs/perf/bundle-snapshots/` (primeira snapshot)
- [x] 4 protocolos em `.claude/protocols/` (HYPOTHESIS, MEASURE-BEFORE-CLAIM, STATISTICAL-RIGOR, ATTRIBUTION)
- [x] CLAUDE.md secao "Performance Changes REQUIRE HYPOTHESIS + MEASUREMENT" com escopo (aplica s\u00f3 em claims de KB/ms)
- [x] `docs/perf/hotfixes.log` (append-only)

### Commits da sessao completa

| Commit | Mudanca | Resultado |
|--------|---------|-----------|
| bb2d0c0 | Sessao A (SearchPageSearchBar SSR + PriceFilter dynamic) | consolidado |
| b6159ce | Sessao B (filtros pesados dynamic) | -40% TBT inicial |
| 26e5750 | fetchPriority high | ~0ms (neutro) |
| e9186b4 | LocationFilter sem cmdk | ~estavel |
| a16ec04 | priority so no mobile + plano Fix 2 | ~estavel |
| 5385d22 | Favoritos (X + features + bug m\u00b2) | UX fix |
| 4e21016 | Fix 2 completo (scroll-snap + islands) | ~0ms (mas swipe touch mobile agora funciona) |
| 61bb4e7 | FilterSection details | marginal |
| bc53285 | Sistema de pesquisa empirica (Fase I+II) | infra + protocolos |
| b7162cf | Baseline oficial 2026-04-17 | primeiro dogfood |
| 348b3fc | Escopo dos protocolos + hotfix exception | clarificacao |

### Li\u00e7\u00f5es aprendidas (chave)

1. **"Remover polyfill salva 110KB"** \u2192 falso (`nomodule`, browsers modernos ignoram)
2. **"Lucide tree-shake salva 60KB"** \u2192 build quebrou (shadcn alias `CheckIcon` incompat\u00edvel)
3. **"Fix 2 completo salva 200-400ms TBT"** \u2192 ~0ms (gargalo n\u00e3o era carousel JS)
4. **"fetchPriority=high -400-600ms LCP"** \u2192 ~0ms (ja era eager via priority)
5. **"Chunk Lucide 74KB parasita no /busca"** \u2192 Agent 1 revelou: n\u00e3o carregado em /busca, \u00e9 /imovel/*

**Conclus\u00e3o:** 5/5 estimativas n\u00e3o materializaram em varios graus. Sistema de protocolos montado para prevenir esse padr\u00e3o em sess\u00f5es futuras.

</details>

---


---

## Sessao 2026-04-17 - Security Hardening + Pre-Cutover Audit [CONCLUIDA]

<details>
<summary>4 rounds de auditoria iterativa (17 agentes paralelos no total) — 25+ CRITICAL/HIGH fixados, convergencia atingida (round 4 = 0 CRITICAL, so HIGHs nichados)</summary>

### Contexto

Depois de claim inicial de "pronto pra cutover" apos rodada de fixes SEO, usuario questionou: _"voce falou que estaria pronto na outra vez tambem, executei mais uma rodada de investigacao de agentes e encontraram varios pontos criticos"_. Resposta foi mudar de "auditoria unica" pra **protocolo de convergencia iterativo**: rodar N rounds de auditorias independentes, cada uma com angulos diferentes, ate round N+1 retornar 0 CRITICAL novos.

### Metodologia (convergence protocol)

- Cada round: 4-5 subagents em paralelo com escopos DIFERENTES do round anterior
- Prompts explicitos: lista do que ja foi fixado, "so reportar CRITICAL/HIGH explorável", "se 0 achado critico diga explicitamente NO CRITICAL FOUND com evidence"
- Fix imediato entre rounds pra nao acumular debito
- Build + curl em prod entre rounds pra validacao empirica
- Convergencia: quando severidade dos achados cai de round pra round E round final retorna 0 CRITICAL
- Resultado: 4 rounds, padrao claro de convergencia (CRITICAL=8,12,4,0)

### Round 1 — Primeiros 5 angulos (5 agents paralelos) — 8 CRITICAL fixados

**Commit:** `50b1f86`

- **Runtime/prod-only:** filter fotos nao-https (evita `<Image src="">` crash), retry+timeout+fallback em Loft API (5xx blowup), empreendimentos `emp.imageUrl` guard, editorial h1 sr-only (Reserva Barigui renderizava 0 h1)
- **Integration:** `remotePatterns: "**.vistahost.com.br"` (cobre subdominios Vista), `LOFT_API_KEY` nao loga em fetch failures
- **Security:** NextAuth `trustHost: true` (open-redirect via Host header), `timingSafeEqual` em `/api/revalidate` + `/api/indexnow`
- **Auth/middleware:** `proxy.ts` matcher cobre `/api/admin/*` + 401 JSON pra APIs admin
- **SEO:** `parseNumber` rejeita negativos; raw `<a>` → `<Link>` em /faq e /imoveis/preco

### Round 2 — Dedup + angulos novos (5 agents paralelos) — 12 achados fixados

**Commit:** `7bb5f5a`

- **Prod HTML:** `title: { absolute }` em `/imoveis/[bairro]/[tipo]` (quartos + finalidade) + empreendimento + sobre (elimina `... | FYMOOB | FYMOOB Imobiliaria` em centenas de URLs programaticas)
- **og:url:** adicionado em layout (fallback) + pillars + empreendimento + blog + guia
- **Content:** llms.txt aponta 4 shards em vez de `/sitemap.xml` (404); MDX img alt fallback "Ilustracao do artigo"; empreendimento unitTypes alt descritivo
- **A11y:** aria-label em icon-only X buttons (PropertyGallery, QuickSearch x3, SearchBar)
- **Security:** `productionBrowserSourceMaps` gated em ANALYZE=true (evita expor source em prod); helper `getClientIp` prioriza `x-real-ip` (XFF nao forjavel) em 5 endpoints

### Round 3 — Foco em env leaks + deep security (4 agents paralelos) — 6 HIGH fixados

**Commit:** `19154ec`

- **Supply chain:** `next 16.1.6 → 16.2.4` (patches GHSA-mq59-m269-xvcx Server Actions CSRF null-origin bypass, GHSA-ggv3-7p47-pfv8 request smuggling, 3 DoS CVEs)
- **Auth:** `useSecureCookies: process.env.NODE_ENV === "production"` (belt+suspenders vs preview http); Resend `maxAge: 600` (antes default 24h, desalinhado com corpo do email)
- **Rate-limit:** `getClientIp` retorna `null` em Vercel sem IP confiavel (fail-closed). Todos callers rejeitam. Evita bucket "unknown" compartilhado.
- **JSON-LD injection defense:** `safeJsonLd()` helper escapa `<` como `\u003c`. Aplicado em ~25 script tags que embedam schemas. Defense-in-depth vs CRM compromise injetando `</script>`.

### Round 4 — Convergencia (3 agents, angulos novos) — 4 HIGH fixados, 0 CRITICAL

**Commit:** `6b13794`

- **Info disclosure:** `/api/revalidate` nao expoe `err.message` em 500 (evita leak sobre internals Next/runtime). Loga server-side.
- **LGPD:** `auth.ts` email de rejected sign-in agora e `sha256(email).slice(0,12)` em log (era plaintext). Evita PII em logs Vercel + enumeracao via dashboard access.
- **Cost runaway defense:** `loft.ts` `MAX_PAGES_SAFETY_CAP = 40`. FYMOOB tem ~249 imoveis, 2000 margem. Cap previne runaway Vercel cost se CRM reportar total inflado.
- **ISR amplification:** regex `VALID_SLUG` em `/imovel/[slug]` + `/empreendimento/[slug]` antes de fetchar. Evita atacante fazer loop `/imovel/aaa-1,aaa-2...` forcando ISR 404 cache entries (cost spike).

### Attack simulation em prod (round 4, agent 1) — 100% resistido

30+ vetores testados via curl em `fymoob-website.vercel.app`. **Todos defendidos:**

- CVE-2025-29927 `x-middleware-subrequest: middleware:middleware:...` → 307 redirect (patched)
- Forged `authjs.session-token` cookie → 307 (signature valida)
- `callbackUrl=//evil.com/steal` → nao redirect externo
- SSRF via `/_next/image?url=http://evil.com` → 502 OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED
- SSRF `169.254.169.254`, `127.0.0.1`, `file:///etc/passwd` → 400 INVALID_IMAGE_OPTIMIZE_REQUEST
- Path traversal `/api/photos/%2e%2e%2fetc%2fpasswd` → 404 invalid code
- Null byte `/api/photos/a%00b` → 400
- 10MB body `/api/lead` → 413 Payload Too Large
- Method tampering (PUT/TRACE) → 405
- Header injection (`Host: evil.com`, `X-Forwarded-Host`) → nao reflete
- Reflected XSS `/<script>alert(1)</script>` → 404 sem eco
- Email enumeration timing delta → 34ms de diferenca (ruido, nao distinguivel)

**Security headers confirmados em prod:** HSTS preload, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy restrictivo.

### Estado final (apos round 4)

| Vetor | Status |
|-------|--------|
| Env var leaks | ✅ 0 vazamento (22 chunks + hash testado, 0 matches) |
| Source maps em prod | ✅ 404 (gated ANALYZE=true) |
| Next.js CVEs (Server Actions CSRF, smuggling) | ✅ 16.2.4 patched |
| Auth hijack | ✅ timingSafeEqual + useSecureCookies + trustHost |
| Rate-limit bypass (XFF spoof) | ✅ x-real-ip + fail-closed |
| XSS via JSON-LD | ✅ safeJsonLd escape aplicado |
| CSRF server actions | ✅ Next 16.2.4 + Turnstile + origin |
| SSRF image proxy | ✅ remotePatterns enforced |
| Path traversal API | ✅ regex validation + 400 |
| ISR cost DoS | ✅ slug regex + MAX_PAGES cap |
| LGPD email em log | ✅ sha256 hash |
| Info disclosure 500 | ✅ err.message nao exposto |

### HIGH/MEDIUM remanescentes (nao-blockers pra cutover)

Documentados na Fase 7.10 abaixo. Nenhum bloqueia go-live — sao hardening incremental.

### Acoes externas pre-cutover (usuario executa manualmente)

- [ ] Cloudflare Turnstile: adicionar hostname `fymoob.com.br` + `www.fymoob.com.br` ao site key allowlist (atualmente localhost/vercel)
- [ ] Resend: verificar domínio `fymoob.com.br` (SPF/DKIM/DMARC) antes do cutover — magic link admin vai falhar se nao verificado
- [ ] Vercel env: setar `AUTH_URL=https://fymoob.com.br` (pin canonical pra magic link URLs)
- [ ] Vercel env: regenerar `REVALIDATE_SECRET` (valor antigo `1626c6...` foi exposto no chat)
- [ ] Vercel env: confirmar `ALLOWED_ADMIN_EMAILS` e `INDEXNOW_SECRET` setados

### Commits da sessao

| Commit | Mudanca | Resultado |
|--------|---------|-----------|
| `0d7b19f` | SEO blockers (og:image, dateModified, @graph, title template 10 paginas, BlogPosting schema) | 5 blockers + 6 HIGH fixados |
| `50b1f86` | Round 1: critical resilience (Loft retry, photo filter, trustHost, timingSafeEqual, remotePatterns) | 8 CRITICAL fixados |
| `7bb5f5a` | Round 2: title dup [tipo] + og:url + XFF→x-real-ip + a11y aria-labels + MDX alt | 12 fixados |
| `19154ec` | Round 3: Next 16.2.4 + useSecureCookies + maxAge 600 + getClientIp fail-closed + safeJsonLd (25 schemas) | 6 HIGH fixados |
| `6b13794` | Round 4: info leak + LGPD email hash + MAX_PAGES cap + VALID_SLUG regex anti-ISR-DoS | 4 HIGH fixados, 0 CRITICAL |

### Licoes aprendidas (chave)

1. **"Pronto pra cutover" NAO e binario.** Cada rodada de auditoria com angulos novos acha coisas que a anterior nao achou. Unico jeito honesto de declarar "pronto" e rodar N rounds ate convergencia (severidade + contagem caindo) e ultimo round retornar 0 CRITICAL.

2. **Subagents LLM nao sao deterministicos.** Mesma pergunta pode voltar diferente. Solucao: dar escopo estreito, explicitar o ja-fixado, exigir evidence (file:line, curl output), pedir "se nada critico diga explicitamente".

3. **Attack simulation em prod via curl > auditoria estatica de codigo.** Round 4 agent 1 testou 30+ vetores em HTTPS real. Confirmou que patches aplicados funcionam (ex: CVE-2025-29927 retorna 307 redirect como esperado).

4. **Severidade cai, nao sobe, de round em round.** Rounds iniciais acham CRITICAL gross (title dup em massa, ISR crash, auth bypass). Rounds seguintes acham HIGH finos (info disclosure, LGPD, DoS amplification). Isso e sinal de convergencia.

5. **Auditoria de env var leak precisa PRATICA, nao teorica.** Baixei 22 chunks client de prod, grep por nome e por hash do valor real do secret. 0 matches = prova concreta (nao "provavelmente ok"). Checker statico de `process.env` em client seria insuficiente sozinho.

6. **Defense-in-depth compensa auditoria imperfeita.** Mesmo se um vetor passar: proxy.ts + layout.tsx auth() + page.tsx auth() (3 camadas) protege admin; timingSafeEqual + x-real-ip + Turnstile + rate limit (4 camadas) protege login. Sobreviver > detectar tudo.

7. **npm audit lista devDeps junto com prod.** shadcn CLI e size-limit tinham HIGH mas nao rodam em prod. `npm audit --omit=dev` ou verificar `npm ls <pkg>` pra confirmar path antes de classificar como blocker.

8. **Next 16 quebrou APIs sutis.** `revalidateTag(tag)` virou `revalidateTag(tag, profile)`. `sitemap` recebe `id: Promise<string>` (nao number). `middleware.ts` virou `proxy.ts`. Conferir release notes antes de copiar padrao do Next 14/15.

9. **Attack surface logs e subestimado.** `console.warn(email)` parece inofensivo mas vira PII em log store Vercel (retencao 30d, acessivel a todo membro da equipe). LGPD requer data minimization. Hash ou redact por default.

</details>

---


---

## Sessao 2026-04-09 - PDP standard/premium [CONCLUIDA]

<details>
<summary>Variacao da pagina de imovel implementada</summary>

- [x] Tipos `PropertyPageVariant` e `PropertyPageVariantOverride` adicionados
- [x] Mapeamento de `ValorACombinar` da Loft para `valorSobConsulta`
- [x] Resolver `price-led` com overrides internos e hints de bairro/categoria/midia
- [x] Modulo de configuracao para thresholds, bairros premium e overrides
- [x] Hero da PDP com variante `standard` e `premium`
- [x] Hero premium em modelo de palco imersivo com fundo solido + blur
- [x] Header editorial da PDP extraido para componente com variantes
- [x] Sidebar de contato adaptada para `standard` e `premium`
- [x] CTA/copy de "Valor sob consulta" implementados
- [x] MobileContactBar adaptada para variantes e imovel sob consulta
- [x] Tracking GA4 de `property_page_view` com `page_variant`, `price_bucket`, `is_consult_price`
- [x] Tracking de clique de contato (WhatsApp/telefone) com variante
- [x] Loading skeleton da PDP ajustado para o novo hero e sidebar
- [x] Build de producao executado com sucesso apos as mudancas

</details>

---


---

## Sessao 2026-04-16 - Performance /busca (Sessao A + B + LCP + Opcao A) [EM ANDAMENTO]

<details>
<summary>Otimizacoes aplicadas: bundle split, cmdk removal, fetchPriority cleanup</summary>

### Aplicado nesta sessao
- [x] **Fix 4 (Sessao A)**: Remover `ssr: false` do SearchPageSearchBar + adicionar Suspense boundary
- [x] **Fix 5 (Sessao A)**: PriceFilter com native inputs + Slider @base-ui dynamic-imported
- [x] **Fix 1 (Sessao B)**: 5 filtros pesados (LocationFilter, EmpreendimentoFilter, AreaRangeInput, CaracteristicasCheckboxes) dynamic-imported
- [x] **Fix LCP**: `fetchPriority="high"` adicionado nas 4 variantes de PropertyCard (PropertyCard, Grid, Compact, List)
- [x] **Opcao A**: LocationFilter reescrito sem cmdk (native input + lista manual) — elimina re-indexing em remount
- [x] **Fix 2-tatico B**: Remover `priority`/`fetchPriority` das variantes desktop (Grid/Compact/List) — evita competicao de LCP hint no mobile
- [x] Lighthouse baseline → v2 → v3: score 59 → 65 → 64 (estavel); TBT 980 → 590 → 600ms (-39%); LCP 4.7 → 4.9 → 4.9s (estavel)

### Resultado
- TBT mobile reduzido ~40% no /busca
- Score Lighthouse estavel com variance (±13 pontos entre amostras)
- LCP nao caiu abaixo de 3.5s (gargalo nao era o hint, e JS parse/hydration)

</details>


---


## Sessao 2026-04-02/03 — Contrato, Tasks, SEO Intelligence, Mobile UX, Fase 6 [CONCLUIDA]

<details>
<summary>28 tasks concluidas</summary>

**Contrato e Documentacao:**
- [x] Contrato de prestacao de servicos (`docs/contrato-prestacao-servicos.md`) — 14 clausulas
- [x] Escopo expandido: 800+ paginas, SEO programatico, UX, empreendimentos, faixas preco
- [x] Secao UX simplificada: essenciais fixos + recursos personalizaveis pelo cliente
- [x] Consolidar TODAS as tasks em `docs/TASKS.md` — fonte unica de verdade
- [x] Atualizar `CLAUDE.md` com Task Management e novas rotas SEO programatico

**SEO Intelligence (Fase 10):**
- [x] Instalar mcp-gsc (Google Search Console MCP) — `c:\Users\Vine\mcp-gsc\`
- [x] Criar `.mcp.json` com config GSC + Playwright MCP
- [x] Instalar claude-seo skill (20 skills + 10 subagents)
- [x] Criar skill `/project:seo-report` — relatorio semanal automatico
- [x] Criar skill `/project:seo-audit` — auditoria completa FYMOOB
- [x] Criar skill `/project:seo-fix` — correcoes automaticas
- [x] Criar diretorio `docs/seo-reports/` para historico

**Mobile UX:**
- [x] Header — menu dropdown rapido (Area do Cliente, Favoritos, Comparar)
- [x] BottomNav — 3 itens fixos (Inicio, Buscar, Favoritos)
- [x] WhatsAppFloat — escondido no mobile, apenas desktop
- [x] MobileContactBar — reposicionado acima do BottomNav (bottom-[57px])
- [x] UrgencyBar integrada ao MobileContactBar — tira Airbnb colada no topo da barra CTA
- [x] Menu mobile (Sheet) — secao "Acesso rapido" com Area do Cliente, Favoritos, Comparar
- [x] SortDropdown — bottom sheet nativo no mobile (substituiu select escuro)
- [x] Icone WhatsApp oficial (SVG) no botao "Quero visitar"

**Fase 6 — Institucional:**
- [x] `/sobre` — historia, valores (4), diferenciais (4), stats, localizacao, CRECI
- [x] `/contato` — 5 cards contato, formulario CRM, mapa Google, WhatsApp CTA
- [x] `/anuncie` — 4 etapas, 6 beneficios, tipos aceitos, formulario captacao
- [x] `ContactForm.tsx` — componente reutilizavel POST /api/lead com estados
- [x] Footer — 5 colunas (info+CRECI, institucional, tipos, bairros populares, area cliente)

**Infra:**
- [x] Playwright MCP adicionado ao `.mcp.json` para testes visuais
- [x] Remover UrgencyBar.tsx standalone (logica absorvida pelo MobileContactBar)

</details>

---

---


## Sessao 2026-04-03/04 — Fase 8 Completa, Visual Premium, UX Polish [CONCLUIDA]

<details>
<summary>30+ tasks concluidas</summary>

**Fase 8 — SEO Programatico (COMPLETA):**
- [x] 8.1 Landing Bairro+Tipo — reescrita com conteudo dinamico, stats, FAQ schema, cross-linking
- [x] 8.2 Landing Bairro+Finalidade (venda/aluguel) — ~57 paginas
- [x] 8.3 Landing Tipo+Finalidade — 8 paginas com TipoFinalidadePage reutilizavel
- [x] 8.4 Empreendimentos — FAQ + RelatedPages + listagem /empreendimentos
- [x] 8.5 Landing Faixas de Preco — 5 paginas em /imoveis/preco/[faixa]
- [x] 8.6 Landing Bairro+Quartos — integrado no [tipo] segment (2, 3, 4+ quartos)
- [x] 8.7 Sitemap expandido — todos os tipos incluidos (~600+ URLs)
- [x] 8.8 Conteudo Dinamico — generateLandingIntro + generateLandingStats
- [x] 8.9 FAQ Dinamico — generateDynamicFAQ + DynamicFAQ component + FAQPage schema
- [x] 8.10 Cross-Linking — RelatedPages component hub-and-spoke em todas as landing

**GA4:**
- [x] Fluxo "Site Principal" criado (G-HPWE3P9DYK) — **DEPRECIADO 2026-04-29:** stream apontava pra `fymoob.com` (domínio antigo), nunca recebeu dados após cutover.
- [x] Script gtag.js corrigido (dangerouslySetInnerHTML — fix appendChild error)
- [x] **2026-04-29 — Nova propriedade GA4 dedicada:** "FYMOOB - Site Principal" criada na conta Fymoob (separada da campanha Reserva Barigui pra não misturar métricas pago vs orgânico). Stream `fymoob.com.br` configurado, fuso GMT-03 (São Paulo), moeda BRL, categoria Imóveis, objetivos: Gerar leads + Entender tráfego Web. Novo Measurement ID: **`G-2Q02YFFZ7E`** (substitui `G-HPWE3P9DYK` em `.env.local` e Vercel). DeferredGA component lê automaticamente do env — código intocado.

**Contrato:**
- [x] Revisao juridica completa (10 correcoes: aceite, custos, LGPD, suporte, comunicacao)
- [x] Clausula de performance (1500 views = antecipacao pagamento)
- [x] Wagner Spessatto identificado + CNPJ preenchido
- [x] Multa rescisoria removida (decisao do cliente)
- [x] PDF gerado para envio

**UX Mobile — Pagina de Imovel:**
- [x] Layout reestruturado: titulo+preco primeiro, galeria depois (UX research)
- [x] Preco em brand-primary (azul) — mobile e desktop
- [x] Hierarquia visual: fundos alternados stone-50/white entre secoes
- [x] Badges refinados (bg-neutral-100 solido, sem backdrop-blur)
- [x] MobileContactBar sempre visivel (removido scroll > 400)
- [x] WishlistButton na pagina de imovel (mobile + desktop)
- [x] BackButton component para navegacao mobile
- [x] ShareButton variante "overlay" (botao circular unico)
- [x] Galeria: snap-center + scroll-smooth + Embla dragFree:false
- [x] SimilarProperties: grid vertical com swipe de fotos por card
- [x] Bottom padding pb-[160px] para evitar corte da BottomNav

**Sobre Nos — Redesign Premium:**
- [x] Full dark theme (hero gradient mesh + glow accents)
- [x] Stats bar dark (bg-white/5 backdrop-blur)
- [x] Missao/Visao com gradient cards (from-white to-brand-primary/5)
- [x] Valores com hover premium (-translate-y-1 + shadow-xl + icon scale)
- [x] Historia split layout com imagem "Where Dreams Reside"
- [x] Diretoria section dark (placeholder avatars para Bruno + Wagner)
- [x] "Padrao FYMOOB" numerado (01-04) com layout alternado
- [x] CTA dark gradient mesh com glow

**Home — Search:**
- [x] Header bug fix (scroll reset + requestAnimationFrame)
- [x] QuickSearch pill compacto (Airbnb pattern)
- [x] Full-screen overlay com filtros (progressive disclosure)
- [x] ListPicker para bairro/tipo (substitui select nativo escuro)
- [x] Range slider para preco (substitui pills estaticas)
- [x] Body scroll lock quando overlay aberto

**Infra:**
- [x] Playwright MCP adicionado ao .mcp.json
- [x] API route /api/property/[code] para favoritos
- [x] Favoritos: busca imoveis reais + auto-limpeza de codigos invalidos

</details>

---
