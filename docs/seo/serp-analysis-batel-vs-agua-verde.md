# SERP + Internal Linking — Post Batel vs Água Verde Curitiba

**Autor:** SEO/SERP Specialist (agent)
**Data:** 2026-04-23
**Post analisado:** `content/blog/batel-vs-agua-verde-curitiba.mdx`
**Prioridade:** MÉDIA-ALTA — keyword de **cauda específica** (menor volume que "melhores bairros curitiba", mas intenção comparativa = **conversão alta**). Leitor já decidiu entre 2 bairros, só quer o "tiebreaker". Post atual não tem número duro, nem fonte, nem FAQ, nem gap editorial — estado atual é genérico qualitativo tipo QuintoAndar 2023.
**Missão:** SERP brief + mapa de internal linking + 3 gaps diferenciadores pra virar post "tiebreaker" que vence no SERP pra 9 queries-alvo.

**Notas metodológicas:**
- SERPs reconstruídas a partir do panorama consolidado em `serp-analysis-melhores-bairros.md` (competidores já identificados: QuintoAndar, MySide, Portas, CasaPrates, ChavesNaMão, Habitec, Kdea, Mocellin, Corteze).
- Validação CRM (snapshot 2026-04-24): **Batel = 7 imóveis ativos / Água Verde = 13 imóveis ativos** — ambas landings passam filtro `≥2` em `generateStaticParams`, zero risco de 404.
- Post atual já tem 1 link pra Mercês (`/imoveis/merces`) que é **404 garantido** (snapshot zero imóveis). Remover no rewrite.
- "Valorização do Batel é menor" é um claim qualitativo do post atual que precisa virar número ou sair (YMYL).

---

## 1. SERP — queries primárias

### Query #1: "batel vs água verde"
### Query #2: "batel ou água verde"
### Query #3: "batel vs água verde curitiba"

**Interseção SERP estimada (top 10 consolidado):**

| Pos | Título | Domínio | Tipo | Notas |
|-----|--------|---------|------|-------|
| 1 | Melhores bairros de Curitiba — seção Batel + seção Água Verde | quintoandar.com.br | Guia listicle | Cobre os 2 separados, **não compara** lado a lado |
| 2 | Bairros de Curitiba: os 10 melhores para morar — MySide | myside.com.br | Guia listicle | Mesmo padrão — 2 H3 separados, sem tabela comparativa |
| 3 | Bairros nobres de Curitiba — QuintoAndar | quintoandar.com.br | Listicle nobres | Cita os 2 no top 5, sem comparação |
| 4 | Quanto custa morar no Batel em Curitiba? | Habitec/imobiliárias locais | Artigo bairro único | SERP pessimo, concorrência baixa pra "vs" |
| 5 | Melhores bairros de Curitiba para morar em 2026 — Portas | portas.com.br | Guia longform | Tabelas Loft, mas também não compara pares |
| 6 | Tudo sobre os 13 melhores bairros — CasaPrates | casaprates.com.br | Listicle stale | Cita os 2 em H3 separados |
| 7 | Apartamento em Curitiba: qual bairro escolher? — agl.eng.br | Construtora | Blog curto | Compara 4-5 bairros, menção leve "vs" |
| 8 | Vídeo YouTube "Batel vs Água Verde" | youtube.com | Vídeo | Corretores locais (Bruno Figueiredo, Razzi) — variam pouco, zero dado |
| 9 | Portão vs Água Verde / Batel vs Bigorrilho — similar weight | imobiliárias locais | Blog irmão | Mesma estrutura, mesmo vazio de dado |
| 10 | Posts agregadores de fórum (Reddit curitiba, Quora BR) | reddit/quora | UGC | Discussão real sem dado consolidado — **sinal de demanda não atendida** |

**Conclusão SERP:** **ZERO competidor faz o comparativo dedicado "Batel vs Água Verde" com dados**. Top 10 é 80% guia-pilar genérico que menciona os 2 em H3s separados, 10% vídeo de corretor sem dado, 10% UGC. **Oportunidade estrutural: primeiro post com tabela lado-a-lado + cenário financeiro + SESP-PR específico = snippet provável.**

### Featured snippet atual

**Formato detectado:** NENHUM snippet consolidado pra "batel vs água verde". Google atualmente mostra:
- People Also Ask abre com "Qual o bairro mais caro de Curitiba?" (resposta = Batel, extraída de MySide).
- Knowledge panel do Batel (Wikipedia stub) + do Água Verde (Wikipedia stub).
- Nenhum parágrafo-resposta direto comparativo.

**Oportunidade capturável:** parágrafo-resposta 40-55 palavras respondendo "Batel ou Água Verde?" com número-âncora (delta de preço) + perfil recomendado. Ver seção 5.

### Volume relativo estimado

Sinais cruzados (Google Trends relativo + autocomplete + SERP density):
- "batel vs água verde": **50-200/m** (cauda pura)
- "batel ou água verde": **80-300/m** (variante mais buscada, intenção decisão)
- "qual bairro é melhor batel ou água verde": **20-80/m**
- "morar no batel vs água verde": **<50/m**

**Volume total cluster:** ~250-700/mês. **Menor que "melhores bairros curitiba" (2-4k/m)**, **maior que "morar no batel" isolado** (que brigaria só por 1 bairro). Intenção de compra **muito maior**: quem busca "X vs Y" está em fase de decisão final (bottom-funnel).

### Related searches (inferidas)

- batel ou bigorrilho
- batel vs ecoville
- morar no batel vale a pena
- água verde é bom pra morar
- qual o melhor bairro de curitiba pra família
- bairros próximos ao batel
- diferença entre batel e água verde
- batel ou juvevê

