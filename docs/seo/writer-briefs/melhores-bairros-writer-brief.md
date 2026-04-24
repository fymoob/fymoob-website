# Writer Brief — Post Melhores Bairros Curitiba 2026

> **Arquivo alvo:** `content/blog/melhores-bairros-curitiba-2026.mdx`
> **Status:** brief de voz e craft para post ranking MULTI-CRITÉRIO (não só preço).
> **Autor do brief:** Writer / Craft Specialist — FYMOOB editorial team
> **Data:** 2026-04-24
> **Dependência obrigatória:** [Manual Editorial](../editorial-style-guide.md) + [Research Protocol v1.0](../fymoob-research-protocol.md) + [Writer brief anterior — preço m²](./preco-m2-bairros-writer-brief.md) (arquitetura Cluster+Spine já validada).
> **REGRA DE OURO:** todos os dados numéricos (crimes, IDEB, valorização, preços) são `{{PLACEHOLDER}}`. Writer NÃO inventa estatística de segurança, nota de escola nem posição de ranking. Dados vêm do time de specialists (SESP-PR + INEP + FipeZap + Loft ao vivo).

---

## Desafio central: não virar "listão genérico"

"Melhores bairros" é o post mais saturado da SERP imobiliária brasileira. MySide, QuintoAndar, Loft, Larya, Razzi, JBA, Apolar — todo mundo tem. E todo mundo faz a mesma coisa:

1. Abertura corporativa ("Curitiba é uma cidade que oferece excelente qualidade de vida...")
2. Lista de 6-10 bairros em ordem aleatória (ou ordem de preço disfarçada)
3. Cada bairro com 3 bullets turísticos ("infraestrutura completa", "transporte eficiente", "boa gastronomia")
4. Zero definição do que é "melhor" — é opinião gratuita
5. CTA "fale com um consultor"

**Isso não compete.** Post atual FYMOOB faz exatamente esse padrão (verifiquei `melhores-bairros-curitiba-2026.mdx` atual: 8 bairros, bullets turísticos, zero dado, zero metodologia).

**O que diferencia este post:**

1. **Definição explícita de "melhor" no lide** — não opinião, ranking multi-critério com pesos declarados. O leitor sabe de saída: "esses são meus 4 critérios, esses são os pesos, mudou os pesos? muda o ranking".
2. **Top 5 por perfil de comprador** (família, jovem profissional, investidor, aposentado) — porque "melhor" é relativo e a gente assume isso em vez de esconder.
3. **MethodologyBox no final** — replicável por qualquer um. Fonte primária por critério (SESP-PR segurança, INEP educação, IPPUC infra, FipeZap preço).
4. **Voz operacional FYMOOB 1x só** — "a gente fecha toda semana em X bairros, viu Y tempo de venda cair, nota Z na pesquisa NPS" — autoridade local ancorada em observação concreta, não adjetivo.
5. **Bairro dissonante em destaque** — todo mundo coloca Batel no topo de "família". A gente põe {{BAIRRO_DISSONANTE}} com o porquê: segurança + escola + preço + distância pro centro. Isso cria surpresa real.

---

## Voz-alvo (1 parágrafo)

Analítica como **Folha — Melhores Escolas / Melhores Bairros** (metodologia transparente, dado primeiro, adjetivo zero), com curadoria editorial de **New York Magazine Best Neighborhoods** (o "melhor" é assumidamente relativo ao perfil, e a voz do autor aparece com opinião ancorada), ancorada em **operacional FYMOOB** (a gente vende imóvel em {{N_BAIRROS}} dos 75 bairros toda semana, sente o tempo de venda antes do FipeZap, sabe quando um bairro passou do "promessa" pro "procurado"). Não é voz de guia turístico ("Curitiba encantadora com bairros charmosos"), não é voz de release de incorporadora ("oportunidade única de investimento"), não é voz de portal de classificado ("conheça as vantagens de morar no Batel"). Quando diz "mais seguro", mostra a taxa (crimes por 100 mil habitantes, SESP-PR). Quando diz "melhor escola", cita IDEB + INEP. Quando diz "mais valorizou", mostra o %12m (FipeZap). Quando diz "ideal pra família", define família (2 filhos, 6-12 anos, R$ 15k renda) em vez de soltar abstrato.

---

## Definição explícita de "melhor"

### Como apresentar os critérios no lide sem virar parecer acadêmico

**Regra operacional:** os 4 critérios entram no H2 #1 (não no lide). Lide puxa com gancho numérico ou contradição. Critérios + pesos entram na primeira seção, antes da tabela-espinha.

