import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAllSeoLandings, SEO_LANDING_PATHS } from "./seo-landings";

const MAX_META_TITLE = 62;
const MIN_DESC = 130;
const MAX_DESC = 165;

describe("seo-landings", () => {
  it("has unique paths and slugs", () => {
    const paths = getAllSeoLandings().map((l) => l.path);
    assert.equal(new Set(paths).size, paths.length);
    assert.deepEqual(paths, [...SEO_LANDING_PATHS]);
  });

  it("each landing has optimized meta and readable H1", () => {
    for (const l of getAllSeoLandings()) {
      assert.ok(l.h1.length >= 24 && l.h1.length <= 120, `h1 length for ${l.path}`);
      assert.ok(l.metaTitle.length > 0 && l.metaTitle.length <= MAX_META_TITLE, `title length for ${l.path}`);
      assert.ok(
        l.metaDescription.length >= MIN_DESC && l.metaDescription.length <= MAX_DESC,
        `description length for ${l.path}`,
      );
      assert.ok(l.intro.includes("India") || l.h1.includes("India"), `India intent for ${l.path}`);
      assert.ok(l.sections.length >= 2, `sections for ${l.path}`);
      assert.ok(l.directAnswer.length >= 40, `directAnswer for ${l.path}`);
      assert.ok(l.faqs.length >= 5, `faqs for ${l.path}`);
      const faqQs = l.faqs.map((f) => f.q);
      assert.equal(new Set(faqQs).size, faqQs.length, `unique FAQ questions for ${l.path}`);
      assert.ok(l.deepLink.href.startsWith("/"), `deep link for ${l.path}`);
      assert.ok(l.breadcrumbName.length >= 8, `breadcrumb for ${l.path}`);
    }
  });
});
