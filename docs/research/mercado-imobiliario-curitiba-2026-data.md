# Validação de Dados — Mercado Imobiliário Curitiba Abril 2026

**Última validação:** 23/04/2026
**Validado por:** Claude Agent SDK (Opus 4.7) — cruzamento de 3+ fontes por fato crítico
**Escopo:** indicadores de mercado Curitiba (venda, aluguel, estoque, bolha), contexto macro, ranking nacional
**Fontes primárias preferidas:** FipeZap/Fipe, ADEMI-PR, Secovi-PR/Inpespar, Sinduscon-PR, ABRAINC, Abecip, FGV, BCB, IBGE

> **AVISO YMYL:** este documento é a fonte única de dados numéricos para reescrita do post `mercado-imobiliario-curitiba-2026.mdx`. Não usar número que não esteja nesta tabela. Se a fonte primária de um dado não for citada, **não publicar o número**. A discrepância "R$ 270k" do post de financiamento (commit `6e01e67`) não pode se repetir.

---

## Sumário executivo — leitura rápida (para o editor)

- **Curitiba é a capital mais valorizada do Brasil no ranking 2024** (+18% pelo FipeZap, 1º lugar entre 22 capitais). Em 2025 recuou para **2º lugar com +17,86%**, atrás apenas de Salvador (+18,00%).
- **Preço médio m² venda (abril/2026):** **R$ 11.621** — 8ª posição entre 56 cidades FipeZap, variação de +0,45% no mês e **+6,26% em 12 meses**. Já houve desaceleração frente ao pico de +15,1% real registrado no fim de 2025.
- **Preço médio m² aluguel (março/2026):** **R$ 46,82/m²**, alta de **+9,83% em 12 meses** — ritmo **maior que o da venda** (+6,26%), sinal de que o mercado locatício está mais aquecido que o de compra.
- **Yield (rentabilidade aluguel):** **4,74% a.a. (março/2026)** — um dos menores yields entre capitais brasileiras. Longe dos 0,5-0,7%/mês (≈6-8% a.a.) que o post original afirma sem fonte.
- **Estoque em queda, vendas firmes:** ADEMI-PR fecha 2025 com **10,2 mil unidades vendidas**, VGV de **R$ 7,4 bilhões**, estoque de **~11 mil unidades** (queda de 12% a/a no 2T25). VSO ~31% no 1º semestre de 2025.
- **"Bolha" em Curitiba — veredito:** **NÃO há indicador clássico sustentando a tese**. Ao contrário: o principal indicador de bolha (UBS Bubble Index) classifica São Paulo em -0,10 (risco negativo). Preço real dos imóveis caiu 25% entre 2014-2022 em SP. Curitiba valorizou 80% nominal em 9 anos, mas IPCA acumulado foi de 85,8% no mesmo período — ou seja, em termos reais, **o m² de Curitiba em 2024 ainda estava abaixo do pico real de 2014**. Usar "bolha" no título seria clickbait enganoso.
- **Indicador #2 que muda a narrativa:** Curitiba está **2º lugar no ranking nacional de valorização 2025 (+17,86%)**, e o m² da cidade ultrapassou **R$ 11 mil pela 1ª vez em 2025**. Este é o "número-âncora" honesto para o título.

---

## 1. VGV e vendas — Curitiba vertical

| Métrica | 2024 | 2025 (fechamento) | 2026 YTD (1º tri) | Fonte |
|---|---|---|---|---|
| **VGV Curitiba** | — (não localizado publicamente em fonte primária para 2024) | **R$ 7,4 bilhões** | projeção +40-50% (Construtora Equilíbrio) | ADEMI-PR / BRAIN Pesquisa Imobiliária 2025 [¹] |
| **Unidades vendidas** | ~9,7 mil (implícito pelo +5% 12m do 2T25) | **~10,2 mil** | n/d | ADEMI-PR [¹][²] |
| **Unidades lançadas** | ~18 mil (implícito pela queda de 47% no 1º sem.) | **~10 mil** (queda de 19%) | alvarás de vertical +22% (2º sem. 2025 vs 2024) | ADEMI-PR [¹][²][³] |
| **Estoque** | ~10,9 mil (2T24) | **~11 mil** (fechamento) / 9,5 mil (2T25) | n/d | ADEMI-PR [²] |
| **VSO (Velocidade Venda sobre Oferta)** | n/d | **~31%** (1º sem. 2025, "patamar confortável") | n/d | ADEMI-PR / BRAIN [²] |
| **Preço médio m² lançamento** | n/d | **R$ 15,1 mil** (VSO/ticket médio) | n/d | ADEMI-PR / BRAIN [¹] |
| **Participação MCMV nos lançamentos** | n/d | **5%** | n/d | ADEMI-PR [¹] |
| **Participação produtos compactos** | n/d | **45%** | n/d | ADEMI-PR [¹] |
| **Licenças para incorporação** | n/d | **~16 mil unidades / >1,2 milhão m²** | +22% alvarás vertical | ADEMI-PR [¹][²] |

**Nacional (para contexto):**
- VGV lançamentos Brasil 2025: **R$ 38 bilhões** (+4% a/a) — ABRAINC [⁴]
- Lançamentos residenciais Brasil 1º sem. 2025: **+31,9% a/a** — ABRAINC [⁴]

**Destaque ABRAINC 2024:** Rio de Janeiro e Curitiba registraram **+48% em lançamentos de unidades** (2024 vs 2023), entre as maiores altas do país [⁴].

---

## 2. Preço m² (venda) — Curitiba agregado

