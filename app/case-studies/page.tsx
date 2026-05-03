import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Text } from "@/components/ui/Text";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case studies | Zoveto",
  description: "Execution-first Company Operating System case studies for Indian SMB operations.",
  alternates: { canonical: canonicalUrl("/case-studies") },
};

export default function CaseStudiesIndexPage() {
  return (
    <main className="relative mx-auto max-w-content px-4 py-24 md:py-32">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Case studies", path: "/case-studies" },
        ]}
      />
      <Text variant="label-uppercase" className="mb-4 text-muted-2">
        Case studies
      </Text>
      <h1 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">Case studies</h1>
      <ul className="space-y-4 text-muted">
        <li>
          <Link href="/case-studies/rock-tear-parts" className="font-medium text-blue underline-offset-4 hover:underline">
            Rock Tear Parts — spare parts trading on one operating record
          </Link>
        </li>
      </ul>
    </main>
  );
}
