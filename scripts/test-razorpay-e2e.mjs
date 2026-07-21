#!/usr/bin/env node
/**
 * End-to-end Razorpay signup test (Playwright).
 * Requires valid keys + plans in .env.local — run setup-razorpay-test.mjs first.
 *
 * Usage: node scripts/test-razorpay-e2e.mjs
 */

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3002";
const envLocal = resolve(root, ".env.local");

function loadEnv() {
  if (!existsSync(envLocal)) throw new Error("Missing .env.local");
  const env = {};
  for (const line of readFileSync(envLocal, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

async function waitForServer(url, ms = 30000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server not ready at ${url}`);
}

async function main() {
  const env = loadEnv();
  if (!env.RAZORPAY_KEY_ID || env.RAZORPAY_KEY_ID.includes("XXXX")) {
    throw new Error("Set valid RAZORPAY_KEY_ID in .env.local first");
  }
  if (!env.RAZORPAY_PLAN_OPS_SUITE_MONTHLY || env.RAZORPAY_PLAN_OPS_SUITE_MONTHLY.includes("XXXX")) {
    console.log("Plans not configured — running setup-razorpay-test.mjs...");
    await new Promise((resolve, reject) => {
      const p = spawn("node", ["scripts/setup-razorpay-test.mjs"], { cwd: root, stdio: "inherit" });
      p.on("close", (code) => (code === 0 ? resolve() : reject(new Error("Setup failed"))));
    });
  }

  console.log(`\nChecking ${BASE}/signup ...`);
  await waitForServer(`${BASE}/signup`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log("1. Opening signup page...");
    await page.goto(`${BASE}/signup`, { waitUntil: "networkidle" });

    console.log("2. Selecting Operations Suite plan...");
    await page.getByRole("button", { name: /Operations Suite/i }).click();

    console.log("3. Filling signup form...");
    const ts = Date.now();
    await page.locator("#fullName").fill("Razorpay Test User");
    await page.locator("#email").fill(`razorpay-e2e-${ts}@zoveto.com`);
    await page.locator("#companyName").fill("Zoveto Test Co");
    await page.locator("#role").fill("Founder");
    await page.locator("#teamSize").selectOption("1-10");
    await page.locator("#useCase").selectOption("Inventory and warehouse control");
    await page.locator("#phone").fill("9876543210");

    console.log("4. Starting trial (opens Razorpay modal)...");
    await page.getByRole("button", { name: /Start Free Trial/i }).click();

    const razorpayFrame = page.frameLocator('iframe[src*="razorpay"]');
    await razorpayFrame.locator('[data-testid="card-number"], input[name="card.number"], input[placeholder*="card"]').first().waitFor({ timeout: 30000 });

    console.log("5. Entering test card (4111 1111 1111 1111)...");
    const cardInput = razorpayFrame.locator('input').filter({ hasNot: page.locator('[type="hidden"]') });
    // Razorpay checkout UI varies — try common selectors
    const numberField = razorpayFrame.locator('input[name="card[number]"], input[placeholder*="card" i], .card-number input').first();
    await numberField.fill("4111111111111111");

    const expiryField = razorpayFrame.locator('input[name="card[expiry]"], input[placeholder*="expiry" i], input[placeholder*="MM" i]').first();
    if (await expiryField.count()) await expiryField.fill("12/26");

    const cvvField = razorpayFrame.locator('input[name="card[cvv]"], input[placeholder*="cvv" i]').first();
    if (await cvvField.count()) await cvvField.fill("123");

    const payBtn = razorpayFrame.locator('button:has-text("Pay"), button:has-text("Continue"), #pay-now').first();
    await payBtn.click({ timeout: 15000 });

    console.log("6. Waiting for success screen...");
    await page.getByText(/Trial started/i).waitFor({ timeout: 60000 });
    console.log("\n✓ E2E test passed — payment completed and trial started.\n");
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("\nE2E test failed:", err.message);
  process.exit(1);
});
