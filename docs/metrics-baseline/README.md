# Metrics Baseline — fymoob.com → fymoob.com.br

> Snapshot das métricas do site antigo (`fymoob.com` na plataforma Atomicat/Loft) **antes do cutover**.
> Usado pra comparar "antes vs depois" em apresentações pro Bruno ao longo do tempo.

**Data do cutover do `.com.br`:** 2026-04-17
**Data do cutover do `.com` (redirect 308):** pendente (planejado pra 2026-04-17/18)

---

## ⚠️ Janela crítica de retenção de dados

Após o cutover, os dados históricos ficam disponíveis por **tempo limitado**:

| Fonte | Retenção | Última data possível |
|---|---|---|
| GSC Performance | 16 meses rolling | ~Agosto/2027 |
| GSC Coverage snapshot | Atual apenas | Perdido após refresh |
| GA4 free tier | 14 meses (50 extensíveis) | ~Junho/2027 |
| Speed Insights (Vercel) | 30 dias | — |
| Bing Webmaster | ~6 meses | — |

**Por isso tiramos screenshots AGORA** — snapshots imutáveis pra ter comparação em qualquer momento futuro.

---

## Checklist de captura (pré-cutover do .com)

### Capturar imagens em `docs/metrics-baseline/screenshots/`:

- [ ] **01-gsc-indexacao-paginas.png** — GSC propriedade `fymoob.com` → Indexação → Páginas. Tela com `92 indexadas / 291 não indexadas` + tabela de motivos
- [ ] **02-gsc-desempenho-paginas-3m.png** — GSC → Desempenho > Páginas (filtro 3 meses). Top 10 páginas com cliques/impressões
- [ ] **03-gsc-desempenho-consultas-3m.png** — GSC → Desempenho > Consultas (3 meses). Top queries que geram tráfego
- [ ] **04-google-site-search.png** — Google: `site:fymoob.com` + screenshot da tela mostrando "Sobre X resultados"
- [ ] **05-gsc-core-web-vitals.png** — GSC → Experiência > Core Web Vitals (se tiver dados)
- [ ] **06-gsc-https.png** — GSC → Experiência > HTTPS (status)
- [ ] **07-bing-site-search.png** — Bing: `site:fymoob.com` (pra comparar Bing vs Google depois)

### Exports CSV (botão "Exportar" topo direito de cada report):

- [ ] **desempenho-paginas-3m.csv** — todas as 122 páginas únicas
- [ ] **desempenho-consultas-3m.csv** — todas as queries + cliques + impressões + posição média
- [ ] **desempenho-paises-3m.csv** — distribuição geográfica
- [ ] **desempenho-dispositivos-3m.csv** — desktop vs mobile

### Outros dados pra anotar num arquivo `baseline-fymoob-com.md`:

- [ ] Google `site:fymoob.com` → quantidade total de resultados
- [ ] URL do site antigo (`https://fymoob.com`) → HTML salvo via `curl https://fymoob.com > baseline-home-before.html`
- [ ] Screenshot visual da home do site antigo
- [ ] Bing `site:fymoob.com` → quantidade total

---

## Métricas-chave já coletadas (2026-04-17)

Dados extraídos do GSC antes do cutover:

| Métrica | Valor |
|---|---|
| Páginas indexadas | 92 |
| Páginas descobertas não indexadas | 291 |
| Páginas com impressões (3m) | 122 |
| Cliques totais na home (3m) | 580 |
| Impressões totais na home (3m) | 1.747 |
| Cobertura CRM (indexadas / total ativo) | ~5% (70 imóveis indexados / 1.479 no CRM) |
| Top query types | Home > Busca > Contato > Sobre > Imóveis individuais |

### Motivos de não-indexação (das 291 não indexadas)

| Motivo | Páginas |
|---|---|
| Excluída pela tag "noindex" | 59 |
| Cópia sem página canônica | 18 |
| Página com redirecionamento | 16 |
| Não encontrado (404) | 10 |
| Bloqueada pelo robots.txt | 3 |
| Erro soft 404 | 2 |

### Problemas SEO identificados

