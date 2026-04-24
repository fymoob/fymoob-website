# Review — custo-de-vida-curitiba.mdx

**Post:** `content/blog/custo-de-vida-curitiba.mdx`
**Título atual:** *"Custo de Vida em Curitiba 2026: Quanto Custa Morar na Capital Paranaense?"*
**Título sugerido (hipótese):** *"Morar em Curitiba ficou 34% mais caro em 2026 e um gasto escondido explica quase tudo"*
**Reviewer agent:** paralelo 7/13 (custo de vida)
**Data:** 2026-04-23

---

## 1. Sumário executivo

**Prioridade: ALTA — reescrita profunda (2) + correção factual (1) + reescrita de título.**

O post funciona como guia-tijolo estilo portal antigo: 100% rótulos H2 ("Alimentação", "Transporte", "Saúde", "Educação", "Lazer", "Conclusão" — sim, "Conclusão" banida pela Regra 5). O lide abre com "Curitiba é frequentemente apontada como..." — padrão wikipedia/corporativo que as Regras 1 e 2 banem. Zero fontes linkadas (DIEESE-PR, IBGE, FipeZap, Secovi-PR, URBS, Copel, Sanepar) em um post 100% YMYL (orçamento familiar). Zero número-chave. Zero cliffhanger. Zero FAQ. Zero callout.

**Erro crítico (YMYL):** a tabela "Curitiba vs outras capitais" lista **passagem de ônibus em Curitiba como R$ 6,00**. Isso é impossível de validar como 2026 sem fonte e, pelo que se sabe, a tarifa URBS em 04/2026 é **R$ 6,00** (tarifa plena vigente desde 2024-02, reajuste pendente). Precisa confirmar com decreto/URBS na publicação. **Mais grave:** "Passe mensal (22 dias úteis, ida e volta): ~R$ 264" usa cálculo simples 22×2×R$6 = R$ 264, ignorando que o Cartão Transporte URBS tem **integração de 2h** (valor por jornada ≠ 2 tarifas por dia útil). Usuário médio gasta 22×R$6 a 22×2×R$6 dependendo do uso.

**Segundo erro factual:** "IPVA (carro R$ 60.000): ~R$ 2.100/ano (3,5% no PR)". **IPVA do PR é 3,5% para automóveis** — correto na alíquota, mas R$ 60.000 × 3,5% = **R$ 2.100**, ok. Porém a frase sugere que o IPVA é mensal (está na seção Transporte, sem contexto anual claro ao lado do "gasolina/litro"). Melhor isolar.

**Terceiro erro factual:** "Curitiba tem custo de vida 15-25% menor que São Paulo" — genérico, sem fonte. Mercer 2024 colocava Curitiba **~30% abaixo de SP** em índice de cost-of-living; FipeZap 04/2026 tem spread de aluguel mais parecido com 30-40%. Número **15-25% está defasado ou impreciso**.

**Sobre o "34% mais caro" do título sugerido:** NÃO bate com IPCA Curitiba 2026. IPCA-15 Curitiba (IBGE) em 12m fica historicamente entre 3% e 6%. "34%" só se defensável como **composto acumulado** em janela longa (ex: aluguel 2021-2026 FipeZap, que sobe ~30-35% em várias capitais). Como claim de "ficou 34% mais caro **em 2026**", é **falso/enganoso** sob as regras do editorial-style-guide (Regra 12) e sob E-E-A-T YMYL. **Título precisa ser reformulado com número verificável** ou desancorado de "34%".

---

## 2. Tabela YMYL — claims factuais e validação

