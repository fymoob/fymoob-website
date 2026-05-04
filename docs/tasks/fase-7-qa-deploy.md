# Fase 7 — QA, Testes, Deploy, Go-Live

> Sessao 04-17 cutover hardening + 95 tasks pendentes pos-deploy.
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


## Fase 7 — QA, Testes, Deploy, Go-Live [PENDENTE]

### 7.1 — Testes de Navegacao (mobile + desktop) [CONCLUIDA — 04/04/2026]
> Testado via Playwright (375px mobile). Zero erros de console em todas as paginas.

**Home:**
- [x] Hero carrega com poster image → video fade-in (desktop)
- [x] Hero mostra apenas imagem no mobile (sem video)
- [x] QuickSearch: abre overlay, multi-select bairro funciona, multi-select tipo funciona
- [x] QuickSearch: dual-range preco (min e max) funciona, labels acima corretas
- [x] QuickSearch: quartos funciona, busca redireciona para /busca com params
- [x] Cards destaques carregam com fotos reais do CRM
- [x] Secao bairros em destaque com imagens
- [x] Secao blog com 3 artigos e imagens
- [x] Stats bar (imoveis 254, bairros 66, tipos 17) mostra numeros corretos
- [x] Footer: 5 colunas, CRECI, telefone, endereco, links funcionam
- [x] BottomNav mobile: 3 tabs (Inicio, Buscar, Favoritos) funcionam
- [x] WhatsApp float visivel no desktop, escondido no mobile

**Busca (/busca):**
- [x] Filtros funcionam (bairro, tipo, preco, quartos)
- [x] Cards responsivos (horizontal mobile, grid desktop)
- [x] Badge NOVO/LANCAMENTO visivel e nao sobreposta pelo coracao
- [ ] Paginacao funciona — *nao testado interativamente*
- [ ] Ordenacao (mais relevantes, preco asc/desc) funciona — *nao testado interativamente*
- [ ] Resultado "0 imoveis encontrados" mostra estado vazio — *nao testado*

**Pagina de Imovel (/imovel/[slug]):**
- [x] Titulo, preco, caracteristicas aparecem corretamente
- [x] Galeria de fotos funciona (swipe mobile, grid desktop)
- [ ] Fullscreen da galeria abre e fecha — *nao testado interativamente*
- [x] Descricao com "ver mais" expande ✅ (testado via Playwright click)
- [x] Comodidades (amenities) listadas (Piscina, Churrasqueira, Elevador, etc.)
- [x] Caracteristicas do imovel (quartos, area, vagas)
- [x] Mapa comeca fechado, abre ao clicar ✅ (testado via Playwright click)
- [x] Mapa colorido (estilo voyager)
- [x] Imoveis semelhantes carregam (4 cards vistos no snapshot)
- [x] MobileContactBar: "Quero visitar" abre WhatsApp com mensagem correta (URL verificada)
- [x] Botao telefone funciona (tel:+554199978-0517 verificado)
- [x] Favoritar (coracao) funciona — clicado, persiste em /favoritos ✅
- [x] Comparar (setas) funciona — clicado, aparece em /comparar ✅
- [ ] Compartilhar funciona — *nao testado interativamente*
- [x] Breadcrumbs corretos (Home > Empreendimentos/Bairro > Imovel)
- [x] BackButton (mobile) volta para pagina anterior ✅ (testado via Playwright click)

**Favoritos (/favoritos):**
- [x] Adicionar imovel via coracao → aparece na lista ✅ (screenshot confirmado)
- [ ] Remover imovel → sai da lista — *nao testado interativamente*
- [x] Badge no BottomNav atualiza contagem (bolinha vermelha "1" visivel)
- [ ] Estado vazio mostra mensagem + link para busca — *nao testado*
- [x] Carregamento rapido (batch API)

