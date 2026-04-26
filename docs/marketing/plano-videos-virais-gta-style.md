# Plano de Produção — Vídeos Virais GTA-style FYMOOB

> **Status:** Aprovação pendente (orçamento + URL do vídeo de referência)
> **Owner:** Vinicius (produção) + Bruno (aprovação criativa) + Wagner (apoio)
> **Criado:** 2026-04-25
> **Próxima revisão:** após validação do MVP (semana 2)

---

## TL;DR — 30 segundos pra decisão

- **5 Reels em 5 semanas**, estética GTA San Andreas adaptada pra Curitiba (não vídeo isolado — séries convertem ~3-5x mais)
- **Persona âncora:** "Lamar do Cajuru" — corretor brasileiro num pastiche cômico (template TikTok já validado em outros nichos)
- **Higgsfield Ultra ($84/mês)** + add-ons = **~R$ 1.200/mês total** (incluindo música Epidemic Sound)
- **Distribuição:** Instagram Reels prioritário, TikTok crosspost no dia seguinte (público FYMOOB vive em Insta — DMs convertem 5x melhor pra imobiliário BR)
- **KPI principal:** **DMs qualificadas/Reel** (meta ≥15). Views são vaidade — DMs viram lead.
- **Janela competitiva:** 12-18 meses antes de Razzi/Apolar/JBA copiarem o formato. Mover rápido.
- **Risco legal:** controlado se seguirmos o checklist (fonte Pricedown Black da Typodermic é **free comercial**, música original, zero menção a "GTA/Rockstar" em caption)

---

## 1. Conceito narrativo

### Premissa central

> "**Lamar do Cajuru**, corretor lendário de Los Curitibos, te apresenta o imóvel da semana — narrado como se fosse uma missão do GTA San Andreas adaptada pra Curitiba."

Cada Reel = 1 missão = 1 imóvel. Lamar dirige até o imóvel, abre tela de "compra" estilo Dynasty 8 Real Estate, mostra o imóvel em câmera estilo helicóptero/drone do jogo, finaliza com "PROPERTY ACQUIRED" estilo "MISSION PASSED".

### Por que Lamar (e não Michael/Trevor)

Da pesquisa de referências GTA:
- **Lamar Davis** já é template viral consolidado no TikTok ("Lamar Roasts Franklin" tem 800M+ views agregados em 2024-2025)
- Brasileiros 25-45 reconhecem instantaneamente o tom "Lamar" — sotaque, pontuação cômica, expressões
- Risco legal MENOR que usar Michael/Trevor (fan content com Lamar tem track record de não ser derrubado)
- Adaptação Curitiba: "Lamar do Cajuru" sotaque sulista, jargão local ("trazê", "dale", "cuti-cuti"), referências a Cajuru, Centro Cívico, Batel — mistura de "humor curitibano" com tom GTA
- Detalhes em [docs/marketing/research/gta-references-2026-04.md](research/gta-references-2026-04.md) — seção "3 propostas de personagem narrador"

### Tom

- **Não-corporativo, mas classy.** Humor moderado (não pega-leve nem trash). Bruno aprova humor desde que mantenha imagem premium.
- **Cinemático nas tomadas, ridículo no narrador.** Contraste é o que faz funcionar.
- **Pastiche reconhecível em <2s.** Quem não joga GTA precisa pegar a referência pelo grading + UI overlays + jingle.

---

## 2. Stack técnico

### 2.1 Higgsfield AI — combinação de modelos

A pesquisa técnica confirmou que **nenhum modelo sozinho resolve**. Combinação otimizada:

| Modelo | Função no pipeline | Por quê |
|---|---|---|
| **Nano Theft** (preset Higgsfield) | Estilização inicial das fotos do imóvel | Único preset GTA-style produtizado no mercado. ATENÇÃO: testado em pessoa, **não validado em arquitetura**. Validar com créditos de teste antes de comprometer. |
| **Kling 3.0 + Element Library** | Corretor (Lamar do Cajuru) consistente entre takes | Único modelo com voice binding + character consistency real. Crítico pra manter Lamar igual nos 5 Reels. |
| **Cinema Studio 3.5 / DoP** | Drone fly-through, crash zoom, FPV aéreo | 50+ camera moves, stack de até 3 movimentos. Essencial pro "voo de helicóptero estilo GTA". |
| **Seedance 2.0** | B-roll rápido (transições, ambiente) | 45-90s render — o mais rápido do catálogo Higgsfield. Bom pra preencher transições. |

