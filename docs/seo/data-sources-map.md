# Mapa de Fontes de Dados — FYMOOB Research Protocol

> Data: 2026-04-23. Última revisão: 2026-04-23.
> Responsável: equipe de conteúdo + SEO.
> Escopo: toda investigação factual para posts YMYL (MCMV, ITBI, financiamento, jurisprudência, preço m², segurança, demografia).

## Resumo executivo

Fontes para artigos imobiliários brasileiros se organizam em seis tiers por confiabilidade e força probatória. **Tier 1** (primárias oficiais — governo federal, estadual, municipal, legislação) tem peso máximo e é obrigatório em toda afirmação YMYL. **Tier 2** (setoriais autoritativas — ADEMI, Sinduscon, Abecip, FGV, Fipe, CBIC, IRIB) sustenta dados de mercado não cobertos pelo governo. **Tier 3** (imprensa econômica qualificada — Valor, Estadão, JOTA, InfoMoney) serve para contexto e citações secundárias. **Tier 4** (agregadores especializados — FipeZap, Quinto Andar Index, Loft Index) oferece séries operacionais mas requer cross-check. **Tier 5** (imprensa generalista — UOL, G1, CNN) é tolerado só para eventos sem cobertura qualificada. **Tier 6** (Jusbrasil, Wikipedia, blogs, Larya/MySide sem fonte) é uso restritíssimo — apenas como pointer, nunca como citação final. **Toda afirmação numérica YMYL deve citar no mínimo 1 fonte Tier 1 ou Tier 2**; agregadores (Tier 4+) sozinhos não bastam.

---

## Tier 1 — Primárias Oficiais

### Federais

| Fonte | URL / API | Tipo | Periodicidade | Uso recomendado |
|---|---|---|---|---|
| **BCB SGS (Sistema Gerenciador de Séries Temporais)** | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.{codigo}/dados?formato=json&dataInicial=DD/MM/AAAA&dataFinal=DD/MM/AAAA` | API REST JSON | Diária/mensal | Selic (cód. 11 diária, 4390 acum. mês), TR (cód. 226), endividamento famílias (cód. 19882), taxa média crédito PF (25479), SBPE saldo (20542). **Limite 10 anos/request.** |
| **BCB Dados Abertos (portal)** | `https://dadosabertos.bcb.gov.br/` | JSON / CSV / OData | Varia | Descoberta de códigos de série — cada série vira um dataset indexado |
| **gov.br — Ministério das Cidades** | `https://www.gov.br/cidades/pt-br` | HTML / PDFs | Ad-hoc | MCMV (faixas, tetos, regras), portarias, boletins de habitação |
| **Planalto — Legislação Federal** | `https://www.planalto.gov.br/ccivil_03/leis/` | HTML | Permanente | Lei 8.245/91 (Locação), Lei 10.931/04, CC arts 653-681 (mandato), LC 108/2017 |
| **STJ — Jurisprudência** | `https://scon.stj.jus.br/SCON/` | HTML / RSS | Contínua | Acórdãos, súmulas (ex: Súmula 543 rescisão compra e venda). Única referência confiável pra citar STJ |
| **STF — Jurisprudência** | `https://portal.stf.jus.br/jurisprudencia/` | HTML | Contínua | Controle constitucional; RE 928902 (juros mora), ADIs sobre ITBI |
| **IBGE — API SIDRA** | `https://apisidra.ibge.gov.br/values/t/{tabela}/n/{niveis}/v/{variaveis}/p/{periodos}/c/{classif}?formato=json` | REST JSON / XML | Varia (mensal/anual/decenal) | PNAD Contínua, POF, Censo 2022, renda domiciliar, domicílios por município. Limite 100 mil valores/query |
| **IBGE Cidades** | `https://cidades.ibge.gov.br/brasil/pr/curitiba/panorama` | HTML / painel | Atualizações oficiais | Panorama rápido de indicadores por município (fallback ao SIDRA) |
| **Receita Federal** | `https://www.gov.br/receitafederal/` | HTML / consultas | Contínua | Instruções normativas sobre IR ganho de capital em imóveis, isenção, GCAP |
| **Caixa Econômica Federal** | `https://www.caixa.gov.br/voce/habitacao/` | HTML / PDFs | Mensal | Tabelas MCMV, taxas oficiais, simuladores, portarias |
| **CNJ — DataJud** | `https://www.cnj.jus.br/pesquisas-judiciarias/` | Painéis / CSV | Anual | Estatística judiciária agregada, tempo de tramitação |