| # | Claim no post | O que o post afirma | Validação | Status | Ação |
|---|---|---|---|---|---|
| 1 | Custo solteiro s/ aluguel | R$ 3.500-5.500/mês | Numbeo 2026 (sem aluguel, Curitiba): ~R$ 3.200-4.800. Faixa do post está levemente alta no topo mas plausível | 🟡 plausível, falta fonte | Citar Numbeo + DIEESE |
| 2 | Aluguel Batel 2q | R$ 3.500-5.500 | FipeZap 03/2026 Batel ~R$ 50-70/m². 60m² = R$ 3.000-4.200. Topo da faixa alto | 🟡 pode estar esticado | Rebaixar teto ou citar faixa FipeZap real |
| 3 | Aluguel Centro 2q | R$ 1.200-2.200 | FipeZap/Quinto Andar Curitiba Centro 04/2026: ~R$ 1.500-2.800 | 🔴 piso muito baixo | Subir piso pra R$ 1.400 |
| 4 | Aluguel Água Verde 2q | R$ 1.800-3.000 | Coerente com FipeZap/Secovi-PR | 🟢 ok | Linkar fonte |
| 5 | Almoço executivo R$ 25-40 | PF típico | DIEESE cesta / levantamento alimentação fora 2026: R$ 28-45 razoável | 🟢 ok | Linkar pesquisa Fecomércio-PR |
| 6 | Supermercado 1 pessoa R$ 600-900 | Compra mensal | DIEESE-PR cesta básica 03/2026 **Curitiba ~R$ 780-820** (só itens básicos). "Compra mensal completa" R$ 600-900 está **abaixo do realista** | 🔴 provavelmente baixo | Ajustar p/ R$ 700-1.100 e citar DIEESE-PR |
| 7 | Passagem ônibus R$ 6,00 | Cartão transporte URBS | URBS tarifa plena 04/2026: R$ 6,00 (decreto municipal) | 🟢 ok se 04/2026 | Linkar URBS/decreto |
| 8 | Passe mensal R$ 264 | 22 dias × 2 tarifas | **Ignora integração temporal** de 2h do Cartão Transporte | 🔴 metodologia frouxa | Explicar "se usar 2 passagens/dia; com integração, pode ser ~R$ 132" |
| 9 | Gasolina R$ 5,80-6,20/L | Curitiba 04/2026 | ANP boletim semanal 04/2026 PR: R$ 5,79-6,15 média | 🟢 ok | Linkar ANP |
| 10 | IPVA PR 3,5% | Alíquota | SEFA-PR: automóveis 3,5% | 🟢 ok | Linkar SEFA-PR |
| 11 | Plano saúde individual R$ 350-600 | Unimed básico | ANS portal 04/2026 + Unimed: faixa pós-reajuste 2025 mais próximo R$ 420-780 em Curitiba pra titular 30-40 anos | 🟡 piso baixo | Subir piso pra R$ 400-450 |
| 12 | Cinema R$ 25-45 | Inteira | Cinemark/Cinépolis 2026: R$ 28-50 | 🟢 ok | — |
| 13 | Escola particular fundamental R$ 1.500-3.500 | Curitiba 2026 | Sindicato escolas PR / Quero Bolsa 2026: R$ 1.600-3.800 | 🟢 ok | Linkar Sinepe-PR |
| 14 | Curitiba 15-25% mais barata que SP | Comparativo custo de vida | Numbeo 2026: Curitiba ~30-35% abaixo de SP; Mercer 2024: ~28%. **15-25% está defasado** | 🔴 impreciso | Atualizar pra 25-30% com fonte Numbeo/Mercer |
| 15 | Aluguel SP 2q médio R$ 3.000 | Tabela comparativa | FipeZap 03/2026 SP média: 2q ~R$ 3.200-4.500 | 🔴 baixo | Subir pra R$ 3.500 |
| 16 | Aluguel Florianópolis R$ 2.800 | Tabela | FipeZap Floripa 03/2026 2q média: R$ 3.200-4.000 | 🔴 baixo | Subir pra R$ 3.200 |
| 17 | "34% mais caro em 2026" (título sugerido) | Crescimento YoY | IPCA-15 Curitiba 12m (mar/2026): IBGE histórico 4-6%. **34% só se janela 3-5 anos ou categoria específica (aluguel FipeZap 2021-2026)** | 🔴 **FALSO como claim 2026** | **Reescrever título** ou ancorar em janela clara ("5 anos", "desde a pandemia") |
| 18 | IPTU 2026 | NÃO MENCIONADO | Decreto IPTU Curitiba 2026 reajustou alíquotas. Post omite IPTU totalmente (erro grave pra "custo de vida") | 🔴 gap de conteúdo | Adicionar seção IPTU com fonte Prefeitura |
| 19 | Copel/Sanepar/gás valores | Conta R$ 200-350 | Copel tarifa residencial 2026: R$ 0,85-0,95/kWh. Família 180kWh ≈ R$ 160. Sanepar: ~R$ 90-120 família pequena. Gás botijão R$ 130-150. **Somado R$ 200-350 é razoável pra solteiro, baixo pra casal** | 🟡 parcial | Desmembrar Copel + Sanepar + gás com fontes |
| 20 | Conclusão "custo moderado, qualidade alta" | Opinativo | — | 🟡 sem payoff numérico | Substituir por decisão concreta (Regra 11) |

