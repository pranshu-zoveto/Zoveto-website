from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "public/legal/zoveto-master-service-agreement-april-2026.pdf"

SECTIONS = [
    (
        "Agreement structure and scope",
        [
            'This MSA governs access to and use of Zoveto services when an order form, proposal, statement of work, pilot agreement, enterprise agreement, or other written document references this MSA.',
            'This MSA is entered into between Zoveto Technologies Private Limited ("Zoveto", "we", "us") and the customer identified in the applicable order form or written agreement ("Customer", "you").',
            "If there is a conflict between this MSA and an order form, the order form controls only for the specific commercial or service terms stated in that order form. All other terms of this MSA continue to apply.",
            "The documents that may form the agreement include:<br/>- the applicable order form, proposal, or statement of work;<br/>- this MSA;<br/>- the Data Processing Agreement;<br/>- the Service Level Agreement, if applicable;<br/>- the Acceptable Use Policy;<br/>- any mutually signed pilot agreement or implementation scope.",
            "Customer may not assign this MSA or any order form without Zoveto's prior written consent, except to a successor in connection with merger, acquisition, corporate restructuring, or sale of substantially all assets, provided the successor is not a competitor of Zoveto and agrees to be bound by the agreement. Zoveto may assign this MSA to an affiliate or successor in connection with merger, acquisition, restructuring, or sale of assets.",
        ],
    ),
    (
        "Order forms and statements of work",
        [
            "Each order form or statement of work should describe the subscribed services, modules, user limits, fees, billing cycle, implementation scope, support tier, term, renewal terms, and any special commercial conditions.",
            "Zoveto is not required to provide services outside the subscribed modules, written implementation scope, or agreed order form.",
            "Any custom development, integration, migration, training, or advisory work must be expressly stated in an order form or statement of work.",
        ],
    ),
    (
        "Services",
        [
            "Zoveto provides cloud-based business operations software, including modules for inventory, warehouse, procurement, sales/CRM, finance/GST, HR, reporting, automation, and related workflows depending on the subscribed plan.",
            "Zoveto may improve, modify, or update the services from time to time, provided such changes do not materially reduce the core functionality of the subscribed services during the active term.",
            "Beta, preview, experimental, or pilot features may be provided for evaluation and may be changed, suspended, or discontinued at any time unless otherwise agreed in writing.",
            "Zoveto may suspend access to the services, in whole or in part, if fees are overdue after reasonable notice; Customer breaches this MSA or the Acceptable Use Policy; use of the services creates a security, legal, operational, or third-party risk; or suspension is required by law or a competent authority. Zoveto will use reasonable efforts to limit suspension to the affected users, modules, or workloads where practical.",
        ],
    ),
    (
        "Customer responsibilities",
        [
            "Customer is responsible for:<br/>- providing accurate account, billing, GST, and business information;<br/>- maintaining the confidentiality of user credentials;<br/>- configuring roles, approvals, workflows, and access controls appropriately;<br/>- ensuring that Customer data submitted to the services is lawful and accurate;<br/>- obtaining required consents and permissions from employees, customers, vendors, and other data subjects;<br/>- reviewing outputs, reports, automations, and AI-assisted suggestions before relying on them;<br/>- maintaining internal controls, business continuity plans, and backups outside Zoveto where required by Customer's risk policy.",
            "Customer must not use the services in breach of law, third-party rights, or Zoveto's Acceptable Use Policy. Each party will comply with laws applicable to its performance under the agreement.",
        ],
    ),
    (
        "Fees, payment, and taxes",
        [
            "Customer will pay the fees stated in the applicable order form or pricing plan.",
            "Unless the order form states otherwise:<br/>- fees are payable in advance;<br/>- invoices are due within fifteen (15) days from invoice date;<br/>- fees are exclusive of GST, withholding, duties, bank charges, and other applicable taxes;<br/>- Customer is responsible for providing accurate GST and billing details;<br/>- late payments may result in suspension after reasonable notice.",
            "If Customer is required by law to deduct withholding tax, Customer must provide valid tax deduction certificates and pay any remaining amount due so that Zoveto receives the agreed net commercial value unless prohibited by law.",
            "Implementation, migration, integration, training, or onboarding fees are separate from subscription fees unless the order form expressly includes them.",
        ],
    ),
    (
        "Implementation and professional services",
        [
            "Zoveto may provide implementation, migration, integration, configuration, training, or other professional services as described in an applicable order form or statement of work. Unless expressly stated in writing, professional services are separate from subscription fees.",
            "Customer will provide timely access to personnel, systems, data, and decisions required for delivery. Zoveto's professional services are performed on a time-and-materials or fixed-scope basis as stated in the order form.",
            "Custom deliverables, if any, are owned as stated in the applicable statement of work. If the statement of work is silent, Zoveto retains ownership of underlying tools, code, templates, libraries, methods, and know-how, and Customer receives a right to use the deliverable for its internal business purposes during the subscription term.",
        ],
    ),
    (
        "Term and renewal",
        [
            "This MSA starts on the effective date stated in the applicable order form or, if no date is stated, when Customer first accepts or uses the services under an order form.",
            "Each order form continues for the term stated in that order form.",
            "Unless the order form states otherwise, subscriptions renew for successive terms of the same length unless either party gives written non-renewal notice at least thirty (30) days before the end of the then-current term.",
        ],
    ),
    (
        "Termination for cause",
        [
            "Either party may terminate an order form or this MSA for material breach if the breaching party does not cure the breach within thirty (30) days after receiving written notice.",
            "Zoveto may terminate immediately if Customer:<br/>- materially violates applicable law;<br/>- infringes Zoveto's intellectual property rights;<br/>- attempts unauthorized access to systems or data;<br/>- uses the services for fraudulent, harmful, or illegal activity;<br/>- remains unpaid after suspension and notice.",
        ],
    ),
    (
        "Termination for convenience",
        [
            "Unless the applicable order form states otherwise, either party may terminate an order form for convenience at the end of the then-current subscription term by giving written non-renewal notice.",
            "If an order form expressly allows early termination for convenience, the order form must state the notice period, refund treatment, data export period, and any payable early termination charges.",
            "Fees already paid are non-refundable unless the order form expressly states otherwise or mandatory law requires a refund.",
        ],
    ),
    (
        "Effect of termination",
        [
            "On termination or expiry:<br/>- Customer's right to access the services ends;<br/>- unpaid fees become due;<br/>- Zoveto may provide a limited data export period if available under the plan or order form;<br/>- Customer data will be deleted, returned, or anonymised according to the order form, product functionality, DPA, retention policy, and legal obligations;<br/>- sections intended to survive termination continue, including confidentiality, IP, payment obligations, liability limits, indemnities, data protection obligations, and dispute resolution.",
        ],
    ),
    (
        "Confidentiality",
        [
            'Each party may receive non-public business, technical, financial, product, operational, customer, employee, pricing, security, or legal information from the other party ("Confidential Information").',
            "The receiving party must:<br/>- use Confidential Information only to perform or receive services under the agreement;<br/>- protect it using reasonable care;<br/>- limit access to personnel, advisors, contractors, and service providers who need to know and are bound by confidentiality obligations;<br/>- not disclose it except as permitted by the agreement or required by law.",
            "Confidentiality obligations continue for three (3) years after disclosure, except trade secrets and highly sensitive business/security information remain protected for as long as they remain confidential under applicable law.",
        ],
    ),
    (
        "Intellectual property",
        [
            "Zoveto retains all rights, title, and interest in the services, software, platform, documentation, workflows, designs, know-how, templates, product improvements, analytics models, automation logic, and Zoveto branding.",
            "Customer receives only a limited, non-exclusive, non-transferable right to access and use the subscribed services during the applicable term.",
            "Customer retains ownership of Customer data submitted to the services.",
            "Feedback, suggestions, enhancement requests, or recommendations provided by Customer may be used by Zoveto to improve the services without restriction or obligation, provided Zoveto does not disclose Customer's Confidential Information.",
        ],
    ),
    (
        "Data protection",
        [
            "Customer controls the legality, accuracy, and rights basis for Customer data submitted to the services.",
            "Zoveto processes personal data according to the Privacy Policy, Data Processing Agreement, and applicable data protection law, including India's Digital Personal Data Protection Act, 2023 where applicable.",
            "Where Zoveto processes personal data on Customer's instructions, Customer acts as the Data Fiduciary/controller and Zoveto acts as processor/service provider unless another role is expressly stated in writing.",
        ],
    ),
    (
        "Subprocessors",
        [
            "Customer authorises Zoveto to engage subprocessors to deliver the services. A current list is available at https://zoveto.com/subprocessors and may be updated according to the DPA.",
            "Zoveto will impose appropriate data protection obligations on subprocessors and remain responsible for subprocessors' performance of data protection obligations as described in the DPA.",
        ],
    ),
    (
        "Security and backups",
        [
            "Zoveto maintains reasonable technical and organisational safeguards appropriate to the nature of the services, including access controls, encryption in transit, operational monitoring, backup controls, and internal security practices.",
            "Customer is responsible for user access, role configuration, endpoint security, credential management, and internal use of exported data.",
            "Security details are described on the Security page and may be updated as Zoveto's security programme evolves.",
        ],
    ),
    (
        "Support and SLA",
        [
            "Support is provided according to the subscribed plan, order form, or applicable Service Level Agreement.",
            "Evaluation or pilot access may be provided on a best-effort basis unless the order form states otherwise.",
            "Enterprise customers may receive specific uptime, response-time, escalation, or service credit commitments only if stated in the applicable order form or SLA.",
        ],
    ),
    (
        "Warranty disclaimer",
        [
            "Each party represents that it has authority to enter into the agreement.",
            "Zoveto will provide the services in a professional and commercially reasonable manner.",
            'Except as expressly stated in this MSA or an order form, the services are provided "as is" and "as available". To the maximum extent permitted by law, Zoveto disclaims implied warranties of merchantability, fitness for a particular purpose, non-infringement, uninterrupted operation, and error-free performance.',
            "Zoveto does not provide legal, accounting, tax, employment, GST filing, or financial advice. Customer remains responsible for professional review and statutory filings.",
        ],
    ),
    (
        "Indemnity",
        [
            "Customer will defend and indemnify Zoveto against third-party claims arising from:<br/>- Customer data;<br/>- Customer's unlawful use of the services;<br/>- breach of this MSA or the Acceptable Use Policy;<br/>- violation of third-party rights;<br/>- Customer's failure to obtain required consents or permissions.",
            "Zoveto will defend Customer against third-party claims alleging that the subscribed services, as provided by Zoveto and used according to the agreement, infringe that third party's intellectual property rights.",
            "Zoveto has no obligation for claims caused by Customer data, unauthorized modifications, third-party integrations, use outside the agreement, or combinations not provided by Zoveto.",
        ],
    ),
    (
        "Limitation of liability",
        [
            "To the maximum extent permitted by law, Zoveto's total aggregate liability for all claims arising out of or related to this MSA, the services, or any order form shall not exceed the fees paid or payable by Customer to Zoveto for the relevant services in the twelve (12) months preceding the event giving rise to the claim.",
            "This cap is intended to equal a maximum of one (1) annual fee for the relevant services unless a separate written agreement states otherwise.",
            "Neither party is liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, lost revenue, lost goodwill, business interruption, or loss of data, even if advised of the possibility.",
            "The above limitations do not limit liability that cannot be excluded under applicable law.",
        ],
    ),
    (
        "Governing law and dispute resolution",
        [
            "This MSA and all order forms are governed by the laws of India, without regard to conflict-of-law principles.",
            "Before starting formal proceedings, the parties will attempt good-faith resolution by written notice and allow at least thirty (30) days for commercial resolution.",
            "If the dispute is not resolved through good-faith discussions, it shall be referred to and finally resolved by arbitration seated in New Delhi, India, in accordance with the Arbitration and Conciliation Act, 1996. The tribunal shall consist of a sole arbitrator appointed mutually by the parties. The arbitration language shall be English.",
            "Subject to the arbitration clause above, courts at New Delhi, India shall have exclusive jurisdiction for interim relief, enforcement of arbitral awards, and matters that cannot legally be resolved by arbitration.",
            "Neither party is liable for delay or failure caused by events beyond reasonable control, including natural disasters, war, terrorism, civil unrest, labour disruption, internet or cloud provider outage, government action, epidemic, power failure, or other force majeure events. Payment obligations are not excused by force majeure.",
            "Legal notices must be sent by email and, where required, by registered post or courier to the addresses stated in the order form or official company records. Notices to Zoveto may be sent to: support@zoveto.com",
        ],
    ),
    (
        "Artificial Intelligence Features",
        [
            "Certain Services may include artificial intelligence, machine learning, predictive analytics, automation, or recommendation features. Outputs generated by such features are provided for informational and operational assistance purposes only and may not always be accurate, complete, or suitable for Customer's intended use. Customer remains solely responsible for reviewing, validating, and approving all outputs, recommendations, automations, and decisions before reliance or implementation.",
        ],
    ),
    (
        "Security Incident Notification",
        [
            "In the event of a confirmed security incident affecting Customer personal data processed by Zoveto, Zoveto shall notify Customer without undue delay and within commercially reasonable timeframes, consistent with applicable law and the nature of the incident.",
        ],
    ),
    (
        "Export Controls and Sanctions",
        [
            "Customer represents and warrants that it is not subject to any applicable sanctions restrictions and will not use, export, re-export, or otherwise make available the Services in violation of applicable export control laws, sanctions laws, or trade restrictions.",
        ],
    ),
    (
        "Electronic Records and Audit Trails",
        [
            "Customer acknowledges that electronic records, system logs, audit trails, workflow histories, timestamps, and other records maintained by Zoveto may be used as evidence of transactions, system activity, and actions performed within the Services.",
        ],
    ),
    (
        "Independent Contractors",
        [
            "The parties are independent contractors. Nothing in this Agreement creates a partnership, joint venture, agency, fiduciary relationship, employment relationship, or other similar relationship between the parties.",
        ],
    ),
    (
        "Severability",
        [
            "If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect.",
        ],
    ),
    (
        "Waiver",
        [
            "The failure of either party to enforce any provision of this Agreement shall not constitute a waiver of that provision or any other provision.",
        ],
    ),
    (
        "Survival",
        [
            "Any provisions of this Agreement that by their nature are intended to survive termination or expiration shall survive, including provisions relating to confidentiality, intellectual property, payment obligations, indemnification, limitation of liability, data protection, dispute resolution, and accrued rights and obligations.",
        ],
    ),
    (
        "Liability Cap Exceptions",
        [
            "The limitations and exclusions of liability in this Agreement shall not apply to liability arising from fraud, willful misconduct, infringement indemnification obligations, breaches of confidentiality obligations, or liability that cannot be limited or excluded under applicable law.",
        ],
    ),
    (
        "Attachments and related documents",
        [
            "The following documents may apply:<br/>- Data Processing Agreement<br/>- Service Level Agreement<br/>- Acceptable Use Policy<br/>- Privacy Policy<br/>- Security and Data Protection page<br/>- Subprocessors page<br/>- Order form, proposal, statement of work, or pilot agreement<br/><br/>Questions about this MSA: support@zoveto.com",
        ],
    ),
]


