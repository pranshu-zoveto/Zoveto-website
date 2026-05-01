"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { createLead } from "@/lib/api";
import { FormToast } from "@/components/ui/FormToast";

type FooterNewsletterProps = {
  inputId?: string;
  /** Editorial = light grey pill + white subscribe (site-wide footer). */
  variant?: "default" | "editorial";
};

export function FooterNewsletter({ inputId = "footer-newsletter-email", variant = "default" }: FooterNewsletterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;

    setIsSubmitting(true);
    setStatus(null);
    try {
      await createLead({
        firstName: "Product Updates",
        lastName: "Subscriber",
        email: normalizedEmail,
        company: "Website product updates",
        message: "Requested updates and early access from footer form.",
        source: "footer_product_updates",
      });
      setEmail("");
      setStatus({
        kind: "success",
        message: "You are in. We will send product updates and early-access invites.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Subscription failed. Please try again.";
      setStatus({ kind: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isEditorial = variant === "editorial";

  return (
    <div className={cn(isEditorial ? "max-w-xl" : "max-w-xl lg:max-w-lg")}>
      <FormToast
        open={status?.kind === "success"}
        title="Subscribed"
        message="Your email was sent to info@zoveto.com. We will send product updates and early-access notes."
        onClose={() => setStatus(null)}
      />
      <FormToast
        open={status?.kind === "error"}
        tone="error"
        title="Could not subscribe"
        message={status?.message ?? "Please try again."}
        onClose={() => setStatus(null)}
      />
      <div
        className={cn(
          "mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em]",
          isEditorial ? "text-neutral-800" : "text-muted-2"
        )}
      >
        Product updates
      </div>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex items-center gap-2 rounded-xl border px-3 py-2",
          isEditorial
            ? "border-neutral-400/70 bg-white"
            : "border-border bg-surface"
        )}
      >
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Enter your work email"
          value={email}
          disabled={isSubmitting}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none placeholder:font-normal placeholder:tracking-normal",
            isEditorial
              ? "text-neutral-950 placeholder:text-neutral-500"
              : "text-foreground placeholder:text-muted-2"
          )}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
            isEditorial
              ? "border-neutral-400/80 bg-neutral-50 text-neutral-950 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
              : "border-border bg-card text-foreground hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {isSubmitting ? "Saving..." : "Get updates"}
        </button>
      </form>
      <p
        className={cn(
          "mt-2.5 text-xs leading-relaxed",
          status?.kind === "success"
            ? isEditorial
              ? "text-neutral-800"
              : "text-green"
            : status?.kind === "error"
              ? "text-red"
              : isEditorial
                ? "text-neutral-800"
                : "text-muted-2"
        )}
      >
        {status?.message ?? "Product updates, release notes, and early-access invites. No spam."}
      </p>
    </div>
  );
}

export default FooterNewsletter;
