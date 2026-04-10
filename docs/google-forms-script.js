/**
 * FYMOOB — Script para criar Google Forms automaticamente
 *
 * Como usar:
 * 1. Acesse https://script.google.com
 * 2. Clique em "Novo projeto"
 * 3. Apague o conteudo padrao e cole este script inteiro
 * 4. Clique em "Executar" (botao play)
 * 5. Autorize o acesso quando solicitado
 * 6. O formulario aparece no seu Google Drive com o nome "FYMOOB — Portal de Servicos"
 * 7. Copie o link e envie para o Bruno
 */

function criarFormularioFYMOOB() {
  var form = FormApp.create("FYMOOB — Portal de Servicos — Definicao de Escopo")
  form.setDescription(
    "Oi Bruno! Este formulario define como cada funcionalidade do novo portal de servicos vai funcionar.\n\n" +
    "Suas respostas vao determinar o escopo, custo e prazo de cada item.\n" +
    "Leve o tempo que precisar — nao tem resposta errada.\n\n" +
    "Tempo estimado: 10-15 minutos."
  )
  form.setConfirmationMessage("Obrigado Bruno! Suas respostas foram registradas. Vamos analisar e retornar com a proposta detalhada.")
  form.setAllowResponseEdits(true)
  form.setLimitOneResponsePerUser(false)

  // =====================================================================
  // SECAO 1: Calculadora de Avaliacao de Imovel
  // =====================================================================
  form.addPageBreakItem()
    .setTitle("Calculadora de Avaliacao de Imovel")
    .setHelpText("A calculadora e uma ferramenta onde o visitante do site informa dados do imovel (bairro, tipo, metragem) e recebe uma estimativa de valor de mercado. Serve para atrair visitantes ao site e captar leads de pessoas que querem vender.")

  form.addMultipleChoiceItem()
    .setTitle("1. Qual o nivel de detalhe que a calculadora deve ter?")
    .setHelpText("A opcao define quantos dias leva para construir e quanto custa.")
    .setChoiceValues([
      "(A) Basica — Visitante informa bairro, tipo e metragem. Site mostra faixa de preco estimada na hora. Simples e rapido.",
      "(B) Intermediaria — Tudo da A + leva em conta quartos, vagas e diferenciais (piscina, churrasqueira). Mostra imoveis parecidos do portfolio FYMOOB.",
      "(C) Avancada com IA — Tudo da B + inteligencia artificial escreve texto personalizado explicando a avaliacao. Envia relatorio por email. Mais impressionante, mas leva mais tempo."
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("2. O visitante precisa se cadastrar para ver o resultado?")
    .setHelpText("Isso define se a calculadora gera leads (contatos) automaticamente ou nao.")
    .setChoiceValues([
      "(A) Nao precisa — Mostra resultado na hora. No final aparece convite opcional para deixar dados. Menos leads, mais gente usa.",
      "(B) Precisa se cadastrar antes — Pede nome, email e telefone ANTES de mostrar resultado. Mais leads, mas muita gente desiste.",
      "(C) Meio-termo — Mostra previa generica na hora. Para ver relatorio detalhado, ai pede os dados. Equilibrio entre leads e usabilidade."
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("3. A calculadora deve cobrir quais regioes?")
    .setChoiceValues([
      "Apenas Curitiba",
      "Curitiba + cidades proximas (Sao Jose dos Pinhais, Colombo, Pinhais, etc.)"
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("4. Depois da estimativa, quer que o site sugira imoveis parecidos do portfolio FYMOOB?")
    .setHelpText("Ex: 'Imoveis similares disponiveis na FYMOOB' com cards de imoveis. Faz o visitante navegar mais no site e pode virar uma venda.")
    .setChoiceValues([
      "Sim, mostrar imoveis parecidos",
      "Nao, so mostrar o resultado da avaliacao"
    ])
    .setRequired(true)

  // =====================================================================
  // SECAO 2: Laudo de Avaliacao Presencial
  // =====================================================================
  form.addPageBreakItem()
    .setTitle("Laudo de Avaliacao Presencial")
    .setHelpText("Pagina no site explicando o servico de avaliacao fisica (visita ao imovel, fotos, laudo tecnico) com formulario para o cliente solicitar.")

  form.addMultipleChoiceItem()
    .setTitle("5. Como o preco do laudo deve aparecer na pagina?")
    .setHelpText("Se mostrar o preco, o cliente ja sabe quanto custa antes de pedir. Se nao mostrar, o corretor negocia caso a caso.")
    .setChoiceValues([
      "Mostrar preco fixo (ex: 'A partir de R$ 800')",
      "Mostrar faixas por tipo (ex: 'Simples R$ 800-1.500 / Judicial R$ 2.000-5.000')",
      "Nao mostrar preco — apenas 'Solicite um orcamento' com formulario"
    ])
    .setRequired(true)

  form.addCheckboxItem()
    .setTitle("6. Quais tipos de laudo a FYMOOB oferece?")
    .setHelpText("Marque todos que se aplicam.")
    .setChoiceValues([
      "Avaliacao simples — para compra e venda particular, sem valor judicial",
      "Avaliacao judicial — laudo tecnico com norma ABNT, aceito em processos",
      "Avaliacao para financiamento bancario — exigida por Caixa, Itau, Bradesco etc."
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("7. Quando o cliente solicitar um laudo pelo site, o que acontece?")
    .setChoiceValues([
      "Os dados vao para o CRM e o corretor entra em contato por WhatsApp ou telefone",
      "O site abre o WhatsApp direto com mensagem pronta"
    ])
    .setRequired(true)

  form.addTextItem()
    .setTitle("8. Nome do responsavel tecnico pelos laudos")
    .setHelpText("O nome e registro profissional aparece na pagina — passa credibilidade para o Google e para o cliente. Se usam terceirizados, escreva 'terceirizado'.")
    .setRequired(false)

  form.addTextItem()
    .setTitle("8b. Registro profissional (CREA ou CAU)")
    .setHelpText("Numero do registro do engenheiro ou arquiteto responsavel. Deixe em branco se usam terceirizados.")
    .setRequired(false)

  // =====================================================================
  // SECAO 3: Pack de Certidoes
  // =====================================================================
  form.addPageBreakItem()
    .setTitle("Pack de Certidoes")
    .setHelpText("Servico pago onde a FYMOOB providencia toda a documentacao necessaria para compra/venda de imovel. O cliente paga um valor fechado e recebe as certidoes prontas.")

  form.addMultipleChoiceItem()
    .setTitle("9. Como o cliente vai pagar pelo servico?")
    .setHelpText("Pagamento online e mais profissional mas custa mais para implementar.")
    .setChoiceValues([
      "(A) Pix manual — Site mostra formulario + instrucoes de Pix. Bruno confirma pagamento manualmente.",
      "(B) Pagamento online — Cliente paga direto no site com cartao ou Pix automatico. Confirmacao na hora, sem acao manual."
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("10. Quantos pacotes de certidoes quer oferecer?")
    .setChoiceValues([
      "Pacote unico — kit completo com todas as certidoes, preco fechado",
      "2 opcoes — basico (certidoes principais) e completo (todas)",
      "3 opcoes — basico, completo e premium (com analise juridica inclusa)"
    ])
    .setRequired(true)

  form.addCheckboxItem()
    .setTitle("11. Quais certidoes a FYMOOB vai providenciar?")
    .setHelpText("Marque todas que se aplicam. Isso define o conteudo de cada pacote.")
    .setChoiceValues([
      "Certidao de Matricula Atualizada (Registro de Imoveis)",
      "Certidao Negativa de Onus Reais",
      "Certidao Negativa de Debitos Municipais / IPTU",
      "Certidao de Quitacao Fiscal (Receita Federal)",
      "Certidao Negativa de Debitos Trabalhistas",
      "Certidao dos Distribuidores Civeis (Justica Estadual)",
      "Certidao dos Distribuidores Federais (Justica Federal)",
      "Certidao de Protesto",
      "Certidao Negativa de Debitos Condominiais"
    ])
    .setRequired(true)

  form.addTextItem()
    .setTitle("11b. Outras certidoes nao listadas acima?")
    .setHelpText("Se a FYMOOB oferece alguma certidao que nao aparece na lista, escreva aqui.")
    .setRequired(false)

  form.addMultipleChoiceItem()
    .setTitle("12. Quem vai solicitar as certidoes nos orgaos?")
    .setChoiceValues([
      "A propria FYMOOB solicita diretamente",
      "A FYMOOB terceiriza para um despachante parceiro"
    ])
    .setRequired(true)

  form.addTextItem()
    .setTitle("13. Qual o prazo de entrega das certidoes ao cliente? (em dias uteis)")
    .setHelpText("Ex: 5, 7, 10")
    .setRequired(true)

  form.addTextItem()
    .setTitle("14. Quanto pretende cobrar pelo pacote? (em reais)")
    .setHelpText("Se tiver mais de um pacote, separe com barra. Ex: 'Basico R$ 600 / Completo R$ 1.200' ou 'R$ 1.000 unico'")
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("15. Como o cliente acompanha o andamento do pedido?")
    .setChoiceValues([
      "(A) Sem acompanhamento online — FYMOOB avisa por email/WhatsApp quando pronto",
      "(B) WhatsApp — Corretor atualiza o cliente manualmente por mensagem",
      "(C) Painel no site — Cliente entra com login e ve o status em tempo real (como rastrear encomenda)"
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("16. Quem pode comprar o pack de certidoes?")
    .setHelpText("Abrir para o publico geral gera mais receita e traz visitantes para o site.")
    .setChoiceValues([
      "Apenas clientes que estao negociando pela FYMOOB",
      "Qualquer pessoa que precisar (publico aberto)"
    ])
    .setRequired(true)

  // =====================================================================
  // SECAO 4: Propostas Digitais
  // =====================================================================
  form.addPageBreakItem()
    .setTitle("Propostas Digitais (Compra e Locacao)")
    .setHelpText("Formulario digital que gera um documento de proposta profissional com a marca FYMOOB e envia por email ao cliente para aceite.")

  form.addMultipleChoiceItem()
    .setTitle("17. Quem vai preencher o formulario da proposta?")
    .setHelpText("Se for o corretor, precisa criar uma area com login no site. Se for publico, qualquer pessoa acessa.")
    .setChoiceValues([
      "(A) O corretor — Area restrita com login. Mais seguro, mas mais complexo.",
      "(B) Qualquer pessoa — Formulario publico. Mais simples, sem controle de acesso.",
      "(C) Formulario publico com codigo do corretor — Qualquer pessoa acessa, mas informa o codigo do corretor para rastreamento."
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("18. O que acontece quando a proposta e preenchida?")
    .setHelpText("As opcoes vao da mais simples a mais sofisticada. A opcao C tem custo mensal de plataforma de assinatura (R$ 49-349/mes).")
    .setChoiceValues([
      "(A) Gera PDF e envia por email — Documento bonito com marca FYMOOB. Cliente responde por email/WhatsApp.",
      "(B) PDF + link de aceite — Cliente recebe link exclusivo para clicar 'Aceito' ou 'Recuso'. Sistema registra a resposta.",
      "(C) PDF + assinatura digital — Cliente assina digitalmente com validade juridica (Clicksign ou D4Sign). Custo mensal R$ 49-349."
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("19. A FYMOOB ja tem um modelo de proposta que usa hoje?")
    .setHelpText("Se ja tiver um documento Word ou PDF que usam no dia a dia, podemos replicar no formato digital.")
    .setChoiceValues([
      "Sim, usamos o modelo padrao do CRECI-PR",
      "Sim, temos modelo proprio da FYMOOB (vou enviar o arquivo)",
      "Nao temos — precisa criar um modelo do zero"
    ])
    .setRequired(true)

  form.addCheckboxItem()
    .setTitle("20. Para propostas de LOCACAO: quais garantias a FYMOOB aceita?")
    .setHelpText("Marque todas que se aplicam. Isso define os campos que aparecem no formulario de proposta de locacao.")
    .setChoiceValues([
      "Fiador",
      "Caucao (deposito)",
      "Seguro-fianca",
      "Titulo de capitalizacao",
      "CredPago / garantia digital"
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("21. Qual o prazo padrao de contrato de locacao?")
    .setChoiceValues([
      "12 meses",
      "30 meses",
      "36 meses",
      "Outro (especificar na proxima pergunta)"
    ])
    .setRequired(true)

  form.addTextItem()
    .setTitle("21b. Se escolheu 'Outro' na pergunta anterior, qual o prazo?")
    .setRequired(false)

  form.addMultipleChoiceItem()
    .setTitle("22. Quantas propostas a FYMOOB gera por mes aproximadamente?")
    .setHelpText("Isso ajuda a definir o plano de assinatura digital, caso escolha a opcao C na pergunta 18.")
    .setChoiceValues([
      "Ate 10 por mes",
      "Entre 10 e 30 por mes",
      "Mais de 30 por mes"
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("23. Quer que as propostas fiquem salvas no sistema para consulta futura?")
    .setHelpText("Util para o corretor buscar propostas antigas por codigo do imovel ou nome do cliente.")
    .setChoiceValues([
      "Nao precisa — gera, envia e pronto",
      "Sim — quero poder buscar e consultar propostas antigas"
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("24. Como o corretor fica sabendo quando o cliente responde a proposta?")
    .setChoiceValues([
      "Por email automatico (sem custo extra)",
      "Por WhatsApp automatico (requer API WhatsApp Business, custo R$ 100-300/mes)",
      "Nao precisa de notificacao — corretor acompanha manualmente"
    ])
    .setRequired(true)

  // =====================================================================
  // SECAO 5: Analise de Credito
  // =====================================================================
  form.addPageBreakItem()
    .setTitle("Analise de Credito para Locacao")
    .setHelpText("Formulario onde o interessado em alugar preenche seus dados pessoais e financeiros para a FYMOOB avaliar se ele tem condicoes de alugar o imovel.")

  form.addMultipleChoiceItem()
    .setTitle("25. Como funciona a analise de credito hoje na FYMOOB?")
    .setChoiceValues([
      "(A) So formulario — Interessado preenche dados no site. Dados vao pro CRM. Corretor analisa manualmente como faz hoje.",
      "(B) Formulario + consulta automatica — Tudo da A + site consulta CPF no Serasa/SPC automaticamente. Custo R$ 7-35 por consulta. Precisa ter contrato com Serasa ou SPC."
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("26. Quais informacoes precisa coletar do interessado?")
    .setChoiceValues([
      "Basico: nome, CPF, renda mensal, telefone e email",
      "Completo: tudo acima + empregador, tempo de empresa, referencias pessoais, e upload de comprovante de renda"
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("27. Como o resultado da analise e comunicado ao interessado?")
    .setChoiceValues([
      "Corretor entra em contato por WhatsApp ou telefone (manual)",
      "Site envia email automatico com resultado (aprovado / em analise / nao aprovado)"
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("28. A FYMOOB ja tem contrato com Serasa ou SPC?")
    .setHelpText("So relevante se escolheu a opcao B na pergunta 25. Se nao tem, o processo de contratacao demora 2-4 semanas.")
    .setChoiceValues([
      "Sim",
      "Nao — precisaria contratar",
      "Nao sei"
    ])
    .setRequired(true)

  form.addTextItem()
    .setTitle("28b. Se respondeu 'Sim', qual bureau? (Serasa, SPC, Boa Vista)")
    .setRequired(false)

  form.addMultipleChoiceItem()
    .setTitle("29. Vai cobrar do interessado pela analise de credito?")
    .setChoiceValues([
      "Nao — e gratuito, faz parte do processo normal de locacao",
      "Sim — cobra uma taxa para cobrir o custo da consulta"
    ])
    .setRequired(true)

  form.addTextItem()
    .setTitle("29b. Se vai cobrar, qual o valor? (em reais)")
    .setHelpText("O custo real da consulta para a FYMOOB fica entre R$ 7 e R$ 35 por CPF.")
    .setRequired(false)

  // =====================================================================
  // SECAO 6: Anuncie para Locacao
  // =====================================================================
  form.addPageBreakItem()
    .setTitle("Anuncie para Locacao")
    .setHelpText("O site ja tem uma pagina 'Anuncie seu Imovel' focada em venda. A ideia e criar uma versao para proprietarios que querem colocar imovel para alugar.")

  form.addMultipleChoiceItem()
    .setTitle("30. Como quer apresentar a captacao de imoveis para locacao?")
    .setChoiceValues([
      "Pagina separada so para locacao, com textos e beneficios diferentes",
      "Botao de alternancia na pagina atual ('Quero vender' / 'Quero alugar') — conteudo muda conforme a escolha"
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("31. O processo de captacao para locacao e diferente do de venda?")
    .setHelpText("Ex: a vistoria e diferente? Os documentos exigidos do proprietario sao outros? O comissionamento muda?")
    .setChoiceValues([
      "Sim, tem diferencas",
      "Nao — mesmo processo, so mudam os textos"
    ])
    .setRequired(true)

  form.addParagraphTextItem()
    .setTitle("31b. Se respondeu 'Sim', quais sao as diferencas?")
    .setHelpText("Descreva brevemente o que muda no processo de captacao para locacao comparado com venda.")
    .setRequired(false)

  form.addCheckboxItem()
    .setTitle("32. Quais beneficios quer destacar para quem quer alugar pela FYMOOB?")
    .setHelpText("Esses viram os 'cards de beneficios' na pagina. Marque todos que se aplicam.")
    .setChoiceValues([
      "Administracao completa do aluguel (cobranca, repasse ao proprietario)",
      "Vistoria de entrada e saida incluida",
      "Garantia de recebimento do aluguel",
      "Assessoria juridica para contratos",
      "Divulgacao em portais (ZAP, OLX, etc.)",
      "Fotos profissionais do imovel"
    ])
    .setRequired(true)

  form.addTextItem()
    .setTitle("32b. Outros beneficios nao listados acima?")
    .setRequired(false)

  // =====================================================================
  // SECAO 7: Hub de Servicos
  // =====================================================================
  form.addPageBreakItem()
    .setTitle("Pagina Hub de Servicos")
    .setHelpText("O botao 'Anunciar' que existe hoje no menu do site seria substituido por 'Servicos', levando a uma pagina que organiza todos os servicos em cards.")

  form.addMultipleChoiceItem()
    .setTitle("33. Como quer que os servicos aparecam no menu do site?")
    .setChoiceValues([
      "(A) Link simples — Menu mostra 'Servicos', ao clicar vai para pagina com todos os servicos em cards",
      "(B) Menu com previa — Ao passar o mouse aparece mini-menu com os servicos disponiveis e icones"
    ])
    .setRequired(true)

  // =====================================================================
  // SECAO 8: Perguntas Gerais
  // =====================================================================
  form.addPageBreakItem()
    .setTitle("Perguntas Gerais")
    .setHelpText("Estas perguntas ajudam a definir prioridade, prazo e orcamento para o projeto como um todo.")

  form.addCheckboxItem()
    .setTitle("34. Se pudesse escolher so 2 ou 3 para comecar, quais seriam?")
    .setHelpText("Nao da para construir tudo de uma vez. Sugestao tecnica: Hub + Calculadora + Laudo (maior impacto, menor risco). Marque ate 3.")
    .setChoiceValues([
      "Hub de Servicos (a 'vitrine' que organiza tudo)",
      "Calculadora de Avaliacao de Imovel",
      "Laudo de Avaliacao Presencial",
      "Pack de Certidoes",
      "Proposta de Compra Online",
      "Proposta de Locacao Online",
      "Analise de Credito",
      "Anuncie para Locacao"
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("35. Esses servicos sao so para clientes da FYMOOB ou para qualquer pessoa?")
    .setHelpText("Se for publico, atrai mais gente e gera mais receita. Se for so para clientes, e mais simples.")
    .setChoiceValues([
      "So para clientes que ja estao negociando com a FYMOOB",
      "Para qualquer pessoa — site vira plataforma de servicos aberta",
      "Depende do servico (ja especifiquei nas secoes anteriores)"
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("36. Quem vai escrever os textos das novas paginas?")
    .setHelpText("Cada pagina de servico precisa de textos explicando o que e, como funciona, beneficios e precos.")
    .setChoiceValues([
      "Nos escrevemos os textos base e o Bruno revisa antes de publicar",
      "Bruno envia os textos prontos e nos montamos a pagina",
      "Nos escrevemos tudo — Bruno so aprova"
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("37. Qual o prazo ideal para lancar isso?")
    .setChoiceValues([
      "Urgente — precisa estar no ar nas proximas 2-3 semanas",
      "Normal — pode ser implementado ao longo de 1-2 meses, em fases",
      "Sem pressa — so depois que o site principal estiver rodando bem"
    ])
    .setRequired(true)

  form.addMultipleChoiceItem()
    .setTitle("38. Tem uma faixa de investimento em mente para essas funcionalidades extras?")
    .setHelpText("Sem compromisso — e so para direcionar o escopo ao orcamento. Voce recebera o detalhamento completo antes de aprovar qualquer valor.")
    .setChoiceValues([
      "Ate R$ 5.000 (implementar so o essencial)",
      "Entre R$ 5.000 e R$ 10.000",
      "Entre R$ 10.000 e R$ 15.000",
      "Prefiro ver o detalhamento antes de definir valor"
    ])
    .setRequired(true)

  // =====================================================================
  // FINALIZACAO
  // =====================================================================
  form.addPageBreakItem()
    .setTitle("Comentarios Adicionais")

  form.addParagraphTextItem()
    .setTitle("39. Tem algo mais que gostaria de acrescentar?")
    .setHelpText("Qualquer observacao, ideia ou duvida sobre os servicos. Fique a vontade!")
    .setRequired(false)

  // Log do link do formulario
  Logger.log("Formulario criado com sucesso!")
  Logger.log("Link para editar: " + form.getEditUrl())
  Logger.log("Link para responder: " + form.getPublishedUrl())
  Logger.log("Link para ver respostas: " + form.getSummaryUrl())
}
