import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE_URL || "http://192.168.68.124:3002";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: { width: 393, height: 852, isMobile: true, hasTouch: true },
  args: ["--no-sandbox"],
});

const page = await browser.newPage();
await page.setUserAgent(
  "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
);

const logs = [];
page.on("console", (msg) => {
  const t = msg.type();
  const text = msg.text();
  if (t === "error" || t === "warning" || /hydrat/i.test(text)) {
    logs.push({ t, text });
  }
});

await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60_000 });
await new Promise((r) => setTimeout(r, 2000));

console.log("=== hydration-related console ===");
for (const l of logs) console.log(`[${l.t}]`, l.text.slice(0, 2000));

await browser.close();
