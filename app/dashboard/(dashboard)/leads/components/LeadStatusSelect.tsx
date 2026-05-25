"use client";

/**
 * LeadStatusSelect — inline status editor with optimistic update.
 * Submits a hidden form via server action. Shows a spinner during transition.
 */

import { useRef, useTransition } from "react";
import { updateLeadStatus } from "../actions";
import type { LeadStatus } from "../types";
import { LEAD_STATUSES } from "../types";

const STATUS_STYLES: Record<LeadStatus, string> = {
  NEW: "border-blue-800 bg-blue-950/40 text-blue-300",
  CONTACTED: "border-yellow-800 bg-yellow-950/40 text-yellow-300",
  QUALIFIED: "border-purple-800 bg-purple-950/40 text-purple-300",
  WON: "border-green-800 bg-green-950/40 text-green-300",
  LOST: "border-zinc-700 bg-zinc-800/60 text-zinc-500",
};

interface Props {
  leadId: string;
  currentStatus: LeadStatus;
}

export function LeadStatusSelect({ leadId, currentStatus }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const fd = new FormData(formRef.current!);
    fd.set("toStatus", e.target.value);
    startTransition(async () => {
      await updateLeadStatus(fd);
    });
  }

  return (
    <form ref={formRef}>
      <input type="hidden" name="leadId" value={leadId} />
      <div className="relative flex items-center gap-1.5">
        <select
          name="toStatus"
          defaultValue={currentStatus}
          onChange={handleChange}
          disabled={isPending}
          className={[
            "cursor-pointer appearance-none rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-all",
            "bg-transparent focus:outline-none focus:ring-1 focus:ring-zinc-600",
            STATUS_STYLES[currentStatus as LeadStatus] ?? STATUS_STYLES.NEW,
            isPending ? "opacity-50" : "",
          ].join(" ")}
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s} className="bg-zinc-900 text-zinc-200">
              {s}
            </option>
          ))}
        </select>
        {isPending && (
          <span className="h-3 w-3 animate-spin rounded-full border border-zinc-600 border-t-zinc-300" />
        )}
      </div>
    </form>
  );
}

/** Badge-only display (no select). */
export function StatusBadge({ status }: { status: string }) {
  const style =
    STATUS_STYLES[status as LeadStatus] ?? "border-zinc-700 bg-zinc-800 text-zinc-400";
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${style}`}>
      {status}
    </span>
  );
}
