# Technical Feasibility — Upgrade Pesquisa FYMOOB

> Avaliação do Infrastructure & Technical Feasibility Specialist sobre as 3 opções
> de upgrade (A Pragmático / B Avançado / C Top Tier) do protocolo de pesquisa
> dos blog posts da FYMOOB. Data: 23/04/2026.

---

## 1. Inventário de MCPs + ferramentas disponíveis

### 1.1 MCP servers configurados no projeto (`.mcp.json`)

| Servidor | Status | Comando | O que faz | Custo |
|---|---|---|---|---|
| **gsc** | ✅ Ativo | `c:\Users\Vine\mcp-gsc\...` (Python venv local) | Google Search Console — 18 ferramentas: `get_search_analytics`, `inspect_url_enhanced`, `batch_url_inspection`, `get_performance_overview`, `check_indexing_issues`, `compare_search_periods`, `get_search_by_page_query`, sitemap mgmt. Settings allow-list atualmente cobre apenas 3 delas — resto exige approval. | Gratuito (OAuth + quota GSC padrão: 1200 queries/min) |
| **playwright** | ✅ Ativo (via `npx @playwright/mcp@latest`) | `cmd /c npx ...` | Navegação, screenshots, DOM evaluate, network requests, scraping de JS-rendered pages. 26 tools. | Gratuito (local browser) |

### 1.2 MCP / extensions **NÃO** instalados mas referenciados por skills

| Ferramenta | Skill que depende | Status real | O que faria |
|---|---|---|---|
| **DataForSEO MCP** | `seo-dataforseo`, `seo-backlinks` | ❌ NÃO instalado | Volume de busca ao vivo, SERP Google/Bing, difficulty, keyword intent, backlinks, AI visibility (ChatGPT/LLM). Skills `seo-*` já têm prompts que assumem MCP presente, mas chamada real falharia. |
| **Firecrawl MCP** | `seo-firecrawl` | ❌ NÃO instalado | Crawl de site inteiro, mapa, JS rendering, broken links. |
| **nanobanana-mcp (Gemini)** | `seo-image-gen` | ❌ NÃO instalado | Geração de OG/hero images. |
| **Google PageSpeed/CrUX/Indexing API** | `seo-google` | ⚠️ Parcial | GSC ok via mcp-gsc; PageSpeed/CrUX exige setup separado. |

### 1.3 Skills (slash commands/agents) disponíveis

| Skill | Tipo | O que faz | Relevante pra pesquisa blog? |
|---|---|---|---|
| `loft-api` | Reference | Doc completa da API Loft/Vista com 271 campos de imóvel, 117 endpoints swagger, exemplos reais. | ★★★ essencial |
| `seo-audit` / `seo-fix` / `seo-report` | FYMOOB-specific | Auditoria, correção e relatório semanal do site próprio. | ★ (foco é o site, não pesquisa de posts) |
| `seo-dataforseo` | Infra MCP | Docs de como usar MCP — **requer extensão instalada**. | ★★★ se instalar |
| `seo-google` | Infra MCP | GSC + PageSpeed + CrUX — usa mcp-gsc. | ★★ (métricas do site, não pesquisa externa) |
| `seo-geo` / `seo-content` / `seo-page` / `seo-plan` / `seo-schema` / `seo-sitemap` / `seo-technical` / `seo-local` / `seo-maps` / `seo-programmatic` / `seo-images` / `seo-competitor-pages` / `seo-hreflang` | SEO tooling | Análises pontuais. | ★ |
| `seo-firecrawl` | Infra MCP | **Requer extensão.** Crawl competitor pages. | ★★ se instalar |
| `seo-image-gen` | Infra MCP | **Requer extensão banana.** Gera OG images. | ★ (já usamos Claude Design) |
| `frontend-design` | Reference | Design system FYMOOB. | — |
| `claude-api` | Dev | Prompt caching, migração SDK. | — |
| `checkpoint` / `resume` / `new-page` | Workflow | Gestão de sessão e criação de páginas. | — |

### 1.4 Ferramentas core do harness (sempre disponíveis)

