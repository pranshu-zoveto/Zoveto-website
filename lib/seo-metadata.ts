import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";
import { isNoindexPath } from "@/lib/seo-crawl-policy";

type PageMetadataInput = {
  pathname: string;
  title: string;
  description: string;
  /** Override crawl policy; defaults from NOINDEX_PATHS when omitted. */
  index?: boolean;
  follow?: boolean;
  ogImage?: string;
};

/** Consistent absolute canonical + robots for marketing pages. */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const { pathname, title, description } = input;
  const noindex = input.index === undefined ? isNoindexPath(pathname) : !input.index;
  const index = !noindex;
  const follow = input.follow ?? (noindex ? false : true);
  const url = canonicalUrl(pathname);
  const ogImage = input.ogImage ?? "/og-image.png";

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index, follow },
    openGraph: {
      title,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
