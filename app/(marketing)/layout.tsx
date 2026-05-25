import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientOnlySiteChrome } from "@/components/layout/ClientOnlySiteChrome";
import { WhatsAppFloatButton } from "@/components/layout/WhatsAppFloatButton";
import { DeferredCursor } from "@/components/layout/DeferredCursor";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main
        id="main-content"
        className="scroll-mt-[4.5rem] flex-1 pb-[max(7rem,calc(5.5rem+env(safe-area-inset-bottom,0px)))] sm:pb-32 md:pb-0"
      >
        {children}
      </main>
      <Footer />
      <ClientOnlySiteChrome />
      <WhatsAppFloatButton />
      <DeferredCursor />
    </div>
  );
}
