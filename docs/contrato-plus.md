# FYMOOB — Serviços Adicionais (Contrato Plus)

> Funcionalidades solicitadas pelo Bruno em 09/04/2026.
> Documento para alinhamento, precificação e aprovação antes da implementação.

---

## 0. Escopo: O que o contrato prevê vs. o que foi solicitado

### O que JÁ ESTÁ no contrato original (Cláusula 2ª)

| # | Entrega | Status |
|---|---------|--------|
| 1 | Site responsivo (desktop, tablet, mobile) | Concluído ✅ |
| 2 | Páginas automáticas de imóveis (~249 imóveis do CRM) | Concluído ✅ |
| 3 | Landing pages por bairro (~65 bairros) | Concluído ✅ |
| 4 | Landing pages por tipo (apartamentos, casas, sobrados, terrenos) | Concluído ✅ |
| 5 | Landing pages combinadas (bairro + tipo, ~260 páginas) | Concluído ✅ |
| 6 | Landing pages por faixa de preço (5 faixas) | Concluído ✅ |
| 7 | Páginas de empreendimentos (113 empreendimentos) | Concluído ✅ |
| 8 | Busca avançada com filtros (tipo, bairro, preço, quartos, área) | Concluído ✅ |
| 9 | Blog com 5 artigos SEO + painel admin para autonomia do cliente | Blog ✅ / Painel pendente |
| 10 | Páginas institucionais (Sobre, Contato, FAQ, **Anuncie seu Imóvel**) | Concluído ✅ |
| 11 | Home com destaques, stats, busca rápida, CTAs | Concluído ✅ |
| 12 | Sincronização automática com CRM Loft/Vista | Concluído ✅ |
| 13 | Geração programática de 800+ páginas indexáveis | Concluído ✅ |
| 14 | SEO técnico completo (meta tags, schema, sitemap, robots, breadcrumbs) | Concluído ✅ |
| 15 | Integração WhatsApp + Google Analytics + Search Console | Concluído ✅ |
| 16 | Core Web Vitals otimizado (Lighthouse mobile >80) | Concluído ✅ |
| 17 | Área do Cliente (link para portal Loft) | Concluído ✅ |
| 18 | Deploy em produção (Vercel + domínio fymoob.com) | Pendente (DNS) |

### O que NÃO ESTÁ no contrato (Cláusula 2ª, Parágrafo 2º)

> *"Não estão incluídas no escopo: novas funcionalidades não listadas, novas páginas fora do escopo original, integrações customizadas além de Loft/Vista, GA4, WhatsApp."*

| # | Funcionalidade solicitada | No contrato? | Motivo |
|---|--------------------------|-------------|--------|
| 1.1 | Calculadora de Avaliação de Imóvel (IA) | **NÃO** | Ferramenta nova, requer backend de cálculo, não listada |
| 1.2 | Laudo de Avaliação Presencial (página) | **NÃO** | Página de serviço nova, não prevista |
| 1.3 | Pack de Certidões (c/ pagamento online) | **NÃO** | Serviço novo + integração de pagamento |
| 1.4 | Proposta de Compra Online (PDF + email) | **NÃO** | Sistema novo: geração de PDF + envio de email + aceite digital |
| 1.5 | Anuncie seu Imóvel (Venda) | **SIM** ✅ | Já existe em `/anuncie` — apenas reposicionar |
| 1.6 | Proposta de Locação Online (PDF + email) | **NÃO** | Mesmo que 1.4, versão locação |
| 1.7 | Análise de Crédito (formulário) | **NÃO** | Funcionalidade nova com coleta de dados sensíveis |
| 1.8 | Anuncie seu Imóvel (Locação) | **PARCIAL** | Variação da página existente com textos adaptados |
| 1.9 | Hub de Serviços (nova página + header) | **NÃO** | Página nova + alteração na navegação principal |

---

## 1. Funcionalidades Solicitadas

### Para Imóveis (Ferramentas)

#### 1.1 Calculadora de Avaliação de Imóvel
Ferramenta online onde o visitante insere dados básicos do imóvel (tipo, bairro, área, quartos, vagas) e recebe uma **estimativa de valor de mercado** calculada com base nos imóveis do portfólio FYMOOB e dados da região. Funciona como isca de tráfego orgânico — keywords como "quanto vale meu imóvel curitiba" têm volume alto e concorrência local baixa. Ao final da estimativa, captura o lead para o CRM.

**Potencial como produto:** ALTÍSSIMO. É a funcionalidade mais valiosa desta lista. A calculadora é um **ativo de software reutilizável** — o mesmo motor de avaliação pode ser licenciado como SaaS para outras imobiliárias de Curitiba e do Brasil que não têm capacidade técnica de construir uma. Plataformas como QuintoAndar, ZAP e Loft investiram milhões para construir ferramentas similares. Para uma imobiliária local, ter essa ferramenta é um diferencial competitivo brutal — nenhuma imobiliária de Curitiba tem uma calculadora própria hoje. Além disso, cada avaliação gera um lead qualificado automaticamente (pessoa com imóvel para vender = potencial captação), fazendo a ferramenta se pagar sozinha ao gerar negócios.

> **Valor como software independente:** R$ 15.000-30.000 se vendido como produto para imobiliárias. O que estamos construindo aqui é uma fração desse custo.

#### 1.2 Laudo de Avaliação Presencial
Página explicando o serviço de avaliação física (visita ao imóvel, fotos, laudo técnico). Formulário de solicitação que envia lead ao CRM com dados do imóvel e endereço para agendamento.

**Potencial como produto:** BAIXO como software (é uma página institucional), mas ALTO como canal de receita para a imobiliária. Digitaliza um serviço que hoje depende de ligação/WhatsApp. O formulário estruturado já envia o lead com todos os dados necessários, economizando tempo do corretor. A página também ranqueia no Google para "avaliação de imóvel curitiba" — tráfego orgânico que vira receita de serviço.

