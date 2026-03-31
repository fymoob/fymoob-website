---
name: loft-api
description: API Loft/Vista — Referência completa com dados reais da FYMOOB
---

# API Loft/Vista — Skill Reference
## FYMOOB — Dados reais mapeados em 30/03/2026

## REGRA ABSOLUTA
**NUNCA executar POST, PUT ou DELETE na API de produção. Apenas GET (leitura) e POST /lead (envio de leads).**

---

## Configuração

| Item | Valor |
|------|-------|
| **Base URL** | `https://brunoces-rest.vistahost.com.br` |
| **API Key** | Variável `LOFT_API_KEY` no `.env.local` |
| **Documentação** | `https://brunoces-rest.vistahost.com.br/doc` |
| **Header obrigatório** | `Accept: application/json` |
| **Paginação máx** | 50 resultados por request |
| **Logo URL** | `https://cdn.vistahost.com.br/brunoces/vista.imobi/fotos/ibl_41463_65eb31c380c39.png` |

---

## Dados Reais da FYMOOB (mapeados via API)

| Dado | Valor |
|------|-------|
| Total imóveis (API) | **249** (filtrados por status ativo) |
| Total imóveis (painel CRM) | **1.479** (todos os status) |
| Campos disponíveis | **269** |
| Categorias | **17** tipos |
| Bairros | **65** bairros distintos |
| Empreendimentos | **113** cadastrados |
| Destaques | **10** imóveis marcados |
| Finalidades | Venda, Aluguel |
| Status | Aluguel, Venda, Venda e Aluguel |
| Características (imóvel) | **81** campos |
| Infraestrutura (condomínio) | **77** campos |
| Campos de foto | **13** campos |

---

## Endpoints Principais (usados no site)

### Listar imóveis
```
GET /imoveis/listar?key={KEY}&pesquisa={JSON}&showtotal=1
```
```json
{
  "fields": ["Codigo", "Categoria", "BairroComercial", "Cidade", "Endereco", "Numero", "CEP", "UF", "ValorVenda", "ValorLocacao", "ValorCondominio", "Dormitorios", "Suites", "Vagas", "TotalBanheiros", "AreaTotal", "AreaPrivativa", "Finalidade", "Status", "DescricaoWeb", "TituloSite", "FotoDestaque", "FotoDestaquePequena", "Latitude", "Longitude", "Empreendimento", "ExibirNoSite", "DestaqueWeb", "SuperDestaqueWeb", "Lancamento", "DataCadastro", "DataAtualizacao", "Referencia"],
  "filter": {
    "ExibirNoSite": "Sim"
  },
  "paginacao": {
    "pagina": 1,
    "quantidade": 50
  },
  "order": {"ValorVenda": "desc"}
}
```

### Detalhes do imóvel
```
GET /imoveis/detalhes?key={KEY}&imovel={CODIGO}&pesquisa={JSON}
```
Igual ao listar mas com mais campos. Fotos via campo separado (ver seção Fotos).

### Destaques (imóveis marcados como destaque)
```
GET /imoveis/destaques?key={KEY}&pesquisa={JSON}
```
Retorna apenas imóveis com DestaqueWeb="Sim". Aceita `finalidade` param ("venda" ou "aluguel").

### Listar campos disponíveis
```
GET /imoveis/listarcampos?key={KEY}&desc=1&tipo={TIPO}
```
Tipos: `imoveis` (269 campos), `carac` (81), `infra` (77), `Foto` (13), `Corretor`, `Agencia`

### Valores distintos (para filtros/dropdowns)
```
GET /imoveis/listarConteudo?key={KEY}&pesquisa={"fields":["CAMPO"]}
```
Campos úteis: Categoria, BairroComercial, Empreendimento, Status, Cidade

### Finalidades disponíveis
```
GET /imoveis/finalidades?key={KEY}
```
Retorna: `["Venda", "Aluguel"]`

### Enviar lead (formulário do site → CRM)
```
POST /lead?key={KEY}
Content-Type: application/json
```
```json
{
  "lead": {
    "nome": "(obrigatório)",
    "email": "(obrigatório se não tem fone)",
    "fone": "(obrigatório se não tem email)",
    "interesse": "Venda",
    "anuncio": "(código do imóvel)",
    "veiculo": "Site FYMOOB",
    "mensagem": "(texto da mensagem)"
  }
}
```

