// /app/(marketing)/blog/[slug]/page.tsx

import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { FAQPageSchema, type FaqSchemaInput } from "@/components/seo/FAQPageSchema";
import {
  getBlogPost,
  getAllBlogSlugs,
  formatBlogDate,
  getBlogCoverAspectClass,
  BLOG_POSTS,
} from "@/lib/blog-posts";
import { canonicalUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BlogCard } from "@/components/blog/BlogCard";
import { resolveSlugParams } from "@/lib/resolve-slug-params";
import WhatIsCompanyOperatingSystem from "@/app/(marketing)/blog/_posts/what-is-company-operating-system";
import TallyVsZovetoCloudErpIndia from "@/app/(marketing)/blog/_posts/tally-vs-zoveto-cloud-erp-india";
import ZohoOneVsZovetoArchitecture from "@/app/(marketing)/blog/_posts/zoho-one-vs-zoveto-architecture";
import GstErpSoftwareIndia2026 from "@/app/(marketing)/blog/_posts/gst-erp-software-india-2026";
import CostOfDisconnectedSoftwareIndiaSmb from "@/app/(marketing)/blog/_posts/cost-of-disconnected-software-india-smb";
import prisma from "@/lib/db";
import { marked } from "marked";

/** Maps slug → the corresponding content component. Add every new post here. */
const POST_CONTENT_MAP: Record<string, ComponentType> = {
  "cost-of-disconnected-software-india-smb": CostOfDisconnectedSoftwareIndiaSmb,
  "gst-erp-software-india-2026": GstErpSoftwareIndia2026,
  "what-is-company-operating-system": WhatIsCompanyOperatingSystem,
  "tally-vs-zoveto-cloud-erp-india": TallyVsZovetoCloudErpIndia,
  "zoho-one-vs-zoveto-architecture": ZohoOneVsZovetoArchitecture,
};

