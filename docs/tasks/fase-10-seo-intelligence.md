# Fase 10 — SEO Intelligence (MCP + Automacao)

> MCPs, automacao SEO, Blog Strategy Q2.
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


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

### 10.2.A — GA4 MCP Setup [BLOQUEADO 27/04/2026 — retomar depois]

> **Objetivo:** instalar `googleanalytics/google-analytics-mcp` (oficial) pra extrair dados da landing paga `destaques.fymoob.com/reservabarigui` e turbinar o ranqueamento da pagina organica `/empreendimento/reserva-barigui`.

**Property GA4 alvo:**
- Account ID: `312780116`
- Property ID: `439717135` (link: analytics.google.com/analytics/web/#/a312780116p439717135/...)
- Dono dos dados: Avantti/Bruno (FYMOOB tem acesso de leitura via Bruno)

**Bloqueios encontrados (em ordem de tentativa):**

1. **OAuth via gcloud com scope `analytics.readonly`** — bloqueado com "Este app está bloqueado" pela conta `dev.viniciusdamas@gmail.com`. Causa provavel: politica de seguranca do Google pra contas pessoais Gmail restringindo OAuth de scope sensiveis em apps nao verificados pelo proprio usuario.

2. **Service Account com JSON key** — bloqueado por org policy `iam.disableServiceAccountKeyCreation` aplicada na organizacao do project `project-7275f091-4a92-490a-a31`. Mensagem: "A criacao da chave da conta de servico esta desativada... Uma politica da organizacao que bloqueia a criacao de chaves de conta de servico foi aplicada". Numero rastreamento: c1701437246311677.

**Estado atual:**
- ✅ pipx 1.11.1 instalado em `c:\Users\Vine\` via `python -m pip install --user pipx`
- ✅ gcloud CLI 556.0.0 ja presente
- ✅ Python 3.14 ja presente
- ❌ Service Account criada mas SEM key gerada (politica bloqueia)
- ❌ ADC nao configurado

**Caminhos pra desbloquear (escolher um):**

1. **Workload Identity Federation (recomendado pelo Google)** — bypassa keys de SA. Configura federacao entre identidade externa (GitHub Actions, AWS, Azure) e o GCP. Nao serve pra dev local porem. Skip pra esse caso.

2. **Pedir admin GCP desativar `iam.disableServiceAccountKeyCreation` temporariamente** — preciso identificar quem e admin do project (provavelmente nao e o Vinicius). Liga em `gcloud organizations list` + `gcloud organizations get-iam-policy ORG_ID` pra ver. Risco: politica existe por seguranca, desativar deixa org vulneravel.

3. **Criar projeto GCP pessoal sem org policy** — Vinicius cria projeto novo numa conta sem org (ou sob conta pessoal Gmail). Ai cria SA + key sem restricao. Aponta o SA email como Viewer no GA4. Caminho mais autonomo, nao depende de admin externo.

4. **Criar OAuth client custom no GCP (Desktop app)** — mesmo padrao que o GSC MCP usa em `c:\Users\Vine\mcp-gsc\client_secrets.json`. Registra o app no GCP, baixa client_secrets.json, roda `gcloud auth application-default login --client-id-file=...`. Client custom pode bypassar o "app bloqueado" se for verificado pelo proprio Vinicius como dono. Mais rapido se o caminho 3 nao rolar.

5. **Compartilhar dados do GA4 com Bruno fazendo o setup la dele** — Bruno (admin do GA4) cria o SA na conta dele/Avantti, gera key, manda pro Vinicius. Risco: depende do Bruno, e se Avantti tem mesma org policy, mesmo bloqueio.

**Recomendacao quando retomar:** caminho **3 (projeto pessoal)** ou **4 (OAuth client custom)**. Ambos sao 100% autonomos do Vinicius.

**Por enquanto, fallback:** Vinicius manda manualmente prints/CSVs do GA4 pro chat quando precisar dos dados. Funciona, so e mais lento.

**Referencias:**
- MCP oficial: github.com/googleanalytics/google-analytics-mcp
- Doc Google: developers.google.com/analytics/devguides/MCP

### 10.3 — Primeiro Relatorio Baseline
- [x] Executar `/project:seo-report` apos configurar OAuth
- [ ] Executar `/project:seo-audit` completo
- [x] Salvar relatorios em `docs/seo-reports/`
- [x] Documentar metricas iniciais (baseline) para comparacao futura — `docs/seo-reports/2026-04-23-baseline.md`

### 10.4 — Monitoramento Continuo
- [ ] Configurar agente agendado: relatorio semanal toda segunda-feira
- [ ] Configurar agente agendado: auditoria completa todo dia 1 do mes
- [ ] Configurar alertas: notificar se metrica cair >20%

### 10.5 — Proxy de Imagens pra Google Images [DESCOBERTO 23/04/2026, RECALIBRADO 03/05/2026]
> CDN da Loft/Vista (cdn.vistahost.com.br) bloqueia TODOS os crawlers via
> robots.txt "Disallow: /". Resultado: 0 imagens dos imoveis indexadas no
> Google Images. Canal de descoberta visual fechado.
>
> **Fix imediato (aplicado commit 72e9b5b):** remover `<image:image>` tags
> do sitemap — limpa 1187 warnings do GSC. Nao resolve indexacao, so limpa
> ruido. Zero perda porque imagens ja nao indexavam.
>
> **Audit + research em 03/05/2026** confirmou que sem proxy a indexacao
> de imagens e matematicamente impossivel. Mas o ROI tambem foi
> recalibrado pra baixo: lift realista de 5-15% em trafego em 6 meses,
> com lift de leads bem menor (2-5%) por causa do gap browsing → WhatsApp.
> Concorrentes locais (Razzi, Apolar) tambem nao fazem isso — pode ser
> vantagem competitiva ou pode ser que nao compensa pra ninguem.
>
> **Plano original (Vercel `/api/img`) foi superado.** Nova proposta usa
> Cloudflare Worker em subdomain `img.fymoob.com.br` por 3 motivos:
> (1) custo zero de banda Vercel (Worker free tier 100k req/dia, sobra),
> (2) cache + robots.txt independentes do app Next, (3) reversivel em
> minutos se houver problema.
>
> **Prioridade:** MEDIA (Fase 19.P3). Primeiro vem cobertura de CRM e
> landings programaticas — leverage maior. Esta task entra em 4-6
> semanas a partir de 03/05/2026.

#### Sequencia recomendada (audit 03/05/2026)

- [ ] **Passo 1 — Definir baseline mensuravel ANTES de qualquer mudanca.**
      Tirar screenshot/export do GSC > "Image search appearance"
      (provavelmente esta em ~zero). Sem isso, nao tem como medir lift
      depois (cai no MEASURE-BEFORE-CLAIM).

- [ ] **Passo 2 — Migrar `image: "string"` → `image: [array]` no JSON-LD
      sem proxy** (URLs Vistahost mesmo). Esforco ~1h. Google nao indexa
      a imagem (CDN bloqueia), mas valida que o formato do schema esta
      correto. Diff de payload < 1.5KB. Smoke: Rich Results Test em 3
      paginas, sem novos warnings.
  - Mexer em `generatePropertySchema` (`src/lib/seo.ts:198-263`).
  - Usar `[fotoDestaque, ...filterPropertyPhotos(property.fotos)].slice(0, 5)`.
  - Cap de 5 fotos (sweet spot — rich card aceita, sem inflar payload).
  - **NAO** mexer em `generateItemListSchema` (cards de listagem com
    50 itens × 5 fotos inflam +32KB por pagina; manter singular).

- [ ] **Passo 3 — Medir 30 dias.** Validar zero degradacao em GSC (sem
      novos warnings de schema). Se houver regressao, reverter.

- [ ] **Passo 4 — Implementar Cloudflare Worker proxy** em
      `img.fymoob.com.br`. Esforco 2-3h.
  - Worker recebe `?src=<cdn-vistahost-url>`, valida whitelist (so
    `cdn.vistahost.com.br`), fetcha imagem, devolve com cache.
  - Headers: `Cache-Control: public, max-age=2678400, immutable` (31
    dias, recomendacao oficial Google) + ETag.
  - Tamanho maximo: 4MB (limite pratico de Worker free tier).
  - Robots.txt em `img.fymoob.com.br` permite Googlebot-Image
    explicitamente.
  - Atualizar `generatePropertySchema` pra reescrever URLs Vistahost
    em URLs do proxy.

- [ ] **Passo 5 — Reabilitar `<image:image>` no sitemap shard 0** com
      URLs do proxy. Codigo de fonte ja existe
      (`getAllPropertySitemapData` em `src/services/loft.ts:1009-1018`,
      ja retorna `fotos.slice(0, 5)`). Esforco ~15min.

- [ ] **Passo 6 — Medir 90 dias.** Meta: pelo menos **200 impressoes/mes
      em GSC > Image search appearance** pra considerar sucesso. Se nao
      atingir, reavaliar (talvez nicho imobiliario CWB nao recompensa).

#### Contexto do audit

- **Audit completo em 03/05/2026** (subagent Plan + Perplexity research)
  confirmou que toda a UI usa `getPropertyImage()` direto sobre Property
  e nenhum consumer le `propertySchema.image`. Mexer no schema NAO
  quebra cards, hero, comparador ou OG image.
- **Risco zero de quebrar exibicao existente.** Schema e write-only via
  `safeJsonLd` em `src/app/imovel/[slug]/page.tsx:137-160`.
- **Custo controlado.** Cloudflare Worker 100k req/dia gratis. Vercel
  banda nao impactada.
- **Performance neutra.** ISR cache 1h ja amortiza payload do schema.
  LCP nao muda (priority image segue isolada do JSON-LD).
- **Nao mexer em BlogPosting/Article antes de Property.** Property e o
  caso de negocio prioritario (Reserva Barigui style cards). Blog
  schema com array de imagens inline demanda extracao do BlockNote —
  refator paralelo, baixa prioridade.

**Esforco total revisado:** ~4-5h (1h schema array + 2-3h Cloudflare
Worker + 30min sitemap + smoke tests).

**Impacto esperado revisado (mais conservador):** lift 5-15% em
trafego organico em 6 meses, lift 2-5% em leads. Real estate brasileiro
em queda de CTR (-3.98pp em Q2/2025 por causa de AI Overviews). Imagens
ajudam a roubar atencao mas nao revertem a tendencia macro.

**Decisao final do audit:** fazer, mas em sequencia ordenada e com
metricas mensuraveis. Nao priorizar acima de cobertura de CRM ou
landings programaticas restantes.

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

> **Status:** ✅ **CONCLUÍDA 25/04/2026** — 15/15 posts reescritos seguindo
> FYMOOB Research Protocol v1.0. Todos publicados, validados em build
> local (589 páginas estáticas), zero endosso nominal de construtora.
>
> Pipeline final maduro: 4-7 agents pesquisa em paralelo + Pre-Verifier
> + Writer + Final YMYL Verifier. Variantes testadas: 5-agent (Posts 3-9),
> 6-agent com Pre-Verifier (Posts 12-13, 15), 7-agent com Legal Specialist
> (Post 14 risco jurídico).
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
| 6 | melhores-bairros-curitiba-2026 | **ALTA** | ✅ | "Melhores Bairros de Curitiba 2026: Ranking por Perfil" (52) — publicado 24/04. Ahú lidera score composto (80pts), ranking multi-critério com 4 perfis (família, jovem, aposentado, investidor), seção "3 bairros pra repensar" (diferencial vs 100% dos concorrentes). Research Protocol v1.0 aplicado desde o brief. |
| 7 | batel-vs-agua-verde-curitiba | **ALTA** | ✅ | "Batel vs Água Verde em Curitiba: Qual Escolher em 2026" (54) — publicado 24/04. 12 eixos comparativos, 4 vereditos por perfil (família + DINK + investidor + aposentado), seção "quando os 2 empatam" (diferencial editorial único). Dado de ouro: Batel 57% unidades >150m² vs Água Verde 23%. |
| 8 | quanto-custa-morar-batel-curitiba | **ALTA** | ✅ | "Quanto Custa Morar no Batel (Curitiba) em 2026" (46) — publicado 24/04. 3 cenários com soma completa (solteiro R$ 7.600, casal R$ 22.500, família R$ 44.000), 9 rubricas detalhadas, comparativo honesto vs Pinheiros (Batel é mais barato) + 4 mitos desmentidos + custo invisível (+30-40% sobre planilha). |
| 9 | ecoville-vs-bigorrilho-curitiba | **ALTA** | ✅ | "Ecoville vs Bigorrilho: Qual Bairro Escolher em 2026" (51) — publicado 24/04. Decomposição Ecoville em 3 mercados (apto usado R$ 9.430, apto novo R$ 16.863, casa condomínio R$ 16.800-25.000) com técnica "Separação Declarada". 4 vereditos por perfil. 4 mitos desmentidos (UP, migração, +17%). |
| 10 | custo-de-vida-curitiba | **ALTA** | ✅ | "Custo de Vida em Curitiba 2026: R$ 3.200 a R$ 22.000" (53) — publicado 25/04 com 6-agent team (Macro/Local/FYMOOB Data/SEO/Pre-Verifier/Final-Verifier). 28/30 claims confirmados em fontes Tier 1. Hooks únicos: cesta DIEESE-CWB R$ 769,61 (-12,9% vs SP), IPVA-PR 1,9% Lei 21.951/2024 (era 3,5%), URBS R$ 6 congelada desde 2023, custo do INVERNO (chuveiro +35%, P13 R$ 109,99), comparativo Curitiba × Belo Horizonte. 8 erros do post antigo eliminados. SM 2026 R$ 1.621 (não R$ 1.518), família-4 DIEESE R$ 7.067 (NT 289). |
| 11 | checklist-compra-imovel | **ALTA** | ✅ | "Checklist: o item esquecido que custa R$ 80 mil" (51) — publicado 24/04. 25 itens em 5 fases cronológicas. Adiciona propter rem condomínio (art. 1.345 CC + STJ REsp 1.345.331/RS). 3 ajustes numéricos (registro 1%, avaliação R$ 2.800-4.500, regra 30% parcela). Cenário R$ 80k ancorado com conta explícita. |
| 12 | documentos-comprar-imovel-curitiba | **ALTA** | ✅ | "Documentos pra Comprar Imóvel em Curitiba: Guia Completo 2026" — publicado 24/04 com 5-agent team adaptado (Legal + Structure + Writer + SEO + YMYL). Organização única por 5 órgãos emissores (vs "por parte" dos concorrentes). Hook: Certidão Negativa de Imóveis da Prefeitura ≠ IPTU pago (trava escritura). 4 erros factuais corrigidos pelo Verifier: 9 Ofícios (não 8), nome oficial do documento-âncora, e-Notariado opcional, base legal LGPD é execução de contrato. Tabela completa dos 9 ofícios com endereço + telefone. |
| 13 | melhores-bairros-familias-curitiba | **ALTA** | ✅ | "Melhores Bairros de Curitiba para Famílias 2026" (48) — publicado 25/04 com 6-agent team (Education+Safety / Lifestyle / FYMOOB Data / SEO / Pre-Verifier / Final-Verifier). 13 claims numéricos confirmados Tier 1. Hooks únicos: 3.444 fila CMEI (Tatuquara 822, CIC 757), Cajuru top 1 IDEB mas 6º mais perigoso, distância Pequeno Príncipe→Bacacheri 15-25 min (não 10), Lei 16.492/2025 vale-creche R$ 1.000/mês, Lei cadeirinha NÃO se aplica a Uber/táxi. 7 endereços de instituições corrigidos (Pequeno Príncipe=Água Verde, Sion=Batel, Positivo=CIC, MON=Centro Cívico, Bom Jesus DP=Ahú, Marista=São Lourenço, Militar=Tarumã). Anti-canibalização vs Post 6: família-only com 5 critérios + 5 perfis-idade + 4 faixas orçamento. |
| 14 | imovel-planta-vs-pronto-curitiba | **ALTA** | ✅ | "Planta ou Pronto em Curitiba: Guia de Decisão 2026" (51) — publicado 25/04 com 7-agent team (Macro + Local + FYMOOB Data + SEO + **Legal Specialist** + Pre-Verifier + Final-Verifier). 28/28 claims numéricos confirmados Tier 1. Hooks únicos: INCC-DI 5,86% mar/2026 (FGV), spread INVERTIDO em CWB (Cidade Industrial planta +24,2%, Portão -9,6%), NBR 17170:2022 garantias por subsistema (5/3/1 anos, NÃO "5 genérico"), Lei 13.786/2018 distrato + STJ tensão 3ª vs 4ª Turma não pacificada, LC 150/2025 + Decreto 421/2026 (R$ 163 mi, ITBI 1-2% até 2032). **ZERO endosso nominal de construtora** (Thá em RJ 2019-2026 R$ 350 mi confirmou risco). Substituiu lista nominal por seção "Como verificar construtora em 5 passos". |
| 15 | apartamento-ou-casa-curitiba | **MÉDIA** | ✅ | "Casa ou Apartamento em Curitiba? 60% Mora em Casa" (50) — publicado 25/04 com 6-agent team (Macro + Local + FYMOOB Data + SEO + Pre-Verifier + Final-Verifier). 13/13 claims numéricos top confirmados Tier 1. Hooks únicos: IBGE PNAD 2026 (60% casas / 40% aptos CWB), aptos +96,79% em 22 anos vs casas +18,02%, FipeZap CWB R$ 11.621/m² +6,52% em 2025, FYMOOB CRM (apto R$ 13.043/m² vs casa avulsa R$ 4.732/m²), spread Portão casa +42% sobre apto, Loft condomínio mediano R$ 587. Pre-Verifier corrigiu 3 erros: STJ é mai/2019 (não 2026), Lei do Silêncio 2026 NÃO sancionada (Lei 10.625/2002 é base), Lei Lili 16.674/2026 regula espaços públicos (não condomínios). |

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
