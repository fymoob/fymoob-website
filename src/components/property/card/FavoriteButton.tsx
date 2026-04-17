"use client"

import { useEffect, useState } from "react"
import { Heart, X } from "lucide-react"

import { cn } from "@/lib/utils"

const WISHLIST_STORAGE_KEY = "fymoob:wishlist"

function getWishlistCodes(): Set<string> {
  if (typeof window === "undefined") return new Set<string>()
  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (!raw) return new Set<string>()
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed)
      ? new Set(parsed.filter((item): item is string => typeof item === "string"))
      : new Set<string>()
  } catch {
    return new Set<string>()
  }
}

interface FavoriteButtonProps {
  codigo: string
  /** Classe do wrapper <button> — posicionamento e tamanho. */
  className?: string
  /** "toggle" = coracao (adiciona/remove). "remove" = X (pagina de favoritos). */
  action?: "toggle" | "remove"
  /** Callback ao remover (usado na pagina /favoritos para refresh local). */
  onRemove?: (codigo: string) => void
}

// Client island isolado: a leitura de localStorage + animacao heart-pop
// roda fora do render inicial (via requestIdleCallback no useEffect).
// Reduz JS hidratado no mount de cada PropertyCard.
export function FavoriteButton({
  codigo,
  className,
  action = "toggle",
  onRemove,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [justFavorited, setJustFavorited] = useState(false)

  useEffect(() => {
    const check = () => setIsFavorite(getWishlistCodes().has(codigo))
    if ("requestIdleCallback" in window) {
      requestIdleCallback(check)
    } else {
      check()
    }
  }, [codigo])

  if (action === "remove") {
    return (
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          const wishlist = getWishlistCodes()
          wishlist.delete(codigo)
          window.localStorage.setItem(
            WISHLIST_STORAGE_KEY,
            JSON.stringify(Array.from(wishlist))
          )
          onRemove?.(codigo)
        }}
        className={cn(
          "group/wishlist absolute z-20 inline-flex items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur-md transition-all hover:scale-[1.08] hover:bg-white",
          className
        )}
        aria-label="Remover dos favoritos"
      >
        <X className="size-4 stroke-[2.2px] text-neutral-700 transition-colors group-hover/wishlist:text-rose-600 sm:size-[18px]" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        setIsFavorite((previous) => {
          const next = !previous
          const wishlist = getWishlistCodes()
          if (next) {
            wishlist.add(codigo)
            setJustFavorited(true)
            setTimeout(() => setJustFavorited(false), 500)
          } else {
            wishlist.delete(codigo)
          }
          window.localStorage.setItem(
            WISHLIST_STORAGE_KEY,
            JSON.stringify(Array.from(wishlist))
          )
          return next
        })
      }}
      className={cn(
        "group/wishlist absolute z-20 inline-flex items-center justify-center rounded-full bg-white/85 shadow-sm ring-1 ring-black/5 backdrop-blur-md transition-all hover:scale-[1.08] hover:bg-white/95",
        className
      )}
      aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      aria-pressed={isFavorite}
    >
      <Heart
        className={cn(
          "size-4 stroke-[2.2px] transition-all duration-200 sm:size-[18px]",
          justFavorited && "animate-heart-pop",
          isFavorite
            ? "scale-105 fill-brand-primary stroke-brand-primary"
            : "fill-transparent stroke-neutral-700 group-hover/wishlist:fill-brand-primary/90 group-hover/wishlist:stroke-brand-primary"
        )}
      />
    </button>
  )
}
