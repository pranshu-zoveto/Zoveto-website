import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { ProductClient } from "./ProductClient";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ProductSoftwareApplicationSchema } from "@/components/seo/ProductSoftwareApplicationSchema";
import { canonicalUrl } from "@/lib/site";
import { FluidMarketingSection } from "@/components/layout/FluidMarketingSection";
import { bandIndexForSection } from "@/lib/marketing-bands";

export const metadata: Metadata = {
  title: "Zoveto product | ERP, OS, and AI",
  description:
    "Explore how Zoveto connects inventory, warehouse, CRM, finance, HRMS, BI, and AI agents around one operating record.",
  alternates: { canonical: canonicalUrl("/product") },
};

export default function ProductOSPage() {
  return (
    <main className="bg-background pt-36 md:pt-44 relative overflow-hidden">
      <ProductSoftwareApplicationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Product", path: "/product" },
        ]}
      />
      <div className="absolute top-0 right-0 w-[min(100vw,75rem)] h-[28rem] bg-blue-light/50 blur-3xl rounded-full -z-0" />

      <div className="container max-w-content mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mb-16 md:mb-24">
          <Text variant="label-uppercase" className="mb-4">
            The Zoveto standard
          </Text>
          <Text variant="display-1" as="h1" className="mb-6">
            One system. <span className="text-blue">Everything connected.</span>
          </Text>
          <Text variant="body-lg" className="text-muted max-w-2xl">
            Zoveto is not an ERP skin. It is the operating record behind stock, orders, cash, payroll, reporting, and AI
            agents.
          </Text>
        </div>

        <FluidMarketingSection band={bandIndexForSection(0)} stackBase>
        <div className="relative overflow-hidden border-y border-border bg-transparent py-20 md:py-28">
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: "radial-gradient(var(--border-2) 0.5px, transparent 0.5px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-full max-w-5xl overflow-hidden rounded-[var(--float-radius)] border border-border shadow-[var(--shadow-float)]">
              <div className="group grid grid-cols-12 items-start gap-x-8 gap-y-6 border-b border-border bg-card p-8 md:p-10 lg:items-center lg:gap-y-8">
                <div className="col-span-12 lg:col-span-4 lg:max-w-md">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue">L3: Interface</div>
                  <Text variant="heading-1" as="h3" className="text-2xl text-foreground transition-colors group-hover:text-blue">
                    Command center
                  </Text>
                </div>
                <div className="col-span-12 flex flex-wrap content-start gap-2 opacity-70 transition-opacity group-hover:opacity-100 lg:col-span-8">
                  {["Dashboard", "Reports", "Responsive web", "WhatsApp notifications"].map((f) => (
                    <span
                      key={f}
                      className="text-xs font-semibold px-3 py-1.5 border border-blue/25 bg-blue-light text-blue rounded-md"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="group relative grid grid-cols-12 items-start gap-x-8 gap-y-6 border-x border-b border-border bg-card p-8 md:p-10 lg:items-center lg:gap-y-8">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
                <div className="col-span-12 lg:col-span-4 lg:max-w-md">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal">L2: Process</div>
                  <Text variant="heading-1" as="h3" className="text-2xl text-foreground transition-colors group-hover:text-teal">
                    Process logic
                  </Text>
                </div>
                <div className="col-span-12 flex flex-wrap content-start gap-2 opacity-70 transition-opacity group-hover:opacity-100 lg:col-span-8">
                  {["Inventory Sync", "CRM Automation", "WMS Routing", "Finance Posting"].map((f) => (
                    <span
                      key={f}
                      className="text-xs font-semibold px-3 py-1.5 border border-teal/25 bg-teal-dim text-teal rounded-md"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="group grid grid-cols-12 items-start gap-x-8 gap-y-6 border-x border-border bg-surface p-8 md:p-10 lg:items-center lg:gap-y-8">
                <div className="col-span-12 lg:col-span-4 lg:max-w-md">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-2">L1: Foundation</div>
                  <Text variant="heading-1" as="h3" className="text-2xl text-foreground">
                    Operating record
                  </Text>
                </div>
                <div className="col-span-12 flex flex-wrap content-start gap-2 opacity-60 lg:col-span-8">
                  {["PostgreSQL", "TLS encryption", "Tenant-isolated data", "Role-based access"].map(
                    (f) => (
                      <span
                        key={f}
                        className="text-xs font-semibold px-3 py-1.5 border border-border bg-card text-muted rounded-md"
                      >
                        {f}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </FluidMarketingSection>

        <FluidMarketingSection band={bandIndexForSection(1)} overlapTop stackBase>
        <ProductClient />
        </FluidMarketingSection>

        <FluidMarketingSection band={bandIndexForSection(2)} stackBase>
        <section className="flex flex-col items-center border-t border-border bg-transparent py-20 text-center md:py-28">
          <Text variant="display-2" as="h2" className="mb-8 max-w-3xl text-foreground font-bold">
            Move from tools to <span className="text-blue">architectural unity</span>
          </Text>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="px-10 gap-2 min-h-[52px]">
                Launch Zoveto OS <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="px-10 min-h-[52px]">
                Talk to architect
              </Button>
            </Link>
          </div>
        </section>
        </FluidMarketingSection>
      </div>
    </main>
  );
}