### Lead do site (widget)
```
POST /lead/site?key={KEY}
```

### Logo da empresa
```
GET /logotipo?key={KEY}
```
Retorna: `{"logotipo": "https://cdn.vistahost.com.br/brunoces/vista.imobi/fotos/..."}`

### Busca avançada
```
GET /imoveis/buscaAvancada?key={KEY}&pesquisa={JSON}
```

### Endereços
```
GET /imoveis/enderecos?key={KEY}&pesquisa={JSON}
```

### Recarregar cache
```
GET /reloadcache?key={KEY}
```

### Webhooks
```
GET/PUT/POST/DELETE /webhook/{action}?key={KEY}
```

---

## Endpoints SEM acesso (key atual)

| Endpoint | Erro |
|----------|------|
| `/corretores/listar` | 401 — Permissão Negada |

Se precisar de corretores, pedir à Loft para adicionar permissão na key.

---

## Categorias (17 tipos)
Apartamento, Apartamento Duplex, Casa, Casa em Condomínio, Chácara, Cobertura, Empreendimento, Kitnet, Loja, Ponto Comercial, Prédio Comercial, Sala Comercial, Salas/Conjuntos, Sobrado, Studio, Terreno, Terreno Comercial

## Bairros (65 distintos)
Afonso Pena, Água Verde, Alto Boqueirão, Alto da Glória, Alto da Rua XV, Atuba, Bairro Alto, Barreirinha, Batel, Bigorrilho, Boa Vista, Bom Jesus, Boqueirão, Cabral, Cachoeira, Cajuru, Campina das Pedras, Campina do Siqueira, Campo Comprido, Campo de Santana, Capão da Imbuia, Capão Raso, Capela Velha, Centro, Cidade Industrial, Cidade Jardim, Cristo Rei, Cruzeiro, Ecoville, Eucaliptos, Fazendinha, Ganchinho, Guaira, Guatupê, Hauer, Iguaçu, Jardim Veneza, Juvevê, Lindóia, Maracanã, Mercês, Mossunguê, Nações, Novo Mundo, Pilarzinho, Pinheirinho, Portão, Povoado do Boa Vista, Rebouças, Santa Cândida, Santa Quitéria, São Braz, São Miguel, São Pedro, Seminário, Sítio Cercado, Tarumã, Tatuquara, Tingui, Uberaba, Umbará, Vila David Antônio, Vila Izabel, Vila Verde, Xaxim

## Empreendimentos (113 cadastrados)
Incluem: Reserva Barigui, Reserva Colina, Trebbiano Residencial, BW Residence, Casa Batel, Trevi Batel, Shopping & Sports, Vitória Régia, Terracota I, e mais 103.

---

## Campos de Foto
```
GET /imoveis/listarcampos?key={KEY}&tipo=Foto
```
Campos: Ordem, Codigo, ImagemCodigo, Data, Descricao, Destaque, ExibirNoSite, ExibirSite, Foto, FotoOriginal, FotoPequena, Tipo, Origem

**Nota:** Ao pedir fotos no `/imoveis/detalhes`, usar a sintaxe de campos aninhados com os nomes corretos da listarcampos. Os nomes de campo de foto são diferentes dos de imóvel.

---

## Características do Imóvel (81 campos booleanos)
AceitaPet, Adega, AguaQuente, Alarme, AntenaParabolica, AquecimentoEletrico, ArCentral, ArCondicionado, AreaServico, ArmarioEmbutido, BanheiroAuxiliar, BanheiroSocial, Bar, Calefacao, CanaletasNoRodape, CercaEletrica, Churrasqueira, ConstrucaoAlvenaria, Copa, CopaCozinha, Cozinha, CozinhaAmericana, CozinhaArmarios, CozinhaComTanque, CozinhaMontada, CozinhaPlanejada, Deck, DependenciadeEmpregada, DependenciaDeEmpregada, Despensa, DormitorioComArmario, Edicula, Escritorio, EsperaSplit, EstarIntimo, Forro, FrenteMar, Gabinete, Gradeado, Hidromassagem, HomeTheater, Horta, Internet, JardimInverno, Lareira, Lavabo, Leste, Living, LivingHall, Mezanino, Mobiliado, Monitoramento, Norte, Oeste, Patio, Piscina, PisoElevado, Porao, Quintal, Reformado, Sacada, SacadaComChurrasqueira, Sala, SalaArmarios, SalaEstar, SalaJantar, SalaTV, Sauna, SemiMobiliado, Sotao, Split, SuiteMaster, Sul, Terraco, TVCabo, VigiaExterno, VigiaInterno, VistaMar, VistaPanoramica, Vitrine, WCEmpregada

