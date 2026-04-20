# Dados Empíricos do Catálogo FYMOOB

> **Fonte:** Auditorias diretas na API Loft/Vista 18-20/04/2026.
> **Status:** Snapshot — atualizar quando catálogo crescer ou mudar significativamente.

---

## Volume geral

```
Total CRM: 1.479 imóveis (todos status)
Total ativos (ExibirNoSite=Sim): 236
Total no sitemap: 560 URLs (imóveis + landings + blog + institucional)
```

---

## Distribuição por cidade

Ativos com `ExibirNoSite=Sim`:

| Cidade | Imóveis | % |
|---|---|---|
| **Curitiba** | 219 | 93% |
| Araucária | 5 | 2% |
| São José dos Pinhais | 3 | 1% |
| Campo Largo | 2 | 1% |
| Colombo | 2 | 1% |
| São João do Triunfo | 1 | <1% |
| Fazenda Rio Grande | 1 | <1% |
| Piraquara | 1 | <1% |
| **Total** | **234** (amostra usada 5 páginas) | 100% |

**Observação:** concentração massiva em Curitiba. RMC (Região Metropolitana) é 7%. Isso justifica não investir agora em refactor de URL multi-cidade (`/imoveis/[cidade]/[bairro]`) — ver [docs/url-structure-multi-city.md](../url-structure-multi-city.md).

---

## Distribuição por bairro (top 30)

```
  24  Portão
  18  Mossunguê
  17  Cidade Industrial
  13  Água Verde
  11  Campo de Santana
   9  Bigorrilho
   9  Xaxim
   8  Tatuquara
   8  Campina do Siqueira
   7  Batel
   7  Campo Comprido
   7  Sítio Cercado
   6  Novo Mundo
   5  Centro
   5  Capão Raso
   4  Umbará
   4  Pinheirinho
   4  Fazendinha
   4  São Braz
   4  Santa Quitéria
   3  Vila Izabel
   3  Sitio Cercado     ← duplicata (grafia diferente)
   3  Boa Vista
   3  Boqueirão
   2  Cabral
   2  Seminário
   2  Bairro Alto
   2  Juvevê
   2  Vila David Antônio
   2  Tingui
```

**Total de bairros únicos:** 63

### Duplicatas por grafia

| Bairro | Problema |
|---|---|
| `Sitio Cercado` vs `Sítio Cercado` | Sem vs com acento — 7 + 3 imóveis separados |
| `Centro` | Existe em Curitiba **E** Araucária — desambiguação pelo `cidade` |

**Fix implementado:** `getAllBairros` agrega por slug + escolhe label canônico (mais frequente + mais diacríticos). Ver [src/services/loft.ts](../../src/services/loft.ts).

---

## Destaques (DestaqueWeb=Sim)

Auditoria 19/04:

```
Total marcados DestaqueWeb=Sim: 13
  7 não-lançamentos (alimentam seção "Imóveis em Destaque" da home)
  6 lançamentos (alimentam seção "Destaques de Lançamento")

Total marcados SuperDestaqueWeb=Sim: 13 (sobrepõem com DestaqueWeb)
  4 não-lançamentos
  
Total lançamentos (Lancamento=Sim): 80
```

### Lista dos 7 não-lançamentos destaque (pool de rotação da home)

```
AP00943  Apartamento  Campo Comprido    Venda  SUPER
69803405 Apartamento  Batel             Venda  SUPER
69804095 Sobrado      Santa Quitéria    Venda
69804752 Apartamento  Seminário         Venda  SUPER
69804925 Apartamento  Batel             Venda
69805524 Casa         Jardim Veneza     Venda
69805679 Casa         Santa Felicidade  Venda
```

**Recomendação pro Bruno:** marcar 20-25 imóveis (não-lançamentos) como Destaque Web pro carrossel da home ter rotação visível.

---

## Títulos problemáticos

Audit em 19/04/2026:

```
Títulos > 90 chars: 68 (29% do catálogo)
Títulos > 200 chars: 3
Títulos com ALL CAPS gritante: 4
Imóveis com finalidade detectada errada: 3 (já corrigido via fix de preço)
Imóveis dual (ambos preços > 0): 4 confirmados
```

### Casos críticos

| Código | Problema |
|---|---|
| `69804387` + `69804388` | Dois sobrados no Capão Raso — **título idêntico** com 237 chars (duplicate content) |
| `TE00116` | Terreno 168 chars — "em frente ao Centro de Educação Infantil Escritor Elias José" (info irrelevante) |
| `SA00031` | ALL CAPS "BIOOS HEALTH" + exclamação + inglês "Offices" |
| `TE00175` | Código zoneamento "ZR3.ZONA RESIDENCIAL 3 1.Y." no título — ninguém busca isso |
| `AP00296` | "Cabrall Hills" → deveria ser "Cabral Hills" (typo do Bruno) |
| `CA00514` | "terrreno" com 3 R's |

