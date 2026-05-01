import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAllBlogPosts } from "@/lib/blog-posts";

describe("content scale readiness", () => {
  it("keeps at least 10 blog posts for GEO velocity", () => {
    const posts = getAllBlogPosts();
    assert.ok(posts.length >= 10, `Expected >=10 posts, got ${posts.length}`);
  });
});
