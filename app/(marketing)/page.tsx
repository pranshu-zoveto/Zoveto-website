import { Metadata } from "next";
import dynamic from "next/dynamic";
import { BRAND_CANONICAL_ORIGIN } from "@/lib/branding";
import { bandIndexForSection } from "@/lib/marketing-bands";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { ProductSoftwareApplicationSchema } from "@/components/seo/ProductSoftwareApplicationSchema";
import { WebSiteSchema } from "@/components/seo/WebSiteSchema";
import { FluidMarketingSection, MarketingHeroFeather } from "@/components/layout/FluidMarketingSection";
import { HomeHeroLcpShell } from "@/components/sections/home/HomeHeroLcpShell";
import { DashboardDesktopLoadingFallback } from "@/components/sections/home/DashboardDesktopLoadingFallback";
const LogoStrip = dynamic(() => import("@/components/sections/LogoStrip"));
const ProblemSection = dynamic(() => import("@/components/sections/ProblemSection"));
const SystemShiftSection = dynamic(() => import("@/components/sections/SystemShiftSection"));
const ComparisonSection = dynamic(() => import("@/components/sections/ComparisonSection"));
const HeardThisBeforeSection = dynamic(() => import("@/components/sections/HeardThisBeforeSection"));
const HowItWorksLandingSection = dynamic(() => import("@/components/sections/HowItWorksLandingSection"));
const LandingFAQSection = dynamic(() => import("@/components/sections/LandingFAQSection"));
const FinalCTASection = dynamic(() => import("@/components/sections/FinalCTASection"));
const ZeroClientTrustSection = dynamic(() =>
  import("@/components/sections/ZeroClientTrustSection").then((m) => ({ default: m.ZeroClientTrustSection })),
);

/** Desktop GSAP pinned hero - defer parse/execute behind `next/dynamic` + `loading` placeholder below. */
const DashboardScrollDesktop = dynamic(() => import("@/components/sections/dashboard-scroll-desktop"), {
  loading: () => <DashboardDesktopLoadingFallback />,
});

/** Mobile modules strip - client-only (Lucide + observers); split chunk so it is not on the LCP-critical path. */
const DashboardMobileModules = dynamic(
  () => import("@/components/sections/dashboard-scroll-mobile").then((m) => ({ default: m.DashboardMobileModules })),
  {
    loading: () => <div className="min-h-[120px] bg-[#f5f5f7] lg:hidden" aria-hidden />,
    ssr: true,
  },
);

const FeaturesSection = dynamic(() => import("@/components/sections/FeaturesSection"), {
  loading: () => <div className="min-h-[280px] animate-pulse bg-background" aria-hidden />,
});

const PricingSection = dynamic(() => import("@/components/sections/PricingSection"), {
  loading: () => <div className="min-h-[360px] animate-pulse bg-background" aria-hidden />,
});

export const metadata: Metadata = {
  title: "Zoveto, Company Operating System | ERP, CRM, Warehouse & AI in One",
  description:
    "Stop running your business on disconnected tools. Zoveto connects inventory, sales, warehouse, finance, HR, and AI agents around one operating record. Go live in 2-4 weeks.",
  keywords: [
    "business operating system",
    "ZOVETO ERP",
    "integrated ERP CRM",
    "AI operations layer",
    "warehouse finance platform",
    "distribution operating system",
    "manufacturer ERP",
  ],
  alternates: { canonical: BRAND_CANONICAL_ORIGIN },
  openGraph: {
    type: "website",
    title: "One system. Entire company. | Zoveto",
    description:
      "Zoveto gives inventory, sales, warehouse, finance, and HR one operating record, so teams stop rebuilding the truth in spreadsheets.",
    url: BRAND_CANONICAL_ORIGIN,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "One system. Entire company. | Zoveto",
    description:
      "Inventory, sales, warehouse, finance, and HR on one operating record, without the daily export-and-chase loop.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <main className="relative bg-background selection:bg-blue-light selection:text-foreground">
      <OrganizationSchema />
      <WebSiteSchema />
      <ProductSoftwareApplicationSchema />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }]} />
      {/* SSR-first LCP (<lg); desktop placeholder while GSAP chunk loads */}
      <HomeHeroLcpShell variant="mobile" />
      {/* Mobile/tablet (<1024): no GSAP / ScrollTrigger in initial bundles */}
      <div className="hidden sm:block lg:hidden">
        <DashboardMobileModules />
      </div>
      {/* Mobile replacement — simple 2-col module grid (<640px) */}
      <div className="block bg-[#f5f5f7] px-4 py-14 sm:hidden lg:hidden">
        <p className="mb-3 text-center text-[11px] uppercase tracking-[0.2em] text-muted">MODULES</p>
        <h2 className="mb-8 text-center text-[1.65rem] font-bold leading-tight text-foreground">
          One system.
          <br />
          Every function.
        </h2>
        <div className="mx-auto grid max-w-lg grid-cols-2 gap-3">
          {[
            { name: "Operations", sub: "WMS · Inventory · Dispatch" },
            { name: "Purchase", sub: "Procurement · Suppliers" },
            { name: "Sales", sub: "Orders · CRM · Invoicing" },
            { name: "Finance", sub: "Accounts · GST · P&L" },
            { name: "HR & Payroll", sub: "People · Attendance · Pay" },
            { name: "Intelligence", sub: "Reports · Alerts · BI" },
          ].map((m) => (
            <div key={m.name} className="rounded-xl border border-border bg-white p-4">
              <p className="text-[14px] font-semibold text-foreground">{m.name}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Desktop (≥1024): lazy GSAP + sticky zoom timeline */}
      <div className="hidden lg:block">
        <DashboardScrollDesktop />
      </div>
      <MarketingHeroFeather />
      <FluidMarketingSection band={bandIndexForSection(1)} stackBase>
        <LogoStrip />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(2)} overlapTop stackBase>
        <ProblemSection />
      </FluidMarketingSection>
      {/* SystemShift & Features: desktop-only — too much scroll on mobile */}
      <div className="hidden sm:block">
        <FluidMarketingSection band={bandIndexForSection(3)} stackBase>
          <SystemShiftSection />
        </FluidMarketingSection>
        <FluidMarketingSection band={bandIndexForSection(4)} stackBase>
          <FeaturesSection />
        </FluidMarketingSection>
      </div>
      <FluidMarketingSection band={bandIndexForSection(5)} overlapTop stackBase>
        <ComparisonSection />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(6)} overlapTop stackBase>
        <HeardThisBeforeSection />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(7)} overlapTop stackBase>
        <HowItWorksLandingSection />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(8)} overlapTop stackBase>
        <ZeroClientTrustSection context="home" />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(9)} overlapTop stackBase>
        <PricingSection />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(10)} overlapTop stackBase>
        <LandingFAQSection />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(11)} overlapTop stackBase>
        <FinalCTASection />
      </FluidMarketingSection>
    </main>
  );
}
