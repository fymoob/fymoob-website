# FYMOOB — Solicitacoes do Bruno

> Solicitacoes de alteracao feitas pelo cliente (Bruno).
> Atualizado: 2026-04-06
> **Total: 21 solicitacoes** | ACEITO: 4 | AVALIAR: 17 | Implementadas: 17/21 (81%)

---

## Legenda

- `[ ]` — Pendente
- `[x]` — Implementado
- **ACEITO** — Troca de informacao simples, sem impacto em componentes
- **AVALIAR** — Mudanca em componente/layout, precisa analisar impacto

---

## Solicitacoes

<!-- Formato:
- [ ] **Descricao da solicitacao**
  - Tipo: ACEITO | AVALIAR
  - Comentario: [analise de impacto, se vale a pena, se vai ficar melhor]
-->

### 1. Alterar cargos da Diretoria (pagina /sobre) ✅
- [x] Bruno Cesar de Almeida: "CEO e Socio-fundador" → **"Socio e Responsavel tecnico"**
- [x] Wagner Spessatto: "Socio-diretor" → **"Socio"**
  - Tipo: **ACEITO** (troca de informacao)
  - Comentario: Texto simples, sem impacto em layout ou componentes.
  - Implementacao: Editar array `equipe` em `src/app/sobre/page.tsx` (linhas 49-52). Trocar strings `cargo`.

### 2. Alterar horario de atendimento (pagina /contato e /sobre) ✅
- [x] "Seg-Sex 9h as 18h | Sab 9h as 13h" → **"Seg-Sex 8h30 as 17h | Sab 9h as 13h"**
  - Tipo: **ACEITO** (troca de informacao)
  - Comentario: Texto simples. Verificar se aparece tambem no footer, JSON-LD LocalBusiness e schema Organization — atualizar em todos os locais.
  - Implementacao: 5 arquivos — (1) `src/app/contato/page.tsx` linha 59, (2) `src/components/layout/Footer.tsx` linha 76, (3) `src/lib/seo.ts` linhas 65+418 (JSON-LD opens 09:00→08:30, closes 18:00→17:00), (4) `src/data/faq-data.ts` linha 25.

### 3. Adicionar mini-curriculo na secao Diretoria (pagina /sobre) ✅
- [x] Expandir cards da diretoria com: formacao, anos de experiencia, especializacoes
  - Tipo: **AVALIAR**
  - Comentario: **Vale muito a pena.** Reforça E-E-A-T (Experience, Expertise, Authority, Trust) — fator direto de ranking no Google. Mostra credibilidade para o visitante que esta decidindo confiar o imovel. Impacto no componente: expandir o card atual (que so tem nome + cargo + avatar placeholder) para incluir 2-3 linhas de bio. Mudanca pequena em layout, grande em percepcao de valor. **Depende do Bruno enviar os dados** (formacao, CRECI, anos de mercado, especializacao de cada socio).

### 4. Trocar "Avaliacao gratuita" por "Avaliacao profissional" (pagina /anuncie) ✅
- [x] Hero subtitle: "Avaliacao gratuita" → **"Avaliacao profissional"**
- [x] Card beneficio: "Avaliacao de mercado gratuita" → **"Avaliacao de mercado profissional"**
- [x] Metadata description: "Avaliacao gratuita" → **"Avaliacao profissional"**
  - Tipo: **ACEITO** (troca de informacao)
  - Comentario: Faz sentido comercial — existem casos que cobram pela avaliacao. Manter "gratuita" poderia gerar expectativa errada no cliente. Troca de texto simples, sem impacto em layout.
  - Implementacao: `src/app/anuncie/page.tsx` — 3 pontos: linha 20 (metadata), linha 78 (card title), linha 125 (hero bold text). Trocar "gratuita" → "profissional".

