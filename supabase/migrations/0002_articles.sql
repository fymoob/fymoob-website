-- ─────────────────────────────────────────────────────────────────
-- Fase 18.A — Articles table
-- ─────────────────────────────────────────────────────────────────
-- Substitui Sanity post + MDX legado.
-- body = JSON estruturado do BlockNote (nao Portable Text, nao MDX).

do $$
begin
  if not exists (select 1 from pg_type where typname = 'article_status') then
    create type public.article_status as enum ('draft', 'scheduled', 'published', 'archived');
  end if;
  if not exists (select 1 from pg_type where typname = 'article_schema_type') then
    create type public.article_schema_type as enum ('Article', 'BlogPosting', 'NewsArticle', 'HowTo');
  end if;
end$$;

create table if not exists public.articles (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text unique not null,
  title                 text not null,
  description           text not null,
  body                  jsonb not null default '[]'::jsonb,   -- BlockNote document blocks
  cover_image_url       text,
  cover_image_alt       text,
  status                public.article_status not null default 'draft',
  published_at          timestamptz,
  scheduled_at          timestamptz,
  author_id             uuid references public.authors(id) on delete restrict,
  tags                  text[] not null default '{}',
  schema_type           public.article_schema_type not null default 'BlogPosting',
  reading_time_min      integer,
  word_count            integer,

  -- YMYL / E-E-A-T
  reviewed_by           text,                       -- ex: 'Research Protocol v1.0'
  next_review           date,
  methodology           jsonb,                      -- { period, sample, sources[], lastUpdate, nextReview }

  -- SEO overrides (opcionais; defaults usam title/description acima)
  seo_meta_title        text,
  seo_meta_description  text,
  seo_canonical         text,
  seo_no_index          boolean not null default false,
  seo_og_image_url      text,

  -- Auditoria
  created_by            uuid,                       -- email/id do admin que criou (futuro)
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- Indices alinhados com queries previstas (lista filtrada + sitemap)
create index if not exists articles_status_published_at_idx
  on public.articles (status, published_at desc);

create index if not exists articles_author_idx
  on public.articles (author_id);

create index if not exists articles_tags_gin_idx
  on public.articles using gin (tags);

create index if not exists articles_scheduled_idx
  on public.articles (scheduled_at)
  where status = 'scheduled';

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();