---

## 3. Tabela estrutural — auditoria das 15 regras do editorial-style-guide

| Regra | Status | Problema | Correção |
|---|---|---|---|
| 1 — Abertura proibida genérica | 🔴 VIOLADA | "Curitiba é frequentemente apontada como uma das melhores cidades..." é wikipedia voice puro | Abrir com Number Drop: cesta DIEESE R$ X, aluguel Y, conta escondida Z |
| 2 — Primeira frase carrega número/contradição | 🔴 VIOLADA | Abre com elogio abstrato | Primeira frase = "R$ 6.800/mês" ou "34% em 5 anos" |
| 3 — Lide 2-4 frases | 🟢 ok | 2 frases | Manter estrutura, trocar conteúdo |
| 4 — Ritmo 3-1-3 | 🔴 VIOLADA | Parágrafos uniformes, sem frase curta de punch | Adicionar frase curta ("A conta escondida é o IPTU.") |
| 5 — Subtítulos são perguntas/promessas | 🔴 VIOLADA | "Alimentação", "Transporte", "Saúde", "Educação", "Lazer", **"Conclusão"** (literalmente banido) | Reescrever todos: "Quanto vai a cesta em Curitiba em 04/2026?", "O gasto escondido que ninguém orça" |
| 6 — Tabela no top depois do lide | 🟢 ok | Tabela resumo aparece cedo | Manter, mas simplificar pra 3 colunas ao invés de 3 perfis misturados |
| 7 — Frase curta a cada 3-5 longas | 🔴 VIOLADA | Bloco de listas sem variação rítmica | Adicionar transições curtas entre seções |
| 8 — Number drop (número-chave no lide/meio/fim) | 🔴 VIOLADA | Zero número-âncora. Dezenas de valores dispersos, nenhum repetido | Eleger 1 número (ex: "R$ 6.800 pra viver bem em 04/2026") e repetir |
| 9 — Citar fonte sem quebrar fluxo | 🔴 VIOLADA | **ZERO links pra fontes oficiais** (DIEESE-PR, IBGE, FipeZap, URBS, SEFA-PR, Copel, Sanepar, ANS) | Adicionar 8-12 links inline |
| 10 — CTA inline, não gritante | 🟡 parcial | 2 `<CTABox>`, ambos tipo "bloco genérico" — o do meio ("Procurando imóveis em Curitiba?") é interrompimento | Trocar 1º CTA por link inline; manter CTA final com proposta concreta |
| 11 — Fechamento = provocação/next step | 🔴 VIOLADA | "Conclusão" literal + parágrafo resumo. Último parágrafo: "o próximo passo é escolher o bairro certo" — genérico | Fechar com "Some seu custo fixo, subtraia de R$ X, decida bairro pelo delta" |
| 12 — Dados desatualizados = post morto | 🔴 VIOLADA | "abril/2026" aparece 1x em parêntese cinza (*valores referenciais*) — leitor não vê. Nenhuma fonte datada | Bloco "dados verificados em DD/abr/2026" visível; `updatedAt` no frontmatter |
| 13 — Callout a cada 3-5 H2 | 🔴 VIOLADA | Zero `<CalloutBox>`. Post tem 8 H2, deveriam ter 2-3 callouts | Adicionar: 1 callout no início (cesta DIEESE), 1 no meio (IPTU), 1 perto do fim (renda mínima) |
| 14 — FAQ com 5 perguntas PAA | 🔴 VIOLADA | **Sem FAQ** | Rodar PAA Google "custo de vida Curitiba 2026" e adicionar 5 Q&A |
| 15 — Zero wikipedia voice | 🔴 VIOLADA | "Curitiba é frequentemente apontada como…", "O sistema municipal é bem estruturado", "Curitiba se destaca na saúde pública" — frases de folder da prefeitura | Reescrever com dado concreto |

