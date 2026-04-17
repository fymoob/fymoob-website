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
  // Habilitado para permitir source-map-explorer em analises forenses
  // de bundle (Tier 0 do sistema de pesquisa empirica). NAO aumenta JS
  // servido: source-maps sao servidos separadamente via .js.map apenas
  // quando solicitados pelo DevTools.
  productionBrowserSourceMaps: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Next.js 16 requer allowlist explícita. 75 = default cards/fotos,
    // 85 = hero property thumbnails, 92 = imagem principal do imóvel.
    qualities: [75, 85, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.vistahost.com.br",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.storage.sa-east-1.nhost.run",
        pathname: "/v1/files/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@base-ui/react"],
  },
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
