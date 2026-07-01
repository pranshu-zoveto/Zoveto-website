# Google Search Console cleanup

Use this runbook after deploy to resolve **Not found (404)**, **Page with redirect**, and **Alternative page with proper canonical** issues reported in Search Console.

## 1. Export exact URLs from GSC

1. Open [Google Search Console](https://search.google.com/search-console) for `zoveto.com`.
2. Go to **Indexing → Pages** (or **Coverage** in older UI).
3. Open **Not found (404)** and export or copy the full list of example URLs.
4. Repeat for **Page with redirect** and **Duplicate / alternate canonical** if needed.

> **TODO (operator):** Paste exported 404 URLs into `next.config.mjs` under the Search Console cleanup section, or remove internal links if the URL was never valid.

## 2. Decide action per URL

For each URL:

| Situation | Action |
|-----------|--------|
| Old blog slug, renamed product page, or legacy marketing path | Add a **301 redirect** in `next.config.mjs` to the closest live equivalent |
| Typo, spam, or never-valid path | Leave **404**; remove any internal links pointing to it |
| Redirect-only URL listed in sitemap | Remove from sitemap sources (`lib/seo-sitemap.ts`, CMS) |
| Duplicate canonical (www vs non-www, trailing slash) | Ensure `canonicalUrl()` and redirects agree; prefer `https://zoveto.com` |

Redirect rules live in `next.config.mjs` → `redirects()`. Existing cleanup redirects are commented there. **Do not create redirect loops.**

## 3. After deploy

1. **Inspect URL** in GSC for a few fixed examples (404 → 200 or 301 → 200).
2. **Request indexing** for high-priority pages: `/`, `/product`, `/pricing`, `/contact`, `/faq`, `/company-facts`, key SEO landings.
3. **Validate** that `/sitemap.xml` does not include redirect-only or noindex paths (see `lib/seo-crawl-policy.ts`).
4. Confirm `/robots.txt` allows `/llms.txt` and points to the sitemap.

## 4. Sitemap hygiene

- Indexable static pages: `lib/seo-sitemap.ts` → `INDEXABLE_STATIC_PAGES`
- Module pages: generated from `lib/modules.ts`
- Excluded paths: `lib/seo-crawl-policy.ts` → `isSitemapExcludedPath`

## 5. Re-check in 7–14 days

GSC lag is normal. Re-open **Indexing → Pages** and confirm 404 count drops after redirects and link fixes ship.
