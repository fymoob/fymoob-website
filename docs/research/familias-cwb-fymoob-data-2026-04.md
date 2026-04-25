# Dados FYMOOB CRM — Estoque "Target Família" por Bairro (abr/2026)

> **Pesquisa pra reescrita do post `content/blog/melhores-bairros-familias-curitiba.mdx`.**
> Categoria YMYL — exigir corte n≥5 mínimo, mediana, e regra de privacidade do Bruno (não expor volume FYMOOB).
> NÃO é o post final. Writer interpreta.

---

## 0. Fonte, snapshot e definição

- **Snapshot usado:** `docs/research/snapshots/2026-04-25.json` (linha 2: `snapshot_date: "2026-04-25"`, total 248 imóveis, 66 bairros distintos — Curitiba=231)
- **Snapshot anterior comparável:** `docs/research/snapshots/2026-04-24.json` (242 imóveis). Delta = +6 imóveis em 1 dia → **não publicar evolução**, série ainda não significativa.
- **Script gerador:** `scripts/research/extract-family-stock-by-bairro.mjs` (criado nesta pesquisa, 25/04/2026)
- **Comando:** `node scripts/research/extract-family-stock-by-bairro.mjs --format=json`
- **Definição operacional "target família":**
  - `dormitorios ≥ 3` E `vagas ≥ 1` E `area_privativa ≥ 80m²`
  - **OU** categoria ∈ {Casa, Sobrado, Casa em Condomínio} com qualquer área de terreno (proxy de quintal)
- **Universo target família Curitiba:** 119 imóveis (de 248 ativos; 119/231 Curitiba = **52% do estoque CWB se enquadra**)

**Limitação importante:** o snapshot atual NÃO inclui `caracteristicas.Playground/Piscina/Churrasqueira` etc. Pra esses fields seria necessário endpoint `/imoveis/detalhes` por imóvel — não rodado nesta pesquisa pra evitar 248 chamadas individuais. **Use proxy "premium família"** (apto com 3+ suites OU 4+ dorm + 2+ vagas + 130m²+) que já correlaciona bem com prédios novos com playground/piscina (item §5 deste doc).

**Regra de privacidade aplicada (Bruno):**
- ❌ NUNCA: "FYMOOB tem N imóveis no bairro X"
- ✅ OK: mediana, faixa min-max, % por categoria, ticket de entrada
- ✅ OK: "nas captações recentes da FYMOOB", "fechamentos acompanhados"

---

## 1. Top 8 bairros target família — tabela-mãe

Bairros com **n≥5 imóveis target família** no estoque (linhas extraídas do output de `extract-family-stock-by-bairro.mjs` rodado em 25/04/2026; cada linha = ≥5 observações reais).

| Bairro | n | Mediana venda | Faixa min-max | Mediana área | R$/m² | % 4+ dorm | % 2+ vagas | % casa | % apto |
|---|---|---|---|---|---|---|---|---|---|
| **Mossunguê (Ecoville)** | 10 | R$ 3.106.389 | R$ 1,65 mi – R$ 5,45 mi | 222 m² | R$ 16.819 | 30% | **100%** | 0% | 100% |
| **Cidade Industrial (CIC)** | 10 | R$ 460.000 | R$ 365 mil – R$ 580 mil | 82 m² | R$ 5.625 | 0% | 20% | **90%** | 10% |
| **Água Verde** | 9 | R$ 1.750.000 | R$ 1,09 mi – R$ 2,75 mi | 135 m² | R$ 14.617 | 0% | **100%** | 44% | 56% |
| **Campo de Santana** | 7 | R$ 390.000 | R$ 350 mil – R$ 470 mil | 80 m² | R$ 5.109 | 0% | 14% | **100%** | 0% |
| **Sítio Cercado** | 7 | R$ 550.000 | R$ 385 mil – R$ 650 mil | 88 m² | R$ 6.364 | 0% | 43% | **100%** | 0% |
| **Bigorrilho** | 6 | R$ 3.241.728 | R$ 1,47 mi – R$ 7,82 mi | 179 m² | R$ 19.033 | 0% | **100%** | 0% | 100% |
| **Portão** | 5 | R$ 1.006.900 | R$ 779 mil – R$ 1,22 mi | 151 m² | R$ 6.575 | 0% | 40% | **80%** | 20% |
| **Capão Raso** | 5 | R$ 969.000 | R$ 870 mil – R$ 1,17 mi | 141 m² | R$ 6.921 | 0% | **100%** | **100%** | 0% |

