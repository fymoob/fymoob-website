# FYMOOB Research & Fact-Checking Protocol

> **Status:** ATIVO — obrigatório para todo post YMYL (finanças + imobiliário + jurídico-fiscal) a partir de 2026-04-23.
> **Escopo:** todo conteúdo editorial publicado em `/blog/*` e landings programáticas que citem números, datas, leis ou dados de mercado.
> **Autoridade:** este documento tem precedência sobre velocidade de publicação. Post sem sign-off de verificação não vai pro ar.
> **Complementa:** [Manual Editorial](./editorial-style-guide.md) (voz/estilo) e [Data Sources Map](./data-sources-map.md) (hierarquia de fontes). Este protocolo é sobre processo, não sobre tom.

---

## Por que este protocolo existe

FYMOOB publica conteúdo YMYL (Your Money / Your Life) no qual um erro factual custa ao leitor dinheiro real — centenas de milhares de reais em financiamento errado, milhares em ITBI mal calculado, decisão de compra em bairro errado. Google Quality Raters avaliam YMYL com o teto mais alto de E-E-A-T: um único erro numérico ou atribuição jurídica errada pode derrubar o domínio inteiro.

Precedentes internos que forçaram esta formalização:

- **Post 1 — MCMV (23/04/2026):** publicado dizendo "Faixa 4 é nova". WebFetch em gov.br pós-publicação revelou que era "ampliada". Rollback em 24h salvou reputação.
- **Post 2 — Financiamento (23/04/2026):** editorial agent recomendou número "R$ 270k" como padrão. Data agent provou que só bate com imóvel R$ 1M+. Sem cross-check, teria ido post factualmente falso.
- **Post 3 — Mercado Curitiba (23/04/2026):** audit preliminar apontou "Mercês passou Batel". FipeZap validada pelo local agent mostrou que o real era **Ahú +12,5%**, não Mercês. Corrigido antes do publish.
- **Post 4 — ITBI (24/04/2026):** título Q2 dizia "STF Tema 1113". Legal agent + Data agent cruzados apontaram que é **STJ** (REsp 1.937.821/SP). Erro jurídico grave evitado.

Três erros críticos interceptados em 4 posts = taxa de erro potencial de 75% sem fact-check formal. Daí este documento.

---

## Princípios FYMOOB (adaptados de IFCN + Poynter + BBC)

