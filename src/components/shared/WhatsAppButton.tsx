import { cn } from "@/lib/utils"
import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  phone?: string
  message?: string
  className?: string
  children?: React.ReactNode
  size?: "sm" | "md" | "lg"
}

const FYMOOB_PHONE = "554199978-0517".replace(/\D/g, "")

export function WhatsAppButton({
  phone = FYMOOB_PHONE,
  message = "Olá! Vi um imóvel no site da FYMOOB e gostaria de mais informações.",
  className,
  children,
  size = "md",
}: WhatsAppButtonProps) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] font-medium text-white transition-colors hover:bg-[#20bd5a]",
        sizeClasses[size],
        className
      )}
    >
      <MessageCircle size={size === "sm" ? 16 : 20} />
      {children ?? "WhatsApp"}
    </a>
  )
}
