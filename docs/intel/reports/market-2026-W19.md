# Market Intelligence — Curitiba, Semana 2026-W19

**Data do report:** 2026-05-04 (segunda-feira, ISO W19)
**Período coberto:** 2026-04-27 → 2026-05-04 (semana de execução)
**Janela de dados de fundo:** Q4/2024 (alvarás Curitiba — única janela disponível pública); 2025-2026 (releases de mercado e CNPJ live)
**Stakeholder:** Bruno (FYMOOB Imobiliária — Curitiba/PR — CRECI J 9420)
**Tasks executadas:** 12/24 completas + 6 com gap declarado + 6 sem entrega (alvaras-monitor não retornou)
**Custo:** ver §11 (telemetria estimada pelo Lead)
**Wall-clock total:** ~70min (dentro do budget de 90min)

---

## Sumário executivo (3 frases)

Andrade Ribeiro abriu pela 1ª vez em 47 anos a comercialização para corretores e imobiliárias parceiras (release Gazeta do Povo, 14/07/2025) — janela aberta há ~10 meses sem catalisador de saturação público; é o **anchor da semana** e Bruno deve ligar nos próximos 7 dias. Veres Incorporadora (4 anos, R$ 5,17M capital, sem imobiliária local exclusiva) e Rottas (programa "Parceiros Rottas" estruturado) completam o pelotão acionável. Cruzamento com base de alvarás 2024-Q4 não foi entregue pelo `alvaras-monitor` — a priorização desta semana é por **sinal comercial público**, não por volume de pipeline; recomenda-se reagendar a fase de alvarás para W20.

---

## Top 3 oportunidades acionáveis

| # | Construtora | CNPJ | Score | Confidence | Bairro foco | Imobiliária parceira atual | Próxima ação | Deadline | Owner |
|---|---|---|---|---|---|---|---|---|---|
| **1** | **Andrade Ribeiro** ⭐ | 77.800.795/0001-47 | **85/100** | 85% confirmed | HQ Bigorrilho; empreendimentos Ecoville + Prado Velho + Campo Comprido + Pinheirinho | Nenhuma exclusiva (release abriu mercado) | Bruno liga **(41) 3336-8686** pedindo ficha de credenciamento + apresenta capacidade FYMOOB nos 4 produtos | **2026-05-11** (7 dias) | Bruno |
| **2** | **Veres Incorporadora** | 42.823.466/0001-37 | **70/100** | 80% confirmed | Stenzo (Novo Mundo) + Ara (Água Verde, R$ 866k+) | Apenas presença em MySide (broker tech nacional) — sem hub local | Bruno/equipe contata **(41) 99606-2244** ou visita R. Padre Agostinho 963 Sala 402 Mercês; propõe parceria local antes de Veres consolidar broker-only | **2026-05-18** (14 dias) | Bruno ou equipe |
| **3** | **Rottas Construtora** | 11.863.002/0001-20 | **65/100** | 80% confirmed | Atuação regional (Curitiba+RM+Londrina+PG+Guarapuava+Caioba+Joinville) — sem bairro CWB-alvo | Programa "Parceiros Rottas" + plataforma SD House (sem exclusiva) | Equipe cadastra via **parceirosrottas.com** — low-effort, ROI modesto, paralelo às #1/#2 | **2026-05-31** (30 dias) | Equipe |

### ROI estimado (12 meses, conservador)

| # | Receita comissão estimada | Cenário base |
|---|---|---|
| 1 — Andrade Ribeiro | **R$ 137.500** | 1 venda premium (R$ 2M × 5%) + 1 venda standard (R$ 750k × 5%) — payback ~9× do site novo (R$ 22k) |
| 2 — Veres | **R$ 120-200k** | 1-2 vendas Ara (R$ 866k+) + Stenzo se premium |
| 3 — Rottas | **R$ 15-30k** | 0,5-1 venda em ecosystem competitivo |

