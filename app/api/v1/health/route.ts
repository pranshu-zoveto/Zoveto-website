import { NextResponse } from "next/server";

/** Used by BOS agents (`WEBSITE_API_URL` + `/health`) and load balancers. */
export async function GET() {
  return NextResponse.json(
    { status: "ok", service: "zoveto-website", ts: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
