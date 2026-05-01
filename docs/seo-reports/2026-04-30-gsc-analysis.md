# Análise GSC — 11 dias pós-cutover (17-28 abril 2026)

**Período analisado:** 16/04/2026 (cutover) → 28/04/2026 (13 dias, mas dados úteis a partir do 18/04)
**Fonte:** GSC export em `docs/GSC/`

## TL;DR — 4 ações prioritárias

1. **🚨 Reescrever title/description do `/blog/financiamento-caixa-itau-bradesco-comparativo`** — está com 790 impressões e apenas 1 clique (0.13% CTR, posição 5.73). Otimização pode gerar +30-80 cliques/mês.

2. **🟡 Confirmar que redirects 301 das URLs duplicadas (`/imovel/...AP00772` com áreas 97.59 e 96.58) estão ativos.** Google ainda indexando ambas variantes — bug se ainda persiste após commit `10d60da`.

3. **🟢 Apartment schema JÁ está funcionando** — "Snippets do produto" aparece com 2 cliques de 8 impressões = **25% CTR**. Continuar reforçando rich data nos empreendimentos pra escalar.

4. **🟡 Empurrar 4 queries de posição 7-9 pra top 3** — "custo de vida curitiba 2026" (pos 7.8/8.9), "valor metro quadrado apartamento curitiba" (pos 7.3) e variantes têm impressões mas zero cliques. Title/snippet melhor resolve.

---

## 1. Performance geral

### 1.1 Resumo por dispositivo

| Dispositivo | Cliques | Impressões | CTR | Posição |
|---|---|---|---|---|
| **Celular** | 33 | 405 | **8.15%** ⭐ | 8.46 |
| **Computador** | 26 | 1,692 | **1.54%** ⚠️ | 8.33 |
| **Tablet** | 0 | 6 | 0% | 30.5 |

**Insight crítico:** desktop tem **4× mais impressões** que mobile mas **5× menos CTR**. Possíveis causas:
- Title/description não diferencia bem em SERP desktop (mais opções visuais)
- Marketplaces (Viva Real, ZAP) ocupam mais espaço visual em desktop
- Usuários desktop são mais "exploradores" (vêem mais resultados antes de clicar)

**Ação:** title precisa ser mais "agressivo" em chamar atenção — incluir **número** sempre que possível.

### 1.2 Crescimento diário (curva exponencial)

| Data | Cliques | Impressões | CTR | Posição |
|---|---|---|---|---|
| 16/04 (cutover) | 0 | 0 | — | — |
| 17/04 | 0 | 5 | 0% | 19 |
| 18/04 | 1 | 56 | 1.79% | 9.0 |
| 19/04 | 2 | 94 | 2.13% | 7.8 |
| 22/04 | 11 | 150 | 7.33% | 7.8 |
| 24/04 | 8 | 269 | 2.97% | 9.1 |
| 27/04 | 8 | 316 | 2.53% | 8.7 |
| 28/04 | 9 | 359 | 2.51% | 7.6 |

**Crescimento de impressões: 5 → 359 em 11 dias** (72× o volume inicial). Posição melhorando: **19 → 7.6**.

### 1.3 Distribuição geográfica

| País | Cliques | Impressões | CTR |
|---|---|---|---|
| 🇧🇷 Brasil | 58 | 1,032 | **5.62%** ⭐ |
| 🇺🇸 EUA | 1 | 827 | 0.12% ⚠️ |
| Outros | 0 | 244 | 0% |

**🚨 Problema:** **827 impressões dos EUA com 0.12% CTR**. São bots/scrapers ou diáspora brasileira. **Diluindo CTR médio** (se removêssemos US, CTR Brasil seria 5.62% vs atual 2.81% global).

**Ação:** GSC permite filtrar por país no relatório, mas pra Google ranking — adicionar `geo-targeting` no GSC pra Brasil-only:
- GSC > Configurações > Segmentação Internacional > "Brasil"
- E/ou adicionar header `Content-Language: pt-BR` (já temos via `<html lang="pt-BR">`)

---

## 2. Top consultas — análise

### 2.1 Top 10 queries com cliques

