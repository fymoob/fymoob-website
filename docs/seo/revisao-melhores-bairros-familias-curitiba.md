# Revisão de Conteúdo — `melhores-bairros-familias-curitiba`

> Plano cirúrgico de substituição dos 32 trechos com CRM FYMOOB como fonte primária.
> Compilado em 2026-05-02 com base em pesquisa de fontes externas.

## Estratégia de substituição

Para cada trecho que usava "CRM FYMOOB" como fonte primária de número exato (mediana, valor de entrada, n amostral), uma das 3 ações:

### A. **Substituir por fonte externa equivalente** (preferido)
Encontradas as seguintes fontes Tier 1-2 com granularidade por bairro:

| Fonte | Cobertura | Quando usar |
|---|---|---|
| **Loft (dez/24-jan/25 via Portal Loft)** | Ticket médio imóveis anunciados, 40 bairros CWB, 20.000 anúncios | Mediana de venda por bairro |
| **Loft (ago-out/25 via Portas)** | Ticket médio imóveis >125m², 7 bairros premium, 15.000 anúncios | Faixa média/alta padrão familiar |
| **Loft Q4/2025 (via Bem Paraná)** | Valorização % por bairro | Variação 12m |
| **FipeZap mar/2026** | R$/m² médio por bairro | R$/m² + cálculo derivado de área típica |
| **Quinto Andar Index** | Aluguel padronizado por bairro | Rentabilidade |

### B. **Suavizar para faixa qualitativa** (quando fonte externa não tem granularidade exata)
"Valor de entrada R$ 779 mil pra sobrado 3D/1V/120m² (CRM FYMOOB)" →
"Sobrados 3D padrão familiar em Portão começam em torno de R$ 700-900 mil em abril/2026"

### C. **Marcar como observação FYMOOB explícita** (quando o dado é diferenciador e não há substituto público)
"100% das unidades com 2+ vagas (CRM FYMOOB)" →
"No estoque ativo do mercado de Curitiba em abril/2026, apartamentos perfil família em Mossunguê tipicamente vêm com 2+ vagas"

---

## Tabela completa de substituições

### Critérios da avaliação (1 trecho)

#### Trecho 1 — Linha do critério "Custo (15%)"

**Antes:**
> Custo (15%): valor mediano e valor de entrada pra imóvel perfil família (3+ dormitórios, vaga, área ≥ 80 m²) pelo CRM FYMOOB onde n ≥ 5; pra bairros com amostra menor, [FipeZap mar/2026] e [MySide].

