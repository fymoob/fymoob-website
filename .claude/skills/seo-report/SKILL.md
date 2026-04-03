# Skill: SEO Report — Relatorio Semanal FYMOOB

## Trigger
Quando o usuario executar `/project:seo-report` ou pedir um relatorio de SEO.

## Contexto
Site imobiliario FYMOOB (fymoob.com) com 800+ paginas indexaveis.
Dominio de producao: fymoob.com
Dominio de staging: demo-blue-beta.vercel.app
CRM: Loft/Vista (249 imoveis, 113 empreendimentos, 65 bairros)

## Instrucoes

Gere um relatorio semanal de performance SEO seguindo este formato:

### 1. Coleta de Dados
Use as ferramentas MCP do Google Search Console (prefixo `mcp__gsc__`) para coletar:
- `get_performance_overview` — resumo geral (cliques, impressoes, CTR, posicao media)
- `get_search_analytics` — top 30 queries por cliques
- `get_search_analytics` — top 30 paginas por cliques
- `check_indexing_issues` — problemas de indexacao
- `get_sitemaps` — status dos sitemaps
- `get_crawl_stats` — atividade de crawl do Google
- `compare_search_periods` — comparacao com semana anterior

### 2. Analise e Insights
Para cada metrica, analise:
- **Tendencia:** subindo, estavel ou caindo?
- **Anomalias:** quedas ou picos inesperados?
- **Oportunidades:** queries com muitas impressoes mas CTR baixo (< 3%)
- **Problemas:** paginas desindexadas, erros de crawl, mobile issues

### 3. Sugestoes de Acao
Priorize por impacto (alto/medio/baixo):
- Reescrever titles/descriptions de paginas com CTR baixo
- Adicionar internal links para paginas com poucas impressoes
- Corrigir paginas com problemas de indexacao
- Otimizar paginas com posicao media 5-15 (proximas da 1a pagina)
- Identificar keywords que concorrentes (Razzi, JBA, Apolar) rankeiam e FYMOOB nao

### 4. Formato do Relatorio
Salvar em `docs/seo-reports/YYYY-MM-DD-weekly.md` com esta estrutura:

```markdown
# Relatorio SEO Semanal — FYMOOB
**Periodo:** [data inicio] a [data fim]
**Gerado:** [data atual]

## Resumo Executivo
- Cliques: X (+Y% vs semana anterior)
- Impressoes: X (+Y%)
- CTR medio: X%
- Posicao media: X

## Top 10 Queries
| Query | Cliques | Impressoes | CTR | Posicao |
...

## Top 10 Paginas
| Pagina | Cliques | Impressoes | CTR | Posicao |
...

## Indexacao
- Paginas indexadas: X de Y total
- Problemas encontrados: ...

## Acoes Recomendadas
1. [ALTA] ...
2. [MEDIA] ...
3. [BAIXA] ...

## Proxima Revisao
[data da proxima segunda-feira]
```

### 5. Apos Gerar
- Informar o usuario que o relatorio foi salvo
- Destacar as 3 acoes mais urgentes
- Perguntar se quer executar alguma correcao agora (via `/project:seo-fix`)
