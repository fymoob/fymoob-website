import { defineField, defineType } from "sanity"

/**
 * Espelha <CalloutBox /> em src/lib/mdx-components.tsx.
 *
 * Caixa destacada — usada em "Resposta direta" (snippet capturável ≤55 palavras),
 * dicas críticas, alertas etc.
 */
export const calloutBox = defineType({
  name: "calloutBox",
  title: "💡 CalloutBox",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Variante visual",
      type: "string",
      options: {
        list: [
          { title: "Default (azul)", value: "default" },
          { title: "Info", value: "info" },
          { title: "Warning (amarelo)", value: "warning" },
          { title: "Success (verde)", value: "success" },
        ],
      },
      initialValue: "default",
    }),
    defineField({
      name: "content",
      title: "Conteúdo",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Parágrafo", value: "normal" }],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
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
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { variant: "variant", content: "content" },
    prepare: ({ variant, content }) => {
      const firstBlock = Array.isArray(content) ? content[0] : null
      const text =
        firstBlock?.children?.map((c: { text?: string }) => c.text).join("") || ""
      return {
        title: `💡 CalloutBox (${variant || "default"})`,
        subtitle: text.slice(0, 80),
      }
    },
  },
})
