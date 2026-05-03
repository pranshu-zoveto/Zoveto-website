/**
 * Phase-1 long-form SEO for /industries/spare-parts-trading only.
 * FAQ visible copy must match FAQPage JSON-LD on that route.
 */

export const SPARE_PARTS_PHASE1_META = {
  metaTitle: "Spare parts trading ERP India: inventory & GST | Zoveto",
  metaDescription:
    "Spare parts trading ERP for India: branch SKU chaos, GST, WhatsApp quotes vs one execution-first Company OS. Inventory, picks, dispatch—honest guide. Book demo.",
} as const;

export type Phase1IndustrySection = {
  h2: string;
  paragraphs: readonly string[];
};

export const SPARE_PARTS_PHASE1_SECTIONS: readonly Phase1IndustrySection[] = [
  {
    h2: "Direct answer: best system for spare parts traders in India",
    paragraphs: [
      "The best operational spine for Indian spare parts trading is one that posts quotes, reservations, picks, dispatch, GST billing, and receivables tasks on the same record—without forcing your warehouse to become the unofficial catalog. Zoveto is built as a Company Operating System for that exact failure mode: thousands of near-identical SKUs, supersessions, branch drift, and dealer WhatsApp that should become structured demand instead of tribal memory.",
      "If your competitive edge is availability and turnaround, the system has to win on the phone call your dealer makes at 4 PM—not only on the month-end stock valuation report. That is why “ERP software India” searches from parts traders should be answered with execution coherence first: can your team quote, reserve, pick, and ship without retyping the same facts into three places?",
    ],
  },
  {
    h2: "Problem context: WhatsApp, Excel, and GST pain on the shop floor",
    paragraphs: [
      "Dealers expect fast quotes; your team still calls the branch because nobody trusts the number in the system. Monday’s stock file is stale by Tuesday morning when three vans issued parts without updating the same row. GST compliance then becomes a reconciliation project: credit notes multiply lines, returns need clean linkage to original dispatch, and your CA asks questions your gate register cannot answer without reconstruction.",
      "Inventory mismatch is expensive in parts trading because margin lives in volume on low lines—one wrong pick wipes the week on a basket of fasteners or filters. Branch managers defend shadow Excel because it feels faster than waiting for finance to re-key. The business pays twice: once for compliance in the ledger and once for execution chaos at the bench.",
      "A relatable Indore or Chennai pattern: a workshop needs four SKUs by tomorrow; sales confirms verbally; the pick list is handwritten; dispatch closes on paper; finance invoices from a different quantity because someone “fixed” stock in a side sheet. Nobody is lazy—tools are misaligned with how dense catalogs actually move.",
      "Festive season spikes make the pain visible: enquiry volume jumps, but throughput is capped by how fast humans can phone-check stock. You lose deals not because you lack inventory, but because you cannot prove availability fast enough. Meanwhile slow movers sit in Branch B while Branch A air-freights emergency stock—classic demand visibility failure when transfers are reactive instead of posted early.",
    ],
  },
  {
    h2: "Solution: execution-first Company Operating System—not an ERP clone",
    paragraphs: [
      "Zoveto is not positioning as a generic ERP clone or a Tally replacement. It is an execution-first Company Operating System: ERP plus CRM plus WMS plus finance discipline plus automation where teams agree rules first. CRM captures enquiry with fitment context; inventory shows branch truth; warehouse issues scan-backed tasks; dispatch posts evidence finance reads; aging drives collection cadence instead of personal WhatsApp guilt.",
      "AI belongs where repeat decisions burn time—exception routing, suggested putaway, nudges when credit posture is about to breach—not as magic that replaces your gate discipline. Real-time ops means leadership sees quote backlog, pick errors, and overdue receivables from posted activity, not from merged extracts every Friday.",
      "For aftermarket distributors, the product bet is simple: fewer heroic clerks and more repeatable rules. When a dealer asks whether part A supersedes part B, that answer should live beside the SKU master your warehouse picks from—not in a senior employee’s head. When a transfer moves stock between branches, both sides should see the same in-transit and receipt postings instead of arguing from two spreadsheets.",
      "Zoveto’s modular spine—Command Center, Operations, Inventory, CRM, Finance—is wired so module boundaries do not become organisational boundaries. That is how you reduce the “call the warehouse” culture without pretending humans stop making judgement calls; you give them posted facts at decision time.",
    ],
  },
  {
    h2: "Comparison context: when to read Tally vs Zoveto or Zoho vs Zoveto",
    paragraphs: [
      "If your ledger is clean but execution is not, read the Tally vs Zoveto comparison for warehouse-led Indian SMBs—honest about where finance-first tools stop and execution systems start. If your pain is multi-app seams between CRM, inventory, and Books, read Zoho vs Zoveto for how a narrower operating spine reduces handoffs at scale. Neither page is competitor bashing; both are fit maps.",
    ],
  },
  {
    h2: "Case study: Rock Tear Parts on one operating record",
    paragraphs: [
      "See the Rock Tear Parts case study for a grounded before-and-after narrative: dealer quote cycles, scan-first picking, and receivables tasks tied to aging. Figures there are illustrative SMB proxies—your branch count and catalogue hygiene still dominate outcomes.",
      "Use that page alongside this industry guide: the industry page explains the vertical failure modes; the case study shows how one representative trader pattern tightened quote-to-dispatch discipline when execution moved onto a single operating record instead of parallel sheets.",
    ],
  },
];