**DON'T (academic):** *"Este artigo utiliza metodologia multi-critério baseada em análise de dados primários de SESP-PR, INEP, IPPUC e FipeZap, com ponderação estatística definida a partir de..."*

**DO (operacional):** *"Quatro critérios definem 'melhor' neste ranking: segurança, escola, infraestrutura, preço. Cada um pesa 25%. Mudou os pesos? O ranking muda. Todos os dados vêm de fonte oficial — SESP-PR ([link]), INEP ([link]), IPPUC ([link]) e FipeZap ([link]) — e qualquer pessoa pode refazer a conta."*

### Os 4 critérios — template pros specialists

| Critério | Peso | Fonte primária | Unidade |
|---|---|---|---|
| Segurança | 25% | SESP-PR (Indicadores Criminais por bairro) | Crimes letais / 100 mil hab |
| Educação | 25% | INEP IDEB 2023 + Censo Escolar 2024 | Média IDEB anos finais (6º-9º) |
| Infraestrutura | 25% | IPPUC (indicadores de bairro) + IBGE | Índice composto: saneamento + transporte + áreas verdes |
| Preço | 25% | FipeZap abril/2026 + Loft CRM FYMOOB | R$/m² + tempo de venda médio |

**Observação crítica pro specialist local:** os pesos 25/25/25/25 são defaults. Se descobrirem que um critério tem variância muito baixa em Curitiba (ex: saneamento é >95% em todos os 75 bairros, então não discrimina), avaliar redistribuir — mas sempre declarar por quê.

---

## 5 openings possíveis (com PLACEHOLDERS)

Todos seguem Manual Editorial (Regras 1-3). Todos pedem número validado pelos specialists antes de virar prosa final.

### Variante A — Contradição com o ranking óbvio (RECOMENDADA)

> *"Todo blog de imobiliária coloca o Batel como 'melhor bairro de Curitiba'. Só que quando a gente soma segurança, escola, infra e preço em peso igual, o Batel cai pra {{POSICAO_BATEL}}º — e quem lidera é {{BAIRRO_TOP_GERAL}}, com IDEB {{IDEB_TOP}}, {{CRIMES_TOP}} crimes letais por 100 mil habitantes em 2025 e m² de R$ {{M2_TOP}}. Este é o ranking multi-critério dos 30 bairros de Curitiba, com a metodologia aberta — mude os pesos e mude o ranking."*

**Por quê:** Template 2 (Mito-quebra). 1ª frase afirma o clichê do setor. 2ª frase derruba com 3 dados ancorados. 3ª frase promete transparência + relatividade (leitor pode discordar e refazer a conta). Diferencial competitivo imediato: nenhum concorrente faz metodologia aberta.

### Variante B — Top 5 por perfil explícito

> *"Não existe 'melhor bairro de Curitiba' em 2026. Existe melhor bairro pra família com 2 filhos e R$ 15 mil de renda ({{BAIRRO_A}}), melhor pra jovem profissional de 28 anos morando sozinho ({{BAIRRO_B}}), melhor pra investidor com orçamento de R$ 600 mil ({{BAIRRO_C}}). Aqui estão os 4 rankings, com os dados que sustentam cada um — e o bairro que aparece em 3 dos 4 sem ser o mais caro."*

**Por quê:** Template 3 (Cena / Pergunta Direta) + relatividade assumida como feature, não bug. Quatro rankings já entregue no lide. Última frase cria curiosity gap acionável (quem aparece em 3 dos 4 rankings?).

### Variante C — Number drop de gap

> *"A diferença entre o bairro mais seguro e o mais violento de Curitiba é de {{FATOR_SEGURANCA}}x em crimes letais por habitante. Entre a melhor escola pública e a pior, {{PONTOS_IDEB}} pontos no IDEB. Entre o m² mais alto e o mais baixo, {{FATOR_PRECO}}x. Quatro critérios, 30 bairros, um ranking — veja onde o seu entra."*

**Por quê:** Template 1 (Number Drop) aplicado em 3 gaps paralelos, cada um criando tensão própria. 4ª frase promete cobertura + convite pessoal. Forte em retenção (leitor quer saber onde "o seu" entra).

### Variante D — Autoridade local

> *"A gente fecha imóvel em {{N_BAIRROS}} dos 75 bairros de Curitiba. Quando família pergunta 'qual o melhor pra morar', a gente não responde 'Batel'. A gente pergunta: seus filhos têm quantos anos, seu orçamento é qual, você prioriza segurança ou tempo pro trabalho? Quatro perfis, quatro rankings — e o único bairro que aparece em todos os quatro."*

