# FYMOOB Unique Data Advantage — Como ser referência em dados Curitiba

> **Audiência:** autor/editor do blog + dev.
> **Objetivo:** transformar dados ao vivo do CRM Loft/Vista + open data municipal em diferencial editorial que competidor (Quinto Andar, Loft, MySide, Larya, Apolar, JBA) **não consegue replicar** no contexto Curitiba.
> **Premissa:** em cada post YMYL, substituir "estima-se" / "segundo o mercado" por **número medido no catálogo FYMOOB** + citação de fonte pública aberta (IPPUC, Prefeitura, IBGE, BCB). Isso é o que o Google chama de **first-hand expertise** (E-E-A-T).
>
> **Criado:** 2026-04-23
> **Autor:** FYMOOB Unique Data Advantage Specialist
> **Base:** snapshot API Loft 18-20/04/2026 (236 imóveis ativos / 1.479 no CRM).
> **Relacionado:**
> - [`.claude/skills/loft-api/SKILL.md`](../../.claude/skills/loft-api/SKILL.md) — inventário completo de 735 campos
> - [`docs/crm/catalog-empirical-data.md`](../crm/catalog-empirical-data.md) — distribuição por bairro/tipo
> - [`docs/crm/loft-vista-constraints.md`](../crm/loft-vista-constraints.md) — limitações conhecidas
> - `src/services/loft.ts` — `getBairroMarketStats()` (já calcula 10 KPIs por bairro)

---

## 1. Inventário API Loft — o que dá pra extrair HOJE

### 1.1 Volume disponível

```
Total CRM:                     1.479 imóveis (todos os status)
Ativos (ExibirNoSite=Sim):       236 imóveis
Bairros distintos:                63
Empreendimentos:                 113
Campos expostos pela API:        735 (distribuídos em 14 recursos)
 ├─ imoveis:                    271 campos por imóvel
 ├─ carac (unidade):             81 campos booleanos
 ├─ infra (condomínio):          77 campos booleanos
 ├─ Foto:                        13 campos
 ├─ Corretor:                    58 campos
 ├─ prontuarios (atendim.):      20 campos
 └─ proprietarios (PRIV.):      149 campos (NUNCA expor)
```

### 1.2 Endpoints relevantes pra extração editorial (read-only)

| Endpoint | O que retorna | Uso editorial |
|---|---|---|
| `/imoveis/listar` | Paginação (50/página) | Cálculo de stats agregadas |
| `/imoveis/detalhes?imovel={code}` | 271 campos por imóvel | Case study, foto alta, plantas |
| `/imoveis/destaques` | DestaqueWeb=Sim (~10) | Post "top imóveis do mês" |
| `/imoveis/listarConteudo` | Valores distintos de 1 campo | "Todos os bairros FYMOOB opera" |
| `/imoveis/finalidades` | `["Venda","Aluguel"]` | Sanity check |
| `/clientes/listar` + filter VeiculoCaptacao | Leads recebidos do site | Social proof: "X leads em 30d" |
| `/imoveis/listarcampos` | Schema completo (735 campos) | Auditoria de novos campos |

### 1.3 Distribuição por bairro — imóveis ativos (top 15)

Fonte: `docs/crm/catalog-empirical-data.md` + `getAllBairros()`.

| Bairro | Ativos | Tipo dominante | Vale post próprio? |
|---|---|---|---|
| Portão | 24 | Apartamento | **SIM** — volume robusto |
| Mossunguê | 18 | Apartamento | **SIM** |
| Cidade Industrial | 17 | Casa/Terreno | **SIM** |
| Água Verde | 13 | Apartamento | **SIM** |
| Campo de Santana | 11 | Terreno | Sim (investimento) |
| Bigorrilho | 9 | Apartamento | Sim |
| Xaxim | 9 | Casa | Sim |
| Tatuquara | 8 | Terreno/Casa | Sim (popular) |
| Campina do Siqueira | 8 | Apartamento | Sim |
| **Batel** | 7 | Apartamento luxo | **SIM — alto ticket, alto CPC** |
| Campo Comprido | 7 | Apartamento/Casa | Sim |
| Sítio Cercado | 7 | Casa/Terreno | Sim |
| Novo Mundo | 6 | Apartamento | Marginal |
| Centro | 5 | Apartamento/Studio | **SIM — volume de busca alto** |
| Capão Raso | 5 | Apartamento | Marginal |

