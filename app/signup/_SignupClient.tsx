"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/tracking";
import { FormToast } from "@/components/ui/FormToast";
import { formatCosApiErrorMessage } from "@/lib/http-json";

const BULLETS = [
  "Every request enters a founder-reviewed waitlist",
  "No automatic workspace access or demo data",
  "Qualified teams are onboarded manually with context",
] as const;

const TEAM_SIZE_OPTIONS = ["1-10", "11-50", "51-200", "200+"] as const;

const PRIORITY_OPTIONS = [
  "Inventory and warehouse control",
  "Sales, CRM, and follow-up discipline",
  "Finance, billing, and collections",
  "Multi-module operating system rollout",
] as const;

type Phase = "form" | "submitting" | "success";

type ToastState =
  | { open: false }
  | { open: true; tone: "success" | "error"; title: string; message: string };

export default function SignupClient() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("");
  const [phone, setPhone] = useState("");
  const [phase, setPhase] = useState<Phase>("form");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<ToastState>({ open: false });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (phase !== "form") return;
    setError("");
    setToast({ open: false });
    setPhase("submitting");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          companyName,
          role,
          teamSize,
          useCase,
          phone,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

      if (!res.ok) {
        setPhase("form");
        const msg =
          formatCosApiErrorMessage(data) ??
          "Your early access request could not be submitted. Please try again.";
        setError(msg);
        setToast({
          open: true,
          tone: "error",
          title: "Could not submit",
          message: msg,
        });
        return;
      }

      setPhase("success");
      setToast({
        open: true,
        tone: "success",
        title: "Access request sent",
        message:
          "Your details were sent to info@zoveto.com for founder review. We will reply by email after qualification.",
      });
      trackEvent("generate_lead", {
        method: "early_access_waitlist",
      });
    } catch {
      setPhase("form");
      const msg = "Your early access request could not be submitted. Please try again.";
      setError(msg);
      setToast({
        open: true,
        tone: "error",
        title: "Could not submit",
        message: msg,
      });
    }
  }

  const inputClass = cn(
    "w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-sm text-foreground shadow-sm",
    "placeholder:text-muted-2",
    "transition-[border-color,box-shadow] duration-200",
    "focus:outline-none focus:border-blue/40 focus:ring-2 focus:ring-blue/15",
    "disabled:opacity-60 disabled:cursor-not-allowed",
  );

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-background">
      <FormToast
        open={toast.open}
        tone={toast.open ? toast.tone : "success"}
        title={toast.open ? toast.title : ""}
        message={toast.open ? toast.message : ""}
        onClose={() => setToast({ open: false })}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[20rem] w-[min(100vw,56rem)] -translate-x-1/2 rounded-full bg-blue-light/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-teal-dim opacity-60 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-content px-4 pb-12 pt-24 sm:px-6 md:pb-16 md:pt-28 lg:pb-20 lg:pt-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue-light/80 px-3 py-1.5 text-xs font-semibold text-blue">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Controlled early access
            </div>
            <h1 className="mb-5 text-balance text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
              Request Founder-Reviewed Access
            </h1>
            <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-muted lg:mx-0">
              Zoveto is onboarding deliberately. Tell us where your operations are breaking, and the
              founding team will decide whether you are a fit for the next batch.
            </p>
            <ul className="mx-auto max-w-md space-y-4 lg:mx-0">
              {BULLETS.map((line) => (
                <li key={line} className="flex items-start gap-3 text-left">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal/20 bg-teal-dim">
                    <Check className="h-3.5 w-3.5 text-teal" strokeWidth={2.5} aria-hidden />
                  </span>
                  <span className="pt-0.5 text-sm font-medium leading-snug text-foreground sm:text-base">
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-card/70 p-4 text-left shadow-sm lg:mx-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-2">Access rule</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Submitting this form does not create an account. Qualified users receive manual
                onboarding after review.
              </p>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div
              className={cn(
                "w-full max-w-[460px] rounded-2xl border border-border/80 bg-card/75 shadow-lg shadow-blue/10 backdrop-blur-xl",
                "ring-1 ring-border",
              )}
            >
              <div className="p-6 sm:p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {phase === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="py-4 text-center"
                    >
                      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal/25 bg-teal-dim">
                        <ShieldCheck className="h-8 w-8 text-teal" strokeWidth={2} aria-hidden />
                      </div>
                      <h2 className="mb-2 text-xl font-semibold text-foreground">
                        You are in the review queue
                      </h2>
                      <p className="mb-8 text-sm leading-relaxed text-muted">
                        Your request was sent to info@zoveto.com for founder review. If the use case
                        fits the current onboarding batch, we will email the next steps. No workspace has been
                        created yet.
                      </p>
                      <div className="rounded-xl border border-border bg-surface px-4 py-3 text-left">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-2">
                          What happens next
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground">
                          We check company fit, operating pain, and rollout readiness before approving
                          access manually.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-8">
                        <h2 className="mb-1 text-lg font-semibold text-foreground">
                          Join the early access queue
                        </h2>
                        <p className="text-sm text-muted-2">
                          This is a qualification form. The founder team controls onboarding.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div>
                          <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-foreground">
                            Full name <span className="text-red">*</span>
                          </label>
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            autoComplete="name"
                            disabled={phase === "submitting"}
                            className={inputClass}
                            value={fullName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                            placeholder="Rajesh Kumar"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                            Work email <span className="text-red">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            inputMode="email"
                            disabled={phase === "submitting"}
                            className={inputClass}
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                          />
                        </div>

                        <div>
                          <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-foreground">
                            Company name <span className="text-red">*</span>
                          </label>
                          <input
                            id="companyName"
                            name="companyName"
                            type="text"
                            required
                            autoComplete="organization"
                            disabled={phase === "submitting"}
                            className={inputClass}
                            value={companyName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                            placeholder="Acme Industries Pvt. Ltd."
                          />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="role" className="mb-2 block text-sm font-medium text-foreground">
                              Your role <span className="text-red">*</span>
                            </label>
                            <input
                              id="role"
                              name="role"
                              type="text"
                              required
                              autoComplete="organization-title"
                              disabled={phase === "submitting"}
                              className={inputClass}
                              value={role}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
                              placeholder="Founder / Ops head"
                            />
                          </div>

                          <div>
                            <label htmlFor="teamSize" className="mb-2 block text-sm font-medium text-foreground">
                              Team size <span className="text-red">*</span>
                            </label>
                            <select
                              id="teamSize"
                              name="teamSize"
                              required
                              disabled={phase === "submitting"}
                              className={inputClass}
                              value={teamSize}
                              onChange={(e: ChangeEvent<HTMLSelectElement>) => setTeamSize(e.target.value)}
                            >
                              <option value="">Select size</option>
                              {TEAM_SIZE_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="useCase" className="mb-2 block text-sm font-medium text-foreground">
                            Operating priority <span className="text-red">*</span>
                          </label>
                          <select
                            id="useCase"
                            name="useCase"
                            required
                            disabled={phase === "submitting"}
                            className={inputClass}
                            value={useCase}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setUseCase(e.target.value)}
                          >
                            <option value="">Select the biggest pain</option>
                            {PRIORITY_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                            Phone / WhatsApp <span className="text-muted-2">(optional)</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            disabled={phase === "submitting"}
                            className={inputClass}
                            value={phone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                          />
                        </div>

                        {error ? (
                          <div
                            role="alert"
                            className="rounded-xl border border-red/20 bg-red/5 px-4 py-3 text-sm text-red"
                          >
                            {error}
                          </div>
                        ) : null}

                        <button
                          type="submit"
                          disabled={phase === "submitting"}
                          className={cn(
                            "relative flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-blue px-4 py-3.5 text-sm font-semibold text-white",
                            "shadow-md shadow-blue/25 transition-colors hover:bg-blue-hover",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            "disabled:cursor-not-allowed disabled:opacity-70",
                          )}
                        >
                          {phase === "submitting" ? (
                            <>
                              <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
                              <span>Submitting for review...</span>
                            </>
                          ) : (
                            "Request Early Access"
                          )}
                        </button>

                        <p className="pt-1 text-center text-xs leading-relaxed text-muted-2">
                          By requesting access you agree to our{" "}
                          <Link href="/terms" className="text-blue underline-offset-2 hover:underline">
                            Terms
                          </Link>
                          {" · "}
                          <Link href="/privacy" className="text-blue underline-offset-2 hover:underline">
                            Privacy
                          </Link>
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
