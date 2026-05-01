import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Text } from "@/components/ui/Text";
import { canonicalUrl } from "@/lib/site";
import { COMPARE_PAGES, getComparePageBySlug } from "@/lib/compare-pages";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return COMPARE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparePageBySlug(slug);
  if (!page) return { title: "Not Found | Zoveto" };
  const url = canonicalUrl(`/compare/${page.slug}`);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const page = getComparePageBySlug(slug);
  if (!page) notFound();

  return (
    <main className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: page.competitor, path: `/compare/${page.slug}` },
        ]}
      />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <article className="mx-auto max-w-4xl">
          <Text variant="label-uppercase" className="mb-4 text-muted-2">
            Comparison
          </Text>
          <Text variant="display-2" as="h1" className="mb-5 text-balance text-foreground">
            {page.h1}
          </Text>
          <Text variant="body-lg" className="mb-10 text-pretty text-muted">
            {page.intro}
          </Text>

          <section className="mb-12 rounded-2xl border border-border bg-card p-6 md:p-8" aria-label="Feature comparison table">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-3 text-sm font-semibold text-foreground">Feature</th>
                  <th className="py-3 pr-3 text-sm font-semibold text-blue">Zoveto</th>
                  <th className="py-3 text-sm font-semibold text-muted-2">{page.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {page.features.map((feature) => (
                  <tr key={feature.name} className="border-b border-border last:border-0">
                    <td className="py-3 pr-3 text-sm text-foreground">{feature.name}</td>
                    <td className="py-3 pr-3 text-sm text-foreground">{feature.zoveto}</td>
                    <td className="py-3 text-sm text-muted">{feature.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="rounded-2xl border border-blue/20 bg-blue/[0.04] p-6 md:p-8">
            <Text variant="heading-1" as="h2" className="mb-3 text-xl text-foreground">
              Verdict
            </Text>
            <Text variant="body-base" className="text-muted">
              {page.verdict}
            </Text>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/pricing" className="rounded-lg bg-blue px-4 py-2 text-sm font-medium text-white">
                View pricing
              </Link>
              <Link href="/contact" className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground">
                Book a demo
              </Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
