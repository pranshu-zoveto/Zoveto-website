import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { PRICING_PAGE_FAQ } from "@/lib/pricing-page-faq";

describe("PRICING_PAGE_FAQ", () => {
  it("has unique questions and non-empty answers", () => {
    const questions = PRICING_PAGE_FAQ.map((i) => i.question);
    assert.equal(new Set(questions).size, questions.length);
    for (const item of PRICING_PAGE_FAQ) {
      assert.ok(item.question.trim().length > 8);
      assert.ok(item.answer.trim().length > 40);
    }
  });

  it("FAQPage JSON-LD built from PRICING_PAGE_FAQ matches visible FAQ copy", () => {
    const html = renderToStaticMarkup(createElement(FAQPageSchema, { faqs: PRICING_PAGE_FAQ }));
    const match = html.match(/<script[^>]*>([\s\S]*)<\/script>/);
    assert.ok(match, "expected FAQPageSchema to render a script with JSON-LD");
    const schema = JSON.parse(match![1]);
    assert.equal(schema["@type"], "FAQPage");
    assert.equal(schema.mainEntity.length, PRICING_PAGE_FAQ.length);
    for (let i = 0; i < PRICING_PAGE_FAQ.length; i++) {
      assert.equal(schema.mainEntity[i].name, PRICING_PAGE_FAQ[i].question);
      assert.equal(schema.mainEntity[i].acceptedAnswer.text, PRICING_PAGE_FAQ[i].answer);
    }
  });

  it("FAQPage JSON-LD includes canonical url when passed (pricing page)", () => {
    const pageUrl = "https://zoveto.com/pricing";
    const html = renderToStaticMarkup(
      createElement(FAQPageSchema, { faqs: PRICING_PAGE_FAQ, url: pageUrl }),
    );
    const match = html.match(/<script[^>]*>([\s\S]*)<\/script>/);
    assert.ok(match);
    const schema = JSON.parse(match![1]);
    assert.equal(schema.url, pageUrl);
  });
});