**Por quê:** Template 5 (Autoridade Local). Autoridade concreta (cobertura de venda) + fluxo real de atendimento + teaser do "único bairro nos 4 rankings". Voz 100% FYMOOB. Usar se o dado final mostrar de fato um bairro atravessando os 4 perfis.

### Variante E — Cena do comprador

> *"Família, 2 filhos, R$ 15 mil de renda, procurando apartamento de R$ 700 mil em Curitiba. Em abril de 2026, {{BAIRRO_A}} bate {{BAIRRO_B}} em segurança (-{{X}}% de crimes), empata em escola, perde em preço (R$ {{DIFF_PRECO}} de diferença). Mudou o peso de preço? Mudou o ranking. Aqui está o método."*

**Por quê:** Template 3 (Cena). Abre no caso concreto do leitor-alvo. Compara 2 bairros reais em 3 critérios. Última frase introduz metodologia como feature, não burocracia. Funciona bem pra CTR mobile porque leitor se identifica.

**Recomendação:**
- **Variante A** pra posicionamento de autoridade (diferenciação máxima vs concorrentes).
- **Variante B** se o ranking por perfil mostrar bairro-transversal surpreendente.
- **Variante D** se o cluster editorial for posicionamento FYMOOB-first (autoridade local).
- Decisão final depende do que os specialists trouxerem.

---

## Arquitetura recomendada (H2 order)

Ordem desenhada pra retenção + SEO + respeitar a arquitetura Cluster+Spine já validada no post de preço m² (pra manter coerência editorial entre pilares). Mas adapta: em vez de clusters por faixa de preço, clusters por **perfil de comprador**.

1. **`## O que define "melhor" em 2026? Os 4 critérios com pesos declarados`**
   Responde a pergunta crítica de metodologia antes de qualquer ranking. Tabela de critérios + pesos + fontes. Frase de fechamento: *"Mudou os pesos? O ranking muda. Todos os dados são replicáveis."*

2. **`## Tabela completa: 30 bairros de Curitiba em ranking multi-critério (abril/2026)`**
   Espinha tabular. 30 linhas, 6 colunas (posição | bairro | segurança | escola | infra | preço | score final). Featured snippet candidate. Frase in-line abaixo: *"A coluna score é a média ponderada. Mas as colunas individuais contam histórias diferentes — veja por perfil abaixo."*

3. **`## Top 5 melhores bairros pra família com filhos pequenos`**
   Cluster por perfil (família). Pesos ajustados: segurança 35% + escola 35% + infra 20% + preço 10%. Micro-histórias de 3 bairros-chave. Mini-tabela do top 5. Transição cliffhanger pro próximo perfil.

4. **`## Top 5 pra jovem profissional morando sozinho`**
   Pesos: infra 35% + preço 35% + segurança 20% + escola 10%. Perfil nomeado (28-35 anos, R$ 8-12k renda, sem filhos). Micro-histórias de 2-3 bairros onde a FYMOOB vê esse perfil alugando mais.

5. **`## Top 5 pra investidor (aluguel + valorização)`**
   Pesos: preço (yield) 40% + preço (valorização 12m) 30% + infra 20% + segurança 10%. Aqui o diferencial FYMOOB aparece: tempo de venda + estoque ativo + yield medido em amostra real.

6. **`## Top 5 pra aposentado/idoso`**
   Pesos: segurança 30% + infra (mobilidade + saúde) 35% + preço 20% + escola 15%. Perfil-nicho, mas cobre long-tail SEO ("melhor bairro aposentado Curitiba", "bairro tranquilo Curitiba").

7. **`## O bairro dissonante: todo mundo coloca Batel. A gente põe {{BAIRRO_DISSONANTE}}`**
   **[QUEBRA DE RITMO]** — o H2 diferencial do post. Um bairro fora do radar dos outros rankings com justificativa multi-critério. Padrão NY Mag "Best Neighborhoods" ("you didn't see this one coming"). Rompe a expectativa do leitor que já viu 4 top 5.

8. **`## 3 bairros pra repensar em 2026 (com gentileza e fato)`**
   O "melhor" negativo. 3 bairros onde algum critério caiu muito (ex: segurança deteriorou, IDEB caiu, preço subiu mas qualidade não). Nunca insulto — sempre dado + contexto. Diferencial enorme: ninguém no setor faz isso.

9. **`## O que o ranking não captura: 4 coisas que só o corretor vê`**
   Voz FYMOOB explícita. Tempo de venda por bairro, estoque real ativo, perfil de quem compra vs quem aluga, feedback pós-venda. Dados do CRM FYMOOB com amostra declarada.

