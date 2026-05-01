# Auditoria Completa de Gaps SEO — Site FYMOOB (588 páginas)

**Data:** 2026-04-30
**Páginas auditadas:** **588 URLs** do sitemap completo (559 fetchadas com sucesso + 29 erros)
**Distribuição:**
- 248 imóveis individuais (`/imovel/[slug]`)
- 110 empreendimentos (`/empreendimento/[slug]`)
- 109 bairro+tipo combinações (`/imoveis/[bairro]/[tipo|finalidade|N-quartos]`)
- 36 bairros (`/imoveis/[bairro]`)
- 15 blog posts
- 10 guias de bairro
- 12 landing pages tipadas (apt/casas/sobrados/terrenos + /finalidade)
- 5 faixas de preço
- 4 pillars
- 2 listings (empreendimentos, lançamentos)
- 8 institucionais/outros

**Método:** Script automatizado [`scripts/seo-gaps-audit.py --all`](../../scripts/seo-gaps-audit.py)
**Base teórica:** [docs/seo-reports/2026-04-30-research-strategy.md](2026-04-30-research-strategy.md)

---

## TL;DR — A descoberta brutal

Este audit de **588 páginas reais** revela que os gaps são **muito maiores** do que a amostra de 70 páginas indicava:

| Tipo de página | Problema crítico | Páginas afetadas |
|---|---|---|
| **Imóveis individuais** | Title médio de **94 chars** (truncado em ~65 no Google) | **219 de 248 (88%)** |
| **Imóveis individuais** | Description < 130 chars (curta demais) | **248 de 248 (100%)** |
| **Empreendimentos** | **Thin content** (média 288 palavras, Google penaliza <500) | **109 de 110 (99%)** |
| **Empreendimentos** | Title > 65 chars | 72 de 110 (65%) |
| **Bairro+tipo** | Description < 130 chars | **107 de 109 (98%)** |
| **Bairros** | Title sem número específico | **36 de 36 (100%)** |
| **Blog posts** | Sem FAQ schema | **15 de 15 (100%)** |
| **Blog posts** | Title > 65 chars (truncado) | 14 de 15 (93%) |
| **Guias** | Title > 65 chars | 10 de 10 (100%) |

**Total estimado de páginas com pelo menos 1 gap crítico:** ~530 de 559 (95%).

---

## 1. Estatísticas globais por categoria

### 1.1 Médias quantitativas

| Categoria | Páginas | Title médio | Desc média | Palavras médias | FAQ médio |
|---|---|---|---|---|---|
| home | 1 | 46 | 143 | 1163 | 8 |
| **imovel** | **248** | **94 ⚠️** | **100 ⚠️** | 762 | 5.9 |
| **empreendimento** | **110** | **70** | 146 | **288 ⚠️** | 4.2 |
| **bairro_tipo** | **109** | 52 | **107 ⚠️** | 555 | 4.4 |
| **bairro** | **36** | **70** | 141 | 969 | 4.8 |
| blog_post | 15 | **87 ⚠️** | 167 | 3382 | **0 ⚠️** |
| tipo_landing | 12 | 55 | **94 ⚠️** | 1625 | 5.8 |
| guia | 10 | **69** | 150 | 1484 | 4.3 |
| outros (sobre, contato, anuncie, etc) | 8 | 46 | 155 | 924 | 4.2 |
| preco | 5 | 61 | **107 ⚠️** | 2056 | 5 |
| pillar | 4 | 56 | 154 | 2751 | 7.5 |
| listing | 2 | 61 | 149 | 1924 | 6 |

### 1.2 Distribuição de gaps por categoria (% das páginas afetadas)

