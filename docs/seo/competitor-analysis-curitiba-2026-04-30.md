# Análise Competitiva SEO — "Apartamentos Curitiba" / "Imóveis Curitiba"
**Data:** 2026-04-30
**Query alvo:** apartamentos curitiba, apartamentos à venda em curitiba, imóveis curitiba
**Estado atual FYMOOB:** fora do top 10 do SERP orgânico

---

## TL;DR — Diagnóstico em uma página

### O que vimos no SERP de "apartamentos curitiba"

| # | Site | Tipo | Estado SEO técnico |
|---|---|---|---|
| 1 | **Viva Real** | Marketplace nacional | Cloudflare-protegido (Google passa). Title rico com cidade+tipo+marca |
| 2 | **Imovelweb** | Marketplace nacional | Cloudflare-protegido. ~49.239 imóveis em Curitiba, autoridade alta |
| 3 | **ZAP Imóveis** | Marketplace nacional | ~17.005 apartamentos. Title curto e direto |
| 4 | **Apolar** | Imobiliária regional | **❌ SPA Vue.js sem SSR — title/meta/h1 VAZIOS no HTML inicial** |
| 5 | **JBA Imóveis** | Imobiliária regional | URL `/imoveis-curitiba/apartamento` retorna **404**; só `/busca` funciona |
| 6 | **Isidório** | Imobiliária regional | **❌ H1 = "Carregando..."**, sem Schema markup, canonical em **HTTP** (não HTTPS) |
| 7 | **MySide** | SaaS imob moderno | **✅ Best in class**: 8 schemas (incluindo FAQPage, Apartment, AggregateRating, Product), 3001 palavras, 26 H2 |

### As 5 maiores oportunidades pra FYMOOB

1. **Adicionar `FAQPage` schema com 4-8 Q&A ricas** — MySide tem, FYMOOB não. Single biggest gap.
2. **Adicionar `Apartment` schema individual** em cada card da listagem — só `ItemList` não basta.
3. **H1 com NÚMEROS específicos** ("Apartamentos à venda em **408 edifícios** em Curitiba, PR" — MySide). FYMOOB hoje: "Apartamentos à Venda e Aluguel em Curitiba" (sem números).
4. **Bloco textual SEO 800-1200 palavras** ao final da landing (MySide tem 3001 palavras, FYMOOB ~1489 — mas a maioria são titles de cards).
5. **3-4 imobiliárias regionais top têm fraquezas técnicas** (SPA sem SSR, 404, H1 "Carregando...") — FYMOOB pode ultrapassá-las só com SEO básico bem feito.

---

## 1. Análise individual dos concorrentes

### 1.1 MySide ⭐ BEST IN CLASS (modelo a seguir)

**URL:** `https://myside.com.br/apartamentos-venda-curitiba-pr`
**HTML size:** 1.080 KB (rico em SEO server-side)

**Title:** `Apartamentos à venda em Curitiba, PR | MySide` (44 chars)
**Meta description:** `Na MySide temos 408 edifícios com mais de 8.564 apartamentos à venda em Curitiba, PR. Veja fotos, plantas e opções com preços a partir de R$ 259 mil.` (155 chars)
**H1:** `Apartamentos à venda em 408 edifícios em Curitiba, PR` ← **com número específico**
**Canonical:** `https://myside.com.br/apartamentos-venda-curitiba-pr` (HTTPS)

**Schema.org JSON-LD presentes:**
- ✅ AggregateRating
- ✅ Answer
- ✅ **Apartment** (por imóvel)
- ✅ BreadcrumbList
- ✅ ContactPoint
- ✅ Country
- ✅ **FAQPage** com Question + Answer
- ✅ GeoCoordinates
- ✅ ListItem
- ✅ LocalBusiness
- ✅ Organization
- ✅ PostalAddress
- ✅ **Product** (cada empreendimento como produto)
- ✅ QuantitativeValue
- ✅ Question

**Estrutura H2 (26 headings):**
- 18× `Apartamentos à venda no [Empreendimento]` ← **programmatic SEO por empreendimento**
- 1× `Busque apartamentos por data de entrega em Curitiba, PR`
- 1× `Bairros mais buscados em Curitiba, PR`
- 1× `Busque apartamentos por número de quartos em Curitiba`
- 1× `Dúvidas frequentes sobre comprar imóveis em Curitiba`
- 1× `Conheça os apartamentos à venda em Curitiba`
- 1× `Como comprar o melhor apartamento?`

