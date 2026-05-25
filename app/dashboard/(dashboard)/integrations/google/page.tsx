import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { GoogleIntegrationClient } from "./GoogleIntegrationClient";

export const dynamic = "force-dynamic";

export default async function GoogleIntegrationPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login");
  }

  const { error, success } = await searchParams;

  const integration = await prisma.integration.findUnique({
    where: { provider: "google" },
  });

  const isConnected = integration?.status === "active";
  const updatedAt = integration?.updatedAt ? integration.updatedAt.toISOString() : null;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Google Services Integration</h1>
        <p className="text-sm text-gray-500 mt-1">
          Connect your Google account to fetch live traffic and search performance data.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          Failed to connect: {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          Successfully connected Google!
        </div>
      )}

      <GoogleIntegrationClient 
        isConnected={isConnected} 
        updatedAt={updatedAt} 
      />
    </div>
  );
}
