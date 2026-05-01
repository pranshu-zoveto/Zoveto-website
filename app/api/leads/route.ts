import { NextResponse } from "next/server";
import {
  resolveCosApiBase,
  cosWebsiteContactHeaders,
  stripForbiddenCosContactFields,
} from "@/lib/cos-forward";
import { readResponseJsonUnknown } from "@/lib/http-json";

/** Browser-safe proxy → COS POST /api/leads (adds optional contact secret server-side). */
export async function POST(req: Request) {
  try {
    const raw = await req.text();
    let body = raw;
    try {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      body = JSON.stringify(stripForbiddenCosContactFields(parsed));
    } catch {
      // Keep original body if caller sends non-JSON; COS will validate.
    }

    const cosBase = resolveCosApiBase();
    if (!cosBase) {
      return NextResponse.json(
        {
          message:
            "Lead intake is not configured. Set COS_API_BASE_URL (server env in Vercel) to your public COS API base including /api, then redeploy.",
        },
        { status: 503 },
      );
    }

    const res = await fetch(`${cosBase}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...cosWebsiteContactHeaders(),
      },
      body,
    });
    const json = await readResponseJsonUnknown(res);
    return NextResponse.json(json, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Lead submission failed." }, { status: 502 });
  }
}
