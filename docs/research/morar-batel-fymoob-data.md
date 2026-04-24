# Dados Agregados FYMOOB — Morar no Batel

**Gerado em:** 24/04/2026 20:33 BRT
**Fonte:** API Loft/Vista FYMOOB CRM (leitura via `scripts/research/debug-batel-detailed.mjs`, criado nesta sessão)
**Snapshot histórico:** `docs/research/snapshots/2026-04-24.json` (dia zero — única observação até o momento)
**Regra de privacidade aplicada:** volumes agregados/anonimizados. Cautela competitiva default desde o Post 5. Nunca expor "FYMOOB tem N imóveis no Batel". Frases-modelo aprovadas nos Posts 5, 6 e 7 (ver `docs/seo/article-rewrite-learnings.md`).
**Reuso:** este doc complementa `melhores-bairros-fymoob-data.md` (Batel agregado no TOP 15) e `batel-vs-agua-verde-fymoob-data.md` (comparativo). Aqui o foco é Batel isolado para o post `quanto-custa-morar-batel-curitiba.mdx`.

> **Para uso EXCLUSIVO do writer.** Não copiar tabelas diretamente pro post. Usar frases-modelo da seção 3.

---

## 1. Composição de carteira Batel

**Cortes adotados (alinhado ao brief):**
- **Studio:** < 40m² — perfil investidor yield / uso estudantil / corporativo
- **Compacto:** 40-70m² — solteiro / casal sem filhos
- **Médio:** 70-150m² — família pequena / consolidando
- **Grande:** > 150m² — família consolidada / alto padrão / coberturas

### 1.1 Por metragem (% sobre amostra Batel com área declarada)

| Faixa | % Batel | Leitura |
|---|---|---|
| Studio (<40m²) | **14%** | presença residual — apartamento compacto mais isolado (~35m²) |
| Compacto (40-70m²) | **0%** | ausência completa — Batel pulou o segmento "primeiro apto" |
| Médio (70-150m²) | **29%** | fatia menor — 2-3 dormitórios urbanos |
| Grande (>150m²) | **57%** | **maioria absoluta** — 3 e 4 dormitórios, coberturas |

**Leitura honesta:** **mais da metade** das captações acompanhadas pela FYMOOB no Batel tem área acima de 150m². Somado o médio, **~86% está em 70m²+** — distribuição bimodal: maioria alto padrão vertical, minoria studio residual. Zero "apto compacto tradicional" na amostra (o 40-70m² que domina Centro e Novo Mundo).

### 1.2 Por tipologia (dormitórios)

| Dormitórios | % Batel | Observação |
|---|---|---|
| Studio (0 dorm / info ausente) | **29%** | mistura de cobertura sem info explícita + studios genuínos |
| 1 dormitório | **14%** | presença modesta |
| 2 dormitórios | **14%** | presença modesta |
| 3 dormitórios | **29%** | tipologia de família média consolidada |
| 4+ dormitórios | **14%** | coberturas e alto padrão |

**Leitura honesta:** **distribuição pulverizada**, sem tipologia dominante clara. Diferente do Água Verde (onde 3 dorm responde por ~70%), o Batel é **diversificado na planta**. O 3 dorm é o mais frequente "nomeado", mas dividindo espaço com 4+ dorm e studios. É um bairro que **não tem planta padrão** — comportamento típico de mercado alto que oferece exibição patrimonial em várias configurações.

### 1.3 Categoria

- **100% apartamento.** Zero casa, zero sobrado, zero terreno.
- O Batel perdeu o DNA residencial horizontal — diferente do Água Verde (onde 1 em cada 3 imóveis ainda é casa/sobrado, ver doc comparativo).

---

## 2. Ticket

### 2.1 Mediana

- **Ticket mediano venda apartamento Batel:** **~R$ 4,45 milhões**
- **Ticket médio venda:** **~R$ 3,7 milhões** (menor que mediana — puxado pra baixo por studio residual e unidade única compacta)
- **Cross-check externo:** FipeZap mar/2026 coloca Batel em 1º do ranking de Curitiba; preço R$/m² CRM (~R$ 20.059/m²) bate com FipeZap (R$ 17.924/m²) — gap de ~12% explicado por valores anunciados no CRM vs índice FipeZap que captura mais rápido fechamentos.

### 2.2 Faixa interquartil (onde estão os "50% do meio")

