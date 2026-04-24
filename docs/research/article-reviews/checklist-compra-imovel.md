# Revisão: checklist-compra-imovel

**Data:** 2026-04-23
**Prioridade:** P1 (alta — YMYL evergreen nacional, base factual correta mas voz/estrutura reprovam o manual editorial)
**Agent:** Claude Opus 4.7 (1M context)
**Arquivo:** `content/blog/checklist-compra-imovel.mdx`

---

## Sumário executivo (3 frases)

O post acerta na base factual (ITBI 2,7%, regra dos 30% da renda, matrícula 30 dias, propter rem do IPTU — tudo batido com fontes oficiais) mas falha em voz, ritmo e estrutura: abre com clichê banido ("Comprar um imóvel é provavelmente a maior decisão da sua vida"), título é rótulo sem curiosity gap, não tem lide com número ou contradição, zero callouts, zero FAQ, H2s genéricos ("Verificações documentais"), número do item 22 (Registro ~0,8%) está subestimado pro Paraná e a conclusão resume em vez de provocar. Nada é "errado-grave" factual — o valor de R$ 80 mil do título sugerido não é sustentado por nenhum dado do post, mas é plausível se usar o cenário "averbação + dívida condomínio + ITBI mal calculado" num imóvel de R$ 600k (20-40% de desvalorização segundo fontes). Prioridade é P1 porque é evergreen nacional, link magnet natural, e a reescrita libera tráfego long-tail de "checklist compra imóvel", "documentos imóvel 2026", "o que verificar antes de comprar".

---

## Auditoria YMYL (tabela)

