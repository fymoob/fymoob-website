# Plano de Revisão de Conteúdo — Artigos FYMOOB

> Compilado em **2026-05-02** após auditoria completa dos 15 artigos
> publicados, cruzamento com GSC (queries por página), pesquisa externa
> de concorrência e mapeamento de fontes citadas vs faltantes.

## Sumário

1. [Princípios editoriais](#1-principios-editoriais)
2. [Hierarquia de fontes confiáveis](#2-hierarquia-de-fontes-confiaveis)
3. [Tabela resumo — 15 artigos × ações](#3-tabela-resumo)
4. [Auditoria por artigo](#4-auditoria-por-artigo) (15 seções)
5. [Pontos a pesquisar externamente](#5-pontos-a-pesquisar-externamente)
6. [Próximos passos — fluxo de revisão](#6-proximos-passos)

---

## 1. Princípios editoriais

Estes 5 princípios guiam toda revisão. Aplicam-se a artigos novos e à reescrita dos existentes.

### 1.1 Fontes externas são prova primária; FYMOOB é cor local

**Pode citar dados FYMOOB** (CRM, captações, observação de mercado), **mas como complemento que enriquece**, nunca como autoridade que sustenta a tese. Toda afirmação numérica relevante deve ter pelo menos 1 fonte externa pública atrás. Quando FYMOOB é a única fonte disponível, marcar explicitamente "estimativa FYMOOB", "observação de mercado FYMOOB", "amostra do nosso portfólio" — para o leitor saber distinguir.

**Padrão aceitável:**
> "Em Curitiba, o m² fechou março/2026 em **R$ 11.621** ([FipeZap](#)). No estoque ativo da FYMOOB, captações recentes em Bigorrilho ficam em R$ 14-16 mil/m², coerente com o agregado."

**Padrão inaceitável:**
> "A Caixa domina 70% do mercado de financiamento."  *(sem fonte, número arredondado, claim de market share absoluto)*

### 1.2 Title nunca tem números específicos; description sim

Already saved as memory. Title matcha intent (como o usuário pesquisa). Number-driven hook serve só para description — depois que o usuário já decidiu clicar.

### 1.3 Médias de múltiplas fontes > número único de uma fonte só

Quando há disponibilidade, citar 2-3 fontes que convergem. Discrepância entre fontes é tratada explicitamente:

> "FipeZap mar/2026 mostra m² em R$ 11.621; Quinto Andar Index aponta R$ 11.400; Secovi-PR R$ 11.800. Convergência ~R$ 11.600 dentro de margem ±2%."

Quando uma única fonte é o padrão do setor (FipeZap pra preço imobiliário, IBGE pra demografia), citar essa só já é OK — desde que linkada.

### 1.4 Datas explícitas em todo dado

- "Em abril/2026..." > "Recentemente..."
- "Mar/2026 (FipeZap)" > "FipeZap"
- "[Decreto 2668/2025, assinado 19/12/2025]" > "Decreto recente"

Dado sem data prescreve em 6-12 meses. Dado com data se torna manchete de leitura histórica.

### 1.5 Comparativos entre marcas/players: descrever a comparação, não atribuir posição absoluta

**Inaceitável:** "BRB virou #2 do ranking nacional"
**Aceitável:** "Nas taxas levantadas em abril/2026 entre 5 bancos, BRB aparece como 2ª menor taxa nominal"

Mesmo princípio para construtoras, escolas, hospitais.

---

## 2. Hierarquia de fontes confiáveis

Por categoria temática. Sempre prefira o tier mais alto disponível. Tier 4 (mídia) só quando os anteriores não publicam o dado.

### 2.1 Mercado imobiliário (preços, valorização, estoque)

| Tier | Fonte | Cobertura |
|---|---|---|
| 1 | [FipeZap](https://www.fipe.org.br/pt-br/indices/fipezap/) | m² venda + locação por capital, índice oficial Fipe + FGV + Zap |
| 1 | [Secovi-PR](https://secovi-pr.com.br/) | Pesquisa estoque + locação CWB |
| 1 | [Abrainc](https://www.abrainc.org.br/) | Mercado nacional, lançamentos |
| 1 | [Abecip](https://www.abecip.org.br/) | Crédito imobiliário, SBPE |
| 1 | [ADEMI-PR](https://www.ademi-pr.com.br/) | Lançamentos CWB, VGV |
| 1 | [Sinduscon-PR](https://sinduscon-pr.com.br/) | CUB-PR, custos construção |
| 2 | Quinto Andar Index | Aluguel padronizado nacional |
| 2 | Zap Imóveis Index | Anúncios agregados |
| 2 | MySide / Apto.vc | Compiladores com fonte primária linkada |
| 2 | Loft (relatórios) | Análise por bairro, sem viés |
| 3 | BemBrasil, Senior Index, Larya | Específicos regionais |
| 4 | Numbeo, Expatistan | **Colaborativo** — só pra cor, nunca pra ancorar |

### 2.2 Macroeconomia + crédito

| Tier | Fonte |
|---|---|
| 1 | [Banco Central — Séries Temporais](https://www3.bcb.gov.br/sgspub/) (endividamento, Selic, SBPE) |
| 1 | [IBGE — PNAD Contínua](https://www.ibge.gov.br/estatisticas/sociais/trabalho/9173-pesquisa-nacional-por-amostra-de-domicilios-continua-trimestral.html), Censo 2022, IPCA |
| 1 | FGV/IBRE — INCC-DI, INCC-M |
| 1 | IPEA — Conjuntura econômica |
| 1 | DIEESE — Cesta básica, salário mínimo necessário |
| 2 | [CNC Peic](https://www.portaldocomercio.org.br/) — Endividamento famílias |
| 2 | Anbima — Investimentos, CDI |

### 2.3 Curitiba específico

| Tier | Fonte |
|---|---|
| 1 | [Prefeitura de Curitiba](https://www.curitiba.pr.gov.br/) (decretos, IPTU, ITBI, certidões) |
| 1 | [Câmara Municipal de Curitiba](https://www.curitiba.pr.leg.br/) |
| 1 | [SEFA-PR](https://www.fazenda.pr.gov.br/) (IPVA, ICMS) |
| 1 | [SESP-PR / CAPE](https://www.seguranca.pr.gov.br/CAPE/Estatisticas) (criminalidade) |
| 1 | [IPPUC](https://ippuc.org.br/) (urbanismo, demografia) |
| 1 | [IPARDES](http://www.ipardes.gov.br/) (PIB, indicadores estaduais) |
| 1 | [URBS](https://www.urbs.curitiba.pr.gov.br/) (transporte) |
| 2 | Gazeta do Povo, Tribuna do Paraná, Bem Paraná | Mídia local com prática editorial sólida |
| 3 | iLove Curitiba, MySide guias | Compiladores; usar quando linkam fonte primária |

### 2.4 Educação

| Tier | Fonte |
|---|---|
| 1 | [INEP — IDEB, ENEM, Saeb](https://www.gov.br/inep/pt-br) |
| 1 | [QEdu](https://qedu.org.br) — visualização IDEB por escola |
| 1 | Sites oficiais das escolas (mensalidade, conteúdo) |
| 2 | Bem Paraná (top 25 colégios), Gazeta do Povo |
| 3 | Querobolsa, Melhor Escola |

### 2.5 Saúde

| Tier | Fonte |
|---|---|
| 1 | [Ministério da Saúde / DataSUS](https://datasus.saude.gov.br/) |
| 1 | [SESA-PR](https://www.saude.pr.gov.br/) |
| 1 | [ANS](https://www.gov.br/ans/) (planos de saúde, reajustes) |
| 1 | Sites oficiais hospitais (Pequeno Príncipe, HNSG, HUEM) |
| 2 | Anahp, RNDS |

### 2.6 Jurídico

| Tier | Fonte |
|---|---|
| 1 | [STJ](https://www.stj.jus.br/), [STF](https://www.stf.jus.br/), TJ-PR |
| 1 | [Planalto — leis e decretos](https://www.planalto.gov.br/) |
| 1 | [LegisWeb / LeisMunicipais](https://leismunicipais.com.br/) (leis municipais) |
| 1 | Receita Federal, CNJ |
| 2 | Conjur, Migalhas, JusBrasil (jurisprudência) |

### 2.7 Setor bancário

| Tier | Fonte |
|---|---|
| 1 | Sites oficiais (Caixa, Itaú, Bradesco, Santander, BB, BRB) |
| 1 | [BCB — Resolução CMN 4.881/2020](https://www.bcb.gov.br/) (CET) |
| 2 | Abecip, Anbima, FEBRABAN |
| 3 | Larya, MySide, SpImóvel (agregadores de taxas) |

---

## 3. Tabela resumo

Status de cada artigo por dimensão. Coluna "Risco" é a prioridade da revisão.

| # | Slug | Word count | Fontes externas | FYMOOB como fonte primária | Risco | Ação principal |
|---|---|---|---|---|---|---|
| 1 | `apartamento-ou-casa-curitiba` | 2.882 | 9 (IBGE, FipeZap, Inpespar, Loft, ADEMI-PR, STJ) | 3 trechos (CRM como complemento) | 🟢 Baixo | Verificar afirmações qualitativas; CRM já marcado como complemento |
| 2 | `batel-vs-agua-verde-curitiba` | 2.132 | 6 (FipeZap, Secovi, SESP, INEP, IPPUC, Loft) | 1 trecho (composição de carteira) | 🟢 Baixo | Adicionar fonte para "Av. República Argentina top 4 patrimonial" |
| 3 | `checklist-compra-imovel` | 2.455 | 8 (STJ, CC, Lei 6.015, Resolução CMN, IRIB, ABNT) | 0 | 🟢 Mínimo | Verificar afirmação "R$ 80 mil que comprador médio perde" — adicionar fonte ou suavizar |
| 4 | `como-financiar-minha-casa-minha-vida` | 1.808 | 5 (Min. Cidades, Caixa, BB, FGTS) | 1 trecho ("60% imóveis MCMV usados") | 🟡 Médio | Pesquisar fonte externa pro 60% ou suavizar |
| 5 | `custo-de-vida-curitiba` | 2.817 | 11+ (DIEESE, IBGE, ANP, ANEEL, ANS, Prefeitura, AGEPAR, SEFA) | 1 trecho (preço m² por bairro) | 🟡 Médio | Substituir "dados internos FYMOOB" por FipeZap por bairro |
| 6 | `documentos-comprar-imovel-curitiba` | 2.331 | 7+ (Lei 7.433, Decreto 93.240, LGPD, CNJ 149/2023, AMEP) | 0 | 🟢 Mínimo | Atualizar links se vencidos |
| 7 | `ecoville-vs-bigorrilho-curitiba` | 2.075 | 9 (FipeZap, Secovi, SESP, INEP, IPPUC, Apto.vc, BemBrasil, Senior) | 1 trecho (composição) | 🟢 Baixo | Verificar "+17% Ecoville" referência Senior Index |
| 8 | `financiamento-caixa-itau-bradesco-comparativo` | 2.219 | 4 agregadores (Larya, MySide, SpImóvel, Calculadora Brasil) | 0 | 🟡 Alto | **Suavizar comparativos absolutos** ("BRB #2", "Bradesco a maior dos 5", "Inter pior do mercado") + adicionar fonte de market share Caixa |
| 9 | `imovel-planta-vs-pronto-curitiba` | 3.792 | 14+ (FGV, IBGE, FipeZap, ADEMI, Lei 13.786, Lei 10.931, NBR, STJ, casos TJ-PR) | 2 trechos (preço por bairro CRM) | 🟢 Baixo | Atualizar "20% mercado afetação" — pesquisar fonte (Abrainc?) |
| 10 | `itbi-curitiba-valor-como-pagar` | 2.154 | 8 (STJ, LC 108/2017, LC 137/2022, LC 150/2025, Decreto 421/2026, Prefeitura, TJ-PR, Migalhas) | 0 | 🟢 Mínimo | Verificar exemplos numéricos com casos reais |
| 11 | `melhores-bairros-curitiba-2026` | 1.595 | 6 (FipeZap, SESP-PR, INEP, IPPUC, Prefeitura, Secovi) | 0 (metodologia própria, não é fonte) | 🟡 Médio | Documentar pesos da metodologia + revisar "zero homicídios Cascatinha" (cita SESP) |
| 12 | `melhores-bairros-familias-curitiba` | 4.351 | 25+ (INEP, SESP, Pequeno Príncipe, SESA, Câmara CWB, Lei 16.492, FipeZap, MySide) | **32 trechos com CRM FYMOOB como fonte de preço** | 🔴 **Alto** | Reescrever passagens onde CRM FYMOOB é fonte primária de mediana/entrada por bairro × perfil — substituir por FipeZap + Quinto Andar Index quando disponível, ou marcar como "estimativa FYMOOB" |
| 13 | `mercado-imobiliario-curitiba-2026` | 2.211 | 7 (FipeZap, ADEMI, Sinduscon, BC, Abecip, CNC, UBS) | 1 trecho (rentabilidade aluguel por bairro) | 🟡 Médio | Atualizar "49,7% endividamento" → 49,9% fev/2026 + suavizar "rentabilidade que ninguém publica" (FYMOOB como única fonte) |
| 14 | `preco-metro-quadrado-curitiba-bairro` | 2.375 | 5 (FipeZap, Secovi, Quinto Andar, FGV INCC, IPCA) | 1 trecho (rentabilidade por bairro) | 🟢 Baixo | Tabela rentabilidade por bairro: marcar explicitamente como observação FYMOOB ou substituir |
| 15 | `quanto-custa-morar-batel-curitiba` | 2.472 | 10 (FipeZap, Prefeitura, Copel, Sanepar, ANP, Secovi-PR, Secovi-SP, DIEESE) | 1 trecho qualitativo ("família compra 80% Condor Gourmet") | 🟡 Médio | Suavizar afirmações qualitativas sem fonte; atualizar Decreto IPTU 2026 com número (2668/2025) |

**Total:** 15 artigos. **Distribuição de risco:** 8 baixo/mínimo, 5 médio, 2 alto.
**Tier C (alto risco):** apenas `melhores-bairros-familias-curitiba` (32 trechos com CRM FYMOOB) é dependência estrutural. Os demais são pontos cirúrgicos.

---

## 4. Auditoria por artigo

Para cada artigo: tese, claims a verificar, fontes existentes, pontos a pesquisar, recomendação.

### 4.1 `apartamento-ou-casa-curitiba`

**Tese:** 60% dos curitibanos ainda mora em casa, mas mercado caminha para vertical. Diferença casa×apto inverte por bairro.

**Claims que precisam atenção:**

| Claim | Estado |
|---|---|
| "59,3% casa / 40,5% apto em CWB (PNAD 2026)" | ✅ Citado Bem Paraná (Tier 2) — buscar link IBGE direto |
| "Apartamentos +96,79% em 22 anos" | ✅ Censo 2022 IBGE, link direto |
| "FipeZap mar/2026 R$ 11.621/m²" | ✅ MySide → FipeZap, OK |
| "49% dos brasileiros 22-28 querem comprar / 59% preferem [casa]" | ⚠️ Citado Imobi Press (Tier 4) — **buscar pesquisa original** (DataFolha? IBGE? Brain Inteligência?) |
| "67% das buscas em portais por apto até 70m²" | ✅ Inpespar/Radar, link direto |
| "R$ 587 condomínio mediano CWB" | ✅ Loft jan/2026 via Bem Paraná |
| "R$ 7,4 bi VGV apto novo 2025" | ✅ ADEMI-PR / Brain via Bem Paraná |
| "STJ pets em condomínio 2019" | ✅ REsp 1.783.076-DF, Inf. 649 STJ direto |
| **"CRM FYMOOB Portão casa +42%"** | 🟡 **Marcar como observação FYMOOB explicitamente** ou complementar com FipeZap por tipologia |
| "Aluguel CWB +10,98% 12m até dez/2025" | ✅ FipeZap Locação dez/2025, PDF direto |
| "+97% lançamentos casa em condomínio H1/2023" | ⚠️ Bem Paraná → ADEMI-PR. Buscar fonte ADEMI direta |

**Pontos a pesquisar:**

1. Pesquisa original sobre "49% jovens 22-28 querem comprar imóvel"  → buscar DataFolha 2025, Brain Inteligência, Suno Inteligência
2. ADEMI-PR pesquisa H1/2023 horizontais (link direto)

**Recomendação:** **Risco baixo.** O artigo cita CRM FYMOOB como complemento (3 trechos com n=X marcado), o que é aceitável. Substituir o "Pesquisa nacional de 2025" (sem nome) pela fonte real; resto fica como está.

---

### 4.2 `batel-vs-agua-verde-curitiba`

**Tese:** Batel ganha em prestígio/valorização nominal, Água Verde ganha em renda/liquidez/preço.

**Claims:**

| Claim | Estado |
|---|---|
| "Batel R$ 17.924/m² vs Água Verde R$ 12.178" | ✅ FipeZap |
| "Valorização Batel +6,5%, AV +4,6%" | ✅ FipeZap |
| "Rentabilidade aluguel ~2% Batel / ~3% AV" | 🟡 Calculado a partir Secovi-PR + FipeZap (transparente) |
| "Tempo médio pra vender 6-9m vs 3-6m" | 🟡 **Observação qualitativa FYMOOB** — marcar |
| "Lei Complementar 16.361/2024 (gabarito 10 andares)" | ✅ Câmara CWB, link |
| "Água Verde top 4 crime patrimonial absoluto H1/2025" | ⚠️ Citado SESP-PR mas **link aponta para portal genérico** — adicionar Radar Gazeta do Povo direto |
| "Vita Água Verde, Pilar dentro do bairro" | ✅ Hospitais públicos, verificável |
| "Composição estoque FYMOOB: 50%+ Batel >150m²" | 🟡 **Dado FYMOOB** — manter mas marcar explicitamente |

**Pontos a pesquisar:**

1. Tempo médio de venda por bairro CWB (Secovi-PR? ZAP? Quinto Andar?)
2. Estatística oficial SESP-PR top crime patrimonial por bairro (link direto se publicar)

**Recomendação:** **Risco baixo.** Adicionar 1-2 fontes para reforçar e marcar dados FYMOOB como observação. Composição de carteira FYMOOB é dado interno legítimo se descrito como tal.

---

### 4.3 `checklist-compra-imovel`

**Tese:** 25 itens em 5 fases podem evitar R$ 80 mil em prejuízo.

**Claims:**

| Claim | Estado |
|---|---|
| "R$ 80 mil em prejuízo médio" | 🟡 **Compositiva FYMOOB** — mostra a soma (avg + condomínio + ITBI + reforma) mas não cita fonte de "comprador médio" |
| "Averbação pendente desvaloriza 20-40%" | ⚠️ **Sem fonte** — buscar pesquisa Abecip ou IRIB |
| "Custo regularizar averbação R$ 25-45 mil" | 🟡 Faixa de mercado — adicionar fonte (cartório, advogado) |
| "STJ REsp 1.345.331/RS dívida propter rem" | ✅ Link STJ direto |
| "STJ Tema 1113 ITBI" | ✅ Direto |
| "Resolução CMN 4.676/2018" | ✅ BCB direto |
| "Lei 6.015/1973 averbação" | ✅ Planalto direto |
| "Custos fechamento 4,5-6%" | 🟡 Calculado (ITBI 2,7 + registro 1 + emolumentos + advogado). Justificável |
| "11 certidões necessárias" | ✅ Lei 7.433/1985 + práticas notariais |

**Pontos a pesquisar:**

1. Estatística "averbação pendente desvaloriza X%" → pesquisar IRIB, Anoreg, ABRAINC
2. Custo médio regularizar averbação → pesquisar ABNT 13.351 / cartórios CWB
3. "Comprador médio perde R$ 80 mil" → este número é compositivo do próprio post; deveria ser reformulado: "esses 3 erros podem somar até R$ 80 mil"

**Recomendação:** **Risco baixo, mas a manchete merece ajuste.** "R$ 80 mil em prejuízo" no title funciona como gancho, mas no corpo deveria ser "podem somar até R$ 80 mil" (não "perdem R$ 80 mil em média"). Suavizar essa única frase.

---

### 4.4 `como-financiar-minha-casa-minha-vida`

**Tese:** MCMV ampliado em 22/04/2026 — Faixa 4 vai a R$ 13 mil renda / R$ 600 mil imóvel.

**Claims:**

| Claim | Estado |
|---|---|
| "87,5 mil famílias beneficiadas" | ✅ Min. Cidades (citar link direto) |
| "Faixas 1-4 com novos tetos" | ✅ Citado mas sem link específico — adicionar [portaria oficial Min. Cidades 21/04/2026](https://www.gov.br/cidades/pt-br/) |
| "Caixa única que opera Faixa 4 ampliada" | ⚠️ Sem fonte — **verificar com BB e CEF oficial em maio/2026** |
| "60% imóveis MCMV em CWB são usados" | 🟡 **Sem fonte aparente** |
| "4 em 10 candidatos reprovados por CadÚnico desatualizado" | ⚠️ "Segundo dados de cartórios de Curitiba" — sem fonte |
| "200+ financiamentos MCMV acompanhados" | 🟡 Dado interno FYMOOB — manter como prova de experiência |

**Pontos a pesquisar:**

1. Min. Cidades — Portaria/Decreto MCMV 22/04/2026 (linkar oficialmente)
2. Caixa + BB — Comunicado oficial sobre operação Faixa 4 ampliada
3. Estatística "60% MCMV em CWB são usados" → buscar Caixa Habitação CWB, ADEMI, CRECI-PR
4. CadÚnico "4 em 10 reprovados" → buscar pesquisa Min. Cidades ou IBGE

**Recomendação:** **Risco médio.** Adicionar links oficiais (Portaria Min. Cidades) é o passo 1. Os 2 dados sem fonte ("60% usados" e "4 em 10 CadÚnico") devem ser **suavizados** ("a maioria dos imóveis MCMV em CWB são usados"; "uma parte significativa dos candidatos é reprovada por CadÚnico desatualizado") até confirmar fonte.

---

### 4.5 `custo-de-vida-curitiba`

**Tese:** R$ 3.200 a R$ 22.000/mês conforme perfil. CWB é 12,9% mais barata que SP em alimentação.

**Claims:**

| Claim | Estado |
|---|---|
| "Cesta DIEESE-CWB R$ 769,61 mar/2026 / -12,9% vs SP R$ 883,94" | ✅ DIEESE/CONAB-PR via Corecon-PR |
| "Tarifa URBS R$ 6,00 desde 2023" | ✅ Prefeitura CWB |
| "IPVA-PR 1,9% (Lei 21.951/2024)" | ✅ SEFA-PR |
| "Gasolina R$ 6,29-7,19/L abr/2026" | ✅ ANP Síntese Semanal |
| "Tarifa Copel R$ 0,64/kWh atual; CP 005/2026 propõe +19,2%" | ✅ ANEEL link direto |
| "Cesta DIEESE outras capitais (SP, RJ, FLN, POA)" | ✅ DIEESE |
| "P13 R$ 109,99 CWB" | ✅ Mercado |
| "ANS reajuste 6,06% planos individuais" | ✅ ANS link direto |
| "PNAD 3T/2025 renda PR R$ 4.000+" | ✅ IBGE |
| **"4x variação m² entre bairro mais barato e mais caro, segundo dados internos FYMOOB"** | 🔴 **PROBLEMA** — substituir por FipeZap por bairro |
| **"Campina do Siqueira R$ 20.574/m² e Batel R$ 20.271 abrem ranking"** | 🔴 **Conflita com outros artigos** que dão Batel R$ 17.924 (FipeZap). Verificar coerência interna |
| "IPS 2025 — Curitiba 1ª" | ✅ Prefeitura/IPS oficial |
| "CWB 6ª capital mais cara (Numbeo)" | ⚠️ Numbeo é Tier 4 — admitido no texto, OK |

**Pontos a pesquisar:**

1. **CRÍTICO:** consolidar números FipeZap por bairro CWB (a tabela do post 14 já tem esses dados — usar como fonte interna do site)
2. ENEM/IDEB top escolas CWB (linkar)

**Recomendação:** **Risco médio.** A frase "segundo dados internos da FYMOOB em abril/2026" precisa ser substituída por FipeZap. **Conflito interno**: o número R$ 20.574/m² Campina do Siqueira aqui não bate com R$ 14.062/m² no artigo `preco-metro-quadrado-curitiba-bairro`. Padronizar — usar o número FipeZap (R$ 14.062), descartar o "20.574 dados internos".

---

### 4.6 `documentos-comprar-imovel-curitiba`

**Tese:** 18+ documentos por 5 órgãos. Certidão Negativa de Imóveis da Prefeitura é a que trava escritura.

**Claims:** Quase tudo é citação de lei e órgão oficial.

| Claim | Estado |
|---|---|
| "9 Ofícios de Registro CWB" | ✅ AMEP link direto |
| "Decreto 93.240/1986 — validade 30 dias" | ✅ Planalto |
| "Lei 7.433/1985 — escritura pública obrigatória" | ✅ Planalto |
| "LGPD Lei 13.709/2018" | ✅ Planalto |
| "Provimento CNJ 149/2023 — e-Notariado" | ✅ CNJ direto |
| "Receita Federal — CND unificada" | ✅ Site oficial |
| "Tabela emolumentos TJ-PR" | ✅ Link |
| "Curitiba não tem laudêmio" | ✅ Verificável (interior, sem terreno marinha) |

**Pontos a pesquisar:** Nenhum crítico. Verificar links periodicamente.

**Recomendação:** **Risco mínimo.** Artigo é referência jurídica. Manutenção periódica.

---

### 4.7 `ecoville-vs-bigorrilho-curitiba`

**Tese:** Ecoville tem 3 mercados (apto usado, apto novo, casa em condomínio). Comparar com Bigorrilho exige escolher segmento.

**Claims:**

| Claim | Estado |
|---|---|
| "Ecoville apto usado R$ 9.430 (Senior Index)" | ⚠️ Tier 3 — verificar se Senior Index é fonte sólida |
| "Apto novo R$ 16.863 (apto.vc + BemBrasil)" | 🟡 Compiladores Tier 2-3 |
| "Casa em condomínio R$ 16.800-25.000 (CRM alto padrão)" | 🟡 **Marcar como faixa observada FYMOOB** |
| "Bigorrilho R$ 14.117 FipeZap mar/2026" | ✅ FipeZap |
| "Mossunguê = Ecoville oficialmente IPPUC" | ✅ IPPUC |
| "Internacional Everest #5 ENEM 2024 (675,93)" | ✅ INEP |
| "Mossunguê zero homicídios jan-set/2025" | 🟡 SESP-PR via Radar Gazeta — link direto Radar |
| "+17% Ecoville em 2024 (Senior Index)" | ⚠️ **Suavizar** — Senior Index é 2024, não 2026; admitido no texto, mas reforçar |
| "Universidade Positivo no Campo Comprido (não Ecoville)" | ✅ Verificável IPPUC |
| "Não existe migração Bigorrilho→Ecoville (vs +12,5% Ahú)" | ✅ FipeZap como prova |

**Pontos a pesquisar:**

1. Senior Index — qual a metodologia? É replicável? Fonte primária ou agregador?
2. Apto.vc — é fonte primária ou compilador?

**Recomendação:** **Risco baixo.** Já é honesto sobre limitação dos dados (Ecoville fragmentado, FipeZap não cobre, fonte por tipologia). Reforçar o disclaimer no início do post.

---

### 4.8 `financiamento-caixa-itau-bradesco-comparativo`

**Tese:** Ranking dos 5 bancos por taxa nominal e CET. BRB é a 2ª menor taxa observada.

**Claims:**

| Claim | Estado |
|---|---|
| "Taxas Caixa 11,19%, BRB 11,36%, Itaú 11,60%, Santander 11,69%, Bradesco 11,70%" | ✅ Verificadas em Larya, MySide, SpImóvel + sites oficiais |
| "Caixa Pró-Cotista 8,66%" | ✅ Caixa oficial |
| **"BRB virou nacional em 2026"** | ✅ Texto já atualizado — "aparece como 2ª menor taxa nominal" |
| **"Bradesco — a maior dos 5 grandes bancos"** | 🟡 Faltou ajustar — **trocar para "a maior taxa entre os 5 que comparamos"** |
| **"Inter (pior taxa do mercado) 13,76%"** | 🟡 Faltou ajustar — **trocar para "a pior das taxas que comparamos"** |
| "Caixa principal banco do financiamento habitacional" | ✅ Já suavizado pós feedback GPT |
| "Itaú um dos bancos privados com processo digital mais forte" | ✅ Já suavizado |
| "CET Caixa 12,39%, Santander 13,18%, Itaú 14,31%" | ✅ SpImóvel direto |
| "Resolução CMN 4.881/2020 (CET)" | ✅ BCB |
| "Selic 14,75% desde 18/03/2026" | ✅ BCB |

**Pontos a pesquisar:**

1. Mudança "a maior dos 5 grandes bancos" → "a maior entre as 5 taxas que comparamos em abril/2026"
2. Mudança "Inter pior taxa do mercado" → "Inter — a pior taxa entre 5 grandes que comparamos"
3. **Adicionar:** Caixa market share **67,1% no 3T 2025** (fonte: relatórios trimestrais Caixa) — substitui "domina ~70%"

**Recomendação:** **Risco médio (priorizado).** Já houve melhoria após feedback do GPT. Faltam 2-3 ajustes finais. Aplicar e fechar.

---

### 4.9 `imovel-planta-vs-pronto-curitiba`

**Tese:** A regra "planta -15% a -25%" não vale para CWB. Diferença varia -15% a +24% por bairro.

**Claims:**

| Claim | Estado |
|---|---|
| "INCC-DI 5,86% acum 12m mar/2026" | ✅ FGV/IBRE Brasil Indicadores + Portal FGV |
| "IPCA 4,14% acum 12m" | ✅ IBGE |
| "ADEMI-PR — VGV R$ 7,4 bi 2025" | ✅ ADEMI link direto |
| "Lei 13.786/2018 — Distrato" | ✅ Planalto |
| "Lei 10.931/2004 — Patrimônio de afetação" | ✅ Planalto |
| "STJ Súmula 543" | ✅ STJ |
| "ABNT NBR 17170:2022" | ✅ Link |
| "STJ 3ª Turma vs 4ª Turma sobre teto distrato (set-out/2025)" | ✅ Conjur |
| "Caso Calbente TJ-PR ago/2025" | ✅ Jusbrasil link |
| "InfoMoney — 80% RJ infra é construção 1T/2025" | ✅ link |
| **"Patrimônio de afetação ~20% do mercado"** | 🟡 **Sem fonte clara** — buscar Abrainc ou IRIB |
| **"Diferença planta×pronto por bairro CRM FYMOOB n≥3"** | 🟡 **Marcar explicitamente como FYMOOB** (o post já marca em parte) |
| "5 passos para verificar construtora" | 🟡 Metodologia FYMOOB — manter |
| "LC 150/2025 + Decreto 421/2026" | ✅ Links |

**Pontos a pesquisar:**

1. **Estatística adesão patrimônio de afetação** → Abrainc, IRIB, BACEN. Buscar dado oficial.

**Recomendação:** **Risco baixo.** Artigo é exemplo de fundamentação forte. Único ajuste: encontrar fonte para "20% adesão afetação" ou suavizar para "adesão é minoritária no mercado".

---

### 4.10 `itbi-curitiba-valor-como-pagar`

**Tese:** ITBI Curitiba 2,7%, mas Prefeitura cobra sobre venal inflado. STJ Tema 1113 dá direito de reaver.

**Claims:** Quase tudo é jurídico/oficial.

| Claim | Estado |
|---|---|
| "Alíquota 2,7% LC 108/2017" | ✅ LegisWeb |
| "STJ Tema 1113 mar/2022" | ✅ STJ link direto |
| "REsp 1.937.821/SP" | ✅ Migalhas |
| "LC 137/2022 — contratos de gaveta" | ✅ Prefeitura |
| "LC 150/2025 + Decreto 421/2026 — Curitiba de Volta ao Centro" | ✅ Boletim ProLik |
| "TJ-PR julga procedente repetição R$ 10.214 out/2025" | ✅ Jusbrasil link |
| "Curitiba uma das menores alíquotas do país (vs SP, RJ, BH, POA 3%)" | 🟡 **Adicionar:** SP 3%, RJ 3%, FLN 2% — verificar com decreto/lei municipal de cada |
| "PLP 108/2024 dezembro 2025" | ✅ Câmara dos Deputados |
| "Reforma Tributária EC 132/2023 não muda ITBI" | ✅ Conjur |

**Pontos a pesquisar:**

1. Verificar alíquotas ITBI das outras capitais citadas (SP 3% em LC, RJ 3% em LC, BH 3%, POA 3%, FLN 2%)

**Recomendação:** **Risco mínimo.** Artigo é referência jurídica sólida. Validar comparativo de alíquotas das outras capitais.

---

### 4.11 `melhores-bairros-curitiba-2026`

**Tese:** Ranking multi-critério (segurança + educação + infra + preço) com pesos abertos. Ahú lidera no peso igual.

**Claims:**

| Claim | Estado |
|---|---|
| "Pontuação 0-20 em 4 critérios, peso igual" | ✅ Metodologia descrita |
| "Ahú zero homicídios 2025 (SESP-PR via iLove/MySide)" | 🟡 Admitido que SESP não publica por bairro — agregação |
| "Ahú +12,5% 12m FipeZap" | ✅ FipeZap |
| "Bom Jesus Divina Providência #2 ENEM 2024" | ✅ INEP via Bom Jesus oficial |
| "Pequeno Príncipe maior pediátrico Brasil" | ⚠️ Reformular: "maior hospital exclusivamente pediátrico" (verificável via site oficial) |
| "Lei Complementar 16.361/2024" | ✅ Câmara CWB |
| "Cascatinha zero homicídios H1/2025" | 🟡 SESP-PR agregado — admitir limitação |

**Pontos a pesquisar:**

1. ENEM 2024 — top 10 escolas CWB (lista completa cruzada com endereço)
2. Hospital Pequeno Príncipe — confirmar "maior hospital exclusivamente pediátrico do Brasil" (linkar página oficial)
3. SESP-PR — boletim oficial mais recente sobre homicídios por bairro

**Recomendação:** **Risco médio.** Metodologia transparente, mas as pontuações de 0-20 são autorias FYMOOB sem origem documentada. Adicionar nota: "pontuação é avaliação editorial FYMOOB com base nas fontes citadas; transparência da metodologia permite recálculo com pesos diferentes".

---

### 4.12 `melhores-bairros-familias-curitiba` 🔴

**Tese:** 10 melhores bairros para família com 5 critérios (segurança, educação, saúde, lazer, custo).

**Status:** **Artigo de maior dependência de CRM FYMOOB.** 32 trechos com mediana, valor de entrada, n amostral por bairro × perfil família vindo do nosso CRM. Sem CRM, perde a estrutura de "valor de entrada R$ 779 mil pra sobrado 3D/1V/120m² em Portão" — esse tipo de granularidade não existe em fonte pública.

**Estratégia recomendada:** REESCREVER a estrutura mantendo a tese, substituindo afirmações de mediana CRM por:

1. **Onde FipeZap cobre (m² por bairro):** usar FipeZap como referência de R$/m².
2. **Onde Quinto Andar Index cobre (aluguel padronizado):** usar como complemento.
3. **Onde só CRM FYMOOB tem dado granular** (ex: "sobrado 3D/1V/120m² em Portão entrada R$ 779 mil"): **reformular** como "sobrados 3D padrão familiar em Portão começam em torno de R$ 700-900 mil em abril/2026, conforme estoque ativo do mercado". Sem mencionar CRM, sem mediana exata, sem n.

**Pontos a pesquisar:**

1. **MAJOR:** Quinto Andar Index — aluguel padronizado por bairro CWB
2. ZAP / Imovelweb — busca padronizada por tipologia × bairro
3. Loft / Apto.vc — agregadores que compartilham mediana por bairro

**Recomendação:** **Risco alto, ação cirúrgica em ~32 trechos.** Em vez de reescrever do zero, vou:
- Identificar cada trecho FYMOOB-only no doc atual
- Pra cada um, sugerir: (a) "estimativa de mercado em abril/2026" sem número exato, OU (b) substituição por FipeZap quando disponível, OU (c) marcar explicitamente "observação FYMOOB com amostra X" se mantém número

Esse trabalho merece sessão dedicada. **Sugiro adiar até próxima sprint** — após corrigir os 5 médios, voltar pra esse com calma.

---

### 4.13 `mercado-imobiliario-curitiba-2026`

**Tese:** CWB +17,86% em 2025 (2ª capital), Ahú passa Batel, mas endividamento bate recorde — leitura realista.

**Claims:**

| Claim | Estado |
|---|---|
| "FipeZap CWB +17,86% 2025" | ✅ FipeZap |
| "Ahú +12,5%, Juvevê +11,5% 12m" | ✅ FipeZap |
| **"Endividamento famílias 49,7% — recorde absoluto BC"** | 🔴 **Atualizar para 49,9% fev/2026** (Banco Central, série iniciada em 2005) |
| "SBPE em resgate 14 meses (Abecip)" | ✅ Abecip link |
| "Lei 16.361/2024 (gabarito Batel)" | ✅ Câmara CWB |
| "Selic 14,75% desde 18/03/2026" | ✅ BCB |
| "ADEMI-PR — VGV R$ 7,4 bi" | ✅ |
| "Estoque ~13 meses de venda" | ✅ ADEMI-PR |
| "UBS Global Real Estate Bubble Index" | 🟡 Citado mas sem link específico — adicionar |
| **"Aluguel rende 0,40-0,48% Centro/Portão/AV — fechamentos FYMOOB"** | 🟡 **Marcar explicitamente** que é observação FYMOOB; complementar com FipeZap Locação onde disponível |
| "Dados FYMOOB CRM" | 🟡 1 trecho — substituir por "dados que acompanhamos no nosso atendimento" |

**Pontos a pesquisar:**

1. **Atualizar 49,7% → 49,9% fev/2026 com fonte BC**
2. UBS — pegar o relatório 2025 e linkar
3. FipeZap Locação rentabilidade por bairro CWB (se publicar)

**Recomendação:** **Risco médio.** Atualização do número 49,7→49,9 é a mais urgente. Outras correções são de marcação de fonte.

---

### 4.14 `preco-metro-quadrado-curitiba-bairro`

**Tese:** Ranking 30 bairros por m² + variação 12m. Ahú é o ponto ideal de 2026.

**Claims:**

| Claim | Estado |
|---|---|
| "FipeZap mar/2026 m² médio CWB R$ 11.621 (+6,26% 12m)" | ✅ |
| "Tabela 30 bairros com m² + variação" | ✅ FipeZap |
| "BRT Leste-Oeste edital março 2026" | ⚠️ **Adicionar fonte** — Prefeitura/URBS |
| "Lei 16.361/2024" | ✅ |
| "Programa Curitiba de Volta ao Centro" | ✅ Boletim ProLik |
| "Loft relatório Q4 — Campo Comprido +23%" | ✅ Loft |
| "Secovi-PR julho/2025 — m² aluguel por bairro" | ✅ |
| **"Rentabilidade aluguel por bairro CIC, Campo de Santana, Tatuquara, Xaxim — fechamentos FYMOOB com n"** | 🟡 **Marcar explicitamente como FYMOOB** + ressalva "use como indicativo, não regra" (já tem) |

**Pontos a pesquisar:**

1. URBS — edital BRT Leste-Oeste link oficial
2. FipeZap Locação por bairro (se tiver granularidade)

**Recomendação:** **Risco baixo.** Artigo já é honesto sobre limitação. Pequena adição de link (BRT) e fortalecer marcação FYMOOB onde aparece.

---

### 4.15 `quanto-custa-morar-batel-curitiba`

**Tese:** Custo total de morar no Batel em 3 perfis (R$ 7.600 / R$ 22.500 / R$ 44.000). Comparativo com Pinheiros SP.

**Claims:**

| Claim | Estado |
|---|---|
| "Batel R$ 17.924/m² FipeZap" | ✅ |
| "Pinheiros R$ 18.307, Itaim R$ 19.500-21.000, Jardins R$ 17.354, Moema R$ 16.106" | ✅ FipeZap |
| **"Família compra 80% do mercado num Condor Gourmet"** | 🔴 **Sem fonte — qualitativo** — **suavizar para "família com 2-3 filhos faz a maior parte das compras em supermercado de bairro de alto padrão"** |
| "Lei Complementar 16.361/2024" | ✅ |
| **"Decreto IPTU 80% imóveis correção IPCA"** | 🟡 **Adicionar Decreto 2668/2025** com data 19/12/2025 |
| "ANP gás+combustível, Copel, Sanepar, DIEESE-PR" | ✅ Cadeia de fontes |
| "Comparativo SP — custo casal R$ 22.500 vs R$ 34.800 (54%)" | 🟡 **Estimativa FYMOOB** — adicionar nota "comparativo construído a partir de FipeZap, Secovi-SP e custos médios de cada cidade" |
| "Pequeno Príncipe a 6 km" | ✅ |
| "Lei 13.786/2018" | ✅ |
| "Catálogo FYMOOB" | ⚠️ Mudar para "ver imóveis disponíveis no Batel" sem citar FYMOOB como autoridade |

**Pontos a pesquisar:**

1. **Decreto IPTU 2668/2025** — atualizar referência (já encontrei a fonte: Prefeitura CWB)
2. Custos por rubrica em Pinheiros/SP — Secovi-SP, FipeZap Locação SP

**Recomendação:** **Risco médio.** 2 ajustes pontuais: (1) suavizar "80% Condor Gourmet" qualitativo, (2) adicionar Decreto 2668/2025.

---

## 5. Pontos a pesquisar externamente

Lista consolidada de gaps, ordenados por prioridade (impacto × dificuldade).

### Tier 1 — Verificáveis em <30 minutos

1. **Banco Central** — endividamento famílias 49,9% fev/2026 (atualizar de 49,7%)
2. **Prefeitura CWB** — Decreto 2668/2025 (IPTU 80% IPCA) link direto
3. **Hospital Pequeno Príncipe** — confirmar "maior hospital exclusivamente pediátrico do Brasil" via site oficial
4. **Caixa Econômica Federal** — market share oficial 67,1% 3T 2025
5. **STJ** — REsp 1.345.331/RS dívida propter rem (link direto STJ se houver)
6. **Min. Cidades** — Portaria MCMV 21-22/04/2026 link oficial
7. **Câmara dos Deputados** — PLP 108/2024 status atual

### Tier 2 — Verificáveis em <2 horas

8. Pesquisa "49% jovens 22-28 querem comprar / 59% preferem casa" — qual estudo?
9. ADEMI-PR pesquisa horizontais H1/2023 (link direto, não via Bem Paraná)
10. Fonte para "averbação pendente desvaloriza 20-40%" — IRIB ou Anoreg
11. Fonte para "60% imóveis MCMV em CWB são usados" — Caixa Habitação ou ADEMI
12. Adesão patrimônio de afetação no Brasil — Abrainc, BACEN
13. Comparativo alíquota ITBI entre capitais (SP, RJ, BH, POA, FLN) — leis municipais
14. URBS — edital BRT Leste-Oeste link oficial

### Tier 3 — Pesquisas mais profundas (>2 horas)

15. Quinto Andar Index — aluguel padronizado por bairro CWB (todos os bairros do post 12)
16. SESP-PR — estatística homicídios por bairro CWB (verificar se publica)
17. Senior Index — qual a metodologia?
18. UBS Global Real Estate Bubble Index 2025 — relatório completo
19. FipeZap Locação rentabilidade por bairro CWB (granularidade)

---

## 6. Próximos passos — fluxo de revisão

### Sprint A — Quick wins (1-2 horas total)

Aplicar correções pontuais nos artigos **🟡 médio** com fontes que já encontrei ou são fáceis de validar:

1. **`mercado-imobiliario-curitiba-2026`** — atualizar "49,7%" → "49,9% fev/2026" + link BC
2. **`quanto-custa-morar-batel-curitiba`** — suavizar "80% Condor Gourmet" + Decreto 2668/2025
3. **`custo-de-vida-curitiba`** — substituir "dados internos FYMOOB" pela tabela FipeZap (do post 14, fonte interna do site)
4. **`financiamento-caixa-itau-bradesco-comparativo`** — finalizar 2-3 ajustes (Bradesco "a maior", Inter "pior do mercado")
5. **`melhores-bairros-curitiba-2026`** — ajustar "Pequeno Príncipe maior pediátrico" → "maior exclusivamente pediátrico"

**Tempo total:** ~2 horas de pesquisa + edição via SQL idempotente. **Custo:** baixo. **Impacto:** elimina 7-9 claims arriscadas.

### Sprint B — Pesquisa profunda dos Tier 2 (~1 dia)

Pesquisar via WebSearch/sites oficiais os 7 pontos do Tier 2 da seção 5. Atualizar:

- `apartamento-ou-casa-curitiba` (49% jovens, +97% horizontais)
- `como-financiar-minha-casa-minha-vida` (60% MCMV usados, CadÚnico)
- `checklist-compra-imovel` (averbação 20-40%)
- `imovel-planta-vs-pronto-curitiba` (20% afetação)
- `itbi-curitiba-valor-como-pagar` (alíquotas outras capitais)

### Sprint C — Reescrita parcial de `melhores-bairros-familias-curitiba` (~2-3 dias)

O artigo de maior dependência. Estratégia em 3 passos:

1. **Listar os 32 trechos** com CRM FYMOOB (já temos via [docs/audit/fymoob-citations-2026-05-02.md](../audit/fymoob-citations-2026-05-02.md))
2. **Para cada um, decidir:**
   - Substituível por FipeZap → trocar
   - Substituível por Quinto Andar / outro Tier 1-2 → trocar
   - Sem substituto público → suavizar (sem n, sem mediana exata, sem citação de CRM)
   - Mantém FYMOOB → marcar explicitamente "estimativa do mercado observado pela FYMOOB"
3. **Aplicar via SQL** (script idempotente)

### Sprint D — Pesquisas Tier 3 (longo prazo)

Pesquisas que valem mas não são bloqueantes. Adiantar quando houver tempo.

---

## 7. Compromisso editorial

A partir desta revisão, todo artigo novo do FYMOOB segue:

1. **Cada número factual tem fonte externa** (Tier 1-2) linkada inline.
2. **Comparativos entre marcas** descrevem a comparação ("nas taxas que comparamos em abril/2026"), não atribuem posição absoluta ("BRB #2 nacional").
3. **Dados FYMOOB** aparecem como cor local explícita ("estoque ativo da FYMOOB", "captações recentes do nosso portfólio"), nunca como autoridade.
4. **Datas explícitas** em todo dado dinâmico (preço, taxa, índice).
5. **Methodology box** descreve período, fontes (com tier), tratamento, atualização. Já está implementado nos artigos novos via Methodology block — manter.

---

**Próxima ação:** confirmar com Vinicius qual sprint começar primeiro.
- Sugestão: **Sprint A esta semana** (2h, alto ROI, valida fluxo).
- Em paralelo, planejar Sprint B nos próximos 7 dias.
- Sprint C (post de famílias) na semana seguinte, com calma.

Documento atualizado em **2026-05-02** — revisão programada após cada sprint.
