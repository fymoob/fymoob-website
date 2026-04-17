"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import type { SearchBarProps } from "@/components/search/SearchBar"

// Code-split mantido (SearchBar monolitico é pesado), mas ssr:true agora
// — HTML vem pronto do server, reduz TBT ~150ms + LCP ~200ms.
// useSearchParams dentro do SearchBar exige Suspense boundary (Next 15+).
const SearchBar = dynamic(
  () => import("@/components/search/SearchBar").then((m) => ({ default: m.SearchBar })),
  {
    loading: () => (
      <div className="flex items-center gap-2 overflow-hidden py-1">
        <div className="h-9 w-20 animate-pulse rounded-full bg-neutral-200" />
        <div className="h-9 w-24 animate-pulse rounded-full bg-neutral-200" />
        <div className="h-9 w-16 animate-pulse rounded-full bg-neutral-200" />
        <div className="h-9 w-20 animate-pulse rounded-full bg-neutral-200" />
      </div>
    ),
  }
)

export type SearchPageSearchBarProps = Omit<SearchBarProps, "context">

export function SearchPageSearchBar(props: SearchPageSearchBarProps) {
  return (
    <Suspense fallback={null}>
      <SearchBar {...props} context="search" />
    </Suspense>
  )
}