### 5. Remover promessa de "24 horas" no anuncio (pagina /anuncie + /contato) ✅
- [x] Card: "Anuncio em 24 horas" → **"Agilidade na publicacao"**
- [x] Descricao: "publicado em menos de 24 horas" → **"publicado o mais rapido possivel"**
- [x] Stats bar: "24h Para publicar" → **"Agil / Publicacao rapida"**
- [x] Contato: "Respondemos em ate 24 horas" → **"Respondemos o mais rapido possivel"**
  - Tipo: **ACEITO** (troca de informacao)
  - Comentario: Correto comercialmente — prometer 24h pode gerar cobranca do cliente se atrasar. Melhor manter vago sem comprometer prazo fixo.
  - Implementacao: `src/app/anuncie/page.tsx` — linhas 66 (card title), 68 (card desc), 135 (stats). `src/app/contato/page.tsx` — linha 48.

### 6. Filtro de bairros: mostrar apenas bairros com imoveis ativos (SearchBar / QuickSearch) ✅
- [x] Remover bairros sem imoveis da lista de selecao (hoje mostra todos, inclusive vazios)
- [x] Agrupar bairros por cidade (Curitiba, Sao Jose dos Pinhais, etc.)
- [x] Ao selecionar uma cidade, mostrar apenas bairros daquela cidade
  - Tipo: **AVALIAR**
  - Comentario: **Vale muito a pena — melhora UX significativamente.** Hoje a lista tem ~65 bairros misturados de varias cidades. Referencia ImovelWeb: agrupa por "Cidade, Estado" com contagem. Dados ja disponiveis na API (campo Cidade). Bairros com total=0 ja sao identificaveis via `getAllBairros()`.
  - Implementacao:
    1. **API** (`src/services/loft.ts`): Adicionar campo `cidade` ao `BairroSummary` (~linha 544). No loop de agregacao, capturar `property.cidade` por bairro.
    2. **Props**: `src/app/page.tsx` e `src/app/busca/page.tsx` — passar `BairroSummary[]` completo em vez de `.map(b => b.bairro)`.
    3. **Desktop** (`src/components/search/filters/LocationFilter.tsx`): Filtrar bairros com `total > 0`. Agrupar por cidade usando `CommandGroup` do shadcn com header da cidade. Mostrar contagem "(25)" ao lado de cada bairro.
    4. **Mobile** (`src/components/search/QuickSearch.tsx` MultiListPicker): Adicionar prop `groups` para renderizar headers de cidade (sticky) + bairros abaixo. Mesma logica de filtrar total > 0.

### 7. Reordenar filtros da SearchBar por prioridade (Home) ✅
- [x] Ordem atual: Localizacao → Preco → Quartos → Tipo/Finalidade
- [x] Ordem correta: **Comprar/Alugar → Localizacao → Tipo → Quartos → Preco**
  - Tipo: **AVALIAR**
  - Comentario: **Faz sentido e vale a pena.** Referencia ImovelWeb: "Location → Comprar → Tipo → Quartos → Preco → Mais filtros". A finalidade e a decisao mais fundamental (define precos, tipos disponiveis).
  - Implementacao:
    1. **Desktop** (`src/components/search/SearchBar.tsx` ~linha 422): Reordenar grid para 6 colunas — Comprar/Alugar (toggle pill, nao popover) → Localizacao → Tipo → Quartos → Preco → Buscar.
    2. **Remover toggle standalone** da home (linhas 380-410) — finalidade agora integrada como primeiro pill da barra.
    3. **Mobile bottom sheet** (linhas 266-324): Reordenar secoes na mesma ordem.
    4. **QuickSearch**: Ja tem ordem correta (Finalidade primeiro). Sem mudanca.

