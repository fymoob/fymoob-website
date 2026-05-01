# URLs para Re-indexação no Google — Pós Fase 19.P2

**Data:** 2026-05-01
**Contexto:** 545 páginas modificadas em 3 commits (Sessões A/B/C). Google
precisa re-crawlear pra capturar titles, descriptions e schemas novos.
**Domínio:** fymoob.com.br
**Property GSC:** sc-domain:fymoob.com.br

---

## Estratégia de re-indexação

GSC "Request Indexing" tem **limite de ~10-15 URLs/dia** por property. Pra 545
URLs essa via sozinha levaria 36+ dias. Combinar 4 abordagens:

| Abordagem | Velocidade | Capacidade | Quando usar |
|---|---|---|---|
| **A. Sitemap re-submit (GSC)** | Lento (1-7 dias pra crawl) | ilimitado | Sempre — base |
| **B. Request Indexing manual (GSC)** | Rápido (24-48h) | 10-15/dia | URLs Tier 1 (alta prioridade) |
| **C. IndexNow API (Bing+Yandex)** | Imediato | 10k/dia | Todas as URLs (Bing complementa) |
| **D. Indexing API (Google)** | Imediato | 200/dia | Não recomendado — só JobPosting/Event oficialmente |

**Plano recomendado:**
1. Hoje — Re-submeter sitemaps no GSC (5 min, A)
2. Hoje — Request Indexing manual nos 15 Tier 1 (B)
3. Hoje — Disparar IndexNow pra todas as 545 URLs (C, 1 comando)
4. Próximos 7 dias — Request Indexing pros 110 empreendimentos em batches de 10/dia (B)
5. 14/05/2026 — Verificar GSC: comparar páginas indexadas + cliques

---

## Tier 1 — URGENTE (17 URLs: 15 blog + 2 landings estratégicas)

> **Maior delta de conteúdo** (FAQ schema novo + title + description +
> 2 landings principais com Sessão A/Q.bonus).
> **Ação:** GSC > URL Inspection > Request Indexing — 1 a 1.

### Progresso

- ✅ **Dia 1 (01/05/2026):** 10 URLs indexadas
- 🔄 **Dia 2 (02/05/2026):** continuar com 7 URLs restantes
- 📊 Status: **10/17 (59%)**

### ✅ Indexadas Dia 1 (01/05/2026, 10 URLs)

| # | URL | Imp/3m (GSC) | Mudança |
|---|---|---|---|
| 1 | https://fymoob.com.br/blog/financiamento-caixa-itau-bradesco-comparativo | 790 | FAQ + desc |
| 2 | https://fymoob.com.br/blog/custo-de-vida-curitiba | 421 | FAQ + desc |
| 3 | https://fymoob.com.br/blog/preco-metro-quadrado-curitiba-bairro | 41 | FAQ + desc |
| 4 | https://fymoob.com.br/blog/batel-vs-agua-verde-curitiba | 96 | FAQ |
| 5 | https://fymoob.com.br/blog/como-financiar-minha-casa-minha-vida | 84 | **TITLE 86→47 chars** + FAQ + desc |
| 6 | https://fymoob.com.br/blog/mercado-imobiliario-curitiba-2026 | 49 | FAQ |
| 7 | **https://fymoob.com.br/apartamentos-curitiba** | **2 (só brand)** | **TITLE Sessão A + AggregateOffer + RealEstateAgent + tabela bairros** |
| 8 | **https://fymoob.com.br/comprar-apartamento-curitiba** | **2 (só brand)** | **PILLAR 4400 pal + HowTo schema 12 steps + 19 links inline + RealEstateAgent** |
| 9 | https://fymoob.com.br/blog/melhores-bairros-familias-curitiba | 18 | FAQ + desc |
| 10 | https://fymoob.com.br/blog/checklist-compra-imovel | 11 | FAQ |

