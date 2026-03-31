# Pesquisa Técnica — Concorrentes FYMOOB
### Dados coletados em 30/03/2026 — USO INTERNO

---

## 1. Razzi Imóveis

| Campo | Dado |
|-------|------|
| URL | razziimoveis.com.br |
| Título | "Razzi Imoveis \| Imobiliaria em Curitiba" |
| Plataforma | WordPress + Rocket Imob (antigo Colibri360) |
| Stack frontend | jQuery, Bootstrap |
| SEO plugin | Yoast SEO |
| Cache | W3 Total Cache |
| Analytics | GA4 + dual GTM + dual Facebook Pixels |
| Forms | Mautic (automação de marketing) |
| LGPD | Compliance implementado |
| Rendering | SSR (WordPress nativo) |

### Tráfego e Autoridade
- **SimilarWeb Global Rank:** #2.507.588 (Fev 2026) — tráfego negligenciável
- **Visitas estimadas:** < 5.000/mês
- **Google indexou:** ~4 páginas visíveis no site: operator

### Sitemap (razziimoveis.com.br/sitemap_index.xml)
- 7 sub-sitemaps (Yoast SEO):
  - post-sitemap.xml: **530 URLs** (blog posts)
  - page-sitemap.xml: **28 URLs** (páginas estáticas)
  - cidade_bairro-sitemap.xml: **2 URLs** — conteúdo demo do tema (ver nota abaixo)
  - category-sitemap.xml: 3 URLs
  - post_tag-sitemap.xml: **672 URLs** (tags)
  - categorias-faq-sitemap.xml: 4 URLs
  - author-sitemap.xml: 2 URLs
- **Total declarado no sitemap: 1.241 URLs**
- **cidade_bairro-sitemap.xml**: apenas 2 entradas — conteúdo demo NÃO configurado (ver nota)
- Imóveis individuais NÃO estão em nenhum sitemap
- Páginas de empreendimento (/empreendimento/) NÃO estão em nenhum sitemap

### Nota sobre o sitemap de bairros (cidade_bairro)
As 2 URLs são `/guia/rio-de-janeiro` e `/guia/rio-de-janeiro/botafogo`, ambas com lastmod 2022-09-12 (mesma data = importação de demo). O conteúdo é **Lorem Ipsum placeholder** — texto de demonstração do tema Rocket Imob. A Razzi opera exclusivamente em Curitiba (CRECI 8869, endereço no Centro de Curitiba). Não é intencional — é conteúdo demo do tema que nunca foi configurado para Curitiba. **A Razzi simplesmente nunca usou o recurso de guia de bairros da plataforma.** Resultado: zero landing pages de bairro de Curitiba.

### Schema JSON-LD
- WebSite ✅
- Organization ✅
- WebPage ✅
- BreadcrumbList ✅
- RealEstateListing ❌
- LocalBusiness ❌
- FAQPage ❌

### Empreendimentos (o que faz a Razzi rankear)
- Página /empreendimentos/ lista **74 empreendimentos** com links diretos
- Cada empreendimento tem página dedicada: /empreendimento/[id]/[slug]/
- **Reserva Barigui Lago:** razziimoveis.com.br/empreendimento/392/reserva-barigui-lago/
  - Título: "Reserva Barigui Lago | Construtora Avantti | Campina do Siqueira"
  - Conteúdo: ~1.000 palavras + 42 fotos + preços + specs
  - Schema: BreadcrumbList (2 instâncias) — MAS sem RealEstateListing
  - Links internos para sub-unidades (/imovel/393/, /imovel/394/, /imovel/395/)
  - Alt text das imagens: nomes de arquivo, não descritivos
- **Reserva Barigui Colina:** razziimoveis.com.br/empreendimento/385/reserva-barigui-colina/
- Página de construtora: /construtora-avantti/ — funciona como cluster temático

### POR QUE a Razzi ranqueia sem sitemap
O Google NÃO depende só do sitemap. Ele segue links internos:
1. Homepage (no sitemap) → linka para /empreendimentos/
2. /empreendimentos/ lista 74 empreendimentos com links diretos
3. /construtora-avantti/ linka para ambos Reserva Barigui
4. Google segue essa cadeia e indexa mesmo sem sitemap entry

