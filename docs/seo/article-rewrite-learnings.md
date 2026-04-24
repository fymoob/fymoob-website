# Aprendizados da Reescrita de Artigos FYMOOB

> Log incremental — a cada post reescrito, adicionar uma seção.
> O próximo rewrite DEVE incorporar os aprendizados acumulados.
> Metodologia completa: ver memória `feedback_article_rewrite_methodology.md`.

## Índice de posts reescritos

| # | Post | Data | Commit | Prioridade | Status |
|---|---|---|---|---|---|
| 1 | como-financiar-minha-casa-minha-vida | 23/04/2026 | `e98b038` + `553b16c` | — (newsjacking MCMV Faixa 4) | ✅ |
| 2 | financiamento-caixa-itau-bradesco-comparativo | 23/04/2026 | `af60233` | ALTA (241 imp/0 clicks) | ✅ |
| 3 | mercado-imobiliario-curitiba-2026 | 23/04/2026 | `dbea2d6` | P0 | ✅ |
| 4 | itbi-curitiba-valor-como-pagar | 24/04/2026 | `94d2255` | ALTA ⭐ | ✅ |
| 5 | preco-metro-quadrado-curitiba-bairro | 24/04/2026 | `67b535b` | ALTA | ✅ |
| 6 | melhores-bairros-curitiba-2026 | 24/04/2026 | `4a39e25` | ALTA | ✅ |
| 7 | batel-vs-agua-verde-curitiba | 24/04/2026 | `61c5265` | ALTA | ✅ |
| 8 | quanto-custa-morar-batel-curitiba | 24/04/2026 | `1c1fb03` | ALTA | ✅ |
| 9 | ecoville-vs-bigorrilho-curitiba | 24/04/2026 | `3f71a8f` | ALTA | ✅ |
| 10 | checklist-compra-imovel | 24/04/2026 | TBD | ALTA | ✅ |
| 11 | documentos-comprar-imovel-curitiba | 24/04/2026 | TBD | ALTA | ✅ |

---

## Post 1 — MCMV Faixa 4 (23/04/2026)

### O que funcionou

- **Newsjacking em 24h** da mudança de regra MCMV (22/04 → publicado 23/04) capturou momentum máximo da query
- **Claude Design** pra OG image custom — visual forte, ranking primário em shares
- **Correção factual pré-distribuição** — após publicar "Faixa 4 é nova", WebFetch gov.br revelou que era "ampliada". Rollback imediato antes de distribuir salvou reputação YMYL

### O que NÃO funcionou

- **Publicou antes de validar** — escrevi o post sem passar em fontes primárias (gov.br/Ministério das Cidades). Só depois que Vinicius perguntou "entrou em vigor ontem mesmo?" o erro apareceu
- **Imagem PNG estourou cota Vercel Image Optimization** (402 Payment Required). Teve que converter pra WebP + `unoptimized` em 2 componentes

### Aprendizado pro próximo

- **YMYL sempre passa por WebFetch em fonte primária ANTES de publicar**, não depois
- **OG image = WebP pré-dimensionada 1200x630** + `unoptimized` em todos os components que consomem (`BlogCard`, hero do post)

---

## Post 2 — Financiamento Caixa/BRB/Itaú/Santander/Bradesco (23/04/2026)

### O que funcionou

- **Team agent (2 agentes paralelos)** — editorial excellence + data validation — gerou em 1 request o que levaria dias de pesquisa manual
- **Manual Editorial criado como output** — virou regra reutilizável pra TODO post futuro, não só pra este
- **Descoberta de discrepância crítica** — agent de data validation identificou que "R$ 270k" só bate com imóvel R$ 1M+ (não o cenário padrão R$ 500k). Evitou publicar número falso.
- **Expansão de 3 → 5 bancos** agregou BRB (surpresa de ranking) e Santander, aumentando o diferencial vs Exame/MySide
- **CET > taxa nominal** virou insight central do post (Itaú tem CET maior que Santander apesar da taxa nominal menor) — diferenciação competitiva real

### O que NÃO funcionou

- **Agent editorial misturou recomendações com exemplos genéricos** — tive que filtrar manualmente qual dado aplicar ao post específico
- **Número R$ 270k aparecia na style guide como padrão** mesmo após a validação provar que era falso pro cenário padrão — houve risco de reescrever o post mantendo o número errado. Evitado por checagem cruzada.
- **Não foi pedido nenhum agent específico de SEO/SERP** — perdi oportunidade de validar keyword cluster e PAA real

