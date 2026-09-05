/**
 * Shared demo-booking qualification contract.
 * Used by the public form (client), POST /api/demo (server), and the leads CRM.
 * Keep this module free of Node/SMTP/Prisma imports so the form can import it.
 */

export const DEMO_COMPANY_TYPES = [
  "Manufacturing",
  "Trading",
  "Distribution",
  "Retail",
  "Pharma",
  "Cosmetics",
  "FMCG / consumer goods",
  "Services",
  "Other",
] as const;

export const DEMO_EMPLOYEE_BANDS = [
  { value: "1–10", label: "1–10" },
  { value: "11–50", label: "11–50" },
  { value: "51–200", label: "51–200" },
  { value: "201–500", label: "201–500" },
  { value: "501–1000", label: "501–1,000" },
  { value: "1000+", label: "1,000+" },
] as const;

export const DEMO_ROLES = [
  "Owner/Founder",
  "Operations Manager",
  "Finance/Accounts",
  "IT/Tech",
  "Sales/Warehouse Staff",
  "Other",
] as const;

export const DEMO_TIMELINES = [
  {
    value: "this_month",
    label: "Ready to start this month",
    emailLabel: "Ready this month",
  },
  {
    value: "1_3_months",
    label: "Exploring, 1–3 months",
    emailLabel: "1–3 months",
  },
  {
    value: "researching",
    label: "Just researching",
    emailLabel: "Researching",
  },
] as const;

export type DemoRole = (typeof DEMO_ROLES)[number];
export type DemoTimeline = (typeof DEMO_TIMELINES)[number]["value"];
export type DemoCompanyType = (typeof DEMO_COMPANY_TYPES)[number];
export type DemoEmployeeBand = (typeof DEMO_EMPLOYEE_BANDS)[number]["value"];

const COMPANY_TYPE_SET = new Set<string>(DEMO_COMPANY_TYPES);
const ROLE_SET = new Set<string>(DEMO_ROLES);
const TIMELINE_SET = new Set<string>(DEMO_TIMELINES.map((t) => t.value));
const EMPLOYEE_BAND_BY_NORMALIZED = new Map<string, DemoEmployeeBand>(
  DEMO_EMPLOYEE_BANDS.map((band) => [normalizeDashes(band.value), band.value]),
);

function normalizeDashes(value: string): string {
  return value.replace(/[\u2013\u2014]/g, "-").trim();
}

export function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function parseCompanyType(value: unknown): DemoCompanyType | null {
  const raw = asTrimmedString(value);
  return COMPANY_TYPE_SET.has(raw) ? (raw as DemoCompanyType) : null;
}

export function parseEmployeeBand(value: unknown): DemoEmployeeBand | null {
  const raw = asTrimmedString(value);
  if (!raw) return null;
  return EMPLOYEE_BAND_BY_NORMALIZED.get(normalizeDashes(raw)) ?? null;
}

export function parseRole(value: unknown): DemoRole | null {
  const raw = asTrimmedString(value);
  return ROLE_SET.has(raw) ? (raw as DemoRole) : null;
}

export function parseTimeline(value: unknown): DemoTimeline | null {
  const raw = asTrimmedString(value);
  return TIMELINE_SET.has(raw) ? (raw as DemoTimeline) : null;
}

export function timelineEmailLabel(timeline: string | null | undefined): string | null {
  if (!timeline) return null;
  const match = DEMO_TIMELINES.find((t) => t.value === timeline);
  return match?.emailLabel ?? null;
}

export function timelineDisplayLabel(timeline: string | null | undefined): string | null {
  if (!timeline) return null;
  const match = DEMO_TIMELINES.find((t) => t.value === timeline);
  return match?.label ?? timeline;
}

const ROLE_SCORE: Record<DemoRole, number> = {
  "Owner/Founder": 45,
  "Operations Manager": 30,
  "Finance/Accounts": 30,
  "IT/Tech": 20,
  "Sales/Warehouse Staff": 15,
  Other: 10,
};

const TIMELINE_SCORE: Record<DemoTimeline, number> = {
  this_month: 45,
  "1_3_months": 25,
  researching: 10,
};

