"use client";

import { TeamSection } from "@/components/team/TeamSection";

export default function TeamPageClient() {
  return (
    <div className="relative overflow-hidden bg-background pb-20 pt-28 md:pt-36">
      <div className="container relative z-10 mx-auto max-w-content px-4 sm:px-6">
        <TeamSection primaryPage />
      </div>
    </div>
  );
}