### Aprendizado pro próximo

- **Sempre incluir agent de SEO/SERP** — valida SERP atual, PAA, competidores, featured snippet gaps
- **Cross-check obrigatório entre agentes** — se agent A recomenda usar número X e agent B diz que X é falso, SEMPRE priorizar B (dados > estilo)
- **Agent writer/craft deve receber o post atual + dados já validados** — não deve inventar números em seus exemplos (risco de contaminar o rewrite final)
- **Separar output "regra geral" de "recomendação pro post específico"** — agents devem ser explícitos sobre qual é qual

### Impacto esperado (medir em 30/04)

- CTR: 0% → 2-4% (baseline 241 imp/sem, pos 6.7)
- Position: 6.7 → 3-5 (em 60-90 dias)
- Impressions: crescer via adição de keywords "BRB", "CET", "Santander"

---

---

## Post 3 — Mercado Imobiliário Curitiba 2026 (23/04/2026)

**Primeira aplicação completa da metodologia multi-agent (5 specialists em paralelo).**

### O que funcionou

- **5-agent team em paralelo (data + macro + local + writer + SEO)** gerou profundidade que 2-agent não tinha captado. Cada especialista trouxe 2-3 achados únicos que outros perderiam.
- **Cross-check entre agents salvou YMYL.** Writer specialist propôs lide com "Mercês passou Batel" baseado no audit preliminar — agent local validou via FipeZap e mostrou que o real era **Ahú +12,5%**, não Mercês. Sem o cross-check, publicaríamos um erro factual.
- **Gap único local (Lei 16.361/2024)** — agent local descobriu a Lei do Potencial Construtivo Adicional que explica por que Batel valoriza menos apesar dos lançamentos. Esse é o tipo de insight que só especialista local acha. Virou seção inteira do post.
- **Ângulo "boom, bolha ou filtro?"** — combinou 3 specialists (EconomiaPR "filtro", macro "não é bolha mas tem pressão", local "Ahú supera Batel"). Pergunta tripla no título cria curiosity gap sem enganar porque o post responde cada uma honestamente.
- **Featured snippet catchable** — SEO specialist identificou que "existe bolha em Curitiba?" é PAA + gap simultâneo. Post tem answer-first + 3 bullets exatos — formato de snippet.
- **Número-âncora honesto** (Curitiba +17,86% = 2ª capital BR) substituiu o clickbait falso ("bolha em Curitiba") com algo igualmente forte e validável.
- **Voz natural pronta no writer brief** — Seu Dinheiro + Bem Paraná como referências. Lide e transições saíram do brief, não do meu cérebro.

### O que NÃO funcionou

- **Writer specialist recebeu input contaminado do audit preliminar.** O audit anterior tinha mencionado "Mercês +9%" como ângulo (errado). O writer agent usou esse dado na lide inicial. Só foi corrigido quando o agent local trouxe FipeZap validado.
- **Serialização vs paralelização** — agents rodaram todos em paralelo (economiza tempo), mas writer deveria idealmente rodar DEPOIS do data validation. Trade-off: velocidade vs. correção.
- **Yield por bairro no gap FYMOOB** usou faixas indicativas, não dados calculados ao vivo da API Loft. Perdeu diferencial real. Script pra calcular yield via Loft ficará como follow-up task.
- **CET foi mencionado em prosa, mas não tabulado** — poderia ter virado mini-tabela nos comentários sobre financiamento. Oportunidade de featured snippet secundário.
- **Não usei MCP da API Loft** pra validar estoque de imóveis em cada bairro — teria dado autoridade local concreta (ex: "FYMOOB tem 23 imóveis ativos no Ahú hoje"). Follow-up.

### Aprendizado pro próximo

1. **Serialize data validation ANTES do writer specialist** — ou explicite ao writer que "números do audit preliminar são hipóteses, aguardar data validation final". Elimina contaminação.
2. **Quando o gap único envolve API interna (Loft), planejar script ANTES do rewrite** — pra ter dado real no post, não faixa indicativa.
3. **Adicionar agent dedicado de "verifier/editor"** que roda APÓS os 5 specialists e antes de mim escrever. Função: cross-check final entre outputs + sinalizar conflitos. Atual cross-check ficou na minha síntese, que é ponto único de falha.
4. **Pilar post (2000-3000 palavras) justifica 5 specialists.** Post curto (800-1200 palavras) — talvez 2-3 specialists sejam suficientes (data + writer + SEO).
5. **Título com pergunta tripla ("boom, bolha ou filtro?") funciona quando as 3 partes são respondidas no post.** Confirma compromisso YMYL. Próximos posts podem tentar esse padrão onde couber.

