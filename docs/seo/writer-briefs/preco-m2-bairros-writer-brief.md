# Writer Brief — Post Preço m² por Bairro Curitiba 2026

> **Arquivo alvo:** `content/blog/preco-metro-quadrado-curitiba-bairro.mdx`
> **Status:** brief de voz e craft para pilar DATA-DRIVEN de ranking de 30+ bairros. Não substitui data specialist (FipeZap + Loft + Ademi-PR) nem o local-Curitiba specialist.
> **Autor do brief:** Writer / Craft Specialist — FYMOOB editorial team
> **Data:** 2026-04-23
> **Dependência:** Manual editorial (`docs/seo/editorial-style-guide.md`). Este brief VAI DEEPER no desafio específico de **lista longa não virar cansativa** — território onde pilares data-driven morrem em tabela-Wikipedia.
> **REGRA DE OURO:** todos os números neste brief são `{{PLACEHOLDER}}`. Writer NÃO inventa preço de m², percentual de valorização nem posição no ranking. Dados vêm do data specialist (FipeZap abril/2026 + Loft ao vivo).

---

## Por que este post é um animal diferente

Os 3 posts rewrite anteriores (MCMV, financiamento, mercado, ITBI) trabalhavam em cima de UMA tese central + 3-6 números-âncora. Este post trabalha em cima de **30+ itens que precisam virar narrativa**. Tem duas tensões simultâneas:

1. **SEO demanda completude**: a query "preço m² curitiba bairro" recompensa cobertura de 25+ bairros. Se cortar pra 5, perde long-tail.
2. **Retenção demanda narrativa**: lista de 30 parágrafos "Batel R$ X, Bigorrilho R$ Y, Ecoville R$ Z..." = leitor escaneia a tabela e sai em 40 segundos. Zero dwell time, zero CTR interno, zero conversão pra `/busca`.

**A solução não é mais conteúdo. É mais arquitetura.** Top writers (FipeZap, MySide, QuintoAndar, Gazeta do Povo) resolvem isso com uma de três estruturas — e nenhuma delas é "tabela gigante + parágrafo por item". Esse brief define qual FYMOOB adota e por quê.

---

## Desafio central: lista longa sem cansar

### A arquitetura recomendada — HÍBRIDO CLUSTER + SPINE

Três camadas. Cada uma cumpre uma função diferente de retenção:

**Camada 1 — Espinha tabular no topo (scan-first)**
Uma tabela-mãe com os 30 bairros ordenados por preço. Serve o leitor que veio com intenção "só quero ver o meu bairro na lista". Ele encontra em 5 segundos, fecha a página — mas antes disso, deixa um sinal de dwell time pro Google (tabela grande = tempo de parse).

**Camada 2 — Clusters por faixa de preço (depth-second)**
4 clusters: Premium (>R$ 12k), Alto (R$ 8-12k), Médio (R$ 5-8k), Acessível (<R$ 5k). Cada cluster = 1 H2 com:
- Mini-tabela do cluster (5-10 bairros)
- 1 parágrafo editorial abrindo o cluster (o que define essa faixa? que tipo de comprador?)
- 2-3 micro-histórias de bairros-chave do cluster (driver local: "Ecoville subiu porque abriu o Park Shopping", "Boa Vista está entrando na fila porque Linha Verde encurtou acesso ao Centro")
- Fechamento do cluster que puxa pro próximo (cliffhanger)

**Camada 3 — Narrativa de valorização no meio (story-third)**
Depois do cluster Médio, QUEBRAR a ordem descendente de preço com um H2 diferente: **"Os 5 bairros que MAIS VALORIZARAM em 2026"**. Isso:
- Rompe o ritmo repetitivo (o leitor estava em modo escaneamento, agora vê ranking diferente)
- Cria interesse acionável (quem ainda pode comprar com upside?)
- Linka pra landings `/imoveis/[bairro]` com contexto de oportunidade, não de preço

**Por que esse híbrido funciona:** FipeZap usa tabela-espinha pura (muito seca). MySide usa parágrafo por bairro (muito cansativo). QuintoAndar usa tabela + subseção por bairro (repete o nome do bairro 2x, entedia). O híbrido FYMOOB combina scan-speed da tabela com narrativa dos clusters e com a virada do "quem valorizou mais" — três gatilhos de retenção em um só post.

### Por que NÃO as outras arquiteturas

