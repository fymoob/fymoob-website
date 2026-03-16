# Frontend Design System — FYMOOB Essencial

## Stack de UI
- **Component Library:** shadcn/ui (Radix primitives + Tailwind CSS)
- **Icons:** Lucide React
- **Fontes:** Poppins (headings + nav) + Inter (body)
- **Abordagem:** Mobile-first, Server Components por padrão

## Filosofia de Design
Réplica fiel da identidade visual atual do fymoob.com.
Azul sky como cor principal, fundo branco limpo, cards com sombra sutil.
Títulos de seção em itálico bold azul. Estilo clean, corporativo, confiável.
O objetivo é manter a identidade reconhecível mas com engine SEO novo.

## Instalação shadcn/ui
```bash
npx shadcn@latest init
# Estilo: New York, cor base: Slate, CSS variables: yes
npx shadcn@latest add button card input select badge separator
npx shadcn@latest add dialog sheet carousel tabs accordion
npx shadcn@latest add form label textarea breadcrumb
npx shadcn@latest add dropdown-menu navigation-menu skeleton
```

## Design Tokens

### Cores (extraídas do site atual fymoob.com)
```css
@layer base {
  :root {
    /* Brand FYMOOB */
    --fymoob-blue: 197 78% 53%;          /* #29ABE2 - cor principal, logo, links, títulos */
    --fymoob-blue-dark: 200 72% 44%;     /* #1A8FC4 - botões, hover */
    --fymoob-blue-light: 197 78% 93%;    /* #E0F4FC - badges fundo, highlights */
    --fymoob-green: 145 62% 49%;         /* #25D366 - WhatsApp */
    --fymoob-gray-dark: 0 0% 20%;        /* #333333 - texto principal */
    --fymoob-gray-mid: 0 0% 40%;         /* #666666 - texto secundário */
    --fymoob-gray-light: 0 0% 90%;       /* #E5E5E5 - bordas */
    --fymoob-bg-alt: 0 0% 96%;           /* #F5F5F5 - fundo alternativo seções */

    /* Mapeamento shadcn/ui */
    --background: 0 0% 100%;             /* Branco puro — site atual usa branco */
    --foreground: 0 0% 20%;              /* #333 */
    --muted: 0 0% 96%;                   /* #F5F5F5 */
    --muted-foreground: 0 0% 40%;        /* #666 */
    --border: 0 0% 90%;                  /* #E5E5E5 */
    --card: 0 0% 100%;                   /* Branco */
    --card-foreground: 0 0% 20%;

    /* Ações */
    --primary: 197 78% 53%;              /* Azul FYMOOB = primary */
    --primary-foreground: 0 0% 100%;     /* Branco */
    --secondary: 200 72% 44%;            /* Azul escuro = secondary */
    --secondary-foreground: 0 0% 100%;
    --accent: 197 78% 93%;               /* Azul light */
    --accent-foreground: 197 78% 53%;
    --destructive: 0 72% 51%;

    /* Status de imóvel (badges no site atual) */
    --status-apartment: 197 78% 53%;     /* Azul FYMOOB — "Apartamento" */
    --status-sale: 145 62% 49%;          /* Verde — "Venda" */
    --status-code: 200 72% 44%;          /* Azul escuro — código */

    --radius: 0.5rem;
  }
}
```

### Tailwind Config
```typescript
// tailwind.config.ts
{
  theme: {
    extend: {
      colors: {
        fymoob: {
          blue: "hsl(var(--fymoob-blue))",
          "blue-dark": "hsl(var(--fymoob-blue-dark))",
          "blue-light": "hsl(var(--fymoob-blue-light))",
          green: "hsl(var(--fymoob-green))",
          "gray-dark": "hsl(var(--fymoob-gray-dark))",
          "gray-mid": "hsl(var(--fymoob-gray-mid))",
          "gray-light": "hsl(var(--fymoob-gray-light))",
          "bg-alt": "hsl(var(--fymoob-bg-alt))",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      }
    }
  }
}
```

