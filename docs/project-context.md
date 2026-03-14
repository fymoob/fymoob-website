# Contexto do Projeto — FYMOOB

## Cliente
- **Nome:** FYMOOB Imobiliária
- **CRECI:** J 9420
- **Endereço:** Rua Engenheiro Heitor Soares Gomes, 778, Esquina, Portão, Curitiba - PR - 80330-350
- **Telefone:** (41) 99978-0517 / (41) 3265-5051
- **Email:** fymoob@gmail.com
- **Site atual:** https://fymoob.com
- **CRM:** Loft/CRM (antigo Vista) — Selo de Tecnologia Loft
- **Portais integrados:** OLX, ZAP, VivaReal (via CRM Loft)

## Dados do Portfólio (coletados via scraper em Março/2026)
- **Total de imóveis:** 244 (245 listados, 244 com preço)
- **Imóveis à venda:** 230
- **Imóveis para aluguel:** 18

### Preços de Venda
| Métrica | Valor |
|---------|-------|
| Média | R$ 1.248.180 |
| Mediana | R$ 789.000 |
| Menor | R$ 15.000 |
| Maior | R$ 11.000.000 |
| Preço médio/m² | R$ 21.478 |

### Média por Tipo
| Tipo | Média | Qtd |
|------|-------|-----|
| Apartamento | R$ 1.652.710 | 117 |
| Sobrado | R$ 799.630 | 76 |
| Terreno | R$ 1.078.461 | 13 |
| Casa | R$ 494.900 | 10 |
| Loja | R$ 557.355 | 4 |
| Sala | R$ 1.045.095 | 3 |
| Chácara | R$ 1.518.333 | 3 |
| Cobertura | R$ 2.950.000 | 1 |

### Aluguel
| Métrica | Valor |
|---------|-------|
| Média mensal | R$ 3.486 |
| Menor | R$ 900 |
| Maior | R$ 15.000 |

## Dados de SEO Atual (coletados via ferramenta SEO em Março/2026)
| Métrica | Valor |
|---------|-------|
| Tráfego orgânico | 5 visitas/mês |
| Palavras-chave orgânicas | 10 |
| Domain Authority | 5/100 |
| Backlinks | 8 (4 NoFollow) |
| Páginas indexadas | 5 de 245+ |
| Leads orgânicos | 0 |
| Palavras-chave pagas | 0 |

### Keywords Atuais (só nomes de empreendimentos)
| Keyword | Volume | Posição | Visitas |
|---------|--------|---------|---------|
| bw residence | 170 | 5 | 3 |
| condominio terracota | 390 | 17 | 2 |
| trebbiano residencial | 1.000 | 25 | 2 |
| residencial terracota | 260 | 13 | 1 |
| shopping e sports xaxim | 320 | 23 | 0 |
| reserva barigui lago | 260 | 46 | 0 |
| rua heitor soares gomes | 480 | 22 | 0 |
| vitória regia cic | 320 | 72 | 0 |

### Páginas que Geram Tráfego
1. Apartamento Batel (263m²) — 3 visitas
2. Trebbiano Residencial — 2 visitas
3. Loja Shopping & Sports Xaxim — 0
4. Trevi Batel — 0
5. Contato — 0

## Problemas Técnicos Identificados
1. **Client-Side Rendering:** Site exibe "Carregando..." — Googlebot vê página vazia
2. **Zero Schema Markup:** Sem RealEstateListing, LocalBusiness, Organization
3. **Meta tags genéricas:** Todas as páginas compartilham mesmo título/description
4. **Sem conteúdo de suporte:** Zero blog, zero guias de bairro, zero landing pages
5. **Sem sitemap dinâmico:** Google não sabe que 244 páginas existem
6. **Sem presença local:** Google Business Profile não otimizado
7. **Imagens sem alt tags:** Fotos do CDN sem descrição para o Google

## Stack Técnica Atual
| Componente | Tecnologia |
|------------|-----------|
| Frontend | Next.js (React) — CSR |
| Backend | Nhost (Hasura + PostgreSQL + GraphQL) |
| Storage | Nhost Storage (sa-east-1) |
| CRM | Loft/CRM (API REST em vistahost.com.br) |
| Imagens | CDN Vistahost |
| Hospedagem | Vercel (inferido) |

## Dados de Mercado (fontes verificadas)
- Curitiba lidera demanda por imóveis no Brasil no 1º tri 2025 (IDI-Brasil/CBIC/CNN)
- "casas para alugar em Curitiba" = 12.100 buscas/mês (dado verificado de ferramenta SEO)
- Estimativa conservadora: +50.000 buscas imobiliárias/mês em Curitiba = ~1.600/dia
- Curitiba movimentou R$ 7,4 bilhões em vendas de apartamentos novos em 2025 (ADEMI-PR/Brain)
- Transações passaram de 46 mil (2019/2020) para 58 mil (2023/2024)
- Taxa de conversão do setor imobiliário: 1,52% a 4% (Panorama Leadster 2025)
- Comissão padrão: 6% do valor do imóvel (CRECI)

## Cálculo de ROI
| Métrica | Valor |
|---------|-------|
| Comissão por venda na mediana | R$ 47.340 (789K × 6%) |
| Comissão por venda na média | R$ 74.890 (1.248K × 6%) |
| Investimento no projeto | R$ 15.000–22.000 |
| Vendas para pagar o projeto | < 1 venda |

## Proposta Comercial
### Pacote Essencial — R$ 15.000
- Site Next.js com SSR/ISR
- Integração API Loft/CRM
- Cada imóvel com página própria
- 5 artigos de blog
- Landing pages dos 5 bairros principais
- Google Meu Negócio configurado
- 30 dias de suporte pós-entrega

### Pacote Completo — R$ 22.000 (recomendado)
- Tudo do Essencial +
- Design personalizado com a marca FYMOOB
- 15 artigos de blog otimizados
- Landing pages de todos os bairros
- Páginas por tipo (aptos, sobrados, terrenos)
- Calculadora de financiamento
- 3 meses de acompanhamento + relatórios
- Treinamento da equipe para o blog

### Manutenção Mensal (opcional)
- R$ 1.500–3.000/mês
- Novos artigos, monitoramento SEO, ajustes, relatórios