### 8. Filtro de tipo: mostrar apenas tipos com imoveis disponiveis (SearchBar) ✅
- [x] Ao selecionar "Comprar": lista de tipos mostra apenas categorias com imoveis a venda
- [x] Ao selecionar "Alugar": lista de tipos mostra apenas categorias com imoveis para locacao
- [x] Remover tipos sem imoveis ativos da lista (hoje mostra todos, inclusive vazios)
  - Tipo: **AVALIAR**
  - Comentario: **Excelente ponto.** Nao faz sentido mostrar "Chacara" se nao tem nenhuma. Mesma logica da task 6.
  - Implementacao:
    1. **API** (`src/services/loft.ts`): Enriquecer `TypeSummary` com `porFinalidade: Record<string, number>` (ex: `{"Venda": 15, "Aluguel": 3}`). No loop de `getAllTypes()`, contar tambem por `property.finalidade`.
    2. **Props**: Passar `TypeSummary[]` completo (com contagens) em vez de `.map(t => t.tipo)`.
    3. **Controller** (`useSearchBarController.ts`): `useMemo` que filtra `tipoOptions` baseado na `finalidade` selecionada. Quando finalidade muda, limpar tipos selecionados que ficaram invalidos.
    4. **QuickSearch**: Mesma logica — filtrar lista de tipos quando toggle Comprar/Alugar muda.

### 9. Bug: "Alugar" nao mostra tipo de imovel, so "Alugar" no pill (SearchBar) ✅
- [x] Ao clicar "Alugar", o filtro de tipo deve continuar disponivel (mostrar tipos com imoveis para locacao)
- [x] Hoje ao clicar "Alugar" o pill de tipo some e mostra apenas "Alugar" — comportamento incorreto
  - Tipo: **AVALIAR**
  - Comentario: **Bug real.** Root cause: `TypeFilter.tsx` combina checkboxes de tipo + finalidade no mesmo componente. O `typeLabel` no controller conta tipos + finalidades juntos. O pill "Tipo" ativa/limpa ambos.
  - Implementacao:
    1. **TypeFilter** (`src/components/search/filters/TypeFilter.tsx`): Remover secao de finalidade (~linhas 74-92). Manter apenas checkboxes de tipo.
    2. **Controller** (`useSearchBarController.ts`): `typeLabel` so conta `tipos.length`, nao `finalidades.length`. Criar `finalidadeLabel` separado.
    3. **SearchBar** (`SearchBar.tsx`): Pill "Tipo" so verifica/limpa `tipos`, nao `finalidades`. Finalidade vira pill independente (task 7).
    4. Implementar junto com tasks 7 e 8 — sao complementares.

### 10. Busca estilo portal: autocomplete cidade+bairro (referencia ImovelWeb/QuintoAndar) ✅
- [x] Campo de localizacao com autocomplete: digitar "cu" → sugere "Curitiba, Parana" + "Agua Verde, Curitiba" etc.
- [x] Formato: "Bairro, Cidade, Estado" nas sugestoes com contagem de imoveis
  - Tipo: **AVALIAR** — implementado
  - Comentario: Implementado como `LocationAutocomplete.tsx` — padrao QuintoAndar/Airbnb.
  - Implementacao:
    1. **Novo componente** `src/components/search/filters/LocationAutocomplete.tsx`:
       - Input com icone de lupa, placeholder "Digite uma cidade ou bairro..."
       - **Estado vazio:** Mostra "Cidades disponiveis" (top 8 por contagem)
       - **Buscando:** Debounce 200ms, filtra cidades+bairros, formato "Batel — Curitiba - PR (25)"
       - **Selecao:** Seta valor, limpa input, fecha popover, pill mostra nome selecionado
       - Navegacao por teclado (ArrowUp/Down, Enter, Escape)
       - So mostra locais com imoveis ativos (total > 0)
    2. **Controller** (`useSearchBarController.ts`): `cidadeSummaries` com contagem por cidade
    3. **SearchBar desktop**: Popover de Localizacao usa LocationAutocomplete (single-select rapido)
    4. **Modal/Mobile**: Manteve LocationFilter (multi-select com checkboxes para busca refinada)

