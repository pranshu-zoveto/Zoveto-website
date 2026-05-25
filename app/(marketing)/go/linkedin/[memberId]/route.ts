import { NextResponse, type NextRequest } from "next/server";
import { getTeamMember, isAllowedLinkedInProfileUrl } from "@/lib/team";
import { siteUrl } from "@/lib/site";

/**
 * Branded outbound redirect for team LinkedIn CTAs (`/go/linkedin/{memberId}`).
 * Destination is configured per member in `lib/team.ts` (`linkedinUrl`).
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ memberId: string }> },
): Promise<NextResponse> {
  const { memberId } = await context.params;
  const member = getTeamMember(memberId);
  const raw = member?.linkedinUrl?.trim();
  if (!raw || !isAllowedLinkedInProfileUrl(raw)) {
    return NextResponse.redirect(new URL("/team", siteUrl()), 307);
  }
  return NextResponse.redirect(raw, 307);
}
