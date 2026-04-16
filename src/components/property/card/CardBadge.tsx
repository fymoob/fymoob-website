import { Sparkles, Rocket, Flame, Star, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CardBadge as CardBadgeType } from "./hooks/usePropertyCard"

const ICONS: Record<CardBadgeType["iconName"], LucideIcon> = {
  Sparkles,
  Rocket,
  Flame,
  Star,
}

interface CardBadgeProps {
  badge: CardBadgeType
  className?: string
}

/**
 * Badge glassmorphism — padronizado para todos os card variants.
 * Uso sobre fotos de imoveis (overlay). Fundo white/85 + backdrop-blur
 * + ring sutil garantem legibilidade sobre qualquer imagem.
 */
export function CardBadge({ badge, className }: CardBadgeProps) {
  const Icon = ICONS[badge.iconName]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide shadow-sm ring-1 ring-black/5 backdrop-blur-md",
        badge.textColor,
        className
      )}
    >
      {/* Dot com pulse opcional (somente status temporais recentes) */}
      {badge.pulse ? (
        <span className="relative inline-flex size-1.5 shrink-0">
          <span
            aria-hidden
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-60",
              badge.dotColor
            )}
          />
          <span
            className={cn("relative inline-flex size-1.5 rounded-full", badge.dotColor)}
          />
        </span>
      ) : (
        <Icon className="size-3" strokeWidth={2.5} />
      )}
      <span>{badge.text}</span>
    </span>
  )
}