### Impacto esperado (medir em 30/04 e 07/05)

- CTR: baseline atual TBD (pegar via GSC). Post não tinha performance notável — é pilar que deve ganhar tração com a reescrita.
- Position: alvo 3-5 pra query "mercado imobiliario curitiba 2026"
- Featured snippet: candidato forte pra "existe bolha imobiliaria em curitiba"
- Internal links ganhos: agora linka pra `/blog/financiamento-caixa-itau-bradesco-comparativo` + WhatsApp com contexto específico (yield, CET)

### Follow-ups deste post

- [ ] Script `calculate-yield-by-bairro.mjs` via API Loft (gerar tabela real de yield por bairro)
- [ ] OG image custom pro post (Claude Design) — título "boom, bolha ou filtro?" + número 17,86%
- [ ] Em 7 dias: medir delta CTR/position via GSC

---

---

## Post 4 — ITBI Curitiba (24/04/2026)

**Segunda aplicação completa da metodologia. Domínio YMYL fiscal/jurídico. 5 specialists em paralelo adaptados: fiscal-data + legal/STJ + local-Prefeitura + writer-fiscal + SEO/SERP.**

### O que funcionou

- **Correção crítica via cross-check de specialists:** audit preliminar e título do Q2 atribuíam "STF" ao Tema 1113. Legal specialist + Data specialist independentemente sinalizaram que é **STJ** (REsp 1.937.821/SP, Min. Gurgel de Faria, 09/03/2022). Erro jurídico grave que violaria YMYL — interceptado antes do rewrite.
- **Writer brief com PLACEHOLDERS** (aprendizado do post 3): writer não contaminou a lide com número falso. Todos os valores finais vieram de data/legal/local specialists após validação.
- **Exemplo do próprio município valida o R$ 12 mil:** LC 137/2022 da Prefeitura CWB usou publicamente imóvel de R$ 473 mil com ITBI R$ 12.771 como caso-exemplo. Número do título está ancorado em fonte municipal oficial.
- **Descoberta do Programa Curitiba de Volta ao Centro** (LC 150/2025 + Decreto 421/2026) — nenhum competidor do top 10 cobre. Seção inteira diferencial pro SEO.
- **Caso concreto TJ-PR outubro/2025** (R$ 10.214 de restituição) dá a "prova social" jurídica que a tese funciona na prática — não só teoria.
- **Régua numérica nos CTAs** (R$ 5 mil, R$ 8 mil, R$ 15 mil) em vez de "consulte um advogado" — voz operacional FYMOOB. Aplicado do writer brief.
- **Específicos fiscal/jurídico** — tradução da tese STJ em 3 frases de gente, citação como notícia (não como peça processual), link in-line em parênteses.

### O que NÃO funcionou

- **Rate limit Anthropic** cortou os "returns" dos 4 dos 5 agents. Agents escreveram os relatórios (todos os arquivos salvos) mas não retornaram resumo ao main thread. Mitigação: a reading explícita dos files recuperou 100% dos dados. Custo extra: ~5-10 min de reading dos 4 relatórios.
- **Writer brief ainda não separa completamente "regra geral" de "exemplo específico"** — usei placeholders na lide (correto), mas no brief ainda aparecem exemplos com números aproximados que podem contaminar. Melhorar marcação no próximo.
- **Gap único FYMOOB (calculadora embed)** identificado pelo SEO specialist não foi implementado — concorrente #1 (MySide) tem calculadora interativa que domina a SERP. Post ficou sem diferencial de ferramenta. Follow-up task: desenvolver calculadora.
- **Não usei API Loft pra contar quantos imóveis ativos FYMOOB tem em cada faixa de valor** — poderia validar "a gente fecha isso toda semana" com dado real. Mesma observação do post 3.

### Aprendizado pro próximo

