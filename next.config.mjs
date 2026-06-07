/** @type {import('next').NextConfig} */
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * In dev, `next dev` blocks `/_next/*` requests coming from any origin that
 * isn't `localhost`. When you load the dev server from a phone on the same
 * Wi-Fi (e.g. http://192.168.1.4:3002), JS chunks and the webpack-hmr socket
 * are rejected and the page renders without working buttons.
 *
 * We auto-discover every local IPv4 address on the host so any LAN device
 * (phone, tablet, second laptop) can hit the dev server without manual
 * config changes when the DHCP lease shifts. Production is unaffected —
 * `allowedDevOrigins` is only read by `next dev`.
 */
function getLocalLanOrigins() {
  const origins = new Set();
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] ?? []) {
      if (iface.family === "IPv4" && !iface.internal) {
        origins.add(iface.address);
      }
    }
  }
  return Array.from(origins);
}

function buildContentSecurityPolicy(isDev) {
  // In dev, allow http/ws to any host:port so LAN devices (phone, tablet)
  // can reach the webpack-hmr socket + dev chunks. Production stays strict.
  const devConnect = isDev
    ? " http://*:* ws://*:* wss://*:* http://localhost:* ws://localhost:* wss://localhost:*"
    : "";
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://*.posthog.com https://va.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "worker-src 'self' blob:",
    `connect-src 'self' https://api.zoveto.com https://*.zoveto.com https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://*.clarity.ms https://www.clarity.ms https://*.posthog.com https://*.i.posthog.com https://*.ingest.sentry.io https://*.sentry.io https://vitals.vercel-insights.com https://va.vercel-scripts.com${devConnect}`,
    "frame-ancestors 'none'",
  ].join("; ");
}

