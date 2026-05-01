# Queries-alvo Top 10 — Mapeamento + Plano de Enriquecimento

**Data:** 2026-05-01
**Contexto:** análise SERP live + audit FYMOOB vs concorrentes "inferiores"
que estão rankeando à frente

---

## Resumo executivo

**Achado bombástico:** os concorrentes regionais que estão no top 10 SERP
de "apartamentos curitiba" têm **conteúdo SEO muito pior que FYMOOB** —
mas vencem por **fatores fora-do-conteúdo** (Domain Authority, backlinks,
histórico, local citations, catálogo maior).

| Concorrente | Conteúdo editorial | FAQ | Schema | Catálogo Batel | Posição SERP |
|---|---|---|---|---|---|
| Casa Prates | **0 palavras** | ❌ | ❌ | 21 ap | Top 10 |
| JBA Imóveis | 150-200 palavras | ❌ | ❌ | — | Top 10 |
| Apolar | (Vue SPA, bloqueou WebFetch) | ? | ? | — | Top 10 |
| **FYMOOB `/apartamentos-curitiba`** | **2.800 palavras** | **8 Q&A** | **3 schemas (BreadcrumbList + RealEstateListing + FAQPage)** | **120 total** | **fora top 50** |
| **FYMOOB `/imoveis/batel`** | ~500 palavras | 5 Q&A | (não detectado) | 8 ap | fora top 50 |

**Conclusão:** FYMOOB tem on-page SEO **muito superior**. O gap é off-page
(DR, backlinks, citations) + catálogo + idade do domínio. A boa notícia:
on-page já está pronto pra rankear quando trust signals subirem.

---

## 1. Mapa de queries-alvo prioridade

### Queries comerciais transacionais (alta intenção, alto volume)

**Status FYMOOB hoje:** 0 impressões em todas (top 100+ não-existente)

| Query | Volume estimado/mês | URL FYMOOB-alvo | Status URL | Top 3 SERP atual |
|---|---|---|---|---|
| `apartamento curitiba` | 8-15k | `/apartamentos-curitiba` | ✅ existe, 2.800 pal | ZAP, VivaReal, Imovelweb |
| `apartamento à venda curitiba` | 5-10k | `/apartamentos-curitiba/venda` | ✅ existe | Chaves na Mão, VivaReal, OLX |
| `apartamento para comprar curitiba` | 3-5k | `/comprar-apartamento-curitiba` (pillar) | ✅ existe, 4400 pal | Chaves na Mão, VivaReal, Imovelweb |
| `apartamento curitiba batel` | 1-3k | `/imoveis/batel/apartamentos` | ✅ existe, ~500 pal | Imovelweb, VivaReal, Chaves |
| `apartamentos curitiba` | 3-5k | `/apartamentos-curitiba` | ✅ existe | Chaves, Imovelweb, ZAP |
| `apartamento aluguel curitiba` | 5-10k | `/apartamentos-curitiba/aluguel` | ⚠️ thin (280 pal) | Imovelweb, Chaves, ZAP |
| `casa à venda curitiba` | 5-10k | `/casas-curitiba/venda` | ✅ existe | VivaReal, Imovelweb, OLX |
| `imobiliária curitiba` | 2-5k | ❌ falta | **PÁGINA NOVA** | JBA, Casa Prates, Habitec |
| `imobiliária em curitiba` | 1-3k | ❌ falta | **PÁGINA NOVA** | JBA, Casa Prates, Habitec |

### Queries por número de quartos (medium intent, medium volume)

| Query | Volume estimado/mês | URL FYMOOB-alvo | Status |
|---|---|---|---|
| `apartamento 2 quartos curitiba` | 1-3k | ❌ | **FALTA** |
| `apartamento 3 quartos curitiba` | 1-2k | ❌ | **FALTA** |
| `apartamento 1 quarto curitiba` | 500-1k | ❌ | **FALTA** |
| `apartamento 4 quartos curitiba` | 200-500 | ❌ | nicho |

