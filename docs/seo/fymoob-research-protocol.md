# FYMOOB Research Protocol

> **Status:** ATIVO a partir de 24/04/2026. Protocolo OBRIGATÓRIO pra todo post novo e toda reescrita.
> **Consolidação:** derivado de 5 relatórios de especialistas (tech feasibility, data sources map, fact-checking protocol, FYMOOB unique data, industry benchmarks).
> **Princípio:** ser referência em dados imobiliários. 100% dos fatos verificados nas melhores fontes. Rigor jornalístico + dado exclusivo FYMOOB + autoridade local.

---

## 1. Os 5 princípios fundadores

Adaptados de IFCN Code of Principles + Poynter + Reuters + BBC + Google YMYL Quality Guidelines.

1. **Transparência de fontes (P2 IFCN).** Leitor consegue replicar qualquer número. Links profundos (não home), datas visíveis, amostra declarada.
2. **Transparência de metodologia (P4 IFCN).** Todo post pilar/ranking tem `<MethodologyBox>` explicando fontes, período, tratamento estatístico.
3. **Correções abertas (P5 IFCN).** Zero correção silenciosa. Bloco `<Changelog>` visível + `updatedAt` atualizado + log do que mudou.
4. **Dado exclusivo FYMOOB antes de agregador.** Quando temos o número no CRM (yield por bairro, estoque, tempo de venda), usamos o número FYMOOB com amostra declarada em vez de agregador genérico.
5. **Tier maior vence sempre. Fontes mais recentes têm prioridade no desempate.**

---

## 2. Hierarquia de fontes — 6 tiers

Detalhamento completo em [`data-sources-map.md`](./data-sources-map.md). Resumo operacional:

| Tier | O que é | Uso | Exemplos |
|---|---|---|---|
| **1** | Primárias oficiais — órgãos | Sempre citar, primeiro | gov.br, STJ, BCB, Prefeitura CWB, IBGE, FGV, IPPUC, SESP-PR |
| **2** | Setoriais autoritativas | Cross-check de Tier 1 | ADEMI-PR, Sinduscon-PR, Secovi-PR, ABRAINC, CBIC, Abecip, Fipe |
| **3** | Imprensa econômica qualificada | Contexto + corroboração | Valor, Estadão, Folha, InfoMoney, Exame, JOTA, Conjur, Migalhas |
| **4** | Agregadores especializados | Referência operacional | FipeZap dashboard, Quinto Andar Index, Loft Data, MySide, Larya |
| **5** | Imprensa generalista | Quando só eles cobriram | UOL, CNN, G1 |
| **6** | Secundários (evitar) | Só como pointer | Jusbrasil, blogs, Wikipedia |

**Regra de ouro:** sempre cruzar mínimo 3 fontes por claim crítico. Se Tier 1 existe, é obrigatório. Se não existe, Tier 2 + Tier 3 + Tier 4 (triangulação).

---

## 3. Protocolo em 8 fases (executável)

### Fase 1 — Pre-Research Briefing
**Quem:** Main (Vinicius briefa)
**Input:** escopo do post, público-alvo
**Output:** Research Brief (arquivo `docs/research/briefings/<slug>.md`) com:
- Título hipótese
- Claims centrais (2-4)
- YMYL tier (fiscal, financeiro, jurídico, geral)
- Fontes-alvo prioritárias
- Deadline

### Fase 2 — Source Gathering
**Quem:** Data Sources agent (dedicado) + Macro/Legal/Local agents
**Processo:** pra cada claim central, identificar 3+ fontes conforme hierarquia Tier. Acessar fontes primárias direto (API quando possível, WebFetch quando só HTML).
**Output:** Source Matrix (`docs/research/<slug>-sources.md`): claim | fonte | tier | URL | data consulta | valor.

### Fase 3 — Claim Extraction
**Quem:** Main (síntese)
**Processo:** extrair TODOS os claims factuais do outline/draft. Classificar:
- Numérico (ex: "alíquota 2,7%")
- Data (ex: "desde 22/04/2026")
- Lei (ex: "LC 108/2017")
- Geográfico (ex: "Batel lidera m²")
- Opinativo (não passa por fact-check — exemplo: "vale a pena")

**Output:** Claims Ledger — lista numerada.

