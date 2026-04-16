export function HeroBackground() {
  const heroSrc = "/images/hero-home-mobile.webp"

  return (
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet={heroSrc}
        type="image/webp"
      />
      <source srcSet={heroSrc} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroSrc}
        alt={"Vista panor\u00e2mica de Curitiba - encontre seu im\u00f3vel ideal com a FYMOOB"}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  )
}