### Queries por estágio (medium intent)

| Query | URL FYMOOB | Status |
|---|---|---|
| `apartamentos novos curitiba` | ❌ (mas tem `/lancamentos`) | **FALTA slug otimizado** |
| `apartamentos prontos curitiba` | ❌ | **FALTA** |
| `apartamento na planta curitiba` | ❌ | **FALTA** |
| `apartamento mobiliado curitiba` | ❌ | nicho |

### Queries informacionais — onde FYMOOB JÁ rankeia ✅

> Long-tail funcionando! Blog posts criados em fases anteriores estão no
> top 10 dessas queries (mesmo sem clicks ainda — falta o re-index).

| Query | Posição GSC | URL |
|---|---|---|
| `melhores bairros para comprar apartamento pronto curitiba 2026` | **2** | `/blog/melhores-bairros-curitiba-2026` |
| `diferença preço apartamento novo usado curitiba 2025 2026` | **3** | `/blog/mercado-imobiliario-curitiba-2026` |
| `mercado imobiliário curitiba 2026` | **3.5** | `/blog/mercado-imobiliario-curitiba-2026` |
| `melhor região para comprar casa em curitiba 2026` | **4** | `/blog/mercado-imobiliario-curitiba-2026` |
| `apartamentos financiados com entrada baixa` | 4 | `/blog/financiamento-caixa-itau-bradesco-comparativo` |
| `melhores bairros para morar em curitiba 2026` | 4 | `/blog/melhores-bairros-curitiba-2026` |
| `valor médio metro quadrado apartamento curitiba 2026` | 6-8 | `/blog/preco-metro-quadrado-curitiba-bairro` |

**Padrão claro:** queries long-tail com "2026" + intenção informacional
→ blog posts vencem com FAQ + dados específicos. Reforça que o
investimento de Sessão C foi correto.

---

## 2. Audit detalhado das páginas-alvo FYMOOB

### A) `/apartamentos-curitiba` — landing principal
**Estado:** ✅ ROBUSTA (gap é só re-index)

| Métrica | Valor | Vs concorrente top 10 |
|---|---|---|
| Title | "120 Apartamentos à Venda e Aluguel em Curitiba \| FYMOOB Imobiliária" | ✅ rico |
| H1 | "120 Apartamentos à Venda e Aluguel em 13+ Bairros de Curitiba" | ✅ count |
| Conteúdo editorial | 2.800 palavras (LandingSEOContent) | ✅ 100x melhor que Casa Prates (0) |
| H2/H3 | 8 H2 + 7 H3 | ✅ estrutura completa |
| FAQ | 8 Q&A com FipeZAP/IBGE/Caixa | ✅ rich snippet ready |
| Schemas | BreadcrumbList + RealEstateListing + FAQPage | ✅ |
| Cross-linking | 13+ bairros + tipos + faixas preço | ✅ |
| GSC impressões 28d | **2 (só brand)** | ❌ não rankeando |

**Diagnóstico:** Página perfeita, mas Google ainda não re-crawleou pós-Sessão A.
**Ação:** Tier 1 reindex (já no plano).

### B) `/comprar-apartamento-curitiba` — pillar 4400 palavras
**Estado:** ✅ MUITO ROBUSTA (gap é só re-index)

| Métrica | Valor |
|---|---|
| H1 | "Comprar Apartamento em Curitiba — Guia Definitivo 2026" |
| H2 principais | 12 (panorama, why, escolha, 20 bairros, planta vs pronto, financiamento, ITBI, docs, visita, pós-compra, armadilhas, dicas) |
| FAQ | 11 Q&A |
| Internal links | 8+ bairros + tipos |
| GSC 28d | **2 (só brand)** |

**Diagnóstico:** Pillar excelente, criada 30/04 (1 dia útil). Re-index urgente.
**Ação:** Tier 1 reindex (já no plano).

