/** FAQ copy for the dedicated /pricing page (accordion + optional schema). */

export type PricingPageFaqItem = {
  question: string;
  answer: string;
};

export const PRICING_PAGE_FAQ: PricingPageFaqItem[] = [
  {
    question: "Can I buy just one module?",
    answer:
      "Yes. Every module — WMS, CRM, ERP, HRMS, and Intelligence — is independently purchasable. Pay only for what your team actually uses. If you need two or more, the Operations Suite or Business OS bundles give you a better effective rate than buying modules separately.",
  },
  {
    question: "What's the difference between Operations Suite and Business OS?",
    answer:
      "Operations Suite bundles WMS, ERP, and CRM — the three modules most operations-led businesses need from day one. Business OS adds HRMS and Intelligence on top, giving you payroll, AI automations, and MIS dashboards. Both bundles cost less than buying the same modules individually.",
  },
  {
    question: "Can I add more users or modules later?",
    answer:
      "Yes. You can add more users or upgrade to a larger bundle at any point. Most teams start with one or two modules, see results, and expand from there. Upgrades keep your data and workflows on the same stack — no re-platforming required.",
  },
  {
    question: "Are prices inclusive of GST?",
    answer:
      "Listed prices are exclusive of GST. Indian GST (18%) is applied on invoices in line with local regulations (SAC code 998314). Annual plans include a pro-rated refund if cancelled within 30 days. Data export is available for 30 days after cancellation.",
  },
];
