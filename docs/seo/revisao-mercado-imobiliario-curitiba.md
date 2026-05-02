# Plano de revisão — `mercado-imobiliario-curitiba-2026`

> Compilado em **2026-05-02** após auditoria profunda. Próximo da fila de
> Sprint A do [plano geral](./article-revision-plan-2026-05-02.md). Risco
> 🟡 médio (originalmente), mas auditoria revelou **erro de fonte na
> citação principal do post**, então prioridade subiu pra alta.
>
> **Validar com ChatGPT antes de aplicar.** Após validação, traduzir em
> script idempotente `scripts/apply-mercado-revisions.mjs` no padrão
> dos outros artigos.

---

## 1. Por que este artigo é prioridade

Três problemas que se reforçam.

### 1.1 Erro de fonte na citação principal (CRÍTICO)

O post abre o capítulo "Os dois alertas que os corretores sentem antes
do release" com o claim:

> **"1. Endividamento das famílias em 49,7% da renda — recorde absoluto"**
> ...
> **Fonte:** [Peic/CNC de abril de 2026](...)

**Problema:** o número 49,7% é da **série 19881 do Banco Central** —
"Endividamento das famílias com o Sistema Financeiro Nacional em relação
à renda acumulada dos últimos 12 meses" (RNDBF). **Não é Peic/CNC.**

A Peic (Pesquisa de Endividamento e Inadimplência do Consumidor) da
CNC mede outra coisa: **% de famílias COM dívida** (atualmente ~76-77%
em abril/2026). Não é "% da renda comprometida".

Quem ler o post e clicar na fonte CNC/Peic vai achar números diferentes
(76,7% de famílias endividadas), perceber a divergência e desconfiar do
texto inteiro. Isso já aconteceu com leitores críticos (foi o feedback
que disparou esta revisão).

**Solução:** trocar fonte pra BCB direto (série 19881) e atualizar
número pra **49,9% fev/2026** (BCB divulgou 27/04/2026).

### 1.2 Conflito de números de m² com `preco-metro-quadrado-curitiba-bairro`

A tabela "Top 10 bairros por valorização" do post traz preços que
divergem do artigo de referência interno (PMQ — fonte FipeZap mar/2026):

| Bairro | Este artigo (block 8) | `preco-metro-quadrado` (FipeZap mar/26) | Δ |
|---|---|---|---|
| Bigorrilho | R$ 13.500 | R$ 14.117 | -4,5% |
| Ecoville | R$ 9.800 | R$ 14.062 (Mossunguê = Ecoville no IPPUC) | **-30%** |
| Bom Retiro | R$ 10.300 | R$ 10.623 | -3% |
| Centro | R$ 8.100 | R$ 8.430 | -4% |
| Cabral | R$ 12.400 | (não publicado claro no PMQ) | — |

Caso mais grave: **Ecoville R$ 9.800**. Pode ter dois cenários:
1. O autor usou recorte só de "casas em condomínio" (mais baratas que
   apartamentos do Ecoville) → precisa marcar isso explicitamente.
2. Erro de fonte → trocar por R$ 14.062 (Mossunguê = coração do
   Ecoville no FipeZap).

**Solução:** padronizar tabela pelo PMQ (FipeZap mar/26).

### 1.3 CRM FYMOOB como autoridade em rentabilidade por bairro

Bloco 30 abre com:
> "Esse é o dado que a FYMOOB pode entregar e poucos conseguem replicar..."

E os 3 bullets seguintes (32-34) crava faixas de rentabilidade
(0,40-0,48%, 0,32-0,38%, 0,37-0,42%) por bairro com base em "fechamentos
de venda e locação do mesmo período" — sem amostra, sem n, sem caveat
de viés de captação.

**Solução:** reformular como "faixas observadas no estoque acompanhado
pela FYMOOB" + adicionar nota de limitação (amostra reduzida, viés de
alto-padrão) + cross-link pra FipeZap Locação como triangulação.

### 1.4 UBS Bubble Index com score que o relatório não publica

Bloco 15 cita:
> "UBS 2025: São Paulo (a referência mais próxima de risco bolha no
> Brasil) ficou em **-0,10** — menor risco global entre as **21**
> cidades avaliadas."