/** 0–100. Owner/Founder + ready this month lands at 90. */
export function scoreDemoLead(input: {
  role: DemoRole | null;
  timeline: DemoTimeline | null;
}): number {
  const rolePts = input.role ? ROLE_SCORE[input.role] : 0;
  const timelinePts = input.timeline ? TIMELINE_SCORE[input.timeline] : 0;
  return Math.min(100, rolePts + timelinePts);
}

export type DemoUtmFields = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
};

export function parseUtmFromBody(parsedBody: Record<string, unknown>): DemoUtmFields {
  const raw = parsedBody.utm;
  const obj = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const pick = (...keys: string[]) => {
    for (const key of keys) {
      const value = obj[key];
      if (typeof value === "string" && value.trim()) return value.trim().slice(0, 200);
    }
    return null;
  };
  return {
    utmSource: pick("utm_source", "utmSource"),
    utmMedium: pick("utm_medium", "utmMedium"),
    utmCampaign: pick("utm_campaign", "utmCampaign"),
    utmTerm: pick("utm_term", "utmTerm"),
    utmContent: pick("utm_content", "utmContent"),
  };
}

export function formatSubmittedIst(date: Date): string {
  const formatted = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
  return `${formatted} IST`;
}

const PREFERRED_TIME_LABELS: Record<string, string> = {
  morning: "Morning (10–12 IST)",
  afternoon: "Afternoon (2–5 IST)",
  evening: "Evening (5–7 IST)",
};

export function preferredTimeLabel(value: string): string {
  return PREFERRED_TIME_LABELS[value] ?? value;
}

export type DemoNotificationInput = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  companyType: string | null;
  employeeBand: string | null;
  role: string | null;
  timeline: DemoTimeline | null;
  preferredDate: string;
  preferredTime: string;
  message: string;
  utmSource: string | null;
  utmCampaign: string | null;
  submittedAt: Date;
};

export type DemoNotificationEmail = {
  subject: string;
  text: string;
};

export function buildDemoNotificationEmail(input: DemoNotificationInput): DemoNotificationEmail {
  const company = input.company.trim() || "Demo request";
  const emailTimeline = timelineEmailLabel(input.timeline);
  const subject = emailTimeline
    ? `[Website] Demo request — ${company} (${emailTimeline})`
    : `[Website] Demo request — ${company}`;

  const preferredDate = input.preferredDate.trim() || "No preference given";
  const preferredTime = input.preferredTime.trim()
    ? preferredTimeLabel(input.preferredTime.trim())
    : "No preference given";
  const notes = input.message.trim() || "(none)";
  const source = input.utmSource?.trim() || "direct";
  const campaign = input.utmCampaign?.trim() || "-";

  const text = [
    "New demo request from the website",
    "",
    `Timeline: ${emailTimeline ?? "Not specified"}`,
    `Role: ${input.role?.trim() || "Not specified"}`,
    "",
    `Name: ${input.fullName.trim() || "-"}`,
    `Work email: ${input.email.trim() || "-"}`,
    `Phone: ${input.phone.trim() || "-"}`,
    `Company: ${company}`,
    `Company type: ${input.companyType?.trim() || "-"}`,
    `Team size: ${input.employeeBand?.trim() || "-"}`,
    "",
    `Preferred date: ${preferredDate}`,
    `Preferred time: ${preferredTime}`,
    "",
    "Notes:",
    notes,
    "",
    "---",
    `Source: ${source} / ${campaign}`,
    `Submitted: ${formatSubmittedIst(input.submittedAt)}`,
    `Reply directly to this email to respond to ${input.fullName.trim() || "the lead"} — replyTo is already set to their address.`,
  ].join("\n");

  return { subject, text };
}

export function buildDemoIntent(input: {
  preferredDate: string;
  preferredTime: string;
  message: string;
}): string | null {
  const parts = [
    input.preferredDate && `Preferred date: ${input.preferredDate}`,
    input.preferredTime && `Preferred time: ${preferredTimeLabel(input.preferredTime)}`,
    input.message && `Notes: ${input.message}`,
  ].filter(Boolean) as string[];
  return parts.length ? parts.join("\n") : null;
}
