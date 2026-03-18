"use client"

import { SearchBar, type SearchBarProps } from "@/components/search/SearchBar"

export type SearchPageSearchBarProps = Omit<SearchBarProps, "context">

export function SearchPageSearchBar(props: SearchPageSearchBarProps) {
  return <SearchBar {...props} context="search" />
}