### C) `/imoveis/batel` (e bairros similares)
**Estado:** 🟡 BOA mas pode ser melhor

| Métrica | Valor |
|---|---|
| Title | "8 Imóveis no Batel, Curitiba" |
| H1 | "Imóveis no Batel" |
| Conteúdo editorial | ~500 palavras |
| FAQ | 5 Q&A |
| Schemas | BreadcrumbList + RealEstateListing (FAQPage não confirmado) |
| Catálogo | 8 imóveis vs Casa Prates 21 (Batel) |

**Gaps específicos identificados:**
1. **Texto editorial sobre o bairro pouco profundo** — Batel merece 1500+ palavras (perfil de morador, atrações, escolas, transporte, gastronomia, valorização histórica)
2. **Tabela de preços por número de quartos** — adicionar dados FipeZAP do Batel
3. **Mapa do bairro** — schema `Place` + descrição georreferenciada
4. **Catálogo pequeno** — agregar empreendimentos lançamento/revenda na mesma listagem

### D) `/apartamentos-curitiba/aluguel` — THIN CONTENT 🔴
**Estado:** ❌ FRACO

| Métrica | Valor |
|---|---|
| Title | "Apartamentos para Alugar em Curitiba \| FYMOOB Imobiliária" |
| H1 | "Apartamentos para Alugar em Curitiba" |
| Conteúdo editorial | **280-320 palavras** (sem LandingSEOContent dedicado pra aluguel) |
| FAQ | 4 Q&A |
| Catálogo | 3 apartamentos só |
| Schemas | (não confirmados) |

**Gaps críticos:**
1. Falta `LandingSEOContent` adaptado pra aluguel (texto sobre garantias, contratos, IPTU inquilino, perfil de busca, mercado de aluguel Curitiba)
2. FAQ de aluguel precisa cobrir: caução vs fiador vs seguro fiança, vistoria entrada/saída, IGPM vs IPCA reajuste, prazo contrato
3. Cross-linking pra `/casas-curitiba/aluguel`, `/imoveis/[bairro]/aluguel`

**Já documentado em Fase 19.P2.D.1.**

---

## 3. Páginas que faltam (programmatic SEO opportunities)

> Cada uma dessas é potencial de top 10 em 6-12 meses se on-page for tão
> robusto quanto `/apartamentos-curitiba` atual.

### Categoria 1 — Slugs específicos por intenção

| URL nova | Query-alvo | Esforço | Prioridade |
|---|---|---|---|
| `/imobiliaria-curitiba` | "imobiliária curitiba" + variações | 4-6h | 🔴 P0 (queries com 2-5k vol/mês, top 10 viável) |
| `/apartamentos-novos-curitiba` | "apartamentos novos curitiba" | 2-3h | 🟡 P1 |
| `/apartamentos-prontos-curitiba` | "apartamentos prontos" | 2-3h | 🟡 P1 |
| `/apartamento-na-planta-curitiba` | "apartamento na planta curitiba" | 2-3h | 🟡 P1 |

### Categoria 2 — Por número de quartos

| URL nova | Query-alvo | Esforço |
|---|---|---|
| `/apartamentos-2-quartos-curitiba` | "apartamento 2 quartos curitiba" | 3h |
| `/apartamentos-3-quartos-curitiba` | "apartamento 3 quartos curitiba" | 3h |
| `/apartamentos-1-quarto-curitiba` | "apartamento 1 quarto" + studio | 3h |

### Categoria 3 — Slugs duplicados pra capturar variações

> Google às vezes prefere URL exact-match ao texto do title.
> Ex: `/apartamento-a-venda-curitiba` capturaria query exata sem hífen.

Pode usar `redirect()` em Next pra apontar variações ao mesmo conteúdo
canônico. Ex: `/apartamento-venda-curitiba` → 301 → `/apartamentos-curitiba/venda`.

