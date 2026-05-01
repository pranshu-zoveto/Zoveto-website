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
  });

  it("keeps required trust links in footer", () => {
    const footer = read("components/layout/Footer.tsx");
    const required = ['"/security"', '"/privacy"', '"/terms"'];
    for (const href of required) {
      assert.ok(footer.includes(href), `missing legal footer link ${href}`);
    }
  });

  it("keeps primary conversion CTAs at or above 44px touch target", () => {
    const navbar = read("components/layout/Navbar.tsx");
    const sticky = read("components/layout/StickyDemoCTA.tsx");
    const finalCta = read("components/sections/FinalCTASection.tsx");
    const leadForm = read("components/forms/LeadForm.tsx");
    const demoForm = read("components/forms/DemoBookingForm.tsx");
    const button = read("components/ui/Button.tsx");

    assert.ok(navbar.includes("min-h-[44px]"), "mobile navbar trigger must stay >=44px");
    assert.ok(sticky.includes("min-h-[44px]"), "sticky CTA buttons must stay >=44px");
    assert.ok(finalCta.includes("min-h-[52px]"), "final CTA buttons must stay >=44px");
    assert.ok(leadForm.includes("min-h-[52px]"), "lead form submit must stay >=44px");
    assert.ok(demoForm.includes("min-h-[52px]"), "demo form submit must stay >=44px");
    assert.ok(button.includes('default: "h-11'), "button default size must stay >=44px");
    assert.ok(button.includes('lg: "h-12'), "button lg size must stay >=44px");
  });
});