Fatores on-page que ajudam:
- Keyword exata na URL: /reserva-barigui-lago/
- Keyword exata no title e H1
- Conteúdo rico (~1.000 palavras + 42 fotos)
- BreadcrumbList schema

### Blog
- 530 posts publicados (atualizado — antes contamos 456)
- Maioria é thin content / AI-generated
- Tema dominante: variações de "apartamento na planta em Curitiba"
- **ZERO posts mencionam "Reserva Barigui"** — o blog NÃO apoia os empreendimentos
- **ZERO tags contêm "barigui"** (verificado no post_tag-sitemap.xml com 672 tags)

### Rankings observados
- "Reserva Barigui": posição 3 (atrás de Avantti e Sym Imóveis)
- "Reserva Barigui Lago preço": posição **#1** (!)
- Não aparece no top 10 para keywords genéricas de imóveis

### Fraquezas críticas
1. Guia de bairros nunca configurado (demo content do tema)
2. Imóveis individuais fora do sitemap
3. Empreendimentos fora do sitemap (ranqueia por links internos apenas)
4. Sem schema RealEstateListing
5. Blog é volume sem qualidade e NÃO apoia os empreendimentos
6. Sem landing pages por bairro otimizadas
7. Sem landing pages por tipo
8. Google indexa apenas ~4 páginas apesar de declarar 1.241 no sitemap
9. Alt text das imagens são nomes de arquivo

---

## 2. JBA Imóveis

| Campo | Dado |
|-------|------|
| URL | jbaimoveis.com.br |
| Título | "Imobiliaria em Curitiba \| JBA Imoveis" |
| H1 | "Os melhores imoveis para comprar e alugar em Curitiba e regiao" |
| Meta desc | "Compre seu imovel em Curitiba e regiao com a JBA Imoveis..." |
| Plataforma | WordPress + Rocket Imob |
| SEO plugin | Yoast SEO |
| Cache | W3 Total Cache |
| Rendering | SSR (WordPress nativo) |
| Fundação | 1993 (30+ anos) |
| Portfólio | 2.000+ imóveis, 130+ construtoras parceiras |

### Tráfego e Autoridade
- **SimilarWeb Global Rank:** #307.160 (Fev 2026)
- **SimilarWeb Category Rank:** #82 em Real Estate
- **Visitas estimadas:** 30.000–80.000/mês
- **Google indexou:** ~8 páginas visíveis no site: operator

### Sitemap (jbaimoveis.com.br/sitemap_index.xml)
- 6 sub-sitemaps (Yoast SEO):
  - post-sitemap.xml: **136 URLs** (blog posts)
  - page-sitemap.xml: **33 URLs** (páginas estáticas)
  - attachment-sitemap.xml: **1.047 URLs** (páginas de mídia — prática questionável)
  - category-sitemap.xml: 8 URLs
  - post_tag-sitemap.xml: 68 URLs
  - author-sitemap.xml: 1 URL
- **Total declarado: 1.292 URLs** (mas 1.047 são attachments)
- Conteúdo real: ~169 páginas + 136 blog posts

### Conteúdo (inventário detalhado)
| Tipo | Qtd | URL Pattern |
|------|-----|-------------|
| Blog posts | 127 | /blog/categoria/[topic]/[slug]/ |
| Páginas estáticas | 33 | /[slug]/ |
| Landing pages de bairro | **8** | /bairros/[name]/ |
| Empreendimentos | **345** | /empreendimento/[id]/[slug] |
| Categorias de blog | 8 | /blog/categoria/[name]/ |
| **Total estimado indexável** | **~513+** | |

### 8 Landing Pages de Bairro
- /bairros/agua-verde/
- /bairros/boa-vista/
- /bairros/boqueirao/
- /bairros/jardim-das-americas/
- /bairros/santa-felicidade/
- /bairros/bom-retiro/
- /bairros/sao-jose-dos-pinhais/
- /bairros/pinhais/
- Cada uma com: H1 único, 200-300 palavras descritivas, 8 imóveis em destaque, schema WebPage + BreadcrumbList

### 345 Empreendimentos
- Maior diferencial da JBA vs outros concorrentes
- Cada empreendimento com página própria: quartos, suítes, vagas, área, preço inicial

