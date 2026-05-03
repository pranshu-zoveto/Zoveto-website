/**
 * Builds the staff notification for POST /api/leads payloads (COS WebsiteLeadDto shape).
 * Used by the leads route before/after COS so info@zoveto.com still receives inbound leads when COS is down or unset.
 */

export const LEAD_STAFF_INBOX = "info@zoveto.com";

export type LeadSmtpPayload = {
  replyTo: string;
  subject: string;
  text: string;
};

/** Returns null when there is no usable subscriber email (SMTP still skipped; COS may validate separately). */
export function buildLeadSmtpPayload(body: Record<string, unknown>): LeadSmtpPayload | null {
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !email.includes("@")) return null;

  const org =
    typeof body.organization === "string" && body.organization.trim()
      ? body.organization.trim()
      : "Website lead";
  const fullName =
    typeof body.fullName === "string" && body.fullName.trim() ? body.fullName.trim() : "(not provided)";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const painPoint = typeof body.painPoint === "string" ? body.painPoint.trim() : "";

  const isFooterUpdates = painPoint.includes("footer_product_updates");
  const subject = isFooterUpdates
    ? `[Website] Product updates — ${email}`
    : `[Website] Lead — ${org}`;

  const text = [
    "New website lead (COS WebsiteLeadDto)",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Organization: ${org}`,
    `Phone: ${phone || "-"}`,
    "",
    "Notes / painPoint:",
    painPoint || "(none)",
  ].join("\n");

  return { replyTo: email, subject, text };
}
