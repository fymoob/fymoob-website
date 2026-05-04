"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

/**
 * Sprint design v3 (04/05/2026) — Video card premium pro hub editorial.
 *
 * Problema do iframe direto do YouTube no embed: botao de play vermelho
 * gritante + branding YouTube quebram o feel "luxo editorial". Solucao:
 * lazy embed com thumbnail customizada + overlay escuro + play minimal,
 * iframe carrega so quando user clica.
 *
 * Bonus de performance:
 * - Iframe nao carrega no first paint (thumbnail e <Image>, ~30KB)
 * - YouTube player JS so entra na arvore quando user demonstra interesse
 *
 * Aceita URLs no formato youtube.com/embed/{id} (formato do CRM).
 */

interface VideoLazyEmbedProps {
  videoUrl: string
  title: string
  /** Thumbnail customizada (asset local). Se omitida, usa maxresdefault do
      YouTube. Override util quando o frame escolhido pelo YouTube e fraco. */
  thumbnailOverride?: string
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/embed\/([^?&/]+)/,
    /youtube\.com\/watch\?v=([^?&]+)/,
    /youtu\.be\/([^?&/]+)/,
  ]
  for (const re of patterns) {
    const m = url.match(re)
    if (m) return m[1]
  }
  return null
}

export function VideoLazyEmbed({ videoUrl, title, thumbnailOverride }: VideoLazyEmbedProps) {
  const [loaded, setLoaded] = useState(false)
  const youtubeId = extractYouTubeId(videoUrl)

  // URL do iframe com flags de privacy/branding minimal
  const embedSrc =
    videoUrl.includes("?")
      ? `${videoUrl}&autoplay=1&modestbranding=1&rel=0&playsinline=1`
      : `${videoUrl}?autoplay=1&modestbranding=1&rel=0&playsinline=1`

  // Thumbnail: override > YouTube maxresdefault > sem thumbnail
  const thumbnailSrc =
    thumbnailOverride ||
    (youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg` : null)

  if (loaded) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl">
        <iframe
          src={embedSrc}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // Fallback se nao conseguiu extrair ID e nao tem thumb override:
  // renderiza o iframe normal (sem lazy) pra nao quebrar a section.
  if (!thumbnailSrc) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl">
        <iframe
          src={videoUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Reproduzir video: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl transition-all duration-500 hover:border-white/[0.16] hover:shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
    >
      {/* Thumbnail base. unoptimized=true porque img.youtube.com nao esta no
          remotePatterns (e nao deveria — Next nao re-otimiza imagem que ja
          e thumb 1280x720 pronta). */}
      {thumbnailOverride ? (
        <Image
          src={thumbnailOverride}
          alt={`Capa do video: ${title}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
        />
      ) : (
        // YouTube thumbnail via tag <img> direta — evita configurar
        // remotePatterns pra ytimg.com so pra essa fallback.
        <img
          src={thumbnailSrc}
          alt={`Capa do video: ${title}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      )}

      {/* Overlay escuro pra dar contraste editorial e disfarcar diferencas
          de qualidade entre frames YouTube. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55 transition-opacity duration-300 group-hover:opacity-90" />

      {/* Play button minimal — circulo branco translucido com icone solid,
          sem cor de marca. Anel sutil + scale on hover. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/25 sm:h-20 sm:w-20"
        >
          <span className="absolute inset-0 rounded-full ring-1 ring-white/30 transition group-hover:ring-white/50" />
          <Play className="ml-1 h-6 w-6 fill-white text-white sm:h-7 sm:w-7" strokeWidth={1.5} />
        </span>
      </div>
    </button>
  )
}
