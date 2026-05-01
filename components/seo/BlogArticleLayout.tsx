import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BlogPostingSchema } from "@/components/seo/BlogPostingSchema";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import BackgroundComponents from "@/components/ui/background-components";
import type { BlogPost } from "@/lib/blog-posts";

type Props = {
  post: BlogPost;
};

export function BlogArticleLayout({ post }: Props) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.breadcrumbName, path: `/blog/${post.slug}` },
  ];

  return (
    <main className="relative overflow-hidden bg-background pb-16 pt-36 md:pb-24 md:pt-44">
      <BreadcrumbSchema items={crumbs} />
      <BlogPostingSchema post={post} />
      <BackgroundComponents variant="editorial" intensity="subtle" className="top-[50%]" />
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <article className="mx-auto max-w-3xl">
          <Text variant="label-uppercase" className="mb-4 text-muted-2">
            Blog · {post.publishedAt}
          </Text>
          <Text variant="display-2" as="h1" className="mb-6 text-balance text-foreground">
            {post.h1}
          </Text>
          <Text variant="body-lg" as="p" className="mb-12 text-pretty text-muted">
            {post.excerpt}
          </Text>

          {post.comparisonTable && post.comparisonTable.length > 0 ? (
            <section className="mb-10 overflow-hidden rounded-xl border border-border bg-card" aria-label="Comparison table">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-sm font-semibold text-foreground">Feature</th>
                    <th className="px-4 py-3 text-sm font-semibold text-blue">Zoveto</th>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-2">Typical alternative</th>
                  </tr>
                </thead>
                <tbody>
                  {post.comparisonTable.map((row) => (
                    <tr key={row.feature} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 text-sm text-foreground">{row.feature}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{row.zoveto}</td>
                      <td className="px-4 py-3 text-sm text-muted">{row.alternative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : null}

          {post.sections.map((s) => (
            <section key={s.h2} className="mb-10">
              <Text variant="heading-1" as="h2" className="mb-4 text-xl text-foreground md:text-2xl">
                {s.h2}
              </Text>
              {s.paragraphs.map((para, i) => (
                <Text key={`${s.h2}-${i}`} variant="body-base" as="p" className="mb-4 text-muted leading-relaxed">
                  {para}
                </Text>
              ))}
              {s.bullets && s.bullets.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted leading-relaxed">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className="mb-12 rounded-2xl border border-border bg-card p-6" aria-labelledby="related-heading">
            <h2 id="related-heading" className="mb-4 text-lg font-semibold text-foreground">
              Continue exploring
            </h2>
            <ul className="space-y-2 text-sm">
              {post.relatedLinks.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="font-medium text-blue underline-offset-2 hover:underline">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Book a demo
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View pricing
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
