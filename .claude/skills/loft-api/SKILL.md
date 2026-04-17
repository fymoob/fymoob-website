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
Content-Type: application/x-www-form-urlencoded

cadastro={"lead":{...}}
```

**⚠️ FORMATO CRÍTICO:** Loft REJEITA `application/json` direto no body com 401
*"Você deve informar os dados em json no parâmetro 'cadastro'"*. Precisa ser
`application/x-www-form-urlencoded` com o JSON URL-encoded dentro de `cadastro=...`.

**Implementação:**
```ts
const formBody = new URLSearchParams({
  cadastro: JSON.stringify({ lead: {...} }),
}).toString()

fetch(`${LOFT_BASE_URL}/lead?key=${LOFT_API_KEY}`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: formBody,
})
```

**Campos do lead:**
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

**Resposta sucesso (200):**
```json
{"status": 200, "message": "O cadastro foi encontrado.", "Codigo": N, "Corretor": N}
```

**⚠️ SPAM FILTER IMPORTANTE:** Vista tem filtro anti-spam invisível. Submissions
com dados claramente de teste (`nome: "TESTE"`, `email: "teste@gmail.com"`,
`fone: "9999-9999"`) retornam 200 OK mas NÃO criam lead real — são redirecionados
silenciosamente pro bucket de teste (Código 8826568 "Vanessa/Numero e E-mail Não
Existe" criado em 2017). Validação end-to-end requer dados reais (nome, email
e telefone plausíveis). Descoberto 17/04/2026.

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

## Endpoints de Leads/Clientes (descobertos 17/04/2026)

O CRM armazena leads como "clientes". POST /lead cria entrada em `/clientes/listar`.

### Listar leads/clientes
```
GET /clientes/listar?key={KEY}&pesquisa={JSON}
```

**Exemplo:**
```js
pesquisa: JSON.stringify({
  fields: ["Codigo", "Nome", "EmailResidencial", "FonePrincipal", "DataCadastro", "VeiculoCaptacao", "Observacoes", "Interesse", "Status"],
  filter: { VeiculoCaptacao: "Site FYMOOB" },
  order: { DataCadastro: "desc" },
  paginacao: { pagina: 1, quantidade: 20 },
})
```

**Campos válidos confirmados (24):** `Codigo`, `Nome`, `EmailResidencial`, `EmailComercial`,
`FonePrincipal`, `FoneResidencial`, `FoneComercial`, `Celular`, `DataCadastro`,
`Observacoes`, `VeiculoCaptacao`, `CampanhaImportacao`, `Status`, `Interesse`,
`Profissao`, `MailingList`, `ClienteImportado`, `Investidor`, `Fiador`, `Potencial`,
`CPFCNPJ`, `RG`, `Proprietario`, `Corretor`.

**Campos INVÁLIDOS (apesar de lógicos):** `Email` (usar `EmailResidencial`),
`Fone` (usar `FonePrincipal`), `Veiculo` (usar `VeiculoCaptacao`), `CPF_CGC`
(usar `CPFCNPJ`), `Cidade`, `Bairro`, `CEP` (não expostos em clientes), `Nascimento`,
`Comprador`, `ValorPerfil`, `DormitoriosPerfil`, `Imovelprocurado`.

**Mapeamento POST /lead → campos clientes:**
- `lead.veiculo` → `VeiculoCaptacao`
- `lead.nome` → `Nome`
- `lead.email` → `EmailResidencial`
- `lead.fone` → `FonePrincipal`
- `lead.mensagem` → `Observacoes`
- `lead.interesse` → `Interesse` (Venda/Locação)

### Outros endpoints de clientes (swagger /doc)
- `GET /clientes/imoveisFavoritos` — imóveis favoritados por cliente
- `GET/PUT/POST /clientes/detalhes` — detalhes de cliente (POST = CRIAR, evitar)
- `GET /clientes/listarConteudo` — valores distintos de campos (pra dropdowns)
- `GET /clientes/listarcampos` — 401 (permissão negada na nossa key)
- `POST /clientes/anexos` — upload anexos (NÃO chamar)
- `GET /clientes/perfil/listarcampos` — campos de perfil do cliente
- `GET/POST /clientes/perfil` — perfil de busca do cliente
- `POST /clientes/favoritarimovel` — favoritar (NÃO chamar)
- `DELETE /clientes/remove_relacionamento` — **NUNCA CHAMAR** (destrutivo)
- `POST /rdlead` — integração RD Station
- `POST /seguro/cadastro` — cadastro de seguro
- `GET /gooddata/clientes/ativos` — analytics de clientes ativos

**Scripts de referência no projeto:**
- `scripts/list-recent-leads.mjs` — lista leads com VeiculoCaptacao="Site FYMOOB"
- `scripts/list-latest-all-leads.mjs` — últimos N leads sem filtro
- `scripts/find-my-lead.mjs` — busca por nome/email/data específicos
- `scripts/discover-lead-endpoints.mjs` — descoberta de endpoints por probing
- `scripts/vista-api-spec.json` — spec OpenAPI completo (117 endpoints) baixado de `/doc`

---

## Documentação oficial (Swagger) — 117 endpoints

```
https://brunoces-rest.vistahost.com.br/doc
```

Swagger UI interativo. Spec OpenAPI completo está salvo em `scripts/vista-api-spec.json`.

Endpoints organizados por tags: `Imóveis`, `Clientes`, `Corretores`, `Leads`,
`Empreendimentos`, `Webhooks`, `Relatórios`, `Agência`.

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

### Campo Tipo das Fotos (classificação no CRM)

Ao editar uma foto no CRM Loft/Vista, o campo "Categoria" (mostrado na interface)
é exportado pela API como `Tipo`. O Wagner classifica as fotos escolhendo uma categoria:

| Categoria CRM (UI) | Valor API (`Tipo`) | Uso no site |
|--------------------|-------------------|-------------|
| Imagem | `"Imagem"` | Galeria geral |
| Externa | `"Externa"` | Fotos externas do imóvel |
| Planta | `"Planta"` | Plantas baixas (seção dedicada) |

**Implementação no site:**
- `mapRawToProperty` em `src/services/loft.ts` mantém o array `fotos` (todas as URLs) E
  o array `fotosPorTipo` (com `{ foto, tipo, descricao }` preservando a classificação)
- Página de empreendimento filtra `fotosPorTipo` onde `tipo === "Planta"` para
  alimentar a seção de plantas automaticamente
- Fallback: se nenhuma foto tiver `Tipo = "Planta"`, usa assets estáticos de
  `src/data/empreendimento-assets.ts` (adicionados manualmente)

**Query de exemplo:**
```js
pesquisa: JSON.stringify({
  fields: ["Codigo", { Foto: ["Foto", "Ordem", "Tipo", "Descricao"] }]
})
```

**Instrução para o cliente (Wagner/Bruno):**
> Ao adicionar uma foto de planta baixa no CRM, selecione a categoria "Planta"
> no dropdown de Categoria. O site detecta automaticamente e mostra na seção
> de plantas do empreendimento — sem necessidade de enviar arquivos.

---

## Características do Imóvel (81 campos booleanos)
AceitaPet, Adega, AguaQuente, Alarme, AntenaParabolica, AquecimentoEletrico, ArCentral, ArCondicionado, AreaServico, ArmarioEmbutido, BanheiroAuxiliar, BanheiroSocial, Bar, Calefacao, CanaletasNoRodape, CercaEletrica, Churrasqueira, ConstrucaoAlvenaria, Copa, CopaCozinha, Cozinha, CozinhaAmericana, CozinhaArmarios, CozinhaComTanque, CozinhaMontada, CozinhaPlanejada, Deck, DependenciadeEmpregada, DependenciaDeEmpregada, Despensa, DormitorioComArmario, Edicula, Escritorio, EsperaSplit, EstarIntimo, Forro, FrenteMar, Gabinete, Gradeado, Hidromassagem, HomeTheater, Horta, Internet, JardimInverno, Lareira, Lavabo, Leste, Living, LivingHall, Mezanino, Mobiliado, Monitoramento, Norte, Oeste, Patio, Piscina, PisoElevado, Porao, Quintal, Reformado, Sacada, SacadaComChurrasqueira, Sala, SalaArmarios, SalaEstar, SalaJantar, SalaTV, Sauna, SemiMobiliado, Sotao, Split, SuiteMaster, Sul, Terraco, TVCabo, VigiaExterno, VigiaInterno, VistaMar, VistaPanoramica, Vitrine, WCEmpregada

## Infraestrutura do Condomínio (77 campos booleanos)
Agua, AquecedorSolar, AquecimentoCentral, Bicicletario, Brinquedoteca, CabineDeForca, Canil, CapacidadePiso, ChurrasqueiraCondominio, CircuitoFechadoTV, CondominioFechado, ConstrucaoMista, Coworking, Deposito, EdificioResidencial, Elevador, ElevadorServico, EmpresaDeMonitoramento, EnergiaEletrica, EnergiaTrifasica, EntradaServicoIndependente, EspacoGourmet, EspacoZen, Estacionamento, EstacionamentoVisitantes, Garagem, GaragemCoberta, GasCentral, GeradorEnergia, Gradil, Guarita, Heliponto, HomeMarket, HortaColetiva, Interfone, Jardim, Junker, Lavanderia, Marquise, NomeEmpresaMonitoramento, OnibusProximo, PainelSolar, Parque, Pavimentacao, PetPlace, Pilotis, PiscinaAquecida, PiscinaColetiva, PiscinaInfantil, PistaCaminhada, Playground, PocoArtesiano, PortaoEletronico, Portaria, Portaria24Hrs, PortariaBlindada, PorteiroEletronico, PortoesComEclusa, PossuiViabilidade, QuadraEsportes, QuadraPoliEsportiva, QuadraTenis, Quiosque, RedeEsgoto, SalaDeRecepcao, SalaFitness, SalaoFestas, SalaoJogos, SaunaCondominio, SegurancaPatrimonial, Shaft, Spa, TerracoColetivo, Tour360, Tubulacao, Vigilancia24Horas, Zelador

---

## Endpoint `/imoveis/listarcampos` — fonte oficial de todos os campos

**Descoberto 14/04/2026.** Retorna a lista completa de campos disponíveis na API, organizados por recurso. **Sempre consultar este endpoint antes de assumir que um campo não existe.**

```
GET https://brunoces-rest.vistahost.com.br/imoveis/listarcampos?key={KEY}
Accept: application/json
```

**Resposta:** objeto com 14 chaves — `imoveis`, `carac`, `infra`, `codigo`, `Corretor`, `Agencia`, `Autorizacao`, `Foto`, `FotoEmpreendimento`, `Anexo`, `Video`, `PontoInteresse`, `prontuarios`, `proprietarios`. Cada uma é um array de strings com os nomes dos campos expostos.

**Contagem por recurso (snapshot 14/04/2026):**

| Recurso | Campos |
|---|---|
| `imoveis` | 271 |
| `carac` | 81 (características privativas do imóvel) |
| `infra` | 77 (infraestrutura do condomínio) |
| `Foto` | 13 |
| `Corretor` | 58 |
| `Agencia` | 23 |
| `Video` | 10 |
| `PontoInteresse` | 13 |
| `prontuarios` | 20 |
| `proprietarios` | 149 |

Total: **~735 campos** distribuídos entre os 14 recursos.

---

## Inventário completo por recurso

### `imoveis` — 271 campos

```
123iPublicationType, Aberturas, AceitaDacao, AceitaFinanciamento, AceitaPermuta,
AceitaPermutaCarro, AceitaPermutaOutro, AceitaPermutaTipoVeiculo, AcessoDeficientes,
AdministradoraCondominio, Agenciador, AlugarJaDestaque, AndarDoApto, Andares,
AnoConstrucao, AnoMinimoVeicPermuta, AptosAndar, AptosEdificio, AreaArmazem,
AreaBoxPrivativa, AreaBoxTotal, AreaConstruida, AreaEscritorio, AreaLaje,
AreaLocavel, AreaMezanino, AreaPrivativa, AreaTerreno, AreaTotal, AssuntoProntuario,
Bairro, BairroComercial, BanheiroSocialQtd, Bloco, CEP, CampanhaImportacao,
CaptadorAccountId, CasaMineiraModelo, Categoria, CategoriaGrupo, CategoriaImovel,
CategoriaMestre, Chave, ChaveNaAgencia, ChavesNaMaoDestaque, Cidade, ClasseDoImovel,
Closet, Closets, CodigoAgencia, CodigoCategoria, CodigoCorretor, CodigoEmp,
CodigoEmpreendimento, CodigoEmpresa, CodigoMalote, CodigoMoeda, CodigoProprietario,
Complemento, ComplementoMigrado, Conjutos, Construtora, ConverterMoeda, CorretorNome,
CorretorPrimeiroAge, DataAtualizacao, DataCadastro, DataDisponibilizacao, DataEntrega,
DataFimAutorizacao, DataHoraAtualizacao, DataImportacao, DataInicioAutorizacao,
DataInicioProntuario, DataLancamento, DataProntuario, DescricaoEmpreendimento,
DescricaoWeb, DestaquePetropolisImoveis, DestaqueWeb, DimensoesTerreno,
DivulgarEndereco123i, DivulgarEnderecoLoft, Dormitorios, EEmpreendimento, Elevadores,
EmitiuNotaFiscalComissao, EmpOrulo, Empreendimento, Endereco, EstacionamentoVagas,
EstadoConservacaoEdificio, EstadoConservacaoImovel, EstadoProntuario, Exclusivo,
ExclusivoCorretor, ExibirComentarios, ExibirNoSite, Face, Fachada, Fci, Finalidade,
FolhaSPModelo, FormatodoGalpao, FotoDestaque, FotoDestaqueEmpreendimento,
FotoDestaqueEmpreendimentoPequena, FotoDestaquePequena, FotoProprietario, Frente,
Fundos, GMapsLatitude, GMapsLongitude, GaragemNumeroBox, GaragemTipo,
GrupoSPTipoOferta, HidroSuite, HoraDomFim, HoraDomInicio, HoraFerFim, HoraFerInicio,
HoraSabFim, HoraSabInicio, HoraSegSexFim, HoraSegSexInicio, IdadeDoImovel, Iluminacao,
Imediacoes, ImoCodigo, ImoPlaca, ImoReferenciaExterna,
ImovelaVendaDestaqueImovelaVenda, ImovelwebModelo, ImovelwebTipoPublicacao,
ImportadoMalote, Incompleto, Incorporadora, InformacaoVenda, InicioObra, InscricaoGas,
InscricaoIptu, InscricaoIptuGaragem, InscricaoMunicipal, KeywordsWeb, Lancamento,
Latitude, Limpeza, ListingId, LivingAmbientes, LocacaoAnual, LocacaoTemporada,
LocalCargaEDescarga, LocalizacaoPermuta, LoftPublicationType, LojasEdificio,
Longitude, Lote, LugarCertoDestaqueLugarCerto, Matricula, MercadoLivreTipoML,
MesConstrucao, Midia, Modulos, Moeda, MoedaIndice, Numero, NumeroEnergiaEletrica,
NumeroHidrometro, OLXFinalidadesPublicadas, ObsLocacao, ObsVenda, Observacoes,
Ocupacao, Orientacao, Orulo, PadraoConstrucao, Pais, Pavimentos, PeDireitoAlto,
PendenteProntuario, PercentualComissao, Piso, PisoAreaIntima, PisoDormitorio,
PisoSala, Plantao, PlantaoNoLocal, PorteEstrutural, PortfolioUnico, Posicao,
PosicaoAndar, PotenciaKVA, PrazoDesocupacao, Prestacao, ProjetoArquitetonico,
Proposta, PropostaLocacao, Proprietario, ProprietarioPesquisa, QTDGalpoes,
QntDormitoriosPermuta, QntGaragensPermuta, QntSuitesPermuta, QtdVarandas, Quadra,
Reajuste, Referencia, Regiao, ResponsavelReserva, Salas, SalasEdificio, SaldoDivida,
SeguroIncendio, Setor, Situacao, SrProprietario, Status, Suites, SummerSale,
SuperDestaqueWeb, TemPlaca, TemTourVirtual, TextoAnuncio, TipoEndereco, TipoImovel,
TipoImovelPermuta, TipoOferta321Achei, TipoTeto, TiqueImoveisEmDestaque, TituloSite,
Topografia, TotalBanheiros, TotalComissao, UF, URLVideo, UnitId, UrlVisita, Vagas,
VagasCobertas, VagasDescobertas, ValorACombinar, ValorAluguelPorM2, ValorComissao,
ValorCondominio, ValorCondominioM2, ValorDiaria, ValorIPTUM2, ValorIptu, ValorLimpeza,
ValorLivreProprietario, ValorLocacao, ValorLocacaoM2, ValorM2, ValorPermutaImovel,
ValorTotalAluguel, ValorVenda, ValorVendaM2, Varanda, Venda, VideoDestaque,
VideoDestaqueTipo, Visita, VisitaAcompanhada, VivaRealDestaqueVivaReal,
VivaRealDivulgarEnderecoVivaReal, VivaRealPublicationType, WebEscritoriosDestaque,
ZapTipoOferta, ZeladorNome, ZeladorTelefone, Zona
```

### `carac` — 81 campos (características privativas da unidade)

Usados em `pesquisa.filter` (ex: `"Churrasqueira": "Sim"`) e disponíveis em `/imoveis/detalhes`.

```
AceitaPet, Adega, AguaQuente, Alarme, AntenaParabolica, AquecimentoEletrico,
ArCentral, ArCondicionado, AreaServico, ArmarioEmbutido, BanheiroAuxiliar,
BanheiroSocial, Bar, Calefacao, CanaletasNoRodape, CercaEletrica, Churrasqueira,
ConstrucaoAlvenaria, Copa, CopaCozinha, Cozinha, CozinhaAmericana, CozinhaArmarios,
CozinhaComTanque, CozinhaMontada, CozinhaPlanejada, Deck, DependenciaDeEmpregada,
DependenciadeEmpregada, Despensa, DormitorioComArmario, Edicula, Escritorio,
EsperaSplit, EstarIntimo, Forro, FrenteMar, Gabinete, Gradeado, Hidromassagem,
HomeTheater, Horta, Internet, JardimInverno, Lareira, Lavabo, Leste, Living,
LivingHall, Mezanino, Mobiliado, Monitoramento, Norte, Oeste, Patio, Piscina,
PisoElevado, Porao, Quintal, Reformado, Sacada, SacadaComChurrasqueira, Sala,
SalaArmarios, SalaEstar, SalaJantar, SalaTV, Sauna, SemiMobiliado, Sotao, Split,
SuiteMaster, Sul, TVCabo, Terraco, VigiaExterno, VigiaInterno, VistaMar,
VistaPanoramica, Vitrine, WCEmpregada
```

### `infra` — 77 campos (infraestrutura do condomínio)

```
Agua, AquecedorSolar, AquecimentoCentral, Bicicletario, Brinquedoteca, CabineDeForca,
Canil, CapacidadePiso, ChurrasqueiraCondominio, CircuitoFechadoTV, CondominioFechado,
ConstrucaoMista, Coworking, Deposito, EdificioResidencial, Elevador, ElevadorServico,
EmpresaDeMonitoramento, EnergiaEletrica, EnergiaTrifasica, EntradaServicoIndependente,
EspacoGourmet, EspacoZen, Estacionamento, EstacionamentoVisitantes, Garagem,
GaragemCoberta, GasCentral, GeradorEnergia, Gradil, Guarita, Heliponto, HomeMarket,
HortaColetiva, Interfone, Jardim, Junker, Lavanderia, Marquise,
NomeEmpresaMonitoramento, OnibusProximo, PainelSolar, Parque, Pavimentacao, PetPlace,
Pilotis, PiscinaAquecida, PiscinaColetiva, PiscinaInfantil, PistaCaminhada, Playground,
PocoArtesiano, PortaoEletronico, Portaria, Portaria24Hrs, PortariaBlindada,
PorteiroEletronico, PortoesComEclusa, PossuiViabilidade, QuadraEsportes,
QuadraPoliEsportiva, QuadraTenis, Quiosque, RedeEsgoto, SalaDeRecepcao, SalaFitness,
SalaoFestas, SalaoJogos, SaunaCondominio, SegurancaPatrimonial, Shaft, Spa,
TerracoColetivo, Tour360, Tubulacao, Vigilancia24Horas, Zelador
```

### `Foto` — 13 campos (cada objeto do array `Foto[]`)

```
Codigo, Data, Descricao, Destaque, ExibirNoSite, ExibirSite, Foto, FotoOriginal,
FotoPequena, ImagemCodigo, Ordem, Origem, Tipo
```

**Campo-chave:** `Tipo` — categoriza a foto (ex: `"Planta"`, `"Fachada"`, `"Sala"`, `"Cozinha"`...). Usado em `/empreendimento/[slug]` pra auto-extrair plantas.

### `Video` — 10 campos

```
Codigo, Data, Descricao, DescricaoWeb, Destaque, ExibirNoSite, ExibirSite, Tipo,
Video, VideoCodigo
```

### `Corretor` — 58 campos

```
Administrativo, Agencia, Agenciador, AtuacaoLocacao, AtuacaoVenda, Bairro, Bloco,
CEP, CNH, CNHExpedicao, CNHVencimento, CPF_CGC, CRECI, CategoriaRanking, Celular,
Celular1, Celular2, Chat, Cidade, Codigo, CodigoAgencia, CodigoEquipe, Corretor,
DataUltimoLogin, Datacadastro, Datasaida, Diretor, Email, Empresa, Endereco,
EnderecoComplemento, EnderecoNumero, EnderecoTipo, Equipe, Estadocivil, Exibirnosite,
Fax, Fone, Foto, Gerente, Grupoacesso, Grupoacesso2, Inativo, MetaValordeVendas,
MetadeCaptacoes, Nacionalidade, Nascimento, Nome, Nomecompleto, Observacoes, Pais,
RGEmissor, RG_Inscricao, Ramal, RecebeClientesemTrocaautomática, Sexo, Tipo, UF
```

### `Agencia` — 23 campos

```
Agencia, Bairro, Celular, Cep, Cidade, Cnpj, Codigo, CpfResponsavel, DDD, Email,
Empresa, Endereco, EnderecoComplemento, EnderecoNumero, Fone, Fone2, Nome, Pais,
RazaoSocial, Responsavel, Rresponsavel, Site, Uf
```

### `PontoInteresse` — 13 campos

```
AreaParque, DiaFeira, Distancia, Endereco, EnemEscola, ExtencaoCliclovia, ID,
LinhaCPTM, LinhaMetro, LojasShopping, Nome, NumeroFeirantes, PontoInteresse
```

### `prontuarios` — 20 campos (histórico de atendimento)

```
Anunciado, Assunto, Bairro, Cliente, CodigoCorretor, Corretor, Data, DataAnuncio,
Datainicio, Hora, PROPOSTA, Pendente, Privado, Retranca, SolicitanteChave, Status,
Statusdoimóvel, Texto, ValorProposta, VeiculoPublicado
```

### `proprietarios` — 149 campos (dados do dono do imóvel)

> **PRIVADO — não expor no site.** Só usar pra operações internas (CRM, contratos, etc.).

```
Agencia, AgenteFinanceiro, AniversarioConjugeDia, AniversarioConjugeMes,
AniversarioDia, AniversarioF1Dia, AniversarioF1_Mes, AniversarioF2Dia,
AniversarioF2Mes, AniversarioMes, Autorizado, BairroComercial, BairroPerfil,
BairroResidencial, Banco, Bloco, CEPComercial, CEPResidencial, CNH, CPFCNPJ,
CPFConjuge, CampanhaImportacao, CartaoAdicional, Celular, CelularConjuge,
CidadeComercial, CidadeResidencial, Classe, Cliente, ClienteFavorito,
ClienteImportado, Codigo, CodigoCidadeIBGE, Comprador, ConstrutorVendedor, Conta,
DBM, DBMData, DataAssinatura, DataCadastro, DataEntrada, DataImportacao,
DataNascimento, DataNascimentoConjuge, DataProposta, DormitoriosPerfil,
EmailComercial, EmailConjuge, EmailResidencial, Empresa, EnderecoComercial,
EnderecoComplemento, EnderecoCorrespondencia, EnderecoNumero, EnderecoResidencial,
EnderecoTipo, EstadoCivil, ExibirEmailCliente, ExibirFoneWeb, FaxComercial,
FaxResidencial, Fiador, FilhoAniversario, FilhoAniversario2, FilhoNome, FilhoNome2,
Filhos, FoneComercial, FoneComercialConjuge, FoneExterior, FonePrincipal,
FoneResidencial, FoneresidencialConjuge, FonesOcultos, FormaPgtoAgenciador,
FormaPgtoCorretor, FormaPgtoRoyalties, GaragemPerfil, Honorarioscorretores,
Honorariostotais, ImovelCompradoAreautil, ImovelCompradoEstado, ImovelCompradoNome,
ImovelCompradoPosse, ImovelCompradoQuantos, ImovelCompradoResidentes,
ImovelCompradoSacada, ImovelFinalidade, ImovelProprio, ImovelProprioValor,
ImovelRural, ImovelUrbano, Imovelprocurado, InscricaoEstadual, InscricaoMunicipal,
Interesse, Investidor, MailingList, Motivacao, Nacionalidade, NacionalidadeConjuge,
Nascimento, NascimentoConjuge_Responsavel, Naturalidade, Nome, NomeConjuge,
NumeroBoletim, NumerodeParcelas, Observacoes, ObservacoesProp, OkGerencia,
PaisComercial, PaisResidencial, PercentualRoyalties, Percentualhonorarios,
Potencial, Prazofechamento, Profissao, ProfissaoConjuge, Proprietario,
ProprietarioRestrito, RG, RGConjuge, RGDataExpedicao, RGEmissor, RGEmissorConjuge,
Ramal, RamalConjuge, ReceberInformacoes, RegimeCasamento, Renda, RendaFamiliar,
RendadoCasal, SenhaWeb, Sexo, SituacaoNegocio, Status, TipoPessoa, UFComercial,
UFResidencial, UsuarioWeb, ValorAgenciador, ValorCorretor, ValorEntrada,
ValorImovelComprado, ValorPerfil, ValorSinal, ValorTerceiraParcela, VeiculoCaptacao
```

---

## Campos Principais do Imóvel (organizados por categoria — curado)

### Identificação
Codigo, Referencia, CodigoEmpreendimento, ImoCodigo, ListingId, UnitId

### Classificação
Categoria, Status, Finalidade, Situacao, Ocupacao, Exclusivo, Lancamento, Proposta

### Localização
Endereco, TipoEndereco, Numero, Complemento, Bloco, Bairro, BairroComercial, Cidade, UF, CEP, Pais, Regiao, Zona, Imediacoes, Latitude, Longitude, GMapsLatitude, GMapsLongitude

### Valores
ValorVenda, ValorLocacao, ValorCondominio, ValorIptu, **SeguroIncendio**, **Fci**, ValorM2, ValorVendaM2, ValorLocacaoM2, ValorCondominioM2, ValorIPTUM2, ValorAluguelPorM2, ValorDiaria, ValorLimpeza, ValorTotalAluguel, ValorLivreProprietario, ValorACombinar, Prestacao, SaldoDivida

> **SeguroIncendio + Fci** adicionados 14/04/2026 pela Loft após solicitação. Usar só em imóveis de `Finalidade: "Locação"` ou `"Venda e Locação"` — não aparecem em venda-only.

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
