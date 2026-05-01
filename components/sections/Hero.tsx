"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { BRAND_PRODUCTS } from "@/lib/brand-products";
import { SystemModuleCard } from "@/components/brand/SystemModuleCard";
import { SceneErrorBoundary } from "@/components/3d/SceneErrorBoundary";
import { BrandHeroWordmark } from "@/components/brand/BrandHeroWordmark";

const HeroBrain = dynamic(() => import("@/components/3d/HeroBrain").then((m) => m.HeroBrain), {
  ssr: false,
});

export function Hero() {
  return (
    <section
      className={cn(
        "hero relative flex min-h-[100dvh] flex-col justify-center overflow-hidden",
        "bg-background text-foreground"
      )}
    >
      <SceneErrorBoundary>
        <HeroBrain />
      </SceneErrorBoundary>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute left-1/2 top-[22%] h-[min(42vw,22rem)] w-[min(92vw,48rem)] -translate-x-1/2 rounded-full bg-blue/10 opacity-60 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-10%] h-[min(55vw,28rem)] w-[min(55vw,28rem)] rounded-full bg-blue/10 opacity-50 blur-[90px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-content px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 md:pb-28 md:pt-36">
        <div className="trust-badges mb-8 flex flex-wrap justify-center gap-2 sm:mb-9">
          {[
            "Founder-reviewed access",
            "No instant account",
            "Qualified onboarding",
            "Compliance-ready",
          ].map((item) => (
            <span
              key={item}
              className="rounded-[56px] border border-foreground/12 bg-card/95 px-[18px] py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-2 sm:mb-8 sm:text-xs"
          >
            Master brand
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04 }}
            className="mx-auto mb-2 max-w-[min(92vw,720px)]"
          >
            <BrandHeroWordmark as="h1" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto max-w-[min(90vw,40rem)] text-center text-[18px] font-medium leading-[1.6] tracking-[-0.01em] text-gray-600"
          >
            Your business doesn&apos;t need more tools.
            <br aria-hidden />
            It needs one system that runs everything.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mx-auto mt-14 w-full max-w-3xl sm:mt-16 md:mt-[4.5rem]"
        >
          <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-2 sm:mb-5 sm:text-[11px]">
            Operating layers
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {BRAND_PRODUCTS.map((p) => (
              <SystemModuleCard key={p.id} product={p} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mx-auto mt-12 flex max-w-lg flex-col items-stretch justify-center gap-3 sm:mt-14 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <Link href="/signup" className="sm:inline-flex">
            <Button variant="primary" size="lg" className="min-h-[48px] w-full gap-2 sm:w-auto">
              Request early access <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/contact" className="sm:inline-flex">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="min-h-[48px] w-full gap-2 border-border bg-transparent text-foreground hover:border-border hover:bg-surface sm:w-auto"
            >
              <Calendar size={16} className="text-blue" aria-hidden />
              Book a demo
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.38 }}
          className="mt-6 text-center text-xs text-muted-2"
        >
          Waitlist review · Founder approval · Guided onboarding
        </motion.p>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="hero-scroll-nudge flex flex-col items-center gap-2 border-0 bg-transparent px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-2"
            onClick={() => window.scrollBy({ top: Math.min(window.innerHeight * 0.4, 520), behavior: "smooth" })}
          >
            <span
              className="hero-scroll-arrow text-sm leading-none"
              style={{ animation: "scrollBounce 1.4s ease-in-out infinite" }}
              aria-hidden
            >
              ↓
            </span>
            Scroll to explore
          </button>
        </div>
      </div>
    </section>
  );
}
