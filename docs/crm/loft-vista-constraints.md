# Limitações Conhecidas — Loft/Vista CRM

> **Fonte:** Research consolidado + auditorias empíricas via API 18-20/04/2026.
> **Status:** Referência ativa de dores e workarounds.

---

## Regras absolutas

### ⚠️ REGRA INEGOCIÁVEL

**NUNCA executar operações de exclusão ou modificação destrutiva na API do Loft/Vista em produção.**

- NUNCA chamar endpoints de DELETE
- NUNCA chamar PUT/POST que remova, sobrescreva ou limpe dados
- NUNCA executar scripts que possam alterar/apagar dados no CRM do cliente
- Usar a API APENAS para **LEITURA (GET)** e **envio de leads (POST /lead)**
- Se precisar testar escrita, usar APENAS sandbox (`sandbox-rest.vistahost.com.br`)

**Dados do cliente são sagrados.** Um PUT mal feito em 250+ imóveis é irreversível.

---

## API — o que tem e o que não tem

### Endpoints disponíveis (GET only)

- `/imoveis/listar` — listagem (max 50/página)
- `/imoveis/detalhes` — detalhe individual
- `/imoveis/destaques` — marcados DestaqueWeb=Sim
- `/imoveis/listarcampos` — schema de campos

### Endpoint POST autorizado

- `/lead` — único POST permitido (envio de lead após usuário preencher form)

### O que Loft/Vista NÃO oferece

- ❌ **Webhook** — zero endpoints de notification/push/callback
- ❌ **Subscription** — não dá pra "escutar" mudanças em real-time
- ❌ **Customização de validação por cliente** — schema rígido, igual pra todos
- ❌ **Custom domain no share button** — minisite sempre em `v.imo.bi`
- ❌ **Bulk edit via API** — só via painel manual
- ❌ **Scheduled publishing** — imóvel com "publicar dia 20" não existe
- ❌ **API de escrita acessível** — mesmo se tecnicamente existe, está fora do escopo permitido

---

## Schema — campos descobertos empiricamente

### Caracteristicas (object nested, 79 keys únicas)

Amostra:
```
"Aceita Pet", "Adega", "Agua Quente", "Alarme", "Antena Parabolica",
"Aquecimento Eletrico", "Ar Central", "Ar Condicionado", "Area Servico",
"Armario Embutido", "Banheiro Auxiliar", "Banheiro Social", "Bar",
"Calefacao", "Canaletas No Rodape", "Cerca Eletrica", "Churrasqueira",
"Construcao Alvenaria", "Copa", "Copa Cozinha", "Cozinha",
"Cozinha Americana", "Cozinha Com Tanque", "Cozinha Montada",
"Cozinha Planejada", "Deck", "Dependencia De Empregada",
"Dependenciade Empregada", "Despensa", "Dormitorio Com Armario",
"Edicula", "Escritorio", "Espera Split", "Estar Intimo", "Forro",
"Frente Mar", "Gabinete", "Gradeado", "Hidromassagem", "Home Theater",
"Horta", "Jardim Inverno", "Lareira", "Lavabo", "Leste", "Living",
"Living Hall", "Mezanino", "Mobiliado", "Monitoramento", "Norte",
"Oeste", "Patio", "Piscina", "Piso Elevado", "Porao", "Quintal",
"Reformado", "Sacada", "Sacada Com Churrasqueira", "Sala",
"Sala Armarios", "Sala Estar", "Sala Jantar", "Sala T V", "Sauna",
"Semi Mobiliado", "Sotao", "Split", "Suite Master", "Sul", "T V Cabo",
"Terraco", "Vigia Externo", "Vigia Interno", "Vista Mar",
"Vista Panoramica", "Vitrine", "W C Empregada"
```

Valores possíveis por chave: `"Sim"`, `"Nao"`, `"Não"`, `""` (vazio), string (raro).

### InfraEstrutura (object nested, 77 keys únicas)

