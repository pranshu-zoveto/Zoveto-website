"use client";

import { PricingModuleGrid } from "@/components/pricing/PricingModuleGrid";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 overflow-x-clip bg-transparent py-section-mobile md:py-section"
    >
      <div className="container relative z-10 mx-auto max-w-[min(100%,80rem)] px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <div className="mb-6 flex justify-center">
            <SectionLabel className="mb-0 border-blue/20 bg-blue-dim text-blue">Pricing</SectionLabel>
          </div>
          <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Pay for what you use. Scale when you&apos;re ready.
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted">
            Five modules, priced independently. Add what you need — no bundle required.
          </p>
        </div>

        <RevealOnScroll>
          <div className="reveal-item">
            <PricingModuleGrid />
          </div>
        </RevealOnScroll>

        <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-muted-2 md:mt-16">
          Controlled onboarding · GST invoice on purchase · Migration assistance available
        </p>
      </div>
    </section>
  );
}

export default PricingSection;
