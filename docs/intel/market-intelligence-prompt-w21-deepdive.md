# Prompt W21 — Deep-Dive Top 3 + Concorrentes (Plano A completo)

> **Origem:** validação humana W19 confirmou Andrade Ribeiro / Veres / Rottas
> como leads acionáveis. W21 aprofunda: catálogo completo, parceiros atuais,
> imóveis estratégicos pra FYMOOB, fit-score, landing SEO, risk/reward.
>
> **Como usar:** Sessão Claude Code limpa, CWD = `c:/Users/Vine/fymoob`,
> Agent Teams ativo. Cole o bloco abaixo como primeira mensagem.
>
> **Custo target:** $8-12/run · **Tempo:** 90-120 min · **Output:** dossiê
> completo + scraper Playwright validado + landing SEO suggestions.

---

## Prompt (copiar tudo entre as cercas)

```
Você é o LEAD do team Market Intelligence W21 (FYMOOB Curitiba) — escopo
DEEP-DIVE. W19 entregou 3 leads validados (Andrade Ribeiro 85, Veres 70,
Rottas 65). Sua missão agora: aprofundar cada um + descobrir imóveis
estratégicos + mapear concorrência + entregar landing SEO suggestions.

## CONTEXTO OBRIGATÓRIO (LEIA ANTES DE QUALQUER AÇÃO)

1. `CLAUDE.md` (regras absolutas)
2. `docs/intel/market-intelligence-team-brief.md` INTEGRAL — atenção §7
   (anti-hallucination 8-10), §11 (anti-padrões W19), §15-19 (frameworks
   NOVOS pra W21: fit-score, velocity, discovery channel, landing SEO,
   risk/reward)
3. `docs/intel/reports/market-2026-W19.md` (output team W19)
4. `docs/intel/reports/market-2026-W19-validation.md` (validação humana
   confirmando top 3 — base do deep-dive)
5. `docs/intel/working/construtoras-findings-2026-W19.md` (10 findings W19)

Memórias persistentes carregam auto. Atenção especial:
- `feedback_research_protocol.md` (FYMOOB Research Protocol v1.0)
- `feedback_no_suppositions.md` (validar antes de afirmar)
- `feedback_api_safety.md` (Loft API READ-ONLY)
- `project_competitors.md` (intel concorrentes regionais)

## 5 TEAMMATES (vs 4 W19 — escopo deep-dive)

✅ **Validar Agent Teams ativo** primeiro (`~/.claude/settings.json` tem
`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` + `teammateMode: "in-process"`).
Se não, ABORTE.

✅ **TeamCreate**: `team_name: "market-intel-2026-W21-deepdive"`,
description: "Deep-dive Andrade Ribeiro + Veres + Rottas — catálogo,
parceiros, imóveis estratégicos FYMOOB, landing SEO, risk/reward.
Inclui Playwright integration pra scraping competitivo."

## ETAPA — TASKS (30 ao total, distribuídas em 5 teammates)

### deep-profiler (8 tasks)
Foco: dossiê completo de cada construtora.

- T1: Andrade Ribeiro — site oficial completo (URL via Google "andrade
  ribeiro construtora curitiba"). Catálogo: TODOS empreendimentos em
  comercialização (não só os 4 da release Gazeta). Status (lançamento /
  obras / pronto), fase de venda, valores se públicos.
- T2: Veres — mesmo formato. Site veres.com.br. Catálogo completo.
- T3: Rottas — site rottasconstrutora.com.br + portal parceirosrottas.com.
  Catálogo. Categorias de parceiros se acessível public.
- T4: Pra cada construtora (3), Wayback Machine — primeira menção pública
  de cada empreendimento (proxy de velocity §16 do brief).
- T5: Pra cada (3), Instagram — last 6 meses de posts mencionando produtos
  específicos. Engajamento médio (likes/comments).
- T6: Pra cada (3), validar contatos (telefone, email, endereço) contra
  CNPJ Receita + Google Maps. Flag se inconsistente.
- T7: LinkedIn — quem trabalha em cada construtora? Identificar diretor
  comercial / gerente de vendas (alvo principal pra Bruno contatar).
- T8: Output em `docs/intel/working/profiler-findings-2026-W21.md`.
  Schema JSON §5 brief, MAS structured por construtora (não flat list).

### scraper-dev (6 tasks)
Foco: validar e operar Playwright scraper, depois mapear concorrentes.

- T9: Smoke test `node scripts/intel/scrape-competitors.mjs --site razzi
  --pages 1 --debug --output tmp/intel/scrape/razzi-smoke.json`. Verificar:
  zero captcha, page renderiza, HTML+screenshot em tmp/intel/scrape-debug/.
  Inspecionar HTML dump pra ajustar selectors no script (pode editar
  `SITES.razzi.selectors` se necessário). Re-run sem --debug pra confirmar.
- T10: Repetir smoke test pros outros 3 (jba, apolar, gonzaga).
  Selectors podem precisar ajustar — usar `--debug` pra inspecionar DOM.
- T11: Após selectors validados, scrape Razzi 5 páginas (~100 listings).
- T12: JBA + Apolar + Gonzaga, 5 páginas cada (`--site all --pages 5`).
- T13: Análise: dos listings scraped, quantos são empreendimentos das 3
  construtoras (Andrade Ribeiro, Veres, Rottas)? Match por nome
  empreendimento ou bairro+tipo. Output em
  `docs/intel/working/competitive-listings-2026-W21.json`.
- T14: SEO presence — pra cada empreendimento das 3, Google search
  `"<nome empreendimento>"` (sem aspas duplas se brand-name comum).
  Listar top 10 domínios. Identificar quais listings vêm de imobiliárias
  vs sites próprios construtora.

### competitive-mapper (6 tasks)
Foco: quem mais já vende pra cada construtora + análise SEO/canais.

- T15: Pra cada construtora (3), Google `"<construtora>" imobiliaria`
  + `"<construtora>" parceira` + LinkedIn search. Top 10 imobiliárias
  parceiras detectadas.
- T16: Pra cada empreendimento estratégico identificado por T1-T3
  (top 3-5 por construtora), localizar listings em portais nacionais
  (VivaReal/ZAP — não scrape, só ver SERP) e compiladores (Loft, MySide).
  Concorrência total na parceria.
- T17: Discovery channel (§17 brief) — pra cada construtora:
  · Google Ads ativos? (search exact match brand)
  · SEO position pra brand name
  · Social Instagram engagement
  · Imobiliárias parceiras (T15)
  Matriz canal × construtora.
- T18: Velocity proxy (§16 brief) — pra cada empreendimento, calcular
  `months_in_market` via Wayback (T4 do profiler) + última menção redes.
- T19: Risk/reward (§19 brief) — pra cada empreendimento estratégico,
  estimar:
  · Concorrência (# imobiliárias listando)
  · Comissão típica do segmento (alto padrão 5%, MCMV 6-8%)
  · CAC esperado (hipótese baseada em concorrência)
- T20: Output em `docs/intel/working/competitive-mapping-2026-W21.md`.

### strategic-scorer (7 tasks)
Foco: aplicar 5 frameworks (§15-19) + adversarial review.

- T21: Adversarial review — toda finding dos 3 teammates anteriores
  passa por 3 perguntas (§6 Fase C do brief). Drop confidence_pct < 70
  sem cross-check Tier 0-1. Aplicar regras §7.8-10 (Tier 3 cap, CNPJ
  obrigatório, telefone validado).
- T22: Fit-score FYMOOB (§15 brief) — pra cada empreendimento das 3
  (estimado 15-25 produtos totais), calcular 4 dimensões:
  · Bairro match (0-30)
  · Tier de cliente (0-25)
  · SEO opportunity (0-25)
  · Velocity (0-20)
  Total 0-100. Tier 0-1 source pra cada componente.
- T23: Velocity score (§16 brief) — pra top 10 empreendimentos por
  fit-score, calcular months_in_market. Flagar >18m como "lead quente".
- T24: Landing SEO suggestion (§18 brief) — pra empreendimentos com
  fit-score ≥80 (esperado 3-7 itens), output bloco YAML completo
  (proposed_url, target_keywords, schema_priority, content_blocks,
  estimate_dev, projected_organic_traffic_6m).
- T25: Risk/reward final (§19 brief) — pra top 5 empreendimentos por
  fit-score, calcular CAC + revenue per sale + break-even.
- T26: Top 10 oportunidades RANQUEADAS por (fit-score × velocity ÷
  concorrência). Cada uma com next_action específica.
- T27: Output em `docs/intel/working/scorer-findings-2026-W21.md`.

### Lead (3 tasks pos-workers)

- T28: Sintetizar `docs/intel/reports/market-deepdive-2026-W21.md`
  seguindo §9 brief, mas estendido com:
  · Dossiê resumido por construtora (3 sections)
  · Top 10 imóveis estratégicos (tabela com fit-score + velocity)
  · Landing SEO suggestions (3-7 blocks YAML)
  · Risk/reward summary (top 5)
  · Discovery channel matrix
  · Drop list (transparency)
- T29: Validar success criteria §10 + regras NOVAS §7.8-10 + §15-19.
  Se falhar, mensagear teammate específico pra revisar.
- T30: Cleanup robusto §11 (W19 lição): shutdown_request + 60s timeout
  + manual edit config se zumbi + TeamDelete.

## ETAPA — Spawn 4 teammates EM PARALELO

Use Agent tool com 4 chamadas em UMA mensagem:

a) name="deep-profiler", subagent_type="general-purpose"
   Prompt curto: "Você é teammate deep-profiler do W21. Leia brief
   §3+§4+§5+§7+§11+§15+§16. Execute T1-T8. Foco: dossiê COMPLETO de
   Andrade Ribeiro + Veres + Rottas. Wayback Machine pra histórico,
   Instagram pra engagement, LinkedIn pra contatos diretores.
   CNPJ via BrasilAPI. Tier 3 cap 70 sem cross-check Tier 0-1.
   Output: docs/intel/working/profiler-findings-2026-W21.md."

b) name="scraper-dev", subagent_type="general-purpose"
   Prompt curto: "Você é teammate scraper-dev do W21. Leia brief §11
   (anti-padrões scraper) + §16 + §17. Execute T9-T14.
   PRIMEIRO: smoke test scripts/intel/scrape-competitors.mjs --debug
   pros 4 sites. Inspecionar tmp/intel/scrape-debug/{site}/page-N.html
   pra ajustar selectors em SITES.{site}.selectors no script.
   DEPOIS: scrape 5 pgs cada site, output JSON.
   Match listings vs construtoras alvo (Andrade Ribeiro/Veres/Rottas).
   Output: docs/intel/working/competitive-listings-2026-W21.json +
   docs/intel/working/scraper-dev-notes-2026-W21.md (selectors finais
   + issues encontrados).
   NUNCA Monitor — só Bash run_in_background pra polling."

c) name="competitive-mapper", subagent_type="general-purpose"
   Prompt curto: "Você é teammate competitive-mapper do W21. Leia brief
   §3+§4+§7+§17+§19. Execute T15-T20. Pra cada construtora: imobiliárias
   parceiras atuais (Google + LinkedIn), discovery channel matrix
   (Google Ads, SEO, social, parceiros), velocity proxy via Wayback.
   Risk/reward: comissão típica + CAC + revenue per sale.
   Output: docs/intel/working/competitive-mapping-2026-W21.md."

d) name="strategic-scorer", subagent_type="general-purpose"
   Prompt curto: "Você é teammate strategic-scorer do W21. Leia brief
   §3+§4+§6+§7+§11+§15-§19 INTEGRAL. Execute T21-T27.
   Adversarial review obrigatório (3 perguntas/finding). Aplicar 5
   frameworks (§15-§19) com Tier 0-1 source pra cada componente.
   Output: docs/intel/working/scorer-findings-2026-W21.md.
   Quando terminar, mensageie team-lead com top 10 ranqueado."

## WORKFLOW (W19 lessons)

- Mensagens auto-deliver. NUNCA Monitor.
- Idle = waiting (NORMAL).
- Re-priorizar via TaskUpdate se algum teammate bloquear.

## SUCCESS CRITERIA (Lead valida antes de TeamDelete)

✅ Cobertura: 100% empreendimentos das 3 construtoras catalogados (T1-T3)
✅ Scraper Playwright: smoke test passou nos 4 sites + selectors validados
✅ Top 10 oportunidades rankeadas (fit-score × velocity ÷ concorrência)
✅ 3-7 landing SEO suggestions (fit-score ≥80) com YAML completo
✅ Risk/reward calculado pra top 5
✅ Cada finding tem source URL + fetched_at + Tier 0-1
✅ Custo ≤ $12/run, tempo ≤ 120 min
✅ Findings dropados listados (transparência IFCN P5)
✅ Drop rate scorer entre 30-70% (não muito conservador, não muito permissivo)

## ANTI-PADRÕES (NÃO FAÇA — tudo herdado W19 + novos)

❌ Monitor tool em qualquer contexto (W19 lesson — Windows in-process)
❌ Re-download CSVs alvarás (já em tmp/alvaras/ do W19)
❌ Scrape sem Playwright (curl HTML não pega JS pagination)
❌ Tier 3 source com confidence > 70 sem cross-check Tier 0-1
❌ ROI estimado sem cálculo explícito (W19 lesson §11)
❌ Telefone em next_action sem validação contra site oficial
❌ Drop de zumbi sem retry shutdown_request primeiro
❌ Fit-score sem 4 dimensões discriminadas (§15)
❌ Landing SEO sem keyword volume (estimar via Google Trends ou comparáveis)
❌ Tocar em qualquer endpoint DELETE/PUT da Loft API

## EM CASO DE FALHA

- Bug Agent Teams spawn (#34614 ainda ativo): TeamDelete + reportar +
  cair pra subagent paralelo (Task tool 4 workers)
- Captcha bloqueante real em algum site: skip esse site, documentar
- Wayback Machine offline: pular T4 do profiler, flag confidence: hypothesis
  no velocity score
- LinkedIn rate-limit: skip T7, marca contatos como "via Google Maps only"

EXECUTAR. Confirme apenas no fim com report consolidado.
```

