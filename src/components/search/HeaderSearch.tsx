"use client"

import {
  SearchPageSearchBar,
  type SearchPageSearchBarProps,
} from "@/components/search/SearchPageSearchBar"

export type HeaderSearchProps = SearchPageSearchBarProps

export function HeaderSearch(props: HeaderSearchProps) {
  return <SearchPageSearchBar {...props} sticky={props.sticky ?? true} />
}