**Plano:** Higgsfield Ultra **$84/mês** (3.000 créditos) — Plus $34/mês não cabe pra 5 Reels com iteração 3-5x por clip.

### 2.2 Limites duros (não negociáveis)

- **Nenhum clip > 15s** no Higgsfield. Reel de 25-30s = montagem em CapCut com 4-5 clips de 5-8s.
- **9:16 vertical** suportado em todos os modelos. Validar drone preset não distorce em 9:16 (pendência de teste).
- **Image-to-video:** todos os modelos aceitam. Partimos de fotos reais dos imóveis (já temos no CRM Loft).

### 2.3 Stack de edição (pós-IA)

| Ferramenta | Função | Custo |
|---|---|---|
| **CapCut Pro** | Montagem final + UI overlays + sincronia áudio | R$ 49/mês (ou versão grátis pra MVP) |
| **Epidemic Sound** | Música royalty-free West Coast Hip Hop / Synthwave | $15/mês ($180/ano) |
| **Pixabay/Freesound** | SFX (cash-ka-ching, mission complete jingle royalty-free) | Grátis |
| **Pricedown Black** (Typodermic) | Fonte tipo GTA — **FREE comercial** | Grátis |

### 2.4 Custo total mensal estimado

| Item | Custo BRL/mês |
|---|---|
| Higgsfield Ultra | ~R$ 460 ($84) |
| Epidemic Sound | ~R$ 80 ($15) |
| CapCut Pro | R$ 49 |
| Buffer (15% pra créditos extra Higgsfield) | ~R$ 90 |
| **Total mensal** | **~R$ 680** |

Mês 1 inclui experimentação extra (~R$ 1.200 considerando teste de modelo + iteração inicial). Estabiliza em R$ 680/mês a partir do mês 2.

> **Nota:** custo de produção pré-GTA-style era R$ 0 (FYMOOB não fazia social pago). Comparativo de mercado: agências cobram R$ 8-15k/mês pra mesma cadência de 4-5 Reels — hoje fazemos 5 Reels/mês com R$ 680, sem agência.

---

## 3. Storyboard dos 5 vídeos (série piloto)

> **Estrutura comum a todos:** Hook GTA-style nos 0-3s (50% dos viewers caem em 3s — o frame 0 precisa **ser GTA** sem intro institucional) → reveal do imóvel em 4-15s → tela "PROPERTY ACQUIRED" + CTA discreta nos últimos 3s.

### Vídeo 1 — "MISSÃO 01: O PENTHOUSE DO ECOVILLE"
**Duração:** 27s | **Hook:** câmera em primeira pessoa correndo na rua de Curitiba estilizada, cutscene "STARTING MISSION..." aparece → corta pra Lamar entrando no carro

- **0-3s:** HUD GTA aparece (mapa de Curitiba estilizado, vida 100%, dinheiro R$ 0). Texto "MISSION 01: THE ECOVILLE PENTHOUSE"
- **3-8s:** Lamar narrando "Aí, mano, recebi um trampo dos brabos hoje" enquanto dirige (estilizado) pelo Ecoville
- **8-18s:** Drone fly-through estilo GTA Online sobrevoa o prédio. UI overlay com nome do imóvel + preço aparecendo letra por letra
- **18-25s:** Interior em fly-through (3-4 cômodos), cada um com label "BEDROOM 1: VIEW LOS CURITIBOS" estilo videogame
- **25-27s:** Tela "PROPERTY ACQUIRED — RESPECT +500" + CTA discreta "DM @fymoob"

**Imóvel sugerido:** penthouse Ecoville (alto valor + perfil-alvo). Bruno indica qual.

### Vídeo 2 — "AS SUPERESTRELAS DO BATEL: 4 OPÇÕES"
**Duração:** 22s | **Hook:** tela tipo "Legendary Motorsport" mas com casas no lugar de carros

