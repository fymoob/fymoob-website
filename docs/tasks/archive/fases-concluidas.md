# Archive — Fases concluidas (Fases 0-9, 13, 13.11)

> Snapshot das fases concluidas: 0-6, 8, 9 (deprecated), 13, 13.11.
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


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

---


## Fase 9 — Painel Admin Unificado [EM ANDAMENTO]

> **Escopo base (Cláusula 2.2b do contrato):** área administrativa para criar, editar,
> publicar e despublicar **artigos do blog** de forma independente.
>
> **Escopo aditivo (em negociação com Bruno, R$ 7.500-9.000 one-time):** painel de
> edição de empreendimentos (textos editoriais, vídeos Vturb, plantas, banners).
>
> **Decisão estratégica (14/04/2026):** construir UMA infraestrutura compartilhada
> (auth + shell) que serve blog E empreendimentos, ao invés de dois painéis separados.
> Evita duplicação de código e fornece experiência única de login pro Bruno/Wagner.

### 9.0 — Arquitetura de Segurança (decidida 14/04/2026)

**Princípio:** defesa em profundidade — 7 camadas independentes.

| Camada | Mecanismo | Ferramenta |
|---|---|---|
| 1. URL | `/admin/*` no mesmo domínio (sem subdomain) | Next.js routing |
| 2. Autenticação | **Magic link** por email (passwordless) | Auth.js v5 (NextAuth) + Resend |
| 3. Bot filter | Cloudflare Turnstile no form de login | Turnstile widget (free) |
| 4. Rate limit | 5 magic links / 15 min por email + 20/h por IP | Upstash Redis (free tier) |
| 5. Auth em runtime | `auth()` check em cada route + server action | Auth.js v5 |
| 6. Sessão | Cookie HttpOnly + Secure + SameSite=Lax, maxAge 12h | Auth.js default |
| 7. Audit log | Registra `{user, action, timestamp, IP}` de cada operação | Tabela Postgres |

**Admin list:** via env var `ALLOWED_ADMIN_EMAILS` (CSV). Só emails nesta lista podem receber magic link. Simples pra 2-3 usuários; migrar pra tabela DB quando passar de 5.

**CVE crítica Next.js (março 2025):** garantir versão ≥ 15.2.3 (atual do projeto OK).

**Por que magic link ao invés de senha:**
- Sem credencial pra vazar (não há senha armazenada)
- Credential stuffing: impossível
- Phishing: atacante precisa invadir email do admin (barra alta)
- Zero fricção de "esqueci a senha"
- UX melhor pra Bruno (email que ele já usa)

**Ações críticas (futuro, não-MVP):** MFA via TOTP opcional pra ações irreversíveis (publicar artigo novo, deletar empreendimento). Deixar como feature roadmap.

### 9.1 — Base (auth + shell) [CONCLUIDA — 14/04/2026]

Infraestrutura compartilhada, entregue antes de qualquer feature específica.

- [x] Instalar dependências: `next-auth@beta`, `resend`, `@upstash/ratelimit`, `@upstash/redis`, `@auth/upstash-redis-adapter`
- [x] Configurar Auth.js v5 em `src/auth.ts` (email provider + session JWT + Upstash adapter pra verification tokens)
- [x] Criar rota `/admin/login` com form minimalista (email + Turnstile)
- [x] Implementar envio de magic link via Resend (template HTML customizado)
- [x] Rate limit por email (5/15min) e IP (20/h) via Upstash Redis
- [x] Criar `src/proxy.ts` (antigo middleware.ts — Next.js 16 renomeou) bloqueando `/admin/*`
- [x] Criar `/admin/layout.tsx` com sidebar de navegação (Blog, Empreendimentos, logout)
- [x] Criar `/admin` (dashboard placeholder com status das features)
- [x] Logout funcional na sidebar (server action via Auth.js signOut)
- [x] Env vars documentadas em `.env.example` + `docs/admin-panel-setup.md`
- [x] Esconder chrome público (Header/Footer/BottomNav/WhatsAppFloat) em `/admin/*`
- [x] Provisionamento end-to-end validado (Resend + Upstash + Turnstile + AUTH_SECRET + whitelist)
- [x] Teste ponta-a-ponta: login → magic link → dashboard → logout (14/04/2026)

