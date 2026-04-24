# Research & Methodology Standards — FYMOOB

> **Status:** PROPOSTA — adição ao Manual Editorial (`docs/seo/editorial-style-guide.md`).
> **Escopo:** standards de PESQUISA, ATRIBUIÇÃO e APRESENTAÇÃO DE DADOS em posts YMYL (finanças + imóveis).
> **Baseado em benchmarks:** Nubank, Exame, FipeZap (Fipe), Aos Fatos, IFCN Code of Principles, Reuters Handbook, Google Search Quality Rater Guidelines (YMYL).
> **Relação com o manual atual:** complementa e aprofunda a Regra 9 (Citar fonte sem quebrar o fluxo) e a Regra 12 (Dados desatualizados). Não substitui as 15 regras de voz — regula a camada de EVIDÊNCIA que sustenta a voz.
> **Data:** 2026-04-23.

---

## Por que isso existe

O Manual Editorial FYMOOB hoje resolve o problema de VOZ (como escrever). Não resolve o problema de EVIDÊNCIA (como ancorar o que foi escrito). Num cenário pós-AI Overview, o Google aplica peso reforçado de E-E-A-T (Experience, Expertise, Authoritativeness, Trust) a conteúdo YMYL — financiamento imobiliário é YMYL de "máximo dano financeiro possível". Sem rigor metodológico visível, somos indistinguíveis de qualquer blog de imobiliária genérica — e o Google trata como tal.

Os padrões abaixo são o que SEPARA post citado em AI Overview (`Nubank`, `Exame`, `Valor`) de post que só empilha palavra-chave. A diferença não está no tom. Está na **evidência visível**.

---

## 1. Princípios

Os cinco princípios que regem toda camada de dado/pesquisa em posts FYMOOB YMYL. Derivados do IFCN Code of Principles e adaptados ao contexto imobiliário brasileiro.

1. **Fonte primária sempre que possível.** Banco Central, Caixa, IBGE, Abrainc, Fipe, Secovi, Serasa — não "segundo o InfoMoney que cita o BC". Se só existe fonte secundária, linkar a secundária E a primária que ela cita.
2. **Data do dado é parte do dado.** Número sem mês/ano é propaganda, não informação. "Caixa cobra 11,19%" está errado. "Caixa cobra 11,19% em abril/2026" está certo.
3. **Incerteza declarada > certeza fabricada.** Se não sabemos, dizemos. "Estimativa com base em X", "amostra de Y imóveis", "dado ainda não consolidado" — cada um sinaliza um nível diferente de confiança.
4. **Erro admitido é autoridade, não vergonha.** Corrigir publicamente (errata visível no post, changelog) aumenta trust. Esconder erro, destrói.
5. **Metodologia aberta é filtro de qualidade.** Quando o leitor consegue replicar o raciocínio, ele confia. Quando só vê o resultado, duvida. Em rankings/comparativos: sempre explicar como chegamos ao número.

---

## 2. Attribution Standards

Como citar fontes sem quebrar o ritmo da leitura. Refinamento da Regra 9 atual.

### 2.1 Regra geral

Atribuição **sempre in-line, no meio da frase, como link embutido**. Nunca como nota de rodapé, nunca em parágrafo separado ("De acordo com..."), nunca como bloco de "bibliografia" no fim.

- **DO:** `A Caixa lidera com 67% do mercado ([Banco Central, fev/2026](link))`
- **DON'T:** `Segundo o Banco Central do Brasil, conforme dados divulgados em fevereiro de 2026, a Caixa Econômica Federal...`

### 2.2 Quando usar in-line vs. link simples vs. apêndice

| Tipo de dado | Padrão de atribuição |
|---|---|
| Número-chave (taxa, preço, ranking) | In-line com link na palavra do dado: `Caixa cobra [11,19%](link-fonte)` |
| Citação direta de pessoa/instituição | Atribuição curta antes da aspa: `Segundo a Abecip, "..."` |
| Base de cálculo / metodologia própria | Box de metodologia no fim (ver §4) |
| Jurisprudência / marco legal | Link in-line pra lei oficial no Planalto, sem recitar nome completo |
| Dados estatísticos proprietários (FYMOOB) | Nota na frase: `(base interna FYMOOB, 249 imóveis ativos, abril/2026)` |

### 2.3 Âncora de link — proibido "clique aqui"