- **0-3s:** Tela "FYMOOB EXECUTIVE REAL ESTATE" com 4 cards de imóveis, estilo seleção do GTA V
- **3-15s:** Lamar narrando, cursor seleciona cada um dos 4: "Aqui ó: o Sobrado Imperial — 320m², 4 vagas, vista pro Parque Barigui. Próximo!" — corta pra spec rápido com label flutuante por imóvel
- **15-20s:** Lamar conclui "Qual desses tu compra primeiro? Comenta o número aí"
- **20-22s:** Logo FYMOOB + "DM PRA AGENDAR VISITA"

**Importante:** este Reel é o que mais imita o vídeo dos caminhões NFS — formato "tela de garagem". Provavelmente o de maior potencial viral da série.

### Vídeo 3 — "POV: RECEBI MEU 1º COMISSIONAMENTO"
**Duração:** 18s | **Hook:** cold open com tela "WASTED" cortada por "JK — VOCÊ FECHOU R$ 80K"

- **0-3s:** Lamar deitado no chão, tela vermelha "WASTED" aparece — anti-climático
- **3-6s:** Tela vira verde, ka-ching, "JUST KIDDING — VOCÊ FECHOU R$ 80.000 EM COMISSÃO"
- **6-15s:** Lamar reage exagerado, dinheiro voando, mostrando o imóvel que ele "vendeu" (apartamento Batel)
- **15-18s:** "QUER VENDER NO TEU NOME? DM @FYMOOB" — CTA pra captar quem quer ser corretor

**Variação:** este pega o público "quero ser corretor" — segmento que ninguém em Curitiba está atacando em vídeo viral. Lateral, mas estratégico (FYMOOB pode recrutar corretor via viralização).

### Vídeo 4 — "AS 5 ARMADILHAS DO COMPRADOR INICIANTE (MODO HARDCORE)"
**Duração:** 30s | **Hook:** tela "DIFFICULTY: HARDCORE" estilo GTA antes de missão difícil

- **0-3s:** Tela "DIFFICULTY: HARDCORE — COMPRAR PRIMEIRO IMÓVEL EM CWB"
- **3-25s:** Lamar lista 5 armadilhas (ITBI, financiamento ruim, escritura sem certidão, condomínio impagável, vizinhança ruim) — cada uma com efeito de "wanted star" subindo
- **25-30s:** "EVITA TUDO ISSO — DM PRA AGENDAR ASSESSORIA GRÁTIS"

**Cross-link com nosso conteúdo:** este Reel referencia 5 dos posts já publicados (ITBI, financiamento, checklist, documentos, faixas de preço). Aumenta tempo no site quando viewer clica.

### Vídeo 5 — "QUANTO CUSTA MORAR EM CADA ZONA DE CURITIBA?"
**Duração:** 25s | **Hook:** mapa GTA de Curitiba com territórios coloridos (gangues estilo SA)

- **0-3s:** Mapa de Curitiba estilizado tipo "territory map" do San Andreas, zonas coloridas
- **3-22s:** Lamar passa por cada zona-cor mostrando preço médio do m² e perfil. "Batel — território rico. Cajuru — zona família. Centro — zona perigo (mas potencial!)"
- **22-25s:** "QUAL ZONA TU MORARIA? COMENTA AÍ"

**Engagement:** este formato força comentários (cada um defendendo seu bairro) — algoritmo Reels 2026 prioriza comentários como sinal de retenção.

---

## 4. Pipeline de produção (8-10 dias por vídeo)

### Fase A — Briefing + roteiro (Dia 1-2)
- [ ] Bruno escolhe imóvel da semana
- [ ] Vinicius escreve roteiro de 25-30s no Manual Editorial (tom Lamar)
- [ ] Wagner valida tom (não pode pegar mal pro perfil premium)

### Fase B — Captura de assets (Dia 2-3)
- [ ] Coletar 6-10 fotos do imóvel do CRM Loft (mínimo 3 ângulos diferentes)
- [ ] Se imóvel novo (sem fotos drone): agendar captura adicional com fotógrafo (~R$ 200)
- [ ] Coletar 1-2 fotos genéricas do bairro/cidade pra estabelecer locação

