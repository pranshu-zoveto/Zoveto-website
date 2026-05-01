/**
 * Start Next dev. Default base port 3002; if busy, uses the next free port up to base+29.
 * Override base: PORT=4000 or DEV_PORT=4000 npm run dev
 *
 * After `npm run clean` you must run `npm install` before `npm run dev` (dev never uses npx — it breaks on Windows).
 * Stuck updates: `npm run clean:next` then `npm run dev` (or one shot: `npm run dev:reset`).
 * If you see `Cannot find module ... middleware-manifest.json` or EPERM on `.next/trace`, stop the
 * server, run `npm run clean:next`, then start again — avoid hitting the site until "Ready".
 * Windows / Docker: `next.config.mjs` enables watch polling when WATCHPACK_POLLING=1 or on win32.
 * Next 16 defaults `next dev` to Turbopack; we force webpack here because this repo relies on
 * custom `webpack()` cache/watch tuning for reliable HMR on Windows.
 */
const fs = require("fs");
const net = require("net");
const path = require("path");
const { createRequire } = require("module");
const { spawn } = require("child_process");

const root = path.join(__dirname, "..");
const req = createRequire(path.join(root, "package.json"));

function resolveNextPaths() {
  try {
    const nextBin = req.resolve("next/dist/bin/next");
    const nextRequireHook = req.resolve("next/dist/server/require-hook.js");
    return { nextBin, nextRequireHook };
  } catch {
    return null;
  }
}

function exitIfNextUnavailable() {
  const paths = resolveNextPaths();
  if (!paths || !fs.existsSync(paths.nextBin)) {
    console.error(
      "[zoveto-website] Local Next.js is not installed or node_modules is incomplete.\n" +
        "  From this folder run: npm install\n" +
        "  If npm errors with EPERM/ENOTEMPTY, stop all Node processes and retry: npm run clean && npm install\n" +
        "  Then: npm run dev\n",
    );
    process.exit(1);
  }
  if (!fs.existsSync(paths.nextRequireHook)) {
    console.error(
      "[zoveto-website] The `next` package looks incomplete (missing dist/server/require-hook.js).\n" +
        "  Fix: npm run clean && npm install\n" +
        "  If it persists, delete node_modules/next only and run npm install again.\n",
    );
    process.exit(1);
  }
}

/** @returns {Promise<boolean>} true if port is free for bind */
function probePortFree(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.once("error", (err) => {
      if (err.code === "EADDRINUSE") resolve(false);
      else reject(err);
    });
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
  });
}

async function pickFreePort(start) {
  const n = Number.parseInt(String(start), 10);
  const base = Number.isFinite(n) && n > 0 ? n : 3002;
  const span = 30;
  for (let p = base; p < base + span; p += 1) {
    try {
      if (await probePortFree(p)) return p;
    } catch (e) {
      console.error(`[zoveto-website] Port probe failed on ${p}:`, e.message || e);
      throw e;
    }
  }
  throw new Error(`[zoveto-website] No free port between ${base} and ${base + span - 1}.`);
}

function spawnNext(port) {
  const paths = resolveNextPaths();
  const nextBin = paths.nextBin;
  const readlinkPatch = path.join(root, "scripts", "patch-readlink.cjs");
  const portStr = String(port);
  const env = { ...process.env, PORT: portStr };
  return spawn(process.execPath, ["--require", readlinkPatch, nextBin, "dev", "--webpack", "-p", portStr], {
    cwd: root,
    stdio: "inherit",
    env,
  });
}

async function main() {
  exitIfNextUnavailable();
  const requested = process.env.PORT || process.env.DEV_PORT || "3002";
  const port = await pickFreePort(requested);
  if (String(port) !== String(requested).trim()) {
    console.log(`[zoveto-website] Port ${requested} is in use — starting on http://localhost:${port}\n`);
  }
  const child = spawnNext(port);
  child.on("error", (err) => {
    console.error("[zoveto-website] Failed to spawn Next:", err);
    process.exit(1);
  });
  child.on("exit", (code, signal) => {
    if (signal) process.exit(1);
    process.exit(code === null ? 1 : code);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
