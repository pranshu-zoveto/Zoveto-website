import { NextResponse } from "next/server";
import {
  resolveCosApiBase,
  cosWebsiteContactHeaders,
  stripForbiddenCosContactFields,
} from "@/lib/cos-forward";
import { buildLeadSmtpPayload } from "@/lib/lead-intake-mail";
import { readResponseJsonUnknown } from "@/lib/http-json";
import { sendFormNotificationEmail } from "@/lib/server-mail";

const mailSuccessResponse = () =>
  NextResponse.json(
    {
      id: `email:${Date.now()}`,
      message: "Thanks — we received your details and notified info@zoveto.com.",
    },
    { status: 200 },
  );

/** Browser-safe proxy → COS POST /api/leads (adds optional contact secret server-side). Mirrors contact/demo: SMTP to info@zoveto.com first, then COS. */
export async function POST(req: Request) {
  try {
    const raw = await req.text();
    let bodyForCos = raw;
    let parsedBody: Record<string, unknown> = {};
    try {
      parsedBody = JSON.parse(raw) as Record<string, unknown>;
      bodyForCos = JSON.stringify(stripForbiddenCosContactFields(parsedBody));
    } catch {
      // Non-JSON body: forward as-is to COS only (no SMTP extraction).
    }

    const smtpPayload = buildLeadSmtpPayload(parsedBody);
    const emailResult = smtpPayload
      ? await sendFormNotificationEmail({
          subject: smtpPayload.subject,
          replyTo: smtpPayload.replyTo,
          text: smtpPayload.text,
        })
      : { sent: false as const, reason: "no subscriber email in JSON body" };

    const cosBase = resolveCosApiBase();
    if (!cosBase) {
      if (emailResult.sent) {
        return mailSuccessResponse();
      }
      return NextResponse.json(
        {
          message:
            "Lead intake is not configured. Set COS_API_BASE_URL (server env in Vercel) or configure SMTP (MAIL_FROM, SMTP_*) so we can notify info@zoveto.com, then redeploy.",
        },
        { status: 503 },
      );
    }

    let res: Response;
    try {
      res = await fetch(`${cosBase}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...cosWebsiteContactHeaders(),
        },
        body: bodyForCos,
      });
    } catch (err) {
      console.error("[leads] COS /leads fetch failed", err);
      if (emailResult.sent) {
        return mailSuccessResponse();
      }
      return NextResponse.json(
        {
          message:
            "Lead submission failed. COS is unreachable and outbound mail is not configured (set SMTP_* and MAIL_FROM, or fix COS_API_BASE_URL).",
        },
        { status: 502 },
      );
    }

    const json = await readResponseJsonUnknown(res);
    if (!res.ok && emailResult.sent) {
      return mailSuccessResponse();
    }
    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.error("[leads] unexpected error", err);
    return NextResponse.json({ message: "Lead submission failed." }, { status: 502 });
  }
}
