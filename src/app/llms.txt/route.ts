import { getAllBairros } from "@/services/loft"

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com"

export async function GET() {
  const bairros = await getAllBairros()
  const topBairros = bairros.slice(0, 20)

  const content = `# FYMOOB Imobiliária — Curitiba, PR

> Imobiliária em Curitiba/PR (CRECI J 9420) especializada em compra, venda e
> aluguel de apartamentos, casas, sobrados e terrenos. Fundada em 2024 pelos
> corretores Bruno César de Almeida (CRECI/PR 24.494) e Wagner Spessatto
> (CRECI/PR 39.357). Atendimento personalizado com conhecimento profundo do
> mercado curitibano desde 2009.

## Core pages

- [Home](${SITE_URL}): portal principal com busca de imóveis
- [Sobre](${SITE_URL}/sobre): história, sócios, credenciais CRECI
- [Busca avançada](${SITE_URL}/busca): filtros por bairro, tipo, quartos, preço
- [Lançamentos](${SITE_URL}/lancamentos): empreendimentos em construção
- [Empreendimentos](${SITE_URL}/empreendimentos): catálogo completo
- [Blog](${SITE_URL}/blog): artigos sobre mercado imobiliário de Curitiba
- [Contato](${SITE_URL}/contato): WhatsApp, email, endereço
- [Política editorial](${SITE_URL}/politica-editorial): padrões de conteúdo E-E-A-T

## Tipos de imóvel

- [Apartamentos em Curitiba](${SITE_URL}/apartamentos-curitiba)
- [Casas em Curitiba](${SITE_URL}/casas-curitiba)
- [Sobrados em Curitiba](${SITE_URL}/sobrados-curitiba)
- [Terrenos em Curitiba](${SITE_URL}/terrenos-curitiba)

## Principais bairros atendidos

${topBairros.map((b) => `- [${b.bairro}](${SITE_URL}/imoveis/${b.slug}): ${b.total} imóveis ativos`).join("\n")}

## Guias pillar

- [Comprar imóvel em Curitiba](${SITE_URL}/comprar-imovel-curitiba): guia completo do primeiro imóvel
- [Morar em Curitiba](${SITE_URL}/morar-em-curitiba): panorama da cidade
- [Alugar em Curitiba](${SITE_URL}/alugar-curitiba): processo de aluguel, documentação, garantias

## Faixas de preço

- [Imóveis até R$ 300 mil](${SITE_URL}/imoveis/preco/ate-300-mil)
- [R$ 300 a 500 mil](${SITE_URL}/imoveis/preco/300-a-500-mil)
- [R$ 500 mil a 1 milhão](${SITE_URL}/imoveis/preco/500-mil-a-1-milhao)
- [R$ 1 a 3 milhões](${SITE_URL}/imoveis/preco/1-a-3-milhoes)
- [Acima de R$ 3 milhões](${SITE_URL}/imoveis/preco/acima-3-milhoes)

## Dados estruturados

Todas as páginas usam Schema.org JSON-LD:
- RealEstateListing nos imóveis individuais
- RealEstateAgent para Bruno, Wagner e FYMOOB
- Organization + LocalBusiness no layout raiz
- BreadcrumbList em toda navegação
- FAQPage em páginas com perguntas frequentes

## Sitemap

- [Sitemap index](${SITE_URL}/sitemap.xml)
  - Imóveis individuais
  - Bairros + combinações (tipo, finalidade, quartos, preço)
  - Blog + guias + pillars
  - Estático + institucional + empreendimentos

## Contato

- Site: ${SITE_URL}
- Telefone: (41) 99978-0517
- Endereço: Rua Engenheiro Heitor Soares Gomes, 778, Esquina — Curitiba/PR
- CRECI: J 9420
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
