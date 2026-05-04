# Fase 19 — SEO Competitive Action Plan

> P0/P1/P2 + Sessao Q + Re-Index + Reserva Barigui A/B/B'. PRIORITARIO.
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.

---

### Pendente de padronizacao (Titulos de imovel)
> Bruno pediu para primeiro mostrar cru, depois alinhar um padrao. Quando ele confirmar o formato desejado, aplicar em `mapRawToProperty` (src/services/loft.ts:310) ou via funcao de sanitizacao dedicada.

- [ ] **Opcao A — Title Case automatico**: "LINDO SOBRADO" → "Lindo Sobrado" (respeitando preposicoes: `de`, `da`, `do`, `com`, `em`, etc)
- [ ] **Opcao B — Limite de caracteres**: truncar em 120 chars com "..." elegante preservando palavras inteiras
- [ ] **Opcao C — Sanitizacao light**: remover ALL CAPS gratuito, "!!!" repetido, espacos duplos, caracteres especiais anomalos
- [ ] **Opcao D — Dois campos no CRM**: padrao "Nome comercial" (curto, ex: "Casa Milano") + "Resumo" (longo) — exige Bruno preencher 2 campos mas da melhor estrutura de SEO
- [ ] **Opcao E — Correcao ortografica automatica** (risco medio): detectar palavras com erro obvio (ex: "terrreno" 3 Rs) e corrigir — precisa lista de palavras comuns do setor imobiliario

Recomendacao minha: aplicar C + B primeiro (baixo risco, ganho visual imediato), A depois (medio risco, pode quebrar nomes proprios tipo "Cabrall Hills"), D so quando Bruno aceitar mudar processo de cadastro.


---


## Fase 19 — SEO Competitive Action Plan [PRIORITARIO — 30/04/2026]

> **Origem:** análise competitiva detalhada salva em
> [docs/seo/competitor-analysis-curitiba-2026-04-30.md](seo/competitor-analysis-curitiba-2026-04-30.md).
>
> **Contexto:** Bruno reportou que ao buscar "apartamentos curitiba" no Google
> a FYMOOB nao aparece no top 10. Analise dos 7 sites no SERP revelou:
> - **MySide** = best in class (8 schemas, FAQ, 3001 palavras, 26 H2)
> - **Marketplaces** (Viva Real, ZAP, Imovelweb) = inalcancaveis curto prazo
> - **3 imobiliarias regionais** (Apolar, JBA, Isidorio, Razzi) = SEO TECNICO
>   QUEBRADO (SPA sem SSR, 404 em URLs tipadas, H1="Carregando...", canonical
>   HTTP). **Oportunidade direta de ultrapassar.**
>
> **Estrategia central:** nao tentar bater marketplaces de cara. Bater
> regionais primeiro com SEO tecnico bem feito + cauda longa (bairro+tipo,
> empreendimento) e construir autoridade ao longo de 6-12 meses.

### Fase 19.P0 — Critico, essa semana [✅ CONCLUIDA 30/04/2026]

> **Estimativa total:** ~10h dev | **ROI esperado:** alto
> **Impacto SERP:** cauda longa top 3 em 30-60 dias | cauda media top 10 em 60-90 dias
>
> **Status final:** P0.1 a P0.5 implementados em 4 landings (apartamentos,
> casas, sobrados, terrenos). Commit unico consolidado.

- [x] **19.1** FAQPage schema na landing `/apartamentos-curitiba` com 6-8 Q&A ricas
  - Q1: Como e morar em Curitiba? (~600 chars: BRT, areas verdes, infraestrutura)
  - Q2: Quanto custa em media um apartamento em Curitiba? (R$ 190 mil compactos -> R$ 30 mi luxo)
  - Q3: Qual o valor do metro quadrado? **Citar Indice FipeZAP atualizado** (mar/2026: ~R$ 11.621/m²)
  - Q4: Quais os melhores bairros de Curitiba? (lista 15: Batel, Bigorrilho, Agua Verde, Ecoville, Centro, etc)
  - Q5: Quais bairros valem a pena pra investir? (perfil ROI por bairro)
  - Q6: Vale a pena comprar apartamento na planta? (riscos + vantagens)
  - Q7: Como funciona o financiamento Caixa em Curitiba? (entrada, prazo, taxas)
  - Q8: Quanto tempo demora pra fechar uma compra? (semanas/etapas)
  - Cada answer 200-400 chars com dados externos (FipeZAP, IBGE, Caixa)
  - Schema FAQPage + Question + Answer no JSON-LD da pagina
  - Gap CRITICO: MySide tem isso, FYMOOB nao. Single biggest SEO lever.
  - Estimativa: 2h dev

- [x] **19.2** Schema `Apartment` individual em cada card da listagem
  - Hoje so `ItemList` (lista de itens). Cada item precisa ter `@type: Apartment` (ou `RealEstateListing`)
  - Campos: name, description, url, image, numberOfRooms, numberOfBathroomsTotal, floorSize (m²), address (PostalAddress), offers (Offer com price, priceCurrency BRL)
  - Implementar em `src/lib/seo.ts` -> `generateItemListSchema` adicionando `item: { @type: Apartment, ... }`
  - Aplicar em `/apartamentos-curitiba`, `/casas-curitiba`, `/sobrados-curitiba`, `/terrenos-curitiba`, `/imoveis/[bairro]`, `/imoveis/[bairro]/[tipo]`
  - Eligibilidade pra rich result no Google
  - Estimativa: 3h dev

- [x] **19.3** H1 com numero especifico em todas landings tipadas
  - Atual: `Apartamentos a Venda e Aluguel em Curitiba`
  - Trocar pra: `120 Apartamentos a Venda e Aluguel em Curitiba` OU `Apartamentos em 18 Bairros de Curitiba`
  - Numero estavel (count + plural correto). Usar count de bairros se total flutuar muito
  - Aplicar em apartamentos-curitiba, casas-curitiba, sobrados-curitiba, terrenos-curitiba
  - Bonus CTR +5-10% (numeros aumentam CTR em snippets)
  - Estimativa: 30min dev

- [x] **19.4** Bloco textual SEO 800-1200 palavras antes do FAQ
  - Posicao: depois das listagens, antes de FAQ + Related
  - Estrutura:
    - H2 "Conhecca o mercado de apartamentos em Curitiba" (~150 palavras: panorama, FipeZAP, valorizacao)
    - H3 "Bairros mais valorizados" (~150 palavras + links pra `/imoveis/[bairro]`)
    - H3 "Como escolher seu apartamento em Curitiba" (~200 palavras: m²/preco, infra, escola, transporte)
    - H3 "Por que comprar com a FYMOOB" (~200 palavras: CRECI J 9420, atendimento, anos de mercado)
  - Reusable: pode aproveitar texto do `/morar-em-curitiba` pillar como base
  - Word count ALVO: FYMOOB hoje 1489 (mas titles cards) -> pos-fix 2500+ (textual real)
  - Estimativa: 4h dev (escrita + montagem componente)

- [x] **19.5** Aumentar bairros internos linkados de 6 -> 15 na landing apartamentos

#### Gaps adicionais detectados em audit pos-P0 (30/04/2026)

Audit completo de 13 paginas revelou 5 paginas criticas SEM FAQ schema:

- [x] **19.6** FAQPage rica em **3 pillars** (priority 0.9 no sitemap)
  - `/comprar-imovel-curitiba`: 8 Q&A sobre processo de compra (ITBI, financiamento, FGTS, docs, valorização)
  - `/morar-em-curitiba`: 6 Q&A sobre vida em Curitiba (clima, transporte, escolas, custo de vida)
  - `/alugar-curitiba`: 6 Q&A sobre aluguel (garantias, IPTU, pets, rescisão)
  - Funcao `generatePillarFAQ(pillar)` em `src/lib/seo.ts` + DynamicFAQ component

