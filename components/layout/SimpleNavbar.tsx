"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinkClass = "text-sm font-medium text-muted transition-colors hover:text-foreground";

export default function SimpleNavbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] border-b border-border bg-white/95 backdrop-blur-sm",
        "supports-[backdrop-filter]:bg-white/90"
      )}
    >
      <nav
        className="container mx-auto flex h-14 max-w-content items-center justify-between gap-4 px-4 sm:px-6 safe-top"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground shrink-0"
          onClick={() => setOpen(false)}
        >
          Zoveto
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/pricing" className={navLinkClass}>
            Pricing
          </Link>
          <Link href="/about" className={navLinkClass}>
            About
          </Link>
          <Link href="/security" className={navLinkClass}>
            Security
          </Link>
          <Link
            href="/contact#demo"
            className="inline-flex items-center rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Book demo
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-foreground hover:bg-surface md:hidden"
          aria-expanded={open}
          aria-controls="simple-nav-mobile"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>
      </nav>

      <div
        id="simple-nav-mobile"
        className={cn("border-t border-border bg-white md:hidden", !open && "hidden")}
      >
        <div className="container mx-auto max-w-content space-y-1 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
          <Link href="/pricing" className={cn(navLinkClass, "block py-3")} onClick={() => setOpen(false)}>
            Pricing
          </Link>
          <Link href="/about" className={cn(navLinkClass, "block py-3")} onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/security" className={cn(navLinkClass, "block py-3")} onClick={() => setOpen(false)}>
            Security
          </Link>
          <Link
            href="/contact#demo"
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg border border-border bg-card px-3 py-3 text-sm font-medium text-foreground"
            onClick={() => setOpen(false)}
          >
            Book demo
          </Link>
        </div>
      </div>
    </header>
  );
}