### Fase 4 — Cross-Validation
**Quem:** Data + Legal/Local agents (cross-check obrigatório entre eles)
**Processo:** pra cada claim numérico/data/lei, mínimo 3 fontes independentes.
- Se divergem: Tier maior vence, salvo quando Tier menor for mais recente. Flag explícito.
- Regra específica: número em H1/title **deve ter fonte primária linkada no 1º parágrafo**.

**Output:** Validated Claims Table.

### Fase 5 — Data Currency Audit
**Quem:** Data agent
**Processo:** pra cada número, identificar data de publicação da fonte:
- **Defasagem ≤ 3 meses:** OK
- **3-6 meses:** flag amarelo, acrescentar "em [mês/ano]" explícito
- **6-12 meses:** flag vermelho, refazer pesquisa se possível
- **> 12 meses:** refazer obrigatório

**Output:** Currency Report.

### Fase 6 — Writing Integration
**Quem:** Writer agent
**Processo:** cada claim escrito tem source traceable. PLACEHOLDERS pros números até cross-validation completar. Aplicar Manual Editorial + Research Standards.

### Fase 7 — Pre-Publish Verification
**Quem:** 🆕 **Verifier/Editor agent** (escopo estrito, só verifica não escreve)
**Processo:** checklist 30 itens (ver seção 7 abaixo) + leitura adversarial ("qual claim derrubaria o post?") + validação de links.
**Output:** Verification Sign-off (arquivo `docs/research/verifications/<slug>.md`).

### Fase 8 — Post-Publish Monitoring
**Quem:** Scheduled agent (trimestral)
**Processo:** review de dados (podem ter expirado), correções transparentes via `<Changelog>`, update de `updatedAt` e `nextReview` no frontmatter.

---

## 4. Time multi-agent — 7 membros (5 existentes + 2 novos)

Atuais:
1. **Data Validation Specialist** — valida números com 3+ fontes
2. **Macro/Domain Specialist** — contexto macro BR ou domínio específico (jurídico, fiscal, construção)
3. **Local Curitiba Specialist** — IPPUC, Prefeitura, dinâmica local
4. **Writer/Craft Specialist** — voz natural, referências Seu Dinheiro + JOTA + Nubank
5. **SEO/SERP Specialist** — top 10 SERP, PAA, featured snippet, keyword cluster

🆕 Novos:
6. **FYMOOB Data Research Agent** — consome API Loft + dados abertos Curitiba. Entrega dado exclusivo FYMOOB (yield por bairro n≥7, estoque, tempo médio). Ver spec em [`agent-specs/fymoob-data-research.md`](./agent-specs/fymoob-data-research.md).
7. **Verifier/Editor Agent** — SÓ verifica, não escreve. Roda Fase 7. Elimina SPoF da síntese do main. Ver spec em [`agent-specs/verifier-editor.md`](./agent-specs/verifier-editor.md).

**Regra de ordenação:** Data + FYMOOB Data rodam primeiro; Writer roda depois (com PLACEHOLDERS); Verifier roda por último. Outros em paralelo.

---

## 5. Componentes MDX obrigatórios

### `<MethodologyBox>` — em todo pilar/ranking
Template:
```jsx
<MethodologyBox
  period="Abril/2026"
  sample="FipeZap (35 bairros CWB) + Loft CRM (N imóveis FYMOOB ativos)"
  treatment="Média ponderada por m². Bairros com n<7 sinalizados como indicativos."
  sources={["FipeZap", "Quinto Andar Index", "Secovi-PR", "Loft CRM FYMOOB"]}
  lastUpdate="2026-04-24"
  nextReview="2026-07-24"
/>
```

### `<Changelog>` — quando houver correções ou atualizações
Template:
```jsx
<Changelog entries={[
  { date: "2026-04-24", change: "Publicação inicial. Dados de Abril/2026." },
  { date: "2026-05-15", change: "Correção: Ahú +12,5% (era +9,5% por fonte desatualizada FipeZap Fev/2026)." },
]} />
```

### `<AuthorCard>` — já existe (Bruno CRECI J 9420). Expandir pra schema Person + link pra `/autores/bruno-cesar-almeida`.

### Frontmatter expandido:
```yaml
methodology:
  period: "Abril/2026"
  sample: "..."
  sources: [...]
nextReview: "2026-07-24"
reviewedBy: "Verifier Agent v1.0"
changelog:
  - date: "2026-04-24"
    change: "Publicação inicial"
```

