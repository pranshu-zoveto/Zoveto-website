import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Subprocessors",
  description: "Current third-party subprocessors used by Zoveto for infrastructure, analytics, billing, and communication.",
  alternates: { canonical: canonicalUrl("/subprocessors") },
  robots: { index: true, follow: true },
};

type Subprocessor = {
  provider: string;
  purpose: string;
  region: string;
};

const SUBPROCESSORS: Subprocessor[] = [
  {
    provider: "Amazon Web Services (AWS)",
    purpose: "Cloud hosting, compute, storage, networking, and infrastructure operations",
    region: "Global infrastructure (region varies by deployment and service)",
  },
  {
    provider: "Google Analytics",
    purpose: "Website analytics and aggregate traffic insights (when analytics consent is enabled)",
    region: "Global",
  },
  {
    provider: "Microsoft Clarity",
    purpose:
      "Website session replay, heatmaps, and behavioral diagnostics on the marketing site (when analytics consent is enabled)",
    region: "Global",
  },
  {
    provider: "Razorpay",
    purpose: "Payment processing, billing workflows, and transaction records",
    region: "India / Global depending on payment flow",
  },
  {
    provider: "Google (Gmail SMTP)",
    purpose: "Transactional email delivery and account/service communication",
    region: "Global",
  },
];

export default function SubprocessorsPage() {
  return (
    <LegalPageShell title="Subprocessors" lastUpdated="April 2026">
      <section>
        <h2>1. Overview</h2>
        <p>
          This page lists core subprocessors used to operate Zoveto services. We review vendors for security and operational
          suitability and use contractual controls aligned with applicable law.
        </p>
      </section>

      <section>
        <h2>2. Current subprocessors</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="bg-muted/30">
                <th className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground">Provider</th>
                <th className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground">Purpose</th>
                <th className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground">Region</th>
              </tr>
            </thead>
            <tbody>
              {SUBPROCESSORS.map((item) => (
                <tr key={item.provider} className="align-top">
                  <td className="border-b border-border px-4 py-3 text-sm text-foreground">{item.provider}</td>
                  <td className="border-b border-border px-4 py-3 text-sm text-muted">{item.purpose}</td>
                  <td className="border-b border-border px-4 py-3 text-sm text-muted">{item.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>3. Change management</h2>
        <p>
          We may update this list as our infrastructure and service providers evolve. Material changes are reflected on this
          page and governed by applicable agreements.
        </p>
      </section>

      <section>
        <h2>4. Related policies</h2>
        <ul>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/dpa">Data Processing Agreement</Link>
          </li>
          <li>
            <Link href="/security">Security &amp; Data Protection</Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Contact</h2>
        <p>
          Questions about subprocessors: <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a>
        </p>
      </section>
    </LegalPageShell>
  );
}
