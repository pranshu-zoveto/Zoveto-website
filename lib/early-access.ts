export type EarlyAccessSignupInput = {
  fullName: string;
  email: string;
  companyName: string;
  role: string;
  teamSize: string;
  useCase: string;
  phone?: string;
};

export type EarlyAccessLeadPayload = {
  fullName: string;
  email: string;
  organization: string;
  phone?: string;
  painPoint: string;
};

export function normalizeEarlyAccessSignup(raw: unknown): EarlyAccessSignupInput | null {
  if (typeof raw !== "object" || raw === null) return null;
  const body = raw as Record<string, unknown>;
  const str = (key: string) => (typeof body[key] === "string" ? body[key].trim() : "");
  return {
    fullName: str("fullName"),
    email: str("email"),
    companyName: str("companyName"),
    role: str("role"),
    teamSize: str("teamSize"),
    useCase: str("useCase"),
    phone: str("phone") || undefined,
  };
}

export function hasRequiredEarlyAccessFields(input: EarlyAccessSignupInput): boolean {
  return Boolean(
    input.fullName &&
      input.email &&
      input.companyName &&
      input.role &&
      input.teamSize &&
      input.useCase,
  );
}

export function buildEarlyAccessLeadPayload(input: EarlyAccessSignupInput): EarlyAccessLeadPayload {
  const notes = [
    "Early access waitlist request",
    "Source: early_access_waitlist",
    "Status: waitlist_pending",
    "Qualification: founder_review_required",
    `Role: ${input.role}`,
    `Team size: ${input.teamSize}`,
    `Priority: ${input.useCase}`,
    "Notify: info@zoveto.com",
    "Access policy: do not provision workspace automatically. Founder approval required before onboarding.",
  ];

  return {
    fullName: input.fullName.slice(0, 200),
    email: input.email,
    organization: input.companyName.slice(0, 200),
    phone: input.phone,
    painPoint: notes.join("\n").slice(0, 10000),
  };
}
