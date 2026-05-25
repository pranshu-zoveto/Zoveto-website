import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { CompareIndexHub } from "@/components/compare/CompareIndexHub";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "ERP alternatives and comparison guides | Zoveto",
  description:
    "Compare Zoveto against popular alternatives for operations-heavy teams. See differences across inventory, warehouse, CRM, finance, and execution.",
  alternates: { canonical: canonicalUrl("/compare") },
  openGraph: {
    title: "ERP alternatives and comparison guides | Zoveto",
    description: "Comparison guides for teams evaluating modern ERP, CRM, and warehouse operating stacks.",
    url: canonicalUrl("/compare"),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ERP alternatives and comparison guides | Zoveto",
    description: "Comparison guides for teams evaluating modern operations software.",
    images: ["/og-image.png"],
  },
};

export default function CompareIndexPage() {
  return (
    <main className="relative overflow-hidden bg-background pb-20 pt-32 md:pb-28 md:pt-40">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
        ]}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-[min(28rem,50vh)] w-[min(100vw,56rem)] rounded-full bg-blue-light/45 blur-3xl"
        aria-hidden
      />
      <CompareIndexHub />
    </main>
  );
}
