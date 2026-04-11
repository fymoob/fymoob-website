"use client"

import dynamic from "next/dynamic"
import type { Property } from "@/types/property"

const HomeCarousel = dynamic(
  () => import("./HomeCarousel").then((m) => ({ default: m.HomeCarousel })),
  {
    ssr: false,
    loading: () => <div className="h-72 animate-pulse rounded-xl bg-neutral-100" />,
  }
)

interface LazyHomeCarouselProps {
  properties: Property[]
  autoPlay?: boolean
  intervalMs?: number
  fadeFrom?: string
}

export function LazyHomeCarousel(props: LazyHomeCarouselProps) {
  return <HomeCarousel {...props} />
}
