# Review: `mercado-imobiliario-curitiba-2026.mdx`

**Revisor:** agente paralelo #13/13 — FYMOOB blog audit
**Data:** 2026-04-23
**Arquivo auditado:** `c:\Users\Vine\fymoob\content\blog\mercado-imobiliario-curitiba-2026.mdx`
**Título atual:** "Mercado Imobiliário de Curitiba em 2026: Tendências, Preços e Oportunidades"
**Título sugerido (plano Q2):** "Bolha em Curitiba? Este indicador disparou em 2026 e preocupa corretores"
**Autor do post:** Bruno César de Almeida
**Data frontmatter:** 2026-04-04 (sem `updatedAt`)

---

## Prioridade: P0 — REESCREVER DO ZERO

Post concentra 4 problemas graves que se potencializam:
1. **YMYL factualmente não validado** (taxas de juros erradas, VGV/vendas/estoque ausentes, preços de m² sem fonte citada).
2. **Quase TODAS as 15 regras editoriais violadas** — é o poster boy do "Wikipedia voice" que o style guide bane.
3. **Título proposto ("Bolha?") não tem UM ÚNICO indicador no corpo do post que sustente a palavra "bolha"** — risco YMYL / E-E-A-T enorme.
4. **Taxas de juros replicam o mesmo erro crítico já documentado no style guide** ("Precedente interno: o post atual diz 8,5-10,5% quando a realidade é 11,19%. Isso é o motivo de 241 impressões / 0 clique"). Este post repete o erro.

Não dá pra "ajustar com edição de superfície". É reescrita estrutural + revalidação de todos os dados numéricos.

---

## 1. Erro crítico — YMYL inválido (bloqueador de publicação)

### 1.1. Taxas de juros desatualizadas (o MESMO erro do post de financiamento)

Tabela de financiamento (linhas 94-99):

| Banco | Post diz | Realidade abril/2026 (per style guide) |
|---|---|---|
| Caixa (SFH) | 8,5-10,5% | **11,19%** |
| Itaú | 9,5-11,5% | 11,60% |
| Bradesco | 9,0-11,0% | 11,70% |
| Santander | 9,5-11,5% | ~11,60% |

O editorial-style-guide **nomeia explicitamente este erro** como causa de 241 impressões / 0 clique do post irmão. Publicar este post com a tabela atual = repetir o mesmo bug que está matando a autoridade do blog.

### 1.2. Zero fontes citadas (viola Regras 9, 12)

O post faz afirmações quantitativas fortes sem **nenhum** link pra fonte primária:
- "Preço médio m² R$ 8.500-9.500" — sem FipeZap / Secovi-PR / Sinduscon-PR
- "Valorização 5-8% a.a." — sem fonte
- "Vacância 2-4%" — sem Secovi-PR nem CRECI-PR
- "Mercês cresceu 9% no último ano" — número específico, zero link
- "Yield 0,5-0,7%/mês" — sem FipeZap aluguel
- "Valorização 15-25% planta→entrega Ecoville" — sem ABRAINC / Sinduscon

Em YMYL sem fonte, Google Quality Raters marcam como "low quality". Style guide Regra 9: "autoridade vem de número + fonte reduzida + link".

### 1.3. Claims do briefing AUSENTES do post

O briefing pede validar: **VGV lançamentos, vendas 2024-2026, estoque, tempo médio de venda, taxa vacância, spread locação**. O post atual **não cita nenhum desses indicadores** além de vacância (genérica, sem fonte). Sem eles, não há como sustentar nenhuma tese de "bolha", "aquecimento" ou "oportunidade".

### 1.4. "Bolha" sem indicador — risco YMYL YMY-L máximo

O título proposto ("Bolha em Curitiba? Este indicador disparou...") promete um indicador específico que sustenta a hipótese de bolha. O corpo do post atual **não tem nenhum indicador que permita sequer levantar a hipótese**:
- Não cita relação preço/renda (Case-Shiller style)
- Não cita crescimento de crédito imobiliário vs. PIB regional
- Não cita endividamento das famílias paranaenses
- Não cita descolamento VGV lançado vs. VGV absorvido
- Não cita tempo médio de venda

Sem pelo menos UM desses indicadores apontando descolamento histórico, **a palavra "bolha" é clickbait enganoso** — exatamente o que o style guide (seção "Curiosity gap sem enganar") e o plano Q2 (seção 12, riscos: "Títulos sensacionalistas demais") proíbem.

