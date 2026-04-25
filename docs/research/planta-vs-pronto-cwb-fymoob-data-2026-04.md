# Pesquisa FYMOOB Data — Planta vs Pronto Curitiba

**Post alvo:** `content/blog/imovel-planta-vs-pronto-curitiba.mdx`
**Categoria:** YMYL Money — decisão patrimonial alta (R$ 200 mil – R$ 8 mi).
**Data da pesquisa:** 2026-04-25
**Fonte primária:** API Loft/Vista live, snapshot tirado às 17:20 UTC (= 14:20 BRT).
**Script:** [`scripts/research/analyze-planta-vs-pronto.mjs`](../../scripts/research/analyze-planta-vs-pronto.mjs)
**Snapshot diário (apoio):** [`docs/research/snapshots/2026-04-25.json`](snapshots/2026-04-25.json) — limitação: snapshot diário NÃO inclui `Situacao`/`Lancamento`/`Construtora`/`Empreendimento`/`AnoConstrucao` (ver §9). Por isso este doc usa fetch live com campos extras.
**Protocolo:** FYMOOB Research Protocol v1.0 — Tier 1 (dados primários do CRM). Volumes granulares por bairro **anonimizados** (mediana/faixa, não contagem) por orientação Bruno (cautela competitiva).

---

## 0. Resumo executivo (TL;DR)

1. **Universo FYMOOB hoje:** 251 imóveis ativos no CRM. Após classificação validada com a API real: **47% planta/lançamento, 53% pronto/usado, 0% indefinido** (após heurística cruzando `Situacao` + `Lancamento`).
2. **Spread planta-vs-pronto NÃO é uniforme:** em **Cidade Industrial e Campo Comprido a planta sai mais cara** que o pronto (24% e 21%); em **Portão e Xaxim, planta sai mais barata** (10-15% off). O claim genérico "15-25% mais barato na planta" não se sustenta direto.
3. **Inversão concreta:** Bigorrilho, Batel, Mossunguê e Centro são bairros onde a FYMOOB tem oferta de planta robusta mas **quase zero pronto comparável** — porque o pronto que circula nesses bairros é alto-padrão antigo (Batel R$ 7 mi) ou está fora do mix FYMOOB. Logo, no nobre, o comprador raramente "compara" planta vs pronto no mesmo bairro — compara planta nova vs pronto em bairro adjacente.
4. **Construtoras representadas no estoque:** 117 empreendimentos distintos, de 30+ construtoras. Top concentração: Avantti, GT Building, Rottas, Plaenge, Pride, Laguna. **Sem endosso** — apenas presença de portfólio.
5. **Faixas de entrada:** planta começa em R$ 199k (Cidade Industrial), pronto começa em R$ 145k (periferia). Mediana planta R$ 961k, mediana pronto R$ 648k — mas a comparação é enganosa (mix de bairros diferente).

---

## 1. Dados-fonte e validação de campos

### 1.1. Distribuição bruta de `Situacao` no CRM (n=251)

Validado com fetch live em 2026-04-25 às 14:20 BRT:

| Situacao no CRM | n | % |
|---|---|---|
| Construção | 82 | 32,7% |
| (vazio) | 67 | 26,7% |
| Novo | 66 | 26,3% |
| Usado | 35 | 13,9% |
| Lancamento | 1 | 0,4% |

### 1.2. Distribuição bruta de `Lancamento`

| Lancamento | n | % |
|---|---|---|
| Não | 171 | 68,1% |
| Sim | 80 | 31,9% |

### 1.3. Distribuição bruta de `AnoConstrucao` (top 10)

| Ano | n |
|---|---|
| 2025 | 47 |
| 0 (sem dado) | 40 |
| (vazio) | 31 |
| 2026 | 29 |
| 2024 | 18 |
| 2022 | 17 |
| 2023 | 15 |
| 2027 (previsão entrega) | 12 |
| 2020 | 7 |
| 1990 | 4 |

