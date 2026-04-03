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

  if (count < 3) return null

  return (
    <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
      <Eye className="size-3.5" />
      {count} visualizações
    </span>
  )
}
