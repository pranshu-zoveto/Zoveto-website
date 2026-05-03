"use client";

import React from "react";
import { Text } from "@/components/ui/Text";
import { DemoBookingForm } from "@/components/forms/DemoBookingForm";
import BackgroundComponents from "@/components/ui/background-components";
import { MapPin, Phone, ShieldCheck } from "lucide-react";

export function ContactClient() {
  return (
    <main className="bg-background pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-blue-light/30 -z-0 opacity-60 select-none pointer-events-none" />

      <div className="container max-w-content mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div>
            <Text variant="label-uppercase" className="mb-4">
              Contact us
            </Text>
            <Text variant="display-1" as="h1" className="mb-6 text-balance">
              Request <br />
              <span className="text-blue">architectural</span> access.
            </Text>
            <Text variant="body-lg" className="text-muted max-w-lg mb-10 md:mb-12">
              Our implementation cycles are high-touch. We partner with SMEs ready for full operational unity.
            </Text>

            <div className="space-y-8">
              {[
                { title: "Global operations", desc: "Distributed implementation and support team", icon: MapPin },
                { title: "Direct line", desc: "Support response on all business days", icon: Phone },
                { title: "Data security", desc: "Enterprise-grade cloud posture", icon: ShieldCheck },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 group">
                  <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl bg-card border border-border flex items-center justify-center group-hover:bg-blue-light transition-colors text-muted group-hover:text-blue">
                    <item.icon size={20} aria-hidden />
                  </div>
                  <div className="space-y-1">
                    <Text variant="heading-2" className="text-foreground text-base md:text-lg leading-tight">
                      {item.title}
                    </Text>
                    <Text variant="body-sm" className="text-muted-2">
                      {item.desc}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <section
              id="demo"
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-5 shadow-sm relative overflow-hidden sm:p-8 md:p-10"
              aria-labelledby="demo-heading"
            >
              <BackgroundComponents variant="cool" intensity="subtle" />
              <div className="absolute inset-0 bg-gradient-to-br from-teal-dim/70 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <Text variant="heading-1" as="h2" id="demo-heading" className="text-foreground text-xl">
                    Book a demo
                  </Text>
                  <Text variant="body-sm" className="text-muted">
                    Prefer a live walkthrough? Pick a slot and we will confirm by email.
                  </Text>
                </div>
                <DemoBookingForm />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactClient;
