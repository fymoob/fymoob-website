# Fase 13 — Extensoes SEO (13.8 a 13.13)

> Sub-fases 13.8-13.13: programatico Zillow, SEO 2026, indexacao, /anuncie redesign, imagens.
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


## Fase 13.8 — SEO Programático Inspirado em Zillow [EM ANDAMENTO — 15/04/2026]

> **Origem:** Pesquisa profunda (5 agentes em paralelo) sobre como Zillow.com chegou a ~200M visitas/mês.
> **Insight central:** Zillow domina long-tail programático — ~110M páginas indexadas,
> ~40M keywords ranqueando, cada URL trazendo 2-3 visitas/mês = 200M total.
> **Aplicável à FYMOOB em Curitiba** (~231 imóveis, ~75 bairros):
> multiplicar as combinações de URL em padrões que replicam (proporcionalmente)
> o "matriz de cobertura" do Zillow, sem depender de orçamento ou escala de dados deles.

### 13.8.1 — Bairro × Quartos pages [CONCLUIDA — 15/04/2026]

**Descoberto 15/04/2026:** infraestrutura parcial já existe em `src/app/imoveis/[bairro]/[tipo]/page.tsx`.
O segmento `[tipo]` aceita `N-quartos` polimorficamente.

**Implementado (commits c8a059a + 19f76eb):**
- [x] Rota `/imoveis/[bairro]/[N]-quartos` funcional (q = 1, 2, 3, 4, 5+)
- [x] generateStaticParams com quartos (1 a 5+)
- [x] generateMetadata com título/descrição otimizada
- [x] Cross-linking para outras opções de quartos + venda/aluguel
- [x] Sitemap inclui essas URLs
- [x] **Expandido N:** agora inclui 1, 2, 3, 4, 5+ (era só 2, 3, 4)
- [x] **Threshold dinâmico:** por bucket real, não pelo total do bairro (≥2 imóveis com aquele N)
- [x] Sitemap atualizado com mesmo filtro

**Thin-content guard (todas combinações):**
- [x] `/imoveis/[bairro]`: só bairros com ≥2 imóveis
- [x] `/imoveis/[bairro]/venda|aluguel`: checa count real da finalidade
- [x] `/imoveis/[bairro]/N-quartos`: checa count real do bucket de quartos
- [x] `/{tipo}-curitiba/[finalidade]`: checa matches reais (sobrados/aluguel excluído — sem imóveis)
- [x] `/imoveis/preco/[faixa]`: checa matches reais por faixa

**Resultado build:** 100 páginas `/imoveis/[bairro]/[tipo]`, 33 páginas de bairro base, ~521 páginas indexáveis totais.
**Query alvo:** "apartamento 3 quartos Batel", "casa 2 quartos Água Verde", "kitnet 1 quarto Centro".
**ROI esperado:** alta — concorrência local baixa, demanda real, 0 custo de manutenção (programático).

### 13.8.2 — Páginas de Bairro com Dados de Mercado [V1 CONCLUIDA, V2/V3 PENDENTES]

> **Inspiração Zillow:** cada página de bairro mostra preço médio/m², tempo médio no mercado,
> variação trimestral. FYMOOB está mostrando só grid de cards — perde força SEO.

Dividido em 3 fases conforme infraestrutura disponível:

#### V1 — Dados atuais (100% Loft API) [CONCLUIDA — 15/04/2026]

Usa apenas dados disponíveis HOJE no CRM Loft, sem criar dívida técnica.
Commit a5a7dec.

- [x] Agregação por bairro em `src/services/loft.ts` (função `getBairroMarketStats`):
  - Preço médio de venda (média dos `precoVenda`)
  - Preço médio de aluguel (média dos `precoAluguel`)
  - Preço médio por m² (média de `precoVenda / areaPrivativa`)
  - Faixa de preço (min-max)
  - Área média (média de `areaPrivativa`)
  - Distribuição por quartos (já temos em `porQuartos`)
  - Preço médio agrupado por Nº de quartos
- [x] Componente `BairroMarketStats` com números destacados (6 cards + grupo por quartos)
- [x] Schema `Dataset` apontando para os dados agregados (com `variableMeasured`, `temporalCoverage`, `spatialCoverage`, CC-BY 4.0)
- [x] Tipo `BairroMarketStats` em `types/property.ts`
- [x] Integrado em `/imoveis/[bairro]/page.tsx` após o grid de imóveis
- [ ] "Bairros vizinhos" via proximidade geográfica (latitude/longitude dos imóveis) — movido para próxima iteração
- [ ] Texto editorial gerado com template — movido para próxima iteração (quando V2 trouxer variação)

**Query alvo:** "preço m² Batel", "mercado imobiliário Curitiba", "quanto custa imóvel em Água Verde".
**ROI esperado:** muito alta — **nenhuma imobiliária de Curitiba faz isso**. First-mover + link magnet.

#### V2 — Snapshot Histórico no Supabase [PENDENTE — próximo sprint]

> **Problema resolvido:** Loft não guarda preços passados, impedindo mostrar variação trimestral.
> **Solução:** gravar snapshots semanais/mensais dos stats agregados em tabela própria.

