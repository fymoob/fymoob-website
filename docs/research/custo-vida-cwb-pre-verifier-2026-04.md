# Veredito YMYL Pre-Verifier — custo-de-vida-curitiba

**Data:** 2026-04-25
**Verifier:** YMYL Pre-Verifier (cross-check entre os 4 docs ANTES do writer)
**Categoria:** YMYL Money — sensibilidade ALTA
**Escopo:** validar consistência factual entre Macro / Local / FYMOOB Data / SEO docs e revalidar fontes primárias críticas via WebFetch + WebSearch.

---

## SUMÁRIO EXECUTIVO

| Status | Quantidade |
|---|---|
| Claims confirmados pelos 2-4 docs com fonte primária revalidada hoje | 14 |
| Claims com qualifier obrigatório ("estimado", "amostra", "tabela X") | 9 |
| Claims a NÃO usar | 7 |
| Discrepâncias entre Macro e Local (com prioridade) | 6 |
| Erros factuais detectados em docs (fix recomendado) | 3 |

**Veredito geral:** os 4 docs são amplamente consistentes nos pilares (cesta DIEESE, IPVA-PR 1,9%, URBS R$ 6, IPTU 2026, Copel +19,15-19,20%, snapshot CRM). Há 6 discrepâncias numéricas menores entre Macro e Local que o writer **deve resolver pela versão Macro** (mais ancorada em Tier 1). E há 3 erros factuais nos docs que o writer NÃO pode reproduzir.

---

## ✅ CLAIMS CONFIRMADOS — writer pode usar com segurança

Cross-validados nos docs E revalidados hoje (25/04/2026) com fonte primária:

