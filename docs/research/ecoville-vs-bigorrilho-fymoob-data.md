# Dados Agregados FYMOOB — Ecoville vs Bigorrilho

**Gerado em:** 24/04/2026 17:56 BRT
**Fonte:** API Loft/Vista FYMOOB CRM (leitura via `scripts/research/debug-ecoville-vs-bigorrilho.mjs`, `scripts/debug-bairro-profile.mjs`, `scripts/research/calculate-yield-by-bairro.mjs`)
**Snapshot histórico:** `docs/research/snapshots/2026-04-24.json` (dia zero — única observação)
**Regra de privacidade aplicada:** cautela competitiva. Nunca expor volumes absolutos por bairro (aprendizado Post 5/6/7). Amostra declarada apenas quando n≥3 pra justificar confiabilidade do ticket.
**Reuso:** este doc complementa `melhores-bairros-fymoob-data.md` (já tem Mossunguê 22% compactos, 44% grandes) e `batel-vs-agua-verde-fymoob-data.md` (framework comparativo binário). Aqui o foco é Ecoville × Bigorrilho para `content/blog/ecoville-vs-bigorrilho-curitiba.mdx`.

**Nota de nomenclatura:** "Ecoville" não é bairro oficial de Curitiba — é a região do **Mossunguê** (e parte do Campo Comprido/Cidade Industrial) marqueteada como "Ecoville" pelos empreendimentos verticais. No CRM FYMOOB, 18 registros estão como "Mossunguê" e 1 literalmente como "Ecoville". Para este post, **Ecoville = Mossunguê ∪ Ecoville-literal** (n=19).

> **Para uso EXCLUSIVO do writer.** Não copiar tabelas diretamente pro post. Usar frases-modelo da seção 4.

---

## 1. Composição de carteira por bairro (% metragem, tipologia)

**Cortes:**
- **Compacto:** < 70m² (proxy investidor yield / solteiro)
- **Médio:** 70-150m² (proxy família pequena / casal consolidando)
- **Grande:** > 150m² (proxy família consolidada / alto padrão)

### 1.1 % por faixa de metragem

| Indicador | **Ecoville (Mossunguê+)** | **Bigorrilho** | Delta concreto |
|---|---|---|---|
| % compactos (<70m²) | **21%** | **0%** | Bigorrilho não tem compacto na amostra — perfil 100% família |
| % médios (70-150m²) | **37%** | **44%** | semelhante, meio da carteira |
| % grandes (>150m²) | **42%** | **56%** | Bigorrilho ~33% mais pesado em alto padrão |
| Perfil dominante FYMOOB | **misto com viés alto padrão** (2 estudios + 3 compactos + grandes no topo) | **família consolidada** (sem compacto, 56% acima de 150m²) | diferença nítida |

**Leitura:** ambos são bairros nobres consolidados, mas o Ecoville comporta um mercado mais amplo — de **studio/compacto de investidor** na base (21%) até **cobertura de 260m²** no topo. O Bigorrilho, na amostra FYMOOB atual, **não tem unidade abaixo de 70m²** — é mercado de apartamento de 2 e 3 dormitórios de família, sem aposta em yield-apartamento pequeno.

### 1.2 Tipologia

| Tipo | Ecoville | Bigorrilho |
|---|---|---|
| Apartamento (inclui Duplex + Cobertura + Studio) | **100%** | **100%** |
| Casa / Sobrado | **0%** | **0%** |

**Detalhe tipológico Ecoville (amostra FYMOOB):**
- Apartamento "linha principal": 14 unidades
- Apartamento Duplex: 2
- Cobertura: 1
- Studio: 2

**Detalhe tipológico Bigorrilho (amostra FYMOOB):**
- Apartamento (categoria única, sem duplex/cobertura/studio): 9 unidades

