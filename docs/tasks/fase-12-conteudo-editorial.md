# Fase 12 — Conteudo SEO Editorial

> Editorial SEO: 10 guias + 3 pillars + 15 artigos.
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


## Fase 12 — Conteudo SEO Editorial [EM ANDAMENTO]

> **Objetivo:** Construir topical authority com conteudo editorial profundo.
> Pesquisa mostrou que conteudo local profundo = fator #1 de ranking, acima de CWV.
> Modelo: Pillar + Cluster (guias de bairro → pillar pages → blog)
> Meta: 10 guias de bairro + 3 pillar pages + 10 artigos novos

### 12.1 — Infraestrutura [CONCLUIDA]
- [x] Rota `/guia/[bairro]/page.tsx` — Server Component com dados CRM + MDX editorial
- [x] Servico `src/services/guias.ts` — leitor MDX para guias
- [x] Componente `AuthorBio` — E-E-A-T (CRECI J 9420, foto, bio)
- [x] Sitemap atualizado com guias + pillar pages
- [x] Internal linking: landing pages `/imoveis/[bairro]` → guia completo

### 12.2 — Pillar Pages [CONCLUIDA]
- [x] `/comprar-imovel-curitiba` — Guia completo de compra (3000+ palavras)
- [x] `/morar-em-curitiba` — Guia completo para mudanca (3000+ palavras)
- [x] `/alugar-curitiba` — Guia completo de aluguel (3000+ palavras)

### 12.3 — Guias de Bairro [CONCLUIDA]
> 10 guias com 11.000 palavras totais, dados reais do CRM, FAQ schema, AuthorBio
- [x] Guia do Portao (2500+ palavras)
- [x] Guia do Batel (2500+ palavras)
- [x] Guia do Agua Verde (2500+ palavras)
- [x] Guia do Bigorrilho (Champagnat)
- [x] Guia do Centro
- [x] Guia do Ecoville
- [x] Guia do Cabral
- [x] Guia do Juveve
- [x] Guia do Santa Felicidade
- [x] Guia do Merces

### 12.4 — Blog Editorial [CONCLUIDA]
> 10 artigos novos + 5 existentes = 15 artigos, 15.145 palavras totais
- [x] ITBI Curitiba 2026 (target: 500-1000 buscas/mes)
- [x] Batel vs Agua Verde (target: 200-500 buscas/mes)
- [x] Custo de Vida em Curitiba (target: 1000-3000 buscas/mes)
- [x] Mercado Imobiliario Curitiba 2026 (tendencias, precos, oportunidades)
- [x] Financiamento Caixa vs Itau vs Bradesco (comparativo com tabelas)
- [x] Checklist: 25 Itens para Comprar Imovel (guia pratico)
- [x] Ecoville vs Bigorrilho (comparativo bairros)
- [x] Imovel Planta vs Pronto (vantagens, riscos, custos)
- [x] Melhores Bairros para Familias (8 bairros avaliados)
- [x] Preco m² por Bairro — Tabela 2026 (20+ bairros)

### 12.5 — E-E-A-T Signals [PENDENTE]
- [ ] Testimonials de clientes na pagina Sobre
- [ ] Fotos reais do escritorio e equipe
- [ ] Indice FYMOOB de Precos (pagina com dados do CRM)

### 12.6 — Auditoria e Revisao do Blog [PENDENTE]
> Enviar agentes especialistas para validar todos os 15 artigos publicados.
> Pesquisar padroes de escrita de blog imobiliario na web e aplicar melhorias.

- [ ] Auditar todos os 15 artigos: precisao de dados, links quebrados, informacoes desatualizadas
- [ ] Verificar dados numericos (ITBI, precos m², custos financiamento) — atualizar se mudaram
- [ ] Revisar estrutura SEO: titles, meta descriptions, headings hierarchy (H1→H2→H3)
- [ ] Verificar internal linking: cada artigo linka para imoveis, bairros e outros artigos relacionados?
- [ ] Verificar CTAs: cada artigo tem call-to-action claro para contato/busca/WhatsApp?
- [ ] Pesquisar padroes de escrita de blogs imobiliarios de alta performance (QuintoAndar, ZAP, Loft blog)
- [ ] Verificar legibilidade: paragrafos curtos, bullet points, tabelas, imagens
- [ ] Verificar E-E-A-T: AuthorBio presente, dados com fonte, experiencia demonstrada
- [ ] Verificar schema markup: BlogPosting JSON-LD correto em todos os artigos
- [ ] Gerar relatorio com lista de correcoes por artigo

---