> **Valor como canal de receita:** Cada laudo de avaliação judicial custa R$ 800-2.000 para o cliente. A página online pode gerar 5-10 solicitações/mês sem custo de aquisição.

### Para Vendas

#### 1.3 Pack de Certidões
Serviço pago para providenciar a documentação necessária em transações particulares (matrícula atualizada, certidão negativa de débitos, IPTU, certidões de distribuidores, etc.). Página com explicação dos pacotes, documentos incluídos, prazos e preços. Formulário de solicitação com possibilidade de pagamento online (Pix/cartão).

**Potencial como produto:** ALTO. Este é um **serviço escalável com margem de ~50%** — o custo real das certidões é R$ 400-800, e serviços como Certidão Expressa cobram R$ 1.197 pelo kit completo. A FYMOOB pode vender o pacote com margem saudável. Como software, o sistema de pedidos e acompanhamento pode ser replicado como plataforma white-label para despachantes e imobiliárias. O diferencial competitivo é real: pouquíssimas imobiliárias vendem certidões direto pelo site, e quem procura "certidões para compra de imóvel curitiba" no Google encontra apenas cartórios e despachantes genéricos — a FYMOOB ocuparia esse espaço.

> **Valor como canal de receita:** Se vender 10 packs/mês a R$ 1.200, são R$ 12.000/mês de receita extra com margem de R$ 5.000-6.000 líquido.

#### 1.4 Proposta de Compra Online
Formulário digital preenchido pelo corretor com dados do comprador, imóvel, valor proposto e condições de pagamento. Gera um PDF profissional com a identidade FYMOOB e envia por email ao cliente para aceite/assinatura.

**Potencial como produto:** ALTO. Geração de propostas imobiliárias digitais é um **nicho de software pouco explorado no Brasil**. Plataformas como Tecimob e Kenlo cobram R$ 200-500/mês de assinatura por CRMs que incluem essa funcionalidade. Um módulo independente de propostas digitais com PDF profissional + aceite online + assinatura gov.br poderia ser vendido separadamente para corretores autônomos e pequenas imobiliárias que usam papel/WhatsApp hoje. Além do produto, para a FYMOOB o impacto operacional é imediato: reduz o ciclo de fechamento de dias para horas, impressiona o cliente com profissionalismo, e cria registro digital de todas as negociações.

> **Valor como software independente:** Módulos similares em CRMs imobiliários custam R$ 3.000-8.000 de implementação. Como SaaS, cobraria R$ 99-199/mês por imobiliária.

#### 1.5 Anuncie seu Imóvel (Venda)
Já existe na página `/anuncie`. Sem alteração necessária — apenas reposicionar dentro do novo hub de serviços.

### Para Locação

#### 1.6 Proposta de Locação Online
Versão locação da proposta #1.4. Campos específicos: prazo do contrato, tipo de garantia (fiador, caução, seguro-fiança), valor do aluguel proposto, data de entrada.

**Potencial como produto:** ALTO (mesmo da 1.4). O mercado de locação em Curitiba é gigante — a maior parte das imobiliárias ainda trabalha com propostas impressas ou PDF genéricos feitos no Word. Uma proposta digital com a marca da imobiliária, campos estruturados e aceite online é um upgrade operacional significativo. Pode ser vendido junto com a proposta de compra (1.4) como pacote "Propostas Digitais" para outras imobiliárias.

> **Valor como diferencial:** Imobiliárias que digitalizam propostas reduzem o tempo de fechamento em 60-70% e diminuem desistências por burocracia.

#### 1.7 Análise de Crédito
Formulário onde o interessado em alugar preenche dados pessoais e financeiros (nome, CPF, renda, referências). Os dados são enviados ao CRM para que o corretor realize a análise de crédito manualmente. Futuramente pode integrar API de bureau de crédito.

**Potencial como produto:** MÉDIO na v1 (formulário manual), ALTÍSSIMO na v2 (com integração de bureau). Na versão inicial, é um formulário que organiza a coleta de dados — útil mas não revolucionário. Porém, se evoluir para integrar consultas automáticas (Serasa/Boa Vista), vira uma **plataforma de análise de crédito para locação**, produto que imobiliárias pagam R$ 300-800/mês para ter acesso via plataformas como CredPago e Avalyst. O impacto para a FYMOOB é operacional: elimina a troca de mensagens no WhatsApp pedindo documentos — o cliente preenche tudo de uma vez.

> **Valor futuro (v2 com bureau):** Plataformas de análise de crédito para locação cobram R$ 15-30 por consulta. Com 50 consultas/mês = R$ 750-1.500 de receita.

#### 1.8 Anuncie seu Imóvel (Locação)
Variação da página `/anuncie` focada em proprietários que querem colocar imóvel para alugar. Mesma estrutura, com textos e benefícios adaptados para locação.

**Potencial como produto:** BAIXO como software (é uma página simples), mas ESTRATÉGICO para captação. Proprietários que querem alugar buscam no Google "anunciar imóvel para alugar curitiba" — ter uma landing page otimizada para esse público específico captura um segmento diferente do anúncio de venda. Dois formulários distintos permitem que o CRM categorize leads por finalidade automaticamente, melhorando o atendimento do corretor.

> **Valor como SEO:** Keywords de locação têm menos concorrência que venda. Página dedicada pode ranquear mais rápido.

### Infraestrutura

#### 1.9 Página Hub "Serviços"
Substitui o botão "Anunciar" no header por "Serviços". Página dedicada com cards organizados em seções (Ferramentas, Para Vendas, Para Locação). Cada card direciona para a página individual do serviço.

