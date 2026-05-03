# Zoveto marketing site (Next.js)

Public marketing site with a controlled early-access signup funnel. Signup requests are stored in **COS** via `POST /api/leads`; this app does **not** provision tenants or grant instant access. Lead/demo/contact flows also use **`POST /api/leads`** and **`POST /api/demo`**.

## How it talks to COS

| Flow | Path | Notes |
|------|------|--------|
| Early-access signup | `app/api/signup` → COS `/api/leads` | Waitlist only; founder review required before onboarding |
| Lead capture / demo | Browser → **`/api/leads`** / **`/api/demo`** (Next) → COS | Proxied so optional `WEB_CONTACT_SECRET` stays server-only |
| Contact form | `app/api/contact` → COS `/api/leads` | Same pipeline |

Browser-facing env vars must be set at **build time** (`NEXT_PUBLIC_*`). Server env (`COS_API_BASE_URL`, `WEB_CONTACT_SECRET`) is read at **runtime** in Route Handlers.

### Vercel / production (forms and leads)

Server route handlers try **SMTP first** (optional), then **COS** (`POST /api/leads` or `/api/demo`). On **Vercel**, if **`COS_API_BASE_URL` is not set**, the app **does not** default to `localhost` — it skips COS and **signup, contact, demo, and footer product-updates (`POST /api/leads`)** still succeed when mail is delivered to **`info@zoveto.com`**. Add **`COS_API_BASE_URL`** when you want leads stored in COS as well.

| Variable | Required | Notes |
|----------|----------|--------|
| `COS_API_BASE_URL` | Optional if **SMTP** (`MAIL_FROM`, `SMTP_*`) is configured — routes notify **`info@zoveto.com`** and return success | Public COS base including `/api` (e.g. `https://api.yourdomain.com/api`). Runtime env — add in Vercel and **redeploy**. |
| `WEB_CONTACT_SECRET` | If COS enforces it | Must match COS `WEB_CONTACT_SECRET` or COS returns 401/403. |
| `SMTP_*` + `MAIL_FROM` | Recommended on Vercel | Required if COS is not configured yet, or as backup when COS errors. Use port **587** + `SMTP_SECURE=false` for typical STARTTLS; port **465** often needs `SMTP_SECURE=true`. |

After changing env vars, **redeploy** so serverless functions pick up runtime values.

## Local development

1. Run COS API on the host (e.g. `http://127.0.0.1:4000` with global prefix `/api`).
2. Copy `.env.example` → `.env.local` and adjust URLs.
3. From this folder:

```bash
npm install
npm run dev
```

Open `http://localhost:3002` (webpack dev listens on `--port 3002` in `npm run dev`). Signup submits an early-access lead and shows a review-queue success state; it does not redirect to the app.

### Windows: exFAT drives (external disks, some USB volumes)

If the repo lives on a volume formatted as **exFAT**, Webpack’s production compile (`npm run build`) can fail with `EISDIR: illegal operation on a directory, readlink` even when `node_modules` is healthy. **Local `npm run dev` usually still works.** Fixes that keep full parity with CI:

- Move or clone the project to an **NTFS** drive (for example `C:\…`), or
- Run the **Docker** build (Linux filesystem inside the container; see Docker section below).

**Before `npm run clean` or deleting `node_modules`:** stop `npm run dev` and anything else touching `node_modules`, or Windows may report “access denied” during removal.

**COS must allow your origins** (CORS): in dev, `http://localhost:3000` is included by default in COS. Set `PUBLIC_WEBSITE_ORIGINS` / `FRONTEND_URL` in production.

**Controlled onboarding**: `/signup` must remain waitlist-only. Do not route it back to `/onboarding/provision` unless founder-controlled access is intentionally replaced.

## Docker (Zoveto monorepo)

From `Zoveto/` (sibling folder), with `zoveto-website` as `../zoveto-website`:

```bash
docker compose -f docker-compose.dev.yml --env-file .env --profile website up -d --build
```

Compose sets `COS_API_BASE_URL=http://api:3000/api` for the website container and loads root `.env` (including optional `WEB_CONTACT_SECRET` — keep it identical to COS `WEB_CONTACT_SECRET` if you use that guard).

Browser still uses `NEXT_PUBLIC_COS_API_URL` (default `http://localhost:4000/api`) for any legacy direct calls; **leads and demos** use same-origin `/api/leads` and `/api/demo`, so they work even when `WEB_CONTACT_SECRET` is enabled on COS.

## Email

- **Primary pipeline:** leads and demos are stored and notified through **COS** (`POST /api/leads`, etc.).
- **Optional (this repo):** if `SMTP_*` and `MAIL_FROM` are set, `lib/server-mail.ts` sends inward notifications to **`info@zoveto.com`** for signup, contact, demo, and **`/api/leads`** (including the footer product-updates form). Leave them unset locally if you rely on COS only; routes skip mail when SMTP is not configured.

**Security:** rotate any SMTP or app password that was ever pasted into a committed file or shared chat—even if `.env*` is gitignored.

## Sentry (errors — browser + API routes + Edge)

Integrated via `@sentry/nextjs`:

- **`instrumentation.ts`** — loads server + edge SDKs; exports **`onRequestError`** (`captureRequestError`) for App Router request failures.
- **`instrumentation-client.ts`** — browser bundle; exports **`onRouterTransitionStart`** for navigation spans.
- **`sentry.server.config.ts`**, **`sentry.edge.config.ts`** — runtime `Sentry.init` when `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` is set.
- **`app/global-error.tsx`** — captures React root render errors.

