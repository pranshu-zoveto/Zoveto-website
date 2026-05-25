import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { exchangeCodeForTokens, saveGoogleTokens } from "@/lib/integrations/google-analytics";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const baseUrl = req.nextUrl.origin || process.env.APP_BASE_URL || siteUrl();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.redirect(`${baseUrl}/dashboard/login?error=Unauthorized`);
    }

    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("OAuth error returned from Google:", error);
      return NextResponse.redirect(`${baseUrl}/dashboard/integrations/google?error=access_denied`);
    }

    if (!code) {
      return NextResponse.redirect(`${baseUrl}/dashboard/integrations/google?error=missing_code`);
    }

    const tokens = await exchangeCodeForTokens(code);
    await saveGoogleTokens(tokens);

    return NextResponse.redirect(`${baseUrl}/dashboard/integrations/google?success=true`);
  } catch (error) {
    console.error("Error in Google OAuth Callback", error);
    return NextResponse.redirect(`${baseUrl}/dashboard/integrations/google?error=server_error`);
  }
}
