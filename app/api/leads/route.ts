import { NextResponse } from "next/server";
import { buildLeadSmtpPayload } from "@/lib/lead-intake-mail";
import { sendFormNotificationEmail } from "@/lib/server-mail";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    let parsedBody: Record<string, unknown> = {};
    try {
      parsedBody = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      // Ignored
    }

    let fullName = "Unknown";
    if (typeof parsedBody.fullName === "string") fullName = parsedBody.fullName;
    else if (typeof parsedBody.firstName === "string") fullName = parsedBody.firstName;
    else if (typeof parsedBody.name === "string") fullName = parsedBody.name;

    const email = typeof parsedBody.email === "string" ? parsedBody.email : "unknown@example.com";
    const company = typeof parsedBody.company === "string" ? parsedBody.company : typeof parsedBody.organization === "string" ? parsedBody.organization : null;
    const intent = typeof parsedBody.painPoint === "string" ? parsedBody.painPoint : typeof parsedBody.message === "string" ? parsedBody.message : typeof parsedBody.intent === "string" ? parsedBody.intent : null;

    // --- PRISMA DATABASE INJECTION ---
    if (email && email !== "unknown@example.com") {
      await prisma.lead.create({
        data: {
          name: fullName,
          email: email,
          company: company,
          intent: intent,
        }
      });
    }

    const smtpPayload = buildLeadSmtpPayload(parsedBody);
    if (smtpPayload) {
      try {
        await sendFormNotificationEmail({
          subject: smtpPayload.subject,
          replyTo: smtpPayload.replyTo,
          text: smtpPayload.text,
        });
      } catch (err) {
        console.warn("SMTP failed, but lead saved in db", err);
      }
    }

    return NextResponse.json(
      {
        id: `db:${Date.now()}`,
        message: "Thanks, we received your details and notified info@zoveto.com.",
      },
      { status: 200 },
    );

  } catch (err) {
    console.error("[leads] unexpected error", err);
    return NextResponse.json({ message: "Lead submission failed." }, { status: 502 });
  }
}