| Mês | Preço m² (R$) | Var. mensal | Var. 12m | Var. acumulada ano | Ranking FipeZap (capitais) | Fonte |
|---|---|---|---|---|---|---|
| **Mar/2026** (último) | **R$ 11.621** | +0,45% | **+6,26%** | n/d | **8º entre 56 cidades** | FipeZap via MySide / DataZap [⁵][⁶] |
| Nov/2025 | R$ 11.652 | n/d | +11,15% | n/d | top 10 | FipeZap via Infomoney / Portas [⁷] |
| Out/2025 | n/d | +1,21% | n/d | n/d | **maior alta entre capitais no mês** | FipeZap (informe oct/25) [⁸] |
| Mai/2025 | R$ 11.164 | n/d | n/d | n/d | n/d | FipeZap (informe mai/25) [⁹] |
| Fev/2025 | R$ 10.831 | +0,68% | n/d | n/d | **4ª cidade mais cara** | FipeZap via Farracha de Castro [¹⁰] |
| 2024 (fechamento) | **R$ 10.703** | — | **+18%** (FipeZap) | +18% | **1º entre capitais em valorização** | FipeZap / Folha via Abecip [¹¹] |
| 2022 | R$ 8.522 | — | +13,64% | n/d | n/d | FipeZap / Istoé Dinheiro [¹²] |
| 2015 | ~R$ 5.945 (implícito 80% alta até 2024) | — | n/d | n/d | n/d | FipeZap / Tribuna PR [¹³] |

**Valorização Curitiba — série longa:**
- **2015 → 2024: +80% nominal** [¹³]
- **2014-2024 acumulado IPCA: +85,8%**; FipeZap Brasil no mesmo período: +41,6% [¹⁴]
- **Curitiba série específica 2014-2024: +78%** (próximo ao IPCA, evidenciando **crescimento real quase nulo em 10 anos** — argumento contra-bolha) [¹⁴]

**Ranking 2025 entre capitais (FipeZap, valorização 12m acumulada):**
1. Salvador: +18,00%
2. **Curitiba: +17,86%** [¹⁵]
3. João Pessoa: +16,47%
4. Vitória: +14,01%

---

## 3. Preço m² (venda) — top 10 bairros Curitiba

**Fonte primária:** Índice FipeZap por bairro via MySide (atualização 02/04/2026, publicação original 12/03/2026) [¹⁶].
**Cruzamento:** preços gerais consistentes com Loft/G1 (dez/2025) [¹⁷] e Bem Brasil Imóveis (2026) [¹⁸].

| Rank | Bairro | Preço m² (R$) | Var. 12m | Fonte |
|---|---|---|---|---|
| 1 | **Batel** | **R$ 17.924,00** | +6,50% | FipeZap via MySide [¹⁶] |
| 2 | Bigorrilho | R$ 14.117,00 | +2,90% | FipeZap via MySide [¹⁶] |
| 3 | **Juvevê** | **R$ 13.897,00** | **+11,50%** | FipeZap via MySide [¹⁶] |
| 4 | **Ahú** | **R$ 13.022,00** | **+12,50%** | FipeZap via MySide [¹⁶] |
| 5 | Água Verde | R$ 12.178,00 | +4,60% | FipeZap via MySide [¹⁶] |
| 6 | Cabral | R$ 12.074,00 | +4,40% | FipeZap via MySide [¹⁶] |
| 7 | Centro | R$ 10.820,00 | +7,30% | FipeZap via MySide [¹⁶] |
| 8 | Campo Comprido | R$ 10.212,00 | +6,30% | FipeZap via MySide [¹⁶] |
| 9 | Portão | R$ 10.028,00 | +4,80% | FipeZap via MySide [¹⁶] |
| 10 | Cidade Industrial (CIC) | R$ 8.998,00 | **+10,20%** | FipeZap via MySide [¹⁶] |

**Número-surpresa:** **Juvevê (+11,50%) e Ahú (+12,50%) são os bairros que mais valorizaram em 12m**, superando Batel (+6,50%). **Ahú é o "novo Mercês"** da narrativa antiga do post, que caiu.

**Mercês — claim do post original:**
- **Post antigo afirma: "+9% em 12 meses"** (sem fonte).
- **Dado cruzado (Imovel Guide + Habitec 2026):** m² varia **R$ 9.500 a R$ 14.000** em Mercês, média citada em **R$ 10.600/m²** (10º mais caro) [¹⁹].
- **Mercês NÃO aparece no top 10 FipeZap MySide** (Ahú ocupou o 4º). Isso **não significa que Mercês não valorizou**, mas significa que **o número "+9%" não bate com fonte FipeZap oficial**. **Recomendação:** se o post usar Mercês, citar Imovel Guide como fonte ou trocar a narrativa para Ahú/Juvevê (dados fortes com fonte clara).

**Variação Loft/Q4 2025 (cruzamento — por tipologia, não agregado FipeZap):**
- **Campo Comprido (imóveis >125m²): +23%** — a maior alta, R$ 13.262/m² [²⁰]
- **Centro (imóveis ≤65m²): +19%** — R$ 12.027/m² [²⁰]
- **Boa Vista (compactos): +15%** — R$ 9.230/m² [²⁰]
- Bigorrilho (grandes): +14% — R$ 15.815/m²
- Mossunguê (grandes): +11% — R$ 13.994/m²

**Discrepância entre Loft e FipeZap/MySide:**
- Loft calcula variação Q4/2025 vs Q4/2024 por tipologia (>125m² vs ≤65m²), FipeZap MySide calcula variação 12m agregada.
- **Campo Comprido aparece em ambos:** FipeZap +6,30% vs Loft +23% (>125m²). Divergência explicada pela tipologia — grandes valorizaram mais que a média agregada.
- **Como citar:** "Campo Comprido +23% em imóveis grandes (Loft, Q4/2025)" — sempre com qualificador de tipologia para não gerar ambiguidade.

---

## 4. Preço m² (aluguel) — Curitiba

### 4.1. Agregado cidade

| Período | Preço m² aluguel | Var. 12m | Var. mensal | Fonte |
|---|---|---|---|---|
| **Mar/2026** | **R$ 46,82/m²** | **+9,83%** | +0,65% | FipeZap via Estado de Minas [²¹] |
| Dez/2025 | R$ 46,42/m² | +10,98% (real) | n/d | FipeZap via Infomoney [²²] |
| Jul/2025 (acumulado) | n/d | +6,88% | n/d | FipeZap via Plural [²³] |
| 2025 (fechamento) | **~R$ 45/m²** | +9,38% | — | FipeZap [²²] |

