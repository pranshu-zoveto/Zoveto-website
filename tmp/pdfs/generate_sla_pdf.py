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
OUTPUT = ROOT / "public/legal/zoveto-service-level-agreement-april-2026.pdf"

SUPPORT_TIERS = [
    ("Free / Evaluation", "Email or form", "Best effort", "Not available"),
    ("Starter", "Email or form", "Business hours", "Available only if the order form includes paid production SLA coverage"),
    ("Growth", "Email or form", "Business hours priority support", "Available for covered paid production subscriptions"),
    ("Enterprise", "Email, form, and agreed customer-success channel", "Business hours or contract-defined coverage", "As stated in this SLA or the order form"),
]

PRIORITY_LEVELS = [
    ("P1 Critical", "Production service is unavailable or a critical business workflow is blocked for most users with no reasonable workaround.", "Full platform outage, login unavailable for all users, critical data processing unavailable."),
    ("P2 High", "Major functionality is degraded or unavailable for multiple users, but a workaround exists.", "Key module unavailable, severe performance degradation, integration failure affecting active workflows."),
    ("P3 Medium", "Non-critical issue affecting limited users or non-core functionality.", "Reporting issue, minor workflow defect, configuration issue, UI issue that does not block operations."),
    ("P4 Low", "General question, cosmetic issue, documentation request, enhancement request, or non-urgent configuration help.", "How-to question, copy issue, non-blocking UI improvement, feature request."),
]

RESPONSE_TARGETS = [
    ("P1 Critical", "4 business hours", "Every business day or when materially updated", "Commercially reasonable continuous effort during business hours until mitigated or workaround provided"),
    ("P2 High", "1 business day", "Every 2 business days or when materially updated", "Commercially reasonable effort to restore functionality or provide workaround"),
    ("P3 Medium", "2 business days", "As needed", "Scheduled into normal support or product workflow"),
    ("P4 Low", "3 business days", "As needed", "Handled through normal support, documentation, or product review"),
]

SERVICE_CREDITS = [
    ("99.0% to below 99.5%", "5% of the monthly subscription fee for the affected service"),
    ("95.0% to below 99.0%", "10% of the monthly subscription fee for the affected service"),
    ("Below 95.0%", "20% of the monthly subscription fee for the affected service"),
]

EXCLUSIONS = [
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
]

