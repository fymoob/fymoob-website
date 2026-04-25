# Pesquisa FYMOOB Data — Apartamento vs Casa em Curitiba

**Post alvo:** [`content/blog/apartamento-ou-casa-curitiba.mdx`](../../content/blog/apartamento-ou-casa-curitiba.mdx)
**Categoria:** YMYL Money — decisão patrimonial alta (R$ 200 mil – R$ 8 mi).
**Data da pesquisa:** 2026-04-25
**Fonte primária:** [`docs/research/snapshots/2026-04-25.json`](snapshots/2026-04-25.json) (snapshot único, schema 1.0).
**Script:** [`scripts/research/analyze-apto-vs-casa.mjs`](../../scripts/research/analyze-apto-vs-casa.mjs)
**Protocolo:** FYMOOB Research Protocol v1.0 — Tier 1 (dados primários do CRM). Volumes anonimizados por orientação Bruno: mediana, faixa, % e ranking — **nunca** "FYMOOB tem N imóveis no bairro X" (cautela competitiva).

> **NÃO é o post final.** Aqui só os dados que o estoque FYMOOB sustenta com evidência. Writer interpreta.

---

## 0. Resumo executivo (TL;DR)

1. **Tipologia FYMOOB Curitiba:** apartamento é maioria absoluta (53,3 % do estoque com `valor_venda`), seguido de sobrado (29,4 %). Casa térrea pura é raríssima na FYMOOB (só 2,8 %); o que o usuário chama de "casa em Curitiba" é, no estoque, **majoritariamente sobrado**.
2. **Mediana apto R$ 899 mil × mediana sobrado R$ 699 mil** — sobrado FYMOOB sai 22 % mais barato em valor absoluto e menos da metade em R$/m² (R$ 5.902/m² vs R$ 13.043/m²). Mas é mix de bairros diferente — **a comparação genérica é enganosa** (ver §6).
3. **Inversão por bairro:** em **Portão**, sobrado/casa custa **42 % MAIS** que apartamento (mediana R$ 990 mil vs R$ 698 mil). Em **Água Verde**, sobrado custa **23 % MENOS** (mediana R$ 1,61 mi vs R$ 2,09 mi). O claim "casa é sempre mais barata" ou "apto é sempre mais barato" não se sustenta — **depende do bairro**.
4. **Bairros 100 % apartamento no estoque FYMOOB** (cobertura zero de sobrado/casa quando há ≥ 5 imóveis): **Bigorrilho, Batel, Centro, Mossunguê (Ecoville), Boa Vista, Cabral, Cristo Rei, Campina do Siqueira**. Bairros majoritariamente casa-conceito: **Sítio Cercado, Campo de Santana, Capão Raso, Fazendinha, São Braz**.
5. **A faixa onde apto e casa empatam:** R$ 300 mil – R$ 1,5 milhão — proporção apto vs casa fica entre 44 % e 50 % cada. Acima de R$ 1,5 milhão, **apto domina** (72 % – 100 %); abaixo de R$ 300 mil, apto também domina (92 %, mas via studio/kitnet).

---

## 1. Fonte e janela

- **Snapshot:** [`docs/research/snapshots/2026-04-25.json`](snapshots/2026-04-25.json), tirado em 2026-04-25T08:38:37 UTC (= 05:38 BRT) (linha 3 do arquivo, `snapshot_time_iso`).
- **Total no snapshot:** 248 imóveis (linha 6, `"total": 248`). 66 bairros distintos (linha 23).
- **Janela de Curitiba:** 231 imóveis (`stats.por_cidade.Curitiba`, linha 14).
- **Universo desta análise:** 214 imóveis em Curitiba com `valor_venda > 0` (filtro do script).
- **Snapshots disponíveis:** 2 — `2026-04-24.json` (242 imóveis) e `2026-04-25.json` (248). Sem série histórica longa pra comparativo de tendência (cron diário começou 2026-04-24).
- **NOTA pro writer:** dados de **locação não foram analisados** neste doc — só 8,3 % do estoque tem `valor_locacao` (ver doc de custo-de-vida §1). Pra "apto vs casa pra alugar", a amostra é fraca; o post deve focar em **comprar**.

