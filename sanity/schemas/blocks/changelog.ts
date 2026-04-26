import { defineField, defineType } from "sanity"

/**
 * Espelha <Changelog /> em src/lib/mdx-components.tsx.
 *
 * Lista de mudanças do post (transparência editorial pra YMYL).
 * Cada entrada tem date + change.
 */
export const changelog = defineType({
  name: "changelog",
  title: "📝 Changelog",
  type: "object",
  fields: [
    defineField({
      name: "entries",
      title: "Entradas",
      type: "array",
      of: [
        {
          type: "object",
          name: "entry",
          fields: [
            defineField({
              name: "date",
              title: "Data",
              type: "date",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "change",
              title: "Mudança",
              type: "text",
              rows: 4,
              description: "O que mudou e por quê",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { date: "date", change: "change" },
            prepare: ({ date, change }) => ({
              title: date as string,
              subtitle: ((change as string) || "").slice(0, 80),
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { entries: "entries" },
    prepare: ({ entries }) => {
      const count = Array.isArray(entries) ? entries.length : 0
      return {
        title: `📝 Changelog (${count} entrada${count !== 1 ? "s" : ""})`,
      }
    },
  },
})
