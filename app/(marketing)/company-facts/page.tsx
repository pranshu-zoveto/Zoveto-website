import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Text } from "@/components/ui/Text";
import { COMPANY_FACTS } from "@/lib/company-facts";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company Facts | Zoveto",
  description:
    "Verified company facts for Zoveto Technologies: product category, modules, contact, and canonical pages for AI citation and entity clarity.",
  alternates: { canonical: canonicalUrl("/company-facts") },
  robots: { index: true, follow: true },
};

export default function CompanyFactsPage() {
  const f = COMPANY_FACTS;

  return (
    <main className="relative overflow-hidden bg-background pb-16 pt-24 md:pb-24 md:pt-40">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Company facts", path: "/company-facts" },
        ]}
      />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <article className="mx-auto max-w-3xl">
          <header className="mb-10 md:mb-12">
            <Text variant="label-uppercase" className="mb-4 text-muted-2">
              Entity reference
            </Text>
            <Text variant="display-2" as="h1" className="mb-5 text-balance text-foreground">
              Company facts
            </Text>
            <Text variant="body-lg" className="text-pretty text-muted">
              {f.shortAnswer}
            </Text>
          </header>

          <div className="space-y-10">
            <section aria-labelledby="identity-heading">
              <Text variant="heading-1" as="h2" id="identity-heading" className="mb-4 text-xl text-foreground">
                Identity
              </Text>
              <dl className="divide-y divide-border rounded-2xl border border-border bg-card">
                {[
                  ["Company name", f.brand],
                  ["Legal name", f.legalName],
                  ["Website", f.website],
                  ["Category", f.category],
                  ["Country focus", f.countryFocus],
                  ["Built for", f.builtFor],
                ].map(([term, value]) => (
                  <div key={term} className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr]">
                    <dt className="text-sm font-semibold text-foreground">{term}</dt>
                    <dd className="text-sm text-muted">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="modules-heading">
              <Text variant="heading-1" as="h2" id="modules-heading" className="mb-4 text-xl text-foreground">
                Core modules
              </Text>
              <ul className="flex flex-wrap gap-2">
                {f.modules.map((mod) => (
                  <li
                    key={mod}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {mod}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="contact-heading">
              <Text variant="heading-1" as="h2" id="contact-heading" className="mb-4 text-xl text-foreground">
                Contact
              </Text>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  General:{" "}
                  <a href={`mailto:${f.contactEmail}`} className="font-medium text-blue hover:underline">
                    {f.contactEmail}
                  </a>
                </li>
                <li>
                  Security:{" "}
                  <a href={`mailto:${f.securityEmail}`} className="font-medium text-blue hover:underline">
                    {f.securityEmail}
                  </a>
                </li>
              </ul>
            </section>

            <section aria-labelledby="pages-heading">
              <Text variant="heading-1" as="h2" id="pages-heading" className="mb-4 text-xl text-foreground">
                Important pages
              </Text>
              <ul className="grid gap-2 sm:grid-cols-2">
                {f.importantPages.map((page) => (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className="flex min-h-[48px] items-center rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-blue/30 hover:text-blue"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="social-heading">
              <Text variant="heading-1" as="h2" id="social-heading" className="mb-4 text-xl text-foreground">
                Verified profiles
              </Text>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={f.social.linkedin} className="text-blue hover:underline" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={f.social.twitter} className="text-blue hover:underline" rel="noopener noreferrer">
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a href={f.social.instagram} className="text-blue hover:underline" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
