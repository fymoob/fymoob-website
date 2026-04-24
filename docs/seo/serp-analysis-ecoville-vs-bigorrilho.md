# SERP + Internal Linking — Post Ecoville vs Bigorrilho Curitiba

**Autor:** SEO/SERP Specialist (agent)
**Data:** 2026-04-23
**Post analisado:** `content/blog/ecoville-vs-bigorrilho-curitiba.mdx`
**Prioridade:** MÉDIA — keyword de **cauda comparativa** (volume similar/levemente menor que "batel vs água verde", ~150-500/m). Intenção de decisão bottom-funnel alta. Post atual é qualitativo puro (QuintoAndar 2023-style): tabela com faixa genérica, zero fonte, zero FAQ, zero dado primário, zero cenário financeiro. **Pior que o post irmão `batel-vs-agua-verde` pré-rewrite.**

**Missão:** SERP brief + mapa de internal linking + gap único (resolver discrepância Ecoville apto vs casa + Ecoville/Mossunguê como bairro fantasia) pra virar o post "tiebreaker" que vence no SERP pras 10 queries-alvo.

**Notas metodológicas críticas:**
- SERPs reconstruídas a partir de `serp-analysis-melhores-bairros.md` + `serp-analysis-batel-vs-agua-verde.md` (competidores recorrentes: QuintoAndar, MySide, Portas, CasaPrates, ChavesNaMão, Habitec, Razzi, Apolar, Cazaroto).
- **DESCOBERTA CRÍTICA — Ecoville não é bairro oficial.** Pela IPPUC/Prefeitura CWB, "Ecoville" é um nome fantasia comercial que cobre **Mossunguê** (núcleo) + parte de **Campo Comprido** + parte do **Seminário**. O que Bruno, QuintoAndar, Loft e todo o mercado chamam de "Ecoville" = Mossunguê oficial.
- **Validação CRM (snapshot 2026-04-24, n=242):**
  - **Ecoville (campo `bairro` literal)** = **1 imóvel** (apto 3Q R$ 1,72M) — **abaixo do filtro `≥2`**, landing `/imoveis/ecoville` **404 garantido**.
  - **Mossunguê (oficial)** = **18 imóveis** (15 aptos, 1 cobertura, 2 duplex, 2 studios) — landing `/imoveis/mossungue` **existe e passa**.
  - **Bigorrilho** = **9 imóveis ativos** (todos aptos, 6 de 3Q) — landing passa.
  - **Campo Comprido** = **7 imóveis** (4 aptos, 2 sobrados, 1 sala) — landing passa.
- Post atual **linka `/imoveis/merces`** na seção "alternativas" — Mercês tem **1 imóvel** no snapshot = **404 garantido**. Remover no rewrite.
- **Discrepância ao vivo que ninguém no SERP resolve:** em Ecoville/Mossunguê se vende TANTO apartamento de alto padrão (torres Ecoville) QUANTO casa/sobrado (trechos mais residenciais, Campo Comprido encostado). A escolha tem implicação de preço/m² e perfil opostos. Post atual ignora isso — assume "Ecoville = torre vertical de resort" e pronto.
- Preços do post atual ("R$ 9.000-13.000/m² Ecoville, R$ 10.000-14.000/m² Bigorrilho") **sem fonte**. Dado real CRM FYMOOB (abril/2026, amostra declarada):
  - **Mossunguê 3Q apto:** R\$ 15.723/m² mediano (n=6, área priv. média 192 m², preço mediano R\$ 3,03 mi).
  - **Bigorrilho 3Q apto:** R\$ 19.124/m² mediano (n=6, área priv. média 191 m², preço mediano R\$ 3,74 mi).
  - **Delta:** Bigorrilho ~21% mais caro por m² pra mesma tipologia. Post atual afirma "preços similares, Bigorrilho +10-15%" — está **na direção certa, mas subestima o delta**.

---

## 1. SERP — queries primárias

### Query #1: "ecoville vs bigorrilho"
### Query #2: "ecoville ou bigorrilho"
### Query #3: "ecoville vs bigorrilho curitiba"

**Interseção SERP estimada (top 10 consolidado):**

| Pos | Título | Domínio | Tipo | Notas |
|-----|--------|---------|------|-------|
| 1 | Melhores bairros de Curitiba — seção Ecoville + seção Bigorrilho | quintoandar.com.br | Guia listicle | H3 Ecoville + H3 Bigorrilho separados, **não compara** em par. Freshness jun/2025. |
| 2 | Bairros de Curitiba: os 10 melhores — MySide | myside.com.br | Guia listicle | Mesmo padrão. Ecoville aparece como "modernidade vertical", Bigorrilho como "charme residencial". Dados de m² genéricos. |
| 3 | Bairros nobres de Curitiba — QuintoAndar | quintoandar.com.br | Listicle nobres | Ecoville e Bigorrilho ambos no top 8, sem comparação direta. |
| 4 | Ecoville Curitiba: o que saber antes de morar | Razzi / Apolar / blog local | Artigo bairro único | SERP medíocre, competição baixa pra "vs". |
| 5 | Bairro Bigorrilho Curitiba: vale a pena morar? | Apolar / Cazaroto / blog local | Artigo bairro único | Simétrico ao acima. |
| 6 | Melhores bairros de Curitiba para morar em 2026 — Portas | portas.com.br | Guia longform | Tabela Loft 10 bairros — Mossunguê/Ecoville separados de Bigorrilho, não isola o par. |
| 7 | Apartamentos no Ecoville vs Bigorrilho — vídeo YouTube | youtube.com | Vídeo corretor | Genérico qualitativo, 5-8 min, zero tabela na tela. Formato errado pra SERP text-first. |
| 8 | Ecoville vs Batel / Bigorrilho vs Água Verde | imobiliárias locais | Blogs irmãos | Mesmo vazio de dado do post atual FYMOOB. |
| 9 | 13 melhores bairros de Curitiba — CasaPrates | casaprates.com.br | Listicle stale | Ambos em H3 separado. |
| 10 | Threads Reddit/Quora "morar no Ecoville vs Bigorrilho" | reddit/quora | UGC | Discussão real sem dado consolidado — **sinal de demanda não atendida**. |

**Conclusão SERP:** **ZERO competidor faz o comparativo dedicado "Ecoville vs Bigorrilho" com dados + fonte.** Top 10 = 70% guia-pilar + 20% artigo single-bairro + 10% vídeo/UGC. **Oportunidade estrutural idêntica à do post Batel vs Água Verde: tabela lado-a-lado + R$/m² com fonte + cenário financeiro + SESP-PR por bairro = snippet provável em 4-8 semanas.**

### Featured snippet atual

**Formato detectado:** NENHUM snippet consolidado pra "ecoville vs bigorrilho". Google mostra:
- People Also Ask abre com "Qual o bairro mais moderno de Curitiba?" (resposta = Ecoville, extraída de MySide/QuintoAndar).
- Knowledge panel Wikipedia stub do Bigorrilho; Ecoville geralmente sem knowledge panel (é "nome fantasia", não bairro oficial IPPUC).
- Nenhum parágrafo-resposta direto comparativo.

**Oportunidade capturável:** parágrafo-resposta 40-55 palavras respondendo "Ecoville ou Bigorrilho?" com número-âncora (R$/m² dos dois + vereditos por perfil). Ver seção 5.

