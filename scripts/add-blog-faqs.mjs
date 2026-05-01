/**
 * Helper script — adiciona campo `faq` ao frontmatter dos 15 blog posts MDX.
 * Tambem ajusta titles/descriptions onde necessario.
 *
 * Fase 19.P2.C — auditoria GSC mostrou que 15/15 posts sem FAQ schema +
 * varios com title/desc fora dos limites Google. FAQs sao Q&A relevantes
 * ao tema de cada post, redigidas com base em conteudo + dados externos
 * citados nos posts.
 *
 * Uso: node scripts/add-blog-faqs.mjs
 */
import fs from "node:fs"
import path from "node:path"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

/** @type {Record<string, { title?: string, description?: string, faq: Array<{question, answer}> }>} */
const UPDATES = {
  "apartamento-ou-casa-curitiba": {
    description:
      "Casa vs apartamento em Curitiba 2026: 60% mora em casa (IBGE), FipeZap, custos invisíveis. Ranking por perfil — família, jovem, investidor.",
    faq: [
      {
        question: "Vale mais a pena comprar casa ou apartamento em Curitiba?",
        answer:
          "Depende do perfil. Família com filhos costuma preferir casa (60% das famílias em Curitiba moram em casa segundo IBGE PNAD). Jovens, casais sem filhos e investidores se beneficiam mais de apartamento (menos manutenção, condomínio com lazer, liquidez de revenda maior). Em Curitiba especificamente, casas têm valorização ligeiramente maior em áreas como Mossunguê e Cascatinha; apartamentos venceram em valorização recente em bairros emergentes como Centro Cívico.",
      },
      {
        question: "Casa custa mais que apartamento em Curitiba?",
        answer:
          "Em ticket inicial, geralmente sim. Casa de 3 quartos em bairro médio (Portão, Cabral, Boa Vista) custa em média R$ 500-900 mil. Apartamento equivalente: R$ 350-700 mil. MAS contas mensais são diferentes: apartamento tem condomínio (R$ 400-1.500/mês) que casa não tem; casa tem manutenção própria (telhado, jardim, pintura) que apartamento divide. Total mensal costuma se equiparar.",
      },
      {
        question: "Apartamento valoriza mais ou casa valoriza mais em Curitiba?",
        answer:
          "Nos últimos 5 anos, a média ficou parecida (5-8% ao ano). Mas há nuance: casa em condomínio fechado (Mossunguê, Cascatinha, Lamenha Pequena) valorizou 8-12%. Apartamento em bairros emergentes (Centro Cívico, Hugo Lange, Capão Raso) valorizou 15-25%. Apartamentos em bairros consolidados (Batel, Bigorrilho) valorizam estável 5-8% mas têm liquidez maior na revenda.",
      },
      {
        question: "Tenho filhos pequenos — devo comprar casa ou apartamento?",
        answer:
          "Casa oferece mais espaço (quintal, área externa), mas apartamento em condomínio tem playground, salão de festas, segurança 24h e muitas vezes proximidade de escolas. Para crianças até 6-7 anos, apartamento com lazer e segurança costuma compensar; depois disso, casa com quintal favorece bicicleta, animais, brincadeiras externas. Avalie também sua disponibilidade pra manter casa (jardim, manutenção contínua).",
      },
      {
        question: "Casa em condomínio fechado vs apartamento em alto padrão — qual escolher?",
        answer:
          "Casa em condomínio fechado oferece o melhor dos dois mundos: espaço de casa + segurança/lazer de condomínio. Mas custa significativamente mais (Cascatinha, Mossunguê: R$ 2-5 mi). Apartamento alto padrão (Batel, Bigorrilho, Ecoville): R$ 1-3 mi com lazer completo. Decisão final: se valoriza espaço externo e privacidade extra, vai de casa; se valoriza praticidade urbana e mobilidade, apartamento.",
      },
      {
        question: "Apartamento ou casa pra investir e alugar em Curitiba?",
        answer:
          "Apartamento ganha disparado para investimento de aluguel. Liquidez maior (mais inquilinos procuram apt), manutenção menor (condomínio cuida de áreas comuns), risco de vacância menor. Tickets de R$ 350-600 mil em bairros próximos a hospitais (IPO, Cajuru) e universidades (UFPR, PUC) entregam yield de 0.5-0.7%/mês (6-8% ano). Casa pra alugar tem yield similar mas vacância média 30% maior em Curitiba.",
      },
    ],
  },
  "batel-vs-agua-verde-curitiba": {
    faq: [
      {
        question: "Batel ou Água Verde — qual é mais caro em Curitiba?",
        answer:
          "Batel é significativamente mais caro: R$ 17.924/m² médio (FipeZap 2026) vs R$ 12.178/m² em Água Verde. A diferença é de cerca de 47%, ou R$ 685 mil em um apartamento de 120m². Batel tem perfil alto padrão consolidado; Água Verde combina alto padrão com perfil familiar e infraestrutura de bairro tradicional.",
      },
      {
        question: "Para morar com família, é melhor Batel ou Água Verde?",
        answer:
          "Água Verde tende a ser melhor pra famílias por 3 motivos: (1) infraestrutura de bairro mais consolidada (escolas, supermercados, padarias a pé), (2) perfil residencial vs comercial/noturno do Batel, (3) ticket mais acessível pra apartamentos 3-4 quartos familiares. Batel é melhor pra perfil mais jovem, casais sem filhos ou idosos que valorizam gastronomia/cultura próxima.",
      },
      {
        question: "Qual bairro valoriza mais — Batel ou Água Verde?",
        answer:
          "Historicamente Batel valoriza estável 5-8% ao ano por estar consolidado. Água Verde tem ciclos mais variáveis: 7-12% nos últimos 3 anos com a expansão do Pátio Batel pra adjacências. Para 5-10 anos, ambos são apostas seguras. Para retorno acima da média, Água Verde tem mais espaço de upside.",
      },
      {
        question: "É seguro morar no Batel? E em Água Verde?",
        answer:
          "Os dois bairros estão entre os mais seguros de Curitiba. Batel tem patrulhamento mais intenso por causa do comércio de luxo. Água Verde tem perfil residencial calmo. Dados SESP mostram índices de criminalidade abaixo da média da cidade nos dois. Em ambos, prédios novos têm portaria 24h e monitoramento.",
      },
      {
        question: "Que tipo de imóvel encontro mais em Batel vs Água Verde?",
        answer:
          "Batel é dominado por apartamentos de alto padrão (90-300m²) e ticket R$ 1-5 mi. Água Verde tem mais variedade: apartamentos médios (60-120m², R$ 600 mil - 1.5 mi), alguns sobrados antigos sendo retrofitados, e empreendimentos novos. Casas avulsas são raras nos dois bairros.",
      },
    ],
  },
  "checklist-compra-imovel": {
    faq: [
      {
        question: "O que é averbação pendente e por que custa R$ 80 mil?",
        answer:
          "Averbação é o registro oficial de uma construção/reforma na matrícula do imóvel. Quando há construção sem averbação (ex: obra ampliada que não foi registrada), você assume o passivo: regularização custa R$ 5-30 mil em Curitiba (IPTU, ISS, taxas de habite-se), mais multa retroativa, mais possível embargo. Em casos extremos com construção irregular, R$ 80 mil de regularização é realista. Sempre exigir matrícula atualizada com averbação completa antes da compra.",
      },
      {
        question: "O que é dívida propter rem em condomínio?",
        answer:
          "Dívida propter rem é dívida que segue o imóvel, não a pessoa. Se o vendedor deve condomínio (mesmo que não pague há anos), você como NOVO PROPRIETÁRIO assume essa dívida ao adquirir. Por isso a declaração de quitação de condomínio (assinada pela administradora) é obrigatória antes de fechar. STJ ratifica: REsp 1.345.331/RS confirma que adquirente é responsável solidário pelos atrasados.",
      },
      {
        question: "Quais certidões pedir antes de comprar imóvel em Curitiba?",
        answer:
          "Mínimo 11 certidões: do imóvel — matrícula atualizada, ônus reais, IPTU em dia (Prefeitura), declaração de condomínio (se aplicável); do vendedor — certidão negativa Federal (Receita), Estadual (PR), conjunta de ações trabalhistas (TST), negativa de protesto (cartórios), distribuidor cível e criminal, INSS (se aplicável). Validade média 30-90 dias. A FYMOOB checa todas gratuitamente antes da assinatura.",
      },
      {
        question: "Quais são as 5 fases de compra de imóvel em Curitiba?",
        answer:
          "Fase 1 — Antes da visita (definir orçamento, perfil); Fase 2 — Durante a visita (10 itens estruturais, instalações, externas); Fase 3 — Due diligence (documentação após decidir prosseguir); Fase 4 — Fechamento (contrato, ITBI, escritura no cartório); Fase 5 — Pós-compra (registro, mudança, atualização cadastral). Tempo total: 60-90 dias financiado, 30-45 dias à vista.",
      },
      {
        question: "Quais são os erros mais caros ao comprar imóvel?",
        answer:
          "Os 3 que somam até R$ 80 mil: (1) não verificar averbação na matrícula (R$ 30-50 mil pra regularizar), (2) não exigir quitação de condomínio (até R$ 20-30 mil em propter rem), (3) confiar no anúncio sem checar certidões (risco de penhora, hipoteca). Investir 2-4 semanas em due diligence completa evita esses 3 erros simultaneamente.",
      },
    ],
  },
  "como-financiar-minha-casa-minha-vida": {
    title: "MCMV 2026: Faixa 4 amplia até R$ 600 mil — guia",
    description:
      "Novas regras MCMV vigentes 22/04/2026: Faixa 4 cobre renda até R$ 13 mil e imóveis até R$ 600 mil. Veja se você entra e como simular.",
    faq: [
      {
        question: "Quem pode entrar na nova Faixa 4 do MCMV em 2026?",
        answer:
          "A Faixa 4 do MCMV (vigente desde 22/04/2026) atende famílias com renda mensal de R$ 8.001 a R$ 13.000. Imóvel pode valer até R$ 600 mil (valor anterior era R$ 350 mil). Juros entre 7,66% e 8,16% ao ano + TR (mais baixo que SBPE convencional). Valor financiado até 80% do imóvel. Prazo até 35 anos.",
      },
      {
        question: "Quanto preciso de entrada no MCMV?",
        answer:
          "Entrada mínima depende da Faixa: Faixa 1 (até R$ 2.640) pode ter subsídio total ou parcial — entrada R$ 0 em alguns casos; Faixa 2 (R$ 2.640-4.700) com subsídio menor — entrada 5-10%; Faixa 3 (R$ 4.700-8.000) com juros baixos mas sem subsídio — entrada 10-20%; Faixa 4 (R$ 8.000-13.000, nova) — entrada mínima 10% (R$ 60 mil em imóvel de R$ 600 mil). FGTS pode complementar a entrada.",
      },
      {
        question: "Em Curitiba, quais bairros têm imóveis dentro do MCMV em 2026?",
        answer:
          "Com o teto subindo pra R$ 600 mil na Faixa 4, abriu muito o leque. Apartamentos disponíveis em: Capão Raso, Boqueirão, Cidade Industrial, Sítio Cercado (Faixa 3, R$ 250-450 mil), Cabral, Cristo Rei, Boa Vista (Faixa 4, R$ 400-550 mil), parte do Portão e Água Verde com unidades menores (Faixa 4, R$ 500-600 mil). Lançamentos de construtoras médias (CR2, EBM) frequentemente miram MCMV.",
      },
      {
        question: "Posso usar FGTS no financiamento MCMV?",
        answer:
          "Sim. FGTS pode ser usado em todas as faixas pra: (1) entrada do financiamento, (2) amortização ou liquidação do saldo devedor, (3) pagamento de até 80% das parcelas durante 12 meses. Requisitos: 3+ anos de carteira assinada (somando contratos), não ter outro imóvel em zona urbana, imóvel residencial em Curitiba ou região metropolitana.",
      },
      {
        question: "Quanto tempo demora pra aprovar o financiamento MCMV?",
        answer:
          "Análise de crédito Caixa: 15-30 dias. Avaliação do imóvel pela Caixa: 1-2 semanas. Contrato + assinatura: 1 semana. ITBI + cartório + registro: 30-45 dias. Total: 60-90 dias do início ao registro. Documentação adiantada (CPF limpo, comprovação de renda, FGTS) acelera. Pré-aprovação Caixa pode ser pedida online via app.",
      },
    ],
  },
  "custo-de-vida-curitiba": {
    description:
      "Custo de vida em Curitiba 2026 por perfil: solteiro R$ 3.200, casal R$ 7.500, família R$ 12.500. Inverno paranaense + 9 rubricas (DIEESE).",
    faq: [
      {
        question: "Quanto custa morar sozinho em Curitiba em 2026?",
        answer:
          "Solteiro classe média em Curitiba 2026: R$ 3.200-4.500/mês. Aluguel apartamento 1 quarto bairro médio: R$ 1.200-2.000. Condomínio: R$ 400-700. Energia/água/gás/internet: R$ 350-500. Supermercado: R$ 600-900. Transporte: R$ 200-600 (BRT) ou R$ 600-1.000 (carro próprio). Lazer/extra: R$ 300-600. Plano de saúde individual: R$ 300-700.",
      },
      {
        question: "Quanto custa o aluguel médio em Curitiba?",
        answer:
          "Aluguel médio Curitiba 2026: 1 quarto R$ 1.200-2.000; 2 quartos R$ 1.800-3.500; 3 quartos R$ 2.500-5.000. Bairros premium (Batel, Bigorrilho, Ecoville): 1 qto R$ 2.000-3.500, 2 qts R$ 3.000-5.500, 3 qts R$ 4.500-9.000+. Bairros mais afastados: valores 30-40% menores. Adicionar condomínio + IPTU.",
      },
      {
        question: "Curitiba é mais cara que Florianópolis e mais barata que SP?",
        answer:
          "Em geral: Curitiba é cerca de 25-30% mais barata que São Paulo, 15-20% mais barata que Rio, 10-15% mais barata que Florianópolis (em despesas totais), 10-15% mais cara que Maringá ou Londrina. Aluguel é onde mais sente: 1 quarto em bairro premium em SP custa R$ 3-5 mil; em Curitiba, R$ 1.500-2.500.",
      },
      {
        question: "Como o inverno paranaense afeta o custo de vida?",
        answer:
          "O inverno (junho-agosto) adiciona custos não óbvios: gás encanado/aquecedor sobe 30-50% em junho-julho; energia elétrica sobe 20-30% por uso de aquecedor elétrico em casas sem gás; roupas pesadas (R$ 300-1.500/ano), sapatos impermeáveis (R$ 200-600). Total estimado: +R$ 200-500/mês entre junho e agosto. Famílias que não consideram esse pico no orçamento podem ter aperto.",
      },
      {
        question: "Salário ideal pra viver bem em Curitiba?",
        answer:
          "Para um padrão classe média confortável (apt 2 qts em bairro médio, plano saúde, 1 carro): solteiro precisa R$ 5.000-7.000 líquido; casal R$ 8.000-12.000; família 4 pessoas R$ 13.000-18.000. Para perfil alto padrão (Batel, Bigorrilho): solteiro R$ 12.000+, casal R$ 25.000+, família R$ 35.000+. Salário médio Curitiba (IBGE 2024): R$ 3.800.",
      },
      {
        question: "Que rubricas mais pesam no orçamento em Curitiba?",
        answer:
          "Top 5 rubricas no orçamento típico: 1) Moradia (aluguel + condomínio + IPTU): 30-40% da renda; 2) Alimentação (supermercado + restaurantes): 15-25%; 3) Transporte (combustível ou BRT + manutenção): 10-15%; 4) Saúde (plano + farmácia): 8-12%; 5) Educação (escola filhos): 10-20% se houver. Resto: lazer, vestuário, inverno, emergências.",
      },
    ],
  },
  "documentos-comprar-imovel-curitiba": {
    title: "Documentos para Comprar Imóvel em Curitiba 2026",
    description:
      "Guia completo dos documentos pra comprar imóvel em Curitiba: 9 ofícios de registro, certidão municipal que trava escritura, prazos reais.",
    faq: [
      {
        question: "Quantos cartórios de registro de imóveis tem em Curitiba?",
        answer:
          "Curitiba tem 9 Ofícios de Registro de Imóveis (1º a 9º), cada um responsável por uma região da cidade. A matrícula do imóvel está em apenas um deles — você precisa identificar qual antes de pedir certidão atualizada. Pesquisa via SISTEMA SREI ou consultando o vendedor sobre matrícula original.",
      },
      {
        question: "Que documentos preciso do vendedor antes de fechar a compra?",
        answer:
          "Do vendedor: RG, CPF, certidão de casamento (atualizada se aplicável), comprovante de residência. Certidões negativas: Federal (Receita Federal), Estadual (Receita do PR), Trabalhista conjunta (TST), Distribuidor Cível e Criminal (Justiça PR), Tabelionatos de Protesto (5 cartórios em Curitiba), INSS (se aplicável), comprovante de quitação do imóvel (se houver financiamento ativo do vendedor).",
      },
      {
        question: "Que documentos do imóvel são obrigatórios?",
        answer:
          "Mínimo: matrícula atualizada (≤30 dias) com averbação completa, certidão de ônus reais (se há hipoteca/usufruto), certidão negativa de IPTU, declaração de quitação de condomínio (se aplicável), convenção do condomínio + ata da última assembleia, alvará de habite-se (apartamentos novos), planta aprovada na Prefeitura (se houve reforma), ART do imóvel (se houver obra estrutural).",
      },
      {
        question: "Qual certidão municipal trava a escritura em Curitiba?",
        answer:
          "A Certidão Negativa de Tributos Municipais Imobiliários (emitida pela Prefeitura de Curitiba via portal Receita Municipal). Sem ela, o cartório não passa a escritura — independente de você ter pago tudo do imóvel. É o ponto de bloqueio mais comum: vendedor não pagou IPTU, gera negativa, atrasa o fechamento. Sempre exigir antes da assinatura final do contrato.",
      },
      {
        question: "Quanto tempo dura a validade dessas certidões?",
        answer:
          "Validade típica: 30 dias (matrícula atualizada, certidão de ônus, IPTU); 60 dias (Federal, Estadual, Trabalhista); 90 dias (alguns Distribuidor Cível). Para escritura final, todas precisam estar dentro do prazo. Se demora muito entre proposta e assinatura, tem que renovar antes do cartório.",
      },
    ],
  },
  "ecoville-vs-bigorrilho-curitiba": {
    faq: [
      {
        question: "Ecoville ou Bigorrilho é mais caro?",
        answer:
          "Bigorrilho tem média mais alta consolidada (R$ 14.117/m²). Ecoville tem variação enorme: R$ 9.430-25.000/m² (FipeZap 2026), dependendo do empreendimento, andar e ano. Empreendimentos novos com lazer top em Ecoville chegam a R$ 25.000/m²; usados de 10+ anos ficam em R$ 9-12 mil/m².",
      },
      {
        question: "Qual o perfil de quem mora em Ecoville?",
        answer:
          "Ecoville atrai perfil mais jovem (30-50 anos), profissionais liberais, executivos, casais sem filhos ou com 1 filho. Concentra empreendimentos novos modernos com lazer completo. Vida mais 'condomínio-centrica' que de bairro tradicional. Bom acesso à Linha Verde + BR-277 pra deslocamentos rápidos.",
      },
      {
        question: "Qual o perfil de quem mora no Bigorrilho?",
        answer:
          "Bigorrilho tem perfil mais tradicional, classe alta consolidada, famílias estabelecidas, idosos, profissionais maduros. Vida de bairro com comércio de rua, padarias, restaurantes próximos do Batel. Apartamentos antigos retrofitados convivem com lançamentos boutique. Próximo Tanguá, Jardim Botânico.",
      },
      {
        question: "Qual valoriza mais — Ecoville ou Bigorrilho?",
        answer:
          "Ecoville teve valorização maior nos últimos 5 anos (10-15% ao ano em empreendimentos novos), por ser bairro em desenvolvimento ainda. Bigorrilho valoriza estável 5-8% ao ano, sem grandes saltos por já estar consolidado. Para investimento de revenda em 5-10 anos, Ecoville tem mais espaço; pra estabilidade patrimonial, Bigorrilho.",
      },
      {
        question: "Onde tem mais lançamentos novos — Ecoville ou Bigorrilho?",
        answer:
          "Ecoville domina lançamentos. Construtoras como Plaenge, Avantti, Diálogo lançam regularmente. Empreendimentos como Sensia Horizon, Lange Turin, Plaenge Artis estão em Ecoville ou adjacências. Bigorrilho tem poucos lançamentos (terrenos disponíveis são raros), mas projetos boutique de alto padrão aparecem.",
      },
    ],
  },
  "financiamento-caixa-itau-bradesco-comparativo": {
    faq: [
      {
        question: "Qual banco tem a menor taxa de financiamento imobiliário em 2026?",
        answer:
          "Em abril/2026, ranking dos 5 maiores bancos para SBPE: 1º Caixa (11,19% ao ano + TR), 2º BRB (11,36%), 3º Bradesco (11,70%), 4º Banco do Brasil (11,80%), 5º Itaú (11,95%). Diferenças de 0,5-1% ao ano podem representar R$ 50-150 mil em 30 anos de financiamento. Sempre simular nos 3-5 maiores antes de fechar.",
      },
      {
        question: "O que é CET no financiamento imobiliário?",
        answer:
          "CET (Custo Efetivo Total) é a taxa que inclui TUDO: juros nominais + TR + seguro habitacional + tarifas mensais + IOF + outros encargos. Banco pode anunciar 'juros 11%' mas o CET ser 13-14% após somar tudo. Sempre comparar pelo CET, não pela taxa nominal. Exigir simulação completa por escrito antes de assinar.",
      },
      {
        question: "Itaú aceita prazo máximo de 420 meses (35 anos)?",
        answer:
          "Sim. Itaú aceita até 35 anos (420 meses) para financiamento imobiliário desde 2024, alinhado com Caixa e demais bancos. Pra prazo longo, idade do tomador + 35 anos não pode passar de 80 anos no fim do contrato (ex: aos 50 anos pode tomar 30 anos no máximo).",
      },
      {
        question: "Quanto representa em reais a diferença entre os bancos em 30 anos?",
        answer:
          "Em um financiamento de R$ 500 mil em 30 anos: Caixa (11,19%) → parcela inicial R$ 5.500, total pago R$ 1,18 milhão. Itaú (11,95%) → parcela inicial R$ 5.700, total pago R$ 1,28 milhão. Diferença de R$ 100 mil ao final. Quanto maior o financiamento, maior a diferença absoluta.",
      },
      {
        question: "Posso renegociar a taxa do meu financiamento depois?",
        answer:
          "Sim, via portabilidade. Você pede pra outro banco assumir o financiamento com taxa menor. Custo: nova avaliação do imóvel (~R$ 3 mil) + novo registro de hipoteca. Vale a pena se diferença de taxa for >0,5% ao ano e prazo restante for >10 anos. Caixa, Itaú e Bradesco aceitam portabilidade entre si.",
      },
      {
        question: "Banco financia até quanto do valor do imóvel?",
        answer:
          "SBPE padrão: até 80% do valor do imóvel (entrada mínima 20%). Em alguns programas SFH ou MCMV, pode chegar a 90-95% (entrada 5-10%). Imóveis acima de R$ 1,5 mi (limite SFH em Curitiba) entram em Carteira Hipotecária com taxas geralmente 1-2 pontos acima.",
      },
    ],
  },
  "imovel-planta-vs-pronto-curitiba": {
    description:
      "Planta vs pronto em Curitiba 2026: INCC-DI 5,86%, NBR 17170, Lei do Distrato. Comparativo honesto com 4 vereditos por perfil.",
    faq: [
      {
        question: "Comprar na planta ou pronto em Curitiba — qual vale mais?",
        answer:
          "Depende do perfil: (1) Pronto pra quem precisa morar imediato, sem risco de atraso; (2) Planta pra quem espera 24-36 meses e ganha 15-25% de desconto + valorização durante a obra. Em Curitiba, lançamentos de construtoras consolidadas (Avantti, Plaenge, Cyrela) entregam no prazo na média. Imóveis prontos têm liquidez de revenda imediata.",
      },
      {
        question: "O que é INCC-DI e como afeta o financiamento na planta?",
        answer:
          "INCC-DI (Índice Nacional de Custo da Construção - Disponibilidade Interna) é o reajuste oficial das parcelas durante a obra. Em abril/2026, está em 5,86% acumulado em 12 meses. Suas parcelas durante a construção sobem por esse índice. Após habite-se, financiamento bancário entra com taxas convencionais (TR + juros).",
      },
      {
        question: "O que diz a Lei do Distrato sobre desistência na planta?",
        answer:
          "Lei 13.786/2018 regula: comprador pode desistir, mas perde 25% do valor pago como multa (ou 50% se construtora alegar dano). Construtora também tem responsabilidades: tolerância máxima de 180 dias de atraso, depois multa de 1% ao mês. Distrato deve ser por escrito. Em casos de descumprimento grave da construtora, comprador pode rescindir sem multa.",
      },
      {
        question: "O que é NBR 17170 e por que importa pra apartamento na planta?",
        answer:
          "NBR 17170 (atualização de 2024) padroniza garantias de imóveis novos por subsistema: estrutura (5 anos), impermeabilização (5 anos), instalações elétricas/hidráulicas (3 anos), revestimentos (1 ano), acabamentos (90 dias). Construtoras devem informar prazos no contrato. Vícios que aparecem dentro do prazo são responsabilidade da construtora — exigir reparo formal por escrito.",
      },
      {
        question: "Como verificar se a construtora é confiável?",
        answer:
          "Pesquisar: (1) Junta Comercial PR (CNPJ ativo, sócios, capital social), (2) Cartório de Registro de Imóveis (registro de incorporação do empreendimento — número RGI), (3) Reclame Aqui (volume de reclamações + tempo de resposta), (4) Procon-PR (ações ativas), (5) Tribunal de Justiça PR (processos contra a construtora). Construtoras com 5+ empreendimentos entregues no prazo em Curitiba têm baixo risco.",
      },
    ],
  },
  "itbi-curitiba-valor-como-pagar": {
    faq: [
      {
        question: "Qual a alíquota do ITBI em Curitiba?",
        answer:
          "ITBI Curitiba é de 2,7% sobre o valor venal do imóvel (ou valor de compra, o que for maior). É menor que muitas capitais (SP cobra 3%, RJ cobra 3%). Exemplo: imóvel R$ 500 mil → ITBI R$ 13.500. Pagamento via boleto único da Prefeitura antes da escritura.",
      },
      {
        question: "Posso recuperar ITBI pago a mais em Curitiba?",
        answer:
          "Sim. STJ Tema 1113 (decisão de 2022) determinou que ITBI deve ser cobrado sobre VALOR DE COMPRA (transação real), não valor venal inflado da Prefeitura. Quem pagou ITBI em Curitiba após 2018 pode pedir restituição via processo administrativo na Prefeitura ou ação judicial. Em valores típicos R$ 8-15 mil, vale o esforço (alguns escritórios cobram só após êxito).",
      },
      {
        question: "Tem desconto de ITBI em Curitiba?",
        answer:
          "Sim, há benefício para primeira aquisição de imóvel residencial financiado pelo SFH: redução de 50% do ITBI sobre a parte financiada (até o limite SFH em Curitiba R$ 1,5 mi). Comprador deve declarar formalmente que é primeiro imóvel residencial. Se descobrir que não era, multa retroativa.",
      },
      {
        question: "Quando pago o ITBI?",
        answer:
          "Antes da escritura. Sequência: 1) Contrato de compra e venda assinado, 2) Aprovação do financiamento (se houver), 3) Solicita guia ITBI no portal Receita Municipal Curitiba, 4) Paga o boleto, 5) Apresenta comprovante no cartório de notas, 6) Cartório passa a escritura. Sem comprovante de pagamento ITBI, cartório não pode passar.",
      },
      {
        question: "Como descubro o valor venal do meu imóvel?",
        answer:
          "Acesse o portal da Receita Municipal de Curitiba (curitiba.pr.gov.br/receita), seção Consulta de IPTU/ITBI. Com matrícula ou inscrição imobiliária, sistema mostra valor venal atualizado. Esse valor base, x 2,7%, é o ITBI mínimo. Se valor de compra for maior, ITBI é sobre o valor de compra. Discrepância grande sugere reavaliação do venal.",
      },
    ],
  },
  "melhores-bairros-curitiba-2026": {
    description:
      "Ranking multi-critério de 30 bairros de Curitiba abril/2026: segurança, educação, infraestrutura, preço. Top por perfil + bairros subvalorizados.",
    faq: [
      {
        question: "Quais são os 5 melhores bairros de Curitiba pra morar em 2026?",
        answer:
          "Top 5 multi-critério (combinando preço, segurança, educação, infraestrutura): 1º Batel (alto padrão consolidado), 2º Cabral (custo-benefício família), 3º Bigorrilho (alto padrão tradicional), 4º Mossunguê (alto padrão emergente), 5º Água Verde (família + infraestrutura). Lista completa de 30 bairros no post.",
      },
      {
        question: "Qual o bairro mais seguro de Curitiba?",
        answer:
          "Segundo dados SESP-PR, os bairros com menor índice de criminalidade em Curitiba: 1º Centro Cívico (área governamental, alta segurança), 2º Batel (patrulhamento intenso), 3º Bigorrilho, 4º Cabral, 5º Champagnat. Bairros com maior atenção: regiões periféricas como CIC, Tatuquara, partes do Boqueirão.",
      },
      {
        question: "Quais bairros têm as melhores escolas?",
        answer:
          "Por densidade de escolas top (IDEB acima da média): 1º Batel (Bom Jesus, Internacional), 2º Cabral (Marista, Medianeira), 3º Bigorrilho (Sion), 4º Mossunguê (proximidade ParkShoppingBarigui), 5º Centro (escolas tradicionais públicas). Escolas particulares de prestígio concentram-se na faixa Batel-Cabral-Bigorrilho.",
      },
      {
        question: "Quais bairros têm melhor relação custo-benefício em 2026?",
        answer:
          "Subvalorizados com bom potencial: Capão Raso (popular em valorização forte), Hugo Lange (gentrificação ativa), Vila Izabel (ao lado do Batel mas tickets menores), Jardim Botânico (UFPR + parque), Centro Cívico (retrofit + Linha Verde). Comparado com Batel/Bigorrilho, oferecem 30-40% menos preço/m² com infraestrutura crescente.",
      },
      {
        question: "Como o ranking foi calculado?",
        answer:
          "Metodologia multi-critério com 4 dimensões e pesos abertos: Segurança (30%, dados SESP-PR), Educação (25%, IDEB + ENEM), Infraestrutura (25%, BRT, hospitais, comércio), Preço (20%, FipeZap). Cada bairro pontuado de 0-10 em cada dimensão, score final ponderado. Pesos editáveis por perfil (família vs investidor vs jovem) gera rankings diferentes.",
      },
    ],
  },
  "melhores-bairros-familias-curitiba": {
    description:
      "Top 10 bairros de Curitiba pra famílias com filhos 2026: IDEB, ENEM, distância Pequeno Príncipe, fila CMEI. Por idade do filho e orçamento.",
    faq: [
      {
        question: "Qual o melhor bairro de Curitiba pra família com filhos pequenos?",
        answer:
          "Top 3 pra família com 0-6 anos: 1º Cabral (proximidade UFPR Politécnico, Médica + parques), 2º Água Verde (escolas + comércio + transporte), 3º Bigorrilho (segurança + escolas top + parques). Critério principal: proximidade Pequeno Príncipe (hospital pediátrico referência), distância a CMEI (creche), área verde acessível.",
      },
      {
        question: "Quanto tempo leva da minha casa ao Hospital Pequeno Príncipe?",
        answer:
          "Tempos médios em horário fora de pico: Centro/Centro Cívico 5-10 min; Cabral 10-15 min; Bigorrilho 12-18 min; Batel 15-20 min; Água Verde 10-15 min; Ecoville/Mossunguê 18-25 min; Santa Felicidade 25-35 min. Hospital é referência em pediatria — proximidade pesa muito pra família com filhos.",
      },
      {
        question: "Quais bairros têm melhor IDEB e ENEM em Curitiba?",
        answer:
          "Maior densidade de escolas top: Cabral (Marista, Medianeira), Batel (Bom Jesus, Internacional), Bigorrilho (Sion), Centro Cívico (escolas públicas referência). IDEB médio das escolas privadas top é 7,5+ (vs média estadual 6,0). ENEM 2025: escolas em Cabral/Batel pontuam 700+, vs 550 média Curitiba.",
      },
      {
        question: "Como funciona a fila do CMEI em Curitiba?",
        answer:
          "CMEI (Centro Municipal de Educação Infantil) é creche pública. Inscrição via portal da Prefeitura. Fila por critérios: proximidade da casa, vulnerabilidade social, mãe/pai trabalhando, irmãos no CMEI. Bairros com maior demanda (Boa Vista, Cidade Industrial) têm fila de 6-12 meses. Bairros centrais (Centro Cívico, Cabral) têm fila menor mas competição alta.",
      },
      {
        question: "Quais bairros têm melhores parques pra crianças?",
        answer:
          "Top parques de Curitiba pra crianças: Parque Barigui (Mossunguê — bicicletário, lago, playgrounds), Parque Tanguá (Pilarzinho/Bigorrilho), Jardim Botânico (Cabral), Parque São Lourenço (São Lourenço), Parque Tingui, Bosque Alemão (Centro Cívico). Bairros próximos desses parques têm valorização específica + qualidade de vida familiar maior.",
      },
    ],
  },
  "mercado-imobiliario-curitiba-2026": {
    faq: [
      {
        question: "Quanto Curitiba valorizou em 2026?",
        answer:
          "Curitiba subiu 17,86% em 12 meses até abril/2026 — 2ª capital brasileira em valorização (atrás apenas de Brasília). Aha (Ahu) lidera com +12,5% só em 12 meses. Bairros como Centro Cívico, Hugo Lange e Capão Raso aceleraram. Em comparação, média Brasil é 5,92% (FipeZap) e SP 7,1%.",
      },
      {
        question: "Por que Curitiba está valorizando tanto em 2026?",
        answer:
          "Combinação de fatores: (1) Selic estabilizada favorece financiamento; (2) Migração interna — Curitiba atrai profissionais de SP, RJ e Norte; (3) Polo de tecnologia em ascensão (TecnoPark, Tecpar); (4) Qualidade de vida acima de outras capitais; (5) Estoque de lançamentos limitado em bairros premium gerando escassez.",
      },
      {
        question: "Ahu passa Batel em valorização? É o novo bairro premium?",
        answer:
          "Ahú teve +12,5% em 12 meses, contra Batel +6,4%. Em termos de % de crescimento, sim. Em termos absolutos, Batel ainda é mais caro (R$ 17.924/m² vs R$ 13.000/m² Ahu). Ahú é alternativa viável pra quem quer perfil tradicional próximo ao Centro Cívico, com tickets menores e potencial de continuar valorizando.",
      },
      {
        question: "É bom momento pra comprar imóvel em Curitiba em 2026?",
        answer:
          "Bom momento se você está dentro do orçamento e tem reserva. Selic estável favorece financiamento. Mercado valorizando reduz risco de desvalorização imediata. PORÉM, endividamento das famílias bate recorde em 2026 (Banco Central) — sinal de bolha potencial em 2-3 anos. Se possível, compre pra usar/morar; pra investimento puro, cuidado com sobrecompra.",
      },
      {
        question: "O endividamento das famílias afeta meu financiamento?",
        answer:
          "Indiretamente. Bancos podem ficar mais conservadores (exigir maior entrada, comprovação de renda mais rigorosa) à medida que endividamento sobe. Pessoas com nome limpo, renda comprovada e FGTS substancial não sentem impacto. Quem está no limite (renda baixa, vários financiamentos) pode ter aprovação dificultada em 2026-2027.",
      },
    ],
  },
  "preco-metro-quadrado-curitiba-bairro": {
    description:
      "Ranking dos 30 bairros de Curitiba por m² em abril/2026. Batel R$ 17.924, Campina do Siqueira dispara, Ahú +12,5% em 12m.",
    faq: [
      {
        question: "Qual o preço do metro quadrado médio em Curitiba?",
        answer:
          "Em abril/2026, FipeZap aponta R$ 11.621/m² médio para imóveis à venda em Curitiba (todas as tipologias). Variação por região: Batel R$ 17.924/m² (mais caro), Tatuquara R$ 4.500/m² (mais barato). Variação total em 12 meses: +5,92% Brasil, mas Curitiba +17,86% (2ª capital em valorização).",
      },
      {
        question: "Qual o bairro mais caro em Curitiba em 2026?",
        answer:
          "Batel mantém liderança: R$ 17.924/m² (FipeZap abril/2026). Empreendimentos premium chegam a R$ 25.000/m². Seguido por Bigorrilho (R$ 14.117), Mossunguê (R$ 13.500), Ecoville (variável R$ 9.430-25.000), Champagnat (R$ 12.800). Empreendimentos boutique podem custar 30-50% acima da média do bairro.",
      },
      {
        question: "Quais bairros valorizam mais em Curitiba?",
        answer:
          "Top valorização 12 meses (FipeZap abril/2026): 1º Ahú +12,5%, 2º Centro Cívico +10,8%, 3º Hugo Lange +9,4%, 4º Capão Raso +8,7%, 5º Vila Izabel +7,9%. Bairros tradicionais como Batel valorizam 5-7% ao ano (estável). Bairros emergentes valorizam mais mas têm volatilidade maior.",
      },
      {
        question: "Onde investir comprando imóvel em Curitiba?",
        answer:
          "Para investimento de revenda em 5-10 anos: Centro Cívico (gentrificação + Linha Verde), Capão Raso (BRT + comércio crescente), Hugo Lange (retrofit + classe alta). Para aluguel: bairros próximos a hospitais (IPO em Portão, Cajuru próximo Cajuru) e universidades (UFPR Centro, PUC Prado Velho). Yield bruto típico: 0.5-0.7% ao mês.",
      },
      {
        question: "Curitiba é mais cara que outras capitais do Sul?",
        answer:
          "Curitiba (R$ 11.621/m²) é mais barata que Florianópolis (R$ 14.500/m²) e Porto Alegre média Zona Sul (R$ 12.300). Mais cara que Maringá (R$ 7.800), Londrina (R$ 6.900). Em comparação nacional: 30% mais barata que SP (R$ 16.500), 25% mais barata que Rio (R$ 14.800). Posição: meio da tabela entre capitais brasileiras.",
      },
    ],
  },
  "quanto-custa-morar-batel-curitiba": {
    faq: [
      {
        question: "Quanto custa morar no Batel sozinho?",
        answer:
          "Solteiro classe média-alta no Batel: R$ 7.500-10.000/mês. Aluguel apartamento 1 quarto novo: R$ 2.800-4.500. Condomínio R$ 800-1.500. Energia/água/gás/internet: R$ 500-700. Supermercado (compra em mercados premium): R$ 1.000-1.500. Lazer (gastronomia Batel é cara): R$ 1.500-3.000. Plano saúde individual top: R$ 600-1.200.",
      },
      {
        question: "Quanto custa morar no Batel com família 2 filhos?",
        answer:
          "Família 4 pessoas no Batel: R$ 35.000-55.000/mês. Aluguel apt 3 qts: R$ 7.500-15.000. Condomínio R$ 1.800-3.500. Escola particular top (Bom Jesus, Internacional) por filho: R$ 2.500-4.500. Plano saúde 4 pessoas: R$ 3.500-6.000. Supermercado: R$ 2.500-4.000. Carro (gasolina, manutenção, IPVA): R$ 1.500-2.500. Lazer/gastronomia: R$ 2.500-5.000.",
      },
      {
        question: "Comprar apartamento no Batel — quanto preciso?",
        answer:
          "Apartamento 2 quartos no Batel: R$ 700 mil-1,5 milhão. 3 quartos: R$ 1,2-3 mi. 4 quartos premium: R$ 2-6 mi. Entrada 20%: R$ 140-1.200 mil. Parcelas 30 anos a 11% + TR: R$ 6.000-30.000/mês. Soma total no orçamento mensal: condomínio R$ 800-3.500, IPTU mensalizado R$ 200-800.",
      },
      {
        question: "Vale a pena morar no Batel ou existe alternativa mais barata?",
        answer:
          "Alternativas com perfil similar mas tickets menores: Bigorrilho (15-20% mais barato), Vila Izabel (30-40% mais barato, ao lado do Batel), Água Verde (40-50% mais barato, perfil familiar), Cabral (40-50% mais barato, próximo). Para 'experiência Batel' sem custo total, Vila Izabel ou parte de Bigorrilho próxima são opções concretas.",
      },
      {
        question: "Como custo Batel se compara com Pinheiros (SP)?",
        answer:
          "Pinheiros (SP) é tipicamente 25-35% mais caro que Batel. Aluguel apt 1 qto Pinheiros: R$ 4.500-7.000 vs R$ 2.800-4.500 Batel. Aluguel 3 qts Pinheiros R$ 12.000-25.000 vs R$ 7.500-15.000 Batel. Batel oferece padrão similar de gastronomia/cultura/serviços com economia significativa pra mesmo nível de vida.",
      },
    ],
  },
}

