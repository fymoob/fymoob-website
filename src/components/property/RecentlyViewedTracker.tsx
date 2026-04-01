"use client"

import { useEffect } from "react"
import type { Property } from "@/types/property"
import { saveToRecentlyViewed } from "@/components/property/PropertyCard"

export function RecentlyViewedTracker({ property }: { property: Property }) {
  useEffect(() => {
    saveToRecentlyViewed(property)
  }, [property])

  return null
}
