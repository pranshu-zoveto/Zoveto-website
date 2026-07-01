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
OUTPUT = ROOT / "public/legal/zoveto-terms-of-service-april-2026.pdf"


TERMS = [
    (
        "1. Agreement and scope",
        [
            'These Terms of Service ("Terms") govern access to and use of websites, applications, and services operated by <b>Zoveto Technologies</b> ("Zoveto", "we"). By using the Service, you agree to these Terms. If you do not agree, do not use the Service.',
            "Zoveto provides software tools. Users are responsible for their data and operations.",
        ],
    ),
    (
        "2. The Service",
        [
            "Zoveto provides a cloud software platform (SaaS) for business operations, including modules and features described on our website or order form. We may update the Service from time to time. Certain features may be beta, preview, or subject to additional terms.",
            "Unless expressly stated in an order form, the Service is a standard multi-tenant SaaS offering and does not include custom development, legal advice, accounting advice, or managed operations services.",
        ],
    ),
    (
        "3. Accounts and security",
        [
            "You must provide accurate registration information and keep credentials confidential. You are responsible for activities under your account. Notify us promptly at security@zoveto.com if you suspect unauthorised access.",
        ],
    ),
    (
        "4. Acceptable use and customer responsibilities",
        [
            "You agree not to:",
            "- use the Service in violation of law or third-party rights;<br/>- probe, scan, or test the vulnerability of the Service without authorisation;<br/>- interfere with or disrupt the integrity or performance of the Service;<br/>- attempt to access another customer's data;<br/>- reverse engineer the Service except where mandatory law permits.",
            "You remain responsible for your configuration, integrations, and how you use outputs from the Service (including AI-assisted features). You must maintain appropriate backups and internal controls.",
            "Additional use restrictions are set out in our Acceptable Use Policy, which is incorporated into these Terms by reference.",
        ],
    ),
    (
        "5. Subscription and billing",
        [
            "Paid plans are billed in accordance with the plan you select (e.g. monthly subscription). Fees are charged in the currency shown at checkout (typically INR) and may be subject to applicable taxes.",
            "Unless stated otherwise on the checkout page or order form, subscriptions auto-renew for successive periods until you cancel in accordance with the cancellation process we provide. You authorise us and our payment partners to charge applicable fees on each billing cycle.",
            "Invoices are generated in the ordinary course after successful payment (or as otherwise stated for enterprise billing). You are responsible for providing accurate billing and GST details.",
            "Price changes, if any, will be communicated as required by law or your agreement. See also our pricing page for tax disclosures.",
            "Prices in INR are generally used for India-based entities. If an international billing currency is offered at signup or in an order form, that selected currency applies to future billing unless changed by written agreement. Currency is determined at signup and cannot be changed after first payment unless otherwise agreed in writing. All fees are exclusive of applicable taxes, duties, and levies.",
        ],
    ),
    (
        "6. Data responsibility",
        [
            "As between you and Zoveto, <b>you control the business data</b> you submit to the Service. You are responsible for the lawfulness of your processing, instructions to us, and your compliance with regulations applicable to your industry (including tax, employment, health, or sector-specific rules). Zoveto processes customer data as a processor or service provider in accordance with our agreement and Privacy Policy.",
            "Where applicable for enterprise customers, data processing obligations are further governed by our Data Processing Agreement (DPA).",
        ],
    ),
    (
        "7. Intellectual property",
        [
            "Zoveto retains all rights in the Service, software, branding, and documentation. Subject to these Terms, we grant you a limited, non-exclusive, non-transferable right to access and use the Service during your subscription. Your data remains yours.",
        ],
    ),
    (
        "8. Suspension and termination rights",
        [
            "We may <b>suspend or restrict access</b> if we reasonably believe you have violated these Terms, pose a security risk, or if required by law. You may stop using the Service at any time. Provisions that by their nature should survive (including liability limits, indemnities, and governing law) survive termination.",
            "Either party may terminate for material breach if the breach is not cured within a reasonable notice period. We may also terminate where required by law or for prolonged non-payment.",
        ],
    ),
    (
        "9. Service limitations, disclaimers, and liability",
        [
            'The Service is provided <b>"as is"</b> and <b>"as available"</b>. To the maximum extent permitted by law, we disclaim implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted or error-free.',
            "To the maximum extent permitted by law, <b>Zoveto's total aggregate liability</b> for all claims arising out of or related to the Service, these Terms, or any order form shall not exceed the fees paid or payable by you to Zoveto for the Service in the twelve (12) months preceding the event giving rise to the claim. This cap is intended to equal a maximum of one (1) annual fee for the relevant Service unless a separate written agreement states otherwise. We are not liable for indirect, incidental, special, consequential, or punitive damages, or lost profits, data, or goodwill, even if advised of the possibility.",
            "Some jurisdictions do not allow certain limitations; in those cases our liability is limited to the fullest extent permitted.",
        ],
    ),
    (
        "10. Indemnity",
        [
            "You will defend and indemnify Zoveto and its affiliates, officers, and employees against third-party claims arising from your data, your use of the Service in breach of these Terms, or your violation of law.",
        ],
    ),
    (
        "11. Refund policy",
        [
            "Unless otherwise agreed in writing, <b>fees are non-refundable</b> except where mandatory consumer law requires otherwise. Free trials and promotional credits are governed by the terms shown at signup. If you believe you were charged in error, contact support@zoveto.com within 14 days of the charge with supporting details.",
        ],
    ),
    (
        "12. International users",
        [
            "The Service may be accessed from outside India. You are responsible for compliance with local laws applicable to your use. Nothing in these Terms limits any non-waivable consumer or data protection rights available under applicable law.",
            "If you are located outside India, you agree to the jurisdiction of New Delhi courts for disputes related to these Terms, subject to any non-waivable statutory rights under your local consumer protection laws.",
            "You may not use Zoveto for purposes that are illegal under the laws of your country of residence or the Republic of India.",
        ],
    ),
    (
        "13. Governing law and dispute resolution",
        [
            "These Terms are governed by the laws of <b>India</b>, without regard to conflict-of-law principles.",
            "Before starting formal proceedings, the parties will first attempt good-faith resolution by written notice to support@zoveto.com and allow at least thirty (30) days for commercial resolution.",
            "If the dispute is not resolved through good-faith discussions, the dispute shall be referred to and finally resolved by arbitration seated in New Delhi, India, in accordance with the Arbitration and Conciliation Act, 1996. The tribunal shall consist of a sole arbitrator appointed mutually by the parties. The arbitration language shall be English.",
            "Subject to the arbitration clause above, courts at <b>New Delhi, India</b> shall have exclusive jurisdiction for interim relief, enforcement of arbitral awards, and matters that cannot legally be resolved by arbitration.",
        ],
    ),
    (
        "14. Related policies",
        [
            "Privacy Policy<br/>Cookie Policy<br/>Data Processing Agreement<br/>Acceptable Use Policy<br/>Security &amp; Data Protection<br/>Subprocessors",
        ],
    ),
    (
        "15. Contact",
        [
            "Questions about these Terms: support@zoveto.com",
        ],
    ),
]


