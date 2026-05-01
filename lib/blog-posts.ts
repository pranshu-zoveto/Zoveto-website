/**
 * Marketing blog posts — metadata and section copy (rendered under /blog).
 */

export type BlogSection = {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  /** Last segment of BreadcrumbList */
  breadcrumbName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  publishedAt: string;
  excerpt: string;
  sections: BlogSection[];
  /** In-body internal links (rendered after sections; asserted in tests). */
  relatedLinks: readonly { href: string; label: string }[];
  comparisonTable?: readonly { feature: string; zoveto: string; alternative: string }[];
};

const posts: BlogPost[] = [
  {
    slug: "erp-cost-in-india",
    breadcrumbName: "ERP cost in India",
    metaTitle: "ERP cost in India: what drives price | Zoveto",
    metaDescription:
      "Understand ERP cost in India: per-user fees, modules, implementation, GST, and support. Practical framing for SMBs—no hype. Links to pricing and demos.",
    h1: "What actually drives ERP cost in India?",
    publishedAt: "2026-04-28",
    excerpt:
      "License lines are only part of the story. Here is how Indian SMBs should think about ERP total cost—before the invoice hits.",
    sections: [
      {
        h2: "The components buyers forget",
        paragraphs: [
          "ERP cost in India is driven less by sticker price and more by implementation depth, migration complexity, and process adoption. Teams that model these operational variables upfront avoid the hidden costs that appear after go-live.",
        ],
        bullets: [
          "Implementation days and who does the work (you, partner, vendor).",
          "Historical data migration from Tally, Excel, or legacy ERP.",
          "Change management: process redesign, not just software install.",
          "Support tier and response time when month-end is stuck.",
        ],
      },
      {
        h2: "How Indian tax and invoicing affects scope",
        paragraphs: [
          "GST-ready invoicing, credit notes, and reconciliations are non-negotiable for most product and trading businesses. If finance has to re-key what operations entered, you pay twice—in time and in errors.",
        ],
      },
      {
        h2: "A sane way to compare vendors",
        paragraphs: [
          "Ask for a phased rollout with measurable checkpoints: stock accuracy, dispatch time, DSO movement, or quote-to-cash cycle—whatever matches your pain. Cost should be judged against those outcomes, not brochure feature counts.",
          "When you are ready to see how Zoveto packages plans for growing teams, start with our pricing page, then book a demo so we can model your volumes honestly.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/pricing", label: "View pricing" },
      { href: "/contact", label: "Book a demo" },
      { href: "/erp-software-small-business-india", label: "ERP software for small businesses in India" },
      { href: "/warehouse-management-system-india", label: "Warehouse management in India" },
      { href: "/inventory-management-software-india", label: "Inventory management in India" },
      { href: "/product", label: "Zoveto product overview" },
    ],
  },
  {
    slug: "best-erp-software-comparison-india",
    breadcrumbName: "ERP comparison for SMEs",
    metaTitle: "ERP comparison for Indian SMEs | Zoveto",
    metaDescription:
      "Compare ERP software for Indian SMEs by fit, adoption, GST, inventory, and support without fake leaderboards. Links to guides and pricing.",
    h1: "What is the best ERP software for Indian SMEs?",
    publishedAt: "2026-04-28",
    excerpt:
      "Skip arbitrary “Top 10” lists. Use a buying method that matches how Indian SMBs actually choose and run ERP.",
    sections: [
      {
        h2: "Why generic rankings fail",
        paragraphs: [
          "The best ERP for Indian SMEs is the one that fits your highest-frequency workflow end-to-end without forcing manual handoffs. In practice, teams should score options against inventory truth, quote-to-cash continuity, and implementation risk instead of vendor popularity.",
          "Many teams search for business management software in India but mean different things—finance-led, inventory-led, or sales-led. Name your anchor workflow before you score vendors so comparisons stay honest.",
        ],
      },
      {
        h2: "Dimensions that matter",
        paragraphs: ["Score each finalist 1–5 and discuss disagreements openly:"],
        bullets: [
          "Inventory and warehouse truth vs. finance truth—single ledger or not?",
          "CRM and field sales tied to stock and billing?",
          "Implementation partner quality and productized onboarding.",
          "Mobile and low-bandwidth usability for branch users.",
        ],
      },
      {
        h2: "Where Zoveto competes",
        paragraphs: [
          "Zoveto is built as a Company Operating System for Indian SMBs: structured modules for inventory, CRM, finance, HRMS, and AI-assisted workflows when you choose to turn them on. Read the SMB-focused landing page, explore the product overview, and compare plans when you want numbers on the table.",
        ],
      },
    ],
    comparisonTable: [
      { feature: "Unified stock + finance ledger", zoveto: "Native", alternative: "Often split across tools" },
      { feature: "CRM to invoice continuity", zoveto: "Single flow", alternative: "Manual sync or integrations" },
      { feature: "Warehouse execution depth", zoveto: "Built-in", alternative: "Depends on add-ons" },
      { feature: "Implementation path", zoveto: "Phased SMB rollout", alternative: "Variable partner-led rollout" },
    ],
    relatedLinks: [
      { href: "/pricing", label: "View pricing" },
      { href: "/contact", label: "Book a demo" },
      { href: "/erp-software-small-business-india", label: "ERP for SMBs in India" },
      { href: "/warehouse-management-system-india", label: "Warehouse management in India" },
      { href: "/inventory-management-software-india", label: "Inventory management in India" },
      { href: "/product", label: "Product overview" },
    ],
  },
  {
    slug: "excel-inventory-problems",
    breadcrumbName: "Excel inventory problems",
    metaTitle: "Excel inventory problems: when to switch | Zoveto",
    metaDescription:
      "Problems with Excel inventory: broken formulas, branch conflicts, no audit trail, and slow decisions. When to move to inventory software—and how to plan the jump.",
    h1: "When should you replace Excel inventory with software?",
    publishedAt: "2026-04-28",
    excerpt:
      "Excel is flexible until it becomes your risk surface. Here is how teams know they have crossed the line.",
    sections: [
      {
        h2: "Where spreadsheets crack",
        paragraphs: [
          "You should replace Excel inventory once version conflicts, delayed reconciliations, and stock uncertainty start affecting fulfilment or cash. A proper inventory system creates one operational truth so teams can act before errors compound.",
        ],
        bullets: [
          "No authoritative multi-branch ledger in real time.",
          "Weak audit trails for who changed what before a stockout.",
          "Forecasting and safety stock driven by gut, not demand history.",
          "Finance discovers ops truth too late for collections or write-offs.",
        ],
      },
      {
        h2: "What “good enough” looks like after a move",
        paragraphs: [
          "You should expect one on-hand truth per SKU by site, GRN discipline, and aging views that purchasing and finance agree on. The software is only half—process ownership is the other.",
        ],
      },
      {
        h2: "Next steps for Indian teams",
        paragraphs: [
          "If inventory is your pain, read the India-focused inventory landing page, skim the inventory module detail, then book a demo. We will map your SKUs, branches, and GST context without a cookie-cutter pitch.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/pricing", label: "View pricing" },
      { href: "/contact", label: "Book a demo" },
      { href: "/inventory-management-software-india", label: "Inventory software in India" },
      { href: "/erp-software-small-business-india", label: "ERP for small businesses in India" },
      { href: "/warehouse-management-system-india", label: "Warehouse management in India" },
      { href: "/modules/inventory", label: "Inventory module" },
    ],
  },
  {
    slug: "what-is-a-company-operating-system",
    breadcrumbName: "What is a company operating system",
    metaTitle: "What is a company operating system? | Zoveto",
    metaDescription:
      "Learn what a company operating system is and why modern teams replace disconnected ERP, CRM, and warehouse tools with one operational backbone.",
    h1: "What is a company operating system?",
    publishedAt: "2026-04-29",
    excerpt:
      "A company operating system is not another dashboard. It is the execution layer that keeps sales, stock, finance, and teams aligned daily.",
    sections: [
      {
        h2: "Definition without hype",
        paragraphs: [
          "A company operating system is a unified layer where core workflows execute against one shared source of truth. It connects teams that usually work in separate tools, so decisions are based on the same operational data.",
        ],
      },
      {
        h2: "How it differs from stitched software stacks",
        paragraphs: [
          "Traditional stacks optimize app depth but often create handoff gaps. An operating system model optimizes continuity of execution from lead to invoice and dispatch to reconciliation.",
        ],
      },
      {
        h2: "When teams should consider a shift",
        paragraphs: [
          "If leadership spends cycles reconciling reports from different tools, the architecture is already costing growth. Start with one critical workflow and expand after measurable gains.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/product", label: "Product architecture overview" },
      { href: "/pricing", label: "See pricing" },
      { href: "/contact", label: "Book a demo" },
      { href: "/modules/inventory", label: "Inventory module" },
    ],
  },
  {
    slug: "how-to-replace-excel-with-erp",
    breadcrumbName: "Replace Excel with ERP",
    metaTitle: "How to replace Excel with ERP safely | Zoveto",
    metaDescription:
      "A practical migration path to replace Excel with ERP: data cleanup, process mapping, phased rollout, and adoption controls for small operations teams.",
    h1: "How do you replace Excel with ERP for small businesses?",
    publishedAt: "2026-04-29",
    excerpt:
      "Excel replacement succeeds when rollout is phased and process-first. The goal is stable execution, not just importing rows into a new app.",
    sections: [
      {
        h2: "Start with one critical workflow",
        paragraphs: [
          "Small businesses should replace Excel in the workflow that causes the most operational risk first, usually inventory or quote-to-cash. A focused first phase reduces change fatigue and improves adoption quality.",
        ],
      },
      {
        h2: "Migration sequence that avoids chaos",
        paragraphs: [
          "Clean masters before importing transactions, define ownership for each process step, and run a short parallel period. This prevents hidden data quality issues from becoming system trust issues.",
        ],
      },
      {
        h2: "Adoption controls that actually work",
        paragraphs: [
          "Use role-based training, weekly exception reviews, and one accountable rollout owner. Teams adopt faster when the new flow removes obvious manual pain in week one.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/modules/inventory", label: "Inventory implementation guide" },
      { href: "/product", label: "Product operating model" },
      { href: "/pricing", label: "Pricing and plan fit" },
      { href: "/contact", label: "Plan your rollout call" },
    ],
  },
  {
    slug: "erp-crm-wms-one-platform",
    breadcrumbName: "ERP CRM WMS one operating record",
    metaTitle: "Can ERP, CRM, and WMS run on one operating record? | Zoveto",
    metaDescription:
      "Explore how one operating record can connect ERP, CRM, and WMS workflows to reduce handoff failures, improve speed, and keep finance and operations aligned.",
    h1: "Can ERP, CRM, and warehouse workflows run on one operating record?",
    publishedAt: "2026-04-29",
    excerpt:
      "Shared operating records reduce handoff failures between teams. The real advantage is faster execution with fewer reconciliation cycles.",
    sections: [
      {
        h2: "Why handoffs break in multi-tool stacks",
        paragraphs: [
          "When CRM, inventory, and warehouse workflows run separately, teams create local workarounds that are hard to audit. One operating record removes these handoff gaps by enforcing shared process states.",
        ],
      },
      {
        h2: "What must be unified first",
        paragraphs: [
          "Prioritize stock truth, order lifecycle, and posting logic so finance and operations agree on what happened. Reporting quality improves naturally once execution data is consistent.",
        ],
      },
      {
        h2: "Implementation guidance for scale",
        paragraphs: [
          "Use phased cutovers by workflow, not by department labels. This keeps customer impact low while adoption builds across teams.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/product", label: "See the product stack" },
      { href: "/modules/crm", label: "CRM module" },
      { href: "/modules/wms", label: "Warehouse module" },
      { href: "/pricing", label: "Compare plans" },
    ],
  },
  {
    slug: "how-to-automate-invoice-generation",
    breadcrumbName: "Automate invoice generation",
    metaTitle: "How to automate invoice generation reliably | Zoveto",
    metaDescription:
      "A practical method to automate invoice generation from sales and dispatch events while preserving tax compliance, accuracy, and approval controls.",
    h1: "How can you automate invoice generation without losing control?",
    publishedAt: "2026-04-29",
    excerpt:
      "Invoice automation should remove manual repetition, not financial governance. Good systems automate with approval rules and traceable exceptions.",
    sections: [
      {
        h2: "Automation should start from process signals",
        paragraphs: [
          "Invoice generation is safest when triggered by validated order and dispatch states instead of manual intent. This ensures billed values match operational reality from the beginning.",
        ],
      },
      {
        h2: "Controls to keep accuracy high",
        paragraphs: [
          "Use tax profile checks, price locks, and exception queues before posting. Automation quality depends on how quickly edge cases are surfaced and resolved.",
        ],
      },
      {
        h2: "KPIs to monitor post-launch",
        paragraphs: [
          "Track invoice turnaround time, correction rate, and reconciliation lag weekly. These metrics show whether automation is improving speed and trust together.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/modules/finance", label: "Finance module" },
      { href: "/modules/crm", label: "CRM to invoice flow" },
      { href: "/pricing", label: "Pricing plans" },
      { href: "/contact", label: "Talk to implementation team" },
    ],
  },
  {
    slug: "ai-agents-for-inventory-management",
    breadcrumbName: "AI agents inventory management",
    metaTitle: "How AI agents improve inventory management | Zoveto",
    metaDescription:
      "Understand where AI agents help inventory teams most: anomaly detection, reorder guidance, and exception triage tied to real operational workflows.",
    h1: "How do AI agents help with inventory management?",
    publishedAt: "2026-04-29",
    excerpt:
      "AI in inventory works best on repetitive decision loops. It should assist planners and operators, not hide process logic behind black boxes.",
    sections: [
      {
        h2: "High-value AI use cases",
        paragraphs: [
          "AI agents add value by flagging stock anomalies, predicting risk bands, and surfacing priority actions for planners. The highest impact comes from augmenting existing decisions, not replacing them.",
        ],
      },
      {
        h2: "Operational guardrails",
        paragraphs: [
          "Recommendations should be transparent, reversible, and tied to policy limits. Teams trust AI faster when they can inspect why a suggestion was made.",
        ],
      },
      {
        h2: "Measurement model",
        paragraphs: [
          "Track stockout rate, excess inventory, and planner response speed before and after AI rollout. These outcomes prove whether intelligence is improving execution quality.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/modules/inventory", label: "Inventory module details" },
      { href: "/product", label: "AI and operations architecture" },
      { href: "/pricing", label: "Plan and pricing options" },
      { href: "/contact", label: "Book an AI workflow demo" },
    ],
  },
  {
    slug: "erp-software-for-distributors-guide",
    breadcrumbName: "ERP for distributors",
    metaTitle: "What ERP software should distributors choose? | Zoveto",
    metaDescription:
      "A practical ERP evaluation guide for distributors: inventory velocity, margin visibility, branch control, and route-to-cash continuity in one system.",
    h1: "What ERP software is best for distributors?",
    publishedAt: "2026-04-29",
    excerpt:
      "Distributors need execution speed and margin control at the same time. The right ERP balances stock velocity, branch governance, and cash discipline.",
    sections: [
      {
        h2: "Distribution-specific decision criteria",
        paragraphs: [
          "Distributor ERP selection should prioritize stock turn visibility, branch-level execution control, and route-to-cash continuity. These are the levers that protect margin under growth pressure.",
        ],
      },
      {
        h2: "Common architecture mistakes",
        paragraphs: [
          "Many teams choose separate tools for sales, warehouse, and finance, then spend months fixing sync errors. A unified process model reduces this hidden operational tax.",
        ],
      },
      {
        h2: "Practical rollout sequence",
        paragraphs: [
          "Start with top SKUs, high-volume branches, and core collections flow to prove value quickly. Expand after baseline KPIs stabilize for two reporting cycles.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/warehouse-management-system-india", label: "Warehouse guide" },
      { href: "/inventory-management-software-india", label: "Inventory guide" },
      { href: "/pricing", label: "See plan tiers" },
      { href: "/contact", label: "Schedule distributor fit call" },
    ],
  },
  {
    slug: "manufacturing-erp-software-checklist",
    breadcrumbName: "Manufacturing ERP checklist",
    metaTitle: "How to evaluate manufacturing ERP software | Zoveto",
    metaDescription:
      "Use this manufacturing ERP checklist to assess production planning, inventory control, quality traceability, and finance integration before buying.",
    h1: "How should you evaluate manufacturing ERP software?",
    publishedAt: "2026-04-29",
    excerpt:
      "Manufacturing ERP decisions fail when buyers optimize demo features over plant execution reality. A checklist approach keeps evaluation grounded.",
    sections: [
      {
        h2: "Execution-first checklist",
        paragraphs: [
          "Manufacturing ERP evaluation should begin with production planning reliability, BOM discipline, and material traceability under real plant conditions. Systems that pass these checks usually perform better after go-live.",
        ],
      },
      {
        h2: "Cross-functional alignment tests",
        paragraphs: [
          "Validate how shopfloor events update inventory and finance without manual re-entry. If this bridge is weak, month-end friction will continue after implementation.",
        ],
      },
      {
        h2: "Adoption and governance",
        paragraphs: [
          "Define role ownership, exception rules, and review cadence before rollout. Governance design is often the difference between stable adoption and rollback risk.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/modules/inventory", label: "Inventory and BOM capability" },
      { href: "/modules/finance", label: "Finance integration module" },
      { href: "/product", label: "Unified operations architecture" },
      { href: "/contact", label: "Book manufacturing discovery call" },
    ],
  },
];

export const BLOG_SLUGS: readonly string[] = posts.map((p) => p.slug);

export function getAllBlogPosts(): readonly BlogPost[] {
  return posts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
