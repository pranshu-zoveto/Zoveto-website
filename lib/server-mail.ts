import nodemailer from "nodemailer";
import { LEAD_STAFF_INBOX } from "@/lib/lead-intake-mail";

type FormMailInput = {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

let cachedTransporter: nodemailer.Transporter | null = null;

function readSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.MAIL_FROM?.trim();
  const secure = process.env.SMTP_SECURE === "true";
  const port = Number.parseInt(portRaw || "", 10);

  if (!host || !Number.isFinite(port) || !user || !pass || !from) return null;

  return { host, port, user, pass, from, secure };
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
