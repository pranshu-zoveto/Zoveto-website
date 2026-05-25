import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllUnifiedBlogPosts } from "@/lib/blog-data";
import { canonicalUrl } from "@/lib/site";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Zoveto Blog: ERP, CRM & Ops Insights for Indian SMBs",
  description:
    "Practical guides on ERP software, GST compliance, warehouse management, and AI operations for Indian distributors and manufacturers.",
  alternates: { canonical: canonicalUrl("/blog") },
  openGraph: {
    title: "Zoveto Blog: ERP & Ops Insights for Indian SMBs",
    description:
      "Practical, authoritative guides on ERP, GST compliance, WMS, and AI for Indian SMBs. No filler, no fluff.",
    url: canonicalUrl("/blog"),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoveto Blog: ERP & Ops Insights for Indian SMBs",
    description:
      "Practical, authoritative guides on ERP, GST compliance, WMS, and AI for Indian SMBs.",
    images: ["/og-image.png"],
  },
};

export default async function BlogIndexPage({ searchParams }: { searchParams: { category?: string; source?: string } }) {
  const allPosts = await getAllUnifiedBlogPosts({
    category: searchParams.category,
    source: searchParams.source,
  });

  const [featured, ...rest] = allPosts;
  return (
    <main className="relative bg-background pb-24 pt-28 md:pt-36">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <div className="container mx-auto max-w-[min(100%,72rem)] px-4 sm:px-6">
        {/* ── Page header ── */}
        <div className="mb-14 max-w-2xl md:mb-12">
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
            Zoveto Blog
          </p>
          <Text variant="display-1" as="h1" className="mb-5 text-balance">
            Ops insights for <span className="text-blue">Indian SMBs.</span>
          </Text>
          <Text variant="body-lg" className="text-pretty text-muted">
            Practical, authoritative guides on ERP, GST compliance, warehouse management, and AI operations. No filler.
            No testimonials. Just technical depth.
          </Text>
        </div>

        {/* ── Featured post ── */}
        {featured && !searchParams.category && (
          <section className="mb-10">
            <BlogCard post={featured} featured />
          </section>
        )}

        {/* ── Grid of remaining posts ── */}
        {rest.length > 0 ? (
          <section>
            <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(searchParams.category ? allPosts : rest).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ) : !featured && (
           <div className="py-20 text-center text-zinc-500">No posts found for this category.</div>
        )}

        {/* ── CTA strip ── */}
        <div className="mt-20 rounded-2xl border border-border bg-card px-8 py-10 text-center md:mt-28">
          <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
            Ready to go further?
          </p>
          <Text variant="headline-md" as="h2" className="mb-4 text-balance">
            See Zoveto in action for your business.
          </Text>
          <Text variant="body-lg" className="mb-8 text-muted">
            Book a 30-minute demo tailored to your industry: distributor, manufacturer, or spare parts dealer.
          </Text>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup">
              <Button
                variant="primary"
                size="lg"
                className="gap-2 rounded-xl border border-blue/80 px-6 shadow-[0_8px_24px_rgba(0,113,227,0.26)] transition-shadow hover:shadow-[0_10px_30px_rgba(0,113,227,0.32)]"
              >
                Request early access <ArrowRight size={15} className="shrink-0" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-xl px-6">
                Book a demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
