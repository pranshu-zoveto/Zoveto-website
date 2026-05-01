import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BRAND_LOGO_ICON } from "@/lib/branding";
import { canonicalUrl, siteUrl } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteChromeClients } from "@/components/layout/SiteChromeClients";
import Cursor from "@/components/ui/cursor";

/** Fewer masters = shorter font download chain (was 300–900, six files). */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700", "800"],
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
    default: "Zoveto | ERP, CRM & ops for businesses that run on real operations",
    template: "%s | Zoveto",
  },
  description:
    "ERP, CRM, inventory, finance, and AI agents connected around one operating record for manufacturers, distributors, and scaling operations teams.",
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
    url: canonicalUrl("/"),
    siteName: "Zoveto",
    title: "Zoveto | Company operating system for scaling businesses",
    description:
      "One stack for ERP, WMS, CRM, finance, and AI automations—built for operations teams that have outgrown spreadsheets and inbox chaos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zoveto — company operating system for scaling businesses.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoveto | Company operating system for scaling businesses",
    description:
      "Inventory, orders, finance, and execution in one operating record for teams that have outgrown chats and spreadsheets.",
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
    canonical: canonicalUrl("/"),
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
          <main id="main-content" className="scroll-mt-[4.5rem] flex-1 pb-24 sm:pb-28 md:pb-0">
            {children}
          </main>
          <Footer />
        </div>
        <SiteChromeClients />
        <Cursor />
      </body>
    </html>
  );
}
