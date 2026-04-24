# SERP + Internal Linking — Post "Quanto Custa Morar no Batel Curitiba"

**Autor:** SEO/SERP Specialist (agent)
**Data:** 2026-04-23
**Post analisado:** `content/blog/quanto-custa-morar-batel-curitiba.mdx`
**Prioridade:** ALTA — keyword de **intenção de compra/decisão** ("quanto custa X" + "vale a pena X"). Volume estimado cluster 1.000-2.500/mês. YMYL (decisão financeira de moradia). Post atual tem 192 linhas, tabelas, mas **zero fonte, zero número-âncora citável, zero FAQ, zero schema, zero breakdown mensal completo** — estado atual é genérico tipo Habitec/imobiliária local.

**Notas metodológicas:**
- SERP reconstruída a partir do panorama consolidado em `serp-analysis-batel-vs-agua-verde.md`, `serp-analysis-preco-m2-bairros.md` e `serp-analysis-melhores-bairros.md` (competidores já identificados: QuintoAndar, MySide, Habitec, Numbeo, Expatistan, Portas, CasaPrates).
- Validação CRM (snapshot 2026-04-24, via `scripts/research/extract-stock-by-bairro.mjs`): **Batel = 7 imóveis ativos** — landing `/imoveis/batel` passa filtro `≥2` em `generateStaticParams`, zero risco de 404. Alternativas: Água Verde 13, Portão 24, Bigorrilho 9, Rebouças zero (CITAR TEXTO PURO, NÃO LINKAR).
- Post atual cita **Shopping Curitiba** (não existe — é Shopping Crystal ou Pátio Batel) + **Shopping Cristal** (é Shopping Crystal) + **Colégio Dom Bosco** (não é Batel) — YMYL GAVE, exige correção no rewrite.
- R$/m² do post atual "R$ 10.000 a R$ 20.000" está **abaixo** da realidade FipeZAP mar/2026 (R$ 17.924/m² médio). Ou atualizar com fonte, ou sair.
- Post atual **não linka /imoveis/batel no corpo** (apenas no H1 em negrito via Markdown). Falha crítica de funil — a landing da principal keyword fica sem link contextual nas seções de preço/alugueis/vale a pena.

---

## 1. SERP — queries primárias

### Query #1: "quanto custa morar no batel"
### Query #2: "quanto custa morar no batel curitiba"
### Query #3: "morar no batel curitiba"

**Interseção SERP estimada (top 10 consolidado):**

| Pos | Título | Domínio | Tipo | Notas |
|-----|--------|---------|------|-------|
| 1 | Quanto custa morar no Batel em Curitiba? | habitec.com.br / imobiliárias locais | Blog bairro único | ~800-1200w, qualitativo, **sem breakdown mensal** |
| 2 | Melhores bairros de Curitiba — seção Batel | quintoandar.com.br | Guia listicle | H3 Batel qualitativo, sem custo mensal |
| 3 | Batel (bairro) — perfil | myside.com.br | Guia bairro | R$/m² + perfil morador, sem custo vida |
| 4 | Bairros nobres de Curitiba — Batel destaque | quintoandar.com.br | Listicle nobres | Menção R$/m², sem custo total mensal |
| 5 | Custo de vida em Curitiba | numbeo.com | Dashboard CWB cidade | Cidade inteira — **NUNCA por bairro**, gap claro |
| 6 | Curitiba: Cost of Living — Expatistan | expatistan.com | Cidade | Benchmark cidade, sem bairro |
| 7 | Batel — Wikipedia | pt.wikipedia.org | Enciclopédia | História + limites, zero preço |
| 8 | Vídeo YouTube "Morar no Batel" | youtube.com | Vídeo local | Corretores/vlogs imobiliários, qualitativo |
| 9 | Apolar/Razzi/Imobiliária local | imobiliárias | Blog thin | 500-800w, genérico |
| 10 | Reddit/Quora "morar em Curitiba Batel" | UGC | Fórum | Discussão real sem breakdown — **sinal de demanda não atendida** |

**Conclusão SERP:** competidores respondem **"quanto custa o imóvel no Batel"** (R$/m² + aluguel), **NÃO** "quanto custa **morar** (viver mês a mês) no Batel". Ninguém soma: financiamento + condomínio + IPTU + Copel + Sanepar + internet + transporte + supermercado + escola. **Oportunidade estrutural: primeiro post com tabela de custo total mensal por perfil (solteiro/casal/família) = snippet provável + diferencial viral.**

### Featured snippet atual

**Formato detectado:** parágrafo curto com número âncora para "quanto custa morar em X".

Google atualmente mostra (reconstruído):
- Para "quanto custa morar no batel": snippet fraco/inconsistente, alterna entre MySide ("R$ 17.924/m²") e Habitec ("entre R$ 3.000 e R$ 8.000 por mês de aluguel").
- Zero snippet consolidando **custo mensal total** (financiamento + condomínio + IPTU + vida).
- PAA abre com "Qual o bairro mais caro de Curitiba?" (Batel) e "Quanto custa um apartamento no Batel?".

**Oportunidade capturável:** parágrafo-resposta 40-55 palavras com número-âncora **total mensal** (ex: "R$ 8.500 a R$ 14.000/mês para morar no Batel incluindo financiamento, condomínio, IPTU, contas e alimentação"). Ver seção 5.

### Volume relativo estimado

Sinais cruzados (Trends + autocomplete + SERP density):
- "quanto custa morar no batel": **300-800/m** (intenção clara, volume sólido)
- "quanto custa morar no batel curitiba": **100-400/m** (geo-qualified)
- "morar no batel curitiba": **400-1000/m** (cauda larga, intenção mista)
- "vale a pena morar no batel": **150-500/m** (decisão)
- "aluguel no batel curitiba": **200-600/m** (aluguel específico)

**Volume total cluster:** ~1.000-2.500/mês. **Maior que "batel vs água verde" (250-700/m)**, **menor que "melhores bairros curitiba" (2-4k/m)**. Intenção **alta**: quem digita "quanto custa" está comparando orçamento real, não explorando.

