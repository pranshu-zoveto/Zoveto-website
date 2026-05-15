import Link from "next/link";
import { ArrowRight, ClipboardCheck, Database, ShieldCheck, UserRoundCheck } from "lucide-react";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

type ZeroClientTrustSectionProps = {
  context?: "home" | "pricing" | "contact";
  className?: string;
};

const TRUST_ITEMS = [
  {
    title: "Founder-led setup",
    desc: "We review fit, map the first workflows, and avoid forcing a rollout where Zoveto is not the right operating spine.",
    icon: UserRoundCheck,
  },
  {
    title: "Role-based access",
    desc: "Teams can separate owner, finance, sales, warehouse, and admin responsibilities as the workspace matures.",
    icon: ShieldCheck,
  },
  {
    title: "Audit trails",
    desc: "Operational moves are designed around posted records so teams can understand who changed what and why.",
    icon: ClipboardCheck,
  },
  {
    title: "Data export",
    desc: "You keep a practical exit path. Export access is part of the trust model, not a negotiation after cancellation.",
    icon: Database,
  },
] as const;

const COPY = {
  home: {
    eyebrow: "Early operator trust",
    title: "Built for teams evaluating Zoveto before public client proof exists.",
    body: "Zoveto is recently launched, so we do not show fake client logos, ratings, or inflated case-study claims. The trust proof is product depth, transparent pricing, security posture, and a hands-on implementation path.",
  },
  pricing: {
    eyebrow: "Before you pay",
    title: "We qualify fit before rollout so pricing stays honest.",
    body: "The demo is not a gate. It is where we check branch count, team roles, current tools, and the first workflows worth moving into Zoveto.",
  },
  contact: {
    eyebrow: "What happens after you book",
    title: "A 20-minute fit check, then a practical setup path.",
    body: "Share your current spreadsheet, WhatsApp, ERP, CRM, or warehouse pain. We will show the relevant operating flow and tell you where Zoveto is or is not a fit.",
  },
} as const;

const metaLabelClass = "text-xs font-semibold uppercase tracking-[0.14em] text-muted-2";

export function ZeroClientTrustSection({ context = "home", className }: ZeroClientTrustSectionProps) {
  const copy = COPY[context];

  return (
    <section aria-labelledby={`${context}-zero-client-trust-heading`} className={cn("bg-transparent py-section-mobile md:py-section", className)}>
      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <div className="overflow-hidden rounded-xl border border-border/80 bg-[linear-gradient(180deg,#ffffff_0%,#f7fafe_100%)] p-5 shadow-[var(--shadow-float)] sm:p-6 md:p-8 lg:p-10">
          <RevealOnScroll className="grid grid-cols-1 gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-start lg:gap-10 xl:gap-12">
            <div className="reveal-item min-w-0">
              <SectionLabel className="mb-4 border-border/70 bg-surface-2 text-muted-2">{copy.eyebrow}</SectionLabel>
              <Text
                id={`${context}-zero-client-trust-heading`}
                as="h2"
                variant="heading-1"
                className="max-w-[22ch] text-balance text-[clamp(1.6rem,1.5vw+1.1rem,2.3rem)] font-semibold leading-[1.14] tracking-tight text-foreground"
              >
                {copy.title}
              </Text>
              <Text
                variant="body-base"
                as="p"
                className="prose-justify mt-4 max-w-[60ch] text-pretty text-[0.98rem] leading-[1.72] text-muted"
              >
                {copy.body}
              </Text>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/implementation" className="sm:inline-flex">
                  <Button variant="primary" size="lg" className="min-h-[48px] w-full gap-2 sm:min-h-[52px] sm:w-auto">
                    See implementation path <ArrowRight size={16} aria-hidden />
                  </Button>
                </Link>
                <Link href="/security" className="sm:inline-flex">
                  <Button variant="outline" size="lg" className="min-h-[48px] w-full sm:min-h-[52px] sm:w-auto">
                    Review security posture
                  </Button>
                </Link>
              </div>
            </div>

            <div className="reveal-item min-w-0 border-t border-border/60 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-10">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                <p className={metaLabelClass}>Trust checks</p>
                <p className="text-xs font-medium leading-snug text-muted">4 signals before rollout</p>
              </div>
              <RevealOnScroll className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {TRUST_ITEMS.map((item, index) => (
                  <article key={item.title} className="float-card reveal-item flex h-full min-h-0 flex-col rounded-xl p-4 sm:p-5">
                    <div className="mb-2.5 flex items-start justify-between gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-surface-2 text-blue transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-px">
                        <item.icon size={17} aria-hidden />
                      </div>
                      <span className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full border border-border bg-surface px-2 text-[11px] font-semibold tabular-nums text-muted-2">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.desc}</p>
                  </article>
                ))}
              </RevealOnScroll>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

export default ZeroClientTrustSection;
