# Análise dos Concorrentes da FYMOOB no Google
### Preparado por Vinicius Lima — 30 de Março de 2026

---

Bruno, conforme combinamos, analisei a fundo os sites dos seus concorrentes — tecnologia, estratégia de SEO, pontos fortes e fraquezas. Abaixo está tudo o que encontrei.

---

## O que eu analisei

Usei ferramentas profissionais de análise de SEO e inspecionei o código-fonte de cada site para entender exatamente o que eles fazem por baixo dos panos. Analisei 4 concorrentes diretos:

1. **Razzi Imóveis** (razziimoveis.com.br) — o que você citou
2. **JBA Imóveis** (jbaimoveis.com.br) — #1 no Google para "imobiliária Curitiba"
3. **Apolar** (apolar.com.br) — a maior de Curitiba
4. **Gonzaga Imóveis** (gonzagaimoveis.com.br) — tradicional, 70+ anos

---

## Razzi Imóveis — O que eles fazem (e onde erram)

A Razzi usa **WordPress com um tema chamado Rocket Imob**. É uma plataforma pronta, usada por várias imobiliárias no Brasil. Funciona, mas tem limitações sérias.

**O que a Razzi faz bem:**
- Tem **74 páginas de empreendimento** bem construídas — é por isso que eles aparecem para "Reserva Barigui". A página deles sobre o Reserva Barigui Lago tem ~1.000 palavras, 42 fotos e preços detalhados. Para "Reserva Barigui Lago preço", a Razzi está em **primeiro lugar no Google**.
- Site carrega com conteúdo visível (WordPress renderiza no servidor)
- Tem 530 posts no blog (volume)
- Tem dados básicos da empresa configurados para o Google (Organization schema)

**Mas mesmo com esses acertos, a Razzi tem problemas sérios:**

- A Razzi **nunca configurou o guia de bairros** do tema WordPress que usam. As únicas 2 páginas de bairro no sitemap são conteúdo de demonstração do tema (Lorem Ipsum sobre Rio de Janeiro) — nenhum bairro de Curitiba está cadastrado. É um recurso que existe na plataforma mas que eles simplesmente ignoraram. Cada bairro não configurado é uma oportunidade que eles perdem no Google.
- As **74 páginas de empreendimento e todos os imóveis individuais não estão no sitemap**. A Razzi declara 1.241 URLs no sitemap, mas o Google só indexa ~4 páginas. Os empreendimentos aparecem porque o Google segue links internos, não porque o sitemap diz pro Google onde eles estão. É como ter uma loja sem placa na fachada — quem já conhece encontra, mas gente nova não.
- **Não tem dados estruturados de imóvel** (RealEstateListing). O Google não sabe o preço, quartos ou área dos imóveis da Razzi. Não consegue mostrar essas informações diretamente nos resultados de busca.
- O blog tem 530 posts, mas a maioria é **conteúdo genérico gerado por IA**. Detalhe: **nenhum** dos 530 posts menciona "Reserva Barigui". O blog deles não apoia os empreendimentos que eles vendem.
- **Não tem landing pages por bairro.** Não existe uma página "Imóveis no Batel" ou "Imóveis no Portão" otimizada.
- O tráfego deles é **muito baixo** — SimilarWeb rank #2.507.588 (menos de 5.000 visitas por mês). Pra comparar, a JBA tem 30.000-80.000 visitas/mês.

---

## JBA Imóveis — O melhor SEO local de Curitiba hoje

A JBA é quem aparece em **primeiro lugar para "imobiliária Curitiba"**. Também usa WordPress + Rocket Imob. Tem 30+ anos de mercado (desde 1993) e recebe **30.000 a 80.000 visitas por mês**.

**O que a JBA faz bem:**
- **345 páginas de empreendimento** — maior volume entre todos os concorrentes
- **127 posts de blog** organizados em 8 categorias (comprar, alugar, investir, etc.)
- **8 landing pages de bairro** com descrições únicas e imóveis em destaque
- 4 tipos de schema na homepage (WebSite, Organization, WebPage, BreadcrumbList)
- Título perfeito: "Imobiliaria em Curitiba | JBA Imoveis" (match exato da busca)
- ~513 páginas indexáveis no total

**Onde a JBA erra:**
- Mesma plataforma limitada (Rocket Imob) — **sem dados estruturados de imóvel** (RealEstateListing)
- 1.047 de 1.292 URLs no sitemap são **imagens**, não páginas reais
- Apenas 8 landing pages de bairro (poucas pra 80+ bairros de Curitiba)
- Sem combinação bairro+tipo (não tem "apartamento no Batel", "sobrado no Portão")