**Potencial como produto:** É a BASE que viabiliza todas as outras funcionalidades. Sem o hub, os serviços ficam escondidos e o cliente não encontra. O hub transforma a FYMOOB de "site de imóveis" em "plataforma de serviços imobiliários" — posicionamento premium que justifica cobrar por serviços e diferencia de portais como ZAP/VivaReal que são apenas listagem. Do ponto de vista de software, o layout de hub com cards é reutilizável para qualquer imobiliária que quiser oferecer serviços online.

> **Valor de posicionamento:** Nenhuma imobiliária de pequeno/médio porte em Curitiba oferece um portal de serviços estruturado assim. Isso posiciona a FYMOOB como referência no mercado local.

---

## 2. Formulário de Definição — Perguntas para o Bruno

> Este formulário define o que será implementado, como e com qual prioridade.
> Cada resposta impacta diretamente no esforço, custo e prazo.
> Para montar no Google Forms: cada seção abaixo = 1 seção do formulário.

---

### SEÇÃO 1: Calculadora de Avaliação de Imóvel

**1. Qual o nível de detalhe que a calculadora deve ter?**
*(Escolha uma opção. A opção define quantos dias leva para construir e quanto custa.)*

- [ ] **(A) Básica** — O visitante informa o bairro, tipo do imóvel (apartamento, casa, etc.) e a metragem. O site mostra na hora uma faixa de preço estimada (ex: "Entre R$ 350.000 e R$ 450.000") com base nos imóveis que a FYMOOB tem cadastrados no CRM. Simples e rápido.
- [ ] **(B) Intermediária** — Tudo da opção A, mas também leva em conta número de quartos, vagas, e diferenciais do imóvel (piscina, churrasqueira, etc.) para refinar a estimativa. Além disso, mostra imóveis parecidos que a FYMOOB tem no portfólio, para o visitante já poder comparar.
- [ ] **(C) Avançada com IA** — Tudo da opção B, mas com uma inteligência artificial que escreve um texto personalizado explicando a avaliação (ex: "Seu apartamento no Batel com 3 quartos e 98m² está avaliado entre R$ X e R$ Y. Imóveis nessa região tiveram valorização de..."). Envia relatório completo por email. Muito mais impressionante, mas leva mais tempo para construir.

**2. O visitante precisa se cadastrar para ver o resultado da calculadora?**
*(Isso define se a calculadora gera leads automaticamente ou não.)*

- [ ] **(A) Não precisa se cadastrar** — Mostra o resultado na hora, sem pedir nada. No final da página aparece um convite opcional: "Quer uma avaliação profissional? Deixe seus dados." Menos leads, mas mais gente usa.
- [ ] **(B) Precisa se cadastrar antes** — O visitante preenche nome, email e telefone ANTES de ver o resultado. Gera mais leads, mas muita gente desiste e sai da página sem preencher.
- [ ] **(C) Meio-termo** — Mostra uma prévia genérica na hora (ex: "Seu imóvel está na faixa de R$ 300-500 mil"). Para ver o relatório detalhado com comparativos, aí sim pede os dados. Funciona bem porque o visitante já viu valor antes de se cadastrar.

**3. A calculadora deve cobrir quais regiões?**
- [ ] Apenas Curitiba
- [ ] Curitiba + cidades próximas onde a FYMOOB atua (São José dos Pinhais, Colombo, Pinhais, etc.)

**4. Depois de mostrar a estimativa, quer que o site sugira imóveis parecidos do portfólio FYMOOB?**
*(Ex: "Imóveis similares disponíveis na FYMOOB" com 3-6 cards de imóveis. Isso faz o visitante navegar mais no site e pode virar uma venda.)*
- [ ] Sim, mostrar imóveis parecidos
- [ ] Não, só mostrar o resultado da avaliação

---

### SEÇÃO 2: Laudo de Avaliação Presencial

**5. Como o preço do laudo deve aparecer na página?**
*(Se mostrar o preço, o cliente já sabe quanto custa antes de pedir. Se não mostrar, o corretor negocia caso a caso.)*

- [ ] Mostrar preço fixo (ex: "A partir de R$ 800")
- [ ] Mostrar faixas de preço por tipo (ex: "Avaliação simples: R$ 800-1.500 / Avaliação judicial: R$ 2.000-5.000")
- [ ] Não mostrar preço — apenas "Solicite um orçamento" com formulário

**6. Quais tipos de laudo a FYMOOB oferece?**
*(Marque todos que se aplicam.)*
- [ ] Avaliação simples — para compra e venda particular, sem valor judicial
- [ ] Avaliação judicial — laudo técnico com norma ABNT NBR 14653, aceito em processos
- [ ] Avaliação para financiamento bancário — exigida por Caixa, Itaú, Bradesco etc.

**7. Quando o cliente solicitar um laudo pelo site, o que acontece?**
- [ ] Os dados dele vão para o CRM e o corretor entra em contato depois por WhatsApp ou telefone
- [ ] O site já abre o WhatsApp direto com uma mensagem pronta (ex: "Olá, quero solicitar um laudo para meu imóvel na Rua X...")

**8. Quem é o responsável técnico pelos laudos na FYMOOB?**
*(O nome e registro profissional aparece na página — isso passa credibilidade para o Google e para o cliente.)*
- Nome do profissional: _______________
- Registro (CREA ou CAU): _______________
- [ ] Não temos profissional fixo — usamos terceirizados

---

### SEÇÃO 3: Pack de Certidões

**9. Como o cliente vai pagar pelo serviço de certidões?**
*(A opção de pagamento online é mais profissional, mas custa mais para implementar.)*

- [ ] **(A) Pix manual** — O site mostra o formulário de solicitação e as instruções de Pix. O Bruno confirma o pagamento manualmente antes de iniciar o serviço. Mais simples de implementar.
- [ ] **(B) Pagamento online no site** — O cliente paga direto no site com cartão de crédito ou Pix automático (como em um e-commerce). O pagamento é confirmado na hora sem precisar de ação manual. Mais profissional, mas leva mais tempo para construir.

