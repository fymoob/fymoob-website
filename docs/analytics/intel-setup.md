# Setup — Analytics Intelligence (Sprint 1 Linha A)

> Como configurar o service account Google que da acesso a **GSC + GA4** num
> so JSON. Necessario pra rodar o skill `/weekly-report`.

## O que voce vai criar

1 **Service Account** no Google Cloud, com permissoes em:
- **GSC** (Search Console API) — leitura
- **GA4** (Google Analytics Data API) — leitura

Output: 1 arquivo JSON que vira env var `GOOGLE_SERVICE_ACCOUNT_JSON`.

## Passo 1 — Criar projeto Google Cloud (se nao tiver)

1. Acessar https://console.cloud.google.com/
2. Top bar > **Select a project** > **NEW PROJECT**
3. Nome: `fymoob-intel` (ou nome que preferir)
4. **CREATE**

> Se ja tem um projeto pra GA4 anteriormente, pode reusar — pula pro passo 2.

## Passo 2 — Habilitar as 2 APIs

No projeto criado, em **APIs & Services > Library**:

1. Buscar **"Google Search Console API"** > Enable
2. Buscar **"Google Analytics Data API"** > Enable

Confirmar em **APIs & Services > Enabled APIs** que ambas aparecem.

## Passo 3 — Criar service account

1. **IAM & Admin > Service Accounts > + CREATE SERVICE ACCOUNT**
2. Nome: `fymoob-analytics-reader`
3. ID: deixa auto-gerado
4. Description: `Read-only access to GSC + GA4 for weekly reports`
5. **CREATE AND CONTINUE**
6. **Skip permissions no projeto** (nao precisa role no Google Cloud project — vamos dar permissao DENTRO do GSC e GA4 separadamente)
7. **DONE**

## Passo 4 — Gerar key JSON

1. Na lista de Service Accounts, clicar no recem-criado
2. Tab **Keys** > **ADD KEY > Create new key**
3. Tipo: **JSON**
4. **CREATE** — baixa arquivo automatico (ex: `fymoob-intel-abcdef123456.json`)
5. **Guardar com seguranca** — esse JSON da acesso de leitura aos dados. Tratar como credencial.

## Passo 5 — Dar permissao em GSC

1. Abrir o JSON baixado e copiar o `client_email` (formato: `fymoob-analytics-reader@fymoob-intel.iam.gserviceaccount.com`)
2. Acessar https://search.google.com/search-console
3. Selecionar property `sc-domain:fymoob.com.br`
4. **Settings > Users and permissions > ADD USER**
5. Email: colar o `client_email`
6. Permission: **Restricted** (suficiente pra leitura)
7. **ADD**

## Passo 6 — Dar permissao em GA4

1. Abrir https://analytics.google.com/
2. Selecionar property FYMOOB
3. **Admin (engrenagem) > Property > Property Access Management > +**
4. Email: colar o `client_email`
5. Direct roles and data restrictions: **Viewer**
6. **ADD**

## Passo 7 — Pegar o GA4 Property ID

1. Em GA4 **Admin > Property Settings**
2. Copiar o **Property ID** (numerico, formato `123456789`)

## Passo 8 — Configurar `.env.local`

Adicionar 3 vars:

```bash
# Cole o JSON inteiro entre aspas SIMPLES (preserve formatting, sem escapar)
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"fymoob-intel","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"fymoob-analytics-reader@...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'

GSC_SITE_URL=sc-domain:fymoob.com.br

GA4_PROPERTY_ID=123456789
```

> **Aspas simples sao importantes.** O JSON do service account contem aspas
> duplas internas — aspas simples por fora preservam o conteudo sem
> escaping.

## Passo 9 — Testar setup

Rodar os 3 scripts pra validar:

```bash
# GSC — se o JSON funcionou, sai um JSON com summary + topQueries
node scripts/intel/gsc-pull.mjs --output tmp/intel/gsc-test.json

# GA4 real
node scripts/intel/ga4-pull.mjs --output tmp/intel/ga4-test.json

# Audit (le do JSON ja gerado pelo python script)
node scripts/intel/audit-snapshot.mjs --output tmp/intel/audit-test.json
```

Se algum falhar:
- **GSC: "User does not have sufficient permission"** — repetir Passo 5
- **GA4: "permission denied"** — repetir Passo 6 + Passo 7
- **GA4: "API not enabled"** — repetir Passo 2
- **JSON parsing error** — verificar aspas simples no `.env.local`

## Passo 10 — Configurar em prod (Vercel + GitHub Actions, futuro Sprint 2)

Quando o skill estiver estavel e quisermos cron weekly:

**Vercel** (se cron via Vercel):
- Settings > Environment Variables
- Adicionar as 3 vars (production environment)

**GitHub Actions** (recomendado pra cron de verdade):
- Settings > Secrets and variables > Actions > New repository secret
- Adicionar as 3 vars
- Workflow `.github/workflows/weekly-report.yml` chama os scripts

## Estimativa de custo

- GSC API: **gratuita** (quotas amplas)
- GA4 API: **gratuita** (quotas amplas pra propriedades padrao)
- Service account: **gratuito**

Custo do skill em si: ~$0,30/run (Anthropic API). Detalhes na SKILL.md.

## Seguranca

- O JSON da SA da acesso **somente leitura** (configuramos como Restricted/Viewer). Se vazar, atacante so consegue ler stats GSC/GA4 da FYMOOB — nao escrever, nao deletar, nao acessar Loft/Supabase.
- Ainda assim, tratar como credencial: nunca commitar, rotacionar 1×/ano (Google Cloud > Service Accounts > Keys > criar nova, deletar antiga).
- Nao expor pro client. Scripts rodam server-side.

## Troubleshooting

| Erro | Causa | Fix |
|---|---|---|
| `GOOGLE_SERVICE_ACCOUNT_JSON nao definida` | env nao carregado | Confirmar `.env.local` na raiz, ou `source .env.local` antes |
| `Invalid JWT signature` | JSON corrompido (escaping errado) | Re-baixar JSON, colar entre aspas simples |
| GSC retorna `0 rows` | Periodo sem dados ou permission errada | Validar via GSC web — site tem dados na janela? |
| GA4 retorna 0 events em `whatsapp_click` | Eventos ainda nao chegaram (latencia ate 48h) ou nao foram disparados | Validar com `window.dataLayer` no console em prod, esperar 24-48h pos primeiro disparo |
