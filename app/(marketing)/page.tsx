import { Metadata } from "next";
import dynamic from "next/dynamic";
import { BRAND_CANONICAL_ORIGIN } from "@/lib/branding";
import { bandIndexForSection } from "@/lib/marketing-bands";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { ProductSoftwareApplicationSchema } from "@/components/seo/ProductSoftwareApplicationSchema";
import { WebSiteSchema } from "@/components/seo/WebSiteSchema";
import { FluidMarketingSection, MarketingHeroFeather } from "@/components/layout/FluidMarketingSection";
import { HomeProductHero } from "@/components/sections/home/HomeProductHero";
import { HomeProductConnects } from "@/components/sections/home/HomeProductConnects";
import { HomeSystemIntro } from "@/components/sections/home/HomeSystemIntro";
import { HomeSystemMobileGrid } from "@/components/sections/home/HomeSystemMobileGrid";
import { DashboardDesktopLoadingFallback } from "@/components/sections/home/DashboardDesktopLoadingFallback";

const LogoStrip = dynamic(() => import("@/components/sections/LogoStrip"));
const ProductTourInteractive = dynamic(() => import("@/components/sections/home/ProductTourInteractive"), {
  loading: () => <div className="aspect-[16/10] w-full sm:aspect-[1920/894]" aria-hidden />,
});
const ProblemSection = dynamic(() => import("@/components/sections/ProblemSection"));
const ComparisonSection = dynamic(() => import("@/components/sections/ComparisonSection"));
const HeardThisBeforeSection = dynamic(() => import("@/components/sections/HeardThisBeforeSection"));
const HowItWorksLandingSection = dynamic(() => import("@/components/sections/HowItWorksLandingSection"));
const LandingFAQSection = dynamic(() => import("@/components/sections/LandingFAQSection"));
const FinalCTASection = dynamic(() => import("@/components/sections/FinalCTASection"));
const ZeroClientTrustSection = dynamic(() =>
  import("@/components/sections/ZeroClientTrustSection").then((m) => ({ default: m.ZeroClientTrustSection })),
);

/** Desktop GSAP pinned system animation - defer parse/execute behind `next/dynamic`. */
const DashboardScrollDesktop = dynamic(() => import("@/components/sections/dashboard-scroll-desktop"), {
  loading: () => <DashboardDesktopLoadingFallback />,
});

/** Tablet modules strip - client-only; split chunk so it is not on the LCP-critical path. */
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
    <div className="relative bg-background selection:bg-blue-light selection:text-foreground">
      <OrganizationSchema />
      <WebSiteSchema />
      <ProductSoftwareApplicationSchema />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }]} />

      <FluidMarketingSection band={bandIndexForSection(0)} stackBase>
        <HomeProductHero media={{ kind: "interactive", children: <ProductTourInteractive /> }} />
        <HomeProductConnects />
      </FluidMarketingSection>

      <section id="the-system" aria-labelledby="system-heading" className="bg-[#f5f5f7]">
        <HomeSystemIntro />
        <div className="hidden lg:block">
          <DashboardScrollDesktop />
        </div>
        <div className="hidden sm:block lg:hidden">
          <DashboardMobileModules />
        </div>
        <HomeSystemMobileGrid />
      </section>

      <MarketingHeroFeather />
      <FluidMarketingSection band={bandIndexForSection(1)} stackBase>
        <LogoStrip />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(2)} overlapTop stackBase>
        <ProblemSection />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(3)} stackBase>
        <FeaturesSection />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(4)} overlapTop stackBase>
        <ComparisonSection />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(5)} overlapTop stackBase>
        <HeardThisBeforeSection />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(6)} overlapTop stackBase>
        <HowItWorksLandingSection />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(7)} overlapTop stackBase>
        <ZeroClientTrustSection context="home" />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(8)} overlapTop stackBase>
        <PricingSection />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(9)} overlapTop stackBase>
        <LandingFAQSection />
      </FluidMarketingSection>
      <FluidMarketingSection band={bandIndexForSection(10)} overlapTop stackBase>
        <FinalCTASection />
      </FluidMarketingSection>
    </div>
  );
}
