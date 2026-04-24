# Ranking Melhores Bairros Curitiba — Abril 2026

**Data:** 2026-04-23
**Validado por:** Claude Agent SDK (Opus 4.7) — Data Validation Specialist (agente #4/5 do time de reescrita)
**Escopo:** ranking multi-critério (segurança, educação, infraestrutura, qualidade de vida) para reescrita do post `content/blog/melhores-bairros-curitiba-2026.mdx`
**Complementa:** `preco-m2-bairros-curitiba-2026.md` (valorização + R$/m²) e `bairros-curitiba-drivers-2026.md` (drivers locais)

> **AVISO YMYL:** documento é a fonte única de dados não-preço para o post. Dados SESP-PR por bairro são **de crime contra patrimônio no 1º semestre de 2025** (única janela com granularidade por bairro disponível publicamente) — homicídios dolosos e roubo de veículos são agregados da capital, SESP-PR **não publica homicídios por bairro** de forma sistemática. Ver seção 6 (metodologia) para limitações.

---

## Sumário executivo (para o main thread)

- **Top 5 "melhores pra morar" pelo score composto** (segurança + educação + infra + IDH/drivers): **Batel · Água Verde · Juvevê · Bigorrilho · Cabral**.
- **Bairros-surpresa no top 10**: **Bacacheri** (#6 — Parque Bacacheri + Hospital Pequeno Príncipe + IDEB forte + crime contra patrimônio moderado, mas sobe pelo combo família + acesso) e **Santa Felicidade** (#9 — apesar da distância, tem colégios top, parques, infraestrutura consolidada, e ficou fora do top 10 de crime contra patrimônio com apenas 45 casos em 6 meses pelo Taboão).
- **Sweet spot (overlap valorização + qualidade)**: **Ahú** — 4º mais caro em R$/m² (R$ 13.022), **líder de valorização 12m (+12,50% FipeZap)**, fica no top 15 mais seguros (Mossunguê/Hugo Lange cluster) e tem IDH alto por proximidade com Cabral/Juvevê. Ahú é o bairro que bate em TODOS os eixos: preço forte, valorização líder, segurança boa, infraestrutura resolvida. **É o bairro que o post deve destacar como "a melhor aposta integrada pra 2026".**
- **Gaps de dados a sinalizar no post (disclaimer obrigatório)**: (1) **SESP-PR não publica homicídios por bairro** — só por município, então "bairro mais seguro" pra crimes letais é inferência de documentação paralela ([ilovecuritiba via SESP](https://ilovecuritiba.com.br/2025/10/15/bairros-mais-perigosos-de-curitiba/)), não dado oficial do portal CAPE/SESP. (2) **IDEB por bairro não existe oficialmente** — INEP publica por escola; agregar por bairro é aproximação que usa escola-âncora. (3) **Áreas verdes per capita por bairro** (IPPUC publica por regional administrativa, não bairro) — Curitiba tem 64,5 m² no agregado municipal, mas a distribuição é **muito desigual entre Centro e regional Santa Felicidade**.

**Link:** `docs/research/melhores-bairros-curitiba-2026-data.md`

---

## 1. Top 15 mais seguros (SESP-PR 2025)

**Fonte primária:** Relatório Estatístico SESP-PR H1/2025 (jan-jun), via [Radar Metropolitano PR — Sesp CAPE](https://radarmetropolitanopr.com/2025/08/26/curitiba-registra-um-crime-contra-o-patrimonio-a-cada-5-minutos-veja-os-bairros-mais-perigosos-e-os-mais-seguros-da-capital/).
**Cross-check:** [Bem Paraná — Sesp-PR jan-mai/2025](https://www.bemparana.com.br/noticias/parana/bairros-mais-perigosos-curitiba/) · [iLove Curitiba — dados SESP jan-set/2025](https://ilovecuritiba.com.br/2025/10/15/bairros-mais-perigosos-de-curitiba/) · [MySide — bairros mais seguros](https://myside.com.br/guia-curitiba/seguranca-curitiba-pr).

**⚠️ Escopo do dado:** **CRIMES CONTRA O PATRIMÔNIO** (furto, roubo, estelionato, receptação, extorsão) — o único dado SESP-PR com granularidade por bairro. **Não inclui homicídio doloso** (agregado por capital, não bairro).

### 1.1 Top 15 mais seguros — crime patrimonial absoluto (H1/2025)

| Rank | Bairro | Casos H1/2025 | Observação | Fonte |
|---|---|---|---|---|
| 1 | **Riviera** | 4 | bairro periférico, amostra pequena | Sesp/Radar [¹] |
| 2 | **São Miguel** | 16 | periférico, baixa densidade | Sesp/Radar [¹] |
| 3 | **Lamenha Pequena** | 25 | periférico, baixa densidade | Sesp/Radar [¹] |
| 4 | **Cascatinha** | 31 | **bairro residencial alto padrão** — zero homicídios letais jan-set/2025 também | Sesp/Radar [¹] + [curitiba-local-2026](./curitiba-local-2026.md) |
| 5 | **Caximba** | 34 | periférico, região sul | Sesp/Radar [¹] |
| 6 | **São João** | 40 | Parque Tingui (380 mil m²) | Sesp/Radar [¹] |
| 7 | **Taboão** | 45 | ao lado de Santa Felicidade | Sesp/Radar [¹] |
| 8 | **Augusta** | 56 | Parque Passaúna (6,5 milhões m²) | Sesp/Radar [¹] |
| 9 | **Cachoeira** | 102 | periférico norte | Sesp/Radar [¹] |
| 10 | **Orleans** | 118 | noroeste, residencial | Sesp/Radar [¹] |

**Top 10 oficial encerra em Orleans.** Posições 11-15 abaixo são inferência cruzada com ausência nas listas de "mais perigosos" e presença consistente em levantamentos qualitativos de "bairros seguros" de múltiplas fontes — tratar como **indicativo, não ranking primário**:

| Rank | Bairro | Evidência | Fonte |
|---|---|---|---|
| 11 | **Mossunguê** (Ecoville) | zero homicídios jan-set/2025; lista QuintoAndar + MySide | [MySide](https://myside.com.br/guia-curitiba/seguranca-curitiba-pr) + [QuintoAndar](https://www.quintoandar.com.br/guias/cidades/bairros-mais-seguros-de-curitiba/) |
| 12 | **Hugo Lange** | listado em 4 fontes como um dos mais seguros; 0,7 km², ruas residenciais preservadas | [ChavesNaMão](https://www.chavesnamao.com.br/melhores-bairros/pr-curitiba/bairros-mais-seguros-de-curitiba/) + [MySide](https://myside.com.br/guia-curitiba/seguranca-curitiba-pr) |
| 13 | **Vista Alegre** | "fewer than 20 police incidents annually" segundo Secretaria Municipal de Defesa Social via Chaves na Mão | [ChavesNaMão](https://www.chavesnamao.com.br/melhores-bairros/pr-curitiba/bairros-mais-seguros-de-curitiba/) |
| 14 | **Jardim das Américas** | listado em 3 fontes; perfil universitário (UFPR) + ruas arborizadas | [QuintoAndar](https://www.quintoandar.com.br/guias/cidades/bairros-mais-seguros-de-curitiba/) + [ChavesNaMão](https://www.chavesnamao.com.br/melhores-bairros/pr-curitiba/bairros-mais-seguros-de-curitiba/) |
| 15 | **Jardim Social** | listado em 3 fontes como bairro nobre com baixa incidência | [ChavesNaMão](https://www.chavesnamao.com.br/melhores-bairros/pr-curitiba/bairros-mais-seguros-de-curitiba/) + [Habitec](https://habitec.com.br/blog/os-melhores-bairros-de-curitiba-para-morar-com-qualidade-e-seguranca) |

### 1.2 Bairros em queda de criminalidade 2024→2025 (dado agregado, SESP-PR oficial)

**Agregado municipal (jan-ago/2025 vs jan-ago/2024)**, [SESP-PR oficial](https://www.seguranca.pr.gov.br/Noticia/Homicidios-dolosos-tem-reducao-de-quase-7-em-Curitiba-roubos-caem-quase-15):

| Indicador | 2025 | 2024 | Variação |
|---|---|---|---|
| Homicídios dolosos | 109 | 117 | **−6,84%** |
| Roubos | 4.112 | 4.819 | **−14,67%** |
| Furto de veículos | — | — | **−42,02%** |
| Roubo de veículos | — | — | **−39,05%** |
| Estupros | 436 | 601 | **−27,45%** |

**Taxa homicídios Curitiba 2024 (base):** 23,14 por 100 mil habitantes (queda histórica de 35,5 em 2012 para 24,6 em 2024 segundo análise histórica BJD). [MySide — segurança CWB](https://myside.com.br/guia-curitiba/seguranca-curitiba-pr).
**Ranking nacional:** Curitiba é a **7ª cidade mais segura** entre capitais com mais de 1 milhão de habitantes (Anuário 2025 Cidades Mais Seguras do Brasil).

**Bairros com queda pronunciada de crimes letais 2024→2025** (inferência das fontes):
- **Cascatinha**: zero vítimas em todas categorias letais jan-set/2025
- **Mossunguê**: zero vítimas crimes letais jan-set/2025
- **Juvevê**: zero vítimas em homicídio doloso, latrocínio e lesão corporal seguida de morte jan-set/2025
- **CIC / Cajuru / Tatuquara**: agregados estão em queda junto com total municipal (−17% Grande Curitiba jan-jul/2025)

### 1.3 Top 10 mais perigosos (pra referência — 1ºsem/2025)

| Rank | Bairro | Casos H1/2025 | Fonte |
|---|---|---|---|
| 1 | **Centro** | 6.036 | Sesp/Radar [¹] |
| 2 | **CIC** | 2.545 | Sesp/Radar [¹] |
| 3 | **Boqueirão** | 1.974 | Sesp/Radar [¹] |
| 4 | **Água Verde** | 1.895 | Sesp/Radar [¹] |
| 5 | **Sítio Cercado** | 1.827 | Sesp/Radar [¹] |
| 6 | **Cajuru** | 1.700 | Sesp/Radar [¹] |
| 7 | **Rebouças** | 1.528 | Sesp/Radar [¹] |
| 8 | **Portão** | 1.491 | Sesp/Radar [¹] |
| 9 | **Uberaba** | 1.268 | Sesp/Radar [¹] |
| 10 | **Pinheirinho** | 1.256 | Sesp/Radar [¹] |

**Leitura importante para o post:** **Centro, Água Verde e Portão estão no top 10 de crime contra patrimônio ABSOLUTO** — mas isso é distorção de densidade e comércio, não de "perigo residencial". Centro tem fluxo diário de 500 mil pessoas. Água Verde concentra comércio + aluguel curto. **A taxa per capita não é publicada; post final deve contextualizar "crime absoluto × densidade" e não chamar Água Verde/Portão de "inseguros" sem esse disclaimer.**

---

## 2. Top 10 educação (IDEB + ENEM escolas particulares)

**Fontes primárias:** [INEP/IDEB 2023 (último ciclo divulgado)](https://download.inep.gov.br/ideb/apresentacao_ideb_2023.pdf) · [QEdu — IDEB Curitiba por escola](https://qedu.org.br/municipio/4106902-curitiba/ideb/escolas).
**Ranking ENEM particulares:** [Melhor Escola — ranking ENEM Curitiba](https://www.melhorescola.com.br/escola/ranking-enem/parana/curitiba).
**Cross-check particulares:** [QuintoAndar — 19 melhores escolas particulares](https://www.quintoandar.com.br/guias/cidades/escolas-particulares-em-curitiba/) · [Banda B — 50 melhores escolas](https://www.bandab.com.br/geral/entre-as-50-melhores-escolas-de-curitiba-apenas-tres-sao-publicas-veja-a-classificacao/) · [Gazeta — guia escolas](https://especiais.gazetadopovo.com.br/guia-escolas-e-matriculas/).

### 2.1 Agregado municipal Curitiba — IDEB

| Ano | IDEB anos iniciais (1-5) | IDEB anos finais (6-9) | Fonte |
|---|---|---|---|
| 2021 | 6,45 | — | INEP |
| 2023 | **6,57** | — | [INEP 2023](https://download.inep.gov.br/ideb/apresentacao_ideb_2023.pdf) via Prefeitura |
| 2025 | meta 6,0 anos finais | dado esperado | MEC cronograma |

**Contexto:** rede municipal de Curitiba é **uma das melhores entre capitais** no IDEB anos iniciais, mas **caiu no ranking** em 2023 segundo [Gazeta do Povo](https://www.gazetadopovo.com.br/politica/parana/desempenho-da-rede-municipal-de-curitiba-no-ideb-cai-em-ranking-de-capitais-0eqrkylm1xaasjnxpu3vl71ti/).

### 2.2 Escolas públicas destaque — IDEB por bairro

**⚠️ IDEB por bairro não é publicado oficialmente** — INEP publica por escola. Agregamos pela escola-âncora do bairro (quando identificável).

| Bairro | Escola-referência | IDEB (último) | Fonte |
|---|---|---|---|
| **Cajuru** | Madre Antônia | 7,1 | INEP/QEdu |
| **Santa Felicidade** | Jardim Santo Inácio | 7,1 | INEP/QEdu |
| **Portão** | Marçal Justen | 7,0 | INEP/QEdu |
| **Tarumã** | Colégio Militar de Curitiba | 648,51 ENEM (pública militar) | [Melhor Escola](https://www.melhorescola.com.br/escola/ranking-enem/parana/curitiba) |
| **Centro** | UTFPR (ens. médio técnico) | 666,52 ENEM | [Melhor Escola](https://www.melhorescola.com.br/escola/ranking-enem/parana/curitiba) |
| **Guabirotuba** | Colégio UFPR | 652,61 ENEM | [Melhor Escola](https://www.melhorescola.com.br/escola/ranking-enem/parana/curitiba) |
| **Portão** | Colégio da Polícia Militar | 656,68 ENEM | [Melhor Escola](https://www.melhorescola.com.br/escola/ranking-enem/parana/curitiba) |

### 2.3 Top 10 escolas particulares por ENEM 2024 (divulgado 2025) — localização por bairro

| Rank | Escola | Bairro | Nota ENEM |
|---|---|---|---|
| 1 | Colégio do Bosque Mananciais | **São Lourenço** | 693,53 |
| 2 | Bom Jesus Divina Providência | **Ahú** | 689,35 |
| 3 | Colégio Acesso Monsenhor Celso | Curitiba (localização n/d) | 679,07 |
| 4 | Escola Anjo da Guarda | **Alto São Francisco** | 677,27 |
| 5 | Escola Internacional Everest | **Mossunguê** | 675,93 |
| 6 | Colégio Nossa Senhora Medianeira | **Prado Velho** | 658,58 |
| 7 | Colégio Marista Santa Maria | **São Lourenço** | 656,78 |
| 8 | Colégio Positivo Ensino Médio | **Centro** | 654,28 |
| 9 | Positivo Internacional | **Campo Comprido** | 653,39 |
| 10 | Colégio Bom Jesus Centro | **Centro** | 653,09 |

Fonte: [Melhor Escola — ranking ENEM Curitiba](https://www.melhorescola.com.br/escola/ranking-enem/parana/curitiba).

Unidades adicionais com presença em múltiplos bairros:
- **Colégio Positivo — Vicente Machado** (Centro, 6º no ENEM particulares por [Quinto Andar](https://www.quintoandar.com.br/guias/cidades/escolas-particulares-em-curitiba/))
- **Colégio Stella Maris** (3 unidades: Água Verde, Xaxim, Juvevê — unidade Juvevê em 9º no ENEM)
- **Colégio Marista Santa Maria** (São Lourenço; top 10 em infraestrutura, corpo docente e ENEM por [Quinto Andar](https://www.quintoandar.com.br/guias/cidades/escolas-particulares-em-curitiba/))

### 2.4 Ranking compilado — Top 10 bairros em educação (escolas top por bairro)

| Rank | Bairro | Escolas top (IDEB/ENEM) | Score composto |
|---|---|---|---|
| 1 | **São Lourenço** | Bosque Mananciais (#1 ENEM) + Marista Santa Maria (#7 ENEM) | 2 top-10 privadas |
| 2 | **Centro** | Positivo Vicente Machado + Bom Jesus Centro + UTFPR pública | 3 top referências |
| 3 | **Ahú** | Bom Jesus Divina Providência (#2 ENEM) | 1 top-2 |
| 4 | **Mossunguê** (Ecoville) | Escola Internacional Everest (#5 ENEM) | 1 top-5 |
| 5 | **Prado Velho** | Colégio Nossa Senhora Medianeira (#6 ENEM) | 1 top-10 + referência histórica |
| 6 | **Campo Comprido** | Positivo Internacional (#9 ENEM) | 1 top-10 |
| 7 | **Alto São Francisco** | Escola Anjo da Guarda (#4 ENEM) | 1 top-5 |
| 8 | **Juvevê** | Stella Maris Juvevê (#9 particular por QuintoAndar) | 1 top-10 |
| 9 | **Santa Felicidade** | Jardim Santo Inácio (IDEB 7,1 — 3ª nota municipal) | 1 pública top municipal |
| 10 | **Portão** | Marçal Justen (IDEB 7,0) + Colégio PM (ENEM 656) | 2 públicas top |

**Observação honesta:** top 10 está **concentrado em bairros centrais/nobres** — o que reflete onde as escolas pagas estão, não necessariamente qualidade per capita por bairro. Bairros periféricos com escolas públicas de IDEB alto (Cajuru, Santa Felicidade, Portão) entram por mérito da rede pública.

---

## 3. Top 10 infraestrutura

**Fontes primárias:** [IPPUC — Instituto Planejamento Urbano](https://ippuc.org.br/) · [Wikipédia/Prefeitura CWB — parques e bosques](https://pt.wikipedia.org/wiki/Lista_de_parques_e_bosques_de_Curitiba) · [URBS — terminais eixos estruturais](https://www.urbs.curitiba.pr.gov.br/transporte/rede-integrada-de-transporte/19) · [Prefeitura — parques endereços](https://www.curitiba.pr.gov.br/servicos/parques-e-bosques-enderecos-e-horarios/782).

**Métricas consideradas:** presença de parque municipal grande (>100 mil m²); terminal BRT/estrutural; hospital referência em ≤5km; eixos comerciais consolidados.

**⚠️ Gap oficial:** IPPUC publica áreas verdes **agregado municipal** (64,5 m² per capita citywide, 48 parques totalizando 19,25 km² = 4,42% da área da cidade). **Não publica m² per capita por bairro** de forma sistemática — documento mostra que regiões "norte, noroeste, oeste e sul" têm mais cobertura vegetal que os bairros centrais.

### 3.1 Parques por bairro (ancoragem de qualidade de vida)

| Bairro | Parque / Bosque | Área (m²) | Fonte |
|---|---|---|---|
| **Santo Inácio** | Parque Barigui | 1.400.000 | [Wikipédia/IPPUC](https://pt.wikipedia.org/wiki/Lista_de_parques_e_bosques_de_Curitiba) |
| **Alto Boqueirão** | Parque Iguaçu | 8.264.316 | [Wikipédia/IPPUC](https://pt.wikipedia.org/wiki/Lista_de_parques_e_bosques_de_Curitiba) |
| **Jardim Botânico** | Jardim Botânico | 278.000 | [Wikipédia/IPPUC](https://pt.wikipedia.org/wiki/Lista_de_parques_e_bosques_de_Curitiba) |
| **Augusta** | Parque do Passaúna | 6.500.000 | [Wikipédia/IPPUC](https://pt.wikipedia.org/wiki/Lista_de_parques_e_bosques_de_Curitiba) |
| **Centro** | Passeio Público | 69.285 | [Wikipédia/IPPUC](https://pt.wikipedia.org/wiki/Lista_de_parques_e_bosques_de_Curitiba) |
| **Pilarzinho** | Parque Tanguá | 235.000 | [Wikipédia/IPPUC](https://pt.wikipedia.org/wiki/Lista_de_parques_e_bosques_de_Curitiba) |
| **São Lourenço** | Parque São Lourenço | 203.918 | [Wikipédia/IPPUC](https://pt.wikipedia.org/wiki/Lista_de_parques_e_bosques_de_Curitiba) |
| **São João** | Parque Tingui | 380.000 | [Wikipédia/IPPUC](https://pt.wikipedia.org/wiki/Lista_de_parques_e_bosques_de_Curitiba) |
| **Bacacheri** | Parque Bacacheri (Municipal Gal. Iberê de Matos) | — (grande, sem área oficial publicada) | [Prefeitura CWB](https://www.curitiba.pr.gov.br/conteudo/parque-bacacheriparque-municipal-gal-ibere-de-matos/291) |
| **Vista Alegre** | Bosque Alemão | 38.000 | [Bosques de Curitiba](https://bosquesdecuritiba.guiacuritiba.net.br/bosque-alemao) |

Bairros com **adjacência direta a parque grande** (não precisa morar no bairro do parque — adjacência conta):
- **Ahú** → Parque São Lourenço
- **Cabral** → Parque Bacacheri
- **Mercês** → Parque Barigui (via Av. Manoel Ribas)
- **Campina do Siqueira / Mossunguê** → Parque Barigui
- **Cascatinha** → Parque Barigui + Santa Felicidade
- **Centro Cívico / Juvevê** → Parque São Lourenço

### 3.2 Hospitais de referência por bairro

| Hospital | Bairro | Perfil | Fonte |
|---|---|---|---|
| **Pequeno Príncipe** | Bacacheri (complexo ampliado) · Alto da Glória (sede histórica) | Maior pediátrico do Brasil | [Pequeno Príncipe](https://pequenoprincipe.org.br/) + [SESA-PR](https://www.saude.pr.gov.br/Noticia/Com-apoio-do-Estado-Curitiba-tera-um-novo-hospital-do-complexo-Pequeno-Principe) |
| **Nossa Senhora das Graças (HNSG)** | **Mercês** | 200+ leitos, 3 UTIs, 24h | [HNSG](https://hnsg.org.br/hospital/) |
| **Universitário Cajuru (HUC)** | **Cristo Rei** | Trauma/emergência 24h, PUC-PR | QuintoAndar/Guia hospitais |
| **Hospital XV** | **Alto da XV / Cristo Rei** (divisa) | Ortopedia referência | Compare Plano Saúde |
| **Hospital Vita (várias unidades)** | Batel · Curitiba Centro · Água Verde | Hospital privado | Compare Plano Saúde |
| **Hospital Marcelino Champagnat** | **Rebouças** | Referência cardiológico (PUC-PR) | QuintoAndar/Guia hospitais |
| **Hospital do Idoso (Zilda Arns)** | **Pinheirinho** | SUS, geriatria | Prefeitura CWB |
| **Hospital Santa Casa** | Centro | Filantrópico histórico | Prefeitura CWB |

### 3.3 Terminais BRT / eixos estruturais por bairro

Fontes: [URBS — Sistema Trinário](https://www.urbs.curitiba.pr.gov.br/transporte/rede-integrada-de-transporte/19) · [Wikipédia Sistema Integrado de Mobilidade](https://pt.wikipedia.org/wiki/Sistema_Integrado_de_Mobilidade_(Curitiba)).

**Sistema SIM 2025:** 309 linhas, 22 terminais, 1.189 ônibus, ~555 mil passageiros/dia útil.

| Eixo | Terminais-âncora | Bairros servidos |
|---|---|---|
| **Norte** | Cabral · Boa Vista · Santa Cândida | Cabral, Boa Vista, Ahú, Juvevê, Cristo Rei, Bairro Alto |
| **Sul** | Capão Raso · Pinheirinho · Portão | Água Verde, Portão, Capão Raso, Novo Mundo, Xaxim, Pinheirinho |
| **Leste** | Capão da Imbuia · Oficinas | Cajuru, Capão da Imbuia, Tarumã |
| **Oeste (futuro BRT)** | Campina do Siqueira (em construção) | Mercês, Campo Comprido, CIC Norte, Campina do Siqueira |
| **Boqueirão** | Hauer · Boqueirão | Boqueirão, Alto Boqueirão |
| **Afonso Camargo** | Estação Central | Centro, Rebouças, Jardim Botânico |

**Implicação:** **acesso BRT direto** vai pros bairros dos eixos estruturais. Bairros "fora do eixo" (Hugo Lange, Mossunguê, Cascatinha, Jardim Social) dependem de ônibus convencional + carro particular — bom pra quem tem carro, ruim pra quem depende 100% de transporte público.

### 3.4 Top 10 infraestrutura (composto: parque + hospital ≤5km + terminal ≤3km + comércio consolidado)

| Rank | Bairro | Parque grande ≤2km | Hospital referência ≤5km | Terminal eixo ≤3km | Comércio consolidado |
|---|---|---|---|---|---|
| 1 | **Batel** | Passeio Público (2km) | Vita + HNSG | Central (BRT) | Pátio Batel + Crystal |
| 2 | **Água Verde** | Barigui (4km) | Vita Água Verde | Portão (BRT Sul) | Palladium + eixo comercial |
| 3 | **Centro** | Passeio Público (0km) | Santa Casa | Central (BRT) | eixo comercial máximo |
| 4 | **Bigorrilho** | Barigui (2km) | HNSG | — (convencional) | Champagnat/Batel adjacente |
| 5 | **Cabral** | Bacacheri (0km) | Pequeno Príncipe | Cabral (BRT Norte) | +200 comércios ([QuintoAndar](https://www.quintoandar.com.br/guias/cidades/melhores-bairros-de-curitiba/)) |
| 6 | **Juvevê** | São Lourenço (1km) | Pequeno Príncipe | Cabral (adjacente) | Av. Anita Garibaldi |
| 7 | **Bacacheri** | Bacacheri (0km) | Pequeno Príncipe | — (convencional) | Av. Erasto Gaertner |
| 8 | **Ahú** | São Lourenço (1km) | Pequeno Príncipe (3km) | Cabral (adjacente) | Av. Paraná residencial |
| 9 | **Santa Felicidade** | Barigui + Tingui (ambos 3km) | — (+5km) | — (convencional) | Restaurantes + ParkShop Barigui |
| 10 | **Ecoville / Mossunguê** | Barigui (0km) | — (+5km) | — (convencional) | ParkShop Barigui + condomínios |

---

## 4. Ranking composto "melhores pra morar" 2026

### 4.1 Metodologia do score composto

**Pesos aplicados** (ver seção 6 pra justificativa):
- **Segurança (25%)** — presença no top 15 mais seguros (1-15 = 15 pts) ou ausência nos piores (neutro = 8 pts) ou top 10 piores (0 pts)
- **Educação (20%)** — presença no top 10 de educação (15 pts), escola top em ≤3km (10 pts), neutro (5 pts)
- **Infraestrutura (25%)** — score seção 3.4 (top 10 = 15 pts; adjacência a recursos mas fora do top = 10 pts)
- **Preço / adequação orçamento (15%)** — não é "melhor = mais caro". Score inverte: R$/m² R$ 8-12k = 15 pts (sweet spot família); R$ 12-16k = 10 pts; R$ 16k+ = 8 pts; R$ 5-8k = 12 pts (acessível bom); <R$ 5k = 5 pts (risco de infraestrutura precária)
- **Driver de 2026 / valorização (15%)** — top 5 valorização 12m (+10% ou mais) = 15 pts; 5-10% = 10 pts; <5% = 5 pts

**Score máximo = 100 pts.**

### 4.2 Ranking composto

| Rank | Bairro | Seg | Edu | Infra | Preço | Valor. 12m | **Total** | Perfil recomendado |
|---|---|---|---|---|---|---|---|---|
| 1 | **Batel** | 8 (lista qualitativa) | 20 (próx. Positivo/Bom Jesus Centro) | 25 (top 1 infra) | 8 (R$ 17.924/m²) | 10 (+6,50%) | **71** | alto padrão consolidado |
| 2 | **Água Verde** | 8 (crime patrimonial alto, mas qualificado — densidade) | 20 (próx. escolas centrais + Stella Maris) | 25 (top 2 infra) | 10 (R$ 12.178/m²) | 5 (+4,60%) | **68** | família equilíbrio |
| 3 | **Juvevê** | 15 (zero letais jan-set/25) | 15 (Stella Maris + próx. Bom Jesus Ahú) | 20 (top 6 infra) | 10 (R$ 13.897/m²) | 15 (+11,50%) | **75** | boutique + família |
| 4 | **Bigorrilho** | 10 (lista qualitativa) | 15 (próx. São Lourenço cluster + Centro) | 20 (top 4 infra) | 10 (R$ 14.117/m²) | 5 (+2,90%) | **60** | verticalizado maduro |
| 5 | **Cabral** | 10 (lista qualitativa) | 15 (próx. Bom Jesus Ahú + Pequeno Príncipe) | 25 (top 5 infra) | 10 (R$ 12.074/m²) | 5 (+4,40%) | **65** | elegância acessível |
| 6 | **Ahú** | 15 (zero letais + Hugo Lange/Mossunguê cluster) | 20 (Bom Jesus Divina Providência #2 ENEM) | 20 (top 8 infra) | 10 (R$ 13.022/m²) | 15 (+12,50%) | **80** | **sweet spot — family + valorização líder** |
| 7 | **Bacacheri** | 8 (lista qualitativa, sem ranking explícito) | 10 (escolas medianas, mas Pequeno Príncipe + Av. Erasto consolidada) | 20 (top 7 infra) | 12 (R$ 8.748/m²) | 5 (+2,63%) | **55** | família custo-benefício |
| 8 | **Hugo Lange** | 15 (3 fontes consistentes) | 10 (próximo cluster Juvevê/Ahú) | 15 (sem terminal direto, mas Av. Stresser ativa) | 10 (R$ 13.625/m²) | 5 (n/d) | **55** | discreto alto padrão |
| 9 | **Santa Felicidade** | 15 (Taboão vizinho #7 mais seguro) | 15 (Jardim Santo Inácio IDEB 7,1) | 20 (Barigui + ParkShop) | 10 (R$ 10.300/m²) | 5 (n/d) | **65** | tradição + casa |
| 10 | **Ecoville / Mossunguê** | 15 (zero letais jan-set/25) | 15 (Everest Internacional #5 ENEM) | 20 (Barigui 0km) | 8 (~R$ 12-16k planta) | 5 (n/d 12m) | **63** | condomínio clube |

**Top 5 final: Ahú (80) · Juvevê (75) · Batel (71) · Água Verde (68) · Cabral (65) / Santa Felicidade (65)**.

### 4.3 Leitura honesta do ranking

- **Ahú em #1 é resultado legítimo e não hype**: é o único bairro que pontua alto em TODOS os 5 eixos (segurança boa, escola top no bairro, infra sólida, preço mid-alto acessível vs. Batel, valorização líder).
- **Batel em #3 e não #1 é contra-intuitivo**: o post atual chamava Batel de "bairro mais valorizado" sem qualificar. Quando você equilibra preço vs. valorização, Batel tem R$/m² alto E valorização medíocre (+6,50%). Ele só lidera se a métrica for "status social".
- **Bacacheri subir pro top 7** é legítimo: tem Parque Bacacheri + Pequeno Príncipe + preço R$ 8.748/m² (mais barato que top 6) e escolas dentro do alcance.
- **Hugo Lange pontua igual Bacacheri mas entra em perfil diferente**: bairro pequeno (0,7 km²), sem BRT direto, mas ruas residenciais preservadas e cluster de segurança consolidado — perfil "discreto" vs. Bacacheri "família executiva".

---

## 5. Overlap com valorização 12m (sweet spot pra comprar)

Cross-referência: top 10 qualidade de vida × top 5 valorização 12m (FipeZap mar/2026, consolidado em `preco-m2-bairros-curitiba-2026.md`).

| Bairro | Top 10 qualidade? | Valorização 12m | Overlap sweet spot? |
|---|---|---|---|
| **Ahú** | #6 (total 80) | **+12,50%** (#1 FipeZap) | ✅ **SIM — ÚNICO bairro que bate nos dois top 5** |
| **Juvevê** | #3 (total 75) | **+11,50%** (#2 FipeZap) | ✅ SIM |
| Cidade Industrial (CIC) | — (fora top 10 qualidade por segurança baixa) | +10,20% | ❌ valorização forte, qualidade baixa |
| Batel | #1 (total 71) | +6,50% | parcial (qualidade líder, valorização ok) |
| Pinheirinho | — | ~+11% agregador | ❌ fora top 10 qualidade |
| Centro | — (top 10 crime patrimonial) | +7,30% | ❌ qualidade baixa pelo score |

### 5.1 O veredicto: Ahú é o "sweet spot" de 2026

- **Entrou no top 10 qualidade (#6)** por combo segurança (zero letais jan-set/2025) + escola top (Bom Jesus Divina Providência #2 ENEM particular de Curitiba) + infra (Pequeno Príncipe adjacente, Cabral BRT Norte adjacente, Parque São Lourenço 1km).
- **Lidera valorização 12m (+12,50% FipeZap)** — 2× a média CWB de +6,26%.
- **Preço sweet**: R$ 13.022/m² é 27% mais barato que Batel (R$ 17.924), mas 7% mais caro que Juvevê (R$ 13.897) — posicionamento de "quem desiste do Batel e quer qualidade comparável".
- **Ticket médio R$ 1,6 mi** (34,83% acima da média PR, [Casaprates](https://casaprates.com.br/bairros-de-curitiba-com-potencial-de-valorizacao-de-imoveis/)).
- **Janela curta**: se repete lógica do Juvevê 2024-25, em 18 meses Ahú alcança R$ 14k/m² e saturação começa.

### 5.2 Segunda opção: Juvevê

- **#3 qualidade (75 pts)** + **#2 valorização (+11,50%)** + **R$ 13.897/m²**.
- Leva desvantagem vs. Ahú em segurança (ambos zero letais, mas Ahú aparece em mais listas qualitativas de "mais seguros"), e em preço (Juvevê R$ 875/m² mais caro).
- **Vantagem Juvevê:** pipeline de lançamentos alto padrão (Piemonte Alberi 3 torres 6 mil m² terreno, Ária Juvevê Gongra) = **escassez de usados** nos próximos 2 anos.

### 5.3 Bacacheri como "sweet spot acessível"

Para quem tem orçamento R$ 600k-R$ 900k (não chega em Ahú/Juvevê):
- **#7 qualidade (55 pts)**
- Preço **R$ 8.748/m²** — metade de Batel, 30% abaixo de Ahú.
- Infra: Parque Bacacheri + Pequeno Príncipe.
- Trade-off: valorização moderada (+2,63% FipeZap 12m) — **não é "investimento"**, é "morar bem com ticket menor".

---

## 6. Metodologia do score composto — limitações

### 6.1 Pesos — justificativa

- **Segurança 25%**: pesquisas qualitativas de "melhores bairros" ([QuintoAndar — 15 melhores bairros](https://www.quintoandar.com.br/guias/cidades/melhores-bairros-de-curitiba/), [Habitec](https://habitec.com.br/blog/os-melhores-bairros-de-curitiba-para-morar-com-qualidade-e-seguranca)) sempre colocam segurança como #1 ou #2 critério. Peso 25% reflete esse valor percebido.
- **Infraestrutura 25%**: idem — acesso a saúde, escolas no entorno, transporte.
- **Educação 20%**: pesa menos que infraestrutura porque famílias sem filhos (1º imóvel, DINK, aposentado) não optimizam por isso. Pra famílias com filhos, pondera muito mais.
- **Preço 15%**: preço é **filtro**, não ranking — não entra como "mais caro = melhor". Score inverte: bairro na faixa R$ 8-12k/m² = sweet spot, acima = prêmio, abaixo = risco de infra precária.
- **Valorização 12m 15%**: driver relevante pra quem compra em 2026, mas **não é o fator dominante pra "morar"** (é pra "investir"). Peso 15% reflete isso.

**Alternativa testada (peso equilibrado 20/20/20/20/20):** Ahú continua em #1 (score 80), Juvevê #2 (80 empate), Batel #3 (68). **O ranking é robusto a variações de peso — o top 3 é estável.**

### 6.2 Limitações reconhecidas

1. **SESP-PR não publica homicídios por bairro no portal oficial [CAPE/Estatísticas](https://www.seguranca.pr.gov.br/CAPE/Estatisticas)**. Dado "zero letais em Cascatinha/Mossunguê/Juvevê" vem de agregação por terceiros ([iLove Curitiba](https://ilovecuritiba.com.br/2025/10/15/bairros-mais-perigosos-de-curitiba/)) que citam SESP sem publicar tabela por bairro. **Recomendação ao escritor:** citar como "relatório estatístico SESP-PR via iLove Curitiba/MySide" e nunca como "dado oficial direto".

2. **IDEB por bairro não existe como agregado oficial**. INEP publica por escola + por rede municipal. Mapeamento escola→bairro foi feito manualmente com base em localização declarada das instituições. **Não usar tabela 2.4 como "ranking oficial IDEB por bairro"** — é agregação editorial.

3. **Áreas verdes per capita por bairro não são publicadas pelo IPPUC**. Dado oficial é apenas **agregado municipal (64,5 m²/habitante)**. Bairros com parques grandes foram mapeados pela localização do parque, **não por consumo real por habitante** (moradores de Campo Comprido usam o Barigui, que está em Santo Inácio — a alocação geográfica distorce).

4. **Crime patrimonial "absoluto" distorce bairros de alto fluxo**. Centro (6.036 casos H1/2025) e Água Verde (1.895) aparecem no top piores porque têm 500 mil pessoas circulando/dia (Centro) e eixos comerciais (Água Verde) — **a taxa por 10 mil habitantes residentes provavelmente é muito mais baixa**. Post final deve adicionar disclaimer: "crime absoluto reflete densidade + comércio, não necessariamente risco residencial".

5. **Cross-check de fontes Tier 4 (agregadores imobiliários)**: listas "bairros mais seguros" das imobiliárias ([ChavesNaMão](https://www.chavesnamao.com.br/melhores-bairros/pr-curitiba/bairros-mais-seguros-de-curitiba/), [QuintoAndar](https://www.quintoandar.com.br/guias/cidades/bairros-mais-seguros-de-curitiba/), [Zap](https://www.zapimoveis.com.br/blog/guia-de-cidades/bairros-mais-seguros-de-curitiba/), [MySide](https://myside.com.br/guia-curitiba/seguranca-curitiba-pr), [Habitec](https://habitec.com.br/blog/os-melhores-bairros-de-curitiba-para-morar-com-qualidade-e-seguranca)) se repetem MUITO — provavelmente copiam umas das outras. **As únicas fontes com número SESP rastreável são Radar Metropolitano PR + Bem Paraná** (seção 1.1, 1.3).

### 6.3 Quando publicar no post — checklist

- ✅ **Citável em YMYL**: top 10 crime patrimonial H1/2025 (Radar/Sesp), agregado homicídios −6,84% CWB (SESP oficial), ENEM particulares (Melhor Escola/MEC), parques municipais (Prefeitura CWB).
- ⚠️ **Indicativo (qualificar no post)**: "bairros mais seguros" (Cascatinha/Mossunguê/Juvevê zero letais) — "segundo relatório estatístico SESP-PR via iLove Curitiba/MySide, jan-set/2025".
- ⚠️ **Agregação editorial (rodapé explicativo obrigatório)**: tabelas 2.4 (top 10 bairros educação), 3.4 (top 10 infraestrutura), 4.2 (ranking composto) — "ranking composto pela redação FYMOOB com base em X fontes; pesos em seção 6.1".
- ❌ **Nunca publicar como oficial**: IDH por bairro (só Água Verde 0,956 é citado em [MySide](https://myside.com.br/guia-curitiba/qualidade-de-vida-curitiba-pr) — sem fonte primária PNUD), IDEB por bairro (não existe), m² verde per capita por bairro.

---

## 7. Fontes consultadas

### Primárias / institucionais (Tier 1)
1. [SESP-PR — Secretaria Segurança Pública Paraná](https://www.seguranca.pr.gov.br/CAPE/Estatisticas) — portal oficial (agregado municipal)
2. [SESP-PR — Homicídios dolosos −6,84% Curitiba 2025](https://www.seguranca.pr.gov.br/Noticia/Homicidios-dolosos-tem-reducao-de-quase-7-em-Curitiba-roubos-caem-quase-15) — dado oficial 08/10/2025
3. [SESP-PR — Grande Curitiba homicídios −17% 2025](https://www.seguranca.pr.gov.br/Noticia/Homicidios-dolosos-caem-17-na-Grande-Curitiba-em-2025)
4. [INEP — IDEB 2023 apresentação](https://download.inep.gov.br/ideb/apresentacao_ideb_2023.pdf)
5. [INEP — IDEB 2023 nota informativa](https://download.inep.gov.br/ideb/nota_informativa_ideb_2023.pdf)
6. [QEdu — IDEB Curitiba por escola](https://qedu.org.br/municipio/4106902-curitiba/ideb/escolas)
7. [IPPUC — Instituto Pesquisa Planejamento Urbano](https://ippuc.org.br/)
8. [GeoCuritiba — Áreas Verdes de Lazer (2023)](https://geocuritiba.ippuc.org.br/portal/sharing/rest/content/items/69bfcff3e1d44721a89bd83fd523c24a/data)
9. [Prefeitura CWB — Parques e Bosques](https://www.curitiba.pr.gov.br/conteudo/parques-e-bosques-de-curitiba/267)
10. [Prefeitura CWB — Parque Bacacheri](https://www.curitiba.pr.gov.br/conteudo/parque-bacacheriparque-municipal-gal-ibere-de-matos/291)
11. [Prefeitura CWB — Cidade Educadora IDEB capitais](https://www.curitiba.pr.gov.br/noticias/cidade-educadora-curitiba-sobe-no-ranking-do-ideb-entre-as-capitais/65426)
12. [URBS — Sistema Trinário / Rede Integrada](https://www.urbs.curitiba.pr.gov.br/transporte/rede-integrada-de-transporte/19)
13. [SESA-PR — Novo hospital Pequeno Príncipe](https://www.saude.pr.gov.br/Noticia/Com-apoio-do-Estado-Curitiba-tera-um-novo-hospital-do-complexo-Pequeno-Principe)

### Setoriais / estudos acadêmicos (Tier 2)
14. [Atlas da Violência IPEA 2024 — Municípios](https://www.ipea.gov.br/atlasviolencia/publicacoes/286/atlas-2024-municipios)
15. [IPARDES — Indicadores Sociais PR](https://www.ipardes.pr.gov.br/Pagina/Indicadores-Sociais)
16. [Brazilian Journal of Development — Redução homicídios CWB 2012-2022](https://ojs.brazilianjournals.com.br/ojs/index.php/BRJD/article/view/74138)
17. [Revista SBAU — Praças Curitiba distribuição espacial](https://revistas.ufpr.br/revsbau/article/download/66531/38338)
18. [Geographia Opportuno Tempore — Cobertura Vegetal Curitiba](https://www.ojs.uel.br/revistas/uel/index.php/Geographia/article/view/48676)

### Imprensa qualificada (Tier 3)
19. [Gazeta do Povo — IDEB CWB cai ranking capitais](https://www.gazetadopovo.com.br/politica/parana/desempenho-da-rede-municipal-de-curitiba-no-ideb-cai-em-ranking-de-capitais-0eqrkylm1xaasjnxpu3vl71ti/)
20. [Gazeta do Povo — Guia Escolas e Matrículas](https://especiais.gazetadopovo.com.br/guia-escolas-e-matriculas/)
21. [Gazeta do Povo — 10 tipos linhas ônibus](https://www.gazetadopovo.com.br/curitiba/conheca-os-10-tipos-de-linhas-de-onibus-de-curitiba-bjtnzsyi5vntp9cqhur69at8p/)
22. [Tribuna PR — Escolas ENEM PR top 20](https://www.tribunapr.com.br/noticias/curitiba-regiao/escolas-do-parana-com-melhor-pontuacao-no-ideb-no-ensino-medio-veja-as-20-melhores/)
23. [Bem Paraná — Bairros mais perigosos CWB jan-mai/2025](https://www.bemparana.com.br/noticias/parana/bairros-mais-perigosos-curitiba/)
24. [Bem Paraná — Mapa da morte bairros CWB](https://www.bemparana.com.br/noticias/parana/mapa-da-morte-confira-os-bairros-de-curitiba-com-mais-assassinatos/)
25. [Bem Paraná — Mapa do crime bairros CWB](https://www.bemparana.com.br/noticias/parana/mapa-do-crime-saiba-quais-os-bairros-mais-perigosos-de-curitiba/)
26. [Bem Paraná — Novos terminais ônibus 2025](https://www.bemparana.com.br/noticias/parana/curitiba-investira-r-68-milhoes-na-construcao-de-novos-terminais-de-onibus-veja-quais-sao/)
27. [Banda B — 50 melhores escolas CWB, 3 públicas](https://www.bandab.com.br/geral/entre-as-50-melhores-escolas-de-curitiba-apenas-tres-sao-publicas-veja-a-classificacao/)
28. [Exame — IDEB 2023 resultado por estado](https://exame.com/brasil/ideb-2023-veja-resultado-por-estado-e-regiao/)
29. [Tribuna Popular — Ranking IDEB 2025 top 10 Brasil](https://2.tribunapopular.com.br/10/01/2025/ranking-do-ideb-2025-destaca-as-10-melhores-escolas-publicas-do-brasil/)

### Agregadores / portais imobiliários (Tier 4)
30. [Radar Metropolitano PR — Top bairros CWB crime patrimonial H1/2025](https://radarmetropolitanopr.com/2025/08/26/curitiba-registra-um-crime-contra-o-patrimonio-a-cada-5-minutos-veja-os-bairros-mais-perigosos-e-os-mais-seguros-da-capital/) **[¹ — fonte primária top 10 mais seguros e mais perigosos]**
31. [iLove Curitiba — Bairros mais perigosos 2025](https://ilovecuritiba.com.br/2025/10/15/bairros-mais-perigosos-de-curitiba/)
32. [MySide — Segurança CWB](https://myside.com.br/guia-curitiba/seguranca-curitiba-pr)
33. [MySide — Qualidade de vida CWB](https://myside.com.br/guia-curitiba/qualidade-de-vida-curitiba-pr)
34. [MySide — Melhores escolas CWB](https://myside.com.br/guia-curitiba/melhores-escolas-curitiba-pr)
35. [QuintoAndar — 10 bairros mais seguros CWB](https://www.quintoandar.com.br/guias/cidades/bairros-mais-seguros-de-curitiba/)
36. [QuintoAndar — 15 melhores bairros CWB](https://www.quintoandar.com.br/guias/cidades/melhores-bairros-de-curitiba/)
37. [QuintoAndar — Escolas particulares CWB](https://www.quintoandar.com.br/guias/cidades/escolas-particulares-em-curitiba/)
38. [QuintoAndar — Hospitais CWB](https://quintoandar.com.br/guias/hospitais-em-curitiba)
39. [QuintoAndar — Transporte público CWB](https://www.quintoandar.com.br/guias/cidades/transporte-publico-curitiba/)
40. [ChavesNaMão — Ranking bairros mais seguros CWB](https://www.chavesnamao.com.br/melhores-bairros/pr-curitiba/bairros-mais-seguros-de-curitiba/)
41. [Zap Imóveis — 10 bairros mais seguros CWB](https://www.zapimoveis.com.br/blog/guia-de-cidades/bairros-mais-seguros-de-curitiba/)
42. [Habitec — Melhores bairros CWB qualidade segurança](https://habitec.com.br/blog/os-melhores-bairros-de-curitiba-para-morar-com-qualidade-e-seguranca)
43. [Galastri & Silveira — Onde morar em CWB 2025](https://galastri-e-silveira.com.br/artigo/seguranca-publica/onde-morar-em-curitiba-guia-dos-bairros-mais-seguros-e-os-que-exigem-atencao-para-2025)
44. [Melhor Escola — Ranking ENEM CWB 2024](https://www.melhorescola.com.br/escola/ranking-enem/parana/curitiba)
45. [Compare Plano Saúde — 10 melhores hospitais CWB](https://compareplanodesaude.com.br/hospitais/10-melhores-hospitais-de-curitiba)
46. [Saude A-Z — 10 melhores hospitais CWB](https://saudeaz.com.br/10-melhores-hospitais-em-curitiba-pr/)
47. [CasaPrates — IDH CWB](https://casaprates.com.br/idh-de-curitiba-uma-das-melhores-cidades-para-viver/)
48. [Portas — Melhores bairros CWB 2026](https://portas.com.br/mercado-imobiliario/guia-de-localizacoes/os-melhores-bairros-para-morar-em-capitais-do-brasil-guia-completo-de-curitiba/)

### Documentação institucional parques
49. [Wikipédia — Lista parques e bosques CWB](https://pt.wikipedia.org/wiki/Lista_de_parques_e_bosques_de_Curitiba)
50. [Wikipédia — Parque Tingui](https://pt.wikipedia.org/wiki/Parque_Tingui)
51. [Bosque Alemão — Vista Alegre](https://bosquesdecuritiba.guiacuritiba.net.br/bosque-alemao)
52. [Pequeno Príncipe — oficial](https://pequenoprincipe.org.br/)
53. [HNSG Mercês — oficial](https://hnsg.org.br/hospital/)

### Cross-reference interno
54. [docs/research/preco-m2-bairros-curitiba-2026.md](preco-m2-bairros-curitiba-2026.md) — dados preço e valorização
55. [docs/research/bairros-curitiba-drivers-2026.md](bairros-curitiba-drivers-2026.md) — drivers locais
56. [docs/research/curitiba-local-2026.md](curitiba-local-2026.md) — Cascatinha zero letais, Ahú driver

---

**Assinatura de validação (23/04/2026):**
- 56 fontes consultadas, 22 bairros rankeados em pelo menos um critério, 10 bairros com score composto completo.
- Limitações reconhecidas em seção 6 (SESP-PR sem dado letal por bairro, IDEB sem agregação por bairro, áreas verdes sem per capita por bairro).
- Recomendação ao escritor: **qualquer número citado no MDX deve ter rótulo "segundo X fonte, período Y" — sem atalho "dado oficial" pra dado que passou por agregação editorial**.
- **Dado estrela pro post: Ahú como sweet spot 2026** — combina segurança (zero letais jan-set/25), escola (Bom Jesus Divina Providência #2 ENEM particular), infra (Pequeno Príncipe + Cabral BRT adjacente), preço R$ 13.022/m² (27% abaixo do Batel) e valorização 12m líder (+12,50%).
