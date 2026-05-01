export type CompareFeature = {
  name: string;
  zoveto: string;
  competitor: string;
};

export type ComparePage = {
  slug: string;
  competitor: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  verdict: string;
  features: CompareFeature[];
};

export const COMPARE_PAGES: readonly ComparePage[] = [
  {
    slug: "zoho-vs-zoveto",
    competitor: "Zoho",
    title: "Zoho alternative for operations-heavy teams | Zoveto",
    description: "Compare Zoho vs Zoveto for inventory, warehouse, finance, and execution workflows. See which stack suits operations-first businesses.",
    h1: "Looking for a Zoho alternative with deeper operations control?",
    intro:
      "Zoveto is built for teams where inventory, warehouse, and finance operations must stay synchronized in real time. If your workflows outgrow app-by-app stitching, a unified operating layer usually performs better.",
    verdict: "Pick Zoveto when operational coordination matters more than app-by-app flexibility.",
    features: [
      { name: "Unified stock + finance ledger", zoveto: "Native single flow", competitor: "Usually multi-app sync" },
      { name: "Warehouse execution depth", zoveto: "Core workflow surface", competitor: "Depends on add-ons" },
      { name: "Operational AI automation", zoveto: "Built into workflow states", competitor: "Rules across separate apps" },
    ],
  },
  {
    slug: "tally-vs-zoveto",
    competitor: "Tally",
    title: "Tally alternative for growing operations teams | Zoveto",
    description: "Compare Tally vs Zoveto when you need inventory, CRM, warehouse, and finance in one connected operating system.",
    h1: "Need a Tally alternative that goes beyond accounting?",
    intro:
      "Zoveto connects accounting outcomes with upstream sales, inventory, and warehouse execution so teams do not re-enter data across systems. This reduces reconciliation cycles and improves decision speed.",
    verdict: "Pick Zoveto when your bottleneck is cross-functional execution, not just accounting.",
    features: [
      { name: "Accounting + operations connection", zoveto: "Shared data model", competitor: "Accounting-first core" },
      { name: "CRM to invoice continuity", zoveto: "Single process chain", competitor: "External process glue" },
      { name: "Multi-team visibility", zoveto: "Current status by role", competitor: "Finance-centric visibility" },
    ],
  },
  {
    slug: "quickbooks-vs-zoveto",
    competitor: "QuickBooks",
    title: "QuickBooks alternative in India for operations scale | Zoveto",
    description: "Compare QuickBooks vs Zoveto for teams needing operational workflows, warehouse execution, and ERP-grade controls in one stack.",
    h1: "Searching for a QuickBooks alternative in India for full operations?",
    intro:
      "Zoveto extends beyond bookkeeping by integrating inventory movement, warehouse actions, sales operations, and finance controls into one operating system. This helps avoid fragmented ownership across tools.",
    verdict: "Pick Zoveto when growth requires operational orchestration, not only bookkeeping.",
    features: [
      { name: "ERP-grade process scope", zoveto: "Inventory + WMS + CRM + finance", competitor: "Accounting-led scope" },
      { name: "Warehouse readiness", zoveto: "Purpose-built flows", competitor: "External tooling needed" },
      { name: "Execution analytics", zoveto: "Workflow-native metrics", competitor: "Finance-centric reporting" },
    ],
  },
  {
    slug: "sap-vs-zoveto",
    competitor: "SAP",
    title: "SAP alternative for small and mid-sized operations teams | Zoveto",
    description: "Compare SAP vs Zoveto for SMB and mid-market teams that need faster implementation and practical operational control.",
    h1: "Considering an SAP alternative for a smaller operations team?",
    intro:
      "Zoveto offers a tighter implementation footprint while preserving the core operational controls growing teams need. This can accelerate time-to-value where enterprise-suite complexity is not justified.",
    verdict: "Pick Zoveto when speed, adoption, and clean operating records matter more than heavy enterprise customization.",
    features: [
      { name: "Implementation speed", zoveto: "Lean rollout path", competitor: "Longer enterprise cycles" },
      { name: "Change management load", zoveto: "SMB-friendly adoption", competitor: "High process overhead" },
      { name: "Operational depth for scale-up", zoveto: "Targeted and practical", competitor: "Broad but heavyweight" },
    ],
  },
  {
    slug: "odoo-vs-zoveto",
    competitor: "Odoo",
    title: "Odoo alternative for execution-first business operations | Zoveto",
    description: "Compare Odoo vs Zoveto for teams that prioritize operational consistency, integrated workflows, and measurable execution outcomes.",
    h1: "Evaluating an Odoo alternative for cleaner execution workflows?",
    intro:
      "Zoveto is opinionated around execution quality across inventory, warehouse, sales, and finance so teams run from one operational truth. This reduces process drift as teams scale.",
    verdict: "Pick Zoveto when consistency of execution matters more than module-by-module flexibility.",
    features: [
      { name: "Operational governance", zoveto: "Built-in process discipline", competitor: "Configuration-dependent" },
      { name: "Cross-module consistency", zoveto: "Single execution model", competitor: "Varies by module setup" },
      { name: "Time-to-decision", zoveto: "Current posted operations", competitor: "Depends on integrations" },
    ],
  },
];

export function getComparePageBySlug(slug: string): ComparePage | undefined {
  return COMPARE_PAGES.find((item) => item.slug === slug);
}
