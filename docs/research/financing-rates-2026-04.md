# Validacao de Dados: Financiamento Imobiliario Abril 2026

**Ultima validacao:** 23/04/2026
**Validado por:** Claude Agent SDK (Opus 4.7) — cruzamento de 3+ fontes por fato critico
**Escopo:** 5 bancos (Caixa, BRB, Itau, Santander, Bradesco) + MCMV 2026 + contexto macro
**Fonte de dados primaria:** sites oficiais dos bancos + gov.br + Larya, MySide, SpImovel, InfoMoney, Exame, ISTOE Dinheiro

---

## 1. Taxas oficiais (balcao) — Abril 2026

| Banco | Taxa a.a. + TR | Prazo max | Max financ. | Aprovacao | CET exemplo | Fontes |
|-------|----------------|-----------|-------------|-----------|-------------|--------|
| **Caixa** | **11,19%** (balcao) / 10,26% (preferencial com relacionamento) | 420 meses (35 anos) | 80% (SBPE) | Total 61 dias uteis (pre-aprov. rapida, vistoria demora) | ~12,39% (SAC/TR) | [1][2][3][4] |
| **BRB** | **11,36%** | 420 meses (35 anos) | 80% | 20-30 dias | nd | [1][2][5] |
| **Itau** | **11,60%** (balcao, a partir de) | 420 meses (35 anos) | 90% | Pre-aprov. ~1h no app, total ~35 dias uteis | ~14,31% (SAC/TR) | [1][2][6] |
| **Santander** | **11,69%** (balcao, a partir de) | 420 meses (35 anos) | 80% | 30-45 dias | ~13,18% a 13,35% (varia com entrada) | [1][2][7] |
| **Bradesco** | **11,70%** (balcao) | 420 meses (35 anos) | 80% | ~45 dias uteis (pre-aprov. 48h) | nd | [1][2][8] |
| Inter (fora top 5, mas usado como "pior taxa") | 13,76% | 360 meses (30 anos) | 75% | Digital | nd | [1] |

**Observacoes criticas:**
- Todas as taxas sao "**a partir de**" — variam conforme perfil, relacionamento, idade, prazo, uso de FGTS. Nao garantir ao leitor que vai conseguir a menor.
- Caixa tem **duas taxas publicadas**: balcao (11,19%) e preferencial (10,26% com debito automatico + salario + produto adicional). Citar ambas e explicar.
- Itau historicamente financiava ate 80%, mas em 2026 **anuncia ate 90%** (confirmar com cliente se quer destacar — eh vantagem competitiva real vs Caixa).
- O artigo original afirmava **30 anos para Itau e Bradesco**. Isto **esta DESATUALIZADO**: ambos hoje oferecem **35 anos (420 meses)**.

---

## 2. Links oficiais (autoridade para citar no post)

| Banco | URL oficial | O que mostra |
|-------|------------|--------------|
| Caixa | https://www.caixa.gov.br/voce/habitacao/Paginas/default.aspx (redireciona — usar: https://www8.caixa.gov.br/siopiinternet-web/ para simulador) | Portal Habitacao + Simulador SIOPI |
| Caixa PDF CET | https://www.caixa.gov.br/Downloads/credito-cet/FORMULA_PARA_CALCULO_CET.pdf | Formula oficial do CET |
| BRB | https://portal.brb.com.br/ (produto: Financiamento Imobiliario) | — |
| Itau | https://www.itau.com.br/emprestimos-financiamentos/credito-imobiliario | Pagina produto com simulador |
| Itau Uniclass | https://www.itau.com.br/uniclass/credito-imobiliario | — |
| Santander | https://www.santander.com.br/banco/credito-financiamento-imobiliario/ | Pagina produto (bloqueou WebFetch em 403 — validar manualmente) |
| Bradesco | https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/imoveis/credito-imobiliario-aquisicao-de-imoveis.shtm | Oficial: confirma 80%, ate 35 anos, parcelas a partir de R$ 200 |

**Alerta:** nenhum banco mostra a taxa de juros publicamente na pagina do produto — apenas condicoes gerais e simulador. A taxa exata sempre aparece na simulacao ou na tabela do CET apos cadastro. Por isso precisamos das fontes secundarias (Larya, MySide, etc) que compilam as informacoes.

