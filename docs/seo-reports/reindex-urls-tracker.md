# Re-Indexação — Tracker vivo

> **Documento vivo.** Atualizar in-place conforme URLs vão sendo aceitas no GSC ou
> novos lotes entram na fila.
> **Domínio:** fymoob.com.br · **Property GSC:** sc-domain:fymoob.com.br
> **Última atualização:** 2026-05-04

---

## Como funciona a fila

Pipeline GSC → SERP tem 4 etapas com tempos próprios (ver
`reference_serp_update_timing.md`):

1. **Request Indexing** → enfileira recrawl (imediato)
2. **Recrawl** → Google baixa HTML novo (24–72h)
3. **Reindex** → conteúdo novo entra no índice (dias após o recrawl)
4. **SERP refresh** → title/description novo aparece (**7–21 dias após o reindex**)

Reindex no GSC NÃO atualiza snippet/title automaticamente — só enfileira
recrawl. O serving pipeline tem cache próprio com TTL próprio.

### Quota GSC URL Inspection

Google nunca publicou limite oficial. Submeter no ritmo — quando bate teto, o
GSC retorna `Quota exceeded` **explicitamente**, sem falha silenciosa. Cota
varia por site/autoridade. Observações históricas:

| Data | Aceitas | Bloqueio na |
|---|---|---|
| 30/04/2026 | 9 | 10ª |
| 01/05/2026 | ~10 | — (parou voluntariamente) |
| 03/05/2026 | 11 | 12ª |

Não racionar artificialmente em "X URLs/dia".

### 4 abordagens combinadas

| Abordagem | Velocidade | Capacidade | Quem cobre |
|---|---|---|---|
| **A. Sitemap re-submit (GSC)** | Lento (1-7 dias) | ilimitado | Google |
| **B. Request Indexing manual (GSC)** | Rápido (24-48h) | quota dinâmica | Google |
| **C. IndexNow batch** (`scripts/indexnow-batch.mjs`) | Imediato | 10k/dia | Bing+Yandex (Google ignora) |
| **D. Indexing API (Google)** | Imediato | 200/dia | Só funciona pra `JobPosting`/`BroadcastEvent` — NÃO usar |

Setup IndexNow já está pronto: chave em `public/d7ce36f0…txt`,
script `scripts/indexnow-batch.mjs` lê os 4 shards de `/sitemap/N.xml` e
dispara em batches de 500. Roda em ~30s.

---

## Pendentes (em ordem de prioridade)

### 🔴 P0 — Reserva Barigui (URLs novas + redesign massivo) [6 URLs]

URLs criadas/transformadas pelos commits `73ae50e` → `7ca498c` (Sprint A/B/B'
+ redesign premium). Maior risco: 3 URLs novas que o Google ainda não viu.

| # | URL | Status | Mudança |
|---|---|---|---|
| 1 | `/empreendimento/reserva-barigui` | refresh | Sprint A (title+schema+plantas) + Sprint B (cluster+containsPlace) + redesign premium completo (5 commits design) |
| 2 | `/empreendimento/reserva-barigui/lago` | **URL nova** | Landing dedicada B' — 6 unidades filtradas (studios+1-2q+duplex) |
| 3 | `/empreendimento/reserva-barigui/colina` | **URL nova** | Landing dedicada B' — 3 unidades (4q grandes, inclui órfão do typo) |
| 4 | `/empreendimento/reserva-barigui/mirante` | **URL nova** | Landing dedicada B' — 2 unidades comerciais |
| 5 | `/empreendimento/reserva-bairgui` | typo canonical | Google precisa ler `<link rel="canonical">` apontando ao slug correto |
| 6 | `/imoveis/mossungue` | refresh | Bloco novo "Empreendimentos no Mossunguê" (Sprint B.T) |

### 🟠 P1 — Blogs revisados (2ª rodada português) [4 URLs]

Da 2ª rodada (commits `29dfcc2` → `b617900`). Ficaram fora do batch de 03/05
quando bateu cota.

| # | URL | Imp/3m GSC | Mudança |
|---|---|---|---|
| 7 | `/blog/melhores-bairros-curitiba-2026` | 0 | Ahú rentabilidade harmonizada + caveats SESP-PR |
| 8 | `/blog/batel-vs-agua-verde-curitiba` | 96 | correção factual saúde (Pilar fora Água Verde) + FAQ corrigida |
| 9 | `/blog/custo-de-vida-curitiba` | 421 | IPS markdown corrigido + "única capital" suavizado + UPA 24h |
| 10 | `/blog/ecoville-vs-bigorrilho-curitiba` | 2 | Everest #5 ENEM corrigido + HNSG sem números fabricados |