**FAQ explícito (4 Q&A no schema, mais visualmente):**
1. Como é morar em Curitiba? (resposta ~600 chars com "qualidade de vida", BRT, áreas verdes, infraestrutura)
2. Quanto custa em média um apartamento em Curitiba? (cita "R$ 190 mil — apartamentos compactos — até R$ 30 milhões — luxo")
3. Qual o valor do metro quadrado na capital paranaense? (cita **"Índice FipeZAP de março de 2026: R$ 11.621/m², variação de 5,92% em 12 meses"** — dado externo)
4. Quais são os melhores bairros de Curitiba? (lista **15 bairros**: Batel, Bigorrilho, Água Verde, Ecoville, Centro, Centro Cívico, Alto da Glória, Cristo Rei, Campo Comprido, Vila Izabel, Jardim Botânico, Juvevê, Mercês, Santa Felicidade, Campina do Siqueira)

**Bairros internos linkados:** 11 (Centro, Batel, Ecoville, Juvevê, Bigorrilho, Cristo Rei, Alto da Glória, Água Verde, Portão, Ahú, Cabral)

**Word count:** 3.001 palavras no body

**Sinal único de destaque:**
- Conta 408 **edifícios** (não imóveis individuais) — vira "biblioteca de empreendimentos" com cada empreendimento sendo um link interno
- Cita índice externo (FipeZAP) na FAQ — sinal E-E-A-T de autoridade
- Schema **Product + AggregateRating** = elegível pra rich result no Google (estrelas no SERP)

---

### 1.2 Isidório ⚠️ FRAQUEZAS GRAVES

**URL:** `https://isidorioimoveis.com.br/buscar/todas-negociacoes/apartamento/curitiba/todos-bairros?city=6015&type=1&page=1&order=3`
**HTML size:** 423 KB (mas conteúdo crítico em JS)

**Title:** `Apartamento para Comprar em Curitiba` (37 chars — curto, sem marca)
**Meta description:** `Isidorio Imóveis - 933 resultados encontrados | Apartamento para Comprar em Curitiba`
**H1:** `Carregando...` ❌ **CRITICAL — SPA renderizado no client**
**Canonical:** `http://isidorioimoveis.com.br/...` ❌ **HTTP, não HTTPS!**

**Schema.org JSON-LD:** ❌ **Nenhum detectado**

**OG/Twitter:** parcial (só title + description)

**Diagnóstico:** Apesar de aparecer top 10 (provavelmente por autoridade do domínio + 933 imóveis), tecnicamente está MUITO mal. Google indexa "Carregando..." como conteúdo principal. Canonical em HTTP é cardinal sin SEO.

**Oportunidade FYMOOB:** Site tecnicamente correto (Next.js SSR, HTTPS, schema markup) já dá vantagem técnica. Falta só conteúdo + autoridade.

---

### 1.3 JBA Imóveis ⚠️ URL TIPADA QUEBRADA

**URL testada 1:** `https://jbaimoveis.com.br/imoveis-curitiba/apartamento` → **404** (Página não encontrada)
**URL fallback:** `https://jbaimoveis.com.br/busca` → 200

**Title (busca):** `Busca de imóveis - JBA Imóveis` (29 chars — sem keywords de cidade/tipo)
**Meta description:** ❌ **Vazia**
**H1:** `Busca de imóveis` (sem keywords)
**Canonical:** ❌ não detectado
**Page count claim:** 2.082 imóveis

**Schema.org:** somente BreadcrumbList + ListItem. Sem Apartment, sem RealEstateListing, sem FAQ, sem Organization rica.

**Diagnóstico:** JBA tem **autoridade de domínio e backlinks**, por isso aparece. Mas SEO técnico fraco — não tem URL tipada estável (`/apartamento/curitiba`), só `/busca` genérica que não captura intent específico.

**Oportunidade FYMOOB:** já tem `/apartamentos-curitiba` estável. JBA não.

---

### 1.4 Apolar ❌ FRAQUEZA TÉCNICA TOTAL

**URL:** `https://www.apolar.com.br/imoveis/comprar/apartamento/curitiba`
**HTML size:** 3 KB (só shell SPA Vue.js)

**Title:** ❌ vazio no HTML inicial
**Meta description:** ❌ vazio (`<meta name="description" content="">`)
**H1:** ❌ não existe no HTML inicial
**Schema:** ❌ nada
**Canonical:** existe (`https://www.apolar.com.br/imoveis/comprar/apartamento/curitiba`)

