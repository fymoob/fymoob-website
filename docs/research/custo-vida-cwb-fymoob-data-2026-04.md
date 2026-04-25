# Custo de Vida em Curitiba — Dados FYMOOB CRM (Estoque, abr/2026)

> **Pesquisa pra reescrita do post `content/blog/custo-de-vida-curitiba.mdx`.**
> NÃO é o post final. Aqui vai o que o estoque FYMOOB consegue (e NÃO consegue) sustentar com evidência.
> Writer interpreta — esta pesquisa só apresenta os dados.

---

## 0. Fonte e janela

- **Snapshot:** `docs/research/snapshots/2026-04-24.json` (242 imóveis ativos, 66 bairros distintos)
- **Data do snapshot:** 2026-04-24 (linha 1 do arquivo, `snapshot_date`)
- **Schema:** `schema_version: 1.0` (linha 3); fonte é API Loft/Vista FYMOOB CRM, fields normalizados pelo script `scripts/research/snapshot-crm-daily.mjs`
- **Snapshots disponíveis:** APENAS UM (2026-04-24). O cron diário GitHub Actions começou agora — sem comparativo histórico ainda. Próximo snapshot: 2026-04-25.
- **NOTA pro writer:** Este post NÃO deve mostrar contagens absolutas por bairro (Bruno pediu cautela competitiva — a partir do Post 5 paramos de expor volume FYMOOB). Use os números pra **embasar mediana e ranking**, não pra dizer "FYMOOB tem N imóveis no bairro X".

---

## 1. Visão macro do estoque (242 imóveis)

| Recorte | Total | % |
|---|---|---|
| **Com `valor_venda`** | 225 | 93,0 % |
| **Com `valor_locacao`** | 20 | 8,3 % |
| Com ambos (Venda + Locação) | 4 | 1,7 % |
| Sem nenhum dos dois | 1 | 0,4 % |

| Categoria | Total | % |
|---|---|---|
| **Residencial** (Apt, Sobrado, Casa, Studio, Kitnet, Cobertura, Casa em Condomínio) | 215 | 88,8 % |
| **Comercial** (Sala, Loja, Prédio Comercial, Empreendimento, Terreno Comercial) | 13 | 5,4 % |
| **Terreno** | 14 | 5,8 % |

**Distribuição por cidade (campo `cidade`):**

| Cidade | n |
|---|---|
| Curitiba | 225 |
| Araucária | 5 |
| São José dos Pinhais | 3 |
| Fazenda Rio Grande | 3 |
| Campo Largo | 2 |
| Colombo | 2 |
| Piraquara | 1 |
| São João do Triunfo | 1 |

**Tomada-1 importante:** estoque FYMOOB é overwhelming **Venda + Curitiba + Residencial**. Pra um post de custo de vida, o módulo "alugar em Curitiba" tem amostra fraca (ver §3).

---

## 2. Análise de VENDA por bairro (residencial Curitiba, n ≥ 5)

Calculado a partir de `properties[]` filtrando `categoria ∈ Apartamento|Apt Duplex|Studio|Kitnet|Cobertura|Sobrado|Casa|Casa em Condomínio`, `cidade = Curitiba`, `valor_venda > 0`.

15 bairros têm n ≥ 5 (amostra mínima pro Protocolo de Pesquisa FYMOOB v1.0).

### 2.1 Tabela completa — mediana e quartis