| Categoria | T>65 | D<130 | D>165 | Sem FAQ | Thin <500w | T sem # |
|---|---|---|---|---|---|---|
| imovel (248) | **88%** | **100%** | 0% | 0% | 0% | 17% |
| empreendimento (110) | 65% | 3% | 3% | 0% | **99%** | 93% |
| bairro_tipo (109) | 1% | **98%** | 0% | 0% | 41% | 61% |
| bairro (36) | **92%** | 0% | 0% | 0% | 0% | **100%** |
| blog_post (15) | **93%** | 0% | 40% | **100%** | 0% | 0% |
| tipo_landing (12) | 8% | **83%** | 0% | 0% | 33% | **92%** |
| guia (10) | **100%** | 0% | 0% | 0% | 0% | 0% |
| preco (5) | 20% | **100%** | 0% | 0% | 0% | 0% |
| pillar (4) | 0% | 0% | 25% | 0% | 0% | 0% |

---

## 2. Análise detalhada por categoria

### 2.1 🔴 IMÓVEIS INDIVIDUAIS — 248 páginas, **maior alavanca quantitativa do site**

**Problema #1: Titles longos demais (média 94 chars)**

219 de 248 imóveis (88%) têm title acima de 65 caracteres — **Google trunca a maioria**. Exemplos detectados:

- `132 chars` em `/imovel/apartamento-bigorrilho-curitiba-pr-2-quartos-126m2-AP00539`
- `79 chars` em `/imovel/apartamento-cabral-curitiba-pr-3-quartos-106.2m2-AP00296`

Origem: campo `Titulo` no CRM Loft, populado pelo Bruno. A planilha de revisão de 22/04 (`docs/seo/titles-suggestions-2026-04-22.md`) tinha 251 sugestões — nem todas foram aplicadas no CRM, ou padrão de geração ainda extrapola.

**Problema #2: Descriptions curtas (média 100 chars)**

100% dos imóveis com description < 130 chars. Função `generatePropertyDescription(property)` em `src/lib/seo.ts` produz texto curto demais.

**Plano de ação imóveis:**

1. **Audit + reescrita de titles no CRM (Bruno)**: cruzar planilha `titles-suggestions-2026-04-22.md` com CRM atual. Aplicar pendentes. Reduzir todos pra ≤65 chars. Estimativa: 4-5h Bruno.

2. **Reescrever `generatePropertyDescription`** em `src/lib/seo.ts` pra gerar descriptions de 130-160 chars com:
   - Tipo + bairro + cidade
   - Quartos, suítes, área, vagas
   - Faixa de preço ou "a partir de R$"
   - "FYMOOB CRECI J 9420" (credibilidade)
   - Estimativa: 2h dev

**Impact:** 248 páginas × 1-2 imp/mês × CTR 5-10% (vs <2% atual) = **+30-100 cliques/mês** após Google reprocessar (15-21 dias).

### 2.2 🔴 EMPREENDIMENTOS — 110 páginas, 99% com thin content

**O dado mais alarmante do audit:** **109 de 110 empreendimentos** têm menos de 500 palavras de conteúdo. Média de **288 palavras** — abaixo de quase tudo no site.

Diagnóstico já conhecido: o "Standard layout" do `/empreendimento/[slug]/page.tsx` exibe basicamente:
- Hero com nome + bairro
- Descrição curta do CRM (descricao do empreendimento)
- Lista de unidades disponíveis (cards)
- FAQ (4-5 Q&A — OK)

Apenas **3-4 empreendimentos** com `editorialLayout` (Reserva Barigui, Le Monde editorial, etc) têm conteúdo rico (1000+ palavras).

**Problema secundário:** 102 de 110 (93%) sem número específico no title.

**Plano de ação empreendimentos:**

1. **Adicionar bloco SEO genérico ao Standard layout** (similar ao `LandingSEOContent` mas para empreendimentos):
   - H2 "Sobre o {nome}" (parsed da descrição CRM expandida)
   - H3 "Localização e bairro" (descrição do bairro + linkando `/imoveis/[bairro]`)
   - H3 "Tipos de unidades disponíveis" (tabela com tipos + faixa preço + áreas)
   - H3 "Construtora {construtora}" (info histórica)
   - H3 "Por que comprar com a FYMOOB"
   - 5 FAQ Q&A adaptadas pelo nome+bairro+construtora
   - **Meta:** 800-1200 palavras por empreendimento
   - Estimativa: 8-10h dev (component reusable)

