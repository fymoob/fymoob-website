import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

// Treemap HTML em .next/analyze/ quando ANALYZE=true npm run build.
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  // Source maps so em analise local (ANALYZE=true) — NAO em prod default.
  // Expor .js.map em prod da ao atacante reconnaissance gratuito (codigo
  // descompilado + nomes de variaveis + shapes de endpoint). Ligue via
  // ANALYZE=true npm run build quando quiser rodar source-map-explorer.
  productionBrowserSourceMaps: process.env.ANALYZE === "true",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Next.js 16 requer allowlist explícita. 75 = default cards/fotos,
    // 85 = hero property thumbnails, 92 = imagem principal do imóvel.
    qualities: [75, 85, 92],
    remotePatterns: [
      // Vista/Loft usa subdominios variados: cdn.vistahost, cdn1.vistahost,
      // foto.vistahost. Allowlist ampla por sufixo evita Image 400 se o CRM
      // mudar de host. Filtro adicional startsWith("https://") em loft.ts
      // previne XSS por URL poisoning.
      {
        protocol: "https",
        hostname: "**.vistahost.com.br",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.storage.sa-east-1.nhost.run",
        pathname: "/v1/files/**",
      },
      // Sanity CDN — imagens de capa do blog (Portable Text body images)
      // Servidos por cdn.sanity.io com transformações on-the-fly (?w=, ?fit=, etc.)
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@base-ui/react"],
    // H-20260417-006: cache client-side para rotas dinamicas por 30s.
    // Next 16 default e 0s (cache expira imediato), causando re-fetch
    // do RSC payload a cada navegacao home <-> /busca. Trade-off:
    // dados podem estar ate 30s stale (aceitavel para imobiliaria —
    // imoveis nao mudam a cada segundo).
    staleTimes: {
      dynamic: 30,
    },
    // H-20260417-004 REVERTIDO: inlineCss fez HTML crescer +326KB (predicted
    // era +20-30KB), LCP +238ms, TBT +237ms. Kill triggered em 4 de 5.
  },
  // H-20260417-003: memoizacao automatica compile-time. Meta report
  // 20-40% menos re-renders + LCP +12%. Custo: +30-50% build time.
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