| Query | Cliques | Impressões | CTR | Posição |
|---|---|---|---|---|
| **fymoob** (branded) | 25 | 119 | 21.01% | 2.17 |
| meo neoville (empreend) | 1 | 8 | 12.5% | 9 |
| residencial canto do uirapuru | 1 | 7 | 14.29% | 11.86 |
| apartamento mossungue | 1 | 1 | 100% | 43 |

**Insight:** **42% dos cliques** são busca branded ("fymoob"). Saudável (marca tem reconhecimento), mas indica que tráfego não-branded ainda é fraco — o que é esperado em 11 dias.

### 2.2 Queries com IMPRESSÕES mas 0 cliques (oportunidades)

Estas devem ser **prioridade pra otimizar** title/description (têm intent + estão sendo descobertas):

| Query | Impressões | Posição | Diagnóstico |
|---|---|---|---|
| **custo de vida em curitiba** | 29 | 47.9 | Pos baixa — pillar `/morar-em-curitiba` ainda não escalou pra esse termo |
| **custo de vida curitiba** | 28 | 48 | idem |
| **custo de vida em curitiba 2026** | 12 | **7.83** ⚠️ | **Pos 8 e 0 cliques!** Title precisa de revisão |
| **custo de vida curitiba 2026** | 9 | **8.89** ⚠️ | idem |
| equi seminario | 8 | 11.75 | Empreendimento — perto da pág 1 mas zero cliques |
| liv in | 8 | 27 | Pos baixa |
| **valor médio metro quadrado apartamento curitiba 2026** | 3 | **7.33** ⚠️ | **Pos 7 e zero cliques** — high-value query, Title fraco |
| imobiliarias no boqueirão | 3 | 50 | Sem landing dedicada (pode subir com SEO) |

**🎯 Ação imediata:** revisar title/description do post `/blog/custo-de-vida-curitiba` e adicionar "**2026**" no title — Google está rankeando ele em pos 7-9 pra queries com "2026" mas não está cliando.

### 2.3 Snippet de produto detectado

**🎉 Apartment schema funcionando:**

| Aspecto | Cliques | Impressões | CTR |
|---|---|---|---|
| Snippets do produto | 2 | 8 | **25%** ⭐ |

Ou seja, em 8 buscas onde o snippet de produto apareceu, **2 levaram a clique** (CTR 25% — 10× melhor que CTR médio). Confirma que a Fase 19.P0.2 (Apartment schema rico) está agregando valor real.

**Ação:** continuar reforçando schema rico nos empreendimentos (P1) — quanto mais imóveis com snippet, mais cliques.

---

## 3. Páginas — análise por categoria

### 3.1 Top performers (gerando cliques)

| URL | Cliques | Impressões | CTR | Posição |
|---|---|---|---|---|
| `/` | 41 | 207 | **19.81%** ⭐ | 2.72 |
| `/blog/preco-metro-quadrado-curitiba-bairro` | 2 | 41 | 4.88% | 5.68 |
| `/blog/financiamento-caixa-itau-bradesco-comparativo` | 1 | **790** | 0.13% ⚠️ | 5.73 |

### 3.2 Páginas com IMPRESSÕES MAS 0 CLIQUES (alta oportunidade)

Reescrever title/description aqui = ROI imediato:

| URL | Impressões | Posição | Gap potencial |
|---|---|---|---|
| `/blog/custo-de-vida-curitiba` | **421** | 12.07 | Subir pra pos <10 = +10-15 cliques/mês |
| `/contato` | **124** | 2.72 | Estranho — pos 3 com 0 cliques. Investigar |
| `/blog` | 96 | 2.55 | Title fraco? Listing pode otimizar |
| `/blog/como-financiar-minha-casa-minha-vida` | 84 | 8.63 | Quase pág 1 — title diferenciado pode dar boost |
| `/sobre` | 51 | 2.31 | Pos 2 com 0 cliques — title/snippet ruim |
| `/blog/mercado-imobiliario-curitiba-2026` | 49 | 4.22 | Pos 4 com 0 cliques |
| `/comprar-imovel-curitiba` (pillar) | 42 | 3.24 | Pos 3 com 0 cliques — pillar genérico, novo `/comprar-apartamento-curitiba` deve roubar volume |

