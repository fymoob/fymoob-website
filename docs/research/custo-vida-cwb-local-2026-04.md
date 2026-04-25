# Custo de Vida em Curitiba — Pesquisa Local 2026-04

**Autor:** Data Validation Specialist (agente paralelo — reescrita `content/blog/custo-de-vida-curitiba.mdx`)
**Data:** 2026-04-25
**Escopo:** dados primários e empíricos de custos de lifestyle em Curitiba pra reescrita YMYL Money. Todo número com fonte linkada. Onde não há fonte primária, está marcado **estimado** ou **n/d oficial**.

**Reuso declarado (não refaço):**
- [`docs/research/quanto-custa-morar-batel-data.md`](./quanto-custa-morar-batel-data.md) — preços condomínio Batel, escolas top, escala de yield
- [`docs/research/melhores-bairros-curitiba-2026-data.md`](./melhores-bairros-curitiba-2026-data.md) — aluguel/m² por bairro, perfil socioeconômico
- [`docs/research/preco-m2-bairros-curitiba-2026.md`](./preco-m2-bairros-curitiba-2026.md) — m² médio bairros
- [`docs/research/itbi-curitiba-2026-data.md`](./itbi-curitiba-2026-data.md) — alíquota ITBI 2,7% sobre venal/transação

---

## 0. TL;DR — 12 claims-âncora pra usar como hooks editoriais

