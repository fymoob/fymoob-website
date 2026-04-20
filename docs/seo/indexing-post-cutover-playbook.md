# Indexação Pós-Cutover — Playbook FYMOOB

> **Fonte:** Research consolidado 2026-04-20 (agentes paralelos + SEJ, Ahrefs, BrightEdge, Google Search Central).
> **Contexto:** Cutover fymoob.com → fymoob.com.br em 17/04/2026. Playbook de como monitorar e acelerar indexação.

---

## TL;DR — Timeline esperado

| Marco | % indexado | Data FYMOOB (baseline 17/04) |
|---|---|---|
| **D+3** | ~19% | 20/04 ✅ (estado atual: 106/560) |
| **D+7** | ~30-40% | 24/04 |
| **D+14** | **50%** (~280) | 01/05 |
| **D+30** | **75%** (~420) | 17/05 |
| **D+60** | **90%** (~505) | 16/06 |
| **D+120** | 95% (~532) | 15/08 (plateau) |

**Curva esperada:** S-shape (rápido no início, plateau no meio, cauda longa).

---

## Validação: D+3 com 19% está ACIMA da média

Fontes:
- [Google Search Central — Site Moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes): *"a few weeks for most pages to move in the index"*
- [SEJ — 892 migrações estudadas](https://www.searchenginejournal.com/study-how-long-should-seo-migration-take/492050/): CoA típico em 1-2 semanas
- [BrightEdge 2025 Guide](https://www.brightedge.com/blog/2025-guide-successful-site-migration-how-protect-your-seo-and-grow-era-ai-search): 3-30 dias
- [Linkbot CoA Timeline](https://library.linkbot.com/how-long-does-google-typically-take-to-process-a-change-of-address-and-what-factors-can-affect-this-time-frame/)

FYMOOB:
- D+3 com **19%** (106/560) ← acima da média
- Baseline antigo (`fymoob.com`): 92 URLs indexadas em **3 meses**
- Novo domínio já superou volume histórico em **3 dias**

---

## Categorias do GSC — o que cada uma significa

### "Indexadas"
Páginas efetivamente no índice Google, aparecem em resultados de busca. ✅

### "Não encontrado (404)"
Page retorna HTTP 404. Geralmente:
- URLs fantasmas (backlinks de sites que digitaram errado)
- Imóveis removidos do CRM
- Bots fuzzing com caracteres especiais (`/$`, `/&`)

**Ação:** ignorar a menos que sejam URLs legítimas. Google para de tentar em 30-60 dias.

### "Bloqueada pelo robots.txt"
Google respeitou nosso robots.txt. Esperado pra `/admin`, `/api/`, `/favoritos`, `/comparar`. ✅

**Ação:** nenhuma. Se aparecer URL que **não** deveria estar bloqueada, aí sim é bug.

### "Página com redirecionamento"
Page retorna 3xx redirect. Típico:
- HTTP → HTTPS (obrigatório, feature)
- Cutover: fymoob.com → fymoob.com.br
- Canonical: URLs similares consolidadas

**Ação:** confirmar que é redirect intencional. Se sim, normal.

### "Rastreada, mas não indexada" ⚠️
**Google viu e decidiu NÃO indexar** (ainda ou definitivamente).

Razões típicas em site pós-cutover:
- **Autoridade baixa** (domínio novo) — resolve com tempo
- **Crawl budget priorizado** — Google escolhe o que indexar primeiro
- **Thin content** — landings programáticas com pouco conteúdo único
- **Duplicate content** — canonical mal configurado
- **Falta de sinal de importância** (links internos)

**Bandeira vermelha:** se em **D+30 ainda tiver > 30%** nesta categoria OU se **crescer** entre D+14 e D+30.

### "Descoberta, mas não indexada"
Mais grave que "rastreada". Google nem crawleou ainda. Indica crawl budget fraco.

**Ação:** só em casos crônicos — melhorar internal linking, backlinks externos.

---

## Ações por fase

### Fase C — Monitoramento (D+1 a D+7)

- [x] Confirmar sitemaps submetidos no GSC (4 shards)
- [x] Change of Address ativo (fymoob.com → fymoob.com.br)
- [x] Revalidar cache pós-fixes importantes
- [ ] Checar GSC Coverage diariamente
- [ ] Inspecionar 404s e confirmar se são legítimos

### Fase D — Ação (D+7 a D+14)

Se Coverage ainda mostrar problemas:
- [ ] Solicitar indexação manual das **10 URLs mais estratégicas**
  - Home, pillar pages, top 5 bairros comerciais
  - Limite 10-12 URLs/dia no GSC
- [ ] Redirects específicos no [next.config.ts](../../next.config.ts) pra URLs antigas com tráfego em 404

### Fase E — Consolidação (D+14 a D+21)

- [ ] Report métricas: antes (92 URLs / 580 cliques/mês) vs agora
- [ ] Preencher deltas baseline ([docs/metrics-baseline/](../metrics-baseline/))
- [ ] Avaliar se é hora de investir em backlinks externos

### Fase F — Otimização (D+30+)

- [ ] Análise de thin content (landings programáticas fracas)
- [ ] Possivelmente adicionar `noindex` em bairros com 0-1 imóveis
- [ ] Rich results monitoring (JSON-LD schemas consumidos?)

---

## Request Indexing — quando USAR e quando NÃO

### Quando USA fazer sentido

- **URLs críticas** que precisam indexar logo (home, pillar pages)
- **Páginas novas** que Google ainda não descobriu
- **Páginas alteradas significativamente** (conteúdo novo, fix de thin content)

### Quando NÃO USAR

- URLs em **"crawled but not indexed"** sem mudar conteúdo → **ruído, pode atrasar reavaliação**
- Assets (fontes, favicons, webmanifest, opengraph-image)
- URLs da cauda longa (imóveis individuais) — deixa descoberta orgânica
- Spray-and-pray de 20+ URLs/dia

### Limite oficial

- **10-12 URLs/dia** por propriedade GSC (confirmado 2024-2026)
- Ultrapassar: mensagem "Please try submitting this again tomorrow" + CAPTCHA
- API URL Inspection: só inspeciona, NÃO submete pra indexação
- Indexing API: limitada a JobPosting e BroadcastEvent — **não se aplica imóveis**

### John Mueller oficial (2024-2025)

> *"I strongly recommend not relying on trying to force indexing."*

Google quer que você NÃO precise desse feature. Prioriza qualidade + descoberta orgânica.

### Efetividade empírica ([Nick LeRoy case](https://nickleroy.com/blog/how-many-urls-can-you-request-indexing-for-in-gsc-case-study/))

- 1-3 URLs indexam em **minutos**
- Maioria em **12-24h**
- Taxa ~100% **quando a página atende critérios de qualidade**
- Se thin/baixa autoridade: request não ajuda

---

## Leverage por ordem de ROI

Pra acelerar indexação, baseado em [Kevin Indig Growth Memo](https://www.kevin-indig.com/growth-memo/painful-lessons-i-learned-from-site-migrations/) e [SEJ 892 migrações](https://www.searchenginejournal.com/study-how-long-should-seo-migration-take/492050/):

1. **Internal linking denso** ← MAIOR leverage (resolve "crawled not indexed")
2. **Sitemap segmentado por tipo** (imóveis / bairros / blog / landings — 4 shards) ✅ já temos
3. **Backlinks pro domínio novo** (maior preditor de tempo de recuperação)
4. **Manter 308 + CoA ativos 180+ dias** (Google consolida nesse período)
5. **Request indexing manual** (só top 10, casos excepcionais)
6. **IndexNow** (NÃO funciona no Google, só Bing/Yandex)

### NÃO faz diferença significativa

- Resubmeter sitemap múltiplas vezes
- Ferramentas pagas de "indexação rápida"
- Mudar 308 → 301 (Google trata igual)

---

## Dados empíricos FYMOOB (D+3, 20/04/2026)

```
Total sitemap: 560 URLs (4 shards)
Indexadas: 106 (19%)
Não indexadas:
  - 404: 2 (URLs fantasmas /$, /&)
  - robots.txt: 1 (/favoritos — intencional)
  - Redirect: 1 (http://fymoob.com.br/ → https://)
  - Rastreada não indexada: 80
    - Assets: 4 (woff2, favicon, opengraph, manifest — ignorar)
    - Imóveis individuais: ~50 (normal, vai indexar com tempo)
    - Bairros pequenos: ~10 (vai indexar com autoridade)
    - Pillar pages: 3 (AGIR — reforçar internal linking) ✅ feito
    - Empreendimentos: ~10 (esperar)
    - Outras: ~3
```

---

## Timeline realista — quando se preocupar

### Normal, não preocupar
- Imóveis individuais fora do índice em D+7-14
- Bairros com < 3 imóveis fora do índice em D+30
- Assets sempre "crawled not indexed" (é feature, não bug)

### Preocupar
- **D+14**: pillar pages ainda não indexadas → thin content
- **D+30**: > 30% em "crawled not indexed" → problema estrutural
- **D+30**: > 20% em "discovered not indexed" → crawl budget

### Ação se preocupante
1. Audit das páginas não indexadas (conteúdo, internal links, schema)
2. Fortalecer internal linking (principal leverage)
3. Considerar consolidar landings programáticas fracas
4. Buscar backlinks externos (Google Meu Negócio, diretórios locais)

---

## Fontes

- [Google Search Central — Site Moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [Google Search Central — Ask Google to Recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google CoA Help](https://support.google.com/webmasters/answer/9370220)
- [SEJ — 892 migrações](https://www.searchenginejournal.com/study-how-long-should-seo-migration-take/492050/)
- [BrightEdge 2025 Migration](https://www.brightedge.com/blog/2025-guide-successful-site-migration-how-protect-your-seo-and-grow-era-ai-search)
- [Linkbot — CoA Timeline](https://library.linkbot.com/how-long-does-google-typically-take-to-process-a-change-of-address-and-what-factors-can-affect-this-time-frame/)
- [Onely — Crawled not indexed](https://www.onely.com/blog/how-to-fix-crawled-currently-not-indexed-in-google-search-console/)
- [Kevin Indig — Site migration lessons](https://www.kevin-indig.com/growth-memo/painful-lessons-i-learned-from-site-migrations/)
- [Nick LeRoy — Request indexing case study](https://nickleroy.com/blog/how-many-urls-can-you-request-indexing-for-in-gsc-case-study/)
- [SEJ — Google discourages force indexing](https://www.searchenginejournal.com/google-john-mueller-request-indexing-feature/387195/)
- [Ahrefs — Crawled not indexed](https://ahrefs.com/blog/crawled-currently-not-indexed/)
