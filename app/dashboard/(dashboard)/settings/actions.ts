"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { ALLOWED_SETTINGS } from "./types";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");
  return session.user.email;
}

export async function logAudit(action: string, entity: string, entityId: string | null, oldValue: any, newValue: any, userId: string) {
  await prisma.auditLog.create({
    data: {
      action,
      entity,
      entityId,
      oldValue: oldValue ? JSON.parse(JSON.stringify(oldValue)) : null,
      newValue: newValue ? JSON.parse(JSON.stringify(newValue)) : null,
      userId,
    }
  });
}

export async function updateSetting(key: string, value: string, isSecret: boolean = false) {
  try {
    const userEmail = await checkAuth();
    if (!ALLOWED_SETTINGS.includes(key)) throw new Error("Setting key not allowed");

    const existing = await prisma.systemSetting.findUnique({ where: { key } });
    
    // Mask secrets for audit
    const oldAuditVal = existing ? (existing.isSecret ? "[REDACTED]" : existing.value) : null;
    const newAuditVal = isSecret ? "[REDACTED]" : value;

    await prisma.systemSetting.upsert({
      where: { key },
      update: { value, isSecret, updatedBy: userEmail },
      create: { key, value, isSecret, updatedBy: userEmail },
    });

    await logAudit("UPDATE_SETTING", "SystemSetting", key, oldAuditVal, newAuditVal, userEmail);
    
    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function triggerPasswordResetFlow(email: string) {
  try {
    const userEmail = await checkAuth();
    // In a real app, this would generate a token and send a reset email.
    await logAudit("REQUEST_PASSWORD_RESET", "User", email, null, null, userEmail);
    return { success: true, message: "Password reset instructions sent (Simulated)." };
  } catch (error: any) {
    return { error: error.message };
  }
}