---

## 2. Auditoria das 15 regras do style guide

| Regra | Status | Evidência |
|---|---|---|
| R1 — Proibida abertura genérica | **VIOLA** | "O mercado imobiliário de Curitiba em 2026 apresenta um cenário de oportunidades para quem sabe onde olhar" = definição-wikipedia pura. |
| R2 — 1ª frase com número OU contradição | **VIOLA** | Nenhum número, nenhuma contradição no 1º parágrafo. |
| R3 — Lide 2-4 frases | **VIOLA** | Lide tem 1 frase longa de 42 palavras, parágrafo monolítico. |
| R4 — Ritmo 3-1-3 nos 1os 500 palavras | **VIOLA** | Zero frase-punch curta nos primeiros 500 palavras. |
| R5 — H2 = pergunta/promessa, não rótulo | **VIOLA** | "Panorama geral do mercado", "Preços por bairro", "Tendências para 2026", "Oportunidades de investimento", "Financiamento em 2026", "Conclusão" — TODOS rótulos. Estilo Wikipedia. |
| R6 — Tabela no top, depois do lide | **PARCIAL** | Tabela aparece em H2#2 (linha 24), mas sem a frase-guia "o que olhar aqui". |
| R7 — 1 frase curta a cada 3-5 longas | **VIOLA** | Parágrafos uniformes 3-5 linhas. Zero ritmo. |
| R8 — Number drop | **VIOLA** | Nenhum número-âncora repetido do lide→meio→fim. |
| R9 — Fonte sem quebrar fluxo | **VIOLA** | ZERO links de fonte primária em todo o post. |
| R10 — CTA in-line, não bloco gritante | **VIOLA** | 2 `<CTABox>` usados como bloco gritante (linhas 66 e 119). Zero in-line. |
| R11 — Fechar com provocação/próximo passo | **VIOLA** | Seção "Conclusão" existe literalmente e é resumo (R5+R11 simultâneo). |
| R12 — Dados desatualizados = post morto | **VIOLA** | Taxas 8,5-10,5% são as MESMAS do post incriminado no style guide. Sem `updatedAt` no frontmatter. |
| R13 — Callout a cada 3-5 H2 | **VIOLA** | Zero `<CalloutBox>`. Só `<CTABox>`. |
| R14 — FAQ com 5 perguntas de PAA | **VIOLA** | Zero FAQ. Zero schema FAQ. |
| R15 — Zero "wikipedia voice" | **VIOLA** | "apresenta um cenário", "se posiciona como", "continua sendo", "sustenta a valorização de longo prazo" = tom acadêmico-corporativo. |

**Score: 14/15 violadas (R6 parcial).** O post é case de "o que NÃO fazer" definido no style guide.

---

## 3. Auditoria do checklist pré-publicação (15 itens do plano Q2)

| # | Item | Status |
|---|---|---|
| 1 | Título tem curiosity gap OU número concreto | Falha (atual é rótulo) |
| 2 | Título cabe em 60 chars | Falha (68 chars atuais) |
| 3 | Lide cabe em 2 linhas mobile (≤280 chars) | Falha (~310 chars) |
| 4 | 1º parágrafo não começa com "Neste artigo" | OK |
| 5 | ≥1 estatística com fonte citada | **Falha (0 fontes)** |
| 6 | ≥1 nome próprio (caso real/hipotético) | Falha |
| 7 | Cada H2 é pergunta/afirmação | **Falha (6/6 são rótulos)** |
| 8 | ≥3 curiosity loops | Falha |
| 9 | 1 callout nos 300 primeiros palavras | Falha |
| 10 | CTA contextual meio + CTA box final | Parcial (2 boxes, zero inline) |
| 11 | 3-5 internal links relevantes | OK (5 links pra /imoveis/[bairro]) |
| 12 | 1 imagem a cada 2 H2s | Falha (sem imagens no corpo) |
| 13 | Reading time exibido | Falha |
| 14 | Frontmatter com schema FAQ | **Falha (sem FAQ, sem updatedAt)** |
| 15 | Meta description entrega o que promete | OK para título atual; falha se virar "Bolha?" |

**Score: 2/15 OK.**

---

## 4. Auditoria estrutural

**Problemas estruturais graves:**