**Observação sobre "casa em condomínio":** a pauta do post pede separar Ecoville-apartamento vs Ecoville-casa-em-condomínio. **Nas captações recentes da FYMOOB, não há casa de condomínio no Ecoville** — apesar da região ter Alphaville Graciosa e outros condomínios horizontais conhecidos, o estoque FYMOOB ativo hoje é 100% vertical. Duas saídas para o writer:
- **Conservador (recomendado):** não mencionar casa-em-condomínio no Ecoville — ou mencionar qualitativamente como "existente no bairro mas fora da amostra FYMOOB de hoje".
- **Alternativo:** descrever a oferta de condomínio horizontal como **característica do bairro conhecida no mercado** (Alphaville, Terras Alpha) sem atribuir número ao CRM FYMOOB.

### 1.3 Mix de dormitórios

| Dormitórios | **Ecoville %** | **Bigorrilho %** | Leitura |
|---|---|---|---|
| 1 dorm / studio | 16% | **0%** | Ecoville tem studio de investidor; Bigorrilho não |
| 2 dorm | 26% | **33%** | Bigorrilho ligeiramente mais 2-dorm — padrão casal urbano |
| 3 dorm | 42% | **67%** | **Bigorrilho concentrado em 3 dorm** — planta família clássica |
| 4+ dorm | 16% | **0%** | **Ecoville tem alto-luxo (4+), Bigorrilho não na amostra** |

**Leitura decisiva:**
- Ecoville = mercado mais **bimodal** (investidor pequeno + alto padrão de 4 dorm/cobertura).
- Bigorrilho = mercado **unimodal** (2-3 dormitórios de família consolidada). Na amostra atual, **não há unidade de 4+ dormitórios** no Bigorrilho — o alto padrão dele está na área (apto de 3 dorm com 315m²), não no número de quartos.

---

## 2. Ticket — mediana, faixa interquartil, por tipologia

### 2.1 Ticket total (todas as unidades com ValorVenda > 0)

| Indicador | **Ecoville** | **Bigorrilho** | Delta |
|---|---|---|---|
| n (amostra ticket) | 19 | 9 | amostra Bigorrilho menor — usar com cautela |
| Ticket médio | ~R$ 2,37 mi | ~R$ 3,46 mi | Bigorrilho +46% |
| Ticket mediano | **~R$ 1,93 mi** | **~R$ 2,74 mi** | Bigorrilho +42% |
| Q1 (25º percentil) | R$ 1,36 mi | R$ 2,47 mi | |
| Q3 (75º percentil) | R$ 3,11 mi | R$ 4,42 mi | |
| IQR (amplitude Q3-Q1) | **R$ 1,75 mi** | **R$ 1,95 mi** | faixas similares, mas deslocadas |
| Menor ticket da amostra | R$ 604 mil (studio) | R$ 1,01 mi (2 dorm, 82m²) | Ecoville tem **entrada mais baixa** |
| Maior ticket da amostra | R$ 5,45 mi | R$ 7,82 mi | Bigorrilho tem **teto mais alto** |

**Leitura:**
- Bigorrilho tem ticket mediano ~42% maior que Ecoville, mesmo sendo o bairro com FipeZap ligeiramente mais alto em R$/m² (Bigorrilho R$ 14.117/m², Mossunguê ~R$ 12.100/m²). A razão é que Bigorrilho **na amostra FYMOOB concentra em áreas grandes** — média 171m² vs 147m² do Ecoville.
- Ecoville tem **dispersão maior** no piso (studio de R$ 604 mil até cobertura de R$ 5,45 mi) — IQR similar ao Bigorrilho mas começa mais baixo.

### 2.2 Ticket por tipologia (apto 2 dorm vs 3 dorm vs 4+ dorm)

| Segmento | **Ecoville mediana** | **Ecoville IQR** | **Bigorrilho mediana** | **Bigorrilho IQR** |
|---|---|---|---|---|
| Apto 2 dorm | ~R$ 1,46 mi (n=5) | R$ 1,25-1,73 mi | ~R$ 2,47 mi (n=3) | R$ 1,74-3,45 mi |
| Apto 3 dorm | ~R$ 2,10 mi (n=7) | R$ 1,83-3,52 mi | ~R$ 3,24 mi (n=6) | R$ 2,74-4,50 mi |
| Apto 4+ dorm | ~R$ 4,04 mi (n=3) | R$ 3,61-4,62 mi | **sem amostra** (n=0) | — |

