# FYMOOB — Task Tracker

> Fonte unica de verdade para todas as tasks do projeto.
> Atualizado: 2026-04-17

---

## Status Geral

| Fase | Descricao | Tasks | Concluidas | Pendentes | Status |
|------|-----------|-------|------------|-----------|--------|
| 0 | Fundacao | 15 | 15 | 0 | CONCLUIDA |
| 1 | Paginas de Imovel | 8 | 8 | 0 | CONCLUIDA |
| 2 | Listagens e Landing | 10 | 10 | 0 | CONCLUIDA |
| 3 | SEO Tecnico | 8 | 8 | 0 | CONCLUIDA |
| 4 | Blog e Conteudo | 8 | 8 | 0 | CONCLUIDA |
| 5 | API Loft Real | 8 | 8 | 0 | CONCLUIDA |
| 5.6 | Sessao 02-03/04 | 28 | 28 | 0 | CONCLUIDA |
| 5.7 | Sessao 03-04/04 | 35 | 35 | 0 | CONCLUIDA |
| 6 | Institucional e Polish | 7 | 7 | 0 | CONCLUIDA |
| 7 | QA, Testes, Deploy | 120 | 25 | 95 | EM ANDAMENTO |
| 8 | SEO Programatico | 37 | 33 | 4 | CONCLUIDA (4 pos-deploy) |
| 9 | Painel Blog Admin | 5 | 0 | 5 | PENDENTE |
| -- | Bugs | 0 | 0 | 0 | — |
| 10 | SEO Intelligence | 64 | 11 | 53 | EM ANDAMENTO (+Blog Strategy Q2 23/04) |
| 11 | Performance (CWV) | 56 | 46 | 10 | EM ANDAMENTO |
| 12 | Conteudo SEO Editorial | 29 | 26 | 3 | EM ANDAMENTO |
| 13 | Funcionalidades e UX | 39 | 39 | 0 | CONCLUIDA |
| -- | Ações Bruno (CRM) | 3 | 0 | 3 | PENDENTE |
| 14 | Inteligência Imobiliária | 17 | 0 | 17 | FUTURO |
| 15 | Lead Capture + CRM | 14 | 14 | 0 | CONCLUIDA (form em prod) |
| 15.A | Backend Storage (Supabase) | 10 | 0 | 10 | PENDENTE (antes de 15.17) |
| 16 | Claude Managed Agents | 14 | 0 | 14 | MEDIO PRAZO |
| 17 | Agentes como Produto SaaS | 14 | 0 | 14 | LONGO PRAZO |
| -- | Nice-to-Have | 4 | 0 | 4 | FUTURO |
| | **TOTAL** | **444** | **292** | **152** | **66%** |

**Sessao 2026-04-17:** 25 CRITICAL/HIGH de seguranca/SEO fixados em 5 commits (`0d7b19f`, `50b1f86`, `7bb5f5a`, `19154ec`, `6b13794`). 4 rounds de auditoria convergiram — round 4 retornou 0 CRITICAL. Acoes externas pre-cutover listadas em Fase 7.8. HIGH/MEDIUM remanescentes (hardening pos-cutover, nao blockers) em Fase 7.10.

---

## 💰 Add-Ons Fora do Escopo Contratual (Orçamento Complementar)

> **Seção dedicada** — consolida TODAS as demandas do Bruno que não estão
> no contrato de 04/04/2026. Atualizar sempre que surgir pedido novo.
>
> **Base legal:** Cláusula 2, §2º do contrato — *"Quaisquer funcionalidades,
> páginas ou serviços não listados nesta cláusula estão fora do escopo deste
> contrato e, se solicitados, serão objeto de orçamento complementar aprovado
> por ambas as partes antes da execução."*
>
> **Como aprovar:** WhatsApp com confirmação por escrito (cf. §5º Cláusula 13ª).
>
> **Referência visual:** `docs/configurador-servicos.html` tem formulário que
> já foi apresentado ao Bruno com itens 1-7.

### Status dos orçamentos

| Status | Quantidade |
|---|---|
| Pendente aprovação | 13 itens |
| Aprovados | 0 |
| Em execução | 0 |
| Concluídos | 0 |

### Pacote 1 — Serviços ao Cliente (apresentados no configurador)

| # | Item | Valor | Aprovado? |
|---|------|---|---|
| 1 | **Página de Serviços** — hub + menu "Serviços" substituindo "Anunciar" | R$ 800 | ⬜ |
| 2a | **Pack Certidões** — pagamento Pix manual | R$ 1.800 | ⬜ |
| 2b | **Pack Certidões** — pagamento online automático (Pagar.me/Mercado Pago) | R$ 3.500 | ⬜ (alternativa ao 2a) |
| 3a | **Calculadora Avaliação** — estimativa por tabela de preços do catálogo | R$ 2.500 | ⬜ |
| 3b | **Calculadora Avaliação** — estimativa com IA (OpenAI/Anthropic + base FYMOOB) | R$ 5.000 | ⬜ (alternativa ao 3a) |
| 4 | **Laudo Avaliação Presencial** — página + formulário | R$ 1.000 | ⬜ |
| 5 | **Ficha Análise de Crédito** — form completo + envio email | R$ 1.500 | ⬜ |
| 6 | **Captação Imóveis para Locação** — landing dedicada | R$ 800 | ⬜ |
| 7 | **Captura Contato WhatsApp** — form rápido antes do wa.me + cadastro auto no CRM | R$ 800 | ⬜ |

**Totais possíveis do Pacote 1:**
- Completo com pagamentos manuais: 1+2a+3a+4+5+6+7 = **R$ 9.200**
- Completo com pagamentos online: 1+2b+3b+4+5+6+7 = **R$ 13.400**
- ROI focado (captação de lead): 3a+4+5+7 = **R$ 5.600**

### Pacote 2 — Demandas Adicionais (mapeadas 18-19/04)

| # | Item | Valor | Aprovado? |
|---|------|---|---|
| 8 | **Multi-CRM (parceiros)** — API Loft de outra imobiliária, prefix de códigos, CRECI, lead routing | R$ 1.200 setup + R$ 400/CRM adicional | ⬜ (parceiro ainda não definido) |
| 9 | **Loft Share Button** — ferramenta `/admin/compartilhar` gerando link fymoob.com.br + WhatsApp com msg pronta, substituindo imo.bi do Loft | R$ 1.000 | ⬜ (tentar custom domain Loft grátis primeiro) |
| 10 | **Padronização Títulos SEO** — planilha de sugestões (features + copywriting pesquisado 19/04) + auto-aplicação em 200 imóveis menores; top 30 revisados por Bruno no CRM | R$ 800 | ⬜ (aguarda decisão Bruno) |
| 11 | **Proposta de Compra (PDF)** — corretor preenche form, site gera PDF FYMOOB, envia por email | R$ 1.200 (estimativa) | ⬜ |
| 12 | **Proposta de Locação (PDF)** — igual ao 11 com campos específicos (garantia, prazo) | R$ 1.000 (estimativa — reusa código do 11) | ⬜ |
| 13 | **Empreendimentos Personalizáveis** — página custom por empreendimento (editorial, galeria estendida, plantas, mapa detalhado) | Escopo pendente | ⬜ (Bruno precisa definir nível de custom) |

**Total Pacote 2 (itens 8+9+10+11+12, sem 13):** R$ 5.200

### Pacote Full — tudo aprovado (1+2a+3a+4+5+6+7+8+9+10+11+12)

**R$ 14.400** (exceto item 13 que precisa escopo) — negociável em parcelas similar ao contrato original (6x R$ 2.400).

### Itens descartados / shelved

| Item | Motivo |
|---|---|
| Browser extension para share button | Muito custo de manutenção; substituído pelo item 9 |
| Integração Supabase pro lead (Fase 15.A) | Dentro de 15.A do plano atual, não vira add-on extra |

### Política de novos add-ons

Quando o Bruno pedir algo novo que **não está** no contrato nem nesta lista:

1. Avaliar se é trivial (< 2h dev) — nesse caso posso fazer sem cobrar extra como cortesia
2. Se > 2h: estimar e **adicionar aqui** com valor sugerido
3. Enviar orçamento por WhatsApp antes de executar
4. Só iniciar após confirmação escrita do Bruno (print ou msg explícita)

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

### Pendente — Dependencias do Bruno (SEO)

> Itens do Google Starter Guide que dependem de acao/conteudo do cliente:

- [ ] **Fotos da equipe no Sobre Nos** — verificar se `/images/team/` tem fotos de Wagner alem de Bruno. Ideal: foto profissional de cada socio + corretores. Impacto: E-E-A-T reforcado (Google confia mais em imobiliaria com equipe visivel).
- [ ] **Bio/autor do blog** — hoje todos os posts usam "Bruno Cesar de Almeida" como autor (RealEstateAgent com CRECI). Se Wagner ou outros escreverem, precisa schema Person extra + foto.
- [ ] **Cadencia editorial do blog** — site lancou com 5 artigos iniciais. Para ranquear em queries informacionais (ex: "como avaliar um imovel", "qual melhor bairro Curitiba"), publicar 2-4 artigos/mes. Responsavel: Bruno ou marketing.
- [ ] **Links externos validos pra autoridade** (gov.br/anpd, COFECI, prefeitura Curitiba) — comentar/citar fontes oficiais nos artigos do blog aumenta E-E-A-T. Faq pode citar COFECI em algumas perguntas.
- [ ] **Marcar mais imoveis como DestaqueWeb=Sim no CRM** — hoje 7 nao-lancamentos + 6 lancamentos. Para rotacao da home ter efeito visivel, idealmente 20-25 nao-lancamentos + 15 lancamentos. Curadoria do Bruno.

### Pendente de padronizacao (Titulos de imovel)
> Bruno pediu para primeiro mostrar cru, depois alinhar um padrao. Quando ele confirmar o formato desejado, aplicar em `mapRawToProperty` (src/services/loft.ts:310) ou via funcao de sanitizacao dedicada.

- [ ] **Opcao A — Title Case automatico**: "LINDO SOBRADO" → "Lindo Sobrado" (respeitando preposicoes: `de`, `da`, `do`, `com`, `em`, etc)
- [ ] **Opcao B — Limite de caracteres**: truncar em 120 chars com "..." elegante preservando palavras inteiras
- [ ] **Opcao C — Sanitizacao light**: remover ALL CAPS gratuito, "!!!" repetido, espacos duplos, caracteres especiais anomalos
- [ ] **Opcao D — Dois campos no CRM**: padrao "Nome comercial" (curto, ex: "Casa Milano") + "Resumo" (longo) — exige Bruno preencher 2 campos mas da melhor estrutura de SEO
- [ ] **Opcao E — Correcao ortografica automatica** (risco medio): detectar palavras com erro obvio (ex: "terrreno" 3 Rs) e corrigir — precisa lista de palavras comuns do setor imobiliario

Recomendacao minha: aplicar C + B primeiro (baixo risco, ganho visual imediato), A depois (medio risco, pode quebrar nomes proprios tipo "Cabrall Hills"), D so quando Bruno aceitar mudar processo de cadastro.

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

## Fases 0-4 — Fundacao ate Blog [CONCLUIDAS]

<details>
<summary>44 tasks concluidas (clique para expandir)</summary>

### Fase 0 — Fundacao
- [x] Next.js 15+ com App Router e TypeScript
- [x] Tailwind CSS configurado
- [x] shadcn/ui instalado e configurado
- [x] Design tokens FYMOOB (cores, fontes, espacamento)
- [x] Estrutura de pastas `src/`
- [x] Types base (`src/types/property.ts`)
- [x] Service layer (`src/services/loft.ts`)
- [x] SEO helpers (`src/lib/seo.ts`)
- [x] Layout raiz com Poppins + Inter
- [x] Favicon e manifest
- [x] ESLint + Prettier configurados
- [x] `.env.local` template
- [x] `next.config.ts` com remotePatterns CDN
- [x] Componentes base shadcn (Button, Card, Input, etc.)
- [x] Git repo inicializado

### Fase 1 — Paginas de Imovel
- [x] `src/app/imovel/[slug]/page.tsx` — pagina individual
- [x] PropertyGallery component (galeria de fotos)
- [x] PropertyDetails component (detalhes do imovel)
- [x] PropertyContact component (formulario de contato)
- [x] PropertyCharacteristics component
- [x] JSON-LD RealEstateListing schema
- [x] `generateMetadata()` com dados dinamicos
- [x] ISR com revalidacao

### Fase 2 — Listagens e Landing
- [x] Home page (hero, destaques, bairros, CTAs)
- [x] `/busca` com filtros SSR (tipo, bairro, preco, quartos)
- [x] `/imoveis/[bairro]` — landing por bairro
- [x] `/imoveis/[bairro]/[tipo]` — landing bairro+tipo
- [x] `/apartamentos-curitiba` — landing tipo estatica
- [x] `/casas-curitiba` — landing tipo estatica
- [x] `/sobrados-curitiba` — landing tipo estatica
- [x] `/terrenos-curitiba` — landing tipo estatica
- [x] PropertyGrid component
- [x] SearchFilters component

### Fase 3 — SEO Tecnico
- [x] `src/app/sitemap.ts` — sitemap dinamico
- [x] `src/app/robots.ts` — robots.txt
- [x] JSON-LD Organization no layout raiz
- [x] JSON-LD LocalBusiness no layout raiz
- [x] Canonical URLs em todas as paginas
- [x] BreadcrumbList schema em todas as paginas
- [x] Security headers (`next.config.ts`)
- [x] Favicon + web manifest

### Fase 4 — Blog e Conteudo
- [x] Sistema MDX para blog
- [x] 5 artigos iniciais otimizados para SEO
- [x] `/blog` — listagem de artigos
- [x] `/blog/[slug]` — pagina individual com BlogPosting schema
- [x] `/faq` — 19 perguntas, 5 categorias, FAQPage schema
- [x] Blog components (card, layout, sidebar)
- [x] Links cruzados blog <-> imoveis <-> bairros
- [x] Sitemap atualizado com blog + FAQ

</details>

---

## Fase 5 — API Loft Real [CONCLUIDA]

<details>
<summary>8 tasks concluidas</summary>

- [x] Configurar `LOFT_API_KEY` no `.env.local` — `brunoces-rest.vistahost.com.br`
- [x] Atualizar `src/types/property.ts` — 17 categorias, campos expandidos
- [x] Atualizar `src/services/loft.ts` — fetchLoftAPI, paginacao paralela, unstable_cache
- [x] Implementar slug geracao real — formato: `{tipo}-{bairro}-{cidade}-{estado}-{quartos}q-{area}m2-{codigo}`
- [x] Resolver fotos da API — filtrar ExibirNoSite, fallback detalhes por imovel
- [x] Integrar formulario POST `/api/lead` → CRM Loft
- [x] Criar rota empreendimentos `/empreendimento/[slug]` — 113 empreendimentos
- [x] Build completo — 473 paginas geradas com sucesso

</details>

---

## Fase 5.5 — UX e Layout [CONCLUIDA]

<details>
<summary>21 tasks concluidas</summary>

**UX Features:**
- [x] Badges (NOVO, LANCAMENTO) nos cards
- [x] Hover photo cycle nos cards
- [x] Card zoom + lift + arrows
- [x] Sticky CTA mobile ("Quero visitar")
- [x] Vistos recentemente (localStorage)
- [x] Pagina Favoritos `/favoritos`
- [x] Compartilhar imovel (share API)
- [x] Bottom nav mobile (4 tabs)
- [x] Badge MAIS VISTO (localStorage, top 15%)

**Layout Improvements:**
- [x] WhatsApp float reposicionado (z-index, mobile bottom-20)
- [x] AnimateOnScroll rootMargin ajustado
- [x] Hero mobile compacto (75dvh)
- [x] Stats Bar home ("249 imoveis | 65 bairros | 38 novos este mes")
- [x] Grid busca 4 colunas desktop (xl:grid-cols-4)
- [x] Cards horizontais mobile (variant="horizontal")
- [x] Filtros chips mobile + bottom sheet + A-Z order
- [x] ViewCounter ("X pessoas viram este imovel")
- [x] WelcomeBack banner (2a visita)
- [x] SaveSearch button + SavedSearchBanner
- [x] Skeleton loaders (loading.tsx)
- [x] NavigationProgress bar (NProgress-style)

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
- [x] Fluxo "Site Principal" criado (G-HPWE3P9DYK)
- [x] Script gtag.js corrigido (dangerouslySetInnerHTML — fix appendChild error)

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

## Fase 6 — Institucional e Polish [CONCLUIDA]

- [x] `src/app/sobre/page.tsx` — Pagina Sobre Nos (historia, valores, diferenciais, localizacao, CRECI)
- [x] `src/app/contato/page.tsx` — Cards de contato, formulario com envio ao CRM, mapa Google, WhatsApp CTA
- [x] `src/app/anuncie/page.tsx` — Landing captacao (4 etapas, 6 beneficios, tipos aceitos, formulario)
- [x] `src/components/shared/ContactForm.tsx` — Formulario reutilizavel com envio POST /api/lead
- [x] Header definitivo — nav responsivo, logo, busca rapida, CTA, menu dropdown
- [x] Footer definitivo — 5 colunas (info+CRECI, institucional, tipos, bairros populares, area cliente)
- [x] GA4 instalado (G-HPWE3P9DYK — fluxo "Site Principal" fymoob.com) — pageview automatico

---

## Fase 7 — QA, Testes, Deploy, Go-Live [PENDENTE]

### 7.1 — Testes de Navegacao (mobile + desktop) [CONCLUIDA — 04/04/2026]
> Testado via Playwright (375px mobile). Zero erros de console em todas as paginas.

**Home:**
- [x] Hero carrega com poster image → video fade-in (desktop)
- [x] Hero mostra apenas imagem no mobile (sem video)
- [x] QuickSearch: abre overlay, multi-select bairro funciona, multi-select tipo funciona
- [x] QuickSearch: dual-range preco (min e max) funciona, labels acima corretas
- [x] QuickSearch: quartos funciona, busca redireciona para /busca com params
- [x] Cards destaques carregam com fotos reais do CRM
- [x] Secao bairros em destaque com imagens
- [x] Secao blog com 3 artigos e imagens
- [x] Stats bar (imoveis 254, bairros 66, tipos 17) mostra numeros corretos
- [x] Footer: 5 colunas, CRECI, telefone, endereco, links funcionam
- [x] BottomNav mobile: 3 tabs (Inicio, Buscar, Favoritos) funcionam
- [x] WhatsApp float visivel no desktop, escondido no mobile

**Busca (/busca):**
- [x] Filtros funcionam (bairro, tipo, preco, quartos)
- [x] Cards responsivos (horizontal mobile, grid desktop)
- [x] Badge NOVO/LANCAMENTO visivel e nao sobreposta pelo coracao
- [ ] Paginacao funciona — *nao testado interativamente*
- [ ] Ordenacao (mais relevantes, preco asc/desc) funciona — *nao testado interativamente*
- [ ] Resultado "0 imoveis encontrados" mostra estado vazio — *nao testado*

**Pagina de Imovel (/imovel/[slug]):**
- [x] Titulo, preco, caracteristicas aparecem corretamente
- [x] Galeria de fotos funciona (swipe mobile, grid desktop)
- [ ] Fullscreen da galeria abre e fecha — *nao testado interativamente*
- [x] Descricao com "ver mais" expande ✅ (testado via Playwright click)
- [x] Comodidades (amenities) listadas (Piscina, Churrasqueira, Elevador, etc.)
- [x] Caracteristicas do imovel (quartos, area, vagas)
- [x] Mapa comeca fechado, abre ao clicar ✅ (testado via Playwright click)
- [x] Mapa colorido (estilo voyager)
- [x] Imoveis semelhantes carregam (4 cards vistos no snapshot)
- [x] MobileContactBar: "Quero visitar" abre WhatsApp com mensagem correta (URL verificada)
- [x] Botao telefone funciona (tel:+554199978-0517 verificado)
- [x] Favoritar (coracao) funciona — clicado, persiste em /favoritos ✅
- [x] Comparar (setas) funciona — clicado, aparece em /comparar ✅
- [ ] Compartilhar funciona — *nao testado interativamente*
- [x] Breadcrumbs corretos (Home > Empreendimentos/Bairro > Imovel)
- [x] BackButton (mobile) volta para pagina anterior ✅ (testado via Playwright click)

**Favoritos (/favoritos):**
- [x] Adicionar imovel via coracao → aparece na lista ✅ (screenshot confirmado)
- [ ] Remover imovel → sai da lista — *nao testado interativamente*
- [x] Badge no BottomNav atualiza contagem (bolinha vermelha "1" visivel)
- [ ] Estado vazio mostra mensagem + link para busca — *nao testado*
- [x] Carregamento rapido (batch API)

**Comparar (/comparar):**
- [x] Adicionar imovel via botao comparar → aparece com foto, preco, titulo ✅
- [x] Tabela comparativa: preco, tipo, bairro, area, quartos visivel
- [x] Tabela scroll horizontal no mobile (primeira coluna sticky)
- [x] Botao remover (X) visivel
- [x] Botao "Adicionar imovel" linka para busca
- [x] CTA WhatsApp com codigos dos imoveis
- [ ] Max 3 imoveis (4o substitui o mais antigo) — *nao testado*
- [ ] Estado vazio mostra mensagem — *nao testado*

**Landing Pages Bairro (/imoveis/[bairro]):**
- [x] Testar /imoveis/portao — lista imoveis, contagem correta (25 imoveis)
- [x] FAQ abre/fecha (details/summary nativo)
- [x] Link para guia completo do bairro aparece
- [x] Cross-linking para tipos, outros bairros funciona
- [x] Stats (preco medio, total imoveis) corretos

**Landing Pages Tipo — todas retornam 200 OK:**
- [x] /apartamentos-curitiba — 200 OK
- [x] /casas-curitiba — 200 OK
- [x] /sobrados-curitiba — 200 OK
- [x] /terrenos-curitiba — 200 OK

**Landing Pages Preco — todas retornam 200 OK:**
- [x] /imoveis/preco/ate-300-mil — 200 OK
- [x] /imoveis/preco/1-a-3-milhoes — 200 OK

**Empreendimentos:**
- [x] /empreendimentos — lista de empreendimentos com foto, construtora, preco (114 listados)
- [x] /empreendimento/reserva-barigui — pagina individual carrega (screenshot OK)

