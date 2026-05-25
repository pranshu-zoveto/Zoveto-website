"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { z } from "zod";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
}

const ruleSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  enabled: z.boolean(),
  cooldownMinutes: z.number().int().min(1),
  threshold: z.string().optional(),
});

export async function saveAlertRule(fd: FormData) {
  try {
    await checkAuth();
    const data = ruleSchema.parse({
      id: fd.get("id") || undefined,
      type: fd.get("type"),
      enabled: fd.get("enabled") === "true",
      cooldownMinutes: parseInt(fd.get("cooldownMinutes") as string, 10),
      threshold: fd.get("threshold"),
    });

    let thresholdJson = {};
    if (data.threshold) {
      try { thresholdJson = JSON.parse(data.threshold); } catch(e) {}
    }

    if (data.id) {
      await prisma.alertRule.update({
        where: { id: data.id },
        data: { enabled: data.enabled, cooldownMinutes: data.cooldownMinutes, threshold: thresholdJson }
      });
    } else {
      await prisma.alertRule.create({
        data: {
          type: data.type,
          enabled: data.enabled,
          cooldownMinutes: data.cooldownMinutes,
          threshold: thresholdJson
        }
      });
    }

    revalidatePath("/dashboard/alerts");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function markAlertRead(alertId: string) {
  try {
    await checkAuth();
    await prisma.alertHistory.update({
      where: { id: alertId },
      data: { status: "READ" }
    });
    revalidatePath("/dashboard/alerts");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

const targetSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  destination: z.string().url().or(z.string().email()),
  enabled: z.boolean(),
});

export async function saveNotificationTarget(fd: FormData) {
  try {
    await checkAuth();
    const data = targetSchema.parse({
      id: fd.get("id") || undefined,
      type: fd.get("type"),
      destination: fd.get("destination"),
      enabled: fd.get("enabled") === "true",
    });

    if (data.id) {
      await prisma.notificationTarget.update({
        where: { id: data.id },
        data: { enabled: data.enabled, destination: data.destination }
      });
    } else {
      await prisma.notificationTarget.create({
        data: {
          type: data.type,
          destination: data.destination,
          enabled: data.enabled,
        }
      });
    }

    revalidatePath("/dashboard/alerts");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteNotificationTarget(targetId: string) {
  try {
    await checkAuth();
    await prisma.notificationTarget.delete({ where: { id: targetId } });
    revalidatePath("/dashboard/alerts");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