**Sempre linkar na palavra que carrega o dado.** "Clique aqui" é lixo de SEO e de usabilidade.

- **DO:** `A Selic está em [15% desde março/2026](link-bcb)`
- **DON'T:** `A Selic está em 15% desde março/2026 — [clique aqui](link) pra ver a fonte`

### 2.4 Fonte secundária

Quando o dado vem de veículo (InfoMoney, Exame, Valor), linkar o veículo E a fonte primária que ele cita, se existir:

- **DO:** `A Caixa ampliou o limite pra R$ 1,5 mi ([Valor Econômico](link-valor), baseado em [comunicado oficial da Caixa](link-caixa))`

### 2.5 Proibido

- Citar sem link quando o link é público e existe.
- "Especialistas dizem", "pesquisas mostram" sem nomear.
- Atribuição vaga tipo "fontes do mercado" — isso é jornalismo, não blog de imobiliária. Nós nomeamos.

---

## 3. Uncertainty Signals

Como dizer "não sei com 100% de certeza" sem virar covarde e sem perder autoridade. Reuters e Aos Fatos tratam isso como obrigação, não opção.

### 3.1 Vocabulário padronizado

Três níveis, sempre visíveis no corpo do texto:

| Nível | Frases permitidas | Quando usar |
|---|---|---|
| **Confirmado** | `Caixa cobra 11,19%` | Dado oficial, com link direto pra fonte primária. Afirmação sem qualificador. |
| **Estimado** | `aproximadamente R$ 270 mil`, `cerca de 67%`, `em torno de` | Cálculo derivado, simulação, ou fonte que já é aproximação |
| **Não confirmado** | `estima-se que`, `segundo dados ainda não consolidados`, `em análise preliminar` | Tendência, projeção, ou dado sem fonte oficial ainda |

### 3.2 Cálculos derivados sempre sinalizados

Se FYMOOB fez uma simulação interna (ex: "R$ 270 mil de diferença"), **a base do cálculo tem que aparecer**, no mínimo em rodapé inline:

- **DO:** `A diferença chega a R$ 270 mil em 30 anos — simulação SAC, R$ 500 mil financiados, entrada 20%, taxa Caixa 11,19% vs. taxa Inter 12,30%, abril/2026.`
- **DON'T:** `A diferença chega a R$ 270 mil.` (sem base, vira marketing)

### 3.3 Quando dado crítico NÃO tem fonte primária

Admitir. Exemplo: "Market share regional Curitiba não é publicado oficialmente — a estimativa FYMOOB é baseada em X imobiliárias pesquisadas em Y mês".

### 3.4 Classificação explícita (opcional, para posts de ranking/comparativo)

Emprestado do Aos Fatos: cada claim do ranking pode levar um selo discreto de evidência:

- `Confirmado` — fonte oficial linkada
- `Calculado` — base aberta no post
- `Estimado` — aproximação com metodologia declarada
- `Não confirmado` — sinal de que precisamos atualizar

Não é obrigatório em todo post, mas em **qualquer ranking, tabela comparativa, ou "maior/menor/melhor"**, aplicar o padrão.

---

## 4. Methodology Disclosure — Box no fim do post

Toda post que tenha RANKING, COMPARATIVO, CÁLCULO PRÓPRIO ou SIMULAÇÃO leva box de metodologia ao final. Imitando o padrão Exame (explícito) e FipeZap (metodologia pública em PDF).

### Template do box

```mdx
<MethodologyBox>
  **Como fizemos este comparativo**

  **Fontes:** Taxas nominais coletadas nos sites oficiais dos bancos em {data}. CET calculado com base em simulação SAC, prazo 30 anos, imóvel R$ 500 mil, entrada 20%, seguro MIP + DFI médio do mercado.

  **Amostra:** 6 bancos (Caixa, BRB, Itaú, Santander, Bradesco, Inter). Critério: maior volume de crédito imobiliário nacional segundo Banco Central, fev/2026.

  **Período:** Taxas verificadas entre {data-início} e {data-fim}.

  **Limitações:** CET pode variar por perfil de renda, relacionamento bancário e portabilidade. Este ranking é referência — simulação individual no banco continua sendo obrigatória.

  **Última atualização:** {updatedAt}. Próxima revisão prevista: {updatedAt + 1 mês}.

  **Errata / correções:** {link pra changelog do post, se houver}
</MethodologyBox>
```

