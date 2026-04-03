# FYMOOB — Site Imobiliário SEO-First

## REGRA ABSOLUTA — API LOFT/VISTA
**NUNCA, em NENHUMA hipótese, executar operações de exclusão ou modificação destrutiva na API do Loft/Vista.**
- NUNCA chamar endpoints de DELETE em imóveis, clientes, leads ou qualquer outro recurso
- NUNCA chamar PUT/POST que remova, sobrescreva ou limpe dados existentes
- NUNCA executar scripts que possam alterar ou apagar dados no CRM do cliente
- Usar a API APENAS para LEITURA (GET) e envio de leads (POST /lead)
- Se precisar testar escrita, usar APENAS o sandbox (sandbox-rest.vistahost.com.br), NUNCA produção
- **Esta regra não tem exceção. Dados do cliente são sagrados.**

---

## Projeto
Reconstrução do site da imobiliária FYMOOB (Curitiba/PR) com foco em SEO e geração de leads orgânicos via Google. O site atual é invisível para o Google (5 visitas/mês, 5 páginas indexadas de 245 imóveis).

## Stack
- **Framework:** Next.js 15+ (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix + Tailwind)
- **Icons:** Lucide React
- **Fontes:** Poppins (headings/nav) + Inter (body)
- **Paleta:** Azul FYMOOB (#29ABE2) + branco — identidade atual da marca
- **CRM:** Loft/Vista API REST (antigo Vista) — chave da API será configurada via env
- **Banco:** Nhost (Hasura + PostgreSQL + GraphQL) — sa-east-1
- **Imagens:** CDN Vistahost (`cdn.vistahost.com.br`) + Nhost Storage
- **Deploy:** Vercel
- **Domínio:** fymoob.com

## Comandos
```bash
npm run dev          # Desenvolvimento local
npm run build        # Build de produção
npm run lint         # Linting
npm run test         # Testes
```

## Convenções de Código
- Todo código da aplicação fica dentro de `src/`
- Componentes em PascalCase, arquivos em kebab-case
- Server Components por padrão, 'use client' apenas quando necessário
- UI components via shadcn/ui — nunca criar do zero se shadcn tem equivalente
- Ver `.claude/skills/frontend-design/SKILL.md` para design system completo
- Todas as páginas públicas devem exportar `generateMetadata()`
- Todas as páginas de imóvel devem incluir JSON-LD schema markup
- Imagens sempre via `<Image />` do Next.js com alt descritivo
- Dados da API Loft via `src/services/loft.ts` — nunca chamar API direto nos componentes
- Sem mock data — API Loft é a única fonte de dados (LOFT_API_KEY obrigatória)
- Env vars: `LOFT_API_KEY`, `NEXT_PUBLIC_SITE_URL`, `NHOST_SUBDOMAIN`

## Arquitetura de URLs (SEO)
```
/                                    → Home
/imovel/[slug]                       → Página individual do imóvel
/imoveis/[bairro]                    → Landing page por bairro
/imoveis/[bairro]/[tipo]             → Landing combinada bairro+tipo
/apartamentos-curitiba               → Landing page por tipo (estática)
/casas-curitiba                      → Landing page por tipo (estática)
/sobrados-curitiba                   → Landing page por tipo (estática)
/terrenos-curitiba                   → Landing page por tipo (estática)
/blog/[slug]                         → Artigo do blog
/faq                                 → Perguntas frequentes
/sobre                               → Sobre nós
/contato                             → Contato
/anuncie                             → Anunciar imóvel
/busca                               → Busca com filtros (SSR)
/imoveis/[bairro]/venda              → Landing bairro + venda (programático)
/imoveis/[bairro]/aluguel            → Landing bairro + aluguel (programático)
/apartamentos-curitiba/venda         → Landing tipo + finalidade
/imoveis/ate-300-mil                 → Landing faixa de preço
/imoveis/[bairro]/[n]-quartos        → Landing bairro + quartos (futuro)
/empreendimento/[slug]               → Página individual empreendimento
/empreendimentos                     → Listagem de empreendimentos
```

## SEO — Regras obrigatórias
- Toda página pública: `generateMetadata()` com title, description, og:image únicos
- Toda página de imóvel: JSON-LD `RealEstateListing` com preço, endereço, geo, quartos, área
- Layout raiz: JSON-LD `Organization` + `LocalBusiness`
- `sitemap.ts` dinâmico listando todos os imóveis + bairros + blog
- `robots.ts` permitindo tudo exceto /api/, /favoritos, /comparar
- Breadcrumbs com schema `BreadcrumbList` em todas as páginas
- Imagens: alt = "Foto do [tipo] com [N] quartos no [bairro], Curitiba"

## API Loft/Vista — Referência rápida
- Endpoint: `https://[dominio].vistahost.com.br/imoveis/listar?key=KEY`
- Paginação: max 50 resultados por request
- Campos: Codigo, Categoria, Cidade, Bairro, ValorVenda, ValorLocacao, Dormitorio, Suites, Vagas, AreaTotal, AreaPrivativa, Descricao, FotoDestaque, fotos[], Status, Finalidade
- Detalhes: `/imoveis/detalhes?key=KEY&imovel=CODIGO`
- 249 imóveis ativos via API REST (dados ao vivo do CRM)

## Task Management — REGRA OBRIGATÓRIA
- **Tasks consolidadas em `docs/TASKS.md`** — fonte única de verdade
- **APÓS CADA IMPLEMENTAÇÃO:** atualizar `docs/TASKS.md` imediatamente:
  1. Marcar tasks concluídas com `[x]`
  2. Atualizar contadores na tabela Status Geral (concluídas, pendentes, %)
  3. Adicionar novas tasks descobertas na fase apropriada
  4. Se fase completa, mudar status para CONCLUIDA
- **NUNCA** fazer commit sem ter atualizado o TASKS.md primeiro
- Ao descobrir nova task, adicionar na fase apropriada
- Status atual: verificar tabela no topo de `docs/TASKS.md`

## Contexto de negócio
- Ver `docs/project-context.md` para dados completos do cliente
- Ver `docs/TASKS.md` para todas as tasks do projeto (fonte única)
- Ver `docs/sprint-plan.md` para referência histórica das fases originais
- Ver `docs/seo-strategy.md` para estratégia técnica detalhada de SEO

## Compactação
Quando compactar, SEMPRE preservar:
- Lista de arquivos modificados na sessão atual
- Fase/sprint atual do plano de execução
- Quaisquer decisões de arquitetura tomadas
- Comandos de teste relevantes

## Workflow de Sessão
- **Início de sessão:** rodar `/project:resume` para saber onde parou
- **Final de sessão:** rodar `/project:checkpoint` para salvar progresso
- **Criar página:** rodar `/project:new-page` para seguir padrões SEO
- **Revisar SEO:** invocar agente `seo-reviewer` para validar páginas
- **Entre fases:** usar `/clear` para limpar contexto