| Tool | Uso em pesquisa blog |
|---|---|
| `WebFetch` | Gov.br, STJ, BCB, SERP snippets estáticos, relatórios PDF. **Permission allow-list atual cobre:** `fymoob.com`, `developers.google.com`, `github.com`, `raw.githubusercontent.com`, `localhost`, `demo-blue-beta`, `lilachbullock.com`. Domínios como `dadosabertos.curitiba.pr.gov.br`, `ippuc.org.br`, `bcb.gov.br`, `fipezap.org.br` não estão e **solicitarão approval por request** (fluxo aceitável, mas gera fricção). |
| `WebSearch` | Google search genérico sem SERP structured data. |
| `Bash` / `Read` / `Write` / `Edit` / `Glob` / `Grep` | Base. |
| `playwright__*` (MCP) | Scraping de páginas com JS (Quinto Andar Index, Loft Data dashboard). |

### 1.5 Scripts já existentes no projeto (reusáveis)

Em `scripts/` existem 15 arquivos prontos pra Loft API (ver abaixo) — **toda arquitetura necessária pra Opção B já está parcialmente pronta**, só falta agregação/derivação pro uso editorial:

| Script | Utilidade |
|---|---|
| `list-recent-leads.mjs` / `list-latest-all-leads.mjs` / `find-my-lead.mjs` | Já conversam com `/clientes/listar` — reuso direto pra qualquer agregação sobre leads. |
| `discover-lead-endpoints.mjs` / `explore-clientes-endpoint.mjs` / `explore-clientes-fields.mjs` | Padrão de probing da API — base pra qualquer novo script. |
| `count-dual-price-properties.mjs` / `debug-dual-property.mjs` / `debug-missing-photos.mjs` | Exemplos de iteração paginada em `/imoveis/listar` com filtros custom. |
| `export-titles-audit.mjs` | Padrão de export CSV/MD — reusar pro dashboard. |
| `vista-api-spec.json` | **Spec OpenAPI de 117 endpoints** — fonte da verdade pra descobrir novos recursos sem chutar. |
| `smoke-test.mjs` | CI pós-deploy — pode ser o template pra "reconciliação semanal de dados" (agendado via GitHub Actions). |

### 1.6 Hooks de segurança já ativos

`.claude/settings.local.json` tem hook `PreToolUse` pra Bash que **bloqueia qualquer `curl/wget/fetch` que mencione `DELETE|PUT|PATCH` + `vistahost|loft`**. A regra absoluta do CLAUDE.md ("nunca DELETE/PUT/POST destrutivo na API Loft") está enforced a nível de máquina — qualquer agent novo herda a proteção.

---

## 2. Avaliação A/B/C

### Opção A — Pragmático

**Escopo:** adicionar agent dedicado "Loft + Dados Abertos" ao team de 5; ativar MCP `seo-dataforseo` no SEO specialist; agents consomem FipeZap / Quinto Andar direto via WebFetch/playwright.

| Dimensão | Avaliação |
|---|---|
| **Esforço implementação** | 3-5 h (criar prompt do novo agent + instalar DataForSEO MCP + liberar domínios no settings.local). |
| **Complexidade** | Baixa. Não cria código novo — só orquestração de agents. |
| **Dependências** | (1) Chave DataForSEO (pago — ~USD 30-60/mês no plano inicial). (2) Expandir allow-list de domínios WebFetch. (3) Exemplos de query Loft embutidos no prompt do agent. |
| **Manutenção** | Baixa — só manter prompts e renovar chave DataForSEO. |
| **Risco** | (1) DataForSEO custa dinheiro contínuo — se Bruno não aprova, skill vira mocked. (2) FipeZap não tem API pública; scraping direto pode quebrar silenciosamente (selector mudou = agent retorna vazio). (3) Agent "Loft" sem cache central pode duplicar requests em cada post (~250 imóveis × N posts/semana). |
| **Ganho qualidade dado (1-10)** | **7** — DataForSEO legitima volume/SERP real; dados Loft tiram do post "estimativa genérica" pra "catálogo FYMOOB como prova". |
| **Ganho autoridade conteúdo (1-10)** | **7** — "Segundo nossos 234 imóveis ativos em Curitiba" > "Segundo o mercado" em E-E-A-T. |

**Veredito:** **execução imediata viável**. Custo baixo, ganho claro.

---

### Opção B — Avançado

