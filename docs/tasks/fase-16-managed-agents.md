# Fase 16 — Claude Managed Agents

> Claude Managed Agents: qualificacao, atendimento 24h, monitoramento SEO.
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


## Fase 16 — Claude Managed Agents (Médio Prazo — Pós-Deploy)

> **Contexto:** Anthropic lançou Claude Managed Agents em beta público (08/04/2026).
> Plataforma managed para agentes IA com infra, scaling e segurança inclusos.
> Custo: tokens do modelo + $0.08/hora de runtime do agente.
> Docs: https://platform.claude.com/docs/en/managed-agents/overview

### 16.1 — Agente de Qualificação de Leads
> Prioridade alta — impacto direto na conversão do site.
- [ ] Criar agente que recebe leads do formulário do site (POST /api/lead)
- [ ] Agente qualifica via conversa: bairro preferido, faixa de preço, tipo de imóvel, urgência
- [ ] Integrar com API Loft (read-only) como tool — agente sugere imóveis compatíveis
- [ ] Enviar lead qualificado ao CRM com dados enriquecidos (interesse, faixa, bairros)
- [ ] Fallback: se agente indisponível, fluxo atual (WhatsApp direto) continua funcionando

**Como implementar:**
1. Definir agent com tools: `search_properties` (GET API Loft), `submit_lead` (POST /lead)
2. Guardrails: read-only na API Loft (REGRA ABSOLUTA), max tokens por sessão, timeout 5min
3. System prompt com contexto FYMOOB: bairros, faixas de preço, tipos disponíveis
4. Deploy via Claude Platform (managed infra)
5. Endpoint exposto como API route no Next.js (`/api/agent/qualify`)

**Custo estimado:** ~$58/mês runtime (24/7) + ~$20-50/mês tokens = ~$80-110/mês

### 16.2 — Agente de Atendimento Imobiliário (Chat 24h)
> Corretor virtual que responde dúvidas sobre imóveis específicos.
- [ ] Widget de chat na página do imóvel (lazy load, abaixo do fold)
- [ ] Tools do agente: buscar detalhes do imóvel, fotos, localização, imóveis similares
- [ ] Responde perguntas: "Aceita pet?", "Tem vaga?", "Valor do condomínio?", "Perto de escola?"
- [ ] Se não souber, direciona para WhatsApp do corretor
- [ ] Dados de conversa enviados ao CRM como contexto do lead

**Como implementar:**
1. Agent com tools: `get_property_details`, `search_similar`, `get_neighborhood_info`
2. System prompt: tom consultivo, nunca inventar dados, sempre citar fonte (CRM)
3. UI: botão "Perguntar sobre este imóvel" → chat modal lightweight
4. Sessão persistente por imóvel (memory do Managed Agents)

### 16.3 — Agente de Monitoramento SEO Automático
> Já temos skills SEO — transformar em agente scheduled.
- [ ] Migrar lógica do `/project:seo-report` para Managed Agent
- [ ] Schedule semanal: analisa GSC, Lighthouse, indexação
- [ ] Gera relatório em `docs/seo-reports/` automaticamente
- [ ] Alerta via email/WhatsApp se ranking cair >20% em keyword importante
- [ ] Sugere ações corretivas baseado nos dados

**Como implementar:**
1. Agent com tools: GSC API, PageSpeed Insights, sitemap reader
2. Cron via Claude Platform (schedule semanal)
3. Output: markdown report + alertas condicionais

---
