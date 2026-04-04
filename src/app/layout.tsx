import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { BottomNav } from "@/components/layout/BottomNav";
import { NavigationProgress } from "@/components/layout/NavigationProgress";
import { Suspense } from "react";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
    process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com"
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
    <html lang="pt-BR" className={satoshi.variable}>
      <head>
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
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <Header />
        <main className="min-h-screen overflow-x-clip">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <BottomNav />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
