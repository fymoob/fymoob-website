# API Loft/Vista — Skill Reference

## Endpoints

### Listar imóveis
```
GET /imoveis/listar?key={API_KEY}&pesquisa={JSON}
```

Payload de pesquisa:
```json
{
  "fields": ["Codigo", "Cidade", "Bairro", "ValorVenda", "Dormitorio", "Vagas", "AreaPrivativa", "Descricao", "FotoDestaque", "Categoria", "Finalidade", "Status"],
  "filter": {
    "Cidade": "Curitiba",
    "Status": "Disponivel"
  },
  "paginacao": {
    "pagina": 1,
    "quantidade": 50
  }
}
```

### Detalhes do imóvel
```
GET /imoveis/detalhes?key={API_KEY}&pesquisa={JSON}&imovel={CODIGO}
```

Payload:
```json
{
  "fields": ["Codigo", "Cidade", "Bairro", "Endereco", "ValorVenda", "ValorLocacao", "Dormitorio", "Suites", "Vagas", "AreaTotal", "AreaPrivativa", "Descricao", "FotoDestaque", "Categoria", "Finalidade", "Status", "Latitude", "Longitude",
    {"fotos": ["Foto", "FotoPequena", "Destaque", "Tipo"]},
    {"Corretor": ["Nome", "Fone", "E-mail", "Creci"]},
    {"Agencia": ["Nome", "Fone", "Endereco"]}
  ]
}
```

## Regras
- Paginação máxima: 50 resultados por request
- Sempre especificar `fields` — sem ele, API retorna apenas o código
- Ordenação via campo `Order`: `[{"ValorVenda": "asc"}]`
- Sandbox: `http://sandbox-rest.vistahost.com.br/`
- Produção: `https://{dominio}.vistahost.com.br/`

## Implementação no Projeto

O serviço `services/loft.ts` abstrai toda a comunicação:

```typescript
// Quando LOFT_API_KEY existe → chama API real
// Quando não existe → retorna dados de data/mock-properties.json

export async function getProperties(filters?: PropertyFilters): Promise<Property[]>
export async function getPropertyBySlug(slug: string): Promise<Property | null>
export async function getPropertiesByBairro(bairro: string): Promise<Property[]>
export async function getPropertiesByType(type: string): Promise<Property[]>
export async function getAllBairros(): Promise<BairroSummary[]>
export async function getAllTypes(): Promise<TypeSummary[]>
```

A troca de mock para API real é feita APENAS mudando a env var `LOFT_API_KEY`.
Nenhum componente ou página precisa mudar.
