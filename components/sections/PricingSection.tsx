"use client";

import Link from "next/link";
import { PricingCatalog } from "@/components/pricing/PricingCatalog";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 overflow-x-clip bg-transparent py-section-mobile md:py-section"
    >
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <div className="mb-10 max-w-3xl text-left md:mb-14">
          <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Pay for what you use. Scale when you&apos;re ready.
          </h2>
          <p className="max-w-[62ch] text-lg leading-relaxed text-muted">
            Five modules, priced independently. Start with a bundle or add one at a time.
          </p>
        </div>

        <RevealOnScroll>
          <div className="reveal-item">
            <PricingCatalog />
          </div>
        </RevealOnScroll>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-2 md:mt-12">
          Controlled onboarding. GST invoice on purchase. Migration assistance available.{" "}
          <Link href="/pricing" className="font-medium text-blue underline-offset-2 hover:underline">
            See full pricing
          </Link>
        </p>
      </div>
    </section>
  );
}

export default PricingSection;
