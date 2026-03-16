export type PropertyType = "Apartamento" | "Casa" | "Sobrado" | "Terreno";

export type PropertyFinalidade = "Venda" | "Locação" | "Venda e Locação";

export type PropertyStatus = "Disponível" | "Vendido" | "Alugado" | "Reservado";

export interface Property {
  codigo: string;
  slug: string;
  url: string;
  titulo: string;
  tipo: PropertyType;
  finalidade: PropertyFinalidade;
  precoVenda: number | null;
  precoAluguel: number | null;
  bairro: string;
  cidade: string;
  estado: string;
  endereco: string;
  latitude: number | null;
  longitude: number | null;
  areaTotal: number | null;
  areaPrivativa: number | null;
  dormitorios: number | null;
  suites: number | null;
  banheiros: number | null;
  vagas: number | null;
  descricao: string;
  fotoDestaque: string;
  fotos: string[];
  status: PropertyStatus;
  dataCadastro: string | null;
  dataAtualizacao: string | null;
}

export interface PropertyFilters {
  tipo?: PropertyType;
  finalidade?: PropertyFinalidade;
  bairro?: string;
  cidade?: string;
  precoMin?: number;
  precoMax?: number;
  dormitoriosMin?: number;
  areaMin?: number;
  areaMax?: number;
  vagasMin?: number;
  busca?: string;
  orderBy?: "preco-asc" | "preco-desc" | "area-asc" | "area-desc" | "recente";
  page?: number;
  limit?: number;
}

export interface BairroSummary {
  bairro: string;
  slug: string;
  total: number;
  tipos: { tipo: PropertyType; count: number }[];
}

export interface TypeSummary {
  tipo: PropertyType;
  slug: string;
  total: number;
}

export interface MockPropertyData {
  total: number;
  dataExtracao: string;
  fonte: string;
  imoveis: Property[];
}

/** Raw response from Loft/Vista API — campos em português */
export interface LoftPropertyRaw {
  Codigo: string;
  Categoria: string;
  Cidade: string;
  Bairro: string;
  ValorVenda: string | null;
  ValorLocacao: string | null;
  Dormitorio: string | null;
  Suites: string | null;
  Vagas: string | null;
  AreaTotal: string | null;
  AreaPrivativa: string | null;
  Descricao: string;
  FotoDestaque: string;
  fotos: string[];
  Status: string;
  Finalidade: string;
}