**Cross-segmento decisivo:**
- **Apto 2 dorm (planta padrão casal urbano):** Bigorrilho ~69% mais caro que Ecoville no mediano. Mesmo tipo, bairro diferente, premium geográfico claro — Bigorrilho é costado do Batel, Mossunguê é região em expansão.
- **Apto 3 dorm (planta família média):** Bigorrilho ~54% mais caro no mediano. Gap se reduz porque Ecoville tem alguns 3-dorm já de padrão alto (260m²).
- **Apto 4+ dorm:** só Ecoville tem na amostra — ticket mediano R$ 4 mi, área mediana 232m². Bigorrilho não tem 4+ nas captações atuais da FYMOOB (ressalva: amostra pequena).

### 2.3 Área privativa média por tipologia

| Segmento | **Ecoville área mediana** | **Bigorrilho área mediana** |
|---|---|---|
| Apto 2 dorm | 97m² | 126m² |
| Apto 3 dorm | 184m² | 179m² |
| Apto 4+ dorm | 232m² | sem amostra |

**Leitura:** em 2 dormitórios, o Bigorrilho tem o apartamento ~30% maior — é o que justifica grande parte do premium de ticket. Em 3 dorm, as áreas se aproximam (184 vs 179m²) e o diferencial de preço vira **quase puro R$/m²**.

---

## 3. Rentabilidade de aluguel (n≥3)

**Status FYMOOB CRM:**
- **Ecoville (Mossunguê):** n_aluguel = **0** na amostra atual — sem base própria.
- **Bigorrilho:** n_aluguel = **0** — mesmo caso.

**Decisão metodológica:** **NÃO usar yield via CRM FYMOOB para nenhum dos dois.** Usar Secovi-PR como fonte primária:

| Bairro | Yield bruto a.a. (Secovi-PR mar/26) | Observação |
|---|---|---|
| **Bigorrilho** | **~2,80% a.a.** | abaixo IPCA e da média da cidade |
| **Mossunguê (Ecoville)** | **~3,47% a.a.** | acima do Bigorrilho e do Batel; abaixo da média cidade |
| **Curitiba (média cidade)** | **4,74% a.a.** | benchmark Secovi-PR |
| Batel (referência) | ~2,0% a.a. | pior yield entre nobres |

**Delta concreto:**
- Ecoville rende ~24% mais em aluguel que Bigorrilho (em % a.a.).
- Ecoville fica entre 0,7-1,3 ponto acima do "teto inferior" dos nobres (Batel 2%).
- **Ambos** ficam abaixo da média cidade (4,74%): é o custo de comprar em bairro nobre — valoriza no longo prazo, mas não entrega renda corrente.

**Cross-check qualitativo:** o post anterior ([preco-m2-bairros-curitiba-2026.md](./preco-m2-bairros-curitiba-2026.md) seção 2.1) menciona que **"aluguel por temporada (Airbnb) renta ~10% a.a. em bairros com hub corporativo — Batel, Ecoville, Centro"** (agregadores, dado qualitativo). Ecoville está nesse grupo pela ParkShopping Barigui, hospitais de referência e Centro Politécnico UFPR. Bigorrilho tem menos hub e menor apelo de temporada.

---

## 4. Frases-modelo aprovadas (copy-paste)

**Regra-mãe:** volume nunca. Perfil sempre. Qualificar como "captações recentes", "fechamentos recentes", "nos imóveis que passam pela FYMOOB" — nunca "a FYMOOB tem N imóveis".

### Frase A — Diferença de perfil (principal, cabeçalho comparativo)

> "Nas captações recentes da FYMOOB, o Ecoville é um mercado bimodal: studios de investidor começam em torno de R$ 600 mil e coberturas passam de R$ 5 milhões — o bairro comporta tanto quem compra primeiro apto quanto quem busca cobertura de 260m². O Bigorrilho, no mesmo período, não tem uma única unidade abaixo de 70m² circulando: dois em cada três imóveis são apartamentos de 3 dormitórios, perfil família consolidada clássica, sem meio-termo pra investidor pequeno."

### Frase B — Tipologia (zero casa, zero studio no Bigorrilho)