**Escopo:** construir scripts dedicados pra análise da API Loft agregada (yield por bairro, valorização real, liquidez), salvos em `docs/research/` como JSON/MD versionados. Dashboard interno opcional (página admin em Next.js). Agents consomem os arquivos gerados, não chamam API direto.

| Dimensão | Avaliação |
|---|---|
| **Esforço implementação** | 15-25 h. Scripts individuais: `calculate-yield-by-bairro.mjs` (3h), `calculate-valorization.mjs` (4-6h — precisa snapshots históricos pra derivar variação), `liquidity-by-type.mjs` (2h), `price-distribution-by-bairro.mjs` (2h), dashboard admin (8-12h opcional). |
| **Complexidade** | Média. Agregação é trivial; **valorização real ("imóvel relistado com preço diferente") depende de ter snapshots históricos** — hoje só temos estado presente do CRM. Precisa criar primeiro um cron (GitHub Action diário) que salva snapshot JSON em `docs/research/snapshots/YYYY-MM-DD.json`. Só a partir de ~30 dias de snapshots dá pra calcular variação confiável. |
| **Dependências** | (1) Sistema de snapshots históricos (não existe). (2) GitHub Action agendada diária (trivial, mas nova). (3) Convenção de onde salvar JSON e como agents leem. (4) Opção A já implementada (DataForSEO) — senão SEO specialist fica cego. |
| **Manutenção** | Média. Scripts quebram se schema Loft muda (já vi isso no incidente 16/04). Snapshot histórico cresce indefinidamente — precisa política de retenção (ex: manter diário por 90d, semanal por 2 anos). |
| **Risco** | (1) "Valorização" só é confiável com ≥90 dias de snapshot — ganho real só aparece em julho/26. (2) Com 249 imóveis, muitos bairros têm <5 imóveis = amostra insuficiente pra qualquer média — precisa guard rail `n < 10 → "amostra insuficiente"`. (3) Se agent escrever "Mercês valorizou 12% segundo FYMOOB" com 3 imóveis, vira YMYL errado. |
| **Ganho qualidade dado (1-10)** | **9** — dados proprietários exclusivos da FYMOOB viram diferenciação competitiva real. Nenhum concorrente em CWB tem isso. |
| **Ganho autoridade conteúdo (1-10)** | **9** — E-E-A-T "Experience" concreto (catálogo próprio analisado), citável em Google AI Overviews como primary source. |

**Veredito:** **ganho máximo no longo prazo, mas requer bootstrap de 30-90 dias de snapshots antes do primeiro uso editorial confiável**.

---

### Opção C — Top Tier

**Escopo:** construir um MCP dedicado `fymoob-crm` (servidor Python ou Node) que expõe tools específicas: `get_yield_by_bairro`, `get_price_trend`, `get_inventory_snapshot`, `search_properties_by_criteria`. Agents invocam via `mcp__fymoob-crm__*` sem nunca tocar a API direto.

| Dimensão | Avaliação |
|---|---|
| **Esforço implementação** | 40-70 h. Criar MCP server (Python com FastMCP ~15-20h), definir schemas, implementar cada tool (20-30h total), testes E2E (5h), empacotamento + config `.mcp.json` (3-5h), hardening (rate limit, cache, logs, auth key de projeto ≠ LOFT_API_KEY — 5h). |
| **Complexidade** | Alta. MCP protocol exige server spec rigoroso. Error handling, cancellation, logging, versionamento de tool schemas — tudo precisa ser certo. |
| **Dependências** | (1) Snapshots históricos (igual B). (2) Host pra rodar MCP (local funciona, mas compartilhar entre agents em sessões diferentes exige server remoto ou npm package próprio). (3) Política clara de refresh de cache. (4) Provavelmente Redis/SQLite local pra persistir snapshots se volume crescer. |
| **Manutenção** | Alta. Cada novo campo que o time editorial quer = mudança de schema + deploy do MCP + atualização do allow-list. Regressão silenciosa: se MCP crashar no meio de uma query, agent pode não perceber. |
| **Risco** | (1) **Over-engineering flagrante** pra um caso de uso de 15 posts. ROI negativo se time editorial não cresce pra 50+ posts/mês. (2) MCP é tech relativamente nova — padrões de operação (observability, CI) ainda imaturos. (3) Refator de API Loft obriga refator de MCP. |
| **Ganho qualidade dado (1-10)** | **9.5** (vs 9 da B — ganho marginal é padronização e reuso em outros projetos). |
| **Ganho autoridade conteúdo (1-10)** | **9** (idem B — autoridade vem dos dados, não do transport layer). |

