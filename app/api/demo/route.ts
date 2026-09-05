import { NextResponse } from "next/server";
import { sendFormNotificationEmail } from "@/lib/server-mail";
import prisma from "@/lib/db";
import {
  asTrimmedString,
  buildDemoIntent,
  buildDemoNotificationEmail,
  parseCompanyType,
  parseEmployeeBand,
  parseRole,
  parseTimeline,
  parseUtmFromBody,
  scoreDemoLead,
} from "@/lib/demo-lead";

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    let parsedBody: Record<string, unknown> = {};
    try {
      parsedBody = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      // Ignored
    }

    const email = asTrimmedString(parsedBody.email);
    const fullName = asTrimmedString(parsedBody.fullName);
    const company =
      asTrimmedString(parsedBody.organization) || asTrimmedString(parsedBody.company) || "Demo request";
    const phone = asTrimmedString(parsedBody.phone);
    const preferredDate = asTrimmedString(parsedBody.preferredDate);
    const preferredTime = asTrimmedString(parsedBody.preferredTime);
    const message = asTrimmedString(parsedBody.message);

    if (!fullName || !email.includes("@")) {
      return NextResponse.json({ message: "Name and work email are required." }, { status: 400 });
    }

    const companyType =
      parseCompanyType(parsedBody.companyType) ?? parseCompanyType(parsedBody.industry);
    const employeeBand =
      parseEmployeeBand(parsedBody.employeeBand) ?? parseEmployeeBand(parsedBody.companySize);
    const role = parseRole(parsedBody.role);
    const timeline = parseTimeline(parsedBody.timeline);
    const utm = parseUtmFromBody(parsedBody);
    const sourceUrl = asTrimmedString(parsedBody.sourceUrl).slice(0, 500) || null;
    const referrer = req.headers.get("referer")?.slice(0, 500) || null;
    const intent = buildDemoIntent({ preferredDate, preferredTime, message });
    const score = scoreDemoLead({ role, timeline });
    const submittedAt = new Date();

    await prisma.lead.create({
      data: {
        name: fullName,
        email,
        company,
        phone: phone || null,
        intent,
        companyType,
        employeeBand,
        role,
        timeline,
        score,
        sourceUrl,
        referrer,
        utmSource: utm.utmSource,
        utmMedium: utm.utmMedium,
        utmCampaign: utm.utmCampaign,
        utmTerm: utm.utmTerm,
        utmContent: utm.utmContent,
      },
    });

    const mail = buildDemoNotificationEmail({
      fullName,
      email,
      phone,
      company,
      companyType,
      employeeBand,
      role,
      timeline,
      preferredDate,
      preferredTime,
      message,
      utmSource: utm.utmSource,
      utmCampaign: utm.utmCampaign,
      submittedAt,
    });

    const mailResult = await sendFormNotificationEmail({
      subject: mail.subject,
      replyTo: email,
      text: mail.text,
    });
    if (!mailResult.sent) {
      console.error(
        "[zoveto] Demo lead saved in CRM but staff email was not sent:",
        mailResult.reason ?? "unknown",
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Demo request received and saved successfully. We will confirm by email.",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Demo booking failed", err);
    return NextResponse.json({ message: "Demo booking failed." }, { status: 502 });
  }
}
