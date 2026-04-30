# Plano de Melhoria — Reserva Barigui + outras páginas de empreendimento

**Gerado em:** 2026-04-30
**Atualizado:** 2026-04-30 (incluí queries Google Ads do Wagner + benchmarks 2026)
**Fonte:** GA4 propriedade "Fymoob - Reserva Barigui" (jan-abr/2026, 4 meses) + queries Google Ads Wagner + auditoria código atual + pesquisa benchmarks 2026
**Janela:** 119 dias

---

## 🔥 Queries reais do Google Ads (campanha Reserva Barigui)

Wagner compartilhou os termos que levam visitantes pra landing paga, **ordenados por cliques**. Esse é o ouro estratégico — mostra o que pessoas REALMENTE digitam pra chegar ao Reserva Barigui:

### Top queries com mais cliques (Google Ads, 30 dias)

| # | Query | Intenção do usuário | Tipo |
|---|---|---|---|
| 1 | `reserva barigui` | Marca pura | Brand |
| 2 | `reserva lago` | Torre específica | Sub-brand |
| 3 | `reserva barigui lago` | Torre + marca | Sub-brand |
| 4 | `reserva barigui colina` | Torre Colina | Sub-brand |
| 5 | **`reserva barigui plantas`** | **Quer ver plantas baixas** | Information intent |
| 6 | `reserva colina` | Torre |  Sub-brand |
| 7 | `reserva lago barigui` | Torre + marca | Sub-brand |
| 8 | **`apartamento reserva barigui`** | **Quer comprar apto** | Transactional |
| 9 | `avantti reserva barigui` | Construtora + marca | Brand expansion |
| 10 | `reserva barigui curitiba` | Marca + cidade | Geo |
| 11 | `reserva lago curitiba` | Torre + cidade | Geo |
| 12 | **`imagens de reserva barigui colina`** | **Quer ver fotos** | Visual intent |
| 13 | **`reserva barigui preço`** | **Quer saber preço** | Commercial intent |

### 5 padrões claros de busca