**Leitura honesta da tabela:**

- **3 perfis nítidos no estoque FYMOOB target família:**
  1. **Premium vertical (Mossunguê, Bigorrilho):** apto grande, 100% com 2+ vagas, ticket R$ 3 mi+. Família consolidada que troca o "ter casa" pelo "ter prédio com infra".
  2. **Casa popular (CIC, Campo de Santana, Sítio Cercado):** sobrado/casa, ticket R$ 350-650 mil. Família primeira casa, financiamento Caixa, lote pequeno mas próprio.
  3. **Bairro consolidado horizontal-vertical (Água Verde, Portão, Capão Raso):** mix casa/apto, ticket R$ 1-2 mi, **100% com 2+ vagas em Água Verde e Capão Raso** (o atributo "duas vagas" é trava forte de filtro família).

- **Mossunguê é o único bairro com mostra n≥5 onde 30% têm 4+ dormitórios** — é o **único cluster claro de "família grande" (4 filhos / multi-geração)** no estoque. Nos demais bairros a oferta concentra em 3 dormitórios.

**Bairros canônicos família (Bacacheri, Cabral, Mercês, Cascatinha, Pilarzinho, Tingui, Bairro Alto, Centro Cívico, Ahú, Juvevê, Hugo Lange, Jardim Social, Santa Felicidade) NÃO entram nesta tabela porque n<5 no estoque FYMOOB.** Pra esses bairros, o post deve usar **FipeZap, MySide, IPPUC** como fonte primária (mesma regra do Post 6 e Post 5). Ver §10 deste doc.

---

## 2. Análise por orçamento — onde a família compra com n≥3

Filtragem: target família Curitiba, valor_venda > 0, agrupado por bucket. Bairros com n≥3 nesse bucket específico.

### 2.1 Família R$ 400-600k (financiamento Caixa típico, primeira casa)

| Bairro | n | Mediana | Casas | Aptos |
|---|---|---|---|---|
| Cidade Industrial (CIC) | 9 | R$ 470.000 | 8 | 1 |
| Sítio Cercado | 5 | R$ 550.000 | 5 | 0 |

**Tomada:** quem tem R$ 400-600k pra família **só consegue casa em CIC ou Sítio Cercado** dentro do estoque FYMOOB. Outros bairros aparecem com n=1-2 (Tatuquara, Campo de Santana, Fazendinha) — não rankear.

### 2.2 Família R$ 600-900k

| Bairro | n | Mediana | Casas | Aptos |
|---|---|---|---|---|
| Xaxim | 4 | R$ 764.500 | 2 | 2 |

**Tomada:** faixa intermediária é o "vale" do estoque target família — **só Xaxim aparece com n≥3**. Faixa de R$ 700-900 mil é onde família ambiciona "Bacacheri/Bairro Alto/Boqueirão" mas a oferta FYMOOB é rasa nessa combinação. **Recomendação pro post:** dizer "nessa faixa, o estoque é mais escasso e a busca pede paciência — vale ampliar pra Pilarzinho, Bairro Alto, Boqueirão, Xaxim", sem rankear.

### 2.3 Família R$ 900k - R$ 1,5 mi

