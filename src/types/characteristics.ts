/**
 * Caracteristicas e infraestrutura da unidade — taxonomia compartilhada
 * entre services/loft.ts (mapping raw) e componentes de filtro.
 *
 * Fase 20.W2.7: extraido de services/loft.ts pra eliminar import cross-layer
 * (componentes de filtro importavam direto de services).
 *
 * Fonte: campos `Caracteristicas` e `InfraEstrutura` do payload da Loft API
 * (CRM Vista). Todos os campos da Loft vem como `"Sim"` ou `"Não"`.
 */

export const CARAC_FIELDS = [
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

export const INFRA_FIELDS = [
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

export const CARAC_LABELS: Record<string, string> = {
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

export const INFRA_LABELS: Record<string, string> = {
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

/**
 * Caracteristicas como objeto map<string, "Sim" | "Não"> retornado pela Loft.
 * Substitui assertions `as Record<string, unknown>` em mapRawToProperty.
 */
export type LoftCharacteristicsMap = Record<string, "Sim" | "Não" | string>
