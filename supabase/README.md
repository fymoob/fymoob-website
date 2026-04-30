# Supabase — FYMOOB Custom Blog Admin (Fase 18)

Schema e setup do backend custom que substitui Sanity. Aplique migrations em ordem na primeira vez que provisionar o banco.

## Requisitos

- Conta Supabase com projeto criado (preferencialmente `sa-east-1`).
- 4 env vars no `.env.local` e na Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<projeto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>   # SOMENTE server-side
SUPABASE_STORAGE_BUCKET_HOST=<projeto>.supabase.co
```

> `SUPABASE_SERVICE_ROLE_KEY` bypassa RLS — nunca exporte pro client bundle.

## Aplicar migrations

Opção 1 — Supabase Dashboard (recomendado pra primeira vez):

1. Abra o projeto Supabase → **SQL Editor**.
2. Cole o conteúdo de cada arquivo em `migrations/`, em ordem (`0001_…` → `0005_…`).
3. Execute. As migrations são idempotentes (`if not exists`).

Opção 2 — Supabase CLI:

```bash
npx supabase link --project-ref <ref>
npx supabase db push
```

## Storage Buckets (criar manualmente no painel)

| Bucket               | Público | Uso                                        |
|----------------------|---------|--------------------------------------------|
| `articles-covers`    | sim     | Imagem de capa de cada artigo              |
| `articles-inline`    | sim     | Imagens dentro do corpo do artigo          |
| `authors`            | sim     | Foto de perfil dos autores                 |

Configuração de cada bucket:
- **Public bucket:** sim (URLs servidas pela CDN).
- **File size limit:** 5 MB.
- **Allowed MIME types:** `image/webp`, `image/jpeg`, `image/png`, `image/avif`.

Upload via API só com `service role` (no server). Anon key não escreve.

## Modelo de dados

```
authors ──< articles
                │
                ├─< article_revisions  (snapshot por save)
                │
                └── (cover_image_url + body referenciam media via storage path)

media   (catálogo livre, indexa storage para "biblioteca" no admin)
```

## RLS — política de acesso

| Tabela              | Anon read                              | Anon write |
|---------------------|----------------------------------------|------------|
| `authors`           | tudo                                   | não        |
| `articles`          | apenas `status='published'` E `published_at<=now()` | não |
| `article_revisions` | nenhuma                                | não        |
| `media`             | nenhuma (URLs vivem em `articles.*`)   | não        |

Server actions Next.js usam `SUPABASE_SERVICE_ROLE_KEY` que bypassa RLS — guardrail real é o `auth()` check do NextAuth antes de cada operação.

## Migração dos 15 MDX legados (Fase 18.G)

Script one-shot que lê `content/blog/*.mdx`, converte cada um pra BlockNote JSON, faz upload das capas e insere em `articles` como **rascunho** (`status='draft'`, `seo_no_index=true`). Bruno revisa/publica manualmente depois.

```bash
# 1. Validar conversão sem escrever (recomendado primeiro)
node scripts/migrate-mdx-to-supabase.mjs --dry-run

# 2. Rodar pra valer
node scripts/migrate-mdx-to-supabase.mjs

# 3. Re-importar tudo (sobrescreve drafts existentes)
node scripts/migrate-mdx-to-supabase.mjs --force
```

O script é idempotente: se um slug já existe em `articles`, é pulado (a menos que `--force`).

**O que vai pra `migracao-mdx/` no bucket `articles-covers`:** todas as capas são uploadeadas com path `migracao-mdx/<slug>.webp` pra ficar fácil identificar/limpar depois.

**Validação pós-migração:**
1. `/admin/blog` → 15 rascunhos novos aparecem na lista
2. Abrir 1-2 → conferir se H2/H3, listas, tabelas e blocos custom (`MethodologyBox`, `CalloutBox`) estão renderizando corretamente
3. Publicar 1 manualmente → comparar `/admin/blog/preview/[id]` com `/blog/[slug]` antigo (Sanity/MDX) lado-a-lado
4. Se OK em todos os 15 → setar `BLOG_SOURCE=supabase` em `.env.local` + Vercel → limpar Sanity (Fase 18.H)

**Conversor:** `scripts/mdx-to-blocknote.mjs`. Pipeline:
1. Regex extrai `<MethodologyBox>`, `<CalloutBox>`, `<CTABox>`, `<Changelog>` → placeholders
2. `unified + remark-parse + remark-gfm` parseia markdown → MDAST
3. Walker emite blocos BlockNote (heading, paragraph, list, table, codeBlock, image, quote)
4. Placeholders re-injetados como blocos custom

## Re-rodar / reset

Migrations são idempotentes. Pra reset total, dropar tabelas em ordem inversa:

```sql
drop table if exists public.article_revisions cascade;
drop table if exists public.media cascade;
drop table if exists public.articles cascade;
drop type if exists public.article_status;
drop type if exists public.article_schema_type;
drop table if exists public.authors cascade;
drop function if exists public.set_updated_at;
```
