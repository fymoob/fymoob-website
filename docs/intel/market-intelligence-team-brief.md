# Market Intelligence Team — Charter

> **STATUS:** Brief vivo. Lead lê este arquivo antes de criar team.
> Teammates leem via Read tool quando spawnados (CLAUDE.md auto-carrega o resto).
>
> **Origem:** Fase 14 Linha B do projeto FYMOOB. Detalhe inicial em
> [`docs/tasks/fase-14-inteligencia.md`](../tasks/fase-14-inteligencia.md).
> Pesquisa de fundamentação: 04/05/2026 (Anthropic docs + comunidade dev +
> mapeamento de fontes oficiais Curitiba).

---

## 1. Mission

Mapear continuamente o **mercado imobiliário de Curitiba** — competidores,
construtoras ativas, lançamentos via alvarás, oportunidades de captação —
e produzir um **relatório semanal** com **fontes Tier-0 verificadas** + ações
priorizadas pra Bruno (proprietário FYMOOB Imobiliária).

**Output:** `docs/intel/reports/market-YYYY-WW.md` (markdown commitado, ~600-1200 linhas).

**Stakeholder:** Bruno (FYMOOB owner). Sucesso = ele lê o report e identifica
3-5 ações concretas de alto ROI nessa semana.

---

## 2. Contexto FYMOOB (1 minuto pra cada teammate)

- **FYMOOB Imobiliária** — Curitiba/PR, CRECI J 9420
- 248 imóveis ativos no CRM Loft/Vista (escala pequena vs concorrentes médios 500-2000)
- Site novo `fymoob.com.br` (Next.js 15, indexado em GSC desde 04/2026)
- **Diferencial buscado:** ser referência de qualidade editorial + dados verificados
- **Concorrentes diretos confirmados:** Razzi, JBA, Apolar, Gonzaga (regionais Curitiba); marketplaces nacionais (VivaReal, ZAP, OLX) inalcançáveis curto prazo

**Arquivos do projeto que TODOS teammates devem ler ao começar:**
1. [`CLAUDE.md`](../../CLAUDE.md) — regras absolutas projeto (auto-carregado)
2. [`docs/project-context.md`](../project-context.md) — dados do cliente
3. [`docs/seo/article-writing-rules.md`](../seo/article-writing-rules.md) — hierarquia de fontes 5 tiers + princípios editoriais
4. **Este arquivo (brief)** — papéis e workflow do team

**Memórias persistentes a respeitar** (carregadas automaticamente):
- `feedback_research_protocol.md` — FYMOOB Research Protocol v1.0 (8 fases, hierarquia 6 tiers)
- `feedback_no_suppositions.md` — toda task é complexa, validar dados reais antes de afirmar
- `feedback_api_safety.md` — API Loft é READ-ONLY + lead POST. Nunca DELETE/PUT destrutivo
- `project_competitors.md` — intel acumulado dos concorrentes
- `feedback_seo_artigos_revisao.md` — vocabulário, hardening jurídico, tom profissional

---

## 3. Time

| Role | Agent type sugerido | Responsabilidade primária |
|---|---|---|
| **Lead** | (sessão atual) | Orquestra. Lê brief, cria team, decompõe tasks, sintetiza relatório final. |
| **scraper** | general-purpose | Extrai listings + preços dos sites concorrentes regionais (Razzi, JBA, Apolar, Gonzaga). |
| **alvaras-monitor** | general-purpose | Baixa Base de Alvarás Curitiba (CSV mensal CC-BY 4.0), filtra por bairro/CNAE, identifica construtoras ativas. |
| **construtoras-analyst** | general-purpose | Cruza alvarás × CNPJ Receita Federal × portal ADEMI. Mapeia construtoras por porte, histórico, parcerias. |
| **opportunity-scorer** | general-purpose | **Desafia** os 3 outros (competing hypotheses pattern Anthropic). Pontua oportunidades em 100-point scale. |

