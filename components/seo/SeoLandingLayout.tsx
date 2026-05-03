import Link from "next/link";
import { DirectAnswerLead } from "@/components/aeo/DirectAnswerLead";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import type { SeoLanding } from "@/lib/seo-landings";
import { canonicalUrl } from "@/lib/site";

type Props = {
  landing: SeoLanding;
};

export function SeoLandingLayout({ landing }: Props) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: landing.breadcrumbName, path: landing.path },
  ];

  return (
    <main className="relative overflow-hidden bg-background pb-16 pt-36 md:pb-24 md:pt-44">
      <BreadcrumbSchema items={crumbs} />
      <FAQPageSchema faqs={landing.faqs} url={canonicalUrl(landing.path)} />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <article className="mx-auto max-w-3xl">
          <Text variant="label-uppercase" className="mb-4 text-muted-2">
            Operations · Scaling teams
          </Text>
          <Text variant="display-2" as="h1" className="mb-6 text-balance text-foreground">
            {landing.h1}
          </Text>
          <DirectAnswerLead text={landing.directAnswer} />
          <Text variant="body-lg" as="p" className="mb-12 text-pretty text-muted">
            {landing.intro}
          </Text>

          {landing.sections.map((s) => (
            <section key={s.h2} className="mb-10">
              <Text variant="heading-1" as="h2" className="mb-4 text-xl text-foreground md:text-2xl">
                {s.h2}
              </Text>
              {s.paragraphs.map((para, i) => (
                <Text key={`${s.h2}-${i}`} variant="body-base" as="p" className="mb-4 text-muted leading-relaxed">
                  {para}
                </Text>
              ))}
              {s.bullets && s.bullets.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted leading-relaxed">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Book a demo
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View pricing
              </Button>
            </Link>
            <Link href={landing.deepLink.href} className="text-sm font-medium text-blue underline-offset-2 hover:underline">
              {landing.deepLink.label}
            </Link>
          </div>

          <section className="rounded-2xl border border-border bg-card p-6 md:p-8" aria-labelledby="faq-heading">
            <Text variant="heading-1" as="h2" id="faq-heading" className="mb-6 text-xl text-foreground">
              Frequently asked questions
            </Text>
            <dl className="space-y-6">
              {landing.faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-foreground">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </div>
    </main>
  );
}
