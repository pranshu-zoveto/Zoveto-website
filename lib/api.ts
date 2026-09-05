// lib/api.ts - Production COS Integration for Zoveto Website

import { readErrorMessageFromResponse } from "@/lib/http-json";
import { LEAD_STAFF_INBOX } from "@/lib/lead-intake-mail";

export const WEBSITE_FORM_NOTIFICATION_EMAIL = LEAD_STAFF_INBOX;

function attachUtm(payload: Record<string, unknown>): Record<string, unknown> {
  if (typeof window === "undefined") return payload;
  try {
    const utmRaw = localStorage.getItem("zoveto_utm");
    if (utmRaw) {
      const utm = JSON.parse(utmRaw) as Record<string, string>;
      return { ...payload, utm };
    }
  } catch {
    // localStorage may be unavailable in some contexts
  }
  return payload;
}

// ── TYPES ───────────────────────────────────────────────────

export interface LeadPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  source?: string;
  industry?: string;
}

export interface LeadResponse {
  id: string;
  message: string;
}

export interface DemoPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  companySize?: string;
  companyType?: string;
  employeeBand?: string;
  role?: string;
  timeline?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

// ── API FUNCTIONS ────────────────────────────────────────────

/** COS `WebsiteContactController` - POST /api/leads (`WebsiteLeadDto`). */
export async function createLead(data: LeadPayload): Promise<LeadResponse> {
  const fullName =
    [data.firstName, data.lastName].filter((s) => s?.trim()).join(" ").trim() || data.firstName.trim();
  const painParts = [
    data.message?.trim(),
    data.industry?.trim() && `Industry: ${data.industry.trim()}`,
    `Source: ${data.source?.trim() || "website"}`,
    `Notify: ${WEBSITE_FORM_NOTIFICATION_EMAIL}`,
  ].filter(Boolean) as string[];
  const body = attachUtm({
    fullName: fullName.slice(0, 200),
    email: data.email.trim(),
    organization: (data.company?.trim() || "Website lead").slice(0, 200),
    phone: data.phone?.trim(),
    painPoint: painParts.length ? painParts.join("\n\n").slice(0, 10000) : undefined,
  });
  /** Same-origin Next proxy so COS `WEB_CONTACT_SECRET` can stay server-only (see `app/api/leads`). */
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const msg = await readErrorMessageFromResponse(res);
    throw new Error(msg ?? `Lead submission failed (${res.status})`);
  }
  return res.json() as Promise<LeadResponse>;
}

/** COS `WebsiteContactController` - POST /api/demo (`WebsiteDemoDto`). */
export async function bookDemo(data: DemoPayload): Promise<{ message: string }> {
  const fullName =
    [data.firstName, data.lastName].filter((s) => s?.trim()).join(" ").trim() || data.firstName.trim();
  const companyType = data.companyType?.trim() || data.industry?.trim();
  const employeeBand = data.employeeBand?.trim() || data.companySize?.trim();
  const body = attachUtm({
    fullName: fullName.slice(0, 200),
    email: data.email.trim(),
    organization: (data.company?.trim() || "Demo request").slice(0, 200),
    phone: data.phone?.trim(),
    preferredDate: data.preferredDate,
    preferredTime: data.preferredTime,
    message: data.message?.trim()?.slice(0, 10000) || undefined,
    companyType,
    employeeBand,
    industry: data.industry?.trim() || companyType,
    companySize: data.companySize?.trim() || employeeBand,
    role: data.role?.trim() || undefined,
    timeline: data.timeline?.trim() || undefined,
    sourceUrl: typeof window !== "undefined" ? window.location.href.slice(0, 500) : undefined,
  });
  const res = await fetch("/api/demo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const msg = await readErrorMessageFromResponse(res);
    throw new Error(msg ?? `Demo booking failed (${res.status})`);
  }
  return res.json() as Promise<{ message: string }>;
}

