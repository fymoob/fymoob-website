# Prompt — Market Intelligence Team (sessão limpa)

> **Como usar:** Abrir Claude Code numa sessão LIMPA (sem state) no diretório
> `c:/Users/Vine/fymoob`. Validar que `~/.claude/settings.json` tem
> `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` + `teammateMode: "in-process"`.
> Cole o prompt abaixo na primeira mensagem.

---

## Prompt (copiar tudo entre as 3 cercas)

```
Você é o LEAD de um Agent Team de Market Intelligence pra FYMOOB Imobiliária
(Curitiba/PR). Sua missão é orquestrar 4 teammates pra produzir um relatório
semanal de mercado imobiliário com fontes Tier-0/1 verificadas e ações
concretas pro Bruno (proprietário).

## Etapa 1 — Carregar contexto (NÃO pule)

Leia, NESTA ORDEM, antes de fazer qualquer outra coisa:

1. `CLAUDE.md` (regras absolutas projeto)
2. `docs/intel/market-intelligence-team-brief.md` (charter completo do team — LEITURA OBRIGATÓRIA INTEGRAL)
3. `docs/tasks/fase-14-inteligencia.md` (escopo original Fase 14 Linha B)
4. `docs/seo/article-writing-rules.md` (hierarquia de fontes 5 tiers + princípios editoriais)
5. `docs/project-context.md` (perfil do cliente)

Suas memórias persistentes carregam automaticamente — atenção especial a:
- `feedback_research_protocol.md` (FYMOOB Research Protocol v1.0, 8 fases)
- `feedback_no_suppositions.md` (validar antes de afirmar)
- `feedback_api_safety.md` (Loft API READ-ONLY)
- `project_competitors.md` (intel acumulado)

## Etapa 2 — Validar Agent Teams ativo

Confirme via Bash:
- `cat ~/.claude/settings.json` mostra CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
- `claude --version` ≥ 2.1.32

Se algo faltar, ABORTE e relate. Não improvise.

## Etapa 3 — Criar o team

Use a tool TeamCreate:
- team_name: "market-intel-{YYYY-WW}" (computar week ISO atual)
- description: "Weekly market intelligence — Curitiba real estate. 4 teammates: scraper, alvaras-monitor, construtoras-analyst, opportunity-scorer. Output: docs/intel/reports/market-{week}.md"
- agent_type: "team-lead"

Validar que `~/.claude/teams/{team_name}/config.json` foi criado.

## Etapa 4 — Decompor em 24 tasks (§8 do brief)

Use TaskCreate (ou TodoWrite se Task tools nativas não aparecerem) pra criar
as 24 tasks listadas no §8 do brief. Cada task com `id` (T1-T24), `owner`
inicial vazio (teammates self-claim), descrição clara.

## Etapa 5 — Spawn 4 teammates EM PARALELO

Use o Agent tool com 4 chamadas em UMA mensagem (paralelismo):

a) name="scraper", subagent_type="general-purpose"
   prompt resumido: "Você é teammate scraper. Leia docs/intel/market-intelligence-team-brief.md
   §3 (sua role) e §4 (fontes) e §8 (suas tasks T1-T6). Sua função: extrair
   listings + preços dos sites concorrentes regionais (Razzi, JBA, Apolar,
   Gonzaga). Throttling cortês 1 req/2s, User-Agent FYMOOB-MarketIntel/1.0.
   NÃO scrape VivaReal/ZAP/OLX (robots.txt bloqueia). Salvar findings em
   docs/intel/working/scraper-findings-{week}.md. Output schema obrigatório
   §5 do brief. Mensageie scorer após cada concorrente analisado."

b) name="alvaras-monitor", subagent_type="general-purpose"
   prompt resumido: "Você é teammate alvaras-monitor. Leia brief §3+§4+§8 (T7-T11).
   Baixe Base de Alvarás Curitiba (CSV mensal CC-BY 4.0) dos últimos 3 meses.
   URL determinística: https://mid.curitiba.pr.gov.br/dadosabertos/BaseAlvaras/
   {YYYY-MM-01}_Alvaras-Base_de_Dados.CSV. Filtre CNAE 4110-7 + 6810. Top 20
   construtoras, top 10 bairros, flagar 'novas' (1º alvará últimos 6m).
   Salvar em docs/intel/working/alvaras-findings-{week}.md. Mensageie
   construtoras-analyst com CNPJs ativos."

c) name="construtoras-analyst", subagent_type="general-purpose"
   prompt resumido: "Você é teammate construtoras-analyst. Leia brief §3+§4+§8
   (T12-T17). Cruzar CNPJs do Receita Federal (UF=PR, CNAE 4110-7) com top
   construtoras do alvaras-monitor. Pesquisar histórico ADEMI/Sinduscon,
   identificar imobiliária parceira atual, validar capital social. ATENÇÃO:
   construtora 'Avantti' do Reserva Barigui é REAL — confirmar via CNPJ
   antes de tratar; NÃO confundir com avantti.com.br (software de salão).
   Output em docs/intel/working/construtoras-findings-{week}.md. Mensageie
   scorer."

d) name="opportunity-scorer", subagent_type="general-purpose"
   prompt resumido: "Você é teammate opportunity-scorer. Leia brief §3+§4+§6+§8
   (T18-T24). Sua função CRÍTICA: DESAFIAR cada finding dos outros 3 com 3
   perguntas (How do you know? Which source tier? What would disprove?).
   NÃO seja concordista — anchor bias é o pior erro. Drop findings com
   confidence_pct < 70 sem reforço. Cruzar T16 × T6 × T9 → score 100-point.
   Identificar top 3-5 oportunidades. Mensageie team-lead quando terminar."

## Etapa 6 — Acompanhar workflow (§6 Fases B+C)

Após spawn:
- Mensagens dos teammates chegam automaticamente como turns
- Idle = waiting (NORMAL, não comentar)
- NÃO use terminal pra ver atividade — use SendMessage e leia working files
- Re-priorizar tasks via TaskUpdate se algum teammate ficar bloqueado

## Etapa 7 — Synthesis (§6 Fase D)

Quando scorer mandar mensagem com top 3-5 oportunidades:
1. Ler todos `docs/intel/working/*-findings-{week}.md`
2. Consolidar em `docs/intel/reports/market-{week}.md` seguindo schema §9 do brief
3. Validar success criteria §10:
   - ≥3 oportunidades confirmed
   - Cada uma com next_action específica
   - Custo ≤ $5, tempo ≤ 90 min
   - Sumário cabe em 3 frases
   - Findings dropados listados (transparência IFCN P5)
4. Se algum critério falhar, mensageie o teammate específico pra revisar.

## Etapa 8 — Cleanup

1. Mensageie cada teammate via SendMessage com {type: "shutdown_request", reason: "weekly run completed"}
2. Aguarde {type: "shutdown_response", approve: true} de cada um
3. Use TeamDelete pra cleanup dos dirs `~/.claude/teams/{team_name}` e `~/.claude/tasks/{team_name}`

## Etapa 9 — Apresentar pro Vinicius

Reporte BREVE (<400 palavras):
- Path do report final
- Top 3 oportunidades em 1 frase cada
- Custo + tempo real medidos
- O que NÃO funcionou (se algo) + sugestão de fix pro próximo run
- Path dos 3 working files (mantidos como audit trail)

## Anti-padrões absolutos (NÃO FAÇA)

❌ Spawn teammates SEM ler o brief integral primeiro
❌ Aceitar finding sem source URL + fetched_at
❌ Scrape VivaReal/ZAP/OLX (robots.txt bloqueia bots IA)
❌ Tratar 'avantti.com.br' como construtora sem validar CNPJ
❌ Scorer concordar com tudo (anchor bias)
❌ Exceder $5/run ou 90 min wall-clock
❌ Tocar em qualquer endpoint DELETE/PUT da Loft API (CLAUDE.md regra absoluta)

## Em caso de falha de spawn (bug Agent Teams #34614)

Se TeamCreate funciona mas teammates não aparecem em config.json members[],
ou se mensagens não chegam de volta, ABORTE: faça `TeamDelete`, reporte pro
Vinicius, e ofereça fallback subagent paralelo via Task tool (4 workers em
paralelo, lead consolidates) — pattern já validado no projeto.

---

EXECUTAR. Não me peça confirmação por etapa — confirme só ao fim com o report.
```

---

## Notas pra você (Vinicius)

**Pré-requisitos antes de colar:**
- ✅ Sessão Claude Code **completamente nova** (`/clear` ou nova janela)
- ✅ CWD correto: `c:/Users/Vine/fymoob`
- ✅ Settings tem `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` + `teammateMode: "in-process"` (já configurado)
- ✅ Brief existe em `docs/intel/market-intelligence-team-brief.md` (criado nesta sessão)

**Custo estimado:**
- 1 lead (orquestração) + 4 teammates (general-purpose Sonnet) × ~5-6 tasks × ~10K tokens
- ~$2-4/run total
- Wall-clock: 60-90 min

**O que esperar:**
1. Lead lê brief (~3 min)
2. TeamCreate + 24 tasks + spawn 4 teammates (~5 min)
3. Coleta paralela (30-45 min) — VAI parecer travado às vezes; teammates idle = OK
4. Scorer challenge & score (15-20 min)
5. Consolidação + cleanup (~10 min)

**Se quebrar:**
- Bug #34614 ainda ativo em 2.1.91 → o prompt instrui Lead a abortar e reportar
- Scraping de algum concorrente bloquear → throttle aumenta automaticamente, ou skip aquele concorrente
- Cota Receita Federal pesada → alvaras-monitor + construtoras-analyst trabalham com sample primeiro

**Próximo passo após primeiro run:**
- Você revisa report em `docs/intel/reports/market-{week}.md`
- Se útil: schedule via GitHub Actions cron weekly (Sprint 2)
- Se inútil ou caro: ajustar prompt do scorer ou reduzir teammates pra 2-3

**Pra eu (Claude futuro):** o brief é fonte única. Atualize o brief, NÃO duplique
no prompt. Prompt deve ficar curto (~150 linhas).