### Tipografia (replicando o site atual)
| Elemento | Font | Tamanho | Peso | Extra |
|----------|------|---------|------|-------|
| H1 (hero) | Poppins | text-4xl md:text-5xl | font-bold | italic text-white |
| H2 (seção) | Poppins | text-2xl md:text-3xl | font-bold | italic text-fymoob-blue |
| H3 (subtítulo seção) | Inter | text-base | font-normal | text-fymoob-gray-mid |
| H3 (card title) | Inter | text-base | font-bold | text-fymoob-gray-dark |
| Body | Inter | text-base | font-normal | text-fymoob-gray-dark |
| Small/caption | Inter | text-sm | font-normal | text-fymoob-gray-mid |
| Preço destaque | Inter | text-xl md:text-2xl | font-bold | text-fymoob-blue |
| Preço card | Inter | text-base | font-bold | text-fymoob-gray-dark |
| Badge | Inter | text-xs | font-medium | bg-fymoob-blue text-white px-3 py-1 rounded |
| Nav links | Poppins | text-sm | font-medium | text-fymoob-blue hover:text-fymoob-blue-dark |

## Layout System

### Containers
```tsx
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">   // padrão (site usa ~1200px)
<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">   // estreito (blog)
```

### Grids
```tsx
// Cards de destaque — carousel horizontal (1 card grande por vez)
// Imagem à esquerda, info à direita
<div className="flex gap-0">
  <div className="w-1/2">{/* imagem */}</div>
  <div className="w-1/2 p-6">{/* info */}</div>
</div>

// Grid de busca — 4 colunas
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

// Grid de lançamentos — 4 colunas carousel
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
```

### Espaçamentos
```
Seções home: py-12 md:py-16
Seções internas: py-8 md:py-12
Gap entre cards: gap-4
Cards: shadow-sm hover:shadow-md (sombra sutil)
```

## Component Patterns

### Header (réplica exata)
```
┌──────────────────────────────────────────────────────────┐
│  [LOGO fymoob]  Home  Sobre nós  Buscar  Anunciar  Contato  📞 (41)99978-0517  ⋮⋮⋮ │
└──────────────────────────────────────────────────────────┘
```
- Fundo: `bg-white` fixo (não muda com scroll)
- Logo: imagem do logo FYMOOB (azul "fy" + preto "moob") salvo em `public/logo.png`
- Nav links: `font-display text-sm font-medium text-fymoob-blue hover:text-fymoob-blue-dark`
- "Home" em preto quando ativo: `text-fymoob-gray-dark`
- Telefone: `text-fymoob-gray-dark` com ícone WhatsApp verde
- Menu grid (⋮⋮⋮): dropdown com "Área do Cliente", "Favoritos", "Comparar"
- Borda inferior: `border-b border-fymoob-gray-light`
- Mobile: Sheet com menu vertical

### Hero (réplica exata)
```
┌──────────────────────────────────────────────────────────┐
│  bg-image (foto aérea Curitiba) com overlay escuro sutil  │
│                                                            │
│     Encontre seu imóvel ideal                             │  ← Poppins italic bold text-white
│                                                            │
│  ┌──────────────────────────────────────────────────┐     │
│  │ O que deseja? ▾ │ Cidade ▾ │ Bairro ▾ │ Tipo ▾  │     │  ← bg-white rounded-xl shadow-xl
│  │                              [    Buscar    ]     │     │  ← bg-fymoob-blue text-white rounded-full
│  └──────────────────────────────────────────────────┘     │
│                                                            │
│     🔍 Buscar por código                                  │  ← text-white text-sm
│                                                            │
└──────────────────────────────────────────────────────────┘
```
- Overlay: `bg-black/30`
- Imagem de fundo: foto aérea de Curitiba (Barigüi ou similar)
- Search bar: `bg-white rounded-xl shadow-xl p-6` com selects em linha
- Botão buscar: `bg-fymoob-blue hover:bg-fymoob-blue-dark text-white rounded-full px-8 py-3`

### Seções da Home (réplica exata)
```
Oportunidade de hoje                    Veja mais     ← H2 italic bold azul + link azul
Imóveis em destaque                                   ← H3 cinza

┌─────────────────────┬───────────────────────────┐
│  [IMAGEM grande]    │  Cód: AP00943             │   ← Carousel destaque
│  com setas < >      │  Apartamento              │      imagem esquerda + info direita
│                     │  Ecoville - Curitiba / PR  │
│                     │  R$ 1.307.367,00           │
│                     │  Descrição curta...         │
│                     │  📐87m² 🛏3 🚿2 🚗1       │
└─────────────────────┴───────────────────────────┘

Destaques de lançamento                 Veja mais
Os melhores imóveis para investir

┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│ card │  │ card │  │ card │  │ card │    ← Grid 4 colunas
│ foto │  │ foto │  │ foto │  │ foto │       com carousel por card
│ info │  │ info │  │ info │  │ info │
└──────┘  └──────┘  └──────┘  └──────┘
```