## Infraestrutura do Condomínio (77 campos booleanos)
Agua, AquecedorSolar, AquecimentoCentral, Bicicletario, Brinquedoteca, CabineDeForca, Canil, CapacidadePiso, ChurrasqueiraCondominio, CircuitoFechadoTV, CondominioFechado, ConstrucaoMista, Coworking, Deposito, EdificioResidencial, Elevador, ElevadorServico, EmpresaDeMonitoramento, EnergiaEletrica, EnergiaTrifasica, EntradaServicoIndependente, EspacoGourmet, EspacoZen, Estacionamento, EstacionamentoVisitantes, Garagem, GaragemCoberta, GasCentral, GeradorEnergia, Gradil, Guarita, Heliponto, HomeMarket, HortaColetiva, Interfone, Jardim, Junker, Lavanderia, Marquise, NomeEmpresaMonitoramento, OnibusProximo, PainelSolar, Parque, Pavimentacao, PetPlace, Pilotis, PiscinaAquecida, PiscinaColetiva, PiscinaInfantil, PistaCaminhada, Playground, PocoArtesiano, PortaoEletronico, Portaria, Portaria24Hrs, PortariaBlindada, PorteiroEletronico, PortoesComEclusa, PossuiViabilidade, QuadraEsportes, QuadraPoliEsportiva, QuadraTenis, Quiosque, RedeEsgoto, SalaDeRecepcao, SalaFitness, SalaoFestas, SalaoJogos, SaunaCondominio, SegurancaPatrimonial, Shaft, Spa, TerracoColetivo, Tour360, Tubulacao, Vigilancia24Horas, Zelador

---

## Campos Principais do Imóvel (269 total — destaques)

### Identificação
Codigo, Referencia, CodigoEmpreendimento, ImoCodigo, ListingId, UnitId

### Classificação
Categoria, Status, Finalidade, Situacao, Ocupacao, Exclusivo, Lancamento, Proposta

### Localização
Endereco, TipoEndereco, Numero, Complemento, Bloco, Bairro, BairroComercial, Cidade, UF, CEP, Pais, Regiao, Zona, Imediacoes, Latitude, Longitude, GMapsLatitude, GMapsLongitude

### Valores
ValorVenda, ValorLocacao, ValorCondominio, ValorIptu, ValorM2, ValorVendaM2, ValorLocacaoM2, ValorCondominioM2, ValorIPTUM2, ValorDiaria, ValorTotalAluguel, ValorLivreProprietario, ValorACombinar, Prestacao, SaldoDivida

### Dimensões
AreaTotal, AreaPrivativa, AreaTerreno, AreaConstruida, AreaBoxPrivativa, AreaBoxTotal, AreaEscritorio, AreaLaje, AreaLocavel, AreaMezanino, AreaArmazem, DimensoesTerreno, Frente, Fundos

### Cômodos
Dormitorios, Suites, Vagas, VagasCobertas, VagasDescobertas, TotalBanheiros, BanheiroSocialQtd, Salas, QtdVarandas, Closet, Closets, LivingAmbientes, Conjutos

### Empreendimento
Empreendimento, CodigoEmpreendimento, EEmpreendimento, Construtora, Incorporadora, DescricaoEmpreendimento, Andares, AptosAndar, AptosEdificio, Elevadores, LojasEdificio, SalasEdificio, AdministradoraCondominio

### Conteúdo Web
TituloSite, TextoAnuncio, DescricaoWeb, KeywordsWeb, DescricaoEmpreendimento