Os cinco compromissos do [IFCN Code of Principles](https://ifcncodeofprinciples.poynter.org/the-commitments), adaptados ao contexto de conteúdo imobiliário YMYL brasileiro:

### Princípio 1 — Não-partidarismo e padrão único

Aplicar o mesmo nível de rigor a todo claim, independente do viés comercial. Se o post fala bem da Caixa, a Caixa passa pelos 3 cross-checks. Se o post fala mal do Itaú, o Itaú passa pelos mesmos 3 cross-checks. **Zero tolerância a "a gente solta esse número porque favorece a FYMOOB"**.

Concretamente: se o dado beneficia a narrativa do post, ele precisa de **1 fonte adicional de cross-check** além do mínimo. Viés narrativo se neutraliza com prova extra.

### Princípio 2 — Transparência de fontes (o leitor pode replicar)

Todo claim factual citado no post tem que poder ser reproduzido pelo leitor a partir das fontes linkadas. Regra operacional: se alguém ler o post, ir no link da fonte primária, e não conseguir chegar no mesmo número, o post falha.

Concretamente:
- Toda tabela de dados tem `<sup>[Fonte]</sup>` com link direto (não "site oficial", mas o URL profundo que leva à página com o número).
- Toda menção a lei cita **número + data + ementa curta** (ex: "LC 137/2022 — Prefeitura de Curitiba").
- Toda taxa bancária cita **banco + produto + data de consulta + link pra página oficial**.

### Princípio 3 — Transparência de metodologia

No final de todo post pilar, um bloco `<Metodologia>` em 3-5 frases: o que foi pesquisado, quando, quais fontes primárias usadas, data da última verificação. Não precisa ser longo. Precisa existir.

Exemplo: *"Taxas consultadas diretamente nas páginas oficiais dos 5 bancos em 23/04/2026. CET calculado com simuladores oficiais de cada banco, cenário: imóvel R$ 500 mil, entrada 20%, prazo 30 anos, renda R$ 10 mil. Última verificação: 23/04/2026."*

### Princípio 4 — Política aberta de correções

Quando descobrimos erro, corrigimos visivelmente. Não apagamos e fingimos que nunca existiu. Todo post tem:
- `updatedAt` no frontmatter — atualizado a cada correção.
- Bloco `<Correções>` no fim do post quando houver correção factual: *"27/04/2026: corrigido atribuição STF → STJ no Tema 1113. O Tema é do STJ, não do STF."*
- Se o erro mudou a tese do post (não só datilografia), tag na home `Corrigido em [data]` por 7 dias.

### Princípio 5 — Nunca supor (específico FYMOOB, derivado do histórico interno)

Extensão do princípio [Nunca Supor](../../CLAUDE.md#nunca-supor--regra-fundamental) já existente no projeto, aplicado ao fact-check: **blacklist conservadora > whitelist estrita**. Se um dado não pode ser validado em fonte primária, ele sai do post. Preferir um post com 80% dos números que um post com 100% dos números dos quais 10% são chutes.

---

## Hierarquia de tiers

Este protocolo assume a hierarquia definida em [`./data-sources-map.md`](./data-sources-map.md). Resumo rápido:

| Tier | Descrição | Exemplos | Uso permitido |
|---|---|---|---|
| **T1 — Primária oficial** | Emissor direto do dado | Banco Central, gov.br, Prefeitura de Curitiba, Receita Federal, STJ/STF, bancos (páginas oficiais), IBGE | Sempre preferida. Obrigatória para leis, taxas, decisões judiciais. |
| **T2 — Índice público auditado** | Órgão/empresa com metodologia pública e auditada | FipeZap, CBIC, Abecip, Secovi-PR, Sinduscon-PR | Aceito pra tendências de preço/mercado. Citar com metodologia. |
| **T3 — Imprensa de referência** | Veículo com editorial verificado | Valor, InfoMoney, Exame, Folha, Estadão, JOTA, Conjur, Migalhas | Aceito pra contexto e interpretação. Nunca como única fonte de número. |
| **T4 — Blog especializado / imobiliárias grandes** | Autoridade setorial com editorial | Loft, MySide, Nubank blog, Larya, iDinheiro | Aceito pra contexto/comparação. Nunca como única fonte de número. |
| **T5 — Redes sociais / fóruns / portais agregadores** | Reclame Aqui, LinkedIn, Reddit, YouTube | — | **Nunca como fonte primária.** Pode ser usado como indicativo de tendência ("reclamações apontam" + linkar), nunca como número. |

**Regra de ouro:** número vem de T1 ou T2. T3/T4 pode ser link de contexto mas não substitui T1/T2 como fonte.

**Regra de desempate em divergência:** Tier menor (mais próximo da fonte) vence Tier maior — **exceto** quando Tier maior for mais recente e o dado em questão for claramente datado (ex: taxa Selic publicada na Folha hoje supera relatório do Banco Central de 3 meses atrás *se* o dado for sobre a Selic atual; já pra histórico, o Banco Central sempre vence).

---

## Protocolo em 8 fases

Cada fase tem: **input**, **processo**, **output**, **agent responsável**, **checkpoint de bloqueio** (o que impede avançar pra próxima fase).

### Fase 1 — Pre-Research Briefing

**Input:** tema do post + keyword primária + baseline GSC (impressões/clicks atuais, se existir post).

**Processo:**
1. Definir escopo em 1 parágrafo: o que o post responde, o que NÃO responde.
2. Identificar tier YMYL:
   - **YMYL-alto:** finanças diretas (taxas de juro, simulações de financiamento, decisões de compra de imóvel), jurídico-fiscal (ITBI, ITCMD, IR sobre imóvel, decisões STJ/STF).
   - **YMYL-médio:** mercado (preços, valorização, tendências), bairros (perfil, segurança, yield).
   - **YMYL-baixo:** guias operacionais (como funciona avaliação, o que é documentação).
3. Identificar público-alvo: primeiro comprador? investidor? corretor? Define profundidade e nível de jargão.
4. Listar claims estratégicos que o post *precisa* sustentar (sem eles, o post não tem tese).

**Output:** `Research Brief` — 1 página com escopo + tier YMYL + público + 3-5 claims estratégicos.

**Agent responsável:** main (síntese inicial), antes de disparar specialists.

**Checkpoint:** se tier é YMYL-alto e algum claim estratégico não tem fonte T1/T2 identificada de cara, **pausar** e fazer spike de pesquisa antes de continuar.

### Fase 2 — Source Gathering

**Input:** Research Brief + Data Sources Map.

**Processo:**
1. Para cada claim estratégico da Fase 1, identificar mínimo **3 fontes independentes**:
   - 1 T1 obrigatória (oficial).
   - 1 T2 obrigatória (índice público).
   - 1 de qualquer tier pra cross-reference (T3/T4 aceitos).
2. Para claim numérico, buscar também a **série histórica** (último ano, últimos 3 anos) pra saber se o número atual é anomalia ou tendência.
3. Sinalizar claims sem 3 fontes — esses viram candidatos a cortar ou a rebaixar pra "indicativo" no post.

**Output:** `Source Matrix` — tabela claim → fontes (tier, URL, data de publicação, trecho relevante).

**Agent responsável:** data specialist + (quando aplicável) legal specialist / local specialist.

**Checkpoint:** claim YMYL-alto **não passa** pra Fase 3 se não tem 1 T1 + 1 T2 + 1 extra. Rebaixar pra "indicativo" ou cortar.

### Fase 3 — Claim Extraction

**Input:** Source Matrix + outline/draft preliminar (se já existir).

**Processo:**
1. Ler cada parágrafo do draft/outline e extrair TODOS os claims factuais, não só os estratégicos. Incluir:
   - Números (taxas, preços, percentuais, áreas, datas).
   - Nomes de leis, decretos, súmulas, temas repetitivos.
   - Atribuições ("segundo X", "estudo Y mostrou").
   - Superlativos ("o maior", "o único", "o primeiro").
   - Datas absolutas ("em março de 2026", "há 10 anos").
2. Classificar cada claim:
   - **F** — Factual verificável (passa por fact-check).
   - **O** — Opinativo/editorial (não passa por fact-check, mas não pode ser disfarçado de fato).
   - **C** — Citação direta (verifica que a citação é literal e contextualizada corretamente).
   - **P** — Projeção/estimativa (precisa de cálculo explícito ou fonte que projetou).
3. Superlativos merecem atenção especial: "o banco mais barato" é claim F (verificável), mas exige validação da amostra ("mais barato entre os 5 maiores" ≠ "mais barato do Brasil").

**Output:** `Claims Ledger` — planilha com linha por claim: texto exato, tipo (F/O/C/P), parágrafo onde aparece, fontes candidatas (da Source Matrix).

**Agent responsável:** main (síntese) — usa output dos specialists.

**Checkpoint:** se ≥ 20% dos claims F do post não têm fonte na Source Matrix, **parar** e voltar pra Fase 2.

### Fase 4 — Cross-Validation

**Input:** Claims Ledger.

**Processo:**
1. Pra cada claim F, rodar **triple check**:
   - Número ou atribuição confere em T1?
   - Número ou atribuição confere em T2?
   - Número ou atribuição confere em pelo menos 1 T3/T4 independente?
2. Se divergência entre tiers, aplicar **regra de desempate** (Tier menor vence, salvo se Tier maior for mais recente e datado).
3. Sinalizar **toda** divergência no Claims Ledger — mesmo a que é resolvida — com nota: "Divergência X (T3) vs Y (T1). Escolhido Y porque T1. Delta = Z%."
4. Para claims jurídicos (leis, decisões de tribunal): exigir **dois specialists independentes** (data + legal) convergirem. Se divergirem, sobe pra verifier/editor agent.
5. Para claims geográficos (bairros, distâncias, área): exigir validação contra fonte cartográfica oficial (IPPUC, Geocuritiba, OpenStreetMap) — não confiar só em texto.

**Output:** `Validated Claims Table` — Claims Ledger com coluna extra: "Status (validated/divergent/unsustainable)" + "Notas de divergência".

**Agent responsável:** cross-check entre specialists (explícito: data + legal, ou data + local, ou data + SEO dependendo do tema).

**Checkpoint:** claim `unsustainable` **é cortado do post** ou rebaixado pra "indicativo" (sem número, só direção). Claim `divergent` precisa de nota explícita no post explicando qual fonte foi escolhida.

### Fase 5 — Data Currency Audit

**Input:** Validated Claims Table.

**Processo:**
1. Pra cada número, registrar:
   - Data de publicação da fonte.
   - Data de referência do dado (ex: FipeZap mar/2026 foi publicado em abril/2026 mas refere-se a março).
   - Defasagem em meses até a data de publicação do post FYMOOB.
2. Aplicar regra:
   - **Defasagem ≤ 3 meses:** OK.
   - **Defasagem 3-6 meses:** OK com data visível no post ("dados de janeiro/2026"). Sinalizar no `<Metodologia>`.
   - **Defasagem 6-12 meses:** **flag**. Precisa buscar dado mais recente ou explicar por que o número de 6+ meses ainda é válido (ex: série histórica anual).
   - **Defasagem > 12 meses:** **refazer pesquisa**. Dado antigo de mais pra YMYL imobiliário, que muda rápido.
3. Específico de taxa bancária: validar no próprio dia do publish se possível (cache-buster: confirmar no site do banco que ainda é a taxa vigente).

**Output:** `Currency Report` — anexo ao Validated Claims Table com data de cada fonte + defasagem + ação tomada.

**Agent responsável:** data specialist.

**Checkpoint:** se qualquer claim numérico estratégico tem defasagem > 12 meses sem nova fonte, **não publicar**. YMYL com dado de 1 ano é risco de SEO e risco de crédito com o leitor.

### Fase 6 — Writing Integration

**Input:** Validated Claims Table + Currency Report + draft em progresso.

**Processo:**
1. Pra cada claim F no draft, garantir:
   - Link in-line para fonte (padrão Manual Editorial Regra 9: citação reduzida no meio da frase).
   - Mês/ano visível no texto quando o número for temporalmente sensível.
   - Zero número "órfão" (sem link, sem data, sem fonte rastreável).
2. Aplicar convenções de atribuição do guia (seção abaixo).
3. Para claims de tier divergente (onde escolhemos a fonte), explicitar nota curta no parágrafo: "Os dados da Caixa consultados em 23/04/2026 diferem de agregadores como [X]; usamos a fonte oficial."
4. Para claims jurídicos: **nome + número da norma + data de vigência** sempre visíveis. Nunca "segundo a lei" genérico.
5. Cross-check de 2ª passada enquanto se escreve: writer agent tem a Validated Claims Table ao lado — se encostar em algo que não está na tabela, PARA e volta pras Fases 2-4.

**Output:** draft final com citações in-line, links, datas visíveis.

**Agent responsável:** writer specialist.

**Checkpoint:** writer detecta claim novo (não previsto no Claims Ledger). Dispara mini-ciclo: volta pra Fase 3 (extrai o claim) → Fase 4 (valida) → retorna pro draft.

### Fase 7 — Pre-Publish Verification

**Input:** draft final + Validated Claims Table + Currency Report.

**Processo:**
1. Rodar **checklist de 30 itens** (ver seção dedicada abaixo).
2. Triple-check humano/agent:
   - **Writer agent** confirma que cada claim do draft está na Validated Claims Table.
   - **Verifier agent** (novo — ver seção "Integração") faz leitura adversarial: "qual claim derrubaria o post se fosse falso?" e re-verifica esses 3-5.
   - **Main thread (Vinicius)** passa pelo checklist final e dá sign-off explícito.
3. Smoke test técnico (separado do fact-check, mas relacionado): `npm run smoke` pra confirmar que o post publicado não quebra build/links.

**Output:** `Verification Sign-off` — 1 linha adicionada ao `article-rewrite-learnings.md`: "Post X — checklist 30/30 OK — sign-off [data] [responsável]".

**Agent responsável:** verifier/editor agent + main.

**Checkpoint:** um "não" no checklist = reescreve o bloco. Não se publica post com checkbox vazio.

### Fase 8 — Post-Publish Monitoring

**Input:** post publicado + URL.

**Processo:**
1. **Correção transparente:** se leitor/time detecta erro após publish, aplicar política (ver seção dedicada). Nunca apagar silenciosamente.
2. **Review trimestral:** a cada 3 meses, rodar script `check-post-currency.mjs` que:
   - Lista todos os posts com `updatedAt` > 90 dias.
   - Extrai claims numéricos e re-verifica contra fontes T1/T2 atuais.
   - Gera relatório de posts que precisam de refresh.
3. **Monitoramento GSC:** se query associada ao post tem queda > 20% em 30 dias, investigar se causa é dado obsoleto (Google rebaixou por freshness).
4. **Log de updates:** `updatedAt` + entrada em `article-rewrite-learnings.md` toda vez que post é atualizado materialmente. Post não é "estático" em YMYL — é produto que tem ciclo de vida.

**Output:** `Updates Log` — seção no `article-rewrite-learnings.md` com histórico de atualizações por post.

**Agent responsável:** schedule agent (trimestral) + main (ad-hoc quando erro detectado).

**Checkpoint:** nenhum — é loop contínuo.

---

## Matriz claim × tier mínimo × cross-check mínimo

Tabela-regra pra decisão rápida durante escrita:

| Tipo de claim | Tier mínimo | Cross-check mínimo | Data obrigatória | Notas |
|---|---|---|---|---|
| Taxa de juro bancária | T1 (banco oficial) | T1 + T2 (Abecip ou BACEN) | Dia de consulta | CET também obrigatório |
| Preço/m² bairro | T2 (FipeZap/Secovi) | T2 + 1 T3 | Mês/ano |  Referência geográfica precisa |
| Lei/decreto/portaria | T1 (gov.br ou DOU) | T1 + 1 T3 jurídico (Conjur/JOTA/Migalhas) | Data de vigência | Número + ementa obrigatórios |
| Decisão STJ/STF | T1 (STJ/STF oficial) | T1 + 1 T3 jurídico | Data do julgamento | Nº do REsp/ARE + ministro relator |
| ITBI/ITCMD/IR | T1 (Prefeitura/Receita) | T1 + 1 T3 especializado | Ano fiscal vigente | Base de cálculo explícita |
| Dado macro (Selic, IPCA, INCC) | T1 (BACEN/IBGE/CBIC) | T1 único (é oficial) | Mês de referência | — |
| Ranking/superlativo ("o maior") | T2 | T2 + 1 T3 + amostra explícita | Mês/ano | Sempre qualificar a amostra |
| Projeção/estimativa | T1 ou T2 + metodologia | — | Horizonte visível | Marcar como projeção, não como fato |
| Citação direta | T1 (veículo original) | T1 único | Data da publicação | Verificar contexto, não só trecho |
| Dado FYMOOB interno (API Loft) | T1 (Loft API) | Único (é proprietário) | Data da consulta | Declarar que é dado interno |
| Opinião editorial (tom/recomendação) | — | — | — | Não é fact-check; mas não pode se disfarçar de fato |
| Número de inventário ("a gente fecha X por semana") | T1 (dado interno) | Único | Período explícito | Se não dá pra comprovar, corta |

---

## Checklist pré-publicação (30 itens)

Copiar este bloco como tarefa pro verifier/editor agent. Um "não" = reescreve o bloco correspondente.

**Claims estratégicos (5)**
- [ ] Cada claim estratégico tem fonte T1 linkada?
- [ ] Cada claim estratégico tem pelo menos 1 cross-check em T2 ou T3?
- [ ] Divergências entre fontes estão sinalizadas no post (não escondidas)?
- [ ] Superlativos ("o maior", "o mais barato") têm amostra explícita?
- [ ] Projeções estão marcadas como projeção, não como fato?

**Números (6)**
- [ ] Todo número tem mês/ano visível quando sensível no tempo?
- [ ] Toda taxa bancária foi consultada em ≤ 30 dias?
- [ ] Todo preço/m² tem referência FipeZap ou Secovi-PR linkada?
- [ ] Números agregados ("a maioria", "60%") têm fonte?
- [ ] CET acompanha toda taxa nominal de financiamento?
- [ ] Valores em reais mostram mês/ano de referência no mesmo parágrafo?

**Jurídico/fiscal (5)**
- [ ] Leis citadas têm **número + data + ementa**?
- [ ] Decisões de tribunal têm **nº do processo + ministro relator + data**?
- [ ] Atribuição STJ/STF/TJ-PR correta (não confundidas)?
- [ ] Validação dupla (data + legal specialists)?
- [ ] Ementa da lei não é parafraseada de forma que mude o sentido?

**Geográfico (3)**
- [ ] Bairros mencionados existem na divisão oficial do IPPUC?
- [ ] Distâncias/localizações validadas contra Geocuritiba ou OpenStreetMap?
- [ ] Landings `/imoveis/[slug]` que são linkadas existem (slug valida)?

**Metodologia (4)**
- [ ] Post tem bloco `<Metodologia>` no fim (se pilar)?
- [ ] Bloco `<Metodologia>` diz **quando** a pesquisa foi feita?
- [ ] Amostra declarada (ex: "5 maiores bancos" e não "todos os bancos")?
- [ ] Limitações declaradas (ex: "dados não cobrem FGTS em modalidade X")?

**Transparência (4)**
- [ ] `updatedAt` no frontmatter está correto?
- [ ] `publishedAt` não foi alterado (não trapaceamos data de publicação)?
- [ ] Links de fonte são **profundos** (URL com o dado), não home genérica?
- [ ] Bloco `<Correções>` criado/atualizado se houver correção?

**Estrutura (3)**
- [ ] Regra 12 do Manual Editorial (data visível em YMYL) aplicada?
- [ ] Regra 9 (citação reduzida in-line) aplicada, não "de acordo com relatório..."?
- [ ] FAQ tem perguntas reais de PAA (Regra 14), não inventadas?

---

## Guia de atribuição — como citar sem quebrar fluxo

Expansão da **Regra 9** do Manual Editorial aplicada ao contexto de fact-check. Padrões canônicos:

### Taxa bancária

- **DO:** `A Caixa cobra 11,19% em abril/2026 ([taxas oficiais](https://caixa.gov.br/...)).`
- **DON'T:** `De acordo com dados oficiais disponibilizados pela Caixa Econômica Federal em sua plataforma...`

### Lei / decisão judicial

- **DO:** `O STJ decidiu em 2022 ([REsp 1.937.821/SP](link), Tema 1113) que o ITBI se calcula pelo valor da escritura...`
- **DON'T:** `Conforme entendimento firmado pelo Egrégio Superior Tribunal de Justiça...`

### Dado de mercado

- **DO:** `O m² do Ahú valorizou 12,5% em 12 meses ([FipeZap março/2026](link)).`
- **DON'T:** `Segundo dados do índice FipeZap, divulgados recentemente em seu relatório mensal de março...`

### Dado FYMOOB interno

- **DO:** `A gente fechou 14 financiamentos de Caixa no último trimestre — a planilha diz Caixa ainda é o caminho pra primeiro imóvel.`
- **DON'T:** `Segundo dados internos da nossa imobiliária que não podem ser verificados externamente...`

### Divergência entre fontes

- **DO:** `O Banco Central mostra 11,19% ([BACEN 04/2026](link)); agregadores como [X] trazem 11,3% — usamos a fonte oficial.`
- **DON'T:** esconder a divergência e torcer pra ninguém notar.

### Projeção vs fato

- **DO:** `A projeção do CBIC para INCC 2026 é 7,2% ([CBIC 03/2026](link)) — é estimativa, não número fechado.`
- **DON'T:** `O INCC de 2026 será 7,2%.`

---

## Política de correções transparentes

Quando erro factual é detectado após publish, aplicar em **4 passos**:

### 1. Severidade
- **Tier A — tese mudou:** erro altera a conclusão do post (ex: "é STJ não STF", "Faixa 4 é ampliada não nova"). Correção imediata + nota visível.
- **Tier B — número mudou, tese não:** erro em dado específico que não derruba a tese (ex: taxa Caixa era 11,29% não 11,19%). Correção discreta + entrada no log.
- **Tier C — cosmético:** erro de digitação, link quebrado, data formatada errada. Correção silenciosa.

### 2. Ação por tier

**Tier A:**
- Corrigir texto + atualizar `updatedAt`.
- Adicionar bloco `<Correção>` visível no topo do post: *"Correção em DD/MM/AAAA: este post originalmente dizia X. A informação correta é Y. Agradecemos [leitor/fonte] pela sinalização."*
- Entrada em `article-rewrite-learnings.md`.
- Tag "Corrigido em [data]" na home por 7 dias.
- Se post foi compartilhado em redes sociais com erro, avisar nos mesmos canais.

**Tier B:**
- Corrigir texto + atualizar `updatedAt`.
- Bloco `<Correção>` no fim do post (não no topo): *"DD/MM/AAAA: atualizado valor X pra Y."*
- Entrada em `article-rewrite-learnings.md`.

**Tier C:**
- Corrigir + atualizar `updatedAt`. Sem bloco de correção (não é fato, é forma).

### 3. Prazo
- Tier A: em 24h da detecção.
- Tier B: em 72h da detecção.
- Tier C: no próximo ciclo de maintenance (≤ 2 semanas).

### 4. Prevenção de reincidência
- Entrada obrigatória em `article-rewrite-learnings.md` explicando: **causa raiz** + **o que o protocolo teria pegado** + **ajuste no protocolo** se necessário.
- Se mesmo tipo de erro ocorre 2x, obrigatoriamente vira regra nova no protocolo (não é coincidência, é buraco de processo).

---

## Integração com o time multi-agent existente

Time atual (5 agents em paralelo por post pilar):

1. **data specialist** — fatos macro + dados quantitativos
2. **macro/domain specialist** (varia: macro econômico, fiscal, legal, local)
3. **local specialist** — Curitiba-específico (bairros, prefeitura, mercado local)
4. **writer specialist** — draft com voz FYMOOB
5. **SEO/SERP specialist** — concorrentes, PAA, keyword gaps

### Mapeamento de fases por agent

| Fase | Agent(s) responsável(is) | Papel |
|---|---|---|
| 1 — Pre-Research Briefing | main | Define escopo, tier YMYL, claims estratégicos antes de disparar specialists |
| 2 — Source Gathering | data + macro/legal + local | Cada um traz fontes do seu domínio → Source Matrix consolidada |
| 3 — Claim Extraction | main (síntese) | Extrai claims do outline usando outputs dos specialists |
| 4 — Cross-Validation | **data × legal** (explícito) ou **data × local** (explícito) | Cross-check entre specialists com disagreement visível |
| 5 — Data Currency Audit | data specialist | Datas de cada fonte + defasagem |
| 6 — Writing Integration | writer specialist | Usa Validated Claims Table como input obrigatório |
| 7 — Pre-Publish Verification | **verifier/editor agent (novo — recomendado como 6º membro)** + main | Checklist 30 itens + leitura adversarial |
| 8 — Post-Publish Monitoring | schedule agent (trimestral) + main (ad-hoc) | Review de currency + política de correções |

### Recomendação crítica: adicionar verifier/editor agent como 6º membro

Ver discussão no Post 3 (`article-rewrite-learnings.md` linha 98): hoje o cross-check da Fase 4 e o sign-off da Fase 7 ficam na síntese do main — **ponto único de falha**. Nos 4 posts até agora, o main segurou bem, mas o processo não escala.

**Proposta:** adicionar `verifier/editor agent` com escopo estrito:
- Input: outputs dos outros 5 agents + draft final.
- Processo: rodar Fase 7 (checklist 30 itens) + leitura adversarial ("se eu fosse advogado do leitor prejudicado, qual claim eu atacaria?").
- Output: sign-off explícito com lista de bloqueios (se houver).
- **Não escreve conteúdo** — só verifica. Separação de função = independência.

Benefícios:
- Elimina ponto único de falha.
- Escala pra time com mais pessoas (main hoje = Vinicius; amanhã pode ser editor humano).
- Produz trilha de auditoria (checklist 30 itens arquivado por post).

Custo:
- +1 agent por post pilar = +5-10min de rate limit Anthropic + contexto adicional.
- Nenhum custo marginal real vs risco de YMYL com erro.

**Decisão recomendada:** adicionar no **próximo post pilar** como piloto. Avaliar após 2 posts se mantém ou integra ao main.

### Serialização crítica

Aprendizado do Post 3: **writer agent deve rodar APÓS data/legal specialists**, não em paralelo. Escrever com números-placeholder (`[NÚMERO A VALIDAR]`) e preencher depois da Validated Claims Table é o padrão.

Ordem atualizada pro próximo pilar:
1. **Paralelo (rodada 1):** data + macro/legal + local + SEO → Source Matrix
2. **Main sintetiza** → Claims Ledger + outline
3. **Serial (rodada 2):** writer recebe outline + Validated Claims Table com placeholders marcados
4. **Paralelo (rodada 3):** verifier roda checklist enquanto main revisa draft
5. **Sign-off** → publish

---

## Templates

### Template 1 — Research Brief

```markdown
# Research Brief: [título do post]

**Slug alvo:** /blog/[slug]
**Keyword primária:** [keyword]
**Tier YMYL:** [alto / médio / baixo]
**Público-alvo:** [primeiro comprador / investidor / corretor / ...]
**Baseline GSC:** [impressões/clicks atuais, se aplicável]

## Escopo

O post responde:
- [pergunta 1]
- [pergunta 2]
- [pergunta 3]

O post NÃO responde:
- [fora de escopo 1]
- [fora de escopo 2]

## Claims estratégicos

Sem estes claims, o post não tem tese:

1. [claim 1] — fonte candidata: [tier + URL]
2. [claim 2] — fonte candidata: [tier + URL]
3. [claim 3] — fonte candidata: [tier + URL]

## Riscos YMYL

- [risco 1 — ex: "taxas mudam semanalmente, currency alta"]
- [risco 2 — ex: "atribuição STJ vs STF é pegadinha"]

## Sign-off

- [ ] Escopo aprovado por [main/editor]
- [ ] Tier YMYL classificado
- [ ] 3+ claims estratégicos identificados com fontes candidatas
```

### Template 2 — Source Matrix

```markdown
# Source Matrix: [título do post]

| Claim | Tier 1 (oficial) | Tier 2 (índice) | Tier 3/4 (contexto) | Data mais recente |
|---|---|---|---|---|
| Caixa cobra X% em abril/2026 | caixa.gov.br/... (04/2026) | Abecip 04/2026 | Exame 04/2026 | 23/04/2026 |
| ITBI CWB = 2,7% | curitiba.pr.gov.br/... | — | Conjur 04/2026 | 23/04/2026 |
| Ahú +12,5% em 12m | — | FipeZap 03/2026 | Bem Paraná 04/2026 | 15/04/2026 |

## Notas

- [claim X] tem divergência entre T1 e T3: T1 diz X, T3 diz Y. Escolhido T1.
- [claim Y] não tem fonte T2 independente — rebaixado pra "indicativo" ou vai ser cortado.
```

### Template 3 — Claims Ledger

```markdown
# Claims Ledger: [título do post]

| # | Claim (texto exato) | Tipo (F/O/C/P) | Parágrafo | Fontes (da Source Matrix) | Status |
|---|---|---|---|---|---|
| 1 | "A Caixa cobra 11,19% em abril/2026" | F | lide | caixa.gov.br + Abecip | validated |
| 2 | "O banco errado custa R$ 270 mil a mais" | F | lide | — (calculada internamente) | divergent — só vale R$ 1M+ |
| 3 | "a gente fecha financiamento toda semana" | O | H2 #3 | — | opinativo, OK |
| 4 | "STJ Tema 1113" | F | H2 #4 | STJ + Conjur | validated |
| ... | ... | ... | ... | ... | ... |

## Legenda
- **F** = Factual (verificável)
- **O** = Opinativo (não passa por fact-check)
- **C** = Citação direta
- **P** = Projeção/estimativa

## Status
- **validated** = 3+ fontes convergem
- **divergent** = fontes divergem, escolha feita com nota
- **unsustainable** = corta ou rebaixa pra "indicativo"
```

---

## Referências

**Standards fact-checking internacionais:**
- [IFCN Code of Principles — The 5 Commitments](https://ifcncodeofprinciples.poynter.org/the-commitments) — não-partidarismo, transparência de fontes, transparência de organização, transparência de metodologia, correções abertas
- [Poynter — Fact-Checking Resources](https://www.poynter.org/fact-checking/)
- [Reuters Handbook of Journalism](https://www.reutersagency.com/en/about/standards-values/)
- [AP Stylebook — Fact-Checking](https://www.apstylebook.com/)
- [BBC Editorial Guidelines — Accuracy](https://www.bbc.co.uk/editorialguidelines/guidelines/accuracy)
- [NYT Editorial Standards](https://www.nytimes.com/editorial-standards/)

**Fact-checking Brasil:**
- [Aos Fatos](https://www.aosfatos.org/)
- [Agência Lupa (piauí/UOL)](https://lupa.uol.com.br/)
- [AFP Checamos](https://checamos.afp.com/)
- [Reuters Fact Check Brasil](https://www.reuters.com/fact-check/)

**Imprensa econômica/jurídica de referência:**
- [JOTA Tributos](https://www.jota.info/tributos)
- [Valor Econômico](https://valor.globo.com/)
- [Conjur](https://www.conjur.com.br/)
- [Migalhas](https://www.migalhas.com.br/)

**YMYL / E-E-A-T:**
- [Google Search Quality Rater Guidelines (PDF)](https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf)
- [Google Search Central — E-E-A-T](https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t)
- [Google Helpful Content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

**Documentos internos relacionados:**
- [Manual Editorial FYMOOB](./editorial-style-guide.md) — voz/estilo
- [Data Sources Map](./data-sources-map.md) — hierarquia de fontes por domínio
- [Article Rewrite Learnings](./article-rewrite-learnings.md) — histórico de aprendizados
- [Regra Nunca Supor](../../CLAUDE.md#nunca-supor--regra-fundamental) — princípio-irmão deste protocolo

---

## Changelog

- **2026-04-23 v1.0** — criação inicial baseada em 4 posts reescritos + pesquisa IFCN/Poynter/BBC. Propõe 8 fases + checklist 30 itens + verifier agent como 6º membro do time. A revisar após 2 posts com verifier piloto.
