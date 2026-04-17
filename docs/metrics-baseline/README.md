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
