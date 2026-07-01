from pathlib import Path
from textwrap import wrap

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


OUT = Path("output/pdf")
OUT.mkdir(parents=True, exist_ok=True)


COMPANY = "Zoveto Technologies Private Limited"
DATE = "April 2026"
INK = colors.HexColor("#111827")
MUTED = colors.HexColor("#5f6b7a")
LINE = colors.HexColor("#d9dee7")
SOFT = colors.HexColor("#f4f6f8")


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="DocTitle",
        parent=styles["Title"],
        fontName="Helvetica",
        fontSize=24,
        leading=30,
        textColor=INK,
        alignment=1,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="Subtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10,
        leading=14,
        textColor=MUTED,
        alignment=1,
        spaceAfter=16,
    )
)
styles.add(
    ParagraphStyle(
        name="Lead",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10.2,
        leading=15,
        textColor=INK,
        backColor=SOFT,
        borderColor=LINE,
        borderWidth=0.7,
        borderPadding=8,
        spaceAfter=12,
    )
)
styles.add(
    ParagraphStyle(
        name="Section",
        parent=styles["Heading2"],
        fontName="Helvetica",
        fontSize=14,
        leading=18,
        textColor=INK,
        spaceBefore=10,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.4,
        leading=13.2,
        textColor=colors.HexColor("#2f3b4c"),
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="Small",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8,
        leading=11,
        textColor=MUTED,
    )
)


def header_footer(canvas, doc, title):
    canvas.saveState()
    width, height = A4
    canvas.setFont("Helvetica", 8.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, height - 15 * mm, COMPANY)
    canvas.drawRightString(width - 18 * mm, height - 15 * mm, title)
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, height - 19 * mm, width - 18 * mm, height - 19 * mm)
    canvas.line(18 * mm, 15 * mm, width - 18 * mm, 15 * mm)
    canvas.drawString(18 * mm, 10 * mm, "https://zoveto.com")
    canvas.drawRightString(width - 18 * mm, 10 * mm, f"Page {doc.page}")
    canvas.restoreState()


def make_doc(filename, title, subtitle, lead, sections, tables=None):
    path = OUT / filename
    doc = BaseDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=25 * mm,
        bottomMargin=20 * mm,
        title=title,
        author=COMPANY,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates(
        [PageTemplate(id="template", frames=[frame], onPage=lambda c, d: header_footer(c, d, title))]
    )

    story = [
        Paragraph(title, styles["DocTitle"]),
        Paragraph(subtitle, styles["Subtitle"]),
        Paragraph(lead, styles["Lead"]),
    ]
    tables = tables or {}
    for heading, body in sections:
        story.append(Paragraph(heading, styles["Section"]))
        if heading in tables:
            story.append(build_table(tables[heading]))
            story.append(Spacer(1, 4))
        for para in body:
            story.append(Paragraph(para, styles["Body"]))
    story.append(signature_block())
    doc.build(story)
    return path


def build_table(rows):
    table_data = [[Paragraph(str(cell), styles["Small"]) for cell in row] for row in rows]
    tbl = Table(table_data, hAlign="LEFT", colWidths=None, repeatRows=1)
    tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e9edf3")),
                ("TEXTCOLOR", (0, 0), (-1, 0), INK),
                ("GRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return tbl


def signature_block():
    data = [
        ["For Zoveto Technologies Private Limited", "For Counterparty"],
        ["Name:", "Name:"],
        ["Title:", "Title:"],
        ["Signature:", "Signature:"],
        ["Date:", "Date:"],
    ]
    tbl = Table(data, colWidths=[80 * mm, 80 * mm], hAlign="LEFT")
    tbl.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("BACKGROUND", (0, 0), (-1, 0), SOFT),
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("TEXTCOLOR", (0, 0), (-1, -1), INK),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        )
    )
    tbl.splitByRow = 0
    return KeepTogether([Spacer(1, 8), tbl])


