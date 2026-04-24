# Writer Brief — Documentos pra Comprar Imóvel em Curitiba

> **Arquivo alvo:** `content/blog/documentos-comprar-imovel-curitiba.mdx`
> **Status:** brief de voz e craft para GUIA LOCAL CURITIBA (complementar, não concorrente, ao checklist nacional `/blog/checklist-compra-imovel`). Reescrita estrutural completa — o post atual tem 620 palavras e falha em 12/15 regras do manual. Alvo da reescrita: 1.800-2.200 palavras.
> **Autor do brief:** Writer / Craft Specialist — FYMOOB editorial team
> **Data:** 2026-04-23
> **Dependência:** Manual editorial (`docs/seo/editorial-style-guide.md`) + Research Protocol (`docs/seo/fymoob-research-protocol.md`) + Review factual (`docs/research/article-reviews/documentos-comprar-imovel-curitiba.md`) + Writer brief do checklist nacional (`docs/seo/writer-briefs/checklist-compra-imovel-writer-brief.md`).
> **REGRA DE OURO:** todo número, preço de certidão, prazo, valor de emolumento, endereço ou URL aparece como `{{PLACEHOLDER}}`. Writer NÃO inventa R$ da Certidão de Quitação, nem horário de Cartório, nem valor do laudo. Legal/Local specialists já validaram nomes de órgão, prazos legais e existência dos 8 Ofícios de RI — writer só transcreve com PLACEHOLDER + fonte atribuída pelo specialist.

---

## Por que este post é um animal diferente do checklist nacional

O checklist (`/blog/checklist-compra-imovel`) é **guia evergreen nacional** — 25 itens, arquitetura por fase temporal (antes de visitar → visita → due diligence → fechamento → pós-chave), voz educativa-acessível-com-mordida-operacional. Ele existe pra ranquear "checklist compra imóvel" em âmbito Brasil.

Este aqui é **guia local Curitiba** — e precisa sobreviver a 3 tensões que o checklist não enfrenta:

1. **Hiperlocalidade = defesa contra MySide, Quinto Andar, Loft.** Eles têm 10× mais domain authority e ranqueiam genericamente "documentos pra comprar imóvel" desde 2019. FYMOOB NÃO VAI VENCER isso na query nacional. Mas na query local — *"documentos pra comprar imóvel em Curitiba"*, *"cartório de registro de imóveis Curitiba"*, *"certidão de quitação de tributos imobiliários Curitiba"* — nacional não tem resposta. Este post **só funciona se for 80% Curitiba-específico**: nome do órgão local, endereço, preço em real de 2026, qual Ofício atende qual bairro, como emitir online na página da Prefeitura CWB, prazo no TJ-PR. Se o leitor conseguir tirar o "Curitiba" do post e ele ainda funcionar em São Paulo, o post falhou.
2. **Tema mecânico = risco de formulário.** Documentos é tema seco por natureza — lista com 14-16 itens, cada item precisa de "nome + quem emite + prazo + custo + validade". Risco: virar *tabela gigante com tags `<li>` soltas*, zero narrativa, zero retenção, dwell time de 40 segundos. **A solução não é cortar itens — é arquitetura por órgão emissor (não por "parte da transação") + voz operacional por trás de cada item ("onde pedir, quanto custa, o que acontece se esquecer").** O leitor real está com a pasta aberta na mesa, tentando saber em qual endereço vai amanhã. A voz do post tem que atender ESSA situação, não "educar sobre compra de imóvel".
3. **Um único documento é a estrela do post — e ele é obscuro.** O título novo promete "o documento esquecido que trava escritura". Decisão factual do review: **é a Certidão de Quitação de Tributos Imobiliários, emitida pela Prefeitura de Curitiba** — diferente do IPTU pago, diferente da certidão negativa genérica, emitida separadamente, pedida em 100% dos tabelionatos CWB, desconhecida por ~90% dos compradores. O post inteiro orbita esse documento: aparece no lide, ganha H2 dedicado, volta no callout, volta no fechamento. Number drop recorrente (Regra 8), mas em vez de R$ X é "o documento que faz tabelião recusar escritura depois que você já pagou o sinal".

**Diferença-resumo vs checklist nacional:**

| Dimensão | Checklist nacional | Documentos Curitiba |
|---|---|---|
| Escopo | BR — evergreen de intenção nacional | CWB — evergreen de intenção local |
| Arquitetura | 5 fases temporais (jornada) | 5 órgãos emissores (geografia + procedimento) |
| Âncora | R$ 80 mil perdidos com averbação esquecida | Certidão de Quitação de Tributos Imobiliários (CQTI) travando escritura |
| Voz | educativa-acessível-com-mordida | **operacional** — "onde pedir, quanto custa, o que leva" |
| Longo-cauda | "checklist", "25 itens", "comprar imóvel" | "cartório CWB", "Prefeitura CWB certidão", "1º Ofício de RI" |
| Autoridade FYMOOB | "a gente aplica toda semana" | "a gente conhece os 8 Ofícios pelo nome" |

---

## Voz-alvo

**Mais operacional que o checklist nacional.** O checklist é voz de quem ensina você a comprar imóvel. Este é voz de **quem senta do seu lado na pasta cheia de papel às 16h de terça-feira e te diz "essa aqui você tira no site da Prefeitura, essa aqui você pega em 15 minutos no 4º Ofício na Rua Mateus Leme, essa aqui pede 3 dias úteis pra sair"**. A diferença é sutil mas decisiva:

