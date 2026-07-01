from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "public/legal/zoveto-privacy-policy-april-2026.pdf"

GRIEVANCE_OFFICER = {
    "name": "Mehta Gourvansh Raina",
    "role": "Grievance Officer",
    "email": "privacy@zoveto.com",
    "address": "Zoveto Technologies, India",
}

PRIVACY = [
    (
        "1. Who we are",
        [
            '<b>Zoveto Technologies</b> ("Zoveto", "we", "us") provides the Zoveto software platform and related services. This policy describes how we process personal and account-related information when you use our website and services.',
            "For users in India, Zoveto acts as a <b>Data Fiduciary</b> when we determine the purpose and means of processing your personal data in connection with our website, accounts, billing, and service operations. You are the <b>Data Principal</b> for personal data about you. Where you use Zoveto to process your employees', customers', or other third parties' data, you are generally the Data Fiduciary for that data and Zoveto processes it on your instructions as described in our Data Processing Agreement.",
            "For privacy requests and data rights: privacy@zoveto.com",
        ],
    ),
    (
        "2. Data we collect",
        [
            "Depending on how you interact with Zoveto, we may process:",
            "<b>Account data:</b> email address, name, company name, phone number where provided, and credentials (passwords are stored using strong one-way hashing; we never store them in plain text).",
            "<b>Marketing, demo, and contact data:</b> information submitted through website forms, demo requests, email, phone, WhatsApp, or other business contact channels.",
            "<b>Usage data:</b> product and website interactions, diagnostic and security logs, approximate device/browser metadata, and session information needed to operate and secure the service.",
            "<b>Billing and tax data:</b> billing contact details, GST identification where applicable, invoice metadata, and payment references. Card or UPI payment details are handled by our payment service provider; we do not store full card numbers.",
            "<b>Operational business data you enter:</b> inventory, orders, invoices, and other records you choose to process in the platform (processed on your instructions as part of the service).",
            "<b>Workforce and customer records submitted by clients:</b> employee role/contact records and customer contact/order records where clients choose to store and process them in Zoveto.",
        ],
    ),
    (
        "3. Purposes of processing",
        [
            "We use data to:",
            "- provide, operate, maintain, and secure the Zoveto platform;<br/>- authenticate users, prevent fraud and abuse, and enforce our terms;<br/>- bill subscriptions, issue tax-compliant invoices, and meet accounting obligations;<br/>- improve reliability and performance using aggregated or de-identified analytics where permitted;<br/>- comply with applicable law and respond to lawful requests.",
            "We do <b>not</b> sell your personal data. We do not use your confidential business records to train third-party AI models unless we have a clear legal basis and, where required, your explicit agreement.",
        ],
    ),
    (
        "4. Where data is stored",
        [
            "Zoveto hosts production workloads on <b>Amazon Web Services (AWS)</b> infrastructure, with encryption in transit (TLS) and encryption at rest for core data stores. Backup and retention policies are applied in line with our security programme and contractual commitments.",
            "Data may be processed in data centres outside your country of residence when required for infrastructure, resilience, support, or service delivery. We apply appropriate contractual and technical safeguards required by applicable law.",
        ],
    ),
    (
        "5. Third-party services",
        [
            "We use a limited set of processors and infrastructure providers, including:",
            "<b>AWS</b>: cloud hosting, storage, networking, and related operational services;<br/><b>Payment providers</b>: to collect subscription payments and issue receipts;<br/><b>Analytics</b>: where enabled and only if you consent (e.g. Google Analytics, Microsoft Clarity);<br/><b>Communication providers</b>: transactional email services for account notifications and service communication.",
            "A current list of material sub-processors is available at https://zoveto.com/subprocessors. Sub-processor updates are governed by our agreements and applicable law.",
        ],
    ),
    (
        "6. Cookies and similar technologies",
        [
            "We use cookies and local storage where necessary to run the site securely. Optional categories (analytics, marketing) are only used with your consent. You can change your choices at any time using <b>Manage cookies</b> on this website.",
        ],
    ),
    (
        "7. Retention",
        [
            "We retain information for as long as needed to provide the service, comply with law, resolve disputes, and enforce agreements. After account termination, operational copies are deleted or anonymised according to the schedule below, subject to legal holds and statutory retention.",
        ],
    ),
    (
        "8. Your rights",
        [
            "Depending on your jurisdiction (including GDPR and India's Digital Personal Data Protection Act, 2023), you may have rights to <b>access</b>, <b>correct</b>, <b>update</b>, or <b>delete</b> certain personal data, and to <b>withdraw consent</b> where processing is consent-based. You may also have rights to portability, nomination, grievance redressal, or to object to certain processing.",
            "<b>Consent withdrawal:</b> Where we rely on your consent (for example, optional analytics cookies on our marketing site), you may withdraw consent at any time using <b>Manage cookies</b> on this website or by emailing privacy@zoveto.com.",
            "<b>Nomination:</b> If you are a Data Principal in India, you may nominate another individual to exercise your rights under the DPDP Act in the event of your death or incapacity. Send the nomination in writing to privacy@zoveto.com with sufficient details for us to verify and record it.",
            "To exercise your rights, contact privacy@zoveto.com. We will verify your request and respond within a reasonable period as required by law, typically within 30 days.",
            "<b>EU/EEA (GDPR):</b> rights may include access, rectification, erasure, restriction, objection, and portability.<br/><b>India (DPDP Act 2023):</b> rights may include access, correction, erasure, grievance redressal, and nomination.<br/><b>California (CCPA/CPRA framework):</b> rights may include access, deletion, and choices around data sharing where applicable.",
        ],
    ),
    (
        "9. India: Digital Personal Data Protection Act, 2023",
        [
            'This section supplements the rest of this policy for individuals whose personal data is processed under India\'s Digital Personal Data Protection Act, 2023 ("DPDP Act"). It is intended to support transparency and readiness. It does not by itself certify full legal compliance with every DPDP obligation.',
            "Zoveto processes personal data for lawful purposes connected with providing and improving the Service, securing accounts, billing, support, and compliance. We seek consent where required, and otherwise process personal data on permitted grounds under applicable law.",
            "As a Data Principal in India, you may have the right to obtain information, seek correction or erasure, withdraw consent, nominate another person, and raise a grievance with Zoveto.",
            "If you believe our processing violates applicable law, contact us first at privacy@zoveto.com or through the grievance process in section 10.",
        ],
    ),
    (
        "10. Grievance officer and redressal",
        [
            "In accordance with India's DPDP Act framework, Zoveto has appointed a Grievance Officer to address Data Principal complaints relating to our processing of personal data.",
            f"<b>Name:</b> {GRIEVANCE_OFFICER['name']}<br/><b>Role:</b> {GRIEVANCE_OFFICER['role']}<br/><b>Email:</b> {GRIEVANCE_OFFICER['email']}<br/><b>Address:</b> {GRIEVANCE_OFFICER['address']}",
            f"To lodge a grievance, email {GRIEVANCE_OFFICER['email']} with your name, contact details, a clear description of the issue, and any supporting information. We will acknowledge receipt within a reasonable time and aim to resolve grievances within <b>thirty (30) days</b> of receipt, unless a longer period is permitted by applicable law.",
            "If your grievance is not resolved to your satisfaction, you may have additional remedies available under applicable law, including escalation to the Data Protection Board of India once operational and as permitted by law.",
        ],
    ),
    (
        "11. International transfers",
        [
            "Where personal data is transferred outside India or your country, we implement appropriate safeguards (such as contractual clauses and technical measures) consistent with applicable regulations.",
        ],
    ),
    (
        "12. Children",
        [
            "Zoveto is a business platform not intended for children. We do not knowingly collect personal data from anyone under 18. If you believe we have collected data from a minor, contact us at privacy@zoveto.com.",
        ],
    ),
    (
        "13. Changes",
        [
            "We may update this Privacy Policy from time to time. Material changes will be communicated as required by law (for example, by email or an in-product notice). Continued use after the effective date constitutes acceptance of the updated policy where permitted.",
        ],
    ),
    (
        "14. Related policies",
        [
            "Terms of Service<br/>Cookie Policy<br/>Data Processing Agreement<br/>Acceptable Use Policy<br/>Security &amp; Data Protection<br/>Subprocessors",
        ],
    ),
    (
        "15. Contact",
        [
            f"<b>Zoveto Technologies</b><br/>Privacy and data rights: privacy@zoveto.com<br/>Grievance Officer: {GRIEVANCE_OFFICER['name']} — {GRIEVANCE_OFFICER['email']}<br/>Security and compliance requests: security@zoveto.com",
        ],
    ),
]

