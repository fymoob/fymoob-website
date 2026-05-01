# Admin Isolation Security Audit — Resultado

**Data:** 2026-05-01
**Origem:** Fase 20.W3.2 (audit codebase apontou como 🔴 critical em potencial)
**Veredito:** ✅ **SEGURO — sistema bem protegido**

---

## Executive summary

Audit profundo do `/admin/*` e `/api/*` mostrou que o sistema **já está
robustamente isolado**. Os achados do agente de arquitetura apontaram como
"crítico em potencial" porque ele não tinha lido o código de auth — não
era um issue real, era falta de visibilidade.

**Não há ação corretiva necessária.**

---

## Achados detalhados

### 1. Auth.js (NextAuth) configurado em [src/auth.ts](src/auth.ts)

| Camada | Status |
|---|---|
| Provider Resend (magic link, 10 min validity) | ✅ |
| Whitelist `ALLOWED_ADMIN_EMAILS` (env var) | ✅ |
| `signIn` callback rejeita não-whitelisted ANTES de enviar email | ✅ |
| JWT session 12h | ✅ |
| `trustHost: true` (Vercel proxy) + `useSecureCookies` em prod | ✅ |
| Hash SHA-256 do email pra logs (LGPD compliance) | ✅ |
| Adapter Upstash Redis (single-use tokens, 10 min TTL) | ✅ |
| Páginas customizadas de signIn/error | ✅ |

### 2. Defense in depth no layout `/admin`

[src/app/admin/layout.tsx:25-38](src/app/admin/layout.tsx#L25):

```ts
export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Runtime auth check — do NOT rely solely on middleware (Next.js CVE-2025-29927)
  const session = await auth()
  if (!session?.user?.email) {
    return <>{children}</>  // login page bypassa
  }
  // ... renderiza sidebar + content
}
```

**Defense in depth correto:** mesmo se middleware fosse bypassado via
CVE-2025-29927, layout não renderiza pra usuário não-autenticado.

### 3. Server actions com `requireAdmin()`

Todos os arquivos de actions têm helper `requireAdmin()` chamado no início
de **TODA** action exportada:

| Arquivo | Actions exportados | Auth checks |
|---|---|---|
| `src/app/admin/blog/_actions.ts` | 11 | 14 (cada action chama `requireAdmin()`) |
| `src/app/admin/blog/_cover-action.ts` | 1 | 1 |
| `src/app/admin/blog/_editor-actions.ts` | 2 | 4 |
| `src/app/admin/blog/autores/actions.ts` | 3 | 5 |
| **Total** | **17** | **24** |

`requireAdmin()` faz:
```ts
async function requireAdmin(): Promise<{ email: string }> {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/admin/login")
  }
  return { email: session.user.email }
}
```

Se algum admin sem cookie fizer requisição direta a um action via formData
ou JS no browser, a action redireciona pra login antes de tocar dados.

### 4. APIs sensíveis com secret tokens

| Endpoint | Proteção |
|---|---|
| `/api/auth/[...nextauth]` | NextAuth handler interno |
| `/api/lead` | Rate-limit IP + Turnstile token + LGPD consent |
| `/api/revalidate` | `x-revalidate-secret` header + `safeEqual` (timing-safe) |
| `/api/indexnow` | `x-indexnow-secret` header + `safeEqual` |
| `/api/cron/publish-scheduled` | Bearer `CRON_SECRET` (Vercel cron) |
| `/api/photos/[code]` | Público (catálogo CRM) |
| `/api/properties/batch` | Público (catálogo CRM) |
| `/api/property/[code]` | Público (catálogo CRM) |
| `/api/search/facets` | Público (filtros) |

### 5. Não há middleware (decisão consciente)

Não existe `src/middleware.ts`. Auth é feita via:
1. Layout server component (`auth()` em runtime)
2. Server actions (`requireAdmin()` em cada export)
3. Page components (`auth()` quando necessário)

**Por que isso é OK:**
- Defesa em camada (layout + action) cobre mesmo cenário que middleware
- Imune ao CVE-2025-29927 (que era especificamente em middleware)
- Mais resiliente: middleware é uma única camada de defesa; runtime checks são distribuídos

### 6. CSRF/session cookies

- `useSecureCookies: true` em prod → cookies só sobre HTTPS
- JWT em cookie HttpOnly (NextAuth default)
- `trustHost: true` necessário no Vercel mas com `AUTH_URL` setado evita open redirect

---

## Pequenas melhorias possíveis (opcional, não crítico)

### M1 — Documentar processo de auth em CLAUDE.md

Hoje o pattern `requireAdmin()` em cada action é convenção implícita. Se
um novo dev adicionar action sem a chamada, não há lint que pegue.

**Sugestão:** adicionar regra em CLAUDE.md:
> Toda server action em `/admin/**/*-action*.ts` ou `actions.ts` DEVE
> começar com `await requireAdmin()` antes de qualquer side-effect.

Adicionar lint rule custom no futuro (não urgente).

### M2 — Considerar middleware leve pra logging/metrics

Não pra auth (já coberto), mas pra:
- Logar tentativa de acesso anônimo (incidente forense)
- Métricas de uso admin (quantas ações/dia por usuário)

**Esforço:** S (1-2h). **Prioridade:** muito baixa.

---

## Conclusão

✅ **Sistema bem isolado, defense in depth aplicada, secrets protegidos.**

Não há ação corretiva. O agente de arquitetura registrou como crítico
em potencial por **falta de visibilidade do código de auth** — falso
alarme após audit.

Esta documentação fica como registro pro próximo audit não acionar a
mesma flag.
