import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Security at Zoveto | Infrastructure, Compliance, Data Protection",
  description:
    "Security at Zoveto: infrastructure safeguards, access controls, data ownership, compliance posture, and responsible disclosure.",
  alternates: { canonical: canonicalUrl("/security") },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Security at Zoveto | Infrastructure, Compliance, Data Protection",
    description:
      "Security, privacy posture, subprocessors, and legal safeguards for teams evaluating Zoveto.",
    url: canonicalUrl("/security"),
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security at Zoveto | Infrastructure, Compliance, Data Protection",
    description: "Security and compliance details for Zoveto.",
    images: ["/og-image.png"],
  },
};

export default function SecurityPage() {
  return (
    <LegalPageShell title="Security at Zoveto" lastUpdated="April 2026">
      <section>
        <h2>1. Overview</h2>
        <p>
          Zoveto is built for operational reliability, data security, and system integrity. This trust center summarizes how
          we protect systems, process data, and document legal safeguards in practical terms.
        </p>
      </section>

      <section>
        <h2>2. Security</h2>
        <ul>
          <li>
            <strong>Infrastructure:</strong> production services run on Amazon Web Services (AWS).
          </li>
          <li>
            <strong>In transit:</strong> TLS is used for data exchanged between clients, APIs, and service endpoints.
          </li>
          <li>
            <strong>At rest:</strong> core data stores use encryption-at-rest controls.
          </li>
          <li>
            <strong>Access control:</strong> role-based access controls (RBAC) and least-privilege access practices.
          </li>
          <li>
            <strong>Audit logs:</strong> operational and security events are logged for investigation and reliability.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Data &amp; privacy</h2>
        <ul>
          <li>
            <strong>What we collect:</strong> account, usage, billing, and operational business data required to deliver the
            service.
          </li>
          <li>
            <strong>How we use data:</strong> service delivery, security, support, billing, and platform reliability.
          </li>
          <li>
            <strong>Data ownership:</strong> customer data belongs to the customer; Zoveto processes it to provide the
            contracted service.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Subprocessors</h2>
        <ul>
          <li>Amazon Web Services (AWS) - cloud infrastructure hosting.</li>
          <li>Google (Gmail SMTP) - transactional and operational email delivery.</li>
          <li>Google Analytics - website analytics when consent is enabled.</li>
          <li>Microsoft Clarity - session replay and behavioral diagnostics when analytics consent is enabled.</li>
          <li>Razorpay - payment processing and billing transactions.</li>
        </ul>
        <p>
          Full details are maintained on the <Link href="/subprocessors">Subprocessors</Link> page.
        </p>
      </section>

      <section>
        <h2>5. Compliance posture</h2>
        <p>
          Zoveto is built following industry best practices for SaaS security and data protection, including controls aligned
          to India&apos;s DPDP Act 2023 and IT Act obligations, and GDPR-ready processing standards for international customers.
          We do not claim SOC 2 or equivalent certifications unless officially completed and publicly announced.
        </p>
      </section>

      <section>
        <h2>6. Data ownership and export</h2>
        <p>
          Customer data remains the customer&apos;s data. On eligible plans, customers may request exports of operational data
          in standard machine-readable formats to support migration, analytics, and continuity requirements.
        </p>
      </section>

      <section>
        <h2>7. Uptime and SLA by plan</h2>
        <ul>
          <li>
            <strong>Free / evaluation:</strong> best-effort availability, no formal SLA.
          </li>
          <li>
            <strong>Starter / Growth:</strong> standard production operations with priority incident response.
          </li>
          <li>
            <strong>Enterprise:</strong> contract-defined SLA and response commitments via order form.
          </li>
        </ul>
      </section>

      <section>
        <h2>8. Legal documents</h2>
        <ul>
          <li>
            <Link href="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/dpa">Data Processing Agreement (DPA)</Link>
          </li>
          <li>
            <Link href="/acceptable-use">Acceptable Use Policy</Link>
          </li>
          <li>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>9. Responsible disclosure</h2>
        <p>
          If you identify a potential vulnerability, report it to{" "}
          <a href="mailto:security@zoveto.com">security@zoveto.com</a> with reproducible details. We review good-faith reports
          and triage based on severity.
        </p>
      </section>
    </LegalPageShell>
  );
}
