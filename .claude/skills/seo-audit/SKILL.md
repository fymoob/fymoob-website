# Skill: SEO Audit — Auditoria Completa FYMOOB

## Trigger
Quando o usuario executar `/project:seo-audit` ou pedir uma auditoria de SEO.

## Contexto
Site imobiliario FYMOOB (fymoob.com) com 800+ paginas indexaveis.
Stack: Next.js 15+, Tailwind CSS, shadcn/ui
CRM: Loft/Vista API (249 imoveis, 113 empreendimentos, 65 bairros)
Concorrentes: Razzi, JBA Imoveis, Apolar, Gonzaga, Avantti

## Instrucoes

Execute uma auditoria SEO completa seguindo estas etapas:

### 1. Auditoria Tecnica
Use as ferramentas disponiveis (MCP GSC, leitura de codigo, Playwright se disponivel):

**Indexacao:**
- Verificar quantas paginas estao indexadas vs total esperado (800+)
- Identificar paginas importantes nao indexadas
- Verificar sitemap.ts esta gerando todas as URLs esperadas
- Verificar robots.ts nao esta bloqueando nada importante

**Schema Markup (sample de 5 paginas):**
- 1 pagina de imovel → verificar JSON-LD RealEstateListing
- 1 landing de bairro → verificar BreadcrumbList + ItemList
- 1 pagina de empreendimento → verificar schema apropriado
- 1 artigo do blog → verificar BlogPosting
- Home → verificar Organization + LocalBusiness

**Meta Tags:**
- Verificar se todas as paginas tem title e description unicos
- Identificar titles duplicados ou muito longos (>60 chars)
- Identificar descriptions duplicadas ou muito longas (>160 chars)
- Verificar og:image em todas as paginas

**Performance (via PageSpeed API se disponivel):**
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- Verificar imagens usando next/image com alt descritivo
- Verificar lazy loading em imagens abaixo do fold

**Mobile:**
- Verificar responsividade em paginas-chave
- Verificar usabilidade mobile via GSC MCP

### 2. Auditoria de Conteudo
- Verificar se paginas de bairro tem conteudo unico (nao so lista de imoveis)
- Verificar se paginas de tipo tem texto introdutorio
- Verificar internal linking entre paginas relacionadas
- Verificar breadcrumbs em todas as paginas

### 3. Analise Competitiva
Se Ahrefs/Semrush MCP disponivel:
- Comparar keywords ranking FYMOOB vs concorrentes
- Identificar gaps (keywords que concorrentes rankeiam e FYMOOB nao)
- Comparar autoridade de dominio
- Analisar backlinks

### 4. Formato do Relatorio
Salvar em `docs/seo-reports/YYYY-MM-DD-audit.md`:

```markdown
# Auditoria SEO — FYMOOB
**Data:** [data atual]
**Score Geral:** X/100

## Resumo
- Pontos fortes: ...
- Pontos criticos: ...
- Oportunidades: ...

## Indexacao [X/100]
...

## Schema Markup [X/100]
...

## Meta Tags [X/100]
...

## Performance [X/100]
...

## Mobile [X/100]
...

## Conteudo [X/100]
...

## Plano de Acao (priorizado)
1. [CRITICO] ...
2. [ALTO] ...
3. [MEDIO] ...
4. [BAIXO] ...
```

### 5. Apos Gerar
- Mostrar score geral e top 3 problemas criticos
- Perguntar se quer executar correcoes automaticas (via `/project:seo-fix`)