/** Intro copy for the feature checklist on the industry landing (rendered above SPARE_PARTS_PHASE1_FEATURES). */
export const SPARE_PARTS_PHASE1_FEATURES_INTRO =
  "Below is a short, opinionated checklist aligned to how Indian parts traders actually lose money—wrong picks, double-sold lines, late invoices, and invisible receivables risk. It is not a dump of every module Zoveto ships; it is the slice that matters first when you are evaluating spare parts trading ERP software for real dispatch volume operationally today across branches.";

export const SPARE_PARTS_PHASE1_FEATURES = [
  "Branch-aware SKU master with supersession and pack-size discipline",
  "Quote flow with live availability and enforced price rules",
  "Reservations that reduce double-selling the same physical line",
  "Scan-backed pick, pack, and dispatch with mismatch gates",
  "GST invoice lines generated from posted dispatch truth",
  "Credit limits enforced when orders save—not only in month-end reviews",
  "Collections tasks generated from ledger aging, not ad-hoc chats",
  "Command-style visibility for backlog, branch skew, and margin pressure",
] as const;

export const SPARE_PARTS_PHASE1_FAQS = [
  {
    question: "What is the best ERP for spare parts dealers in India?",
    answer:
      "The best fit depends on catalogue depth, branch count, and whether your bottleneck is quoting speed, pick accuracy, or GST recon—not brochure feature count. Zoveto targets execution-first consolidation for parts-heavy SMBs; evaluate honestly against how you actually ship today.",
  },
  {
    question: "Is Zoveto GST compliant for high line-count traders?",
    answer:
      "Zoveto includes GST-aware workflows tied to operational postings. Final correctness depends on your configuration, masters, and CA review—especially on credits and returns volume typical in parts trading.",
  },
  {
    question: "Can we keep WhatsApp with dealers and still use Zoveto?",
    answer:
      "WhatsApp remains a channel; the goal is that commitments, stock checks, and follow-ups become structured rows tied to parts and customers so context does not evaporate when someone changes phones.",
  },
  {
    question: "How does Zoveto differ from inventory-only tools?",
    answer:
      "Inventory-only tools solve part of the story. Zoveto connects CRM demand, warehouse execution, dispatch evidence, and finance outcomes so you do not rebuild truth at every seam.",
  },
  {
    question: "Who is a poor fit for Zoveto?",
    answer:
      "Very small teams with no warehouse complexity and no multi-branch coordination may not need this depth. Zoveto is aimed at operations-heavy SMBs willing to run disciplined posting.",
  },
  {
    question: "How do we onboard without stopping the business?",
    answer:
      "Onboarding is qualification-first with a structured rollout plan—scope, data readiness, and training are explicit. Expect partnership, not anonymous instant provisioning for every edge case.",
  },
  {
    question: "Does Zoveto replace our existing accounting package on day one?",
    answer:
      "Cutover strategy is scoped with your team and advisors. Zoveto’s value is consolidation of execution; finance migration timing depends on your comfort, data hygiene, and reporting needs—not a forced big-bang promise in a marketing paragraph.",
  },
] as const;

export function sparePartsPhase1PlainText(): string {
  const sections = SPARE_PARTS_PHASE1_SECTIONS.map((s) => [s.h2, ...s.paragraphs].join(" ")).join(" ");
  const feats = `${SPARE_PARTS_PHASE1_FEATURES_INTRO} ${SPARE_PARTS_PHASE1_FEATURES.join(" ")}`;
  const faq = SPARE_PARTS_PHASE1_FAQS.map((f) => `${f.question} ${f.answer}`).join(" ");
  return `${SPARE_PARTS_PHASE1_META.metaTitle} ${SPARE_PARTS_PHASE1_META.metaDescription} ${sections} ${feats} ${faq}`;
}

export function sparePartsPhase1WordCount(): number {
  return sparePartsPhase1PlainText()
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
