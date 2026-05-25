"use client";

/**
 * LeadDrawer — slide-in detail panel with full lead info, notes, and status history.
 * Rendered client-side; data is passed as props from the server page.
 */

import { useTransition, useState, useEffect } from "react";
import {
  X,
  Building2,
  Mail,
  Phone,
  Globe,
  Tag,
  Clock,
  MessageSquare,
  Save,
  Star,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { updateLeadNotes, updateLeadScore, deleteLead, updateLeadStatus } from "../actions";
import { LEAD_STATUSES } from "../types";
import type { LeadStatus } from "../types";
import type { LeadForDrawer } from "../types";

const STATUS_COLORS: Record<string, string> = {
  NEW: "text-blue-400",
  CONTACTED: "text-yellow-400",
  QUALIFIED: "text-purple-400",
  WON: "text-green-400",
  LOST: "text-zinc-500",
};

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-5 gap-2 py-1.5 text-xs">
      <span className="col-span-2 text-zinc-600">{label}</span>
      <span className="col-span-3 break-all text-zinc-300">{value}</span>
    </div>
  );
}

interface Props {
  lead: LeadForDrawer | null;
  onClose: () => void;
}

export function LeadDrawer({ lead, onClose }: Props) {
  const [notes, setNotes] = useState(lead?.notes ?? "");
  const [score, setScore] = useState(lead?.score ?? 0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [isPendingNotes, startNotes] = useTransition();
  const [isPendingScore, startScore] = useTransition();
  const [isPendingStatus, startStatus] = useTransition();
  const [isPendingDelete, startDelete] = useTransition();

  // Sync when lead changes
  useEffect(() => {
    setNotes(lead?.notes ?? "");
    setScore(lead?.score ?? 0);
    setConfirmDelete(false);
    setSaveMsg(null);
  }, [lead?.id]);

  if (!lead) return null;

  const respTime = lead.respondedAt
    ? Math.round(
        (new Date(lead.respondedAt).getTime() - new Date(lead.createdAt).getTime()) / 60000
      )
    : null;

  function saveNotes() {
    const fd = new FormData();
    fd.set("leadId", lead!.id);
    fd.set("notes", notes);
    startNotes(async () => {
      const r = await updateLeadNotes(fd);
      setSaveMsg(r.error ?? "Notes saved");
      setTimeout(() => setSaveMsg(null), 2500);
    });
  }

  function saveScore(val: number) {
    setScore(val);
    const fd = new FormData();
    fd.set("leadId", lead!.id);
    fd.set("score", String(val));
    startScore(async () => {
      await updateLeadScore(fd);
    });
  }

  function changeStatus(toStatus: LeadStatus) {
    const fd = new FormData();
    fd.set("leadId", lead!.id);
    fd.set("toStatus", toStatus);
    startStatus(async () => {
      await updateLeadStatus(fd);
    });
  }

  function handleDelete() {
    const fd = new FormData();
    fd.set("leadId", lead!.id);
    startDelete(async () => {
      await deleteLead(fd);
      onClose();
    });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 p-5">
          <div>
            <h2 className="text-base font-semibold text-zinc-100">{lead.name}</h2>
            <p className="mt-0.5 text-xs text-zinc-500">{lead.email}</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* Status changer */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Stage</p>
            <div className="flex flex-wrap gap-1.5">
              {LEAD_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => changeStatus(s)}
                  disabled={isPendingStatus}
                  className={[
                    "rounded-full border px-3 py-1 text-xs font-semibold transition-all",
                    lead.status === s
                      ? "border-zinc-500 bg-zinc-800 text-zinc-100"
                      : "border-zinc-800 text-zinc-600 hover:border-zinc-600 hover:text-zinc-400",
                    isPendingStatus ? "opacity-50" : "",
                  ].join(" ")}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Score */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Quality Score
            </p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={score}
                onChange={(e) => saveScore(Number(e.target.value))}
                disabled={isPendingScore}
                className="h-1.5 flex-1 cursor-pointer accent-blue-500"
              />
              <span className="w-8 text-right text-sm font-bold tabular-nums text-zinc-200">
                {score}
              </span>
              <Star className={`h-3.5 w-3.5 ${score >= 70 ? "text-yellow-400" : "text-zinc-700"}`} />
            </div>
          </div>

          {/* Contact info */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-0.5">
            <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Contact
            </p>
            <Row label="Email" value={lead.email} />
            <Row label="Phone" value={lead.phone} />
            <Row label="Company" value={lead.company} />
            {lead.intent && (
              <div className="pt-2">
                <p className="mb-1 text-[10px] text-zinc-600">Message / Intent</p>
                <p className="whitespace-pre-wrap text-xs leading-relaxed text-zinc-400">
                  {lead.intent}
                </p>
              </div>
            )}
          </div>

          {/* Attribution */}
          {(lead.utmSource || lead.utmMedium || lead.utmCampaign || lead.referrer || lead.sourceUrl) && (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-0.5">
              <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                Attribution
              </p>
              <Row label="Source" value={lead.utmSource} />
              <Row label="Medium" value={lead.utmMedium} />
              <Row label="Campaign" value={lead.utmCampaign} />
              <Row label="Referrer" value={lead.referrer} />
              <Row label="Landing page" value={lead.sourceUrl} />
            </div>
          )}

          {/* Response time */}
          <div className="flex items-center gap-4 text-xs text-zinc-600">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              Created <span suppressHydrationWarning>{new Date(lead.createdAt).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
            </span>
            {respTime !== null && (
              <span className={respTime < 60 ? "text-green-500" : respTime < 1440 ? "text-yellow-500" : "text-red-500"}>
                Responded in {respTime < 60 ? `${respTime}m` : `${Math.round(respTime / 60)}h`}
              </span>
            )}
          </div>

          {/* Status history */}
          {lead.statusHistory.length > 0 && (
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                Status History
              </p>
              <div className="space-y-2">
                {lead.statusHistory.map((event) => (
                  <div key={event.id} className="flex items-start gap-2 text-xs">
                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-700" />
                    <div>
                      <span className="text-zinc-400">
                        {event.fromStatus} → <span className={STATUS_COLORS[event.toStatus] ?? "text-zinc-300"}>{event.toStatus}</span>
                      </span>
                      <span className="ml-2 text-zinc-700" suppressHydrationWarning>
                        {new Date(event.createdAt).toLocaleString("en-IN", {
                          day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                        })}
                      </span>
                      {event.note && <p className="mt-0.5 text-zinc-600 italic">{event.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Internal Notes
            </p>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes, follow-up reminders, context..."
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-xs text-zinc-300 placeholder-zinc-700 focus:border-zinc-600 focus:outline-none focus:ring-0"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-zinc-700">{notes.length}/4000</span>
              <div className="flex items-center gap-2">
                {saveMsg && (
                  <span className={`text-xs ${saveMsg.startsWith("Notes saved") ? "text-green-400" : "text-red-400"}`}>
                    {saveMsg}
                  </span>
                )}
                <button
                  onClick={saveNotes}
                  disabled={isPendingNotes}
                  className="flex items-center gap-1.5 rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700 disabled:opacity-50"
                >
                  <Save className="h-3 w-3" />
                  {isPendingNotes ? "Saving…" : "Save Notes"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-4">
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-900/50 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-950/30"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete Lead
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-center text-xs text-zinc-500">This cannot be undone. Delete permanently?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 rounded-md border border-zinc-700 py-2 text-xs text-zinc-400 hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isPendingDelete}
                  className="flex-1 rounded-md bg-red-900/50 py-2 text-xs font-medium text-red-300 hover:bg-red-900/80 disabled:opacity-50"
                >
                  {isPendingDelete ? "Deleting…" : "Yes, Delete"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
