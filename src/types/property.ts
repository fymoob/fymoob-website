export type PropertyType =
  | "Apartamento"
  | "Apartamento Duplex"
  | "Casa"
  | "Casa em Condomínio"
  | "Chácara"
  | "Cobertura"
  | "Empreendimento"
  | "Kitnet"
  | "Loja"
  | "Ponto Comercial"
  | "Prédio Comercial"
  | "Sala Comercial"
  | "Salas/Conjuntos"
  | "Sobrado"
  | "Studio"
  | "Terreno"
  | "Terreno Comercial";

export type PropertyFinalidade = "Venda" | "Locação" | "Venda e Locação";

export type PropertyStatus = "Disponível" | "Vendido" | "Alugado" | "Reservado";

export type PropertyPageVariant = "standard" | "premium";
export type PropertyPageVariantOverride = "auto" | "standard" | "premium";

export interface Property {
  // Identificação
  codigo: string;
  referencia: string | null;
  slug: string;
  url: string;
  titulo: string;
  tituloSite: string | null;
  textoAnuncio: string | null;

  // Classificação
  tipo: PropertyType;
  finalidade: PropertyFinalidade;
  status: PropertyStatus;
  situacao: string | null;
  ocupacao: string | null;

  // Valores
  precoVenda: number | null;
  precoAluguel: number | null;
  valorCondominio: number | null;
  valorIptu: number | null;
  valorM2: number | null;
  valorSobConsulta: boolean;

  // Localização
  bairro: string;
  bairroComercial: string;
  cidade: string;
  estado: string;
  endereco: string;
  numero: string | null;
  complemento: string | null;
  bloco: string | null;
  cep: string | null;
  latitude: number | null;
  longitude: number | null;

  // Dimensões
  areaTotal: number | null;
  areaPrivativa: number | null;
  areaTerreno: number | null;
  dormitorios: number | null;
  suites: number | null;
  banheiros: number | null;
  vagas: number | null;
  varandas: number | null;
  salas: number | null;

  // Empreendimento
  empreendimento: string | null;
  codigoEmpreendimento: string | null;
  construtora: string | null;
  descricaoEmpreendimento: string | null;

  // Conteúdo
  descricao: string;
  keywordsWeb: string | null;

  // Mídia
  fotoDestaque: string;
  fotoDestaquePequena: string | null;
  fotos: string[];
  fotosPorTipo: { foto: string; tipo: string; descricao: string }[];
  urlVideo: string | null;
  temTourVirtual: boolean;

  // Controle de exibição
  exibirNoSite: boolean;
  destaqueWeb: boolean;
  superDestaqueWeb: boolean;
  lancamento: boolean;

  // Flags comerciais
  aceitaFinanciamento: boolean;
  aceitaPermuta: boolean;

  // Propriedade
  face: string | null;
  garagemTipo: string | null;
  topografia: string | null;
  anoConstrucao: string | null;

  // Características e infraestrutura (nomes legíveis)
  caracteristicas: string[];
  infraestrutura: string[];

  // Datas
  dataCadastro: string | null;
  dataAtualizacao: string | null;
}

export interface PropertyFilters {
  tipo?: PropertyType;
  tipos?: PropertyType[];
  finalidade?: PropertyFinalidade;
  finalidades?: PropertyFinalidade[];
  bairro?: string;
  bairros?: string[];
  cidade?: string;
  cidades?: string[];
  codigo?: string;
  empreendimento?: string;
  precoMin?: number;
  precoMax?: number;
  dormitoriosMin?: number;
  quartosMin?: number;
  areaMin?: number;
  areaMax?: number;
  vagasMin?: number;
  suitesMin?: number;
  banheirosMin?: number;
  lancamento?: boolean;
  busca?: string;
  orderBy?: "preco-asc" | "preco-desc" | "area-asc" | "area-desc" | "recente";
  page?: number;
  limit?: number;
}

export interface BairroSummary {
  bairro: string;
  slug: string;
  total: number;
  cidade: string;
  tipos: { tipo: PropertyType; count: number }[];
  porFinalidade: Record<string, number>;
  imageUrl?: string;
}

export interface TypeSummary {
  tipo: PropertyType;
  slug: string;
  total: number;
  porFinalidade: Record<string, number>;
}

export interface EmpreendimentoSummary {
  nome: string;
  slug: string;
  total: number;
  construtora: string | null;
  bairros: string[];
  imageUrl: string | null;
  precoMin: number | null;
  precoMax: number | null;
}

export interface PropertyStats {
  total: number;
  precoMin: number | null;
  precoMax: number | null;
  porTipo: { tipo: PropertyType; count: number }[];
}

/** Raw response from Loft/Vista API — campos em português */
export interface LoftPropertyRaw {
  Codigo: string;
  Referencia?: string;
  Categoria: string;
  Status: string;
  Finalidade?: string;
  Situacao?: string;
  Ocupacao?: string;

  // Valores (strings da API — converter pra number)
  ValorVenda?: string;
  ValorLocacao?: string;
  ValorCondominio?: string;
  ValorIptu?: string;
  ValorM2?: string;
  ValorACombinar?: string;

  // Localização
  Bairro: string;
  BairroComercial?: string;
  Cidade: string;
  Endereco?: string;
  Numero?: string;
  Complemento?: string;
  Bloco?: string;
  CEP?: string;
  UF?: string;
  Latitude?: string;
  Longitude?: string;
  GMapsLatitude?: string;
  GMapsLongitude?: string;

  // Dimensões (strings — converter)
  AreaTotal?: string;
  AreaPrivativa?: string;
  AreaTerreno?: string;
  Dormitorios?: string;
  Suites?: string;
  TotalBanheiros?: string;
  Vagas?: string;
  QtdVarandas?: string;
  Salas?: string;

  // Empreendimento
  Empreendimento?: string;
  CodigoEmpreendimento?: string;
  Construtora?: string;
  DescricaoEmpreendimento?: string;

  // Conteúdo
  DescricaoWeb?: string;
  TituloSite?: string;
  TextoAnuncio?: string;
  KeywordsWeb?: string;

  // Mídia
  FotoDestaque?: string;
  FotoDestaquePequena?: string;
  FotoDestaqueEmpreendimento?: string;
  URLVideo?: string;
  TemTourVirtual?: string;
  Foto?: Record<string, { Foto: string; FotoPequena?: string; FotoOriginal?: string; Ordem?: string; Destaque?: string; Descricao?: string; Tipo?: string }>;

  // Controle de exibição ("Sim"/"Nao")
  ExibirNoSite?: string;
  DestaqueWeb?: string;
  SuperDestaqueWeb?: string;
  Lancamento?: string;

  // Flags comerciais ("Sim"/"Nao")
  AceitaFinanciamento?: string;
  AceitaPermuta?: string;

  // Propriedade
  Face?: string;
  GaragemTipo?: string;
  Topografia?: string;
  AnoConstrucao?: string;

  // Datas
  DataCadastro?: string;
  DataAtualizacao?: string;

  // Características (booleanos "Sim"/"Nao" — campos dinâmicos)
  [key: string]: unknown;
}
