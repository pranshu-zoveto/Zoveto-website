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
  coverImage?: string; // optional: path under /public or full https URL (e.g. Cloudinary)
  /** Intrinsic pixel size of coverImage (for next/image layout / LCP). */
  coverWidth?: number;
  coverHeight?: number;
  coverImageAlt?: string;
}

/** All published blog posts. Add new entries at the TOP of this array (newest first). */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "cost-of-disconnected-software-india-smb",
    title: "Why Indian SMBs Lose ₹6.5 Lakh Every Year to Disconnected Software",
    subtitle: "Stockouts, missed leads, reconciliation, and GST errors add up fast.",
    excerpt:
      "Stockouts, missed leads, manual reconciliation, and GST errors silently drain Indian SMBs. Here's where the money goes, and how to stop the leak.",
    date: "2026-05-20",
    readingTime: "11 min read",
    category: "ERP Guide",
    tags: [
      "ERP software for distributors India",
      "company operating system software",
      "best ERP small business India",
      "disconnected software",
      "Indian SMB",
    ],
    coverImage:
      "https://res.cloudinary.com/dnldtmbg5/image/upload/f_auto,q_auto,w_1920,c_limit/v1779474124/ChatGPT_Image_May_22_2026_11_48_03_PM_rit5ui.png",
    coverWidth: 1536,
    coverHeight: 1024,
    coverImageAlt:
      "Infographic: Indian SMBs lose ₹6.5 lakh per year to disconnected tools including Tally, Excel, WhatsApp, and Zoho",
  },
  {
    slug: "gst-erp-software-india-2026",
    title: "GST ERP Software in India 2026: The Complete Compliance Guide",
    subtitle: "e-Invoicing, GSTR filing, HSN, and what to look for before you buy.",
    excerpt:
      "Everything Indian businesses need to know about GST-compliant ERP software in 2026: e-invoicing, IRN, GSTR filing, HSN codes, and what to look for before buying.",
    date: "2026-05-19",
    readingTime: "12 min read",
    category: "ERP Guide",
    tags: [
      "GST ERP software India 2026",
      "GST invoice software India",
      "GST filing software India",
      "e-invoicing",
      "GSTR-1",
    ],
    coverImage:
      "https://res.cloudinary.com/dnldtmbg5/image/upload/f_auto,q_auto,w_1920,c_limit/v1779171699/in_the_photo_the_logo_202605191149_sk8ytc.jpg",
    coverWidth: 2752,
    coverHeight: 1536,
    coverImageAlt:
      "GST ERP Software India 2026 guide on a laptop screen with Zoveto branding, e-invoicing, GSTR, and compliance icons",
  },
  {
    slug: "zoho-one-vs-zoveto-architecture",
    title: "Zoho One vs Zoveto: The Architectural Difference That Actually Matters",
    subtitle: "45 apps vs one unified platform: what Indian SMBs should know.",
    excerpt:
      "Zoho One bundles 45+ apps on one subscription. Zoveto is one unified platform. This comparison explains the architectural difference and why it matters for Indian distributors and manufacturers.",
    date: "2026-05-15",
    readingTime: "10 min read",
    category: "Comparisons",
    tags: [
      "Zoho One alternative",
      "Zoho vs Zoveto",
      "Zoho One India",
      "ERP comparison",
      "Company Operating System",
    ],
    coverImage:
      "https://res.cloudinary.com/dnldtmbg5/image/upload/f_auto,q_auto,w_1920,c_limit/v1778847699/blog-03_gfonvs.png",
    coverWidth: 1536,
    coverHeight: 1024,
    coverImageAlt:
      "Team reviewing Zoveto dashboard in a warehouse: sales, inventory, and warehouse status on one unified screen",
  },
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
    coverImage:
      "https://res.cloudinary.com/dnldtmbg5/image/upload/f_auto,q_auto,w_1920,c_limit/v1778595674/1304efdd-9fa4-4a8c-96f1-45cfc2383e7f_rol6qp.jpg",
    coverWidth: 1279,
    coverHeight: 739,
    coverImageAlt:
      "Business team reviewing Zoveto Cloud ERP on an interactive table: Sales, Finance, Inventory, Logistics, and Payroll modules with India operations map in the background",
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
    coverWidth: 1220,
    coverHeight: 861,
    coverImageAlt:
      "Zoveto dashboard and warehouse operations: inventory, CRM pipeline, and analytics",
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

/** Tailwind aspect class from cover intrinsic size (avoids letterboxing or heavy crop). */
export function getBlogCoverAspectClass(width?: number, height?: number): string {
  if (!width || !height) return "aspect-[16/9]";
  const ratio = width / height;
  if (ratio >= 1.7) return "aspect-[16/9]";
  if (ratio >= 1.4) return "aspect-[3/2]";
  return "aspect-[4/3]";
}

/** Format date for display: "10 May 2026" */
export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
