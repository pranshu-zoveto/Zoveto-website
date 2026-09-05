import { ClientOnlySiteChrome } from "@/components/layout/ClientOnlySiteChrome";

/**
 * Minimal chrome for paid-traffic landing pages: no Navbar, no Footer, no
 * WhatsApp float, no cursor effects — nothing that gives a paid click a way
 * to wander off the page before converting. Tracking/consent (GTM, GA4, UTM
 * capture, cookie consent) still loads via ClientOnlySiteChrome, same as the
 * main marketing layout, so conversion tracking keeps working.
 */
export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <ClientOnlySiteChrome />
    </div>
  );
}