> ⚠️ **Bug FAQPage duplicado nos 8 blog posts (commit `8780389` corrige):**
> Os blog posts indexados HOJE (01/05) ainda tinham 2 schemas FAQPage
> idênticos no HTML antes do fix. GSC mostrou erro "FAQPage duplicado"
> em `/blog/financiamento-caixa-itau-bradesco-comparativo`. **Fix
> deployed em `8780389`** — próximo crawl natural do Google (3-7d) já
> vai pegar HTML corrigido. **Não precisa re-submeter** essas 8 URLs
> manualmente. Se quiser acelerar: re-submeter pós-deploy gasta cota
> mas faz Google revalidar em 24-48h.
>
> **As 2 landings (#7, #8) NÃO foram afetadas** — bug era específico
> do template `/blog/[slug]/page.tsx`.

### 🔄 Pendentes pra Dia 2 (02/05/2026, manhã)

| # | URL | Imp/3m (GSC) | Mudança |
|---|---|---|---|
| 11 | https://fymoob.com.br/blog/itbi-curitiba-valor-como-pagar | 7 | FAQ |
| 12 | https://fymoob.com.br/blog/imovel-planta-vs-pronto-curitiba | 5 | FAQ + desc |
| 13 | https://fymoob.com.br/blog/documentos-comprar-imovel-curitiba | 5 | **TITLE 61→43 chars** + FAQ + desc |
| 14 | https://fymoob.com.br/blog/quanto-custa-morar-batel-curitiba | 4 | FAQ |
| 15 | https://fymoob.com.br/blog/ecoville-vs-bigorrilho-curitiba | 2 | FAQ |
| 16 | https://fymoob.com.br/blog/apartamento-ou-casa-curitiba | 2 | FAQ + desc |
| 17 | https://fymoob.com.br/blog/melhores-bairros-curitiba-2026 | 0 | FAQ + desc |

> **Cota observada:** ~10 URLs/dia (alinhado com limite teórico Google
> 10-15). Os 7 restantes cabem em 1 dia.

---

## Tier 2 — Alta prioridade (~6 URLs/dia, ~7 dias)

> ⚠️ **Cota real ~6/dia** (observada no Dia 1). Cronograma original
> de 10/dia ajustado: Tier 2 leva ~7 dias em vez de 4.

> Top 40 empreendimentos por impressões/posição GSC. Ganhou bloco SEO de
> 1000 palavras + AggregateOffer schema. Posicionamento médio 5-25 →
> bloco rico empurra pra primeira página.

### Dia 1 (top 10 por impressões)

| # | URL | Imp |
|---|---|---|
| 1 | https://fymoob.com.br/empreendimento/augen | 16 |
| 2 | https://fymoob.com.br/empreendimento/ecoa-residencial | 14 |
| 3 | https://fymoob.com.br/empreendimento/residencial-canto-do-uirapuru | 13 |
| 4 | https://fymoob.com.br/empreendimento/equi | 13 |
| 5 | https://fymoob.com.br/empreendimento/ambar-rplk | 11 |
| 6 | https://fymoob.com.br/empreendimento/nova-europa-i | 11 |
| 7 | https://fymoob.com.br/empreendimento/liv-in | 10 |
| 8 | https://fymoob.com.br/empreendimento/amaz | 8 |
| 9 | https://fymoob.com.br/empreendimento/condominio-cidade-de-pavia | 7 |
| 10 | https://fymoob.com.br/empreendimento/residencial-sunset-agua-verde-5 | 7 |

### Dia 2

| # | URL | Imp |
|---|---|---|
| 11 | https://fymoob.com.br/empreendimento/essence | 7 |
| 12 | https://fymoob.com.br/empreendimento/reserva-colina | 6 |
| 13 | https://fymoob.com.br/empreendimento/residencial-sunset-agua-verde-6 | 6 |
| 14 | https://fymoob.com.br/empreendimento/residencial-kuara | 6 |
| 15 | https://fymoob.com.br/empreendimento/ed-maria-ines | 5 |
| 16 | https://fymoob.com.br/empreendimento/joy-city-habitat | 5 |
| 17 | https://fymoob.com.br/empreendimento/chateau-latour | 4 |
| 18 | https://fymoob.com.br/empreendimento/trebbiano-residencial | 4 |
| 19 | https://fymoob.com.br/empreendimento/atlan | 4 |
| 20 | https://fymoob.com.br/empreendimento/kaa | 4 |

### Dia 3

| # | URL | Imp |
|---|---|---|
| 21 | https://fymoob.com.br/empreendimento/mai-home | 4 |
| 22 | https://fymoob.com.br/empreendimento/residencial-moradas-do-bosque | 4 |
| 23 | https://fymoob.com.br/empreendimento/casa-nomaa | 3 |
| 24 | https://fymoob.com.br/empreendimento/vitoria-regia | 3 |
| 25 | https://fymoob.com.br/empreendimento/portao-prime-residence | 3 |
| 26 | https://fymoob.com.br/empreendimento/bosque-nativo | 2 |
| 27 | https://fymoob.com.br/empreendimento/residencial-santo-amaro | 2 |
| 28 | https://fymoob.com.br/empreendimento/residencial-village-parana | 2 |
| 29 | https://fymoob.com.br/empreendimento/condominio-studio-park-ii | 2 |
| 30 | https://fymoob.com.br/empreendimento/colinas-do-norte | 2 |

### Dia 4

| # | URL | Imp |
|---|---|---|
| 31 | https://fymoob.com.br/empreendimento/braz-haus | 2 |
| 32 | https://fymoob.com.br/empreendimento/trevi-batel | 2 |
| 33 | https://fymoob.com.br/empreendimento/orfeu | 2 |
| 34 | https://fymoob.com.br/empreendimento/residencial-mykonos | 2 |
| 35 | https://fymoob.com.br/empreendimento/palm-235 | 2 |
| 36 | https://fymoob.com.br/empreendimento/ilha-do-arvoredo | 2 |
| 37 | https://fymoob.com.br/empreendimento/edificio-dom-antonio | 1 |
| 38 | https://fymoob.com.br/empreendimento/le-monde | 1 |
| 39 | https://fymoob.com.br/empreendimento/reserva-barigui | 2 |
| 40 | https://fymoob.com.br/empreendimento/edificio-torre-sete-de-setembro | 1 |

---

## Tier 3 — Top landings (10 URLs/dia, dia 5)

> Bairros + tipo+finalidade landings com impressões > 5. Recebem
> descriptions enriquecidas (Sessão A).

| # | URL | Imp |
|---|---|---|
| 1 | https://fymoob.com.br/imoveis/centro | 21 |
| 2 | https://fymoob.com.br/imoveis/boqueirao | 18 |
| 3 | https://fymoob.com.br/imoveis/portao | 16 |
| 4 | https://fymoob.com.br/imoveis/campo-de-santana/terrenos | 15 |
| 5 | https://fymoob.com.br/imoveis/mossungue | 8 |
| 6 | https://fymoob.com.br/imoveis/agua-verde | 8 |
| 7 | https://fymoob.com.br/imoveis/cidade-industrial | 7 |
| 8 | https://fymoob.com.br/imoveis/capao-raso/venda | 6 |
| 9 | https://fymoob.com.br/casas-curitiba/aluguel | 12 |
| 10 | https://fymoob.com.br/apartamentos-curitiba/aluguel | 7 |

---

## Tier 4 — Massive batch via IndexNow (todas as 545 URLs)

> Bing/Yandex/Yahoo aceitam batch via IndexNow. Google **não** participa
> do protocolo, mas Bing comum cobre ~6% do mercado BR e ajuda
> diversificar.

### Setup IndexNow

```bash
# 1. Gerar key (8-128 chars, alfanumérico)
# Recomendado: gerar 1x e versionar em src/app/<key>.txt
# Ex: chave "fymoob-2026-05-01-reindex-abcd"

# 2. Criar arquivo de validação na raiz pública
# Path: public/<chave>.txt
# Conteúdo: <chave>

# 3. Disparar batch (todas as 545 URLs):
curl -X POST 'https://api.indexnow.org/indexnow' \
  -H 'Content-Type: application/json' \
  -d '{
    "host": "fymoob.com.br",
    "key": "fymoob-2026-05-01-reindex-abcd",
    "keyLocation": "https://fymoob.com.br/fymoob-2026-05-01-reindex-abcd.txt",
    "urlList": [<lista 545 URLs aqui>]
  }'
```

**Lista completa das 545 URLs** está em:
- `docs/seo-reports/all-urls-sitemap.txt` — todas as URLs do sitemap
- Filtrar pelas categorias afetadas: `/blog/*`, `/empreendimento/*`,
  `/imoveis/*`, `/{tipo}-curitiba/*`, `/imovel/*`

### Script pra disparar IndexNow batch

Sugerido criar `scripts/indexnow-resubmit.mjs`:

```js
const KEY = process.env.INDEXNOW_KEY
const HOST = "fymoob.com.br"
const urls = fs.readFileSync("docs/seo-reports/all-urls-sitemap.txt", "utf-8")
  .split("\n").filter(Boolean)

// Em batches de 10k (limite IndexNow)
for (let i = 0; i < urls.length; i += 10000) {
  const batch = urls.slice(i, i + 10000)
  await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: batch,
    }),
  })
}
```

---

## Sitemaps a re-submeter no GSC (Tier 0 — ✅ FEITO 01/05/2026 via MCP)

> ⚠️ **Next 16 NAO gera `/sitemap.xml` index** automaticamente — apenas
> shards individuais `/sitemap/<id>.xml` (ver `src/app/robots.ts:5-9`).
> Submeter `/sitemap.xml` retorna "Não foi possível buscar". Remover
> manualmente no GSC se aparecer entrada broken.

```
https://fymoob.com.br/sitemap/0.xml  → 248 imóveis
https://fymoob.com.br/sitemap/1.xml  → 188 bairros + combos
https://fymoob.com.br/sitemap/2.xml  →  30 blog/guias
https://fymoob.com.br/sitemap/3.xml  → 122 estáticas + empreendimentos
                                       ─────
                                       588 URLs total
```

Re-submeter força Google a re-processar lastmod das URLs e priorizar crawl.

---

## Como validar progresso

### 7 dias (08/05/2026)

```bash
# Páginas indexadas (esperado +50-100 vs hoje)
mcp__gsc__check_indexing_issues --site fymoob.com.br

# Cobertura sitemaps
mcp__gsc__get_sitemaps --site fymoob.com.br
```

### 14 dias (15/05/2026)

```bash
# Comparar 14d antes vs 14d depois
mcp__gsc__compare_search_periods \
  --site fymoob.com.br \
  --period_a 2026-04-15..2026-04-28 \
  --period_b 2026-05-04..2026-05-17
```

**Targets esperados:**
- Páginas com >=1 impressão: 122 → 250+
- Cliques/mês total: 580 → 800-1.100
- CTR médio blog: 0.13% → 1.5%+
- Posição média top blog posts: 5-12 → 3-8

### 30 dias (01/06/2026)

Re-rodar audit completo:
```bash
python scripts/seo-gaps-audit.py --all
# Comparar com docs/seo-reports/2026-04-30-page-gaps-audit.md
```

---

## Resumo executivo

| Tier | URLs | Capacidade | Tempo | Status |
|---|---|---|---|---|
| 0 — Sitemaps | 4 | Imediato | 5 min | ✅ feito 01/05 via MCP |
| 1 — Blog + 2 landings | 17 | ~10/dia | 2 dias | 🔄 **10/17 (59%)** |
| 2 — Empreendimentos top | 40 | ~10/dia | ~4 dias | ⏳ aguardando |
| 3 — Landings top | 10 | ~10/dia | 1 dia | ⏳ aguardando |
| 4 — IndexNow batch | 545 | Imediato | 5 min setup | ⏳ opcional |
| **TOTAL ações manuais** | **67 URLs em GSC** | ~10/dia | **~7 dias úteis** | — |

**ROI estimado:** +220-540 cliques/mês orgânicos em 4-8 semanas (precedente
real estate SEOPressor +220% CTR pós-rewrite, Schema App +18% CTR pós-FAQ).
