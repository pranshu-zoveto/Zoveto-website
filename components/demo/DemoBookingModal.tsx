"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { bookDemo } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { FormToast } from "@/components/ui/FormToast";

type DemoModalContextValue = {
  openDemo: () => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function useDemoModal(): DemoModalContextValue {
  const ctx = useContext(DemoModalContext);
  if (!ctx) {
    return { openDemo: () => {} };
  }
  return ctx;
}

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    organization: "",
    phone: "",
    teamSize: "",
    industry: "",
    message: "",
  });

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setForm({
      fullName: "",
      email: "",
      organization: "",
      phone: "",
      teamSize: "",
      industry: "",
      message: "",
    });
  }, []);

  const openDemo = useCallback(() => {
    reset();
    setOpen(true);
  }, [reset]);

  const onOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setTimeout(reset, 300);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const extra = [
      form.teamSize && `Employees: ${form.teamSize}`,
      form.industry && `Company type: ${form.industry}`,
    ]
      .filter(Boolean)
      .join("\n");
    const message = [form.message.trim(), extra].filter(Boolean).join("\n\n") || undefined;
    const trimmed = form.fullName.trim();
    const parts = trimmed.split(/\s+/).filter(Boolean);
    const firstName = parts[0] ?? trimmed;
    const lastName = parts.length > 1 ? parts.slice(1).join(" ") : undefined;
    try {
      await bookDemo({
        firstName,
        lastName,
        email: form.email.trim(),
        company: form.organization.trim(),
        phone: form.phone.trim() || undefined,
        message,
        companySize: form.teamSize.trim() || undefined,
        industry: form.industry.trim() || undefined,
      });
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Request failed.");
    }
  };

  return (
    <DemoModalContext.Provider value={{ openDemo }}>
      {children}
      <FormToast
        open={status === "success"}
        title="Demo request sent"
        message="Your details were sent to info@zoveto.com. We will confirm the walkthrough by email."
        onClose={() => setStatus("idle")}
      />
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[200] bg-foreground/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-[201] w-[min(100%,calc(100vw-1.5rem),28rem)] max-h-[min(90dvh,calc(100dvh-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-2xl border border-border bg-card p-5 shadow-xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-6"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Dialog.Description className="sr-only">
              Request a live walkthrough of Zoveto. We will contact you to schedule a demo.
            </Dialog.Description>
            <div className="flex items-start justify-between gap-4 mb-4">
              <Dialog.Title className="text-lg font-semibold text-foreground">
                Book a free demo
              </Dialog.Title>
              <Dialog.Close
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg text-muted-2 hover:bg-surface hover:text-foreground"
                aria-label="Close"
              >
                <X size={20} aria-hidden />
              </Dialog.Close>
            </div>

            {status === "success" ? (
              <div className="space-y-4 py-2">
                <p className="text-foreground font-medium">Demo request sent.</p>
                <p className="text-sm text-muted leading-relaxed">
                  Your details were sent to info@zoveto.com. We will confirm your walkthrough by email.
                </p>
                <Button type="button" variant="primary" className="w-full" onClick={() => onOpenChange(false)}>
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-lg border border-red/25 bg-red/10 px-3 py-2 text-sm text-red">
                    {error}
                  </div>
                )}
                <div>
                  <label className="text-xs font-medium text-muted-2">Full name *</label>
                  <input
                    required
                    className="mt-1 min-h-[48px] w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base text-foreground"
                    value={form.fullName}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-2">Work email *</label>
                  <input
                    type="email"
                    required
                    className="mt-1 min-h-[48px] w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base text-foreground"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-2">Company *</label>
                  <input
                    required
                    className="mt-1 min-h-[48px] w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base text-foreground"
                    value={form.organization}
                    onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-muted-2">Phone *</label>
                    <input
                      required
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className="mt-1 min-h-[48px] w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base text-foreground"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-2">Employees</label>
                    <select
                      className="mt-1 min-h-[48px] w-full rounded-lg border border-border bg-card px-3 py-2.5 text-base text-foreground"
                      value={form.teamSize}
                      onChange={(e) => setForm((f) => ({ ...f, teamSize: e.target.value }))}
                    >
                      <option value="">Select…</option>
                      <option value="1-10">1–10</option>
                      <option value="11-50">11–50</option>
                      <option value="51-200">51–200</option>
                      <option value="200+">200+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-2">Company type</label>
                  <select
                    className="mt-1 min-h-[48px] w-full rounded-lg border border-border bg-card px-3 py-2.5 text-base text-foreground"
                    value={form.industry}
                    onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                  >
                    <option value="">Select…</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Trading">Trading</option>
                    <option value="Distribution">Distribution</option>
                    <option value="Retail">Retail</option>
                    <option value="Pharma">Pharma</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="FMCG / consumer goods">FMCG / consumer goods</option>
                    <option value="Services">Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-2">Notes</label>
                  <textarea
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base text-foreground"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <Button type="submit" variant="primary" className="min-h-[52px] w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Sending…" : "Request demo"}
                </Button>
                <p className="text-xs text-muted-2 text-center">
                  Uses <code className="text-blue">POST /api/demo</code> on your COS API.
                </p>
              </form>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </DemoModalContext.Provider>
  );
}

export default DemoModalProvider;
