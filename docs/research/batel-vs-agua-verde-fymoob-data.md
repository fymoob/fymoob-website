# Dados Agregados FYMOOB — Batel vs Água Verde

**Gerado em:** 24/04/2026 19:50 BRT
**Fonte:** API Loft/Vista FYMOOB CRM (leitura via `scripts/debug-bairro-profile.mjs` + `scripts/research/calculate-yield-by-bairro.mjs`)
**Snapshot histórico:** `docs/research/snapshots/2026-04-24.json` (dia zero — única observação)
**Regra de privacidade aplicada:** cautela competitiva. Nunca expor volumes absolutos por bairro (aprendizado Post 5+6). Amostra só declarada quando n≥3 e pra justificar confiabilidade.
**Reuso:** este doc complementa `melhores-bairros-fymoob-data.md` (que já tem Batel 57% grandes) — aqui o foco é comparativo binário para o post `batel-vs-agua-verde-curitiba.mdx`.

> **Para uso EXCLUSIVO do writer.** Não copiar tabelas diretamente pro post. Usar frases-modelo da seção 4.

---

## 1. Composição de carteira por bairro (% por metragem)

**Cortes:**
- **Compacto:** < 70m² (proxy solteiro / casal jovem / investidor yield)
- **Médio:** 70-150m² (proxy família pequena / consolidando)
- **Grande:** > 150m² (proxy família consolidada / alto padrão)

| Indicador | **Batel** | **Água Verde** | Delta concreto |
|---|---|---|---|
| % compactos (<70m²) | **14%** | **15%** | praticamente empatados |
| % médios (70-150m²) | **29%** | **62%** | **Água Verde dominado pelo meio** |
| % grandes (>150m²) | **57%** | **23%** | **Batel 2,5× mais pesado em alto padrão** |
| Perfil dominante FYMOOB | **família consolidada** | **misto, com viés família** | diferença clara |

**Tipologia:**
| Tipo | Batel | Água Verde |
|---|---|---|
| Apartamento | **100%** | 67% |
| Casa/Sobrado | 0% | 33% |

**Mix de dormitórios (entre imóveis da amostra):**
| Dormitórios | Batel | Água Verde |
|---|---|---|
| 1 dorm | 1 | 2 |
| 2 dorm | 1 | 2 |
| 3 dorm | 2 | **9** |
| 4+ dorm | 1 | 0 |

**Leitura:**
- No Batel, o estoque da FYMOOB é **100% apartamento** e majoritariamente grande (>150m²): comportamento típico de alto padrão consolidado, coberturas e 4 dormitórios.
- No Água Verde, **1 em cada 3 imóveis é casa/sobrado** — o bairro mantém DNA residencial horizontal, diferente do Batel. Quase 70% dos imóveis têm 3 dormitórios — concentração clara no "apartamento de família média".
- **Gap de perfil em 1 frase:** Batel é alto padrão vertical; Água Verde é padrão familiar misto.

---

## 2. Ticket médio / mediana

| Indicador | **Batel** | **Água Verde** | Delta |
|---|---|---|---|
| Ticket médio (venda) | **~R$ 3,7 mi** | **~R$ 1,66 mi** | Batel ~2,2× |
| Ticket mediano (venda) | **~R$ 4,45 mi** | **~R$ 1,75 mi** | Batel ~2,5× |
| Área privativa média | 169 m² | 141 m² | Batel +20% |
| Preço m² CRM (venda) | ~R$ 20.059/m² | ~R$ 13.618/m² | Batel +47% |
| Preço m² FipeZap mar/26 (referência) | R$ 17.924/m² | R$ 12.178/m² | +47% |

**Cross-check externo:** FipeZap (mar/2026) coloca Batel em 1º e Água Verde em 9º no ranking geral de Curitiba. CRM FYMOOB reproduz a ordem e o gap de ~47% no R$/m². Bate — sem discrepância material.

**Leitura honesta:**
- Mediana do Batel (R$ 4,45 mi) > média (R$ 3,7 mi) porque há **coberturas e apartamentos muito grandes** que puxam pra cima na amostra.
- Água Verde mostra faixa mais concentrada (mediana R$ 1,75 mi ≈ média R$ 1,66 mi) — distribuição típica de padrão de mercado familiar.
- Valores do CRM são **anunciados**, não fechados. Transações reais em CWB fecham ~5% abaixo (range 2-8%).

---

## 3. Rentabilidade de aluguel (onde n≥3)

**Status FYMOOB CRM:**
- **Batel:** n_aluguel = **0** — não há amostra viável para yield CRM.
- **Água Verde:** n_aluguel = **0** — mesmo caso.

**Decisão metodológica:** para este post, **NÃO usar yield via CRM FYMOOB para nenhum dos dois bairros**. Usar Secovi-PR como fonte primária:

| Bairro | Yield bruto a.a. (Secovi-PR mar/26) | Observação |
|---|---|---|
| **Batel** | **~2,0% a.a.** | pior yield entre bairros nobres de Curitiba — comportamento clássico de "store of value" |
| **Água Verde** | **~3,0% a.a.** | abaixo da média da cidade (4,74% a.a.), mas 50% acima do Batel |
| **Curitiba (média cidade)** | 4,74% a.a. | benchmark Secovi-PR |

**Delta concreto:**
- Água Verde rende ~50% mais aluguel (em % a.a.) que o Batel, apesar do preço m² ser apenas ~30% menor.
- Isso indica que **o ticket de entrada do Batel está precificado além da razão de renda** — o bairro opera como reserva de valor / exibição patrimonial, não como veículo de renda.