| Bairro | min (R$) | Q25 (R$) | **Mediana (R$)** | Q75 (R$) | max (R$) | R$/m² mediano |
|---|---|---|---|---|---|---|
| Batel | 656.200 | 1.479.000 | **4.447.529** | 5.435.644 | 7.000.000 | 20.271 |
| Campina do Siqueira | 893.100 | 1.447.308 | **2.769.295** | 3.758.290 | 4.084.630 | 20.574 |
| Bigorrilho | 1.012.000 | 2.468.680 | **2.743.496** | 4.421.685 | 7.817.780 | 19.509 |
| Mossunguê (Ecoville) | 603.848 | 1.306.664 | **2.011.728** | 3.147.031 | 5.451.373 | 17.309 |
| Água Verde | 199.229 | 1.215.635 | **1.750.000** | 2.208.230 | 2.750.536 | 15.233 |
| Campo Comprido | 645.188 | 881.750 | **1.014.500** | 1.289.419 | 4.986.474 | 15.336 |
| Capão Raso | 870.000 | 900.000 | **969.000** | 1.050.000 | 1.175.000 | 6.921 |
| Portão | 257.920 | 496.250 | **748.713** | 954.517 | 1.225.000 | 11.129 |
| Xaxim | 657.000 | 679.000 | **699.000** | 850.000 | 899.000 | 6.453 |
| Centro | 297.694 | 379.565 | **577.920** | 2.015.373 | 2.571.504 | 16.459 |
| Sítio Cercado | 235.000 | 385.000 | **500.000** | 560.000 | 650.000 | 6.278 |
| Novo Mundo | 279.500 | 392.521 | **457.950** | 580.400 | 998.000 | 8.821 |
| Cidade Industrial | 348.984 | 405.000 | **450.000** | 522.500 | 580.000 | 6.052 |
| Campo de Santana | 230.000 | 372.500 | **385.000** | 395.000 | 470.000 | 5.244 |
| Tatuquara | 220.000 | 250.000 | **330.000** | 370.000 | 900.000 | 5.279 |

### 2.2 Ranking R$/m² (apenas residencial, n ≥ 3)

22 bairros com amostra. Ordenado do mais caro:

| # | Bairro | n | R$/m² mediano |
|---|---|---|---|
| 1 | Campina do Siqueira | 6 | 20.574 |
| 2 | Batel | 7 | 20.271 |
| 3 | Bigorrilho | 9 | 19.509 |
| 4 | Mossunguê | 18 | 17.309 |
| 5 | Centro | 6 | 16.459 |
| 6 | Campo Comprido | 4 | 15.336 |
| 7 | Água Verde | 11 | 15.233 |
| 8 | Portão | 17 | 11.129 |
| 9 | Santa Quitéria | 4 | 10.274 |
| 10 | Boa Vista | 3 | 10.270 |
| 11 | Novo Mundo | 6 | 8.821 |
| 12 | Pinheirinho | 3 | 7.630 |
| 13 | São Braz | 4 | 7.498 |
| 14 | Capão Raso | 5 | 6.921 |
| 15 | Xaxim | 4 | 6.453 |
| 16 | Sítio Cercado | 9 | 6.278 |
| 17 | Cidade Industrial | 14 | 6.052 |
| 18 | Fazendinha | 4 | 5.779 |
| 19 | Boqueirão | 3 | 5.673 |
| 20 | Tatuquara | 4 | 5.279 |
| 21 | Campo de Santana | 8 | 5.244 |

> **NOTA:** Ranking vai pro **Post 5 (preço-m² por bairro)** — esse post de custo de vida deve LINKAR pra lá, não republicar. Recomendo o writer dizer algo como "para o ranking completo de R$/m² em todos os bairros, veja [Preço do m² em Curitiba por bairro](/blog/preco-metro-quadrado-curitiba-bairro)".

---

## 3. Análise de ALUGUEL — AMOSTRA INSUFICIENTE PARA RANKING

**Achado crítico:** só 20 imóveis em todo o estoque têm `valor_locacao > 0`. **Nenhum bairro atinge n ≥ 5 em locação.** O máximo é Tatuquara com n = 4. Isso quebra a hipótese inicial do briefing (item §2 do prompt) de que daria pra rankear top 10 bairros mais caros/baratos pra alugar.

### 3.1 Distribuição completa das 20 locações ativas

Listado integralmente porque a amostra é tão pequena que vale a pena auditar caso a caso:

| Codigo | Bairro | valor_locacao | área priv. | dorm. | condomínio | Observação |
|---|---|---|---|---|---|---|
| 69804924 | Campina do Siqueira | **R$ 0,00** | 78,17 | 3 | – | Lixo de dado — preço zerado |
| 69802113 | Campo de Santana | 775 | 24 | 1 | 150 | Studio/kitnet pequena |
| 69804378 | São Gabriel | 875 | 40,47 | 2 | 325 | Apartamento periférico |
| 69804094 | Campo de Santana | 900 | 33 | 1 | 100 | Studio/kitnet |
| 69805535 | Ganchinho | 900 | – | – | – | Sem dado de área |
| 69804147 | Tatuquara | 990 | 42 | 2 | 370 | Apartamento 2dorm popular |
| 69805683 | Santa Terezinha | 1.000 | – | – | – | Sem dado de área |
| AP01018 | Portão | 1.300 | 28 | 1 | 380 | Studio em bairro mediano |
| 69802966 | Campo de Santana | 1.400 | – | – | – | – |
| 69803086 | Cidade Industrial | 1.400 | 50 | – | – | – |
| 69804223 | Xaxim | 1.600 | 20,19 | – | 761 | Loja/comercial provável (cond. alto) |
| 69805434 | Tatuquara | 1.800 | 35 | 1 | – | – |
| 69803584 | Cidade Industrial | 2.500 | – | – | – | – |
| 69805530 | Tatuquara | 2.500 | 135 | – | – | – |
| 69805136 | Cidade Industrial | 3.300 | 120 | – | – | – |
| 69805461 | Portão | 3.500 | – | – | – | – |
| 69804208 | Xaxim | 4.000 | 55,85 | – | 2.106 | Comercial provável (cond. alto) |
| 69803145 | Tatuquara | 7.000 | 320 | – | – | Comercial / chácara provável |
| 69804177 | Maracanã | 8.200 | 145 | – | – | Comercial provável |
| 69805414 | Xaxim | 15.000 | 594 | – | 4.550 | **Comercial seguro** (cond. R$ 4,5k, área 594m²) |

### 3.2 Por que isso quebra a análise pretendida

1. **Outliers comerciais não declarados:** os 4 imóveis acima de R$ 4.000/mês (Xaxim 15k, Maracanã 8,2k, Tatuquara 7k, Xaxim 4k) provavelmente são **comerciais cadastrados sem `Categoria = Loja/Sala`** — o filtro por categoria não pega. Se o writer fizer "mediana de aluguel em Xaxim", vai dar R$ 4.000 com 3 amostras das quais 2 são lojas.
2. **Sem dado de área em metade:** 9 das 20 locações não têm `area_privativa` — impossível calcular R$/m² de aluguel pra esses.
3. **Bairros nobres sem locação no estoque:** Batel, Bigorrilho, Mossunguê, Água Verde têm **zero** imóveis pra locação no snapshot. O leitor que quer "alugar em bairro nobre" não vai achar referência aqui.
4. **R$ 0,00 em Campina do Siqueira (cód. 69804924):** dado sujo — `valor_locacao` cadastrado como zero. Excluir antes de qualquer média.

### 3.3 Recomendação pro writer

**NÃO produzir tabela "top 10 bairros mais caros pra alugar" nem "top 5 com R$ 1.800-2.500".** A amostra do estoque FYMOOB não sustenta. Alternativas:

- **Opção A (preferida):** usar o estoque só pra dizer "FYMOOB tem locações ativas em [X bairros]" sem nomear/contar, e direcionar leitor pra fonte externa (FipeZap, QuintoAndar) pra ranking de aluguel.
- **Opção B:** mostrar **3 faixas de aluguel** com exemplos reais (sem nome de bairro) — ex.: "Studio 24m² em bairro popular: R$ 775/mês"; "Apt 50m² 1 dorm em bairro mediano: R$ 1.300-1.400"; "Apt 100m² 3 dorm em bairro nobre: ND no estoque atual".
- **Opção C:** focar o post em **custo total** (financiamento, condomínio, IPTU, transporte) e tirar a seção de ranking de aluguel.

---

## 4. Condomínio e IPTU — dados RUINS

**Dado crítico pro writer:** os campos `valor_condominio` e `valor_iptu` no snapshot estão majoritariamente vazios ou com valor placeholder R$ 0,01.

### 4.1 Condomínio — bairros com n ≥ 3 (com cond > 0)

| Bairro | n | min | mediana | max |
|---|---|---|---|---|
| Xaxim | 3 | 761 | 2.106 | 4.550 |
| Pinheirinho | 4 | 400 | 461 | 600 |
| Boqueirão | 3 | 0,01 | 207 | 360 |
| Centro | 3 | 0,01 | 1 | 511 |
| Bigorrilho | 6 | 0,01 | 0 | 0,01 |
| Portão | 6 | 0,01 | 0 | 380 |
| Mossunguê | 13 | 0,01 | 0 | 0,01 |
| Água Verde | 6 | 0,01 | 0 | 0,01 |