**Guias de Bairro (/guia/[bairro]):**
- [x] /guia/batel — conteudo MDX renderiza, breadcrumbs, AuthorBio
- [x] /guia/portao — stats bar com dados reais do CRM (corrigido overflow mobile)
- [x] Imoveis a venda embutidos (PropertyGrid)
- [x] FAQ funciona (details/summary)
- [x] AuthorBio aparece (Bruno Cesar de Almeida, CRECI J 9420)
- [x] CTA WhatsApp funciona
- [x] RelatedPages links funcionam

**Pillar Pages — todas retornam 200 OK:**
- [x] /comprar-imovel-curitiba — conteudo renderiza, tabelas, CTA, AuthorBio
- [x] /morar-em-curitiba — 200 OK
- [x] /alugar-curitiba — 200 OK

**Blog:**
- [x] /blog — lista 15 artigos com imagens
- [x] /blog/itbi-curitiba-valor-como-pagar — artigo completo, tabelas, CTA, AuthorBio
- [x] /blog/batel-vs-agua-verde-curitiba — foto real Curitiba (Rua XV)
- [x] /blog/custo-de-vida-curitiba — 200 OK
- [x] Imagens hero de todos os 10 novos artigos carregam (batch verificado)
- [x] AuthorBio no final de cada artigo ✅
- [x] Related posts aparecem ✅

**Institucionais:**
- [x] /sobre — dark theme, stats, equipe, mapa, CRECI
- [x] /contato — 5 cards contato (WhatsApp, telefone, email, endereco, horarios)
- [x] /anuncie — 200 OK
- [x] /faq — FAQPage schema, 22 perguntas

### 7.2 — Testes de Formularios e Leads
> Criterio: cada formulario deve enviar dados ao CRM Loft e/ou email.

- [ ] Formulario /contato — preencher e enviar, verificar se lead chega no CRM
- [ ] Formulario /anuncie — preencher e enviar
- [ ] Formulario ContactSidebar (pagina imovel, desktop) — preencher e enviar
- [ ] WhatsApp "Quero visitar" — abre WhatsApp com titulo do imovel na mensagem
- [ ] WhatsApp float (desktop) — abre chat correto
- [ ] WhatsApp CTA nos guias de bairro — abre com mensagem do bairro
- [ ] WhatsApp CTA nos artigos do blog — abre com mensagem do artigo

### 7.3 — Testes de SEO e Schema [PARCIAL — 04/04/2026]
> Criterio: Google deve conseguir indexar e entender todas as paginas.

- [x] Sitemap.xml acessivel e lista 616 URLs ✅
- [x] Robots.txt permite crawling (exceto /api/, /favoritos, /comparar) ✅
- [ ] JSON-LD Organization no layout (verificar via View Source)
- [ ] JSON-LD LocalBusiness no layout
- [ ] JSON-LD RealEstateListing em pagina de imovel
- [x] JSON-LD BlogPosting em artigo do blog ✅ (verificado /blog/itbi)
- [x] JSON-LD FAQPage em paginas com FAQ ✅ (verificado /faq)
- [x] JSON-LD Article em guias de bairro e pillar pages ✅ (verificado /guia/batel)
- [ ] Rich Results Test (Google) — testar 5 URLs (requer teste manual no Google)
- [x] Open Graph tags (title, description, image) em todas as paginas ✅ (verificado /blog/itbi)
- [x] Canonical URLs corretas ✅ (verificado /blog/itbi → fymoob.com/blog/itbi...)
- [x] Breadcrumbs com schema BreadcrumbList ✅ (verificado /imovel/[slug])
- [ ] Alt text descritivo em todas as imagens — *verificacao parcial*

### 7.4 — Testes de Performance [CONCLUIDA — 04/04/2026]
> Criterio: Lighthouse mobile >80 em todas as paginas principais.

- [x] Lighthouse Home — score **86** ✅
- [ ] Lighthouse /busca — *nao testado nesta rodada*
- [x] Lighthouse /imovel/[slug] — score **86** ✅
- [ ] Lighthouse /imoveis/portao — *nao testado nesta rodada*
- [x] Lighthouse /favoritos — score **90** ✅
- [x] Lighthouse /blog/itbi — score **91** ✅
- [x] Lighthouse /guia/batel — score **82** ✅
- [x] Console do browser: zero erros em todas as paginas testadas ✅

### 7.5 — Testes de Responsividade
> Testar em pelo menos 3 resolucoes: 375px (iPhone), 768px (tablet), 1440px (desktop).

- [ ] Home — layout correto em 3 resolucoes
- [ ] Busca — cards horizontais mobile, grid desktop
- [ ] Imovel — galeria adaptada, sidebar desktop only
- [ ] Blog — grid de artigos adaptado
- [ ] Header — menu hamburger mobile, nav links desktop
- [ ] Footer — colunas empilhadas mobile, lado a lado desktop

### 7.6 — Testes de Links e Integracao
> Criterio: zero links quebrados, todas integracoes funcionando.

- [ ] Menu Header — todos os 6 links navegam corretamente
- [ ] Menu mobile (Sheet) — todos os links funcionam
- [ ] Quick Access dropdown — Area do Cliente, Favoritos, Comparar
- [ ] BottomNav — Inicio, Buscar, Favoritos navegam corretamente
- [ ] Footer — todos os links internos funcionam
- [ ] Blog cards — linkam para artigos corretos
- [ ] PropertyCards — linkam para /imovel/[slug] correto
- [ ] BairroCards — linkam para /imoveis/[bairro] correto
- [ ] Cross-links em landing pages — funcionam
- [ ] Area do Cliente — abre portal Loft externo
- [ ] Telefone (41) 99978-0517 — abre discador
- [ ] Email fymoob@gmail.com — abre app de email

### 7.7 — Deploy Producao (pos-aprovacao)
> So executar apos Rodada 1 de revisao aprovada pelo cliente.

- [ ] Deploy Vercel producao (fymoob.com)
- [ ] Configurar DNS do dominio fymoob.com no GoDaddy
- [ ] Verificar HTTPS funcionando
- [ ] Submeter sitemap ao Google Search Console
- [ ] Verificar propriedade no GSC
- [ ] Google Business Profile — verificar fotos, horarios, categorias
- [ ] Configurar redirects do site antigo → novo (se houver)
- [ ] Monitorar indexacao primeiros 7 dias (GSC + `site:fymoob.com`)
- [ ] Confirmar GA4 coletando dados (pageviews, eventos)

### 7.8 — Acoes Externas Pre-Cutover (usuario executa no painel)
> Confirmar TODAS antes do switch DNS. Sem essas, auth admin ou lead forms quebram.

- [ ] **Cloudflare Turnstile:** adicionar `fymoob.com.br` + `www.fymoob.com.br` ao hostname allowlist do site key (senao captcha retorna `invalid-domain` em prod → todos lead forms + admin login falham silenciosamente)
- [ ] **Resend:** verificar dominio `fymoob.com.br` via SPF + DKIM + DMARC (senao magic link bounce/spam → admin nao consegue logar)
- [ ] **Vercel env `AUTH_URL=https://fymoob.com.br`** (pin canonical pra magic link URLs — evita URL com hostname preview no email)
- [ ] **Vercel env `REVALIDATE_SECRET`:** regenerar (valor antigo `1626c6c4c3860b4b7d6ff08a687ecff1fe7b64e5da9a323dee67d9036f4fafc17` foi exposto em chat). Apos regerar, atualizar qualquer cron/webhook que dispare /api/revalidate.
- [ ] **Vercel env:** confirmar setados — `LOFT_API_KEY`, `AUTH_SECRET`, `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `ALLOWED_ADMIN_EMAILS`, `INDEXNOW_SECRET`, `RESEND_FROM_EMAIL`
- [ ] **Vercel env:** remover variaveis nao usadas (`SUPABASE_*` se existirem — projeto usa Nhost/Upstash, nao Supabase)

### 7.9 — Validacao Pos-Cutover (primeiras 24h)
> Rodar na ordem. Se falha, reverter DNS antes de debugar.

- [x] `curl -I https://fymoob.com.br/` → 200 + HSTS (2026-04-17)
- [x] `curl https://fymoob.com.br/sitemap/0.xml | grep -c "<url>"` → 234 imoveis
- [x] `curl -X POST https://fymoob.com.br/api/revalidate` (sem secret) → 401
- [x] Submeter lead via formulario real em `/contato` → chegou no CRM Loft (com dados reais; dados fake sao rejeitados pelo spam filter Vista)
- [x] Magic link admin → receber email + clicar → logar
- [x] GSC: propriedade verificada (URL Prefix via arquivo /google1ae9f26fa4267524.html)
- [x] GSC: sitemap/3.xml submetido → Status "Processado", 118 paginas encontradas
- [ ] `site:fymoob.com.br` no Google apos 3-7 dias — primeiras URLs indexando
- [ ] GSC: coverage report + enhancement (RealEstateListing) detectando
- [ ] Speed Insights: primeiros RUM data points aparecendo
- [ ] GA4: pageviews + eventos (lead_submit, property_view) chegando