- **Checklist nacional:** *"Peça a matrícula atualizada — prazo de validade de 30 dias."*
- **Documentos Curitiba:** *"A matrícula você pede no Ofício de RI da zona do imóvel — se o imóvel é no Batel, é o {{N_OFICIO_BATEL}}º Ofício, na {{ENDERECO_OFICIO_BATEL}}. Sai na hora, custa R$ {{PRECO_MATRICULA_CWB}} em abril/2026, vale por 30 dias."*

Três anchors que guiam cada frase:

1. **Segunda pessoa no imperativo operacional** — "você entra no site da Prefeitura", "você leva RG e CPF no cartório", "você puxa o boleto pelo SITE-PREF". Nunca "o comprador deve solicitar". Nunca "recomenda-se obter".
2. **Endereço ou URL real em cada item** — o teste de "hiperlocalidade honesta": se o item do post não tem ou endereço físico (Rua X, nº Y) ou URL de órgão (curitiba.pr.gov.br/servico/Z), é genérico demais. Placeholder obrigatório: `{{ENDERECO_ORGAO}}` ou `{{URL_ORGAO}}`. Legal/Local specialist preenche.
3. **"A gente" usado com moderação (máx. 3 vezes), sempre em função de roteiro local** — *"a gente leva cliente no {{N}}º Ofício toda semana", "a gente conhece o funcionário que assina o dia-a-dia da guia ITBI na Prefeitura"*. Não é "a gente é bom" — é "a gente sabe o caminho físico que você tem que fazer".

**Anti-voz (banir):**
- *"É importante organizar a documentação com antecedência..."* → voz de cartilha genérica. Regra 15 banida.
- *"Comprar um imóvel envolve uma série de etapas burocráticas..."* → abertura atual do post. Exatamente o padrão que o editorial guide L276 proíbe.
- *"Nossa equipe acompanha você em todas as etapas..."* → CTA vendedor de carro, Regra R-11 violada.
- *"Consulte um cartório de sua preferência..."* → o post que SABE quais são os 8 Ofícios não pode mandar o leitor "consultar" genericamente.
- *"Documentação completa é fundamental para garantir a segurança jurídica..."* → substantivação wikipedia voice.

**Voz-irmã (emprestar tom):**
- **Seu Dinheiro — cobertura fiscal de cartório** (número + loss aversion + link oficial sem quebra)
- **Blogs de contabilidade especializada em CWB** (tom de "eu sei o prédio, eu sei o horário, eu sei o servidor")
- **NÃO emprestar** de Nubank este aqui (Nubank é tom pra checklist nacional — pra documentos, o tom nubanquiano vira genérico demais, sem cheiro de rua)

---

## Arquitetura — 5 órgãos emissores (não 5 fases)

O checklist nacional usa **5 fases temporais** (antes da visita → pós-chave). Aqui a arquitetura muda: **5 órgãos emissores em ordem de dor crescente**. Por quê:

- **Leitor vem com intenção operacional**: ele JÁ decidiu comprar, JÁ tem imóvel selecionado, JÁ está montando a pasta. Não precisa de jornada — precisa de mapa.
- **Organizar por órgão elimina repetição**: se você organizar por "parte" (comprador / vendedor / imóvel), o Cartório de RI aparece em 2 listas, a Prefeitura em 3, o TJ em 2 — leitor lê a mesma informação 3 vezes.
- **Organizar por órgão dá lógica de deslocamento**: leitor lê o post e sabe, na ordem certa, em qual endereço vai primeiro, em qual vai depois.

### Órgão 1 — Prefeitura de Curitiba (onde mora o documento esquecido)
**H2 sugerido:** `A certidão da Prefeitura que ninguém lista — e trava sua escritura`
**Escopo:** Certidão de Quitação de Tributos Imobiliários (CQTI) + guia do ITBI + IPTU quitado + valor venal de referência. **A CQTI abre o H2** porque é a estrela do post. Explicação factual do que ela é (não é o IPTU pago; é certidão específica que atesta zero débito municipal sobre o imóvel), onde se emite em 2026 ({{URL_CQTI}} no site da Prefeitura), quanto custa ({{PRECO_CQTI}} ou gratuita conforme specialist), prazo de validade ({{VALIDADE_CQTI}} dias), e **o que acontece quando falta** (tabelionato recusa a lavratura; cenário real de cliente FYMOOB em {{MES_ANO_CASO}} em bold).
**Cliffhanger:** *"Prefeitura resolvida. Agora o Cartório de RI — e aqui Curitiba tem uma particularidade geográfica que São Paulo e BH não têm."*

### Órgão 2 — Cartório de Registro de Imóveis (o mapa dos 8 Ofícios)
**H2 sugerido:** `Os 8 Ofícios de RI em Curitiba — descobrir o seu em 30 segundos`
**Escopo:** matrícula atualizada (30 dias de validade — Decreto 93.240/1986), certidão negativa de ônus reais, certidão vintenária (20 anos de filiação, exigida em financiamento caro), averbação. **Chave deste H2**: o leitor tem que saber em qual dos 8 Ofícios o imóvel dele está. Writer integra a tabela de zonas (ver seção "Integração das 8 zonas") em vez de listar como texto corrido. Cada documento entra com o molde fixo — nome + órgão (aqui: qual Ofício) + onde pedir (endereço do Ofício + URL de emissão online se houver) + custo + validade + consequência de esquecer.
**Cliffhanger:** *"Matrícula limpa, ônus zerado, Ofício certo. Falta o TJ-PR — e é aqui que o vendedor vira suspeito."*

