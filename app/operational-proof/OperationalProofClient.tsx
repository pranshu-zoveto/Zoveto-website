"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { operationalProofs } from "@/lib/operational-proof";
import { OperationalFlowPreview } from "@/components/operational-proof/OperationalFlowPreview";
import { TrustStrip } from "@/components/operational-proof/TrustStrip";
import { ProofCard } from "@/components/operational-proof/ProofCard";
import { Button } from "@/components/ui/Button";
import BackgroundComponents from "@/components/ui/background-components";
import { FluidMarketingSection } from "@/components/layout/FluidMarketingSection";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { bandIndexForSection } from "@/lib/marketing-bands";

export function OperationalProofClient() {
  return (
    <div className="space-y-0 pb-16 md:pb-24">
      <FluidMarketingSection band={bandIndexForSection(0)} stackBase>
        <section className="float-card px-6 py-12 md:px-10 md:py-16 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue">Operating Patterns</p>
              <p className="mt-3 text-sm font-medium text-muted md:text-base">Observed workflows. Broken handoffs. Cleaner operating paths.</p>
              <h1 className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                How operations actually run — and how they should
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
                Patterns from inventory, orders, finance, and team workflows where the record trail breaks.
              </p>
              <div className="mt-8">
                <a
                  href="#proofs"
                  className="inline-flex items-center gap-2 rounded-xl border border-foreground/15 bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
                >
                  Explore operating patterns <ArrowDown size={16} className="shrink-0 opacity-90" aria-hidden />
                </a>
              </div>
            </div>
            <OperationalFlowPreview />
          </div>
        </section>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(1)} overlapTop stackBase>
        <div className="container mx-auto max-w-content px-4 pt-6 sm:px-6 md:pt-8">
          <TrustStrip />
        </div>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(2)} overlapTop stackBase>
        <section id="proofs" className="scroll-mt-28 pt-8 md:pt-10">
          <div className="container mx-auto max-w-content px-4 sm:px-6">
            <div className="mb-8 max-w-2xl md:mb-10">
              <h2 className="text-[clamp(1.9rem,2.6vw,2.5rem)] font-semibold tracking-tight text-foreground">Operating patterns</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                Before-and-after workflows without fictional client names or vanity case-study theatre.
              </p>
            </div>
            <RevealOnScroll>
              <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-7">
                {operationalProofs.map((proof) => (
                  <div key={proof.slug} className="reveal-item h-full">
                    <ProofCard proof={proof} variant="listing" />
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </FluidMarketingSection>

      <FluidMarketingSection band={bandIndexForSection(3)} overlapTop stackBase>
        <section className="pt-8 md:pt-10">
          <div className="container mx-auto max-w-content px-4 sm:px-6">
            <div className="relative overflow-hidden float-card px-5 py-10 text-center sm:px-6 md:px-10 md:py-12">
              <BackgroundComponents variant="editorial" intensity="subtle" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">See this in your business</h3>
                <p className="mx-auto mt-3 max-w-lg text-sm text-muted md:text-base">
                  Walk the same flows with your SKUs, stages, and roles — demo on your reality, not a slide deck.
                </p>
                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                  <Link href="/contact#demo" className="sm:inline-flex">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                      Book demo
                    </Button>
                  </Link>
                  <Link href="/contact" className="sm:inline-flex">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Talk to an expert
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FluidMarketingSection>
    </div>
  );
}
