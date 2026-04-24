# Aprendizados da Reescrita de Artigos FYMOOB

> Log incremental — a cada post reescrito, adicionar uma seção.
> O próximo rewrite DEVE incorporar os aprendizados acumulados.
> Metodologia completa: ver memória `feedback_article_rewrite_methodology.md`.

## Índice de posts reescritos

| # | Post | Data | Commit | Prioridade | Status |
|---|---|---|---|---|---|
| 1 | como-financiar-minha-casa-minha-vida | 23/04/2026 | `e98b038` + `553b16c` | — (newsjacking MCMV Faixa 4) | ✅ |
| 2 | financiamento-caixa-itau-bradesco-comparativo | 23/04/2026 | `af60233` | ALTA (241 imp/0 clicks) | ✅ |
| 3 | mercado-imobiliario-curitiba-2026 | 23/04/2026 | TBD | P0 | ✅ |

---

## Post 1 — MCMV Faixa 4 (23/04/2026)

### O que funcionou

- **Newsjacking em 24h** da mudança de regra MCMV (22/04 → publicado 23/04) capturou momentum máximo da query
- **Claude Design** pra OG image custom — visual forte, ranking primário em shares
- **Correção factual pré-distribuição** — após publicar "Faixa 4 é nova", WebFetch gov.br revelou que era "ampliada". Rollback imediato antes de distribuir salvou reputação YMYL

### O que NÃO funcionou

- **Publicou antes de validar** — escrevi o post sem passar em fontes primárias (gov.br/Ministério das Cidades). Só depois que Vinicius perguntou "entrou em vigor ontem mesmo?" o erro apareceu
- **Imagem PNG estourou cota Vercel Image Optimization** (402 Payment Required). Teve que converter pra WebP + `unoptimized` em 2 componentes

### Aprendizado pro próximo

- **YMYL sempre passa por WebFetch em fonte primária ANTES de publicar**, não depois
- **OG image = WebP pré-dimensionada 1200x630** + `unoptimized` em todos os components que consomem (`BlogCard`, hero do post)

---

## Post 2 — Financiamento Caixa/BRB/Itaú/Santander/Bradesco (23/04/2026)

### O que funcionou

- **Team agent (2 agentes paralelos)** — editorial excellence + data validation — gerou em 1 request o que levaria dias de pesquisa manual
- **Manual Editorial criado como output** — virou regra reutilizável pra TODO post futuro, não só pra este
- **Descoberta de discrepância crítica** — agent de data validation identificou que "R$ 270k" só bate com imóvel R$ 1M+ (não o cenário padrão R$ 500k). Evitou publicar número falso.
- **Expansão de 3 → 5 bancos** agregou BRB (surpresa de ranking) e Santander, aumentando o diferencial vs Exame/MySide
- **CET > taxa nominal** virou insight central do post (Itaú tem CET maior que Santander apesar da taxa nominal menor) — diferenciação competitiva real

### O que NÃO funcionou

- **Agent editorial misturou recomendações com exemplos genéricos** — tive que filtrar manualmente qual dado aplicar ao post específico
- **Número R$ 270k aparecia na style guide como padrão** mesmo após a validação provar que era falso pro cenário padrão — houve risco de reescrever o post mantendo o número errado. Evitado por checagem cruzada.
- **Não foi pedido nenhum agent específico de SEO/SERP** — perdi oportunidade de validar keyword cluster e PAA real

### Aprendizado pro próximo

- **Sempre incluir agent de SEO/SERP** — valida SERP atual, PAA, competidores, featured snippet gaps
- **Cross-check obrigatório entre agentes** — se agent A recomenda usar número X e agent B diz que X é falso, SEMPRE priorizar B (dados > estilo)
- **Agent writer/craft deve receber o post atual + dados já validados** — não deve inventar números em seus exemplos (risco de contaminar o rewrite final)
- **Separar output "regra geral" de "recomendação pro post específico"** — agents devem ser explícitos sobre qual é qual

### Impacto esperado (medir em 30/04)

- CTR: 0% → 2-4% (baseline 241 imp/sem, pos 6.7)
- Position: 6.7 → 3-5 (em 60-90 dias)
- Impressions: crescer via adição de keywords "BRB", "CET", "Santander"

---

---

## Post 3 — Mercado Imobiliário Curitiba 2026 (23/04/2026)

**Primeira aplicação completa da metodologia multi-agent (5 specialists em paralelo).**

### O que funcionou

