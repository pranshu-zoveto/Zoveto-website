#!/usr/bin/env node
/**
 * Validates Razorpay test keys, creates subscription plans if missing,
 * and prints .env.local lines to paste.
 *
 * Usage: node scripts/setup-razorpay-test.mjs
 * Reads RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET from .env.local
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envLocalPath = resolve(root, ".env.local");

function loadEnvLocal() {
  if (!existsSync(envLocalPath)) {
    console.error("Missing .env.local — add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET first.");
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(envLocalPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

function authHeader(keyId, keySecret) {
  return "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
}

async function rzpFetch(keyId, keySecret, path, options = {}) {
  const res = await fetch(`https://api.razorpay.com/v1${path}`, {
    ...options,
    headers: {
      Authorization: authHeader(keyId, keySecret),
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error?.description ?? res.statusText;
    throw new Error(`${path} → ${msg}`);
  }
  return data;
}

async function findOrCreatePlan(keyId, keySecret, { name, amountPaise, interval, itemName }) {
  const list = await rzpFetch(keyId, keySecret, "/plans?count=100");
  const existing = (list.items ?? []).find(
    (p) => p.item?.name === itemName && p.item?.amount === amountPaise,
  );
  if (existing) {
    console.log(`  ✓ Plan exists: ${itemName} → ${existing.id}`);
    return existing.id;
  }

  const created = await rzpFetch(keyId, keySecret, "/plans", {
    method: "POST",
    body: JSON.stringify({
      period: interval,
      interval: 1,
      item: {
        name: itemName,
        amount: amountPaise,
        currency: "INR",
        description: name,
      },
      notes: { plan_key: itemName },
    }),
  });
  console.log(`  ✓ Plan created: ${itemName} → ${created.id}`);
  return created.id;
}

function upsertEnvLocal(updates) {
  let content = existsSync(envLocalPath) ? readFileSync(envLocalPath, "utf8") : "";
  for (const [key, value] of Object.entries(updates)) {
    const line = `${key}=${value}`;
    const re = new RegExp(`^${key}=.*$`, "m");
    content = re.test(content) ? content.replace(re, line) : `${content.trimEnd()}\n${line}\n`;
  }
  writeFileSync(envLocalPath, content.endsWith("\n") ? content : `${content}\n`);
}

async function main() {
  const env = loadEnvLocal();
  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keyId.includes("XXXX") || keySecret === "XXXX") {
    console.error("\nSet valid test keys in .env.local first:");
    console.error("  RAZORPAY_KEY_ID=rzp_test_...");
    console.error("  RAZORPAY_KEY_SECRET=...");
    console.error("\nGet them from: Razorpay Dashboard → Account & Settings → API Keys → Generate Key (Test Mode)\n");
    process.exit(1);
  }

  console.log("\n1. Validating Razorpay keys...");
  const order = await rzpFetch(keyId, keySecret, "/orders", {
    method: "POST",
    body: JSON.stringify({ amount: 100, currency: "INR", receipt: `setup_${Date.now()}` }),
  });
  console.log(`  ✓ Keys valid — test order ${order.id} created (₹1)\n`);

  console.log("2. Ensuring subscription plans exist...");
  const opsPlanId = await findOrCreatePlan(keyId, keySecret, {
    name: "Operations Suite",
    itemName: "zoveto-operations-suite-monthly",
    amountPaise: 1499900,
    interval: "monthly",
  });
  const bizPlanId = await findOrCreatePlan(keyId, keySecret, {
    name: "Business OS",
    itemName: "zoveto-business-os-monthly",
    amountPaise: 2499900,
    interval: "monthly",
  });

  console.log("\n3. Updating .env.local with plan IDs...");
  upsertEnvLocal({
    NEXT_PUBLIC_RAZORPAY_KEY_ID: keyId,
    RAZORPAY_PLAN_OPS_SUITE_MONTHLY: opsPlanId,
    RAZORPAY_PLAN_BUSINESS_OS_MONTHLY: bizPlanId,
  });
  console.log("  ✓ .env.local updated\n");

  console.log("Setup complete. Restart dev server, then test at:");
  console.log("  http://localhost:3002/signup");
  console.log("\nTest card: 4111 1111 1111 1111 · CVV 123 · Exp 12/26");
  console.log("Test UPI:  test@razorpay\n");
}

main().catch((err) => {
  console.error("\nSetup failed:", err.message);
  if (err.message.includes("Authentication failed")) {
    console.error("\nYour API keys are invalid. Generate fresh Test Mode keys in the Razorpay dashboard.\n");
  }
  process.exit(1);
});
