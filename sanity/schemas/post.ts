import { defineField, defineType } from "sanity"

export const post = defineType({
  name: "post",
  title: "Artigo do Blog",
  type: "document",
  groups: [
    { name: "content", title: "Conteúdo", default: true },
    { name: "meta", title: "Metadados" },
    { name: "ymyl", title: "YMYL & Methodology" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "content",
      description: "Máx 55 chars (regra R-3 do Manual Editorial)",
      validation: (Rule) =>
        Rule.required().max(60).warning("Títulos acima de 55 chars cortam no Google"),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      description: "URL final: /blog/<slug>. Não mexer após publicação (SEO)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição (meta description)",
      type: "text",
      group: "content",
      rows: 3,
      description: "Máx 160 chars. Aparece no Google e em compartilhamentos",
      validation: (Rule) => Rule.required().max(165),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      description: "Bruno ou Wagner — selecionável por post",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      group: "content",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "updatedAt",
      title: "Última atualização",
      type: "datetime",
      group: "meta",
      description:
        "Atualize quando revisar conteúdo — usado pelo schema BlogPosting",
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          description: 'Ex: "Vista panorâmica do bairro Batel, Curitiba"',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "meta",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: '3-7 tags. Ex: "ITBI", "Curitiba 2026", "comprar imóvel"',
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      group: "content",
      description: "Use os blocos custom no menu '+' pra MethodologyBox, CalloutBox, etc",
      of: [
        // Texto rich (Portable Text padrão + GFM)
        {
          type: "block",
          styles: [
            { title: "Parágrafo", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Citação", value: "blockquote" },
          ],
          lists: [
            { title: "Lista", value: "bullet" },
            { title: "Numerada", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
              { title: "Código", value: "code" },
              { title: "Sublinhado", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                        allowRelative: true,
                      }),
                  }),
                  defineField({
                    name: "blank",
                    title: "Abrir em nova aba?",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
        // Imagem inline
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Legenda (opcional)",
              type: "string",
            }),
          ],
        },
        // Tabelas
        {
          type: "object",
          name: "table",
          title: "Tabela",
          fields: [
            defineField({
              name: "rows",
              title: "Linhas (use Markdown: |col1|col2|)",
              type: "text",
              rows: 8,
              description: "Cada linha é uma linha da tabela. Primeira linha é header.",
            }),
          ],
          preview: {
            select: { rows: "rows" },
            prepare: ({ rows }) => ({
              title: "Tabela",
              subtitle: rows ? `${(rows as string).split("\n").length} linhas` : "",
            }),
          },
        },
        // FAQ (substituto de <details>/<summary>)
        {
          type: "object",
          name: "faqItem",
          title: "Item de FAQ",
          fields: [
            defineField({
              name: "question",
              title: "Pergunta",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Resposta",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
            prepare: ({ title, subtitle }) => ({
              title: title || "FAQ sem pergunta",
              subtitle: subtitle ? (subtitle as string).slice(0, 60) : "",
            }),
          },
        },
        // 4 blocos custom (1:1 com componentes MDX existentes)
        { type: "methodologyBox" },
        { type: "calloutBox" },
        { type: "ctaBox" },
        { type: "changelog" },
      ],
    }),

    // YMYL fields
    defineField({
      name: "reviewedBy",
      title: "Revisado por",
      type: "string",
      group: "ymyl",
      description: 'Ex: "YMYL Verifier v1.0"',
    }),
    defineField({
      name: "nextReview",
      title: "Próxima revisão",
      type: "date",
      group: "ymyl",
      description:
        "YMYL Money: trimestral. YMYL Family: trimestral. Outros: anual",
    }),
    defineField({
      name: "methodology",
      title: "Methodology (frontmatter pré-Sanity)",
      type: "object",
      group: "ymyl",
      description: "Mantém compatibilidade com posts migrados",
      fields: [
        defineField({ name: "period", title: "Período", type: "string" }),
        defineField({
          name: "sources",
          title: "Fontes principais",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({ name: "sample", title: "Amostra", type: "string" }),
        defineField({ name: "lastUpdate", title: "Última atualização", type: "string" }),
        defineField({ name: "nextReview", title: "Próxima revisão", type: "string" }),
      ],
    }),

    // SEO overrides
    defineField({
      name: "seo",
      title: "SEO (overrides opcionais)",
      type: "object",
      group: "meta",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Title custom (sobrepõe título)",
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Description custom (sobrepõe description)",
          type: "text",
          rows: 2,
          validation: (Rule) => Rule.max(165),
        }),
        defineField({
          name: "canonical",
          title: "URL canonical (raro)",
          type: "url",
        }),
        defineField({
          name: "noIndex",
          title: "noindex (não indexar no Google)",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: "readingTime",
      title: "Tempo de leitura",
      type: "string",
      group: "meta",
      description: 'Ex: "13 min". Calculado se vazio',
    }),
    defineField({
      name: "schemaType",
      title: "Schema.org type",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Article (padrão)", value: "Article" },
          { title: "BlogPosting", value: "BlogPosting" },
          { title: "NewsArticle", value: "NewsArticle" },
        ],
      },
      initialValue: "Article",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "coverImage",
      date: "publishedAt",
    },
    prepare: ({ title, author, media, date }) => ({
      title,
      subtitle: `${author || "Sem autor"} · ${
        date ? new Date(date as string).toLocaleDateString("pt-BR") : "Sem data"
      }`,
      media,
    }),
  },
})