10. **`## Perguntas frequentes sobre os melhores bairros de Curitiba`**
    FAQ com 5 PAA reais. Candidatos: "qual o bairro mais seguro de Curitiba 2026?", "qual o melhor bairro pra família em Curitiba?", "Batel é o melhor bairro de Curitiba?", "qual o bairro com melhor custo-benefício em Curitiba?", "melhor bairro de Curitiba pra morar com idosos?".

11. **`## Metodologia e fontes`** + `<MethodologyBox>`
    Obrigatório por Research Protocol. Período, amostra, tratamento estatístico, fontes linkadas, limitações conhecidas. Permite réplica.

12. **[CTA final contextual — régua decisória, não grito genérico]**

---

## Como fazer ranking não ficar tedioso — 5 padrões concretos

### Padrão 1 — Pesos declarados como feature, não rodapé

O grande diferencial: **no início de cada cluster de perfil, mostrar o peso específico daquele ranking.**

**DO:** *"Pra família com filhos pequenos, a gente ajusta os pesos: segurança vira 35% (pesa mais), escola 35%, infra 20%, preço 10%. Resultado:"* [mini-tabela]

**DON'T:** listar 5 bairros sem explicar por que a ordem mudou vs o ranking geral.

Padrão extraído de Folha "Melhores Escolas" (metodologia aberta por categoria).

### Padrão 2 — Micro-história só nos bairros-chave do cluster

Aprendizado do post de preço m² (Padrão 2 daquele brief): dentro de cada Top 5, **3 bairros ganham micro-história** (1 parágrafo curto com driver local), **2 ficam só na mini-tabela**. Não narrar cada bairro.

Exemplo no cluster família:
- Cascatinha → micro-história (drenagem nova + 0 crimes letais + IDEB acima da média)
- {{BAIRRO_Y}} → micro-história (driver-chave)
- {{BAIRRO_Z}} → micro-história (driver-chave)
- Dois bairros → só mini-tabela (dado suficiente)

### Padrão 3 — Bairro dissonante em H2 próprio (quebra de expectativa)

Padrão NY Magazine "Best Neighborhoods" (padrão internacional de referência): um bairro que não aparece em top 5 de nenhum perfil, mas que a redação defende por razão específica. Isso cria:
- Surpresa (leitor esperava Batel/Ecoville/Água Verde)
- Retenção (leitor precisa ler pra entender o argumento)
- Autoridade editorial (imobiliária que assume posição editorial, não recita consenso)

**Candidatos a "dissonante":** um bairro com 3 critérios fortes + 1 crítica honesta (ex: Portão — custo-benefício + segurança + infra, mas IDEB médio).

### Padrão 4 — "Melhor" negativo como seção

Padrão quase ausente no setor imobiliário brasileiro. Mas aparece em Folha, Valor, Exame. **Top 3 bairros que caíram em algum critério** — gentil, factual, sem ataque.

**DO:** *"Bigorrilho perdeu valor real (-0,9% vs IPCA em 12 meses, FipeZap abril/2026). Não é 'ruim pra morar' — é ruim pra comprar com expectativa de valorização."*

**DON'T:** *"Bigorrilho é o pior bairro de Curitiba pra investimento."*

Diferenciação competitiva gigante: nenhum concorrente faz isso. Risco: cliente ficar desconfortável — mitigação: sempre dar contexto construtivo + nunca atacar o bairro, só o critério.

### Padrão 5 — Número-drop dentro do cluster (sustenta retenção)

Dentro de cada Top 5 por perfil, **uma frase curta isolada com cálculo concreto** (Regra 8 do Manual + Padrão 4 do brief anterior).

Exemplo no cluster família:
> *"Faz a conta: IDEB 6,2 + 8 crimes/100k hab + 15 min do centro + m² de R$ 7.800. Nenhum outro bairro de Curitiba junta os 4 nessa faixa."*

Transforma a tabela seca em argumento de decisão. Aplicado com parcimônia (1 por cluster).

---

## Transições naturais pra ranking multi-critério — 10 frases

Manual Editorial (Regra 15) bane "Já o bairro X", "Por outro lado", "Em contrapartida". Aqui está o repertório específico pra encadear bairros em rankings multi-critério sem virar lista preguiçosa.

