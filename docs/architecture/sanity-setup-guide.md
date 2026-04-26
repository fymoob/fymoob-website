# Sanity CMS — Setup Guide

> **Status:** Fase 1 (setup) implementada em 25/04/2026.
> **Decisão:** [docs/architecture/blog-cms-decision.md](blog-cms-decision.md)
> **Validação:** [docs/architecture/sanity-cms-validation-2026-04-25.md](sanity-cms-validation-2026-04-25.md)

---

## O que já está pronto no código

✅ Dependências instaladas (`sanity`, `next-sanity`, `@sanity/vision`, `@sanity/image-url`)
✅ Config Sanity em `sanity.config.ts` (raiz)
✅ Schemas em `sanity/schemas/`:
  - `post` — artigo do blog (Portable Text + 4 blocos custom + YMYL fields)
  - `author` — Bruno, Wagner, configurável
  - `methodologyBox`, `calloutBox`, `ctaBox`, `changelog` — blocos custom espelhando os componentes MDX existentes
✅ Studio embarcado em `/studio` com auth NextAuth (mesmo sistema do `/admin`)
✅ Cliente de leitura em `src/sanity/lib/client.ts`
✅ GROQ queries em `src/sanity/lib/queries.ts`
✅ Helper de imagem CDN em `src/sanity/lib/image.ts`

## O que falta (passos manuais que NÃO posso fazer no código)

### 1. Criar conta Sanity (Vinicius — 5min)

1. Acessar [sanity.io](https://www.sanity.io) → "Get started"
2. Login com Google (recomendado) ou GitHub
3. Criar novo projeto:
   - **Project name:** `FYMOOB Blog`
   - **Dataset name:** `production` (deixar padrão)
   - **Use schema template:** None (já temos schemas custom)

### 2. Pegar Project ID (1min)

1. Em [manage.sanity.io](https://www.sanity.io/manage), entrar no projeto criado
2. Settings → API → copiar **Project ID** (string tipo `abc123def`)

### 3. Configurar CORS (CRÍTICO — 2min)

Necessário pro Studio rodar dentro do site Next.js.

1. Em manage.sanity.io → **API** → **CORS Origins**
2. Add Origin:
   - `http://localhost:3000` (dev) — marcar "Allow credentials"
   - `https://fymoob.com.br` (prod) — marcar "Allow credentials"
   - `https://*.vercel.app` (preview deploys) — marcar "Allow credentials"

### 4. Criar tokens API (2min)

Em manage.sanity.io → **API** → **Tokens** → "Add API token":

**Token 1 — Read Token (pra preview de drafts):**
- Name: `Read drafts (Next.js)`
- Permissions: **Viewer** (read-only)
- Copiar valor → `SANITY_API_READ_TOKEN` no `.env.local`

**Token 2 — Webhook secret (pra revalidação):**
- Não precisa ser token Sanity — é secret arbitrário
- Gerar com: `openssl rand -base64 32`
- Adicionar em `.env.local`: `SANITY_REVALIDATE_SECRET=<valor-gerado>`

### 5. Adicionar env vars no `.env.local` local (1min)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<seu-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2026-04-25
SANITY_API_READ_TOKEN=<token-viewer>
SANITY_REVALIDATE_SECRET=<secret-gerado>
```

### 6. Adicionar env vars na Vercel (2min)

Em [vercel.com](https://vercel.com) → projeto fymoob → Settings → Environment Variables → adicionar **as 5 acima** com escopo `Production` + `Preview` + `Development`.

### 7. Validar localmente (3min)

```bash
npm run dev
```

Acessar [http://localhost:3000/studio](http://localhost:3000/studio):
1. Faz redirect pra `/admin/login` (correto — exige auth)
2. Login com magic link
3. Cai no Studio Sanity
4. Sidebar deve mostrar "📝 Artigos do Blog" e "✍️ Autores" (vazios — esperado)

### 8. Cadastrar autores Bruno + Wagner (5min)

No Studio:
1. **Autores** → **Create** → "Bruno César de Almeida"
   - Cargo: Corretor
   - CRECI: `CRECI/PR 24.494`
   - Foto: upload
   - Bio: "Corretor de imóveis em Curitiba há 15+ anos..."
2. Repetir pra Wagner

### 9. Próximo passo (Fase 2)

Após validar o Studio rodando, iniciar **Fase 2: Integração leitura site**:
- `src/services/blog.ts` passa a ler do Sanity via GROQ
- Fase transitória: dual-read (MDX legacy + Sanity novo)
- Componentes que renderizam Portable Text mapeados pros blocos custom

Estimativa Fase 2: 3-4h dev.

---

## Troubleshooting

### "Studio não carrega" / tela branca

- Verificar console do browser
- Causa comum: CORS não configurado (passo 3)
- Causa comum: Project ID errado no `.env.local`

### "Failed to fetch" no Studio

- Token de leitura não configurado ou expirado
- Refazer passo 4

### "Module not found: Can't resolve 'sanity'"

```bash
npm install
```

### Build Vercel falha após push

- Env vars não configuradas na Vercel (passo 6)
- Build local funciona porque usa `.env.local`

---

## Arquitetura — onde cada coisa vive

```
sanity.config.ts                       # Config principal Sanity Studio
sanity/
└── schemas/
    ├── index.ts                       # Registry de schemas
    ├── post.ts                        # Artigo do blog
    ├── author.ts                      # Autor (Bruno, Wagner)
    └── blocks/
        ├── methodology-box.ts         # ↔ <MethodologyBox /> mdx
        ├── callout-box.ts             # ↔ <CalloutBox /> mdx
        ├── cta-box.ts                 # ↔ <CTABox /> mdx
        └── changelog.ts               # ↔ <Changelog /> mdx

src/
├── app/
│   └── studio/
│       └── [[...tool]]/
│           ├── page.tsx               # Auth check + Studio render
│           ├── StudioClient.tsx       # Wrapper client-side
│           └── layout.tsx             # Bypassa header/footer site
└── sanity/
    └── lib/
        ├── client.ts                  # createClient pra leitura
        ├── image.ts                   # urlForImage helper CDN
        └── queries.ts                 # GROQ queries (ALL_POSTS, BY_SLUG)
```

---

## Referências

- [Sanity Studio docs](https://www.sanity.io/docs/studio)
- [next-sanity](https://github.com/sanity-io/next-sanity)
- [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- [Sanity CORS docs](https://www.sanity.io/docs/cors)