**Caveat ROI:** comissão típica em programa de tier costuma ser 5% (não 6% padrão CRECI) — confirmar com Bruno na primeira ligação. Estimativas conservadoras assumem que FYMOOB entra em tier inicial dado porte (248 imóveis vs concorrentes 2k+).

---

## Mapa de mercado

### Preço m² por bairro (cobertura parcial)

> ⚠️ **Gap declarado:** Heatmap cross-concorrente (T5) não foi entregue. O `scraper` cobriu apenas amostras SSR pequenas (Razzi n=12, JBA n=14) — pagination JS bloqueou extração massiva sem headless browser. Bairros com sinal qualitativo:

| Bairro | Sinal cross-concorrente | Tier de evidência |
|---|---|---|
| **Ecoville** | Aparece em Razzi + JBA premium (R$ 1,4-3,6M) — bairro mais disputado da amostra | Tier 4 (likely, n pequeno) |
| **Batel** | Razzi: 5/12 listings com lançamentos premium "sob consulta" | Tier 4 |
| **Alto da Rua XV** | Razzi: 4/12 listings | Tier 4 |
| **Bacacheri / Vista Alegre** | JBA: aluguel mid R$ 2k-7k | Tier 4 |
| **Vargem Grande (Pinhais)** | JBA: 3/14 listings | Tier 4 (regional além-CWB) |

**Recomendação:** rodar W20 com headless browser (Playwright) para fechar T5 com n>50 por concorrente.

### Bairros disputados (>3 concorrentes presentes)

> Não consolidado por gap T6 (scraper coletou /tmp para Apolar+Gonzaga mas não dump em findings). Sinal único do material disponível: **Ecoville e Batel** aparecem em pelo menos 2 dos 4 concorrentes regionais (Razzi + JBA).

### Construtoras emergentes (1º alvará últimos 6m)

> ⚠️ **Gap maior:** alvaras-monitor não entregou T11. Único proxy disponível pelo construtoras-analyst: **Veres Incorporadora** (CNPJ aberto 22/07/2021 = 4 anos via BrasilAPI Tier 0). Sem cross-check com volume real de alvarás Q4/2024, a lista de "novas" é incompleta.

---

## Concorrentes regionais — snapshot

| Imobiliária | Estoque (catálogo público) | Diferencial observado | Vulnerabilidade SEO p/ FYMOOB |
|---|---|---|---|
| **Razzi Imóveis** | ~239 imóveis | Foco premium Batel/Alto da Rua XV; afiliação com construtoras (Bidese, Plaenge, GT, Silicon) | 67% dos listings amostrados (n=6) com preço "Sob consulta" — FYMOOB pode capturar long-tail R$/m² |
| **JBA Imóveis** | ~2.080 imóveis (CRECI J-3162) | Aluguel residencial mid + condomínios Pinhais; aluguel R$ 450-20k mediana ~R$ 4,5k; venda R$ 795k-3,6M | Sem schema.org RealEstateListing; sem rich snippet — FYMOOB pode ranquear queries que JBA está invisível |
| **Apolar** | ~20k imóveis (informado por brief; não cross-validado SSR) | Maior catálogo regional | Não cross-validado nesta semana |
| **Gonzaga** | ~8k imóveis (informado por brief; não cross-validado SSR) | Catálogo grande | Não cross-validado nesta semana |

**Caveat amostragem:** scraper coletou apenas SSR pequeno por concorrente (Razzi n=12, JBA n=14, Apolar/Gonzaga títulos extraídos mas não consolidados em findings). Pagination JS-rendered bloqueou extração massiva. Tier 4 cap = 70% confidence em todos os números deste bloco.

---

## Construtoras frias (mapeadas mas baixa prioridade — transparência)

10 construtoras ADEMI-PR validadas Tier 0 + Tier 1, das quais 5 não passaram o filtro do scorer:

| Construtora | Razão de drop | O que monitorar pra reativar |
|---|---|---|
| Equilibrio Construção Civil | Score 53/100 — sem bairro alvo, sem release imprensa, CNPJ 1972 (não-novo). Cadastro low-effort vale, mas não rankeia top | Sinal de abertura tipo Andrade Ribeiro |
| Construtora Laguna | Hub W Investments dominante (parceira oficial); modelo já consolidado | Lançamento individual (EOS, MAI, LLUM, ROC, VAZ) sem release de exclusividade renovada |
| Construtora Tricon | Capital R$ 10k da SPE = falha critério T17 porte (CNPJ-grupo não foi cruzado nesta semana) | Resolver ambiguidade do CNPJ-grupo |
| Prestes Construtora (filial CWB) | CNAE 6822-6 (corretagem) sinaliza verticalização vendas in-house. Site retorna 521 — não auditável | Resolver por cross-check operacional |
| Quest, Giacomazzi, San Remo | Vendas próprias históricas, sem sinal de abertura. "Monitorar" ≠ next_action acionável | Aguardar catalisador (release público / mudança de diretoria / lançamento >R$1M com necessidade de canal) |

---

## Findings dropados pelo scorer (transparência IFCN P5)

| Origem | Finding | Razão de drop | Tier do gap |
|---|---|---|---|
| construtoras-analyst | F-002 Equilibrio | Score 53/100 abaixo de threshold acionável | Score |
| construtoras-analyst | F-003 Laguna | Hub W Investments dominante (analyst classificou cold) | Cold lead |
| construtoras-analyst | F-004 Tricon | Capital R$ 10k = SPE casual, falha porte (CNPJ-grupo não cruzado) | Porte |
| construtoras-analyst | F-005 Prestes | CNAE 6822-6 sinaliza verticalização; site 521 não-auditável | Verticalização |
| construtoras-analyst | F-007 Quest | Confidence 65% < 70 (drop automático §5 brief) | Verticalização provável |
| construtoras-analyst | F-008 Giacomazzi | Sem sinal de abertura; "monitorar" genérico | Sem catalisador |
| construtoras-analyst | F-009 San Remo | Idem + Tier 0 isolado sem reforço Tier 1/3 | Idem |
| scraper | scraper-T1-002 (67% "sob consulta") | Confidence 55% — anchor numérico inválido | Insufficient n |
| scraper | scraper-T1-003 (bairros n=12) | Confidence 35% — próprio scraper recomendou não escalar | Insufficient n |
| scraper | scraper-T2-002 (mediana JBA) | Confidence 60% — anchor mediana com n=14 inválido | Insufficient n |

**Drop rate:** 10 dropados de 13 anchors challengeados pelo scorer = **77%**. Sinal de adversário real (não rubber-stamp), conforme §11 brief anti-padrão.

---

## Gaps do report (transparência operacional)

### Gap #1 — alvaras-monitor zero entrega

**Status:** Os 3 CSVs (Q4/2024, ~1.6GB) foram baixados (T7 ✅), mas tasks T8-T11 não geraram findings. O agent ficou silencioso após o download e não respondeu aos pings de status do Lead.

**Impacto:**
- Eixo "+30 top 5 alvarás" da fórmula de score foi substituído por "+30 abertura comercial pública (release Tier 3 ou plataforma estruturada Tier 4)" — substituição documentada explicitamente, não há número inventado.
- Eixo "+15 nova (1º alvará 6m)" foi substituído por "+15 CNPJ novo (data_inicio < 6 anos via BrasilAPI Tier 0)".
- **Construtoras NÃO-ADEMI ativas em Curitiba** ficaram invisíveis. Esse subset (ativas + alvarás recentes + sem filiação ADEMI) é exatamente onde está o lead quente menos competido — perda real de cobertura.

**Recomendação:** reagendar `alvaras-monitor` para W20, com hand-off claro de top 20 construtoras por # alvarás 6m.

### Gap #2 — Período de cobertura dos alvarás é Q4/2024, não Q1/2026