**Padrão crítico:** páginas em **posição 2-5 com 0 cliques** = **title/description não estão atraindo o usuário**. Não é problema de ranking, é de copywriting do snippet.

### 3.3 URLs problemáticas detectadas

#### Duplicação CRM (slug instável)

```
/imovel/apartamento-duplex-mossungue-curitiba-pr-2-quartos-97.59m2-AP00772 (1 clique, pos 1)
/imovel/apartamento-duplex-mossungue-curitiba-pr-2-quartos-96.58m2-AP00772 (1 clique, pos 3)
```

**Mesmo código AP00772, áreas diferentes (97.59 vs 96.58)**. Confirma o problema previsto na Fase 19 (slug muda quando CRM atualiza). Verificar se redirect 301 do commit `10d60da` (`permanentRedirect` quando `property.slug !== slug`) está ativo em produção. Se sim, Google deve consolidar em ~14 dias.

#### Querystrings legadas ainda indexadas

```
/busca?finalidade=Aluguel&order=menor-preco (2 imp, pos 10)
/busca?finalidade=Venda&order=menor-preco&min=10000.00 (1 imp, pos 4)
/busca?tipo=Casa&ordenar (2 imp, pos 53)
```

Os redirects 301 do commit `10d60da` (params legados) devem limpar essas — Google levará 7-21 dias pra reprocessar.

### 3.4 Empreendimentos descobertos mas em posições baixas (oportunidade)

Lista de empreendimentos com 1-7 impressões em posições 10-90:

- `/empreendimento/orfeu` (pos 20.5)
- `/empreendimento/zait` (pos 20)
- `/empreendimento/mova-wf` (pos 24)
- `/empreendimento/myta` (pos 14)
- `/empreendimento/lemme` (pos 35)
- `/empreendimento/lange` (pos 39)
- `/empreendimento/portao-prime-residence` (pos 53.67)
- `/empreendimento/le-sense` (pos 82)

**Ação:** internal linking mais agressivo nos empreendimentos. Hoje só `/empreendimentos` listing linka. Adicionar:
- Cards de "Empreendimentos parecidos" em cada empreendimento
- Footer global com top 10 empreendimentos
- Menção em blog posts (quando relevante)

---

## 4. Plano de ação priorizado

### 🔴 P0 — Esta semana (alto ROI, baixo esforço)

#### 4.1 Otimizar title/description das 7 páginas com 0 cliques apesar de boa posição

Priorizar (ordem por impressões × oportunidade):

1. **`/blog/financiamento-caixa-itau-bradesco-comparativo`** (790 imp, 0.13% CTR)
   - Title atual: provavelmente "Financiamento Caixa, Itaú, Bradesco — Comparativo | FYMOOB"
   - Sugestão: **"Caixa, Itaú ou Bradesco? Comparativo Real de Financiamento Imobiliário 2026 com Taxas Atuais | FYMOOB"** (números + ano + power words)

2. **`/blog/custo-de-vida-curitiba`** (421 imp, pos 12)
   - Title sugestão: **"Custo de Vida em Curitiba 2026: Quanto Custa Morar (R$ Real) | FYMOOB"**
   - Adicionar "2026" + "(R$ Real)" capturam queries com "2026"

3. **`/contato`** (124 imp, pos 2.72, 0 cliques) — investigar **POR QUE** ninguém clica em pos 3
   - Title atual provavelmente "Contato | FYMOOB"
   - Sugestão: **"Contato FYMOOB Imobiliária — WhatsApp (41) 99978-0517 e Endereço Curitiba"**
   - Mostra info útil DIRETO no SERP — pode reduzir cliques (boa razão), mas não 100%

4. **`/blog/como-financiar-minha-casa-minha-vida`** (84 imp, pos 8.63)
5. **`/sobre`** (51 imp, pos 2.31)
6. **`/blog/mercado-imobiliario-curitiba-2026`** (49 imp, pos 4.22)
7. **`/blog`** (96 imp, pos 2.55)

**Estimativa:** 4-6h reescrevendo titles + descriptions. **Ganho esperado:** +50-100 cliques/mês em 30 dias.

#### 4.2 Verificar redirect 301 em produção