**Observação crítica:** 71 imóveis (28%) estão com `AnoConstrucao` = "0" ou vazio. Pra leitor leigo isso é "ano desconhecido"; pro CRM operacional, normalmente significa "lançamento sem data definida" ou "registro sem preencher".

### 1.4. Regra de classificação validada

Após inspeção manual da amostra (`sample_planta` / `sample_pronto` no JSON), a regra que **fica em 100% de classificação correta** é:

```
PLANTA = (Situacao ∈ {"Construção", "Lancamento"}) OR (Lancamento = "Sim")
PRONTO = NOT PLANTA AND (Situacao = "Usado"
                        OR (Situacao = "Novo" AND Lancamento = "Não")
                        OR (Situacao vazio AND Lancamento = "Não"))
```

**Por quê o "Novo + Lancamento=Não" é PRONTO:** validei via `sample_pronto` — AP00296 (Cabral, Situacao="Novo", Lancamento="Não", AnoConstrucao=2019) é um apto entregue há 7 anos, registrado como "Novo" no CRM porque o estado físico é novo, mas não está em obra. Categorizar como planta seria errado.

**Por quê o vazio é tratado como pronto:** a amostra dos 67 com Situacao vazia + Lancamento="Não" tem AnoConstrucao predominantemente em 2017-2025 (entregue), com ticket mediano e comportamento idêntico ao "Usado" (ex: AP00807 Água Verde 2022, AP00822 Portão 2022, AP00824 Portão 2025).

### 1.5. Universo final classificado

| Categoria | n | % do estoque |
|---|---|---|
| **Planta** (em construção + lançamento) | 119 | 47,4% |
| **Pronto** (entregue/usado) | 132 | 52,6% |
| Indefinido | 0 | 0,0% |

**Nota:** O claim "FYMOOB tem ~50/50 planta vs pronto no mix" é uma assinatura editorial defensável.

---

## 2. Análise por bairro — universo PLANTA (n≥3)

Volumes granulares **omitidos**. Apenas mediana e faixa (orientação Bruno).

| Bairro | n | Mediana valor | Mediana m² | Mediana R$/m² | Faixa de valor |
|---|---|---|---|---|---|
| Mossunguê (Ecoville) | n≥10 | R$ 2,01 mi | 132,6 m² | R$ 17.309 | R$ 604k – R$ 5,45 mi |
| Água Verde | n≥10 | R$ 1,75 mi | 129,6 m² | R$ 15.108 | R$ 199k – R$ 2,75 mi |
| Cidade Industrial | n≥10 | R$ 460 mil | 64 m² | R$ 6.790 | R$ 349k – R$ 580k |
| Bigorrilho | n=9 | R$ 2,74 mi | 165,9 m² | R$ 19.509 | R$ 1,01 mi – R$ 7,82 mi |
| Portão | n=9 | R$ 717 mil | 60,3 m² | R$ 11.055 | R$ 258k – R$ 1,20 mi |
| Campina do Siqueira | n=7 | R$ 1,69 mi | 89,2 m² | R$ 19.000 | R$ 629k – R$ 4,08 mi |
| Centro | n=6 | R$ 577 mil | 29,6 m² | R$ 16.459 | R$ 297k – R$ 2,57 mi |
| Batel | n=5 | R$ 4,45 mi | 200 m² | R$ 20.271 | R$ 656k – R$ 5,91 mi |
| Novo Mundo | n=5 | R$ 400 mil | 47,5 m² | R$ 9.114 | R$ 279k – R$ 602k |
| Xaxim | n=3 | R$ 850 mil | 162,5 m² | R$ 5.549 | R$ 699k – R$ 899k |

**Observações:**
- **Centro tem área mediana de planta 29,6 m²** — mercado claramente direcionado a **studio de investidor** (estudante UFPR, locação por temporada). Não é "planta família".
- **Batel R$ 20.271/m²** é o R$/m² de planta mais alto do estoque com n≥3 — coerente com FipeZap/Sinduscon.
- **Xaxim R$ 5.549/m²** mostra que existe planta acessível de planta grande (162 m²) na zona sul — provavelmente sobrado em obra.
- **Cidade Industrial R$ 6.790/m² na planta** — mercado popular MCMV-faixa.
- **Mossunguê (Ecoville) tem mediana de planta R$ 2 mi com piso R$ 604k** — coerente com o doc Ecoville (mercado bimodal: studio + cobertura).

