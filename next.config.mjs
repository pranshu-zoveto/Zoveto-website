/** @type {import('next').NextConfig} */
function buildContentSecurityPolicy(isDev) {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://va.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    `connect-src 'self' https://api.zoveto.com https://*.zoveto.com https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://*.clarity.ms https://www.clarity.ms https://va.vercel-scripts.com https://vercel-insights.com${isDev ? " http://localhost:* ws://localhost:* wss://localhost:*" : ""}`,
    "frame-ancestors 'none'",
  ].join("; ");
}

const nextConfig = {
  // Windows hosts can lock `.next/trace` (EPERM). Use an isolated dev dist dir.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  output: "standalone",

  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-dialog", "framer-motion"],
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

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/case-studies",
        destination: "/operational-proof",
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
        destination: process.env.NEXT_PUBLIC_COS_APP_URL ?? "https://app.zoveto.com",
        permanent: false,
      },
      {
        source: "/login",
        destination: `${process.env.NEXT_PUBLIC_COS_APP_URL ?? "https://app.zoveto.com"}/login`,
        permanent: false,
      },
    ];
  },

  poweredByHeader: false,
};

export default nextConfig;
