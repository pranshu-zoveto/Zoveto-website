import { Metadata } from "next";
import Link from "next/link";
import { PUBLIC_INDUSTRY_SLUGS, getIndustryBySlug } from "@/lib/industries";
import { modules } from "@/lib/modules";
import { COMPARE_PAGES } from "@/lib/compare-pages";
import { ArrowRight } from "lucide-react";
import { Text } from "@/components/ui/Text";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Zoveto Solutions Directory | All Modules and Industries",
  description: "Browse all Zoveto modules, supported industries, and competitor comparisons. Find the right operating system components for your Indian SMB.",
};

export default function DirectoryPage() {
  const industries = PUBLIC_INDUSTRY_SLUGS.map(getIndustryBySlug).filter(Boolean);

  return (
    <main className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
        ]}
      />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <article className="mx-auto max-w-5xl pb-28 lg:pb-10">
          <header className="mb-10 md:mb-14">
            <Text variant="label-uppercase" className="mb-4 text-muted-2">
              Directory
            </Text>
            <Text variant="display-2" as="h1" className="mb-5 text-balance text-foreground">
              Solutions Directory
            </Text>
            <Text variant="body-lg" className="mb-8 max-w-3xl text-pretty text-muted">
              Browse all Zoveto modules, supported industries, and system comparisons.
            </Text>
          </header>

          <div className="grid gap-12 md:grid-cols-3">
            {/* Modules */}
            <section aria-labelledby="modules-heading">
              <Text variant="heading-1" as="h2" id="modules-heading" className="mb-6 text-xl text-foreground">
                Core Modules
              </Text>
              <ul className="space-y-3">
                {modules.map((mod) => (
                  <li key={mod.slug}>
                    <Link
                      href={`/modules/${mod.slug}`}
                      className="group flex min-h-[56px] items-center justify-between rounded-xl border border-border bg-card px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-md"
                    >
                      <span className="font-medium text-foreground transition-colors group-hover:text-blue">
                        {mod.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-blue" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Industries */}
            <section aria-labelledby="industries-heading">
              <Text variant="heading-1" as="h2" id="industries-heading" className="mb-6 text-xl text-foreground">
                Industries
              </Text>
              <ul className="space-y-3">
                {industries.map((ind) => (
                  <li key={ind!.slug}>
                    <Link
                      href={`/industries/${ind!.slug}`}
                      className="group flex min-h-[56px] items-center justify-between rounded-xl border border-border bg-card px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-md"
                    >
                      <span className="font-medium text-foreground transition-colors group-hover:text-blue">
                        {ind!.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-blue" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Comparisons */}
            <section aria-labelledby="comparisons-heading">
              <Text variant="heading-1" as="h2" id="comparisons-heading" className="mb-6 text-xl text-foreground">
                Comparisons
              </Text>
              <ul className="space-y-3">
                {COMPARE_PAGES.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/compare/${page.slug}`}
                      className="group flex min-h-[56px] items-center justify-between rounded-xl border border-border bg-card px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-md"
                    >
                      <span className="font-medium text-foreground transition-colors group-hover:text-blue">
                        Zoveto vs {page.competitor}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-blue" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