- **5-agent team em paralelo (data + macro + local + writer + SEO)** gerou profundidade que 2-agent não tinha captado. Cada especialista trouxe 2-3 achados únicos que outros perderiam.
- **Cross-check entre agents salvou YMYL.** Writer specialist propôs lide com "Mercês passou Batel" baseado no audit preliminar — agent local validou via FipeZap e mostrou que o real era **Ahú +12,5%**, não Mercês. Sem o cross-check, publicaríamos um erro factual.
- **Gap único local (Lei 16.361/2024)** — agent local descobriu a Lei do Potencial Construtivo Adicional que explica por que Batel valoriza menos apesar dos lançamentos. Esse é o tipo de insight que só especialista local acha. Virou seção inteira do post.
- **Ângulo "boom, bolha ou filtro?"** — combinou 3 specialists (EconomiaPR "filtro", macro "não é bolha mas tem pressão", local "Ahú supera Batel"). Pergunta tripla no título cria curiosity gap sem enganar porque o post responde cada uma honestamente.
- **Featured snippet catchable** — SEO specialist identificou que "existe bolha em Curitiba?" é PAA + gap simultâneo. Post tem answer-first + 3 bullets exatos — formato de snippet.
- **Número-âncora honesto** (Curitiba +17,86% = 2ª capital BR) substituiu o clickbait falso ("bolha em Curitiba") com algo igualmente forte e validável.
- **Voz natural pronta no writer brief** — Seu Dinheiro + Bem Paraná como referências. Lide e transições saíram do brief, não do meu cérebro.

### O que NÃO funcionou

- **Writer specialist recebeu input contaminado do audit preliminar.** O audit anterior tinha mencionado "Mercês +9%" como ângulo (errado). O writer agent usou esse dado na lide inicial. Só foi corrigido quando o agent local trouxe FipeZap validado.
- **Serialização vs paralelização** — agents rodaram todos em paralelo (economiza tempo), mas writer deveria idealmente rodar DEPOIS do data validation. Trade-off: velocidade vs. correção.
- **Yield por bairro no gap FYMOOB** usou faixas indicativas, não dados calculados ao vivo da API Loft. Perdeu diferencial real. Script pra calcular yield via Loft ficará como follow-up task.
- **CET foi mencionado em prosa, mas não tabulado** — poderia ter virado mini-tabela nos comentários sobre financiamento. Oportunidade de featured snippet secundário.
- **Não usei MCP da API Loft** pra validar estoque de imóveis em cada bairro — teria dado autoridade local concreta (ex: "FYMOOB tem 23 imóveis ativos no Ahú hoje"). Follow-up.

### Aprendizado pro próximo

1. **Serialize data validation ANTES do writer specialist** — ou explicite ao writer que "números do audit preliminar são hipóteses, aguardar data validation final". Elimina contaminação.
2. **Quando o gap único envolve API interna (Loft), planejar script ANTES do rewrite** — pra ter dado real no post, não faixa indicativa.
3. **Adicionar agent dedicado de "verifier/editor"** que roda APÓS os 5 specialists e antes de mim escrever. Função: cross-check final entre outputs + sinalizar conflitos. Atual cross-check ficou na minha síntese, que é ponto único de falha.
4. **Pilar post (2000-3000 palavras) justifica 5 specialists.** Post curto (800-1200 palavras) — talvez 2-3 specialists sejam suficientes (data + writer + SEO).
5. **Título com pergunta tripla ("boom, bolha ou filtro?") funciona quando as 3 partes são respondidas no post.** Confirma compromisso YMYL. Próximos posts podem tentar esse padrão onde couber.

### Impacto esperado (medir em 30/04 e 07/05)

- CTR: baseline atual TBD (pegar via GSC). Post não tinha performance notável — é pilar que deve ganhar tração com a reescrita.
- Position: alvo 3-5 pra query "mercado imobiliario curitiba 2026"
- Featured snippet: candidato forte pra "existe bolha imobiliaria em curitiba"
- Internal links ganhos: agora linka pra `/blog/financiamento-caixa-itau-bradesco-comparativo` + WhatsApp com contexto específico (yield, CET)

### Follow-ups deste post

- [ ] Script `calculate-yield-by-bairro.mjs` via API Loft (gerar tabela real de yield por bairro)
- [ ] OG image custom pro post (Claude Design) — título "boom, bolha ou filtro?" + número 17,86%
- [ ] Em 7 dias: medir delta CTR/position via GSC

---

## Template pra próxima entrada

```markdown
## Post N — <slug> (DD/MM/AAAA)

### O que funcionou
- ...

### O que NÃO funcionou
- ...

### Aprendizado pro próximo
- ...

### Impacto esperado / Impacto medido
- CTR antes → depois
- Position antes → depois
- Impressions antes → depois
```