| Arquitetura | Quem usa | Problema |
|---|---|---|
| Tabela gigante única | FipeZap, Bemparaná | Leitor escaneia em 20s e sai. Zero dwell, zero CTR interno. |
| Parágrafo por bairro (1-30) | MySide, QuintoAndar | Monotonia em 5 minutos. Repete o nome do bairro 3x por seção. Leitor sai no 8º bairro. |
| Ranking descendente de preço puro | Quase todos | O cluster top (5 premium) rouba toda atenção. Bairros médios viram deserto. |
| Tabela + "o que oferece cada bairro" | Sienge, BemBrasil | Descrição turística ("Batel tem DNA gastronômico") mata autoridade de dados. |

---

## Voz-alvo (1 parágrafo)

Data-driven como **FipeZap boletim mensal** (número primeiro, adjetivo zero), com narrativa de **Exame setor imobiliário** (transforma ranking em tensão: "quem subiu mais rápido", "onde o dinheiro do comprador ainda rende"), ancorada em **operacional FYMOOB** (a gente vende imóvel toda semana em {{BAIRRO_X}}, viu o tempo de venda cair de 6 meses pra 45 dias, sente o preço antes de sair o FipeZap do mês). Não é voz de portal de classificados ("conheça os charmosos bairros de Curitiba"), não é voz de release da incorporadora ("cenário de valorização estrutural"), não é voz de Wikipedia municipal ("o bairro foi fundado em 19XX e tem XYZ habitantes"). Quando cita R$, mostra a faixa. Quando diz "valorizou", mostra o período. Quando compara dois bairros, nomeia o driver do gap ("Mercês encostou no Batel porque Lei 16.361/2024 travou torre nova lá").

---

## 5 openings possíveis (com PLACEHOLDERS)

Todas seguem o manual editorial (Regras 1-3). Todas pedem número validado pelo data specialist. Todas em 2-4 frases.

### Variante A — Number Drop por gap (RECOMENDADA)

> *"A diferença entre o m² mais caro e o mais barato de Curitiba é de {{FATOR_GAP}}x. O Batel fechou abril/2026 em R$ {{BATEL_M2}}, o {{BAIRRO_MAIS_BARATO}} em R$ {{BAIRRO_BARATO_M2}} — e tem bairro subindo {{TOP_VALORIZACAO}}% em 12 meses no meio do caminho. Este é o mapa completo dos 30 bairros que a gente vende toda semana."*

**Por quê:** 1ª frase = número-choque que dá escala à cidade inteira. 2ª frase empilha os dois extremos + teaser de valorização (cria curiosidade: quem é esse terceiro?). 3ª frase entrega autoridade local + promessa de cobertura. Template 1 do style guide (Number Drop).

### Variante B — Contradição: caro não é sempre valorização

> *"Batel é o bairro mais caro de Curitiba há {{ANOS}} anos. Só que em 2026, não é ele que mais valoriza — e três bairros fora do top 5 de preço estão subindo mais que o dobro do ritmo do Batel. Este ranking mostra os dois lados: quanto custa o m² em cada bairro, e onde o dinheiro ainda rende."*

**Por quê:** Template 2 (Mito-quebra). Abre com afirmação óbvia, derruba com dado, promete payoff dual (preço + valorização). Retenção: o leitor agora precisa ler pra saber quais são os 3.

### Variante C — Cena do comprador

> *"Você tem R$ {{ORCAMENTO_TIPICO}} pra gastar num apartamento em Curitiba. Em abril de 2026, isso te compra um {{M2_TIPO_A}}m² no Batel, um {{M2_TIPO_B}}m² no Bigorrilho ou um {{M2_TIPO_C}}m² no Portão. Qual desses três vai se valorizar mais nos próximos 12 meses? O ranking responde."*

**Por quê:** Template 3 (Cena). Abre com carteira do leitor, não com média do mercado. Número funciona como tradução de poder de compra, não como estatística abstrata. Pergunta no fim = cliffhanger orgânico.

### Variante D — Autoridade local

> *"A gente fecha imóvel em 23 dos 75 bairros de Curitiba. A tabela que sai todo mês do FipeZap é útil, mas falta o que a gente vê antes do número: o tempo de venda caiu pela metade no Campo Comprido desde janeiro, o Ecoville passou o Cabral em preço sem alarde, o {{BAIRRO_X}} está descolando. Este é o preço por bairro em abril de 2026 — com o que o dado não mostra."*