---

## 3. MCMV 2026 — Novas regras (em vigor desde 22/04/2026)

Confirmado por **3 fontes independentes**, incluindo gov.br (primaria).

### Faixas de renda e teto do imovel

| Faixa | Renda familiar (novo) | Renda (anterior) | Teto imovel (novo) | Teto (anterior) |
|-------|----------------------|------------------|--------------------|-----------------|
| 1 | ate R$ 3.200 | ate R$ 2.850 | R$ 210 mil a R$ 275 mil | — |
| 2 | R$ 3.200,01 a R$ 5.000 | ate R$ 4.700 | R$ 210 mil a R$ 275 mil | — |
| 3 | R$ 5.000,01 a R$ 9.600 | ate R$ 8.600 | R$ 400 mil | R$ 350 mil |
| 4 | R$ 9.600,01 a R$ 13.000 | ate R$ 12.000 | **R$ 600 mil** | R$ 500 mil |

**Fonte primaria:** [Gov.br / Ministerio das Cidades, 22/04/2026](https://www.gov.br/cidades/pt-br/assuntos/noticias-1/noticia-mcid-n-2111) — confirmado.

### Taxas de juros MCMV 2026

| Faixa | Taxa FGTS | Taxa nao-FGTS | Observacao |
|-------|-----------|---------------|------------|
| 1 (Norte/Nordeste) | 4,00% a 4,25% a.a. | 4,50% a 4,75% a.a. | Subsidios regionais |
| 1 (Sul/Sudeste/CO) | 4,25% a 4,50% a.a. | 4,75% a 5,00% a.a. | — |
| 2 (Norte/Nordeste) | 4,75% a 6,50% a.a. | 5,25% a 7,00% a.a. | — |
| 2 (Sul/Sudeste/CO) | 5,00% a 6,50% a.a. | 5,50% a 7,00% a.a. | — |
| 3 | **7,66% a.a.** (FGTS) | 8,16% a.a. (nao-FGTS) | Nacional, sem diferenca regional |
| 4 | **~10,50% a.a.** | 10,50% a.a. | Nacional, **sem subsidio** |

**Fonte:** [Tenda / MCMV 2026](https://www.tenda.com/blog/minha-casa-minha-vida/entenda-a-taxa-de-juros-do-minha-casa-minha-vida), [Central Financas](https://centralfinancas.com/mcmv-taxa-juros-financiamento/), [ISTOE Dinheiro](https://istoedinheiro.com.br/mcmv-limites-taxas-juros).

**Importante para o post:** Faixa 4 eh efetivamente "SBPE levemente subsidiado" (10,5%) — se o comprador consegue SBPE Caixa a 10,26% preferencial com relacionamento, pode ate ser MELHOR que Faixa 4 de MCMV. Nao dar a entender que Faixa 4 sempre compensa.

### Sobre a Faixa 4 — ALERTA YMYL

**Confirmado:** a Faixa 4 **nao eh nova** — foi **ampliada** (limites de renda e teto elevados) em 22/04/2026.
**Nao confundir** com a criacao original (que foi anunciada antes, em 2025).
O post anterior do blog ja foi corrigido nesse ponto (ver commit `6e01e67`).

---

## 4. CET — Como eh composto

Confirmado por multiplas fontes. **4 pilares:**

1. **Juros nominais** (taxa balcao do contrato, ex: 11,19% Caixa) — remuneracao do banco
2. **Indexador** (TR, Poupanca, ou IPCA) — corrige o saldo devedor
3. **Seguros obrigatorios** — MIP (Morte e Invalidez Permanente) + DFI (Danos Fisicos ao Imovel). Variam com idade do tomador (podem representar ate 5% do valor da parcela em pessoas acima de 50 anos)
4. **Taxa administrativa mensal** — ~R$ 25/mes na Caixa (varia por banco)

**Base regulatoria:** Resolucao CMN 3.919/2010 — obriga divulgacao do CET antes da assinatura.

### Exemplos reais de CET (imovel R$ 500 mil, entrada 30%, 30 anos, SAC, 2026)

| Banco | Taxa nominal | CET | Primeira parcela | Fonte |
|-------|-------------|-----|-----------------|-------|
| Caixa (SAC/TR) | 11,19% | **~12,39%** | R$ 4.270,84 | [SpImovel](https://www.spimovel.com.br/blog/qual-a-taxa-de-juros-para-financiamento-imobiliario-da-caixa-em-2026/2877/) |
| Caixa (Price/TR) | 11,19% | 12,44% | R$ 3.425,45 | idem |
| Itau (SAC/TR) | 11,70% | **~14,31%** | R$ 3.442,86 | [SpImovel Itau](https://www.spimovel.com.br/blog/quais-as-taxas-de-juros-do-itau-no-financiamento-imobiliario/3192/) |
| Santander (SAC/TR) | 11,69% | **~13,18%** (entrada 20%) / 13,35% (entrada 50%) | R$ 5.207 (a partir) | [SpImovel Santander](https://www.spimovel.com.br/blog/quais-as-taxas-de-juros-do-santander-no-financiamento-imobiliario/3210/) |

**Insight importante:** apesar de Itau ter taxa nominal menor (11,60%) que Bradesco (11,70%) ou Santander (11,69%), o **CET do Itau eh maior** que o do Santander. Isso mostra que **comparar so taxa nominal eh enganoso** — o post precisa enfatizar o CET.

---

## 5. Pro-Cotista FGTS — Caixa (e outros)

**Status:** linha **ativa e recentemente ampliada em 2026** (FGTS retornou para imoveis ate R$ 500 mil apos periodo de restricao).

**Taxa Caixa:** **8,66% a.a. + TR** (a partir de, imovel novo)
- Composicao: 6,5% a.a. nominal (FGTS) + 2,16% a.a. (remuneracao do banco) = 8,66% a.a.
- Prazo: ate 420 meses (35 anos)
- Teto imovel: R$ 500 mil
- Requisito: 3+ anos de contribuicao ao FGTS (consecutivos ou nao)

**Banco do Brasil tambem opera Pro-Cotista** com taxa similar (~9% a.a.).

**Fonte:** [Click Habitacao](https://www.clickhabitacao.com.br/fgts/pro-cotista-o-que-e-como-funciona/), [Barros & Nobre](https://barrosenobre.com.br/blog/1841/financiamento-imobilirio-pr-cotista-do-fgts-retorna-para-imveis-de-at-r-500-mil), [MySide](https://myside.com.br/guia-imoveis/taxa-juros-financiamento-imobiliario).

**Pro dica no post:** para cliente com 3+ anos de FGTS e buscando imovel ate R$ 500 mil, **Pro-Cotista Caixa eh inquestionavelmente a melhor opcao** (taxa 8,66% vs balcao 11,19% = ~25% de economia).

---

## 6. Portabilidade — Itau eh lider?

**Dado confirmado parcialmente:**
- **Multiplas fontes indicam** que Itau eh o **mais agil em portabilidade digital** em 2026, com pre-aprovacao em ~1h no app para financiamentos ate R$ 3 milhoes.
- **NAO HA** estatistica publica disponivel sobre volume de portabilidade migrado em 2026 (nem Abecip nem BCB publicam esse dado ainda). Nao inventar numeros.
- Caixa recebeu de volta portabilidade apos cliente migrar por taxa — mas sem metricas.

**Recomendacao de linguagem no post:** "O Itau eh frequentemente citado como o banco mais agil em portabilidade de financiamento — aprovacao em ate 1h no app — ideal para quem quer trocar de banco rapidamente" (sem numero de volume).

**Fonte:** [Larya Melhor Banco 2026](https://larya.com.br/blog/melhor-banco-para-financiar-imovel-2026/).

---

## 7. Simulacao R$270k diferenca — **DISCREPANCIA ENCONTRADA**

**ALERTA CRITICO:** O dado "**R$ 270.000 de diferenca entre #1 e #6/Inter**" aparece em **uma unica fonte (Larya)**. Outra matriz do MESMO autor cita **R$ 150.000+**. Minha propria simulacao com os parametros do briefing (R$ 400k financiado / 30 anos / SAC) chega a **~R$ 138 mil**. Isso significa que o numero "R$ 270k" provavelmente se refere a um **imovel de R$ 500k financiado integralmente (ou ~80%) em 30 anos** — NAO o cenario padrao do briefing.

### Calculo rigoroso (sem TR, juros puros)

**Parametros:** imovel R$ 500.000, entrada 20%, financiado R$ 400.000, prazo 360 meses (30 anos), SAC.

| Taxa | 1a parcela | Ultima parcela | Juros totais | Total pago |
|------|-----------|----------------|--------------|------------|
| Caixa 11,19% | R$ 4.662 | R$ 1.121 | R$ 641.016 | **R$ 1.041.016** |
| Inter 13,76% | R$ 5.430 | R$ 1.123 | R$ 779.663 | **R$ 1.179.663** |
| **Diferenca** | R$ 768/mes | — | R$ 138.647 | **R$ 138.647** |

### Alternativa: **mesmo cenario, 35 anos (prazo max Caixa)**

| Taxa | 1a parcela | Juros totais | Total pago |
|------|-----------|--------------|------------|
| Caixa 11,19% | R$ 4.503 | R$ 747.472 | R$ 1.147.472 |
| Inter 13,76% | R$ 5.271 | R$ 909.039 | R$ 1.309.039 |
| **Diferenca** | R$ 768/mes | R$ 161.567 | **R$ 161.567** |

### Para chegar a R$ 270k, precisariamos de:
- Imovel R$ 1 milhao, entrada 20% (R$ 800k financiado), 30 anos: diferenca ~R$ 277k ✓
- OU: imovel R$ 700k financiado (~R$ 875k valor, 20% entrada), 30 anos: diferenca ~R$ 242k
- OU: imovel padrao + TR composta + seguros MIP/DFI incluidos no calculo total

**RECOMENDACAO DE REDACAO:**
- **NAO usar** o numero R$ 270.000 com o cenario "R$ 400k/30 anos/SAC" (FALSO)
- **Usar** R$ 138.000 a R$ 162.000 de diferenca para o cenario padrao
- OU explicitar o cenario que **realmente** gera R$ 270k: "financiamento de R$ 800 mil ao longo de 30 anos"
- Citar o simulador usado: ex: [Calculadora Brasil](https://calculadorabrasil.com.br/simulador-de-financiamento-imobiliario/) ou [QuintoAndar](https://www.quintoandar.com.br/ajuda/calculadora-de-financiamento-imobiliario)

**Isto eh YMYL critico.** Publicar "R$ 270k" sem disclaimer seria o mesmo erro do "Faixa 4 eh nova" que ja tivemos que corrigir.

---

## 8. Tempos de aprovacao (digital + tradicional)

**Validado por 2+ fontes** (MySide, Larya, QuintoAndar):

| Banco | Pre-aprovacao (app/digital) | Processo total (medio) |
|-------|----------------------------|------------------------|
| Itau | **ate 1h** no app (score + renda auto) | **~35 dias uteis** |
| Bradesco | **48h** (digital ou via gerente) | **~45 dias uteis** |
| Caixa | 3-7 dias (vistoria presencial) | **~61 dias uteis** |
| Santander | 5-10 dias | 30-45 dias uteis |
| BRB | 5-10 dias | 20-30 dias |

**Observacao:** o briefing original usava "7-15 dias / 15-30 dias / 10-20 dias" — isso parece referir-se apenas a **pre-aprovacao**, nao ao processo total. Ou vem de 2024. **Os numeros atualizados de 2026 sao mais amplos** (envolvendo vistoria, matricula, cartorio).

**Recomendacao:** distinguir "**pre-aprovacao**" (1h-7 dias) de "**liberacao do credito**" (30-60 dias uteis) no post. Expectativa errada = reclamacao.

---

## 9. Prazo maximo de financiamento — **CORRECAO CRITICA**

**Dado atualizado:** **TODOS os 5 bancos em analise (Caixa, BRB, Itau, Santander, Bradesco) hoje oferecem prazo maximo de 420 meses (35 anos)**.

O artigo original **erroneamente afirmava**:
- Itau: 30 anos — **ERRADO** (hoje: 35 anos)
- Bradesco: 30 anos — **ERRADO** (hoje: 35 anos)

**Regra de idade:** Idade do tomador + prazo do financiamento nao pode ultrapassar **80 anos e 6 meses**. Isso vale para Caixa, BRB e outras instituicoes. **Exemplo:** uma pessoa de 44 anos pode pegar 420 meses; uma pessoa de 69 anos pode pegar no maximo ~126 meses (10 anos e 6 meses).

**Fonte:** [Larya — Idade minima e maxima](https://larya.com.br/blog/idade-minima-e-maxima-para-financiar-imovel-existe-limite/), [Portal Loft](https://portal.loft.com.br/prazo-financiamento-imovel-bancos/), [Bradesco oficial](https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/imoveis/credito-imobiliario-aquisicao-de-imoveis.shtm).

---

## 10. Contexto macro (Selic + COPOM)

**Selic atual (Abril 2026):** **14,75% a.a.**

**Ultima decisao COPOM:** **18/03/2026** — corte de 0,25 p.p. (de 15,00% para 14,75%). Decisao unanime dos 7 diretores.

**Proxima reuniao COPOM:** **28-29/04/2026** (resultado publicado na noite de 29/04).

**Projecao Focus (BC) — fim de 2026:** mercado revisou de 12,5% para **13,0%** recentemente. Selic ainda alta apesar do corte.

**Narrativa para o post:**
- Selic em **ciclo de queda leve** (comecou em marco/2026 apos longo periodo de estabilidade em 15%)
- Bancos ja **antecipando** reducoes nas taxas de credito imobiliario (Itau reduziu de 11,70% para 11,60% em dezembro/2025, Santander reduziu levemente no inicio de 2026)
- Mercado **nao deve esperar** grandes quedas nas taxas de imobiliario em 2026 — a alavancagem do imobiliario eh parcialmente independente da Selic (funding vem de poupanca e FGTS, com regras proprias)
- **Nao vender "o juro vai cair, espere"** — isso eh conselho financeiro ruim. Imovel nao espera, e cada mes de aluguel eh dinheiro perdido.

**Fontes:**
- [Agencia Brasil — Corte para 14,75%](https://agenciabrasil.ebc.com.br/economia/noticia/2026-03/bc-reduz-juros-basicos-para-1475-ao-ano)
- [Poder360 — Copom reduz Selic](https://www.poder360.com.br/poder-economia/copom-reduz-selic-para-1475-inicia-ciclo-de-corte/)
- [CNN Brasil](https://www.cnnbrasil.com.br/economia/macroeconomia/bc-corta-juro-em-025-ponto-e-reduz-selic-a-14-75-copom-marco-2026/)
- [JOTA — Calendario COPOM 2026](https://www.jota.info/tributos-e-empresas/mercado/proxima-reuniao-do-copom-saiba-quando-sera-datas-2026)
- [Exame / InfoMoney — Focus](https://exame.com/economia/focus-mercado-aumenta-projecao-de-selic-de-125-para-13-em-2026/)

---

## 11. Discrepancias encontradas — SINALIZAR NO POST

### Discrepancia #1: R$ 270.000 de diferenca
- **Larya (artigo 1)**: R$ 270.000 (sem parametros explicitos, implica imovel R$ 500k)
- **Larya (artigo 2)**: "mais de R$ 150.000"
- **Calculo proprio**: R$ 138.647 (R$ 400k/30 anos/SAC) ou R$ 161.567 (R$ 400k/35 anos/SAC)
- **Recomendacao**: usar R$ 140-160k como diferenca realista para imovel R$ 500k, ou explicitar que R$ 270k se refere a imovel R$ 800k+ financiado em 30 anos.

### Discrepancia #2: Taxas Santander
- Artigo antigo (fev/2026): 11,79% ou 12,49%
- Artigos recentes (mar/2026): 11,69%
- **Mais recente vence**: usar **11,69%** com nota de que houve reducao recente.

### Discrepancia #3: Taxas Itau
- Historicamente: 11,70%
- Dezembro 2025 em diante: 11,60%
- Atual (abr/2026): **11,60%** ✓

### Discrepancia #4: Prazo maximo bancos privados
- Artigos antigos: 30 anos
- Fontes 2026: 35 anos
- **Todos os 5 bancos hoje oferecem 35 anos** (confirmado).

### Discrepancia #5: Financiamento % maximo Itau
- Artigos antigos: 80%
- Fontes 2026: 90% (para residencial)
- Verificar antes de citar — dado muito positivo que merece validacao extra.

---

## 12. Fontes consultadas — consolidacao

### Primarias (oficiais — maior peso de autoridade)
1. [Gov.br / Ministerio das Cidades — MCMV 22/04/2026](https://www.gov.br/cidades/pt-br/assuntos/noticias-1/noticia-mcid-n-2111) — consultado 23/04/2026
2. [Gov.br / Secom — Nova portaria MCMV](https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2026/04/nova-portaria-atualiza-limites-de-renda-bruta-familiar-admitidos-para-familias-atendidas-pelo-minha-casa-minha-vida) — consultado 23/04/2026
3. [Bradesco oficial — Credito Imobiliario Aquisicao](https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/imoveis/credito-imobiliario-aquisicao-de-imoveis.shtm) — consultado 23/04/2026
4. [Caixa PDF — Formula do CET](https://www.caixa.gov.br/Downloads/credito-cet/FORMULA_PARA_CALCULO_CET.pdf) — consultado 23/04/2026
5. [Itau — Credito Imobiliario](https://www.itau.com.br/emprestimos-financiamentos/credito-imobiliario) — link oficial, nao retorna rate
6. [Santander — Financiamento Imobiliario](https://www.santander.com.br/banco/credito-financiamento-imobiliario/) — bloqueou WebFetch (403), link disponivel
7. [BB — Pro-Cotista](https://www.bb.com.br/site/pra-voce/financiamentos/financiamento-imobiliario/pro-cotista/) — base da info pro-cotista
8. [BCB — Taxa Selic historico](https://www.bcb.gov.br/controleinflacao/historicotaxasjuros) — bloqueou extracao
9. [CAIXA — Simulador Habitacional](https://www8.caixa.gov.br/siopiinternet-web/) — simulador oficial

### Secundarias (imprensa e agregadores, >1 por fato)
10. [InfoMoney — MCMV novas regras](https://www.infomoney.com.br/politica/renda-de-r-13-mil-e-imoveis-de-r-600-mil-as-novas-regras-do-minha-casa-minha-vida/)
11. [Exame — MCMV amplia](https://exame.com/esferabrasil/minha-casa-minha-vida-amplia-renda-e-valor-de-imoveis-veja-o-que-muda-no-programa/)
12. [ISTOE Dinheiro — MCMV limites](https://istoedinheiro.com.br/mcmv-limites-taxas-juros)
13. [ISTOE Dinheiro — Caixa fev/2026](https://istoedinheiro.com.br/caixa-financiamento-imobiliario-fev-2026-taxas)
14. [Agencia Brasil — Selic 14,75%](https://agenciabrasil.ebc.com.br/economia/noticia/2026-03/bc-reduz-juros-basicos-para-1475-ao-ano)
15. [CartaCapital — COPOM corta 14,75%](https://www.cartacapital.com.br/cartaexpressa/o-sinal-do-copom-sobre-a-proxima-reuniao-apos-cortar-a-selic-para-1475/)
16. [Poder360 — Copom inicia ciclo](https://www.poder360.com.br/poder-economia/copom-reduz-selic-para-1475-inicia-ciclo-de-corte/)
17. [CNN Brasil — Selic 14,75%](https://www.cnnbrasil.com.br/economia/macroeconomia/bc-corta-juro-em-025-ponto-e-reduz-selic-a-14-75-copom-marco-2026/)
18. [JOTA — Calendario COPOM 2026](https://www.jota.info/tributos-e-empresas/mercado/proxima-reuniao-do-copom-saiba-quando-sera-datas-2026)
19. [Exame — Focus 13%](https://exame.com/economia/focus-mercado-aumenta-projecao-de-selic-de-125-para-13-em-2026/)
20. [FDR — MCMV 22/04](https://fdr.com.br/2026/04/23/agora-minha-casa-minha-vida-libera-imoveis-de-r-600-mil-e-renda-de-ate-r-13-mil-veja-se-voce-entra/)
21. [Diario do Comercio — MCMV](https://diariodocomercio.com.br/economia/minha-casa-minha-vida-novas-regras/)
22. [Meutudo — MCMV 13 mil](https://meutudo.com.br/blog/noticias/2026/04/20/minha-casa-minha-vida-agora-libera-financiamento-para-renda-ate-r-13-mil/)

### Agregadores especializados
23. [Larya — Taxas 2026 (ranking)](https://larya.com.br/blog/taxa-financiamento-imobiliario-2026/)
24. [Larya — Melhor banco 2026](https://larya.com.br/blog/qual-banco-tem-a-menor-taxa-para-financiamento-imobiliario-em-2026/)
25. [Larya — Caixa 2026](https://larya.com.br/blog/taxas-de-juros-financiamento-imobiliario-2026/)
26. [Larya — Itau 2026](https://larya.com.br/blog/como-funciona-o-financiamento-imobiliario-do-itau-2026/)
27. [Larya — Bradesco 2026](https://larya.com.br/blog/como-funciona-o-financiamento-imobiliario-do-bradesco-2026/)
28. [Larya — Santander 2026](https://larya.com.br/blog/como-funciona-financiamento-imobiliario-santander/)
29. [Larya — BRB 2026](https://larya.com.br/blog/omo-funciona-financiamento-imobiliario-brb/)
30. [Larya — Inter 2026](https://larya.com.br/blog/como-funciona-financiamento-imobiliario-inter/)
31. [Larya — Idade min/max](https://larya.com.br/blog/idade-minima-e-maxima-para-financiar-imovel-existe-limite/)
32. [MySide — Taxas 2026](https://myside.com.br/guia-imoveis/taxa-juros-financiamento-imobiliario)
33. [MySide — Santander 2026](https://myside.com.br/guia-imoveis/taxa-juros-financiamento-imobiliario-santander)
34. [MySide — Tempo liberacao credito](https://myside.com.br/guia-imoveis/tempo-liberacao-dinheiro-financiamento-imobiliario)
35. [SpImovel — Caixa 2026](https://www.spimovel.com.br/blog/qual-a-taxa-de-juros-para-financiamento-imobiliario-da-caixa-em-2026/2877/)
36. [SpImovel — Itau 2026](https://www.spimovel.com.br/blog/quais-as-taxas-de-juros-do-itau-no-financiamento-imobiliario/3192/)
37. [SpImovel — Santander 2026](https://www.spimovel.com.br/blog/quais-as-taxas-de-juros-do-santander-no-financiamento-imobiliario/3210/)
38. [SpImovel — Bradesco 2026](https://www.spimovel.com.br/blog/quais-as-taxas-de-juros-do-bradesco-no-financiamento-imobiliario/3209/)
39. [SpImovel — Banco do Brasil 2026](https://www.spimovel.com.br/blog/quais-sao-as-taxas-de-juros-do-financiamento-imobiliario-no-banco-do-brasil/3214/)
40. [SpImovel — Melhor banco 2026](https://www.spimovel.com.br/blog/qual-e-o-melhor-banco-para-financiamento-imobiliario/2847/)
41. [SpImovel — CET](https://www.spimovel.com.br/blog/o-que-e-custo-efetivo-total-no-financiamento-imobiliario/3185/)
42. [SpImovel — Portabilidade](https://www.spimovel.com.br/blog/qual-e-o-melhor-banco-para-fazer-a-portabilidade-do-credito-imobiliario/3592/)
43. [Tenda — MCMV 2026 faixas](https://www.tenda.com/blog/minha-casa-minha-vida/faixas-mcmv)
44. [Tenda — Taxa MCMV](https://www.tenda.com/blog/minha-casa-minha-vida/entenda-a-taxa-de-juros-do-minha-casa-minha-vida)
45. [Tenda — Prazo max](https://www.tenda.com/blog/trilha-da-conquista/em-ate-quantos-anos-posso-financiar-um-imovel)
46. [Tenda — CET](https://www.tenda.com/blog/tenda-explica/custo-efetivo-total)
47. [Central Financas — MCMV 2026](https://centralfinancas.com/mcmv-taxa-juros-financiamento/)
48. [ImobConecta — Bancos reduzem](https://imobconecta.com.br/artigo/mercado-imobiliario/bancos-reduzem-juros-imobiliario-em-2026)
49. [Click Habitacao — Pro-Cotista](https://www.clickhabitacao.com.br/fgts/pro-cotista-o-que-e-como-funciona/)
50. [Barros & Nobre — Pro-Cotista retorno](https://barrosenobre.com.br/blog/1841/financiamento-imobilirio-pr-cotista-do-fgts-retorna-para-imveis-de-at-r-500-mil)
51. [Plaza Imoveis — Caixa SFH](https://plazaimoveis.com.br/artigo/8200/taxas-de-juros-do-financiamento-imobiliario-da-caixa-em-2026-atualizado-com-as-novas-regras-do-sfh)
52. [QuintoAndar — Financiar R$ 400k](https://www.quintoandar.com.br/guias/como-comprar/se-eu-financiar-400-mil-quanto-vou-pagar/)
53. [QuintoAndar — CET](https://www.quintoandar.com.br/guias/como-comprar/custo-efetivo-total/)
54. [CalculadoraBrasil — Simulador](https://calculadorabrasil.com.br/simulador-de-financiamento-imobiliario/)
55. [Abecip — BRB corta juros (2023, historico)](https://www.abecip.org.br/imprensa/noticias/brb-puxa-fila-dos-grandes-bancos-e-corta-juros-do-credito-imobiliario)

---

## 13. Resumo executivo — o que mudar no post original

### Correcoes CRITICAS (YMYL) no arquivo `content/blog/financiamento-caixa-itau-bradesco-comparativo.mdx`:

| Linha/Campo | Atual (ERRADO) | Correto |
|-------------|----------------|---------|
| Linha 16 — Taxa Caixa | 8,5-10,5% | **11,19% balcao / 10,26% preferencial** + TR |
| Linha 16 — Taxa Itau | 9,5-11,5% | **11,60%** + TR (a partir de) |
| Linha 16 — Taxa Bradesco | 9,0-11,0% | **11,70%** + TR (a partir de) |
| Linha 17 — Prazo Itau | 30 anos | **35 anos** (420 meses) |
| Linha 17 — Prazo Bradesco | 30 anos | **35 anos** (420 meses) |
| Linha 19 — Financ. max Itau | 80% | **Ate 90%** (verificar com banco) |
| Linha 35 — MCMV renda limite | R$ 8.000 | **R$ 13.000** (Faixa 4, pos 22/04/2026) |
| Linha 46 — MCMV ate R$ 8 mil | R$ 8.000 | **R$ 13.000** (Faixa 4) |
| Linha 117 — Economia SAC R$ 170k | apenas 10% juros sem TR | Recalcular com CET real |
| Linha 119 — "10% a.a." | Irrealista para 2026 | **11,19% Caixa ou 11,60% Itau + TR + seguros** |
| Linha 155 — "0,5% = R$50-100k" | sem contexto | Validar com simulacao concreta |

### Complementos a ADICIONAR no post (baseado nessa pesquisa):

- Secao "**BRB**" — adicionar (atualmente nao aparece, mas eh #2 em taxa)
- Secao "**Santander**" — adicionar (atualmente nao aparece, mas eh #4 em taxa)
- Taxa **Pro-Cotista Caixa** (8,66%) — destaque para quem tem 3+ anos de FGTS
- **Distincao balcao vs preferencial** (Caixa 11,19% vs 10,26%)
- **CET vs taxa nominal** — com tabela comparativa
- Contexto **Selic 14,75% + COPOM 28-29/04/2026**
- **MCMV Faixa 4 ampliada 22/04/2026** — renda ate R$ 13 mil, imovel ate R$ 600 mil
- **Pergunta: "eh melhor Faixa 4 MCMV (10,5%) ou SBPE preferencial Caixa (10,26%)?"** — resposta tecnica
- Disclaimer claro: taxas "a partir de" variam com perfil, relacionamento, idade

### Riscos de nao atualizar:

- Post ser **citado erroneamente** por usuarios (comprar baseado em info falsa de 2024)
- Penalizacao **YMYL Google** por conteudo desatualizado em nicho financeiro
- Reputacao da imobiliaria (Bruno) comprometida por dar info incorreta