2. **Title com número** em todos os empreendimentos:
   - Atual: `Reserva Barigui Mossunguê | Plantas, Preços e Apartamentos | Avantti FYMOOB`
   - Novo: `Reserva Barigui Mossunguê: 32 Apartamentos a Partir de R$ 850 mil | FYMOOB`
   - Aplicar via `generateMetadata` no page.tsx
   - Estimativa: 1h dev

3. **AggregateOffer schema** já listado no plano de pesquisa anterior (P1)

**Impact:** Hoje empreendimentos **não rankeiam bem** justamente por thin content. Subir de 288 → 1000+ palavras pode levar ~30 empreendimentos pra top 10 das suas queries (vs ~5 hoje). **+50-150 cliques/mês.**

### 2.3 🔴 BAIRRO+TIPO — 109 páginas, 98% com description curta

107 de 109 páginas tipo `/imoveis/[bairro]/[tipo]` ou `/imoveis/[bairro]/venda` têm **description < 130 chars** (média 107 chars). Função `generateLandingDescription` retorna texto curto pra essas combinações.

61% também sem número no title.

**Plano de ação:**

1. **Atualizar `generateLandingDescription(tipo, bairro, count, priceRange)`** em `src/lib/seo.ts`:
   - Atual produz ~100 chars
   - Novo target: 140-160 chars
   - Adicionar mais info útil (preço médio, top construtora, tempo de visita)
   - Estimativa: 1h dev

2. **Title com número** (já contemplado no fix dos bairros — ver 2.4)

**Impact:** 109 páginas × 5-15 imp/mês cada = +50-100 cliques/mês quando descrições corretas.

### 2.4 🟡 BAIRROS — 36 páginas, 100% sem número no title

**Todos os 36 bairros** com title sem número específico (ex: "Imóveis no Portão Curitiba: Apartamentos, Casas e Sobrados | FYMOOB"). 33 de 36 também passam de 65 chars.

**Plano de ação:**

1. **Atualizar `generateLandingTitle(undefined, bairro)`** em `src/lib/seo.ts` pra incluir contagem:
   - Atual: `Imóveis no Portão, Curitiba`
   - Novo: `45 Imóveis no Portão Curitiba 2026: Apartamentos e Casas`
   - Passar `total` como parâmetro
   - Estimativa: 30min dev

**Impact:** 36 páginas × 10-30 imp/mês × +CTR 10-15% = **+15-30 cliques/mês**.

### 2.5 🔴 BLOG POSTS — 15 páginas, 100% sem FAQ + 93% titles longos

Confirmado o gap detectado na sample: **TODOS os 15 posts** sem FAQ schema. 14 de 15 com title acima de 65 chars (média 87, máx 121).

**Plano de ação detalhado:**

1. **Reescrever 15 titles** pra ≤60 chars
2. **Reescrever 15 descriptions** pra 130-160 chars
3. **Adicionar FAQ schema** com 5-7 Q&A relevantes ao tema de cada post (função `generateBlogPostFAQ(post)` ou Q&A no frontmatter MDX)

**Esforço:** 13-18h
**Impact:** +60-120 cliques/mês (já na análise GSC — `/blog/financiamento-...` tem 790 imp/1 clique).

### 2.6 🟡 GUIAS DE BAIRRO — 10 páginas, 100% titles > 65 chars

Todos os 10 guias com title 66-71 chars. Encurtar pra ≤65.

**Plano:** atualizar `generateMetadata` do `/guia/[bairro]/page.tsx` pra cortar 5 chars de cada title.
**Esforço:** 1h.

### 2.7 🟡 LANDING TIPADAS COM `/finalidade` — descriptions curtas

10 de 12 páginas tipo `/apartamentos-curitiba/venda`, `/casas-curitiba/aluguel`, etc têm description < 130 chars. Quase todas sem número no title.

