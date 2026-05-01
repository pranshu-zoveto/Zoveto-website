import type { LucideIcon } from "lucide-react";
import { modules, type ModuleWithIcon } from "@/lib/modules";

/** Canonical desktop + mobile Modules menu order (1–6). */
export const MODULE_NAV_SLUGS = [
  "inventory",
  "wms",
  "crm",
  "finance",
  "analytics",
  "hrms",
] as const;

export type ModuleNavSlug = (typeof MODULE_NAV_SLUGS)[number];

export type ModuleNavLink = {
  slug: string;
  href: string;
  name: string;
  desc: string;
  icon: LucideIcon;
};

const HRMS_NAV_LABEL = "HRMS (People & Payroll)" as const;

function moduleBySlug(slug: string): ModuleWithIcon {
  const m = modules.find((x) => x.slug === slug);
  if (!m) {
    throw new Error(`module-nav: missing module slug "${slug}"`);
  }
  return m;
}

function navLabelForSlug(slug: string, dataName: string): string {
  if (slug === "hrms") return HRMS_NAV_LABEL;
  return dataName;
}

function navDesc(m: ModuleWithIcon): string {
  return m.tagline.length > 80 ? `${m.tagline.slice(0, 80)}…` : m.tagline;
}

/** Ordered links for Navbar Modules dropdown and mobile list. */
export function getModuleNavLinks(): ModuleNavLink[] {
  return MODULE_NAV_SLUGS.map((slug) => {
    const m = moduleBySlug(slug);
    return {
      slug,
      href: `/modules/${slug}`,
      name: navLabelForSlug(slug, m.name),
      desc: navDesc(m),
      icon: m.icon,
    };
  });
}
