"use client";

import React from "react";
import Link from "next/link";

export function FinalCTASection() {
  return (
    <section
      id="cta"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white to-[#f7f9fc] py-20 text-center md:py-28 lg:py-36"
    >
      <div className="container relative z-10 mx-auto max-w-content space-y-10 px-4 sm:px-6 md:space-y-12">
        <div>
          <h2 className="mx-auto mb-6 max-w-4xl text-balance text-[clamp(2.1rem,4.8vw,3.9rem)] font-bold leading-[1.08] tracking-tight text-foreground">
            Run the company on <span className="text-blue">one stack</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Request early access when your team is ready for a serious operating system. Qualified teams are reviewed
            manually before any workspace is opened.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-blue px-8 py-4 text-base font-semibold text-white transition hover:bg-blue/90 sm:w-auto sm:px-12"
          >
            Request Early Access
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl border border-border bg-white px-8 py-4 text-base font-semibold text-foreground transition hover:bg-surface sm:w-auto sm:px-12"
          >
            Book a demo
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 pt-2 md:gap-12">
          {[
            { label: "Access", val: "Reviewed" },
            { label: "Onboarding", val: "Manual" },
            { label: "Fit check", val: "Required" },
          ].map((f) => (
            <div key={f.label} className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-muted-2">
              <span>{f.label}</span>
              <span className="font-semibold normal-case tracking-normal text-foreground">{f.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden />
    </section>
  );
}

export default FinalCTASection;
