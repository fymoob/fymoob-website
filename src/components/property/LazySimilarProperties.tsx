"use client"

import dynamic from "next/dynamic"
import type { Property } from "@/types/property"

const SimilarProperties = dynamic(
  () =>
    import("./SimilarProperties").then((m) => ({
      default: m.SimilarProperties,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-200" />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-2xl bg-neutral-100" />
          ))}
        </div>
      </div>
    ),
  }
)

export function LazySimilarProperties({ properties }: { properties: Property[] }) {
  if (properties.length === 0) return null
  return <SimilarProperties properties={properties} />
}