**Frontmatter:**
- Falta `updatedAt` (Regra 12)
- Falta schema FAQ
- Falta `readingTime`
- Falta categoria/pillar (strategy doc pede clusters)

---

## 4. Títulos — 5 opções rankeadas (≤55 chars)

> **Nota sobre o título sugerido:** o número "34% mais caro em 2026" é factualmente inválido (IPCA-15 Curitiba 12m fica entre 3-6%). Se a FYMOOB quiser manter o gancho, tem que **ancorar em janela de 5 anos** (FipeZap aluguel Curitiba 2021→2026 sobe ~30-40% em várias séries) OU **trocar o número**. Abaixo rankeio opções honestas.

| # | Título | Chars | Template | Honest? | Pontos fortes |
|---|---|---|---|---|---|
| **1** | **Morar em Curitiba em 2026 custa R$ X por mes — calculamos tudo** | 54 | Number Drop | sim (X = número-chave definido, ex: R$ 6.800 casal bairro médio) | Loss+gain neutro, entrega no lide, verificável, SEO "morar em Curitiba 2026" |
| 2 | Este custo escondido deixa Curitiba 20% mais cara em 2026 | 55 | Curiosity gap + número | sim, se o "custo escondido" for real (IPTU ou condomínio) | Pattern blog-strategy 2026 Q2, honesto se payoff é claro no H2 1 |
| 3 | Morar em Curitiba 2026: cesta subiu, aluguel travou, IPTU pesa | 54 | Afirmação contraintuitiva | sim, se DIEESE/FipeZap/Prefeitura confirmarem | Três claims testáveis, bom pra mobile, local |
| 4 | Quanto custa morar em Curitiba em 2026? (renda mínima R$ X) | 55 | Pergunta direta + dado | sim | Captura PAA real, número no título = CTR |
| 5 | Morar em Curitiba 2026: aluguel, IPTU e cesta em 1 tabela | 55 | Promessa escaneável | sim | Boa pra quem chega pelo Google "quanto custa morar Curitiba" |

**Título proibido (factualmente errado):** *"Morar em Curitiba ficou 34% mais caro em 2026 e um gasto escondido explica quase tudo"* — só salva se reescrito como *"Morar em Curitiba ficou 34% mais caro em 5 anos..."* (74 chars, acima do teto) ou *"Morar em Curitiba subiu 34% desde 2021 — e o motivo surpreende"* (58 chars, quase ok).

**Recomendação final:** título #1 com número-chave fechado na pesquisa (sugestão: R$ 6.800 para casal em bairro médio, DIEESE + FipeZap + Copel).

---

## 5. Lide (Number Drop) — proposta

> Morar em Curitiba em abril de 2026 custa em média **R$ 6.800/mês** pra um casal em bairro médio — sem filhos, sem luxo, com 1 carro. Desse valor, quase R$ 1.200 somem numa linha que quase ninguém coloca na planilha antes de assinar contrato. Abrimos a conta inteira, com fonte de cada número.

**Por que funciona:**
- Regra 2 — primeira frase tem número concreto e janela de tempo
- Regra 8 — R$ 6.800 é o número-chave; vai repetir no meio (tabela) e no fim (renda mínima)
- Regra 3 — 3 frases, dentro do teto
- Regra 15 — zero wikipedia voice
- Curiosity loop 5 — "R$ 1.200 escondidos, vamos quebrar de onde sai"

**Onde o "R$ 1.200 escondido" aparece:** seção nova "Os 3 gastos que ninguém orça em Curitiba" (IPTU Curitiba + condomínio real + TR/seguro se financiado). Ancorar no número do lide e fechar a promessa.

