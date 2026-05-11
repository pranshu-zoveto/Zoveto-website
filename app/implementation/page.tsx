import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { canonicalUrl } from "@/lib/site";

const PATH = "/implementation";

const STEPS = [
  {
    title: "Fit check",
    desc: "A short demo maps your current tools, branch count, team roles, and the first operating loop worth fixing.",
  },
  {
    title: "Workspace setup",
    desc: "We configure the core modules, access roles, masters, and the minimum records needed for a useful pilot.",
  },
  {
    title: "Data import guidance",
    desc: "Your team gets practical templates and review support for items, customers, stock, ledgers, or employee data where relevant.",
  },
  {
    title: "Team onboarding",
    desc: "Owners, sales, warehouse, finance, and admins learn their daily views instead of sitting through generic software training.",
  },
  {
    title: "Go-live support",
    desc: "The first workflows are checked for handoff quality, data ownership, and operational gaps before broader rollout.",
  },
] as const;

const FAQS = [
  {
    q: "Is Zoveto available for instant self-serve signup?",
    a: "Not for full production rollout. Zoveto uses a founder-led fit check so operations-heavy teams do not start with the wrong module scope or data model.",
  },
  {
    q: "Does a demo mean we have to buy?",
    a: "No. The first conversation is meant to confirm fit, show the relevant product flow, and give a clear next step only if Zoveto matches your operating pain.",
  },
  {
    q: "Can we start with one department?",
    a: "Yes. Most teams should start with one operating loop such as enquiry-to-dispatch, stock control, warehouse execution, or finance visibility before expanding.",
  },
  {
    q: "Do you claim public reviews or customer logos yet?",
    a: "No. Public ratings, logos, and testimonials should only appear after verified proof exists. Until then, Zoveto relies on product walkthroughs, transparent process, and security posture.",
  },
] as const;

export const metadata: Metadata = {
  title: "Zoveto implementation path | Founder-led setup for Indian SMB operations",
  description:
    "See how Zoveto handles fit checks, workspace setup, data import guidance, team onboarding, and go-live support without fake client proof.",
  alternates: { canonical: canonicalUrl(PATH) },
  openGraph: {
    title: "Zoveto implementation path",
    description:
      "A practical founder-led onboarding path for Indian teams evaluating Zoveto before production rollout.",
    url: canonicalUrl(PATH),
  },
};

export default function ImplementationPage() {
  return (
    <main className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Implementation", path: PATH },
        ]}
      />
      <FAQPageSchema faqs={FAQS} url={canonicalUrl(PATH)} />

      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <section className="mx-auto max-w-4xl text-center">
          <Text variant="label-uppercase" className="mb-4 text-muted-2">
            Founder-led implementation
          </Text>
          <Text variant="display-2" as="h1" className="text-balance text-foreground">
            How Zoveto moves from demo to operating discipline.
          </Text>
          <Text variant="body-lg" as="p" className="mx-auto mt-6 max-w-2xl text-pretty text-muted">
            Zoveto is recently launched, so the implementation path is intentionally high-touch. We qualify fit,
            configure the first workflows, and keep ownership clear before asking a team to change how work is posted.
          </Text>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="min-h-[52px] w-full gap-2 sm:w-auto">
                Book a 20-min demo <ArrowRight size={16} aria-hidden />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="min-h-[52px] w-full sm:w-auto">
                View pricing
              </Button>
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-5" aria-label="Implementation stages">
          {STEPS.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-light text-blue">
                <span className="text-sm font-bold">{index + 1}</span>
              </div>
              <h2 className="text-base font-semibold text-foreground">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.desc}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <Text variant="heading-1" as="h2" className="text-foreground">
              What we will not fake
            </Text>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Zoveto will not publish invented ratings, proxy testimonials, or client logos before verified permission
              exists. That keeps the evaluation cleaner for buyers and protects early operators from inflated claims.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              {["No fake review schema", "No invented customer metrics", "No implied public endorsement"].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <Text variant="heading-1" as="h2" className="text-foreground">
              Evaluation links
            </Text>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { href: "/security", label: "Security posture" },
                { href: "/compare", label: "Compare platforms" },
                { href: "/faq", label: "FAQ hub" },
                { href: "/contact", label: "Book a demo" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex min-h-[48px] items-center justify-between gap-2 rounded-xl border border-border/85 bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-[transform,box-shadow,border-color,background-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:border-blue/35 hover:bg-blue-light/60 hover:shadow-[0_10px_20px_-16px_rgba(0,113,227,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:translate-y-0"
                >
                  <span>{link.label}</span>
                  <ArrowRight
                    size={14}
                    aria-hidden
                    className="shrink-0 text-muted-2 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:text-blue"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          <Text variant="heading-1" as="h2" className="mb-6 text-foreground">
            Implementation FAQ
          </Text>
          <dl className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <dt className="font-semibold text-foreground">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}