### Imóveis com dados inconsistentes (aguarda revisão Bruno)

| Código | Problema |
|---|---|
| `69804924` | Campina do Siqueira — ValorLocacao R$ 0,01 (erro digitação) |
| `69803584` | Cidade Industrial — Status=Venda mas tem ValorLocacao 2500 (é dual) |
| `69804378` | São Gabriel Colombo — Status=Aluguel mas ValorVenda R$145k (é dual) |
| `69805679` | Santa Felicidade — único imóvel deste bairro, aparece em buscas após fix autocomplete |

---

## Distribuição por Finalidade (após fix mapRawToProperty commit a03b889)

Amostra 5 páginas (234 imóveis):

```
Venda:          216 (92%)
Locação:         15 (6%)
Venda e Locação:  4 (1.7%) — imóveis dual detectados por precos
Sem preço:       —
```

**Dos 4 dual detectados:**
- `69803584` Cidade Industrial (V 540k + L 2500)
- `69804378` São Gabriel Colombo (V 145k + L 875)
- `69804924` Campina do Siqueira (V 1.1M + L 0.01 ← erro CRM)
- `AP01018` Portão (V 0 + L 1300 — incluso após últimos ajustes)

---

## Imagens

```
Imagens locais em /public/blog/: ~5 arquivos .webp
Imagens locais em /public/images/blog/: inconsistente (alguns posts apontam aqui)
Fotos dos imóveis: via CDN vistahost.com.br (https://cdn.vistahost.com.br/...)
```

**Inconsistência:** posts do blog usam `image: "/blog/..."` em alguns, `image: "/images/blog/..."` em outros. Fix pendente na migração pra Sanity.

---

## Lead flow

```
Volume: não rastreado formalmente (nenhum lead chegou ainda pelo site novo)
Formulário /contato → POST /api/lead → Vista API POST /lead → aparece no CRM
Fallback: WhatsApp link direto (não registra como lead)
Turnstile: ativo (anti-bot)
Rate limit: 5 tentativas / 15min por IP (Upstash Redis)
LGPD: política de privacidade linkada, consentimento explícito no form
```

**Pendente:** Bruno confirmar se leads estão chegando no CRM desde cutover.

---

## Métricas Vercel Analytics (20/04/2026 — últimos 7 dias)

```
Visitors: 57
Page Views: 543
Bounce Rate: 46%
Top referrer: google.com (14 visitas)
Mobile: 65%
Desktop: 35%
```

**Observações:**
- Tráfego 100% orgânico (sem ads ativos)
- 14 visitas do Google mas 0 cliques no GSC ainda — posição média 19 (página 2)
- Esperado crescimento orgânico conforme indexação sobe (D+14 → 50%, D+30 → 75%)

---

## Top queries no GSC (3 meses)

```
Total: 5 impressões, 0 cliques
- "residencial canto do uirapuru" (1 impressão)
- "liv in" (1 impressão)
- outras 3 impressões diluídas
```

**Interpretação:** site indexando, aparecendo em queries específicas de empreendimento. Posição média 19 → página 2 → sem cliques ainda. Normal em D+3.

---

## Performance (Vercel Speed Insights)

```
Score mobile: 99
FCP: 1.35s
LCP: 1.7s
CLS: 0.01
INP: 192ms
TTFB: 0.35s
```

**Observações:** Core Web Vitals excelente. Sessão de perf intensiva em 16-17/04 deu resultado.

---

## Crescimento esperado (D+0 → D+30)

| Métrica | D+3 atual | D+14 projetado | D+30 projetado |
|---|---|---|---|
| Páginas indexadas | 106 (19%) | 280 (50%) | 420 (75%) |
| Impressões/dia | ~2 | ~20-40 | ~80-150 |
| Cliques/dia | 0 | 2-5 | 10-20 |
| Posição média | 19 | 12-15 | 8-12 |
| Leads/mês | 0 | 1-3 | 3-8 |

Projeções conservadoras baseadas em [SEJ 892 migrações](https://www.searchenginejournal.com/study-how-long-should-seo-migration-take/492050/) e benchmark do baseline antigo (`fymoob.com`: 580 cliques/mês em regime).

---

## Próxima auditoria (agendada)

- **D+14 (01/05/2026):** atualizar contagem de indexação + checar se pillar pages entraram no índice
- **D+30 (17/05/2026):** consolidar métricas, preencher deltas baseline, avaliar se hora de backlinks externos
- **D+60 (16/06/2026):** plateau de indexação, análise de thin content em landings programáticas
