"use client"

import dynamic from "next/dynamic"
import type { SearchBarProps } from "@/components/search/SearchBar"

const SearchBar = dynamic(
  () => import("@/components/search/SearchBar").then((m) => ({ default: m.SearchBar })),
  {
    ssr: false,
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
  return <SearchBar {...props} context="search" />
}