const nextConfig = {
  // Windows hosts can lock `.next/trace` (EPERM). Use an isolated dev dist dir.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  output: "standalone",
  trailingSlash: false,

  // Allow LAN devices (phones, tablets) to load /_next/* in dev.
  allowedDevOrigins: getLocalLanOrigins(),

  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-dialog", "framer-motion", "posthog-js"],
  },

  // Next 16: default `next build` may use Turbopack; this repo still defines `webpack()` for prod cache + dev HMR.
  // Empty config acknowledges Turbopack when used; `npm run build` passes `--webpack` for predictable webpack builds.
  turbopack: {},

  // PRODUCTION: strict TypeScript. ESLint during `next build` is configured outside next.config in Next.js 16+ (run `npm run lint` in CI).
  typescript: { ignoreBuildErrors: false },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dnldtmbg5/image/upload/**",
      },
    ],
  },

  webpack: (config, { dev }) => {
    // Windows ARM64 can throw EISDIR on readlink for regular files during module resolution.
    // Disabling symlink resolution avoids the readlink path and keeps webpack builds stable.
    config.resolve = config.resolve || {};
    config.resolve.symlinks = false;

    // No Prisma in this app; `@sentry/node` still requires Prisma tracing, which pulls
    // `@prisma/instrumentation` → noisy webpack "Critical dependency" + slower instrumentation compile.
    // We skip `withSentryConfig`, so Sentry's built-in ignoreWarnings for this path never runs — alias fixes both.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@prisma/instrumentation": path.join(__dirname, "scripts/shims/prisma-instrumentation-stub.cjs"),
    };

    const sentryOtelWarningFilter = (warning, compilation) => {
      try {
        if (!warning.module) return false;
        const id = warning.module.readableIdentifier(compilation.requestShortener);
        const noisy =
          /@opentelemetry\/instrumentation/.test(id) ||
          /@prisma\/instrumentation/.test(id) ||
          /require-in-the-middle/.test(id);
        return noisy && /Critical dependency/.test(warning.message);
      } catch {
        return false;
      }
    };
    const extraIgnores = [
      sentryOtelWarningFilter,
      { module: /@opentelemetry\/instrumentation/, message: /Critical dependency/ },
      { module: /@prisma\/instrumentation/, message: /Critical dependency/ },
      { module: /require-in-the-middle/, message: /Critical dependency/ },
    ];
    if (config.ignoreWarnings === undefined) {
      config.ignoreWarnings = extraIgnores;
    } else if (Array.isArray(config.ignoreWarnings)) {
      config.ignoreWarnings.push(...extraIgnores);
    }

    // Production: cold cache (CI-friendly).
    if (!dev) {
      config.cache = false;
    }
    // Dev on Windows: default filesystem pack cache often spams
    // "Unable to snapshot resolve dependencies" and can flake HMR. Memory cache avoids PackFileCacheStrategy.
    // Opt back into FS cache: `NEXT_WEBPACK_FS_CACHE=1 npm run dev`
    if (dev && process.platform === "win32" && process.env.NEXT_WEBPACK_FS_CACHE !== "1") {
      config.cache = { type: "memory" };
    }
    // Reliable HMR on Windows / Docker / network FS (EPERM, missed events).
    if (dev) {
      const usePoll =
        process.env.NEXT_DEV_POLL === "1" ||
        process.env.WATCHPACK_POLLING === "true" ||
        process.env.CHOKIDAR_USEPOLLING === "true" ||
        process.platform === "win32";
      config.watchOptions = {
        ...(config.watchOptions || {}),
        aggregateTimeout: 300,
        ignored: /node_modules|\.git/,
        ...(usePoll ? { poll: 1000 } : {}),
      };
    }
    return config;
  },

  // Security headers (HSTS only on Vercel prod deploys — avoids HSTS on local `next start` over HTTP)
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    const hstsOn =
      process.env.VERCEL === "1" &&
      process.env.NODE_ENV === "production" &&
      process.env.DISABLE_HSTS !== "1";

    const hstsParts = ["max-age=63072000"];
    if (process.env.HSTS_INCLUDE_SUBDOMAINS !== "0") {
      hstsParts.push("includeSubDomains");
    }
    if (process.env.HSTS_PRELOAD === "1") {
      hstsParts.push("preload");
    }

    const securityHeaders = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "X-DNS-Prefetch-Control", value: "off" },
      {
        key: "Content-Security-Policy",
        value: buildContentSecurityPolicy(isDev),
      },
    ];

    if (hstsOn) {
      securityHeaders.unshift({
        key: "Strict-Transport-Security",
        value: hstsParts.join("; "),
      });
    }

    if (isDev) {
      securityHeaders.push(
        { key: "Cache-Control", value: "no-store, must-revalidate" },
        { key: "Pragma", value: "no-cache" },
      );
    }

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Redirects
  async redirects() {
    const cosApp = process.env.NEXT_PUBLIC_COS_APP_URL ?? "https://app.zoveto.com";
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.zoveto.com" }],
        destination: "https://zoveto.com/:path*",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/operational-proof",
        permanent: true,
      },
      {
        source: "/blog/how-to-replace-excel-with-erp",
        destination: "/migrate-from-excel",
        permanent: true,
      },
      {
        source: "/blog/erp-software-for-distributors-guide",
        destination: "/erp-software-distributors-india",
        permanent: true,
      },
      {
        source: "/blog/erp-cost-in-india",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/blog/how-to-automate-invoice-generation",
        destination: "/gst-billing-software-india",
        permanent: true,
      },
      {
        source: "/blog/manufacturing-erp-software-checklist",
        destination: "/industries/manufacturing",
        permanent: true,
      },
      {
        source: "/blog/excel-inventory-problems",
        destination: "/inventory-management-software-india",
        permanent: true,
      },
      {
        source: "/blog/erp-crm-wms-one-platform",
        destination: "/company-operating-system-india",
        permanent: true,
      },
      {
        source: "/blog/ai-agents-for-inventory-management",
        destination: "/ai-business-automation-india",
        permanent: true,
      },
      {
        source: "/blog/best-erp-software-comparison-india",
        destination: "/compare",
        permanent: true,
      },
      {
        source: "/modules/hr",
        destination: "/modules/hrms",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/app",
        destination: cosApp,
        permanent: true,
      },
      {
        source: "/login",
        destination: `${cosApp.replace(/\/$/, "")}/login`,
        permanent: true,
      },
    ];
  },

  poweredByHeader: false,
};

export default nextConfig;
