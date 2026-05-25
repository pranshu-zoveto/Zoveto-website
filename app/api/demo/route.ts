import { NextResponse } from "next/server";
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

    const email = typeof parsedBody.email === "string" ? parsedBody.email.trim() : "";
    const company = typeof parsedBody.organization === "string" ? parsedBody.organization.trim() : "Demo request";
    const fullName = typeof parsedBody.fullName === "string" ? parsedBody.fullName.trim() : "";
    const phone = typeof parsedBody.phone === "string" ? parsedBody.phone.trim() : "";
    const preferredDate = typeof parsedBody.preferredDate === "string" ? parsedBody.preferredDate.trim() : "";
    const preferredTime = typeof parsedBody.preferredTime === "string" ? parsedBody.preferredTime.trim() : "";
    const message = typeof parsedBody.message === "string" ? parsedBody.message.trim() : "";

    const fullIntent = [
      "New demo request",
      `Phone: ${phone || "-"}`,
      `Preferred date: ${preferredDate || "-"}`,
      `Preferred time: ${preferredTime || "-"}`,
      `Message: ${message || "-"}`,
    ].join("\n");

    // Save directly to the new Prisma database
    await prisma.lead.create({
      data: {
        name: fullName || "Unknown",
        email: email || "unknown@example.com",
        company: company,
        intent: fullIntent,
      },
    });

    // Attempt to send the email notification as well
    try {
      await sendFormNotificationEmail({
        subject: `[Website] Demo request, ${company}`,
        replyTo: email || undefined,
        text: [
          `Name: ${fullName || "-"}`,
          `Email: ${email || "-"}`,
          `Company: ${company}`,
          fullIntent,
        ].join("\n"),
      });
    } catch (emailErr) {
      console.warn("Failed to send notification email, but lead was saved.", emailErr);
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
