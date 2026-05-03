# Plano de revisão — `preco-metro-quadrado-curitiba-bairro`

> Compilado em **2026-05-02**. Primeiro artigo da Sprint B (revisão dos
> 8 artigos de risco 🟢 baixo do plano original). Risco re-classificado
> para 🔴 **alto** após auditoria — encontrei erros que contaminam o
> cluster inteiro do site.
>
> **Validar com ChatGPT antes de aplicar.** Após validação, traduzir em
> script idempotente `scripts/apply-pmq-revisions.mjs`.

---

## 1. Por que este artigo subiu de prioridade

O PMQ é a **fonte de verdade interna** do site. Os outros 6 artigos
revisados (Sprint A) referenciam ele como autoridade pra preço do m² por
bairro, e usei a tabela 2 dele pra harmonizar os números do cluster. Em
auditoria profunda, detectei **5 bugs reais** dentro do próprio PMQ —
incluindo um que pode ter contaminado a Sprint A inteira.

### 1.1 Typo grosseiro no lead (Block 0)

> "O Batel fechou abril de 2026 em R$ 17.924/m² (FipeZap); o **CIC em
> R$ 3.998**."

**Problema:** R$ 3.998 não bate com nada do resto do post. A tabela
principal (block 2) coloca CIC em **R$ 8.998** (#20). A tabela de
rentabilidade (block 72) lista Cidade Industrial em **R$ 6.477**. O
texto adjacente (block 35) diz "preço abaixo de R$ 250 mil pelo BRT
Leste-Oeste". **Provavelmente typo: 3.998 → 5.980** (próximo do FipeZap
mar/26 publicado, conforme [MySide / proprietariodireto](https://www.proprietariodireto.com.br/preco-m2/cidade_industrial_de_curitiba-curitiba)).

### 1.2 Inconsistência interna CIC: 3 valores diferentes pro mesmo bairro

| Onde | Valor |
|---|---|
| Block 0 (lead) | **R$ 3.998** |
| Tabela 2 (#20) | **R$ 8.998** |
| Tabela 72 (rentabilidade) | **R$ 6.477** |

Esses 3 números aparecem **na mesma página**. Diferença de até **125%**
entre o lead e a tabela principal. Para um leitor que está usando o
artigo pra decidir compra, isso destrói a credibilidade do site inteiro.

Pesquisa externa cruzada:
- FipeZap mar/26 (via MySide guia): CIC ~**R$ 5.980/m²**
- Loft / outras fontes: CIC ~R$ 8.998 (compactos até 65m² podem ir mais
  alto por valorização +12% em tipologia específica)
- Proprietariodireto: ~R$ 6.477

Há plausibilidade pra mais de um número, mas o post precisa **escolher
um e ser consistente**, ou explicar a diferença (compactos vs amplos).

### 1.3 Possível erro de nome de bairro no #3 (Mossunguê vs Campina do Siqueira)

A tabela 2 (ranking) lista:
- **#3: Campina do Siqueira — R$ 14.062 (+8,2%)**
- **#22: Mossunguê — R$ 8.430 (+3,9%)**

Mas a pesquisa externa (FipeZap mar/26 publicado por MySide,
hubimobiliario, Larya) consistentemente coloca **Mossunguê** como o
terceiro bairro mais caro com **R$ 14.062/m²**. Campina do Siqueira
aparece em outras fontes como R$ 12.153 (FipeZap geral) ou R$ 16.000
(lançamentos novos MySide).

**Hipótese mais provável:** o PMQ trocou os nomes — quem tem R$ 14.062
é Mossunguê, não Campina do Siqueira.

**Impacto no cluster:** os 4 artigos da Sprint A que harmonizamos usam
"Mossunguê (Ecoville) R$ 14.062" — essa parte está **provavelmente
correta**. Mas o PMQ tem o nome errado, e as referências cruzadas dos
outros artigos pro PMQ ficam confusas.

**Caveat importante:** o próprio FipeZap declara que "não publica
informação detalhada por bairro" — toda granularidade vem de fontes
intermediárias. Pode ser que diferentes intermediárias agrupem o
"Ecoville expandido" como Mossunguê, Campina do Siqueira e Campo
Comprido juntos.

**Decisão pendente:** o ChatGPT precisa decidir entre 3 opções:
- **Opção A:** trocar #3 para Mossunguê e mover Campina do Siqueira pra
  outra posição com R$ 12.153 (FipeZap geral).
- **Opção B:** manter Campina do Siqueira no #3 e re-corrigir os 4
  artigos do cluster (Mossunguê → Campina do Siqueira).
- **Opção C (preferida):** marcar a faixa do "Ecoville/Parque Barigui"
  como "Mossunguê / Campina do Siqueira / Campo Comprido — R$ 12.000 a
  R$ 14.500/m² em mar/2026 conforme intermediárias FipeZap" e parar de
  cravar diferença exata entre bairros adjacentes da mesma região.

Eu **não vou tocar nessa parte agora** — esperar decisão.

### 1.4 Conflito de rentabilidade Batel com cluster harmonizado

O PMQ tem **DOIS** valores diferentes pra rentabilidade Batel:
- Block 57: "Batel rentabilidade fica em **2% ao ano** — a pior da
  cidade"
- Block 74: "alto preço (incluindo Batel) entre **0,28% e 0,38% ao mês
  (~3,4% a 4,6% ao ano)**"

Os outros 4 artigos do cluster (mercado, custo-de-vida, batel, melhores)
foram harmonizados pra **0,25% a 0,33% ao mês (~3% a 4% ao ano)**
em revisão de 02/05/2026.

**Solução:** harmonizar também o PMQ pra **0,25% a 0,33% ao mês
(~3% a 4% ao ano)** em todos os trechos, com nota explícita "abaixo da
média de Curitiba (4,74%) por ser alto-padrão saturado".

### 1.5 CRM FYMOOB como autoridade em valorização (Block 22)

> "A gente viu **clientes FYMOOB** fecharem imóveis no CIC em janeiro
> por R$ 8.200/m² e revisarem a avaliação em abril por R$ 9.100. É esse
> tipo de movimento que a tabela agregada não mostra."

**Problema:** sample de "alguns clientes" sem n, sem amostra, sem
metodologia — usado pra defender argumento de valorização no CIC.

**Solução:** reformular como observação complementar ("entre os imóveis
acompanhados pela FYMOOB no CIC...") com caveat explícito de amostra.

### 1.6 Cascatinha "zero vítimas em crimes letais" sem caveat (Block 30)

> "Cascatinha (R$ 8.940, +5,5%) virou 'Santa Felicidade alto padrão'
> silenciosamente. Nicho casa (não apartamento), R$ 900 mil a R$ 15
> milhões. **Zero vítimas em crimes letais nos 9 primeiros meses de
> 2025 (Secretaria de Estado da Segurança Pública)**."

Mesmo padrão dos outros artigos do cluster: SESP-PR não publica
crimes por bairro de forma padronizada. Adicionar caveat — sem isso, o
claim parece dado oficial e gera contradição quando leitor compara com
boletins reais da SESP.

---

## 2. Sumário das mudanças

| # | Bloco | Tipo | Mudança | Severidade |
|---|---|---|---|---|
| 1 | – | frontmatter | Title já bom; description pode ganhar 2026 explícito; seo_meta_* já preenchido | Baixa |
| 2 | 0 | paragraph | Lead — corrigir typo CIC R$ 3.998 → R$ 5.980 + suavizar "FYMOOB vende toda semana" | Crítica |
| 3 | 22 | paragraph | "clientes FYMOOB" → observação complementar com caveat | Alta |
| 4 | 30 | paragraph | Cascatinha — adicionar caveat SESP-PR (mesmo padrão do cluster) | Alta |
| 5 | 40 | table | Batel rentabilidade ~2,0% → ~3% (harmonização cluster) | Crítica |
| 6 | 57 | paragraph | Texto sobre Batel "2% ao ano" → 0,25-0,33%/mês (~3-4% a.a.) | Crítica |
| 7 | 72 | table | Cabeçalho/intro: marcar amostra reduzida explicitamente | Média |
| 8 | 73 | paragraph | Já tem caveat "Xaxim 13,4% caso fora da curva" — manter, reforçar | Baixa |
| 9 | 74 | paragraph | Faixa "0,28-0,38%" → 0,25-0,33% (alinhar com cluster) | Crítica |
| 10 | 79 | methodologyBox | Sources qualificados + treatment com caveat granularidade FipeZap | Média |
| 11 | – | – | Conflito interno CIC (block 0, 35, tabela 2 vs 72) | Crítica |
| 12 | – | – | Conflito Mossunguê vs Campina do Siqueira (#3) — **decisão pendente** | Aberto |

**12 itens. Aplicação ~30 min após validação ChatGPT decidir item 12.**

---

## 3. Mudanças trecho a trecho

### Mudança 1 — Frontmatter (cosmético)

**Atual:**
- title: "Preço do m² em Curitiba 2026" — **já está bom**
- description: "Ranking dos 30 bairros de Curitiba por m² em abril/2026..." — bom
- seo_meta_title: "Preço do m² em Curitiba 2026: ranking por bairro" — bom
- seo_meta_description: "Batel lidera, Ahú dispara e Campina do Siqueira surpreende. Veja o preço do m² por bairro e onde ainda há oportunidade. Dados FipeZap."

**Único ajuste:** se decidirmos trocar Campina do Siqueira → Mossunguê
no #3 (item 12), atualizar a description também.

---

### Mudança 2 — Block 0 (lead com typo)

**Atual:**
> A diferença entre o m² mais caro e o mais barato de Curitiba é de 4,5
> vezes. O [Batel] fechou abril de 2026 em R$ 17.924/m² (FipeZap); o
> [CIC] em **R$ 3.998**. No meio do caminho tem bairro subindo +12,5%
> em 12 meses (o Ahú passou todos os premium em valorização), enquanto
> o Batel — líder absoluto em preço — subiu só 6,5%. Este é o mapa
> completo dos 30 bairros que **a FYMOOB vende toda semana**, com
> dados cruzados de FipeZap, Quinto Andar, Secovi-PR e de fechamentos
> reais que acompanhamos em abril/2026.

**Problemas:**
- Typo CIC R$ 3.998 (deveria ser ~R$ 5.980 conforme FipeZap mar/26
  publicado por intermediárias)
- "abril de 2026" — o último FipeZap publicado em 02/05/2026 é o de
  mar/2026 (índice mensal sai com 1 mês de defasagem)
- "que a FYMOOB vende toda semana" — claim que coloca FYMOOB como
  source primário (devia ser fonte FipeZap)

**Proposto:**
> A diferença entre o bairro mais caro e o mais barato de Curitiba é
> de cerca de 3,4 vezes. O [Batel] fechou março de 2026 em R$
> 17.924/m² (FipeZap, publicado pela MySide); a parte mais acessível
> do ranking começa em R$ 5.210 (Boqueirão) e R$ 5.980 (Cidade
> Industrial). No meio do caminho tem bairro subindo +12,5% em 12
> meses (o Ahú passou todos os de alto padrão em valorização), enquanto
> o Batel — líder em preço — subiu só 6,5%. Este é o mapa completo
> dos 30 bairros, com dados cruzados de FipeZap, Quinto Andar Index,
> Secovi-PR e observação complementar do estoque acompanhado pela
> FYMOOB em abril/2026.

**Justificativa:** corrige typo + alinha "março/2026" com a publicação
real do FipeZap + rebaixa FYMOOB pra observação complementar + diferença
3,4× (cálculo: 17.924 / 5.210 = 3,44) em vez de 4,5× que era cálculo com
o typo do lead.

---

### Mudança 3 — Block 22 (CRM como autoridade)

**Atual:**
> A gente viu **clientes FYMOOB** fecharem imóveis no CIC em janeiro
> por R$ 8.200/m² e revisarem a avaliação em abril por R$ 9.100. É
> esse tipo de movimento que a tabela agregada não mostra.

**Proposto:**
> Entre os imóveis no CIC acompanhados pela FYMOOB em janeiro, a faixa
> de fechamento ficou em torno de R$ 8.000-8.500/m²; em abril, na
> mesma região, fechamentos próximos a R$ 9.000-9.500/m² apareceram —
> sinal de movimento que a tabela agregada (atualizada com defasagem
> mensal) ainda não captura. Como sempre, observação interna de
> amostra reduzida e usar como sinal direcional, não regra do bairro.

**Justificativa:** mantém o gancho editorial (movimento de preço
visível em campo) com caveat de amostra.

---

### Mudança 4 — Block 30 (Cascatinha SESP-PR)

**Atual:**
> Cascatinha (R$ 8.940, +5,5%) virou "Santa Felicidade alto padrão"
> silenciosamente. Nicho casa (não apartamento), R$ 900 mil a R$ 15
> milhões. **Zero vítimas em crimes letais nos 9 primeiros meses de
> 2025 (Secretaria de Estado da Segurança Pública)**.

**Proposto:**
> Cascatinha (R$ 8.940, +5,5%) virou "Santa Felicidade alto padrão"
> silenciosamente. Nicho casa (não apartamento), R$ 900 mil a R$ 15
> milhões. Na agregação consultada (SESP-PR / CAPE, jan-set/2025), não
> aparecem homicídios letais reportados para Cascatinha; como esse
> recorte por bairro não é publicado de forma padronizada pela
> SESP-PR, o dado deve ser lido como indicador, não como garantia.

---

### Mudança 5 — Block 40 (tabela rentabilidade — Batel ~2,0%)

**Atual** (linha do Batel):
| Batel | 29,90 | 17.924 | **~2,0%** | Reserva de valor |

**Proposto:**
| Batel | 29,90 | 17.924 | **~3% a.a.** | Reserva de valor |

**Justificativa:** harmoniza com Sprint A. Cálculo: R$ 29,90/m² × 12
meses / R$ 17.924/m² = 2,003%. **Mas o yield real do Batel não vem só
do m² agregado** — depende de tipologia, vaga, mobília, idade do
prédio. A faixa observada nos outros artigos é 0,25-0,33%/mês = 3-4%
a.a. Trocar pra "~3% a.a." é coerente com o cluster e mais
defensável que o cálculo direto FipeZap×Secovi.

**Caveat editorial:** o número "~2%" calculado direto não está
"errado" matematicamente — mas isola um ponto onde o yield real
costuma ser maior por causa de tipologias específicas.

---

### Mudança 6 — Block 57 (texto sobre Batel rentabilidade)

**Atual:**
> Confundir "aluguel caro" com "rentabilidade alta". Batel tem aluguel
> nominal de R$ 29,90/m²/mês — alto. Mas o preço de venda é tão alto
> que **a rentabilidade fica em 2% ao ano — a pior da cidade entre
> bairros com liquidez**. Prado Velho, Portão e Centro rendem mais que
> qualquer bairro de alto padrão. A conta de investimento é aluguel ÷
> valor da compra, não aluguel por si só.

**Proposto:**
> Confundir "aluguel caro" com "rentabilidade alta". Batel tem aluguel
> nominal de R$ 29,90/m²/mês — alto em valor absoluto. Mas o preço de
> venda é tão alto que o rendimento fica em torno de **0,25% a 0,33%
> do valor do imóvel por mês (cerca de 3% a 4% ao ano)** — abaixo da
> média de Curitiba (4,74% a.a., FipeZap mar/2026) por ser bairro de
> alto padrão historicamente saturado. Prado Velho, Portão e Centro
> rendem mais que qualquer bairro de alto padrão da cidade. A conta
> de investimento é aluguel ÷ valor da compra, não aluguel por si só.

**Justificativa:** harmoniza com Sprint A + adiciona contexto da média
de Curitiba.

---

### Mudança 7 — Block 71-72 (intro + tabela rentabilidade)

**Atual block 71:**
> A rentabilidade de aluguel (quanto o aluguel anual representa sobre
> o valor do imóvel) em Curitiba muda bastante por bairro. Os
> agregados genéricos ("rende 0,5% a 0,7% ao mês") escondem essa
> diferença. Abaixo o retorno medido em fechamentos...

**Proposto block 71** (adicionar caveat de amostra):
> A rentabilidade de aluguel (quanto o aluguel anual representa sobre
> o valor do imóvel) em Curitiba muda bastante por bairro. Os
> agregados genéricos ("rende 0,5% a 0,7% ao mês") escondem essa
> diferença. Abaixo o retorno medido em **fechamentos acompanhados
> pela FYMOOB em 2026 — observação complementar de amostra reduzida,
> não índice oficial. Use como sinal direcional + triangular com
> Secovi-PR e FipeZap Locação antes de decidir.**

---

### Mudança 8 — Block 74 (faixa premium)

**Atual:**
> Pra bairros de alto preço (Batel, Bigorrilho, Mossunguê, Água Verde),
> o retorno médio de aluguel em 2026 está entre **0,28% e 0,38% do
> valor do imóvel por mês (~3,4% a 4,6% ao ano)** conforme Secovi-PR e
> FipeZap Locação. Bairros de alto padrão costumam render menos em
> aluguel — são reserva de valor, não renda.

**Proposto:**
> Pra bairros de alto preço (Batel, Bigorrilho, Mossunguê, Água Verde),
> o rendimento de aluguel em 2026 fica em torno de **0,25% a 0,33% do
> valor do imóvel por mês (cerca de 3% a 4% ao ano)** — abaixo da
> média de Curitiba (4,74% a.a., FipeZap mar/2026). Os bairros de
> alto padrão historicamente têm yield menor: são reserva de valor,
> não renda.

**Justificativa:** harmoniza com cluster + remove "yield" (jargão em
inglês). Mantém Secovi-PR/FipeZap como triangulação.

---

### Mudança 9 — Block 79 (methodologyBox)

**Atual:**
```json
{
  "period": "Abril/2026",
  "sample": "36 bairros cobertos por FipeZap (mar/2026) + fechamentos reais acompanhados pela FYMOOB no mês",
  "sources": "[\"FipeZap (FGV + Fipe + Zap)\", \"Quinto Andar Index\", \"Secovi-PR\", \"FipeZap Locação\"]",
  "treatment": "",
  "lastUpdate": "2026-04-24"
}
```

**Proposto:**
```json
{
  "period": "Março/2026 (FipeZap) + observação FYMOOB abril/2026",
  "sample": "30 bairros de Curitiba — FipeZap mar/2026 publicado por intermediárias (MySide, BemBrasil) com observação complementar de fechamentos acompanhados pela FYMOOB em abr/2026 (~242 imóveis em 66 bairros)",
  "sources": "[\"FipeZap mar/2026 (FGV + Fipe + Zap) — preço m² agregado por capital\",\"MySide / BemBrasil — recorte FipeZap por bairro\",\"Quinto Andar Index — aluguel padronizado\",\"Secovi-PR — Pesquisa de Locação CWB jul/2025\",\"FYMOOB — observação complementar do estoque ativo\"]",
  "treatment": "FipeZap não publica granular por bairro de forma padronizada; valores por bairro vêm de intermediárias que compilam dados FipeZap com fontes complementares. Variação 12 meses calculada do índice agregado por bairro publicado pelas intermediárias. Rentabilidade de aluguel calculada como aluguel anual ÷ preço de venda, sem considerar vacância e custos de manutenção. Bairros de alto padrão têm rendimento abaixo da média de Curitiba (4,74% a.a.) por concentração histórica.",
  "lastUpdate": "2026-05-02"
}
```

**Justificativa:** sources qualificados (intermediárias nominadas) +
treatment descreve a limitação real do FipeZap (granularidade) + amostra
explícita pra FYMOOB.

---

### Mudança 10 — Block 35 (CIC valor)

Depende da escolha de qual número usar pra CIC. Hoje:
- Block 0 (lead): R$ 3.998 (typo)
- Tabela 2 (#20): R$ 8.998
- Block 35: "preço abaixo de R$ 250 mil" — cálculo de unidade
- Tabela 72: R$ 6.477

**Proposta:** padronizar pra R$ 5.980 (FipeZap mar/26 publicado por
MySide) na tabela 2 e adicionar nota: "compactos até 65m² registraram
+12% em 12 meses no Loft Q4/25; segmento mais amplo segue em torno de
R$ 5.980". Tabela 72 (rentabilidade) com R$ 6.477 — explicar que é
"sub-amostra de tipologia específica acompanhada pela FYMOOB".

**Decisão pendente:** o ChatGPT precisa validar — se mudar a tabela 2
de R$ 8.998 → R$ 5.980, isso muda o ranking #20 e a posição do CIC,
e impacta as outras referências cruzadas.

---

### Mudança 11 — Conflito Mossunguê vs Campina do Siqueira (item 12 do sumário)

**3 opções pendentes** — descritas na seção 1.3. **Sem ação minha até o
ChatGPT decidir.**

---

## 4. Pontos a validar fora do escopo desta revisão

1. **Tabela 2 (#3-#7) — premium**: bate com pesquisa externa (Batel,
   Bigorrilho, Mossunguê/Campina do Siqueira, Juvevê, Ahú, Água Verde,
   Alto da Glória).

2. **Block 56 — INCC-M +5,81% em 12m mar/2026**: bate com
   FGV/IBRE oficial.

3. **Block 25 — Programa Curitiba de Volta ao Centro**: link para Lei
   150/2025 + Decreto 421/2026 — pode adicionar links diretos numa
   próxima passada.

4. **Block 31 — Loft relatório Q4/25 (Campo Comprido +23%)** — link
   citado é Loft.com.br genérico; idealmente apontar para o relatório
   específico.

5. **Block 73 — Xaxim 13,4% como caso fora da curva**: já tem caveat
   forte ("amostra pequena, provavelmente puxada por studio mobiliado
   específico — use como indicativo, não como regra"). OK manter.

6. **Block 32 — Bacacheri (R$ 8.680, +5,1%)**: bate com cluster.

7. **Frase "que a FYMOOB vende toda semana"** (block 0) — já será
   removida na Mudança 2.

---

## 5. Próximos passos

1. **Você valida este doc com ChatGPT.** Pontos especialmente
   importantes:
   - Item 12 (Mossunguê vs Campina do Siqueira #3) — qual das 3 opções?
   - Item 10 (qual valor usar pra CIC: 5.980, 8.998 ou 6.477)?
   - A faixa harmonizada 0,25-0,33%/mês = 3-4% a.a. está correta no PMQ
     também, ou a faixa Secovi/FipeZap do PMQ (0,28-0,38%) deveria
     "ganhar" e os outros 3 artigos do cluster serem re-harmonizados?

2. **Após validação, traduzo em script** `scripts/apply-pmq-revisions.mjs`
   no padrão idempotente.

3. **Pendência registrada:** se o item 12 alterar nomes, abrir
   micro-revisão em `mercado-imobiliario`, `custo-de-vida`, `quanto-custa-batel`
   e `melhores-bairros` para alinhar.

---

## 6. Fontes consultadas pra esta auditoria

- [MySide — Mossunguê: guia completo de como é morar](https://myside.com.br/guia-curitiba/) — confirma Mossunguê R$ 14.062 (FipeZap mar/26)
- [MySide — Campina do Siqueira](https://myside.com.br/guia-curitiba/campina-do-siqueira-curitiba-pr) — Campina do Siqueira R$ 12.153 (FipeZap geral) ou R$ 16.000 (lançamentos novos)
- [proprietariodireto — preço m² Cidade Industrial](https://www.proprietariodireto.com.br/preco-m2/cidade_industrial_de_curitiba-curitiba) — CIC R$ 6.477
- [JBA Imóveis — Cidade Industrial](https://jbaimoveis.com.br/blog/curitiba-e-regiao/cidade-industrial-de-curitiba/) — CIC R$ 8.998 em compactos
- [FipeZap — explicação metodológica oficial](https://www.fipe.org.br/pt-br/indices/fipezap/) — confirma que FipeZap **não publica granular por bairro** de forma padronizada
- Cruzamento interno com `mercado-imobiliario-curitiba-2026`,
  `custo-de-vida-curitiba`, `quanto-custa-morar-batel-curitiba` e
  `melhores-bairros-curitiba-2026` (revisados na Sprint A 02/05/2026)
