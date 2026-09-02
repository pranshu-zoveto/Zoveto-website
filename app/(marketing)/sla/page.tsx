import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Service Level Agreement | Zoveto",
  description:
    "Review Zoveto's Service Level Agreement covering uptime, support priorities, response targets, service credits, maintenance, monitoring, and exclusions.",
  alternates: { canonical: canonicalUrl("/sla") },
  robots: { index: true, follow: true },
};

const SUPPORT_TIERS = [
  {
    plan: "Free / Evaluation",
    channel: "Email or form",
    coverage: "Best effort",
    credits: "Not available",
  },
  {
    plan: "Starter",
    channel: "Email or form",
    coverage: "Business hours",
    credits: "Available only if the order form includes paid production SLA coverage",
  },
  {
    plan: "Growth",
    channel: "Email or form",
    coverage: "Business hours priority support",
    credits: "Available for covered paid production subscriptions",
  },
  {
    plan: "Enterprise",
    channel: "Email, form, and agreed customer-success channel",
    coverage: "Business hours or contract-defined coverage",
    credits: "As stated in this SLA or the order form",
  },
] as const;

const PRIORITY_LEVELS = [
  {
    priority: "P1 Critical",
    description:
      "Production service is unavailable or a critical business workflow is blocked for most users with no reasonable workaround.",
    examples:
      "Full platform outage, login unavailable for all users, critical data processing unavailable.",
  },
  {
    priority: "P2 High",
    description:
      "Major functionality is degraded or unavailable for multiple users, but a workaround exists.",
    examples: "Key module unavailable, severe performance degradation, integration failure affecting active workflows.",
  },
  {
    priority: "P3 Medium",
    description: "Non-critical issue affecting limited users or non-core functionality.",
    examples: "Reporting issue, minor workflow defect, configuration issue, UI issue that does not block operations.",
  },
  {
    priority: "P4 Low",
    description:
      "General question, cosmetic issue, documentation request, enhancement request, or non-urgent configuration help.",
    examples: "How-to question, copy issue, non-blocking UI improvement, feature request.",
  },
] as const;

const RESPONSE_TARGETS = [
  {
    priority: "P1 Critical",
    firstResponse: "4 business hours",
    updateCadence: "Every business day or when materially updated",
    resolution:
      "Commercially reasonable continuous effort during business hours until mitigated or workaround provided",
  },
  {
    priority: "P2 High",
    firstResponse: "1 business day",
    updateCadence: "Every 2 business days or when materially updated",
    resolution: "Commercially reasonable effort to restore functionality or provide workaround",
  },
  {
    priority: "P3 Medium",
    firstResponse: "2 business days",
    updateCadence: "As needed",
    resolution: "Scheduled into normal support or product workflow",
  },
  {
    priority: "P4 Low",
    firstResponse: "3 business days",
    updateCadence: "As needed",
    resolution: "Handled through normal support, documentation, or product review",
  },
] as const;

const SERVICE_CREDITS = [
  { uptime: "99.0% to below 99.5%", credit: "5% of the monthly subscription fee for the affected service" },
  { uptime: "95.0% to below 99.0%", credit: "10% of the monthly subscription fee for the affected service" },
  { uptime: "Below 95.0%", credit: "20% of the monthly subscription fee for the affected service" },
] as const;

const EXCLUSIONS = [
  "scheduled maintenance with reasonable notice where practical",
  "emergency maintenance required to protect security, availability, or integrity",
  "force majeure events",
  "customer-side internet, network, device, browser, firewall, VPN, configuration, or access issues",
  "customer misuse, unauthorised use, breach of agreement, or failure to follow documentation",
  "unpaid, suspended, cancelled, or expired accounts",
  "third-party services, APIs, hosting, telecom, payment, email, DNS, identity providers, or integrations outside Zoveto's reasonable control",
  "beta, preview, pilot, trial, sandbox, or experimental features",
  "data imports, migrations, custom implementation work, or professional services unless expressly covered in an order form",
  "security actions taken to protect systems or data",
  "issues caused by customer data quality, customer configuration, or customer-created workflows",
  "planned product updates, feature releases, or maintenance windows",
  "partial service degradation that does not make the covered production service unavailable",
  "events for which Zoveto cannot reasonably identify downtime from internal monitoring systems, service logs, operational metrics, or availability records",
] as const;

const tableClass = "w-full min-w-[680px] border-collapse text-left";
const thClass = "border-b border-border px-4 py-3 text-sm font-semibold text-foreground";
const tdClass = "border-b border-border px-4 py-3 text-sm text-muted";

