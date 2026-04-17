# DNS Backup — fymoob.com

> Snapshot dos registros DNS no **GoDaddy** em **2026-04-17** (antes do cutover para Vercel).
> Este arquivo documenta TODOS os 20 registros de `fymoob.com` (diferente de `fymoob.com.br` — ver [dns-backup.md](dns-backup.md)).
> Usar este arquivo se precisar reverter pro site antigo (Atomicat via apex) OU debugar email/subdomínios.

---

## Inventário completo — 20 registros

### 🔴 Vão ser trocados no cutover (2 registros)

| # | Tipo | Host | Valor atual | TTL | Função |
|---|------|------|-------------|-----|--------|
| 1 | **A** | `@` | `35.227.239.5` | 600s | IPv4 do apex — Atomicat/Loft (GCP IP, mesmo IP que o .com.br tinha antes). **VAI PRA Vercel 76.76.21.21** |
| 2 | **A** | `www` | `35.227.239.5` | 600s | Subdomínio www — mesmo IP do apex. **VAI VIRAR CNAME Vercel** (deletar A + criar CNAME www → cname.vercel-dns.com.) |

### 🟢 PRESERVAR — Email ativo via Umbler (7 registros)

Bruno tem email `@fymoob.com` HOSPEDADO na Umbler. Qualquer mexida nesses → email para de funcionar.

| # | Tipo | Host | Valor | Prioridade | TTL | Função |
|---|------|------|-------|-----------|-----|--------|
| 3 | **MX** | `@` | `mx364.umbler.com.` | 10 | 1h | Servidor primário de entrega de email |
| 4 | **MX** | `@` | `mx128.umbler.in.` | 20 | 1h | Secundário (fallback) |
| 5 | **MX** | `@` | `mx783.umbler.com.br.` | 30 | 1h | Terciário |
| 6 | **MX** | `@` | `mx240.umbler.co.uk.` | 40 | 1h | Quaternário |
| 7 | **TXT** | `@` | `v=spf1 include:spf.umbler.com ~all` | — | 600s | SPF — autoriza servidores Umbler a enviar email como `@fymoob.com` |
| 8 | **CNAME** | `autodiscover` | `autodiscoverredirection.umbler.com.` | — | 1h | Autodiscover pra clientes Outlook/Thunderbird configurarem automaticamente |
| 9 | **CNAME** | `webmail` | `webmail.umbler.com.` | — | 1h | Interface webmail acessível em `webmail.fymoob.com` |

**Observação:** ausência de DKIM/DMARC records é ponto de atenção (aumenta risco de spam score em email saindo). Não é blocker, mas vale adicionar DKIM no futuro via Umbler.

### 🟢 PRESERVAR — Subdomínios ativos (5 registros)

Cada subdomínio aponta pra infraestrutura própria. Independentes do apex — continuam funcionando após cutover.

| # | Tipo | Host | Valor | TTL | Função |
|---|------|------|-------|-----|--------|
| 10 | **A** | `api` | `34.151.202.32` | 600s | `api.fymoob.com` — backend/API (IPv4, faixa Google Cloud) |
| 11 | **AAAA** | `api` | `2600:1900:40f0:fd5b:8000:5::` | 600s | Mesmo endpoint via IPv6 |
| 12 | **A** | `premium` | `50.6.138.130` | 600s | `premium.fymoob.com` — site/área premium (outro host) |
| 13 | **A** | `www.premium` | `50.6.138.130` | 600s | `www.premium.fymoob.com` — redundância do premium |
| 14 | **CNAME** | `destaques` | `cname.greatpages.com.br.` | 1h | `destaques.fymoob.com` — landing page externa hospedada na GreatPages (provavelmente pra campanhas pagas) |

### 🟢 PRESERVAR — Verificações de terceiros (2 registros)

| # | Tipo | Host | Valor | TTL | Função |
|---|------|------|-------|-----|--------|
| 15 | **TXT** | `@` | `facebook-domain-verification=459byt57cm4fhmnpb7upzu5bxkzoxs` | 1h | Meta Business Manager verification — conecta o domínio à Business Page do Bruno |
| 16 | **TXT** | `@` | `google-site-verification=5p2D2gdnBKo8oB7sJuRonTNVfFVOc5xA0qLWSb-JL-I` | 1h | **Google Search Console verification — já existente.** Bruno provavelmente tinha `fymoob.com` cadastrado no GSC antes. Descobrir qual conta Google tem acesso → pode haver histórico de indexação útil |

### 🟢 AUTO-GERENCIADOS — Ignorar (4 registros)

Recriados automaticamente pelo GoDaddy se forem deletados. Não entram em backup.

| # | Tipo | Host | Valor |
|---|------|------|-------|
| 17 | NS | `@` | `ns17.domaincontrol.com.` |
| 18 | NS | `@` | `ns18.domaincontrol.com.` |
| 19 | SOA | `@` | `ns17.domaincontrol.com.` |
| 20 | CNAME | `_domainconnect` | `_domainconnect.gd.domaincontrol.com.` |

---

## O que muda no cutover

**Apenas 2 operações no GoDaddy:**

