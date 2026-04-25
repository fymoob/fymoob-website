# Audit: Links 404 nos Blogs FYMOOB

**Data:** 2026-04-25
**Escopo:** 15 posts em `content/blog/*.mdx`
**Snapshot CRM:** `docs/research/snapshots/2026-04-25.json` (248 imóveis, 63 slugs únicos de bairro)
**Validação:** cruzamento estático com `generateStaticParams` de `src/app/imoveis/[bairro]/page.tsx`

---

## Sumário Executivo

| Métrica | Valor |
|---|---|
| Total de links internos extraídos | **214** |
| Links OK | **152** |
| Links **QUEBRADOS** (404 garantido) | **62** |
| Posts afetados | 6 de 15 |
| Posts **sem nenhum link quebrado** | 9 de 15 |

Concentração: 4 posts respondem por 60 dos 62 links quebrados:
- `preco-metro-quadrado-curitiba-bairro.mdx` → **24** links 404
- `melhores-bairros-curitiba-2026.mdx` → **25** links 404
- `melhores-bairros-familias-curitiba.mdx` → **7** links 404 (1 blog + 6 bairro)
- `ecoville-vs-bigorrilho-curitiba.mdx` → **1** link 404
- `quanto-custa-morar-batel-curitiba.mdx` → **1** link 404
- (`mercado-imobiliario-curitiba-2026.mdx` e demais → 0 quebras)

---

## Causa-Raiz: como bairros viram 404

`src/app/imoveis/[bairro]/page.tsx:29-33` aplica thin-content guard:
```ts
export async function generateStaticParams() {
  const bairros = await getAllBairros()
  return bairros.filter((b) => b.total >= 2).map((b) => ({ bairro: b.slug }))
}
```

Resultado: bairros com `<2` imóveis no CRM **não geram página** e retornam 404. Isso explica `/imoveis/merces` e `/imoveis/ecoville` (Final Verifier do Post 15 já tinha apontado) — ambos só têm **1** imóvel cada no snapshot.

Há duas categorias de quebra:
1. **`BROKEN_THIN`** — bairro existe no CRM, mas tem `count < 2`. Posts assumiram que toda menção vira link.
2. **`BROKEN_NOT_IN_CRM`** — bairro não aparece no CRM em nenhuma forma (ex: Ahú, Bacacheri, Bom Retiro, Cascatinha, Hugo Lange, Jardim Social, Prado Velho, Tarumã, Centro Cívico). FYMOOB não anuncia nenhum imóvel ali.

---

## ⚠️ LINKS QUEBRADOS DETECTADOS

### Bairros 404 — `BROKEN_THIN` (existe no CRM com 1 imóvel, mas página não é gerada)

| Post | Linha | Link | Anchor | CRM count |
|---|---|---|---|---|
| melhores-bairros-curitiba-2026.mdx | 34 | `/imoveis/santa-felicidade` | "Santa Felicidade" | 1 |
| melhores-bairros-curitiba-2026.mdx | 38 | `/imoveis/ecoville` | "Ecoville" | 1 |
| melhores-bairros-curitiba-2026.mdx | 68 | `/imoveis/ecoville` | "Ecoville" | 1 |
| melhores-bairros-curitiba-2026.mdx | 70 | `/imoveis/santa-felicidade` | "Santa Felicidade" | 1 |
| melhores-bairros-curitiba-2026.mdx | 80 | `/imoveis/alto-da-gloria` | "Alto da Glória" | 1 |
| melhores-bairros-curitiba-2026.mdx | 95 | `/imoveis/santa-felicidade` | "Santa Felicidade" | 1 |
| melhores-bairros-curitiba-2026.mdx | 136 | `/imoveis/ecoville` | "Ecoville" | 1 |
| melhores-bairros-curitiba-2026.mdx | 138 | `/imoveis/merces` | "Mercês" | 1 |
| melhores-bairros-curitiba-2026.mdx | 148 | `/imoveis/alto-da-gloria` | "Alto da Glória" | 1 |
| melhores-bairros-curitiba-2026.mdx | 152 | `/imoveis/santa-felicidade` | "Santa Felicidade" | 1 |
| melhores-bairros-curitiba-2026.mdx | 156 | `/imoveis/ecoville` | "Ecoville" | 1 |
| melhores-bairros-familias-curitiba.mdx | 49 | `/imoveis/santa-felicidade` | "Santa Felicidade" | 1 |
| melhores-bairros-familias-curitiba.mdx | 131 | `/imoveis/santa-felicidade` | "Santa Felicidade" | 1 |
| preco-metro-quadrado-curitiba-bairro.mdx | 31 | `/imoveis/alto-da-gloria` | "Alto da Glória" | 1 |
| preco-metro-quadrado-curitiba-bairro.mdx | 34 | `/imoveis/merces` | "Mercês" | 1 |
| preco-metro-quadrado-curitiba-bairro.mdx | 38 | `/imoveis/reboucas` | "Rebouças" | 1 |
| preco-metro-quadrado-curitiba-bairro.mdx | 40 | `/imoveis/ecoville` | "Ecoville" | 1 |
| preco-metro-quadrado-curitiba-bairro.mdx | 51 | `/imoveis/santa-felicidade` | "Santa Felicidade" | 1 |
| preco-metro-quadrado-curitiba-bairro.mdx | 130 | `/imoveis/santa-felicidade` | "Santa Felicidade (R$ 6.720, +3,8%)" | 1 |
| preco-metro-quadrado-curitiba-bairro.mdx | 142 | `/imoveis/alto-da-rua-xv` | "Alto da Rua XV" | 1 |
| preco-metro-quadrado-curitiba-bairro.mdx | 168 | `/imoveis/alto-da-gloria` | "Alto da Glória" | 1 |
| preco-metro-quadrado-curitiba-bairro.mdx | 176 | `/imoveis/ecoville` | "Ecoville" | 1 |

