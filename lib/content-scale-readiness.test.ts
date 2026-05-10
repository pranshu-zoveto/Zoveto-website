import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BLOG_POSTS } from "@/lib/blog-posts";

describe("content scale readiness", () => {
  it("keeps at least one published blog post", () => {
    assert.ok(BLOG_POSTS.length >= 1, `Expected >=1 posts, got ${BLOG_POSTS.length}`);
  });
});