- [x] **19.7** FAQ generica em `/imovel/[slug]` (250+ paginas individuais)
  - 5-7 Q&A adaptadas por finalidade (venda vs aluguel) e tipo (apartamento/casa/sobrado/terreno)
  - Topicos: agendar visita, documentos, financiamento, garantias (aluguel), proposta, bairro
  - Funcao `generatePropertyDetailFAQ(property)` em `src/lib/seo.ts`
  - Maior alavanca quantitativa — multiplica FAQ ricas por todo o catalogo

- [x] **19.8** FAQ rica em `/lancamentos`
  - 6 Q&A sobre comprar na planta (Lei 13.786/2018 atrasos, construtoras, financiamento, valorizacao)
  - Funcao `generateLancamentosFAQ(total)` em `src/lib/seo.ts`

#### Gaps adicionais detectados em audit completo (30/04/2026 — pos P0.6/7/8)

Apos rodada P0.6/7/8 fizemos audit COMPLETO de 27 paginas publicas. Achamos
mais 5 paginas/itens com gaps:

- [x] **19.9** FAQ rica em `/` (home — priority 1.0 sitemap)
  - 8 Q&A genericas sobre FYMOOB, atendimento, comissao, bairros, lancamentos, aluguel
  - Funcao `generateHomeFAQ()` em `src/lib/seo.ts`
  - Maior alavanca pra queries genericas (fymoob, imobiliaria curitiba)

- [x] **19.10** FAQ rica em `/anuncie` (captacao de proprietarios)
  - 7 Q&A sobre processo, comissao venda 6%, comissao aluguel 1 mes + admin 6-10%, fotos profissionais, prazo, exclusividade
  - Funcao `generateAnuncieFAQ()` em `src/lib/seo.ts`

- [x] **19.11** FAQ rica em `/empreendimentos` (listing)
  - 6 Q&A sobre empreendimentos disponiveis, construtoras Curitiba, planta vs pronto, financiamento, bairros premium
  - Funcao `generateEmpreendimentosListingFAQ(total)` em `src/lib/seo.ts`

- [x] **19.12** og:image + twitter card especificos em 3 pillars
  - `/comprar-imovel-curitiba`, `/morar-em-curitiba`, `/alugar-curitiba`
  - Antes faltavam og:image, locale, siteName e twitter:card
  - Reusa /opengraph-image global ate criar imagens dedicadas

- [x] **19.13** Bloco SEO ~600 palavras em `/blog` (listing) e `/busca`
  - `/blog` antes tinha 45 palavras (thin content). Adicionado bloco editorial sobre
    o blog FYMOOB, fontes externas (FipeZAP, IBGE, Caixa, Lei 8.245/91), autores e
    cross-links pros 3 pillars
  - `/busca` antes tinha 38 palavras. Adicionado bloco "Como buscar imoveis em
    Curitiba" com cross-links pra 4 landings tipadas + 5 faixas de preco + 10 bairros principais

#### Sprint 19.P1 — entregas adicionais e backlog

- [x] **19.P1.1** Pillar `/comprar-apartamento-curitiba` (4403 palavras, 12 secoes, 40+ subsecoes) — concluido 30/04 (commit b559c89)
  - MDX denso citando FipeZAP mar/2026, 20 bairros analisados, 10 construtoras
    Curitiba, financiamento 5 bancos, ITBI 3%, documentacao completa
  - generateComprarApartamentoFAQ() com 10 Q&A especializadas
  - Sitemap shard 2 priority 0.9
  - Internal links de /apartamentos-curitiba (LandingSEOContent card destaque) e /comprar-imovel-curitiba (relatedLinks topo)
  - Estimativa: top 5 query "comprar apartamento curitiba" em 4-8 meses

- [x] **19.14** FAQ generica em `/blog/[slug]` (15 posts atuais sem FAQ schema)
  - **Resolvido em Sessao C (Fase 19.P2.C.3):** abordagem por
    frontmatter MDX (`faq[]` em `BlogFrontmatter`) renderizada pelo
    DynamicFAQ + FAQPage schema. 15/15 posts cobertos com Q&A
    especificas por tema (5-7 cada).

- [ ] **19.15** OG images dedicadas pra cada pillar (substituir /opengraph-image global)
  - Gerar 3 imagens 1200x630 com tema do pillar (comprar/morar/alugar)
  - Salvar em /public/og/ e referenciar no metadata

### Fase 19.P2 — Coverage SEO 588 paginas [PRIORITARIO — 30/04/2026]

> **Origem:** audit completo de 588 paginas reais via
> `scripts/seo-gaps-audit.py --all` revelou que **95% das paginas tem
> pelo menos 1 gap critico**. Documentado em
> [docs/seo-reports/2026-04-30-page-gaps-audit.md](seo-reports/2026-04-30-page-gaps-audit.md)
> e [docs/seo-reports/2026-04-30-research-strategy.md](seo-reports/2026-04-30-research-strategy.md).
>
> **Numeros chave:**
> - 248 imoveis com title medio de **94 chars** (Google trunca em 65) +
>   description medio de **100 chars** (curta demais)
> - 110 empreendimentos com **thin content** (media 288 palavras, Google
>   penaliza <500)
> - 109 bairro+tipo combos com **description < 130 chars** (curta demais)
> - 36 bairros **sem numero no title**
> - 15 blog posts **sem FAQ schema** + 14 com title > 65 chars
> - 10 guias com title > 65 chars
>
> **Meta:** subir CTR de 2.81% (atual GSC) pra 4.5%+ em 30 dias = +255-625
> cliques/mes (vs atuais ~270/mes).
>
> **Esforco total:** 37-44h dev (Vinicius) + 4-5h Bruno (aplicar titulos CRM).

#### Sessao A — Fixes via funcoes centralizadas [3-4h, +100-240 cliques/mes]

> **Maior ROI por hora.** 1 commit em `src/lib/seo.ts` afeta **~420 paginas**
> instantaneamente. Risco baixo (funcoes existentes, so reescrever output).

- [ ] **19.P2.A.1** `generateLandingTitle` adicionar contagem de imoveis pra bairros
  - **Arquivo:** `src/lib/seo.ts:245`
  - **Atual:** `function generateLandingTitle(tipo?, bairro?)` — pra bairro
    retorna `Imóveis no {bairro}, Curitiba`
  - **Novo:** aceitar `count?: number` opcional, retornar
    `${count} Imóveis no ${bairro} Curitiba 2026: Apartamentos e Casas` se
    count for fornecido
  - **Callers a atualizar:**
    - `src/app/imoveis/[bairro]/page.tsx` — passar `properties.length` ou
      `bairro.total` como count
  - **Validacao:** title final 50-65 chars (verificar nos top 5 bairros maiores)
  - **Impact:** 36 paginas, +15-30 cliques/mes

- [ ] **19.P2.A.2** `generateLandingDescription` expandir pra 140-160 chars (bairro+tipo + faixas preco + tipo_landing/finalidade)
  - **Arquivo:** `src/lib/seo.ts:266`
  - **Problema:** funcao retorna ~100 chars pra essas combinacoes (107 paginas
    bairro+tipo + 5 faixas preco + 12 tipo_landing/finalidade afetadas)
  - **Padrao novo (140-160 chars):**
    - Bairro+tipo: `Encontre {N} {tipo} no {bairro}, Curitiba. Preços de R$ X a R$ Y. Filtros por quartos, área, valor. FYMOOB CRECI J 9420.`
    - Faixa preco: `{N} imóveis em Curitiba até R$ X. Apartamentos, casas e sobrados em todos os bairros. Filtros por tipo, quartos. FYMOOB.`
    - Tipo+finalidade: `{N} {tipo} para {venda|aluguel} em Curitiba. {bairros count}+ bairros, preços de R$ X a R$ Y. FYMOOB Imobiliária.`
  - **Validacao:** description 140-160 chars em todos os casos
  - **Impact:** 126 paginas, +50-100 cliques/mes