### Fase C — Geração IA (Dia 3-6)
- [ ] **Estilização** (Nano Theft) das fotos pra look GTA — testar 2-3 prompts até bater o look
- [ ] **Personagem Lamar** (Kling Element Library) consistente entre clips — usar mesmo seed/element entre os 5 Reels
- [ ] **Drone fly-through** (Cinema Studio DoP) — 1-2 takes aéreos
- [ ] **Interior tour** (Cinema Studio + Seedance) — 3-4 cômodos animados
- [ ] **B-roll de transições** (Seedance) — chamas, dinheiro voando, etc.
- [ ] Iterações: 3-5 tentativas por clip pra chegar em 1 utilizável

### Fase D — Edição (Dia 6-8)
- [ ] CapCut Pro: monta 4-5 clips de 5-8s em vídeo final 25-30s
- [ ] Sobrepor UI/HUD (mapa, vida, dinheiro) — assets pré-criados em Figma reutilizáveis
- [ ] Aplicar fonte Pricedown Black em texts
- [ ] Sincronizar música Epidemic + SFX (cash, mission complete)
- [ ] Captions na cor verde/laranja estilo GTA

### Fase E — Review + publicação (Dia 9-10)
- [ ] Bruno aprova versão final
- [ ] Wagner valida (consistência com identidade premium)
- [ ] Publicar Instagram Reels (terça/quarta/quinta 11-13h ou 19-21h BRT — pico imobiliário BR)
- [ ] Crosspost TikTok no dia seguinte (com adaptação de caption)
- [ ] Cross-promote em Stories @fymoob e LinkedIn pessoal (Bruno)

**Tempo total/vídeo:** 8-10 dias com 2 vídeos em paralelo. Cadência: **1 Reel publicado por semana** durante 5 semanas.

---

## 5. Cronograma — 5 semanas

| Semana | Atividade | Entregável |
|---|---|---|
| **Pré-zero** (3-5 dias) | Setup Higgsfield Ultra + criar Lamar Element Library + presets de UI no CapCut/Figma + fonte Pricedown instalada + assets de áudio | Stack pronto pra produção em série |
| **Pré-zero (paralelo)** | **TESTE DE VALIDAÇÃO** — gerar 1 Nano Theft em foto de imóvel real (não pessoa) pra validar se preset funciona em arquitetura | Decisão go/no-go ou plano B |
| **Semana 1** | Roteiro + produção V1 (Penthouse Ecoville) | V1 publicado quarta da semana 1 |
| **Semana 2** | Análise V1 (KPIs após 72h) + produção V2 (Tela de garagem 4 imóveis) | V2 publicado, ajuste de copy/hook se KPI baixo |
| **Semana 3** | V3 (POV comissão) | V3 publicado |
| **Semana 4** | V4 (5 armadilhas hardcore) | V4 publicado |
| **Semana 5** | V5 (Mapa territórios CWB) + análise da série completa | V5 publicado, relatório de série, decisão sobre temporada 2 |

**Decisão pós-série:** se ≥3 dos 5 atingirem meta de KPI, renovar Higgsfield + planejar série 2 (5 Reels novos). Se ≤2 atingirem, pivotar formato.

---

## 6. KPIs e medição

### Hierarquia de KPIs (do mais ao menos importante)

1. **DMs qualificadas/Reel** ⭐ — meta ≥15. KPI #1 porque DM = lead direto. Reels 2026 (Mosseri) confirma DMs como sinal #1 de distribuição.
2. **Saves/Reel** — meta ≥500. Saves no Reels indicam intenção (vai voltar pra ver). Algoritmo prioriza.
3. **Visitas agendadas via DM** — meta ≥3 por Reel. Conversão direta.
4. **Completion rate** — meta ≥65%. Benchmark TikTok 2026 viral é 70%; Reels imobiliário 60-65%.
5. **Shares** — meta ≥200. Share = "preciso mostrar isso pra alguém" (cônjuge, amigo procurando imóvel).
6. **Views** ❌ — métrica de vaidade. Não otimizar por isso.
7. **Followers ganhos** — meta ≥500/Reel. Sequência da série retém o follower novo.

### Análise pós-cada-Reel (72h)

Template de relatório (1 página por Reel):
- Métricas hierárquicas acima
- Top 5 comentários (sentiment)
- DMs recebidas categorizadas (lead quente / curiosidade / spam)
- 1 hipótese de melhoria pro próximo Reel

### Sucesso da série completa

