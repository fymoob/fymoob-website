# Measure Before Claim — Checklist obrigatória

Aplica-se a **qualquer** trabalho de otimização de performance no FYMOOB — feito por humano ou por Claude (agente, subagent ou skill).

**Regra dura:** não colocar número em KB, ms, ou % em PR/commit/doc sem ter arquivo de medição referenciado.

## Checklist — Antes de mergear

Copiar pro PR description e marcar conforme avança:

```markdown
### Perf Checklist
- [ ] Hipótese registrada em `docs/perf/hypotheses/H-YYYYMMDD-NNN.md` (template: `.claude/protocols/HYPOTHESIS.md`)
- [ ] Baseline medido: `docs/perf/baselines/YYYY-MM-DD-<route>.json` com CoV < 10%
- [ ] Bundle snapshot antes: `docs/perf/bundle-snapshots/YYYY-MM-DD-before.json`
- [ ] Build local passa (`npm run build` sem erros)
- [ ] Kill criterion escrito ANTES da mudança
- [ ] Change aplicada — **uma** hipótese por PR (não bundle múltiplas para manter attribution clara)
- [ ] Post-measurement: `docs/perf/baselines/YYYY-MM-DD-<route>-post.json` com CoV < 10%
- [ ] Bundle snapshot depois: `docs/perf/bundle-snapshots/YYYY-MM-DD-after.json`
- [ ] Delta calculado e mostrado no commit message
- [ ] Attribution verificada (ver `.claude/protocols/ATTRIBUTION.md`)
```

## O que fazer quando NÃO dá pra medir

**Nunca inventar número.** Sempre uma das opções abaixo:

### Opção A — Output "MEASUREMENT_REQUIRED"
Em texto/chat/PR:

> O impacto esperado é `MEASUREMENT_REQUIRED`. Para medir:
> ```bash
> npm run perf:baseline -- http://localhost:3000/busca
> npm run perf:bundle
> # aplicar mudança
> npm run perf:baseline -- http://localhost:3000/busca
> npm run perf:bundle
> npm run perf:diff
> ```

### Opção B — Usar faixa com evidência, não número pontual
Se há evidência parcial (ex: web.dev benchmark):

> Google Flights ganhou -700ms de LCP com `fetchpriority="high"` no hero ([fonte](https://addyosmani.com/blog/fetch-priority/)). Esperamos **entre 0 e 700ms** de ganho no nosso caso, dependendo se o LCP atual é dominado por resource load delay (sim → ganho alto) ou element render delay (não → ganho zero).

### Opção C — Testar primeiro, commitar depois
Se o trabalho é pequeno: aplicar localmente, medir, e só então decidir se vale commitar e mergear.

## Quando escrever apenas "observação qualitativa"

Algumas mudanças afetam UX mais que métricas (ex: swipe touch nativo no carousel). Nesses casos:

- **NÃO** invente número de ms/KB
- Descreva qualitativamente ("ganha swipe touch nativo no mobile, inexistente antes")
- Se quiser métrica, use INP (Interaction to Next Paint) — field data via RUM, não lab

## Enforcement

- **Humanos:** PR review. Reviewer deve bloquear qualquer PR que tenha número de ganho sem arquivo de medição referenciado.
- **Claude/agentes:** `CLAUDE.md` contém regra explícita linkando este protocolo. Agente que estimar sem medir deve ser corrigido no momento e o erro registrado em `docs/perf/eval-cases.json` (quando Fase III for ativada).

## Casos reais desta sessão (antes deste protocolo existir)

| Estimativa original | Realidade |
|---------------------|-----------|
| "Remover polyfill salva 110KB" | 0KB — polyfill já era `<script nomodule>` |
| "Lucide tree-shake salva 60KB" | Build quebra — shadcn usa alias `CheckIcon` |
| "Fix 2 completo salva 200-400ms TBT" | ~0ms — gargalo não era carousel JS |
| "fetchPriority=high baixa LCP 400-600ms" | ~0ms — LCP já era `eager` via `priority` |

**Lição:** 4/4 estimativas não materializaram. Esse é o problema que este protocolo existe para evitar.