1. **Quando rate limit cortar o "return" de um agent, o relatório em arquivo ainda vale** — plano B já funciona. Manter instrução "escrever relatório em arquivo" em todos os prompts.
2. **Pra YMYL jurídico, adicionar verificação cruzada obrigatória entre data + legal specialists.** Se qualquer dos dois disser "é STJ não STF" (ou similar), trust no que disser. Jurídico é território minado.
3. **Ferramentas interativas (calculadora) valem investimento técnico antes do próximo pilar fiscal.** ITBI, IR sobre imóvel, IPTU — se FYMOOB não tiver calculadora, cede top 3 pro MySide/Boaconta.
4. **Título direto + número grande funciona melhor que pergunta tripla** quando a tese é UMA só. Post 3 tinha 3 perguntas ("boom, bolha ou filtro"), este tem 1 tese ("pegadinha de R$ 12 mil"). Diferença: post 3 exige ler pra saber a resposta, post 4 já entrega a denúncia no title.
5. **Voz "a gente já viu umas 30 vezes" é voz FYMOOB** — usar com moderação (1-2x por post). Mais que isso vira tique. Aplicado bem aqui (1x no meio do post).

### Impacto esperado

- CTR pra query "itbi curitiba": melhoria significativa — título atual ("ITBI Curitiba 2026: Valor, Como Calcular e Como Pagar") é o padrão genérico que MySide + Prefeitura dominam. Novo título ancora em denúncia + número (R$ 12 mil).
- Featured snippet candidato: seção "Qual é o valor do ITBI em Curitiba em 2026?" no FAQ — responde em 55 palavras com as 3 faixas.
- Internal links ganhos: post linka pra `/busca` + fonte oficial Prefeitura + STJ + Migalhas + Conjur (link authority sinais pra E-E-A-T).

### Follow-ups deste post

- [ ] Calculadora ITBI embed com base no STJ Tema 1113 (respeita valor de escritura) — diferencial competitivo vs MySide
- [ ] OG image custom pro post (Claude Design) — número R$ 12 mil em destaque
- [ ] Em 7 dias: medir delta CTR/position via GSC
- [ ] Cross-link dos posts: mercado-imobiliario + financiamento agora citam o ITBI (este post)

---

---

## Post 5 — Preço do m² por Bairro Curitiba (24/04/2026)

**Terceiro pilar data-driven em sequência. Foco: ranking de 30+ bairros + internal linking massivo (gap crítico detectado no audit preliminar).**

### O que funcionou

- **Arquitetura híbrida Cluster + Spine** (do writer brief): tabela-espinha scannable no topo + 4 clusters por faixa + H2 "quebra-ritmo" no meio ("Os 5 que mais valorizaram"). Resolveu o risco de lista longa virar cansativa.
- **Internal linking executado bem:** 30+ landings `/imoveis/[bairro]` linkadas (vs 4 do post antigo). Blocker "Campina do Siqueira ausente no post" interceptado pelo SEO specialist — corrigido (2º no ranking FipeZap mar/26).
- **Cross-reference dos 3 posts reescritos:** este post linka pra MCMV (Faixa 4), ITBI (pegadinha), financiamento (5 bancos) e mercado (boom/bolha/filtro). Site passa a ter cluster semântico coeso.
- **Dados surpresa capturados por especialistas locais:**
  - Campina do Siqueira virou 3º no ranking (BRT Leste-Oeste)
  - Prado Velho = campeão aluguel Curitiba (R$ 53,52/m²/mês, perfil PUC)
  - Cascatinha = zero crimes letais + drenagem nova
  - CIC +10,2% (valorização acessível)
  - Bigorrilho em **perda real** (-0,9% vs IPCA) — armadilha concreta
- **Régua decisória no fechamento:** "valorização acima de IPCA e acima de INCC (se planta)". Substitui "consulte especialista" por critério objetivo (aprendizado do Post 4 aplicado).
- **Writer brief com PLACEHOLDERS funcionou de novo** — dados vieram do data specialist no final, zero número inventado.
- **5-agent paralelo completou desta vez** (todos retornaram summary sem rate limit, diferente do Post 4). Padrão se consolida.

### O que NÃO funcionou

