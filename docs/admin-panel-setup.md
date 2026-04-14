# Painel Admin — Guia de Setup

Guia passo-a-passo para provisionar as contas externas e configurar os env vars necessários para o painel `/admin` funcionar.

**Último update:** 2026-04-14

---

## Visão geral das dependências externas

| Serviço | Função | Custo |
|---|---|---|
| **Resend** | Envio de emails (magic link) | Free tier: 100 emails/dia, 3.000/mês |
| **Upstash Redis** | Rate limiting | Free tier: 10k comandos/dia |
| **Cloudflare Turnstile** | Proteção anti-bot no form de login | 100% gratuito |

Total de custo em produção: **R$ 0/mês** no escopo atual (2-3 admins, ~10 logins/dia).

---

## 1. Provisionar Resend (envio de magic link)

1. Criar conta em https://resend.com
2. Verificar o domínio `fymoob.com`:
   - Dashboard → Domains → Add Domain → `fymoob.com`
   - Adicionar os registros DNS que o Resend mostra (SPF, DKIM, DMARC) no provedor DNS do Vercel ou onde o domínio estiver
   - Aguardar verificação (normalmente <30 min)
3. Criar API key:
   - Dashboard → API Keys → Create API Key
   - Nome: "FYMOOB Production"
   - Permission: Full access ou "Sending access" apenas
   - Copiar a chave (formato `re_abc123...`)

**Env vars gerados:**
- `RESEND_API_KEY=re_abc123...`
- `RESEND_FROM_EMAIL=noreply@fymoob.com`

---

## 2. Provisionar Upstash Redis (rate limit)

1. Criar conta em https://upstash.com
2. Create Database:
   - Type: **Redis**
   - Name: `fymoob-admin-ratelimit`
   - Region: São Paulo (menor latência para Curitiba)
   - Type: Free (até 10k comandos/dia)
3. No dashboard do database, ir em "REST API":
   - Copiar `UPSTASH_REDIS_REST_URL`
   - Copiar `UPSTASH_REDIS_REST_TOKEN`

**Env vars gerados:**
- `UPSTASH_REDIS_REST_URL=https://...upstash.io`
- `UPSTASH_REDIS_REST_TOKEN=AXxxxxx...`

---

## 3. Provisionar Cloudflare Turnstile (anti-bot)

1. Criar conta em https://dash.cloudflare.com (se ainda não tiver)
2. Ir em **Turnstile** no menu lateral
3. Add site:
   - Site name: `FYMOOB Admin`
   - Hostname: `fymoob.com` (adicionar também `localhost` se quiser testar em dev)
   - Widget mode: **Managed** (balanço entre segurança e UX — recomendado)
4. Copiar:
   - **Site key** (vai pro client)
   - **Secret key** (vai pro server)

**Env vars gerados:**
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA...`
- `TURNSTILE_SECRET_KEY=0x4AAAA...`

---

## 4. Gerar `AUTH_SECRET`

Chave interna para assinar os JWTs de sessão. Qualquer string aleatória de 32+ chars.

```bash
# Linux/Mac/WSL:
openssl rand -base64 32

# Ou gere em https://generate-secret.vercel.app/32
```

**Env var:**
- `AUTH_SECRET=xxxxxx...` (32+ chars, aleatório)

---

## 5. Configurar lista de admins

Define quem pode acessar o painel. Emails separados por vírgula, case-insensitive.

**Env var:**
- `ALLOWED_ADMIN_EMAILS=bruno@fymoob.com,wagner@fymoob.com,vinicius.damas@hotmail.com`

**Importante:**
- Só emails nesta lista conseguem receber magic link (validação no callback `signIn` do Auth.js)
- Se alguém não-admin tentar logar, o sistema responde "se este email tiver acesso, enviamos..." mas **nenhum email é enviado** — previne enumeração
- Adicionar/remover admins = alterar env var no Vercel e redeploy

---

## 6. Configurar no Vercel

Dashboard Vercel → Settings → Environment Variables. Adicionar todas:

```
AUTH_SECRET=...
ALLOWED_ADMIN_EMAILS=bruno@fymoob.com,wagner@fymoob.com,vinicius.damas@hotmail.com
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@fymoob.com
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=AXx...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA...
TURNSTILE_SECRET_KEY=0x4AAAA...
```

Environments: aplicar em **Production** e **Preview** (dev local lê do `.env.local`).

Depois de setar, redeploy manualmente (ou push um commit) para as vars entrarem no build.

---

## 7. Configurar local (.env.local)

Para testar em desenvolvimento, copiar o `.env.example` para `.env.local` e preencher com as mesmas chaves.

**Observação pra dev:**
- Se não configurar Upstash em dev, o rate limit é pulado (permite tudo) — aparece warning no console
- Se não configurar Turnstile em dev, o captcha é pulado (permite tudo) — aparece warning no console
- Recomendado usar as mesmas chaves de produção em dev (Resend grátis, Upstash grátis, Turnstile dev mode)

---

## 8. Testar o fluxo

1. Build & deploy (ou `npm run dev`)
2. Acessar `https://fymoob.com/admin/login` (ou `localhost:3000/admin/login`)
3. Digitar email admin → resolver Turnstile → enviar
4. Email chega em 5-30 segundos
5. Clicar no link → redireciona pra `/admin` com sessão ativa
6. Testar logout no canto inferior da sidebar

**Troubleshooting:**
- Email não chega → verificar domínio Resend verificado + checar spam
- Erro "Campo não disponível" → algum env var faltando (ver console Vercel)
- Redirect infinito → `AUTH_SECRET` mudou entre sessões; limpar cookies

---

## Checklist de deploy

- [ ] Domínio fymoob.com verificado no Resend
- [ ] API key Resend criada e adicionada ao Vercel
- [ ] Database Upstash Redis criado na região sa-east
- [ ] URL + Token Upstash adicionados ao Vercel
- [ ] Site Turnstile criado pra `fymoob.com`
- [ ] Site key + Secret Turnstile adicionados ao Vercel
- [ ] `AUTH_SECRET` gerado e adicionado
- [ ] `ALLOWED_ADMIN_EMAILS` preenchido com emails do Bruno, Wagner e Vinicius
- [ ] Deploy feito com todas as vars ativas
- [ ] Teste end-to-end: login Bruno → email → clica → dashboard
- [ ] Teste de rejeição: tentar login com email não-admin → não recebe email
- [ ] Teste de rate limit: 6 tentativas em 15 min → rejeitado na 6ª

---

## Segurança — lembretes importantes

- **Nunca commitar `.env.local`** — já está no .gitignore
- **`AUTH_SECRET` é imutável** — se trocar, todos os logins atuais são invalidados (logout forçado)
- **Adicionar/remover admin** requer alteração de env var + redeploy
- **Resend API key** tem permissão de envio — se vazar, alguém pode enviar email fingindo ser FYMOOB. Revogar e rotacionar imediatamente se suspeitar vazamento.
- **Magic link tem validade de 10 min e uso único** — configurado no Auth.js, mais seguro que senha tradicional
