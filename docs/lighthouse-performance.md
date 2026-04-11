# FYMOOB — Lighthouse Performance Audit

> Data: 2026-04-11
> Ferramenta: Lighthouse CLI (mobile, simulated throttling)
> URL base: https://demo-blue-beta.vercel.app
> Meta: Score > 80, LCP < 2.5s, TBT < 200ms, CLS < 0.1

---

## Resultados Gerais

| Pagina | Score | FCP | LCP | TBT | CLS | SI | Payload | Status |
|---|---|---|---|---|---|---|---|---|
| Sobre | 95 | 1.2s | 2.2s | 220ms | 0 | 2.4s | 432 KB | OK |
| FAQ | 91 | 1.3s | 2.4s | 310ms | 0 | 2.6s | 377 KB | OK |
| Contato | 84 | 1.6s | 2.5s | 480ms | 0 | 2.7s | 760 KB | OK |
| Guia Batel | 83 | 1.3s | 3.2s | 410ms | 0 | 2.3s | 620 KB | OK |
| Imovel | 79 | 1.3s | 2.8s | 620ms | 0 | 3.4s | 579 KB | ATENCAO |
| Blog | 72 | 1.1s | 2.7s | 1,020ms | 0.078 | 2.9s | 619 KB | ATENCAO |
| Apartamentos | 70 | 1.9s | 3.1s | 760ms | 0.078 | 4.5s | 1,046 KB | ATENCAO |
| Bairro (Batel) | 66 | 1.3s | 3.6s | 1,160ms | 0.052 | 3.2s | 941 KB | CRITICO |
| Home | 61 | 1.8s | 2.8s | 3,170ms | 0.09 | 4.0s | 1,637 KB | CRITICO |
| Busca | 58 | 1.2s | 3.5s | 1,510ms | 0 | 7.2s | 848 KB | CRITICO |
| Lancamentos | 58 | 1.7s | 3.4s | 3,520ms | 0.048 | 4.2s | 864 KB | CRITICO |
| Empreendimentos | 52 | 1.6s | 4.5s | 2,760ms | 0 | 4.1s | 941 KB | CRITICO |

---

## Tasks por Pagina

### Home (Score: 61) — CRITICO

- [ ] **TBT 3,170ms** — Identificar e lazy-load componentes pesados (carousels, SearchBar, FeaturedProperties)
- [ ] **Payload 1,637 KB** — Maior payload do site. Auditar o que esta sendo serializado no RSC
- [ ] **CLS 0.09** — Identificar elemento causando layout shift (provavelmente hero ou cards)
- [ ] **FCP 1.8s** — Verificar se fonts/CSS estao bloqueando render

### Busca (Score: 58) — CRITICO

- [ ] **TBT 1,510ms** — SearchBar + PropertyListingGrid carregando sincrono
- [ ] **SI 7.2s** — Speed Index muito alto, conteudo renderiza tarde
- [ ] **LCP 3.5s** — Imagem do primeiro card lenta (CDN Vistahost)
- [ ] **Payload 848 KB** — Auditar dados serializados (bairroSummaries, tipoSummaries, fotos)

### Lancamentos (Score: 58) — CRITICO

- [ ] **TBT 3,520ms** — Maior TBT do site. SearchBar + listagem de lancamentos
- [ ] **LCP 3.4s** — Imagem hero ou primeiro card
- [ ] **CLS 0.048** — Layout shift nos cards de lancamentos

### Empreendimentos (Score: 52) — CRITICO

- [ ] **TBT 2,760ms** — Listagem de 113 empreendimentos renderizando de uma vez
- [ ] **LCP 4.5s** — Pior LCP do site. Imagens de empreendimentos lentas
- [ ] **Payload 941 KB** — 113 empreendimentos serializados no HTML

### Bairro Batel (Score: 66) — CRITICO

- [ ] **TBT 1,160ms** — SearchBar + PropertyListingGrid
- [ ] **LCP 3.6s** — Imagem do primeiro card
- [ ] **CLS 0.052** — Layout shift nos cards
- [ ] **Payload 941 KB** — Dados de imoveis do bairro + summaries

### Apartamentos (Score: 70) — ATENCAO

- [ ] **TBT 760ms** — Listagem de apartamentos
- [ ] **CLS 0.078** — Layout shift nos cards
- [ ] **LCP 3.1s** — Imagem do primeiro card
- [ ] **Payload 1,046 KB** — Segundo maior payload

### Blog (Score: 72) — ATENCAO

- [ ] **TBT 1,020ms** — JS pesado na listagem de artigos
- [ ] **CLS 0.078** — Layout shift nas imagens dos artigos

### Imovel (Score: 79) — ATENCAO

- [ ] **TBT 620ms** — Componentes da pagina de imovel (galeria, mapa, sidebar)
- [ ] **LCP 2.8s** — Imagem hero do imovel (CDN)

### Paginas OK (Score > 80)

- [x] Sobre (95) — Nenhuma acao necessaria
- [x] FAQ (91) — Nenhuma acao necessaria
- [x] Contato (84) — Nenhuma acao necessaria
- [x] Guia Batel (83) — Nenhuma acao necessaria

---

## Padrao Identificado

**TBT e o vilao principal em todas as paginas criticas.** A causa raiz e comum:
1. SearchBar carrega todos os filtros no bundle inicial (mesmo com dynamic imports, Popover/Sheet do Radix sao pesados)
2. PropertyListingGrid importa 4 variantes de card (PropertyCard, PropertyCardGrid, PropertyCardCompact, PropertyCardList)
3. Paginas de listagem serializam arrays grandes de imoveis/empreendimentos no RSC payload
4. Home carrega carousels + hero + SearchBar + todos os componentes acima do fold

---

_Proxima auditoria apos implementacao das otimizacoes._