**Anti-padrão crítico:** scorer não pode ser concordista. Anthropic
([docs](https://code.claude.com/docs/en/agent-teams.md#investigate-with-competing-hypotheses))
recomenda explicitamente: scorer **ataca cada finding** dos outros 3 — "como sabe?
qual fonte? o que disprovaria? esse teammate tem viés de fonte?". Só após
3 questionamentos é que rankeia.

---

## 4. Fontes obrigatórias por Tier

> **Toda claim numérica/factual no relatório final TEM que citar fonte
> Tier 0-2 com URL + `fetched_at` ISO-8601.** Tier 3-4 = só contexto/cor,
> nunca anchor de números.

### Tier 0 — Oficiais governo (use SEMPRE como fonte primária)

| Fonte | URL | Formato | Use pra |
|---|---|---|---|
| **Prefeitura — Base de Alvarás** ⭐ | https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe/?chave=be211e1f-cff5-44cb-9aaa-1be6b9ec3811 — arquivo direto: `https://mid.curitiba.pr.gov.br/dadosabertos/BaseAlvaras/{YYYY-MM-01}_Alvaras-Base_de_Dados.CSV` | CSV ~548MB, CC-BY 4.0 | **Joia rara** — alvarás emitidos: razão social, CNAE, endereço, bairro, CEP, datas. Filtrar CNAE 41xx (construção) + 68xx (imobiliária) |
| **Receita Federal — CNPJ Bulk** | https://arquivos.receitafederal.gov.br/dados/cnpj/ | CSV mensal | Histórico empresarial: data abertura, capital social, sócios. Filtrar UF=PR + CNAE 41xx/68xx |
| **IPPUC — GeoDownloads** | https://ippuc.org.br/geodownloads/geo.htm | Shapefile / DWG | Bairros, zoneamento, equipamentos urbanos |
| **GeoCuritiba REST** | https://geocuritiba.ippuc.org.br/server/rest/services/GeoCuritiba/Publico_GeoCuritiba_MapaCadastral/MapServer | ArcGIS REST JSON | Geocoding interno, validação zoneamento |
| **IBGE SIDRA API** | https://servicodados.ibge.gov.br/api/docs/agregados | JSON | Censo 2022 por bairro/setor censitário (renda, domicílios) |
| **IPARDES — Caderno Estatístico** | http://www.ipardes.gov.br/cadernos/MontaCadPdf1.php?Municipio=80000 | PDF/CSV/XLSX anual | Indicadores macro Curitiba |
| **SESP-PR — CAPE** | https://www.seguranca.pr.gov.br/CAPE/Estatisticas | Qlik BI + PDF anual | ⚠️ Granularidade max = AISP, não bairro. Usar mídia compiladora pra bairro |

### Tier 1 — Reguladores setor (citáveis)

| Fonte | URL | Use pra |
|---|---|---|
| **Sinduscon-PR — CUB** | https://sindusconpr.com.br/cub-pr | Custo médio m² PR mensal (URL determinística) |
| **CRECI-PR — Pesquisa Credenciados** | https://www.crecipr.gov.br/pesquisa-credenciados | ⚠️ Só consulta unitária, sem bulk |
| **ADEMI-PR — Releases públicos** | https://ademipr.com.br/ | Headline numbers trimestrais (VSO, estoque, m²). Pesquisa completa = paywall |
| **Fipe — FipeZap** | https://www.fipe.org.br/pt-br/indices/fipezap/ | Índice mensal Curitiba (PDF determinístico). Calculado sobre anúncios ZAP |

### Tier 2 — Portais agregadores (cor + contexto)

| Fonte | Status scraping | Use pra |
|---|---|---|
| **VivaReal/ZAP** | ❌ robots.txt bloqueia ClaudeBot/GPTBot/CCBot | Skip — usar FipeZap como proxy |
| **OLX** | ❌ 403/anti-bot ativo | Skip |
| **Imovelweb** | ⚠️ paginação >5 bloqueada | Limitado |
| **Chaves na Mão** | ⚠️ bloqueia 40+ bots nominais | Limitado |

### Tier 3 — Mídia editorial (citável pra contexto)

| Fonte | URL |
|---|---|
| Gazeta do Povo — Mercado Imobiliário | https://www.gazetadopovo.com.br/haus/mercado-imobiliario/ |
| Gazeta do Povo — Paraná S/A | https://www.gazetadopovo.com.br/vozes/parana-sa/ |
| Tribuna do Paraná | https://www.tribunapr.com.br/noticias/curitiba-regiao/ |
| Bem Paraná | https://www.bemparana.com.br/ |
| CBN Curitiba | https://cbncuritiba.com.br/ |

### Tier 4 — Concorrentes regionais (scrapeable, com cuidado)

| Concorrente | URL | robots.txt |
|---|---|---|
| **Razzi Imóveis** | https://razziimoveis.com.br · sitemap: `/sitemap_index.xml` | `Disallow:` vazio ✅ |
| **Apolar** ⭐ (gigante PR) | https://www.apolar.com.br · sitemap: `/sitemap-index.xml` | `Disallow:` vazio ✅ — ~20k imóveis |
| **JBA Imóveis** | https://jbaimoveis.com.br · sitemap: `/sitemap_index.xml` | `Disallow:` vazio ✅ — ~3.800 imóveis |
| **Gonzaga Imóveis** | https://www.gonzagaimoveis.com.br · sitemap: `https://api.gonzagaimoveis.com.br/sitemap/index.xml` | ~8k imóveis |

**Throttling cortês:** 1 req/2s. User-Agent identificado (`FYMOOB-MarketIntel/1.0`).
Respeitar `Termos de Uso` mesmo onde robots.txt permite.

---

## 5. Output schema (JSON estruturado obrigatório por finding)

Cada finding produzido por qualquer teammate tem este shape, **sem exceção**:

```json
{
  "id": "string-unique",
  "produced_by": "scraper|alvaras-monitor|construtoras-analyst|opportunity-scorer",
  "claim": "Construtora Avantti emitiu 3 alvarás em Mossunguê em 2026",
  "value": 3,
  "value_unit": "alvarás",
  "sources": [
    {
      "url": "https://mid.curitiba.pr.gov.br/dadosabertos/BaseAlvaras/2026-04-01_Alvaras-Base_de_Dados.CSV",
      "fetched_at": "2026-05-04T20:30:00Z",
      "tier": 0,
      "evidence": "Linhas 12345-12347 do CSV: Avantti Construtora & Incorporadora, CNAE 4110-7, bairro MOSSUNGUÊ"
    }
  ],
  "confidence": "confirmed|likely|hypothesis",
  "confidence_pct": 95,
  "implication": "Construtora ativa em bairro de interesse FYMOOB — potencial parceria",
  "next_action": "Cross-checar CNPJ + verificar exclusividade com outra imobiliária"
}
```

**Regras absolutas:**
- `confidence_pct < 70` → obrigatório `confidence: "hypothesis"` + flag explícito no relatório
- Se `tier > 2` → `confidence_pct` automaticamente cap em 70%
- Sem fonte Tier-0/1 → **refuse to answer** ("Dado indisponível em fontes confirmáveis")
- `evidence` deve ser **trecho citado literalmente** (não paráfrase)

---

## 6. Workflow entre teammates

### Fase A — Setup (Lead, ~10 min)

1. Lead lê este brief
2. Lead cria team via `TeamCreate` com `team_name: "market-intel-YYYY-WW"`
3. Lead cria task list inicial (~24 tasks, ver §8)
4. Lead spawn 4 teammates simultâneos via `Agent` tool com `team_name` + `name`
5. Cada teammate recebe prompt com link pra este brief + sua role específica

### Fase B — Coleta paralela (3 teammates trabalham em paralelo, ~30-45 min)

| Teammate | Pode mensagear quem | Quando |
|---|---|---|
| **scraper** | scorer (envia findings) | Após cada concorrente analisado |
| **alvaras-monitor** | construtoras-analyst (passa CNPJs ativos) | Após filtrar CSV |
| **construtoras-analyst** | scorer (envia perfil construtora) | Após cada CNPJ pesquisado |

Findings escritos em `docs/intel/working/{role}-findings-{week}.md` durante coleta.

### Fase C — Challenge & Score (scorer entra em ação, ~15-20 min)

1. Scorer lê `docs/intel/working/*.md` de cada um dos 3
2. Scorer **ataca cada finding** com 3 perguntas:
   - "How do you know? Which source tier?"
   - "What evidence would disprove this?"
   - "Could the source be biased? (e.g., construtora press release)"
3. Findings que sobreviverem viram score 100-point
4. Scorer manda message pra Lead com top 10 oportunidades

### Fase D — Synthesis & Cleanup (Lead, ~10 min)

1. Lead consolida `docs/intel/reports/market-YYYY-WW.md`
2. Lead manda `shutdown_request` pra cada teammate
3. Após todos `approve: true` → `TeamDelete` cleanup

**Token budget hard cap: $5/run, 90 min wall-clock.** Lead aborta se exceder.

---

## 7. Anti-hallucination patterns (NÃO-NEGOCIÁVEIS)

1. **Refuse-to-answer** quando dado falta em Tier 0-1
2. **Confidence levels explícitos** — `confirmed | likely | hypothesis`
3. **Self-RAG verification** — scorer questiona cada finding
4. **No Tier-only inference** — `value` sem `sources[]` = INVÁLIDO, sai do report
5. **Citation freshness** — `fetched_at` < 30 dias pra dados de mercado
6. **Avantti note:** existe **construtora Avantti** em Curitiba (do Reserva Barigui). NÃO confundir com `avantti.com.br` que pode ser software de salão de beleza. Validar CNPJ via Receita Federal antes de tratar como construtora.
7. **VivaReal/ZAP/OLX:** robots.txt bloqueia bots IA. **Não tentar scrape**. Usar FipeZap como proxy de preços.
8. **Tier 3 confidence cap = 70/100** (validado W19): mídia editorial (Gazeta do Povo, Tribuna, Bem Paraná) é citável pra **contexto/sinal**, mas finding com source primária Tier 3 NÃO pode passar de 70/100. Pra superar 70, precisa cross-check com Tier 0-1 (CNPJ Receita, gov.br, etc).
9. **CNPJ validation obrigatório**: toda construtora citada como oportunidade tem CNPJ confirmado via consulta unitária Receita (BrasilAPI/OpenCNPJ ou consulta manual antes de Bruno agir).
10. **Telefone validation**: número de contato em `next_action` é validado contra site oficial OU Google Maps OU release recente (≤90 dias). Telefone em release antigo não vale como current.

---

## 8. Task list inicial (24 tasks decompostas)

> Lead cria via `TaskCreate`. Ordem importa (lower ID = setup; later IDs
> dependem de earlier).

### scraper (6 tasks)
- T1: Razzi — extrair top 100 listings (preço, bairro, tipo, área, quartos)
- T2: JBA — idem top 100
- T3: Apolar — idem top 200 (maior catálogo, justifica amostra maior)
- T4: Gonzaga — idem top 100
- T5: Compute heatmap preço m² por bairro com ≥10 listings cada (cross-concorrente)
- T6: Identificar 5 imóveis "premium" comuns aos 4 (mesma rua/empreendimento) — sinaliza disputa

### alvaras-monitor (5 tasks)
- T7: Baixar Base de Alvarás mês corrente + 2 anteriores (3 CSVs)
- T8: Filtrar CNAE 4110-7 (construção edifícios) + 6810 (compra/venda imóveis) em UF=PR
- T9: Top 20 construtoras por # alvarás últimos 3 meses
- T10: Mapear alvarás por bairro Curitiba (top 10 bairros)
- T11: Flagar construtoras "novas" (1º alvará nos últimos 6m)

### construtoras-analyst (6 tasks)
- T12: Receita Federal — pull CNPJs ativos UF=PR CNAE 4110-7
- T13: Cross-check com top 20 do alvarás-monitor (T9)
- T14: Pra top 10 cruzados, pesquisar histórico ADEMI + Sinduscon (releases)
- T15: Pra cada top 10, identificar imobiliária parceira atual (via site da construtora + Google)
- T16: Identificar 3-5 construtoras **sem imobiliária exclusiva** = lead quente
- T17: Validar capital social + idade da empresa (filtra "construtora caseira" sem porte)

### opportunity-scorer (7 tasks)
- T18: Ler todos findings dos 3 teammates (de `docs/intel/working/*`)
- T19: Para cada finding, aplicar 3 questionamentos (§6 Fase C)
- T20: Drop findings com confidence_pct < 70 sem reforço
- T21: Cruzar T16 (construtoras sem parceira) × T6 (bairros disputados) × T9 (top alvarás) → score 100-point
- T22: Identificar 3-5 oportunidades top
- T23: Para cada uma: estimar ROI (alvarás x preço médio x % comissão típica 5-6%)
- T24: Recomendação concreta pra Bruno (1 linha: "Contatar construtora X em Y dias via Z")

---

## 9. Output final esperado

Path: `docs/intel/reports/market-YYYY-WW.md`

Estrutura:

```markdown
# Market Intelligence — Semana YYYY-WW

**Data:** {ISO}
**Período coberto:** {start} → {end}
**Tasks executadas:** 24/24
**Tokens consumidos:** ~{X}k
**Custo:** ~${Y}

## Sumário executivo (3 frases)

[O que mais importa pra Bruno essa semana]

## Top 5 oportunidades acionáveis

| # | Construtora | Bairro foco | Alvarás 6m | Imobiliária parceira atual | Score | Próxima ação |
|---|---|---|---|---|---|---|
| 1 | ... | ... | N | nenhuma exclusiva ⭐ | 87/100 | Contatar via [canal] em 7 dias |
...

## Mapa de mercado

### Preço m² por bairro (top 15)
[Tabela cross-concorrente]

### Bairros mais disputados (>3 concorrentes presentes)
[Lista]

### Construtoras emergentes (1º alvará últimos 6m)
[Lista com CNPJ + capital social]

## Concorrentes — snapshot

| Imobiliária | Estoque | Bairro forte | Preço médio m² |
|---|---|---|---|
| Apolar | ~20k | ... | ... |
| Gonzaga | ~8k | ... | ... |
...

## Findings que NÃO entraram (transparência)

[Findings dropados pelo scorer + razão — IFCN P5]

## Fontes consultadas

[Lista numerada com URL + fetched_at + tier]

## Anexos
- `docs/intel/working/scraper-findings-{week}.md`
- `docs/intel/working/alvaras-findings-{week}.md`
- `docs/intel/working/construtoras-findings-{week}.md`
```

---

## 10. Success criteria (Lead valida antes de TeamDelete)

- ✅ ≥3 oportunidades top com `confidence: confirmed` (Tier-0/1 sources)
- ✅ Cada oportunidade tem `next_action` específica (não genérica)
- ✅ Custo ≤ $5/run, tempo ≤ 90 min
- ✅ Sumário executivo cabe em 3 frases (forçar concisão)
- ✅ Findings dropados estão listados (transparência)
- ✅ Nenhuma claim sem source URL + fetched_at
- ✅ Avantti **validada** como construtora real (CNPJ checked) antes de aparecer no report

Se algum critério falhar, Lead **não consolida** — pede teammate específico revisar antes.

---

## 11. Anti-padrões (Anthropic Troubleshooting + lições W19)

| ❌ Erro | ✅ Como evitar |
|---|---|
| Teammates duplicam trabalho | Tasks bem-decompostas (§8), sem overlap |
| Scorer concorda com tudo | Prompt do scorer EXPLÍCITO: "challenge each finding, ask 3 questions" |
| Lead não sintetiza, só relista | Output schema obriga `implication` + `next_action` por finding |
| Hallucination de empresas | Rule: CNPJ Receita validation antes de tratar como construtora real |
| Scrape de VivaReal/ZAP/OLX | Skip — robots.txt bloqueia bots IA. FipeZap é proxy oficial |
| Tasks muito grandes (1 teammate trava 30min sem feedback) | Cada task self-contained, ≤6 tasks/teammate, granularity §8 |
| Tasks muito pequenas (overhead > resultado) | Não criar task pra "fetch 1 URL". Cada task entrega ≥1 finding |
| **Monitor permission popup trava teammate (W19)** | **NUNCA usar `Monitor` em Agent Teams in-process Windows.** Permission popup não renderiza no IDE → teammate fica zumbi processando inbox. Sempre `Bash run_in_background` pra polling/watch. |
| **JS-rendered pagination concorrentes (W19)** | Site dos 4 concorrentes regionais (Razzi/JBA/Apolar/Gonzaga) usa SPA com pagination via JS. `curl` + parse HTML pega só a primeira página (12-14 listings, não-representativo). **Skip scraping HTML completo**. Usar FipeZap como proxy de preço-por-bairro. Scraper full requer Playwright integration (sprint separado). |
| **Lag editorial alvarás Curitiba (W19)** | Base de Alvarás é publicada com **delay de 3-6 meses**. Em 04/05/2026, último mês disponível = ~Q4/2024. NÃO afirmar "construtora ativa AGORA" baseado nos CSVs. Wording correto: "construtora com alvarás emitidos até [última data publicada]". |
| **TeamDelete trava com teammate zumbi (W19)** | Antes de TeamDelete, mandar `shutdown_request` pra cada teammate. Se algum não responde em 60s: edit manual `~/.claude/teams/{nome}/config.json` removendo o member zumbi do array → retry TeamDelete. Documentar zombi rate (esperado: <10% dos runs). |
| **ROI estimado sem base explícita** | `next_action` com valor monetário (ex: "ROI 12m R$ 137k") DEVE incluir `evidence` com cálculo (ticket médio × volume × % comissão típica). Sem cálculo explícito, omitir valor. |

---

## 12. Limitações conhecidas

- **SESP-PR por bairro**: não publica padronizado. Aceitar dado em granularidade AISP (Área Integrada de Segurança Pública) ou usar mídia compiladora (Bem Paraná, Tribuna).
- **ADEMI-PR pesquisa completa**: paywall associados. Apenas headlines de releases públicos.
- **CRECI-PR sem bulk**: validação de imobiliária parceira é manual via consulta unitária.
- **Quinto Andar / Loft IPR**: SP-only, **sem cobertura Curitiba**. Não buscar índice deles pra CWB.
- **Bug Agent Teams #34614**: spawn pode falhar em 2.1.91 — se primeiro test falhar, abortar e reportar pra Vinicius (cair pra subagent paralelo via Task tool).

---

## 13. Como rodar (referência rápida)

Em sessão Claude Code limpa (sem state poluído):

```
1. Confirmar Agent Teams ativo (`~/.claude/settings.json` tem
   CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 + teammateMode in-process)
2. Colar o prompt em `docs/intel/market-intelligence-prompt.md`
3. Lead executa Fases A→D
4. Quando Lead reportar `TeamDelete` ok, abrir o report em
   `docs/intel/reports/market-YYYY-WW.md`
5. Bruno revisa as top 5 ações
```

---

## 14. Próxima evolução (Sprint 2+)

- **Cron weekly** via GitHub Actions (rodar segunda 06:00 UTC)
- **Alertas em tempo real**: WhatsApp Bruno quando construtora-nova-sem-parceira é detectada
- **Dashboard `/admin/intel`** com últimas 4 semanas
- **Storage Supabase** dos findings (Fase 15.A já planejada) → análise temporal

Antes disso: rodar 4-6 vezes manualmente, refinar prompts conforme drift,
medir custo real, ajustar tier rules conforme o tipo de finding mais comum.