A JBA é a referência. Mas o que ela tem de forte (345 empreendimentos, 127 blogs, 8 bairros) pode ser igualado e superado com tecnologia melhor. O que ela não tem (RealEstateListing, landing pages combinadas, 49+ bairros) é o diferencial que nós entregamos.

---

## Apolar — A maior de Curitiba com o pior SEO

A Apolar é a **maior imobiliária de Curitiba** — 55 anos, 90+ franquias, 20.000+ imóveis. Recebe **160.000 visitas por mês** (dados Semrush). Mas olha a realidade técnica:

- O site deles é um **SPA (Single Page Application)** em Vue.js
- Quando o Google acessa o site, ele vê **uma página praticamente vazia** (precisa de JavaScript pra renderizar)
- **Zero dados estruturados** (nenhum schema, nenhum JSON-LD)
- **Zero meta tags** no HTML
- Só tem **~1.100 URLs no sitemap** (a Gonzaga, que é menor, tem 2.638)
- **Apenas 30% do tráfego vem do Google** (~48.000 orgânicas). Os outros 70% são tráfego direto (gente que já conhece a marca) e outras fontes
- O tráfego está **em queda** (-4% mês a mês)

**Por que a Apolar aparece no Google mesmo assim?** Pura força de marca. 50 anos de história, milhares de backlinks de matérias de jornal, portal, citações. Mas o SEO técnico deles é péssimo.

Qualquer site novo com SEO técnico bem feito pode competir com a Apolar em buscas específicas de bairro e tipo de imóvel. Eles simplesmente não estão otimizados pra isso.

---

## Gonzaga Imóveis — A mais inteligente na estrutura

70+ anos de mercado, 8.000+ imóveis administrados. Recebe entre 10.000 e 30.000 visitas/mês. A Gonzaga tem o **melhor sitemap entre todos os concorrentes**: 2.638 URLs, incluindo **1.920 landing pages de bairro** geradas automaticamente.

Mas mesmo com essa estrutura, zero schema markup e renderização parcial no JavaScript fazem o site sub-performar. Ela mostra que ter muitas páginas não basta — precisa ter a tecnologia certa por trás.

---

## Avantti Construtora — Por que eles aparecem em primeiro

A Avantti é a **construtora** do Reserva Barigui, não uma imobiliária concorrente. Eles aparecem em primeiro para "Reserva Barigui" porque são os donos do empreendimento — o Google dá prioridade máxima pra isso.

Mas aqui vai um dado importante: **a Avantti recebe apenas ~1.924 visitas por mês**. Sem sitemap, blog com SSL quebrado, site que bloqueia bots. A presença digital deles é fraquíssima — aparecem em primeiro para o nome do próprio empreendimento por serem a construtora, não por mérito técnico.

E o mais relevante: **a Avantti NÃO aparece para buscas transacionais** como "Reserva Barigui apartamento à venda". Quem aparece são corretoras como Megahouse, Razzi e portais. Essa é exatamente a busca que traz o comprador — e é onde a FYMOOB pode entrar.

---

## A plataforma que "todos usam"

Você mencionou que todos os concorrentes usam a mesma empresa. Pelo que identifiquei, a maioria usa uma combinação de:

- **Rocket Imob** — um tema WordPress feito pra imobiliárias (usado por Razzi e JBA)
- **CUPOLA** — uma agência de marketing imobiliário de Curitiba com 90+ funcionários, faz o Summit anual com 2.000+ participantes. Possivelmente é quem gerencia a estratégia e os anúncios

Essas plataformas/agências usam **WordPress com jQuery e Bootstrap** — tecnologia de 2015. Funciona, mas tem um teto. As limitações que mostrei acima (guia de bairros não configurado, sem schema de imóvel, sem landing pages por bairro) são limitações da plataforma combinadas com falta de configuração. A Razzi e a JBA estão limitadas pelo que o Rocket Imob permite fazer — e pelo que não foi configurado.

---

## Números reais — Tráfego mensal de cada concorrente

| Concorrente | Visitas/mês | Rank Global | Há quanto tempo |
|-------------|-------------|-------------|-----------------|
| **Apolar** | ~160.000 | #99.713 | 55 anos |
| **JBA** | 30.000–80.000 | #307.160 | 30+ anos |
| **Gonzaga** | 10.000–30.000 | #620.521 | 70+ anos |
| **Razzi** | < 5.000 | #2.507.588 | ? |
| **Avantti** | ~1.924 | #6.443.360 | 20+ anos |
| **FYMOOB (hoje)** | ~5 | Não ranqueia | — |

*Fontes: SimilarWeb (Fev 2026), Semrush (Dez 2025)*

