# FYMOOB — Design System & Visual Upgrade Tasks

> Documento de referência para elevar o visual da demo de "funcional" para "premium".
> Usar como contexto em sessões do Claude Code.

---

## 1. Paleta de Cores

### Filosofia
Manter o azul FYMOOB `#29ABE2` como cor de marca (accent/CTAs), mas construir uma paleta mais sofisticada ao redor. O azul atual é vibrante — funciona como ponto de energia, mas o site precisa de tons âncora mais profundos para transmitir confiança e premium.

### Tokens de Cor

```css
:root {
  /* ── Brand ── */
  --brand-primary: #29ABE2;         /* Azul FYMOOB — CTAs, links, badges, destaques */
  --brand-primary-hover: #1E95C9;   /* Hover do primary */
  --brand-primary-light: #E8F7FC;   /* Backgrounds sutis, tags, chips */
  --brand-primary-muted: #B3E0F2;   /* Bordas, separadores com cor */

  /* ── Neutros (âncora visual) ── */
  --neutral-950: #0B1120;           /* Hero overlay, footer bg, textos fortes */
  --neutral-900: #111827;           /* Navbar bg, cards dark */
  --neutral-800: #1F2937;           /* Backgrounds secundários dark */
  --neutral-700: #374151;           /* Texto secundário em dark */
  --neutral-600: #4B5563;           /* Texto body secondary */
  --neutral-500: #6B7280;           /* Placeholders, meta text */
  --neutral-400: #9CA3AF;           /* Ícones desabilitados */
  --neutral-300: #D1D5DB;           /* Bordas */
  --neutral-200: #E5E7EB;           /* Dividers, bordas sutis */
  --neutral-100: #F3F4F6;           /* Card backgrounds */
  --neutral-50: #F9FAFB;            /* Page background */

  /* ── Semânticas ── */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;

  /* ── Superfícies ── */
  --surface-page: #FFFFFF;
  --surface-elevated: #FFFFFF;
  --surface-sunken: var(--neutral-50);
  --surface-overlay: rgba(11, 17, 32, 0.7);  /* Hero overlay */
}
```

### Regras de uso
- `--brand-primary` APENAS em: botões primários, links, ícones de destaque, badges, barra de progresso
- `--neutral-950` como cor dominante de texto e overlays (60% do peso visual)
- NUNCA banhar seções inteiras em `--brand-primary` — usar como acento cirúrgico
- Cards: fundo branco, borda `--neutral-200`, hover com `shadow-lg` + borda `--brand-primary-muted`
- Seções alternadas: branco → `--neutral-50` → branco

---

## 2. Tipografia

### Fontes
- **Display/Headings:** `Plus Jakarta Sans` (weight 600-800) — moderna, geométrica, premium
  - CDN: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap`
- **Body:** `Inter` (weight 400-500) — limpa, legível, profissional
  - Já disponível via `next/font`
- **Alternativa se quiser manter Poppins:** OK, mas trocar o body de Inter para `DM Sans` para melhor pairing

### Escala tipográfica

```
Hero title:     text-5xl md:text-6xl lg:text-7xl  font-extrabold  tracking-tight  leading-[1.05]
Page title:     text-3xl md:text-4xl               font-bold       tracking-tight
Section title:  text-2xl md:text-3xl               font-bold       tracking-tight
Card title:     text-lg md:text-xl                  font-semibold
Body large:     text-lg                             font-normal     leading-relaxed
Body:           text-base                           font-normal     leading-relaxed
Small/Meta:     text-sm                             font-medium     text-neutral-500
Caption:        text-xs                             font-medium     uppercase tracking-wider
```

### Regras
- Hero: SEMPRE `tracking-tight` + `leading-[1.05]` para headline impactante
- Nunca usar `font-light` — mínimo `font-normal` (400)
- Meta info (data, código, bairro): `uppercase tracking-wider text-xs font-medium`
- Preço: `text-2xl font-bold text-brand-primary`

---

## 3. Layout & Espaçamento

### Grid
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Grid de cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`

### Espaçamento entre seções
```
Section padding:  py-20 md:py-28 lg:py-32    (NUNCA menos que py-16)
Entre seções:     gap mínimo visual de 80px
Dentro de cards:  p-5 md:p-6
Card gap:         gap-6 lg:gap-8
```