- [ ] **19.P2.A.3** `generatePropertyDescription` expandir pra 130-160 chars
  - **Arquivo:** `src/lib/seo.ts` (procurar funcao)
  - **Problema:** 248 imoveis com description media 100 chars
  - **Padrao novo:**
    `{Tipo} {N} quartos {area}m² em {bairro}, Curitiba. {suites?} {vagas?} A partir de R$ {preco}. FYMOOB CRECI J 9420.`
  - **Exemplo:**
    `Apartamento 2 quartos suíte 56m² em Portão, Curitiba. 1 vaga, lazer completo. R$ 380.000. FYMOOB CRECI J 9420.`
  - **Impact:** 248 paginas, +30-100 cliques/mes

- [ ] **19.P2.A.4** Pillar `/comprar-apartamento-curitiba` description encurtar 198→160 chars
  - **Arquivo:** `src/app/comprar-apartamento-curitiba/page.tsx:30` (metadata)
  - **Atual (198 chars):** `Tudo sobre comprar apartamento em Curitiba em 2026: preço médio do m² (FipeZAP), 20 melhores bairros, financiamento Caixa/Itaú/Bradesco, ITBI, documentação, planta vs pronto, valorização e armadilhas. Por especialistas FYMOOB CRECI J 9420.`
  - **Novo (160 chars):** `Comprar apartamento em Curitiba 2026: m² médio FipeZAP, 20 bairros, financiamento Caixa/Itaú, ITBI, planta vs pronto. Por especialistas FYMOOB CRECI J 9420.`

#### Sessao B — Empreendimentos completos [8-10h, +60-180 cliques/mes]

> **Gap mais alarmante:** 109 de 110 empreendimentos com thin content (media
> 288 palavras). Apenas Reserva Barigui + 2-3 outros tem editorial layout.

- [ ] **19.P2.B.1** Component `EmpreendimentoStandardSEOContent`
  - **Novo arquivo:** `src/components/empreendimento/EmpreendimentoStandardSEOContent.tsx`
  - **Padrao similar ao** `src/components/seo/LandingSEOContent.tsx`
  - **Estrutura (800-1200 palavras):**
    - H2 `Sobre o {nome}` (~150 palavras: descricao expandida + bairro + construtora)
    - H3 `Localização` (~150 palavras: regiao + POIs proximos + linkando `/imoveis/[bairro]`)
    - H3 `Tipos de unidades disponíveis` (tabela: tipo, area, quartos, vagas, faixa preco)
    - H3 `Construtora {construtora}` (~150 palavras: historico + outros empreendimentos da construtora)
    - H3 `Por que comprar com a FYMOOB` (~150 palavras: CRECI, atendimento, processo)
  - **Inputs:** `empreendimento`, `properties`, `bairro`, `construtora`

- [ ] **19.P2.B.2** Integrar component no Standard layout do empreendimento
  - **Arquivo:** `src/app/empreendimento/[slug]/page.tsx`
  - **Onde inserir:** apos lista de unidades, antes de FAQ
  - **Renderizar SOMENTE quando `!hasEditorial`** (editorial ja tem conteudo proprio)

- [ ] **19.P2.B.3** Title com numero especifico em todos empreendimentos
  - **Arquivo:** `src/app/empreendimento/[slug]/page.tsx:47` (generateMetadata)
  - **Atual:** `${emp.nome} ${bairro} | Plantas, Preços e Apartamentos${construtora} | FYMOOB`
  - **Novo:** `${emp.nome} ${bairro}: ${total} Apartamentos a Partir de ${precoMin} | FYMOOB`
  - 102 de 110 empreendimentos (93%) sem numero hoje

- [ ] **19.P2.B.4** AggregateOffer schema em empreendimentos
  - **Arquivo:** `src/app/empreendimento/[slug]/page.tsx` schema generation
  - **Adicionar:**
    ```ts
    offers: {
      "@type": "AggregateOffer",
      lowPrice: precoMin,
      highPrice: precoMax,
      priceCurrency: "BRL",
      offerCount: properties.length,
    }
    ```
  - Eligibilidade pra rich snippet com faixa de preco no SERP

#### Sessao C — Blog posts completos [CONCLUIDA 01/05/2026]

> **15 posts** × 3 frentes (title, description, FAQ). Maior ROI desde
> `/blog/financiamento-...` tem 790 imp/mes com so 1 clique.
>
> **Resultado:** todos os 15 posts com FAQ schema (5-7 Q&A cada), 2 titles
> reescritos (como-financiar, documentos), 7 descriptions ajustadas pra
> 130-160 chars. `title.absolute` em `[slug]/page.tsx` evita double-brand
> no template global. DynamicFAQ visual renderiza Q&A em posts com
> `faq[]` no frontmatter (>=2 perguntas), schema FAQPage emitido junto.
>
> Commit: feat(seo): Sessao C — blog posts titles + descriptions + FAQ schema

- [x] **19.P2.C.1** Reescrever 15 titles pra ≤60 chars
  - **Arquivos:** `content/blog/*.mdx` (frontmatter `title`)
  - **Padrao novo (use exemplos como referencia):**
    - Atual: `Financiamento Imobiliário Caixa, Itaú e Bradesco em 2026: Comparativo Completo de Taxas, Prazos | FYMOOB Imobiliária` (121 chars)
    - Novo: `Caixa vs Itaú vs Bradesco: Taxas Reais 2026 [Tabela]` (51 chars)
    - Atual: `Custo de Vida em Curitiba 2026: Guia Completo | FYMOOB Imobiliária` (87 chars)
    - Novo: `Custo de Vida Curitiba 2026: Quanto Custa Morar (R$ Real)` (58 chars)
  - **15 posts a reescrever (todos do `content/blog/*.mdx`):**
    1. checklist-compra-imovel (82 chars)
    2. financiamento-caixa-itau-bradesco-comparativo (91)
    3. custo-de-vida-curitiba (87)
    4. melhores-bairros-curitiba-2026 (88)
    5. itbi-curitiba-valor-como-pagar (80)
    6. mercado-imobiliario-curitiba-2026 (93)
    7. quanto-custa-morar-batel-curitiba (81)
    8. preco-metro-quadrado-curitiba-bairro (63 — borderline OK)
    9. melhores-bairros-familias-curitiba (82)
    10. imovel-planta-vs-pronto-curitiba (85)
    11. apartamento-ou-casa-curitiba (84)
    12. batel-vs-agua-verde-curitiba (89)
    13. ecoville-vs-bigorrilho-curitiba (87)
    14. documentos-comprar-imovel-curitiba (96)
    15. como-financiar-minha-casa-minha-vida (121 — CRITICO)
  - **Aplicado:** 2 titles reescritos (`como-financiar` 86→47 chars,
    `documentos-comprar-imovel-curitiba` 61→43 chars). Demais 13 ja
    estavam abaixo de 60 chars apos enriquecimento de Sessao A.

- [x] **19.P2.C.2** Reescrever 15 descriptions pra 130-160 chars
  - **Padrao:** `{Hook com numero/dado especifico}. {Detalhe extra}. FYMOOB CRECI J 9420.` ou similar
  - **6 posts hoje com descriptions > 165 chars** (truncadas):
    custo-de-vida-curitiba (190), melhores-bairros-familias-curitiba (193),
    imovel-planta-vs-pronto-curitiba (219), apartamento-ou-casa-curitiba (176),
    documentos-comprar-imovel-curitiba (187), melhores-bairros-curitiba-2026 (168)
  - **Aplicado:** 7 descriptions reescritas pra 130-160 chars com hook
    factual + dado especifico (FipeZap, IBGE, INCC, etc). Demais ja
    estavam dentro do range.

