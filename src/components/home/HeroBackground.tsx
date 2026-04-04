"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 768) return

    const loadVideo = () => {
      const video = videoRef.current
      if (!video) return
      const source = video.querySelector("source")
      if (source?.dataset.src) {
        source.src = source.dataset.src
        video.load()
        video.play().catch(() => {})
        video.addEventListener("canplay", () => setShowVideo(true), { once: true })
      }
    }

    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadVideo)
    } else {
      setTimeout(loadVideo, 2000)
    }
  }, [])

  return (
    <>
      {/* Poster image — LCP via <picture> (no JS, no hydration dependency) */}
      <picture>
        <source
          media="(max-width: 767px)"
          srcSet="/images/hero-poster-mobile.webp"
          type="image/webp"
        />
        <source srcSet="/images/hero-poster.webp" type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-poster.webp"
          alt="Vista panorâmica de apartamento de luxo em Curitiba"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {/* Video — lazy loaded, desktop only */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 hidden md:block",
          showVideo ? "opacity-100" : "opacity-0"
        )}
      >
        <source data-src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
    </>
  )
}
