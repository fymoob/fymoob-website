# Agent Teams — Setup e Best Practices (FYMOOB)

> Feature experimental do Claude Code. Ativada em 04/05/2026. Doc oficial:
> [code.claude.com/docs/en/agent-teams](https://code.claude.com/docs/en/agent-teams).
> Setup confirmado funcionando em runtime sem restart.

## O que e Agent Teams (vs Subagents)

| Caracteristica | Subagent (Task tool, padrao) | Agent Teams (experimental) |
|---|---|---|
| Sessao | Roda DENTRO da sessao do lead | Sessao Claude Code SEPARADA por teammate |
| Comunicacao | Reporta back ao lead apenas | Mailbox direto: teammates falam entre si via `SendMessage` |
| Coordenacao | Lead orquestra tudo | Task list compartilhada com self-claim |
| State | Efemero (vive na sessao) | Persiste em `~/.claude/teams/{nome}/` + `~/.claude/tasks/{nome}/` |
| Custo tokens | ~4x chat | "Significativamente maior" — escala linear com N teammates |
| Navegacao | N/A — tudo na mesma janela | `Shift+Down` cicla teammates · `Enter` entra · `Esc` interrompe · `Ctrl+T` toggle task list |
| Resume/Rewind | ✅ funciona | ❌ NAO funciona com in-process teammates |
| Best for | Tasks focadas, paralelizaveis, sem necessidade de colaboracao entre workers | Trabalho longo, paralelo, com colaboracao genuina (debate, peer review, handoff) |

## Status no FYMOOB (04/05/2026)

✅ **Ativado em `~/.claude/settings.json`:**
```json
{
  "env": {
    "PYTHONUNBUFFERED": "1",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  },
  "teammateMode": "in-process",
  ...
}
```

✅ **Versao Claude Code:** 2.1.91 (>= 2.1.32 minimo)
✅ **Plataforma:** Windows 10 — `in-process` mode obrigatorio (split-panes/tmux/iTerm2 sao macOS-only)
✅ **Tools nativas em runtime:** `TeamCreate`, `SendMessage`, `TeamDelete` (carregadas via ToolSearch)
✅ **State dirs:** `~/.claude/teams/` existe, `~/.claude/tasks/` sera criado on-demand pelo TeamCreate

## Tools nativas

### `TeamCreate`
Cria team + task list dirs.
```json
{
  "team_name": "intel-weekly",
  "description": "Weekly SEO + GA4 analysis report",
  "agent_type": "researcher"
}
```

Cria:
- `~/.claude/teams/intel-weekly/config.json` (lista membros)
- `~/.claude/tasks/intel-weekly/` (task list compartilhada)

### `SendMessage`
Mensagem peer-to-peer entre teammates (ou lead → teammate).
```json
{
  "to": "gsc-analyst",
  "summary": "Start GSC analysis",
  "message": "Pull tmp/intel/gsc-2026-W19.json e analise deltas"
}
```

**REGRAS CRITICAS:**
- Sempre `to` por **nome** (nunca agentId/UUID)
- Mensagens sao auto-delivered como turns (nao precisa checar inbox)
- NAO enviar JSON estruturado tipo `{"type":"task_completed",...}` — usar `TaskUpdate` pra status
- NAO quote a mensagem original ao reportar — sistema renderiza pro user

### `TeamDelete`
Cleanup quando team termina. **Falha se ainda tem teammates ativos** — shutdown via `SendMessage {type: "shutdown_request"}` antes.

### Task tools (TaskCreate, TaskList, TaskUpdate)
Aparecem em runtime apos TeamCreate. Compartilhadas pelo team via `~/.claude/tasks/{team}/`. Padrao:
1. Lead cria tasks via `TaskCreate`
2. Teammates idle claim com `TaskUpdate` setando `owner`
3. Teammates marcam `completed` via `TaskUpdate`
4. Lead acompanha via `TaskList`

## Best Practices (consolidadas Anthropic + comunidade)

### Quando USAR Agent Teams (ROI positivo)

✅ **Tarefas longas com paralelismo genuino** (research multi-fonte, codebase refactor + tests + docs simultaneous, full-stack feature build)
✅ **Necessidade de colaboracao entre workers** (debate, peer review, handoff complexo)
✅ **Workers precisam de contexto independente** (cada um focando em um dominio sem distrair os outros)
✅ **State persistente** entre runs (resumir trabalho do dia anterior)

### Quando NAO USAR (subagent ja resolve, mais barato)

❌ **Tarefa focada/rapida** (single-shot research, 1 query, 1 fix)
❌ **Workers nao precisam conversar** (cada um faz a sua e reporta) — subagent paralelo via Task tool e suficiente
❌ **Budget apertado** — Agent Teams escala linear com N teammates, custo "significativamente maior"
❌ **Windows + necessidade de panes visuais** — limitado a in-process mode

### Sizing recomendado

| Item | Valor | Justificativa |
|---|---|---|
| Teammates | **3-5** | Sweet spot — paralelismo real sem coordination overhead |
| Tasks por teammate | 5-6 | Evita thrashing (constant context switching) |
| Max teammates | sem hard limit | Mas overhead cresce exponencialmente; >7 raramente vale |

### Choosing agent_type pra teammates

A doc oficial enfatiza match the agent to the work:

| agent_type | Tools | Use pra |
|---|---|---|
| `Explore` (read-only) | Glob, Grep, Read, WebSearch, WebFetch | Pesquisa codebase, leitura ampla |
| `Plan` (read-only) | Glob, Grep, Read, plus planning | Design de arquitetura, decomposicao |
| `general-purpose` (full) | Tudo (Edit, Write, Bash inclusos) | Implementacao de codigo |
| Custom em `.claude/agents/` | Definidos pelo arquivo | Roles especificos do projeto |

**Anti-padrao:** dar `Explore` pra teammate que precisa editar arquivo → bloqueio garantido.

### Comunicacao entre teammates

- **Sempre por nome** (lead → "researcher", "tester", "writer")
- **Plain text por default** — nao reinventar protocolo via JSON
- **Lead vê peer DMs** como summaries (visibilidade sem bloat)
- **Idle = waiting**, nao error. Nao comentar idleness sem motivo.

### Discoverability

Cada teammate pode ler `~/.claude/teams/{nome}/config.json` pra descobrir:
- Quem mais esta no team
- agentType de cada um (decidir pra quem mandar pergunta especifica)
- Names canonicos (pra usar em SendMessage)

### Shutdown gracioso

```json
// Lead manda pra cada teammate quando terminar
{
  "to": "gsc-analyst",
  "summary": "Work completed, shutting down",
  "message": {"type": "shutdown_request", "reason": "weekly run finished"}
}
```

Teammate responde:
```json
{
  "to": "team-lead",
  "message": {"type": "shutdown_response", "request_id": "...", "approve": true}
}
```

`approve: true` termina processo. Apos todos shut down → `TeamDelete` cleanup.

## Limitacoes conhecidas (importantes)

1. ❌ **`/resume` nao restaura in-process teammates** — work em progresso se perde se sessao quebrar
2. ❌ **Split-panes (tmux/iTerm2) so macOS** — Windows fica limitado a in-process
3. ❌ **1 team por sessao** — cleanup antes de spawnar nova
4. ❌ **Teammates nao podem spawnar teams proprios** (nao-nested)
5. ⚠️ **Bug history**: v2.1.76 tinha issue [#34614](https://github.com/anthropics/claude-code/issues/34614) onde teammates exitam silenciosamente. Status atual em 2.1.91: provavelmente fixado, validar primeiro uso.
6. ⚠️ **Task status pode atrasar** — marcar manualmente se travar
7. ❌ **Bedrock model ARN nao herda** ([#29660](https://github.com/anthropics/claude-code/issues/29660)) — irrelevante pra FYMOOB (usa Anthropic direto)

## Cenarios de uso pra FYMOOB

### Cenario 1 — Refatorar `weekly-report` skill pra Agent Teams real

**Status atual:** [`.claude/skills/weekly-report/SKILL.md`](../../.claude/skills/weekly-report/SKILL.md) usa Task tool (subagent paralelo).

**Quando refatorar pra Agent Teams:**
- Se workers precisarem **debater hipoteses** (ex: GSC trends discordando do GA4 funnel — qual fonte priorizar?)
- Se Action Prioritizer precisar **conversar com workers** pra refinar findings
- Se quisermos **state persistente** entre runs (lead consolidates context da semana anterior)

**Quando NAO refatorar:**
- Se 4 workers paralelos + sintese pelo lead resolve (sem conversa cruzada) → subagent atual e suficiente
- Custo: subagent ~$0,30/run vs Agent Teams ~$1-2/run estimado (3-4x mais)

**Recomendacao:** rodar subagent atual 4-6 vezes, medir qualidade. Se findings dos workers forem contraditorios sem resolucao, promover pra Agent Teams.

### Cenario 2 — Market Intelligence (Linha B futura)

Cenario natural pra Agent Teams:
- 1 lead orchestrator
- Teammate "concorrentes-scraper" (scrape Razzi/JBA/Apolar)
- Teammate "alvaras-monitor" (Prefeitura Curitiba)
- Teammate "construtoras-analyst" (CNPJ research)
- Teammate "opportunity-scorer" (debate com os 3 acima sobre oportunidades)

Aqui faz sentido — tasks longas, paralelas, com necessidade de colaboracao (scorer pergunta pro scraper, alvaras-monitor passa info pro construtoras-analyst).

### Cenario 3 — Code review multi-perspectiva

- Teammate "security-reviewer" (foco vulnerabilidades)
- Teammate "perf-reviewer" (foco bundle size, CWV)
- Teammate "ux-reviewer" (foco acessibilidade, mobile)

Lead consolidates findings + decide priority. Reviewers podem **debater** entre si (security vê issue que perf considera marginal — quem ganha?).

## Test rodado em 04/05/2026 — RESULTADO: SPAWN NAO FUNCIONA NO HARNESS ATUAL

Test executado:
1. ✅ `TeamCreate` cria `~/.claude/teams/agent-teams-test/config.json` + `~/.claude/tasks/agent-teams-test/` perfeitamente
2. ✅ `SendMessage` deposita JSON em `~/.claude/teams/{nome}/inboxes/{teammate}.json` — confirmado em filesystem
3. ✅ `TeamDelete` faz cleanup completo
4. ❌ **Spawn de teammates reais NAO funcionou** — Agent tool atual nao tem params `team_name` + `name` no schema
5. ❌ **Subagents spawnados ficaram orfaos** — SendMessage cria inbox file mas nenhuma session le

Reproducao exata:
- Chamei `Agent` tool (subagent_type Explore + general-purpose) achando que viraria teammate
- O config.json do team continuou listando **apenas** o team-lead em `members[]`
- Subagents executaram normalmente como subagents (efemero, single-shot), **nao como teammates persistentes**
- Mensagens enviadas via SendMessage foram persistidas em `inboxes/{nome}.json` mas nunca lidas (nao ha session "researcher" ou "reporter" rodando pra processar)

Schema do `Agent` tool capturado em runtime (versao deste harness):
```
Required: description, prompt
Optional: subagent_type, model, run_in_background, isolation
NAO HA: team_name, name
```

Mas a doc da `TeamCreate` afirma:
> "Spawn teammates using the Agent tool with `team_name` and `name` parameters"

Diagnostico provavel:
- **Bug ativo** [#34614](https://github.com/anthropics/claude-code/issues/34614) — teammates spawnam mas exitam silenciosamente. Consistent com o que observamos.
- OU implementacao parcial em 2.1.91 — tools de coordenacao expostas mas spawn ainda nao integrado no Agent tool
- OU requer plano Pro/Max/Team/Enterprise nao ativo (a feature listada como experimental, mas pode ter gating extra)

Custo do test: ~$0,15 (1 TeamCreate + 2 subagent calls + 1 SendMessage + cleanup).

## Recomendacao apos test (04/05/2026)

**MANTER subagent pattern (Task tool) no skill `weekly-report` e qualquer workflow novo.** Razoes:

1. ✅ Subagent funciona perfeitamente, custo conhecido (~$0,30/run)
2. ❌ Agent Teams spawn nao funciona neste harness/versao
3. ✅ Quando spawn funcionar, refatoracao e simples (trocar Agent por Agent com `team_name`+`name`)
4. ⚠️ Sem evidencia que beneficio justifica esperar — a vasta maioria dos workflows resolve com subagent paralelo

**Re-validar em ~30-60 dias** apos:
- Issue #34614 estiver fechado
- Claude Code release nota mencionar fix de Agent Teams spawn
- Schema do Agent tool exposer `team_name` + `name`

**Quando re-validar:** mesmo test acima — TeamCreate + 2 teammates + SendMessage + verificar `members[]` no config.json. Se members aparece com 3 entries (lead + 2), spawn funciona.

## Custo: Agent Teams vs subagent vs single agent

Estimativa por execucao da `weekly-report`:

| Modelo | Single agent | Subagent (4 workers) | Agent Teams (4 teammates) |
|---|---|---|---|
| Tokens | ~30k | ~120k (4x) | ~450k (15x) |
| Custo Sonnet | $0,07 | $0,28 | $1,05 |
| Wall-clock | 2-4min | 4-7min | 6-10min |
| Beneficio | unica perspectiva | paralelismo simples | paralelismo + colaboracao |

Para weekly run, subagent atual gasta ~$1,20/mes. Agent Teams gastaria ~$4,20/mes. Diferenca de ~$3/mes — minima, mas so vale se beneficio empirico justificar.

## Documentacao oficial

- [Anthropic — Agent Teams (oficial)](https://code.claude.com/docs/en/agent-teams)
- [Anthropic — Multi-Agent Research System](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Issue #34614 (bug history)](https://github.com/anthropics/claude-code/issues/34614)
- [Charles Jones — Agent Teams vs Subagents](https://charlesjones.dev/blog/claude-code-agent-teams-vs-subagents-parallel-development)
- [alexop.dev — From Tasks to Swarms](https://alexop.dev/posts/from-tasks-to-swarms-agent-teams-in-claude-code/)