---

## 2. Distribuição por categoria — Curitiba c/ valor_venda (n=214)

Calculado com filtro `cidade = "Curitiba"` AND `valor_venda > 0`:

| Categoria | n | % |
|---|---|---|
| **Apartamento** | 114 | 53,3 % |
| **Sobrado** | 63 | 29,4 % |
| Terreno | 11 | 5,1 % |
| Studio | 6 | 2,8 % |
| **Casa** (térrea) | 6 | 2,8 % |
| **Casa em Condomínio** | 6 | 2,8 % |
| Apartamento Duplex | 2 | 0,9 % |
| Sala Comercial | 2 | 0,9 % |
| Cobertura | 1 | 0,5 % |
| Kitnet | 1 | 0,5 % |
| Salas/Conjuntos | 1 | 0,5 % |
| Loja | 1 | 0,5 % |

**Tomada-1 importante (writer leia com cuidado):**
- O CRM separa **Casa** (térrea), **Sobrado** e **Casa em Condomínio**. Pro leitor leigo, "casa" significa qualquer um dos três — e a maior parte do que o curitibano chama de "casa" no mercado FYMOOB é, na verdade, **sobrado** (63 entries vs 6 casa-térrea + 6 casa-em-condo).
- Pro post, recomendo agrupar como **"casa-conceito" = Casa + Sobrado + Casa em Condomínio = 75 imóveis (35 % do estoque CWB c/ venda)**. Senão a contagem absoluta de "casa" (6) é enganosa.
- **Studio (categoria) ≠ Apartamento 1Q ≤ 50 m²:** 6 imóveis estão classificados como `Studio` no CRM, mas há mais 12 apartamentos `categoria = "Apartamento"` com 1 dormitório e área ≤ 50 m² que cumprem perfil studio. **Total real de "studio-perfil" no estoque ≈ 18.** Validar com Bruno se faz sentido tratar essa categoria como bloco separado no post (provável que sim — leitor do post de "apto vs casa" raramente está pensando em studio).

---

## 3. Distribuição por bairro × tipo

> Volumes apresentados aqui pra **uso interno do writer** (calibrar n≥3 antes de publicar mediana). Post final só publica ranking e cobertura, não n absoluto por bairro.

### 3.1 Top bairros — Apartamento (Curitiba c/ venda)

| Bairro | n |
|---|---|
| Mossunguê (Ecoville) | 13 |
| Portão | 11 |
| Bigorrilho | 9 |
| Água Verde | 8 |
| Batel | 7 |
| Cidade Industrial | 6 |
| Campina do Siqueira | 6 |
| Centro | 5 |
| Novo Mundo | 5 |
| Campo Comprido | 4 |
| Boa Vista | 3 |

### 3.2 Top bairros — Sobrado

| Bairro | n |
|---|---|
| Cidade Industrial | 8 |
| Campo de Santana | 7 |
| Capão Raso | 5 |
| Portão | 4 |
| São Braz | 4 |
| Sítio Cercado | 4 |
| Água Verde | 4 |
| Fazendinha | 3 |

### 3.3 Top bairros — Casa térrea

A amostra é minúscula (6 entries totais, 1 por bairro). **Não publicar mediana de "Casa" pura por bairro** — n insuficiente.

| Bairro | n |
|---|---|
| Tatuquara | 1 |
| Bairro Alto | 1 |
| Sitio Cercado | 1 |
| Sítio Cercado | 1 |
| Fazendinha | 1 |
| Santa Felicidade | 1 |