**Corte editorial:** bairros com **≥7 imóveis ativos** = dado agregado estatisticamente defensável (mínimo pra "média FYMOOB" ter peso). Abaixo disso, citar como "amostra pequena" ou não citar.

### 1.4 Venda vs Locação (derivação híbrida — ver `src/services/loft.ts` linha 307-327)

| Finalidade | Total aproximado |
|---|---|
| Venda-only | ~150 |
| Locação-only | ~55 |
| Venda e Locação (dual) | ~30 |
| **Total ativo** | **~236** |

### 1.5 Campo-ouro escondido: `dataCadastro` + `dataAtualizacao`

Ambos já são mapeados em `Property` (linhas 413-414 de `loft.ts`) mas **não usados em nenhum lugar público**. Permitem calcular:

- **Tempo no mercado por bairro** (dias desde `dataCadastro` pra imóveis ativos) → métrica que Quinto Andar cobra R$ na API deles.
- **Frescor do catálogo** ("87% dos imóveis cadastrados nos últimos 6 meses") → sinal de atividade.
- **Velocidade de rotação** se cruzar snapshots diários (ver script C, §2.3).

**Esse é o insight que nenhum competidor tem, porque é dado do seu próprio CRM, histórico.**

### 1.6 Outros campos não-óbvios que ninguém está explorando

| Campo | Potencial editorial |
|---|---|
| `ValorM2`, `ValorVendaM2`, `ValorLocacaoM2` | Preço m² direto do anúncio — FonteAutoral |
| `ValorCondominio`, `ValorIptu` | "Quanto custa manter um apartamento no Batel?" |
| `AnoConstrucao` + `IdadeDoImovel` | "Idade média dos imóveis à venda no Juvevê" |
| `Pavimentos`, `AptosAndar`, `Elevadores` | Análise tipológica por empreendimento |
| `CategoriaGrupo`, `CategoriaMestre` | Taxonomia alternativa (curada Loft) |
| `AceitaFinanciamento`, `AceitaPermuta` | "% de imóveis que aceitam financiamento em cada faixa" |
| `Lancamento` | Pipeline de lançamentos ativos |
| `DestaqueWeb` + `SuperDestaqueWeb` | Curadoria editorial "top 10 mês" |
| `KeywordsWeb` | Dicionário de termos SEO que Bruno cadastrou manualmente |
| `Face`, `Topografia`, `GaragemTipo` | Enriquecimento de schema + filtros raros |
| `TemTourVirtual`, `URLVideo` | Badge "imóveis com tour 360" |
| `prontuarios` (endpoint) | **Nº de visitas/atendimentos por imóvel** — raro, poderoso |

---

## 2. Scripts propostos (ordenados por ROI editorial)

Todos rodam em Node 20+ (já é a stack do projeto), **read-only**, respeitando a regra absoluta CLAUDE.md § API Loft/Vista. Output em `scripts/output/*.json` ou `docs/research/dados/*.json` pra versionamento.

Convenção de localização:
- **Scripts:** `scripts/data-editorial/*.mjs`
- **Output versionado:** `docs/research/dados/*.json` (commit no repo — histórico de snapshots)
- **Output runtime (cache):** `public/data/*.json` (opcional, pra consumir no front sem API call)

### 2.1 Script A — `calculate-yield-by-bairro.mjs` ⭐ **ROI MÁXIMO**

**Objetivo:** calcular yield (rentabilidade anual) por bairro usando dados reais FYMOOB.

**Fórmula:** `yield_bruto_anual = (aluguel_m²_médio × 12) / venda_m²_médio × 100`

**Input:** nenhum (varre todos os bairros com ≥ N imóveis de cada finalidade).

**Output (`docs/research/dados/yield-bairros-2026-04.json`):**