### 8 Categorias de Blog
Curitiba e Região, Mercado Imobiliário, Morar Bem, Quero Alugar, Quero Comprar, Quero Investir, Quero Vender, Tendências

### Schema JSON-LD (4 tipos na homepage)
- WebSite ✅
- Organization ✅
- WebPage ✅
- BreadcrumbList ✅
- RealEstateListing ❌
- LocalBusiness ❌

### POR QUE a JBA é #1 para "imobiliária Curitiba"
1. Title tag perfeito: "Imobiliaria em Curitiba | JBA Imoveis" (exact match)
2. 513+ páginas indexáveis criando autoridade temática
3. 4 tipos de schema na homepage
4. 30+ anos de mercado (desde 1993)
5. 127 blog posts cobrindo todo ângulo imobiliário de Curitiba
6. Links internos fortes: home → bairros → imóveis
7. 345 empreendimentos = maior volume de conteúdo de empreendimento
8. WordPress + Yoast = infraestrutura SEO comprovada

### Fraquezas
1. Plataforma Rocket Imob limita customização de schema
2. Sem RealEstateListing por imóvel
3. Apenas 8 landing pages de bairro (vs 49 do FYMOOB planejadas)
4. 1.047 de 1.292 URLs do sitemap são attachments (imagens), não conteúdo real
5. Sem landing pages combinadas bairro+tipo

---

## 3. Apolar

| Campo | Dado |
|-------|------|
| URL | apolar.com.br |
| Título | "Imobiliaria em Curitiba - Imoveis a Venda e Locacao \| Apolar" |
| Plataforma | Vue.js SPA (Argon Design System) |
| Rendering | CSR (Client-Side Rendering) — NÃO tem SSR |
| Fundação | 1969 (55+ anos) |
| Porte | Maior de Curitiba, 90+ franquias (Brasil + Paraguai), 20.000+ imóveis |

### Tráfego e Autoridade (DADOS CONFIRMADOS — Semrush)
- **SimilarWeb Global Rank:** #99.713 (Fev 2026)
- **SimilarWeb Category Rank:** #32 em Real Estate (global!)
- **Visitas estimadas:** ~160.000/mês (Semrush Dez 2025)
- **Semrush Authority Score:** 35
- **Backlinks:** ~1.770 (queda de 2,8% MoM)
- **Referring Domains:** ~480 (queda de 1,03% MoM)
- **Fontes de tráfego:** Direto 47%, Google 30% (~48.000 visitas orgânicas/mês)
- **Tendência:** Queda de 4,02% MoM
- **Sessão média:** 07:19
- **Top keywords:** "apartamentos", "casas", "venda", "compra venda", "imoveis"

### Sitemap (www.apolar.com.br/sitemap-index.xml)
- Apenas 2 sub-sitemaps:
  - sitemap.xml: ~1.050 URLs (páginas de categorias de aluguel)
  - condominiums-sitemap.xml: 50 URLs (condomínios)
- **Total declarado: ~1.100 URLs**
- Nota: robots.txt serve de apolar.com.br mas sitemap aponta para www.apolar.com.br
- Muitas páginas de imóveis NÃO estão no sitemap (geradas dinamicamente)

### Reserva Barigui na Apolar
- Tem página específica: apolar.com.br/condominio/reserva-barigui
- Aparece no SERP para "Reserva Barigui apartamento à venda" (posição ~5)

### Schema JSON-LD
- ZERO. Nenhum schema implementado.
- Nenhuma meta tag no HTML (tudo requer JavaScript)
- Googlebot vê página praticamente vazia

### Rankings observados
- #2 para "imobiliária Curitiba" (orgânico)
- Ranqueia por: brand power (55 anos), 480 referring domains, 1.770 backlinks
- ~48.000 visitas orgânicas/mês APESAR do SEO técnico péssimo

### Fraquezas críticas
1. SPA sem SSR — Google vê página vazia sem JavaScript
2. Zero schema de qualquer tipo
3. Zero meta tags no HTML
4. Apenas ~1.100 URLs no sitemap (vs 2.638 da Gonzaga)
5. Dependência total de JavaScript para renderizar conteúdo
6. SEO técnico é o PIOR entre todos os concorrentes
7. Tráfego em queda (-4% MoM)
8. 70% do tráfego NÃO vem do Google (47% direto = força de marca pura)