Amostra:
```
"Agua", "Aquecedor Solar", "Aquecimento Central", "Bicicletario",
"Brinquedoteca", "Cabine De Forca", "Canil", "Capacidade Piso",
"Churrasqueira Condominio", "Circuito Fechado T V", "Condominio Fechado",
"Construcao Mista", "Coworking", "Deposito", "Edificio Residencial",
"Elevador", "Elevador Servico", "Empresa De Monitoramento",
"Energia Eletrica", "Energia Trifasica", "Entrada Servico Independente",
"Espaco Gourmet", "Espaco Zen", "Estacionamento",
"Estacionamento Visitantes", "Garagem", "Garagem Coberta", "Gas Central",
"Gerador Energia", "Gradil", "Guarita", "Heliponto", "Home Market",
"Horta Coletiva", "Interfone", "Jardim", "Junker", "Lavanderia",
"Marquise", "Nome Empresa Monitoramento", "Onibus Proximo",
"Painel Solar", "Parque", "Pavimentacao", "Pet Place", "Pilotis",
"Piscina Aquecida", "Piscina Coletiva", "Piscina Infantil",
"Pista Caminhada", "Playground", "Poco Artesiano", "Portao Eletronico",
"Portaria", "Portaria Blindada", "Portaria24 Hrs", "Porteiro Eletronico",
"Portoes Com Eclusa", "Possui Viabilidade", "Quadra Esportes",
"Quadra Poli Esportiva", "Quadra Tenis", "Quiosque", "Rede Esgoto",
"Sala De Recepcao", "Sala Fitness", "Salao Festas", "Salao Jogos",
"Sauna Condominio", "Seguranca Patrimonial", "Shaft", "Spa",
"Terraco Coletivo", "Tour360", "Tubulacao", "Vigilancia24 Horas",
"Zelador"
```

### Dados empíricos do catálogo FYMOOB (20/04/2026)

```
Total imóveis ativos: 236 (ExibirNoSite=Sim)
Total imóveis CRM: 1.479 (todos os status)
Cidades únicas: 8
  219 Curitiba (93%)
    5 Araucária
    3 São José dos Pinhais
    2 Campo Largo
    2 Colombo
    1 São João do Triunfo
    1 Fazenda Rio Grande
    1 Piraquara
Bairros únicos: 63
  Top 3: Portão (24), Mossunguê (18), Cidade Industrial (17)
Duplicata entre cidades: Centro (Curitiba + Araucária)
```

---

## Inconsistências conhecidas no schema

### Keys "quebradas" (nosso mapping humaniza)

| Key API | Label amigável |
|---|---|
| `Sala T V` | Sala de TV |
| `T V Cabo` | TV a Cabo |
| `W C Empregada` | WC de Empregada |
| `Circuito Fechado T V` | Circuito Fechado de TV |
| `Portaria24 Hrs` | Portaria 24h |
| `Vigilancia24 Horas` | Vigilância 24h |
| `Dependenciade Empregada` / `Dependencia De Empregada` | Dependência de Empregada |
| `Agua Quente` | Água Quente |
| `Ar Condicionado` | Ar-Condicionado |
| `Jardim Inverno` | Jardim de Inverno |
| `Poco Artesiano` | Poço Artesiano |
| `Antena Parabolica` | Antena Parabólica |
| `Vista Mar` | Vista para o Mar |
| `Vista Panoramica` | Vista Panorâmica |
| `Frente Mar` | Frente para o Mar |
| `Onibus Proximo` | Próximo a Ônibus |

Lista completa em [src/lib/utils.ts](../../src/lib/utils.ts) → `CARAC_OVERRIDES`.

### Status vs Finalidade (incongruência do CRM)

Status do imóvel no CRM (ex: `"Aluguel"`) **nem sempre bate** com a realidade dos valores:
- Imóvel com Status=Aluguel pode ter tanto `ValorVenda` quanto `ValorLocacao` preenchidos (é **dual**)
- Só Status=Aluguel sem ValorLocacao é raro mas existe
- Campo `Finalidade` vem frequentemente vazio

**Fix implementado em [src/services/loft.ts](../../src/services/loft.ts)** (`mapRawToProperty`):
- Deriva finalidade pelos **valores** (ValorVenda + ValorLocacao) em vez de Status
- Fallback pra Status quando valores estão vazios

### Bairros com grafias inconsistentes (entre imóveis diferentes)

Exemplos descobertos:
- `"Sitio Cercado"` vs `"Sítio Cercado"` (sem acento vs com)
- `"Água Verde"` sempre com acento (não duplicou)
- `"Cabral"` com typo no TítuloSite: "Cabrall Hills" (imóvel AP00296)

