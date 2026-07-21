#!/usr/bin/env node
/**
 * One-shot Razorpay test runner.
 * Saves keys to .env.local, creates plans, runs E2E signup test.
 *
 * Usage:
 *   node scripts/run-razorpay-test.mjs <KEY_ID> <KEY_SECRET>
 * Or with env vars already in .env.local:
 *   node scripts/run-razorpay-test.mjs
 */

import { spawn } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envLocalPath = resolve(root, ".env.local");

function upsertEnvLocal(updates) {
  let content = existsSync(envLocalPath)
    ? readFileSync(envLocalPath, "utf8")
    : "# Razorpay test configuration\n";

  for (const [key, value] of Object.entries(updates)) {
    const line = `${key}=${value}`;
    const re = new RegExp(`^${key}=.*$`, "m");
    content = re.test(content) ? content.replace(re, line) : `${content.trimEnd()}\n${line}\n`;
  }
  writeFileSync(envLocalPath, content.endsWith("\n") ? content : `${content}\n`);
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd: root, stdio: "inherit" });
    p.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

async function main() {
  const [, , keyIdArg, keySecretArg] = process.argv;

  if (keyIdArg && keySecretArg) {
    console.log("\n→ Saving Razorpay keys to .env.local...");
    upsertEnvLocal({
      RAZORPAY_KEY_ID: keyIdArg,
      RAZORPAY_KEY_SECRET: keySecretArg,
      NEXT_PUBLIC_RAZORPAY_KEY_ID: keyIdArg,
    });
  }

  console.log("\n→ Setting up plans...");
  await run("node", ["scripts/setup-razorpay-test.mjs"]);

  console.log("\n→ Restart may be needed if dev server was already running.");
  console.log("→ Running E2E test against http://localhost:3002/signup ...\n");
  await run("node", ["scripts/test-razorpay-e2e.mjs"]);

  console.log("\nDone. Click 'I have done the transaction' in the Razorpay dashboard setup wizard.\n");
}

main().catch((err) => {
  console.error("\nTest run failed:", err.message);
  console.error("\nGet Test Mode keys: Dashboard → Account & Settings → API Keys → Generate Key");
  console.error("Then run: node scripts/run-razorpay-test.mjs rzp_test_XXXX your_secret\n");
  process.exit(1);
});