### 11. Codigo do imovel em destaque na pagina de imovel (/imovel/[slug]) ✅
- [x] Mover codigo do imovel do rodape tecnico para o **header**, proximo aos badges (tipo, finalidade)
- [x] Formato: badge com "Cod: 69804095" visivel e destacado (referencia: site antigo da FYMOOB)
  - Tipo: **AVALIAR**
  - Comentario: **Faz sentido para o fluxo comercial.** Referencia: site antigo mostra "Cód: 69802113" como badge no header. ImovelWeb e ZAP tambem mostram codigo visivel no topo.
  - Implementacao:
    1. **PropertyDetails** (`src/components/property/PropertyDetails.tsx` linha 17): Adicionar `<PropertyBadge variant="code">Cód: {property.codigo}</PropertyBadge>` apos os badges existentes.
    2. **PropertyBadge** (`src/components/shared/PropertyBadge.tsx` linha 22): Trocar variant "code" de `text-neutral-400` para `border border-neutral-300 text-neutral-500` — badge outline discreto mas visivel.
    3. **Opcional**: Remover codigo do rodape em `src/app/imovel/[slug]/page.tsx` (~linha 217).

### 12. Endereco completo na pagina do imovel (/imovel/[slug]) ✅
- [x] Hoje mostra: "Irati, Santa Quiteria, Curitiba - PR"
- [x] Deveria mostrar: **"Irati, 531, Santa Quiteria, Curitiba - PR"** (rua + numero, como no site antigo)
  - Tipo: **AVALIAR**
  - Comentario: Campos `numero` e `complemento` ja existem no tipo `Property` e sao mapeados da API (`loft.ts` raw.Numero, raw.Complemento). So nao estao sendo usados na exibicao. Referencia: site antigo mostra "Anna de Macedo Portugal, 206, Campo de Santana, Curitiba - PR".
  - Implementacao:
    1. **PropertyDetails** (`src/components/property/PropertyDetails.tsx` linhas 29-31): Substituir formatacao por `[property.endereco, property.numero, property.complemento, property.bairro].filter(Boolean).join(", ") + ", " + property.cidade + " - " + property.estado`.
    2. **JSON-LD** (`src/lib/seo.ts` ~linha 106): Incluir numero no streetAddress: `[property.endereco, property.numero].filter(Boolean).join(", ")`.

### 13. Descricao do imovel incompleta (/imovel/[slug]) ✅
- [x] Site antigo mostra descricao completa do CRM (pavimentos, divisao, diferenciais, metragem detalhada)
- [x] Nosso site mostra descricao cortada/resumida — faltam detalhes dos pavimentos e diferenciais
  - Tipo: **AVALIAR**
  - Comentario: **Causa raiz identificada:** A funcao `parseDescription` em `PropertyDescription.tsx` (linhas 29-48) remove agressivamente: headers de pavimento ("PAVIMENTO TÉRREO"), bullets ("- Garagem"), linhas curtas com numero, linhas com "sem". O "Mostrar mais" expande mas mostra texto JA filtrado. A API retorna `DescricaoWeb` completo — nao e problema de API.
  - Implementacao:
    1. **PropertyDescription** (`src/components/property/PropertyDescription.tsx`): Manter `parseDescription` para preview colapsado (4 linhas limpas). Adicionar `splitParagraphs()` que so divide por `\n` sem filtrar. Quando expandido, usar `splitParagraphs()` (texto CRM completo). Quando colapsado, usar `parseDescription()` (preview narrativo).
    2. `needsTruncation` deve checar o texto COMPLETO (`splitParagraphs`), nao o filtrado.
    3. Referencia: site antigo e ImovelWeb mostram descricao completa com pavimentos e bullets. Nosso preview fica limpo, mas o expandido mostra tudo.

### 14. Filtros avancados na pagina de busca (/busca) ✅
- [x] Adicionar filtros que existem no site antigo mas faltam no novo:
  - [x] Busca por **codigo** do imovel
  - [x] Filtro por **cidade** (separado de bairro — integrado no agrupamento por cidade)
  - [x] Filtro por **suites** (1+, 2+, 3+, 4+)
  - [x] Filtro por **banheiros** (1+, 2+, 3+, 4+)
  - [x] Filtro por **vagas** (1+, 2+, 3+, 4+)
  - [x] Filtro por **area privativa** (min/max m²)