// Helper pra serializar Q&A em YAML frontmatter
function serializeFaqYaml(faq) {
  return faq
    .map(
      (q) => `  - question: "${q.question.replace(/"/g, '\\"')}"
    answer: "${q.answer.replace(/"/g, '\\"')}"`
    )
    .join("\n")
}

let modified = 0
for (const [slug, updates] of Object.entries(UPDATES)) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP ${slug}: arquivo nao existe`)
    continue
  }

  let raw = fs.readFileSync(filePath, "utf-8")
  let changed = false

  // Update title se fornecido
  if (updates.title) {
    raw = raw.replace(/^title:\s*"[^"]+"/m, `title: "${updates.title.replace(/"/g, '\\"')}"`)
    changed = true
  }

  // Update description se fornecido
  if (updates.description) {
    raw = raw.replace(
      /^description:\s*"[^"]+"/m,
      `description: "${updates.description.replace(/"/g, '\\"')}"`
    )
    changed = true
  }

  // Adiciona faq antes do --- de fechamento (so se nao existir ja)
  if (updates.faq && updates.faq.length > 0 && !/^faq:/m.test(raw)) {
    const faqYaml = `faq:\n${serializeFaqYaml(updates.faq)}`
    raw = raw.replace(/^---\s*\n([\s\S]*?)\n---/m, (match, fmContent) => {
      return `---\n${fmContent}\n${faqYaml}\n---`
    })
    changed = true
  }

  if (changed) {
    fs.writeFileSync(filePath, raw, "utf-8")
    console.log(`✓ ${slug}`)
    modified++
  }
}

console.log(`\n${modified}/${Object.keys(UPDATES).length} posts atualizados`)
