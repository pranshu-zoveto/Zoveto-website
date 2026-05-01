"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Text } from "@/components/ui/Text";
import { getTeamMember, TEAM_MEMBERS, TEAM_SECTION_INTRO, TEAM_SECTION_LABEL } from "@/lib/team";
import { TeamCard } from "@/components/team/TeamCard";
import { TeamModal } from "@/components/team/TeamModal";

type TeamSectionProps = {
  /** When true, main title is `h1` (dedicated `/team` page). Default: section `h2` for embeds. */
  primaryPage?: boolean;
};

export function TeamSection({ primaryPage = false }: TeamSectionProps) {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? getTeamMember(selectedId) ?? null : null;
  const TitleTag = primaryPage ? "h1" : "h2";
  const cardNameLevel = primaryPage ? 2 : 3;

  useEffect(() => {
    if (selectedId && !selected) setSelectedId(null);
  }, [selectedId, selected]);

  return (
    <section className="py-16 md:py-24" aria-labelledby="team-section-heading">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <TitleTag
          id="team-section-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl"
        >
          Meet the <span className="text-muted-2">Team</span>
        </TitleTag>

        <div className="mt-12 grid items-stretch gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-16 xl:gap-20">
          <div className="max-w-[22rem] space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-sm bg-blue/70" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">{TEAM_SECTION_LABEL}</p>
            </div>
            <Text variant="body-lg" className="text-muted">
              {TEAM_SECTION_INTRO}
            </Text>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {TEAM_MEMBERS.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                nameHeadingLevel={cardNameLevel}
                onOpen={(id) => setSelectedId(id)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <TeamModal
        member={selected}
        open={!!selected}
        onOpenChange={(v) => {
          if (!v) setSelectedId(null);
        }}
      />
    </section>
  );
}
