# Fase 18 — Custom Blog Admin (Sanity Replacement)

> BlockNote + Supabase substituindo Sanity. Sprints A-G concluidos, H-I pendentes.
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


## Fase 18 — Custom Blog Admin (Sanity Replacement) [PENDENTE — PR separado]

> **Decisao 2026-04-30:** remover Sanity por completo, construir admin 100% custom focado em integracao com API Loft. Substitui Fase 9.2.
> **Objetivo:** painel /admin com 2 abas (Artigos + Autores) replicando UX Sanity-like com BlockNote, sem lock-in, sem hard caps, sem dependencia externa.
> **Estimativa total:** 35-50h dev. **Modelo de execucao:** PR separado (nao no mesmo PR de outras features). Nao iniciar implementacao ate fechar Fase 18.A.
>
> **Stack confirmada:**
> - Editor: **BlockNote** (Notion-like, ProseMirror+TipTap por baixo) — confirmado pelo cliente em 30/04
> - DB: Supabase Postgres (ja no stack via Fase 15.A)
> - Storage imagens: Supabase Storage (3 buckets)
> - Auth: NextAuth + Resend + Turnstile (Fase 9.1, ja em prod)
> - Render publico: server component custom (replica padrao do `PortableTextRenderer.tsx`)
> - Validacao: Zod compartilhado client/server
>
> **O que sera removido (Fase 18.H):** `sanity`, `next-sanity`, `@sanity/*` (5 pacotes), `@portabletext/*` (2 pacotes), `src/sanity/`, `src/app/studio/`, `sanity/schemas/`, `sanity.config.ts`, `src/components/blog/PortableTextRenderer.tsx`.
>
> **Riscos mapeados:** ver [Riscos e mitigacoes](#fase-18--riscos-e-mitigacoes) ao final desta secao.

### 18.A — Foundations (4-6h) [CONCLUIDA — 2026-04-30]

> Schema, RLS, tipos. Base sem a qual nada roda.

- [x] Migration SQL Supabase: tabela `authors` (id, slug UNIQUE, name, role, creci, bio_short, bio_long JSONB, photo_url, photo_alt, email, expertise TEXT[], social_links JSONB, created_at, updated_at) — `supabase/migrations/0001_authors.sql`
- [x] Migration SQL Supabase: tabela `articles` (id, slug UNIQUE, title, description, body JSONB, cover_image_url, cover_image_alt, status enum draft/scheduled/published/archived, published_at, scheduled_at, author_id FK, tags TEXT[], schema_type enum, reading_time_min, word_count, reviewed_by, next_review, methodology JSONB, seo_meta_title, seo_meta_description, seo_canonical, seo_no_index, seo_og_image_url, created_by, created_at, updated_at) + indices (status+published_at, tags GIN) — `supabase/migrations/0002_articles.sql`
- [x] Migration SQL Supabase: tabela `article_revisions` (id, article_id FK CASCADE, body JSONB, title, edited_by, edited_at) — historico/rollback — `supabase/migrations/0003_article_revisions.sql`
- [x] Migration SQL Supabase: tabela `media` (id, url, storage_path, alt, type, size_bytes, width, height, uploaded_by, created_at) — `supabase/migrations/0004_media.sql`
- [ ] Buckets Supabase Storage: `articles-covers`, `articles-inline`, `authors` (public read, service role write) — **AÇÃO MANUAL no painel Supabase, ver `supabase/README.md`**
- [x] RLS policies: leitura publica de articles WHERE status='published', escrita so via service role; tabelas authors/media so service role — `supabase/migrations/0005_rls.sql`
- [x] `src/lib/supabase-admin.ts` — service role client (server-only, nunca exporta pro client bundle)
- [x] `src/lib/schemas/article.ts` (Zod): ArticleSchema, ArticleDraftSchema, BlockNoteJsonSchema
- [x] `src/lib/schemas/author.ts` (Zod): AuthorSchema
- [x] `src/services/articles.ts` (CRUD reads — list/byId/bySlug/related/byAuthor). Writes (create/update/publish/etc) movidos pra Fase 18.E onde sao consumidos por server actions.

### 18.B — Renderer publico (3-4h) [CONCLUIDA — 2026-04-30]

> Site publico passa a ler do Supabase. Toggle `BLOG_SOURCE=supabase` ativa o novo caminho; default mantem Sanity+MDX legado.

- [x] `src/components/blog/BlockRenderer.tsx` — server component, le BlockNote JSON e mapeia pros componentes existentes (`MethodologyBox`, `CalloutBox`, `CTABox`, `Changelog`, `<details>` FAQ, tabela)
- [x] Bloco extra "Imovel destaque" no renderer — placeholder server-side com slug Loft + fallback link; integracao rica fica na Fase 18.D (editor + autocomplete)
- [x] Atualizar `src/app/blog/[slug]/page.tsx` — branch tri-source (Supabase / Sanity / MDX) via `BLOG_SOURCE`. Remove dual-read sera completado na Fase 18.H apos cutover validado.
- [x] Atualizar `src/app/blog/page.tsx` (lista publica) — automatico via `services/blog.ts` que delega pra `articles.ts` quando `BLOG_SOURCE=supabase`
- [x] Schema JSON-LD: estender `src/lib/seo.ts` com `generateArticleSchema` completo (headline, description, image, datePublished, dateModified, author Person/RealEstateAgent dinamico, publisher, mainEntityOfPage, wordCount, articleSection, keywords, inLanguage pt-BR, isPartOf, reviewedBy)
- [x] Schema JSON-LD: gerar `FAQPage` automaticamente quando artigo tem blocos FAQ (>=2 itens)
- [x] `src/app/autor/[slug]/page.tsx` — pagina publica do autor (E-E-A-T): foto, bio longa BlockNote, CRECI, expertise, lista de posts publicados, schema Person/RealEstateAgent com sameAs (LinkedIn etc.)
- [x] `src/app/autor/[slug]/page.tsx` — `generateMetadata` + breadcrumbs + canonical
- [x] `src/app/sitemap.ts` — adicionar URLs de autores; refletir `lastmod` real do `articles.updated_at` quando em modo Supabase (build timestamp uniforme em modo legado)

### 18.C — Admin: aba Autores (3-4h) [CONCLUIDA — 2026-04-30]

> Aba "Autores" do menu lateral admin.

- [x] `src/app/admin/blog/autores/page.tsx` — grid de cards (foto + nome + cargo + nº posts publicados) com botao "+ Novo autor"
- [x] `src/app/admin/blog/autores/novo/page.tsx` — form criar autor
- [x] `src/app/admin/blog/autores/[id]/page.tsx` — form editar autor (foto upload, nome, slug auto-gerado, cargo select, CRECI regex, bio_short textarea, email, expertise chips, social_links: LinkedIn/Instagram/Twitter/site). bio_long BlockNote sera adicionada em iteracao posterior — UI do AuthorForm ja esta hookada via Zod.
- [x] Server actions em `src/app/admin/blog/autores/actions.ts`: createAuthor, updateAuthor, deleteAuthor (guard "tem posts vinculados? bloqueia delete e sugere arquivar")
- [x] Upload de foto autor → `authors` bucket Supabase Storage com alt obrigatorio (helpers em `src/lib/supabase-storage.ts`)
- [x] Sidebar admin atualizada com submenu Blog → {Artigos, Autores}

### 18.D — Editor BlockNote (8-12h) [CONCLUIDA — 2026-04-30]

> Coracao do admin. Slash menu, blocos custom, autosave.

- [x] Instalar deps: `@blocknote/core`, `@blocknote/react`, `@blocknote/mantine` (mantine theme; shadcn pode ser swap futuro de uma linha)
- [x] `src/components/admin/ArticleEditor.tsx` — wrapper client component do BlockNote com config FYMOOB (locale pt-BR via dictionary, tema light, autosave debounceado)
- [x] Bloco custom MethodologyBox (replica `sanity/schemas/blocks/methodology-box.ts`): campos period, sample, treatment, sources[], lastUpdate, nextReview + preview live
- [x] Bloco custom CalloutBox: variant info/warning/alert + conteudo rich text editavel inline
- [x] Bloco custom CTABox: title, description, label, href + preview live
- [x] Bloco custom Changelog: entries[] de {date, change} editaveis em linha (add/remove)
- [x] Bloco custom "Imovel destaque": autocomplete via server action `searchPropertiesAction` em `getProperties()`, salva codigo + fallbackTitle + fallbackUrl
- [x] Bloco custom FAQ Item: pergunta + resposta. 2+ no post viram schema FAQPage automaticamente
- [x] Slash menu custom em PT-BR: aviso, metodologia, faq, cta, historico, imóvel destaque + items default (heading/imagem/tabela/lista/...)
- [x] Bubble menu (formatacao inline) — vem default do BlockNote/Mantine (bold, italic, link, code, sublinhado)
- [x] Upload de imagem inline via `uploadInlineImageAction` → bucket `articles-inline`. Editor pede alt no modal default do BlockNote.
- [x] Autosave: hook `onChange` com debounce parametrizavel (default 1500ms); wiring com server action `saveDraft` fica em 18.E (rota `/admin/blog/[id]`)
- [x] Playground em `/admin/blog/editor-playground` pra teste pre-Sprint 3 (sera removido quando 18.E entregar)

### 18.E — Admin: aba Artigos (8-10h) [CONCLUIDA — 2026-04-30]

> Aba "Artigos" — lista, criar, editar, publicar, agendar, historico.

- [x] `src/app/admin/blog/page.tsx` — tabela com filtros topo (status / autor / busca por titulo/slug). Ordenacao por updated_at desc.
- [x] Lista: cover thumb, titulo, autor, status badge (rascunho/agendado/publicado/arquivado), updated_at, word count. Acoes (editar/duplicar/arquivar) ficam no editor `/admin/blog/[id]` via menu "Mais ▾".
- [x] Botao "+ Novo artigo" em `CreateDraftButton.tsx` chama server action `createDraftAction` que insere draft vazio com `seo_no_index=true` e redireciona pra `/admin/blog/[id]`.
- [x] `src/app/admin/blog/[id]/page.tsx` — split layout: editor BlockNote a esquerda + sidebar com tabs a direita. Mobile: stack vertical com sidebar abaixo do editor (`lg:grid-cols-[1fr_360px]`).
- [x] Sidebar com 4 tabs no editor: Conteudo / Metadados / YMYL / SEO (componentes em `[id]/tabs/`)
- [x] Tab Conteudo: titulo (counter chars), slug (auto + lock pos-publish), descricao (counter), cover image upload+alt (action `uploadCoverImageAction` → bucket `articles-covers`), autor select, tags chips (Enter pra adicionar), schema_type select (BlogPosting/Article/HowTo/NewsArticle)
- [x] Tab Metadados: reading_time auto+override, updated_at readonly, og_image_url override
- [x] Tab YMYL: reviewed_by, next_review date picker, methodology object completo (period, sample, sources textarea separado por virgula)
- [x] Tab SEO: meta_title override, meta_description override, canonical, noindex toggle, **SEO Score panel** com barra de progresso colorida + lista de checks com hint expansivel, preview SERP Google (URL + title + description com line-clamp), preview card Open Graph 1.91:1
- [x] SEO Score calculator em `src/lib/seo-score.ts`: 11 checks com severidade `block`/`warn`/`ok`. Regras: title 30-55 (warn fora), descricao 120-165 (warn fora), cover+alt obrigatorios (block), word count ≥300 (block) e ≥800 (warn), ≥2 links internos (warn), slug kebab-case (block), autor obrigatorio (block), 3-7 tags (warn), ≥1 H2 (warn). Score 0-100 calculado + `passesPublishGate()`.
- [x] Server actions em `src/app/admin/blog/_actions.ts`: createDraft, saveDraft (autosave com calc word_count + reading_time), snapshotRevision, publish (com gate SEO Score, revalidateTag blog/blog:slug/autor), schedule (datetime futuro), unpublish, archive, restore, duplicate (cria copia com slug `-copia-<rand>`), restoreRevision (com snapshot do estado atual antes), generateUniqueSlug
- [x] Drawer "Historico" `RevisionsDrawer.tsx` em fixed overlay (z-50), lista cronologica com botao Restaurar + confirm. Snapshot acontece automaticamente antes de publish e antes de restore-revision.
- [x] Preview rota `src/app/admin/blog/preview/[id]/page.tsx` — replica visual da `/blog/[slug]` publica com banner amber no topo "🔒 Preview privado". Renderiza qualquer status. Auth-protegido. Robots noindex.
- [x] Top bar de acoes no editor: status badge, "Salvando..." indicator, Histórico button, Preview link, Salvar agora, Agendar (prompt datetime), Publicar (com gate), Despublicar (em estado published), menu "Mais ▾" com Duplicar + Arquivar
- [x] Component shared `src/components/admin/StatusBadge.tsx` reusado em lista + editor
- [x] Dashboard `/admin` atualizado: card "Artigos" agora clicavel; card "Editor Playground" rebaixado para "beta"; status mostra Fase 18.E como pronta

### 18.F — Cron e Revalidacao (2h) [CONCLUIDA — 2026-04-30]

> Publicacao agendada + cache invalidation.

- [x] Vercel cron diario 06:00 UTC em `/api/cron/publish-scheduled`: busca articles WHERE status='scheduled' AND scheduled_at<=now(), seta status='published', published_at=scheduled_at, seo_no_index=false. Auth via `Authorization: Bearer ${CRON_SECRET}`. Idempotente.
- [x] `vercel.json` com cron config (`schedule: "0 6 * * *"`)
- [x] Em todo save/publish/unpublish: chamar `revalidateTag('blog')` + `revalidateTag('blog:<slug>')` + `revalidateTag('autor:<author_id>')` (ja implementado nas server actions de 18.E)
- [x] Em publish (manual + agendado): IndexNow ping via `submitToIndexNow` (existing helper). Best-effort, nao bloqueia.
- [N/A] Google Indexing API: requer setup OAuth dedicado (fora do escopo Sanity-replacement). Backlogged como add-on; IndexNow cobre Bing+Yandex+DuckDuckGo, Google indexa via crawl normal pelo sitemap+revalidação.

### 18.G — Migracao 15 MDX → Supabase (3-4h) [CONCLUIDA — 2026-04-30]

> Cutover sem mudar URL. Slugs preservados. Drafts importados — Bruno publica manualmente apos validar visual.

- [x] `scripts/mdx-to-blocknote.mjs`: converter MDX → BlockNote JSON. Pipeline (regex extrai blocos custom → placeholders → unified+remark-parse+remark-gfm parseia markdown → walker MDAST emite blocos heading/paragraph/list/table/codeBlock/image/quote → placeholders re-injetados). 4 blocos custom suportados (MethodologyBox, CalloutBox, CTABox, Changelog).
- [x] `scripts/migrate-mdx-to-supabase.mjs`: pipeline completo. Le `content/blog/*.mdx`, parsea frontmatter via gray-matter, converte body, upload de `/public/blog/<slug>.webp` pro bucket `articles-covers/migracao-mdx/`, resolve author_id (Bruno seedado vence; fallback cria como Convidado), upsert em `articles` com `status='draft'` + `seo_no_index=true`. Suporta `--dry-run` e `--force`.
- [x] Cobertura validada: dry-run nos 15 MDX reais converte com sucesso (64-198 blocos por post, 0 falhas, todas as capas resolvidas).
- [x] Documentado em `supabase/README.md` (secao "Migração dos 15 MDX legados") com comandos + checklist de validacao.
- [ ] **EXECUCAO real:** rodar `node scripts/migrate-mdx-to-supabase.mjs` (sem dry-run) quando o cliente decidir migrar de fato. Nao executado automaticamente nesta sessao pra evitar mexer em dados de prod sem revisao do Bruno.
- [ ] **Validacao visual post-a-post:** abrir os 15 rascunhos no `/admin/blog`, comparar com `/blog/<slug>` antigo (Sanity/MDX) lado-a-lado. Marcar OK quando todos renderizam identicos. So entao setar `BLOG_SOURCE=supabase`.

### 18.H — Cleanup Sanity (2h)

> Remocao definitiva. Ordem importa: backup primeiro.

- [ ] Backup: `sanity dataset export production backups/sanity-final-export-$(date +%Y%m%d).tar.gz` (ou via Vercel/Sanity CLI) — guardar em `/backups/` (gitignored) + copia em Drive Bruno
- [ ] `npm uninstall sanity next-sanity @sanity/vision @sanity/image-url @sanity/block-tools @sanity/types @portabletext/react @portabletext/types`
- [ ] Remover diretorios: `src/sanity/`, `src/app/studio/`, `sanity/`, arquivo `sanity.config.ts`
- [ ] Remover `src/components/blog/PortableTextRenderer.tsx`
- [ ] Apagar `src/services/blog.ts` (substituido por `src/services/articles.ts`); atualizar imports em `src/app/blog/page.tsx`, `src/app/sitemap.ts`, `src/app/llms.txt/route.ts` (se houver), `src/app/feed.xml/route.ts` (se houver)
- [ ] Remover env vars Sanity de `.env.local`, `.env.example`, Vercel (production+preview): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_VERSION`, `SANITY_API_READ_TOKEN`
- [ ] Atualizar [CLAUDE.md](../CLAUDE.md) — remover toda mencao a Sanity e a Studio; adicionar referencia a Fase 18 no rodape
- [ ] Atualizar [docs/architecture/blog-cms-decision.md](architecture/blog-cms-decision.md) com header "[ARQUIVADO 2026-04-30 — substituido pela Fase 18 do TASKS.md]" e link pra Fase 18
- [ ] `npm run smoke` pos-cleanup: validar que home, /blog, /blog/<slug>, /autor/<slug>, sitemap shards, robots, llms continuam respondendo 200

### 18.I — Onboarding Bruno (1h)

> Sem onboarding humano, painel custom vira tech debt.

- [ ] Gravar video Loom (~10 min) cobrindo: login → criar autor → criar artigo → blocos custom no slash menu → upload de imagem → SEO Score → preview → agendar → publicar → historico
- [ ] Cheatsheet 1-pagina PDF com prints: como criar post + como agendar + como criar autor + onde ver historico

---

### Fase 18 — Riscos e mitigacoes

| Risco | Probabilidade | Mitigacao |
|---|---|---|
| Migracao MDX→JSON quebra formatacao em algum post | Media | Script roda contra dataset preview isolado; validacao visual obrigatoria post-a-post antes do cutover Fase 18.H |
| Bruno acha BlockNote pior que Sanity Studio | Baixa | BlockNote e mais Notion-like que Sanity Studio; pesquisa 2026 confirma vencedor pra editor nao-dev |
| Perda de revisoes antigas do Sanity | Media | Backup obrigatorio (Fase 18.H, primeira task) antes de qualquer remocao |
| URL muda → quebra SEO | Baixa | Slugs identicos preservados na migracao (script Fase 18.G); smoke test ja valida 1 post real do sitemap |
| Bug em producao pos-cutover | Media | Deploy em preview branch primeiro; toggle env var `BLOG_SOURCE=supabase\|sanity` permite rollback rapido por 7 dias antes do cleanup definitivo |
| RLS Supabase mal configurado vaza drafts | Media | Service role client so no server-side; auth via NextAuth → JWT custom claim → RLS policy `WHERE status='published'` no read publico |
| Editor agendado nao publica (cron falha) | Baixa | Cron Vercel + alerta email se article scheduled_at<now()-1h ainda esta status='scheduled' |
| Word count muito baixo bloqueia publish em post curto valido | Baixa | Block hard so em <300 palavras; avisos amarelos abaixo de 800 podem ser overridden pelo admin |

---

### Fase 18 — Ordem de execucao recomendada

```
Branch: feat/18-custom-blog-admin (PR separado)

Sprint 1 (1 sessao): 18.A + 18.B
  → schema + renderer publico funcionando contra dados de teste

Sprint 2 (1 sessao): 18.C + 18.D (parte 1: deps + wrapper + 2 blocos custom)
  → autores em prod + editor renderiza em /admin

Sprint 3 (1 sessao): 18.D (resto) + 18.E (lista + form basico)
  → Bruno consegue criar artigo simples

Sprint 4 (1 sessao): 18.E (resto: SEO panel + score + revisoes) + 18.F
  → publish/agendar/historico completos

Sprint 5 (1 sessao): 18.G + 18.H + 18.I
  → migracao + cleanup Sanity + onboarding

Total: ~5 sessoes de trabalho focadas, ~7-10 dias corridos com validacao visual entre cada sprint.
```

---
