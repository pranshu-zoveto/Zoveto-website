"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Linkedin, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DEFAULT_TEAM_IMAGE_OBJECT_CLASS, teamLinkedInSmartPath, type TeamMember } from "@/lib/team";

type TeamModalProps = {
  member: TeamMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TeamModal({ member, open, onOpenChange }: TeamModalProps) {
  const reduceMotion = useReducedMotion();
  const hasLinkedIn = Boolean(member?.linkedinUrl?.trim());

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-[200] bg-black/65 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 animation-duration-[280ms]"
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[201] w-[min(94vw,52rem)] max-h-[min(92dvh,720px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_24px_80px_-12px_rgba(15,23,42,0.35)] outline-none",
            "animation-duration-[280ms] data-[state=open]:animate-in data-[state=closed]:animate-out",
            reduceMotion
              ? "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
              : "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.98] data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98]"
          )}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLElement).querySelector<HTMLButtonElement>("[data-team-modal-close]")?.focus();
          }}
        >
          {member ? (
            <>
              <Dialog.Title className="sr-only">
                {member.name} · {member.role}
              </Dialog.Title>
              <Dialog.Description className="sr-only">Profile for {member.name}.</Dialog.Description>

              <div className="relative grid max-h-[min(92dvh,720px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:grid-rows-1">
                <Dialog.Close
                  type="button"
                  data-team-modal-close
                  className="absolute right-3 top-3 z-20 flex size-10 items-center justify-center rounded-full bg-card/95 text-foreground shadow-md ring-1 ring-border/70 backdrop-blur-sm transition-[color,background-color,box-shadow] hover:bg-surface hover:ring-border md:right-4 md:top-4"
                  aria-label="Close profile"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </Dialog.Close>

                <div className="relative min-h-[220px] w-full bg-surface-2 md:min-h-0 md:max-h-[min(92dvh,720px)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={cn(
                      "object-cover",
                      member.imageObjectClass ?? DEFAULT_TEAM_IMAGE_OBJECT_CLASS
                    )}
                    sizes="(max-width: 768px) 94vw, 26rem"
                    priority
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10"
                    aria-hidden
                  />
                </div>

                <div className="flex min-h-0 flex-col overflow-y-auto overscroll-contain border-t border-border/60 px-6 pb-8 pt-10 md:max-h-[min(92dvh,720px)] md:border-l md:border-t-0 md:border-border/60 md:px-9 md:pb-10 md:pt-12">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Zoveto leadership</p>
                  <h3 className="mt-2 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-[1.75rem] md:leading-tight lg:text-4xl">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-muted">{member.role}</p>
                  <div className="mt-6 max-w-prose space-y-4 text-[0.9375rem] leading-relaxed text-muted md:text-base">
                    {member.bio.map((paragraph, i) => (
                      <p key={`${member.id}-bio-${i}`} className="text-pretty">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {hasLinkedIn ? (
                    <div className="mt-auto border-t border-border/50 pt-8">
                      <p className="text-xs font-medium text-muted">Connect</p>
                      <a
                        href={teamLinkedInSmartPath(member.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-3 inline-flex w-full max-w-sm items-center justify-center gap-2.5 rounded-xl bg-[#0A66C2] px-4 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-black/5 transition-[transform,box-shadow,filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A66C2] active:scale-[0.99] sm:w-auto sm:min-w-[14rem] sm:justify-start sm:px-5"
                        aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
                      >
                        <Linkedin className="size-5 shrink-0" strokeWidth={1.5} fill="currentColor" aria-hidden />
                        <span className="flex-1 text-center sm:flex-none sm:text-left">View on LinkedIn</span>
                        <ArrowUpRight
                          className="size-4 shrink-0 opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </a>
                      <p className="mt-2 max-w-sm text-xs leading-snug text-muted">
                        Opens in a new tab: a quick zoveto.com redirect, then LinkedIn loads in that tab.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
