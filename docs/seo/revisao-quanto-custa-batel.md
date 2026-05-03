# Plano de revisão — `quanto-custa-morar-batel-curitiba`

> Compilado em **2026-05-02** após auditoria profunda. Próximo da fila de
> Sprint A do [plano geral](./article-revision-plan-2026-05-02.md). Risco
> 🟡 médio.
>
> **Validar com ChatGPT antes de aplicar.** Após validação, traduzir em
> script idempotente `scripts/apply-batel-revisions.mjs`.

---

## 1. Por que este artigo é prioridade

O artigo é forte editorialmente — tese clara, comparativo SP, 3 perfis
escaneáveis, cross-link sólido com PMQ. Mas tem 5 problemas:

### 1.1 Decreto IPTU referenciado sem nome/data (Block 86)

O post atual diz:
> "A Prefeitura de Curitiba aplicou correção por IPCA (~5,8%) via
> **decreto municipal** pra 80% dos imóveis do bairro em 2026..."

**Problema:** "decreto municipal" sem número não é fonte. Leitor que
quer auditar fica sem onde clicar. **Decreto é o 2668/2025**, assinado
19/12/2025 pelo prefeito Eduardo Pimentel. Estabelece a nova Planta
Genérica de Valores (PGV) — base de cálculo do IPTU 2026. Ele se
ampara na **Lei Complementar 149/2025** (aprovada CMC dez/2025) e é
exigência da **EC 132/2023** (Reforma Tributária).

### 1.2 Claim qualitativo "80% Condor Gourmet" sem fonte (Blocks 6 + 51)

Block 6:
> "Solteiro em studio come fora todo dia; **família compra 80% do mercado
> num Condor Gourmet**. Esse é o primeiro ponto que nenhum guia mostra."

Block 51 (callout):
> "Os 3 cenários assumem padrão clássico Batel — **Condor Gourmet em
> vez de supermercado popular**, academia boutique em vez de Smart
> Fit..."

**Problema:** "80% num Condor Gourmet" é frase de impacto sem amostra,
n, nem fonte. Soa como observação editorial, mas redigida com
precisão estatística (80%) que não tem.

**Solução:** suavizar pra "família com 2-3 filhos faz a maior parte das
compras em supermercado de bairro de alto padrão (Condor Gourmet,
Muffato Max)". Mantém o ponto editorial sem fingir estatística.

### 1.3 Conflito interno de rentabilidade Batel com `mercado-imobiliario`

O post (block 88) cita:
> "Batel valorizou +6,5% em 12m + rentabilidade de aluguel **~2% a.a.**
> = 8,5% retorno total nominal."

Mas o `mercado-imobiliario-curitiba-2026` (revisado em 02/05/26) diz:
> "Batel, Bigorrilho, Cabral — aluguel rende 0,32% a 0,38% ao mês
> (**~4,0% a 4,7% ao ano**)"

**Diferença de 2x.** Os dois números não podem coexistir em produção.

Análise honesta:
- FipeZap CWB capital: 4,74% a.a. (média da cidade)
- Batel é alto-padrão → yield ESPERADO menor que média
- 2% é muito conservador (parece chute baixo)
- 4-4,7% é otimista pra Batel especificamente

**Faixa razoável defensável: 3-4% a.a. = 0,25-0,33% ao mês**, com nota
explícita "abaixo da média de Curitiba (4,74%, FipeZap mar/26) por ser
alto-padrão".

**Solução:** atualizar este artigo pra 3-4% a.a. e abrir uma micro-revisão
no `mercado-imobiliario` pra alinhar a faixa premium pra 0,25-0,33% ao
mês (= 3-4% a.a.). Isso pode ser feito no mesmo script ou em um próximo.

### 1.4 CRM FYMOOB listado como Tier 1 (Blocks 5, 95, 109)

**Block 5** (logo abaixo da tabela de cenários):
> "Fontes: FipeZap + Prefeitura CWB + Copel + Sanepar + Secovi-PR +
> DIEESE-PR + **FYMOOB**."

