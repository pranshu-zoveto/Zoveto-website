import React from "react";
import { Metadata } from "next";
import { OperationalProofClient } from "./OperationalProofClient";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operating Patterns | Zoveto",
  description:
    "See how businesses replaced their disconnected tool stacks with Zoveto and achieved measurable improvements in inventory accuracy, order fulfilment, and operational efficiency.",
  alternates: { canonical: canonicalUrl("/operational-proof") },
  openGraph: {
    title: "Operating Patterns | Zoveto",
    description:
      "Operational patterns from real teams: before/after workflow redesign across inventory, orders, and finance.",
    url: canonicalUrl("/operational-proof"),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Operating Patterns | Zoveto",
    description: "Real operational patterns and outcomes, not fictional case studies.",
    images: ["/og-image.png"],
  },
};

export default function OperationalProofHubPage() {
  return (
    <main className="relative overflow-hidden bg-background pt-36 md:pt-44">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Operating Patterns", path: "/operational-proof" },
        ]}
      />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <OperationalProofClient />
      </div>
    </main>
  );
}