> **⚠️ Limpeza de dados detectada:** o CRM tem **"Sitio Cercado" (sem til, 3 entries no snapshot)** e **"Sítio Cercado" (com til, 11 entries)** como bairros distintos. São o mesmo bairro. Tarefa pro time da FYMOOB normalizar no Loft. O writer deve agregá-los manualmente. Mesmo problema com **"Álto Boqueirão"** (Á maiúsculo com acento errado, 1 entrada — provavelmente "Alto Boqueirão").

### 3.4 Top bairros — Casa em Condomínio

| Bairro | n |
|---|---|
| Sítio Cercado | 2 |
| Alto Boqueirão | 1 |
| Portão | 1 |
| Boqueirão | 1 |
| Cidade Industrial | 1 |

### 3.5 Cobertura por bairro: apto vs casa-conceito

Top 25 bairros do estoque CWB ordenados por volume total. "Casa-conceito" = Casa + Sobrado + Casa em Condomínio.

| Bairro | Total | Apto+Studio+Cob | Casa-conceito | Mistura |
|---|---|---|---|---|
| Portão | 22 | 13 | 5 | misto |
| Mossunguê (Ecoville) | 18 | 16 | 0 | **100 % apto-conceito** |
| Cidade Industrial | 16 | 6 | 9 | misto (casa-conceito predomina) |
| Água Verde | 13 | 9 | 4 | misto |
| Bigorrilho | 9 | 9 | 0 | **100 % apto-conceito** |
| Sítio Cercado | 9 | 2 | 7 | **majoritariamente casa-conceito** |
| Campina do Siqueira | 8 | 6 | 0 | majoritariamente apto |
| Campo de Santana | 8 | 1 | 7 | **majoritariamente casa-conceito** |
| Batel | 7 | 7 | 0 | **100 % apto-conceito** |
| Campo Comprido | 7 | 4 | 2 | misto |
| Centro | 6 | 6 | 0 | **100 % apto-conceito** |
| Tatuquara | 6 | 2 | 4 | majoritariamente casa-conceito |
| Xaxim | 6 | 2 | 3 | misto |
| Novo Mundo | 6 | 5 | 1 | majoritariamente apto |
| Capão Raso | 5 | 0 | 5 | **100 % casa-conceito** |
| Umbará | 4 | 0 | 2 | sem apto |
| Fazendinha | 4 | 0 | 4 | **100 % casa-conceito** |
| São Braz | 4 | 0 | 4 | **100 % casa-conceito** |
| Boa Vista | 3 | 3 | 0 | **100 % apto-conceito** |
| Cabral | 2 | 2 | 0 | só apto |
| Cristo Rei | 2 | 2 | 0 | só apto |

**Observações pro writer:**
- **Bairros 100 % apto-conceito (n ≥ 3):** Mossunguê, Bigorrilho, Batel, Centro, Boa Vista. Cabral e Cristo Rei provavelmente também (n=2 cada). Coerente com vocação verticalizada pós-2010 dessas regiões.
- **Bairros 100 % casa-conceito (n ≥ 3):** Capão Raso, Fazendinha, São Braz. Coerente com perfil periferia-residencial-térrea da zona sul/sudoeste.
- **Bairros mistos onde a comparação faz sentido:** Portão, Cidade Industrial, Água Verde, Tatuquara, Xaxim, Campo Comprido. **Esses são os bairros onde o leitor de Curitiba REALMENTE escolhe entre apto e casa.**
- **"Mossunguê = Ecoville":** o CRM normaliza como Mossunguê. O bairro oficial é Mossunguê, mas o nome de mercado é Ecoville (Mossunguê + parte de Campo Comprido + parte de Campina do Siqueira). Validar tratamento conforme post-9 (ecoville-vs-bigorrilho).

---

## 4. Faixa de preço por tipo (Curitiba c/ venda)

### 4.1 Tabela mestre