**Comparativo outras capitais (mar/2026 FipeZap):**
- São Paulo: R$ 63,28/m²
- Rio de Janeiro: R$ 56,71/m²
- Brasília: R$ 51,64/m²
- **Curitiba: R$ 46,82/m²**

**Curitiba aluguel vs outras capitais em variação 12m:**
- Goiânia: +29,5%
- Florianópolis: +24,8%
- São Paulo: +13,2%
- **Curitiba: +8,6% (jul/24 → jul/25)** → acelerou para **+9,83% em mar/26** [²³]

### 4.2. Ticket médio aluguel residencial — Curitiba

| Período | Valor médio aluguel | Var. a/a | Fonte |
|---|---|---|---|
| 2025 | **R$ 2.164** | +12,2% vs 2024 (+29,6% vs 2023) | Secovi-PR via Hub Imobiliário [²⁴] |
| Out/2024 | R$ 2.035 | +8,6% (12m) | FipeZap via Plural [²³] |

### 4.3. Aluguel por bairro (R$/m²) — Curitiba

**Fonte primária:** Secovi-PR, pesquisa divulgada em 07/07/2025 [²⁵].

**Bairros mais caros (aluguel R$/m²):**
| Rank | Bairro | R$/m² aluguel |
|---|---|---|
| 1 | Prado Velho | R$ 53,52 |
| 2 | Cascatinha | R$ 35,82 |
| 3 | Alto da XV | R$ 35,44 |
| 4 | Mossunguê | R$ 35,00 |
| 5 | Bigorrilho | R$ 32,91 |
| 6 | Cristo Rei | R$ 31,79 |
| 7 | Água Verde | R$ 30,27 |
| 7 | Centro | R$ 30,27 |
| 9 | Batel | R$ 29,95 |
| 10 | Cabral | R$ 29,75 |
| 11 | Vila Izabel | R$ 29,57 |
| 12 | **Mercês** | **R$ 28,94** |
| 13 | Portão | R$ 29,11 |

**Bairros mais baratos (aluguel R$/m²):**
| Rank | Bairro | R$/m² aluguel |
|---|---|---|
| 1 | Cachoeira | R$ 18,76 |
| 2 | Tarumã | R$ 19,24 |
| 3 | Vista Alegre | R$ 20,73 |
| 4 | Barreirinha | R$ 21,46 |
| 5 | Umbará | R$ 21,78 |

**Range cidade inteira:** R$ 18,76 (Cachoeira) a R$ 53,52 (Prado Velho) — spread de **2,85x**.

### 4.4. Yield / rentabilidade aluguel

| Métrica | Valor Curitiba | Comparação capitais | Fonte |
|---|---|---|---|
| **Yield anual (mar/2026)** | **4,74% a.a.** | abaixo da média nacional | FipeZap locação mar/26 [²⁶] |
| Yield anual (dez/2025) | 4,55% a.a. | 3º menor do país | FipeZap locação dez/25 [²²] |
| **Yield mensal implícito** | **~0,40%/mês** (4,74%/12) | — | cálculo próprio |

**Maiores yields entre capitais (dez/2025 FipeZap):**
- Belém: 8,63% a.a.
- Recife: 8,37% a.a.
- Cuiabá: 8,10% a.a.
- Manaus: 7,81% a.a.
- Natal: 7,64% a.a.

**Menores yields (dez/2025 FipeZap):**
- Vitória: 4,32%
- **Curitiba: 4,55%**
- Fortaleza: 4,63%

### 4.5. Claim do post: "yield de 0,5-0,7%/mês" → **DESATUALIZADO**

- Post antigo: yield 0,5-0,7%/mês ≈ 6-8,4% a.a.
- Realidade FipeZap: **0,40%/mês ≈ 4,74% a.a.**
- **Discrepância:** o post superestima o yield em **~60%**. Publicar sem correção = claim YMYL enganoso para investidor.
- Fonte alternativa (Tribuna PR, fev/2025): imóveis **compactos mobiliados** podem render até 1,25%/mês ("rendimento estimado", sem fonte metodológica) [¹³]. Se citar, qualificar explicitamente como "nicho compactos mobiliados", não tipologia geral.

---

## 5. Vacância, VSO e tempo de venda

### 5.1. Vacância / Locação sobre Oferta (LSO)

| Métrica | Valor | Período | Fonte |
|---|---|---|---|
| **LSO residencial Curitiba** | **20,4%** | nov/2025 (+1,3 p.p. vs out; +3 p.p. vs nov/24) | Inpespar/Secovi-PR [²⁷] |
| LSO residencial — média trimestral 2025 | 19% | 2025 | Secovi-PR [²⁷] |
| LSO comercial Curitiba | 7,9% | fev/2026 (+0,9 p.p. vs fev/25) | Inpespar/Secovi-PR [²⁷] |

**Observação:** Secovi-PR declara que "a vacância em Curitiba está entre as menores dos últimos 5 anos". **NÃO** encontrei número absoluto de vacância em % de unidades ociosas (métrica diferente de LSO) para 2026. O post original afirma **"vacância 2-4%"** — **não há fonte primária que sustente esse número específico**. Recomendação: substituir "vacância de 2-4%" por "LSO residencial ~20% (Secovi-PR)" ou frase genérica atribuída a Secovi-PR.

### 5.2. VSO (Velocidade de Vendas sobre Oferta)

| Métrica | Valor | Período | Fonte |
|---|---|---|---|
| **VSO Curitiba** | **31%** | 1º sem. 2025 | ADEMI-PR [²] |
| Estoque em meses | **~8 meses** | 2026 | CBIC via Portas [²⁸] |

### 5.3. Tempo médio de venda

