# Fase 15 — Lead Capture + CRM (inclui 15.A Supabase)

> Lead form em prod + Fase 15.A Supabase (10 tasks pendentes antes de 15.17).
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


## Fase 15 — Lead Capture + CRM Automatizado

> Fluxo: capturar dados do cliente antes de abrir WhatsApp → enviar ao CRM via API → CRM cadastra cliente, atribui corretor pela roleta, registra mídia.
> Solicitado pelo Bruno em 07/04/2026. Inspirado no fluxo do ImovelWeb.

### Documentacao Tecnica — API Lead (testada e validada)

```
POST https://brunoces-rest.vistahost.com.br/lead?key={LOFT_API_KEY}
Content-Type: application/x-www-form-urlencoded

cadastro={"lead":{"nome":"...", "email":"...", "fone":"...", "interesse":"Venda", "anuncio":"69804147", "veiculo":"Site FYMOOB", "mensagem":"..."}}
```

**Campos:**
| Campo | Obrigatorio | Descricao |
|-------|-------------|-----------|
| `nome` | Sim | Nome do cliente |
| `email` | Sim (se nao tem fone) | Email do cliente |
| `fone` | Sim (se nao tem email) | Telefone do cliente |
| `interesse` | Nao | "Venda" ou "Locacao" (derivar da finalidade do imovel) |
| `anuncio` | Nao | Codigo do imovel (ex: "69804147") |
| `veiculo` | Sim | Midia de origem — usar "Site FYMOOB" |
| `mensagem` | Sim | Texto da mensagem (pode ser auto-gerada) |

**Resposta sucesso (200):**
```json
{"status": 200, "message": "O cadastro foi encontrado.", "Codigo": 8826568, "Corretor": 14}
```
- `Codigo` = ID do lead no CRM
- `Corretor` = ID do corretor atribuido pela roleta automatica

**Formato importante:** O body é `application/x-www-form-urlencoded` com o JSON dentro do parametro `cadastro` (nao é JSON puro no body).

### Tasks

- [ ] **15.1** Criar servico `src/services/lead.ts` — funcao `submitLead({nome, email, fone, codigoImovel, interesse, mensagem})` que faz POST /lead
- [ ] **15.2** Criar API route `src/app/api/lead/route.ts` — proxy server-side para nao expor LOFT_API_KEY no client
- [ ] **15.3** Criar componente `WhatsAppLeadModal` — modal com campos Nome, Email, Telefone, botao "Iniciar conversa"
- [ ] **15.4** Integrar modal no botao WhatsApp da pagina do imovel (`ContactSidebar`) — clique abre modal em vez de ir direto pro WhatsApp
- [ ] **15.5** Integrar modal no `MobileContactBar` — botao "Quero visitar" abre modal antes do WhatsApp
- [ ] **15.6** Integrar modal no `WhatsAppFloat` (desktop) — mesmo fluxo
- [ ] **15.7** Fluxo pos-submit: apos POST /lead com sucesso → redirecionar para WhatsApp com mensagem pre-preenchida (comportamento atual, mas agora com dados no CRM)
- [ ] **15.8** Tratamento de erro: se API falhar, redirecionar pro WhatsApp mesmo assim (nao bloquear o contato do cliente)
- [ ] **15.9** Validacao de formulario: nome obrigatorio, email OU telefone obrigatorio, feedback visual
- [ ] **15.10** Campo `interesse` automatico: derivar de `property.finalidade` ("Venda", "Locacao", ou perguntar se "Venda e Locacao")
- [ ] **15.11** Campo `mensagem` auto-gerada: "Ola! Tenho interesse no imovel {titulo} (Cod: {codigo})." — editavel pelo usuario
- [ ] **15.12** Metrificacao: `veiculo` = "Site FYMOOB" permite filtrar no CRM todos os leads vindos do site
- [ ] **15.13** Testar fluxo completo: modal → API → CRM cadastra cliente → corretor atribuido → WhatsApp abre
- [ ] **15.14** Avisar Bruno para deletar lead de teste (Codigo 8826568) criado durante validacao da API

### Notas de implementacao
- API route server-side obrigatoria — a key nao pode ir pro browser
- Usar `application/x-www-form-urlencoded` com param `cadastro` (nao JSON body)
- Fallback: se a API der erro, o WhatsApp abre normalmente (usuario nao pode ficar travado)
- O formulario do `/contato` ja existe mas envia email — adaptar para tambem enviar ao CRM
- Performance: o modal e leve (form simples), nao precisa de dynamic import

### Estado atual dos formularios (2026-04-17)

**Destino dos 2 formularios publicos hoje:**

Tanto `/imovel/[slug]` (form "Envie uma mensagem") quanto `/anuncie` (form "Cadastre seu imovel") caem em `POST /api/lead` que proxyeia para `POST https://brunoces-rest.vistahost.com.br/lead?key=$LOFT_API_KEY`. Ambos aparecem no CRM Loft/Vista com `veiculo = "Site FYMOOB"`.

**Proteges ja aplicadas em `/api/lead/route.ts`:**
- Rate limit 5 req / 10min por IP (x-real-ip, fail-closed)
- Turnstile captcha obrigatorio
- Consent LGPD obrigatorio (valida antes de chegar a API)
- Sanitizacao inputs (trim + slice max 120/2000 chars)
- Validacao EMAIL_REGEX + PHONE_REGEX
- Timeout 8s na chamada a Loft
- Erro generico pro client se Loft cair (502) — nao vaza detalhes

**O que NAO esta implementado (gaps conscientes):**
- ❌ Email de notificacao pra Bruno/Wagner quando lead chega (Resend so pra magic link admin hoje)
- ❌ WhatsApp push notification
- ❌ Banco proprio (Nhost/Supabase) como backup do CRM
- ❌ GA4 event `lead_submit` com `property_code` + `interesse` (mede conversao real)
- ❌ Auto-reply pro usuario confirmando recebimento
- ❌ Se Loft cair: lead perdido, usuario ve erro e pode desistir

