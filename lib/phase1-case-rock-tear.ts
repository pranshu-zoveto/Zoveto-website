/**
 * Case study: Rock Tear Parts — /case-studies/rock-tear-parts
 * FAQ visible copy must match FAQPage JSON-LD on that route.
 */

export const ROCK_TEAR_META = {
  metaTitle: "Rock Tear Parts case study: spare parts ERP India | Zoveto",
  metaDescription:
    "Rock Tear Parts India SMB pattern: WhatsApp quotes, pick errors, GST recon vs Zoveto one operating record. Honest illustrative before/after story—book demo.",
} as const;

export const ROCK_TEAR_H1 = "Rock Tear Parts: spare parts trading on one operating record (India SMB)";

export const ROCK_TEAR_HERO_SUB =
  "Rock Tear Parts is a representative Indian aftermarket spare-parts trader: dense SKUs, branch stock, dealer WhatsApp, and GST-heavy line volumes. This case study uses illustrative before-and-after proxies—not audited financial claims—to show why execution-first ERP matters when Tally is clean but the warehouse is not.";

export const ROCK_TEAR_SECTIONS: readonly { h2: string; paragraphs: readonly string[] }[] = [
  {
    h2: "Direct answer: what changed when execution moved onto Zoveto",
    paragraphs: [
      "The operating change was coherence: quotes referenced posted availability, reservations reduced double-selling, scan gates cut wrong-part exits, dispatch closure became the trigger finance read for GST lines, and receivables tasks tied to aging replaced ad-hoc dealer pings. The business did not buy “more software”; it bought fewer seams between what happened and what was billed.",
      "Customer service stopped being the department that apologises for three different answers. When a dealer asked where an order was, the timeline read from posted pick and dispatch events—not from a clerk reconstructing chats. That single-thread visibility is what Indian SMBs mean when they say they want “real-time,” even if they phrase it as fewer angry phone calls.",
    ],
  },
  {
    h2: "India-specific problem context before the switch",
    paragraphs: [
      "Before, dealer enquiries spiked on WhatsApp during festival season while the warehouse still confirmed picks verbally. Tally carried statutory books respectably, but branch shadow sheets decided who could promise what by 4 PM. Wrong-pack shipments generated credit notes that erased margin on low-line baskets; GST recon became a scavenger hunt linking returns to dispatch slips filed late.",
      "Collections discipline lived in relationship managers’ phones: aging existed in the ledger, but follow-up cadence did not. Leadership saw revenue in CRM and vouchers in Tally while dispatch reality arrived days later. That is a classic execution gap—not a failure of Indian SMB work ethic, but a tooling gap between compliance spine and bench truth.",
      "Inventory mismatch showed up as emergency transfers between branches: Branch A starved while Branch B held slow movers, because demand signals were not posted early enough to rebalance proactively. Expedited freight and dealer credits ate the quarter quietly because nobody saw the pattern until month-end stock valuation meetings.",
      "OEM and fleet customers amplified pressure: they wanted predictable ETAs and clean GST documentation, while internal teams juggled partial picks and back-order promises. Without a single execution thread, the business traded customer trust for short-term firefighting—a pattern Zoveto targets by making partial availability and dispatch status legible to everyone who touches the order row.",
    ],
  },
  {
    h2: "Zoveto as Company Operating System—not a Tally or Zoho clone",
    paragraphs: [
      "Zoveto was not pitched as a Tally replacement or a Zoho clone. It was adopted as a Company Operating System: CRM for structured dealer threads, inventory for branch truth, WMS for scan-backed execution, finance for GST lines tied to posted dispatch, and automation where the team defined repeat rules. AI assisted exception routing—after humans agreed what “good” looks like—not as a substitute for gate discipline.",
      "The philosophical shift was simple: vouchers follow operations instead of operations chasing vouchers. That posture matters in Indian parts trading because line counts are high and credits multiply quickly when the first wrong pick ships.",
      "Operations meetings changed tone: instead of debating which spreadsheet was correct, managers reviewed exceptions against posted rules—missed scans, late reservations, credit breaches. That is how software becomes governance without pretending humans disappear from the loop.",
      "Training investment was explicit: bench staff learned scan-first habits; sales learned to treat availability as a posted object, not a favour from the warehouse; finance learned to invoice from dispatch closure rather than from verbal confirmations. Change management was the hidden cost line—and the case assumes leadership funded it, not only the licence line.",
    ],
  },
  {
    h2: "Before → after (illustrative SMB proxies)",
    paragraphs: [
      "Before: quote turnaround often required a warehouse callback; pick errors at peak season were material enough to notice in margin reviews; receivables follow-up was uneven. After: quote turnaround bound to posted availability reduced round-trip phone load in the narrative; scan-first picking reduced wrong-part exits before dispatch; aging-driven tasks made overdue cash visible earlier to leadership.",
      "These statements are directional patterns for education—not guarantees for your business. Your SKU hygiene, branch count, and training investment dominate outcomes. The case is useful because it names the failure modes Indian traders recognise, then maps them to posted execution disciplines Zoveto targets.",
      "Branch transfer behaviour improved in the story because in-transit and receipt postings became visible to sales—not because transfers magically became faster, but because the system reduced hidden stock in limbo. Dealers stopped hearing “check tomorrow” for SKUs that were physically sitting two cities over but invisible to quoting screens.",
      "Month-end close shortened in qualitative terms because fewer invoices required forensic rebuilds from gate papers. Finance spent less time asking operations “what actually shipped” and more time on controls—again a pattern claim, not an audited hours-saved metric.",
    ],
  },
];

