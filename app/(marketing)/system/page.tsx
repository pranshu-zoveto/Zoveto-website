import type { Metadata } from "next";
import { SystemScrollStory } from "@/components/system/SystemScrollStory";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "System Overview | Zoveto",
  description:
    "One stack for ERP, CRM, and AI automations. Run orders, stock, and cash with fewer tools and less rework.",
  alternates: { canonical: canonicalUrl("/system") },
  keywords: [
    "system overview",
    "what is zoveto",
    "ERP software India",
    "GST ERP",
    "CRM software India",
    "pipeline management",
    "AI business automation",
    "AI ERP",
    "AI CRM",
  ],
};

export default function SystemPage() {
  return <SystemScrollStory />;
}