---

## 6. Scripts de dados exclusivos FYMOOB

Pra implementação e uso. Ordem por ROI:

| # | Script | Função | ROI | Status |
|---|---|---|---|---|
| 1 | `scripts/research/calculate-yield-by-bairro.mjs` | Yield real por bairro a partir de aluguel + venda Loft. Sample size declarado. | ⭐⭐⭐⭐⭐ | Implementar dia 1 |
| 2 | `scripts/research/extract-stock-by-bairro.mjs` | Estoque FYMOOB ativo por bairro. "FYMOOB tem N imóveis ativos no Batel" | ⭐⭐⭐⭐ | Dia 2 |
| 3 | `scripts/research/snapshot-crm-daily.mjs` + GitHub Action cron | Snapshot diário Loft. Dia zero do histórico. | ⭐⭐⭐⭐⭐ (começar HOJE) | Crítico |
| 4 | `scripts/research/consolidate-curitiba-open-data.mjs` | IPPUC + SESP + Finanças CWB → dataset consolidado | ⭐⭐⭐ | Semana 2 |
| 5 | `scripts/research/calculate-tempo-medio-venda.mjs` | Depois de 60d de snapshots | ⭐⭐⭐ | Após 60d |

---

## 7. Checklist Pre-Publish (30 itens) — roda pelo Verifier Agent

### Fontes (10)
- [ ] Toda afirmação numérica tem fonte linkada
- [ ] Todo número em H1/title tem fonte primária linkada no 1º parágrafo
- [ ] Cross-check: ≥3 fontes por claim crítico
- [ ] Fontes primárias (Tier 1) usadas onde existem
- [ ] Agregadores (Tier 4-6) usados só como referência operacional, não como única fonte
- [ ] Links profundos (não home genérica)
- [ ] Links externos são `rel="noopener noreferrer"` onde preciso
- [ ] Data de consulta registrada em source matrix
- [ ] Nenhuma fonte Tier 6 como única base
- [ ] Jurisprudência citada por tribunal oficial (não só Jusbrasil)

### Dados (8)
- [ ] Todo número tem mês/ano visível na prosa
- [ ] Nenhum número com defasagem > 12 meses
- [ ] Números de H1/title têm defasagem ≤ 3 meses
- [ ] Amostra declarada quando aplicável ("medido em N imóveis")
- [ ] Simulações têm parâmetros explícitos (SAC/Price, prazo, entrada)
- [ ] Unidade sempre explícita (R$/mês, a.a., %12m)
- [ ] Grandeza correta (R$ com separadores BR)
- [ ] Totais batem (se tabela, soma)

### Metodologia (5)
- [ ] `<MethodologyBox>` presente em pilar/ranking
- [ ] Período de análise declarado
- [ ] Fontes listadas no box
- [ ] Limitações conhecidas declaradas
- [ ] `nextReview` no frontmatter (trimestral pra finanças, anual pra legal)

### Editorial (5)
- [ ] Lide segue Manual Editorial (Number Drop ou Contradição, 2-4 frases)
- [ ] Título ≤55 chars, keyword front
- [ ] H2s são perguntas ou afirmações, nunca rótulos
- [ ] FAQ com 5 PAA reais do Google
- [ ] Closing com régua acionável (não "consulte especialista")

### Leitura adversarial (2)
- [ ] "Qual claim derrubaria o post se estiver errado?" — identificado + validado 3x
- [ ] "Competidor X leu isso, o que ele questiona?" — identificado + respondido

---

## 8. Política de correções transparentes

Quando erro é descoberto pós-publicação:

**Correção Tier A (dado factual errado que muda decisão do leitor)**
- Publicar `<Changelog>` visível no topo do post com "Corrigido em [data]: [o que mudou]"
- Atualizar `updatedAt` + push imediato
- Tag "Corrigido" por 7 dias na home
- Nunca editar silenciosamente

**Correção Tier B (imprecisão sem impacto material)**
- `<Changelog>` discreto no rodapé
- `updatedAt` atualizado

**Correção Tier C (typo, link quebrado)**
- Fix silencioso OK

---

## 9. Manual Editorial — Research Standards addendum

Ver upgrade completo em [`editorial-research-standards.md`](./editorial-research-standards.md). Principais adições ao Manual Editorial existente:

- **Attribution standards:** in-line sempre. Link embed no meio da frase. Nunca "clique aqui".
- **Uncertainty signals:** como dizer "não sei" mantendo autoridade. "Dado indicativo", "faixa observada em N casos".
- **Methodology disclosure:** `<MethodologyBox>` padrão.
- **Update protocol:** `<Changelog>` + `updatedAt` + `nextReview`.
- **Author expertise display:** CRECI + página `/autores/[slug]` + schema Person.
- **Data currency:** mês/ano sempre visível.
- **Confidence levels:** quando dado tem limitação (ex: n<7 amostra), sinalizar.

---

## 10. Roadmap de implementação

| Quando | Entregas |
|---|---|
| **24/04 (hoje)** | Documentação consolidada; scripts snapshot-crm-daily + yield + stock; GitHub Action cron 03:00 BRT; componentes `<MethodologyBox>`, `<Changelog>`; allow-list 12 domínios; agent specs Verifier/Editor e FYMOOB Data Research; Manual Editorial upgrade; página `/autores/bruno-cesar-almeida` |
| **25/04** | Aplicar protocolo no 1º post novo (usa time 7 agents) |
| **Semana 2 (28/04-04/05)** | Re-aplicar protocolo nos 5 posts já reescritos (MCMV, financiamento, mercado, ITBI, preço m²): MethodologyBox, Changelog inicial, fontes primárias no 1º parágrafo, dados Loft integrados onde couber. |
| **Semana 3-6 (05-31/05)** | 10 posts pendentes reescritos com protocolo completo |
| **Mês 3 (jul/2026)** | 90d de snapshot → script valorização real + tempo médio venda → rigor 9/10 atingido |

---

## 11. Critérios de sucesso

**30 dias:**
- 100% dos posts reescritos têm `<MethodologyBox>`, `<Changelog>`, fontes primárias no 1º parágrafo
- 100% passam checklist 30 itens do Verifier
- 3+ posts com dado exclusivo FYMOOB ("yield medido em N imóveis")

**90 dias:**
- Tráfego GSC +30% em keywords de autoridade
- Featured snippets capturados (candidatos: "existe bolha em CWB", "pegadinha ITBI", "preço m² CWB")

**180 dias:**
- FYMOOB citada por Google AI Overview em query Curitiba
- Dados FYMOOB únicos = impossível replicar = moat permanente

---

## 12. Infraestrutura necessária (dia 1)

- [x] Allow-list 48 domínios (Curitiba gov + APIs + imprensa econômica) → `settings.local.json`
- [x] Scripts de research → `scripts/research/`
- [x] GitHub Action cron 03:00 BRT → `.github/workflows/crm-snapshot.yml`
- [x] Componentes MDX → `src/lib/mdx-components.tsx`
- [x] Página `/autores/[slug]` → `src/app/autores/[slug]/page.tsx`
- [x] Primeiro snapshot CRM (dia zero do histórico) → `docs/research/snapshots/2026-04-24.json` (242 imóveis, 66 bairros)

### Ferramentas SEO — custo zero

Usamos ferramentas gratuitas pra SEO research, sem precisar de DataForSEO pago:

- **Google Search Console (MCP `gsc` já instalado)** — dados REAIS do nosso site (posição, CTR, impressões, queries) — fonte primária autoritativa, Google direto
- **WebSearch** — ver SERP real em tempo real
- **Google Suggest + Related Searches** — keyword discovery manual
- **PAA (People Also Ask)** — consulta direta no Google + WebFetch

DataForSEO (pago) ficaria útil apenas pra SEO programático em escala (milhares de URLs). Pra 15 posts de blog, overkill.

---

## 13. Referências

Outputs dos 5 agents especializados que informaram este protocolo:
- [Tech Feasibility](./research-protocol-tech-feasibility.md)
- [Data Sources Map](./data-sources-map.md)
- [Fact-Checking Protocol](./fact-checking-protocol.md)
- [FYMOOB Unique Data Advantage](./fymoob-unique-data-advantage.md)
- [Editorial Research Standards](./editorial-research-standards.md)

Memória user:
- [`feedback_article_rewrite_methodology.md`](memory) — metodologia multi-agent
- [`feedback_research_protocol.md`](memory) — este protocolo (criado 24/04/2026)
