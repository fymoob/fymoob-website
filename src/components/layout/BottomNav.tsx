"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Search, Heart, Home, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const WISHLIST_KEY = "fymoob:wishlist"

const FYMOOB_PHONE = "5541999780517"
const WA_MESSAGE = "Olá! Gostaria de mais informações sobre os imóveis da FYMOOB."
const WA_URL = `https://wa.me/${FYMOOB_PHONE}?text=${encodeURIComponent(WA_MESSAGE)}`

const navItems = [
  { href: "/", icon: Home, label: "Início" },
  { href: "/busca", icon: Search, label: "Buscar" },
  { href: WA_URL, icon: MessageCircle, label: "WhatsApp", isExternal: true },
  { href: "/favoritos", icon: Heart, label: "Favoritos" },
]

export function BottomNav() {
  const pathname = usePathname()
  const [favCount, setFavCount] = useState(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setFavCount(parsed.length)
      }
    } catch {
      // ignore
    }

    const handleStorage = () => {
      try {
        const raw = localStorage.getItem(WISHLIST_KEY)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) setFavCount(parsed.length)
        } else {
          setFavCount(0)
        }
      } catch {
        // ignore
      }
    }

    window.addEventListener("storage", handleStorage)
    const interval = setInterval(handleStorage, 2000)
    return () => {
      window.removeEventListener("storage", handleStorage)
      clearInterval(interval)
    }
  }, [])

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/95 backdrop-blur-sm md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isExternal = "isExternal" in item && item.isExternal
          const isWhatsApp = item.label === "WhatsApp"
          const isActive = !isExternal && (
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)
          )
          const Icon = item.icon

          const classes = cn(
            "relative flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-medium transition",
            isWhatsApp
              ? "text-[#25D366]"
              : isActive
                ? "text-brand-primary"
                : "text-neutral-400 hover:text-neutral-600"
          )

          if (isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </a>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={classes}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>

              {item.label === "Favoritos" && favCount > 0 && (
                <span className="absolute -top-0.5 right-0.5 flex size-4 items-center justify-center rounded-full bg-brand-primary text-[9px] font-bold text-white">
                  {favCount > 9 ? "9+" : favCount}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
