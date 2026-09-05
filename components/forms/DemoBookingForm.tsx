"use client";

import React, { useState } from "react";
import { bookDemo } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { trackEvent, trackMarketingEvent } from "@/lib/tracking";
import { FormToast } from "@/components/ui/FormToast";
import { PhoneInputWithCountry } from "@/components/forms/PhoneInputWithCountry";
import {
  DEMO_COMPANY_TYPES,
  DEMO_EMPLOYEE_BANDS,
  DEMO_ROLES,
  DEMO_TIMELINES,
} from "@/lib/demo-lead";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-medium text-muted-2 block mb-2">{children}</label>;
}

const inputClass =
  "w-full min-h-[48px] bg-card border border-border rounded-xl px-4 text-base text-foreground placeholder:text-muted-2 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15 transition-all";

export function DemoBookingForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [employeeBand, setEmployeeBand] = useState("");
  const [role, setRole] = useState("");
  const [timeline, setTimeline] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!fullName.trim() || !email.trim() || !organization.trim()) {
      setError("Please fill in your name, work email, and company.");
      return;
    }
    if (!companyType || !employeeBand) {
      setError("Please select company type and team size.");
      return;
    }
    if (!role) {
      setError("Please select your role.");
      return;
    }
    if (!timeline) {
      setError("Please select your timeline.");
      return;
    }
    if (!consentGiven) {
      setError("Please agree to the privacy notice to continue.");
      return;
    }
    setStatus("submitting");
    const trimmed = fullName.trim();
    const parts = trimmed.split(/\s+/).filter(Boolean);
    const firstName = parts[0] ?? trimmed;
    const lastName = parts.length > 1 ? parts.slice(1).join(" ") : undefined;
    try {
      await bookDemo({
        firstName,
        lastName,
        email: email.trim(),
        company: organization.trim(),
        industry: companyType.trim(),
        companySize: employeeBand.trim(),
        companyType: companyType.trim(),
        employeeBand: employeeBand.trim(),
        role: role.trim(),
        timeline: timeline.trim(),
        phone: phone.trim() || undefined,
        preferredDate: preferredDate || undefined,
        preferredTime: preferredTime || undefined,
        message: message.trim() || undefined,
      });
      setStatus("success");
      trackMarketingEvent("demo_request_submit", {
        form: "demo_booking_form",
        company_type: companyType,
        employee_band: employeeBand,
        role,
        timeline,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
      });
      trackEvent("generate_lead", {
        method: "demo_booking_form",
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <FormToast
        open={status === "success"}
        title="Demo request sent"
        message="Your details were sent to info@zoveto.com. We will confirm the walkthrough by email."
        onClose={() => setStatus("idle")}
      />
      {status === "success" ? (
        <div className="rounded-2xl border border-blue/20 bg-blue-light p-6 text-center" role="status">
          <CheckCircle2 className="mx-auto h-8 w-8 text-blue" aria-hidden />
          <Text variant="body-sm" className="mt-3 text-muted">
            Request received. Check your inbox for confirmation from our team.
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
            name="demoFullName"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>Work email *</FieldLabel>
          <input
            required
            type="email"
            name="demoEmail"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <FieldLabel>Company *</FieldLabel>
        <input
          required
          name="demoOrg"
          autoComplete="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="Organization name"
          className={inputClass}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel>Company type *</FieldLabel>
          <select
            required
            name="demoCompanyType"
            value={companyType}
            onChange={(e) => setCompanyType(e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Select type…
            </option>
            {DEMO_COMPANY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>Number of employees *</FieldLabel>
          <select
            required
            name="demoEmployeeBand"
            value={employeeBand}
            onChange={(e) => setEmployeeBand(e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Select range…
            </option>
            {DEMO_EMPLOYEE_BANDS.map((band) => (
              <option key={band.value} value={band.value}>
                {band.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel>Role *</FieldLabel>
          <select
            required
            name="demoRole"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Select role…
            </option>
            {DEMO_ROLES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>Timeline *</FieldLabel>
          <select
            required
            name="demoTimeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Select timeline…
            </option>
            {DEMO_TIMELINES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <FieldLabel>Phone (optional)</FieldLabel>
        <PhoneInputWithCountry
          id="demoPhone"
          name="demoPhone"
          value={phone}
          onChange={setPhone}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <FieldLabel>Preferred date</FieldLabel>
          <input
            type="date"
            name="preferredDate"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>Preferred time</FieldLabel>
          <select
            name="preferredTime"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            className={inputClass}
          >
            <option value="">Any</option>
            <option value="morning">Morning (10–12 IST)</option>
            <option value="afternoon">Afternoon (2–5 IST)</option>
            <option value="evening">Evening (5–7 IST)</option>
          </select>
        </div>
      </div>

      <div>
        <FieldLabel>Notes (optional)</FieldLabel>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Modules you want to see, team size, current tools…"
          rows={3}
          className="w-full bg-card border border-border rounded-xl p-4 text-base text-foreground placeholder:text-muted-2 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15 transition-all resize-y min-h-[96px]"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="demoConsent"
          name="demoConsent"
          checked={consentGiven}
          onChange={(e) => setConsentGiven(e.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-border text-blue focus:ring-blue/30"
        />
        <label htmlFor="demoConsent" className="text-xs text-muted-2">
          I agree to Zoveto collecting and using these details to contact me about this
          request, as described in the{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
            Privacy Policy
          </a>
          . *
        </label>
      </div>

      <Button
        type="submit"
        variant="outline"
        size="lg"
        disabled={status === "submitting" || !consentGiven}
        className="w-full min-h-[52px] gap-2"
      >
        <CalendarDays size={18} aria-hidden />
        {status === "submitting" ? "Scheduling…" : "Request early access"}
      </Button>
    </form>
  );
}