### Conteúdo obrigatório

1. **Fontes** — onde cada número foi coletado.
2. **Amostra** — quem foi incluído e por quê.
3. **Período** — entre quais datas.
4. **Limitações** — o que este dado NÃO diz.
5. **Última atualização** + previsão de próxima.
6. **Errata** — se já houve correção, link.

### Localização

Sempre no fim, antes da seção FAQ. Nunca no topo (quebra o lide punch). Apresentação visual: box cinza discreto, tipografia menor, sem concorrer com o corpo do texto.

---

## 5. Update Protocol

### 5.1 updatedAt no frontmatter

Todo post YMYL tem `publishedAt` + `updatedAt` no frontmatter MDX:

```yaml
---
title: "Melhor banco pra financiar imóvel em Curitiba (abril 2026)"
publishedAt: "2026-04-15"
updatedAt: "2026-04-23"
nextReview: "2026-05-23"
author: "vinicius-damas"
reviewedBy: "bruno-fymoob"
---
```

### 5.2 Changelog visível

Todo update que altera NÚMERO (taxa, ranking, preço) vai em `changelog` no frontmatter, renderizado no fim do post (abaixo do MethodologyBox):

```yaml
changelog:
  - date: "2026-04-23"
    change: "Taxa Caixa atualizada de 11,05% para 11,19% (reajuste de 18/abr)."
  - date: "2026-04-15"
    change: "Post publicado."
```

Padrão Nubank já implementa "Publicado em X | Atualizado em Y" — FYMOOB vai além listando **o que** mudou, não só **quando**.

### 5.3 Cadência de revisão por categoria

| Categoria | Frequência mínima de revisão |
|---|---|
| Taxas de juros / Selic / CET | Mensal |
| Ranking de bancos | Mensal |
| Programas habitacionais (MCMV, FGTS) | Trimestral ou quando há MP |
| Preço m² por bairro | Trimestral |
| Guias evergreen (como funciona financiamento) | Semestral |
| Conteúdo institucional (sobre, processo) | Anual |

### 5.4 Quando NÃO atualizar — arquivar

Post muito antigo com número ultrapassado e sem valor de atualização: não deletar (quebra SEO). Marcar como `status: archived` no frontmatter, adicionar banner no topo ("este post é de X/20XX e pode estar desatualizado. [Veja a versão atual](link).") e redirecionar canonical pra versão nova.

---

## 6. Correction Protocol

Precedente Reuters ("Always correct an error openly") + IFCN (Princípio 5 — Política de Correções Aberta e Honesta).

### 6.1 O que conta como correção

- Número errado (taxa, preço, percentual).
- Atribuição errada (atribuiu a X algo que foi de Y).
- Fato errado (ano, cidade, entidade).
- Claim não suportado que foi removido.

**NÃO conta como correção (não precisa errata):** typo, reescrita de estilo, ajuste de SEO, adição de novo parágrafo que complementa sem contradizer.

### 6.2 Como corrigir

1. Corrigir o texto.
2. Adicionar linha no `changelog` com data + o que foi corrigido + motivo.
3. Se a correção é GRANDE (número-chave errado que afetou conclusão), adicionar **nota de correção visível no início do post**, com padrão:

```mdx
<CorrectionNote>
  **Correção — 2026-04-23:** Em versão anterior deste post, a taxa da Caixa
  aparecia como 10,89%. O número correto é 11,19% desde março/2026
  ([fonte: Caixa](link)). Os cálculos de comparativo foram refeitos.
  Agradecemos ao leitor que apontou o erro.
</CorrectionNote>
```

4. **Nunca deletar silenciosamente.** Se o claim estava errado, mantemos o histórico.

### 6.3 Quem corrige

Autor do post corrige; editor (Bruno) aprova antes de publicar. Para correção em post que gerou matéria/link externo, avisar o veículo que linkou (goodwill + SEO).

---

## 7. Author Expertise Display

Google Search Quality Rater Guidelines (set/2025) explicita: autor sem bio visível = conteúdo sem autoridade em YMYL. Hoje no FYMOOB isso é gap crítico — só temos byline.

### 7.1 Bio card ao fim de todo post YMYL

Componente `<AuthorCard>` renderizado ao fim do post, antes do FAQ:

