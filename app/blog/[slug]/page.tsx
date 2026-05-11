// /app/blog/[slug]/page.tsx

import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { FAQPageSchema, type FaqSchemaInput } from "@/components/seo/FAQPageSchema";
import { getBlogPost, getAllBlogSlugs, formatBlogDate, BLOG_POSTS } from "@/lib/blog-posts";
import { canonicalUrl } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { BlogCard } from "@/components/blog/BlogCard";
import { resolveSlugParams } from "@/lib/resolve-slug-params";
import WhatIsCompanyOperatingSystem from "@/app/blog/_posts/what-is-company-operating-system";
import TallyVsZovetoCloudErpIndia from "@/app/blog/_posts/tally-vs-zoveto-cloud-erp-india";

/** Maps slug → the corresponding content component. Add every new post here. */
const POST_CONTENT_MAP: Record<string, ComponentType> = {
  "what-is-company-operating-system": WhatIsCompanyOperatingSystem,
  "tally-vs-zoveto-cloud-erp-india": TallyVsZovetoCloudErpIndia,
  // ↑ When adding new posts: duplicate this line, change both the slug key and the import path.
};

/**
 * Per-slug FAQ data, mirrored from the visible FAQ in the post component.
 * Used to emit FAQPage JSON-LD only on posts that have a visible FAQ block.
 * Google requires the schema answers to match the on-page copy.
 */
const POST_FAQS: Record<string, readonly FaqSchemaInput[]> = {
  "tally-vs-zoveto-cloud-erp-india": [
    {
      question: "Can I migrate my Tally data to Zoveto?",
      answer:
        "Yes. Zoveto supports data migration from Tally, including customer ledgers, vendor ledgers, stock masters, and opening balances. The migration process typically takes 2 to 5 business days depending on data volume.",
    },
    {
      question: "Will my CA be able to use Zoveto for GST filing?",
      answer:
        "Zoveto generates all GST reports in standard formats (GSTR-1, GSTR-3B, GSTR-9, e-invoice, e-way bill). Your CA can file using these exports without needing to learn new software.",
    },
    {
      question: "Is Zoveto more expensive than Tally?",
      answer:
        "For single-user accounting, Tally is cheaper. For businesses with 10+ users needing CRM, WMS, purchase workflow, and HR, Zoveto's all-in-one pricing is typically more cost-effective than assembling a comparable stack.",
    },
    {
      question: "Does Zoveto work offline?",
      answer:
        "Zoveto is cloud-based and requires internet access. For businesses in areas with unreliable connectivity, we recommend Tally or a hybrid approach where Zoveto is used at head office and Tally at remote locations.",
    },
    {
      question: "How long does it take to switch from Tally to Zoveto?",
      answer:
        "Most SMBs complete the transition in 4 to 8 weeks, including data migration, user training, and parallel-run validation.",
    },
  ],
};

/** Tell Next.js which slugs to pre-render at build time. */
export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

/** Per-post <head> metadata. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await resolveSlugParams(params);
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Zoveto Blog`,
    description: post.excerpt,
    alternates: { canonical: canonicalUrl(`/blog/${slug}`) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl(`/blog/${slug}`),
      publishedTime: post.date,
      images: post.coverImage ? [post.coverImage] : ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : ["/og-image.png"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await resolveSlugParams(params);
  const post = getBlogPost(slug);
  if (!post) notFound();

  const PostContent = POST_CONTENT_MAP[slug];
  if (!PostContent) notFound();

  // Related posts: other articles (max 3, excluding current)
  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="relative bg-background pb-24 pt-28 md:pt-36">
      {/* ── SEO schemas ── */}
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        url={canonicalUrl(`/blog/${slug}`)}
        datePublished={post.date}
        image={post.coverImage}
      />
      {POST_FAQS[slug] && (
        <FAQPageSchema url={canonicalUrl(`/blog/${slug}`)} faqs={POST_FAQS[slug]} />
      )}

      <div className="container mx-auto max-w-[min(100%,72rem)] px-4 sm:px-6">
        {/* ── Back link ── */}
        <div className="mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            All articles
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
          {/* ── Main column ── */}
          <div className="min-w-0">
            {/* Cover image (full bleed of the article column, full image visible, no crop) */}
            {post.coverImage && (
              <figure className="mb-10 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
                <Image
                  src={post.coverImage}
                  alt={`Cover image for ${post.title}`}
                  width={1220}
                  height={861}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 820px"
                  priority
                  className="block h-auto w-full"
                />
              </figure>
            )}

            {/* Post header */}
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-blue-dim px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-2">
                  <Clock size={12} />
                  {post.readingTime}
                </span>
                <time dateTime={post.date} className="flex items-center gap-1.5 text-xs text-muted-2">
                  <Calendar size={12} />
                  {formatBlogDate(post.date)}
                </time>
              </div>
              <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                {post.title}
              </h1>
              {post.subtitle && <p className="text-lg font-medium text-muted">{post.subtitle}</p>}
            </header>

            {/* Divider */}
            <div className="mb-10 h-px bg-border" />

            {/* Blog content component */}
            <PostContent />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2">
                <Tag size={14} className="text-muted-2" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-14 rounded-2xl border border-border bg-card px-7 py-8 text-center">
              <p className="mb-1 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
                Ready to see it live?
              </p>
              <h2 className="mb-3 text-xl font-bold tracking-tight text-foreground">Book a demo tailored to your business.</h2>
              <p className="mb-6 text-sm text-muted">30 minutes. Your industry. No generic slides.</p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link href="/signup">
                  <Button
                    variant="primary"
                    size="sm"
                    className="gap-2 rounded-xl border border-blue/80 px-5 shadow-[0_8px_24px_rgba(0,113,227,0.26)]"
                  >
                    Request early access <ArrowRight size={14} className="shrink-0" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="sm" className="rounded-xl px-5">
                    Book a demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              {/* Author / publisher card */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-2">Published by</p>
                <p className="font-semibold text-foreground">Zoveto</p>
                <p className="mt-0.5 text-sm text-muted">Company Operating System for Indian SMBs</p>
                <div className="mt-4 h-px bg-border" />
                <div className="mt-4 space-y-2 text-sm text-muted">
                  <p className="flex items-center gap-2">
                    <Calendar size={13} className="shrink-0 text-muted-2" />
                    {formatBlogDate(post.date)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={13} className="shrink-0 text-muted-2" />
                    {post.readingTime}
                  </p>
                </div>
              </div>

              {/* Tags sidebar */}
              {post.tags.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-2">Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>
        </div>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <section className="mt-20 md:mt-28">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-foreground">More articles</h2>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:underline">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