**Problemas:**
- O UBS Global Real Estate Bubble Index **2025** (publicado 23/09/2025)
  **não publica score numérico** — só ranking categórico.
- "21 cidades" — UBS 2024 cobriu 25 cidades; UBS 2025 cobriu 25 cidades.
  Não é 21.
- O score "-0,10" é provavelmente do UBS 2024, mas o post diz "2025".

**Solução:** trocar pelo wording do relatório real — "São Paulo está na
categoria 'baixo risco de bolha', a mesma de Londres, Paris, Milão,
Nova York, San Francisco e Hong Kong; o relatório UBS 2025 classifica
SP como o de menor risco entre as 25 cidades analisadas."

---

## 2. Sumário das mudanças

| # | Bloco | Tipo | Mudança | Severidade |
|---|---|---|---|---|
| 1 | – | frontmatter | Title pra "Mercado imobiliário em Curitiba 2026: ainda vale comprar?" (alinha com seo_meta_title) | Baixa |
| 2 | 8 | table | Atualizar 4 preços de m² pelo FipeZap mar/26 | Alta |
| 3 | 12 | paragraph | "Sete critérios UBS / -0,10 / 21 cidades" → texto fiel ao UBS 2025 | Crítica |
| 4 | 15 | bulletListItem | Atualizar UBS 2025 com link + ranking categórico real | Crítica |
| 5 | 22 | heading | "49,7%" → "49,9%" | Crítica |
| 6 | 23 | paragraph | Atualizar número + adicionar comprometimento mensal 29,7% | Crítica |
| 7 | 24 | paragraph | Trocar fonte Peic/CNC por BCB direto + nota explicando diferença | Crítica |
| 8 | 30 | paragraph | Reformular: "FYMOOB pode entregar" → "observação complementar" | Alta |
| 9 | 31-34 | bullets | Manter números mas marcar "amostra acompanhada FYMOOB; triangular com FipeZap Locação" | Alta |
| 10 | 35 | paragraph | Reformular CTA inline pra mais honesto | Média |
| 11 | 49 | heading | "ADEMI-PR ~13 meses" — adicionar contexto: queda 19% em lançamentos 2025 | Média (positivo) |
| 12 | 57 | paragraph | "dados FYMOOB CRM" → "FipeZap por bairro" | Alta |
| 13 | 60 | paragraph | FAQ — "0,45% ao mês" como faixa indicativa, não regra | Baixa |
| 14 | 62 | paragraph | FAQ — Bigorrilho R$ 13.500 → R$ 14.117 (consistência interna) | Alta |
| 15 | 36 | ctaBox | Manter conceito "calcular rentabilidade" mas refinar copy | Baixa |

15 blocos. ~30 minutos de aplicação após validação.

---

## 3. Mudanças trecho a trecho

### Mudança 1 — Frontmatter (title)

**Atual:**
- title: "Preço do metro quadrado em Curitiba: ainda vale comprar imóvel?"
- seo_meta_title: "Mercado imobiliário em Curitiba 2026: vale comprar?"
- description: "Curitiba sobe 17,86% e é a 2ª capital..."

**Problema:** o title visível usa "Preço do metro quadrado" — exatamente
o início do title do artigo `preco-metro-quadrado-curitiba-bairro`.
Dois posts do mesmo site brigando pelo mesmo head term no Google
canibaliza ranking.

**Proposto:**
- title: **"Mercado imobiliário em Curitiba 2026: ainda vale comprar imóvel?"**
- seo_meta_title: manter "Mercado imobiliário em Curitiba 2026: vale comprar?"
- description: manter

**Justificativa:** alinha title visível com seo_meta_title, separa
intent claramente do PMQ. Quem busca "preço metro quadrado curitiba" cai
no PMQ; quem busca "vale comprar imóvel curitiba" / "mercado
imobiliário curitiba" cai aqui.

---

### Mudança 2 — Block 8 (tabela Top 10 valorização)

**Atual** (extraído da tabela):