- **Sem frontmatter `updatedAt`** — Regra 12 exige data visível de atualização em todo YMYL.
- **Sem schema JSON-LD** (nem `Article`, nem `FAQPage`, nem `BreadcrumbList` mencionados no frontmatter).
- **Tabela de financiamento sem coluna CET** — a própria "dica" final manda olhar CET, mas a tabela não oferece.
- **Tabela de yield (linhas 77-82)** tem cálculo que não bate: R$ 200-300k / R$ 1.200-1.800 aluguel = yield 0,6-0,6%, não 0,5-0,6%. Pequena inconsistência, mas em YMYL conta.
- **Link quebrado potencial:** wa.me link usa número com traço `554199978-0517` — formato wa.me não aceita traço, deveria ser `5541999780517`. Testar.
- **Tag `<CTABox>`** usado 2x, `<CalloutBox>` zero vezes. Style guide R13 manda callout.
- **Seção "Conclusão"** é o anti-padrão nomeado (R11 + R5).
- **Zero internal links** pra pillar conteúdo (financiamento, glossário, guia de compra). Só links pra landing de bairro.
- **Nenhum nome próprio, nenhuma cena, nenhum caso real** — seção 5.14 do plano Q2 pede ≥1.
- **Descrição do frontmatter** é genérica de SEO antigo, não promete nada concreto.

---

## 5. Títulos propostos (3-5 opções)

Regra: 45-55 chars, entrega o que promete. **"Bolha" SÓ se pelo menos um indicador (VGV vs. absorção, preço/renda, endividamento) estiver no corpo reescrito**.

### Opção 1 — RECOMENDADA se o post trouxer dado concreto de descolamento VGV x vendas (Sinduscon-PR/ABRAINC):
**"Bolha em Curitiba? Este indicador disparou em 2026"** (47 chars)
- Só usar se o post trouxer, por ex., "VGV lançado cresceu 35% enquanto vendas subiram 8% — estoque em máxima histórica".
- Sem esse dado no corpo, REJEITAR.

### Opção 2 — Segura, data-driven, sem YMYL risk (RECOMENDADA se não tiver dado de bolha):
**"m² em Curitiba dispara 9% em 2026: este bairro passou o Batel"** (61 chars — cortar pra 55)
→ **"Mercês supera Batel em 2026: m² dispara 9% em Curitiba"** (52 chars)
- Entrega o dado que já existe no post (Mercês +9%).
- Precisa validar o 9% com FipeZap/Secovi-PR antes de publicar.

### Opção 3 — Loss aversion / contraintuitiva:
**"Comprar em Curitiba em 2026: 3 bairros que os corretores evitam"** (62 chars — cortar)
→ **"3 bairros de Curitiba que corretores evitam em 2026"** (51 chars)
- Requer reestruturar post em torno de 3 bairros específicos com dado de vacância/tempo de venda.

### Opção 4 — Timing / Selic alto:
**"Selic em 15% trava Curitiba: onde ainda vale comprar em 2026"** (60 chars)
→ **"Selic a 15% trava Curitiba: onde comprar em 2026"** (48 chars)
- Funciona se trouxer VGV/vendas Sinduscon-PR e conectar com decisão do comprador.

### Opção 5 — Ranking data puro:
**"Preço do m² em Curitiba: ranking de 11 bairros em 2026"** (54 chars)
- Conservador, usa a tabela que já existe, sem risco YMYL.

### Recomendação
Usar **Opção 2** se não validar indicador de bolha. Usar **Opção 1** APENAS se a reescrita trouxer, no H2#1, dado Sinduscon-PR/ABRAINC mostrando descolamento VGV lançado vs. vendido (tipo: "VGV lançado cresceu X%, absorção cresceu Y%, estoque em Z meses — maior patamar desde 20XX"). Sem isso, Opção 1 é clickbait enganoso e vai ser flaggado YMYL.

---

## 6. Lide reescrito — 3 opções

### Lide A — Number drop honesto (emparelha com Opção 2 do título):
> Mercês passou Batel em valorização em 2026: +9% em 12 meses contra +6% do vizinho premium. O m² no bairro chegou a R$ 10 mil num ano em que o Batel subiu 600 reais. E não é o único bairro em Curitiba que reescreveu o ranking neste ciclo.
>
> _(2 frases curtas + 1 promessa — ritmo 3-1-3 aplicável)_

