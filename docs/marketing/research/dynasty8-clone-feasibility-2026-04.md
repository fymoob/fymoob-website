# Pesquisa de viabilidade — Clone "Dynasty 8" estilo GTA V para FYMOOB

> **Status:** pesquisa concluída — pendente decisão de Bruno (versão e orçamento) + 1 POC técnico antes de comprometer 30+ horas
> **Owner pesquisa:** Vinicius (24-25/04/2026)
> **Pareado com:** [docs/marketing/plano-videos-virais-gta-style.md](../plano-videos-virais-gta-style.md) — landing serve como destino dos Reels
> **Próxima revisão:** após POC do Teste 1 (mapa estilo GTA), seção 11

---

## TL;DR — 60 segundos pra decisão

- **O Dynasty 8 real é mais simples do que parece.** Não é uma página dourada-luxo cinemática — é uma listagem **plana, com top-bar preto-TV (browser frame in-game) + corpo cinza claro #F0F0F0 + nav azul #4080C0 + faixa amarelo-mostarda separadora + cards horizontais**. Estética "Century 21 retro 1991-2018" satirizada. Logo: silhueta-casa-+-sol-amarelo + wordmark "DYNASTY 8" sans geométrico. Tagline: **"The best move you'll ever make"**.
- **Take-Two é agressiva mas o risco é gerenciável.** Eles vão atrás de logo Rockstar, fonte oficial Pricedown Intl, modelos 3D dos personagens. Não há precedente público de DMCA contra paródia paleta-+-tipografia-genérica de site fictício do GTA.
- **Versão recomendada: paródia clara "Curitiba 8 Imobiliária"** (fidelidade ~70%, risco médio-baixo). Versão "alta-fidelidade" (cópia 1:1) é tentação ruim — risco legal alto, ganho de reconhecimento marginal vs paródia.
- **Stack técnico viável e barato:** Next.js 15 (já rodando) + MapLibre GL (já no bundle) + **OpenFreeMap "liberty" style customizado em Maputnik** (zero custo, sem chave, sem limite) + Pricedown Black da Typodermic (free comercial) + animações CSS scroll-driven nativas. Geocoding **resolvido pela API Loft** (já retorna `Latitude`/`Longitude`/`GMapsLatitude`/`GMapsLongitude` — confirmado em `src/services/loft.ts:130,141,244-245`).
- **Estimativa: MVP 22-30h, versão completa 50-65h.** Maior risco é tempo de design pra acertar look (não código).
- **POC obrigatório antes de commit:** validar que o estilo MapLibre customizado fica aceitável em mobile antes de comprometer horas. ~3h de trabalho. Se falhar, plano B é "mapa estático SVG dos bairros + grid de cards", custa metade.

---

## 1. Análise visual exata do Dynasty 8 (in-game site GTA V/Online)

### 1.1 Esclarecimento crítico sobre nomenclatura