**Subtotal:** 22 links

### Bairros 404 — `BROKEN_NOT_IN_CRM` (bairro inexistente no catálogo FYMOOB)

| Post | Linha | Link | Anchor |
|---|---|---|---|
| ecoville-vs-bigorrilho-curitiba.mdx | 132 | `/imoveis/ahu` | "Ahú" |
| melhores-bairros-curitiba-2026.mdx | 19 | `/imoveis/ahu` | "Ahú" (dentro de "Omitted long matching line") |
| melhores-bairros-curitiba-2026.mdx | 29 | `/imoveis/ahu` | "Ahú" |
| melhores-bairros-curitiba-2026.mdx | 35 | `/imoveis/bacacheri` | "Bacacheri" |
| melhores-bairros-curitiba-2026.mdx | 46 | `/imoveis/ahu` | "Ahú" |
| melhores-bairros-curitiba-2026.mdx | 66 | `/imoveis/bacacheri` | "Bacacheri" |
| melhores-bairros-curitiba-2026.mdx | 94 | `/imoveis/jardim-social` | "Jardim Social" |
| melhores-bairros-curitiba-2026.mdx | 96 | `/imoveis/ahu` | "Ahú" |
| melhores-bairros-curitiba-2026.mdx | 104 | `/imoveis/prado-velho` | "Prado Velho" |
| melhores-bairros-curitiba-2026.mdx | 148 | `/imoveis/bacacheri` | "Bacacheri" |
| melhores-bairros-curitiba-2026.mdx | 152 | `/imoveis/cascatinha` | "Cascatinha" |
| melhores-bairros-curitiba-2026.mdx | 152 | `/imoveis/ahu` | "Ahú" |
| melhores-bairros-curitiba-2026.mdx | 156 | `/imoveis/bacacheri` | "Bacacheri" |
| melhores-bairros-curitiba-2026.mdx | 164 | `/imoveis/ahu` | "Ahú" |
| melhores-bairros-curitiba-2026.mdx | 164 | `/imoveis/bom-retiro` | "Bom Retiro" |
| melhores-bairros-familias-curitiba.mdx | 44 | `/imoveis/bacacheri` | "Bacacheri" |
| melhores-bairros-familias-curitiba.mdx | 45 | `/imoveis/ahu` | "Ahú" |
| melhores-bairros-familias-curitiba.mdx | 61 | `/imoveis/bacacheri` | "Bacacheri" |
| melhores-bairros-familias-curitiba.mdx | 81 | `/imoveis/ahu` | "Ahú" |
| preco-metro-quadrado-curitiba-bairro.mdx | 19 | `/imoveis/ahu` | "Ahú" |
| preco-metro-quadrado-curitiba-bairro.mdx | 29 | `/imoveis/ahu` | "Ahú" |
| preco-metro-quadrado-curitiba-bairro.mdx | 33 | `/imoveis/bom-retiro` | "Bom Retiro" |
| preco-metro-quadrado-curitiba-bairro.mdx | 35 | `/imoveis/centro-civico` | "Centro Cívico" |
| preco-metro-quadrado-curitiba-bairro.mdx | 39 | `/imoveis/hugo-lange` | "Hugo Lange" |
| preco-metro-quadrado-curitiba-bairro.mdx | 42 | `/imoveis/cascatinha` | "Cascatinha" |
| preco-metro-quadrado-curitiba-bairro.mdx | 45 | `/imoveis/bacacheri` | "Bacacheri" |
| preco-metro-quadrado-curitiba-bairro.mdx | 48 | `/imoveis/jardim-social` | "Jardim Social" |
| preco-metro-quadrado-curitiba-bairro.mdx | 52 | `/imoveis/taruma` | "Tarumã" |
| preco-metro-quadrado-curitiba-bairro.mdx | 94 | `/imoveis/ahu` | "Ahú" |
| preco-metro-quadrado-curitiba-bairro.mdx | 97 | `/imoveis/bom-retiro` | "Bom Retiro" |
| preco-metro-quadrado-curitiba-bairro.mdx | 110 | `/imoveis/bom-retiro` | "Bom Retiro (R$ 10.623, +9,1%)" |
| preco-metro-quadrado-curitiba-bairro.mdx | 118 | `/imoveis/cascatinha` | "Cascatinha (R$ 8.940, +5,5%)" |
| preco-metro-quadrado-curitiba-bairro.mdx | 122 | `/imoveis/bacacheri` | "Bacacheri (R$ 8.680, +5,1%)" |
| preco-metro-quadrado-curitiba-bairro.mdx | 140 | `/imoveis/prado-velho` | "Prado Velho" |
| preco-metro-quadrado-curitiba-bairro.mdx | 141 | `/imoveis/cascatinha` | "Cascatinha" |
| preco-metro-quadrado-curitiba-bairro.mdx | 164 | `/imoveis/taruma` | "Tarumã" |
| preco-metro-quadrado-curitiba-bairro.mdx | 167 | `/imoveis/ahu` | "Ahú" |
| preco-metro-quadrado-curitiba-bairro.mdx | 170 | `/imoveis/prado-velho` | "Prado Velho" |
| quanto-custa-morar-batel-curitiba.mdx | 165 | `/imoveis/ahu` | "Ahú" |

