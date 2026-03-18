"use client"

import { SearchBar, type SearchBarProps } from "@/components/search/SearchBar"

export type HomeSearchBarProps = Omit<SearchBarProps, "context">

export function HomeSearchBar(props: HomeSearchBarProps) {
  return <SearchBar {...props} context="home" />
}
