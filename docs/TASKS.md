# FYMOOB — Task Tracker

> Fonte unica de verdade para todas as tasks do projeto.
> Atualizado: 2026-04-02

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
| 5.6 | Sessao 02/04 | 17 | 17 | 0 | CONCLUIDA |
| 6 | Institucional e Polish | 6 | 1 | 5 | PENDENTE |
| 7 | QA, Deploy, Go-Live | 10 | 0 | 10 | PENDENTE |
| 8 | SEO Programatico | 18 | 0 | 18 | PENDENTE |
| 9 | Painel Blog Admin | 5 | 0 | 5 | PENDENTE |
| -- | Bugs | 1 | 0 | 1 | ABERTO |
| 10 | SEO Intelligence | 18 | 7 | 11 | EM ANDAMENTO |
| -- | Nice-to-Have | 4 | 0 | 4 | FUTURO |
| | **TOTAL** | **136** | **82** | **54** | **60%** |

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

## Sessao 2026-04-02 — Contrato, Tasks, SEO Intelligence, Mobile UX [CONCLUIDA]

<details>
<summary>17 tasks concluidas</summary>

**Contrato e Documentacao:**
- [x] Contrato de prestacao de servicos (`docs/contrato-prestacao-servicos.md`) — 14 clausulas
- [x] Escopo detalhado com automacao (geracao automatica de paginas, painel blog)
- [x] Consolidar TODAS as tasks em `docs/TASKS.md` — fonte unica de verdade
- [x] Atualizar `CLAUDE.md` com Task Management e novas rotas SEO programatico

