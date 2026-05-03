import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import type { Metadata } from "next";
import { BRAND_CANONICAL_ORIGIN } from "@/lib/branding";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as pricingMetadata } from "@/app/pricing/page";
import { metadata as contactMetadata } from "@/app/contact/page";
import { metadata as aboutMetadata } from "@/app/about/page";
import { metadata as securityMetadata } from "@/app/security/page";
import { metadata as signupMetadata } from "@/app/signup/page";
import { metadata as operationalProofMetadata } from "@/app/operational-proof/page";
import { metadata as teamMetadata } from "@/app/team/page";

function toTitleString(meta: Metadata): string {
  if (typeof meta.title === "string") return meta.title;
  if (meta.title && typeof meta.title === "object" && "default" in meta.title) {
    const value = meta.title.default;
    if (typeof value === "string") return value;
  }
  return "";
}

function toDescriptionString(meta: Metadata): string {
  return typeof meta.description === "string" ? meta.description : "";
}

function hasOgImage(meta: Metadata): boolean {
  const images = meta.openGraph?.images;
  if (!images) return false;
  if (typeof images === "string") return images.length > 0;
  if (Array.isArray(images)) return images.length > 0;
  return true;
}

describe("metadata quality for key routes", () => {
  const routes: Array<{ route: string; metadata: Metadata }> = [
    { route: "/", metadata: homeMetadata },
    { route: "/pricing", metadata: pricingMetadata },
    { route: "/contact", metadata: contactMetadata },
    { route: "/about", metadata: aboutMetadata },
    { route: "/team", metadata: teamMetadata },
    { route: "/security", metadata: securityMetadata },
    { route: "/signup", metadata: signupMetadata },
    { route: "/operational-proof", metadata: operationalProofMetadata },
  ];

  it("keeps unique non-empty titles and descriptions", () => {
    const titles = routes.map((r) => toTitleString(r.metadata));
    const descriptions = routes.map((r) => toDescriptionString(r.metadata));

    for (let i = 0; i < titles.length; i++) {
      const title = titles[i]!;
      assert.ok(title.trim().length > 0, `missing title for ${routes[i]!.route}`);
    }
    for (let i = 0; i < descriptions.length; i++) {
      const description = descriptions[i]!;
      assert.ok(description.trim().length > 0, `missing description for ${routes[i]!.route}`);
    }

    assert.equal(new Set(titles).size, titles.length, "expected unique page titles on key routes");
    assert.equal(
      new Set(descriptions).size,
      descriptions.length,
      "expected unique page descriptions on key routes"
    );
  });

  it("provides Open Graph images on key routes", () => {
    for (const route of routes) {
      assert.ok(hasOgImage(route.metadata), `missing openGraph.images for ${route.route}`);
    }
  });

  it("root layout alternates and homepage canonical stay aligned (hreflang + no slash mismatch)", () => {
    const layoutSource = fs.readFileSync(path.join(process.cwd(), "app/layout.tsx"), "utf8");
    assert.ok(layoutSource.includes("alternates:"), "root layout must define metadata.alternates");
    assert.ok(layoutSource.includes("languages:"), "root layout alternates must include hreflang languages");
    assert.ok(layoutSource.includes('"en-IN"') && layoutSource.includes("en:"), "hreflang must include en and en-IN");
    assert.ok(layoutSource.includes("canonical:"), "root layout must set canonical");
    assert.equal(homeMetadata.alternates?.canonical, BRAND_CANONICAL_ORIGIN);
  });
});