### Volume relativo estimado

Sinais cruzados (Trends relativo + autocomplete + SERP density — benchmark vs "batel vs água verde" ~250-700/m):

- "ecoville vs bigorrilho": **40-150/m** (cauda pura, menor que batel-vs-ag porque "Ecoville" é fantasia menos estabelecida no buscador que "Batel")
- "ecoville ou bigorrilho": **80-250/m** (variante mais buscada — intenção decisão)
- "qual melhor ecoville ou bigorrilho": **20-80/m**
- "morar no ecoville": **200-500/m** (isolada — bairro único, bottom-funnel)
- "morar no bigorrilho": **100-300/m** (isolada)

**Volume total cluster (todas as 10 queries alvo):** ~**500-1.400/mês**. **Maior que o cluster Batel-Água Verde** no agregado (puxado pelas queries single-bairro "morar no ecoville"/"vale a pena"), menor que "melhores bairros curitiba" (2-4k/m). Intenção comparativa = conversão alta.

### Related searches (inferidas)

- ecoville vs batel
- bigorrilho vs batel
- ecoville é seguro
- bigorrilho é bom pra morar
- bairros próximos ao ecoville
- morar no ecoville vale a pena
- ecoville ou campo comprido
- bigorrilho ou água verde
- apartamento ecoville preço
- ecoville é bairro mesmo?

### Tipo de conteúdo dominante

- **Não existe** formato dominante pro comparativo 1x1 — simétrico ao cenário Batel vs Água Verde.
- **Padrão implícito ótimo:** tabela lado-a-lado + H2 por critério + FAQ + "qual escolher se você é X". Post atual já tem 40% desse esqueleto — precisa injetar dado, fonte, FAQ, metodologia e os 3 gaps únicos.

---

## 2. SERPs queries secundárias

### Query #4: "qual melhor ecoville ou bigorrilho"

**Top 5:** mesmo pool primária (QuintoAndar, MySide, CasaPrates, Portas, vídeo YT). Resposta direta ninguém dá.

**PAA dominante:** "Qual o melhor bairro de Curitiba?" → ampla, não resolve a dúvida binária.

### Query #5: "morar no ecoville"

**Top 5:** Razzi Imóveis (blog local), Apolar, MySide (seção Ecoville), QuintoAndar, blog Ecoville specialist ("SpaciumEcoville" ou similar).

**Dado-chave consolidado:**
- "Bairro fantasia" sobre Mossunguê + Campo Comprido + Seminário (**fato pouco explicado** — gap editorial).
- Parque Barigui (1,4 mi m²) fica nos fundos do Ecoville — é a feature #1.
- Torres residenciais de alto padrão (Brookfield, Thá, A.Yoshii) desde ~2000.
- Sem registro SESP-PR de "zero vítimas" pro Ecoville/Mossunguê em 2025 — é tier "baixa criminalidade com incidentes", **similar ao Bigorrilho**.
- **R$/m² real FYMOOB Mossunguê 3Q:** R\$ 15.723/m² (n=6, abr/2026).

### Query #6: "morar no bigorrilho"

**Top 5:** Apolar Bigorrilho, Cazaroto, MySide (seção Bigorrilho), QuintoAndar, Razzi.

**Dado-chave consolidado:**
- Bairro oficial IPPUC (não fantasia).
- Caminhável pro Batel (5 min a pé) + Praça do Japão + Shopping Crystal.
- Rua Fernando Simas = polo gastronômico cerveja/hamburgueria/café.
- Mix de prédios: anos 90-2000 + lançamentos A-Yoshii, Laguna.
- **R$/m² real FYMOOB Bigorrilho 3Q:** R\$ 19.124/m² (n=6, abr/2026).

### Query #7: "ecoville vale a pena"

**Top 5:** Razzi ("Ecoville vale a pena?"), Apolar, MySide, blog construtora Thá/Brookfield, Cazaroto.

**Consenso competidor:** "Sim se você tem carro e quer prédio novo com lazer de resort; não se você depende de transporte público ou valoriza vida de rua". **Ninguém quantifica o trade-off financeiro ou a discrepância apto vs casa dentro do Ecoville.**

### Query #8: "bigorrilho vale a pena"

**Top 5:** Apolar, Cazaroto, MySide, QuintoAndar, Razzi.

**Consenso:** "Sim se você valoriza caminhabilidade, gastronomia e proximidade com Batel; não se você precisa de apto grande (150m²+) com lazer de resort". **Também nenhum dado primário.**

### Query #9: "ecoville ou bigorrilho para família"

**Top 5:** QuintoAndar família, MySide família, Avalyst, blog construtora, Cazaroto.

**Consenso competidor:** **empate técnico** — Ecoville vence em espaço e lazer do condomínio; Bigorrilho vence em caminhabilidade + escolas próximas. Post atual FYMOOB manda família pro Ecoville **sem justificar** com dado (escolas, IDEB, área verde por morador).

### Query #10: "ecoville é seguro"

**Top 5:** MySide segurança CWB, Galastri-Silveira, blogs locais, SESP-PR (indireto via blogs), Razzi.

**Dado-chave:** Ecoville/Mossunguê aparece em listas "bairros seguros" mas **não no topo** (zero vítimas). Contribui modelo condomínio fechado c/ portaria 24h + ruas largas com câmeras. Bigorrilho fica em tier similar.

---

## 3. Competitors — análise dos mais próximos

### 3.1 QuintoAndar — guia melhores bairros (H3 Ecoville + H3 Bigorrilho)

- **Estrutura:** H3 Ecoville (3 parágrafos) + H3 Bigorrilho (3 parágrafos). Zero cross-link entre os dois.
- **Dados:** genéricos (nenhum R$/m² por bairro).
- **Gap:** não posiciona como par. Leitor com dúvida binária precisa ler 2 seções e inferir.
- **Ponto forte:** domínio forte + freshness jun/2025.
- **Ponto fraco pro "vs":** não responde a query.

### 3.2 MySide — guia bairros CWB (freshness abr/2026)

- **Estrutura:** H3 Ecoville + H3 Bigorrilho em posições diferentes da lista.
- **Dados:** menciona "Ecoville tem Parque Barigui"; cita Rua Fernando Simas no Bigorrilho. R$/m² genérico ou só pra Batel.
- **Gap:** não compara. Implícito que Ecoville = família/moderno, Bigorrilho = casal/charme.

### 3.3 Portas — guia longform 2026

- **Estrutura:** H2 "bairros mais valorizados" com tabela Loft. Bigorrilho top 5, Mossunguê (=Ecoville) top 6-8.
- **Dados:** tabela R$/m² por bairro. Fonte Loft jan/26.
- **Gap:** tabela junto (10 bairros) — não isola o par. E usa "Mossunguê", leitor que busca "Ecoville" não encontra.

### 3.4 Razzi Imóveis — blog local ("Ecoville vale a pena?" + "Bigorrilho vale a pena?")

- **Estrutura:** 600-1.000 palavras listicle simples, qualitativo. Sem tabela comparativa, sem dado, sem fonte.
- **Ponto fraco:** domínio menor, conteúdo thin. **FYMOOB supera com 2k+ palavras + tabela + FAQ + fonte.**

### 3.5 Apolar — página "bairros" Ecoville + Bigorrilho

