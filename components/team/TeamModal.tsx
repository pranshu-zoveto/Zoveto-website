"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Linkedin, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DEFAULT_TEAM_IMAGE_OBJECT_CLASS, type TeamMember } from "@/lib/team";

type TeamModalProps = {
  member: TeamMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TeamModal({ member, open, onOpenChange }: TeamModalProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-[200] bg-black/60 backdrop-blur-[2px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 animation-duration-[250ms]"
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[201] flex w-[min(94vw,32rem)] max-h-[min(92dvh,880px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl outline-none sm:w-[min(94vw,40rem)]",
            "animation-duration-[250ms] data-[state=open]:animate-in data-[state=closed]:animate-out",
            reduceMotion
              ? "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
              : "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
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

              <div className="relative flex max-h-[min(92dvh,880px)] flex-col">
                <Dialog.Close
                  type="button"
                  data-team-modal-close
                  className="absolute left-3 top-3 z-10 rounded-lg bg-card/95 p-2 text-foreground shadow-sm ring-1 ring-border/80 transition-colors hover:bg-surface"
                  aria-label="Close profile"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </Dialog.Close>

                <div className="relative mx-auto aspect-[4/5] w-full max-w-[min(100%,24rem)] shrink-0 bg-surface-2 sm:max-w-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={cn(
                      "object-cover",
                      member.imageObjectClass ?? DEFAULT_TEAM_IMAGE_OBJECT_CLASS
                    )}
                    sizes="(max-width: 640px) 94vw, 40rem"
                    priority
                  />
                </div>

                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 pb-8 pt-8 md:px-8 md:pb-10 md:pt-10">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{member.name}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">{member.role}</p>
                  <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-muted">
                    {member.bio.map((paragraph, i) => (
                      <p key={`${member.id}-bio-${i}`} className="text-pretty">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {member.linkedinUrl ? (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                    >
                      <Linkedin className="h-4 w-4 shrink-0" strokeWidth={1.5} fill="none" aria-hidden />
                      LinkedIn
                    </a>
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