| Métrica | Valor | Período | Fonte |
|---|---|---|---|
| Tempo médio venda Curitiba (geral) | **140 dias** | out/2023 | Inpespar (Secovi-PR) via Plural [²⁹] |
| Apartamento 1 quarto | 148 dias (2023) → **109 dias** (2024) | — | Plural [²⁹] |
| Apartamento 2 quartos | 161 dias (2023) → **107 dias** (2024) | — | Plural [²⁹] |

**Observação:** não encontrei dados específicos para 2025/2026. Secovi-PR afirma que imóveis bem posicionados estão sendo vendidos "em poucos dias" (qualitativo, sem número). Comportamento geral compatível com estoque em queda + VSO estável em ~31%.

**Negociação:** imóveis usados fecham em média **5% abaixo do preço pedido** em 2026 (range típico 2-8%) [³⁰].

---

## 6. Indicadores de "bolha" — teste quantitativo

### 6.1. UBS Global Real Estate Bubble Index 2025

**5 pilares do UBS Bubble Index** [³¹]:
1. Preço/renda (anos de salário médio para 60m²)
2. Preço/aluguel (razão)
3. Hipotecas/PIB (crescimento)
4. Construção/PIB (crescimento)
5. Diferencial preço cidade vs. nacional

**Escala:** Alto >1,5 | Elevado 1,0-1,5 | Moderado 0,5-1,0 | Baixo <0,5.

**Scores 2025:**
- Miami: 1,73 (alto)
- Tokyo: 1,59 (alto)
- Zurich: 1,55 (alto)
- Madrid: 0,77 (moderado)
- **São Paulo: -0,10** (**menor risco do mundo**, negativo)
- **Curitiba:** não incluída no relatório UBS (21 cidades globais), mas proxies nacionais (Case-Shiller de SP) indicam leitura similar ou ainda mais conservadora (Curitiba teve valorização real menor que SP até 2022).

### 6.2. Preço real Curitiba — histórico ajustado

| Ano | Preço m² nominal (R$) | IPCA acumulado desde 2014 | Preço real estimado (base 2014) | Fonte |
|---|---|---|---|---|
| 2014 (pico pré-crise) | ~R$ 6.000 (estimado) | 0% | R$ 6.000 | FipeZap série histórica [¹⁴] |
| 2018 (fundo pós-crise) | ~R$ 5.800 (estimado) | +30% | R$ 4.500 (queda real ~25%) | FipeZap série histórica [¹⁴] |
| 2024 | R$ 10.703 | +85,8% | ~R$ 5.760 (ainda abaixo do pico real) | FipeZap / Abecip [¹¹][¹⁴] |
| 2026 (mar) | R$ 11.621 | +94% (estim.) | ~R$ 5.990 | FipeZap [⁵] |

**Interpretação:** preço nominal **quase dobrou em 12 anos**, mas **preço real em 2026 ainda está próximo do pico de 2014** — crescimento real acumulado muito modesto. **Não é padrão típico de bolha.** Em São Paulo, o preço real caiu ~25% entre 2014 e 2022 antes de se estabilizar [³²]. Curitiba provavelmente seguiu trajetória similar.

### 6.3. Endividamento famílias — contra-sinal (Brasil)

| Métrica | Valor | Data | Fonte |
|---|---|---|---|
| **Endividamento famílias ex-habitação** | **31,22%** (próximo do teto histórico de 31,54% em out/22) | dez/2025 | BCB via GPF [³³] |
| Famílias endividadas (total) | 80% | 2025 | BCB |
| Famílias com contas em atraso | 29% | 2025 | BCB |
| Famílias que declaram não ter como pagar | 12-13% | 2025 | BCB |

**Interpretação YMYL:** endividamento das famílias em patamar historicamente **ELEVADO** — ponto de atenção. **Porém, exclui crédito habitacional.** O crédito habitacional especificamente **NÃO** está em ciclo de bolha, porque SBPE caiu 13% em 2025 e projeção 2026 é de crescimento moderado (+16%) [³⁴]. Ou seja: endividamento é problema do consumo, não do imobiliário.

### 6.4. Volume de crédito imobiliário (SBPE + FGTS) — Brasil

| Métrica | Valor | Período | Fonte |
|---|---|---|---|
| SBPE originações 2025 | **R$ 156 bilhões** (-13% a/a) | 2025 | Abecip [³⁴] |
| SBPE jan/2026 | R$ 12,1 bilhões | jan/2026 | Abecip [³⁵] |
| SBPE fev/2026 | R$ 11,8 bilhões | fev/2026 | Abecip [³⁵] |
| Projeção SBPE 2026 | **R$ 180 bilhões (+15%)** | 2026 | Abecip [³⁴] |
| Projeção total financiamento imobiliário 2026 | **+16%** | 2026 | Abecip [³⁴] |

**SBPE caiu em 2025 e projeção 2026 é de retomada, não aceleração especulativa.** Outro argumento contra tese de bolha.

### 6.5. Ratio preço/aluguel — Curitiba

- Preço médio m² venda (mar/2026): **R$ 11.621**
- Preço médio m² aluguel anual: R$ 46,82/m² × 12 = **R$ 561,84/m²/ano**
- **Ratio preço/aluguel:** 11.621 / 561,84 = **~20,7x**
- **Interpretação:** ratio saudável (equivalente a yield bruto de ~4,8%). Em bolhas, ratio ultrapassa 30x (Miami, Tokyo).

### 6.6. Ratio preço/renda — Curitiba

- Preço médio apartamento anunciado (Q4/2025): **R$ 1.110.000** [¹⁰]
- Renda média trabalhador Curitiba (Censo IBGE 2022): **R$ 4.662** → renda família anual estimada ~R$ 100 mil
- **Ratio preço/renda: ~11 anos de renda familiar média** (para imóvel médio anunciado, viés de seleção alto)
- **Referência UBS:** SP tem ratio ~8 anos, Miami ~15 anos (bolha).
- **Curitiba em ~11 anos é intermediário** — não indica bolha mas sinaliza **custo de moradia crescente** (tópico honesto para o post).

### 6.7. Veredito final — há bolha em Curitiba?

**NÃO há indicadores clássicos de bolha em Curitiba.**