```mdx
<AuthorCard
  name="Vinicius Damas"
  role="Fundador FYMOOB · Corretor de Imóveis"
  creci="PR-XXXXX-F"
  bio="Atua no mercado imobiliário de Curitiba desde {ano}. {credenciais específicas}. Escreve sobre financiamento, MCMV e mercado de Curitiba."
  experience="Fechou {N} financiamentos nos últimos 12 meses nos principais bancos (Caixa, BRB, Itaú, Santander, Bradesco)."
  linkedin="..."
  email="..."
  photo="..."
/>
```

### 7.2 Campos obrigatórios

- **Nome completo** (não apelido).
- **CRECI** (quando aplicável — é o principal signal de autoridade pro Google em real estate YMYL).
- **Experience statement** — 1 frase sobre o que o autor FAZ, não só sobre o que sabe. Ex: "Fechou 40 financiamentos em 2025 com os 5 maiores bancos de Curitiba" é 10x mais forte que "especialista em financiamento".
- **Link pra página `/autores/[slug]`** — página dedicada com histórico completo, todos os posts, credenciais.

### 7.3 Revisor (peer review)

Para posts YMYL com número-chave que afeta decisão de compra: adicionar campo `reviewedBy` com nome do revisor interno (Bruno, corretor sênior, ou parceiro jurídico) e data:

```yaml
reviewedBy:
  - name: "Bruno [Sobrenome]"
    role: "Proprietário FYMOOB · Corretor CRECI PR-XXXX"
    date: "2026-04-22"
```

Renderizar discretamente abaixo do título do post: `Revisado por Bruno [...], CRECI PR-XXXX, em 22/abr/2026`.

### 7.4 Página `/autores/[slug]`

Cada autor tem página dedicada com:
- Foto + bio expandida.
- CRECI + credenciais.
- Histórico de carreira (timeline).
- Todos os posts assinados.
- Schema.org `Person` com `jobTitle`, `worksFor`, `knowsAbout`.

Isso é o MAIOR gap atual do FYMOOB vs. Nubank/Exame. Resolver isso sobe E-E-A-T mais que qualquer otimização on-page.

---

## 8. Data Currency Display

Todo número sensível ao tempo (taxa, preço, ranking, Selic, CET) exibe **mês/ano visível no próprio corpo do texto**, não só no frontmatter.

### 8.1 Padrão de exibição

- **DO:** `Caixa cobra 11,19% (taxa verificada em abril/2026, site oficial)`
- **DO:** `Selic em 15% desde março/2026 ([ata Copom](link))`
- **DON'T:** `Caixa cobra 11,19%` (sem data, parece verdade universal)
- **DON'T:** `atualmente cobra 11,19%` ("atualmente" expira na hora)

### 8.2 No título do post

Preferir ano no título (se couber no limite de 55 chars do manual): `Melhor banco pra financiar em Curitiba (abril 2026)`. Sinal de freshness direto na SERP.

### 8.3 Nos subtítulos H2

Quando a seção se refere a dado datado:

- **DO:** `Ranking atualizado em abril/2026`
- **DON'T:** `Ranking atual`

### 8.4 Selic / taxas do dia — componente dinâmico

Para taxas que mudam (Selic, CDI), considerar componente que pegue a última leitura via API BCB e renderize com timestamp. Gap atual: taxas são hardcoded no MDX. Proposta: `<SelicWidget />` que lê do BCB e mostra "Selic 15% (atualizado em {timestamp})".

---

## 9. Source Links Policy

Expansão da Regra 9 atual.

### 9.1 Jamais "clique aqui" como âncora

Âncora de link é palavra que carrega o significado do destino.

- **DO:** `confirme a taxa no [simulador oficial da Caixa](link)`
- **DON'T:** `confirme a taxa [clicando aqui](link)`

### 9.2 Link in-line embed no meio da frase

Mesmo padrão Nubank: link "invisível" no meio do texto, não em bloco separado.

- **DO:** `A Selic está em [15% desde março/2026](link-bcb) após decisão do Copom.`
- **DON'T:** `A Selic está em 15% desde março/2026. [Veja aqui a decisão do Copom](link-bcb).`

### 9.3 Hierarquia de fontes (preferência)

Quando há múltiplas fontes pro mesmo dado, preferir nesta ordem:

