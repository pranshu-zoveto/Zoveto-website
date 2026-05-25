import { OAuth2Client } from "google-auth-library";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import prisma from "@/lib/db";
import { encrypt, decrypt } from "@/lib/encryption";
import { siteUrl } from "@/lib/site";

const SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/webmasters.readonly"
];

export function getGoogleOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const baseUrl = process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || siteUrl();
  const redirectUri = `${baseUrl}/api/integrations/google/callback`;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Google OAuth credentials in environment variables.");
  }

  return new OAuth2Client(clientId, clientSecret, redirectUri);
}

export function getGoogleAuthUrl() {
  const client = getGoogleOAuthClient();
  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // Force consent to ensure we get a refresh token
    scope: SCOPES,
  });
}

export async function exchangeCodeForTokens(code: string) {
  const client = getGoogleOAuthClient();
  const { tokens } = await client.getToken(code);
  return tokens;
}

export async function saveGoogleTokens(tokens: any) {
  if (!tokens.access_token) throw new Error("No access token provided");

  const expiryDate = tokens.expiry_date ? new Date(tokens.expiry_date) : null;

  await prisma.integration.upsert({
    where: { provider: "google" },
    update: {
      accessToken: encrypt(tokens.access_token),
      ...(tokens.refresh_token && { refreshToken: encrypt(tokens.refresh_token) }),
      expiryDate,
      status: "active",
    },
    create: {
      provider: "google",
      accessToken: encrypt(tokens.access_token),
      refreshToken: tokens.refresh_token ? encrypt(tokens.refresh_token) : null,
      expiryDate,
      status: "active",
    },
  });
}

export async function getValidGoogleAccessToken(): Promise<string> {
  const integration = await prisma.integration.findUnique({
    where: { provider: "google" },
  });

  if (!integration || integration.status !== "active") {
    throw new Error("Google integration is not connected.");
  }

  let accessToken = decrypt(integration.accessToken);

  // Check expiration (with a 5-minute buffer)
  if (integration.expiryDate && new Date(integration.expiryDate).getTime() < Date.now() + 5 * 60 * 1000) {
    if (!integration.refreshToken) {
      await prisma.integration.update({
        where: { provider: "google" },
        data: { status: "disconnected" },
      });
      throw new Error("Google token expired and no refresh token is available.");
    }

    try {
      const client = getGoogleOAuthClient();
      client.setCredentials({ refresh_token: decrypt(integration.refreshToken) });
      const { credentials } = await client.refreshAccessToken();

      accessToken = credentials.access_token!;

      await prisma.integration.update({
        where: { provider: "google" },
        data: {
          accessToken: encrypt(accessToken),
          expiryDate: credentials.expiry_date ? new Date(credentials.expiry_date) : null,
        },
      });
    } catch (error) {
      console.error("Failed to refresh Google token", error);
      await prisma.integration.update({
        where: { provider: "google" },
        data: { status: "error" },
      });
      throw new Error("Failed to refresh Google token.");
    }
  }

  return accessToken;
}

export async function getGoogleAuthClient(): Promise<OAuth2Client> {
  const token = await getValidGoogleAccessToken();
  const authClient = getGoogleOAuthClient();
  authClient.setCredentials({ access_token: token });
  return authClient;
}

export async function getAnalyticsDataClient() {
  const authClient = await getGoogleAuthClient();
  return new BetaAnalyticsDataClient({ authClient });
}