**Fix:** `getAllBairros` agrega por slug normalizado + escolhe label canônico (mais frequente + mais diacríticos).

---

## Imóveis com dados inconsistentes (avisar Bruno)

Descobertos 18/04/2026 via audit:

| Código | Problema |
|---|---|
| `69804924` | Campina do Siqueira — ValorLocacao R$ 0,01 (erro de digitação) |
| `69803584` | Cidade Industrial — Status=Venda mas tem ambos valores (é dual) |
| `69804378` | São Gabriel Colombo — Status=Aluguel mas tem ValorVenda R$145k (é dual) |

**Ação pendente:** Bruno revisar os 4 imóveis no CRM.

---

## Títulos problemáticos (audit 19/04)

```
Total imóveis ativos: 236
Títulos com > 90 chars: 68 (29%)
Títulos com > 200 chars: 3 (dois sobrados no Capão Raso com MESMO texto duplicado 237 chars)
Títulos com ALL CAPS gritante: 4 (ex: "BIOOS HEALTH")
Títulos com typos óbvios: "Cabrall Hills" (AP00296)
```

Ver [docs/seo/title-optimization-research.md](../seo/title-optimization-research.md) pra estratégia de padronização.

---

## Workarounds mapeados pra limitações Loft

### Limitação: Sem webhook
**Workaround:** Smart polling com cron externo + cursor-based delta via `DataAtualizacao`. Ver [crm-integration-patterns.md](../architecture/crm-integration-patterns.md).

### Limitação: Sem validação de campo customizável
**Workaround:** Policing + auditoria do nosso lado.
- Script mensal de auditoria (títulos > 55 chars, etc.)
- Documento de regras pros corretores
- Não pedir pra Loft (inviável — afetaria 20k clientes)

### Limitação: Custom domain no share button
**Workaround opção 1:** Ferramenta interna `/admin/compartilhar` (fora do escopo, R$ 1.000)
**Workaround opção 2:** Aceitar + personalizar visual do minisite Loft se permitir

### Limitação: Bulk edit via API
**Workaround:** Bruno edita no painel manualmente, OU aguarda se Loft oferecer importação CSV (não confirmado que tenha).

---

## Contatos oficiais Loft

- **Email suporte:** `relacionamento.plataforma@loft.com.br`
- **WhatsApp:** 4020-2208
- **Base conhecimento:** https://ajuda.vistasoft.com.br/ e https://ajuda.novovista.com.br/

### SLA observado (Reclame Aqui)

- Tempo médio de resposta do RA: **28 dias 4h** (não é SLA oficial, é observado)
- Customizações reais demoram **semanas a meses** quando aceitas
- Taxa adicional pra customização provável (não divulgada)
- FYMOOB com 250 imóveis = baixa prioridade no backlog (Loft atende 20.000 imobiliárias)

---

## Política de requests pro Loft

### Quando vale abrir ticket

- ✅ Pedido de **feature leve e universal** (ex: contador visual de caracteres)
- ✅ Configuração de conta específica que outros clientes também aproveitam
- ✅ Correção de bug confirmado (não feature request)
- ✅ Custom domain no share button (se Loft oferecer)

### Quando NÃO vale

- ❌ Hard limit forçado (quebra outros clientes)
- ❌ Customização one-off pra FYMOOB
- ❌ Feature que requer roadmap development
- ❌ Coisas que a gente resolve do lado do nosso site

---

## Fontes

- [Vista Software API](https://www.vistasoft.com.br/api/)
- [Base Vista](https://ajuda.vistasoft.com.br/)
- [Base Novo Vista](https://ajuda.novovista.com.br/)
- [Portal Loft CRM](https://portal.loft.com.br/crm/)
- [Reclame Aqui Vista](https://www.reclameaqui.com.br/empresa/vista-software-e-internet-ltda/)
- [Órulo — integração Loft/Vista](https://movidesk.orulo.com.br/kb/pt-br/article/521613/integracao-com-o-sistema-loft)
- [Jetimob — comparativo planos](https://www.jetimob.com/planos)
- [ImobiBrasil — campos personalizados](https://ajuda.imobibrasil.com.br/central-ajuda/campos-adicionais-personalizados-para-os-imoveis/)