**Padrão típico:**
- `/apartamentos-curitiba/aluguel`: 79 chars description, 487 words (THIN!)
- `/casas-curitiba/aluguel`: 74 chars description, 428 words
- `/terrenos-curitiba/aluguel`: 75 chars description, 397 words

**Já identificado no audit anterior** — provavelmente `TipoFinalidadePage` não renderiza `LandingSEOContent` em finalidade=aluguel.

**Plano:** verificar component, adicionar bloco SEO + descriptions ricas. **Esforço:** 4h.

### 2.8 🟡 FAIXAS DE PREÇO — 5 páginas, 100% descriptions curtas

Todas as 5 páginas `/imoveis/preco/[faixa]` com description curta (95-119 chars).

**Plano:** atualizar `generateLandingDescription` para faixas de preço. **Esforço:** 1h.

### 2.9 ✅ PILLARS — 4 páginas, sem gaps significativos

Todos os 4 pillars (`/comprar-imovel-curitiba`, `/comprar-apartamento-curitiba`, `/morar-em-curitiba`, `/alugar-curitiba`) com title 47-63 chars, descriptions 130-198 chars, FAQ 6-10 Q&A. **Apenas 1 com desc > 165** (`/comprar-apartamento-curitiba` com 198 — o novo, vale revisar).

**Plano:** ajustar description do pillar novo pra 160 chars. **Esforço:** 5min.

### 2.10 ✅ HOME — sem gaps

Title 46, desc 143, FAQ 8, words 1163, schemas 11. Excelente.

### 2.11 ⚠️ 29 URLs com erro de fetch — investigar

29 das 588 URLs no sitemap retornaram erro de fetch (provavelmente 404 ou timeout). Possíveis causas:
- Bairros com 1 imóvel só (anti-thin content): `/imoveis/juveve`, `/imoveis/portao/casas`
- Combinações bairro+tipo sem catálogo suficiente
- Empreendimentos novos com slugs ainda em propagação

**Plano:** rodar `python scripts/seo-gaps-audit.py --all` novamente em 7 dias e verificar. Se persistirem, gerar relatório de URLs do sitemap que retornam 404.

---

## 3. Plano de execução PRIORIZADO (impact-driven)

### Ranking por ROI (cliques/mês esperados ÷ esforço em h)

| # | Ação | Páginas | Esforço | Cliques/mês | ROI |
|---|---|---|---|---|---|
| 1 | **Bairros title com número** (1 função) | 36 | 30min | +15-30 | ⭐⭐⭐⭐⭐ |
| 2 | **`generateLandingDescription`** rica pra bairro+tipo | 109 | 1h | +50-100 | ⭐⭐⭐⭐⭐ |
| 3 | **Description preço** rica | 5 | 1h | +5-10 | ⭐⭐⭐⭐ |
| 4 | **Pillar `/comprar-apartamento-curitiba`** desc 198→160 | 1 | 5min | <5 | ⭐⭐⭐⭐ |
| 5 | **`generatePropertyDescription`** rica | 248 | 2h | +30-100 | ⭐⭐⭐⭐⭐ |
| 6 | **Bloco SEO empreendimentos** Standard layout | 110 | 8-10h | +50-150 | ⭐⭐⭐⭐ |
| 7 | **Empreendimentos title com número** | 110 | 1h | +10-30 | ⭐⭐⭐⭐ |
| 8 | **Blog posts: title + desc + FAQ** | 15 | 13-18h | +60-120 | ⭐⭐⭐ |
| 9 | **/aluguel landing thin content fix** | 3 | 4h | +10-30 | ⭐⭐⭐ |
| 10 | **Guias title** encurtar | 10 | 1h | <5 | ⭐⭐ |
| 11 | **Imóveis title CRM** (Bruno aplica) | 248 | 4-5h Bruno | +20-50 | ⭐⭐ |

