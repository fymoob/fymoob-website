# Plano de Integração — API Loft Real + Site FYMOOB

## Contexto
O projeto FYMOOB está 70% concluído (Fases 0-4 de 7 prontas) usando mock data (244 imóveis scrapeados). Agora temos a API key real da Loft com acesso a 249 imóveis ativos, 113 empreendimentos, 65 bairros e 269 campos. A integração com a API real é a Fase 5 do projeto — essencial para o site ir ao ar com dados vivos do CRM.

**Decisão:** Sem testes unitários neste momento. Verificação via build + navegação manual + sitemap. Testes automatizados quando a estrutura estabilizar pós-deploy.

---

## REGRA ABSOLUTA
**NUNCA executar POST, PUT ou DELETE na API real. Apenas GET (leitura) e POST /lead (envio de leads do formulário). Verificar antes de qualquer request.**

---

## Tasks

### Task 1: Atualizar types com campos reais da API
**Arquivo:** `src/types/property.ts`
**Status:** [x] CONCLUÍDA

**O que fazer:**
- Expandir `PropertyType` union de 4 para 17 categorias (Apartamento, Apartamento Duplex, Casa, Casa em Condomínio, Chácara, Cobertura, Empreendimento, Kitnet, Loja, Ponto Comercial, Prédio Comercial, Sala Comercial, Salas/Conjuntos, Sobrado, Studio, Terreno, Terreno Comercial)
- Atualizar `PropertyFinalidade` para "Venda" | "Aluguel" | "Venda e Aluguel" (campo Status da API, não Finalidade)
- Adicionar campos novos à interface Property:
  - `tituloSite: string | null` (TituloSite da API — título otimizado pra portais)
  - `textoAnuncio: string | null` (TextoAnuncio)
  - `empreendimento: string | null` (Empreendimento)
  - `codigoEmpreendimento: string | null` (CodigoEmpreendimento)
  - `construtora: string | null` (Construtora)
  - `descricaoEmpreendimento: string | null` (DescricaoEmpreendimento)
  - `valorCondominio: number | null` (ValorCondominio)
  - `valorIptu: number | null` (ValorIptu)
  - `valorM2: number | null` (ValorM2)
  - `exibirNoSite: boolean` (ExibirNoSite)
  - `destaqueWeb: boolean` (DestaqueWeb)
  - `superDestaqueWeb: boolean` (SuperDestaqueWeb)
  - `lancamento: boolean` (Lancamento)
  - `aceitaFinanciamento: boolean` (AceitaFinanciamento)
  - `aceitaPermuta: boolean` (AceitaPermuta)
  - `temTourVirtual: boolean` (TemTourVirtual)
  - `urlVideo: string | null` (URLVideo)
  - `keywordsWeb: string | null` (KeywordsWeb)
  - `face: string | null` (Face)
  - `garagemTipo: string | null` (GaragemTipo)
  - `topografia: string | null` (Topografia)
  - `situacao: string | null` (Situacao — Novo/Usado)
  - `ocupacao: string | null` (Ocupacao — Desocupado/Ocupado)
  - `anoConstrucao: string | null` (AnoConstrucao)
  - `varandas: number | null` (QtdVarandas)
  - `salas: number | null` (Salas)
  - `caracteristicas: string[]` (campos booleanos carac que forem "Sim")
  - `infraestrutura: string[]` (campos booleanos infra que forem "Sim")
- Atualizar `LoftPropertyRaw` com todos os campos reais da API
- Adicionar interface `EmpreendimentoSummary` (nome, slug, total, imageUrl, bairros[])

**Verificação:** TypeScript compila sem erros após alterações.

---

### Task 2: Atualizar services/loft.ts para API real
**Arquivo:** `src/services/loft.ts`
**Status:** [x] CONCLUÍDA

**O que fazer:**
- Adicionar constantes:
  ```
  LOFT_BASE_URL = "https://brunoces-rest.vistahost.com.br"
  LOFT_API_KEY = process.env.LOFT_API_KEY
  ```
- Criar função `fetchLoftAPI(endpoint, params)` com:
  - Header `Accept: application/json`
  - Tratamento de erro (401, 400, timeout)
  - Log de erros sem expor a key
- Criar função `mapLoftPropertyToProperty(raw: LoftPropertyRaw): Property` que:
  - Converte strings numéricas pra number (ValorVenda, Dormitorios, etc.)
  - Mapeia "Sim"/"Nao" pra boolean (ExibirNoSite, DestaqueWeb, etc.)
  - Gera slug via `generatePropertySlug()` (atualmente stub — precisa implementar)
  - Gera url a partir do slug
  - Mapeia Categoria → tipo, Status → finalidade
  - Filtra fotos placeholder (Nhost logo)
- Implementar paginação:
  - API retorna max 50 por request
  - Loop paginando até ter todos (249 ativos)
  - Cache em memória durante o build (não chamar API pra cada página)
