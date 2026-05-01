"use client";

import { CheckCircle2, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FormToastProps = {
  open: boolean;
  title: string;
  message: string;
  tone?: "success" | "error";
  onClose?: () => void;
  className?: string;
};

export function FormToast({ open, title, message, tone = "success", onClose, className }: FormToastProps) {
  if (!open) return null;

  const isSuccess = tone === "success";

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      aria-live={isSuccess ? "polite" : "assertive"}
      className={cn(
        "fixed left-1/2 top-20 z-[240] w-[min(calc(100vw-2rem),40rem)] -translate-x-1/2 overflow-hidden rounded-2xl border bg-card shadow-[0_18px_60px_rgba(15,23,42,0.16)]",
        "md:left-auto md:right-4 md:w-[min(calc(100vw-2rem),28rem)] md:translate-x-0",
        "animate-in fade-in-0 slide-in-from-top-2 duration-300",
        isSuccess ? "border-green/55" : "border-red/45",
        className
      )}
    >
      <div className={cn("h-1 w-full", isSuccess ? "bg-green" : "bg-red")} aria-hidden />
      <div className="flex gap-3 px-4 py-4">
        <div
          className={cn(
            "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
            isSuccess ? "border-green/25 bg-green/10 text-green" : "border-red/25 bg-red/10 text-red"
          )}
          aria-hidden
        >
          {isSuccess ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
        </div>
        <div className="min-w-0 flex-1">
          <p className={cn("text-sm font-semibold", isSuccess ? "text-green" : "text-red")}>{title}</p>
          <p className="mt-1 text-sm leading-5 text-muted">{message}</p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-2 transition-colors hover:bg-surface hover:text-foreground"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default FormToast;