| Tipo | n | Mediana valor | Faixa de valor | Mediana m² priv. | Mediana R$/m² |
|---|---|---|---|---|---|
| **Apartamento** | 114 | **R$ 899 mil** | R$ 155k – R$ 7,82 mi | 81 m² | R$ 13.043 |
| Sobrado | 63 | **R$ 699 mil** | R$ 330k – R$ 1,87 mi | 107 m² | R$ 5.902 |
| Casa térrea | 6 | R$ 490 mil | R$ 220k – R$ 1,89 mi | 122 m² | R$ 4.732 |
| Casa em Condomínio | 6 | R$ 510 mil | R$ 390k – R$ 973 mil | 70,6 m² | R$ 6.636 |
| **Casa-conceito agregado** (Casa+Sobrado+CondoCasa, n=75) | 75 | **R$ 699 mil** | R$ 220k – R$ 1,89 mi | 105 m² | R$ 5.866 |
| Studio | 6 | R$ 314 mil | R$ 199k – R$ 838k | 25,5 m² | R$ 13.633 |

### 4.2 Insight de área

- **Casa-conceito tem +24 m² de área privativa mediana** que apto (105 vs 81 m²).
- **R$/m² apto = 2,2× R$/m² casa-conceito** (R$ 13.043 vs R$ 5.866). Ou seja: o leitor que compara R$/m² puro acha que casa é "metade do preço". Mas apto inclui infra de condomínio (lazer, segurança, manutenção) e bairros mais centrais — não é comparação like-for-like.
- **Studio tem R$/m² maior que apto comum** (R$ 13.633 vs R$ 13.043). Coerente com mercado: quanto menor a área, maior o R$/m² (efeito de "diluição de custos fixos" da unidade).

### 4.3 Distribuição de dormitórios

| Tipo | 1Q | 2Q | 3Q | 4Q+ |
|---|---|---|---|---|
| Apartamento | 13 | 45 | 50 | 4 |
| Casa-conceito | — | 11 | 57 | 7 |

**Tomada:** apto FYMOOB é **predominantemente 2-3Q** (83 % do estoque); casa-conceito é **predominantemente 3Q** (76 %). Reforça narrativa de família vs investidor/casal.

### 4.4 Distribuição de vagas

| Tipo | 1V | 2V | 3V+ | sem |
|---|---|---|---|---|
| Apartamento | 54 | 31 | 18 | 11 |
| Casa-conceito | 28 | 41 | 6 | — |

**Tomada:** sobrado/casa entrega **2 vagas como padrão** (54 % do casa-conceito); apto entrega **1 vaga como padrão** (47 %). Diferença real pra família com 2 carros.

### 4.5 Condomínio

- Apto com `valor_condominio` preenchido: **mediana R$ 400/mês** (n=15). **Atenção:** muitos imóveis com `valor_condominio = 0,01` (placeholder fake — ver AP00539 linha 50, AP00650). O dado é **limitado, n pequeno e enviesado para baixo**. Não publicar como "condomínio FYMOOB médio".
- Casa-conceito com condomínio preenchido: mediana R$ 207/mês (n=3) — só faz sentido pra Casa em Condomínio.
- **Recomendação pro writer:** usar referência externa (ABADI, Secovi-PR) pra condomínio típico em Curitiba (R$ 400-1.500/mês dependendo do padrão). Não usar mediana FYMOOB neste campo.

---

## 5. Comparativo por faixa de orçamento (Curitiba c/ venda)

| Faixa | n total na faixa | n apto-conceito | n casa-conceito | n studio | % apto | % casa |
|---|---|---|---|---|---|---|
| **< R$ 300k** | 13 | 12 | 1 | 2 | **92,3 %** | 7,7 % |
| **R$ 300-500k** | 48 | 21 | 24 | 2 | 43,8 % | **50,0 %** |
| **R$ 500-800k** | 49 | 23 | 21 | 1 | 46,9 % | 42,9 % |
| **R$ 800k-1,5M** | 53 | 24 | 25 | 1 | 45,3 % | 47,2 % |
| **R$ 1,5-3M** | 32 | 23 | 4 | 0 | **71,9 %** | 12,5 % |
| **R$ 3M+** | 19 | 19 | 0 | 0 | **100 %** | 0 % |

