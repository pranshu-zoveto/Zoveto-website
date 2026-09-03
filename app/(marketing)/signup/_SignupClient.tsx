"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, ChevronRight, Info, Loader2, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormToast } from "@/components/ui/FormToast";
import { trackEvent, trackMarketingEvent } from "@/lib/tracking";
import {
  BILLING_BUNDLES,
  BILLING_MODULES,
  computeModularTotal,
  resolveModulesWithDeps,
  type BillingModuleKey,
} from "@/lib/modular-billing-config";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

type Phase = "picker" | "form" | "submitting" | "processing" | "success";
type PickerMode = "modular" | "bundle";
type ToastState = { open: false } | { open: true; tone: "success" | "error"; title: string; message: string };

const TEAM_SIZE_OPTIONS = ["1-10", "11-50", "51-200", "200+"] as const;
const PRIORITY_OPTIONS = [
  "Inventory and warehouse control",
  "Sales, CRM, and follow-up discipline",
  "Finance, billing, and collections",
  "HR, payroll, and compliance",
  "AI automation and intelligence",
] as const;

const FIELD_CLASS =
  "w-full min-h-[48px] bg-card border border-border rounded-xl px-4 text-base text-foreground placeholder:text-muted-2 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15 transition-all";

const formatInr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function loadRazorpayCheckout(): Promise<void> {
  if (typeof window !== "undefined" && window.Razorpay) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src*="checkout.razorpay.com"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Could not load Razorpay checkout.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Razorpay checkout."));
    document.body.appendChild(script);
  });
}

interface Props {
  preSelectedModule?: BillingModuleKey | null;
}

