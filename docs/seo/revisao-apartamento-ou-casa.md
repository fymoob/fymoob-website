# Plano de revisão — `apartamento-ou-casa-curitiba`

> Compilado em **2026-05-02**. Sprint B — quarto artigo (após PMQ,
> Ecoville×Bigorrilho, Batel×Água Verde). Risco original 🟢 baixo
> (plano geral). Auditoria confirmou — só correções cirúrgicas.
>
> **Validar com ChatGPT antes de aplicar.** Após validação, traduzir
> em script idempotente `scripts/apply-apartamento-casa-revisions.mjs`.
>
> Padrão editorial: linguagem PT-BR limpa, sem jargões em inglês, sem
> palavras duplicadas, sem typos.

---

## 1. Diagnóstico

O artigo é **um dos mais robustos do cluster**: 9+ fontes externas
linkadas (IBGE PNAD/Censo, FipeZap, Inpespar, Loft, ADEMI-PR, STJ,
ABNT, Lei Municipal), methodology box já tem sources qualificados,
n declarado nas tabelas (n=11+5, n=4+8), caveat em Imobi Press já
existe. Auditoria detectou só ajustes cirúrgicos para alinhar com
cluster.

### 1.1 Title com número específico (incomum no cluster)

**Atual:** "Casa ou Apartamento em Curitiba? 60% Mora em Casa"