**Observações pro writer (insights únicos):**
- **A "zona neutra" onde apto e casa empatam é R$ 300 mil – R$ 1,5 milhão.** Nessa faixa, a escolha é genuinamente sobre estilo de vida (apto = praticidade, casa = espaço), não sobre preço.
- **Acima de R$ 1,5 milhão, casa some.** Apenas 4 entries de casa-conceito acima de R$ 1,5 mi (as três casas Água Verde com sobrado de luxo + 1 casa de R$ 1,89 mi em Santa Felicidade). Acima de R$ 3 mi, **só apto** — alto-padrão FYMOOB é 100 % vertical.
- **Abaixo de R$ 300 mil, casa também some** (só 1 case — CA00096 em Tatuquara R$ 220 mil + 1 sobrado em Tatuquara). O mercado de entrada FYMOOB é dominado por apto pequeno/studio. Quem quer casa < R$ 300k provavelmente está fora do estoque FYMOOB (mercado popular periferia, MCMV faixa 1-2).

---

## 6. Spread apto vs casa MESMO bairro (n ≥ 3 em CADA tipo)

Critério rigoroso: bairro precisa de n ≥ 3 apto E n ≥ 3 casa-conceito pra publicar mediana comparativa. Apenas **3 bairros** atendem. Aqui o post pode falar com confiança:

| Bairro | Apto n | Apto mediana | Apto R$/m² | Casa-conceito n | Casa mediana | Casa R$/m² | Spread casa-vs-apto |
|---|---|---|---|---|---|---|---|
| **Água Verde** | 8 | R$ 2,09 mi | R$ 17.613 | 4 | R$ 1,61 mi | R$ 6.378 | **−23 %** (casa mais barata) |
| **Portão** | 11 | R$ 698 mil | R$ 12.136 | 5 | R$ 990 mil | R$ 6.526 | **+42 %** (casa mais cara) |
| **Cidade Industrial** | 6 | R$ 480 mil | R$ 8.179 | 9 | R$ 450 mil | R$ 5.557 | −6 % (praticamente empate) |

**Insights únicos pro post:**

1. **Em Portão, a casa custa 42 % MAIS que o apartamento na FYMOOB.** Mediana sobrado R$ 990k contra apto R$ 698k. Por quê? Porque o portfólio de apto em Portão tem muito 1-2Q novo entrando (Portão é bairro de novidade vertical pós-2020, com lançamentos compactos), enquanto sobrado em Portão é tipologicamente 3Q + 2 vagas em terreno consolidado — produto naturalmente mais caro. **Quebra a narrativa popular "casa em Portão é mais barata".**

2. **Em Água Verde, casa custa 23 % MENOS.** Mediana sobrado R$ 1,61 mi vs apto R$ 2,09 mi. Apto Água Verde é alto-padrão consolidado (R$ 17.613/m² é o quarto mais caro do estoque); sobrado pega quem busca 260+ m² e privacidade no mesmo bairro por menos.

3. **Em Cidade Industrial, é empate.** O leitor pode escolher livremente entre os dois sem impacto material no orçamento.

4. **Em todos os 3 bairros, R$/m² da casa-conceito é metade ou menos do apto.** Casa entrega +24 m² de mediana em troca da escolha de tipologia.

> **Limitação importante:** os outros 60+ bairros não passaram no filtro n ≥ 3 em ambos os lados. Isso significa que pra **maioria dos bairros de Curitiba o leitor NÃO tem comparação like-for-like no estoque FYMOOB** — ou só tem apto (Mossunguê, Batel, Bigorrilho, Centro), ou só tem casa-conceito (Capão Raso, Fazendinha, São Braz). O post deve assumir essa realidade: a escolha "apto ou casa" geralmente também é a escolha "qual bairro".