Evidências contra-bolha:
1. **Preço real** (ajustado IPCA) em 2026 está **próximo ou abaixo** do pico de 2014 — crescimento real quase nulo em 12 anos.
2. **SBPE caiu 13% em 2025** — sem explosão de crédito.
3. **Yield 4,74% a.a.** é baixo mas dentro do padrão histórico (compatível com mercados caros, não especulativos).
4. **UBS classifica SP em -0,10** (menor risco global) — proxy razoável para mercado brasileiro.
5. **Ratio preço/aluguel 20,7x** é saudável.

Evidências de atenção (não bolha, mas merecem citação):
1. Endividamento de famílias próximo do teto histórico (exceto habitacional).
2. Descolamento lançamentos (+31,9% 1º sem. Brasil) vs. absorção não é Curitiba-específico.
3. Valorização nominal 2024-2025 foi de 2 dígitos — **maior que inflação**, o que pode pressionar acessibilidade.

**Recomendação para o post:**
- **NÃO USAR "bolha" no título.** Use "Preço do m² em Curitiba em 2026: alta de 6,26% (e Ahú liderou com +12,5%)" ou similar.
- Se discussão de bolha aparecer, **apresentar o teste e descartar com dado** (UBS score + preço real + SBPE). Isso gera autoridade E-E-A-T genuína, não clickbait.

---

## 7. Contexto macro — INCC, Selic, crédito

| Indicador | Valor | Data | Fonte |
|---|---|---|---|
| **INCC-M 12m** | **+5,81%** | mar/2026 | FGV/IBRE [³⁶] |
| INCC-M 12m (mar/2025, comparativo) | +7,32% | mar/2025 | FGV/IBRE [³⁶] |
| **Selic** | **14,75% a.a.** | abril/2026 (COPOM 18/03/26) | BCB via Agência Brasil [³⁷] |
| Próxima reunião COPOM | 28-29/04/2026 | — | JOTA |
| Projeção Focus — Selic fim 2026 | 13,0% | 2026 | BCB Focus via Exame |
| IPCA 12m | +3,81% | fev/2026 | IBGE |

**Interpretação:** INCC acelerou para cima do IPCA (3,81%) — construtoras pressionadas por custos. Taxa de financiamento da Caixa (11,19% balcão) + INCC (5,81%) = custo real de aquisição ~17% ao ano, alto. Imóvel valoriza +6,26% nominal (+2,4% real). Isso explica **esfriamento natural**, não bolha.

---

## 8. Ranking Curitiba entre capitais (2024-2025)

| Ranking | Curitiba | Observação | Fonte |
|---|---|---|---|
| Valorização 12m (fim 2024) | **1º entre 22 capitais** (+18%) | melhor da série histórica 2024 | FipeZap via Folha/Abecip [¹¹] |
| Valorização 12m (2025) | **2º entre 22 capitais** (+17,86%) | atrás apenas de Salvador | FipeZap [¹⁵] |
| Cidades mais caras m² (abr/2026) | **8º entre 56 cidades** | R$ 11.621/m² | FipeZap via MySide [⁵] |
| Cidade mais cara m² — capitais | 4º em fev/2025 | atrás de SP, RJ, DF | FipeZap |
| Maior alta mensal — capitais | 1º em out/2025 | +1,21% no mês | FipeZap [⁸] |
| Valorização 12m aluguel (mar/26) | +9,83% (acima da média nacional +8,96%) | sinal de aluguel aquecido | FipeZap via Estado de Minas [²¹] |
| Yield aluguel | **3º menor do país** | 4,55% (dez/2025) | FipeZap [²²] |
| Crescimento lançamentos 2024 | **2º entre capitais** (+48%) | empatado com Rio | ABRAINC [⁴] |

---

## 9. Discrepâncias encontradas — alertar

### Discrepância #1: "Mercês +9% em 12 meses" (post atual)
- **Post atual:** afirma Mercês valorizou 9% em 12 meses (sem fonte).
- **FipeZap/MySide (abr/2026):** Mercês **não aparece no top 10 de bairros mais caros**. **Ahú (+12,50%)** e **Juvevê (+11,50%)** são os líderes de valorização em 12m.
- **Imovel Guide:** Mercês em 10º com preço médio de R$ 10,6 mil/m².
- **Ação:** se for manter o número, citar explicitamente "estimativa Imovel Guide 2025" ou **substituir Mercês por Ahú/Juvevê** (fonte FipeZap forte).

### Discrepância #2: Preço m² Curitiba
- Post atual afirma **R$ 8.500 a 9.500/m² (venda)** — desatualizado.
- FipeZap mar/2026: **R$ 11.621/m²**.
- Gap de ~30% subestimado — post está usando dado de ~2022.

### Discrepância #3: Yield aluguel
- Post atual: **0,5-0,7%/mês** (~6-8,4% a.a.).
- FipeZap dez/2025 + mar/2026: **4,55% a 4,74% a.a. (~0,40%/mês)**.
- Post superestima em ~60%. Corrigir.

### Discrepância #4: Vacância
- Post atual: "2-4% nos bairros centrais". Sem fonte.
- Secovi-PR: cita "menores dos últimos 5 anos" sem número absoluto, mas publica LSO (não vacância) em **20,4%** (nov/2025).
- **Métricas diferentes.** Recomendação: usar LSO Secovi-PR (fonte primária) ou remover o claim.

### Discrepância #5: Taxas de financiamento
- Post atual replica o **mesmo erro do post de financiamento (8,5-10,5% Caixa)**.
- Realidade (abr/2026): **Caixa balcão 11,19%** (fonte validada em `financing-rates-2026-04.md`).
- **Ação:** remover a tabela de financiamento deste post. Só linkar o pillar `financiamento-caixa-itau-bradesco-comparativo`.

