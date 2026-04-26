import { defineField, defineType } from "sanity"

export const author = defineType({
  name: "author",
  title: "Autor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome completo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Cargo",
      type: "string",
      description: 'Ex: "Corretor", "Diretor"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "creci",
      title: "CRECI",
      type: "string",
      description: 'Ex: "CRECI/PR 24.494" ou "CRECI Bruno J 9420"',
    }),
    defineField({
      name: "bio",
      title: "Bio curta",
      type: "text",
      rows: 3,
      description: "1-3 frases pra rodapé do post e schema Person",
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "email",
      title: "E-mail (opcional, schema Person)",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
})