export default function SignupClient({ preSelectedModule = null }: Props) {
  const [phase, setPhase] = useState<Phase>("picker");
  const [pickerMode, setPickerMode] = useState<PickerMode>("modular");
  const [selectedModules, setSelectedModules] = useState<Set<BillingModuleKey>>(
    preSelectedModule ? new Set([preSelectedModule]) : new Set(),
  );
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({ open: false });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("");

  useEffect(() => {
    void loadRazorpayCheckout().catch(() => {
      // lazy loaded on submit as fallback
    });
  }, []);

  const resolvedModules = useMemo(() => resolveModulesWithDeps(Array.from(selectedModules)), [selectedModules]);
  const modularTotal = useMemo(() => computeModularTotal(Array.from(selectedModules)), [selectedModules]);
  const selectedBundleObj = BILLING_BUNDLES.find((b) => b.key === selectedBundle) ?? null;
  const displayTotal = pickerMode === "bundle" && selectedBundleObj ? selectedBundleObj.monthlyPrice : modularTotal;
  const hasSelection = pickerMode === "bundle" ? Boolean(selectedBundleObj) : selectedModules.size > 0;

  function showToastError(message: string): void {
    setToast({ open: true, tone: "error", title: "Error", message });
  }

  function toggleModule(key: BillingModuleKey): void {
    setSelectedModules((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function getAutoDepMessage(): string | null {
    const deps = resolvedModules.filter((k) => !selectedModules.has(k));
    if (!deps.length) return null;
    return `Auto-included: ${deps.join(", ")} (required dependency)`;
  }

  function handleContinue(): void {
    if (!hasSelection) {
      showToastError("Please select at least one module to continue.");
      return;
    }
    setToast({ open: false });
    setPhase("form");
  }

  async function handleFormSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !companyName.trim()) {
      showToastError("Name, email, and company name are required.");
      return;
    }
    if (!teamSize) {
      showToastError("Please select your team size.");
      return;
    }

    setToast({ open: false });
    setPhase("submitting");

    try {
      const subPayload: Record<string, unknown> = {
        email: email.trim(),
        name: name.trim(),
        companyName: companyName.trim(),
        phone: phone.trim() || undefined,
      };

      if (pickerMode === "bundle" && selectedBundleObj) {
        subPayload.bundleKey = selectedBundleObj.key;
      } else {
        subPayload.selectedModules = resolvedModules;
      }

      const subRes = await fetch("/api/razorpay/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subPayload),
      });

      const subData = (await subRes.json()) as {
        message?: string;
        subscriptionId?: string;
        totalAmountPaise?: number;
        resolvedModules?: string[];
        rzpKeyId?: string;
      };

      if (!subRes.ok || !subData.subscriptionId || !subData.rzpKeyId) {
        throw new Error(subData.message ?? "Failed to create subscription.");
      }

      trackEvent("razorpay_subscription_created", {
        subscriptionId: subData.subscriptionId,
        billingMode: pickerMode,
        modules: (subData.resolvedModules ?? []).join(","),
        totalInr: (subData.totalAmountPaise ?? 0) / 100,
      });

      await loadRazorpayCheckout();
      setPhase("processing");

      const moduleLabel =
        pickerMode === "bundle" && selectedBundleObj ? selectedBundleObj.label : resolvedModules.join(" + ");

      const options = {
        key: subData.rzpKeyId,
        subscription_id: subData.subscriptionId,
        name: "Zoveto",
        description: `${moduleLabel} - 15-day free trial`,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim() || undefined,
        },
        notes: {
          billing_mode: pickerMode,
          modules: (subData.resolvedModules ?? []).join(","),
        },
        theme: { color: "#2563EB" },
        modal: {
          confirm_close: true,
          ondismiss: () => setPhase("form"),
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_subscription_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const confirmRes = await fetch("/api/razorpay/confirm", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_signature: response.razorpay_signature,
                email: email.trim(),
                name: name.trim(),
                companyName: companyName.trim(),
                phone: phone.trim() || undefined,
                teamSize,
                useCase,
              }),
            });

            const confirmData = (await confirmRes.json().catch(() => ({}))) as { message?: string };
            if (!confirmRes.ok) {
              setPhase("form");
              showToastError(confirmData.message ?? "Payment verification failed. Contact support.");
              return;
            }

            trackMarketingEvent("trial_started", {
              plan: pickerMode === "bundle" ? selectedBundleObj?.key : "modular",
              subscription_id: response.razorpay_subscription_id,
            });
            trackEvent("razorpay_subscription_confirmed", {
              subscriptionId: response.razorpay_subscription_id,
              billingMode: pickerMode,
            });
            setPhase("success");
          } catch {
            setPhase("form");
            showToastError("Verification failed. Contact support@zoveto.com.");
          }
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      setPhase("form");
      showToastError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const autoDepMessage = getAutoDepMessage();
  const isBusy = phase === "submitting" || phase === "processing";

  return (
    <main className="relative min-h-[100dvh] bg-background pb-16 pt-24 md:pt-28">
      <FormToast
        open={toast.open}
        tone={toast.open ? toast.tone : "success"}
        title={toast.open ? toast.title : ""}
        message={toast.open ? toast.message : ""}
        onClose={() => setToast({ open: false })}
      />

      <div className="container mx-auto max-w-content px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <section className="lg:pt-8">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-2">Early access</p>
            <h1 className="max-w-xl text-balance text-[clamp(2.25rem,4.2vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-foreground">
              Request early access to Zoveto
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              15 days free on the plan you choose. Add a payment method to activate your trial. Billing starts only
              after day 15.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "15 days free on every plan",
                "Secure checkout powered by Razorpay",
                "Cancel anytime before your trial ends",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2.5 text-sm text-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-dim">
                    <Check className="h-3 w-3 text-blue" strokeWidth={2.5} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <AnimatePresence mode="wait">
              {phase === "picker" && (
                <motion.div key="picker" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
                  <div className="border-b border-border/80 px-6 py-5">
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">Choose your modules</h2>
                    <p className="mt-1 text-sm text-muted-2">Select what your business needs. Pay only for those.</p>
                  </div>

                  <div className="px-6 py-6">
                    <div className="mb-5 grid grid-cols-2 rounded-xl bg-surface p-1">
                      <button
                        type="button"
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          pickerMode === "modular" ? "bg-card text-foreground shadow-sm" : "text-muted-2",
                        )}
                        onClick={() => {
                          setPickerMode("modular");
                          setSelectedBundle(null);
                        }}
                      >
                        Individual modules
                      </button>
                      <button
                        type="button"
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          pickerMode === "bundle" ? "bg-card text-foreground shadow-sm" : "text-muted-2",
                        )}
                        onClick={() => {
                          setPickerMode("bundle");
                          setSelectedModules(new Set());
                        }}
                      >
                        Bundle plans
                      </button>
                    </div>

                    {pickerMode === "modular" ? (
                      <>
                        <div className="space-y-3">
                          {BILLING_MODULES.map((mod) => {
                            const isSelected = selectedModules.has(mod.key as BillingModuleKey);
                            const isAutoDep = !isSelected && resolvedModules.includes(mod.key as BillingModuleKey);
                            return (
                              <button
                                key={mod.key}
                                type="button"
                                className={cn(
                                  "w-full rounded-xl border p-4 text-left transition-colors",
                                  isSelected || isAutoDep ? "border-blue/40 bg-blue-dim/40" : "border-border bg-card hover:border-blue/30",
                                )}
                                onClick={() => toggleModule(mod.key as BillingModuleKey)}
                              >
                                <div className="flex items-start gap-3">
                                  <span className="text-xl">{mod.icon}</span>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-foreground">{mod.label}</p>
                                    <p className="text-xs text-muted-2">{mod.description}</p>
                                    <p className="mt-1.5 text-sm font-semibold text-foreground">
                                      {formatInr(mod.monthlyPrice)}
                                      <span className="text-xs font-medium text-muted-2">/mo</span>
                                    </p>
                                  </div>
                                  <span
                                    className={cn(
                                      "inline-flex h-5 w-5 items-center justify-center rounded-full border",
                                      isSelected || isAutoDep ? "border-blue bg-blue text-white" : "border-border text-transparent",
                                    )}
                                  >
                                    <Check className="h-3 w-3" strokeWidth={2.5} />
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {autoDepMessage ? (
                          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue/20 bg-blue-dim/50 px-3 py-2 text-xs text-blue">
                            <Info className="h-3.5 w-3.5" />
                            {autoDepMessage}
                          </p>
                        ) : null}

                        <div className="mt-5 rounded-xl border border-border bg-surface/60 p-4">
                          {selectedModules.size ? (
                            <>
                              <p className="text-xs text-muted-2">Your plan total</p>
                              <p className="mt-1 text-lg font-semibold text-foreground">
                                {formatInr(modularTotal)}
                                <span className="text-sm font-medium text-muted-2">/month</span>
                              </p>
                              <p className="mt-1 text-xs text-muted-2">after 15-day free trial - ₹1 card verification now</p>
                            </>
                          ) : (
                            <p className="text-sm text-muted-2">Select modules above to see your price.</p>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="space-y-3">
                        {BILLING_BUNDLES.map((bundle) => {
                          const selected = selectedBundle === bundle.key;
                          return (
                            <button
                              key={bundle.key}
                              type="button"
                              onClick={() => setSelectedBundle(bundle.key)}
                              className={cn(
                                "w-full rounded-xl border p-4 text-left transition-colors",
                                selected ? "border-blue/40 bg-blue-dim/40" : "border-border bg-card hover:border-blue/30",
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-sm font-semibold text-foreground">{bundle.label}</p>
                                  <p className="text-xs text-muted-2">{bundle.tagline}</p>
                                  <p className="mt-1.5 text-sm font-semibold text-foreground">
                                    {formatInr(bundle.monthlyPrice)}
                                    <span className="text-xs font-medium text-muted-2">/mo</span>
                                  </p>
                                </div>
                                {bundle.popular ? (
                                  <span className="rounded-full bg-blue px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                                    Popular
                                  </span>
                                ) : null}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleContinue}
                      disabled={!hasSelection}
                      className={cn(
                        "mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-blue px-4 text-sm font-semibold text-white",
                        "transition-colors hover:bg-blue-hover disabled:cursor-not-allowed disabled:opacity-50",
                      )}
                    >
                      Continue <ChevronRight className="h-4 w-4" />
                    </button>

                    <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-2">
                      <Lock className="h-3.5 w-3.5" /> Secure checkout - Cancel before 15 days for zero charge
                    </p>
                  </div>
                </motion.div>
              )}

              {phase === "form" && (
                <motion.div key="form" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
                  <div className="px-6 py-6">
                    <button
                      type="button"
                      className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:underline"
                      onClick={() => setPhase("picker")}
                    >
                      <ArrowLeft className="h-4 w-4" /> Back to modules
                    </button>

                    <div className="mb-5 rounded-xl border border-border bg-surface/60 p-4">
                      <p className="text-xs text-muted-2">
                        {pickerMode === "bundle" && selectedBundleObj ? selectedBundleObj.label : resolvedModules.join(" + ")}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {formatInr(displayTotal)}
                        <span className="text-sm font-medium text-muted-2">/mo after trial</span>
                      </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                      <input
                        className={FIELD_CLASS}
                        placeholder="Full name *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <input
                        className={FIELD_CLASS}
                        placeholder="Work email *"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <input
                        className={FIELD_CLASS}
                        placeholder="Company name *"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                      <input
                        className={FIELD_CLASS}
                        placeholder="Phone (optional)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <select
                        className={FIELD_CLASS}
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        required
                      >
                        <option value="">Select team size *</option>
                        {TEAM_SIZE_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <select
                        className={FIELD_CLASS}
                        value={useCase}
                        onChange={(e) => setUseCase(e.target.value)}
                      >
                        <option value="">Primary use case (optional)</option>
                        {PRIORITY_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>

                      <button
                        type="submit"
                        disabled={isBusy}
                        className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-blue px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-hover disabled:opacity-60"
                      >
                        Start 15-day free trial - ₹1 card check <ShieldCheck className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {(phase === "submitting" || phase === "processing") && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex min-h-[360px] flex-col items-center justify-center gap-3 px-6 py-10 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue" />
                    <p className="text-sm text-muted">
                      {phase === "submitting" ? "Setting up your billing..." : "Complete the payment in the popup..."}
                    </p>
                  </div>
                </motion.div>
              )}

              {phase === "success" && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="px-6 py-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-dim">
                      <ShieldCheck className="h-7 w-7 text-green" />
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">Your workspace is being set up</h2>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                      Check <strong>{email}</strong> for login credentials. Your 15-day free trial starts now.
                    </p>
                    <p className="mt-4 text-sm text-foreground">
                      Modules activated:{" "}
                      <strong>
                        {pickerMode === "bundle" && selectedBundleObj ? selectedBundleObj.label : resolvedModules.join(", ")}
                      </strong>
                    </p>
                    <p className="mt-2 text-xs text-muted-2">
                      Your card will be charged {formatInr(displayTotal)}/month on day 16. Cancel anytime before then.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}