**Por quê:** Template 5 (Autoridade Local). Abre com prova de cobertura concreta (23/75 bairros). Empilha 3 observações de campo que o FipeZap não traz. Promete o "o que o dado não mostra" — diferencial FYMOOB puro.

### Variante E — Notícia quente

> *"O m² médio de Curitiba passou de R$ {{M2_MEDIO}} em abril de 2026 — a cidade é a {{POSICAO_RANKING}}ª mais cara entre as capitais monitoradas pelo FipeZap. Dentro da capital, a diferença entre o bairro mais caro e o mais barato é de {{FATOR_GAP}}x. Aqui estão os 30 bairros em ordem — e os 5 que mais valorizaram em 12 meses."*

**Por quê:** Template 4 (Notícia + Consequência). Abre com ranking nacional, puxa pra ranking local em 2 frases. Funciona se o FipeZap recém-divulgado mostrar número surpreendente.

**Recomendação:** **Variante A** se o data specialist trouxer gap forte (≥3x). **Variante B** se a lista de top valorização for surpreendente (ex: Mercês > Batel). **Variante C** se o post for otimizado pra busca "apartamento por X reais curitiba". **Variante D** se o pilar for posicionamento de autoridade local puro.

---

## Como contar "ranking" sem virar lista — 5 padrões validados

### Padrão 1 — Abrir cluster com pergunta, não com rótulo

**DON'T:** `## Bairros premium (R$ >12k/m²)`
**DO:** `## Quem banca R$ 12 mil por m²? Os 5 bairros premium de Curitiba`

Pergunta + número = H2 SEO-válido + isca de rolagem (Regra 5). Leitor lê o título pensando "eu banco? eu conheço quem banca?".

### Padrão 2 — Micro-história apenas nos bairros-chave (não em todos)

Dentro do cluster Premium, 5 bairros. **3 ganham micro-história** (1 parágrafo curto com driver local: "Ecoville subiu 8% porque Park Shopping + Lei 16.361 acelera torre nova"). **2 ficam só no dado** (aparecem só na mini-tabela do cluster). **Isso é o segredo.** Não é preciso narrar cada bairro — só os que têm driver editorial forte.

Fórmula:
- Batel, Bigorrilho, Ecoville = micro-história (drivers conhecidos)
- Cabral, Alto da XV = só mini-tabela (dado suficiente)

### Padrão 3 — Transições de cluster puxam pra próximo (cliffhanger)

Padrão Exame/Nubank: **último parágrafo do cluster abre o próximo**, não fecha o atual.

**DON'T:** *"Esses são os bairros premium de Curitiba."*
**DO:** *"Mas pelo mesmo valor de 70m² no Batel, dá pra comprar 110m² num bairro que subiu 9% em 2026 — e fica a 8 minutos dali. É o próximo cluster."*

Aplica Regra de retention do style guide (micro-cliffhanger entre H2s).

### Padrão 4 — Number drop no meio do cluster

Dentro de cada cluster, **uma frase curta isolada com cálculo concreto**. Padrão InfoMoney:

> *"Faz a conta: R$ 12.000/m² × 70m² = R$ 840 mil. Num financiamento de 30 anos, R$ 7.100/mês em prestação."*

Isso transforma a tabela seca em impacto no bolso do leitor. Aplica Regra 8 (Number Drop).

### Padrão 5 — Quebrar ordem descendente com o "ranking secundário"

Depois do cluster Médio, inserir **H2 completamente diferente**:

> *"## Os 5 bairros que mais valorizaram em 2026 (e não são os mais caros)"*

Lista de 5 bairros ordenada por **% de valorização**, não por preço. Isso:
- Rompe o ritmo (leitor em modo escaneamento volta a ler)
- Cria o segundo gancho do post (o primeiro é preço, o segundo é upside)
- Dá razão pra internal link pras landings `/imoveis/[bairro]` com verbo "valorizou 9%", não "apartamentos à venda"

Padrão extraído de: Exame ("os 5 que mais subiram"), FipeZap mensal ("variação 12m").

---

## Transições entre bairros (pra 10-15 comentários curtos)

Style guide Regra 15 bane "dessa forma", "por outro lado", "em contrapartida", "já o bairro X...". Aqui está o repertório específico pra cadeias de 2-3 bairros em sequência.