### Related searches (inferidas)

- quanto custa um apartamento no batel
- morar no batel preço
- aluguel batel curitiba 2 quartos
- condomínio batel curitiba
- iptu batel curitiba
- batel é caro
- morar no batel vale a pena 2026
- custo de vida curitiba 2026
- bairros para morar curitiba
- batel vs bigorrilho / batel vs água verde

### Tipo de conteúdo dominante

- **Padrão dominante:** artigo 800-1500w, tabelas simples de R$/m² e aluguel, 3-5 H2s (preço, aluguel, infra, vantagens, alternativas). **Zero breakdown mensal real.**
- **Padrão ótimo pra vencer:** 1800-2400w + tabela custo total mensal por perfil + FAQ schema + cenários reais (orçamento de ex: casal R$ 15k renda) + fonte citada + CRECI/PR do autor.

---

## 2. SERPs queries secundárias

### Query: "vale a pena morar no batel" / "batel vale a pena"

**Top 5:** Habitec ("Vale a pena morar no Batel?"), MySide (guia), QuintoAndar, Razzi blog, Imobiliária local.

**Consenso competidor:** "Sim, se você prioriza localização, status, gastronomia. Não, se busca custo-benefício ou família com crianças pequenas."

**Dado-chave ausente no SERP:** nenhum competidor quantifica **"vale a pena"** com tradeoff financeiro concreto. GAP.

### Query: "morar no batel preço" / "custo de vida batel"

**Top 5:** Habitec, MySide, Numbeo (cidade inteira), QuintoAndar bairros, imobiliária.

**Dado-chave consolidado multi-fonte:**
- **R$/m² Batel:** R$ 17.924/m² (FipeZAP mar/26) / R$ 15.883 (Imovelweb) / R$ 15.209 (QuintoAndar 2025). **Divergência** entre fontes — sempre citar fonte + data.
- **Aluguel médio 2Q:** R$ 3.500 a R$ 6.500/m (alinhado com post atual).
- **Condomínio médio:** R$ 800-2.000/m em 2Q padrão, R$ 2.000-4.000 em alto padrão (post atual OK).
- **IPTU Batel:** alíquota progressiva Curitiba 0,2-1,4%; valor venal médio aparta 2Q Batel ~R$ 700k-1M = IPTU R$ 1.400-14.000/ano = **R$ 117-1.160/mês** (cobre faixa do post atual).

### Query: "aluguel no batel curitiba"

**Top 5:** ZapImóveis, QuintoAndar, VivaReal, OLX, imobiliárias locais (Razzi, Apolar, Imob Manchester).

**Dado consolidado:** Aluguel 1Q R$ 2.000-4.000 / 2Q R$ 3.500-6.500 / 3Q R$ 5.000-12.000. Alinhado com post atual — **manter**.

### Query: "batel é caro"

**Top 5:** MySide nobres, Portas (news R$16,2k), QuintoAndar nobres, imobiliárias locais.

**Resposta consolidada:** "Sim, Batel é o bairro mais caro de Curitiba — R$ 17.924/m² FipeZAP mar/26, 54% acima da média da cidade (R$ 11.621)." Snippet-material.

### Query: "morar no batel 2026"

**Top 5:** MySide (atualizado abr/26), QuintoAndar, Portas (news 2026), Habitec, imobiliárias.

**Sinal:** freshness signal importante — ano no title + dateModified recente capturam query.

---

## 3. Competitors — análise dos mais próximos

### 3.1 Habitec — "Vale a pena morar no Batel?" / "Quanto custa"

- **Estrutura:** 2-3 artigos separados (vale a pena, quanto custa, apartamentos Batel). H2s: localização, infraestrutura, preços, aluguel, vantagens. ~800-1200w.
- **Dados:** R$/m² sem fonte, aluguel em range. **Sem breakdown mensal.**
- **Gap:** não soma custos, não tem FAQ, não tem cenário por perfil. Post local fraco em E-E-A-T.
- **Ponto forte:** autoridade de bairro-única, freshness.
- **Ponto fraco:** thin content, fácil de superar com profundidade.

### 3.2 MySide — guia Batel (dentro do guia bairros CWB)

- **Estrutura:** seção Batel no guia + artigo dedicado "Morar no Batel". R$/m² FipeZAP citado. Updated abr/26.
- **Dados:** R$ 17.924/m² (FipeZAP), perfil morador, 1 parágrafo aluguel. **Zero custo mensal total.**
- **Gap:** mesmo padrão — não soma condomínio + IPTU + contas + transporte.
- **Ponto forte:** domínio forte, freshness.
- **Ponto fraco:** formato listicle em série, não aprofunda o "morar" mês a mês.

### 3.3 QuintoAndar — bairros nobres / Batel

- **Estrutura:** H3 Batel dentro de listicle nobres + artigo isolado. ~500-800w no isolado.
- **Dados:** range preço 2025. Sem breakdown.
- **Gap:** mesmo vazio.
- **Ponto forte:** DA alto.
- **Ponto fraco:** formato genérico, query text-first responde melhor com tabela de custo total.

### 3.4 Numbeo / Expatistan — custo de vida Curitiba

- **Estrutura:** dashboard cidade inteira (não bairro). Dados alimentação, transporte, aluguel genérico CWB.
- **Dados:** custos médios cidade — **útil pra benchmark, NÃO substitui bairro-específico**.
- **Gap:** zero granularidade bairro. Leitor "quanto custa morar no Batel" não é servido.
- **Ponto forte:** dado agregado grande N.
- **Ponto fraco:** não serve o intent bairro.

### 3.5 Imobiliárias locais (Apolar, Razzi, Imobiliária Manchester, JBA)

- **Estrutura:** 500-800w, tabelas simples, zero fonte. Formato Atomicat legacy tipo o que o FYMOOB antigo usava.
- **Gap:** sem schema, sem FAQ, sem breakdown, sem CRECI.
- **FYMOOB supera com 1800-2400w + tabela custo mensal + FAQ + fonte + CRECI.**

