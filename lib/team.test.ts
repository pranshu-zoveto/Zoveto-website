import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  getTeamMember,
  isAllowedLinkedInProfileUrl,
  teamLinkedInSmartPath,
  TEAM_MEMBERS,
  TEAM_SECTION_INTRO,
} from "@/lib/team";

describe("team data", () => {
  it("lists exactly two founders with Gourvansh then Pranshu in display order", () => {
    assert.equal(TEAM_MEMBERS.length, 2);
    assert.equal(TEAM_MEMBERS[0]!.id, "gourvansh-raina");
    assert.equal(TEAM_MEMBERS[1]!.id, "pranshu-gupta");
    assert.match(TEAM_MEMBERS[0]!.role, /Co-Founder,\s*Zoveto/i);
    assert.match(TEAM_MEMBERS[1]!.role, /Chief Executive Officer/i);
  });

  it("requires image URLs and 2–3 bio paragraphs", () => {
    for (const m of TEAM_MEMBERS) {
      assert.ok(m.image.startsWith("https://res.cloudinary.com/"));
      assert.ok(m.image.endsWith(".jpg"));
      assert.ok(m.bio.length >= 2 && m.bio.length <= 3);
      assert.ok(m.cardTagline.length > 10);
    }
  });

  it("maps cofounder headshots to Cloudinary URLs with tuned crops", () => {
    assert.equal(
      TEAM_MEMBERS[0]!.image,
      "https://res.cloudinary.com/dnldtmbg5/image/upload/gourvansh_biywq8.jpg",
    );
    assert.equal(
      TEAM_MEMBERS[1]!.image,
      "https://res.cloudinary.com/dnldtmbg5/image/upload/pranshu_u8xknw.jpg",
    );
    assert.match(TEAM_MEMBERS[0]!.imageObjectClass ?? "", /^object-\[/);
    assert.match(TEAM_MEMBERS[1]!.imageObjectClass ?? "", /^object-\[/);
  });

  it("resolves members by id", () => {
    assert.equal(getTeamMember("pranshu-gupta")?.name, "Pranshu Gupta");
    assert.equal(getTeamMember("unknown"), undefined);
  });

  it("keeps leadership intro", () => {
    assert.ok(TEAM_SECTION_INTRO.includes("operating system"));
  });

  it("builds stable on-domain LinkedIn paths for smart redirect", () => {
    assert.equal(teamLinkedInSmartPath("gourvansh-raina"), "/go/linkedin/gourvansh-raina");
  });

  it("allows only HTTPS linkedin.com profile paths for redirect targets", () => {
    assert.equal(isAllowedLinkedInProfileUrl("https://www.linkedin.com/in/example"), true);
    assert.equal(isAllowedLinkedInProfileUrl("https://linkedin.com/in/example"), true);
    assert.equal(isAllowedLinkedInProfileUrl("https://www.linkedin.com/pub/example"), true);
    assert.equal(isAllowedLinkedInProfileUrl("http://www.linkedin.com/in/example"), false);
    assert.equal(isAllowedLinkedInProfileUrl("https://www.linkedin.com/company/acme"), false);
    assert.equal(isAllowedLinkedInProfileUrl("https://evil.test/in/foo"), false);
    assert.equal(isAllowedLinkedInProfileUrl("not a url"), false);
  });

  it("TeamModal LinkedIn CTA opens the smart redirect in a new tab", () => {
    const src = readFileSync(join(process.cwd(), "components/team/TeamModal.tsx"), "utf8");
    assert.ok(src.includes('target="_blank"'), "LinkedIn link should open a new browsing context");
    assert.ok(src.includes('rel="noopener noreferrer"'), "LinkedIn new-tab link should set rel");
    assert.ok(src.includes("teamLinkedInSmartPath(member.id)"), "LinkedIn href should use on-domain smart path");
  });
});