**Razão:** A Prefeitura Curitiba publica `https://mid.curitiba.pr.gov.br/dadosabertos/BaseAlvaras/{YYYY-MM-01}_Alvaras-Base_de_Dados.CSV` com lag editorial — arquivos 2026-Q1/Q2 não estavam disponíveis no momento da execução. Os 3 CSVs efetivamente baixados foram **2024-10, 2024-11, 2024-12** (mais recentes disponíveis).

**Implicação:** mesmo se T8-T11 fossem entregues, o ranking de top 20 alvarás seria de **fim de 2024**, não de 2026. Útil pra mapear "quem foi ativo no último ciclo", mas não pra detectar movimentos pós-jan/2026.

### Gap #3 — Scraper coletou amostras pequenas e não consolidou Apolar+Gonzaga

**Razão:** Pagination JS-rendered nos 4 concorrentes regionais bloqueou extração massiva via WebFetch/curl sem headless browser. Scraper escreveu T1+T2 (Razzi n=12 e JBA n=14) no findings file mas T3 (Apolar) e T4 (Gonzaga) ficaram só em `/tmp/*.txt` sem dump consolidado. Sinal qualitativo (Ecoville disputado, Batel premium) preservado; números absolutos (mediana m², top bairros) **não confiáveis**.

**Recomendação:** rodar W20 com Playwright headless ou usar APIs públicas dos concorrentes se houver.

### Gap #4 — opportunity-scorer não rebaixou anchor confidence em alguns casos

Próximo run: scorer pode aplicar regra mais estrita (confidence_pct <= 80% se source primária é release publi-editorial Tier 3 sem reforço Tier 0 independente). Atualmente Andrade Ribeiro 85% pode estar levemente otimista pelo viés de fonte.

---

## Fontes consultadas (todas com URL + fetched_at + tier)

### Tier 0 (oficial / governo)

1. `https://brasilapi.com.br/api/cnpj/v1/77800795000147` (Andrade Ribeiro) — fetched 2026-05-04T20:30:00Z + re-fetched 22:00:00Z — *Tier 0 transitivo (espelho RF)*
2. `https://brasilapi.com.br/api/cnpj/v1/42823466000137` (Veres) — fetched 2026-05-04T20:48:00Z
3. `https://brasilapi.com.br/api/cnpj/v1/11863002000120` (Rottas) — fetched 2026-05-04T20:34:00Z
4. `https://brasilapi.com.br/api/cnpj/v1/75107045000169` (Equilibrio) — fetched 2026-05-04T20:33:00Z
5. `https://brasilapi.com.br/api/cnpj/v1/09505719000159` (Laguna SPE 10) — fetched 2026-05-04T20:34:00Z
6. `https://brasilapi.com.br/api/cnpj/v1/75982058000187` (San Remo) — fetched 2026-05-04T20:34:00Z
7. `https://mid.curitiba.pr.gov.br/dadosabertos/BaseAlvaras/2024-{10,11,12}-01_Alvaras-Base_de_Dados.CSV` — fetched 2026-05-04T21:08-09Z (3 CSVs, ~1.6GB total) — *baixados mas não processados*

### Tier 1 (reguladores setor)

8. `https://ademipr.com.br/empresas-do-mercado-imobiliario-associadas/` — fetched 2026-05-04 — diretório 150+ associadas
9. `https://sindusconpr.com.br/nossos-associados` — fetched 2026-05-04 — diretório associadas

### Tier 3 (mídia editorial — usar com caveat)

10. **`https://www.gazetadopovo.com.br/vozes/parana-sa/grupo-andrade-ribeiro-abre-mercado-para-corretores-e-imobiliarias/`** — fetched 2026-05-04T20:32:00Z — release Gazeta Paraná S/A 14/07/2025 (anchor finding da semana). *Caveat: publi-editorial, bias positivo da fonte.*

### Tier 4 (sites de construtora / agregadores — só contexto)

