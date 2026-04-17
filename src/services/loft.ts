import type {
  Property,
  PropertyFilters,
  BairroSummary,
  BairroMarketStats,
  TypeSummary,
  PropertyType,
  PropertyStats,
  EmpreendimentoSummary,
  LoftPropertyRaw,
} from "@/types/property"
import { slugify } from "@/lib/utils"
import { sortByRelevance } from "@/lib/property-relevance"
import { unstable_cache } from "next/cache"

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const LOFT_BASE_URL = "https://brunoces-rest.vistahost.com.br"
const LOFT_API_KEY = process.env.LOFT_API_KEY || ""
const PAGE_SIZE = 50 // API max per request
// 1 hour — aligned with page-level ISR revalidate on /imovel/[slug].
// Reduces Loft API calls + Next.js ISR writes significantly vs 15min.
// The CRM data doesn't change fast enough to justify a shorter window.
const REVALIDATE_SECONDS = 3600 // 1 hour

// ---------------------------------------------------------------------------
// Characteristic field names (carac + infra) → human-readable labels
// ---------------------------------------------------------------------------

const CARAC_FIELDS = [
  "AceitaPet", "Adega", "AguaQuente", "Alarme", "ArCentral", "ArCondicionado",
  "AreaServico", "ArmarioEmbutido", "BanheiroSocial", "Bar", "Churrasqueira",
  "Copa", "CopaCozinha", "Cozinha", "CozinhaAmericana", "CozinhaArmarios",
  "CozinhaPlanejada", "Deck", "DependenciaDeEmpregada", "Despensa",
  "DormitorioComArmario", "Edicula", "Escritorio", "EsperaSplit", "EstarIntimo",
  "FrenteMar", "Gradeado", "Hidromassagem", "HomeTheater", "Horta", "Internet",
  "JardimInverno", "Lareira", "Lavabo", "Mobiliado", "Piscina", "PisoElevado",
  "Quintal", "Reformado", "Sacada", "SacadaComChurrasqueira", "SalaArmarios",
  "SalaEstar", "SalaJantar", "SalaTV", "Sauna", "SemiMobiliado", "Split",
  "SuiteMaster", "Terraco", "VistaPanoramica", "VistaMar",
] as const

const INFRA_FIELDS = [
  "AcessoDeficientes", "AquecedorSolar", "AquecimentoCentral", "Bicicletario",
  "Brinquedoteca", "ChurrasqueiraCondominio", "CircuitoFechadoTV",
  "CondominioFechado", "Coworking", "Deposito", "Elevador",
  "ElevadorServico", "EmpresaDeMonitoramento", "EspacoGourmet", "EspacoZen",
  "Estacionamento", "EstacionamentoVisitantes", "GasCentral", "Guarita",
  "Heliponto", "HomeMarket", "HortaColetiva", "Interfone", "Jardim", "Lavanderia",
  "PainelSolar", "Parque", "PetPlace", "Pilotis", "PiscinaAquecida",
  "PiscinaColetiva", "PiscinaInfantil", "Playground", "PortaoEletronico",
  "Portaria", "Portaria24Hrs", "PorteiroEletronico", "QuadraEsportes",
  "QuadraTenis", "Quiosque", "SalaFitness", "SalaoFestas", "SalaoJogos",
  "SaunaCondominio", "SegurancaPatrimonial", "Spa", "TerracoColetivo",
  "Vigilancia24Horas", "Zelador",
] as const

const CARAC_LABELS: Record<string, string> = {
  AceitaPet: "Aceita Pet", Adega: "Adega", AguaQuente: "Água Quente",
  Alarme: "Alarme", ArCentral: "Ar Central", ArCondicionado: "Ar Condicionado",
  AreaServico: "Área de Serviço", ArmarioEmbutido: "Armários Embutidos",
  BanheiroSocial: "Banheiro Social", Bar: "Bar", Churrasqueira: "Churrasqueira",
  Copa: "Copa", CopaCozinha: "Copa Cozinha", Cozinha: "Cozinha",
  CozinhaAmericana: "Cozinha Americana", CozinhaArmarios: "Cozinha com Armários",
  CozinhaPlanejada: "Cozinha Planejada", Deck: "Deck",
  DependenciaDeEmpregada: "Dependência de Empregada", Despensa: "Despensa",
  DormitorioComArmario: "Dormitório com Armário", Edicula: "Edícula",
  Escritorio: "Escritório", EsperaSplit: "Espera para Split",
  EstarIntimo: "Estar Íntimo", FrenteMar: "Frente Mar", Gradeado: "Gradeado",
  Hidromassagem: "Hidromassagem", HomeTheater: "Home Theater", Horta: "Horta", Internet: "Internet",
  JardimInverno: "Jardim de Inverno", Lareira: "Lareira", Lavabo: "Lavabo",
  Mobiliado: "Mobiliado", Piscina: "Piscina", PisoElevado: "Piso Elevado", Quintal: "Quintal",
  Reformado: "Reformado", Sacada: "Sacada",
  SacadaComChurrasqueira: "Sacada com Churrasqueira",
  SalaArmarios: "Sala com Armários", SalaEstar: "Sala de Estar",
  SalaJantar: "Sala de Jantar", SalaTV: "Sala de TV", Sauna: "Sauna",
  SemiMobiliado: "Semi Mobiliado", Split: "Split",
  SuiteMaster: "Suíte Master", Terraco: "Terraço",
  VistaPanoramica: "Vista Panorâmica", VistaMar: "Vista para o Mar",
}

