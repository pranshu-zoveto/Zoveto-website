import React from "react";
import Link from "next/link";
import FooterNewsletter from "@/components/layout/FooterNewsletter";
import { LINKEDIN_COMPANY_URL } from "@/lib/social";
import { cn } from "@/lib/utils";

const LINK_COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Modules", href: "/product" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Book demo", href: "/contact#demo" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security", href: "/security" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
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
  "mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted";
const linkClass =
  "text-[15px] font-medium leading-6 tracking-[-0.01em] text-foreground transition-colors hover:text-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Site-wide editorial footer (newsletter, link grid, mega wordmark). */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/25 text-foreground">
      <div className="container mx-auto max-w-content px-4 pt-14 sm:px-6 sm:pt-16 md:pt-18">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.85fr)] lg:gap-16">
          <div className="max-w-xl">
            <FooterNewsletter inputId="site-footer-newsletter-email" variant="editorial" />
            <p className="mt-7 text-[15px] leading-relaxed text-muted">
              Software for teams that need clean records before the day ends.
            </p>
            <p className="mt-7 font-mono text-[10px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-muted">
              © {year} Zoveto Technologies Pvt. Ltd. All rights reserved.
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-4 md:gap-x-12 lg:gap-x-14">
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

        <div className="relative mt-12 overflow-hidden border-t border-border pb-1 pt-8 md:mt-14 md:pt-10 md:pb-2">
          <p
            className={cn(
              "pointer-events-none select-none flex items-baseline justify-center gap-[0.12em]",
              "text-center font-extrabold uppercase leading-[0.8] tracking-[-0.05em]",
            )}
            style={{ fontSize: "clamp(2.9rem, 13.5vw, 10.25rem)" }}
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