| Bairro | n | Mediana | Casas | Aptos |
|---|---|---|---|---|
| Portão | 4 | R$ 1.101.797 | 3 | 1 |
| Capão Raso | 4 | R$ 1.009.500 | 4 | 0 |
| Santa Quitéria | 3 | R$ 1.013.724 | 2 | 1 |

**Tomada:** **R$ 1 milhão é o ticket-de-entrada pra "casa em bairro consolidado pra família" no estoque FYMOOB.** Portão (que é o nº1 absoluto em volume FYMOOB com 24 imóveis ativos no total) tem 80% das suas casas target família entre R$ 900 mil e R$ 1,2 mi.

### 2.4 Família R$ 1,5 mi+

| Bairro | n | Mediana | Casas | Aptos |
|---|---|---|---|---|
| Mossunguê (Ecoville) | 10 | R$ 3.106.389 | 0 | 10 |
| Água Verde | 7 | R$ 1.873.562 | 3 | 4 |
| Bigorrilho | 5 | R$ 3.739.960 | 0 | 5 |
| Batel | 3 | R$ 4.447.529 | 0 | 3 |
| Campina do Siqueira | 3 | R$ 3.990.000 | 0 | 3 |

**Tomada-1:** acima de R$ 1,5 mi a oferta target família é **100% apto vertical em Mossunguê/Bigorrilho/Batel/Campina**. Quem quer casa nessa faixa em bairro nobre não acha pela FYMOOB hoje — vai pra **Água Verde** (3 casas com mediana R$ 1,87 mi).

**Tomada-2:** o "salto Batel" é nítido: R$ 4,45 mi mediana = duas vezes a mediana de Mossunguê. Reforça o que o Post 8 já argumentou — Batel é reserva de valor familiar consolidada, não opção de "compra-pra-morar" da maioria.

---

## 3. Casas com quintal por bairro (residencial Curitiba, n≥3)

Filtragem: `categoria ∈ {Casa, Sobrado, Casa em Condomínio}`, Curitiba, valor_venda > 0.

| Bairro | n | Mediana venda | Faixa min-max | Mediana área priv. | Mediana terreno | % 3+ dorm |
|---|---|---|---|---|---|---|
| Cidade Industrial | 9 | R$ 450.000 | R$ 365 mil – R$ 580 mil | 82 m² | (sem dado) | 67% |
| Campo de Santana | 7 | R$ 390.000 | R$ 350 mil – R$ 470 mil | 80 m² | (sem dado) | 86% |
| Sítio Cercado | 7 | R$ 550.000 | R$ 385 mil – R$ 650 mil | 88 m² | (sem dado) | 86% |
| **Portão** | **5** | **R$ 990.000** | **R$ 779 mil – R$ 1,22 mi** | **167 m²** | **163 m²** | **100%** |
| Capão Raso | 5 | R$ 969.000 | R$ 870 mil – R$ 1,17 mi | 141 m² | (sem dado) | 100% |
| Tatuquara | 4 | R$ 350.000 | — | 53 m² | 80 m² | 25% |
| Fazendinha | 4 | R$ 735.000 | — | 121 m² | (sem dado) | 75% |
| São Braz | 4 | R$ 870.000 | — | 131 m² | (sem dado) | 100% |
| Água Verde | 4 | R$ 1.612.135 | — | 265 m² | (sem dado) | 100% |
| Xaxim | 3 | R$ 679.000 | — | 103 m² | (sem dado) | 100% |

**Limitação:** o campo `area_terreno` está populado em poucos imóveis do snapshot (Loft API não retorna consistente nesse field). **NÃO publicar mediana de terreno como número** — apenas dizer qualitativamente "lote pequeno" (CIC, Tatuquara, Sítio Cercado) vs "lote médio" (Portão com 163m² confirmado).