- **Dynasty 8 (não "Dynasty 8 Executive")** é a marca residencial. URL in-game: `dynasty8realestate.com`. ([GTA Wiki](https://gta.fandom.com/wiki/Dynasty_8))
- **Dynasty 8 Executive** é o braço corporativo (escritórios, agencies pra missões SecuroServ). URL: `dynasty8executiverealty.com`. ([GTA Wiki](https://gta.fandom.com/wiki/Dynasty_8_Executive))
- O brief diz "Dynasty 8 Executive" — provavelmente é confusão. **A referência visual que o Bruno deve querer é o `dynasty8realestate.com` residencial** (cards de apartamento + casa, não escritório). Confirmar com Bruno antes de implementar.
- **Não confundir** com Maze Bank Foreclosures (galpões/bunkers — palette mais corporativa azul-vinho) nem Smoke On The Water (dispensários — verde-cannabis/madeira). Usar Dynasty 8 residencial como referência primária.

### 1.2 Logo Dynasty 8 (extraído de [imagem oficial Wiki, 755×390](https://static.wikia.nocookie.net/gtawiki/images/d/df/Dynasty8-GTAV-Logo.png/revision/latest?cb=20150814230544))

Pegamos o asset original e fizemos extração de cores via canvas pixel sampling:

| Elemento | Descrição | Cor (HEX) |
|---|---|---|
| **Background** do mockup do logo | preto puro (frame TV in-game) | `#000000` |
| **Plate do logo** (fundo do logo em si) | branco/cinza muito claro | `#F0F0F0` (pixels topo-1: 240,240,240) |
| **Linha do telhado + número 8 (silhueta-casa)** | branco puro | `#FFFFFF` |
| **Sol/círculo lateral** | amarelo-mostarda (mais saturado que dourado Century 21) | `#C0B030` (pixel-medido: 192,176,48) — variantes próximas: `#C0B020`, `#D0D070`, `#D0C050` |
| **Wordmark "DYNASTY 8"** | branco | `#FFFFFF` |
| Inspiração declarada | Century 21 logo 1991-2018 (`#252526` Obsessed Grey + `#BEAF88` Relentless Gold) | — |

**Tipografia do logo:** sans-serif geométrica de aspecto **wide/extended**, com características **Microgramma/Eurostile** (Y com terminal reto, S equilibrado, A com vértice plano). Não é Pricedown — Pricedown é a fonte do título "Grand Theft Auto" (game logo), não dos logos in-universe.

> **Nota:** Eurostile (1962, Aldo Novarese) é "the sci-fi font" — usado em Ridge Racer, StarCraft, Splinter Cell, GTA HUDs várias. ([Wikipedia](https://en.wikipedia.org/wiki/Eurostile))

### 1.3 Tipografia GTA V em geral

| Função | Fonte | Origem |
|---|---|---|
| Logo do jogo "GRAND THEFT AUTO" | **Pricedown** (Ray Larabie, baseada em "The Price Is Right" TV game show) | ([dafont](https://www.dafont.com/pricedown.font), [Fonts in Use](https://fontsinuse.com/uses/55702/grand-theft-auto-v)) |
| HUD + UI body copy do jogo todo | **Chalet 1960** + **Chalet Comprimé 1960** (House Industries) | ([Fonts in Use](https://fontsinuse.com/uses/55702/grand-theft-auto-v)) |
| Logo Dynasty 8 (in-universe) | sans geométrica wide tipo Eurostile/Microgramma | medição pixel + análise visual |
| Body copy nas páginas dos sites | sans-serif comum (provavelmente Arial/Helvetica genérica do engine de browser fake) | screenshot do Eyefind |

**Pricedown Black da Typodermic (não a Pricedown original)** é a versão licenciada free comercial. Usar essa pra evitar processo. ([Typodermic license](https://typodermicfonts.com)). Pra body copy do nosso clone, **Chalet é paga (~$60)** — substituir por **Inter ou system-ui** (já temos Inter como body do FYMOOB). Gap visual aceitável.

### 1.4 Layout da página de listings (extraído via Playwright de [GTA Wiki Listings](https://gta.fandom.com/wiki/Dynasty_8/Dynasty_8_Listings))

**Estrutura dominante:**

```
┌─────────────────────────────────────────────┐
│ [Tabs] HIGH-END | MEDIUM | LOW-END          │ ← filtro por faixa
├─────────────────────────────────────────────┤
│ "41 Properties"                              │ ← contador
│ Property Details (Click BUY to show)         │ ← microcopy ironicamente seca
├─────────────────────────────────────────────┤
│ ┌────┐ CUSTOM GARAGE                          ▶ │
│ │IMG │ Eclipse Boulevard                       │
│ │    │ 50 [garage icon]   $2,740,000   [Buy] │
│ └────┘ North Los Santos                        │
├─────────────────────────────────────────────┤
│ ┌────┐ CUSTOM APARTMENT                       │
│ │IMG │ Eclipse Towers, Penthouse Suite 3      │
│ │    │ 10 [icon]   $1,100,000   [Buy]        │
│ └────┘ North Los Santos                        │
├─────────────────────────────────────────────┤
... (40+ rows seguindo o mesmo padrão)
```

- **Cards são linhas horizontais**, não grid de cartões. Imagem 16:8 (~2:1 cinemascope) à esquerda, texto à direita.
- **Tipo da propriedade em CAPS** ("CUSTOM GARAGE", "CUSTOM APARTMENT", "STILT APARTMENT", "UPDATED INTERIOR") — labels "categoria-+-feature" curtas, em maiúsculas.
- **Endereço nominal** ("Eclipse Towers, Penthouse Suite 3"), **número de slots/quartos** com ícone, **preço** em USD justificado à direita, **botão [Buy]** verde.
- **Bairro** ("North Los Santos") em segunda linha, fonte menor.
- **Click → expande inline** com descrição satírica longa ("Let's face it: we had you at the pricetag. The fact that this happens to be one of the most decadent living spaces for hundreds of miles doesn't really matter...").
- **Sem mapa visível** na tela de listagem — **mapa só aparece quando o jogador clica "Set GPS to property"**, e a navegação ocorre **no minimap do HUD do jogo, não no site**.

> **Implicação pro nosso clone:** o mapa interativo central **não é fiel ao Dynasty 8 original**. O brief assume que era assim — não é. **Decisão estratégica:** podemos **fazer um híbrido** (listagem fiel + mapa GTA-style à parte como atrativo extra) ou manter listagem-pura sem mapa pra fidelidade visual. Recomendo o híbrido — mapa é o que vai impressionar os viewers do Reel.

### 1.5 Layout da homepage do browser GTA V (frame que envolve sites)

Extração do screenshot da [homepage Eyefind do GTA V Internet](https://static.wikia.nocookie.net/gtawiki/images/9/9c/Internet-GTAV-Homepage.png/revision/latest?cb=20210629132848):

| Zona | Cor (extração pixel histogram) | HEX | Notas |
|---|---|---|---|
| **Top frame TV** (acima do browser) | preto puro (87% da zona top) | `#000000` | "letterbox" do TV in-game — horizontal solid black band |
| **Browser chrome** (controles back/forward/home/URL) | cinza médio claro | `#C0C0C0`–`#E0E0E0` | botões em relevo style XP/Aero |
| **URL bar** | branco com texto preto | `#FFFFFF` / `#000000` | mostra `www.eyefind.info` |
| **Header do site** (banda principal Eyefind, mas Dynasty 8 muda cor) | azul saturado | `#4080C0` (RGB 64,128,192) | banner com logo + busca |
| **Faixa separadora** entre header e nav | amarelo-ouro | `#E0B040` (estimado, ~entre logo dourado e mostarda) | linha horizontal ~6-10px de altura |
| **Nav inferior** (categorias com ícones) | branco com texto preto | `#FFFFFF` / `#202020` | "MEDIA AND ENTERTAINMENT" etc |
| **Body do site** | cinza muito claro | `#F0F0F0` | quase branco com tom |
| **Bottom letterbox** | preto puro | `#000000` | mesma "TV frame" inferior |

> **Decisão de design crítica:** o efeito "estilo GTA V" **não vem só do site em si — vem do letterbox preto top-+-bottom que simula TV de 16:9 + browser chrome em volta**. **Esse é o "easter egg" visual mais forte e mais barato de implementar.** Pode ser feito em 100% CSS com 2 `<div>`s pretos absolute top/bottom + browser chrome SVG no topo. Custo: 1-2h.

### 1.6 Páginas individuais de propriedade

A wiki não detalha visualmente o "after-click" do Dynasty 8 — porque no jogo, o "click Buy" abre prompt simples pedindo confirmação ("Are you sure?"). **Não há página de detalhe rica como Zillow.** A imagem da propriedade em si é uma **render aérea panorâmica 2:1 cinemascope** (verificado nas imagens da Eclipse Towers, [768×384px](https://static.wikia.nocookie.net/gtawiki/images/1/18/Dynasty8-GTAV-HighEnd-Image-EclipseTowers.png/revision/latest?cb=20171003103218) — paleta dominante azul-céu + cinza concreto + verde vegetação).

> **Decisão pro nosso clone:** o "after-click" precisa ser nosso (não dá pra copiar o que não existe). **Rota natural:** click no card → animação rápida (700ms) "ROUTE LOCKED" estilo GPS GTA → redireciona pra página real do imóvel `/imovel/[slug]` (que já existe no FYMOOB). Pular página de detalhe in-fake-browser — coloca atrito desnecessário.

### 1.7 Tom de copy (referência crítica pra escrita do nosso)

Examples colhidos da Wiki listings:

> **Eclipse Boulevard Garage:** "Eating, sleeping, and washing? Oh please. Time to up your grindset. Forget about luxury apartments. All you need for a productive lifestyle is a 5-floor private garage with enough storage for up to fifty vehicles. #Simpleliving"

> **Eclipse Towers Penthouse:** "Is the 1% starting to feel a little crowded? Are you tired of single-digit millionaires cluttering up your elevator and groping your bellboy? Do you need a new way of expressing your bottomless contempt for your fellow man? Look no further: this lavish penthouse suite at the best address in town is expensive enough to keep the riff-raff at bay until at least the next federal bailout."

**Tom = sátira de copy de luxo americana corporativa.** Adaptado a Curitiba seria do tipo: *"Cansado dos bairros que só servem academias da Smart Fit? A cobertura do Ecoville foi feita pra quem quer mostrar pra família que aquele estágio na Volvo valeu a pena. Inclui adega, área gourmet e zero risco de cruzar com vizinho de Cajuru."* (escrita pra aprovação do Wagner — mantém classy enquanto satiriza).

### 1.8 Som ambiente

GTA V não tem áudio próprio nas páginas (só o som de fundo do jogo). **Não precisamos.** Áudio em landing web tem problema de autoplay (Chrome bloqueia desde 2018) — adicionar áudio de "GPS click" / "cash register" só **on user interaction** (click em card), nunca on-load. Asset Pixabay grátis comercial.

---

## 2. Três propostas de adaptação para FYMOOB

### Versão A — "Cópia alta-fidelidade" (não recomendada)

**Descrição:** logo idêntico ao Dynasty 8 (silhueta casa + sol mostarda + "DYNASTY 8" → trocaria pra "DYNASTY 41" referência ao DDD curitibano), tagline "The best move you'll ever make" traduzida, palette idêntica, fonte do logo idêntica.

**Risco:** **alto.** Take-Two protege agressivamente trademark "GTA", "Rockstar", "MAFIA" ([Justia trademarks](https://trademarks.justia.com/885/64/mafia-88564555.html)). Dynasty 8 não é trademark registrado por Take-Two até onde a pesquisa mostra (Justia retorna nada por "Dynasty 8" em jogos), mas:
- **Trade dress** (look-and-feel da marca) pode ser invocado em ação cível mesmo sem trademark formal
- Take-Two filed disputes contra Remedy por logos minimamente similares ([Game Informer](https://gameinformer.com/news/2024/01/16/rockstar-parent-company-take-two-files-trademark-dispute-over-remedys-logo))
- Mesmo se vence em corte, custo de defesa = 5-figure USD

**Ganho:** reconhecimento instantâneo no Reel (3-second hook).

**Veredicto:** ❌ não compensa. O ganho marginal vs Versão B não justifica o risco financeiro.

### Versão B — "Paródia clara: Curitiba 8 Imobiliária" ⭐ recomendada

**Descrição:**
- Logo próprio: silhueta de **Araucária + Igreja do Paraná Clube ou skyline do Centro Cívico** + sol mostarda. Wordmark "**CURITIBA 8**" em sans wide próprio (Eurostile-like genérica — Bahnschrift do Windows é gratuita e similar, ou Saira Condensed do Google Fonts).
- Palette **paralela mas variada**: preto `#000000` letterbox, cinza muito claro `#F0F0F0` body, azul `#1E5FA0` (entre Eyefind GTA `#4080C0` e azul FYMOOB `#29ABE2`) header, mostarda `#D4A017` (mais "ouro Curitiba" que mostarda GTA `#C0B030`) accents.
- Tagline: "**A melhor jogada da sua vida**" (paráfrase reconhecível mas não citação direta de "The best move you'll ever make").
- Mantém estrutura de listings 1:1 (top tabs HIGH-END/MEDIUM/LOW-END → "ALTO PADRÃO/MÉDIO/POPULAR" ou faixas de preço reais; cards horizontais; preço destacado; botão "VER" em verde `#28A745`; bairro embaixo).
- **Letterbox preto top-+-bottom** sempre presente (esse é o easter egg crítico que Bruno e os reels reconhecem — preserva).
- Browser chrome com URL fake `www.curitiba8.com.br` no topo (decoração estática, não funcional).

**Risco:** **baixo-médio.** Paródia é reconhecida como uso transformativo no direito americano (Campbell v. Acuff-Rose, 1994) e brasileiro (LDA art. 47). Sem trademark direto Dynasty 8 + uso transformativo + finalidade claramente comercial-não-confunde-com-fonte = defensável. **Mitigação:** caption do Reel nunca menciona "GTA"/"Rockstar"/"Dynasty 8" — sempre "modo videogame", "estilo dos clássicos".

**Ganho:** reconhecimento ainda forte (3-second hook funciona) + branding próprio defensável + reusável depois pra próxima versão de marketing FYMOOB.

**Veredicto:** ✅ **escolha recomendada.** Sweet spot entre risco/ganho.

### Versão C — "Genérica luxo escura sem referência GTA"

**Descrição:** estética dark + acentos dourados sem letterbox/browser chrome. Header preto + tipografia serifada (Playfair Display/Cormorant Garamond) + cards minimalistas + animações scroll-driven CSS. Visual = "Sotheby's International Realty meets Vercel landing".

**Risco:** **mínimo.** Zero referência a GTA. Não confunde fonte. Defesa zero burocrática.

**Ganho:** **muito baixo no contexto Reel.** Perde reconhecimento, perde meme value, perde 3-second hook. **Não cumpre a função primária** que é converter viewer do Reel "modo videogame" pra navegação.

**Veredicto:** ⚠️ útil só como **plano-B se Take-Two emitir DMCA depois do lançamento**. Manter como "fallback design system" mas não usar como primário.

---

## 3. Stack técnico recomendado

### 3.1 Frontend (estrutura geral)

| Componente | Decisão | Justificativa |
|---|---|---|
| Framework | **Next.js 15 App Router** (já existente) | sem custo de adoção. SSG da rota `/curitiba8` com `revalidate: 3600` (mesmo TTL da Loft API) |
| Roteamento | `/curitiba8` (subfolder) **com `noindex`** via `metadata.robots = "noindex, nofollow"` | preserva link equity FYMOOB.com (subdomínios dividem authority — ver [seção 3.7](#37-hospedagem-e-deploy)). `noindex` evita conflito com SEO core do site |
| Bundle isolation | Route group `(promo)` **fora do layout principal** ou layout próprio sem header/footer FYMOOB | garante que o bundle dessa rota não vaza pro home — page weight irrelevante pro Lighthouse das outras rotas |
| Estilo | Tailwind CSS (já existente) + **CSS Module pra "GTA letterbox"** | Tailwind cobre 95%; um CSS Module pequeno pra `.crt-letterbox` + `.browser-chrome` |
| Fontes | Google Fonts: **Saira Condensed** (sans wide tipo Eurostile, free) + **Inter** (já carregado) + Pricedown Black local (TTF/WOFF2) | Saira Condensed = ~22KB woff2; Pricedown Black = ~30KB woff2. Total ~50KB, aceitável |

### 3.2 Mapa GTA-style (escolha técnica crítica)

**Decisão: MapLibre GL JS + OpenFreeMap "liberty" customizado.**

**Por que MapLibre + OpenFreeMap:**

| Critério | OpenFreeMap | Maptiler Free | Mapbox Free | Stadia Free |
|---|---|---|---|---|
| Custo | **$0 ilimitado** | $0 até 100k loads/mês | $0 até 50k loads/mês | $0 dev/non-comercial |
| API key necessária | **Não** | Sim | Sim | Sim |
| Custom style | **Sim, JSON MapLibre** | Sim (Maputnik) | Sim (Studio) | Sim |
| Limite hard | nenhum (best-effort) | maps stop loading se passa free tier | $5 / 1k loads acima de 50k | non-comercial only |
| Risk de surpresa de billing | **zero** | médio (pode bloquear no meio do dia) | alto | médio |
| Atribuição | OSM + OpenFreeMap (auto via MapLibre) | OSM + Maptiler | OSM + Mapbox | OSM + Stadia |
| Production-ready | **sim** (basemap do MapHub desde 06/2024) | sim | sim | sim |

Fonte: [OpenFreeMap docs](https://openfreemap.org/), [Mapbox pricing 2026](https://www.mapbox.com/pricing), [Maptiler pricing 2026](https://www.maptiler.com/cloud/pricing/), [Simon Willison review 2024](https://simonwillison.net/2024/Sep/28/openfreemap/).

> **OpenFreeMap zera o risco financeiro.** Se viralizar e bater 1M loads/mês, custo continua $0. Mapbox em mesma escala = $4.750/mês. Como rota promocional pode escalar imprevisivelmente com viral content, esse é o ponto crítico.

**Como criar o estilo "GTA-like" (custom):**

1. **Base inicial:** `https://tiles.openfreemap.org/styles/liberty` (já vem com fonts/sprites)
2. **Editor:** [Maputnik](https://maplibre.org/maputnik/) (web, free) — carrega o liberty.json e ajusta cores
3. **Paleta target (refinamento do Snazzy Maps GTA San Andreas existente, [link](https://snazzymaps.com/style/102017/gta-san-andreas)):**
   - Água: `#1A2340` (azul-marinho saturado-escuro, mais "GTA night" que `#7088B0` do snazzy)
   - Land/landscape: `#2A2D24` (verde-oliva profundo, ~`#38692D` do snazzy mas mais escuro)
   - Roads (highways): `#FFC107` (amarelo-âmbar GPS GTA estilo) com casing preto `#000000` 1px
   - Roads (locais): `#3E3E3E` cinza médio
   - Buildings: `#4A4540` (terra escura) com borda `#000000` 0.5px
   - Parks: `#1F3D1F` verde-escuro
   - Labels (texto): branco `#FFFFFF` com halo preto 2px (estilo GTA HUD)
   - POI icons: amarelo-âmbar `#FFC107` (amarrar com FYMOOB pin azul `#29ABE2` pra contraste)
4. **Markers:** sprite GTA-blip-style — círculo amarelo `#FFC107` com casa silhueta dentro (~32×32px SVG inline, custo zero)

**Custo estimado de design do estilo:** 4-6h em Maputnik + 2h iteração mobile. Total 6-8h.

### 3.3 Markers / clustering para 250 imóveis

- **MapLibre GL aguenta 250 markers HTML facilmente em desktop**, mobile é o gargalo. ([MapLibre large data docs](https://maplibre.org/maplibre-gl-js/docs/guides/large-data/))
- Decisão: **usar symbol layer GeoJSON com clustering nativo** (não DOM markers individuais). Padrão `clusterMaxZoom: 14, clusterRadius: 50`.
- Cluster expand on click: zoom progressivo até ver pins individuais.
- Pin clicado: abre overlay flutuante posicionado relative ao pin, com mini-card (foto + preço + "[VER]") que linka pra `/imovel/[slug]`. Sem rota intermediária.
- ~65 bairros agregam naturalmente em clusters em mobile (zoom 11-13).

**Performance esperada:** symbol layers WebGL = 60fps fácil até 5000 features. 250 = trivial. ([MDPI 2025 benchmark](https://www.mdpi.com/2220-9964/14/9/336))

### 3.4 Geocoding — **JÁ RESOLVIDO**

Confirmado em código: `src/services/loft.ts:130` (CARD_FIELDS inclui `Latitude`, `Longitude`) e `loft.ts:141` (DETAIL_FIELDS inclui também `GMapsLatitude`, `GMapsLongitude`). Função de mapping linha 244:

```ts
const lat = parseNumber(raw.Latitude) ?? parseNumber(raw.GMapsLatitude)
const lng = parseNumber(raw.Longitude) ?? parseNumber(raw.GMapsLongitude)
```

Fallback `bairro-coordinates.ts` já existe pra imóveis sem coords (`PropertyMap.tsx:5`). **Custo zero adicional.** Não precisa Google Geocoding API ($5/1k requests) nem Nominatim (rate-limited).

> **Risco:** % de imóveis sem coords. Validar antes de implementar com:
> ```bash
> npm run build && grep -c '"latitude":null' .next/cache/.../properties.json
> ```
> Se >30% sem coords, considerar enriquecer via Nominatim batch (gratuito mas slow — 1 req/seg).

### 3.5 Animações e transições GTA-style

| Efeito | Implementação | Custo |
|---|---|---|
| **Letterbox preto top/bottom** (CRT/cinemascope frame) | 2× `<div>` absolute fixed, height 60px desktop / 40px mobile | 0.5h |
| **Browser chrome topo** (back/forward/URL fake) | SVG inline + 1 div com input readonly mostrando `www.curitiba8.com.br` | 1h |
| **Fade-in cards on scroll** | CSS `animation-timeline: view()` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view), suportado Chrome desde 12/2024, Firefox flag, Safari ainda não) com fallback `@supports not (animation-timeline: view())` `opacity:1` direto | 1h |
| **Hover card** (lift + glow amarelo) | Tailwind `hover:scale-105 hover:shadow-[0_0_20px_#FFC107]` + transition 200ms | 0.2h |
| **Click → "ROUTE LOCKED" animation** | CSS keyframe 700ms (texto aparece + traço amarelo cresce no mapa) → router.push | 2h |
| **GPS marker pulse no mapa** | CSS `@keyframes pulse` infinite no marker SVG | 0.3h |
| **Cash register sound on click** | `<audio>` lazy + Pixabay free SFX, `play()` on user click only | 0.5h |
| **"Loading screen" GTA-style** | optional: 1.5s fake load com texto "ENTERING CURITIBA 8..." + tile bg image. Adicionar **só se Lighthouse não regredir** | 1h se for usar |

**Total animações:** 6-8h.

### 3.6 Performance budget

> **Esta página NÃO segue regra padrão FYMOOB de Lighthouse mobile >80** (CLAUDE.md mandato), justificável porque é landing promocional `noindex` + experiência imersiva.

**Targets ajustados:**

| Métrica | Target normal FYMOOB | Target Curitiba8 | Justificativa |
|---|---|---|---|
| LCP mobile | <2.5s | **<3.5s** | mapa carrega depois do hero — hero pode ser imagem otimizada |
| TBT mobile | <200ms | **<400ms** | maplibre init custa 200-300ms |
| CLS | <0.1 | <0.1 | letterbox + browser chrome são static |
| Bundle JS shipped | <120KB | **<280KB** | maplibre + style ~270KB; não cabe em <120KB |
| Lighthouse Perf | >80 | **>55** mobile, >75 desktop | trade-off aceito |

**Code splitting obrigatório:** rota `/curitiba8` deve ser **route group isolado** ou **dynamic import** completo. **Verificar com `npm run perf:bundle`** que `app/page.tsx` (home) e `imovel/[slug]/page.tsx` não carregam nada da rota promo. Senão, regredimos performance global.

**Mobile-first crítico:** vídeo viral traz 80%+ tráfego mobile. Decisões:
- Mapa fullscreen mobile, drawer (CSS-only `<details>`) na parte de baixo com lista de imóveis
- Lista no drawer = 1 imóvel por linha (cards verticais, não horizontais como desktop)
- Letterbox reduzido: 40px top/bottom em mobile (não 60px) pra preservar viewport
- Mapa: zoom inicial 11 em mobile (Curitiba inteira) com clusters; em desktop zoom 12 mais agressivo

### 3.7 Hospedagem e deploy

**Decisão: subfolder `fymoob.com.br/curitiba8` (não subdomínio).**

Razões:
- **SEO:** subfolder herda authority do domain raiz; subdomain não. ([designspartans 2026](https://designspartans.com/subdomains-subfolders-seo/), [DEV.to case 2024](https://dev.to/imranparthib/from-custom-domain-to-vercel-subdomain-how-i-recovered-my-seo-rankings-56i7))
- **Mesmo `noindex`**, manter no domínio principal facilita compartilhamento + analytics unificado (GA4 já configurado)
- **Vercel deploy:** zero config adicional. Já é Vercel.

**`vercel.json` ajuste:**
```json
{
  "headers": [
    {
      "source": "/curitiba8/(.*)",
      "headers": [{ "key": "X-Robots-Tag", "value": "noindex, nofollow" }]
    }
  ]
}
```

E `metadata` na page:
```ts
export const metadata = { robots: { index: false, follow: false } }
```

Defesa em camadas — header HTTP + meta tag.

---

## 4. Cases similares — landings promocionais que clonaram estética de videogame

### 4.1 Microsoft × Stranger Things — "Windows 1.11" (2019) ⭐ caso ouro

- **O que era:** app Windows nativo (não landing web), emulando Windows 1.0 de 1985, com mini-games, tema Stranger Things "Upside Down" tomando conta da UI, easter eggs.
- **Métricas oficiais limitadas**, mas: conseguiu cobertura em Marketing Dive, Adweek, AList Daily, Future Colossal (agência produtora) — mídia ganha de centenas de milhares.
- **Lição:** **fidelidade nostálgica + interatividade leve = cobertura orgânica de marketing**. Não precisava ser feature-rich; precisava ser reconhecível e brincável.
- Fonte: ([Marketing Dive](https://www.marketingdive.com/news/microsofts-expansive-stranger-things-tie-in-features-retro-windows-app/558330/), [Future Colossal case](https://www.futurecolossal.com/microsoft-windows-111))

### 4.2 GrandMap (2024) — projeto open-source GTA-style sobre OSM

- **O que é:** dev solo construiu mapa de OSM com look GTA (cores, tipografia) usando **Leaflet + ESRI + custom CSS + Carto**.
- **Live:** [grandmap.vercel.app](https://grandmap.vercel.app)
- **Status legal:** existe há 1+ ano, sem cease-and-desist público
- **Lição:** prova de conceito de que **estilo GTA aplicado a mapa real é viável e tem pegada legal aceitável**. Stack do GrandMap é mais antiga (Leaflet) — nosso MapLibre é melhor escolha.
- Fonte: ([DEV.to article](https://dev.to/swagking/grandmap-the-gta-inspired-map-project-nobody-asked-for-but-i-built-anyway-3p8k))

### 4.3 Snazzy Maps — "GTA San Andreas" style para Google Maps (2017)

- **O que é:** estilo de Google Maps publicado em 2017 com paleta GTA San Andreas (water `#7088B0`, roads `#000000`, parks `#788C40`).
- **9 anos no ar sem takedown.**
- **Lição:** paleta + estilo cartográfico inspirado em GTA é território "fan tribute" defensável. Snazzy Maps é Google-only, **mas a paleta migra direto pra MapLibre style spec.**
- Fonte: ([Snazzy Maps](https://snazzymaps.com/style/102017/gta-san-andreas))

### 4.4 Spotify Wrapped (anual) — não videogame, mas case de viral data-storytelling

- 2,1M social mentions em 48h (2024); 400M views TikTok em 3 dias; 200M users engajados em 24h (2025).
- **Mecânica chave aplicável:** slides 9:16 + design otimizado pra screenshot + CTA único de compartilhar = formato rasgar redes sociais.
- **Lição pra Curitiba8:** layout precisa screenshotar bem em 9:16 mesmo que página real seja desktop-first.
- Fonte: ([NoGood](https://nogood.io/blog/spotify-wrapped-marketing-strategy/), [Active Theory tech case](https://medium.com/active-theory/spotify-wrapped-2018-technical-case-study-5b7cfb7e9d3a))

### 4.5 Cyberpunk 2077 (CDPR) — em-jogo brand collab inverso

- Não é landing promocional, mas **provou que estética jogo viraliza em advertising**: Sprite "In 2077 thirst doesn't exist", Old Spice Christmas tie-in, Samsung monitor co-branded.
- Marca pode emprestar look-and-feel de jogo pra produto real **se contrato existir**. Sem contrato, terreno é paródia + transformative use.

### 4.6 Hush, take-down warning real — Vice City fan browser remake (12/2025)

- Take-Two derrubou em 48h um remake browser de Vice City que **reproduzia código + assets** do jogo.
- Diferença com nosso caso: nosso é **estética + paleta + estrutura de página**, **não asset/código nem trademark direto**. Linha defensável diferente.
- Fonte: contexto do plano-videos-virais-gta-style.md seção 7.

---

## 5. Estimativa de horas — MVP vs versão completa

### MVP (versão B paródia, sem mapa, listing pure)

| Item | Horas |
|---|---|
| Setup rota `/curitiba8` + layout sem header FYMOOB + noindex | 2 |
| Letterbox preto top/bottom + browser chrome SVG | 2 |
| Tabs filtro HIGH/MEDIUM/LOW (mapeando faixas de preço Loft) | 3 |
| Fetch da Loft API + mapping pra cards (reutiliza serviço existente) | 1 |
| Card horizontal (imagem 2:1 + tipo + endereço + preço + bairro + botão "VER") | 3 |
| Tipografia Saira Condensed + Pricedown Black + Inter setup | 1 |
| Logo "Curitiba 8" próprio (SVG) — incluir hora de design | 3 |
| Animações scroll-driven CSS + hover cards | 2 |
| Click → router.push pra `/imovel/[slug]` com transição "ROUTE LOCKED" | 2 |
| Mobile responsive ajustes | 3 |
| QA cross-browser (Chrome, Safari iOS, Firefox) | 2 |
| **Total MVP** | **22h** |

### Versão completa (MVP + mapa GTA-style)

MVP + ...

| Item adicional | Horas |
|---|---|
| Custom MapLibre style (Maputnik design + iteração) | 6 |
| MapLibre integração + clusters + symbol layer | 3 |
| Pin click → mini-card overlay → link pra imóvel | 3 |
| Drawer mobile (lista de imóveis sob mapa fullscreen) | 4 |
| **Adicional** | **+16h** |
| **Total completo** | **38h** |

### Versão "completa + polish" (premium)

Total completo + ...

| Item adicional | Horas |
|---|---|
| "Loading screen" GTA-style (animação 1.5s) | 2 |
| SFX cash register / GPS click | 1 |
| Sons posicionais (volume diminui longe do pin) | 3 |
| Easter eggs (Konami code → cor "vendido" muda; click 8x no logo → modo "wanted level") | 4 |
| 3D pseudo (CSS perspective em cards 3D quando hover) | 3 |
| **Adicional** | **+13h** |
| **Total premium** | **51h** |

**Recomendação:** **versão completa (38h)** — o mapa é o diferencial visual que vai impressionar viewer do Reel. Premium adia pra V2 se métricas justificarem.

---

## 6. Riscos técnicos top-5 com mitigações

| # | Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|---|
| 1 | **OpenFreeMap fica fora do ar** (best-effort, sem SLA) | BAIXA | ALTO | Fallback: Maptiler free tier (100k/mês); checar com `try/catch` no init e re-tentar com tiles alternativos. Build-time: incluir 1 tile static screenshot como bg de emergência |
| 2 | **MapLibre init regride Lighthouse global** porque o bundle vaza pra outras rotas | MÉDIA | MÉDIO | Route group isolado + verificar `perf:bundle` snapshot antes/depois. Hard rule: home/imóvel/busca não podem aumentar JS. Falha → revert, isolate mais |
| 3 | **% alta de imóveis sem `Latitude`/`Longitude` na Loft API** | MÉDIA | MÉDIO | Validar com script `count-without-coords.mjs` antes de implementar. Se >30%, fallback `bairro-coordinates.ts` (já existe) — mostra todos do bairro no centroide com leve jitter pra não sobrepor |
| 4 | **Take-Two emite DMCA depois do lançamento** | BAIXA | ALTO | Plano contingência da [versão C](#versão-c--genérica-luxo-escura-sem-referência-gta) preparada como fallback design. Trocar paleta + tipografia em ~4h se necessário. URL fica viva com novo look |
| 5 | **Page virou e bate quotas** (mapa fica branco mid-day) | BAIXA com OpenFreeMap | MÉDIO | OpenFreeMap não tem quota. Mas se trocar pra Maptiler/Mapbox, **monitorar tile load count semanalmente**. Auto-failover entre 2 providers via map style URL rotation |
| 6 (bônus) | **Bruno acha "exagerado/feirão"** | MÉDIA | MÉDIO | Aprovação de mockup estático Figma **antes de codar**. Wagner valida tom (mesmo cuidado dos Reels). Plano B versão C como tom mais classy |

---

## 7. Pendências de POC obrigatórias antes de comprometer 30+ horas

### POC 1 — Estilo MapLibre custom em mobile real (3h)

**Hipótese:** custom style MapLibre com paleta GTA-night carrega em <3s mobile 4G e tem aspecto reconhecível.

**Como testar:**
1. Criar style.json mínimo em Maputnik (uma manhã de trabalho, 4-5 cores principais ajustadas)
2. Subir branch preview Vercel com 1 página `/curitiba8/poc-mapa` mostrando só o mapa fullscreen com 5 markers fake de Curitiba
3. Rodar `npm run perf:baseline -- https://preview-xxx.vercel.app/curitiba8/poc-mapa` em 4G throttle
4. Capturar screenshot mobile e mostrar pro Bruno + Wagner em chat antes de avançar

**Critério go/no-go:**
- LCP <3.5s mobile ✅
- Aspecto visual aprovado por Bruno ("é GTA-like ou parece mapa qualquer com cor escura?") ✅
- Mapa não quebra no Safari iOS (testar em iPhone real, não só dev tools) ✅

**Custo se falha:** ir pra plano B "mapa estático SVG dos 65 bairros + grid de cards". Reduz 16h da estimativa pra 4h. Reduz wow factor mas funciona.

### POC 2 — Logo "Curitiba 8" mockup Figma (2h)

**Hipótese:** dá pra criar logo silhueta-cidade-+-sol que evoca Dynasty 8 sem copiar.

**Como testar:**
1. 3 propostas em Figma (silhueta diferente: Igreja do Paraná Clube, Skyline Centro Cívico, Araucária+prédio genérico)
2. Mostrar pro Bruno + Wagner — "qual evoca melhor o feel sem ser plágio?"
3. Iterar 1-2 vezes

**Critério go/no-go:** decisão estética de cliente, sem métrica objetiva.

### POC 3 — % imóveis com Latitude/Longitude na Loft (30min)

**Hipótese:** maioria dos imóveis ativos tem coordenadas válidas.

**Como testar:**
```bash
node scripts/count-without-coords.mjs
```

(criar script ad-hoc que faz fetch dos imóveis, filtra Status=A e verifica Latitude/Longitude não-zero não-null)

**Critério go/no-go:**
- ≥80% com coords → ir direto, fallback bairro-coordinates pros 20%
- 50-80% → usar fallback agressivamente, esperar visual heterogêneo no mapa
- <50% → reconsiderar; talvez batch enrichment via Nominatim antes do MVP

---

## 8. Trade-offs explícitos pra decisão do Bruno

| Opção | Horas | Custo $/mês | Risco legal | Wow factor | Métricas esperadas (Reel→DM) |
|---|---|---|---|---|---|
| MVP listing-only | 22h | $0 | baixo | 6/10 | ~10-15 DMs/Reel |
| Completo (com mapa MapLibre custom) | 38h | $0 | baixo-médio | 9/10 | ~15-25 DMs/Reel |
| Premium (com sons, easter eggs, 3D) | 51h | $0 | baixo-médio | 10/10 | ~20-30 DMs/Reel |
| Versão C "luxo escura genérica" | 18h | $0 | mínimo | 4/10 | ~5-10 DMs/Reel |

**Meu voto:** **Completo (38h)** — sweet spot. Premium é diminishing returns; MVP perde demais o "wow" que justifica o tráfego dos Reels.

---

## 9. Próximos passos (bloqueia em decisão de Bruno)

- [ ] **Bruno valida** versão (B-completa recomendada, ou alternativa C cautelosa)
- [ ] **Bruno valida** budget ($0/mês confirma) e horas alocadas (38h ~1.5 semanas Vinicius full-time, ou 3 semanas com outras tarefas em paralelo)
- [ ] **Vinicius executa POC 1** (mapa MapLibre custom — 3h)
- [ ] **Wagner valida tom** dos copies satíricos adaptados a Curitiba (1h)
- [ ] **Decisão go/no-go** pós-POC 1
- [ ] **Implementação MVP** (semana 1-2)
- [ ] **Mapa + drawer mobile** (semana 2-3)
- [ ] **QA + smoke test** custom pra rota `/curitiba8` (semana 3)
- [ ] **Lançamento sincronizado com primeiro Reel** ("Vídeo 1: O Penthouse do Ecoville", do plano-videos-virais)

---

## 10. Documentos relacionados

- **Plano de produção dos Reels:** [docs/marketing/plano-videos-virais-gta-style.md](../plano-videos-virais-gta-style.md)
- **Pesquisa referências GTA (existente):** [docs/marketing/research/gta-references-2026-04.md](gta-references-2026-04.md)
- **Loft API service** (geocoding source): `src/services/loft.ts` linhas 130, 141, 244-245
- **PropertyMap atual** (padrão de dynamic import + IntersectionObserver): `src/components/property/PropertyMap.tsx`
- **Bairro coordinates fallback:** `src/lib/bairro-coordinates.ts`

---

## 11. Fontes citadas

### Referência visual e UX do Dynasty 8 / GTA V

- [Dynasty 8 — GTA Wiki Fandom](https://gta.fandom.com/wiki/Dynasty_8) — info principal, tagline, Century 21 reference
- [Dynasty 8 Executive — GTA Wiki](https://gta.fandom.com/wiki/Dynasty_8_Executive) — distinção residencial vs corporativo
- [Dynasty 8/Listings — GTA Wiki](https://gta.fandom.com/wiki/Dynasty_8/Dynasty_8_Listings) — estrutura visual da listagem (extração via Playwright)
- [Internet in GTA V — Wiki](https://gta.fandom.com/wiki/Internet_in_GTA_V) — estrutura do browser in-game
- [Dynasty 8 Logo asset oficial](https://static.wikia.nocookie.net/gtawiki/images/d/df/Dynasty8-GTAV-Logo.png/revision/latest?cb=20150814230544) — extração de cores via canvas
- [Eclipse Towers screenshot](https://static.wikia.nocookie.net/gtawiki/images/1/18/Dynasty8-GTAV-HighEnd-Image-EclipseTowers.png/revision/latest?cb=20171003103218) — formato 2:1 cinemascope das fotos
- [Eyefind homepage screenshot](https://static.wikia.nocookie.net/gtawiki/images/9/9c/Internet-GTAV-Homepage.png/revision/latest?cb=20210629132848) — palette do browser frame
- [Dynasty 8 Real Estate Django clone — markdentoom GitHub](https://github.com/markdentoom/Dynasty-8-Real-Estate) — frontend base (Bootstrap, sem styling especifico)
- [Grand Theft Wiki Dynasty 8](https://www.grandtheftwiki.com/Dynasty_8) — segunda fonte

### Tipografia GTA

- [Pricedown — dafont](https://www.dafont.com/pricedown.font) — fonte original
- [Pricedown Black — Typodermic Fonts](https://typodermicfonts.com) — variante free comercial
- [Fonts in Use — Grand Theft Auto V](https://fontsinuse.com/uses/55702/grand-theft-auto-v) — Chalet 1960 confirmado como UI/HUD
- [Fonts — GTA Wiki](https://gta.fandom.com/wiki/Fonts) — referência completa
- [Eurostile — Wikipedia](https://en.wikipedia.org/wiki/Eurostile) — Microgramma origin story

### Stack técnico

- [OpenFreeMap](https://openfreemap.org/) — provider grátis sem API key
- [OpenFreeMap GitHub](https://github.com/hyperknot/openfreemap) — open-source
- [Simon Willison — OpenFreeMap review](https://simonwillison.net/2024/Sep/28/openfreemap/) — confirma production-ready
- [Maptiler pricing 2026](https://www.maptiler.com/cloud/pricing/) — comparativo (100k free)
- [Mapbox pricing 2026](https://www.mapbox.com/pricing) — comparativo (50k free, $5/1k after)
- [Stadia Maps pricing](https://stadiamaps.com/pricing/) — comparativo (non-comercial free)
- [Maputnik](https://maplibre.org/maputnik/) — editor visual de styles
- [Snazzy Maps GTA San Andreas style](https://snazzymaps.com/style/102017/gta-san-andreas) — paleta de referência
- [GrandMap (DEV.to case)](https://dev.to/swagking/grandmap-the-gta-inspired-map-project-nobody-asked-for-but-i-built-anyway-3p8k) — projeto GTA-style funcional
- [MapLibre large data perf docs](https://maplibre.org/maplibre-gl-js/docs/guides/large-data/) — clusters/symbols
- [MDPI 2025 — Vector data rendering benchmark](https://www.mdpi.com/2220-9964/14/9/336) — MapLibre/Mapbox/OpenLayers comparativo

### Performance / animações

- [MDN animation-timeline view()](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view) — browser support 04/2026
- [Smashing Magazine — CSS Scroll-driven animations intro](https://www.smashingmagazine.com/2024/12/introduction-css-scroll-driven-animations/)
- [Chrome dev — scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)

### SEO / Vercel

- [Vercel KB — preview deploys noindex](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines)
- [Subdomains vs Subfolders for SEO 2026](https://designspartans.com/subdomains-subfolders-seo/)
- [DEV.to — subdomain SEO ranking recovery 2024](https://dev.to/imranparthib/from-custom-domain-to-vercel-subdomain-how-i-recovered-my-seo-rankings-56i7)

### Risco legal

- [Justia — MAFIA trademark Take-Two](https://trademarks.justia.com/885/64/mafia-88564555.html)
- [Game Informer — Take-Two vs Remedy logo dispute 2024](https://gameinformer.com/news/2024/01/16/rockstar-parent-company-take-two-files-trademark-dispute-over-remedys-logo)
- [Rockstar Games — copyright/material posting policy](https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material)

### Cases similares

- [Microsoft × Stranger Things "Windows 1.11"](https://www.marketingdive.com/news/microsofts-expansive-stranger-things-tie-in-features-retro-windows-app/558330/) — case ouro
- [Future Colossal — Microsoft 1.11 production case](https://www.futurecolossal.com/microsoft-windows-111)
- [Spotify Wrapped marketing strategy NoGood](https://nogood.io/blog/spotify-wrapped-marketing-strategy/)
- [Active Theory — Wrapped 2018 tech case study](https://medium.com/active-theory/spotify-wrapped-2018-technical-case-study-5b7cfb7e9d3a)

### Brand / Century 21

- [Century 21 brand color codes](https://www.brandcolorcode.com/century-21) — `#252526` Obsessed Grey, `#BEAF88` Relentless Gold

---

**Mantido por:** Vinicius
**Última atualização:** 2026-04-25
**Status:** ⏳ Aguardando decisão do Bruno (versão B-completa, MVP, ou C-fallback) para iniciar POC 1 (mapa custom MapLibre)
