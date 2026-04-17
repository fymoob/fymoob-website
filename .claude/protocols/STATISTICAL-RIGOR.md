# Statistical Rigor — Não ser enganado por variance

Métricas de performance são ruidosas. Regras baseadas em [Lighthouse Variability docs (Google)](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md), [Netflix Tech Blog](https://netflixtechblog.com/fixing-performance-regressions-before-they-happen-eab2602b86fe) e DebugBear.

## Regras numéricas (obrigatórias)

### Mínimo de runs

| Situação | Mínimo | Observação |
|----------|--------|------------|
| Lighthouse synthetic | **5 runs** | Mediana é **2x mais estável** que 1 run (fonte Google oficial) |
| RUM field data | N ≥ 1000 pageviews | Para p75 ter significance |
| Bundle analysis | 1 build | Determinístico, não precisa múltiplos |

### Agregação

- **Sempre reportar mediana** (ou mínimo à la Netflix), **nunca média simples** para métricas com distribuição cauda-longa (LCP, TBT)
- Nunca confundir `mean` (média) com `median` (mediana). Script `lighthouse-median.js` calcula `median` — esse é o número a citar.

### Coefficient of Variation (CoV)

CoV = `(desvio padrão / média) × 100`. Indica ruído relativo.

| CoV | Interpretação | Ação |
|-----|---------------|------|
| < 5% | Excelente | Aceita medição |
| 5-10% | Aceitável | Aceita, mas cita CoV no relatório |
| > 10% | Muito ruidoso | **Rejeita medição**, roda mais 5 vezes ou investiga setup |
| > 20% | Algo quebrado | Revê emulação, network throttling, processo concorrente |

### Throttling

- **Preferir:** Lighthouse simulated throttling ou `--throttling-method=devtools` (determinístico)
- **Evitar:** rede real (3G/4G) — adiciona ruído não-determinístico

## Comparação A vs B

### Pre-change vs post-change (mesmo site, 2 amostras)

- Baseline: 5 runs → medição A (mediana, CoV)
- Post-change: 5 runs → medição B (mediana, CoV)
- Delta: `B_mediana - A_mediana`
- **Considerar significance** se:
  - Delta > 2 × max(CoV_A, CoV_B) × A_mediana (regra prática)
  - OU Mann-Whitney U p < 0.05 (nonparametric, Netflix pattern)

### Sessão / field data (muitos usuários)

- Usar p75 (percentil 75) espelhando [CrUX methodology](https://web.dev/articles/crux-and-rum-differences)
- Janela de **28 dias** rolantes
- Comparar antes/depois do deploy com Mann-Whitney U

## Quando lab e field conflitam

Se Lighthouse diz "melhorou" mas CrUX diz "piorou" (ou vice-versa):

1. **Field data wins** para decisão de go/no-go — são usuários reais
2. Investigar o que Lighthouse capturou que CrUX não (ou vice-versa)
3. Possíveis causas:
   - Lighthouse usa dispositivo emulated Moto G4, CrUX vê frota real
   - Lighthouse mede 1 page load, CrUX agrega cache warm + cache cold
   - Third-party scripts carregados em campo que Lighthouse bloqueia

## Exemplos desta sessão

### ✅ Medição correta (v4 do /busca)

4 amostras Lighthouse v4:
- Amostras: 67 / 65 / 72 / (outlier ignorado: 57)
- Mediana: 65 → 66
- CoV: ~8% (aceitável)
- Delta vs baseline: +7 pontos — **aceito como real**

### ❌ Medição incorreta (anteriormente nesta sessão)

> "TBT melhorou ~200ms"

Problema: foi 1 run único, sem CoV, sem mediana. Depois rodamos 3 vezes e o número flutuou entre 470ms e 1040ms (outlier). Conclusão: a primeira medição isolada estava dentro da variance, sem sinal real.

## Ferramentas

- **`scripts/perf/lighthouse-median.js`** — roda 5×, calcula mediana e CoV, aborta se CoV > 10%
- **`.size-limit.json`** — enforcement determinístico (bytes, não variance)
- **Lighthouse CLI direto** para investigação ad-hoc, mas **não para claim oficial**

## Referência para futuro Mann-Whitney U (quando implementarmos)

```js
// Pseudocódigo — para Fase III ou IV
function mannWhitneyU(groupA, groupB) {
  // Compare rankings without assuming normal distribution
  // Returns U statistic + p-value
  // If p < 0.05, delta is statistically significant
}
```

Por enquanto regra prática "delta > 2 × max(CoV) × mediana" é suficiente.