### Estaduais-PR

| Fonte | URL / API | Tipo | Periodicidade | Uso recomendado |
|---|---|---|---|---|
| **TJ-PR Jurisprudência** | `https://portal.tjpr.jus.br/jurisprudencia/` | Busca web | Contínua | Acórdãos câmaras cíveis — locação, condomínio, compra e venda. Sem API pública, extração via scraping ou busca manual. **Preferir a Jusbrasil pra citar TJ-PR** |
| **SESP-PR / CAPE — Estatísticas** | `https://www.seguranca.pr.gov.br/CAPE/Estatisticas` | PDF / painéis | Mensal | Roubos, furtos, homicídios por município e bairro. Contato: cape@sesp.pr.gov.br. Dados por bairro para Curitiba disponíveis (top 10 bairros com mais crimes) |
| **Pesquisa de Vitimização PR 2025** | `https://www.seguranca.pr.gov.br/Pesquisa-de-vitimizacao-pr-2025` | PDF | Anual | Dado qualitativo sobre sensação de segurança — ÚNICO que mede "percepção" |
| **Agência Estadual de Notícias (AEN-PR)** | `https://www.aen.pr.gov.br/` | HTML | Diária | Release oficial — primeira fonte p/ números divulgados pelo governo estadual |
| **Secretaria da Justiça e Cidadania (PR) — Índices** | `https://www.justica.pr.gov.br/Pagina/Indices-de-Seguranca-Publica` | HTML | Anual | Indicadores complementares |
| **JUCEPAR** | `https://www.jucepar.pr.gov.br/` | Busca | Contínua | Validar razão social de imobiliárias/construtoras citadas |

### Municipais-Curitiba

| Fonte | URL / API | Tipo | Periodicidade | Uso recomendado |
|---|---|---|---|---|
| **Portal de Dados Abertos Curitiba** | `https://dadosabertos.curitiba.pr.gov.br/` | CSV (32 datasets) | Mensal/anual | Base de Alvarás (alvarás de construção, muito útil p/ tendência setor), SIAC 156, receitas/despesas, Clique Economia |
| **IPPUC — Geodownloads** | `https://ippuc.org.br/geodownloads/geo.htm` | Shapefile (ESRI) | Anual | Malha viária, bairros, hidrografia, ortofotos. DATUM SAD-69 UTM-22. **Único com shapefile de bairros oficial** |
| **Portal de Dados Abertos ArcGIS (Curitiba)** | `https://portal-de-dados-abertos-prefeitura-de-curitiba-1-imagem-govmun.hub.arcgis.com/` | CSV / KML / GeoJSON / GeoTIFF / PNG / REST ArcGIS | Varia | Infraestrutura georreferenciada — zoneamento, unidades de atendimento, equipamentos públicos |
| **InfoCuritiba — Base estatística** | `https://www.curitiba.pr.gov.br/servicos/infocuritiba-base-de-dados-estatisticos/147` | Painéis | Anual | Agregado de indicadores municipais (educação, saúde, etc) |
| **Finanças Curitiba (arrecadação)** | `https://financas.curitiba.pr.gov.br/` | Portal | Mensal/anual | ITBI arrecadado, IPTU, transferências. Valida ordem de grandeza do mercado |
| **Câmara Municipal de Curitiba** | `https://www.curitiba.pr.leg.br/` | HTML | Contínua | Projetos de lei, LCs municipais (ex: LC 108/2017 de ITBI), atas |
| **Plano Diretor / Zoneamento** | `https://www.curitiba.pr.gov.br/conteudo/plano-diretor/94` | PDF | Revisão a cada ~10 anos | Zonas ZR, ZT, ZCC — explica por que preços diferem por bairro |
| **COHAB-CT** | `https://www.cohab.curitiba.pr.gov.br/` | HTML | Ad-hoc | Habitação social, programas municipais |

### Legislação (acesso a textos-lei)

| Fonte | URL | Observações |
|---|---|---|
| **Planalto** | `https://www.planalto.gov.br/ccivil_03/` | Leis federais consolidadas — fonte preferencial |
| **LegisWeb** | `https://www.legisweb.com.br/` | Legislação estadual e normas infralegais — útil quando Planalto não cobre |
| **LeisMunicipais.com.br** | `https://leismunicipais.com.br/` | Legislação municipal CWB (LC 40/2001 Plano Diretor, LC 108/2017 ITBI) — **versões consolidadas** |
| **Diário Oficial do Município** | `https://legisladocexterno.curitiba.pr.gov.br/` | Publicações oficiais p/ confirmação de vigência |