### Regras
- Cada seção deve "respirar" — se parecer apertado, aumentar o padding
- Hero: min-height de `min-h-[85vh]` ou `min-h-[600px]`
- Seções de listagem: fundo alternado (branco / neutral-50)

---

## 4. Componentes — Padrões Visuais

### Hero (Home)
```
- Background: imagem real de imóvel de luxo (Curitiba skyline ou interior)
- Overlay: gradient de neutral-950 (70% opacity left → 20% right)
  background: linear-gradient(135deg, rgba(11,17,32,0.85) 0%, rgba(11,17,32,0.4) 100%)
- Título: text-white text-5xl md:text-7xl font-extrabold tracking-tight
- Subtítulo: text-neutral-300 text-lg md:text-xl max-w-2xl
- Search form: backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6
  Inputs dentro: bg-white/90 rounded-xl
- Botão buscar: bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl
```

### Cards de Imóvel
```
- Container: bg-white rounded-2xl overflow-hidden border border-neutral-200
- Hover: shadow-xl -translate-y-1 border-brand-primary-muted (transition-all duration-300)
- Imagem: aspect-[4/3] object-cover com overlay gradient bottom para texto
- Badge tipo: absolute top-3 left-3, bg-brand-primary text-white text-xs font-semibold px-3 py-1 rounded-full
- Badge código: absolute top-3 right-3, bg-neutral-950/60 backdrop-blur text-white text-xs px-2 py-1 rounded-md
- Preço: text-xl font-bold text-brand-primary
- Localização: text-sm text-neutral-500 com ícone MapPin
- Specs (m², quartos, vagas): flex gap-4, cada com ícone + text-sm text-neutral-600
```

### Cards de Blog
```
- Imagem: aspect-[16/9] rounded-xl overflow-hidden
- Tag/categoria: text-xs font-semibold uppercase tracking-wider text-brand-primary
- Título: text-lg font-semibold text-neutral-900 hover:text-brand-primary transition
- Data: text-sm text-neutral-500
- Hover na imagem: scale-105 transition-transform duration-500
```

### Navbar
```
- Fixa: sticky top-0 z-50
- Fundo: bg-white/80 backdrop-blur-xl border-b border-neutral-200/50
- Logo: h-8 ou h-10
- Links: text-sm font-medium text-neutral-600 hover:text-brand-primary transition
- CTA (telefone): bg-brand-primary text-white rounded-full px-4 py-2 text-sm font-semibold
```

### Footer
```
- Background: bg-neutral-950
- Texto: text-neutral-400
- Links hover: text-white transition
- Divider: border-neutral-800
```

---

## 5. Efeitos & Micro-interações

### Animações de entrada (scroll)
```css
/* Usar Intersection Observer ou framer-motion */
/* Fade up com stagger */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Aplicar com delay escalonado em grids */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}
```

### Hover states
- Cards: `transition-all duration-300 hover:shadow-xl hover:-translate-y-1`
- Imagens dentro de cards: `transition-transform duration-500 group-hover:scale-105`
- Botões: `transition-all duration-200 hover:shadow-lg active:scale-[0.98]`
- Links: `transition-colors duration-200`

### Glass effects (search form no hero)
```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
}
```

### Smooth scroll
```css
html { scroll-behavior: smooth; }
```

---

## 6. Imagens

### Cards de imóvel — foto errada
Os cards estão exibindo a logo da FYMOOB ao invés da foto real do imóvel.
Corrigir o fallback: se `FotoDestaque` retornar a logo ou imagem genérica, 
usar a primeira foto do array `fotos[]` do imóvel. Verificar em 
`src/services/loft.ts` ou no componente de card qual campo está sendo usado.

### Hero
Imagem estática em public/images/hero-bg.jpg (commitar manualmente).
Estilo: interior de imóvel de luxo, widescreen, tons neutros.
Overlay via CSS:
  background: linear-gradient(135deg, rgba(11,17,32,0.85) 0%, rgba(11,17,32,0.4) 100%)
Usar <Image /> com priority, fill, object-cover.

### Blog
Adicionar imagens reais de Curitiba aos artigos existentes.
Todas via <Image /> do Next.js com sizes e priority no hero.
```

E no Sprint 3 da seção 7, troca a task de "placeholder visual quando sem foto" por:
```
✅ Card de imóvel: corrigir lógica de foto — usar fotos[0] quando FotoDestaque for a logo