- **Meta mínima:** ≥1 dos 5 Reels com 50k+ views + ≥3 leads convertidos em visita
- **Meta confortável:** ≥3 dos 5 com 100k+ views + ≥10 leads convertidos
- **Meta ambiciosa:** ≥1 viral (500k+ views) + sequência de série 2 já planejada

Comparação: Ricardo Martins (corretor Goiânia) bateu 5,1M views num Reel "POV carro 26º andar" e vendeu casa de R$17M via TikTok. Não é fantasia — é benchmark.

---

## 7. Risco legal & checklist pré-publicação

### Risco resumido (da pesquisa)

- **Take-Two Interactive (dono Rockstar/GTA) é AGRESSIVA com DMCA.** Caso recente (dez/2025): derrubaram fan browser GTA Vice City em 48h.
- **Mas:** caso E.S.S. Entertainment v. Rockstar (2008) estabelece que paródia artística é protegida pelo First Amendment (US) — base legal pra defender produção em homenagem.
- **Risco MAIOR:** uso direto de fonte oficial Pricedown Intl (DRM), música oficial GTA, logos GTA/Rockstar, modelos 3D dos personagens.
- **Risco MENOR:** paleta de cores, tropos genéricos de videogame, fontes alternativas (Pricedown Black da Typodermic é **free comercial**), SFX inspirados em jingles.

### Checklist obrigatório pré-publicação (cada Reel)

- [ ] Fonte usada é Pricedown **Black** (Typodermic, free comercial) — NÃO a fonte original Pricedown Intl
- [ ] Música é Epidemic Sound / Artlist royalty-free (não trilha oficial GTA)
- [ ] Não tem logo GTA, logo Rockstar, logo Take-Two visível em frame nenhum
- [ ] Não tem modelo 3D direto de Michael/Trevor/Franklin (só inspiração)
- [ ] Caption NUNCA menciona "GTA", "Rockstar", "San Andreas" — usar circunlocuções tipo "modo videogame", "estilo dos anos 2000", "homenagem aos clássicos"
- [ ] Hashtags: ❌ #GTA #GTAV #SanAndreas #Rockstar — ✅ #ImoveisCuritiba #PovCorretor #VideogameStyle #LamarCuritiba
- [ ] Música não usa trilha trending licenciada Take-Two (raro, mas verificar)
- [ ] SFX são de Pixabay/Freesound (free comercial), não rip do jogo

### Plano de contingência se receber DMCA

1. Remover Reel imediatamente
2. Republicar versão "sanitizada" (mais distância da estética)
3. Considerar mudança pra estética **Saints Row** ou **Mafia** (alternativas legalmente mais seguras — Saints Row tem mecânica imobiliária e Volition foi extinta em 2023)
4. Plano B detalhado em [docs/marketing/research/gta-references-2026-04.md](research/gta-references-2026-04.md), seção "Gaps + próximos passos"

---

## 8. Validações pré-investimento (testes a fazer com R$200 de créditos)

Antes de comprometer Higgsfield Ultra mensal, **testar com créditos de teste** se 3 hipóteses funcionam:

### Teste 1 — Nano Theft em arquitetura
- Hipótese: preset Nano Theft (testado em pessoa) também funciona em foto de imóvel
- Como testar: pegar 3 fotos de imóveis FYMOOB no CRM, gerar 5-8 variações cada
- Critério de sucesso: 1 das 3 fotos resulta em estética GTA reconhecível com aparência aceitável (sem distorção arquitetônica grotesca)
- Custo: ~50 créditos (~R$ 50)
- Decisão: se falha, ir pra **plano alternativo** — usar imagem editada manual em Photoshop/Krea com filtros GTA-LUT (custo manual ~R$ 30/imagem)

### Teste 2 — Kling consistência Lamar
- Hipótese: Kling 3.0 mantém Lamar igual em 3 cenas diferentes (carro, frente do imóvel, interior)
- Como testar: gerar 3 takes de 5s do "Lamar do Cajuru" em cenários distintos
- Critério de sucesso: face/corpo reconhecíveis como mesma pessoa, mesma roupa, mesmo timbre de voz
- Custo: ~80 créditos (~R$ 80)
- Decisão: se falha, simplificar — Lamar só aparece em 1 take de "talking head", resto é narração off

