import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

function read(relPath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relPath), "utf8");
}

describe("launch readiness static checks", () => {
  it("keeps .env.example free of committed secret values", () => {
    const ex = read(".env.example");
    for (const line of ex.split("\n")) {
      const t = line.trim();
      if (t.startsWith("#") || t.length === 0) continue;
      const m = t.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
      if (!m) continue;
      const key = m[1];
      const value = (m[2] ?? "").trim();
      if (value.length === 0) continue;
      const neverCommit = [
        "SMTP_PASS",
        "WEB_CONTACT_SECRET",
        "SMTP_USER",
      ];
      if (neverCommit.includes(key)) {
        assert.fail(`.env.example must not assign ${key} (use commented template only)`);
      }
    }
  });

  it("pins dev server to webpack when custom webpack config is used", () => {
    const runDev = read("scripts/run-dev.cjs");
    assert.ok(runDev.includes('"--webpack"'), "run-dev must pass --webpack for Next 16 dev");

    const pkg = read("package.json");
    assert.ok(pkg.includes("next dev --webpack"), "package dev scripts should invoke webpack mode");
    assert.ok(pkg.includes("next build --webpack"), "production build should invoke webpack mode");
    assert.ok(pkg.includes("patch-readlink.cjs"), "webpack scripts should preload the readlink patch on Windows");
  });

  it("uses Next.js 16 proxy convention (not middleware)", () => {
    assert.ok(fs.existsSync(path.join(process.cwd(), "proxy.ts")), "proxy.ts must exist");
    assert.ok(!fs.existsSync(path.join(process.cwd(), "middleware.ts")), "middleware.ts should be renamed");

    const proxySource = read("proxy.ts");
    assert.ok(proxySource.includes("export function proxy("), "proxy.ts must export proxy()");
  });

  it("mounts consent and consent-gated tracking in the root layout", () => {
    const layout = read("app/layout.tsx");
    assert.ok(layout.includes("SiteChromeClients"), "root layout must render SiteChromeClients");
    assert.ok(layout.includes("WhatsAppFloatButton"), "root layout must render WhatsApp float CTA");
    const waFloat = read("components/layout/WhatsAppFloatButton.tsx");
    assert.ok(waFloat.includes("z-[95]"), "WhatsApp FAB must sit below cookie layer (z-[120])");
    assert.ok(waFloat.includes("api.whatsapp.com") || waFloat.includes("getWhatsAppFloatHref"), "WhatsApp FAB must use configured wa link");
    assert.ok(
      layout.includes("VercelWebMetrics") && layout.includes("@/components/layout/VercelWebMetrics"),
      "root layout must render Vercel Web Metrics (Analytics + Speed Insights)",
    );
    const metrics = read("components/layout/VercelWebMetrics.tsx");
    assert.ok(metrics.includes("@vercel/analytics/next"), "VercelWebMetrics must load @vercel/analytics/next");
    assert.ok(metrics.includes("@vercel/speed-insights/next"), "VercelWebMetrics must load @vercel/speed-insights/next");
    const chrome = read("components/layout/SiteChromeClients.tsx");
    assert.ok(chrome.includes("CookieConsentBar"), "SiteChromeClients must include cookie banner");
    assert.ok(chrome.includes("ConditionalAnalyticsLoader"), "SiteChromeClients must load GA after consent");

    const gaLoader = read("components/tracking/ConditionalAnalyticsLoader.tsx");
    assert.ok(
      gaLoader.includes("send_page_view: false"),
      "GA4 config must disable auto page_view (AnalyticsRouteTracker sends page_view)",
    );

    const clarityLoader = read("components/tracking/ConditionalClarityLoader.tsx");
    assert.ok(clarityLoader.includes("zoveto-clarity"), "Clarity loader must use a single dedupe script id");
    assert.ok(
      clarityLoader.includes("https://www.clarity.ms/tag/") && clarityLoader.includes("NEXT_PUBLIC_CLARITY_PROJECT_ID"),
      "Clarity loader must use official clarity.ms tag URL and env-based project id",
    );
    assert.ok(chrome.includes("ConditionalClarityLoader"), "SiteChromeClients must load Clarity after consent");

    assert.ok(chrome.includes("ConditionalPostHogLoader"), "SiteChromeClients must load PostHog after consent");
    const posthogLoader = read("components/tracking/ConditionalPostHogLoader.tsx");
    assert.ok(
      posthogLoader.includes("NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN") && posthogLoader.includes("NEXT_PUBLIC_POSTHOG_HOST"),
      "PostHog loader must read project token and API host from env",
    );
    assert.ok(posthogLoader.includes("hasAnalyticsConsent"), "PostHog must gate on analytics consent");
    assert.ok(posthogLoader.includes(`defaults: "2026-01-30"`), "PostHog init must use SDK defaults 2026-01-30");
  });

  it("keeps required trust links in footer", () => {
    const footer = read("components/layout/Footer.tsx");
    const required = ['"/security"', '"/privacy"', '"/terms"'];
    for (const href of required) {
      assert.ok(footer.includes(href), `missing legal footer link ${href}`);
    }
  });

  it("wires Sentry for App Router (instrumentation, client, server, edge, global-error)", () => {
    for (const rel of [
      "instrumentation.ts",
      "instrumentation-client.ts",
      "sentry.server.config.ts",
      "sentry.edge.config.ts",
    ]) {
      assert.ok(fs.existsSync(path.join(process.cwd(), rel)), `missing ${rel}`);
    }
    const globalErr = read("app/global-error.tsx");
    assert.ok(
      globalErr.includes("@sentry/react") && globalErr.includes("captureException"),
      "global-error must capture with Sentry browser SDK",
    );
    const sentryVerify = read("app/api/v1/sentry-verify/route.ts");
    assert.ok(sentryVerify.includes("SENTRY_VERIFY_SECRET"), "sentry-verify route must gate on server secret");
    const chrome = read("components/layout/SiteChromeClients.tsx");
    assert.ok(chrome.includes("SentryVerificationThrow"), "SiteChromeClients must support optional Sentry verification");
    const nconf = read("next.config.mjs");
    assert.ok(
      nconf.includes("https://*.ingest.sentry.io") && nconf.includes("https://*.sentry.io"),
      "CSP connect-src must allow Sentry ingest",
    );
    assert.ok(
      nconf.includes("https://*.posthog.com") && nconf.includes("https://*.i.posthog.com"),
      "CSP must allow PostHog API / ingest hosts",
    );
  });

  it("keeps primary conversion CTAs at or above 44px touch target", () => {
    const navbar = read("components/layout/Navbar.tsx");
    const sticky = read("components/layout/StickyDemoCTA.tsx");
    const finalCta = read("components/sections/FinalCTASection.tsx");
    const leadForm = read("components/forms/LeadForm.tsx");
    const demoForm = read("components/forms/DemoBookingForm.tsx");
    const buttonVariantsFile = read("components/ui/button-variants.ts");

    assert.ok(navbar.includes("min-h-[44px]"), "mobile navbar trigger must stay >=44px");
    assert.ok(sticky.includes("min-h-[44px]"), "sticky CTA buttons must stay >=44px");
    assert.ok(finalCta.includes("min-h-[52px]"), "final CTA buttons must stay >=44px");
    assert.ok(leadForm.includes("min-h-[52px]"), "lead form submit must stay >=44px");
    assert.ok(demoForm.includes("min-h-[52px]"), "demo form submit must stay >=44px");
    assert.ok(buttonVariantsFile.includes('default: "h-11'), "button default size must stay >=44px");
    assert.ok(buttonVariantsFile.includes('lg: "h-12'), "button lg size must stay >=44px");
  });
});