---

## Tier 2 — Setoriais Autoritativas

### Mercado imobiliário

| Fonte | URL | Dados | Uso recomendado |
|---|---|---|---|
| **ADEMI-PR** | `https://ademipr.com.br/` | Pesquisa trimestral do mercado CWB: VGV, lançamentos, vendas, estoque por tipologia e bairro | **Principal fonte CWB** p/ dinâmica de oferta e demanda. Usar como número primário junto com Sinduscon |
| **Sinduscon-PR** | `https://sindusconpr.com.br/` | Custo de obra (CUB-PR), pesquisas setoriais | INCC regional complementa FGV nacional |
| **Secovi-PR** | `https://www.secovipr.com.br/` | Locação, administradoras, pesquisa aluguéis | Sindicato de corretores e locadores |
| **ABRAINC** | `https://www.abrainc.org.br/dados-de-mercado/` | Indicadores nacionais trimestrais (novos empreendimentos) | Benchmark Brasil p/ comparação com CWB |
| **CBIC** | `https://www.cbic.org.br/` | Banco de dados CBIC, publicações de mercado, INCC | Série histórica de preços de construção |
| **Abecip** | `https://www.abecip.org.br/` | Relatório mensal SBPE (data-abecip-AAAA-MM.pdf), projeções de crédito | **Fonte primária pra crédito imobiliário** — volumes mensais publicados em PDF |

### Financeiras

| Fonte | URL | Dados | Uso recomendado |
|---|---|---|---|
| **Fipe** | `https://www.fipe.org.br/pt-br/indices/fipezap/` | Índice FipeZap — relatórios mensais PDF + série histórica Excel (XLS). Mais de 50 cidades, incluindo CWB | **Fonte oficial Fipe.** Não há CSV público — baixar XLS ou PDFs mensais em `https://downloads.fipe.org.br/indices/fipezap/fipezap-AAAAMM-residencial-venda-publico.pdf`. Contato: fipezap@fipe.org.br |
| **FGV IBRE — INCC** | `https://portalibre.fgv.br/` | INCC-M, INCC-DI (inflação construção civil) | Reajuste de obra |
| **Anbima** | `https://www.anbima.com.br/` | Fundos imobiliários, LCI, LIG | Referência p/ produtos financeiros de funding imobiliário |

### Fiscais / notariais

| Fonte | URL | Dados | Uso recomendado |
|---|---|---|---|
| **IBPT** | `https://ibpt.com.br/` | Carga tributária, ITBI por município (estudos) | Benchmark nacional |
| **Colégio Notarial do Brasil** | `https://notariado.org.br/` | Tabelas de emolumentos, transferências | Custos de cartório |
| **Anoreg-PR** | `https://anoregpr.org.br/` | Registros de imóveis PR | Estatística de escrituras e registros |
| **IRIB** | `https://www.irib.org.br/` | Registros de imóveis nacional | Publicações técnicas e estatísticas registrais |
| **Sescap-PR** | `https://sescap-pr.org.br/` | Orientação contábil-fiscal imobiliária | Complementa Receita Federal |

### Jurídicos

| Fonte | URL | Uso recomendado |
|---|---|---|
| **OAB-PR** | `https://www.oabpr.org.br/` | Comissões temáticas (Direito Imobiliário, Notarial) |
| **IBDC / IBDFAM** | `https://ibdfam.org.br/` | Direito de família com reflexo patrimonial (regime bens, partilha) |

---

## Tier 3 — Imprensa Econômica Qualificada

### Top Tier

| Fonte | URL | Observações |
|---|---|---|
| **Valor Econômico** | `https://valor.globo.com/` | Referência nacional — checa número ABECIP/ADEMI antes |
| **Estadão Economia** | `https://economia.estadao.com.br/` | Cobertura macro + setor imobiliário |
| **Folha Mercado** | `https://www1.folha.uol.com.br/mercado/` | Complementa Estadão/Valor |
| **Agência Brasil** | `https://agenciabrasil.ebc.com.br/` | Versão pública oficial — frequentemente replica releases gov |

### Especializada Finanças