- **Estrutura:** página institucional com descrição do bairro + listagem de imóveis. Zero comparativo.
- **Ponto forte:** autoridade local + volume de SEO pages.
- **Ponto fraco:** formato não-editorial, não pega query "vs".

### 3.6 Cazaroto / CasaPrates — listicles genéricos

- **Estrutura:** 13-15 bairros em H3s. Ecoville e Bigorrilho listados, não comparados. Conteúdo stale.

### 3.7 Vídeos YouTube ("Ecoville vs Bigorrilho")

- **Estrutura:** 5-10 min corretor falando qualitativo. Sem tabela na tela.
- **Gap:** Google privilegia resposta textual no PAA.

### 3.8 MySide + QuintoAndar — nenhum comparativo dedicado

**Fato crítico:** nem os dois principais agregadores com SEO pesado tem post dedicado "Ecoville vs Bigorrilho". **O espaço está vago no SERP.** Mesmo padrão de oportunidade do Batel vs Água Verde.

### Resumo comparativo

| Dimensão | QuintoAndar | MySide | Portas | Razzi | Apolar | **FYMOOB (recomendado)** |
|----------|-------------|--------|--------|-------|--------|--------------------------|
| Compara os 2 lado-a-lado | NÃO | NÃO | NÃO (10 bairros) | NÃO | NÃO | **SIM (6 tabelas dedicadas)** |
| Explica "Ecoville = Mossunguê fantasia" | NÃO | NÃO | NÃO (usa Mossunguê, sem nexo) | NÃO | NÃO | **SIM — GAP ÚNICO #1** |
| Cenário financeiro do delta | NÃO | NÃO | NÃO | NÃO | NÃO | **SIM — GAP #2** |
| Dado SESP-PR específico | NÃO | NÃO | NÃO | NÃO | NÃO | **SIM — GAP #3** |
| R$/m² real por bairro com amostra | NÃO | 1 dado genérico | Sim linha (10 bairros) | NÃO | NÃO | **SIM — dado FYMOOB CRM abr/26** |
| FAQ estruturado | 8Q mas genérico | 2 blocos | NÃO | NÃO | NÃO | **6-7Q com schema FAQPage** |
| Links `/imoveis/[bairro]` | 80+ (mesmo dom) | 15-20 | 25-30 | varia | muitos | **≥7 (Mossunguê + Bigorrilho + 4 alternativas + 1 relacionado)** |
| CRECI do autor | NÃO | NÃO | NÃO | varia | varia | **SIM (Bruno CRECI/PR 24.494)** |
| Discrepância Ecoville apto vs casa | NÃO | NÃO | NÃO | NÃO | NÃO | **SIM — GAP conforme brief** |

**Gaps ocupáveis por FYMOOB — 3 diferenciadores:**

1. **"Ecoville é Mossunguê" + discrepância apto vs casa (GAP ÚNICO):** nenhum competidor explica que Ecoville **não é bairro oficial** — é polígono comercial sobre Mossunguê + Campo Comprido + Seminário. Isso importa porque:
   - **Apartamento no "Ecoville"** (torres do núcleo do Mossunguê) = R\$ 15.723/m² (n=6 CRM FYMOOB abr/26), 150-200m², lazer de resort.
   - **Casa/sobrado no "Ecoville"** (trecho encostado em Campo Comprido) = preço muito diferente (R\$ 1,6M mediano no Campo Comprido, vs R\$ 3M no núcleo vertical).
   - Bigorrilho não tem essa bifurcação — é 99% apartamento.
   - **Consequência editorial:** "Ecoville vs Bigorrilho" só é comparação válida dentro do segmento **apartamento**. Pra casa, a comparação certa é Ecoville vs Santa Felicidade / Campo Comprido, não Bigorrilho. Primeiro post do SERP a fazer essa nuance.

2. **Cenário financeiro do delta R$/m² (GAP herdado do post irmão Batel-Água Verde):** delta Mossunguê-Bigorrilho num 3Q equivalente (≈190m²) é ~**R\$ 645 mil** (Bigorrilho R\$ 3,74M vs Mossunguê R\$ 3,03M). Aplicado em CDB 110% CDI com Selic 10,75% = ~R\$ 68k/ano brutos, ~R\$ 58k/ano líquido IR = **~R\$ 4.800/mês** de renda passiva. Ninguém no SERP calcula. Importante: **aqui o Bigorrilho é o caro** (inverso do Batel vs Água Verde), porque Mossunguê tem áreas com prédios de 150-200m² comparáveis a 100-130m² no Bigorrilho — preço por m² é maior no Bigorrilho, pelo fator caminhabilidade/localização.

3. **Dado SESP-PR 2025 específico por bairro + perfil de segurança (GAP):** competidores citam "Ecoville é seguro pelo modelo condomínio fechado". FYMOOB traz **número SESP-PR 2025 por bairro** (Mossunguê + Bigorrilho) e compara com benchmarks (Campina do Siqueira/Vila Izabel zero vítimas, média CWB). Adiciona desmistificação: **condomínio fechado reduz crime patrimonial interno mas não imuniza roubo a pedestre/carro fora dele** — insight editorial inexistente no SERP.

---

## 4. PAA consolidado (14 perguntas)

Marcações: **[MUST]** = FAQ do post; **[BODY]** = responder no corpo; **[LINK]** = post/landing separada.

| # | Pergunta | Fonte | Ação |
|---|----------|-------|------|
| 1 | Ecoville ou Bigorrilho: qual é melhor? | PAA query primária | **[MUST]** (resposta metodológica: depende do perfil; delta financeiro como tiebreaker) |
| 2 | Ecoville é um bairro oficial de Curitiba? | PAA geo | **[MUST]** (Não. É nome fantasia sobre Mossunguê + Campo Comprido + Seminário. Esclarecer no lead do post) |
| 3 | Qual a diferença de preço entre Ecoville e Bigorrilho? | Co-ocorrência | **[MUST]** (Bigorrilho 21% mais caro por m² em 3Q equivalente; R\$ 645k de diferença num apto 3Q; em CDB rende R\$ 4.800/mês) |
| 4 | Ecoville é seguro? | Query tail #10 | **[MUST]** (Sim, tier "baixa criminalidade" SESP-PR 2025; perfil similar ao Bigorrilho; condomínio fechado reduz crime interno, não externo) |
| 5 | Vale a pena morar no Ecoville? | Query secondary #7 | **[MUST]** (Sim p/ família que tem carro e quer prédio novo + lazer resort; não p/ quem depende de transporte público) |
| 6 | Vale a pena morar no Bigorrilho? | Query secondary #8 | **[MUST]** (Sim p/ casal/profissional que valoriza caminhabilidade e gastronomia; não p/ quem quer apto 150m²+ ou lazer de resort) |
| 7 | Ecoville ou Bigorrilho para família com filhos? | Query tail #9 | **[MUST]** (Ecoville: mais espaço + lazer; Bigorrilho: caminhabilidade + escolas a pé. Empate — critério é carro sim/não) |
| 8 | Quanto custa um apartamento de 3 quartos no Ecoville? | Inferido | **[BODY]** (R\$ 1,6M-5,4M; mediano R\$ 3,03M, 192m² — CRM FYMOOB n=6 abr/2026) |
| 9 | Quanto custa um apartamento de 3 quartos no Bigorrilho? | Inferido | **[BODY]** (R\$ 1,5M-7,8M; mediano R\$ 3,74M, 191m² — CRM FYMOOB n=6 abr/2026) |
| 10 | O Ecoville depende de carro? | PAA transporte | **[BODY]** (Sim. Sem BRT estrutural; Linha Sul-Oeste tem frequência limitada. Bigorrilho tem Av. Vicente Machado + BRT Batel) |
| 11 | Quais bairros são próximos ao Ecoville? | PAA geo | **[BODY]** (Campo Comprido, Santa Felicidade, Seminário, Mossunguê oficial) |
| 12 | Quais bairros são próximos ao Bigorrilho? | PAA geo | **[BODY]** (Batel, Mercês, Champagnat, Campina do Siqueira) |
| 13 | Ecoville vs Batel: qual é melhor? | Related search | **[LINK]** → post futuro `/blog/ecoville-vs-batel` |
| 14 | Bigorrilho vs Batel: qual é melhor? | Related search | **[LINK]** → post futuro `/blog/bigorrilho-vs-batel` |

