import { NextRequest, NextResponse } from "next/server";
import {
  cosServerApiBase,
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

    const res = await fetch(`${cosServerApiBase()}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...cosWebsiteContactHeaders(),
      },
      body: JSON.stringify(leadPayload),
    });

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
