import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  buildDemoIntent,
  buildDemoNotificationEmail,
  parseCompanyType,
  parseEmployeeBand,
  parseRole,
  parseTimeline,
  parseUtmFromBody,
  scoreDemoLead,
  timelineDisplayLabel,
  timelineEmailLabel,
} from "@/lib/demo-lead";

describe("demo-lead qualification", () => {
  it("parses allowlisted role, timeline, company type, and employee band", () => {
    assert.equal(parseRole("Owner/Founder"), "Owner/Founder");
    assert.equal(parseRole("intern"), null);
    assert.equal(parseTimeline("this_month"), "this_month");
    assert.equal(parseTimeline("soon"), null);
    assert.equal(parseCompanyType("Manufacturing"), "Manufacturing");
    assert.equal(parseCompanyType("Agriculture"), null);
    assert.equal(parseEmployeeBand("1–10"), "1–10");
    assert.equal(parseEmployeeBand("1-10"), "1–10");
    assert.equal(parseEmployeeBand("9"), null);
  });

  it("scores Owner/Founder + this_month as a high-priority lead", () => {
    assert.equal(scoreDemoLead({ role: "Owner/Founder", timeline: "this_month" }), 90);
    assert.ok(scoreDemoLead({ role: "Owner/Founder", timeline: "this_month" }) >
      scoreDemoLead({ role: "Other", timeline: "researching" }));
    assert.equal(scoreDemoLead({ role: null, timeline: null }), 0);
  });

  it("builds the staff email subject and body from the prompt template", () => {
    const submittedAt = new Date("2026-09-05T08:30:00.000Z");
    const mail = buildDemoNotificationEmail({
      fullName: "Asha Patel",
      email: "asha@example.com",
      phone: "+91 90000 00000",
      company: "Patel Trading",
      companyType: "Trading",
      employeeBand: "11–50",
      role: "Owner/Founder",
      timeline: "this_month",
      preferredDate: "2026-09-12",
      preferredTime: "morning",
      message: "Need inventory + GST walkthrough",
      utmSource: "google",
      utmCampaign: "india-search-demo",
      submittedAt,
    });

    assert.equal(mail.subject, "[Website] Demo request — Patel Trading (Ready this month)");
    assert.match(mail.text, /New demo request from the website/);
    assert.match(mail.text, /Timeline: Ready this month/);
    assert.match(mail.text, /Role: Owner\/Founder/);
    assert.match(mail.text, /Name: Asha Patel/);
    assert.match(mail.text, /Work email: asha@example.com/);
    assert.match(mail.text, /Phone: \+91 90000 00000/);
    assert.match(mail.text, /Company: Patel Trading/);
    assert.match(mail.text, /Company type: Trading/);
    assert.match(mail.text, /Team size: 11–50/);
    assert.match(mail.text, /Preferred date: 2026-09-12/);
    assert.match(mail.text, /Preferred time: Morning/);
    assert.match(mail.text, /Need inventory \+ GST walkthrough/);
    assert.match(mail.text, /Source: google \/ india-search-demo/);
    assert.match(mail.text, /Submitted: /);
    assert.match(mail.text, /IST/);
    assert.match(mail.text, /replyTo is already set/);
  });

  it("omits the timeline parenthetical when timeline is missing", () => {
    const mail = buildDemoNotificationEmail({
      fullName: "Ravi",
      email: "ravi@example.com",
      phone: "",
      company: "Ravi Co",
      companyType: null,
      employeeBand: null,
      role: null,
      timeline: null,
      preferredDate: "",
      preferredTime: "",
      message: "",
      utmSource: null,
      utmCampaign: null,
      submittedAt: new Date("2026-09-05T08:30:00.000Z"),
    });
    assert.equal(mail.subject, "[Website] Demo request — Ravi Co");
    assert.match(mail.text, /Timeline: Not specified/);
    assert.match(mail.text, /Role: Not specified/);
    assert.match(mail.text, /Phone: -/);
    assert.match(mail.text, /Preferred date: No preference given/);
    assert.match(mail.text, /Preferred time: No preference given/);
    assert.match(mail.text, /\(none\)/);
    assert.match(mail.text, /Source: direct \/ -/);
  });

  it("keeps intent as date/time/notes only", () => {
    assert.equal(
      buildDemoIntent({ preferredDate: "2026-09-12", preferredTime: "afternoon", message: "See POS" }),
      "Preferred date: 2026-09-12\nPreferred time: Afternoon (2–5 IST)\nNotes: See POS",
    );
    assert.equal(buildDemoIntent({ preferredDate: "", preferredTime: "", message: "" }), null);
  });

  it("reads UTM keys from the stored first-touch object", () => {
    const utm = parseUtmFromBody({
      utm: { utm_source: "google", utm_medium: "cpc", utm_campaign: "india-search-demo" },
    });
    assert.equal(utm.utmSource, "google");
    assert.equal(utm.utmMedium, "cpc");
    assert.equal(utm.utmCampaign, "india-search-demo");
  });

  it("exposes human timeline labels for CRM and email", () => {
    assert.equal(timelineEmailLabel("this_month"), "Ready this month");
    assert.equal(timelineEmailLabel("1_3_months"), "1–3 months");
    assert.equal(timelineEmailLabel("researching"), "Researching");
    assert.equal(timelineDisplayLabel("this_month"), "Ready to start this month");
    assert.equal(timelineEmailLabel(null), null);
  });
});