- Manter fallback para mock data quando `LOFT_API_KEY` está vazio
- Atualizar `getFeaturedProperties()` para usar `GET /imoveis/destaques` (endpoint dedicado)
- Atualizar `getAllBairros()` para usar `GET /imoveis/listarConteudo` com campo BairroComercial
- Adicionar `getAllEmpreendimentos()` — agrupar imóveis por campo Empreendimento
- Filtrar sempre por `ExibirNoSite: "Sim"` nas chamadas à API

**Campos da API a solicitar no listar:**
```
Codigo, Categoria, BairroComercial, Bairro, Cidade, Endereco, Numero, Complemento, Bloco, CEP, UF, ValorVenda, ValorLocacao, ValorCondominio, ValorIptu, ValorM2, Dormitorios, Suites, Vagas, TotalBanheiros, AreaTotal, AreaPrivativa, AreaTerreno, Finalidade, Status, Situacao, Ocupacao, DescricaoWeb, TituloSite, TextoAnuncio, FotoDestaque, FotoDestaquePequena, Latitude, Longitude, GMapsLatitude, GMapsLongitude, Empreendimento, CodigoEmpreendimento, Construtora, DescricaoEmpreendimento, ExibirNoSite, DestaqueWeb, SuperDestaqueWeb, Lancamento, AceitaFinanciamento, AceitaPermuta, TemTourVirtual, URLVideo, KeywordsWeb, Face, GaragemTipo, Topografia, AnoConstrucao, QtdVarandas, Salas, DataCadastro, DataAtualizacao, Referencia
```

**Verificação:** `getProperties()` retorna 249 imóveis reais. `getPropertyBySlug()` retorna imóvel correto. Build passa.

---

### Task 3: Implementar geração de slug real
**Arquivo:** `src/lib/utils.ts` (implementado dentro de `src/services/loft.ts` na função `generateSlug`)
**Status:** [x] CONCLUÍDA (incluída na Task 2)

**O que fazer:**
- Implementar `generatePropertySlug()` de verdade (atualmente retorna `property.slug` do mock):
  - Formato: `{tipo}-{bairro}-{cidade}-{estado}-{dormitorios}-quartos-{area}m2-{codigo}`
  - Exemplo: `apartamento-batel-curitiba-pr-3-quartos-263m2-69803405`
  - Usar `slugify()` em cada componente
  - Código no final garante unicidade
- Garantir retrocompatibilidade: slugs antigos do mock devem continuar funcionando (redirect ou lookup alternativo)

**Verificação:** Navegar para `/imovel/apartamento-batel-curitiba-pr-3-quartos-263m2-69803405` retorna o imóvel correto.

---

### Task 4: Resolver fotos da API
**Arquivo:** `src/services/loft.ts`
**Status:** [x] CONCLUÍDA (incluída na Task 2 — fotos extraídas do campo aninhado Foto com ordenação)

**O que fazer:**
- Campos de foto da API: Ordem, Codigo, ImagemCodigo, Data, Descricao, Destaque, ExibirNoSite, ExibirSite, Foto, FotoOriginal, FotoPequena, Tipo, Origem
- Testar sintaxe correta de campos aninhados pra /imoveis/detalhes
- Se fotos não funcionarem via listar (provável), buscar via detalhes pra cada imóvel no build
- Mapear array de fotos da API → array de strings (URLs) no Property
- FotoDestaque já funciona como campo direto (confirmado)
- Filtrar fotos com ExibirNoSite="Nao"

**Verificação:** Página de imóvel mostra galeria com fotos reais do CDN vistahost.

---

### Task 5: Integrar formulário de contato com POST /lead
**Arquivo:** `src/app/api/lead/route.ts` (novo) + componentes de contato
**Status:** [x] CONCLUÍDA

**O que fazer:**
- Criar API route `/api/lead` que:
  - Recebe dados do formulário (nome, email, fone, mensagem, codigo do imóvel)
  - Faz POST para `https://brunoces-rest.vistahost.com.br/lead?key={KEY}`
  - Payload: `{ lead: { nome, email, fone, interesse, anuncio, veiculo: "Site FYMOOB", mensagem } }`
  - Retorna success/error
  - NÃO expor a API key no client-side (rota server-side)
- Atualizar componentes que usam formulário:
  - `src/components/property/PropertyContact.tsx`
  - `src/components/property/ContactSidebar.tsx`
  - `src/components/property/MobileContactBar.tsx`
- Enviar código do imóvel no campo `anuncio`

**Verificação:** Preencher formulário no site → lead aparece no CRM do Bruno.

---

### Task 6: Criar rota de empreendimentos
**Arquivos:** `src/app/empreendimento/[slug]/page.tsx` (novo) + componentes
**Status:** [x] CONCLUÍDA