**10. Quantos pacotes de certidões quer oferecer?**
- [ ] Pacote único — um kit completo com todas as certidões, preço fechado
- [ ] 2 opções — um básico (certidões principais) e um completo (todas as certidões)
- [ ] 3 opções — básico, completo e premium (com análise jurídica dos documentos inclusa)

**11. Quais certidões a FYMOOB vai providenciar? (Marque todas que se aplicam)**
- [ ] Certidão de Matrícula Atualizada (do Registro de Imóveis)
- [ ] Certidão Negativa de Ônus Reais
- [ ] Certidão Negativa de Débitos Municipais / IPTU
- [ ] Certidão de Quitação Fiscal (Receita Federal)
- [ ] Certidão Negativa de Débitos Trabalhistas
- [ ] Certidão dos Distribuidores Cíveis (Justiça Estadual)
- [ ] Certidão dos Distribuidores Federais (Justiça Federal)
- [ ] Certidão de Protesto
- [ ] Certidão Negativa de Débitos Condominiais
- [ ] Outras: _______________

**12. Quem vai solicitar as certidões nos órgãos?**
- [ ] A própria FYMOOB solicita diretamente
- [ ] A FYMOOB terceiriza para um despachante parceiro

**13. Qual o prazo de entrega das certidões ao cliente?** ___ dias úteis

**14. Quanto pretende cobrar?**
*(Se escolheu mais de um pacote na pergunta 10, preencha os valores de cada um.)*
- Pacote Básico: R$ _______________
- Pacote Completo: R$ _______________
- Pacote Premium (se houver): R$ _______________

**15. Como o cliente acompanha o andamento do pedido?**
- [ ] **(A) Sem acompanhamento online** — O cliente solicita e a FYMOOB avisa por email ou WhatsApp quando estiver pronto. Mais simples.
- [ ] **(B) WhatsApp** — O corretor atualiza o cliente manualmente por mensagem quando cada certidão fica pronta.
- [ ] **(C) Painel no site** — O cliente entra no site com login e senha e vê o status de cada certidão em tempo real (como rastrear uma encomenda). Mais sofisticado, mas custa mais para implementar.

**16. Quem pode comprar o pack de certidões?**
*(Abrir para o público geral gera mais receita e traz visitantes para o site. Restringir só para clientes FYMOOB é mais simples.)*
- [ ] Apenas clientes que estão negociando pela FYMOOB
- [ ] Qualquer pessoa que precisar (público aberto)

---

### SEÇÃO 4: Propostas Digitais (Compra e Locação)

**17. Quem vai preencher o formulário da proposta?**
*(Se for o corretor, precisa de uma área com login. Se for público, qualquer pessoa acessa.)*

- [ ] **(A) O corretor** — Apenas os corretores da FYMOOB acessam, com login e senha. O corretor preenche os dados do cliente e do imóvel, gera o documento e envia. Mais seguro, mas precisa criar uma área restrita.
- [ ] **(B) Qualquer pessoa** — O formulário é público. Qualquer cliente pode preencher e enviar uma proposta. Mais simples, mas sem controle de quem está usando.
- [ ] **(C) Formulário público com código do corretor** — Qualquer pessoa acessa, mas tem um campo para informar o código do corretor responsável. Assim dá para rastrear quem gerou cada proposta.

**18. O que acontece quando a proposta é preenchida?**
*(As opções vão da mais simples à mais sofisticada.)*

- [ ] **(A) Gera um PDF e envia por email** — O site monta um documento PDF bonito com a marca FYMOOB e envia automaticamente por email para o cliente. O cliente lê e responde por email ou WhatsApp. Mais simples.
- [ ] **(B) PDF + link de aceite** — Além do PDF, o cliente recebe um link exclusivo onde ele pode clicar "Aceito esta proposta" ou "Recuso". O sistema registra a resposta com data, hora e IP. Mais organizado.
- [ ] **(C) PDF + assinatura digital com validade jurídica** — O cliente assina digitalmente o documento usando uma plataforma como Clicksign ou D4Sign. Tem validade jurídica como contrato. A FYMOOB pagaria uma assinatura mensal da plataforma (R$ 49-349/mês dependendo do volume).

**19. A FYMOOB já tem um modelo de proposta que usa hoje?**
*(Se já tiver um documento Word ou PDF que usam, podemos replicar no formato digital.)*
- [ ] Sim, usamos o modelo padrão do CRECI-PR
- [ ] Sim, temos um modelo próprio da FYMOOB (enviar o arquivo para replicarmos)
- [ ] Não temos — precisa criar um modelo do zero

**20. Para propostas de LOCAÇÃO: quais garantias a FYMOOB aceita?**
*(Marque todas que se aplicam. Isso define os campos do formulário.)*
- [ ] Fiador
- [ ] Caução (depósito)
- [ ] Seguro-fiança
- [ ] Título de capitalização
- [ ] CredPago / garantia digital
- [ ] Outras: _______________

**21. Qual o prazo padrão de contrato de locação?**
- [ ] 12 meses
- [ ] 30 meses
- [ ] 36 meses
- [ ] Outro: ___

**22. Quantas propostas a FYMOOB gera por mês aproximadamente?**
*(Isso ajuda a definir o plano de assinatura digital, caso escolha a opção C na pergunta 18.)*
- [ ] Até 10 por mês
- [ ] Entre 10 e 30 por mês
- [ ] Mais de 30 por mês

**23. Quer que as propostas fiquem salvas no sistema para consulta futura?**
*(Útil para o corretor buscar propostas antigas por código do imóvel ou nome do cliente.)*
- [ ] Não precisa — gera, envia e pronto
- [ ] Sim — quero poder buscar e consultar propostas antigas

