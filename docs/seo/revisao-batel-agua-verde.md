# Plano de revisão — `batel-vs-agua-verde-curitiba`

> Compilado em **2026-05-02**. Sprint B — terceiro artigo (após PMQ e
> Ecoville×Bigorrilho). Risco original 🟢 baixo (plano geral). Auditoria
> confirmou — só correções cirúrgicas + harmonização com cluster.
>
> **Validar com ChatGPT antes de aplicar.** Após validação, traduzir em
> script idempotente `scripts/apply-batel-agua-verde-revisions.mjs`.
>
> Padrão editorial: linguagem PT-BR limpa, sem jargões em inglês, sem
> palavras duplicadas, sem typos.

---

## 1. Por que este artigo é prioridade

O artigo é forte editorialmente: tese clara (Batel ganha em prestígio
e valorização nominal; Água Verde ganha em renda, liquidez e custo),
4 vereditos por perfil com contra-argumento honesto, comparação por
crime patrimonial com caveat já presente. Auditoria detectou só
ajustes:

### 1.1 Datas FipeZap "abril/2026" (vs "março/2026" do cluster)

O lead e a tabela 2 dizem "abril de 2026" / "FipeZap março/2026"
inconsistentemente. O cluster harmonizado (PMQ + 4 outros artigos da
Sprint A) usa **março/2026** porque o FipeZap publica mensalmente com
defasagem (em 02/05, o último índice disponível é mar/2026). Trocar
todas as menções FipeZap pra **março/2026**, manter "abril/2026"
apenas onde for observação FYMOOB.

### 1.2 Conflito sutil de rentabilidade Batel com cluster

Tabela 2 lista Batel ~2,0% a.a. — mesmo número do PMQ no agregado por
m². Está **tecnicamente correto** (R$ 29,90 × 12 ÷ R$ 17.924 = 2,0%).
Mas o cluster harmonizado usa a **dupla leitura**:
- Agregado por m²: ~2% a.a.
- Imóveis específicos (unidades menores ou bem posicionadas): 0,25%
  a 0,33% ao mês (~3% a 4% a.a.)

Adicionar nota de dupla leitura na tabela ou no parágrafo de
rentabilidade (block 31).

### 1.3 Claim absoluto "100% apartamento" no Batel (Block 7)

> "Nas captações recentes da FYMOOB, mais da metade dos imóveis do Batel
> tem área acima de 150m² — comportamento de alto padrão consolidado.
> **100% é apartamento.**"

Mesmo padrão dos outros artigos: trocar absoluto por "essencialmente
apartamento" (igual ao Bigorrilho do post Ecoville×Bigorrilho).

### 1.4 Conflito interno de wording sobre SESP-PR (blocks 46 + 49)

- Block 46: "**SESP-PR publica boletins por bairro.** Em H1/2025, Água
  Verde aparece no top 4 de crimes patrimoniais absolutos..."
- Block 49 (callout): "**SESP-PR não publica homicídios por bairro
  diretamente** — redação via iLove Curitiba e MySide agrega boletins."

Os dois blocks estão dizendo coisas diferentes — em parte porque um
fala de crime patrimonial e o outro de homicídios, mas o leitor que
lê os dois em sequência fica confuso. Reformular o block 46 pra ser
consistente: "via Radar Gazeta do Povo / agregação SESP-PR".

### 1.5 Jargão "casal DINK" em 2 blocos (19 + 54)

Mesmo padrão do `quanto-custa-batel` e `ecoville-vs-bigorrilho`
revisados. Trocar por "casal sem filhos com dupla renda".

### 1.6 Frontmatter inconsistente

- Title com caps: "Batel vs Água Verde em Curitiba: Qual Escolher em 2026"
- seo_meta_title: NULL
- seo_meta_description: NULL

Mesmo padrão dos outros artigos da Sprint A.

---

## 2. Sumário das mudanças