| # | Transição | Quando usar | Exemplo |
|---|---|---|---|
| 1 | **"Uma quadra pra dentro, [bairro]."** | Bairros limítrofes (geografia como conexão) | *"Uma quadra pra dentro, Bigorrilho cobra R$ {{X}} — 20% a menos."* |
| 2 | **"Na faixa seguinte, [bairro]."** | Transição intra-cluster | *"Na faixa seguinte, Juvevê entra com R$ {{X}}."* |
| 3 | **"Pelo mesmo m², no [bairro], dá {{X}}m² a mais."** | Comparação de poder de compra | Funciona como cálculo prático |
| 4 | **"Aí a régua muda."** | Transição entre clusters | *"Aí a régua muda. Abaixo de R$ 8k, a conta do m² vira outra."* |
| 5 | **"O Mercês fica num ponto interessante."** | Introduzir bairro-chave com micro-história | Prepara pra driver local |
| 6 | **"Batel manda, Bigorrilho segue de perto."** | Hierarquia sem "em primeiro / em segundo" | Voz natural de colunista |
| 7 | **"Quem banca o Batel e quer 15% de desconto vai pro Ecoville."** | Perfil de comprador como transição | Voz de corretor real |
| 8 | **"Caiu da casa dos 10k? Entrou o Portão."** | Virada de cluster com pergunta-resposta | Energia curta, ritmo alto |
| 9 | **"Logo ali, {{BAIRRO}} faz a ponte."** | Bairros intermediários entre clusters | Geografia + faixa de preço |
| 10 | **"O salto de preço pra essa faixa é de R$ {{X}}/m²."** | Transição de cluster ancorada em número | Dado > adjetivo |

**Bônus — 3 frases-punch curtas pra quebrar lista (Regra 7):**
- "A conta não fecha no papel."
- "Aí aperta."
- "E o tempo de venda conta."

**Anti-padrão banido neste post:** nunca abrir parágrafo com "Já o bairro X...". É a muleta dos posts de ranking e cansa em 5 usos.

---

## Voz FYMOOB específica pra este post

Diferencial único: **a gente fecha imóvel em {{N_BAIRROS}} bairros de Curitiba toda semana.** Isso significa que a gente tem 3 coisas que o FipeZap não tem:

1. **Tempo de venda por bairro em tempo real** — o FipeZap mede preço, não liquidez. A gente sente quando o Ecoville passa de 6 meses pra 45 dias de tempo médio de venda. Isso é o sinal antecipado que preço vai subir.
2. **Sabe em que faixa de m² o comprador está buscando** — quando 30% do WhatsApp da semana vira "quero até R$ 600 mil no Água Verde ou próximo", a gente vê gap real antes do FipeZap.
3. **Conhece o estoque — quantos imóveis a gente tem ativos em cada bairro.** O MCP da API Loft permite contar. Se a gente tem 23 imóveis ativos no Bigorrilho e 2 no Cabral, isso diz muito sobre a oferta real do bairro.

### 3 marcadores práticos da voz FYMOOB nesse post

1. **Observação de campo ancorada em bairro**: *"A gente vende Ecoville toda semana — em 2026, o tempo médio caiu de 6 meses pra 45 dias. Foi o primeiro sinal de que o m² ia passar o Cabral."*
2. **Estoque real do CRM**: *"Em abril/2026, a FYMOOB tem {{N_IMOVEIS}} imóveis ativos no Bigorrilho. No Cabral, {{N_MENOR}} — e isso explica por que o Cabral aparece estável mesmo em ciclo de alta."*
3. **Régua de decisão prática**: *"Se seu orçamento é R$ 500 mil, o Batel tá fora. A conta que vale é Água Verde ou Portão."*

### Anti-voz (se aparecer, apaga)

- *"Curitiba é uma cidade charmosa com bairros encantadores..."* → voz de portal de turismo. Bane.
- *"Cada bairro tem suas particularidades e oferece experiências únicas..."* → zero informação, pura gordura.
- *"A FYMOOB acredita que o mercado de Curitiba..."* → ninguém quer saber no que a empresa acredita. Mostre o dado.
- *"Confira abaixo os preços médios de cada bairro:"* → transição preguiçosa. Abre direto com o número-choque do cluster.

---

## Estrutura H2 recomendada

Ordem dos H2s desenhada pra retenção + SEO simultâneos. Cada H2 cumpre uma função específica — não é preenchimento.

