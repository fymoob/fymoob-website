# Criar Nova Página SEO-Optimized

Crie uma nova página para o site FYMOOB seguindo TODOS os padrões:

1. Leia `docs/seo-strategy.md` para os padrões de meta tags e schema
2. A página DEVE exportar `generateMetadata()` com title, description e og:image únicos
3. A página DEVE incluir JSON-LD schema markup apropriado
4. A página DEVE incluir Breadcrumbs com schema BreadcrumbList
5. Imagens via `<Image />` com alt descritivo
6. Dados via `services/loft.ts` — nunca chamar API direto
7. Server Component por padrão

Após criar, execute o seo-reviewer agent para validar a página.

Qual página você quer criar? Informe o path e propósito.