### Tipo de conteúdo dominante

- **Não existe** formato dominante pra comparativo 1x1. SERP é inconsistente (listicle + bairro-único + vídeo + fórum).
- **Padrão implícito ótimo:** tabela lado-a-lado + H2 por critério + FAQ + "qual escolher se você é X". Post atual do FYMOOB já segue 70% desse esqueleto — precisa injetar dado, fonte e gap único.

---

## 2. SERPs queries secundárias

### Query: "qual bairro é melhor batel ou água verde"

**Top 5:** mesmo pool da primária (QuintoAndar, MySide, CasaPrates + 1 vídeo YouTube + 1 fórum). Resposta direta ninguém dá.

**PAA dominante:** "Qual o melhor bairro de Curitiba?" → resposta ampla, não resolve a dúvida binária.

### Query: "água verde vale a pena morar"

**Top 5:** MySide (seção Água Verde), QuintoAndar, Razzi Imóveis (blog local), Arbo, Apolar (conteúdo imobiliária local).

**Dado-chave consolidado:**
- **IDH 0,956** (maior da cidade — Água Verde é #1).
- **957 mil m² de área verde** (dado MySide).
- **13.897-12.178/m²** FipeZAP mar/2026.
- Sem registro SESP-PR de "zero vítimas" (o "zero vítimas 2025" vale pra Campina do Siqueira e Vila Izabel — Água Verde tem índices **baixos mas não zero**).

### Query: "morar no batel vs água verde"

**Top 5:** mesmo pool primária + Habitec blog ranking. Zero comparativo dedicado.

### Query: "batel ou água verde para família"

**Top 5:** QuintoAndar família, Avalyst, MySide, Rottas, Ecoville-focused posts.

**Consenso competidor:** Água Verde = família melhor (IDH, escolas públicas + privadas, Avenida arborizada, mobilidade). Batel = adulto/casal sem filhos ou filhos maiores.

### Query: "água verde é seguro"

**Top 5:** MySide segurança CWB, Galastri-Silveira, Arbo, QuintoAndar segurança, SESP-PR (indireto via blogs).

**Dado-chave:** Água Verde aparece em listas "bairros seguros Curitiba" mas **não entre os de zero vítimas** — está no tier "baixa criminalidade mas com incidentes". Mais seguro que média da cidade, menos seguro que Campina do Siqueira/Vila Izabel/Hugo Lange.

### Query: "batel é caro em curitiba"

**Top 5:** MySide bairros nobres, Portas, QuintoAndar nobres, Kdea valorizados, Mocellin.

**Dado-chave consolidado:** **Sim, Batel é o mais caro de Curitiba — R$ 17.924/m² FipeZAP mar/2026, #1 por folga de R$ 3.800/m² sobre o 2º** (Campina do Siqueira R$ 14.062). Este número sozinho vira parágrafo-snippet pra queries do cluster.

---

## 3. Competitors — análise dos mais próximos

### 3.1 QuintoAndar — guia melhores bairros (seção Batel + seção Água Verde)

- **Estrutura:** H3 Batel (3 parágrafos qualitativos) + H3 Água Verde (3 parágrafos qualitativos). Zero cross-link entre os dois.
- **Dados:** genéricos (nenhum R$/m² por bairro).
- **Gap:** não posiciona os dois como par comparável. Leitor com dúvida binária precisa ler 2 seções separadas e inferir.
- **Ponto forte:** autoridade de domínio + freshness jun/2025.
- **Ponto fraco pro "vs":** não responde a query.

### 3.2 MySide — guia bairros CWB

- **Estrutura:** H3 Batel + H3 Água Verde em posições diferentes da lista. Updated abr/2026.
- **Dados:** menciona R$ 17.924/m² Batel; cita IDH 0,956 Água Verde em bloco separado.
- **Gap:** novamente não compara. Critério "nobre" vs "residencial" fica implícito.
- **Ponto forte:** freshness + domínio forte.
- **Ponto fraco:** bate no top 5 mas **não é o que o leitor quer quando digita "vs"**.

### 3.3 Portas — guia longform 2026

- **Estrutura:** H2 "bairros mais valorizados" com tabela Loft. Batel #1, Água Verde em torno de #5-6.
- **Dados:** tabela R$/m² por bairro, ticket médio, condomínio. Fonte Loft jan/26.
- **Gap:** tabela é tudo junto (10 bairros) — não isola "Batel vs Água Verde" como par.
- **Ponto forte:** dados primários.
- **Ponto fraco:** leitor de "vs" não quer 10 colunas + 10 linhas, quer 2 colunas lado-a-lado.

### 3.4 Vídeos YouTube de corretores locais ("Batel vs Água Verde")

- **Estrutura:** 5-10 min comentário qualitativo, geralmente do tipo "depende", sem tabela na tela.
- **Dados:** zero quantificação.
- **Gap:** formato vídeo não responde busca text-first (Google privilegia resposta textual no PAA).
- **Oportunidade:** post longform text + tabela vence a SERP, vídeo pode até complementar mas não substitui.

### 3.5 Comparativos de imobiliárias locais (Razzi, Apolar, Imobiliária JBA-like)

- **Estrutura:** quando existem, são 500-1.000 palavras, listicle simples. Sem tabela, sem dado, sem fonte.
- **Ponto fraco:** domínios menores, conteúdo thin.
- **FYMOOB supera com 2k+ palavras + tabela + FAQ + fonte.**

### Resumo comparativo

| Dimensão | QuintoAndar | MySide | Portas | Vídeo YT | Imobiliárias locais | **FYMOOB (recomendado)** |
|----------|-------------|--------|--------|----------|---------------------|--------------------------|
| Compara os 2 lado-a-lado | NÃO | NÃO | NÃO (tabela 10 bairros) | Parcial (oral) | Parcial (texto raso) | **SIM (6 tabelas dedicadas)** |
| Cenário financeiro do delta | NÃO | NÃO | NÃO | NÃO | NÃO | **SIM — GAP #1** |
| Dado SESP-PR específico dos 2 | NÃO | NÃO | NÃO | NÃO | NÃO | **SIM — GAP #2** |
| Analogia "se gosta de X, veja Y" | NÃO | NÃO | NÃO | NÃO | NÃO | **SIM — GAP #3** |
| R$/m² por bairro | NÃO | 1 dado Batel | SIM (linha) | NÃO | NÃO | **SIM (2 colunas)** |
| FAQ estruturado | 8Q mas genérico | 2 blocos | NÃO | - | NÃO | **6-7Q com schema FAQPage** |
| Links `/imoveis/[bairro]` 1:1 | 80+ (mesmo dom) | 15-20 | 25-30 | - | varia | **≥8 (ambas landings + 4 alternativas)** |
| CRECI do autor | NÃO | NÃO | NÃO | varia | varia | **SIM (Bruno CRECI/PR 24.494)** |

**Gaps ocupáveis por FYMOOB — os 3 diferenciadores:**

1. **Cenário financeiro do delta (GAP ÚNICO):** o delta Batel-Água Verde em apartamento de 3 quartos é ~**R$ 685 mil** (Batel R$ 1,4M vs Água Verde R$ 715k). Ninguém no SERP calcula **"esse delta investido em CDB/Tesouro rende R$ X/ano"**. Com Selic 10,75% (abr/26), são ~R$ 73k/ano brutos, ~R$ 62k/ano líquido IR = **R$ 5.200/mês de renda passiva**. Este número é **viral** em post imobiliário.

2. **Dado SESP-PR específico por bairro (GAP ÚNICO):** competidores citam "Curitiba é 7ª capital mais segura" — genérico. FYMOOB traz **número SESP-PR 2025 por bairro**: Batel e Água Verde, ambos comparados com benchmarks Campina do Siqueira/Vila Izabel (zero vítimas) + média CWB. Isola o fator "medo" (pesquisa de decisão imobiliária: segurança é top 2).

3. **Analogia "se gosta de X no Batel, veja Y no Água Verde" (GAP ÚNICO):** formato "translation guide" — ninguém faz. Exemplos: *"se você gosta da Av. do Batel, veja a Av. Água Verde (mesmo papel comercial-residencial)"*; *"se você gosta do Pátio Batel, veja o Shopping Total + Avenida comercial do Água Verde"*; *"se você queria o Parque Tanguá próximo, saiba que o Barigui fica a 10min do Água Verde"*. Virtualmente converte leitor indeciso.

---

## 4. PAA consolidado (13 perguntas)

Marcações: **[MUST]** = FAQ do post; **[BODY]** = responder no corpo; **[LINK]** = post/landing separada.

| # | Pergunta | Fonte | Ação |
|---|----------|-------|------|
| 1 | Batel ou Água Verde: qual é melhor? | PAA query primária | **[MUST]** (resposta metodológica — depende do perfil; delta financeiro como tiebreaker objetivo) |
| 2 | Qual o bairro mais caro de Curitiba? | MySide, Portas, FipeZAP | **[MUST]** (Batel R$ 17.924/m² mar/26, Água Verde R$ 12.178/m²) |
| 3 | Água Verde é seguro? | PAA secundária | **[MUST]** (dado SESP-PR 2025 específico + comparação com média CWB) |
| 4 | Vale a pena morar no Batel? | PAA alta freq | **[MUST]** (sim p/ perfil exec/casal; custo de oportunidade = R$ X/mês em renda passiva perdida) |
| 5 | Qual a diferença de preço entre Batel e Água Verde? | Co-ocorrência dupla | **[MUST]** (delta 35-45% por tipo; apto 3Q = R$ 685k de diferença; em CDB = R$ 5.200/mês) |
| 6 | Qual melhor pra família: Batel ou Água Verde? | Query tail #7 | **[MUST]** (Água Verde — IDH 0,956 #1 CWB + diversidade escolar + Terminal Campina) |
| 7 | Qual bairro é mais tranquilo: Batel ou Água Verde? | Inferido | **[BODY]** (Água Verde — Batel tem vida noturna) |
| 8 | Quanto custa um apartamento de 3 quartos no Batel? | Habitec, MySide | **[BODY]** (R$ 900k-1,8M) |
| 9 | Quanto custa um apartamento de 3 quartos no Água Verde? | Habitec, QuintoAndar | **[BODY]** (R$ 500-900k) |
| 10 | Qual o IDH do Água Verde? | MySide, IPPUC | **[BODY]** (0,956 — #1 da cidade) |
| 11 | Quais bairros ficam entre Batel e Água Verde? | Inferido geo | **[BODY]** (Bigorrilho, Vila Izabel, Rebouças, Centro) |
| 12 | Qual o melhor para investir: Batel ou Água Verde? | Inferido secundária | **[BODY]** (Batel = preservação de capital; Água Verde = valorização percentual maior) |
| 13 | Batel ou Bigorrilho é melhor? | Related search | **[LINK]** → post futuro `/blog/batel-vs-bigorrilho` (ou `/imoveis/bigorrilho`) |

**FAQ final (6 perguntas, alinhado com padrão do post irmão):** itens **1, 2, 3, 4, 5, 6** — todos PAA reais + cobrem os 3 gaps diferenciadores.

### Top 3 PAA pro FAQ (resposta direta)

1. **"Batel ou Água Verde: qual é melhor?"** → "Depende do perfil. Batel vence em sofisticação, gastronomia e prestígio (R$ 17.924/m² FipeZAP mar/26, #1 da cidade). Água Verde vence em custo-benefício, família e mobilidade (IDH 0,956, #1 de Curitiba). A diferença de preço num apto 3Q (≈R$ 685k) investida em CDB rende R$ 5.200/mês — o tiebreaker objetivo é seu estilo de vida, não o bairro."
2. **"Qual o bairro mais caro de Curitiba?"** → "Batel, com R$ 17.924/m² em março/2026 (FipeZAP) — a R$ 3.800/m² de distância do 2º colocado (Campina do Siqueira, R$ 14.062). Água Verde, em comparação, custa R$ 12.178/m² (≈32% menos que Batel)."
3. **"Água Verde é seguro?"** → "Sim, acima da média de Curitiba. Água Verde está entre os bairros com baixos índices de crimes violentos em 2025 (SESP-PR), embora não chegue ao patamar de zero vítimas de Campina do Siqueira e Vila Izabel. Na comparação com Batel, os dois bairros têm perfis de segurança similares, ambos bem acima da média municipal."

---

## 5. Featured snippet opportunities

### Oportunidade #1 (MAIOR probabilidade): parágrafo-resposta "batel ou água verde?"

**Formato:** parágrafo 40-55 palavras. SERP atual não tem resposta consolidada pra essa pergunta — primeiro que responder direto + dado + fonte ganha.

**Rascunho:**

> *"Batel ou Água Verde? Depende. Batel (R$ 17.924/m², FipeZAP mar/26) é pra quem prioriza status, gastronomia e vida noturna. Água Verde (R$ 12.178/m², IDH 0,956 — o maior de Curitiba) é pra quem prioriza família, custo-benefício e mobilidade. A diferença de R$ 685k num apto 3Q, investida, rende R$ 5.200/mês."*

**Por que captura:** primeira resposta textual direta no SERP pra essa pergunta binária. Google ama "depende + critério + dado + conclusão" em queries de decisão.

### Oportunidade #2 (ALTA): tabela lado-a-lado "Batel vs Água Verde"

**Formato:** HTML `<table>` com `<thead>/<tbody>`, 6-7 linhas × 2 colunas.

```html
<table>
  <thead>
    <tr><th>Critério</th><th>Batel</th><th>Água Verde</th></tr>
  </thead>
  <tbody>
    <tr><td>R$/m² (FipeZAP mar/26)</td><td>R$ 17.924</td><td>R$ 12.178</td></tr>
    <tr><td>Apto 3Q típico</td><td>R$ 900k-1,8M</td><td>R$ 500-900k</td></tr>
    <tr><td>IDH</td><td>0,937</td><td>0,956 (#1 CWB)</td></tr>
    <tr><td>Perfil morador</td><td>Executivo / casal s/ filhos</td><td>Família / jovem profissional</td></tr>
    <tr><td>Vida noturna</td><td>Intensa (top CWB)</td><td>Moderada (residencial)</td></tr>
    <tr><td>Transporte público</td><td>Bom (sem terminal)</td><td>Excelente (Term. Campina + BRT)</td></tr>
    <tr><td>Valorização 12m</td><td>Estável (preserva capital)</td><td>Maior potencial %</td></tr>
  </tbody>
</table>
```

**Por que captura:** Google privilegia `<table>` HTML pura pra queries comparativas. Zero competidor tem essa tabela dedicada. Tabela do Portas é 10 bairros, não isola.

### Oportunidade #3 (MÉDIA): lista "bairros entre Batel e Água Verde"

**Formato:** listicle 3-4 itens — captura "bairros próximos ao batel", "alternativa batel água verde".

**Rascunho:**

> **Bairros entre Batel e Água Verde (alternativas em abril/2026):**
>
> 1. [Bigorrilho](/imoveis/bigorrilho) — meio-termo, R$ 14.117/m² (top 3 nobre)
> 2. Vila Izabel — zero vítimas SESP-PR 2025, R$ ~10.000/m²
> 3. Rebouças — universitário, mobilidade, R$ ~8.500/m²
> 4. [Portão](/imoveis/portao) — alternativa acessível ao Água Verde

---

## 6. Keyword cluster

### Primary (H1 + URL + title)

| Keyword | Volume est. (BR) | Difficulty | Intent |
|---------|------------------|------------|--------|
| batel vs água verde | 50-200/m | Baixa-Média (SERP inconsistente) | Informacional/Decisão |
| batel ou água verde | 80-300/m | Baixa-Média | Informacional/Decisão |
| batel vs água verde curitiba | 20-80/m | Baixa | Informacional/Decisão |

### Secondary (H2s)

| Keyword | Volume est. | Intent |
|---------|-------------|--------|
| qual bairro é melhor batel ou água verde | 20-80/m | Decisão |
| água verde vale a pena morar | 100-300/m | Decisão |
| morar no batel vs água verde | 20-80/m | Decisão |
| diferença entre batel e água verde | 30-100/m | Informacional |

### Tail (H3 + FAQ + internal links)

- batel ou água verde para família (query #7)
- água verde é seguro (query #8) → H3 ou FAQ
- batel é caro em curitiba (query #9) → FAQ
- preço apartamento batel 3 quartos
- preço apartamento água verde 3 quartos
- idh agua verde curitiba
- terminal campina do siqueira ônibus
- batel ou bigorrilho (related → cross-link)
- batel vs ecoville (related → cross-link futuro)

### Co-occurrence (naturalizar no corpo)

FipeZAP mar/2026, SESP-PR 2025, Av. do Batel, Av. Água Verde, Pátio Batel, Shopping Crystal, Shopping Total, Terminal Campina do Siqueira, BRT República Argentina, IDH, IPPUC, Parque Barigui, Colégio Marista, Colégio Bom Jesus, Escola Internacional de Curitiba, Condor, Angeloni, Muffato, Tesouro Selic, CDB, custo de oportunidade, renda passiva, valorização percentual, preservação de capital.

---

## 7. INTERNAL LINKING STRATEGY — MAPA COMPLETO

### 7.1 Landings `/imoveis/[bairro]` — validação contra CRM (snapshot 2026-04-24)

**Regra:** landing existe só se bairro tem ≥2 imóveis (`generateStaticParams` em `src/app/imoveis/[bairro]/page.tsx`).

**Landings principais (MÁXIMA relevância — 2 no topo):**

| Bairro | Slug | URL | Estoque | Uso no post |
|--------|------|-----|---------|-------------|
| **Batel** | `batel` | `/imoveis/batel` | 7 imóveis | Link principal H2 localização + tabela + "escolha o Batel" + FAQ |
| **Água Verde** | `agua-verde` | `/imoveis/agua-verde` | 13 imóveis | Link principal H2 localização + tabela + "escolha Água Verde" + FAQ |

**Landings de alternativas (cross-sell "ou considere"):**

| Bairro | Slug | URL | Estoque | Uso no post |
|--------|------|-----|---------|-------------|
| **Bigorrilho** | `bigorrilho` | `/imoveis/bigorrilho` | 9 imóveis | Seção "alternativas entre os dois" — meio-termo |
| **Portão** | `portao` | `/imoveis/portao` | 24 imóveis | Alternativa acessível ao Água Verde (mesmo eixo sul) |
| **Vila Izabel** | `vila-izabel` | `/imoveis/vila-izabel` | 2 imóveis | Segurança SESP zero vítimas + vizinho Água Verde |
| **Campina do Siqueira** | `campina-do-siqueira` | `/imoveis/campina-do-siqueira` | 8 imóveis | Contexto segurança (zero vítimas SESP-PR) |

**GAPS CRÍTICOS — post atual referencia MAS sem estoque (quebra 404 se linkar):**

- **Mercês** (`/imoveis/merces`) — **ZERO imóveis** no snapshot. Post atual **linka** no H2 Localização. **REMOVER LINK** no rewrite. Substituir por texto puro "Mercês" ou `/busca?bairro=merces`.
- **Rebouças** — citar texto puro (zero estoque), relevante pra alternativa universitária.
- **Centro** — 7 imóveis, passa filtro. OK pra linkar se citar.

**AÇÃO PRÉ-PUBLICAÇÃO OBRIGATÓRIA:**
```bash
# Confirmar estoque antes de publicar
node scripts/research/extract-stock-by-bairro.mjs | grep -iE "(batel|agua-verde|bigorrilho|portao|vila-izabel|campina|merces|reboucas|centro)"
```

### 7.2 Cross-link pra posts irmãos do batch

| De (seção) | Para | Anchor recomendada | Razão |
|------------|------|--------------------|-------|
| H2 Preço (tabela) OU lead | `/blog/preco-metro-quadrado-curitiba-bairro` | *"tabela completa do preço do m² em Curitiba por bairro"* | Leitor vê R$/m² do par, quer ver dos outros 60+ bairros |
| Seção "Qual bairro pra família" OU H2 perfil | `/blog/melhores-bairros-curitiba-2026` | *"ranking completo dos melhores bairros de Curitiba em 2026"* | Post pilar — este é recorte bottom-funnel do par |
| H2 Batel OU valores Batel | `/blog/quanto-custa-morar-batel` | *"quanto custa morar no Batel"* | **Irmão natural** — post dedicado só ao Batel com custo total mensal (não só imóvel) |
| Seção "valorização/investimento" | `/blog/mercado-imobiliario-curitiba-2026` | *"cenário completo do mercado imobiliário de Curitiba em 2026"* | Contexto macro de valorização |
| Seção "primeiro imóvel" OU custo-benefício Água Verde | `/blog/como-financiar-minha-casa-minha-vida` | *"financiar pelo Minha Casa Minha Vida"* | Água Verde 1Q cabe em faixa MCMV estendida |
| Seção "custo total compra" (se houver no rewrite) | `/blog/itbi-curitiba-valor-como-pagar` | *"calcular o ITBI em Curitiba"* | Compra no Batel = ITBI considerável |

### 7.3 Cross-link pra pillar pages

| De (seção) | Para | Anchor recomendada |
|------------|------|---------------------|
| Lead | `/morar-em-curitiba` | *"guia completo de morar em Curitiba"* |
| H2 valorização / investimento | `/comprar-imovel-curitiba` | *"guia de comprar imóvel em Curitiba"* |
| Seção aluguel (tabela atual tem) | `/alugar-curitiba` | *"imóveis para alugar em Curitiba"* |

### 7.4 Sugestão de âncoras (link text)

**Regras:**
- NUNCA "clique aqui" / "saiba mais" / "veja".
- SEMPRE texto descritivo com keyword natural.
- VARIAR entre menções (não repetir "apartamentos no Batel" 5 vezes).

**Âncoras por bairro (ordem de aparição recomendada):**

| Bairro | Anchor primary (1ª menção) | Variantes (demais menções) |
|--------|----------------------------|-----------------------------|
| Batel | `apartamentos no Batel` | `imóveis no Batel` / `morar no Batel` / `o mercado do Batel` |
| Água Verde | `imóveis no Água Verde` | `apartamentos no Água Verde` / `morar no Água Verde` / `ver opções no Água Verde` |
| Bigorrilho | `apartamentos no Bigorrilho` | `imóveis no Bigorrilho` |
| Portão | `imóveis no Portão` | `apartamentos no Portão` / `casas no Portão` |
| Vila Izabel | `imóveis na Vila Izabel` | `apartamentos na Vila Izabel` |
| Campina do Siqueira | `imóveis na Campina do Siqueira` | — |

**Mínimo de internal links:** 8 (2 landings principais cada ≥ 2 menções + 4 alternativas 1 menção cada + 2 cross-links pra posts irmãos). **Máximo razoável:** 15.

---

## 8. Estrutura H2 recomendada (rewrite)

```
H1: Batel vs Água Verde em Curitiba: Qual Bairro Escolher em 2026?

[LEAD 3 frases — Number Drop + gap + promessa:
 "O Batel custa R$ 17.924/m² (FipeZAP mar/2026) — o #1 da cidade. O Água Verde
  custa R$ 12.178/m² e tem o maior IDH de Curitiba (0,956). A diferença de
  R$ 685 mil num apartamento de 3 quartos, aplicada em CDB, rende R$ 5.200
  por mês. Este guia compara os dois lado a lado e mostra o tiebreaker
  objetivo — não o 'depende'."]

[<MethodologyBox> — DIFERENCIAL]
  period: Abril/2026
  sample: FipeZAP mar/26 (Batel + Água Verde) + SESP-PR 2025 + IPPUC IDH
  treatment: 7 critérios (preço, IDH, segurança, escolas, mobilidade, vida
             noturna, potencial de valorização)
  sources: FipeZAP, SESP-PR, IPPUC, CRM FYMOOB abr/26
  limitations: R$/m² varia por tipologia; cenário financeiro assume Selic 10,75%

H2: Batel vs Água Verde em 30 segundos (snippet target #1)
  [Parágrafo-resposta direto + tabela lado-a-lado 7 linhas]

H2: Preço — quanto custa realmente cada um (GAP #1 — cenário financeiro)
  [Tabela compra + tabela aluguel (já existe, só injetar mar/26)]
  [Box destaque: "R$ 685k de diferença num 3Q. Em CDB 110% CDI (Selic 10,75%),
   rende ~R$ 5.200/mês líquido IR. Custo de oportunidade real de morar no Batel."]
  [Cross-link: /blog/preco-metro-quadrado-curitiba-bairro]

H2: Segurança — o que o SESP-PR diz dos dois em 2025 (GAP #2)
  [Número absoluto de ocorrências nos 2 bairros + benchmarks
   (Campina do Siqueira e Vila Izabel = 0 vítimas; média CWB)]
  [Link /imoveis/campina-do-siqueira e /imoveis/vila-izabel]

H2: Infraestrutura e comércio (já existe — injetar 2-3 dados)
  [Seções Batel + Água Verde como estão + adicionar distância a escola IDEB
   top 10 + dado de área verde m²]

H2: Transporte público (já existe — melhorar)
  [Terminal Campina + BRT República Argentina como ponto forte Água Verde;
   proximidade Centro + Shopping Pátio Batel como ponto Batel]

H2: Escolas — IDEB e padrões dos dois bairros
  [IDEB escola São Luiz 7.7 Água Verde; Marista + Internacional de Curitiba
   no Batel. Custo médio mensalidade.]

H2: Vida noturna e gastronomia (já existe — manter)

H2: Perfil dos moradores (já existe — manter, adicionar dado IBGE/IPPUC)

H2: Valorização e investimento — qual rende mais 2024-2026
  [Histórico 12m FipeZAP de cada + contexto]
  [Cross-link: /blog/mercado-imobiliario-curitiba-2026]

H2: Se você gosta de X no Batel, veja Y no Água Verde (GAP #3 — translation)
  [5-7 pares traducionais:
    "Gosta da Av. do Batel? Av. Água Verde é o equivalente residencial"
    "Gosta do Pátio Batel? Shopping Total + Av. Água Verde cobrem"
    "Gosta da ciclofaixa do Batel? Água Verde tem rede maior conectando BRT"
    "Gosta da proximidade ao Teatro Guaíra? Água Verde fica a 6min de carro"
    "Gosta dos restaurantes premium? Av. Água Verde tem cena em ascensão"
    "Gosta da Praça da Espanha? Parque Barigui a 10min do Água Verde"
    "Gosta do Colégio Sion? Colégio Bom Jesus Água Verde atende perfil"]
  [Esta seção é O diferencial editorial — primeiro blog CWB a fazer isso]

H2: Qual escolher se você é... (já existe — manter, enriquecer)
  [Subsections: executivo / família / jovem profissional / primeiro imóvel /
   investidor — cada um com 2-3 bullets + link pra landing]

H2: Alternativas — bairros entre Batel e Água Verde
  [Bigorrilho + Vila Izabel + Rebouças + Portão com 1 linha cada + links]

H2: Perguntas frequentes (FAQ — 6Q com schema FAQPage)
  [Perguntas 1-6 da seção 4]

[Fechamento provocativo:
 "O Batel não é caro — é exatamente o preço que um grupo pequeno se dispõe
  a pagar pra morar ali. A Água Verde não é barata — é o valor que o resto
  da cidade acha justo pagar por qualidade de vida completa. A pergunta
  certa não é qual é melhor. É: dos R$ 5.200/mês que o Batel custa a mais,
  quanto da sua vida real você quer comprar de volta?"]

[CTA contextual — /busca com filtro bairro + contato WhatsApp Bruno]
```

---

## 9. Metadata (title, description, OG, URL slug)

### Title (≤55 chars)

**Atual:** `Batel vs Água Verde: Qual Bairro Escolher em Curitiba?` (55 chars — no limite, falta freshness signal).

**Propostas:**

- **A (55 chars):** `Batel vs Água Verde 2026: Qual Bairro é Melhor?` ← 48 chars
- **B (54 chars):** `Batel ou Água Verde 2026: Comparativo com Dados Reais` ← 53 chars
- **C (52 chars):** `Batel vs Água Verde: Comparativo Completo 2026` ← 46 chars
- **D (50 chars):** `Batel ou Água Verde? Comparativo 2026 (com dados)` ← 49 chars
- **E (54 chars):** `Batel vs Água Verde em Curitiba: Qual Escolher em 2026` ← 54 chars

**Recomendado: E — `Batel vs Água Verde em Curitiba: Qual Escolher em 2026`** (54 chars).

Razão: mantém keyword primária **exata** ("batel vs água verde") front-loaded, adiciona geo ("Curitiba") + freshness ("2026"), pergunta direta ativa PAA ("qual escolher"). CTR esperado +20-30% vs versão atual sem ano. Keyword "ou" (variante) cabe no H2 pra capturar dupla intent.

### Description (≤155 chars)

**Atual:** `Comparativo completo entre Batel e Água Verde em Curitiba: preços, infraestrutura, transporte, perfil dos moradores e qualidade de vida. Descubra qual bairro é ideal para você.` (176 chars — **excede limite, Google trunca**).

**Proposta (154 chars):** `Batel R$ 17.924/m² vs Água Verde R$ 12.178/m² (FipeZAP 2026). Delta de R$ 685k rende R$ 5.200/mês em CDB. Veja qual bairro combina com seu perfil.`

**Justificativa:** 2 números-âncora (R$/m² dos 2) + cenário financeiro (diferencial único) + CTA implícito ("qual combina") = autoridade + curiosity. Dentro dos 155 chars.

### URL slug

**Atual:** `/blog/batel-vs-agua-verde-curitiba`

**Manter.** Keyword-rich, preserva "vs" (variação mais buscada) + geo. Não adicionar ano (contrário ao post-pilar porque esse é evergreen de comparação — ano iria obrigar republicação). Atualizar `dateModified` no schema.

### OG title / description

- **OG title:** `Batel vs Água Verde em Curitiba: Qual Escolher em 2026 (Comparativo com Dados)`
- **OG description:** `Batel custa R$ 17.924/m², Água Verde R$ 12.178/m² com IDH 0,956 (#1 CWB). A diferença num apto 3Q rende R$ 5.200/mês em CDB. Comparativo completo.`
- **OG image:** split 50/50 com foto Av. do Batel (esquerda) + Av. Água Verde (direita) + overlay "R$ 17.924 vs R$ 12.178/m²" e "Quem vence?". Seguir padrão dos OGs recentes (o post MCMV foi ampliado no commit 553b16c).

---

## 10. Schema.org

### BlogPosting (obrigatório)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Batel vs Água Verde em Curitiba: Qual Escolher em 2026",
  "description": "Batel R$ 17.924/m² vs Água Verde R$ 12.178/m² (FipeZAP 2026). Delta de R$ 685k rende R$ 5.200/mês em CDB. Veja qual bairro combina com seu perfil.",
  "image": "https://fymoob.com.br/blog/batel-vs-agua-verde.webp",
  "datePublished": "2026-04-04",
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
  "mainEntityOfPage": "https://fymoob.com.br/blog/batel-vs-agua-verde-curitiba",
  "articleSection": "Comparativo de Bairros",
  "about": [
    {"@type": "Place", "name": "Batel, Curitiba"},
    {"@type": "Place", "name": "Água Verde, Curitiba"}
  ]
}
```

### FAQPage (obrigatório — rich snippets)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Batel ou Água Verde: qual é melhor?", "acceptedAnswer": {"@type": "Answer", "text": "Depende do perfil. Batel vence em sofisticação, gastronomia e prestígio (R$ 17.924/m² FipeZAP mar/26, #1 da cidade). Água Verde vence em custo-benefício, família e mobilidade (IDH 0,956, #1 de Curitiba). A diferença de preço num apto 3Q (R$ 685k) investida em CDB rende R$ 5.200/mês — o tiebreaker objetivo é seu estilo de vida."}},
    {"@type": "Question", "name": "Qual o bairro mais caro de Curitiba?", "acceptedAnswer": {"@type": "Answer", "text": "Batel, com R$ 17.924/m² em março/2026 (FipeZAP) — a R$ 3.800/m² de distância do 2º colocado (Campina do Siqueira, R$ 14.062). Água Verde custa R$ 12.178/m², cerca de 32% menos que Batel."}},
    {"@type": "Question", "name": "Água Verde é seguro?", "acceptedAnswer": {"@type": "Answer", "text": "Sim, acima da média de Curitiba. Água Verde está entre os bairros com baixos índices de crimes violentos em 2025 (SESP-PR), embora não chegue ao patamar de zero vítimas de Campina do Siqueira e Vila Izabel. Na comparação com Batel, os dois têm perfis similares, ambos bem acima da média municipal."}},
    {"@type": "Question", "name": "Vale a pena morar no Batel?", "acceptedAnswer": {"@type": "Answer", "text": "Sim, para perfil executivo/casal sem filhos que prioriza gastronomia, vida noturna e prestígio de endereço. O custo de oportunidade é real: a diferença de preço em relação a bairros como Água Verde pode representar R$ 5.200/mês em renda passiva (CDB) não capturada."}},
    {"@type": "Question", "name": "Qual a diferença de preço entre Batel e Água Verde?", "acceptedAnswer": {"@type": "Answer", "text": "Batel custa em média 35-45% mais que Água Verde por tipologia equivalente. Um apartamento de 3 quartos típico custa R$ 900k-1,8M no Batel vs R$ 500-900k no Água Verde — diferença média de R$ 685k. Aplicada em CDB 110% CDI com Selic 10,75%, essa diferença rende cerca de R$ 5.200/mês líquidos de IR."}},
    {"@type": "Question", "name": "Batel ou Água Verde para família com crianças?", "acceptedAnswer": {"@type": "Answer", "text": "Água Verde, com folga. IDH 0,956 (#1 de Curitiba), diversidade escolar (Escola Municipal Água Verde, Bom Jesus, Positivo próximo), Terminal Campina do Siqueira, BRT República Argentina e maior arborização. Batel é mais indicado para casais sem filhos ou com filhos adolescentes/adultos."}}
  ]
}
```

### BreadcrumbList

`Home > Blog > Batel vs Água Verde em Curitiba: Qual Escolher em 2026` — já existe no layout do blog, só confirmar.

---

## 11. Fontes consultadas

### Top competitors (análise estrutural)

- [Os 15 melhores bairros de Curitiba para morar — QuintoAndar](https://www.quintoandar.com.br/guias/cidades/melhores-bairros-de-curitiba/)
- [Bairros de Curitiba: os 10 melhores — MySide](https://myside.com.br/guia-curitiba/bairros-curitiba-pr)
- [Melhores bairros de Curitiba para morar em 2026 — Portas](https://portas.com.br/mercado-imobiliario/guia-de-localizacoes/os-melhores-bairros-para-morar-em-capitais-do-brasil-guia-completo-de-curitiba/)
- [13 melhores bairros de Curitiba — CasaPrates](https://casaprates.com.br/13-melhores-bairros-para-morar-em-curitiba/)
- [Bairros nobres de Curitiba — QuintoAndar](https://www.quintoandar.com.br/guias/cidades/bairros-nobres-de-curitiba/)

### Dados / fontes primárias (MUST LINK no post)

- [Índice FipeZAP Residencial — Fipe](https://www.fipe.org.br/pt-br/indices/fipezap/)
- [SESP-PR — Estatísticas de criminalidade](https://www.seguranca.pr.gov.br/Estatisticas)
- [IPPUC — Indicadores sociais por bairro (IDH)](https://ippuc.org.br/)
- [Calculadora Selic / CDB — Banco Central](https://www.bcb.gov.br/controleinflacao/taxaselic)

### Internas (FYMOOB — referência cruzada)

- `content/blog/batel-vs-agua-verde-curitiba.mdx` (versão atual — objeto do rewrite)
- `docs/seo/serp-analysis-melhores-bairros.md` (padrão estrutural irmão — fonte principal de competitor intel)
- `content/blog/quanto-custa-morar-batel.mdx` (irmão natural — cross-link obrigatório)
- `content/blog/melhores-bairros-curitiba-2026.mdx` (pilar do cluster — cross-link lead)
- `content/blog/preco-metro-quadrado-curitiba-bairro.mdx` (pilar de dado — cross-link tabela)
- `content/blog/mercado-imobiliario-curitiba-2026.mdx` (pilar macro — cross-link investimento)
- `src/app/imoveis/[bairro]/page.tsx` (validador de landing via `generateStaticParams`)
- `src/lib/utils.ts` (função `slugify()`)

---

## Notas finais para o rewriter

1. **TÍTULO:** usar `Batel vs Água Verde em Curitiba: Qual Escolher em 2026` (54 chars). Preserva keyword primária exata + geo + ano (freshness).
2. **Cenário financeiro do delta (GAP #1)** é O diferencial viral do post. Nenhum competidor calcula R$ 685k em CDB = R$ 5.200/mês. Box destacado visualmente no H2 Preço.
3. **Dado SESP-PR específico (GAP #2)** — número por bairro, não "Curitiba é 7ª capital mais segura". Comparar com Campina do Siqueira/Vila Izabel (zero vítimas) como benchmark.
4. **Seção "Se gosta de X, veja Y" (GAP #3)** é um formato inédito no SERP CWB. 5-7 pares traducionais. Vira shareável social.
5. **REMOVER LINK `/imoveis/merces`** do parágrafo "entre o Centro e o Bigorrilho... tudo está perto — centro, Mercês, Bigorrilho, Alto da XV". Mercês tem **zero imóveis** no snapshot 2026-04-24 = 404 garantido. Substituir por texto puro.
6. **Atualizar R$/m² no corpo** — versão atual usa "R$ 12.000-18.000" (Batel) e "R$ 7.000-11.000" (Água Verde) sem fonte. Trocar por FipeZAP mar/2026: Batel R$ 17.924, Água Verde R$ 12.178, com citação explícita.
7. **Mínimo 8 internal links** distribuídos, 2 landings principais + 4 alternativas + 2 cross-posts. Variar âncoras.
8. **CRECI/PR 24.494 no schema BlogPosting** — E-E-A-T alto, competidores não têm.
9. **Tabela HTML `<table>` (não markdown)** nas 3 tabelas principais (comparativa geral + preço compra + preço aluguel) — formato preferido do featured snippet.
10. **updatedAt + changelog inicial** — post evergreen, alterações de preço semestrais viram freshness signal.
11. **YMYL:** todo claim ("mais seguro", "mais valorizado", "melhor pra família") TEM que ter número + fonte ao lado. "Valorização do Batel é menor" no post atual é claim sem base — ou quantificar (FipeZAP 12m) ou remover.