---

## 4. Gonzaga Imóveis

| Campo | Dado |
|-------|------|
| URL | gonzagaimoveis.com.br |
| Título | "Imobiliaria em Curitiba \| Encontre Seu Imovel - Gonzaga Imoveis" |
| H1 | "Imobiliaria em Curitiba: aluguel e venda de imoveis" |
| Plataforma | Nuxt.js (Vue-based) + Vuetify + Google Maps API |
| Rendering | Nuxt SSR (parcial) |
| Fundação | 1954 (70+ anos) |
| Porte | 8.000+ imóveis administrados, 1.000+ à venda e aluguel |

### Tráfego e Autoridade
- **SimilarWeb Global Rank:** #620.521 (Fev 2026)
- **SimilarWeb Category Rank:** #195 em Real Estate
- **Visitas estimadas:** 10.000–30.000/mês
- **Google indexou:** ~10+ páginas visíveis no site: operator

### Sitemap (api.gonzagaimoveis.com.br/sitemap/index.xml) — O MELHOR DO GRUPO
- 3 sub-sitemaps:
  - **neighborhoods.xml: 1.920 URLs** (combinações bairro × tipo de imóvel)
  - **realestates.xml: 500 URLs** (imóveis individuais)
  - **posts.xml: 233 URLs** (blog posts)
- **Total declarado: 2.638 URLs** — MAIOR sitemap entre todos os concorrentes
- Atualizado dinamicamente (última atualização: 30/03/2026)
- Permite explicitamente SiteAuditBot (Semrush) — usam ferramentas de SEO

### 1.920 Landing Pages Programáticas de Bairro (!)
- Geram páginas para CADA combinação de bairro × tipo × cidade
- Padrão: /aluguel/apartamento/curitiba/centro/
- Bairros cobertos: Abranches, Água Verde, Ahú, Alto Boqueirão, Atuba, Bacacheri, Bairro Alto, Batel, Bigorrilho, Boa Vista, Boqueirão, Cabral, Centro, e dezenas mais
- Cidades: Curitiba, São José dos Pinhais, Colombo, Almirante Tamandaré
- **Esta é a estratégia que o FYMOOB deve estudar e replicar**

### 233 Blog Posts
- Guias de bairro ("vantagens-de-morar-em-agua-verde")
- Moradia estudantil
- Guias de investimento
- Direitos do inquilino
- Financiamento (SAC vs Price)
- Turismo e lifestyle

### Schema JSON-LD
- Zero schema implementado (apesar da arquitetura moderna)

### Fraquezas
1. Zero schema de qualquer tipo (apesar de ter a melhor estrutura de sitemap)
2. Nuxt.js CSR parcial pode ter problemas de renderização
3. Sem empreendimentos (gap vs JBA que tem 345)
4. Rank #620K apesar de 2.638 URLs — possíveis problemas de qualidade de conteúdo
5. As 1.920 landing pages podem ser thin content (geradas sem texto descritivo)

### Nota importante
- **Gonzaga é o concorrente mais perigoso estruturalmente** — tem a melhor arquitetura de sitemap
- Se eles adicionarem schema markup, podem subir rápido
- Mas por enquanto, sem schema e com CSR parcial, estão sub-performando

---

## 5. Plataformas do Mercado

### Rocket Imob (antigo Colibri360)
- Tipo: Tema WordPress para imobiliárias
- Usado por: Razzi, JBA e outras em 16+ estados
- Tech: WordPress + jQuery + Bootstrap
- Limitação: schema limitado ao que o tema permite, sem customização real de landing pages

### Jetimob
- Tipo: SaaS (CRM + Site integrado)
- Clientes: 1.000+ no Brasil
- Tech: SPA genérico
- Preço: Não divulgado publicamente

### Tecimob
- Tipo: SaaS (CRM + Site + App)
- Clientes: "Milhares"
- Preço: A partir de R$129,90/mês
- Sem lock-in (pode cancelar)
- Tech: SPA genérico

### Ville Imob
- Tipo: SaaS legado
- Clientes: ~300
- Status: Adquirido por Praedium em 2023, em declínio

### CUPOLA
- Tipo: Agência de marketing imobiliário
- Sede: Curitiba
- Porte: 90+ funcionários
- Evento: CUPOLA Summit com 2.000+ participantes
- Foco: Marketing, não tecnologia
- Possivelmente "a empresa que todos usam" (mencionada pelo Bruno)

