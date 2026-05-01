/**
 * About page — founders / leadership team.
 *
 * Headshots are served from Cloudinary (`res.cloudinary.com`); tune crops via `imageObjectClass` per portrait.
 * Set `linkedinUrl` on each member when personal profiles are ready (button stays hidden while null).
 */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** Absolute HTTPS URL (optimized CDN) or `/public` path */
  image: string;
  /**
   * Tailwind `object-*` class for this headshot (used with `object-cover` in UI).
   * Set per portrait so square and tall crops keep faces framed.
   */
  imageObjectClass?: string;
  /** One line under the card (not in modal) */
  cardTagline: string;
  /** Modal body — 2–3 short paragraphs */
  bio: readonly [string, string, string] | readonly [string, string];
  /** Personal LinkedIn profile URL, or null to hide the personal button */
  linkedinUrl: string | null;
};

export const TEAM_SECTION_LABEL = "LEADERSHIP" as const;

export const TEAM_SECTION_INTRO =
  "We ship the operating system for businesses that run on real operations. Product, ops, and field execution sit in the same room.";

/** Default object-position for team headshots (upper-third, works for most chest-up portraits). */
export const DEFAULT_TEAM_IMAGE_OBJECT_CLASS = "object-[50%_22%]" as const;

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    id: "gourvansh-raina",
    name: "Mehta Gourvansh Raina",
    role: "Co-Founder, Zoveto",
    image:
      "https://res.cloudinary.com/dnldtmbg5/image/upload/gourvansh_biywq8.jpg",
    imageObjectClass: "object-[50%_26%]",
    cardTagline: "Co-founder. Engineers reliable customer-facing systems.",
    bio: [
      "Gourvansh co-founded Zoveto. He studied software engineering at MIT Manipal and ships web and data systems tied to operator needs.",
      "He builds crisp customer journeys and keeps performance honest under load. He cares about small details that save hours at work.",
    ],
    linkedinUrl: null,
  },
  {
    id: "pranshu-gupta",
    name: "Pranshu Gupta",
    role: "Co-Founder & Chief Executive Officer",
    image:
      "https://res.cloudinary.com/dnldtmbg5/image/upload/pranshu_u8xknw.jpg",
    imageObjectClass: "object-[50%_15%]",
    cardTagline: "Runs product and keeps workflows close to the floor.",
    bio: [
      "Pranshu co-founded Zoveto and leads product. He turns messy ops into clear workflows for inventory, finance, and sales.",
      "He ships fast feedback loops with scaling operations teams so the product matches how stock and cash really move.",
      "He is building one company OS so teams stop exporting the same facts into five tools.",
    ],
    linkedinUrl: null,
  },
] as const;

export function getTeamMember(id: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id);
}
