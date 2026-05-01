/**
 * Remove `node_modules` with Windows-friendly retries (handles transient ENOTEMPTY / EPERM).
 * Stop `npm run dev` and other Node processes using this folder first, or deletion may fail.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const target = path.join(root, "node_modules");

if (!fs.existsSync(target)) {
  console.log("[clean-node-modules] No node_modules — nothing to do.");
  process.exit(0);
}

try {
  fs.rmSync(target, {
    recursive: true,
    force: true,
    maxRetries: 12,
    retryDelay: 250,
  });
  console.log("[clean-node-modules] Removed node_modules");
  process.exit(0);
} catch (err) {
  console.error(
    "[clean-node-modules] Failed to remove node_modules.\n" +
      "  1) Stop every `npm run dev` / Next / vitest session for this repo.\n" +
      "  2) Close editors that lock files inside node_modules.\n" +
      "  3) Retry: npm run clean\n" +
      "  4) On Windows PowerShell as a last resort: taskkill /F /IM node.exe (kills ALL Node).\n",
  );
  console.error(err && err.message ? err.message : err);
  process.exit(1);
}
