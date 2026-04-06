export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  id: string
  title: string
  items: FAQItem[]
}

export const faqData: FAQCategory[] = [
  {
    id: "fymoob",
    title: "Sobre a FYMOOB",
    items: [
      {
        question: "O que é a FYMOOB Imobiliária?",
        answer:
          "A FYMOOB é uma imobiliária em Curitiba com registro CRECI J 9420, especializada em apartamentos, casas e sobrados à venda e para alugar nos melhores bairros da cidade. Oferecemos atendimento personalizado e acompanhamento completo em todas as etapas da negociação.",
      },
      {
        question: "Onde fica a FYMOOB?",
        answer:
          "A FYMOOB está localizada na Rua Engenheiro Heitor Soares Gomes, 778, Esquina — Curitiba/PR, CEP 80330-350. Nosso horário de atendimento é de segunda a sexta, das 8h30 às 17h, e sábados das 9h às 13h.",
      },
      {
        question: "Como entrar em contato com a FYMOOB?",
        answer:
          "Você pode nos contatar pelo WhatsApp (41) 99978-0517, pelo telefone fixo (41) 3265-5051 ou pelo e-mail fymoob@gmail.com. Também é possível agendar uma visita pelo nosso site.",
      },
      {
        question: "A FYMOOB trabalha com aluguel e venda?",
        answer:
          "Sim, trabalhamos tanto com venda quanto com locação de imóveis em Curitiba. Temos apartamentos, casas e sobrados disponíveis para ambas as modalidades.",
      },
    ],
  },
  {
    id: "compra",
    title: "Compra de imóveis",
    items: [
      {
        question: "Quais documentos preciso para comprar um imóvel?",
        answer:
          "Os principais documentos são: RG, CPF, comprovante de renda, comprovante de residência, certidão de estado civil e declaração de Imposto de Renda. Se for financiar, também será necessário extrato do FGTS e carteira de trabalho. Confira nosso guia completo no blog.",
      },
      {
        question: "Quanto custa comprar um imóvel em Curitiba?",
        answer:
          "Os preços variam conforme o bairro, tipo e tamanho do imóvel. Em Curitiba, apartamentos de 2 quartos começam em torno de R$ 250.000, enquanto casas e sobrados partem de R$ 350.000. Bairros como o Portão oferecem excelente custo-benefício.",
      },
      {
        question: "Quais são os custos além do preço do imóvel?",
        answer:
          "Além do valor do imóvel, é preciso considerar: ITBI (2,7% do valor venal em Curitiba), escritura pública (1% a 2%), registro em cartório (0,5% a 1%) e, se houver financiamento, a taxa de avaliação bancária. No total, reserve cerca de 5% a 6% do valor do imóvel para essas despesas.",
      },
      {
        question: "Posso usar o FGTS para comprar um imóvel?",
        answer:
          "Sim, o FGTS pode ser usado para dar entrada, amortizar parcelas ou quitar o financiamento. Para isso, é necessário ter pelo menos 3 anos de trabalho sob regime CLT (não necessariamente consecutivos), não ter financiamento ativo no SFH e não ser proprietário de imóvel residencial na mesma cidade.",
      },
    ],
  },
  {
    id: "aluguel",
    title: "Aluguel de imóveis",
    items: [
      {
        question: "Quais documentos preciso para alugar um imóvel?",
        answer:
          "Para alugar, você geralmente precisa de: RG, CPF, comprovante de renda (mínimo 3x o valor do aluguel), comprovante de residência, última declaração de IR e referências pessoais. Também é necessário apresentar uma garantia locatícia (fiador, seguro fiança ou caução).",
      },
      {
        question: "Quais são as formas de garantia para aluguel?",
        answer:
          "As principais formas de garantia são: fiador (pessoa que se responsabiliza pelo pagamento), seguro fiança (seguro contratado junto a uma seguradora), caução (depósito de até 3 meses de aluguel) e título de capitalização. Cada modalidade tem suas vantagens — nossa equipe pode orientar sobre a melhor opção para o seu caso.",
      },
      {
        question: "O que está incluso no valor do aluguel?",
        answer:
          "O valor do aluguel geralmente cobre apenas o uso do imóvel. Condomínio, IPTU, água, energia, gás e internet são cobrados separadamente. Alguns contratos incluem o condomínio no valor, mas isso deve estar especificado no contrato de locação.",
      },
    ],
  },
  {
    id: "financiamento",
    title: "Financiamento",
    items: [
      {
        question: "Como funciona o financiamento imobiliário?",
        answer:
          "O financiamento permite comprar um imóvel pagando em parcelas ao longo de até 35 anos. O banco paga o valor ao vendedor e você quita a dívida com o banco em prestações mensais com juros. O imóvel fica alienado (como garantia) ao banco até a quitação total.",
      },
      {
        question: "Qual a renda mínima para financiar um imóvel?",
        answer:
          "A parcela do financiamento não pode ultrapassar 30% da sua renda bruta mensal. Para um imóvel de R$ 300.000 financiado em 30 anos, por exemplo, a parcela inicial seria de aproximadamente R$ 2.800, exigindo uma renda de cerca de R$ 9.300. É possível compor renda com cônjuge ou familiares.",
      },
      {
        question: "Posso financiar pelo Minha Casa Minha Vida?",
        answer:
          "Sim, se sua renda familiar bruta for de até R$ 8.000 por mês e você não possuir imóvel residencial em seu nome. O programa oferece taxas de juros reduzidas (a partir de 4% ao ano) e subsídios que podem chegar a R$ 55.000. Confira nosso guia completo sobre o MCMV no blog.",
      },
      {
        question: "Quanto de entrada preciso para financiar?",
        answer:
          "Na maioria dos financiamentos, é necessário dar uma entrada de 10% a 20% do valor do imóvel. No programa Minha Casa Minha Vida Faixa 1, em alguns casos é possível financiar até 100%. O FGTS pode ser usado como parte da entrada.",
      },
    ],
  },
  {
    id: "documentacao",
    title: "Documentação e processos",
    items: [
      {
        question: "O que é matrícula do imóvel?",
        answer:
          "A matrícula é o documento mais importante de um imóvel. Emitida pelo Cartório de Registro de Imóveis, ela contém todo o histórico do bem: proprietários anteriores, área, localização, eventuais ônus (como hipotecas ou penhoras) e averbações. Sempre solicite uma matrícula atualizada antes de comprar.",
      },
      {
        question: "O que é ITBI e quanto custa em Curitiba?",
        answer:
          "O ITBI (Imposto de Transmissão de Bens Imóveis) é um imposto municipal pago na transferência de propriedade. Em Curitiba, a alíquota é de 2,7% sobre o valor venal do imóvel. O pagamento é feito antes da lavratura da escritura.",
      },
      {
        question: "Quanto tempo demora para comprar um imóvel?",
        answer:
          "O prazo médio varia conforme a forma de pagamento. Compra à vista: 15 a 30 dias. Com financiamento bancário: 30 a 90 dias (inclui análise de crédito, avaliação e registro). Com o programa MCMV: pode levar de 60 a 120 dias. Ter a documentação organizada acelera significativamente o processo.",
      },
      {
        question: "O que é escritura e registro de imóvel?",
        answer:
          "A escritura pública é o documento lavrado no Tabelionato de Notas que formaliza a compra e venda. O registro é feito no Cartório de Registro de Imóveis e efetiva a transferência de propriedade. Sem o registro, você não é legalmente o dono do imóvel, mesmo com escritura.",
      },
    ],
  },
]
