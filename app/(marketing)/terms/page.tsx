import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";
import Link from "next/link";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Zoveto Terms of Service: SaaS usage, subscriptions, billing, acceptable use, liability, and account policies.",
  alternates: { canonical: canonicalUrl("/terms") },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms of Service" lastUpdated="April 2026">
      <section>
        <h2>1. Agreement and scope</h2>
        <p>
          These Terms of Service (“Terms”) govern access to and use of websites, applications, and services operated by{" "}
          <strong>Zoveto Technologies Private Limited</strong> (“Zoveto”, “we”). By using the Service, you agree to these
          Terms. If you do not agree, do not use the Service.
        </p>
        <p className="rounded-lg border border-border bg-card p-4 font-medium text-foreground">
          Zoveto provides software tools. Users are responsible for their data and operations.
        </p>
      </section>

      <section>
        <h2>2. The Service</h2>
        <p>
          Zoveto provides a cloud software platform (SaaS) for business operations, including modules and features
          described on our website or order form. We may update the Service from time to time. Certain features may be
          beta, preview, or subject to additional terms.
        </p>
        <p>
          Unless expressly stated in an order form, the Service is a standard multi-tenant SaaS offering and does not
          include custom development, legal advice, accounting advice, or managed operations services.
        </p>
      </section>

      <section>
        <h2>3. Accounts and security</h2>
        <p>
          You must provide accurate registration information and keep credentials confidential. You are responsible for
          activities under your account. Notify us promptly at <a href="mailto:security@zoveto.com">security@zoveto.com</a>{" "}
          if you suspect unauthorised access.
        </p>
      </section>

      <section>
        <h2>4. Acceptable use and customer responsibilities</h2>
        <p>You agree not to:</p>
        <ul>
          <li>use the Service in violation of law or third-party rights;</li>
          <li>probe, scan, or test the vulnerability of the Service without authorisation;</li>
          <li>interfere with or disrupt the integrity or performance of the Service;</li>
          <li>attempt to access another customer&apos;s data;</li>
          <li>reverse engineer the Service except where mandatory law permits.</li>
        </ul>
        <p>
          You remain responsible for your configuration, integrations, and how you use outputs from the Service (including
          AI-assisted features). You must maintain appropriate backups and internal controls.
        </p>
        <p>
          Additional use restrictions are set out in our <Link href="/acceptable-use">Acceptable Use Policy</Link>, which is
          incorporated into these Terms by reference.
        </p>
      </section>

      <section>
        <h2>5. Subscription and billing</h2>
        <p>
          Paid plans are billed in accordance with the plan you select (e.g. <strong>monthly subscription</strong>).
          Fees are charged in the currency shown at checkout (typically INR) and may be subject to applicable taxes.
        </p>
        <p>
          Unless stated otherwise on the checkout page or order form, <strong>subscriptions auto-renew</strong> for
          successive periods until you cancel in accordance with the cancellation process we provide. You authorise us and
          our payment partners to charge applicable fees on each billing cycle.
        </p>
        <p>
          <strong>Invoices</strong> are generated in the ordinary course after successful payment (or as otherwise stated
          for enterprise billing). You are responsible for providing accurate billing and GST details.
        </p>
        <p>
          Price changes, if any, will be communicated as required by law or your agreement. See also our{" "}
          <Link href="/pricing">pricing page</Link> for tax disclosures.
        </p>
        <p>
          Prices in INR are generally used for India-based entities. If an international billing currency is offered at
          signup or in an order form, that selected currency applies to future billing unless changed by written agreement.
          Currency is determined at signup and cannot be changed after first payment unless otherwise agreed in writing.
          All fees are exclusive of applicable taxes, duties, and levies.
        </p>
      </section>

      <section>
        <h2>6. Data responsibility</h2>
        <p>
          As between you and Zoveto, <strong>you control the business data</strong> you submit to the Service. You are
          responsible for the lawfulness of your processing, instructions to us, and your compliance with regulations
          applicable to your industry (including tax, employment, health, or sector-specific rules). Zoveto processes
          customer data as a processor or service provider in accordance with our agreement and{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          Where applicable for enterprise customers, data processing obligations are further governed by our{" "}
          <Link href="/dpa">Data Processing Agreement (DPA)</Link>.
        </p>
      </section>

      <section>
        <h2>7. Intellectual property</h2>
        <p>
          Zoveto retains all rights in the Service, software, branding, and documentation. Subject to these Terms, we
          grant you a limited, non-exclusive, non-transferable right to access and use the Service during your
          subscription. Your data remains yours.
        </p>
      </section>

      <section>
        <h2>8. Suspension and termination rights</h2>
        <p>
          We may <strong>suspend or restrict access</strong> if we reasonably believe you have violated these Terms, pose a
          security risk, or if required by law. You may stop using the Service at any time. Provisions that by their
          nature should survive (including liability limits, indemnities, and governing law) survive termination.
        </p>
        <p>
          Either party may terminate for material breach if the breach is not cured within a reasonable notice period. We
          may also terminate where required by law or for prolonged non-payment.
        </p>
      </section>

      <section>
        <h2>9. Service limitations, disclaimers, and liability</h2>
        <p>
          The Service is provided <strong>“as is”</strong> and <strong>“as available”</strong>. To the maximum extent
          permitted by law, we disclaim implied warranties of merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant that the Service will be uninterrupted or error-free.
        </p>
        <p>
          To the maximum extent permitted by law, <strong>Zoveto&apos;s total liability</strong> for any claim arising
          out of or related to the Service shall not exceed the greater of (a) the fees you paid to Zoveto for the
          Service in the three (3) months preceding the claim, or (b) INR 10,000. We are not liable for indirect,
          incidental, special, consequential, or punitive damages, or lost profits, data, or goodwill, even if advised of
          the possibility.
        </p>
        <p>Some jurisdictions do not allow certain limitations; in those cases our liability is limited to the fullest extent permitted.</p>
      </section>

      <section>
        <h2>10. Indemnity</h2>
        <p>
          You will defend and indemnify Zoveto and its affiliates, officers, and employees against third-party claims
          arising from your data, your use of the Service in breach of these Terms, or your violation of law.
        </p>
      </section>

      <section>
        <h2>11. Refund policy</h2>
        <p>
          Unless otherwise agreed in writing, <strong>fees are non-refundable</strong> except where mandatory consumer
          law requires otherwise. Free trials and promotional credits are governed by the terms shown at signup. If you
          believe you were charged in error, contact <a href="mailto:support@zoveto.com">support@zoveto.com</a> within 14
          days of the charge with supporting details.
        </p>
      </section>

      <section>
        <h2>12. International users</h2>
        <p>
          The Service may be accessed from outside India. You are responsible for compliance with local laws applicable to
          your use. Nothing in these Terms limits any non-waivable consumer or data protection rights available under
          applicable law.
        </p>
        <p>
          If you are located outside India, you agree to the jurisdiction of New Delhi courts for disputes related to these
          Terms, subject to any non-waivable statutory rights under your local consumer protection laws.
        </p>
        <p>
          You may not use Zoveto for purposes that are illegal under the laws of your country of residence or the Republic
          of India.
        </p>
      </section>

      <section>
        <h2>13. Governing law and dispute resolution</h2>
        <p>
          These Terms are governed by the laws of <strong>India</strong>. Courts at <strong>New Delhi, India</strong>{" "}
          shall have exclusive jurisdiction, subject to any non-waivable rights you may have under applicable law.
        </p>
        <p>
          Before filing a formal claim, the parties agree to attempt good-faith resolution by written notice to{" "}
          <a href="mailto:support@zoveto.com">support@zoveto.com</a> and allow at least 30 days for commercial resolution.
        </p>
      </section>

      <section>
        <h2>14. Related policies</h2>
        <ul>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
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
        <h2>15. Contact</h2>
        <p>
          Questions about these Terms: <a href="mailto:support@zoveto.com">support@zoveto.com</a>
        </p>
      </section>
    </LegalPageShell>
  );
}
