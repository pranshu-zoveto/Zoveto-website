import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { ZOVETO_ORGANIZATION_DESCRIPTION, ZOVETO_SITE_DEFAULT_TITLE } from "@/lib/brand-entity";
import { BRAND_CANONICAL_ORIGIN, BRAND_LOGO_ICON } from "@/lib/branding";
import { siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
        alt: "Zoveto, Company Operating System for Indian SMBs.",
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
    canonical: `${BRAND_CANONICAL_ORIGIN}/`,
    languages: {
      en: `${BRAND_CANONICAL_ORIGIN}/`,
      "en-IN": `${BRAND_CANONICAL_ORIGIN}/`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  category: "technology",
};

import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="scroll-smooth" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-TJP3DXS9MG" />
    </html>
  );
}
