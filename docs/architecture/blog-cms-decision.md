# Decisão de CMS pra Blog — Sanity

> **Fonte:** Research consolidado 2026-04-20 (3 agentes paralelos + comparativo CMS market share 2026).
> **Decisão:** Sanity Headless CMS.
> **Status:** Pendente implementação.

---

## Contexto

Cláusula 2.1.i do contrato prevê "painel administrativo para que a CONTRATANTE possa criar, editar e publicar novos artigos do blog de forma autônoma".

Hoje (20/04/2026):
- 15 posts em MDX (`/content/blog/*.mdx`)
- Admin dashboard em `/admin/page.tsx` com cards "Blog" e "Empreendimentos" **desativados** (placeholder)
- Auth funcional: NextAuth 5 + Resend magic link + Turnstile + Upstash Redis
- Sem editor visual ainda

---

## Market Share CMS (2026)

### Mercado geral
- **WordPress: 62.8%** do CMS global (43.2% de todos os sites)
- Shopify: 7.1%
- Wix: 5.9%
- Squarespace: 3.2%
- Joomla: 2.4%

### Mercado Next.js / headless
- **Sanity: #1 no G2 por 4 anos seguidos** (categoria Headless CMS)
- Top 5: Sanity, Storyblok, Strapi, Contentful, Kontent.ai
- Mercado cresce 20.8%/ano

---

## 3 caminhos comparados

### Caminho A — Keystatic (Git-based, 8-12h dev)

- ✅ Preserva MDX existente (zero migração)
- ✅ Zero custo, zero infra
- ✅ Real-time preview via Next.js Draft Mode
- ❌ Sem agendamento de publicação
- ❌ Sem drafts robustos (localStorage)
- ❌ Imagens commitam no Git (limite de tamanho)
- ❌ Multi-autor requer conta GitHub

### Caminho B — Sanity Headless CMS (16-24h dev) ✅ **ESCOLHIDO**

- ✅ UX profissional (Notion/Google Docs-like)
- ✅ Drafts + agendamento + versionamento **nativos**
- ✅ Free tier cobre 100% (20 seats, 10k docs)
- ✅ Pipeline de imagem nativo (srcset automático)
- ✅ Revalidação <30s pós-publish (webhook)
- ✅ Multi-autor grátis (até 20 usuários)
- ❌ Migração dos 15 MDX (~3-4h script)
- ❌ Lock-in moderado (Portable Text, exportável)

### Caminho C — Custom Supabase + Novel editor (40-60h dev)

- ✅ Full control
- ✅ Unifica com Fase 15.A (Supabase já planejado pra leads)
- ✅ Novel é UX excelente
- ❌ Maior esforço dev
- ❌ Features básicas (drafts, agendamento, preview) requerem build

---

## Por que Sanity vence pro FYMOOB

1. **UX profissional pra Bruno (não-técnico)** — parece Notion, zero curva de aprendizado
2. **Features "grátis"** que em Custom levariam +20h cada: agendamento, drafts, versionamento
3. **Contrato Cláusula 2.1.i**: "painel administrativo" sem qualificativos — Sanity entrega o mais profissional
4. **Free tier permanente** pro volume FYMOOB (2-4 posts/mês, ~50-200 em 2 anos)
5. **Templates Vercel oficiais** com Sanity (integração nativa, 1-click setup)
6. **Caminho de saída**: se lock-in virar problema, migração pra MDX/Supabase é script de ~6h

---

## Editor Rich Text (rejeitado porque Sanity traz próprio)

Se fôssemos Custom, a escolha seria:

### Top 2 pra Next.js 2026

