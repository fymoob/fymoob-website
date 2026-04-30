-- ─────────────────────────────────────────────────────────────────
-- Fase 18.A — Row Level Security
-- ─────────────────────────────────────────────────────────────────
-- Modelo: leitura publica permitida apenas em articles publicados.
-- Escrita 100% via service role (server actions Next.js). Anon key NUNCA
-- vai escrever em prod — validamos auth via NextAuth no server antes.

alter table public.authors           enable row level security;
alter table public.articles          enable row level security;
alter table public.article_revisions enable row level security;
alter table public.media             enable row level security;

-- ────────────── articles ──────────────
drop policy if exists "articles_public_read_published" on public.articles;
create policy "articles_public_read_published"
  on public.articles for select
  to anon, authenticated
  using (status = 'published' and published_at is not null and published_at <= now());

-- ────────────── authors ──────────────
-- Leitura publica ampla — paginas /autor/[slug] precisam ler dados de autores
-- mesmo de posts ainda em rascunho (ex: preview do admin).
drop policy if exists "authors_public_read" on public.authors;
create policy "authors_public_read"
  on public.authors for select
  to anon, authenticated
  using (true);

-- ────────────── revisions ──────────────
-- Nao expostas publicamente. Service role bypassa RLS.
-- (Sem policy = nada le.)

-- ────────────── media ──────────────
-- Catalogo de mídia nao e listado publicamente; CDN URL e que e publica.
-- (Sem policy = nada le. URLs em uso ficam em articles.cover_image_url etc.)

-- Service role (`SUPABASE_SERVICE_ROLE_KEY`) bypassa todas as policies.
-- Use APENAS no server-side. Nunca expose pro client bundle.
