# Padrões de Integração CRM — FYMOOB

> **Fonte:** Research consolidado 18-20/04/2026.
> **Contexto:** Loft/Vista API não tem webhook nativo. Documenta padrões pra sincronização, multi-CRM (parceiros), e limitações conhecidas.

---

## Parte 1 — Sync CRM → Site (frescor de catálogo)

### Problema
Bruno reportou 19/04 que ao cadastrar imóvel no CRM, demora até 1h pra aparecer no site (TTL cache atual). Ele quer frescor menor.

### Loft NÃO tem webhook
Confirmado via [documentação oficial Vista Software](https://www.vistasoft.com.br/api/):
- Zero endpoints de webhook/notification/subscription/push
- Palavra "webhook" não aparece em nenhum lugar da API
- **Único mecanismo:** polling manual (consultar `/imoveis/listar` periodicamente filtrando por `DataAtualizacao`)

Pluga (middleware brasileiro) só funciona na direção **OUTRAS ferramentas → Vista**, não Vista → externo.

### Solução escolhida: Smart polling via cron externo

**Arquitetura:**

```
┌─────────────────┐   a cada 10min   ┌──────────────────────┐
│  cron-job.org   │ ───GET Bearer──> │  /api/sync (Next.js) │
│   (gratuito)    │                  │                      │
└─────────────────┘                  │  1. Lê cursor do KV  │
                                     │     (last sync time) │
                                     │  2. GET Loft filter  │
                                     │     DataAtualizacao  │
                                     │     > cursor - 2min  │
                                     │  3. Se mudou:        │
                                     │     revalidateTag    │
                                     │     ("imoveis")      │
                                     │  4. Salva cursor     │
                                     └──────────────────────┘

Fallback: TTL de 1h (rede de segurança se cron falhar)
```

### Comparativo das opções

| Abordagem | Frescor | Custo | Complexidade |
|---|---|---|---|
| ISR TTL curto (só) | Até 15min | Zero | Trivial (1 linha) |
| **Smart polling + cron externo** ← | **Até 10min** | **Zero** | **Média (1.5h dev)** |
| Vercel Cron Hobby | 1x/dia (inútil) | Zero | Baixa |
| Vercel Cron Pro | 1min mínimo | $20/mês | Baixa |
| Webhook Loft | Instantâneo | - | **Impossível** (não tem) |

### Por que cron-job.org

- ✅ Free ilimitado, 1min mínimo de intervalo
- ✅ Custom Bearer header
- ✅ Logs 7 dias
- ✅ Latência <30s
- ✅ 10+ anos de histórico estável
- ⚠️ Sem SLA formal (mas pra nosso volume é suficiente)

**EVITAR:** GitHub Actions cron (drift documentado 5-15min, jobs pulados)

### Armadilhas mapeadas (implementar com cuidado)

1. **Janela de overlap 2min** (`DataAtualizacao > cursor - 120s`) — previne perder imóveis com timestamps colididos
2. **Tie-breaker por Codigo** — se 2 imóveis atualizam no mesmo segundo, ordem determinística
3. **Commit do cursor SÓ após revalidateTag suceder** — se invalidação falhar, próximo tick pega de novo
4. **Idempotência no endpoint** — pode receber 2 calls em 1min sem bagunçar

---

## Parte 2 — Multi-CRM (parceiros)

### Demanda
Bruno pediu 19/04: imóveis de parceiros (outras imobiliárias) aparecerem no site FYMOOB.

### Decisão primária — modelo jurídico

**A ser definido pelo Bruno:**

1. **Corretor associado** (mais comum BR) — parceiro assina contrato de associação, carteira dele entra como se fosse da FYMOOB, só CRECI J 9420 aparece, lead só pra Bruno
2. **Imobiliárias independentes** — parceiro mantém CRECI próprio, aparece no site, lead pode ir direto pra ele
3. **Outro formato** — negociar

### Se escolher opção 2 (mais complexa)

**Credenciais por parceiro:**
- Hostname da API Vista (`parceiroXYZ-rest.vistahost.com.br`)
- API key
- CRECI
- Plano Loft tem acesso a API (alguns planos não incluem)

**Arquitetura:**

```
LOFT_KEYS=[
  { host: "brunoces-rest...", key: "...", creci: "J9420", origem: "fymoob" },
  { host: "parceiro1-rest...", key: "...", creci: "J12345", origem: "parceiro1" },
]
```

**Implementação:**
1. Service layer multi-CRM (fetch paralelo de N CRMs, merge results)
2. Prefix de códigos pra evitar colisão (`FYMOOB-69804378` vs `PARC1-69804378`)
3. Cada imóvel carrega tag de origem
4. UI: badge de origem + CRECI da imobiliária responsável nos cards/detail
5. Roteamento de lead: condicional baseado em origem

### Regulamentação CRECI/COFECI

- **Resolução COFECI 1.065/2007 + 1.336/2014:** todo anúncio precisa nome + CRECI-J de quem faz a oferta
- Se site é FYMOOB → basta CRECI J 9420 (Bruno/FYMOOB como "ofertante")
- Se o parceiro for **co-ofertante visível**, precisa CRECI dele também (compliance)
- Multa por descumprimento: advertência → censura → multa (8-10x anuidade) → suspensão

### LGPD — leads compartilhados

- **Base legal:** legítimo interesse (não consentimento), segundo Migalhas/Edilícias
- **Obrigações:**
  - Política de privacidade listando parceiros nomeados
  - DPA/contrato de operação definindo responsabilidade por incidente
  - Base legal registrada em RIPD
- Se lead vai pros 2 ao mesmo tempo → **co-controle** (ambos responsáveis solidariamente pela ANPD)

### Custo (orçamento complementar fora do contrato)

- **Setup inicial:** R$ 1.200 (cobre primeiro CRM parceiro conectado + UI)
- **CRM adicional:** R$ 400 (só config + teste após setup)
- **30 dias de suporte** inclusos pra bugs do multi-CRM

### Perguntas abertas pro Bruno

1. Modelo jurídico definido? (A, B, C)
2. Tem contrato escrito com parceiro?
3. Fluxo de lead: só Bruno, só parceiro, ou ambos?
4. Prioridade se mesmo imóvel em 2 CRMs?
5. Quantos parceiros previstos (6 meses)? 2-3 → hardcoded; 10+ → precisa painel admin
6. Se parceiro sair, remove imediato ou deixa "indisponível" X dias?

---

## Parte 3 — Loft Share Button (imo.bi branding)

### Problema
Bruno reportou 19/04: corretores usam botão "Compartilhar" do CRM Loft → gera URL tipo `http://v.imo.bi/K2dAsGVihJTWkP` → leva pra mini-página hospedada pelo Loft (não pelo FYMOOB). Perde branding.

### Caminhos possíveis

**1. Configuração no painel Loft** (zero dev, só suporte)
Bruno abre ticket: *"É possível configurar custom domain pros links de compartilhamento apontarem pro fymoob.com.br?"*
- Alguns CRMs (Jetimob, Tecimob) oferecem
- Loft provavelmente NÃO oferece (produto standard)

**2. Ferramenta interna pros corretores** (~4-6h dev, R$ 1.000)
- Página `/admin/compartilhar` no site FYMOOB
- Corretor pesquisa imóvel, copia URL FYMOOB, botão "Compartilhar WhatsApp" com msg pré-formatada
- Bônus: QR code pra apresentação presencial
- Requer treinamento do time, mas não depende de Loft

**3. Extensão Chrome** (~15-20h dev, alto esforço de manutenção)
- Detecta botão Loft, substitui URL
- **NÃO recomendo** — Loft atualiza UI e quebra

**4. Aceitar + mitigar** (zero dev)
- Personalizar visual do minisite Loft com logo + cores FYMOOB (se Loft permitir)
- Não fica ideal mas reduz dano de branding

---

## Parte 4 — Limitações conhecidas da API Loft/Vista

### Regra absoluta do projeto
**NUNCA executar operações de escrita (PUT, POST modificação, DELETE) na API Loft em produção.**

Usar apenas:
- `GET /imoveis/listar` — listagem
- `GET /imoveis/detalhes` — detalhe
- `GET /imoveis/destaques` — destaques marcados
- `POST /lead` — envio de leads (único POST autorizado)

Se precisar testar escrita → SÓ em sandbox (`sandbox-rest.vistahost.com.br`).

### Campos do schema — o que existe
- 79 Caracteristicas (Caracteristicas nested object)
- 77 InfraEstrutura (nested object)
- Campos fixos: Codigo, Categoria, Status, Finalidade, Bairro, Cidade, etc.

### Campos ausentes notáveis
- `AnoConstrucao`, `Face`, `Topografia`, `Salas`, `Varandas` — existem em DETAIL_FIELDS mas não em CARD_FIELDS (requer fetch extra)
- `AreaTerreno` — ingerido mas nunca exibido

### Customização de validação por cliente
**Não oferecida.** Loft/Vista é produto standard, todos clientes têm mesmas features.
- FYMOOB (250 imóveis) não tem peso pra customização one-off
- Tempo de resposta do suporte: ~28 dias (Reclame Aqui)
- Pedido de hard limit de caracteres foi avaliado como **inviável** (afetaria 20.000 clientes)
- Solução alternativa: policing + auditoria do nosso lado

### Revalidação de cache
- `unstable_cache` com tag `imoveis` (TTL 3600s = 1h)
- Endpoint `POST /api/revalidate` com `x-revalidate-secret` header invalida imediato
- Chamada típica:
  ```bash
  curl -X POST https://fymoob.com.br/api/revalidate \
    -H "Content-Type: application/json" \
    -H "x-revalidate-secret: $SECRET" \
    -d '{"tag":"imoveis"}'
  ```

---

## Fontes

### Loft/Vista
- [Base oficial ajuda.vistasoft.com.br](https://ajuda.vistasoft.com.br/)
- [Portal Loft CRM](https://portal.loft.com.br/crm/)
- [Reclame Aqui Vista Software](https://www.reclameaqui.com.br/empresa/vista-software-e-internet-ltda/)

### Polling patterns
- [Next.js ISR docs](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
- [Vercel Data Cache](https://vercel.com/docs/caching/runtime-cache/data-cache)
- [Órulo webhooks Vista](https://movidesk.orulo.com.br/kb/pt-br/article/521613/integracao-com-o-sistema-loft)
- [Pluga — Vista CRM webhooks](https://pluga.zendesk.com/hc/pt-br/articles/4406711615507)

### Regulamentação
- [COFECI Res. 1.065/2007](https://intranet.cofeci.gov.br/arquivos/legislacao/resolucao_1066_07_ato_normativo.pdf)
- [COFECI Res. 1.504/2023](https://intranet.cofeci.gov.br/arquivos/legislacao/resolucao_1504_2023.pdf)
- [Migalhas — LGPD entre imobiliárias](https://www.migalhas.com.br/coluna/migalhas-edilicias/309961/lei-geral-de-protecao-de-dados-e-o-mercado-imobiliario)
- [CRECI-SC — contrato corretor associado](https://www.creci-sc.gov.br/p/noticias/o-contrato-de-corretor-associado-e-o-vinculo-entre-corretores-de-imoveis-e-imobiliarias/1032/)