**Comparar (/comparar):**
- [x] Adicionar imovel via botao comparar → aparece com foto, preco, titulo ✅
- [x] Tabela comparativa: preco, tipo, bairro, area, quartos visivel
- [x] Tabela scroll horizontal no mobile (primeira coluna sticky)
- [x] Botao remover (X) visivel
- [x] Botao "Adicionar imovel" linka para busca
- [x] CTA WhatsApp com codigos dos imoveis
- [ ] Max 3 imoveis (4o substitui o mais antigo) — *nao testado*
- [ ] Estado vazio mostra mensagem — *nao testado*

**Landing Pages Bairro (/imoveis/[bairro]):**
- [x] Testar /imoveis/portao — lista imoveis, contagem correta (25 imoveis)
- [x] FAQ abre/fecha (details/summary nativo)
- [x] Link para guia completo do bairro aparece
- [x] Cross-linking para tipos, outros bairros funciona
- [x] Stats (preco medio, total imoveis) corretos

**Landing Pages Tipo — todas retornam 200 OK:**
- [x] /apartamentos-curitiba — 200 OK
- [x] /casas-curitiba — 200 OK
- [x] /sobrados-curitiba — 200 OK
- [x] /terrenos-curitiba — 200 OK

**Landing Pages Preco — todas retornam 200 OK:**
- [x] /imoveis/preco/ate-300-mil — 200 OK
- [x] /imoveis/preco/1-a-3-milhoes — 200 OK

**Empreendimentos:**
- [x] /empreendimentos — lista de empreendimentos com foto, construtora, preco (114 listados)
- [x] /empreendimento/reserva-barigui — pagina individual carrega (screenshot OK)

**Guias de Bairro (/guia/[bairro]):**
- [x] /guia/batel — conteudo MDX renderiza, breadcrumbs, AuthorBio
- [x] /guia/portao — stats bar com dados reais do CRM (corrigido overflow mobile)
- [x] Imoveis a venda embutidos (PropertyGrid)
- [x] FAQ funciona (details/summary)
- [x] AuthorBio aparece (Bruno Cesar de Almeida, CRECI J 9420)
- [x] CTA WhatsApp funciona
- [x] RelatedPages links funcionam

**Pillar Pages — todas retornam 200 OK:**
- [x] /comprar-imovel-curitiba — conteudo renderiza, tabelas, CTA, AuthorBio
- [x] /morar-em-curitiba — 200 OK
- [x] /alugar-curitiba — 200 OK

**Blog:**
- [x] /blog — lista 15 artigos com imagens
- [x] /blog/itbi-curitiba-valor-como-pagar — artigo completo, tabelas, CTA, AuthorBio
- [x] /blog/batel-vs-agua-verde-curitiba — foto real Curitiba (Rua XV)
- [x] /blog/custo-de-vida-curitiba — 200 OK
- [x] Imagens hero de todos os 10 novos artigos carregam (batch verificado)
- [x] AuthorBio no final de cada artigo ✅
- [x] Related posts aparecem ✅

**Institucionais:**
- [x] /sobre — dark theme, stats, equipe, mapa, CRECI
- [x] /contato — 5 cards contato (WhatsApp, telefone, email, endereco, horarios)
- [x] /anuncie — 200 OK
- [x] /faq — FAQPage schema, 22 perguntas

### 7.2 — Testes de Formularios e Leads
> Criterio: cada formulario deve enviar dados ao CRM Loft e/ou email.

- [ ] Formulario /contato — preencher e enviar, verificar se lead chega no CRM
- [ ] Formulario /anuncie — preencher e enviar
- [ ] Formulario ContactSidebar (pagina imovel, desktop) — preencher e enviar
- [ ] WhatsApp "Quero visitar" — abre WhatsApp com titulo do imovel na mensagem
- [ ] WhatsApp float (desktop) — abre chat correto
- [ ] WhatsApp CTA nos guias de bairro — abre com mensagem do bairro
- [ ] WhatsApp CTA nos artigos do blog — abre com mensagem do artigo

### 7.3 — Testes de SEO e Schema [PARCIAL — 04/04/2026]
> Criterio: Google deve conseguir indexar e entender todas as paginas.

