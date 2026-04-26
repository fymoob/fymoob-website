# Landing Page "Curitiba 8 Imobiliária" — Plano de Produção

> **Status:** Aprovação pendente (versão + budget de horas)
> **Owner:** Vinicius (implementação) + Bruno (decisão criativa/jurídica) + Wagner (apoio)
> **Criado:** 2026-04-25
> **Relacionado a:** [Plano Reels GTA-style](plano-videos-virais-gta-style.md) — esta landing é o destino dos viewers virais

---

## TL;DR — 30 segundos pra decisão

- **Landing page paralela** em `/curitiba8` (subpasta) reproduzindo a estética do site Dynasty 8 Real Estate do GTA V — **paródia clara, com nome próprio "Curitiba 8"**, não clone literal
- **Função:** o viewer chega via Reel viral → cai numa página imersiva GTA-style → seleciona imóvel real → vai pra `/imovel/[slug]` → DM com corretor
- **Versão recomendada:** **MEDIUM-LOW risk** (paleta + estética GTA, nomenclatura própria, copy original) — preserva 65-75% do impacto viral, reduz risco DMCA de **60-85% (clone)** pra **10-25% (paródia)**
- **Stack:** Next.js + MapLibre + OpenFreeMap (grátis ilimitado, custom style criado em Maputnik) + framer-motion + assets já no projeto
- **Esforço:** 38h de dev (versão completa com mapa) — eu (Vinicius) faço solo
- **Custo terceiro:** ~R$ 0 (OpenFreeMap grátis, fontes free comerciais, Vercel já assinado, geocoding já resolvido pela API Loft)
- **Janela competitiva:** **zero cases globais documentados** de imobiliária com landing GTA-style permanente. FYMOOB seria pioneira mundial nesse formato.

---

## 1. Conceito

### Premissa central

> "**Curitiba 8 Imobiliária** — A melhor jogada da sua vida"
>
> Página dedicada onde o visitante navega o catálogo FYMOOB **como se estivesse num site fictício do mundo GTA**, com mapa estilizado de Curitiba (não de Los Santos), pins clicáveis nos imóveis reais, e UI que homenageia (mas não copia) o Dynasty 8 Real Estate do GTA V.

### Por que faz sentido (fluxo end-to-end)

```
Reel viral GTA-style (Lamar do Cajuru)
  ↓ "DM ou link na bio pra ver os imóveis"
  ↓ link.fymoob.com.br → /curitiba8
  ↓
Curitiba 8 landing imersiva
  ├─ Hero animado (cutscene-style)
  ├─ Mapa estilizado de Curitiba com pins por imóvel
  ├─ Tabs HIGH-END / MEDIUM / LOW-END (tipo Dynasty 8 listings)
  └─ Card clicado → "ENTERING PROPERTY" → redireciona pra /imovel/[slug]
  ↓
Página real do imóvel (UI normal FYMOOB)
  ↓
DM/lead conversão
```

A landing **não substitui** o `/busca` ou `/imoveis/[bairro]` — é uma **camada promocional alternativa** que pega o público vindo de Reels e converte com o mesmo "hook" da estética viral.

### Por que NÃO é clone literal

Versão A (clone Dynasty 8 literal) tem **60-85% chance de DMCA em 12 meses** segundo análise de [risco legal](research/dynasty8-legal-risk-2026-04.md). Take-Two registrou GTA VI no INPI Brasil em janeiro/2026 e FiveM em fevereiro/2026 — jurisdição brasileira está ativa, não dá pra contar com "eles nem vão notar".

Versão B (paródia clara) preserva o gancho viral porque **o gancho já foi entregue pelo Reel** — efêmero, defensável como obra expressiva. A landing **converte**, não precisa carregar o gancho.

---

## 2. Análise visual e decisões de design

### Análise do Dynasty 8 original (extração via Playwright + canvas pixel sampling)

**Cores reais (HEX confirmados):**
- Amarelo-mostarda do logo: `#C0B030` (não dourado Century 21 puro)
- Branco: `#FFFFFF`
- Plate de fundo: `#F0F0F0`
- Frame TV preto: `#000000`

**Tipografia:**
- Wordmark "Dynasty 8": **sans wide tipo Eurostile/Microgramma** (não Pricedown — esse é só do logo do jogo)
- UI/HUD do GTA V: **Chalet 1960**

**Tagline canônica:** "The best move you'll ever make"

