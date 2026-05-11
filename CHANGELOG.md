# Changelog

All notable changes to `zoveto-website` are documented in this file.

This format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), adapted for daily team syncs.

## How we use this (team workflow)

- Update this file whenever you ship meaningful changes (UX, infra, tracking, SEO, dependencies, or notable fixes).
- Add items under `Unreleased` while work is in progress.
- Keep entries outcome-first (what changed + why), not just file names.
- When deploying, move `Unreleased` entries into a dated release section.
- For daily standups, read only: `Unreleased` + latest release section.

## Entry style guide

- Use categories in this order:
  - `Added`
  - `Changed`
  - `Fixed`
  - `Performance`
  - `Security`
  - `Infra`
  - `Docs`
  - `Removed`
- Keep each bullet to one line where possible.
- Prefix with scope when useful: `contact:`, `homepage:`, `tracking:`, `sentry:`.
- Mention rollout or follow-up when relevant: `Requires Vercel env update`, `Redeploy needed`.

---

## [Unreleased]

### Added
- Changelog process and release template for daily team alignment.
- `FaqAccordion` for major FAQ blocks (compare hub and detail, SEO landings, industries, case study, reorder calculator).
- Homepage `ZeroClientTrustSection` plus `components/trust/ClientProofSlots` for operator-focused trust narrative.
- India SEO landing routes and tools: AI business automation, CRM, ERP distributors, GST billing, HR and payroll, Tally alternative; migration guides (Excel, Tally, Zoho); implementation and reorder-point calculator pages.
- `components/tracking/MarketingPageView` for lightweight page-view instrumentation where needed.
- `scripts/shims/prisma-instrumentation-stub.cjs` so webpack does not pull Prisma instrumentation when Sentry is configured.

### Changed
- Contact flow copy removes duplicate "Book demo" messaging while keeping a clear conversion path.
- Marketing copy pass: replace em dashes with commas or hyphens where appropriate; tighten meta descriptions to satisfy length tests.
- Long-form marketing sections use `.prose-justify` (left-aligned on small screens, justified from `md` up) on FAQs, compare, SEO landings, industries, and trust blocks.
- Implementation page evaluation links styled as accessible buttons (hover, focus ring, arrow, touch-friendly height).
- Navbar, wordmark, sticky demo CTA, and related layout components refactored for lighter motion and clearer hierarchy.
- `next.config.mjs`: alias `@prisma/instrumentation` to the stub; suppress known non-actionable webpack warnings.
- `sentry.server.config.ts`: leaner dev tracing and no Prisma integration on the marketing site.

### Fixed
- Homepage load stability: removed invalid Server Component dynamic setting that caused runtime 500 during dev.
- Problem section SVG animation initializes `strokeDashoffset` safely to avoid browser animation errors.
- Desktop dashboard scroll logic guards state updates during teardown to prevent unmounted-update warnings.

### Performance
- Deferred or conditional third-party loaders (analytics, clarity, PostHog) and hero/dashboard code paths aligned with launch-readiness checks.

### Docs
- `README` and `docs/README` note the Prisma instrumentation shim and Sentry verification workflow.
- `docs/software-directory-profile-checklist.md` for directory and profile consistency.
- Environment and monitoring guidance expanded in `.env.example` / `.env.local.example` (Sentry + health monitor workflow).
- `.impeccable.md` captures design intent for the trust section (mixed buying committee, operator-practical tone).

---

## Release template

Copy this block when cutting a new release:

```md
## [YYYY-MM-DD] - Release title

### Added
- ...

### Changed
- ...

### Fixed
- ...

### Performance
- ...

### Security
- ...

### Infra
- ...

### Docs
- ...

### Removed
- ...
```