| Fonte | URL | Observações |
|---|---|---|
| **InfoMoney** | `https://www.infomoney.com.br/` | Boa p/ Selic, FIIs, ações do setor |
| **Exame Invest** | `https://exame.com/invest/` | Análise patrimonial |
| **Seu Dinheiro** | `https://www.seudinheiro.com/` | Linguagem acessível |
| **Poder360** | `https://www.poder360.com.br/` | Macroeconomia + política fiscal |

### Especializada Jurídica

| Fonte | URL | Observações |
|---|---|---|
| **JOTA** | `https://www.jota.info/` | **Referência em análise jurídica.** Cita STJ/STF com contexto |
| **Conjur** | `https://www.conjur.com.br/` | Paywall parcial; bom pra precedentes |
| **Migalhas** | `https://www.migalhas.com.br/` | Boletim jurídico — útil p/ monitorar novas súmulas |

### Setor imobiliário qualificado

| Fonte | URL | Observações |
|---|---|---|
| **Estadão Imóveis** | `https://imoveis.estadao.com.br/` | Coluna especializada |
| **Exame Casual** | `https://exame.com/` (seção imóveis) | Análises de mercado |
| **Papo Imobiliário** | `https://www.papoimobiliario.com/` | Replica release ABECIP/ADEMI com análise |

---

## Tier 4 — Agregadores Especializados

> **Disclaimer:** agregadores têm metodologia proprietária. Cite-os em complemento, nunca sozinhos para dado crítico. Sempre checar metodologia antes de usar.

### Dashboards de mercado

| Fonte | URL | Dados | Disclaimer |
|---|---|---|---|
| **FipeZap** | `https://www.fipe.org.br/pt-br/indices/fipezap/` | Preço m² anúncio venda/aluguel por cidade e bairro | É Tier 2 quando a metodologia Fipe é citada; Tier 4 quando replicado por terceiros |
| **DataZap+ (FipeZAP+)** | `https://www.datazap.com.br/` | Microdados FipeZap — pago | Pago. Usar pra relatórios premium |
| **QuintoAndar Index** | `https://www.quintoandar.com.br/` (seções de índice) | Preço aluguel por bairro | Metodologia própria — citar como "segundo QuintoAndar" |
| **Zap/Imovelweb Index** | `https://www.zapimoveis.com.br/` | Série histórica de anúncios | Idem |
| **Loft Index / Loft Data** | `https://loft.com.br/` | Dados metropolitanos | Idem |

### Dados setoriais

| Fonte | URL | Observações |
|---|---|---|
| **Abrainc Radar** | `https://www.abrainc.org.br/dados-de-mercado/indicadores-publicacoes/` | Tier 2 oficial — NÃO é Tier 4. Mantido aqui só por semelhança de formato de relatório |
| **CBIC — Banco de Dados** | `https://www.cbic.org.br/` | Idem |
| **BoaConta** | dashboards fiscais | Calculadora tributária — checar antes de usar |

### Local CWB

| Fonte | URL | Observações |
|---|---|---|
| **Bem Paraná** | `https://www.bemparana.com.br/` | Jornalismo local — cobertura SESP, ADEMI |
| **Tribuna do Paraná** | `https://www.tribunapr.com.br/` | Idem |
| **Gazeta do Povo — Economia** | `https://www.gazetadopovo.com.br/economia/` | Tier 3 regional (melhor qualidade editorial) |
| **Agora Paraná** | `https://www.agoraparana.com.br/` | Releases do governo estadual |
| **CBN Curitiba** | `https://cbncuritiba.com.br/` | Rádio + site — entrevistas com ADEMI |

---

## Tier 5 — Imprensa Generalista

| Fonte | URL | Regra de uso |
|---|---|---|
| **UOL** | `https://www.uol.com.br/` | Só quando ninguém mais cobriu, ou pra eventos locais factuais |
| **CNN Brasil** | `https://www.cnnbrasil.com.br/` | Idem |
| **G1** | `https://g1.globo.com/pr/parana/` | Cobertura local razoável — mas sempre cross-check com AEN-PR |
| **R7** | `https://www.r7.com/` | Mesmo padrão |
| **Band News FM Curitiba** | `https://bandnewsfmcuritiba.com/` | Releases SESP |

**Regra:** jamais usar Tier 5 como única fonte para número crítico (ex: % de aumento de preço, alíquota, taxa de juros). Sempre cross-check em Tier 1 ou Tier 2.

---

## Tier 6 — Agregadores Secundários (uso restrito)

