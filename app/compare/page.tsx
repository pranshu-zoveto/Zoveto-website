import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Text } from "@/components/ui/Text";
import { COMPARE_PAGES } from "@/lib/compare-pages";
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
    <main className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
        ]}
      />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Text variant="label-uppercase" className="mb-4 text-muted-2">
            Compare
          </Text>
          <Text variant="display-2" as="h1" className="mb-6 text-foreground">
            Choose the right operations stack
          </Text>
          <Text variant="body-lg" className="mb-10 text-muted">
            Structured comparisons for teams evaluating alternatives across ERP, CRM, warehouse, and finance workflows.
          </Text>
          <ul className="space-y-5">
            {COMPARE_PAGES.map((page) => (
              <li key={page.slug} className="rounded-xl border border-border bg-card p-5">
                <Link href={`/compare/${page.slug}`} className="text-lg font-semibold text-foreground hover:text-blue">
                  {page.competitor} vs Zoveto
                </Link>
                <p className="mt-2 text-sm text-muted">{page.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