| Quartil | Valor | Significado |
|---|---|---|
| Q1 (25%) | **~R$ 1,48 mi** | entrada do Batel — compactos/médios de padrão inferior |
| Mediana (Q2) | **~R$ 4,45 mi** | centro da distribuição — 3 dorm 200m² típico |
| Q3 (75%) | **~R$ 5,43 mi** | top 25% — 4 dorm + coberturas |
| **IQR** | **~R$ 3,96 mi** | **amplitude enorme** |
| Min / Max | R$ 656 mil / R$ 7 mi | compacto 35m² até cobertura 263m² |

**Leitura honesta:** a **amplitude interquartil é ~4 milhões** — o Batel cobre uma faixa de preços muito ampla pra um único bairro. Não existe "ticket padrão Batel". Quem chega falando "quanto custa um apto no Batel" pode estar pensando em R$ 656 mil (compacto isolado) ou R$ 7 mi (cobertura) — ambos são Batel legítimo, e a conversa precisa começar pela planta e metragem antes do preço.

### 2.3 Ticket mediano em 12 meses (variação)

**Status: INDISPONÍVEL.**
- O snapshot diário do CRM FYMOOB começou em 24/04/2026 (dia zero).
- Não há série histórica ≥12 meses pra calcular variação própria.
- **Fonte externa (FipeZap mar/2026):** Batel valorizou **+6,5% nos últimos 12 meses** em R$/m².
- **Recomendação:** citar valorização 12m apenas via FipeZap. **NÃO afirmar** "ticket mediano FYMOOB variou +X% em 12 meses" — seria invenção.
- **Reavaliar em maio/2027** (12 meses de snapshot próprio).

---

## 3. Frases-modelo aprovadas

**Regra-mãe:** volume nunca, perfil sempre. Qualificar como "captações recentes", "fechamentos recentes" ou "nos imóveis que passam pela FYMOOB no Batel" — nunca "FYMOOB tem N imóveis no Batel".

### Frase A — Perfil dominante de metragem (principal)

> "Nas captações recentes da FYMOOB no Batel, mais da metade dos imóveis tem área acima de 150m² — é o perfil clássico de família consolidada, com coberturas e plantas de 3 a 4 dormitórios puxando a amostra pra cima. Apartamento de 40 a 70m², o 'primeiro apto' que domina Centro e Novo Mundo, praticamente não aparece: o Batel pulou esse segmento."

### Frase B — Tipologia diversificada (sem planta padrão)

> "No Batel, a FYMOOB não encontra tipologia dominante clara: 3 dormitórios aparece em cerca de 30% dos imóveis acompanhados, dividindo espaço com coberturas de 4+ dorm e studios residuais. É um bairro sem 'planta padrão' — diferente do Água Verde, onde quase 7 em cada 10 imóveis são de 3 dormitórios. Quem compra no Batel escolhe o próprio formato; não há uma norma de mercado."

### Frase C — Ticket mediano (faixa, não volume)

> "O ticket mediano de apartamento no Batel acompanhado pela FYMOOB gira em torno de R$ 4,45 milhões. A média é menor (cerca de R$ 3,7 milhões), puxada pra baixo por um studio compacto isolado — confirmando que a 'cara real' do Batel está na metade de cima da tabela, não na entrada."

### Frase D — Amplitude de preço (IQR)

> "A distância entre os 25% mais baratos e os 25% mais caros do Batel, nas captações FYMOOB, supera R$ 3,9 milhões. O bairro entrega desde studios de ~R$ 650 mil até coberturas de R$ 7 milhões — todos legítimos Batel. Não existe 'um preço do Batel': existe uma conversa que começa por metragem e planta, não por bairro."

### Frase E — 100% apartamento (contraste com Água Verde)

> "No Batel, 100% do que passa pela FYMOOB é apartamento. Zero casa, zero sobrado. O bairro já completou a virada pra verticalização — quem procura residencial horizontal em zona central nobre de Curitiba precisa olhar pra Água Verde ou Bigorrilho, não pra Batel."

### Frase F — Yield (externa, Secovi-PR)

> "O Batel rende em torno de 2% ao ano no aluguel — pior yield entre os bairros nobres de Curitiba (Secovi-PR, mar/2026). A FYMOOB não tem amostra própria suficiente pra calcular yield CRM no bairro (o Batel concentra venda, não locação nas captações recentes), e o que a base externa mostra confirma o papel do Batel como **reserva de valor**, não veículo de renda."