**Veredito:** **over-engineering pra o problema atual**. Só faz sentido se (a) time editorial escalar para >50 posts/mês ou (b) surgir um segundo projeto Loft onde o MCP é reusável.

---

## 3. API Loft — o que dá pra fazer HOJE

### 3.1 Endpoints relevantes (confirmados no skill loft-api)

| Pergunta editorial | Endpoint | Viabilidade |
|---|---|---|
| "Quantos apartamentos no Batel FYMOOB tem?" | `GET /imoveis/listar?filter={Categoria:"Apartamento",BairroComercial:"Batel",ExibirNoSite:"Sim"}` | ✅ Trivial. 1 request. |
| "Preço médio/m² por bairro" | `GET /imoveis/listar` com fields `ValorVenda, AreaPrivativa, BairroComercial`, agrega em memória | ✅ `getBairroMarketStats()` **já existe** em `src/services/loft.ts` linha 728 — reusar. |
| "Yield (aluguel/venda)" no mesmo bairro | Endpoint já retorna `ValorVenda` **E** `ValorLocacao` pra imóveis dual. Filtrar por `Finalidade="Venda e Aluguel"`, calcular `ValorLocacao * 12 / ValorVenda`. | ⚠️ Catálogo FYMOOB tem **poucos imóveis dual por bairro** (maioria é venda-only). Yield sobre amostra de 2-3 imóveis/bairro = estatística ruim. **Mitigação:** calcular apenas pra bairros com n≥10 imóveis dual; senão usar média bairro-venda ÷ média bairro-aluguel (menos preciso mas n maior). |
| "Valorização real" (imóvel relistado) | Campos `DataCadastro`, `DataAtualizacao`. **Não existe histórico de ValorVenda** — API só expõe preço atual. | ❌ Impossível sem snapshots históricos próprios (ver Opção B bootstrap). |
| "Liquidez (tempo no mercado)" | `DataCadastro` + status "Vendido"/"Alugado". | ⚠️ Status "Vendido" sai do `ExibirNoSite=Sim` — imóvel some antes de medir. Precisa requisição sem filtro + flag que hoje **não temos permissão confirmada** de ler todos status. Validar com probe. |
| "Lançamentos vs usados" | `Lancamento: "Sim"`, `AnoConstrucao` | ✅ Direto. |
| "Faixa de preço por quartos" | `Dormitorios` + `ValorVenda` | ✅ `precoMedioPorQuartos` **já calculado** em `getBairroMarketStats()`. |
| "Caractes/infra mais comuns por bairro" | `Caracteristicas`, `InfraEstrutura` (objects aninhados) | ✅ `getAllCaracteristicas()` já existe. |

### 3.2 Limites técnicos

- **Paginação:** 50 por request. Catálogo ~249 → 5 pages = 5 requests.
- **Auth:** `LOFT_API_KEY` em `.env.local`. Scripts já carregam via `loadEnvLocal()` helper (ver `list-recent-leads.mjs`).
- **Timeout:** 10s por request (retry 2x) — herdado do padrão em `loft.ts`.
- **Cache:** `next/cache` com `revalidate: 900s` (15min) no site — não afeta scripts externos.
- **Rate limit:** **não documentado**. Scripts paralelos no projeto fazem 5 requests em paralelo sem 429 — margem confortável.
- **Campos não expostos na nossa key:** `/corretores/listar` retorna 401. Dados internos (propostas, comissões) também 401 — sem risco.

### 3.3 Cálculos que dão pra fazer HOJE (sem snapshot histórico)