1. **`## Qual é o preço médio do m² em Curitiba em abril de 2026?`**
   Responde a query PAA com 1 frase + mini-tabela de top-10 cidades (Curitiba vs São Paulo vs Floripa vs Porto Alegre). Featured snippet candidate.

2. **`## Tabela completa: m² em 30 bairros de Curitiba (ordem decrescente)`**
   A espinha tabular. Serve o leitor-scan. 30 linhas, 4 colunas (bairro, m² médio, faixa, variação 12m). Frase in-line abaixo: *"A coluna que importa é a última: variação em 12 meses."*

3. **`## Quem banca R$ 12 mil/m²? Os 5 bairros premium de Curitiba`**
   Cluster Premium. Micro-histórias de Batel, Bigorrilho, Ecoville. Cabral e Alto da XV só na mini-tabela.

4. **`## A faixa dos R$ 8-12 mil: onde o classe A ainda compra`**
   Cluster Alto. Micro-história de Mercês (já passou Batel em valorização?) + Água Verde. Outros na mini-tabela.

5. **`## Os 5 bairros que MAIS VALORIZARAM em 2026`**
   **[QUEBRA DE RITMO]** Ranking por variação, não preço. Puxa leitor de volta pro post. Internal links pras landings.

6. **`## A zona sweet-spot: m² entre R$ 5-8 mil em Curitiba`**
   Cluster Médio. Micro-história de Portão (metrô BRT chegando?), Boa Vista (Linha Verde). Transição pro cluster seguinte.

7. **`## Onde R$ 400 mil ainda compra um apartamento de 80m² em Curitiba`**
   Cluster Acessível. Novo Mundo, Xaxim, CIC. Voz: comprador com orçamento limitado, não "bairros populares".

8. **`## O que aumenta (ou derruba) o m² de um imóvel específico`**
   Fatores que movem o preço dentro do bairro: andar, vaga, sol, idade, lazer. Trecho já existe no post atual, só reescrever voz.

9. **`## Curitiba cara ou barata? Comparação com capitais brasileiras`**
   Mini-tabela Curitiba × SP × BH × POA × Floripa. Resposta curta: 8ª mais cara entre 56 monitoradas. Boa pro SEO long-tail.

10. **`## Perguntas frequentes sobre preço do m² em Curitiba`**
    FAQ estruturado (PAA do Google). Pelo menos 5 perguntas reais.

11. **[CTA final contextual]** — próximo passo, não "fale conosco".

---

## Frases-proibidas (com substitutas)

Extensão da Regra 15 específica pra posts de ranking por preço. Todas vistas em posts de concorrentes FYMOOB e banidas aqui.

| Proibida | Substituta natural |
|---|---|
| "Confira abaixo a tabela de preços..." | [apaga — entra direto com "A tabela mostra X bairros. O leitor olha a última coluna."] |
| "Curitiba é uma cidade que oferece..." | [apaga abstrato — "Curitiba tem 75 bairros. Este post cobre 30."] |
| "Os bairros de Curitiba apresentam grande diversidade..." | [apaga — "Diferença de {{FATOR}}x entre o mais caro e o mais barato."] |
| "Vale destacar que o mercado..." | [apaga sempre (Regra 15)] |
| "Já o bairro [X], por sua vez,..." | [substitui por transição da tabela acima: "Uma quadra pra dentro, [X]" ou "Pelo mesmo m², [X]"] |
| "Em contrapartida," / "Por outro lado," | [apaga — usa ponto final. Se precisar virar o argumento, "Só que {{fato}}."] |
| "É importante lembrar que o preço varia..." | *"A faixa é {{X}}-{{Y}}/m² dentro do próprio bairro. Idade, andar, vaga movem o número."* |
| "Conheça os bairros mais procurados..." | [apaga voz de revista] |
| "Bairro nobre/charmoso/tradicional" | [apaga adjetivos — mostra o m², o tempo de venda, o driver] |
| "O bairro se destaca por..." | [apaga — verbo ativo concreto: "Ecoville subiu 8% em 12 meses."] |
| "Ideal para quem busca..." | [apaga público-alvo abstrato. Se for falar de comprador, nomeie: "Família com dois filhos e R$ 600 mil de orçamento."] |
| "Uma das melhores opções de investimento..." | [apaga — mostre yield, valorização ou tempo de venda. Nunca afirme "melhor".] |
| "Valorização expressiva/significativa" | *"+{{X}}% em 12 meses (FipeZap, abril/2026)"* |
| "Um dos bairros mais valorizados..." | *"{{N}}º em valorização de Curitiba em 12 meses"* |
| "Cenário de oportunidades" | [apaga — mostre a oportunidade concreta] |
| "Continua sendo referência" | [apaga — se é referência, o número prova] |

