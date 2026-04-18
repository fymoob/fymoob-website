# URL Structure — Multi-Cidade (RMC)

> Decisão de arquitetura sobre como tratar bairros homônimos entre cidades
> (ex: "Centro" em Curitiba e Araucária). Pesquisa, trade-offs e plano.

**Data:** 2026-04-18
**Status:** Fase 1 aplicada (fix mínimo do autocomplete). Fase 2 condicional.
**Contexto:** Bruno reportou que ao cadastrar imóvel em Colombo, a cidade não
aparecia no autocomplete do filtro de localização. Investigação revelou bug
estrutural mais amplo: agregação de bairros homônimos entre cidades.

---

## 1. Problema

A função `getAllBairros()` em [src/services/loft.ts](../src/services/loft.ts)
agrupa imóveis pela chave `bairro` (sem considerar cidade). Quando o mesmo
nome de bairro existe em múltiplas cidades:

```ts
const key = p.bairro  // ex: "Centro" → uma única chave
// ...
cidade: topCidade  // atribui só a cidade com mais imóveis
```

**Efeito observado (catálogo atual, abril/2026):**
- 234 imóveis total, 8 cidades (Curitiba + 7 da RMC)
- "Centro" existe em Curitiba (~30 imóveis) e Araucária (1 imóvel) — ambos
  agregam no mesmo entry, cidade marcada como "Curitiba"
- Araucária some do autocomplete de cidades porque o único bairro que tem
  ("Centro") teve topCidade = Curitiba

Quando o usuário digita "Ara" no filtro, **Araucária não aparece** mesmo
existindo imóveis ativos lá.

---

## 2. Pesquisa de padrões de mercado

### Zap Imóveis
```
/venda/imoveis/rj+rio-de-janeiro/                 ← estado+cidade
/venda/apartamentos/rj+rio-de-janeiro+zona-sul    ← estado+cidade+bairro
```
**Bairro nunca aparece sozinho na URL.** Sempre prefixado por `estado+cidade`,
separados por `+`. Disambigua bairros homônimos naturalmente.

### Viva Real
```
/venda/parana/curitiba/   ← hierárquico com /
```
Mesma filosofia — hierarquia estado→cidade→bairro, sem exceções.

### Documentação Grupo OLX (feed spec)
Elemento `Zone` existe **exatamente** para disambiguação quando há bairros
homônimos em zonas distintas. Padrão assumido pela integração com Google
Maps e Correios. [Fonte](https://developers.grupozap.com/feeds/zap/elements/imovel/).

### Consenso guias SEO 2025
- URL hierárquica: `state → city → neighborhood`
- Cada nível vira página própria com conteúdo único
- Duplicate content entre "Centro de X" e "Centro de Y" = penalização Google
- Fontes:
  - [Backlinko — Programmatic SEO](https://backlinko.com/programmatic-seo)
  - [Backlinko — Multi-Location SEO](https://backlinko.com/multi-location-seo)
  - [Direction.com — Site Architecture](https://direction.com/site-architecture-and-url-structure/)
  - [Outliant — Multi-location URL structure](https://www.outliant.com/insights/structuring-urls-for-optimal-multi-location-seo)

---

## 3. Arquitetura atual do FYMOOB

```
/imoveis/[bairro]            ← só bairro, sem cidade
/imoveis/[bairro]/[tipo]     ← bairro + tipo
/apartamentos-curitiba       ← cidade hardcoded
```

**Premissa implícita:** todos os imóveis são de Curitiba. Válida quando o
CRM tinha 100% Curitiba; quebra à medida que Bruno capta na RMC.

---

## 4. Opções avaliadas

### Opção A — Fix mínimo no autocomplete (aplicada)
Nova função `getAllBairrosByCidade()` que usa chave composta `${cidade}|${bairro}`.
Usada **apenas** pelo autocomplete da busca (home + busca). Rotas e sitemap
continuam usando `getAllBairros()` inalterada.

- ✅ Autocomplete passa a mostrar todas as cidades
- ✅ Zero risco de quebrar URLs indexadas
- ❌ URL `/imoveis/centro` continua mesclando Curitiba+Araucária
- ❌ Não alinha com padrão Zap/Viva Real

**Escopo:** 1 função nova, 2 callers ajustados. Commit ~56 linhas.

### Opção B — Refactor proper: `/imoveis/[cidade]/[bairro]`
Reestruturar rotas para hierarquia cidade→bairro, alinhada com Zap/Viva Real.

- ✅ SEO correto (cada "Centro" é página única)
- ✅ Escala com qualquer cidade futura
- ❌ Quebra 65 URLs de bairro já indexadas — exige 301s
- ❌ Requer sitemap regen + updates em 15 arquivos
- ❌ ~4-6h dev + 1-2 semanas monitorando GSC pra confirmar redirects

### Opção C — Híbrido (Curitiba default, demais cidades em subpath)
- `/imoveis/batel` → Curitiba-Batel (legacy, continua)
- `/imoveis/araucaria/centro` → Araucária-Centro (novo subpath)
- Redirect de `/imoveis/centro` → `/imoveis/curitiba/centro` se colisão

Complexo de manter, roteamento condicional.

---

## 5. Decisão

**Fase 1 (imediato):** Opção A aplicada.
**Fase 2 (condicional):** Opção B quando atingir **um destes gatilhos**:

1. **Volume:** imóveis fora de Curitiba > 15% do catálogo (hoje = 6%)
2. **Estratégia:** Bruno decidir captação ativa na RMC como prioridade de
   negócio (não só oportunidade avulsa)
3. **Colisão real de SEO:** GSC sinalizar impressões em queries como
   "imóveis centro araucária" sem CTR porque a URL `/imoveis/centro` só
   fala de Curitiba

Antes de qualquer gatilho, Opção A resolve o problema reportado (autocomplete)
e os 6% fora de Curitiba não justificam refactor de URL.

**Por que não Opção B agora:**
- Risco (65 URLs com 301) > benefício (15 imóveis de 8 cidades)
- Bruno ainda não decidiu estratégia RMC vs só Curitiba
- Melhor fazer B **uma vez só** e bem feito, do que prematuramente sem clareza

**Quando B for necessário, ordem de execução:**
1. Definir URL schema final (`/imoveis/[cidade]/[bairro]` provável)
2. Escrever redirects em `next.config.ts` (/imoveis/[bairro] → /imoveis/curitiba/[bairro])
3. Atualizar 15 callers de `getAllBairros()`
4. Regenerar `sitemap.ts` com URLs novas + anotar hreflang se aplicável
5. Submeter sitemap atualizado no GSC
6. Monitorar Coverage + Change of Address (D+14 típico pra consolidação)

---

## 6. Evidências do problema (dados reais da API em 2026-04-18)

Sample de 234 imóveis com `ExibirNoSite=Sim`:

```
Cidades (8):
  219  Curitiba
    5  Araucária
    3  São José dos Pinhais
    2  Campo Largo
    2  Colombo
    1  São João do Triunfo
    1  Fazenda Rio Grande
    1  Piraquara

Bairros homônimos entre cidades (1):
  Centro: Curitiba, Araucária
```

Se Araucária não tivesse nenhum bairro único, sumiria totalmente do
autocomplete apesar dos 5 imóveis ativos. No momento ela está no limite
(só tem "Centro" em comum com Curitiba na amostra).