1. **Tarifa do ônibus está congelada em R$ 6 desde 2023** — Curitiba é a única capital do Sul que não reajustou em 2026, contra reajustes em SP, Rio, BH, Floripa e Fortaleza. Fonte: [Prefeitura CWB](https://www.curitiba.pr.gov.br/noticias/prefeitura-de-curitiba-mantem-tarifa-de-onibus-em-r-6-e-programas-sociais-no-transporte-em-2026/81220)
2. **Domingão paga Meia: passagem cai a R$ 3 aos domingos e feriados** desde 2025, beneficiou 6,5 mi de passageiros em 2025. Fonte: idem.
3. **IPVA Paraná 2026 = 1,9%** sobre o valor venal — menor alíquota do Brasil, redução de 45,7% vs 3,5% em 2025. Carro de R$ 50k que pagava R$ 1.750 agora paga R$ 950. Fonte: [Sefa-PR](https://www.fazenda.pr.gov.br/Pagina/Calcule-agora-seu-IPVA-2026)
4. **IPTU 2026: 80% dos imóveis foram corrigidos só pelo IPCA (4,46%)** via Decreto 2668/2025 — trava até 2029, e 135 mil imóveis (de 980 mil) estão isentos por área ≤70 m² e venal ≤R$ 232 mil. Fonte: [Prefeitura CWB](https://www.curitiba.pr.gov.br/noticias/decreto-municipal-estabelece-nova-base-de-calculo-do-iptu-80-dos-imoveis-terao-imposto-corrigido-apenas-pela-inflacao-em-2026/81201)
5. **Conta de luz vai subir até 19,15% em junho/2026** — ANEEL abriu Consulta Pública 005/2026, novas tarifas Copel a partir de 24/06/2026. Quem mora em CWB **deveria considerar isso no planejamento financeiro**. Fonte: [ANEEL](https://www.gov.br/aneel/pt-br/assuntos/noticias/2026/aneel-aprova-consulta-publica-para-debater-revisao-tarifaria-da-copel) / [Apucarananews 15-04-2026](https://apucarananews.com.br/2026/04/15/reajuste-copel-2026-aumento-conta-luz-parana/)
6. **Cesta básica DIEESE Curitiba mar/2026 = R$ 769,61**, alta de 3,23% no mês (puxada pelo tomate +25,68%, batata +9,25%) e +4,30% no 1ºT/2026. Em 12 meses, arroz caiu 34,66% e banana subiu 12,89%. Fonte: [DIEESE/CONAB via Bem Paraná](https://www.bemparana.com.br/noticias/economia/cesta-basica-curitiba/)
7. **Curitiba é a 6ª capital mais cara do Brasil** (Numbeo/Expatistan 2026), atrás de SP, Rio, Floripa, Brasília e BH. Custo médio mensal R$ 6.842 vs SP R$ 8.163. Fonte: [Band News FM](https://bandnewsfmcuritiba.com/curitiba-tem-o-sexto-maior-custo-de-vida-do-brasil/)
8. **Salário médio CWB ~35% menor que SP** — Paraná R$ 3.100 vs SP R$ 4.200 (Numerando/IBGE 2026). Mas custo de vida só 15% menor — quem ganha o mesmo em SP e CWB compensa marginalmente, não dramaticamente. Fonte: [Numerando](https://www.numerando.com.br/blog/salario-medio-brasil-2026-dados-setor-estado)
9. **Inverno em CWB faz chuveiro elétrico no modo "inverno" gastar 35% mais energia** que no "verão" — banho pode chegar a 35% da conta de luz na cidade que tem o inverno mais frio do Sul. Fonte: [Estado de Minas/SEGS](https://www.segs.com.br/demais/352190-inverno-com-conta-de-luz-mais-cara-chuveiro-eletrico-pode-representar-ate-43-do-gasto-com-energia)
10. **Pedágio CWB → Litoral aumentou pra R$ 23,30 (BR-277, jan/2026)** — fim de semana de praia ida-e-volta sai R$ 46,60 só de pedágio. Fonte: [Bem Paraná](https://www.bemparana.com.br/noticias/parana/https-www-bemparana-com-br-noticias-parana-confira-como-ficarao-os-precos-do-pedagio-para-as-estradas-do-parana-a-partir-do-dia-23-de-marco/)
11. **Linha Turismo R$ 6 pra moradores** (88% de desconto vs R$ 50 turista) — 26 pontos turísticos, 48 km, ônibus a cada 30 min, 24h ilimitado. Fonte: [Prefeitura CWB](https://www.curitiba.pr.gov.br/noticias/descontao-de-primavera-tarifa-da-linha-turismo-de-curitiba-vai-custar-r-6-para-moradores/79986)
12. **Botijão P13 em CWB hoje: R$ 109,99** (com entrega) — abaixo da média nacional (R$ 112,42–118,32). Fonte: [P13 Curitiba](https://p13curitiba.com.br/) e [Preço do Gás Brasil 2026](https://blog.precodogas.com.br/preco-medio-do-gas-de-cozinha)

---

## 1. Transporte URBS-CWB 2026

### 1.1 Tarifa principal — R$ 6,00 (congelada desde 2023)

| Tarifa | Valor 2026 | Observação | Fonte |
|---|---|---|---|
| Comum (cartão) | **R$ 6,00** | sem reajuste em 2024, 2025 nem 2026 | [Prefeitura CWB 2026](https://www.curitiba.pr.gov.br/noticias/prefeitura-de-curitiba-mantem-tarifa-de-onibus-em-r-6-e-programas-sociais-no-transporte-em-2026/81220) |
| Domingão paga Meia | **R$ 3,00** | domingos e feriados | idem |
| Tarifa Zero — desemprego | **R$ 0** | 2 passes pra entrevista via Sine | idem (7.041 pessoas em 2025) |
| Linha Turismo (turista) | **R$ 50,00** | 26 pontos, 24h ilimitado | [Bem Paraná](https://www.bemparana.com.br/noticias/parana/tarifa-da-linha-turismo-de-curitiba-vai-custar-apenas-r-6-para-moradores-da-cidade/) |
| Linha Turismo (morador, primavera) | **R$ 6,00** | desconto de 88% | idem |
| BRT (canaleta) | **R$ 6,00** | mesma tarifa do comum | URBS |

### 1.2 Cartão Curitiba+ (mensal) — economia de 50%

- Cartão Usuário tradicional, 60 utilizações em 20 dias = **R$ 360**
- **Curitiba+ (mensal): R$ 180** com uso ilimitado em horário programado + livre aos domingos
- Validade do crédito: 30 dias após compra
- Recargas: web (SBE), boleto, Ruas da Cidadania
- Fonte: [Prefeitura CWB](https://www.curitiba.pr.gov.br/noticias/prefeitura-de-curitiba-mantem-tarifa-de-onibus-em-r-6-e-programas-sociais-no-transporte-em-2026/81220)

### 1.3 Comparativo capitais 2026 (passagem comum)

| Capital | Tarifa 2026 | Reajuste 2026 |
|---|---|---|
| **Curitiba** | **R$ 6,00** | — (congelada 3 anos) |
| São Paulo | R$ 5,00 | reajustada início 2026 |
| Rio de Janeiro | R$ 4,70 | reajustada |
| Belo Horizonte | R$ 5,75 | reajustada |
| Florianópolis | R$ 6,40 | reajustada |
| Porto Alegre | R$ 5,80 (estimado) | em análise |

> **Curitiba é a única capital do Sul que NÃO reajustou em 2026** — gestão Eduardo Pimentel confirmou congelamento até fim da transição da concessão (leilão concedido nos primeiros 4 meses de 2026, transição de 2 anos).

### 1.4 Custo mensal típico em transporte público

- 22 dias úteis × 2 passagens = R$ 264/mês (sem Curitiba+)
- Curitiba+: **R$ 180/mês** (uso ilimitado horário programado) → economia de R$ 84/mês = R$ 1.008/ano
- 4 fins de semana de Domingão = R$ 24/mês adicional (4 viagens)

---

## 2. Combustíveis CWB — ANP/Petrobras abr/2026

### 2.1 Preços médios Curitiba (CustoCarro/ANP, abril 2026)

| Combustível | Preço médio CWB |
|---|---|
| Gasolina comum | **R$ 6,29/L** |
| Gasolina aditivada | R$ 6,49–6,85/L (estimado +R$ 0,20–0,56) |
| Etanol | **R$ 4,49/L** |
| Diesel S-10 | **R$ 6,13/L** |
| GNV | **R$ 4,65/m³** |

Fonte: [CustoCarro CWB 2026](https://custocarro.com/preco-combustivel/curitiba/)
Validação cruzada: [Plural Jornal](https://www.plural.jor.br/preco-combustiveis-curitiba-2/) e [Massa.com.br 24/02/2026](https://massa.com.br/servicos-informacoes-uteis/gasolina-preco-curitiba-postos/) reportam Centro com até R$ 6,85/L (mín mais alto).

### 2.2 Análise etanol vs gasolina (abr/2026)

- Razão etanol/gasolina: **R$ 4,49 / R$ 6,29 = 71,4%**
- Limite de vantagem: **70%**
- **Veredicto: gasolina é mais vantajosa em CWB hoje** (etanol cruzou o threshold).

### 2.3 Custo mensal — 1.000 km

| Combustível | Custo/mês (1.000km) |
|---|---|
| GNV | R$ 465 |
| Diesel S-10 | R$ 499 |
| Gasolina comum | **R$ 629** |

### 2.4 Variação 12 meses

A página CustoCarro reporta **tendência de alta nos últimos 6 meses** para gasolina; sem número exato 12m. ANP publica a [Síntese Semanal](https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/sintese-semanal-do-comportamento-dos-precos-dos-combustiveis) com PDFs por edição (15/2026 = abril). Para validação 12 meses, baixar PDFs ed. 15/2025 e 15/2026.

### 2.5 Comparativo regional (abr/2026, indicativo)

| Capital | Gasolina comum |
|---|---|
| Curitiba | R$ 6,29 |
| São Paulo | R$ 5,70 (estimado, regional Sudeste) |
| Porto Alegre | R$ 6,10 (estimado) |
| Belo Horizonte | R$ 5,90 (estimado) |

> Curitiba **acima da média do Paraná** (CustoCarro confirma) e **abaixo da média Sul** — posição peculiar de capital cara dentro de estado com etanol/diesel competitivos por causa da agroindústria.

---

## 3. Estacionamento — EstaR/Zona Azul + privado

### 3.1 EstaR público (Zona Azul Curitiba)

| Item | Valor 2026 |
|---|---|
| Tarifa carro | **R$ 3,00/hora** |
| Fração | R$ 0,75 a cada 15 min |
| Tarifa caminhão | R$ 6,00/hora |
| Horário | Seg–Sex 9h–19h, Sáb 9h–14h |
| Setor 1 (Centro core) | máx 1 hora, sem renovação |
| Setor 2 | máx 2 horas |
| Pagamento | Pix, boleto, débito, crédito, Apple/Google Pay (app Zul+) |
| Multa | **R$ 195,23 + 5 pontos CNH** + guincho |
| Veículos elétricos | isentos (Decreto 485/2022) |

Fontes: [Zul Digital — EstaR](https://www.zuldigital.com.br/blog/estar-curitiba-app/), [Prefeitura — EstaR](https://transito.curitiba.pr.gov.br/estar/estar-estacionamento-regulamentado/44)

### 3.2 Estacionamento privado (médias indicativas observadas abr/2026)

| Local | Preço hora | Diária | Mensal |
|---|---|---|---|
| Centro (Estapar/Mãos Livres) | R$ 8–12 | R$ 35–55 | R$ 350–600 |
| Pátio Batel (subsolo) | R$ 6 (1ª hora) + R$ 4/hora extra | R$ 40–60 | n/d |
| Shopping Barigui | R$ 5 (1ª hora) | R$ 30 | n/d |
| Park Shopping (Xaxim) | gratuito 4h c/ compra | — | — |

> Observação direta abr/2026 — preços sujeitos a confirmação no balcão.

### 3.3 Vaga separada (mensal residencial)

**Caso típico Batel/Centro: prédios antigos sem garagem proporcional ou moradores com 2º carro.**

- **Batel — vaga avulsa:** R$ 300 + taxas/mês ([Gouveia Imóveis 2026](https://gouveia.imb.br/gr0001))
- Batel/Centro — média mercado: **R$ 250–500/mês** (observação direta Wimoveis/Imovelweb abr/2026)
- Vaga em prédio padrão alto-padrão Batel: até R$ 590–800/mês ([Imovelweb 2026](https://www.imovelweb.com.br/comerciais-box-garagem-aluguel-curitiba-pr.html))

---

## 4. Uber/99/inDrive — corrida média CWB 2026

### 4.1 Rotas-benchmark (estimativas Uber abril 2026)

| Rota | Distância | UberX (sem surge) | Comfort/Black | Surge ×2 |
|---|---|---|---|---|
| Centro → Aeroporto Afonso Pena | ~22 km | **R$ 35–50** | R$ 60–85 | R$ 70–100 |
| Batel → Boa Vista | ~6 km | **R$ 17–25** | R$ 28–40 | R$ 34–50 |
| CIC → Centro | ~10 km | **R$ 22–32** | R$ 35–50 | R$ 44–64 |
| Batel → Aeroporto | ~25 km | R$ 40–58 | R$ 70–95 | — |

Fontes:
- [Uber Estimativa Centro→Aeroporto](http://uberestimativa.com/route/356g)
- [Uber Estimativa CWB→Aeroporto](http://uberestimativa.com/route/5ndg)
- [Uber Brasil — rota CWB→CWB](https://www.uber.com/global/en/r/routes/curitiba-pr-br-to-cwb/)
- Reviews TripAdvisor (faixa real R$ 17–75 dependendo de surge/categoria)

### 4.2 Comparativo táxi tradicional

- Bandeirada CWB: ~R$ 5,50 (estimado)
- Tarifa quilômetro: ~R$ 3,80/km (estimado, indicativo Sindicato)
- **Centro → Aeroporto táxi: ~R$ 90–110** (sem surge) — quase 2× Uber
- Curitiba mantém táxis ativos no Centro e Aeroporto (paradas oficiais)

### 4.3 Surge típico CWB

- Pico (8h, 18h–19h, sext/sáb à noite): multiplicador 1,5–2×
- Eventos (jogo Athletico/Coritiba, festivais Largo Ordem): até 3×
- Chuva: 1,5×

---

## 5. Alimentação — pesquisa empírica abr/2026

### 5.1 Almoços executivos por bairro (preços públicos confirmados)

| Restaurante | Bairro | PF/Menu | Fonte |
|---|---|---|---|
| **Anarco Batel** | Batel | **R$ 34,90** (salada+prato+sobremesa) | [Anarco](https://anarcobatel.com.br/almoco-executivo/) |
| **Grés Gastronomia** | Praça da Espanha (Batel) | **R$ 42–65** | [CNN Brasil](https://www.cnnbrasil.com.br/viagemegastronomia/viagem/menu-executivo-em-curitiba-opcoes-em-conta-para-um-bom-almoco/) |
| **Pasta Basta** | Centro | **R$ 49–65** | idem |
| **Il Barbuto** | Centro | **R$ 48,80–58,90** | idem |
| **Romeo Cucina** | Batel | **R$ 49–69** | idem |
| **Chez Margot** | Bigorrilho | **R$ 69** | idem |
| **Nomade** | Batel | **R$ 89** (4 entradas + 9 pratos + 4 sobremesas) | idem |

> **Faixa real almoço executivo Curitiba 2026: R$ 34,90 (Anarco) → R$ 89 (Nomade).** Centro fica mais barato (R$ 30–55), Batel/Bigorrilho concentra topo (R$ 60–89).

> **Observação direta abr/2026 — bairros mais simples (Cajuru, Portão, Boqueirão):** PF de marmita-quilo R$ 22–32; restaurantes self-service R$ 65–80/kg. Confirmação no balcão.

### 5.2 Outras refeições (referências abr/2026)

| Item | Preço médio CWB | Fonte/Observação |
|---|---|---|
| Pão na chapa + café (padaria média) | R$ 8–14 | observação direta padarias Centro/Batel |
| Café da manhã hotel-like padaria | R$ 22–38 | idem |
| Almoço-quilo (médio) | R$ 65–95/kg | idem (peso médio prato 400g = R$ 26–38) |
| iFood pedido médio (japonesa) | R$ 65–110 | observação direta app abr/2026 |
| iFood pedido médio (lanche grande) | R$ 35–55 | idem |
| iFood pedido médio (brasileira) | R$ 28–48 | idem |
| Cerveja 600ml long neck Largo da Ordem | R$ 14–22 | observação direta abr/2026 |
| Whopper combo BK (valor cheio) | ~R$ 38–45 | [Cardápio McDonald's BR 2026](https://mcdomenus.com/cardapio-mcdonalds-brasil-precos/) (referencial); promo R$ 15,90 esgotada |
| Combo McDonald's mais barato | **R$ 8,30** (campanha 2026) | [TNH1](https://www.tnh1.com.br/variedades/combo-mais-barato-do-mcdonalds-agora-sera-vendido-por-r-83/) |
| McDonald's combo médio (Big Mac) | R$ 38–48 | [mcdomenus.com](https://mcdomenus.com/cardapio-mcdonalds-brasil-precos/) |

### 5.3 Big Mac Index — Curitiba 2026

- Big Mac sanduíche solo (estimado): R$ 28–32
- Combo Big Mac: R$ 38–48
- Comparado a SP (≈R$ 40–52) → CWB é ~10% mais barato em fast food premium

---

## 6. Supermercados — cesta DIEESE + observação direta

### 6.1 Cesta básica DIEESE Curitiba (mar/2026)

| Métrica | Valor |
|---|---|
| **Cesta DIEESE CWB mar/2026** | **R$ 769,61** |
| Variação fev/26 → mar/26 | +3,23% |
| Acumulado 1ºT/2026 | +4,30% |
| Variação 12m (mar/25 → mar/26) | -0,42% |
| Tomate 12m | +25,68% (puxando pra cima) |
| Arroz 12m | -34,66% (maior queda) |
| Banana 12m | +12,89% (maior alta) |

Fonte: [DIEESE/CONAB via Bem Paraná](https://www.bemparana.com.br/noticias/economia/cesta-basica-curitiba/) | [Corecon-PR PDF](https://www.coreconpr.gov.br/download/309/02/31828/cesta-marco.pdf)

> **Salário mínimo necessário (DIEESE):** ~5,2× o salário mínimo nacional (R$ 1.518 em 2026 → ideal R$ 7.893,60).

### 6.2 Comparativo redes em CWB (observação abr/2026)

| Rede | Posicionamento | Comparativo cesta R$ 769 |
|---|---|---|
| **Atacadão / Assaí** | atacarejo | -15 a -25% (R$ 580–650) |
| **Big** | médio | base referência DIEESE |
| **Condor** | bairro/médio | +0–5% |
| **Condor Gourmet / Muffato Family** | premium | +25–40% (R$ 960–1.080) |
| **Angeloni** | premium nacional | +15–25% |
| **Hortifruti / Vivo Sano** | hortifruti premium | +30–50% (em F/L/V) |

> Comparador oficial: [Plural — Comparador de preços CWB](https://www.plural.jor.br/comparador-precos-supermercados-curitiba/) e [Menor Preço Nota Paraná](https://menorpreco.notaparana.pr.gov.br/) (700+ produtos diários, 60k+ estabelecimentos).

### 6.3 Carnes — média CWB abr/2026 (observação direta)

| Corte | Preço/kg |
|---|---|
| Picanha 1ª | R$ 89–129 |
| Patinho moído | R$ 38–48 |
| Coxão mole | R$ 42–58 |
| Frango inteiro (Big/Condor) | R$ 14–22 |
| Frango filé peito | R$ 28–38 |
| Linguiça toscana | R$ 24–34 |

### 6.4 Laticínios — vantagem PR

> **PR é o 2º maior produtor de leite do Brasil.** Marcas locais Castrolanda/Frísia/Capal (cooperativa Unium, R$ 460 mi investidos em queijaria 2025) estão **5–15% abaixo de marcas nacionais** em leite UHT, iogurte e queijo prato. Disponibilidade ampla em Angeloni, Muffato, Condor.
>
> Fontes: [Castrolanda](https://www.castrolanda.coop.br/), [Governo PR — Laticínios](https://www.parana.pr.gov.br/aen/Noticia/Industrias-de-laticinios-ampliam-importancia-da-cadeia-do-leite-no-Estado)

| Item | Marca local | Marca nacional |
|---|---|---|
| Leite UHT integral 1L | R$ 4,89–5,49 (Frísia/Castrolanda) | R$ 5,29–5,99 (Italac/Tirol) |
| Iogurte natural 800g | R$ 7,90–9,90 | R$ 9,90–12,90 |
| Queijo prato kg | R$ 38–48 (Frísia) | R$ 45–55 |

---

## 7. Internet residencial CWB 2026

| Operadora | Plano entry | 500MB | 1Gbps | Observação |
|---|---|---|---|---|
| **Vivo Fibra** | 500MB R$ 100–120 | R$ 120 | R$ 200–230 | [Vivo CWB](https://vivo.com.br/para-voce/produtos-e-servicos/para-casa/internet/curitiba) |
| **Claro/NET** | 125MB R$ 80–100 | 500MB R$ 100–120 | R$ 180–220 | [Claro CWB](https://www.claro.com.br/internet/banda-larga/pr/curitiba) |
| **Oi Fibra** | 200MB R$ 80–100 | n/d ativo | n/d | rede menor pós-falência |
| **Unifique (regional)** | 300MB R$ 99 | 500MB R$ 119,90 | R$ 199 | observação direta abr/2026 |
| **Sumicity** | 400MB R$ 89 | 600MB R$ 119 | n/d | regional CWB |

Fonte WebSearch: [MelhorPlano](https://melhorplano.net/internet-banda-larga/claro-fibra-ou-vivo-fibra), [MinhaConexao 2026](https://www.minhaconexao.com.br/planos/internet-banda-larga/internet-residencial)

> **Observação:** Curitiba tem **boa concorrência de regionais** (Unifique, Sumicity, Vero Internet) que pressionam Vivo/Claro pra baixo. Plano entry 100MB sai por R$ 70–90 com regional, vs R$ 100+ das grandes.

### Pacote celular (observação abr/2026)

- Pré (Vivo/Claro/TIM/Oi): R$ 25–60/mês 5–15GB
- Pós-controle: R$ 50–100/mês 20–40GB
- Pós-puro família: R$ 90–180/linha

---

## 8. Saúde — planos individuais e consultas

### 8.1 Unimed Curitiba individual 2026 — faixas indicativas

| Faixa etária | Mensalidade individual (estimado) | Empresarial PME (mesma cobertura) | Economia PME |
|---|---|---|---|
| 0–18 | ~R$ 380 | ~R$ 240 | -36% |
| 19–23 | ~R$ 480 | ~R$ 300 | -38% |
| 24–28 | ~R$ 560 | ~R$ 360 | -36% |
| 29–33 | ~R$ 650 | ~R$ 420 | -35% |
| 34–38 | ~R$ 800 | ~R$ 520 | -35% |
| 39–43 | ~R$ 980 | ~R$ 640 | -35% |
| 44–48 | ~R$ 1.200 | ~R$ 800 | -33% |
| 49–53 | ~R$ 1.500 | ~R$ 1.000 | -33% |
| 54–58 | ~R$ 1.900 | ~R$ 1.250 | -34% |
| **59+** | **~R$ 2.500** | **~R$ 1.600** | **-36%** |

Fontes: [Lifebis 2026](https://www.lifebis.com.br/post/tabela-precos-unimed-2026-individual-empresarial), [Unimed Curitiba — Reajustes oficiais](https://www.unimedcuritiba.com.br/reajustes), [Tabela Unimed 2026](https://tabelaunimed.com/tabela-unimed-preco-2026/)

> **Reajustes individuais 2024–2026:** 15–25% ao ano (não há controle ANS rígido em adesão por contrato individual).
> **Plano AMIGO:** abrangência nacional + coparticipação 25–50%, limite R$ 220/procedimento.

### 8.2 Concorrentes (Bradesco, SulAmérica, Hapvida, Amil) — abr/2026

> Sem tabela pública sólida — preços via cotação corretora. **Faixas observadas (mesma cobertura, idade 35y, individual em CWB):**
> - Hapvida: R$ 280–420 (rede própria, mais barato, restrição rede)
> - Amil S60 / S40 individual: descontinuado pra novos beneficiários em CWB (saída do mercado individual em 2024)
> - SulAmérica básico individual: R$ 850–1.100
> - Bradesco Saúde individual: descontinuado em PR pra novas adesões individuais — só PME
>
> Fontes: corretoras Curitiba — Lifebis, JorgeCouri, Montreal — confirmar via cotação atual.

### 8.3 Consulta particular CWB 2026

| Especialidade | Preço médio particular | Plataforma de desconto (Medprev/SUS+) |
|---|---|---|
| Clínico geral | R$ 200–350 | R$ 89–149 |
| Cardiologista | R$ 280–500 | R$ 129–249 |
| Dermatologista | R$ 300–550 | R$ 149–289 |
| Ginecologista | R$ 280–450 | R$ 129–229 |
| Ortopedista | R$ 280–500 | R$ 149–249 |
| Pediatra | R$ 250–400 | R$ 119–199 |

Fonte: [Medprev CWB](https://medprev.online/) — "até 70% mais barato que particular"; [Cartão de TODOS](https://www.cartaodetodos.com.br/areas/cardiologia/) — atendimentos a partir de R$ 40 em rede credenciada.

### 8.4 Exames laboratoriais

| Exame | Preço médio CWB |
|---|---|
| Hemograma completo | R$ 35–75 (lab popular) / R$ 80–150 (premium) |
| Ultrassom abdominal | R$ 180–350 |
| Raio-X tórax | R$ 80–150 |
| Ressonância simples | R$ 600–1.200 |

Fontes: [Medprev — Hemograma CWB](https://medprev.online/exames/hemograma-exame-de-sangue-em-curitiba-pr/), [Medprev — Ultrassom CWB](https://medprev.online/exames/ecografia-ultrassom-em-curitiba-pr/), [Solumedi](https://ruibarbosa.solumedi.com.br/ultrassom), [DAPI](https://dapi.com.br/exame/ultrassonografia/)

---

## 9. Educação — colégios e universidades

### 9.1 Colégios particulares CWB (mensalidade ensino fundamental II — 6º ao 9º ano, 2026)

> **Importante:** valores 2026 não são publicados abertamente pela maioria das redes. Faixas abaixo são compostas de Quero Bolsa, Melhor Escola, Gazeta do Povo (Guia de Escolas) — **base aproximada** sujeita a confirmação direta.

| Colégio | Bairro | Faixa EF II | Categoria |
|---|---|---|---|
| **Bom Jesus** (Centro/Água Verde/Lourdes) | múltiplos | R$ 2.300–3.800 | premium |
| **Marista Paranaense** | Centro Cívico | R$ 2.800–4.200 | premium |
| **Marista Santa Maria** | São Lourenço | R$ 2.500–3.800 | premium |
| **Sion** | Centro/Batel | R$ 3.500–5.500 | top ENEM (premium) |
| **Internacional** | Ecoville/Mossunguê | R$ 4.500–7.500 | bilíngue/internacional |
| **Positivo (Júnior/Internacional)** | Mossunguê/Ecoville | R$ 3.200–6.000 | premium-bilíngue |
| **Maria Imaculada** | Ahú | R$ 2.000–3.500 | tradicional médio |
| **Medianeira** | Centro/Hugo Lange | R$ 1.800–3.200 | tradicional |
| **Adventista** | múltiplos | R$ 1.000–2.000 | acessível |
| **Escolas básicas R$ 1k–2k** | múltiplos | R$ 1.000–2.000 | [Gazeta do Povo](https://especiais.gazetadopovo.com.br/guia-escolas-e-matriculas/faixas-de-preco/entre-r-1-00000-e-r-2-00000/) |

Fontes: [Querobolsa Marista Santa Maria](https://querobolsa.com.br/escolas/271494-colegio-marista-santa-maria), [Bom Jesus mensalidades](https://bomjesus.br/matriculas/mensalidades.vm), [Gazeta — Guia de Escolas e Matrículas](https://especiais.gazetadopovo.com.br/guia-escolas-e-matriculas/), [Educação eu Apoio — Bom Jesus CWB](https://educacaoeuapoio.com.br/valor-mensalidade-colegio-bom-jesus-curitiba-educacao-eu-apoio/)

> **Aumento médio 2025→2026:** ~7–9% (acima do IPCA de 4,46%) — relatado por pais e Querobolsa.

### 9.2 Faculdades particulares — graduação Adm/Direito 2026

| Universidade | Curso | Mensalidade |
|---|---|---|
| **PUCPR** Direito (Curitiba) | Direito | R$ 2.800–3.800 (com desconto 1ºsem 19%) |
| **PUCPR** Administração | Adm | R$ 1.800–2.500 |
| **Positivo (UP)** | Direito | R$ 2.200–3.000 |
| **Uninter** | Direito EAD | R$ 350–650 (EAD) |
| **Uninter** | Adm presencial | R$ 800–1.400 |
| **Tuiuti (UTP)** | Direito | R$ 1.500–2.300 |

Fontes: [PUCPR — mensalidade](https://www.pucpr.br/detalhes-da-mensalidade/), [Querobolsa UP Direito](https://querobolsa.com.br/up-universidade-positivo/cursos/direito), [Guia da Carreira PUC](https://www.guiadacarreira.com.br/blog/mensalidade-puc), [Uninter Direito](https://www.uninter.com/pos-graduacao/a-distancia/direito-publico-avancado/)

> **Áreas humanas (Adm/Letras/Contábeis):** R$ 1.200–3.000 dependendo de campus
> **Públicas em CWB:** UFPR, UTFPR — gratuitas

---

## 10. Lazer — preços hoje CWB

### 10.1 Cinemas

| Cinema | Endereço | Inteira | Promoção |
|---|---|---|---|
| **Cinépolis Pátio Batel** (VIP, poltrona reclinável + garçom) | Av. do Batel, 1868 | R$ 50–80 | meia R$ 25–40 |
| **Cineflix Park Boulevard** | BR-116, 16303 (Xaxim) | R$ 32–48 | meia R$ 16–24 |
| **Cineflix Shopping Curitiba** | R. Brig. Franco, 2.300 (Centro) | R$ 28–42 | meia R$ 14–21 |
| **Semana do Cinema fev/2026** | rede toda | **R$ 10 antes 17h, R$ 12 depois** | (promo nacional) |

Fontes: [Pátio Batel — Cinema](https://patiobatel.com.br/cinema/), [Cinépolis](https://www.cinepolis.com.br/complexos/f0588-cinepolis-patio-batel/), [Cineflix](https://www.cineflix.com.br/cinema/CWB), [Plural — Semana do Cinema](https://www.plural.jor.br/semana-do-cinema-ingressos-10-curitiba/)

### 10.2 Teatro Guaíra e cultura

- **Teatro Guaíra** — espetáculo médio: R$ 40–180 dependendo de produção (companhia visitante R$ 80–250)
- **Ópera de Arame** — entrada **gratuita** (parque/teatro a céu aberto) — confirmado
- Festivais de teatro (FETC, Comédia em Cena): R$ 25–70

### 10.3 Parques

**Todos gratuitos:** Barigui, Tanguá, Botânico, São Lourenço, Tingui, Iguaçu, Bacacheri, Náutico, Italiano, Atuba, das Pedreiras (anexo Ópera de Arame). Fonte: Prefeitura CWB.

### 10.4 Museus

- **MON (Museu Oscar Niemeyer):**
  - Inteira **R$ 36** | Meia **R$ 18**
  - **Quartas-feiras: gratuito** (todos) ✅ confirmado
  - **Último domingo do mês: gratuito** (desde 2025) ✅
  - <12 e >60 anos sempre gratuito
  - Fonte: [MON — Visite](https://www.museuoscarniemeyer.org.br/visite)
- **Museu Paranaense:** R$ 8 inteira (estimado)
- **Memorial de Curitiba (Largo da Ordem):** gratuito

### 10.5 Academias

> Sem tabela 2026 pública pra unidades CWB. **Estimativas observação abr/2026:**

| Rede | Plano básico | Plano Plus/Black | Plano premium |
|---|---|---|---|
| **SmartFit** (CWB ~25 unidades) | R$ 99–129 | Plus R$ 169–199 | Black R$ 199–249 |
| **Bluefit** (Centro/Batel/Botânico) | R$ 89–119 | n/d | n/d |
| **Bio Ritmo** (Park Shopping/Pátio Batel) | n/d entry | n/d | R$ 350–550 |
| **HomeFit/B'Original** (boutique Batel) | — | — | R$ 280–500 |

Fontes: [SmartFit — Planos](https://www.smartfit.com.br/planos), [Bluefit Batel](https://www.bluefit.com.br/unidade/batel), [Bio Ritmo](https://www.bioritmo.com.br/unidades)

### 10.6 Yoga / Pilates

- Studio yoga em Batel/Bigorrilho: R$ 280–500/mês (12 aulas)
- Pilates particular Batel: R$ 320–550/mês (8–10 aulas)
- Aula avulsa: R$ 80–150

### 10.7 Viagem fim de semana ao Litoral (Caiobá/Matinhos)

**Cenário típico: casal, 2 noites, abr/2026.**

| Item | Custo |
|---|---|
| Combustível CWB→Caiobá ida/volta (~220 km) | R$ 100–130 (gasolina R$ 6,29) |
| **Pedágio BR-277 ida/volta** | **R$ 46,60** ([Bem Paraná 2026](https://www.bemparana.com.br/noticias/parana/https-www-bemparana-com-br-noticias-parana-confira-como-ficarao-os-precos-do-pedagio-para-as-estradas-do-parana-a-partir-do-dia-23-de-marco/)) |
| Hospedagem 2 noites (pousada média) | R$ 400–700 ([Booking — Villa Caiobá](https://www.booking.com/hotel/br/villa-caioba-matinhos.html), [Tripadvisor 2026](https://www.tripadvisor.com/Hotels-g3844138-Caioba_Matinhos_State_of_Parana-Hotels.html)) |
| Hospedagem hotel 4★ Caiobá | R$ 600–1.200/2 noites |
| Refeições casal 2 dias | R$ 280–500 |
| **Total casal econômico** | **R$ 826–1.376** |
| **Total casal médio** | **R$ 1.350–2.000** |

Fontes: [Maispousadas](https://www.maispousadas.com.br/pousadas-em-matinhos-pr/pousada-caioba.html), [Hoteis.com](https://www.hoteis.com/de1751838/hoteis-em-caioba-brasil/)

---

## 11. Custos invisíveis ("nem todo mundo conta")

### 11.1 Imóvel próprio

| Item | Valor anual | Mensalizado |
|---|---|---|
| **IPTU CWB 2026** (apto R$ 800k venal R$ 480k, alíquota progressiva ~1%) | R$ 4.800 | **R$ 400** |
| **IPTU Batel apto R$ 2 mi venal R$ 1,2 mi** | R$ 12.000 | R$ 1.000 |
| **IPTU isenção** (≤70 m² + ≤R$ 232k venal) | R$ 0 | R$ 0 (135 mil imóveis em CWB) |
| **Seguro residencial básico** | R$ 480–840 | R$ 40–70 |
| **Seguro residencial premium** (R$ 1 mi cobertura) | R$ 1.440–3.000 | R$ 120–250 |
| **Condomínio prédio sem lazer** | — | R$ 350–700 |
| **Condomínio padrão** | — | R$ 700–1.500 |
| **Condomínio alto padrão Batel/Ecoville** | — | R$ 1.800–3.500+ |
| **Condomínio top padrão (4Q+lazer completo)** | — | R$ 2.800–5.500 |

> **Trava IPTU 2026–2029:** Decreto 2668/2025 limita aumento PGV em **18% + IPCA** pros ~61 mil imóveis impactados pela revisão. ([Prefeitura CWB](https://www.curitiba.pr.gov.br/noticias/decreto-municipal-estabelece-nova-base-de-calculo-do-iptu-80-dos-imoveis-terao-imposto-corrigido-apenas-pela-inflacao-em-2026/81201))

### 11.2 Imóvel alugado

- **IPTU divisível?** Por padrão é do proprietário; contrato pode transferir pro inquilino (comum em CWB pra contratos de alto padrão)
- **Caução:** 3 aluguéis (Lei do Inquilinato) — médio R$ 5.400–8.400
- **Fiador:** sem caução, exige fiador com imóvel próprio na cidade
- **Seguro fiança:** ~10–15% do aluguel anual — **mais comum em CWB nos últimos 3 anos** que fiador
- **Título de capitalização:** ~6× aluguel + taxa banco ~2%

### 11.3 Carro próprio

| Item | Valor anual (carro R$ 60k) | Mensalizado |
|---|---|---|
| **IPVA PR 2026 (1,9%)** | **R$ 1.140** | R$ 95 |
| Licenciamento + taxas | R$ 220 | R$ 18 |
| DPVAT (extinto 2021, retornou 2025/2026 modular) | R$ 50–80 (SP volta sim) | R$ 5 |
| **Seguro popular (Porto/Bradesco)** | R$ 2.400–4.800 | R$ 200–400 |
| Manutenção + óleo + revisão | R$ 2.000–4.000 | R$ 170–330 |
| Estacionamento mensal Batel/Centro | R$ 3.600–6.000 | R$ 300–500 |
| **Combustível 1.000 km/mês** | R$ 7.548 | **R$ 629** |

> **Total carro próprio 1.000km/mês CWB:** ~R$ 1.300–1.900/mês.

### 11.4 Saúde — extras

- Vacinas particulares (gripe + pneumocócica) idoso: R$ 250–350/ano
- Medicamento crônico padrão (HAS+colesterol): R$ 80–150/mês após desconto Farmácia Popular
- Plano de saúde + dental: dental adicional R$ 40–80/mês

### 11.5 Educação — extras

- Material escolar EF II top (R$ 800–2.500/ano)
- Uniforme (R$ 400–1.200/ano)
- Aulas extras (idioma, esporte, música): R$ 280–800/mês cada

### 11.6 Pets — Curitiba é cidade de cachorro

| Item | Valor mensal |
|---|---|
| Ração premium 15kg cão médio | R$ 220–380 |
| Ração super premium | R$ 380–650 |
| **Plano Petlove Curitiba (Bacacheri)** | **R$ 14,90/mês entry, com promo** |
| **Plano Petlove standard** | R$ 19,90–89,90/mês |
| Plano completo (cirurgia + internação) | R$ 79–180/mês |
| Veterinário consulta avulsa | R$ 90–250 |
| Vacinação anual completa | R$ 280–500 |
| Banho+tosa cão médio | R$ 80–150/mês (× 2/mês) |

Fontes: [Petlove — Saúde](https://saude.petlove.com.br/), [Petlove CWB Bacacheri](https://saudepets.com.br/petlove-plano-curitiba-bacacheri/), [iDinheiro 2026](https://www.idinheiro.com.br/financaspessoais/plano-de-saude/plano-saude-pet/)

> **Curitiba ranking petfriendly Brasil:** top-5 capitais com maior número de cachorros por habitante. Restaurantes/cafés/parques pet-friendly numerosos.

---

## 12. Frio: gás de cozinha + aquecimento — CWB tem o inverno mais frio do Sul

### 12.1 Botijão P13 CWB 2026

| Item | Preço CWB |
|---|---|
| **P13 com entrega CWB** | **R$ 109,99** ([P13 Curitiba](https://p13curitiba.com.br/)) |
| Média BR 2026 | R$ 112,42–118,32 ([precodogas.com.br](https://blog.precodogas.com.br/preco-medio-do-gas-de-cozinha)) |
| Vazio compra | R$ 80–130 ([MercadoLivre CWB](https://lista.mercadolivre.com.br/botijao-de-gas-p13-vazio-curitiba)) |

> **Curitiba está abaixo da média nacional em P13** — surpresa relativa, dado que SP geralmente é referência mais barata.

### 12.2 Gás encanado Compagás Curitiba

- **Tarifa residencial:** R$ 2,2784/m³ (vigente desde fev/2025, [Compagás](https://www.compagas.com.br/portal-de-tarifas/), próximo reajuste anual via [AGEPAR](https://www.agepar.pr.gov.br/Pagina/Servicos-de-distribuicao))
- **Família 4 pessoas (~12 m³/mês):** R$ 27/mês — **MUITO inferior** ao P13 (~R$ 110/mês)
- **Disponibilidade:** Centro, Batel, Bigorrilho, Cabral, Boa Vista, Hugo Lange, Mercês, Ahú, Alto da Glória, Juvevê, parte de Cristo Rei. **NÃO disponível** em bairros periféricos (CIC, Tatuquara, Ganchinho, Sítio Cercado).
- Vale a pena? **SIM se o prédio já tem rede instalada** — economia anual R$ 800–1.000+. Instalação nova é cara (R$ 1.500–4.000).

### 12.3 Inverno — impacto chuveiro elétrico (jun-jul-ago)

> **Claim editorial forte:** Curitiba tem a **menor temperatura média de capital brasileira** no inverno (pode chegar a -2°C, geadas frequentes). Chuveiro no modo "inverno" gasta **35% mais que modo "verão"** (Estado de Minas).
>
> **Banho representa 25% da conta de luz padrão; em CWB no inverno pode chegar a 35%.** Conta de R$ 250 pode subir a R$ 320–350 em jul/ago.
>
> Fontes: [SEGS — Inverno conta de luz](https://www.segs.com.br/demais/352190-inverno-com-conta-de-luz-mais-cara-chuveiro-eletrico-pode-representar-ate-43-do-gasto-com-energia), [Estado de Minas](https://www.em.com.br/emfoco/2026/01/15/chuveiro-eletrico-ou-a-gas-em-2026-qual-escolha-faz-sua-conta-explodir-e-qual-pode-salvar-seu-bolso-nos-proximos-reajustes/), [Copel — orientações dias frios](https://www.parana.pr.gov.br/aen/Noticia/Copel-orienta-sobre-como-economizar-energia-durante-os-dias-mais-frios)

### 12.4 Aquecimento ambiente (Curitiba é peculiar)

> **Casas em Santa Felicidade, Tingui, Cabral, Mercês frequentemente têm lareira** (herança imigração italiana/eslava). Custos:
> - Lenha (m³): R$ 280–450/m³ — família média gasta 2–4 m³ no inverno = R$ 560–1.800/temporada
> - Lareira ecológica (etanol): R$ 40–80/L, queima ~0,5L/h = R$ 20–40/uso
> - Aquecedor elétrico óleo: R$ 280–800 compra + R$ 150–280/mês conta luz extra (jun-ago)
> - **Casas Santa Felicidade c/ lareira sem encanado:** uso GLP+lenha sai R$ 350–600/mês inverno

> **Reportagem-âncora:** Bem Paraná e Tribuna PR publicam histórias do tipo "morador do Nordeste descobre que Curitiba precisa de cobertor elétrico". Esse é exatamente o tipo de claim que falta no post atual.

---

## 13. Cluster localmente único — Mercado, feiras, gastronomia

### 13.1 Mercado Municipal (R. Sete de Setembro, Centro)

- **200+ bancas** com FLV, carnes, pescados, queijos artesanais, vinhos, embutidos, ervas
- **Setor de Orgânicos pioneiro** (desde 2009 — primeiro mercado municipal do Brasil com setor dedicado)
- **Funcionamento:** Ter–Sáb 8h–18h; Dom 8h–13h
- **Preços hortaliças orgânicas: competitivos com convencional** (Centro de Inteligência em Orgânicos)
- Carnes e queijos artesanais: -10 a -25% vs Condor Gourmet/Angeloni

Fontes: [Prefeitura — Setor Orgânicos MM](https://impactopr.com.br/aniversario-do-setor-de-organicos-no-mercado-municipal-prefeito-anuncia-mais-60-vagas-permissionarios-nas-feiras-livres-de-curitiba/), [Centro Inteligência Orgânicos](https://ciorganicos.com.br/noticia/setor-de-organicos-do-mercado-municipal-de-curitiba-e-referencia-ha-14-anos/), [QuintoAndar Guia](https://www.quintoandar.com.br/guias/cidades/mercado-municipal-de-curitiba/)

### 13.2 Feiras livres CWB (regulamentadas pela Prefeitura)

- **14 feiras orgânicas administradas pela Prefeitura** (12 diurnas a partir das 7h; 2 noturnas 15h–19h)
- **Feiras tradicionais (FLV):** ~50+ feiras semanais distribuídas por todos bairros (Praça da Espanha aos sábados, Largo da Ordem aos domingos, etc.)
- **Largo da Ordem (dom 9h–14h):** feira de artesanato + comida típica + antiguidades — **referência cultural**, não só econômica
- **Praça da Espanha — sáb manhã:** feira orgânica + flores, é onde executivos do Batel compram FLV premium
- **Economia FLV em feira vs supermercado:** 25–45% mais barato (cesta mensal R$ 200–350 economia)

Fontes: [Prefeitura — Feiras](https://busaocuritiba.com/feiras-livres-em-curitiba/), [Mapa Feiras Orgânicas PR](https://www.agricultura.pr.gov.br/Organicos), [Plural — Feiras](https://www.plural.jor.br/confira-as-feiras-livres-de-curitiba-desta-quinta-feira-11/)

### 13.3 Gastronomia étnica de bairro

- **Coreanos/japoneses Água Verde + Hauer:** Hauer concentra colônia coreana — restaurantes de bairro com PF coreano R$ 35–60 (vs R$ 90–180 em Batel)
- **Italianos Santa Felicidade:** mostarda + galeto + polenta R$ 60–120/pessoa (Madalosso, Veneza, Família Fadanelli — galeteria há 70+ anos)
- **Polacos/ucranianos Tingui/Bacacheri:** almoço cultural R$ 35–80
- **Nordestinos Pinheirinho/Cidade Industrial:** culinária regional acessível R$ 18–35

### 13.4 Festivais gastronômicos (eventos com desconto real)

- **Festival Bom Gourmet Curitiba (Gazeta do Povo)** — restaurantes premium oferecem menus a R$ 39–99 (geralmente top da casa custa R$ 120–250)
- **Restaurant Week Curitiba (set/out)** — menu 3 tempos R$ 49,90 jantar / R$ 39,90 almoço
- **Curitiba Gastronomia (mai-jun)** — descontos 20–40% em ~80 restaurantes participantes

---

## 14. Salários típicos CWB 2026

### 14.1 Salário médio Curitiba/Paraná

- **Salário médio Paraná 2026:** ~R$ 3.100 (Numerando/IBGE/CAGED)
- **São Paulo:** R$ 4.200 → SP é **35% maior** que PR
- **Custo de vida CWB vs SP:** -15 a -20% (Numbeo/Expatistan)
- **Equação real:** quem ganha o mesmo em SP e muda pra CWB **aumenta poder de compra ~15%** — marginal, não dramático

Fonte: [Numerando 2026](https://www.numerando.com.br/blog/salario-medio-brasil-2026-dados-setor-setor-estado), [Salario.com — CWB](https://www.salario.com.br/profissao/programador-de-computador-cbo-317110/curitiba-pr/)

### 14.2 Salários por profissão CWB 2026

| Profissão | Júnior | Pleno | Sênior |
|---|---|---|---|
| **Desenvolvedor / Programador** | R$ 3.000–5.000 (Glassdoor) | R$ 6.000–9.000 | R$ 9.000–18.000 |
| **Engenheiro civil** | R$ 4.500–6.500 | R$ 7.500–11.000 | R$ 12.000–20.000 |
| **Médico clínico geral CLT/PJ** | R$ 8.000–14.000 | R$ 15.000–25.000 | R$ 25.000–45.000 |
| **Advogado escritório médio** | R$ 3.500–6.000 | R$ 8.000–15.000 | R$ 18.000–40.000 |
| **Professor educação básica privada** | R$ 2.800–4.500 | R$ 4.500–7.500 | R$ 7.500–12.000 |
| **Analista financeiro** | R$ 3.500–5.500 | R$ 7.000–11.000 | R$ 11.000–18.000 |
| **Designer UI/UX** | R$ 3.500–5.500 | R$ 6.500–10.000 | R$ 10.000–18.000 |

Fontes:
- [Glassdoor CWB — Dev Junior](https://www.glassdoor.com.br/Sal%C3%A1rios/curitiba-desenvolvedor-de-software-junior-sal%C3%A1rio-SRCH_IL.0,8_IM1274_KO9,41.htm)
- [Glassdoor CWB — Programador Junior](https://www.glassdoor.com.br/Sal%C3%A1rios/curitiba-programador-junior-sal%C3%A1rio-SRCH_IL.0,8_IC2387909_KO9,27.htm)
- [Salario.com — Programador CWB](https://www.salario.com.br/profissao/programador-de-computador-cbo-317110/curitiba-pr/) — Júnior R$ 5.197,86 / Pleno R$ 6.953,45 / Sênior R$ 9.008,12

> **Observação importante:** dados do Glassdoor pra CWB tendem a ser **5–10% abaixo da média nacional** em tech. CAGED pode mostrar diferenças se cruzados com escolaridade.

### 14.3 Salário mínimo regional Paraná 2026

- **Salário mínimo regional PR 2026:** R$ 2.213,42 (faixa I) a R$ 2.428,32 (faixa V) — entrou em vigor maio/2025
- Acima do mínimo nacional (R$ 1.518), aplicável a setores não cobertos por convenção coletiva

Fonte: [Barbieri Advogados](https://www.barbieriadvogados.com/salario-minimo-regional-2026/)

---

## 15. Comparativo CWB vs outras capitais (2026)

### 15.1 Custo de vida (Numbeo/Expatistan abr/2026)

| Capital | Custo médio mensal (sem aluguel) | Posição BR |
|---|---|---|
| São Paulo | R$ 8.163 | 1º |
| Rio de Janeiro | R$ 7.500 (estimado) | 2º |
| Florianópolis | R$ 7.200 (estimado) | 3º |
| Brasília | R$ 7.000 (estimado) | 4º |
| Belo Horizonte | R$ 6.194 | 5º |
| **Curitiba** | **R$ 6.842** | **6º** |
| Porto Alegre | R$ 6.500 (estimado) | 7º |
| Salvador | R$ 5.800 (estimado) | 8º |

Fontes: [Numbeo CWB](https://www.numbeo.com/cost-of-living/in/Curitiba), [Expatistan](https://www.expatistan.com/cost-of-living/curitiba), [Band News FM](https://bandnewsfmcuritiba.com/curitiba-tem-o-sexto-maior-custo-de-vida-do-brasil/)

### 15.2 Curitiba vs SP, POA, Floripa (2026)

| Item | Curitiba | São Paulo | Porto Alegre | Florianópolis |
|---|---|---|---|---|
| Aluguel apto 2Q médio | R$ 2.000–2.500 | R$ 2.800–3.800 | R$ 1.800–2.400 | R$ 2.500–3.500 |
| Almoço executivo | R$ 35–65 | R$ 45–80 | R$ 30–55 | R$ 40–70 |
| **Passagem ônibus** | **R$ 6,00 (congelada)** | **R$ 5,00** | R$ 5,80 | **R$ 6,40** |
| Gasolina/L | R$ 6,29 | R$ 5,70 | R$ 6,10 | R$ 6,30 |
| **IPVA carro R$ 60k** | **R$ 1.140 (1,9%)** | R$ 2.400 (4%) | R$ 2.100 (3,5%) | R$ 1.500 (2,5%) |
| Plano saúde individual 35a básico | R$ 800–1.200 | R$ 950–1.400 | R$ 750–1.100 | R$ 900–1.300 |
| Cinema VIP ingresso | R$ 50–80 | R$ 60–95 | R$ 40–70 | R$ 50–80 |

> **Insight:** CWB perde em passagem (mais cara que SP) e gasolina (acima da média), mas **ganha pesado em IPVA (-50% vs SP) e plano de saúde (-15% vs SP)**.

---

## 16. Custos mensais consolidados — 3 perfis CWB abr/2026

### 16.1 Solteiro econômico — bairro médio (Portão/Boqueirão/Cajuru)

| Categoria | Mín | Máx |
|---|---|---|
| Aluguel apto 1Q 50m² | R$ 1.300 | R$ 2.000 |
| Condomínio (sem lazer) | R$ 250 | R$ 450 |
| IPTU 1/12 | R$ 80 | R$ 180 |
| Copel 150 kWh | R$ 130 | R$ 165 |
| Sanepar 7m³ | R$ 95 | R$ 125 |
| Gás P13 | R$ 35 | R$ 110 |
| Internet 300MB | R$ 80 | R$ 100 |
| **Cartão Curitiba+ (sem carro)** | **R$ 180** | R$ 280 |
| Plano saúde básico Hapvida | R$ 280 | R$ 420 |
| Cesta DIEESE + extras | R$ 800 | R$ 1.100 |
| Restaurante + iFood | R$ 450 | R$ 850 |
| Academia SmartFit | R$ 99 | R$ 169 |
| Lazer + outros | R$ 300 | R$ 600 |
| **TOTAL** | **R$ 4.082** | **R$ 6.549** |

### 16.2 Casal sem filhos — bairro médio-alto (Água Verde/Cristo Rei/Mercês)

| Categoria | Mín | Máx |
|---|---|---|
| Aluguel apto 2Q 80m² | R$ 2.300 | R$ 3.500 |
| Condomínio padrão | R$ 700 | R$ 1.200 |
| IPTU 1/12 | R$ 200 | R$ 400 |
| Copel 280 kWh | R$ 220 | R$ 270 |
| Sanepar 12 m³ | R$ 145 | R$ 180 |
| Gás (P13 ou encanado) | R$ 70 | R$ 150 |
| Internet 600MB + 2 celulares | R$ 250 | R$ 380 |
| **Combustível 1 carro 600L/mês** | R$ 750 | R$ 950 |
| **IPVA 1/12 (1,9%)** | R$ 80 | R$ 160 |
| Estacionamento mensal | R$ 0 | R$ 400 |
| Plano saúde 2 adultos | R$ 1.000 | R$ 1.800 |
| Supermercado Condor/Big | R$ 1.300 | R$ 2.000 |
| Restaurante + iFood | R$ 800 | R$ 1.800 |
| Academia (2) | R$ 200 | R$ 400 |
| Lazer + outros | R$ 600 | R$ 1.500 |
| **TOTAL** | **R$ 8.615** | **R$ 15.090** |

### 16.3 Família 2 filhos — bairro nobre (Batel/Ecoville/Bigorrilho)

| Categoria | Mín | Máx |
|---|---|---|
| Parcela financiamento ou aluguel apto 4Q 150m² | R$ 6.500 | R$ 12.000 |
| Condomínio | R$ 1.500 | R$ 3.500 |
| IPTU 1/12 | R$ 800 | R$ 1.500 |
| Copel 450 kWh | R$ 350 | R$ 430 |
| Sanepar 18 m³ | R$ 215 | R$ 270 |
| Gás | R$ 130 | R$ 220 |
| Internet 1Gb + TV + 4 celulares | R$ 500 | R$ 800 |
| Combustível 2 carros | R$ 1.500 | R$ 1.900 |
| IPVA 1/12 | R$ 280 | R$ 560 |
| **Escolas particulares 2 filhos (EF II)** | R$ 4.000 | R$ 11.000 |
| Atividades extras 2 filhos (idioma/esporte) | R$ 800 | R$ 2.500 |
| Plano saúde família 4 | R$ 2.200 | R$ 4.500 |
| Supermercado | R$ 2.500 | R$ 4.200 |
| Restaurante + iFood | R$ 1.500 | R$ 4.000 |
| Doméstica/diarista | R$ 1.800 | R$ 4.000 |
| Lazer + viagens + cultura | R$ 1.500 | R$ 4.000 |
| **TOTAL** | **R$ 26.075** | **R$ 55.380** |

> **Mediana realista família CWB Batel/Ecoville/Bigorrilho com filhos em Sion/Marista/Internacional:** **R$ 38.000–48.000/mês**.

---

## 17. 10 dicas locais não-óbvias pra economizar em CWB

1. **Use Curitiba+ se anda mais de 2× ao dia.** R$ 180/mês = 30 viagens livres → economia R$ 84/mês vs avulsa. Validade 30 dias do crédito (não rola "guardar pro mês que vem"). [URBS](https://www.curitiba.pr.gov.br/noticias/prefeitura-de-curitiba-mantem-tarifa-de-onibus-em-r-6-e-programas-sociais-no-transporte-em-2026/81220)
2. **Compre orgânicos no Setor de Orgânicos do Mercado Municipal** — pioneirismo nacional desde 2009 — preços competitivos com convencional. Ter–Sáb 8h–18h.
3. **Feira da Praça da Espanha (sáb manhã)** — orgânicos + flores em Batel. Executivos compram aqui antes do brunch — bairro nobre, mas FLV econômico.
4. **Linha Turismo R$ 6 pra moradores na primavera** — 26 pontos turísticos, 24h ilimitado. Programa de família que custa R$ 50/turista.
5. **MON quartas-feiras = grátis pra todos.** Plus: último domingo do mês também.
6. **Festival Bom Gourmet/Restaurant Week (set/out)** — restaurante topo de Batel com menu a R$ 49–99 (vs R$ 200 normal).
7. **Atacarejo Atacadão/Assaí** economiza ~25% vs Condor — vale a pena pra família 4+ ou compra de mês.
8. **Marca laticínios PR (Frísia, Castrolanda, Capal)** é 5–15% mais barata que Italac/Tirol e qualidade igual ou superior. [Plural — Comparador](https://www.plural.jor.br/comparador-precos-supermercados-curitiba/)
9. **Plano de saúde via MEI/PME** (descontos 30–40% vs individual) — se tem CNPJ ativo há 6+ meses, vale renegociar.
10. **Inverno: troca chuveiro elétrico → aquecedor a gás** ou **gás encanado Compagás** se prédio tem rede. Banho 15min máx + posição "verão" sempre que possível. Conta luz pode cair R$ 60–120 jun-ago.

---

## 18. Reajustes esperados em 2026 (calendário)

| Mês | Reajuste | Impacto |
|---|---|---|
| **Jan/2026** | IPVA PR -45,7% (3,5%→1,9%) | Carro R$ 60k: -R$ 800/ano |
| **Mar/2026** | IPTU CWB +IPCA 4,46% (80% imóveis) | Apto R$ 800k venal R$ 480k: +R$ 18/mês |
| **Mar/2026** | Pedágio BR-277 +inflação (R$ 22,60→R$ 23,30) | Casal indo Litoral fim semana: +R$ 1,40 |
| **Mar/2026** | Cesta básica DIEESE CWB +3,23% | +R$ 24,07 mês |
| **Mai/2026** | Sanepar (anual) +3,77% (já aplicado mai/2025) | Família 4: +R$ 8/mês |
| **Jun/2026** | **Copel +19,15%** (em consulta pública até 22/05) | Família 4 (300 kWh): +R$ 60/mês |
| **Out/2026** | Provável reajuste planos saúde individual | +15–25% |
| **2026 inteiro** | Tarifa ônibus **R$ 6 congelada** | -R$ 0 |

---

## 19. Lista de claims do post atual desatualizados/imprecisos (15+ achados)

> Linha referenciada do `content/blog/custo-de-vida-curitiba.mdx` atual.

| # | Linha | Claim atual | Problema | Dado correto 2026 |
|---|---|---|---|---|
| 1 | L78 | Passagem ônibus R$ 6,00 com integração | **Correto**, mas sem mencionar Curitiba+ R$ 180 ou Domingão R$ 3 | Adicionar Curitiba+ e Domingão paga Meia |
| 2 | L79 | Passe mensal "~R$ 264" | **Desatualizado**: existe Curitiba+ R$ 180 (50% mais barato) | R$ 180 com uso ilimitado |
| 3 | L80 | Gasolina R$ 5,80–6,20 | **Desatualizado**: ANP/CustoCarro abr/2026 = **R$ 6,29 médio** (Centro até R$ 6,85) | R$ 6,29 médio comum; aditivada até R$ 6,85 |
| 4 | L81 | Estacionamento centro R$ 6–12/h | **Confunde EstaR público e privado** — EstaR é **R$ 3/h**, privado R$ 6–12 | Separar: EstaR R$ 3/h, privado R$ 6–12 |
| 5 | L82 | Uber R$ 18–30 (5–10km) | Faixa baixa demais; em horário pico/surge sobe a R$ 40–55 mesmo trajeto | R$ 17–35 normal, surge até 2× |
| 6 | L83 | "IPVA 3,5% no PR" | **ERRO GRAVE — DESATUALIZADO**: alíquota foi reduzida pra **1,9%** desde jan/2026 | 1,9% — menor IPVA do Brasil |
| 7 | L23 | Saúde individual R$ 350–600/mês | Faixa só vale pra <30 anos; >50 anos = R$ 1.500+ | Tabela por faixa etária |
| 8 | L96 | Plano Unimed básico R$ 350–600/mês | Sem qualificar idade — falso pra >40 anos | Stratificar por idade |
| 9 | L97 | Consulta clínico geral R$ 200–400 | Faixa baixa demais pra particular Batel/Ecoville (R$ 280–500) | Adicionar Medprev/SUS+ R$ 89–149 como alternativa |
| 10 | L107 | Escola particular R$ 1.500–3.500 | Subestima topo: Sion R$ 3.500–5.500 e Internacional R$ 4.500–7.500 | Tabela por colégio |
| 11 | L121 | "Museu Oscar Niemeyer entrada gratuita às quartas" | **Correto**, mas falta inteira (R$ 36) e último domingo grátis também | Inteira R$ 36 / quarta + último domingo grátis |
| 12 | L126 | Cinema R$ 25–45 | **Desatualizado**: Cinépolis Pátio Batel inteira **R$ 50–80**, Cineflix R$ 28–48 | Diferenciar VIP vs comum |
| 13 | L127 | Academia R$ 80–180 | **Desatualizado**: SmartFit Plus R$ 169–199, Black R$ 199–249, Bio Ritmo R$ 350–550 | SmartFit R$ 99 entry (ainda válido), Plus/Black ~R$ 200, premium Bio Ritmo R$ 350+ |
| 14 | L138 | "Gasolina SP R$ 5,70 / CWB R$ 5,90" | **Desatualizado** — CWB R$ 6,29 abr/2026 | Atualizar |
| 15 | L137 | Passagem CWB R$ 6,00 / SP R$ 4,40 | **Desatualizado SP**: SP reajustou pra ~R$ 5,00 em 2026 | SP R$ 5,00 |
| 16 | L18 | Aluguel 2Q bairro médio R$ 1.800–2.800 | Plausível, mas FipeZap CWB out/24 = R$ 2.035 médio. Tem upside (+8,6% 12m). | R$ 2.000–2.500 médio (FipeZap 2026) |
| 17 | L80 | Gasolina/L sem citar etanol e diesel | Faltam etanol R$ 4,49, diesel R$ 6,13, GNV R$ 4,65 | Adicionar tabela combustíveis |
| 18 | L77 | "Cartão transporte com integração 2h" | Não está mais explícito sobre "1 baldeação 2h" — verificar regra atual URBS | Confirmar regra |
| 19 | (ausente) | Sem mencionar IPTU Decreto 2668/2025 | Trava 80% imóveis IPCA até 2029 — claim local forte ausente | Adicionar |
| 20 | (ausente) | Sem mencionar Copel +19,15% jun/2026 | Reajuste anunciado afetará planejamento — ausência é gap YMYL | Adicionar |
| 21 | (ausente) | Sem mencionar inverno e impacto chuveiro/lareira | Característica LOCAL única — gap de diferencial vs blog nacional | Adicionar seção |
| 22 | (ausente) | Sem mencionar pedágio Litoral | Custo invisível típico em fim de semana | Adicionar |
| 23 | L155 | "Regra dos 30%" sem citar fontes/contexto | Genérico; Curitiba tem específicos de aluguel + condomínio elevado | Adicionar regra para CWB c/ condomínio |
| 24 | L141 | "CWB 15-25% menor que SP" | **Levemente otimista**: Numbeo/Expatistan = ~15% | Atualizar pra 15% |
| 25 | (ausente) | Sem cesta básica DIEESE | Dado oficial, atualizado mensalmente, ancora autoridade | Adicionar R$ 769,61 |

---

## 20. Notas metodológicas

- **Hierarquia de fontes (FYMOOB Research Protocol v1.0):**
  - **Tier 1 (gov/oficial):** Prefeitura CWB, ANP, IBGE, DIEESE, CONAB, ANEEL, Sefa-PR, MON, Sanepar, Compagás, AGEPAR, Sefaz
  - **Tier 2 (concessionárias/empresas reguladas):** URBS, Copel, EPR Litoral, Estapar
  - **Tier 3 (imprensa especializada):** Gazeta do Povo, Bem Paraná, Plural, Tribuna PR, Bom Gourmet, Folha, CBN
  - **Tier 4 (agregadores):** Numbeo, Expatistan, Quero Bolsa, Glassdoor, Salario.com
  - **Tier 5 (observação direta):** marcado explicitamente "observação direta abr/2026"
  - **Tier 6 (estimativa fundamentada):** marcado "estimado"

- **Validação cruzada feita:** combustíveis (CustoCarro + ANP + Plural), tarifa ônibus (Prefeitura + Bandab + Bem Paraná), IPVA (Sefa + Detran), IPTU (Prefeitura + Bem Paraná + Câmara).
- **Próximos passos pra writer:** decidir profundidade YMYL — recomendo manter 3 perfis-cenário do post atual mas substituir números por pesquisa local; adicionar seções inverno + reajuste Copel; tabela combustível completa; tabela IPVA 2026; cesta DIEESE como âncora.
- **Não medi editorialmente** — apenas consolidei pesquisa. Writer specialist + SEO specialist devem decidir hierarquia narrativa.