```bash
curl -I https://fymoob.com.br/imovel/apartamento-duplex-mossungue-curitiba-pr-2-quartos-97.59m2-AP00772
# Esperado: 308/301 redirect pra slug atual com 96.58m2
```

Se NÃO redirecionar, bug crítico. Confirmar.

#### 4.3 Configurar geo-targeting no GSC (Bruno faz)

GSC > Configurações > Segmentação Internacional > **Brasil**

Reduz impressões "fantasma" dos EUA (827) que diluem CTR.

### 🟡 P1 — Próximas 2 semanas

#### 4.4 Reforçar internal linking pra empreendimentos descobertos

- Footer global com 10 empreendimentos rotacionados (random ou top-N)
- "Empreendimentos parecidos" em cada `/empreendimento/[slug]`
- Linkar empreendimentos relevantes em blog posts (Reserva Barigui, Trebbiano, Sunset Água Verde, etc)

#### 4.5 Apartment schema em mais páginas

Como está funcionando, expandir cobertura:
- Cada empreendimento individual ganha schema `Apartment` agregando todas as unidades
- Adicionar `image` URL absoluta em todos os ItemList

#### 4.6 Pillar `/comprar-apartamento-curitiba` (já feito) começa a captar volume

Esperar 7-14 dias pra ver primeiras impressões. Acompanhar GSC > Performance > filtrar query "comprar apartamento curitiba".

### 🟢 P2 — Próximo mês

#### 4.7 Pedir reviews novos pro GMN (Bruno)

59 reviews → meta 80-100 reviews em 30 dias. Junto com AggregateRating schema (Fase 19.16, bloqueado), vira rich result com estrelas no SERP.

#### 4.8 Backlinks editoriais

Engajar Tribuna PR, G1 PR, Bem Paraná, GazetaMaringá com release sobre dados FipeZAP + insights da FYMOOB. Cada backlink editorial tem DA 50-70 (vs DA atual ~25 da FYMOOB).

---

## 5. Métricas-alvo (próximo report 30 dias)

| Métrica | Atual (28/04) | Meta (28/05) |
|---|---|---|
| Cliques diários | ~9 | 20-30 |
| Impressões diárias | ~360 | 800-1500 |
| CTR médio | 2.81% | 3.5-5% |
| Posição média | 7.6 | <6 |
| Cliques desktop | 26 (11 dias) | 100+ |
| Cliques mobile | 33 (11 dias) | 150+ |
| Top 10 queries com cliques | 4 | 15-20 |
| Páginas com 0 cliques apesar de pos <10 | 7 | 0 |

## 6. Riscos identificados

1. **Brand search dominante (42% cliques) com pos 2** — pos 1 deveria ser FYMOOB, mas Knowledge Panel ocupa #1. Reclamar GMN (Fase 19.16) pode dar mais controle visual.
2. **Desktop CTR 1.54%** — se não melhorar, perdemos 60% do potencial. Title/description revisão é solução.
3. **827 imp US sem cliques** — diluindo métricas. Geo-targeting resolve.
4. **Empreendimentos novos surgindo (pos 50-90)** — risco de canibalização entre empreendimentos similares. Internal linking estratégico mitiga.

---

## 7. Conclusão

**11 dias após cutover, FYMOOB está numa fase saudável de descoberta:**
- Brand search forte (21% CTR)
- Apartment schema funcionando (snippet de produto com 25% CTR)
- Crescimento exponencial de impressões (5 → 359/dia)
- Posição melhorando (19 → 7.6)

**Maiores ganhos imediatos virão de:**
1. **Reescrever 7 titles/descriptions** de páginas com posição boa mas 0 cliques (4-6h dev → +50-100 cliques/mês)
2. **Confirmar redirects 301** das URLs duplicadas (verificação 5min)
3. **Configurar geo-targeting Brasil** no GSC (Bruno, 2min)

**Ganhos médio prazo (30-60 dias):**
- Apartment schema escalando = mais snippets de produto
- Pillar `/comprar-apartamento-curitiba` começando a rankear
- Internal linking puxando empreendimentos pra cima
- AggregateRating + GMN (quando Bruno reclamar)

**Próxima análise:** 28/05/2026 (30 dias depois)