- [ ] Schema Supabase: tabela `market_snapshots`
  - `id` (uuid), `bairro_slug` (text), `snapshot_date` (date)
  - `preco_medio_venda`, `preco_medio_aluguel`, `preco_m2_medio`
  - `total_imoveis`, `preco_min`, `preco_max`
  - `stats_por_quartos` (jsonb)
- [ ] Vercel Cron Job semanal (domingo 2h UTC) chamando `/api/cron/market-snapshot`
  - Para cada bairro com ≥2 imóveis: calcula stats via `getBairroMarketStats()`
  - Insere linha em `market_snapshots`
  - Idempotente: `ON CONFLICT (bairro_slug, snapshot_date) DO UPDATE`
- [ ] Extender `BairroMarketStats` para comparar último snapshot vs 90 dias atrás:
  - "+X% em 3 meses" (verde se positivo)
  - "-Y% em 3 meses" (vermelho se negativo)
- [ ] Após 90 dias de coleta: primeira comparação real disponível
- [ ] Após 12 meses: variação anual

**Precondição:** Supabase já configurado (Fase 9.2 admin panel) — não custa infraestrutura nova.
**ROI:** altíssimo após 3 meses — diferencial sustentável difícil de copiar.

#### V3 — Histórico de Vendas Real [PENDENTE — médio prazo]

> **Problema:** Loft não expõe histórico de transações (imóvel vendido some do endpoint `/imoveis/listar`).
> **Solução:** parceria com Bruno para exportar CSV mensal do CRM OU dumps direto do banco.

- [ ] Definir formato do export com Bruno (CSV com: código, bairro, tipo, preço, data_cadastro, data_venda)
- [ ] Schema Supabase: tabela `sales_history`
- [ ] Script de import mensal (painel admin) — Bruno faz upload do CSV
- [ ] Nova métrica: **Tempo médio no mercado real** (data_venda - data_cadastro)
- [ ] Nova métrica: **Nº de vendas trimestrais por bairro** (citável em PR)
- [ ] Nova métrica: **Taxa de redução de preço** (preço venda vs preço inicial)
- [ ] Relatório trimestral (13.8.4) ganha dados reais pra press release

**ROI:** alto — habilita 13.8.4 (data journalism para Gazeta do Povo/Tribuna PR) com números que jornalista pode citar.

### 13.8.3 — Calculadoras (Financiamento + Custo Total) [PENDENTE]

> **Inspiração Zillow:** calculadoras são páginas SEO independentes com alta conversão —
> quem calcula está com intenção real de compra.

**Implementação:**
- [ ] `/calculadora-financiamento` — SAC + Price + simulador CEF. Pura matemática client-side.
- [ ] `/calculadora-custo-total` — ITBI + cartório + escritura Curitiba (~3% em Curitiba)
- [ ] Cada calculadora é PÁGINA SEO (não widget escondido): título, explicação, FAQ, schema `WebApplication`
- [ ] Captura de email ao final (lead qualificado)

**Query alvo:** "simulador financiamento imóvel", "ITBI Curitiba calculadora", "quanto preciso ganhar pra comprar imóvel".
**Esforço:** 3-5 dias (client-side).
**ROI esperado:** alta — evergreen, link magnet, leads qualificados.

### 13.8.4 — Relatório Trimestral de Mercado [PENDENTE]

> **Inspiração Zillow:** publicam Home Value Index mensal, Rental Report, Market Reports —
> jornalistas citam, gera backlinks de alta autoridade (Bloomberg, WSJ, NYT).
> **Aplicação FYMOOB:** pitchar pra Gazeta do Povo, Bem Paraná, Tribuna, Bondenews.

**Implementação:**
- [ ] Template de relatório: preço médio por bairro + variação trimestral + tempo médio no mercado
- [ ] PDF baixável + página HTML indexável
- [ ] Cadência trimestral (Q1, Q2, Q3, Q4)
- [ ] Enviar press release pra 5 veículos locais
- [ ] Fonte citável: "Bruno César, diretor da FYMOOB, informa que..."

**ROI esperado:** alta (longo prazo) — cada trimestre = 2-5 backlinks de alta autoridade. Em 1 ano: +10-20 backlinks qualificados = salto perceptível no DA.

### 13.8.5 — Guide Library (12 artigos pillar em 2026) [PENDENTE]

> **Inspiração Zillow:** guides drive more traffic than listings do.
> Top pattern: pillar article + 3-5 supporting articles clusterizados.

**Temas priorizados:**
1. [ ] Como financiar imóvel em Curitiba 2026
2. [ ] ITBI Curitiba: calculadora + passo a passo
3. [ ] Documentação para comprar imóvel na planta
4. [ ] Aluguel sem fiador em Curitiba
5. [ ] Guia do primeiro imóvel em Curitiba
6. [ ] Caução vs seguro-fiança vs fiador (comparativo)
7. [ ] Escritura vs registro: diferenças e custos
8. [ ] Como avaliar o valor real de um imóvel
9. [ ] Reforma x imóvel pronto: vale a pena?
10. [ ] Financiamento: SAC ou Price?
11. [ ] Vender ou alugar imóvel: o que compensa?
12. [ ] Mercado imobiliário de Curitiba em 2026 (panorama anual)

