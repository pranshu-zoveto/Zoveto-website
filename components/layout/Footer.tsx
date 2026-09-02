import React from "react";
import Link from "next/link";
import FooterNewsletter from "@/components/layout/FooterNewsletter";
import { LINKEDIN_COMPANY_URL } from "@/lib/social";
import { EARLY_ACCESS_CTA_HREF, EARLY_ACCESS_CTA_LABEL } from "@/lib/marketing-cta";
import { cn } from "@/lib/utils";

const LINK_COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Compare", href: "/compare" },
      { label: "FAQ", href: "/faq" },
      { label: "Company facts", href: "/company-facts" },
      { label: "Modules", href: "/product" },
      { label: "Blog", href: "/blog" },
      { label: "Implementation", href: "/implementation" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Company OS", href: "/company-operating-system-india" },
      { label: "Tally Alternative", href: "/tally-alternative-india" },
      { label: "Inventory Module", href: "/modules/inventory" },
      { label: "CRM & Sales", href: "/modules/crm" },
      { label: "Warehouse (WMS)", href: "/modules/wms" },
      { label: "Procurement", href: "/modules/procurement" },
      { label: "Export Operations", href: "/modules/export" },
      { label: "MRO", href: "/modules/mro" },
      { label: "Auto Parts Traders", href: "/industries/spare-parts-trading" },
      { label: "All Solutions", href: "/directory" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: EARLY_ACCESS_CTA_LABEL, href: EARLY_ACCESS_CTA_HREF },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security", href: "/security" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "MSA", href: "/msa" },
      { label: "SLA", href: "/sla" },
      { label: "Acceptable use", href: "/acceptable-use" },
      { label: "Cookie policy", href: "/cookie-policy" },
      { label: "DPA", href: "/dpa" },
      { label: "Subprocessors", href: "/subprocessors" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "LinkedIn", href: LINKEDIN_COMPANY_URL },
      { label: "Instagram", href: "https://www.instagram.com/zoveto.os/" },
      { label: "X", href: "https://twitter.com/zoveto" },
    ],
  },
];

const colLabel =
  "mb-4 text-xs font-semibold uppercase tracking-label text-muted";
const linkClass =
  "whitespace-nowrap text-[15px] font-medium leading-6 tracking-[-0.01em] text-foreground transition-colors hover:text-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Site-wide editorial footer (newsletter, link grid, mega wordmark). */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/25 text-foreground">
      <div className="container mx-auto max-w-content px-4 pt-14 sm:px-6 sm:pt-16 md:pt-18">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-16">
          <div className="max-w-xl">
            <div className="hidden sm:block">
              <FooterNewsletter inputId="site-footer-newsletter-email" variant="editorial" />
            </div>
            <p className="mt-7 text-[15px] leading-relaxed text-muted">
              Software for teams that need clean records before the day ends.
            </p>
            <p className="mt-7 font-mono-plex text-[10px] font-semibold uppercase leading-relaxed tracking-label text-muted">
              © {year} Zoveto Technologies. All rights reserved.
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-8 xl:gap-x-12">
            {LINK_COLS.map((col) => (
              <div key={col.title}>
                <div className={colLabel}>{col.title}</div>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={linkClass}
                        {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-mega-wordmark relative mt-12 overflow-hidden border-t border-border pb-1 pt-8 md:mt-14 md:pt-10 md:pb-2">
          <p
            className={cn(
              "pointer-events-none select-none flex items-baseline justify-center gap-[0.12em]",
              "text-center font-bold uppercase leading-[0.8] tracking-[-0.05em]",
            )}
            style={{ fontSize: "clamp(2.2rem, 13.5vw, 10.25rem)" }}
            aria-hidden
          >
            <span className="text-[#000000]">ZOVETO</span>
            <span
              className={cn(
                "inline-block shrink-0 rounded-full bg-blue shadow-[0_0_0_0.045em_rgba(0,113,227,0.18)]",
                "h-[0.28em] w-[0.28em] min-h-[12px] min-w-[12px]",
                "max-h-[0.52em] max-w-[0.52em]",
                "translate-y-[0.06em]",
              )}
            />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