export const ROCK_TEAR_FEATURES_INTRO =
  "Below is the capability slice that mattered first for this archetype—not a full module catalogue. Use it as a checklist when you compare spare parts trading ERP vendors for Indian SMB realities: dense SKUs, branch complexity, GST credits, and dealer speed.";

export const ROCK_TEAR_FEATURES = [
  "Dealer enquiry captured with part and fitment context in CRM",
  "Live availability and price rules inside the quoting path",
  "Reservations when orders confirm to prevent double-selling",
  "Scan-backed pick and pack with mismatch checks before gate exit",
  "Dispatch closure as shared evidence for service and finance",
  "GST invoice lines generated from posted dispatch quantities",
  "Credit limits enforced when orders save",
  "Collections tasks tied to ledger aging instead of personal reminders",
] as const;

export const ROCK_TEAR_FAQS = [
  {
    question: "Are the Rock Tear Parts numbers audited?",
    answer:
      "No. This page uses illustrative SMB proxies to explain operational patterns. Any quantitative claim in your own rollout should come from your books, warehouse metrics, and advisor review—not from a marketing case narrative.",
  },
  {
    question: "Is Rock Tear Parts a real company name?",
    answer:
      "It is used here as a representative aftermarket trader pattern for Indian readers evaluating spare parts ERP software. Treat the story as an operational archetype, not a stock ticker.",
  },
  {
    question: "Does this case study mean we must leave Tally?",
    answer:
      "Not as a universal rule. The lesson is fit: when finance tools are accurate but execution is fragmented, consolidation of the operating loop is the lever. Cutover strategy is always scoped with your team and advisors.",
  },
  {
    question: "How does this relate to Zoho vs Zoveto or Tally vs Zoveto?",
    answer:
      "Those comparisons explain competitive fit; this case study grounds the same ideas in dealer quotes, warehouse scans, and GST context. Read them together if you are evaluating suite breadth versus execution-first depth.",
  },
  {
    question: "What should we demo first if we are similar?",
    answer:
      "Quote-to-reserve, pick with scan gates, dispatch closure feeding invoice lines, and receivables tasks from aging—those four flows surface whether the product matches your pain in a 20-minute walkthrough.",
  },
  {
    question: "Is Zoveto GST compliant?",
    answer:
      "Zoveto includes GST-aware workflows suited to Indian SMB posting patterns. Your CA and master data still define filing correctness; the product reduces operational-to-finance drift when used with discipline.",
  },
  {
    question: "Where should we start reading if we sell industrial spares?",
    answer:
      "Start with the spare parts trading industry page for vertical failure modes, then this case study for a narrative shape, then Tally vs Zoveto or Zoho vs Zoveto depending on whether your current pain is finance-led tooling or multi-app seams.",
  },
] as const;

export function rockTearCasePlainText(): string {
  const sections = ROCK_TEAR_SECTIONS.map((s) => [s.h2, ...s.paragraphs].join(" ")).join(" ");
  const feats = `${ROCK_TEAR_FEATURES_INTRO} ${ROCK_TEAR_FEATURES.join(" ")}`;
  const faq = ROCK_TEAR_FAQS.map((f) => `${f.question} ${f.answer}`).join(" ");
  return `${ROCK_TEAR_META.metaTitle} ${ROCK_TEAR_META.metaDescription} ${ROCK_TEAR_H1} ${ROCK_TEAR_HERO_SUB} ${sections} ${feats} ${faq}`;
}

export function rockTearCaseWordCount(): number {
  return rockTearCasePlainText()
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
