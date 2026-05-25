import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";
import Link from "next/link";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Zoveto Privacy Policy: how we collect, use, store, and protect personal and business data. GDPR and DPDP-aligned practices.",
  alternates: { canonical: canonicalUrl("/privacy") },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy Policy" lastUpdated="April 2026">
      <section>
        <h2 id="controller">1. Who we are</h2>
        <p>
          <strong>Zoveto Technologies Private Limited</strong> (“Zoveto”, “we”, “us”) provides the Zoveto software
          platform and related services. This policy describes how we process personal and account-related information when
          you use our website and services.
        </p>
        <p>
          For privacy requests and data rights:{" "}
          <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a>
        </p>
      </section>

      <section>
        <h2 id="data-we-collect">2. Data we collect</h2>
        <p>Depending on how you interact with Zoveto, we may process:</p>
        <ul>
          <li>
            <strong>Account data:</strong> email address, name, company name, phone number where provided, and
            credentials (passwords are stored using strong one-way hashing; we never store them in plain text).
          </li>
          <li>
            <strong>Usage data:</strong> product and website interactions, diagnostic and security logs, approximate
            device/browser metadata, and session information needed to operate and secure the service.
          </li>
          <li>
            <strong>Billing and tax data:</strong> billing contact details, GST identification where applicable, invoice
            metadata, and payment references. Card or UPI payment details are handled by our payment service provider; we
            do not store full card numbers.
          </li>
          <li>
            <strong>Operational business data you enter:</strong> inventory, orders, invoices, and other records you
            choose to process in the platform (processed on your instructions as part of the service).
          </li>
          <li>
            <strong>Workforce and customer records submitted by clients:</strong> employee role/contact records and customer
            contact/order records where clients choose to store and process them in Zoveto.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="purposes">3. Purposes of processing</h2>
        <p>We use data to:</p>
        <ul>
          <li>Provide, operate, maintain, and secure the Zoveto platform;</li>
          <li>Authenticate users, prevent fraud and abuse, and enforce our terms;</li>
          <li>Bill subscriptions, issue tax-compliant invoices, and meet accounting obligations;</li>
          <li>Improve reliability and performance using aggregated or de-identified analytics where permitted;</li>
          <li>Comply with applicable law and respond to lawful requests.</li>
        </ul>
        <p>
          We do <strong>not</strong> sell your personal data. We do not use your confidential business records to train
          third-party AI models unless we have a clear legal basis and, where required, your explicit agreement.
        </p>
      </section>

      <section>
        <h2 id="storage">4. Where data is stored</h2>
        <p>
          Zoveto hosts production workloads on <strong>Amazon Web Services (AWS)</strong> infrastructure, with
          encryption in transit (TLS) and encryption at rest for core data stores. Backup and retention policies are
          applied in line with our security programme and contractual commitments.
        </p>
        <p>
          Data may be processed in data centres outside your country of residence when required for infrastructure,
          resilience, support, or service delivery. We apply appropriate contractual and technical safeguards required by
          applicable law.
        </p>
      </section>

      <section>
        <h2 id="third-parties">5. Third-party services</h2>
        <p>We use a limited set of processors and infrastructure providers, including:</p>
        <ul>
          <li>
            <strong>AWS</strong>: cloud hosting, storage, networking, and related operational services;
          </li>
          <li>
            <strong>Payment providers</strong>: to collect subscription payments and issue receipts (their privacy notices
            apply to payment fields they collect directly);
          </li>
          <li>
            <strong>Analytics</strong>: where enabled and only if you consent (e.g. Google Analytics, Microsoft Clarity),
            to understand aggregated traffic and UX diagnostics on our marketing site.
          </li>
          <li>
            <strong>Communication providers</strong>: transactional email services (including Google Gmail SMTP), for account
            notifications and service communication.
          </li>
        </ul>
        <p>
          A current list of material sub-processors is available at <Link href="/subprocessors">/subprocessors</Link>.
          Sub-processor updates are governed by our agreements and applicable law.
        </p>
      </section>

      <section id="cookies">
        <h2>6. Cookies and similar technologies</h2>
        <p>
          We use cookies and local storage where necessary to run the site securely. Optional categories (analytics,
          marketing) are only used with your consent. You can change your choices at any time using{" "}
          <strong>Manage cookies</strong> on this website. For more detail, see our cookie controls and{" "}
          <Link href="/terms">Terms of Service</Link>.
        </p>
      </section>

      <section>
        <h2 id="retention">7. Retention</h2>
        <p>
          We retain information for as long as needed to provide the service, comply with law, resolve disputes, and
          enforce agreements. Tax, invoicing, and accounting records (including GST-related information) may be retained
          for periods required under Indian tax and company law. After account termination, operational copies are deleted
          or anonymised according to our retention schedule, subject to legal holds and statutory retention.
        </p>
        <ul>
          <li>
            <strong>Account profile data:</strong> retained while your account is active and for a limited period after
            closure for support, audit, and legal purposes.
          </li>
          <li>
            <strong>Billing and tax records:</strong> retained as required under applicable tax and corporate law.
          </li>
          <li>
            <strong>Security and audit logs:</strong> retained for security operations, abuse prevention, and incident
            response obligations.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="rights">8. Your rights</h2>
        <p>
          Depending on your jurisdiction (including GDPR and India&apos;s Digital Personal Data Protection Act, 2023),
          you may have rights to <strong>access</strong>, <strong>correct</strong>, <strong>update</strong>, or{" "}
          <strong>delete</strong> certain personal data, and to <strong>withdraw consent</strong> where processing is
          consent-based. You may also have rights to portability or to object to certain processing.
        </p>
        <p>
          To exercise your rights, contact <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a>. We will verify your
          request and respond within a reasonable period as required by law, typically within 30 days.
        </p>
        <ul>
          <li>
            <strong>EU/EEA (GDPR):</strong> rights may include access, rectification, erasure, restriction, objection, and
            portability.
          </li>
          <li>
            <strong>India (DPDP Act 2023):</strong> rights may include access, correction, erasure, grievance redressal, and
            nomination.
          </li>
          <li>
            <strong>California (CCPA/CPRA framework):</strong> rights may include access, deletion, and choices around data
            sharing where applicable.
          </li>
          <li>
            <strong>Other regions:</strong> contact <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a> for rights
            available under applicable local law.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="transfers">9. International transfers</h2>
        <p>
          Where personal data is transferred outside India or your country, we implement appropriate safeguards (such as
          contractual clauses and technical measures) consistent with applicable regulations.
        </p>
      </section>

      <section>
        <h2 id="children">10. Children</h2>
        <p>
          Zoveto is a business platform not intended for children. We do not knowingly collect personal data from anyone
          under 18. If you believe we have collected data from a minor, contact us at{" "}
          <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a>.
        </p>
      </section>

      <section>
        <h2 id="changes">11. Changes</h2>
        <p>
          We may update this Privacy Policy from time to time. Material changes will be communicated as required by law
          (for example, by email or an in-product notice). Continued use after the effective date constitutes acceptance of
          the updated policy where permitted.
        </p>
      </section>

      <section>
        <h2 id="related">12. Related policies</h2>
        <ul>
          <li>
            <Link href="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </li>
          <li>
            <Link href="/dpa">Data Processing Agreement</Link>
          </li>
          <li>
            <Link href="/acceptable-use">Acceptable Use Policy</Link>
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
        <h2 id="contact">13. Contact</h2>
        <p>
          <strong>Zoveto Technologies Private Limited</strong>
          <br />
          Privacy and data rights: <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a>
          <br />
          Security and compliance requests: <a href="mailto:security@zoveto.com">security@zoveto.com</a>
        </p>
      </section>
    </LegalPageShell>
  );
}