| # | Claim no post | Linha | Validação | Fontes |
|---|---|---|---|---|
| 1 | "ITBI: 2,7% em Curitiba" | 127 | **CORRETO**. Prefeitura de Curitiba mantém 2,7% em 2026 (com isenção até R$ 176k, 0,5% entre R$ 176-205k, 1,6% entre R$ 205-220k — **o post omite essas faixas reduzidas, que são informação útil**) | [Prefeitura Curitiba](https://www.curitiba.pr.gov.br/servicos/itbi-base-de-calculo-e-aliquotas/512), [Colégio Notarial PR](https://cnbpr.org.br/links/itbi/) |
| 2 | "Escritura: ~1,5%" | 128 | **CORRETO em média**. Tabela TJPR 2026 confirma ~1,5% como faixa média em Curitiba. | [TJPR Tabela Custas Extrajudicial](https://www.tjpr.jus.br/documents/12471/3463145/TABELA+DE+CUSTAS+EXTRAJUDICIAL) |
| 3 | "Registro: ~0,8%" | 129 | **SUBESTIMADO**. Tabela paranaense padrão fica em torno de 1% (não 0,8%). O próprio benchmark de nradvocacia/LARYA para 2026 cita 1%. Ajustar pra ~1%. | [LARYA ITBI 2026](https://larya.com.br/itbi), [8º Registro Curitiba](https://www.8registro.com.br/tabela) |
| 4 | "Avaliação bancária: R$ 2.000-4.000" | 130 | **CORRETO mas desatualizado na faixa baixa**. Em 2026 Caixa cobra R$ 3.100-3.800, privados R$ 2.800-4.500. Piso de R$ 2.000 está obsoleto. | [Creditas — docs compra imóvel](https://www.creditas.com/exponencial/documentos-necessarios-para-compra-de-imovel/) |
| 5 | "Total: 5-7% do valor do imóvel" | 131 | **CORRETO**. Regra de ouro 2026 é 4-8% (3-5% "magro", 5-7% "realista", 8% "cheio"). Faixa do post está dentro do intervalo. | [LARYA — Quais Taxas Pagar 2026](https://larya.com.br/blog/quais-taxas-tenho-que-pagar-na-compra-de-imovel/), [nradvocacia — Escritura 2026](https://nradvocacia.com.br/escritura-de-imoveis/) |
| 6 | "Dívidas de IPTU acompanham o imóvel, não o proprietário" | 104 | **CORRETO — obrigação propter rem**. Art. 130 CTN + jurisprudência STJ 1ª Seção. Claim impecável. | [STJ Repetitivo Art. 130 CTN](https://www.ibet.com.br/stj-1a-secao-repetitivo-iptu-imovel-arrematado-em-hasta-publica-irresponsabilidade-arrematantes-hipotese-dividas-anteriores-a-arrematacao-interpretacao-artigo-130-ctn-edital-da-prac/), [Merten Advocacia — propter rem](https://merten.adv.br/2022/07/08/iptu-obrigacao-tributaria-de-natureza-propter-rem-que-acompanha-o-imovel/) |
| 7 | "Matrícula atualizada (máximo 30 dias)" | 89 | **CORRETO**. Decreto 93.240/1986 define validade de 30 dias pra transações imobiliárias. | [Registro de Imóveis do Brasil](https://www.registrodeimoveis.org.br/servicos/matricula), [Quinto Andar — Matrícula](https://www.quintoandar.com.br/guias/manual-imobiliario/matricula-de-imovel/) |
| 8 | "Parcela + condomínio + IPTU não deve ultrapassar 30% da renda" | 135 | **PARCIALMENTE CORRETO**. Resolução BCB 4.676/2018 e Lei 8.692/93 fixam teto em 30% da renda bruta para **a parcela do financiamento** (não inclui condomínio+IPTU na regra formal). Na prática Caixa/privados incluem no cálculo, mas a regra oficial é só da parcela. **Ajustar pra não passar regra informal como norma BCB**. | [Lei 8.692/93](https://www.planalto.gov.br/ccivil_03/LEIS/l8692.htm), [Resolução BCB 4.676](https://normativos.bcb.gov.br/Lists/Normativos/Attachments/50628/Res_4676_v8_P.pdf) |
| 9 | "Fissuras finas (<1mm) são normais" | 20 | **CORRETO** — padrão NBR 9575/ABNT, fissuras < 1mm são de retração, > 1mm diagonais em alvenaria estrutural exigem laudo. | consenso técnico em múltiplas fontes de engenharia |
| 10 | "Habite-se … atesta construção conforme normas" | 107 | **CORRETO** — Habite-se é alvará de conclusão emitido pela Prefeitura. | documento padrão municipal (Curitiba, SP, RJ) |
| 11 | "Reformas que alteraram a planta sem aprovação … problemas na hora de financiar ou revender" | 110 | **CORRETO e subestimado**. Imóveis não averbados **valem 20-40% menos** e banco nenhum financia. Deveria ser H2 próprio ou callout (é um dos maiores ralos de dinheiro do mercado). | [Quinto Andar — imóvel não averbado](https://www.quintoandar.com.br/guias/como-comprar/imovel-nao-averbado/), [nradvocacia — averbação 2026](https://nradvocacia.com.br/imovel-nao-averbado/) |
| 12 | "Certidão trabalhista" | 100 | **CORRETO** — CNDT (Certidão Negativa de Débitos Trabalhistas) é padrão em due diligence. | [Creditas — docs compra imóvel](https://www.creditas.com/exponencial/documentos-necessarios-para-compra-de-imovel/) |
| 13 | Nenhum dado quantitativo ("brasileiros perdem R$ X milhões/ano com") | — | **AUSÊNCIA** é o maior buraco YMYL. O post é um checklist técnico bem escrito, mas **zero ancoragem numérica** — viola regra 2 e regra 8 do manual. | — |
| 14 | "Condomínios acima de R$ 1.000/mês podem pesar" | 69 | **CORRETO mas genérico**. Em Curitiba condomínio médio de 2-3 dorms em bairros premium (Batel, Ecoville, Bigorrilho) fica R$ 900-1.500 em 2026. Poderia citar. | dados internos/CRM FYMOOB seriam ideais |
| 15 | Dívida de condomínio também propter rem (não mencionada) | — | **OMISSÃO IMPORTANTE**. Post fala só de IPTU. Condomínio também é propter rem (art. 1.345 CC). Deveria estar no item 11 ou 13. | [Conjur — Novo dono paga dívida condomínio](https://www.conjur.com.br/2011-set-13/dono-imovel-pagar-dividas-pendentes-condominio/), [Sindiconet — Propter Rem condomínio](https://www.sindiconet.com.br/informese/propter-rem-no-condominio-dividas-e-obrigacoes-para-moradores-leis-normas-e-regras) |

**Veredicto YMYL:** base factual sólida, 2 ajustes numéricos obrigatórios (registro 0,8%→1%, parcela 30% escopo), 1 omissão estruturalmente relevante (dívida condomínio propter rem), 1 expansão estratégica (averbação como risco de 20-40%).

---

## Auditoria estrutural (tabela)

| Regra manual | Status | Evidência | Ação |
|---|---|---|---|
| R1 — Abertura proibida: definição genérica | **FALHA** | Linha 10: "Comprar um imóvel é provavelmente a maior decisão financeira da sua vida" — é **literalmente** o clichê #5 dos "cliché supremo" banidos | Reescrever lide |
| R2 — Primeira frase carrega número ou contradição | **FALHA** | Abertura é reflexão genérica, zero número | Reescrever |
| R3 — Lide 2-4 frases | **BORDERLINE** | Tem 3 frases + 1 "Dica:" — conta como 4. OK. | Manter compressão |
| R4 — Ritmo 3-1-3 nos primeiros 500 palavras | **FALHA** | Post entra direto em H2 "Verificações estruturais" sem pulso rítmico | Adicionar parágrafo-ponte |
| R5 — Subtítulos são perguntas/promessas concretas | **FALHA** | H2s atuais: "Verificações estruturais", "Verificações do condomínio", "Verificações documentais", "Verificações financeiras", "Verificação do bairro" — **rótulos puros**, proibidos | Reescrever todos os H2 |
| R6 — Tabela comparativa no TOP | **FALHA** | Zero tabela no post inteiro | Adicionar "tabela resumo dos 25 itens com peso de risco" após lide |
| R7 — Frase curta a cada 3-5 frases longas | **FALHA** | Texto corrido, listas em bullets, zero variação rítmica | Inserir punch lines |
| R8 — Number drop | **FALHA** | Não há número-chave repetido lide→meio→fim. R$ 80 mil (título sugerido) precisa ser ancorado | Inserir número-chave |
| R9 — Citar fonte sem quebrar fluxo | **FALHA** | Zero fontes linkadas no post (Prefeitura, Colégio Notarial, STJ, BCB) — isso é fatal em YMYL pós update E-E-A-T | Adicionar 6-8 links externos |
| R10 — CTA in-line, não bloco gritante | **PARCIAL** | Tem 2 CTABox (linha 112 e 167), mas são os únicos CTAs — zero in-line discreto | Adicionar 1-2 CTAs contextuais in-line |
| R11 — Fechamento é provocação/próximo passo | **FALHA** | Linha 161-165: "Um imóvel que passa nos 25 itens deste checklist é um imóvel seguro para comprar. Se falhar..." — é resumo, não provocação | Reescrever fechamento |
| R12 — Dados desatualizados = post morto | **PARCIAL** | Tem "(valores referenciais de abril/2026)" na linha 132, mas só pra ITBI. Resto dos números sem data. | Adicionar "Verificado em abril/2026" global |
| R13 — Callout a cada 3-5 H2 | **FALHA** | Zero callouts (só 2 CTABox, que são ad units, não callouts informacionais) | Adicionar 3 `<CalloutBox>` informacionais |
| R14 — FAQ no final com PAA | **FALHA** | Zero FAQ. Perde featured snippets e tráfego long-tail | Adicionar 5 FAQs |
| R15 — Zero "wikipedia voice" | **PASSA** | Texto é direto, zero "cabe destacar"/"nesse sentido". Ponto forte do post. | Manter |
| **Extra — Autoria E-E-A-T** | **PARCIAL** | Tem `author: "Bruno César de Almeida"` no frontmatter, mas não exibe CRECI nem bio no corpo | Adicionar bio + CRECI do Bruno no rodapé |
| **Extra — Hiperlocal Curitiba** | **PASSA (leve)** | Cita Curitiba em posição solar, ventilação, ITBI 2,7%. Bom. | Manter |
| **Extra — Internal links** | **FALHA** | 1 CTA pra /busca. Zero link pra `/imoveis/[bairro]`, `/guia`, outros posts do blog. | Adicionar 4-5 internal links |

**Veredicto estrutural:** 10 falhas, 3 parciais, 3 passes. Este é um post **tecnicamente correto mas editorialmente pré-manual** — precisa de reescrita pesada de intro + H2s + FAQ + callouts. **Não precisa tocar no miolo dos 25 itens**, que é a parte boa e útil.

---

## Títulos (ranked — 45-55 chars)

Ponto de partida: *"Este item esquecido no checklist faz brasileiro perder R$ 80 mil na compra do primeiro imóvel"* — 92 chars. **Muito longo**. E R$ 80 mil **não tem ancoragem direta no post**. Mas é sustentável se virar "averbação pendente = 20-40% de desvalorização + dívida oculta", em imóvel de R$ 400-500k dá R$ 80-200k. Validado.

Titles ranqueados (todos ≤55 chars, com número ou loss aversion):

### 1. (recomendado) `O item esquecido que faz perder R$ 80 mil no imóvel` — 52 chars

- **Por quê:** mantém a promessa do título sugerido inicial, mas enxuga. "Item esquecido" preserva curiosity gap. "R$ 80 mil" é number drop loss aversion. Cabe no SERP mobile (60 chars é o teto).
- **Entrega:** o "item esquecido" = averbação pendente (item 20 do checklist). Expandir essa seção com o cálculo dos R$ 80 mil.
- **SEO primário:** "checklist compra imóvel" fica no H1 ou no primeiro H2.

### 2. `Checklist 25 itens: o erro de R$ 80 mil em 2026` — 48 chars

- Ranking + number drop + ano. Mais "informativo", menos curiosity gap.
- Trade-off: palavra-chave primária ("checklist") no início = SEO forte, mas perde um pouco da tensão do #1.

### 3. `Comprar imóvel em 2026: 25 itens antes de assinar` — 50 chars

- Mais conservador, entrega pura. Perde curiosity gap mas é honesto e evergreen.
- Fallback caso Bruno queira algo menos "sensacionalista".

### 4. `5 documentos ocultos que o vendedor não quer mostrar` — 53 chars

- Ângulo "adversarial vendedor vs comprador". Alto CTR em YMYL.
- Problema: exige reestruturar o post pra focar em 5 documentos, não nos 25 itens. Maior custo de reescrita.

### 5. `Checklist imóvel 2026: R$ 80 mil que ninguém conta` — 50 chars

- Palavra-chave + ano + number drop + curiosity gap. Versão híbrida.
- Ficaria ótimo se o corpo entregar o número no 1º H2.

**Meta description recomendada (155 chars):**
> 25 verificações essenciais antes de comprar imóvel em 2026: do item da averbação que custa R$ 80 mil ao documento que faz você herdar dívida do vendedor.

---

## Lide reescrito

**Template escolhido:** Number Drop (preferido pra guias YMYL evergreen, conforme manual seção "5 templates de hook").

### Opção A (recomendada) — Number Drop puro

> Comprar um imóvel com averbação pendente custa em média R$ 80 mil — e a pegadinha não aparece em nenhum anúncio. O problema está na matrícula, na dívida de condomínio que você herda do vendedor, e em 3 certidões que o corretor "esquece" de pedir. Este é o checklist de 25 itens que a gente usa em Curitiba antes de liberar qualquer contrato.

- 3 frases. Regra 3 OK.
- Primeira frase: número + contradição ("não aparece em nenhum anúncio"). Regras 2 + 8 OK.
- Última frase: autoridade local + promessa concreta. Regra 5 Template hook + E-E-A-T ancorado.
- Números ("R$ 80 mil", "3 certidões", "25 itens") se repetem no corpo.

### Opção B — Contradição/Mito

> Todo mundo olha o imóvel. Quase ninguém olha o contrato. E é aí que o brasileiro perde R$ 80 mil em média: não na visita, mas nas 3 linhas da matrícula que o corretor não mostra. Esse é o checklist de 25 itens que resolve antes de você assinar.

- 4 frases. Regra 3 no limite.
- Primeira frase: contradição curta. Regra 2 OK.
- "R$ 80 mil" number-drop. "25 itens" promessa. Regra 8 OK.

---

## Mudanças estruturais

### Prioridade 1 (must-have, bloqueiam publicação)

1. **Título:** trocar por `O item esquecido que faz perder R$ 80 mil no imóvel`.
2. **Lide:** substituir linhas 10-12 pela Opção A acima.
3. **H2s:** reescrever os 5 rótulos por perguntas/promessas:
   - `Verificações estruturais` → `Os 10 itens da visita que pesam no bolso depois`
   - `Verificações do condomínio` → `5 sinais de que o condomínio vai virar dor de cabeça`
   - `Verificações documentais` → `Os 5 documentos que impedem você de herdar dívida do vendedor`
   - `Verificações financeiras` → `A conta completa: 5-7% além do preço que ninguém mostra`
   - `Verificação do bairro` → `O entorno que valoriza (ou mata) o imóvel em 5 anos`
4. **Tabela resumo no topo** (logo após lide): "Os 25 itens em 1 tabela — risco X custo de ignorar" com 3 colunas (item, risco, custo médio em R$).
5. **Corrigir Registro ~0,8% → ~1%** (linha 129).
6. **Adicionar dívida de condomínio como propter rem** no item 13 (Inadimplência) ou como novo item 14-bis — risco de ~R$ 5-30k que o novo dono herda.
7. **Adicionar 3 callouts** (`<CalloutBox>` — o post já importa o componente em outras páginas):
   - Após H2 estruturais: "Se fissura >1mm for diagonal, peça laudo de engenheiro antes de fazer proposta. Custo: R$ 500. Risco de ignorar: R$ 80 mil de reforma estrutural."
   - Após H2 documental: "Matrícula tem validade de 30 dias (Decreto 93.240/1986). Se o vendedor te der uma de 60 dias, desconfie."
   - Após H2 financeiro: "Regra dos 30%: a parcela do financiamento não pode passar de 30% da renda bruta (Resolução BCB 4.676/2018). Condomínio + IPTU entram na prática bancária, mas não na regra formal."
8. **FAQ no final com 5 PAAs** (sugerido do Google "compra imóvel"):
   - Quais documentos pedir ao comprar um imóvel?
   - Quanto custa a documentação de um imóvel em 2026?
   - O que é averbação e por que é importante?
   - Comprei imóvel com dívida, o que fazer?
   - Posso financiar imóvel sem habite-se?

### Prioridade 2 (melhorias, não-bloqueantes)

9. **Ajustar faixa avaliação bancária:** R$ 2.000-4.000 → R$ 2.800-4.500 (piso obsoleto).
10. **Acrescentar faixas reduzidas de ITBI em Curitiba** (0,5% e 1,6%) no item 22 — informação útil que o post omite.
11. **Reescrever conclusão** (linhas 161-165): trocar resumo por provocação.
    - Sugestão: *"Não assina sem os 25 itens. E não confia em checklist que não cita fonte — inclusive este. Antes de fechar, peça a matrícula atualizada, a certidão de ônus e o CNDT do vendedor no mesmo dia. Se o vendedor travar em qualquer um dos três, desiste: tem coisa escondida."*
12. **Adicionar 4-5 internal links** no corpo:
    - Item 18 (IPTU) → `/blog/itbi-curitiba-2026` (quando existir)
    - Item 22 (custos) → `/blog/financiamento-caixa-itau-bradesco-comparativo`
    - CTA bairro → `/imoveis/batel`, `/imoveis/agua-verde`
    - Glossário → `/guia/glossario` (averbação, habite-se, ITBI, propter rem)
13. **Adicionar bio/CRECI do Bruno no rodapé** (E-E-A-T — obrigatório em YMYL pós-update dez/2025).
14. **Reading time visível no topo** (~10 min de leitura — post é longo e merece o signal).
15. **`updatedAt: "2026-04-23"` no frontmatter** (hoje só tem `date`).

### Não tocar (está bom)

- Os 25 itens em si (miolo técnico sólido).
- Voz em geral — zero wikipedia voice, passou na Regra 15.
- Referência a Curitiba (posição solar, umidade, ITBI 2,7%) — local ✔.
- CTABox final de acompanhamento com corretor — é o CTA certo pra esse tipo de post.

---

## Fontes

**ITBI e taxas Curitiba/PR:**
- [Prefeitura de Curitiba — ITBI base e alíquotas](https://www.curitiba.pr.gov.br/servicos/itbi-base-de-calculo-e-aliquotas/512)
- [Colégio Notarial do Brasil — Seção PR — ITBI](https://cnbpr.org.br/links/itbi/)
- [TJPR — Tabela de custas extrajudicial](https://www.tjpr.jus.br/documents/12471/3463145/TABELA+DE+CUSTAS+EXTRAJUDICIAL/a032b7be-6e63-6b5a-0414-988060d7a9f0)
- [8º Registro de Imóveis de Curitiba — Tabela](https://www.8registro.com.br/tabela)
- [LARYA — Calculadora ITBI 2026](https://larya.com.br/itbi)
- [LARYA — Taxas de compra imóvel 2026](https://larya.com.br/blog/quais-taxas-tenho-que-pagar-na-compra-de-imovel/)

**Propter rem e jurisprudência:**
- [STJ 1ª Seção Repetitivo — Art. 130 CTN](https://www.ibet.com.br/stj-1a-secao-repetitivo-iptu-imovel-arrematado-em-hasta-publica-irresponsabilidade-arrematantes-hipotese-dividas-anteriores-a-arrematacao-interpretacao-artigo-130-ctn-edital-da-prac/)
- [Merten Advocacia — IPTU propter rem](https://merten.adv.br/2022/07/08/iptu-obrigacao-tributaria-de-natureza-propter-rem-que-acompanha-o-imovel/)
- [Conjur — Novo dono paga dívida condomínio](https://www.conjur.com.br/2011-set-13/dono-imovel-pagar-dividas-pendentes-condominio/)
- [Sindiconet — Propter Rem condomínio](https://www.sindiconet.com.br/informese/propter-rem-no-condominio-dividas-e-obrigacoes-para-moradores-leis-normas-e-regras)
- [Harada Advogados — Obrigação propter rem](https://haradaadvogados.com.br/obrigacao-propter-rem/)

**Documentos e certidões:**
- [Registro de Imóveis do Brasil — Matrícula](https://www.registrodeimoveis.org.br/servicos/matricula)
- [Quinto Andar — Matrícula do imóvel](https://www.quintoandar.com.br/guias/manual-imobiliario/matricula-de-imovel/)
- [Quinto Andar — Certidões necessárias compra](https://www.quintoandar.com.br/guias/como-comprar/quais-certidoes-necessarias-para-compra-de-imovel/)
- [Creditas — Documentos necessários](https://www.creditas.com/exponencial/documentos-necessarios-para-compra-de-imovel/)
- [nradvocacia — Regularizar Imóvel 2026](https://nradvocacia.com.br/documentos-para-regularizar-um-imovel/)
- [nradvocacia — Escritura de Imóveis 2026](https://nradvocacia.com.br/escritura-de-imoveis/)
- [Cartório Paulista — Checklist compra e venda](https://www.cartoriopaulista.com.br/noticias/detalhe/checklist-do-processo-de-compra-e-venda-de-imovel)

**Averbação pendente:**
- [Quinto Andar — Imóvel não averbado](https://www.quintoandar.com.br/guias/como-comprar/imovel-nao-averbado/)
- [nradvocacia — Imóvel não averbado 2026](https://nradvocacia.com.br/imovel-nao-averbado/)
- [CashMe — Averbação de construção](https://www.cashme.com.br/blog/tudo-o-que-voce-precisa-saber-sobre-averbacao-de-construcao/)

**Regra dos 30% da renda:**
- [Lei 8.692/1993 — Planalto](https://www.planalto.gov.br/ccivil_03/LEIS/l8692.htm)
- [Resolução BCB 4.676/2018](https://normativos.bcb.gov.br/Lists/Normativos/Attachments/50628/Res_4676_v8_P.pdf)
- [FinanZero — 30% da renda](https://finanzero.com.br/blog/financiamento-nao-pode-ultrapassar-30-da-renda-entenda/)

**Golpes e riscos:**
- [RIB-PR — Golpes na venda de imóveis](https://ribpr.org.br/noticias/view/golpe-na-venda-de-imoveis-saiba-como-se-proteger)
- [Anuário Brasileiro de Segurança Pública 2024 — 2,17M casos estelionato/ano](https://forumseguranca.org.br/)

---

**Dono do arquivo:** parent agent de coordenação de revisão 23/04/2026.
**Próximo passo:** Bruno aprova título #1 + escopo das 8 mudanças P1 → Wagner/freelance executa reescrita (4h estimadas, não mexe nos 25 itens, só intro + H2s + callouts + FAQ + fechamento).