**Frase-modelo yield (só se o writer quiser profundidade):**
> "Pela base do Secovi-PR, o Batel rende em torno de 2% ao ano no aluguel — pior yield entre os bairros nobres de Curitiba. O Água Verde rende cerca de 3% a.a., ainda abaixo da média da cidade (4,74%), mas 50% acima do Batel. O que mostra que o Batel hoje é reserva de valor, não investimento de renda."

---

## 4. Frases-modelo aprovadas (copy-paste)

**Regra-mãe:** volume nunca. Perfil sempre. Qualificar como "captações recentes", "fechamentos recentes", "nos imóveis que passam pela FYMOOB" — nunca "a FYMOOB tem N imóveis".

### Frase A — Diferença de perfil (principal, cabeçalho comparativo)
> "Nas captações recentes da FYMOOB, mais da metade dos imóveis do Batel tem área acima de 150m² — comportamento de alto padrão consolidado. No Água Verde, esse percentual cai para menos de um quarto, e um terço do estoque acompanhado é de casas e sobrados. São perfis de comprador diferentes vestidos de 'zona central nobre' no mesmo mapa."

### Frase B — Tipologia (reforço visual para quem compara)
> "No Batel, 100% do que passa pela FYMOOB é apartamento. No Água Verde, a cada três imóveis, um é casa ou sobrado — o bairro preservou o DNA residencial horizontal que o Batel já perdeu na verticalização."

### Frase C — Ticket (faixa, não volume)
> "O ticket mediano de apartamento no Batel acompanhado pela FYMOOB está em torno de R$ 4,45 milhões; no Água Verde, por volta de R$ 1,75 milhão. Mesma 'zona central', perfil de comprador separado por um fator de ~2,5×."

### Frase D — Área (comparativo direto)
> "A área privativa média no Batel dentro da amostra FYMOOB bate em ~170m²; no Água Verde, fica em ~140m². A diferença de 20% em área soma com a diferença de ~47% em R$/m² e explica o salto de ticket entre os dois bairros."

### Frase E — Conclusão investidor (ponte pra yield)
> "Essa diferença de perfil tem consequência concreta pra quem compra pra investir: o Batel rende em torno de 2% ao ano no aluguel (Secovi-PR), o Água Verde cerca de 3%. Ambos ficam abaixo da média Curitiba (4,74%), mas o Água Verde dá 50% mais renda a cada ano — é o que se paga por transformar exibição patrimonial em veículo de renda."

### Frase F — Mix de dormitórios (útil se o ângulo for família/planta)
> "No Água Verde, quase 70% dos imóveis acompanhados pela FYMOOB têm 3 dormitórios — é a planta padrão da família média consolidada. No Batel, 3 dormitórios é só uma das opções, dividindo espaço com unidades de 4+ dormitórios e coberturas, típicas de um mercado mais diversificado em cima."

---

### Frases proibidas (nunca publicar)

- "A FYMOOB tem N imóveis no Batel"
- "A FYMOOB tem N imóveis no Água Verde"
- "FYMOOB concentra X% do estoque em [bairro]"
- "Batel é o 1º bairro com mais imóveis FYMOOB"
- Qualquer ranking de volume por bairro
- Qualquer número de "estoque ativo" por bairro

---

## 5. Limitações

1. **Amostra pequena em números absolutos.** Batel tem amostra modesta (na casa dos 7 fechamentos/captações acompanhados); Água Verde um pouco maior (~13). Válido pra perfil e ticket, **não** pra afirmar "X% do mercado do bairro" — é X% **do que passa pela FYMOOB**.
2. **n_aluguel = 0 em ambos.** Não há base pra calcular yield próprio via CRM. Toda frase sobre rentabilidade depende de **Secovi-PR** (fonte externa, mar/2026). Se o writer precisar inverter — usar só o yield Secovi, nunca inventar um yield "FYMOOB".
3. **Ticket = valor anunciado**, não fechado. Transações reais em CWB fecham ~5% abaixo (range 2-8%). Aplicar desconto mental ao falar de "preço de venda realizado".
4. **Categoria do Loft agrupa diferente do mercado.** "Apartamento" inclui cobertura e garden; "Casa" e "Sobrado" às vezes se sobrepõem. Os % tipológicos são **proxy honesto**, não taxonomia oficial.
5. **Snapshot diário ainda sem série.** Primeiro snapshot foi 24/04/2026. Não citar evolução temporal ("estoque caiu X% em Y dias") até ≥30 dias de histórico.
6. **Sem dado de "tempo médio de venda"** por bairro ainda — virá com histórico de snapshots a partir de julho/2026. Até lá, não fabricar "imóvel no Batel vende em N dias".

---

## 6. Arquivos e comandos de replicação

- Perfil por bairro (este relatório): `node scripts/debug-bairro-profile.mjs`
- Yield por bairro: `node scripts/research/calculate-yield-by-bairro.mjs --format=json`
- Stock por bairro: `node scripts/research/extract-stock-by-bairro.mjs --format=json`
- Análise pai (todos os bairros): [`melhores-bairros-fymoob-data.md`](./melhores-bairros-fymoob-data.md)
- Ranking externo cross-check: [`preco-m2-bairros-curitiba-2026.md`](./preco-m2-bairros-curitiba-2026.md) (FipeZap mar/26, Secovi-PR, agregadores)

**Última atualização:** 24/04/2026 19:50 BRT (FYMOOB Data Research Specialist — reescrita Batel vs Água Verde)