### Lide B — Contradição de mercado (emparelha com Opção 4):
> Selic a 15% travou financiamento no Brasil inteiro — mas 4 bairros de Curitiba valorizaram acima de 7% nos últimos 12 meses. A conta parece impossível. O que explica essa assimetria é um número do Sinduscon-PR que poucos corretores olham.
>
> _(precisa trazer o número do Sinduscon-PR no H2#2)_

### Lide C — Bolha honesta (só se dado existir; emparelha com Opção 1):
> O VGV lançado em Curitiba cresceu X% em 2025, enquanto a absorção subiu Y% — e o estoque chegou a Z meses, maior patamar desde 20XX. "Bolha" é palavra forte e só faz sentido quando 3 indicadores sobem juntos. Um deles está entregue; os outros dois a gente destrincha abaixo.
>
> _(X/Y/Z precisam ser REAIS do Sinduscon-PR/ABRAINC antes de escrever)_

---

## 7. Lista de dados que PRECISAM ser validados antes da reescrita

Fontes primárias a consultar:

| Dado | Fonte | Status atual no post |
|---|---|---|
| Preço médio m² por bairro CWB | [FipeZap mensal](https://www.fipezap.com.br/) + Secovi-PR | Números sem fonte |
| VGV lançamentos 2024-2026 CWB | [Sinduscon-PR](https://sinduscon-pr.com.br/) + [ABRAINC](https://www.abrainc.org.br/) | **AUSENTE** |
| Vendas líquidas mensais | Sinduscon-PR / ADEMI-PR | **AUSENTE** |
| Estoque (meses de venda) | Sinduscon-PR | **AUSENTE** |
| Tempo médio de venda | Secovi-PR / CRECI-PR | **AUSENTE** |
| Taxa vacância aluguel | Secovi-PR / QuintoAndar report | Genérico, sem fonte |
| Spread locação (yield) | [FipeZap Aluguel](https://www.fipezap.com.br/) | Sem fonte |
| Taxas de financiamento | [Banco Central SGS série 25497](https://www3.bcb.gov.br/sgspub/) + sites oficiais bancos | **ERRADAS** |
| IPCA / IGP-M p/ comparação | [IBGE](https://www.ibge.gov.br/) / FGV | Ausente |
| Endividamento famílias PR | BCB / SERASA Experian | Ausente (necessário p/ tese "bolha") |

**Regra absoluta antes de publicar:** cada afirmação numérica no corpo precisa de 1 link embutido pra fonte primária (Regra 9), e `updatedAt` tem que estar no frontmatter (Regra 12).

---

## 8. Recomendação final

1. **Não publicar a versão atual.** Nem como hotfix.
2. **Reescrita completa** com: dado validado, fontes linkadas, H2 em pergunta/promessa, lide Number drop, FAQ com 5 PAA reais ("Vai estourar a bolha imobiliária em Curitiba?", "Quanto custa o m² em Curitiba em 2026?", "Quais bairros mais valorizaram?", "Vale comprar imóvel em Curitiba com Selic a 15%?", "Curitiba está cara comparada a outras capitais?"), callout no top, CTA in-line + CTA box final.
3. **Escolher título:** Opção 2 (`Mercês supera Batel em 2026: m² dispara 9% em Curitiba`) é o safe bet. Opção 1 ("Bolha?") só se o post for reescrito em torno de um indicador Sinduscon-PR/ABRAINC documentado.
4. **Taxas de financiamento:** remover a tabela de financiamento deste post — pillar separado já existe (`financiamento-caixa-itau-bradesco-comparativo`). Aqui só linkar. Isso elimina o risco de repetir o bug de 241 imp / 0 clique.
5. **Adicionar ao frontmatter:** `updatedAt: 2026-04-23`, schema `FAQPage`, `BreadcrumbList`, `readingTime`.
6. **Voz:** reescrever eliminando "apresenta um cenário", "se posiciona", "sustenta a valorização" — estilo Nubank/InfoMoney, não Wikipedia.

---

## Anexo — Citação do style guide que este post viola literalmente

> "Precedente interno: o post atual diz 8,5-10,5% quando a realidade é 11,19%. Isso é o motivo de 241 impressões / 0 clique."
> — `docs/seo/editorial-style-guide.md`, Regra 12

Este post usa **exatamente a mesma faixa de 8,5-10,5% para a Caixa**. É o mesmo erro em outro arquivo. Corrigir antes de qualquer commit.
