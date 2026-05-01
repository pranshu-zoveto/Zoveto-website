import React from "react";
import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { canonicalUrl } from "@/lib/site";
import AboutNarrativeClient from "@/app/about/AboutNarrativeClient";

export const metadata: Metadata = {
  title: "About Zoveto | Company OS built from shop-floor operating pain",
  description:
    "Zoveto was shaped by the mess operators know: stock in sheets, orders in chats, finance in another tool, and leaders waiting for the truth.",
  alternates: { canonical: canonicalUrl("/about") },
  openGraph: {
    title: "About Zoveto | Company OS built from shop-floor operating pain",
    description:
      "Why Zoveto exists: fewer blind spots, cleaner records, and operating control for teams that run real inventory, sales, finance, and people workflows.",
    url: canonicalUrl("/about"),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Zoveto | Company OS built from shop-floor operating pain",
    description: "The story behind Zoveto: replacing chat-and-sheet operations with one accountable company OS.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutNarrativeClient />
    </>
  );
}
