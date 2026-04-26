"use client"

import { NextStudio } from "next-sanity/studio"
import config from "../../../../sanity.config"

/**
 * Wrapper client-side do Sanity Studio.
 *
 * NextStudio é o componente oficial do next-sanity pra rodar Studio
 * dentro de Next.js App Router. Cuida de hot-reload, history API,
 * tema dark/light.
 */
export function StudioClient() {
  return <NextStudio config={config} />
}