- [x] Manter filtros acessiveis e editaveis a qualquer momento (referencia ImovelWeb: barra sticky)
- [x] **Padrao "Quick Pills + Modal" (Airbnb/ImovelWeb):**
  - [x] Pill "Mais filtros" no desktop com badge de contagem
  - [x] Modal overlay (fixed z-9999, backdrop blur, nao empurra layout)
  - [x] Header fixo "Filtros" + botao fechar (X)
  - [x] Conteudo scrollavel: Finalidade, Localizacao+Tipo (grid 2col), Preco, Quartos/Suites/Banheiros/Vagas (grid 2col), Area (min/max m²), Codigo
  - [x] Footer fixo: "Limpar tudo" + "Aplicar filtros"
  - [x] Mobile: full-screen. Desktop: centralizado max-w-3xl rounded-2xl
  - Tipo: **AVALIAR**
  - Comentario: Implementado como `AdvancedFiltersModal.tsx` — modal completo padrao Airbnb/ImovelWeb. No desktop, pill "Mais filtros (N)" aparece na barra apos Preco. No mobile, botao "Mais filtros" no bottom sheet abre o modal. Zero libs novas, performance intacta.

### 15. Adicionar suites como feature separada nos cards e pagina do imovel ✅
- [x] Hoje: Área | Quartos | Banheiros | Vagas (suítes não aparece)
- [x] Referência (site atual fymoob.com): Dormitórios | Banheiros | **Suítes** | Vagas — 4 itens separados
- [x] Bruno quer diferenciar banheiros de suítes — "banheiro não necessariamente tem chuveiro"
- [x] Dado `suites` já existe no tipo `Property` e vem da API (`raw.Suites`). Só não é exibido no `PropertyFeatures`
  - Tipo: **AVALIAR**
  - Comentario: Mudança simples com alto impacto informativo. Suítes é dado decisivo para comprador — diferencia apto de 3 quartos com 1 suíte vs 3 suítes. Impacto visual mínimo (1 item a mais na feature bar). Referência: site atual e portais (ZAP, ImovelWeb) mostram suítes separado.
  - Implementacao:
    1. **PropertyFeatures** (`src/components/shared/PropertyFeatures.tsx`): Adicionar prop `suites?: number | null`. Inserir novo item no array `features` entre Quartos e Banheiros com ícone adequado (ex: `BedSingle` do lucide). Label: "Suíte"/"Suítes". Só aparece se `suites > 0`.
    2. **Página do imóvel** (`src/app/imovel/[slug]/page.tsx` ~linha 216): Passar `suites={property.suites}` no `<PropertyFeatures>`.
    3. **Cards de busca** — 5 arquivos que usam PropertyFeatures:
       - `src/components/property/PropertyCard.tsx` (3 chamadas ~linhas 533, 542, 552)
       - `src/components/property/card/PropertyCardGrid.tsx` (~linha 190)
       - `src/components/property/card/PropertyCardList.tsx` (~linha 88)
       - `src/components/property/card/PropertyCardCompact.tsx` (~linha 148)
       - `src/components/property/PropertyCardFeatured.tsx` (~linha 48)
       - `src/components/property/PropertyDetails.tsx` (~linha 37)
       Todos já recebem `property` — basta adicionar `suites={property.suites}`.
    4. **PropertyCharacteristics** (`src/components/property/PropertyCharacteristics.tsx`): Remover suítes de lá (já aparecia na ficha técnica, ficaria duplicado).
  - Data: 2026-04-08

### 16. Remover limite de 15 fotos na galeria do imovel (/imovel/[slug]) ✅
- [x] Todos os imoveis estao limitados a 15 fotos na galeria
- [x] API retorna todas as fotos — limite e nosso (`page.tsx` linha 101: `.slice(0, 15)`)
- [x] Bruno/Wagner solicitaram remover limite para exibir todas as fotos do anuncio
  - Tipo: **AVALIAR**
  - Comentario: Limite foi adicionado por performance (menos imagens na galeria = carregamento mais rapido). Fotos usam lazy loading, entao impacto de remover e baixo. Possivel meio-termo: aumentar para 30-40 ou remover completamente. Testar Lighthouse apos mudanca.
  - Implementacao: `src/app/imovel/[slug]/page.tsx` linha 101 — remover `.slice(0, 15)` ou aumentar limite.
  - Data: 2026-04-08