nda_sections = [
    ("1. Purpose", [
        "The parties may exchange confidential business, technical, financial, product, commercial, operational, customer, security, legal, or other non-public information for evaluating, discussing, negotiating, or performing a business relationship with Zoveto.",
    ]),
    ("2. Mutual confidentiality obligation", [
        "Each party receiving Confidential Information shall use it only for the Purpose, protect it using reasonable care, and not disclose it except to personnel, advisers, contractors, or service providers who need to know and are bound by confidentiality obligations.",
    ]),
    ("3. Exclusions", [
        "Confidential Information does not include information that is publicly available without breach, already known without restriction, independently developed without use of Confidential Information, lawfully received from a third party without confidentiality restriction, or required to be disclosed by law.",
    ]),
    ("4. Compelled disclosure", [
        "If a receiving party is required by law, court, regulator, or governmental authority to disclose Confidential Information, it shall, where legally permitted, provide prompt notice and reasonable cooperation so the disclosing party may seek protective treatment.",
    ]),
    ("5. Confidentiality term", [
        "The confidentiality obligations continue for three (3) years from disclosure. Trade secrets and highly sensitive security, source code, credential, architecture, product roadmap, pricing, customer, and business strategy information remain protected for as long as they remain confidential under applicable law.",
    ]),
    ("6. Ownership and no license", [
        "All Confidential Information remains the property of the disclosing party. No intellectual property rights or licenses are granted except the limited right to use Confidential Information for the Purpose.",
    ]),
    ("7. Return or destruction", [
        "Upon request or termination of discussions, the receiving party shall return or destroy Confidential Information, except that archival copies may be retained where required for legal, compliance, backup, or professional record-keeping purposes and remain subject to this NDA.",
    ]),
    ("8. No obligation", [
        "This NDA does not require either party to proceed with any transaction, partnership, purchase, investment, pilot, or commercial arrangement.",
    ]),
    ("9. Remedies", [
        "Unauthorised disclosure or misuse may cause irreparable harm. The disclosing party may seek injunctive or equitable relief in addition to other remedies available under law.",
    ]),
    ("10. Governing law and jurisdiction", [
        "This NDA is governed by the laws of India. Courts at New Delhi, India shall have jurisdiction for disputes, interim relief, enforcement, and non-arbitrable matters unless the parties agree otherwise in writing.",
    ]),
]

pilot_tables = {
    "3. Pilot scope": [
        ["Area", "Description"],
        ["Included modules", "Modules, integrations, workflows, users, locations, and environments expressly listed in the pilot order form or written pilot scope."],
        ["Excluded items", "Production go-live, custom development, integrations, migrations, support coverage, or professional services not expressly included in writing."],
    ],
    "5. Success criteria": [
        ["KPI area", "Example success measure"],
        ["Functional fit", "Agreed workflows can be demonstrated or configured for pilot users."],
        ["Operational value", "Pilot users can evaluate measurable improvements in visibility, speed, accuracy, or process control."],
        ["Readiness", "Customer identifies requirements, blockers, implementation needs, and paid subscription fit."],
    ],
}

pilot_sections = [
    ("1. Pilot objective", [
        "This Pilot Agreement governs a limited evaluation or pilot of Zoveto services for the customer identified in the applicable pilot form, proposal, statement of work, or written agreement.",
        "The pilot is intended to validate business fit, workflows, configuration, implementation approach, and transition readiness. It is not a full production deployment unless expressly agreed in writing.",
    ]),
    ("2. Pilot duration", [
        "Unless a different period is stated in writing, the pilot will run for thirty (30) days from the pilot start date. Extensions must be agreed in writing.",
    ]),
    ("3. Pilot scope", []),
    ("4. Customer responsibilities", [
        "Customer shall provide accurate information, pilot data, access to required stakeholders, timely feedback, and authorised users. Customer is responsible for the legality, accuracy, rights, permissions, and quality of all data submitted during the pilot.",
    ]),
    ("5. Success criteria", []),
    ("6. Fees and expenses", [
        "The pilot may be free or paid as stated in the applicable pilot form or proposal. Any paid pilot fees, taxes, implementation fees, travel expenses, or third-party charges must be set out in writing.",
    ]),
    ("7. Support limits", [
        "Pilot support is provided on a commercially reasonable best-effort basis unless a written agreement states otherwise. Service level credits do not apply to pilots unless expressly included in a signed agreement.",
    ]),
    ("8. No production reliance", [
        "Customer shall not rely on the pilot environment for live production operations, statutory records, payroll, tax filing, financial close, customer commitments, or critical business continuity unless Zoveto has expressly agreed to production use in writing.",
    ]),
    ("9. Data ownership and use", [
        "Customer retains ownership of Customer data submitted to the pilot. Zoveto retains ownership of the services, software, workflows, templates, documentation, product improvements, analytics models, know-how, and Zoveto branding.",
    ]),
    ("10. Data export and deletion at pilot end", [
        "At pilot expiry or termination, Customer may request export of pilot data where technically available. Unless a longer period is required by law, security, backup, dispute, or legitimate business requirements, Zoveto will delete or anonymise pilot data from active systems within sixty (60) days after pilot end or written deletion request. Backup copies may remain for up to ninety (90) days in the ordinary backup lifecycle.",
    ]),
    ("11. Transition to paid subscription", [
        "Any transition from pilot to paid subscription requires a signed order form, proposal, statement of work, or other written agreement covering modules, fees, billing cycle, implementation scope, support, term, and applicable legal documents.",
    ]),
    ("12. Termination", [
        "Either party may terminate the pilot on written notice if the pilot is no longer required, if the other party materially breaches the pilot terms, or if continued pilot access creates legal, security, operational, or commercial risk.",
    ]),
    ("13. Liability cap", [
        "To the maximum extent permitted by law, Zoveto's total liability arising from the pilot shall not exceed the pilot fees paid by Customer, or INR 10,000 if the pilot is free, except for liability that cannot be limited under applicable law.",
    ]),
    ("14. Governing law", [
        "This Pilot Agreement is governed by the laws of India. Disputes shall be subject to courts at New Delhi, India for interim relief, enforcement, and non-arbitrable matters unless another written agreement controls.",
    ]),
]

