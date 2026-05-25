import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SystemFlowPage } from "@/components/operational-proof/SystemFlowPage";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getAllProofSlugs, getProofBySlug } from "@/lib/operational-proof";
import { canonicalUrl } from "@/lib/site";
import { resolveSlugParams } from "@/lib/resolve-slug-params";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProofSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await resolveSlugParams(params);
  const proof = getProofBySlug(slug);
  if (!proof) return { title: "Not found" };
  return {
    title: proof.metaTitle,
    description: proof.metaDescription,
    alternates: { canonical: canonicalUrl(`/operational-proof/${slug}`) },
  };
}

export default async function OperationalProofDetailPage({ params }: Props) {
  const { slug } = await resolveSlugParams(params);
  const proof = getProofBySlug(slug);
  if (!proof) notFound();

  return (
    <div className="relative overflow-hidden bg-background pt-36 md:pt-44">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Operating Patterns", path: "/operational-proof" },
          { name: proof.title, path: `/operational-proof/${proof.slug}` },
        ]}
      />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <SystemFlowPage proof={proof} />
      </div>
    </div>
  );
}