| # | Bloco | Tipo | Mudança | Severidade |
|---|---|---|---|---|
| 1 | – | frontmatter | Title sentence case + seo_meta_* preenchidos | Média |
| 2 | 0 | paragraph | Lead "abril/2026" → "março/2026" (FipeZap) | Alta |
| 3 | 2 | table | Manter números mas adicionar 5ª linha "Leitura agregada vs específica" pra rentabilidade | Média |
| 4 | 3 | paragraph | Nota da tabela: "Preços FipeZap março/2026" (já está) — adicionar caveat de tempo médio como observação editorial | Baixa |
| 5 | 7 | paragraph | "100% é apartamento" → "essencialmente apartamento" | Alta |
| 6 | 19 | paragraph | "casal DINK" → "casal sem filhos com dupla renda" | Média |
| 7 | 31 | bullet | Rentabilidade Água Verde 3% / Batel 2% — adicionar caveat de dupla leitura | Alta |
| 8 | 35 | paragraph | Airbnb "rentabilidade pode chegar a ~10% a.a." — suavizar (sem fonte oficial sazonalidade BR) | Média |
| 9 | 39 | bullet | "ironia clara: o guia antigo diz o contrário..." — suavizar tom editorial | Baixa |
| 10 | 46 | paragraph | "SESP-PR publica boletins por bairro" → wording consistente com block 49 | Alta |
| 11 | 54 | paragraph | "Casal DINK 40-55" → "Casal sem filhos com dupla renda 40-55" | Média |
| 12 | 56 | ctaBox | CTA principal — copy alinhado ao cluster (sem "rode a conta") | Baixa |
| 13 | 65 | paragraph | "alugar no Batel ~0,17% ao mês" — adicionar contexto da dupla leitura premium | Média |
| 14 | 76 | methodologyBox | Sources qualificados + treatment com caveat granularidade | Média |
| 15 | – | inserção opcional | Tabela inicial "Qual cabe no seu perfil?" antes da tabela 2 | Baixa (extra) |

15 itens. Aplicação ~25 min após validação ChatGPT.

---

## 3. Mudanças trecho a trecho

### Mudança 1 — Frontmatter

**Atual:**
- title: "Batel vs Água Verde em Curitiba: Qual Escolher em 2026"
- description: "Batel R$ 17.924/m² vs Água Verde R$ 12.178/m² (FipeZap 2026). Delta de R$ 685 mil. Ranking por perfil — família, jovem, investidor, aposentado."
- seo_meta_title: NULL
- seo_meta_description: NULL

**Proposto:**
- title: **"Batel vs Água Verde: qual bairro escolher em Curitiba em 2026"** (sentence case)
- description: manter (descrição funciona — "Delta de R$ 685 mil" é um cálculo, mas a description **pode** ter números — só o title que não pode pelo padrão do cluster)
- seo_meta_title: **"Batel ou Água Verde em 2026? Comparativo por perfil"**
- seo_meta_description: **"Batel ganha em prestígio e valorização; Água Verde ganha em renda e liquidez. Comparativo por perfil — família, jovem, investidor e aposentado."**

**Justificativa:** padronização de caps + meta tags preenchidas.

---

### Mudança 2 — Block 0 (lead)

**Atual:**
> O Batel continua sendo o bairro mais caro de Curitiba. Em **abril de
> 2026** o m² fechou em R$ 17.924 contra R$ 12.178 na Água Verde
> (FipeZap) — Batel custa 47% mais. Só que aí começa a inversão: Batel
> valorizou +6,5% em 12 meses, Água Verde +4,6% — diferença de só 1,9
> ponto. E na rentabilidade de aluguel, a Água Verde ganha de longe...

**Proposto:** trocar "abril de 2026" → "março/2026" (alinhar com cluster).

> O Batel continua sendo o bairro mais caro de Curitiba. Em **março/2026**,
> o m² fechou em R$ 17.924 contra R$ 12.178 na Água Verde (FipeZap) —
> Batel custa 47% mais. Só que aí começa a inversão: Batel valorizou
> +6,5% em 12 meses, Água Verde +4,6% — diferença de só 1,9 ponto. E
> na rentabilidade de aluguel, a Água Verde ganha de longe.

**Justificativa:** consistência com cluster harmonizado (PMQ usa
março/2026 como referência FipeZap).

---

### Mudança 3 — Block 2 (tabela "retrato em 4 números")

**Atual:**

|  | Batel | Água Verde | Delta |
|---|---|---|---|
| m² venda | R$ 17.924 | R$ 12.178 | +47% Batel |
| Valorização 12m | +6,5% | +4,6% | +1,9 p.p. Batel |
| Rentabilidade aluguel (a.a.) | **~2,0%** | ~3,0% | +49% Água Verde |
| Tempo médio pra vender | 6-9 meses (qualitativo) | 3-6 meses (qualitativo) | Água Verde gira mais rápido |