**Block 95** (FAQ aluguel):
> "...Secovi-PR + FipeZap Locação + **CRM FYMOOB**"

**Block 109** (methodology):
> sources: [FipeZap, Prefeitura, Copel, ..., **FYMOOB CRM (composição
> de carteira)**]

**Problema:** FYMOOB listado em paridade com Tier 1 (FipeZap, Prefeitura).
Padrão da revisão: rebaixar pra "observação complementar".

### 1.5 Title sem título secundário, seo_meta_title/description NULL

Atual:
- title: "Quanto Custa Morar no Batel (Curitiba) em 2026" — Caps Inconsistente
- seo_meta_title: NULL
- seo_meta_description: NULL

**Problema:** sem seo_meta_*, o Google usa o title visível. Title visível
tem caps em "Custa", "Morar" — fora do padrão dos outros posts (que
usam title case sentença normal).

**Solução:** padronizar caps + adicionar seo_meta_* explícitos.

---

## 2. Sumário das mudanças

| # | Bloco | Tipo | Mudança | Severidade |
|---|---|---|---|---|
| 1 | – | frontmatter | Title em sentence case + seo_meta_title/description | Média |
| 2 | 5 | paragraph | "Fontes: ... FYMOOB" → reordenar com Tier 1 oficiais primeiro | Alta |
| 3 | 6 | paragraph | "80% num Condor Gourmet" → suavizar pra observação | Alta |
| 4 | 51 | calloutBox | "Condor Gourmet em vez de supermercado popular" → suavizar | Média |
| 5 | 54 | table | Itaim Bibi "R$ 19.500-21.000" → R$ 19.511 (FipeZap mar/26 exato) | Baixa |
| 6 | 60 | bulletListItem | "Pinheiros R$ 34.800 (54% a mais)" → marcar como estimativa derivada | Média |
| 7 | 86 | paragraph | "decreto municipal" → Decreto 2668/2025 + LC 149/2025 + EC 132/2023 | Crítica |
| 8 | 88 | paragraph | "rentabilidade ~2% a.a." → 3-4% a.a. com contexto premium | Crítica |
| 9 | 95 | paragraph | "Secovi + FipeZap + CRM FYMOOB" → reordenar com CRM como observação | Alta |
| 10 | 109 | methodologyBox | Sources reordenados: Tier 1 primeiro, FYMOOB como complementar | Média |

10 blocos. ~25 minutos de aplicação após validação.

---

## 3. Mudanças trecho a trecho

### Mudança 1 — Frontmatter

**Atual:**
- title: "Quanto Custa Morar no Batel (Curitiba) em 2026"
- description: "A conta completa: casal R$ 22.500/mês, família com 2 filhos R$ 44.000, solteiro R$ 7.600. 9 rubricas somadas, comparativo honesto com Pinheiros (SP)."
- seo_meta_title: NULL
- seo_meta_description: NULL

**Proposto:**
- title: **"Quanto custa morar no Batel (Curitiba) em 2026"** (caps em sentence case)
- description: manter (a description **pode** ter números — regra é só title)
- seo_meta_title: **"Quanto custa morar no Batel em 2026? Guia completo"** (matcha intent de busca + sem números cravados, alinhado ao padrão dos outros posts revisados)
- seo_meta_description: **"Solteiro, casal e família no Batel: 9 rubricas mensais detalhadas, IPTU 2026, comparativo com Pinheiros e quem deveria mesmo morar no bairro."**

**Justificativa:** padronização de caps + seo_meta_* preenchidos pra
controlar como o Google exibe.

---

### Mudança 2 — Block 5 (fontes da tabela 3 cenários)

**Atual:**
> Valores mensais somando 9 rubricas. **Fontes: FipeZap + Prefeitura
> CWB + Copel + Sanepar + Secovi-PR + DIEESE-PR + FYMOOB.** Cenários
> pra financiamento 30 anos SAC com 20% de entrada. Detalhe de cada
> rubrica nos H2 seguintes.

