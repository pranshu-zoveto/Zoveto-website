import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { SPARE_PARTS_PHASE1_FAQS, SPARE_PARTS_PHASE1_META } from "@/lib/phase1-spare-parts-industry";
import { canonicalUrl } from "@/lib/site";
import { resolveSlugParams } from "@/lib/resolve-slug-params";
import { getIndustryBySlug, isPublicIndustrySlug, PUBLIC_INDUSTRY_SLUGS } from "@/lib/industries";
import { IndustryClient } from "./IndustryClient";

export const dynamic = "force-static";

export function generateStaticParams() {
  return PUBLIC_INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await resolveSlugParams(params);
  const item = getIndustryBySlug(slug);
  if (!item) return { title: "Not Found | Zoveto" };
  const url = canonicalUrl(`/industries/${slug}`);
  const isSparePartsPhase1 = slug === "spare-parts-trading";
  return {
    title: isSparePartsPhase1 ? SPARE_PARTS_PHASE1_META.metaTitle : item.metaTitle,
    description: isSparePartsPhase1 ? SPARE_PARTS_PHASE1_META.metaDescription : item.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: isSparePartsPhase1 ? SPARE_PARTS_PHASE1_META.metaTitle : item.metaTitle,
      description: isSparePartsPhase1 ? SPARE_PARTS_PHASE1_META.metaDescription : item.metaDescription,
      url,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: isSparePartsPhase1 ? SPARE_PARTS_PHASE1_META.metaTitle : item.metaTitle,
      description: isSparePartsPhase1 ? SPARE_PARTS_PHASE1_META.metaDescription : item.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await resolveSlugParams(params);
  if (!isPublicIndustrySlug(slug)) notFound();
  const data = getIndustryBySlug(slug);
  if (!data) notFound();

  const faqUrl = canonicalUrl(`/industries/${slug}`);

  return (
    <main className="relative overflow-hidden bg-background pt-32 md:pt-40">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: data.name, path: `/industries/${slug}` },
        ]}
      />
      <FAQPageSchema
        faqs={slug === "spare-parts-trading" ? SPARE_PARTS_PHASE1_FAQS : data.faqs}
        url={faqUrl}
      />
      <div className="absolute top-0 left-1/2 h-[28rem] w-[min(100vw,75rem)] -translate-x-1/2 rounded-full bg-blue-light/35 blur-3xl -z-0" />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <IndustryClient slug={slug} />
      </div>
    </main>
  );
}
