import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

function readPageSource(): string {
  return fs.readFileSync(path.join(process.cwd(), "app/(marketing)/page.tsx"), "utf8");
}

describe("home landing critical path (LCP)", () => {
  it("does not pull gsap onto the main page entry (desktop chunk only)", () => {
    const src = readPageSource();
    assert.ok(!src.includes('from "gsap"') && !src.includes("from 'gsap'"));
    assert.ok(!src.includes('from "gsap/') && !src.includes("from 'gsap/"));
  });

  it("lazy-loads the desktop system animation behind a dynamic loading fallback", () => {
    const src = readPageSource();
    assert.match(src, /dashboard-scroll-desktop/);
    assert.match(src, /loading:\s*\(\)\s*=>\s*<DashboardDesktopLoadingFallback/);
  });

  it("keeps an SSR-first product heading on the page", () => {
    const src = readPageSource();
    assert.ok(src.includes("HomeProductHero"));
    assert.ok(src.includes("product-demo-heading") || src.includes("HomeProductHero"));
  });

  it("places the product tour before the module animation", () => {
    const src = readPageSource();
    const product = src.indexOf("<ProductTourInteractive");
    const desktop = src.indexOf("<DashboardScrollDesktop");
    const mobile = src.indexOf("<DashboardMobileModules");
    assert.ok(product >= 0, "product tour should render on the homepage");
    assert.ok(desktop >= 0 && mobile >= 0, "existing module animation should still mount");
    assert.ok(product < desktop && product < mobile, "product must appear before the module animation");
    assert.ok(!src.includes("<HomeHeroLcpShell"), "old marketing hero shell must not precede the product");
  });

  it("introduces the moved animation as a system section, not a second hero", () => {
    const src = readPageSource();
    assert.ok(src.includes("HomeProductHero"));
    assert.ok(src.includes("HomeProductConnects"));
    assert.ok(src.includes("HomeSystemIntro"));
    assert.ok(src.indexOf("<HomeProductHero") < src.indexOf("<HomeSystemIntro"));
    assert.ok(src.indexOf("<HomeSystemIntro") < src.indexOf("<DashboardScrollDesktop"));
    const desktop = fs.readFileSync(
      path.join(process.cwd(), "components/sections/dashboard-scroll-desktop.tsx"),
      "utf8",
    );
    assert.ok(!desktop.includes("HOME_HERO_VALUE_PROP"), "animation must not duplicate the old hero headline");
    assert.ok(!desktop.includes("HOME_HERO_PRIMARY_CTA"), "animation must not duplicate the old hero CTA");
  });

  it("defers the tablet module strip and keeps the animation files split", () => {
    const page = readPageSource();
    assert.match(page, /dynamic\(\s*\(\)\s*=>\s*import\(".*dashboard-scroll-mobile/);
    assert.ok(fs.existsSync(path.join(process.cwd(), "components/sections/home/StaticDashboardHero.tsx")));
    assert.ok(fs.existsSync(path.join(process.cwd(), "components/sections/dashboard-scroll-mobile.tsx")));
    assert.ok(fs.existsSync(path.join(process.cwd(), "components/sections/dashboard-scroll-desktop.tsx")));
    assert.ok(!fs.existsSync(path.join(process.cwd(), "components/sections/DashboardScrollSection.tsx")));
  });

  it("does not mount the product-demo reel on the homepage entry", () => {
    const page = readPageSource();
    assert.ok(!page.includes("ProductDemoReel"));
    assert.ok(!page.includes("ProductDemoReelPinned"));
  });
});
