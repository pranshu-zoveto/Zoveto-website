import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

function readPageSource(): string {
  return fs.readFileSync(path.join(process.cwd(), "app/page.tsx"), "utf8");
}

describe("home landing critical path (LCP)", () => {
  it("does not pull gsap onto the main page entry (desktop chunk only)", () => {
    const src = readPageSource();
    assert.ok(!src.includes('from "gsap"') && !src.includes("from 'gsap'"));
    assert.ok(!src.includes('from "gsap/') && !src.includes("from 'gsap/"));
  });

  it("lazy-loads the desktop scroll hero behind a dynamic loading fallback", () => {
    const src = readPageSource();
    assert.match(src, /dashboard-scroll-desktop/);
    assert.match(src, /loading:\s*\(\)\s*=>\s*<DashboardDesktopLoadingFallback/);
  });

  it("keeps an SSR-first hero shell on the page", () => {
    const src = readPageSource();
    assert.ok(src.includes("HomeHeroLcpShell"));
  });

  it("uses a static mobile hero module (no GSAP) and defers mobile modules chunk", () => {
    assert.ok(
      fs.existsSync(path.join(process.cwd(), "components/sections/home/StaticDashboardHero.tsx")),
      "StaticDashboardHero for mobile LCP",
    );
    const shell = fs.readFileSync(
      path.join(process.cwd(), "components/sections/home/HomeHeroLcpShell.tsx"),
      "utf8",
    );
    assert.match(shell, /StaticDashboardHero/);
    const page = readPageSource();
    assert.match(page, /dynamic\(\s*\(\)\s*=>\s*import\(".*dashboard-scroll-mobile/);
  });

  it("splits mobile dashboard from desktop (no ScrollTrigger in shared path)", () => {
    assert.ok(fs.existsSync(path.join(process.cwd(), "components/sections/dashboard-scroll-mobile.tsx")));
    assert.ok(fs.existsSync(path.join(process.cwd(), "components/sections/dashboard-scroll-desktop.tsx")));
    assert.ok(!fs.existsSync(path.join(process.cwd(), "components/sections/DashboardScrollSection.tsx")));
  });
});
