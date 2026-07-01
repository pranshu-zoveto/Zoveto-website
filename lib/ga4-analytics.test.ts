import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

describe("GA4 loading", () => {
  it("does not hardcode GoogleAnalytics in root layout", () => {
    const layout = fs.readFileSync(path.join(process.cwd(), "app/layout.tsx"), "utf8");
    assert.doesNotMatch(layout, /GoogleAnalytics/);
    assert.doesNotMatch(layout, /G-TJP3DXS9MG/);
    assert.doesNotMatch(layout, /@next\/third-parties\/google/);
  });

  it("loads GA through consent-gated ConditionalAnalyticsLoader", () => {
    const loader = fs.readFileSync(
      path.join(process.cwd(), "components/tracking/ConditionalAnalyticsLoader.tsx"),
      "utf8",
    );
    assert.match(loader, /NEXT_PUBLIC_GA_MEASUREMENT_ID/);
  });
});