1. **Órgão oficial** (BCB, Caixa, IBGE, Planalto, TJPR).
2. **Instituto / associação reconhecida** (Fipe, Abecip, Abrainc, Secovi).
3. **Veículo de imprensa Tier 1** (Valor, Estadão, Folha, Exame, InfoMoney).
4. **Veículo Tier 2** (Metrópoles, Seu Dinheiro, iDinheiro).
5. **Blog setorial / concorrente** — só se não há opção 1-4, e com crédito explícito.

Nunca citar: fórum, Reddit, comentário de YouTube como fonte primária.

### 9.4 Link externo em nova aba — sim, mas sem perder o leitor

Links de fonte: `target="_blank" rel="noopener"`. CTAs internos (simular, contato): ficam na mesma aba.

### 9.5 Fonte paga / paywall

Se a fonte está em paywall (Valor, FT), indicar no link: `([Valor Econômico, assinantes](link))`. Nunca fingir que leitor vai conseguir ler de graça.

---

## 10. Confidence Levels

Opcional, mas recomendado em posts de ranking/comparativo de alto impacto. Inspirado em Aos Fatos (7 categorias de veredito).

### 10.1 Escala FYMOOB (simplificada)

Três níveis, aplicados a cada CLAIM relevante num ranking/comparativo:

| Selo | Critério |
|---|---|
| **Alta confiança** | Fonte primária oficial + dado verificado nos últimos 30 dias |
| **Confiança média** | Fonte secundária de veículo Tier 1 OU cálculo FYMOOB com metodologia aberta |
| **Confiança baixa** | Estimativa, tendência, ou dado não confirmado — sempre acompanhado de "precisa validação" |

### 10.2 Como renderizar

Não gritante. Pode ser ícone discreto ao lado do número, tooltip com o selo, ou simplesmente inline: `Caixa 11,19% (alta confiança — site oficial, abril/2026)`.

### 10.3 Quando aplicar

- Ranking de bancos → todo item leva selo.
- Preço m² por bairro → todo bairro leva selo (base interna vs. FipeZap vs. estimativa).
- Guia de "como funciona" → não aplica (conteúdo conceitual, não dependente de confiança).

---

## 11. Peer Review Note

Quando post passou por revisão editorial (Bruno, corretor sênior, advogado parceiro), sinalizar.

### 11.1 Para posts "normais"

Byline simples: `Por Vinicius Damas`. Sem badge de revisão.

### 11.2 Para posts YMYL com número-chave

Badge visível abaixo do título:

```mdx
<ReviewBadge
  author="Vinicius Damas"
  reviewedBy="Bruno [Sobrenome]"
  reviewerCreci="PR-XXXXX-F"
  reviewDate="2026-04-22"
/>
```

Renderiza algo como:
> Por **Vinicius Damas** · Revisado por **Bruno [Sobrenome]** (CRECI PR-XXXX) em 22/abr/2026

### 11.3 Para posts com dimensão jurídica

Quando o post aborda contrato, ITBI, escritura, tributação imobiliária — idealmente passar por advogado parceiro e sinalizar: `Revisão jurídica: Dr(a). XXX, OAB/PR YYYYY`.

Não obrigatório em todo post. Mas quando aplicado, é o maior booster de E-E-A-T em YMYL jurídico.

---

## Gap Analysis — FYMOOB hoje vs. target

| Item | FYMOOB hoje | Target | Ação |
|---|---|---|---|
| Data de dados no corpo do texto | Inconsistente | Sempre mês/ano visível | Pass no manual atual + checklist |
| Box de metodologia | Inexistente | `<MethodologyBox>` em todo ranking/comparativo | Criar componente MDX |
| Changelog no post | Só `updatedAt` no frontmatter | `updatedAt` + lista de mudanças renderizada | Criar campo `changelog` + componente |
| Erratas visíveis | Inexistente | `<CorrectionNote>` no topo quando aplicável | Criar componente |
| Author card | Só byline simples | Bio card com CRECI, experience, foto | Criar `<AuthorCard>` + página `/autores/[slug]` |
| Página do autor | Inexistente | `/autores/vinicius-damas` com schema Person | Rota + template |
| CRECI visível | Não | Sim em byline e rodapé | Frontmatter + componente |
| Peer review badge | Não | `<ReviewBadge>` em YMYL com número-chave | Criar componente |
| Confidence levels | Não | Selo em claim de ranking | Opcional, criar depois do baseline |
| Âncora de link padronizada | Inconsistente ("clique aqui" aparece) | In-line na palavra do dado, sempre | Lint rule + pass de revisão |
| Hierarquia de fontes | Implícita | Documentada (§9.3) | Adicionar ao checklist final |
| Next review date | Não | `nextReview` no frontmatter | Campo + cron de alerta |