**24. Como o corretor fica sabendo quando o cliente responde a proposta?**
- [ ] Por email automático (sem custo extra)
- [ ] Por WhatsApp automático (requer API WhatsApp Business, custo R$ 100-300/mês)
- [ ] Não precisa de notificação — o corretor acompanha manualmente

---

### SEÇÃO 5: Análise de Crédito para Locação

**25. Como funciona a análise de crédito hoje na FYMOOB?**
*(Isso define o quanto automatizar.)*

- [ ] **(A) Só um formulário** — O interessado em alugar preenche seus dados no site (nome, CPF, renda, empregador). Esses dados vão para o CRM e o corretor faz a análise manualmente, como faz hoje. O site só organiza a coleta. Rápido de implementar.
- [ ] **(B) Formulário + consulta automática** — Tudo da opção A, mas o site também consulta automaticamente o CPF do interessado no Serasa ou SPC para verificar se tem restrições. Cada consulta custa entre R$ 7 e R$ 35. A FYMOOB precisa ter contrato com o Serasa ou SPC.

**26. Quais informações precisa coletar do interessado?**
- [ ] Básico: nome completo, CPF, renda mensal, telefone e email
- [ ] Completo: tudo acima + nome do empregador, tempo de empresa, referências pessoais, e upload de comprovante de renda (holerite/extrato)

**27. Como o resultado da análise é comunicado ao interessado?**
- [ ] O corretor entra em contato por WhatsApp ou telefone (manual, como faz hoje)
- [ ] O site envia um email automático com o resultado (aprovado / em análise / não aprovado)

**28. A FYMOOB já tem contrato com algum bureau de crédito?**
*(Só relevante se escolheu a opção B na pergunta 25.)*
- [ ] Sim — com qual? _______________
- [ ] Não — precisaria contratar (demora 2-4 semanas, precisa do CNPJ da empresa)

**29. Vai cobrar do interessado pela análise de crédito?**
- [ ] Não — é gratuito, faz parte do processo normal de locação
- [ ] Sim — cobra uma taxa de R$ ___ para cobrir o custo da consulta

---

### SEÇÃO 6: Anuncie para Locação

**30. Como quer apresentar a captação de imóveis para locação no site?**
- [ ] Uma página separada só para locação, com textos e benefícios diferentes da página de venda que já existe
- [ ] Um botão de alternância ("Quero vender" / "Quero alugar") na página que já existe — o conteúdo muda conforme a escolha

**31. O processo de captação para locação é diferente do de venda na FYMOOB?**
*(Ex: a vistoria é diferente? Os documentos exigidos do proprietário são outros? O comissionamento muda?)*
- [ ] Sim — as diferenças são: _______________
- [ ] Não — o processo é o mesmo, só mudam os textos

**32. Quais benefícios quer destacar para quem quer alugar pela FYMOOB?**
*(Marque todos que se aplicam — esses viram os "cards de benefícios" da página.)*
- [ ] Administração completa do aluguel (cobrança, repasse ao proprietário)
- [ ] Vistoria de entrada e saída incluída
- [ ] Garantia de recebimento do aluguel
- [ ] Assessoria jurídica para contratos
- [ ] Divulgação em portais (ZAP, OLX, etc.)
- [ ] Fotos profissionais do imóvel
- [ ] Outros: _______________

---

### SEÇÃO 7: Página Hub de Serviços

**33. Como quer que os serviços apareçam no menu do site?**
*(O botão "Anunciar" que existe hoje no menu seria substituído.)*

- [ ] **(A) Link simples** — O menu mostra "Serviços" e ao clicar vai para uma página com todos os serviços listados em cards
- [ ] **(B) Menu com prévia** — Ao passar o mouse (ou clicar no celular), aparece um mini-menu mostrando os serviços disponíveis com ícones, sem precisar ir para outra página

---

### SEÇÃO 8: Perguntas Gerais

**34. Se pudesse escolher só 2 ou 3 para começar, quais seriam?**
*(Não dá para construir tudo de uma vez — precisamos priorizar. A sugestão técnica é: Hub + Calculadora + Laudo, por terem o maior impacto com o menor risco.)*
- [ ] Hub de Serviços (a "vitrine" que organiza tudo)
- [ ] Calculadora de Avaliação de Imóvel
- [ ] Laudo de Avaliação Presencial
- [ ] Pack de Certidões
- [ ] Proposta de Compra Online
- [ ] Proposta de Locação Online
- [ ] Análise de Crédito
- [ ] Anuncie para Locação

**35. Esses serviços são só para clientes da FYMOOB ou para qualquer pessoa que entrar no site?**
*(Se for público, atrai mais gente e gera mais receita. Se for só para clientes, é mais simples.)*
- [ ] Só para clientes que já estão negociando com a FYMOOB
- [ ] Para qualquer pessoa — o site vira uma plataforma de serviços imobiliários aberta
- [ ] Depende do serviço (especificar nas seções acima)

**36. Quem vai escrever os textos das novas páginas?**
*(Cada página de serviço precisa de textos explicando o que é, como funciona, benefícios e preços.)*
- [ ] Nós escrevemos os textos base e o Bruno revisa antes de publicar
- [ ] O Bruno envia os textos prontos e nós montamos a página
- [ ] Nós escrevemos tudo — Bruno só aprova

**37. Qual o prazo ideal para lançar isso?**
- [ ] Urgente — precisa estar no ar nas próximas 2-3 semanas
- [ ] Normal — pode ser implementado ao longo de 1-2 meses, em fases
- [ ] Sem pressa — só depois que o site principal estiver rodando bem