ip_sections = [
    ("1. Purpose and coverage", [
        "This IP Assignment Agreement is intended for employees, contractors, consultants, interns, advisers, designers, developers, agencies, and other contributors engaged by Zoveto. It should be signed on or before day 1 of engagement.",
        "This template is internal and should be reviewed and adapted for each engagement type before signature.",
    ]),
    ("2. Assignment of work product", [
        "Contributor irrevocably assigns to Zoveto all worldwide right, title, and interest in all work product created, conceived, authored, designed, developed, reduced to practice, discovered, improved, or contributed during the engagement, whether alone or jointly with others.",
        "Work product includes source code, repositories, designs, documentation, inventions, models, prompts, datasets, workflows, automation logic, architecture, product improvements, brand assets, marketing assets, specifications, processes, trade secrets, and other materials related to Zoveto's business or created using Zoveto resources.",
    ]),
    ("3. Present and future rights", [
        "The assignment applies to all intellectual property rights, including copyrights, patent rights, design rights, database rights, trade secret rights, know-how, moral rights to the extent legally assignable or waivable, and all renewals, extensions, continuations, and derivative works.",
    ]),
    ("4. Moral rights waiver and consent", [
        "To the extent permitted by law, Contributor waives and agrees not to assert moral rights or similar rights in assigned work product. Where waiver is not permitted, Contributor consents to Zoveto's use, modification, publication, adaptation, commercialization, and enforcement of the work product without further approval.",
    ]),
    ("5. No exceptions unless disclosed", [
        "Contributor confirms that there are no pre-existing works, open-source components, third-party materials, tools, restrictions, or prior obligations affecting the work product except those disclosed in writing and approved by Zoveto before use.",
    ]),
    ("6. Open-source and third-party materials", [
        "Contributor shall not include open-source, copyleft, third-party, confidential, employer-owned, client-owned, or restricted materials in Zoveto work product unless approved in writing and used in compliance with applicable license and contractual terms.",
    ]),
    ("7. Further assurances", [
        "Contributor shall sign documents, provide records, and reasonably assist Zoveto in registering, perfecting, enforcing, transferring, or defending intellectual property rights in the work product, during and after the engagement.",
    ]),
    ("8. Confidentiality", [
        "Contributor shall keep Zoveto Confidential Information strictly confidential and use it only for authorised Zoveto work. Confidential Information includes source code, credentials, architecture, product plans, customer information, pricing, business plans, legal documents, security information, and non-public operational data.",
    ]),
    ("9. Return of materials", [
        "Upon request or end of engagement, Contributor shall return or securely delete Zoveto materials, devices, documents, credentials, keys, code, files, repositories, datasets, and copies, except where retention is required by law and remains confidential.",
    ]),
    ("10. Representations", [
        "Contributor represents that assigned work product is original to Contributor or properly authorised, does not knowingly infringe third-party rights, and does not breach any prior employment, consulting, confidentiality, invention assignment, or non-compete obligation.",
    ]),
    ("11. Employees and contractors", [
        "For employees, this agreement supplements employment terms. For contractors and consultants, this agreement applies regardless of whether payment is hourly, fixed-fee, milestone-based, equity-based, or otherwise agreed.",
    ]),
    ("12. Survival", [
        "Assignment, confidentiality, return of materials, further assurances, representations, and enforcement obligations survive termination or expiry of the engagement.",
    ]),
    ("13. Governing law", [
        "This agreement is governed by the laws of India. Courts at New Delhi, India shall have jurisdiction for interim relief, enforcement, and non-arbitrable matters unless a signed engagement agreement states otherwise.",
    ]),
]


make_doc(
    "zoveto-mutual-nda-template-april-2026.pdf",
    "Mutual Non-Disclosure Agreement",
    f"Legal Template | Last updated: {DATE}",
    "This Mutual Non-Disclosure Agreement template may be used when Zoveto and another party exchange confidential information for sales, procurement, partnerships, investment discussions, vendor evaluation, pilots, or other business discussions.",
    nda_sections,
)

make_doc(
    "zoveto-pilot-agreement-template-april-2026.pdf",
    "Pilot Agreement Template",
    f"Legal Template | Last updated: {DATE}",
    "This Pilot Agreement template may be used for limited Zoveto evaluations, pilots, proof-of-concept projects, and pre-production customer trials.",
    pilot_sections,
    pilot_tables,
)

make_doc(
    "zoveto-ip-assignment-template-april-2026.pdf",
    "IP Assignment Agreement Template",
    f"Internal Legal/HR Template | Last updated: {DATE}",
    "This internal template is for Zoveto employees, contractors, consultants, agencies, developers, designers, and other contributors. It should not be published as a public marketing page.",
    ip_sections,
)

print("Generated:")
for pdf in sorted(OUT.glob("zoveto-*-template-april-2026.pdf")):
    print(pdf)