const POST_FAQS: Record<string, readonly FaqSchemaInput[]> = {
  "cost-of-disconnected-software-india-smb": [
    {
      question: "How do I calculate the real cost of disconnected software for my business?",
      answer:
        "Start with two numbers: (1) how many person-hours per week does your team spend re-entering data between systems? Multiply by your loaded cost per hour. (2) How often do stockouts or credit violations result in lost sales or bad debt per year? The sum of these two numbers is typically your minimum annual cost of disconnected tools.",
    },
    {
      question: "Is it possible to connect Tally to a CRM without switching ERPs?",
      answer:
        "Yes. There are integration tools (Tally API connectors, middleware like Zapier or Make) that can sync Tally with a CRM or WMS. However, integration-based syncs have reliability issues, sync delays, and maintenance overhead. For a business processing 200+ transactions per month, native integration in one system is more reliable and cheaper to maintain.",
    },
    {
      question: "How long does it take to see ROI after implementing a unified ERP?",
      answer:
        "Most businesses see operational improvement within 60 to 90 days of go-live, primarily in reconciliation time reduction and credit control improvement. Stockout reduction and sales improvement typically take 3 to 6 months as demand patterns emerge from clean data.",
    },
    {
      question: "What if my team resists switching systems?",
      answer:
        "Resistance to change is the single biggest reason ERP implementations fail. The key is a phased approach: migrate one department at a time, keep the old system running in parallel for 4 to 6 weeks, and involve team leads in configuration decisions. This is not a software problem. It's a change management problem that needs a plan.",
    },
  ],
  "gst-erp-software-india-2026": [
    {
      question: "Is e-invoicing mandatory for businesses with turnover below ₹5 crore?",
      answer:
        "As of 2024, e-invoicing is mandatory for businesses with annual turnover above ₹5 crore. Businesses below this threshold are not required to generate IRNs, though they may opt in voluntarily.",
    },
    {
      question: "What happens if I issue an invoice without an IRN?",
      answer:
        "An invoice without an IRN is legally invalid for B2B supplies where e-invoicing is applicable. Your buyer cannot claim ITC on such invoices, which damages your relationship with customers and may expose you to penalties.",
    },
    {
      question: "Can I use Excel to file GSTR-1?",
      answer:
        "Yes, you can use GSTN's offline utility to prepare and file GSTR-1. However, businesses with more than 50 to 100 invoices per month will find this process extremely time-consuming and error-prone. An ERP that auto-populates GSTR-1 from live transaction data eliminates this manual step entirely.",
    },
    {
      question: "What is GSTR-2B and how is it different from GSTR-2A?",
      answer:
        "GSTR-2A is a dynamic statement that updates as vendors file their returns. GSTR-2B is a static auto-drafted credit statement generated on the 14th of each month based on filings up to the 13th. ITC eligibility is now determined primarily by GSTR-2B, not GSTR-2A.",
    },
    {
      question: "Does Zoveto support the QRMP scheme?",
      answer:
        "Yes. Zoveto supports the QRMP (Quarterly Return Monthly Payment) scheme for eligible taxpayers, with monthly PMT-06 challan generation and quarterly GSTR-1 filing.",
    },
  ],
  "zoho-one-vs-zoveto-architecture": [
    {
      question: "Can I migrate from Zoho One to Zoveto?",
      answer:
        "Yes. Zoveto supports migration from Zoho CRM, Zoho Books, and Zoho Inventory. Customer records, vendor records, inventory masters, and transaction history can be migrated with standard data export tools.",
    },
    {
      question: "Does Zoveto have a CRM as strong as Zoho CRM?",
      answer:
        "Zoveto's CRM is purpose-built for Indian B2B distribution and dealer networks, with native integration to inventory, finance, and dispatch. Zoho CRM is more feature-rich for sales automation in isolation, but requires integrations to connect to inventory and finance.",
    },
    {
      question: "Is Zoho better for GST compliance than Zoveto?",
      answer:
        "Both platforms fully support GST compliance (GSTR-1, GSTR-3B, e-invoicing, and e-way bills). The difference is that in Zoveto, GST calculations happen natively at the point of transaction rather than flowing through a sync from inventory to Books.",
    },
    {
      question: "What industries does Zoveto specifically support?",
      answer:
        "Zoveto is purpose-built for Indian distributors, manufacturers (discrete and process), spare parts dealers, and B2B wholesalers. It includes India-specific features like multi-warehouse GST tracking, dealer credit management, and machine-compatibility-based spare parts cataloguing.",
    },
  ],
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

export async function generateStaticParams() {
  const staticSlugs = getAllBlogSlugs();
  try {
    const dbPosts = await prisma.blogPost.findMany({ select: { slug: true } });
    const allSlugs = Array.from(new Set([...staticSlugs, ...dbPosts.map((p) => p.slug)]));
    return allSlugs.map((slug) => ({ slug }));
  } catch (e) {
    return staticSlugs.map((slug) => ({ slug }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await resolveSlugParams(params);
  
  const staticPost = getBlogPost(slug);
  const dbPost = await prisma.blogPost.findUnique({ where: { slug } });
  
  if (!staticPost && !dbPost) return {};
  
  const title = dbPost ? dbPost.title : staticPost!.title;
  const excerpt = dbPost ? dbPost.excerpt : staticPost!.excerpt;
  const coverImage = dbPost ? dbPost.coverImage : staticPost!.coverImage;
  const date = dbPost ? dbPost.createdAt.toISOString() : staticPost!.date;

  return {
    title: `${title} | Zoveto Blog`,
    description: excerpt || "",
    alternates: { canonical: canonicalUrl(`/blog/${slug}`) },
    openGraph: {
      type: "article",
      title: title,
      description: excerpt || "",
      url: canonicalUrl(`/blog/${slug}`),
      publishedTime: date,
      images: coverImage ? [coverImage] : ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: excerpt || "",
      images: coverImage ? [coverImage] : ["/og-image.png"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await resolveSlugParams(params);
  
  const staticPost = getBlogPost(slug);
  const dbPost = await prisma.blogPost.findUnique({ where: { slug } });

  if (!staticPost && !dbPost) notFound();

  const isStatic = !!staticPost && !dbPost;
  const PostContent = isStatic ? POST_CONTENT_MAP[slug] : null;

  let parsedContent = "";
  let extractedTags: string[] = [];

  if (dbPost) {
    // Extract Target Keywords to populate the "Topics" section
    const keywordsMatch = dbPost.content.match(/^\*\*Target Keywords:\*\*\s*(.*)$/m);
    if (keywordsMatch && keywordsMatch[1]) {
      extractedTags = keywordsMatch[1].split(",").map((k) => k.trim()).filter(Boolean);
    }

    let cleanContent = dbPost.content
      // Remove SEO metadata
      .replace(/^\*\*SEO Title:\*\*.*$/gm, "")
      .replace(/^\*\*Meta Description:\*\*.*$/gm, "")
      .replace(/^\*\*Target Keywords:\*\*.*$/gm, "")
      .replace(/^\*\*URL Slug:\*\*.*$/gm, "")
      // Remove H1 title (since it's already rendered in the page header)
      .replace(/^# .*$/gm, "");

    // Convert markdown to HTML
    let html = await marked.parse(cleanContent);

    // Inject Zoveto's premium blog typography classes into the raw HTML
    
    // 1. Convert the first paragraph into the highlighted "lead" callout box
    html = html.replace(/<p>/, '<p class="blog-lead">');
    
    // 2. Convert standard markdown horizontal rules (<hr>) into the styled dividers
    html = html.replace(/<hr>/g, '<hr class="blog-rule" />');
    
    // 3. Convert markdown tables into styled Zoveto tables
    html = html.replace(/<table>/g, '<div class="blog-table-wrapper"><table class="blog-table">');
    html = html.replace(/<\/table>/g, '</table></div>');

    parsedContent = html;
  }

  const post = dbPost ? {
    title: dbPost.title,
    excerpt: dbPost.excerpt,
    coverImage: dbPost.coverImage,
    content: parsedContent,
    date: dbPost.createdAt.toISOString(),
    author: dbPost.author,
    tags: extractedTags,
    category: "News",
    readingTime: "5 min read",
    subtitle: null,
    coverWidth: 1200,
    coverHeight: 630,
    coverImageAlt: dbPost.title,
  } : staticPost!;

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="relative bg-background pb-24 pt-28 md:pt-36">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />
      <ArticleSchema
        title={post.title}
        description={post.excerpt || ""}
        url={canonicalUrl(`/blog/${slug}`)}
        datePublished={post.date}
        image={post.coverImage || undefined}
      />
      {POST_FAQS[slug] && (
        <FAQPageSchema url={canonicalUrl(`/blog/${slug}`)} faqs={POST_FAQS[slug]} />
      )}

      <div className="container mx-auto max-w-[min(100%,72rem)] px-4 sm:px-6">
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
          <div className="min-w-0">
            {post.coverImage && (
              <figure
                className={cn(
                  "relative mb-10 w-full overflow-hidden rounded-2xl border border-border bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)]",
                  getBlogCoverAspectClass(post.coverWidth, post.coverHeight),
                )}
              >
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt ?? `Cover image for ${post.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 820px"
                  priority
                  className="object-cover object-center"
                />
              </figure>
            )}

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

            <div className="mb-10 h-px bg-border" />

            {/* Dynamic Rendering Block */}
            {isStatic && PostContent ? (
              <PostContent />
            ) : (
              <article 
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: (post as any).content }} 
              />
            )}

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

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-2">Published by</p>
                <p className="font-semibold text-foreground">{post.author || "Zoveto"}</p>
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