**Decisão:** não criar redirects — priorizar páginas com conteúdo único.

---

## 4. Plano de enriquecimento (priorizado por ROI)

### Quick wins (2-4h cada, próximas 2 sessões)

**P0 — `/imobiliaria-curitiba` (NOVA)**
> Captura "imobiliária em curitiba" — top 10 dominado por concorrentes
> regionais (JBA, Casa Prates, Habitec, Kondor, Casa ao Lado, Tantus,
> Cibraco). NÃO TEM marketplace! Espaço pra entrar.

- Estrutura: 1500+ palavras, 8 H2:
  1. Sobre a FYMOOB (CRECI, fundação, equipe)
  2. Por que escolher FYMOOB (E-E-A-T)
  3. Bairros que atendemos (15+ bairros com link)
  4. Tipos de imóveis (apto, casa, sobrado, terreno, comercial)
  5. Como funciona (compra, venda, aluguel)
  6. Diferenciais (CRM ao vivo, schema rico, transparência)
  7. Depoimentos / Reviews GMN (quando Bruno reclamar)
  8. Como nos contatar
- Schema: `RealEstateAgent` + `LocalBusiness` + `FAQPage` 8 Q&A
- FAQ: tópicos típicos (CRECI, taxas, comissões, prazos)

**P0 — Enriquecer `/apartamentos-curitiba/aluguel`**
> Documentado em Fase 19.P2.D.1. Componente novo `LandingSEOContent`
> com variant `aluguel`.

### Médio prazo (4-6h cada)

**P1 — Programmatic landings por número de quartos**
- Template reutilizável `/apartamentos-{N}-quartos-curitiba`
- Conteúdo dinâmico baseado em estatísticas do CRM (média preço, áreas, bairros mais comuns)
- 1500+ palavras + 8 FAQ + schemas

**P1 — Enriquecer páginas de bairro (Batel, Bigorrilho, Ecoville top)**
- Aumentar editorial de 500 → 1500 palavras
- Adicionar tabela "Preço médio por quartos" com dados FipeZAP
- Mapa schema `Place`
- Aplicar primeiro nos 5 bairros com mais impressões GSC

### Longo prazo (off-page, 1-3 meses)

**P0 — Aumentar Domain Authority** (causa raiz dos rankings ruins)

1. **Backlinks de qualidade** — alvos:
   - Cartórios de Curitiba (parcerias institucionais)
   - Construtoras parceiras (link em release de empreendimento)
   - Blogs locais Curitiba (gazetadopovo.com.br, bemparana.com.br, tribunapr.com.br)
   - Diretórios setoriais (CRECI-PR, Sinduscon-PR)
   - Universidades (UFPR, PUC-PR podem listar imobiliárias parceiras)

2. **Local citations** — alvos:
   - Google Business Profile (Bruno precisa reclamar — Fase 19.16 BLOQUEADA)
   - Bing Places
   - Apple Maps Connect
   - Foursquare
   - Yelp
   - Páginas Amarelas digital

3. **Brand mentions** — alvos:
   - Imprensa local (release sobre cutover, sobre catálogo, sobre tecnologia do site)
   - Posts nas redes sociais
   - Grupos de WhatsApp Curitiba (compradores/vendedores)
   - Quora/Reddit responder dúvidas linkando blog posts

4. **Aumento de catálogo**
   - Bruno precisa cadastrar mais imóveis no CRM
   - Hoje: 248 ativos. Concorrentes regionais médios: 500-2000
   - Cada imóvel novo = 1 URL indexável + sinal de relevância

---

## 5. O que NÃO fazer

❌ **Criar páginas duplicadas** (ex: `/comprar-apartamento-curitiba-pr`,
`/apartamentos-pra-comprar-curitiba`) — dilui ranking e gera content
duplicate. Manter URL canônica + foco em fortalecer.

