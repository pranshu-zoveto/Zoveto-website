import prisma from "@/lib/db";
import { BlogPost, BLOG_POSTS } from "./blog-posts";

export type UnifiedBlogPost = BlogPost & {
  source: "static" | "cms";
};

export async function getAllUnifiedBlogPosts(filters?: { category?: string; source?: string; topic?: string }): Promise<UnifiedBlogPost[]> {
  const allStatic: UnifiedBlogPost[] = BLOG_POSTS.map(p => ({ ...p, source: "static" as const }));
  let dbPostsRaw: any[] = [];
  
  try {
     dbPostsRaw = await prisma.blogPost.findMany({
       where: { published: true },
       orderBy: { createdAt: "desc" },
     });
  } catch (e) {
     console.error("Failed to fetch CMS posts, falling back to static", e);
  }

  const allDb: UnifiedBlogPost[] = dbPostsRaw.map((post: any) => ({
    title: post.title,
    subtitle: post.title, // fallback since BlogPost model might not have subtitle
    slug: post.slug,
    date: post.createdAt.toISOString(),
    excerpt: post.excerpt || "",
    readingTime: "5 min read",
    category: "News",
    coverImage: post.coverImage || undefined,
    coverImageAlt: post.title,
    coverWidth: 1200,
    coverHeight: 630,
    tags: [],
    source: "cms" as const,
  }));

  // Deduplicate by slug. CMS overrides static.
  const map = new Map<string, UnifiedBlogPost>();
  for (const post of allStatic) {
    map.set(post.slug, post);
  }
  for (const post of allDb) {
    map.set(post.slug, post); 
  }

  let unified = Array.from(map.values());

  // Apply filters
  if (filters?.category) {
    unified = unified.filter(p => p.category.toLowerCase() === filters.category!.toLowerCase());
  }
  if (filters?.source) {
    unified = unified.filter(p => p.source === filters.source);
  }
  if (filters?.topic) {
    unified = unified.filter(p => p.tags.some(t => t.toLowerCase().includes(filters.topic!.toLowerCase())));
  }

  // Sort by date (newest first)
  unified.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return unified;
}
