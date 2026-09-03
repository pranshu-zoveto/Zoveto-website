import type { ReactNode } from "react";

type LegalPageShellProps = {
  title: string;
  lastUpdated: string;
  pdfHref?: string;
  children: ReactNode;
};

/** Shared readable layout for legal pages (Privacy, Terms). */
export function LegalPageShell({ title, lastUpdated, pdfHref, children }: LegalPageShellProps) {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20 md:pt-28 md:pb-24">
      <article className="container mx-auto max-w-3xl px-6">
        <header className="mb-12 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-2">Legal & Trust</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <p>Last updated: {lastUpdated}</p>
            {pdfHref ? (
              <a
                href={pdfHref}
                download
                className="font-medium text-teal underline underline-offset-2"
              >
                Download PDF
              </a>
            ) : null}
          </div>
        </header>
        <div className="space-y-10 text-[15px] leading-relaxed text-muted md:text-base [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:scroll-mt-24 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1 [&_a]:font-medium [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </article>
    </main>
  );
}