**1. Novel** ([novel.sh](https://novel.sh)) — recomendação primária
- Tiptap + shadcn/ui + slash commands estilo Notion
- Feito pelo time da Vercel (Steven Tey)
- Integração nativa Next.js 15/16 App Router
- Produção: Dub.co, Papermark, Precedent starter

**2. BlockNote** ([blocknotejs.org](https://blocknotejs.org)) — alternativa
- API mais alto-nível que Tiptap cru
- Cada bloco é objeto JSON tipo Notion real
- Melhor DX pra blocos customizados (ex: "imóvel em destaque")

### Descartados

- **Tiptap puro**: reinventar slash menu, bubble menu, upload
- **Lexical**: menos "Notion out-of-the-box"
- **MDX Editor**: exige cliente saber markdown
- **Plate.js**: overkill pra blog simples

---

## Schema Sanity proposto

### `post`
```
title: string (required)
slug: slug (auto de title)
description: text (required, <160 chars)
date: datetime
author: reference → author
coverImage: image (alt obrigatório)
tags: array of strings
body: array de Portable Text blocks
seo: {
  metaTitle?: string
  metaDescription?: string
  canonical?: string
  noIndex?: boolean
}
```

### `author`
```
name: string
bio: text
photo: image
role: string (ex: "Corretor")
creci: string (ex: "CRECI J 9420")
email: string
```

---

## Plano de implementação (faseado)

### Fase 1: Setup Sanity + schema (2-3h)
- `npm install sanity next-sanity`
- Criar projeto Sanity free
- Studio embarcado em `/admin/studio` (protegido por auth atual)
- Schema `post` e `author`

### Fase 2: Integração leitura site (3-4h)
- `src/services/blog.ts` passa a ler do Sanity via GROQ
- Fase transitória: dual-read (MDX legacy + Sanity novo)
- Schema JSON-LD BlogPosting mantém (já existe em [src/lib/seo.ts](../../src/lib/seo.ts))

### Fase 3: Revalidação on-demand (1-2h)
- Webhook Sanity publish → `/api/revalidate-blog` → `revalidateTag('blog')`
- Publish no Studio reflete no site em <30s

### Fase 4: Migração MDX → Sanity (3-4h)
Script `scripts/migrate-blog-to-sanity.mjs`:
1. `gray-matter` lê frontmatter + body dos 15 `.mdx`
2. Upload das imagens (`/public/blog/*.webp`) via `client.assets.upload`
3. Markdown → Portable Text via `@sanity/block-tools` + `remark-html` + `jsdom`
4. Cria doc Sanity com todos os campos mapeados + slug idêntico ao arquivo
5. Log de auditoria por post

### Fase 5: Validação visual (1h)
Checklist por post:
- ✅ Formatação igual (headings, listas, negrito, links internos)
- ✅ Tabelas markdown convertidas corretamente
- ✅ Imagens com alt preservado
- ✅ Metadata (title, description, OG) idêntica
- ✅ URL canonical mantida
- ✅ Schema BlogPosting JSON-LD funcionando

### Fase 6: Cleanup (30min)
Após validação de TODOS os 15:
- Remove `/content/blog/*.mdx`
- Remove parsing MDX de `src/services/blog.ts`
- Remove deps `next-mdx-remote` + `gray-matter`
- Mantém imagens em `/public/blog/` por 30 dias como fallback

### Fase 7: Treinamento Bruno (1h via videoconferência)
- Login no Studio
- Criar post: título, imagem, corpo, publish
- Agendar publicação futura
- Draft → Preview → Publish workflow

**Total estimado: 13-17h dev + 1h treinamento**

---

## Decisões abertas

### Autor padrão dos novos posts
Opções:
- Bruno (como os existentes)
- FYMOOB Imobiliária (genérico)
- Configurável por post (Bruno ou Wagner)

**A decidir com Bruno.**

### URL dos posts
Mantém `/blog/[slug]` (não muda). Zero impacto SEO.

---

## Riscos mapeados e mitigação

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Tabelas markdown convertidas errado | Média | Revisão manual post a post + suporte `remark-gfm` |
| Links internos relativos quebrados | Baixa | Script regex substitui `[texto](/path)` preservando formato |
| Imagens com alt perdido | Baixa | Script extrai alt do markdown `![alt](url)` |
| Performance Sanity vs MDX | Baixa | CDN Sanity rápido + cache via `revalidateTag` |
| Bruno clica "deletar" sem querer | Baixa | Sanity tem **histórico de revisões** (time travel) — rollback em 2 cliques |

---

## Fontes

- [WP Beginner Research 2026](https://www.wpbeginner.com/research/cms-market-share-report-latest-trends-and-usage-stats/)
- [Sanity G2 report 2026](https://www.sanity.io/top-5-headless-cms-platforms-2026)
- [Cosmic comparison 2026](https://www.cosmicjs.com/blog/headless-cms-comparison-2026-cosmic-contentful-strapi-sanity-prismic-hygraph)
- [Vercel Templates — CMS](https://vercel.com/templates/cms)
- [Keystatic docs](https://keystatic.com/docs/installation-next-js)
- [Novel.sh](https://novel.sh)
- [BlockNote](https://blocknotejs.org)
- [Sanity Pricing](https://www.sanity.io/pricing)
- [Sanity Webhooks + Next.js revalidation](https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs)