A maioria dos bairros nobres tem condomínio cadastrado como R$ 0,01 (placeholder de "não preenchido"). **Não dá pra usar o snapshot como fonte de condomínio típico em Curitiba.**

### 4.2 IPTU — apenas 4 bairros têm n ≥ 3

| Bairro | n | mediana |
|---|---|---|
| Pinheirinho | 4 | 251 |
| Tatuquara | 3 | 40 |
| Mossunguê | 4 | 0 |
| Campo de Santana | 4 | 0 |

**IPTU também é dado sujo no CRM.** Writer não deve citar mediana de IPTU/condomínio do estoque FYMOOB — usar **Post 8 (quanto-custa-morar-batel)** como referência pras 9 rubricas detalhadas, ou Prefeitura de Curitiba pra IPTU oficial.

---

## 5. Distribuição de faixas de preço de venda (residencial Curitiba, n=195)

Pra ancorar discussão de "quanto custa comprar em Curitiba":

| Faixa | n | % |
|---|---|---|
| Até R$ 300 mil | 12 | 6,2 % |
| R$ 300-500 mil | 44 | 22,6 % |
| R$ 500-800 mil | 42 | 21,5 % |
| R$ 800k-1,2M | 39 | 20,0 % |
| R$ 1,2M-2M | 24 | 12,3 % |
| R$ 2M-3M | 15 | 7,7 % |
| Acima de R$ 3M | 19 | 9,7 % |

**Observação:** distribuição relativamente balanceada — FYMOOB cobre tanto popular (R$ 300-500k = 22,6%) quanto alto padrão (>R$ 2M = 17,4%). Mediana global do estoque residencial Curitiba ~ R$ 800k.

---

## 6. Cross-reference com posts já publicados

Esses POST JÁ têm dados validados. O post de custo de vida **deve linkar pra eles, não republicar:**

| Post | Slug | O que o post de custo de vida usa dele |
|---|---|---|
| **Post 5** | `preco-metro-quadrado-curitiba-bairro` | Ranking R$/m² completo. Custo-vida cita "Batel R$ 20k/m², Tatuquara R$ 5k/m² — diferença de 4x. [Veja ranking completo]" |
| **Post 6** | `melhores-bairros-curitiba-2026` | Score multi-critério (segurança, transporte, lazer). Custo-vida diz "se quer balancear preço × qualidade de vida, [ver melhores bairros]" |
| **Post 7** | `batel-vs-agua-verde-curitiba` | Comparativo direto entre os 2 mais buscados. Custo-vida usa pra exemplo: "compare ticket de Batel (R$ 4,4M) com Água Verde (R$ 1,75M) — quase 3x" |
| **Post 8** | `quanto-custa-morar-batel-curitiba` | 9 rubricas (IPTU, condomínio, transporte, mercado). Custo-vida diz "quer ver custo total mensal por rubrica? [Post 8]" |
| **Post 9** | `ecoville-vs-bigorrilho-curitiba` | Comparativo Ecoville × Bigorrilho. Pode ser linkado em "diferença entre bairros nobres" |
| **Post 11** | `documentos-comprar-imovel-curitiba` | Custos de cartório, ITBI etc. — relevante pra "quanto custa entrar num imóvel" |

---

## 7. Análise por finalidade — implicações pro leitor

Como `Finalidade` está praticamente vazio (240/242 nulos), usei o campo `status` como proxy:

| Status | n | % |
|---|---|---|
| Venda | 225 | 93,0 % |
| Aluguel | 17 | 7,0 % |

**Nenhum bairro tem perfil "de aluguel"** — o estoque FYMOOB é majoritariamente carteira de venda. Pra dizer ao leitor "se quer alugar, considere bairros X (mais oferta de aluguel)", o snapshot **não fornece evidência**.

Bairros com pelo menos 3 locações ativas no estoque (suficiente pra "tem oferta", insuficiente pra estatística):
- Tatuquara (4)
- Cidade Industrial (3)
- Xaxim (3, mas 2 são comerciais)
- Campo de Santana (3)

Padrão: **periferia tem mais oferta de aluguel que bairros nobres no estoque atual da FYMOOB**. Mas isso pode ser viés do CRM (carteira), não do mercado de Curitiba como um todo.

