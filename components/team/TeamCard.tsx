"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { DEFAULT_TEAM_IMAGE_OBJECT_CLASS, type TeamMember } from "@/lib/team";

const TEAM_CARD_IMAGE_EFFECTS =
  "object-cover transition-transform transition-duration-[250ms] ease-out motion-safe:group-hover/card:scale-[1.03]";

type TeamCardProps = {
  member: TeamMember;
  onOpen: (id: string) => void;
  /**
   * Use `2` when the section title is an `h1` (e.g. dedicated `/team` page) so headings stay sequential.
   * Default `3` pairs with a section `h2`.
   */
  nameHeadingLevel?: 2 | 3;
};

export function TeamCard({ member, onOpen, nameHeadingLevel = 3 }: TeamCardProps) {
  const NameTag = nameHeadingLevel === 2 ? "h2" : "h3";
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(member.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(member.id);
        }
      }}
      className={cn(
        "group/card flex h-full min-h-[26rem] cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-card)]",
        "transition-[box-shadow,transform] transition-duration-[250ms] ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[var(--shadow-hover)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
      )}
      aria-label={`View profile: ${member.name}, ${member.role}`}
    >
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-surface-2">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            TEAM_CARD_IMAGE_EFFECTS,
            member.imageObjectClass ?? DEFAULT_TEAM_IMAGE_OBJECT_CLASS
          )}
          priority={false}
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <NameTag className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{member.name}</NameTag>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-2" title={member.role}>
          {member.role}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted">{member.cardTagline}</p>
        <span className="mt-3 text-sm font-medium text-blue sm:mt-4">
          View profile <span aria-hidden>→</span>
        </span>
      </div>
    </div>
  );
}
