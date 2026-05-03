# Dependency security audit — zoveto-website

**Date:** 2026-05-02  
**Repository:** zoveto-website (Next.js marketing app)

## Summary

| Metric | Before | After |
|--------|--------|--------|
| Total vulnerabilities (npm audit) | 5 | 0 |
| Critical | 0 | 0 |
| High | 0 | 0 |
| Moderate | 5 | 0 |
| Low / info | 0 | 0 |

## Findings (before)

All five issues were **moderate**, same root cause:

- **Advisory:** [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) — PostCSS &lt; 8.5.10 — XSS via unescaped `</style>` in CSS stringify output.
- **Dependency path:** `next` → nested `postcss@8.4.31` (and transitive references via `@sentry/nextjs`, `@vercel/analytics`, `@vercel/speed-insights` as reported by npm’s tree).

There were **no high or critical** findings at the time of audit.

## Actions taken

1. **`npm audit fix`** (safe) — No resolution without breaking changes; npm suggested `npm audit fix --force`, which would have **pinned `next` to 9.x** and is **not acceptable** for this app.
2. **`npm audit fix --force`** — **Not run** (would break Next.js 16 and the entire stack).
3. **Production-safe fix:** Added an npm **`overrides`** entry in `package.json` to force **`postcss@^8.5.12`** for all transitive resolutions (alongside the existing `glob` override). Then **`npm install`** to refresh `package-lock.json`.
4. **Verification:** `npm audit` → **0 vulnerabilities**; **`npm test`** → all passing; **`npm run build`** (with CI-like public env vars) → **success** (existing webpack warnings from Sentry/OpenTelemetry Prisma instrumentation remain unchanged).

## Ongoing monitoring

- **Dependabot:** `.github/dependabot.yml` — npm ecosystem, repository root, **weekly** schedule. After merge, confirm in GitHub **Settings → Code security → Dependabot** that updates are enabled for the repo.
- **Manual:** Run `npm audit` before releases; review Dependabot PRs for major bumps (especially `next`, `react`, Sentry).

## Production checklist (post-merge)

- [ ] Push to default branch and confirm **Vercel** (or your host) build is green.
- [ ] Smoke-test **homepage**, **contact/signup** flows, and a sample **API** route on the live URL.
- [ ] Confirm **Sentry** (if configured) still receives events after deploy.

## Final status

**Dependencies:** Secured to **npm audit clean** at audit time using a controlled **override** (no forced major downgrades).  
**Monitoring:** **Dependabot** configured for weekly npm updates (active after the config file is on the default branch).  
**App:** Build and automated tests passed locally after the change.
