import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { ModuleClient } from "./ModuleClient";
import { modules, type ModuleWithIcon } from "@/lib/modules";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { canonicalUrl } from "@/lib/site";
import { resolveSlugParams } from "@/lib/resolve-slug-params";

function getModuleBySlug(slug: string): ModuleWithIcon {
  const m = modules.find((x) => x.slug === slug);
  if (!m) notFound();
  return m;
}

const MODULE_PAGE_INTROS: Record<string, { chip: string; intro: string }> = {
  inventory: {
    chip: "Inventory command layer",
    intro:
      "Stock, batch movement, reorder risk, and audit trails in one operating view for teams that cannot afford guesswork.",
  },
  crm: {
    chip: "Revenue command layer",
    intro:
      "A sales control room for leads, quotes, follow-ups, stock checks, and order handoffs, built so no opportunity disappears in WhatsApp or spreadsheets.",
  },
  wms: {
    chip: "Warehouse execution layer",
    intro:
      "A scan-first warehouse management system for putaway, bin tracking, wave picking, packing, dispatch, returns, and gate control in one auditable flow.",
  },
  finance: {
    chip: "Finance operating layer",
    intro:
      "A finance operating system that turns sales, stock, purchases, receipts, payouts, GST, and cash movement into same-day ledger visibility.",
  },
  hrms: {
    chip: "People execution layer",
    intro:
      "An HRMS and payroll workflow for attendance, shifts, leave, deductions, statutory compliance, payslips, and finance postings in one controlled run.",
  },
  analytics: {
    chip: "Decision intelligence layer",
    intro:
      "A business intelligence layer that reads live ERP, CRM, inventory, finance, and HR data so leaders can drill every KPI back to source transactions.",
  },
};

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await resolveSlugParams(params);
  const item = modules.find((m) => m.slug === slug);
  if (!item) return { title: "Not Found | Zoveto" };
  const title = item.metaTitle || `${item.name} Module | Zoveto`;
  const description = item.metaDescription ?? item.tagline ?? `Learn about ${item.name} on Zoveto`;
  const url = canonicalUrl(`/modules/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
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

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await resolveSlugParams(params);
  const data = getModuleBySlug(slug);
  const pageIntro = MODULE_PAGE_INTROS[slug] ?? {
    chip: "Module architecture",
    intro: `${data.tagline} See how this module turns fragmented work into accountable execution inside Zoveto.`,
  };

  return (
    <div className="relative overflow-hidden bg-background pt-36 md:pt-44">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Modules", path: "/product" },
          { name: data.name, path: `/modules/${slug}` },
        ]}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100vw,75rem)] h-[32rem] bg-blue-light/40 blur-3xl rounded-full -z-0" />

      <div className="container max-w-content mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mb-20 md:mb-28">
          <div className="inline-block px-3 py-1 rounded-full border border-blue/20 bg-blue-light text-blue text-xs font-semibold tracking-wide mb-8">
            {pageIntro.chip}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-light border border-border flex items-center justify-center shadow-sm shrink-0">
              <data.icon className="text-blue" size={28} />
            </div>
            <div className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight">
              {data.name}
            </div>
          </div>
          <Text variant="body-lg" className="text-muted max-w-2xl">
            {pageIntro.intro}
          </Text>
        </div>

        <ModuleClient slug={slug} />

        <section className="py-20 md:py-28 flex flex-col items-center text-center border-t border-border">
          <div className="text-2xl sm:text-3xl font-bold mb-10 max-w-2xl text-foreground leading-snug">
            Integrate {data.name} into your <span className="text-blue">Company OS</span> today.
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="px-10 gap-2 min-h-[52px]">
                Book implementation demo <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
