import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Text } from "@/components/ui/Text";
import BackgroundComponents from "@/components/ui/background-components";
import { getAllBlogPosts } from "@/lib/blog-posts";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog | Zoveto — ERP, inventory, and operations for scaling businesses",
  description:
    "Practical guides on ERP cost, software comparison, and inventory discipline for operations teams—plus links to pricing and demos.",
  alternates: { canonical: canonicalUrl("/blog") },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  return (
    <main className="relative overflow-hidden bg-background pb-16 pt-36 md:pb-24 md:pt-44">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <BackgroundComponents variant="editorial" intensity="subtle" className="top-[48%]" />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Text variant="label-uppercase" className="mb-4 text-muted-2">
            Resources
          </Text>
          <Text variant="display-2" as="h1" className="mb-6 text-foreground">
            Blog
          </Text>
          <Text variant="body-lg" className="mb-12 text-muted">
            Short reads for teams evaluating ERP, inventory, and warehouse software—written to support decisions, not fill keyword quotas.
          </Text>
          <ul className="space-y-10">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-border pb-10 last:border-0">
                <article>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    <Link href={`/blog/${p.slug}`} className="hover:text-blue">
                      {p.h1}
                    </Link>
                  </h2>
                  <p className="mb-2 mt-2 text-sm text-muted-2">{p.publishedAt}</p>
                  <p className="text-muted leading-relaxed">{p.excerpt}</p>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="mt-3 inline-block text-sm font-medium text-blue underline-offset-2 hover:underline"
                  >
                    Read article
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
