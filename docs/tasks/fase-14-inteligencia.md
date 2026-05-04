# Fase 14 — Inteligencia Imobiliaria (Produto Futuro)

> Plataforma de inteligencia imobiliaria (scraping, IA, dashboard) — produto futuro.
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


## Fase 14 — Inteligência Imobiliária (Produto Futuro)

> Plataforma de dados e IA para vantagem competitiva da FYMOOB.
> Escopo separado do site — pode ser vendido como produto/consultoria.

### 14.1 — Monitoramento de Lançamentos e Construtoras
- [ ] Scraper de alvarás de construção da Prefeitura de Curitiba (dados públicos)
- [ ] Mapeamento de construtoras ativas em Curitiba (CNPJ, porte, histórico)
- [ ] Rastreamento de novos lançamentos em portais (VivaReal, ZAP, OLX)
- [ ] Score de oportunidade (construtora sem imobiliária exclusiva = lead quente)
- [ ] Alertas automáticos via WhatsApp/email para o Bruno

### 14.2 — Monitoramento de Concorrentes
- [ ] Scraping periódico dos sites da Jota8, Razzi, Apolar
- [ ] Detecção de novos imóveis captados por concorrentes
- [ ] Detecção de imóveis removidos (vendidos = indica demanda)
- [ ] Comparativo de faixas de preço por bairro vs concorrência

### 14.3 — Análise de Mercado e Tendências
- [ ] Preços médios por bairro ao longo do tempo (dados API Loft + scraping)
- [ ] Detecção de bairros com valorização acelerada
- [ ] Imóveis que baixaram preço (oportunidade de captação)
- [ ] Tempo médio de venda por região e tipo

### 14.4 — Dashboard e IA
- [ ] Dashboard Next.js com visualização de dados
- [ ] Claude API para extrair dados estruturados de páginas desestruturadas
- [ ] Relatório semanal automático com insights acionáveis
- [ ] Sugestões de ação ("Construtora X lançou no Batel sem parceira — ligar agora")

### Stack Técnica
- Scraping: Playwright + Firecrawl (JS rendering)
- Processamento: Claude API (extração de dados)
- Storage: PostgreSQL (Nhost)
- Alertas: WhatsApp API / email
- Dashboard: Next.js (mesmo stack)
- Cron: Vercel Cron ou Railway

### Modelo de Negócio
1. Incluso no contrato FYMOOB como diferencial (fidelização)
2. Produto SaaS separado — assinatura mensal para imobiliárias
3. Consultoria — análise e relatórios sob demanda

---