| Bairro | m² venda | Valorização 12m |
|---|---|---|
| Ahú | R$ 13.022 | +12,5% |
| Juvevê | R$ 13.897 | +11,5% |
| Bom Retiro | **R$ 10.300** | +9,1% |
| Batel | R$ 17.924 | +6,5% |
| Cabral | R$ 12.400 | +4,4% |
| Água Verde | R$ 12.178 | +4,1% |
| Mercês | R$ 10.600 | +3,8% |
| Bigorrilho | **R$ 13.500** | +2,9% |
| Ecoville | **R$ 9.800** | +2,7% |
| Centro | **R$ 8.100** | +2,5% |

**Problema:** 4 bairros com m² divergente do PMQ (FipeZap mar/26 — fonte
oficial Tier 1 já consolidada no site).

**Proposto:**

| Bairro | m² venda | Valorização 12m |
|---|---|---|
| Ahú | R$ 13.022 | +12,5% |
| Juvevê | R$ 13.897 | +11,5% |
| Bom Retiro | **R$ 10.623** | +9,1% |
| Batel | R$ 17.924 | +6,5% |
| Cabral | R$ 12.400 | +4,4% |
| Água Verde | R$ 12.178 | +4,1% |
| Mercês | R$ 10.820 | +3,8% |
| Bigorrilho | **R$ 14.117** | +2,9% |
| Mossunguê (Ecoville) | **R$ 14.062** | +2,7% |
| Centro | **R$ 8.430** | +2,5% |

