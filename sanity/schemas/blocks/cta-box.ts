import { defineField, defineType } from "sanity"

/**
 * Espelha <CTABox /> em src/lib/mdx-components.tsx.
 *
 * Bloco call-to-action — botão de WhatsApp/contato/busca.
 */
export const ctaBox = defineType({
  name: "ctaBox",
  title: "🎯 CTABox",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      description: 'Ex: "Procurando imóveis em Curitiba?"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Texto do botão",
      type: "string",
      description: 'Ex: "Ver imóveis disponíveis", "Falar com especialista"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL de destino",
      type: "url",
      description: 'WhatsApp (https://wa.me/...) ou rota interna (/busca, /contato)',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https", "mailto", "tel"],
          allowRelative: true,
        }),
    }),
  ],
  preview: {
    select: { title: "title", label: "label" },
    prepare: ({ title, label }) => ({
      title: `🎯 CTA · ${title}`,
      subtitle: label as string,
    }),
  },
})
