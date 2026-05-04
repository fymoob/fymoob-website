# Conteudo SEO — Fontes confiaveis e principios editoriais

> Regras pra escrever ou revisar qualquer artigo do blog. **Validado 02/05/2026**
> apos revisao dos artigos de financiamento-bancos e melhores-bairros-familias.
> Migrado do CLAUDE.md em 2026-05-04 (CLAUDE.md fica com 1-line pointer).

## Principios obrigatorios

1. **CRM FYMOOB ≠ fonte estatistica primaria.** Pode citar como observacao
   complementar de mercado ("Como observacao complementar, o estoque
   acompanhado pela FYMOOB em abril/2026..."), nunca como autoridade
   estatistica com `n=X` e mediana exata. Amostra interna e sempre pequena.

2. **FipeZap nao tem tabela publica bairro-a-bairro.** O indice oficial Fipe e
   agregado por capital. Quando o post usa preco por bairro "do FipeZap", o
   dado vem de **fontes intermediarias** (MySide, BemBrasil, Portas, Loft).
   Wording correto: "referencia baseada em FipeZap/MySide" ou "levantamento
   FipeZap publicado por [intermediaria]".

3. **Datas explicitas em todo dado dinamico.** "FipeZap mar/2026", nao "FipeZap".

4. **Title sem numeros especificos** (regra do GSC). Number-driven hook so na
   description. Title matcha intent de busca, nao preview do conteudo.

5. **Claims absolutos exigem caveat.** "Zero homicidios", "unico banco", "top
   1", "100%" — usar linguagem blindada citando a limitacao da fonte.

6. **Comparativos descrevem a comparacao**, nao atribuem posicao absoluta.
   "Nas taxas que comparamos em abril/2026, BRB aparece como 2ª menor" >
   "BRB virou #2 do ranking nacional".

7. **Tabelas por perfil de leitor logo no inicio.** Decisao pratica > listagem
   tecnica. Pra `melhores-bairros-familias`: tabela "perfil familia × melhor
   bairro × alternativas" antes do ranking detalhado.

8. **Tom profissional > tom "internet".** "Pontos de atencao" > "pegadinhas";
   "nem sempre aparece" > "todo banco esconde"; "orientacao objetiva" >
   "sem enrolacao".

## Hierarquia de fontes

**Tier 1 — Oficiais (sempre preferir):**
Banco Central, IBGE, STJ/STF/TJ-PR, ANEEL, ANP, ANS, SESA-PR, SESP-PR, INEP,
IPPUC, IPARDES, Prefeitura de Curitiba, Camara Municipal CWB, SEFA-PR, URBS.

**Tier 2 — Setor confiavel:**
Caixa/Itau/BB/BRB sites oficiais, Abrainc, Abecip, ADEMI-PR, Sinduscon-PR,
Secovi-PR, FGV/IBRE (INCC-DI), DIEESE, IPEA, Portal Loft, Quinto Andar Index.

**Tier 3 — Midia editorial solida:**
Gazeta do Povo, Tribuna do Parana, Bem Parana, Conjur, Migalhas, JusBrasil,
Portas, BemBrasil Imoveis (compiladores Loft).

**Tier 4 — Compiladores leves:**
MySide, Larya, SpImovel, Apto.vc, iLove Curitiba, Senior Index.

**Tier 5 — Colaborativo (so cor, nunca ancorar):**
Numbeo, Expatistan, ImovelWeb (busca).

## Quando uma frase merece revisao antes de publicar

Frase passa por revisao se atender qualquer criterio:
1. Tem numero especifico (R$ X, X%, `n=X`) → exige fonte Tier 1-3.
2. Tem claim absoluto (top 1, unico, zero, 100%) → exige fonte direta + caveat.
3. Cita FYMOOB CRM como autoridade → reformular como "observacao complementar".
4. Compara marcas/players sem qualifier → descrever a comparacao.

Detalhamento completo em [article-revision-plan-2026-05-02.md](article-revision-plan-2026-05-02.md).

## Vocabulario padronizado do cluster (2ª rodada — 03/05/2026)

Apos revisao completa dos 15 artigos (~526 correcoes editoriais), substituicoes
obrigatorias em texto corrido (tabelas curtas e labels podem manter forma curta):

- `pra/pro/pras` → `para/para o/para as`
- `apto/aptos` → `apartamento/apartamentos`
- `studio` → `estudio`
- `CWB` → `Curitiba` (manter em label de tabela)
- `DINK` → `casal sem filhos com dupla renda`
- `DNA do bairro / DNAs incompativeis` → `perfil predominante / propostas de moradia diferentes`
- `ticket medio` → `valor medio`
- `ROI` → `rentabilidade bruta` (manter em contexto tecnico de financas)
- `due diligence` → `analise documental` (1ª ocorrencia; depois pode manter)
- `snapshot` → `recorte`
- `indoor` → `em ambiente fechado`
- `Trade-offs reais` → `Contrapartidas reais`
- `h-pico` → `horario de pico`
- `3D/2V` em texto corrido → `3 dormitorios e 2 vagas` (manter sigla em tabela)
- `top` (escola top, educacao top) → `de alto desempenho / de alto padrao`
- `red flags` → `pontos de atencao`

## Hardening juridico — formulacoes obrigatorias (artigos juridico-processuais)

**Tema 1113 / STJ (ITBI):**
- ❌ "STJ mandou cobrar sobre o valor da escritura"
- ✅ "No Tema 1113, o STJ definiu que a base de calculo do ITBI e o valor do imovel transmitido em condicoes normais de mercado. O valor declarado pelo contribuinte tem presuncao de compatibilidade. A base do IPTU nao pode ser usada como piso automatico."
- **Caveat anti-subdeclaracao obrigatorio.**

**Lei 13.786/2018 (Distrato):**
- ❌ "Construtora pode atrasar 180 dias sem multa"
- ✅ "Contratos podem prever clausula de tolerancia de ate 180 dias corridos. Quando essa clausula esta prevista de forma clara, a entrega dentro da tolerancia nao gera, por si so, resolucao do contrato ou penalidade."

**Divida condominial propter rem (art. 1.345 CC):**
- ❌ "A divida passa pra voce automaticamente"
- ✅ "Esses debitos podem acompanhar o imovel e gerar cobranca contra o adquirente. Exigir declaracao de quitacao."
- No lead: traduzir `(propter rem)` para `(que acompanha o imovel — nao fica com o vendedor)`.

**Escritura publica (art. 108 CC):**
- ❌ "Imovel acima de R$ 35 mil exige escritura publica (Lei 7.433/1985)"
- ✅ "Negocios imobiliarios de valor superior a 30 salarios minimos exigem escritura publica, salvo excecoes legais, conforme o art. 108 do Codigo Civil"

**SESP-PR / seguranca por bairro:**
- ❌ "Bairro X e o mais seguro" / "Zero homicidios em 2025"
- ✅ "Na agregacao consultada para jan-set/2025 (SESP-PR via Radar Gazeta do Povo / iLove Curitiba), nao aparecem homicidios letais reportados. Como esse recorte por bairro nao e publicado de forma padronizada, leitura como indicador, nao garantia."

**INCC — DI vs M:**
INCC-DI e INCC-M sao indices diferentes da familia INCC (FGV). Mar/2026:
INCC-DI 5,86% acumulado em 12m; INCC-M abr/2026 6,28%. Quando citar,
**explicar a diferenca** ou marcar qual esta em uso.

## Workflow de revisao idempotente (validado em 15 artigos)

Para revisao em batch de artigos no Supabase:

1. **Inspecionar:** `scripts/inspect-<slug>.mjs` le do Supabase, dump em `tmp-<slug>-current.json` (gitignored)
2. **Apply script:** `scripts/apply-<slug>-rev2-revisions.mjs` com `walkAndReplace` + markers idempotentes + flag `--dry-run`
3. **Smoke obrigatorio:** dry-run → revisar lista → apply real → dry-run de novo (deve dar `Nada pra mudar`)
4. **Cleanup:** `rm tmp-*.json scripts/inspect-*.mjs`
5. **Commit + push** com message detalhada por bloco
6. Bugs tipicos documentados em memoria (`feedback_idempotent_script_bugs.md`)
