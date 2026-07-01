# GEO off-site checklist (non-code)

Use the same canonical description as [`lib/brand-entity.ts`](../../lib/brand-entity.ts) (`ZOVETO_ORGANIZATION_DESCRIPTION`) and [`/company-facts`](https://zoveto.com/company-facts) everywhere below.

## Priority order

### 1. LinkedIn company profile (highest)

- [ ] Fill **About**, **specialties**, **website** (`https://zoveto.com`), and **logo** with the same brand description as the site
- [ ] Link to `/company-facts`, `/faq`, `/product`, and `/pricing` in posts when relevant
- [ ] Founder LinkedIn posts that cite real workflows (WhatsApp + Excel → one OS) — no fake customer logos

### 2. Google Business Profile (if applicable)

- [ ] Create or claim only if you have a legitimate public-facing office or service area policy
- [ ] Use `info@zoveto.com` and canonical website URL

### 3. Entity graph (optional)

- [ ] **Crunchbase** — only if the company wants a public entity graph; match legal name and description
- [ ] Do **not** add Crunchbase/G2/Capterra to JSON-LD `sameAs` until profiles are live and verified

### 4. Review marketplaces (only when real)

- [ ] **G2 / Capterra** — list only when a real profile exists with honest positioning; no fabricated reviews
- [ ] **SoftwareSuggest** and India-relevant SaaS directories when relevant to SMB ops software

### 5. Authority content (3–5 honest placements over time)

- [ ] Founder or operator story linking to `/company-facts` and `/company-operating-system-india`
- [ ] Ecosystem or industry publication with honest fit framing (no paid fake endorsements)
- [ ] 3–5 external articles or listings using the **same** canonical description — not keyword-stuffed variants

### 6. Reviews policy

- [ ] Collect **real** reviews only, with specific workflows and outcomes
- [ ] **No** incentives for dishonest claims
- [ ] **No** fake customer names, logos, or star ratings on the marketing site

## Search Console (after deploy)

- [ ] Follow [`docs/search-console-cleanup.md`](../search-console-cleanup.md)
- [ ] Request indexing for `/faq`, `/company-facts`, `/company-operating-system-india`, and materially changed high-traffic URLs

## AI crawlers

- [ ] Confirm `https://zoveto.com/llms.txt` returns 200 plain text
- [ ] Keep `/company-facts` indexable and linked from footer