**Proposto:**
> Valores mensais somando 9 rubricas. **Fontes primárias** ([FipeZap
> mar/2026](https://www.fipe.org.br/pt-br/indices/fipezap/),
> [Prefeitura CWB — IPTU 2026 (Decreto
> 2668/2025)](https://www.curitiba.pr.gov.br/noticias/decreto-municipal-estabelece-nova-base-de-calculo-do-iptu-80-dos-imoveis-terao-imposto-corrigido-apenas-pela-inflacao-em-2026/81201),
> Copel/Sanepar tarifas residenciais, [Secovi-PR](https://secovi-pr.com.br/),
> [DIEESE-PR](https://www.dieese.org.br/)) com observação complementar
> do estoque ativo acompanhado pela FYMOOB. Cenários pra financiamento
> 30 anos SAC com 20% de entrada. Detalhe de cada rubrica nos H2
> seguintes.

**Justificativa:** Tier 1 fica claramente separado da observação FYMOOB.

---

### Mudança 3 — Block 6 (Condor Gourmet 80%)

**Atual:**
> O número que pega: entre o solteiro (R$ 7.600) e a família (R$
> 44.000), há um fator de 5,8 vezes. A diferença não é só espaço — é
> estilo de vida. Solteiro em studio come fora todo dia; **família
> compra 80% do mercado num Condor Gourmet**. Esse é o primeiro ponto
> que nenhum guia mostra.

**Proposto:**
> O número que pega: entre o solteiro (R$ 7.600) e a família (R$
> 44.000), há um fator de 5,8 vezes. A diferença não é só espaço — é
> estilo de vida. Solteiro em studio come fora quase todo dia; família
> com 2-3 filhos concentra a maior parte das compras em supermercado
> de bairro de alto padrão (Condor Gourmet, Muffato Max), onde a cesta
> mensal sai 25-40% mais cara que em atacarejo. Esse é o primeiro ponto
> que nenhum guia mostra.

**Justificativa:** mantém o ponto editorial (estilo de vida muda a
conta) sem fingir estatística (80%) que não tem fonte. Adiciona dado
verificável no fim ("25-40% mais cara em atacarejo" — coerente com
[custo-de-vida](custo-de-vida-curitiba) que cita atacarejo
"economiza 15-25%").

---

### Mudança 4 — Block 51 (callout "Conta da vida real")

**Atual:**
> Conta da vida real: os 3 cenários assumem padrão clássico Batel —
> **Condor Gourmet em vez de supermercado popular**, academia boutique
> em vez de Smart Fit, iFood premium em vez de comida caseira, 2 carros
> em vez de transporte público. Quem mora no Batel "em modo econômico"
> consegue cortar R$ 2-4 mil/mês. Mas daí a pergunta é: por que o
> Batel?

**Proposto:**
> Conta da vida real: os 3 cenários assumem padrão de consumo
> compatível com Batel — supermercado de bairro alto-padrão, academia
> boutique, iFood frequente, 2 carros em vez de transporte público.
> Quem mora no Batel "em modo econômico" consegue cortar R$ 2-4 mil/mês
> trocando rotina (atacarejo + Smart Fit + transporte público). Mas daí
> a pergunta é: por que o Batel?

**Justificativa:** remove menção específica de marca (Condor Gourmet,
Smart Fit) pra ficar mais durável editorialmente. Mantém o ponto.

---

### Mudança 5 — Block 54 (tabela comparativo SP)

**Atual:**

| Bairro | m² venda | vs Batel |
|---|---|---|
| Itaim Bibi (SP) | **R$ 19.500-21.000** | +9% a +17% |
| Pinheiros (SP) | R$ 18.307 | +2,1% |
| Batel (CWB) | R$ 17.924 | referência |
| Jardins (SP) | R$ 17.354 | -3,2% |
| Moema (SP) | R$ 16.106 | -10,1% |

**Problema:** Itaim Bibi com faixa "R$ 19.500-21.000" enquanto os
outros têm número exato. FipeZap mar/26 publica **R$ 19.511** pra
Itaim Bibi. Faixa não é necessária.

**Proposto:**

| Bairro | m² venda | vs Batel |
|---|---|---|
| Itaim Bibi (SP) | **R$ 19.511** | +8,9% |
| Pinheiros (SP) | R$ 18.307 | +2,1% |
| Batel (CWB) | R$ 17.924 | referência |
| Jardins (SP) | R$ 17.354 | -3,2% |
| Moema (SP) | R$ 16.106 | -10,1% |

**Justificativa:** consistência de granularidade + cálculo direto (vs
"+9% a +17%"). Atualiza o block 56 ("perde pra Itaim Bibi em 9-17%")
pra "perde pra Itaim Bibi em ~9%".

---

### Mudança 6 — Block 60 (Pinheiros R$ 34.800)

**Atual:**
> - Batel: R$ 22.500 (mediana)
> - **Pinheiros (SP): R$ 34.800 (mediana — 54% a mais)**

**Problema:** o R$ 34.800 não tem fonte clara. É derivado (FipeZap
Pinheiros + Secovi-SP + custos médios). Sem disclaimer.

**Proposto** (adicionar parágrafo explicativo + manter a comparação):
> - Batel: R$ 22.500 (mediana)
> - Pinheiros (SP): ~R$ 34.800 (mediana — 54% a mais)

E logo após, no block 61, **adicionar uma frase metodológica**:
> Profissional que recebe salário de capital paulista e se muda pro
> Batel economiza ~R$ 12 mil/mês no mesmo padrão de vida. É esse o
> perfil que o Batel recebe com braços abertos em 2026. *Comparativo
> de R$ 34.800 pra Pinheiros é estimativa baseada em FipeZap março/2026
> + Secovi-SP locação + custos médios de cada cidade — leia como
> ordem de grandeza, não número fechado.*

**Justificativa:** marca explicitamente como estimativa.

---

### Mudança 7 — Block 86 (IPTU + Decreto)

**Atual:**
> "IPTU do Batel explodiu em 2026." Falso. **A Prefeitura de Curitiba
> aplicou correção por IPCA (~5,8%) via decreto municipal pra 80% dos
> imóveis do bairro em 2026, com teto de aumento escalonado de +18% +
> IPCA até 2029. Reajuste extraordinário só entra em casos específicos
> de mudança de uso ou reforma declarada.**

**Proposto:**
> "IPTU do Batel explodiu em 2026." Falso. O
> [Decreto 2668/2025](https://www.legisweb.com.br/legislacao/?id=488328),
> assinado pelo prefeito em **19/12/2025**, estabeleceu a nova Planta
> Genérica de Valores (PGV) — base de cálculo do IPTU 2026 — sob a
> regra da [Lei Complementar
> 149/2025](https://www.curitiba.pr.gov.br/noticias/decreto-municipal-estabelece-nova-base-de-calculo-do-iptu-80-dos-imoveis-terao-imposto-corrigido-apenas-pela-inflacao-em-2026/81201)
> aprovada na Câmara Municipal e da exigência da **EC 132/2023
> (Reforma Tributária)**. Resultado: **80% dos imóveis** em Curitiba
> tiveram correção apenas pelo IPCA, sem aumento real. Onde o valor
> venal apurado supera o anterior, o aumento foi **escalonado até
> 2029** (teto + IPCA por ano). Reajuste real só entra em casos
> específicos de mudança de uso, reforma declarada ou subdimensionamento
> histórico do venal.

**Justificativa:** transforma "decreto municipal" (genérico) em três
referências auditáveis com link direto. Mantém o ponto que o post quer
fazer (IPTU não explodiu) com base sólida.

---

### Mudança 8 — Block 88 (rentabilidade Batel ~2%)

**Atual:**
> "Comprar no Batel rende mais que investir em CDB." Falso em 2026.
> Batel valorizou +6,5% em 12m (FipeZap) + **rentabilidade de aluguel
> ~2% a.a.** = 8,5% retorno total nominal. CDB 100% CDI em 2026
> rendeu ~13% a.a. O Batel como investimento financeiro puro perde pro
> CDB. Só vence o CDB quando o objetivo é reserva de valor + uso
> próprio (morar) — então o "aluguel não pago" entra como receita.
> Pra quem compra Batel só pra investir, as contas não batem.

**Problema crítico:** 2% a.a. **conflita 2x** com `mercado-imobiliario`
(0,32-0,38%/mês = 4,0-4,7% a.a.).

**Proposto:**
> "Comprar no Batel rende mais que investir em CDB." Falso em 2026.
> Batel valorizou +6,5% em 12m (FipeZap mar/26) + **rentabilidade de
> aluguel ~3% a.a.** (faixa observada de 0,25-0,33% ao mês — abaixo da
> média de Curitiba de 4,74% por ser alto-padrão historicamente
> saturado) = ~9,5% retorno total nominal. CDB 100% CDI em 2026 rendeu
> ~13% a.a. O Batel como investimento financeiro puro perde pro CDB.
> Só vence quando o objetivo é reserva de valor + uso próprio (morar)
> — então o "aluguel não pago" entra como receita. Pra quem compra
> Batel só pra investir, a conta não fecha.

**Justificativa:** harmoniza com FipeZap (4,74% Curitiba) + reconhece
que Batel está abaixo da média por ser premium. Tese principal ("perde
pro CDB") fica intacta — só com número defensável.

**Ação correlata:** abrir micro-revisão em `mercado-imobiliario` pra
alinhar a faixa premium pra **0,25-0,33% ao mês** (em vez de 0,32-0,38%).
Pode ser na próxima passada do Sprint A.

---

### Mudança 9 — Block 95 (FAQ aluguel)

**Atual:**
> Faixas por tipologia em abril/2026: 1 quarto ou studio R$ 2.000-4.000/mês;
> 2 quartos R$ 3.500-6.500; 3 quartos 120m² (o mais comum) R$
> 5.000-12.000; cobertura alto padrão R$ 10.000-30.000 (**[Secovi-PR](https://secovi-pr.com.br/)
> + FipeZap Locação + CRM FYMOOB**). Média do m² de aluguel no bairro
> é R$ 49/m², mas varia muito por subárea (Av. do Batel cobra prêmio,
> ruas internas saem mais barato).

**Proposto:**
> Faixas por tipologia em abril/2026: 1 quarto ou studio R$ 2.000-4.000/mês;
> 2 quartos R$ 3.500-6.500; 3 quartos 120m² (o mais comum) R$
> 5.000-12.000; cobertura alto padrão R$ 10.000-30.000 ([Secovi-PR
> Pesquisa de Locação](https://secovi-pr.com.br/) + FipeZap Locação,
> com observação complementar do estoque acompanhado pela FYMOOB).
> Média do m² de aluguel no bairro é R$ 49/m², mas varia muito por
> subárea (Av. do Batel cobra prêmio; ruas internas saem mais barato).

**Justificativa:** CRM FYMOOB sai da paridade com Secovi/FipeZap.

---

### Mudança 10 — Block 109 (methodologyBox)

**Atual props.sources:**
```json
[
  "FipeZap (FGV + Fipe + Zap)",
  "Prefeitura Curitiba (Finanças)",
  "Copel",
  "Sanepar",
  "ANP (gás e combustível)",
  "DIEESE-PR",
  "Secovi-PR",
  "Secovi-SP (comparativo)",
  "FYMOOB CRM (composição de carteira)"
]
```

**Proposto:**
```json
[
  "FipeZap mar/2026 (FGV + Fipe + Zap)",
  "Prefeitura de Curitiba — Decreto 2668/2025 + LC 149/2025 (IPTU 2026)",
  "Copel — tarifa residencial",
  "Sanepar — tarifa residencial",
  "ANP — Síntese Semanal (gás e combustível)",
  "DIEESE-PR — cesta básica + salário mínimo necessário",
  "Secovi-PR — Pesquisa de Locação CWB",
  "Secovi-SP — comparativo aluguel SP",
  "FYMOOB — observação complementar do estoque ativo (~242 imóveis em 66 bairros, snapshot abr/2026)"
]
```

**Justificativa:** alinha methodology box com os princípios — Tier 1
nominado com link/decreto, FYMOOB rebaixada como observação
complementar com amostra explícita.

---

## 4. Pontos a validar fora do escopo desta revisão

1. **Block 65** ("Vida social: R$ 2.200-3.960/mês — só manutenção, sem
   festa") — números específicos (R$ 250-400 jantar, R$ 180 wine bar)
   sem fonte. São observações editoriais; OK manter mas idealmente
   triangular com Trip Advisor / Restorando.

2. **Block 67** ("Seguro residencial alto padrão: R$ 120-320/mês") —
   sem fonte. Faixas plausíveis pra mercado, mas idealmente
   referência Susep / FENASEG.

3. **Block 69** (Clube Curitibano, Graciosa, WTC — mensalidades + jóia)
   — números específicos sem fonte. Verificar nos sites oficiais ou
   suavizar.

4. **Block 75** (Av. do Batel R$ 18.000-22.000/m²) — subárea-level não
   tem fonte FipeZap (que dá Batel agregado R$ 17.924). É observação
   FYMOOB-tipo. Marcar como tal numa próxima passada.

5. **Block 77** ("Av. do Batel R$ 20 mil/m² vs Rua Eurico Dufour
   prédio antigo R$ 11 mil/m² — 45% diferença") — mesma natureza do
   anterior. OK.

6. **Block 100** ("Renda de R$ 25 mil... sobra R$ -1.800") —
   matemática descritiva, OK.

---

## 5. Próximos passos

1. **Você valida este doc com ChatGPT.** Pontos especialmente
   importantes:
   - Decreto 2668/2025 + LC 149/2025 + EC 132/2023: encadeamento
     conceitual está correto?
   - Conflito 2% a.a. vs 4% a.a. pra Batel: 3% a.a. (faixa 0,25-0,33%
     ao mês) é o número defensável?
   - "Família compra 80% num Condor Gourmet" → "concentra a maior parte
     em supermercado alto-padrão" — perde gancho ou ganha credibilidade?

2. **Após validação, traduzo em script**
   `scripts/apply-batel-revisions.mjs` no padrão idempotente.

3. **Próximo da fila depois deste:**
   - `melhores-bairros-curitiba-2026` (Pequeno Príncipe pediátrico
     exclusivo + metodologia transparente)
   - Após Sprint A completo: micro-revisão em
     `mercado-imobiliario-curitiba-2026` pra alinhar faixa premium
     pra 0,25-0,33% ao mês

---

## 6. Fontes consultadas pra esta auditoria

- [Prefeitura de Curitiba — Decreto IPTU 2026 (PGV)](https://www.curitiba.pr.gov.br/noticias/decreto-municipal-estabelece-nova-base-de-calculo-do-iptu-80-dos-imoveis-terao-imposto-corrigido-apenas-pela-inflacao-em-2026/81201)
  — Decreto 2668/2025 assinado 19/12/2025 + LC 149/2025
- [LegisWeb — Decreto Nº 2668/2025](https://www.legisweb.com.br/legislacao/?id=488328)
- [LegisWeb — IPTU/Curitiba: nova base de cálculo](https://www.legisweb.com.br/noticia/?id=32086)
- [Tribuna do Paraná — IPTU 2026 reajuste IPCA 80% imóveis](https://www.tribunapr.com.br/noticias/curitiba-regiao/iptu-2026-em-curitiba-80-dos-imoveis-terao-reajuste-apenas-pela-inflacao/)
- [MySide — Bairros mais caros SP 2026 (FipeZap mar/26)](https://myside.com.br/guia-imoveis/bairros-mais-caros-sao-paulo-sp)
  — Itaim Bibi R$ 19.511, Pinheiros R$ 18.307, Jardins R$ 17.354,
  Moema R$ 16.106
- Cruzamento interno com `mercado-imobiliario-curitiba-2026`
  (revisado 02/05/26) — detectou conflito 2x na rentabilidade Batel