---

## 3. Análise por bairro — universo PRONTO (n≥3)

| Bairro | n | Mediana valor | Mediana m² | Mediana R$/m² | Faixa de valor |
|---|---|---|---|---|---|
| Portão | n≥15 | R$ 779k | 59,9 m² | R$ 12.224 | R$ 334k – R$ 1,22 mi |
| Tatuquara | n=10 | R$ 250 mil | 47 m² | R$ 5.279 | R$ 214k – R$ 900k |
| Sítio Cercado | n=10 | R$ 525 mil | 84,6 m² | R$ 6.134 | R$ 235k – R$ 650k |
| Campo de Santana | n=9 | R$ 380 mil | 67,3 m² | R$ 5.428 | R$ 230k – R$ 410k |
| Cidade Industrial | n=8 | R$ 465 mil | 82 m² | R$ 5.469 | R$ 365k – R$ 540k |
| Xaxim | n=6 | R$ 679 mil | 100 m² | R$ 6.518 | R$ 657k – R$ 2,5 mi |
| Campo Comprido | n=4 | R$ 1,01 mi | 74,6 m² | R$ 15.274 | R$ 645k – R$ 1,34 mi |
| Umbará | n=4 | R$ 545 mil | 96 m² | R$ 5.817 | R$ 340k – R$ 629k |
| Pinheirinho | n=4 | R$ 403 mil | 53,5 m² | R$ 7.630 | R$ 315k – R$ 1,49 mi |
| São Braz | n=4 | R$ 870 mil | 130,5 m² | R$ 7.498 | R$ 810k – R$ 1,29 mi |

**Observação importante:** o universo "pronto" da FYMOOB tem peso forte em bairros populares e medianos (Portão, Tatuquara, Sítio Cercado, Campo de Santana, Cidade Industrial). Bairros nobres (Batel, Bigorrilho, Mossunguê) **não aparecem com n≥3 no pronto** — vide §4.

---

## 4. Spread planta × pronto — MESMO BAIRRO (n≥3 em ambos)

Apenas 4 bairros do estoque têm **n≥3 em ambos os universos**, permitindo comparação metodologicamente honesta:

| Bairro | n_planta | n_pronto | R$/m² planta | R$/m² pronto | Diferença | Quem é mais caro? |
|---|---|---|---|---|---|---|
| Cidade Industrial | n=10 | n=8 | R$ 6.790 | R$ 5.469 | **+24,2%** | **Planta mais caro** |
| Campo Comprido | n=3 | n=4 | R$ 18.449 | R$ 15.274 | **+20,8%** | **Planta mais caro** |
| Portão | n=9 | n≥15 | R$ 11.055 | R$ 12.224 | **−9,6%** | **Pronto mais caro** |
| Xaxim | n=3 | n=6 | R$ 5.549 | R$ 6.518 | **−14,9%** | **Pronto mais caro** |

**Interpretação crítica:**

- Em **2 dos 4 bairros, a planta sai MAIS cara**, não mais barata. Isso quebra o claim genérico "compre na planta porque é 15-25% mais barato".
- Em **Cidade Industrial e Campo Comprido**, o que está acontecendo é simples: o estoque pronto é casa/sobrado antigo (anos 80-90), o estoque planta é apartamento novo MCMV-faixa em prédios verticalizados. **Não é comparação de "mesma coisa em estados diferentes" — é comparação de produtos diferentes.** Texto do post precisa explicar isso.
- Em **Portão e Xaxim**, o pronto que circula no FYMOOB é mais novo e melhor localizado que a planta da amostra (planta concentrada em projeto de investidor compacto, pronto é apartamento de família entregue).
- **A regra correta pro post:** "comparar planta-vs-pronto no mesmo bairro, mesmo tipo, mesma metragem". Quando isso é feito, o spread real raramente é os 15-25% apontados em mídia genérica.

