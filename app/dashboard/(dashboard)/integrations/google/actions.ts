"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function disconnectGoogle() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  await prisma.integration.update({
    where: { provider: "google" },
    data: {
      accessToken: "",
      refreshToken: null,
      expiryDate: null,
      status: "disconnected",
    },
  });

  revalidatePath("/dashboard/integrations/google");
  revalidatePath("/dashboard/traffic");
  revalidatePath("/dashboard/seo");
}
