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

const GRIEVANCE_OFFICER = {
  name: "Mehta Gourvansh Raina",
  role: "Grievance Officer",
  email: "privacy@zoveto.com",
  address: "Zoveto Technologies, India",
} as const;

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      lastUpdated="April 2026"
      pdfHref="/legal/zoveto-privacy-policy-april-2026.pdf"
    >
      <section>
        <h2 id="controller">1. Who we are</h2>
        <p>
          <strong>Zoveto Technologies</strong> (“Zoveto”, “we”, “us”) provides the Zoveto software
          platform and related services. This policy describes how we process personal and account-related information when
          you use our website and services.
        </p>
        <p>
          For users in India, Zoveto acts as a <strong>Data Fiduciary</strong> when we determine the purpose and means of
          processing your personal data in connection with our website, accounts, billing, and service operations. You are the{" "}
          <strong>Data Principal</strong> for personal data about you. Where you use Zoveto to process your employees&apos;,
          customers&apos;, or other third parties&apos; data, you are generally the Data Fiduciary for that data and Zoveto
          processes it on your instructions as described in our <Link href="/dpa">Data Processing Agreement</Link>.
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
            <strong>Marketing, demo, and contact data:</strong> information submitted through website forms, demo requests,
            email, phone, WhatsApp, or other business contact channels.
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
            <strong>Analytics</strong>: where enabled and only if you consent (e.g. Google Analytics, Google Tag Manager, Microsoft Clarity),
            to understand aggregated traffic and UX diagnostics on our marketing site.
          </li>
          <li>
            <strong>Advertising</strong>: where enabled and only if you consent to marketing cookies (Google Ads),
            to measure ad campaigns and conversions on our marketing site.
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
          enforce agreements. After account termination, operational copies are deleted or anonymised according to the
          schedule below, subject to legal holds and statutory retention.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="px-4 py-3 text-sm font-semibold text-foreground">Data category</th>
                <th className="px-4 py-3 text-sm font-semibold text-foreground">Typical retention period</th>
                <th className="px-4 py-3 text-sm font-semibold text-foreground">Notes</th>
              </tr>
            </thead>
            <tbody className="text-sm text-muted">
              <tr className="border-b border-border align-top">
                <td className="px-4 py-3 font-medium text-foreground">Account profile and credentials</td>
                <td className="px-4 py-3">While active, then up to 12 months after closure</td>
                <td className="px-4 py-3">Deleted or anonymised unless a longer period is required for support, audit, or legal claims.</td>
              </tr>
              <tr className="border-b border-border align-top">
                <td className="px-4 py-3 font-medium text-foreground">Billing, invoices, and GST records</td>
                <td className="px-4 py-3">Up to 8 years from the relevant financial year</td>
                <td className="px-4 py-3">Retained as required under applicable Indian tax, accounting, and company law.</td>
              </tr>
              <tr className="border-b border-border align-top">
                <td className="px-4 py-3 font-medium text-foreground">Security, access, and audit logs</td>
                <td className="px-4 py-3">Up to 24 months</td>
                <td className="px-4 py-3">Used for security operations, abuse prevention, and incident investigation.</td>
              </tr>
              <tr className="border-b border-border align-top">
                <td className="px-4 py-3 font-medium text-foreground">Support and grievance correspondence</td>
                <td className="px-4 py-3">Up to 3 years from last contact</td>
                <td className="px-4 py-3">Retained to resolve requests and demonstrate compliance with redressal obligations.</td>
              </tr>
              <tr className="border-b border-border align-top">
                <td className="px-4 py-3 font-medium text-foreground">Marketing-site analytics (consent-based)</td>
                <td className="px-4 py-3">Until consent is withdrawn, then up to 30 days</td>
                <td className="px-4 py-3">Applies only where optional analytics cookies or similar technologies are enabled with consent.</td>
              </tr>
              <tr className="align-top">
                <td className="px-4 py-3 font-medium text-foreground">Operational business data you enter</td>
                <td className="px-4 py-3">While your subscription is active, then per export and deletion terms</td>
                <td className="px-4 py-3">You control business records in the platform; export and deletion timelines follow your plan and our Terms.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 id="rights">8. Your rights</h2>
        <p>
          Depending on your jurisdiction (including GDPR and India&apos;s Digital Personal Data Protection Act, 2023),
          you may have rights to <strong>access</strong>, <strong>correct</strong>, <strong>update</strong>, or{" "}
          <strong>delete</strong> certain personal data, and to <strong>withdraw consent</strong> where processing is
          consent-based. You may also have rights to portability, nomination, grievance redressal, or to object to certain
          processing.
        </p>
        <p>
          <strong>Consent withdrawal:</strong> Where we rely on your consent (for example, optional analytics cookies on our
          marketing site), you may withdraw consent at any time using <strong>Manage cookies</strong> on this website or by
          emailing <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a>. Withdrawal does not affect processing that
          was lawful before withdrawal, and we may continue processing where another legal basis applies (such as contract
          performance, legal obligation, or legitimate uses permitted under applicable law).
        </p>
        <p>
          <strong>Nomination:</strong> If you are a Data Principal in India, you may nominate another individual to exercise
          your rights under the DPDP Act in the event of your death or incapacity. Send the nomination in writing to{" "}
          <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a> with sufficient details for us to verify and record it.
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
            nomination. See section 9 below for additional India-specific information.
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
        <h2 id="dpdp-india">9. India: Digital Personal Data Protection Act, 2023</h2>
        <p>
          This section supplements the rest of this policy for individuals whose personal data is processed under India&apos;s
          Digital Personal Data Protection Act, 2023 (“DPDP Act”). It is intended to support transparency and readiness. It
          does not by itself certify full legal compliance with every DPDP obligation.
        </p>
        <p>
          Zoveto processes personal data for lawful purposes connected with providing and improving the Service, securing
          accounts, billing, support, and compliance. We seek consent where required, and otherwise process personal data on
          permitted grounds under applicable law, including contract necessity and legitimate uses recognised by the DPDP Act.
        </p>
        <p>As a Data Principal in India, you may have the right to:</p>
        <ul>
          <li>obtain information about the personal data we process about you and how it is used;</li>
          <li>seek correction, completion, updating, or erasure of personal data where applicable;</li>
          <li>withdraw consent for consent-based processing, subject to legal and contractual limits;</li>
          <li>nominate another person to exercise your rights in the event of death or incapacity;</li>
          <li>raise a grievance with Zoveto and, where applicable, escalate unresolved concerns through lawful channels.</li>
        </ul>
        <p>
          We implement reasonable technical and organisational measures to protect personal data. If you believe our
          processing violates applicable law, contact us first at{" "}
          <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a> or through the grievance process in section 10.
        </p>
      </section>

      <section>
        <h2 id="grievance">10. Grievance officer and redressal</h2>
        <p>
          In accordance with India&apos;s DPDP Act framework, Zoveto has appointed a Grievance Officer to address Data
          Principal complaints relating to our processing of personal data.
        </p>
        <ul>
          <li>
            <strong>Name:</strong> {GRIEVANCE_OFFICER.name}
          </li>
          <li>
            <strong>Role:</strong> {GRIEVANCE_OFFICER.role}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${GRIEVANCE_OFFICER.email}`}>{GRIEVANCE_OFFICER.email}</a>
          </li>
          <li>
            <strong>Address:</strong> {GRIEVANCE_OFFICER.address}
          </li>
        </ul>
        <p>
          To lodge a grievance, email <a href={`mailto:${GRIEVANCE_OFFICER.email}`}>{GRIEVANCE_OFFICER.email}</a> with your
          name, contact details, a clear description of the issue, and any supporting information. We will acknowledge
          receipt within a reasonable time and aim to resolve grievances within <strong>thirty (30) days</strong> of receipt,
          unless a longer period is permitted by applicable law or more time is reasonably required because of the complexity
          of the request.
        </p>
        <p>
          If your grievance is not resolved to your satisfaction through this process, you may have additional remedies
          available under applicable law, including escalation to the Data Protection Board of India once operational and as
          permitted by law.
        </p>
      </section>

      <section>
        <h2 id="transfers">11. International transfers</h2>
        <p>
          Where personal data is transferred outside India or your country, we implement appropriate safeguards (such as
          contractual clauses and technical measures) consistent with applicable regulations.
        </p>
      </section>

      <section>
        <h2 id="children">12. Children</h2>
        <p>
          Zoveto is a business platform not intended for children. We do not knowingly collect personal data from anyone
          under 18. If you believe we have collected data from a minor, contact us at{" "}
          <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a>.
        </p>
      </section>

      <section>
        <h2 id="changes">13. Changes</h2>
        <p>
          We may update this Privacy Policy from time to time. Material changes will be communicated as required by law
          (for example, by email or an in-product notice). Continued use after the effective date constitutes acceptance of
          the updated policy where permitted.
        </p>
      </section>

      <section>
        <h2 id="related">14. Related policies</h2>
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
        <h2 id="contact">15. Contact</h2>
        <p>
          <strong>Zoveto Technologies</strong>
          <br />
          Privacy and data rights: <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a>
          <br />
          Grievance Officer: {GRIEVANCE_OFFICER.name} —{" "}
          <a href={`mailto:${GRIEVANCE_OFFICER.email}`}>{GRIEVANCE_OFFICER.email}</a>
          <br />
          Security and compliance requests: <a href="mailto:security@zoveto.com">security@zoveto.com</a>
        </p>
      </section>
    </LegalPageShell>
  );
}