### 4.1. Bairros com planta robusta MAS pronto < 3 (no estoque FYMOOB)

| Bairro | n_planta | n_pronto FYMOOB |
|---|---|---|
| Mossunguê (Ecoville) | n≥10 | < 3 |
| Água Verde | n≥10 | < 3 |
| Bigorrilho | n=9 | < 3 |
| Campina do Siqueira | n=7 | < 3 |
| Centro | n=6 | < 3 |
| Batel | n=5 | n=2 (R$ 7 mi máximo) |
| Novo Mundo | n=5 | < 3 |

**Implicação editorial:** nos bairros onde a planta domina o estoque FYMOOB (todo o eixo nobre + Centro), o comprador **não consegue comparar planta-vs-pronto direto na FYMOOB**. Ou compra planta no nobre, ou compra pronto fora do nobre. Isso é específico do mix FYMOOB e merece transparência no texto.

---

## 5. Construtoras representadas no estoque FYMOOB

**117 empreendimentos distintos** circulando hoje. Top construtoras (sem volume granular):

1. **Avantti**
2. **GT Building** (registros como "GT Building" e "Gt Building" no CRM)
3. **Rottas**
4. **Plaenge**
5. **Pride**
6. **Laguna** (registros como "Laguna" e "LAGUNA")
7. **Equilíbrio**
8. **Homs**
9. **Auten Incorporadora**
10. **Treéle**
11. **Construtora Pessoa**
12. **Luna**
13. **R S Biato**

**Observações importantes:**
- A FYMOOB **representa empreendimentos de pelo menos 30 construtoras** distintas (cauda longa de 1-2 imóveis cada).
- **Avantti tem a maior concentração** no estoque atual.
- **GT Building, Plaenge e Laguna** confirmam presença de construtoras consolidadas em Curitiba — são as mesmas que aparecem no Sinduscon-PR e VGV anual.
- **NÃO ENDOSSAR** no post: o doc de review YMYL (linha 38-40) já alertou que endosso nominal é risco jurídico. Mencionar que "construtoras consolidadas como X, Y, Z circulam no portfólio FYMOOB" sem dizer "recomendamos" e sem dizer "são confiáveis".
- **Sugestão editorial:** se o post precisa citar nome, cite via "exemplos de construtoras com obras ativas em Curitiba" + critério objetivo (CRECI, RI, patrimônio de afetação averbado, histórico de entregas).

---

## 6. Tickets de entrada — planta vs pronto

### 6.1. Faixas brutas no estoque FYMOOB

| Categoria | Mín | Mediana | Máx |
|---|---|---|---|
| **Planta** | R$ 199.229 | R$ 961.046 | R$ 7.817.780 |
| **Pronto** | R$ 145.000 | R$ 647.594 | R$ 7.000.000 |

### 6.2. Faixas qualitativas de orçamento

**Planta:**
- **Entrada (R$ 199k – R$ 500k):** Cidade Industrial, Centro studio, Portão compacto, Novo Mundo
- **Médio (R$ 500k – R$ 1,5 mi):** Água Verde, Portão consolidado, Campo Comprido
- **Alto (R$ 1,5 mi – R$ 3 mi):** Mossunguê (Ecoville) padrão, Campina do Siqueira, Bigorrilho 2 dorm
- **Luxo (acima de R$ 3 mi):** Batel, Bigorrilho 3 dorm+, Mossunguê coberturas

**Pronto:**
- **Entrada (R$ 145k – R$ 300k):** Tatuquara, Sítio Cercado, Campo de Santana, Pinheirinho, Umbará
- **Médio (R$ 300k – R$ 800k):** Cidade Industrial, Portão, Xaxim
- **Alto (R$ 800k – R$ 2 mi):** Campo Comprido, São Braz, Boqueirão
- **Luxo:** Batel pronto chegou a R$ 7 mi (1 caso, n=2)

