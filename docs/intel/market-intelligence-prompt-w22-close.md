# Prompt W22 — Fechar Análise de Mercado (subagent paralelo, sem Agent Teams)

> **Origem:** W21 deep-dive entregou top 3 oportunidades validadas
> (Andrade Ribeiro Bliss + Seventy, Veres Ara) MAS scraper-dev morreu em
> permission popup → 6 tasks (T9-T14) sem entregar = cross-validation
> de listings competitivos faltando.
>
> **W22 fecha a análise de UMA VEZ** com escopo mínimo:
> 1. Scraper roda **standalone fora do team** (zero risco popup)
> 2. Team usa **subagent paralelo (Task tool)** — não Agent Teams
> 3. Foco: fechar 7 gaps declarados §11 do report W21
> 4. Output: `market-deepdive-2026-W22-FINAL.md` consolidado
>
> **Por que subagent ao invés de Agent Teams:** Task tool é stateless,
> retorna ao caller, sem risco de zumbi. ~$2-4 vs ~$8-10. 30-45min vs 90-120.
> Permissions herdadas do parent (sem popup). Pra **fechar** análise,
> robustez > capabilities.

---

## ETAPA 1 — Pré-execução (terminal, ANTES de abrir Claude Code)

Rodar cada comando manualmente. Se algum quebrar, ajustar selectors via
`--debug` antes de prosseguir. Cache 24h TTL (não re-roda se já rodou hoje).

```bash
cd c:/Users/Vine/fymoob
mkdir -p tmp/intel/scrape

# === Listagem geral 5 paginas cada (~50 listings/site = 200 totais) ===
node scripts/intel/scrape-competitors.mjs --site razzi   --pages 5 --output tmp/intel/scrape/razzi-w22.json
node scripts/intel/scrape-competitors.mjs --site jba     --pages 5 --output tmp/intel/scrape/jba-w22.json
node scripts/intel/scrape-competitors.mjs --site apolar  --pages 5 --output tmp/intel/scrape/apolar-w22.json
node scripts/intel/scrape-competitors.mjs --site gonzaga --pages 5 --output tmp/intel/scrape/gonzaga-w22.json

# === Searches especificos pelos 5 empreendimentos top 5 do W21 ===
node scripts/intel/scrape-competitors.mjs --search "seventy upper mansion" --site all --pages 2 --output tmp/intel/scrape/search-seventy.json
node scripts/intel/scrape-competitors.mjs --search "bliss campus"          --site all --pages 2 --output tmp/intel/scrape/search-bliss.json
node scripts/intel/scrape-competitors.mjs --search "ara residencial"       --site all --pages 2 --output tmp/intel/scrape/search-ara.json
node scripts/intel/scrape-competitors.mjs --search "stenzo"                --site all --pages 2 --output tmp/intel/scrape/search-stenzo.json
node scripts/intel/scrape-competitors.mjs --search "meo neoville"          --site all --pages 2 --output tmp/intel/scrape/search-meo.json

# === Validacao: contar listings totais (deve ter ~250-400) ===
node -e "const fs=require('fs');const ls=fs.readdirSync('tmp/intel/scrape');let tot=0;ls.forEach(f=>{try{tot+=JSON.parse(fs.readFileSync('tmp/intel/scrape/'+f)).length}catch{}});console.log('Total listings cached:',tot)"
```

**Tempo estimado:** ~10 min wall-clock total (4 sites × ~1min + 5 searches × ~30s).
**Custo:** zero (sem LLM, só scraping).

Se algum site falhar (captcha, selectors quebrados), rodar com `--debug`
pra inspecionar HTML em `tmp/intel/scrape-debug/{site}/page-N.html` +
ajustar `SITES.<site>.selectors` em `scripts/intel/scrape-competitors.mjs`.

---

## ETAPA 2 — Sessão Claude Code (cole o prompt abaixo)

Sessão Claude Code limpa, CWD = `c:/Users/Vine/fymoob`. Cole tudo entre
as cercas como primeira mensagem.