**Layout listings (não é grid de cards — é lista horizontal):**
- Tabs HIGH-END / MEDIUM / LOW-END
- Tipo do imóvel em CAPS (APARTMENT, HOUSE, etc.)
- Endereço
- Ícones de slots
- Preço em USD
- Botão "BUY"
- Bairro abaixo

**Importante:** o Dynasty 8 original **NÃO tem mapa interativo**. Mapa é decisão extra do nosso plano (recomendado por wow factor mobile + integração natural com 247 imóveis georreferenciados).

### Versão B "Curitiba 8" — direção de design adaptada

**Paleta paralela (não cópia):**
- Amarelo-mostarda: `#D4AF37` (mais "ouro" que mostarda — diferencia do original sem perder o vibe luxo)
- Preto profundo: `#0A0A0A`
- Verde "available": `#3FB950` (estilo GTA wanted)
- Branco: `#FFFFFF`
- Vermelho alerta: `#DA3633`

**Tipografia:**
- Logo "Curitiba 8": fonte **wide sans tipo Bebas Neue** ou **Anton** (free, sem confusão com Eurostile)
- UI: **Chalet** se conseguirmos free, senão **Inter** (já no projeto)
- **Pricedown Black da Typodermic** (free comercial) só pra hits visuais ocasionais (cards de "MISSION COMPLETED")

**Logo concept:**
- "8" estilizado com **araucária** (símbolo Curitiba) ou **sol curitibano** (não palmeira de LA)
- Tagline: "A melhor jogada da sua vida"
- Subtitle: "Imóveis premium em Los Curitibos" (winking)

**Tropos visuais reaproveitados (sem cópia direta):**
- ✅ Letterbox preto top/bottom (custo: 1-2h, easter egg visual mais reconhecível)
- ✅ Browser chrome fake "estilo navegador in-game" (header fake com "www.curitiba8.com" no lugar de URL real)
- ✅ HUD-style overlays com info do imóvel
- ✅ Cursor customizado (target lock vermelho ao hover em pin do mapa)
- ✅ "PROPERTY ACQUIRED" jingle ao clicar (versão royalty-free Pixabay)
- ❌ Logo Dynasty 8 ou Pricedown Intl original (NÃO usar)
- ❌ Modelos 3D dos personagens GTA (Lamar/Michael) na landing — só nos Reels
- ❌ Música oficial GTA (NÃO usar — só royalty-free)

### 3 versões avaliadas (recomendação: B)

| Versão | Estética | Risco DMCA | Impacto viral | Esforço | Recomendação |
|---|---|---|---|---|---|
| **A — Alta fidelidade** | Clone Dynasty 8 (logo, fonte, copy literal) | **60-85%** em 12m | 100% | 38h | ❌ NÃO |
| **B — Paródia clara** ⭐ | Estética GTA + nome próprio "Curitiba 8" + copy original | **10-25%** | 65-75% | 38h | ✅ SIM |
| **C — Genérica luxo** | Preto+dourado sem referência GTA | <5% | 25-30% | 22h | ⚠️ Plano-B se DMCA |

---

## 3. Stack técnico

### 3.1 Mapa estilizado (decisão crítica)

**OpenFreeMap** — grátis ilimitado, sem API key, production-ready desde 06/2024. Elimina risco de billing imprevisível em viralização (cenário: Reel atinge 5M views, 50k clicks na landing → Mapbox/Maptiler poderia gerar conta de R$ 800-2.000 num dia).

**Custom style:** criado em **Maputnik** (free, web-based) com paleta GTA San Andreas:
- Ruas: amarelo-areia `#E8C674` (estilo grading Los Santos)
- Edifícios: preto `#1A1A1A`
- Água: azul-escuro `#1B4D8C`
- Parques (Barigui, Bacacheri, Tanguá): verde-oliva `#5C7C3E`
- Texto: amarelo-dourado `#D4AF37`

**Referência:** Snazzy Maps "GTA San Andreas style" (9 anos no ar, paleta migrável pra MapLibre Style Spec).

**Performance:** 247 markers em maplibre é OK (validado em projetos similares). Cluster por bairro com zoom progressivo.

### 3.2 Geocoding — JÁ RESOLVIDO

