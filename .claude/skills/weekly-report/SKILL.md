# Skill: Weekly Report — Analytics Intelligence FYMOOB

## Trigger
Quando o usuario executar `/weekly-report` ou pedir relatorio semanal de
analytics/SEO.

## Contexto
FYMOOB Imobiliaria (fymoob.com.br) — relatorio semanal automatico
analisando GSC + GA4 + auditoria SEO. Substitui analise manual.

**Dados Tier-0 (ground truth):**
- GSC Search Analytics API — dados proprios FYMOOB
- GA4 Analytics Data API — eventos `whatsapp_click` + `generate_lead` + `property_contact_click`
- Audit interno (`page-audit-all.json`) — gerado por `seo-gaps-audit.py`

**Stack do skill:**
- Orchestrator: voce (Claude rodando este skill)
- 4 workers especialistas via Task tool em PARALELO
- 1 verifier mecanico (executa antes de commitar)
- Citation stamp via `scripts/intel/citation-stamp.mjs` (deterministico)
- Output: markdown commitado em `docs/seo/reports/YYYY-WWW.md`

**Pattern Anthropic:** Orchestrator-Worker + Generator-Verifier
([Multi-Agent Research System](https://www.anthropic.com/engineering/multi-agent-research-system)).

## Princ ipios obrigatorios

1. **Evidence-first**: scripts deterministicos puxam dados, voce raciocina sobre JSON
2. **Tiered sources**: Tier-0 (GSC/GA4/audit FYMOOB) > Tier-2 (compiladores) > NUNCA inferencia solta
3. **Cite-as-you-go**: cada numero tem `{{cite:src.path}}` no markdown
4. **Refuse-to-answer**: se Tier-0 falta, declarar explicitamente — nao inventar
5. **Verifier separado**: 1 worker afirma, verificacao mecanica via citation-stamp valida
6. **Token budget**: <$5/run hard cap

## Instrucoes (passo a passo, executar em ordem)

### Etapa 1 — Coletar evidencias (deterministico, ZERO LLM)

Rodar os 3 scripts de evidence collection. Output JSON salvo em `tmp/intel/`:

```bash
# Determinar week ISO atual (formato YYYY-WW)
WEEK=$(node -e "const d=new Date();const t=new Date(d);const dn=(d.getUTCDay()+6)%7;t.setUTCDate(t.getUTCDate()-dn+3);const ft=t.valueOf();t.setUTCMonth(0,1);if(t.getUTCDay()!==4){t.setUTCMonth(0,1+((4-t.getUTCDay())+7)%7)}console.log(\`\${new Date(ft).getUTCFullYear()}-W\${String(1+Math.ceil((ft-t)/604800000)).padStart(2,'0')}\`)")

mkdir -p tmp/intel docs/seo/reports

node scripts/intel/gsc-pull.mjs --output tmp/intel/gsc-$WEEK.json
node scripts/intel/ga4-pull.mjs --output tmp/intel/ga4-$WEEK.json
node scripts/intel/audit-snapshot.mjs --output tmp/intel/audit-$WEEK.json
```

Se algum script falhar (ex: GA4 sem service account configurado), USE
`--mock` apenas no GA4 e DECLARAR no relatorio que GA4 esta com mock data.
NAO continuar sem GSC + audit reais.

### Etapa 2 — Spawn 4 workers em PARALELO

Use **Task tool** com 4 invocacoes simultaneas (mensagem unica com 4 calls).
Cada worker recebe escopo bem definido + JSONs como contexto + formato de
output esperado. NAO permitir que worker invente — exigir referencias a
paths nos JSONs.

#### Worker 1 — GSC Trends Analyst

**Subagent type:** general-purpose
**Modelo:** Sonnet (default)

**Prompt:**
> Voce e analista de SEO especializado em Google Search Console. Receba o
> JSON `tmp/intel/gsc-$WEEK.json` e produza analise focada em mudancas
> week-over-week.
>
> **Suas tarefas (faca uma de cada vez, mostrando reasoning):**
> 1. Ler summary.deltas — clicks/impressoes/CTR/posicao mudaram quanto?
>    Reportar com sinal (+/-) e magnitude.
> 2. Identificar bigMovers.up — top 5 queries que SUBIRAM de posicao.
>    Mostrar query + posicao antes/depois.
> 3. Identificar bigMovers.down — top 5 queries que CAIRAM. Idem.
> 4. Listar opportunities.lowCtrTopRanked — queries pos<10 com CTR<1%.
>    Indicar prioridade (mais impressoes = mais prioritario).
>
> **Formato output (markdown estrito, com placeholders de citacao):**
> ```
> ## GSC — Movimento da semana
>
> Cliques: +{{cite:gsc.summary.deltas.clicks}} vs semana anterior
> ...
> ```
>
> **Regras anti-hallucination:**
> - TODO numero PRECISA vir de `{{cite:gsc.<path>}}` — nao escreva numero
>   solto. Se o JSON nao tem o dado, escreva "N/D" e siga.
> - Listas devem citar query/page DO JSON literalmente — nao parafrasear.
> - Nao inventar interpretacao alem do que dado mostra.
>
> Output APENAS o markdown. Sem prefacios, sem "vou analisar".

#### Worker 2 — GA4 Funnels Analyst

**Subagent type:** general-purpose
**Modelo:** Sonnet (default)

**Prompt:**
> Voce e analista de conversao GA4. Receba `tmp/intel/ga4-$WEEK.json` e
> produza analise de eventos de conversao.
>
> **Tarefas:**
> 1. Reportar pageviews.deltas — sessoes/pageviews/users mudaram quanto?
> 2. Reportar conversions.whatsapp_click — total + delta vs semana anterior.
>    Listar bySource ranqueado (qual botao gera mais clique?).
> 3. Reportar conversions.generate_lead — total + delta. Listar byForm
>    ranqueado (qual form recebe mais lead?).
> 4. Reportar funnel — pageView -> whatsappClick -> generateLead. Calcular
>    taxa de cada etapa (ja vem calculada em funnels.ctaClickRate e
>    funnels.leadConversionRate).
> 5. Top 5 paginas que mais converteram (topConvertingPages).
>
> **Se GA4 estiver MOCK (meta.source contem "MOCK")**, comecar saida com:
> "⚠ DADOS GA4 SAO MOCK — service account nao configurado em prod. Numeros
> abaixo sao ilustrativos."
>
> **Formato output:**
> ```
> ## GA4 — Conversoes da semana
>
> WhatsApp clicks: {{cite:ga4.conversions.whatsapp_click.total}} (vs semana anterior: {{cite:ga4.conversions.whatsapp_click.delta}})
>
> ### Por origem do botao
> ...
> ```
>
> **Regras:** mesmas do Worker 1 — todo numero via `{{cite:ga4.<path>}}`.

#### Worker 3 — Cross-ref Analyst

**Subagent type:** general-purpose
**Modelo:** Sonnet (default)

**Prompt:**
> Voce e analista cross-fonte. Receba os 3 JSONs (`gsc-$WEEK.json`,
> `ga4-$WEEK.json`, `audit-$WEEK.json`) e identifique correlacoes que
> nenhum dado isolado revela.
>
> **Tarefas (cada uma e um insight separado se aplicar):**
> 1. **Pagina com tracking de conversao mas sem trafego organico:**
>    Cruzar `topConvertingPages` (GA4) com `topPages` (GSC). Pagina que
>    converte mas nao recebe impressoes = oportunidade de SEO.
> 2. **Pagina top-rankeada sem conversao:** Cruzar `topPages` GSC (cliques
>    altos) com `topConvertingPages` GA4 (ausencia). Trafego mas sem CTAs
>    funcionando.
> 3. **Pagina com problema de auditoria E impressoes altas:** Cruzar
>    `criticalIssues` (audit) com `topPages` (GSC). Paginas com >2 problemas
>    seo + mais de 100 impressoes = correcao prioritaria.
> 4. **Query rankeando mal numa pagina otimizada:** queries opportunities
>    (pos<10 CTR<1%) cuja URL aparece em criticalIssues do audit.
>
> **Formato output:**
> ```
> ## Cross-ref — Insights de correlacao
>
> ### 1. Paginas que convertem mas nao rankeiam
> ...
> ```
>
> **Regras:** so mencionar correlacao se for **direta no JSON**. Nao
> inferir. Se cruzamento nao gera resultado, omitir secao.

#### Worker 4 — Action Prioritizer

**Subagent type:** general-purpose
**Modelo:** Sonnet (default)

**Prompt:**
> Voce e o priorizador de acoes. Receba os outputs dos workers 1-3 (GSC,
> GA4, Cross-ref) E os 3 JSONs originais. Produza lista priorizada de
> acoes acionaveis pra Bruno (proprietario FYMOOB).
>
> **Framework Finding | Evidence | Impact | Fix | Confidence:**
> Cada acao TEM que ter os 5 campos:
> - **Finding**: o que esta acontecendo (1 frase)
> - **Evidence**: dado especifico do JSON com `{{cite:...}}`
> - **Impact**: cliques/leads que ganha ou perde estimado
> - **Fix**: acao concreta (1-3 passos)
> - **Confidence**: confirmed (dado fala por si) | likely (correlacao
>   forte) | hypothesis (correlacao fraca, validar antes)
>
> **Tarefas:**
> 1. Combinar findings dos 3 workers em ate 8 acoes
> 2. Ranquear por (Impact * Confidence) / Effort (estimativa qualitativa)
> 3. Emitir tabela markdown: `| # | Finding | Impact | Confidence | Fix |`
> 4. Detalhar cada acao em paragrafo com Evidence inline
>
> **Regras anti-hallucination:**
> - Nao prometer numeros sem dado. "Pode aumentar 5% CTR" = HIPOTESE,
>   marcar `confidence:hypothesis`.
> - Se nao tem dado pra Impact concreto, escreva "Estimar pos-fix" e marcar
>   confidence:hypothesis.
> - Refuse-to-answer: se nenhuma acao tem Tier-0 source, declarar
>   "Nada acionavel essa semana — dados insuficientes".

### Etapa 3 — Compor draft markdown

Receber os 4 outputs dos workers e compor um markdown consolidado:

```markdown
# Relatorio Semanal — FYMOOB · Semana {WEEK}

**Periodo analisado:** {{cite:gsc.meta.period.start}} → {{cite:gsc.meta.period.end}}
**Comparado com:** {{cite:gsc.meta.comparePeriod.start}} → {{cite:gsc.meta.comparePeriod.end}}
**Gerado em:** {timestamp ISO}

## Sumario executivo

[2-3 frases destacando o que mais importa, com {{cite:...}}]

---

[Worker 1 output — GSC Trends]

---

[Worker 2 output — GA4 Funnels]

---

[Worker 3 output — Cross-ref Insights]

---

[Worker 4 output — Action Prioritizer]
```

Salvar em `docs/seo/reports/$WEEK.draft.md`.

### Etapa 4 — Verifier + Citation Stamp (deterministico)

Rodar via Bash:

```bash
node scripts/intel/citation-stamp.mjs \
  --input docs/seo/reports/$WEEK.draft.md \
  --gsc tmp/intel/gsc-$WEEK.json \
  --ga4 tmp/intel/ga4-$WEEK.json \
  --audit tmp/intel/audit-$WEEK.json \
  --output docs/seo/reports/$WEEK.md
```

**Se citation-stamp retornar exit code 2** (warnings de citacao), LER os
erros no fim do markdown gerado e voltar pra Etapa 2 — algum worker citou
path inexistente. Corrigir o draft e re-rodar.

**Se exit 0**, draft.md pode ser deletado (citation-stamp gerou .md final).

### Etapa 5 — Validar saida + apresentar ao usuario

Antes de declarar concluido:
1. Ler `docs/seo/reports/$WEEK.md` final
2. Confirmar tem secao **Fontes** com numeros estampados
3. Confirmar tem secao **Metadados das fontes** com timestamps
4. Confirmar nenhum `[src.path ✗]` (erro de citacao) sobrou no body
5. Apresentar ao usuario o caminho do report + sumario das 3 acoes top

### Etapa 6 — Cleanup

```bash
# Manter os JSONs de evidencia em tmp/intel/ por 4 semanas (audit trail)
# Sao gitignored (ver .gitignore)
# Apenas remover o .draft.md
rm -f docs/seo/reports/$WEEK.draft.md
```

## Anti-padroes a evitar

| ❌ Errado | ✅ Certo |
|---|---|
| "CTR melhorou bastante essa semana" | "CTR +0,4pp ({{cite:gsc.summary.deltas.ctr\|confidence:confirmed}})" |
| Inventar numeros pra parecer concreto | "Sem dado disponivel" + sugerir como obter |
| Worker 4 prometer "+50% conversoes" sem dado | "Estimar pos-fix (confidence:hypothesis)" |
| Spawn workers em serie | Spawn 4 workers em paralelo (1 mensagem, 4 Task calls) |
| Pular Etapa 4 e commitar draft direto | Sempre passar por citation-stamp.mjs |
| Aceitar GA4 mock e nao avisar | Declarar "DADOS GA4 SAO MOCK" no topo |

## Custo estimado por run

- 4 Workers Sonnet (~5K input + 2K output cada) ≈ $0,18
- Lead orchestrator (this) ≈ $0,08
- **Total: ~$0,30/run** (~$1,20/mes pra weekly)
- Tempo wall-clock estimado: 4-7 minutos
- Hard cap: $5/run, 10min — abortar se exceder

## Promote pra GitHub Actions cron (Sprint 2 — futuro)

Quando este skill estiver estavel (4-6 runs validados):

1. Migrar logica do skill pra script Node `scripts/intel/run-weekly-report.mjs`
2. Que usa Anthropic SDK direto (sem skill engine)
3. Workflow `.github/workflows/weekly-report.yml` cron `0 6 * * 1`
4. Commita o report direto no repo via GH Actions

Por enquanto, **rodar manualmente** invocando este skill semanalmente.
