/**
 * Phone-width overflow + heading audit against a running Next server.
 * Usage: BASE_URL=http://localhost:3002 node scripts/mobile-overflow-audit.mjs
 */
import { chromium } from "playwright";

const BASE = (process.env.BASE_URL || "http://localhost:3002").replace(/\/$/, "");
const WIDTHS = [320, 360, 375, 390, 393, 412, 430];
const ROUTES = [
  "/",
  "/pricing",
  "/compare",
  "/compare/zoho-vs-zoveto",
  "/owner-dependency-score",
  "/operational-proof",
  "/blog",
  "/about",
  "/product",
  "/directory",
  "/modules/wms",
  "/industries/spare-parts-trading",
  "/security",
  "/implementation",
  "/faq",
  "/contact",
  "/signup",
  "/warehouse-management-system-india",
  "/privacy",
  "/dashboard/login",
];

const auditScript = () => {
  const winW = window.innerWidth;
  const docW = document.documentElement.scrollWidth;
  const overflowPx = Math.max(0, Math.round(docW - winW));
  const h1 = document.querySelector("h1");
  const offenders = [];
  if (overflowPx > 1) {
    const nodes = document.querySelectorAll("body *");
    for (const el of nodes) {
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      if (r.right > winW + 1) {
        const parent = el.parentElement;
        const clipped = parent && getComputedStyle(parent).overflowX !== "visible";
        if (clipped) continue;
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 90),
          right: Math.round(r.right),
        });
        if (offenders.length >= 8) break;
      }
    }
  }
  return {
    title: h1?.textContent?.trim().slice(0, 80) || "",
    docW,
    winW,
    overflowPx,
    offenders,
  };
};

const browser = await chromium.launch({ headless: true });
const problems = [];

for (const width of WIDTHS.includes(Number(process.env.WIDTH)) ? [Number(process.env.WIDTH)] : [320, 390, 430]) {
  for (const route of ROUTES) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    try {
      await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(700);
      const result = await page.evaluate(auditScript);
      const row = { width, route, ...result };
      if (result.overflowPx > 1) problems.push(row);
      console.log(
        `${width} ${route.padEnd(42)} overflow=${result.overflowPx}  h1="${result.title}"`,
      );
      if (result.offenders.length) {
        for (const o of result.offenders) console.log(`    ${o.tag}.${o.cls} right=${o.right}`);
      }
    } catch (err) {
      console.log(`${width} ${route.padEnd(42)} ERROR ${err.message}`);
      problems.push({ width, route, error: err.message });
    } finally {
      await page.close();
    }
  }
}

await browser.close();
if (problems.length) {
  console.log(`\n${problems.length} overflow/error cases`);
  process.exitCode = 1;
} else {
  console.log("\nNo page-level overflow on audited routes.");
}
