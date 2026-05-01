"use client"

import { useEffect, useState } from "react"
import { Share2, Link2, MessageCircle, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE_URL } from "@/lib/constants"

interface ShareButtonProps {
  title: string
  url: string
  variant?: "default" | "overlay"
}

export function ShareButton({ title, url, variant = "default" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} — ${fullUrl}`)}`

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && "share" in navigator)
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: fullUrl })
      } catch {
        // user cancelled
      }
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Overlay variant: single circular button (for mobile gallery overlay)
  if (variant === "overlay") {
    return (
      <button
        type="button"
        onClick={canNativeShare ? handleShare : handleCopy}
        aria-label="Compartilhar"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm backdrop-blur-sm transition hover:bg-white"
      >
        {copied ? <Check className="size-4 text-emerald-500" /> : <Share2 className="size-4" />}
      </button>
    )
  }

  // Default: single share button (native share or copy link fallback)
  return (
    <button
      type="button"
      onClick={canNativeShare ? handleShare : handleCopy}
      className="inline-flex items-center justify-center rounded-full bg-neutral-100 p-2.5 text-neutral-600 transition hover:bg-neutral-200"
      aria-label="Compartilhar"
    >
      {copied ? <Check className="size-5 text-emerald-500" /> : <Share2 className="size-5" />}
    </button>
  )
}
