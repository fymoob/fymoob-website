# Plano de revisão — `custo-de-vida-curitiba`

> Compilado em **2026-05-02** após auditoria. Próximo da fila de Sprint A
> do [plano geral](./article-revision-plan-2026-05-02.md). Risco 🟡 médio.
>
> **Validar com ChatGPT antes de aplicar.** Após validação, traduzir em
> script idempotente `scripts/apply-custo-vida-revisions.mjs` no padrão
> dos outros artigos (BLOCK_OVERRIDES + marker de detecção pra rodar duas
> vezes sem corromper).

---

## 1. Por que este artigo é prioridade

Dois problemas que se reforçam:

### 1.1 Conflito interno entre artigos do site (CRÍTICO)

O mesmo bairro aparece com **R$/m² diferente** em dois artigos publicados
no FYMOOB. Leitor que abre os dois em abas paralelas perde confiança:

| Bairro | `preco-metro-quadrado-curitiba-bairro` (FipeZap mar/26) | `custo-de-vida-curitiba` (CRM FYMOOB abr/26) | Δ |
|---|---|---|---|
| Batel | R$ 17.924 | R$ 20.271 | +13% |
| Bigorrilho | R$ 14.117 | R$ 19.509 | **+38%** |
| Portão | R$ 9.200 (#17) | R$ 11.129 | +21% |
| Campina do Siqueira | não no top 30 | R$ 20.574 | n/a |

Causa raiz: o `custo-de-vida` cita "estoque ativo da FYMOOB" (sample <250
imóveis em 66 bairros) como se fosse índice de mercado. Sample
pequeno + viés de captação (FYMOOB pega mais alto-padrão) **não pode**
competir com FipeZap como referência.

### 1.2 Trecho explícito "segundo dados internos da FYMOOB"

O bloco 45 abre o capítulo de aluguel ancorando em dado interno como
fonte primária — exatamente o padrão que o GPT sinalizou como problema
nos outros artigos.

**Solução padrão (princípio editorial 1.1 do plano):** FipeZap como
fonte primária de R$/m² por bairro; CRM aparece (se aparecer) como
"observação complementar do estoque acompanhado", nunca como autoridade.

---

## 2. Sumário das mudanças

| # | Bloco | Tipo | Mudança |
|---|---|---|---|
| 1 | 45 | paragraph | Trocar "dados internos FYMOOB" por FipeZap. Atualizar números (Batel 17.924, Campina do Siqueira removida — não é coberta no top 30 FipeZap). |
| 2 | 46 | paragraph | Atualizar comparação Bigorrilho→Portão com números FipeZap (14.117 → 9.200 ≈ -35%). |
| 3 | 110 | paragraph | FAQ "bairros baratos" — substituir CRM por FipeZap ranking 28-30 ou suavizar pra "no extremo acessível do ranking FipeZap". |
| 4 | 47 | paragraph | "Aluguel típico 0,4-0,6%" — adicionar fonte (FipeZap Locação ou Secovi-PR) ou suavizar. |
| 5 | 114 | paragraph | "Fontes consultadas" — reordenar pra deixar FYMOOB CRM como "observação complementar" depois das fontes oficiais. |

5 blocos. ~15 minutos de aplicação após validação.

---

## 3. Mudanças trecho a trecho

### Mudança 1 — Bloco 45 (abertura do "Aluguel: o maior peso da conta")

**Texto atual:**
> Curitiba tem variação de 4x no preço por m² entre o bairro mais
> barato e o mais caro do estoque ativo, segundo **dados internos da
> FYMOOB em abril/2026**. **Campina do Siqueira (R$ 20.574/m²)** e Batel
> (R$ 20.271/m²) abrem o ranking — praticamente empatados, contrariando
> a narrativa de "Batel é o mais caro". Na ponta inferior, Campo de
> Santana e Tatuquara ficam em torno de R$ 5.200/m².

**Problemas:**
1. "Dados internos FYMOOB" como autoridade pra ranking de m² (princípio 1.1).
2. R$ 20.574 Campina do Siqueira **não aparece no FipeZap top 30** — provavelmente artefato de amostra pequena (lançamentos isolados de alto padrão).
3. R$ 20.271 Batel **conflita 13%** com FipeZap mar/26 (R$ 17.924) — inconsistência interna com o artigo `preco-metro-quadrado-curitiba-bairro` do próprio site.
4. Subverte uma narrativa correta ("Batel é o mais caro do FipeZap") em troca de outra duvidosa ("empate técnico com Campina do Siqueira").

**Fonte de substituição:** FipeZap mar/2026 (publicado por MySide, BemBrasil), tabela já consolidada em `preco-metro-quadrado-curitiba-bairro` (R$ 17.924 a R$ 5.210, variação ~3,4×).

**Texto proposto:**
> Curitiba tem variação de cerca de 3,4× no preço por m² entre o bairro
> mais caro e o mais barato. Em março/2026, o ranking [FipeZap
> publicado por MySide](https://www.myside.com.br/) coloca Batel no
> topo (R$ 17.924/m²), seguido por Bigorrilho (R$ 14.117) e Mossunguê
> (R$ 14.062). Na ponta acessível, Tatuquara fecha em R$ 5.210, Cidade
> Industrial em R$ 5.980 e Tarumã em R$ 6.340 — variação suficiente pra
> mudar perfil financeiro com 5 km de deslocamento. **O ranking
> completo, com variação 12 meses por bairro, está em [Preço do metro
> quadrado em Curitiba por bairro
> 2026](/blog/preco-metro-quadrado-curitiba-bairro).**

**Justificativa:** mantém o gancho "variação grande entre bairros" (que é
verdadeiro), troca CRM por FipeZap (Tier 1), elimina a comparação
duvidosa Batel × Campina do Siqueira, e cross-linka pro próprio artigo
FYMOOB que tem o ranking completo (boost de SEO interno).

---

### Mudança 2 — Bloco 46 (atalho Bigorrilho → Portão)

**Texto atual:**
> Pra quem aceita andar 2 km, o atalho mais óbvio é Bigorrilho → Portão:
> **R$ 19.509/m² vira R$ 11.129/m²**, 43% de desconto no metro quadrado
> mantendo a mesma região. O ranking completo dos 22 bairros com amostra
> estatística está em .

**Problemas:**
1. R$ 19.509 Bigorrilho conflita 38% com FipeZap (R$ 14.117).
2. R$ 11.129 Portão sem fonte clara.
3. "ranking dos 22 bairros com amostra estatística" — auto-referência ao CRM como se fosse pesquisa.
4. O link no fim está vazio (parece quebrado).

**Texto proposto:**
> Pra quem aceita andar 2 km, o atalho mais óbvio é
> Bigorrilho → Portão: **R$ 14.117/m² vira R$ 9.200/m²**, ~35% de
> desconto no metro quadrado mantendo a mesma região (FipeZap mar/26).
> Ranking completo dos 30 bairros com variação 12 meses em
> [Preço do metro quadrado em Curitiba por
> bairro](/blog/preco-metro-quadrado-curitiba-bairro).

**Justificativa:** mesmos números do bloco anterior, agora consistentes
com o artigo PMQ. O leitor sai com convicção da intuição (existe
desconto real "andando 2 km") sem expor o site a inconsistência.

---

### Mudança 3 — Bloco 110 (FAQ "Quais bairros baratos pra morar em Curitiba")

**Texto atual:**
> Em **R$/m² do estoque ativo abr/2026**: Campo de Santana (R$ 5.244),
> Tatuquara (R$ 5.279), Boqueirão (R$ 5.673), Fazendinha (R$ 5.779) e
> Cidade Industrial (R$ 6.052). Pra região central com desconto, Portão
> custa R$ 11.129/m² — 43% mais barato que Bigorrilho andando 2 km.

**Problemas:**
1. "Estoque ativo" = CRM como autoridade.
2. Os 5 bairros listados não aparecem no FipeZap top 30 (FipeZap não
   publica granular pra Campo de Santana, Boqueirão, Fazendinha, CIC).
   FipeZap só dá Tatuquara (R$ 5.210) e CIC (R$ 5.980).
3. Conflito Bigorrilho/Portão repetido.

**Texto proposto:**
> Em R$/m² no FipeZap mar/26 (publicado por MySide), os mais
> acessíveis do ranking de 30 bairros são **Tatuquara (R$ 5.210)** e
> **Cidade Industrial (R$ 5.980)**. Bairros muito periféricos como
> Campo de Santana, Boqueirão e Fazendinha não estão na cobertura
> regular do FipeZap mas, pelo padrão de mercado em abril/2026, ficam
> entre **R$ 5.200 e R$ 5.800/m²**. Pra região central com desconto,
> Portão custa em torno de **R$ 9.200/m²** — ~35% mais barato que
> Bigorrilho (R$ 14.117), andando 2 km.

**Justificativa:** mantém a utilidade da FAQ (5-6 bairros baratos
nomeados) mas separa o que é FipeZap publicado (Tatuquara, CIC) do que é
estimativa de mercado (Campo de Santana, Boqueirão, Fazendinha) — sem
mediana exata pra esses 3, com faixa coerente.

---

### Mudança 4 — Bloco 47 (regra do aluguel ÷ venda)

**Texto atual:**
> Como referência prática, aluguel típico em Curitiba fica entre **0,4%
> e 0,6% do valor de venda ao mês** — apartamento de R$ 800 mil aluga
> por R$ 3.200-4.800.

**Problema:** sem fonte. É regra geral conhecida do setor mas o artigo
não cita ninguém.

**Opção A (preferida) — adicionar fonte:**
> Como referência prática, aluguel típico em Curitiba fica entre 0,4% e
> 0,6% do valor de venda ao mês — coerente com o que o
> [Quinto Andar Index](https://www.quintoandar.com.br/dados-do-mercado-imobiliario)
> e a [Pesquisa de Locação Secovi-PR](https://secovi-pr.com.br/) mostram
> pra apartamentos de 50-90m² em CWB. Apartamento de R$ 800 mil aluga
> por R$ 3.200-4.800.

**Opção B — suavizar:**
> Como referência prática de mercado, aluguel típico em Curitiba fica
> entre 0,4% e 0,6% do valor de venda ao mês — apartamento de R$ 800
> mil aluga por R$ 3.200-4.800.

**Recomendação:** opção A se conseguir validar números no Quinto Andar
Index/Secovi-PR; opção B se preferir não fazer pesquisa adicional agora.

---

### Mudança 5 — Bloco 114 ("Fontes consultadas")

**Texto atual:**
> DIEESE/CONAB-PR (); IBGE (, Censo 2022, IPCA-RM); ; ANEEL Res.
> 3.472/2025 e ; ; Prefeitura de Curitiba (, ); ; ; **FYMOOB CRM
> (snapshot 2026-04-24, 242 imóveis em 66 bairros).**

**Problema:** FYMOOB CRM aparece na mesma lista que DIEESE/IBGE/ANEEL,
sugerindo paridade de tier. Após as mudanças 1-3, o CRM **não é mais
fonte primária de número nenhum** — só observação complementar (e nem
isso, se eu tirar todos os trechos).

**Texto proposto:**
> **Fontes primárias** (Tier 1): [FipeZap mar/2026](https://www.fipe.org.br/pt-br/indices/fipezap/),
> [DIEESE/CONAB-PR](https://www.dieese.org.br/), [IBGE](https://www.ibge.gov.br/) (PNAD
> Contínua 3T/2025, Censo 2022, IPCA-RM), [Banco Central — Séries
> Temporais](https://www3.bcb.gov.br/sgspub/), [ANEEL Res.
> 3.472/2025](https://www.aneel.gov.br/), [Prefeitura de
> Curitiba](https://www.curitiba.pr.gov.br/), [SEFA-PR — IPVA Lei
> 21.951/2024](https://www.fazenda.pr.gov.br/), [URBS](https://www.urbs.curitiba.pr.gov.br/),
> [ANS](https://www.gov.br/ans/), [ANP — Síntese
> Semanal](https://www.gov.br/anp/).
>
> **Observação complementar:** estoque ativo acompanhado pela FYMOOB em
> abril/2026 (242 imóveis em 66 bairros) — usado para sentido prático
> de mercado, não como referência estatística.

**Justificativa:** alinha com o princípio editorial de toda a revisão.

---

## 4. Pontos a validar fora do escopo desta revisão

Itens que apareceram durante a auditoria mas **não vou tocar agora**
(seriam outras revisões):

1. Bloco 6 — "R$ 6.842/pessoa" é citação de "guia médio" — sem fonte mas
   também sem peso (é hipotético). OK manter.
2. Bloco 16, 25, 27, 35 — passagens narrativas com R$ X-Y (faixas
   amplas, não exatas). Estas funcionam como observação editorial,
   não como dado. Não precisam de fonte se não cravarem mediana.
3. Bloco 81 — "renda PR R$ 4.000 PNAD 3T/2025" — checar se o número
   exato é R$ 4.001, R$ 4.075 etc. **Pesquisa rápida no IBGE pode
   refinar.** Adicionar à backlog.
4. Bloco 110 — "Portão custa R$ 11.129/m²" — já tratado na mudança 3.

---

## 5. Próximos passos

1. **Você valida este doc com ChatGPT.** Especialmente:
   - Os números FipeZap propostos batem com o conhecimento dele do mercado CWB?
   - A redação dos trechos novos preserva o tom do artigo?
   - Algum claim deveria ser mais agressivo ou mais suavizado?

2. **Após validação, traduzo em script** `scripts/apply-custo-vida-revisions.mjs`
   no padrão dos anteriores:
   - Detecção idempotente via marker textual (re-rodadas não corrompem)
   - BLOCK_OVERRIDES com inline content (text + link + bold helpers)
   - Re-cálculo de `word_count` + `reading_time_min`
   - Update + revalidate `/blog/custo-de-vida-curitiba` + tag `blog`

3. **Depois deste, segue na fila de Sprint A:**
   - `mercado-imobiliario-curitiba-2026` (49,7% → 49,9% endividamento + marcar FYMOOB)
   - `quanto-custa-morar-batel-curitiba` (suavizar Condor Gourmet + Decreto 2668/2025)
   - `melhores-bairros-curitiba-2026` (Pequeno Príncipe — pediátrico exclusivo)