**Arquivos entregues:**
- [src/auth.ts](src/auth.ts), [src/proxy.ts](src/proxy.ts), [src/lib/rate-limit.ts](src/lib/rate-limit.ts), [src/lib/turnstile.ts](src/lib/turnstile.ts)
- [src/app/api/auth/[...nextauth]/route.ts](src/app/api/auth/[...nextauth]/route.ts)
- [src/app/admin/login/page.tsx](src/app/admin/login/page.tsx), [src/app/admin/login/LoginForm.tsx](src/app/admin/login/LoginForm.tsx), [src/app/admin/login/actions.ts](src/app/admin/login/actions.ts)
- [src/app/admin/layout.tsx](src/app/admin/layout.tsx), [src/app/admin/page.tsx](src/app/admin/page.tsx)
- [src/components/layout/ChromeGate.tsx](src/components/layout/ChromeGate.tsx)
- [docs/admin-panel-setup.md](docs/admin-panel-setup.md)

### 9.1.5 — Ownership & Migração de Contas [PENDENTE — PRIORIDADE ALTA]

**Problema:** todas as contas de infra externas foram criadas com o email pessoal do Vinicius (`dev.viniciusdamas@gmail.com`), não com email da FYMOOB. Risco de governança:

- Se Vinicius sair do projeto, Bruno fica sem acesso à própria infra
- Se for necessário pagar algum plano no futuro, billing fica no pessoal do Vinicius
- Não é padrão profissional de client work
- Direito/propriedade da infra é ambíguo

**Ação prioritária:** Bruno precisa criar um email operacional da FYMOOB (ex: `dev@fymoob.com` ou `sistema@fymoob.com`) e todas as contas devem ser transferidas/recriadas com esse email.

**Mensagem sugerida pro Bruno:**
> "Bruno, pra garantir que a FYMOOB seja dona de toda a infra do site (contas de banco, email, bot protection, etc.), precisamos criar um email neutro tipo `dev@fymoob.com` — seria só pra cadastrar serviços técnicos. Não é email pessoal teu, é um 'endereço de sistema'. Consegue criar e me passar a senha? Eu cadastro tudo e deixo você como admin também."

**Inventário de contas a migrar:**

| Serviço | Uso | Owner atual | Ação necessária | Dificuldade |
|---|---|---|---|---|
| **Resend** | Envio de magic link | `dev.viniciusdamas@gmail.com` (pessoal) | Criar conta nova com email FYMOOB + regenerar API key | Fácil (env var) |
| **Upstash** | Redis (auth tokens + rate limit) | `dev.viniciusdamas@gmail.com` | Settings → Change Email OU recriar banco (zero custo) | Fácil |
| **Cloudflare** | Turnstile (anti-bot login) | `dev.viniciusdamas@gmail.com` | Profile → Change email + adicionar Vinicius como member | Fácil |
| **Supabase** | Banco Postgres (blog + empreendimentos futuros) | A criar | **CRIAR DIRETO com email FYMOOB** | Fácil — ainda não criado |
| **Vercel** | Deploy | Verificar | Adicionar FYMOOB como owner, Vinicius como collaborator | Médio |
| **Nhost** | ~~PostgreSQL~~ (**descontinuado — substituído por Supabase**) | — | Cancelar conta ou abandonar | N/A |
| **GitHub** | Repo `ViniciusDamas/demo` | Vinicius pessoal | Transferir pra org FYMOOB (ou criar nova org + fork) | Médio |
| **Google Cloud** | OAuth pra Search Console/GA4 MCP (Fase 10) | Vinicius | Futuro — criar com email FYMOOB quando ativar MCPs | Baixa urgência |