SECTIONS = [
    (
        "Scope",
        [
            "This SLA applies only to covered paid production subscriptions.",
            "Free trials, demos, pilots, evaluation environments, beta features, preview features, and sandbox environments are provided on a best-effort basis unless a written agreement says otherwise.",
            "If an order form, statement of work, or enterprise agreement contains a different SLA, that written agreement controls for that customer.",
        ],
    ),
    (
        "Monthly uptime commitment",
        [
            "Zoveto will use commercially reasonable efforts to make the covered production services available at least <b>99.5%</b> of each calendar month.",
            "<b>Monthly Uptime Percentage</b> = ((Total minutes in the calendar month - Excluded Downtime - Unplanned Downtime) / (Total minutes in the calendar month - Excluded Downtime)) x 100",
            "<b>Unplanned Downtime:</b> A period when the covered paid production service is unavailable due to Zoveto-controlled infrastructure or application issues.",
            "<b>Excluded Downtime:</b> Downtime excluded from the calculation, including scheduled maintenance, emergency maintenance, force majeure, customer-side issues, third-party outages outside Zoveto's reasonable control, beta features, misuse, unpaid accounts, and other exclusions listed in this SLA.",
        ],
    ),
    (
        "Service monitoring",
        [
            "Zoveto's internal monitoring systems, service logs, operational metrics, and availability records shall be used to determine service availability and uptime calculations unless otherwise agreed in writing.",
        ],
    ),
    (
        "Partial service degradation",
        [
            "Partial degradation affecting specific modules, integrations, workflows, features, or customer environments may be treated as service degradation rather than complete service unavailability.",
        ],
    ),
    (
        "Incident escalation",
        [
            "Critical incidents may be escalated internally to engineering, operations, security, management, and other appropriate teams to restore service availability and mitigate customer impact.",
        ],
    ),
    (
        "Service credits",
        [
            "If Zoveto fails to meet the 99.5% monthly uptime commitment for a covered paid production subscription, Customer may be eligible for a service credit against future subscription fees for the affected service.",
            "- Service credits are calculated only on the monthly recurring subscription fee for the affected service.<br/>- Credits exclude taxes, implementation fees, professional services, discounts, one-time fees, support add-ons, and third-party charges.<br/>- Service credits are Customer's sole and exclusive remedy for failure to meet the uptime commitment, unless otherwise required by law or agreed in writing.<br/>- Credits are not refunds and cannot be exchanged for cash.<br/>- Credits apply only to future invoices.",
        ],
    ),
    (
        "Credit claim process",
        [
            "- Customer must submit a credit request to support@zoveto.com within 15 days after the end of the calendar month in which the alleged SLA failure occurred.<br/>- The request must include affected dates/times, affected users or workflows, screenshots/logs if available, and a short description of business impact.<br/>- Zoveto will review service logs and support records in good faith.<br/>- Approved credits will be applied to a future invoice.",
        ],
    ),
    (
        "Exclusions",
        [
            "This SLA does not apply to downtime, delay, loss, degradation, or support issues caused by:<br/>"
            + "<br/>".join(f"- {item}" for item in EXCLUSIONS),
        ],
    ),
    (
        "Scheduled maintenance windows",
        [
            "Scheduled maintenance windows will generally not exceed eight (8) hours per maintenance event unless emergency circumstances, security requirements, or operational considerations require otherwise.",
            "- Zoveto may perform scheduled maintenance to maintain security, reliability, and performance.<br/>- Zoveto will use reasonable efforts to schedule maintenance during lower-usage periods and provide notice where practical.<br/>- Emergency maintenance may be performed without advance notice where needed to protect the service, customers, or data.",
        ],
    ),
    (
        "Capacity management and abuse prevention",
        [
            "Zoveto reserves the right to implement rate limits, capacity controls, abuse prevention measures, traffic management controls, and operational safeguards necessary to maintain platform security, availability, and reliability.",
        ],
    ),
    (
        "Customer responsibilities",
        [
            "- Customer must maintain accurate admin and support contact details.<br/>- Customer must promptly report incidents with enough detail for Zoveto to investigate.<br/>- Customer must maintain appropriate user permissions, internal controls, backups/export processes where required by its own policies, and network/device security.<br/>- Customer must not misuse the services, overload systems, bypass limits, or interfere with platform availability.",
        ],
    ),
    (
        "Relationship with MSA and order form",
        [
            "This SLA forms part of the applicable agreement only when referenced by an order form, proposal, Master Service Agreement, statement of work, or enterprise agreement.",
            "If there is a conflict between this SLA and a signed order form or enterprise agreement, the signed order form or enterprise agreement controls for that customer.",
        ],
    ),
    (
        "Survival",
        [
            "Provisions relating to service credits, payment obligations, confidentiality, limitations of liability, dispute resolution, and any provisions intended by their nature to survive shall survive termination or expiration of the applicable agreement.",
        ],
    ),
    (
        "Contact",
        [
            "Support: support@zoveto.com<br/>Security: security@zoveto.com",
        ],
    ),
]


class SlaDocTemplate(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=17 * mm,
            rightMargin=17 * mm,
            topMargin=23 * mm,
            bottomMargin=20 * mm,
            title="Zoveto Service Level Agreement",
            author="Zoveto Technologies",
            subject="Service Level Agreement",
        )
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="normal")
        self.addPageTemplates([PageTemplate(id="sla", frames=[frame], onPage=self.draw_page)])

    def draw_page(self, canvas, doc):
        canvas.saveState()
        width, height = A4
        canvas.setStrokeColor(colors.HexColor("#E5E7EB"))
        canvas.setLineWidth(0.5)
        canvas.line(17 * mm, height - 16 * mm, width - 17 * mm, height - 16 * mm)
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#6B7280"))
        canvas.drawString(17 * mm, height - 12 * mm, "Zoveto Technologies")
        canvas.drawRightString(width - 17 * mm, height - 12 * mm, "Service Level Agreement")
        canvas.line(17 * mm, 14 * mm, width - 17 * mm, 14 * mm)
        canvas.drawString(17 * mm, 9 * mm, "https://zoveto.com/sla")
        canvas.drawRightString(width - 17 * mm, 9 * mm, f"Page {doc.page}")
        canvas.restoreState()


