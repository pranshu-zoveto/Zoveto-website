#!/usr/bin/env node
/**
 * Quick Razorpay config check — keys + plan IDs.
 * Usage: node scripts/diagnose-razorpay.mjs
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envLocal = resolve(root, ".env.local");

function loadEnv() {
  if (!existsSync(envLocal)) {
    console.error("✗ .env.local not found");
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(envLocal, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

function authHeader(keyId, keySecret) {
  return "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
}

async function main() {
  const env = loadEnv();
  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;

  console.log("\nRazorpay configuration check\n");

  if (!keyId || !keySecret) {
    console.log("✗ RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET missing in .env.local");
    process.exit(1);
  }
  console.log(`  Key ID: ${keyId.slice(0, 12)}...`);

  const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: authHeader(keyId, keySecret),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: 100, currency: "INR", receipt: `diag_${Date.now()}` }),
  });

  if (!orderRes.ok) {
    const data = await orderRes.json().catch(() => ({}));
    console.log(`✗ API keys invalid: ${data?.error?.description ?? orderRes.statusText}`);
    console.log("\nFix:");
    console.log("  1. Razorpay Dashboard → Account & Settings → API Keys → Generate Key (Test Mode)");
    console.log("  2. node scripts/run-razorpay-test.mjs rzp_test_XXXX your_secret");
    console.log("  3. Restart: npm run dev\n");
    process.exit(1);
  }
  console.log("✓ API keys valid");

  for (const [label, envKey] of [
    ["Operations Suite", "RAZORPAY_PLAN_OPS_SUITE_MONTHLY"],
    ["Business OS", "RAZORPAY_PLAN_BUSINESS_OS_MONTHLY"],
  ]) {
    const id = env[envKey] ?? "";
    if (!id || id.includes("XXXX")) {
      console.log(`✗ ${label} plan: not configured (${envKey}=plan_XXXX)`);
    } else {
      console.log(`✓ ${label} plan: ${id}`);
    }
  }

  if (
    !env.RAZORPAY_PLAN_OPS_SUITE_MONTHLY?.startsWith("plan_") ||
    env.RAZORPAY_PLAN_OPS_SUITE_MONTHLY.includes("XXXX")
  ) {
    console.log("\n→ Run: node scripts/setup-razorpay-test.mjs\n");
  } else {
    console.log("\n✓ Ready — test at http://localhost:3002/signup\n");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