---

## Lide proposto (3 variantes com PLACEHOLDERS)

> Todas as variantes pedem dados do FipeZap abril/2026 + Loft ao vivo. Escolher final depende do que o data specialist trouxer.

### Variante A — Gap extremo (RECOMENDADA)

> *"A diferença entre o m² mais caro e o mais barato de Curitiba é de {{FATOR_GAP}}x. O Batel fechou abril/2026 em R$ {{BATEL_M2}}, {{BAIRRO_BARATO}} em R$ {{BAIRRO_BARATO_M2}} — e no meio do caminho tem bairro subindo {{TOP_VALORIZACAO}}% em 12 meses. Este é o mapa completo dos 30 bairros que a gente vende toda semana, com o cálculo que o FipeZap não faz."*

**Por quê:** Template 1 (Number Drop). 1ª frase = escala inteira em 1 número. 2ª frase = dois extremos + teaser do 3º ângulo (valorização). 3ª frase = autoridade local + promessa. Funciona como capa de post pilar.

### Variante B — Mito-quebra do caro vs. valorização

> *"Batel é o bairro mais caro de Curitiba há {{ANOS}} anos. Só que em 2026, não é ele que mais valoriza — {{BAIRRO_TOP_VALORIZACAO}} subiu {{X}}%, quase o dobro do ritmo do Batel. Este ranking entrega os dois lados da conta: quanto custa o m² hoje, e onde o dinheiro ainda rende."*

**Por quê:** Template 2 (Contradição). Derruba suposição do leitor na 2ª frase. Promete cobertura dual (preço + ROI). Puxa retenção pro ranking secundário.

### Variante C — Poder de compra concreto

> *"Com R$ 500 mil no bolso em abril/2026, você compra {{M2_BATEL}}m² no Batel, {{M2_BIGORRILHO}}m² no Bigorrilho, {{M2_PORTAO}}m² no Portão — ou {{M2_NOVO_MUNDO}}m² no Novo Mundo. Qual desses vai valorizar mais nos próximos 12 meses? Aqui está o ranking com a resposta."*

**Por quê:** Template 3 (Cena). Abre no orçamento típico do leitor de Curitiba. Transforma m² abstrato em poder de compra real. Pergunta final = cliffhanger orgânico que puxa pro post todo.

**Recomendação:** **Variante A** pra autoridade-pilar (posicionamento SEO). **Variante C** pra CTR mobile (orçamento concreto mobiliza mais). **Variante B** se a história de valorização for surpreendente.

---

## Retention tricks (pilar tem 2000+ palavras — como não perder leitor)

Este é o ponto crítico. Pilar data-driven de 2500 palavras com 30 bairros tem 4 cliffs clássicos. Defesa em cada um:

### Cliff 1 — Depois da tabela-espinha (parágrafo 3-4)

**Risco:** leitor veio pela query "preço m² curitiba", achou o bairro dele na tabela, sai. Zero dwell.

**Defesa:** terminar o H2 da tabela com cliffhanger DUPLO:

> *"Mas a tabela não conta a história inteira. Três coisas ela esconde: o TEMPO DE VENDA, a VARIAÇÃO em 12 meses, e quem vai ter passado quem até outubro. Começa pelos premium."*

Promete 3 payoffs específicos. Leitor que achou só o preço volta a rolar.

### Cliff 2 — Meio do cluster Alto (parágrafo 10-12)

**Risco:** leitor já viu 10-12 bairros, entrou em modo escaneamento puro.

**Defesa:** **QUEBRA DE RITMO** com o H2 "Os 5 bairros que mais valorizaram em 2026". Ranking por % de valorização rompe a ordem descendente de preço. Leitor volta a prestar atenção porque a régua mudou.

Bônus: aqui é onde cabe a frase-punch curta:
> *"Não é o preço que mostra onde vale comprar. É a variação."*

### Cliff 3 — Entre clusters Médio e Acessível (parágrafo 18-20)

**Risco:** leitor dos bairros premium/alto já saiu, leitor dos acessíveis ainda não chegou. Zona de deserto.

