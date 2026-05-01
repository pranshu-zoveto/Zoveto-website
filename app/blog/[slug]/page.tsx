import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleLayout } from "@/components/seo/BlogArticleLayout";
import { BLOG_SLUGS, getBlogPostBySlug } from "@/lib/blog-posts";
import { canonicalUrl } from "@/lib/site";
import { resolveSlugParams } from "@/lib/resolve-slug-params";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await resolveSlugParams(params);
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Not found | Zoveto" };
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: canonicalUrl(`/blog/${post.slug}`) },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await resolveSlugParams(params);
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  return <BlogArticleLayout post={post} />;
}