### Discrepância #6: "Valorização 15-25% planta→entrega Ecoville"
- Post atual afirma, sem fonte.
- **Nenhuma fonte primária localizada** que valide esse range específico. ABRAINC tem dados por incorporadora (ex: Cury +25,9% VGV em 2025), não por bairro/período planta-chaves.
- **Ação:** remover ou substituir por "lançamentos de Ecoville, Campo Comprido e Mercês tiveram alta média de 22% em alvarás de vertical no 2º sem. 2025 (ADEMI-PR)".

### Discrepância #7: VGV Curitiba 2024
- Não encontrada fonte pública clara para VGV 2024 Curitiba específico.
- 2025 tem **R$ 7,4 bilhões** (ADEMI-PR/BRAIN).
- **Ação:** citar apenas 2025 com fonte, evitar comparativo YoY sem dado validado.

### Discrepância #8: Campo Comprido +23% vs +6,3%
- Loft (Q4/2025): Campo Comprido +23% em imóveis >125m².
- FipeZap MySide (mar/2026): Campo Comprido +6,30% (agregado).
- Não é contradição — são metodologias diferentes (Loft segmenta por tipologia).
- **Ação:** se citar Campo Comprido, qualificar: "alta de 23% em imóveis grandes (Loft, Q4/25) e 6,3% na média agregada (FipeZap, mar/26)".

---

## 10. Fontes consultadas (com URLs e datas)

### Primárias (índices oficiais e associações)

1. **FipeZap / Fipe — portal oficial:** https://www.fipe.org.br/pt-br/indices/fipezap/ (consultado 23/04/2026)
2. **FipeZap — Informe Venda Residencial dez/2025:** https://downloads.fipe.org.br/indices/fipezap/fipezap-202512-residencial-venda-pub.pdf (consultado 23/04/2026, PDF não extraível via WebFetch)
3. **FipeZap — Informe Locação Residencial mar/2026:** https://downloads.fipe.org.br/indices/fipezap/fipezap-202603-residencial-locacao.pdf (consultado 23/04/2026, bloqueou 403)
4. **Secovi-PR (Inpespar) — pesquisa bairros:** https://secovipr.com.br/ (consultado 23/04/2026)
5. **ADEMI-PR:** https://ademipr.com.br/mercado-imobiliario-de-curitiba-mantem-valorizacao-com-queda-no-estoque-e-perspectivas-para-novos-lancamentos/ (consultado 23/04/2026)
6. **ADEMI-PR — ritmo aquecido 2025:** https://ademipr.com.br/mercado-imobiliario-de-curitiba-mantem-ritmo-aquecido-com-queda-no-estoque-e-valorizacao-dos-imoveis/ (consultado 23/04/2026)
7. **ABRAINC — ranking imobiliário:** https://www.abrainc.org.br/noticias/ranking-imobiliario-2025-revela-novos-polos-de-crescimento-e-consolidacao-de-mercados-regionais- (consultado 23/04/2026)
8. **Abecip — financiamento deve crescer 16% em 2026:** https://www.abecip.org.br/imprensa/noticias/financiamento-imobiliario-deve-crescer-16-em-2026-projeta-abecip-valor-economico (consultado 23/04/2026)
9. **Abecip — SBPE jan/2026:** https://www.abecip.org.br/admin/assets/uploads/anexos/data-abecip-2026-01.pdf (consultado 23/04/2026)
10. **Abecip — SBPE fev/2026:** https://www.abecip.org.br/admin/assets/uploads/anexos/data-abecip-2026-02.pdf (consultado 23/04/2026)
11. **FGV/IBRE — INCC-M mar/2026:** https://portalibre.fgv.br/press-releases/incc-m-de-marco-de-2026 (consultado 23/04/2026)
12. **BCB — Selic 14,75%:** https://agenciabrasil.ebc.com.br/economia/noticia/2026-03/bc-reduz-juros-basicos-para-1475-ao-ano (consultado 23/04/2026)
13. **IBGE — Rendimento Curitiba Censo:** https://cidades.ibge.gov.br/brasil/pr/curitiba/pesquisa/23/26170 (consultado 23/04/2026)
14. **CUB-PR / Sinduscon-PR:** https://sindusconpr.com.br/ (consultado 23/04/2026)

### Agregadores e imprensa (cruzamento)

