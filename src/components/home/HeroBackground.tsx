export function HeroBackground() {
  return (
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
        alt="Sala de estar ensolarada com vista panorâmica — encontre seu imóvel ideal em Curitiba"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  )
}
