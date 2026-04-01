# Plano de Melhorias de Layout — FYMOOB
### Criado: 01/04/2026 | Baseado em: análise Playwright + referências UX (Airbnb, Zillow, QuintoAndar)

---

## Diagnóstico

Análise visual completa feita via Playwright MCP em desktop (1440x900) e mobile (390x844) nas páginas: Home, Busca, Imóvel, Landing Bairro, Landing Tipo e Blog.

---

## FASE A — Correções Críticas (Impacto imediato)

### A1. WhatsApp Float coberto pelo BottomNav no mobile
- **Problema:** `WhatsAppFloat` está em `bottom-6 right-6 z-50`, mesmo z-index do `BottomNav` (z-50 fixed bottom-0). No mobile, o BottomNav cobre o botão do WhatsApp.
- **Fix:** Adicionar `mb-safe` / ajustar bottom do WhatsApp quando BottomNav está visível (bottom-20 no mobile, bottom-6 no desktop).

### A2. AnimateOnScroll — itens começam invisíveis e podem falhar
- **Problema:** Itens com `opacity-0` dependem de IntersectionObserver que pode não disparar em certas condições (scroll rápido, viewport pequeno). Seções inteiras ficam invisíveis.
- **Fix:** Usar CSS `animation-fill-mode: both` com fallback. Adicionar `noscript` safety. Reduzir rootMargin negativo.

### A3. Busca — Grid mostra só 1 coluna no mobile
- **Problema:** No mobile, a busca mostra 1 card por vez com muito espaço em branco. Precisa mostrar mais conteúdo acima do fold.
- **Fix:** Cards mais compactos no mobile (aspect ratio menor, info condensada). Considerar layout horizontal (imagem esquerda, info direita) no mobile.

### A4. Busca — Paginação arcaica
- **Problema:** "Página 1 de 21" com botões Anterior/Próximo. Usuário precisa clicar 21 vezes.
- **Fix:** Implementar "Carregar mais" com botão + manter paginação para SEO (URL com ?page=). Considerar scroll infinito futuro.

### A5. Landing pages por tipo — Imagens não carregam
- **Problema:** `/apartamentos-curitiba` e similares mostram cards com imagens quebradas/não carregando.
- **Fix:** Verificar remotePatterns do next.config e CDN URLs. Garantir fallback para imagem placeholder.

---

## FASE B — Layout e Hierarquia Visual

### B1. Home — Stats Bar (Social Proof)
- **O que:** Barra de estatísticas logo abaixo do hero:
  ```
  249 imóveis disponíveis | 12 novos esta semana | 65 bairros
  ```
- **Referência:** QuintoAndar, Zillow — números criam confiança
- **Onde:** Entre o hero e "Vistos recentemente"

### B2. Home — Hero mobile mais compacto
- **Problema:** Hero ocupa 100dvh no mobile, empurrando todo conteúdo para baixo do fold
- **Fix:** No mobile, reduzir para `min-h-[70dvh]` ou `min-h-[80dvh]`

### B3. Home — Seções melhor espaçadas
- **Problema:** `py-20 md:py-28` entre seções cria gaps enormes
- **Fix:** Reduzir para `py-12 md:py-16` — mais conteúdo visível por scroll

### B4. Busca Desktop — Grid 4 colunas
- **Problema:** Grid 3 colunas em 1440px desperdiça espaço lateral
- **Fix:** Adicionar breakpoint `xl:grid-cols-4` no PropertyGrid

### B5. Cards Mobile — Layout horizontal compacto
- **Problema:** Cards verticais (imagem em cima, info embaixo) ocupam muito espaço vertical
- **Fix:** No mobile, opção de card horizontal (imagem à esquerda 40%, info à direita 60%)

### B6. Filtros Mobile — Chips ao invés de dropdowns ✅ IMPLEMENTADO
- **Problema:** Dropdowns de filtro ocupam muito espaço vertical no mobile
- **Fix:** Chips horizontais com scroll-x + botão "Filtros" abre bottom sheet. Bairros ordenados A-Z.

---

## FASE C — Retenção e Conversão

### C1. Badge "MAIS VISTO"
- Contador de views via localStorage (incrementa a cada visita à página do imóvel)
- Badge amber/orange no top 15% dos imóveis por views
- Regra: máximo 1 badge por card (NOVO > LANÇAMENTO > MAIS VISTO)

### C2. Contador "X pessoas viram este imóvel"
- Na página individual, mostrar "Y pessoas viram este imóvel hoje"
- Baseado em localStorage counter (simplificado) ou API futura
- Só mostra se count >= 5

### C3. Banner "Bem-vindo de volta"
- Detectar 2ª visita via localStorage timestamp
- Mostrar banner sutil: "Bem-vindo de volta! X novos imóveis desde sua última visita"
- Posicionar logo abaixo do hero

### C4. "Salvar busca"
- Botão ao lado dos filtros: "Salvar esta busca"
- Salva filtros no localStorage
- Na próxima visita: banner "Sua busca: Apartamentos no Batel até R$800k — Ver resultados"

### C5. Indicador temporal nos cards
- "Anunciado há X dias" baseado no DataCadastro
- Criar urgência real: "Há 2 dias" vs "Há 45 dias"

### C6. Stats Bar com dados reais
- Home: "249 imóveis | 38 novos este mês | 65 bairros"
- Dados vêm do getPropertyStats() já implementado

---

## FASE D — Polish e Micro-interações

### D1. Skeleton loaders em todas as transições
- Busca já tem SkeletonsGrid — garantir que home também tem
- Adicionar skeleton no loading.tsx de cada rota

### D2. Page transitions suaves
- Fade entre navegações de página
- Loading bar no topo (NProgress style)

### D3. Preço/m² comparativo (já previsto no sprint)
### D4. Mapa split-panel na busca (já previsto no sprint)
### D5. Comparador de imóveis (já previsto no sprint)

---

## Ordem de Implementação

1. **A1** — WhatsApp + BottomNav overlap (5 min)
2. **A2** — AnimateOnScroll fix (15 min)
3. **B2** — Hero mobile compacto (5 min)
4. **B3** — Espaçamento seções home (10 min)
5. **B1** — Stats bar home (20 min)
6. **B4** — Grid 4 colunas desktop busca (5 min)
7. **A3** — Cards compactos mobile (30 min)
8. **A4** — "Carregar mais" na busca (30 min)
9. **C5** — Indicador temporal cards (15 min)
10. **C6** — Stats com dados reais (10 min)
11. **C1** — Badge MAIS VISTO (20 min)
12. **C3** — Banner bem-vindo de volta (20 min)
13. **B6** — Filtros mobile chips (30 min)
14. **C4** — Salvar busca (30 min)
15. **D1** — Skeleton loaders (15 min)