### 7.9.A — Submissao de Sitemaps no GSC [REVISADO 2026-04-18]
> **Estrategia anterior (faseada) descartada.** Pesquisa oficial (Google Search Central, John Mueller, docs de migration) confirma que "thin content flag por volume" e mito SEO — Google avalia qualidade por pagina, nao por timing de submissao. Ping endpoint deprecado em 2023 era pra bots spam, nao submissao GSC.
>
> Em cutover (como estamos), atrasar descoberta e contraproducente: prolonga janela de volatilidade entre redirects 308 fymoob.com → .com.br. Submeter tudo agora acelera consolidacao de sinais. Google ja auto-descobre via robots.txt (4 shards listados) — submeter manual so adiciona diagnostico por shard no dashboard.
>
> Fontes: [docs Google Search Central sobre sitemap index](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps), [site move guide](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [Mueller em SEJ](https://www.searchenginejournal.com/googles-mueller-on-crawl-rate-for-big-and-small-sites/387118/).

- [x] **D+0 (2026-04-17):** sitemap/3.xml (118 URLs — home + institucional + empreendimentos) → Processado, 118 paginas encontradas
- [ ] **D+1 (2026-04-18):** submeter sitemap/0.xml (234 URLs — imoveis individuais)
- [ ] **D+1 (2026-04-18):** submeter sitemap/1.xml (179 URLs — landings bairro/tipo/preco)
- [ ] **D+1 (2026-04-18):** submeter sitemap/2.xml (29 URLs — blog + guides + pillars)

### 7.9.B — Bing Webmaster Tools [PENDENTE]
> Bing = ~8-10% do trafego BR. Setup grátis + reusa verificacao GSC via OAuth.

- [ ] **BLOCKER (2026-04-17):** Microsoft nao esta deixando criar conta nova agora (error na pagina signup outlook.com). Aguardar destravio ou usar conta Microsoft existente do Vinicius/Bruno.
- [ ] Quando destravar: criar `fymoob@outlook.com` (conta corporativa, nao pessoal — facilita transferir ownership futuro)
- [ ] bing.com/webmasters → login com conta Microsoft
- [ ] Add site → `https://fymoob.com.br`
- [ ] Verify via "Import from Google Search Console" (OAuth com conta Google que fez GSC hoje — reusa verificacao sem precisar novo DNS/arquivo)
- [ ] Submeter sitemap/3.xml (mesmo pattern do GSC — faseado)
- [ ] IndexNow: ja temos endpoint `/api/indexnow` implementado. Bing aceita pings pra indexacao quase-imediata. Considerar adicionar Vercel cron ou botao admin que dispara IndexNow quando novo imovel entra no CRM.
- [ ] Adicionar Bruno como user secundario em Bing + GSC (permissoes granulares, nao compartilhar senha)

### 7.9.C — Cutover do dominio `fymoob.com` (redirect 308 -> .com.br) [CONCLUIDO 2026-04-17]
> `.com` eh do Bruno tambem (GoDaddy mesma conta). Redirect 308 + Change of Address transfere autoridade historica (92 URLs indexadas, 580 cliques/home, 122 paginas com impressoes em 3 meses) pro `.com.br`. Baseline completo em `docs/metrics-baseline/`. DNS backup completo em `docs/dns-backup-com.md`.

**Status 2026-04-17:**
- Fase A (DNS + Vercel): ✅ CONCLUIDA
- Fase B (Change of Address GSC): ✅ CONCLUIDA e ATIVA (Data de início: 17/04/2026)
- Fases C/D/E: monitoramento passivo nos proximos 180 dias

**🚨 COMMITMENTS CRITICOS A PRESERVAR (nao esquecer):**

1. **NAO DELETAR redirect 308 do `.com` por no mínimo 180 dias** (até ~2026-10-14). Google doc explícito: "Mantenha os redirecionamentos por pelo menos 180 dias". Se alguém acidentalmente remover o domínio `fymoob.com` do Vercel antes desse prazo, a consolidação de autoridade é revertida.

2. **MANTER dominio fymoob.com pagando por no mínimo 1 ano** (até ~2027-04-17). Confirmar renovação automática no GoDaddy. Se expirar, squatters podem comprar pra phishing/malware impersonating a marca FYMOOB.

3. **Banner amarelo "Este site está sendo movido"** aparece em ambas propriedades GSC por 180 dias. Nao clicar "CANCELAR MUDANCA" (botao vermelho) — ele REVERTE o processo.


**Tempo estimado total: 24h (~30min execucao + 1h cutover validacao + 23h Change of Address efetivar).**

#### Fase A — Cutover DNS (~30min + 10-30min propagacao)

- [ ] **Vercel**: Project `fymoob-website` > Domains > Add Existing > `fymoob.com`:
  - Desmarcar checkbox "Redirect fymoob.com to www.fymoob.com"
  - Modo: "Redirect to Another Domain"
  - Type: **308 Permanent Redirect**
  - Target: `fymoob.com.br`
- [ ] **Vercel**: Add Existing > `www.fymoob.com` (mesma config: 308 -> fymoob.com.br)
- [ ] Copiar DNS records que Vercel mostra (provavelmente A @ 76.76.21.21 + CNAME www cname.vercel-dns.com)
- [ ] **GoDaddy** (dominio `fymoob.com`, NAO o .com.br): editar `A @` de `35.227.239.5` -> IP Vercel. TTL 600s.
- [ ] **GoDaddy**: DELETAR registro `A www` (35.227.239.5). CRIAR novo `CNAME www` -> `cname.vercel-dns.com.`. TTL 600s.
- [ ] **NAO TOCAR** em MX, SPF TXT, autodiscover/webmail CNAMEs, subdominios (api/premium/destaques), verificacoes Facebook/Google. Detalhes em `docs/dns-backup-com.md`.
- [ ] Aguardar propagacao DNS (5-30min). Testar: `curl -I https://fymoob.com` deve retornar 308 + `location: https://fymoob.com.br/`
- [ ] Confirmar Vercel status 🟢 Valid Configuration em ambos dominios

#### Fase B — Change of Address no GSC (~2min, 1h apos Fase A)

- [ ] Aguardar ~1h apos Fase A pra Google bater no `.com` e detectar redirect
- [ ] GSC -> propriedade `fymoob.com` (Domain) -> Settings (engrenagem) -> **Mudanca de endereco**
- [ ] Destino: selecionar `fymoob.com.br` (aparece no dropdown porque eh mesma conta Google)
- [ ] Google valida 3 checks automaticamente:
  - Ambas propriedades verificadas ✅ (ja estao)
  - Redirect 301/308 ativo entre dominios ✅ (tera apos Fase A)
  - Dominio destino tem conteudo equivalente ✅ (tem)
- [ ] Confirmar submissao
- [ ] Resultado: Google acelera consolidacao de ~2-3 meses -> **2-3 semanas**

#### Fase C — Monitoramento Coverage (D+1 a D+7)

> Objetivo: detectar URLs antigas do `.com` que 308 redireciona pra slug no `.com.br` que nao existe (404). Principais candidatos: imoveis com codigo numerico antigo (ex: `/imovel/apartamento-batel-curitiba-pr-263m2-69803405`) — novo site usa codigo AP00XXX.

- [ ] D+1: GSC `.com.br` -> Indexacao > Paginas > filtro "Nao encontrado (404)"
- [ ] Anotar URLs 404 que vieram de `fymoob.com/*` e tem trafego historico
- [ ] D+7: review completo. Top candidatos esperados (baseado em baseline):
  - `/imovel/apartamento-batel-curitiba-pr-263m2-69803405` (9 cliques historicos)
  - `/imovel/loja-xaxim-curitiba-pr-55.85m2-69804208` (7 cliques)
  - `/imovel/sobrado-cidade-industrial-curitiba-pr-3-quartos-88m2-69803496` (3 cliques)
  - URLs com format antigo `/imovel/AP00945/apartamento-3-quartos-mossungue-curitiba/venda`

#### Fase D — Redirects especificos (D+7 se necessario)

- [ ] Se Fase C revelar URLs com trafego significativo em 404, adicionar em `next.config.ts`:
```ts
async redirects() {
  return [
    {
      source: '/imovel/apartamento-batel-:rest*',
      destination: '/imoveis/batel/apartamentos',
      permanent: true,  // 308
    },
    // outros padroes conforme GSC Coverage revelar
  ]
}
```
- [ ] Pattern: redirecionar URLs orfas (sem match de slug exato) pra landing page de bairro+tipo relevante
- [ ] Commit + deploy. Smoke test do CI valida automaticamente.

#### Fase E — Consolidacao (D+14 a D+21)

> Nada a fazer — acontece em background. Apenas monitorar.

- [ ] D+14: `site:fymoob.com` no Google deve mostrar menos URLs (em declinio)
- [ ] D+14: `site:fymoob.com.br` deve mostrar mais URLs (em alta)
- [ ] D+21: Change of Address 100% efetivada. `.com` e "sombra" do `.com.br`.
- [ ] Atualizar `docs/metrics-baseline/README.md` com colunas D+7, D+14, D+21 preenchidas

#### Notas importantes sobre preservacao

- **Email Umbler funcionando** — MX records preservados em GoDaddy
- **Subdominios preservados:** `api.fymoob.com`, `premium.fymoob.com`, `www.premium.fymoob.com`, `destaques.fymoob.com`, `autodiscover.fymoob.com`, `webmail.fymoob.com`
- **Verificacoes preservadas:** Meta Business Manager (Facebook), Google Search Console (TXT ja existente)
- **SPF email:** `v=spf1 include:spf.umbler.com ~all` intocado

### 7.10 — HIGH/MEDIUM Remanescentes (hardening pos-cutover)
> Documentado na Sessao 2026-04-17 acima. NAO sao blockers pra cutover — sao hardening incremental pra rodar em sprint de follow-up (~4-8h total).

**HIGH — segurança nicho:**

- [ ] **CSP (Content-Security-Policy) em `next.config.ts`:** atualmente sem CSP. Risco atual baixo (`dangerouslySetInnerHTML` limitado a JSON-LD via `safeJsonLd`), mas CSP fecha a porta pra XSS se futuro codigo adicionar inline user input. Proposta: `default-src 'self'; script-src 'self' 'unsafe-inline' 'nonce-XXX' https://challenges.cloudflare.com https://*.vercel-insights.com https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.vistahost.com.br https://*.storage.sa-east-1.nhost.run; font-src 'self' data:; connect-src 'self' https://*.vercel-insights.com https://www.google-analytics.com; frame-src https://challenges.cloudflare.com`. Testar em report-only primeiro por 1 semana.
- [ ] **JWT sessions — nao tem server-side revoke.** Se `AUTH_SECRET` vazar, atacante forja JWTs validos por 12h sem como invalidar. Fix: (a) adicionar `jwt.callback` checando `sessionVersion` por email contra Redis, bumped em forced logout; OU (b) baixar maxAge pra 2-4h com silent refresh. Nao e CRITICAL porque AUTH_SECRET nao vazou, mas rotation procedure deveria ter.
- [ ] **Rotation runbook pra AUTH_SECRET + LOFT_API_KEY + REVALIDATE_SECRET.** Criar `docs/runbooks/secret-rotation.md` com passo-a-passo: gerar novo valor → atualizar Vercel env → redeploy → validar endpoints respondem → revogar antigo no provider.
- [ ] **Next.js image optimizer abuse:** `/_next/image` nao tem rate limit dedicado. Atacante pode forcar Vercel otimizar imagens cdn.vistahost.com.br em todos tamanhos, estourando quota. Fix: Vercel dashboard → set hard limit em image optimization requests, ou adicionar middleware rate-limit em `/_next/image` (complexo, nao prioritario).
- [ ] **BR date format sort em `getProperties({sortBy: "recente"})`** — Loft API as vezes retorna `DataAtualizacao` em `"dd/mm/yyyy"` (nao ISO). `db.localeCompare(da)` embaralha a ordem. Fix: parse com heuristica BR em `loft.ts:554`. Impacto atual: baixo (ISO e o formato comum), mas silencioso quando falha.
- [ ] **Bairro slug inconsistency:** codigo em `imovel/[slug]/page.tsx:131` e `guia/[bairro]/page.tsx` + `imoveis/preco/[faixa]/page.tsx` usa `.toLowerCase().replace(/\s+/g, "-")` sem strip de acentos (ex: "Água Verde" → "água-verde"). Mas `slugify()` em `loft.ts` strips acento (→ "agua-verde"). Link 404s em bairros com acento. Fix: trocar TODOS por `slugify(bairro)` consistente.
- [ ] **generateStaticParams double-fetch em `/[tipo]-curitiba/[finalidade]/page.tsx`:** cada variant chama `getProperties({limit:1000})` 3x (generateStaticParams + generateMetadata + page). Cacheado via `unstable_cache`, mas no primeiro cold start bate Loft 3x. Fix: extrair pra helper `getPropertyStats()` cacheado ou movee count-check pra summary compartilhado.

**MEDIUM — melhorias operacionais:**

- [ ] **Webhook/cron pra `/api/revalidate`:** atualmente ninguem chama. Imoveis alterados no CRM demoram ate 1h (TTL) pra refletir. Fix: Vercel Cron em `vercel.json` (*/15 * * * *) POST pra `/api/revalidate` com `{"tag":"imoveis"}`. Ja validado end-to-end em H-20260417-007 — funciona.
- [ ] **mover `shadcn` pra devDependencies:** atualmente em `dependencies`, polui node_modules prod + lista como HIGH vuln em `npm audit --omit=dev` (mesmo nao rodando em prod). Mesmo pra `@next/bundle-analyzer`.
- [ ] **Skip link "pular pro conteudo"** no layout — nice-to-have pra keyboard users, nao bloqueador.
- [ ] **Gallery modal ESC handler** — `PropertyGallery.tsx` modo "grid" nao wire ESC pra fechar. Keyboard users precisam tab pro X.
- [ ] **Form submit feedback:** `ContactForm.tsx` precisa `disabled={submitting}` + spinner pra evitar double-submit por keyboard users.
- [ ] **RUM-driven perf tuning:** aguardar 2-3 semanas de Speed Insights field data pra decidir se `staleTimes: { dynamic: 30 }` fica, se `reactCompiler: true` ajudou p75 TBT real, se H-20260417-004 deve ser retentado com patch Next 16.3+.
- [ ] **Add `.env.example` com REVALIDATE_SECRET + NEXT_PUBLIC_GA_ID + INDEXNOW_SECRET + RESEND_FROM_EMAIL** — atualmente vazio em placeholders. Dificulta onboarding futuro + deploy manual checklist.

**LOW — cosmeticos:**

- [ ] **Contact form disabled state visual** — se submit em progresso
- [ ] **Review de alt text em MDX authored content** — MDX fallback aplicado, mas authors deveriam escrever alts reais em artigos novos
- [ ] **Consolidar CRECI em constante** — CRECI J 9420 vs CRECI/PR 24.494 vs 39.357 espalhados em llms.txt, Footer, FAQ, policies. Centralizar em `src/data/fymoob-info.ts`.

---

## Fase 8 — SEO Programatico [CONCLUIDA]

> **Objetivo:** Gerar 800+ paginas indexaveis automaticamente a partir dos dados do CRM.
> Todas as paginas devem ter: generateMetadata(), JSON-LD, breadcrumbs, internal linking.
> Todas as combinacoes sao dinamicas — novos imoveis/bairros geram novas paginas automaticamente.
> **Estrategias baseadas em cases reais:** Omnius (67→2100 signups, 850% trafego), Flyhomes (1.1M visitas), Baja (220% crescimento).
> Diferenciais: conteudo dinamico por pagina (8.8), FAQ com schema (8.9), cross-linking hub-and-spoke (8.10).

### 8.1 — Landing Bairro + Tipo [CONCLUIDA]
> Rota: `/imoveis/[bairro]/[tipo]` | Estimativa: ~260 paginas

- [x] Verificar estado atual de `src/app/imoveis/[bairro]/[tipo]/page.tsx`
- [x] Garantir `generateStaticParams()` gera TODAS as combinacoes ativas (threshold >= 3)
- [x] `generateMetadata()` unica: "Apartamentos no Batel | FYMOOB Curitiba"
- [x] JSON-LD ItemList schema
- [x] Conteudo introdutorio dinamico por combinacao (generateLandingIntro)
- [x] Stats cards (total, preco min, area media, quartos media)
- [x] Internal linking: bairro pai, tipo pai, outros tipos no bairro, mesmo tipo em outros bairros
- [x] Ja no sitemap com priority 0.6

### 8.2 — Landing Bairro + Finalidade [CONCLUIDA]
> Rota: `/imoveis/[bairro]/venda` e `/imoveis/[bairro]/aluguel` | ~57 paginas geradas

- [x] Adaptar segmento `[tipo]` para aceitar "venda"/"aluguel" como slugs validos
- [x] Filtrar por `Finalidade` (Venda/Locacao) via PropertyFilters
- [x] `generateMetadata()`: "Imoveis a Venda no {Bairro} | FYMOOB Curitiba"
- [x] Adicionar ao sitemap com priority 0.7 (~57 URLs novas)
- [x] Internal linking bidirecional (venda <-> aluguel + tipos do bairro)

### 8.3 — Landing Tipo + Finalidade [CONCLUIDA]
> Rota: `/apartamentos-curitiba/venda`, `/casas-curitiba/aluguel` | 8 paginas geradas

- [x] Criar componente reutilizavel `TipoFinalidadePage` (evita duplicacao)
- [x] Subrotas `[finalidade]` em apartamentos, casas, sobrados, terrenos
- [x] `generateMetadata()` + `generateStaticParams()` (venda + aluguel)
- [x] FAQ dinamico + cross-linking (tipo oposto + bairros com tipo)
- [x] Adicionar ao sitemap com priority 0.8 (8 URLs novas)

### 8.4 — Paginas de Empreendimento [CONCLUIDA]
> Rota: `/empreendimento/[slug]` | 113 paginas ativas

- [x] Auditado — gerando todas as 113 via generateStaticParams
- [x] Template completo: unidades, faixa preco, construtora, bairros, descricao
- [x] JSON-LD RealEstateListing + ItemList schema
- [x] `generateMetadata()` com nome, bairro, faixa preco, construtora
- [x] DynamicFAQ com pergunta customizada por empreendimento + schema
- [x] RelatedPages: bairros do empreendimento + outros empreendimentos
- [x] Listagem `/empreendimentos` — grid de cards com imagem, bairro, construtora, unidades, preco

### 8.5 — Landing Faixas de Preco [CONCLUIDA]
> Rota: `/imoveis/preco/[faixa]` | 5 paginas geradas

- [x] `/imoveis/preco/ate-300-mil` — Imoveis ate R$ 300 mil em Curitiba
- [x] `/imoveis/preco/300-a-500-mil` — Imoveis de R$ 300 a 500 mil
- [x] `/imoveis/preco/500-mil-a-1-milhao` — Imoveis de R$ 500 mil a R$ 1 milhao
- [x] `/imoveis/preco/1-a-3-milhoes` — Imoveis de R$ 1 a 3 milhoes
- [x] `/imoveis/preco/acima-3-milhoes` — Imoveis acima de R$ 3 milhoes
- [x] Template com intro dinamico, stats cards, FAQ schema, cross-linking (outras faixas + bairros top)
- [x] `generateMetadata()` + JSON-LD ItemList para cada faixa
- [x] Adicionado ao sitemap com priority 0.7

### 8.6 — Landing Bairro + Quartos [CONCLUIDA]
> Rota: `/imoveis/[bairro]/2-quartos`, `/imoveis/[bairro]/3-quartos`, `/imoveis/[bairro]/4-quartos`

- [x] Integrado no segmento `[tipo]` existente (detecta pattern N-quartos)
- [x] Filtrar por Dormitorio exato (2, 3 exatos; 4 = 4+)
- [x] `generateStaticParams()` para bairros com 5+ imoveis × 3 variacoes
- [x] `generateMetadata()` + JSON-LD ItemList
- [x] FAQ dinamico + cross-linking (outros quartos + venda/aluguel)
- [x] Adicionado ao sitemap com priority 0.6

### 8.7 — Sitemap Expandido [CONCLUIDA]
> Sitemap atual: ~600+ URLs indexaveis

- [x] Atualizar `src/app/sitemap.ts` com TODAS as combinacoes (tipos, finalidades, quartos, faixas, empreendimentos, institucionais)
- [x] Sitemap unico (< 50k URLs, nao precisa split por enquanto)
- [x] `lastmod` setado como `now` (revalidacao automatica a cada build/deploy)
- [ ] Submeter sitemap ao GSC apos go-live (depende Fase 7)
- [ ] Validar com GSC que todas URLs estao sendo descobertas (depende Fase 7)

### 8.8 — Conteudo Dinamico por Pagina [CONCLUIDA]
> Case: Omnius 850% crescimento organico em 10 meses com conteudo dinamico.

- [x] Criar funcao `generateLandingIntro(properties, bairro, tipo)` em `src/lib/seo.ts`
- [x] Criar funcao `generateLandingStats(properties)` — stats automaticos por pagina
- [x] Aplicar em landing bairro+tipo (intro + stats cards)
- [x] Aplicar em landing bairro (conteudo + FAQ + related)
- [x] Aplicar em landing faixa de preco (intro + stats + FAQ + cross-linking)
- [x] Empreendimentos ja tinham stats + descricao + FAQ adicionado

### 8.9 — FAQ Dinamico com Schema por Pagina [CONCLUIDA]
> Rich results no Google (perguntas expansiveis direto na SERP).

- [x] Criar funcao `generateDynamicFAQ(stats, bairro, tipo)` em `src/lib/seo.ts`
  - 5 perguntas automaticas: quantidade, preco medio, area media, quartos, como visitar
- [x] Componente `DynamicFAQ` com accordion + FAQPage JSON-LD schema
- [x] Integrado em: bairro, bairro+tipo, bairro+finalidade, bairro+quartos, faixas preco, empreendimentos
- [ ] Validar rich results com Google Rich Results Test (pos-deploy — depende Fase 7)

### 8.10 — Cross-Linking Hub-and-Spoke [CONCLUIDA]
> Flyhomes usou hub-and-spoke para atingir 1.1M visitas/mes.

- [x] Componente `RelatedPages` — tags de links contextuais
- [x] Landing bairro+tipo: bairro pai + tipo pai + outros tipos + mesmo tipo em outros bairros
- [x] Landing bairro: tipos do bairro + outros bairros populares
- [x] Landing bairro+finalidade: finalidade oposta + tipos do bairro + outros bairros
- [x] Landing bairro+quartos: outros quartos + venda/aluguel
- [x] Faixas de preco: outras faixas + bairros top na faixa
- [x] Empreendimentos: bairros do empreendimento + outros empreendimentos
- [x] Tipo+finalidade: tipo oposto + bairros com tipo
- [x] Breadcrumbs hierarquicos em todas as landing pages
- [ ] RelatedPages na pagina de imovel individual (futuro)
- [ ] Componente `BairrosProximos` por geolocalizacao (futuro)

---

## Fase 9 — Painel Admin Unificado [EM ANDAMENTO]

> **Escopo base (Cláusula 2.2b do contrato):** área administrativa para criar, editar,
> publicar e despublicar **artigos do blog** de forma independente.
>
> **Escopo aditivo (em negociação com Bruno, R$ 7.500-9.000 one-time):** painel de
> edição de empreendimentos (textos editoriais, vídeos Vturb, plantas, banners).
>
> **Decisão estratégica (14/04/2026):** construir UMA infraestrutura compartilhada
> (auth + shell) que serve blog E empreendimentos, ao invés de dois painéis separados.
> Evita duplicação de código e fornece experiência única de login pro Bruno/Wagner.

### 9.0 — Arquitetura de Segurança (decidida 14/04/2026)

**Princípio:** defesa em profundidade — 7 camadas independentes.

| Camada | Mecanismo | Ferramenta |
|---|---|---|
| 1. URL | `/admin/*` no mesmo domínio (sem subdomain) | Next.js routing |
| 2. Autenticação | **Magic link** por email (passwordless) | Auth.js v5 (NextAuth) + Resend |
| 3. Bot filter | Cloudflare Turnstile no form de login | Turnstile widget (free) |
| 4. Rate limit | 5 magic links / 15 min por email + 20/h por IP | Upstash Redis (free tier) |
| 5. Auth em runtime | `auth()` check em cada route + server action | Auth.js v5 |
| 6. Sessão | Cookie HttpOnly + Secure + SameSite=Lax, maxAge 12h | Auth.js default |
| 7. Audit log | Registra `{user, action, timestamp, IP}` de cada operação | Tabela Postgres |

**Admin list:** via env var `ALLOWED_ADMIN_EMAILS` (CSV). Só emails nesta lista podem receber magic link. Simples pra 2-3 usuários; migrar pra tabela DB quando passar de 5.

**CVE crítica Next.js (março 2025):** garantir versão ≥ 15.2.3 (atual do projeto OK).

**Por que magic link ao invés de senha:**
- Sem credencial pra vazar (não há senha armazenada)
- Credential stuffing: impossível
- Phishing: atacante precisa invadir email do admin (barra alta)
- Zero fricção de "esqueci a senha"
- UX melhor pra Bruno (email que ele já usa)

**Ações críticas (futuro, não-MVP):** MFA via TOTP opcional pra ações irreversíveis (publicar artigo novo, deletar empreendimento). Deixar como feature roadmap.

### 9.1 — Base (auth + shell) [CONCLUIDA — 14/04/2026]

Infraestrutura compartilhada, entregue antes de qualquer feature específica.

- [x] Instalar dependências: `next-auth@beta`, `resend`, `@upstash/ratelimit`, `@upstash/redis`, `@auth/upstash-redis-adapter`
- [x] Configurar Auth.js v5 em `src/auth.ts` (email provider + session JWT + Upstash adapter pra verification tokens)
- [x] Criar rota `/admin/login` com form minimalista (email + Turnstile)
- [x] Implementar envio de magic link via Resend (template HTML customizado)
- [x] Rate limit por email (5/15min) e IP (20/h) via Upstash Redis
- [x] Criar `src/proxy.ts` (antigo middleware.ts — Next.js 16 renomeou) bloqueando `/admin/*`
- [x] Criar `/admin/layout.tsx` com sidebar de navegação (Blog, Empreendimentos, logout)
- [x] Criar `/admin` (dashboard placeholder com status das features)
- [x] Logout funcional na sidebar (server action via Auth.js signOut)
- [x] Env vars documentadas em `.env.example` + `docs/admin-panel-setup.md`
- [x] Esconder chrome público (Header/Footer/BottomNav/WhatsAppFloat) em `/admin/*`
- [x] Provisionamento end-to-end validado (Resend + Upstash + Turnstile + AUTH_SECRET + whitelist)
- [x] Teste ponta-a-ponta: login → magic link → dashboard → logout (14/04/2026)

**Arquivos entregues:**
- [src/auth.ts](src/auth.ts), [src/proxy.ts](src/proxy.ts), [src/lib/rate-limit.ts](src/lib/rate-limit.ts), [src/lib/turnstile.ts](src/lib/turnstile.ts)
- [src/app/api/auth/[...nextauth]/route.ts](src/app/api/auth/[...nextauth]/route.ts)
- [src/app/admin/login/page.tsx](src/app/admin/login/page.tsx), [src/app/admin/login/LoginForm.tsx](src/app/admin/login/LoginForm.tsx), [src/app/admin/login/actions.ts](src/app/admin/login/actions.ts)
- [src/app/admin/layout.tsx](src/app/admin/layout.tsx), [src/app/admin/page.tsx](src/app/admin/page.tsx)
- [src/components/layout/ChromeGate.tsx](src/components/layout/ChromeGate.tsx)
- [docs/admin-panel-setup.md](docs/admin-panel-setup.md)

### 9.1.5 — Ownership & Migração de Contas [PENDENTE — PRIORIDADE ALTA]

**Problema:** todas as contas de infra externas foram criadas com o email pessoal do Vinicius (`dev.viniciusdamas@gmail.com`), não com email da FYMOOB. Risco de governança:

- Se Vinicius sair do projeto, Bruno fica sem acesso à própria infra
- Se for necessário pagar algum plano no futuro, billing fica no pessoal do Vinicius
- Não é padrão profissional de client work
- Direito/propriedade da infra é ambíguo

**Ação prioritária:** Bruno precisa criar um email operacional da FYMOOB (ex: `dev@fymoob.com` ou `sistema@fymoob.com`) e todas as contas devem ser transferidas/recriadas com esse email.

**Mensagem sugerida pro Bruno:**
> "Bruno, pra garantir que a FYMOOB seja dona de toda a infra do site (contas de banco, email, bot protection, etc.), precisamos criar um email neutro tipo `dev@fymoob.com` — seria só pra cadastrar serviços técnicos. Não é email pessoal teu, é um 'endereço de sistema'. Consegue criar e me passar a senha? Eu cadastro tudo e deixo você como admin também."

**Inventário de contas a migrar:**

| Serviço | Uso | Owner atual | Ação necessária | Dificuldade |
|---|---|---|---|---|
| **Resend** | Envio de magic link | `dev.viniciusdamas@gmail.com` (pessoal) | Criar conta nova com email FYMOOB + regenerar API key | Fácil (env var) |
| **Upstash** | Redis (auth tokens + rate limit) | `dev.viniciusdamas@gmail.com` | Settings → Change Email OU recriar banco (zero custo) | Fácil |
| **Cloudflare** | Turnstile (anti-bot login) | `dev.viniciusdamas@gmail.com` | Profile → Change email + adicionar Vinicius como member | Fácil |
| **Supabase** | Banco Postgres (blog + empreendimentos futuros) | A criar | **CRIAR DIRETO com email FYMOOB** | Fácil — ainda não criado |
| **Vercel** | Deploy | Verificar | Adicionar FYMOOB como owner, Vinicius como collaborator | Médio |
| **Nhost** | ~~PostgreSQL~~ (**descontinuado — substituído por Supabase**) | — | Cancelar conta ou abandonar | N/A |
| **GitHub** | Repo `ViniciusDamas/demo` | Vinicius pessoal | Transferir pra org FYMOOB (ou criar nova org + fork) | Médio |
| **Google Cloud** | OAuth pra Search Console/GA4 MCP (Fase 10) | Vinicius | Futuro — criar com email FYMOOB quando ativar MCPs | Baixa urgência |

**Ordem sugerida de migração (após Bruno criar email):**

- [ ] Bruno criar `dev@fymoob.com` ou similar
- [ ] Bruno compartilhar credenciais com Vinicius (gerenciador de senhas)
- [ ] **Supabase**: criar direto com email FYMOOB (antes de provisionar schema)
- [ ] **Resend**: recriar conta + API key + atualizar env var
- [ ] **Upstash**: mudar email (ou recriar Redis — zero dados persistentes relevantes)
- [ ] **Cloudflare Turnstile**: mudar email de conta
- [ ] **Vercel**: adicionar FYMOOB como owner (Billing no nome da empresa)
- [ ] **GitHub**: avaliar transferência ou convite de Bruno como collaborator no repo atual
- [ ] **Nhost**: cancelar (não usamos mais)
- [ ] **Google Cloud**: quando for ativar MCPs, já criar com email FYMOOB
- [ ] Atualizar `.env.local` e Vercel env vars com novos tokens onde aplicável
- [ ] Documentar no `docs/admin-panel-setup.md` quem é owner de cada serviço

### 9.2 — Blog admin [CONTRATO, PENDENTE]

Depois da 9.1.5. Usa a mesma auth compartilhada.

**Decisão de storage (14/04/2026):** trocar Nhost por **Supabase PostgreSQL**. Motivo:
- Nhost free tier pausa o banco depois de 1 semana sem uso — inviabiliza produção
- Supabase free tier: 500MB DB + 1GB storage + 5GB bandwidth — sobra muito pra milhares de artigos
- Supabase não pausa na prática porque o site público faz query a cada pageview
- Row Level Security integrada se precisar no futuro

- [ ] Criar projeto Supabase com email FYMOOB (região sa-east-1 São Paulo)
- [ ] Schema no Supabase PostgreSQL: tabela `articles` (id, slug, title, excerpt, content, cover_image, status, published_at, author_id, created_at, updated_at, seo_title, seo_description, og_image, category, tags JSONB)
- [ ] Migration dos 15 artigos MDX existentes pra tabela (script one-shot em `scripts/migrate-mdx-to-supabase.ts`)
- [ ] Instalar deps: `@supabase/supabase-js`, `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`
- [ ] `/admin/blog` — lista com status (rascunho/publicado), filtro por autor, busca por título
- [ ] `/admin/blog/new` — criar novo artigo com auto-save draft
- [ ] `/admin/blog/[id]` — editar artigo existente
- [ ] Editor: **TipTap rich text** com toolbar (bold, italic, heading, list, link, image, blockquote, code)
- [ ] Preview live do artigo ao lado do editor
- [ ] Upload de imagem: **Supabase Storage** (bucket `articles-covers` e `articles-inline`)
- [ ] Auto-gerar slug a partir do título (kebab-case, dedupe)
- [ ] Publicar/despublicar sem redeploy (muda `status` no banco)
- [ ] Revalidation: ao publicar, `revalidatePath(/blog)` e `revalidatePath(/blog/[slug])`
- [ ] Render público em `/blog/[slug]` consome do Supabase (com fallback pra MDX durante transição)
- [ ] Regenerar sitemap dinamicamente ao publicar
- [ ] Campos SEO específicos: meta title, meta description, OG image
- [ ] Categoria (dropdown) + tags (multi-input)
- [ ] Autor pré-selecionado com usuário logado

### 9.3 — Empreendimentos admin [ESCOPO NOVO, AGUARDANDO DECISÃO DO BRUNO]

Só inicia após fechamento comercial do escopo aditivo (R$ 7.500-9.000 one-time).

- [ ] Schema Supabase: tabela `empreendimento_content` (slug FK CRM, hero_text, hero_image_url, video_url, diferenciais_text, torres_json, plantas_extras_json, etc.)
- [ ] `/admin/empreendimentos` — lista de todos empreendimentos do CRM
- [ ] `/admin/empreendimentos/[slug]` — editor por empreendimento
- [ ] Campos editáveis (definidos junto com Bruno via enquete WhatsApp):
  - Logo (upload)
  - Imagem de capa
  - Frase de destaque
  - Descrição editorial
  - Imagens de parallax (3-5)
  - Torres (nome + foto + descrição cada)
  - Diferenciais / área de lazer
  - Vídeo Vturb/YouTube (embed URL)
  - Texto sobre construtora
- [ ] Upload de assets em Supabase Storage bucket `empreendimentos/[slug]/`
- [ ] Render público em `/empreendimento/[slug]` lê CRM (auto) + painel (editorial)
- [ ] Fallback: se não há dados no painel, renderiza só com dados do CRM

### 9.4 — Auditoria e Observabilidade [futuro]

- [ ] Tabela Supabase `audit_logs` (user_id, action, entity, entity_id, metadata_json, ip, user_agent, created_at)
- [ ] Middleware de log em todas as server actions de `/admin`
- [ ] `/admin/logs` — visualização filtrável (só Vinicius / super-admin)
- [ ] Alertas: email quando algo crítico acontece (ex: >10 tentativas de login falhas em 1h)

### 9.5 — MFA opcional [futuro]

- [ ] TOTP (Google Authenticator) como segundo fator opcional
- [ ] Código de recuperação
- [ ] Fluxo de setup no perfil do admin
- [ ] Obrigatório só pra ações destrutivas (deletar empreendimento, etc.)

### 9.7 — Imagens de Bairros (bônus) [NOVO — solicitado 14/04/2026]

**Problema identificado:** as imagens dos bairros (Batel, Água Verde, Bigorrilho, Portão, etc.) hoje estão salvas localmente em `public/images/bairros/*.jpg` — 13 arquivos. Pra trocar qualquer uma, precisa commit + deploy. Bruno não consegue atualizar de forma independente.

**Onde essas imagens aparecem no site:**
- Cards de bairro na listagem `/imoveis/[bairro]`
- Guias de bairro (`content/bairros/*.mdx`)
- Possivelmente em cards da home e /busca (verificar)
- SEO `og:image` em algumas páginas

**Escopo do painel bônus:**

- [ ] Schema Supabase: tabela `bairros_content` (slug PK, nome, cover_image_url, thumbnail_url, descricao_curta, updated_at, updated_by)
- [ ] Seed inicial: migrar as 13 imagens atuais (`public/images/bairros/*.jpg`) pro Supabase Storage + tabela
- [ ] `/admin/bairros` — grid com todos os bairros da base (inclusive os que ainda não têm imagem customizada), mostrando thumbnail atual
- [ ] Editor por bairro: upload de nova capa (drag-drop), crop opcional, preview antes de salvar
- [ ] Fallback inteligente: se Supabase tem imagem customizada → usa. Se não → usa `public/images/bairros/[slug].jpg` (retrocompat). Se nem local existe → placeholder genérico.
- [ ] Todas as queries de bairro no site usam um helper `getBairroImage(slug)` que resolve essa cascata
- [ ] Revalidate automático ao salvar: `revalidatePath('/imoveis/[bairro]')`, `/busca`, home
- [ ] Audit log: registra quem trocou qual imagem e quando

**Vantagens:**
- Bruno pode atualizar fotos de bairros em tempo real (sazonais, eventos, novas perspectivas)
- Mesmo padrão do painel de empreendimentos — reuso de componentes (upload, cropper, revalidate)
- Custo zero (Supabase Storage free tier é 1 GB — 13 imagens médias = ~5 MB total)
- Escala pra qualquer bairro novo sem deploy

**Estimativa de esforço:**
- Schema + migration das 13 imagens: ~1h
- `/admin/bairros` grid: ~1.5h
- Editor individual com upload: ~2h
- Helper `getBairroImage` + refactor de callers: ~1h
- Revalidate + audit log: ~1h
- **Total: ~6-7h** (feature pequena, reusa componentes do blog/empreendimentos)

**Ordem de execução sugerida:**
1. Depois do Blog admin (9.2) — já tem o padrão de upload/edit estabelecido
2. Antes ou paralelo ao Empreendimentos admin (9.3) — compartilham padrões de asset management
3. Pode ser feito como "freebie" pra consolidar o painel admin unificado antes da entrega final

### 9.6 — Avisos técnicos documentados

- **Resend em modo teste**: usando sender `onboarding@resend.dev` (free tier). Limitação: só envia emails pro endereço dono da conta Resend. Pra produção com outros admins, precisa verificar domínio `fymoob.com` (registros DNS — SPF/DKIM/DMARC) e trocar `RESEND_FROM_EMAIL` pra `noreply@fymoob.com`.
- **Turnstile hostnames configurados**: `demo-blue-beta.vercel.app`, `fymoob.com`, `localhost`. Adicionar outros domínios de preview conforme necessário.
- **Nhost descontinuado**: env var `NHOST_SUBDOMAIN` pode ser removida após confirmação. Não estamos mais usando.
- **Next.js 16 rename**: `middleware.ts` foi renomeado pra `proxy.ts` (convenção oficial). Função exportada também mudou de `middleware` pra `proxy`.

---

## Bugs Abertos

_Nenhum bug aberto._

---

## Fase 10 — SEO Intelligence (MCP + Automacao) [EM ANDAMENTO]

> **Objetivo:** Monitoramento continuo de SEO com IA que analisa dados, sugere melhorias e executa correcoes.
> Motor: MCPs (Google Search Console + GA4) + claude-seo skill (19 sub-skills, 12 subagents)
> Skills customizadas: `/project:seo-report`, `/project:seo-audit`, `/project:seo-fix`

### 10.1 — Instalacao MCPs e Skills
- [x] Instalar mcp-gsc (Google Search Console MCP) — `c:\Users\Vine\mcp-gsc\`
- [x] Criar `.mcp.json` no projeto com config GSC
- [x] Instalar claude-seo skill (20 skills + 10 subagents) — `~/.claude/skills/seo*/`
- [x] Criar skill `/project:seo-report` — relatorio semanal automatico
- [x] Criar skill `/project:seo-audit` — auditoria completa FYMOOB
- [x] Criar skill `/project:seo-fix` — correcoes automaticas
- [x] Criar diretorio `docs/seo-reports/` para historico

### 10.2 — Configuracao Google Cloud (manual — Vinicius)
- [ ] Criar projeto no Google Cloud Console ("FYMOOB SEO")
- [ ] Ativar API "Google Search Console API"
- [ ] Ativar API "Google Analytics Data API"
- [ ] Criar credenciais OAuth (Desktop app) → salvar como `c:\Users\Vine\mcp-gsc\client_secrets.json`
- [ ] Adicionar fymoob.com como propriedade no Google Search Console
- [ ] Autorizar OAuth na primeira execucao (abre browser)
- [ ] Obter GA4 Property ID e adicionar ao `.mcp.json`

### 10.3 — Primeiro Relatorio Baseline
- [x] Executar `/project:seo-report` apos configurar OAuth
- [ ] Executar `/project:seo-audit` completo
- [x] Salvar relatorios em `docs/seo-reports/`
- [x] Documentar metricas iniciais (baseline) para comparacao futura — `docs/seo-reports/2026-04-23-baseline.md`

### 10.4 — Monitoramento Continuo
- [ ] Configurar agente agendado: relatorio semanal toda segunda-feira
- [ ] Configurar agente agendado: auditoria completa todo dia 1 do mes
- [ ] Configurar alertas: notificar se metrica cair >20%

### 10.5 — Proxy de Imagens pra Google Images [DESCOBERTO 23/04/2026]
> CDN da Loft/Vista (cdn.vistahost.com.br) bloqueia TODOS os crawlers via
> robots.txt "Disallow: /". Resultado: 0 imagens dos imoveis indexadas no
> Google Images. Canal de descoberta visual fechado.
>
> **Fix imediato (aplicado commit 72e9b5b):** remover `<image:image>` tags
> do sitemap — limpa 1187 warnings do GSC. Nao resolve indexacao, so limpa
> ruido. Zero perda porque imagens ja nao indexavam.
>
> **Fix completo (essa task):** implementar proxy no nosso dominio.

- [ ] Criar rota `/api/img` que aceita `?src=<cdn-url>`
- [ ] Validar que src comeca com `https://cdn.vistahost.com.br/` (prevenir open proxy)
- [ ] Fetch da imagem do CDN server-side
- [ ] Cachear via `Cache-Control: public, max-age=2592000` (30 dias) + Vercel CDN
- [ ] Retornar com Content-Type correto (image/jpeg|png|webp)
- [ ] Atualizar `sitemap.ts` pra usar URLs `/api/img?src=...` em vez de CDN direto
- [ ] Garantir que `robots.ts` permite `/api/img` (hoje bloqueia `/api/*` — adicionar Allow explicito)
- [ ] Testar: Google Search Console → imagens submetidas indexam em 2-4 semanas
- [ ] Opcional: converter pra WebP on-the-fly via sharp pra reduzir tamanho

**Esforco:** 2-3h
**Impacto esperado:** recupera canal Google Images — pode gerar 5-15% tráfego adicional em sites imobiliários (imagens de imoveis sao altamente clicadas em pesquisa visual).

### 10.6 — Blog Strategy Q2 2026 [PLANEJADO 23/04/2026]
> Baseado em analise do baseline GSC pos-cutover. Plano completo em
> [docs/seo/blog-strategy-2026-q2.md](seo/blog-strategy-2026-q2.md).
>
> **Problema identificado:** posts ranqueiam (pos 3-10) mas nao convertem
> clique no SERP. Caso critico: post `financiamento-caixa-itau-bradesco-comparativo`
> tem **241 impressoes/semana com 0 cliques** em pos 6.7. Titulos no estilo
> "informativo" perdem a guerra do clique contra UOL/TNH1/Metropoles que
> usam curiosity gap.
>
> **Referencia:** padrao TNH1 "Adeus Airbnb" — curiosity gap + perda/morte +
> geolocalizacao vaga + numero concreto. Fluxo de engenharia reversa aplicado
> aos 15 posts atuais + 40 titulos novos propostos pra expansao BR.
>
> **Meta 90 dias:** 300 → 1.500 sessoes/mes blog, CTR 0.8% → 2.5%,
> 3-5 leads/mes originados via blog.
>
> **Ratio de conteudo:** 35% guias evergreen BR + 30% Curitiba local +
> 25% data-driven + 10% comparativos. Mantem moat local, abre funil nacional.

#### 10.6.1 — Fase 1: Quick Wins (Semana 1-2, 28/abr-11/mai)
- [x] **PRIORIDADE MAXIMA** — Reescrever titulo + intro do post `financiamento-caixa-itau-bradesco-comparativo` seguindo template TNH1 (241 imp/sem sem cliques) — concluido 23/04, commit `af60233`
- [ ] Adicionar frontmatter completo (schema FAQ + reading time + autor com CRECI) nos 15 posts existentes
- [ ] Implementar internal linking cross-bairro → guia nacional nos 15 posts
- [ ] Publicar 1 post news: "IPTU Curitiba 2026: como pagar menos" (timing com vencimentos maio)

##### 10.6.1.a — Revisão completa dos 15 posts existentes (agent teams 23/04/2026)

> **Status:** 13 agent teams concluídos em 23/04. Relatórios em
> `docs/research/article-reviews/<slug>.md` com auditoria YMYL +
> estrutural vs Manual Editorial + títulos validados.
>
> **Achado crítico:** **11 dos 13 títulos sugeridos na Estratégia Q2
> foram REJEITADOS** por clickbait sem prova factual (ex: "Batel perde
> trono" era falso — Batel firme em R$ 17.924/m²). Só 2 sugeridos
> passaram: ITBI R$ 12 mil (validado STF Tema 1113) e Checklist
> R$ 80 mil.
>
> **Legenda:** ✅ rewrite concluído | 📋 review OK, rewrite pendente | ⬜ não iniciado

| # | Slug | Prioridade | Status | Título validado (≤55 chars) |
|---|---|---|---|---|
| 1 | como-financiar-minha-casa-minha-vida | — | ✅ | "MCMV 2026: Faixa 4 ampliada desde 22/04 libera imóveis até R$ 600 mil" (publicado 23/04, commit `e98b038`) |
| 2 | financiamento-caixa-itau-bradesco-comparativo | — | ✅ | "Melhor banco pra financiar imóvel em 2026: ranking real" (publicado 23/04, commit `af60233`) |
| 3 | itbi-curitiba-valor-como-pagar | **ALTA ⭐** | ✅ | "Pegadinha do ITBI em Curitiba custa R$ 12 mil" (46) — publicado 24/04 com 5-agent team. Correção crítica: é STJ (não STF) Tema 1113, REsp 1.937.821/SP, Min. Gurgel de Faria, 09/03/2022. Descobriu Programa Curitiba de Volta ao Centro (LC 150/2025) + caso TJ-PR 2025 com restituição R$ 10.214 |
| 4 | mercado-imobiliario-curitiba-2026 | **P0** | ✅ | "Imóveis em Curitiba em 2026: boom, bolha ou filtro?" (51) — publicado 23/04 com 5-agent team. Ângulo final: Ahú +12,5% (Mercês +9% era falso), Curitiba 2ª capital BR (+17,86%), Lei 16.361/2024 explica Batel |
| 5 | preco-metro-quadrado-curitiba-bairro | **ALTA** | ✅ | "Preço do m² em Curitiba 2026: Batel lidera, Ahú voa" (52) — publicado 24/04 com 5-agent team. Descoberta: Campina do Siqueira = 3º no ranking (BRT Leste-Oeste). Ahú +12,5% valida virada. 30+ landings /imoveis/[bairro] linkadas (vs 4 antes) |
| 6 | melhores-bairros-curitiba-2026 | **ALTA** | 📋 | "Juvevê dispara +11,5%: o ranking dos bairros 2026" (51) — post-pilar, 1,5/15 regras |
| 7 | batel-vs-agua-verde-curitiba | **ALTA** | 📋 | "Batel ou Água Verde em 2026: R$ 5.700/m² separam os dois" (58) — título Q2 era falso |
| 8 | quanto-custa-morar-batel-curitiba | **ALTA** | 📋 | "Morar no Batel em 2026: R$ 17.924/m² e 16% de alta no aluguel" (58) — claim "&gt; SP" rejeitado |
| 9 | ecoville-vs-bigorrilho-curitiba | **ALTA** | 📋 | "Ecoville vs Bigorrilho: o m² bateu R$ 14 mil em Curitiba" (55) — claim de migração sem prova |
| 10 | custo-de-vida-curitiba | **ALTA** | 📋 | "Morar em Curitiba em 2026 custa R$ X por mês — calculamos tudo" (54, X TBD via DIEESE-PR) — "34% mais caro" era falso (IPCA real 3-6%) |
| 11 | checklist-compra-imovel | **ALTA** | 📋 | "O item esquecido que faz perder R$ 80 mil no imóvel" (52) — base factual OK, problema 100% editorial |
| 12 | documentos-comprar-imovel-curitiba | **ALTA** | 📋 | "Este documento trava escritura em Curitiba 2026" (50) — "documento esquecido" = Certidão Quitação Tributos Imobiliários |
| 13 | melhores-bairros-familias-curitiba | **ALTA** | 📋 | "Os 8 bairros de Curitiba pra família em 2026 (ranking)" (53) — zero dado demográfico, reescrita ampla |
| 14 | imovel-planta-vs-pronto-curitiba | **ALTA** | 📋 | "Planta vs pronto em 2026: conta real após INCC muda" (49) — endossa construtoras por nome (risco jurídico) |
| 15 | apartamento-ou-casa-curitiba | **MÉDIA** | 📋 | "Casa ou apartamento em Curitiba? 67% já decidiram em 2026" (58) — dado Inpespar validado |

**Ordem recomendada de execução:**

1. **itbi-curitiba-valor-como-pagar** — fact-check sólido (STF), ângulo único, YMYL fiscal de alto valor
2. **mercado-imobiliario-curitiba-2026** — P0, mesmo bug que fixamos no financiamento (consistência do site)
3. **preco-metro-quadrado-curitiba-bairro** — pilar data-driven + destrava 20+ internal links pras landings de bairro
4. **melhores-bairros-curitiba-2026** — outro pilar, depende do #3 estar atualizado com m² reais
5. **quanto-custa-morar-batel-curitiba** + **batel-vs-agua-verde** + **ecoville-vs-bigorrilho** — cluster bairros (podem ser em batch, dados FipeZap compartilhados)
6. **custo-de-vida-curitiba** — requer pesquisa DIEESE-PR extra pra fechar o valor R$ X
7. **checklist** + **documentos** + **melhores-bairros-familias** + **planta-vs-pronto** + **apartamento-ou-casa** — evergreen, podem virar sprint dedicado

##### 10.6.1.b — FYMOOB Research Protocol v1.0 (criado 24/04/2026)

> **Implementado em 24/04/2026.** 5 agents especializados desenharam protocolo
> rigoroso de 8 fases baseado em IFCN + Poynter + Reuters + BBC + Google YMYL.
> Documento mestre: [`fymoob-research-protocol.md`](seo/fymoob-research-protocol.md).
>
> **Objetivo:** FYMOOB virar referência citada por Google AI Overview em queries
> Curitiba. 100% fatos verificados em melhores fontes. Dado exclusivo FYMOOB
> (API Loft) vira moat competitivo.

**Infraestrutura implementada (24/04):**
- [x] Scripts `scripts/research/calculate-yield-by-bairro.mjs` + `extract-stock-by-bairro.mjs` + `snapshot-crm-daily.mjs`
- [x] GitHub Action cron 03:00 BRT (`.github/workflows/crm-snapshot.yml`) — dia zero do histórico
- [x] Componentes MDX `<MethodologyBox>` + `<Changelog>` em [`mdx-components.tsx`](src/lib/mdx-components.tsx)
- [x] Página `/autores/[slug]` com schema Person + bio expandida + CRECI visível
- [x] Agent specs: FYMOOB Data Research + Verifier/Editor em `docs/seo/agent-specs/`
- [x] Manual Editorial upgrade com 10 Research Standards (R-1 a R-10)
- [x] Memória atualizada (`feedback_research_protocol.md`)
- [x] Allow-list 48 domínios em `settings.local.json` (Curitiba gov + APIs + imprensa econômica)
- [x] **Descartado:** DataForSEO MCP (pago — overkill pra 15 posts). Usar MCP `gsc` (Google Search Console já instalado) + WebSearch + Google Suggest como alternativa gratuita.
- [x] Primeiro snapshot CRM rodado em 24/04 (dia zero — 242 imóveis, 66 bairros). Arquivo: `docs/research/snapshots/2026-04-24.json`.
- [ ] GitHub secret `LOFT_API_KEY` cadastrada no repo (pra rodar GitHub Action diariamente) — **ação manual Vinicius: GitHub → Settings → Secrets and variables → Actions → New repository secret**

**Re-aplicação nos 5 posts já reescritos (semana 2 — 28/04-04/05):**
- [ ] `como-financiar-minha-casa-minha-vida` — adicionar `<MethodologyBox>` + `<Changelog>` inicial + link pro /autores/
- [ ] `financiamento-caixa-itau-bradesco-comparativo` — idem + dados Loft yield por banco/perfil
- [ ] `mercado-imobiliario-curitiba-2026` — idem + dados FYMOOB (estoque por bairro real)
- [ ] `itbi-curitiba-valor-como-pagar` — idem + exemplo com valor venal real de bairros CWB
- [ ] `preco-metro-quadrado-curitiba-bairro` — idem + yield real por bairro via script

**Posts 6-15 (semana 3-6):**
Seguem protocolo completo desde o briefing. Time de 7 agents obrigatório. Checklist 30 itens pelo Verifier antes de qualquer publish.

**Critérios de sucesso (30/60/90d):**
- 30d: todos posts com MethodologyBox, Changelog, fonte primária no 1º parágrafo
- 60d: 3+ posts citando dado exclusivo FYMOOB ("yield medido em N imóveis")
- 90d: snapshot histórico completa 90d → cálculo de valorização real por bairro disponível
- 180d: FYMOOB citada por Google AI Overview em query Curitiba

**Padrões recorrentes detectados (atacar sistêmico, não por post):**
- Taxas bancárias desatualizadas em múltiplos posts (mesmo bug já fixado no financiamento)
- H2s como rótulos ("Conclusão", "Pontos fortes") em ~10 posts — violação Regra 5
- Zero fontes linkadas em 11/13 posts — gap YMYL crítico
- Sem FAQ pra capturar PAA (People Also Ask) — tráfego long-tail perdido
- Pilares data-driven (`melhores-bairros-*`, `preco-metro-quadrado-*`) NÃO linkam pras landings `/imoveis/[bairro]` — internal linking leak massivo

#### 10.6.2 — Fase 2: Expansao Inicial (Semana 3-8, 12/mai-22/jun)
- [ ] Publicar "COPOM maio: o que esperar da Selic pra seu financiamento"
- [ ] Publicar "ITBI Curitiba: guia + calculadora 2026" (expandido)
- [x] Publicar "MCMV 2026: tudo que mudou" — publicado 23/04 como newsjacking: "Faixa 4 ampliada desde 22/04 libera imóveis até R$ 600 mil"
- [ ] Publicar "Custo de vida Curitiba 2026" (reescrever + expandir, ja trending)
- [ ] Publicar "Reforma Tributaria e imoveis: 3 impactos"
- [ ] Publicar "10 bairros mais valorizados de Curitiba" (data-driven)
- [ ] Publicar "Documentos pra comprar imovel: lista 2026" (reescrever)
- [ ] Publicar "FGTS na entrada do imovel: guia"
- [ ] Implementar template de copy reutilizavel (snippet MDX) em `src/content/templates/post-template.mdx`
- [ ] Criar hub central `/guia/glossario` pra linking tecnico (ITBI, averbacao, habite-se, alienacao fiduciaria)
- [ ] Comecar newsletter semanal (MailerLite free ate 1k subs)

#### 10.6.3 — Fase 3: Autoridade & Data (Semana 9-12, 23/jun-20/jul)
- [ ] Publicar "Aluguel temporada Curitiba: vale a pena?" (sazonal julho)
- [ ] Publicar pillar "Caixa x Itau x Bradesco x Santander" (evergreen atualizado)
- [ ] Publicar "Balanco 1o semestre mercado imobiliario BR" (linkable asset)
- [ ] Publicar "Preco do m² Curitiba bairro a bairro" (atualizado, data-driven)
- [ ] Bonus: criar "Vistoria de imovel: checklist 47 itens" com PDF baixavel (lead magnet)
- [ ] Bonus: batch de reescrita dos posts antigos com insights do novo template

#### 10.6.4 — Infraestrutura e Processo
- [ ] Implementar componente `<ReadingTime>` calculado automaticamente do MDX
- [ ] Implementar `<TocCollapsible>` (details nativo) pros posts 1500+ palavras
- [ ] Padronizar frontmatter MDX com schema `Article | HowTo | FAQPage` (baseado em conteudo)
- [ ] Implementar `<CalloutBox>` reutilizavel pros destaques de numero/fonte
- [ ] Implementar `<PullQuote>` reutilizavel pras frases-chave screenshot-friendly
- [ ] Processo editorial documentado — seg ideacao / ter-qua rascunho / qui revisao / qui-sex publicacao / dia 1 distribuicao
- [ ] Review mensal: GSC+GA4, posts com >20 imp e 0 clicks reescrevem title em 48h

#### 10.6.5 — Metricas de Sucesso (90 dias)
- [ ] Tracking: 300 → 1.500 sessoes/mes blog
- [ ] Tracking: CTR 0.8% → 2.5%
- [ ] Tracking: 0 → 5 posts com >50 clicks/mes
- [ ] Tracking: 0 → 3-5 leads/mes originados via blog
- [ ] Tracking: 3k → 15k impressoes totais blog

**Recursos:** R$ 300-650/mes (freelance 2 posts/mes) + ~14h/mes equipe Bruno/Wagner/Vinicius.
**Documentos relacionados:**
- [docs/seo/blog-strategy-2026-q2.md](seo/blog-strategy-2026-q2.md) — plano mestre com titulos, calendario, template de copy
- [docs/seo/title-optimization-research.md](seo/title-optimization-research.md) — pesquisa Zyppy/Ahrefs (55 chars sweet spot)
- [docs/seo-reports/2026-04-23-baseline.md](seo-reports/2026-04-23-baseline.md) — baseline GSC pos-cutover

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

## Fase 12 — Conteudo SEO Editorial [EM ANDAMENTO]

> **Objetivo:** Construir topical authority com conteudo editorial profundo.
> Pesquisa mostrou que conteudo local profundo = fator #1 de ranking, acima de CWV.
> Modelo: Pillar + Cluster (guias de bairro → pillar pages → blog)
> Meta: 10 guias de bairro + 3 pillar pages + 10 artigos novos

### 12.1 — Infraestrutura [CONCLUIDA]
- [x] Rota `/guia/[bairro]/page.tsx` — Server Component com dados CRM + MDX editorial
- [x] Servico `src/services/guias.ts` — leitor MDX para guias
- [x] Componente `AuthorBio` — E-E-A-T (CRECI J 9420, foto, bio)
- [x] Sitemap atualizado com guias + pillar pages
- [x] Internal linking: landing pages `/imoveis/[bairro]` → guia completo

### 12.2 — Pillar Pages [CONCLUIDA]
- [x] `/comprar-imovel-curitiba` — Guia completo de compra (3000+ palavras)
- [x] `/morar-em-curitiba` — Guia completo para mudanca (3000+ palavras)
- [x] `/alugar-curitiba` — Guia completo de aluguel (3000+ palavras)

### 12.3 — Guias de Bairro [CONCLUIDA]
> 10 guias com 11.000 palavras totais, dados reais do CRM, FAQ schema, AuthorBio
- [x] Guia do Portao (2500+ palavras)
- [x] Guia do Batel (2500+ palavras)
- [x] Guia do Agua Verde (2500+ palavras)
- [x] Guia do Bigorrilho (Champagnat)
- [x] Guia do Centro
- [x] Guia do Ecoville
- [x] Guia do Cabral
- [x] Guia do Juveve
- [x] Guia do Santa Felicidade
- [x] Guia do Merces

### 12.4 — Blog Editorial [CONCLUIDA]
> 10 artigos novos + 5 existentes = 15 artigos, 15.145 palavras totais
- [x] ITBI Curitiba 2026 (target: 500-1000 buscas/mes)
- [x] Batel vs Agua Verde (target: 200-500 buscas/mes)
- [x] Custo de Vida em Curitiba (target: 1000-3000 buscas/mes)
- [x] Mercado Imobiliario Curitiba 2026 (tendencias, precos, oportunidades)
- [x] Financiamento Caixa vs Itau vs Bradesco (comparativo com tabelas)
- [x] Checklist: 25 Itens para Comprar Imovel (guia pratico)
- [x] Ecoville vs Bigorrilho (comparativo bairros)
- [x] Imovel Planta vs Pronto (vantagens, riscos, custos)
- [x] Melhores Bairros para Familias (8 bairros avaliados)
- [x] Preco m² por Bairro — Tabela 2026 (20+ bairros)

### 12.5 — E-E-A-T Signals [PENDENTE]
- [ ] Testimonials de clientes na pagina Sobre
- [ ] Fotos reais do escritorio e equipe
- [ ] Indice FYMOOB de Precos (pagina com dados do CRM)

### 12.6 — Auditoria e Revisao do Blog [PENDENTE]
> Enviar agentes especialistas para validar todos os 15 artigos publicados.
> Pesquisar padroes de escrita de blog imobiliario na web e aplicar melhorias.

- [ ] Auditar todos os 15 artigos: precisao de dados, links quebrados, informacoes desatualizadas
- [ ] Verificar dados numericos (ITBI, precos m², custos financiamento) — atualizar se mudaram
- [ ] Revisar estrutura SEO: titles, meta descriptions, headings hierarchy (H1→H2→H3)
- [ ] Verificar internal linking: cada artigo linka para imoveis, bairros e outros artigos relacionados?
- [ ] Verificar CTAs: cada artigo tem call-to-action claro para contato/busca/WhatsApp?
- [ ] Pesquisar padroes de escrita de blogs imobiliarios de alta performance (QuintoAndar, ZAP, Loft blog)
- [ ] Verificar legibilidade: paragrafos curtos, bullet points, tabelas, imagens
- [ ] Verificar E-E-A-T: AuthorBio presente, dados com fonte, experiencia demonstrada
- [ ] Verificar schema markup: BlogPosting JSON-LD correto em todos os artigos
- [ ] Gerar relatorio com lista de correcoes por artigo

---

## Fase 13 — Funcionalidades e UX Polish [CONCLUIDA]

> Funcionalidades implementadas na sessao de 04-05/04/2026.

### 13.1 — Comparador de Imoveis [CONCLUIDA]
- [x] Pagina /comparar — comparacao lado a lado de ate 3 imoveis
  - Cards com foto, preco, titulo, botao remover
  - Tabela comparativa: preco, tipo, bairro, area, quartos, suites, banheiros, vagas, condominio, IPTU, preco/m², financiamento, permuta
  - CTA WhatsApp com codigos dos imoveis na mensagem
  - Estado vazio com link para busca
- [x] CompareButton — botao comparar nas paginas de imovel (mobile + desktop)
  - localStorage com evento "compare-change"
  - Max 3 imoveis (4o substitui o mais antigo)
  - Highlight amber quando ativo
- [x] /api/properties/batch — API route para buscar multiplos imoveis em 1 request

### 13.2 — Multi-Select e Dual Range [CONCLUIDA]
- [x] QuickSearch: multi-select bairros com checkboxes (pode selecionar varios)
- [x] QuickSearch: multi-select tipos com checkboxes
- [x] QuickSearch: dual-range price slider (Airbnb pattern) — 1 barra, 2 thumbs
  - CSS puro (zero JS library), thumbs 24px azul brand
  - Labels min/max acima em pills
- [x] MultiListPicker: tela cheia com checkboxes, "Limpar" + "Confirmar (N)"

### 13.3 — UI Polish [CONCLUIDA]
- [x] Cards busca mobile: texto compacto (text-base, line-clamp-2, hide meta row)
- [x] Badge/heart menores no mobile responsive (nao sobrepostos)
- [x] Imovel: espacamento reduzido entre secoes (mt-8→mt-4/6)
- [x] Mapa: estilo positron (cinza) → voyager (colorido)
- [x] Blog: 10 imagens hero otimizadas (Unsplash, 1200x630, 64-183KB)
- [x] Blog: imagem Batel vs Agua Verde substituida por foto real de Curitiba (Rua XV)
- [x] Contato: icone WhatsApp oficial SVG
- [x] Favoritos: batch API (1 request em vez de N)

### 13.4 — Contrato [CONCLUIDA]
- [x] Ajustes solicitados pelo Wagner (6 alteracoes)
  - 3 rodadas revisao, 120 dias suporte, 3h/solicitacao
  - Suporte Vercel (diagnostico), excedente "avaliado conjuntamente"
  - 3 sessoes treinamento de 1h
- [x] Dados preenchidos: CPFs, CNPJ MEI, dados bancarios Bradesco
- [x] Parcelas: 6x R$2.500 dia 10, primeira 10/05/2026
- [x] Data assinatura: 04/04/2026
- [x] PDF gerado e enviado para assinatura digital

### 13.5 — Padrao Ouro UI/UX (sessao 06/04/2026) [CONCLUIDA]
- [x] PropertyFeatures: removido pills cinzas (bg-neutral-50) — atributos inline limpos
- [x] formatPrice: removido centavos (R$7.000.000 em vez de R$7.000.000,00)
- [x] PropertyDetails: codigo do imovel movido do header para rodape tecnico
- [x] PropertyDetails: titulo com line-clamp-2
- [x] MobileContactBar: removido logica localStorage views (urgencia so backend)
- [x] MobileContactBar: preco em brand-primary, bottom-0, safe area iPhone
- [x] BottomNav auto-hide na pagina de imovel (scroll down=esconde, scroll up=mostra, idle 2s=mostra)
- [x] BottomNav: transicao suave translateY 300ms (sem CLS)
- [x] WelcomeBack banner removido da home + arquivo deletado

### 13.6 â€” Refino Focado da Busca (sessao 07/04/2026) [CONCLUIDA]
- [x] Toolbar da /busca unificada dentro de `PropertyListingGrid` com contador real, ordenacao, salvar busca, limpar filtros e grid/lista
- [x] Contagem corrigida para usar `total` do backend e exibicao "Mostrando N nesta pagina"
- [x] `PropertyListingGrid` sem decisao responsiva por JS â€” mobile resolvido por CSS/Tailwind
- [x] `PropertyCard` no contexto de busca refinado com preco em destaque, CTA "Ver detalhes", "Consultar valor" e layout mais compacto

> Validado via Playwright em `/busca` desktop, lista desktop, mobile e estado vazio com filtros ativos.

### 13.7 - Card Cinematografico da Busca (sessao 07/04/2026) [CONCLUIDA]
- [x] `PropertyCard` da /busca com imagem em `aspect-[3/2]`, `object-cover` e hover silencioso sem CTA textual
- [x] Conteudo do card ancorado com `flex flex-col h-full`, `p-5/p-6` e rodape com `mt-auto`
- [x] Specs da /busca convertidas para grid com icones minimalistas, pills sutis e preco statement em chumbo/preto
- [x] Toolbar mantida com breadcrumbs, contador real "Mostrando N de total" e input de codigo separado da barra principal

> Validado via Playwright em `/busca` desktop grid, desktop list e mobile.

---

## Ações para o Bruno (CRM / Conteúdo)

> Tarefas que dependem do Bruno para melhorar a qualidade do site.

### Padronização de Títulos e Descrições no CRM

**Problema:** Os títulos e descrições dos imóveis no CRM estão inconsistentes — alguns com CAPS LOCK, outros cortados, outros genéricos demais. Isso aparece direto no site e prejudica a imagem profissional e o SEO.

**Ação:** Pedir ao Bruno que padronize os títulos e descrições dos imóveis ativos no CRM (Loft/Vista). Abaixo o padrão recomendado:

#### Formato recomendado para TÍTULO (max 70 caracteres)
```
{Tipo} {N} Quartos {Área}m² | {Bairro}, Curitiba — {Diferencial}
```

**Exemplos:**
- `Apartamento 3 Quartos 98m² | Batel, Curitiba — Vista Panorâmica`
- `Sobrado 4 Quartos 220m² | Ecoville — Lazer Completo e 3 Vagas`
- `Cobertura Duplex 180m² | Água Verde — Terraço Gourmet`
- `Casa 5 Quartos 350m² | Santa Felicidade — Piscina e Churrasqueira`

**Por que funciona:**
- Tipo + quartos + m² = palavras-chave que o Google indexa
- Bairro no título = 70%+ das buscas incluem bairro
- Diferencial no final = gera curiosidade e clique
- Listagens com m² no título recebem 15-20% mais cliques

**Palavras que convertem:** vista livre, pronto para morar, reformado, andar alto, sol da manhã, lazer completo, primeira locação, silencioso, segurança 24h

**Evitar:** "IMPERDÍVEL", "NÃO PERCA" (spam), ALL CAPS, exclamações (!!!), "lindo/maravilhoso" sem contexto, abreviações (dorm., gar.)

#### Formato recomendado para DESCRIÇÃO (150-250 palavras)
```
{Frase de estilo de vida com o diferencial principal.}

• {N} quartos ({N} suítes) · {N} vagas · {Área}m² privativos
• {Diferencial 1: acabamento/posição solar/vista}
• {Diferencial 2: lazer do condomínio/segurança}

Localização privilegiada no {Bairro}, a {X} min do {referência — parque, shopping, escola}.

Agende sua visita com a FYMOOB.
```

**Exemplo de descrição profissional:**
```
Viva com vista para o Parque Barigui neste apartamento de alto padrão no Ecoville.

• 3 quartos (1 suíte) · 2 vagas · 126m² privativos
• Acabamento premium, piso porcelanato e cozinha planejada
• Condomínio com piscina, academia, salão de festas e playground

Localização privilegiada no Ecoville, a 5 min do Parque Barigui e do Shopping Barigui.

Agende sua visita com a FYMOOB.
```

**Dados de pesquisa:**
- Descrições com bullet points têm ~30% mais engajamento que texto corrido
- Mencionar proximidade a referências (parques, shoppings) aumenta cliques
- Sempre incluir preço — imóveis sem preço recebem menos leads qualificados

- [ ] Falar com Bruno sobre padronização de títulos no CRM
- [ ] Falar com Bruno sobre padronização de descrições no CRM
- [ ] Criar documento/guia simplificado para o Bruno seguir

### Cadastro de IPTU e Condomínio (todos os imóveis)

**Problema:** Quando o imóvel não tem `valorIptu` ou `valorCondominio` preenchidos no CRM, o campo simplesmente não aparece no site (ContactSidebar desktop e MobilePriceCard). Para venda e locação, isso pode dar impressão equivocada de isenção.

**Comportamento atual:**
- Se `valorIptu` for `null`/`0` → linha "IPTU" some (não aparece nem "Sob consulta")
- Se `valorCondominio` for `null`/`0` → linha "Condomínio" some
- Se ambos forem nulos → o bloco inteiro de taxas não é renderizado

**Ação:** Pedir ao Bruno para preencher `ValorIptu` e `ValorCondominio` em TODOS os imóveis ativos (venda e locação) — mesmo quando o valor for estimativa ou faixa, manter um número cadastrado evita a omissão silenciosa no site.

**Alternativa (dev):** Se o Bruno não puder cadastrar todos, avaliar exibir rótulo "IPTU sob consulta" / "Condomínio sob consulta" quando o campo estiver ausente, para reforçar transparência.

- [ ] Falar com Bruno sobre preenchimento de IPTU/Condomínio em todos os imóveis
- [ ] Decidir se implementamos fallback "Sob consulta" no site enquanto o CRM não for 100% preenchido

### Seguro Incêndio e FCI nos imóveis de locação [DESBLOQUEADO + IMPLEMENTADO — 14/04/2026]

**Resolvido 14/04/2026:** Loft expôs os campos na API pública. Nomes oficiais:
- `SeguroIncendio` (já disponível em `/imoveis/detalhes`)
- `Fci` (já disponível em `/imoveis/detalhes`)
- Endpoint novo descoberto: `/imoveis/listarcampos` — lista todos os 271 campos disponíveis

Integração ao site feita em 14/04/2026:
- [x] Campos `valorSeguroIncendio` e `valorFci` adicionados ao tipo `Property`
- [x] Parse em `services/loft.ts` (DETAIL_FIELDS)
- [x] Render em `ContactSidebar` (desktop) — só aparece pra Locação/Venda+Locação
- [x] Render em `MobilePriceCard` (mobile) — grid 2x2 com Cond/IPTU/Seguro/FCI pra rental
- [x] Cálculo do "Total mensal" agora inclui Seguro Incêndio + FCI (estimativa realista)
- [x] Fallback "Não informado" em italic pra campos vazios no CRM (mesmo padrão de IPTU/Cond)

**Nova task pro Bruno (prioridade alta):**
- [ ] Preencher `Seguro Incêndio` e `FCI` em TODOS os imóveis de locação ativos no CRM. Até ele cadastrar, o site mostra "Não informado" nesses campos nas páginas de aluguel.

---

### (histórico — mantido como referência de debugging)

**Seguro Incêndio e FCI nos imóveis de locação [BLOQUEADO — aguardando Loft/Vista]** — pré 14/04/2026

**Pedido do Bruno (13/04/2026):** incluir os campos **Seguro Incêndio** e **FCI (Fundo de Conservação do Imóvel)** nos imóveis de locação, com fallback "Não informado" quando vazio (mesma regra do IPTU/Condomínio).

**Status:** BLOQUEADO. Esses campos **não existem na API REST** que o site consome (`brunoces-rest.vistahost.com.br`). Confirmado por:

1. **Teste direto na API:** todas as variações testadas (~50) retornam `"Campo X não está disponível"`. Exemplos testados: `ValorSeguroIncendio`, `SeguroIncendio`, `ValorFci`, `FCI`, `FundoConservacao`, `ValorFundoConservacao`, `OutrasTaxas`, `TaxasDiversas`, `Rateio`, etc.
2. **Documentação oficial da Vista** ([vistasoft.com.br/api/](https://www.vistasoft.com.br/api/)): lista todos os campos financeiros disponíveis — nenhum relacionado a seguro ou FCI.
3. **Form de busca do CRM (crmx.novovista.com.br)** decodificado: não tem campos de Seguro Incêndio ou FCI na pesquisa. Só `VLR_VENDA` e `VLR_ALUGUEL`.
4. **Dois sistemas diferentes identificados:** `crmx.novovista.com.br` (NovoVista, onde Bruno edita) ≠ `brunoces-rest.vistahost.com.br` (Vista clássico, que alimenta o site).

**Hipóteses prováveis:**
- Os valores são **calculados automaticamente** por regra (ex: FCI = X% do condomínio) — nesse caso, basta saber a fórmula.
- Os valores ficam **no contrato de locação** (módulo separado), não no cadastro do imóvel.
- Existe uma **API nova do NovoVista** que expõe esses campos, mas não está sendo usada.

**Perguntas para o Bruno abrir com o suporte Loft/Vista:**

1. Os valores de Seguro Incêndio e FCI são **calculados automaticamente** (% do condomínio/aluguel/m²) ou cadastrados manualmente?
   - Se calculados: **qual a fórmula?** A gente replica no site.
   - Se manuais: **qual o nome exato do campo na API REST** e quando estará disponível?
2. Existe uma **API REST do NovoVista** (ex: `api.novovista.com.br`) com schema atualizado? Se sim, **credenciais + documentação**.

**Implementação (quando desbloqueado):**
- Adicionar `valorSeguroIncendio` e `valorFci` em `Property` type
- Adicionar extração em `services/loft.ts` (fields + parse)
- Adicionar renderização em `MobilePriceCard.tsx` e `ContactSidebar.tsx` — só para finalidade "Locação" ou "Venda e Locação"
- Regra de exibição: valor real se cadastrado, "Não informado" se null/0 (mesma lógica já implementada para IPTU/Cond)
- Atualizar `totalPacote` (Aluguel + Cond + IPTU + Seguro + FCI) quando todos os componentes estiverem disponíveis

- [ ] Bruno: perguntar à Loft se valores são calculados ou manuais + nome do campo na API
- [ ] Bruno: verificar se existe API REST do NovoVista com schema atualizado
- [ ] Dev: implementar extração + renderização assim que soubermos o nome do campo / fórmula

---

## Fase 13.8 — SEO Programático Inspirado em Zillow [EM ANDAMENTO — 15/04/2026]

> **Origem:** Pesquisa profunda (5 agentes em paralelo) sobre como Zillow.com chegou a ~200M visitas/mês.
> **Insight central:** Zillow domina long-tail programático — ~110M páginas indexadas,
> ~40M keywords ranqueando, cada URL trazendo 2-3 visitas/mês = 200M total.
> **Aplicável à FYMOOB em Curitiba** (~231 imóveis, ~75 bairros):
> multiplicar as combinações de URL em padrões que replicam (proporcionalmente)
> o "matriz de cobertura" do Zillow, sem depender de orçamento ou escala de dados deles.

### 13.8.1 — Bairro × Quartos pages [CONCLUIDA — 15/04/2026]

**Descoberto 15/04/2026:** infraestrutura parcial já existe em `src/app/imoveis/[bairro]/[tipo]/page.tsx`.
O segmento `[tipo]` aceita `N-quartos` polimorficamente.

**Implementado (commits c8a059a + 19f76eb):**
- [x] Rota `/imoveis/[bairro]/[N]-quartos` funcional (q = 1, 2, 3, 4, 5+)
- [x] generateStaticParams com quartos (1 a 5+)
- [x] generateMetadata com título/descrição otimizada
- [x] Cross-linking para outras opções de quartos + venda/aluguel
- [x] Sitemap inclui essas URLs
- [x] **Expandido N:** agora inclui 1, 2, 3, 4, 5+ (era só 2, 3, 4)
- [x] **Threshold dinâmico:** por bucket real, não pelo total do bairro (≥2 imóveis com aquele N)
- [x] Sitemap atualizado com mesmo filtro

**Thin-content guard (todas combinações):**
- [x] `/imoveis/[bairro]`: só bairros com ≥2 imóveis
- [x] `/imoveis/[bairro]/venda|aluguel`: checa count real da finalidade
- [x] `/imoveis/[bairro]/N-quartos`: checa count real do bucket de quartos
- [x] `/{tipo}-curitiba/[finalidade]`: checa matches reais (sobrados/aluguel excluído — sem imóveis)
- [x] `/imoveis/preco/[faixa]`: checa matches reais por faixa

**Resultado build:** 100 páginas `/imoveis/[bairro]/[tipo]`, 33 páginas de bairro base, ~521 páginas indexáveis totais.
**Query alvo:** "apartamento 3 quartos Batel", "casa 2 quartos Água Verde", "kitnet 1 quarto Centro".
**ROI esperado:** alta — concorrência local baixa, demanda real, 0 custo de manutenção (programático).

### 13.8.2 — Páginas de Bairro com Dados de Mercado [V1 CONCLUIDA, V2/V3 PENDENTES]

> **Inspiração Zillow:** cada página de bairro mostra preço médio/m², tempo médio no mercado,
> variação trimestral. FYMOOB está mostrando só grid de cards — perde força SEO.

Dividido em 3 fases conforme infraestrutura disponível:

#### V1 — Dados atuais (100% Loft API) [CONCLUIDA — 15/04/2026]

Usa apenas dados disponíveis HOJE no CRM Loft, sem criar dívida técnica.
Commit a5a7dec.

- [x] Agregação por bairro em `src/services/loft.ts` (função `getBairroMarketStats`):
  - Preço médio de venda (média dos `precoVenda`)
  - Preço médio de aluguel (média dos `precoAluguel`)
  - Preço médio por m² (média de `precoVenda / areaPrivativa`)
  - Faixa de preço (min-max)
  - Área média (média de `areaPrivativa`)
  - Distribuição por quartos (já temos em `porQuartos`)
  - Preço médio agrupado por Nº de quartos
- [x] Componente `BairroMarketStats` com números destacados (6 cards + grupo por quartos)
- [x] Schema `Dataset` apontando para os dados agregados (com `variableMeasured`, `temporalCoverage`, `spatialCoverage`, CC-BY 4.0)
- [x] Tipo `BairroMarketStats` em `types/property.ts`
- [x] Integrado em `/imoveis/[bairro]/page.tsx` após o grid de imóveis
- [ ] "Bairros vizinhos" via proximidade geográfica (latitude/longitude dos imóveis) — movido para próxima iteração
- [ ] Texto editorial gerado com template — movido para próxima iteração (quando V2 trouxer variação)

**Query alvo:** "preço m² Batel", "mercado imobiliário Curitiba", "quanto custa imóvel em Água Verde".
**ROI esperado:** muito alta — **nenhuma imobiliária de Curitiba faz isso**. First-mover + link magnet.

#### V2 — Snapshot Histórico no Supabase [PENDENTE — próximo sprint]

> **Problema resolvido:** Loft não guarda preços passados, impedindo mostrar variação trimestral.
> **Solução:** gravar snapshots semanais/mensais dos stats agregados em tabela própria.

- [ ] Schema Supabase: tabela `market_snapshots`
  - `id` (uuid), `bairro_slug` (text), `snapshot_date` (date)
  - `preco_medio_venda`, `preco_medio_aluguel`, `preco_m2_medio`
  - `total_imoveis`, `preco_min`, `preco_max`
  - `stats_por_quartos` (jsonb)
- [ ] Vercel Cron Job semanal (domingo 2h UTC) chamando `/api/cron/market-snapshot`
  - Para cada bairro com ≥2 imóveis: calcula stats via `getBairroMarketStats()`
  - Insere linha em `market_snapshots`
  - Idempotente: `ON CONFLICT (bairro_slug, snapshot_date) DO UPDATE`
- [ ] Extender `BairroMarketStats` para comparar último snapshot vs 90 dias atrás:
  - "+X% em 3 meses" (verde se positivo)
  - "-Y% em 3 meses" (vermelho se negativo)
- [ ] Após 90 dias de coleta: primeira comparação real disponível
- [ ] Após 12 meses: variação anual

**Precondição:** Supabase já configurado (Fase 9.2 admin panel) — não custa infraestrutura nova.
**ROI:** altíssimo após 3 meses — diferencial sustentável difícil de copiar.

#### V3 — Histórico de Vendas Real [PENDENTE — médio prazo]

> **Problema:** Loft não expõe histórico de transações (imóvel vendido some do endpoint `/imoveis/listar`).
> **Solução:** parceria com Bruno para exportar CSV mensal do CRM OU dumps direto do banco.

- [ ] Definir formato do export com Bruno (CSV com: código, bairro, tipo, preço, data_cadastro, data_venda)
- [ ] Schema Supabase: tabela `sales_history`
- [ ] Script de import mensal (painel admin) — Bruno faz upload do CSV
- [ ] Nova métrica: **Tempo médio no mercado real** (data_venda - data_cadastro)
- [ ] Nova métrica: **Nº de vendas trimestrais por bairro** (citável em PR)
- [ ] Nova métrica: **Taxa de redução de preço** (preço venda vs preço inicial)
- [ ] Relatório trimestral (13.8.4) ganha dados reais pra press release

**ROI:** alto — habilita 13.8.4 (data journalism para Gazeta do Povo/Tribuna PR) com números que jornalista pode citar.

### 13.8.3 — Calculadoras (Financiamento + Custo Total) [PENDENTE]

> **Inspiração Zillow:** calculadoras são páginas SEO independentes com alta conversão —
> quem calcula está com intenção real de compra.

**Implementação:**
- [ ] `/calculadora-financiamento` — SAC + Price + simulador CEF. Pura matemática client-side.
- [ ] `/calculadora-custo-total` — ITBI + cartório + escritura Curitiba (~3% em Curitiba)
- [ ] Cada calculadora é PÁGINA SEO (não widget escondido): título, explicação, FAQ, schema `WebApplication`
- [ ] Captura de email ao final (lead qualificado)

**Query alvo:** "simulador financiamento imóvel", "ITBI Curitiba calculadora", "quanto preciso ganhar pra comprar imóvel".
**Esforço:** 3-5 dias (client-side).
**ROI esperado:** alta — evergreen, link magnet, leads qualificados.

### 13.8.4 — Relatório Trimestral de Mercado [PENDENTE]

> **Inspiração Zillow:** publicam Home Value Index mensal, Rental Report, Market Reports —
> jornalistas citam, gera backlinks de alta autoridade (Bloomberg, WSJ, NYT).
> **Aplicação FYMOOB:** pitchar pra Gazeta do Povo, Bem Paraná, Tribuna, Bondenews.

**Implementação:**
- [ ] Template de relatório: preço médio por bairro + variação trimestral + tempo médio no mercado
- [ ] PDF baixável + página HTML indexável
- [ ] Cadência trimestral (Q1, Q2, Q3, Q4)
- [ ] Enviar press release pra 5 veículos locais
- [ ] Fonte citável: "Bruno César, diretor da FYMOOB, informa que..."

**ROI esperado:** alta (longo prazo) — cada trimestre = 2-5 backlinks de alta autoridade. Em 1 ano: +10-20 backlinks qualificados = salto perceptível no DA.

### 13.8.5 — Guide Library (12 artigos pillar em 2026) [PENDENTE]

> **Inspiração Zillow:** guides drive more traffic than listings do.
> Top pattern: pillar article + 3-5 supporting articles clusterizados.

**Temas priorizados:**
1. [ ] Como financiar imóvel em Curitiba 2026
2. [ ] ITBI Curitiba: calculadora + passo a passo
3. [ ] Documentação para comprar imóvel na planta
4. [ ] Aluguel sem fiador em Curitiba
5. [ ] Guia do primeiro imóvel em Curitiba
6. [ ] Caução vs seguro-fiança vs fiador (comparativo)
7. [ ] Escritura vs registro: diferenças e custos
8. [ ] Como avaliar o valor real de um imóvel
9. [ ] Reforma x imóvel pronto: vale a pena?
10. [ ] Financiamento: SAC ou Price?
11. [ ] Vender ou alugar imóvel: o que compensa?
12. [ ] Mercado imobiliário de Curitiba em 2026 (panorama anual)

**Cadência:** 1 pillar/mês + 2-3 artigos de apoio por pillar. Trabalho via painel admin (Fase 9.2) quando pronto.

### 13.8.6 — NÃO REPLICAR (armadilhas Zillow)

Documentado para evitar que futuras sessões sugiram:

- ❌ **Zestimate/AVM próprio** — impossível sem base nacional de transações (nem ZAP conseguiu)
- ❌ **School-zone pages** — Brasil não precifica por escola
- ❌ **Agent marketplace** — FYMOOB é a agência
- ❌ **Mobile app** — PWA cobre 95%
- ❌ **Community forum** — moderação > SEO em escala regional
- ❌ **3D tours Matterport** — ~R$ 300/imóvel, só faz sentido em premium

### 13.8.7 — Timeline de Indexação Google (Pós-Deploy) [REFERÊNCIA — 15/04/2026]

> **Pergunta respondida 15/04/2026:** quanto tempo até ~521 páginas indexarem no Google?

**Dados consolidados (2026, múltiplas fontes SEO):**

| Marco | Timeline |
|---|---|
| Primeiras páginas indexadas | 24–72h (com submit manual GSC) |
| Bulk (~70-80% das páginas) | 2–3 semanas |
| Indexação completa (~521 páginas) | **2–3 meses** |

**Benchmark por volume de site:**
- <500 páginas: 3-4 semanas
- 500–25k páginas: **2-3 meses** (faixa da FYMOOB)
- Novo domínio: +2-4 semanas para descoberta inicial

**Fatores que aceleram no caso FYMOOB:**
- ✅ Sitemap.xml dinâmico pronto
- ✅ Schema.org JSON-LD em todas as páginas (RealEstateListing, Breadcrumb, ItemList)
- ✅ Conteúdo único por página (bairro, imóvel, quartos, guia)
- ✅ Internal linking forte (cross-links bairro/tipo/quartos)
- ✅ Thin-content guard (nenhuma página vazia = crawl budget respeitado)

**Fatores que atrasam:**
- ⚠️ Site antigo: baixa autoridade de domínio (5 páginas indexadas hoje)
- ⚠️ Sem backlinks externos ainda
- ⚠️ Lançamento em batch (~500 páginas de uma vez → Google espaça o crawl)

**Plano de aceleração (a executar no deploy):**
1. [ ] Submit sitemap no GSC no dia do deploy (`fymoob.com/sitemap.xml`)
2. [ ] **URL Inspection manual** nas 10 URLs prioritárias: home, /busca, top 5 bairros (Batel, Água Verde, Bigorrilho, Centro, Portão), 2 landings tipo (apartamentos-curitiba, casas-curitiba) → indexação em 24-72h
3. [ ] **IndexNow ping** (Bing/Yandex) em paralelo — cobertura instantânea fora do Google
4. [ ] Backlinks iniciais: perfil FYMOOB em portais (ZAP, VivaReal, Chaves na Mão), diretórios de Curitiba (Curitiba Imobiliária, Gazeta do Povo)
5. [ ] Google Business Profile ativo e atualizado — sinaliza autoridade local (impacta Local Pack, ~15% do tráfego imobiliário)
6. [ ] Configurar GSC + GA4 + Bing Webmaster Tools **antes** do deploy

**Expectativa realista para FYMOOB (pós-deploy):**
- Semana 1: ~50 páginas indexadas (priorizadas via URL Inspection)
- Mês 1: ~300 páginas (~60%)
- Mês 2-3: ~500 páginas (95%+)

**Monitoramento:**
- GSC "Coverage" report semanalmente no 1º mês
- Alertar se <30% indexado após 30 dias → auditar com Screaming Frog

**Fontes:**
- [CrawlWP — How long before Google indexes](https://crawlwp.com/how-long-before-google-index-new-website-page/)
- [Conductor — Google indexing speed](https://www.conductor.com/academy/google-index/faq/indexing-speed/)
- [SEOZoom — Google indexing times](https://www.seozoom.com/google-indexing-time-seo/)
- [Search Engine Journal](https://www.searchenginejournal.com/how-long-before-google-indexes-my-new-page/464309/)
- [Google Search Central — Build and Submit a Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

### 13.8.8 — Decisão Threshold (validada por 3 agentes em paralelo) [REFERÊNCIA — 15/04/2026]

> **Pergunta:** relaxar thresholds para ≥1 para cumprir os 800+ do contrato?
> **Resposta consolidada (3 agentes):** NÃO. Mantém ≥2/≥3 — atingir 800+ via novas combinações legítimas.

**Justificativa:**
- HCU Mar/2024 + Scaled Content Abuse policy penaliza exatamente "800 páginas geradas programaticamente com 1 listing cada"
- Zillow/Redfin aplicam noindex dinâmico quando inventário < threshold (engenharia reversa via `site:`)
- Wrapper de schema + FAQ + intro sem inventário real = padrão-alvo do HCU
- Risco: classificação como "produção em escala com propósito de manipular ranking" → penalidade de core update

**Threshold final (ratificado):**

| Rota | Threshold | Manter |
|---|---|---|
| `/imoveis/[bairro]` | ≥2 imóveis | ✅ |
| `/imoveis/[bairro]/venda\|aluguel` | ≥2 da finalidade | ✅ |
| `/imoveis/[bairro]/[tipo]` | ≥3 do tipo | ✅ |
| `/imoveis/[bairro]/N-quartos` | ≥2 do bucket | ✅ |
| `/imoveis/preco/[faixa]` | ≥2 na faixa | ✅ |
| `/{tipo}-curitiba/[finalidade]` | ≥2 matches | ✅ |

**Páginas vazias (0 resultados):** `noindex, follow` + mensagem "sem imóveis no momento" + cross-links para bairros vizinhos (NÃO 404, NÃO 302 — URL precisa persistir para quando inventário voltar).

**Caminho para atingir 800+ páginas (ver Fase 13.9):**
- Long-tail pt-BR não-óbvio: +150-250
- Guias editoriais por bairro: +75
- Faixa × tipo: +20
- Pillars + apoio (13.8.5): +48
- Bairro × atributos (garagem/varanda/andar): +100
- **Total projetado: ~920-1020 páginas de qualidade**

---

## Fase 13.9 — SEO 2026 Playbook (AI Search, E-E-A-T, Long-tail não-óbvio)

> **Origem:** Agente especialista em SEO imobiliário 2026 (15/04/2026).
> **Meta:** Descobertas além do playbook Zillow: otimização para era AI Overviews + E-E-A-T YMYL + long-tail pt-BR que os grandes portais ignoram.

### 13.9.1 — AI Search Optimization (GEO/AEO) [PRIORIDADE ALTA]

> **Por que agora:** AI Overviews já aparecem em ~47% das SERPs imobiliárias US (Q4/25).
> Zero-click é o novo #1 — citation é o que importa.

**Implementação:**
- [ ] Passagens auto-contidas 40-60 palavras respondendo 1 pergunta específica ("Quanto custa m² em Batel?")
- [x] Tabelas comparativas com dados únicos (BairroMarketStats — commit a5a7dec)
- [x] `/llms.txt` na raiz listando páginas canônicas + dados estruturados (commit dba648b)
- [x] Schema `Dataset` com `variableMeasured` em páginas de bairro (commit a5a7dec)
- [ ] Passagens factuais em cada landing respondendo perguntas específicas
- [ ] Priorizar clareza factual > prosa (AIs extraem sentenças, não parágrafos)

**ROI esperado:** 15-30% do tráfego futuro via citation-driven clicks.

### 13.9.2 — Entity SEO / Wikidata [PRIORIDADE MÉDIA]

> **Por que:** Entidades rankeiam sem backlinks tradicionais + desbloqueiam Knowledge Panel.

**Implementação:**
- [ ] Criar item Wikidata "FYMOOB" com P31 (business), P17 (Brasil), P159 (Curitiba), P856 (site), P2002 (X/IG), P1278 (CNPJ)
- [ ] `sameAs[]` em Organization schema apontando para Wikidata, LinkedIn, IG, FB, GBP, Receita CNPJ
- [ ] Consistência NAP absoluta em 20+ diretórios (ZAP, VivaReal, Apontador, Telelistas, Guiamais, etc.)
- [ ] `/sobre` com fatos entity-like (fundação, CRECI-PR, bairros atendidos, CNPJ público)
- [ ] Publicar co-occurrences "FYMOOB + Curitiba + imóveis" em PR locais

**ROI esperado:** Knowledge Panel em 6-12 meses se sinais consistentes.

### 13.9.3 — E-E-A-T para YMYL Imobiliário [EM ANDAMENTO]

> **Por que:** Real estate = YMYL (Your Money Your Life). Google aplica quality raters guidelines rigorosamente.

**Implementação:**
- [x] CRECI-PR visível no footer (J 9420 imobiliária) + `/sobre` (ambos sócios) + autor de blog — commit b799781
- [x] Schema `RealEstateAgent` por corretor com `hasCredential` (CRECI-PR) — commit 74c9a12
- [x] `/sobre` tem Bruno + Wagner com CRECI pessoal, bio, foto, credenciais
- [x] Schema `Organization` expandido com `founder[]` + CRECI J 9420 da imobiliária
- [x] Schema `AboutPage` ligando tudo via `@graph`
- [x] BlogPosting author agora é `RealEstateAgent` com `@id` vinculado a `/sobre#bruno` (CRECI/PR 24.494)
- [x] AuthorBio: CRECI correto (24.494 pessoal, não J 9420 da empresa) + link para `/sobre#bruno`
- [ ] `Review` + `AggregateRating` schema (importar reviews GBP legalmente)
- [x] RealEstateListing com `reviewedBy` Bruno via `@id` (commit dba648b)
- [ ] "Última atualização" visível nas páginas de listing (data dinâmica)
- [x] Política editorial pública em `/politica-editorial` (commit dba648b)

**ROI esperado:** +20-40% CTR em SERPs competitivas + proteção contra core updates.

### 13.9.4 — Long-tail Programático pt-BR Não-Óbvio [PRIORIDADE ALTA — escala]

> **Descoberto:** grandes portais (ZAP/VivaReal) ignoram esses padrões. Concorrência baixa, intenção alta.

**URLs a adicionar (volume estimado Curitiba):**

| Padrão | Exemplos | Concorrência |
|---|---|---|
| `/imoveis/perto-de-[poi]` | metro, hospital, shopping, universidade, parque Barigui | baixa |
| `/imoveis/aceita-pet` + `/[bairro]/aceita-pet` | filter por caracteristicas Loft | baixa (em crescimento 2024-26) |
| `/imoveis/minha-casa-minha-vida-curitiba` | MCMV por faixa/bairro | média |
| `/apartamentos-pronto-para-morar-[bairro]` | Status construcao | baixa |
| `/imoveis/ate-[valor]-com-[N]-quartos-[bairro]` | combinação rara | baixa (CPC alto) |
| `/imoveis/mobiliados-[bairro]` | nicho aluguel | baixa |
| `/imoveis/planta-[empreendimento]` | busca por empreendimento específico | baixa |
| `/imoveis/[bairro]/garagem-coberta` | + varanda-gourmet, andar-alto, varanda | baixa |

**Target total:** +150-250 novas URLs programáticas.
**Query alvo:** "apartamento pet Batel", "MCMV Curitiba", "apartamento mobiliado Centro", "apartamento com varanda gourmet Água Verde".

### 13.9.5 — Image SEO Avançado [PRIORIDADE MÉDIA]

**Implementação:**
- [ ] Filename: `apartamento-3-quartos-batel-curitiba-sala.jpg` (não `IMG_1234`)
- [ ] Schema `ImageObject` com `contentUrl`, `caption`, `geo`
- [ ] Preservar EXIF GPS quando legal (geo-tagging fotos dos imóveis)
- [ ] Alt descritivo cena+contexto (não keyword stuffing)
- [ ] AVIF com fallback WebP
- [ ] Sitemap dedicado `sitemap-images.xml`
- [ ] Tour 360/vídeo schema `VideoObject` quando disponível

**ROI:** Image Pack em ~30% das queries "imóvel [bairro]".

### 13.9.6 — Core Web Vitals INP Focus [EM ANDAMENTO — Fase 11 continua]

**Thresholds 2026:** LCP <2.5s, INP <200ms (ideal <150ms), CLS <0.1.
**Diferencial competitivo:** Razzi/JBA estão em 400ms+ INP.

**Técnicas específicas listagem:**
- [ ] `fetchpriority=high` no LCP hero
- [ ] `content-visibility: auto` em cards abaixo do fold
- [ ] Debounce de filtros 150ms + `startTransition`
- [ ] Responsive images com `sizes` preciso
- [ ] Evitar hydration de cards (Server Components puros)
- [ ] INP killer: remover handlers síncronos em filtros → URL state + RSC

### 13.9.7 — Local SEO Checklist [PRIORIDADE ALTA]

**GBP (Google Business Profile):**
- [ ] Categoria primária "Imobiliária" + secundárias ("Corretor", "Administradora aluguel")
- [ ] Posts 2x/semana linkando bairros diferentes
- [ ] Q&A preenchido proativamente
- [ ] Produtos = imóveis destaque
- [ ] Meta de reviews: 2-4/semana, responder 100% em <24h, citar bairro na resposta

**Citations BR (NAP consistente):**
ZAP, VivaReal, Chaves na Mão, OLX, Imovelweb, QuintoAndar, Apontador, Guia Mais, Telelistas, Econodata, Yelp BR, Foursquare.

**Local pack:**
- [ ] Embed mapa GBP na home + `/contato`
- [ ] Geo schema com lat/long exata
- [ ] Review velocity sustentada

**ROI:** Top 3 Local Pack "imobiliária [bairro]" em 4-6 meses.

### 13.9.8 — Conteúdo Editorial que Rankeia em 2026

**Formatos de alto crescimento pt-BR:**
- [ ] `[Bairro A] vs [Bairro B]: onde morar em Curitiba` (comparativos)
- [ ] `Os N melhores bairros de Curitiba para [famílias/solteiros/aposentados/pets]`
- [ ] `Quanto custa morar em [bairro]` (IPTU, condomínio médio, mercado)
- [ ] `Vale a pena investir em [bairro]` (com dados proprietários)
- [ ] Data journalism: "Relatório FYMOOB Q[N] 2026" (ver 13.8.4)

### 13.9.9 — Backlinks Orgânicos BR [PRIORIDADE MÉDIA]

- [ ] Data journalism: release trimestral preço/m² → Gazeta do Povo, Bem Paraná, Tribuna PR
- [ ] HARO/Conector/SourceBottle BR: respostas do Bruno como corretor citado
- [ ] Guest post: Casa e Jardim, Nubank, Quero Investir
- [ ] Parcerias locais: arquitetos, mudanças, decoradoras (link recíproco)
- [ ] Listagem moradia estudantil PUCPR/UFPR

**ROI:** 3-5 backlinks DR60+ em 6 meses via data journalism.

### 13.9.10 — Keywords pt-BR Baixa Concorrência/Alta Intenção

**Padrões que ZAP/VivaReal ignoram:**
- `financiamento caixa apartamento [bairro]`
- `imóveis FGTS Curitiba`
- `apartamento MCMV [bairro]`
- `imóvel escriturado [bairro]`
- `imóvel sem entrada Curitiba`

**Vantagem FYMOOB:** ZAP/VivaReal não fazem guias de bairro profundos + E-E-A-T de corretor nomeado.

---

## Fase 13.10 — Indexação Agressiva (Pós-Deploy)

> **Origem:** Agente especialista em indexação Google 2026 (15/04/2026).
> **Meta:** 70-80% das ~670 páginas indexadas em 3-4 semanas (vs 2-3 meses do padrão).

### 13.10.1 — Descartar (NÃO fazer)

- ❌ **Google Indexing API para real estate** — restrita a `JobPosting` e `BroadcastEvent`. Usar fora disso = BAN manual garantido.
- ❌ **IndexMeNow, Omega, RapidURLIndexer** — PBN-based ou uso não-autorizado da Indexing API. Risco alto.
- ❌ **PubSubHubbub/WebSub** — morto para Google desde 2017.
- ❌ **`<priority>` e `<changefreq>`** no sitemap — ignorados pelo Google desde 2017.
- ❌ Indexar página `JobPosting` fake para listings — BAN garantido.

### 13.10.2 — Implementar (Day 0 do deploy)

**IndexNow (Bing/Yandex):** [IMPLEMENTADO — commit dba648b]
- [x] Gerar key `.txt` em `/public/[key].txt`
- [x] `src/lib/indexnow.ts`: função `submitToIndexNow()` + `submitUrl()`
- [x] Endpoint `POST /api/indexnow` protegido por `INDEXNOW_SECRET`
- [ ] Adicionar env var `INDEXNOW_SECRET` no Vercel (pós-deploy)
- [ ] Hook no webhook Vercel em cada deploy (pós-deploy)
- [ ] Primeiro ping manual das top 50 URLs após go-live
- Custo zero, cobre 30%+ do tráfego global (Google ainda testando IndexNow)

**Sitemap segmentado:** [IMPLEMENTADO — commit dba648b]
- [x] `/sitemap/0.xml` (~231 imóveis individuais)
- [x] `/sitemap/1.xml` (bairros + combinações tipo/finalidade/quartos/preço)
- [x] `/sitemap/2.xml` (blog + guias + pillars)
- [x] `/sitemap/3.xml` (estático + institucional + empreendimentos)
- [x] `/sitemap.xml` = index automático via `generateSitemaps`
- [x] `<lastmod>` preciso por URL (confirmado por John Mueller, 2024)

**GSC + GA4 + Bing Webmaster Tools:**
- [ ] Propriedades criadas e verificadas ANTES do deploy
- [ ] Submit imediato do sitemap index
- [ ] URL Inspection manual nas 50 URLs prioritárias (home, top 10 bairros, top 20 imóveis, 4 landings tipo)

**Google Business Profile:**
- [ ] Perfil "FYMOOB Imóveis Curitiba" verificado antes do deploy
- [ ] NAP idêntico ao site

### 13.10.3 — Semana 1-4 (automação pós-deploy)

**URL Inspection API automatizada:**
- [ ] Script Node diário submetendo 2.000 URLs/dia (limite oficial)
- [ ] Priorização: home > bairros top 10 > tipo+finalidade > imóveis ativos > blog > long-tail
- [ ] Libs: `google-search-console-indexing` (Python) ou `gsc-indexing-cli`
- [ ] Rate limit: 600 requests/minuto

**Publicação em ondas (não 670 de uma vez — evitar flag de spam):**
- [ ] **Day 0:** 200 páginas core (home, bairros, imóveis, tipos principais)
- [ ] **Day 7:** +250 páginas (bairro+tipo, bairro+quartos, bairro+finalidade)
- [ ] **Day 14:** +220 páginas (long-tail, blog, guias, calculadoras)

**TagParrot (OPCIONAL — só com budget aprovado):**
- Serviço pago de terceiros (~$20/mês) que automatiza URL Inspection API em rotação
- **NÃO necessário** — script próprio + submit manual cobrem 90% do valor
- Listar aqui apenas para referência caso precise escalar no futuro com aprovação do Bruno

### 13.10.4 — Backlinks de Discovery Rápida

Não para ranking, apenas para acelerar crawl:
- [ ] **Reddit** r/Curitiba, r/brasil — crawl quase imediato
- [ ] **Medium** — 2-3 artigos linkando hubs
- [ ] **LinkedIn Pulse** — artigos do Bruno linkando bairros
- [ ] **Quora Brasil** — respostas genuínas sobre Curitiba imobiliário
- [ ] **Apontador, Telelistas, Guiamais** — citations locais

### 13.10.5 — Arquitetura Interna para Crawl Budget

- [ ] Home linka direto para top 20 bairros + 4 tipos (apartamentos/casas/sobrados/terrenos)
- [ ] Breadcrumb depth máximo 3: `Home > Bairro > Imóvel`
- [ ] Hub pages `/imoveis/[bairro]` linkam 20+ imóveis + bairros vizinhos + tipos filtrados
- [ ] Related listings em cada imóvel (4-8 similares) — crawl lateral
- [ ] Evitar footer com 500+ links (flag de spam)

### 13.10.6 — Monitoramento Contínuo

- [ ] **GSC Coverage Report** — semanal (categorias Indexed/Discovered/Crawled)
- [ ] `site:fymoob.com` — diário, contar resultados
- [ ] **Screaming Frog** (500 URLs grátis) — crawl semanal vs sitemap
- [ ] **Sitebulb ou Ahrefs Site Audit** — mensal
- [ ] **Log files Vercel** — hits do Googlebot por URL

### 13.10.7 — Timeline Realista

| Período | Meta | Tática principal |
|---|---|---|
| Day 0 | 0% (deploy) | Sitemap submit + IndexNow + GBP + 50 URLs manuais |
| Semana 1 | ~30% indexado | URL Inspection API + Reddit/LinkedIn/Medium |
| Semana 3-4 | **70-80% indexado** | Ondas 2-3 + backlinks locais |
| Semana 6-8 | 90%+ indexado | Manutenção + data journalism |

**Benchmark:** clientes Jetimob (500-2k páginas) batem 75% em 21 dias com execução similar. Sem Indexing API não dá pra garantir 80% em 2 semanas, mas **4 semanas é factível**.

---

## Fase 13.11 — Auditoria Pré-Deploy [ONDA 1+2 CONCLUIDAS, ONDA 3 PÓS-DEPLOY — 15/04/2026]

> **Origem:** 4 agentes em paralelo (SEO + Security + Rotas + Integrações) + build local.
> **Status:** bloqueadores identificados — fix obrigatório antes de ir ao ar.
> **Contexto:** site vai para `https://fymoob.com.br` (primary) + `https://fymoob.com` (redirect).

### 13.11.1 — ONDA 1: Bloqueadores de Deploy [CONCLUIDA — 15/04/2026, commit c0759ca]

#### 13.11.1.a — `/api/lead` protegido
- [x] Adicionar rate limit (Upstash, 5/IP/10min) — `checkLeadRateLimit` em `rate-limit.ts`
- [x] Validar Turnstile token server-side
- [x] Validar inputs: email regex, telefone BR regex, nome min 2 chars, mensagem max 2000
- [x] Sanitizar `nome.trim()`, `nome.slice(0, 120)`, `mensagem.slice(0, 2000)`
- [x] `AbortSignal.timeout(8000)` no fetch Loft
- [x] Consentimento LGPD obrigatório (`consentLGPD`)

#### 13.11.1.b — LGPD (obrigatório legal)
- [x] `ContactForm.tsx`: checkbox obrigatório + Turnstile widget renderizado + token enviado
- [x] Criar `/politica-de-privacidade/page.tsx` com texto LGPD (13 seções)
- [x] Linkar política no Footer ("Privacidade" + "Política Editorial")

#### 13.11.1.c — Fallbacks hardcoded `https://fymoob.com` → `.com.br`
- [x] Bulk replace via sed em 13 arquivos `src/**/*.{ts,tsx}`
- [x] `src/app/empreendimento/[slug]/page.tsx:130`: schema usa `SITE_URL`
- [x] `src/app/opengraph-image.tsx:85`: rodapé `fymoob.com.br`
- [x] `.env.example`: NEXT_PUBLIC_SITE_URL + RESEND_FROM_EMAIL atualizados
- [x] `src/auth.ts`: fallback noreply@fymoob.com → noreply@fymoob.com.br
- [x] `src/app/politica-editorial/page.tsx`: email contato@fymoob.com.br → fymoob@gmail.com (commit a79f836)

#### 13.11.1.d — Admin cards 404
- [x] Cards convertidos em `<div>` não-clicáveis com `cursor-not-allowed` + `opacity-70`

#### 13.11.1.e — ShareButton com URL hardcoded
- [x] `src/components/shared/ShareButton.tsx`: usa `NEXT_PUBLIC_SITE_URL` com fallback `.com.br`

### 13.11.2 — ONDA 2: Alto [CONCLUIDA — 15/04/2026, commit 6ad1526]

- [x] Criar `src/app/error.tsx` + `src/app/global-error.tsx` (UX com branding, WhatsApp fallback, digest)
- [x] `src/app/robots.ts`: `/admin` adicionado no disallow
- [x] `src/app/opengraph-image.tsx:85`: fymoob.com → fymoob.com.br (incluído na Onda 1)
- [x] `ContactForm` com Turnstile widget + validação server-side (incluído na Onda 1)
- [ ] Regenerar `AUTH_SECRET` com `openssl rand -base64 32` para produção (só no Vercel — ação manual)
- [x] Pillar pages: publisher URL corrigido via bulk sed (Onda 1)
- [x] `src/app/empreendimento/[slug]/page.tsx:130`: schema usa `SITE_URL` (Onda 1)
- [x] WhatsApp tel: `+554199978-0517` → `+5541999780517` (8 ocorrências, bulk sed)
- [x] Rate limit em `/api/properties/batch`, `/api/property/[code]`, `/api/photos/[code]` — `checkApiLoftRateLimit` 60/min/IP + validação regex de code
- [x] Google Maps embed em `/contato` — endereço real via `maps.google.com/maps?q=...`

### 13.11.3 — ONDA 3: Médio — pode ser pós-deploy

- [ ] CSP + HSTS headers em `next.config.ts`
- [ ] Rate-limit e Turnstile: fail-closed em produção (hoje fail-open)
- [x] `RESEND_FROM_EMAIL` fallback `.com` → `.com.br` em `src/auth.ts` (feito na Onda 1)
- [ ] Schema author unification: pillars usarem `@id /sobre#bruno` (hoje `Person` com `credential` inválido)
- [ ] Wagner schema: adicionar campo `image` (Bruno tem, Wagner não)
- [ ] Timeouts em fetch Loft (`AbortSignal.timeout(8000)`)
- [ ] Timeouts em Upstash (`Promise.race` com 3s)
- [ ] Criar `src/env.ts` com validação zod de env vars críticas (fail fast no build)
- [ ] Footer: adicionar coluna "Guias" com `/comprar-imovel-curitiba`, `/morar-em-curitiba`, `/alugar-curitiba`
- [ ] `getAllPropertiesInternal` try/catch retornando `[]` em erro (hoje propaga → 500)
- [ ] JSON-LD escape `</` via helper compartilhado (XSS via CRM poisoning)

### 13.11.4 — Baixo / polish — pós-deploy

- [ ] Remover senha Supabase do comentário em `.env.local`
- [ ] Decidir: usar `SUPABASE_SERVICE_ROLE_KEY` ou remover (hoje no env mas não usada)
- [ ] Docs (`docs/seo-strategy.md`, `docs/admin-panel-setup.md`): atualizar `.com` → `.com.br`
- [ ] CLAUDE.md: corrigir rota documentada `/imoveis/ate-300-mil` → `/imoveis/preco/[faixa]`
- [ ] `INDEXNOW_SECRET` adicionar ao `.env.example`
- [ ] BottomNav: considerar atalho para contato/WhatsApp
- [ ] `.env.local:40-41`: remover linhas com fragmento de senha

### 13.11.5 — Verificado OK (não precisa fix)

- [x] Build limpo (zero errors, zero warnings, 670 páginas geradas)
- [x] Todas as rotas CLAUDE.md existem em `src/app/`
- [x] `notFound()` usado corretamente em 11 rotas dinâmicas
- [x] `not-found.tsx` existe com design consistente
- [x] Metadata em todas as 32 páginas públicas
- [x] Sitemap segmentado em 4 (generateSitemaps funcionando)
- [x] Schema.org entity graph conectado via `@id` (Organization, LocalBusiness, Bruno, Wagner)
- [x] llms.txt dinâmico
- [x] Turnstile fail-closed em caso de rede (bom)
- [x] Rate limit Upstash com prefixes corretos (`fymoob:auth:`, `fymoob:admin:login:*`)
- [x] ISR: revalidate 3600s em imóveis, 7200s em empreendimentos
- [x] IndexNow protegido por secret
- [x] `proxy.ts` protege `/admin/*` exceto `/admin/login`
- [x] Loft API com cache `unstable_cache` + fallback vazio se env ausente
- [x] WhatsApp `5541999780517` consistente em todos os lugares (exceto tel: formatado)
- [x] `robots.ts` bloqueia `/api/`, `/favoritos`, `/comparar`
- [x] Nenhum import morto de Nhost/Hasura no código
- [x] Imagens de bairro: todos os 12 slugs em `/public/images/bairros/` existem
- [x] Nenhum "lorem ipsum" / "TODO" em conteúdo público

---

## Fase 13.12 — Redesign Pagina /anuncie (UX + Conversao)

> **Origem:** usuario apontou que dropdown "Assunto" tinha opcoes erradas
> + sem acentos + form generico sem coletar dados do imovel (16/04/2026).
> **Pesquisa:** melhores praticas 2026 (Unicorn Platform, Landingi, NN/G).

### 13.12.A — Fase A: Correcoes criticas [CONCLUIDA]

- [x] Parametrizar `ContactForm` com prop `interesseOptions` (opcoes customizaveis)
- [x] Parametrizar `ContactForm` com prop `interesseLabel`
- [x] Fix acentos nas opcoes default (imóvel, Dúvida, etc.)
- [x] `/anuncie` usa opcoes especificas: Vender, Alugar, Avaliar, Dúvida
- [x] Label customizado no /anuncie: "O que você deseja?"

### 13.12.B — Fase B: Wizard multi-step [PENDENTE — maior ROI conversao]

> **Por que:** pesquisa 2026 mostra que wizard + staged disclosure
> aumenta completion rate vs form longo. Bruno tambem recebe lead mais
> qualificado (sabe tipo + bairro + faixa de preco do imovel).

**Step 1 — O que voce quer fazer?** (segmentacao owner/tenant)
- 2 cards grandes clicaveis:
  - "📍 Vender meu imovel" -> avaliacao + fotos + publicacao
  - "🔑 Alugar meu imovel" -> inquilino qualificado + contrato

**Step 2 — Sobre o imovel**
- Tipo (chips clicaveis: Apartamento, Casa, Sobrado, Terreno, Comercial, Kitnet)
- Bairro (autocomplete com os 75 bairros do Loft)
- Faixa de preco estimada (slider)
- Tamanho aproximado em m² (input numerico)

**Step 3 — Seus dados**
- Nome, email, telefone (com mascara ja implementada)
- Melhor horario pra contato (chips: manha, tarde, noite, qualquer)

**Step 4 — Confirmacao e envio**
- Resumo dos dados preenchidos
- Consent LGPD obrigatorio (ja existe)
- Turnstile (ja existe)
- Botao "Solicitar avaliação gratuita"

**Componentes a criar:**
- `src/components/anuncie/AnuncieWizard.tsx` (container)
- `src/components/anuncie/steps/Step1Finalidade.tsx`
- `src/components/anuncie/steps/Step2Imovel.tsx`
- `src/components/anuncie/steps/Step3Contato.tsx`
- `src/components/anuncie/steps/Step4Confirmar.tsx`
- `src/components/anuncie/ProgressBar.tsx`

**Backend:**
- [ ] Expandir `/api/lead` payload: aceitar campos de imovel (tipo, bairro, faixa, area)
- [ ] Extender mensagem enviada ao Loft com dados estruturados
- [ ] Validacao server-side dos campos novos

**UX:**
- [ ] Progress bar no topo (1 de 4, 2 de 4...)
- [ ] Animacao slide entre steps (CSS transform)
- [ ] "Voltar" entre steps sem perder dados
- [ ] State no URL (?step=2) pra compartilhar/voltar
- [ ] Confirmacao visual ao completar (check animado)

**Estimativa:** 1-2h implementacao + 30min refino.
**ROI esperado:** +30-50% completion rate vs form atual (dado medio de wizards).

### 13.12.C — Fase C: Polish e conversao [PENDENTE]

- [ ] **Sticky CTA** no mobile ("Anuncie agora →") no topo da pagina
- [ ] **Hero com form lateral** no desktop (form visivel desde o primeiro pixel)
- [ ] **Trust block reforcado**: fotos de Bruno/Wagner + CRECI + anos no mercado + portfolio ativo
- [ ] **Video curto do Bruno** explicando processo (opcional, requer gravacao)
- [ ] **Depoimentos reais**: pedir pro Bruno 2-3 clientes vendedores pra citacao
- [ ] **Calculadora de avaliacao estimada** baseada em `BairroMarketStats` (precoM2Medio)
- [ ] **Tempo medio de venda/locacao** na FYMOOB (requer V3 snapshots de vendas)
- [ ] **Badge "VERIFICADO FYMOOB"** no processo — sinal de confianca

**Fontes da pesquisa (16/04/2026):**
- Unicorn Platform 2026: minimize form length + staged approach + audience segmentation
- Landingi 2026: trust signals + clear CTAs + mobile-first
- NN/G: progressive disclosure classic pattern = wizard
- Propphy 2026: visual content + CWV <3s + responsive

---

## Fase 13.13 — Estratégia de Armazenamento de Imagens [DECISÃO — 16/04/2026]

> **Pergunta:** qual serviço usar para armazenar imagens que não vêm da API Loft
> (bairros, team, sobre, hero, blog)?
> **Resposta:** dois momentos distintos.

### 13.13.A — Para lançamento (AGORA) — `public/` + Vercel CDN [ATUAL, NÃO MUDAR]

**Decisão:** manter todas as imagens estáticas em `public/images/` versionadas no Git.

**Estado atual (16/04/2026):**
- 70 imagens, 19 MB total
- Bairros: 12 JPGs em `/public/images/bairros/`
- Team: `bruno.jpeg`, `wagner.jpeg` em `/public/images/team/`
- Hero home: `hero-home.webp` (261 KB) + `hero-home-mobile.webp` (46 KB) + fallback `.jpg`
- Sobre: `sobre-maior.jpeg` + `sobre-dreams.jpg`
- Blog: `/public/images/blog/`
- Empreendimentos (custom assets editoriais): `/public/images/empreendimentos/`

**Por que NÃO migrar agora:**
- Volume pequeno — 19 MB é irrelevante pra Git + Vercel
- Imagens são **estáticas** (bairros, team, hero mudam 1-2 vezes/ano)
- Vercel CDN tem 40+ edge POPs globais — latência baixa
- Next.js `<Image />` já converte pra AVIF/WebP + responsive sizes automático
- Zero setup, zero custo, zero risco
- Imagens versionadas junto com código = rollback trivial

**Quando este plano quebra:** volume > 500 MB OU upload via painel admin.

### 13.13.B — Para admin editor (FASE 9.2) — Supabase Storage [A CONFIGURAR]

**Decisão:** quando Bruno puder fazer upload de imagens (blog, empreendimentos) via painel admin, usar **Supabase Storage**.

**Por quê Supabase:**
- Já temos projeto Supabase ativo (env vars configuradas)
- Free tier (1 GB storage + 2 GB bandwidth) cobre escopo de Bruno
- Mesma auth da sessão NextAuth do painel admin
- Policies de RLS protegem upload/delete (só admin)
- Bruno vê tudo no mesmo dashboard do Supabase

**Buckets a criar (quando Fase 9.2 começar):**
| Bucket | Uso | Visibilidade |
|---|---|---|
| `blog-covers` | Capas de artigos do blog | Public read, admin write |
| `blog-inline` | Imagens dentro de artigos (editor MDX) | Public read, admin write |
| `empreendimentos` | Fotos custom de empreendimentos premium (editorial) | Public read, admin write |

**Policies RLS sugeridas:**
- SELECT: qualquer um (site publico exibe)
- INSERT/UPDATE/DELETE: apenas usuarios autenticados com email em `ALLOWED_ADMIN_EMAILS`

### 13.13.C — Imagens que NUNCA saem do `public/`

Mesmo quando admin for ativado, estas imagens ficam no Git eternamente (fazem parte do "template" visual do site):

- Logo, favicon, ícones (`/public/logo.png`, `/icon.svg`)
- Bairro images (raramente mudam, editorial)
- Hero home (design-driven, atualiza no deploy)
- Sobre hero (design-driven)
- Team photos (2 fotos, Bruno pede pra mudar 1-2x/ano)
- Placeholder/fallback images

### 13.13.D — Alternativas consideradas e descartadas

| Serviço | Free tier | Por que descartado |
|---|---|---|
| **Cloudinary** | 25 GB + 25 GB BW | Overkill pra 19 MB; Next.js Image ja faz AVIF/WebP/resize |
| **Vercel Blob** | 1 GB | Paga desde dia 1 ($0.015/GB); redundante com Supabase |
| **Cloudflare R2** | 10 GB, egress grátis | API S3 complexa pro beneficio; sem optimization |
| **AWS S3 + CloudFront** | 5 GB + 50 GB BW | Overkill pra escala FYMOOB; setup complexo |
| **Nhost Storage** | (descontinuado) | Substituido por Supabase (14/04/2026) |

### 13.13.E — Benchmarks (futuro)

Monitorar após 6 meses de produção:
- Tamanho total de `/public/images/` (alerta se > 200 MB)
- Bandwidth Vercel dashboard (Hobby tem limite ~100 GB/mês)
- Upload volume no Supabase Storage (se admin ativo)

Se bairro images ganharem 100 novas entradas (ex: expansao pra outras cidades), migrar apenas bairros pra Supabase Storage + seed via script.

---

## Fase 14 — Inteligência Imobiliária (Produto Futuro)

> Plataforma de dados e IA para vantagem competitiva da FYMOOB.
> Escopo separado do site — pode ser vendido como produto/consultoria.

### 14.1 — Monitoramento de Lançamentos e Construtoras
- [ ] Scraper de alvarás de construção da Prefeitura de Curitiba (dados públicos)
- [ ] Mapeamento de construtoras ativas em Curitiba (CNPJ, porte, histórico)
- [ ] Rastreamento de novos lançamentos em portais (VivaReal, ZAP, OLX)
- [ ] Score de oportunidade (construtora sem imobiliária exclusiva = lead quente)
- [ ] Alertas automáticos via WhatsApp/email para o Bruno

### 14.2 — Monitoramento de Concorrentes
- [ ] Scraping periódico dos sites da Jota8, Razzi, Apolar
- [ ] Detecção de novos imóveis captados por concorrentes
- [ ] Detecção de imóveis removidos (vendidos = indica demanda)
- [ ] Comparativo de faixas de preço por bairro vs concorrência

### 14.3 — Análise de Mercado e Tendências
- [ ] Preços médios por bairro ao longo do tempo (dados API Loft + scraping)
- [ ] Detecção de bairros com valorização acelerada
- [ ] Imóveis que baixaram preço (oportunidade de captação)
- [ ] Tempo médio de venda por região e tipo

### 14.4 — Dashboard e IA
- [ ] Dashboard Next.js com visualização de dados
- [ ] Claude API para extrair dados estruturados de páginas desestruturadas
- [ ] Relatório semanal automático com insights acionáveis
- [ ] Sugestões de ação ("Construtora X lançou no Batel sem parceira — ligar agora")

### Stack Técnica
- Scraping: Playwright + Firecrawl (JS rendering)
- Processamento: Claude API (extração de dados)
- Storage: PostgreSQL (Nhost)
- Alertas: WhatsApp API / email
- Dashboard: Next.js (mesmo stack)
- Cron: Vercel Cron ou Railway

### Modelo de Negócio
1. Incluso no contrato FYMOOB como diferencial (fidelização)
2. Produto SaaS separado — assinatura mensal para imobiliárias
3. Consultoria — análise e relatórios sob demanda

---

## Fase 15 — Lead Capture + CRM Automatizado

> Fluxo: capturar dados do cliente antes de abrir WhatsApp → enviar ao CRM via API → CRM cadastra cliente, atribui corretor pela roleta, registra mídia.
> Solicitado pelo Bruno em 07/04/2026. Inspirado no fluxo do ImovelWeb.

### Documentacao Tecnica — API Lead (testada e validada)

```
POST https://brunoces-rest.vistahost.com.br/lead?key={LOFT_API_KEY}
Content-Type: application/x-www-form-urlencoded

cadastro={"lead":{"nome":"...", "email":"...", "fone":"...", "interesse":"Venda", "anuncio":"69804147", "veiculo":"Site FYMOOB", "mensagem":"..."}}
```

**Campos:**
| Campo | Obrigatorio | Descricao |
|-------|-------------|-----------|
| `nome` | Sim | Nome do cliente |
| `email` | Sim (se nao tem fone) | Email do cliente |
| `fone` | Sim (se nao tem email) | Telefone do cliente |
| `interesse` | Nao | "Venda" ou "Locacao" (derivar da finalidade do imovel) |
| `anuncio` | Nao | Codigo do imovel (ex: "69804147") |
| `veiculo` | Sim | Midia de origem — usar "Site FYMOOB" |
| `mensagem` | Sim | Texto da mensagem (pode ser auto-gerada) |

**Resposta sucesso (200):**
```json
{"status": 200, "message": "O cadastro foi encontrado.", "Codigo": 8826568, "Corretor": 14}
```
- `Codigo` = ID do lead no CRM
- `Corretor` = ID do corretor atribuido pela roleta automatica

**Formato importante:** O body é `application/x-www-form-urlencoded` com o JSON dentro do parametro `cadastro` (nao é JSON puro no body).

### Tasks

- [ ] **15.1** Criar servico `src/services/lead.ts` — funcao `submitLead({nome, email, fone, codigoImovel, interesse, mensagem})` que faz POST /lead
- [ ] **15.2** Criar API route `src/app/api/lead/route.ts` — proxy server-side para nao expor LOFT_API_KEY no client
- [ ] **15.3** Criar componente `WhatsAppLeadModal` — modal com campos Nome, Email, Telefone, botao "Iniciar conversa"
- [ ] **15.4** Integrar modal no botao WhatsApp da pagina do imovel (`ContactSidebar`) — clique abre modal em vez de ir direto pro WhatsApp
- [ ] **15.5** Integrar modal no `MobileContactBar` — botao "Quero visitar" abre modal antes do WhatsApp
- [ ] **15.6** Integrar modal no `WhatsAppFloat` (desktop) — mesmo fluxo
- [ ] **15.7** Fluxo pos-submit: apos POST /lead com sucesso → redirecionar para WhatsApp com mensagem pre-preenchida (comportamento atual, mas agora com dados no CRM)
- [ ] **15.8** Tratamento de erro: se API falhar, redirecionar pro WhatsApp mesmo assim (nao bloquear o contato do cliente)
- [ ] **15.9** Validacao de formulario: nome obrigatorio, email OU telefone obrigatorio, feedback visual
- [ ] **15.10** Campo `interesse` automatico: derivar de `property.finalidade` ("Venda", "Locacao", ou perguntar se "Venda e Locacao")
- [ ] **15.11** Campo `mensagem` auto-gerada: "Ola! Tenho interesse no imovel {titulo} (Cod: {codigo})." — editavel pelo usuario
- [ ] **15.12** Metrificacao: `veiculo` = "Site FYMOOB" permite filtrar no CRM todos os leads vindos do site
- [ ] **15.13** Testar fluxo completo: modal → API → CRM cadastra cliente → corretor atribuido → WhatsApp abre
- [ ] **15.14** Avisar Bruno para deletar lead de teste (Codigo 8826568) criado durante validacao da API

### Notas de implementacao
- API route server-side obrigatoria — a key nao pode ir pro browser
- Usar `application/x-www-form-urlencoded` com param `cadastro` (nao JSON body)
- Fallback: se a API der erro, o WhatsApp abre normalmente (usuario nao pode ficar travado)
- O formulario do `/contato` ja existe mas envia email — adaptar para tambem enviar ao CRM
- Performance: o modal e leve (form simples), nao precisa de dynamic import

### Estado atual dos formularios (2026-04-17)

**Destino dos 2 formularios publicos hoje:**

Tanto `/imovel/[slug]` (form "Envie uma mensagem") quanto `/anuncie` (form "Cadastre seu imovel") caem em `POST /api/lead` que proxyeia para `POST https://brunoces-rest.vistahost.com.br/lead?key=$LOFT_API_KEY`. Ambos aparecem no CRM Loft/Vista com `veiculo = "Site FYMOOB"`.

**Proteges ja aplicadas em `/api/lead/route.ts`:**
- Rate limit 5 req / 10min por IP (x-real-ip, fail-closed)
- Turnstile captcha obrigatorio
- Consent LGPD obrigatorio (valida antes de chegar a API)
- Sanitizacao inputs (trim + slice max 120/2000 chars)
- Validacao EMAIL_REGEX + PHONE_REGEX
- Timeout 8s na chamada a Loft
- Erro generico pro client se Loft cair (502) — nao vaza detalhes

**O que NAO esta implementado (gaps conscientes):**
- ❌ Email de notificacao pra Bruno/Wagner quando lead chega (Resend so pra magic link admin hoje)
- ❌ WhatsApp push notification
- ❌ Banco proprio (Nhost/Supabase) como backup do CRM
- ❌ GA4 event `lead_submit` com `property_code` + `interesse` (mede conversao real)
- ❌ Auto-reply pro usuario confirmando recebimento
- ❌ Se Loft cair: lead perdido, usuario ve erro e pode desistir

**Melhorias propostas (nao implementadas, discussao aberta com Bruno):**
- 15.15 — **Fallback Resend**: apos POST Loft OK, disparar email pra `bruno@fymoob.com` + `wagner@fymoob.com` com corpo do lead (redundancia + push notification instantaneo)
- 15.16 — **GA4 event** `lead_submit` (mede conversao por pagina/imovel/interesse)
- 15.17 — **Persistencia em DB proprio** (ver Fase 15.A abaixo — decisao Supabase vs Nhost)
- 15.18 — **Auto-reply** via Resend ao email do usuario confirmando recebimento (UX + reduz ansiedade de "sera que chegou?")
- 15.19 — **Fallback em caso de Loft offline**: salvar lead em DB proprio + retry via cron quando Loft voltar (zero perda)

---

### Fase 15.A — Decisao Backend/Storage: Supabase vs Nhost [DECIDIR ANTES DE FASE 15.17]

**Contexto:** `.env.example` tem `NHOST_SUBDOMAIN` mas **0 imports de `@nhost/*` ou `@supabase/*` em `src/`** — ambos sao "futuro". Decidir agora qual plataforma usar antes de comecar 15.17 (persistir leads).

**Escopo de uso:**
- Storage de imagens (upload admin: hero empreendimentos, autored content blog)
- Tabela `leads` (backup Loft CRM, historico proprio, relatorio)
- Futuro: `users` + `saved_properties` (logged-in user feature)
- Auth admin ja esta coberto por NextAuth v5 + Resend magic link (nao trocar)

**Comparativo (pesquisa 2026-04-17):**

| Dimensao | **Supabase** | **Nhost** |
|---|---|---|
| Auth.js v5 adapter | **First-party oficial** — NextAuth+Resend continua, Supabase so guarda sessions | Sem adapter. Ou ignora auth deles, ou migra tudo |
| Dashboard CRUD pra Bruno ver leads | **Table editor (estilo Airtable)** — cliente-friendly | Hasura Console — developer-first, Bruno vai se perder |
| Postgres + RLS | Puro + RLS maduro, referencia do mercado | Via Hasura permissions — mais verboso, UI propria |
| Regiao sa-east-1 (Sao Paulo) | ✅ Confirmado publicamente | ❓ Nao documentado, precisa confirmar |
| Image transforms on-the-fly | So Pro+ ($25/mes) | Free mas region BR nao confirmada |
| Realtime (admin ve lead chegar) | **Nativo e maduro** (broadcast/presence/changes) | GraphQL subscriptions via Hasura |
| Maturidade / risco empresa | $200M+ funding, comunidade grande, releases diarios | 6-12 pessoas, ultima rodada 2021 ($3M seed), risco medio |
| Free tier | 500MB DB, 1GB storage, 5GB bandwidth | 1GB DB, 1GB storage, 5GB egress |
| Docs Next.js 16 App Router | First-class | OK mas menor |

**Decisao: Supabase.** Tres razoes decisivas:
1. **Auth.js v5 adapter first-party** — zero refactor do login admin atual
2. **Dashboard CRUD cliente-friendly** — Bruno consegue ver leads sem a gente codar admin panel
3. **Maturidade corporativa + sa-east-1 confirmado** reduz risco em projeto long-term

**Trade-off:** perdemos image transforms no free tier. Mas imagens reais vem da CDN Vistahost (fotos imovel) ou `/public/images/` (hero estaticos), que rodam via `next/image` do Vercel sem precisar storage-side transform. So afetaria uploads autorais de blog/empreendimentos no futuro — nesse ponto, Pro ($25/mes) justificado.

**Riscos de migrar hoje:** quase zero. `NHOST_SUBDOMAIN` esta em `.env.example` mas nao importado. Trocar = deletar var, adicionar `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`, editar CLAUDE.md.

**Estimativa setup inicial:** 2-4h (criar projeto sa-east-1 + 3 migrations base `leads`/`users`/`saved_properties` + RLS + `@supabase/ssr` install + `src/services/supabase.ts` server + browser clients + Auth.js adapter). Schema design dos leads e o que vai demorar, nao a plataforma.

### Tasks Fase 15.A

- [ ] **15.A.1** — Criar projeto Supabase em sa-east-1 (Sao Paulo)
- [ ] **15.A.2** — Atualizar `.env.example`: remover `NHOST_SUBDOMAIN`, adicionar `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY`
- [ ] **15.A.3** — Atualizar CLAUDE.md secao "Stack" (Nhost → Supabase) e "Env vars"
- [ ] **15.A.4** — Instalar `@supabase/ssr` + criar `src/services/supabase.ts` com clients server/browser separados
- [ ] **15.A.5** — Schema migration inicial: tabela `leads` (id, codigo_imovel, nome, email, fone, interesse, mensagem, veiculo, loft_lead_code, status, created_at)
- [ ] **15.A.6** — RLS na tabela `leads`: service_role full access, anon role zero (so backend grava)
- [ ] **15.A.7** — Schema migration: tabela `saved_properties` (user_id, codigo_imovel, created_at) — futuro login
- [ ] **15.A.8** — Atualizar `/api/lead/route.ts`: apos POST Loft OK, tambem persistir em Supabase (storage 15.17)
- [ ] **15.A.9** — Criar Storage bucket `public-assets` pra futuras imagens upload (policy: only service_role write, public read)
- [ ] **15.A.10** — Documentar schema em `docs/db-schema.md` (fonte de verdade pra migrations futuras)

---

## Nice-to-Have (fora do contrato atual)

> Estas features agregam valor mas nao estao no escopo contratual.
> Implementar apenas se houver tempo ou como upsell/manutencao.

- [ ] Preco/m2 comparativo — comparacao com media do bairro
- [ ] Mapa split-panel na busca — mapa interativo lado a lado com lista
- [x] ~~Comparador de imoveis~~ — IMPLEMENTADO (Fase 13.1)
- [ ] Landing imagens quebradas tipo — verificar remotePatterns, CDN URLs, fallback placeholder
- [ ] Rever todas as imagens de bairros — substituir placeholders Unsplash por fotos reais de Curitiba (pedir ao Bruno ou buscar fotos licenciadas). Verificar `src/lib/bairro-images.ts` e `public/images/bairros/`
- [ ] Explorar Vizinhança (POIs) — mapa com pontos de interesse por raio (escolas, restaurantes, etc) usando MapLibre + Overpass API (gratuito, alternativa ao Expandify pago)

---

## Fase 16 — Claude Managed Agents (Médio Prazo — Pós-Deploy)

> **Contexto:** Anthropic lançou Claude Managed Agents em beta público (08/04/2026).
> Plataforma managed para agentes IA com infra, scaling e segurança inclusos.
> Custo: tokens do modelo + $0.08/hora de runtime do agente.
> Docs: https://platform.claude.com/docs/en/managed-agents/overview

### 16.1 — Agente de Qualificação de Leads
> Prioridade alta — impacto direto na conversão do site.
- [ ] Criar agente que recebe leads do formulário do site (POST /api/lead)
- [ ] Agente qualifica via conversa: bairro preferido, faixa de preço, tipo de imóvel, urgência
- [ ] Integrar com API Loft (read-only) como tool — agente sugere imóveis compatíveis
- [ ] Enviar lead qualificado ao CRM com dados enriquecidos (interesse, faixa, bairros)
- [ ] Fallback: se agente indisponível, fluxo atual (WhatsApp direto) continua funcionando

**Como implementar:**
1. Definir agent com tools: `search_properties` (GET API Loft), `submit_lead` (POST /lead)
2. Guardrails: read-only na API Loft (REGRA ABSOLUTA), max tokens por sessão, timeout 5min
3. System prompt com contexto FYMOOB: bairros, faixas de preço, tipos disponíveis
4. Deploy via Claude Platform (managed infra)
5. Endpoint exposto como API route no Next.js (`/api/agent/qualify`)

**Custo estimado:** ~$58/mês runtime (24/7) + ~$20-50/mês tokens = ~$80-110/mês

### 16.2 — Agente de Atendimento Imobiliário (Chat 24h)
> Corretor virtual que responde dúvidas sobre imóveis específicos.
- [ ] Widget de chat na página do imóvel (lazy load, abaixo do fold)
- [ ] Tools do agente: buscar detalhes do imóvel, fotos, localização, imóveis similares
- [ ] Responde perguntas: "Aceita pet?", "Tem vaga?", "Valor do condomínio?", "Perto de escola?"
- [ ] Se não souber, direciona para WhatsApp do corretor
- [ ] Dados de conversa enviados ao CRM como contexto do lead

**Como implementar:**
1. Agent com tools: `get_property_details`, `search_similar`, `get_neighborhood_info`
2. System prompt: tom consultivo, nunca inventar dados, sempre citar fonte (CRM)
3. UI: botão "Perguntar sobre este imóvel" → chat modal lightweight
4. Sessão persistente por imóvel (memory do Managed Agents)

### 16.3 — Agente de Monitoramento SEO Automático
> Já temos skills SEO — transformar em agente scheduled.
- [ ] Migrar lógica do `/project:seo-report` para Managed Agent
- [ ] Schedule semanal: analisa GSC, Lighthouse, indexação
- [ ] Gera relatório em `docs/seo-reports/` automaticamente
- [ ] Alerta via email/WhatsApp se ranking cair >20% em keyword importante
- [ ] Sugere ações corretivas baseado nos dados

**Como implementar:**
1. Agent com tools: GSC API, PageSpeed Insights, sitemap reader
2. Cron via Claude Platform (schedule semanal)
3. Output: markdown report + alertas condicionais

---

## Fase 17 — Agentes como Produto SaaS (Longo Prazo)

> **Visão:** Empacotar agentes FYMOOB como produto para vender a outras imobiliárias.
> Modelo: $1.500-3.000 setup + $500/mês por cliente (margem alta, manutenção baixa).
> Base: Fase 14 (Inteligência Imobiliária) + Fase 16 (Managed Agents).
> Referência: tweet Corey Ganim — "business in a box" com nicho imobiliário.

### 17.1 — Produto: Agente de Leads para Imobiliárias
> Replicar o agente 16.1 como produto white-label.
- [ ] Multi-tenant: cada imobiliária tem seu agente com dados próprios (API key, bairros, estoque)
- [ ] Onboarding automatizado: cliente fornece API key do CRM → agente configurado em horas
- [ ] Dashboard de métricas: leads qualificados, taxa de conversão, tempo de resposta
- [ ] Personalização: tom de voz, bairros prioritários, faixas de preço
- [ ] Billing: Stripe integration para cobrança mensal recorrente

**Como implementar:**
1. Template de agente parametrizável (CRM endpoint, API key, config de negócio)
2. Admin dashboard Next.js para gerenciar clientes e agentes
3. Cada cliente = 1 Managed Agent com tools e guardrails próprios
4. Custo por cliente: ~$80-110/mês (Anthropic) → cobrar $500/mês = margem ~80%

### 17.2 — Produto: Monitor de Mercado Imobiliário
> Transformar Fase 14 em serviço managed.
- [ ] Agente de scraping + análise que roda periodicamente
- [ ] Detecta novos lançamentos, mudanças de preço, imóveis vendidos
- [ ] Relatório semanal automatizado por email com insights acionáveis
- [ ] Alertas em tempo real: "Construtora X lançou no Batel sem parceira"
- [ ] API para integrar com CRMs dos clientes

**Como implementar:**
1. Managed Agent com tools: Playwright (scraping), Claude API (extração), PostgreSQL (storage)
2. Cron schedules: diário (scraping), semanal (relatório), real-time (alertas)
3. Multi-tenant: cada cliente monitora seus concorrentes e bairros de interesse

### 17.3 — Produto: Gerador de Conteúdo SEO Imobiliário
> Agente que gera conteúdo otimizado automaticamente.
- [ ] Gera descrições profissionais para imóveis novos no CRM
- [ ] Cria/atualiza landing pages programáticas com dados frescos
- [ ] Produz artigos de blog sobre tendências do mercado local
- [ ] Review humano obrigatório antes de publicar (guardrail)

**Como implementar:**
1. Agent com tools: CRM API (dados), GSC (keywords), content templates
2. Trigger: webhook do CRM quando novo imóvel entra
3. Output: markdown pronto para publicação, aguardando aprovação

### 17.4 — Go-to-Market
- [ ] Landing page do produto (subdomínio ou domínio separado)
- [ ] 3 imobiliárias beta (incluindo FYMOOB como caso de uso)
- [ ] Case study com métricas reais (leads qualificados, tempo de resposta, conversão)
- [ ] Precificação por tier: Basic ($300/mês), Pro ($500/mês), Enterprise (custom)
- [ ] Parceria com CRMs (Loft/Vista, Jetimob, Kenlo) para canal de distribuição

### Modelo Financeiro Estimado
```
Setup: R$5.000-10.000 por cliente (configuração + onboarding)
Mensal: R$1.500-2.500 por cliente
Custo Anthropic: ~R$400-600/mês por cliente
Margem bruta: ~70-80%

10 clientes = R$15.000-25.000/mês recorrente
Custo total Anthropic: ~R$5.000/mês
Lucro operacional: ~R$10.000-20.000/mês
```

---

## Prioridade de Execucao

```
CONCLUIDO:
  ✅ Fase 0-6 (Fundacao, UX, Institucional)
  ✅ Fase 8 (SEO Programatico — 616 paginas no sitemap)
  ✅ Fase 11.0-11.8 (Performance — 59→88 Home, 75→86 Busca, 65→91 Imovel)
  ✅ Fase 12.1-12.4 (Conteudo Editorial — 10 guias, 3 pillars, 15 artigos, 35K palavras)
  ✅ Fase 13 (Comparador, Multi-select, Dual-range, UI Polish, Contrato)

PROXIMO:
  Fase 7 → Deploy producao (fymoob.com) — depende de DNS do Bruno
  Apresentacao Rodada 1 ao cliente (~1 semana)

PARALELO:
  10.2 Google Cloud OAuth → 10.3 Baseline → 10.4 Monitoramento
  12.5 E-E-A-T (testimonials, fotos, indice precos)

APOS GO-LIVE:
  Fase 9 → Painel Blog Admin
  Fase 15 → Lead Capture + CRM (pré-requisito para agentes)
  11.10 → Performance fine-tuning (SearchBar code-split, @base-ui audit)

MEDIO PRAZO (pos-deploy + Fase 15 concluida):
  Fase 16 → Claude Managed Agents
    16.1 Agente de Qualificacao de Leads (~$80-110/mes)
    16.2 Agente de Atendimento 24h
    16.3 Agente de Monitoramento SEO

LONGO PRAZO (produto):
  Fase 14 → Inteligencia Imobiliaria (scraping, IA, dashboard)
  Fase 17 → Agentes como Produto SaaS
    17.1 Agente de Leads white-label para imobiliarias
    17.2 Monitor de Mercado como servico
    17.3 Gerador de Conteudo SEO automatizado
    17.4 Go-to-Market (10 clientes = R$15-25K/mes recorrente)

QUANDO POSSIVEL:
  Nice-to-haves
```
