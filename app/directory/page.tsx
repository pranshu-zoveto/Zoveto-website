import { Metadata } from "next";
import Link from "next/link";
import { FluidMarketingSection } from "@/components/layout/FluidMarketingSection";
import { PUBLIC_INDUSTRY_SLUGS, getIndustryBySlug } from "@/lib/industries";
import { modules } from "@/lib/modules";
import { COMPARE_PAGES } from "@/lib/compare-pages";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Zoveto Solutions Directory | All Modules and Industries",
  description: "Browse all Zoveto modules, supported industries, and competitor comparisons. Find the right operating system components for your Indian SMB.",
};

export default function DirectoryPage() {
  const industries = PUBLIC_INDUSTRY_SLUGS.map(getIndustryBySlug).filter(Boolean);

  return (
    <main id="main-content" className="min-h-screen bg-brand-950 pb-24 pt-32">
      <FluidMarketingSection band={3}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-brand-50 sm:text-5xl">
              Solutions Directory
            </h1>
            <p className="mt-4 text-lg text-brand-300">
              Browse all Zoveto modules, supported industries, and system comparisons.
            </p>
          </div>

          <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
            {/* Modules */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-brand-50">Core Modules</h2>
              <ul className="space-y-4">
                {modules.map((mod) => (
                  <li key={mod.slug}>
                    <Link
                      href={`/modules/${mod.slug}`}
                      className="group flex items-center justify-between rounded-lg border border-brand-800 bg-brand-900/50 p-4 transition-colors hover:border-brand-700 hover:bg-brand-900"
                    >
                      <span className="font-medium text-brand-100 group-hover:text-white">
                        {mod.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand-500 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-brand-50">Industries</h2>
              <ul className="space-y-4">
                {industries.map((ind) => (
                  <li key={ind!.slug}>
                    <Link
                      href={`/industries/${ind!.slug}`}
                      className="group flex items-center justify-between rounded-lg border border-brand-800 bg-brand-900/50 p-4 transition-colors hover:border-brand-700 hover:bg-brand-900"
                    >
                      <span className="font-medium text-brand-100 group-hover:text-white">
                        {ind!.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand-500 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comparisons */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-brand-50">Comparisons</h2>
              <ul className="space-y-4">
                {COMPARE_PAGES.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/compare/${page.slug}`}
                      className="group flex items-center justify-between rounded-lg border border-brand-800 bg-brand-900/50 p-4 transition-colors hover:border-brand-700 hover:bg-brand-900"
                    >
                      <span className="font-medium text-brand-100 group-hover:text-white">
                        Zoveto vs {page.competitor}
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand-500 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FluidMarketingSection>
    </main>
  );
}