export default function SlaPage() {
  return (
    <LegalPageShell
      title="Service Level Agreement"
      lastUpdated="April 2026"
      pdfHref="/legal/zoveto-service-level-agreement-april-2026.pdf"
    >
      <section>
        <p className="rounded-lg border border-border bg-card p-4 font-medium text-foreground">
          This Service Level Agreement applies to paid Zoveto production subscriptions where the applicable order form,
          proposal, statement of work, Master Service Agreement, or enterprise agreement references this SLA.
        </p>
      </section>

      <section>
        <h2>Scope</h2>
        <ul>
          <li>This SLA applies only to covered paid production subscriptions.</li>
          <li>
            Free trials, demos, pilots, evaluation environments, beta features, preview features, and sandbox environments
            are provided on a best-effort basis unless a written agreement says otherwise.
          </li>
          <li>
            If an order form, statement of work, or enterprise agreement contains a different SLA, that written agreement
            controls for that customer.
          </li>
        </ul>
      </section>

      <section>
        <h2>Monthly uptime commitment</h2>
        <p>
          Zoveto will use commercially reasonable efforts to make the covered production services available at least{" "}
          <strong>99.5%</strong> of each calendar month.
        </p>
        <p className="mt-4 font-medium text-foreground">Monthly Uptime Percentage formula</p>
        <p className="mt-2 rounded-lg border border-border bg-muted/20 px-4 py-3 font-mono-plex text-sm text-foreground">
          Monthly Uptime Percentage = ((Total minutes in the calendar month − Excluded Downtime − Unplanned Downtime) /
          (Total minutes in the calendar month − Excluded Downtime)) × 100
        </p>
        <p className="mt-4">
          <strong>Unplanned Downtime:</strong> A period when the covered paid production service is unavailable due to
          Zoveto-controlled infrastructure or application issues.
        </p>
        <p>
          <strong>Excluded Downtime:</strong> Downtime excluded from the calculation, including scheduled maintenance,
          emergency maintenance, force majeure, customer-side issues, third-party outages outside Zoveto&apos;s reasonable
          control, beta features, misuse, unpaid accounts, and other exclusions listed in this SLA.
        </p>
      </section>

      <section>
        <h2>Service monitoring</h2>
        <p>
          Zoveto&apos;s internal monitoring systems, service logs, operational metrics, and availability records shall be used
          to determine service availability and uptime calculations unless otherwise agreed in writing.
        </p>
      </section>

      <section>
        <h2>Partial service degradation</h2>
        <p>
          Partial degradation affecting specific modules, integrations, workflows, features, or customer environments may be
          treated as service degradation rather than complete service unavailability.
        </p>
      </section>

      <section>
        <h2>Support tiers by plan</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className={tableClass}>
            <thead>
              <tr className="bg-muted/30">
                <th className={thClass}>Plan</th>
                <th className={thClass}>Support channel</th>
                <th className={thClass}>Coverage</th>
                <th className={thClass}>SLA credits</th>
              </tr>
            </thead>
            <tbody>
              {SUPPORT_TIERS.map((row) => (
                <tr key={row.plan} className="align-top">
                  <td className={`${tdClass} font-medium text-foreground`}>{row.plan}</td>
                  <td className={tdClass}>{row.channel}</td>
                  <td className={tdClass}>{row.coverage}</td>
                  <td className={tdClass}>{row.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          <strong>Business hours</strong> means Monday to Friday, 10:00 AM to 6:00 PM India Standard Time, excluding
          Indian public holidays, unless otherwise stated in an order form.
        </p>
      </section>

      <section>
        <h2>Priority levels</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className={tableClass}>
            <thead>
              <tr className="bg-muted/30">
                <th className={thClass}>Priority</th>
                <th className={thClass}>Description</th>
                <th className={thClass}>Examples</th>
              </tr>
            </thead>
            <tbody>
              {PRIORITY_LEVELS.map((row) => (
                <tr key={row.priority} className="align-top">
                  <td className={`${tdClass} font-medium text-foreground`}>{row.priority}</td>
                  <td className={tdClass}>{row.description}</td>
                  <td className={tdClass}>{row.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Response targets</h2>
        <p className="mb-4 text-sm text-muted">
          The targets below are for first response and update cadence only. Zoveto does not guarantee resolution times.
          Resolution is handled on a commercially reasonable effort basis.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className={tableClass}>
            <thead>
              <tr className="bg-muted/30">
                <th className={thClass}>Priority</th>
                <th className={thClass}>Target first response</th>
                <th className={thClass}>Target update cadence</th>
                <th className={thClass}>Resolution approach</th>
              </tr>
            </thead>
            <tbody>
              {RESPONSE_TARGETS.map((row) => (
                <tr key={row.priority} className="align-top">
                  <td className={`${tdClass} font-medium text-foreground`}>{row.priority}</td>
                  <td className={tdClass}>{row.firstResponse}</td>
                  <td className={tdClass}>{row.updateCadence}</td>
                  <td className={tdClass}>{row.resolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Incident escalation</h2>
        <p>
          Critical incidents may be escalated internally to engineering, operations, security, management, and other
          appropriate teams to restore service availability and mitigate customer impact.
        </p>
      </section>

      <section>
        <h2>Service credits</h2>
        <p>
          If Zoveto fails to meet the 99.5% monthly uptime commitment for a covered paid production subscription, Customer
          may be eligible for a service credit against future subscription fees for the affected service.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className={tableClass}>
            <thead>
              <tr className="bg-muted/30">
                <th className={thClass}>Monthly Uptime Percentage</th>
                <th className={thClass}>Service Credit</th>
              </tr>
            </thead>
            <tbody>
              {SERVICE_CREDITS.map((row) => (
                <tr key={row.uptime} className="align-top">
                  <td className={`${tdClass} font-medium text-foreground`}>{row.uptime}</td>
                  <td className={tdClass}>{row.credit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-4">
          <li>
            Service credits are calculated only on the monthly recurring subscription fee for the affected service.
          </li>
          <li>
            Credits exclude taxes, implementation fees, professional services, discounts, one-time fees, support add-ons,
            and third-party charges.
          </li>
          <li>
            Service credits are Customer&apos;s sole and exclusive remedy for failure to meet the uptime commitment, unless
            otherwise required by law or agreed in writing.
          </li>
          <li>Credits are not refunds and cannot be exchanged for cash.</li>
          <li>Credits apply only to future invoices.</li>
        </ul>
      </section>

      <section>
        <h2>Credit claim process</h2>
        <ul>
          <li>
            Customer must submit a credit request to{" "}
            <a href="mailto:support@zoveto.com">support@zoveto.com</a> within 15 days after the end of the calendar month in
            which the alleged SLA failure occurred.
          </li>
          <li>
            The request must include affected dates/times, affected users or workflows, screenshots/logs if available, and a
            short description of business impact.
          </li>
          <li>Zoveto will review service logs and support records in good faith.</li>
          <li>Approved credits will be applied to a future invoice.</li>
        </ul>
      </section>

      <section>
        <h2>Scheduled maintenance windows</h2>
        <p>
          Scheduled maintenance windows will generally not exceed eight (8) hours per maintenance event unless emergency
          circumstances, security requirements, or operational considerations require otherwise.
        </p>
        <ul>
          <li>Zoveto may perform scheduled maintenance to maintain security, reliability, and performance.</li>
          <li>
            Zoveto will use reasonable efforts to schedule maintenance during lower-usage periods and provide notice where
            practical.
          </li>
          <li>
            Emergency maintenance may be performed without advance notice where needed to protect the service, customers, or
            data.
          </li>
        </ul>
      </section>

      <section>
        <h2>Capacity management and abuse prevention</h2>
        <p>
          Zoveto reserves the right to implement rate limits, capacity controls, abuse prevention measures, traffic
          management controls, and operational safeguards necessary to maintain platform security, availability, and
          reliability.
        </p>
      </section>

      <section>
        <h2>Exclusions</h2>
        <p>
          This SLA does not apply to downtime, delay, loss, degradation, or support issues caused by:
        </p>
        <ul>
          {EXCLUSIONS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Customer responsibilities</h2>
        <ul>
          <li>Customer must maintain accurate admin and support contact details.</li>
          <li>Customer must promptly report incidents with enough detail for Zoveto to investigate.</li>
          <li>
            Customer must maintain appropriate user permissions, internal controls, backups/export processes where required by
            its own policies, and network/device security.
          </li>
          <li>
            Customer must not misuse the services, overload systems, bypass limits, or interfere with platform availability.
          </li>
        </ul>
      </section>

      <section>
        <h2>Relationship with MSA and order form</h2>
        <p>
          This SLA forms part of the applicable agreement only when referenced by an order form, proposal,{" "}
          <Link href="/msa">Master Service Agreement</Link>, statement of work, or enterprise agreement.
        </p>
        <p>
          If there is a conflict between this SLA and a signed order form or enterprise agreement, the signed order form or
          enterprise agreement controls for that customer.
        </p>
      </section>

      <section>
        <h2>Survival</h2>
        <p>
          Provisions relating to service credits, payment obligations, confidentiality, limitations of liability, dispute
          resolution, and any provisions intended by their nature to survive shall survive termination or expiration of the
          applicable agreement.
        </p>
      </section>

      <section>
        <h2>Related policies</h2>
        <ul>
          <li>
            <Link href="/msa">Master Service Agreement (MSA)</Link>
          </li>
          <li>
            <Link href="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link href="/security">Security &amp; Data Protection</Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Support: <a href="mailto:support@zoveto.com">support@zoveto.com</a>
        </p>
        <p>
          Security: <a href="mailto:security@zoveto.com">security@zoveto.com</a>
        </p>
      </section>
    </LegalPageShell>
  );
}