```json
{
  "generatedAt": "2026-04-23T12:00:00Z",
  "source": "API Loft/Vista brunoces-rest.vistahost.com.br",
  "totalActive": 236,
  "minSampleSize": 3,
  "bairros": [
    {
      "bairro": "Portão",
      "slug": "portao",
      "totalAtivos": 24,
      "amostraVenda": 8,
      "amostraAluguel": 6,
      "vendaM2Medio": 8500,
      "aluguelM2Medio": 40,
      "yieldBrutoAnual": 5.6,
      "confidence": "high",
      "warning": null
    },
    {
      "bairro": "Batel",
      "slug": "batel",
      "totalAtivos": 7,
      "amostraVenda": 4,
      "amostraAluguel": 2,
      "vendaM2Medio": 14000,
      "aluguelM2Medio": 55,
      "yieldBrutoAnual": 4.71,
      "confidence": "low",
      "warning": "amostraAluguel<3 — tratar como indicativo"
    }
  ]
}
```

**Pseudocódigo:**

```js
import { fetchLoftAPI } from './_loft-client.mjs'  // helper extraído de loft.ts

async function calculateYield() {
  const all = await fetchAllProperties({ ExibirNoSite: "Sim" })

  const byBairro = groupBy(all, p => p.BairroComercial || p.Bairro)

  const result = []
  for (const [bairro, props] of Object.entries(byBairro)) {
    const venda = props.filter(p => toNum(p.ValorVenda) > 0 && toNum(p.AreaPrivativa) > 0)
    const aluguel = props.filter(p => toNum(p.ValorLocacao) > 0 && toNum(p.AreaPrivativa) > 0)

    if (venda.length < 3 || aluguel.length < 2) continue  // amostra baixa

    const vendaM2 = median(venda.map(p => toNum(p.ValorVenda) / toNum(p.AreaPrivativa)))
    const aluguelM2 = median(aluguel.map(p => toNum(p.ValorLocacao) / toNum(p.AreaPrivativa)))
    const yieldAnual = (aluguelM2 * 12) / vendaM2 * 100

    result.push({
      bairro, slug: slugify(bairro),
      totalAtivos: props.length,
      amostraVenda: venda.length, amostraAluguel: aluguel.length,
      vendaM2Medio: round(vendaM2), aluguelM2Medio: round(aluguelM2),
      yieldBrutoAnual: round(yieldAnual, 2),
      confidence: venda.length >= 5 && aluguel.length >= 3 ? "high" : "low",
    })
  }
  return result.sort((a, b) => b.yieldBrutoAnual - a.yieldBrutoAnual)
}
```

**Uso editorial:**
- Post `/imoveis/[bairro]` com seção "Vale a pena investir em {bairro}?"
- Post "Ranking: bairros com maior rentabilidade em Curitiba (abril 2026)" ← **pillar content**
- Citação em posts MCMV, financiamento, investidor iniciante
- Schema.org `FAQPage` com Q: "Qual yield médio no Batel?" A: "Medido em N imóveis ativos FYMOOB em abril/2026..."

**ROI:** alto. Keywords tipo "rentabilidade aluguel curitiba" tem volume + intenção de investidor (alto ticket). Competidor (Quinto Andar, Loft) dá média da cidade, nunca por bairro com sample size declarado.

**Esforço:** 3-4h (criar script + helper + primeiro snapshot + integração em 1 post).

---

### 2.2 Script B — `extract-stock-by-bairro.mjs` ⭐ **ROI ALTO, esforço MÍNIMO**

**Objetivo:** snapshot editorial com contagem de imóveis ativos por bairro + tipo + faixa de preço, pra citar factualmente em QUALQUER post.

**Input:** opcionalmente filtro de bairro/tipo.

**Output (`docs/research/dados/estoque-fymoob-2026-04.json`):**