### PropertyCard — Grid (réplica exata)
```
┌─────────────────────────────┐
│  [IMAGEM aspect-[4/3]]      │
│  Overlay topo:               │
│    [Cód: 69804095]  [Comparar] [♡] │  ← badges azuis sobre imagem
│  Setas < > centralizadas     │
├─────────────────────────────┤
│  Sobrado                     │  ← text-sm text-fymoob-gray-mid
│  Sobrado com 3 quartos à...  │  ← text-base font-bold text-fymoob-gray-dark
│  Santa Quitéria, Curitiba    │  ← text-sm text-fymoob-gray-mid
│                              │
│  R$ 945.000,00               │  ← text-base font-bold text-fymoob-gray-dark
│                              │
│  Descrição curta...          │  ← text-sm text-fymoob-gray-mid line-clamp-2
│                              │
│  📐  🛏  🚿  🚗              │  ← ícones azuis com valores abaixo
│  87m² 3   2   1              │
└─────────────────────────────┘
```
- Card: `bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow`
- Badge código: `bg-fymoob-blue text-white text-xs px-2 py-1 rounded`
- Botão comparar: `bg-white text-fymoob-gray-dark text-xs px-2 py-1 rounded`
- Coração favorito: `text-fymoob-blue` com fundo azul claro
- Ícones de features: cor azul `text-fymoob-blue`

### Página de Imóvel (réplica exata)
```
┌──────────────────────────────────────────────────┐
│ Home > Buscar imóvel > Apartamento com 39m²...    │  ← breadcrumb text-sm
│                                                    │
│ [Apartamento] [Venda] [Cód: 69805503]            │  ← badges azuis
│                                                    │
│ Apartamento com 39 m², no bairro Cachoeira       │  ← text-2xl font-bold
│ 📍 David Bodziak, 200, Cachoeira, Curitiba - PR  │  ← text-sm cinza
│                                         R$ 155.000│  ← text-2xl font-bold text-fymoob-blue
│                         Compartilhar | Favorito   │
├────────────────────────┬─────────────────────────┤
│ [GALERIA]              │  [Ligar]  [WhatsApp]    │
│ Carousel com setas     │                          │
│ + thumbnails abaixo    │  Valor venda             │
│                        │  R$ 155.000,00           │
│                        │  Condomínio R$ 350,00    │
│                        │                          │
│                        │  Proposta                │
│                        │  Nome                    │
│                        │  Email                   │
│                        │  Telefone                │
│                        │  Dúvidas                 │
│                        │  [Enviar]                │
├────────────────────────┘                          │
│ Características (accordion)                       │
│ Mapa do imóvel (Leaflet/OpenStreetMap)            │
└──────────────────────────────────────────────────┘
```
- Layout: `grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8`
- Sidebar: `sticky top-20` (sem borda, fundo branco)
- Botão Ligar: `bg-fymoob-blue text-white rounded-lg px-6 py-3`
- Botão WhatsApp: `bg-fymoob-green text-white rounded-lg px-6 py-3`
- Botão Enviar: `bg-fymoob-blue text-white rounded-lg w-full py-3`
- Badges: `bg-fymoob-blue text-white text-xs rounded px-3 py-1`
- Preço: `text-fymoob-blue text-2xl font-bold`
- Seções accordion: "Características", "Mapa do imóvel" com chevron

### Footer (réplica exata)
```
┌──────────────────────────────────────────────────┐
│ bg-fymoob-blue h-1 (faixa azul fina)              │
├──────────────────────────────────────────────────┤
│ bg-white py-12                                     │
│                                                    │
│ [LOGO]  Texto boas-vindas    FYMOOB         Nav    │
│         com emojis 🌟🏠🔑    CRECI: J 9420  Home  │
│                              Telefones       Sobre │
│                              Email           Buscar│
│                              Endereço        etc.  │
│                                                    │
│ ──────────────────────────────────────────────     │
│ [Selo Loft] Imobiliária Certificada     [FB][IG][TT]│
└──────────────────────────────────────────────────┘
```
- Faixa azul fina no topo: `h-1 bg-fymoob-blue`
- Grid 4 colunas
- Títulos seção footer: `text-fymoob-blue font-bold`
- Links: `text-fymoob-gray-mid hover:text-fymoob-blue text-sm`
- Redes sociais: ícones cinza com hover azul
- Selo Loft: imagem do selo de certificação