❌ **Stuffing keyword "apartamento" 50x na landing** — Google detecta e
penaliza. Densidade ideal é 0.5-1.5%.

❌ **Comprar backlinks** (PBN, link farms) — penalty quase certa após
update Spam Brain.

❌ **Esperar conteúdo "viralizar" sem distribuição** — sem backlinks +
sinais sociais, conteúdo bom fica invisível no top 50+.

---

## 6. Métricas de sucesso

### 30 dias (15/05 → 31/05/2026)

- ✅ Re-index Tier 1 + Tier 2 + Tier 3 completo (70 URLs)
- 🎯 `/apartamentos-curitiba` impressões: 2 → 50+ (qualquer aparição não-brand)
- 🎯 `/comprar-apartamento-curitiba` impressões: 2 → 100+
- 🎯 1+ query comercial (apartamento*curitiba) com posição < 50

### 60 dias (15/05 → 30/06/2026)

- 🎯 `/apartamentos-curitiba` em posição 30-50 pra "apartamentos curitiba"
- 🎯 1+ landing de bairro em top 30 pra "apartamento {bairro} curitiba"
- 🎯 Pillar `/comprar-apartamento-curitiba` em top 20 pra "comprar apartamento curitiba"
- 🎯 `/imobiliaria-curitiba` (nova) em top 30 pra "imobiliária em curitiba"

### 6 meses (até 01/11/2026)

- 🎯 Top 10 em **pelo menos 3 queries comerciais** (mais provável: queries de bairro específico onde concorrência é menor)
- 🎯 Top 20 em "apartamentos curitiba" (genérica)
- 🎯 DR de fymoob.com.br: 5-15 → 25-35

---

## 7. Próximas ações concretas

### Esta semana (Vinicius)

1. ✅ Hoje (01/05) — Re-index Tier 1 (em andamento, 6/15 done)
2. 🔄 Amanhã (02/05) — Continuar Tier 1 + adicionar 2 estratégicas
3. 📅 03-08/05 — Tier 2 (40 empreendimentos) + Tier 3 (10 landings)
4. 📅 09/05 — Criar `/imobiliaria-curitiba` (P0, 4-6h)
5. 📅 12/05 — Enriquecer `/apartamentos-curitiba/aluguel` (Fase 19.P2.D.1)

### Esta semana (Bruno)

1. 🚨 **Reclamar GMN** (desbloqueia AggregateRating + local signals)
2. 🚨 **Configurar geo-targeting Brasil no GSC** (2 min, remove ruído US)
3. 📞 Pedir backlink de pelo menos 1 parceiro (financiadora, construtora, cartório)
4. 📋 Cadastrar mais imóveis no CRM (cada 10 novos = 10 URLs novas + sinal)

### Próximas 2 semanas

1. Programmatic landings por quartos (3 páginas, 9-12h dev)
2. Enriquecer bairros top (Batel, Bigorrilho, Ecoville — 6h dev)
3. Verificar deltas GSC (15/05 — comparar pré-Sessão A/B/C)

---

## Sources

- [GSC data 28 dias — fymoob.com.br](https://search.google.com/search-console)
- [Casa Prates Batel page audit](https://casaprates.com.br/comprar/apartamento/curitiba/batel/)
- [JBA Imóveis Curitiba](https://jbaimoveis.com.br/venda/apartamento/curitiba/com-vaga/)
- [SERP "apartamento curitiba"](https://www.google.com/search?q=apartamento+curitiba)
- [SERP "imobiliária em curitiba"](https://www.google.com/search?q=imobiliaria+em+curitiba)
- `docs/seo-reports/2026-04-30-page-gaps-audit.md` (audit interno 588 URLs)
- `docs/seo-reports/2026-05-01-fase19-p2-summary.md` (Sessões A/B/C)
- `docs/seo/competitor-analysis-curitiba-2026-04-30.md` (análise prévia 7 concorrentes)