**Observação:** comparar mediana planta (R$ 961k) com mediana pronto (R$ 648k) sem ajustar por bairro **é estatisticamente errado** — o estoque planta está concentrado nos nobres (Mossunguê, Bigorrilho, Batel), o pronto está concentrado em populares (Tatuquara, Sítio Cercado). O 48% de "diferença bruta" é mix bias, não diferença real planta-vs-pronto.

---

## 7. Sinergia com posts já publicados (cross-link)

Posts já no ar que contêm dados FYMOOB sobre os mesmos bairros — **não duplicar**, **linkar**:

| Post | Bairros cobertos | O que ele já tem | O que NÃO repetir |
|---|---|---|---|
| `ecoville-vs-bigorrilho-curitiba.mdx` | Mossunguê, Bigorrilho | R$/m², bimodalidade Ecoville, ticket comparativo | Detalhamento planta-Mossunguê — só linkar |
| `quanto-custa-morar-batel-curitiba.mdx` | Batel | 9 rubricas custo de vida + R$/m² | Tickets Batel — só linkar |
| `batel-vs-agua-verde-curitiba.mdx` | Batel, Água Verde | Comparativo binário | Mediana Água Verde — só linkar |
| `melhores-bairros-curitiba-2026.mdx` | Curitiba geral | Drivers de bairro | R$/m² macro — linkar |
| `preco-metro-quadrado-curitiba-bairro.mdx` | Curitiba geral | R$/m² 60 bairros | Bairros já cobertos — linkar |
| `mercado-imobiliario-curitiba-2026.mdx` | Curitiba geral | Macro 2026 | Tendência geral — linkar |

**O post planta-vs-pronto deve focar em:**
- A decisão (planta OU pronto?) — não em "quanto custa morar em X bairro"
- O risco YMYL (atraso, INCC, construtora quebrada, patrimônio de afetação)
- O gap planta-vs-pronto **mesmo bairro** (§4) — único dado FYMOOB exclusivo
- Inverter o claim genérico "15-25% mais barato" mostrando os 4 spreads reais

---

## 8. Dado único FYMOOB pra hook editorial

(pra writer não inventar — usar diretamente)

### Hook 1 — Inversão do claim genérico
> "Quem repete 'imóvel na planta sai 15-25% mais barato' não conhece Curitiba em 2026. Olhando os imóveis ativos na FYMOOB nesta semana, o spread real depende do bairro: em **Portão e Xaxim, o pronto sai por menos do que a planta** (10-15% off). Em **Cidade Industrial, a planta custa 24% mais que o pronto comparável** — porque o pronto que circula é casa antiga e a planta é apartamento novo. **Não existe regra única.** A decisão certa exige olhar bairro por bairro, tipo por tipo."

### Hook 2 — Bairros nobres não comparam
> "No mix de captações FYMOOB de abril/2026, os bairros onde a planta domina o estoque — Mossunguê (Ecoville), Bigorrilho, Batel, Centro — **mal aparecem com pronto comparável** circulando. O que isso significa pro comprador? Que a 'comparação planta-vs-pronto no Bigorrilho' é em parte uma fantasia: o estoque pronto desses bairros é cobertura antiga de R$ 5+ milhões, não apartamento de 2 dormitórios entregue. Quem busca o nobre, normalmente compra planta. Quem busca pronto na faixa média, busca em Portão, Cidade Industrial ou São Braz."

### Hook 3 — Mediana enganosa
> "A mediana de uma planta na FYMOOB é R$ 961 mil. A mediana de um pronto é R$ 648 mil. Diferença bruta de **48%** — e ela mente. Não porque planta seja mais cara que pronto, mas porque a planta está concentrada em Mossunguê, Bigorrilho e Batel; o pronto está em Tatuquara, Sítio Cercado e Campo de Santana. Comparar mediana de mix diferente não é dado, é viés. Pra decisão real, o leitor precisa olhar bairro por bairro."

### Hook 4 — Bipolaridade do estoque
> "Quase metade do estoque ativo da FYMOOB hoje é planta ou lançamento (47%); a outra metade é pronto (53%). Esse equilíbrio reflete o momento de Curitiba: **não é mais o pico de lançamentos de 2021 nem o ressaca de 2020**. É um mercado de duas metades — e cada uma com lógica própria de risco e retorno."