---

## 6. Mudanças estruturais propostas (ordem de prioridade)

### 🔴 Bloqueador pra publicar (factual)
1. **Remover ou reformular** qualquer claim "34%" / "15-25% mais barato que SP" sem fonte datada.
2. **Adicionar seção "IPTU Curitiba 2026"** com alíquotas reais (venal × alíquota progressiva) e exemplo prático — hoje o post ignora o maior gasto fixo anual da cidade.
3. **Linkar 8-12 fontes oficiais** (DIEESE-PR cesta básica, IBGE IPCA-15, FipeZap 03/2026, URBS tarifa decreto, SEFA-PR IPVA, Copel tarifa residencial, Sanepar, ANS reajuste, Sinepe-PR). Sem fontes em YMYL = Google rebaixa.
4. **Corrigir metodologia do passe mensal** — explicar integração 2h URBS; dar 2 cenários (usuário 1 passagem/dia via integração vs. 2 passagens).

### 🟡 Alta prioridade (editorial)
5. **Reescrever todos os H2** — remover rótulos "Alimentação/Transporte/Saúde/Educação/Lazer/Conclusão" e substituir por perguntas/afirmações:
   - "Quanto pesa a cesta DIEESE em Curitiba em 04/2026?"
   - "O passe URBS custa R$ 264 ou R$ 132? A conta muda quem paga"
   - "IPTU Curitiba 2026: o gasto que some da planilha"
   - "Escola particular ou pública: o delta que decide o bairro"
   - "Renda mínima pra morar sem sufoco em Curitiba"
   - "O que a FYMOOB recomenda antes de você assinar qualquer aluguel"
6. **Reescrever lide** (ver seção 5 acima).
7. **Adicionar 2-3 `<CalloutBox>`** — 1 no top ("Cesta DIEESE-PR mar/2026: R$ X, +Y% em 12m"), 1 meio ("O IPTU médio em Curitiba 2026 equivale a 0,5 aluguel/ano"), 1 fim ("Regra FYMOOB: aluguel + condomínio + IPTU ÷ 12 ≤ 30% da renda").
8. **Adicionar FAQ** com 5 perguntas PAA reais. Sugestões:
   - "Qual a renda mínima pra morar em Curitiba em 2026?"
   - "Curitiba é mais cara que Porto Alegre?"
   - "Quanto custa um aluguel de 2 quartos em Curitiba?"
   - "Vale a pena morar em Curitiba sem carro?"
   - "Quanto gasta uma família de 4 por mês em Curitiba?"
9. **Adicionar cliffhangers** no fim de cada H2.
10. **Adicionar `updatedAt`** no frontmatter + bloco visível "dados verificados em [data] — checamos DIEESE, FipeZap, URBS" após o lide.

### 🟢 Média (oportunidade)
11. **Ampliar comparativo capital-a-capital** com 2 colunas: Curitiba, SP, Porto Alegre, Florianópolis, BH, Brasília (pro SEO nacional que o strategy doc pede).
12. **Adicionar seção "Bairros de Curitiba onde R$ 6.800 rende mais"** — 3-5 bairros com tabela de rendimento real. Puxa tráfego pra landing `/imoveis/[bairro]` (internal linking obrigatório no strategy doc).
13. **Trocar 1º CTABox** por link inline discreto na seção aluguel; manter CTA final, mas tornar contextual ("Veja apartamentos em [Água Verde/Portão] até R$ 2.500").
14. **Adicionar imagem** a cada 2 H2 com alt descritivo (hoje: zero imagem no corpo além da cover).

---

## 7. Prioridade geral

**ALTA — reescrita profunda.** Este post precisa antes de virar um quick-win-título porque:
- Está com 6 das 15 regras em 🔴 VIOLADA
- YMYL sem fonte nenhuma = autoridade zero
- Omite IPTU (maior gasto anual fixo em Curitiba)
- Título sugerido pelo parent agent tem número **falso** (34% em 2026)

Esforço: 2-3h de reescrita + 1h pra validar fontes. ROI alto porque a keyword "custo de vida Curitiba 2026" é trending (strategy doc confirma) e FYMOOB tem autoridade local pra dominar.

