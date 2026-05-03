"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const STICKY_CTA_DISMISSED_KEY = "zoveto.stickyDemoCta.dismissed";

export function StickyDemoCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const pathname = usePathname();

  const isExcludedPage =
    pathname === "/contact" || pathname === "/signup" || pathname?.startsWith("/signup");
  const primaryLabel = pathname === "/pricing" ? "Talk to us" : "Request Access";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissed = window.sessionStorage.getItem(STICKY_CTA_DISMISSED_KEY) === "1";
    setIsDismissed(dismissed);
  }, []);

  useEffect(() => {
    if (isExcludedPage) {
      setIsVisible(false);
      return;
    }
    setIsVisible(!isDismissed);
  }, [isExcludedPage, isDismissed]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STICKY_CTA_DISMISSED_KEY, "1");
    }
  };

  if (isExcludedPage) return null;

  return (
    <div
      className={cn(
        "fixed bottom-3 left-1/2 z-[90] w-[min(100%,46rem)] -translate-x-1/2 px-3 safe-bottom sm:bottom-4 sm:px-0",
        "motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out",
        isVisible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-hidden={!isVisible}
    >
      <div className="relative flex flex-col gap-3 rounded-2xl border border-border/90 bg-card px-3 py-3 shadow-[0_14px_36px_-20px_rgba(29,29,31,0.38)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3.5">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-1.5 top-1.5 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-muted transition hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:right-2 sm:top-2"
          aria-label="Close promotional popup"
        >
          <X size={18} aria-hidden />
        </button>
        <div className="space-y-1 pr-8 text-left sm:pr-0">
          <p className="text-[13px] font-semibold leading-5 text-foreground sm:text-sm">
            Book a personalised demo in 30 minutes
          </p>
          <p className="max-w-[44ch] text-[11px] leading-4 text-muted sm:text-xs sm:leading-[1.25rem]">
            See your own workflow live for your industry setup.
          </p>
        </div>

        <div className="grid w-full shrink-0 grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center sm:gap-2.5">
          <Link href="/contact" className="w-full sm:inline-flex sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="min-h-[44px] w-full gap-1.5 whitespace-nowrap border-border bg-transparent px-3 text-xs font-semibold text-foreground hover:bg-surface sm:w-auto sm:px-4 sm:text-sm"
            >
              Book demo
            </Button>
          </Link>
          <Link href="/signup" className="w-full sm:flex-none sm:w-auto">
            <Button className="min-h-[44px] w-full gap-1.5 whitespace-nowrap px-3 text-xs font-semibold sm:w-auto sm:px-6 sm:text-sm">
              {primaryLabel} <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StickyDemoCTA;