```json
{
  "generatedAt": "2026-04-23T12:00:00Z",
  "totalAtivos": 236,
  "totalCRM": 1479,
  "byBairro": {
    "portao": { "total": 24, "venda": 18, "aluguel": 6, "dual": 0, "precoMedio": 680000 },
    "batel":  { "total": 7,  "venda": 6,  "aluguel": 1, "dual": 0, "precoMedio": 3200000 }
  },
  "byTipo": {
    "Apartamento": 118, "Casa": 42, "Terreno": 28, "Sobrado": 15, ...
  },
  "byFaixa": {
    "ate-300mil": 38, "300-500mil": 52, "500-800mil": 47, "800mil-1.5mi": 41,
    "1.5-3mi": 33, "acima-3mi": 25
  },
  "byLancamento": { "lancamentos": 8, "usados": 228 },
  "comFinanciamento": 184,  "comPermuta": 42,
  "comTourVirtual": 12, "comVideo": 18
}
```

**Uso editorial:** frase fixa factual no rodapé de TODO post:

> *"Dados calculados a partir do catálogo FYMOOB em 23/04/2026: 236 imóveis ativos, sendo 24 no Portão, 18 no Mossunguê... Atualizado quinzenalmente."*

Isso é **ouro pra E-E-A-T** — Google (dez/2025 update) penaliza conteúdo sem first-hand experience. Frase assinada + data + método = sinal forte.

**Uso em schema:**
```json
{
  "@type": "RealEstateAgent",
  "name": "FYMOOB",
  "makesOffer": [
    {"@type":"Offer","itemOffered":{"@type":"Apartment","areaServed":"Portão"},"offerCount":24}
  ]
}
```

**Esforço:** 1-2h.

**ROI:** altíssimo — todo post pode citar. Custo marginal próximo de zero.

---

### 2.3 Script C — `track-stock-over-time.mjs` ⭐⭐ **ROI ÚNICO (quem mais tem?)**

**Objetivo:** **snapshot diário/semanal** do catálogo → calcular métricas temporais que NINGUÉM tem.

**Input:** CRON semanal (GitHub Actions ou local).

**Processo:**
1. Salvar `snapshots/YYYY-MM-DD.json` com `[{codigo, bairro, tipo, valorVenda, valorLocacao, dataCadastro}]`.
2. Comparar N snapshots pra derivar:
   - **Tempo médio no site por bairro** (dias entre aparição e sumiço = vendeu/alugou)
   - **Imóveis novos por semana** (sinal de mercado vivo)
   - **Variação de preço** (imóveis que baixaram preço = "encalhados" + amplitude de desconto por bairro)
   - **Taxa de churn** (% do catálogo que sai por mês)

**Output:**

```json
{
  "periodo": "2026-01-01 → 2026-04-23",
  "porBairro": {
    "batel": {
      "tempoMedioNoSite_dias": 127,
      "imoveisNovosUltimoMes": 3,
      "reducaoMediaPreco_pct": 6.2,
      "imoveisSairam": 4
    }
  }
}
```

**Uso editorial:**
- Post "Quanto tempo demora pra vender um apartamento no Batel?" — **zero competidor tem**
- Post "Mercado mais aquecido em Curitiba: imóveis novos por semana"
- Dashboard público "/mercado-curitiba" com live numbers (projeto futuro, mas snapshot já alimenta)

**Esforço inicial:** 4h pra script + GitHub Action. **Ganho acumula ao longo de meses** — começar HOJE pra ter 6 meses de dados em outubro.

**Pré-requisito:** commitar snapshots em git (20KB/snapshot × 52/ano = 1MB/ano, trivial).

---

### 2.4 Script D — `consolidate-curitiba-open-data.mjs`

**Objetivo:** baixar, normalizar e consolidar dados abertos municipais/federais relevantes.

**Fontes (todas gratuitas, todas com API ou CSV público):**

