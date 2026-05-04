# Fase 17 — Agentes como Produto SaaS

> Agentes white-label como produto SaaS (longo prazo).
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


## Fase 17 — Agentes como Produto SaaS (Longo Prazo)

> **Visão:** Empacotar agentes FYMOOB como produto para vender a outras imobiliárias.
> Modelo: $1.500-3.000 setup + $500/mês por cliente (margem alta, manutenção baixa).
> Base: Fase 14 (Inteligência Imobiliária) + Fase 16 (Managed Agents).
> Referência: tweet Corey Ganim — "business in a box" com nicho imobiliário.

### 17.1 — Produto: Agente de Leads para Imobiliárias
> Replicar o agente 16.1 como produto white-label.
- [ ] Multi-tenant: cada imobiliária tem seu agente com dados próprios (API key, bairros, estoque)
- [ ] Onboarding automatizado: cliente fornece API key do CRM → agente configurado em horas
- [ ] Dashboard de métricas: leads qualificados, taxa de conversão, tempo de resposta
- [ ] Personalização: tom de voz, bairros prioritários, faixas de preço
- [ ] Billing: Stripe integration para cobrança mensal recorrente

**Como implementar:**
1. Template de agente parametrizável (CRM endpoint, API key, config de negócio)
2. Admin dashboard Next.js para gerenciar clientes e agentes
3. Cada cliente = 1 Managed Agent com tools e guardrails próprios
4. Custo por cliente: ~$80-110/mês (Anthropic) → cobrar $500/mês = margem ~80%

### 17.2 — Produto: Monitor de Mercado Imobiliário
> Transformar Fase 14 em serviço managed.
- [ ] Agente de scraping + análise que roda periodicamente
- [ ] Detecta novos lançamentos, mudanças de preço, imóveis vendidos
- [ ] Relatório semanal automatizado por email com insights acionáveis
- [ ] Alertas em tempo real: "Construtora X lançou no Batel sem parceira"
- [ ] API para integrar com CRMs dos clientes

**Como implementar:**
1. Managed Agent com tools: Playwright (scraping), Claude API (extração), PostgreSQL (storage)
2. Cron schedules: diário (scraping), semanal (relatório), real-time (alertas)
3. Multi-tenant: cada cliente monitora seus concorrentes e bairros de interesse

### 17.3 — Produto: Gerador de Conteúdo SEO Imobiliário
> Agente que gera conteúdo otimizado automaticamente.
- [ ] Gera descrições profissionais para imóveis novos no CRM
- [ ] Cria/atualiza landing pages programáticas com dados frescos
- [ ] Produz artigos de blog sobre tendências do mercado local
- [ ] Review humano obrigatório antes de publicar (guardrail)

**Como implementar:**
1. Agent com tools: CRM API (dados), GSC (keywords), content templates
2. Trigger: webhook do CRM quando novo imóvel entra
3. Output: markdown pronto para publicação, aguardando aprovação

### 17.4 — Go-to-Market
- [ ] Landing page do produto (subdomínio ou domínio separado)
- [ ] 3 imobiliárias beta (incluindo FYMOOB como caso de uso)
- [ ] Case study com métricas reais (leads qualificados, tempo de resposta, conversão)
- [ ] Precificação por tier: Basic ($300/mês), Pro ($500/mês), Enterprise (custom)
- [ ] Parceria com CRMs (Loft/Vista, Jetimob, Kenlo) para canal de distribuição

### Modelo Financeiro Estimado
```
Setup: R$5.000-10.000 por cliente (configuração + onboarding)
Mensal: R$1.500-2.500 por cliente
Custo Anthropic: ~R$400-600/mês por cliente
Margem bruta: ~70-80%

10 clientes = R$15.000-25.000/mês recorrente
Custo total Anthropic: ~R$5.000/mês
Lucro operacional: ~R$10.000-20.000/mês
```

---