### Órgão 3 — TJ-PR e distribuições (certidões que expõem o vendedor)
**H2 sugerido:** `As certidões do vendedor que dizem mais que o corretor`
**Escopo:** certidão de ações cíveis e criminais (distribuidor forense do TJ-PR), certidão de protestos (Tabelionato de Protesto de Títulos de CWB), certidão de interdições e tutelas (pouca gente pede — obrigatória em tabelionato pra comprovar capacidade civil), certidão trabalhista (CNDT — emitida pelo TST, não é a "certidão de ações trabalhistas" genérica que o post atual confunde). Aqui o writer **puxa levemente o fio** de *"dívida de condomínio propter rem"* mencionada no checklist nacional, mas NÃO desenvolve (linka pro checklist). Foco do H2 é *"qual documento do VENDEDOR evita que você herde dívida dele em Curitiba especificamente"*.
**Cliffhanger:** *"Vendedor passou no raio-X. Agora é Receita Federal e o banco — e a LGPD mudou esse fluxo em 2023."*

### Órgão 4 — Receita Federal + banco (comprovação de renda e FGTS)
**H2 sugerido:** `O que o banco pede em 2026 que ele não pedia em 2019`
**Escopo:** Declaração de IR (recibo + 2 últimos exercícios), extrato do FGTS ({{URL_EXTRATO_FGTS}}), comprovante de renda conforme regime (CLT 3 holerites / autônomo DIRPF + extratos 6 meses / empresário pró-labore + faturamento), certidão negativa de débitos federais (CND). Aqui entra a **integração LGPD + e-Notariado** como nota contextual (ver seção "Como explicar e-Notariado e LGPD") — não como H2 próprio, pra não inflar o post. Número a destacar: avaliação bancária {{PRECO_AVALIACAO_BANCARIA}} em 2026 (corrigindo a faixa defasada R$ 750-3.500 do post atual).
**Cliffhanger:** *"Pasta fechada. Falta 1 órgão — e é o que mais custa."*

### Órgão 5 — Tabelionato de Notas (onde os R$ X viram R$ Y+escritura+registro)
**H2 sugerido:** `Tabelionato + cartório de registro: a conta que não aparece no anúncio`
**Escopo:** lavratura da escritura (1-2% do valor, emolumentos conforme tabela 2026 do Colégio Notarial-PR — {{LINK_TABELA_CNB_PR}}), registro da escritura no Ofício de RI (~1%), e-Notariado como opção (Provimento 100/2020 CNJ + atualizações 2024/2025 — explicação em 2 frases), ITBI Curitiba 2,7% + faixas reduzidas 0,5% até {{VALOR_FAIXA_1}} / 1,6% até {{VALOR_FAIXA_2}} pra primeira compra no SFH (dado que o post atual ESQUECE). Tabela de custo total nesta seção — **não** solta no fim como o post atual faz (Regra 6 violada no post atual).
**Cliffhanger para o fechamento:** *"É isso: 14 documentos, 5 órgãos, 1 certidão que trava tudo. Faz a rota certa e você assina em 45 dias."*

---

## Lide (3 variantes com PLACEHOLDERS)

Template preferido: **Number Drop híbrido com Contradição** (Templates 1 + 2 combinados do manual). Por quê híbrido — documento esquecido é **factual específico** (não é "R$ 80 mil em média"), então o lide tem que entregar o nome do documento OU gerar curiosity gap forte o suficiente pra sustentar o scroll até o H2 que o revela. Duas estratégias válidas: (A) nomear a CQTI já no lide com loss aversion factual, (B) segurar o nome até o H2 com curiosity gap honesto. Terceira opção (C) autoridade local como backup se as métricas de CTR mostrarem que nomear no lide queima o clique.

### Variante A — Nomear e ancorar (RECOMENDADA se factual confirmar)

> *"Tem um papel emitido pela Prefeitura de Curitiba que trava {{PERCENTUAL_TRAVA}}% das escrituras em Curitiba quando falta — e ele não é o IPTU pago. É a Certidão de Quitação de Tributos Imobiliários, a {{SIGLA_CQTI}}, que {{N_CARTORIOS_CWB}} tabelionatos da cidade pedem antes de lavrar qualquer escritura. A gente fecha compra em Curitiba toda semana e monta a pasta com 14 documentos — divididos em 5 órgãos, da Prefeitura ao {{N_OFICIOS}}º Ofício de RI. Este é o mapa, com endereço, URL, prazo e custo de cada um em abril/2026."*

**Por quê:**
- 1ª frase: loss aversion factual ("trava X% das escrituras") + curiosity-killer ("não é o IPTU pago") — Regras 2 + 8 OK.
- 2ª frase: nomeia o documento com sigla ancorável (a sigla vira âncora visual recorrente no post) — Regra 8 + R-1.
- 3ª frase: autoridade operacional FYMOOB + promessa de arquitetura (14 docs em 5 órgãos) — Template 5 misturado.
- 4ª frase: mata dúvida de data currency (R-7) + entrega factual do payoff ("endereço, URL, prazo e custo") — Regra 11.
- **PLACEHOLDERS a validar:** {{PERCENTUAL_TRAVA}} = requer specialist (se não validar, usar "a maioria das" — tira número mas mantém claim); {{SIGLA_CQTI}} = provável "CQTI" mas confirmar com Prefeitura CWB; {{N_CARTORIOS_CWB}} = número de tabelionatos de notas ativos em CWB em abril/2026 (Colégio Notarial-PR); {{N_OFICIOS}} = 8 confirmado no review; {{PERCENTUAL_TRAVA}} = legal specialist.