- **Slugs de bairros não validados contra o filesystem antes de publicar.** Alguns podem dar 404 nas landings `/imoveis/[slug]` se o mapeamento do Loft for diferente. Follow-up: script que valida slug → arquivo antes de publicar.
- **Yield por bairro estimado, não calculado ao vivo da API Loft.** Mesmo problema dos posts anteriores (3, 4). Script pendente continua.
- **Loft Q4/2025 dado de +23% Campo Comprido não usado no post** — é tipologia-específica (3+ quartos), deixei de fora por medo de contaminar o ranking geral. Talvez merecesse nota específica.
- **Imagens:** post não ganhou imagem nova. OG image ainda aponta pra `/images/blog/preco-m2-curitiba.jpg` — provavelmente desatualizado.

### Aprendizado pro próximo

1. **Rodar validação de slugs ANTES do publish** — `node scripts/validate-bairro-links.mjs <post-file>` que checa cada `/imoveis/[slug]` contra `getAllBairros()` do Loft. Prioridade alta: próximo post que linka bairros vai usar isso.
2. **O padrão "arquitetura Cluster+Spine" é replicável** — pra qualquer pilar com lista longa (melhores-bairros-curitiba-2026, ranking-cidades, etc). Incorporar ao writer brief master.
3. **Quando um bairro aparece em 3 especialistas independentemente, vira candidato obrigatório a seção** — Campina do Siqueira apareceu em data + local + SEO. Ahú em data + local + writer. Bigorrilho (armadilha) em data + investment. Padrão pra detectar "temas que merecem destaque".
4. **A tabela-espinha no topo é a âncora do SEO** — featured snippet candidato. Manter em todo pilar data-driven. Ordem padrão: Ranking | Bairro (link) | Preço | Variação | Cluster.

### Impacto esperado

- **Pilar data-driven** = tráfego composto. SEO pillar + 30+ landings conectadas deve puxar rankings das landings `/imoveis/[bairro]` pelo juice distribuído.
- Featured snippet candidato em "qual o bairro mais caro de Curitiba em 2026" + "preço médio m² curitiba 2026".
- Internal linking saltou de 4 pra 30+ links contextuais.
- Cluster editorial consolidado: 3 posts reescritos agora cross-linkam (mercado + financiamento + ITBI + este + MCMV). Google vê autoridade semântica.

### Follow-ups deste post

- [ ] Script `scripts/validate-bairro-links.mjs` — valida slugs contra `getAllBairros()` antes do publish
- [ ] Yield real por bairro via API Loft (pendente dos Posts 3 e 4) — viraria tabela AO VIVO
- [ ] OG image custom pro post (Claude Design) — gráfico do ranking
- [ ] Em 7 dias: medir delta CTR/position via GSC

---

---

## Post 6 — Melhores Bairros Curitiba 2026 (24/04/2026)

**Quarta aplicação completa da metodologia 5-agent. Primeiro pilar nascido 100% no Research Protocol v1.0 (MethodologyBox + Changelog desde o início). Primeiro post com cautela competitiva aplicada desde o brief.**

### O que funcionou

- **Reuso de pesquisa anterior** — dados FipeZap/Quinto Andar já validados no preco-m² não foram refeitos. Agents buscaram só critérios novos (SESP-PR, INEP, IPPUC). Economia de ~40% no tempo de pesquisa.
- **Ranking por perfil como diferenciador** — gap mapeado pelo SEO specialist: **100% dos competidores (MySide, Quinto Andar, Loft, Larya) fazem listicle sem segmentar perfil**. FYMOOB entra com 4 rankings separados (família, jovem, aposentado, investidor). Autoridade editorial assumida.
- **"3 bairros pra repensar" com gentileza** — seção de "melhor negativo" com fato + contexto construtivo. Exemplo: Batel pra família em 2026 (3 anos de obras pela Lei 16.361). Ausente em 100% dos concorrentes. Diferencial editorial máximo.
- **Sweet spot único validado** — Ahú é o único bairro que bate nos 4 eixos (segurança + educação + infra + preço + valorização). Dado-estrela do lide. Encontrado pelo data specialist cruzando outputs dos outros 4.
- **Cautela competitiva efetiva** — FYMOOB data specialist entregou **frase-modelo aprovada**: "No Batel e no Bigorrilho, mais da metade do que passa pela FYMOOB são unidades acima de 150m²" — autoridade sem expor volume absoluto. Aprendizado do Post 5 aplicado desde o brief.
- **MethodologyBox com disclaimers obrigatórios** — SESP-PR não publica homicídios por bairro diretamente (redação agregada). IDEB por bairro é mapeamento escola→CEP, não dado oficial. Crime patrimonial absoluto distorce Centro/Portão (densidade). Transparência IFCN P2.
- **Título com curiosity gap honesto** — "Ranking por Perfil" sinaliza metodologia. Não é clickbait ("superou Batel" que era falso), mas entrega novidade real (perfil como chave, não listicle genérico).

