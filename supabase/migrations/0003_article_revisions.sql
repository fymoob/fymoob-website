-- ─────────────────────────────────────────────────────────────────
-- Fase 18.A — Article revisions (rollback / time-travel)
-- ─────────────────────────────────────────────────────────────────
-- Snapshot a cada save manual. Permite "Bruno deletou sem querer → restore"
-- sem precisar de extensoes externas. Ver Fase 18.E (drawer Historico).

create table if not exists public.article_revisions (
  id           uuid primary key default gen_random_uuid(),
  article_id   uuid not null references public.articles(id) on delete cascade,
  title        text not null,
  body         jsonb not null,
  description  text,
  tags         text[],
  edited_by    uuid,
  edited_at    timestamptz not null default now()
);

create index if not exists article_revisions_article_idx
  on public.article_revisions (article_id, edited_at desc);
