/** FAQ copy for the dedicated /pricing page (accordion + optional schema). */

export type PricingPageFaqItem = {
  question: string;
  answer: string;
};

export const PRICING_PAGE_FAQ: PricingPageFaqItem[] = [
  {
    question: "How much does Zoveto cost?",
    answer:
      "Zoveto pricing starts with a Free tier for structured testing, annual paid plans with Starter from ₹5,999/mo effective on yearly billing or ₹7,999/mo when billed monthly (up to 10 users), and Growth from ₹14,999/mo effective (15 users including HRMS and higher automation limits), plus Enterprise scoped after discovery. Listed amounts exclude GST; invoices follow Indian GST rules where applicable. Yearly billing is the default on the pricing page; monthly is available if you prefer shorter commitments.",
  },
  {
    question: "What happens after we request access?",
    answer:
      "Your request enters founder review. If the use case is a fit for the current batch, we schedule manual onboarding before opening a workspace. This keeps early access controlled instead of creating instant trial accounts.",
  },
  {
    question: "How does yearly billing compare to monthly?",
    answer:
      "Yearly billing is the default on the pricing page and shows an effective monthly rate with savings where applicable. Monthly billing is available if you prefer shorter commitment cycles; totals adjust and GST is applied on invoices as usual.",
  },
  {
    question: "Can we start on Starter and move to Growth later?",
    answer:
      "Yes. Most teams begin on Starter or Growth and upgrade when locations, users, or automation volume grows. Upgrades are designed to keep your data and workflows on the same stack—no replatforming project.",
  },
  {
    question: "What does Enterprise cover versus public plans?",
    answer:
      "Enterprise is for larger orgs that need custom SLAs, deeper integrations, dedicated success coverage, and procurement-friendly terms. Pricing is scoped to your footprint after a short discovery call—not a generic per-seat grid.",
  },
  {
    question: "Are prices inclusive of GST?",
    answer:
      "Listed prices are exclusive of GST. Indian GST (typically 18% where applicable) is shown on invoices in line with local regulations. International billing may differ; use the currency toggle where offered.",
  },
];