class MsaDocTemplate(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=19 * mm,
            rightMargin=19 * mm,
            topMargin=23 * mm,
            bottomMargin=20 * mm,
            title="Zoveto Master Service Agreement",
            author="Zoveto Technologies Private Limited",
            subject="Master Service Agreement",
        )
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="normal")
        self.addPageTemplates([PageTemplate(id="msa", frames=[frame], onPage=self.draw_page)])

    def draw_page(self, canvas, doc):
        canvas.saveState()
        width, height = A4
        canvas.setStrokeColor(colors.HexColor("#E5E7EB"))
        canvas.setLineWidth(0.5)
        canvas.line(19 * mm, height - 16 * mm, width - 19 * mm, height - 16 * mm)
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#6B7280"))
        canvas.drawString(19 * mm, height - 12 * mm, "Zoveto Technologies Private Limited")
        canvas.drawRightString(width - 19 * mm, height - 12 * mm, "Master Service Agreement")
        canvas.line(19 * mm, 14 * mm, width - 19 * mm, 14 * mm)
        canvas.drawString(19 * mm, 9 * mm, "https://zoveto.com/msa")
        canvas.drawRightString(width - 19 * mm, 9 * mm, f"Page {doc.page}")
        canvas.restoreState()


def build():
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=23,
        leading=28,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#111827"),
        spaceAfter=6,
    )
    subtitle_style = ParagraphStyle(
        "Subtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10,
        leading=14,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#6B7280"),
        spaceAfter=16,
    )
    intro_style = ParagraphStyle(
        "Intro",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=9.4,
        leading=13.6,
        alignment=TA_LEFT,
        textColor=colors.HexColor("#111827"),
        backColor=colors.HexColor("#F3F4F6"),
        borderColor=colors.HexColor("#E5E7EB"),
        borderWidth=0.6,
        borderPadding=8,
        spaceAfter=12,
    )
    scope_style = ParagraphStyle(
        "Scope",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.7,
        leading=12.4,
        textColor=colors.HexColor("#374151"),
        alignment=TA_LEFT,
        spaceAfter=8,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=11.4,
        leading=14.6,
        textColor=colors.HexColor("#111827"),
        spaceBefore=7,
        spaceAfter=4,
        keepWithNext=True,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.7,
        leading=12.4,
        textColor=colors.HexColor("#374151"),
        alignment=TA_LEFT,
        spaceAfter=4.7,
    )

    story = [
        Paragraph("Master Service Agreement", title_style),
        Paragraph("Legal &amp; Trust | Last updated: April 2026", subtitle_style),
        Paragraph(
            "This Master Service Agreement applies when an order form, proposal, statement of work, pilot agreement, enterprise agreement, or other written document references it.",
            intro_style,
        ),
        Paragraph(
            'This Master Service Agreement ("MSA") governs paid B2B SaaS subscriptions, pilots, implementation services, order forms, enterprise agreements, and related services provided by <b>Zoveto Technologies Private Limited</b> ("Zoveto", "we", "us").',
            scope_style,
        ),
    ]

    for title, paragraphs in SECTIONS:
        story.append(Paragraph(title, section_style))
        for text in paragraphs:
            story.append(Paragraph(text, body_style))
        story.append(Spacer(1, 0.8 * mm))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = MsaDocTemplate(str(OUTPUT))
    doc.build(story)
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    build()