**Diagnóstico:** Apolar é **gigante regional** (50+ anos de Curitiba, marca tradicional) e ainda assim publica um SPA Vue.js sem SSR. Google consegue renderizar JS, mas:
- LCP horrível
- Sem `<title>` no first paint = sinal pobre
- Quando indexado, depende 100% de Googlebot rodar JS

**Oportunidade FYMOOB:** Apolar rankeia por marca histórica + backlinks. Tecnicamente está vulnerável. Conteúdo SEO denso + schema rico = chance real de ultrapassar em queries específicas (não-branded).

---

### 1.5 Razzi ❌ SITE INCOMPLETO

**URL home:** `https://razzi.com.br/` → HTML 115 KB com title `razzi.com.br` (sem branding) e meta description vazia
**URL listing:** retornou 404 ou SPA-only

**Diagnóstico:** Razzi (concorrente conhecido FYMOOB) está em manutenção/em rebuild. Sem ameaça SEO atual.

---

### 1.6 Viva Real / ZAP / Imovelweb ⚠️ MARKETPLACES NACIONAIS (Cloudflare bloqueado)

Tentamos fetch direto + Googlebot UA — todos retornam Cloudflare challenge. Dados via WebSearch + cache:

**Viva Real**
- Title: `Apartamentos à venda em Curitiba, PR - Viva Real`
- Pattern URL: `/venda/parana/curitiba/apartamento_residencial/`
- Page count: ~16.913 apartamentos
- Pattern de SEO: marketplace com schema de listagem agressivo, +centenas de bairros linkados, autoridade gigante

**ZAP Imóveis** (mesmo grupo Viva Real)
- Title: `Apartamentos à venda - Curitiba, PR`
- Pattern URL: `/venda/apartamentos/pr+curitiba/`
- Page count: ~17.005 apartamentos
- Estrutura idêntica ao Viva Real

**Imovelweb**
- Title: `49.239 Apartamentos à venda em Curitiba, PR` ← **número no título**
- Pattern URL: `/apartamentos-venda-curitiba-pr.html`
- Page count: 49.239 (mais agressivo do mercado)

**Diagnóstico:** Marketplaces vencem por **autoridade de domínio + volume + programmatic SEO em escala**. Ranqueá-los é tecnicamente impossível pra um site novo na queries genéricas como "apartamentos curitiba" — mas dá pra ranquear em **queries de cauda longa** (bairro+tipo+preço, empreendimento, etc).

---

## 2. Estado atual da FYMOOB

### 2.1 `/apartamentos-curitiba` (landing estática principal)

| Item | Estado FYMOOB | MySide (referência) | Gap |
|---|---|---|---|
| Title | "Apartamentos à Venda e Aluguel em Curitiba \| FYMOOB Imobiliária" (61 chars) | "Apartamentos à venda em Curitiba, PR \| MySide" (44 chars) | OK |
| Meta description | "Encontre apartamentos à venda e para alugar em Curitiba. 120 opções disponíveis. Preços de R$ 900 a R$ 7.817.780. FYMOOB Imobiliária." | "Na MySide temos 408 edifícios com mais de 8.564 apartamentos à venda em Curitiba, PR..." | OK (similar) |
| H1 | "Apartamentos à Venda e Aluguel em Curitiba" | "Apartamentos à venda em **408 edifícios** em Curitiba, PR" | ⚠️ Sem número específico |
| Word count | 1.489 | 3.001 | ⚠️ ~50% do MySide |
| H2 strategy | 49× titles de imóveis (duplicados 2× cada) | 18× empreendimento + 8× heading temático | ⚠️ duplicação prejudica |
| Bairros linkados | 6 (Água Verde, Batel, Bigorrilho, Centro, Ecoville, Portão) | 11 | ⚠️ −5 |
| **FAQPage schema** | ❌ **AUSENTE** | ✅ 4 Q&A ricas | 🚨 **CRITICAL GAP** |
| **Apartment schema** | ❌ só ItemList | ✅ Apartment por card | 🚨 **CRITICAL GAP** |
| **Product/AggregateRating** | ❌ | ✅ | 🚨 GAP |
| LocalBusiness/Organization | ✅ Organization + RealEstateAgent | ✅ | OK |
| BreadcrumbList | ✅ | ✅ | OK |
| Canonical HTTPS | ✅ | ✅ | OK |
| Word count BLOCK SEO | ~0 (texto só em cards) | ~1500 (FAQs + bloco final) | 🚨 GAP |

### 2.2 `/busca?tipo=Apartamento` (página dinâmica)

