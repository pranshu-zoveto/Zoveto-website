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
        className="scroll-mt-[56px] lg:scroll-mt-[60px] flex-1"
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
