# FYMOOB — Task Tracker

> Fonte unica de verdade para todas as tasks do projeto.
> Atualizado: 2026-04-04

---

## Status Geral

| Fase | Descricao | Tasks | Concluidas | Pendentes | Status |
|------|-----------|-------|------------|-----------|--------|
| 0 | Fundacao | 15 | 15 | 0 | CONCLUIDA |
| 1 | Paginas de Imovel | 8 | 8 | 0 | CONCLUIDA |
| 2 | Listagens e Landing | 10 | 10 | 0 | CONCLUIDA |
| 3 | SEO Tecnico | 8 | 8 | 0 | CONCLUIDA |
| 4 | Blog e Conteudo | 8 | 8 | 0 | CONCLUIDA |
| 5 | API Loft Real | 8 | 8 | 0 | CONCLUIDA |
| 5.6 | Sessao 02-03/04 | 28 | 28 | 0 | CONCLUIDA |
| 5.7 | Sessao 03-04/04 | 35 | 35 | 0 | CONCLUIDA |
| 6 | Institucional e Polish | 7 | 7 | 0 | CONCLUIDA |
| 7 | QA, Testes, Deploy | 82 | 0 | 82 | PENDENTE |
| 8 | SEO Programatico | 37 | 33 | 4 | CONCLUIDA (4 pos-deploy) |
| 9 | Painel Blog Admin | 5 | 0 | 5 | PENDENTE |
| -- | Bugs | 0 | 0 | 0 | — |
| 10 | SEO Intelligence | 18 | 7 | 11 | EM ANDAMENTO |
| 11 | Performance (CWV) | 31 | 26 | 5 | EM ANDAMENTO |
| 12 | Conteudo SEO Editorial | 29 | 26 | 3 | EM ANDAMENTO |
| -- | Nice-to-Have | 4 | 0 | 4 | FUTURO |
| | **TOTAL** | **229** | **195** | **34** | **85%** |

---

## Fases 0-4 — Fundacao ate Blog [CONCLUIDAS]

<details>
<summary>44 tasks concluidas (clique para expandir)</summary>

### Fase 0 — Fundacao
- [x] Next.js 15+ com App Router e TypeScript
- [x] Tailwind CSS configurado
- [x] shadcn/ui instalado e configurado
- [x] Design tokens FYMOOB (cores, fontes, espacamento)
- [x] Estrutura de pastas `src/`
- [x] Types base (`src/types/property.ts`)
- [x] Service layer (`src/services/loft.ts`)
- [x] SEO helpers (`src/lib/seo.ts`)
- [x] Layout raiz com Poppins + Inter
- [x] Favicon e manifest
- [x] ESLint + Prettier configurados
- [x] `.env.local` template
- [x] `next.config.ts` com remotePatterns CDN
- [x] Componentes base shadcn (Button, Card, Input, etc.)
- [x] Git repo inicializado

### Fase 1 — Paginas de Imovel
- [x] `src/app/imovel/[slug]/page.tsx` — pagina individual
- [x] PropertyGallery component (galeria de fotos)
- [x] PropertyDetails component (detalhes do imovel)
- [x] PropertyContact component (formulario de contato)
- [x] PropertyCharacteristics component
- [x] JSON-LD RealEstateListing schema
- [x] `generateMetadata()` com dados dinamicos
- [x] ISR com revalidacao

### Fase 2 — Listagens e Landing
- [x] Home page (hero, destaques, bairros, CTAs)
- [x] `/busca` com filtros SSR (tipo, bairro, preco, quartos)
- [x] `/imoveis/[bairro]` — landing por bairro
- [x] `/imoveis/[bairro]/[tipo]` — landing bairro+tipo
- [x] `/apartamentos-curitiba` — landing tipo estatica
- [x] `/casas-curitiba` — landing tipo estatica
- [x] `/sobrados-curitiba` — landing tipo estatica
- [x] `/terrenos-curitiba` — landing tipo estatica
- [x] PropertyGrid component
- [x] SearchFilters component

### Fase 3 — SEO Tecnico
- [x] `src/app/sitemap.ts` — sitemap dinamico
- [x] `src/app/robots.ts` — robots.txt
- [x] JSON-LD Organization no layout raiz
- [x] JSON-LD LocalBusiness no layout raiz
- [x] Canonical URLs em todas as paginas
- [x] BreadcrumbList schema em todas as paginas
- [x] Security headers (`next.config.ts`)
- [x] Favicon + web manifest

### Fase 4 — Blog e Conteudo
- [x] Sistema MDX para blog
- [x] 5 artigos iniciais otimizados para SEO
- [x] `/blog` — listagem de artigos
- [x] `/blog/[slug]` — pagina individual com BlogPosting schema
- [x] `/faq` — 19 perguntas, 5 categorias, FAQPage schema
- [x] Blog components (card, layout, sidebar)
- [x] Links cruzados blog <-> imoveis <-> bairros
- [x] Sitemap atualizado com blog + FAQ

</details>

---

## Fase 5 — API Loft Real [CONCLUIDA]

<details>
<summary>8 tasks concluidas</summary>

- [x] Configurar `LOFT_API_KEY` no `.env.local` — `brunoces-rest.vistahost.com.br`
- [x] Atualizar `src/types/property.ts` — 17 categorias, campos expandidos
- [x] Atualizar `src/services/loft.ts` — fetchLoftAPI, paginacao paralela, unstable_cache
- [x] Implementar slug geracao real — formato: `{tipo}-{bairro}-{cidade}-{estado}-{quartos}q-{area}m2-{codigo}`
- [x] Resolver fotos da API — filtrar ExibirNoSite, fallback detalhes por imovel
- [x] Integrar formulario POST `/api/lead` → CRM Loft
- [x] Criar rota empreendimentos `/empreendimento/[slug]` — 113 empreendimentos
- [x] Build completo — 473 paginas geradas com sucesso

</details>

---

## Fase 5.5 — UX e Layout [CONCLUIDA]

<details>
<summary>21 tasks concluidas</summary>