> "Tanto Ecoville quanto Bigorrilho chegam à FYMOOB como mercados 100% verticais — zero casa, zero sobrado na amostra atual. A diferença está na verticalização de dentro: no Ecoville há studio, apartamento, duplex e cobertura convivendo; no Bigorrilho, a amostra é uniformemente 'apartamento de família' de 2 a 3 dormitórios."

### Frase C — Ticket por tipologia (reforço visual)

> "O apartamento de 2 dormitórios mediano no Ecoville, nos imóveis que passam pela FYMOOB, fica em torno de R$ 1,46 milhão; no Bigorrilho, por volta de R$ 2,47 milhões — ~70% mais caro pela mesma planta, em parte porque o 2 dormitórios do Bigorrilho tem área mediana ~30% maior (126m² vs 97m²), em parte pelo premium geográfico de colar no Batel."

### Frase D — Ticket mediano total (faixa, não volume)

> "No ticket mediano total, o Bigorrilho gira em torno de R$ 2,74 milhões e o Ecoville em torno de R$ 1,93 milhão — gap de ~42%. A explicação não é só R$/m² (o FipeZap coloca Bigorrilho R$ 14.117/m² vs. Mossunguê ~R$ 12.100): é que o estoque FYMOOB no Bigorrilho está concentrado em unidades acima de 150m², enquanto o Ecoville comporta também studios e compactos no piso."

### Frase E — Alto padrão (4+ dorm)

> "Apartamento de 4 ou mais dormitórios aparece na amostra da FYMOOB no Ecoville com ticket mediano em torno de R$ 4 milhões e área mediana de 232m² — típico cobertura ou high-end vertical da região. No Bigorrilho, nas captações recentes, o alto padrão está na área (um 3 dormitórios pode ter 315m²), não no número de quartos — o mercado premium do bairro prefere apartamento mais amplo com 3 suítes a 4 quartos compactados."

### Frase F — Yield (ponte pra investidor)

> "Pela base do Secovi-PR, o Ecoville (Mossunguê) rende em torno de 3,5% ao ano no aluguel e o Bigorrilho em torno de 2,8%. Ambos ficam abaixo da média de Curitiba (4,74%), mas o Ecoville rende cerca de 25% mais que o Bigorrilho — reflete a diferença de perfil: Ecoville tem hub corporativo (ParkShopping Barigui, hospitais, Centro Politécnico) que alimenta também aluguel por temporada; Bigorrilho é residencial alto padrão mais puro, valoriza no longo prazo mas não entrega renda corrente."

### Frase G — Entrada mais acessível (útil se o ângulo for "por onde começo")

> "Pra quem busca o ticket de entrada menor entre os dois, o Ecoville é a opção — o piso da amostra FYMOOB começa em studio por volta de R$ 600 mil, e há apartamentos de 1 dormitório e 2 dormitórios compactos na faixa de R$ 1,1 a R$ 1,4 milhão. No Bigorrilho, o piso começa em torno de R$ 1 milhão num 2 dormitórios de ~82m² — ou seja, não há porta de entrada de investidor pequeno; o bairro já assume perfil de família consolidando primeiro imóvel de 2-3 dormitórios."

### Frase H — Autoridade local (bairros nobres vistos por dentro)

> "Tratados na imprensa como 'bairros nobres de Curitiba', Ecoville e Bigorrilho funcionam na prática como mercados bem diferentes. Ecoville é o bairro planejado verticalizando — mistura cobertura de R$ 5 milhões, high-end de 4 suítes e studio de R$ 600 mil dentro do mesmo mapa. Bigorrilho é o bairro consolidado da família curitibana — apartamento de 2 ou 3 dormitórios com área grande, sem experimento de formato. Quem compara os dois pelo mapa, compra pelo mapa errado."

### Frases proibidas (nunca publicar)

- "A FYMOOB tem N imóveis no Ecoville"
- "A FYMOOB tem N imóveis no Bigorrilho"
- "FYMOOB concentra X% do estoque em [bairro]"
- "Ranking dos bairros com mais imóveis FYMOOB"
- Qualquer número de "estoque ativo" por bairro
- "A amostra FYMOOB representa X% do mercado do bairro" (é X% **do que passa pela FYMOOB**, não do mercado)
- Qualquer afirmação sobre "casa em condomínio no Ecoville" atribuindo número ao CRM FYMOOB (amostra atual = zero casas horizontais)

