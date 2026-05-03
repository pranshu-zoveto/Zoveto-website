import type { Metadata } from "next";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FaqHubClient } from "@/components/faq/FaqHubClient";
import { getAllFaqHubItems } from "@/lib/faq-hub";
import { canonicalUrl } from "@/lib/site";

const PATH = "/faq";

export const metadata: Metadata = {
  title: "FAQ | Zoveto Company Operating System",
  description:
    "Answers on Zoveto as a Company Operating System for Indian SMBs—GST, inventory, warehouse, CRM, sales, and automation. Same copy as on-page FAQs for transparency.",
  alternates: { canonical: canonicalUrl(PATH) },
};

export default function FaqHubPage() {
  const items = getAllFaqHubItems();
  const faqUrl = canonicalUrl(PATH);

  return (
    <main className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: PATH },
        ]}
      />
      <FAQPageSchema faqs={items} url={faqUrl} />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[min(28rem,70vh)] w-[min(100vw,75rem)] -translate-x-1/2 rounded-full bg-blue-light/40 blur-3xl" aria-hidden />
      <FaqHubClient />
    </main>
  );
}
