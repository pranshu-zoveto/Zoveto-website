"use client";

import React, { useState } from "react";
import { createLead } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormToast } from "@/components/ui/FormToast";

const REVENUE_OPTIONS = [
  { value: "", label: "Select range" },
  { value: "under-1cr", label: "Under ₹1 Cr" },
  { value: "1-5cr", label: "₹1–5 Cr" },
  { value: "5-25cr", label: "₹5–25 Cr" },
  { value: "25cr-plus", label: "₹25 Cr+" },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-medium text-muted-2 block mb-2">{children}</label>;
}

const inputClass =
  "w-full min-h-[48px] bg-card border border-border rounded-xl px-4 text-base text-foreground placeholder:text-muted-2 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15 transition-all";

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("submitting");
    const trimmed = fullName.trim();
    const parts = trimmed.split(/\s+/).filter(Boolean);
    const firstName = parts[0] ?? trimmed;
    const lastName = parts.length > 1 ? parts.slice(1).join(" ") : undefined;
    const messageParts = [painPoint.trim(), annualRevenue ? `Annual revenue: ${annualRevenue}` : ""].filter(Boolean);
    try {
      await createLead({
        firstName,
        lastName,
        email: email.trim(),
        company: organization.trim(),
        message: messageParts.join("\n") || undefined,
        phone: phone.trim() || undefined,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <FormToast
        open={status === "success"}
        title="Request sent"
        message="Your details were sent to info@zoveto.com. We will review the fit and reply by email."
        onClose={() => setStatus("idle")}
      />
      {status === "success" ? (
        <div className="rounded-2xl border border-teal/20 bg-teal/[0.06] p-6 text-center" role="status">
          <CheckCircle2 className="mx-auto h-8 w-8 text-teal" aria-hidden />
          <Text variant="body-sm" className="mt-3 text-muted-2">
            Request received. We will reply within one business day.
          </Text>
        </div>
      ) : null}
      {error && (
        <div
          className="rounded-xl border border-red/25 bg-red/10 px-4 py-3 text-sm text-red"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <FieldLabel>Full name *</FieldLabel>
          <input
            required
            name="fullName"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>Business email *</FieldLabel>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rahul@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <FieldLabel>Organization *</FieldLabel>
          <input
            required
            name="organization"
            autoComplete="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="e.g. Sharma Textiles"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>Annual revenue</FieldLabel>
          <select
            name="annualRevenue"
            value={annualRevenue}
            onChange={(e) => setAnnualRevenue(e.target.value)}
            className={inputClass}
          >
            {REVENUE_OPTIONS.map((o) => (
              <option key={o.value || "empty"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <FieldLabel>Phone (optional)</FieldLabel>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 555 010 1234"
          className={inputClass}
        />
      </div>

      <div>
        <FieldLabel>Core operational pain point</FieldLabel>
        <textarea
          name="painPoint"
          value={painPoint}
          onChange={(e) => setPainPoint(e.target.value)}
          placeholder="Describe current Excel, Tally, or WhatsApp friction…"
          rows={4}
          className="w-full bg-card border border-border rounded-xl p-4 text-base text-foreground placeholder:text-muted-2 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15 transition-all resize-y min-h-[120px]"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "submitting"}
        className="w-full min-h-[52px] gap-2"
      >
        {status === "submitting" ? "Sending…" : "Book system audit"}{" "}
        <ArrowRight size={18} aria-hidden />
      </Button>
    </form>
  );
}