```
Você é o LEAD da execução W22 que FECHA a análise de mercado iniciada
em W19 + aprofundada em W21. Use **subagent paralelo (Task tool) — NÃO
Agent Teams**. Razão: W21 perdeu scraper-dev por permission popup; pra
fechar, robustez > capabilities. Subagent é stateless, sem risco zumbi.

## CONTEXTO OBRIGATÓRIO (LEIA ANTES DE QUALQUER AÇÃO)

1. `CLAUDE.md` (regras absolutas)
2. `docs/intel/reports/market-deepdive-2026-W21.md` INTEGRAL — em particular
   §2 (Top 5 atual), §11 (7 gaps declarados que esta sessão FECHA)
3. `docs/intel/reports/market-2026-W19-validation.md` (validação humana W19)
4. `docs/intel/working/profiler-findings-2026-W21.md` (dossiê 3 construtoras)
5. `docs/intel/working/competitive-mapping-2026-W21.md` (parceiros + risk/reward)
6. `docs/intel/working/scorer-findings-2026-W21.md` (top 10 ranqueado)

Memórias persistentes carregam auto. Atenção especial:
- `feedback_teammate_zombie_kill.md` (W21 lesson — explicar por que escolhi subagent)
- `feedback_research_protocol.md` (FYMOOB Research Protocol v1.0)
- `feedback_no_suppositions.md`
- `feedback_api_safety.md`

## VALIDAR PRÉ-EXECUÇÃO (não pular)

Confirme via `ls tmp/intel/scrape/` que existem 9 JSONs:
- razzi-w22.json, jba-w22.json, apolar-w22.json, gonzaga-w22.json
- search-seventy.json, search-bliss.json, search-ara.json, search-stenzo.json, search-meo.json

Se algum faltar, ABORTE com mensagem "Pré-execução incompleta. Voltar pra
ETAPA 1 do prompt e rodar `node scripts/intel/scrape-competitors.mjs`".

## SCOPE — 7 GAPS A FECHAR (do §11 do report W21)

| Gap | O que falta | Como fechar |
|---|---|---|
| #1 ⭐ | Cross-validation listings 4 concorrentes | cross-validator subagent (cache JSON ja existe) |
| #2 | Instagram engagement real | gap-closer via Wayback @construtora.andraderibeiro / @veres.incorporadora / @rottasconstrutora |
| #3 | Endereço Veres/Rottas inconsistente | gap-closer via WebSearch + Google Maps Wayback |
| #4 | LinkedIn AR + Veres | gap-closer via search publico LinkedIn |
| #5 | Google Ads das 3 | gap-closer via WebFetch ads-transparency-center.google.com |
| #6 | Comissão típica real (Conecta Imobi/ENIC release) | gap-closer via WebSearch |
| #7 | Wayback Stenzo + New Place + Meo Neoville | gap-closer via Wayback Machine API |

## SPAWN — 2 SUBAGENTS EM PARALELO (Task tool, AMBOS Opus 4.7)

Use o tool Agent (não TeamCreate) com 2 invocações em UMA mensagem.
**Ambas com `model: "opus"` explícito** — decisão Vinicius pra ter
raciocínio máximo na sessão de fechamento. Custo estimado revisado:
~$10-20 (5× Sonnet, mas escopo narrow → bound).

### a) cross-validator (general-purpose, model: "opus", ~$4-7)

Spawn:
```
Agent({
  description: "cross-validator W22",
  subagent_type: "general-purpose",
  model: "opus",
  prompt: <abaixo>
})
```

Prompt resumido:
"Você é cross-validator W22 da Market Intelligence FYMOOB. Sua missão:
cruzar listings dos 4 concorrentes regionais (cache em tmp/intel/scrape/)
com top 5 empreendimentos do W21 pra calcular CONCORRÊNCIA EFETIVA REAL
por empreendimento.

Inputs:
- tmp/intel/scrape/razzi-w22.json + jba-w22.json + apolar-w22.json + gonzaga-w22.json (geral)
- tmp/intel/scrape/search-seventy.json + search-bliss.json + search-ara.json + search-stenzo.json + search-meo.json (específicos)
- docs/intel/reports/market-deepdive-2026-W21.md (top 5)
- docs/intel/working/competitive-mapping-2026-W21.md (parceiros W21 — comparar)

Tasks:
1. Pra cada empreendimento top 5 (Bliss, Seventy, Ara, Stenzo, Meo Neoville),
   procurar match nos JSONs por:
   - Brand-name match (title contains nome)
   - Bairro match (Prado Velho/Ecoville/Água Verde/Novo Mundo/CIC)
   - Construtora hint (se exposto no listing)
2. Listar URLs reais de cada match com confidence (high se brand match,
   medium se bairro+tier, low se proximidade).
3. Comparar com lista de imobiliárias parceiras detectadas pelo W21
   (competitive-mapping-2026-W21.md) — quem confirma vs quem só era thin SEO?
4. Calcular CONCORRÊNCIA EFETIVA REVISADA por empreendimento (substitui
   a estimativa do W21 com números reais).
5. Output: docs/intel/working/cross-validation-2026-W22.md com seções:
   - §1 Resumo executivo (3 frases)
   - §2 Top 5 empreendimentos × 4 sites scraped — matrix
   - §3 Concorrência efetiva REVISADA (vs W21 estimate)
   - §4 Imobiliárias confirmadas vs descartadas
   - §5 Insights cruzados não-óbvios
   - §6 Sources (URLs reais dos listings)

Schema JSON estrito por finding (igual §5 do brief). Refuse-to-answer se
match for ambíguo. Tier 4 cap 70/100 (são listings de imobiliárias —
secundário). Use o report W21 como anchor — não invente.

NUNCA Monitor. NUNCA edit do scraper. Só Read + Bash 'cat'/grep/wc + Write.

Reporte ao Lead em <300 palavras quando terminar."

### b) gap-closer (general-purpose, model: "opus", ~$6-13)

Spawn:
```
Agent({
  description: "gap-closer W22",
  subagent_type: "general-purpose",
  model: "opus",
  prompt: <abaixo>
})
```

Prompt resumido:
"Você é gap-closer W22 da Market Intelligence FYMOOB. Sua missão: fechar
os 6 gaps NÃO-scraper do report W21 §11 (gaps #2-#7).

Inputs:
- docs/intel/reports/market-deepdive-2026-W21.md §11 (lista os 7 gaps)
- docs/intel/working/profiler-findings-2026-W21.md (CNPJs + sócios)
- docs/intel/working/competitive-mapping-2026-W21.md (discovery W21)

Tasks (1 por gap):

**T-Gap2 — Instagram engagement:**
WebSearch + Wayback Machine pra @construtora.andraderibeiro,
@veres.incorporadora, @rottasconstrutora — extrair followers histórico
(snapshot 6m atrás vs hoje), inferir crescimento/declínio. Engagement
proxy: comments/likes médios em últimos 10 posts (via SERP de IG).
Confidence cap: hypothesis se só Wayback, likely se SERP confirma.

**T-Gap3 — Endereços inconsistentes Veres + Rottas:**
WebSearch site oficial Veres + Rottas pra endereço CURRENT.
Cross-check com BrasilAPI (já temos do W21). Se inconsistente, flag
'Bruno usa telefone, NÃO visita presencial sem confirmar' (já no W21,
reforçar no W22).

**T-Gap4 — LinkedIn AR + Veres:**
Google search 'site:linkedin.com Andrade Ribeiro construtora curitiba'
+ similar pra Veres. Identificar diretores/gerentes comerciais.
Output: nomes + cargos + URL LinkedIn pública. Cap hypothesis se zero
resultados.

**T-Gap5 — Google Ads das 3:**
WebFetch https://adstransparency.google.com/?region=BR + search 'Andrade
Ribeiro' / 'Veres' / 'Rottas'. Listar anúncios ativos com formato +
budget aproximado se exposto. Marca confidence: hypothesis se
transparency-center bloqueia.

**T-Gap6 — Comissão típica REAL:**
WebSearch pra release de programas de parceiros 2025-2026 das 3
construtoras (Conecta Imobi, ENIC Sinduscon, ADEMI release). Procurar
% comissão declarada publicamente. Se nenhuma das 3 declarou, buscar
benchmarks Curitiba alto padrão (FipeZap blog, Loft articles).
Output: faixa de comissão pra alto padrão CWB com 2+ sources Tier 1-3.

**T-Gap7 — Wayback Stenzo + New Place + Meo Neoville:**
http://web.archive.org/web/timemap/link/{url} pra cada empreendimento.
Calcular months_in_market real (substitui hypothesis do W21).
Atualizar velocity_score conforme §16 do brief.

Output: docs/intel/working/gap-closure-2026-W22.md com:
- §1 Resumo (1 frase por gap fechado vs hypothesis remanescente)
- §2-7 Findings por gap (schema JSON §5 do brief)
- §8 Updates ao top 5 baseado em findings (deltas vs W21)
- §9 Sources URLs

Schema JSON estrito. Tier 0 source (Receita, Wayback) pra qualquer
afirmação numérica. Refuse-to-answer pra gaps que continuarem
não-fecháveis (ex: comissão se ninguém declarou).

NUNCA Monitor. Reporte ao Lead em <400 palavras quando terminar."

## ETAPA 3 — SYNTHESIS (você sintetiza, sem 3º subagent)

Quando ambos subagents retornarem (mensagem única com 2 Task results):

1. Ler docs/intel/working/cross-validation-2026-W22.md
2. Ler docs/intel/working/gap-closure-2026-W22.md
3. Consolidar em docs/intel/reports/market-deepdive-2026-W22-FINAL.md:

   ```
   # Market Intelligence FINAL — W22 Closure (Curitiba)

   **Status:** ANÁLISE FECHADA
   **Inputs:** report W21 + cross-validation + gap-closure
   **Custo W22:** ~$2-4 (vs $8-10 W21 — escopo narrow)

   ## 1. Top 3 RE-VALIDADAS (confidence final)

   | # | Empreendimento | Construtora | Confidence W21 → W22 | Mudança |
   |---|---|---|---|---|
   | 1 | Bliss Campus | AR | 80% → ?% | (cross-val + gap closure aplicados) |
   | 2 | Ara Residencial | Veres | 75% → ?% | idem |
   | 3 | Seventy Upper Mansion | AR | 82% → ?% | idem |

   ## 2. Concorrência efetiva CONFIRMADA (vs W21 estimate)

   [tabela cross-validator]

   ## 3. Gaps fechados

   [§11 do W21 com checkmarks]

   ## 4. Decisão final por oportunidade

   - Bliss + Seventy: pacote única ligação (41) 3336-8686 — 7 dias
   - Ara: ligação separada (41) 99606-2244 — 14 dias
   - Rottas Meo Neoville: cadastro low-effort parceirosrottas.com — 30 dias

   ## 5. 1 Landing SEO suggestion final (decisão Bliss vs Seventy)

   [seu pick baseado em cross-val real]

   ## 6. Comissão típica confirmada
   [valor real ou flag hypothesis se ninguém declarou]

   ## 7. Próxima execução (W23+)

   Recomendação: pausar até Bruno reportar feedback de pelo menos 1 das
   ligações. Validar metodologia na prática antes de continuar.
   ```

4. Validar success criteria:
   - ✅ Concorrência efetiva real por empreendimento (não estimate)
   - ✅ ≥3 dos 7 gaps fechados com Tier 0-1 source
   - ✅ Confidence ajustada nos top 3 (com explicação do delta)
   - ✅ 1 landing SEO escolhida (Bliss OU Seventy, não ambos)
   - ✅ Comissão típica documentada (valor real ou hypothesis declarado)
   - ✅ Custo total ≤ $4

5. Apresentar pro Vinicius em <500 palavras:
   - Path do report final
   - Top 3 com confidence ajustada
   - Gaps fechados vs remanescentes
   - 1 landing SEO escolhida
   - Custo + tempo real
   - 1 recomendação acionável imediata pra Bruno

## ANTI-PADRÕES (NÃO FAÇA)

❌ TeamCreate — usar Task tool padrão
❌ Re-rodar scraper (cache 24h TTL, já tem)
❌ Re-investigar coisas já validadas no W19/W21
❌ Inventar números — refuse-to-answer pra gaps não-fecháveis
❌ Tier 4 source com confidence > 70 (cap)
❌ Esperar mais que 5 min por subagent que não responde — abortar e
   relatar pro Vinicius (subagent não pode ficar zumbi como Agent Team,
   se travar é diferente)

## SUCCESS CRITERIA

✅ Custo ≤ $25 (Opus em ambos subagents — escopo narrow bound em ~$10-20 esperado)
✅ Tempo ≤ 45 min
✅ Report W22-FINAL.md gerado e salvo
✅ Confidence dos top 3 atualizada com cross-val + gap-closure
✅ Recomendação 1 ligação imediata pra Bruno (Bliss anchor)
✅ Tier 0/1 source pra cada finding numérico (Opus tem que justificar uso vs Sonnet)

EXECUTAR. Confirme apenas no fim com report curto.
```

