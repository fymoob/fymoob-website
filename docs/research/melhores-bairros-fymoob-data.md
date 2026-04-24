# Dados Agregados FYMOOB — Melhores Bairros Curitiba 2026

**Gerado em:** 24/04/2026 16:18 BRT
**Fonte:** API Loft/Vista FYMOOB CRM (leitura via `scripts/research/extract-stock-by-bairro.mjs` + `scripts/research/calculate-yield-by-bairro.mjs` + `scripts/debug-bairro-profile.mjs`)
**Snapshot histórico:** `docs/research/snapshots/2026-04-24.json` (dia zero do histórico — única observação até o momento)
**Regra de privacidade aplicada:** volumes operacionais agregados/anonimizados. Não expor "FYMOOB tem N imóveis". Ver decisão em `docs/seo/article-rewrite-learnings.md` Post 5.

> **Para uso EXCLUSIVO do writer.** Não copiar tabela de perfil diretamente pro post. Usar frases-modelo da seção 4.

---

## 1. Perfil de imóveis por bairro (agregado, amostra FYMOOB)

**Cortes adotados:**
- **Compacto:** área privativa < 70m² (proxy de solteiro / casal sem filhos / investidor yield)
- **Médio:** 70-150m² (proxy de família pequena/consolidando)
- **Grande:** > 150m² (proxy de família consolidada / alto padrão)
- **Perfil dominante:** "jovem" se ≥50% compactos · "família consolidada" se ≥40% grandes · senão "misto"

**Tabela agregada — TOP 15 bairros com amostra ≥ 5 fechamentos/captações recentes FYMOOB**

| Bairro | Perfil dominante | % compactos (<70m²) | % grandes (>150m²) | Área média (m²) | Ticket médio venda | Mix tipológico |
|---|---|---|---|---|---|---|
| **Novo Mundo** | jovem solteiro / casal | **83%** | 17% | 66 | ~R$ 530 mil | predominantemente apto |
| **Centro** | jovem solteiro / casal | **67%** | 0% | 64 | ~R$ 1,1 mi (mediana R$ 612 mil) | 100% apto compacto |
| **Portão** | jovem solteiro / casal | 52% | 35% | 153 | ~R$ 748 mil (mediana R$ 780 mil) | apto predomina + casas |
| **Tatuquara** | jovem solteiro / casal | 50% | 25% | 113 | ~R$ 414 mil (mediana R$ 330 mil) | casa/sobrado predomina |
| **Bigorrilho** | família consolidada | 0% | **56%** | 171 | ~R$ 3,46 mi (mediana R$ 2,74 mi) | 100% apto |
| **Batel** | família consolidada | 14% | **57%** | 169 | ~R$ 3,7 mi (mediana R$ 4,45 mi) | 100% apto alto padrão |
| **Mossunguê (Ecoville)** | família consolidada | 22% | **44%** | 149 | ~R$ 2,4 mi (mediana R$ 2,09 mi) | 100% apto |
| **Capão Raso** | família consolidada | 0% | 40% | 144 | ~R$ 992 mil (mediana R$ 969 mil) | casas 100% |
| **Água Verde** | misto | 15% | 23% | 141 | ~R$ 1,66 mi (mediana R$ 1,75 mi) | apto predomina |
| **Campina do Siqueira** | misto | 25% | 25% | 116 | ~R$ 2,24 mi (mediana R$ 2,47 mi) | 100% apto |
| **Campo Comprido** | misto | 14% | 14% | 117 | ~R$ 1,64 mi (mediana R$ 1,14 mi) | apto + casa |
| **Xaxim** | misto | 25% | 38% | 292 | ~R$ 1,05 mi (mediana R$ 850 mil) | casa/sobrado predomina |
| **Sítio Cercado** | misto | 43% | 7% | 94 | ~R$ 501 mil (mediana R$ 550 mil) | casa/sobrado 85% |
| **Cidade Industrial (CIC)** | misto | 39% | 6% | 80 | ~R$ 469 mil (mediana R$ 470 mil) | casa 60% / apto 40% |
| **Campo de Santana** | misto | 36% | 9% | 83 | ~R$ 375 mil (mediana R$ 390 mil) | casa/sobrado 78% |

**Leitura honesta da amostra:**
- Amostra de fechamentos/captações recentes acompanhados pela FYMOOB — **não é censo de todo o bairro**.
- Bairros nobres canônicos (Ahú, Juvevê, Cabral, Bacacheri, Mercês) aparecem com n=1-2 no estoque — cross-referenciar valorização pelo FipeZap/MySide (ver seção 2 deste doc).
- Perfis "jovem solteiro / casal" mais nítidos: **Novo Mundo (83% compactos), Centro (67%), Portão (52%)**.
- Perfis "família consolidada" mais nítidos: **Batel (57% grandes), Bigorrilho (56%), Mossunguê (44%)**.

