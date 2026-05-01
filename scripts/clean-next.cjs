/**
 * Remove `.next` and `.next-dev` for a cold dev/build (next.config uses `.next-dev` in development).
 * On Windows, `trace` may stay locked while `next dev` is running — stop the dev server first.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const prodDir = path.join(root, ".next");
const devDir = path.join(root, ".next-dev");
const traceFile = path.join(prodDir, "trace");

function tryUnlink(p) {
  try {
    fs.unlinkSync(p);
    return true;
  } catch {
    return false;
  }
}

function removeDir(label, dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`[clean-next] No ${label} — skip.`);
    return;
  }
  if (label === ".next") tryUnlink(traceFile);
  fs.rmSync(dirPath, { recursive: true, force: true });
  console.log(`[clean-next] Removed ${label}`);
}

try {
  removeDir(".next", prodDir);
  removeDir(".next-dev", devDir);
  process.exit(0);
} catch (err) {
  console.error(
    "[clean-next] Could not remove build dirs (often EPERM on Windows when Next still holds files).\n" +
      "  1) Stop `npm run dev` and any other Next process using this folder.\n" +
      "  2) Retry: npm run clean:next\n" +
      "  3) If it persists: exclude the repo from real-time antivirus / avoid syncing this folder with OneDrive.\n",
  );
  console.error(err && err.message ? err.message : err);
  process.exit(1);
}
