import type { Metadata } from "next";
import Link from "next/link";
import { DirectAnswerLead } from "@/components/aeo/DirectAnswerLead";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { Text } from "@/components/ui/Text";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { canonicalUrl } from "@/lib/site";
import { ReorderPointCalculatorClient } from "./ReorderPointCalculatorClient";

const PATH = "/reorder-point-calculator";

const faqs = [
  {
    q: "What is a reorder point?",
    a: "A reorder point is the stock level where a business should raise a purchase order so expected demand during supplier lead time is covered.",
  },
  {
    q: "What formula does this calculator use?",
    a: "The calculator uses average daily sales multiplied by supplier lead time in days, then adds safety stock.",
  },
  {
    q: "How should Indian SMBs choose safety stock?",
    a: "Safety stock should reflect supplier delays, demand spikes, and the cost of stockouts. Start conservative, then tune it using real movement data.",
  },
  {
    q: "Can this replace inventory software?",
    a: "No. The calculator helps with one SKU rule. Inventory software is needed when multiple SKUs, branches, purchase orders, and warehouse movements must stay synchronized.",
  },
  {
    q: "How does Zoveto use reorder points?",
    a: "Zoveto can connect reorder logic to posted inventory, purchase, and warehouse workflows so alerts are based on current operating data.",
  },
];

export const metadata: Metadata = {
  title: "Reorder Point Calculator India | Zoveto",
  description:
    "Free reorder point calculator for Indian SMB inventory teams. Calculate when to reorder using daily sales, lead time, and safety stock.",
  alternates: { canonical: canonicalUrl(PATH) },
  openGraph: {
    title: "Reorder Point Calculator India | Zoveto",
    description: "Calculate reorder points and connect inventory planning to Zoveto workflows.",
    url: canonicalUrl(PATH),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reorder Point Calculator India | Zoveto",
    description: "Free reorder point calculator for inventory teams.",
    images: ["/og-image.png"],
  },
};

export default function ReorderPointCalculatorPage() {
  return (
    <main className="relative overflow-hidden bg-background pb-16 pt-36 md:pb-24 md:pt-44">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Reorder point calculator", path: PATH },
        ]}
      />
      <FAQPageSchema faqs={faqs} url={canonicalUrl(PATH)} />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <Text variant="label-uppercase" className="mb-4 text-muted-2">
            Free inventory tool
          </Text>
          <Text variant="display-2" as="h1" className="mb-6 text-balance text-foreground">
            Reorder point calculator for inventory teams
          </Text>
          <DirectAnswerLead text={"A reorder point tells you when to buy before stock runs out.\nUse daily sales, supplier lead time, and safety stock to set a simple SKU rule your team can review."} />
          <Text variant="body-lg" as="p" className="mx-auto max-w-2xl text-pretty text-muted">
            Use this calculator for a quick planning check, then connect your live SKU, purchase, and warehouse data in
            Zoveto when manual reorder tracking starts breaking down.
          </Text>
        </header>

        <ReorderPointCalculatorClient />

        <section className="mx-auto mt-14 max-w-3xl space-y-6" aria-labelledby="calculator-faq-heading">
          <Text variant="heading-1" as="h2" id="calculator-faq-heading" className="text-xl text-foreground">
            Frequently asked questions
          </Text>
          <FaqAccordion items={faqs} idPrefix="reorder-point-calculator" />
          <p className="text-sm text-muted">
            For connected inventory workflows, see{" "}
            <Link href="/modules/inventory" className="font-medium text-blue underline-offset-4 hover:underline">
              Zoveto Inventory
            </Link>{" "}
            or{" "}
            <Link href="/contact#demo" className="font-medium text-blue underline-offset-4 hover:underline">
              book a demo
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