### Mídia
FotoDestaque, FotoDestaquePequena, FotoDestaqueEmpreendimento, FotoDestaqueEmpreendimentoPequena, URLVideo, VideoDestaque, VideoDestaqueTipo, TemTourVirtual

### Controle de exibição
ExibirNoSite, DestaqueWeb, SuperDestaqueWeb, Lancamento, ExibirComentarios

### Datas
DataCadastro, DataAtualizacao, DataEntrega, DataLancamento, DataDisponibilizacao, DataImportacao, AnoConstrucao, MesConstrucao, IdadeDoImovel

### Permuta
AceitaPermuta, AceitaPermutaCarro, AceitaPermutaOutro, ValorPermutaImovel, TipoImovelPermuta, LocalizacaoPermuta, QntDormitoriosPermuta, QntSuitesPermuta, QntGaragensPermuta, AnoMinimoVeicPermuta, AceitaPermutaTipoVeiculo

### Financiamento
AceitaFinanciamento, AceitaDacao

### Publicação em portais
ImovelwebTipoPublicacao, VivaRealPublicationType, LoftPublicationType, 123iPublicationType, ChavesNaMaoDestaque, VivaRealDestaqueVivaReal, ZapTipoOferta, OLXFinalidadesPublicadas, MercadoLivreTipoML

### Propriedade
GaragemTipo, GaragemNumeroBox, Face, Fachada, Topografia, PadraoConstrucao, Piso, PisoAreaIntima, PisoDormitorio, PisoSala, Iluminacao, Orientacao, Posicao, PosicaoAndar, AndarDoApto, PeDireitoAlto, FormatodoGalpao, PorteEstrutural

### Financeiro (PRIVADO — não exibir no site)
PercentualComissao, TotalComissao, ValorComissao, ValorLivreProprietario, SaldoDivida, Matricula, InscricaoIptu, InscricaoIptuGaragem, InscricaoMunicipal, InscricaoGas, NumeroEnergiaEletrica, NumeroHidrometro

---

## Exemplo de Imóvel Real (API)

**Apartamento Batel — R$ 7.000.000**
```json
{
  "Codigo": "69803405",
  "Categoria": "Apartamento",
  "BairroComercial": "Batel",
  "Cidade": "Curitiba",
  "Endereco": "Visconde de Guarapuava",
  "Numero": "4593",
  "CEP": "80240-010",
  "UF": "PR",
  "ValorVenda": "7000000",
  "ValorCondominio": "4500",
  "Suites": "3",
  "Vagas": "3",
  "TotalBanheiros": "8",
  "AreaTotal": "470",
  "AreaPrivativa": "263",
  "Status": "Venda",
  "TituloSite": "Apartamento mobiliado com 03 suítes, face norte, localizado no 11º andar do BW Residence, no bairro Batel.",
  "FotoDestaque": "https://cdn.vistahost.com.br/brunoces/vista.imobi/fotos/74166366/...",
  "Latitude": "-25.4434667",
  "Longitude": "-49.2849948",
  "Empreendimento": "Bw Residence",
  "ExibirNoSite": "Sim",
  "DestaqueWeb": "Sim",
  "SuperDestaqueWeb": "Sim",
  "Lancamento": "Nao",
  "DataCadastro": "2024-09-08"
}
```

---

## Regras de Implementação

- Sempre especificar `fields` — sem ele, API retorna apenas o código
- Paginação máxima: 50 por request. Usar `showtotal=1` pra saber total
- Filtrar por `ExibirNoSite: "Sim"` — respeitar controle do Bruno
- Usar `BairroComercial` (não `Bairro`) pra landing pages — é o nome "público" do bairro
- `TituloSite` é o título otimizado pra portais — usar como base do title tag
- `DescricaoWeb` é a descrição completa — usar como conteúdo da página
- Valores vêm como string ("7000000") — converter pra número
- `DestaqueWeb` e `SuperDestaqueWeb` = "Sim"/"Nao" (string, não boolean)
- `Lancamento` = "Sim"/"Nao"
- CDN de imagens: `cdn.vistahost.com.br/brunoces/...`
- Fotos requerem sintaxe especial de campos aninhados (ver seção Fotos)
- **NUNCA** fazer POST/PUT/DELETE em imóveis, clientes ou qualquer recurso que não seja /lead

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