class TermsDocTemplate(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=20 * mm,
            rightMargin=20 * mm,
            topMargin=23 * mm,
            bottomMargin=20 * mm,
            title="Zoveto Terms of Service",
            author="Zoveto Technologies",
            subject="Terms of Service",
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            id="normal",
        )
        self.addPageTemplates([PageTemplate(id="terms", frames=[frame], onPage=self.draw_page)])

    def draw_page(self, canvas, doc):
        canvas.saveState()
        width, height = A4
        canvas.setStrokeColor(colors.HexColor("#E5E7EB"))
        canvas.setLineWidth(0.5)
        canvas.line(20 * mm, height - 16 * mm, width - 20 * mm, height - 16 * mm)
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#6B7280"))
        canvas.drawString(20 * mm, height - 12 * mm, "Zoveto Technologies")
        canvas.drawRightString(width - 20 * mm, height - 12 * mm, "Terms of Service")
        canvas.line(20 * mm, 14 * mm, width - 20 * mm, 14 * mm)
        canvas.drawString(20 * mm, 9 * mm, "https://zoveto.com/terms")
        canvas.drawRightString(width - 20 * mm, 9 * mm, f"Page {doc.page}")
        canvas.restoreState()


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
        spaceAfter=20,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12.5,
        leading=16,
        textColor=colors.HexColor("#111827"),
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.2,
        leading=13.2,
        textColor=colors.HexColor("#374151"),
        alignment=TA_LEFT,
        spaceAfter=6,
    )
    callout_style = ParagraphStyle(
        "Callout",
        parent=body_style,
        fontName="Helvetica-Bold",
        textColor=colors.HexColor("#111827"),
        backColor=colors.HexColor("#F3F4F6"),
        borderColor=colors.HexColor("#E5E7EB"),
        borderWidth=0.6,
        borderPadding=8,
        spaceBefore=2,
        spaceAfter=10,
    )

    story = [
        Paragraph("Terms of Service", title_style),
        Paragraph("Legal &amp; Trust | Last updated: April 2026", subtitle_style),
    ]

    for title, paragraphs in TERMS:
        story.append(Paragraph(title, section_style))
        for index, text in enumerate(paragraphs):
            if title == "1. Agreement and scope" and index == 1:
                story.append(Paragraph(text, callout_style))
            else:
                story.append(Paragraph(text, body_style))
        story.append(Spacer(1, 1.5 * mm))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = TermsDocTemplate(str(OUTPUT))
    doc.build(story)
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    build()