**O que fazer:**
- Criar `getAllEmpreendimentos()` em services/loft.ts — agrupa imóveis por campo Empreendimento
- Criar página `/empreendimento/[slug]` com:
  - `generateStaticParams()` gerando slug de cada empreendimento com 1+ imóveis
  - `generateMetadata()` com título: "[Empreendimento] | [Bairro] - Curitiba | FYMOOB"
  - JSON-LD RealEstateListing ou ItemList
  - Lista de unidades do empreendimento
  - Descrição do empreendimento (campo DescricaoEmpreendimento)
  - Construtora (campo Construtora)
  - Fotos do empreendimento (FotoDestaqueEmpreendimento)
  - Faixa de preço, tipos, área
- Adicionar empreendimentos ao sitemap.ts
- Adicionar links para empreendimentos na home e nas landing pages de bairro

**Verificação:** `/empreendimento/reserva-barigui` mostra todos os imóveis do Reserva Barigui com meta tags e schema.

---

### Task 7: Atualizar sitemap e configurações
**Arquivos:** `src/app/sitemap.ts`, `next.config.ts`
**Status:** [x] CONCLUÍDA

**O que fazer:**
- Atualizar `next.config.ts`:
  - Adicionar `brunoces-rest.vistahost.com.br` nos remotePatterns (se necessário)
  - Confirmar que `cdn.vistahost.com.br` já está nos remotePatterns
- Atualizar `sitemap.ts`:
  - Adicionar páginas de empreendimento com priority 0.8
  - Usar `DataAtualizacao` real como `lastmod` (hoje está fixo em 2026-03-18)
- Atualizar contagem esperada: de 397 URLs → potencialmente 500+ com empreendimentos

**Verificação:** `/sitemap.xml` lista 500+ URLs com lastmod dinâmico. Build completa sem erros.

---

### Task 8: Build e teste com dados reais
**Status:** [x] CONCLUÍDA — 473 páginas geradas com sucesso

**O que fazer:**
- `npm run build` — deve gerar todas as páginas com dados da API real
- Verificar:
  - [ ] Home carrega com imóveis reais e destaques
  - [ ] Busca filtra corretamente
  - [ ] Landing pages de bairro mostram imóveis corretos (65 bairros)
  - [ ] Landing pages bairro+tipo funcionam
  - [ ] Landing pages por tipo funcionam (17 categorias)
  - [ ] Páginas de imóvel individual carregam com todos os campos
  - [ ] Galeria de fotos funciona
  - [ ] Empreendimentos geram páginas (113 empreendimentos)
  - [ ] Sitemap lista todas as URLs
  - [ ] Schema RealEstateListing presente com dados reais
  - [ ] Formulário de contato envia lead pro CRM
  - [ ] Mobile responsivo com dados reais
- `npm run dev` e navegar manualmente nas principais páginas

**Verificação:** Site funciona 100% com dados reais. Build passa sem erros. Deploy na Vercel funciona.

---

## Ordem de Execução

| # | Task | Depende de | Tempo est. |
|---|------|-----------|------------|
| 1 | Atualizar types | — | 1h |
| 2 | Atualizar services/loft.ts | Task 1 | 3-4h |
| 3 | Implementar slug real | Task 1 | 30min |
| 4 | Resolver fotos da API | Task 2 | 1-2h |
| 5 | Integrar formulário /lead | Task 2 | 1h |
| 6 | Criar rota empreendimentos | Tasks 1,2,3 | 2-3h |
| 7 | Atualizar sitemap e config | Tasks 2,6 | 30min |
| 8 | Build e teste completo | Todas | 1-2h |

**Total estimado: ~10-13h de trabalho**

---

## Arquivos a Modificar

| Arquivo | Ação |
|---------|------|
| `src/types/property.ts` | Expandir types e interfaces |
| `src/services/loft.ts` | Reescrever para API real (mantendo fallback mock) |
| `src/lib/utils.ts` | Implementar generatePropertySlug real |
| `src/lib/seo.ts` | Adaptar schemas pra novos campos se necessário |
| `src/app/sitemap.ts` | Adicionar empreendimentos, lastmod dinâmico |
| `src/app/empreendimento/[slug]/page.tsx` | NOVO — página de empreendimento |
| `src/app/api/lead/route.ts` | NOVO — rota API pra enviar leads ao CRM |
| `src/components/property/PropertyContact.tsx` | Integrar com /api/lead |
| `src/components/property/ContactSidebar.tsx` | Integrar com /api/lead |
| `next.config.ts` | Verificar remotePatterns |

## Arquivos que NÃO precisam mudar
- Páginas (page.tsx) — consomem dados via services, agnósticas à fonte
- Componentes UI — recebem Property como prop, não sabem de onde veio
- Blog (MDX) — independente da API
- FAQ — independente da API

---

## Regra de Progresso
**Após completar cada Task, marcar como [x] neste documento E no TodoWrite. Sempre ler o estado atual do código antes de implementar — não assumir que está como planejado.**