### 🟡 P2 — Empreendimentos top (Tier 2 original) [40 URLs]

Sessão B aplicou bloco SEO de 1000 palavras + AggregateOffer schema (commit
`6c418d8`). Ainda sem reindex manual.

Lista priorizada por impressões GSC. Submeter em qualquer ordem; cota dinâmica.

```
augen, ecoa-residencial, residencial-canto-do-uirapuru, equi, ambar-rplk,
nova-europa-i, liv-in, amaz, condominio-cidade-de-pavia,
residencial-sunset-agua-verde-5, essence, reserva-colina,
residencial-sunset-agua-verde-6, residencial-kuara, ed-maria-ines,
joy-city-habitat, chateau-latour, trebbiano-residencial, atlan, kaa,
mai-home, residencial-moradas-do-bosque, casa-nomaa, vitoria-regia,
portao-prime-residence, bosque-nativo, residencial-santo-amaro,
residencial-village-parana, condominio-studio-park-ii, colinas-do-norte,
braz-haus, trevi-batel, orfeu, residencial-mykonos, palm-235,
ilha-do-arvoredo, edificio-dom-antonio, le-monde, reserva-barigui (já em P0),
edificio-torre-sete-de-setembro
```

> ⚠️ `reserva-colina` aqui é o **nome de outro empreendimento**, não a sub-rota
> P0 `/reserva-barigui/colina`. Manter os dois.

Prefixo: `https://fymoob.com.br/empreendimento/<slug>`.

### 🟢 P3 — Landings top (Tier 3 original) [10 URLs]

Bairros + tipo+finalidade com >5 impressões. Recebem descriptions
enriquecidas (Sessão A).

| # | URL | Imp |
|---|---|---|
| 1 | `/imoveis/centro` | 21 |
| 2 | `/imoveis/boqueirao` | 18 |
| 3 | `/imoveis/portao` | 16 |
| 4 | `/imoveis/campo-de-santana/terrenos` | 15 |
| 5 | `/casas-curitiba/aluguel` | 12 |
| 6 | `/imoveis/agua-verde` | 8 |
| 7 | `/apartamentos-curitiba/aluguel` | 7 |
| 8 | `/imoveis/cidade-industrial` | 7 |
| 9 | `/imoveis/capao-raso/venda` | 6 |

`/imoveis/mossungue` (imp 8) já está em P0.

### ⚪ P4 — IndexNow batch (todas as ~600 URLs) [1 comando]

Roda em paralelo, sem conflito de cota GSC:

```bash
INDEXNOW_DRY=1 node scripts/indexnow-batch.mjs   # dry-run (imprime)
node scripts/indexnow-batch.mjs                  # dispara real
```

Lê os 4 shards `/sitemap/N.xml` em prod, dispara em batches de 500. Bing
aceita pings idempotentes. Google ignora (mas cobre Bing+Yandex,
~6-30% do tráfego BR dependendo da fonte).

---

## Sitemaps no GSC (Tier 0) — ✅ FEITO

> ⚠️ **Next 16 NÃO gera `/sitemap.xml` index** — apenas shards individuais
> (ver `src/app/robots.ts:5-9`). Submeter `/sitemap.xml` retorna "Não foi
> possível buscar". Se aparecer entrada broken no GSC, **remover manualmente**.

```
https://fymoob.com.br/sitemap/0.xml  → 248 imóveis
https://fymoob.com.br/sitemap/1.xml  → 188 bairros + combos
https://fymoob.com.br/sitemap/2.xml  →  30 blog/guias
https://fymoob.com.br/sitemap/3.xml  → 122 estáticas + empreendimentos
                                        ─────
                                        588 URLs total
```

Status: ✅ Submetidos 01/05/2026 via MCP `mcp__gsc__submit_sitemap`.

---

## Histórico (URLs já aceitas)

### ✅ 26/04/2026 — 5 URLs (Tier 1 inicial pós-reescrita 15 posts)

`/blog/financiamento-caixa-itau-bradesco-comparativo` (indexed 21:47
confirmado via GSC API, status PASS) ·
`/blog/custo-de-vida-curitiba` ·
`/blog/como-financiar-minha-casa-minha-vida` ·
`/blog/batel-vs-agua-verde-curitiba` ·
`/blog/melhores-bairros-familias-curitiba`

### ✅ 30/04/2026 — 9 URLs (10ª recusada por cota)