- Title: `Busca de imóveis Apartamento em Curitiba | FYMOOB Imobiliária`
- Description: `Busca de imóveis Apartamento em Curitiba. Filtros por localização, faixa de preço, quartos e tipo. Resultados atualizados em tempo real na FYMOOB.`
- H1: `Busca de imóveis em Curitiba` ← **fraco, sem palavra "Apartamento"**
- Schemas: idem landing
- ⚠️ H1 não captura a query específica

---

## 3. Padrões dos vencedores (o que TODOS fazem)

1. **Title em formato `Apartamentos à venda em [Cidade], [UF] | [Marca]`** — curto, direto, com keyword exata
2. **Meta description com NÚMERO específico** ("X apartamentos", "Y edifícios", "a partir de R$ Z mil")
3. **H1 com número** quando possível (Imovelweb: "49.239 Apartamentos...")
4. **URL pattern `/apartamentos-venda-[cidade]-[uf]`** ou `/venda/[uf]/[cidade]/apartamento_residencial/`
5. **Schema rico** — pelo menos: BreadcrumbList + Organization + LocalBusiness + ItemList. Top players adicionam Apartment, FAQPage, Product, AggregateRating
6. **Múltiplos bairros linkados** (10+ no fold inferior)
7. **Conteúdo textual SEO** denso (1500-3000 palavras) — incluindo FAQ + texto descritivo
8. **HTTPS + canonical estável**
9. **OG/Twitter completos** com imagem
10. **Sitemap submetido + crawlable**

---

## 4. Plano de ação priorizado pra FYMOOB

### 🔴 P0 — Crítico, fazer essa semana (impacto alto, risco baixo)

#### 4.1 FAQPage schema na landing `/apartamentos-curitiba`

Adicionar 6-8 Q&A ricas. Modelo a seguir (espelhando MySide mas com data atualizada):

```
Q1. Como é morar em Curitiba?
Q2. Quanto custa em média um apartamento em Curitiba?
Q3. Qual o valor do metro quadrado em Curitiba? (citar FipeZAP)
Q4. Quais são os melhores bairros de Curitiba para morar?
Q5. Quais são os melhores bairros de Curitiba para investir?
Q6. Vale a pena comprar apartamento na planta em Curitiba?
Q7. Como funciona o financiamento de apartamento na Caixa?
Q8. Quanto tempo demora pra fechar uma compra em Curitiba?
```

Cada resposta: 200-400 chars, com dados externos (IBGE, FipeZAP, Caixa, IPTU). **Maior gap atual e maior alavanca**.

#### 4.2 Adicionar `Apartment` schema individual em cada card

Hoje só `ItemList`. Cada item da lista deve ter `@type: Apartment` (ou `RealEstateListing` + `additionalType: Apartment`) com:
- `name`, `description`
- `url`
- `image`
- `numberOfRooms`, `numberOfBathroomsTotal`
- `floorSize` (em m²)
- `address` (PostalAddress)
- `offers` (Offer com price, priceCurrency BRL)

#### 4.3 H1 da landing com número específico

Trocar de:
> Apartamentos à Venda e Aluguel em Curitiba

Para algo como:
> **120 Apartamentos à Venda e Aluguel em Curitiba**
> ou
> **Apartamentos à Venda em 18 Bairros de Curitiba**

(O número que tiver mais força. Se total mude muito, usar bairros que é mais estável.)

#### 4.4 Bloco textual SEO 800-1200 palavras antes do FAQ

Estrutura:
- H2 "Conheça o mercado de apartamentos em Curitiba"
- ~150 palavras: panorama do mercado, FipeZAP, valorização
- H3 "Bairros mais valorizados" — links pra `/imoveis/[bairro]`
- ~150 palavras: top 5 bairros com perfil de cada um
- H3 "Como escolher seu apartamento em Curitiba"
- ~200 palavras: dicas de compra (m²/preço, infra, escola, transporte)
- H3 "Por que comprar com a FYMOOB"
- ~200 palavras: CRECI, atendimento, tempo de mercado, número de imóveis
- (Já reusable — pode aproveitar texto do `/morar-em-curitiba` pillar)

### 🟡 P1 — Próximas 2 semanas (impacto médio-alto)

#### 4.5 Headings da listagem com programmatic SEO

Hoje os 49 H2 são titles de imóveis duplicados (`<h2>` aparece 2× pra cada card). Trocar pra:
- 1× H2 master: "Apartamentos disponíveis em Curitiba"
- H3 por bairro/empreendimento agrupando cards: "Apartamentos em Portão", "Apartamentos no Le Monde"

Reduz duplicação + cria hierarquia semântica.

