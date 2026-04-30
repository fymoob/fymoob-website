-- ─────────────────────────────────────────────────────────────────
-- Fase 18.A — Media library (catalogo de assets)
-- ─────────────────────────────────────────────────────────────────
-- Catalogo de imagens/videos referenciados em articles + authors.
-- Storage real fica em Supabase Storage (buckets); esta tabela e o indice
-- pesquisavel ("Galeria" do admin).

create table if not exists public.media (
  id            uuid primary key default gen_random_uuid(),
  url           text not null,                              -- URL publica (CDN Supabase)
  storage_path  text not null,                              -- ex: 'articles-covers/2026-04/foto.webp'
  alt           text,
  type          text not null check (type in ('cover', 'inline', 'author', 'other')),
  size_bytes    integer,
  width         integer,
  height        integer,
  uploaded_by   uuid,
  created_at    timestamptz not null default now()
);

create index if not exists media_type_created_idx
  on public.media (type, created_at desc);
