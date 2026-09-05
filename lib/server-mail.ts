import nodemailer from "nodemailer";
import { LEAD_STAFF_INBOX } from "@/lib/lead-intake-mail";

type FormMailInput = {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  secure: boolean;
};

export const SMTP_REQUIRED_KEYS = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_FROM"] as const;

let cachedTransporter: nodemailer.Transporter | null = null;

export function missingSmtpEnvKeys(env: NodeJS.ProcessEnv = process.env): string[] {
  const missing = SMTP_REQUIRED_KEYS.filter((key) => !env[key]?.trim());
  const portRaw = env.SMTP_PORT?.trim() || "";
  const port = Number.parseInt(portRaw, 10);
  if (portRaw && !Number.isFinite(port) && !missing.includes("SMTP_PORT")) {
    return [...missing, "SMTP_PORT"];
  }
  return missing;
}

export function readSmtpConfig(env: NodeJS.ProcessEnv = process.env): SmtpConfig | null {
  const host = env.SMTP_HOST?.trim();
  const portRaw = env.SMTP_PORT?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS?.trim();
  const from = env.MAIL_FROM?.trim();
  const secure = env.SMTP_SECURE === "true";
  const port = Number.parseInt(portRaw || "", 10);

  if (!host || !Number.isFinite(port) || !user || !pass || !from) return null;

  return { host, port, user, pass, from, secure };
}

export function isSmtpConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  return readSmtpConfig(env) !== null;
}

export function buildSmtpMissingConfigWarning(env: NodeJS.ProcessEnv = process.env): string | null {
  if (readSmtpConfig(env)) return null;
  const missing = missingSmtpEnvKeys(env);
  const missingLine = missing.length
    ? `Missing or invalid: ${missing.join(", ")}.`
    : "SMTP_PORT must be a valid number.";
  return [
    "================================================================================",
    "[zoveto] SMTP IS NOT CONFIGURED",
    "Demo request emails to info@zoveto.com will not send.",
    missingLine,
    "Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and MAIL_FROM in the production environment and redeploy.",
    "Google Workspace: SMTP_HOST=smtp.gmail.com SMTP_PORT=587 SMTP_SECURE=false MAIL_FROM=Zoveto <info@zoveto.com>",
    "================================================================================",
  ].join("\n");
}

/** Loud process-start warning. Call from instrumentation.ts, not buried in a request handler. */
export function warnIfSmtpUnconfigured(env: NodeJS.ProcessEnv = process.env): void {
  const warning = buildSmtpMissingConfigWarning(env);
  if (warning) console.error(warning);
}

function getTransporter(): { transporter: nodemailer.Transporter; from: string } | null {
  const cfg = readSmtpConfig();
  if (!cfg) return null;
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: {
        user: cfg.user,
        pass: cfg.pass,
      },
    });
  }
  return { transporter: cachedTransporter, from: cfg.from };
}

export async function sendFormNotificationEmail(input: FormMailInput): Promise<{ sent: boolean; reason?: string }> {
  const mail = getTransporter();
  if (!mail) {
    const warning = buildSmtpMissingConfigWarning();
    if (warning) console.error(warning);
    return { sent: false, reason: "SMTP env vars missing" };
  }

  try {
    await mail.transporter.sendMail({
      from: mail.from,
      to: LEAD_STAFF_INBOX,
      replyTo: input.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });
    return { sent: true };
  } catch (err) {
    console.error("[server-mail] SMTP send failed", err);
    return { sent: false, reason: "SMTP send failed" };
  }
}
