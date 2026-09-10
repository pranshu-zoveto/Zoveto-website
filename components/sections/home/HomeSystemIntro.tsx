import { HOME_CONTAINER } from "@/lib/home-layout";

export function HomeSystemIntro() {
  return (
    <div className="bg-[#f5f5f7] pt-12 pb-8 md:pt-16 md:pb-10">
      <div className={HOME_CONTAINER}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">The system</p>
        <h2
          id="system-heading"
          className="max-w-[20ch] text-balance text-[clamp(1.875rem,6.5vw,2.25rem)] font-semibold leading-[1.15] tracking-tight text-foreground sm:text-3xl"
        >
          One system. Every function.
        </h2>
        <p className="mt-4 max-w-[62ch] text-pretty text-base font-medium leading-relaxed text-muted sm:text-lg">
          The functions that normally live across separate tools, connected in one operating record.
        </p>
      </div>
    </div>
  );
}