#### 4.6 Aumentar bairros linkados de 6 → 15

Atualmente: Água Verde, Batel, Bigorrilho, Centro, Ecoville, Portão.
Adicionar: Juvevê, Cabral, Cristo Rei, Alto da Glória, Ahú, Mossunguê, Cidade Industrial, São Braz, Santa Felicidade.

#### 4.7 Cobrar landings de bairro+tipo combinados

URL pattern já existe: `/imoveis/[bairro]/apartamentos`. Verificar se essas estão indexadas (sitemap). Se não:
- gerar links no footer da landing principal
- adicionar ao sitemap shard 1

#### 4.8 Schema `AggregateRating` (avaliações)

Pra ganhar estrelas no SERP (rich result Product). Pode usar reviews do Google Meu Negócio (FYMOOB já tem CRECI J 9420, deve ter perfil GMN). Importar via Google Places API ou copiar manualmente.

### 🟢 P2 — Próximo mês (autoridade longa)

#### 4.9 Backlinks editoriais

Marketplaces vencem por backlinks. FYMOOB precisa:
- Listar imóveis em diretórios (DiretórioImobiliário, Soluções Imóveis)
- Guest posts no blog do Sindico Net, GazetaMaringá, Tribuna PR (autoridade local)
- Ser fonte em matérias de imobiliário do G1 PR / Bem Paraná

#### 4.10 Pillar "Comprar Apartamento em Curitiba" (5000+ palavras)

Já existe `/comprar-imovel-curitiba`. Verificar se tem foco específico em apartamentos. Senão, criar `/comprar-apartamento-curitiba` (5000 palavras, 30+ subseções, internal links). Vira pillar pra capturar autoridade na vertical.

#### 4.11 Captura de empreendimentos como landing pages

MySide tem 18 H2 = 18 empreendimentos com landing dedicada. FYMOOB já tem `/empreendimento/[slug]`. Verificar:
- Quantos empreendimentos têm landing? (provavelmente <20)
- Quais empreendimentos populares de Curitiba ainda faltam? (criar landing rica mesmo sem ter o imóvel — ranquear por intenção de pesquisa)

### 🔵 P3 — Backlog (longo prazo / opcional)

- Vídeos com schema `VideoObject` por tour de apartamento
- Calculadora de financiamento embutida com `SoftwareApplication` schema
- Página de "Mercado imobiliário Curitiba 2026" com dados FipeZAP atualizados mensalmente

---

## 5. Estimativa de impacto

| Ação | Impacto SERP esperado | Tempo dev | ROI |
|---|---|---|---|
| FAQPage + 8 Q&A | +5-15 posições | 2h | Alto |
| Apartment schema | +3-8 posições + rich result | 3h | Alto |
| H1 com número | +1-3 posições + CTR +5-10% | 30min | Médio |
| Bloco SEO 1000 palavras | +5-10 posições | 4h | Alto |
| Bairros 6→15 | +autoridade nas combos | 1h | Médio |
| AggregateRating | Rich result com estrelas (CTR +20%) | 4h | Alto |
| Pillar 5000 palavras | +10-25 posições em 3-6 meses | 12h | Muito alto |

**Estimativa conjunta:** com P0 + P1 implementados, FYMOOB pode entrar **top 10 em 60-90 dias** pra "apartamentos curitiba" (queries cauda média). Top 5 só com autoridade construída ao longo de 6-12 meses (P2 + backlinks).

**Cauda longa** ("apartamentos batel curitiba", "apartamento [empreendimento]", "apartamento 2 quartos portão"): **top 3 em 30-60 dias** com P0 implementado, porque concorrentes regionais nesses bairros são ainda mais fracos.

---

## 6. Conclusão estratégica

**A boa notícia:** dos 7 sites no top SERP, apenas **1 é tecnicamente forte (MySide)**, **3 são marketplaces gigantes inalcançáveis no curto prazo (Viva Real, ZAP, Imovelweb)**, e **3 imobiliárias regionais (Apolar, JBA, Isidório, Razzi) têm fraquezas técnicas graves** que podem ser exploradas.

**A estratégia certa:**
1. Focar em **cauda média/longa** (bairro+tipo, empreendimento) onde marketplaces não dominam
2. Implementar **P0 inteiro essa semana** — ganho rápido
3. **Construir autoridade local** ao longo de 6 meses (backlinks, pillar content, blog dense)
4. **Não tentar bater marketplaces de cara** — bater regionais primeiro (Apolar/JBA/Isidório) e ir subindo