### Teste 3 — 9:16 + drone preset
- Hipótese: Cinema Studio gera drone fly-through em 9:16 sem distorção
- Como testar: 1 take de 5s, drone aéreo sobre imagem de prédio
- Critério de sucesso: composição balanceada em 9:16, sem warping
- Custo: ~30 créditos (~R$ 30)
- Decisão: se falha, captura real com drone (FYMOOB já tem fotógrafo parceiro?)

**Investimento total de validação:** ~R$ 160 de créditos. Se 2 dos 3 passam, GO. Se ≤1 passa, REPENSAR formato.

---

## 9. Riscos & mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Nano Theft não funciona em arquitetura | MÉDIA | ALTO | Plano B: filtro manual Photoshop/Krea |
| Lamar não fica consistente entre Reels | MÉDIA | MÉDIO | Reduzir aparição de personagem, usar narração off |
| Take-Two emite DMCA | BAIXA | ALTO | Checklist seção 7 + plano contingência Saints Row |
| Reels 1-2 não atingem KPI | MÉDIA | MÉDIO | Ajustar hook/copy nos Reels 3-5; pivotar pra estética alternativa se necessário |
| Bruno acha humor "exagerado" | BAIXA | MÉDIO | Wagner valida tom antes de publicar; tons mais classy nos Reels iniciais, escalar humor depois de validar |
| Custo Higgsfield maior que esperado por re-iteração | MÉDIA | BAIXO | Plus → Ultra é upgrade simples; budget tem buffer 15% |
| Concorrente local copia formato em <3 meses | MÉDIA | BAIXO | Vantagem é "primeiro a fazer" + persona Lamar do Cajuru exclusiva nossa |
| Imóvel mostrado vende rápido (Reel fica datado) | ALTA | BAIXO | Reposicionar Reel como "case de venda" no carrossel @fymoob/destaque |

---

## 10. Pendências bloqueantes (preciso do Bruno)

1. **🚨 URL do vídeo de referência (caminhões NFS)** — nenhum dos 3 agentes localizou. Bruno enviou no WhatsApp? Mandar link Insta/TikTok pra análise estrutural específica.
2. **Aprovação de orçamento** — R$ 1.200 mês 1, R$ 680/mês a partir do 2º mês. Confirma?
3. **Escolha do imóvel V1 (Penthouse Ecoville sugerido)** — qual imóvel quer usar de piloto? Idealmente: alto valor + boas fotos no CRM + ainda no estoque (não vai vender em 2 semanas)
4. **Validação criativa do tom Lamar do Cajuru** — preocupado que o humor "pegue mal" pro perfil premium? Plano B: tom mais cinematográfico sem persona cômica (perde humor mas mantém estética)
5. **Permissão pra fotógrafo agendado** se imóvel não tem fotos drone (~R$ 200 adicionais por Reel se necessário)

---

## 11. Próximos passos (na ordem)

- [ ] **Bruno aprova** este plano + orçamento + URL referência (esta semana)
- [ ] **Vinicius compra** Higgsfield Plus $34 pra teste de validação (~R$ 200, dia 1)
- [ ] **Vinicius executa Testes 1-2-3** (Seção 8) — 2-3 dias
- [ ] **Decisão go/no-go pós-teste** — sintetizar relatório de validação
- [ ] **Se GO:** upgrade pra Ultra + assinar Epidemic Sound + começar V1
- [ ] **V1 publicado** ~7-10 dias após go
- [ ] **Análise pós-72h V1** define ajustes V2-V5

---

## 12. Documentos relacionados

- **Pesquisa Higgsfield modelos:** [docs/marketing/research/higgsfield-models-2026-04.md](research/higgsfield-models-2026-04.md)
- **Pesquisa referências GTA:** [docs/marketing/research/gta-references-2026-04.md](research/gta-references-2026-04.md)
- **Pesquisa mecânicas virais:** [docs/marketing/research/short-form-viral-mechanics-2026-04.md](research/short-form-viral-mechanics-2026-04.md)
- **Memória:** Bruno é o cliente — perfil em `C:\Users\Vine\.claude\projects\c--Users-Vine-fymoob\memory\project_client.md`

---

**Mantido por:** Vinicius
**Última atualização:** 2026-04-25