### Busca / Listagem (réplica exata)
```
┌──────────────────────────────────────────────────┐
│ [🔽 Filtrar]  12 imóveis de 244   Ordenar por ▾  [⊞][≡] │
│                                                    │
│ Grid 4 colunas ou lista (toggle)                  │
│ PropertyCards com carousel individual             │
└──────────────────────────────────────────────────┘
```
- Filtrar: botão outline com ícone
- Toggle grid/lista: ícones à direita
- Ordenação: select dropdown

### WhatsApp Flutuante
```
position: fixed bottom-6 right-6
bg-[#25D366] rounded-full p-4 shadow-lg
ícone WhatsApp branco
badge vermelho com contador
z-50
```

## Regras de Design

### FAZER
- Manter a identidade azul (#29ABE2) em todos os elementos interativos
- Títulos de seção: sempre Poppins italic bold em azul
- Cards com sombra sutil, sem borda visível
- Botões primários sempre azul com texto branco e rounded-full
- Badges de status sempre azuis (apartamento, venda, código)
- Fundo branco puro como base (site atual usa branco)
- Alternar seções com fundo `#F5F5F5` para separação visual
- Ícones de features (quartos, vagas, etc.) em azul

### NÃO FAZER
- Nunca mudar o azul principal — é a identidade da marca
- Nunca usar sombras pesadas — sempre sutil (shadow-sm / shadow-md)
- Nunca usar borders grossas — borders finos ou sem borda
- Nunca usar fontes serif
- Nunca esconder o WhatsApp flutuante — é canal principal de leads

## Server vs Client Components
| Componente | Tipo | Motivo |
|------------|------|--------|
| PropertyCard | Server | Só renderiza dados |
| PropertyGrid | Server | Lista de cards |
| PropertyGallery | Client | Carousel + lightbox |
| SearchFilters | Client | Interação filtros |
| PropertyContact | Client | Formulário proposta |
| PropertyMap | Client | Leaflet mapa |
| Header | Client | Menu mobile Sheet |
| Breadcrumbs | Server | Links estáticos |
| OptimizedImage | Server | Wrapper Next Image |
| WhatsAppFloat | Client | Botão flutuante fixo |

## Estrutura de componentes
```
src/components/
├── ui/                    ← shadcn/ui (CLI)
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Container.tsx
│   └── WhatsAppFloat.tsx
├── property/
│   ├── PropertyCard.tsx
│   ├── PropertyCardFeatured.tsx   ← card grande destaque (imagem+info lado a lado)
│   ├── PropertyGallery.tsx
│   ├── PropertyDetails.tsx
│   ├── PropertyDescription.tsx
│   ├── PropertyContact.tsx        ← form de proposta (sidebar)
│   ├── PropertyMap.tsx            ← Leaflet/OpenStreetMap
│   ├── PropertyCharacteristics.tsx ← accordion de características
│   └── SimilarProperties.tsx
├── search/
│   ├── SearchFilters.tsx
│   ├── SearchBar.tsx              ← barra do hero (4 selects + botão)
│   ├── PropertyGrid.tsx
│   └── BairroCard.tsx
├── seo/
│   ├── Breadcrumbs.tsx
│   ├── JsonLd.tsx
│   └── OptimizedImage.tsx
└── shared/
    ├── WhatsAppButton.tsx
    ├── PriceDisplay.tsx
    ├── PropertyBadge.tsx
    └── PropertyFeatures.tsx       ← ícones de quartos/vagas/área
```

## Assets
- Logo: `public/logo.png` — logo FYMOOB (azul "fy" quadrado + "moob" preto)
- Imagem hero: `public/hero-curitiba.jpg` — foto aérea de Curitiba (Barigüi)
- Selo Loft: `public/selo-loft.png` — selo de certificação Loft
- Favicon: extrair do site atual ou recriar com o "fy" azul