### Variante B — Contradição com curiosity gap (segunda opção)

> *"A maioria das listas de 'documentos pra comprar imóvel em Curitiba' no Google esquece um papel — e esse papel, emitido pela Prefeitura, faz tabelião recusar a lavratura da escritura depois que você já pagou o sinal. Não é IPTU, não é certidão genérica, e não aparece em nenhum guia nacional. Em Curitiba especificamente, ele tem nome, órgão, prazo e custo — e a gente vai nomear no H2 abaixo, junto com os outros 13 documentos dos 5 órgãos que fecham uma compra aqui."*

**Por quê:** Template 2 puro (Mito-quebra). Abre com comportamento padrão do leitor ("lista do Google"), derruba com factual específico ("tabelião recusa"), promete revelação no H2 seguinte. Mais polêmico que a Variante A — **melhor pra compartilhamento social**, talvez **pior pra SEO no lide** (palavra-chave "documentos comprar imóvel Curitiba" fica pro H1, não pro lide). Usar se a Variante A tiver problema factual ({{PERCENTUAL_TRAVA}} não confirmar).

### Variante C — Autoridade local pura (emergência se A e B falharem)

> *"A gente fecha compra em Curitiba toda semana e já viu tabelião recusar {{N_ESCRITURAS_TRAVADAS}} escrituras no mês passado pelo mesmo motivo: faltou uma certidão específica da Prefeitura — que não é o IPTU e não está em lista nenhuma de guia nacional. São 14 documentos pra fechar uma compra em Curitiba, distribuídos em 5 órgãos diferentes (Prefeitura, TJ-PR, Ofício de RI, Receita, tabelionato). Este é o mapa com nome, endereço, URL, custo e prazo de cada um — inclusive o esquecido, em abril/2026."*

**Por quê:** Template 5 puro (Autoridade Local). Abre com prova de campo concreta em vez de estatística; é menos clickbaity que A ou B; usa quando specialist voltar sem dados pra {{PERCENTUAL_TRAVA}} E sem dados pra nomear a CQTI com precisão (cenário improvável mas possível). **Não é a primeira opção** porque perde o "Prefeitura" no primeiro fôlego da primeira frase — palavra-chave hiperlocal.

**Recomendação padrão:** **Variante A** se {{PERCENTUAL_TRAVA}} e {{SIGLA_CQTI}} vierem com fonte primária (Prefeitura CWB ou Colégio Notarial-PR). **Variante B** se só um dos dois vier. **Variante C** último recurso.

---

## Como tratar a Certidão de Quitação de Tributos Imobiliários (CQTI)

Pergunta do brief: **começa no lide ou no H2 dedicado?**

**Resposta: os dois — arquitetura em 3 golpes.**

1. **Golpe 1 — no lide.** Nomeia a CQTI (ou pelo menos *"certidão da Prefeitura que não é o IPTU"* na Variante B). Cria ancoragem. Leitor que chega de "documento esquecido Curitiba" recebe validação da promessa do título em 3 frases. Sem essa nomeação rápida, Google Quality Raters marcam como clickbait YMYL (editorial guide L243).
2. **Golpe 2 — callout gigante entre lide e Órgão 1.** Formato:
   > *"**O documento esquecido, em 1 parágrafo:** Certidão de Quitação de Tributos Imobiliários — emitida pela {{ORGAO_EMISSOR_CQTI}} via {{URL_CQTI}}, prazo de validade {{VALIDADE_CQTI}}, custo {{PRECO_CQTI}}. **Diferente do IPTU pago:** atesta que não há qualquer tributo municipal pendente sobre o imóvel (IPTU + taxas + multas + refis), enquanto o IPTU pago atesta só o ano corrente. **Se falta:** tabelionato em Curitiba recusa lavratura. É o item {{NUMERO_NA_LISTA}} da tabela abaixo."*

   Este callout é a versão 30-segundos do post pra leitor mobile que vai abandonar. Dá payoff completo em 1 bloco e cria âncora pro scroll (*"é o item {{NUMERO_NA_LISTA}} da tabela abaixo"*).
3. **Golpe 3 — H2 dedicado (Órgão 1, primeira metade).** Abre o H2 da Prefeitura com a CQTI já nomeada e aprofunda: diferença fina vs IPTU, exemplo real de travamento, fluxo de emissão passo-a-passo (entrar no site X → preencher Y → baixar Z), casos em que demora mais (imóvel com refis ativo, imóvel com ação fiscal pendente). Aqui é onde a voz operacional faz diferença: não é "a certidão é importante" — é "em abril/2026, se você entra no {{URL_CQTI}} e clica em {{OPCAO_MENU}}, ela sai em {{TEMPO_EMISSAO}}".

**Regra de número-âncora recorrente (Regra 8):** a CQTI é citada **4 vezes** no post — lide, callout, Órgão 1 H2, fechamento. Mais que o checklist nacional (que cita 3× o número-âncora) porque aqui o âncora **é um nome**, não um número — e nomes esquecem mais rápido que números. Precisa repetição extra.