- [x] Sitemap.xml acessivel e lista 616 URLs ✅
- [x] Robots.txt permite crawling (exceto /api/, /favoritos, /comparar) ✅
- [ ] JSON-LD Organization no layout (verificar via View Source)
- [ ] JSON-LD LocalBusiness no layout
- [ ] JSON-LD RealEstateListing em pagina de imovel
- [x] JSON-LD BlogPosting em artigo do blog ✅ (verificado /blog/itbi)
- [x] JSON-LD FAQPage em paginas com FAQ ✅ (verificado /faq)
- [x] JSON-LD Article em guias de bairro e pillar pages ✅ (verificado /guia/batel)
- [ ] Rich Results Test (Google) — testar 5 URLs (requer teste manual no Google)
- [x] Open Graph tags (title, description, image) em todas as paginas ✅ (verificado /blog/itbi)
- [x] Canonical URLs corretas ✅ (verificado /blog/itbi → fymoob.com/blog/itbi...)
- [x] Breadcrumbs com schema BreadcrumbList ✅ (verificado /imovel/[slug])
- [ ] Alt text descritivo em todas as imagens — *verificacao parcial*

### 7.4 — Testes de Performance [CONCLUIDA — 04/04/2026]
> Criterio: Lighthouse mobile >80 em todas as paginas principais.

- [x] Lighthouse Home — score **86** ✅
- [ ] Lighthouse /busca — *nao testado nesta rodada*
- [x] Lighthouse /imovel/[slug] — score **86** ✅
- [ ] Lighthouse /imoveis/portao — *nao testado nesta rodada*
- [x] Lighthouse /favoritos — score **90** ✅
- [x] Lighthouse /blog/itbi — score **91** ✅
- [x] Lighthouse /guia/batel — score **82** ✅
- [x] Console do browser: zero erros em todas as paginas testadas ✅

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

### 7.8 — Acoes Externas Pre-Cutover (usuario executa no painel)
> Confirmar TODAS antes do switch DNS. Sem essas, auth admin ou lead forms quebram.

- [ ] **Cloudflare Turnstile:** adicionar `fymoob.com.br` + `www.fymoob.com.br` ao hostname allowlist do site key (senao captcha retorna `invalid-domain` em prod → todos lead forms + admin login falham silenciosamente)
- [ ] **Resend:** verificar dominio `fymoob.com.br` via SPF + DKIM + DMARC (senao magic link bounce/spam → admin nao consegue logar)
- [ ] **Vercel env `AUTH_URL=https://fymoob.com.br`** (pin canonical pra magic link URLs — evita URL com hostname preview no email)
- [ ] **Vercel env `REVALIDATE_SECRET`:** regenerar (valor antigo `1626c6c4c3860b4b7d6ff08a687ecff1fe7b64e5da9a323dee67d9036f4fafc17` foi exposto em chat). Apos regerar, atualizar qualquer cron/webhook que dispare /api/revalidate.
- [ ] **Vercel env:** confirmar setados — `LOFT_API_KEY`, `AUTH_SECRET`, `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `ALLOWED_ADMIN_EMAILS`, `INDEXNOW_SECRET`, `RESEND_FROM_EMAIL`
- [ ] **Vercel env:** remover variaveis nao usadas (`SUPABASE_*` se existirem — projeto usa Nhost/Upstash, nao Supabase)

### 7.9 — Validacao Pos-Cutover (primeiras 24h)
> Rodar na ordem. Se falha, reverter DNS antes de debugar.

- [x] `curl -I https://fymoob.com.br/` → 200 + HSTS (2026-04-17)
- [x] `curl https://fymoob.com.br/sitemap/0.xml | grep -c "<url>"` → 234 imoveis
- [x] `curl -X POST https://fymoob.com.br/api/revalidate` (sem secret) → 401
- [x] Submeter lead via formulario real em `/contato` → chegou no CRM Loft (com dados reais; dados fake sao rejeitados pelo spam filter Vista)
- [x] Magic link admin → receber email + clicar → logar
- [x] GSC: propriedade verificada (URL Prefix via arquivo /google1ae9f26fa4267524.html)
- [x] GSC: sitemap/3.xml submetido → Status "Processado", 118 paginas encontradas
- [ ] `site:fymoob.com.br` no Google apos 3-7 dias — primeiras URLs indexando
- [ ] GSC: coverage report + enhancement (RealEstateListing) detectando
- [ ] Speed Insights: primeiros RUM data points aparecendo
- [ ] GA4: pageviews + eventos (lead_submit, property_view) chegando