**38. Tem uma faixa de investimento em mente para essas funcionalidades extras?**
*(Isso ajuda a adequar o escopo ao orçamento. Sem compromisso — é só para direcionar.)*
- [ ] Até R$ 5.000 (implementar só o essencial)
- [ ] Entre R$ 5.000 e R$ 10.000
- [ ] Entre R$ 10.000 e R$ 15.000
- [ ] Prefiro ver o detalhamento antes de definir valor

---

## 3. Tabela de Precificação

> Valores pesquisados e fundamentados com dados de mercado (abril/2026).

| # | Funcionalidade | Esforço | Impacto para o cliente | Valor de mercado (ref.) | Nosso preço | Status |
|---|---------------|---------|----------------------|------------------------|------------|--------|
| 1.1 | Calculadora de Imóvel | 3-5 dias | **SEO altíssimo** — atrai tráfego, gera leads, nenhum concorrente local tem | R$ 15.000-30.000 (produto) | A definir | Pendente |
| 1.2 | Laudo de Avaliação | 0.5 dia | Gera leads para serviço de R$ 800-2.000/laudo | R$ 500-1.500 (página) | A definir | Pendente |
| 1.3 | Pack de Certidões | 2-3 dias | **Receita recorrente** — 10 packs/mês = R$ 12K receita, margem ~50% | R$ 3.000-8.000 (e-commerce) | A definir | Pendente |
| 1.4 | Proposta Compra Online | 2-3 dias | Reduz ciclo de fechamento de dias para horas | R$ 3.000-8.000 (módulo) | A definir | Pendente |
| 1.5 | Anuncie Venda | 0 dias | Já implementado — reposicionar | — | Incluído | Pronto ✅ |
| 1.6 | Proposta Locação Online | 1-2 dias | Mesmo da compra, adaptado para locação | R$ 1.500-3.000 (módulo) | A definir | Pendente |
| 1.7 | Análise de Crédito | 2-3 dias | Organiza coleta de dados, elimina WhatsApp | R$ 2.000-5.000 (módulo) | A definir | Pendente |
| 1.8 | Anuncie Locação | 0.5 dia | Captura segmento locação, keyword dedicada | R$ 500-1.000 (página) | A definir | Pendente |
| 1.9 | Hub Serviços | 1 dia | Base que viabiliza todos os serviços | R$ 1.000-2.000 (página) | A definir | Pendente |
| | **TOTAL** | **12-18 dias** | | **R$ 26.500-58.500** | **A definir** | |

---

## 3.1 Fundamentação de Mercado (Pesquisa abril/2026)

> Dados cruzados de 3 pesquisas independentes para validar os valores acima.

### Calculadoras de Avaliação — Referências

| Plataforma | O que faz | Modelo | Investimento da empresa |
|-----------|----------|--------|------------------------|
| **QuintoAndar QPreço** | IA de precificação, margem de erro ~7%, dados IPTU/ITBI | Gratuito para captar vendedores | US$ 700M+ captados no total |
| **ZAP/DataZAP** | AVM pioneiro no Brasil, 10+ anos, 300+ cidades, 6.5M listagens | API paga para bancos e incorporadoras | Grupo OLX pagou R$ 2.9 bilhões pela aquisição |
| **Loft Calculadora** | Treinou em 10M+ listagens, avaliou 500.000+ imóveis | Add-on pago no Vista CRM (R$ 49-499/mês) | US$ 800M+ captados no total |
| **Apto.vc** | Avaliação por critérios técnicos e comparativos | Gratuito | — |

**Dados de mercado relevantes:**
- 84% dos brasileiros dizem ter dificuldade em encontrar dados precisos de preço de imóveis (Datafolha/QuintoAndar)
- 66% já desistiram de negócio imobiliário por incerteza de preço
- Segmento de AVM (Automated Valuation Model) cresceu **85% em 2024** no Brasil
- Apenas **19% das imobiliárias brasileiras usam IA** — potencial de crescimento enorme
- AVMs reduzem custo de avaliação em até 70% e tempo em 90%+ (KPMG, 2024)
- Investimento combinado só de QuintoAndar + Loft + ZAP: **mais de R$ 10 bilhões**

**Situação em Curitiba (verificado):**

| Imobiliária local | Tem calculadora? | Detalhe |
|------------------|-----------------|---------|
| **Apolar** (100+ lojas) | SIM (básica) | `calcule.apolar.com.br` — híbrido lead capture + estimativa simples |
| **Razzi** (alto padrão) | NÃO | Só tem simulador de financiamento |
| **JBA** (200+ funcionários) | NÃO | Direciona para avaliação presencial |
| **Galvão** | NÃO | Nenhuma ferramenta online |
| **HAUS** | NÃO | Nenhuma ferramenta online |
| **Gonzaga** | NÃO | Nenhuma ferramenta online |
| **FYMOOB** | NÃO (ainda) | — |

**Importante:** A Loft Calculadora **não está disponível em Curitiba** — só cobre SP, RJ, POA e BH. Isso significa que Curitiba tem uma **lacuna real** de ferramentas sofisticadas de avaliação. A FYMOOB seria a primeira imobiliária de médio porte em Curitiba com uma calculadora própria.

**Sobre o valor de R$ 15.000-30.000 como produto:**
O mercado real é baseado em **assinatura mensal**, não venda única. A Loft cobra de R$ 49 a R$ 499/mês pelo add-on de calculadora no Vista CRM. Para uma agência no plano Suite, isso representa ~R$ 6.000/ano só pelo módulo de calculadora. O valor de R$ 15-30K se justifica como **custo de desenvolvimento customizado** — é o que software houses brasileiras cobram para construir uma ferramenta similar sob demanda, ou o custo acumulado de 2-5 anos de assinatura de módulos pagos em CRMs premium.