const INFRA_LABELS: Record<string, string> = {
  AcessoDeficientes: "Acesso para Deficientes", AquecedorSolar: "Aquecedor Solar",
  AquecimentoCentral: "Aquecimento Central", Bicicletario: "Bicicletário",
  Brinquedoteca: "Brinquedoteca", ChurrasqueiraCondominio: "Churrasqueira Coletiva",
  CircuitoFechadoTV: "Circuito de TV", CondominioFechado: "Condomínio Fechado",
  Coworking: "Coworking", Deposito: "Depósito", Elevador: "Elevador",
  ElevadorServico: "Elevador de Serviço",
  EmpresaDeMonitoramento: "Monitoramento", EspacoGourmet: "Espaço Gourmet",
  EspacoZen: "Espaço Zen", Estacionamento: "Estacionamento",
  EstacionamentoVisitantes: "Estacionamento para Visitantes",
  GasCentral: "Gás Central", Guarita: "Guarita", Heliponto: "Heliponto", HomeMarket: "Home Market",
  HortaColetiva: "Horta Coletiva", Interfone: "Interfone", Jardim: "Jardim",
  Lavanderia: "Lavanderia", PainelSolar: "Painel Solar", Parque: "Parque",
  PetPlace: "Pet Place", Pilotis: "Pilotis",
  PiscinaAquecida: "Piscina Aquecida", PiscinaColetiva: "Piscina Coletiva",
  PiscinaInfantil: "Piscina Infantil", Playground: "Playground",
  PortaoEletronico: "Portão Eletrônico", Portaria: "Portaria",
  Portaria24Hrs: "Portaria 24h", PorteiroEletronico: "Porteiro Eletrônico",
  QuadraEsportes: "Quadra de Esportes", QuadraTenis: "Quadra de Tênis", Quiosque: "Quiosque",
  SalaFitness: "Sala Fitness", SalaoFestas: "Salão de Festas",
  SalaoJogos: "Salão de Jogos", SaunaCondominio: "Sauna",
  SegurancaPatrimonial: "Segurança", Spa: "Spa",
  TerracoColetivo: "Terraço Coletivo", Vigilancia24Horas: "Vigilância 24h",
  Zelador: "Zelador",
}

// ---------------------------------------------------------------------------
// API fields to request
// ---------------------------------------------------------------------------

// Slim fields for cards/listings (~28KB per 50 properties vs ~134KB)
// Nota: Vista API NAO aceita { Foto: [...] } em /imoveis/listar
// (so em /imoveis/detalhes). Fotos adicionais sao carregadas lazy
// via IntersectionObserver -> /api/photos/[code] quando card entra
// em viewport.
const CARD_FIELDS = [
  "Codigo", "Categoria", "Status", "BairroComercial", "Bairro", "Cidade", "UF",
  "ValorVenda", "ValorLocacao", "ValorACombinar", "Dormitorios", "Suites", "Vagas", "TotalBanheiros",
  "AreaPrivativa", "AreaTotal", "FotoDestaque", "TituloSite",
  "ExibirNoSite", "DestaqueWeb", "SuperDestaqueWeb", "Lancamento",
  "Empreendimento", "Construtora", "DataCadastro", "DataAtualizacao",
  "Latitude", "Longitude",
  "FotoDestaquePequena",
]

// Full fields for detail pages (single property)
const DETAIL_FIELDS = [
  "Codigo", "Referencia", "Categoria", "Status", "Finalidade", "Situacao", "Ocupacao",
  "ValorVenda", "ValorLocacao", "ValorCondominio", "ValorIptu", "ValorM2", "ValorACombinar",
  "SeguroIncendio", "Fci",
  "Bairro", "BairroComercial", "Cidade", "Endereco", "Numero", "Complemento",
  "Bloco", "CEP", "UF", "Latitude", "Longitude", "GMapsLatitude", "GMapsLongitude",
  "AreaTotal", "AreaPrivativa", "AreaTerreno", "Dormitorios", "Suites",
  "TotalBanheiros", "Vagas", "QtdVarandas", "Salas",
  "Empreendimento", "CodigoEmpreendimento", "Construtora", "DescricaoEmpreendimento",
  "DescricaoWeb", "TituloSite", "TextoAnuncio", "KeywordsWeb",
  "FotoDestaque", "FotoDestaquePequena", "URLVideo", "TemTourVirtual",
  "ExibirNoSite", "DestaqueWeb", "SuperDestaqueWeb", "Lancamento",
  "AceitaFinanciamento", "AceitaPermuta",
  "Face", "GaragemTipo", "Topografia", "AnoConstrucao",
  "DataCadastro", "DataAtualizacao",
  ...CARAC_FIELDS,
  ...INFRA_FIELDS,
]

