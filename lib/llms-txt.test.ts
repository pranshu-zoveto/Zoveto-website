import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { buildLlmsTxt } from "./llms-txt";

describe("llms.txt", () => {
  it("builds plain-text with brand, contact, and canonical pages", () => {
    const txt = buildLlmsTxt();
    assert.match(txt, /Zoveto Technologies/);
    assert.match(txt, /https:\/\/zoveto\.com/);
    assert.match(txt, /info@zoveto\.com/);
    assert.match(txt, /security@zoveto\.com/);
    assert.match(txt, /warehouse-management-system-india/);
    assert.doesNotMatch(txt, /SOC 2 certified/i);
  });

  it("exposes an App Router route handler", () => {
    assert.ok(fs.existsSync(path.join(process.cwd(), "app/llms.txt/route.ts")));
  });
});
