/**
 * Cliente Sanity pra leitura no site (server-side).
 *
 * Use este cliente em Server Components / route handlers pra buscar posts
 * via GROQ. Cache integrado com Next.js (revalidateTag).
 */

import { createClient } from "next-sanity"

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
export const apiVersion = process.env.SANITY_API_VERSION || "2026-04-25"

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn: true em produção (mais rápido, free tier).
  // useCdn: false em dev (sempre atualizado, evita cache stale).
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
})

export const sanityClientPreview = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "previewDrafts",
  token: process.env.SANITY_API_READ_TOKEN,
})