---

## 8. "Verdades surpresa" — 4 achados que valem destaque

### 8.1 Campina do Siqueira > Batel em R$/m² mediano

R$ 20.574/m² (Campina) vs R$ 20.271/m² (Batel) — diferença de 1,5%. **Praticamente empate técnico.** Narrativa popular coloca Batel como "o mais caro" — o estoque atual mostra **Campina do Siqueira igualando ou superando**.

> **Observação:** amostra Campina = 6 unidades, Batel = 7. Ambas pequenas, intervalo de confiança grande. Writer deve dizer "praticamente empatados" e não "Campina é mais caro que Batel".

### 8.2 Centro tem amplitude monstruosa

| Centro | min | mediana | max |
|---|---|---|---|
| Valor venda | R$ 297k | R$ 577k | R$ 2,57M |
| R$/m² | – | 16.459 | – |

Mediana R$ 577k mas máximo R$ 2,57M (4,4x maior). Centro tem KITs de R$ 250-300k convivendo com apartamentos retrofitados de R$ 2,5M. Writer pode usar pra "Centro é o bairro mais polarizado de Curitiba — você acha tudo nele".

### 8.3 Capão Raso e Xaxim — preços parecidos com Sítio Cercado, mas R$/m² diferentes

- Capão Raso: mediana R$ 969k, R$ 6.921/m²
- Xaxim: mediana R$ 699k, R$ 6.453/m²
- Sítio Cercado: mediana R$ 500k, R$ 6.278/m²

R$/m² praticamente igual entre os 3 bairros — diferença no ticket é **tamanho médio do imóvel**, não preço por área. Capão Raso vende imóveis maiores no estoque. Insight pro leitor: "se você compara só o ticket, parece que Capão Raso é mais caro — mas o R$/m² é quase o mesmo de Sítio Cercado".

### 8.4 Bigorrilho com Q25 > Mediana de Mossunguê

- Bigorrilho Q25 = R$ 2,47M
- Mossunguê mediana = R$ 2,01M

**Os 25% mais baratos do Bigorrilho ainda são mais caros que o imóvel típico de Mossunguê (Ecoville).** Mossunguê tem apartamentos novos de alto padrão, mas a mediana cai pelo volume de unidades de 2-3 dorm em torno de R$ 1,5-2M. Bigorrilho é "puro alto padrão" no estoque atual.

---

## 9. Pares "barato-caro" lado a lado (oportunidade pro leitor)

Bairros vizinhos com diferença grande de R$/m² mediano — leitor que aceita andar 1-2 km pode economizar muito:

| Par | R$/m² caro | R$/m² barato | Economia | Distância aproximada |
|---|---|---|---|---|
| **Bigorrilho ↔ Portão** | 19.509 | 11.129 | 43% | ~2 km, divisa via Av. República Argentina |
| **Batel ↔ Água Verde** | 20.271 | 15.233 | 25% | ~1,5 km, divisa via R. Petit Carneiro |
| **Mossunguê ↔ Campo Comprido** | 17.309 | 15.336 | 11% | colados (Ecoville x Campo Comprido) |
| **Centro ↔ Novo Mundo** | 16.459 | 8.821 | 46% | ~3 km, mas Novo Mundo é zona sul |
| **Água Verde ↔ Portão** | 15.233 | 11.129 | 27% | colados |
| **Capão Raso ↔ Sítio Cercado** | 6.921 | 6.278 | 9% | colados |

**Insight forte:** **Bigorrilho → Portão** entrega **43% de economia em R$/m² andando 2 km**. Writer pode usar como gancho "se você tá olhando Bigorrilho mas o orçamento aperta, considere Portão — mesma região, 43% mais barato".

---

## 10. Síntese pro writer — o que dá pra afirmar com este snapshot

### O QUE DÁ (alta confiança)
- Mediana de venda residencial em Curitiba está em torno de **R$ 800k** (15 bairros com n ≥ 5).
- **Faixa de R$/m² em Curitiba: R$ 5.000–20.500** entre bairro mais barato e mais caro do estoque (4x de diferença).
- Bairro mais caro pra COMPRAR (R$/m²): **Campina do Siqueira ≈ Batel** (~R$ 20k/m²).
- Bairro mais barato pra COMPRAR no estoque: **Campo de Santana ≈ Tatuquara** (~R$ 5,2k/m²).
- 22,6% do estoque está na faixa R$ 300-500k — **a faixa de "primeiro imóvel financiável"**.