**Conclusão: NENHUMA plataforma do mercado usa Next.js, React moderno ou SSR nativo. Todas são WordPress ou SPA genérico.**

---

## 6. Rankings por Keyword (SERP analysis)

### "Reserva Barigui" (busca genérica)
1. **Avantti** (grupoavantti.com/reservabarigui/) — construtora, página oficial
2. Sym Imóveis (empreendimento page)
3. **Razzi** (razziimoveis.com.br/empreendimento/392/reserva-barigui-lago/) — empreendimento page

### "Reserva Barigui apartamento à venda" (busca transacional — OPORTUNIDADE)
1. **Megahouse** (página de imóvel individual)
2. **Imovelweb** (portal — 70 apartamentos)
3. **Imóveis de Primeira** (página de imóvel)
4. **Trovit** (agregador — 700 resultados)
5. **Apolar** (apolar.com.br/condominio/reserva-barigui)
6-10. Corretoras diversas

**Avantti NÃO aparece. FYMOOB NÃO aparece. 100% conquistável.**

### "Reserva Barigui Lago preço"
1. **Razzi** (razziimoveis.com.br/empreendimento/392/reserva-barigui-lago/) — #1!
2. **Avantti** (grupoavantti.com/reservabarigui/)
3-10. Corretoras diversas com páginas de empreendimento

**Padrão: páginas de empreendimento com preço no conteúdo vencem.**

### "Reserva Barigui Colina"
1. **Avantti** /reservabarigui/ (master page)
2. **Avantti** /reservacolina/ (sub-projeto)
3. Ribo Imóveis (empreendimento page)
4. MySide (empreendimento — a partir de R$ 3,19M)
5. **Razzi** (empreendimento/385/reserva-barigui-colina/)

### "apartamento à venda Curitiba"
- Dominado por portais: Viva Real, OLX, ZAP, Imovelweb, QuintoAndar
- Nenhuma imobiliária local no top 5

### "imobiliária Curitiba"
1. JBA Imóveis
2. Apolar
3. Gonzaga Imóveis
- Ranking por brand power e backlinks

### "sobrado à venda Curitiba" / "terreno Curitiba à venda"
- Dominado por portais
- JBA é a única local no top 5 para terreno (posição ~5)

### "apartamento Batel Curitiba à venda" / "apartamento Água Verde Curitiba"
- Dominado por portais: Imovelweb, Viva Real, Chaves na Mão, ZAP
- Nenhuma imobiliária local otimizada

### Keywords long-tail SEM DONO (oportunidade FYMOOB)
| Keyword | Volume | Competição local |
|---------|--------|-----------------|
| "apartamento 3 quartos Batel Curitiba" | Médio | Baixa |
| "sobrado à venda Portão Curitiba" | Médio | Nenhuma |
| "quanto custa morar no Batel" | Alto | Nenhuma |
| "documentos comprar imóvel Curitiba" | Alto | Nenhuma |
| "casas para alugar em Curitiba" | 12.100/mês | Portais dominam |
| "Reserva Barigui apartamento à venda" | Médio | Corretoras pequenas |

### Padrão identificado nos SERPs
1. **Páginas de empreendimento** vencem para nomes de empreendimentos (branded queries)
2. **Landing pages de bairro programáticas** capturam long-tail geográfico
3. **Blog posts** capturam queries informacionais
4. FYMOOB precisa de **páginas de empreendimento** (novo tipo que não temos ainda)

---

## 6.5 Tabela Comparativa de Tráfego — TODOS OS CONCORRENTES

| Concorrente | Global Rank | Visitas/mês | Sitemap URLs | Páginas indexáveis | Authority | Backlinks | Anos |
|-------------|-------------|-------------|-------------|-------------------|-----------|-----------|------|
| **Apolar** | #99.713 | ~160.000 | ~1.100 | ? | 35 | 1.770 | 55 |
| **JBA** | #307.160 | 30.000–80.000 | 1.292 | ~513+ | ? | ? | 30+ |
| **Gonzaga** | #620.521 | 10.000–30.000 | 2.638 | ~2.653 | ? | ? | 70+ |
| **Razzi** | #2.507.588 | < 5.000 | 1.241 | ~602 | ? | ? | ? |
| **Avantti** | #6.443.360 | ~1.924 | 0 (!) | ~15 | ? | ? | 20+ |
| **FYMOOB (atual)** | N/A | ~5 | 0 | 5 | 5/100 | 8 | ? |
| **FYMOOB (novo)** | — | TBD | 350+ | 350+ | — | — | — |

