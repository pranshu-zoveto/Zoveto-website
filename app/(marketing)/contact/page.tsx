import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { canonicalUrl } from "@/lib/site";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Book a Demo",
  description:
    "Book a free 30-minute demo. See the product with your industry context. Talk to the founders. No pitch deck. Just the system.",
  alternates: { canonical: canonicalUrl("/contact") },
  openGraph: {
    title: "Contact Zoveto | Book a demo",
    description: "Book a free live walkthrough of Zoveto for your business.",
    url: canonicalUrl("/contact"),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Zoveto | Book a demo",
    description: "Book a free live walkthrough of Zoveto for your business.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <ContactClient />
    </>
  );
}
