export function HeroBackground() {
  return (
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet="/images/hero-poster-mobile.webp"
        type="image/webp"
      />
      <source srcSet="/images/hero-home.webp" type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-home.jpg"
        alt="Vista panorâmica de Curitiba — encontre seu imóvel ideal com a FYMOOB"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  )
}