**Subtotal:** 39 links

Bairros mais reincidentes em `BROKEN_NOT_IN_CRM`:
- **Ahú** — 14 ocorrências (não há nenhum imóvel no snapshot 2026-04-25)
- **Bacacheri** — 6
- **Cascatinha** — 4
- **Bom Retiro** — 4
- **Prado Velho** — 3
- **Jardim Social** — 2
- **Tarumã** — 2
- **Centro Cívico** — 1
- **Hugo Lange** — 1

### Posts internos 404

| Post | Linha | Link | Anchor |
|---|---|---|---|
| melhores-bairros-familias-curitiba.mdx | 236 | `/blog/ecoville-vs-bigorrilho` | "Ecoville × Bigorrilho com filhos" |

**Subtotal:** 1 link

Causa: o arquivo real é `ecoville-vs-bigorrilho-curitiba.mdx` — falta o sufixo `-curitiba` no link. Existe link correto em outro post (`/blog/ecoville-vs-bigorrilho-curitiba` é citado em `imovel-planta-vs-pronto-curitiba.mdx:94`).

### Empreendimentos / imóveis individuais 404

Nenhum. Não foram encontrados links hardcoded para `/imovel/[slug]` ou `/empreendimento/[slug]` nos posts.

### Landings 404

Nenhum. O único link auxiliar (`/busca` em `como-financiar-minha-casa-minha-vida.mdx:129`) é válido.

### Links externos broken (sample)

Sample de 10 URLs externas críticas (verificadas via fetch):

| URL | Resultado |
|---|---|
| `https://www.fipe.org.br/pt-br/indices/fipezap/` | **403 Forbidden** — provavelmente WAF anti-bot, não 404 |
| `https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13786.htm` | Conexão fechada — provavelmente WAF, não 404 |
| `https://www.curitiba.pr.gov.br/conteudo/tabela-do-iptu/368` | **403 Forbidden** — provavelmente WAF, não 404 |
| `http://itbiguia.curitiba.pr.gov.br/` | **ECONNREFUSED** — serviço pode estar fora do ar (3 ocorrências em posts) |
| `https://ippuc.org.br/` | OK (renderiza header mínimo) |
| `https://portal.fgv.br/noticias/incc-m-2026` | OK (conteúdo ativo) |
| `https://www.gov.br/anp/.../levantamento-de-precos-de-combustiveis-...` | OK |
| `https://www.gov.br/aneel/pt-br/.../revisao-tarifaria-da-copel` | OK |
| `https://www.gov.br/ans/.../teto-de-6-06-...` | OK |
| `https://atos.cnj.jus.br/atos/detalhar/5243` | OK (Provimento CNJ 149/2023) |

