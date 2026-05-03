import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

/**
 * One-shot server-side Sentry verification (Vercel Node runtime).
 * POST JSON `{ "secret": "<SENTRY_VERIFY_SECRET>" }` when `SENTRY_VERIFY_SECRET` is set in Production.
 * Returns 404 if unset (no public probe surface). Remove secret after confirming Issues in Sentry.
 */
export async function GET() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function POST(request: Request) {
  const expected = process.env.SENTRY_VERIFY_SECRET?.trim();
  if (!expected) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const secret =
    typeof body === "object" && body !== null && "secret" in body
      ? String((body as { secret?: unknown }).secret ?? "")
      : "";

  if (secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  Sentry.captureException(new Error("Sentry API verification (manual test — zoveto-website)"));

  return NextResponse.json(
    { ok: true, message: "Event sent — check Sentry Issues for this project." },
    { headers: { "Cache-Control": "no-store" } },
  );
}
