"use client";

import { CheckCircle2, IndianRupee, ShieldCheck, Zap } from "lucide-react";
import { Text } from "@/components/ui/Text";
import { DemoBookingForm } from "@/components/forms/DemoBookingForm";
import { ZeroClientTrustSection } from "@/components/sections/ZeroClientTrustSection";
import BackgroundComponents from "@/components/ui/background-components";
import { BrandIcon } from "@/components/brand/BrandLogos";
import { trackMarketingEvent } from "@/lib/tracking";
import { LEAD_STAFF_INBOX } from "@/lib/lead-intake-mail";
import { CONTACT_PHONE_TEL, getContactPhoneDisplay } from "@/lib/whatsapp-float";

const TRUST_BULLETS = [
  { icon: CheckCircle2, label: "GST-native invoicing, built in" },
  { icon: IndianRupee, label: "INR billing with Razorpay" },
  { icon: Zap, label: "Live in 2–4 weeks, not months" },
] as const;

export function GetADemoClient() {
  const phoneDisplay = getContactPhoneDisplay();

  return (
    <main className="bg-background pt-8 pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-blue-light/30 -z-0 opacity-60 select-none pointer-events-none" />

      {/* Minimal header - brand mark only, no nav, nothing to click away to */}
      <div className="container max-w-content mx-auto px-4 sm:px-6 relative z-10 mb-10 md:mb-14">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2.5">
            <BrandIcon className="h-8 w-8" priority />
            <Text variant="heading-2" className="text-foreground text-lg tracking-tight">
              Zoveto
            </Text>
          </div>
          <a
            href={CONTACT_PHONE_TEL}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
            onClick={() => trackMarketingEvent("phone_click", { source: "get_a_demo_header" })}
          >
            {phoneDisplay}
          </a>
        </div>
      </div>

      <div className="container max-w-content mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div>
            <Text variant="label-uppercase" className="mb-4">
              Built for Indian trading &amp; distribution teams
            </Text>
            <Text variant="display-1" as="h1" className="mb-6 text-balance">
              Stop running your business on <br className="hidden sm:block" />
              <span className="text-blue">Excel, WhatsApp, and five tools.</span>
            </Text>
            <Text variant="body-lg" className="text-muted max-w-lg mb-8 md:mb-10">
              Zoveto brings inventory, sales, warehouse, and GST invoicing onto one system. Book a
              15-minute walkthrough and we&apos;ll show it running with your own numbers &mdash; not a
              generic pitch deck.
            </Text>

            <ul className="space-y-3 mb-8 md:mb-10">
              {TRUST_BULLETS.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-light text-blue">
                    <item.icon size={18} aria-hidden />
                  </span>
                  <Text variant="body-sm" className="text-foreground font-medium">
                    {item.label}
                  </Text>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <ShieldCheck size={18} className="text-blue shrink-0" aria-hidden />
              <Text variant="body-sm" className="text-muted">
                No credit card, no obligation &mdash; this is a fit check, not a sales pitch.
              </Text>
            </div>
          </div>

          <div>
            <section
              id="demo"
              className="scroll-mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm relative overflow-hidden sm:p-8 md:p-10"
              aria-labelledby="demo-heading"
            >
              <BackgroundComponents variant="cool" intensity="subtle" />
              <div className="absolute inset-0 bg-gradient-to-br from-teal-dim/70 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <Text variant="heading-1" as="h2" id="demo-heading" className="text-foreground text-xl">
                    See it with your own numbers
                  </Text>
                  <Text variant="body-sm" className="text-muted">
                    Fill this in and we&apos;ll confirm your walkthrough by email within 4 business hours.
                  </Text>
                </div>
                <DemoBookingForm />
              </div>
            </section>
          </div>
        </div>

        <ZeroClientTrustSection context="contact" className="mt-12 md:mt-16" />
      </div>

      {/* Minimal footer - trust/compliance links only, no site nav */}
      <div className="container max-w-content mx-auto px-4 sm:px-6 relative z-10 mt-16 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-2">
          <span>&copy; {new Date().getFullYear()} Zoveto. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href={`mailto:${LEAD_STAFF_INBOX}`} className="hover:text-foreground">
              {LEAD_STAFF_INBOX}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GetADemoClient;