**Prioridade 1 (publicar este mês, alto ROI em E-E-A-T):**
1. `<AuthorCard>` + página `/autores/[slug]` com CRECI.
2. `<MethodologyBox>` em todo post comparativo/ranking.
3. Changelog renderizado no fim do post.

**Prioridade 2 (próximo sprint):**
4. `<CorrectionNote>` para correções grandes.
5. `<ReviewBadge>` em posts revisados pelo Bruno.
6. Campo `nextReview` + alerta automático.

**Prioridade 3 (nice-to-have):**
7. Confidence levels em ranking.
8. `<SelicWidget />` dinâmico.
9. Revisão jurídica em posts de contrato/ITBI.

---

## Templates concretos

### 1. MethodologyBox (MDX)

```mdx
import { MethodologyBox } from '@/components/editorial/methodology-box';

<MethodologyBox
  sources={[
    { label: 'Taxas oficiais', url: 'https://caixa.gov.br/...' },
    { label: 'Selic / Copom', url: 'https://bcb.gov.br/...' },
  ]}
  sample="6 bancos (Caixa, BRB, Itaú, Santander, Bradesco, Inter)"
  sampleCriteria="Maior volume de crédito imobiliário nacional (Banco Central, fev/2026)"
  period={{ start: '2026-04-15', end: '2026-04-22' }}
  calculation="CET simulado em SAC, prazo 30 anos, imóvel R$ 500 mil, entrada 20%, seguro MIP+DFI médio do mercado."
  limitations="CET varia por perfil de renda, relacionamento bancário e portabilidade. Este ranking é referência — simulação individual no banco continua sendo obrigatória."
  updatedAt="2026-04-23"
  nextReview="2026-05-23"
/>
```

### 2. CorrectionNote (MDX)

```mdx
<CorrectionNote date="2026-04-23">
  Em versão anterior deste post, a taxa da Caixa aparecia como 10,89%. O número
  correto é **11,19%** desde março/2026 ([fonte: Caixa](https://caixa.gov.br/taxas)).
  Os cálculos de comparativo foram refeitos. Agradecemos ao leitor que apontou o erro.
</CorrectionNote>
```

### 3. AuthorCard (MDX)

```mdx
<AuthorCard
  slug="vinicius-damas"
  name="Vinicius Damas"
  role="Fundador FYMOOB · Corretor de Imóveis"
  creci="PR-XXXXX-F"
  photo="/autores/vinicius-damas.jpg"
  bio="Atua no mercado imobiliário de Curitiba desde 2018. Especialista em financiamento habitacional e MCMV. Escreve sobre imóveis, taxas e mercado de Curitiba."
  experience="Acompanhou mais de 150 financiamentos fechados em Curitiba nos últimos 24 meses, nos 5 principais bancos do mercado."
  links={{
    linkedin: 'https://linkedin.com/in/...',
    page: '/autores/vinicius-damas',
  }}
/>
```

### 4. Changelog renderizado

```mdx
---
changelog:
  - date: "2026-04-23"
    change: "Taxa Caixa atualizada de 11,05% para 11,19% (reajuste 18/abr)."
    type: "data-update"
  - date: "2026-04-19"
    change: "Adicionado BRB ao ranking (subiu pra top 3 no DF/MG)."
    type: "content-expansion"
  - date: "2026-04-15"
    change: "Post publicado."
    type: "initial"
---
```

Renderizado como `<ChangeLog entries={changelog} />` no fim do post, sob accordion por padrão (fechado), expansível.

### 5. Frontmatter YMYL completo (target)

```yaml
---
title: "Melhor banco pra financiar imóvel em Curitiba (abril 2026)"
description: "Ranking dos 6 bancos mais baratos pra financiar em Curitiba em abril/2026..."
publishedAt: "2026-04-15"
updatedAt: "2026-04-23"
nextReview: "2026-05-23"
author: "vinicius-damas"
reviewedBy: "bruno-fymoob"
category: "financiamento"
ymyl: true
confidence: "high"
changelog:
  - date: "2026-04-23"
    change: "Taxa Caixa atualizada de 11,05% para 11,19%."
    type: "data-update"
  - date: "2026-04-15"
    change: "Post publicado."
    type: "initial"
sources:
  primary:
    - { label: "Banco Central — taxas bancos", url: "..." }
    - { label: "Caixa — simulador oficial", url: "..." }
  secondary:
    - { label: "Exame — ranking CET", url: "..." }
---
```