1. **Brand search domina** (queries #1-#7) — pessoas digitam o nome do empreendimento OU torre. Logo: a página tem que **bater o nome no title, H1, headings**, sem rodeios.

2. **Torres sãotratadas como entidades separadas** (Reserva Lago, Reserva Colina) — pessoas buscam pelo nome da torre tanto quanto do empreendimento. Logo: cada torre precisa de **landing dedicada** (atualmente não tem).

3. **Intent específicas que precisam ser respondidas:** plantas, preço, imagens. Logo: a página precisa de **âncoras visíveis** (#plantas, #precos, #galeria) com texto SEO em torno.

4. **Construtora "Avantti" também buscada** — significa que a marca da incorporadora tem **brand value**. Logo: deve aparecer no title/H1/conteúdo com link interno.

5. **Cidade como qualificador** (curitiba) — pessoas de fora da cidade buscam pelo nome do empreendimento + cidade. Logo: bairro + cidade no title.

---

## 📊 Benchmarks de mercado pra 2026 (pesquisa consolidada)

Pesquisa em 9 fontes brasileiras (Cupola, R2U, WSI Imobiliário, SearchLab, Microsistec, Abrantes SEO, Rocket Imob, BeeOn, Imobi Brasil) e 6 internacionais (Landingi, FirstPageSage, AgentFire, Proven Partners, RealtyLync) — números relevantes:

| Métrica | Benchmark mercado | Nosso atual | Gap |
|---|---|---|---|
| Conversão landing imóvel | **7,4% média** / 2,6% mediana | **0,7%** (form_start) | -10x |
| Bounce mobile com >3s loading | 53% abandona | LH não medido em prod | A medir |
| Tráfego mobile real estate | ~70% | A confirmar (Top cidades indicam) | OK |
| Lift conversão com vídeo | +80% | Tem video, mas só desktop | Sub-aproveitado |
| Lift A/B testing forms | +10% baseline | Não fazemos | -10% |

**Princípios não-negociáveis 2026** (consenso das fontes):
- "WhatsApp não é suporte, é pipeline" — botão sempre visível, integrado ao CRM
- "Site = primeiro stand do empreendimento" — 95% dos compradores começam digital
- "Maquete 3D / tour 360° aumenta tempo médio em 2-3x"
- "Plantas com alt text rankeiam Google Images" (canal de tráfego subaproveitado)
- "Long-tail keywords (cauda longa) são onde se ganha de competidores grandes"

---

## 🎯 Resumo executivo (5 achados críticos)

### 1. ⚠️ BUG CRÍTICO — GSC conectado à propriedade ERRADA

A propriedade GA4 "Fymoob - Reserva Barigui" tem **Search Console vinculado** mas mostrando dados do **site principal `fymoob.com.br`**, não do subdomínio `destaques.fymoob.com/reservabarigui`. Evidências:

- Top query orgânica: **"fymoob"** com 524 cliques (CTR 65,6%, posição 1,15) — busca de marca do site principal
- Páginas de destino com cliques: `/`, `/busca?...`, `/imovel/...`, `/contato`, `/sobre` — **todas do site principal**
- Apenas 10 cliques foram pra `/reservabarigui` (a landing real)

**Significa:** todas as métricas orgânicas no GA4 da Reserva Barigui são, na verdade, do site principal. Configuração trocada.

**Ação:** mover Search Console pra propriedade correta — **"FYMOOB - Site Principal"** (G-2Q02YFFZ7E).

### 2. Reserva Barigui depende 100% de tráfego pago

| Origem | Sessões | % |
|---|---|---|
| **Paid Search** | **1.668** | **94%** |
| Direct | 54 | 3,1% |
| Cross-network | 19 | 1,1% |
| Unassigned | 13 | 0,7% |
| Organic Search | 11 | 0,6% |
| Referral | 3 | 0,2% |

**Apenas 11 visitas orgânicas em 4 meses** na landing pagam-only. Se Bruno parar a campanha, tráfego cai pra zero. Construir presença orgânica via `/empreendimento/reserva-barigui` é seguro pro longo prazo.

### 3. Conversão muito baixa: 0,7% inicia formulário

Eventos do `/reservabarigui` (4 meses, 1.146 usuários ativos):
- `page_view`: 2.076
- `scroll`: 640 (apenas **36% scrollam**)
- `click`: 57 (apenas **3% clicam**)
- `form_start`: **13 (0,7% começam formulário)**

Funil quebra principalmente entre **page_view → scroll** (-69%) e **scroll → click** (-91%). Página não engaja.

### 4. URLs duplicadas `/reservabarigui` vs `/reservabarigui/`

GA4 mostra:
- `/reservabarigui`: 1.655 visualizações, 1.146 usuários
- `/reservabarigui/`: 421 visualizações, 338 usuários

**~25% do tráfego está caindo em URL duplicada.** Confunde Google (canonical), GA, e atribui mal.

### 5. Empreendimentos com impressões mas ZERO cliques no orgânico

Queries orgânicas no Google que levam impressões pro site principal mas **não convertem em clique** porque não há página otimizada:

| Empreendimento | Impressões (4m) | Cliques | CTR |
|---|---|---|---|
| **Residencial Terracota I** | 76 | 0 | 0% |
| **BW Residence** | 188 | 1 | 0,5% |
| **AMA 1108** | 102 | 1 | 1% |
| **Trebbiano Residencial** | 14 | 0 | 0% |
| **Trevi Batel** | 20 | 0 | 0% |
| **Hike (Auten)** | 14 | 0 | 0% |
| **Le Monde Portão** | 7 | 0 | 0% |
| **Mai Home / Residence** | 1+1 | 0 | 0% |
| **Casa Jobim** | 1 | 0 | 0% |
| **Mova WF** | 1 | 0 | 0% |
| **Studio Park Curitiba** | 2 | 0 | 0% |
| **Vittace Bosque** | 2 | 0 | 0% |

**Total ~430 impressões em queries de marca de empreendimento, ~2 cliques só (CTR 0,4%)**. Cada uma representa um usuário com intenção de compra alta procurando aquele empreendimento específico — sai do Google sem encontrar nada da FYMOOB.

---

## 📊 Dados completos — Reserva Barigui (jan-abr 2026)

### Tráfego
- 1.768 sessões totais
- 1.146 usuários ativos no `/reservabarigui`
- 2.075 visualizações no título "Reserva Barigui" (uma anomalia: 1 view com título "Barigui Reserve" — dever ser bug de renderização)
- Tempo médio de sessão: ~50s
- 1.339 usuários do Brasil (97%)

### Geografia (Top 10 cidades BR)
| Cidade | Usuários | % do BR |
|---|---|---|
| Curitiba | 797 | 60% |
| São Paulo | 224 | 17% |
| Campo Largo | 32 | 2,4% |
| Porto Alegre | 25 | 1,9% |
| Fortaleza | 15 | 1,1% |
| São José dos Pinhais | 15 | 1,1% |
| Belo Horizonte | 11 | 0,8% |
| Rio de Janeiro | 11 | 0,8% |
| Joinville/Florianópolis/Maringá | 8 cada | 0,6% |

**Insight:** público é dominantemente Curitiba (esperado), mas **17% São Paulo** indica investidor nacional (Pessoa Física comprando pra alugar/valorização). Outras capitais (Porto Alegre, Belo Horizonte, Fortaleza) confirmam tese de investidor.

### Eventos (top)
- page_view: 2.076
- session_start: 1.764
- first_visit: 1.357
- user_engagement: 1.145
- **scroll: 640 (36%)**
- **click: 57 (3%)**
- form_start: 13 (0,7%)

### Cohort retention
Quase zero retenção dia 7+. **97% dos visitantes não voltam.** Esperado pra landing de campanha (visitante decide na hora ou some), mas mostra que não há remarketing efetivo.

---

## 🎨 Plano de melhoria — `/empreendimento/reserva-barigui`

A página atual já tem **layout editorial** customizado em [src/data/empreendimento-assets.ts:33](src/data/empreendimento-assets.ts#L33) com:
- Hero com imagens parallax
- Torres separadas (Reserva Lago, Reserva Colina)
- Plantas pra cada torre
- Implantação, lifestyle

Bom ponto de partida. Vou propor melhorias **focadas em SEO + conversão** (não redesign):

### Camada A — SEO (prioridade alta, ROI imediato)

| Ação | Onde | Impacto esperado |
|---|---|---|
| **A.1** Title + meta description com palavra-chave de busca de marca real | `generateMetadata` em [src/app/empreendimento/[slug]/page.tsx:47-69](src/app/empreendimento/[slug]/page.tsx#L47-L69) | Capturar buscas "Reserva Barigui", "Reserva Lago", "Reserva Colina", "Reserva Barigui Avantti", "apartamento Mossunguê Parque Barigui" |
| **A.2** H1 com nome do empreendimento + bairro + diferencial principal | Layout editorial linha 184 | Match exato com query orgânica |
| **A.3** Adicionar bloco textual SEO-friendly (200-400 palavras) sobre o empreendimento, localização, fases | Após hero, antes das torres | Conteúdo pra Google indexar (hoje a página é majoritariamente imagens + dados estruturados) |
| **A.4** Schema RealEstateListing já existe (`combinedSchema` linha 149) — **adicionar** `Place` schema com endereço completo, geo coordinates do empreendimento | Mesmo arquivo | Rich results no Google Maps |
| **A.5** Adicionar `<a href>` interno apontando das landing de bairro `/imoveis/mossungue` pra `/empreendimento/reserva-barigui` | [src/app/imoveis/[bairro]/page.tsx](src/app/imoveis/[bairro]/page.tsx) | Internal linking — passa autoridade da landing de bairro pra landing do empreendimento |
| **A.6** Sitemap entrada `/empreendimento/reserva-barigui` com `priority: 0.9` (hoje deve estar 0.7) | [src/app/sitemap.ts](src/app/sitemap.ts) | Sinal pro Google de prioridade |
| **A.7** Resolver duplicata `/reservabarigui` vs `/reservabarigui/` | Vercel rewrite ou Next.js middleware | 25% do tráfego não dilui mais entre 2 URLs |

### Camada B — Conversão (prioridade alta, ROI imediato)

Atual: 0,7% form_start. Meta: 3-5%.

| Ação | Por que | Impacto |
|---|---|---|
| **B.1** **CTA WhatsApp visível ao primeiro scroll** (não só no fim) | Hoje só tem ao fim. 64% nem rolam. Visitante quer falar agora. | Resgate dos 64% que saem antes |
| **B.2** **Floating action button** WhatsApp persistente no mobile | Padrão imobiliário, esperado | +30-50% conversão móvel |
| **B.3** **Formulário curto inline** (nome + WhatsApp + "qual planta interessa?") logo após hero | Reduz fricção vs link externo pra WhatsApp | +Form_start |
| **B.4** **Calculadora rápida de financiamento** (input: entrada → estimativa parcela MCMV/Caixa) | Empreendimento Reserva Lago tem unidades 1-2 qts populares pra MCMV | Engaja visitante, gera lead com intenção |
| **B.5** **Vídeo 60s do empreendimento** auto-play silencioso ao chegar na página | Vídeo aumenta tempo médio (hoje 50s) e engajamento | +scroll, +tempo |
| **B.6** **Comparador de plantas lado a lado** (Studio vs Loft vs Garden vs Duplex) | Reserva Lago tem variedade — usuário precisa ver tudo junto | +click events, +tempo |

### Camada C — Captura de tráfego cruzado (prioridade média)

| Ação | Detalhe | Impacto |
|---|---|---|
| **C.1** Página `/empreendimento/reserva-colina` (hoje 404) | Query "reserva colina" tem 1 clique e 27 imp; "reserva barigui colina" 2 imp; "reserva barigui lago" 2 imp | Capturar variantes de busca de marca |
| **C.2** Banner discreto na home `fymoob.com.br/` apontando "Imóveis em destaque: Reserva Barigui" | Home recebe 778 cliques/mês orgânicos. Bairro Mossunguê + Reserva = sinergia | Migração orgânica de tráfego pago → orgânico |
| **C.3** Post de blog "Morar no Mossunguê: o que mudou com Reserva Barigui" | Conteúdo cruzando bairro + empreendimento | Long-tail SEO |

---

## 🌟 Plano "Páginas de empreendimento" — replicar pra TOP 10

A planilha do GA4 mostra 12 empreendimentos com **impressões mas zero cliques no orgânico**. Cada um é uma oportunidade de criar página dedicada e capturar tráfego sem custo:

### Top 10 prioritários (por impressões)

| Empreendimento | Bairro | Impressões | Páginas atual? | Ação |
|---|---|---|---|---|
| **BW Residence** | Batel | 188 + 4 | `/empreendimento/bw-residence`? | Verificar/criar |
| **Residencial Terracota I** | Portão | 76 + 16 + 12 + 5 | `/empreendimento/terracota-i`? | Criar — query marca forte |
| **AMA 1108** | Portão | 102 + 3 | Verificar | Criar/otimizar |
| **Trebbiano Residencial** | ? | 14 + 1 | Verificar | Criar |
| **Trevi Batel** | Batel | 20 | Verificar | Criar |
| **Hike (Auten)** | Boa Vista | 14 | `/empreendimento/hike`? | Verificar |
| **AMÁZ** | Bigorrilho | 8 | `/empreendimento/amaz` (existe `/amaz`!) | Otimizar canonical |
| **Casa Jobim** | Campina Siqueira | 1 + 4 | `/empreendimento/casa-jobim` (existe!) | Otimizar |
| **Mai Home/Residence** | Campina Siqueira | 1 + 1 | Verificar | Criar |
| **Mova WF** | Batel | 1 | `/empreendimento/mova-wf`? | Criar |

**Detalhes interessantes do CSV de queries:**
- `/amaz` recebeu 8 impressões orgânicas — URL **diferente** da padrão `/empreendimento/amaz`. Bug de duplicata.
- `/casajobim` recebeu 1 impressão — também duplicata, sem dash.
- `/chateaulatour` 18 impressões — empreendimento que não vimos no CRM (verificar)
- `/veganeoville` 17 impressões — outro
- Várias páginas `/imovel/*` recebem cliques orgânicos sem que ninguém tenha apontado SEO pra elas

### Para criar página de empreendimento (template)

Cada empreendimento que vire página dedicada precisa de:

1. **Adicionar entrada em [src/data/empreendimento-assets.ts](src/data/empreendimento-assets.ts)** com `hasEditorial: true` se tiver assets, ou usar layout standard
2. **Verificar no CRM** que imóveis estão classificados sob esse empreendimento (campo `Empreendimento` no Loft/Vista) — automaticamente puxa
3. **Garantir** que o slug bate (`empreendimento` no CRM → `slugify` no código deve gerar a URL correta)
4. **Adicionar redirect 301** se houver duplicata (ex: `/amaz` → `/empreendimento/amaz`)

---

## 🚦 Roadmap de execução (revisado com queries Google Ads)

### Sprint 1 — Quick wins SEO + WhatsApp (esta semana, ~6h dev)

Foco: **capturar as queries de marca já validadas** + **WhatsApp pipeline** (lift estimado: +50-100% organic CTR + 2-3x conversão).

**SEO — capturar brand search:**
- [ ] **Title** `/empreendimento/reserva-barigui` → `Reserva Barigui Mossunguê | Plantas, Preços e Apartamentos | Avantti FYMOOB` (cobre 7 das top queries)
- [ ] **Meta description** com call-to-action: `Apartamentos no Reserva Barigui em Mossunguê, frente ao Parque Barigui. Plantas, preços e contato direto pelo WhatsApp. Construtora Avantti.`
- [ ] **H1 visível** (hoje é `sr-only`) ou **H2 logo abaixo do logo:** `Reserva Barigui — Apartamentos em Mossunguê, Curitiba`
- [ ] **Anchor IDs visíveis no nav:** `#plantas`, `#precos`, `#galeria`, `#localizacao` — cada um responde uma intenção do GAds
- [ ] **Bloco textual 300 palavras** entre hero e implantação (hoje é só visual; Google não indexa imagem)
- [ ] **Alt text em todas as imagens** com pattern: `"Reserva Lago - planta studio 35m² - Reserva Barigui Mossunguê"` (rankeia Google Images, captura `imagens de reserva barigui colina`)

**WhatsApp pipeline (lift conversão):**
- [ ] **Float WhatsApp persistente mobile** (bottom-right, sempre visível) — hoje é só CTA estático
- [ ] **CTA WhatsApp na 1ª seção** (já tem) + **CTA WhatsApp após cada plant** (novo) + **CTA WhatsApp no fim** (novo)
- [ ] **Mensagem WhatsApp específica por planta clicada** — `?text=Olá! Tenho interesse no Reserva Lago - Studio 35m². Pode me passar mais informações?` (CRM identifica a planta de origem)
- [ ] **Tracking event `whatsapp_click`** com label de seção/planta (mede conversão real)

**GSC + analytics:**
- [ ] **Reconfigurar GSC** — vincular `sc-domain:fymoob.com.br` à propriedade "FYMOOB - Site Principal" (a recém-criada) — você já fez ou está fazendo
- [ ] **Sitemap** subir `/empreendimento/reserva-barigui` pra `priority: 0.9` (hoje 0.7)

### Sprint 2 — Páginas das torres separadas (próxima semana, ~8h dev)

Foco: **capturar queries `reserva lago`, `reserva colina`, `reserva barigui plantas`** com landings dedicadas.

- [ ] **Criar `/empreendimento/reserva-lago`** — landing dedicada da torre
  - Title: `Reserva Lago Curitiba | Studios e Lofts no Parque Barigui | Avantti`
  - H1: `Reserva Lago — Studios, Lofts, Gardens e Duplex em Mossunguê`
  - Plantas só dessa torre + preço a partir de + entrega + diferencial específico
- [ ] **Criar `/empreendimento/reserva-colina`** (hoje 404) — torre Colina
  - Title: `Reserva Colina Curitiba | Apartamentos 4 Quartos Frente Parque Barigui`
  - Plantas só Colina + foco em famílias 4 qts + preço
- [ ] **No `/empreendimento/reserva-barigui` (hub):** adicionar cards "Conheça a torre" linkando pra `/reserva-lago` e `/reserva-colina`
- [ ] **Schema Place** com geo coords + addressLocality "Mossunguê"
- [ ] **Internal linking** `/imoveis/mossungue` → 3 páginas Reserva (hub + 2 torres)
- [ ] **Bloco SEO textual** específico de cada torre (300 palavras cada)

### Sprint 3 — Conversion features avançados (2-3 semanas, ~12h dev)

Foco: **fechar o gap 0,7% → 5%+ conversão**.

- [ ] **Calculadora rápida de financiamento** (entrada → estimativa parcela MCMV/Caixa) — engajamento + qualifica lead
- [ ] **Vídeo 60s auto-play silencioso** no hero (lift 80% conversão segundo benchmarks)
- [ ] **Comparador lado a lado** das plantas (Studio vs Loft vs Garden vs Duplex)
- [ ] **Tour 360° / Maquete 3D** (R2U.io ou Matterport) — diferencial 2026
- [ ] **Form inline curto** ("Quero conhecer a planta" — só nome + WhatsApp + planta de interesse)
- [ ] **Trust signals:** logo Avantti, CRECI FYMOOB visível, número de unidades vendidas

### Sprint 4 — Páginas de empreendimento Top 10 (3-4 semanas, ~20h dev)

Foco: **replicar pra empreendimentos com tráfego perdido no GSC**.

Por ordem de impressões orgânicas confirmadas:
- [ ] **BW Residence** (Batel) — 188 imp / 1 clique = oportunidade
- [ ] **Residencial Terracota I** (Portão) — 76+16+12 = 104 imp / 0 cliques
- [ ] **AMA 1108** (Portão) — 102 imp / 1 clique
- [ ] **Trevi Batel** — 20 imp / 0 cliques
- [ ] **Hike** (Boa Vista, Auten) — 14 imp / 0 cliques
- [ ] **AMÁZ** (Bigorrilho) — duplicata `/amaz` vs `/empreendimento/amaz` — fix canonical
- [ ] **Casa Jobim** (Campina Siqueira) — duplicata `/casajobim` — fix
- [ ] **Mai Home/Residence** — verificar nome no CRM
- [ ] **Mova WF** (Batel) — verificar nome no CRM
- [ ] **Vittace Bosque** (CIC) — 2 imp + tem unidades

Cada um precisa: título otimizado + meta + bloco SEO + WhatsApp CTA estruturado.

### Sprint 5 — Conteúdo e long-tail (1 mês+)

- [ ] **Post blog "Morar no Mossunguê"** cruzando com Reserva Barigui (link interno) — cauda longa: `morar mossunguê`, `mossunguê é bom`, `bairro mossunguê curitiba`
- [ ] **Post blog "Bairros próximos ao Parque Barigui"** — captura `morar próximo parque barigui`, `bairros parque barigui`
- [ ] **Audit completo** dos 50+ empreendimentos do CRM e qualidade das páginas
- [ ] **Validar GA4 "FYMOOB - Site Principal"** com dados populando — primeiro relatório real comparativo

---

## 📈 Métricas pra acompanhar (após cada sprint)

| Métrica | Baseline atual | Meta 90 dias |
|---|---|---|
| Cliques orgânicos `/empreendimento/reserva-barigui` | 0 | 50+/mês |
| `form_start` em `/reservabarigui` campanha + `/empreendimento/reserva-barigui` site | 13 (4 meses) | 50+/mês cada |
| Impressões orgânicas "Reserva Barigui" | 0 conhecidas | 200+/mês |
| Posição média "Reserva Barigui" | sem dados | top 5 |
| Cliques orgânicos página principal `/` | 778 (4m) | 1.500/mês |
| Páginas de empreendimento com >10 cliques/mês | 0 | 5 |

---

## 🛠️ Notas técnicas pra implementação

### Sobre canonical e duplicatas

Implementação recomendada em `next.config.ts` ou middleware:

```ts
// next.config.ts ou via redirects:
{
  source: '/reservabarigui',
  destination: 'https://fymoob.com.br/empreendimento/reserva-barigui',
  permanent: true,
  has: [{ type: 'host', value: 'destaques.fymoob.com' }]
}
// idem pra /amaz → /empreendimento/amaz, etc
```

Mas atenção: a landing `destaques.fymoob.com/reservabarigui` é da campanha paga do Bruno — pode ser hospedada em outro lugar (Atomicat?). Validar antes de redirecionar.

### Sobre GSC + GA4 propriedade

GA4 → propriedade "Fymoob - Reserva Barigui" → Admin → **Vínculos do Search Console**:
1. Desvincula a entrada atual (que mostra dados do site principal)
2. Mantém só vinculações específicas pro subdomínio (se existirem)

Depois GA4 → propriedade "FYMOOB - Site Principal" → Admin → Vínculos do Search Console:
1. **Vincular** com `sc-domain:fymoob.com.br`
2. Confirma propriedade

### Sobre criação de novas páginas de empreendimento

A infraestrutura JÁ existe em `/empreendimento/[slug]`. Pra ativar:
1. Confirmar no CRM Loft que o empreendimento está cadastrado com nome exato
2. O `slugify` gera o slug automaticamente
3. Página renderiza com layout standard (sem assets editoriais)
4. Pra layout premium: adicionar entry em `empreendimento-assets.ts`

Não precisa de nova rota — só dado.

---

## ⚡ Implementação imediata possível (4-8h dev)

Se topar começar agora, posso implementar em 1 sprint:

1. **Title/meta otimizados** pra `/empreendimento/reserva-barigui` (15 min)
2. **Bloco SEO textual** (300 palavras) inserido (1h)
3. **CTA WhatsApp visível primeiro scroll + float mobile** (2h)
4. **Schema Place enrichido** (30 min)
5. **Sitemap priority 0.9** pros 5 editorial empreendimentos (15 min)
6. **Auditar duplicata `/reservabarigui` em produção** + redirect se aplicável (1h)
7. **Criar `/empreendimento/reserva-colina`** (verificar se nome bate no CRM, 30 min)

Tempo total: **~6h**. ROI: tráfego orgânico começa a crescer em 2-4 semanas.

Quer que eu execute esse pacote agora?