**Total esforço dev (Vinicius):** **~37-44h**
**Total esforço Bruno:** ~5h
**Total cliques/mês esperados:** **+255-625 cliques/mês**

---

## 4. Sessões de execução sugeridas

### 🚀 Sessão A (3-4h dev) — Fixes massivos via funções centralizadas
**Maior alavanca de ROI por hora.** Tudo via `src/lib/seo.ts` — 1 commit afeta milhares de páginas.

1. ✅ `generateLandingTitle` → adicionar contagem de imóveis pra bairros (1 função → 36 páginas)
2. ✅ `generateLandingDescription` → expandir pra 140-160 chars (1 função → 109 + 5 + 12 = 126 páginas)
3. ✅ `generatePropertyDescription` → expandir pra 130-160 chars (1 função → 248 imóveis)
4. ✅ Pillar `/comprar-apartamento-curitiba` description → encurtar 198→160 (5 min)

**Páginas atingidas:** ~420
**Cliques/mês esperados:** +100-240

### 🚀 Sessão B (8-10h) — Empreendimentos completos
1. ✅ Component `EmpreendimentoStandardSEOContent` (bloco 800-1200 palavras)
2. ✅ Title com número específico
3. ✅ AggregateOffer schema

**Páginas atingidas:** 110
**Cliques/mês esperados:** +60-180

### 🚀 Sessão C (13-18h) — Blog posts completos
1. ✅ Reescrever 15 titles (≤60 chars)
2. ✅ Reescrever 15 descriptions (130-160 chars)
3. ✅ Adicionar FAQ schema (5-7 Q&A por post)

**Páginas atingidas:** 15 (mas alta autoridade)
**Cliques/mês esperados:** +60-120

### 🚀 Sessão D (4-6h) — /aluguel + guias + polish
1. ✅ Investigar/fixar `TipoFinalidadePage` aluguel
2. ✅ Encurtar 10 guia titles
3. ✅ Polish casas-curitiba title

**Páginas atingidas:** 25
**Cliques/mês esperados:** +15-40

### Sessão E (Bruno) — Audit + aplicação CRM
1. Vinicius gera relatório de imóveis com title > 65 chars (filtrar do JSON)
2. Bruno revisa CRM 1 a 1 e aplica títulos sugeridos da planilha 22/04
3. Cache invalidation pós-aplicação

**Páginas atingidas:** ~219 imóveis
**Cliques/mês esperados:** +20-50

---

## 5. Métricas de sucesso (próximo audit em 30 dias)

| Métrica | Atual (30/04) | Meta (30/05) |
|---|---|---|
| Páginas com title > 65 chars | **404** (72%) | <50 (10%) |
| Páginas com description < 130 chars | **372** (66%) | <80 (15%) |
| Páginas com 0 FAQ schema | 21 | <10 |
| Empreendimentos com thin content (<500 palavras) | **109** (99%) | <30 (27%) |
| Imóveis com description rica (>130 chars) | 0 | 248 (100%) |
| CTR médio site (GSC) | 2.81% | 4.5%+ |
| Cliques mensais (GSC) | ~270/mês | 600-900/mês |

---

## 6. Comandos pra reproduzir / acompanhar

```bash
# Re-fetchar lista de URLs do sitemap (rodar mensal)
python scripts/seo-gaps-audit.py --refresh-urls

# Audit completo (todas 588 páginas)
python scripts/seo-gaps-audit.py --all

# Audit sample (70 páginas, mais rápido pra checks intermediários)
python scripts/seo-gaps-audit.py

# Saídas:
# - docs/seo-reports/page-audit-all.json (raw data)
# - docs/seo-reports/page-audit-stats.json (aggregated)
# - docs/seo-reports/all-urls-sitemap.txt (URL list)
```

## 7. Próximo passo sugerido

**Atacar Sessão A primeiro (3-4h dev).** Maior ROI: 4 alterações em funções centralizadas → ~420 páginas afetadas → +100-240 cliques/mês esperados.

Quer que eu ataque?