describe("demo-lead wiring contracts", () => {
  const read = (rel: string) => fs.readFileSync(path.join(process.cwd(), rel), "utf8");

  it("adds required Role and Timeline selects on the demo form and forwards them", () => {
    const form = read("components/forms/DemoBookingForm.tsx");
    assert.match(form, /name="demoRole"/);
    assert.match(form, /name="demoTimeline"/);
    assert.match(form, /Please select your role/);
    assert.match(form, /Please select your timeline/);
    assert.match(form, /role: role\.trim\(\)/);
    assert.match(form, /timeline: timeline\.trim\(\)/);
    assert.match(form, /demoConsent/);
    assert.doesNotMatch(form, /budget/i);
  });

  it("saves structured qualification columns on POST /api/demo", () => {
    const route = read("app/api/demo/route.ts");
    assert.match(route, /companyType/);
    assert.match(route, /employeeBand/);
    assert.match(route, /role/);
    assert.match(route, /timeline/);
    assert.match(route, /scoreDemoLead/);
    assert.match(route, /buildDemoNotificationEmail/);
    assert.match(route, /replyTo: email/);
    assert.doesNotMatch(route, /unknown@example\.com/);
  });

  it("forwards role and timeline as own JSON fields from bookDemo", () => {
    const api = read("lib/api.ts");
    assert.match(api, /role\?: string/);
    assert.match(api, /timeline\?: string/);
    assert.match(api, /role: data\.role/);
    assert.match(api, /timeline: data\.timeline/);
    assert.doesNotMatch(api, /Company type: \$\{data\.industry\}/);
  });

  it("maps qualification fields through CRM types, drawer, filters, and CSV", () => {
    const types = read("app/dashboard/(dashboard)/leads/types.ts");
    const page = read("app/dashboard/(dashboard)/leads/page.tsx");
    const client = read("app/dashboard/(dashboard)/leads/components/LeadsCrmClient.tsx");
    const drawer = read("app/dashboard/(dashboard)/leads/components/LeadDrawer.tsx");
    for (const field of ["companyType", "employeeBand", "role", "timeline"]) {
      assert.match(types, new RegExp(`${field}: string \\| null`));
      assert.match(page, new RegExp(`${field}: lead\\.${field}`));
    }
    assert.match(client, /Company Type/);
    assert.match(client, /Employees/);
    assert.match(client, /"Role"/);
    assert.match(client, /"Timeline"/);
    assert.match(client, /companyTypeFilter/);
    assert.match(client, /roleFilter/);
    assert.match(client, /timelineFilter/);
    assert.match(drawer, /Company Type/);
    assert.match(drawer, /Employees/);
    assert.match(drawer, /label="Role"/);
    assert.match(drawer, /label="Timeline"/);
  });

  it("does not alter the contact LeadForm or POST /api/leads path", () => {
    const leadForm = read("components/forms/LeadForm.tsx");
    const leadsRoute = read("app/api/leads/route.ts");
    assert.doesNotMatch(leadForm, /demoTimeline/);
    assert.doesNotMatch(leadsRoute, /scoreDemoLead/);
  });

  it("adds Prisma qualification columns and a migration", () => {
    const schema = read("prisma/schema.prisma");
    assert.match(schema, /companyType\s+String\?/);
    assert.match(schema, /employeeBand\s+String\?/);
    assert.match(schema, /role\s+String\?/);
    assert.match(schema, /timeline\s+String\?/);
    const migration = read("prisma/migrations/20260905120000_add_lead_qualification_fields/migration.sql");
    assert.match(migration, /ADD COLUMN IF NOT EXISTS "companyType"/);
    assert.match(migration, /ADD COLUMN IF NOT EXISTS "employeeBand"/);
    assert.match(migration, /ADD COLUMN IF NOT EXISTS "role"/);
    assert.match(migration, /ADD COLUMN IF NOT EXISTS "timeline"/);
  });
});
