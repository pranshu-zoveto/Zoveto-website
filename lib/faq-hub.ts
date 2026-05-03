/**
 * Site-wide FAQ hub (/faq). Questions are distinct from page-specific SEO/compare/blog FAQs.
 */

export type FaqHubItem = { question: string; answer: string };

export type FaqHubCategory = {
  id: string;
  title: string;
  items: readonly FaqHubItem[];
};

export const FAQ_HUB_CATEGORIES: readonly FaqHubCategory[] = [
  {
    id: "os-basics",
    title: "Company Operating System basics",
    items: [
      {
        question: "What does “Company Operating System” mean at Zoveto?",
        answer:
          "It is the execution layer where orders, stock, warehouse moves, billing, and collections post as one chain for Indian SMBs—so teams stop reconciling WhatsApp, Excel, and siloed apps at month-end.",
      },
      {
        question: "How is a Company Operating System different from buying “an ERP plus apps”?",
        answer:
          "Bundles still leave integration seams. Zoveto’s model narrows module scope so the workflows you run daily share one operating record instead of many partial truths.",
      },
      {
        question: "Who is Zoveto built for?",
        answer:
          "Operations-heavy Indian SMBs in trading, distribution, spare parts, manufacturing, and warehousing that outgrew spreadsheet bridges between sales and dispatch.",
      },
      {
        question: "Does Zoveto replace my accountant or CA?",
        answer:
          "No. It reduces re-keying and drift between operations and finance so compliance partners spend less time reconstructing what already happened.",
      },
      {
        question: "How fast can teams expect to go live?",
        answer:
          "Zoveto uses qualification-first onboarding—timelines depend on branches, SKU hygiene, and data readiness. Expect a structured rollout, not anonymous instant provisioning for every edge case.",
      },
      {
        question: "Where should I start learning the product?",
        answer:
          "Read the product overview and pricing, then book a demo mapped to your quote-to-cash or inventory workflow so screens match your reality.",
      },
      {
        question: "What is the honest downside of a narrower OS versus a huge suite?",
        answer:
          "You may not find every niche vertical app inside Zoveto. The tradeoff is fewer integration seams for the core operating loop Zoveto productises.",
      },
      {
        question: "How do we decide between Zoveto and stitching best-of-breed tools?",
        answer:
          "If you already employ integration owners and like assembling apps, suites can win. If seams are costing margin weekly, an OS-first spine may be cheaper to run.",
      },
    ],
  },
  {
    id: "gst-accounting",
    title: "GST and accounting",
    items: [
      {
        question: "Is Zoveto built for Indian GST workflows?",
        answer:
          "Yes—invoice and credit-note patterns are designed around posted operational events typical for Indian SMBs. Your configuration, masters, and CA review still define filing correctness.",
      },
      {
        question: "How does Zoveto reduce GST reconciliation pain?",
        answer:
          "By tying dispatch and return context to billing lines instead of retyping parallel sheets—fewer mismatches between what moved and what was invoiced.",
      },
      {
        question: "Can Zoveto handle multiple GST registrations?",
        answer:
          "Multi-entity groups are common. Bring branch and registration structure to a demo so ledgers, tax profiles, and reporting boundaries are mapped honestly.",
      },
      {
        question: "Does Zoveto replace Tally for every business?",
        answer:
          "Not automatically. Tally remains strong for finance-led compliance at modest operational complexity. Zoveto targets teams where warehouse and dealer execution broke out of voucher-only discipline.",
      },
      {
        question: "What should finance verify before go-live?",
        answer:
          "Chart mapping, opening balances, credit workflows, and return reason codes tied to stock—those controls matter more than generic “GST ready” labels.",
      },
      {
        question: "How should branch transfers appear to auditors?",
        answer:
          "Transfers should leave clear in-transit and receipt postings with user and timestamp context so audits do not depend on reconstructed spreadsheets.",
      },
    ],
  },
  {
    id: "inventory-warehouse",
    title: "Inventory and warehouse",
    items: [
      {
        question: "How does Zoveto improve stock accuracy?",
        answer:
          "Through posted GRN, reservations against orders, scan-backed picks where you adopt them, and branch-aware availability—accuracy is a behaviour plus software discipline.",
      },
      {
        question: "Can Zoveto model multi-branch and in-transit stock?",
        answer:
          "Yes for the footprint Zoveto targets—walk your transfer and RTO patterns on a demo so in-transit states match how your team actually moves goods.",
      },
      {
        question: "What warehouse capabilities should I validate in a demo?",
        answer:
          "Pick tasks, dispatch closure, exception handling, and finance visibility on the same timeline—skip checklist theatre that never touches your dock process.",
      },
      {
        question: "How do returns affect inventory and GST together?",
        answer:
          "Returns should reopen stock with reason codes and tie credit notes to original dispatch context. That is how you stop returns from becoming silent margin leaks.",
      },
      {
        question: "When is a dedicated WMS still required?",
        answer:
          "When automation depth, robotics, or carrier constraints exceed Zoveto’s current target footprint—be honest about pick volume and error cost in discovery.",
      },
      {
        question: "What is cycle counting discipline in plain terms?",
        answer:
          "Count subsets of bins on a cadence, post variances immediately, and investigate root causes—software makes variance visible; process makes it shrink.",
      },
      {
        question: "How does Zoveto help with slow-moving and dead stock?",
        answer:
          "Aging and velocity views tied to the same ledger as sales—so purchasing and finance agree which SKUs tie cash before write-offs surprise leadership.",
      },
    ],
  },
  {
    id: "crm-sales",
    title: "CRM and sales",
    items: [
      {
        question: "How does CRM connect to inventory in Zoveto?",
        answer:
          "For covered workflows, quotes and orders respect posted availability and credit posture so sales stops promising stock the warehouse cannot ship.",
      },
      {
        question: "Can field teams work without constant WhatsApp checks?",
        answer:
          "The goal is that commitments, tasks, and customer timelines read from the same record as dispatch—reducing phone round-trips when discipline is maintained.",
      },
      {
        question: "Does Zoveto include pipeline automation like large CRM suites?",
        answer:
          "Zoveto focuses CRM depth on operational continuity for Indian SMB distribution patterns—not every marketing automation bell found in enterprise CRM catalogs.",
      },
      {
        question: "How should we evaluate credit control?",
        answer:
          "Check whether limits enforce at order save, how overdue tasks surface to owners, and whether collections tie to ledger rows instead of ad-hoc reminders.",
      },
      {
        question: "How do dealer schemes and price lists stay governable?",
        answer:
          "Master data ownership, approval on exceptions, and posted evidence for special pricing—so promotions do not become unauditable side deals in inboxes.",
      },
    ],
  },
  {
    id: "ai-automation",
    title: "AI and automation",
    items: [
      {
        question: "Where does Zoveto apply AI responsibly?",
        answer:
          "On repeatable exception loops with transparent rules—think triage, suggestions inside policy bands, and surfacing anomalies—not black-box autopilot on money postings.",
      },
      {
        question: "Do I need clean masters before turning on automation?",
        answer:
          "Yes. Automation on dirty item or branch data amplifies noise. Fix ownership and masters first, then layer assistance where teams agree guardrails.",
      },
      {
        question: "What outcomes should we measure after automation?",
        answer:
          "Planner response time to exceptions, invoice correction rate, stockout frequency on protected SKUs, and cash collection cadence—pick three and review weekly.",
      },
      {
        question: "Can automation replace approvals for GST-sensitive flows?",
        answer:
          "No. Approvals and tax checks stay in human-controlled steps; automation should queue work, not silently post risky changes.",
      },
      {
        question: "What is a safe first automation for an Indian SMB?",
        answer:
          "Low-risk reminders on overdue tasks with clear owners—prove adoption before automating postings that touch tax or cash.",
      },
    ],
  },
];

/** Client + tests: categories whose Q/A contain the query (case-insensitive). Empty query returns all categories. */
export function filterFaqHubByQuery(query: string): FaqHubCategory[] {
  const q = query.trim().toLowerCase();
  if (!q) return FAQ_HUB_CATEGORIES.map((c) => ({ ...c, items: [...c.items] }));
  return FAQ_HUB_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q),
    ),
  })).filter((cat) => cat.items.length > 0);
}

export function getAllFaqHubItems(): readonly FaqHubItem[] {
  return FAQ_HUB_CATEGORIES.flatMap((c) => c.items);
}