### O QUE NÃO DÁ (sem evidência no snapshot)
- Ranking de bairros mais caros/baratos pra ALUGAR — só 20 locações ativas, nenhum bairro com n ≥ 5.
- Mediana de condomínio típico — campo está sujo (R$ 0,01 placeholder na maioria dos bairros nobres).
- Mediana de IPTU típico — só 4 bairros com n ≥ 3, dados também sujos.
- Tendência temporal (alta/queda de preço) — só temos 1 snapshot. Cron diário começou agora; comparativo histórico só vira disponível em ~30-60 dias.
- "Bairro de inquilino" vs "bairro de comprador" — sem evidência estatística.

### O QUE DEVE LINKAR (não duplicar)
- Ranking R$/m² → **Post 5** (`preco-metro-quadrado-curitiba-bairro`)
- Score multi-critério → **Post 6** (`melhores-bairros-curitiba-2026`)
- Comparativo Batel × Água Verde → **Post 7** (`batel-vs-agua-verde-curitiba`)
- Custo total mensal por rubrica → **Post 8** (`quanto-custa-morar-batel-curitiba`)
- Comparativo Ecoville × Bigorrilho → **Post 9** (`ecoville-vs-bigorrilho-curitiba`)

---

## 11. Tabelas finais — versão pro writer ancorar mensagens

### 11.1 "Custo de comprar" — top 5 mais caros e top 5 mais baratos por R$/m² (residencial Curitiba)

**TOP 5 MAIS CAROS (R$/m² mediano):**

| Bairro | R$/m² | Ticket mediano de venda |
|---|---|---|
| Campina do Siqueira | 20.574 | R$ 2,77M |
| Batel | 20.271 | R$ 4,45M |
| Bigorrilho | 19.509 | R$ 2,74M |
| Mossunguê (Ecoville) | 17.309 | R$ 2,01M |
| Centro | 16.459 | R$ 578k |

**TOP 5 MAIS BARATOS (R$/m² mediano, com n ≥ 3):**

| Bairro | R$/m² | Ticket mediano de venda |
|---|---|---|
| Campo de Santana | 5.244 | R$ 385k |
| Tatuquara | 5.279 | R$ 330k |
| Boqueirão | 5.673 | – (n insuf.) |
| Fazendinha | 5.779 | – (n insuf.) |
| Cidade Industrial | 6.052 | R$ 450k |

### 11.2 "Custo de alugar" — NÃO PRODUZIR tabela ranqueada

A briefing pediu "Top 5 bairros pra alugar com R$ 1.800-2.500/mês" e "Top 5 acima de R$ 4.000/mês". **Os dados não sustentam.** Recomendação:

- Faixa **R$ 800-1.500/mês** no estoque: studios/kitnets em Tatuquara, Campo de Santana, São Gabriel, Portão.
- Faixa **R$ 1.500-3.500/mês** no estoque: 1-2 dorm em Cidade Industrial, Xaxim, Tatuquara.
- Faixa **acima de R$ 4.000/mês** no estoque: na prática são imóveis comerciais cadastrados como locação. **Sem evidência confiável de aluguel residencial nesse patamar no estoque atual.**

Writer deve mencionar essas faixas com transparência ("no estoque FYMOOB, a maior parte das locações está em bairros populares; alto padrão pra alugar em Curitiba é mercado externo") e linkar pra fonte com mais oferta (FipeZap Aluguel Curitiba, QuintoAndar Curitiba).

---

## 12. Dicas práticas que saem dos dados (sem inventar)

1. **R$/m² de Curitiba varia 4x entre o bairro mais barato e o mais caro.** Não dá pra falar em "preço médio de Curitiba" — depende muito da região.
2. **Bigorrilho → Portão é o "atalho" mais óbvio:** 43% de desconto em R$/m² mediante 2 km de deslocamento.
3. **Faixa de "primeiro imóvel financiável" (R$ 300-500k) concentra 22,6% do estoque** — leitor que está saindo do aluguel encontra opção real.
4. **Centro é o bairro mais polarizado:** ticket varia de R$ 250k (kitnet) a R$ 2,5M (apartamento retrofitado). Quem fala "morar no Centro" precisa especificar muito mais.
5. **Para alugar em bairro nobre, o estoque FYMOOB não tem oferta atual** — leitor deve buscar plataformas com inventário de aluguel especializado. (Recomendação honesta vale mais que tabela inventada.)