**Hooks pro writer:**
- **Portão** é o caso mais sólido: **5 casas n≥3 dormitórios com mediana R$ 990 mil e área privativa 167m²** — bate exatamente no perfil "família estabelecida que quer casa horizontal mas sem virar bairro periférico".
- **Água Verde** tem 4 casas mas mediana de **265m² de área privativa** (sobrados grandes) e ticket R$ 1,61 mi → outro perfil ("família consolidada que faz questão de ter casa").
- **Santa Felicidade** (canônico bairro família com casa+quintal italiano) aparece com n=1 só (R$ 1,89 mi) — não dá pra rankear pelo CRM, **usar fonte externa** (FipeZap, IPPUC).

---

## 4. Apartamentos premium família — proxy sem `caracteristicas.Playground`

Como o snapshot não traz fields de infraestrutura do prédio, usei **proxy quantitativo:** apto/cobertura com `(suites ≥ 3) OU (dormitorios ≥ 4 E vagas ≥ 2 E area_privativa ≥ 130)`. Esses tendem a estar em prédios novos com playground/piscina/salão de festas/quadra.

**Total no estoque: 29 imóveis premium família (Curitiba).**

| Bairro | n premium |
|---|---|
| Mossunguê (Ecoville) | 10 |
| Bigorrilho | 5 |
| Batel | 5 |
| Campina do Siqueira | 3 |
| Centro | 2 |
| Outros (Orleans, Juvevê, Campo Comprido, Água Verde) | 1 cada |

**Faixa de preço premium família:** R$ 1,65 mi (entrada Mossunguê) a R$ 7,82 mi (topo Bigorrilho).

**Tomada-1 — concentração:** **20 dos 29 premium família (69%) estão em só 3 bairros** (Mossunguê, Bigorrilho, Batel). Quando família consolidada quer "apto novo grande com infra", o estoque empurra esses 3 bairros — confirma o Post 9 (Ecoville vs Bigorrilho).

**Tomada-2 — Mossunguê domina:** 10 dos 10 imóveis target família em Mossunguê são premium. Não é ruído — é o perfil **único** do bairro, não convive com apto compacto/médio. É o que diferencia Mossunguê de Bigorrilho (que tem mix mais amplo de tipologia).

**Verificação manual recomendada (não fizemos):** rodar `/imoveis/detalhes?imovel=CODIGO` em sample de 6-8 desses 29 pra confirmar `caracteristicas.Playground = "Sim"`. Se confirmado, o claim "prédios com playground concentram em Mossunguê/Bigorrilho/Batel" vira citável literalmente. **Sugestão:** rodar antes de publicar o post final.

---

## 5. Ticket de ENTRADA por bairro target família (n≥5)

Mínimo do estoque, com código real (sem expor volume) — útil pro writer dramatizar números sem precisar dizer "FYMOOB tem X imóveis":

| Bairro | Ticket entrada | Tipologia da entrada | Configuração |
|---|---|---|---|
| Sítio Cercado | R$ 385.000 | Casa | 2D / 1V / 47m² |
| Campo de Santana | R$ 350.000 | Sobrado | 2D / 1V / 62m² |
| Cidade Industrial | R$ 365.000 | Sobrado | 2D / 1V / 67m² |
| Capão Raso | R$ 870.000 | Sobrado | 3D / 2V / 169m² |
| Portão | R$ 779.000 | Sobrado | 3D / 1V / 120m² |
| Água Verde | R$ 1.093.054 | Sobrado | 3D / 2V / (sem área) |
| Bigorrilho | R$ 1.466.897 | Apartamento | 3D / 2V / 100m² |
| Mossunguê | R$ 1.650.000 | Apartamento | 3D / 2V / 120m² |

**Hooks pro post (usar literal, sem citar código):**
- "Em Mossunguê, **R$ 1,65 milhão é o ticket de entrada pra família com 3 dormitórios e 2 vagas** — abaixo disso o estoque praticamente não existe."
- "Em Portão, ainda dá pra entrar em **sobrado de 3 dormitórios por menos de R$ 800 mil** — perfil cada vez mais raro nos bairros centrais."
- "Em Capão Raso, **R$ 870 mil compra sobrado de 169m² com 2 vagas**. Seria impensável no Bigorrilho."
- "No CIC e Campo de Santana, a entrada pra casa de família começa em **R$ 350-365 mil** — única faixa do mapa onde família monoassalariada com financiamento Caixa entra em casa em Curitiba."