15. **MySide — m² Curitiba 2026:** https://myside.com.br/guia-curitiba/metro-quadrado-curitiba-pr (atualizado 02/04/2026, consultado 23/04/2026)
16. **MySide — Bairros mais caros 2026:** https://myside.com.br/guia-curitiba/bairros-mais-caros-curitiba-pr (atualizado 02/04/2026, consultado 23/04/2026)
17. **MySide — Ranking cidades valorizam:** https://myside.com.br/guia-imoveis/cidades-que-mais-valorizam-imoveis (atualizado jan/2026)
18. **Bem Brasil Imóveis — Preço m² 2026 por bairro:** https://curitiba.bembrasilimoveis.com.br/preco-do-m2-em-curitiba-2026/ (consultado 23/04/2026)
19. **Imovel Guide — Mercês:** https://www.imovelguide.com.br/valor-do-metro-quadrado/pr/curitiba/merces (consultado 23/04/2026)
20. **Habitec Imóveis — Guia Mercês:** https://habitec.com.br/blog/guia-do-bairro-merces-em-curitiba-completo-e-atualizado (consultado 23/04/2026)
21. **Top View — mercado 2025/2026:** https://topview.com.br/grands/mercado-imobiliario-de-curitiba-fecha-2025-em-alta-e-inicia-2026-com-projecoes-positivas-segundo-analises-do-setor/ (publicado 26/12/2025)
22. **Estado de Minas — Locação Curitiba atrai investidores:** https://www.em.com.br/mundo-corporativo/2026/03/7387987-alta-da-locacao-atrai-investidores-no-mercado-de-curitiba.html (publicado 31/03/2026)
23. **Gazeta do Povo — Bairros valorizam 23% (Loft):** https://www.gazetadopovo.com.br/vozes/parana-sa/imoveis-curitiba-mercado-aquecido-2025/ (consultado 23/04/2026)
24. **Portas — m² R$ 16,2 mil:** https://portas.com.br/noticias/metro-quadrado-em-curitiba-chega-a-r-162-mil-em-2025/ (consultado 23/04/2026)
25. **Portas — mercado imobiliário 2026 1º tri:** https://portas.com.br/dados-inteligencia/mercado-imobiliario-2026-precos-aluguel-mcmv/ (consultado 23/04/2026)
26. **Plural — aluguel Curitiba R$ 2.035:** https://www.plural.jor.br/aluguel-residencial-em-curitiba-ja-ultrapassa-r-2-035-alta-de-8-6-em-12-meses/ (bloqueou 403 na fetch, citado via search snippet)
27. **Plural — Vai vender imóvel Curitiba (Inpespar 2023):** https://www.plural.jor.br/noticias/negocios/vai-vender-um-imovel-em-curitiba-dados-mostram-preco-e-tempo-ate-a-venda/ (bloqueou 403 na fetch, citado via search snippet)
28. **Bem Paraná — aluguéis por bairro (Secovi jul/2025):** https://www.bemparana.com.br/noticias/economia/alugueis-curitiba-bairros/ (publicado jul/2025)
29. **Bem Paraná — Aluguel alto Curitiba 2026:** https://www.bemparana.com.br/noticias/economia/aluguel-alto-curitiba-vale-pena-comprar-imovel-2026/ (consultado 23/04/2026)
30. **Tribuna PR — Curitiba lidera valorização 80% em 9 anos:** https://www.tribunapr.com.br/noticias/curitiba-regiao/curitiba-lidera-valorizacao-imobiliaria-precos-sobem-80-em-9-anos/ (publicado 11/02/2025)
31. **Tribuna PR — Campo Comprido +59,6% (Loft):** https://www.tribunapr.com.br/noticias/curitiba-regiao/bairro-lidera-valorizacao-imobiliaria-em-curitiba-com-alta-de-quase-60/ (publicado 22/10/2025)
32. **Hub Imobiliário — Aluguel Curitiba +12%:** https://hubimobiliario.com/aluguel-residencial-tem-alta-de-12-em-curitiba/ (consultado 23/04/2026)
33. **Hub Imobiliário — ABRAINC ranking:** https://hubimobiliario.com/rio-de-janeiro-curitiba-e-salvador-lideram-crescimento-em-lancamentos-enquanto-brasilia-recife-e-belo-horizonte-se-destacam-em-vendas-segundo-a-abrainc/ (consultado 23/04/2026)
34. **Istoé Dinheiro — inflação 2x alta preços:** https://istoedinheiro.com.br/em-10-anos-inflacao-foi-o-dobro-da-alta-do-preco-de-imoveis-investimento-vale-a-pena (consultado 23/04/2026)
35. **Bem Paraná — Cabral/Água Verde lideram 14,3%:** https://www.bemparana.com.br/noticias/economia/curitiba-registra-alta-de-no-preco-de-imoveis-em-2025-cabral-e-agua-verde-lideram-altas/ (consultado 23/04/2026)
36. **Larya — preço imóveis +18%:** https://larya.com.br/blog/preco-de-imoveis-sobem-18-em-curitiba/ (consultado 23/04/2026)
37. **Farracha de Castro — mercado 2025:** https://farrachadecastro.com.br/farracha-de-castro/mercado-imobiliario-de-curitiba-em-2025-alta-nos-precos-e-tendencias-para-compradores-e-inquilinos/ (consultado 23/04/2026)
38. **Casbem — 1º semestre 2025:** https://casbem.com.br/blog/numeros-mercado-imobiliario-curitiba-primeiro-semestre-2025 (consultado 23/04/2026)
39. **Portas — bolha imobiliária SP:** https://portas.com.br/noticias/bolha-imobiliaria-em-sao-paulo-as-evidencias-contam-outra-historia/ (consultado 23/04/2026)
40. **iapartamentos — UBS Bubble Index:** https://iapartamentos.com.br/bolha-imobiliaria-em-sao-paulo-mercado-imoveis/ (consultado 23/04/2026)
41. **Sistema Locação Imóveis — Shiller/Bolha:** https://www.sistemadelocacaodeimoveis.com.br/blog/conteudo-para-imobiliarias-corretores-mercado-imobiliario/bolha-imobiliaria-no-brasil-analise-de-especialistas-e-previsoes (consultado 23/04/2026)
42. **GPF — Endividamento famílias 2026:** https://www.gpf.adv.br/2026/04/01/inadimplencia-no-brasil-em-2026-endividamento-das-familias-no-teto-historico-risco-de-credito-estrutural-e-implicacoes-juridicas-para-empresas/ (publicado 01/04/2026)
43. **Folha via Abecip — Curitiba mais encareceu 2024:** https://www.abecip.org.br/imprensa/noticias/imoveis-de-curitiba-foram-os-que-mais-encareceram-em-2024-veja-ranking-das-capitais-folha-de-s-paulo (consultado 23/04/2026)
44. **InfoMoney — Aluguel +9,44% 2025:** https://www.infomoney.com.br/minhas-financas/aluguel-sobe-944-em-2025-e-mantem-mercado-aquecido-mostra-indice-fipezap/ (consultado 23/04/2026)
45. **Portas — valorização imóveis 2025:** https://portas.com.br/dados-inteligencia/valorizacao-imovel-2025/ (consultado 23/04/2026)
46. **Vincere Incorporadora — valorização supera inflação:** https://www.vincereincorporadora.com.br/valorizacao-dos-imoveis-em-curitiba/ (consultado 23/04/2026)

### Fontes citadas mas não consultáveis diretamente

- Plural.jor.br (2 artigos): bloqueou WebFetch 403, dados citados via WebSearch snippet
- Downloads FipeZap PDF direto: bloqueou (403) ou retornou binário não extraível; dados citados via imprensa que cruzou o PDF
- QuintoAndar PDF índice: binário não extraível

---

## 11. Recomendações finais para o post

### 11.1. Números-âncora validados para reescrita