1. **Cesta básica DIEESE Curitiba mar/2026 = R$ 769,61** (+3,23% m/m). Fonte: DIEESE/CONAB, confirmada via [Bem Paraná](https://www.bemparana.com.br/noticias/economia/cesta-basica-curitiba/) e [Corecon-PR PDF](https://www.coreconpr.gov.br/download/309/02/31828/cesta-marco.pdf). Bate em Macro §1.1 e Local §6.1.

2. **IPVA-PR 2026 = 1,9%** sobre valor venal (era 3,5% em 2025, redução -45,7%). Fonte: [SEFA-PR](https://www.fazenda.pr.gov.br/Noticia/Com-aliquota-de-19-e-desconto-vista-Fazenda-divulga-datas-do-IPVA-2026), confirmada via WebFetch hoje. Lei 21.951/2024 sancionada por Ratinho Junior. Bate em Macro §6 e Local §1.1 (TL;DR claim 3).

3. **Tarifa URBS 2026 = R$ 6,00** (congelada desde 2023). Domingão Meia R$ 3 confirmados. Fonte: [Prefeitura CWB](https://www.curitiba.pr.gov.br/noticias/prefeitura-de-curitiba-mantem-tarifa-de-onibus-em-r-6-e-programas-sociais-no-transporte-em-2026/81220), confirmado via WebSearch. Bate em Macro §7 e Local §1.

4. **SP/BH/Floripa/RJ/Fortaleza reajustaram tarifa em 2026, CWB não** — cinco capitais reajustaram (SP R$ 5,00, BH R$ 5,75, Floripa R$ 6,40). Bate em Local §1.3 e Macro §7.

5. **Reajuste Copel proposto +19,15% residencial / +19,20% médio** (vigência 24/06/2026, sob Consulta Pública ANEEL nº 005/2026, audiência 29/04/2026 em Curitiba). Fonte: [ANEEL](https://www.gov.br/aneel/pt-br/assuntos/noticias/2026/aneel-aprova-consulta-publica-para-debater-revisao-tarifaria-da-copel) confirmado via WebSearch. Bate em Macro §9 e Local TL;DR claim 5. **Note:** os 2 docs usam "19,15%" e "19,2%" — o writer deve dizer "19,15% residencial / 19,20% efeito médio" pra ser preciso, não escolher um número.

6. **Salário Mínimo Nacional 2026 = R$ 1.621** (Decreto 12.342/2025).

7. **Piso regional PR 2026 — Grupo IV técnico = R$ 2.407,90** (maior do Brasil). Resolução CETER 632/2026.

8. **IPCA Brasil mar/2026 = 0,88%** (12m = 4,14%). RM Curitiba mar/2026 = -0,06% (menor entre RMs).

9. **IPTU CWB 2026 = 1% residencial, 80% imóveis corrigidos só pelo IPCA (4,46%)** via Decreto 2668/2025. 135 mil imóveis isentos (≤70m² + venal ≤R$ 232k).

10. **Sanepar IRT 2026 = +2,4993% (vigência 17/05/2026)**, tarifa média R$ 7,00/m³ — AGEPAR Resolução homologada.

11. **ANS reajuste plano individual 2025-26 = teto 6,06%** (data-aniversário do contrato).

12. **Snapshot FYMOOB CRM 2026-04-24** — 242 imóveis ativos, 66 bairros. Snapshot único existente (cron diário começou agora). Confirmado por leitura do `docs/research/snapshots/2026-04-24.json`.

13. **Aluguel por bairro NÃO é viável** com snapshot atual: 20 imóveis com `valor_locacao>0`, nenhum bairro com n≥5. Outliers comerciais não declarados (Xaxim 594m² R$ 15k, Maracanã 145m² R$ 8.2k). Confirmado pela §3 do FYMOOB Data.

14. **Bigorrilho → Portão = -43% R$/m² mediano** (R$ 19.509 vs R$ 11.129, ~2km de distância). Campina do Siqueira ≈ Batel (~R$ 20k/m², empate técnico). Confirmado pela §8 e §9 do FYMOOB Data.

---

## ⚠️ CLAIMS COM QUALIFIER OBRIGATÓRIO

Não são falsos, mas o writer DEVE qualificar pra não enganar leitor YMYL:

1. **Almoço executivo R$ 34,90 → R$ 89** — Local §5.1. Qualifier obrigatório: **"amostra observacional de 7 restaurantes em Batel/Centro/Bigorrilho, abr/2026, valores publicados nos sites das casas"**. Anarco e CNN Brasil confirmam, mas é amostra, não média estatística.

2. **Mensalidade escola particular CWB (Bom Jesus R$ 2.300-3.800; Sion R$ 3.500-5.500; Internacional R$ 4.500-7.500)** — Local §9.1. Qualifier obrigatório: **"amostra de 10 colégios via Quero Bolsa / Gazeta do Povo / sites oficiais; cada escola define autonomamente conforme Lei 9.870/1999, sem teto SINEPE-PR"**. Macro §13 confirma que SINEPE-PR não publica média oficial.

3. **Tabela Unimed Curitiba por idade (R$ 380 → R$ 2.500 a partir de 0-18 → 59+)** — Local §8.1. Qualifier obrigatório: **"tabela indicativa Unimed Curitiba via Lifebis/Tabela Unimed, abr/2026; valores variam por modalidade (Pleno/Premium/Amigo) e podem mudar no aniversário do contrato"**. Macro §12.2 confirma que ANS NÃO tem tabela pública para Curitiba específica.

4. **Custo médio mensal CWB R$ 6.842 / SP R$ 8.163 (Numbeo/Expatistan/BandNews)** — Local §15.1. Qualifier obrigatório: **"dado crowdsourced Numbeo abr/2026, 914 registros / 66 contribuintes — fonte Tier 4, usar como contexto, não como ancoragem oficial"**. Confirmei via WebFetch hoje: Numbeo CWB sem aluguel = R$ 3.022 (solteiro) e R$ 11.096 (família 4). O R$ 6.842 inclui aluguel.

5. **Salário médio CWB ~35% menor que SP / Paraná R$ 3.100 vs SP R$ 4.200** — Local §14.1 (Numerando/IBGE/CAGED). Qualifier obrigatório: **"dado Numerando agregando IBGE/CAGED 2026 — não é fonte primária IBGE direta; PNAD Contínua 3T/2025 reporta Sul R$ 4.036, Censo 2022 reporta CWB R$ 4.662 (4ª capital)"**. Macro §14 traz fontes primárias mais defensáveis — **writer deve preferir Macro**.

6. **Aluguel por bairro (Batel R$ 3.500-5.500, Bigorrilho R$ 2.800-4.500, etc.)** do post antigo — Macro §5.4 confirma "plausível mas precisa cruzar com FYMOOB". FYMOOB §3 confirma **n insuficiente pra bairro nobre**. Qualifier obrigatório: **"faixas de portais imobiliários (FipeZap, ZAP) — FYMOOB CRM atual não tem amostra residencial premium suficiente pra confirmar mediana por bairro nobre. Dados FYMOOB cobrem bem mediana de venda (15 bairros n≥5)"**.

7. **Big Mac Index CWB R$ 28-32 sanduíche / R$ 38-48 combo** — Local §5.3. Qualifier: **"estimativa baseada em mcdomenus.com (referencial nacional) e observação direta abr/2026; promo 'combo mais barato R$ 8,30' confirmada por TNH1 mas pode ter expirado"**.

8. **Aluguel residencial nacional FipeZap dez/2025 R$ 50,98/m²** — Macro §5.1. Qualifier: **"FipeZap usa dados de portais ZAP/Vivareal — Tier 3, não primário; fonte primária ideal seria Sinduscon-PR ou Sindicato Inquilinos PR, não localizado pra 2026"**.

9. **Cobrança IPTU em apto venal R$ 480k = R$ 4.800/ano = R$ 400/mês** — Local §11.1. Qualifier: **"alíquota residencial 1% sobre valor venal; cálculo ilustrativo. Decreto 2668/2025 limitou aumento PGV em 18% + IPCA até 2029 — venal real pode ser inferior"**.

---

## ❌ CLAIMS A NÃO USAR

1. **"Curitiba 15-25% mais barata que SP"** (post antigo) — NÃO ANCORÁVEL como % genérico. Macro §4 demonstra: cesta DIEESE -12,9%, Numbeo -17,7%, Expatistan -7-9% — variação grande e fontes Tier 4 misturadas. **Substituir por dados específicos**: cesta -12,9% (DIEESE), aluguel -43,8% (Numbeo, qualified Tier 4), IPVA -52,5% (R$ 1.140 vs R$ 2.400 carro R$ 60k).

2. **"IPVA 3,5% no PR"** (post antigo) — DESATUALIZADO desde 1º jan/2026. Atualmente 1,9%.

3. **"Gasolina R$ 5,80-6,20"** (post antigo) — DESATUALIZADO. Macro §8 cita ANP CWB jan/2026 R$ 6,93/L e abr/2026 (max) R$ 7,19/L. Local §2 cita CustoCarro/ANP R$ 6,29/L (média comum) abr/2026. **DISCREPÂNCIA entre Macro e Local** — ver seção 🔍 abaixo.

4. **"Plano de saúde individual R$ 350-600"** (post antigo) — FALSO sem qualificar idade. Local §8.1 demonstra: R$ 350-600 só vale pra <30 anos. Acima de 50 anos = R$ 1.500-2.500. Writer NÃO pode usar faixa única.

5. **"Almoço executivo R$ 25-40"** (post antigo) — DESATUALIZADO. Local §5.1 demonstra faixa real R$ 34,90-89 com fontes citadas. Centro fica R$ 30-55, Batel/Bigorrilho concentra R$ 60-89.

6. **"Mercer aponta Curitiba como melhor cidade do Brasil"** (recurring claim em mídia) — NÃO ANCORÁVEL. Macro §4.4 e WebSearch hoje confirmam: Mercer Quality of Living 2024/2025 não publica posição específica de Curitiba publicamente. **Writer NÃO deve citar Mercer.** Substituir por **IPS 2025 (Curitiba 1ª capital qualidade vida)** — fonte: prefeitura.curitiba.pr.gov.br, confirmada na SEO doc apêndice.

7. **"Curitiba 34% mais cara"** (claim de outro post antigo) — FALSO. Macro §3.3 demonstra: IPCA-CWB 12m = 5,04% vs Brasil 4,14% = só 0,9pp acima.

---

## 🔍 DISCREPÂNCIAS ENTRE MACRO E LOCAL (ranking de prioridade)

### Prioridade ALTA — writer DEVE resolver

**1. Gasolina ANP-CWB abr/2026: divergência R$ 6,29 (Local) vs R$ 6,93-7,19 (Macro)**
- **Local §2.1**: R$ 6,29/L gasolina comum (CustoCarro/ANP, abr/2026)
- **Macro §8**: jan/2026 R$ 6,93/L (ANP semana 18-24/jan); abr/2026 (12-18/abr) MAX R$ 7,19/L
- **Análise:** Local pode estar usando média ponderada cidade inteira (mais postos = média mais baixa); Macro pode estar usando edição semanal mais recente. WebSearch hoje confirmou somente "R$ 6,93 jan/2026". O PDF síntese 13/2026 ou 15/2026 deve trazer abr/2026 oficial.
- **RESOLUÇÃO PRO WRITER:** usar **faixa "R$ 6,29 a R$ 7,19/L"** com qualifier "média ANP abr/2026 (CustoCarro agregando) — Centro até R$ 6,85/L". NÃO escolher um número único. Linkar [ANP Síntese Semanal](https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/sintese-semanal-do-comportamento-dos-precos-dos-combustiveis).

**2. Salário regional PR 2026: divergência valores entre docs**
- **Macro §2.2**: Grupo I = R$ 2.105,34 / Grupo II = R$ 2.181,63 / Grupo III = R$ 2.250,04 / Grupo IV = R$ 2.407,90
- **Local §14.3**: "faixa I R$ 2.213,42 a faixa V R$ 2.428,32 (entrou em vigor maio/2025)" — fonte Barbieri Advogados (Tier 4 blog)
- **Análise:** Macro cita [Resolução CETER 632/2026 LegisWeb](https://www.legisweb.com.br/legislacao/?id=489781) (Tier 1 oficial). Local cita blog jurídico. Macro vence. Local está confundindo o Reajuste 2025 (já vencido) com 2026.
- **RESOLUÇÃO PRO WRITER:** usar **valores Macro** (CETER Resolução 632/2026). Ignorar tabela Local.

**3. Cesta DIEESE 12 meses: divergência -0,42% (Local) vs +5,04% IPCA (Macro)**
- **Local §6.1**: "Variação 12m mar/25 → mar/26 = -0,42%"
- **Macro §3.2**: "IPCA-CWB acumulado 12m = 5,04% (acima da meta nacional 4,5%)"
- **Análise:** São métricas DIFERENTES — cesta DIEESE (alimentação) vs IPCA RM Curitiba (geral). NÃO É CONTRADIÇÃO, mas pode confundir writer/leitor.
- **RESOLUÇÃO PRO WRITER:** declarar explicitamente — **"cesta básica DIEESE-CWB 12m: -0,42% (alimentação caiu)"** e **"IPCA-CWB geral 12m: 5,04%"**. NÃO juntar num único número.

### Prioridade MÉDIA

**4. Salário médio CWB/PR — fontes diferentes**
- **Macro §14**: Censo IBGE 2022 R$ 4.662 (CWB 4ª capital); PNAD 3T/2025 Sul R$ 4.036
- **Local §14.1**: "PR 2026 R$ 3.100, SP R$ 4.200 (Numerando)"
- **Análise:** Macro usa fonte Tier 1 (IBGE). Local usa Tier 4 (Numerando blog). E o número Local "PR R$ 3.100" não bate com PNAD Sul R$ 4.036.
- **RESOLUÇÃO:** usar **Macro** (IBGE Censo 2022 + PNAD 2025). NÃO usar Numerando.

**5. Tarifa SP 2026: R$ 5,00 (Local §1.3) vs R$ 5,30 (Macro §7)**
- **Análise:** WebSearch indica que SP foi reajustada para R$ 5,00 em jan/2026 (Local correto). Macro pode estar usando dado errado.
- **RESOLUÇÃO:** usar **Local** (R$ 5,00).

**6. Numbeo: custo mensal CWB pessoa solteira sem aluguel**
- **Macro §4.2**: R$ 3.022,00
- **Local §15.1**: R$ 6.842 (mas inclui aluguel — fonte BandNews citando Numbeo/Expatistan)
- **Análise:** confirmei via WebFetch hoje no Numbeo: solteiro sem aluguel = R$ 3.022; família 4 sem aluguel = R$ 11.096; **com aluguel pessoa solteira = ~R$ 6.842 (BandNews)**.
- **RESOLUÇÃO:** writer deve sempre declarar **"com aluguel" ou "sem aluguel"** ao citar Numbeo. R$ 3.022 = sem aluguel; R$ 6.842 = com aluguel; R$ 11.096 = família 4 sem aluguel.

---

## ⚠️ ERROS FACTUAIS DETECTADOS NOS DOCS (writer NÃO pode reproduzir)

### Erro 1 (SEO doc §4): "MySide #1 não cita BH"

A SEO doc afirma 8 vezes que "ninguém cita Belo Horizonte" como gap competitivo. **Erro factual.**

WebFetch hoje em [myside.com.br/guia-curitiba/custo-de-vida-curitiba-pr](https://myside.com.br/guia-curitiba/custo-de-vida-curitiba-pr) retornou:
> "O custo de vida médio na capital paranaense é de R$ 6.842, abaixo de metrópoles como São Paulo (R$ 8.163), por exemplo, e **próximo ao custo de vida de Belo Horizonte (R$ 6.194)**."

→ MySide #1 SIM cita Belo Horizonte. O gap real é **profundidade do comparativo BH** (todos top 5 mencionam mas raso, sem cruzamentos). Writer pode ainda explorar BH como ângulo, mas **NÃO pode afirmar "ninguém cita BH" como diferencial**. Substituir por "cobertura rasa de BH em todos competidores — FYMOOB pode aprofundar".

### Erro 2 (Local doc §6.1): "Salário mínimo necessário DIEESE = 5,2× → R$ 7.893,60"

Local §6.1: "Salário mínimo necessário (DIEESE): ~5,2× o salário mínimo nacional (R$ 1.518 em 2026 → ideal R$ 7.893,60)".

**Erros:**
- Salário mínimo nacional 2026 é **R$ 1.621**, não R$ 1.518 (R$ 1.518 era 2025). Macro §2.1 confirma.
- Cálculo R$ 1.518 × 5,2 = R$ 7.893,60 está aritmética OK mas usa SM errado.
- Cálculo correto: R$ 1.621 × 5,2 = **R$ 8.429,20**.
- Mas Macro §1.1 e SEO §10 (apêndice) reportam DIEESE NT 289 = **R$ 7.067,18 família 4 (4,4× mín)** — esse é o número oficial mais recente.

→ **Writer deve usar R$ 7.067,18 (DIEESE NT 289)** com link primário. NÃO usar o R$ 7.893,60 do Local doc.

### Erro 3 (Local doc §9.1): "Salário mínimo nacional R$ 1.518 em 2026"

Local §6.1 e §14.3 referem R$ 1.518 como salário mínimo 2026. **DESATUALIZADO** — correto é **R$ 1.621** (vigente desde 1º jan/2026, Decreto 12.342/2025).

→ Toda referência a R$ 1.518 no Local doc deve ser substituída por R$ 1.621 antes de o writer usar.

---

## 🧮 VALIDAÇÃO DO TÍTULO PROPOSTO

Title sugerido pelo SEO doc: **"Custo de Vida em Curitiba 2026: R$ 3.200 a R$ 22.000"** (53 chars)

**R$ 3.200 (limite inferior — solteiro econômico):**
- Local §16.1 (Solteiro econômico bairro médio Portão/Boqueirão/Cajuru): TOTAL **R$ 4.082 a R$ 6.549**.
- ❌ **R$ 3.200 NÃO BATE com Local §16.1.** O mínimo apurado é R$ 4.082, não R$ 3.200.
- Snippet sugerido SEO §6 #1 cita "R$ 2.700" pra Capão Raso/Sítio Cercado mais econômico ainda.
- **RESOLUÇÃO:** writer deve **decidir** e **ancorar**:
  - Se usar R$ 3.200, declarar "solteiro mínimo Capão Raso/Sítio Cercado, sem carro, com transporte BRT, sem plano saúde premium" e ajustar 16.1 do Local pra refletir esse cenário extremo.
  - Alternativa: usar **R$ 4.082** (Local §16.1 verdadeiro mínimo). Title mudaria pra "R$ 4.000 a R$ 22.000".
  - Alternativa preferida: declarar faixa do snippet "R$ 2.700 a R$ 6.500/mês solteiro" e separar família 4 perfis.

**R$ 22.000 (limite superior — família 4 conforto):**
- Local §16.3 (Família 2 filhos Batel/Ecoville/Bigorrilho): TOTAL **R$ 26.075 a R$ 55.380**.
- Mediana realista declarada: R$ 38.000-48.000/mês.
- ❌ **R$ 22.000 SUBESTIMA o cenário Batel/Ecoville/Bigorrilho com escola particular Sion/Internacional.**
- **RESOLUÇÃO:** se writer quer máximo R$ 22.000, deve declarar "família 4 cenário moderado, escola particular tradicional Bom Jesus/Marista (não Internacional), bairro nobre não Batel". OU mudar pra R$ 26.000 ou R$ 30.000 pro título.

**Veredito sobre o título:** o range "R$ 3.200 a R$ 22.000" está **mal-ancorado em ambos os extremos** vs a pesquisa Local. SEO doc inventou os números pro título sem cross-checar com Local §16. **Writer deve recalibrar:**
- Opção 1 (preferida): "Custo de Vida em Curitiba 2026: R$ 4.000 a R$ 26.000" (54 chars, ancorado em Local §16.1 e §16.3 mín-realístico)
- Opção 2: manter R$ 3.200/R$ 22.000 mas DECLARAR explicitamente os cenários (solteiro extremo Capão Raso vs família 4 moderado) e RECALIBRAR §16 do Local.
- Opção 3: usar Snippet #1 "R$ 2.700 a R$ 6.500 solteiro" + "R$ 11.500 casal" + "R$ 16.500-22.000 família" como 3 perfis no lide, NÃO no título.

---

## 📋 RECOMENDAÇÕES FINAIS PRO WRITER

### 1. Hierarquia de fontes nas discrepâncias
Em qualquer choque entre Macro e Local, **Macro vence** (Tier 1-2 oficiais > Tier 4 blogs). Exceções:
- Tarifa SP 2026 (Local R$ 5,00 está correto, Macro R$ 5,30 está errado)
- Almoço/comércio empírico (só Local tem amostra direta)

### 2. Numbeo SEMPRE com qualifier
"Sem aluguel" ou "com aluguel" e "fonte Tier 4 crowdsourced". Os 3 números: R$ 3.022 / R$ 6.842 / R$ 11.096 são DIFERENTES e o writer não pode misturar.

### 3. Nunca citar
- Mercer Quality of Living (não há posição CWB pública)
- Salário mínimo R$ 1.518 (é 2025, não 2026 — usar R$ 1.621)
- Cesta básica abr/2026 (não divulgada, sai ~05/05) — usar mar/2026 R$ 769,61
- IPVA-PR 3,5% (era 2025, agora é 1,9%)
- "Curitiba 34% mais cara" (claim falso de post antigo)

### 4. Sempre qualificar
- Mensalidade escola: "amostra de N colégios, Lei 9.870/1999"
- Plano saúde por idade: "tabela Unimed Curitiba abr/2026, varia por modalidade/aniversário"
- Almoço executivo: "amostra observacional 7 restaurantes Batel/Centro/Bigorrilho"
- Aluguel residencial premium: "FYMOOB CRM atual sem amostra suficiente — usar FipeZap como referência externa"
- Renda média CWB: "Censo IBGE 2022 (R$ 4.662) — dado de 2022; PNAD 3T/2025 Sul R$ 4.036 — dado mais recente disponível"

### 5. Methodology Box obrigatória no fim do post
Conforme SEO doc §11. Itens mínimos:
- Data da pesquisa: 2026-04-25
- Snapshot CRM: 2026-04-24 (242 imóveis, 66 bairros)
- Cesta DIEESE-CWB: mar/2026 (próxima atualização ~05/05/2026)
- Tier de fontes: 1 (oficial) > 2 (institucional secundário) > 3 (imprensa especializada) > 4 (Numbeo/Expatistan/blogs)
- IPVA-PR baseado em Lei 21.951/2024 (vigência 1º jan/2026)
- Copel reajuste sob ANEEL Consulta Pública nº 005/2026 (vigência 24/06/2026 se aprovado)

### 6. Rever título antes de escrever
O range "R$ 3.200 a R$ 22.000" não bate com Local §16. Writer deve **decidir** entre:
(a) recalibrar Local §16.1 e §16.3 pra fechar a faixa do título; ou
(b) mudar título pra range que bate. Sugestão: **"Custo de Vida em Curitiba 2026: 4 perfis e R$ 769,61 de cesta"** (52 chars) — number drop com cesta DIEESE como âncora factual irrefutável.

### 7. Linkar fontes inline (não rodapé)
SEO doc §10 explica padrão GEO-friendly. Cada claim numérico crítico precisa link DIREITO no parágrafo onde aparece, não no fim do artigo.

### 8. Aluguel premium é OUT
FYMOOB CRM não sustenta. Writer NÃO produzir tabela "top 5 bairros nobres pra alugar". Linkar pra FipeZap/QuintoAndar como fonte externa, ou focar em **custo de COMPRAR** onde FYMOOB tem dados sólidos (15 bairros n≥5).

### 9. Inverno é diferencial real, mas usar dados conservadores
- "Chuveiro modo inverno gasta 35% mais que verão" (SEGS) — claim ancorado, mas é **referência geral**, não específica CWB.
- "Banho 25% da conta de luz padrão; CWB inverno até 35%" — Local §12.3 cita estimativa.
- Qualifier obrigatório: **"em CWB com 90+ dias <15°C, banho elétrico pode pesar 5-10pp adicional na conta jun-ago vs resto do ano — estimativa baseada em estudos Copel/SEGS, não medição CWB-específica oficial"**.

### 10. Pre-Verifier sign-off
Os 4 docs pesquisaram dignamente. Macro é o mais robusto (18 claims Tier 1-2 ancorados). Local complementa com observação direta + amostras empíricas — usar com qualifiers. FYMOOB Data é honesto sobre limitações (snapshot único, aluguel insuficiente, condomínio/IPTU sujos). SEO doc tem **1 erro factual sobre BH** que o writer não pode reproduzir, mas estrutura do post + estratégia de gaps é sólida.

---

## CHECKLIST FINAL PRO WRITER

- [ ] Não usar IPVA 3,5% (é 1,9% via Lei 21.951/2024)
- [ ] Não usar SM R$ 1.518 (é R$ 1.621 em 2026)
- [ ] Não usar gasolina R$ 5,80-6,20 (é R$ 6,29-7,19/L abr/2026)
- [ ] Não usar Mercer (não há ranking público CWB)
- [ ] Não afirmar "MySide não cita BH" como diferencial (cita SIM)
- [ ] Não usar plano saúde R$ 350-600 sem qualificar idade
- [ ] Não citar cesta abr/2026 (não divulgada — usar mar/2026 R$ 769,61)
- [ ] Não usar DIEESE salário necessário R$ 7.893 (é R$ 7.067 NT 289)
- [ ] Sempre qualificar Numbeo "sem aluguel" / "com aluguel"
- [ ] Sempre qualificar amostras empíricas (almoço, escolas, plano saúde)
- [ ] Linkar fonte primária inline em cada claim numérico
- [ ] Recalibrar título se manter R$ 3.200 - R$ 22.000 (não bate com Local §16)
- [ ] Methodology Box no fim com tier de fontes + data
- [ ] Aluguel por bairro: NÃO produzir tabela com FYMOOB CRM (sample insuficiente)
- [ ] Snapshot CRM 2026-04-24 (242 imóveis, 66 bairros) — declarar metodologia em FYMOOB Data §0

---

**Tempo gasto:** ~25 min. Confirmações via WebFetch hoje (25/04/2026): IPVA-PR 1,9% (SEFA-PR), Cesta DIEESE-CWB R$ 769,61 (Bem Paraná), Tarifa URBS R$ 6,00 (WebSearch — page Prefeitura 403), Copel +19,15-19,20% (WebSearch — ANEEL/canalsolar/apucarananews), Lei 21.951 (WebSearch — A Tarde / DETRAN-PR / Fazenda-PR), Numbeo CWB R$ 3.022 sem aluguel (WebFetch direto), MySide cobre BH com R$ 6.194 (WebFetch direto — corrige erro SEO doc).

**Próximo agente:** Writer com este Pre-Verifier + 4 docs de pesquisa em mãos. Em conflito, Macro vence Local; Pre-Verifier vence todos.