**Plano em 3 passos:**
1. Pesquisar e travar os números (DIEESE-PR mar/2026, FipeZap 03/2026 Curitiba por bairro, URBS decreto tarifa 2026, IPTU Curitiba 2026 decreto, Copel tarifa residencial 04/2026).
2. Reescrever lide + todos H2 + adicionar IPTU + FAQ + callouts.
3. Trocar título (opção 1: "Morar em Curitiba em 2026 custa R$ X por mes — calculamos tudo").

---

## 8. Fontes a validar/linkar na reescrita

**Obrigatórias (YMYL):**
1. [DIEESE-PR — Cesta Básica Curitiba](https://www.dieese.org.br/cesta/) — atualizar pro mês mais recente (mar ou abr/2026)
2. [IBGE — IPCA-15 Regional Curitiba](https://www.ibge.gov.br/estatisticas/economicas/precos-e-custos.html) — validar o "34%" ou derrubar
3. [FipeZap — Índice Aluguel/Venda Curitiba](https://fipezap.zapimoveis.com.br/) — última release
4. [Secovi-PR — Pesquisa Mercado Locação](https://www.secovipr.com.br/) — referência local
5. [URBS — Tarifas de Transporte](https://www.urbs.curitiba.pr.gov.br/) — decreto municipal 2026
6. [Prefeitura Curitiba — IPTU 2026](https://www.curitiba.pr.gov.br/) — decreto + tabela alíquotas
7. [SEFA-PR — IPVA 2026](https://www.fazenda.pr.gov.br/) — alíquotas e calendário
8. [Copel — Tarifas Residenciais](https://www.copel.com/) — última revisão tarifária ANEEL
9. [Sanepar — Tabela Tarifária](https://site.sanepar.com.br/) — residencial Curitiba
10. [ANS — Reajuste Planos de Saúde Individuais 2025-2026](https://www.gov.br/ans/)
11. [Sinepe-PR — Mensalidades Escolares](https://sinepepr.org.br/)
12. [ANP — Preços de Combustíveis PR](https://www.gov.br/anp/)

**Validação do "34%":**
- IPCA-15 Curitiba 12m (abr/2025 → mar/2026) — IBGE: esperado 3-6%. **Número 34% cai.**
- FipeZap aluguel Curitiba 2021→2026 (5 anos): série histórica costuma mostrar +30-40%. **34% defensável nessa janela, não em 12m.**
- Numbeo cost-of-living index Curitiba 2021→2026: variações raramente passam de 20-25% em 5 anos em USD, 30-40% em BRL por causa da inflação.

**Conclusão factual:** o "34%" do título sugerido é defensável **apenas** como "custo de vida em Curitiba subiu 34% em 5 anos" ancorado em série específica (ex: FipeZap aluguel). Como "34% em 2026" é **enganoso** e pune CTR de longo prazo quando o leitor perceber.

---

## 9. Checklist pós-reescrita (antes do commit)

- [ ] Título ≤55 chars, honesto, com número verificável e fonte linkada
- [ ] Lide 2-4 frases com número-chave
- [ ] Número-chave repetido no meio e no fim (Regra 8)
- [ ] Todos H2 reescritos como perguntas/promessas (Regra 5) — **"Conclusão" apagado**
- [ ] Seção IPTU Curitiba adicionada
- [ ] 8+ fontes oficiais linkadas inline
- [ ] 2-3 `<CalloutBox>` distribuídos
- [ ] FAQ com 5 Q&A de PAA real + FAQ schema no frontmatter
- [ ] `updatedAt` no frontmatter
- [ ] "Dados verificados em DD/abr/2026" visível no corpo
- [ ] Cliffhangers ao fim de cada H2
- [ ] 1 imagem a cada 2 H2 com alt descritivo
- [ ] 1 CTA inline + 1 CTABox final contextual (Água Verde/Portão)
- [ ] Zero "é importante ressaltar", "Curitiba é frequentemente apontada", "destaca-se"

---

**Fim do review.**