Pelo padrão do cluster (validado nos 8 artigos anteriores), titles
não cravam números — só descrição. O "60%" é gancho forte mas vai
contra a regra editorial estabelecida ("title matcha intent, número
fica pra description"). Trocar para sentence case sem número.

### 1.2 CRM FYMOOB como fonte primária no callout principal (block 2)

> Em Curitiba, 60% das famílias ainda mora em casa (IBGE PNAD 2026),
> mas o apto avança rápido. **No CRM FYMOOB, em Portão, casa custa
> +42% que apto no valor mediano**. Em Água Verde, sobrado de 260 m²
> sai 23% mais barato que apto de 130 m². A escolha depende do bairro.

CRM FYMOOB aparece como fonte autoritativa no primeiro callout do
artigo. Mesmo padrão dos outros artigos do cluster: rebaixar pra
"observação complementar".

### 1.3 Tabelas com "CRM FYMOOB" sem caveat de amostra explícito

- **Tabela 10** (comparativo direto): primeira linha "R$/m² mediano
  CWB (CRM FYMOOB) — R$ 13.043 / R$ 4.732 / R$ 5.902"
- **Tabela 14** (diferença por bairro): n declarado por linha (bom),
  mas amostra reduzida (n=4-11) sem caveat de viés.

Adicionar caveat de amostra reduzida + viés de captação na nota
abaixo das tabelas.

### 1.4 "49% / 59%" via Imobi Press (Tier 4) sem caveat

> Pesquisa nacional de 2025 mostra que 49% dos brasileiros entre 22 e
> 28 anos querem comprar imóvel em até 2 anos, e 59% deles preferem
> apartamento ([Imobi Press]).

Plano original (article-revision-plan-2026-05-02.md) já flagueou:
"buscar pesquisa original (DataFolha? IBGE? Brain Inteligência?)".
Imobi Press é Tier 4 (mídia secundária). Sem ter fonte primária pra
trocar, suavizar wording — "pesquisa nacional citada por Imobi Press
sugere..." em vez de cravar 49%.

### 1.5 IPTU: alinhar referência com cluster

Block 47 cita:
> alíquota residencial CWB de 0,20% a 0,65% sobre valor venal
> (Prefeitura). Apto compacto até 70 m² com valor venal ≤ R$ 232 mil
> pode entrar em isenção (Decreto IPTU 2026) — 80% dos imóveis CWB
> tiveram correção só pelo IPCA em 2026

Cluster harmonizado usa **Decreto 2668/2025** (assinado 19/12/2025) +
LC 149/2025 + EC 132/2023. Linkar diretamente.

### 1.6 +97% lançamentos casa em condomínio H1/2023 (dado antigo)

Block 64 cita pesquisa ADEMI-PR de 2023 ("H1/2023 vs H1/2022"). Já
tem caveat "base pequena — apenas 494 unidades", o que é honesto.
Mas o dado tem 3 anos — adicionar nota explicando que é referência
histórica, não estado atual.

### 1.7 methodologyBox vazio em campos críticos

- `sample` vazio (deveria ter "n=214 imóveis CWB")
- `treatment` vazio
- `lastUpdate` em 2026-04-25

Preencher os 3 campos com caveat de amostra + dupla leitura padrão
do cluster.

### 1.8 Frontmatter

- title com número (ver 1.1)
- description cita "FYMOOB CRM" como fonte primária — rebaixar
- seo_meta_title: NULL
- seo_meta_description: NULL

---

## 2. Sumário das mudanças

| # | Bloco | Tipo | Mudança | Severidade |
|---|---|---|---|---|
| 1 | – | frontmatter | Title sem número + sentence case + description sem "FYMOOB CRM" + seo_meta_* | Média |
| 2 | 0 | paragraph | Lead — alinhar datas FipeZap (já está mar/2026 no block 7) | Baixa |
| 3 | 2 | calloutBox | Resposta direta — rebaixar CRM FYMOOB pra "observação complementar" | Alta |
| 4 | 7 | paragraph | "Imobi Press 49%/59%" — suavizar com caveat de Tier 4 | Alta |
| 5 | 9 | paragraph | "mediana real do CRM FYMOOB" → "amostra acompanhada pela FYMOOB" | Média |
| 6 | 10 | table | Caveat na cabeçalho "CRM FYMOOB" + nota explicativa abaixo | Média |
| 7 | 13 | paragraph | Wording — "snapshot do CRM FYMOOB" → "estoque acompanhado" | Baixa |
| 8 | 14 | table | Caveat na cabeçalho + nota de viés de amostra | Alta |
| 9 | 25 | paragraph | "Inpespar 2024" — adicionar nota de data | Baixa |
| 10 | 47 | bullet | IPTU — Decreto 2668/2025 + LC 149/2025 + EC 132/2023 com link | Média |
| 11 | 64 | paragraph | "+97% horizontais H1/2023" — caveat de "dado de 3 anos atrás" | Média |
| 12 | 73 | paragraph | "casas grandes ≥3Q valorizam menos" — suavizar (sem fonte) | Baixa |
| 13 | 79 | paragraph | "casa-conceito ≤R$ 400 mil" — observação FYMOOB com caveat | Baixa |
| 14 | 97 | ctaBox | CTA — alinhar com cluster ("Comparar casa × apto" mais consultivo) | Média |
| 15 | 3 | methodologyBox | Preencher sample + treatment + lastUpdate | Média |
| 16 | – | inserção opcional | Tabela inicial "Qual cabe no seu perfil?" antes dos 4 perfis | Baixa (extra) |

16 itens. Aplicação ~25 min após validação.

---

## 3. Mudanças trecho a trecho

### Mudança 1 — Frontmatter

**Atual:**
- title: **"Casa ou Apartamento em Curitiba? 60% Mora em Casa"**
- description: "Comparativo casa vs apartamento em Curitiba 2026 com IBGE PNAD (60% mora em casa), FipeZap, **FYMOOB CRM** e custos invisíveis ancorados em fonte primária. Por perfil e bairro."
- seo_meta_title: NULL
- seo_meta_description: NULL

**Proposto:**
- title: **"Casa ou apartamento em Curitiba? Comparativo por bairro e perfil em 2026"** (sem cravar 60% — segue padrão do cluster)
- description: **"Comparativo casa × apartamento em Curitiba em 2026: IBGE PNAD (a maioria ainda mora em casa), FipeZap, custos invisíveis e diferença real por bairro com observação acompanhada pela FYMOOB."** (FYMOOB rebaixada)
- seo_meta_title: **"Casa ou apartamento em Curitiba? Comparativo 2026"**
- seo_meta_description: **"Maioria ainda mora em casa, mas o mercado vira apartamento. Compare preço, custos invisíveis, regras de pet e perfil ideal por bairro."**

**Justificativa:** alinha com padrão do cluster + rebaixa CRM.

---

### Mudança 2 — Block 0 (lead)

**Atual:**
> Em abril/2026, 59,3% dos curitibanos ainda moram em casa e 40,5% em
> apartamento, segundo a IBGE PNAD Contínua 2026 divulgada em
> 17/abril/2026 (719 mil domicílios na capital). Mas o sentido do
> mercado mudou: em 10 anos, casas caíram 6,8% e apartamentos
> cresceram +53,7%...

**Avaliação:** OK. "Abril/2026" é correto aqui (PNAD divulgada em
abril/2026 com dado-base 2025). FipeZap é citado em outros blocks
como mar/2026.

**Único ajuste:** trocar "Em abril/2026" → "Em 2026" no lead
(simplificação — a data exata "17/abril/2026" já aparece a seguir).

> Em **2026**, 59,3% dos curitibanos ainda moram em casa e 40,5% em
> apartamento, segundo a IBGE PNAD Contínua 2026 divulgada em
> 17/abril/2026 (719 mil domicílios na capital)...

**Justificativa:** evita redundância de "abril/2026 ... abril/2026"
no mesmo parágrafo.

---

### Mudança 3 — Block 2 (callout "Resposta direta")

**Atual:**
> Em Curitiba, 60% das famílias ainda mora em casa (IBGE PNAD 2026),
> mas o apto avança rápido. **No CRM FYMOOB, em Portão, casa custa
> +42% que apto no valor mediano**. Em Água Verde, sobrado de 260 m²
> sai 23% mais barato que apto de 130 m². A escolha depende do bairro.

**Proposto:**
> Em Curitiba, **60% das famílias ainda mora em casa** (IBGE PNAD
> 2026), mas o apartamento avança rápido. Como observação
> complementar, no estoque acompanhado pela FYMOOB em abril/2026, em
> Portão a casa fica em torno de **+42% mais cara que o apartamento**
> no valor mediano (n=11+5); em Água Verde, um sobrado de 260 m² sai
> ~23% mais barato que um apartamento de 130 m² (n=4+8) — mas
> entrega 2× a área. **A escolha depende do bairro.**

**Justificativa:** mantém o gancho ("a escolha depende do bairro") +
explicita que é observação FYMOOB com n declarado + adiciona
contexto de área (apto×casa não compara direto pelo R$).

---

### Mudança 4 — Block 7 (Imobi Press 49%/59%)

**Atual:**
> A geração que está comprando reforça a tendência. **Pesquisa nacional
> de 2025 mostra que 49% dos brasileiros entre 22 e 28 anos querem
> comprar imóvel em até 2 anos, e 59% deles preferem apartamento**
> (Imobi Press). Em Curitiba, o Inpespar/Radar Imobiliário (abril/2026)
> registrou que 67% das buscas em portais imobiliários da cidade são
> por apartamento de até 70 m² — em 2023, eram 60%.

**Proposto:**
> A geração que está comprando reforça a tendência. Uma pesquisa
> nacional de 2025 citada pelo [Imobi Press](URL) sugere que cerca de
> metade dos brasileiros entre 22 e 28 anos quer comprar imóvel em
> até 2 anos, com preferência pelo apartamento — o número específico
> varia entre fontes secundárias e a pesquisa primária não foi
> publicada abertamente. Em Curitiba, o Inpespar/Radar Imobiliário
> (abril/2026) registrou que 67% das buscas em portais imobiliários
> da cidade são por apartamento de até 70 m² — em 2023, eram 60%.

**Justificativa:** suaviza claim de "49%/59%" (Tier 4 sem fonte
primária) sem perder a tese (jovem prefere apto). Mantém o dado
forte do Inpespar/Radar (Tier 2-3, com fonte CWB direta).

---

### Mudança 5 — Block 9 (intro tabela 10)

**Atual:**
> Sem omissão. Cada linha amarra um número — **mediana real do CRM
> FYMOOB** ou referência externa linkada.

**Proposto:**
> Sem omissão. Cada linha amarra um número — **medianas observadas no
> estoque acompanhado pela FYMOOB** (com n declarado e caveat de
> amostra) ou referência externa linkada.

**Justificativa:** "mediana real" sugere autoridade estatística;
"medianas observadas" é mais honesto + caveat de amostra.

---

### Mudança 6 — Block 10 (tabela comparativo direto)

**Atual** (cabeçalho da primeira linha):
> | R$/m² mediano CWB (CRM FYMOOB) | R$ 13.043 | R$ 4.732 | R$ 5.902 |

**Proposto:**
> | R$/m² mediano (observação FYMOOB, n=214) | R$ 13.043 | R$ 4.732 | R$ 5.902 |

E adicionar parágrafo de caveat **abaixo da tabela** (entre o block
10 e o block 11):

> Os valores de R$/m² e mediana de venda vêm do estoque acompanhado
> pela FYMOOB em abril/2026 (n=214 imóveis com valor de venda
> declarado). Use como sinal direcional, não como índice estatístico
> — amostra reduzida + viés de captação (portfólio FYMOOB tende a
> alto-padrão). Triangular com FipeZap mar/2026 (média Curitiba R$
> 11.621/m²) antes de cravar decisão.

**Justificativa:** explicita amostra + caveat de viés (mesmo padrão
do mercado-imobiliario revisado).

---

### Mudança 7 — Block 13 (intro tabela 14)

**Atual:**
> Aqui está o ângulo que nenhum guia genérico cobre: a diferença de
> preço casa-vs-apto inverte de sinal dependendo do bairro. Estes são
> números **do snapshot do CRM FYMOOB de 25/abril/2026**, com n
> declarado por linha (mínimo 3 imóveis de cada lado para puxar
> mediana — não cravamos comparação onde a amostra é menor):

**Proposto:**
> Aqui está o ângulo que nenhum guia genérico cobre: a diferença de
> preço casa × apto inverte de sinal dependendo do bairro. Os
> números abaixo vêm do **estoque acompanhado pela FYMOOB** em
> 25/abril/2026, com n declarado por linha (mínimo 3 imóveis de cada
> lado para puxar mediana — não comparamos onde a amostra é menor):

**Justificativa:** "snapshot do CRM" → "estoque acompanhado" (mesmo
padrão dos outros artigos).

---

### Mudança 8 — Block 14 (tabela bairros) + nota

**Atual** (cabeçalho da tabela): mantém bairro/apto/casa-conceito mas
sem caveat agregado.

**Proposto:** manter tabela igual + **adicionar parágrafo de caveat
abaixo** (entre block 14 e block 15):

> Amostra reduzida (n=4-11 por bairro) e observada no estoque ativo
> da FYMOOB. Os números servem como sinal de tendência por bairro,
> não como mediana de mercado padronizada — variação por imóvel
> específico (idade do prédio, vaga, área útil) é grande dentro de
> cada faixa.

**Justificativa:** caveat consistente com cluster.

---

### Mudança 9 — Block 25 (Inpespar 2024)

**Atual:**
> Apartamento compacto vence. O estoque de locação residencial CWB é
> 1,3% do total (**Inpespar 2024**) e a esmagadora maioria é apto.
> Casa pra alugar em CWB é nicho.

**Proposto:**
> Apartamento compacto vence. O estoque de locação residencial em
> Curitiba é uma fatia pequena do total (em torno de 1,3%, conforme
> Inpespar 2024 — número antigo, mas a proporção historicamente é
> baixa) e a maioria é apartamento. Casa pra alugar em CWB é nicho.

**Justificativa:** marca dado como "antigo mas direcional".

---

### Mudança 10 — Block 47 (IPTU + Decreto)

**Atual:**
> IPTU: alíquota residencial CWB de 0,20% a 0,65% sobre valor venal
> (**Prefeitura**). Apto compacto até 70 m² com valor venal ≤ R$ 232
> mil pode entrar em isenção (**Decreto IPTU 2026**) — 80% dos
> imóveis CWB tiveram correção só pelo IPCA em 2026

**Proposto:**
> IPTU: alíquota residencial CWB de 0,20% a 0,65% sobre valor venal
> (Prefeitura de Curitiba). Apartamento compacto até 70 m² com valor
> venal ≤ R$ 232 mil pode entrar em isenção
> ([Decreto Municipal 2668/2025](https://www.legisweb.com.br/legislacao/?id=488328),
> assinado em 19/12/2025, sob a regra da
> [LC 149/2025](https://www.curitiba.pr.gov.br/noticias/decreto-municipal-estabelece-nova-base-de-calculo-do-iptu-80-dos-imoveis-terao-imposto-corrigido-apenas-pela-inflacao-em-2026/81201)) —
> 80% dos imóveis em Curitiba tiveram correção apenas pelo IPCA em
> 2026.

**Justificativa:** alinha com cluster (Decreto 2668/2025 + LC
149/2025 nominados em outros artigos).

---

### Mudança 11 — Block 64 (+97% horizontais H1/2023)

**Atual:**
> No outro eixo, lançamentos de casas em condomínio horizontal
> subiram **+97% no primeiro semestre de 2023 vs primeiro semestre de
> 2022**, segundo pesquisa ADEMI-PR. É preciso qualificar: a base é
> pequena — apenas 494 unidades em casas e lotes em condomínios
> fechados em CWB no semestre. Não é boom absoluto. Os bairros
> líderes são São Braz, Santa Felicidade, Pilarzinho e Campo
> Comprido. O que se inverte não é "casa morreu" — é casa isolada
> perdendo terreno para casa em condomínio fechado.

**Proposto:**
> No outro eixo, lançamentos de casas em condomínio horizontal
> subiram **+97% no primeiro semestre de 2023 vs primeiro semestre
> de 2022**, segundo pesquisa ADEMI-PR (referência histórica — o
> dado é de 3 anos atrás). É preciso qualificar: a base é pequena —
> apenas 494 unidades em casas e lotes em condomínios fechados em
> CWB no semestre. Não é boom absoluto. Os bairros líderes na
> ocasião eram São Braz, Santa Felicidade, Pilarzinho e Campo
> Comprido. O que se observa em tendência longa não é "casa morreu"
> — é casa isolada perdendo terreno para casa em condomínio fechado.

**Justificativa:** explicita data antiga + verbo no passado pra
"bairros líderes" (3 anos atrás pode ter mudado).

---

### Mudança 12 — Block 73 (casas grandes valorizam menos)

**Atual:**
> Em Curitiba 2025, FipeZap registrou +6,52% de alta no m² médio de
> venda residencial — a 2ª maior em 11 anos. O índice é puxado por
> apartamento (a maioria dos anúncios). Apartamentos compactos (1
> quarto) cresceram +7,80% em 12 meses no agregado nacional FipeZap;
> 4 quartos ou mais, só +5,57%. **Casas grandes (≥3 quartos) tendem
> a valorizar menos no agregado**. Mas o terreno embutido em casa
> térrea de Cabral, Juvevê ou Cascatinha não desvaloriza — e
> bairros que viram tendência podem inverter o jogo.

**Proposto:**
> Em Curitiba 2025, FipeZap registrou +6,52% de alta no m² médio de
> venda residencial — a 2ª maior em 11 anos. O índice é puxado por
> apartamento (a maioria dos anúncios FipeZap). Apartamentos
> compactos (1 quarto) cresceram +7,80% em 12 meses no agregado
> nacional FipeZap; tipologias com 4 quartos ou mais, só +5,57%.
> Como o índice agrega imóveis verticais, casas grandes ficam fora
> da medição direta. Em geral, terreno embutido em casa térrea de
> bairros consolidados (Cabral, Juvevê, Cascatinha) não desvaloriza
> — e bairros em tendência de alta podem inverter o jogo.

**Justificativa:** remove claim "casas grandes ≥3Q valorizam menos"
(que não tem fonte direta) + explica limitação metodológica do
FipeZap (não cobre casas).

---

### Mudança 13 — Block 79 (casa-conceito ≤R$ 400 mil)

**Atual:**
> No CRM FYMOOB, casa-conceito (Casa avulsa + Sobrado + Casa em
> Condomínio) abaixo de R$ 400 mil concentra-se em Tatuquara, Sítio
> Cercado, Campo de Santana e Cidade Industrial — todos zona
> sul/sudoeste. Casa de R$ 220 mil em Tatuquara existe (mesmo piso
> de apto compacto na cidade). Em bairros nobres acima de R$ 1,5
> milhão, casa praticamente some do estoque (apenas 4 imóveis
> casa-conceito em todo o universo CWB com valor_venda no snapshot).

**Proposto:**
> No estoque acompanhado pela FYMOOB em abril/2026, casa-conceito
> (casa avulsa + sobrado + casa em condomínio) abaixo de R$ 400 mil
> concentra-se em Tatuquara, Sítio Cercado, Campo de Santana e
> Cidade Industrial — zona sul/sudoeste. Casa de R$ 220 mil em
> Tatuquara aparece no estoque (mesmo piso de apartamento compacto
> em outros bairros). Em bairros nobres acima de R$ 1,5 milhão, a
> casa quase desaparece do nosso recorte (apenas 4 imóveis na
> categoria em todo o universo do snapshot acompanhado).

**Justificativa:** "CRM FYMOOB" → "estoque acompanhado pela FYMOOB"
+ "snapshot" → "recorte/snapshot acompanhado".

---

### Mudança 14 — Block 97 (CTA principal)

**Atual:**
- title: "Procurando casa ou apartamento em Curitiba?"
- description: "Conversa de 15 minutos com nosso time compara as melhores opções de cada tipo no seu orçamento, no seu bairro-alvo, com a conta total real (parcela + condomínio + manutenção amortizada)."
- label: "Falar com a FYMOOB no WhatsApp"

**Proposto:**
- title: **"Quer comparar casa × apartamento para o seu perfil?"** (mesmo padrão do cluster)
- description: **"A FYMOOB cruza orçamento, bairro-alvo e custo total real (parcela + condomínio + manutenção amortizada) para indicar se casa ou apartamento faz mais sentido no seu caso."**
- label: **"Comparar casa × apartamento"** (consistente com cluster)

**Justificativa:** alinha com CTA dos outros artigos revisados.

---

### Mudança 15 — Block 3 (methodologyBox)

**Atual props:**
```json
{
  "period": "Abril/2026",
  "sample": "",
  "sources": "[\"IBGE PNAD ...\", \"IBGE Censo ...\", ...]",
  "treatment": "",
  "lastUpdate": "2026-04-25"
}
```

**Proposto props:**
```json
{
  "period": "Março/2026 (FipeZap) + abril/2026 (PNAD + observação FYMOOB)",
  "sample": "Brasil — IBGE Censo 2022 (cobertura nacional) e PNAD Contínua 2026 (719 mil domicílios em CWB). Curitiba — FipeZap mar/2026 (R$ 11.621/m² médio cidade); estoque acompanhado pela FYMOOB em abril/2026 (n=214 imóveis com valor de venda declarado em 66 bairros).",
  "sources": [LISTA ATUAL — SEM MUDANÇA],
  "treatment": "Fontes oficiais (IBGE, FipeZap, ADEMI-PR, STJ) usadas como referência primária. Observação FYMOOB (CRM) usada como sinal direcional para diferença casa × apto por bairro — amostra reduzida (n=4-11 por bairro) com viés de captação (portfólio tende a alto-padrão). Cenário de manutenção amortizada (R$ 1.000-3.500/mês para casa de 200 m²) é construção autoral baseada em heurística internacional de gestão patrimonial (0,5-1% do valor do imóvel ao ano), não fonte primária publicada.",
  "lastUpdate": "2026-05-02"
}
```

**Justificativa:** sample e treatment preenchidos com transparência
sobre metodologia + caveat de cenário autoral.

---

### Mudança 16 — Tabela inicial "Qual cabe no seu perfil?" (inserção opcional)

Sugestão de adicionar logo após o lead (block 0) e antes do callout
"Resposta direta" (block 2) — mesmo padrão dos outros artigos
revisados. O post já tem 4 perfis na seção "4 perfis de comprador"
(blocks 18-25), mas a tabela inicial ajuda quem chega via busca a
ter um sumário decisório sem precisar ler tudo.

**Tabela proposta:**

| Perfil | Tende a vencer | Por quê (resumo) |
|---|---|---|
| Solteiro ou casal jovem sem filhos | Apartamento compacto | Centro/Batel/Bigorrilho/Água Verde — viver sem carro é viável |
| Família com filhos pequenos (0-10) | Depende do bairro | Apto novo em Bacacheri/Cabral/Mossunguê **ou** casa em Cascatinha/Santa Felicidade/Pilarzinho |
| Família estabelecida (filhos 10-18) | Bairro > tipologia | Escola próxima pesa mais — Sion (Batel), Bom Jesus (Ahú), Internacional (Mossunguê) |
| Investidor (renda + valorização) | Apartamento compacto | Estoque de locação CWB é ~1,3% do total — quase tudo apto |

**Justificativa:** sumário decisório padronizado com cluster.
Opcional — descartar se ChatGPT achar redundante com a seção "4
perfis de comprador" detalhada.

---

## 4. Pontos a validar fora do escopo desta revisão

1. **Block 4 — "Curitiba é a 5ª capital mais verticalizada do Brasil"**:
   bate com IBGE Censo 2022. OK.

2. **Block 5 — "+96,79% apartamentos em 22 anos / +18,02% casas"**:
   IBGE Censo 2022 link direto. OK.

3. **Block 53 — STJ REsp 1.783.076-DF**: link direto, dado consolidado. OK.

4. **Block 38 — "0,5-1% manutenção/ano"**: heurística internacional sem
   fonte específica. Já está marcada como "cenário FYMOOB autoral".

5. **Block 49 — "lenha R$ 560-1.800 por temporada"**: dado de mercado
   sem fonte oficial — observação editorial. OK manter.

6. **Block 50 — "chuveiro 35% conta de luz no inverno"**: usa "cerca
   de" — observação plausível, OK.

7. **Block 81 — Inpespar 2024 e FipeZap dezembro/2025**: datas
   explícitas, OK.

8. **Block 96 — "n=214 imóveis CWB"**: amostra declarada na lista de
   fontes. OK.

---

## 5. Próximos passos

1. **Você valida este doc com ChatGPT.** Pontos especialmente
   importantes:
   - Title sem "60% Mora em Casa" — perde o gancho de busca direta?
   - "49%/59% Imobi Press" — manter números cravados ou suavizar pra
     "cerca de metade dos jovens"?
   - Tabela inicial "Qual cabe no seu perfil?" — entra ou descartamos
     (já há a seção detalhada "4 perfis de comprador")?
   - Caveat de amostra FYMOOB nas tabelas 10 e 14 — fica visível ou
     polui a leitura?

2. **Após validação, traduzo em script**
   `scripts/apply-apartamento-casa-revisions.mjs`.

3. **Próximos da fila Sprint B (4 artigos restantes):**
   - `imovel-planta-vs-pronto-curitiba` (extenso, 3.792 palavras)
   - 3 jurídicos: `itbi`, `documentos`, `checklist` (manutenção leve)

---

## 6. Fontes consultadas pra esta auditoria

- [IBGE PNAD Contínua 2026 (via Bem Paraná)](https://www.bemparana.com.br/noticias/parana/curitiba-tem-mais-casas-ou-apartamentos-e-o-parana-pesquisa-responde/)
  — confirma 59,3% casas / 40,5% apartamentos em CWB
- [Decreto Municipal 2668/2025 + LC 149/2025](https://www.legisweb.com.br/legislacao/?id=488328)
  — cluster harmonizado já cita
- [STJ REsp 1.783.076-DF](https://processo.stj.jus.br/) — pets em
  condomínio, link já no artigo
- Cruzamento interno com `mercado-imobiliario-curitiba-2026`
  (revisado 02/05/26) — ADEMI-PR, FipeZap +17,86% 2025
- Cruzamento interno com `preco-metro-quadrado-curitiba-bairro`
  (revisado 02/05/26) — FipeZap mar/26, decreto IPTU
- Cruzamento interno com `quanto-custa-morar-batel-curitiba`
  (revisado 02/05/26) — Decreto 2668/2025 + LC 149/2025 + EC 132/2023