---

## 7. Implementação — Sprints de Tasks

### Sprint 1: Fundação Visual (Tipografia + Cores + Spacing)
```
✅ Atualizar globals.css com CSS variables da paleta
✅ Trocar fonte de heading para Plus Jakarta Sans (ou manter Poppins, ajustar weights)
✅ Padronizar escala tipográfica em todas as páginas
✅ Aumentar padding entre seções (py-20 md:py-28 mínimo)
✅ Navbar: aplicar backdrop-blur + sticky + estilos refinados
✅ Footer: bg-neutral-950 com layout refinado
✅ Verificar contraste WCAG em todas as combinações de cor
```

### Sprint 2: Hero & Home
```
✅ Hero: adicionar imagem de fundo real com overlay escuro (gradient)
✅ Hero: tipografia bold (text-5xl md:text-7xl tracking-tight)
✅ Hero: search form com glass effect (backdrop-blur-xl bg-white/10 border-white/20 rounded-2xl, inputs bg-white/90 rounded-xl)
✅ Hero: min-height 85vh
✅ Seção "Oportunidade de hoje": card maior, destaque visual
✅ Seção "Destaques de lançamento": cards com hover effect
✅ Seção "Bairros em destaque": cards com animação stagger fade-in-up
✅ Seção "Buscar por tipo": ícones + hover elegante
✅ Seção "Blog": preview com imagens reais (BlogCard com aspect-[16/9], tags, hover scale)
✅ Implementar fade-in-up nas seções ao scroll (IntersectionObserver + CSS stagger, sem framer-motion)
```

### Sprint 3: Cards & Páginas de Imóvel
```
✅ Card de imóvel: rounded-2xl + shadow hover + badge de tipo
✅ Card de imóvel: corrigir lógica de foto — usar fotos[0] quando FotoDestaque for a logo
✅ Card: hover com -translate-y-1 + shadow-xl + border accent
✅ Imagem no card: group-hover:scale-105 com overflow-hidden
✅ Página de detalhes do imóvel: galeria navegável, breadcrumb com BreadcrumbList schema, CTA fixo mobile (WhatsApp + telefone), sidebar com formulário no desktop, design system aplicado em todos os componentes
✅ Landing pages por bairro: hero dark com título + descrição SEO do bairro, stats cards, filtros por tipo, grid de imóveis, seção de conteúdo para indexação
```

### Sprint 4: Blog & Polish
```
✅ Blog listing: hero dark, grid responsivo com imagens reais, tags uppercase tracking-wider, hover scale-105, fade-in-up stagger
✅ Blog post: hero image full-width aspect-[21/9] rounded-2xl, tipografia editorial (prose max-w-3xl, Plus Jakarta Sans headings)
✅ Blog post: table of contents lateral sticky (desktop, hidden mobile) com IntersectionObserver active state
✅ Imagens reais nos 5 artigos existentes (public/blog/*.jpg referenciadas no frontmatter MDX)
✅ Smooth scroll global
✅ Loading states elegantes (skeleton shimmer animate-pulse em busca e blog)
✅ 404 page com design premium (404 grande, botoes Home + Busca)
✅ Favicon (icon.svg) e og:image (edge runtime, OG dinâmico com branding FYMOOB)
✅ MDX components migrados para design system (neutral-*, brand-primary)
✅ RelatedPosts migrado para design system
```

## 8. Sobre mexer na identidade da marca

### O que NÃO mudar
- Cor `#29ABE2` — é o azul da logo, do WhatsApp, dos portais. Manter intacta.
- Logo — usar a original do site (SVG já existe em `/public/logo.svg`)
- Nome/CRECI — manter exatamente como está

### O que PODE melhorar (sem distorcer)
- **Tom dos neutros:** trocar cinzas genéricos por neutros com leve undertone azul (como os `--neutral-*` acima) — harmoniza com a marca sem parecer diferente
- **Intensidade do azul no site:** REDUZIR a quantidade de azul. Hoje o azul domina demais — ele deve ser acento, não protagonista
- **Tipografia:** trocar para uma mais moderna e premium. A marca é a logo, não a fonte do site
- **Espaçamento e respiro:** aumentar dramaticamente. Sites premium = muito espaço branco
- **Fotografia:** esse é o maior upgrade possível. Fotos reais > qualquer efeito CSS