### 16. Layout do card de busca — preco sobre imagem vs abaixo (pagina /busca, modo 2 colunas)
- [ ] Wagner acha que preco em branco sobre a imagem fica "muito poluido visualmente"
- [ ] Wagner prefere layout "clean e minimalista" com preco e codigo abaixo da imagem
- [ ] Bruno gostou do layout atual com preco sobre a imagem
  - Tipo: **AVALIAR**
  - Comentario: **Opiniao dividida entre socios.** Wagner quer mais clean, Bruno aprovou o atual. Precisa alinhar entre Vinicius, Wagner e Bruno antes de alterar. Possivel solucao: apresentar ambas versoes para decisao final.
  - Data: 2026-04-08

### 18. BUG: Secao "Destaques de lancamento" mostrando imoveis prontos (Home) ✅
- [x] A secao "Destaques de lancamento" na home esta exibindo imoveis que nao sao lancamentos (ex: Sobrado Santa Quiteria cod 69804095, Apto Mobiliado Agua Verde cod 69804752)
- [x] Apenas imoveis realmente em fase de lancamento/na planta deveriam aparecer nessa secao
  - Tipo: **AVALIAR**
  - Comentario: **Bug de filtro.** Provavel causa: a query que alimenta essa secao nao esta filtrando corretamente por status de lancamento. Pode estar usando apenas `Destaque=true` sem verificar se e lancamento. Investigar campo da API que diferencia lancamento de imovel pronto (ex: `Situacao`, `Status`, `Categoria`, ou campo customizado no CRM).
  - Investigar:
    1. **Home** (`src/app/page.tsx`): Verificar qual funcao alimenta a secao "Destaques de lancamento" e quais filtros aplica.
    2. **API** (`src/services/loft.ts`): Verificar se existe campo que diferencia lancamento de pronto (ex: `Situacao=Lancamento`, `EmConstrucao`, `NaPlanta`, ou similar).
    3. **Filtro correto:** Cruzar `Destaque` com campo de lancamento para exibir apenas lancamentos destacados.
  - Data: 2026-04-08

### 19. Secao "Imoveis em Destaque — Prontos para Morar" na Home
- [ ] Bruno quer carousel na home mostrando imoveis prontos/destaque, referencia J8 Imoveis
- [ ] Layout: titulo "IMOVEIS EM DESTAQUE | PRONTOS PARA MORAR" + grid/carousel 3 cards com foto, tipo, bairro, codigo, quartos, vagas, area, preco + CTA "Conheca o imovel"
  - Tipo: **AVALIAR**
  - Comentario: **Excelente para conversao e SEO.** Mostra imoveis premium logo na home, incentiva clique direto. Referencia J8: carousel com 3 cards visiveis, setas lateral. Precisamos definir criterio de "destaque" — pode ser: imoveis com `Destaque=true` na API, ou os mais caros, ou curadoria manual.
  - Implementacao:
    1. **API** (`src/services/loft.ts`): Criar `getFeaturedProperties(limit)` — filtrar imoveis com campo `Destaque` da API ou fallback para os N mais caros/recentes. Campos: foto, tipo, bairro, cidade, codigo, dormitorios, vagas, areaPrivativa, precoVenda.
    2. **Componente** (`src/components/home/FeaturedProperties.tsx`): Carousel com embla-carousel (ja instalado, dynamic import conforme CLAUDE.md). Grid 3 colunas desktop, 1 mobile com snap scroll. Card: foto aspect-[4/3], badges tipo+cidade, titulo bairro+empreendimento, codigo, features (quartos, vagas, area), preco, link "Conheca o imovel".
    3. **Home** (`src/app/page.tsx`): Chamar `getFeaturedProperties(9)` no server component. Renderizar `<FeaturedProperties>` entre hero e secao de bairros (ou posicao a definir).
    4. **SEO**: Cada card com link para `/imovel/[slug]` — gera links internos valiosos.
    5. **Criterio de destaque**: Perguntar ao Bruno se existe flag "Destaque" no CRM ou se prefere curadoria manual.
  - Data: 2026-04-08

