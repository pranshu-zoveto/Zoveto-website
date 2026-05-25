import { AuditLog, SystemSetting } from "@prisma/client";

export type { AuditLog, SystemSetting };

export interface SettingsDashboardData {
  settings: SystemSetting[];
  auditLogs: AuditLog[];
  envConfigs: Record<string, boolean>; // e.g., { hasGoogleAnalytics: true }
}

// Allowed setting keys that the UI can edit safely
export const ALLOWED_SETTINGS = [
  "site_name",
  "site_domain",
  "default_contact_email",
  "timezone",
  "date_format",
  "seo_default_title",
  "seo_default_description",
  "seo_keywords",
  "integration_google_analytics",
  "integration_posthog",
  "integration_sentry_dsn",
  "integration_cloudinary_url",
  "integration_calendly_url",
  "smtp_host",
  "smtp_user",
  "smtp_password",
  "security_session_timeout",
];