Confirmado: API Loft retorna `Latitude` e `Longitude` em [src/services/loft.ts:130,141,244-245](src/services/loft.ts#L130). **Custo zero**, sem necessidade de Google Geocoding/Nominatim.

POC obrigatório: validar **% de imóveis com lat/lng válidos** (ad-hoc script, 30min).

### 3.3 Componentes Next.js

```
app/curitiba8/
├── page.tsx                        # Server Component, fetch imóveis com lat/lng válidos
├── layout.tsx                      # Layout isolado (sem header/footer FYMOOB)
└── components/
    ├── BrowserChrome.tsx           # Fake URL bar "www.curitiba8.com"
    ├── HeroIntro.tsx               # Letterbox + cutscene "ENTERING LOS CURITIBOS"
    ├── Mapboard.client.tsx         # MapLibre carregado dinamicamente
    ├── PropertyTabs.tsx            # HIGH-END / MEDIUM / LOW-END
    ├── PropertyCardGTA.tsx         # Card estilizado por imóvel
    ├── HUD.tsx                     # Vida 100% / Dinheiro / Mapa overlay
    └── PropertyTransition.tsx      # "PROPERTY ACQUIRED" antes de redirect
```

### 3.4 Roteamento e SEO

- **Subpasta** `/curitiba8` (não subdomínio) — reaproveita autoridade de domínio fymoob.com.br
- **noindex, nofollow** — landing promocional, não conteúdo SEO. Nenhuma confusão com `/busca`.
- **Code split obrigatório** — landing é dynamic import, não impacta bundle do resto do site
- **Lighthouse mobile budget:** ≥60 (relaxado vs 80+ do resto, justificado por experiência imersiva)
- **LCP target:** <3.5s mobile (crítico — vem de Reel, viewer caindo)

### 3.5 Animações

- **framer-motion** (já no projeto) pra transições, hovers, parallax
- **CSS scroll-driven animations** quando possível (animation-timeline: view) — performance > JS
- Sons: SFX royalty-free Pixabay (cash, mission complete, target lock)
- **Autoplay restrictions:** primeiro click do usuário libera áudio (padrão Chrome)

### 3.6 Mobile-first crítico

- **80%+ tráfego mobile** vindo de Reel
- Map fullscreen mobile + drawer com lista de imóveis no rodapé
- Touch targets ≥44px (Apple HIG)
- Swipe entre tabs HIGH-END/MEDIUM/LOW-END
- Performance MapLibre em mobile médio (Android budget): testar com throttle 4x

---

## 4. Stories de implementação (priorizadas)

### Sprint 0 — POCs (5h total)

- [ ] **POC-1** (30min) — Script ad-hoc: % imóveis ativos com `Latitude` + `Longitude` válidos via API Loft. Decisão: se <80%, plano B com geocoding manual via Mapbox/Nominatim
- [ ] **POC-2** (3h) — Custom style MapLibre em Maputnik com paleta GTA SA. Validar em mobile real (LG/Moto budget Android)
- [ ] **POC-3** (1.5h) — 3 propostas de logo "Curitiba 8" em Figma com araucária + sol. Aprovação Bruno

**Decisão go/no-go pós-POCs:** se 2/3 passam, GO Sprint 1. Se ≤1, repensar formato (versão C genérica?).

### Sprint 1 — Esqueleto (8h)

- [ ] Rota `/curitiba8` com layout isolado
- [ ] Server Component fetcha imóveis ativos com lat/lng válidos
- [ ] BrowserChrome component (fake URL bar)
- [ ] HeroIntro com letterbox + texto "ENTERING LOS CURITIBOS"
- [ ] noindex/nofollow + code split

### Sprint 2 — Mapa interativo (10h)

- [ ] MapboardClient com MapLibre + OpenFreeMap + custom style aplicado
- [ ] Pins por imóvel com cluster por bairro
- [ ] Hover state estilo "target lock" (cursor custom + reticle vermelho)
- [ ] Click no pin → abre overlay com info do imóvel
- [ ] Mobile fullscreen + drawer

### Sprint 3 — Listings + Tabs (8h)

- [ ] PropertyTabs HIGH-END (>R$ 1.5M) / MEDIUM (R$ 500k-1.5M) / LOW-END (<R$ 500k) — automático por preço
- [ ] PropertyCardGTA com layout horizontal (não grid) inspirado no Dynasty 8
- [ ] Hover state com fade-in do "BUY" button
- [ ] Sync entre tab selecionada e pins visíveis no mapa

### Sprint 4 — Polish + Sons + HUD (7h)

- [ ] HUD overlay top-right (vida 100%, dinheiro, minimapa em miniatura)
- [ ] PropertyTransition "PROPERTY ACQUIRED" antes de redirect pra `/imovel/[slug]`
- [ ] SFX royalty-free Pixabay (cash, mission complete, target lock)
- [ ] Animações framer-motion entre estados
- [ ] Loading state estilo "Loading Los Curitibos..."

### Sprint 5 — QA + Deploy (5h)

- [ ] Testes visuais cross-browser (Chrome, Safari mobile, Firefox)
- [ ] Performance audit Lighthouse mobile (alvo ≥60)
- [ ] Smoke test (rota retorna 200, mapa carrega, card clicável)
- [ ] Adicionar à lista do `scripts/smoke-test.mjs`
- [ ] Deploy Vercel preview → review com Bruno → produção

**Total:** 5h POC + 38h dev = **43h** sólido (versão completa, MEDIUM risk).

---

## 5. Cronograma — 4 semanas (em paralelo com Reels)

| Semana | Atividade | Entregável |
|---|---|---|
| **Semana 1** (paralela à V1 dos Reels) | POCs 1-2-3 + decisão go/no-go + Sprint 1 (esqueleto) | Rota `/curitiba8` no ar (preview) com layout vazio |
| **Semana 2** | Sprint 2 (mapa) + Sprint 3 (listings) | Versão alpha funcional, internal review |
| **Semana 3** | Sprint 4 (polish + sons) + Sprint 5 (QA) | Versão beta no preview, fluxo end-to-end testado |
| **Semana 4** | Deploy produção + linkar em link.fymoob.com.br + ativação no Reel V2 | Landing live, Reel V2 já apontando pra ela |

**Sincronização com Reels:**
- **Reel V1** (Semana 1 do plano de Reels): ainda sem landing — CTA é DM direto
- **Reel V2** (Semana 2 do plano): landing alpha pronta — CTA pode incluir "ou acesse curitiba8.fymoob.com.br"
- **Reel V3-V5** (Semanas 3-5): landing em produção — CTA padrão sempre menciona

---

## 6. Custos

### Investimento técnico

| Item | Custo |
|---|---|
| **OpenFreeMap** (mapa + tiles) | **R$ 0** — grátis ilimitado |
| **MapLibre GL JS** | R$ 0 — open source |
| **Vercel hosting** | R$ 0 — já incluso no plano atual |
| **Bandwidth** (assumindo 50k pageviews/mês pico) | R$ 0 — dentro do free tier Vercel |
| **Fontes** (Pricedown Black, Bebas Neue, etc.) | R$ 0 — free comerciais |
| **SFX** (Pixabay, Freesound) | R$ 0 — royalty-free |
| **Geocoding** (já vem da API Loft) | R$ 0 |
| **Total infra/mês** | **R$ 0** |

### Investimento de horas (Vinicius solo)

- POCs: 5h
- Implementação: 38h
- **Total:** 43h ≈ **5-6 dias úteis full-time** ou **3 semanas em paralelo com outras tasks**

### Custo de oportunidade

Em 43h dá pra fazer 5-7 posts de blog adicionais (cada post 5-7h com Research Protocol). Comparativo: 1 landing viral = leads diretos quentes vs 5 posts = leads orgânicos médios. Decisão depende de prioridade de Bruno (retorno rápido vs SEO de longo prazo).

---

## 7. Risco legal — versão B vs A vs C

### Resumo da análise

Take-Two é historicamente AGRESSIVA com DMCA. Cases recentes:
- **Dezembro 2025:** derrubaram fan browser DOS Zone Vice City em 48h
- **Janeiro 2026:** registraram trademark GTA VI no INPI Brasil
- **Fevereiro 2026:** registraram FiveM no INPI Brasil
- **Jack Daniel's v. VIP Products (SCOTUS 2023)** reduziu defesas tradicionais (Rogers test, fair use, paródia) para uso comercial direto + permanente

### Por que Versão B é defensável

1. **Nome próprio** ("Curitiba 8 Imobiliária") — não usa "Dynasty 8" literal
2. **Logo original** com araucária + sol — não plagia logo Take-Two
3. **Tipografia diferente** (Bebas Neue, não Eurostile/Microgramma)
4. **Copy original** — não copia "The best move you'll ever make" literal
5. **Paleta paralela** (#D4AF37 vs #C0B030) — inspiração, não cópia
6. **Mapa de Curitiba** (não Los Santos) — clearly territorial diferente
7. **Imóveis reais** (não fictícios do mundo GTA) — função comercial legítima distinta

### Checklist legal pré-publicação

- [ ] Logo "Curitiba 8" original aprovado por advogado parceiro Bruno
- [ ] Copy 100% original — zero string literal Dynasty 8
- [ ] Fontes usadas: Pricedown **Black** (Typodermic, free comercial) NUNCA Pricedown Intl original
- [ ] Música: Epidemic Sound / Pixabay royalty-free, nunca trilha GTA oficial
- [ ] Sem logo Rockstar / Take-Two / GTA visível em frame nenhum
- [ ] Sem modelos 3D direto Michael/Trevor/Franklin/Lamar
- [ ] Caption do Reel NUNCA menciona "GTA", "Rockstar", "Dynasty 8" literal
- [ ] Disclaimer no rodapé: "Curitiba 8 Imobiliária é projeto criativo independente da FYMOOB Imobiliária. Inspirado em estética de jogos eletrônicos. Sem afiliação com Take-Two Interactive ou Rockstar Games."

### Plano de resposta a cease-and-desist

Documentado em [docs/marketing/research/dynasty8-legal-risk-2026-04.md](research/dynasty8-legal-risk-2026-04.md), seção "Plano de Resposta C&D".

**Resumo (T+0 a T+7 dias):**
- T+0: Receber notificação → forwarda pra Bruno + advogado parceiro
- T+24h: Avaliar — recuar 100%, adaptar ou contestar?
- T+48h: Se recuo: tirar landing, deletar /curitiba8, publicar disclaimer público
- T+72h: Se adaptar: trocar elementos contestados, manter landing modificada
- T+7 dias: Caso fechado ou resposta formal pra advogado contraparte

**Fallback:** Versão C "luxo escura genérica" pré-pronta como swap rápido (4h de trabalho extra pra ter pronta como reserva).

---

## 8. POCs pré-implementação (obrigatórios)

### POC-1 — % imóveis com lat/lng (30min)

```javascript
// scripts/research/check-loft-coordinates.mjs
// Conta quantos imóveis ativos têm Latitude/Longitude válidos
```

**Critério de sucesso:** ≥80% dos 247 imóveis ativos têm coordenadas válidas.
**Plano B se falhar:** geocoding manual via Mapbox Geocoding API ($0.50/1000 requests, ~R$ 0.60 pra 247 imóveis = aceitável).

### POC-2 — Custom style MapLibre + mobile (3h)

- Criar style.json em Maputnik com paleta GTA SA
- Aplicar em maplibre-gl no Next.js
- Testar em mobile real (Android budget Moto G5/G7)
- **Critério de sucesso:** mapa renderiza em <2s, 60fps em pan/zoom, paleta reconhecível

### POC-3 — 3 logos "Curitiba 8" (1.5h)

- 3 variações em Figma: araucária + 8, sol + 8, mistura
- **Critério de sucesso:** Bruno aprova 1 das 3

**Investimento total POCs:** ~R$ 0 (só horas Vinicius). Decisão go/no-go ao final.

---

## 9. KPIs e tracking

### Hierarquia (linkada aos KPIs do plano de Reels)

1. **Conversão Reel → Landing** — meta ≥8% (de quem clica no link bio do Reel, ≥8% chega na landing)
2. **Conversão Landing → /imovel** — meta ≥35% (de quem chega na landing, ≥35% clica em algum imóvel)
3. **Conversão /imovel → DM** — meta ≥10% (já é métrica do site geral)
4. **Tempo médio na landing** — meta ≥45s (engajamento imersivo)
5. **% mobile vs desktop** — esperado 80/20

### Tracking implementação

- **Analytics:** já temos GA4 deferred. Adicionar custom events: `landing_viewed`, `pin_clicked`, `card_clicked`, `tab_switched`, `redirect_to_property`
- **Heatmap:** Hotjar/Microsoft Clarity (free) só nesta página
- **A/B test viable** após 2 semanas: variar tagline, hero, ou cor primária

### Análise pós-1 mês

Template de relatório (1 página):
- Funil completo: Reel views → link clicks → landing views → property clicks → DMs → visitas → contratos
- ROI: receita atribuível à landing / 43h investidas
- Decisão sobre continuar/pivotar/descontinuar

---

## 10. Integração com Reels

### Fluxo unificado

```
Reel V1 (Penthouse Ecoville)
  └─ caption "Pra ver tudo: link na bio"
     └─ link.fymoob.com.br/curitiba8?ref=reel-v1
        └─ landing destaca o penthouse + outros 4 imóveis HIGH-END
           └─ click no penthouse → /imovel/penthouse-ecoville-xxx
              └─ DM com corretor

Reel V2 (Tela de garagem 4 imóveis)
  └─ caption "Os 4 estão no curitiba8.fymoob.com.br/curitiba8"
     └─ landing pré-filtrada com os 4 imóveis em destaque
```

### Parâmetros UTM

Toda link de Reel deve incluir:
- `?ref=reel-v{1|2|3|4|5}`
- `&utm_source=instagram` (ou tiktok)
- `&utm_medium=reels`
- `&utm_campaign=gta-2026q2`

Pra atribuir corretamente em GA4 qual Reel trouxe qual lead.

### Sincronização criativa

- Persona "Lamar do Cajuru" do Reel pode aparecer como "narrador virtual" na landing — small touch, mas consolida universo
- HUD da landing **igual ao HUD dos Reels** — viewer reconhece imediatamente "estou no mesmo mundo"
- Música: mesmo loop sonoro do Epidemic Sound usado nos Reels (familiaridade auditiva)

---

## 11. Pendências bloqueantes (preciso do Bruno)

1. **Aprovação da Versão B** (paródia clara "Curitiba 8") — confirma essa direção?
2. **Aprovação de orçamento de horas** (43h Vinicius solo) — vale o investimento vs alternativas (5-7 posts de blog ou outras features)?
3. **Validação criativa do nome** "Curitiba 8 Imobiliária" — soa bem? Alternativas: "Curitiba Crown Estates", "FYMOOB Hierarchy", "Los Curitibos Imóveis"
4. **Advogado parceiro pré-aprovado** — temos alguém pra responder eventual C&D em <72h? Senão, precisamos buscar antes de publicar
5. **Endosso do disclaimer público** — Bruno topa o disclaimer "Curitiba 8 Imobiliária é projeto criativo independente da FYMOOB. Inspirado em estética de jogos eletrônicos. Sem afiliação com Take-Two Interactive ou Rockstar Games"?
6. **Versão C pré-pronta** — prepararmos a versão "luxo escura genérica" como fallback (mais 4h de trabalho)?

---

## 12. Próximos passos (na ordem)

- [ ] **Bruno aprova** este plano + responde 6 pendências (esta semana)
- [ ] **Vinicius executa POCs 1-2-3** (5h, próxima semana)
- [ ] **Decisão go/no-go pós-POCs** com base em critérios objetivos da Seção 8
- [ ] **Se GO:** Sprint 1 (esqueleto) na mesma semana da V1 dos Reels
- [ ] **Se NO-GO:** repensar formato (versão C genérica? só Reels sem landing?)
- [ ] **Sincronização Reels-Landing:** V2 do Reel será o primeiro com link pra landing alpha
- [ ] **Análise pós-1 mês** define se renova investimento em landings temáticas adicionais (ex: "Curitiba 8 Comercial" pra galpões/lojas)

---

## 13. Decisões arquivadas (quando algo for descartado, registrar aqui)

*Vazio por enquanto.*

---

## 14. Documentos relacionados

- **Plano dos Reels (paralelo):** [docs/marketing/plano-videos-virais-gta-style.md](plano-videos-virais-gta-style.md)
- **Pesquisa visual + técnica Dynasty 8:** [docs/marketing/research/dynasty8-clone-feasibility-2026-04.md](research/dynasty8-clone-feasibility-2026-04.md)
- **Pesquisa risco legal:** [docs/marketing/research/dynasty8-legal-risk-2026-04.md](research/dynasty8-legal-risk-2026-04.md)
- **Pesquisa Higgsfield (Reels):** [docs/marketing/research/higgsfield-models-2026-04.md](research/higgsfield-models-2026-04.md)
- **Pesquisa GTA references (Reels):** [docs/marketing/research/gta-references-2026-04.md](research/gta-references-2026-04.md)
- **Pesquisa viralização short-form:** [docs/marketing/research/short-form-viral-mechanics-2026-04.md](research/short-form-viral-mechanics-2026-04.md)

---

**Mantido por:** Vinicius
**Última atualização:** 2026-04-25
