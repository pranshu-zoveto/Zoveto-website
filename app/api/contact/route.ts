import { NextResponse } from "next/server";
import { resolveCosApiBase, cosWebsiteContactHeaders } from "@/lib/cos-forward";
import { readResponseJsonUnknown } from "@/lib/http-json";
import { sendFormNotificationEmail } from "@/lib/server-mail";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

function parseContactPayload(raw: unknown): ContactPayload | null {
  if (typeof raw !== "object" || raw === null) return null;
  const o = raw as Record<string, unknown>;
  const str = (k: string) => (typeof o[k] === "string" ? (o[k] as string) : undefined);
  return { name: str("name"), email: str("email"), company: str("company"), message: str("message") };
}

/** Maps generic contact form → COS POST /api/leads (same pipeline as marketing lead capture). */
export async function POST(request: Request) {
  try {
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }
    const body = parseContactPayload(raw);
    if (!body) {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }
    const name = body.name?.trim();
    const email = body.email?.trim();
    const company = (body.company?.trim() || "Website contact").slice(0, 200);
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ message: "Name, email, and message are required." }, { status: 400 });
    }

    const payload = {
      fullName: name.slice(0, 200),
      email,
      organization: company,
      painPoint: [message, "Source: website_contact", "Notify: info@zoveto.com"].join("\n\n").slice(0, 10000),
    };

    const emailResult = await sendFormNotificationEmail({
      subject: `[Website] Contact request — ${company}`,
      replyTo: email,
      text: [
        "New contact request",
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company}`,
        `Message: ${message}`,
      ].join("\n"),
    });

    const cosBase = resolveCosApiBase();
    if (!cosBase) {
      if (emailResult.sent) {
        return NextResponse.json(
          {
            ok: true,
            message: "Thanks. Your request is received and sent to info@zoveto.com.",
          },
          { status: 200 },
        );
      }
      return NextResponse.json(
        {
          message:
            "Contact could not be delivered. Add COS_API_BASE_URL or fix SMTP (MAIL_FROM, SMTP_*) in Vercel, then redeploy.",
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
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("[contact] COS /leads fetch failed", err);
      if (emailResult.sent) {
        return NextResponse.json(
          {
            ok: true,
            message: "Thanks. Your request is received and sent to info@zoveto.com.",
          },
          { status: 200 },
        );
      }
      return NextResponse.json(
        {
          message:
            "Contact submission failed. Please try again or email info@zoveto.com.",
        },
        { status: 502 },
      );
    }
    const data = await readResponseJsonUnknown(res);
    const id =
      typeof data === "object" && data !== null && "id" in data
        ? (data as Record<string, unknown>).id
        : undefined;
    if (!res.ok) {
      if (emailResult.sent) {
        return NextResponse.json(
          {
            ok: true,
            message: "Thanks. Your request is received and sent to info@zoveto.com.",
          },
          { status: 200 },
        );
      }
      return NextResponse.json(data, { status: res.status });
    }
    return NextResponse.json(
      {
        ok: true,
        message: "Thanks. Your request is received and our team will contact you shortly.",
        id,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ message: "Contact submission failed." }, { status: 502 });
  }
}
