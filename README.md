# FYMOOB — Site Imobiliário SEO-First

Site da imobiliária FYMOOB (Curitiba/PR), construído com Next.js e integrado ao CRM Loft/Vista, com arquitetura focada em SEO e geração de leads orgânicos via Google.

## Stack

- **Next.js 15+** (App Router, TypeScript, SSR/ISR)
- **Tailwind CSS**
- **API Loft/Vista** (CRM imobiliário)
- **Vercel** (deploy)

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`

## Variáveis de Ambiente

Copie `.env.example` para `.env.local`:

```
LOFT_API_KEY=              # Chave da API Loft/Vista (opcional durante dev)
NEXT_PUBLIC_SITE_URL=https://fymoob.com
```

Sem a `LOFT_API_KEY`, o site roda com dados mockados de `data/mock-properties.json`.

## Estrutura do Projeto

```
├── CLAUDE.md              # Contexto para Claude Code agent
├── docs/                  # Documentação do projeto
│   ├── project-context.md # Dados do cliente e mercado
│   ├── sprint-plan.md     # Plano de execução
│   ├── seo-strategy.md    # Estratégia técnica de SEO
│   └── session-log.md     # Log de progresso
├── .claude/               # Configuração do Claude Code
│   ├── skills/            # Skills reutilizáveis
│   ├── agents/            # Agentes especializados
│   └── commands/          # Comandos de workflow
└── src/                   # Código da aplicação (Next.js)
```

## SEO

O site é construído com SEO como prioridade:

- Todas as páginas pré-renderizadas (SSG/ISR)
- Schema markup JSON-LD em cada imóvel (RealEstateListing)
- Meta tags dinâmicos por página
- Sitemap XML dinâmico
- Landing pages por bairro e tipo de imóvel
- Blog com conteúdo otimizado

## Licença

Privado — FYMOOB Imobiliária.