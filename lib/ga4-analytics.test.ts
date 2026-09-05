import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

describe("GA4 loading", () => {
  it("does not hardcode GoogleAnalytics in root layout", () => {
    const layout = fs.readFileSync(path.join(process.cwd(), "app/layout.tsx"), "utf8");
    assert.doesNotMatch(layout, /GoogleAnalytics/);
    assert.doesNotMatch(layout, /G-XRM9Y716DJ/);
    assert.doesNotMatch(layout, /googletagmanager\.com\/gtag\/js/);
    assert.doesNotMatch(layout, /GTM-MT5G5NCL/);
    assert.doesNotMatch(layout, /googletagmanager\.com\/gtm\.js/);
    assert.doesNotMatch(layout, /AW-18133443669/);
    assert.doesNotMatch(layout, /@next\/third-parties\/google/);
  });

  it("loads GA through consent-gated ConditionalAnalyticsLoader", () => {
    const loader = fs.readFileSync(
      path.join(process.cwd(), "components/tracking/ConditionalAnalyticsLoader.tsx"),
      "utf8",
    );
    assert.match(loader, /getGa4MeasurementId/);
    assert.match(loader, /googletagmanager\.com\/gtag\/js/);
    const idSource = fs.readFileSync(path.join(process.cwd(), "lib/ga4-measurement-id.ts"), "utf8");
    assert.match(idSource, /G-XRM9Y716DJ/);
  });

  it("loads Google Ads through consent-gated ConditionalGoogleAdsLoader", () => {
    const loader = fs.readFileSync(
      path.join(process.cwd(), "components/tracking/ConditionalGoogleAdsLoader.tsx"),
      "utf8",
    );
    assert.match(loader, /hasMarketingConsent/);
    assert.match(loader, /getGoogleAdsId/);
    const chrome = fs.readFileSync(
      path.join(process.cwd(), "components/layout/SiteChromeClients.tsx"),
      "utf8",
    );
    assert.match(chrome, /ConditionalGoogleAdsLoader/);
    const idSource = fs.readFileSync(path.join(process.cwd(), "lib/google-ads-id.ts"), "utf8");
    assert.match(idSource, /AW-18133443669/);
  });

  it("loads GTM through consent-gated ConditionalGtmLoader", () => {
    const loader = fs.readFileSync(
      path.join(process.cwd(), "components/tracking/ConditionalGtmLoader.tsx"),
      "utf8",
    );
    assert.match(loader, /getGtmContainerId/);
    assert.match(loader, /googletagmanager\.com\/gtm\.js/);
    assert.doesNotMatch(loader, /G-XRM9Y716DJ/);
    const idSource = fs.readFileSync(path.join(process.cwd(), "lib/gtm-container-id.ts"), "utf8");
    assert.match(idSource, /GTM-MT5G5NCL/);
  });
});
