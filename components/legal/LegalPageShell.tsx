import type { ReactNode } from "react";

type LegalPageShellProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

/** Shared readable layout for legal pages (Privacy, Terms). */
export function LegalPageShell({ title, lastUpdated, children }: LegalPageShellProps) {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20 md:pt-28 md:pb-24">
      <article className="container mx-auto max-w-3xl px-6">
        <header className="mb-12 border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-2">Legal & Trust</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated: {lastUpdated}</p>
        </header>
        <div className="space-y-10 text-[15px] leading-relaxed text-muted md:text-base [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:scroll-mt-24 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1 [&_a]:font-medium [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </article>
    </main>
  );
}