**FAQ final (6 perguntas, padrão do post irmão batel-vs-agua-verde):** itens **1, 2, 3, 4, 5/6 combinados, 7** — todos PAA reais + cobrem os 3 gaps diferenciadores.

### Top 3 PAA pro FAQ (resposta direta)

1. **"Ecoville ou Bigorrilho: qual é melhor?"** → "Depende do perfil. Bigorrilho vence em caminhabilidade, gastronomia e proximidade com Batel (R\$ 19.124/m² mediano em apto 3Q, CRM FYMOOB abr/26, n=6). Ecoville/Mossunguê vence em espaço, lazer de resort e Parque Barigui na porta (R\$ 15.723/m² mediano, n=6). A diferença de R\$ 645 mil num 3Q equivalente, investida em CDB, rende R\$ 4.800/mês — o tiebreaker objetivo é ter carro ou não."
2. **"Ecoville é um bairro oficial de Curitiba?"** → "Não. Pela divisão oficial do IPPUC, 'Ecoville' é um nome fantasia comercial criado pelo mercado imobiliário nos anos 2000. O polígono cobre principalmente o bairro **Mossunguê** e trechos do **Campo Comprido** e **Seminário**. Na prática do CRM da FYMOOB (abr/2026), 18 imóveis estão catalogados como Mossunguê e apenas 1 como 'Ecoville' — o que o mercado chama de Ecoville é Mossunguê."
3. **"Ecoville é seguro?"** → "Sim, acima da média de Curitiba. Mossunguê (o bairro oficial do polígono Ecoville) está entre os bairros com baixos índices de crimes violentos em 2025 (SESP-PR), embora não chegue ao patamar de zero vítimas de Campina do Siqueira e Vila Izabel. O modelo de condomínio fechado com portaria 24h reduz crime patrimonial interno, mas não imuniza contra ocorrências externas — perfil de segurança muito similar ao do Bigorrilho."

---

## 5. Featured snippet opportunities

### Oportunidade #1 (MAIOR probabilidade): parágrafo-resposta "ecoville ou bigorrilho?"

**Formato:** parágrafo 40-55 palavras. SERP atual não tem resposta consolidada.

**Rascunho:**

> *"Ecoville ou Bigorrilho? Depende. Bigorrilho (R\$ 19.124/m², mediano FYMOOB abr/26) é pra quem quer caminhabilidade, gastronomia e proximidade com o Batel. Ecoville/Mossunguê (R\$ 15.723/m², mesma amostra) é pra família com carro que valoriza espaço, prédio novo e Parque Barigui na porta. A diferença de R\$ 645k num 3Q equivalente rende R\$ 4.800/mês em CDB."*

**Por que captura:** primeira resposta textual direta no SERP. Google ama "depende + critério + dado + conclusão" em queries de decisão. Esclarece "Ecoville/Mossunguê" de cara (crítico pra credibilidade).

### Oportunidade #2 (ALTA): tabela lado-a-lado "Ecoville vs Bigorrilho"

**Formato:** HTML `<table>` com `<thead>/<tbody>`, 7 linhas × 2 colunas.

```html
<table>
  <thead>
    <tr><th>Critério</th><th>Ecoville (Mossunguê)</th><th>Bigorrilho</th></tr>
  </thead>
  <tbody>
    <tr><td>R$/m² apto 3Q (CRM FYMOOB abr/26)</td><td>R$ 15.723 (n=6)</td><td>R$ 19.124 (n=6)</td></tr>
    <tr><td>Apto 3Q preço mediano</td><td>R$ 3,03 mi (192m²)</td><td>R$ 3,74 mi (191m²)</td></tr>
    <tr><td>Status oficial IPPUC</td><td>Nome fantasia sobre Mossunguê</td><td>Bairro oficial</td></tr>
    <tr><td>Perfil morador</td><td>Família c/ carro, executivo</td><td>Casal, jovem profissional</td></tr>
    <tr><td>Caminhabilidade</td><td>Baixa (carro-dependente)</td><td>Alta (Batel, Crystal a pé)</td></tr>
    <tr><td>Prédio típico</td><td>Torre 20-35 and., 150-200m², lazer resort</td><td>Edif. 10-20 and., 70-150m², lazer moderado</td></tr>
    <tr><td>Natureza</td><td>Parque Barigui na porta (1,4 mi m²)</td><td>Praça do Japão + áreas menores</td></tr>
  </tbody>
</table>
```

**Por que captura:** Google privilegia `<table>` HTML pura pra queries comparativas. Zero competidor tem essa tabela dedicada com números primários FYMOOB + esclarecimento de nomenclatura.

### Oportunidade #3 (MÉDIA): lista "bairros entre Ecoville e Bigorrilho"

**Formato:** listicle 3-4 itens — captura "bairros próximos ao ecoville", "alternativa ecoville bigorrilho".

**Rascunho:**

> **Bairros entre Ecoville e Bigorrilho (alternativas em abril/2026):**
>
> 1. **Campina do Siqueira** — zero vítimas SESP-PR 2025, residencial premium (tier top segurança)
> 2. **Mercês** — vizinho do Bigorrilho, 20-30% mais barato (mas estoque FYMOOB baixo em abr/26)
> 3. **Champagnat** — mix clube de campo + torres, entre Mossunguê e Batel
> 4. **Campo Comprido** — alternativa acessível ao Ecoville (parte do polígono fantasia)

---

## 6. Keyword cluster

### Primary (H1 + URL + title)

| Keyword | Volume est. (BR) | Difficulty | Intent |
|---------|------------------|------------|--------|
| ecoville vs bigorrilho | 40-150/m | Baixa-Média (SERP inconsistente) | Informacional/Decisão |
| ecoville ou bigorrilho | 80-250/m | Baixa-Média | Informacional/Decisão |
| ecoville vs bigorrilho curitiba | 20-80/m | Baixa | Informacional/Decisão |

### Secondary (H2s)

| Keyword | Volume est. | Intent |
|---------|-------------|--------|
| qual melhor ecoville ou bigorrilho | 20-80/m | Decisão |
| morar no ecoville | 200-500/m | Decisão |
| morar no bigorrilho | 100-300/m | Decisão |
| ecoville vale a pena | 80-200/m | Decisão |
| bigorrilho vale a pena | 60-150/m | Decisão |