---

## 5. Limitações

1. **Amostra modesta em números absolutos.** Ecoville (Mossunguê+Ecoville) ~19 unidades; Bigorrilho ~9. Válido pra perfil e ticket mediano, **menos confiável** pra afirmações de cauda (ex: "4+ dormitórios no Bigorrilho" — pode ser que o próximo fechamento inclua 4 dorm e mude o quadro). Declarar amostra n≥3 nos recortes publicados. Nunca afirmar "X% do mercado do bairro".
2. **n_aluguel = 0 em ambos.** Não há base pra calcular yield próprio via CRM. Toda frase sobre rentabilidade depende de **Secovi-PR** (fonte externa, mar/2026). Nunca inventar um yield "FYMOOB" pra esses bairros.
3. **Ticket = valor anunciado, não fechado.** Transações reais em CWB fecham ~5% abaixo (range 2-8%). Aplicar desconto mental ao falar de "preço de venda realizado".
4. **"Ecoville" não é bairro oficial.** Para este post, Ecoville = Mossunguê ∪ Ecoville-literal = 19 imóveis. Pedaços do Ecoville marqueteado também caem em Campo Comprido e Cidade Industrial — estes NÃO estão incluídos (seria forçar fronteira). Se o post mencionar "Ecoville oficial", deixar claro que estamos usando o recorte **Mossunguê + Ecoville-literal**.
5. **Casa em condomínio no Ecoville = 0 na amostra FYMOOB.** Apesar do Ecoville/Mossunguê ter condomínios horizontais conhecidos (Alphaville, Terras Alpha), nenhum deles está no estoque FYMOOB ativo hoje. **Não inventar estatística de casa-em-condomínio** — tratar como característica qualitativa do bairro, sem número.
6. **Categoria do Loft agrupa com viés vertical.** "Apartamento" aqui inclui Duplex e Cobertura (diferenciados nas tipologias detalhadas); Studio entra como categoria própria quando a área é < 40m². Os recortes 2/3/4+ dorm usam apenas o campo `Dormitorios`, não o campo `Categoria`.
7. **Snapshot diário ainda sem série.** Primeiro snapshot foi 24/04/2026. Não citar evolução temporal ("estoque caiu X% em Y dias") até ≥30 dias de histórico.
8. **Sem dado de "tempo médio de venda"** por bairro ainda — virá com histórico de snapshots a partir de julho/2026. Até lá, não fabricar "imóvel no Bigorrilho vende em N dias".

---

## 6. Arquivos e comandos de replicação

- Perfil detalhado Ecoville+Bigorrilho (este relatório): `DOTENV_CONFIG_QUIET=true node scripts/research/debug-ecoville-vs-bigorrilho.mjs` → stdout JSON
- Perfil por bairro (framework): `node scripts/debug-bairro-profile.mjs`
- Yield por bairro: `node scripts/research/calculate-yield-by-bairro.mjs --format=json`
- Stock por bairro: `node scripts/research/extract-stock-by-bairro.mjs --format=json`
- Docs pai (contexto cruzado):
  - [`melhores-bairros-fymoob-data.md`](./melhores-bairros-fymoob-data.md) — todos os bairros, inclui Mossunguê 22% compactos / 44% grandes e Bigorrilho 56% grandes
  - [`batel-vs-agua-verde-fymoob-data.md`](./batel-vs-agua-verde-fymoob-data.md) — framework comparativo binário reutilizável
  - [`preco-m2-bairros-curitiba-2026.md`](./preco-m2-bairros-curitiba-2026.md) — R$/m² FipeZap (Bigorrilho R$ 14.117, Mossunguê ~R$ 12.100), yield Secovi-PR, ranking 12m

**Última atualização:** 24/04/2026 17:56 BRT (FYMOOB Data Research Specialist — reescrita Ecoville vs Bigorrilho)