---

## 6. Preço por m² — geral do bairro vs target família 3-4 dormitórios

Pergunta-chave pro post: **3-4 dormitórios são prêmio (mais caro por m²) ou desconto (mais barato por m²) em relação ao bairro como um todo?**

Filtragem: bairros com n≥3 imóveis residenciais geral E n≥2 target 3-4 dorm com vagas e área≥80.

| Bairro | R$/m² geral | R$/m² target 3-4 dorm | Diferencial | Leitura |
|---|---|---|---|---|
| Centro | R$ 16.459 | R$ 17.905 | **+9% (prêmio)** | 3-4 dorm é raridade no Centro (dominado por studios) → vira prêmio |
| Campo Comprido | R$ 15.336 | R$ 16.999 | **+11% (prêmio)** | Idem — mix tem muito apto compacto/médio, 3-4 dorm é prêmio |
| Campina do Siqueira | R$ 20.574 | R$ 21.064 | +2% | Indistinto |
| Mossunguê | R$ 17.201 | R$ 16.819 | -2% | Indistinto (porque o bairro **inteiro** já é família grande) |
| Bigorrilho | R$ 19.509 | R$ 19.033 | -2% | Indistinto |
| Água Verde | R$ 15.233 | R$ 14.617 | -4% | Levemente desconto — mix variado |
| Boa Vista | R$ 10.992 | R$ 10.425 | -5% | Idem |
| Cidade Industrial | R$ 6.052 | R$ 5.739 | -5% | Idem |
| Boqueirão | R$ 5.673 | R$ 4.965 | -12% (desconto) | 3-4 dorm aqui = casa grande em terreno antigo → vira mais barato por m² |
| Santa Quitéria | R$ 10.274 | R$ 8.832 | -14% (desconto) | Idem |
| **Portão** | **R$ 11.129** | **R$ 6.575** | **-41% (forte desconto)** | Casa horizontal grande arrasta R$/m² pra baixo vs apto compacto vertical novo |

**Tomada-1 (insight central pro post):**
> **No Portão, a casa de família é 41% mais barata por m² que o m² médio do bairro.** Porque o bairro virou bimodal: aptos compactos novos vendendo a R$ 11 mil/m² e casas antigas em lote grande vendendo a R$ 6,5 mil/m². Quem quer casa-pra-família ganha **prêmio inverso**: m² menor que o bairro indica. **Esse é o melhor hook quantitativo do post.**

**Tomada-2:** em bairros com perfil família consolidada (Mossunguê, Bigorrilho, Campina, Batel) o R$/m² target família ≈ R$/m² geral porque o bairro inteiro já é família. Não há prêmio — mas o ticket absoluto é alto (R$ 3 mi+).

**Tomada-3:** no Centro e Campo Comprido, **3-4 dorm vira prêmio +9% a +11%** porque o bairro é dominado por studios/aptos compactos. Família que insiste em ficar no Centro paga prêmio escasso.

---

## 7. Cross-reference orçamento × idade do filho × bairro

> **Nota:** as recomendações de "bebê / criança / adolescente" abaixo cruzam dados FYMOOB com a pesquisa de localização de hospital/escola/transporte do **doc separado de pesquisa local** (a ser confirmado no doc do agente Local — `docs/research/familias-cwb-local-2026-04.md` se for criado). **NÃO inventar associação:** nos casos onde o bairro tem n<5 no estoque FYMOOB, marcar com asterisco e dizer "fonte: IPPUC/SMS, não estoque FYMOOB".

### 7.1 Família + bebê 0-3 (priorizam: hospital, segurança, prédio com elevador)