| Cálculo | Fonte | Accuracy |
|---|---|---|
| Preço médio venda por bairro/tipo | `ValorVenda` agregado | ★★★ (catálogo próprio) |
| Preço médio/m² por bairro | `ValorVenda / AreaPrivativa` | ★★★ |
| Dispersão de preço (P10, P50, P90) | percentile agregação | ★★★ (útil pra "faixas") |
| Yield médio por bairro | dual properties apenas | ★ a ★★ (n baixo) |
| Ticket médio por nº quartos | agregação por `Dormitorios` | ★★ |
| Top bairros com mais estoque FYMOOB | contagem | ★★★ |
| Features mais caras (ex: piscina aumenta ticket em X%?) | regressão simples Caract × ValorVenda | ★★ (n baixo por feature + confundidores) |
| Ofertas com preço "a combinar" vs com preço | flag `ValorACombinar` | ★★★ (benchmark transparência) |

### 3.4 Cálculos que **precisam** snapshot histórico (Opção B pré-requisito)

- Valorização real (Δ% preço mesmo imóvel ao longo do tempo)
- Tempo médio de venda (dias entre cadastro → saída do `ExibirNoSite`)
- Sazonalidade (volume cadastrado por mês)
- Churn de estoque

---

## 4. Acesso direto a FipeZap / Quinto Andar / Loft Data

### 4.1 FipeZap

- **API pública?** ❌ Não. Endpoint público é um dashboard React em `fipezap.com.br`.
- **Relatório PDF mensal?** ✅ `https://www.fipezap.com.br/pdf/...` — publicado dia 1º de cada mês. Nome segue padrão.
- **Viabilidade WebFetch?** ✅ Domínio precisa entrar no allow-list. Agente pede, busca PDF, parseia tabelas.
- **Viabilidade playwright?** ✅ Dashboard interativo (filtro por cidade/bairro) — playwright pode navegar e extrair.
- **Dado granularidade:** cidade (Curitiba), não bairro. Pra bairro, FipeZap só expõe em PDF mensal + Zap subsidiária (QuintoAndar Data) tem mais granular.

### 4.2 Quinto Andar Data / Quinto Andar Index

- **API pública?** ❌ Não. Blog `blog.quintoandar.com.br` tem relatórios mensais de aluguel + índice QA.
- **Relatórios baixáveis?** ✅ PDF e blog posts com tabelas. Dado é **apenas aluguel** (QA não faz venda em CWB). Cobertura CWB: limitada mas crescente.
- **Viabilidade:** WebFetch em blog posts recentes + playwright se tabela JS.
- **Risco:** conteúdo vem com license pra reprodução; citação + link canônico obrigatório pra não virar plágio de dado.

### 4.3 Loft Data (blog.loft.com.br)

- **Status:** Loft descontinuou a operação brasileira em 2023. Blog ficou online até ~2024. **Dados de mercado são desatualizados** (>1 ano).
- **Veredito:** ❌ Não usar como fonte viva. Só serve pra contexto histórico narrativo ("em 2022, Loft reportou X").

### 4.4 Outras fontes brasileiras não exploradas

| Fonte | API? | Viável? |
|---|---|---|
| **Secovi-PR** (Sindicato Imobiliário) | Dashboard + relatórios PDF mensais | ✅ WebFetch + parse de PDF. CWB-specific. **Muito autoritativo** pra YMYL. |
| **CRECI-PR** | Portal + relatórios trimestrais | ✅ WebFetch. Menos granular que Secovi. |
| **Sinduscon-PR** | CUB mensal | ✅ Planilha Excel publicada — WebFetch + parse. Já usamos em posts existentes. |
| **BCB (Banco Central)** | ✅ API SGS pública (`api.bcb.gov.br/dados/serie/bcdata.sgs.XXXXX/dados`) | ✅ Referência pra SELIC, taxas médias de crédito imobiliário. Usar em qualquer post de financiamento. **Zero fricção.** |
| **IBGE SIDRA** | ✅ API pública | ✅ População CWB, renda média, IPCA. Dado censitário autoritativo. |
| **Abrainc-FipeZap** | Relatório PDF mensal | ✅ WebFetch. Segmento lançamentos, bom pra posts de MCMV/financiamento. |

---

## 5. Dados abertos Curitiba — inventário

### 5.1 Portal Dados Abertos Curitiba (`dadosabertos.curitiba.pr.gov.br`)

