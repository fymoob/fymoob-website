"use client"

import { useEffect, useState } from "react"
import { Share2, Link2, MessageCircle, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ShareButtonProps {
  title: string
  url: string
  variant?: "default" | "overlay"
}

export function ShareButton({ title, url, variant = "default" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)
  const fullUrl = `https://fymoob.com${url}`
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

  // Default: full button row (for desktop)
  return (
    <div className="flex items-center gap-2">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-600 transition hover:bg-neutral-50 hover:text-[#25D366]"
      >
        <MessageCircle className="size-4" />
        <span className="hidden sm:inline">Compartilhar</span>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-600 transition hover:bg-neutral-50"
      >
        {copied ? (
          <>
            <Check className="size-4 text-emerald-500" />
            <span className="hidden sm:inline text-emerald-500">Copiado!</span>
          </>
        ) : (
          <>
            <Link2 className="size-4" />
            <span className="hidden sm:inline">Copiar link</span>
          </>
        )}
      </button>

      {canNativeShare && (
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-600 transition hover:bg-neutral-50"
        >
          <Share2 className="size-4" />
        </button>
      )}
    </div>
  )
}
