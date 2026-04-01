"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"
import { trackView, getViewCount } from "@/lib/view-tracker"

interface ViewCounterProps {
  codigo: string
}

export function ViewCounter({ codigo }: ViewCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const newCount = trackView(codigo)
    setCount(newCount)
  }, [codigo])

  // Only show if viewed 3+ times (meaningful social proof)
  if (count < 3) return null

  return (
    <div className="flex items-center gap-1.5 text-sm text-neutral-500">
      <Eye className="size-4" />
      <span>{count} {count === 1 ? "pessoa viu" : "pessoas viram"} este imóvel</span>
    </div>
  )
}