### Insights da tabela
- **Tráfego NÃO correlaciona com qualidade de sitemap:** Apolar tem 160K visitas com SEO péssimo (brand power). Gonzaga tem o melhor sitemap (2.638 URLs) mas rank muito inferior.
- **A Razzi é quase tão invisível quanto a FYMOOB atual.** 1.241 URLs declaradas mas Google indexa ~4.
- **A Avantti (construtora) tem MENOS tráfego que a FYMOOB terá** — só 1.924 visitas/mês, sem sitemap, SSL quebrado.
- **JBA prova que SEO funciona:** 30-80K visitas com "apenas" 513 páginas reais. FYMOOB pode chegar lá com 350+ páginas bem otimizadas.

---

## 7. FYMOOB Site Atual (fymoob.com) — Verificação ao Vivo

| Métrica | Dado |
|---------|------|
| Tráfego orgânico | 5 visitas/mês |
| Keywords ranqueando | 10 |
| Domain Authority | 5/100 |
| Backlinks | 8 (4 NoFollow) |
| Páginas indexadas | 5 de 245+ |
| Leads orgânicos | 0 |
| Instagram | 378 seguidores |
| Portais | 126 listings no Imovelweb, Chaves na Mão |
| Empresas registradas | FYMOOB Administradora de Imóveis LTDA + FYMOOB Investimentos Imobiliários LTDA |
| premium.fymoob.com | Existe (Reserva Barigui) — MAS SSL QUEBRADO |

### O que o Google vê HOJE em fymoob.com
- **Title:** "Fymoob" (só o nome — ZERO keywords)
- **Meta description:** Texto de filosofia/missão, não keywords
- **H1:** "Encontre seu imóvel ideal" (genérico, sem "Curitiba")
- **Schema:** ZERO JSON-LD de qualquer tipo
- **OG tags:** og:title "Fymoob", sem og:image
- **Canonical URL:** Não configurado
- **Sitemap:** Nenhum
- **Conteúdo visível sem JS:** ~15% — cards de imóvel, preços e descrições requerem JavaScript

### Comparação brutal: FYMOOB atual vs competidores