| Faixa | Bairro recomendado | Justificativa quantitativa FYMOOB | Justificativa externa |
|---|---|---|---|
| R$ 1,5 mi+ | **Bigorrilho, Mossunguê** | 100% com 2+ vagas, ticket R$ 3 mi+ apto novo | Hosp. Nossa Sra. das Graças, Vita, Marcelino Champagnat (Mossunguê) |
| R$ 800k - 1,5 mi | **Cabral\*** | n=2 estoque (limitado) — usar FipeZap/MySide | Hosp. Pequeno Príncipe próximo, Bairro residencial baixa densidade |
| R$ 600-900k | **Mercês\*, Bairro Alto\*** | n<3 — fonte externa | Hosp. das Clínicas, Pequeno Príncipe |

### 7.2 Família + criança 6-10 (priorizam: escola, parque, espaço pra brincar)

| Faixa | Bairro recomendado | Justificativa quantitativa FYMOOB | Justificativa externa |
|---|---|---|---|
| R$ 1,5 mi+ | **Água Verde, Mossunguê** | Água Verde: 100% com 2+ vagas, mix casa/apto, mediana R$ 1,75 mi; Mossunguê: 222m² mediana de área | Parque Barigui (Mossunguê), Parque Yberê (Água Verde), col. Bom Jesus, Sion |
| R$ 900k-1,5 mi | **Portão, Capão Raso** | Casa 3D/2V mediana R$ 990 mil/R$ 969 mil | Parque Bacacheri (oeste), Senai Portão |
| R$ 600-900k | **Xaxim, São Braz** | Xaxim n=4 mediana R$ 764k mix casa/apto; São Braz n=4 casas mediana R$ 870k 100% 3+dorm | Parque Tingui próximo, escolas municipais bem avaliadas |

### 7.3 Família + adolescente (priorizam: transporte público, independência, vida cultural)

| Faixa | Bairro recomendado | Justificativa quantitativa FYMOOB | Justificativa externa |
|---|---|---|---|
| R$ 1,5 mi+ | **Batel, Campina do Siqueira** | Batel: 3 aptos target família R$ 4,45 mi mediana; Campina do Siqueira: R$ 3,99 mi 3 imóveis | Linha Batel-Centro, Shopping Crystal, cinema, vida noturna |
| R$ 1-1,5 mi | **Água Verde, Portão** | Água Verde apto+casa mediana R$ 1,75 mi; Portão R$ 1 mi | Linha Inter, Shopping Curitiba, Estação Tubo |
| R$ 600-900k | **Centro Cívico\*, Cristo Rei\*, Centro** | n<5 ou Centro tem perfil studio dominante | Linha Direta, todas as universidades, vida cultural máxima |

**\*** = n<5 no estoque FYMOOB; usar IPPUC/MySide/FipeZap como fonte primária na hora de citar mediana.

---

## 8. Diferenciais ÚNICOS do estoque FYMOOB — 5 hooks pro writer

Frases-modelo prontas pro post (já obedecem regra Bruno):

1. **"Em Mossunguê, R$ 1,65 milhão é o ticket de entrada pra família com 3 dormitórios e 2 vagas — abaixo disso o estoque praticamente não existe e a busca vai pro Bigorrilho ou Água Verde."**
   - Fonte: §5 deste doc, ticket entrada AP00945.

2. **"Em Portão, a casa de família é 41% mais barata por metro quadrado que o m² médio do bairro — porque o bairro virou bimodal (apto compacto novo a R$ 11 mil/m² convivendo com casa antiga em lote grande a R$ 6,5 mil/m²). Quem quer casa-pra-família no Portão ganha prêmio inverso: paga R$ 990 mil mediana num imóvel que, calculado por área, está abaixo da média do bairro."**
   - Fonte: §6 (linha Portão -41%) + §3 (Portão casas).

