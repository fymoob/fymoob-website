# Hypothesis Template — Protocolo HDD aplicado a performance

Toda otimização de performance registra uma hipótese **antes** de qualquer código. Formato inspirado em Thoughtworks ([fonte oficial](https://www.thoughtworks.com/insights/articles/how-implement-hypothesis-driven-development)) e IBM Garage HDD.

## Template

Copiar para `docs/perf/hypotheses/H-YYYYMMDD-NNN.md` (cria a pasta se não existir).

```markdown
# Hipótese H-YYYYMMDD-NNN

## Believe That
[Mudança específica X — arquivo + linhas + o que vai ser alterado. Não "melhorar X", e sim "trocar useState<currentSlide> em PropertyCard.tsx:169 por scroll container + ref".]

## Will Result In
[Métrica Y quantificável, por causa de [mecanismo M explicável e verificável].]

**Mecanismo:** [Por que essa métrica deveria mover? Ex: "currentSlide causa re-render do carousel toda vez que user troca foto → remove state → remove re-render → reduz TBT"]

## Success Criterion
[Z mensurável concreto, em [W samples/tempo].]

Exemplos válidos:
- "TBT mediana do /busca cai de 580ms para < 450ms em 5 runs com CoV < 10%"
- "Bundle /busca raw cai de 247 KB para < 200 KB medido por `npm run perf:bundle`"
- "LCP p75 no CrUX BigQuery cai de 4.5s para < 3.5s em janela de 28d"

Exemplos **inválidos** (vagos, não verificáveis):
- "Melhora a performance"
- "Reduz o bundle consideravelmente"
- "TBT fica melhor"

## Kill Criterion
[Condição que ABORTA o experimento — definido ANTES de implementar.]

Exemplos:
- "Se TBT após 5 runs for ≥ baseline, revertemos."
- "Se CoV > 15% após 3 tentativas de medir, marcamos como MEASUREMENT_UNRELIABLE e revertemos."
- "Se build quebrar e não resolver em 30min de debug, revertemos."

**Crítico:** escrever o kill criterion antes de começar. Evita confirmation bias — "ah, mas caiu só 5%, vale a pena mesmo assim" é sinal que o kill criterion não foi claro.

## Baseline Measurement

- **Arquivo:** `docs/perf/baselines/YYYY-MM-DD-<route>.json`
- **Gerado com:** `npm run perf:baseline -- <url>`
- **CoV:** [X%] (< 10% obrigatório para aceitar medição)
- **Key numbers:**
  - Score: [N]
  - LCP: [Xs]
  - TBT: [Yms]
  - CLS: [Z]
  - Bundle raw: [N KB]

## Predicted Delta

[Número esperado, com variance esperado entre parênteses.]

Exemplos:
- "TBT: -130ms a -190ms (esperado 160ms, variance ±30ms)"
- "Bundle: -75 KB raw (esperado; measurement required para confirmar)"

Se não conseguir prever com evidência, **marcar como `MEASUREMENT_REQUIRED`** em vez de chutar.

## Attribution Mechanism

Como verificaremos que o efeito observado é DA mudança e não de noise/outros fatores?

- [ ] **Bundle changes** verificáveis via `@next/bundle-analyzer` + `source-map-explorer`
- [ ] **JS execution TBT** verificável via Lighthouse `long-tasks` audit (chunk específico que reduziu)
- [ ] **LCP breakdown** via `lcp-breakdown-insight` (qual subpart mudou: TTFB, Load Delay, Duration, Render Delay)
- [ ] **Third-party cost** via `third-party-summary`
- [ ] **Isolation:** A mudança é a ÚNICA no commit? Se houver outras, atribuição fica ambígua.

Referência: `.claude/protocols/ATTRIBUTION.md`

## Status

- [ ] Baseline medido (arquivo citado acima)
- [ ] Hipótese aprovada (este arquivo committed antes do código da mudança)
- [ ] Mudança implementada
- [ ] Build passa
- [ ] Post-measurement medido
- [ ] Delta calculado e publicado no commit de merge
- [ ] Success criterion: ✅/❌
- [ ] Kill criterion triggered: ✅/❌

## Delta Medido (preencher APÓS o experimento)

| Métrica | Baseline | Pós-change | Delta | Dentro do esperado? |
|---------|----------|-----------|-------|---------------------|
| TBT mediana | Xms | Yms | -Zms | ✅/❌ |
| LCP mediana | Xs | Ys | -Zs | ✅/❌ |
| Bundle raw | X KB | Y KB | -Z KB | ✅/❌ |

**Evidência:** linkar arquivos `docs/perf/baselines/` (antes e depois) + treemap `.next/analyze/client.html` (se bundle mudou).

## Conclusão

[Uma de: SUCCESS / PARTIAL / FAILED / KILLED]

[Se FAILED ou KILLED: o que aprendemos? atualizar CLAUDE.md, TASKS.md ou criar memory file com a lição.]
```

## Exemplos de hipóteses BEM e MAL formuladas

### ❌ Mal formulada (ambígua, não kill-safe)
> **Believe That:** Removendo o polyfill
> **Will Result In:** bundle menor
> **Success:** TBT melhora

**Problemas:** "bundle menor" não é métrica (KB? qual chunk?); "TBT melhora" não é quantificável; sem kill criterion; sem mecanismo verificável.

### ✅ Bem formulada (baseada em caso real desta sessão)
> **Believe That:** Desativar o chunk polyfill `a6dad97d9634a72d.js` para browsers modernos via `browserslist` no package.json.
> **Will Result In:** Bundle raw total cai em ~110 KB, **por que** o chunk não será mais incluído no HTML e o browser moderno não precisa baixar nem parsear.
> **Mecanismo:** Next.js emite polyfill condicional baseado em `browserslist`. Se a config moderna ficar, não gera o chunk.
> **Success:** Bundle raw de `/busca` cai de 763 KB para < 660 KB em `npm run perf:bundle`.
> **Kill:** Se bundle não cair em ≥ 50 KB OU build quebrar, revertemos.
> **Attribution:** Grep no HTML servido confirmando ausência do `<script src="/_next/static/chunks/a6dad97*">`.

**Nota crucial (lição aprendida nesta sessão):** essa hipótese TERIA falhado mesmo bem formulada, porque a attribution (grep no HTML) revelaria que o polyfill já era `<script nomodule>`. Por isso a regra é **verificar a attribution primeiro, antes de implementar**. O mecanismo assumido estava incorreto.