### O que NÃO funcionou

- **Ainda sem snapshot histórico de valorização** — só 1 dia de snapshot (24/04 = dia zero). Todas as valorizações vêm de FipeZap (anúncios), não de fechamentos FYMOOB. Em 90 dias poderemos ter dado próprio.
- **Score composto simplificado** — fui com pesos iguais no ranking geral, mas a realidade é que diferentes usuários priorizam diferente. Fiz 4 rankings por perfil pra compensar, mas o ranking geral ainda é "arbitrário por simplicidade". Aceitável no primeiro ciclo.
- **Bairros-surpresa sem foto/dado visual forte** — Bacacheri, Cascatinha e São Lourenço precisariam de imagem específica pra destacar. Post tá com imagem genérica de blog.
- **Overlap com preço-m²** — alguns dados se repetem entre os 2 posts. Trade-off: melhor redundância legível que leitor ter que clicar 2 vezes. Internal links cross-post funcionam como alternativa.

### Aprendizado pro próximo

1. **Quando já tem pesquisa em post anterior, agents devem reusar explicitamente.** Diretriz pros briefs: "dados de X já validados em Y, não refazer. Só buscar novos critérios Z."
2. **Ranking multi-critério é mais defensável que ranking único.** Proxy de transparência. Aplica a qualquer post "melhor X".
3. **Seção "pra repensar" (melhor negativo) é o maior diferencial editorial.** 100% dos competidores evitam por medo de irritar bairro. FYMOOB ganha autoridade editorial explícita sem atacar ninguém.
4. **Frase-modelo aprovada do FYMOOB Data Specialist** é ouro — copiar direto evita retrabalho e mantém compliance competitivo.
5. **Cautela competitiva do usuário (Vinicius/Bruno)** — checar aprovação antes de expor qualquer dado interno novo. Aprendizado do Post 5 virou default.

### Impacto esperado

- CTR projetado: alto (título "Ranking por Perfil" + metodologia aberta = authoritative signal)
- Featured snippet: candidato em "qual o melhor bairro para morar em Curitiba" (answer-first no lide + bullet perfis)
- Internal linking: +30 links pras landings `/imoveis/[bairro]` + cross-link com preço-m², ITBI, mercado
- E-E-A-T: metodologia declarada + autor com CRECI + fontes Tier 1 (SESP, INEP, IPPUC) + Changelog = sinal máximo YMYL

### Follow-ups deste post

- [ ] Imagem OG custom com top 5 e score (Claude Design)
- [ ] Script que atualiza ranking trimestralmente (calendar trigger)
- [ ] Após snapshot completar 90d, atualizar com valorização real (não só FipeZap)
- [ ] Criar post derivado: "Bairros pra família com filhos pequenos em Curitiba" (pega top 5 deste + expande em 2000 palavras)

---

## Post 11 — Documentos pra Comprar Imóvel em Curitiba (24/04/2026)

**Primeira aplicação de team-agent adaptado pra post evergreen jurídico/YMYL.** Substituí Lifestyle Researcher + FYMOOB Data Specialist (que faziam sentido em posts de bairro) por **Legal/Jurídico Specialist** + **YMYL Verifier reforçado**. Time final: Legal + Content Structure + Writer + SEO + YMYL Verifier.

### O que funcionou

- **Organização por órgão emissor (5) em vez de "por parte" (comprador/vendedor/imóvel)** — estrutura única no SERP. Concorrentes listam 25 documentos em blocos de "pessoal/imóvel/vendedor"; FYMOOB mostra o fluxo real: Prefeitura → RI → TJ-PR → Receita/banco → Tabelionato. Cada órgão tem prazo, portal e custo próprios — o leitor sabe por onde começar.
- **Lide com o "documento esquecido"** (Certidão Negativa de Imóveis da Prefeitura) — hook de SERP e de autoridade. 99% dos guias genéricos não mencionam que é distinta do IPTU pago. Voz operacional-de-rua entregou a diferenciação sem jargão notarial.
- **YMYL Verifier pegou 4 erros factuais críticos em rodada única:**
  1. "8 zonas de RI" → são **9 Ofícios** (erro clássico na web, corrigido com fonte AMEP)
  2. "Certidão de Quitação de Tributos Imobiliários" → nome inventado; oficial é "Certidão Negativa de Imóveis" (portal oficial confirma)
  3. e-Notariado como "obrigatório" → é **opcional** (Provimento CNJ 149/2023 como base)
  4. "Termo de consentimento LGPD obrigatório pra pedir RG" → base legal é **execução de contrato** (Art. 7º V), não consentimento
