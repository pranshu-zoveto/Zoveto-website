import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ga4AnalyticsProvider } from "@/lib/analytics/providers/ga4-provider";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const range = (searchParams.get("range") || "30d") as any;

    const report = await ga4AnalyticsProvider.fetchReport(range);
    
    return NextResponse.json({
      topLandingPages: report.topLandingPages,
      topExitPages: report.topExitPages,
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
