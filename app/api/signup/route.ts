import { NextRequest, NextResponse } from "next/server";
import {
  resolveCosApiBase,
  cosWebsiteContactHeaders,
  stripForbiddenCosContactFields,
} from "@/lib/cos-forward";
import {
  buildEarlyAccessLeadPayload,
  hasRequiredEarlyAccessFields,
  normalizeEarlyAccessSignup,
} from "@/lib/early-access";
import { readResponseJsonUnknown } from "@/lib/http-json";
import { sendFormNotificationEmail } from "@/lib/server-mail";

export async function POST(req: NextRequest) {
  try {
    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }
    const input = normalizeEarlyAccessSignup(raw);
    if (!input) {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    if (!hasRequiredEarlyAccessFields(input)) {
      return NextResponse.json(
        { message: "Name, work email, company, role, team size, and operating priority are required." },
        { status: 400 },
      );
    }

    const leadPayload = stripForbiddenCosContactFields(
      buildEarlyAccessLeadPayload(input) as Record<string, unknown>,
    );

    const emailResult = await sendFormNotificationEmail({
      subject: `[Website] Early access request — ${input.companyName || "Unknown company"}`,
      replyTo: input.email,
      text: [
        "New early access request",
        `Name: ${input.fullName}`,
        `Email: ${input.email}`,
        `Company: ${input.companyName}`,
        `Role: ${input.role}`,
        `Team size: ${input.teamSize}`,
        `Operating priority: ${input.useCase}`,
        `Phone: ${input.phone || "-"}`,
      ].join("\n"),
    });

    const cosBase = resolveCosApiBase();
    if (!cosBase) {
      if (emailResult.sent) {
        return NextResponse.json({
          ok: true,
          status: "waitlist_pending",
          message:
            "Your early access request is received and sent to info@zoveto.com. We will email you after founder review.",
        });
      }
      return NextResponse.json(
        {
          message:
            "Early access could not be delivered. Add COS_API_BASE_URL or fix SMTP (MAIL_FROM, SMTP_*) in Vercel, then redeploy.",
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
        body: JSON.stringify(leadPayload),
      });
    } catch (err) {
      // Network / DNS / wrong COS_API_BASE_URL (e.g. still pointing at localhost on Vercel)
      console.error("[signup] COS /leads fetch failed", err);
      if (emailResult.sent) {
        return NextResponse.json({
          ok: true,
          status: "waitlist_pending",
          message:
            "Your early access request is received and sent to info@zoveto.com. We will email you after founder review.",
        });
      }
      return NextResponse.json(
        {
          message:
            "Early access request failed. If this persists, email info@zoveto.com with your company name and work email.",
        },
        { status: 502 },
      );
    }

    const parsed = await readResponseJsonUnknown(res);
    const data: Record<string, unknown> =
      typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {};

    if (!res.ok) {
      if (emailResult.sent) {
        return NextResponse.json({
          ok: true,
          status: "waitlist_pending",
          message:
            "Your early access request is received and sent to info@zoveto.com. We will email you after founder review.",
        });
      }
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json({
      ok: true,
      status: "waitlist_pending",
      message:
        "Your early access request is in the founder review queue. We will email you after qualification.",
      id: data.id,
    });
  } catch {
    return NextResponse.json({ message: "Early access request failed." }, { status: 502 });
  }
}
