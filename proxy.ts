import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getRequestIp,
  isApiRateLimitDisabled,
  slidingWindowHit,
  type SlidingWindowState,
} from "@/lib/rate-limit";

/**
 * Per-instance sliding-window limits for public API routes.
 * Multi-region/serverless: limits are per isolate only; use Upstash Redis / Vercel KV for shared quotas.
 * Disable locally or for debugging: API_RATE_LIMIT_DISABLED=1 or DISABLE_API_RATE_LIMIT=1
 */
const buckets = new Map<string, SlidingWindowState>();
const MAX_BUCKETS = 20_000;

type RouteRule = {
  id: string;
  windowMs: number;
  max: number;
  methods: string[];
};

const API_RULES: Record<string, RouteRule> = {
  "/api/v1/health": { id: "health", windowMs: 60_000, max: 120, methods: ["GET", "HEAD"] },
  "/api/contact": { id: "contact", windowMs: 15 * 60_000, max: 12, methods: ["POST"] },
  "/api/signup": { id: "signup", windowMs: 15 * 60_000, max: 12, methods: ["POST"] },
  "/api/leads": { id: "leads", windowMs: 15 * 60_000, max: 20, methods: ["POST"] },
  "/api/demo": { id: "demo", windowMs: 15 * 60_000, max: 12, methods: ["POST"] },
};

function bucketKey(ip: string, routeId: string): string {
  return `${ip}::${routeId}`;
}

function getBucket(key: string): SlidingWindowState {
  let b = buckets.get(key);
  if (!b) {
    if (buckets.size >= MAX_BUCKETS) {
      buckets.clear();
    }
    b = { hits: [] };
    buckets.set(key, b);
  }
  return b;
}

function ruleFor(pathname: string, method: string): RouteRule | null {
  const rule = API_RULES[pathname];
  if (!rule) return null;
  if (!rule.methods.includes(method)) return null;
  return rule;
}

function canonicalHostRedirect(request: NextRequest): NextResponse | null {
  const hostHeader = request.headers.get("host");
  if (!hostHeader) return null;

  const host = hostHeader.split(":")[0]?.toLowerCase();
  if (host === "www.zoveto.com") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = "zoveto.com";
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = request.nextUrl;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  return null;
}

export function proxy(request: NextRequest) {
  const canonical = canonicalHostRedirect(request);
  if (canonical) return canonical;

  // Basic Auth for Dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const basicAuth = request.headers.get('authorization');
    let isAuthenticated = false;

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      const expectedUser = process.env.ADMIN_EMAIL;
      const expectedPwd = process.env.ADMIN_PASSWORD;

      if (user === expectedUser && pwd === expectedPwd) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Dashboard"',
        },
      });
    }
  }

  if (isApiRateLimitDisabled()) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  const method = request.method.toUpperCase();
  const rule = ruleFor(pathname, method);
  if (!rule) {
    return NextResponse.next();
  }

  const ip = getRequestIp(request.headers);
  const key = bucketKey(ip, rule.id);
  const bucket = getBucket(key);
  const now = Date.now();
  const result = slidingWindowHit(bucket, now, rule.windowMs, rule.max);

  if (!result.ok) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(result.retryAfterSec),
          "Cache-Control": "no-store",
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