// ---------------------------------------------------------------------------
// API fetch helper (GET only — NEVER POST/PUT/DELETE)
// ---------------------------------------------------------------------------

async function fetchLoftAPI<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${LOFT_BASE_URL}${endpoint}`)
  url.searchParams.set("key", LOFT_API_KEY)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    console.error(`[Loft API] ${res.status} on ${endpoint}: ${text.slice(0, 200)}`)
    throw new Error(`Loft API error: ${res.status}`)
  }

  return res.json() as Promise<T>
}

// ---------------------------------------------------------------------------
// Map API raw → Property
// ---------------------------------------------------------------------------

function parseNumber(val: string | undefined | null): number | null {
  if (!val) return null
  const n = parseFloat(val)
  return isNaN(n) || n === 0 ? null : n
}

function parseBool(val: string | undefined): boolean {
  return val === "Sim"
}

function parseOptionalFlag(val: unknown): boolean {
  if (typeof val === "number") return val > 0
  if (typeof val !== "string") return false

  const normalized = val.trim().toLowerCase()
  if (!normalized) return false

  return ["sim", "s", "true", "1", "yes", "y"].includes(normalized)
}

function generateSlug(raw: LoftPropertyRaw): string {
  const tipo = slugify(raw.Categoria || "imovel")
  const bairro = slugify(raw.BairroComercial || raw.Bairro || "curitiba")
  const cidade = slugify(raw.Cidade || "curitiba")
  const uf = (raw.UF || "pr").toLowerCase()
  const dorms = raw.Dormitorios && raw.Dormitorios !== "0" ? `${raw.Dormitorios}-quartos` : ""
  const area = raw.AreaPrivativa ? `${raw.AreaPrivativa}m2` : ""
  const parts = [tipo, bairro, cidade, uf, dorms, area, raw.Codigo].filter(Boolean)
  return parts.join("-")
}

function mapRawToProperty(raw: LoftPropertyRaw): Property {
  const slug = generateSlug(raw)
  const lat = parseNumber(raw.Latitude) ?? parseNumber(raw.GMapsLatitude)
  const lng = parseNumber(raw.Longitude) ?? parseNumber(raw.GMapsLongitude)

  // Extract characteristics that are "Sim"
  const caracteristicas: string[] = []
  for (const field of CARAC_FIELDS) {
    if ((raw as Record<string, unknown>)[field] === "Sim") {
      caracteristicas.push(CARAC_LABELS[field] || field)
    }
  }

  const infraestrutura: string[] = []
  for (const field of INFRA_FIELDS) {
    if ((raw as Record<string, unknown>)[field] === "Sim") {
      infraestrutura.push(INFRA_LABELS[field] || field)
    }
  }

  // Extract photo URLs from nested Foto object
  const fotos: string[] = []
  const fotosPorTipo: { foto: string; tipo: string; descricao: string }[] = []
  if (raw.Foto && typeof raw.Foto === "object") {
    const sorted = Object.values(raw.Foto).sort(
      (a, b) => parseInt(a.Ordem || "0") - parseInt(b.Ordem || "0")
    )
    for (const foto of sorted) {
      if (foto.Foto) {
        fotos.push(foto.Foto)
        fotosPorTipo.push({
          foto: foto.Foto,
          tipo: (foto.Tipo || "").trim(),
          descricao: (foto.Descricao || "").trim(),
        })
      }
    }
  }

  // Map Status to finalidade
  let finalidade: Property["finalidade"] = "Venda"
  const status = raw.Status || ""
  if (status === "Aluguel") finalidade = "Locação"
  else if (status === "Venda e Aluguel") finalidade = "Venda e Locação"
  else if (status === "Venda") finalidade = "Venda"

  // Disponibilidade: BLACKLIST conservadora para nao esconder imoveis por engano.
  // Marcamos como indisponivel APENAS quando o status contem um padrao
  // sabidamente de imovel fora do mercado. Qualquer outro valor (inclusive vazio
  // ou desconhecido) mantem disponivel por padrao. O filtro real de exibicao
  // ja e feito pelo parametro ExibirNoSite=Sim no request Loft — este campo
  // e metadata auxiliar para features futuras (ex: badge "Recem publicado").
  const statusLower = status.toLowerCase()
  const disponivel =
    !statusLower.includes("alugado") &&
    !statusLower.includes("pendente") &&
    !statusLower.includes("suspenso") &&
    !statusLower.includes("vendido") &&
    !statusLower.includes("reservado")

  const titulo = raw.TituloSite
    || raw.TextoAnuncio
    || `${raw.Categoria || "Imóvel"} no ${raw.BairroComercial || raw.Bairro || "Curitiba"}`

  return {
    codigo: raw.Codigo,
    referencia: raw.Referencia || null,
    slug,
    url: `/imovel/${slug}`,
    titulo,
    tituloSite: raw.TituloSite || null,
    textoAnuncio: raw.TextoAnuncio || null,
    tipo: (raw.Categoria || "Apartamento") as PropertyType,
    finalidade,
    status: status as Property["status"],
    disponivel,
    situacao: raw.Situacao || null,
    ocupacao: raw.Ocupacao || null,
    precoVenda: parseNumber(raw.ValorVenda),
    precoAluguel: parseNumber(raw.ValorLocacao),
    valorCondominio: parseNumber(raw.ValorCondominio),
    valorIptu: parseNumber(raw.ValorIptu),
    valorSeguroIncendio: parseNumber(raw.SeguroIncendio),
    valorFci: parseNumber(raw.Fci),
    valorM2: parseNumber(raw.ValorM2),
    valorSobConsulta: parseOptionalFlag(raw.ValorACombinar),
    bairro: raw.BairroComercial || raw.Bairro || "",
    bairroComercial: raw.BairroComercial || raw.Bairro || "",
    cidade: raw.Cidade || "Curitiba",
    estado: raw.UF || "PR",
    endereco: raw.Endereco || "",
    numero: raw.Numero || null,
    complemento: raw.Complemento || null,
    bloco: raw.Bloco || null,
    cep: raw.CEP || null,
    latitude: lat,
    longitude: lng,
    areaTotal: parseNumber(raw.AreaTotal),
    areaPrivativa: parseNumber(raw.AreaPrivativa),
    areaTerreno: parseNumber(raw.AreaTerreno),
    dormitorios: parseNumber(raw.Dormitorios),
    suites: parseNumber(raw.Suites),
    banheiros: parseNumber(raw.TotalBanheiros),
    vagas: parseNumber(raw.Vagas),
    varandas: parseNumber(raw.QtdVarandas),
    salas: parseNumber(raw.Salas),
    empreendimento: raw.Empreendimento || null,
    codigoEmpreendimento: raw.CodigoEmpreendimento || null,
    construtora: raw.Construtora || null,
    descricaoEmpreendimento: raw.DescricaoEmpreendimento || null,
    descricao: raw.DescricaoWeb || raw.TextoAnuncio || "",
    keywordsWeb: raw.KeywordsWeb || null,
    fotoDestaque: raw.FotoDestaque || "",
    fotoDestaquePequena: raw.FotoDestaquePequena || null,
    fotos,
    fotosPorTipo,
    urlVideo: raw.URLVideo || null,
    temTourVirtual: parseBool(raw.TemTourVirtual),
    exibirNoSite: parseBool(raw.ExibirNoSite),
    destaqueWeb: parseBool(raw.DestaqueWeb),
    superDestaqueWeb: parseBool(raw.SuperDestaqueWeb),
    lancamento: parseBool(raw.Lancamento),
    aceitaFinanciamento: parseBool(raw.AceitaFinanciamento),
    aceitaPermuta: parseBool(raw.AceitaPermuta),
    face: raw.Face || null,
    garagemTipo: raw.GaragemTipo || null,
    topografia: raw.Topografia || null,
    anoConstrucao: raw.AnoConstrucao || null,
    caracteristicas,
    infraestrutura,
    dataCadastro: raw.DataCadastro || null,
    dataAtualizacao: raw.DataAtualizacao || null,
  }
}

// ---------------------------------------------------------------------------
// Fetch all properties from API with parallel pagination
// ---------------------------------------------------------------------------

function extractProperties(data: Record<string, unknown>): LoftPropertyRaw[] {
  const results: LoftPropertyRaw[] = []
  for (const [key, value] of Object.entries(data)) {
    if (["total", "paginas", "pagina", "quantidade"].includes(key)) continue
    if (value && typeof value === "object" && "Codigo" in (value as Record<string, unknown>)) {
      results.push(value as LoftPropertyRaw)
    }
  }
  return results
}

async function fetchAllPropertiesRaw(): Promise<Property[]> {
  // First request to get total count
  const firstPesquisa = JSON.stringify({
    fields: CARD_FIELDS,
    filter: { ExibirNoSite: "Sim" },
    paginacao: { pagina: 1, quantidade: PAGE_SIZE },
  })

  const firstData = await fetchLoftAPI<Record<string, unknown>>("/imoveis/listar", {
    pesquisa: firstPesquisa,
    showtotal: "1",
  })

  const total = (firstData.total as number) || 0
  const totalPages = Math.ceil(total / PAGE_SIZE)
  const allRaw = extractProperties(firstData)

  // Fetch remaining pages in parallel
  if (totalPages > 1) {
    const pagePromises = []
    for (let p = 2; p <= totalPages; p++) {
      const pesquisa = JSON.stringify({
        fields: CARD_FIELDS,
        filter: { ExibirNoSite: "Sim" },
        paginacao: { pagina: p, quantidade: PAGE_SIZE },
      })
      pagePromises.push(
        fetchLoftAPI<Record<string, unknown>>("/imoveis/listar", {
          pesquisa,
          showtotal: "1",
        })
      )
    }
    const pages = await Promise.all(pagePromises)
    for (const pageData of pages) {
      allRaw.push(...extractProperties(pageData))
    }
  }

  return allRaw.map(mapRawToProperty)
}

// Cached version using Next.js cache (persists across Vercel Lambdas).
// Tag "imoveis" permite invalidacao granular via POST /api/revalidate
// (ex: webhook pos-sync do CRM Loft/Vista, ou trigger manual do admin).
// Todas as ~12 funcoes publicas derivam deste cache via getAllPropertiesInternal,
// entao 1 tag = invalida tudo do catalogo sem tocar cache de photos/lead/etc.
const getCachedProperties = unstable_cache(
  fetchAllPropertiesRaw,
  ["fymoob-all-properties"],
  { revalidate: REVALIDATE_SECONDS, tags: ["imoveis"] }
)

// ---------------------------------------------------------------------------
// Get all properties (API only)
// ---------------------------------------------------------------------------

async function getAllPropertiesInternal(): Promise<Property[]> {
  if (!LOFT_API_KEY) {
    console.warn("[Loft] LOFT_API_KEY not set — returning empty list")
    return []
  }
  return getCachedProperties()
}

// ---------------------------------------------------------------------------
// Indexed property for fast filtering
// ---------------------------------------------------------------------------

interface IndexedProperty {
  property: Property
  bairroSlug: string
  cidadeSlug: string
  finalidadeSlug: string
  searchableText: string
  price: number | null
}

function indexProperties(properties: Property[]): IndexedProperty[] {
  return properties.map((property) => ({
    property,
    bairroSlug: slugify(property.bairro),
    cidadeSlug: slugify(property.cidade),
    finalidadeSlug: slugify(property.finalidade),
    searchableText: slugify(
      `${property.titulo} ${property.descricao} ${property.bairro} ${property.tipo} ${property.codigo}`
    ),
    price: property.precoVenda ?? property.precoAluguel,
  }))
}

// ---------------------------------------------------------------------------
// Apply filters (in-memory, same logic as before)
// ---------------------------------------------------------------------------

function applyFilters(indexed: IndexedProperty[], filters: PropertyFilters): Property[] {
  const bairroSlugSet =
    filters.bairros?.length
      ? new Set(filters.bairros.map((b) => slugify(b)))
      : filters.bairro
        ? new Set([slugify(filters.bairro)])
        : null
  const cidadeSlugSet =
    filters.cidades?.length
      ? new Set(filters.cidades.map((c) => slugify(c)))
      : filters.cidade
        ? new Set([slugify(filters.cidade)])
        : null
  const finalidadeSlugSetRaw =
    filters.finalidades?.length
      ? new Set(filters.finalidades.map((f) => slugify(f)))
      : filters.finalidade
        ? new Set([slugify(filters.finalidade)])
        : null
  // "Venda e Locação" properties should appear in both Comprar and Alugar results
  const finalidadeSlugSet = finalidadeSlugSetRaw
    ? (() => {
        const expanded = new Set(finalidadeSlugSetRaw)
        if (expanded.has("venda") || expanded.has("locacao")) {
          expanded.add("venda-e-locacao")
        }
        return expanded
      })()
    : null
  const tipoSet =
    filters.tipos?.length
      ? new Set(filters.tipos)
      : filters.tipo
        ? new Set([filters.tipo])
        : null
  const quartosMin = filters.quartosMin ?? filters.dormitoriosMin ?? null
  const codigo = filters.codigo?.trim().toLowerCase() ?? null
  const searchTerms = filters.busca
    ? slugify(filters.busca).split("-").filter(Boolean)
    : []

  const result: Property[] = []

  for (const item of indexed) {
    const p = item.property
    // NOTA: nao filtramos por p.disponivel aqui. A API ja aplica
    // ExibirNoSite=Sim (ver URL_PARAMS_LIST). Filtrar de novo por
    // um status derivado correria risco de sumir imoveis por engano
    // (valor do status vindo da API pode nao matchar lista exata).
    // O campo p.disponivel fica como metadata para features futuras.
    if (tipoSet && !tipoSet.has(p.tipo)) continue
    if (finalidadeSlugSet && !finalidadeSlugSet.has(item.finalidadeSlug)) continue
    if (bairroSlugSet && !bairroSlugSet.has(item.bairroSlug)) continue
    if (cidadeSlugSet && !cidadeSlugSet.has(item.cidadeSlug)) continue
    if (filters.empreendimento && p.empreendimento !== filters.empreendimento) continue
    if (filters.empreendimentos && filters.empreendimentos.length > 0) {
      if (!p.empreendimento || !filters.empreendimentos.includes(p.empreendimento)) continue
    }
    if (filters.lancamento !== undefined && p.lancamento !== filters.lancamento) continue
    if (codigo && !p.codigo.toLowerCase().includes(codigo)) continue
    if (filters.precoMin && (item.price === null || item.price < filters.precoMin)) continue
    if (filters.precoMax && (item.price === null || item.price > filters.precoMax)) continue
    if (quartosMin && (p.dormitorios === null || p.dormitorios < quartosMin)) continue
    if (filters.quartosMax && (p.dormitorios === null || p.dormitorios > filters.quartosMax)) continue
    if (filters.areaMin && (p.areaPrivativa === null || p.areaPrivativa < filters.areaMin)) continue
    if (filters.areaMax && (p.areaPrivativa === null || p.areaPrivativa > filters.areaMax)) continue
    if (filters.vagasMin && (p.vagas === null || p.vagas < filters.vagasMin)) continue
    if (filters.suitesMin && (p.suites === null || p.suites < filters.suitesMin)) continue
    if (filters.banheirosMin && (p.banheiros === null || p.banheiros < filters.banheirosMin)) continue
    if (filters.caracteristicasUnidade && filters.caracteristicasUnidade.length > 0) {
      const unitFeatures = new Set(p.caracteristicas)
      const hasAll = filters.caracteristicasUnidade.every((label) => unitFeatures.has(label))
      if (!hasAll) continue
    }
    if (filters.caracteristicasCondominio && filters.caracteristicasCondominio.length > 0) {
      const condoFeatures = new Set(p.infraestrutura)
      const hasAll = filters.caracteristicasCondominio.every((label) => condoFeatures.has(label))
      if (!hasAll) continue
    }
    if (searchTerms.length > 0 && !searchTerms.every((t) => item.searchableText.includes(t))) continue
    result.push(p)
  }

  // Default: "relevante" (score composto: destaque + qualidade + recência).
  // Ver src/lib/property-relevance.ts para a fórmula.
  const effectiveOrder = filters.orderBy ?? "relevante"
  switch (effectiveOrder) {
    case "preco-asc":
      result.sort((a, b) => (a.precoVenda ?? a.precoAluguel ?? 0) - (b.precoVenda ?? b.precoAluguel ?? 0))
      break
    case "preco-desc":
      result.sort((a, b) => (b.precoVenda ?? b.precoAluguel ?? 0) - (a.precoVenda ?? a.precoAluguel ?? 0))
      break
    case "area-asc":
      result.sort((a, b) => (a.areaPrivativa ?? 0) - (b.areaPrivativa ?? 0))
      break
    case "area-desc":
      result.sort((a, b) => (b.areaPrivativa ?? 0) - (a.areaPrivativa ?? 0))
      break
    case "recente":
      result.sort((a, b) => {
        const da = a.dataAtualizacao ?? a.dataCadastro
        const db = b.dataAtualizacao ?? b.dataCadastro
        if (!da && !db) return 0
        if (!da) return 1
        if (!db) return -1
        return db.localeCompare(da)
      })
      break
    case "relevante":
      return sortByRelevance(result)
  }

  return result
}

// ---------------------------------------------------------------------------
// Public API — same signatures as before
// ---------------------------------------------------------------------------

export async function getProperties(
  filters: PropertyFilters = {}
): Promise<{ properties: Property[]; total: number }> {
  const all = await getAllPropertiesInternal()
  const indexed = indexProperties(all)
  const filtered = applyFilters(indexed, filters)
  const page = filters.page ?? 1
  const limit = filters.limit ?? 20
  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return { properties: paginated, total: filtered.length }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  // Extract property code from slug (last segment after final dash)
  const parts = slug.split("-")
  const codigo = parts[parts.length - 1]

  if (LOFT_API_KEY && codigo) {
    try {
      // Fetch property details and photos in parallel (2 small requests, not 250 properties)
      const [detailData, photoData] = await Promise.all([
        fetchLoftAPI<Record<string, unknown>>("/imoveis/detalhes", {
          imovel: codigo,
          pesquisa: JSON.stringify({ fields: DETAIL_FIELDS }),
        }),
        fetchLoftAPI<Record<string, unknown>>("/imoveis/detalhes", {
          imovel: codigo,
          pesquisa: JSON.stringify({ fields: ["Codigo", { Foto: ["Foto", "Ordem", "Tipo", "Descricao"] }] }),
        }),
      ])

      if (detailData && "Codigo" in detailData) {
        // Merge photo data into detail data
        const merged = { ...detailData, Foto: photoData?.Foto } as LoftPropertyRaw
        return mapRawToProperty(merged)
      }
    } catch {
      // Fallback to list search below
    }
  }

  // Fallback: search in all properties
  const all = await getAllPropertiesInternal()
  return all.find((p) => p.slug === slug) ?? null
}

export async function getPropertiesByBairro(bairro: string, limit?: number): Promise<Property[]> {
  const all = await getAllPropertiesInternal()
  const filtered = all.filter((p) => slugify(p.bairro) === slugify(bairro))
  return limit ? filtered.slice(0, limit) : filtered
}

function avg(nums: number[]): number | null {
  if (nums.length === 0) return null
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length)
}

// Agregação de dados de mercado por bairro — fonte: Loft API (tempo real).
// Usado na página /imoveis/[bairro] para mostrar stats no estilo Zillow.
export async function getBairroMarketStats(bairroSlug: string): Promise<BairroMarketStats | null> {
  const all = await getAllPropertiesInternal()
  const properties = all.filter((p) => slugify(p.bairro) === bairroSlug)
  if (properties.length === 0) return null

  const venda = properties.filter((p) => p.finalidade === "Venda" && p.precoVenda && p.precoVenda > 0)
  const aluguel = properties.filter((p) => p.finalidade === "Locação" && p.precoAluguel && p.precoAluguel > 0)

  const precosVenda = venda.map((p) => p.precoVenda!).filter((v) => v > 0)
  const precosAluguel = aluguel.map((p) => p.precoAluguel!).filter((v) => v > 0)
  const areasVenda = venda.map((p) => p.areaPrivativa).filter((v): v is number => v != null && v > 0)

  const precosM2 = venda
    .map((p) => {
      const area = p.areaPrivativa
      if (!area || area <= 0 || !p.precoVenda || p.precoVenda <= 0) return null
      return p.precoVenda / area
    })
    .filter((v): v is number => v != null && isFinite(v) && v > 0)

  // Preço médio por Nº de dormitórios (só venda para ser comparável)
  const porQuartosAcc = new Map<string, number[]>()
  for (const p of venda) {
    if (p.dormitorios == null || p.dormitorios <= 0) continue
    const key = p.dormitorios >= 5 ? "5+" : String(p.dormitorios)
    if (!porQuartosAcc.has(key)) porQuartosAcc.set(key, [])
    porQuartosAcc.get(key)!.push(p.precoVenda!)
  }
  const precoMedioPorQuartos: Record<string, number> = {}
  for (const [key, prices] of porQuartosAcc) {
    const m = avg(prices)
    if (m != null) precoMedioPorQuartos[key] = m
  }

  return {
    bairro: properties[0].bairro,
    slug: bairroSlug,
    totalAtivos: properties.length,
    totalVenda: venda.length,
    totalAluguel: aluguel.length,
    precoMedioVenda: avg(precosVenda),
    precoMedioAluguel: avg(precosAluguel),
    precoM2Medio: avg(precosM2),
    precoMinVenda: precosVenda.length > 0 ? Math.min(...precosVenda) : null,
    precoMaxVenda: precosVenda.length > 0 ? Math.max(...precosVenda) : null,
    areaMediaVenda: avg(areasVenda),
    precoMedioPorQuartos,
  }
}

export async function getPropertiesByType(tipo: PropertyType, limit?: number): Promise<Property[]> {
  const all = await getAllPropertiesInternal()
  const filtered = all.filter((p) => p.tipo === tipo)
  return limit ? filtered.slice(0, limit) : filtered
}

export async function getAllBairros(limit?: number): Promise<BairroSummary[]> {
  const all = await getAllPropertiesInternal()
  const { bairroImages } = await import("@/lib/bairro-images")

  const bairroMap = new Map<string, { total: number; tipos: Map<PropertyType, number>; cidadeCount: Map<string, number>; finalidadeCount: Map<string, number>; quartosCount: Map<string, number> }>()
  for (const p of all) {
    const key = p.bairro
    if (!key) continue
    if (!bairroMap.has(key)) bairroMap.set(key, { total: 0, tipos: new Map(), cidadeCount: new Map(), finalidadeCount: new Map(), quartosCount: new Map() })
    const entry = bairroMap.get(key)!
    entry.total++
    entry.tipos.set(p.tipo, (entry.tipos.get(p.tipo) ?? 0) + 1)
    entry.cidadeCount.set(p.cidade, (entry.cidadeCount.get(p.cidade) ?? 0) + 1)
    const fin = p.finalidade || "Venda"
    entry.finalidadeCount.set(fin, (entry.finalidadeCount.get(fin) ?? 0) + 1)
    if (p.dormitorios != null && p.dormitorios > 0) {
      const qKey = p.dormitorios >= 5 ? "5+" : String(p.dormitorios)
      entry.quartosCount.set(qKey, (entry.quartosCount.get(qKey) ?? 0) + 1)
    }
  }

  const result = Array.from(bairroMap.entries())
    .map(([bairro, info]) => {
      // Pick the most common city for this bairro
      let topCidade = ""
      let topCount = 0
      for (const [cidade, count] of info.cidadeCount) {
        if (count > topCount) { topCidade = cidade; topCount = count }
      }
      return {
        bairro,
        slug: slugify(bairro),
        total: info.total,
        cidade: topCidade,
        tipos: Array.from(info.tipos.entries()).map(([tipo, count]) => ({ tipo, count })),
        porFinalidade: Object.fromEntries(info.finalidadeCount),
        porQuartos: Object.fromEntries(info.quartosCount),
        imageUrl: bairroImages[bairro],
      }
    })
    .sort((a, b) => b.total - a.total)

  return limit ? result.slice(0, limit) : result
}

export async function getAllCities(): Promise<string[]> {
  const all = await getAllPropertiesInternal()
  const citySet = new Set<string>()
  for (const p of all) citySet.add(p.cidade)
  return Array.from(citySet).sort((a, b) => a.localeCompare(b, "pt-BR"))
}

export async function getSimilarProperties(property: Property, limit: number = 4): Promise<Property[]> {
  const all = await getAllPropertiesInternal()
  const price = property.precoVenda ?? property.precoAluguel ?? 0

  // Score each property by similarity (higher = more similar)
  const scored = all
    .filter((p) => p.slug !== property.slug)
    .map((p) => {
      let score = 0

      // Must match finalidade (hard filter) — never mix venda with locação
      if (p.finalidade !== property.finalidade) return { property: p, score: -1 }

      // Same tipo (Apartamento, Casa, etc.) — strongest signal
      if (p.tipo === property.tipo) score += 30

      // Same bairro — strong location signal
      if (p.bairro === property.bairro) score += 25

      // Same cidade (relevant when bairro differs)
      if (p.cidade === property.cidade) score += 5

      // Similar number of bedrooms (±1)
      if (property.dormitorios && p.dormitorios) {
        const diff = Math.abs(p.dormitorios - property.dormitorios)
        if (diff === 0) score += 15
        else if (diff === 1) score += 8
      }

      // Similar price range (within 30%)
      const pPrice = p.precoVenda ?? p.precoAluguel ?? 0
      if (price > 0 && pPrice > 0) {
        const ratio = pPrice / price
        if (ratio >= 0.7 && ratio <= 1.3) score += 20
        else if (ratio >= 0.5 && ratio <= 1.5) score += 10
        else if (ratio >= 0.3 && ratio <= 2.0) score += 3
      }

      // Similar area (within 30%)
      if (property.areaPrivativa && p.areaPrivativa) {
        const areaRatio = p.areaPrivativa / property.areaPrivativa
        if (areaRatio >= 0.7 && areaRatio <= 1.3) score += 10
        else if (areaRatio >= 0.5 && areaRatio <= 1.5) score += 5
      }

      return { property: p, score }
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((s) => s.property)
}

export async function getAllSlugs(): Promise<string[]> {
  const all = await getAllPropertiesInternal()
  return all.map((p) => p.slug)
}

export async function getAllTypes(): Promise<TypeSummary[]> {
  const all = await getAllPropertiesInternal()
  const typeMap = new Map<PropertyType, { total: number; porFinalidade: Map<string, number> }>()
  for (const p of all) {
    if (!typeMap.has(p.tipo)) typeMap.set(p.tipo, { total: 0, porFinalidade: new Map() })
    const entry = typeMap.get(p.tipo)!
    entry.total++
    const fin = p.finalidade || "Venda"
    entry.porFinalidade.set(fin, (entry.porFinalidade.get(fin) ?? 0) + 1)
  }
  return Array.from(typeMap.entries()).map(([tipo, info]) => ({
    tipo,
    slug: slugify(tipo),
    total: info.total,
    porFinalidade: Object.fromEntries(info.porFinalidade),
  }))
}

export async function getFeaturedProperties(limit: number = 8): Promise<Property[]> {
  if (LOFT_API_KEY) {
    try {
      const pesquisa = JSON.stringify({
        fields: CARD_FIELDS,
      })
      const data = await fetchLoftAPI<Record<string, unknown>>("/imoveis/destaques", { pesquisa })

      const featured: Property[] = []
      for (const [, value] of Object.entries(data)) {
        if (value && typeof value === "object" && "Codigo" in (value as Record<string, unknown>)) {
          featured.push(mapRawToProperty(value as LoftPropertyRaw))
        }
      }
      return featured.slice(0, limit)
    } catch {
      // Fallback below
    }
  }

  const all = await getAllPropertiesInternal()
  const withPhotos = all.filter((p) => p.fotoDestaque && p.fotos.length > 0)
  return withPhotos.slice(0, limit)
}

export async function getPropertyStats(): Promise<PropertyStats> {
  const all = await getAllPropertiesInternal()
  const precos = all
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)

  const tipoMap = new Map<PropertyType, number>()
  for (const p of all) tipoMap.set(p.tipo, (tipoMap.get(p.tipo) ?? 0) + 1)

  return {
    total: all.length,
    precoMin: precos.length > 0 ? Math.min(...precos) : null,
    precoMax: precos.length > 0 ? Math.max(...precos) : null,
    porTipo: Array.from(tipoMap.entries()).map(([tipo, count]) => ({ tipo, count })),
  }
}

// ---------------------------------------------------------------------------
// New: Empreendimentos
// ---------------------------------------------------------------------------

export async function getAllEmpreendimentos(): Promise<EmpreendimentoSummary[]> {
  const all = await getAllPropertiesInternal()
  const empMap = new Map<string, Property[]>()

  for (const p of all) {
    if (!p.empreendimento) continue
    if (!empMap.has(p.empreendimento)) empMap.set(p.empreendimento, [])
    empMap.get(p.empreendimento)!.push(p)
  }

  return Array.from(empMap.entries())
    .map(([nome, properties]) => {
      const precos = properties
        .map((p) => p.precoVenda ?? p.precoAluguel)
        .filter((p): p is number => p !== null && p > 0)
      const bairros = [...new Set(properties.map((p) => p.bairro).filter(Boolean))]

      return {
        nome,
        slug: slugify(nome),
        total: properties.length,
        construtora: properties.find((p) => p.construtora)?.construtora ?? null,
        bairros,
        imageUrl: properties[0]?.fotoDestaque || null,
        precoMin: precos.length > 0 ? Math.min(...precos) : null,
        precoMax: precos.length > 0 ? Math.max(...precos) : null,
      }
    })
    .filter((e) => e.nome.trim() !== "")
    .sort((a, b) => b.total - a.total)
}

export async function getPropertiesByEmpreendimento(empreendimento: string): Promise<Property[]> {
  const all = await getAllPropertiesInternal()
  return all.filter((p) => p.empreendimento === empreendimento)
}
