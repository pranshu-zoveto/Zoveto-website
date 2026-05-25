import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getGoogleAuthUrl } from "@/lib/integrations/google-analytics";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const url = getGoogleAuthUrl();
    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Error generating Google Auth URL", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