**Defesa:** transição numérica ancorada no bolso:

> *"Abaixo de R$ 5 mil/m², a conta vira outra: R$ 400 mil compram 80m². Entra na faixa do MCMV ampliado (faixa 4, até R$ 2,25 milhões). É o cluster onde o primeiro imóvel morava."*

Cria ponte com outro post (MCMV) + contextualiza faixa em poder de compra real.

### Cliff 4 — Antes do CTA final (parágrafo 35+)

**Risco:** leitor rolou até o FAQ, já pegou o que queria. Fecha antes do CTA.

**Defesa:** **closing com régua decisória**, não resumo.

> *"Três perguntas antes de assinar contrato em qualquer bairro de Curitiba:*
> *1. Qual o tempo de venda médio desse bairro nos últimos 60 dias?*
> *2. Qual a variação do m² em 12 meses (FipeZap) e em 24 meses?*
> *3. Quantos imóveis similares ao que você viu estão no estoque hoje?*
>
> *Se o corretor não responder as três em 5 minutos, peça que vá até a FYMOOB. A gente responde em 5 minutos — é o nosso trabalho toda semana."*

**Regra-ritmo válida em TODO o post:** cada 4 frases longas, 1 frase curta. Alternância 3-1-3 (Regra 4). Dentro dos clusters, as micro-histórias têm 3-5 frases, as mini-tabelas quebram o ritmo de prosa.

---

## Closing — como fechar um pilar de 30 itens sem resumir

### Template recomendado

> *"Três perguntas antes de assinar contrato em qualquer bairro:*
> *1. Qual o tempo de venda médio nesse bairro nos últimos 60 dias?*
> *2. Qual a variação do m² em 12 meses (FipeZap)?*
> *3. Quantos imóveis similares ao que você viu estão no estoque ativo agora?*
>
> *A tabela acima responde a primeira pergunta — mas o número muda toda semana. [Ver imóveis ativos agora](/busca). Se a diferença entre o m² médio do bairro e o preço pedido passa de 15%, peça uma segunda opinião. É pra isso que a gente está aqui."*

**Por quê funciona:**
- 3 perguntas operacionais concretas (padrão Nubank/MySide).
- Réua numérica (+15% → opinião) substitui "consulte um especialista".
- Última frase é soft-CTA contextual, não grito.
- Zero "concluindo", "como vimos", "esperamos que tenha ajudado".

### Anti-modelo (extraído do post atual — BANIR)

O post atual **não tem closing de post**, só 2 CTABoxes genéricos. Isso é o problema:

> *"Procurando imóveis em Curitiba? Explore nosso catálogo de imóveis à venda e para alugar em Curitiba e região."*

→ Zero contexto, zero pista do que fazer com o conteúdo que acabou de consumir. Fechamento de cartão de loja, não de pilar.

---

## Checklist de voz — antes de mandar pro review final

Específico deste post. Adicional ao checklist geral do style guide.

- [ ] Arquitetura híbrida aplicada: espinha-tabular + 4 clusters + ranking de valorização?
- [ ] Ranking de valorização (H2 secundário) aparece DEPOIS do cluster Alto, quebrando ordem de preço?
- [ ] No máximo 3 bairros por cluster ganharam micro-história (demais só em mini-tabela)?
- [ ] Zero parágrafo começa com "Já o bairro X..."?
- [ ] Transições tiradas da tabela acima (1-10)?
- [ ] Todo `{{PLACEHOLDER}}` foi substituído por número validado pelo data specialist (FipeZap + Loft)?
- [ ] Toda variação % tem período explícito ("12 meses", "abril/2026")?
- [ ] Toda fonte (FipeZap, Ademi-PR, Sinduscon-PR) aparece com link embutido no meio da frase?
- [ ] Voz "a gente" aparece no máximo 2-3x, sempre em observação de campo concreta?
- [ ] Cliff 1, 2, 3, 4 têm cliffhanger / quebra de ritmo / régua numérica aplicada?
- [ ] Fechamento dá 3 perguntas operacionais, NÃO resume?
- [ ] Internal links pras landings `/imoveis/[bairro]` usam verbo de ação ("valorizou X%", "subiu da posição 12 pra 8"), não "ver imóveis no X"?
- [ ] Tempo de venda + estoque ativo aparecem pelo menos 1x cada (diferencial FYMOOB)?
- [ ] FAQ final cobre 5 perguntas PAA reais (rodar query "preço m² curitiba" no Google)?
- [ ] H2s são perguntas ou promessas concretas, nunca rótulos tipo "Bairros premium"?