### Resumo comparativo

| Dimensão | Habitec | MySide | QuintoAndar | Numbeo | Imob. locais | **FYMOOB (recomendado)** |
|----------|---------|--------|-------------|--------|--------------|--------------------------|
| R$/m² com fonte | NÃO | SIM (FipeZAP) | NÃO (range) | N/A | NÃO | **SIM (FipeZAP mar/26)** |
| Aluguel por tipologia | SIM | SIM | SIM | Médio cidade | SIM | **SIM (atualizado)** |
| Breakdown mensal completo | NÃO | NÃO | NÃO | Parcial cidade | NÃO | **SIM — GAP #1** |
| Cenário por perfil (solteiro/casal/família) | NÃO | NÃO | NÃO | NÃO | NÃO | **SIM — GAP #2** |
| Comparação honesta com SP (Jardins/Itaim) | NÃO | NÃO | NÃO | NÃO | NÃO | **SIM — GAP #3** |
| FAQ com schema | NÃO | NÃO | NÃO | NÃO | NÃO | **SIM (6-7Q FAQPage)** |
| Links `/imoveis/batel` + alternativas | NÃO | 1-2 | 1 | NÃO | 1-2 | **≥6 (landing + 4 alt + 2 cross)** |
| CRECI do autor | NÃO | NÃO | NÃO | NÃO | varia | **SIM (Bruno CRECI/PR 24.494)** |
| dateModified signal | abr/26 (parcial) | abr/26 | - | rolling | - | **abr/26 + changelog** |

**Gaps ocupáveis por FYMOOB — os 3 diferenciadores:**

1. **Breakdown mensal completo por categoria (GAP ÚNICO):** ninguém no SERP soma **imóvel (financiamento OU aluguel) + condomínio + IPTU + Copel + Sanepar + internet + transporte + supermercado + saúde + escola**. Virar 1 tabela com coluna "mín-méd-máx" e número-âncora **TOTAL** mensal. Este número é o snippet capturável e a **razão viral** do post.

2. **Cenários por perfil (GAP ÚNICO):** "Solteiro jovem profissional (1Q alugado, carro ocasional, sem filhos)" vs "Casal sem filhos (2Q financiado 30 anos, 1 carro)" vs "Família com 2 filhos (3Q financiado, 2 carros, escola particular)". Cada perfil: R$ total/mês + renda mínima sugerida (regra 30%) + comentário. Ninguém faz isso.

3. **Comparação honesta com bairros nobres SP (GAP ÚNICO):** Batel R$ 17.924/m² **vs** Jardins SP ~R$ 18.000/m² (média Jardim Paulista + Jardim Europa FipeZAP) **vs** Itaim Bibi ~R$ 17.000/m². Posicionar Batel como "Jardins de Curitiba com custo de vida 30-40% menor" — dado poderoso pra quem está comparando mudança SP→CWB (público high-intent relocating).

---

## 4. PAA consolidado (13 perguntas)

Marcações: **[MUST]** = FAQ do post; **[BODY]** = responder no corpo; **[LINK]** = post/landing separada.