---

## Checklist — adicionar ao manual editorial

Adicionar ao "Checklist final antes do commit" (hoje na seção final do `editorial-style-guide.md`):

```markdown
**Evidência / Pesquisa (YMYL):**
- [ ] Todo número tem fonte linkada in-line na palavra do dado?
- [ ] Todo número tem mês/ano visível no corpo do texto?
- [ ] Cálculo derivado (simulação) tem base aberta no texto ou em MethodologyBox?
- [ ] `updatedAt` e `nextReview` no frontmatter atualizados?
- [ ] Post tem `<AuthorCard>` ao fim com CRECI visível?
- [ ] Se é ranking/comparativo, tem `<MethodologyBox>` no fim?
- [ ] Se houve update que mudou número, tem entrada em `changelog`?
- [ ] Se houve correção de fato, tem `<CorrectionNote>` no topo?
- [ ] Fontes seguem hierarquia (§9.3 — oficial > instituto > Tier 1)?
- [ ] Nenhum "clique aqui" como âncora?
- [ ] Se revisado, tem `<ReviewBadge>` com data e CRECI do revisor?
```

---

## Referências (URLs + data de consulta — 2026-04-23)

**Tier 1 — Standards de fact-checking:**
- [IFCN Code of Principles (Poynter)](https://www.ifcncodeofprinciples.poynter.org/know-more/the-commitments-of-the-code-of-principles) — 5 compromissos: não-partidarismo, transparência de fontes, transparência de financiamento, metodologia, política de correções.
- [Aos Fatos — Metodologia](https://www.aosfatos.org/metodologia-2015/) — classificação em 7 categorias (VERDADEIRO, IMPRECISO, EXAGERADO, CONTRADITÓRIO, INSUSTENTÁVEL, DISTORCIDO, FALSO) + peer review de 2 editores por matéria.
- [Reuters Handbook of Journalism (PDF)](https://www.mediareform.org.uk/wp-content/uploads/2015/12/Reuters_Handbook_of_Journalism.pdf) — sourcing standards, política de fontes anônimas, "Always correct an error openly".

**Tier 2 — Standards de metodologia estatística:**
- [FipeZap — Índice de Preços de Imóveis (Fipe)](https://www.fipe.org.br/pt-br/indices/fipezap/) — metodologia pública: Laspeyres estratificado, média móvel 3 meses, ~1 milhão de anúncios amostrados, 56 cidades.
- [FipeZap — PDF metodologia 2019](https://downloads.fipe.org.br/indices/fipezap/metodologia/indice-fipezap-metodologia-2019.pdf) — nota técnica completa (amostra, tratamento, frequência).

**Tier 3 — Referências de voz + attribution (já no manual atual):**
- [Nubank Blog — Taxa de juros](https://blog.nubank.com.br/taxa-de-juros-financiamento-imobiliario/) — padrão "Publicado em X | Atualizado em Y", citação in-line.
- [Exame — Ranking de bancos](https://exame.com/invest/minhas-financas/os-melhores-e-piores-bancos-para-financiar-imovel/) — box de metodologia implícito (parâmetros da simulação + atribuição a "Proteste").

**Tier 4 — Google guidelines (YMYL):**
- [Google Search Quality Rater Guidelines (PDF, set/2025)](https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf) — E-E-A-T, YMYL expandido, requisitos de autor + credenciais.
- [Google — Creating Helpful Content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — "trust is the most important member of the E-E-A-T family", requisitos pra YMYL.

---

## Relação com outros documentos

- Complementa: `docs/seo/editorial-style-guide.md` (voz + estilo).
- Suporta: `docs/seo/blog-strategy-2026-q2.md` (estratégia de blog).
- Depende de: criar componentes MDX (`MethodologyBox`, `AuthorCard`, `CorrectionNote`, `ReviewBadge`, `ChangeLog`) em `src/components/editorial/`.
- Rota nova necessária: `/autores/[slug]` com schema.org `Person`.