---

## Referências (URLs + data de consulta: 2026-04-23)

**Tier 1 — como top writers fazem ranking bem (voz + arquitetura):**
- [FipeZap — metro quadrado Curitiba (arquitetura "tabela-espinha + histórico")](https://www.fipe.org.br/pt-br/indices/fipezap/) — lição: tabela mãe serve scan, histórico serve autoridade. Falta narrativa editorial — pegar o oposto.
- [Exame — bairros mais caros Brasil (arquitetura "tabela + subseção por item")](https://exame.com/mercado-imobiliario/) — lição: comentário entre items é bom, mas repete o nome do bairro 2x. Evitar.
- [MySide — bairros mais caros de Curitiba 2026](https://myside.com.br/guia-curitiba/bairros-mais-caros-curitiba-pr) — concorrente direto na SERP. Lição: voz turística-aspiracional ("charme", "DNA gastronômico") mata autoridade de dados. NÃO copiar voz, copiar SEO structure.
- [QuintoAndar — 10 bairros mais caros de Curitiba](https://www.quintoandar.com.br/guias/dados-indices/bairros-mais-caros-de-curitiba/) — lição: tabela + descrição por bairro com CTA de "explore imóveis" funciona pra conversão mas entedia em lista longa. Adotar CTAs intra-seção, cuidar de monotonia.
- [Gazeta do Povo — Bairros mais caros para comprar imóveis em Curitiba](https://www.gazetadopovo.com.br/vozes/parana-sa/os-bairros-mais-caros-para-comprar-imoveis-em-curitiba-por-faixa-de-tamanho/) — lição: clustering por FAIXA DE TAMANHO (não preço) é a inovação. Empurra pilar pra cobrir "por tamanho" também (futuro).

**Tier 2 — cobertura local (voz regional Curitiba):**
- [Gazeta do Povo — Imóveis em Curitiba valorizam até 23% em 2025](https://www.gazetadopovo.com.br/vozes/parana-sa/curitiba-tem-alta-imoveis-residenciais-confira-bairros-mais-caros/) — extração de números locais validados.
- [BemParaná — Comprar imóvel em Curitiba exige renda alta, veja valores por bairro](https://www.bemparana.com.br/noticias/economia/comprar-imovel-em-curitiba-exige-renda-alta-veja-valores-por-bairro/) — lição: abrir com "mais caro e, pra muitos, mais distante" é voz humana. Emprestar.
- [Plural Curitiba — Onde seu dinheiro vale mais em Curitiba](https://www.plural.jor.br/vai-comprar-um-imovel-confira-onde-seu-dinheiro-vale-mais-em-curitiba/) — lição: "onde seu dinheiro vale mais" é ângulo diferente de "onde é mais caro". Incorporar no cluster Acessível.
- [Larya — 5 bairros mais caros de Curitiba 2026](https://larya.com.br/blog/cinco-bairros-mais-caros-em-curitiba/) — lição: ranking curto (top 5) com "prova matemática" funciona. Pilar pode ter subseção curta tipo top-5 dentro do cluster Premium.
- [Sienge — bairros mais caros de Curitiba](https://sienge.com.br/blog/bairros-mais-caros-de-curitiba/) — referência, voz corporativa pra NÃO copiar.

**Tier 3 — fontes primárias pra link in-line (Regra 9):**
- [FipeZap Índice — metodologia e boletim mensal](https://www.fipe.org.br/pt-br/indices/fipezap/)
- [Ademi-PR — boletins de mercado de Curitiba](https://ademipr.com.br/)
- [Sinduscon-PR — perspectivas de valorização em Curitiba](https://sindusconpr.com.br/)
- [QuintoAndar Imovelweb Index — aluguel por bairro](https://www.quintoandar.com.br/guias/dados-indices/)

**Ligações ao sistema editorial FYMOOB:**
- [Manual Editorial FYMOOB](../editorial-style-guide.md)
- [Writer brief anterior — mercado macro (transições, voz FYMOOB)](./mercado-macro-writer-brief.md)
- [Writer brief anterior — ITBI fiscal (placeholders, tese central)](./itbi-fiscal-writer-brief.md)
- [Aprendizados acumulados](../article-rewrite-learnings.md)