**SEO Intelligence (Fase 10):**
- [x] Instalar mcp-gsc (Google Search Console MCP) — `c:\Users\Vine\mcp-gsc\`
- [x] Criar `.mcp.json` com config GSC
- [x] Instalar claude-seo skill (20 skills + 10 subagents)
- [x] Criar skill `/project:seo-report` — relatorio semanal automatico
- [x] Criar skill `/project:seo-audit` — auditoria completa FYMOOB
- [x] Criar skill `/project:seo-fix` — correcoes automaticas
- [x] Criar diretorio `docs/seo-reports/` para historico

**Mobile UX:**
- [x] Header — menu dropdown rapido (Area do Cliente, Favoritos, Comparar)
- [x] BottomNav — sempre visivel + WhatsApp integrado (substituiu "Mais")
- [x] WhatsAppFloat — escondido no mobile, apenas desktop
- [x] MobileContactBar — reposicionado acima do BottomNav (bottom-[57px])
- [x] UrgencyBar — barra de urgencia estilo Airbnb (recém-anunciado, achado, popular)
- [x] Menu mobile (Sheet) — secao "Acesso rapido" com Area do Cliente, Favoritos, Comparar

</details>

---

## Fase 6 — Institucional e Polish [PENDENTE]

- [ ] `src/app/sobre/page.tsx` — Pagina Sobre Nos com historia FYMOOB, equipe, CRECI
- [ ] `src/app/contato/page.tsx` — Formulario de contato + mapa + dados
- [ ] `src/app/anuncie/page.tsx` — Landing para captar novos imoveis
- [x] Header definitivo — nav responsivo, logo, busca rapida, CTA, menu dropdown
- [ ] Footer definitivo — links, contato, redes sociais, CRECI
- [ ] GA4 + event tracking (pageview, lead_form, whatsapp_click, share)

---

## Fase 7 — QA, Deploy, Go-Live [PENDENTE]

- [ ] Deploy Vercel producao (fymoob.com)
- [ ] Configurar DNS do dominio fymoob.com
- [ ] Submeter sitemap ao Google Search Console
- [ ] Verificar propriedade no GSC
- [ ] Google Business Profile — fotos, horarios, categorias
- [ ] Lighthouse audit: 500+ paginas (meta: >90 perf, >95 SEO)
- [ ] Rich Results Test em 5+ paginas (imovel, bairro, blog, FAQ, home)
- [ ] Testar formularios de contato (lead chega no CRM?)
- [ ] Configurar redirects do site antigo → novo
- [ ] Monitorar indexacao primeiros 7 dias (GSC + `site:fymoob.com`)

---

## Fase 8 — SEO Programatico [PENDENTE]

> **Objetivo:** Gerar 800+ paginas indexaveis automaticamente a partir dos dados do CRM.
> Todas as paginas devem ter: generateMetadata(), JSON-LD, breadcrumbs, internal linking.
> Todas as combinacoes sao dinamicas — novos imoveis/bairros geram novas paginas automaticamente.

### 8.1 — Landing Bairro + Tipo (PRIORIDADE ALTA)
> Rota: `/imoveis/[bairro]/[tipo]` | Estimativa: ~260 paginas
> Exemplo: `/imoveis/batel/apartamentos` → "Apartamentos no Batel, Curitiba"

- [ ] Verificar estado atual de `src/app/imoveis/[bairro]/[tipo]/page.tsx`
- [ ] Garantir `generateStaticParams()` gera TODAS as combinacoes ativas
- [ ] `generateMetadata()` unica: "Apartamentos no Batel | FYMOOB Curitiba"
- [ ] JSON-LD ItemList + BreadcrumbList schema
- [ ] Conteudo introdutorio dinamico por combinacao (nao so lista de imoveis)
- [ ] Internal linking: links para bairro pai, tipo pai, imoveis relacionados
- [ ] Adicionar ao sitemap com priority 0.7

### 8.2 — Landing Bairro + Finalidade
> Rota: `/imoveis/[bairro]/venda` e `/imoveis/[bairro]/aluguel` | Estimativa: ~130 paginas
> Exemplo: `/imoveis/agua-verde/aluguel` → "Imoveis para Alugar no Agua Verde"

- [ ] Criar rota dinamica ou adaptar segmento existente `[tipo]` para aceitar "venda"/"aluguel"
- [ ] Filtrar por `Finalidade` (Venda/Locacao) ou `ValorVenda`/`ValorLocacao`
- [ ] `generateMetadata()`: "Imoveis a Venda no {Bairro} | FYMOOB Curitiba"
- [ ] Adicionar ao sitemap com priority 0.7
- [ ] Internal linking bidirecional (venda <-> aluguel do mesmo bairro)

### 8.3 — Landing Tipo + Finalidade
> Rota: `/apartamentos-curitiba/venda`, `/casas-curitiba/aluguel` | Estimativa: ~8 paginas

- [ ] Criar subrotas nas landing pages de tipo existentes
- [ ] `generateMetadata()`: "Apartamentos a Venda em Curitiba | FYMOOB"
- [ ] Adicionar ao sitemap com priority 0.8

### 8.4 — Paginas de Empreendimento (revisar existente)
> Rota: `/empreendimento/[slug]` | Estimativa: ~113 paginas
> JA EXISTE parcialmente — revisar qualidade e completude

- [ ] Auditar `src/app/empreendimento/[slug]/page.tsx` — esta gerando todas as 113?
- [ ] Verificar template: unidades disponiveis, faixa preco, construtora, fotos, mapa
- [ ] JSON-LD RealEstateListing ou ApartmentComplex schema
- [ ] `generateMetadata()` com nome do empreendimento, bairro, faixa preco
- [ ] Listagem `/empreendimentos` com todos os empreendimentos + filtros
- [ ] Internal linking: empreendimento → bairro, tipo, imoveis individuais

### 8.5 — Landing Faixas de Preco
> Rotas estaticas | Estimativa: ~5 paginas

- [ ] `/imoveis/ate-300-mil` — Imoveis ate R$ 300 mil em Curitiba
- [ ] `/imoveis/300-a-500-mil` — Imoveis de R$ 300 a 500 mil
- [ ] `/imoveis/500-mil-a-1-milhao` — Imoveis de R$ 500 mil a R$ 1 milhao
- [ ] `/imoveis/1-a-3-milhoes` — Imoveis de R$ 1 a 3 milhoes
- [ ] `/imoveis/acima-3-milhoes` — Imoveis acima de R$ 3 milhoes
- [ ] Template com filtro por faixa, stats da faixa, imoveis listados
- [ ] `generateMetadata()` + JSON-LD para cada faixa
- [ ] Adicionar ao sitemap com priority 0.6

### 8.6 — Landing Bairro + Quartos (FASE FUTURA)
> Rota: `/imoveis/[bairro]/[n]-quartos` | Estimativa: ~195 paginas
> Exemplo: `/imoveis/batel/3-quartos` → "Imoveis com 3 Quartos no Batel"
> Prioridade: BAIXA — implementar apos validar trafego das fases 8.1-8.5

- [ ] Criar rota dinamica `/imoveis/[bairro]/[quartos]/page.tsx`
- [ ] Filtrar por Dormitorio (2, 3, 4+ quartos)
- [ ] `generateStaticParams()` apenas para combinacoes com 3+ imoveis
- [ ] `generateMetadata()` + JSON-LD
- [ ] Adicionar ao sitemap

### 8.7 — Sitemap Expandido
> Meta: 800+ URLs indexaveis

- [ ] Atualizar `src/app/sitemap.ts` para incluir TODAS as novas combinacoes
- [ ] Implementar sitemap index se necessario (split: imoveis, bairros, tipos, empreendimentos, blog)
- [ ] Garantir `lastmod` real via DataAtualizacao da API
- [ ] Submeter sitemap atualizado ao GSC apos deploy
- [ ] Validar com Google Search Console que todas URLs estao sendo descobertas

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

- [ ] **Lightbox Freeze** — Galeria trava ao clicar foto em imoveis COM coordenadas/mapa. Ver `memory/project_lightbox_bug.md` para detalhes da investigacao.

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
AGORA (pre-contrato assinado):
  Fase 6 → Fase 7 → Deploy producao

PARALELO (configurar enquanto desenvolve):
  10.2 Google Cloud OAuth → 10.3 Baseline → 10.4 Monitoramento

APOS DEPLOY (semanas 1-2):
  8.1 Bairro+Tipo → 8.4 Empreendimentos → 8.7 Sitemap

APOS VALIDACAO TRAFEGO (semanas 3-4):
  8.2 Bairro+Finalidade → 8.3 Tipo+Finalidade → 8.5 Faixas Preco

FASE FUTURA (mes 2+):
  8.6 Bairro+Quartos → Fase 9 Painel Blog

QUANDO POSSIVEL:
  Bug lightbox → Nice-to-haves
```
