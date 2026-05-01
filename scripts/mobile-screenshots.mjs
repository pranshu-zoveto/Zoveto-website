/**
 * Full-height mobile viewport screenshots of key routes (headless Chrome or Edge).
 *
 * Usage:
 *   BASE_URL=http://localhost:3002 node scripts/mobile-screenshots.mjs
 *
 * Prerequisites: Google Chrome or Microsoft Edge installed (Windows default paths).
 * Start `npm run dev` first so BASE_URL responds.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "assets", "mobile-preview");

const WIDTH = 390;
/** Tall window so headless screenshots include the scrollable page (not just one viewport band). */
const SHOT_HEIGHT = Math.min(Math.max(Number.parseInt(process.env.MOBILE_SHOT_HEIGHT || "9000", 10), 2000), 16000);
const BASE = (process.env.BASE_URL || process.argv[2] || "http://localhost:3002").replace(/\/$/, "");

const ROUTES = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "signup", path: "/signup" },
  { name: "contact", path: "/contact" },
  { name: "pricing", path: "/pricing" },
];

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    path.join(process.env["PROGRAMFILES"] || "C:\\Program Files", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(
      process.env["PROGRAMFILES(X86)"] || "C:\\Program Files (x86)",
      "Google",
      "Chrome",
      "Application",
      "chrome.exe",
    ),
    path.join(
      process.env["PROGRAMFILES(X86)"] || "C:\\Program Files (x86)",
      "Microsoft",
      "Edge",
      "Application",
      "msedge.exe",
    ),
  ].filter(Boolean);

  for (const p of candidates) {
    if (typeof p === "string" && fs.existsSync(p)) return p;
  }
  return null;
}

function shot(browser, url, file) {
  const r = spawnSync(
    browser,
    [
      `--headless=new`,
      `--disable-gpu`,
      `--window-size=${WIDTH},${SHOT_HEIGHT}`,
      `--screenshot=${file}`,
      `--hide-scrollbars`,
      `--virtual-time-budget=8000`,
      url,
    ],
    { encoding: "utf-8", windowsHide: true },
  );
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout || `exit ${r.status}`);
    return false;
  }
  return fs.existsSync(file) && fs.statSync(file).size > 0;
}

const browser = findBrowser();
if (!browser) {
  console.error(
    "No Chrome/Edge found. Set CHROME_PATH or install Chrome.\n" +
      "To preview live: open your site → F12 → Ctrl+Shift+M (Toggle device toolbar) → pick iPhone 14 Pro or width 390.",
  );
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
let ok = 0;

for (const { name, path: routePath } of ROUTES) {
  const file = path.join(outDir, `${name}-${WIDTH}x${SHOT_HEIGHT}-${stamp}.png`);
  const url = `${BASE}${routePath}`;
  console.log(url, "→", path.relative(root, file));
  if (shot(browser, url, file)) ok += 1;
  else console.error("FAILED", url);
}

console.log(`\nDone: ${ok}/${ROUTES.length} screenshots in ${path.relative(process.cwd(), outDir)}`);