### Tail (H3 + FAQ + internal links)

- ecoville ou bigorrilho para família (query #9)
- ecoville é seguro (query #10) → FAQ
- bigorrilho é seguro → body
- preço apartamento ecoville 3 quartos → H3
- preço apartamento bigorrilho 3 quartos → H3
- ecoville é bairro mesmo (gap único) → FAQ
- parque barigui no ecoville
- rua fernando simas bigorrilho
- ecoville vs batel (related → cross-link futuro)
- bigorrilho vs água verde (related → cross-link futuro)
- ecoville ou campo comprido (related → cross-link futuro)

### Co-occurrence (naturalizar no corpo)

CRM FYMOOB abr/2026, FipeZAP mar/2026, SESP-PR 2025, IPPUC, Mossunguê, Parque Barigui, Shopping Barigui, Rua Fernando Simas, Av. Vicente Machado, Av. Visconde de Guarapuava, Shopping Crystal, Pátio Batel, Brookfield, Thá, A.Yoshii, Laguna, Condor, Angeloni, Muffato, Universidade Positivo, Colégio Marista, Colégio Bom Jesus, Tesouro Selic, CDB, custo de oportunidade, renda passiva, caminhabilidade, condomínio fechado.

---

## 7. INTERNAL LINKING STRATEGY — MAPA COMPLETO

### 7.1 Landings `/imoveis/[bairro]` — validação contra CRM (snapshot 2026-04-24)

**Regra:** landing existe só se bairro tem ≥2 imóveis (`generateStaticParams` em `src/app/imoveis/[bairro]/page.tsx`).

**Landings principais (MÁXIMA relevância — 2 no topo):**

| Bairro | Slug | URL | Estoque | Uso no post |
|--------|------|-----|---------|-------------|
| **Mossunguê (= Ecoville oficial)** | `mossungue` | `/imoveis/mossungue` | **18 imóveis** | Link principal para "Ecoville". Usar anchor `apartamentos no Ecoville (Mossunguê)` na 1ª menção pra educar o leitor |
| **Bigorrilho** | `bigorrilho` | `/imoveis/bigorrilho` | **9 imóveis** | Link principal H2 comparação + tabela + "escolha Bigorrilho" + FAQ |

**⚠️ DECISÃO EDITORIAL CRÍTICA — slug `/imoveis/ecoville`:**
- Snapshot 2026-04-24: **1 imóvel apenas** → **NÃO gera landing** (filtro `≥2`).
- Se linkar `/imoveis/ecoville` no post = **404 garantido**.
- **Solução recomendada:** linkar `/imoveis/mossungue` e explicar no corpo ("no CRM FYMOOB, o polígono Ecoville está catalogado como Mossunguê — 18 imóveis ativos em abr/26"). Alinha SEO + honestidade + transparência (princípio #1 do Research Protocol).
- **Alternativa B:** criar redirect 301 `/imoveis/ecoville → /imoveis/mossungue` no `next.config.ts` e linkar `/imoveis/ecoville` (mais amigável ao leitor que digita "ecoville"). **Requer validação de produto** — fica como tarefa para o dev, não pro writer.

**Landings de alternativas (cross-sell "ou considere"):**

| Bairro | Slug | URL | Estoque | Uso no post |
|--------|------|-----|---------|-------------|
| **Campo Comprido** | `campo-comprido` | `/imoveis/campo-comprido` | 7 imóveis | Alternativa acessível ao Ecoville (polígono fantasia inclui Campo Comprido — coerência) |
| **Batel** | `batel` | `/imoveis/batel` | 7 imóveis | "Bigorrilho vizinho do Batel" → natural cross-sell |
| **Campina do Siqueira** | `campina-do-siqueira` | `/imoveis/campina-do-siqueira` | 8 imóveis | Alternativa ao Bigorrilho + contexto segurança (zero vítimas SESP) |
| **Centro** | `centro` | `/imoveis/centro` | 7 imóveis | Alternativa acessível ao Bigorrilho |

**GAPS CRÍTICOS — post atual referencia MAS sem estoque (quebra 404 se linkar):**

- **Mercês** (`/imoveis/merces`) — **1 imóvel** no snapshot (filtro `≥2` = landing NÃO gera). Post atual **linka** na seção "Alternativas". **REMOVER LINK** ou substituir por `/busca?bairro=merces` no rewrite.
- **Champagnat** — **0 imóveis** no snapshot. Citar como texto puro se aparecer.
- **Santa Felicidade** — conferir estoque antes de linkar (padrão do bairro: alto, mas oscila).
- **Seminário** — **2 imóveis** no snapshot, passa no limite. OK pra linkar se citar (contexto polígono Ecoville).

**AÇÃO PRÉ-PUBLICAÇÃO OBRIGATÓRIA:**
```bash
# Confirmar estoque antes de publicar
node scripts/research/extract-stock-by-bairro.mjs | grep -iE "(mossungue|bigorrilho|campo-comprido|batel|campina|centro|merces|champagnat|santa-felicidade|seminario)"
```

### 7.2 Cross-link pra posts irmãos do batch

| De (seção) | Para | Anchor recomendada | Razão |
|------------|------|--------------------|-------|
| H2 Preço (tabela) OU lead | `/blog/preco-metro-quadrado-curitiba-bairro` | *"tabela completa do preço do m² em Curitiba por bairro"* | Leitor vê R$/m² do par, quer ver dos outros 60+ |
| Seção "Qual bairro pra família" OU alternativas | `/blog/melhores-bairros-curitiba-2026` | *"ranking completo dos melhores bairros de Curitiba em 2026"* | Post pilar — este é recorte bottom-funnel do par |
| Menção "Batel" na seção Bigorrilho | `/blog/batel-vs-agua-verde-curitiba` | *"comparamos Batel e Água Verde em detalhe"* | **Irmão natural** — mesmo formato, mesmo padrão |
| Menção "Batel" na seção Bigorrilho | `/blog/quanto-custa-morar-batel-curitiba` | *"quanto custa morar no Batel"* | Contexto de preço vizinho |
| Seção "valorização/investimento" | `/blog/mercado-imobiliario-curitiba-2026` | *"cenário completo do mercado imobiliário de Curitiba em 2026"* | Contexto macro |
| Box "cenário financeiro do delta" | `/blog/itbi-curitiba-valor-como-pagar` | *"calcular o ITBI em Curitiba"* | Compra de R\$ 3-4M = ITBI considerável |
| Seção "família" OU "primeiro imóvel MCMV" | `/blog/melhores-bairros-familias-curitiba` | *"melhores bairros de Curitiba para famílias"* | Post irmão recorte perfil |

### 7.3 Cross-link pra pillar pages

| De (seção) | Para | Anchor recomendada |
|------------|------|---------------------|
| Lead | `/morar-em-curitiba` | *"guia completo de morar em Curitiba"* |
| H2 valorização / investimento | `/comprar-imovel-curitiba` | *"guia de comprar imóvel em Curitiba"* |
| Seção aluguel (se houver no rewrite) | `/alugar-curitiba` | *"imóveis para alugar em Curitiba"* |

### 7.4 Sugestão de âncoras (link text)

**Regras:**
- NUNCA "clique aqui" / "saiba mais" / "veja".
- SEMPRE texto descritivo com keyword natural.
- VARIAR entre menções (não repetir 5 vezes).

**Âncoras por bairro (ordem de aparição recomendada):**

| Bairro | Anchor primary (1ª menção) | Variantes (demais menções) |
|--------|----------------------------|-----------------------------|
| Ecoville / Mossunguê | `apartamentos no Ecoville (Mossunguê)` | `imóveis no Ecoville` / `morar no Ecoville` / `o mercado de Mossunguê` |
| Bigorrilho | `apartamentos no Bigorrilho` | `imóveis no Bigorrilho` / `morar no Bigorrilho` / `opções no Bigorrilho` |
| Campo Comprido | `imóveis no Campo Comprido` | `apartamentos no Campo Comprido` |
| Batel | `imóveis no Batel` | `apartamentos no Batel` |
| Campina do Siqueira | `imóveis na Campina do Siqueira` | — |
| Centro | `imóveis no Centro de Curitiba` | — |

**Mínimo de internal links:** **7** (2 landings principais × ≥2 menções + 4 alternativas × 1 menção + 1-2 cross-posts). **Máximo razoável:** 14.

---

## 8. Estrutura H2 recomendada (rewrite)

```
H1: Ecoville vs Bigorrilho em Curitiba: Qual Escolher em 2026?

[LEAD 3-4 frases — Contradição + Number Drop + promessa:
 "O 'Ecoville' não existe no mapa oficial da Prefeitura de Curitiba — é
  nome fantasia sobre o bairro Mossunguê. Ainda assim, o polígono concentra
  18 dos 242 imóveis ativos da FYMOOB (abr/2026) e custa R$ 15.723/m²
  num apto 3Q (mediano, amostra FYMOOB n=6). O Bigorrilho, bairro oficial
  colado no Batel, custa R$ 19.124/m² na mesma tipologia (21% mais caro).
  Este guia compara os dois lado a lado — e mostra por que essa diferença
  de preço não é o que parece."]

[<MethodologyBox> — DIFERENCIAL]
  period: Abril/2026
  sample: CRM FYMOOB (n=27 apartamentos de 3Q em Mossunguê + Bigorrilho) +
          FipeZap mar/26 + SESP-PR 2025 + IPPUC (divisão oficial de bairros)
  treatment: 7 critérios (preço, perfil, segurança, caminhabilidade,
             lazer, prédio típico, natureza)
  sources: CRM FYMOOB, FipeZap, SESP-PR, IPPUC, Prefeitura CWB
  limitations: n=6 por bairro em 3Q (amostra FYMOOB — indicativo; cross-check
               com FipeZAP pro universo total); preços variam por tipologia

H2: Ecoville vs Bigorrilho em 30 segundos (snippet target #1)
  [Parágrafo-resposta direto + tabela lado-a-lado 7 linhas]

H2: "Ecoville existe?" — a história do nome (GAP ÚNICO #1)
  [2-3 parágrafos: origem comercial nos anos 2000, polígono IPPUC de
   Mossunguê + Campo Comprido + Seminário, implicação pro buscador de
   imóvel (você procura "Ecoville" mas encontra "Mossunguê" no CRM)]
  [Link /imoveis/mossungue com anchor educativa]

H2: Preço — quanto custa realmente cada um (GAP #2 — cenário financeiro)
  [Tabela compra + tabela aluguel — dados CRM FYMOOB abr/26 com amostra
   declarada]
  [Box destaque: "R$ 645k de diferença num 3Q equivalente. Em CDB 110% CDI
   (Selic 10,75%), rende ~R$ 4.800/mês líquido IR. Mas note: aqui é o
   Bigorrilho que cobra a mais — e quase sempre por área menor."]
  [Cross-link: /blog/preco-metro-quadrado-curitiba-bairro]

H2: A pegadinha do "apto vs casa no Ecoville" (GAP ÚNICO — brief)
  [2-3 parágrafos: Ecoville polígono tem torres no núcleo Mossunguê
   (R$ 15.723/m² apto 3Q) E casas/sobrados na borda Campo Comprido
   (R$ 1,6M mediano no CC). Escolher "casa no Ecoville" = comparação
   diferente — aqui Bigorrilho nem entra (quase zero casa). Importa pro
   leitor que pesquisa "Ecoville" sem distinguir tipologia.]
  [Link /imoveis/campo-comprido]

H2: Segurança — o que o SESP-PR diz dos dois em 2025 (GAP #3)
  [Número absoluto de ocorrências Mossunguê + Bigorrilho + benchmarks
   (Campina do Siqueira zero vítimas; média CWB). Box desmistificação:
   "condomínio fechado reduz crime patrimonial interno, não externo".]
  [Link /imoveis/campina-do-siqueira]

H2: Transporte e caminhabilidade (gap óbvio — reforçar)
  [Ecoville: Linha Sul-Oeste + carro essencial. Bigorrilho: Av. Vicente
   Machado + BRT Batel + 5 min a pé do centro comercial.]

H2: Infraestrutura e comércio (já existe — injetar 2-3 dados)
  [Shopping Barigui + Universidade Positivo + Condor/Muffato (Ecoville)
   vs Shopping Crystal + Pátio Batel + Rua Fernando Simas (Bigorrilho).
   Adicionar distância a escola IDEB top 10.]

H2: Lazer, natureza e vida social
  [Parque Barigui (Ecoville) vs Praça do Japão + Rua Fernando Simas
   (Bigorrilho). Teatro Guaíra a 10 min do Bigorrilho.]

H2: Perfil dos imóveis
  [Torre 20-35 andares 150-200m² com lazer de resort (Ecoville) vs
   edifício 10-20 and. 70-150m² mix anos 90-2020 (Bigorrilho).
   Dados de vagas, condomínio, IPTU — CRM FYMOOB.]

H2: Qual escolher se você é... (já existe — manter, enriquecer)
  [Subsections: família com filhos pequenos / casal sem filhos /
   jovem profissional / executivo home office / investidor. Cada um
   com 2-3 bullets + link pra landing.]

H2: Alternativas — bairros para considerar
  [Campo Comprido + Campina do Siqueira + Centro + Batel, 1 linha cada
   + links. REMOVER link pra Mercês (zero estoque).]

H2: Perguntas frequentes (FAQ — 6Q com schema FAQPage)
  [Perguntas 1-7 da seção 4, ajustadas pra combinar 5+6 em 1 item]

[Fechamento provocativo:
 "O Ecoville não é caro — é um nome fantasia que um grupo pequeno
  paga pra morar em torres de 200m² com Parque Barigui na porta.
  O Bigorrilho não é esnobe — é o preço de caminhar pra jantar no Batel
  sem pegar o carro. A pergunta certa não é qual é melhor. É: dos
  R$ 4.800/mês que o Bigorrilho custa a mais, você quer comprar
  caminhabilidade ou espaço?"]

[CTA contextual — /busca com filtro bairro=mossungue ou bigorrilho +
 contato WhatsApp Bruno]
```

---

## 9. Metadata (title, description, OG, URL slug)

### Title (≤55 chars)

**Atual:** `Ecoville vs Bigorrilho: Onde Morar em Curitiba?` (48 chars — OK, mas falta freshness + pergunta decisão).

**Propostas:**

- **A (54 chars):** `Ecoville vs Bigorrilho em Curitiba: Qual Escolher em 2026` ← 53 chars
- **B (51 chars):** `Ecoville ou Bigorrilho 2026: Comparativo com Dados` ← 50 chars
- **C (48 chars):** `Ecoville vs Bigorrilho: Comparativo Real 2026` ← 45 chars
- **D (55 chars):** `Ecoville ou Bigorrilho em Curitiba: Qual é Melhor em 2026` ← 55 chars
- **E (52 chars):** `Ecoville vs Bigorrilho: Qual Bairro Escolher em 2026` ← 51 chars

**Recomendado: E — `Ecoville vs Bigorrilho: Qual Bairro Escolher em 2026`** (51 chars).

Razão: mantém keyword primária **exata** ("ecoville vs bigorrilho") front-loaded, adiciona freshness ("2026") e pergunta direta ("qual bairro escolher") que ativa PAA. Não usa "Curitiba" no title (implícito na keyword + descrito no slug) pra caber abaixo de 55 chars. Keyword "ou" (variante) cabe no H2 pra capturar dupla intent. **Paralelo exato do padrão `batel-vs-agua-verde`** (consistência do cluster).

### Description (≤155 chars)

**Atual:** `Comparativo entre Ecoville e Bigorrilho em Curitiba: preços, infraestrutura, perfil de moradores e qual bairro escolher para cada estilo de vida.` (146 chars — OK tamanho, sem número, sem diferencial).

**Proposta (153 chars):** `Ecoville R$ 15.723/m² vs Bigorrilho R$ 19.124/m² em apto 3Q (CRM FYMOOB abr/26). Delta de R$ 645k rende R$ 4.800/mês em CDB. Veja qual combina.`

**Justificativa:** 2 números-âncora + amostra (autoridade) + cenário financeiro (diferencial único) + CTA implícito ("qual combina"). Dentro dos 155 chars. Paralelo ao padrão do post irmão.

### URL slug

**Atual:** `/blog/ecoville-vs-bigorrilho-curitiba`

**Manter.** Keyword-rich, preserva "vs" (variação mais buscada) + geo. Não adicionar ano (evergreen de comparação). Atualizar `dateModified` no schema.

### OG title / description

- **OG title:** `Ecoville vs Bigorrilho em Curitiba: Qual Bairro Escolher em 2026 (Com Dados CRM)`
- **OG description:** `Ecoville (Mossunguê) custa R$ 15.723/m² vs Bigorrilho R$ 19.124/m² em apto 3Q (CRM FYMOOB abr/26). A diferença num 3Q rende R$ 4.800/mês em CDB. Comparativo completo.`
- **OG image:** split 50/50 com foto torre Ecoville/Mossunguê (esquerda, Parque Barigui ao fundo) + Rua Fernando Simas Bigorrilho (direita) + overlay "R$ 15.723 vs R$ 19.124/m²" + "Quem vence?". Seguir padrão dos OGs recentes (commit 553b16c MCMV).

---

## 10. Schema.org

### BlogPosting (obrigatório)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Ecoville vs Bigorrilho: Qual Bairro Escolher em 2026",
  "description": "Ecoville R$ 15.723/m² vs Bigorrilho R$ 19.124/m² em apto 3Q (CRM FYMOOB abr/26). Delta de R$ 645k rende R$ 4.800/mês em CDB. Veja qual combina.",
  "image": "https://fymoob.com.br/blog/ecoville-vs-bigorrilho.webp",
  "datePublished": "2026-04-04",
  "dateModified": "2026-04-23",
  "author": {
    "@type": "RealEstateAgent",
    "@id": "https://fymoob.com.br/autores/bruno-cesar-almeida",
    "name": "Bruno César de Almeida",
    "jobTitle": "Corretor de Imóveis",
    "url": "https://fymoob.com.br/autores/bruno-cesar-almeida",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "CRECI/PR 24.494"
    }
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://fymoob.com.br/#organization"
  },
  "mainEntityOfPage": "https://fymoob.com.br/blog/ecoville-vs-bigorrilho-curitiba",
  "articleSection": "Comparativo de Bairros",
  "about": [
    {"@type": "Place", "name": "Ecoville, Curitiba"},
    {"@type": "Place", "name": "Mossunguê, Curitiba"},
    {"@type": "Place", "name": "Bigorrilho, Curitiba"}
  ]
}
```

### FAQPage (obrigatório — rich snippets)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Ecoville ou Bigorrilho: qual é melhor?", "acceptedAnswer": {"@type": "Answer", "text": "Depende do perfil. Bigorrilho vence em caminhabilidade, gastronomia e proximidade com Batel (R$ 19.124/m² mediano em apto 3Q, CRM FYMOOB abr/26, n=6). Ecoville/Mossunguê vence em espaço, lazer de resort e Parque Barigui na porta (R$ 15.723/m² mediano, n=6). A diferença de R$ 645 mil num 3Q equivalente, investida em CDB, rende R$ 4.800/mês — o tiebreaker objetivo é ter carro ou não."}},
    {"@type": "Question", "name": "Ecoville é um bairro oficial de Curitiba?", "acceptedAnswer": {"@type": "Answer", "text": "Não. Pela divisão oficial do IPPUC, Ecoville é um nome fantasia comercial criado pelo mercado imobiliário nos anos 2000. O polígono cobre principalmente o bairro Mossunguê e trechos de Campo Comprido e Seminário. No CRM da FYMOOB (abr/2026), 18 imóveis estão catalogados como Mossunguê e apenas 1 como Ecoville — o que o mercado chama de Ecoville é essencialmente Mossunguê."}},
    {"@type": "Question", "name": "Qual a diferença de preço entre Ecoville e Bigorrilho?", "acceptedAnswer": {"@type": "Answer", "text": "Bigorrilho custa cerca de 21% mais por metro quadrado em apartamento de 3 quartos equivalente. Mediana CRM FYMOOB abr/2026 (n=6 por bairro): Mossunguê/Ecoville R$ 15.723/m² (preço mediano R$ 3,03 mi, área priv. 192m²) vs Bigorrilho R$ 19.124/m² (R$ 3,74 mi, 191m²). Diferença média de R$ 645 mil, que aplicada em CDB 110% CDI com Selic 10,75% rende R$ 4.800/mês líquidos de IR."}},
    {"@type": "Question", "name": "Ecoville é seguro?", "acceptedAnswer": {"@type": "Answer", "text": "Sim, acima da média de Curitiba. Mossunguê (o bairro oficial do polígono Ecoville) está entre os bairros com baixos índices de crimes violentos em 2025 (SESP-PR), embora não chegue ao patamar de zero vítimas de Campina do Siqueira e Vila Izabel. O modelo de condomínio fechado com portaria 24h reduz crime patrimonial interno, mas não imuniza contra ocorrências externas — perfil de segurança muito similar ao do Bigorrilho."}},
    {"@type": "Question", "name": "Vale a pena morar no Ecoville ou no Bigorrilho?", "acceptedAnswer": {"@type": "Answer", "text": "Ecoville vale a pena para famílias com carro que priorizam espaço, prédio novo com lazer de resort e Parque Barigui na porta. Bigorrilho vale a pena para casais, jovens profissionais e quem valoriza caminhar pra jantar no Batel e usar menos o carro. Ambos são seguros e têm infraestrutura de alto padrão — a decisão é estilo de vida, não status."}},
    {"@type": "Question", "name": "Ecoville ou Bigorrilho para família com filhos?", "acceptedAnswer": {"@type": "Answer", "text": "Empate técnico. Ecoville oferece mais espaço (apartamentos de 150-200m² com varandas amplas), lazer completo no condomínio (piscina, playground, spa) e Parque Barigui a pé — ideal se você tem carro. Bigorrilho oferece escolas top a pé (Marista, Bom Jesus), vida de rua com segurança e proximidade com o Batel — ideal se você prioriza não depender de carro. O critério decisivo é o modelo de transporte da família."}}
  ]
}
```

### BreadcrumbList

`Home > Blog > Ecoville vs Bigorrilho: Qual Bairro Escolher em 2026` — já existe no layout do blog, só confirmar `dateModified`.

---

## 11. Fontes consultadas

### Top competitors (análise estrutural)

- [Os 15 melhores bairros de Curitiba para morar — QuintoAndar](https://www.quintoandar.com.br/guias/cidades/melhores-bairros-de-curitiba/)
- [Bairros de Curitiba: os 10 melhores — MySide](https://myside.com.br/guia-curitiba/bairros-curitiba-pr)
- [Melhores bairros de Curitiba para morar em 2026 — Portas](https://portas.com.br/mercado-imobiliario/guia-de-localizacoes/os-melhores-bairros-para-morar-em-capitais-do-brasil-guia-completo-de-curitiba/)
- [13 melhores bairros de Curitiba — CasaPrates](https://casaprates.com.br/13-melhores-bairros-para-morar-em-curitiba/)
- [Bairros nobres de Curitiba — QuintoAndar](https://www.quintoandar.com.br/guias/cidades/bairros-nobres-de-curitiba/)

### Dados / fontes primárias (MUST LINK no post)

- [Índice FipeZAP Residencial — Fipe](https://www.fipe.org.br/pt-br/indices/fipezap/)
- [SESP-PR — Estatísticas de criminalidade](https://www.seguranca.pr.gov.br/Estatisticas)
- [IPPUC — Divisão oficial de bairros de Curitiba](https://ippuc.org.br/)
- [Calculadora Selic / CDB — Banco Central](https://www.bcb.gov.br/controleinflacao/taxaselic)
- **Dado primário FYMOOB (exclusivo):** CRM FYMOOB snapshot 2026-04-24 — `docs/research/snapshots/2026-04-24.json` (n=242 imóveis ativos: 18 em Mossunguê, 9 em Bigorrilho, 1 em Ecoville)

### Internas (FYMOOB — referência cruzada)

- `content/blog/ecoville-vs-bigorrilho-curitiba.mdx` (versão atual — objeto do rewrite)
- `docs/seo/serp-analysis-batel-vs-agua-verde.md` (padrão estrutural irmão direto)
- `docs/seo/serp-analysis-melhores-bairros.md` (competitor intel pilar)
- `content/blog/batel-vs-agua-verde-curitiba.mdx` (irmão estrutural)
- `content/blog/quanto-custa-morar-batel-curitiba.mdx` (irmão temático — cross-link seção Bigorrilho)
- `content/blog/melhores-bairros-curitiba-2026.mdx` (pilar do cluster)
- `content/blog/preco-metro-quadrado-curitiba-bairro.mdx` (pilar de dado)
- `content/blog/mercado-imobiliario-curitiba-2026.mdx` (pilar macro)
- `content/blog/melhores-bairros-familias-curitiba.mdx` (irmão recorte família)
- `src/app/imoveis/[bairro]/page.tsx` (validador de landing via `generateStaticParams`)
- `docs/research/snapshots/2026-04-24.json` (fonte de dados primária FYMOOB)

---

## Notas finais para o rewriter

1. **TÍTULO:** usar `Ecoville vs Bigorrilho: Qual Bairro Escolher em 2026` (51 chars). Preserva keyword primária exata + freshness. Não colocar "Curitiba" no title pra ficar ≤55.
2. **GAP ÚNICO #1 — "Ecoville é Mossunguê":** explicar no lead + H2 dedicado. Primeiro post do SERP a fazer isso com dado (CRM FYMOOB 18 Mossunguê vs 1 Ecoville literal). Critério E-E-A-T + transparência Tier 1 (IPPUC).
3. **GAP ÚNICO #2 — Cenário financeiro do delta R$ 645k = R$ 4.800/mês em CDB:** box destacado no H2 Preço. Inverso do post Batel-ag: aqui o Bigorrilho é o caro, o espaço é do Ecoville. Nenhum competidor calcula.
4. **GAP ÚNICO #3 — Discrepância apto vs casa no polígono Ecoville (do brief do usuário):** H2 dedicado explicando que comparar "casa no Ecoville vs Bigorrilho" não faz sentido (Bigorrilho é 99% apto). Pra casa, a comparação certa é Campo Comprido/Santa Felicidade. Isso responde a uma confusão real do leitor.
5. **DADO FYMOOB CRM:** usar amostra declarada ("n=6 apto 3Q em Mossunguê, abr/2026"). Paralelo ao protocolo do Research Protocol seção 4. **FYMOOB é a única imobiliária de CWB a mostrar n amostra por bairro — moat editorial.**
6. **REMOVER LINK `/imoveis/merces`** do parágrafo "Alternativas a considerar" (post atual). Mercês tem 1 imóvel = landing não gera = 404. Substituir por `/imoveis/campina-do-siqueira` (8 imóveis, melhor alternativa premium) ou `/imoveis/campo-comprido` (7, alternativa acessível).
7. **LINK `/imoveis/mossungue` (não `/imoveis/ecoville`)**: landing Ecoville não existe (1 imóvel só). Linkar Mossunguê e educar leitor na 1ª menção ("no CRM, Ecoville está catalogado como Mossunguê — 18 imóveis ativos").
8. **Mínimo 7 internal links** distribuídos: 2 landings principais (Mossunguê + Bigorrilho) + 4 alternativas + 1-2 cross-posts (`batel-vs-agua-verde`, `preco-m2`, `melhores-bairros-2026`). Variar âncoras.
9. **CRECI/PR 24.494 no schema BlogPosting** — E-E-A-T alto, competidores não têm.
10. **Tabela HTML `<table>` (não markdown)** nas 3 tabelas principais (comparativa geral + preço compra + aluguel) — formato preferido do featured snippet.
11. **`<MethodologyBox>` + `<Changelog>` no MDX** (Research Protocol obrigatório — componentes em `src/lib/mdx-components.tsx`).
12. **`updatedAt` + changelog inicial** — post evergreen, alterações semestrais viram freshness signal.
13. **YMYL:** todo claim ("mais seguro", "21% mais caro", "empate família") TEM que ter número + fonte ao lado ou sair. Post atual tem zero número com fonte — é 100% qualitativo, **pior que o batel-vs-ag pré-rewrite**.
14. **Cross-link obrigatório pro post irmão `/blog/batel-vs-agua-verde-curitiba`** — formam cluster "comparativo de bairros nobres CWB". Anchor: *"comparamos Batel e Água Verde em detalhe"* na menção do Batel (seção Bigorrilho).
