# Revisão — `ecoville-vs-bigorrilho-curitiba`

> Aplicado em **2026-05-02** via `scripts/apply-ecoville-bigorrilho-revisions.mjs`.
> Risco original 🟢 baixo (plano geral); auditoria confirmou — só
> correções cirúrgicas. Doc registrado pós-fato.

---

## 1. Diagnóstico

O artigo já era forte editorialmente: tese central honesta ("Ecoville
tem 3 mercados, Bigorrilho tem 1") + 4 vereditos por perfil + caveat
explícito sobre limitação do FipeZap. Auditoria detectou só ajustes:

### 1.1 Conflito sutil com PMQ revisado

O PMQ (revisado mais cedo em 02/05) usa "Mossunguê (Ecoville) ~R$
14.062" via intermediárias. Este post usa 3 números diferentes pro
Ecoville (R$ 9.430 / 16.863 / 16.800-25.000). Adicionar nota
explicando que o R$ 14.062 do PMQ é **agregado das 3 tipologias** —
sem invalidar a tese do post.

### 1.2 Rentabilidade Bigorrilho fora do cluster harmonizado

Block 30: "Bigorrilho ~2,80% a.a." (Secovi-PR). Cluster harmonizado
(mercado, batel, melhores, PMQ) usa **0,25-0,33%/mês = 3-4% a.a.**
para premium saturado. Trocar pra alinhar.

### 1.3 Mossunguê SESP-PR sem caveat (blocks 13 + 69)

Mesmo padrão dos outros artigos do cluster — adicionar caveat sobre
SESP-PR não publicar granular por bairro de forma padronizada.

### 1.4 "casal DINK" (jargão em inglês)

3 ocorrências (blocks 16 e 56). Trocar por "casal sem filhos com
dupla renda" (mesmo padrão do `quanto-custa-batel`).

### 1.5 Frase com "Armadilha real" (block 51)

Tom levemente provocativo. Trocar por "Erro frequente" (suavização
editorial — mesmo padrão do `melhores-bairros` revisado).

### 1.6 Claim Airbnb sem fonte (block 36)

"Pra investidor Airbnb, Ecoville vence" — claim absoluto sem dado.
Suavizar para observação editorial.

### 1.7 Frontmatter

- title com caps inconsistente
- seo_meta_title = NULL
- seo_meta_description = NULL

---

## 2. Mudanças aplicadas

| # | Bloco | Mudança |
|---|---|---|
| A | – | title sentence case + seo_meta_* preenchidos |
| B | 0 | Lead alinhado com PMQ (Mossunguê R$ 14.062 via intermediárias mencionado) |
| C | 3 | Nota da tabela com caveat de granularidade FipeZap |
| D | 13 | Mossunguê segurança — caveat SESP-PR |
| E | 16 | "casal DINK" → "casal sem filhos com dupla renda" |
| F | 30 | Rentabilidade Bigorrilho 2,80% → 0,25-0,33%/mês (harmonização cluster) |
| G | 36 | Airbnb claim suavizado |
| H | 51 | "Armadilha real" → "Erro frequente" |
| I | 56 | "Casal DINK" → "Casal sem filhos com dupla renda" |
| J | – | "FipeZap, abril/2026" → "FipeZap mar/2026" (datas) |
| K | 69 | FAQ "Ecoville é seguro?" — caveat SESP-PR |
| L | 82 | methodologyBox — sources qualificados + treatment explicando granularidade |

13 mudanças aplicadas. Word count: 2.075 → 2.579 (+24%).

---

## 3. Verificação pós-aplicação

- ✅ Zero "casal DINK" no body
- ✅ Zero "rentabilidade ~2,80%" no body
- ✅ Zero "Armadilha real" no body
- ✅ Title sentence case
- ✅ seo_meta_title + seo_meta_description preenchidos
- ✅ methodologyBox atualizado com lastUpdate 2026-05-02

---

## 4. Pontos fora do escopo

1. Block 25 — "Smart Fit Premium" — nome de marca, OK manter.
2. Block 36 — "Airbnb" — nome de marca, OK manter (suavizado o claim em volta).
3. Block 50 — "Cena de classe média alta curitibana" — OK manter (descritivo).
4. Block 60 — "Senior Index 2024" — já vem com caveat ("não é dado 2026"). OK.
5. Block 67 — "Ecoville é nome comercial sobre Mossunguê" — explicação correta IPPUC.

---

## 5. Status do cluster pós-revisão

8 artigos revisados:

| Artigo | Status |
|---|---|
| `melhores-bairros-familias-curitiba` | ✅ |
| `financiamento-caixa-itau-bradesco-comparativo` | ✅ |
| `custo-de-vida-curitiba` | ✅ |
| `mercado-imobiliario-curitiba-2026` | ✅ |
| `quanto-custa-morar-batel-curitiba` | ✅ |
| `melhores-bairros-curitiba-2026` | ✅ |
| `preco-metro-quadrado-curitiba-bairro` | ✅ |
| `ecoville-vs-bigorrilho-curitiba` | ✅ (este) |

**Restantes (6 artigos 🟢 baixo):**
- `apartamento-ou-casa-curitiba`
- `batel-vs-agua-verde-curitiba`
- `imovel-planta-vs-pronto-curitiba`
- `itbi-curitiba-valor-como-pagar` (jurídico, manutenção leve)
- `documentos-comprar-imovel-curitiba` (jurídico, manutenção leve)
- `checklist-compra-imovel` (manutenção leve)
