import { NextResponse } from "next/server";
import {
  resolveCosApiBase,
  cosWebsiteContactHeaders,
  stripForbiddenCosContactFields,
} from "@/lib/cos-forward";
import { readResponseJsonUnknown } from "@/lib/http-json";
import { sendFormNotificationEmail } from "@/lib/server-mail";

/** Browser-safe proxy → COS POST /api/demo */
export async function POST(req: Request) {
  try {
    const raw = await req.text();
    let body = raw;
    let parsedBody: Record<string, unknown> = {};
    try {
      parsedBody = JSON.parse(raw) as Record<string, unknown>;
      body = JSON.stringify(stripForbiddenCosContactFields(parsedBody));
    } catch {
      // Keep original body if caller sends non-JSON; COS will validate.
    }

    const email = typeof parsedBody.email === "string" ? parsedBody.email.trim() : "";
    const company = typeof parsedBody.organization === "string" ? parsedBody.organization.trim() : "Demo request";
    const fullName = typeof parsedBody.fullName === "string" ? parsedBody.fullName.trim() : "";
    const phone = typeof parsedBody.phone === "string" ? parsedBody.phone.trim() : "";
    const preferredDate = typeof parsedBody.preferredDate === "string" ? parsedBody.preferredDate.trim() : "";
    const preferredTime = typeof parsedBody.preferredTime === "string" ? parsedBody.preferredTime.trim() : "";
    const message = typeof parsedBody.message === "string" ? parsedBody.message.trim() : "";

    const emailResult = await sendFormNotificationEmail({
      subject: `[Website] Demo request — ${company}`,
      replyTo: email || undefined,
      text: [
        "New demo request",
        `Name: ${fullName || "-"}`,
        `Email: ${email || "-"}`,
        `Company: ${company}`,
        `Phone: ${phone || "-"}`,
        `Preferred date: ${preferredDate || "-"}`,
        `Preferred time: ${preferredTime || "-"}`,
        `Message: ${message || "-"}`,
      ].join("\n"),
    });

    const cosBase = resolveCosApiBase();
    if (!cosBase) {
      if (emailResult.sent) {
        return NextResponse.json(
          {
            ok: true,
            message: "Demo request received and sent to info@zoveto.com. We will confirm by email.",
          },
          { status: 200 },
        );
      }
      return NextResponse.json(
        {
          message:
            "Demo request could not be delivered. Add COS_API_BASE_URL or fix SMTP (MAIL_FROM, SMTP_*) in Vercel, then redeploy.",
        },
        { status: 503 },
      );
    }

    let res: Response;
    try {
      res = await fetch(`${cosBase}/demo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...cosWebsiteContactHeaders(),
        },
        body,
      });
    } catch (err) {
      console.error("[demo] COS /demo fetch failed", err);
      if (emailResult.sent) {
        return NextResponse.json(
          {
            ok: true,
            message: "Demo request received and sent to info@zoveto.com. We will confirm by email.",
          },
          { status: 200 },
        );
      }
      return NextResponse.json(
        {
          message:
            "Demo booking failed. Please try again or email info@zoveto.com.",
        },
        { status: 502 },
      );
    }
    const json = await readResponseJsonUnknown(res);
    if (!res.ok && emailResult.sent) {
      return NextResponse.json(
        {
          ok: true,
          message: "Demo request received and sent to info@zoveto.com. We will confirm by email.",
        },
        { status: 200 },
      );
    }
    return NextResponse.json(json, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Demo booking failed." }, { status: 502 });
  }
}
