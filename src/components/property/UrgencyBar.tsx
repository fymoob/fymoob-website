"use client"

import { useEffect, useState } from "react"
import { Flame, TrendingUp, Sparkles, Eye } from "lucide-react"

interface UrgencyBarProps {
  codigo: string
  dataCadastro?: string | null
  bairro?: string
  precoVenda?: number | null
  precoMedioBairro?: number | null
}

type UrgencyMessage = {
  icon: React.ElementType
  text: string
  bg: string
}

function getUrgencyMessage({
  dataCadastro,
  viewCount,
  bairro,
  precoVenda,
  precoMedioBairro,
}: UrgencyBarProps & { viewCount?: number }): UrgencyMessage | null {
  // Priority 1: Recently listed (< 7 days)
  if (dataCadastro) {
    const daysAgo = Math.floor(
      (Date.now() - new Date(dataCadastro).getTime()) / (1000 * 60 * 60 * 24)
    )
    if (daysAgo <= 3) {
      return {
        icon: Sparkles,
        text: "Recém-anunciado! Publicado há poucos dias",
        bg: "bg-amber-50 text-amber-800 border-amber-200",
      }
    }
    if (daysAgo <= 7) {
      return {
        icon: Sparkles,
        text: `Novidade! Anunciado há ${daysAgo} dias`,
        bg: "bg-amber-50 text-amber-800 border-amber-200",
      }
    }
  }

  // Priority 2: Below neighborhood average
  if (precoVenda && precoMedioBairro && precoVenda < precoMedioBairro * 0.9) {
    const percentBelow = Math.round(
      ((precoMedioBairro - precoVenda) / precoMedioBairro) * 100
    )
    return {
      icon: TrendingUp,
      text: `Achado! ${percentBelow}% abaixo da média ${bairro ? `do ${bairro}` : "do bairro"}`,
      bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    }
  }

  // Priority 3: High view count
  if (viewCount && viewCount >= 10) {
    return {
      icon: Eye,
      text: `Popular! ${viewCount} pessoas viram este imóvel`,
      bg: "bg-rose-50 text-rose-800 border-rose-200",
    }
  }

  if (viewCount && viewCount >= 5) {
    return {
      icon: Flame,
      text: `Em alta! ${viewCount} pessoas interessadas`,
      bg: "bg-orange-50 text-orange-800 border-orange-200",
    }
  }

  return null
}

export function UrgencyBar(props: UrgencyBarProps) {
  const [visible, setVisible] = useState(false)
  const [viewCount, setViewCount] = useState(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fymoob:views")
      if (raw) {
        const views = JSON.parse(raw)
        if (views[props.codigo]?.count) {
          setViewCount(views[props.codigo].count)
        }
      }
    } catch {
      // ignore
    }
  }, [props.codigo])

  const message = getUrgencyMessage({ ...props, viewCount })

  useEffect(() => {
    if (!message) return

    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [message])

  if (!message) return null

  const Icon = message.icon

  return (
    <div
      className={`fixed bottom-[120px] left-0 z-[99] w-full border-t transition-transform duration-300 md:hidden ${message.bg} ${
        visible ? "translate-y-0" : "translate-y-[200px]"
      }`}
    >
      <div className="mx-auto flex items-center justify-center gap-2 px-4 py-2.5">
        <Icon size={16} className="shrink-0" />
        <p className="text-xs font-semibold">{message.text}</p>
      </div>
    </div>
  )
}