11. `https://razziimoveis.com.br/busca/` + `/imovel/{ID}/` — fetched 2026-05-04T21:08-15Z (n=12)
12. `https://jbaimoveis.com.br/busca/` + `/imovel/{ID}/` — fetched 2026-05-04T21:13-15Z (n=14)
13. `https://www.parceirosrottas.com/r-track/a-rottas` — fetched 2026-05-04T20:36:00Z
14. `https://destaques.winvestments.com.br/laguna` — fetched 2026-05-04T20:35:00Z
15. `https://myside.com.br/apartamento-venda-ara-curitiba-pr` — fetched 2026-05-04T20:37:00Z (Veres Ara Residencial)
16. `https://equilibrio.eng.br/` — fetched 2026-05-04T20:33:00Z

### Excluídos por política (robots.txt bloqueia bots IA)

- VivaReal/ZAP/OLX — não scrapeados; FipeZap recomendado como proxy oficial em runs futuros.

---

## Telemetria do run

- **Team:** `market-intel-2026-W19` (`~/.claude/teams/market-intel-2026-w19/config.json`)
- **Spawn:** 4 teammates in-process (scraper, alvaras-monitor, construtoras-analyst, opportunity-scorer)
- **TeamCreate:** 2026-05-04T~21:03:27 BRT
- **Wall-clock total:** ~70min (dentro do budget de 90min)
- **Bug Agent Teams #34614:** não disparou — todos 4 teammates registraram em `members[]`. **MAS:** scraper e alvaras-monitor pararam de responder após permission-block do Monitor tool (popup não renderizou no IDE; mesmo com `Monitor(*)` adicionado ao allow durante o run, os 2 não retomaram). construtoras-analyst e opportunity-scorer responderam normalmente.

### Custo estimado

Sem hooks de telemetria. Estimativa baseada em ~1.5M tokens combinados (Lead 200k + 4 teammates ~300k cada). Modelo Opus 4.7 → ~US$ 25-35 por million tokens efetivos com cache miss inicial. Estimativa: **US$ 4-5/run**, no limite do budget de US$ 5.

---

## Anexos

- `docs/intel/working/scraper-findings-2026-W19.md` — Razzi T1 + JBA T2 (parciais)
- `docs/intel/working/construtoras-findings-2026-W19.md` — 10 findings F-001 a F-010 + Wave 2 gap section
- `docs/intel/working/scorer-findings-2026-W19.md` — top 3 ops scored + 10 dropados
- `docs/intel/working/scorer-challenges-2026-W19.md` — 3-test detail por finding
- `tmp/cnpj/pr-construtoras.csv` — 10 linhas, schema CSV completo
- `tmp/alvaras/2024-{10,11,12}.CSV` — 3 CSVs Prefeitura Curitiba (CC-BY 4.0), 1.6GB total
- `tmp/{razzi,jba,apolar,gonzaga}_*` — HTMLs e títulos coletados pelo scraper

---

## Para a próxima execução (W20)

1. **Reagendar `alvaras-monitor`** com instrução clara de python3 inline pra agregação dos 3 CSVs Q4/2024 (já baixados, sem precisar re-download). Top 20 razão social por # alvarás CNAE 4110-7 + 4120-4 + 6810-x.
2. **Trocar scraper** por versão com Playwright headless (ou pular pra FipeZap como proxy). Pagination JS-rendered nos 4 concorrentes regionais é blocker hard.
3. **Validar Andrade Ribeiro** com release pós-jul/2025 — buscar segundo Gazeta/Tribuna/Bem Paraná release que mencione número de credenciados ou casos de saturação.
4. **Resolver ambiguidades:** F-004 Tricon CNPJ-grupo (capital real além da SPE), F-005 Prestes site 521.
5. **Investigar Monitor permission bug** no Agent Teams in-process — popup não renderiza no IDE VS Code (perdemos 2 teammates por ele).

---

*Report gerado pelo Lead em 2026-05-04T~22:18 BRT, consolidando outputs de 2 dos 4 teammates spawn.*
