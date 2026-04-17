# Measure Before Claim — Checklist obrigatória

**Escopo: SÓ se aplica quando o PR afirma impacto em performance.** Para bug fix, layout/CSS, conteúdo, feature sem claim de perf, refactor, hot fix — **pula este protocolo**.

**Regra dura:** não colocar número em KB, ms, ou % em PR/commit/doc sem ter arquivo de medição referenciado.

## Gatilhos — o que ATIVA o protocolo

Marque se seu PR se encaixa em pelo menos uma:
- [ ] Descrição/commit contém número de KB/ms/% com sinal de ganho ou perda
- [ ] Adiciona ou remove lib/componente pesado (ex: `@base-ui`, `maplibre`, `embla`, `radix`)
- [ ] Altera `next.config.ts` com flags relacionadas a bundle (optimizePackageImports, modularizeImports, etc)
- [ ] Motivação é *melhorar Lighthouse/TBT/LCP/FCP/CLS/score*
- [ ] Cria ou muda dynamic imports com intenção de reduzir bundle inicial
- [ ] Size-limit (CI) falhou — regression detectada
- [ ] Lighthouse CI (se ativo) falhou — regression detectada

**Se nenhuma marcar:** dispensa. Prossiga com fluxo normal.

## Quando NÃO se aplica (dispensa explícita)

| Tipo de mudança | Dispensa? | Observação |
|-----------------|-----------|------------|
| Bug fix (lógica, crash, dados) | ✅ Sim | Só mexer se o fix adicionou lib pesada |
| Layout / CSS / tipografia | ✅ Sim | Mesmo que mude classes Tailwind |
| Conteúdo (texto, imagem, copy) | ✅ Sim | — |
| Feature nova sem claim de perf | ✅ Sim | Ex: nova página, botão, formulário |
| Refactor interno | ✅ Sim | Rename, extrair função, split de componente |
| Docs, testes, tooling de dev | ✅ Sim | — |
| Bump de dep (patch security) | ✅ Sim | Salvo se tamanho da dep muda muito |
| **Hot fix prod** | ✅ Sim | Ver seção dedicada abaixo |

## Hot fix — exceção explícita

Quando produção está quebrada e não há tempo pra protocolo:

1. **Shipa o fix primeiro.** Prefixo `hotfix(...)` no commit.
2. **Se** o hot fix adicionou lib pesada ou tocou em código crítico de perf:
   - Abrir follow-up PR depois, com hipótese + medição pós-fato
   - Registrar uma linha em `docs/perf/hotfixes.log` (append-only): `YYYY-MM-DD | commit | motivo | follow-up?`
3. **Se** o hot fix foi só de lógica/visual (não toca perf): fim, segue a vida.

Objetivo: não acumular débito invisível. Hot fix é legítimo, débito oculto não.

## Checklist — Quando o protocolo ATIVA

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