`/blog/apartamento-ou-casa-curitiba` ·
`/blog/checklist-compra-imovel` ·
`/blog/documentos-comprar-imovel-curitiba` ·
`/blog/ecoville-vs-bigorrilho-curitiba` ·
`/blog/imovel-planta-vs-pronto-curitiba` ·
`/blog/itbi-curitiba-valor-como-pagar` ·
`/blog/melhores-bairros-curitiba-2026` ·
`/blog/mercado-imobiliario-curitiba-2026` ·
`/blog/preco-metro-quadrado-curitiba-bairro`

### ✅ 01/05/2026 — 10 URLs Tier 1 (Dia 1 pós Sessões A/B/C)

10 das 17 URLs do Tier 1 original (15 blog + 2 landings estratégicas).
Inclui as 2 landings comerciais `/apartamentos-curitiba` (Sessão A com
AggregateOffer + RealEstateAgent + tabela bairros) e `/comprar-apartamento-curitiba`
(pillar 4400 palavras + HowTo schema 12 steps).

> ⚠️ **Bug FAQPage duplicado** nos 8 blog posts (commit `8780389` corrigiu).
> Próximo crawl natural já pega HTML corrigido — não precisa re-submeter.

### ✅ 02/05/2026 — 7 URLs Tier 1 (Dia 2)

`/blog/itbi-curitiba-valor-como-pagar` ·
`/blog/imovel-planta-vs-pronto-curitiba` ·
`/blog/documentos-comprar-imovel-curitiba` ·
`/blog/quanto-custa-morar-batel-curitiba` ·
`/blog/ecoville-vs-bigorrilho-curitiba` ·
`/blog/apartamento-ou-casa-curitiba` ·
`/blog/melhores-bairros-curitiba-2026`

### ✅ 03/05/2026 — 11 URLs (12ª recusada por cota)

Pós 2ª rodada de revisão de português dos 15 blogs:
`/blog/checklist-compra-imovel` ·
`/blog/como-financiar-minha-casa-minha-vida` ·
`/blog/documentos-comprar-imovel-curitiba` ·
`/blog/imovel-planta-vs-pronto-curitiba` ·
`/blog/itbi-curitiba-valor-como-pagar` ·
`/blog/quanto-custa-morar-batel-curitiba` ·
`/blog/apartamento-ou-casa-curitiba` ·
`/blog/mercado-imobiliario-curitiba-2026` ·
`/blog/melhores-bairros-familias-curitiba` ·
`/blog/financiamento-caixa-itau-bradesco-comparativo` ·
`/blog/preco-metro-quadrado-curitiba-bairro`

---

## Como validar progresso

### 7 dias após batch (próxima janela: 11/05/2026)

```bash
mcp__gsc__check_indexing_issues --site fymoob.com.br
mcp__gsc__get_sitemaps --site fymoob.com.br
```

### 14 dias após batch (15-17/05/2026)

```bash
mcp__gsc__compare_search_periods \
  --site fymoob.com.br \
  --period_a 2026-04-15..2026-04-28 \
  --period_b 2026-05-04..2026-05-17
```

**Targets esperados:**
- Páginas com ≥1 impressão: 122 → 250+
- Cliques/mês total: 580 → 800-1.100
- CTR médio blog: 0,13% → 1,5%+
- Posição média top blog posts: 5-12 → 3-8
- Reserva Barigui: top 20 pra "reserva barigui" puro, 50+ imp/mês na URL hub

### 30 dias após batch (~04/06/2026)

```bash
python scripts/seo-gaps-audit.py --all
# Comparar com docs/seo-reports/2026-04-30-page-gaps-audit.md
```

---

## Resumo executivo

| Tier | URLs | Status |
|---|---|---|
| Sitemaps | 4 | ✅ feito 01/05 via MCP |
| P0 — Reserva Barigui (URLs novas + redesign) | 6 | ⏳ enviar primeiro |
| P1 — Blogs 2ª rodada | 4 | ⏳ enviar |
| P2 — Empreendimentos top | 40 (-1 já em P0) | ⏳ enviar |
| P3 — Landings top | 9 (-1 já em P0) | ⏳ enviar |
| P4 — IndexNow batch | ~600 | ⏳ rodar `node scripts/indexnow-batch.mjs` |
| **TOTAL pendente** | **59 URLs no GSC + IndexNow** | — |

**ROI estimado** (precedente real estate): +220-540 cliques/mês orgânicos em
4-8 semanas após reindex completo (SEOPressor +220% CTR pós-rewrite, Schema
App +18% CTR pós-FAQ).