| Fonte | Status | Uso permitido |
|---|---|---|
| **Jusbrasil** | Cuidado | Só como pointer pra achar nº de processo / acórdão; citar TJ-PR / STJ originais. Jurisprudência no Jusbrasil tem recortes e análises de terceiros — **não é fonte primária** |
| **Wikipedia** | Cuidado | Só pra contexto genérico. Seguir as notas de rodapé até a fonte original |
| **Reclame Aqui** | Evitar | Viés de reclamação, não métrica de mercado |
| **Larya / MySide / SpImóvel (blogs)** | Evitar como citação final | Podem ser **pointers** para fontes originais. Calculadoras operacionais OK (ex: calculadora ITBI MySide) mas o número citado no texto deve vir da LC municipal |
| **Blogs de imobiliárias** | Evitar | Exceto se cita fonte primária verificável |
| **IA generativa sem citação** | Banido | Nunca usar resposta de IA como fonte sem verificar na origem |

---

## APIs / dashboards acessíveis direto

| Fonte | Método | Exemplo de uso |
|---|---|---|
| **BCB SGS** | API REST JSON | `GET https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/30?formato=json` → últimos 30 valores da Selic diária |
| **IBGE SIDRA** | API REST JSON | `GET https://apisidra.ibge.gov.br/values/t/6579/n6/4106902/v/all/p/last?formato=json` → última pop estimada CWB |
| **IBGE Cidades** | WebFetch | `https://cidades.ibge.gov.br/brasil/pr/curitiba/panorama` |
| **BCB Dados Abertos** | CSV / JSON / OData | `https://dadosabertos.bcb.gov.br/dataset/11-taxa-de-juros---selic` |
| **Curitiba Open Data** | CSV direto | `https://dadosabertos.curitiba.pr.gov.br/` (32 datasets CSV) |
| **Portal ArcGIS CWB** | REST ArcGIS + GeoJSON | REST endpoints expostos pelo ArcGIS Hub; consumir via `browser_navigate` (Playwright) ou `fetch` direto |
| **IPPUC Geodownloads** | Shapefile zip | `https://ippuc.org.br/geodownloads/geo.htm` → baixar + processar com geopandas |
| **Fipe downloads** | PDF direto | `https://downloads.fipe.org.br/indices/fipezap/fipezap-{AAAAMM}-residencial-venda-publico.pdf` (padrão mensal) |
| **Abecip data-abecip mensal** | PDF direto | `https://www.abecip.org.br/admin/assets/uploads/anexos/data-abecip-{AAAA-MM}.pdf` |
| **SESP CAPE** | PDF / painéis | `https://www.seguranca.pr.gov.br/CAPE/Estatisticas` — scrape/WebFetch |
| **STJ SCON** | HTML | `https://scon.stj.jus.br/SCON/` busca estruturada por número/tema |
| **TJ-PR Jurisprudência** | HTML | `https://portal.tjpr.jus.br/jurisprudencia/` busca, sem API |

**Recomendação técnica:** usar WebFetch para documentos HTML/PDF simples. Para shapefile/GeoJSON, baixar via `fetch` e parsear. Para series massivas BCB/IBGE, preferir API REST direta (mais rápido, sem parsing HTML).

---

## Matriz de cross-check obrigatório

Toda afirmação numérica YMYL precisa de no mínimo 2 fontes, sendo pelo menos 1 Tier 1 ou Tier 2.

| Tipo de claim | Fontes mínimas | Exemplo |
|---|---|---|
| **Alíquota de tributo (ITBI, IPTU, ITCMD)** | 2 Tier 1 | LC municipal + Portal Prefeitura. Agregador (MySide) só como secundário |
| **Taxa de juros (Selic, TR, financiamento)** | 1 Tier 1 | BCB SGS ou site oficial do banco (Caixa) |
| **Volume de crédito imobiliário** | 1 Tier 2 + 1 Tier 3 | Abecip (PDF mensal) + Valor Econômico |
| **Preço médio m² por bairro CWB** | 2 Tier 2/4 | Fipe+ADEMI, ou Fipe+Sinduscon, ou Fipe+QuintoAndar |
| **Lançamentos / estoque CWB** | 1 Tier 2 | ADEMI-PR (pesquisa trimestral) |
| **Jurisprudência** | 1 Tier 1 | Acórdão TJ-PR ou STJ na íntegra (não resumo de Jusbrasil) |
| **MCMV — faixas e tetos** | 1 Tier 1 | gov.br/cidades OU portaria Caixa vigente |
| **Demografia / renda CWB** | 1 Tier 1 | IBGE SIDRA, com número de tabela |
| **Segurança — crimes por bairro** | 1 Tier 1 | SESP-PR CAPE. Imprensa local só como contexto |
| **Evento de mercado (IPO, M&A)** | 1 Tier 3 Top Tier + 1 Tier 1 se houver fato relevante CVM | Valor/Estadão + CVM |
| **Cronograma MCMV / reajustes** | 1 Tier 1 (portaria oficial) | Nunca citar apenas imprensa pra faixas |