**Primários (usar com fonte linkada):**
- **R$ 11.621/m² (abr/2026)** — FipeZap [⁵]
- **+6,26% em 12 meses** — FipeZap [⁵]
- **R$ 17.924/m² Batel** — FipeZap via MySide [¹⁶]
- **Ahú +12,50%** e **Juvevê +11,50%** — os 2 bairros que mais valorizaram no top 10 [¹⁶]
- **Yield 4,74% a.a.** (mar/2026) — FipeZap [²⁶]
- **Curitiba 2º em valorização nacional 2025** (+17,86%, atrás de Salvador) — FipeZap [¹⁵]
- **VGV Curitiba 2025: R$ 7,4 bilhões**; 10,2 mil unidades vendidas — ADEMI-PR [¹]
- **Aluguel R$ 46,82/m², +9,83% em 12m** — FipeZap [²¹]
- **Selic 14,75%, Caixa balcão 11,19%** — BCB / validado em `financing-rates-2026-04.md`
- **INCC-M 12m +5,81%** — FGV [³⁶]

### 11.2. Números a REMOVER do post atual

- Yield 0,5-0,7%/mês → usar 4,74% a.a. (0,40%/mês) FipeZap
- Preço m² R$ 8.500-9.500 → usar R$ 11.621 FipeZap
- Vacância 2-4% sem fonte → substituir por LSO Secovi ou remover
- Taxas Caixa 8,5-10,5% → remover tabela inteira (linkar pillar de financiamento)
- "Mercês +9%" sem fonte → substituir por Ahú +12,5% (fonte FipeZap) ou qualificar com Imovel Guide
- "Planta Ecoville +15-25%" sem fonte → substituir por "alvarás vertical +22% 2º sem. 2025" (ADEMI-PR)
- Prazo Itaú 30 anos / Bradesco 30 anos → tudo 35 anos (420 meses) (se mantiver tabela)

### 11.3. Título recomendado

- **"Preço do m² em Curitiba em 2026: R$ 11.621 (+6,26%), Ahú liderou o ano"** (60 chars, 2 números concretos, sem YMYL risk)
- ou **"Curitiba, 2º em valorização do Brasil em 2025 (+17,86%): onde o m² mais subiu"** (70 chars — cortar)
- **NÃO usar "bolha"** — teste feito nesta pesquisa descarta a hipótese (UBS -0,10 proxy SP, preço real 2026 próximo do pico 2014, SBPE caiu em 2025).

---

## 12. Referências numeradas

[¹] ADEMI-PR / BRAIN Pesquisa Imobiliária 2025 (via Gazeta do Povo / Bandnews Curitiba) — 26/12/2025
[²] ADEMI-PR — "Mercado imobiliário mantém ritmo aquecido" — 02/09/2025
[³] ADEMI-PR — "Imóveis em Curitiba: licenciamentos crescem 150% e vendas 42,2%" — 2023
[⁴] ABRAINC — Ranking Imobiliário 2025 + Hub Imobiliário (2024 lançamentos) — jan/2026
[⁵] FipeZap via MySide — Informe abr/2026 — R$ 11.621/m², +6,26% 12m
[⁶] DataZap — FipeZap série mensal
[⁷] FipeZap nov/2025 via Infomoney — R$ 11.652/m², +11,15% 12m
[⁸] FipeZap out/2025 — Curitiba +1,21% no mês (maior entre capitais)
[⁹] FipeZap mai/2025 — R$ 11.164/m²
[¹⁰] FipeZap fev/2025 via Farracha de Castro — 4ª mais cara do país
[¹¹] FipeZap fechamento 2024 via Abecip/Folha — Curitiba 1ª em valorização nacional (+18%)
[¹²] FipeZap 2022 — R$ 8.522/m², +13,64% ano
[¹³] Tribuna PR 11/02/2025 — +80% em 9 anos, rentabilidade anual combinada ~20%
[¹⁴] FipeZap série 2014-2024 via Istoé Dinheiro — IPCA +85,8% vs FipeZap +41,6% vs Curitiba +78%
[¹⁵] FipeZap 2025 via MySide — Curitiba 2º (+17,86%)
[¹⁶] FipeZap por bairro via MySide — abr/2026
[¹⁷] Loft via G1 — dez/2025 — variação por tipologia
[¹⁸] Bem Brasil Imóveis — preço m² 2026 por bairro
[¹⁹] Imovel Guide / Habitec — Mercês R$ 9,5k-14k / média R$ 10,6k
[²⁰] Loft — variação por tipologia Q4 2025 via Gazeta do Povo
[²¹] FipeZap via Estado de Minas — mar/2026 — R$ 46,82/m² aluguel, +9,83%
[²²] FipeZap dez/2025 via Infomoney — yield 4,55% a.a.
[²³] FipeZap jul/2025 via Plural — R$ 2.035 aluguel, +8,6%
[²⁴] Secovi-PR 2025 via Hub Imobiliário — R$ 2.164 aluguel, +12,2%
[²⁵] Secovi-PR — pesquisa bairros aluguel — 07/07/2025 via Bem Paraná
[²⁶] FipeZap locação mar/2026 — yield 4,74% a.a.
[²⁷] Inpespar/Secovi-PR — LSO residencial e comercial
[²⁸] CBIC via Portas — estoque ~8 meses Curitiba 2026
[²⁹] Inpespar outubro 2023 via Plural — 140 dias tempo médio
[³⁰] Portas — negociação 2-8% abaixo preço pedido
[³¹] UBS Global Real Estate Bubble Index 2025 — via iapartamentos
[³²] UBS SP score -0,10 e queda real 25% 2014-2022 — via Portas
[³³] BCB dez/2025 via GPF — endividamento famílias 31,22% (ex-habitação)
[³⁴] Abecip — SBPE 2025 R$ 156 bi (-13%), projeção 2026 +15%
[³⁵] Abecip — data SBPE jan e fev 2026
[³⁶] FGV/IBRE — INCC-M mar/2026 +5,81% em 12m
[³⁷] BCB / Agência Brasil — COPOM 18/03/2026 Selic 14,75%
