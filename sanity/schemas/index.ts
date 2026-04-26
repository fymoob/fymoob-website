/**
 * Schema registry — FYMOOB blog CMS
 *
 * Documentos:
 * - post: artigo do blog (com Portable Text + 4 blocos custom)
 * - author: Bruno, Wagner, configurável (autor selecionável por post)
 *
 * Blocos custom (Portable Text):
 * - methodologyBox: equivalente ao <MethodologyBox> em src/lib/mdx-components.tsx
 * - calloutBox: equivalente ao <CalloutBox>
 * - ctaBox: equivalente ao <CTABox>
 * - changelog: equivalente ao <Changelog>
 *
 * Cada bloco custom tem mesma forma do componente React — migration sem
 * mudança visual.
 */

import { post } from "./post"
import { author } from "./author"
import { methodologyBox } from "./blocks/methodology-box"
import { calloutBox } from "./blocks/callout-box"
import { ctaBox } from "./blocks/cta-box"
import { changelog } from "./blocks/changelog"

export const schemaTypes = [
  post,
  author,
  methodologyBox,
  calloutBox,
  ctaBox,
  changelog,
]