| Fonte | Endpoint / URL | Dado |
|---|---|---|
| **Prefeitura CWB (ITBI)** | `https://dadosabertos.curitiba.pr.gov.br/` (CKAN) | Transações ITBI mensais — **preço de fechamento real** |
| **IPPUC** | `https://ippuc.org.br/` (catálogo de shapefiles/CSV) | Demografia, zoneamento, equipamentos urbanos por bairro |
| **URBS** | [mobilidade CWB](https://www.urbs.curitiba.pr.gov.br/) + dadosabertos | Linhas, paradas, BRT — densidade de transporte |
| **IBGE SIDRA** | `https://apisidra.ibge.gov.br/` (API REST) | Renda, educação, densidade populacional |
| **BCB SGS** | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.{cod}/dados` | Selic, IPCA, IGP-M, INCC (séries históricas JSON) |
| **CEPEA/FipeZap** | `https://www.fipe.org.br/pt-br/indices/imoveis` | Índice geral de preços (PDF mensal) |

**Output:**
- `docs/research/dados/cwb-open-data/itbi-{YYYY}-{MM}.json`
- `docs/research/dados/cwb-open-data/ippuc-bairros.json` (snapshot estático, atualizar 2x/ano)
- `docs/research/dados/macro/bcb-selic-historico.json` (últimos 24 meses)
- `docs/research/dados/macro/igpm-incc-historico.json`

**Uso editorial cruzado (este é o diferencial do differential):**

> "No Batel, o preço m² medido no catálogo FYMOOB (abr/2026) é R$ 14.000. A Prefeitura registrou M ITBIs no bairro em Q1/2026 com ticket médio de R$ X. O IPCA acumulado de 12 meses ficou em Y% (BCB). Isso significa...**"

Post cruza **3 fontes oficiais + dados FYMOOB**. Nenhum competidor faz isso por preguiça de consolidação.

**Esforço:** 6-8h (cada fonte tem schema próprio + parser próprio). Pode ser split em 4 sub-scripts (um por fonte).

**ROI:** médio-alto. Invisível no começo, vira defesa contra Google "YMYL sem autoridade".

---

### 2.5 Script E — `calculate-valorizacao-real.mjs`

**Objetivo:** calcular valorização real do catálogo FYMOOB por bairro (delta de preço em N meses).

**Limitação:** só funciona DEPOIS de ter ≥6 meses de snapshots (script C).

**Dependência:** script C rodando. Sem histórico, output vazio.

**Uso editorial:** post anual "Valorização em Curitiba em 2026 — medido no catálogo FYMOOB".

**Esforço:** 2h (só consome snapshots do C). **Mas depende de espera.**

**Alternativa temporária (até ter snapshot histórico):** usar FipeZap + ITBI Prefeitura como proxy até ter dados próprios.

---

### 2.6 Resumo dos 5 scripts

| # | Script | Esforço | Tempo até valor | Prioridade |
|---|---|---|---|---|
| A | `calculate-yield-by-bairro.mjs` | 3-4h | Imediato | **1º — rodar agora** |
| B | `extract-stock-by-bairro.mjs` | 1-2h | Imediato | **2º — rodar agora** |
| C | `track-stock-over-time.mjs` | 4h setup | 6 meses | **3º — setup agora, colhe depois** |
| D | `consolidate-curitiba-open-data.mjs` | 6-8h | 1-2 semanas | 4º — split em subtarefas |
| E | `calculate-valorizacao-real.mjs` | 2h | Só após 6m de C | 5º — adiar |

**Total:** ~16-20h pra setup dos 5. Rodando em 3 sessões focadas.

---

## 3. Dashboards externos + acessibilidade

### 3.1 Priorizadas (tier 1) — API ou CSV direto

| Fonte | Tipo | Acesso | Custo | Uso |
|---|---|---|---|---|
| **BCB SGS** | API REST JSON | `api.bcb.gov.br/dados/serie/bcdata.sgs.{cod}/dados?formato=json` | Free | Selic (432), IPCA (433), IGP-M (189), INCC (192), CUB-SP (4148). Essencial pra posts de financiamento, MCMV, reajuste de aluguel. |
| **IBGE SIDRA** | API REST JSON | `apisidra.ibge.gov.br/values/t/{tabela}/...` | Free | Demografia Curitiba, renda, CENSO. Tabela 6579 (pop), 4709 (renda). |
| **ViaCEP** | API REST | `viacep.com.br/ws/{cep}/json/` | Free | Geocoding, normalização endereço (já deve estar no stack). |
| **BrasilAPI** | API REST | `brasilapi.com.br/api/ibge/municipios/v1/{UF}` | Free | Lista municípios, códigos IBGE. |
| **OpenStreetMap Overpass** | API | `overpass-api.de/api/interpreter` | Free | Infra por bairro (escolas, hospitais, supermercados num raio). |
| **Dados Abertos Curitiba** (CKAN) | API REST + CSV | `dadosabertos.curitiba.pr.gov.br/api/3/action/package_list` | Free | **ITBI** (datasets `itbi-{ano}`), arrecadação, equipamentos públicos. |

### 3.2 Tier 2 — PDF/página (scraping leve)

| Fonte | Tipo | Acesso | Uso |
|---|---|---|---|
| **FipeZap** (FIPE) | PDF mensal | `fipe.org.br/.../indices-de-precos/imoveis` → PDF | Benchmark preço m² Curitiba vs FYMOOB. Citar como "FipeZap março/2026: R$ X, FYMOOB mede R$ Y no mesmo bairro". |
| **Loft Data** | Relatórios web | `data.loft.com.br` | Benchmark competidor — usar só pra comparação, nunca reproduzir dado. |
| **Quinto Andar Index** | Dashboard web | `quintoandar.com.br/sobre/quintoandar-index` | Aluguel médio nacional/cidade. Apenas 10+ capitais — Curitiba incluída. Citar como referência. |

### 3.3 Tier 3 — Sob demanda / privado

| Fonte | Tipo | Acesso | Uso |
|---|---|---|---|
| **ABRAINC-FIPE** | Relatório PDF | `abrainc.org.br` | Indicador de lançamentos (trimestral). Útil pra Curitiba. |
| **SECOVI-PR** | Relatório PDF | `secovipr.com.br` | Local — preço e aluguel mensal Curitiba. **Altíssima autoridade local**, referenciar sempre que usar. |
| **CRECI-PR** | Boletins | `creci-pr.gov.br` | Transações oficiais. Reforça E-E-A-T (CRECI do Bruno). |
| **CBIC** | Relatórios | `cbic.org.br` | Custos de construção, INCC. |
| **Serasa Experian** | Pago | API | Endividamento, scoring — não investir agora. |

### 3.4 Padrão de citação recomendado

No fim de cada post com número-dado:

> **Fontes consultadas em 23/04/2026:**
> — Catálogo próprio FYMOOB (N=236 imóveis ativos, via API Loft/Vista)
> — IBGE SIDRA, tabela 4709 (renda Curitiba, última leitura)
> — BCB-SGS, série 432 (Selic 2026-03)
> — SECOVI-PR, boletim março/2026
> — Prefeitura CWB, dados abertos ITBI (ckan dataset `itbi-2026`)

Cada citação é **link externo com anchor específico**. Google trata como outbound authority.

---

## 4. Unique advantage matrix — o que FYMOOB tem que competidor NÃO tem

| Dado | FYMOOB | Quinto Andar | Loft | MySide | Razzi | JBA | Apolar |
|---|---|---|---|---|---|---|---|
| Catálogo próprio Curitiba (≥200 imóveis ativos) | ✅ 236 | ❌ | ❌ | ❌ | ~150 | ~300 | ~400 |
| **API pública do próprio CRM** (dado live) | ✅ Loft/Vista | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Preço m² **medido** por bairro CWB | ✅ por 15+ bairros | Só média cidade | Só média cidade | ❌ | ❌ | ❌ | ❌ |
| Yield calculado por bairro | ✅ com amostra declarada | Nacional | Nacional | ❌ | ❌ | ❌ | ❌ |
| Histórico longitudinal próprio (dataCadastro) | ✅ (uma vez setado) | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| CRECI do autor dos posts | ✅ Bruno | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Operação local (anos em Curitiba) | ✅ ≥15a | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Cruzamento com dados abertos CWB (ITBI, IPPUC) | ✅ possível | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Consolidação BCB + IBGE por post | ✅ possível | ❌ | Raramente | ❌ | ❌ | ❌ | ❌ |
| 735 campos de API (profundidade) | ✅ | N/A | N/A | N/A | ❌ | ❌ | ❌ |

### 4.1 Como transformar em conteúdo citável

**Padrão ouro (rodapé de post):**

> *"Análise preparada por Bruno César (CRECI-PR XXXX), fundador da FYMOOB, com base em:*
> *— 236 imóveis ativos no catálogo FYMOOB em abril/2026 (API Loft/Vista, snapshot 2026-04-23);*
> *— Prefeitura de Curitiba — ITBI Q1/2026;*
> *— SECOVI-PR — Boletim de Preços março/2026;*
> *— BCB-SGS série 432 (Selic);*
> *— IBGE-SIDRA tabela 4709 (renda CWB)."*

**Resultado SEO/GEO:**
- ChatGPT/Perplexity **citam** a página porque tem `firstHandExperience` + múltiplas fontes.
- Google AI Overviews pega snippet estruturado.
- E-E-A-T score sobe (dez/2025 update estende E-E-A-T a todas queries competitivas).

---

## 5. Manutenção + custo

### 5.1 Quem roda, quando

| Script | Frequência | Quem | Automação |
|---|---|---|---|
| A (yield) | Mensal | Dev (inicialmente) → GH Action | GitHub Action cron `0 3 1 * *` |
| B (estoque) | Quinzenal | GH Action | `0 3 1,15 * *` |
| C (snapshot) | **Diária** | GH Action | `0 3 * * *` (3h UTC = 0h CWB) |
| D (open data) | Mensal | GH Action + retrials | `0 4 2 * *` |
| E (valorização) | Trimestral | GH Action | `0 5 1 1,4,7,10 *` |

### 5.2 Custo de manutenção

**API Loft:**
- Requests: ~5 por rodada (paginação 50 × 5 = 250 imóveis). Quota Loft desconhecida, mas uso atual do site já faz 10x isso por hora.
- **Custo: zero marginal** — mesmo plano de API.

**Storage:**
- Snapshots: ~20KB/dia JSON gzipped × 365 = 7 MB/ano. **Commit no repo, trivial.**
- Open data: ~5 MB/mês × 12 = 60 MB/ano.
- **Custo: zero.**

**GitHub Actions:**
- ~30 min/mês total de runtime.
- **Custo: zero** (free tier generoso).

**Quando CRM Loft mudar:**
- Inventário de campos em `.claude/skills/loft-api/SKILL.md` já documenta 735 campos.
- Scripts leem campos declarados (não "todos") — resiliente a novos campos.
- Se Loft **remover** campo (raro), `parseNumber()` retorna `null`, cálculo ignora graciosamente.

### 5.3 Risco de regressão

- `dataCadastro` some ou muda formato → scripts C/E quebram. Mitigação: teste no smoke CI com 1 propriedade real (já existe em `scripts/smoke-test.mjs`).
- Loft downtime → script com retry (igual pattern de `fetchLoftAPI` em `loft.ts`, 2 tentativas com backoff) + fallback pra último snapshot.
- API key rotacionada → env var única, atualização num lugar.

---

## 6. Ordem de implementação recomendada

### Sprint 1 (essa semana) — **Quick wins, 8h total**

1. **Extrair helper `_loft-client.mjs`** de `src/services/loft.ts` — função `fetchAllProperties()` reutilizável. (1h)
2. **Script B (`extract-stock-by-bairro.mjs`)** — gera snapshot inicial hoje. (1-2h)
3. **Script A (`calculate-yield-by-bairro.mjs`)** — primeira rodada → publica em post pillar. (3-4h)
4. **Rodapé de E-E-A-T template** — componente React `<DataSourcesFooter />` com props `{ sourceList: [...] }`. (1h)
5. **Commit + deploy + 1 post piloto** usando output. (1h)

### Sprint 2 (próxima semana) — **Histórico longitudinal, 5h**

6. **Script C (`track-stock-over-time.mjs`)** — cron diário. (3h)
7. **GitHub Action** — agenda + commit automático no repo. (1h)
8. **README em `docs/research/dados/`** explicando estrutura. (1h)

### Sprint 3 (quinzena seguinte) — **Open data**, 8h

9. **Script D** split em 4 sub-scripts (BCB, IBGE, Prefeitura, IPPUC). (4-6h)
10. **Primeira consolidação + 1 post cruzando 3 fontes**. (2h)

### Sprint 4 (3 meses depois) — **Valorização real**

11. **Script E** quando snapshot histórico tiver ≥ 6 meses.

---

## 7. Exemplos de output integrado em posts

### Exemplo 1 — post "Preço do m² por bairro em Curitiba 2026" (YMYL high)

**Seção "Batel"**

> **Preço m² no Batel (abril 2026):** R$ **14.120** (mediana).
>
> Medido em **4 apartamentos à venda** no catálogo FYMOOB ativo em 23/04/2026, com áreas entre 180 e 470 m². Para fins comparativos, o FipeZap de março/2026 reportou R$ 13.400 para o bairro (nacional: R$ 9.200). O SECOVI-PR registrou ticket médio de R$ 3,2 Mi em transações Q1/2026 no Batel.
>
> **Yield bruto estimado:** 4,7% a.a. — calculado contra aluguel m² mediano de R$ 55 (amostra: 2 unidades em locação ativa, confidence=low).
>
> **Contexto macro (BCB, 2026-03):** Selic em 10,75%, IPCA-12m em 3,8%, INCC-12m em 5,4%. A 14.120 m², ticket médio de 180m² = R$ 2,54 Mi, prestação de 30 anos a 11% a.a. ≈ R$ 24 mil/mês — exige renda familiar de R$ 80 mil+ (30% comprometimento).

### Exemplo 2 — post "Vale a pena investir em imóvel no Portão?"

> **Yield no Portão (abril/2026):** 5,6% a.a. bruto.
>
> Medido em **8 apartamentos à venda** e **6 em aluguel** no catálogo FYMOOB, confidence=high.
>
> Comparativo rápido: esse yield supera CDI líquido (8,7% × 85% = 7,4% a.a.) **apenas quando Selic cair** abaixo de 8%. O diferencial fica na valorização do imóvel (inflação IPCA + delta de bairro) + benefício fiscal de imóvel residencial único.
>
> **FYMOOB tem HOJE, no Portão:** 24 imóveis ativos, dos quais 18 para venda e 6 para locação. Destes, 14 aceitam financiamento bancário.

### Exemplo 3 — badge editorial recorrente

```
┌─────────────────────────────────────────────────────────┐
│ 📊 DADOS AO VIVO — FYMOOB                              │
│                                                         │
│ Análise baseada em 236 imóveis ativos no nosso         │
│ catálogo em 23/04/2026 (API Loft/Vista).               │
│                                                         │
│ Bairro analisado: Portão — 24 imóveis ativos           │
│ Atualizado quinzenalmente.                              │
│                                                         │
│ → Ver catálogo completo do Portão                       │
└─────────────────────────────────────────────────────────┘
```

Esse componente em todo post local cria rede interlinking + sinal fresh + E-E-A-T.

---

## 8. Próximos passos executivos

1. [ ] **Dev:** extrair helper `_loft-client.mjs` + rodar scripts A e B HOJE.
2. [ ] **Editor:** criar componente `<DataSourcesFooter />` + `<LiveDataBadge />`.
3. [ ] **Editor:** revisar 5 posts reescritos recentemente (ver `docs/seo/blog-posts-rewrite-briefings-2026-04-23.md`) e incluir dados FYMOOB medidos via script B.
4. [ ] **Dev:** GitHub Action pra script C (começar snapshot histórico JÁ).
5. [ ] **Bruno:** confirmar CRECI correto (XXXXX) pra assinatura final dos posts.
6. [ ] **Produto:** planejar página pública `/mercado-curitiba` que consome outputs A+B+C (fase 2).

---

**Fim.** Dúvidas técnicas: dev lead. Dúvidas editoriais: voltar ao briefing de reescrita `blog-posts-rewrite-briefings-2026-04-23.md`. Última atualização: 2026-04-23.
