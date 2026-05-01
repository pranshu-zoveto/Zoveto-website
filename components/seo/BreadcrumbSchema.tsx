import { siteUrl } from "@/lib/site";

type Crumb = {
  name: string;
  path: string;
};

export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const base = siteUrl();
  const payload = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${base}${item.path}`,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }} />;
}
