/**
 * Sanity Studio config — FYMOOB blog CMS
 *
 * Studio embarcado em /studio (rota raiz, protegida por auth NextAuth).
 *
 * Após criar conta em sanity.io e projeto, definir as 3 env vars:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=<id-do-projeto>
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *   SANITY_API_VERSION=2026-04-25
 *
 * Setup detalhado: docs/architecture/sanity-setup-guide.md
 */

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemas"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.SANITY_API_VERSION || "2026-04-25"

export default defineConfig({
  name: "fymoob-blog",
  title: "FYMOOB — Blog",
  projectId,
  dataset,
  apiVersion,

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.listItem()
              .title("📝 Artigos do Blog")
              .child(S.documentTypeList("post").title("Artigos do Blog")),
            S.listItem()
              .title("✍️ Autores")
              .child(S.documentTypeList("author").title("Autores")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    productionUrl: async (prev, context) => {
      const slug =
        typeof context?.document?.slug === "object" &&
        context.document.slug !== null &&
        "current" in context.document.slug
          ? (context.document.slug as { current: string }).current
          : null

      if (!slug) return prev

      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      return `${baseUrl}/blog/${slug}`
    },
  },
})