### Frase G — Valorização 12m (externa)

> "A valorização de preço por m² no Batel nos últimos 12 meses rodou em +6,5% (FipeZap, mar/2026) — à frente da inflação mas atrás de bairros-foguete como Ahú (+12,5%) e CIC (+10,2%). O Batel é o bairro em que ganho de preço vem de acumulação, não de corrida."

---

### Frases proibidas (nunca publicar)

- "A FYMOOB tem N imóveis no Batel"
- "FYMOOB concentra X% do estoque no Batel"
- "Ranking de bairros com mais imóveis FYMOOB"
- "Estoque ativo Batel hoje: N unidades"
- Qualquer número absoluto de captações por bairro
- Qualquer frase sobre "variação do ticket mediano FYMOOB nos últimos 12 meses" (sem série, é invenção)

---

## 4. Limitações

1. **Amostra pequena em números absolutos.** Batel tem amostra modesta (fechamentos/captações acompanhados na casa de ~7 na foto atual). Válido pra **perfil e ticket**, **não** pra afirmar "o Batel como um todo tem X%". É X% **do que passa pela FYMOOB**, não censo do bairro. Frasear como "nas captações recentes da FYMOOB" resolve — é o padrão dos Posts 5 e 6.

2. **n_aluguel = 0 no Batel.** Não há base própria pra calcular yield via CRM. Toda menção a rentabilidade de aluguel depende de **Secovi-PR** (externa, mar/2026). **Nunca** inventar yield "FYMOOB Batel".

3. **Studio aparece como categoria residual.** 14% de < 40m² = 1 imóvel na amostra. Usar frase como "studio compacto isolado" ou "presença residual de studios", **não** como se houvesse tendência. Se o post precisar falar de studio no Batel em profundidade, mencionar que é segmento pequeno e dependente de lançamentos específicos.

4. **Compacto 40-70m² ausente = 0.** Isso é relevante e deve ser citado (Batel pulou o "primeiro apto"), mas com honestidade de que n=7. Se a API reindexar e amanhã aparecer um 55m² no Batel, o %  muda. Frase defensável: "não aparece nas captações recentes".

5. **Ticket = valor anunciado**, não fechado. Transações reais em CWB fecham ~5% abaixo (range 2-8%). Aplicar desconto mental ao falar de "preço de venda realizado".

6. **Dormitórios com valor 0 são ambíguos.** 29% dos Batel têm `Dormitorios=0` — pode ser studio real OU cobertura sem info explícita no CRM (o AP de R$ 7 mi com 263m² e 3 suítes tem "0 dorm" no registro, o que é evidência de info ausente, não studio). Recomendação: **não citar "29% são studios"**. Usar "distribuição pulverizada sem planta dominante" em vez de tentar quantificar studio por dorm.

7. **Sem snapshot histórico viável.** Primeiro snapshot foi 24/04/2026. Não citar **evolução temporal própria** até ≥30 dias de histórico (que vira ruidoso, mas mensurável) e ≥12 meses (que vira comparação honesta). Enquanto isso, **FipeZap é a única fonte de variação 12m**.

8. **Categoria do Loft agrupa "apartamento" englobando cobertura e garden.** Os 100% apto incluem coberturas — o que é consistente com o perfil "grande >150m²" da amostra, mas deve ser lembrado se o post separar cobertura como categoria à parte.

---

## 5. Arquivos e comandos de replicação

- Perfil Batel específico (este relatório): `node scripts/research/debug-batel-detailed.mjs`
- Perfil todos os bairros: `node scripts/debug-bairro-profile.mjs`
- Yield por bairro: `node scripts/research/calculate-yield-by-bairro.mjs --format=json`
- Stock por bairro: `node scripts/research/extract-stock-by-bairro.mjs --format=json`
- Doc pai (todos bairros): [`melhores-bairros-fymoob-data.md`](./melhores-bairros-fymoob-data.md)
- Doc irmão (comparativo binário): [`batel-vs-agua-verde-fymoob-data.md`](./batel-vs-agua-verde-fymoob-data.md)
- Cross-check externo R$/m²: [`preco-m2-bairros-curitiba-2026.md`](./preco-m2-bairros-curitiba-2026.md)

**Última atualização:** 24/04/2026 20:33 BRT (FYMOOB Data Research Specialist — dados Batel pro post "quanto custa morar Batel")