RETENTION_ROWS = [
    ["Data category", "Typical retention period", "Notes"],
    [
        "Account profile and credentials",
        "While active, then up to 12 months after closure",
        "Deleted or anonymised unless a longer period is required for support, audit, or legal claims.",
    ],
    [
        "Billing, invoices, and GST records",
        "Up to 8 years from the relevant financial year",
        "Retained as required under applicable Indian tax, accounting, and company law.",
    ],
    [
        "Security, access, and audit logs",
        "Up to 24 months",
        "Used for security operations, abuse prevention, and incident investigation.",
    ],
    [
        "Support and grievance correspondence",
        "Up to 3 years from last contact",
        "Retained to resolve requests and demonstrate compliance with redressal obligations.",
    ],
    [
        "Marketing-site analytics (consent-based)",
        "Until consent is withdrawn, then up to 30 days",
        "Applies only where optional analytics cookies are enabled with consent.",
    ],
    [
        "Operational business data you enter",
        "While subscription is active, then per export and deletion terms",
        "Export and deletion timelines follow your plan and our Terms.",
    ],
]


class PrivacyDocTemplate(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=18 * mm,
            rightMargin=18 * mm,
            topMargin=23 * mm,
            bottomMargin=20 * mm,
            title="Zoveto Privacy Policy",
            author="Zoveto Technologies",
            subject="Privacy Policy",
        )
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="normal")
        self.addPageTemplates([PageTemplate(id="privacy", frames=[frame], onPage=self.draw_page)])

    def draw_page(self, canvas, doc):
        canvas.saveState()
        width, height = A4
        canvas.setStrokeColor(colors.HexColor("#E5E7EB"))
        canvas.setLineWidth(0.5)
        canvas.line(18 * mm, height - 16 * mm, width - 18 * mm, height - 16 * mm)
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#6B7280"))
        canvas.drawString(18 * mm, height - 12 * mm, "Zoveto Technologies")
        canvas.drawRightString(width - 18 * mm, height - 12 * mm, "Privacy Policy")
        canvas.line(18 * mm, 14 * mm, width - 18 * mm, 14 * mm)
        canvas.drawString(18 * mm, 9 * mm, "https://zoveto.com/privacy")
        canvas.drawRightString(width - 18 * mm, 9 * mm, f"Page {doc.page}")
        canvas.restoreState()


def retention_table(body_style):
    data = [[Paragraph(cell, body_style) for cell in row] for row in RETENTION_ROWS]
    table = Table(data, colWidths=[52 * mm, 42 * mm, 68 * mm], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#F3F4F6")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 7.5),
                ("LEADING", (0, 0), (-1, -1), 10),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#E5E7EB")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return table


def build():
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=24,
        leading=29,
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
        spaceAfter=18,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=11.5,
        leading=15,
        textColor=colors.HexColor("#111827"),
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=12.5,
        textColor=colors.HexColor("#374151"),
        alignment=TA_LEFT,
        spaceAfter=5,
    )

    story = [
        Paragraph("Privacy Policy", title_style),
        Paragraph("Legal &amp; Trust | Last updated: April 2026", subtitle_style),
    ]

    for title, paragraphs in PRIVACY:
        story.append(Paragraph(title, section_style))
        for text in paragraphs:
            story.append(Paragraph(text, body_style))
        if title == "7. Retention":
            story.append(Spacer(1, 2 * mm))
            story.append(retention_table(body_style))
        story.append(Spacer(1, 1.5 * mm))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = PrivacyDocTemplate(str(OUTPUT))
    doc.build(story)
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    build()
