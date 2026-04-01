# Referências de UX — Melhores Sites Imobiliários
### Pesquisado em 30-31/03/2026

---

## Top 10 Padrões de UX que Funcionam em Real Estate

### 1. Search-First com Filtros Progressivos
Barra de busca proeminente no centro. Filtros com progressive disclosure — não mostra 20 filtros de uma vez. Zillow atualiza mapa em tempo real ao filtrar.

### 2. Mapa como UX Central (Split-Panel)
Zillow popularizou pins com preço no mapa. Redfin refinou com auto-refresh ao pan/zoom. "Draw on map" pra áreas customizadas.

### 3. Card Design Image-First
Todas plataformas top lideram com fotos grandes. Airbnb: carrossel swipeable nos cards sem precisar clicar.

### 4. Fotografia Emocional + White Space
Airbnb: deixar fotografia liderar. Interfaces bonitas são percebidas como mais funcionais (aesthetic-usability effect).

### 5. Elementos de Ação Sticky
CTAs "Contato" e "Salvar" sempre visíveis ao scrollar. Airbnb: "Reserve" sempre acessível (Fitts's Law).

### 6. Trust Architecture (Social Proof)
Airbnb: perfis de host e reviews verificadas. Redfin: precisão de dados (1.99% erro). Domain.com.au: histórico de preço.

### 7. Personalização e Estado Salvo
Wishlists/favoritos criam investimento emocional. QuintoAndar: favoritos sincronizados em tempo real. Alertas de queda de preço.

### 8. Exploração Primeiro (Não Transação)
Airbnb: não exige decisões imediatas. Mostra conteúdo curado e inspirador. Foot-in-the-Door principle.

### 9. Micro-Interações
Airbnb: formato "Lava" com ícones 3D. Coração pulsa ao salvar. Skeleton loaders suaves.

### 10. Experiência Mobile-Nativa
70%+ do browsing imobiliário é mobile. Bottom navigation (não hamburger), galerias swipeable, filter chips amigáveis ao polegar.

---

## O que o Airbnb Faz Diferente

- Vende o sonho, não o produto — branding emocional
- Listings humanos — "Hospedado por [Nome]" com fotos
- Modo exploração — abre com inspiração, não formulário de busca
- Redução de carga cognitiva — preço total, não por noite
- Progressive disclosure — opções suficientes mas não demais (Hick's Law)
- Information chunking — detalhes em seções claras (Law of Common Region)
- Consistência — padrões familiares de outras plataformas (Jakob's Law)

---

## Princípios de Psicologia Aplicáveis

| Princípio | Aplicação |
|-----------|----------|
| FOMO | "X pessoas viram este imóvel" / Badges "Novo" |
| Social Proof | Contadores de visualização, "Mais visitados" |
| Escarcity | Indicadores de disponibilidade limitada |
| Anchoring | Preço/m² vs média do bairro |
| Loss Aversion | "Um imóvel que você salvou baixou de preço" |
| Reciprocidade | Guias gratuitos, blog, conteúdo de valor |
| Aesthetic-Usability | Design bonito = percebido como mais confiável |
| Fitts's Law | Botões grandes e acessíveis ao polegar |
| Hick's Law | Filtros progressivos, coleções curadas |

---

## Técnicas de Social Proof

### View Counters
- "X pessoas viram este imóvel hoje" — mostrar se count >= 5
- "Visto X vezes esta semana" — janela de 7 dias

### Badges de Atividade
- `MAIS VISTO` — amber/orange, top 15% por views
- `NOVO` — verde, cadastrado há menos de 7 dias
- `OPORTUNIDADE` — vermelho, preço reduzido
- `EXCLUSIVO` — azul FYMOOB
- Regra: nunca mais de 1 badge por card

### Stats Bar (Homepage)
```
249 imóveis disponíveis | 38 vendidos este mês | 12 novos esta semana
```

---

## Técnicas de Urgência/Escarcity

- "Anunciado há X dias" — tempo relativo do DataCadastro
- "Apenas X apartamentos disponíveis no [Bairro]" — contagem real
- "Última unidade neste condomínio" — quando empreendimento tem 1
- "Visita disponível hoje" — badge pra imóveis prontos
- Mostrar só quando genuinamente verdadeiro (constrói confiança)

---

## Técnicas de Retenção

### Recently Viewed (localStorage)
```js
// Key: 'fymoob_recent' — max 8 itens, FIFO
{ codigo, slug, titulo, preco, foto, bairro, timestamp }
```
Strip horizontal "Você viu recentemente" na home e busca.

### Saved Search
Salvar filtros (bairro + tipo + preço) com "Salvar busca". Na volta: banner "Sua busca: Apartamentos no Batel até R$ 800k — Ver resultados".

### Return Visit Personalization
Na 2ª visita: "Bem-vindo de volta! X novos imóveis desde sua última visita"

---

## Design de Cards — Anatomia Ideal

```
┌─────────────────────────────┐
│  [BADGE top-left]    [♥ top-right]  │
│                                     │
│     IMAGE (16:9)                    │  ← zoom 105% no hover, 300ms
│                                     │
└─────────────────────────────┘
  R$ 850.000                          ← bold, maior
  Apto · 3 qts · 2 vagas · 89m²
  Batel, Curitiba
```

### Hover Effects (Tailwind)
- Image zoom: `group-hover:scale-105 transition-transform duration-300`
- Card lift: `hover:shadow-xl hover:-translate-y-1 transition-all duration-200`
- Arrows fade in: `opacity-0 group-hover:opacity-100`
- Foto auto-cycle: `setInterval` a cada 1.5s no `onMouseEnter`

---

## CTA Otimizado (Português BR)

| Contexto | Texto |
|----------|-------|
| Card | "Ver imóvel" |
| Detalhe — primário | "Quero visitar este imóvel" |
| Detalhe — secundário | "Falar com corretor" |
| WhatsApp | "Consultar pelo WhatsApp" |
| Home hero | "Ver imóveis disponíveis" |
| Bairro landing | "Ver apartamentos no [Bairro]" |

### Regras de Botão
- Primário: bg-[#29ABE2] text-white font-semibold px-6 py-3 rounded-lg
- Altura mínima: 44px no mobile
- Adicionar → ou ícone ao CTA (+6% click rate)

---

## Mobile

### Bottom Navigation (5 tabs max)
```
[🔍 Buscar] [♥ Favoritos(3)] [🏠 Início] [📋 Buscas] [☰ Menu]
```
- Sempre texto + ícone
- Active: azul #29ABE2

### Thumb Zone
- CTAs no bottom 60% da tela
- Primary CTA: fixed bottom full-width
- Fotos: swipe nativo com scroll-snap

---

## Design Emocional

### Fotografia
- Capa: sempre exterior ou sala principal (nunca cozinha/banheiro)
- Fotos de golden hour (tons quentes) testam 23% melhor
- Mostrar vida, não só espaço (luz natural, mesa arrumada)
- Ordem: exterior → sala → cozinha → quartos → banheiros → externa

### Cores
- #29ABE2 (FYMOOB blue): confiança, profissionalismo
- Amber/orange: urgência (badges)
- Emerald: positivo (preço reduzido — nunca vermelho pra preço)
- White space generoso = percepção premium

### Tipografia
- Preço: Poppins 28px bold
- Título: Poppins 18px semibold
- Specs: Inter 14px medium gray-500
- Body: Inter 16px leading-relaxed gray-700
- Badge: Inter 11px bold uppercase tracking-wide

---

## Sites de Referência

| Site | País | Destaque |
|------|------|----------|
| Airbnb | Global | UX de exploração, micro-interações |
| Zillow | EUA | Mapa + busca em tempo real |
| Redfin | EUA | Clean, rápido, dados precisos |
| QuintoAndar | Brasil | Transparência (endereço exato), UX mobile |
| Hemnet | Suécia | Design premiado, minimalista |
| Rightmove | UK | Comparador, filtros avançados |
| Domain.com.au | Austrália | Histórico de preço, perfil do imóvel |
| Imovelweb | Brasil | Referência visual do Bruno |
| Jota8 | Curitiba | Alto padrão, referência visual do Bruno |

---

*Fontes: AgentFire, Orbit Media, Webflow, ADPList, Raw.Studio, AlchemyLeads, Contempo Themes, Agent Image, FreeFrontend, Prismic, TrangoTech, Arounda, Lifestyle Production Group*