- [x] **19.P2.C.3** Adicionar FAQ schema a cada blog post (5-7 Q&A por post)
  - **Opcao 1:** funcao `generateBlogPostFAQ(post)` em `src/lib/seo.ts`
    com Q&A hardcoded por slug (mais controle mas maior carga)
  - **Opcao 2:** adicionar `faq` no frontmatter MDX e renderizar via DynamicFAQ
    (mais flexivel, autor edita direto no MDX)
  - **Recomendado:** Opcao 2
  - **Q&A por post:** 5-7 perguntas relevantes ao tema (ex: financiamento →
    `Quanto preciso de entrada?`, `MCMV serve em Curitiba?`, `Itau ou Caixa?`)
  - **Visivel + schema:** componente `DynamicFAQ` ja gera FAQPage schema
  - **Aplicado:**
    1. `BlogFrontmatter.faq?` adicionado em `src/types/blog.ts`
    2. `src/app/blog/[slug]/page.tsx` le `post.faq` (frontmatter MDX) e
       gera FAQPage schema via `generateFAQPageSchema()`
    3. `DynamicFAQ` renderiza Q&A visiveis (>=2 perguntas)
    4. `title.absolute` `${post.title} | FYMOOB` evita double-brand
    5. `scripts/add-blog-faqs.mjs` (helper batch) atualizou 15/15 posts
       em 1 comando — Q&A redigidas com base em conteudo + dados externos
       citados nos posts (FipeZap, IBGE, NBR, STJ, MCMV abril/2026, etc)

#### Sessao Q — Queries-alvo comerciais top [PRIORITARIO 02-15/05/2026]

> Documento mestre: `docs/seo-reports/2026-05-01-queries-alvo-mapping.md`
> Achado: FYMOOB tem on-page SUPERIOR a concorrentes regionais top 10
> (Casa Prates 0 palavras, JBA 200) mas perde por DR/backlinks/idade.
> Plano: criar paginas faltantes + enriquecer thin content + off-page.

- [ ] **19.P2.Q.1** Criar `/imobiliaria-curitiba` (NOVA, P0, 4-6h)
  - Captura "imobiliaria em curitiba" (2-5k vol/mes). Top 10 SERP DOMINADO
    por concorrentes regionais (JBA, Casa Prates, Habitec, Kondor, Casa
    ao Lado, Tantus, Cibraco). Sem marketplace = espaco real pra entrar.
  - Estrutura: 1500+ palavras, 8 H2 (sobre, why, bairros, tipos, como
    funciona, diferenciais, depoimentos, contato)
  - Schema: `RealEstateAgent` + `LocalBusiness` + `FAQPage` 8 Q&A
  - Cross-link pra todas as landings tipadas + bairros

- [ ] **19.P2.Q.2** Enriquecer paginas de bairro top (P1, 6h total)
  - Aumentar editorial de 500 → 1500 palavras nos 5 bairros com mais
    impressoes GSC: Batel, Bigorrilho, Ecoville, Mossungue, Agua Verde
  - Adicionar tabela "Preço médio por número de quartos" com dados FipeZAP
  - Schema `Place` com geocoordinates do bairro
  - Aplicar em batch via componente `BairroSEOContent` reusavel

- [ ] **19.P2.Q.3** Programmatic landings por numero de quartos (P1, 9-12h)
  - Templates novos: `/apartamentos-2-quartos-curitiba`,
    `/apartamentos-3-quartos-curitiba`, `/apartamentos-1-quarto-curitiba`
  - Conteudo dinamico baseado em stats CRM (media preco, areas, bairros
    mais comuns)
  - 1500+ palavras + 8 FAQ + schemas
  - Capturar "apartamento N quartos curitiba" (1-3k vol/mes cada)

- [ ] **19.P2.Q.4** Programmatic landings por estagio (P1, 6h)
  - `/apartamentos-novos-curitiba` (vs `/lancamentos` que ja existe — slug
    otimizado)
  - `/apartamentos-prontos-curitiba`
  - `/apartamento-na-planta-curitiba`
  - Distinguir conteudo: novos = lancamentos + revenda <2 anos; prontos
    = pos-habite-se; planta = pre-habite-se com cronograma

- [ ] **19.P2.Q.5** [BRUNO] Off-page: backlinks de qualidade (P0)
  - Pedir 1 backlink/mes minimo de:
    - Cartorios de Curitiba (parceria institucional)
    - Construtoras parceiras (link em release de empreendimento)
    - Blogs locais (gazetadopovo.com.br, bemparana.com.br, tribunapr.com.br)
    - Diretorios setoriais (CRECI-PR, Sinduscon-PR)
    - UFPR/PUC-PR (listing imobiliarias parceiras)
  - DR atual fymoob.com.br: ~5-15. Alvo 6m: 25-35

- [ ] **19.P2.Q.6** [BRUNO] Off-page: local citations (P0)
  - Reclamar GMN (desbloqueia 19.16 + sinais locais) — JA TASK
  - Bing Places (5 min)
  - Apple Maps Connect (5 min)
  - Foursquare, Yelp, Paginas Amarelas digital
  - NAP (Name+Address+Phone) consistente em TODAS as plataformas

- [ ] **19.P2.Q.7** [BRUNO] Aumentar catalogo CRM (P1)
  - Hoje: 248 ativos. Concorrentes regionais medios: 500-2000
  - Cada imovel = 1 URL indexavel + sinal de relevancia
  - Meta: +50 imoveis/mes ate atingir 500

#### Sessao Re-Index — Acao manual GSC pos Sessoes A/B/C [01-17/05/2026]

> Tracker vivo em [`docs/seo-reports/reindex-urls-tracker.md`](seo-reports/reindex-urls-tracker.md).
> Submeter no ritmo — GSC retorna `Quota exceeded` explicitamente quando bloqueia
> (nao racionar artificialmente em "X/dia"). Cota varia por site/autoridade.

- [x] **19.P2.RX.0** Re-submeter sitemaps no GSC — feito 01/05 via MCP `mcp__gsc__submit_sitemap`
  - 4 shards `/sitemap/0.xml` a `/sitemap/3.xml` (Next 16 nao gera index `/sitemap.xml`)

- [x] **19.P2.RX.1** Request Indexing: 15 blog posts (Tier 1) — concluido 01-03/05/2026
  - 5 URLs aceitas em 26/04, 9 em 30/04, 10 em 01/05 (Dia 1), 7 em 02/05 (Dia 2), 11 em 03/05 (2a rodada portugues)
  - Inclui as 2 landings comerciais `/apartamentos-curitiba` + `/comprar-apartamento-curitiba`
  - Detalhes no tracker (secao "Historico")

- [ ] **19.P2.RX.1b** Request Indexing: 4 blogs pendentes da 2a rodada (P1 do tracker)
  - `/blog/melhores-bairros-curitiba-2026`, `/blog/batel-vs-agua-verde-curitiba`,
    `/blog/custo-de-vida-curitiba`, `/blog/ecoville-vs-bigorrilho-curitiba`
  - Bateu cota na 12a em 03/05 — submeter assim que possivel

- [ ] **19.P2.RX.2** Request Indexing: 40 empreendimentos top (P2 do tracker)
  - Sessao B aplicou bloco SEO 1000 palavras + AggregateOffer schema
  - Lista completa no tracker

