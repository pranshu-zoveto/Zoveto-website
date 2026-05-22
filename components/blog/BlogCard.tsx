// /components/blog/BlogCard.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost, formatBlogDate, getBlogCoverAspectClass } from "@/lib/blog-posts";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean; // first/hero card gets a larger layout
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const coverAspect = featured
    ? getBlogCoverAspectClass(post.coverWidth, post.coverHeight)
    : "aspect-[16/9]";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-border bg-card transition-all duration-300 hover:border-blue/30 hover:shadow-[0_8px_24px_rgba(0,113,227,0.10)]",
        featured ? "md:flex-row" : "h-full",
      )}
    >
      {/* Optional cover image placeholder – renders a gradient swatch if no image */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-t-2xl bg-[#e8eef5]",
          coverAspect,
          featured
            ? "w-full md:aspect-auto md:w-[44%] md:max-w-[480px] md:self-stretch md:rounded-l-2xl md:rounded-tr-none"
            : "w-full",
        )}
        {...(!post.coverImage ? { "aria-hidden": true as const } : {})}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? `Cover image for ${post.title}`}
            fill
            sizes={
              featured
                ? "(max-width: 767px) 100vw, min(44vw, 480px)"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            }
            className="object-cover object-center"
            priority={featured}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" aria-hidden>
            <span className="text-4xl opacity-20">📘</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-blue-dim px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue">
            {post.category}
          </span>
          <span className="text-xs text-muted-2">{post.readingTime}</span>
        </div>

        <h2
          className={cn(
            "font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-blue",
            featured ? "mb-3 text-2xl md:text-3xl" : "mb-2 text-lg",
          )}
        >
          {post.title}
        </h2>

        {post.subtitle && <p className="mb-3 text-sm font-medium text-muted">{post.subtitle}</p>}

        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-2">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <time dateTime={post.date} className="text-xs text-muted-2">
            {formatBlogDate(post.date)}
          </time>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue transition-all group-hover:gap-2">
            Read article <ArrowRight size={14} className="shrink-0" />
          </span>
        </div>
      </div>
    </Link>
  );
}