---

## 7. Tickets de entrada por tipo

### 7.1 Mais barato no estoque (Curitiba)

**Apartamento:**
- `69805503` — Cachoeira — R$ 155.000 — 1Q / 39,36 m² (linha 4926)
- `69804147` — Tatuquara — R$ 220.000 — 2Q 1V / 42 m² (linha 2994)
- `69805137` — Campo de Santana — R$ 230.000 — 2Q 1V / 42 m²

**Casa térrea:**
- `CA00096` — Tatuquara — R$ 220.000 — 2Q 2V / 40 m² (linha 809)
- `69805395` — Sítio Cercado — R$ 385.000 — 2Q 1V / 47 m²
- `69803847` — Fazendinha — R$ 460.000 — 2Q 2V / 104 m²

**Sobrado:**
- `69805527` — Tatuquara — R$ 330.000 — 2Q 2V / 53 m²
- `69805612` — Campo de Santana — R$ 350.000 — 2Q 1V / 62 m²
- `69805507` — Cidade Industrial — R$ 365.000 — 2Q 1V / 67 m²

**Casa em Condomínio:**
- `69802157` — Alto Boqueirão — R$ 390.000 — 3Q 1V / 60 m²
- `69804527` — Sítio Cercado — R$ 440.000 — 3Q 2V / 56 m²
- `69805418` — Cidade Industrial — R$ 470.000 — 2Q 1V

**Studio (categoria):**
- `69805588` — Água Verde — R$ 199.229 — 1Q (linha 5225)
- `69804395` — Portão — R$ 257.920 — 1Q / 23,65 m²
- `69805702` — Cristo Rei — R$ 303.688 — 1Q / 25,52 m²

**Insight pro writer:**
- **Empate no piso entre apto e casa em Tatuquara (R$ 220k).** Mesmo bairro, mesmo preço-piso, escolha pura de tipologia.
- **Studio entra em R$ 199k em Água Verde** — bairro premium. É produto de investidor / primeiro apto de jovem profissional.
- **Pra "primeira casa" abaixo de R$ 400k, a FYMOOB tem oferta principalmente em Tatuquara, Sítio Cercado, Campo de Santana, Cidade Industrial** — todos zona sul/sudoeste, periferia em consolidação.

### 7.2 Tetos por tipo

**Apartamento:**
- `AP00955` — Bigorrilho — R$ 7.817.780 — 3Q 3V / 314 m² (linha 1683)
- `69803405` — Batel — R$ 7.000.000 — 3V / 263 m² (linha 1637)
- `69803825` — Batel — R$ 5.908.026 — 3V / 225 m² (linha 2603)

**Casa térrea:**
- `69805679` — Santa Felicidade — R$ 1.890.000 — 4Q **10V** / 375 m² (linha 5478) ← outlier (10 vagas)

**Sobrado:**
- `69805341` — Água Verde — R$ 1.873.562 — 3Q 2V / 260 m²
- `69805371` — Água Verde — R$ 1.690.288 — 3Q 2V / 265 m²
- `69805342` — Água Verde — R$ 1.533.982 — 3Q 2V / 292 m²

**Casa em Condomínio:**
- `69803237` — Portão — R$ 973.023 — 3Q 2V

**Insight pro writer:** o teto da casa-conceito é R$ 1,87 mi (sobrado Água Verde); o teto do apto é R$ 7,82 mi (Bigorrilho) — **4,2× mais alto**. Curitiba alto-padrão é vertical. Quem quer "mansão" acima de R$ 2 mi sai do mercado FYMOOB ou vai pra condomínios fechados em Pinhais/São José dos Pinhais.

---

## 8. Anti-canibalização vs posts publicados