### Edição 1 — Apex
```
A @   35.227.239.5   →   76.76.21.21   (ou IP que Vercel mostrar)
TTL: 600s (manter baixo pra rollback rápido)
```

### Edição 2 — www (deletar + criar)
```
DELETAR:  A www → 35.227.239.5
CRIAR:    CNAME www → cname.vercel-dns.com.
          TTL: 600s
```

**Tudo o resto (18 registros) fica intocado.**

---

## Como reverter pro DNS antigo

Se precisar voltar atrás após cutover:

### Passo 1 — Remover registros Vercel
- Deletar o novo CNAME `www → cname.vercel-dns.com.`
- Editar A @ de volta pro Atomicat IP (passo 2)

### Passo 2 — Recriar registros originais

**A @ apontando pro Atomicat:**
```
Tipo:   A
Host:   @
Valor:  35.227.239.5
TTL:    600 segundos
```

**A www apontando pro Atomicat (igual apex):**
```
Tipo:   A
Host:   www
Valor:  35.227.239.5
TTL:    600 segundos
```

### Passo 3 — Remover domínios fymoob.com da Vercel

No Vercel dashboard → Project → Domains → remover `fymoob.com` e `www.fymoob.com`.

### Passo 4 — Validar

```bash
nslookup fymoob.com
# Deve retornar 35.227.239.5 (Atomicat)

nslookup www.fymoob.com
# Deve retornar 35.227.239.5

nslookup -type=MX fymoob.com
# Deve continuar mostrando mx364.umbler.com etc (SEM ALTERAÇÃO)

# Flush cache local
ipconfig /flushdns
```

Propagação: 5-30min com TTL 600s.

---

## Notas contextuais

### IP `35.227.239.5` (Atomicat)
Faixa Google Cloud Platform (asn-15169). Mesmo IP que o `fymoob.com.br` tinha antes. Bruno/Wagner têm site hospedado numa VM Atomicat — plataforma brasileira de landing page.

### IP `34.151.202.32` (api.fymoob.com)
Faixa Google Cloud Platform. Backend/API não identificado pela sessão — Bruno saberá o que é. **Não tocar sem confirmar.**

### IP `50.6.138.130` (premium.fymoob.com)
Host desconhecido — fora das faixas GCP/AWS comuns. Provavelmente servidor dedicado antigo ou outra plataforma. Subdomínio "premium" sugere área de imóveis top-tier separada.

### Email Umbler (`@fymoob.com`)
- **Provedor:** Umbler (br.umbler.com) — hosting brasileiro com email incluso
- **Servidores MX:** 4 níveis de fallback (mx364 → mx128 → mx783 → mx240)
- **SPF configurado**, DKIM/DMARC **ausentes** (considerar adicionar futuramente pra melhorar deliverability)
- **Webmail:** `https://webmail.fymoob.com` (redirect pra Umbler)

### Google Site Verification preexistente
A TXT `google-site-verification=5p2D2gdnBKo8oB7sJuRonTNVfFVOc5xA0qLWSb-JL-I` indica que alguém já cadastrou `fymoob.com` no Google Search Console antes. Bruno deve ter feito isso quando criou o domínio. **Ação sugerida pós-cutover:** descobrir qual conta Google (perguntar ao Bruno) e verificar se há histórico de indexação útil — pode dar insights sobre páginas antigas crawleadas, tráfego histórico, etc.

### Facebook Domain Verification
Conecta o domínio ao Meta Business Manager do Bruno. Usado pra Business Page FYMOOB (Instagram + Facebook). **Preservar — é premissa pra anúncios pagos funcionarem.**

---

## Cutover pra Vercel — setup

Após adicionar `fymoob.com` + `www.fymoob.com` no Vercel dashboard como **Redirect to Another Domain** (308 → `fymoob.com.br`), Vercel vai pedir:

1. **A `@` → `76.76.21.21`** (IP Vercel) — substitui `35.227.239.5`
2. **CNAME `www` → `cname.vercel-dns.com.`** — substitui `A www 35.227.239.5`

Resultado final:
```
fymoob.com/qualquer/caminho        → 308 → fymoob.com.br/qualquer/caminho
www.fymoob.com/qualquer/caminho    → 308 → fymoob.com.br/qualquer/caminho
```

**Preservados intactos (funcionam antes, durante e depois do cutover):**
- Email `@fymoob.com` via Umbler (MX + SPF + autodiscover + webmail)
- `api.fymoob.com` — backend/API separado
- `premium.fymoob.com` + `www.premium.fymoob.com` — site premium
- `destaques.fymoob.com` — landing GreatPages
- Verificações Meta + Google

> 💡 Mantenha TTL baixo (600s) nos novos registros `A @` e `CNAME www` durante a primeira semana pós-cutover — facilita rollback rápido caso precise reverter.

---

## Histórico

| Data | Evento | Responsável |
|------|--------|-------------|
| 2026-04-17 | Snapshot dos 20 registros antes do cutover (documentação completa) | Vinicius + Claude |
| — | Cutover pra Vercel (apex + www como redirect 308 → .com.br) | pendente |