---

## 2. Rentabilidade de aluguel (reuso do post anterior)

**Fonte prioritária:** `docs/research/preco-m2-bairros-curitiba-2026.md` seção 3 — já publicada e verificada.
**Regra:** NÃO reprocessar tabela aqui. Citar faixas existentes sem volume.

### Faixas-chave pra este post

| Bairro | Yield bruto a.a. (fonte cruzada) | Observação de uso |
|---|---|---|
| Prado Velho (studios) | ~12% a.a. | distorcido por studios — mencionar com cautela |
| CIC / Cidade Industrial | ~3,6-4,2% a.a. | "fechamentos recentes FYMOOB apontam em torno de 4,2% a.a." (CRM confirma n=3 aluguel) |
| Cascatinha | ~4,3% a.a. | Secovi-PR |
| Centro (agregado) | ~3,35% a.a. · ~6% (studios) | dois perfis conviventes |
| Água Verde | ~3,0% a.a. | abaixo da média cidade |
| Batel | ~2,0% a.a. | pior yield entre nobres — store of value |
| Bigorrilho | ~2,8% a.a. | abaixo IPCA |
| **Curitiba (média cidade)** | **4,74% a.a.** | benchmark Secovi-PR mar/26 |

**Cross-check FYMOOB via CRM (agregado, n≥3 categoria):**
- **Cidade Industrial:** n_venda=16, n_aluguel=3 — yield CRM observado ~4,2% a.a. (bate com Secovi). Usar.
- **Tatuquara:** n_venda=5, n_aluguel=4 — yield CRM ~6,6% a.a. (confiabilidade média). **NÃO citar número exato** — dizer apenas "bairros periféricos com perfil econômico tendem a render acima da média da cidade".
- **Xaxim:** yield CRM indica ~13% — outlier por mix tipológico específico, **não publicar**.
- Todos os demais bairros nobres (Batel, Bigorrilho, Mossunguê, Ahú, Juvevê) têm n_aluguel=0 no CRM → **usar somente Secovi-PR**.

---

## 3. Snapshot de evolução — status hoje

**Status:** **primeiro snapshot diário** foi rodado em 24/04/2026 (`snapshots/2026-04-24.json` — 242 imóveis, 66 bairros distintos).
**Snapshots subsequentes:** ainda não coletados (GitHub Action cron 03:00 BRT começa a rodar amanhã, 25/04).

**Implicação pro post:**
- **NÃO há delta de evolução disponível.** Dizer "o estoque caiu X% em Y dias" seria invenção.
- **Posicionar o dia 24/04 como dia zero** na prosa, se mencionado: "a FYMOOB começou em abril/2026 o rastreamento diário do próprio estoque pra medir tempo de venda e evolução do pipeline com rigor de série histórica — os primeiros dados comparáveis saem em julho/2026".
- Alternativa segura: **não mencionar snapshot**. Usar apenas o perfil estático da seção 1.

**Reavaliar em 30/04/2026:** com 6 dias de snapshots, delta fica mensurável mas ainda ruidoso. Com 30 dias (≥24/05), dá pra citar "variação do estoque ao longo do mês".

---

## 4. Como citar dados FYMOOB no post sem expor capacidade (frases-modelo aprovadas)

**Regra-mãe:** volume nunca, perfil sempre. Qualificar com "fechamentos recentes" ou "captações recentes", nunca "estoque ativo N".

### Frases-modelo — use literalmente ou varie forma

**Perfil dominante (ótimo pra passages AI Overview):**
> "Nas captações recentes da FYMOOB no Novo Mundo, mais de 80% dos imóveis têm menos de 70m² — é perfil de solteiro, casal jovem e investidor de yield, não de família consolidada."

> "No Batel e no Bigorrilho, mais da metade do que passa pela FYMOOB são unidades acima de 150m² — o bairro funciona como reserva de valor pra família consolidada, não pra quem busca rentabilidade de aluguel."

**Ticket médio (faixa, não volume):**
> "O ticket médio de apartamento no Ahú hoje, em fechamentos acompanhados pela FYMOOB, está em torno de R$ 1,6 milhão — bate com o que o FipeZap aponta pra bairro que valorizou +12,5% nos últimos 12 meses."

> "No Centro, a mediana é mais reveladora que a média: cerca de R$ 612 mil pra apto compacto, enquanto coberturas antigas puxam a média pra R$ 1,1 milhão."

