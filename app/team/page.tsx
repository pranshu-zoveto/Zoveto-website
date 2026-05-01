import React from "react";
import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { canonicalUrl } from "@/lib/site";
import TeamPageClient from "@/app/team/TeamPageClient";

export const metadata: Metadata = {
  title: "Leadership team | Zoveto",
  description:
    "Meet the operators building Zoveto: a company OS for inventory, sales, finance, and people workflows—shipped close to the floor.",
  alternates: { canonical: canonicalUrl("/team") },
  openGraph: {
    title: "Leadership team | Zoveto",
    description:
      "Founders and product leadership behind Zoveto—the operating system for businesses that have outgrown spreadsheets and chat.",
    url: canonicalUrl("/team"),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadership team | Zoveto",
    description: "Who is building Zoveto and why the product stays close to real operations.",
    images: ["/og-image.png"],
  },
};

export default function TeamPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Team", path: "/team" },
        ]}
      />
      <TeamPageClient />
    </>
  );
}
