# Answer library (editorial rules)

This repo ships FAQ copy from typed sources of truth:

- **Hub**: [`lib/faq-hub.ts`](../../lib/faq-hub.ts) — site-wide `/faq` questions (worded differently from page-specific FAQs).
- **SEO landings**: [`lib/seo-landings.ts`](../../lib/seo-landings.ts) — India intent pages.
- **Compare**: [`lib/compare-pages.ts`](../../lib/compare-pages.ts) + [`lib/phase1-compare-zoho-tally.ts`](../../lib/phase1-compare-zoho-tally.ts) — competitor comparisons.
- **Blog**: [`lib/blog-posts.ts`](../../lib/blog-posts.ts).
- **Industries**: [`lib/industries.ts`](../../lib/industries.ts) + spare parts phase-1 in [`lib/phase1-spare-parts-industry.ts`](../../lib/phase1-spare-parts-industry.ts).

## Dedupe (non-negotiable)

1. **Do not copy/paste the same question string** across two URLs. Similar intent is fine; identical wording is not.
2. **FAQPage JSON-LD must match visible `<dt>` / `<dd>` (or phase-1 equivalents)** on that URL—no hidden FAQs.
3. Prefer **one primary URL** for a tight cluster (hub vs child page)—child pages should ask narrower questions.

## When adding new FAQs

- Minimum **five** real Q&As per page type that carries FAQ schema.
- Answers: **2–4 short paragraphs max**; facts and fit, not fluff.
- After edits, run `npm test` (schema/body parity is enforced by tests on several routes).
