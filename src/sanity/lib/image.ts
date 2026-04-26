/**
 * Helper pra construir URLs de imagens do Sanity CDN.
 *
 * Uso: <Image src={urlForImage(post.coverImage).width(1200).height(630).url()} />
 */

import imageUrlBuilder from "@sanity/image-url"
import { projectId, dataset } from "./client"

const builder = imageUrlBuilder({ projectId, dataset })

export function urlForImage(source: { asset?: { _ref?: string } } | string | null | undefined) {
  if (!source) return null
  return builder.image(source as { asset: { _ref: string } })
}