**Cadência:** 1 pillar/mês + 2-3 artigos de apoio por pillar. Trabalho via painel admin (Fase 9.2) quando pronto.

### 13.8.6 — NÃO REPLICAR (armadilhas Zillow)

Documentado para evitar que futuras sessões sugiram:

- ❌ **Zestimate/AVM próprio** — impossível sem base nacional de transações (nem ZAP conseguiu)
- ❌ **School-zone pages** — Brasil não precifica por escola
- ❌ **Agent marketplace** — FYMOOB é a agência
- ❌ **Mobile app** — PWA cobre 95%
- ❌ **Community forum** — moderação > SEO em escala regional
- ❌ **3D tours Matterport** — ~R$ 300/imóvel, só faz sentido em premium

### 13.8.7 — Timeline de Indexação Google (Pós-Deploy) [REFERÊNCIA — 15/04/2026]

> **Pergunta respondida 15/04/2026:** quanto tempo até ~521 páginas indexarem no Google?

**Dados consolidados (2026, múltiplas fontes SEO):**

| Marco | Timeline |
|---|---|
| Primeiras páginas indexadas | 24–72h (com submit manual GSC) |
| Bulk (~70-80% das páginas) | 2–3 semanas |
| Indexação completa (~521 páginas) | **2–3 meses** |

**Benchmark por volume de site:**
- <500 páginas: 3-4 semanas
- 500–25k páginas: **2-3 meses** (faixa da FYMOOB)
- Novo domínio: +2-4 semanas para descoberta inicial

**Fatores que aceleram no caso FYMOOB:**
- ✅ Sitemap.xml dinâmico pronto
- ✅ Schema.org JSON-LD em todas as páginas (RealEstateListing, Breadcrumb, ItemList)
- ✅ Conteúdo único por página (bairro, imóvel, quartos, guia)
- ✅ Internal linking forte (cross-links bairro/tipo/quartos)
- ✅ Thin-content guard (nenhuma página vazia = crawl budget respeitado)

**Fatores que atrasam:**
- ⚠️ Site antigo: baixa autoridade de domínio (5 páginas indexadas hoje)
- ⚠️ Sem backlinks externos ainda
- ⚠️ Lançamento em batch (~500 páginas de uma vez → Google espaça o crawl)

**Plano de aceleração (a executar no deploy):**
1. [ ] Submit sitemap no GSC no dia do deploy (`fymoob.com/sitemap.xml`)
2. [ ] **URL Inspection manual** nas 10 URLs prioritárias: home, /busca, top 5 bairros (Batel, Água Verde, Bigorrilho, Centro, Portão), 2 landings tipo (apartamentos-curitiba, casas-curitiba) → indexação em 24-72h
3. [ ] **IndexNow ping** (Bing/Yandex) em paralelo — cobertura instantânea fora do Google
4. [ ] Backlinks iniciais: perfil FYMOOB em portais (ZAP, VivaReal, Chaves na Mão), diretórios de Curitiba (Curitiba Imobiliária, Gazeta do Povo)
5. [ ] Google Business Profile ativo e atualizado — sinaliza autoridade local (impacta Local Pack, ~15% do tráfego imobiliário)
6. [ ] Configurar GSC + GA4 + Bing Webmaster Tools **antes** do deploy

**Expectativa realista para FYMOOB (pós-deploy):**
- Semana 1: ~50 páginas indexadas (priorizadas via URL Inspection)
- Mês 1: ~300 páginas (~60%)
- Mês 2-3: ~500 páginas (95%+)

**Monitoramento:**
- GSC "Coverage" report semanalmente no 1º mês
- Alertar se <30% indexado após 30 dias → auditar com Screaming Frog