**Proposto:**

|  | Batel | Água Verde | Delta |
|---|---|---|---|
| m² venda | R$ 17.924 | R$ 12.178 | +47% Batel |
| Valorização 12m | +6,5% | +4,6% | +1,9 p.p. Batel |
| Rentabilidade aluguel agregada (a.a.) | **~2,0%** | **~3,0%** | +49% Água Verde |
| Tempo médio pra vender | 6-9 meses (observação FYMOOB) | 3-6 meses (observação FYMOOB) | Água Verde gira mais rápido |

E no parágrafo seguinte (block 3 — nota da tabela), reforçar:

> Preços FipeZap março/2026. Rentabilidade calculada como (aluguel
> médio × 12) ÷ preço médio m² via Secovi-PR + FipeZap; **leitura
> agregada por m². Em unidades específicas bem posicionadas para
> locação, a faixa de alto padrão pode subir para 0,25-0,33% ao mês
> (cerca de 3% a 4% ao ano)** — abaixo da média de Curitiba (4,74%
> a.a., FipeZap). Tempo médio é observação acompanhada pela FYMOOB nos
> últimos 12 meses; SESP-PR e Secovi não publicam tempo médio por
> bairro de forma padronizada.

**Justificativa:** dupla leitura agregado vs específico (mesmo padrão
do PMQ revisado) + marcar "tempo médio" como observação FYMOOB
explicitamente.

---

### Mudança 4 — Block 7 ("100% é apartamento")

**Atual:**
> Nas captações recentes da FYMOOB, mais da metade dos imóveis do Batel
> tem área acima de 150m² — comportamento de alto padrão consolidado.
> **100% é apartamento.** No Água Verde, esse percentual cai pra menos
> de um quarto, e um terço do estoque ainda é casa de rua.

**Proposto:**
> Nas captações recentes da FYMOOB, mais da metade dos imóveis do Batel
> tem área acima de 150m² — comportamento de alto padrão consolidado.
> O bairro é **essencialmente verticalizado**, com casa em condomínio
> ou casa de rua sendo presença marginal no estoque. Na Água Verde,
> esse percentual cai para menos de um quarto, e um terço do estoque
> ainda é casa de rua.

