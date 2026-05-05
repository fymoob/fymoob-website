# Prompt W20 — Market Intelligence Narrow Scope (V2 pos-W19)

> **Origem:** W19 entregou 1 oportunidade forte (Andrade Ribeiro 85/100
> validada humano) + 2 médias (Veres 70, Rottas 65). 3 dos 4 teammates
> tiveram falhas (Monitor permission, JS pagination, lag alvarás).
> W20 corrige issues conhecidos + reduz escopo pra deep-dive.
>
> **Como usar:** Sessão Claude Code limpa, CWD = `c:/Users/Vine/fymoob`,
> Agent Teams ativo. Cole o bloco abaixo.

---

## Prompt (copiar tudo entre as cercas)

```
Você é o LEAD do team Market Intelligence W20 (FYMOOB Curitiba). Esta é a
2ª execução — ESCOPO NARROW pos-mortem do W19. Seu objetivo: aprofundar e
expandir o universo de oportunidades sem refazer trabalho que ja deu certo.

## CONTEXTO OBRIGATORIO (leia antes de qualquer acao)

1. `CLAUDE.md` (regras absolutas)
2. `docs/intel/market-intelligence-team-brief.md` INTEGRAL — em particular
   §7 (anti-hallucination, regras 8-10 NOVAS), §11 (anti-padroes, lições W19)
3. `docs/intel/reports/market-2026-W19-validation.md` (validação humana
   dos top 3 do W19 — base pra deep-dive)
4. `docs/intel/working/construtoras-findings-2026-W19.md` (o que
   construtoras-analyst entregou — F-001 a F-010)

## DIFERENCAS vs W19 (NARROW SCOPE)

❌ NAO spawnar scraper — JS pagination dos concorrentes regionais bloqueia
amostra representativa. Aguardar Playwright integration (sprint separado).

❌ NAO baixar CSVs alvarás de novo — ja estao em `tmp/alvaras/` (1.6GB
preservados do W19). Reuse direto via python3 inline.

✅ SPAWN apenas 3 teammates:

- **alvaras-monitor 2.0**: usar CSVs ja baixados em `tmp/alvaras/`. Foco
  em descobrir +5 construtoras candidatas similares aos top 3 (porte
  R$ 5-30M capital, ativas em Curitiba). Documentar lag editorial
  explicitamente ("alvarás até [última data publicada]").
- **construtoras-analyst 2.0**: deep-dive nos top 3 do W19 + 5 novas
  da alvaras-monitor 2.0. Validar CNPJ Receita pra cada (BrasilAPI ou
  cnpj.biz). Procurar release Gazeta do Povo / Tribuna / Bem Paraná
  recentes (≤90 dias) sobre cada uma. Identificar parceria exclusiva.
- **opportunity-scorer 2.0**: revisar findings W19 com regras §7.8-10
  novas (Tier 3 cap 70, CNPJ obrigatorio, telefone validado). Re-scorear
  top 3 considerando validação humana documentada em
  market-2026-W19-validation.md. Adicionar 5 novas em ranking.

✅ Custo target: $1.50-2/run, tempo 30-45min (vs W19 $4-5/70min).

## ETAPA 1 — Validar Agent Teams + ler contexto

Confirme `~/.claude/settings.json` tem
`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` + `teammateMode: "in-process"`.
Se nao, ABORTE.

Leia os 4 arquivos da seção CONTEXTO. NAO pule.

## ETAPA 2 — TeamCreate

```
team_name: "market-intel-2026-W20"
description: "W20 narrow scope — deep-dive top 3 W19 + descobrir 5 novas
construtoras candidatas. Skip scraper (Playwright pendente). Reuse alvarás
CSVs em tmp/alvaras/."
agent_type: "team-lead"
```

## ETAPA 3 — Tasks (12 ao todo, vs 24 do W19)

**alvaras-monitor 2.0 (4 tasks):**
- T1: Verificar `tmp/alvaras/` tem CSVs do W19. Se sim, parsear via Python
  inline (sem download). Documentar quais meses cobrem.
- T2: Filtrar CNAE 4110-7 + 6810 em UF=PR (mesmo W19). Top 30 construtoras
  por # alvarás (vs top 20 W19 — pegar mais candidatas).
- T3: Cross-check com top 3 W19 (Andrade Ribeiro, Veres, Rottas).
  Confirmar que aparecem na lista. Confirmar lag editorial real.
- T4: Identificar 5 novas candidatas com perfil similar: capital R$ 5-30M,
  ≥3 alvarás últimos 12m, NAO já presentes no W19. Output em
  `docs/intel/working/alvaras-findings-2026-W20.md`.

**construtoras-analyst 2.0 (5 tasks):**
- T5: Pra TOP 3 W19 (Andrade Ribeiro, Veres, Rottas), procurar updates
  pos-jul/2025 (releases recentes, Instagram, lançamentos novos).
  Confidence boost se ainda válidos. Confidence drop se algo mudou.
- T6: Pras 5 NOVAS da alvaras-monitor 2.0, validar CNPJ via BrasilAPI
  (https://brasilapi.com.br/api/cnpj/v1/{cnpj_sem_mascara}). Pegar
  capital social + idade + endereço.
- T7: Pra cada uma das 5 novas, procurar release/menção em Gazeta do Povo
  + Tribuna + Bem Paraná últimos 6 meses. Tier 3 cap 70/100.
- T8: Pra cada uma das 5 novas, procurar imobiliária parceira atual via
  Google + site oficial. Flagar "sem parceira exclusiva publicada".
- T9: Output consolidado em `docs/intel/working/construtoras-findings-2026-W20.md`
  com schema JSON §5 do brief. NUNCA dar 100% sem cross-check Tier 0+1.

**opportunity-scorer 2.0 (3 tasks):**
- T10: Revisar findings W19 (top 3) à luz da validação humana documentada
  em `market-2026-W19-validation.md`. Aplicar regras NOVAS §7.8-10 (Tier 3
  cap, CNPJ obrigatório, telefone validado). Confidence ajustada.
- T11: Pra 5 NOVAS, aplicar 3 perguntas adversariais (How? Source tier?
  Disprove?). Drop findings com confidence_pct < 70 sem reforço Tier 0-1.
- T12: Output `docs/intel/working/scorer-findings-2026-W20.md` com:
  - Top 3 W19 com confidence ajustada (refresh pos-validação humana)
  - Top 5 novas ranqueadas
  - Drop list (transparência)

## ETAPA 4 — Spawn 3 teammates EM PARALELO

Use Agent tool com 3 chamadas em UMA mensagem:

a) name="alvaras-monitor", subagent_type="general-purpose"
   Prompt curto: "Você e teammate alvaras-monitor 2.0 do W20. Leia brief
   §3, §4, §11. Execute T1-T4. CSVs em tmp/alvaras/ ja baixados (NAO
   re-download). Use python3 inline pra parsear. Output em
   docs/intel/working/alvaras-findings-2026-W20.md. NUNCA Monitor — só
   Bash run_in_background. Mensageie construtoras-analyst com top 30."

b) name="construtoras-analyst", subagent_type="general-purpose"
   Prompt curto: "Você e teammate construtoras-analyst 2.0. Leia brief
   §3, §4, §7 (regras 8-10 NOVAS), §11. Execute T5-T9. WebFetch BrasilAPI
   pra CNPJ, WebSearch Gazeta/Tribuna/Bem Paraná pra releases. Tier 3
   cap 70. Output em docs/intel/working/construtoras-findings-2026-W20.md.
   Mensageie scorer."

c) name="opportunity-scorer", subagent_type="general-purpose"
   Prompt curto: "Você e teammate opportunity-scorer 2.0. Leia brief §3,
   §4, §7 (regras 8-10 NOVAS), §11. Execute T10-T12. Adversarial review
   obrigatório (3 perguntas/finding). Drop confidence<70 sem cross-check.
   Output em docs/intel/working/scorer-findings-2026-W20.md."

## ETAPA 5 — Acompanhar workflow

Mensagens chegam auto. Idle = waiting (NORMAL). NUNCA Monitor.

## ETAPA 6 — Synthesis

Quando scorer mensageia top 8 (3 W19 ajustadas + 5 novas):
1. Ler docs/intel/working/*-2026-W20.md
2. Consolidar em docs/intel/reports/market-2026-W20.md seguindo §9 do brief
3. Validar success criteria §10 + regras NOVAS §7.8-10
4. Se algum critério falhar, mensageie teammate específico

## ETAPA 7 — Cleanup robusto (lição W19)

Mensageie cada teammate `{type: "shutdown_request"}`.
Aguarde 60s por response.
Se algum nao responder em 60s:
  edit manual `~/.claude/teams/market-intel-2026-W20/config.json`
  removendo o member zumbi → retry TeamDelete.

TeamDelete final.

## ETAPA 8 — Apresentar pro Vinicius

Reporte BREVE (<400 palavras):
- Path do report W20
- Top 3 W19 confidence ajustada (subiu/caiu vs W19?)
- Top 5 NOVAS ranqueadas (1 frase cada com next_action)
- Custo + tempo real
- O que NAO funcionou (se algo)

## ANTI-PADROES (NAO FAÇA — herdados W19)

❌ Monitor tool em qualquer contexto
❌ Re-download de CSVs (já em tmp/alvaras/)
❌ Spawn scraper (Playwright pendente)
❌ Tier 3 source com confidence > 70 sem cross-check Tier 0+1
❌ ROI estimado sem cálculo explícito
❌ Telefone em next_action sem validação contra site oficial
❌ Drop de zumbi sem retry shutdown_request primeiro

EXECUTAR. Confirme só ao fim com o report.
```

---

## Notas pra você (Vinicius)

**Pré-checklist:**
- [ ] Sessão Claude Code limpa (nova janela ou /clear)
- [ ] CWD `c:/Users/Vine/fymoob`
- [ ] `tmp/alvaras/` existe com CSVs do W19 (1.6GB)
- [ ] Brief atualizado com regras §7.8-10 + §11 anti-padrões W19
- [ ] Validation report W19 commitado em `docs/intel/reports/`

**Custo + tempo esperado:**
- $1.50-2/run (vs $4-5 W19) — escopo reduzido sem scraper + reuse CSVs
- 30-45 min wall-clock (vs 70 min W19)

**Se W20 quebrar:**
- Bug Monitor permission persistente → cair pra subagent (Task tool)
- Lag alvarás impede top 30 → fazer só com top 20 dos CSVs Q4/2024
- Releases recentes não aparecem → confidence levels caem, OK

**Próxima evolução (W21+):**
- Playwright integration pra scraper (sprint separado dev)
- GitHub Actions cron weekly automatizar
- Dashboard `/admin/intel` consolidando últimas 4 semanas
