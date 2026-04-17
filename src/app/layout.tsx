import type { Metadata } from "next";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/lib/seo";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChromeGate } from "@/components/layout/ChromeGate";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Dynamic imports — these client components don't need SSR
const WhatsAppFloat = dynamic(
  () => import("@/components/layout/WhatsAppFloat").then((m) => ({ default: m.WhatsAppFloat })),
  { ssr: true }
);
const BottomNav = dynamic(
  () => import("@/components/layout/BottomNav").then((m) => ({ default: m.BottomNav })),
  { ssr: true }
);
const NavigationProgress = dynamic(
  () => import("@/components/layout/NavigationProgress").then((m) => ({ default: m.NavigationProgress })),
  { ssr: true }
);
const DeferredGA = dynamic(
  () => import("@/components/analytics/DeferredGA").then((m) => ({ default: m.DeferredGA })),
  { ssr: true }
);
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900",
});

export const metadata: Metadata = {
  title: {
    default: "FYMOOB Imobiliária | Imóveis em Curitiba",
    template: "%s | FYMOOB Imobiliária",
  },
  description:
    "Encontre apartamentos, casas e sobrados em Curitiba. Imobiliária FYMOOB — seu imóvel ideal com atendimento personalizado.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com.br"
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "FYMOOB Imobiliária",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#29ABE2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="pt-BR" className={satoshi.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://cdn.vistahost.com.br" />
        <link rel="dns-prefetch" href="https://cdn.vistahost.com.br" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className="antialiased"
      >
        <Header />
        <main className="min-h-screen overflow-x-clip">{children}</main>
        <ChromeGate>
          <Footer />
        </ChromeGate>
        <ScrollToTop />
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <WhatsAppFloat />
        <BottomNav />
        {GA_ID && <DeferredGA gaId={GA_ID} />}
        {/* RUM field data (p75 LCP/INP/CLS de usuarios reais) — precondicao
            para validar empiricamente otimizacoes Tier 1+ do roadmap perf.
            Dashboard: Vercel > Project > Speed Insights. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
