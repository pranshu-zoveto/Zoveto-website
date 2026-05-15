import puppeteer from "puppeteer-core";
import { writeFileSync } from "node:fs";

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE_URL || "http://localhost:3002";
const OUT = "/tmp/zoveto-mobile-shots";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: null,
  args: ["--hide-scrollbars", "--no-sandbox"],
});

const page = await browser.newPage();

// iPhone 14 Pro logical viewport (CSS pixels)
await page.setViewport({
  width: 393,
  height: 852,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  isLandscape: false,
});
await page.setUserAgent(
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
);

// Pre-accept cookie consent so the banner never appears
await page.evaluateOnNewDocument(() => {
  try {
    const consent = {
      v: 1,
      necessary: true,
      analytics: true,
      marketing: true,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(
      "zoveto_cookie_consent_v1",
      JSON.stringify(consent),
    );
    document.cookie =
      "zoveto_consent=" +
      encodeURIComponent(JSON.stringify(consent)) +
      "; path=/; max-age=15552000";
  } catch (_e) {}
});

async function visit(path) {
  const url = BASE + path;
  console.log("visit:", url);
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60_000 });
  // Give animations/fonts an extra beat
  await new Promise((r) => setTimeout(r, 600));
}

async function shot(name) {
  const path = `${OUT}/${name}.png`;
  await page.screenshot({ path, type: "png" });
  // Measure horizontal overflow
  const overflow = await page.evaluate(() => ({
    docW: document.documentElement.scrollWidth,
    docH: document.documentElement.scrollHeight,
    winW: window.innerWidth,
    winH: window.innerHeight,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  }));
  console.log(name, JSON.stringify(overflow));
  return overflow;
}

const results = {};

// 1. Home – top of hero
await visit("/");
results["10-home-hero"] = await shot("10-home-hero");

// 2. Home – problem section
await page.evaluate(() => window.scrollTo({ top: 700, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 350));
results["11-home-problem"] = await shot("11-home-problem");

// 3. Home – modules
await page.evaluate(() => window.scrollTo({ top: 1600, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 350));
results["12-home-modules"] = await shot("12-home-modules");

// 4. Home – pricing / mid
await page.evaluate(() => window.scrollTo({ top: 2700, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 350));
results["13-home-mid"] = await shot("13-home-mid");

// 5. Home – FAQ / lower
await page.evaluate(() => window.scrollTo({ top: 4200, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 350));
results["14-home-faq"] = await shot("14-home-faq");

// 6. Home – footer
await page.evaluate(() =>
  window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
);
await new Promise((r) => setTimeout(r, 350));
results["15-home-footer"] = await shot("15-home-footer");

// 7. Mobile menu open
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 250));
// Try several selectors for the hamburger
const hamburger = await page.$(
  'button[aria-label*="menu" i], button[aria-controls*="menu" i], [data-mobile-menu-trigger]',
);
if (hamburger) {
  await hamburger.click();
  await new Promise((r) => setTimeout(r, 400));
  results["16-home-menu-open"] = await shot("16-home-menu-open");
  // close
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 200));
} else {
  console.warn("⚠ hamburger button not found");
}

// 8. Pricing
await visit("/pricing");
results["20-pricing-top"] = await shot("20-pricing-top");
await page.evaluate(() => window.scrollTo({ top: 700, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 350));
results["21-pricing-cards"] = await shot("21-pricing-cards");

// 9. Blog
await visit("/blog");
results["30-blog"] = await shot("30-blog");

// 10. Contact
await visit("/contact");
results["40-contact"] = await shot("40-contact");

// 11. About
await visit("/about");
results["50-about"] = await shot("50-about");

writeFileSync(`${OUT}/_overflow.json`, JSON.stringify(results, null, 2));
console.log("✅ done");

await browser.close();
