import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { normalizeCosApiBase, resolveCosApiBaseFromEnv } from "@/lib/cos-forward";

describe("cos-forward", () => {
  it("normalizeCosApiBase appends /api when missing", () => {
    assert.equal(normalizeCosApiBase("https://api.example.com"), "https://api.example.com/api");
  });

  it("normalizeCosApiBase preserves trailing /api", () => {
    assert.equal(normalizeCosApiBase("https://api.example.com/api"), "https://api.example.com/api");
    assert.equal(normalizeCosApiBase("https://api.example.com/api/"), "https://api.example.com/api");
  });

  it("resolveCosApiBaseFromEnv uses COS_API_BASE_URL when set on Vercel", () => {
    const base = resolveCosApiBaseFromEnv({
      VERCEL: "1",
      COS_API_BASE_URL: "https://cos.prod.example/api/",
      NEXT_PUBLIC_COS_API_URL: undefined,
    });
    assert.equal(base, "https://cos.prod.example/api");
  });

  it("resolveCosApiBaseFromEnv returns null on Vercel when COS URL unset", () => {
    assert.equal(
      resolveCosApiBaseFromEnv({
        VERCEL: "1",
        COS_API_BASE_URL: undefined,
        NEXT_PUBLIC_COS_API_URL: undefined,
      }),
      null,
    );
  });

  it("resolveCosApiBaseFromEnv defaults to localhost when not on Vercel", () => {
    const base = resolveCosApiBaseFromEnv({
      VERCEL: undefined,
      COS_API_BASE_URL: undefined,
      NEXT_PUBLIC_COS_API_URL: undefined,
    });
    assert.equal(base, "http://127.0.0.1:4000/api");
  });
});