Olha o que esses números dizem:
- A **Apolar** tem 160K visitas, mas 70% é tráfego direto (gente digitando "apolar.com.br"). Tirando isso, são ~48K do Google. Em 55 anos de mercado.
- A **JBA** com "apenas" ~500 páginas reais consegue 30-80K visitas. Prova que SEO funciona quando bem feito.
- A **Razzi** — que você citou como exemplo — tem **menos de 5.000 visitas por mês**. Apesar de 530 posts no blog e 74 empreendimentos. O SEO deles é fraco.
- A **Avantti** (construtora do Reserva Barigui) tem **1.924 visitas**. Menos que praticamente todo mundo.

A conclusão: **aparecer para uma busca específica ("Reserva Barigui") não significa ter um site forte.** A Razzi aparece ali por causa de uma página bem feita, mas o site como um todo é fraco. Com a estratégia certa, a FYMOOB pode passar a Razzi em 6 meses.

---

## O que eu proponho fazer diferente

Em vez de usar uma plataforma pronta com as mesmas limitações de todos, eu proponho construir o site da FYMOOB com **tecnologia de ponta, sob medida para SEO imobiliário**:

### 1. Cada imóvel com dados estruturados para o Google
O que isso significa na prática: quando alguém busca "apartamento 3 quartos Batel", o Google pode mostrar o resultado da FYMOOB com **preço, número de quartos e área diretamente no resultado de busca** — antes da pessoa clicar. Nenhum concorrente seu em Curitiba tem isso hoje.

### 2. Uma página otimizada para cada bairro e tipo de imóvel
- "Imóveis no Batel" → página própria
- "Apartamentos no Batel" → página própria
- "Sobrados no Portão" → página própria
- E assim por diante para cada combinação válida

Cada página dessas é uma nova oportunidade de aparecer no Google. A Razzi tem zero dessas páginas — o recurso de guia de bairros da plataforma deles nunca foi configurado.

### 3. Site que carrega em 1-2 segundos
O Google prioriza sites rápidos desde 2021 (Core Web Vitals). WordPress com Rocket Imob tipicamente carrega em 3-5 segundos. O framework que eu uso (Next.js) gera páginas estáticas otimizadas que carregam muito mais rápido.

### 4. Sitemap correto e completo
Cada imóvel, cada bairro, cada tipo — tudo listado corretamente para o Google. Não é um detalhe: é o mapa que o Google usa pra encontrar suas páginas. Se o mapa está errado (como o da Razzi), o Google simplesmente não encontra.

### 5. Blog com conteúdo de verdade
Em vez de 456 posts genéricos como a Razzi, artigos profundos sobre bairros de Curitiba, financiamento, documentação — conteúdo que as pessoas realmente buscam e que posiciona a FYMOOB como autoridade.

---

## Onde está a oportunidade real

Os grandes portais (Viva Real, ZAP, OLX, Imovelweb) dominam as buscas genéricas como "apartamento à venda Curitiba". Isso não muda — eles investem milhões.

Mas para **buscas específicas e locais**, o cenário é aberto:

| Tipo de busca | Quem aparece hoje | Oportunidade |
|---------------|-------------------|-------------|
| "apartamento 3 quartos Batel" | Portais + algumas imobiliárias | Alta — nenhuma imobiliária local otimizada |
| "sobrado à venda Portão Curitiba" | Quase ninguém | Muito alta |
| "imóveis Ecoville Curitiba" | Portais | Alta — sem landing page local |
| "quanto custa morar no Batel" | Conteúdo genérico | Alta — blog otimizado ganha |
| "Reserva Barigui apartamento" | Avantti, Megahouse, Expert Brokers | Média — precisa de página dedicada |

São exatamente essas buscas que trazem o cliente mais qualificado — a pessoa que já sabe o bairro, o tipo de imóvel e a faixa de preço. Esse é o cliente que fecha.

### Referência de mercado
Um estudo de caso de SEO imobiliário no Brasil (Search Lab, 2026) mostrou **+268% em cliques orgânicos** em 12 meses com estratégia similar. SEO é um canal que, diferente de Google Ads, continua trazendo resultado mesmo quando você para de investir.

---

## Como verificar esses dados

Tudo que está nesse relatório é verificável. Você mesmo pode conferir:

- Acesse **razziimoveis.com.br/sitemap_index.xml** e veja o sitemap da Razzi
- Abra o código-fonte (Ctrl+U) de qualquer imóvel deles e procure por "RealEstateListing" — não vai encontrar
- Faça o mesmo no site da Apolar — o código-fonte é praticamente vazio
- Pesquise no SimilarWeb o tráfego de qualquer um dos sites mencionados

---

*Estou à disposição para tirar qualquer dúvida ou apresentar esses dados ao vivo.*

*Vinicius Lima*
*Tel: 41997277806*