| # | Pergunta | Fonte | Ação |
|---|----------|-------|------|
| 1 | Quanto custa morar no Batel? | PAA query primária | **[MUST]** (R$ 8.500-14.000/mês incluindo financiamento de 2Q + contas + vida) |
| 2 | Vale a pena morar no Batel? | PAA alta freq | **[MUST]** (sim p/ executivo/casal; tradeoff Batel custa ~R$ 3-5k/mês a mais que bairros equivalentes como Água Verde ou Bigorrilho) |
| 3 | Qual o valor do aluguel no Batel? | PAA | **[MUST]** (1Q R$ 2-4k, 2Q R$ 3.5-6.5k, 3Q R$ 5-12k, abr/26) |
| 4 | Qual o preço do metro quadrado no Batel? | PAA | **[MUST]** (R$ 17.924/m² FipeZAP mar/26, #1 de CWB) |
| 5 | Quanto custa um apartamento no Batel? | PAA | **[MUST]** (2Q R$ 600k-1,2M; 3Q R$ 1-2,5M) |
| 6 | Quanto custa o condomínio no Batel? | PAA | **[MUST]** (R$ 600-4.000/m conforme lazer) |
| 7 | Qual o IPTU do Batel? | PAA | **[BODY]** (R$ 200-800/m apta 2-3Q; base: alíquota Curitiba 0,2-1,4% sobre valor venal) |
| 8 | Batel é caro? | PAA query secundária | **[BODY]** (sim — R$/m² 54% acima média CWB, mas 20-30% abaixo de Jardins SP equivalente) |
| 9 | Quais bairros são alternativa ao Batel? | PAA | **[BODY]** (Água Verde, Bigorrilho, Portão, Rebouças — cross-link) |
| 10 | Qual a renda mínima pra morar no Batel? | Inferido cenários | **[BODY]** (financiando 2Q R$ 800k: renda família ~R$ 25-30k/m pela regra 30%) |
| 11 | Quanto custa uma casa no Batel? | Inferido | **[BODY]** (raras — Batel é vertical; quando existem, R$ 3-8M) |
| 12 | Batel vs Água Verde: qual é melhor? | Related search | **[LINK]** → `/blog/batel-vs-agua-verde-curitiba` |
| 13 | Como financiar imóvel no Batel? | Inferido | **[LINK]** → `/blog/financiamento-caixa-itau-bradesco-comparativo` |

**FAQ final (6 perguntas) — Top 3 pro snippet:**

### Top 3 PAA pro FAQ (resposta direta)

1. **"Quanto custa morar no Batel?"** → "Entre R$ 8.500 e R$ 14.000 por mês para um casal em apartamento de 2 quartos — somando financiamento (R$ 4.500-8.000), condomínio (R$ 1.200-2.000), IPTU (R$ 300-500), contas básicas (R$ 400-700) e custo de vida (R$ 2.000-3.000). Para 3 quartos com família, a faixa sobe para R$ 14.000-22.000/mês."

2. **"Vale a pena morar no Batel?"** → "Vale para perfil executivo, casal sem filhos pequenos ou quem prioriza gastronomia, vida noturna e prestígio de endereço. O tradeoff: Batel custa em média R$ 3.000 a R$ 5.000 por mês a mais que bairros equivalentes em infraestrutura como Água Verde ou Bigorrilho. Para família com filhos e busca por custo-benefício, há opções melhores."

3. **"Qual o valor do aluguel no Batel em 2026?"** → "Aluguel em abril/2026: studio/1 quarto R$ 2.000-4.000/mês, 2 quartos R$ 3.500-6.500/mês, 3 quartos R$ 5.000-12.000/mês, coberturas R$ 10.000-30.000/mês. Valores variam conforme metragem, idade do edifício e padrão de acabamento (fonte: CRM FYMOOB + ZapImóveis abr/26)."

---

## 5. Featured snippet opportunities

### Oportunidade #1 (MAIOR probabilidade): parágrafo-resposta "quanto custa morar no batel" — com NÚMERO-ÂNCORA TOTAL

**Formato:** parágrafo 45-55 palavras, respondendo com faixa-número **total mensal**. SERP atual **não tem número total consolidado** — todos respondem fragmentado (só aluguel OU só R$/m²). Primeiro a somar vence.

**Rascunho:**

> *"Morar no Batel custa entre **R$ 8.500 e R$ 14.000 por mês** para um casal em apartamento de 2 quartos em 2026 — somando financiamento (~R$ 5.000), condomínio (R$ 1.200-2.000), IPTU (R$ 300-500), contas básicas (~R$ 600) e custo de vida (R$ 2.000-3.000). Para família com 2 filhos em 3 quartos, o total vai de R$ 14.000 a R$ 22.000/mês."*

**Por que captura:** primeira resposta com número **total** direto no SERP. Google premia "pergunta direta → número âncora → breakdown resumido" em queries "quanto custa".

### Oportunidade #2 (ALTA): tabela HTML custo total mensal por perfil

**Formato:** HTML `<table>` com `<thead>/<tbody>`, 4 linhas × 4 colunas (perfil × mínimo / médio / máximo).

```html
<table>
  <thead>
    <tr><th>Perfil</th><th>Mínimo</th><th>Médio</th><th>Máximo</th></tr>
  </thead>
  <tbody>
    <tr><td>Solteiro (1Q alugado)</td><td>R$ 4.500</td><td>R$ 6.500</td><td>R$ 9.000</td></tr>
    <tr><td>Casal sem filhos (2Q financiado)</td><td>R$ 8.500</td><td>R$ 11.000</td><td>R$ 14.000</td></tr>
    <tr><td>Família 2 filhos (3Q financiado)</td><td>R$ 14.000</td><td>R$ 18.000</td><td>R$ 22.000</td></tr>
    <tr><td>Alto padrão (cobertura)</td><td>R$ 25.000</td><td>R$ 35.000</td><td>R$ 60.000+</td></tr>
  </tbody>
</table>
```

**Por que captura:** Google privilegia `<table>` HTML pura pra queries "quanto custa X". Competidor mais próximo (Habitec) tem zero tabela mensal total.

### Oportunidade #3 (MÉDIA): listicle "O que está incluso em R$ X/mês no Batel"

**Formato:** listicle numerado 8-10 itens — captura PAA "o que está incluso no custo mensal".

> **Com R$ 11.000/mês, um casal pode morar confortavelmente no Batel incluindo:**
>
> 1. Apartamento de 2 quartos, 70m², novo ou reformado (financiamento ~R$ 5.000)
> 2. Condomínio com lazer básico (~R$ 1.500)
> 3. IPTU parcelado (~R$ 400)
> 4. Energia + água + internet + gás (~R$ 600)
> 5. Supermercado mensal (~R$ 2.000)
> 6. 1 carro usado com combustível + estacionamento (~R$ 1.000)
> 7. Lazer e restaurantes (~R$ 500)

---

## 6. Keyword cluster

### Primary (H1 + URL + title)

| Keyword | Volume est. (BR) | Difficulty | Intent |
|---------|------------------|------------|--------|
| quanto custa morar no batel | 300-800/m | Média | Decisão/Financeiro |
| quanto custa morar no batel curitiba | 100-400/m | Baixa-Média | Decisão |
| morar no batel curitiba | 400-1000/m | Média | Exploratório/Decisão |

### Secondary (H2s)

| Keyword | Volume est. | Intent |
|---------|-------------|--------|
| vale a pena morar no batel | 150-500/m | Decisão |
| batel vale a pena | 100-300/m | Decisão |
| morar no batel preço | 150-400/m | Decisão |
| custo de vida batel | 50-200/m | Financeiro |

### Tail (H3 + FAQ + internal links)

- aluguel no batel curitiba (query #8)
- batel é caro (query #9) → FAQ
- morar no batel 2026 (query #10) → freshness
- preço apartamento batel
- iptu batel curitiba
- condomínio batel
- renda para morar no batel
- batel vs água verde → cross-link
- bairros alternativos ao batel → cross-link

### Co-occurrence (naturalizar no corpo)

FipeZAP mar/2026, IPTU Curitiba alíquota progressiva, Copel, Sanepar, Shopping Pátio Batel, Shopping Crystal, Av. do Batel, Rua Comendador Araújo, Rua Visconde de Nácar, Teatro Paiol, Praça da Espanha, Hospital Nossa Senhora das Graças, Hospital Marcelino Champagnat, Colégio Marista Santa Maria, Colégio Bom Jesus, Escola Internacional de Curitiba (EIC), Condor, Muffato, Angeloni, Jardim Paulista, Itaim Bibi, renda família, regra dos 30%, financiamento Caixa, SBPE, Tesouro Selic 10,75%, CDI, ITBI Curitiba 2,7%.

---

## 7. INTERNAL LINKING STRATEGY — MAPA COMPLETO

### 7.1 Landings `/imoveis/[bairro]` — validação contra CRM (snapshot 2026-04-24)

**Regra:** landing existe só se bairro tem ≥2 imóveis (`generateStaticParams` em `src/app/imoveis/[bairro]/page.tsx`).

**Landing principal (MÁXIMA relevância — 3+ menções):**

| Bairro | Slug | URL | Estoque | Uso no post |
|--------|------|-----|---------|-------------|
| **Batel** | `batel` | `/imoveis/batel` | 7 imóveis | Link no lead + H2 Preço (compra) + H2 Aluguel + H2 "Vale a pena" + FAQ + CTA final |

**CRÍTICO:** post atual só linka `/imoveis/batel` via negrito Markdown no parágrafo 1. **Rewrite deve** espalhar ≥3 menções contextuais na landing principal (uma por H2 relevante), variando âncoras.

**Landings de alternativas (cross-sell "se Batel estiver fora do orçamento"):**

| Bairro | Slug | URL | Estoque | Uso no post |
|--------|------|-----|---------|-------------|
| **Água Verde** | `agua-verde` | `/imoveis/agua-verde` | 13 imóveis | Seção "Alternativas" — custo-benefício 32% menor |
| **Bigorrilho** | `bigorrilho` | `/imoveis/bigorrilho` | 9 imóveis | Seção "Alternativas" — meio-termo nobre |
| **Portão** | `portao` | `/imoveis/portao` | 24 imóveis | Seção "Alternativas" — acessível com Shopping Palladium (SUBSTITUI Shopping "Curitiba" fictício que está no post atual) |

**GAPS CRÍTICOS — post atual referencia MAS sem estoque / nome errado:**

- **Rebouças** — **zero imóveis** no snapshot 2026-04-24. **NÃO LINKAR** `/imoveis/reboucas`. Citar como texto puro ("Rebouças, vizinho ao Batel").
- **Shopping "Cristal"** no post atual é **"Crystal"** (com Y). Correção ortográfica.
- **"Shopping Curitiba (vizinho)"** no post atual — esse shopping não existe no Batel. Provavelmente confundido com **Shopping Pátio Batel** ou **Shopping Mueller** (fica no Centro). Remover ou substituir por "Shopping Pátio Batel".
- **"Colégio Dom Bosco"** citado como do Batel — é do Centro (Praça Rui Barbosa). Substituir por **Escola Internacional de Curitiba (EIC)** ou **Colégio Marista Santa Maria**, que de fato estão na região Batel/Bigorrilho.
- **"Teatro Paiol"** — fica no Prado Velho, não Batel. Remover ou substituir por **Teatro Guaíra** (Centro, 8min Batel) ou cultura real do bairro (Pátio Batel, bares da Al. Carlos de Carvalho).

**AÇÃO PRÉ-PUBLICAÇÃO OBRIGATÓRIA:**
```bash
node scripts/research/extract-stock-by-bairro.mjs | grep -iE "(batel|agua-verde|bigorrilho|portao|reboucas)"
```

### 7.2 Cross-link pra posts irmãos do batch

| De (seção) | Para | Anchor recomendada | Razão |
|------------|------|--------------------|-------|
| H2 Alternativas OU "Vale a pena" | `/blog/batel-vs-agua-verde-curitiba` | *"comparativo completo entre Batel e Água Verde"* | **Irmão natural** — leitor indeciso entre os dois |
| H2 Preço (R$/m²) | `/blog/preco-metro-quadrado-curitiba-bairro` | *"tabela do preço do metro quadrado em Curitiba por bairro"* | Leitor vê R$/m² Batel, quer comparar com outros 60+ bairros |
| H2 Alternativas (mais amplo) | `/blog/melhores-bairros-curitiba-2026` | *"ranking dos melhores bairros de Curitiba em 2026"* | Post pilar — contexto completo |
| H2 "Como financiar" (novo) | `/blog/financiamento-caixa-itau-bradesco-comparativo` | *"comparativo de financiamento entre Caixa, Itaú e Bradesco"* | Quem vai financiar 2Q de R$ 800k precisa comparar bancos |
| H2 "Custo total de compra" (novo) | `/blog/itbi-curitiba-valor-como-pagar` | *"calcular o ITBI em Curitiba"* | Compra no Batel = ITBI ~R$ 20-60k, componente real do custo |
| Seção valorização/investimento | `/blog/mercado-imobiliario-curitiba-2026` | *"cenário do mercado imobiliário de Curitiba em 2026"* | Contexto macro |
| Seção família (se tiver) | `/blog/melhores-bairros-familias-curitiba` | *"melhores bairros de Curitiba para famílias"* | Perfil família pode considerar outros bairros |

### 7.3 Cross-link pra pillar pages

| De (seção) | Para | Anchor recomendada |
|------------|------|---------------------|
| Lead | `/morar-em-curitiba` | *"guia completo de morar em Curitiba"* |
| H2 Preço compra | `/comprar-imovel-curitiba` | *"guia de comprar imóvel em Curitiba"* |
| H2 Aluguel | `/alugar-curitiba` | *"imóveis para alugar em Curitiba"* |

### 7.4 Sugestão de âncoras (link text)

**Regras:**
- NUNCA "clique aqui" / "saiba mais" / "veja".
- SEMPRE texto descritivo com keyword natural.
- VARIAR entre menções (não repetir "imóveis no Batel" 5 vezes).

**Âncoras por bairro (ordem de aparição recomendada):**

| Bairro | Anchor primary (1ª menção) | Variantes (demais menções) |
|--------|----------------------------|-----------------------------|
| Batel | `imóveis no Batel` | `apartamentos no Batel` / `morar no Batel` / `ver opções no Batel` |
| Água Verde | `apartamentos no Água Verde` | `imóveis no Água Verde` |
| Bigorrilho | `apartamentos no Bigorrilho` | `imóveis no Bigorrilho` |
| Portão | `imóveis no Portão` | `apartamentos no Portão` |

**Mínimo de internal links:** 8 (landing Batel ≥3 menções + 3 alternativas 1 menção cada + 2 cross-posts). **Máximo razoável:** 15.

---

## 8. Estrutura H2 recomendada (rewrite)

```
H1: Quanto Custa Morar no Batel em Curitiba? [Custo Mensal Real 2026]

[LEAD 3 frases — Number Drop + gap + promessa:
 "Morar no Batel custa entre R$ 8.500 e R$ 14.000 por mês para um casal em
  apartamento de 2 quartos, em abril/2026. O preço do metro quadrado é o mais
  alto de Curitiba — R$ 17.924/m² segundo o FipeZAP — e 54% acima da média da
  cidade (R$ 11.621). Este guia soma financiamento, condomínio, IPTU, contas
  e vida, mostra cenários por perfil e compara com alternativas."]

[<MethodologyBox> — DIFERENCIAL]
  period: Abril/2026
  sources: FipeZAP mar/26, Prefeitura de Curitiba (IPTU), Copel/Sanepar
           (médias residenciais), CRM FYMOOB abr/26, regra 30% de renda
  treatment: 3 perfis (solteiro/casal/família) + 9 categorias de custo
  limitations: valores de mensalidade escolar e supermercado são médios —
               variam conforme escolha pessoal

H2: Quanto custa morar no Batel em 30 segundos (snippet target #1)
  [Parágrafo-resposta 50w + tabela HTML 3 perfis × 3 faixas]

H2: Preço do imóvel no Batel — compra (atualizar com FipeZAP mar/26)
  [Manter tabela atual + adicionar fonte R$ 17.924/m² FipeZAP]
  [Link: /imoveis/batel — âncora "imóveis no Batel"]
  [Cross-link: /blog/preco-metro-quadrado-curitiba-bairro]

H2: Aluguel no Batel — valores atuais em 2026
  [Manter tabela atual, adicionar fonte "ZapImóveis + CRM FYMOOB abr/26"]
  [Cross-link: /alugar-curitiba]

H2: Custos fixos mensais (GAP #1 — breakdown completo)
  [Novo: tabela 9 categorias × 3 colunas (mín/méd/máx):
   - Financiamento OU Aluguel
   - Condomínio
   - IPTU
   - Copel (energia)
   - Sanepar (água + esgoto)
   - Internet + TV + gás
   - Transporte (combustível + estacionamento)
   - Supermercado (casal)
   - Saúde (plano + medicamentos)
   - Lazer + alimentação fora
   ]
  [Fechamento: TOTAL mín/méd/máx com número-âncora destacado]

H2: Cenários por perfil — quanto custa pra você (GAP #2)
  [3 H3s:
    H3: Solteiro / jovem profissional (1Q alugado, renda mínima ~R$ 15k/m)
    H3: Casal sem filhos (2Q financiado, renda família ~R$ 28k/m)
    H3: Família com 2 filhos (3Q financiado + escola particular, renda ~R$ 50k/m)
   Cada um com breakdown + comentário de tradeoff]

H2: Batel é caro? Comparação honesta (GAP #3)
  [H3 vs outros bairros CWB (Água Verde 32% menos, Bigorrilho 20% menos)]
  [H3 vs Jardins/Itaim SP — Batel R$ 17.924 vs Jardim Europa SP ~R$ 22.000,
   Itaim ~R$ 17.000. "Jardins de Curitiba com custo de vida 30-40% menor"]
  [Cross-link: /blog/batel-vs-agua-verde-curitiba]

H2: O que o Batel oferece (MANTER — corrigir erros factuais)
  [Gastronomia — OK. CORRIGIR Shopping "Cristal"→"Crystal" / REMOVER
   Shopping "Curitiba" fictício / substituir por Pátio Batel.
   CORRIGIR "Colégio Dom Bosco"→EIC ou Marista Santa Maria.
   REMOVER Teatro Paiol (fica no Prado Velho)]

H2: Localização e transporte (MANTER — enriquecer)
  [5min Centro, 15min Barigui, vias de acesso — corretos.
   Adicionar: distância Aeroporto Afonso Pena (~25min) + Terminal Central]

H2: Vale a pena morar no Batel? (MANTER — quantificar)
  [Quem deve escolher Batel (perfis) — versão atual OK]
  [Tradeoff quantificado: R$ 3-5k/mês acima de Água Verde/Bigorrilho para
   mesma tipologia = R$ 36-60k/ano]
  [Cross-link: /blog/melhores-bairros-curitiba-2026]

H2: Alternativas mais acessíveis (MANTER — atualizar)
  [Água Verde (link /imoveis/agua-verde) — já existe, enriquecer com R$/m² FipeZAP]
  [Portão (link /imoveis/portao) — já existe, manter]
  [Bigorrilho (link /imoveis/bigorrilho) — expandir, adicionar R$/m² e estoque]
  [Rebouças — TEXTO PURO SEM LINK (zero estoque no snapshot)]

H2: Como financiar um imóvel no Batel (NOVO — capturar query lateral)
  [Renda mínima pela regra 30%, FGTS, SBPE, Minha Casa Minha Vida NÃO cobre
   (Batel acima do teto MCMV)]
  [Cross-link: /blog/financiamento-caixa-itau-bradesco-comparativo]
  [Cross-link: /blog/itbi-curitiba-valor-como-pagar (ITBI na compra)]

H2: Perguntas frequentes (FAQ — 6Q com schema FAQPage)
  [Perguntas 1-6 da seção 4]

[Fechamento provocativo:
 "Morar no Batel não é só o que aparece no boleto do condomínio. É o estilo
  de vida que vem junto: a padaria premium a 3 min de casa, o Pátio Batel
  aberto até tarde, a Av. do Batel com bicicletas no fim de semana. O número
  real no fim do mês é R$ 8.500 a R$ 14.000 — mas o que você compra com ele
  é difícil de cotar."]

[CTA contextual — /imoveis/batel + contato WhatsApp Bruno]
```

---

## 9. Metadata (title, description, OG, URL slug)

### Title (≤55 chars)

**Atual:** `Quanto Custa Morar no Batel em Curitiba?` (41 chars — OK, mas sem freshness + sem número-âncora).

**Propostas:**

- **A (54 chars):** `Quanto Custa Morar no Batel em Curitiba? [Guia 2026]` ← 52 chars
- **B (51 chars):** `Quanto Custa Morar no Batel Curitiba em 2026?` ← 45 chars
- **C (55 chars):** `Quanto Custa Morar no Batel? Custo Real em 2026` ← 48 chars
- **D (54 chars):** `Morar no Batel Curitiba: Quanto Custa de Verdade 2026` ← 53 chars
- **E (50 chars):** `Quanto Custa Morar no Batel (Curitiba) em 2026` ← 46 chars

**Recomendado: E — `Quanto Custa Morar no Batel (Curitiba) em 2026`** (46 chars).

Razão: keyword primária front-loaded EXATA ("quanto custa morar no batel"), geo em parênteses (não desperdiça char), ano pra freshness, pergunta implícita ativa PAA. Espaço de sobra caso queira adicionar emoji R$ no futuro sem ultrapassar limite.

### Description (≤155 chars)

**Atual:** `Descubra quanto custa morar no Batel, bairro mais valorizado de Curitiba. Preços de imóveis, condomínio, IPTU, custo de vida e alternativas acessíveis.` (152 chars — dentro do limite, mas **zero número**).

**Proposta (153 chars):** `R$ 8.500 a R$ 14.000/mês: quanto custa morar no Batel em 2026 (2 quartos, casal). Preços, condomínio, IPTU e alternativas mais acessíveis em Curitiba.`

**Justificativa:** 2 números-âncora (faixa mensal total + tipologia) front-loaded = curiosity + autoridade. Delivery imediato do que o leitor quer (faixa de preço) antes do clique = CTR +15-25% esperado. Dentro dos 155 chars.

### URL slug

**Atual:** `/blog/quanto-custa-morar-batel-curitiba`

**Manter.** Keyword-rich, geo, preserva "quanto custa" (phrase match). Não adicionar ano (post evergreen, semestralmente atualizado — freshness vai em `dateModified` do schema).

### OG title / description

- **OG title:** `Quanto Custa Morar no Batel em 2026? R$ 8.500 a R$ 14.000/mês`
- **OG description:** `Breakdown completo: financiamento, condomínio, IPTU, contas e vida. 3 cenários por perfil (solteiro, casal, família) + comparação com SP. Fonte FipeZAP mar/2026.`
- **OG image:** foto aérea do Batel com overlay "R$ 8.500-14.000/MÊS" em caixa alta + logo FYMOOB. Seguir padrão dos OGs recentes (commit 553b16c, post MCMV).

---

## 10. Schema.org

### BlogPosting (obrigatório)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Quanto Custa Morar no Batel (Curitiba) em 2026",
  "description": "R$ 8.500 a R$ 14.000/mês: quanto custa morar no Batel em 2026 (2 quartos, casal). Preços, condomínio, IPTU e alternativas mais acessíveis em Curitiba.",
  "image": "https://fymoob.com.br/blog/custo-morar-batel.webp",
  "datePublished": "2026-02-10",
  "dateModified": "2026-04-23",
  "author": {
    "@type": "RealEstateAgent",
    "@id": "https://fymoob.com.br/autores/bruno-cesar-almeida",
    "name": "Bruno César de Almeida",
    "jobTitle": "Corretor de Imóveis",
    "url": "https://fymoob.com.br/autores/bruno-cesar-almeida",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "CRECI/PR 24.494"
    }
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://fymoob.com.br/#organization"
  },
  "mainEntityOfPage": "https://fymoob.com.br/blog/quanto-custa-morar-batel-curitiba",
  "articleSection": "Custo de Vida / Bairros",
  "about": [
    {"@type": "Place", "name": "Batel, Curitiba, Paraná"}
  ]
}
```

### FAQPage (obrigatório — rich snippets)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Quanto custa morar no Batel?", "acceptedAnswer": {"@type": "Answer", "text": "Entre R$ 8.500 e R$ 14.000 por mês para um casal em apartamento de 2 quartos, somando financiamento, condomínio, IPTU, contas básicas e custo de vida. Para 3 quartos com família, a faixa vai de R$ 14.000 a R$ 22.000/mês."}},
    {"@type": "Question", "name": "Vale a pena morar no Batel?", "acceptedAnswer": {"@type": "Answer", "text": "Vale para perfil executivo, casal sem filhos pequenos ou quem prioriza gastronomia, vida noturna e prestígio. O tradeoff: Batel custa em média R$ 3.000 a R$ 5.000 por mês a mais que bairros equivalentes como Água Verde ou Bigorrilho. Para famílias focadas em custo-benefício há alternativas melhores."}},
    {"@type": "Question", "name": "Qual o valor do aluguel no Batel em 2026?", "acceptedAnswer": {"@type": "Answer", "text": "Em abril/2026: studio/1 quarto R$ 2.000-4.000/mês, 2 quartos R$ 3.500-6.500/mês, 3 quartos R$ 5.000-12.000/mês, coberturas R$ 10.000-30.000/mês. Valores variam por metragem, idade do edifício e padrão de acabamento."}},
    {"@type": "Question", "name": "Qual o preço do metro quadrado no Batel?", "acceptedAnswer": {"@type": "Answer", "text": "R$ 17.924/m² em março/2026 (Índice FipeZAP), o mais alto de Curitiba e 54% acima da média da cidade (R$ 11.621/m²). Em imóveis novos de alto padrão, o valor pode ultrapassar R$ 25.000/m²."}},
    {"@type": "Question", "name": "Quanto custa o condomínio no Batel?", "acceptedAnswer": {"@type": "Answer", "text": "Varia conforme infraestrutura: edifícios sem lazer R$ 600-1.200/mês, com lazer básico R$ 1.000-2.000/mês, alto padrão com lazer completo R$ 1.500-4.000/mês. Coberturas em empreendimentos premium podem ultrapassar R$ 5.000/mês."}},
    {"@type": "Question", "name": "Quais são as alternativas mais acessíveis ao Batel?", "acceptedAnswer": {"@type": "Answer", "text": "Água Verde (R$ 12.178/m², 32% mais barato), Bigorrilho (R$ 14.117/m², 21% mais barato, meio-termo nobre), Portão (R$/m² 40-50% menor, com Shopping Palladium) e Rebouças (vizinho ao Batel com preços menores). Cada um atende a um perfil específico."}}
  ]
}
```

### BreadcrumbList

`Home > Blog > Quanto Custa Morar no Batel (Curitiba) em 2026` — já existe no layout, só confirmar.

---

## 11. Fontes consultadas

### Top competitors (análise estrutural)

- Habitec — artigos "Morar no Batel" / "Vale a pena morar no Batel"
- [Bairro Batel em Curitiba — MySide](https://myside.com.br/guia-curitiba/bairros-curitiba-pr)
- [Bairros nobres de Curitiba — QuintoAndar](https://www.quintoandar.com.br/guias/cidades/bairros-nobres-de-curitiba/)
- [Curitiba: Cost of Living — Numbeo](https://www.numbeo.com/cost-of-living/in/Curitiba)
- [Curitiba — Expatistan](https://www.expatistan.com/cost-of-living/curitiba)

### Dados / fontes primárias (MUST LINK no post)

- [Índice FipeZAP Residencial — Fipe](https://www.fipe.org.br/pt-br/indices/fipezap/) (R$/m² Batel mar/26)
- [Prefeitura de Curitiba — Consulta IPTU](https://www.curitiba.pr.gov.br/servicos/cidadao/iptu) (alíquota e valor venal)
- [Copel Tarifas Residenciais](https://www.copel.com/) (energia)
- [Sanepar Tarifas Residenciais](https://site.sanepar.com.br/) (água/esgoto)
- Caixa — Simulador de financiamento SBPE (valor parcela)

### Internas (FYMOOB — referência cruzada)

- `content/blog/quanto-custa-morar-batel-curitiba.mdx` (versão atual — objeto do rewrite)
- `docs/seo/serp-analysis-batel-vs-agua-verde.md` (padrão estrutural irmão)
- `docs/seo/serp-analysis-preco-m2-bairros.md` (fonte R$/m² FipeZAP mar/26)
- `docs/seo/serp-analysis-melhores-bairros.md` (panorama competidores)
- `content/blog/batel-vs-agua-verde-curitiba.mdx` (irmão natural — cross-link obrigatório)
- `content/blog/preco-metro-quadrado-curitiba-bairro.mdx` (pilar de dado R$/m²)
- `content/blog/melhores-bairros-curitiba-2026.mdx` (pilar do cluster)
- `content/blog/financiamento-caixa-itau-bradesco-comparativo.mdx` (cross-link financiamento)
- `content/blog/itbi-curitiba-valor-como-pagar.mdx` (cross-link ITBI)
- `src/app/imoveis/[bairro]/page.tsx` (validador de landing)
- `scripts/research/extract-stock-by-bairro.mjs` (validador de estoque)

---

## Notas finais para o rewriter

1. **TÍTULO:** usar `Quanto Custa Morar no Batel (Curitiba) em 2026` (46 chars). Preserva keyword primária + geo + ano.
2. **Breakdown mensal completo (GAP #1)** é O diferencial do post. Nenhum competidor soma 9 categorias. Tabela HTML + número-âncora TOTAL (R$ 8.500-14.000/mês para 2Q casal) é o snippet-material.
3. **Cenários por perfil (GAP #2)** — 3 H3s com breakdown + renda sugerida pela regra 30%. Vira formato template único no SERP.
4. **Comparação com Jardins/Itaim SP (GAP #3)** — posiciona Batel como "Jardins de Curitiba 30-40% mais barato" = ângulo high-intent pra público relocating.
5. **CORREÇÕES FACTUAIS YMYL OBRIGATÓRIAS (post atual tem erros):**
   - "Shopping Cristal" → **Shopping Crystal**
   - "Shopping Curitiba (vizinho)" → **Shopping Pátio Batel** (o "Curitiba" não existe)
   - "Colégio Dom Bosco" no Batel → **Escola Internacional de Curitiba (EIC)** ou **Colégio Marista Santa Maria**
   - "Teatro Paiol" → **Teatro Guaíra** (Centro, 8min) ou remover seção teatro
   - R$/m² "R$ 10.000 a R$ 20.000" sem fonte → **R$ 17.924/m² FipeZAP março/2026** + range por padrão
6. **REMOVER LINK `/imoveis/reboucas`** se existir — zero estoque no snapshot 2026-04-24. Citar texto puro.
7. **ESPALHAR menções a `/imoveis/batel`** — post atual só tem 1 link Markdown no parágrafo 1. Rewrite deve ter ≥3 menções contextuais (lead + preço + vale a pena + CTA).
8. **Mínimo 8 internal links** distribuídos, landing Batel (3+) + 3 alternativas (Água Verde, Bigorrilho, Portão) + 2 cross-posts (batel-vs-agua-verde, preco-m2). Variar âncoras.
9. **CRECI/PR 24.494 no schema BlogPosting** — E-E-A-T alto, competidores não têm.
10. **Tabela HTML `<table>` (não markdown)** na tabela de custo mensal total + tabela de cenários por perfil — formato preferido do featured snippet.
11. **YMYL:** todo número tem que ter fonte + data ao lado (FipeZAP mar/26, CRM FYMOOB abr/26, Prefeitura Curitiba 2026). Sem fonte → não cita.
12. **updatedAt + changelog inicial** — post evergreen, atualização semestral de valores vira freshness signal.