- **Tecnologia:** CKAN (padrão brasileiro de open data). Expõe API REST `/api/3/action/*`.
- **Datasets relevantes** (descoberta via busca no portal — validar via WebFetch em sessão live):
  - **ITBI Curitiba** — arrecadação mensal por tipo de imóvel. CSV mensal.
  - **IPTU cadastro** — base de imóveis com valor venal (referência pro "preço oficial").
  - **Alvarás de construção** — lançamentos em pipeline (preditivo).
  - **Mobilidade** — extensão ciclovia, novas estações, linhas de ônibus por bairro.
  - **Segurança pública** — boletins de ocorrência por bairro (trimestral).
  - **Demografia CENSO 2022** — renda, idade, domicílios.
- **Formato:** CSV, JSON via CKAN, às vezes XLSX.
- **API:** endpoints `package_list`, `package_show?id=...`, `datastore_search?resource_id=...`.
- **Status allow-list:** precisa adicionar `dadosabertos.curitiba.pr.gov.br` em `settings.local.json`.

### 5.2 IPPUC (Instituto de Pesquisa e Planejamento Urbano de Curitiba)

- **Site:** `ippuc.org.br`
- **Oferece:** shapefile dos bairros oficiais, zoneamento, macrozonas, **Lei 16.361/2024** (Potencial Construtivo Adicional — usado no post de mercado 23/04).
- **Formato:** PDF + shapefile GIS.
- **Viabilidade:** WebFetch de PDF, mas estudos profundos (ex: densidade demográfica por bairro) exigem parse manual.

### 5.3 SESP-PR (Secretaria Estadual de Segurança do Paraná)

- **Site:** `sesp.pr.gov.br/dados-abertos`
- **Oferece:** estatísticas mensais de criminalidade por município + em alguns casos por bairro (Curitiba tem detalhamento maior).
- **Formato:** planilha Excel mensal.
- **Uso editorial:** posts tipo "bairros mais seguros de Curitiba", "segurança no Bacacheri" etc. — **diferenciação local forte**.

### 5.4 Prefeitura de Curitiba — Secretaria de Finanças

- **Portal Transparência:** `transparencia.curitiba.pr.gov.br`
- **Oferece:** arrecadação ITBI/IPTU mensal, gráficos trimestrais.
- **Uso editorial:** post ITBI já usa. Expandir pra "arrecadação ITBI Curitiba = barômetro do mercado".

### 5.5 Portal da Transparência Federal + STN

- `portaldatransparencia.gov.br` + `tesouro.fazenda.gov.br`
- FGTS (saques MCMV), SBPE (poupança), programas federais de habitação.

---

## 6. Recomendação final

**Híbrido A → A+B faseado.** Implementar A agora (curto prazo), iniciar bootstrap de B em paralelo (snapshots diários), ativar B progressivamente conforme snapshot ganha densidade. **C descartado** como over-engineering pro estágio atual.

### Por quê

1. **A entrega ganho editorial imediato** sem débito técnico. DataForSEO + agent Loft + allow-list de fontes abertas são 3-5h de trabalho total.
2. **B requer 30-90 dias de snapshot histórico pra valorização confiável** — começar HOJE é crítico. Sem o bootstrap, mesmo se Bruno pedir em julho, a resposta será "precisamos de 3 meses mais".
3. **Snapshots são praticamente gratuitos** — GitHub Action rodando 1x/dia, gravando ~500 KB JSON gzipped em `docs/research/snapshots/`. Ao final de 90d = 45 MB, ok pro git.
4. **C não muda autoridade do conteúdo** (ganho autoridade é IDÊNTICO entre B e C). O que varia é transport layer. Se algum dia a FYMOOB tiver equipe editorial externa usando Claude Code em outros projetos, aí sim revisar C.

### Critérios de sucesso

| Métrica | Baseline (antes) | Meta (após 30d) |
|---|---|---|
| Posts com dado proprietário FYMOOB citado | 0/5 | 5/5 em posts Curitiba-local |
| Posts com volume de busca validado por DataForSEO | 0/5 | 5/5 |
| Fontes primárias Curitiba (dados abertos, IPPUC, Secovi-PR) por post | 0-1 | 3+ |
| Posts citando FipeZap/QA via scraping direto (não 3ª parte) | 0 | 3+ |
| Backlinks ganhos em 90d (proxy de autoridade) | — | +5 naturais |
| Posição média das 15 queries primárias no GSC | — (medir agora) | +3 posições médias |

