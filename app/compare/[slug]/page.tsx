import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompareDetailPage } from "@/components/compare/CompareDetailPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { canonicalUrl } from "@/lib/site";
import { COMPARE_PAGES, getComparePageBySlug, getComparePageFaqs } from "@/lib/compare-pages";

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
  const year = new Date().getFullYear();
  const title = page.phase1
    ? page.phase1.metaTitle
    : `Zoveto vs ${page.competitor} — Full Comparison for ${year}`;
  const description = page.phase1 ? page.phase1.metaDescription : page.description;
  return {
    title,
    description,
    keywords: [...page.keywords],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const page = getComparePageBySlug(slug);
  if (!page) notFound();

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "ComparisonPage",
    name: `Zoveto vs ${page.competitor}`,
    description: page.description,
    url: canonicalUrl(`/compare/${page.slug}`),
  };

  return (
    <main className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: page.competitor, path: `/compare/${page.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      <FAQPageSchema faqs={getComparePageFaqs(page)} url={canonicalUrl(`/compare/${page.slug}`)} />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <CompareDetailPage page={page} />
      </div>
    </main>
  );
}
