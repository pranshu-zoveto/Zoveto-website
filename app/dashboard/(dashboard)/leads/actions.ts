"use server";

/**
 * app/dashboard/(dashboard)/leads/actions.ts
 *
 * All server-side mutations for the Leads CRM.
 * Every action validates with Zod, guards with NextAuth, and revalidates
 * only the affected paths.
 */

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import prisma from "@/lib/db";

// ─── Auth guard ───────────────────────────────────────────────────────────────

async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  return session;
}

// ─── Zod schemas ─────────────────────────────────────────────────────────────

import { LEAD_STATUSES } from "./types";

const UpdateStatusSchema = z.object({
  leadId: z.string().cuid(),
  toStatus: z.enum(LEAD_STATUSES),
  note: z.string().max(1000).optional(),
});

const UpdateNotesSchema = z.object({
  leadId: z.string().cuid(),
  notes: z.string().max(4000),
});

const UpdateScoreSchema = z.object({
  leadId: z.string().cuid(),
  score: z.number().int().min(0).max(100),
});

const DeleteLeadSchema = z.object({
  leadId: z.string().cuid(),
});

// ─── Actions ─────────────────────────────────────────────────────────────────

/** Update lead status and record a status history event. */
export async function updateLeadStatus(formData: FormData): Promise<{ error?: string }> {
  try {
    await requireSession();

    const parsed = UpdateStatusSchema.safeParse({
      leadId: formData.get("leadId"),
      toStatus: formData.get("toStatus"),
      note: formData.get("note") ?? undefined,
    });

    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const { leadId, toStatus, note } = parsed.data;

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: { status: true, respondedAt: true },
    });

    if (!lead) return { error: "Lead not found" };

    const wasNew = lead.status === "NEW";
    const respondedAt = wasNew && toStatus !== "NEW" && !lead.respondedAt
      ? new Date()
      : lead.respondedAt;

    await prisma.$transaction([
      prisma.lead.update({
        where: { id: leadId },
        data: { status: toStatus, respondedAt },
      }),
      prisma.leadStatusEvent.create({
        data: {
          leadId,
          fromStatus: lead.status,
          toStatus,
          note: note ?? null,
        },
      }),
    ]);

    revalidatePath("/dashboard/leads");
    revalidatePath("/dashboard");
    return {};
  } catch (err) {
    console.error("[updateLeadStatus]", err);
    return { error: "Failed to update status" };
  }
}

/** Save internal notes on a lead. */
export async function updateLeadNotes(formData: FormData): Promise<{ error?: string }> {
  try {
    await requireSession();

    const parsed = UpdateNotesSchema.safeParse({
      leadId: formData.get("leadId"),
      notes: formData.get("notes"),
    });

    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const { leadId, notes } = parsed.data;
    await prisma.lead.update({
      where: { id: leadId },
      data: { notes },
    });

    revalidatePath("/dashboard/leads");
    return {};
  } catch (err) {
    console.error("[updateLeadNotes]", err);
    return { error: "Failed to save notes" };
  }
}

/** Update the lead quality score (0–100). */
export async function updateLeadScore(formData: FormData): Promise<{ error?: string }> {
  try {
    await requireSession();

    const parsed = UpdateScoreSchema.safeParse({
      leadId: formData.get("leadId"),
      score: Number(formData.get("score")),
    });

    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const { leadId, score } = parsed.data;
    await prisma.lead.update({
      where: { id: leadId },
      data: { score },
    });

    revalidatePath("/dashboard/leads");
    return {};
  } catch (err) {
    console.error("[updateLeadScore]", err);
    return { error: "Failed to update score" };
  }
}

/** Delete a single lead and all its status history. */
export async function deleteLead(formData: FormData): Promise<{ error?: string }> {
  try {
    await requireSession();

    const parsed = DeleteLeadSchema.safeParse({ leadId: formData.get("leadId") });

    if (!parsed.success) {
      return { error: "Invalid lead ID" };
    }

    await prisma.lead.delete({ where: { id: parsed.data.leadId } });

    revalidatePath("/dashboard/leads");
    revalidatePath("/dashboard");
    return {};
  } catch (err) {
    console.error("[deleteLead]", err);
    return { error: "Failed to delete lead" };
  }
}
