import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description: "Rules for lawful and secure use of Zoveto services.",
  alternates: { canonical: canonicalUrl("/acceptable-use") },
  robots: { index: true, follow: true },
};

export default function AcceptableUsePage() {
  return (
    <LegalPageShell title="Acceptable Use Policy" lastUpdated="April 2026">
      <section>
        <h2>1. Purpose</h2>
        <p>
          This policy defines prohibited behavior when using Zoveto services. It is part of the{" "}
          <Link href="/terms">Terms of Service</Link>.
        </p>
      </section>

      <section>
        <h2>2. Prohibited activities</h2>
        <p>You may not use Zoveto to:</p>
        <ul>
          <li>violate any applicable law, regulation, or third-party right;</li>
          <li>store or distribute malware, ransomware, or malicious code;</li>
          <li>attempt unauthorized access to systems, data, or accounts;</li>
          <li>perform abusive scanning, scraping, or denial-of-service activity;</li>
          <li>conduct fraud, impersonation, or deceptive commercial practices;</li>
          <li>process data you do not have legal rights to use;</li>
          <li>circumvent service limits, billing controls, or security safeguards.</li>
        </ul>
      </section>

      <section>
        <h2>3. AI and automation misuse</h2>
        <ul>
          <li>Do not use automated workflows to generate unlawful, harmful, or deceptive outputs.</li>
          <li>Do not use the platform to conduct phishing, social engineering, or identity abuse.</li>
          <li>Do not submit highly sensitive categories of personal data unless your agreement allows it.</li>
        </ul>
      </section>

      <section>
        <h2>4. Enforcement</h2>
        <p>
          If we reasonably suspect policy violations, we may throttle, suspend, or terminate access, or remove harmful
          content where legally required. Serious abuse may be reported to relevant authorities.
        </p>
      </section>

      <section>
        <h2>5. Related policies</h2>
        <ul>
          <li>
            <Link href="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/security">Security &amp; Data Protection</Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Contact</h2>
        <p>
          Abuse and policy reports: <a href="mailto:security@zoveto.com">security@zoveto.com</a>
        </p>
      </section>
    </LegalPageShell>
  );
}