---

## 13. Caveats metodológicos

- **Snapshot único:** sem média móvel ou comparativo histórico. Snapshot capturou um momento (2026-04-24); pode haver viés sazonal não detectado.
- **Filtro `ExibirNoSite = Sim`:** o snapshot só pega imóveis publicados no site. Pode haver imóveis "off-market" no CRM que não aparecem aqui (provavelmente irrelevante pra mediana, mas vale mencionar pro Protocolo).
- **Mediana ≠ média:** todas as estatísticas usadas são mediana — robusta a outliers, mas não captura cauda. O writer deve usar "típico" e nunca "médio" ao falar dos números.
- **Categoria proxy:** não há campo `Tipo` distinguindo "residencial vs comercial" diretamente; usei `categoria` como proxy. Pode haver imóveis comerciais cadastrados em categoria residencial errada (vide Xaxim 594m² R$ 15k/mês).
- **n ≥ 5 é mínimo, não suficiente:** mediana de 5-7 amostras tem intervalo de confiança grande. Bairros como Capão Raso (n=5) e Tatuquara (n=5 venda) têm a mediana com mais variância. Writer deve preferir bairros com n ≥ 10 quando possível.
- **`Finalidade` praticamente vazio:** 240/242 nulos. Usei `status` (Venda/Aluguel) como proxy.

---

## 14. Output — checklist pro writer

- [ ] **NÃO** mostrar contagens absolutas por bairro ("FYMOOB tem N imóveis em X")
- [ ] **NÃO** afirmar mediana de aluguel por bairro (amostra insuficiente)
- [ ] **NÃO** afirmar condomínio/IPTU mediano por bairro (dados sujos)
- [ ] **NÃO** duplicar ranking R$/m² — linkar Post 5
- [ ] **PODE** usar mediana de venda dos 15 bairros com n ≥ 5
- [ ] **PODE** usar ranking de R$/m² dos 22 bairros com n ≥ 3
- [ ] **PODE** usar pares "barato-caro" lado a lado da §9
- [ ] **PODE** afirmar "FYMOOB tem oferta em [faixa de preço X]" sem nomear bairro/contar
- [ ] **DEVE** mencionar limitações honestamente (sem dado de aluguel premium etc.)
- [ ] **DEVE** linkar Posts 5/6/7/8/9/11 nos pontos relevantes

---

## 15. Arquivos de referência

- **Snapshot:** `c:\Users\Vine\fymoob\docs\research\snapshots\2026-04-24.json` (linhas: cabeçalho 1–7, properties[] de 8 em diante)
- **Script de snapshot:** `c:\Users\Vine\fymoob\scripts\research\snapshot-crm-daily.mjs`
- **Script de extração de estoque:** `c:\Users\Vine\fymoob\scripts\research\extract-stock-by-bairro.mjs`
- **Post atual a reescrever:** `c:\Users\Vine\fymoob\content\blog\custo-de-vida-curitiba.mdx`
- **Posts pra cross-reference:**
  - `c:\Users\Vine\fymoob\content\blog\preco-metro-quadrado-curitiba-bairro.mdx`
  - `c:\Users\Vine\fymoob\content\blog\melhores-bairros-curitiba-2026.mdx`
  - `c:\Users\Vine\fymoob\content\blog\batel-vs-agua-verde-curitiba.mdx`
  - `c:\Users\Vine\fymoob\content\blog\quanto-custa-morar-batel-curitiba.mdx`
  - `c:\Users\Vine\fymoob\content\blog\ecoville-vs-bigorrilho-curitiba.mdx`
  - `c:\Users\Vine\fymoob\content\blog\documentos-comprar-imovel-curitiba.mdx`

---

**Pesquisa concluída em 2026-04-25 a partir do snapshot 2026-04-24.json.**
**Não chamou API Loft em produção — apenas leitura do snapshot existente.**
