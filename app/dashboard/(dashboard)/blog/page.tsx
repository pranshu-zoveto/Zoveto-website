import prisma from "@/lib/db";
import Link from "next/link";
import { Plus } from "lucide-react";
import { deleteBlogPost } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Blog Engine</h1>
          <p className="mt-2 text-zinc-400">Manage your public CMS content.</p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white"
        >
          <Plus size={16} />
          Create New Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="border-b border-zinc-800 bg-zinc-950/50 text-xs uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Slug</th>
              <th className="px-6 py-4 font-medium">Author</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {posts.map((post) => (
              <tr key={post.id} className="transition-colors hover:bg-zinc-800/50">
                <td className="px-6 py-4 font-medium text-zinc-200">{post.title}</td>
                <td className="px-6 py-4">{post.slug}</td>
                <td className="px-6 py-4">{post.author}</td>
                <td className="px-6 py-4">
                  {post.published ? (
                    <span className="inline-flex items-center rounded-full border border-green-900 bg-green-950/30 px-2.5 py-0.5 text-xs font-medium text-green-400">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                      Draft
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/dashboard/blog/${post.id}/edit`} className="text-blue-400 hover:text-blue-300 transition-colors">
                      Edit
                    </Link>
                    <form action={deleteBlogPost.bind(null, post.id)}>
                      <button type="submit" className="text-red-400 hover:text-red-300 transition-colors">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                  No blog posts found. Click "Create New Post" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
