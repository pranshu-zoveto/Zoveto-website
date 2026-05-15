import puppeteer from "puppeteer-core";

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE_URL || "http://192.168.1.4:3002";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: null,
  args: ["--hide-scrollbars", "--no-sandbox"],
});

const page = await browser.newPage();

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
  } catch (_e) {}
});

const consoleErrors = [];
const pageErrors = [];
const requestFailures = [];
const blockedByCsp = [];

page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => pageErrors.push(String(err && err.message) || String(err)));
page.on("requestfailed", (req) => {
  requestFailures.push({ url: req.url(), reason: req.failure()?.errorText });
});

console.log("→ goto", BASE);
await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60_000 });
await new Promise((r) => setTimeout(r, 1500));

const hydrated = await page.evaluate(() => {
  return {
    hasReactRoot: !!document.querySelector("[data-reactroot], #__next, body > div"),
    ctas: Array.from(document.querySelectorAll("a,button"))
      .slice(0, 200)
      .map((el) => ({
        tag: el.tagName,
        href: el.getAttribute("href"),
        text: (el.textContent || "").trim().slice(0, 60),
      }))
      .filter((e) => /demo|setup path|get started|book/i.test(e.text)),
  };
});

console.log("hydrated probe:", JSON.stringify(hydrated, null, 2));

// Try to tap the primary CTA "Book a 20-min demo" — emulate a real tap by
// scrolling into view and dispatching a synthetic click via element.click().
let navResult = "not-attempted";
const found = await page.evaluate(() => {
  const candidates = Array.from(document.querySelectorAll("a, button"));
  const el = candidates.find((node) =>
    /book a 20-min demo/i.test((node.textContent || "").trim()),
  );
  if (!el) return null;
  el.scrollIntoView({ block: "center", inline: "center" });
  return {
    tag: el.tagName,
    href: el.getAttribute("href") || el.closest("a")?.getAttribute("href") || null,
    rect: el.getBoundingClientRect().toJSON?.() ?? null,
  };
});
console.log("found CTA:", JSON.stringify(found));
if (found) {
  await new Promise((r) => setTimeout(r, 400));
  try {
    await Promise.all([
      page.waitForNavigation({ timeout: 10_000 }).catch(() => null),
      page.evaluate(() => {
        const candidates = Array.from(document.querySelectorAll("a, button"));
        const el = candidates.find((node) =>
          /book a 20-min demo/i.test((node.textContent || "").trim()),
        );
        if (el) el.click();
      }),
    ]);
    navResult = page.url();
  } catch (e) {
    navResult = "click-failed: " + String(e.message || e);
  }
} else {
  navResult = "cta-not-found";
}

await page.screenshot({ path: "/tmp/zoveto-mobile-shots/after-click.png" });

await browser.close();

console.log("\n=== RESULT ===");
console.log("nav after click:", navResult);
console.log("page errors:", pageErrors);
console.log("console errors:", consoleErrors.slice(0, 8));
console.log("request failures (first 10):");
for (const f of requestFailures.slice(0, 10)) console.log("  ", f);