| Fator | FYMOOB atual | JBA (#1) | Gonzaga | Razzi |
|-------|:---:|:---:|:---:|:---:|
| Title tag | "Fymoob" | "Imobiliaria em Curitiba \| JBA" | "Imobiliaria em Curitiba \| Gonzaga" | "Razzi Imoveis \| Imobiliaria em Curitiba" |
| Tipos de schema | 0 | 4 | 0 | 4 |
| Blog posts | 0 | 127 | 233 | 530 |
| Landing pages bairro | 0 | 8 | 1.920 | 0 |
| Empreendimentos | 0 | 345 | 0 | 74 |
| Sitemap | Nenhum | 6 sitemaps | 3 sitemaps | 7 sitemaps |
| SSR | JS obrigatório | WordPress HTML | Nuxt SSR | WordPress HTML |
| Páginas indexáveis | ~5 | ~513+ | ~2.653+ | ~602 |

### Problemas do site atual
1. Client-Side Rendering — Google vê "Carregando..."
2. Título é apenas "Fymoob" — zero keywords
3. Meta description é texto de filosofia de marketing
4. Zero JSON-LD schema
5. Apenas ~15 de 245 imóveis visíveis
6. Sem sitemap dinâmico
7. Sem blog, sem landing pages, sem FAQ
8. premium.fymoob.com tem SSL quebrado
9. Sem canonical URLs
10. H1 genérico sem menção a Curitiba

---

## 8. Dados de Mercado

### Curitiba — Mercado Imobiliário
- Lidera demanda por imóveis no Brasil no 1T 2025 (IDI-Brasil/CBIC/CNN)
- R$ 7,4 bilhões em vendas de apartamentos novos em 2025 (ADEMI-PR/Brain)
- Transações: de 46 mil (2019/2020) para 58 mil (2023/2024)
- Estimativa: ~50.000 buscas imobiliárias/mês em Curitiba (~1.600/dia)

### SEO Imobiliário — Benchmarks Brasil
- Case Search Lab 2026: +268% cliques orgânicos YoY, +315% impressões
- Outro case: +230% em 60 dias
- Taxa de conversão do setor: 1,52% a 4% (Panorama Leadster 2025)
- SEO descrito como "canal previsível e mensurável"

### Precificação de mercado
| Tipo | Custo |
|------|-------|
| Template WordPress (UltraHospedagem) | R$ 26,90/mês |
| Tecimob (SaaS) | R$ 129,90/mês |
| Imobisoft (SaaS) | R$ 199/mês |
| Tema WordPress one-time (WPtech) | ~R$ 200 |
| Agência custom | R$ 1.500–5.000 |
| Projeto FYMOOB (nosso) | R$ 15.000–22.000 |

---

## 9. Avantti Construtora (Reserva Barigui) — ANÁLISE COMPLETA

| Campo | Dado |
|-------|------|
| URL | grupoavantti.com |
| Fundação | 2003 (20+ anos) |
| Atuação | Exclusiva Curitiba |
| Construído | 205.000+ m² |
| Reserva Barigui | Complexo de 92.000m², 345m de frente pro Parque Barigui |
| Empreendimentos | Colina (a partir de R$ 3,19M), Lago (a partir de R$ 881K) |
| Performance | Vendeu 40% em 120 dias |
| Diferencial | Tecnologia SmartJack (coreana, primeira no mundo) |

### Tráfego e Autoridade
- **SimilarWeb Global Rank:** #6.443.360 (queda de 1,3M+ posições)
- **Country Rank (Brasil):** #417.430 (queda de ~49K posições)
- **Visitas:** ~1.924/mês (SimilarWeb confirmado)
- **Bounce Rate:** 28,18%
- **Páginas por visita:** 2,54
- **Duração média:** 1 min 1 seg
- **Tendência:** Em QUEDA acentuada

### Estrutura do site (~10-15 páginas indexadas)
- grupoavantti.com/ (homepage) — bloqueia bots (HTTP 403)
- /reservabarigui/ — página master Reserva Barigui
- /reservacolina/ — página dedicada Reserva Colina
- /reservalago/ — página dedicada Reserva Lago
- blog.grupoavantti.com — blog em subdomínio separado (~10 posts)

### Problemas técnicos
- **Sem sitemap.** Nenhum. /sitemap.xml retorna 403, /sitemap_index.xml retorna 404
- robots.txt NÃO declara nenhum sitemap
- Blog em subdomínio (blog.grupoavantti.com) tem **certificado SSL quebrado** (ERR_TLS_CERT_ALTNAME_INVALID)
- Homepage bloqueia bots (403)

### Blog (blog.grupoavantti.com)
- "Descubra como é morar no Reserva Barigui"
- "Tudo o que você precisa saber sobre a Região do Barigui"
- "Rooftop: tendência mundial para residenciais"
- Posts de lifestyle sobre Curitiba
- **SSL QUEBRADO** — Google pode não indexar

### POR QUE a Avantti ranqueia #1 para "Reserva Barigui"
1. **Eles SÃO a construtora** — sinal E-E-A-T (Expertise, Experience) mais forte possível
2. URL exact-match: /reservabarigui/
3. Páginas separadas para cada sub-projeto (Colina, Lago) = cluster temático
4. Blog apoia com conteúdo "morar no Reserva Barigui" e "Região do Barigui"
5. 20+ anos de mercado, 205.000+ m² construídos = autoridade de marca
6. Centenas de links externos de portais imobiliários citando como construtora

### Conclusão sobre a Avantti
- **FYMOOB NÃO vai ultrapassar a Avantti para "Reserva Barigui"** (branded term da construtora)
- MAS a Avantti **NÃO ranqueia para queries transacionais** como "Reserva Barigui apartamento à venda"
- Esse SERP transacional é dominado por corretoras individuais (Megahouse, Razzi) — oportunidade real para FYMOOB
- Site da Avantti está em QUEDA (1.924 visitas/mês, sem sitemap, SSL quebrado) — empresa digital fraca apesar do produto premium

---

## 10. Comparação Técnica Completa — FYMOOB vs Todos (ATUALIZADA)

| Aspecto | FYMOOB (novo) | Razzi | JBA | Apolar | Gonzaga | Avantti |
|---------|:---:|:---:|:---:|:---:|:---:|:---:|
| Framework | Next.js 16 | WordPress | WordPress | Vue.js SPA | Nuxt.js | Custom |
| SSR | ✅ Nativo | ✅ WP | ✅ WP | ❌ CSR | ⚠️ Parcial | ❌ 403 |
| Visitas/mês | TBD | <5K | 30-80K | 160K | 10-30K | 1.924 |
| Schema RealEstateListing | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Schema Organization | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Schema LocalBusiness | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Schema BreadcrumbList | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Schema BlogPosting | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Schema FAQPage | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| URLs no sitemap | 350+ | 1.241* | 1.292** | ~1.100 | 2.638 | 0 |
| Landing bairro | ✅ 49 | ❌ | ✅ 8 | ❌ | ✅ 1.920 | ❌ |
| Landing tipo | ✅ 4 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Landing bairro+tipo | ✅ 28 | ❌ | ❌ | ❌ | ✅ (programático) | ❌ |
| Empreendimentos | ❌ 0*** | ✅ 74 | ✅ 345 | ⚠️ condos | ❌ | ✅ próprios |
| Imóveis no sitemap | ✅ 244 | ❌ | ❌ | ❌ | ✅ 500 | ❌ |
| Blog posts | 5 | 530 thin | 127 | ❌ | 233 | ~10 (SSL quebrado) |
| FAQ com schema | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Velocidade esperada | 1-2s | 3-5s | 3-5s | 5s+ | 3-4s | ? (403) |

*Razzi: 1.241 URLs declaradas mas Google indexa ~4. Guia de bairros nunca configurado (demo content).
**JBA: 1.047 de 1.292 URLs são attachments (imagens), não conteúdo real.
***FYMOOB: NÃO tem páginas de empreendimento — gap identificado, ver seção 12.

---

## 11.5 Gap Identificado: Páginas de Empreendimento

### O que aprendemos
Páginas de empreendimento (/empreendimento/[slug]) são o formato que **mais ranqueia** para buscas com nome de empreendimento (ex: "Reserva Barigui").

- Razzi tem 74 empreendimentos → ranqueia #1 para "Reserva Barigui Lago preço"
- JBA tem 345 empreendimentos → maior volume do mercado
- FYMOOB tem 0 empreendimentos → **GAP CRÍTICO**

### O que o FYMOOB precisa
Criar rota `/empreendimento/[slug]` com:
- Título otimizado: "[Nome] | [Construtora] | [Bairro] - Curitiba"
- Conteúdo: ~500-1.000 palavras + fotos + preços + specs das unidades
- Schema: RealEstateListing (que ninguém tem!)
- Links para as unidades individuais do empreendimento
- Cluster temático: página da construtora → empreendimentos → unidades

### Prioridade
ALTA — Este é o tipo de página que responderia diretamente à dor do Bruno: "a Razzi aparece e eu não para Reserva Barigui". Com uma página de empreendimento otimizada + schema RealEstateListing, FYMOOB pode ultrapassar a Razzi para "Reserva Barigui apartamento à venda".

---

## 11. O que falta no FYMOOB para ir ao ar

### Fase 5 — Integração API Loft (precisa da chave)
- Configurar LOFT_API_KEY
- Ajustar services/loft.ts para API real
- Paginação (max 50/request)
- Webhook de revalidação
- Fallback manual de revalidação

### Fase 6 — Institucional
- /sobre (sobre nós)
- /contato (formulário)
- /anuncie (anunciar imóvel)
- Header/Footer definitivos
- Loading states e skeletons
- Error boundaries e 404
- Google Analytics 4

### Fase 7 — Deploy
- Vercel + domínio fymoob.com
- DNS
- Google Search Console (submeter sitemap)
- Google Business Profile
- Lighthouse audit
- Rich Results Test
- Redirects do site antigo
- Monitorar indexação 7 dias

---

*Este documento é de uso interno. O documento de apresentação para o cliente está em docs/competitive-analysis.md.*