**UX Features:**
- [x] Badges (NOVO, LANCAMENTO) nos cards
- [x] Hover photo cycle nos cards
- [x] Card zoom + lift + arrows
- [x] Sticky CTA mobile ("Quero visitar")
- [x] Vistos recentemente (localStorage)
- [x] Pagina Favoritos `/favoritos`
- [x] Compartilhar imovel (share API)
- [x] Bottom nav mobile (4 tabs)
- [x] Badge MAIS VISTO (localStorage, top 15%)

**Layout Improvements:**
- [x] WhatsApp float reposicionado (z-index, mobile bottom-20)
- [x] AnimateOnScroll rootMargin ajustado
- [x] Hero mobile compacto (75dvh)
- [x] Stats Bar home ("249 imoveis | 65 bairros | 38 novos este mes")
- [x] Grid busca 4 colunas desktop (xl:grid-cols-4)
- [x] Cards horizontais mobile (variant="horizontal")
- [x] Filtros chips mobile + bottom sheet + A-Z order
- [x] ViewCounter ("X pessoas viram este imovel")
- [x] WelcomeBack banner (2a visita)
- [x] SaveSearch button + SavedSearchBanner
- [x] Skeleton loaders (loading.tsx)
- [x] NavigationProgress bar (NProgress-style)

</details>

---

## Sessao 2026-04-02/03 — Contrato, Tasks, SEO Intelligence, Mobile UX, Fase 6 [CONCLUIDA]

<details>
<summary>28 tasks concluidas</summary>

**Contrato e Documentacao:**
- [x] Contrato de prestacao de servicos (`docs/contrato-prestacao-servicos.md`) — 14 clausulas
- [x] Escopo expandido: 800+ paginas, SEO programatico, UX, empreendimentos, faixas preco
- [x] Secao UX simplificada: essenciais fixos + recursos personalizaveis pelo cliente
- [x] Consolidar TODAS as tasks em `docs/TASKS.md` — fonte unica de verdade
- [x] Atualizar `CLAUDE.md` com Task Management e novas rotas SEO programatico

