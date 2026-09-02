import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ZOVETO_ORGANIZATION_DESCRIPTION, ZOVETO_SITE_DEFAULT_TITLE } from "@/lib/brand-entity";
import { BRAND_CANONICAL_ORIGIN, BRAND_LOGO_ICON } from "@/lib/branding";
import { siteUrl } from "@/lib/site";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
  adjustFontFallback: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Roboto", "sans-serif"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-plex",
  display: "swap",
  preload: false,
  weight: ["400", "500", "600"],
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
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
  creator: "Zoveto Technologies",
  publisher: "Zoveto Technologies",
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
        alt: "Zoveto, Company Operating System for SMBs.",
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
        className={`${plexSans.variable} ${plexMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