def table(headers, rows, col_widths, body_style, font_size=6.8):
    data = [[Paragraph(cell, body_style) for cell in headers]]
    for row in rows:
        data.append([Paragraph(cell, body_style) for cell in row])
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#F3F4F6")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), font_size),
                ("LEADING", (0, 0), (-1, -1), 9.2),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#E5E7EB")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    return t


def build():
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=27,
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
        spaceAfter=12,
    )
    intro_style = ParagraphStyle(
        "Intro",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=13,
        alignment=TA_LEFT,
        textColor=colors.HexColor("#111827"),
        backColor=colors.HexColor("#F3F4F6"),
        borderColor=colors.HexColor("#E5E7EB"),
        borderWidth=0.6,
        borderPadding=8,
        spaceAfter=10,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.8,
        leading=14,
        textColor=colors.HexColor("#111827"),
        spaceBefore=6,
        spaceAfter=3,
        keepWithNext=True,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.1,
        leading=11.5,
        textColor=colors.HexColor("#374151"),
        alignment=TA_LEFT,
        spaceAfter=4,
    )
    note_style = ParagraphStyle(
        "Note",
        parent=body_style,
        fontSize=7.6,
        textColor=colors.HexColor("#6B7280"),
        spaceAfter=4,
    )

    story = [
        Paragraph("Service Level Agreement", title_style),
        Paragraph("Legal &amp; Trust | Last updated: April 2026", subtitle_style),
        Paragraph(
            "This Service Level Agreement applies to paid Zoveto production subscriptions where the applicable order form, proposal, statement of work, Master Service Agreement, or enterprise agreement references this SLA.",
            intro_style,
        ),
    ]

    for title, paragraphs in SECTIONS:
        story.append(Paragraph(title, section_style))
        for text in paragraphs:
            story.append(Paragraph(text, body_style))
        if title == "Partial service degradation":
            story.append(Spacer(1, 1.5 * mm))
            story.append(Paragraph("Support tiers by plan", section_style))
            story.append(
                table(
                    ["Plan", "Support channel", "Coverage", "SLA credits"],
                    SUPPORT_TIERS,
                    [28 * mm, 32 * mm, 38 * mm, 66 * mm],
                    body_style,
                    font_size=6.4,
                )
            )
            story.append(Spacer(1, 1 * mm))
            story.append(
                Paragraph(
                    "<b>Business hours</b> means Monday to Friday, 10:00 AM to 6:00 PM India Standard Time, excluding Indian public holidays, unless otherwise stated in an order form.",
                    body_style,
                )
            )
            story.append(Spacer(1, 1.5 * mm))
            story.append(Paragraph("Priority levels", section_style))
            story.append(
                table(
                    ["Priority", "Description", "Examples"],
                    PRIORITY_LEVELS,
                    [22 * mm, 58 * mm, 84 * mm],
                    body_style,
                    font_size=6.6,
                )
            )
            story.append(Spacer(1, 1.5 * mm))
            story.append(Paragraph("Response targets", section_style))
            story.append(
                Paragraph(
                    "The targets below are for first response and update cadence only. Zoveto does not guarantee resolution times. Resolution is handled on a commercially reasonable effort basis.",
                    note_style,
                )
            )
            story.append(
                table(
                    ["Priority", "Target first response", "Target update cadence", "Resolution approach"],
                    RESPONSE_TARGETS,
                    [20 * mm, 28 * mm, 38 * mm, 78 * mm],
                    body_style,
                    font_size=6.3,
                )
            )
        if title == "Service credits":
            story.append(Spacer(1, 1 * mm))
            story.append(
                table(
                    ["Monthly Uptime Percentage", "Service Credit"],
                    SERVICE_CREDITS,
                    [52 * mm, 112 * mm],
                    body_style,
                )
            )
        story.append(Spacer(1, 0.8 * mm))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SlaDocTemplate(str(OUTPUT))
    doc.build(story)
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    build()