**Atenção:** `http://itbiguia.curitiba.pr.gov.br/` deu **ECONNREFUSED** (3 ocorrências). Validar manualmente — se o serviço migrou, é uma quebra real de fonte.

Os 403 da Planalto/Fipe/Prefeitura CWB são, com alta probabilidade, bloqueio de bot — esses domínios são notoriamente restritivos. Recomendo validação manual em browser pra esses 3 antes de tratar como "OK".

---

## ✅ Bairros válidos no snapshot CRM (referência pra writers)

Estes 36 bairros têm página `/imoveis/[slug]` rodando (count ≥ 2 no snapshot 2026-04-25):

| Slug | Count | Label canônico |
|---|---|---|
| `/imoveis/agua-verde` | 13 | Água Verde |
| `/imoveis/alto-boqueirao` | 3 | Alto Boqueirão |
| `/imoveis/bairro-alto` | 2 | Bairro Alto |
| `/imoveis/batel` | 7 | Batel |
| `/imoveis/bigorrilho` | 9 | Bigorrilho |
| `/imoveis/boa-vista` | 3 | Boa Vista |
| `/imoveis/boqueirao` | 3 | Boqueirão |
| `/imoveis/cabral` | 2 | Cabral |
| `/imoveis/cajuru` | 2 | Cajuru |
| `/imoveis/campina-do-siqueira` | 8 | Campina do Siqueira |
| `/imoveis/campo-comprido` | 7 | Campo Comprido |
| `/imoveis/campo-de-santana` | 11 | Campo de Santana |
| `/imoveis/capao-da-imbuia` | 3 | Capão da Imbuia |
| `/imoveis/capao-raso` | 5 | Capão Raso |
| `/imoveis/capela-velha` | 2 | Capela Velha |
| `/imoveis/centro` | 7 | Centro |
| `/imoveis/cidade-industrial` | 18 | Cidade Industrial |
| `/imoveis/cristo-rei` | 2 | Cristo Rei |
| `/imoveis/fazendinha` | 4 | Fazendinha |
| `/imoveis/guaira` | 2 | Guaíra |
| `/imoveis/hauer` | 2 | Hauer |
| `/imoveis/juveve` | 2 | Juvevê |
| `/imoveis/mossungue` | 18 | Mossunguê |
| `/imoveis/novo-mundo` | 6 | Novo Mundo |
| `/imoveis/pinheirinho` | 4 | Pinheirinho |
| `/imoveis/portao` | 24 | Portão |
| `/imoveis/santa-quiteria` | 4 | Santa Quitéria |
| `/imoveis/sao-braz` | 4 | São Braz |
| `/imoveis/seminario` | 2 | Seminário |
| `/imoveis/sitio-cercado` | 14 | Sitio Cercado |
| `/imoveis/tatuquara` | 9 | Tatuquara |
| `/imoveis/tingui` | 2 | Tingui |
| `/imoveis/umbara` | 4 | Umbará |
| `/imoveis/vila-david-antonio` | 2 | Vila David Antônio |
| `/imoveis/vila-izabel` | 2 | Vila Izabel |
| `/imoveis/xaxim` | 9 | Xaxim |

### Bairros com 1 imóvel (NÃO LINKAR — vai 404)

`alto-da-gloria`, `alto-da-rua-xv`, `area-rural-de-fazenda-rio-grande`, `barreirinha`, `cachoeira`, `campina-das-pedras`, `cidade-jardim`, `costeira`, `ecoville`, `ganchinho`, `guatupe`, `jardim-veneza`, `lindoia`, `maracana`, `merces`, `nacoes`, `orleans`, `pilarzinho`, `povoado-do-boa-vista`, `reboucas`, `santa-candida`, `santa-felicidade`, `santa-terezinha`, `santo-antonio`, `sao-gabriel`, `uberaba`, `vista-alegre`.

### Bairros que NÃO existem no CRM (NÃO LINKAR jamais)