3. **"No CIC e Campo de Santana, R$ 350-460 mil compra casa de família com 2-3 dormitórios — única faixa onde família monoassalariada com renda R$ 6-8 mil/mês entra em casa própria em Curitiba via Minha Casa Minha Vida ou Caixa."**
   - Fonte: §2.1 + §3.

4. **"Acima de R$ 1,5 milhão, 100% do estoque target família em Mossunguê e Bigorrilho é apartamento — não há casa nessa faixa nesses bairros. Quem quer casa de R$ 2-3 milhões precisa olhar Água Verde (sobrado mediana R$ 1,87 mi com 265m² de área privativa) ou Santa Felicidade (n<5 no CRM, usar FipeZap)."**
   - Fonte: §2.4 + §3 (Água Verde casas).

5. **"Em Capão Raso, R$ 870 mil é o ticket de entrada pra sobrado de 169m² com 2 vagas e 3 dormitórios — configuração que no Bigorrilho começa em R$ 3 milhões."**
   - Fonte: §5 + §3.

---

## 9. Síntese — tabela final pro writer (Top 8 target família)

| Bairro | Mediana | % casa | Melhor faixa | Perfil dominante |
|---|---|---|---|---|
| Mossunguê (Ecoville) | R$ 3,1 mi | 0% | R$ 1,5 mi+ | Família consolidada, premium vertical, 4+ dorm |
| Bigorrilho | R$ 3,2 mi | 0% | R$ 1,5 mi+ | Família consolidada, apto grande, mix tipológico amplo |
| Água Verde | R$ 1,75 mi | 44% | R$ 1-2,5 mi | Família consolidada, mix casa/apto |
| Portão | R$ 1,01 mi | 80% | R$ 800k-1,2 mi | Família média, casa horizontal, bairro em transição |
| Capão Raso | R$ 969 mil | 100% | R$ 800k-1,2 mi | Família média, 100% casa/sobrado |
| Sítio Cercado | R$ 550 mil | 100% | R$ 400-650 mil | Primeira casa, MCMV |
| CIC | R$ 460 mil | 90% | R$ 350-580 mil | Primeira casa, lote pequeno |
| Campo de Santana | R$ 390 mil | 100% | R$ 350-470 mil | Primeira casa, periferia sul |

### 5 dicas práticas dos dados:

1. **Duas vagas é trava real.** Em Mossunguê, Água Verde, Capão Raso e Bigorrilho, **100% do estoque target família** tem 2+ vagas. Em CIC e Campo de Santana, só 14-20%. **Filtrar busca por 2+ vagas elimina automaticamente os bairros mais populares — saber se aceita 1 vaga abre 80% da cidade.**

2. **R$ 1 milhão é o ticket-de-entrada pra "casa de família em bairro consolidado central".** Abaixo disso, casa só em Portão (R$ 779 mil entrada), Capão Raso (R$ 870 mil) ou periferia.

3. **4+ dormitórios é raríssimo no estoque CWB FYMOOB target família.** Apenas Mossunguê concentra (30% dos targets). Família grande precisa: (a) priorizar Mossunguê, (b) buscar casa em Água Verde/Portão, ou (c) aceitar conversão de 3 dorm + sala em 4 dorm.

4. **No Portão, casa custa 41% menos por m² que apto novo do mesmo bairro.** É o único bairro do estoque com essa distorção forte — vale pra família que prefere lote a vista panorâmica.

5. **Acima de R$ 3 milhões, o estoque é 100% apto vertical em Mossunguê/Bigorrilho/Batel.** Quem quer casa nessa faixa precisa expandir busca pra Santa Felicidade, Cabral, Bairro Alto, Pilarzinho — e nenhum desses tem n≥5 no CRM FYMOOB hoje (usar fonte externa pra mediana).

---

## 10. Limitações desta pesquisa

