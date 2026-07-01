import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";
import Link from "next/link";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Master Service Agreement | Zoveto",
  description:
    "Review Zoveto's Master Service Agreement for B2B SaaS subscriptions, pilots, order forms, data protection, support, liability, and dispute resolution.",
  alternates: { canonical: canonicalUrl("/msa") },
  robots: { index: true, follow: true },
};

export default function MsaPage() {
  return (
    <LegalPageShell
      title="Master Service Agreement"
      lastUpdated="April 2026"
      pdfHref="/legal/zoveto-master-service-agreement-april-2026.pdf"
    >
      <section>
        <p className="rounded-lg border border-border bg-card p-4 font-medium text-foreground">
          This Master Service Agreement applies when an order form, proposal, statement of work, pilot agreement,
          enterprise agreement, or other written document references it.
        </p>
        <p className="mt-4">
          This Master Service Agreement (&ldquo;MSA&rdquo;) governs paid B2B SaaS subscriptions, pilots, implementation
          services, order forms, enterprise agreements, and related services provided by{" "}
          <strong>Zoveto Technologies Private Limited</strong> (&ldquo;Zoveto&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) to the customer
          identified in the applicable order form or written agreement (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;).
        </p>
      </section>

      <section>
        <h2>Agreement structure and scope</h2>
        <p>
          This MSA governs access to and use of Zoveto services when an order form, proposal, statement of work, pilot
          agreement, enterprise agreement, or other written document references this MSA.
        </p>
        <p>
          If there is a conflict between this MSA and an order form, the order form controls only for the specific
          commercial or service terms stated in that order form. All other terms of this MSA continue to apply.
        </p>
        <p>The documents that may form the agreement include:</p>
        <ul>
          <li>the applicable order form, proposal, or statement of work;</li>
          <li>this MSA;</li>
          <li>the <Link href="/dpa">Data Processing Agreement</Link>;</li>
          <li>the Service Level Agreement, if applicable;</li>
          <li>the <Link href="/acceptable-use">Acceptable Use Policy</Link>;</li>
          <li>any mutually signed pilot agreement or implementation scope.</li>
        </ul>
        <p>
          Customer may not assign this MSA or any order form without Zoveto&apos;s prior written consent, except to a
          successor in connection with merger, acquisition, corporate restructuring, or sale of substantially all assets,
          provided the successor is not a competitor of Zoveto and agrees to be bound by the agreement. Zoveto may assign
          this MSA to an affiliate or successor in connection with merger, acquisition, restructuring, or sale of assets.
        </p>
      </section>

      <section>
        <h2>Order forms and statements of work</h2>
        <p>
          Each order form or statement of work should describe the subscribed services, modules, user limits, fees, billing
          cycle, implementation scope, support tier, term, renewal terms, and any special commercial conditions.
        </p>
        <p>
          Zoveto is not required to provide services outside the subscribed modules, written implementation scope, or agreed
          order form.
        </p>
        <p>
          Any custom development, integration, migration, training, or advisory work must be expressly stated in an order
          form or statement of work.
        </p>
      </section>

      <section>
        <h2>Services</h2>
        <p>
          Zoveto provides cloud-based business operations software, including modules for inventory, warehouse, procurement,
          sales/CRM, finance/GST, HR, reporting, automation, and related workflows depending on the subscribed plan.
        </p>
        <p>
          Zoveto may improve, modify, or update the services from time to time, provided such changes do not materially
          reduce the core functionality of the subscribed services during the active term.
        </p>
        <p>
          Beta, preview, experimental, or pilot features may be provided for evaluation and may be changed, suspended, or
          discontinued at any time unless otherwise agreed in writing.
        </p>
        <p>
          Zoveto may suspend access to the services, in whole or in part, if fees are overdue after reasonable notice;
          Customer breaches this MSA or the Acceptable Use Policy; use of the services creates a security, legal,
          operational, or third-party risk; or suspension is required by law or a competent authority. Zoveto will use
          reasonable efforts to limit suspension to the affected users, modules, or workloads where practical.
        </p>
      </section>

      <section>
        <h2>Customer responsibilities</h2>
        <p>Customer is responsible for:</p>
        <ul>
          <li>providing accurate account, billing, GST, and business information;</li>
          <li>maintaining the confidentiality of user credentials;</li>
          <li>configuring roles, approvals, workflows, and access controls appropriately;</li>
          <li>ensuring that Customer data submitted to the services is lawful and accurate;</li>
          <li>
            obtaining required consents and permissions from employees, customers, vendors, and other data subjects;
          </li>
          <li>reviewing outputs, reports, automations, and AI-assisted suggestions before relying on them;</li>
          <li>
            maintaining internal controls, business continuity plans, and backups outside Zoveto where required by
            Customer&apos;s risk policy.
          </li>
        </ul>
        <p>
          Customer must not use the services in breach of law, third-party rights, or Zoveto&apos;s Acceptable Use Policy.
          Each party will comply with laws applicable to its performance under the agreement. Customer is responsible for
          industry-specific, employment, tax, GST, accounting, export, and operational compliance decisions made using the
          services.
        </p>
      </section>

      <section>
        <h2>Fees, payment, and taxes</h2>
        <p>Customer will pay the fees stated in the applicable order form or pricing plan.</p>
        <p>Unless the order form states otherwise:</p>
        <ul>
          <li>fees are payable in advance;</li>
          <li>invoices are due within fifteen (15) days from invoice date;</li>
          <li>fees are exclusive of GST, withholding, duties, bank charges, and other applicable taxes;</li>
          <li>Customer is responsible for providing accurate GST and billing details;</li>
          <li>late payments may result in suspension after reasonable notice.</li>
        </ul>
        <p>
          If Customer is required by law to deduct withholding tax, Customer must provide valid tax deduction certificates
          and pay any remaining amount due so that Zoveto receives the agreed net commercial value unless prohibited by law.
        </p>
        <p>
          Implementation, migration, integration, training, or onboarding fees are separate from subscription fees unless the
          order form expressly includes them.
        </p>
      </section>

      <section>
        <h2>Implementation and professional services</h2>
        <p>
          Zoveto may provide implementation, migration, integration, configuration, training, or other professional services
          as described in an applicable order form or statement of work. Unless expressly stated in writing, professional
          services are separate from subscription fees.
        </p>
        <p>
          Customer will provide timely access to personnel, systems, data, and decisions required for delivery. Zoveto&apos;s
          professional services are performed on a time-and-materials or fixed-scope basis as stated in the order form. Any
          deliverables, timelines, and acceptance criteria are defined only in the applicable statement of work.
        </p>
        <p>
          Custom deliverables, if any, are owned as stated in the applicable statement of work. If the statement of work is
          silent, Zoveto retains ownership of underlying tools, code, templates, libraries, methods, and know-how, and
          Customer receives a right to use the deliverable for its internal business purposes during the subscription term.
        </p>
      </section>

      <section>
        <h2>Term and renewal</h2>
        <p>
          This MSA starts on the effective date stated in the applicable order form or, if no date is stated, when Customer
          first accepts or uses the services under an order form.
        </p>
        <p>Each order form continues for the term stated in that order form.</p>
        <p>
          Unless the order form states otherwise, subscriptions renew for successive terms of the same length unless either
          party gives written non-renewal notice at least thirty (30) days before the end of the then-current term.
        </p>
      </section>

      <section>
        <h2>Termination for cause</h2>
        <p>
          Either party may terminate an order form or this MSA for material breach if the breaching party does not cure the
          breach within thirty (30) days after receiving written notice.
        </p>
        <p>Zoveto may terminate immediately if Customer:</p>
        <ul>
          <li>materially violates applicable law;</li>
          <li>infringes Zoveto&apos;s intellectual property rights;</li>
          <li>attempts unauthorized access to systems or data;</li>
          <li>uses the services for fraudulent, harmful, or illegal activity;</li>
          <li>remains unpaid after suspension and notice.</li>
        </ul>
      </section>

      <section>
        <h2>Termination for convenience</h2>
        <p>
          Unless the applicable order form states otherwise, either party may terminate an order form for convenience at the
          end of the then-current subscription term by giving written non-renewal notice.
        </p>
        <p>
          If an order form expressly allows early termination for convenience, the order form must state the notice period,
          refund treatment, data export period, and any payable early termination charges.
        </p>
        <p>
          Fees already paid are non-refundable unless the order form expressly states otherwise or mandatory law requires a
          refund.
        </p>
      </section>

      <section>
        <h2>Effect of termination</h2>
        <p>On termination or expiry:</p>
        <ul>
          <li>Customer&apos;s right to access the services ends;</li>
          <li>unpaid fees become due;</li>
          <li>Zoveto may provide a limited data export period if available under the plan or order form;</li>
          <li>
            Customer data will be deleted, returned, or anonymised according to the order form, product functionality, DPA,
            retention policy, and legal obligations;
          </li>
          <li>
            sections intended to survive termination continue, including confidentiality, IP, payment obligations, liability
            limits, indemnities, data protection obligations, and dispute resolution.
          </li>
        </ul>
      </section>

      <section>
        <h2>Confidentiality</h2>
        <p>
          Each party may receive non-public business, technical, financial, product, operational, customer, employee, pricing,
          security, or legal information from the other party (&ldquo;Confidential Information&rdquo;).
        </p>
        <p>The receiving party must:</p>
        <ul>
          <li>use Confidential Information only to perform or receive services under the agreement;</li>
          <li>protect it using reasonable care;</li>
          <li>
            limit access to personnel, advisors, contractors, and service providers who need to know and are bound by
            confidentiality obligations;
          </li>
          <li>not disclose it except as permitted by the agreement or required by law.</li>
        </ul>
        <p>Confidentiality obligations do not apply to information that:</p>
        <ul>
          <li>is publicly available without breach;</li>
          <li>was already known without restriction;</li>
          <li>is independently developed without use of Confidential Information;</li>
          <li>is lawfully received from a third party without confidentiality restriction;</li>
          <li>must be disclosed by law, court, regulator, or government authority.</li>
        </ul>
        <p>
          Confidentiality obligations continue for three (3) years after disclosure, except trade secrets and highly sensitive
          business/security information remain protected for as long as they remain confidential under applicable law.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          Zoveto retains all rights, title, and interest in the services, software, platform, documentation, workflows,
          designs, know-how, templates, product improvements, analytics models, automation logic, and Zoveto branding.
        </p>
        <p>
          Customer receives only a limited, non-exclusive, non-transferable right to access and use the subscribed services
          during the applicable term.
        </p>
        <p>Customer retains ownership of Customer data submitted to the services.</p>
        <p>
          Feedback, suggestions, enhancement requests, or recommendations provided by Customer may be used by Zoveto to
          improve the services without restriction or obligation, provided Zoveto does not disclose Customer&apos;s
          Confidential Information.
        </p>
        <p>
          Zoveto may identify Customer as a customer only if the order form allows it or Customer gives written approval.
          Any case study, logo use, testimonial, or public announcement requires Customer&apos;s prior written consent unless
          otherwise stated in the order form.
        </p>
      </section>

      <section>
        <h2>Data protection</h2>
        <p>
          Customer controls the legality, accuracy, and rights basis for Customer data submitted to the services.
        </p>
        <p>
          Zoveto processes personal data according to the <Link href="/privacy">Privacy Policy</Link>,{" "}
          <Link href="/dpa">Data Processing Agreement</Link>, and applicable data protection law, including India&apos;s
          Digital Personal Data Protection Act, 2023 where applicable.
        </p>
        <p>
          Where Zoveto processes personal data on Customer&apos;s instructions, Customer acts as the Data
          Fiduciary/controller and Zoveto acts as processor/service provider unless another role is expressly stated in
          writing.
        </p>
      </section>

      <section>
        <h2>Subprocessors</h2>
        <p>
          Customer authorises Zoveto to engage subprocessors to deliver the services. A current list is available on the{" "}
          <Link href="/subprocessors">Subprocessors</Link> page and may be updated according to the DPA.
        </p>
        <p>
          Zoveto will impose appropriate data protection obligations on subprocessors and remain responsible for
          subprocessors&apos; performance of data protection obligations as described in the DPA.
        </p>
      </section>

      <section>
        <h2>Security and backups</h2>
        <p>
          Zoveto maintains reasonable technical and organisational safeguards appropriate to the nature of the services,
          including access controls, encryption in transit, operational monitoring, backup controls, and internal security
          practices.
        </p>
        <p>
          Customer is responsible for user access, role configuration, endpoint security, credential management, and internal
          use of exported data.
        </p>
        <p>
          Security details are described on the <Link href="/security">Security &amp; Data Protection</Link> page and may be
          updated as Zoveto&apos;s security programme evolves. Customer should maintain independent backups and continuity
          plans where required by Customer&apos;s risk policy.
        </p>
      </section>

      <section>
        <h2>Support and SLA</h2>
        <p>
          Support is provided according to the subscribed plan, order form, or applicable Service Level Agreement.
        </p>
        <p>
          Evaluation or pilot access may be provided on a best-effort basis unless the order form states otherwise.
        </p>
        <p>
          Enterprise customers may receive specific uptime, response-time, escalation, or service credit commitments only if
          stated in the applicable order form or SLA.
        </p>
      </section>

      <section>
        <h2>Warranty disclaimer</h2>
        <p>Each party represents that it has authority to enter into the agreement.</p>
        <p>Zoveto will provide the services in a professional and commercially reasonable manner.</p>
        <p>
          Except as expressly stated in this MSA or an order form, the services are provided &ldquo;as is&rdquo; and
          &ldquo;as available&rdquo;. To the maximum extent permitted by law, Zoveto disclaims implied warranties of
          merchantability, fitness for a particular purpose, non-infringement, uninterrupted operation, and error-free
          performance.
        </p>
        <p>
          Zoveto does not provide legal, accounting, tax, employment, GST filing, or financial advice. Customer remains
          responsible for professional review and statutory filings.
        </p>
      </section>

      <section>
        <h2>Indemnity</h2>
        <p>Customer will defend and indemnify Zoveto against third-party claims arising from:</p>
        <ul>
          <li>Customer data;</li>
          <li>Customer&apos;s unlawful use of the services;</li>
          <li>breach of this MSA or the Acceptable Use Policy;</li>
          <li>violation of third-party rights;</li>
          <li>Customer&apos;s failure to obtain required consents or permissions.</li>
        </ul>
        <p>
          Zoveto will defend Customer against third-party claims alleging that the subscribed services, as provided by
          Zoveto and used according to the agreement, infringe that third party&apos;s intellectual property rights.
        </p>
        <p>
          Zoveto has no obligation for claims caused by Customer data, unauthorized modifications, third-party integrations,
          use outside the agreement, or combinations not provided by Zoveto.
        </p>
      </section>

      <section>
        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Zoveto&apos;s total aggregate liability for all claims arising out of or
          related to this MSA, the services, or any order form shall not exceed the fees paid or payable by Customer to
          Zoveto for the relevant services in the twelve (12) months preceding the event giving rise to the claim.
        </p>
        <p>
          This cap is intended to equal a maximum of one (1) annual fee for the relevant services unless a separate written
          agreement states otherwise.
        </p>
        <p>
          Neither party is liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost
          profits, lost revenue, lost goodwill, business interruption, or loss of data, even if advised of the possibility.
        </p>
        <p>The above limitations do not limit liability that cannot be excluded under applicable law.</p>
      </section>

      <section>
        <h2>Governing law and dispute resolution</h2>
        <p>
          This MSA and all order forms are governed by the laws of <strong>India</strong>, without regard to conflict-of-law
          principles.
        </p>
        <p>
          Before starting formal proceedings, the parties will attempt good-faith resolution by written notice and allow at
          least thirty (30) days for commercial resolution.
        </p>
        <p>
          If the dispute is not resolved through good-faith discussions, it shall be referred to and finally resolved by
          arbitration seated in <strong>New Delhi, India</strong>, in accordance with the Arbitration and Conciliation Act,
          1996. The tribunal shall consist of a sole arbitrator appointed mutually by the parties. The arbitration language
          shall be English.
        </p>
        <p>
          Subject to the arbitration clause above, courts at <strong>New Delhi, India</strong> shall have exclusive
          jurisdiction for interim relief, enforcement of arbitral awards, and matters that cannot legally be resolved by
          arbitration.
        </p>
        <p>
          Neither party is liable for delay or failure caused by events beyond reasonable control, including natural
          disasters, war, terrorism, civil unrest, labour disruption, internet or cloud provider outage, government action,
          epidemic, power failure, or other force majeure events. Payment obligations are not excused by force majeure.
        </p>
        <p>
          Legal notices must be sent by email and, where required, by registered post or courier to the addresses stated in
          the order form or official company records. Notices to Zoveto may be sent to{" "}
          <a href="mailto:support@zoveto.com">support@zoveto.com</a>. Privacy and data protection notices may be sent to{" "}
          <a href="mailto:privacy@zoveto.com">privacy@zoveto.com</a>. Security notices may be sent to{" "}
          <a href="mailto:security@zoveto.com">security@zoveto.com</a>.
        </p>
        <p>
          This MSA, the applicable order forms, DPA, SLA, Acceptable Use Policy, and referenced policies form the entire
          agreement between the parties for the services. Any amendment must be in writing and accepted by both parties,
          except that Zoveto may update online policies from time to time where the update does not materially reduce
          Customer&apos;s rights during an active order term.
        </p>
      </section>

      <section>
        <h2>Artificial Intelligence Features</h2>
        <p>
          Certain Services may include artificial intelligence, machine learning, predictive analytics, automation, or
          recommendation features. Outputs generated by such features are provided for informational and operational
          assistance purposes only and may not always be accurate, complete, or suitable for Customer&apos;s intended use.
          Customer remains solely responsible for reviewing, validating, and approving all outputs, recommendations,
          automations, and decisions before reliance or implementation.
        </p>
      </section>

      <section>
        <h2>Security Incident Notification</h2>
        <p>
          In the event of a confirmed security incident affecting Customer personal data processed by Zoveto, Zoveto shall
          notify Customer without undue delay and within commercially reasonable timeframes, consistent with applicable law and
          the nature of the incident.
        </p>
      </section>

      <section>
        <h2>Export Controls and Sanctions</h2>
        <p>
          Customer represents and warrants that it is not subject to any applicable sanctions restrictions and will not use,
          export, re-export, or otherwise make available the Services in violation of applicable export control laws,
          sanctions laws, or trade restrictions.
        </p>
      </section>

      <section>
        <h2>Electronic Records and Audit Trails</h2>
        <p>
          Customer acknowledges that electronic records, system logs, audit trails, workflow histories, timestamps, and other
          records maintained by Zoveto may be used as evidence of transactions, system activity, and actions performed within
          the Services.
        </p>
      </section>

      <section>
        <h2>Independent Contractors</h2>
        <p>
          The parties are independent contractors. Nothing in this Agreement creates a partnership, joint venture, agency,
          fiduciary relationship, employment relationship, or other similar relationship between the parties.
        </p>
      </section>

      <section>
        <h2>Severability</h2>
        <p>
          If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall
          remain in full force and effect.
        </p>
      </section>

      <section>
        <h2>Waiver</h2>
        <p>
          The failure of either party to enforce any provision of this Agreement shall not constitute a waiver of that
          provision or any other provision.
        </p>
      </section>

      <section>
        <h2>Survival</h2>
        <p>
          Any provisions of this Agreement that by their nature are intended to survive termination or expiration shall
          survive, including provisions relating to confidentiality, intellectual property, payment obligations,
          indemnification, limitation of liability, data protection, dispute resolution, and accrued rights and obligations.
        </p>
      </section>

      <section>
        <h2>Liability Cap Exceptions</h2>
        <p>
          The limitations and exclusions of liability in this Agreement shall not apply to liability arising from fraud,
          willful misconduct, infringement indemnification obligations, breaches of confidentiality obligations, or liability
          that cannot be limited or excluded under applicable law.
        </p>
      </section>

      <section>
        <h2>Attachments and related documents</h2>
        <p>The following documents may apply:</p>
        <ul>
          <li>
            <Link href="/dpa">Data Processing Agreement</Link>
          </li>
          <li>
            <Link href="/sla">Service Level Agreement (SLA)</Link>
          </li>
          <li>
            <Link href="/acceptable-use">Acceptable Use Policy</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/security">Security &amp; Data Protection</Link>
          </li>
          <li>
            <Link href="/subprocessors">Subprocessors</Link>
          </li>
          <li>
            <Link href="/terms">Terms of Service</Link> (for website and self-serve access where applicable)
          </li>
          <li>Order form, proposal, statement of work, or pilot agreement</li>
        </ul>
        <p>
          Questions about this MSA: <a href="mailto:support@zoveto.com">support@zoveto.com</a>
        </p>
      </section>
    </LegalPageShell>
  );
}
