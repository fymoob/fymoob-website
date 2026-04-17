# DNS Backup — fymoob.com.br

> Snapshot dos registros DNS no **GoDaddy** em **2026-04-17** (antes do cutover para Vercel).
> Usar este arquivo se precisar reverter pro site antigo (Atomicat/Loft).

---

## Registros atuais (3 precisam backup + 4 auto-gerenciados)

### ⚠️ Precisam backup (anotar ANTES de trocar)

| Tipo | Host | Aponta para | TTL | Função |
|------|------|-------------|-----|--------|
| **A** | `@` | `35.227.239.5` | 600s | IPv4 do domínio raiz — aponta pro site atual (Atomicat/Loft platform) |
| **CNAME** | `www` | `superdestaques6584.atomicatpages.com.` | 14400s | Subdomínio www — site atual está hospedado no Atomicat |
| **MX** | `send` | `feedback-smtp.sa-east-1.amazonses.com.` (prioridade 10) | 1h | Email via AWS SES no subdomínio `send.fymoob.com.br` (usado pra auto-responses/notificações) |

### 🟢 Auto-gerenciados (não precisa backup)

| Tipo | Host | Aponta para | Por quê não precisa |
|------|------|-------------|---------------------|
| **NS** | `@` | `ns31.domaincontrol.com.` | Nameservers do GoDaddy — recriados automaticamente se trocar provedor |
| **NS** | `@` | `ns32.domaincontrol.com.` | Mesmo acima |
| **SOA** | `@` | `ns31.domaincontrol.com.` | Auto-gerado pelo DNS GoDaddy |
| **CNAME** | `_domainconnect` | `_domainconnect.gd.domaincontrol.com.` | Do GoDaddy Domain Connect — recriado automaticamente |

---

## Como reverter pro DNS antigo (site Atomicat/Loft)

Se precisar voltar atrás após cutover:

### Passo 1 — Remover registros novos da Vercel
No GoDaddy DNS, deletar:
- Registro A novo adicionado pela Vercel (provavelmente `76.76.21.21` ou similar)
- CNAME `www` novo apontando pra Vercel (ex: `cname.vercel-dns.com`)

### Passo 2 — Recriar os 3 registros originais

```
Tipo:   A
Host:   @
Valor:  35.227.239.5
TTL:    600 segundos
```

```
Tipo:   CNAME
Host:   www
Valor:  superdestaques6584.atomicatpages.com.
TTL:    14400 segundos (4 horas)
```

```
Tipo:   MX
Host:   send
Valor:  feedback-smtp.sa-east-1.amazonses.com.
Prioridade: 10
TTL:    1 hora
```

### Passo 3 — Aguardar propagação

Propagação DNS leva de minutos até 24-48h dependendo do TTL original. Para acelerar:

```bash
# Verificar A record atual
dig fymoob.com.br A +short

# Verificar CNAME www
dig www.fymoob.com.br CNAME +short

# Verificar MX send
dig send.fymoob.com.br MX +short

# Flush DNS cache local (útil pra testar)
# Windows:
ipconfig /flushdns
# macOS:
sudo dscacheutil -flushcache
# Linux:
sudo systemd-resolve --flush-caches
```

---

## Notas contextuais

### IP `35.227.239.5`
Faixa Google Cloud Platform (asn-15169). O site atual fymoob.com.br provavelmente é hospedado numa VM/Cloud Run do Atomicat ou Loft/GTM Capital (a Atomicat parece ser a plataforma de landing page usada pelo Bruno).

### `superdestaques6584.atomicatpages.com.`
Atomicat é plataforma brasileira de landing page. O "6584" é o ID interno da instância do cliente. Se Bruno quiser voltar pro Atomicat, esse CNAME é a ponte.

### `feedback-smtp.sa-east-1.amazonses.com.` (MX em `send`)
AWS SES Brasil (São Paulo). O subdomínio `send.fymoob.com.br` recebe emails de bounce/feedback do SES. Não é email geral — é infraestrutura.

### Email principal do domínio (`@fymoob.com.br`)
**Não tem MX em `@`** — significa que email genérico pra `contato@fymoob.com.br` NÃO funciona hoje. Bruno recebe leads via CRM Loft, não via email de domínio próprio. Se quiser email próprio no futuro, precisará adicionar MX records (Google Workspace, Zoho, etc).

---

## Ao fazer o cutover pra Vercel

Após adicionar `fymoob.com.br` no Vercel dashboard → Domains, ele vai pedir pra adicionar/mudar:

1. **A `@` → `76.76.21.21`** (IP da Vercel) — substitui o `35.227.239.5` atual
2. **CNAME `www` → `cname.vercel-dns.com`** — substitui o Atomicat
3. **MX `send`** — manter se ainda usa AWS SES para algo, ou remover se migrar tudo pro Resend

> 💡 Mantenha o TTL baixo (~600s) nos novos registros durante a primeira semana pós-cutover — facilita rollback rápido caso precise reverter.

---

## Histórico

| Data | Evento | Responsável |
|------|--------|-------------|
| 2026-04-17 | Snapshot dos registros atuais antes do cutover | Vinicius |
| — | Cutover pra Vercel | pendente |
