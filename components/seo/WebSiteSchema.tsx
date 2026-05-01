import { siteUrl } from "@/lib/site";

export function WebSiteSchema() {
  const base = siteUrl();
  const payload = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Zoveto",
    url: base,
    inLanguage: "en-IN",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }} />;
}
