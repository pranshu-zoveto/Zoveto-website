import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { userAgent } from "next/server";

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    let parsedBody: Record<string, any> = {};
    try {
      parsedBody = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { eventName, sessionId, ...metadata } = parsedBody;

    if (!eventName || typeof eventName !== "string") {
      return NextResponse.json({ error: "eventName is required" }, { status: 400 });
    }

    // Extract standardized fields
    const pageUrl = metadata.page_location || metadata.pageUrl || null;
    const pagePath = metadata.page_path || metadata.pagePath || null;
    const utmSource = metadata.utm_source || null;
    const utmMedium = metadata.utm_medium || null;
    const utmCampaign = metadata.utm_campaign || null;

    // Parse device from user agent
    const { device } = userAgent(req);
    let deviceType = "desktop";
    if (device.type === "mobile") deviceType = "mobile";
    else if (device.type === "tablet") deviceType = "tablet";

    // Clean metadata to exclude explicitly extracted fields
    const cleanMetadata = { ...metadata };
    delete cleanMetadata.page_location;
    delete cleanMetadata.page_path;
    delete cleanMetadata.utm_source;
    delete cleanMetadata.utm_medium;
    delete cleanMetadata.utm_campaign;

    // Store event in Prisma
    await prisma.trackingEvent.create({
      data: {
        eventName,
        sessionId: typeof sessionId === "string" ? sessionId : null,
        pageUrl: typeof pageUrl === "string" ? pageUrl : null,
        pagePath: typeof pagePath === "string" ? pagePath : null,
        utmSource: typeof utmSource === "string" ? utmSource : null,
        utmMedium: typeof utmMedium === "string" ? utmMedium : null,
        utmCampaign: typeof utmCampaign === "string" ? utmCampaign : null,
        device: deviceType,
        metadata: Object.keys(cleanMetadata).length > 0 ? cleanMetadata : null,
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[api/track] Error storing event:", err);
    // Return 200 anyway so client doesn't retry/spam
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