---

## 7. Roadmap de implementação

### Semana 1 (24-30/04/2026) — bootstrap A + preparar B

**Dia 1 (24/04)**
- [ ] Instalar DataForSEO MCP (conta + chave + `.mcp.json`). Custo ~USD 30-60/mês.
- [ ] Adicionar domínios no `settings.local.json` allow-list: `dadosabertos.curitiba.pr.gov.br`, `ippuc.org.br`, `sesp.pr.gov.br`, `secovi-pr.com.br`, `bcb.gov.br`, `api.bcb.gov.br`, `sidra.ibge.gov.br`, `fipezap.com.br`, `blog.quintoandar.com.br`, `sinduscon-pr.com.br`, `transparencia.curitiba.pr.gov.br`, `portaldatransparencia.gov.br`.
- [ ] Escrever prompt do novo agent "Loft + Dados Abertos" como arquivo em `.claude/agents/research-fymoob-data.md`. Template: recebe `{post_topic, bairro?}`, retorna dados FYMOOB + dados abertos relevantes. **Usa `scripts/` existentes como exemplos.**
- [ ] Atualizar briefings de posts pra incluir slot "Dados FYMOOB" e "Dados Abertos CWB".

**Dia 2-3 (25-26/04)**
- [ ] Escrever script `scripts/snapshot-crm-daily.mjs` — clona estado completo do catálogo (tudo que `/imoveis/listar` expõe) em `docs/research/snapshots/YYYY-MM-DD.json.gz`.
- [ ] Criar GitHub Action `.github/workflows/snapshot-crm.yml` — cron diário 03:00 BRT, commit automático.
- [ ] Documentar em `docs/research/snapshots/README.md` política de retenção (diário 90d → semanal 1 ano → mensal ad eternum).
- [ ] Primeiro snapshot commitado (dia zero de B).

**Dia 4-5 (27-28/04)**
- [ ] Rodar agent novo com post piloto (reescrever 1 dos 10 pendentes usando o protocolo upgradado).
- [ ] Comparar output vs 5 já reescritos. Avaliar ganho qualitativo.
- [ ] Iterar prompt do agent.

### Semana 2-4 (maio/26) — refinar A

- [ ] Escrever scripts de agregação que leem snapshot mais recente (não precisa histórico ainda): `scripts/research/yield-by-bairro.mjs`, `price-dist-by-bairro.mjs`, `inventory-stats.mjs`.
- [ ] Cada script gera output MD legível pra agent consumir em `docs/research/output/YYYY-MM/`.
- [ ] Reescrever posts 6-10 usando protocolo completo.

### Semana 5-12 (maio-julho/26) — ativar B

- [ ] Ao atingir 30 dias de snapshot: ativar `valorization-by-bairro.mjs` como experimental. Guard rail: só reporta se amostra ≥10 imóveis relistados naquele bairro.
- [ ] 60 dias: ativar "tempo médio no mercado" (imóveis que saíram do catálogo).
- [ ] 90 dias: publicar primeiro relatório interno "FYMOOB Market Index" — virar asset editorial recorrente (backlink magnet).

### Trimestre 2 (após 90d) — decidir sobre C

- [ ] Com B estabilizado, reavaliar se MCP dedicado traz retorno. Critério: se time editorial >20 posts/mês e/ou surgir segundo projeto Loft, investir.

---

## Referências cruzadas

- [`docs/seo/article-rewrite-learnings.md`](./article-rewrite-learnings.md) — lições dos 5 posts reescritos
- [`docs/seo/writer-briefs/`](./writer-briefs/) — briefs estruturados
- [`.claude/skills/loft-api/SKILL.md`](../../.claude/skills/loft-api/SKILL.md) — referência API Loft
- [`src/services/loft.ts`](../../src/services/loft.ts) — `getBairroMarketStats()` já pronto
- [`scripts/vista-api-spec.json`](../../scripts/vista-api-spec.json) — spec OpenAPI completo
- [`docs/crm/loft-vista-constraints.md`](../crm/loft-vista-constraints.md) — restrições conhecidas