1. **Query strings indexadas** — `/busca?finalidade=Aluguel&order=menor-preco`, `/busca?tipo=Casa&ordenar=` (URLs dinâmicas poluindo índice)
2. **Zero landing pages estratégicas** — nenhuma URL pra bairros, tipos, combinações, faixas de preço
3. **Duplicate content** — 18 páginas não indexadas por falta de canonical
4. **Soft 404s** — páginas que retornam 200 mas conteúdo vazio
5. **Imóveis deletados no CRM** ainda no índice (10 URLs 404)

### Insights extraídos dos CSVs (análise 2026-04-17)

**Padrão de tráfego — 99% de descoberta de MARCA, 0% de LONG-TAIL:**

| Query | Cliques | % do total | Posição |
|---|---|---|---|
| `fymoob` (branded) | 394 | ~58% | 1.11 |
| `fymob` (typo da marca) | 11 | ~1.6% | 2.65 |
| Outros (long-tail) | ~276 | <41% | variados |

Significa que **o site atual só é descoberto por quem já conhece a marca FYMOOB**. Zero tráfego de descoberta orgânica (pessoas procurando "apartamento batel", "casa curitiba", etc). Exatamente o que o novo site ataca via landing pages programáticas.

**Distribuição por dispositivo:**

| Device | Cliques | % total |
|---|---|---|
| Celular | 486 | 70.1% |
| Computador | 184 | 26.5% |
| Tablet | 2 | 0.3% |

**Mobile domina.** Valida estratégia mobile-first do novo site (otimizações touch, viewport, carousel nativo, etc).

**Distribuição geográfica:**

- Brasil: 671 cliques (99%+) — tráfego real
- Demais países: bots/scrapers internacionais (0-1 cliques cada, 50+ países listados)

**Home context:**

- Posição média 3.84 quando pesquisam "fymoob" — **Google competindo com outras presenças** (Instagram @fymoob, referências Loft, etc). Nem na primeira posição da própria marca.
- CTR 33.2% — inflado por marca, real CTR de descoberta deve estar <10%

**Landing pages estratégicas mais visitadas (além da home):**

| URL | Cliques | Observação |
|---|---|---|
| `/busca?finalidade=Aluguel&order=menor-preco` | 12 | Query string indexada (BAD SEO) |
| `/contato` | 11 | Institucional, esperado |
| `/busca?tipo=Casa&ordenar=` | 9 | Query malformada indexada |
| `/imovel/apartamento-batel-...-69803405` | 9 | Imóvel individual (um exemplo de ~70) |
| `/sobre` | 7 | Institucional |

**Conclusão pro pitch:** o site antigo tem 3 problemas estruturais críticos:
1. Tráfego 99% de marca (zero descoberta)
2. URLs de busca com query strings indexadas (duplicate content + dificulta canonical)
3. Imóveis individuais indexados acidentalmente, sem landing pages intermediárias que consolidem autoridade

---

## Comparação pós-cutover (preencher ao longo do tempo)

### D+7 (2026-04-24)

| Métrica | `.com` (antes) | `.com.br` (agora) | Delta |
|---|---|---|---|
| Páginas indexadas | 92 | ? | ? |
| URLs no sitemap submetido | 0 | 118 (shard 3) | — |
| Top query | fymoob | ? | — |

### D+30 (2026-05-17)

*(preencher)*

### D+90 (2026-07-17)

*(preencher)*

### D+180 (2026-10-17)

*(preencher)*

---

## Ferramentas úteis pra comparações

**Bulk URL comparison:**
- [ahrefs](https://ahrefs.com/backlink-checker) free tier pra comparar backlinks domain vs domain
- [semrush](https://www.semrush.com) free tier pra rankings históricos

**Diff de crawl:**
- Salvar output completo de `curl https://fymoob.com/sitemap.xml > sitemap-before.xml` se existir
- Arquivo `/public/sitemap.xml` antigo (se Atomicat tinha algum)

**Server logs:**
- Vercel Runtime Logs → primeiros 7 dias pós-cutover
- Filtrar por User-Agent: Googlebot/Bingbot → confirma crawl ativo

---

## Propósito deste baseline

1. **Pitch pro Bruno** — dados concretos de quanto a cobertura/tráfego cresceu
2. **Validar hipóteses** do projeto (ex: "landing pages programáticas aumentam cobertura 10x")
3. **Identificar regressões** — se alguma página do `.com` antigo gerava tráfego e não foi redirecionada certo, baseline revela
4. **Portfólio / case study** do trabalho — futuros clientes ou contratos podem ser fechados com dados reais