| # | Post | Sobreposição com este | Cuidado |
|---|---|---|---|
| 5 | preço-metro-quadrado-curitiba-bairro | R$/m² por bairro, **sem distinguir tipo** | Este post DEVE distinguir: apto R$ 13.043/m² vs casa-conceito R$ 5.866/m². **Linkar pro post-5** quando leitor quiser ranking puro de R$/m² por bairro. |
| 6 | melhores-bairros-curitiba-2026 | Top bairros por perfil de comprador | Linkar quando falar "quais bairros são 100 % apto / 100 % casa". |
| 7 | batel-vs-agua-verde-curitiba | Comparativo de 2 bairros premium | Não duplicar dados Batel/Água Verde detalhados. **Linkar** ao tocar Água Verde como case de spread casa-vs-apto. |
| 13 | melhores-bairros-familias-curitiba | Recomendação por bairro pra família | Linkar ao falar "casa pra família vs apto pra família". |
| 14 | imovel-planta-vs-pronto-curitiba | Decisão patrimonial paralela (planta vs pronto) | Linkar como "outra decisão importante: planta ou pronto?" — sub-eixo independente. |

**Linhas editoriais que este post NÃO duplica e DEVE explorar:**
- Spread sobrado vs apto MESMO bairro (post-5 não faz, é R$/m² puro)
- Distinção CRM Casa / Sobrado / Casa em Condomínio (terminologia FYMOOB)
- Cobertura "100 % apto-conceito" vs "100 % casa-conceito" por bairro
- Faixa de orçamento × tipologia (zona neutra R$ 300k-1,5M)

---

## 9. Hooks editoriais únicos (saídos do CRM, não da SERP)

> 5 hooks que **só** este post pode entregar — porque vêm do estoque real FYMOOB, não de copy genérico.

1. **"Em Portão, casa custa 42 % a MAIS que apartamento."** Mediana sobrado/casa-conceito Portão R$ 990 mil; mediana apto R$ 698 mil. Quebra o senso comum "casa em Curitiba é mais barata".

2. **"Em Água Verde, sobrado de 260 m² sai por menos que apto de 130 m² no mesmo bairro."** Mediana sobrado R$ 1,61 mi (260 m² mediana); mediana apto R$ 2,09 mi (130 m² mediana). Casa entrega 2× área por 23 % menos.

3. **"Acima de R$ 1,5 milhão em Curitiba, casa some do estoque."** Apenas 4 imóveis casa-conceito acima desse valor no estoque (3 sobrados Água Verde + 1 outlier Santa Felicidade). Acima de R$ 3 milhões, alto-padrão é 100 % vertical.

4. **"Bairros 100 % apto na FYMOOB: Bigorrilho, Batel, Centro, Mossunguê (Ecoville), Boa Vista."** Bairros 100 % casa-conceito: Capão Raso, Fazendinha, São Braz. Pra esses bairros, "apto ou casa?" não é escolha — é o bairro que decide.

5. **"Tatuquara: o único bairro onde apto e casa empatam no piso (R$ 220 mil)."** Mesmo bairro, mesmo preço de entrada, escolha pura de tipologia. Pra primeiro imóvel < R$ 300 mil, a oferta FYMOOB se concentra na zona sul (Tatuquara, Campo de Santana, Sítio Cercado, Cidade Industrial).

**Hook bônus (mais arriscado, validar com Bruno):**

6. **"Custo total apto vs casa em Portão: o condomínio do apto come o spread de preço em ~7 anos."** Hipótese: apto Portão R$ 698k + condo R$ 600/mês × 12 × 7 = R$ 50.400 acumulado em condo (≈ 7 % do valor do imóvel). Sobrado R$ 990k sem condo. Spread inicial R$ 292k; passados 7 anos, spread "real" cai. **Cuidado:** dados de condomínio FYMOOB são pobres (mediana baseada em n=15 e muitos `0,01` placeholder). Se for usar, basear em referência externa (ABADI/Secovi-PR), não FYMOOB.

