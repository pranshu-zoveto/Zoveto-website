import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getTeamMember, TEAM_MEMBERS, TEAM_SECTION_INTRO } from "@/lib/team";

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
});
