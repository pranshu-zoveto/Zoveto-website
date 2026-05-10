// /components/seo/ArticleSchema.tsx

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string; // ISO 8601
  dateModified?: string; // ISO 8601
  authorName?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName = "Zoveto",
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://zoveto.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Zoveto",
      url: "https://zoveto.com",
      logo: {
        "@type": "ImageObject",
        url: "https://zoveto.com/brand/logo-icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