---

## 10. Limitações honestas

1. **Snapshot único (2026-04-25).** Existe `2026-04-24.json` mas a janela é 1 dia — sem sazonalidade ou tendência. Não publicar afirmações sobre "movimento do mercado". Apenas estado do estoque hoje.

2. **Casa térrea pura tem n=6 — não publicar mediana por bairro.** Cada bairro tem 1 entrada. Agregar como "casa-conceito" (Casa + Sobrado + Casa em Condomínio) pra ter n estatisticamente válido.

3. **Apenas 3 bairros (Portão, Água Verde, Cidade Industrial) atendem n ≥ 3 em ambos os lados** pra spread direto apto-vs-casa. Pros outros bairros, a comparação é cross-bairro (e portanto cross-perfil), não like-for-like.

4. **`valor_condominio` é dado pobre.** 15 aptos com dado preenchido; vários com `0,01` (placeholder fake — AP00539, AP00650). Mediana FYMOOB de condomínio NÃO é confiável. Usar referência externa pra condomínio típico.

5. **Possíveis distorções de categoria:**
   - "Sítio Cercado" e "Sitio Cercado" (sem til) entram como bairros distintos no CRM. Agregar manualmente.
   - "Álto Boqueirão" (Á maiúsculo com acento) provavelmente é "Alto Boqueirão" — falha de cadastro.
   - 11 imóveis em Curitiba são `Terreno` (5,1 %), não residencial. Excluídos da comparação apto vs casa.
   - 3 imóveis comerciais (Sala Comercial, Salas/Conjuntos, Loja) também excluídos.

6. **Distinção studio:** 6 entries `categoria = "Studio"` + 12 entries `categoria = "Apartamento"` que se encaixam em perfil studio (1Q ≤ 50 m²). Total real ~18. Validar tratamento com Bruno antes de usar contagens absolutas.

7. **Locação não analisada.** Só 8,3 % do estoque tem `valor_locacao`. Pra "apto vs casa pra alugar", a amostra é fraca. Post deve focar em **comprar**, com link pro guia de aluguel separado se houver demanda futura.

8. **`AreaPrivativa` ausente em alguns imóveis** (ex: `69805588` Studio Água Verde sem área no snapshot, linha 5225 onde está `null`). Filtrei via script, mas algumas medianas podem ter n menor que o n declarado da categoria.

9. **CRM tem 1.479 imóveis ativos no Loft (CLAUDE.md baseline) vs 248 no snapshot.** Snapshot é só o subset com `Status = Venda` E `ExibirNoSite = "Sim"`. Não confundir com universo total CWB do mercado.

---

## 11. Snapshot citation

- Arquivo: `docs/research/snapshots/2026-04-25.json`
- Linha 2: `"snapshot_date": "2026-04-25"`
- Linha 3: `"snapshot_time_iso": "2026-04-25T08:38:37.070Z"`
- Linha 6: `"total": 248`
- Linhas 27, 50, 1637, 1683, 2603, 2994, 4926, 5225, 5478: códigos citados nesta pesquisa (AP00296, AP00539, 69803405, AP00955, 69803825, 69804147, 69805503, 69805588, 69805679).

---

**Próximos passos sugeridos pro writer:**
1. Tratar "casa" como casa-conceito agregado, não casa-térrea pura.
2. Estruturar o post em 3 cenários: leitor quer apto (maior parte), leitor quer casa (zona sul), leitor está em dúvida real (Portão / Cidade Industrial / Água Verde / Tatuquara).
3. Hook quantitativo principal: spread em Portão (+42 %) ou inversão Água Verde (−23 %).
4. Linkar posts 5, 6, 7, 13, 14 conforme matriz de §8.
5. NÃO publicar volumes absolutos por bairro — só ranking, mediana, faixa.