---

## Integração das 8 zonas de RI sem virar tabela chata

O problema: são 8 Ofícios, 8 endereços, cada um atende X bairros da cidade. Se o writer joga tudo numa tabela de 8 linhas × 4 colunas no meio do Órgão 2, leitor desiste antes da quinta linha.

**Solução em 3 camadas:**

### Camada 1 — Frase-ponte narrativa antes da tabela (1 parágrafo, 3 frases)

> *"Curitiba tem 8 Ofícios de Registro de Imóveis — cada um atende uma zona específica da cidade. Se o imóvel é no Batel, é o {{N_OFICIO_BATEL}}º. Se é em Santa Felicidade, é o {{N_OFICIO_SANFEL}}º. Pedir matrícula no Ofício errado não é um erro fatal (eles redirecionam), mas custa 2-3 dias úteis que você não tem quando o banco está apertando prazo."*

**Função**: contextualiza por que a tabela existe + prova autoridade local (cita 2 bairros específicos com Ofícios concretos) + dá **consequência operacional** pra quem erra (R-11: tradução popular de "redirecionamento registral").

### Camada 2 — Tabela compacta com busca rápida (não uma tabela "museu")

| Ofício | Endereço | Bairros cobertos (principais) | URL emissão online |
|---|---|---|---|
| 1º | {{END_1}} | {{BAIRROS_1}} | {{URL_1}} |
| 2º | {{END_2}} | {{BAIRROS_2}} | {{URL_2}} |
| ... | ... | ... | ... |

**Regras da tabela:**
- Máximo 4 colunas (leitor mobile trunca tabela > 4 colunas em 375px).
- Coluna "Bairros cobertos" com no máximo **3 bairros por linha** — os mais perguntados. Se o Ofício cobre 12 bairros, lista os 3 mais buscados + "e mais {{N}}". Tentativa de mapear todos = tabela vira plancton.
- Coluna "URL emissão online" só aparece se o Ofício tem portal (nem todos têm em 2026 — Local specialist valida).
- Acima da tabela: frase *"Não sabe qual é a sua zona? {{INSTRUCAO_DESCOBRIR_ZONA}} (exemplo: busca pelo CEP no site do Anoreg-PR em {{URL_ANOREG}})."* — R-1 embed link.

### Camada 3 — 3 mini-histórias curtas dentro do H2 Órgão 2 (diluídas, não empilhadas)

1 mini-história **por Ofício "problemático"** (máximo 3 no H2 inteiro). Formato: *"{{BAIRRO}} + {{SITUACAO_COMUM}} = {{OFICIO_N}}º — e a gente já viu esse caso em {{MES_ANO_CASO}}: {{DESCRICAO_CASO_BREVE}}."* Exemplo modelo (a preencher com specialist):

> *"Imóvel novo em empreendimento na divisa Água Verde/Rebouças? 90% das vezes o registro mãe está no {{N_OFICIO_CASO}}º Ofício, não no do Água Verde — porque a matrícula mãe é a do antigo terreno, e o desmembramento fica com o Ofício de origem. A gente viu esse caso em {{MES_ANO}} e o comprador perdeu 4 dias pedindo no Ofício errado."*

**Função**: prova hiperlocal sem virar case study; quebra ritmo da tabela; dá E-E-A-T operacional.

---

## Como explicar e-Notariado e LGPD sem ficar técnico

Dois temas "novos" (pós-2020 e pós-2018) que o post atual ignora completamente e que são **diferenciadores sem virar técnicos**. Regra: **nenhum dos dois ganha H2 próprio**. Viram **nota contextual dentro do Órgão 4 (Receita + banco)** e **frase embed** dentro do Órgão 5 (tabelionato). Motivo: se ganham H2, o post vira guia jurídico; como nota embutida, ficam como *upgrades operacionais* do fluxo.

### e-Notariado — 2 frases dentro do Órgão 5

Contexto: Provimento 100/2020 CNJ + atualizações 2024/2025 permitem escritura pública 100% online via plataforma e-Notariado, incluindo assinatura ICP-Brasil do comprador e vendedor. Em PR, aceito em {{N_TABELIONATOS_CWB_ENOT}} tabelionatos em abril/2026 ({{LINK_CNB_PR_ENOT}}). Como escrever:

> *"Desde 2021, dá pra assinar a escritura sem sair de casa — é o e-Notariado, plataforma do CNJ que usa assinatura com certificado digital ICP-Brasil. Em Curitiba, {{N_TABELIONATOS_CWB_ENOT}} tabelionatos aceitam em abril/2026 ([Colégio Notarial-PR]({{LINK_CNB_PR_ENOT}}))."*

**Regra R-11 aplicada:** "ICP-Brasil" aparece com a explicação popular mínima (*"certificado digital"*) na mesma frase. "e-Notariado" define na 1ª menção. Não aprofundar — quem quer saber mais pesquisa.

### LGPD — 2 frases dentro do Órgão 4

Contexto: LGPD (Lei 13.709/2018) mudou como imobiliária/banco coletam documentos do comprador. Agora exigem **termo de consentimento** para armazenar CPF, IR, holerites, extrato FGTS. Como escrever:

> *"A LGPD ({{LINK_LGPD}}) mudou a pasta em 2018: agora imobiliária e banco pedem um termo de consentimento antes de guardar seu CPF, holerite, IR e FGTS. Não é burocracia pra inglês ver — é o que te protege se os documentos vazarem em qualquer lugar do fluxo."*

**Regra R-11 aplicada:** "LGPD" define na 1ª menção (e só na 1ª — não aparece 5+ vezes no post, então Regra R-11 operacional manda definir ou substituir; a definição mínima aqui é via `{{LINK_LGPD}}`).

---

## Transições naturais entre órgãos

Entre H2 e H2, a transição faz o leitor atravessar. Proibido: "Em seguida", "Por outro lado", "Dessa forma". Padrão FYMOOB: **frase de 6-10 palavras que fecha o órgão atual e nomeia o próximo**.

| Saindo do Órgão | Entrando no | Transição sugerida |
|---|---|---|
| 1 (Prefeitura) | 2 (Cartório RI) | *"Prefeitura resolvida. Agora o Cartório — e Curitiba tem uma geografia registral peculiar."* |
| 2 (Cartório RI) | 3 (TJ-PR) | *"Matrícula limpa. Ônus zerado. Falta examinar o vendedor — e o TJ-PR entrega mais que o corretor."* |
| 3 (TJ-PR) | 4 (Receita + banco) | *"Vendedor passou no raio-X. Agora é a Receita e o banco — e a LGPD mudou esse fluxo em 2023."* |
| 4 (Receita + banco) | 5 (Tabelionato) | *"Pasta fechada. Falta a última rota — e é a que mais custa do valor do imóvel."* |
| 5 (Tabelionato) | Closing | *"14 documentos. 5 órgãos. 1 certidão esquecida. A rota certa fecha compra em 45 dias."* |

**Bônus — transições dentro do mesmo H2 (entre documentos do mesmo órgão):**
- *"Esse é o que você tira no site. Agora o que precisa ir presencial."*
- *"Esse sai na hora. Esse leva 3 dias úteis."*
- *"Esse é o óbvio. Esse é o que ninguém avisa."*
- *"Até aqui, online. A partir daqui, Rua {{RUA_EXEMPLO}}, nº {{NUM}}."*

---

## Retention tricks específicos de documentos

Guia operacional cansa ainda mais rápido que guia comparativo — porque o leitor veio extrair informação, não se distrair. **6 mecanismos de retenção calibrados pra este post específico:**

### 1 — Molde fixo por documento (contrato visual com o leitor)

Cada um dos 14 documentos segue EXATAMENTE este molde de 5 linhas:

```
**{{Nome do documento em bold}}**
- **Quem emite:** {{órgão + link ou endereço}}
- **Onde pedir:** {{URL oficial ou endereço físico}} — {{preço em R$ em abril/2026}}
- **Prazo de validade:** {{X dias}} ({{fonte legal: Decreto/Lei}})
- **Se falta:** {{consequência concreta — trava escritura / atrasa financiamento / herda dívida de R$ Y}}
```

**Por quê funciona:** o leitor aprende o padrão no documento 1 e escaneia os 13 seguintes em 5 segundos cada. Previsibilidade = retenção. Quebrar o molde (*"neste documento, a validade é diferente, então vou explicar em prosa"*) mata o contrato visual e o leitor abandona. **Se um documento não cabe no molde, é porque ele não deveria estar na lista.**

### 2 — Callout "na mesa às 16h de terça" (1 por post, entre Órgão 2 e Órgão 3)

Formato:

> *"**Se você está com a pasta aberta agora**: primeiro tira a {{SIGLA_CQTI}} online na Prefeitura (15 minutos). Depois vai pro {{N}}º Ofício de RI pedir matrícula + ônus reais (sai na hora). Só depois você pega as certidões do TJ-PR (prazo de 3-5 dias úteis). Fazer na ordem certa economiza 1 semana."*

Função: dá **ordem cronológica operacional** ao leitor que entrou no post com pasta na mesa. Quebra a sensação de "14 itens empilhados" e cria a narrativa *"isso é um mapa, não uma lista"*.

### 3 — Tabela-resumo ÚNICA no topo (não 3 tabelas soltas)

Logo após o lide + callout da CQTI, **uma tabela única** com os 14 documentos em 4 colunas: *Documento | Órgão | Prazo validade | Se falta*. Sem endereço (detalhe fica no H2 do órgão), sem preço (idem). Função: Regra 6 do manual — entregar escaneável antes da narrativa. **Máximo 14 linhas, zero merge de célula, bold só em "Se falta" quando a consequência é "trava escritura".**

### 4 — Frases-punch operacionais (Regra 7)

Padrões calibrados pra este post:
- *"Esse sai na hora. O próximo leva 5 dias."*
- *"Pagou em dobro porque não sabia disso."*
- *"É gratuito. Só pede paciência com o site."*
- *"A gente faz isso toda segunda."*
- *"Rua {{RUA}}, nº {{NUM}}. Leva RG."*

Distribuição: 1 frase-punch a cada 3-5 parágrafos longos. Nunca duas seguidas.

### 5 — Number drops operacionais (não de perda)

Diferente do checklist nacional (onde os number drops são *"R$ 80 mil perdidos"*), aqui são **números de caminho**: prazo de emissão, preço, horário de funcionamento, quantidade de documentos por órgão. 6 number drops distribuídos:

| # | Número | Onde aparece | Fonte-alvo |
|---|---|---|---|
| 1 | **14 documentos** em 5 órgãos | Lide, callout, tabela-resumo, fechamento | Síntese FYMOOB do post |
| 2 | **8 Ofícios** de RI em Curitiba | Órgão 2 | Anoreg-PR |
| 3 | **{{PRECO_CQTI}}** da Certidão de Quitação | Callout + Órgão 1 | Prefeitura CWB |
| 4 | **2,7% + 0,5%/1,6% reduzidas** (faixas ITBI) | Órgão 5 | LC Curitiba ITBI |
| 5 | **30 dias** de validade da matrícula | Órgão 2 | Decreto 93.240/1986 |
| 6 | **R$ {{PRECO_AVALIACAO_BANCARIA}}** de avaliação bancária 2026 | Órgão 4 | Creditas docs 2026 |

**Âncora recorrente:** 14 documentos + CQTI aparecem 4 vezes cada (lide / callout / meio / fechamento). Os outros aparecem 1 vez cada.

### 6 — FAQ como "segunda camada" do H2 do TJ-PR (Regra 14)

5 perguntas de PAA real do Google pra "documentos comprar imóvel Curitiba" — a pesquisar no PAA real antes de escrever. Placeholders:
- *"{{PAA_1: qual a validade da matrícula do imóvel?}}"*
- *"{{PAA_2: e-Notariado serve pra compra em Curitiba?}}"*
- *"{{PAA_3: preciso de certidão vintenária pra financiar?}}"*
- *"{{PAA_4: ITBI Curitiba paga antes ou depois da escritura?}}"*
- *"{{PAA_5: quanto tempo demora registro de escritura em Curitiba?}}"*

Cada resposta em 2-4 frases, resposta direta na primeira frase (padrão featured snippet).

---

## Closing template

Closing de guia operacional morre em "resumo dos 14 documentos". Padrão FYMOOB substitui por **3 movimentos + provocação que força decisão**.

### Template recomendado

> *"Três movimentos pra montar a pasta de compra em Curitiba sem perder semana:*
>
> *1. **Tira a {{SIGLA_CQTI}} primeiro** — é o papel que trava escritura e 90% dos compradores esquece. Online, na {{URL_CQTI}}, sai em {{TEMPO_EMISSAO_CQTI}}.*
>
> *2. **Descobre sua zona de Ofício de RI antes de pedir matrícula** — se é Batel, {{N_BATEL}}º; se é Santa Felicidade, {{N_SANFEL}}º. Pedir no errado custa 3 dias úteis.*
>
> *3. **Pede as certidões do TJ-PR em lote** — cíveis, criminais, protestos, CNDT, interdições. 5 certidões num pedido só economiza 2 dias em relação a pedir separado.*
>
> *14 documentos, 5 órgãos, 1 certidão esquecida. Ou você conhece o caminho ou contrata quem conhece — em Curitiba, a gente faz essa rota toda semana. [{{CTA_LINK_FYMOOB}}]."*

**Por quê funciona:**
- 3 ações com verbo imperativo ("tira", "descobre", "pede") — padrão operacional.
- Cada ação tem régua concreta — evita "consulte um profissional".
- Última frase volta o âncora ("14 documentos, 5 órgãos, 1 certidão esquecida") — Regra 8.
- Dicotomia final ("ou você conhece ou contrata quem conhece") sem ser vendedor-de-carro — Regra 10 + R-11.
- CTA inline no final, não CTABox (substituindo os 2 CTABoxes gritantes do post atual).

### Anti-fechamento (do post atual — BANIR)

> *"A equipe da FYMOOB Imobiliária acompanha você em todas as etapas da compra, desde a escolha do imóvel até o registro da escritura. Temos experiência com todos os tipos de transação e podemos orientar sobre a documentação específica do seu caso."*

→ Padrão banido do manual (L294): *"Nossa imobiliária está aqui pra te ajudar..."*. CTA vendedor de carro, zero payoff, zero provocação. Regra 11 violada.

### Alternativas ao "consulte um cartório"

- *"Se o seu caso tem vendedor PJ + imóvel com refis municipal ativo, o fluxo muda. Nesse caso específico, [fala com a gente antes]({{LINK}})."*
- *"Se já fez a proposta e a pasta está montando, a rota certa poupa 1 semana sobre a errada."*
- *"Se o vendedor insiste em não entregar {{DOCUMENTO_X}}, é porque tem algo em {{DOCUMENTO_X}}. A ausência é a informação."*

---

## Checklist de voz — antes do review final

Específico deste post. Adicional ao checklist do style guide.

