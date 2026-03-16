import Image, { type ImageProps } from "next/image"
import { generateImageAlt } from "@/lib/utils"
import type { PropertyType } from "@/types/property"

interface PropertyInfo {
  tipo: PropertyType
  dormitorios: number | null
  bairro: string
}

type OptimizedImageProps = Omit<ImageProps, "alt"> & {
  alt?: string
  propertyInfo?: PropertyInfo
}

export function OptimizedImage({ alt, propertyInfo, ...props }: OptimizedImageProps) {
  const imageAlt = alt || (propertyInfo ? generateImageAlt(propertyInfo) : "Imóvel FYMOOB")

  return (
    <Image
      alt={imageAlt}
      {...props}
    />
  )
}