| # | Transição | Quando usar | Exemplo |
|---|---|---|---|
| 1 | **"Na mesma faixa de preço, [X] ganha em [critério]."** | Comparar bairros com score próximo | *"Na mesma faixa de R$ 8-10k/m², Água Verde ganha em segurança."* |
| 2 | **"O ranking geral coloca [X] em {{N}}º. Pra [perfil], sobe pra {{M}}º."** | Transição entre ranking geral e por perfil | Puxa o leitor pra pensar "e pra mim, muda?" |
| 3 | **"A diferença aparece em [critério específico]."** | Introduzir bairro pelo driver que o distingue | *"A diferença aparece em segurança: 2,1 crimes/100k vs 8,3 do vizinho."* |
| 4 | **"Aí o peso muda."** | Virada entre clusters de perfil | *"Aí o peso muda. Pra jovem sozinho, preço e infra pesam mais que escola."* |
| 5 | **"{{BAIRRO}} faz a conta fechar em 3 dos 4 critérios."** | Destacar bairro forte em quase tudo | Voz de corretor analisando perfil de compra |
| 6 | **"Pelo mesmo score, [X] troca [crit A] por [crit B]."** | Bairros empatados no score, diferentes no perfil | *"Pelo mesmo score, Ahú troca escola por valorização."* |
| 7 | **"Quem prioriza [critério] pula pra [bairro]."** | Transição por intenção do leitor | *"Quem prioriza segurança pula pra Cascatinha."* |
| 8 | **"O próximo do ranking não é óbvio."** | Criar suspense antes de bairro-surpresa | Cliffhanger curto |
| 9 | **"Logo abaixo, entra [X] — e muda a régua."** | Transição com mudança de critério dominante | *"Logo abaixo, entra CIC — e muda a régua: preço vira o driver."* |
| 10 | **"Empate técnico entre [X] e [Y]."** | Dois bairros com score praticamente igual | Autoriza não eleger único "melhor" |

**Bônus — 3 frases-punch curtas pra quebrar ritmo (Regra 7 do Manual):**
- "A conta fecha."
- "Aí muda o jogo."
- "É esse o filtro."

**Anti-padrão banido neste post:** nunca abrir parágrafo com "O bairro X se destaca por...". É clichê de portal de classificado. Substituir por verbo concreto + dado.

---

## Voz FYMOOB específica pra este post