### 7.9.A — Submissao de Sitemaps no GSC [REVISADO 2026-04-18]
> **Estrategia anterior (faseada) descartada.** Pesquisa oficial (Google Search Central, John Mueller, docs de migration) confirma que "thin content flag por volume" e mito SEO — Google avalia qualidade por pagina, nao por timing de submissao. Ping endpoint deprecado em 2023 era pra bots spam, nao submissao GSC.
>
> Em cutover (como estamos), atrasar descoberta e contraproducente: prolonga janela de volatilidade entre redirects 308 fymoob.com → .com.br. Submeter tudo agora acelera consolidacao de sinais. Google ja auto-descobre via robots.txt (4 shards listados) — submeter manual so adiciona diagnostico por shard no dashboard.
>
> Fontes: [docs Google Search Central sobre sitemap index](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps), [site move guide](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [Mueller em SEJ](https://www.searchenginejournal.com/googles-mueller-on-crawl-rate-for-big-and-small-sites/387118/).

- [x] **D+0 (2026-04-17):** sitemap/3.xml (118 URLs — home + institucional + empreendimentos) → Processado, 118 paginas encontradas
- [ ] **D+1 (2026-04-18):** submeter sitemap/0.xml (234 URLs — imoveis individuais)
- [ ] **D+1 (2026-04-18):** submeter sitemap/1.xml (179 URLs — landings bairro/tipo/preco)
- [ ] **D+1 (2026-04-18):** submeter sitemap/2.xml (29 URLs — blog + guides + pillars)

### 7.9.B — Bing Webmaster Tools [PENDENTE]
> Bing = ~8-10% do trafego BR. Setup grátis + reusa verificacao GSC via OAuth.

- [ ] **BLOCKER (2026-04-17):** Microsoft nao esta deixando criar conta nova agora (error na pagina signup outlook.com). Aguardar destravio ou usar conta Microsoft existente do Vinicius/Bruno.
- [ ] Quando destravar: criar `fymoob@outlook.com` (conta corporativa, nao pessoal — facilita transferir ownership futuro)
- [ ] bing.com/webmasters → login com conta Microsoft
- [ ] Add site → `https://fymoob.com.br`
- [ ] Verify via "Import from Google Search Console" (OAuth com conta Google que fez GSC hoje — reusa verificacao sem precisar novo DNS/arquivo)
- [ ] Submeter sitemap/3.xml (mesmo pattern do GSC — faseado)
- [ ] IndexNow: ja temos endpoint `/api/indexnow` implementado. Bing aceita pings pra indexacao quase-imediata. Considerar adicionar Vercel cron ou botao admin que dispara IndexNow quando novo imovel entra no CRM.
- [ ] Adicionar Bruno como user secundario em Bing + GSC (permissoes granulares, nao compartilhar senha)

### 7.9.C — Cutover do dominio `fymoob.com` (redirect 308 -> .com.br) [CONCLUIDO 2026-04-17]
> `.com` eh do Bruno tambem (GoDaddy mesma conta). Redirect 308 + Change of Address transfere autoridade historica (92 URLs indexadas, 580 cliques/home, 122 paginas com impressoes em 3 meses) pro `.com.br`. Baseline completo em `docs/metrics-baseline/`. DNS backup completo em `docs/dns-backup-com.md`.

**Status 2026-04-17:**
- Fase A (DNS + Vercel): ✅ CONCLUIDA
- Fase B (Change of Address GSC): ✅ CONCLUIDA e ATIVA (Data de início: 17/04/2026)
- Fases C/D/E: monitoramento passivo nos proximos 180 dias

**🚨 COMMITMENTS CRITICOS A PRESERVAR (nao esquecer):**

1. **NAO DELETAR redirect 308 do `.com` por no mínimo 180 dias** (até ~2026-10-14). Google doc explícito: "Mantenha os redirecionamentos por pelo menos 180 dias". Se alguém acidentalmente remover o domínio `fymoob.com` do Vercel antes desse prazo, a consolidação de autoridade é revertida.

2. **MANTER dominio fymoob.com pagando por no mínimo 1 ano** (até ~2027-04-17). Confirmar renovação automática no GoDaddy. Se expirar, squatters podem comprar pra phishing/malware impersonating a marca FYMOOB.

3. **Banner amarelo "Este site está sendo movido"** aparece em ambas propriedades GSC por 180 dias. Nao clicar "CANCELAR MUDANCA" (botao vermelho) — ele REVERTE o processo.


**Tempo estimado total: 24h (~30min execucao + 1h cutover validacao + 23h Change of Address efetivar).**

#### Fase A — Cutover DNS (~30min + 10-30min propagacao)

- [ ] **Vercel**: Project `fymoob-website` > Domains > Add Existing > `fymoob.com`:
  - Desmarcar checkbox "Redirect fymoob.com to www.fymoob.com"
  - Modo: "Redirect to Another Domain"
  - Type: **308 Permanent Redirect**
  - Target: `fymoob.com.br`
- [ ] **Vercel**: Add Existing > `www.fymoob.com` (mesma config: 308 -> fymoob.com.br)
- [ ] Copiar DNS records que Vercel mostra (provavelmente A @ 76.76.21.21 + CNAME www cname.vercel-dns.com)
- [ ] **GoDaddy** (dominio `fymoob.com`, NAO o .com.br): editar `A @` de `35.227.239.5` -> IP Vercel. TTL 600s.
- [ ] **GoDaddy**: DELETAR registro `A www` (35.227.239.5). CRIAR novo `CNAME www` -> `cname.vercel-dns.com.`. TTL 600s.
- [ ] **NAO TOCAR** em MX, SPF TXT, autodiscover/webmail CNAMEs, subdominios (api/premium/destaques), verificacoes Facebook/Google. Detalhes em `docs/dns-backup-com.md`.
- [ ] Aguardar propagacao DNS (5-30min). Testar: `curl -I https://fymoob.com` deve retornar 308 + `location: https://fymoob.com.br/`
- [ ] Confirmar Vercel status 🟢 Valid Configuration em ambos dominios

#### Fase B — Change of Address no GSC (~2min, 1h apos Fase A)

- [ ] Aguardar ~1h apos Fase A pra Google bater no `.com` e detectar redirect
- [ ] GSC -> propriedade `fymoob.com` (Domain) -> Settings (engrenagem) -> **Mudanca de endereco**
- [ ] Destino: selecionar `fymoob.com.br` (aparece no dropdown porque eh mesma conta Google)
- [ ] Google valida 3 checks automaticamente:
  - Ambas propriedades verificadas ✅ (ja estao)
  - Redirect 301/308 ativo entre dominios ✅ (tera apos Fase A)
  - Dominio destino tem conteudo equivalente ✅ (tem)
- [ ] Confirmar submissao
- [ ] Resultado: Google acelera consolidacao de ~2-3 meses -> **2-3 semanas**

#### Fase C — Monitoramento Coverage (D+1 a D+7)

> Objetivo: detectar URLs antigas do `.com` que 308 redireciona pra slug no `.com.br` que nao existe (404). Principais candidatos: imoveis com codigo numerico antigo (ex: `/imovel/apartamento-batel-curitiba-pr-263m2-69803405`) — novo site usa codigo AP00XXX.

- [ ] D+1: GSC `.com.br` -> Indexacao > Paginas > filtro "Nao encontrado (404)"
- [ ] Anotar URLs 404 que vieram de `fymoob.com/*` e tem trafego historico
- [ ] D+7: review completo. Top candidatos esperados (baseado em baseline):
  - `/imovel/apartamento-batel-curitiba-pr-263m2-69803405` (9 cliques historicos)
  - `/imovel/loja-xaxim-curitiba-pr-55.85m2-69804208` (7 cliques)
  - `/imovel/sobrado-cidade-industrial-curitiba-pr-3-quartos-88m2-69803496` (3 cliques)
  - URLs com format antigo `/imovel/AP00945/apartamento-3-quartos-mossungue-curitiba/venda`

#### Fase D — Redirects especificos (D+7 se necessario)

- [ ] Se Fase C revelar URLs com trafego significativo em 404, adicionar em `next.config.ts`:
```ts
async redirects() {
  return [
    {
      source: '/imovel/apartamento-batel-:rest*',
      destination: '/imoveis/batel/apartamentos',
      permanent: true,  // 308
    },
    // outros padroes conforme GSC Coverage revelar
  ]
}
```
- [ ] Pattern: redirecionar URLs orfas (sem match de slug exato) pra landing page de bairro+tipo relevante
- [ ] Commit + deploy. Smoke test do CI valida automaticamente.

#### Fase E — Consolidacao (D+14 a D+21)

> Nada a fazer — acontece em background. Apenas monitorar.

- [ ] D+14: `site:fymoob.com` no Google deve mostrar menos URLs (em declinio)
- [ ] D+14: `site:fymoob.com.br` deve mostrar mais URLs (em alta)
- [ ] D+21: Change of Address 100% efetivada. `.com` e "sombra" do `.com.br`.
- [ ] Atualizar `docs/metrics-baseline/README.md` com colunas D+7, D+14, D+21 preenchidas

#### Notas importantes sobre preservacao

- **Email Umbler funcionando** — MX records preservados em GoDaddy
- **Subdominios preservados:** `api.fymoob.com`, `premium.fymoob.com`, `www.premium.fymoob.com`, `destaques.fymoob.com`, `autodiscover.fymoob.com`, `webmail.fymoob.com`
- **Verificacoes preservadas:** Meta Business Manager (Facebook), Google Search Console (TXT ja existente)
- **SPF email:** `v=spf1 include:spf.umbler.com ~all` intocado

### 7.10 — HIGH/MEDIUM Remanescentes (hardening pos-cutover)
> Documentado na Sessao 2026-04-17 acima. NAO sao blockers pra cutover — sao hardening incremental pra rodar em sprint de follow-up (~4-8h total).

**HIGH — segurança nicho:**

- [ ] **CSP (Content-Security-Policy) em `next.config.ts`:** atualmente sem CSP. Risco atual baixo (`dangerouslySetInnerHTML` limitado a JSON-LD via `safeJsonLd`), mas CSP fecha a porta pra XSS se futuro codigo adicionar inline user input. Proposta: `default-src 'self'; script-src 'self' 'unsafe-inline' 'nonce-XXX' https://challenges.cloudflare.com https://*.vercel-insights.com https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.vistahost.com.br https://*.storage.sa-east-1.nhost.run; font-src 'self' data:; connect-src 'self' https://*.vercel-insights.com https://www.google-analytics.com; frame-src https://challenges.cloudflare.com`. Testar em report-only primeiro por 1 semana.
- [ ] **JWT sessions — nao tem server-side revoke.** Se `AUTH_SECRET` vazar, atacante forja JWTs validos por 12h sem como invalidar. Fix: (a) adicionar `jwt.callback` checando `sessionVersion` por email contra Redis, bumped em forced logout; OU (b) baixar maxAge pra 2-4h com silent refresh. Nao e CRITICAL porque AUTH_SECRET nao vazou, mas rotation procedure deveria ter.
- [ ] **Rotation runbook pra AUTH_SECRET + LOFT_API_KEY + REVALIDATE_SECRET.** Criar `docs/runbooks/secret-rotation.md` com passo-a-passo: gerar novo valor → atualizar Vercel env → redeploy → validar endpoints respondem → revogar antigo no provider.
- [ ] **Next.js image optimizer abuse:** `/_next/image` nao tem rate limit dedicado. Atacante pode forcar Vercel otimizar imagens cdn.vistahost.com.br em todos tamanhos, estourando quota. Fix: Vercel dashboard → set hard limit em image optimization requests, ou adicionar middleware rate-limit em `/_next/image` (complexo, nao prioritario).
- [ ] **BR date format sort em `getProperties({sortBy: "recente"})`** — Loft API as vezes retorna `DataAtualizacao` em `"dd/mm/yyyy"` (nao ISO). `db.localeCompare(da)` embaralha a ordem. Fix: parse com heuristica BR em `loft.ts:554`. Impacto atual: baixo (ISO e o formato comum), mas silencioso quando falha.
- [ ] **Bairro slug inconsistency:** codigo em `imovel/[slug]/page.tsx:131` e `guia/[bairro]/page.tsx` + `imoveis/preco/[faixa]/page.tsx` usa `.toLowerCase().replace(/\s+/g, "-")` sem strip de acentos (ex: "Água Verde" → "água-verde"). Mas `slugify()` em `loft.ts` strips acento (→ "agua-verde"). Link 404s em bairros com acento. Fix: trocar TODOS por `slugify(bairro)` consistente.
- [ ] **generateStaticParams double-fetch em `/[tipo]-curitiba/[finalidade]/page.tsx`:** cada variant chama `getProperties({limit:1000})` 3x (generateStaticParams + generateMetadata + page). Cacheado via `unstable_cache`, mas no primeiro cold start bate Loft 3x. Fix: extrair pra helper `getPropertyStats()` cacheado ou movee count-check pra summary compartilhado.

**MEDIUM — melhorias operacionais:**

- [ ] **Webhook/cron pra `/api/revalidate`:** atualmente ninguem chama. Imoveis alterados no CRM demoram ate 1h (TTL) pra refletir. Fix: Vercel Cron em `vercel.json` (*/15 * * * *) POST pra `/api/revalidate` com `{"tag":"imoveis"}`. Ja validado end-to-end em H-20260417-007 — funciona.
- [ ] **mover `shadcn` pra devDependencies:** atualmente em `dependencies`, polui node_modules prod + lista como HIGH vuln em `npm audit --omit=dev` (mesmo nao rodando em prod). Mesmo pra `@next/bundle-analyzer`.
- [ ] **Skip link "pular pro conteudo"** no layout — nice-to-have pra keyboard users, nao bloqueador.
- [ ] **Gallery modal ESC handler** — `PropertyGallery.tsx` modo "grid" nao wire ESC pra fechar. Keyboard users precisam tab pro X.
- [ ] **Form submit feedback:** `ContactForm.tsx` precisa `disabled={submitting}` + spinner pra evitar double-submit por keyboard users.
- [ ] **RUM-driven perf tuning:** aguardar 2-3 semanas de Speed Insights field data pra decidir se `staleTimes: { dynamic: 30 }` fica, se `reactCompiler: true` ajudou p75 TBT real, se H-20260417-004 deve ser retentado com patch Next 16.3+.
- [ ] **Add `.env.example` com REVALIDATE_SECRET + NEXT_PUBLIC_GA_ID + INDEXNOW_SECRET + RESEND_FROM_EMAIL** — atualmente vazio em placeholders. Dificulta onboarding futuro + deploy manual checklist.

**LOW — cosmeticos:**

- [ ] **Contact form disabled state visual** — se submit em progresso
- [ ] **Review de alt text em MDX authored content** — MDX fallback aplicado, mas authors deveriam escrever alts reais em artigos novos
- [ ] **Consolidar CRECI em constante** — CRECI J 9420 vs CRECI/PR 24.494 vs 39.357 espalhados em llms.txt, Footer, FAQ, policies. Centralizar em `src/data/fymoob-info.ts`.

---