### 19. Adicionar redes sociais da imobiliaria (Footer)
- [ ] Bruno solicitou incluir icones das redes sociais: Facebook, Instagram, TikTok
- [ ] Referencia: icones circulares com link para os perfis oficiais da FYMOOB
  - Tipo: **AVALIAR**
  - Comentario: Facil de implementar. Footer ja existe em `src/components/layout/Footer.tsx`. Adicionar secao com icones (lucide ou SVGs) linkando para os perfis. **Depende do Bruno enviar os links** (URLs do Facebook, Instagram, TikTok da FYMOOB).
  - Implementacao:
    1. **Footer** (`src/components/layout/Footer.tsx`): Adicionar row de icones sociais com links. Usar SVGs inline para Facebook, Instagram e TikTok (lucide nao tem TikTok).
    2. **Dados**: URLs dos perfis sociais via constante ou env var. Aguardar Bruno enviar os links.
    3. **Schema**: Adicionar `sameAs` no JSON-LD Organization (`src/lib/seo.ts`) com as URLs sociais — bom para SEO.
  - Data: 2026-04-08

### 20. Mover avaliacoes do Google para a Home (prova social)
- [ ] Bruno: secao "O que nossos clientes dizem" (avaliacoes Google 4.9 estrelas) esta apenas em /sobre, escondida
- [ ] Quer na Home de forma discreta — cliente que entra pelo site fica na home e nao ve as avaliacoes
- [ ] "Pesa quando o cliente escolhe a gente" — prova social importa na decisao
  - Tipo: **AVALIAR**
  - Comentario: **Faz muito sentido e e otimo para conversao + SEO.** Avaliacoes reais do Google sao prova social forte — 4.9 com 56 avaliacoes e um diferencial real. Na home, posicionar abaixo da secao de bairros ou antes do CTA final. Manter versao compacta: badge Google + nota + 2-3 depoimentos em carousel. Nao duplicar — reutilizar o mesmo componente.
  - Implementacao:
    1. **Componente existente**: Verificar se o componente de reviews em `/sobre` ja e isolado ou se esta inline. Se inline, extrair para `src/components/shared/GoogleReviews.tsx`.
    2. **Home** (`src/app/page.tsx`): Importar e renderizar `<GoogleReviews>` na home. Versao compacta: badge "4.9 (56 avaliacoes)" + carousel horizontal com 3-4 depoimentos. Posicionar entre bairros e FAQ (ou antes do CTA final).
    3. **Schema**: JSON-LD `AggregateRating` no Organization ja deve existir — verificar se esta correto.
    4. **Manter em /sobre tambem**: Nao remover, manter nos dois lugares. Home = versao compacta, Sobre = versao completa.
  - Data: 2026-04-08

---

## Bugs Identificados

### BUG-1. SearchBar em paginas dedicadas nao respeita contexto da pagina ✅
- [x] **Pagina /lancamentos:** ao usar filtros da SearchBar (ex: Localizacao → Curitiba), a contagem e resultados mostram TODOS os imoveis de Curitiba, nao apenas lancamentos
- [x] Provavelmente afeta TODAS as paginas dedicadas: /lancamentos, /imoveis/[bairro], /apartamentos-curitiba, /casas-curitiba, etc.
- [x] Os filtros deveriam operar apenas dentro do escopo da pagina (ex: na pagina de lancamentos, so mostrar lancamentos; na pagina de bairro, so imoveis daquele bairro)
- [x] **Solucao implementada: Opcao (A)** — prop `scope` no SearchBar que injeta filtros fixos em toda busca
  - Tipo: **RESOLVIDO**
  - Data: 2026-04-08

---

_Adicionar novas solicitacoes acima desta linha._
