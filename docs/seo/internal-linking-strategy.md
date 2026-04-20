# Estratégia de Internal Linking — Pillar Pages

> **Fonte:** Research 2026-04-20 — identificou internal linking como leverage maior que URL Inspection manual pra site pós-cutover.
> **Implementado em commit:** `f30b683` (20/04/2026)

---

## Problema identificado

Pillar pages apareceram em **"Crawled, currently not indexed"** no GSC em D+3 pós-cutover:

- `/comprar-imovel-curitiba`
- `/morar-em-curitiba`
- `/alugar-curitiba`

**Diagnóstico:** Google descobriu (via sitemap) mas decidiu **não indexar ainda** por falta de sinal de autoridade — poucos links internos apontando pra elas.

---

## Por que internal linking > URL Inspection manual

Baseado em pesquisa (Kevin Indig, SEJ 892 migrações, Google Search Central):

### Request Indexing (URL Inspection)
- Feature oficial **discouraged** por Mueller 2024-2025
- Limite 10-12 URLs/dia
- **Não funciona** re-pedir sem mudar conteúdo (URLs "crawled not indexed")
- Google "encara como dica, não garantia"

### Internal linking denso
- **Sinal estrutural** de autoridade: "estas páginas são centrais"
- Leverage escala: 1 fix resolve pra muitas páginas
- Dura indefinidamente (request expira)
- Reforça arquitetura de informação do site

**Veredito:** pra resolver "crawled not indexed", internal linking é **10x mais efetivo**.

---

## Implementação FYMOOB (commit f30b683)

### 1. Footer global — nova seção "Guias completos"

**Arquivo:** [src/components/layout/Footer.tsx](../../src/components/layout/Footer.tsx)

Nova seção antes do bottom bar com 3 cards clicáveis:
- Como comprar imóvel em Curitiba
- Morar em Curitiba (guia dos bairros)
- Alugar em Curitiba

**Impacto:** aparece em **todas as 560 páginas do site** → 560 links internos novos pra cada pillar.

### 2. Landing de bairro (`/imoveis/[bairro]`)

**Arquivo:** [src/app/imoveis/[bairro]/page.tsx](../../src/app/imoveis/[bairro]/page.tsx)

Pillar pages adicionadas ao array `links` do `RelatedPages` "Explore também":

```tsx
links={[
  { href: `/guia/${bairroSlug}`, label: `Guia completo: Morar no ${bairro.bairro}` },
  { href: "/comprar-imovel-curitiba", label: "Como comprar imóvel em Curitiba" },
  { href: "/morar-em-curitiba", label: "Morar em Curitiba — guia dos bairros" },
  { href: "/alugar-curitiba", label: "Alugar imóvel em Curitiba" },
  // ... demais links
]}
```

**Impacto:** aparece em **~65 landings de bairro** → 65 × 3 = 195 novos links.

### 3. Blog posts (`/blog/[slug]`)

**Arquivo:** [src/app/blog/[slug]/page.tsx](../../src/app/blog/[slug]/page.tsx)

Bloco "Guias completos" novo antes do "Voltar ao blog":
- Grid 3 colunas com cards visuais destacados
- Cada post cita as 3 pillars contextualmente

**Impacto:** aparece em **15 blog posts** → 15 × 3 = 45 novos links.

---

## Total de novos sinais

```
Footer: 560 × 3 = 1.680 links
Bairros: 65 × 3 = 195 links
Blog: 15 × 3 = 45 links
TOTAL: ~1.920 novos links internos pras 3 pillars
```

Cada pillar passa de ~10 links internos (só sitemap + menu) pra ~640 links internos.

**Sinal pro Google:** "estas 3 páginas são centrais no site" → prioriza indexação.

---

## Timeline esperado pós-implementação

| Data | Esperado |
|---|---|
| **D+4-7** (21-24/04) | Pillars saem de "crawled not indexed" → "indexed" |
| **D+14** (01/05) | Pillars com posição inicial em queries informacionais |
| **D+30** (17/05) | Pillars ranqueando pra "como comprar imóvel curitiba" |
| **D+60** (16/06) | Consolidação — pillars viram "hub" das queries informacionais |

---

## Métricas de sucesso

### Verificar semanalmente no GSC

- [ ] Pillar pages em "Páginas indexadas" (não mais em "crawled not indexed")
- [ ] Impressões no relatório "Performance" pras queries:
  - "como comprar imóvel curitiba"
  - "morar em curitiba"
  - "alugar imóvel curitiba"
- [ ] Cliques crescendo organicamente pras pillars

### Red flags

- Em D+14 pillars ainda não indexadas → investigar thin content
- Queries das pillars sem impressões em D+30 → competição alta, precisa mais link building
- Queda no CTR das pillars → título/meta description precisa otimizar

---

## Próximos passos de internal linking (fora do escopo deste commit)

Se pillars não indexarem até D+14:

1. **Breadcrumbs schema** reforçado pras pillars (já existe via Breadcrumbs component — checar se cobre pillar pages)
2. **Menu de navegação** — avaliar adicionar link direto pra pillars no header desktop
3. **Homepage** — criar seção "Guias" com os 3 cards
4. **Links contextuais** dentro do conteúdo dos bairros/tipos ("Leia mais sobre [morar em Curitiba]")
5. **Rich Anchor Text** — variar o texto dos links ("Guia completo", "Conheça os bairros", "Saiba mais", etc.) pra não parecer spam

---

## Fontes

- [Kevin Indig — Site migration lessons](https://www.kevin-indig.com/growth-memo/painful-lessons-i-learned-from-site-migrations/)
- [SEJ — Study: How long should SEO migration take](https://www.searchenginejournal.com/study-how-long-should-seo-migration-take/492050/)
- [Google Search Central — Internal Links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Ahrefs — Internal linking for SEO](https://ahrefs.com/blog/internal-links-for-seo/)
- [Moz — Internal link strategies](https://moz.com/learn/seo/internal-link)