### Regra do "número no título"
Se o H1/title contém um número (ex: "ITBI Curitiba 2026: 2,7% sobre valor"), a fonte primária desse número deve estar linkada **no primeiro parágrafo** com rel="noopener" para a LC municipal ou portaria oficial.

---

## Blacklist — fontes a NÃO usar

| Fonte | Por quê |
|---|---|
| **Blogs de imobiliárias concorrentes** (Razzi, JBA, Apolar blogs) | Conteúdo é SEO, não pesquisa. Pode ter erro |
| **Jusbrasil como fonte final** | É agregador de conteúdo do usuário. Sentenças e análises são geradas por usuários (advogados, estagiários). Sempre pular pro TJ-PR/STJ original |
| **Quora, Reddit, fóruns** | Sem curadoria |
| **ChatGPT / Claude / Gemini respostas** | Alucinação factual — cutoff, precedentes inventados, alíquotas erradas. Usar só pra explorar hipóteses |
| **Calculadoras de imobiliárias com número "fechado" sem explicar fórmula** | Ex: "Calcule seu IPTU" sem citar LC — número pode estar desatualizado |
| **Sites com .com brasileiros que simulam ser gov** | Domínios tipo "leis.com" ou "tudo-sobre-itbi.com" — não são oficiais |
| **Citação de valores em matérias antigas (>12 meses)** | Alíquotas, taxas, faixas MCMV mudam. Toda fonte >12m precisa revalidação |

---

## Fluxo de validação — exemplo concreto

**Cenário:** validar a afirmação "alíquota ITBI Curitiba 2026 é 2,7% sobre valor venal ou de transação, o que for maior".

1. **Tier 1 — primária direta:**
   - Buscar LC municipal no Planalto/LeisMunicipais: `https://leismunicipais.com.br/a/pr/c/curitiba/lei-complementar/2017/10/108/` (LC 108/2017)
   - Confirmar com Portal Prefeitura: `https://financas.curitiba.pr.gov.br/` → seção ITBI → verificar redação vigente
   - **Dois Tier 1 já satisfeitos. Pode escrever.**
2. **Tier 2 — confirmação autoritativa:**
   - Sescap-PR ou Sinduscon-PR confirmam aplicação prática da alíquota (sem alteração pós-2017)
3. **Tier 4 — ferramenta operacional (opcional):**
   - MySide calculator como link externo pro leitor simular, **com disclaimer "cálculo oficial na Prefeitura"**
4. **Blacklist acionada se:**
   - Fonte única for Jusbrasil, blog imobiliária, ou IA
5. **Pronto pra publicar** quando:
   - 2 Tier 1 linkados no texto (com anchor text descritivo)
   - Data da LC citada
   - Disclaimer "sujeito a alteração — conferir Portal da Prefeitura antes de transação"

---

## Protocolo operacional — checklist pré-publicação

- [ ] Toda afirmação numérica tem fonte Tier 1 ou Tier 2 linkada
- [ ] Nenhuma citação Tier 5/6 sozinha como fonte de número
- [ ] Jurisprudência linka acórdão no TJ-PR/STJ (não Jusbrasil)
- [ ] Dados >12 meses têm nota de data e disclaimer
- [ ] Todos os links Tier 1 usam HTTPS + domínio oficial (gov.br, jus.br, bcb.gov.br, ibge.gov.br)
- [ ] Números de MCMV checados contra portaria Caixa vigente
- [ ] Alíquota de tributo municipal checada contra LC vigente
- [ ] Taxa Selic consultada via BCB SGS no dia da publicação (ou máximo 7 dias antes)
- [ ] Preço médio m² CWB combina Fipe + ADEMI (nunca FipeZap sozinho)
- [ ] Seção "Fontes" ao final do artigo lista todos os Tier 1/2 consultados