**Conclusão:** A calculadora é o item de maior impacto estratégico. Todas as grandes plataformas investiram bilhões em ferramentas similares. Em Curitiba, apenas a Apolar (100+ lojas) tem algo básico. A FYMOOB seria pioneira entre imobiliárias de médio porte na cidade.

### CRMs Imobiliários — Preços Mensais Verificados

| Plataforma | Preço mensal | Detalhes |
|-----------|-------------|---------|
| **Tecimob** | R$ 129,90/mês (site+CRM+app) | Add-ons R$ 19,90-24,90/mês cada |
| **Jetimob** | R$ 299-975/mês | 1-10 usuários, 250-5.000 imóveis |
| **Kenlo** (ex-inGaia) | Sob consulta (enterprise) | 8.500+ agências atendidas |
| **Vista/Loft CRM** | R$ 129,90-1.899,90/mês | 1-30 usuários, calculadora add-on R$ 49-499/mês |
| **Imobisoft** | A partir de R$ 199/mês | — |

**Conclusão:** Imobiliárias pagam R$ 130-1.900/mês por CRMs. Um módulo de proposta digital customizado (fora do CRM) custa R$ 3.000-8.000 para desenvolver. Como SaaS independente, R$ 99-199/mês por imobiliária é competitivo — abaixo do Jetimob (R$ 299+) e Kenlo.

### Certidões — Custos Reais e Preços de Mercado

| Certidão | Custo real (emolumentos PR) |
|----------|---------------------------|
| Certidão de Matrícula Atualizada | R$ 55-75 |
| Certidão Negativa de Ônus Reais | R$ 55-75 (frequentemente bundled) |
| Certidão Negativa Débitos Municipais (IPTU) | Grátis-R$ 30 (muitas prefeituras emitem online) |
| Certidão Quitação Fiscal (Receita Federal) | Grátis (online) |
| Certidão Negativa Débitos Trabalhistas (TST) | Grátis (online) |
| Certidão Distribuidores Cíveis (Justiça Estadual) | R$ 30-60 por comarca |
| Certidão Distribuidores Federais | Grátis-R$ 30 |
| Certidão de Protesto | R$ 30-50 por tabelionato |
| **Kit completo (custo real)** | **R$ 300-700** |

| Serviço | Preço cobrado do cliente |
|---------|------------------------|
| **Certidão Expressa** (kit completo) | R$ 1.197 (3x R$ 399) |
| **Despachantes Curitiba** (média) | R$ 800-1.500 |
| **Documento no Brasil** | R$ 600-1.200 |

**Margem confirmada:** Custo R$ 300-700, venda R$ 800-1.200 = margem bruta de **40-65%**. Com 10 vendas/mês a R$ 1.200 = R$ 12.000 receita, ~R$ 6.000 lucro bruto.

### Laudos de Avaliação — Preços de Mercado

| Tipo de laudo | Preço em Curitiba |
|--------------|------------------|
| Avaliação simples (particular, compra/venda) | R$ 800-1.500 |
| Avaliação para financiamento bancário | R$ 750-3.500 (frequentemente no custo do financiamento) |
| Laudo judicial (ABNT NBR 14653, perícia) | R$ 2.000-5.000+ |

**Conclusão:** O valor citado de R$ 800-2.000 está correto para laudos simples. Para judicial, pode passar de R$ 5.000.

### Análise de Crédito — Modelo Real do Mercado

| Plataforma | Quem paga | Modelo |
|-----------|----------|--------|
| **CredPago** (Loft) | **Inquilino** paga 7-12% do aluguel mensal | Imobiliária não paga mensalidade |
| **Avalyst** | **Inquilino** paga taxa | Imobiliária não paga mensalidade |
| **Porto Seguro Aluguel** | **Inquilino** paga 1-2x aluguel/ano | Imobiliária ganha comissão 20-30% |

**Consultas avulsas (bureau de crédito):**

| Bureau | Custo por consulta |
|--------|-------------------|
| **Serasa Experian** (score + relatório) | R$ 7-35 por CPF |
| **SPC Brasil** | R$ 8-25 por CPF |
| **Boa Vista SCPC** | R$ 10-20 por CPF |

**Correção importante:** Plataformas como CredPago e Avalyst cobram do **inquilino**, não da imobiliária. O custo mensal para a imobiliária é baixo ou zero. A receita para a FYMOOB viria de consultas avulsas (R$ 15-30/CPF) ou comissão sobre seguro-fiança.

### Assinatura Digital — Preços

| Plataforma | Plano básico | Plano empresarial |
|-----------|-------------|-------------------|
| **Clicksign** | R$ 69/mês (5 docs) | R$ 169-349/mês (20-50 docs) |
| **D4Sign** | R$ 49/mês | R$ 99-349/mês |
| **ZapSign** | Grátis (limitado) | R$ 49+/mês |
| **DocuSign** | R$ 100-200/mês | R$ 400+/mês |

**Relevância:** Propostas digitais com assinatura custam R$ 100-350/mês de plataforma. Isso é custo operacional da FYMOOB, não do desenvolvimento.

### Gasto mensal típico de uma imobiliária com tecnologia

| Ferramenta | Custo mensal |
|-----------|-------------|
| CRM + Site (Tecimob/Jetimob/Kenlo) | R$ 200-500 |
| Portais (ZAP, OLX, VivaReal) | R$ 500-5.000+ |
| Assinatura digital | R$ 100-350 |
| Análise crédito / seguro-fiança | R$ 0-200 |
| WhatsApp Business API | R$ 100-300 |
| Google Workspace | R$ 50-150 |
| **Total** | **R$ 1.000-6.500/mês** |

**Conclusão:** Imobiliárias de pequeno/médio porte já gastam R$ 1.000-6.500/mês com tecnologia. O investimento em funcionalidades adicionais se paga rapidamente se gerar leads e receita de serviços.

---

## 4. Tasks de Implementação

