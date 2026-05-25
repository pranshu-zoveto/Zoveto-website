import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingLayout } from "@/components/seo/SeoLandingLayout";
import { getSeoLandingByPath } from "@/lib/seo-landings";
import { canonicalUrl } from "@/lib/site";

const PATH = "/company-operating-system-india";
const landing = getSeoLandingByPath(PATH);
if (!landing) throw new Error(`Missing SEO landing: ${PATH}`);

export const metadata: Metadata = {
  title: landing.metaTitle,
  description: landing.metaDescription,
  alternates: { canonical: canonicalUrl(PATH) },
};

export default function CompanyOperatingSystemIndiaPage() {
  const L = getSeoLandingByPath(PATH);
  if (!L) notFound();
  return <SeoLandingLayout landing={L} />;
}