- **Links pra fontes primárias Planalto/CNJ/AMEP/Prefeitura no corpo** — E-E-A-T forte sem poluir o texto (em-line links, não rodapé gigante)
- **Tabela consolidada dos 9 ofícios com endereço + telefone** — feature de alto valor pro leitor, zero concorrente oferece isso estruturado
- **FAQ com 5 PAA reais** (Google "People Also Ask") pega featured snippet em queries secundárias
- **Sinergia com checklist-compra-imovel** (Post 10) — internal link cruzado, reforça cluster temático

### O que NÃO funcionou

- **SEO Specialist e YMYL Verifier entregaram claims divergentes** — SEO afirmava "8 zonas" (baseado em SERP histórica), Verifier confirmou "9 Ofícios". Precedente confirmado: **YMYL sempre vence** em conflito factual. Documentado pro próximo post.
- **Writer gerou nome oficial inventado** do documento-âncora ("Certidão de Quitação de Tributos Imobiliários") na primeira tentativa — só pegou no Verifier. **Reforço:** writer NUNCA deve inventar nomes oficiais; só usar o que está no portal/lei.
- **Agent cortado por rate limit 2x durante rodada de team** — mitigado por persistência file-based (cada agent salva report em `docs/research/` antes de terminar), mas interrompe fluxo. Próximo post: usar Sonnet 4.6 pra agents de menor complexidade.

### Aprendizado pro próximo

- **Para posts evergreen jurídico/YMYL:** swap Lifestyle + FYMOOB Data por **Legal** + **YMYL Verifier reforçado**. Mantém os outros 3 (Structure, Writer, SEO).
- **YMYL Verifier como gatekeeper final ANTES do writer** — não como revisão pós-draft. Valida claims do Legal/SEO cedo, evita retrabalho no draft. (Esse post: executei Verifier antes do Writer, funcionou.)
- **Sempre citar fonte primária como link em-line em claim factual YMYL** (ex.: Decreto 93.240/86 linkado na primeira menção). Google News/AIO prioriza.
- **Organização por órgão/processo > organização por parte** pra posts de fluxo burocrático — padrão pra seguir em documentos-venda, inventário, financiamento.
- **Regra R-12 candidata pro Manual Editorial:** "Nome oficial de documento/órgão = cópia literal do portal oficial, sem 'versão amigável' inventada pelo writer". Discutir com próximo post.

### Impacto esperado

- Query-alvo principal: "documentos pra comprar imóvel curitiba" (baseline: 0 clicks, pos 15+)
- Diferencial único: tabela 9 Ofícios + hook da certidão municipal esquecida → candidato a featured snippet
- Cluster temático: forma pair com checklist-compra-imovel (Post 10) — link cruzado aumenta dwell time
- YMYL strength: MethodologyBox + Changelog + Bruno autor + fontes Tier 1 Planalto/CNJ = sinal máximo

### Follow-ups deste post

- [ ] Criar `<ZonasRICuritiba>` component (buscar por CEP) — diferencial interativo vs concorrentes
- [ ] Imagem OG custom "9 Ofícios de CWB — mapa" (Claude Design)
- [ ] Revisar em 2026-07-23 (conforme nextReview) — validar se portal CWB, provimentos CNJ e tabela TJ-PR mudaram
- [ ] Post derivado: "Certidão Negativa de Imóveis CWB: como emitir em 3 minutos" (focado em query long-tail)

---

## Template pra próxima entrada

```markdown
## Post N — <slug> (DD/MM/AAAA)

### O que funcionou
- ...

### O que NÃO funcionou
- ...

### Aprendizado pro próximo
- ...

### Impacto esperado / Impacto medido
- CTR antes → depois
- Position antes → depois
- Impressions antes → depois
```