---

## Notas pra você (Vinicius)

**Pré-checklist:**
- [ ] Sessão Claude Code completamente nova
- [ ] CWD `c:/Users/Vine/fymoob`
- [ ] Brief V3 atualizado (§15-19 frameworks novos)
- [ ] `scripts/intel/scrape-competitors.mjs` existe (Playwright 1.59.1 instalado)
- [ ] `tmp/intel/` + `tmp/alvaras/` existem do W19

**Custo + tempo esperado:**
- $8-12/run (vs $4-5 W19) — Playwright + 5 frameworks analíticos
- 90-120 min wall-clock (vs 70 W19)

**Output esperado:**
- `docs/intel/reports/market-deepdive-2026-W21.md` (~800-1500 linhas)
- 4 working files audit trail
- `tmp/intel/scrape/*.json` (cache scraping pra W22+ reuse)

**Validação humana pós-run (~30 min):**
- Top 3 landing SEO suggestions: validar keyword volume real
- Top 5 risk/reward: validar comissão típica via 1 release pública
- Bruno revisa top 10 imóveis estratégicos

**Se converter mesmo 1 imóvel alto padrão (R$ 1M × 5% = R$ 50k comissão), o run paga 5000× o custo. Vale rodar.**

**Próximas evoluções:**
- W22: rodar W21 narrow (skip scraper, reuse cache) pra refresh mensal
- W23+: schedule via GitHub Actions cron + Supabase storage histórico
- Sprint dev separado: implementar landing SEO de TOP 3 do W21