**Fontes:**
- [CrawlWP — How long before Google indexes](https://crawlwp.com/how-long-before-google-index-new-website-page/)
- [Conductor — Google indexing speed](https://www.conductor.com/academy/google-index/faq/indexing-speed/)
- [SEOZoom — Google indexing times](https://www.seozoom.com/google-indexing-time-seo/)
- [Search Engine Journal](https://www.searchenginejournal.com/how-long-before-google-indexes-my-new-page/464309/)
- [Google Search Central — Build and Submit a Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

### 13.8.8 — Decisão Threshold (validada por 3 agentes em paralelo) [REFERÊNCIA — 15/04/2026]

> **Pergunta:** relaxar thresholds para ≥1 para cumprir os 800+ do contrato?
> **Resposta consolidada (3 agentes):** NÃO. Mantém ≥2/≥3 — atingir 800+ via novas combinações legítimas.

**Justificativa:**
- HCU Mar/2024 + Scaled Content Abuse policy penaliza exatamente "800 páginas geradas programaticamente com 1 listing cada"
- Zillow/Redfin aplicam noindex dinâmico quando inventário < threshold (engenharia reversa via `site:`)
- Wrapper de schema + FAQ + intro sem inventário real = padrão-alvo do HCU
- Risco: classificação como "produção em escala com propósito de manipular ranking" → penalidade de core update

**Threshold final (ratificado):**

| Rota | Threshold | Manter |
|---|---|---|
| `/imoveis/[bairro]` | ≥2 imóveis | ✅ |
| `/imoveis/[bairro]/venda\|aluguel` | ≥2 da finalidade | ✅ |
| `/imoveis/[bairro]/[tipo]` | ≥3 do tipo | ✅ |
| `/imoveis/[bairro]/N-quartos` | ≥2 do bucket | ✅ |
| `/imoveis/preco/[faixa]` | ≥2 na faixa | ✅ |
| `/{tipo}-curitiba/[finalidade]` | ≥2 matches | ✅ |

**Páginas vazias (0 resultados):** `noindex, follow` + mensagem "sem imóveis no momento" + cross-links para bairros vizinhos (NÃO 404, NÃO 302 — URL precisa persistir para quando inventário voltar).

**Caminho para atingir 800+ páginas (ver Fase 13.9):**
- Long-tail pt-BR não-óbvio: +150-250
- Guias editoriais por bairro: +75
- Faixa × tipo: +20
- Pillars + apoio (13.8.5): +48
- Bairro × atributos (garagem/varanda/andar): +100
- **Total projetado: ~920-1020 páginas de qualidade**

---

---


## Fase 13.9 — SEO 2026 Playbook (AI Search, E-E-A-T, Long-tail não-óbvio)

> **Origem:** Agente especialista em SEO imobiliário 2026 (15/04/2026).
> **Meta:** Descobertas além do playbook Zillow: otimização para era AI Overviews + E-E-A-T YMYL + long-tail pt-BR que os grandes portais ignoram.

### 13.9.1 — AI Search Optimization (GEO/AEO) [PRIORIDADE ALTA]

> **Por que agora:** AI Overviews já aparecem em ~47% das SERPs imobiliárias US (Q4/25).
> Zero-click é o novo #1 — citation é o que importa.

**Implementação:**
- [ ] Passagens auto-contidas 40-60 palavras respondendo 1 pergunta específica ("Quanto custa m² em Batel?")
- [x] Tabelas comparativas com dados únicos (BairroMarketStats — commit a5a7dec)
- [x] `/llms.txt` na raiz listando páginas canônicas + dados estruturados (commit dba648b)
- [x] Schema `Dataset` com `variableMeasured` em páginas de bairro (commit a5a7dec)
- [ ] Passagens factuais em cada landing respondendo perguntas específicas
- [ ] Priorizar clareza factual > prosa (AIs extraem sentenças, não parágrafos)

**ROI esperado:** 15-30% do tráfego futuro via citation-driven clicks.

### 13.9.2 — Entity SEO / Wikidata [PRIORIDADE MÉDIA]

> **Por que:** Entidades rankeiam sem backlinks tradicionais + desbloqueiam Knowledge Panel.

**Implementação:**
- [ ] Criar item Wikidata "FYMOOB" com P31 (business), P17 (Brasil), P159 (Curitiba), P856 (site), P2002 (X/IG), P1278 (CNPJ)
- [ ] `sameAs[]` em Organization schema apontando para Wikidata, LinkedIn, IG, FB, GBP, Receita CNPJ
- [ ] Consistência NAP absoluta em 20+ diretórios (ZAP, VivaReal, Apontador, Telelistas, Guiamais, etc.)
- [ ] `/sobre` com fatos entity-like (fundação, CRECI-PR, bairros atendidos, CNPJ público)
- [ ] Publicar co-occurrences "FYMOOB + Curitiba + imóveis" em PR locais

**ROI esperado:** Knowledge Panel em 6-12 meses se sinais consistentes.

### 13.9.3 — E-E-A-T para YMYL Imobiliário [EM ANDAMENTO]

> **Por que:** Real estate = YMYL (Your Money Your Life). Google aplica quality raters guidelines rigorosamente.

**Implementação:**
- [x] CRECI-PR visível no footer (J 9420 imobiliária) + `/sobre` (ambos sócios) + autor de blog — commit b799781
- [x] Schema `RealEstateAgent` por corretor com `hasCredential` (CRECI-PR) — commit 74c9a12
- [x] `/sobre` tem Bruno + Wagner com CRECI pessoal, bio, foto, credenciais
- [x] Schema `Organization` expandido com `founder[]` + CRECI J 9420 da imobiliária
- [x] Schema `AboutPage` ligando tudo via `@graph`
- [x] BlogPosting author agora é `RealEstateAgent` com `@id` vinculado a `/sobre#bruno` (CRECI/PR 24.494)
- [x] AuthorBio: CRECI correto (24.494 pessoal, não J 9420 da empresa) + link para `/sobre#bruno`
- [ ] `Review` + `AggregateRating` schema (importar reviews GBP legalmente)
- [x] RealEstateListing com `reviewedBy` Bruno via `@id` (commit dba648b)
- [ ] "Última atualização" visível nas páginas de listing (data dinâmica)
- [x] Política editorial pública em `/politica-editorial` (commit dba648b)

**ROI esperado:** +20-40% CTR em SERPs competitivas + proteção contra core updates.

### 13.9.4 — Long-tail Programático pt-BR Não-Óbvio [PRIORIDADE ALTA — escala]

> **Descoberto:** grandes portais (ZAP/VivaReal) ignoram esses padrões. Concorrência baixa, intenção alta.

**URLs a adicionar (volume estimado Curitiba):**

| Padrão | Exemplos | Concorrência |
|---|---|---|
| `/imoveis/perto-de-[poi]` | metro, hospital, shopping, universidade, parque Barigui | baixa |
| `/imoveis/aceita-pet` + `/[bairro]/aceita-pet` | filter por caracteristicas Loft | baixa (em crescimento 2024-26) |
| `/imoveis/minha-casa-minha-vida-curitiba` | MCMV por faixa/bairro | média |
| `/apartamentos-pronto-para-morar-[bairro]` | Status construcao | baixa |
| `/imoveis/ate-[valor]-com-[N]-quartos-[bairro]` | combinação rara | baixa (CPC alto) |
| `/imoveis/mobiliados-[bairro]` | nicho aluguel | baixa |
| `/imoveis/planta-[empreendimento]` | busca por empreendimento específico | baixa |
| `/imoveis/[bairro]/garagem-coberta` | + varanda-gourmet, andar-alto, varanda | baixa |

**Target total:** +150-250 novas URLs programáticas.
**Query alvo:** "apartamento pet Batel", "MCMV Curitiba", "apartamento mobiliado Centro", "apartamento com varanda gourmet Água Verde".

### 13.9.5 — Image SEO Avançado [PRIORIDADE MÉDIA]

**Implementação:**
- [ ] Filename: `apartamento-3-quartos-batel-curitiba-sala.jpg` (não `IMG_1234`)
- [ ] Schema `ImageObject` com `contentUrl`, `caption`, `geo`
- [ ] Preservar EXIF GPS quando legal (geo-tagging fotos dos imóveis)
- [ ] Alt descritivo cena+contexto (não keyword stuffing)
- [ ] AVIF com fallback WebP
- [ ] Sitemap dedicado `sitemap-images.xml`
- [ ] Tour 360/vídeo schema `VideoObject` quando disponível

**ROI:** Image Pack em ~30% das queries "imóvel [bairro]".

### 13.9.6 — Core Web Vitals INP Focus [EM ANDAMENTO — Fase 11 continua]

**Thresholds 2026:** LCP <2.5s, INP <200ms (ideal <150ms), CLS <0.1.
**Diferencial competitivo:** Razzi/JBA estão em 400ms+ INP.

**Técnicas específicas listagem:**
- [ ] `fetchpriority=high` no LCP hero
- [ ] `content-visibility: auto` em cards abaixo do fold
- [ ] Debounce de filtros 150ms + `startTransition`
- [ ] Responsive images com `sizes` preciso
- [ ] Evitar hydration de cards (Server Components puros)
- [ ] INP killer: remover handlers síncronos em filtros → URL state + RSC

### 13.9.7 — Local SEO Checklist [PRIORIDADE ALTA]

**GBP (Google Business Profile):**
- [ ] Categoria primária "Imobiliária" + secundárias ("Corretor", "Administradora aluguel")
- [ ] Posts 2x/semana linkando bairros diferentes
- [ ] Q&A preenchido proativamente
- [ ] Produtos = imóveis destaque
- [ ] Meta de reviews: 2-4/semana, responder 100% em <24h, citar bairro na resposta

**Citations BR (NAP consistente):**
ZAP, VivaReal, Chaves na Mão, OLX, Imovelweb, QuintoAndar, Apontador, Guia Mais, Telelistas, Econodata, Yelp BR, Foursquare.

**Local pack:**
- [ ] Embed mapa GBP na home + `/contato`
- [ ] Geo schema com lat/long exata
- [ ] Review velocity sustentada

**ROI:** Top 3 Local Pack "imobiliária [bairro]" em 4-6 meses.

### 13.9.8 — Conteúdo Editorial que Rankeia em 2026

**Formatos de alto crescimento pt-BR:**
- [ ] `[Bairro A] vs [Bairro B]: onde morar em Curitiba` (comparativos)
- [ ] `Os N melhores bairros de Curitiba para [famílias/solteiros/aposentados/pets]`
- [ ] `Quanto custa morar em [bairro]` (IPTU, condomínio médio, mercado)
- [ ] `Vale a pena investir em [bairro]` (com dados proprietários)
- [ ] Data journalism: "Relatório FYMOOB Q[N] 2026" (ver 13.8.4)

### 13.9.9 — Backlinks Orgânicos BR [PRIORIDADE MÉDIA]

- [ ] Data journalism: release trimestral preço/m² → Gazeta do Povo, Bem Paraná, Tribuna PR
- [ ] HARO/Conector/SourceBottle BR: respostas do Bruno como corretor citado
- [ ] Guest post: Casa e Jardim, Nubank, Quero Investir
- [ ] Parcerias locais: arquitetos, mudanças, decoradoras (link recíproco)
- [ ] Listagem moradia estudantil PUCPR/UFPR

**ROI:** 3-5 backlinks DR60+ em 6 meses via data journalism.

### 13.9.10 — Keywords pt-BR Baixa Concorrência/Alta Intenção

**Padrões que ZAP/VivaReal ignoram:**
- `financiamento caixa apartamento [bairro]`
- `imóveis FGTS Curitiba`
- `apartamento MCMV [bairro]`
- `imóvel escriturado [bairro]`
- `imóvel sem entrada Curitiba`

**Vantagem FYMOOB:** ZAP/VivaReal não fazem guias de bairro profundos + E-E-A-T de corretor nomeado.

---

---


## Fase 13.10 — Indexação Agressiva (Pós-Deploy)

> **Origem:** Agente especialista em indexação Google 2026 (15/04/2026).
> **Meta:** 70-80% das ~670 páginas indexadas em 3-4 semanas (vs 2-3 meses do padrão).

### 13.10.1 — Descartar (NÃO fazer)

- ❌ **Google Indexing API para real estate** — restrita a `JobPosting` e `BroadcastEvent`. Usar fora disso = BAN manual garantido.
- ❌ **IndexMeNow, Omega, RapidURLIndexer** — PBN-based ou uso não-autorizado da Indexing API. Risco alto.
- ❌ **PubSubHubbub/WebSub** — morto para Google desde 2017.
- ❌ **`<priority>` e `<changefreq>`** no sitemap — ignorados pelo Google desde 2017.
- ❌ Indexar página `JobPosting` fake para listings — BAN garantido.

### 13.10.2 — Implementar (Day 0 do deploy)

**IndexNow (Bing/Yandex):** [IMPLEMENTADO — commit dba648b]
- [x] Gerar key `.txt` em `/public/[key].txt`
- [x] `src/lib/indexnow.ts`: função `submitToIndexNow()` + `submitUrl()`
- [x] Endpoint `POST /api/indexnow` protegido por `INDEXNOW_SECRET`
- [ ] Adicionar env var `INDEXNOW_SECRET` no Vercel (pós-deploy)
- [ ] Hook no webhook Vercel em cada deploy (pós-deploy)
- [ ] Primeiro ping manual das top 50 URLs após go-live
- Custo zero, cobre 30%+ do tráfego global (Google ainda testando IndexNow)

**Sitemap segmentado:** [IMPLEMENTADO — commit dba648b]
- [x] `/sitemap/0.xml` (~231 imóveis individuais)
- [x] `/sitemap/1.xml` (bairros + combinações tipo/finalidade/quartos/preço)
- [x] `/sitemap/2.xml` (blog + guias + pillars)
- [x] `/sitemap/3.xml` (estático + institucional + empreendimentos)
- [x] `/sitemap.xml` = index automático via `generateSitemaps`
- [x] `<lastmod>` preciso por URL (confirmado por John Mueller, 2024)

**GSC + GA4 + Bing Webmaster Tools:**
- [ ] Propriedades criadas e verificadas ANTES do deploy
- [ ] Submit imediato do sitemap index
- [ ] URL Inspection manual nas 50 URLs prioritárias (home, top 10 bairros, top 20 imóveis, 4 landings tipo)

**Google Business Profile:**
- [ ] Perfil "FYMOOB Imóveis Curitiba" verificado antes do deploy
- [ ] NAP idêntico ao site

### 13.10.3 — Semana 1-4 (automação pós-deploy)

**URL Inspection API automatizada:**
- [ ] Script Node diário submetendo 2.000 URLs/dia (limite oficial)
- [ ] Priorização: home > bairros top 10 > tipo+finalidade > imóveis ativos > blog > long-tail
- [ ] Libs: `google-search-console-indexing` (Python) ou `gsc-indexing-cli`
- [ ] Rate limit: 600 requests/minuto

**Publicação em ondas (não 670 de uma vez — evitar flag de spam):**
- [ ] **Day 0:** 200 páginas core (home, bairros, imóveis, tipos principais)
- [ ] **Day 7:** +250 páginas (bairro+tipo, bairro+quartos, bairro+finalidade)
- [ ] **Day 14:** +220 páginas (long-tail, blog, guias, calculadoras)

**TagParrot (OPCIONAL — só com budget aprovado):**
- Serviço pago de terceiros (~$20/mês) que automatiza URL Inspection API em rotação
- **NÃO necessário** — script próprio + submit manual cobrem 90% do valor
- Listar aqui apenas para referência caso precise escalar no futuro com aprovação do Bruno

### 13.10.4 — Backlinks de Discovery Rápida

Não para ranking, apenas para acelerar crawl:
- [ ] **Reddit** r/Curitiba, r/brasil — crawl quase imediato
- [ ] **Medium** — 2-3 artigos linkando hubs
- [ ] **LinkedIn Pulse** — artigos do Bruno linkando bairros
- [ ] **Quora Brasil** — respostas genuínas sobre Curitiba imobiliário
- [ ] **Apontador, Telelistas, Guiamais** — citations locais

### 13.10.5 — Arquitetura Interna para Crawl Budget

- [ ] Home linka direto para top 20 bairros + 4 tipos (apartamentos/casas/sobrados/terrenos)
- [ ] Breadcrumb depth máximo 3: `Home > Bairro > Imóvel`
- [ ] Hub pages `/imoveis/[bairro]` linkam 20+ imóveis + bairros vizinhos + tipos filtrados
- [ ] Related listings em cada imóvel (4-8 similares) — crawl lateral
- [ ] Evitar footer com 500+ links (flag de spam)

### 13.10.6 — Monitoramento Contínuo

- [ ] **GSC Coverage Report** — semanal (categorias Indexed/Discovered/Crawled)
- [ ] `site:fymoob.com` — diário, contar resultados
- [ ] **Screaming Frog** (500 URLs grátis) — crawl semanal vs sitemap
- [ ] **Sitebulb ou Ahrefs Site Audit** — mensal
- [ ] **Log files Vercel** — hits do Googlebot por URL

### 13.10.7 — Timeline Realista

| Período | Meta | Tática principal |
|---|---|---|
| Day 0 | 0% (deploy) | Sitemap submit + IndexNow + GBP + 50 URLs manuais |
| Semana 1 | ~30% indexado | URL Inspection API + Reddit/LinkedIn/Medium |
| Semana 3-4 | **70-80% indexado** | Ondas 2-3 + backlinks locais |
| Semana 6-8 | 90%+ indexado | Manutenção + data journalism |

**Benchmark:** clientes Jetimob (500-2k páginas) batem 75% em 21 dias com execução similar. Sem Indexing API não dá pra garantir 80% em 2 semanas, mas **4 semanas é factível**.

---

---


## Fase 13.12 — Redesign Pagina /anuncie (UX + Conversao)

> **Origem:** usuario apontou que dropdown "Assunto" tinha opcoes erradas
> + sem acentos + form generico sem coletar dados do imovel (16/04/2026).
> **Pesquisa:** melhores praticas 2026 (Unicorn Platform, Landingi, NN/G).

### 13.12.A — Fase A: Correcoes criticas [CONCLUIDA]

- [x] Parametrizar `ContactForm` com prop `interesseOptions` (opcoes customizaveis)
- [x] Parametrizar `ContactForm` com prop `interesseLabel`
- [x] Fix acentos nas opcoes default (imóvel, Dúvida, etc.)
- [x] `/anuncie` usa opcoes especificas: Vender, Alugar, Avaliar, Dúvida
- [x] Label customizado no /anuncie: "O que você deseja?"

### 13.12.B — Fase B: Wizard multi-step [PENDENTE — maior ROI conversao]

> **Por que:** pesquisa 2026 mostra que wizard + staged disclosure
> aumenta completion rate vs form longo. Bruno tambem recebe lead mais
> qualificado (sabe tipo + bairro + faixa de preco do imovel).

**Step 1 — O que voce quer fazer?** (segmentacao owner/tenant)
- 2 cards grandes clicaveis:
  - "📍 Vender meu imovel" -> avaliacao + fotos + publicacao
  - "🔑 Alugar meu imovel" -> inquilino qualificado + contrato

**Step 2 — Sobre o imovel**
- Tipo (chips clicaveis: Apartamento, Casa, Sobrado, Terreno, Comercial, Kitnet)
- Bairro (autocomplete com os 75 bairros do Loft)
- Faixa de preco estimada (slider)
- Tamanho aproximado em m² (input numerico)

**Step 3 — Seus dados**
- Nome, email, telefone (com mascara ja implementada)
- Melhor horario pra contato (chips: manha, tarde, noite, qualquer)

**Step 4 — Confirmacao e envio**
- Resumo dos dados preenchidos
- Consent LGPD obrigatorio (ja existe)
- Turnstile (ja existe)
- Botao "Solicitar avaliação gratuita"

**Componentes a criar:**
- `src/components/anuncie/AnuncieWizard.tsx` (container)
- `src/components/anuncie/steps/Step1Finalidade.tsx`
- `src/components/anuncie/steps/Step2Imovel.tsx`
- `src/components/anuncie/steps/Step3Contato.tsx`
- `src/components/anuncie/steps/Step4Confirmar.tsx`
- `src/components/anuncie/ProgressBar.tsx`

**Backend:**
- [ ] Expandir `/api/lead` payload: aceitar campos de imovel (tipo, bairro, faixa, area)
- [ ] Extender mensagem enviada ao Loft com dados estruturados
- [ ] Validacao server-side dos campos novos

**UX:**
- [ ] Progress bar no topo (1 de 4, 2 de 4...)
- [ ] Animacao slide entre steps (CSS transform)
- [ ] "Voltar" entre steps sem perder dados
- [ ] State no URL (?step=2) pra compartilhar/voltar
- [ ] Confirmacao visual ao completar (check animado)

**Estimativa:** 1-2h implementacao + 30min refino.
**ROI esperado:** +30-50% completion rate vs form atual (dado medio de wizards).

### 13.12.C — Fase C: Polish e conversao [PENDENTE]

- [ ] **Sticky CTA** no mobile ("Anuncie agora →") no topo da pagina
- [ ] **Hero com form lateral** no desktop (form visivel desde o primeiro pixel)
- [ ] **Trust block reforcado**: fotos de Bruno/Wagner + CRECI + anos no mercado + portfolio ativo
- [ ] **Video curto do Bruno** explicando processo (opcional, requer gravacao)
- [ ] **Depoimentos reais**: pedir pro Bruno 2-3 clientes vendedores pra citacao
- [ ] **Calculadora de avaliacao estimada** baseada em `BairroMarketStats` (precoM2Medio)
- [ ] **Tempo medio de venda/locacao** na FYMOOB (requer V3 snapshots de vendas)
- [ ] **Badge "VERIFICADO FYMOOB"** no processo — sinal de confianca

**Fontes da pesquisa (16/04/2026):**
- Unicorn Platform 2026: minimize form length + staged approach + audience segmentation
- Landingi 2026: trust signals + clear CTAs + mobile-first
- NN/G: progressive disclosure classic pattern = wizard
- Propphy 2026: visual content + CWV <3s + responsive

---

---


## Fase 13.13 — Estratégia de Armazenamento de Imagens [DECISÃO — 16/04/2026]

> **Pergunta:** qual serviço usar para armazenar imagens que não vêm da API Loft
> (bairros, team, sobre, hero, blog)?
> **Resposta:** dois momentos distintos.

### 13.13.A — Para lançamento (AGORA) — `public/` + Vercel CDN [ATUAL, NÃO MUDAR]

**Decisão:** manter todas as imagens estáticas em `public/images/` versionadas no Git.

**Estado atual (16/04/2026):**
- 70 imagens, 19 MB total
- Bairros: 12 JPGs em `/public/images/bairros/`
- Team: `bruno.jpeg`, `wagner.jpeg` em `/public/images/team/`
- Hero home: `hero-home.webp` (261 KB) + `hero-home-mobile.webp` (46 KB) + fallback `.jpg`
- Sobre: `sobre-maior.jpeg` + `sobre-dreams.jpg`
- Blog: `/public/images/blog/`
- Empreendimentos (custom assets editoriais): `/public/images/empreendimentos/`

**Por que NÃO migrar agora:**
- Volume pequeno — 19 MB é irrelevante pra Git + Vercel
- Imagens são **estáticas** (bairros, team, hero mudam 1-2 vezes/ano)
- Vercel CDN tem 40+ edge POPs globais — latência baixa
- Next.js `<Image />` já converte pra AVIF/WebP + responsive sizes automático
- Zero setup, zero custo, zero risco
- Imagens versionadas junto com código = rollback trivial

**Quando este plano quebra:** volume > 500 MB OU upload via painel admin.

### 13.13.B — Para admin editor (FASE 9.2) — Supabase Storage [A CONFIGURAR]

**Decisão:** quando Bruno puder fazer upload de imagens (blog, empreendimentos) via painel admin, usar **Supabase Storage**.

**Por quê Supabase:**
- Já temos projeto Supabase ativo (env vars configuradas)
- Free tier (1 GB storage + 2 GB bandwidth) cobre escopo de Bruno
- Mesma auth da sessão NextAuth do painel admin
- Policies de RLS protegem upload/delete (só admin)
- Bruno vê tudo no mesmo dashboard do Supabase

**Buckets a criar (quando Fase 9.2 começar):**
| Bucket | Uso | Visibilidade |
|---|---|---|
| `blog-covers` | Capas de artigos do blog | Public read, admin write |
| `blog-inline` | Imagens dentro de artigos (editor MDX) | Public read, admin write |
| `empreendimentos` | Fotos custom de empreendimentos premium (editorial) | Public read, admin write |

**Policies RLS sugeridas:**
- SELECT: qualquer um (site publico exibe)
- INSERT/UPDATE/DELETE: apenas usuarios autenticados com email em `ALLOWED_ADMIN_EMAILS`

### 13.13.C — Imagens que NUNCA saem do `public/`

Mesmo quando admin for ativado, estas imagens ficam no Git eternamente (fazem parte do "template" visual do site):

- Logo, favicon, ícones (`/public/logo.png`, `/icon.svg`)
- Bairro images (raramente mudam, editorial)
- Hero home (design-driven, atualiza no deploy)
- Sobre hero (design-driven)
- Team photos (2 fotos, Bruno pede pra mudar 1-2x/ano)
- Placeholder/fallback images

### 13.13.D — Alternativas consideradas e descartadas

| Serviço | Free tier | Por que descartado |
|---|---|---|
| **Cloudinary** | 25 GB + 25 GB BW | Overkill pra 19 MB; Next.js Image ja faz AVIF/WebP/resize |
| **Vercel Blob** | 1 GB | Paga desde dia 1 ($0.015/GB); redundante com Supabase |
| **Cloudflare R2** | 10 GB, egress grátis | API S3 complexa pro beneficio; sem optimization |
| **AWS S3 + CloudFront** | 5 GB + 50 GB BW | Overkill pra escala FYMOOB; setup complexo |
| **Nhost Storage** | (descontinuado) | Substituido por Supabase (14/04/2026) |

### 13.13.E — Benchmarks (futuro)

Monitorar após 6 meses de produção:
- Tamanho total de `/public/images/` (alerta se > 200 MB)
- Bandwidth Vercel dashboard (Hobby tem limite ~100 GB/mês)
- Upload volume no Supabase Storage (se admin ativo)

Se bairro images ganharem 100 novas entradas (ex: expansao pra outras cidades), migrar apenas bairros pra Supabase Storage + seed via script.

---
