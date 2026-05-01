/**
 * Premium SaaS module strip — typography tokens per tile; shared tile surface is `.gradient-surface` in CSS.
 */
export type StripModuleIcon = "Layers" | "Warehouse" | "TrendingUp" | "Calculator" | "Users" | "Sparkles";

export type ModulePalette = {
  /** Primary heading / title */
  heading: string;
  /** Tagline: ~75% effective opacity vs heading, same hue family */
  subtext: string;
  /** Icon/chrome accent for each module */
  accent: string;
  /** Ambient tile glow for personality */
  glow: string;
};

export type SystemStripModule = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  icon: StripModuleIcon;
  palette: ModulePalette;
  /** Module detail route */
  href: string;
  /** Legacy homepage anchors */
  fragmentId?: "zoveto-erp" | "zoveto-crm" | "zoveto-ai";
};

/** Icon stroke — unified across panels */
export const STRIP_CHROME = "rgba(29,29,31,0.55)" as const;

/** Index numerals only — slightly stronger than icon chrome for legibility on all panel tones */
export const STRIP_INDEX = "rgba(29,29,31,0.82)" as const;

export const STRIP_MODULES: readonly SystemStripModule[] = [
  {
    id: "core-erp",
    index: "01",
    title: "Core ERP",
    tagline: "The system your business actually runs on.",
    icon: "Layers",
    palette: {
      heading: "#1D1D1F",
      subtext: "rgba(29, 29, 31, 0.72)",
      accent: "#93C5FD",
      glow: "rgba(59, 130, 246, 0.24)",
    },
    fragmentId: "zoveto-erp",
    href: "/modules/inventory",
  },
  {
    id: "operations",
    index: "02",
    title: "Operations",
    tagline: "Inventory and warehouse workflows without manual gaps.",
    icon: "Warehouse",
    palette: {
      heading: "#1D1D1F",
      subtext: "rgba(29, 29, 31, 0.72)",
      accent: "#7DD3FC",
      glow: "rgba(14, 165, 233, 0.2)",
    },
    href: "/modules/wms",
  },
  {
    id: "sales-crm",
    index: "03",
    title: "Sales & CRM",
    tagline: "Leads to orders in one connected pipeline.",
    icon: "TrendingUp",
    palette: {
      heading: "#1D1D1F",
      subtext: "rgba(29, 29, 31, 0.72)",
      accent: "#C4B5FD",
      glow: "rgba(139, 92, 246, 0.24)",
    },
    fragmentId: "zoveto-crm",
    href: "/modules/crm",
  },
  {
    id: "finance",
    index: "04",
    title: "Finance",
    tagline: "Live books and compliance, always accurate.",
    icon: "Calculator",
    palette: {
      heading: "#1D1D1F",
      subtext: "rgba(29, 29, 31, 0.72)",
      accent: "#86EFAC",
      glow: "rgba(16, 185, 129, 0.2)",
    },
    href: "/modules/finance",
  },
  {
    id: "people",
    index: "05",
    title: "People",
    tagline: "Payroll, attendance, and compliance handled.",
    icon: "Users",
    palette: {
      heading: "#1D1D1F",
      subtext: "rgba(29, 29, 31, 0.72)",
      accent: "#D8B4FE",
      glow: "rgba(217, 70, 239, 0.2)",
    },
    href: "/modules/hrms",
  },
  {
    id: "intelligence",
    index: "06",
    title: "Intelligence",
    tagline: "Insights and automation across your system.",
    icon: "Sparkles",
    palette: {
      heading: "#1D1D1F",
      subtext: "rgba(29, 29, 31, 0.72)",
      accent: "#67E8F9",
      glow: "rgba(6, 182, 212, 0.2)",
    },
    fragmentId: "zoveto-ai",
    href: "/modules/analytics",
  },
] as const;

export const STRIP_FRAGMENT_IDS = ["zoveto-erp", "zoveto-crm", "zoveto-ai"] as const;

export function stripModuleIndexForFragment(fragment: string): number {
  const i = STRIP_MODULES.findIndex((m) => m.fragmentId === fragment);
  return i >= 0 ? i : 0;
}
