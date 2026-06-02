import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

// Montserrat — Tipografía corporativa oficial de la marca
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://admediasolution.com"),
  title: "AD Media Solution | Dirección de marketing y ventas para tu negocio",
  description:
    "Le damos dirección de marketing y ventas a tu negocio: CRM personalizados, soporte y pauta en Meta y Google para ayudarte a facturar más.",
  keywords: [
    "dirección de marketing y ventas",
    "CRM personalizado",
    "Meta Ads",
    "Google Ads",
    "AD Media Solution",
    "Danger Fernández",
    "automatización de ventas",
  ],
  authors: [{ name: "Danger Fernandez", url: "https://admediasolution.com" }],
  creator: "AD Media Solution",
  publisher: "AD Media Solution",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AD Media Solution | Dirección de marketing y ventas",
    description:
      "Damos dirección de marketing y ventas a los negocios. CRM personalizados, soporte y pauta en Meta y Google para que factures más.",
    url: "https://admediasolution.com",
    siteName: "AD Media Solution",
    locale: "es_US",
    type: "website",
    images: [
      {
        url: "/brand/logo-full.png",
        width: 1200,
        height: 630,
        alt: "AD Media Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AD Media Solution | Dirección de marketing y ventas",
    description: "CRM personalizados, soporte y dirección de marketing para que tu negocio facture más.",
    images: ["/brand/logo-full.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/icon.png" />
        {/* Los logos y la foto del CEO se priorizan vía next/image (priority),
            que sirve versiones optimizadas. Precargar los PNG crudos aquí
            duplicaba la descarga (especialmente ceo.png ~2.2MB). */}
      </head>
      <body
        className={`${montserrat.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/30 selection:text-white relative`}
      >
        <div className="bg-noise" />
        <CustomCursor />
        {children}
        <Analytics />
        <SpeedInsights />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