CSP allows **`https://*.ingest.sentry.io`** and **`https://*.sentry.io`**. **`worker-src 'self' blob:`** is included so you can enable Session Replay later without a CSP change.

This repo does **not** wrap `next.config` with **`withSentryConfig`** (avoids loading the full Sentry webpack plugin stack during config evaluation; keeps Windows/`node_modules` flaky installs from breaking `next build`). **Source maps** in production: use the **Sentry Vercel integration** (recommended) or upload releases with **`sentry-cli`** / CI using `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`.

**Vercel (production):**

1. Create a Sentry project → **Settings → Client Keys (DSN)**.
2. Set **`NEXT_PUBLIC_SENTRY_DSN`** and **`SENTRY_DSN`** to the **same DSN** (server reads `SENTRY_DSN` first, then falls back to the public DSN).
3. Redeploy. Open **Issues** in Sentry and confirm events (or temporarily throw in an API route and remove).
4. Optional: enable the **Sentry integration** on the Vercel project for automatic release + source map association.

**Preview vs production:** set **`NEXT_PUBLIC_SENTRY_ENVIRONMENT=preview`** on Preview deployments if you want separate issue streams (optional).

**Audit (this repo — code):** Sentry is **installed and wired** (`@sentry/nextjs` 10.x, `instrumentation.ts` + `instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`, `app/global-error.tsx`, CSP ingest allowlist). There is **no** `sentry.client.config.ts` (Next uses `instrumentation-client.ts` instead). **You must confirm in Vercel** that **`NEXT_PUBLIC_SENTRY_DSN`** and **`SENTRY_DSN`** are set for **Production** (not Preview-only unless intentional). **`NODE_ENV=production`** is automatic on Vercel production builds. **AWS:** this package is the marketing Next.js app on Vercel; separate AWS APIs need their own Sentry SDK (`@sentry/node` / OpenTelemetry) in those services — not duplicated here.

**Manual verify after deploy:**

1. **Browser (optional, disruptive):** set **`NEXT_PUBLIC_SENTRY_VERIFICATION=1`**, redeploy Production, load any page → expect one **“Sentry Frontend Test Error”** in Issues → **remove the env var** and redeploy.
2. **API (non-disruptive):** set **`SENTRY_VERIFY_SECRET`** to a long random value on Vercel (Production). Then:  
   `curl -sS -X POST https://zoveto.com/api/v1/sentry-verify -H "Content-Type: application/json" -d "{\"secret\":\"YOUR_SECRET\"}"`  
   → check Sentry → **delete `SENTRY_VERIFY_SECRET`** (route returns 404 when unset).

## Documentation

- [Marketing copy style](docs/copy-style-guide.md) — voice and wording guardrails for UI copy.

## Launch validation (must be green before tagging `v1.0.0`)

Run from this directory — **in order**:

```bash
npm ci
npm run test
npm run typecheck
npm run lint
npm run build
```

**Windows:** If `npm ci` fails with `EPERM` / `ENOTEMPTY`, stop every `npm run dev`, IDE processes touching `node_modules`, and retry `npm run clean` then `npm install`. After code is pushed, trust [GitHub Actions CI](https://github.com/pranshu-zoveto/Zoveto-website/actions) for a clean `npm ci` verification on Ubuntu.

---

## Production checklist (Vercel / VPS)

Copy from `.env.example`. Public vars must match **HTTPS** origins (no trailing slash on `NEXT_PUBLIC_SITE_URL`).

| Variable | Required | Notes |
|----------|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical marketing origin, e.g. `https://zoveto.com` |
| `NEXT_PUBLIC_COS_API_URL` | Yes | COS public API base with `/api` |
| `NEXT_PUBLIC_COS_APP_URL` | Yes | Product SPA / app origin |
| `COS_API_BASE_URL` | Yes | Server-side COS base including `/api` |
| `WEB_CONTACT_SECRET` | If COS expects it | Same value as COS `WEB_CONTACT_SECRET` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Loads only after cookie consent |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Search Console |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Optional | Loads only after analytics consent |
| `SMTP_*` / `MAIL_FROM` | Optional | Inward notifications via `server-mail`; omit if unused |
| `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_DSN` | Recommended | Same DSN string for browser + server error tracking |
| `SENTRY_AUTH_TOKEN` / `SENTRY_ORG` / `SENTRY_PROJECT` | Optional | Source maps + release association on `next build` |
| `VERCEL` | Auto on Vercel | Enables HSTS path when `NODE_ENV=production` |
| `HSTS_PRELOAD` | Optional | Set `1` only after TLS validation |
| `API_RATE_LIMIT_DISABLED` | Never in prod | Disables middleware rate limiting |

Operational: COS `FRONTEND_URL` / `PUBLIC_WEBSITE_ORIGINS` must include your marketing domain; run `npm run test && npm run typecheck && npm run build && npm run lint` before deploy.

**Supply chain:** `npm audit` may report moderate issues in nested dependencies (for example PostCSS inside Next). Do not run `npm audit fix --force` without review—it can pin incompatible Next versions. Prefer upgrading `next` within the same major line when advisories are addressed upstream, or use **`overrides`** in `package.json` when a patched transitive version is compatible (see [docs/security/dependency-audit.md](docs/security/dependency-audit.md)). **Dependabot** runs weekly via [`.github/dependabot.yml`](.github/dependabot.yml).