**Justificativa:** todos os preços agora batem com FipeZap mar/26
(consultado via [MySide](https://www.myside.com.br/), fonte
intermediária do FipeZap). "Ecoville" virou "Mossunguê (Ecoville)"
porque é o nome oficial do bairro no IPPUC e o que o FipeZap publica.

**Caveat:** Mercês R$ 10.600 → R$ 10.820 (+2%) e Cabral mantém R$
12.400 — esses dois são levemente diferentes do PMQ ranking exato mas
caem dentro do erro de medição (FipeZap arredonda mensal).

---

### Mudança 3 — Block 12 ("Tem bolha imobiliária em Curitiba?")

**Atual:**
> Resposta objetiva, sem rodeio: não, não tem bolha clássica em
> Curitiba em 2026. A gente rodou os **sete critérios** que o **UBS
> Global Real Estate Bubble Index** usa para classificar **21 cidades
> do mundo**, e Curitiba passa em 5 deles, acende alerta amarelo em 2 e
> não dispara vermelho em nenhum.

**Problemas:**
- UBS 2024/2025 cobre **25 cidades**, não 21.
- "Sete critérios" — o UBS usa 5 fundamentos (price-to-income,
  price-to-rent, mortgage-to-GDP, change in mortgages-to-GDP,
  construction-to-GDP). Não 7.
- Curitiba **não é avaliada** pelo UBS — só SP é (única do BR). O texto
  sugere que UBS classificou Curitiba (não classificou).

**Proposto:**
> Resposta objetiva: não, não tem bolha clássica em Curitiba em 2026.
> Aplicando os critérios que o
> [UBS Global Real Estate Bubble Index 2025](https://www.ubs.com/global/en/media/display-page-ndp/en-20250923-grebi25.html)
> usa para 25 cidades globais (Curitiba não está na lista, então
> usamos como referência São Paulo, a única brasileira avaliada),
> Curitiba passa nos fundamentos macro principais — crescimento real
> negativo, crédito imobiliário/PIB ainda baixo. Mas dois critérios
> acendem amarelo: preço/renda e relação aluguel/preço.

**Justificativa:** preserva a tese do post (não há bolha clássica) mas
descreve a metodologia honestamente — UBS não avalia Curitiba, então
usamos SP como proxy. Sem o "rodamos os 7 critérios" (que sugere
metodologia interna sem validação externa).

---

### Mudança 4 — Block 15 (bullet UBS 2025)

**Atual:**
> UBS 2025: São Paulo (a referência mais próxima de risco bolha no
> Brasil) ficou em **-0,10** — menor risco global entre as **21
> cidades avaliadas**.

**Problemas:**
- Score "-0,10" não foi publicado pelo UBS 2025 (só categórico).
- 21 cidades errado (são 25).

**Proposto:**
> UBS 2025: São Paulo está na categoria
> [**baixo risco de bolha**](https://www.ubs.com/global/en/media/display-page-ndp/en-20250923-grebi25.html)
> — mesma de Londres, Paris, Milão, Nova York, San Francisco e Hong
> Kong. Entre as 25 cidades avaliadas, SP é a de menor risco. Em termos
> reais (descontada inflação), preços ainda estão ~20% abaixo do pico
> de 2014.

**Justificativa:** wording fiel ao UBS 2025 + número de cidades correto
+ contexto adicional (preços ainda abaixo do pico) que reforça a tese.

---

### Mudança 5 — Block 22 (heading endividamento)

**Atual:**
> 1. Endividamento das famílias em **49,7%** da renda — recorde absoluto

**Proposto:**
> 1. Endividamento das famílias em **49,9%** da renda — recorde absoluto

**Justificativa:** BCB divulgou 27/04/2026, fev/2026 fechou em 49,90%
(acima do pico anterior 49,88% jul/2022).

---

### Mudança 6 — Block 23 (parágrafo do endividamento)

**Atual:**
> É o maior número da série histórica do Banco Central. Pior que
> qualquer ponto da crise 2015-2016. Quando metade da renda de uma
> família brasileira já está comprometida com dívida antes de olhar
> pro financiamento imobiliário, a capacidade de aumentar a prestação
> cai — mesmo com Selic caindo.

**Proposto:**
> É o maior número da série histórica do Banco Central, iniciada em
> 2005. Acima do pico anterior (49,88% em julho/2022) e bem acima de
> qualquer ponto da crise 2015-2016. Olhando o fluxo mensal, o
> [comprometimento de renda](https://dadosabertos.bcb.gov.br/dataset/29037-endividamento-das-familias-com-o-sistema-financeiro-nacional-em-relacao-a-renda-acumulada-dos)
> — a parcela do orçamento mensal que vai pra pagamento de dívidas —
> está em **29,7%**. Isso significa que, antes de olhar pro
> financiamento imobiliário, a família média já compromete quase um
> terço do que recebe todo mês. A capacidade de assumir nova prestação
> caiu — mesmo com Selic caindo.

**Justificativa:** mantém o gancho narrativo + adiciona dado novo
(comprometimento mensal 29,7%, distinção importante BCB faz) + corrige
a metáfora "metade da renda comprometida com dívida" — que é tecnicamente
incorreta (49,9% é dívida total / renda anual, não % da renda mensal
que vai pra dívida).

---

### Mudança 7 — Block 24 (fonte)

**Atual:**
> Fonte: [Peic/CNC de abril de 2026](https://www.portaldocomercio.org.br/institucional/noticias/46906-endividamento-das-familias-bate-recorde-em-abril).

**Problema crítico:** Peic/CNC mede % de famílias COM dívida (76,7% em
abr/26), **NÃO** % da renda comprometida com dívida. O número 49,9%
vem do BCB.

**Proposto:**
> Fonte: [Banco Central — Endividamento das Famílias com o Sistema
> Financeiro Nacional em relação à renda acumulada dos últimos 12
> meses](https://dadosabertos.bcb.gov.br/dataset/29037-endividamento-das-familias-com-o-sistema-financeiro-nacional-em-relacao-a-renda-acumulada-dos),
> série RNDBF iniciada em 2005, leitura de fevereiro/2026
> divulgada em 27/04/2026.

**Nota editorial (escondida):** o erro de fonte original (Peic/CNC) era
o tipo de problema que confunde o leitor crítico — ele clica no link,
vê 76,7% e percebe que o número não bate com o 49,9% que o post diz.
Trocar pra BCB direto fecha esse buraco.

---

### Mudança 8 — Block 30 (abertura "Quanto o aluguel rende por bairro")

**Atual:**
> Esse é o dado **que a FYMOOB pode entregar e poucos conseguem
> replicar** — retorno real de aluguel por bairro, calculado sobre
> fechamentos de venda e locação do mesmo período. A FipeZap publica o
> agregado (4,74% ao ano pra Curitiba capital). Quem compra pra
> investir precisa do recorte por bairro.

**Problemas:**
- "Pode entregar e poucos conseguem replicar" — claim absoluto sem prova
  + posiciona FYMOOB como autoridade exclusiva.
- "Calculado sobre fechamentos" — sem amostra (n), sem período exato.

**Proposto:**
> O FipeZap publica rentabilidade agregada de Curitiba (4,74% ao ano,
> mar/2026 — um dos três menores índices entre capitais avaliadas). Por
> bairro, a granularidade não está em fonte pública regular — Quinto
> Andar Index e FipeZap Locação cobrem alguns recortes; Secovi-PR
> publica m² aluguel por bairro mas não relação aluguel/venda.
>
> Como observação complementar, o estoque ativo acompanhado pela FYMOOB
> em abril/2026 mostra três faixas claras de rentabilidade por perfil
> de bairro:

**Justificativa:** abre com fonte primária (FipeZap), explicita o gap
de cobertura pública, e introduz a observação FYMOOB **depois** como
complemento — não como autoridade.

---

### Mudança 9 — Block 31-34 (bullets de rentabilidade)

**Atual** (3 bullets):
> Bairros de aluguel alto + preço ainda não saturado: Centro, Portão,
> Água Verde — aluguel rende **0,40% a 0,48%** do valor do imóvel por
> mês (~5,0% a 5,9% ao ano)
> ...

**Proposto** — manter os bullets quase idênticos mas:
- Block 31 (intro): "A faixa que observamos nos imóveis acompanhados
  pela FYMOOB em 2026 sugere três grupos:" (em vez de "antes da
  divulgação agregada")
- Bullets 32-34 (corpo): manter
- Adicionar **bullet final** depois de 34:
  > **Caveat:** essas faixas são derivadas de uma amostra reduzida (~242
  > imóveis em 66 bairros, snapshot abr/2026) e podem ter viés de
  > captação, já que o portfólio FYMOOB tende a alto-padrão. Use como
  > sinal direcional, não como número fechado pra modelar investimento.
  > Antes de fechar, triangular com [FipeZap
  > Locação](https://www.fipe.org.br/pt-br/indices/fipezap/) e
  > pesquisa Secovi-PR.

**Justificativa:** mantém a utilidade prática (faixas por perfil) mas
explicita o limite estatístico — exatamente o padrão da revisão.

---

### Mudança 10 — Block 35 (CTA inline)

**Atual:**
> Essas faixas são indicativas pra 2026 e dependem de tipo do imóvel,
> metragem e estado. Pra cálculo fechado em um imóvel específico, [fale
> com o time FYMOOB](https://wa.me/...) — a gente roda a conta com base
> em fechamento real do bairro, não em média genérica.

**Proposto:**
> Pra cálculo fechado em um imóvel específico, [fale com o time
> FYMOOB](https://wa.me/554199978-0517?text=Gostaria%20de%20calcular%20a%20rentabilidade%20de%20um%20im%C3%B3vel%20em%20Curitiba)
> — a gente cruza o aluguel observado por tipologia/bairro com o preço
> do imóvel-alvo e devolve a faixa esperada.

**Justificativa:** remove o "fechamento real do bairro, não em média
genérica" (claim implícito de superioridade vs FipeZap) e mantém o
CTA prático.

---

### Mudança 11 — Block 49 + 50 (estoque ADEMI-PR)

**Atual:**
> 2. Estoque ADEMI-PR em ~13 meses de venda
>
> Considerado saudável historicamente, mas puxado por construtoras
> locais que seguram preço acima do mercado. Se uma delas decide rodar
> estoque com desconto agressivo, pode vazar no preço de cidade
> inteira.

**Proposto** (ampliar o block 50, manter heading 49):
> 2. Estoque ADEMI-PR em ~13 meses de venda — em meio a queda de 19%
>    em lançamentos
>
> A pesquisa anual da [ADEMI-PR](https://ademipr.com.br/mercado-imobiliario-de-curitiba-mantem-valorizacao-com-queda-no-estoque-e-perspectivas-para-novos-lancamentos/),
> conduzida pela Brain Inteligência Estratégica e divulgada em
> março/2026, mostrou três sinais simultâneos:
>
> - **Lançamentos caíram 19% em 2025** vs 2024 — sinal de cautela das
>   incorporadoras
> - **Vendas estáveis** (10.200 unidades), produzindo R$ 7,4 bi em VGV
> - **Mix concentrado em compactos**: 45% dos lançamentos foram studios
>   ou 1 dormitório; MCMV foi só 5% dos projetos
>
> Considerado saudável historicamente, o estoque de 13 meses é puxado
> por construtoras locais que seguram preço acima do mercado. Se uma
> delas decide rodar estoque com desconto agressivo, pode vazar no
> preço da cidade inteira. O sinal de queda em lançamentos amortece
> esse risco mas não elimina.

**Justificativa:** dado novo e relevante (queda de 19% em lançamentos —
não estava no post original) + contexto de mix de produto (studios+1Q
= 45%, importante pra quem quer comprar família). Reforça a tese do
post ("não é boom, é filtro") com mais evidência.

---

### Mudança 12 — Block 57 (FAQ "comprar agora ou esperar")

**Atual** (final do bloco):
> ...trocar por um imóvel em bairro de valorização acelerada (Ahú,
> Juvevê) pode fazer sentido — o ganho na valorização compensa a taxa
> maior do financiamento em 2026. Pra quem ainda está decidindo entre
> apartamento e casa, [comparativo casa ou apto em
> Curitiba](/blog/apartamento-ou-casa-curitiba) mostra a diferença real
> de preço por bairro com **dados FYMOOB CRM**.

**Proposto:**
> ...trocar por um imóvel em bairro de valorização acelerada (Ahú,
> Juvevê) pode fazer sentido — o ganho na valorização compensa a taxa
> maior do financiamento em 2026. Pra quem ainda está decidindo entre
> apartamento e casa, [comparativo casa ou apto em
> Curitiba](/blog/apartamento-ou-casa-curitiba) mostra a diferença real
> de preço por bairro com base no **FipeZap por tipologia**.

---

### Mudança 13 — Block 60 (FAQ "Vale a pena investir")

**Atual:**
> ...Pra investidor focado em renda, bairros como Centro e Portão
> rendem mais (próximo de **0,45% ao mês**)...

**Proposto:**
> ...Pra investidor focado em renda, bairros como Centro, Portão e
> Água Verde tendem a render mais (faixa observada de 0,40-0,48% ao
> mês na amostra acompanhada pela FYMOOB; triangular com FipeZap
> Locação)...

---

### Mudança 14 — Block 62 (FAQ "preço médio do m² e bairros mais valorizados")

**Atual:**
> Média geral: ~R$ 11.800/m² (FipeZap, abril/2026). Bairros mais caros:
> Batel (R$ 17.924), **Bigorrilho (R$ 13.500)**, Juvevê (R$ 13.897)...

**Proposto:**
> Média geral: ~R$ 11.621/m² (FipeZap mar/2026). Bairros mais caros:
> Batel (R$ 17.924), Bigorrilho (R$ 14.117), Mossunguê (R$ 14.062),
> Juvevê (R$ 13.897). Bairros que mais valorizaram em 12 meses: Ahú
> +12,5%, Juvevê +11,5%, Bom Retiro +9,1%. Batel subiu só 6,5% — fica
> com preço alto e valorização abaixo da média da cidade.

**Justificativa:** alinha com PMQ (R$ 11.621 vs R$ 11.800; mar/26 vs
abr/26) + corrige Bigorrilho R$ 13.500 → R$ 14.117 + adiciona Mossunguê
no top.

---

### Mudança 15 — Block 36 (CTA "Calcule a rentabilidade")

**Atual:**
- title: "Calcule a rentabilidade real do seu investimento"
- description: "Informe o bairro e o tipo de imóvel — a gente devolve a
  faixa de rentabilidade observada em fechamentos recentes de Curitiba,
  não média genérica do agregado."
- label: "Falar com especialista"

**Proposto:**
- title: manter "Calcule a rentabilidade real do seu investimento"
- description: "Informe o bairro e o tipo de imóvel — a gente cruza o
  aluguel observado por tipologia com o preço-alvo e devolve a faixa
  esperada de rentabilidade."
- label: manter "Falar com especialista"

**Justificativa:** remove o "não média genérica do agregado" (de novo
implica superioridade vs FipeZap) sem perder utilidade.

---

## 4. Pontos a validar fora do escopo desta revisão

1. **Bloco 4** ("0,5%–0,7% ao mês está errado pra 2026") — o post
   afirma que esse é "o número do post antigo e de quase todo
   competidor". Não é um claim falso (0,5-0,7% é a regra prática
   histórica brasileira), mas a frase pode ser suavizada — "número
   praticado historicamente". Não vou tocar agora porque mexer no lead
   tem risco editorial.

2. **Bloco 13** (FipeZap +78% em 10 anos vs IPCA +85,8%) — números
   coerentes com FipeZap histórico mas não tem link direto. Adicionar
   link FipeZap série histórica numa próxima passada.

3. **Bloco 14** ("crédito imobiliário ~10% do PIB; EUA pré-2008 60%+") —
   números corretos historicamente mas merecem fonte. BCB Relatório de
   Estabilidade Financeira tem o número.

4. **Bloco 18** ("4,74% ao ano (FipeZap) é um dos três menores
   retornos do país") — afirmação forte. Verificar se FipeZap publica
   ranking de capitais por rentabilidade. Caso não, suavizar.

5. **Bloco 27** (Itaú reduziu 11,70 → 11,60 em dez/25; não reduziu em
   mar/26) — fact-check específico custoso. Manter por ora; se um
   leitor reportar erro, atualizar.

6. **Bloco 48** (construtoras listadas com alavancagem alta) — texto
   genérico ("algumas das maiores", sem nomear) é deliberadamente
   conservador. OK manter.

7. **Bloco 57** (matemática de comparação aluguel × financiamento) —
   números narrativos ("aluguel médio Batel R$ 49/m²"). Não é dado
   primário, é exemplo. OK manter.

---

## 5. Próximos passos

1. **Você valida este doc com ChatGPT.** Pontos especialmente
   importantes pra validar:
   - Erro de fonte Peic/CNC vs BCB faz sentido pra ele?
   - Os 4 preços do block 8 batem com o conhecimento dele do FipeZap?
   - Adicionar o contexto ADEMI-PR (queda 19% lançamentos) pesa o post
     pra "tá pior" demais ou é leitura honesta?
   - O wording do UBS 2025 ("low bubble risk; SP é a de menor risco
     entre 25") é fiel ao relatório?

2. **Após validação, traduzo em script**
   `scripts/apply-mercado-revisions.mjs` no padrão idempotente:
   - Detecção via marker textual em cada mudança
   - BLOCK_OVERRIDES com helpers de inline content
   - Re-cálculo de `word_count` + `reading_time_min`
   - Update + revalidate `/blog/mercado-imobiliario-curitiba-2026` +
     tag `blog`

3. **Próximo da fila depois deste:**
   - `quanto-custa-morar-batel-curitiba` (suavizar Condor Gourmet +
     Decreto 2668/2025)
   - `melhores-bairros-curitiba-2026` (Pequeno Príncipe pediátrico
     exclusivo)

---

## 6. Fontes consultadas pra esta auditoria

- [BCB — Endividamento das Famílias com o SFN em relação à renda 12m](https://dadosabertos.bcb.gov.br/dataset/29037-endividamento-das-familias-com-o-sistema-financeiro-nacional-em-relacao-a-renda-acumulada-dos)
  — série RNDBF, fev/2026 = 49,90%
- [Poder360 — Endividamento atinge máxima histórica, diz BC](https://www.poder360.com.br/poder-economia/endividamento-das-familias-atinge-maxima-historica-diz-bc/)
  — divulgação 27/04/2026, comprometimento mensal 29,7%
- [UBS Global Real Estate Bubble Index 2025](https://www.ubs.com/global/en/media/display-page-ndp/en-20250923-grebi25.html)
  — SP em "low bubble risk", única do BR
- [ADEMI-PR — Mercado Imobiliário CWB 2025](https://ademipr.com.br/mercado-imobiliario-de-curitiba-mantem-valorizacao-com-queda-no-estoque-e-perspectivas-para-novos-lancamentos/)
  — VGV R$ 7,4 bi, 10.200 unidades, lançamentos -19%, MCMV 5%
- [Bem Paraná — VGV R$ 7,4 bi 2025](https://www.bemparana.com.br/noticias/economia/curitiba-movimenta-r-74-bilhoes-em-vendas-de-apartamentos-em-2025/)
- Cruzamento interno com `preco-metro-quadrado-curitiba-bairro`
  (FipeZap mar/26 consolidado em tabela do site)
