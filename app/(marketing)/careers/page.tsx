import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Text } from "@/components/ui/Text";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers at Zoveto",
  description:
    "We are building the operating system for businesses that run on real operations. Get in touch if you want to shape that journey.",
  alternates: { canonical: canonicalUrl("/careers") },
};

export default function CareersPage() {
  return (
    <main className="bg-background px-4 pb-24 pt-32 sm:px-6 md:pt-40">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]}
      />
      <div className="container mx-auto max-w-content">
        <Text variant="label-uppercase" className="mb-4">
          Careers
        </Text>
        <Text variant="display-1" as="h1" className="mb-6 max-w-2xl text-balance">
          Build the <span className="text-blue">OS</span> for scaling enterprises.
        </Text>
        <Text variant="body-lg" className="mb-10 max-w-xl text-muted">
          We hire in small, deliberate waves. If you are excited by ERP, AI agents, and high-trust relationships with
          founders and ops teams, we would like to hear from you.
        </Text>
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-blue px-8 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Introduce yourself
        </Link>
      </div>
    </main>
  );
}