- [ ] **19.P2.RX.3** Request Indexing: 9 landings top (P3 do tracker)
  - Bairros + tipo+finalidade com >5 impressoes (Sessao A enriqueceu descriptions)

- [x] **19.P2.RX.4** Setup IndexNow + batch — feito (commit `130f590`)
  - Key versionada em `public/d7ce36f0...txt`
  - Script `scripts/indexnow-batch.mjs` le 4 shards de prod, dispara em batches de 500
  - **Acao pendente:** rodar `node scripts/indexnow-batch.mjs` apos cada deploy grande

- [ ] **19.P2.RX.5** Verificar deltas em 14 dias (15-17/05/2026)
  - `mcp__gsc__compare_search_periods` periodo pre vs pos
  - Re-rodar `python scripts/seo-gaps-audit.py --all`
  - Comparar com `docs/seo-reports/2026-04-30-page-gaps-audit.md`
  - Targets: paginas indexadas 122→250+, cliques 580→800-1100/mes, CTR blog 0.13%→1.5%+

#### Sessao Reserva Barigui — Sprint A [03/05/2026, ~2h, prioridade query "reserva barigui" → top 10]

> **Origem:** Bruno priorizou query "reserva barigui" pra entrar no top 10 do
> Google (hoje pagina indexada mas zero impressoes em 90 dias no GSC). SERP
> real (DDG/Bing): FYMOOB ja em #3 pra "reserva barigui curitiba" e #1 pra
> "reserva barigui apartamento mossungue", mas fora do top 15 pra "reserva
> barigui avantti". Plano completo de diagnostico no chat — Sprint A foca em
> signals fracos (brand, schema, conteudo) sem mexer em URL/redirect.
>
> **Janela de avaliacao:** 14 dias (15-17/05/2026) via GSC `inspect_url_enhanced`
> + `compare_search_periods`. Targets: 50+ impressoes/mes na URL, posicao top
> 20 pra "reserva barigui" puro.