**Regra operacional:** voz FYMOOB aparece **no máximo 2 vezes** no post — uma na seção "O que o ranking não captura" (H2 #9) e outra pontual no bairro dissonante (H2 #7). Mais que isso vira tique.

### Onde aplicar autoridade local (concretamente)

1. **Observação de tempo de venda por bairro (dado FYMOOB exclusivo):**
   *"A gente fecha imóvel em {{N_BAIRROS}} dos 75 bairros. Em Cascatinha, o tempo médio caiu de {{DIAS_ANTES}} pra {{DIAS_AGORA}} dias entre janeiro e abril/2026. É o sinal antecipado de que a escola nova + drenagem mexeram na demanda real, não só no discurso."*

2. **Estoque ativo por bairro (API Loft ao vivo):**
   *"Em abril/2026, a FYMOOB tem {{N_ESTOQUE_X}} imóveis ativos no [Bairro X] e {{N_ESTOQUE_Y}} no [Bairro Y]. A diferença importa: quando o estoque some, preço sobe — e quem esperou mais um mês pagou {{X}}% a mais."*

3. **Perfil de comprador por bairro (qualitativo, baseado em atendimento):**
   *"Quem procura imóvel no Cabral em 2026 não é mais o mesmo perfil de 2023. Era executivo de 45 anos, virou casal de 30 com um filho — e isso aparece no IDEB subindo e no tempo de venda caindo."*

### Marcadores de voz natural (use com moderação)

- **"A gente vê" / "A gente fecha" / "A gente sente"** — 1-2x no post, sempre ancorado em dado.
- **"Isso aparece em [métrica]"** — conector que transforma observação em dado.
- **"Num ranking de imobiliária, isso não aparece. Num CRM com fechamento semanal, aparece."** — voz diferencial FYMOOB vs concorrentes.

### Anti-voz (banir se aparecer)

- *"A FYMOOB acredita que..."* → ninguém quer saber. Mostre o dado.
- *"Na nossa experiência, os melhores bairros..."* → autoridade vazia. Substitui por "No CRM FYMOOB em abril/2026, os bairros com menor tempo de venda foram X, Y, Z."
- *"Somos especialistas em Curitiba..."* → cringe. Autoridade se mostra, não se declara.
- *"Entre em contato e conheça as oportunidades..."* → CTA preguiçoso. Substitui por régua decisória (ver closing).

---

## Frases-proibidas específicas desta categoria

Estas frases aparecem em 100% dos concorrentes (MySide, Loft, QuintoAndar, Larya, Razzi) em posts de "melhores bairros". Banidas aqui sem exceção.

| Proibida | Por quê | Substituta natural |
|---|---|---|
| "O melhor bairro para..." como abertura | Abertura de todos os concorrentes = fórmula que não compete | Abre com contradição ou number drop (ver variantes A-E) |
| "Curitiba é uma cidade que oferece qualidade de vida..." | Cliché supremo + abstrato | [apaga — "Curitiba tem 75 bairros. Este ranking cobre 30."] |
| "Escolher o bairro certo é uma das decisões mais importantes..." | Abertura corporativa banida (Regra 1 Manual) | [apaga completamente] |
| "Cada bairro tem suas particularidades..." | Fuga covarde — não quer comprometer opinião | *"{{N}} bairros entram neste ranking. {{M}} ficaram de fora por amostra insuficiente ou dado defasado."* |
| "Depende do perfil de cada pessoa..." | Desculpa pra não ter posição. Relatividade é OK, mas **declarada com metodologia** | Substitui por "Quatro perfis. Quatro rankings. Clique no seu." |
| "Bairro nobre / charmoso / tradicional / encantador" | Adjetivos turísticos. Autoridade de dados morre com cada um | [apaga — mostra o dado: crimes, IDEB, m², tempo de venda] |
| "Ideal para quem busca qualidade de vida" | Abstrato + universal | Nomear: *"Família com 2 filhos, 6-12 anos, R$ 15k renda."* |
| "Com fácil acesso às principais vias" | Cliché de classificado | *"{{X}} minutos do centro pela {{VIA}}."* |
| "Valorização expressiva nos últimos anos" | Sem número = mentira | *"+{{X}}% em 12 meses (FipeZap abril/2026)"* |
| "Uma das melhores opções para investimento" | Opinião não-ancorada | Mostrar yield, valorização, tempo de venda com amostra. |
| "Excelente custo-benefício" | Cliché | *"R$ {{X}}/m² com IDEB {{Y}} e {{Z}} crimes/100k — nenhum outro bairro junta os 3."* |
| "Descubra os melhores bairros..." | Voz de SEO preguiçoso | [apaga meta-texto] |
| "Neste guia completo, vamos analisar..." | Meta-texto (Regra 15 Manual) | [apaga — entra direto no gancho] |
| "Confira abaixo a lista..." | Transição preguiçosa | [apaga — entra direto na tabela] |
| "Conclusão: Curitiba tem bairros para todos..." | Fechamento nulo (Regra 11 Manual) | Substitui por régua decisória |

---

## Lide proposto (3 variantes com PLACEHOLDERS)

Todas as variantes pedem validação final dos dados pelos specialists antes de virar prosa final.

### Variante A — Contradição com consenso do setor (RECOMENDADA)

> *"Todo blog de imobiliária coloca o Batel como 'melhor bairro de Curitiba'. Só que quando a gente soma segurança, escola, infra e preço em peso igual, o Batel cai pra {{POSICAO_BATEL}}º — e quem lidera é {{BAIRRO_TOP_GERAL}}, com IDEB {{IDEB_TOP}}, {{CRIMES_TOP}} crimes letais por 100 mil habitantes em 2025 e m² de R$ {{M2_TOP}}. Este é o ranking multi-critério dos 30 bairros de Curitiba, com metodologia aberta — mude os pesos e mude o ranking."*

**Por quê:** Template 2 (Contradição). 1ª frase afirma o que todo concorrente faz. 2ª frase derruba com 3 dados ancorados (segurança + educação + preço). 3ª frase promete transparência + relatividade. Diferencial competitivo imediato contra 100% do setor imobiliário brasileiro.

### Variante B — Quatro rankings declarados

> *"Não existe 'melhor bairro de Curitiba' em 2026. Existe melhor pra família com 2 filhos ({{BAIRRO_FAMILIA}}), melhor pra jovem sozinho ({{BAIRRO_JOVEM}}), melhor pra investidor ({{BAIRRO_INVESTIDOR}}), melhor pra idoso ({{BAIRRO_IDOSO}}). Quatro perfis, quatro rankings — e {{BAIRRO_TRANSVERSAL}}, que aparece em 3 dos 4 sem ser o mais caro."*

**Por quê:** Template 3 (Cena). Entrega os 4 rankings já no lide — leitor escaneia e encontra o perfil dele em segundos. Última frase com curiosity gap acionável (quem é o transversal?). Puxa leitor pros 4 clusters.

### Variante C — Autoridade local + metodologia

> *"A gente fecha imóvel em {{N_BAIRROS}} dos 75 bairros de Curitiba. Quando perguntam 'qual o melhor pra morar', a gente não responde Batel. A gente puxa 4 dados: segurança (SESP-PR), escola (INEP), infraestrutura (IPPUC) e preço (FipeZap). Em abril/2026, o ranking ficou {{BAIRRO_1}} → {{BAIRRO_2}} → {{BAIRRO_3}} — e o motivo de cada posição está abaixo, com os pesos e as fontes."*

**Por quê:** Template 5 (Autoridade Local). Cobertura concreta (N/75 bairros) + atendimento real + metodologia transparente no lide. Voz 100% FYMOOB. Usar se o posicionamento do post for diferenciação-FYMOOB explícita.

**Recomendação:** **Variante A** se o diferencial final for "ninguém no setor faz metodologia aberta". **Variante B** se houver bairro transversal realmente surpreendente (aparece em 3 dos 4 rankings). **Variante C** se o cluster editorial do trimestre for puxar autoridade local.

---

## Closing template

### Template recomendado — Régua de decisão

> *"Três perguntas antes de assinar contrato em qualquer bairro de Curitiba em 2026:*
> *1. O IDEB da escola pública da quadra ainda é o mesmo de 2023? (INEP atualiza a cada 2 anos.)*
> *2. A taxa de crimes letais subiu ou caiu nos últimos 12 meses? (SESP-PR publica mensal.)*
> *3. O m² subiu mais que o IPCA no bairro em 12 meses? Se não, o dinheiro perdeu valor real.*
>
> *[Ver imóveis ativos agora, filtrados por bairro](/busca). Se o corretor não tiver as 3 respostas na ponta da língua, peça uma segunda opinião — o nosso trabalho é ter."*

**Por quê funciona:**
- 3 perguntas operacionais concretas com fonte primária (INEP, SESP-PR, IPCA).
- Último parágrafo é soft-CTA contextual, não grito genérico.
- Zero "concluindo", "como vimos", "esperamos que tenha ajudado".
- Responde a Regra 11 do Manual (fechamento = provocação ou próximo passo).
- Régua numérica (+IPCA) substitui "consulte especialista" (aprendizado dos posts 4 e 5).

### Anti-modelo (banir — é o template do post atual)

Post atual FYMOOB termina com:

> *"A FYMOOB Imobiliária tem uma ampla carteira de imóveis nos melhores bairros de Curitiba. Navegue por nossas opções..."*

→ Zero contexto, zero régua, zero autoridade. Voz de e-commerce. Banir sem exceção.

---

## Checklist de voz — antes do review final

Específico deste post. Adicional ao checklist geral do Manual Editorial.

- [ ] Lide usa contradição explícita com consenso do setor (Batel não lidera) OU rankings por perfil declarados?
- [ ] Critérios + pesos aparecem no H2 #1, antes da tabela-espinha?
- [ ] MethodologyBox no final, com fontes primárias (SESP-PR, INEP, IPPUC, FipeZap) linkadas?
- [ ] Top 5 por perfil (família, jovem, investidor, idoso) com pesos específicos declarados no abertura do cluster?
- [ ] Bairro dissonante em H2 próprio (não é só mais uma linha no ranking)?
- [ ] Seção "melhor negativo" (3 bairros pra repensar) presente e gentil?
- [ ] Zero uso de "bairro nobre/charmoso/tradicional"?
- [ ] Zero abertura com "Escolher o bairro certo é uma decisão importante..."?
- [ ] Voz "a gente" aparece no máximo 2x, sempre ancorada em dado FYMOOB?
- [ ] Todo `{{PLACEHOLDER}}` substituído por número validado pelos specialists (SESP-PR + INEP + FipeZap + Loft)?
- [ ] Todo número tem mês/ano visível (Regra 12 Manual + R-7 Research Standards)?
- [ ] Toda fonte aparece com link embed in-line no meio da frase (R-1 Research Standards)?
- [ ] Closing tem 3 perguntas operacionais concretas com fonte primária, NÃO resume?
- [ ] Internal links pras landings `/imoveis/[slug]` usam verbo de ação ("lidera segurança", "IDEB {{X}}"), não "ver imóveis no X"?
- [ ] FAQ cobre 5 PAA reais (rodar "melhores bairros curitiba" no Google antes de fechar)?
- [ ] H2s são perguntas ou promessas concretas, nunca rótulos tipo "Melhores bairros pra família"?
- [ ] Transições das 10 frases da tabela (não muleta "Já o bairro X")?
- [ ] Tempo de venda + estoque ativo FYMOOB aparecem pelo menos 1x cada (diferencial CRM)?

---

## Referências (URLs + data de consulta: 2026-04-24)

### Tier 1 — referências internacionais e nacionais de ranking feito bem (voz + estrutura)

- **[Folha — Melhores Escolas / Melhores Empresas](https://www1.folha.uol.com.br/mercado/)** — padrão nacional de ranking multi-critério com metodologia aberta. Lição principal: pesos declarados + relatividade por categoria = autoridade + transparência. Adotar integralmente a ideia.
- **[Valor Econômico — rankings setoriais](https://valor.globo.com/)** — metodologia aberta, fontes primárias linkadas no 1º parágrafo. Aplicar ao critério "preço" (FipeZap).
- **[Exame Casual — melhores bairros SP/RJ](https://exame.com/)** — rankings por perfil de comprador (não por preço absoluto). Inspirar arquitetura dos 4 clusters por perfil.
- **[New York Magazine — Best Neighborhoods](https://nymag.com/realestate/features/best-neighborhoods/)** — padrão internacional de "ranking com voz editorial". Bairro dissonante com defesa argumentada. Adotar no H2 #7.

### Tier 2 — concorrentes diretos Curitiba (anti-modelos — NÃO copiar voz, estudar o que evitar)

- **[MySide — melhores bairros Curitiba](https://myside.com.br/guia-curitiba/melhores-bairros-curitiba)** — voz aspiracional-turística ("charme", "estilo de vida"). Zero metodologia. SERP domina por volume, não por rigor. Oportunidade FYMOOB: metodologia aberta.
- **[QuintoAndar Guias — melhores bairros para morar em Curitiba](https://www.quintoandar.com.br/guias/morar/melhores-bairros-curitiba/)** — tabela + parágrafo por bairro. Repetição do nome 2x por seção. Voz corporativa. Lição: evitar monotonia.
- **[Loft Blog — bairros de Curitiba](https://loft.com.br/explore/imoveis/pr/curitiba)** — focado em listagem, não em ranking. Não compete em profundidade editorial.
- **[Larya — melhores bairros para morar em Curitiba](https://larya.com.br/blog/)** — ranking curto (top 5) com bullets turísticos. Formato de checklist. Não tem dado primário.
- **[Razzi — bairros para morar](https://www.razzi.com.br/)** — voz de portal de classificado. Zero diferencial editorial.
- **[BemBrasil Imóveis — guia de bairros Curitiba](https://www.bembrasilimoveis.com.br/)** — mesma estrutura de MySide, menos volume.

### Tier 3 — fontes primárias obrigatórias pra link in-line (R-1 Research Standards)

- **[SESP-PR — Indicadores Criminais por Bairro](https://www.seguranca.pr.gov.br/indicadores)** — fonte primária para critério segurança. Crimes letais por 100 mil habitantes, por bairro, mensal.
- **[INEP — IDEB por Escola](http://ideb.inep.gov.br/)** — fonte primária para critério educação. IDEB 2023 + Censo Escolar 2024 (últimos dados disponíveis).
- **[IPPUC — Indicadores de Bairro](https://ippuc.org.br/)** — fonte primária para infraestrutura. Saneamento, transporte, áreas verdes.
- **[IBGE — Pesquisa Nacional de Saneamento Básico](https://www.ibge.gov.br/)** — cross-check para saneamento.
- **[FipeZap — Índice de Preços](https://www.fipe.org.br/pt-br/indices/fipezap/)** — fonte primária para preço. m² médio + variação 12m por bairro.
- **[Loft CRM FYMOOB](API-interna)** — dado exclusivo FYMOOB. Tempo de venda, estoque ativo, perfil de compra por bairro.

### Tier 4 — contexto local (voz regional)

- **[Gazeta do Povo — Parana-SA](https://www.gazetadopovo.com.br/vozes/parana-sa/)** — voz regional Curitiba, bem escrita, dado primeiro.
- **[Bem Paraná — economia e imóveis](https://www.bemparana.com.br/noticias/economia/)** — aberturas humanas ancoradas em dado.
- **[Plural Curitiba — cidade](https://www.plural.jor.br/)** — ângulos editoriais diferentes (ex: "onde seu dinheiro vale mais").

### Ligações ao sistema editorial FYMOOB

- [Manual Editorial FYMOOB](../editorial-style-guide.md)
- [Research Protocol v1.0](../fymoob-research-protocol.md)
- [Writer brief anterior — preço m² (arquitetura Cluster+Spine)](./preco-m2-bairros-writer-brief.md)
- [Writer brief anterior — mercado macro (transições, voz FYMOOB)](./mercado-macro-writer-brief.md)
- [Writer brief anterior — ITBI fiscal (placeholders, régua de decisão)](./itbi-fiscal-writer-brief.md)
- [Aprendizados acumulados](../article-rewrite-learnings.md)