---

## Notas pra você (Vinicius)

**Por que esse W22 vai funcionar:**
1. **Scraper roda fora do team** → zero risco de permission popup
2. **Subagent paralelo (Task tool)** → zero risco zumbi (Task é stateless)
3. **Escopo narrow** → 2 subagents focados, não 5
4. **Cache 24h** → re-rodáveis sem custo
5. **Lead sintetiza** (eu) → sem 3º subagent

**Pré-checklist:**
- [ ] Sessão Claude Code limpa
- [ ] CWD `c:/Users/Vine/fymoob`
- [ ] Pré-execução ETAPA 1 rodada (9 JSONs em `tmp/intel/scrape/`)
- [ ] Validação: `ls tmp/intel/scrape/ | wc -l` retorna 9

**Custo + tempo esperado (com Opus em ambos subagents):**
- **$10-20/run total** (5× Sonnet — decisão Vinicius pra raciocínio máximo)
- 25-45 min wall-clock (vs 85 min W21)
- Pre-execução scraping: ~10 min adicional manual

**Nota sobre Opus 4.7 vs Sonnet 4.6:**
Opus brilha em raciocínio sutil/multi-fonte (gap-closer com refuse-to-answer
faz sentido). Cross-validator é mais mecânico (regex match em JSONs) e
poderia rodar Sonnet sem perda real. Decisão Vinicius: ambos Opus pra
fechar com qualidade máxima — trade-off de ~5× custo aceito.

Pra W23+ recomendo: cross-validator → Sonnet (mecânico), gap-closer →
Opus (raciocínio crítico). Mix corta custo ~50% mantendo qualidade.

**Output esperado:**
- `docs/intel/reports/market-deepdive-2026-W22-FINAL.md` (~300-500 linhas)
- 2 working files: cross-validation + gap-closure
- Cache scraper preservado em `tmp/intel/scrape/` pra W23+ reuse

**Se W22 quebrar:**
- Subagent não responde em 5min → abortar e relatar
- WebFetch bloqueado em algum domain → marca hypothesis, segue
- Pré-execução scraper com captcha persistente → adicionar `--debug` +
  ajustar selectors no script

**Após W22 entregar:**
- Bruno liga Andrade Ribeiro (Bliss anchor) **HOJE**
- Pausar W23+ até feedback real da ligação
- Sprint dev separado: implementar a landing SEO escolhida (Bliss OU Seventy)
