import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Zoveto uses cookies, analytics, and consent controls on our website and services.",
  alternates: { canonical: canonicalUrl("/cookie-policy") },
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageShell title="Cookie Policy" lastUpdated="April 2026">
      <section>
        <h2>1. Scope</h2>
        <p>
          This Cookie Policy explains how Zoveto uses cookies and similar technologies on our website and related services.
          It should be read together with our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section>
        <h2>2. Cookie categories we use</h2>
        <ul>
          <li>
            <strong>Necessary cookies:</strong> required for core website operations, security, and session integrity.
          </li>
          <li>
            <strong>Analytics cookies:</strong> used only with your consent to understand aggregate traffic and site
            performance (for example, Google Analytics).
          </li>
          <li>
            <strong>Marketing/attribution storage:</strong> used only with your consent for campaign attribution and
            measurement (for example, UTM tracking).
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Consent choices</h2>
        <p>Our cookie controls provide three actions:</p>
        <ul>
          <li>
            <strong>Reject all</strong> - only necessary cookies remain active.
          </li>
          <li>
            <strong>Customize</strong> - choose analytics and/or marketing categories.
          </li>
          <li>
            <strong>Accept all</strong> - allows necessary, analytics, and marketing categories.
          </li>
        </ul>
        <p>Optional categories are disabled by default until you provide consent.</p>
      </section>

      <section>
        <h2>4. Managing or withdrawing consent</h2>
        <p>
          You can update your choices any time using the <strong>Manage cookies</strong> control on the website. Your
          updated choice is applied to future processing and stored as a first-party preference.
        </p>
      </section>

      <section>
        <h2>5. Browser controls</h2>
        <p>
          Most browsers let you block or delete cookies from site settings. Blocking necessary cookies may affect website
          functionality. Browser-level controls apply per browser and device.
        </p>
      </section>

      <section>
        <h2>6. Related policies</h2>
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
        <h2>7. Contact</h2>
        <p>
          Questions about cookies or consent: <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a>
        </p>
      </section>
    </LegalPageShell>
  );
}