- [ ] Lide tem nome do documento ou curiosity gap específico (não genérico "documento esquecido")?
- [ ] Lide tem 3-4 frases e carrega "Curitiba" + "Prefeitura" no 1º fôlego?
- [ ] Zero abertura com *"Comprar um imóvel envolve..."* ou *"Organizar a documentação é..."*?
- [ ] 5 H2s são promessas concretas por órgão (nenhum é rótulo "Documentos do comprador")?
- [ ] Cada H2 de órgão termina em cliffhanger nomeando o próximo órgão?
- [ ] Callout da CQTI aparece entre lide e Órgão 1 (golpe 2 da arquitetura CQTI)?
- [ ] Tabela-resumo dos 14 documentos aparece antes do Órgão 1 (Regra 6)?
- [ ] 8 Ofícios integrados via frase-ponte narrativa + tabela compacta + mini-histórias (não tabela crua)?
- [ ] Cada um dos 14 documentos segue o molde fixo de 5 linhas (quem emite / onde pedir / preço / validade / se falta)?
- [ ] Todo documento tem endereço físico OU URL oficial (placeholder explícito se não tem)?
- [ ] e-Notariado explicado em 2 frases dentro do Órgão 5 (não H2 próprio)?
- [ ] LGPD explicada em 2 frases dentro do Órgão 4 (não H2 próprio)?
- [ ] "A gente" aparece no máximo 3 vezes, sempre em observação operacional concreta?
- [ ] Número-âncora "CQTI" e "14 documentos" aparecem 4 vezes cada (lide / callout / meio / fechamento)?
- [ ] Preço de avaliação bancária atualizada de R$ 750-3.500 (post atual) → R$ {{PRECO_AVALIACAO_BANCARIA}} em abril/2026?
- [ ] ITBI Curitiba 2,7% + faixas reduzidas 0,5%/1,6% citadas no Órgão 5?
- [ ] FAQ no final com 5 PAAs reais do Google (validar com busca real antes do commit)?
- [ ] 4-5 internal links: `/blog/checklist-compra-imovel` (post irmão nacional), `/blog/itbi-curitiba-2026`, `/blog/financiamento-*`, `/guia/glossario`?
- [ ] Link `/blog/checklist-compra-imovel` aparece pelo menos 1× no corpo (cross-sell entre posts)?
- [ ] Fontes primárias in-line: Prefeitura CWB (CQTI), Colégio Notarial-PR (tabela emolumentos), Anoreg-PR (8 Ofícios), Planalto (Decreto 93.240/1986 + LGPD), Receita (CND)?
- [ ] Closing = 3 ações imperativas operacionais + dicotomia final + CTA inline, zero CTABox gritante?
- [ ] `updatedAt: "2026-04-23"` no frontmatter + *"Verificado em abril/2026"* visível no corpo?
- [ ] AuthorCard do Bruno (CRECI J 9420 / 24.494) no rodapé — R-9 obrigatório pra YMYL?
- [ ] MethodologyBox no fim (antes do CTA) — R-5 se o post entra como guia autoritativo?
- [ ] Todo `{{PLACEHOLDER}}` substituído por número/endereço/URL validado pelo Local/Legal specialist (nunca pelo writer)?

---

## Referências

**Tier 1 — voz operacional local (emprestar tom):**
- [Seu Dinheiro — checklists de documentos fiscais](https://www.seudinheiro.com/) — padrão loss aversion + fonte oficial in-line
- Blogs de contabilidade local CWB (a definir — Local specialist indica 2-3 com tom de "eu sei o prédio")

**Tier 2 — anti-modelos a estudar (o que NÃO fazer em guia de documentos):**
- [MySide — documentos compra imóvel](https://myside.com.br/guia-imoveis/) — listicle seco, zero local, voz genérica
- [Quinto Andar — documentos compra](https://www.quintoandar.com.br/guias/como-comprar/) — estrutura correta, voz enciclopédica
- Post atual (`content/blog/documentos-comprar-imovel-curitiba.mdx`) — falha em 12/15 regras, usar como anti-modelo

**Fontes primárias pra link in-line (R-1 + R-2):**
- [Prefeitura de Curitiba — Certidões e Serviços]({{URL_PREF_CERTIDOES}}) — emissão CQTI
- [Prefeitura de Curitiba — ITBI base e alíquotas](https://www.curitiba.pr.gov.br/servicos/itbi-base-de-calculo-e-aliquotas/512) — alíquota 2,7% + faixas reduzidas
- [Anoreg-PR]({{URL_ANOREG_PR}}) — lista dos 8 Ofícios de RI em Curitiba
- [Colégio Notarial do Brasil — Seção PR](https://cnbpr.org.br/) — tabela emolumentos + tabelionatos e-Notariado
- [Planalto — Decreto 93.240/1986](https://www.planalto.gov.br/ccivil_03/decreto/antigos/d93240.htm) — validade 30 dias matrícula
- [Planalto — Lei 13.709/2018 LGPD](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) — consentimento
- [CNJ — Provimento 100/2020 (e-Notariado)](https://www.cnj.jus.br/) — escritura online
- [IRIB — Registro de Imóveis Brasil](https://www.irib.org.br/) — âmbito federal registral
- [Receita Federal — CND pessoa física/jurídica]({{URL_CND_RECEITA}}) — documentos negativos
- [Creditas — Documentos necessários 2026](https://www.creditas.com/exponencial/documentos-necessarios-para-compra-de-imovel/) — avaliação bancária atualizada

**Ligações ao sistema editorial FYMOOB:**
- [Manual Editorial FYMOOB](../editorial-style-guide.md)
- [FYMOOB Research Protocol](../fymoob-research-protocol.md)
- [Review factual do post](../../research/article-reviews/documentos-comprar-imovel-curitiba.md)
- [Writer brief post irmão — Checklist Compra Imóvel (nacional)](./checklist-compra-imovel-writer-brief.md) — padrão de arquitetura por fase + number drop
- [Writer brief — ITBI fiscal](./itbi-fiscal-writer-brief.md) — padrão de tradução de lei municipal CWB
- [Writer brief — Preço m² bairros](./preco-m2-bairros-writer-brief.md) — padrão de integração de muitos bairros sem virar tabela