- [x] **19.RB.A.1** Title condicional com construtora — `src/app/empreendimento/[slug]/page.tsx:50-89`
  - Sem construtora: mantem template Fase 19.P2.B.3 (numero + preco)
  - Com construtora: `{Nome} {Construtora} {Bairro}: {N} Apartamentos | FYMOOB`
  - Captura query "{nome} {construtora}" (ex: "reserva barigui avantti", top Google Ads click #9)
  - Description tambem tem variant com construtora antes do bairro

- [x] **19.RB.A.2** Schema RealEstateListing enriquecido — `src/app/empreendimento/[slug]/page.tsx:172-238`
  - `image[]` array (hero + parallax + 4 fotos CRM) em vez de string unica → carousel rich result
  - `brand: { @type: Organization }` apontando pra construtora → entity link Knowledge Graph
  - `geo: { latitude, longitude }` quando CRM popula → rich snippet com mapa
  - `address.streetAddress` + `postalCode` (CEP) quando CRM tem dado completo

- [x] **19.RB.A.4** Sitemap priority 0.9 pra editorial empreendimentos — JA EXISTIA em `src/app/sitemap.ts:329` (Fase 19.P2.B). Sem mudanca.

- [x] **19.RB.A.5** Alt-text rico nas plantas — `src/components/empreendimento/PlantasCarousel.tsx:48-60` + render torre alt em `[slug]/page.tsx:584`
  - Pattern: `Planta {N} — {torre}, {empreendimento} ({construtora}), {bairro}, Curitiba`
  - Captura "imagens reserva barigui colina" (top Google Ads click #12)
  - **So funciona pra assets locais** (plantas/renders/fachadas em /public). Fotos CRM (CDN Vista) seguem bloqueadas ate Task 10.5 ativar Cloudflare proxy.

- [x] **19.RB.A.6** Bloco textual SEO ampliado — `src/app/empreendimento/[slug]/page.tsx:765-825`
  - Cronograma de entrega por torre (extraido de `assets.torres[].descricao`): "Reserva Lago com entrega em Agosto/26, Reserva Colina com entrega em Julho/27, Reserva Mirante com entrega em Setembro/27"
  - Endereco completo (`R. Clara Vendramin, 445, Mossunguê, Curitiba/PR · CEP 81200-170`) renderiza quando CRM popula
  - Parque Barigui com m² explicito (1,4 milhao de m²) — sinal de profundidade vs competidores
  - Aplica em TODOS empreendimentos editoriais (nao so Reserva Barigui), mas torres/cronograma so renderiza quando assets tem mais de 1 torre

- [ ] **19.RB.A.3** [MANUAL] Request Indexing via GSC pra `/empreendimento/reserva-barigui` (5 min)
  - GSC > URL Inspection > paste `https://fymoob.com.br/empreendimento/reserva-barigui` > Request Indexing
  - Last Crawled atual: 2026-04-17 → forca recrawl com schema novo
  - Tambem solicitar pra `/imoveis/mossungue` (boost de internal link)
  - GSC retorna `Quota exceeded` explicitamente quando bloquear — submeter no ritmo

- [ ] **19.RB.A.7** [VALIDACAO] Smoke test em prod apos deploy
  - Rodar `npm run smoke` (25 rotas, inclui 1 empreendimento real)
  - Conferir manualmente https://fymoob.com.br/empreendimento/reserva-barigui:
    - View source: title contem "Reserva Barigui Avantti Mossunguê: 10 Apartamentos | FYMOOB"
    - View source: JSON-LD `RealEstateListing` tem `brand`, `geo`, `image[]` array
    - Plantas com alt rico (inspect element nos `<img>` do carousel)
    - Bloco SEO renderiza cronograma "Reserva Lago com entrega em Agosto/26..."

- [ ] **19.RB.A.8** [DECISAO] Sprint B (paginas dedicadas das torres) — Avaliar apos 14 dias do Sprint A
  - Se "reserva barigui" entrou no top 20 mas variantes "reserva lago/colina/mirante" continuam zeradas → executar Sprint B
  - Sprint B caminho 2 (CRM-segmentado): reverter 301s em `next.config.ts:114-125` + cadastrar 3 empreendimentos no CRM Loft (acao Bruno) + criar entries editoriais em `empreendimento-assets.ts`
  - Esforco: ~6h dev + acao Bruno
  - **Status 03/05/2026:** caminho 1 (Sprint B abaixo) ja entregue — captura queries por torre via sub-rotas sem precisar do CRM. Caminho 2 fica como follow-up condicional.

#### Sessao Reserva Barigui — Sprint B [03/05/2026, ~5h dev, sem dependencia de CRM]

> **Origem:** apos diagnostico do Sprint A descobriu-se (1) typo "reserva-bairgui"
> no CRM canibalizando ranking, (2) zero imoveis classificados por torre no
> CRM (todos sob "Reserva Barigui"). Sprint B caminho 1 ataca os gaps que
> dao pra resolver dev-only.

- [x] **19.RB.B.X** Canonical do typo `reserva-bairgui` → `reserva-barigui` — `src/app/empreendimento/[slug]/page.tsx:50-69`
  - Mapa `SLUG_TYPO_CANONICAL` resolve no `generateMetadata` + openGraph URL
  - Imovel orfao continua acessivel na URL errada (sem 301 destrutivo)
  - Google consolida ranking na URL correta. Tirar entry quando Wagner renomear no CRM.

- [x] **19.RB.B.V** Schema `RealEstateListing.containsPlace[]` com as 3 torres — `src/app/empreendimento/[slug]/page.tsx:209-222`
  - Helper `getTorreShortSlug()` centralizado em `src/data/empreendimento-assets.ts`
  - Cada torre vira `Place` com `name`, `description`, `url` apontando pra sub-rota /lago | /colina | /mirante
  - Sinaliza pro Google que o hub agrupa 3 entidades distintas (Knowledge Graph)

- [x] **19.RB.B.7** Sub-rotas `/empreendimento/[slug]/[torre]` — `src/app/empreendimento/[slug]/[torre]/page.tsx`
  - **Refatorado em B' (03/05/2026)**: era re-render do hub com title diferente. Agora e LANDING DEDICADA por torre — hero proprio (render da torre), descricao focada, plantas so dela, unidades filtradas por classifyTorreFor.
  - Captura queries top Google Ads sem depender de segmentacao no CRM:
    - "reserva lago" / "reserva barigui lago" → /empreendimento/reserva-barigui/lago (6 unidades)
    - "reserva colina" / "reserva barigui colina" → /colina (3 unidades incluindo o imovel orfao do typo)
    - "reserva mirante" → /mirante (2 unidades comerciais)
  - Canonical aponta pro hub (consolida autoridade). Schema RealEstateListing agora especifico da torre com `isPartOf` apontando pro hub.
  - Sitemap (shard 3) lista as 3 sub-rotas com priority 0.85
  - **classifyTorreFor()** em `src/data/empreendimento-assets.ts` aplica regra heuristica enquanto Wagner nao segmenta no CRM:
    - Comercial (sala/loja) → Mirante
    - 3+ quartos → Colina
    - resto residencial → Lago
  - **Combina dados do typo "Reserva Bairgui"** automaticamente — 1 imovel orfao classificado como Colina (4q 232m² R$4M).

- [x] **19.RB.B.4** Anchor text descritivo nas torres — `src/app/empreendimento/[slug]/page.tsx:643-647 + 702-714`
  - Era "Saiba mais" generico → vira "Conheça a Reserva Lago" / "Reserva Colina" / "Reserva Mirante"
  - Link aponta pra sub-rota (Sprint B.7) em vez de redirect 301 anchor
  - Centraliza calculo de torre slug via `getTorreShortSlug()` (DRY)

- [x] **19.RB.B.5** Cluster tematico "Outros lancamentos Avantti" + "Empreendimentos proximos ao Parque Barigui" — `src/app/empreendimento/[slug]/page.tsx:949-1000`
  - Bloco 1: empreendimentos da mesma construtora (top 6) — captura usuario fa de marca
  - Bloco 2: empreendimentos em bairros vizinhos via mapa `BAIRROS_VIZINHOS` (Mossunguê → Campina, Cascatinha, Bigorrilho, Ecoville, Santo Inácio) — captura "regiao do Parque Barigui"
  - Bloco 3: "Explore tambem" antigo (mantido)
  - Cross-link interno fortalece autoridade do hub + cluster

- [x] **19.RB.B.T** Backlinks internos de `/imoveis/mossungue` (e demais bairros) pros hubs — `src/app/imoveis/[bairro]/page.tsx:128-152 + 271-313`
  - Novo bloco "Empreendimentos no {bairro}" com cards (nome + construtora + N unidades + preco)
  - Hubs editoriais ranqueiam primeiro (`hasEditorialLayout`)
  - Aplica em TODOS os bairros (nao so Mossunguê) — feature transversal

- [x] **19.RB.B.W** Script IndexNow pra notificar Bing/Yandex das URLs novas — `scripts/indexnow-reserva-barigui.mjs`
  - 6 URLs: hub + 3 sub-rotas + typo + /imoveis/mossungue
  - Roda manual: `node scripts/indexnow-reserva-barigui.mjs`
  - Dry-run via `INDEXNOW_DRY=1 node scripts/...`
  - Disparar **apos** Vercel deploy de produção

- [ ] **19.RB.B.smoke** [VALIDACAO] Pos-deploy
  - `npm run smoke` (CI roda automatico via .github/workflows/smoke-test.yml)
  - Conferir manualmente:
    - https://fymoob.com.br/empreendimento/reserva-barigui/lago renderiza com title "Reserva Lago Avantti — Reserva Barigui em Mossunguê, Curitiba | FYMOOB"
    - Idem /colina e /mirante
    - View source do hub: schema com `containsPlace[]` apontando pras 3 sub-rotas
    - View source do typo `/reserva-bairgui`: canonical apontando pra `/reserva-barigui`
    - `/imoveis/mossungue`: bloco "Empreendimentos no Mossunguê" com card do Reserva Barigui
  - Rodar `node scripts/indexnow-reserva-barigui.mjs` (Bing recebe ping)

- [ ] **19.RB.B.gsc** [MANUAL — P0] Request Indexing das 6 URLs novas/alteradas no GSC
  - `/empreendimento/reserva-barigui` (refresh — Sprint A + B + B' + redesign premium 5 commits design)
  - `/empreendimento/reserva-barigui/lago` (URL nova — landing dedicada B' com 6 unidades filtradas)
  - `/empreendimento/reserva-barigui/colina` (URL nova — landing dedicada B' com 3 unidades, inclui orfao do typo)
  - `/empreendimento/reserva-barigui/mirante` (URL nova — landing dedicada B' com 2 unidades comerciais)
  - `/empreendimento/reserva-bairgui` (typo — Google precisa ler novo canonical)
  - `/imoveis/mossungue` (Sprint B.T — bloco "Empreendimentos no Mossunguê" novo)
  - Submeter no ritmo (GSC retorna `Quota exceeded` quando bloquear)
  - **Em paralelo:** rodar `node scripts/indexnow-reserva-barigui.mjs` (Bing/Yandex)

#### Sessao D — /aluguel + guias + polish [4-6h, +15-40 cliques/mes]

- [ ] **19.P2.D.1** Investigar e fixar /apartamentos-curitiba/aluguel + similares
  - **Diagnostico:** /apartamentos-curitiba/aluguel (487 palavras), /casas-curitiba/aluguel (428), /terrenos-curitiba/aluguel (397) — thin content + descriptions 73-79 chars
  - **Causa provavel:** `src/components/search/TipoFinalidadePage.tsx` nao
    renderiza `LandingSEOContent` quando finalidade=aluguel
  - **Fix:**
    1. Verificar logica condicional no component
    2. Adicionar `LandingSEOContent` adaptada pra aluguel (texto sobre garantias,
       contratos, IPTU inquilino, perfil de busca de aluguel)
    3. Atualizar `generateLandingDescription` pra finalidade=aluguel produzir
       140-160 chars

- [ ] **19.P2.D.2** Encurtar 10 guia titles
  - **Arquivos:** `src/app/guia/[bairro]/page.tsx` ou frontmatter MDX
  - **Atual:** todos com 66-71 chars
  - **Reduzir 5-10 chars** mantendo essencia: "Guia Completo: Morar no {Bairro} | FYMOOB" (~50 chars)

- [ ] **19.P2.D.3** Polish /casas-curitiba title (68→64 chars)
  - **Arquivo:** `src/app/casas-curitiba/page.tsx:23` ou via `generateLandingTitle`

- [ ] **19.P2.D.4** Verificar 29 URLs com erro de fetch no audit
  - **Lista:** `/imoveis/juveve`, `/imoveis/portao/casas`, +27 outras
  - Possivel causa: bairros com 1 imovel so, combos sem catalogo
  - **Acao:** rodar `curl -I` em cada e verificar se gera 404 real ou 5xx temporario
  - Se 404 real: remover do sitemap (regenerar com filtro de minimo 2 imoveis)
  - Script: `python scripts/seo-gaps-audit.py --all` em 7 dias pra revalidar

#### Sessao E — Audit + aplicacao de titulos imoveis CRM (Bruno + Vinicius)

- [ ] **19.P2.E.1** Vinicius gera relatorio de imoveis com title > 65 chars
  - Filtrar do JSON `docs/seo-reports/page-audit-all.json`:
    `[p for p in data if p['url'].startswith('/imovel/') and p['title_len'] > 65]`
  - 219 imoveis afetados
  - Cruzar com planilha existente `docs/seo/titles-suggestions-2026-04-22.md`
  - Gerar lista priorizada (codigo CRM + title atual + sugestao 22/04)

- [ ] **19.P2.E.2** Bruno aplica titulos no CRM Loft 1 a 1
  - Esforco estimado: 4-5h (revisao + aplicacao)
  - Acessar Loft Vista painel > Imoveis > Edit > campo Titulo
  - Salvar e proximo

- [ ] **19.P2.E.3** Vinicius dispara cache invalidation pos-aplicacao
  - `curl -X POST .../api/revalidate -d '{"tag":"imoveis"}' -H 'x-revalidate-secret: ...'`
  - Verificar GSC depois de 7-14 dias pra confirmar que Google reprocessou

### Fase 19.P2 — Estimativa consolidada

| Sessao | Esforco | Paginas afetadas | Cliques/mes esperados | Status |
|---|---|---|---|---|
| A — Funcoes centralizadas | 3-4h dev | 420 | +100-240 | ✅ 01/05/2026 (`5872aee`) |
| B — Empreendimentos | 8-10h dev | 110 | +60-180 | ✅ 01/05/2026 (`6c418d8`) |
| C — Blog posts | 13-18h dev | 15 | +60-120 | ✅ 01/05/2026 (`dd2f322`) |
| D — /aluguel + guias + polish | 4-6h dev | 25 | +15-40 | 🟡 P1 PENDENTE |
| E — Imoveis title CRM | 4-5h Bruno + 1h Vinicius | 219 | +20-50 | 🟢 P2 PENDENTE |
| **CONCLUIDO** | **24-32h** | **545 paginas** | **+220-540 cliques/mes** | — |
| **TOTAL** | **34-44h** | **~600 paginas** | **+255-625 cliques/mes** | — |

### Fase 19.P2 — Documentos consolidados (01/05/2026)

- **`docs/seo-reports/2026-05-01-fase19-p2-summary.md`** — Sumario consolidado das 3 sessoes (diffs, fontes citadas em cada FAQ, metricas-alvo)
- **[`docs/seo-reports/reindex-urls-tracker.md`](seo-reports/reindex-urls-tracker.md)** — Tracker vivo de re-indexacao (P0 Reserva Barigui + P1 blogs + P2 empreendimentos + P3 landings + P4 IndexNow batch). Inclui historico de URLs ja aceitas.
- **`scripts/add-blog-faqs.mjs`** — Helper batch idempotente reusavel pra updates em massa SEO em arquivos similares

### Fase 19.P2 — Como acompanhar

```bash
# Re-rodar audit (mensal)
python scripts/seo-gaps-audit.py --all

# Outputs:
# - docs/seo-reports/page-audit-all.json (raw)
# - docs/seo-reports/page-audit-stats.json (aggregated)
# - docs/seo-reports/all-urls-sitemap.txt (URLs)
```

**Metricas-alvo (audit em 30 dias):**
- Paginas com title > 65 chars: 404 (72%) → <50 (10%)
- Paginas com description < 130 chars: 372 (66%) → <80 (15%)
- Empreendimentos thin content: 109 (99%) → <30 (27%)
- Imoveis com description rica: 0 → 248 (100%)
- CTR medio site: 2.81% → 4.5%+
- Cliques mensais GSC: ~270 → 600-900

- [ ] **19.16** AggregateRating schema integrado com Google Business Profile (GMN)
  > **BLOQUEADO — aguardando Bruno** (acesso Google Cloud + Place ID FYMOOB)
  >
  > **Contexto:** FYMOOB tem perfil GMN ativo com **4.9 estrelas e 59 reviews**
  > (verificado em busca pública 2026-04-30). Hoje as estrelas só aparecem
  > no Knowledge Panel do Google. Implementar `AggregateRating` schema faz
  > as estrelas aparecerem **no SERP organico do site tambem** — rich result
  > com CTR esperado +15-30%.
  >
  > **3 caminhos avaliados** (ver conversa em [docs/seo/seo-playbook-fymoob.md](seo/seo-playbook-fymoob.md)
  > Secao 5):
  > - Caminho 1: Manual estatico (30min, mas dado fica stale) ❌ rejeitado
  > - Caminho 2: **Google Places API** (3-4h dev, free tier MUITO sobrado, atualiza
  >   automaticamente 1x por dia via cache 24h) ✅ **escolhido**
  > - Caminho 3: Business Profile API (6-10h, mostra reviews individuais, requer
  >   verificar GMN primeiro) — futuro 2-3 meses

### Fase 19.16 — Pre-requisitos do Bruno (AGUARDANDO)

- [ ] **Bruno reclama/verifica perfil GMN** em https://business.google.com
  - Loga com `fymoob@gmail.com`
  - Busca "Fymoob" — clica em "Reclamar" / "Sou o dono"
  - Verifica por SMS ou ligacao (5min) ou carta com PIN (5-14 dias)
  - **Por que importa:** atualmente o "Own this business?" aparece no Knowledge
    Panel = ninguem reclamou ainda. Sem verificar, concorrentes podem editar
    dados, spam pode entrar como review, FYMOOB nao pode responder.
  - **Esforco Bruno:** 30min ativo + 1-3 dias espera

- [ ] **Bruno cria/acessa Google Cloud Project**
  - https://console.cloud.google.com (com `fymoob@gmail.com`)
  - Cria projeto novo ou usa existente
  - Compartilha acesso comigo (`dev.viniciusdamas@gmail.com`) como Editor
  - Ou **alternativa**: gera API key sozinho seguindo passo-a-passo que envio

- [ ] **Habilitar Places API (New)** no projeto
  - Console GCP > APIs & Services > Library
  - Busca "Places API (New)"
  - Clica "Enable"

- [ ] **Gerar API key restrita** (seguranca obrigatoria)
  - Console GCP > APIs & Services > Credentials > Create credentials > API key
  - Restrict key:
    - HTTP referrers: `https://fymoob.com.br/*`, `https://*.vercel.app/*` (preview deploys), `localhost:3000/*` (dev)
    - API restrictions: somente "Places API (New)"
  - Compartilhar key segura

- [ ] **Bruno me envia o Place ID da FYMOOB**
  - https://developers.google.com/maps/documentation/places/web-service/place-id
  - Buscar "Fymoob Curitiba" ou pelo endereco "R. Eng. Heitor Soares Gomes, 778"
  - Copiar o Place ID (formato `ChIJ...`)

### Fase 19.16 — Implementacao (apos Bruno completar pre-requisitos)

- [ ] **Criar `src/services/gmn.ts`** com `getGMNRating()`
  - Fetch ao Places API (New) via `X-Goog-Api-Key` header
  - Retorna `{ rating, userRatingCount }`
  - Cache 24h via `unstable_cache` com tag `gmn`
  - Fallback: se API falhar ou retornar erro, retornar valores hardcoded (4.9 / 59)
    pra schema nao quebrar

- [ ] **Atualizar `generateOrganizationSchema()`** em `src/lib/seo.ts`
  - Async function (era sync)
  - Inclui `aggregateRating: { @type, ratingValue, reviewCount, bestRating: "5", worstRating: "1" }`
  - Atualizar callers em `layout.tsx` (await) e qualquer outro

- [ ] **Adicionar var ambiente**
  - `.env.local`: `GOOGLE_PLACES_API_KEY=AIzaSy...`
  - `.env.example`: `GOOGLE_PLACES_API_KEY=` (placeholder)
  - Vercel Production: adicionar via dashboard
  - Vercel Preview: mesma key (restrita por dominio)

- [ ] **Endpoint `/api/revalidate-gmn`** com auth header `x-revalidate-secret`
  - Pra forcar refresh manual quando review novo aparece
  - `revalidateTag("gmn")`

- [ ] **Smoke test pos-deploy**
  - Verificar que JSON-LD na home contem `aggregateRating` valido
  - Schema validator: https://validator.schema.org → deve passar
  - Rich Results Test: https://search.google.com/test/rich-results → deve mostrar
    "Local Business with reviews" elegivel

- [ ] **Submeter URL no GSC URL Inspection** (Bruno) apos deploy
  - https://fymoob.com.br/ → Request Indexing
  - Aguardar 7-14 dias pra Google reprocessar e mostrar estrelas

- [ ] **Monitorar GSC > Enhancements > Review snippets**
  - Google reporta se aceitou o schema
  - Se rejeitar, ajustar

### Fase 19.16 — Custo monetario

- **Free tier Google Maps Platform:** US$ 200/mes em creditos gratuitos
- **Places API (New) Place Details:** US$ 17/1000 requests
- **Uso projetado:** ~30 requests/mes (1/dia + alguns extras de revalidate)
  = US$ 0.51/mes = **0.25% do free tier**
- **Risco de cobranca:** zero ate site fazer >390k requests/mes (impossivel
  com cache 24h)

### Fase 19.16 — Estimativa de impacto

- **CTR organico:** +15-30% (estudos Google/Moz sobre rich snippets com
  estrelas)
- **Diferenciacao:** marketplaces (Viva Real, ZAP, Imovelweb) NAO mostram
  estrelas proprias no SERP (so internas no site). FYMOOB com 4.9 estrelas
  no SERP organico = vantagem competitiva clara em "imobiliaria curitiba",
  "fymoob curitiba", queries de marca.
- **E-E-A-T:** sinal de Trust forte (estrelas = social proof)
- **Tempo pra ver estrelas no SERP:** 7-21 dias apos schema deploy + Bruno
  pedir Request Indexing

### Fase 19.16 — Followup (apos 30 dias rodando)

- [ ] Avaliar se faz sentido migrar pra Caminho 3 (Business Profile API)
  - Vantagem: mostra reviews individuais como cards no site (testimonials sociais)
  - Pre-req: GMN ja verificado (passo 1 acima)
  - Esforco adicional: 4-6h
- [ ] Pedir reviews novos a clientes recentes via WhatsApp
  - Template: "Bruno aqui da FYMOOB. Foi um prazer atender voce na compra do
    [imovel]. Pode dar 1 minutinho pra deixar uma avaliacao? Link: [link
    GMN review]"
  - Meta: 59 → 75-100 reviews em 60-90 dias (acelera AGGEgateRating com
    contagem maior = mais credibilidade)
  - Hoje: Agua Verde, Batel, Bigorrilho, Centro, Ecoville, Portao
  - Adicionar: Juveve, Cabral, Cristo Rei, Alto da Gloria, Ahu, Mossungue, Cidade Industrial, Sao Braz, Santa Felicidade
  - Implementar em `RelatedPages` ou bloco "Explore por bairro"
  - MySide tem 11. FYMOOB pode ter 15+ (mais bairros no catalogo)
  - Estimativa: 1h dev

### Fase 19.P1 — Proximas 2 semanas [PENDENTE]

- [ ] **19.6** Reestruturar headings H2 da listagem (eliminar duplicacao)
  - Hoje: 49 H2 = titles de imoveis duplicados 2x cada (debug DOM mostrou)
  - Trocar pra:
    - 1x H2 master: "Apartamentos disponiveis em Curitiba"
    - H3 por agrupamento (bairro ou empreendimento) agrupando cards
    - Ex: "Apartamentos em Portao", "Apartamentos no Le Monde"
  - Reduz duplicacao + cria hierarquia semantica
  - Estimativa: 2h dev

- [ ] **19.7** Auditar landings combinadas bairro+tipo no sitemap
  - URL pattern existente: `/imoveis/[bairro]/apartamentos`, `/imoveis/[bairro]/casas`, etc
  - Verificar se estao sendo geradas no sitemap shard 1 (sim, codigo confirmado)
  - Verificar se Google esta indexando (GSC -> Cobertura -> Indexadas)
  - Adicionar links no footer de `/apartamentos-curitiba` -> linka pra todas combinacoes
  - Estimativa: 1h dev + acompanhamento GSC

- [ ] **19.8** Schema `AggregateRating` (avaliacoes Google) no Organization
  - Pra ganhar estrelas no SERP (rich result)
  - Importar reviews do Google Meu Negocio (FYMOOB tem CRECI J 9420, deve ter perfil GMN)
  - Opcoes: Google Places API ou copiar manualmente os top reviews
  - Adicionar `aggregateRating: { @type: AggregateRating, ratingValue: X, reviewCount: Y }` no schema Organization em `src/lib/seo.ts`
  - CTR +20% quando estrelas aparecem
  - Estimativa: 4h dev (incluindo GMN setup se nao existir)

- [ ] **19.9** Pillar `/comprar-apartamento-curitiba` (5000+ palavras)
  - Verificar se `/comprar-imovel-curitiba` (existente) tem foco especifico em apartamentos
  - Se nao: criar pillar dedicado a apartamentos
  - 30+ subsecoes (financiamento, ITBI, escritura, vistoria, condominio, IPTU, plantas, m², etc)
  - Internal links para todas landings de bairro+apartamento
  - Vira pillar pra capturar autoridade na vertical apartamentos
  - Estimativa: 12h dev (escrita + componentes)

### Fase 19.P2 — Proximo mes [PENDENTE]

- [ ] **19.10** Backlinks editoriais
  - Listar imoveis em diretorios setoriais (Diretorio Imobiliario, Solucoes Imoveis)
  - Guest posts no blog do Sindico Net, Gazeta Maringa, Tribuna PR
  - Pitch como fonte em materias imobiliario do G1 PR / Bem Parana
  - Submeter perfil em diretorios: Apontador, Solofacil, GoIndustry
  - 10-20 backlinks de qualidade em 30-60 dias
  - Estimativa: 8h outreach (Bruno deve ajudar com contatos locais)

- [ ] **19.11** Capturar empreendimentos populares de Curitiba como landing pages
  - MySide tem 18 H2 = 18 empreendimentos linkados
  - FYMOOB tem `/empreendimento/[slug]` ja
  - Auditar: quantos empreendimentos populares de Curitiba ainda nao tem landing?
  - Lista de empreendimentos top a criar: Trebbiano, Sunset Agua Verde, Reserva Colina, Park Boulevard, Le Monde, etc
  - Mesmo sem ter o imovel especifico, criar landing rica (foto, planta, descricao, FAQ) pra capturar busca
  - Conteudo "vazio" de imoveis pode redirecionar pra busca filtrada
  - Estimativa: 6h por empreendimento (15 empreendimentos = 90h, fazer 2-3/semana)

- [ ] **19.12** Pagina "Mercado Imobiliario Curitiba 2026"
  - Atualizada mensalmente com dados FipeZAP
  - Graficos de evolucao de precos por bairro
  - Schema `Dataset` ou `WebPage` com dados estruturados
  - Vira fonte citavel por outros sites = backlinks naturais
  - Estimativa: 8h primeira versao + 1h/mes manutencao

### Fase 19.P3 — Backlog (longo prazo / opcional) [PENDENTE]

- [ ] **19.13** Videos com schema `VideoObject` por tour de apartamento
- [ ] **19.14** Calculadora de financiamento embutida com `SoftwareApplication` schema
- [ ] **19.15** Indicador FipeZAP automatico por bairro (scraping + cache mensal)
