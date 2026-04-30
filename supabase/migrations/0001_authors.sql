-- ─────────────────────────────────────────────────────────────────
-- Fase 18.A — Authors table
-- ─────────────────────────────────────────────────────────────────
-- Bruno + Wagner + autores convidados. Cada artigo referencia um.
-- Schema separado de NextAuth (este e o catalogo editorial publico,
-- nao o registro de admin login).

create extension if not exists "pgcrypto";

create table if not exists public.authors (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  role          text not null,                       -- ex: Corretor, Diretor, Editor, Convidado
  creci         text,                                -- ex: CRECI/PR 24.494
  bio_short     text,                                -- 1-3 frases (rodape post + schema Person)
  bio_long      jsonb,                               -- BlockNote JSON (opcional, pra pagina /autor/[slug])
  photo_url     text,
  photo_alt     text,
  email         text,
  expertise     text[] not null default '{}',        -- chips ex: ['Curitiba 2026', 'Financiamento']
  social_links  jsonb not null default '{}'::jsonb,  -- { linkedin, instagram, website, twitter }
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists authors_slug_idx on public.authors(slug);

-- updated_at automatico
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists authors_set_updated_at on public.authors;
create trigger authors_set_updated_at
  before update on public.authors
  for each row execute function public.set_updated_at();

-- Seeds: Bruno + Wagner (alinhado com schema atual de seo.ts)
insert into public.authors (slug, name, role, creci, bio_short, photo_url, photo_alt, email, expertise, social_links)
values
  (
    'bruno-cesar-de-almeida',
    'Bruno César de Almeida',
    'Corretor de Imóveis',
    'CRECI/PR 24.494',
    'Corretor responsável pela FYMOOB Imobiliária (CRECI J 9420). Atua em Curitiba há mais de uma década com foco em apartamentos e casas residenciais.',
    '/images/team/bruno.jpeg',
    'Foto do corretor Bruno César de Almeida, sócio e CRECI responsável da FYMOOB',
    'fymoob@gmail.com',
    array['Curitiba', 'Apartamentos', 'Casas Residenciais', 'Mercado Imobiliário PR'],
    '{}'::jsonb
  ),
  (
    'wagner-fymoob',
    'Wagner',
    'Diretor',
    null,
    'Sócio diretor da FYMOOB. Responsável por estratégia comercial e operações.',
    '/images/team/wagner.jpeg',
    'Foto de Wagner, sócio diretor da FYMOOB',
    null,
    array['Estratégia Comercial', 'Operações'],
    '{}'::jsonb
  )
on conflict (slug) do nothing;