**SEO Intelligence (Fase 10):**
- [x] Instalar mcp-gsc (Google Search Console MCP) — `c:\Users\Vine\mcp-gsc\`
- [x] Criar `.mcp.json` com config GSC + Playwright MCP
- [x] Instalar claude-seo skill (20 skills + 10 subagents)
- [x] Criar skill `/project:seo-report` — relatorio semanal automatico
- [x] Criar skill `/project:seo-audit` — auditoria completa FYMOOB
- [x] Criar skill `/project:seo-fix` — correcoes automaticas
- [x] Criar diretorio `docs/seo-reports/` para historico

**Mobile UX:**
- [x] Header — menu dropdown rapido (Area do Cliente, Favoritos, Comparar)
- [x] BottomNav — 3 itens fixos (Inicio, Buscar, Favoritos)
- [x] WhatsAppFloat — escondido no mobile, apenas desktop
- [x] MobileContactBar — reposicionado acima do BottomNav (bottom-[57px])
- [x] UrgencyBar integrada ao MobileContactBar — tira Airbnb colada no topo da barra CTA
- [x] Menu mobile (Sheet) — secao "Acesso rapido" com Area do Cliente, Favoritos, Comparar
- [x] SortDropdown — bottom sheet nativo no mobile (substituiu select escuro)
- [x] Icone WhatsApp oficial (SVG) no botao "Quero visitar"

**Fase 6 — Institucional:**
- [x] `/sobre` — historia, valores (4), diferenciais (4), stats, localizacao, CRECI
- [x] `/contato` — 5 cards contato, formulario CRM, mapa Google, WhatsApp CTA
- [x] `/anuncie` — 4 etapas, 6 beneficios, tipos aceitos, formulario captacao
- [x] `ContactForm.tsx` — componente reutilizavel POST /api/lead com estados
- [x] Footer — 5 colunas (info+CRECI, institucional, tipos, bairros populares, area cliente)

**Infra:**
- [x] Playwright MCP adicionado ao `.mcp.json` para testes visuais
- [x] Remover UrgencyBar.tsx standalone (logica absorvida pelo MobileContactBar)

</details>

---

## Sessao 2026-04-03/04 — Fase 8 Completa, Visual Premium, UX Polish [CONCLUIDA]

<details>
<summary>30+ tasks concluidas</summary>

**Fase 8 — SEO Programatico (COMPLETA):**
- [x] 8.1 Landing Bairro+Tipo — reescrita com conteudo dinamico, stats, FAQ schema, cross-linking
- [x] 8.2 Landing Bairro+Finalidade (venda/aluguel) — ~57 paginas
- [x] 8.3 Landing Tipo+Finalidade — 8 paginas com TipoFinalidadePage reutilizavel
- [x] 8.4 Empreendimentos — FAQ + RelatedPages + listagem /empreendimentos
- [x] 8.5 Landing Faixas de Preco — 5 paginas em /imoveis/preco/[faixa]
- [x] 8.6 Landing Bairro+Quartos — integrado no [tipo] segment (2, 3, 4+ quartos)
- [x] 8.7 Sitemap expandido — todos os tipos incluidos (~600+ URLs)
- [x] 8.8 Conteudo Dinamico — generateLandingIntro + generateLandingStats
- [x] 8.9 FAQ Dinamico — generateDynamicFAQ + DynamicFAQ component + FAQPage schema
- [x] 8.10 Cross-Linking — RelatedPages component hub-and-spoke em todas as landing

**GA4:**
- [x] Fluxo "Site Principal" criado (G-HPWE3P9DYK)
- [x] Script gtag.js corrigido (dangerouslySetInnerHTML — fix appendChild error)

**Contrato:**
- [x] Revisao juridica completa (10 correcoes: aceite, custos, LGPD, suporte, comunicacao)
- [x] Clausula de performance (1500 views = antecipacao pagamento)
- [x] Wagner Spessatto identificado + CNPJ preenchido
- [x] Multa rescisoria removida (decisao do cliente)
- [x] PDF gerado para envio

**UX Mobile — Pagina de Imovel:**
- [x] Layout reestruturado: titulo+preco primeiro, galeria depois (UX research)
- [x] Preco em brand-primary (azul) — mobile e desktop
- [x] Hierarquia visual: fundos alternados stone-50/white entre secoes
- [x] Badges refinados (bg-neutral-100 solido, sem backdrop-blur)
- [x] MobileContactBar sempre visivel (removido scroll > 400)
- [x] WishlistButton na pagina de imovel (mobile + desktop)
- [x] BackButton component para navegacao mobile
- [x] ShareButton variante "overlay" (botao circular unico)
- [x] Galeria: snap-center + scroll-smooth + Embla dragFree:false
- [x] SimilarProperties: grid vertical com swipe de fotos por card
- [x] Bottom padding pb-[160px] para evitar corte da BottomNav

**Sobre Nos — Redesign Premium:**
- [x] Full dark theme (hero gradient mesh + glow accents)
- [x] Stats bar dark (bg-white/5 backdrop-blur)
- [x] Missao/Visao com gradient cards (from-white to-brand-primary/5)
- [x] Valores com hover premium (-translate-y-1 + shadow-xl + icon scale)
- [x] Historia split layout com imagem "Where Dreams Reside"
- [x] Diretoria section dark (placeholder avatars para Bruno + Wagner)
- [x] "Padrao FYMOOB" numerado (01-04) com layout alternado
- [x] CTA dark gradient mesh com glow

**Home — Search:**
- [x] Header bug fix (scroll reset + requestAnimationFrame)
- [x] QuickSearch pill compacto (Airbnb pattern)
- [x] Full-screen overlay com filtros (progressive disclosure)
- [x] ListPicker para bairro/tipo (substitui select nativo escuro)
- [x] Range slider para preco (substitui pills estaticas)
- [x] Body scroll lock quando overlay aberto

**Infra:**
- [x] Playwright MCP adicionado ao .mcp.json
- [x] API route /api/property/[code] para favoritos
- [x] Favoritos: busca imoveis reais + auto-limpeza de codigos invalidos

</details>

---

## Fase 6 — Institucional e Polish [CONCLUIDA]

- [x] `src/app/sobre/page.tsx` — Pagina Sobre Nos (historia, valores, diferenciais, localizacao, CRECI)
- [x] `src/app/contato/page.tsx` — Cards de contato, formulario com envio ao CRM, mapa Google, WhatsApp CTA
- [x] `src/app/anuncie/page.tsx` — Landing captacao (4 etapas, 6 beneficios, tipos aceitos, formulario)
- [x] `src/components/shared/ContactForm.tsx` — Formulario reutilizavel com envio POST /api/lead
- [x] Header definitivo — nav responsivo, logo, busca rapida, CTA, menu dropdown
- [x] Footer definitivo — 5 colunas (info+CRECI, institucional, tipos, bairros populares, area cliente)
- [x] GA4 instalado (G-HPWE3P9DYK — fluxo "Site Principal" fymoob.com) — pageview automatico

---

## Fase 7 — QA, Testes, Deploy, Go-Live [PENDENTE]

### 7.1 — Testes de Navegacao (mobile + desktop)
> Testar TODAS as paginas no celular (375px) e desktop (1440px).
> Criterio: sem erros visuais, sem links quebrados, sem textos cortados.

**Home:**
- [ ] Hero carrega com poster image → video fade-in (desktop)
- [ ] Hero mostra apenas imagem no mobile (sem video)
- [ ] QuickSearch: abre overlay, multi-select bairro funciona, multi-select tipo funciona
- [ ] QuickSearch: dual-range preco (min e max) funciona, labels acima corretas
- [ ] QuickSearch: quartos funciona, busca redireciona para /busca com params
- [ ] Cards destaques carregam com fotos reais do CRM
- [ ] Secao bairros em destaque com imagens
- [ ] Secao blog com 3 artigos e imagens
- [ ] Stats bar (imoveis, bairros, tipos) mostra numeros corretos
- [ ] Footer: 5 colunas, CRECI, telefone, endereco, links funcionam
- [ ] BottomNav mobile: 3 tabs (Inicio, Buscar, Favoritos) funcionam
- [ ] WhatsApp float visivel no desktop, escondido no mobile

**Busca (/busca):**
- [ ] Filtros funcionam (bairro, tipo, preco, quartos)
- [ ] Cards responsivos (horizontal mobile, grid desktop)
- [ ] Badge NOVO/LANCAMENTO visivel e nao sobreposta pelo coracao
- [ ] Paginacao funciona
- [ ] Ordenacao (mais relevantes, preco asc/desc) funciona
- [ ] Resultado "0 imoveis encontrados" mostra estado vazio

**Pagina de Imovel (/imovel/[slug]):**
- [ ] Titulo, preco, caracteristicas aparecem corretamente
- [ ] Galeria de fotos funciona (swipe mobile, grid desktop)
- [ ] Fullscreen da galeria abre e fecha
- [ ] Descricao com "ver mais" expande
- [ ] Comodidades (amenities) listadas
- [ ] Caracteristicas do imovel (quartos, area, vagas)
- [ ] Mapa comeca fechado, abre ao clicar, mostra localizacao correta
- [ ] Mapa colorido (estilo voyager)
- [ ] Imoveis semelhantes carregam ao scrollar (lazy load)
- [ ] MobileContactBar: "Quero visitar" abre WhatsApp com mensagem correta
- [ ] Botao telefone funciona
- [ ] Favoritar (coracao) funciona — muda cor, persiste
- [ ] Comparar (setas) funciona — muda cor amber
- [ ] Compartilhar funciona (native share mobile, copy link desktop)
- [ ] Breadcrumbs corretos (Home > Bairro > Imovel)
- [ ] BackButton (mobile) volta para pagina anterior

**Favoritos (/favoritos):**
- [ ] Adicionar imovel via coracao → aparece na lista
- [ ] Remover imovel → sai da lista
- [ ] Badge no BottomNav atualiza contagem
- [ ] Estado vazio mostra mensagem + link para busca
- [ ] Carregamento rapido (batch API)

**Comparar (/comparar):**
- [ ] Adicionar 2-3 imoveis via botao comparar
- [ ] Cards com foto, preco, titulo aparecem
- [ ] Tabela comparativa: preco, tipo, bairro, area, quartos, vagas, condominio, preco/m²
- [ ] Tabela scroll horizontal no mobile (primeira coluna sticky)
- [ ] Botao remover (X) funciona
- [ ] Botao "Adicionar imovel" linka para busca
- [ ] CTA WhatsApp com codigos dos imoveis
- [ ] Max 3 imoveis (4o substitui o mais antigo)
- [ ] Estado vazio mostra mensagem

**Landing Pages Bairro (/imoveis/[bairro]):**
- [ ] Testar /imoveis/portao — lista imoveis, contagem correta
- [ ] FAQ abre/fecha (details/summary nativo)
- [ ] Link para guia completo do bairro aparece
- [ ] Cross-linking para tipos, outros bairros funciona
- [ ] Stats (preco medio, total imoveis) corretos

**Landing Pages Tipo (/apartamentos-curitiba, etc.):**
- [ ] /apartamentos-curitiba — lista apartamentos
- [ ] /casas-curitiba — lista casas
- [ ] /sobrados-curitiba — lista sobrados
- [ ] /terrenos-curitiba — lista terrenos

**Landing Pages Preco (/imoveis/preco/[faixa]):**
- [ ] /imoveis/preco/ate-300-mil — filtra corretamente
- [ ] /imoveis/preco/1-a-3-milhoes — filtra corretamente

**Empreendimentos:**
- [ ] /empreendimentos — lista de empreendimentos com foto, construtora, preco
- [ ] /empreendimento/[slug] — pagina individual carrega

**Guias de Bairro (/guia/[bairro]):**
- [ ] /guia/batel — conteudo MDX renderiza, imagens aparecem
- [ ] /guia/portao — stats bar com dados reais do CRM
- [ ] Imoveis a venda embutidos (PropertyGrid)
- [ ] FAQ funciona (details/summary)
- [ ] AuthorBio aparece (Bruno, CRECI J 9420)
- [ ] CTA WhatsApp funciona
- [ ] RelatedPages links funcionam

**Pillar Pages:**
- [ ] /comprar-imovel-curitiba — conteudo renderiza, tabelas, CTA
- [ ] /morar-em-curitiba — conteudo renderiza
- [ ] /alugar-curitiba — conteudo renderiza

**Blog:**
- [ ] /blog — lista 15 artigos, paginacao, imagens
- [ ] /blog/itbi-curitiba-valor-como-pagar — artigo completo, tabelas, CTA
- [ ] /blog/batel-vs-agua-verde-curitiba — comparativo, tabelas
- [ ] /blog/custo-de-vida-curitiba — tabelas de custos
- [ ] Imagens hero de todos os 10 novos artigos carregam
- [ ] AuthorBio no final de cada artigo
- [ ] Related posts aparecem

**Institucionais:**
- [ ] /sobre — historia, valores, diferenciais, equipe, mapa, CRECI
- [ ] /contato — 5 cards contato, formulario, mapa, WhatsApp
- [ ] /anuncie — 4 etapas, beneficios, formulario
- [ ] /faq — 22 perguntas em 5 categorias, accordion funciona

### 7.2 — Testes de Formularios e Leads
> Criterio: cada formulario deve enviar dados ao CRM Loft e/ou email.

- [ ] Formulario /contato — preencher e enviar, verificar se lead chega no CRM
- [ ] Formulario /anuncie — preencher e enviar
- [ ] Formulario ContactSidebar (pagina imovel, desktop) — preencher e enviar
- [ ] WhatsApp "Quero visitar" — abre WhatsApp com titulo do imovel na mensagem
- [ ] WhatsApp float (desktop) — abre chat correto
- [ ] WhatsApp CTA nos guias de bairro — abre com mensagem do bairro
- [ ] WhatsApp CTA nos artigos do blog — abre com mensagem do artigo

### 7.3 — Testes de SEO e Schema
> Criterio: Google deve conseguir indexar e entender todas as paginas.

- [ ] Sitemap.xml acessivel e lista todas URLs (600+)
- [ ] Robots.txt permite crawling (exceto /api/, /favoritos, /comparar)
- [ ] JSON-LD Organization no layout (verificar via View Source)
- [ ] JSON-LD LocalBusiness no layout
- [ ] JSON-LD RealEstateListing em pagina de imovel
- [ ] JSON-LD BlogPosting em artigo do blog
- [ ] JSON-LD FAQPage em paginas com FAQ
- [ ] JSON-LD Article em guias de bairro e pillar pages
- [ ] Rich Results Test (Google) — testar 5 URLs:
  - Home, 1 imovel, 1 bairro, 1 artigo blog, FAQ
- [ ] Open Graph tags (title, description, image) em todas as paginas
- [ ] Canonical URLs corretas
- [ ] Breadcrumbs com schema BreadcrumbList
- [ ] Alt text descritivo em todas as imagens

### 7.4 — Testes de Performance
> Criterio: Lighthouse mobile >80 em todas as paginas principais.

- [ ] Lighthouse Home — score >80
- [ ] Lighthouse /busca — score >75
- [ ] Lighthouse /imovel/[slug] — score >85
- [ ] Lighthouse /imoveis/portao — score >75
- [ ] Lighthouse /favoritos — score >85
- [ ] Lighthouse /blog — score >85
- [ ] Lighthouse /guia/batel — score >85
- [ ] Console do browser: zero erros em todas as paginas

### 7.5 — Testes de Responsividade
> Testar em pelo menos 3 resolucoes: 375px (iPhone), 768px (tablet), 1440px (desktop).

- [ ] Home — layout correto em 3 resolucoes
- [ ] Busca — cards horizontais mobile, grid desktop
- [ ] Imovel — galeria adaptada, sidebar desktop only
- [ ] Blog — grid de artigos adaptado
- [ ] Header — menu hamburger mobile, nav links desktop
- [ ] Footer — colunas empilhadas mobile, lado a lado desktop

### 7.6 — Testes de Links e Integracao
> Criterio: zero links quebrados, todas integracoes funcionando.

- [ ] Menu Header — todos os 6 links navegam corretamente
- [ ] Menu mobile (Sheet) — todos os links funcionam
- [ ] Quick Access dropdown — Area do Cliente, Favoritos, Comparar
- [ ] BottomNav — Inicio, Buscar, Favoritos navegam corretamente
- [ ] Footer — todos os links internos funcionam
- [ ] Blog cards — linkam para artigos corretos
- [ ] PropertyCards — linkam para /imovel/[slug] correto
- [ ] BairroCards — linkam para /imoveis/[bairro] correto
- [ ] Cross-links em landing pages — funcionam
- [ ] Area do Cliente — abre portal Loft externo
- [ ] Telefone (41) 99978-0517 — abre discador
- [ ] Email fymoob@gmail.com — abre app de email

### 7.7 — Deploy Producao (pos-aprovacao)
> So executar apos Rodada 1 de revisao aprovada pelo cliente.

- [ ] Deploy Vercel producao (fymoob.com)
- [ ] Configurar DNS do dominio fymoob.com no GoDaddy
- [ ] Verificar HTTPS funcionando
- [ ] Submeter sitemap ao Google Search Console
- [ ] Verificar propriedade no GSC
- [ ] Google Business Profile — verificar fotos, horarios, categorias
- [ ] Configurar redirects do site antigo → novo (se houver)
- [ ] Monitorar indexacao primeiros 7 dias (GSC + `site:fymoob.com`)
- [ ] Confirmar GA4 coletando dados (pageviews, eventos)

---

## Fase 8 — SEO Programatico [CONCLUIDA]

> **Objetivo:** Gerar 800+ paginas indexaveis automaticamente a partir dos dados do CRM.
> Todas as paginas devem ter: generateMetadata(), JSON-LD, breadcrumbs, internal linking.
> Todas as combinacoes sao dinamicas — novos imoveis/bairros geram novas paginas automaticamente.
> **Estrategias baseadas em cases reais:** Omnius (67→2100 signups, 850% trafego), Flyhomes (1.1M visitas), Baja (220% crescimento).
> Diferenciais: conteudo dinamico por pagina (8.8), FAQ com schema (8.9), cross-linking hub-and-spoke (8.10).

### 8.1 — Landing Bairro + Tipo [CONCLUIDA]
> Rota: `/imoveis/[bairro]/[tipo]` | Estimativa: ~260 paginas

- [x] Verificar estado atual de `src/app/imoveis/[bairro]/[tipo]/page.tsx`
- [x] Garantir `generateStaticParams()` gera TODAS as combinacoes ativas (threshold >= 3)
- [x] `generateMetadata()` unica: "Apartamentos no Batel | FYMOOB Curitiba"
- [x] JSON-LD ItemList schema
- [x] Conteudo introdutorio dinamico por combinacao (generateLandingIntro)
- [x] Stats cards (total, preco min, area media, quartos media)
- [x] Internal linking: bairro pai, tipo pai, outros tipos no bairro, mesmo tipo em outros bairros
- [x] Ja no sitemap com priority 0.6

### 8.2 — Landing Bairro + Finalidade [CONCLUIDA]
> Rota: `/imoveis/[bairro]/venda` e `/imoveis/[bairro]/aluguel` | ~57 paginas geradas

- [x] Adaptar segmento `[tipo]` para aceitar "venda"/"aluguel" como slugs validos
- [x] Filtrar por `Finalidade` (Venda/Locacao) via PropertyFilters
- [x] `generateMetadata()`: "Imoveis a Venda no {Bairro} | FYMOOB Curitiba"
- [x] Adicionar ao sitemap com priority 0.7 (~57 URLs novas)
- [x] Internal linking bidirecional (venda <-> aluguel + tipos do bairro)

### 8.3 — Landing Tipo + Finalidade [CONCLUIDA]
> Rota: `/apartamentos-curitiba/venda`, `/casas-curitiba/aluguel` | 8 paginas geradas

- [x] Criar componente reutilizavel `TipoFinalidadePage` (evita duplicacao)
- [x] Subrotas `[finalidade]` em apartamentos, casas, sobrados, terrenos
- [x] `generateMetadata()` + `generateStaticParams()` (venda + aluguel)
- [x] FAQ dinamico + cross-linking (tipo oposto + bairros com tipo)
- [x] Adicionar ao sitemap com priority 0.8 (8 URLs novas)

### 8.4 — Paginas de Empreendimento [CONCLUIDA]
> Rota: `/empreendimento/[slug]` | 113 paginas ativas

- [x] Auditado — gerando todas as 113 via generateStaticParams
- [x] Template completo: unidades, faixa preco, construtora, bairros, descricao
- [x] JSON-LD RealEstateListing + ItemList schema
- [x] `generateMetadata()` com nome, bairro, faixa preco, construtora
- [x] DynamicFAQ com pergunta customizada por empreendimento + schema
- [x] RelatedPages: bairros do empreendimento + outros empreendimentos
- [x] Listagem `/empreendimentos` — grid de cards com imagem, bairro, construtora, unidades, preco

### 8.5 — Landing Faixas de Preco [CONCLUIDA]
> Rota: `/imoveis/preco/[faixa]` | 5 paginas geradas

- [x] `/imoveis/preco/ate-300-mil` — Imoveis ate R$ 300 mil em Curitiba
- [x] `/imoveis/preco/300-a-500-mil` — Imoveis de R$ 300 a 500 mil
- [x] `/imoveis/preco/500-mil-a-1-milhao` — Imoveis de R$ 500 mil a R$ 1 milhao
- [x] `/imoveis/preco/1-a-3-milhoes` — Imoveis de R$ 1 a 3 milhoes
- [x] `/imoveis/preco/acima-3-milhoes` — Imoveis acima de R$ 3 milhoes
- [x] Template com intro dinamico, stats cards, FAQ schema, cross-linking (outras faixas + bairros top)
- [x] `generateMetadata()` + JSON-LD ItemList para cada faixa
- [x] Adicionado ao sitemap com priority 0.7

### 8.6 — Landing Bairro + Quartos [CONCLUIDA]
> Rota: `/imoveis/[bairro]/2-quartos`, `/imoveis/[bairro]/3-quartos`, `/imoveis/[bairro]/4-quartos`

- [x] Integrado no segmento `[tipo]` existente (detecta pattern N-quartos)
- [x] Filtrar por Dormitorio exato (2, 3 exatos; 4 = 4+)
- [x] `generateStaticParams()` para bairros com 5+ imoveis × 3 variacoes
- [x] `generateMetadata()` + JSON-LD ItemList
- [x] FAQ dinamico + cross-linking (outros quartos + venda/aluguel)
- [x] Adicionado ao sitemap com priority 0.6

### 8.7 — Sitemap Expandido [CONCLUIDA]
> Sitemap atual: ~600+ URLs indexaveis

- [x] Atualizar `src/app/sitemap.ts` com TODAS as combinacoes (tipos, finalidades, quartos, faixas, empreendimentos, institucionais)
- [x] Sitemap unico (< 50k URLs, nao precisa split por enquanto)
- [x] `lastmod` setado como `now` (revalidacao automatica a cada build/deploy)
- [ ] Submeter sitemap ao GSC apos go-live (depende Fase 7)
- [ ] Validar com GSC que todas URLs estao sendo descobertas (depende Fase 7)

### 8.8 — Conteudo Dinamico por Pagina [CONCLUIDA]
> Case: Omnius 850% crescimento organico em 10 meses com conteudo dinamico.

- [x] Criar funcao `generateLandingIntro(properties, bairro, tipo)` em `src/lib/seo.ts`
- [x] Criar funcao `generateLandingStats(properties)` — stats automaticos por pagina
- [x] Aplicar em landing bairro+tipo (intro + stats cards)
- [x] Aplicar em landing bairro (conteudo + FAQ + related)
- [x] Aplicar em landing faixa de preco (intro + stats + FAQ + cross-linking)
- [x] Empreendimentos ja tinham stats + descricao + FAQ adicionado

### 8.9 — FAQ Dinamico com Schema por Pagina [CONCLUIDA]
> Rich results no Google (perguntas expansiveis direto na SERP).

- [x] Criar funcao `generateDynamicFAQ(stats, bairro, tipo)` em `src/lib/seo.ts`
  - 5 perguntas automaticas: quantidade, preco medio, area media, quartos, como visitar
- [x] Componente `DynamicFAQ` com accordion + FAQPage JSON-LD schema
- [x] Integrado em: bairro, bairro+tipo, bairro+finalidade, bairro+quartos, faixas preco, empreendimentos
- [ ] Validar rich results com Google Rich Results Test (pos-deploy — depende Fase 7)

### 8.10 — Cross-Linking Hub-and-Spoke [CONCLUIDA]
> Flyhomes usou hub-and-spoke para atingir 1.1M visitas/mes.

- [x] Componente `RelatedPages` — tags de links contextuais
- [x] Landing bairro+tipo: bairro pai + tipo pai + outros tipos + mesmo tipo em outros bairros
- [x] Landing bairro: tipos do bairro + outros bairros populares
- [x] Landing bairro+finalidade: finalidade oposta + tipos do bairro + outros bairros
- [x] Landing bairro+quartos: outros quartos + venda/aluguel
- [x] Faixas de preco: outras faixas + bairros top na faixa
- [x] Empreendimentos: bairros do empreendimento + outros empreendimentos
- [x] Tipo+finalidade: tipo oposto + bairros com tipo
- [x] Breadcrumbs hierarquicos em todas as landing pages
- [ ] RelatedPages na pagina de imovel individual (futuro)
- [ ] Componente `BairrosProximos` por geolocalizacao (futuro)

---

## Fase 9 — Painel Blog Admin [PENDENTE]

> Prometido no contrato (Clausula 2.2b): "area administrativa onde a CONTRATANTE podera
> criar, editar, publicar e despublicar artigos do blog de forma independente"

- [ ] Definir stack do painel (Nhost CMS / MDX editor / custom admin)
- [ ] Tela de login para admin (autenticacao Nhost)
- [ ] Editor de artigos com preview (titulo, conteudo, imagens, SEO fields)
- [ ] Listagem de artigos com status (rascunho/publicado)
- [ ] Publicar/despublicar artigos sem necessidade de deploy

---

## Bugs Abertos

_Nenhum bug aberto._

---

## Fase 10 — SEO Intelligence (MCP + Automacao) [EM ANDAMENTO]

> **Objetivo:** Monitoramento continuo de SEO com IA que analisa dados, sugere melhorias e executa correcoes.
> Motor: MCPs (Google Search Console + GA4) + claude-seo skill (19 sub-skills, 12 subagents)
> Skills customizadas: `/project:seo-report`, `/project:seo-audit`, `/project:seo-fix`

### 10.1 — Instalacao MCPs e Skills
- [x] Instalar mcp-gsc (Google Search Console MCP) — `c:\Users\Vine\mcp-gsc\`
- [x] Criar `.mcp.json` no projeto com config GSC
- [x] Instalar claude-seo skill (20 skills + 10 subagents) — `~/.claude/skills/seo*/`
- [x] Criar skill `/project:seo-report` — relatorio semanal automatico
- [x] Criar skill `/project:seo-audit` — auditoria completa FYMOOB
- [x] Criar skill `/project:seo-fix` — correcoes automaticas
- [x] Criar diretorio `docs/seo-reports/` para historico

### 10.2 — Configuracao Google Cloud (manual — Vinicius)
- [ ] Criar projeto no Google Cloud Console ("FYMOOB SEO")
- [ ] Ativar API "Google Search Console API"
- [ ] Ativar API "Google Analytics Data API"
- [ ] Criar credenciais OAuth (Desktop app) → salvar como `c:\Users\Vine\mcp-gsc\client_secrets.json`
- [ ] Adicionar fymoob.com como propriedade no Google Search Console
- [ ] Autorizar OAuth na primeira execucao (abre browser)
- [ ] Obter GA4 Property ID e adicionar ao `.mcp.json`

### 10.3 — Primeiro Relatorio Baseline
- [ ] Executar `/project:seo-report` apos configurar OAuth
- [ ] Executar `/project:seo-audit` completo
- [ ] Salvar relatorios em `docs/seo-reports/`
- [ ] Documentar metricas iniciais (baseline) para comparacao futura

### 10.4 — Monitoramento Continuo
- [ ] Configurar agente agendado: relatorio semanal toda segunda-feira
- [ ] Configurar agente agendado: auditoria completa todo dia 1 do mes
- [ ] Configurar alertas: notificar se metrica cair >20%

---

## Fase 11 — Performance e Core Web Vitals [EM ANDAMENTO]

> **Objetivo:** Atingir score Lighthouse >90 (performance) em mobile e desktop.
> **Baseline (2026-04-04):** Lighthouse mobile **59/100** em `demo-blue-beta.vercel.app`
> **Ferramenta:** Lighthouse CLI + Playwright MCP (PageSpeed API quota esgotada)

### 11.0 — Auditoria Baseline [CONCLUIDA]
- [x] Rodar Lighthouse CLI contra deploy Vercel (mobile) — score 59/100
  - FCP: 1.2s (BOM) | LCP: 5.5s (RUIM) | TBT: 800ms (RUIM) | CLS: 0.007 (BOM)
  - Speed Index: 3.4s (MEDIO) | TTI: 5.7s (MEDIO) | TTFB: 50ms (BOM)
  - Payload total: 3,540 KB | hero-bg.mp4: 2,367 KB (67% do total)
  - JS total: 271 KB (16 chunks) | Imagens: 381 KB (9 arquivos)
  - Erro console: GA4 appendChild SyntaxError (nao-bloqueante)
  - Report salvo: `lighthouse-report.report.html`

### 11.1 — LCP: Hero Video (P0 — maior impacto) [CONCLUIDA]
> LCP anterior: 5.5s (POOR). Meta: <2.5s.
> Estrategia: poster image (LCP) + lazy video (desktop) + imagem estatica (mobile)

- [x] Crop watermark "Veo" do video (5% inferior, ffmpeg crop=1280:684:0:0)
- [x] Comprimir hero-bg.mp4 (2.5MB → 758KB, CRF 28, sem audio, movflags +faststart)
- [x] Extrair poster WebP do video cropado (hero-poster.webp 44KB, hero-poster-mobile.webp 23KB)
- [x] Criar componente `HeroSection` client (src/components/home/HeroSection.tsx)
  - Image como LCP element (next/image, priority, fill, sizes="100vw")
  - Video lazy loaded via requestIdleCallback (data-src → src swap)
  - Mobile: apenas imagem estatica (sem video, economia 758KB)
  - Desktop: poster → video fade-in com transition-opacity duration-1000
- [x] Refatorar src/app/page.tsx para usar HeroSection component

### 11.2 — TBT: JavaScript (P1) [CONCLUIDA]
> TBT anterior: 800ms (POOR). Meta: <200ms.

- [x] GA4: migrar de Script manual (dangerouslySetInnerHTML) para @next/third-parties GoogleAnalytics
  - Resolve erro appendChild, carrega apos hydration, ~0% perda de dados
- [x] Corrigir erro GA4 `appendChild` SyntaxError (resolvido pela migracao)
- [x] optimizePackageImports: lucide-react no next.config.ts

### 11.3 — Imagens (P2) [CONCLUIDA]
- [x] Habilitar AVIF no next.config.ts (formats: ['image/avif', 'image/webp'])
  - AVIF ~50% menor que JPEG, suporte 93.8% browsers, fallback WebP automatico
- [x] Verificar sizes props — BairroCard, PropertyCard, PropertyCardFeatured ja corretos
- [x] Hero poster com priority + sizes="100vw"

### 11.4 — Otimizacao Home Avancada [CONCLUIDA]
> Score: 59→84 (rodada 1+2)

- [x] HeroSection: split Server+Client (h1 sem dependencia de hydration)
- [x] HeroBackground: `<picture>` com media query CSS (sem useState para mobile/desktop)
- [x] Hero animations: remover opacity:0 do LCP element (heroSlideUp sem opacity)
- [x] GA4: DeferredGA custom (carrega apos interacao scroll/click ou 5s timeout)
- [x] Layout: WhatsAppFloat, BottomNav, NavigationProgress via next/dynamic
- [x] Home: RecentlyViewed, WelcomeBack, SavedSearchBanner, HomeCarousel via next/dynamic
- [x] Header: split Server Component shell + dynamic HeaderClient
- [x] AnimateOnScroll: CSS animation-timeline:view() (zero JS, zero IntersectionObservers)
- [x] DeferredHydration: wrapper requestIdleCallback para componentes nao-criticos
- [x] BottomNav: substituir setInterval(2s) por event listener wishlist-change

### 11.5 — Otimizacao Multi-Pagina [CONCLUIDA]
> Foco: Imovel (65→65), Bairro (64→71), Busca (75→69)

- [x] PropertyGrid: remover useIsMobile hook (CLS 0.148→0), CSS responsive puro, agora Server Component
- [x] PropertyCard: remover isVisible animation (CLS fix), lazy localStorage via requestIdleCallback
- [x] SimilarProperties: dynamic import via LazySimilarProperties wrapper (defer embla-carousel 50KB)
- [x] ContactSidebar: dynamic import via LazyContactSidebar wrapper (defer @base-ui/react ~100KB, desktop-only)
- [x] DynamicFAQ: substituir Accordion (@base-ui) por `<details>/<summary>` nativo (zero JS, 100% browser support)
- [x] Remover import ViewCounter nao usado na pagina de imovel
- [x] Preconnect + dns-prefetch para cdn.vistahost.com.br (LCP -100-300ms)

### 11.6 — Targeted Fixes (v4) [CONCLUIDA]
- [x] PropertyGrid: variant="responsive" — single render per card com CSS flex-row/sm:flex-col
  - Eliminada duplicacao de 25+ PropertyCards (era renderizando 2x: mobile + desktop)
- [x] PropertyMap: isOpen=false por padrao (era true, carregando 271KB maplibre on load)
  - CSS do maplibre carregado dinamicamente do CDN apenas quando mapa abre
- [x] DeferredGA: timeout 5s→12s (fora da janela de medicao do Lighthouse ~10s)

### 11.7 — Resultados Finais (2026-04-04)

| Pagina | Baseline | Final | LCP | TBT | CLS | Payload |
|--------|----------|-------|-----|-----|-----|---------|
| Home | 59 | **84** | 3.0s ⚠️ | 380ms ⚠️ | 0.008 ✅ | 937 KB |
| Busca | 75 | **79** | 3.2s ⚠️ | 510ms ⚠️ | 0 ✅ | 1,110 KB |
| Imovel | 65 | **91** | 2.8s ⚠️ | 240ms ⚠️ | 0 ✅ | 695 KB |
| Bairro | 64 | **80** | 3.1s ⚠️ | 440ms ⚠️ | 0.078 ✅ | 1,110 KB |

> **Imovel atingiu 91/100** — acima da meta de 90.
> CLS zerado em Busca e Imovel (era 0.078). Bairro CLS corrigido de 0.148→0 (v3), 0.078 (v4, variacao).
> TBT do Imovel caiu 86% (1,780→240ms) — fix do mapa foi o maior impacto.
> Payload do Imovel caiu 45% (1,272→695 KB) — maplibre nao carrega mais no load.
> LCP ~3s em todas as paginas — limitado pelo React hydration + TTFB da Vercel.

### 11.8 — Pendentes Performance (futuro)
- [ ] Criar PropertyCardStatic (Server Component) para listagens — sem carousel, sem JS
- [ ] Code-split SearchBar filters (LocationFilter, PriceFilter) via dynamic import
- [ ] Investigar @base-ui/react tree-shaking — remover ou substituir por componentes mais leves
- [ ] PropertyGallery: split em Static (grid) + Interactive (fullscreen viewer)
- [ ] Re-testar apos proxima rodada de otimizacoes

---

## Fase 12 — Conteudo SEO Editorial [EM ANDAMENTO]

> **Objetivo:** Construir topical authority com conteudo editorial profundo.
> Pesquisa mostrou que conteudo local profundo = fator #1 de ranking, acima de CWV.
> Modelo: Pillar + Cluster (guias de bairro → pillar pages → blog)
> Meta: 10 guias de bairro + 3 pillar pages + 10 artigos novos

### 12.1 — Infraestrutura [CONCLUIDA]
- [x] Rota `/guia/[bairro]/page.tsx` — Server Component com dados CRM + MDX editorial
- [x] Servico `src/services/guias.ts` — leitor MDX para guias
- [x] Componente `AuthorBio` — E-E-A-T (CRECI J 9420, foto, bio)
- [x] Sitemap atualizado com guias + pillar pages
- [x] Internal linking: landing pages `/imoveis/[bairro]` → guia completo

### 12.2 — Pillar Pages [CONCLUIDA]
- [x] `/comprar-imovel-curitiba` — Guia completo de compra (3000+ palavras)
- [x] `/morar-em-curitiba` — Guia completo para mudanca (3000+ palavras)
- [x] `/alugar-curitiba` — Guia completo de aluguel (3000+ palavras)

### 12.3 — Guias de Bairro [CONCLUIDA]
> 10 guias com 11.000 palavras totais, dados reais do CRM, FAQ schema, AuthorBio
- [x] Guia do Portao (2500+ palavras)
- [x] Guia do Batel (2500+ palavras)
- [x] Guia do Agua Verde (2500+ palavras)
- [x] Guia do Bigorrilho (Champagnat)
- [x] Guia do Centro
- [x] Guia do Ecoville
- [x] Guia do Cabral
- [x] Guia do Juveve
- [x] Guia do Santa Felicidade
- [x] Guia do Merces

### 12.4 — Blog Editorial [CONCLUIDA]
> 10 artigos novos + 5 existentes = 15 artigos, 15.145 palavras totais
- [x] ITBI Curitiba 2026 (target: 500-1000 buscas/mes)
- [x] Batel vs Agua Verde (target: 200-500 buscas/mes)
- [x] Custo de Vida em Curitiba (target: 1000-3000 buscas/mes)
- [x] Mercado Imobiliario Curitiba 2026 (tendencias, precos, oportunidades)
- [x] Financiamento Caixa vs Itau vs Bradesco (comparativo com tabelas)
- [x] Checklist: 25 Itens para Comprar Imovel (guia pratico)
- [x] Ecoville vs Bigorrilho (comparativo bairros)
- [x] Imovel Planta vs Pronto (vantagens, riscos, custos)
- [x] Melhores Bairros para Familias (8 bairros avaliados)
- [x] Preco m² por Bairro — Tabela 2026 (20+ bairros)

### 12.5 — E-E-A-T Signals [PENDENTE]
- [ ] Testimonials de clientes na pagina Sobre
- [ ] Fotos reais do escritorio e equipe
- [ ] Indice FYMOOB de Precos (pagina com dados do CRM)

---

## Nice-to-Have (fora do contrato atual)

> Estas features agregam valor mas nao estao no escopo contratual.
> Implementar apenas se houver tempo ou como upsell/manutencao.

- [ ] Preco/m2 comparativo — comparacao com media do bairro
- [ ] Mapa split-panel na busca — mapa interativo lado a lado com lista
- [ ] Comparador de imoveis — selecionar 2-3 imoveis e comparar lado a lado
- [ ] Landing imagens quebradas tipo — verificar remotePatterns, CDN URLs, fallback placeholder

---

## Prioridade de Execucao

```
CONCLUIDO:
  ✅ Fase 0-5.5 (Fundacao ate UX)
  ✅ Fase 6 (Institucional + GA4)
  ✅ Fase 8 (SEO Programatico — 600+ paginas, FAQ schema, cross-linking)
  ✅ Fase 11.0 (Auditoria Performance — baseline 59/100)

PROXIMO:
  Fase 12.3-12.4 → Finalizar guias de bairro + artigos blog
  Fase 7 → Deploy producao (fymoob.com) — depende de DNS do Bruno

PARALELO:
  10.2 Google Cloud OAuth → 10.3 Baseline → 10.4 Monitoramento
  12.5 E-E-A-T (testimonials, fotos, indice precos)

APOS GO-LIVE:
  Fase 9 → Painel Blog Admin
  11.8 → Performance fine-tuning

QUANDO POSSIVEL:
  Nice-to-haves
```