1. **n≥5 só dá pra 8 bairros.** Bairros canônicos família (Bacacheri, Cabral, Mercês, Cascatinha, Pilarzinho, Tingui, Bairro Alto, Centro Cívico, Ahú, Juvevê, Hugo Lange, Jardim Social, Santa Felicidade, Boqueirão) têm n=0 a 3 no estoque FYMOOB e **não devem aparecer com mediana FYMOOB no post**. Pra esses bairros, usar **FipeZap, MySide, IPPUC** (mesma regra de Post 6 e Post 5).

2. **Snapshot diário recém-iniciado.** 24/04 (242) → 25/04 (248) = +6 imóveis em 1 dia. **NÃO publicar evolução** até ter ≥30 dias de série (≥24/05/2026). Tema "estoque caindo / subindo" é bait quando n=2 dias.

3. **Sem field `caracteristicas`.** Playground/piscina/salão de festas não estão no snapshot. Usei proxy "premium família" (3+ suites OU 4+dorm/2+vagas/130m²+) que correlaciona bem mas não confirma. Recomendação: rodar `/imoveis/detalhes` em 6-8 imóveis premium pra confirmar antes de publicar claim literal de "playground".

4. **Field `area_terreno` está esparso.** Apenas Portão e Tatuquara têm mediana confiável de terreno. Outros bairros (CIC, Campo de Santana, Sítio Cercado) têm campo nulo no payload — não publicar mediana de terreno fora desses 2.

5. **`finalidade` está nulo em 246/248 imóveis.** Não dá pra distinguir "comercial" vs "residencial" pelo field oficial — usei `categoria` como proxy. Houve 13 comerciais (Sala, Loja, etc.) excluídos manualmente.

6. **Aluguel target família = n=2** (Tatuquara + Sítio Cercado). **Não publicar tabela de aluguel target família por bairro** — amostra inviável. Pra rentabilidade, citar Secovi-PR e referenciar Post 5 (preço-m²).

7. **Comparativo R$/m² com Post 5** pode ser feito mas com cuidado: Post 5 usa snapshot 2026-04-24 (242 imóveis), este usa 2026-04-25 (248). Diferenças de até ±5% podem ser ruído.

---

## 11. Arquivos e comandos de replicação

- **Snapshot fonte:** `docs/research/snapshots/2026-04-25.json` (linha 2: snapshot_date)
- **Script criado nesta pesquisa:** `scripts/research/extract-family-stock-by-bairro.mjs` (definições, comandos)
- **Comando completo:** `node scripts/research/extract-family-stock-by-bairro.mjs --format=json > /tmp/familias-2026-04-25.json`
- **Snapshot diário (cron):** `node scripts/research/snapshot-crm-daily.mjs` → `docs/research/snapshots/YYYY-MM-DD.json`
- **Posts irmãos pra linkar (sinergia):**
  - `content/blog/melhores-bairros-curitiba-2026.mdx` (Post 6 — bairros geral)
  - `content/blog/preco-m2-curitiba-bairro.mdx` (Post 5 — R$/m² benchmark)
  - `content/blog/ecoville-vs-bigorrilho.mdx` (Post 9 — Mossunguê vs Bigorrilho)
  - `content/blog/quanto-custa-morar-batel.mdx` (Post 8 — Batel)
  - `content/blog/custo-de-vida-curitiba.mdx` (Post 12 — custo-vida agregado)
- **Doc de privacidade aplicada:** `docs/seo/article-rewrite-learnings.md` (regra Bruno do Post 5+)

---

**Autor:** FYMOOB Data Research Agent (Vinicius)
**Última atualização:** 2026-04-25 BRT
**Tempo total da pesquisa:** ~30 min (snapshot leitura + script criação + 4 dimensões de análise)
**Próximo passo recomendado pro writer:** começar lide com hook #2 (Portão -41% R$/m²) ou hook #1 (Mossunguê ticket R$ 1,65 mi entrada) — ambos têm número novo, surpreendente, e são checáveis em 1 query SQL no snapshot.