> Criar após aprovação e definição de escopo. Organizado por fases de entrega.

### Fase A — Hub + Calculadora + Laudo (prioridade máxima)

#### A.1 — Hub de Serviços
- [ ] Criar página `/servicos/page.tsx` com layout de cards por categoria
- [ ] Atualizar header: "Anunciar" → "Serviços" com link para `/servicos`
- [ ] SEO: `generateMetadata()`, breadcrumbs, JSON-LD
- [ ] Mobile: layout responsivo com cards empilhados
- [ ] Desktop: grid 2-3 colunas por seção

#### A.2 — Calculadora de Avaliação de Imóvel
- [ ] Criar página `/avaliar-imovel/page.tsx` (ou `/calculadora`)
- [ ] Formulário step-by-step: tipo → bairro → área → quartos → vagas → características
- [ ] Backend: criar endpoint `/api/avaliar` que agrega dados do CRM (média m² por bairro+tipo)
- [ ] Lógica de cálculo: filtrar imóveis similares → calcular percentil 25-75 do m² → multiplicar pela área informada
- [ ] Tela de resultado: faixa de preço estimada + gráfico comparativo + imóveis similares
- [ ] Lead capture: formulário nome+email+telefone para "receber relatório completo"
- [ ] POST lead para CRM com `interesse: "Calculadora - Avaliação"` e `veiculo: "Site FYMOOB"`
- [ ] SEO: title "Calculadora de Imóvel Curitiba — Descubra Quanto Vale", meta description, FAQ schema
- [ ] Opcional (v2): integrar Claude API para análise descritiva personalizada
- [ ] Testes: verificar cálculo com imóveis conhecidos, Lighthouse mobile >80

#### A.3 — Laudo de Avaliação Presencial
- [ ] Criar página `/servicos/avaliacao/page.tsx`
- [ ] Conteúdo: o que é o laudo, quando é necessário, o que inclui, CRECI
- [ ] Formulário: nome, email, telefone, endereço do imóvel, tipo, área estimada, finalidade
- [ ] POST lead para CRM com `interesse: "Laudo de Avaliação"`
- [ ] SEO: title, meta, breadcrumbs

### Fase B — Pack de Certidões + Anuncie Locação

#### B.1 — Pack de Certidões
- [ ] Criar página `/servicos/certidoes/page.tsx`
- [ ] Listar certidões incluídas em cada pacote (definir com Bruno)
- [ ] Tabela de preços e prazos
- [ ] Formulário de solicitação: dados do comprador/vendedor + dados do imóvel (matrícula, endereço)
- [ ] Integração pagamento (se aprovado): Stripe ou Mercado Pago ou Pix manual
- [ ] POST lead para CRM com `interesse: "Pack Certidões"`
- [ ] SEO: "certidões para compra de imóvel curitiba" — keyword de alta intenção

#### B.2 — Anuncie para Locação
- [ ] Criar página `/servicos/anuncie-locacao/page.tsx` (ou variação do `/anuncie`)
- [ ] Adaptar textos e benefícios para proprietários de imóvel para locação
- [ ] Formulário com campos específicos de locação (valor desejado, tipo de garantia aceita)
- [ ] POST lead para CRM com `interesse: "Anúncio Locação"`

### Fase C — Propostas Online + Análise de Crédito

#### C.1 — Proposta de Compra Online
- [ ] Criar página `/servicos/proposta-compra/page.tsx` (ou área restrita)
- [ ] Formulário completo: dados comprador, dados imóvel, valor, condições, prazo
- [ ] Gerar PDF profissional com identidade FYMOOB (usando @react-pdf/renderer ou similar)
- [ ] Enviar PDF por email ao cliente (integrar serviço de email: Resend, SendGrid ou Nhost)
- [ ] Armazenar proposta no banco (Nhost/Hasura)
- [ ] Página de aceite: link único para cliente visualizar e aceitar/recusar

#### C.2 — Proposta de Locação Online
- [ ] Mesma estrutura da C.1 com campos de locação
- [ ] Campos: prazo, garantia, fiador/caução/seguro, valor aluguel, data entrada
- [ ] PDF e email com layout FYMOOB

#### C.3 — Análise de Crédito
- [ ] Criar página `/servicos/analise-credito/page.tsx`
- [ ] Formulário: dados pessoais, CPF, renda, empregador, tempo de empresa, referências
- [ ] POST lead para CRM com `interesse: "Análise de Crédito"`
- [ ] Aviso ao cliente: "Seus dados estão seguros. Resultado em até X horas úteis."
- [ ] Futuro (v2): integrar API de consulta (Serasa/Boa Vista)

---

## 5. Cronograma Sugerido

| Fase | Funcionalidades | Prazo estimado | Pré-requisito |
|------|----------------|---------------|--------------|
| A | Hub + Calculadora + Laudo | 5-7 dias | Aprovação + respostas das perguntas |
| B | Certidões + Anuncie Locação | 3-4 dias | Fase A concluída + definição de pacotes |
| C | Propostas + Crédito | 5-7 dias | Fase B concluída + modelo de proposta |
| | **Total** | **13-18 dias** | |

---

## 6. Observações

- A **Calculadora** é o item de maior impacto para SEO e tráfego — recomendamos priorizar
- O **Pack de Certidões** é o item de maior impacto para receita — serviço pago com demanda real
- As **Propostas Online** são o item de maior impacto para operação — moderniza o dia a dia
- Todas as páginas seguirão o padrão SEO do projeto: `generateMetadata()`, JSON-LD, breadcrumbs, sitemap
- Todos os formulários enviarão leads ao CRM Loft existente (mesma integração)
- Nenhuma funcionalidade altera ou exclui dados no CRM (regra absoluta mantida)

---

_Documento criado em 10/04/2026. Pendente de aprovação do cliente._
