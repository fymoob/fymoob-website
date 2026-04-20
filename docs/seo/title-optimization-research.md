# Title Tag Optimization — Pesquisa Consolidada

> **Fonte:** Research de 2026-04-20 (pesquisa com agentes paralelos + fontes oficiais Google).
> **Status:** Referência ativa.
> **Contexto:** Bruno (cliente FYMOOB) quer limitar caracteres no título do CRM Loft. Pesquisa validou qual número faz sentido.

---

## TL;DR — Decisão final

- **Limite de 55 caracteres** no título do imóvel (campo `TituloSite` do CRM)
- **Remover sufixo "| FYMOOB Imobiliária"** das páginas internas (imóvel, bairro)
- Manter sufixo só em páginas institucionais (home, sobre, FAQ, blog)

---

## Fato oficial Google

Direto da [doc oficial Google Search Central](https://developers.google.com/search/docs/appearance/title-link):

> *"While there's no limit on how long a `<title>` element can be, the title link is truncated in Google Search results as needed, typically to fit the device width."*

**Verdades importantes:**
- **Não existe limite oficial de caractere** — truncagem é por **pixel**, não caractere
- **Desktop:** ~580-600px (Arial 20px)
- **Mobile:** ~475-500px (Roboto 16px)
- Google **reescreve 61% dos títulos** no SERP ([estudo Zyppy 2.4M títulos](https://zyppy.com/seo/google-title-rewrite-study/))

### Quando Google reescreve título

- Título longo demais
- Keyword stuffing
- Boilerplate/repetitivo
- Não reflete conteúdo da página

**Fontes alternativas que Google usa para reescrever:** H1/H2, anchor text de backlinks, Open Graph, structured data.

---

## Dados empíricos — caracteres

### Estudo Zyppy (81k títulos) — taxa de reescrita por comprimento

| Comprimento | % reescritos pelo Google |
|---|---|
| 1-30 chars | 30% |
| 31-50 chars | 36% |
| **51-55 chars** | **40%** ← **SWEET SPOT** |
| 56-60 chars | 48% |
| 61-65 chars | 55% |
| 66-70 chars | 67% |
| > 70 chars | **99.9%** (quase todos reescritos) |

### Estudo Ahrefs (953.276 páginas)

- Título ≤ 600px: **29.45%** reescritos
- Título > 600px: **46.12%** reescritos
- **Passar dos 600px = +56% de risco** de reescrita

---

## Pixel width por caractere (Arial 20px desktop)

| Tipo | Largura |
|---|---|
| Minúsculas estreitas (i, l, t, f, j) | ~5-6px |
| Minúsculas médias (a, e, o, n, s, r) | ~10-11px |
| Minúsculas largas (m, w) | ~16-17px |
| Maiúsculas médias (A, B, C, D, E) | ~13-14px |
| Maiúsculas largas (M, W) | ~17-18px |
| Números 1-9 | ~11px |
| Espaço | ~5-6px |
| Acentos (á, é, í, ó, ú, ã, ç) | **mesma largura da letra base** |
| Hífen `-` | ~6-7px |
| Pipe `\|` | ~6-7px |
| Em-dash `—` | ~22px (**largo!**) |

**Média empírica português-BR:** ~8.5-9px por caractere (texto misto real).

---

## Validação específica FYMOOB

### Título de imóvel típico

**Exemplo:** `"Apartamento com piscina no Batel — Curitiba | FYMOOB Imobiliária"` (64 chars)

Estimativa pixel-by-pixel (Arial 20px):
- "Apartamento com piscina no Batel " = ~267px
- "— " = ~28px (em-dash é largo)
- "Curitiba " = ~75px
- "| FYMOOB Imobiliária" = ~178px
- **Total: ~548px**

| Contexto | Limite | Cabe? |
|---|---|---|
| Desktop 1920x1080 | 600px | ✅ (margem 52px) |
| Desktop 1366x768 | 600px | ✅ |
| Mobile iPhone 14 | 500px | ❌ **trunca** (48px a mais) |
| Mobile Android | 500px | ❌ **trunca** |

**Se query do usuário casar com palavras do title**, Google aplica **bold** que aumenta 15-20% a largura → trunca até no desktop.

---

## Problema do sufixo "| FYMOOB Imobiliária"

Template `metadata.title.template = "%s | FYMOOB Imobiliária"` no [src/app/layout.tsx](../../src/app/layout.tsx) adiciona **22 caracteres** ao final de cada título.

Impacto:
- `%s` de 55 chars + 22 suffix = **77 chars totais** → acima do sweet spot
- Google trata isso como "título longo" → 46% chance de reescrita
- Mobile sempre trunca

### Decisão sobre brand no título

**NÃO é recomendação Google.** Grandes sites omitem brand em páginas internas:

| Site | Home | Páginas internas |
|---|---|---|
| Amazon | `Amazon.com: Online Shopping...` | Só nome do produto, **sem "Amazon"** |
| Airbnb | `Airbnb` | Título do imóvel **sem "Airbnb"** |
| NY Times | `The New York Times` | Só título do artigo |
| Wikipedia | `Wikipedia` | `Topic - Wikipedia` (curto) |

**Motivo:** URL `fymoob.com.br` já aparece no SERP acima do título — brand já está visível.

### Decisão FYMOOB

| Página | Estratégia | Budget do título puro |
|---|---|---|
| Home | Com sufixo `\| FYMOOB` (9 chars) | ~50 + 9 = 59 ✅ |
| Sobre/FAQ | Com sufixo `\| FYMOOB` | ~50 + 9 = 59 ✅ |
| **Imóvel** | **Sem sufixo (absolute)** | **55 chars completos** ✅ |
| **Bairro** | **Sem sufixo (absolute)** | **55 chars completos** ✅ |
| Blog | Com sufixo `\| FYMOOB` | ~50 + 9 = 59 ✅ |

---

## Copywriting de títulos (conversão + CTR)

### Estrutura vencedora

`[Diferencial forte] + [Tipo/Quartos] + [Bairro] + [Gancho financeiro opcional]`

- Até 55 chars
- Diferencial único no começo
- Número concreto no meio
- Gancho de qualificação no final (opcional)

### Power Words — Tier S (usar)

1. **"Pronto pra morar"** — elimina objeção (obra/reforma)
2. **"Aceita financiamento"** / **"FGTS"** / **"MCMV"** — qualifica lead
3. **"Direto com proprietário"** — poderoso no OLX
4. **"A 500m do [marco]"** — número/referência concreta
5. **"Aceita permuta"** — nicho qualificado
6. **"Vista panorâmica"** / **"Frente mar"** — diferencial físico
7. **"Suíte master"** / **"Mobiliado"** — sinaliza padrão
8. **"Reformado 2025"** — data ancora valor
9. **"Varanda gourmet"** — apartamento premium
10. **"Lazer completo"** — resume 5-10 amenidades

### Power Words — Tier C (EVITAR)

- ❌ "Ótimo", "Muito bom", "Imóvel dos sonhos"
- ❌ "Imperdível", "Última chance", "Barbada"
- ❌ "Aconchegante" (= pequeno)
- ❌ "Charmoso" (= antigo)
- ❌ "Potencial" (= precisa reforma)
- ❌ "Oportunidade" (sozinha)
- ❌ CAIXA ALTA em palavras longas (consome 40% mais pixels)
- ❌ Emojis (rejeitados por ZAP/VivaReal feed XML)
- ❌ Código Ref interno ("Ref 15842")
- ❌ Preço (portais já mostram)
- ❌ Nome empreendimento no início (coloque no fim)

### Exemplos bons vs ruins (catálogo FYMOOB real)

**Bom (54 chars, com feature forte):**
> *"Apto 3 suítes vista panorâmica no Batel — financiável"*

**Bom (58 chars, focado em lazer):**
> *"Cobertura duplex com piscina privativa no Ecoville"*

**Ruim (141 chars, truncado no Google):**
> *"Cabrall Hills - Apartamento à venda com 3 quartos, varanda gourmet e 2 vagas de garagem em excelente localização no bairro Cabral em Curitiba"*

**Ruim (ALL CAPS spam):**
> *"BIOOS HEALTH - Consultórios e Offices, com excelente localização no bairro Alto da Glória em Curitiba!"*

---

## Fontes principais

- [Google Search Central — Title Link](https://developers.google.com/search/docs/appearance/title-link)
- [Zyppy — 81k titles studied](https://zyppy.com/title-tags/meta-title-tag-length/)
- [Zyppy — Google rewrites 61%](https://zyppy.com/seo/google-title-rewrite-study/)
- [Ahrefs — 953k pages insights](https://ahrefs.com/blog/title-tags-study/)
- [Screaming Frog — Pixel Width SERP](https://www.screamingfrog.co.uk/blog/an-update-on-pixel-width-in-google-serp-snippets/)
- [Yoast — Page titles SEO](https://yoast.com/page-titles-seo/)
- [Microsistec — 10 títulos imobiliários](https://microsistec.com.br/blog/10-titulos-para-usar-nos-seus-anuncios-imobiliarios/)
- [Jetimob — Copywriting imobiliário](https://www.jetimob.com/blog/copywriting-imobiliario/)
- [ZAP Política de Qualidade](https://ajuda.zapimoveis.com.br/s/article/politica-de-qualidade)
- [Bennie Waller — Palavras e preço](https://www.realtytoday.com/articles/5698/20140424/study-listing-words-play-major-role-determining-home-sale-price.htm)

---

## Ações de follow-up

- [ ] Implementar `title.absolute` nas páginas de imóvel e bairro (remover sufixo)
- [ ] Encurtar sufixo global de `"| FYMOOB Imobiliária"` → `"| FYMOOB"` nas outras páginas
- [ ] Documentar regras de título pros corretores (1 página, exemplos bons/ruins)
- [ ] Script mensal de auditoria (listar títulos > 55 chars do catálogo)
- [ ] (Bruno) Pedir suporte Loft: contador visual de caracteres no campo