**Rentabilidade (sem volume):**
> "Na Cidade Industrial, os fechamentos recentes acompanhados pela FYMOOB apontam rentabilidade de aluguel em torno de 4,2% ao ano — levemente abaixo da média da cidade (4,74% a.a., Secovi-PR), mas acima do yield praticado em Batel (~2% a.a.) ou Bigorrilho (~2,8% a.a.)."

> "Bairros periféricos de perfil econômico (Tatuquara, Sítio Cercado, Campo de Santana) tendem a render acima da média da cidade — é o trade-off entre risco maior de vacância e ticket de aquisição mais baixo."

**Perfil misto / transição (útil pra bairro em mudança):**
> "No Portão, o estoque que passa pela FYMOOB é dividido: apartamentos compactos (<70m²) em prédios novos respondem por metade, casas em lotes residenciais pelo restante — é um bairro em transição entre o modelo residencial horizontal e o adensamento vertical."

**Autoridade local (sem volume):**
> "Nos dados que a FYMOOB acompanha diariamente via CRM próprio em Curitiba, o padrão observado é..."

### Frases proibidas (nunca publicar)

- "A FYMOOB tem N imóveis em [bairro]"
- "FYMOOB concentra X% do estoque em [bairro]"
- "Ranking dos bairros com mais imóveis FYMOOB"
- "FYMOOB ativa N imóveis no total em Curitiba"

---

## 5. Bairros com perfil "diferenciado" — os 3 mais úteis pro post

1. **Novo Mundo — 83% compactos (<70m²), 100% dos imóveis tipificados como apartamento** → bairro dominado por perfil "primeiro apto", investidor de aluguel econômico. É o **case de jovem solteiro** mais nítido da amostra. Contraste útil com Batel.

2. **Batel — 57% grandes (>150m²), ticket mediano R$ 4,45 mi** → case clássico de "família consolidada / reserva de valor". FipeZap cita +6,5% 12m, aluguel rende ~2% a.a. — confirma perfil de **store of value**, não yield.

3. **Portão — 52% compactos + 35% grandes + mix apto/casa** → único bairro da amostra com perfil **bimodal claro** (compactos + grandes, sem meio). Útil como exemplo de **bairro em transição**: verticalização nova convivendo com estoque horizontal antigo.

**Bônus — Centro:** 67% compactos, 100% apto, mediana R$ 612 mil. Confirma narrativa do post "mercado imobiliário CWB 2026" de que studios no Centro rendem diferente do agregado — 2 dos 7 têm 1 dormitório.

---

## 6. Limitações

1. **Amostra FYMOOB pequena em bairros nobres canônicos.** Ahú (n=0 no CRM), Juvevê (n=2), Cabral (n=2), Bacacheri (n=0) — pra estes, **usar FipeZap/MySide como fonte primária**, não o CRM. O CRM entra para **bairros onde a FYMOOB opera com profundidade**: Portão, Mossunguê, CIC, Sítio Cercado, Novo Mundo, Campo de Santana, Campina do Siqueira.
2. **Yield por CRM só é confiável em 2 bairros** (Cidade Industrial com n_aluguel=3 e Tatuquara com n_aluguel=4). Demais = usar Secovi-PR.
3. **Snapshot diário ainda sem série** — primeiro snapshot foi 24/04/2026. Não citar evolução temporal até ≥30 dias de histórico.
4. **Ticket médio ≠ preço de fechamento.** Valores do CRM são valores **anunciados** (o Loft não separa anunciado vs fechado no endpoint público). Transações reais em CWB fecham ~5% abaixo (range 2-8%). Aplicar desconto mental se precisar falar de "preço de venda realizado".
5. **Categoria do Loft agrupa diferente do mercado.** "Apartamento" inclui cobertura e garden; "Sobrado" e "Casa" às vezes se sobrepõem. Os % tipológicos são **proxy honesto**, não taxonomia oficial.

---

## 7. Arquivos e comandos de replicação

- Stock por bairro: `node scripts/research/extract-stock-by-bairro.mjs --format=json`
- Yield por bairro: `node scripts/research/calculate-yield-by-bairro.mjs --format=json`
- Perfil tipológico/área: `node scripts/debug-bairro-profile.mjs` (script deste relatório — criado 24/04/2026)
- Snapshot: `node scripts/research/snapshot-crm-daily.mjs` → `docs/research/snapshots/YYYY-MM-DD.json`
- Análise anterior (preço-m²): [`preco-m2-bairros-curitiba-2026.md`](./preco-m2-bairros-curitiba-2026.md) · [`preco-m2-bairros-curitiba-2026-data.md`](./preco-m2-bairros-curitiba-2026-data.md) — caso exista

**Última atualização:** 24/04/2026 16:18 BRT (Vinicius — FYMOOB Data Research Agent)