**Melhorias propostas (nao implementadas, discussao aberta com Bruno):**
- 15.15 — **Fallback Resend**: apos POST Loft OK, disparar email pra `bruno@fymoob.com` + `wagner@fymoob.com` com corpo do lead (redundancia + push notification instantaneo)
- 15.16 — **GA4 event** `lead_submit` (mede conversao por pagina/imovel/interesse)
- 15.17 — **Persistencia em DB proprio** (ver Fase 15.A abaixo — decisao Supabase vs Nhost)
- 15.18 — **Auto-reply** via Resend ao email do usuario confirmando recebimento (UX + reduz ansiedade de "sera que chegou?")
- 15.19 — **Fallback em caso de Loft offline**: salvar lead em DB proprio + retry via cron quando Loft voltar (zero perda)

---

### Fase 15.A — Decisao Backend/Storage: Supabase vs Nhost [DECIDIR ANTES DE FASE 15.17]

**Contexto:** `.env.example` tem `NHOST_SUBDOMAIN` mas **0 imports de `@nhost/*` ou `@supabase/*` em `src/`** — ambos sao "futuro". Decidir agora qual plataforma usar antes de comecar 15.17 (persistir leads).

**Escopo de uso:**
- Storage de imagens (upload admin: hero empreendimentos, autored content blog)
- Tabela `leads` (backup Loft CRM, historico proprio, relatorio)
- Futuro: `users` + `saved_properties` (logged-in user feature)
- Auth admin ja esta coberto por NextAuth v5 + Resend magic link (nao trocar)

**Comparativo (pesquisa 2026-04-17):**

| Dimensao | **Supabase** | **Nhost** |
|---|---|---|
| Auth.js v5 adapter | **First-party oficial** — NextAuth+Resend continua, Supabase so guarda sessions | Sem adapter. Ou ignora auth deles, ou migra tudo |
| Dashboard CRUD pra Bruno ver leads | **Table editor (estilo Airtable)** — cliente-friendly | Hasura Console — developer-first, Bruno vai se perder |
| Postgres + RLS | Puro + RLS maduro, referencia do mercado | Via Hasura permissions — mais verboso, UI propria |
| Regiao sa-east-1 (Sao Paulo) | ✅ Confirmado publicamente | ❓ Nao documentado, precisa confirmar |
| Image transforms on-the-fly | So Pro+ ($25/mes) | Free mas region BR nao confirmada |
| Realtime (admin ve lead chegar) | **Nativo e maduro** (broadcast/presence/changes) | GraphQL subscriptions via Hasura |
| Maturidade / risco empresa | $200M+ funding, comunidade grande, releases diarios | 6-12 pessoas, ultima rodada 2021 ($3M seed), risco medio |
| Free tier | 500MB DB, 1GB storage, 5GB bandwidth | 1GB DB, 1GB storage, 5GB egress |
| Docs Next.js 16 App Router | First-class | OK mas menor |

**Decisao: Supabase.** Tres razoes decisivas:
1. **Auth.js v5 adapter first-party** — zero refactor do login admin atual
2. **Dashboard CRUD cliente-friendly** — Bruno consegue ver leads sem a gente codar admin panel
3. **Maturidade corporativa + sa-east-1 confirmado** reduz risco em projeto long-term

**Trade-off:** perdemos image transforms no free tier. Mas imagens reais vem da CDN Vistahost (fotos imovel) ou `/public/images/` (hero estaticos), que rodam via `next/image` do Vercel sem precisar storage-side transform. So afetaria uploads autorais de blog/empreendimentos no futuro — nesse ponto, Pro ($25/mes) justificado.

**Riscos de migrar hoje:** quase zero. `NHOST_SUBDOMAIN` esta em `.env.example` mas nao importado. Trocar = deletar var, adicionar `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`, editar CLAUDE.md.

**Estimativa setup inicial:** 2-4h (criar projeto sa-east-1 + 3 migrations base `leads`/`users`/`saved_properties` + RLS + `@supabase/ssr` install + `src/services/supabase.ts` server + browser clients + Auth.js adapter). Schema design dos leads e o que vai demorar, nao a plataforma.

### Tasks Fase 15.A

- [ ] **15.A.1** — Criar projeto Supabase em sa-east-1 (Sao Paulo)
- [ ] **15.A.2** — Atualizar `.env.example`: remover `NHOST_SUBDOMAIN`, adicionar `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY`
- [ ] **15.A.3** — Atualizar CLAUDE.md secao "Stack" (Nhost → Supabase) e "Env vars"
- [ ] **15.A.4** — Instalar `@supabase/ssr` + criar `src/services/supabase.ts` com clients server/browser separados
- [ ] **15.A.5** — Schema migration inicial: tabela `leads` (id, codigo_imovel, nome, email, fone, interesse, mensagem, veiculo, loft_lead_code, status, created_at)
- [ ] **15.A.6** — RLS na tabela `leads`: service_role full access, anon role zero (so backend grava)
- [ ] **15.A.7** — Schema migration: tabela `saved_properties` (user_id, codigo_imovel, created_at) — futuro login
- [ ] **15.A.8** — Atualizar `/api/lead/route.ts`: apos POST Loft OK, tambem persistir em Supabase (storage 15.17)
- [ ] **15.A.9** — Criar Storage bucket `public-assets` pra futuras imagens upload (policy: only service_role write, public read)
- [ ] **15.A.10** — Documentar schema em `docs/db-schema.md` (fonte de verdade pra migrations futuras)

---
