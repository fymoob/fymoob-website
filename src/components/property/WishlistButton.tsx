"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const WISHLIST_KEY = "fymoob:wishlist"

function getWishlist(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = localStorage.getItem(WISHLIST_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? new Set(parsed.filter((i): i is string => typeof i === "string")) : new Set()
  } catch {
    return new Set()
  }
}

interface WishlistButtonProps {
  codigo: string
  className?: string
  size?: "sm" | "md"
}

export function WishlistButton({ codigo, className, size = "md" }: WishlistButtonProps) {
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(getWishlist().has(codigo))
  }, [codigo])

  const toggle = () => {
    setIsFav((prev) => {
      const next = !prev
      const wl = getWishlist()
      if (next) wl.add(codigo)
      else wl.delete(codigo)
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(Array.from(wl)))
      return next
    })
  }

  const iconSize = size === "sm" ? 16 : 20

  return (
    <button
      onClick={toggle}
      aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={cn(
        "flex items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition",
        isFav
          ? "bg-white/90 text-rose-500"
          : "bg-white/90 text-neutral-500 hover:text-rose-400",
        size === "sm" ? "h-9 w-9" : "h-10 w-10",
        className
      )}
    >
      <Heart
        size={iconSize}
        className={cn(isFav && "fill-current")}
      />
    </button>
  )
}
