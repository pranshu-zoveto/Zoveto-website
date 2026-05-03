"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/brand/BrandLogos";
import { NavbarWordmark } from "@/components/brand/NavbarWordmark";
import { getModuleNavLinks } from "@/lib/module-nav";
import { BRAND_PRODUCTS } from "@/lib/brand-products";

const MODULE_NAV_LINKS = getModuleNavLinks();

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [brandWordmarkFreeze, setBrandWordmarkFreeze] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    let raf: number | null = null;

    const update = () => {
      setScrollY(window.scrollY);
      raf = null;
    };

    const handleScroll = () => {
      if (raf !== null) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf !== null) window.cancelAnimationFrame(raf);
    };
  }, []);

  const isGlass = scrollY >= 40;
  const isCompact = scrollY >= 40;

  return (
    <div id="site-navbar" className={cn("navbar-wrapper fixed top-0 left-0 right-0 z-[100]")}>
      <nav
        className={cn(
          "navbar-container transition-[background-color,backdrop-filter,-webkit-backdrop-filter,box-shadow,border-color] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          !isGlass && "bg-transparent backdrop-blur-0 [-webkit-backdrop-filter:none] border-0 shadow-none",
          isGlass &&
            "bg-[rgba(255,255,255,0.75)] backdrop-blur-[8px] md:backdrop-blur-[12px] [@supports(-webkit-backdrop-filter:blur(0))]:[-webkit-backdrop-filter:blur(12px)] border-b border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.05)]",
        )}
      >
        <div
          className={cn(
            "container max-w-content mx-auto px-5 sm:px-6 flex items-center justify-between safe-top overflow-visible transition-[height] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            isCompact ? "h-[54px] lg:h-[58px]" : "h-[56px] lg:h-[60px]",
          )}
        >
          <Link
            href="/"
            id="site-nav-brand-lockup"
            aria-label="Zoveto home"
            className="inline-flex items-center gap-2.5 shrink-0 mr-2 text-foreground whitespace-nowrap sm:mr-4"
            onMouseEnter={() => setBrandWordmarkFreeze(true)}
            onMouseLeave={() => setBrandWordmarkFreeze(false)}
          >
            <BrandIcon className="h-7 w-7 shrink-0 rounded-md" priority />
            <NavbarWordmark freeze={brandWordmarkFreeze} />
          </Link>

          <div className="hidden lg:flex items-center h-9 gap-8">
            <div
              onMouseEnter={() => setActiveDropdown("modules")}
              onMouseLeave={() => setActiveDropdown(null)}
              className="relative h-9 flex items-center"
            >
              <button
                type="button"
                className={cn(
                  "inline-flex items-center h-9 gap-1.5 whitespace-nowrap text-sm leading-none font-medium transition-colors",
                  activeDropdown === "modules" ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                Modules{" "}
                <ChevronDown
                  size={14}
                  className={cn("transition-transform", activeDropdown === "modules" && "rotate-180")}
                />
              </button>
              {activeDropdown === "modules" && (
                <div className="absolute top-full left-1/2 z-10 mt-1 w-[36rem] -translate-x-1/2 animate-in fade-in zoom-in-95 slide-in-from-top-1 rounded-xl border border-border bg-card p-4 shadow-lg duration-150 grid grid-cols-2 gap-2 motion-reduce:animate-none">
                  {MODULE_NAV_LINKS.map((link) => (
                    <Link
                      key={link.slug}
                      href={link.href}
                      className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-blue-light">
                        <link.icon size={18} className="text-blue" />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <div className="text-sm font-semibold leading-tight text-foreground">{link.name}</div>
                        <div className="text-xs leading-snug text-muted-2">{link.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="inline-flex h-9 items-center whitespace-nowrap text-sm font-medium leading-none text-muted transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/operational-proof"
              className="inline-flex h-9 items-center whitespace-nowrap text-sm font-medium leading-none text-muted transition-colors hover:text-foreground"
            >
              System Flow
            </Link>
            <Link
              href="/about"
              className="inline-flex h-9 items-center whitespace-nowrap text-sm font-medium leading-none text-muted transition-colors hover:text-foreground"
            >
              About
            </Link>
          </div>

          <div className="hidden lg:flex h-9 items-center gap-3 self-center">
            <Link
              href="/contact"
              className="inline-flex h-9 items-center whitespace-nowrap px-2.5 text-sm font-medium leading-none text-muted transition-colors hover:text-foreground"
            >
              Book demo
            </Link>
            <Link href="/signup">
              <Button
                variant="primary"
                size="sm"
                className="gap-2 rounded-xl border border-blue/80 px-5 text-sm leading-none shadow-[0_8px_24px_rgba(0,113,227,0.26)] transition-shadow hover:shadow-[0_10px_30px_rgba(0,113,227,0.32)]"
              >
                Request Access <ArrowRight size={14} className="shrink-0" />
              </Button>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:hidden">
            <Link href="/signup" className="min-w-0">
              <Button
                variant="primary"
                size="sm"
                className="min-h-[44px] max-w-[9.5rem] truncate rounded-lg px-2.5 text-[11px] font-semibold tracking-tight sm:max-w-none sm:px-3.5 sm:text-xs"
              >
                Request access
              </Button>
            </Link>

            <button
              type="button"
              className="-mr-1 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-foreground tap-active hover:bg-surface sm:-mr-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-[110] flex touch-pan-y flex-col overscroll-y-contain bg-[rgba(255,255,255,0.97)] p-5 backdrop-blur-md motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-4 motion-safe:duration-200 motion-reduce:animate-none safe-top safe-bottom lg:hidden">
          <div className="mb-10 flex items-center justify-between overflow-visible">
            <span className="inline-flex items-center gap-2.5 text-foreground">
              <BrandIcon className="h-7 w-7 shrink-0 rounded-md" priority />
              <NavbarWordmark />
            </span>
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg hover:bg-surface"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
            >
              <X size={22} aria-hidden />
            </button>
          </div>

          <div className="flex-1 space-y-8 overflow-y-auto">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-2">System layers</div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {BRAND_PRODUCTS.map((p) => (
                  <Link
                    key={p.id}
                    href={`/system#${p.anchor}`}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-semibold text-foreground/80"
                  >
                    {p.productLine}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-2">Modules</div>
              <div className="grid grid-cols-2 gap-2">
                {MODULE_NAV_LINKS.map((link) => (
                  <Link
                    key={link.slug}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="py-1 text-base font-medium text-muted"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/pricing" onClick={() => setIsOpen(false)} className="block text-2xl font-semibold text-foreground">
              Pricing
            </Link>
            <Link
              href="/operational-proof"
              onClick={() => setIsOpen(false)}
              className="block text-2xl font-semibold text-foreground"
            >
              System Flow
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block text-2xl font-semibold text-foreground">
              About
            </Link>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-8">
            <Link href="/signup" onClick={() => setIsOpen(false)}>
              <Button
                variant="primary"
                className="h-12 w-full rounded-xl border border-blue/80 shadow-[0_8px_24px_rgba(0,113,227,0.26)] transition-shadow hover:shadow-[0_10px_30px_rgba(0,113,227,0.32)]"
              >
                Request Access
              </Button>
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button type="button" variant="outline" className="h-12 w-full">
                Book a demo
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