**Justificativa:** mesmo padrão de suavização que aplicamos no
ecoville-vs-bigorrilho (Bigorrilho "100% apartamento" → "essencialmente
verticalizado").

---

### Mudança 5 — Block 19 ("casal DINK")

**Atual** (heading da seção jovem):
> Pra jovem profissional solteiro ou **casal DINK**: Batel vence

**Proposto:**
> Pra jovem profissional solteiro ou **casal sem filhos com dupla
> renda**: Batel vence

**Justificativa:** mesmo padrão dos outros artigos.

---

### Mudança 6 — Block 31 (rentabilidade 49% maior)

**Atual:**
> **Rentabilidade 49% maior:** ~3,0% ao ano vs ~2,0% do Batel. Num
> imóvel de R$ 1 milhão, a diferença é ~R$ 10 mil por ano no bolso.

**Proposto:**
> **Rentabilidade visivelmente maior na leitura agregada:** ~3,0% ao
> ano (Água Verde) vs ~2,0% (Batel) por m² médio. Num imóvel de R$ 1
> milhão de Água Verde, a diferença para um imóvel equivalente em
> Batel é da ordem de R$ 10 mil por ano no bolso. Em unidades
> específicas (1Q ou 2Q bem posicionados), a faixa de alto padrão
> pode se aproximar de 0,25-0,33% ao mês — ainda assim, Água Verde
> tende a render mais que Batel pela diferença de preço de entrada.

**Justificativa:** mantém o ponto editorial (Água Verde rende mais)
mas alinha com a dupla leitura do PMQ + remove "49%" cravado.

---

### Mudança 7 — Block 35 (Airbnb 10%)

**Atual:**
> Contra-argumento honesto: pra investidor de Airbnb / curta temporada,
> Batel vence. Polo corporativo + vida noturna + turismo de negócios
> geram demanda a R$ 400-700/diária que Água Verde não tem.
> **Rentabilidade Airbnb no Batel pode chegar a ~10% ao ano**, mas exige
> operação ativa (check-in, limpeza, resolução de problema) — não é
> renda passiva.

**Proposto:**
> Contra-argumento honesto: para investidor de locação por temporada,
> Batel pode oferecer vantagem — polo corporativo + vida noturna +
> turismo de negócios geram demanda em diárias que a Água Verde não
> tem. A rentabilidade nesse modelo costuma ser sensivelmente maior
> que aluguel de longo prazo, mas exige operação ativa (check-in,
> limpeza, gestão de hóspedes) e validação caso a caso (ocupação,
> sazonalidade, regulamento do condomínio). Não há índice oficial
> público de ocupação por bairro em Curitiba.

**Justificativa:** suaviza o "~10% a.a." (sem fonte oficial) e
adiciona caveat de validação caso a caso. Mantém o ponto.

---

### Mudança 8 — Block 39 ("ironia clara")

**Atual:**
> Menor movimentação + menos ruído — **ironia clara: o guia antigo diz
> o contrário, mas a realidade 2026 com Batel em 5 obras simultâneas
> inverte.**

**Proposto:**
> Menor movimentação e menos ruído. Vale notar que, em guias mais
> antigos, o Batel era apresentado como o bairro "mais tranquilo" —
> mas a realidade de 2026, com 5 obras simultâneas no Batel, inverteu
> esse cenário em alguns trechos.

**Justificativa:** suaviza "ironia clara" (tom editorial).

---

### Mudança 9 — Block 46 (SESP-PR publica boletins)

**Atual:**
> **SESP-PR publica boletins por bairro.** Em H1/2025, Água Verde
> aparece no top 4 de crimes patrimoniais absolutos de Curitiba (1.895
> casos) — Batel fica fora do top 10. Leitura bruta: "Batel é mais
> seguro".

**Problema:** "SESP-PR publica boletins por bairro" conflita com o
callout do block 49 ("SESP-PR não publica homicídios por bairro
diretamente"). Conceitualmente, a SESP-PR publica algumas estatísticas
regionais via boletins agregados, mas a granularidade exata por bairro
varia por categoria de crime — e o leitor que lê os dois blocks em
sequência fica confuso.

**Proposto:**
> A [agregação consultada](https://www.gazetadopovo.com.br/parana/cidades/curitiba/seguranca/)
> (Radar Gazeta do Povo / SESP-PR, H1/2025) coloca Água Verde no top 4
> de crimes patrimoniais absolutos de Curitiba (1.895 casos) — Batel
> fica fora do top 10. Leitura bruta: "Batel é mais seguro".

**Justificativa:** consistência com block 49 (atribui à agregação, não
à SESP-PR diretamente como índice oficial publicado).

---

### Mudança 10 — Block 49 (callout SESP-PR) — manter, reforçar

O callout atual já tem o caveat correto. Manter:

> Ressalva crítica: SESP-PR não publica homicídios por bairro
> diretamente — redação via Radar Gazeta do Povo agrega boletins.
> Crime patrimonial absoluto aparece sem correção por densidade
> populacional ou comercial. Quem prioriza segurança deve olhar per
> capita e contexto, não número bruto.

(pequeno ajuste: "via iLove Curitiba e MySide" — vamos remover, já que
no block 46 reformulado citamos Radar Gazeta do Povo)

---

### Mudança 11 — Block 54 ("Casal DINK 40-55")

**Atual:**
> **Casal DINK 40-55** com orçamento R$ 1-1,5 milhão. Batel entrega
> endereço e vida social. Água Verde entrega tamanho (3 quartos com
> varanda gourmet) e tranquilidade. Depende 100% do que o casal
> valoriza — não dá pra decidir pelos dois.

**Proposto:**
> **Casal sem filhos com dupla renda, 40-55**, com orçamento R$ 1-1,5
> milhão. Batel entrega endereço e vida social. Água Verde entrega
> tamanho (3 quartos com varanda gourmet) e tranquilidade. Depende
> totalmente do que o casal valoriza — não dá para decidir pelos dois.

**Justificativa:** sem jargão + remove "100%" absoluto.

---

### Mudança 12 — Block 56 (CTA principal)

**Atual:**
- title: "Quer que a gente rode a conta pro seu caso específico?"
- description: "Informe sua faixa de orçamento e perfil (família, investidor, aposentado). A gente compara Batel, Água Verde e mais 2 bairros que fazem sentido pra você."
- label: "Falar com especialista"

**Proposto:**
- title: **"Quer comparar bairros para o seu perfil?"** (mesmo padrão melhores-bairros)
- description: **"A FYMOOB cruza orçamento, rotina, tipo de imóvel e potencial de valorização para indicar bairros que fazem sentido para você — não só Batel × Água Verde."**
- label: **"Comparar bairros"** (alinha com o cluster)

**Justificativa:** consistência com CTA do `melhores-bairros-curitiba`
revisado. Mesmo conceito, copy mais consultivo.

---

### Mudança 13 — Block 65 (alugar no Batel)

**Atual:**
> Vale mais a pena comprar no Batel ou alugar na Água Verde?
>
> Em 2026, alugar no Batel e comprar na Água Verde é racional pra quem
> não tem certeza de ficar 10+ anos. Aluguel no Batel **(~0,17% ao mês
> do valor do imóvel)** é barato em termos relativos; comprar na Água
> Verde rende aluguel ~3% ao ano. Pra quem vai morar 15+ anos, comprar
> no Batel ainda faz sentido pelo "aluguel não pago" + reserva de
> valor.

**Proposto:**
> Em 2026, alugar no Batel e comprar na Água Verde pode ser racional
> para quem não tem certeza de ficar 10+ anos. O aluguel no Batel
> tende a ficar próximo de **0,17% ao mês do valor do imóvel** na
> leitura agregada por m² (R$ 29,90/m²/mês ÷ R$ 17.924/m² = 1,67%
> ao ano) — barato em termos relativos. Comprar na Água Verde rende
> aluguel próximo de 3% ao ano. Para quem vai morar 15+ anos no Batel,
> comprar ainda faz sentido pelo "aluguel não pago" + reserva de
> valor — e em unidades menores e bem posicionadas, a faixa pode subir
> para 0,25-0,33% ao mês.

**Justificativa:** explicita que 0,17% é cálculo agregado por m² (não
universal); reforça a dupla leitura.

---

### Mudança 14 — Block 76 (methodologyBox)

**Atual props:**
```json
{
  "period": "Abril/2026",
  "sample": "2 bairros — Batel e Água Verde — em 12 eixos comparativos",
  "sources": "[\"FipeZap (FGV + Fipe + Zap)\", \"Secovi-PR\", \"SESP-PR (via Radar Gazeta do Povo)\", \"INEP (ENEM 2024)\", \"IPPUC\", \"Loft (variação preço 12m)\", \"FYMOOB CRM (composição de carteira)\"]",
  "treatment": "",
  "lastUpdate": "2026-04-24"
}
```

**Proposto:**
```json
{
  "period": "Março/2026 (FipeZap) + observação FYMOOB abril/2026",
  "sample": "2 bairros — Batel e Água Verde — em 12 eixos comparativos (preço, valorização, rentabilidade, tempo médio, tipologia, escola, hospital, transporte, comércio, vida noturna, custo, segurança)",
  "sources": "[\"FipeZap mar/2026 (FGV + Fipe + Zap) — preço m² por bairro\",\"Secovi-PR — Pesquisa de Locação CWB\",\"SESP-PR / Radar Gazeta do Povo — crimes patrimoniais (recorte agregado, sem correção por densidade)\",\"INEP — ENEM 2024\",\"IPPUC — definição oficial de bairros\",\"Loft — variação 12m por tipologia\",\"FYMOOB — observação complementar do estoque ativo\"]",
  "treatment": "Rentabilidade calculada como aluguel anual ÷ preço de venda na leitura agregada por m². Em unidades específicas (1Q ou 2Q bem posicionados), a faixa de alto padrão pode subir para 0,25-0,33% ao mês (cerca de 3% a 4% ao ano), abaixo da média de Curitiba (4,74% a.a., FipeZap). Tempo médio para vender é observação FYMOOB acompanhada nos últimos 12 meses — não há índice oficial publicado por bairro. CRM FYMOOB usado como observação complementar de campo, não índice estatístico.",
  "lastUpdate": "2026-05-02"
}
```

**Justificativa:** sources qualificados (datas explícitas, caveat
SESP-PR), treatment descreve metodologia + dupla leitura premium.

---

### Mudança 15 — Tabela inicial "Qual cabe no seu perfil?" (inserção opcional)

Sugestão de adicionar logo após o lead (block 0) e antes do heading
"O retrato em 4 números" (block 1) — para o leitor que chegou via
busca "Batel ou Água Verde" ter um atalho de leitura.

**Tabela proposta:**

| Perfil | Vence | Por quê (resumo) |
|---|---|---|
| Família com filhos pequenos | Água Verde | 3Q a R$ 1,0-1,5 mi (vs 1,5-2,5 mi no Batel) + BRT + hospitais |
| Jovem solteiro ou casal sem filhos | Batel | Vida noturna concentrada, gastronomia, studios novos a partir de R$ 450 mil |
| Investidor de aluguel | Água Verde | Rentabilidade ~3% a.a. + liquidez de locatário + 2 imóveis com mesmo capital |
| Aposentado / família madura | Água Verde | Comércio a pé, 2 hospitais no bairro, IPTU/condomínio menor |
| Investidor de curta temporada | Batel | Polo corporativo + vida noturna + turismo (operação ativa) |

**Justificativa:** mesmo padrão dos outros artigos revisados (PMQ,
melhores-bairros, quanto-custa-batel) que ganharam tabela inicial de
decisão rápida. Opcional — se ChatGPT achar que está redundante com
as 4 seções por perfil, descartamos.

---

## 4. Pontos a validar fora do escopo desta revisão

1. **Block 14 — "BRT direto (linha Santa Cândida-Pinheirinho)"**: bate
   com URBS oficial. OK.

2. **Block 15 — "Vita Água Verde e Hospital Pilar"**: hospitais
   confirmados.

3. **Block 17 — "5 lançamentos simultâneos no Batel (Porto Batel,
   Sublime, Grand Lodge, A. Andersen, Emiliano 724)"**: bate com outros
   artigos do cluster. OK.

4. **Block 18 — "4 escolas premium em 1,2 km do Batel"**: claim
   geográfico. OK manter.

5. **Block 22 — "Bispo Dom José tem Ernesto, Quintana, Durski, Bar do
   Zé, Fiado Wine Bar"**: nomes próprios. OK.

6. **Block 27 — "Sieg Arenna, abril/2026"**: nome de empreendimento +
   data específica. OK.

7. **Block 35 — "rede de contatos profissionais"** (block 25
   originalmente): OK.

8. **Block 42 — "condomínio R$ 800-1.400 vs R$ 1.500-2.500"**:
   observação editorial sem fonte direta. Plausível mas idealmente
   triangulado com Secovi-PR.

9. **Block 44 — "aposentado com orçamento alto padrão"**: OK.

10. **Block 47 — "1.895 casos crime patrimonial Água Verde H1/2025"**:
    número específico — vale conferir com Radar Gazeta do Povo
    direto, mas o caveat do block 49 já cobre a limitação metodológica.

---

## 5. Próximos passos

1. **Você valida este doc com ChatGPT.** Pontos especialmente
   importantes:
   - Dupla leitura rentabilidade Batel (~2% agregado vs 0,25-0,33%
     específico) — está claro pro leitor ou sobra confuso?
   - Tabela inicial "Qual cabe no seu perfil?" — entra ou descartamos?
   - O bloco 35 (Airbnb) — suavização tá no ponto certo, ou perde
     gancho comercial?
   - Wording de "100% apartamento" → "essencialmente verticalizado":
     já testado no Ecoville×Bigorrilho. Manter mesmo padrão?

2. **Após validação, traduzo em script**
   `scripts/apply-batel-agua-verde-revisions.mjs` no padrão idempotente
   dos anteriores.

3. **Próximos da fila Sprint B (5 artigos restantes):**
   - `apartamento-ou-casa-curitiba` (alta cobertura de fontes; 3 trechos CRM)
   - `imovel-planta-vs-pronto-curitiba` (extenso, 3.792 palavras)
   - 3 jurídicos: `itbi`, `documentos`, `checklist` (manutenção leve)

---

## 6. Fontes consultadas pra esta auditoria

- [FipeZap mar/2026 (via MySide)](https://myside.com.br/) — confirma
  Batel R$ 17.924, Água Verde R$ 12.178, +6,5% e +4,6% em 12m
- Cruzamento interno com `preco-metro-quadrado-curitiba-bairro`
  (revisado 02/05/26) — números batem com tabela 2 do PMQ
- Cruzamento interno com `quanto-custa-morar-batel-curitiba`
  (revisado 02/05/26) — rentabilidade Batel já em dupla leitura
- Cruzamento interno com `mercado-imobiliario-curitiba-2026`
  (revisado 02/05/26) — faixa premium harmonizada 0,25-0,33%/mês
