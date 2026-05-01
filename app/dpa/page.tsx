import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Data Processing Agreement (DPA)",
  description:
    "Zoveto Data Processing Agreement covering controller-processor roles, security measures, incident notice, and subprocessors.",
  alternates: { canonical: canonicalUrl("/dpa") },
  robots: { index: true, follow: true },
};

export default function DpaPage() {
  return (
    <LegalPageShell title="Data Processing Agreement (DPA)" lastUpdated="April 2026">
      <section>
        <h2>1. Roles and scope</h2>
        <p>
          This DPA applies when a customer uses Zoveto to process personal data under applicable data protection law.
          Unless otherwise agreed in writing:
        </p>
        <ul>
          <li>
            <strong>Customer</strong> acts as the data controller (or business).
          </li>
          <li>
            <strong>Zoveto</strong> acts as the data processor (or service provider).
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Processing instructions</h2>
        <p>
          Zoveto processes personal data only on documented customer instructions, including configuration and user actions
          performed by authorized customer users in the Service.
        </p>
      </section>

      <section>
        <h2>3. Data handling commitments</h2>
        <ul>
          <li>Process data for service delivery, support, reliability, and security operations.</li>
          <li>Ensure personnel access is limited to need-to-know and bound by confidentiality obligations.</li>
          <li>Assist customers with reasonable requests related to data subject rights handling.</li>
        </ul>
      </section>

      <section>
        <h2>4. Security measures</h2>
        <ul>
          <li>Encryption in transit (TLS) and encryption at rest for core production systems.</li>
          <li>Role-based access controls and authentication controls for internal systems.</li>
          <li>Logging and monitoring for operational and security events.</li>
          <li>Backup and recovery controls aligned to service reliability needs.</li>
        </ul>
      </section>

      <section>
        <h2>5. Subprocessors</h2>
        <p>
          Customer authorizes use of subprocessors required to deliver the Service. Current subprocessors are listed at{" "}
          <Link href="/subprocessors">/subprocessors</Link>. Zoveto remains responsible for subprocessors used for processing
          under this DPA.
        </p>
      </section>

      <section>
        <h2>6. Incident and breach notification</h2>
        <p>
          If Zoveto becomes aware of a confirmed personal data breach affecting customer data, Zoveto will notify the
          customer without undue delay and provide available information necessary for customer response obligations.
        </p>
      </section>

      <section>
        <h2>7. International transfers</h2>
        <p>
          Where personal data is transferred across borders, Zoveto applies contractual and technical safeguards required by
          applicable law.
        </p>
      </section>

      <section>
        <h2>8. Return and deletion</h2>
        <p>
          On account termination, customer data is returned or deleted according to service functionality, retention policy,
          and legal obligations, unless retention is required by law.
        </p>
      </section>

      <section>
        <h2>9. Related policies</h2>
        <ul>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link href="/security">Security &amp; Data Protection</Link>
          </li>
          <li>
            <Link href="/subprocessors">Subprocessors</Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>10. Contact</h2>
        <p>
          DPA and enterprise privacy requests: <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a>
        </p>
      </section>
    </LegalPageShell>
  );
}
