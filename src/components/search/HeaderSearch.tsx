"use client"

import { SearchBar, type SearchBarProps } from "@/components/search/SearchBar"

export type HeaderSearchProps = SearchBarProps

export function HeaderSearch(props: HeaderSearchProps) {
  return <SearchBar {...props} sticky={props.sticky ?? true} />
}