`ahu`, `bacacheri`, `bom-retiro`, `cascatinha`, `centro-civico`, `hugo-lange`, `jardim-social`, `prado-velho`, `taruma`. Estes bairros aparecem mencionados nos textos por importância editorial, mas **não há nenhum imóvel cadastrado no snapshot 2026-04-25** — link gera 404 garantido.

---

## 📋 Recomendações de Correção

### Estratégia macro

A causa raiz é uma decisão editorial: posts assumem "todo bairro mencionado vira link". Mas o site só renderiza páginas de bairro com ≥2 imóveis. Resultado: **62 links 404**.

Há 3 estratégias possíveis. Recomendo **Estratégia C (mista)**:

#### Estratégia A — Remover anchors quebrados (mais segura, menos SEO)
Substituir todos os links 404 por texto plano (remove o link, mantém a menção). Zero risco, mas perde linkagem interna.

#### Estratégia B — Trocar todos por `/busca?bairro=...` (medida-rápida, SEO médio)
Trocar `/imoveis/ahu` → `/busca?bairro=Ahú` etc. A página `/busca` já existe e renderiza qualquer query string sem 404. Garante que o usuário cai em algo útil; perde valor SEO da landing dedicada (que não existe pra esses bairros).

#### Estratégia C — Mista (recomendada) ⭐
- **`BROKEN_NOT_IN_CRM` (39 links):** trocar por **texto plano** (sem link). Bairros tipo Ahú/Bacacheri/Bom Retiro são citações editoriais (FipeZap, ranking de valorização) — não há imóvel pra mostrar e linkar pra `/busca` confunde o usuário ("clico em Ahú e não vejo Ahú"). Manter como menção textual.
- **`BROKEN_THIN` (22 links):** trocar por **`/busca?bairro=<Label>`**. Estes bairros estão no CRM, só faltam imóveis pra render. Link pra busca devolve resultados reais e mantém intenção do anchor. Quando bairro chegar a 2+ imóveis, sitemap absorve e vale repensar.
- **`/blog/ecoville-vs-bigorrilho` (1 link):** corrigir slug pra `/blog/ecoville-vs-bigorrilho-curitiba`.

#### Comando de correção sugerido (estratégia C)

```bash
# Por arquivo, manualmente. Exemplo padrão de regex pra cada caso:
# BROKEN_NOT_IN_CRM:
sed -i 's|\[Ahú\](/imoveis/ahu)|Ahú|g' content/blog/<post>.mdx
# BROKEN_THIN:
sed -i 's|\[Mercês\](/imoveis/merces)|[Mercês](/busca?bairro=Mercês)|g' content/blog/<post>.mdx
# Blog slug fix (1x):
sed -i 's|/blog/ecoville-vs-bigorrilho)|/blog/ecoville-vs-bigorrilho-curitiba)|g' content/blog/melhores-bairros-familias-curitiba.mdx
```

Preferível: Edit tool com revisão de cada anchor — texto pode precisar reescrever sentido (anchor `"Bom Retiro (R$ 10.623, +9,1%)"` é informativo; tirar link mantém o número).

### Tasks priorizadas

1. **Pri 1 (gera 404 em massa):** corrigir os 49 links em `preco-metro-quadrado-curitiba-bairro.mdx` (24) + `melhores-bairros-curitiba-2026.mdx` (25). Estes posts são tabelas-resumo com muito link — a correção é mecânica.
2. **Pri 2:** `melhores-bairros-familias-curitiba.mdx` (7 links incl. fix do slug do blog).
3. **Pri 3:** 2 links restantes (`ecoville-vs-bigorrilho-curitiba.mdx:132` e `quanto-custa-morar-batel-curitiba.mdx:165`, ambos `/imoveis/ahu` — substituir por texto plano).
4. **Pri 4 (validação manual):** confirmar status real de `http://itbiguia.curitiba.pr.gov.br/` (3 ocorrências, ECONNREFUSED — pode ter migrado).

### Mecanismo preventivo (sugestão)

Adicionar checagem CI:
- Script Node que lê todos os `content/blog/*.mdx`, extrai links `/imoveis/<slug>` e `/blog/<slug>`, e cruza com `getAllBairros()` (filtro `>=2`) + lista de arquivos blog. Falha o build se algum link 404 existir.
- Local sugerido: `scripts/validate-blog-links.mjs`, integrado em `npm run build` ou pre-commit hook.
- Já existe estrutura similar para smoke test (`scripts/smoke-test.mjs`) — pode reaproveitar.
