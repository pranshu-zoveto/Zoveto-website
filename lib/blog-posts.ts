// /lib/blog-posts.ts

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string; // 1–2 sentence summary shown on the index card
  date: string; // ISO 8601 format: "2026-05-10"
  readingTime: string; // e.g. "8 min read"
  category: string; // e.g. "ERP Guide", "Industry", "Comparison"
  tags: string[]; // for future filtering
  coverImage?: string; // optional: path under /public, e.g. "/blog/cos-guide.png"
}

/** All published blog posts. Add new entries at the TOP of this array (newest first). */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "tally-vs-zoveto-cloud-erp-india",
    title: "Tally vs Zoveto: Why Indian Businesses Are Moving to Cloud ERP in 2026",
    subtitle: "An honest comparison for Indian SMBs.",
    excerpt:
      "Tally is India's most trusted accounting software. Zoveto is a cloud ERP with CRM, WMS, and AI built in. Here is an honest comparison to help you decide which one your business actually needs.",
    date: "2026-05-12",
    readingTime: "7 min read",
    category: "Comparisons",
    tags: ["Tally alternative", "Cloud ERP India", "Tally vs Zoveto", "ERP comparison"],
    // coverImage: add a Cloudinary URL once the asset is uploaded, e.g.
    // "https://res.cloudinary.com/dnldtmbg5/image/upload/blog002_xxxxxx.jpg"
  },
  {
    slug: "what-is-company-operating-system",
    title: "What Is a Company Operating System?",
    subtitle: "The Next Evolution Beyond ERP. A Guide for Indian SMBs.",
    excerpt:
      "A Company Operating System unifies ERP, CRM, WMS, Finance, and HR into one data model. Here is why Indian SMBs are switching, and what it actually means in practice.",
    date: "2026-05-10",
    readingTime: "9 min read",
    category: "ERP Guide",
    tags: ["company operating system", "ERP", "India", "SMB"],
    coverImage:
      "https://res.cloudinary.com/dnldtmbg5/image/upload/blog001_b4sbzu.jpg",
  },
];

/** Returns a single post by slug, or undefined if not found. */
export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Returns all slugs, used by generateStaticParams. */
export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

/** Format date for display: "10 May 2026" */
export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