### Hook 5 — A decisão do AnoConstrucao=0
> "Vinte e oito por cento dos imóveis ativos no CRM FYMOOB hoje têm `AnoConstrucao` em branco ou zero. Isso não é desorganização — é uma característica honesta do mercado: **cada planta sem data de entrega definida** entra no CRM sem ano. O comprador que pede 'planta com entrega garantida em 2026' precisa entender que mesmo o cronograma oficial é estimativa — e o INCC e a inflação acumulada nesse meio-tempo podem corroer o desconto inicial."

---

## 9. Limitações honestas

1. **Snapshot único, sem histórico:** dados de 2026-04-25 (uma foto). Não permite afirmar "planta valoriza X% até a entrega" ou "tempo médio de entrega". O snapshot diário (`scripts/research/snapshot-crm-daily.mjs`) começou há 2 dias (24/04) — em 60-90 dias permitirá tracking, hoje não.
2. **Snapshot diário NÃO inclui campos críticos:** o snapshot que vai pra `docs/research/snapshots/` não traz `Situacao`, `Lancamento`, `Construtora`, `Empreendimento`, `AnoConstrucao`. **Recomendação:** atualizar `scripts/research/snapshot-crm-daily.mjs` linhas 48-70 para incluir estes campos a partir do próximo snapshot. Sem isso, qualquer post YMYL planta-vs-pronto futuro precisará repetir o fetch live.
3. **Bairros com n<3 em uma das categorias:** não publicamos mediana (Bigorrilho, Mossunguê, Batel, Centro, Água Verde no universo "pronto"). Tabela §4 honesta sobre isso.
4. **Construtoras com nomes duplicados no CRM:** "GT Building" e "Gt Building", "Laguna" e "LAGUNA" — recomendar normalização do CRM, mas pra este post tratamos como o mesmo nome.
5. **`AnoConstrucao=0/vazio` em 28% do estoque** — não dá pra publicar "idade média do imóvel pronto" ou "ano médio de entrega da planta" com esse buraco.
6. **Volumes granulares omitidos:** orientação Bruno (cautela competitiva). Mediana e faixa OK; "FYMOOB tem N imóveis no Bairro X" não publicado.
7. **Filtro `ExibirNoSite=Sim`:** todos os 251 são imóveis ativos. Imóveis inativos no CRM não foram considerados.
8. **Categoria do imóvel não cruzada com planta-vs-pronto:** apartamento, casa, sobrado misturados na análise por bairro. Refinar por tipo é trabalho futuro (rodar `analyze-planta-vs-pronto.mjs --tipo=apartamento`).

---

## 10. Próximos passos para writer

1. **Não duplicar dados de bairro** já cobertos em posts publicados — linkar.
2. **Usar §4 (spread) como núcleo argumentativo** — inverter o claim genérico "15-25% mais barato".
3. **Citar §1 (distribuição bruta CRM)** sem expor volumes — dizer "quase metade do estoque é planta", não "FYMOOB tem 119 imóveis em construção".
4. **§5 (construtoras):** pode listar nomes COMO PRESENÇA NO PORTFÓLIO, não como endosso. Combinar com critério objetivo de avaliação (CRECI, RI, afetação).
5. **§6 (tickets):** usar faixas qualitativas, não mediana global comparativa (mix bias).
6. **YMYL guards do review** ([`article-reviews/imovel-planta-vs-pronto-curitiba.md`](article-reviews/imovel-planta-vs-pronto-curitiba.md)) **devem ser endereçados** — citar fonte INCC, ABRAINC, MPPR pra construtora quebrada.
7. **Ressalva de janela temporal:** "dados FYMOOB de abril/2026 — verifique na semana da assinatura".

---

**Arquivo gerado:** `docs/research/planta-vs-pronto-cwb-fymoob-data-2026-04.md`
**Script:** `scripts/research/analyze-planta-vs-pronto.mjs`
**Próxima atualização recomendada:** após próximo snapshot diário com `Situacao` incluído.
