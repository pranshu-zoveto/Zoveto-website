import type { BlogPost } from "@/lib/blog-posts";
import { siteUrl } from "@/lib/site";

type Props = {
  post: BlogPost;
};

/** BlogPosting JSON-LD for article pages. */
export function BlogPostingSchema({ post }: Props) {
  const base = siteUrl();
  const url = `${base}/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.h1,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isPartOf: { "@type": "Blog", name: "Zoveto", url: `${base}/blog` },
    publisher: {
      "@type": "Organization",
      name: "Zoveto",
      url: base,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
