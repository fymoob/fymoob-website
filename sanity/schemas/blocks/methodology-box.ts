import { defineField, defineType } from "sanity"

/**
 * Espelha <MethodologyBox /> em src/lib/mdx-components.tsx.
 *
 * Aparece no início dos posts YMYL pra declarar:
 * - period (ex: "Abril/2026")
 * - sources (array de fontes Tier 1)
 * - lastUpdate (data ISO)
 * - nextReview (data ISO trimestral pra YMYL)
 */
export const methodologyBox = defineType({
  name: "methodologyBox",
  title: "📊 MethodologyBox (YMYL)",
  type: "object",
  fields: [
    defineField({
      name: "period",
      title: "Período",
      type: "string",
      description: 'Ex: "Abril/2026"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sources",
      title: "Fontes principais",
      type: "array",
      of: [{ type: "string" }],
      description: "5-8 fontes Tier 1 (gov.br, IBGE, Planalto, etc)",
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: "sample",
      title: "Amostra (opcional)",
      type: "string",
      description: 'Ex: "30 bairros de Curitiba avaliados em 4 critérios"',
    }),
    defineField({
      name: "lastUpdate",
      title: "Última atualização",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nextReview",
      title: "Próxima revisão",
      type: "date",
      description: "Trimestral pra YMYL Money/Family/Health",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { period: "period", lastUpdate: "lastUpdate" },
    prepare: ({ period, lastUpdate }) => ({
      title: `📊 MethodologyBox · ${period || "sem período"}`,
      subtitle: lastUpdate ? `Atualizado em ${lastUpdate}` : "",
    }),
  },
})
