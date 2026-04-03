# Skill: SEO Fix — Correcoes Automaticas FYMOOB

## Trigger
Quando o usuario executar `/project:seo-fix` ou pedir para corrigir problemas de SEO.

## Contexto
Site imobiliario FYMOOB (fymoob.com).
Stack: Next.js 15+, App Router, TypeScript
Estrutura: `src/app/` (paginas), `src/services/loft.ts` (dados), `src/lib/seo.ts` (helpers SEO)
Usar dados do ultimo relatorio ou auditoria em `docs/seo-reports/`

## REGRA ABSOLUTA
- NUNCA modificar dados na API Loft/Vista (apenas leitura)
- NUNCA remover paginas ou funcionalidades existentes
- Sempre fazer backup mental do que vai alterar
- Testar build (`npm run build`) apos correcoes

## Instrucoes

### 1. Identificar Problemas
Ler o relatorio/auditoria mais recente em `docs/seo-reports/`:
- Se nao existir relatorio recente, executar `/project:seo-report` primeiro
- Extrair lista de acoes priorizadas

### 2. Tipos de Correcao Automatica

**Meta Tags (automatico):**
- Reescrever titles com CTR < 3% para ser mais atrativo/clicavel
- Ajustar descriptions para incluir CTA e keyword principal
- Corrigir titles duplicados
- Garantir que todos estao dentro dos limites (title 50-60 chars, desc 120-160 chars)
- Arquivos: `src/app/**/page.tsx` (funcoes `generateMetadata`)

**Schema Markup (automatico):**
- Corrigir JSON-LD invalido ou incompleto
- Adicionar campos faltantes (geo, priceRange, etc.)
- Validar com schema.org spec
- Arquivos: `src/app/**/page.tsx`, `src/components/seo/`

**Internal Linking (automatico):**
- Adicionar links de bairro → imoveis do bairro
- Adicionar links de imovel → bairro + tipo
- Adicionar links do blog → paginas de bairro/tipo relevantes
- Arquivos: componentes de pagina, templates de landing

**Alt Text de Imagens (automatico):**
- Gerar alt texts descritivos: "Foto do [tipo] com [N] quartos no [bairro], Curitiba"
- Verificar que todas as imagens tem alt
- Arquivos: `src/components/property/`, `src/app/imovel/`

**Sitemap (automatico):**
- Verificar que todas as novas paginas estao no sitemap
- Ajustar priorities se necessario
- Arquivo: `src/app/sitemap.ts`

### 3. Fluxo de Execucao
1. Ler relatorio mais recente
2. Listar correcoes a fazer (mostrar ao usuario)
3. Pedir confirmacao antes de executar
4. Aplicar correcoes uma por uma
5. Rodar `npm run build` para validar
6. Gerar resumo das mudancas

### 4. O que NAO corrigir automaticamente (pedir ao usuario)
- Mudancas de arquitetura de URLs
- Remocao de paginas
- Mudancas no design/layout
- Adicao de novas features
- Qualquer coisa que afete a API Loft

### 5. Apos Correcoes
- Listar todos os arquivos modificados
- Mostrar diff resumido
- Sugerir commit message
- Recomendar re-submeter sitemap ao GSC se houve mudancas estruturais