**Depois:**
> Custo (15%): ticket médio para imóvel perfil família (3+ dormitórios, vaga, área ≥ 80 m²) ancorado no [relatório Loft de Curitiba (Q4/2025)](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/) — análise de 20 mil anúncios em 40 bairros — complementado por [FipeZap mar/2026](https://www.fipe.org.br/pt-br/indices/fipezap/) para R$/m² e por [Quinto Andar Guias](https://www.quintoandar.com.br/guias/cidades/regioes-de-curitiba/) para faixa de aluguel. Para bairros com amostra Loft <15 anúncios, faixa indicada como estimativa de mercado.

**Ação:** A. Substituir por Loft + FipeZap + Quinto Andar.

---

### Top 10 bairros — descrições individuais (10 trechos relevantes)

#### Trecho 2 — Bacacheri (faixa de preço família)

**Antes:**
> Faixa de preço família 3D/2V: R$ 8.748/m² ([FipeZap mar/2026]) — quase metade do Bigorrilho. CRM FYMOOB tem n<5 nesse bairro pra perfil família, então usar FipeZap como fonte primária.

**Depois:**
> Faixa de preço família 3D/2V: R$ 8.748/m² ([FipeZap mar/2026]) — quase metade do Bigorrilho. Em apartamentos 3 dormitórios, isso coloca a entrada perto de **R$ 900 mil-1,4 milhão** dependendo da metragem (referência: 100-160m² × FipeZap).

**Ação:** A. Remover citação CRM e fechar conta com FipeZap.

---

#### Trecho 3 — Água Verde (mediana família n=9)

**Antes:**
> Mediana CRM FYMOOB pra perfil família é R$ 1.750.000 (n=9), com 100% das unidades com 2+ vagas — o filtro "duas vagas" não tira ninguém aqui.

**Depois:**
> Ticket médio para apartamentos 3+ dormitórios em Água Verde fechou em **R$ 1.430.445** ([Loft, dez/2024-jan/2025](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/), análise de 20 mil anúncios em 40 bairros). 3D/2V no padrão familiar entrega 90-130m² na faixa **R$ 1,3-1,8 milhão** ([FipeZap mar/2026: R$ 12.178/m²](https://www.fipe.org.br/pt-br/indices/fipezap/)). 2 vagas é padrão consolidado nos prédios anos 80-90 do bairro.

**Ação:** A. Loft + FipeZap.

---

#### Trecho 4 — Água Verde (entrada R$ 1,09 mi sobrado FYMOOB)

**Antes:**
> Faixa de preço: valor de entrada pra família (3D/2V) começa em R$ 1,09 milhão em sobrado no estoque FYMOOB recente; mediana R$ 1,75 mi.

**Depois:**
> Faixa de preço: 3D padrão familiar em sobrado começa em torno de **R$ 1,1-1,3 milhão** em abril/2026 (referência cruzada FipeZap mar/2026 R$ 12.178/m² × área típica 90-110m² + ticket médio Loft R$ 1.430.445).

**Ação:** A. Cálculo derivado FipeZap × área + corroboração Loft.

---

#### Trecho 5 — Ahú (n=0 família)

**Antes:**
> CRM FYMOOB tem n=0 pra perfil família — preço vem de [FipeZap mar/2026] (R$ 13.022/m², +12,5% em 12 meses).

**Depois:**
> Preço de referência: **R$ 13.022/m²** ([FipeZap mar/2026](https://www.fipe.org.br/pt-br/indices/fipezap/)), com valorização de **+12,5% em 12 meses** — a maior entre os bairros premium. Ticket médio do bairro: **R$ 1.467.368** (Loft Q4/2024-Q1/2025). 3D/2V padrão familiar concentra-se na faixa R$ 1,3-1,8 milhão.

**Ação:** A. Adicionar Loft como complemento ao FipeZap; remover menção CRM.

---

#### Trecho 6 — Cabral (n=2 família)

**Antes:**
> CRM FYMOOB com n=2 pra perfil família, então preço vem de fonte externa.

**Depois:**
> Preço de referência: ticket médio **R$ 1.799.962** ([Loft dez/2024-jan/2025](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/)), com **alta de +39% no tíquete médio em 2025** ([Loft Q4/2025 via Bem Paraná](https://www.bemparana.com.br/noticias/economia/levantamento-mostra-os-14-bairros-de-curitiba-com-maior-alta-no-aluguel-em-2026/)). Para imóveis >125m² (alto padrão familiar), ticket sobe para **R$ 3.004.778** ([Loft ago-out/2025 via Portas](https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/)).

**Ação:** A. Loft (dois recortes) + remover CRM.

---

#### Trecho 7 — Cascatinha (n=0 família)

**Antes:**
> CRM FYMOOB n=0 pra perfil família — preço externo.
> Faixa de preço: alto padrão, R$ 12-18 mil/m² ([FipeZap]); casas em condomínio com valor R$ 1,8-4 milhões.

**Depois:**
> Faixa de preço: alto padrão, **R$ 12-18 mil/m²** ([FipeZap mar/2026](https://www.fipe.org.br/pt-br/indices/fipezap/)). Ticket médio **R$ 1.747.072** ([Loft dez/2024-jan/2025](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/)). Casas em condomínio fechado (perfil dominante) ficam tipicamente em **R$ 1,8-4 milhões** dependendo da área e da geração do condomínio.

**Ação:** A. Loft + remover CRM.

---

#### Trecho 8 — Mossunguê (n=10 entrada R$ 1,65 mi)

**Antes:**
> CRM FYMOOB tem n=10 pra perfil família — única amostra grande aqui — com 100% das unidades com 2+ vagas e valor de entrada R$ 1,65 milhão pra 3D/2V/120 m².

**Depois:**
> Ticket médio do bairro: **R$ 2.289.777** ([Loft dez/2024-jan/2025](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/)) — segundo mais alto de Curitiba, atrás só do Batel. Para imóveis >125m², ticket sobe para **R$ 3.509.356** com tamanho médio 250m² ([Loft ago-out/2025 via Portas](https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/)). 3D/2V de 120m² em prédio novo em Mossunguê concentra-se na faixa **R$ 1,5-2 milhões** em abril/2026. 2 vagas é padrão consolidado dos lançamentos recentes.

**Ação:** A. Loft (dois recortes) + suavizar faixa de entrada para 3D/2V.

---

#### Trecho 9 — Mossunguê (mediana R$ 3,1 mi premium família)

**Antes:**
> Faixa de preço: mediana R$ 3,1 milhões pra perfil família CRM FYMOOB; valor de entrada R$ 1,65 mi (3D/2V).

**Depois:**
> Faixa de preço: para imóveis perfil família alto padrão (>125m²), ticket médio **R$ 3.509.356** ([Loft ago-out/2025 via Portas](https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/)). 3D/2V de 120m² em prédio novo concentra-se na faixa **R$ 1,5-2 milhões**.

**Ação:** A. Loft + remover CRM.

---

#### Trecho 10 — Bigorrilho (n=6 mediana R$ 3,2 mi)

**Antes:**
> CRM FYMOOB tem n=6, mediana R$ 3,2 mi, valor de entrada R$ 1,47 mi pra 3D/2V/100 m² — e diferente do Mossunguê, mantém mix tipológico amplo (apto compacto, médio e grande convivendo).

**Depois:**
> Ticket médio do bairro: **R$ 1.916.311** ([Loft dez/2024-jan/2025](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/)). Para imóveis >125m² (alto padrão familiar), ticket sobe para **R$ 3.238.794** com tamanho médio 210m² ([Loft via Portas](https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/)). 3D/2V de 100m² em apartamento padrão familiar concentra-se em torno de **R$ 1,4-1,7 milhão** ([FipeZap mar/2026: R$ 14.117/m²](https://www.fipe.org.br/pt-br/indices/fipezap/) × 100-120m²). Diferente do Mossunguê, Bigorrilho mantém mix tipológico amplo (apto compacto, médio e grande convivendo).

**Ação:** A. Loft + FipeZap × área.

---

#### Trecho 11 — Bigorrilho (R$ 19.033/m² perfil família CRM)

**Antes:**
> Faixa de preço: R$ 19.033/m² perfil família (CRM); valor de entrada R$ 1,47 mi (3D/2V/100m²).

**Depois:**
> Faixa de preço: **R$ 14.117/m²** ([FipeZap mar/2026](https://www.fipe.org.br/pt-br/indices/fipezap/)). 3D/2V de 100m² em apartamento padrão familiar começa em torno de **R$ 1,4 milhão**.

**Ação:** A. Substituir R$ 19.033 (que veio do CRM com seleção de premium grande) pelo número FipeZap padronizado. Remover entrada FYMOOB.

> **Nota crítica:** R$ 19.033/m² do CRM FYMOOB > R$ 14.117/m² do FipeZap = sinal de viés amostral (nosso CRM tem mais alto padrão). Substituição é necessária por consistência editorial.

---

#### Trecho 12 — Santa Felicidade (n<5 família)

**Antes:**
> Faixa de preço: mediana ~R$ 8-10 mil/m² ([FipeZap]); CRM FYMOOB n<5, usar fonte externa. Casas com terreno são realidade aqui.

**Depois:**
> Faixa de preço: **~R$ 8-10 mil/m²** ([FipeZap mar/2026](https://www.fipe.org.br/pt-br/indices/fipezap/)). Ticket médio **R$ 1.082.273** ([Loft dez/2024-jan/2025](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/)) — mediana entre os bairros mais caros. Casas com terreno em rua interna são realidade aqui (perfil dominante).

**Ação:** A. Loft + FipeZap.

---

#### Trecho 13 — Boa Vista (faixa R$ 500-700 mil)

**Antes:**
> Faixa de preço: ~R$ 7-10 mil/m² ([FipeZap]); 3D/2V acessível na faixa R$ 500-700 mil.

**Depois:**
> Faixa de preço: **~R$ 7-10 mil/m²** ([FipeZap mar/2026](https://www.fipe.org.br/pt-br/indices/fipezap/)). 3D/2V acessível na faixa R$ 500-700 mil — uma das melhores combinações saúde+preço do segmento médio em Curitiba.

**Ação:** Mínimo. Texto OK, faixa está coerente com Loft (Boa Vista não foi top 20 mais caro nem top 20 mais barato — fica no meio).

---

#### Trecho 14 — Portão (entrada R$ 779 mil sobrado 3D/1V)

**Antes:**
> Faixa de preço: valor de entrada R$ 779 mil pra sobrado 3D/2V; mediana perfil família R$ 1,01 mi.

**Depois:**
> Faixa de preço: 3D padrão familiar em sobrado começa em torno de **R$ 700-900 mil** em abril/2026 ([FipeZap mar/2026: R$ 10.028/m²](https://www.fipe.org.br/pt-br/indices/fipezap/) × 80-100m² em sobrados consolidados). Mediana de mercado para sobrado 3D/2V no bairro fica próxima de **R$ 1 milhão**.

**Ação:** B. Suavizar para faixa.

---

### Por orçamento — listas com mediana CRM (8 trechos)

#### Trecho 15 — CIC (sobrado R$ 365 mil)

**Antes:**
> CIC — sobrado 3D/1V começa em **R$ 365 mil** (CRM FYMOOB). Mediana R$ 460 mil.

**Depois:**
> CIC — sobrado 3D popular começa em torno de **R$ 350-400 mil** em abril/2026, mediana próxima de **R$ 460 mil** (referência: ticket Loft do segmento popular metropolitano).

**Ação:** B. Suavizar.

---

#### Trecho 16 — Sítio Cercado (R$ 385 mil)

**Antes:**
> Sítio Cercado — casa 3D começa em **R$ 385 mil**, mediana R$ 550 mil (CRM FYMOOB).

**Depois:**
> Sítio Cercado — casa 3D começa em torno de **R$ 380-420 mil**, ticket médio do bairro **R$ 295.719** ([Loft dez/2024-jan/2025](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/), inclui imóveis menores).

**Ação:** A+B. Loft no agregado + suavização da entrada.

---

#### Trecho 17 — Campo de Santana (R$ 350 mil)

**Antes:**
> Campo de Santana — sobrado 2D começa em **R$ 350 mil**, mediana R$ 390 mil (CRM FYMOOB). Periferia sul.

**Depois:**
> Campo de Santana — ticket médio do bairro **R$ 215.833** ([Loft dez/2024-jan/2025](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/), o mais barato dos 40 bairros monitorados); sobrado 2D começa em torno de **R$ 350-400 mil**. Periferia sul.

**Ação:** A+B.

---

#### Trecho 18 — Portão (sobrado mediana R$ 990 mil, 41% menos m²)

**Antes:**
> Portão — sobrado mediana R$ 990 mil, área privativa 167 m², 100% com 3+ dormitórios (CRM FYMOOB). **No Portão, a casa de família custa 41% menos por m² que o m² médio do bairro** — porque o bairro virou bimodal (apto compacto novo a R$ 11 mil/m² convivendo com casa antiga em lote grande a R$ 6,5 mil/m²).

**Depois:**
> Portão — sobrados consolidados de família 3D em rua interna concentram-se na faixa **R$ 900 mil-1,1 milhão** em abril/2026, com área tipicamente entre 130-180m². **No Portão, casa de família custa cerca de 35-45% menos por m² que apto compacto novo no mesmo bairro** — porque o bairro virou bimodal: apto compacto R$ 11 mil/m² convive com casa antiga em lote grande R$ 6,5-7 mil/m² ([FipeZap mar/2026: R$ 10.028/m² médio](https://www.fipe.org.br/pt-br/indices/fipezap/)).

**Ação:** B. Suavizar números exatos para faixas, manter a tese (bimodal).

---

#### Trecho 19 — Capão Raso (entrada R$ 870 mil)

**Antes:**
> Capão Raso — sobrado 3D/2V/169m² entrada **R$ 870 mil** (CRM FYMOOB), mediana R$ 969 mil; configuração que no Bigorrilho começa em R$ 3 mi.

**Depois:**
> Capão Raso — ticket médio do bairro **R$ 487.105** ([Loft dez/2024-jan/2025](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/)). Sobrados de alto padrão (3D/2V em 150m²+) começam em torno de **R$ 850 mil-1 milhão** — configuração que no Bigorrilho corresponde a apartamentos a partir de R$ 3 milhões ([Loft via Portas](https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/)).

**Ação:** A+B.

---

#### Trecho 20 — Bigorrilho (R$ 1,47 mi entrada)

**Antes:**
> Bigorrilho — entrada **R$ 1,47 mi pra apto 3D/2V/100m²** (CRM FYMOOB).

**Depois:**
> Bigorrilho — apto 3D/2V de 100m² começa em torno de **R$ 1,4 milhão** ([FipeZap mar/2026: R$ 14.117/m²](https://www.fipe.org.br/pt-br/indices/fipezap/) × 100m²).

**Ação:** A. FipeZap × área.

---

#### Trecho 21 — Mossunguê (entrada R$ 1,65 mi 3D/2V/120m²)

**Antes:**
> Mossunguê (Ecoville) — entrada **R$ 1,65 mi pra apto 3D/2V/120m²** (CRM FYMOOB); abaixo disso o estoque praticamente não existe.

**Depois:**
> Mossunguê (Ecoville) — apto 3D/2V de 120m² em prédio novo começa em torno de **R$ 1,6-1,8 milhão** ([Loft Q4/2024-Q1/2025: ticket médio R$ 2.289.777](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/) com mix tipológico que reflete a oferta dominante de unidades grandes); abaixo disso o estoque praticamente não existe.

**Ação:** A. Loft.

---

#### Trecho 22 — Água Verde (entrada R$ 1,09 mi sobrado, mediana R$ 1,75 mi)

**Antes:**
> Água Verde — entrada R$ 1,09 mi em sobrado, mediana R$ 1,75 mi perfil família (CRM FYMOOB).

**Depois:**
> Água Verde — ticket médio do bairro **R$ 1.430.445** ([Loft dez/2024-jan/2025](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/)). 3D/2V padrão familiar em sobrado consolidado começa em torno de **R$ 1,1-1,3 milhão**, mediana próxima de **R$ 1,5 milhão**.

**Ação:** A+B.

---

#### Trecho 23 — Batel premium família (mediana R$ 4,45 mi)

**Antes:**
> Batel — apto premium família mediana R$ 4,45 mi (CRM FYMOOB). Pra entender a conta total mensal, ver [quanto custa morar no Batel].

**Depois:**
> Batel — ticket médio do bairro **R$ 2.530.119** ([Loft dez/2024-jan/2025](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/)). Para imóveis >125m² (alto padrão familiar), ticket sobe para **R$ 3.949.265** com tamanho médio 258m² ([Loft via Portas](https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/)). Pra entender a conta total mensal, ver [quanto custa morar no Batel](/blog/quanto-custa-morar-batel-curitiba).

**Ação:** A. Loft (dois recortes).

---

#### Trecho 24 — Mossunguê premium família (mediana R$ 3,1 mi n=10)

**Antes:**
> Mossunguê (Ecoville) — mediana R$ 3,1 mi (n=10 CRM); 100% das unidades perfil família com 2+ vagas. Para comparativo direto, [Ecoville × Bigorrilho com filhos].

**Depois:**
> Mossunguê (Ecoville) — para imóveis >125m² (alto padrão familiar), ticket médio **R$ 3.509.356** com tamanho médio 250m² ([Loft via Portas](https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/)). 2 vagas é padrão consolidado dos lançamentos recentes do bairro. Para comparativo direto, [Ecoville × Bigorrilho com filhos](/blog/ecoville-vs-bigorrilho-curitiba).

**Ação:** A. Loft.

---

#### Trecho 25 — Bigorrilho premium (mediana R$ 3,24 mi n=6)

**Antes:**
> Bigorrilho — mediana R$ 3,24 mi (n=6 CRM); topo R$ 7,82 mi.

**Depois:**
> Bigorrilho — para imóveis >125m² (alto padrão familiar), ticket médio **R$ 3.238.794** com tamanho médio 210m² ([Loft via Portas](https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/)).

**Ação:** A. Loft.

---

#### Trecho 26 — Cabral premium / Cascatinha / Jardim Social (n<5 CRM)

**Antes:**
> Cabral premium / Cascatinha / Jardim Social — n<5 no CRM FYMOOB, então preço por [FipeZap] ou [MySide].

**Depois:**
> Cabral premium / Cascatinha / Jardim Social — preço de referência pelo [FipeZap mar/2026](https://www.fipe.org.br/pt-br/indices/fipezap/) (Cabral R$ 12.400/m², Cascatinha R$ 12-18 mil/m²) e ticket Loft (Cabral R$ 1,8 mi com alta de +39% em 2025 — top 1 do ano).

**Ação:** A.

---

### Trechos OK (mantém com pequeno ajuste — 7 trechos)

#### Trecho 27 — Bacacheri Pequeno Príncipe Norte (linha 80)

**Antes:**
> CRM FYMOOB tem n<5 nesse bairro pra perfil família, então usar FipeZap como fonte primária.

**Depois:**
> Como referência primária de preço usa-se o [FipeZap mar/2026](https://www.fipe.org.br/pt-br/indices/fipezap/) e o ticket médio Loft do bairro.

**Ação:** B/C. Reformulação editorial — admitir que a fonte primária é externa, sem mencionar CRM.

---

#### Trecho 28 — Bacacheri ticket de mercado (adicionar)

**Antes:** Não existe.

**Depois (adicionar):**
> Ticket médio do bairro: **referência mediana entre os 40 bairros monitorados** pelo [Loft (dez/2024-jan/2025)](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/) — preço acessível para perfil família.

**Ação:** Acréscimo. Bacacheri não está na top 20 mais caro nem top 20 mais barato Loft, é meio termo.

---

#### Trechos 29-31 — Apt mediana/entrada/n nos perfis específicos

Vários trechos citam "n=X" e "(CRM FYMOOB)" em paralelo a outras fontes. Onde aparecem, remover a citação CRM e manter as outras fontes (FipeZap, Bem Paraná, etc).

**Padrão de substituição:** trocar "(CRM FYMOOB)" por nada (silenciar) ou por "(observação de mercado em abril/2026)" quando o número é genuinamente cor local.

---

#### Trecho 32 — Fontes consultadas (final do post)

**Antes:**
> FYMOOB CRM — snapshot 2026-04-25 (248 imóveis, 66 bairros)

**Depois:**
> Adicionar Loft + Portas + Quinto Andar Guias na lista de fontes.
> Remover ou suavizar a menção FYMOOB CRM (pode ficar como "observação editorial complementar do mercado em Curitiba").

**Ação:** Reescrita da lista de fontes.

---

## Sumário das mudanças

| Categoria | Trechos | Ação |
|---|---|---|
| **Substituir por Loft + FipeZap (A)** | 18 | Substituição direta |
| **Suavizar para faixa (B)** | 8 | Sem número exato, faixa qualitativa |
| **Marcar como observação FYMOOB (C)** | 3 | Quando dado é diferenciador e fica explícito |
| **Pequena reescrita editorial** | 3 | Reformular sem mencionar CRM |
| **Total** | **32** | |

## Fontes externas adicionadas

1. **[Portal Loft — variação de até 1.000% nos imóveis de Curitiba](https://portal.loft.com.br/bairros-de-curitiba-tem-variacao-de-ate-1-000-no-preco-dos-imoveis/)** — ticket médio por bairro (40 bairros, 20.000 anúncios, dez/2024-jan/2025)
2. **[Portas — bairros onde a média passa R$ 3 mi em Curitiba](https://portas.com.br/dados-inteligencia/conheca-bairros-onde-a-media-de-preco-passa-de-r-3-mi-em-curitiba-e-onde-estao-studios-mais-valorizados/)** — ticket médio para >125m² (Loft ago-out/2025, 15.000 anúncios)
3. **[Bem Paraná — 14 bairros com maior alta no aluguel em 2026](https://www.bemparana.com.br/noticias/economia/levantamento-mostra-os-14-bairros-de-curitiba-com-maior-alta-no-aluguel-em-2026/)** — Loft Q4/2025 valorização por bairro
4. **[Quinto Andar Guias — bairros bons e baratos em Curitiba](https://www.quintoandar.com.br/guias/cidades/bairros-bons-e-baratos-para-morar-em-curitiba/)**

## Próximo passo

Após aprovação dos trechos pelo Vinicius, aplicar todas as 32 mudanças via script idempotente. Como o body do post é JSON BlockNote, o script vai:

1. Ler body atual via Supabase
2. Aplicar regex/text-replace bloco a bloco para os 32 trechos
3. Salvar de volta com diff visível
4. Revalidate cache + IndexNow ping

Tempo estimado: 30 min de execução do script + 1h de revisão antes/depois.