**Ordem sugerida de migração (após Bruno criar email):**

- [ ] Bruno criar `dev@fymoob.com` ou similar
- [ ] Bruno compartilhar credenciais com Vinicius (gerenciador de senhas)
- [ ] **Supabase**: criar direto com email FYMOOB (antes de provisionar schema)
- [ ] **Resend**: recriar conta + API key + atualizar env var
- [ ] **Upstash**: mudar email (ou recriar Redis — zero dados persistentes relevantes)
- [ ] **Cloudflare Turnstile**: mudar email de conta
- [ ] **Vercel**: adicionar FYMOOB como owner (Billing no nome da empresa)
- [ ] **GitHub**: avaliar transferência ou convite de Bruno como collaborator no repo atual
- [ ] **Nhost**: cancelar (não usamos mais)
- [ ] **Google Cloud**: quando for ativar MCPs, já criar com email FYMOOB
- [ ] Atualizar `.env.local` e Vercel env vars com novos tokens onde aplicável
- [ ] Documentar no `docs/admin-panel-setup.md` quem é owner de cada serviço

### 9.2 — Blog admin [DEPRECATED — substituida pela Fase 18]

> **DEPRECATED 2026-04-30:** o escopo de blog admin foi reescrito como **Fase 18 — Custom Blog Admin (Sanity Replacement)**. Sanity foi instalado em 25/04 mas o cliente decidiu remover (lock-in moderado, hard caps no free tier, UX dev-flavored pro Bruno). Substituicao: BlockNote + Supabase + JSON estruturado, 100% custom. Ver [secao Fase 18](#fase-18--custom-blog-admin-sanity-replacement-pendente--pr-separado) abaixo. As tasks abaixo permanecem como referencia historica e NAO devem ser executadas.

Depois da 9.1.5. Usa a mesma auth compartilhada.

**Decisão de storage (14/04/2026):** trocar Nhost por **Supabase PostgreSQL**. Motivo:
- Nhost free tier pausa o banco depois de 1 semana sem uso — inviabiliza produção
- Supabase free tier: 500MB DB + 1GB storage + 5GB bandwidth — sobra muito pra milhares de artigos
- Supabase não pausa na prática porque o site público faz query a cada pageview
- Row Level Security integrada se precisar no futuro

- [ ] Criar projeto Supabase com email FYMOOB (região sa-east-1 São Paulo)
- [ ] Schema no Supabase PostgreSQL: tabela `articles` (id, slug, title, excerpt, content, cover_image, status, published_at, author_id, created_at, updated_at, seo_title, seo_description, og_image, category, tags JSONB)
- [ ] Migration dos 15 artigos MDX existentes pra tabela (script one-shot em `scripts/migrate-mdx-to-supabase.ts`)
- [ ] Instalar deps: `@supabase/supabase-js`, `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`
- [ ] `/admin/blog` — lista com status (rascunho/publicado), filtro por autor, busca por título
- [ ] `/admin/blog/new` — criar novo artigo com auto-save draft
- [ ] `/admin/blog/[id]` — editar artigo existente
- [ ] Editor: **TipTap rich text** com toolbar (bold, italic, heading, list, link, image, blockquote, code)
- [ ] Preview live do artigo ao lado do editor
- [ ] Upload de imagem: **Supabase Storage** (bucket `articles-covers` e `articles-inline`)
- [ ] Auto-gerar slug a partir do título (kebab-case, dedupe)
- [ ] Publicar/despublicar sem redeploy (muda `status` no banco)
- [ ] Revalidation: ao publicar, `revalidatePath(/blog)` e `revalidatePath(/blog/[slug])`
- [ ] Render público em `/blog/[slug]` consome do Supabase (com fallback pra MDX durante transição)
- [ ] Regenerar sitemap dinamicamente ao publicar
- [ ] Campos SEO específicos: meta title, meta description, OG image
- [ ] Categoria (dropdown) + tags (multi-input)
- [ ] Autor pré-selecionado com usuário logado

### 9.3 — Empreendimentos admin [ESCOPO NOVO, AGUARDANDO DECISÃO DO BRUNO]

Só inicia após fechamento comercial do escopo aditivo (R$ 7.500-9.000 one-time).

- [ ] Schema Supabase: tabela `empreendimento_content` (slug FK CRM, hero_text, hero_image_url, video_url, diferenciais_text, torres_json, plantas_extras_json, etc.)
- [ ] `/admin/empreendimentos` — lista de todos empreendimentos do CRM
- [ ] `/admin/empreendimentos/[slug]` — editor por empreendimento
- [ ] Campos editáveis (definidos junto com Bruno via enquete WhatsApp):
  - Logo (upload)
  - Imagem de capa
  - Frase de destaque
  - Descrição editorial
  - Imagens de parallax (3-5)
  - Torres (nome + foto + descrição cada)
  - Diferenciais / área de lazer
  - Vídeo Vturb/YouTube (embed URL)
  - Texto sobre construtora
- [ ] Upload de assets em Supabase Storage bucket `empreendimentos/[slug]/`
- [ ] Render público em `/empreendimento/[slug]` lê CRM (auto) + painel (editorial)
- [ ] Fallback: se não há dados no painel, renderiza só com dados do CRM

### 9.4 — Auditoria e Observabilidade [futuro]

- [ ] Tabela Supabase `audit_logs` (user_id, action, entity, entity_id, metadata_json, ip, user_agent, created_at)
- [ ] Middleware de log em todas as server actions de `/admin`
- [ ] `/admin/logs` — visualização filtrável (só Vinicius / super-admin)
- [ ] Alertas: email quando algo crítico acontece (ex: >10 tentativas de login falhas em 1h)

### 9.5 — MFA opcional [futuro]

- [ ] TOTP (Google Authenticator) como segundo fator opcional
- [ ] Código de recuperação
- [ ] Fluxo de setup no perfil do admin
- [ ] Obrigatório só pra ações destrutivas (deletar empreendimento, etc.)

### 9.7 — Imagens de Bairros (bônus) [NOVO — solicitado 14/04/2026]

**Problema identificado:** as imagens dos bairros (Batel, Água Verde, Bigorrilho, Portão, etc.) hoje estão salvas localmente em `public/images/bairros/*.jpg` — 13 arquivos. Pra trocar qualquer uma, precisa commit + deploy. Bruno não consegue atualizar de forma independente.

**Onde essas imagens aparecem no site:**
- Cards de bairro na listagem `/imoveis/[bairro]`
- Guias de bairro (`content/bairros/*.mdx`)
- Possivelmente em cards da home e /busca (verificar)
- SEO `og:image` em algumas páginas

**Escopo do painel bônus:**

- [ ] Schema Supabase: tabela `bairros_content` (slug PK, nome, cover_image_url, thumbnail_url, descricao_curta, updated_at, updated_by)
- [ ] Seed inicial: migrar as 13 imagens atuais (`public/images/bairros/*.jpg`) pro Supabase Storage + tabela
- [ ] `/admin/bairros` — grid com todos os bairros da base (inclusive os que ainda não têm imagem customizada), mostrando thumbnail atual
- [ ] Editor por bairro: upload de nova capa (drag-drop), crop opcional, preview antes de salvar
- [ ] Fallback inteligente: se Supabase tem imagem customizada → usa. Se não → usa `public/images/bairros/[slug].jpg` (retrocompat). Se nem local existe → placeholder genérico.
- [ ] Todas as queries de bairro no site usam um helper `getBairroImage(slug)` que resolve essa cascata
- [ ] Revalidate automático ao salvar: `revalidatePath('/imoveis/[bairro]')`, `/busca`, home
- [ ] Audit log: registra quem trocou qual imagem e quando

**Vantagens:**
- Bruno pode atualizar fotos de bairros em tempo real (sazonais, eventos, novas perspectivas)
- Mesmo padrão do painel de empreendimentos — reuso de componentes (upload, cropper, revalidate)
- Custo zero (Supabase Storage free tier é 1 GB — 13 imagens médias = ~5 MB total)
- Escala pra qualquer bairro novo sem deploy

**Estimativa de esforço:**
- Schema + migration das 13 imagens: ~1h
- `/admin/bairros` grid: ~1.5h
- Editor individual com upload: ~2h
- Helper `getBairroImage` + refactor de callers: ~1h
- Revalidate + audit log: ~1h
- **Total: ~6-7h** (feature pequena, reusa componentes do blog/empreendimentos)

**Ordem de execução sugerida:**
1. Depois do Blog admin (9.2) — já tem o padrão de upload/edit estabelecido
2. Antes ou paralelo ao Empreendimentos admin (9.3) — compartilham padrões de asset management
3. Pode ser feito como "freebie" pra consolidar o painel admin unificado antes da entrega final

### 9.6 — Avisos técnicos documentados

- **Resend em modo teste**: usando sender `onboarding@resend.dev` (free tier). Limitação: só envia emails pro endereço dono da conta Resend. Pra produção com outros admins, precisa verificar domínio `fymoob.com` (registros DNS — SPF/DKIM/DMARC) e trocar `RESEND_FROM_EMAIL` pra `noreply@fymoob.com`.
- **Turnstile hostnames configurados**: `demo-blue-beta.vercel.app`, `fymoob.com`, `localhost`. Adicionar outros domínios de preview conforme necessário.
- **Nhost descontinuado**: env var `NHOST_SUBDOMAIN` pode ser removida após confirmação. Não estamos mais usando.
- **Next.js 16 rename**: `middleware.ts` foi renomeado pra `proxy.ts` (convenção oficial). Função exportada também mudou de `middleware` pra `proxy`.

---

---


## Fase 13 — Funcionalidades e UX Polish [CONCLUIDA]

> Funcionalidades implementadas na sessao de 04-05/04/2026.

### 13.1 — Comparador de Imoveis [CONCLUIDA]
- [x] Pagina /comparar — comparacao lado a lado de ate 3 imoveis
  - Cards com foto, preco, titulo, botao remover
  - Tabela comparativa: preco, tipo, bairro, area, quartos, suites, banheiros, vagas, condominio, IPTU, preco/m², financiamento, permuta
  - CTA WhatsApp com codigos dos imoveis na mensagem
  - Estado vazio com link para busca
- [x] CompareButton — botao comparar nas paginas de imovel (mobile + desktop)
  - localStorage com evento "compare-change"
  - Max 3 imoveis (4o substitui o mais antigo)
  - Highlight amber quando ativo
- [x] /api/properties/batch — API route para buscar multiplos imoveis em 1 request

### 13.2 — Multi-Select e Dual Range [CONCLUIDA]
- [x] QuickSearch: multi-select bairros com checkboxes (pode selecionar varios)
- [x] QuickSearch: multi-select tipos com checkboxes
- [x] QuickSearch: dual-range price slider (Airbnb pattern) — 1 barra, 2 thumbs
  - CSS puro (zero JS library), thumbs 24px azul brand
  - Labels min/max acima em pills
- [x] MultiListPicker: tela cheia com checkboxes, "Limpar" + "Confirmar (N)"

### 13.3 — UI Polish [CONCLUIDA]
- [x] Cards busca mobile: texto compacto (text-base, line-clamp-2, hide meta row)
- [x] Badge/heart menores no mobile responsive (nao sobrepostos)
- [x] Imovel: espacamento reduzido entre secoes (mt-8→mt-4/6)
- [x] Mapa: estilo positron (cinza) → voyager (colorido)
- [x] Blog: 10 imagens hero otimizadas (Unsplash, 1200x630, 64-183KB)
- [x] Blog: imagem Batel vs Agua Verde substituida por foto real de Curitiba (Rua XV)
- [x] Contato: icone WhatsApp oficial SVG
- [x] Favoritos: batch API (1 request em vez de N)

### 13.4 — Contrato [CONCLUIDA]
- [x] Ajustes solicitados pelo Wagner (6 alteracoes)
  - 3 rodadas revisao, 120 dias suporte, 3h/solicitacao
  - Suporte Vercel (diagnostico), excedente "avaliado conjuntamente"
  - 3 sessoes treinamento de 1h
- [x] Dados preenchidos: CPFs, CNPJ MEI, dados bancarios Bradesco
- [x] Parcelas: 6x R$2.500 dia 10, primeira 10/05/2026
- [x] Data assinatura: 04/04/2026
- [x] PDF gerado e enviado para assinatura digital

### 13.5 — Padrao Ouro UI/UX (sessao 06/04/2026) [CONCLUIDA]
- [x] PropertyFeatures: removido pills cinzas (bg-neutral-50) — atributos inline limpos
- [x] formatPrice: removido centavos (R$7.000.000 em vez de R$7.000.000,00)
- [x] PropertyDetails: codigo do imovel movido do header para rodape tecnico
- [x] PropertyDetails: titulo com line-clamp-2
- [x] MobileContactBar: removido logica localStorage views (urgencia so backend)
- [x] MobileContactBar: preco em brand-primary, bottom-0, safe area iPhone
- [x] BottomNav auto-hide na pagina de imovel (scroll down=esconde, scroll up=mostra, idle 2s=mostra)
- [x] BottomNav: transicao suave translateY 300ms (sem CLS)
- [x] WelcomeBack banner removido da home + arquivo deletado

### 13.6 â€” Refino Focado da Busca (sessao 07/04/2026) [CONCLUIDA]
- [x] Toolbar da /busca unificada dentro de `PropertyListingGrid` com contador real, ordenacao, salvar busca, limpar filtros e grid/lista
- [x] Contagem corrigida para usar `total` do backend e exibicao "Mostrando N nesta pagina"
- [x] `PropertyListingGrid` sem decisao responsiva por JS â€” mobile resolvido por CSS/Tailwind
- [x] `PropertyCard` no contexto de busca refinado com preco em destaque, CTA "Ver detalhes", "Consultar valor" e layout mais compacto
- [x] Default de ordenacao da `/busca` trocado de "Mais relevantes" para "Mais recentes" (desktop + mobile) — 27/04/2026, commit de teste pos-transfer Vercel/GitHub
- [x] Fix GSC "Excluida pela tag noindex" (44 URLs) — 27/04/2026: dynamicParams=false em `/imoveis/[bairro]` e `/imoveis/[bairro]/[tipo]` pra forcar 404 real (era 200+noindex via ISR cache do notFound). Bonus: `generateStaticParams` em `[tipo]` filtrado pra so gerar URLs de tipos suportados em TIPO_SLUG_MAP, eliminando typos com S duplo (apartamentoss, sobradoss, sala-comercials)

> Validado via Playwright em `/busca` desktop, lista desktop, mobile e estado vazio com filtros ativos.

### 13.7 - Card Cinematografico da Busca (sessao 07/04/2026) [CONCLUIDA]
- [x] `PropertyCard` da /busca com imagem em `aspect-[3/2]`, `object-cover` e hover silencioso sem CTA textual
- [x] Conteudo do card ancorado com `flex flex-col h-full`, `p-5/p-6` e rodape com `mt-auto`
- [x] Specs da /busca convertidas para grid com icones minimalistas, pills sutis e preco statement em chumbo/preto
- [x] Toolbar mantida com breadcrumbs, contador real "Mostrando N de total" e input de codigo separado da barra principal

> Validado via Playwright em `/busca` desktop grid, desktop list e mobile.

---

---


## Fase 13.11 — Auditoria Pré-Deploy [ONDA 1+2 CONCLUIDAS, ONDA 3 PÓS-DEPLOY — 15/04/2026]

> **Origem:** 4 agentes em paralelo (SEO + Security + Rotas + Integrações) + build local.
> **Status:** bloqueadores identificados — fix obrigatório antes de ir ao ar.
> **Contexto:** site vai para `https://fymoob.com.br` (primary) + `https://fymoob.com` (redirect).

### 13.11.1 — ONDA 1: Bloqueadores de Deploy [CONCLUIDA — 15/04/2026, commit c0759ca]

#### 13.11.1.a — `/api/lead` protegido
- [x] Adicionar rate limit (Upstash, 5/IP/10min) — `checkLeadRateLimit` em `rate-limit.ts`
- [x] Validar Turnstile token server-side
- [x] Validar inputs: email regex, telefone BR regex, nome min 2 chars, mensagem max 2000
- [x] Sanitizar `nome.trim()`, `nome.slice(0, 120)`, `mensagem.slice(0, 2000)`
- [x] `AbortSignal.timeout(8000)` no fetch Loft
- [x] Consentimento LGPD obrigatório (`consentLGPD`)

#### 13.11.1.b — LGPD (obrigatório legal)
- [x] `ContactForm.tsx`: checkbox obrigatório + Turnstile widget renderizado + token enviado
- [x] Criar `/politica-de-privacidade/page.tsx` com texto LGPD (13 seções)
- [x] Linkar política no Footer ("Privacidade" + "Política Editorial")

#### 13.11.1.c — Fallbacks hardcoded `https://fymoob.com` → `.com.br`
- [x] Bulk replace via sed em 13 arquivos `src/**/*.{ts,tsx}`
- [x] `src/app/empreendimento/[slug]/page.tsx:130`: schema usa `SITE_URL`
- [x] `src/app/opengraph-image.tsx:85`: rodapé `fymoob.com.br`
- [x] `.env.example`: NEXT_PUBLIC_SITE_URL + RESEND_FROM_EMAIL atualizados
- [x] `src/auth.ts`: fallback noreply@fymoob.com → noreply@fymoob.com.br
- [x] `src/app/politica-editorial/page.tsx`: email contato@fymoob.com.br → fymoob@gmail.com (commit a79f836)

#### 13.11.1.d — Admin cards 404
- [x] Cards convertidos em `<div>` não-clicáveis com `cursor-not-allowed` + `opacity-70`

#### 13.11.1.e — ShareButton com URL hardcoded
- [x] `src/components/shared/ShareButton.tsx`: usa `NEXT_PUBLIC_SITE_URL` com fallback `.com.br`

### 13.11.2 — ONDA 2: Alto [CONCLUIDA — 15/04/2026, commit 6ad1526]

- [x] Criar `src/app/error.tsx` + `src/app/global-error.tsx` (UX com branding, WhatsApp fallback, digest)
- [x] `src/app/robots.ts`: `/admin` adicionado no disallow
- [x] `src/app/opengraph-image.tsx:85`: fymoob.com → fymoob.com.br (incluído na Onda 1)
- [x] `ContactForm` com Turnstile widget + validação server-side (incluído na Onda 1)
- [ ] Regenerar `AUTH_SECRET` com `openssl rand -base64 32` para produção (só no Vercel — ação manual)
- [x] Pillar pages: publisher URL corrigido via bulk sed (Onda 1)
- [x] `src/app/empreendimento/[slug]/page.tsx:130`: schema usa `SITE_URL` (Onda 1)
- [x] WhatsApp tel: `+554199978-0517` → `+5541999780517` (8 ocorrências, bulk sed)
- [x] Rate limit em `/api/properties/batch`, `/api/property/[code]`, `/api/photos/[code]` — `checkApiLoftRateLimit` 60/min/IP + validação regex de code
- [x] Google Maps embed em `/contato` — endereço real via `maps.google.com/maps?q=...`

### 13.11.3 — ONDA 3: Médio — pode ser pós-deploy

- [ ] CSP + HSTS headers em `next.config.ts`
- [ ] Rate-limit e Turnstile: fail-closed em produção (hoje fail-open)
- [x] `RESEND_FROM_EMAIL` fallback `.com` → `.com.br` em `src/auth.ts` (feito na Onda 1)
- [ ] Schema author unification: pillars usarem `@id /sobre#bruno` (hoje `Person` com `credential` inválido)
- [ ] Wagner schema: adicionar campo `image` (Bruno tem, Wagner não)
- [ ] Timeouts em fetch Loft (`AbortSignal.timeout(8000)`)
- [ ] Timeouts em Upstash (`Promise.race` com 3s)
- [ ] Criar `src/env.ts` com validação zod de env vars críticas (fail fast no build)
- [ ] Footer: adicionar coluna "Guias" com `/comprar-imovel-curitiba`, `/morar-em-curitiba`, `/alugar-curitiba`
- [ ] `getAllPropertiesInternal` try/catch retornando `[]` em erro (hoje propaga → 500)
- [ ] JSON-LD escape `</` via helper compartilhado (XSS via CRM poisoning)

### 13.11.4 — Baixo / polish — pós-deploy

- [ ] Remover senha Supabase do comentário em `.env.local`
- [ ] Decidir: usar `SUPABASE_SERVICE_ROLE_KEY` ou remover (hoje no env mas não usada)
- [ ] Docs (`docs/seo-strategy.md`, `docs/admin-panel-setup.md`): atualizar `.com` → `.com.br`
- [ ] CLAUDE.md: corrigir rota documentada `/imoveis/ate-300-mil` → `/imoveis/preco/[faixa]`
- [ ] `INDEXNOW_SECRET` adicionar ao `.env.example`
- [ ] BottomNav: considerar atalho para contato/WhatsApp
- [ ] `.env.local:40-41`: remover linhas com fragmento de senha

### 13.11.5 — Verificado OK (não precisa fix)

- [x] Build limpo (zero errors, zero warnings, 670 páginas geradas)
- [x] Todas as rotas CLAUDE.md existem em `src/app/`
- [x] `notFound()` usado corretamente em 11 rotas dinâmicas
- [x] `not-found.tsx` existe com design consistente
- [x] Metadata em todas as 32 páginas públicas
- [x] Sitemap segmentado em 4 (generateSitemaps funcionando)
- [x] Schema.org entity graph conectado via `@id` (Organization, LocalBusiness, Bruno, Wagner)
- [x] llms.txt dinâmico
- [x] Turnstile fail-closed em caso de rede (bom)
- [x] Rate limit Upstash com prefixes corretos (`fymoob:auth:`, `fymoob:admin:login:*`)
- [x] ISR: revalidate 3600s em imóveis, 7200s em empreendimentos
- [x] IndexNow protegido por secret
- [x] `proxy.ts` protege `/admin/*` exceto `/admin/login`
- [x] Loft API com cache `unstable_cache` + fallback vazio se env ausente
- [x] WhatsApp `5541999780517` consistente em todos os lugares (exceto tel: formatado)
- [x] `robots.ts` bloqueia `/api/`, `/favoritos`, `/comparar`
- [x] Nenhum import morto de Nhost/Hasura no código
- [x] Imagens de bairro: todos os 12 slugs em `/public/images/bairros/` existem
- [x] Nenhum "lorem ipsum" / "TODO" em conteúdo público

---
