export function HeroBackground() {
  return (
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet="/images/hero-home-mobile.webp"
        type="image/webp"
      />
      <source srcSet="/images/hero-home.webp" type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-home.jpg"
        alt={"Vista panor\u00e2mica de Curitiba - encontre seu im\u00f3vel ideal com a FYMOOB"}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  )
}
