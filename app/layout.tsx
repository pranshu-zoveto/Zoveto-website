import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ZOVETO_ORGANIZATION_DESCRIPTION, ZOVETO_SITE_DEFAULT_TITLE } from "@/lib/brand-entity";
import { BRAND_CANONICAL_ORIGIN, BRAND_LOGO_ICON } from "@/lib/branding";
import { siteUrl } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteChromeClients } from "@/components/layout/SiteChromeClients";
import { WhatsAppFloatButton } from "@/components/layout/WhatsAppFloatButton";
import { DeferredCursor } from "@/components/layout/DeferredCursor";
import { VercelWebMetrics } from "@/components/layout/VercelWebMetrics";

/** Fewer masters = shorter font download chain (was 300–900, six files). */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F5F7",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  icons: {
    icon: [{ url: BRAND_LOGO_ICON, type: "image/svg+xml" }],
    apple: [{ url: BRAND_LOGO_ICON, type: "image/svg+xml" }],
    shortcut: [BRAND_LOGO_ICON],
  },
  title: {
    default: ZOVETO_SITE_DEFAULT_TITLE,
    template: "%s | Zoveto",
  },
  description: ZOVETO_ORGANIZATION_DESCRIPTION,
  keywords: [
    "company operating system",
    "integrated ERP CRM",
    "inventory management software",
    "warehouse management system",
    "AI operations platform",
    "business operating system",
    "ERP for manufacturers",
    "distribution ERP",
    "AI automation SMB",
    "unified ERP WMS CRM",
    "operations software",
  ],
  authors: [{ name: "Zoveto Technologies" }],
  creator: "Zoveto Technologies Private Limited",
  publisher: "Zoveto Technologies Private Limited",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BRAND_CANONICAL_ORIGIN,
    siteName: "Zoveto",
    title: ZOVETO_SITE_DEFAULT_TITLE,
    description: ZOVETO_ORGANIZATION_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zoveto — Company Operating System for Indian SMBs.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ZOVETO_SITE_DEFAULT_TITLE,
    description: ZOVETO_ORGANIZATION_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@zoveto",
    site: "@zoveto",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: BRAND_CANONICAL_ORIGIN,
    languages: {
      en: BRAND_CANONICAL_ORIGIN,
      "en-IN": BRAND_CANONICAL_ORIGIN,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <div className="flex min-h-screen flex-col">
          <main
            id="main-content"
            className="scroll-mt-[4.5rem] flex-1 pb-[max(7rem,calc(5.5rem+env(safe-area-inset-bottom,0px)))] sm:pb-32 md:pb-0"
          >
            {children}
          </main>
          <Footer />
        </div>
        <SiteChromeClients />
        <WhatsAppFloatButton />
        <VercelWebMetrics />
        <DeferredCursor />
      </body>
    </html>
  );
}
