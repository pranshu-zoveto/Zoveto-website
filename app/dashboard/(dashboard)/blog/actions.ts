"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function extractTitle(content: string): string {
  // Match <h1>...</h1>
  const h1Match = content.match(/<h1>(.*?)<\/h1>/i);
  if (h1Match && h1Match[1]) return h1Match[1].trim();
  
  // Match # Heading
  const mdMatch = content.match(/^#\s+(.+)$/m);
  if (mdMatch && mdMatch[1]) return mdMatch[1].trim();

  // Fallback: first non-empty line
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  return lines.length > 0 ? lines[0] : "Untitled Post";
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateExcerpt(content: string): string {
  // Strip HTML tags and normalize spaces
  let text = content.replace(/<[^>]+>/g, " ");
  // Strip common Markdown characters but keep alphanumeric text
  text = text.replace(/[#*_[\]>|~`]/g, "");
  text = text.replace(/\s+/g, " ").trim();
  
  if (text.length <= 160) return text;
  
  // Cut cleanly around 155 chars at the last space
  const trimmed = text.substring(0, 155);
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace > 0) {
    return trimmed.substring(0, lastSpace) + "...";
  }
  return trimmed + "...";
}

export async function createBlogPost(formData: FormData) {
  const content = formData.get("content") as string;
  const coverImage = formData.get("coverImage") as string;
  const author = formData.get("author") as string;
  const published = formData.get("published") === "true";

  const title = extractTitle(content);
  // Generate a robust slug based on the title
  let slug = generateSlug(title);
  const excerpt = generateExcerpt(content);

  // Fallback if slugify results in an empty string
  if (!slug) slug = `post-${Date.now()}`;

  // Basic collision prevention
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now().toString().slice(-4)}`;

  await prisma.blogPost.create({
    data: {
      title,
      slug,
      excerpt,
      coverImage,
      content,
      author,
      published,
    },
  });

  revalidatePath("/blog");
  redirect("/dashboard/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const content = formData.get("content") as string;
  const coverImage = formData.get("coverImage") as string;
  const author = formData.get("author") as string;
  const published = formData.get("published") === "true";

  const title = extractTitle(content);
  const excerpt = generateExcerpt(content);

  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      excerpt,
      coverImage,
      content,
      author,
      published,
    },
  });

  revalidatePath("/blog");
  redirect("/dashboard/blog");
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/dashboard/blog");
}
