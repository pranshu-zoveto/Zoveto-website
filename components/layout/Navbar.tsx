"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/brand/BrandLogos";
import { NavbarWordmark } from "@/components/brand/NavbarWordmark";
import { getModuleNavLinks } from "@/lib/module-nav";

const MODULE_NAV_LINKS = getModuleNavLinks();

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(false);
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
          "navbar-container overflow-x-clip transition-[background-color,backdrop-filter,-webkit-backdrop-filter,box-shadow,border-color] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          !isGlass && "bg-transparent backdrop-blur-0 [-webkit-backdrop-filter:none] border-0 shadow-none",
          isGlass &&
            "bg-[rgba(255,255,255,0.75)] backdrop-blur-[8px] md:backdrop-blur-[12px] [@supports(-webkit-backdrop-filter:blur(0))]:[-webkit-backdrop-filter:blur(12px)] border-b border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.05)]",
        )}
      >
        <div
          className={cn(
            "container relative max-w-content mx-auto px-5 sm:px-6 flex items-center justify-between safe-top overflow-visible transition-[height] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            isCompact ? "h-[54px] lg:h-[58px]" : "h-[56px] lg:h-[60px]",
          )}
        >
          <Link
            href="/"
            id="site-nav-brand-lockup"
            aria-label="Zoveto home"
            className="inline-flex max-w-[12rem] items-center gap-2 overflow-visible text-foreground whitespace-nowrap xs:max-w-[13rem] sm:mr-4 sm:max-w-none"
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
                <div className="absolute top-full left-1/2 z-10 mt-1 w-[36rem] max-w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 animate-in fade-in zoom-in-95 slide-in-from-top-1 rounded-xl border border-border bg-card p-4 shadow-lg duration-150 grid grid-cols-2 gap-2 motion-reduce:animate-none">
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
                        <div className="text-[0.875rem] font-semibold leading-tight tracking-[-0.005em] text-foreground">{link.name}</div>
                        <div className="text-[0.75rem] leading-snug tracking-[0] text-muted-2">{link.desc}</div>
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
              href="/compare"
              className="inline-flex h-9 items-center whitespace-nowrap text-sm font-medium leading-none text-muted transition-colors hover:text-foreground"
            >
              Compare
            </Link>
            <Link
              href="/operational-proof"
              className="inline-flex h-9 items-center whitespace-nowrap text-sm font-medium leading-none text-muted transition-colors hover:text-foreground"
            >
              System Flow
            </Link>
            <Link
              href="/blog"
              className="inline-flex h-9 items-center whitespace-nowrap text-sm font-medium leading-none text-muted transition-colors hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="inline-flex h-9 items-center whitespace-nowrap text-sm font-medium leading-none text-muted transition-colors hover:text-foreground"
            >
              About
            </Link>
          </div>

          <div className="hidden lg:flex h-9 items-center gap-3 self-center">
            <Link href="/contact" className="inline-flex">
              <Button variant="primary" size="sm" className="rounded-xl">
                Book a 20-min demo <ArrowRight size={14} className="shrink-0" />
              </Button>
            </Link>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 lg:hidden">
            <Link href="/contact" className="hidden min-w-0 sm:block">
              <Button
                variant="primary"
                size="sm"
                className="min-h-[44px] max-w-[10.5rem] truncate px-2.5 text-[11px] sm:max-w-none sm:px-3.5 sm:text-xs"
              >
                20-min demo
              </Button>
            </Link>

            <button
              type="button"
              className="-mr-1 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-card p-2 text-foreground shadow-sm tap-active hover:bg-surface sm:-mr-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => { setIsOpen(!isOpen); if (isOpen) setModulesOpen(false); }}
            >
              {isOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-[110] flex touch-pan-y flex-col overscroll-y-contain bg-[rgba(255,255,255,0.97)] p-5 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] backdrop-blur-md motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-4 motion-safe:duration-200 motion-reduce:animate-none safe-top safe-bottom lg:hidden">
          {/* ── Mobile menu header ── */}
          <div className="mb-8 flex items-center justify-between">
            <span className="inline-flex items-center gap-2.5 text-foreground">
              <BrandIcon className="h-7 w-7 shrink-0 rounded-md" priority />
              <NavbarWordmark />
            </span>
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg hover:bg-surface"
              aria-label="Close menu"
              onClick={() => { setIsOpen(false); setModulesOpen(false); }}
            >
              <X size={22} aria-hidden />
            </button>
          </div>

          {/* ── Nav links ── */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1">

              {/* Modules — accordion */}
              <li>
                <button
                  type="button"
                  onClick={() => setModulesOpen(!modulesOpen)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-[1.1rem] font-semibold tracking-[-0.01em] text-foreground transition-colors hover:bg-surface"
                  aria-expanded={modulesOpen}
                >
                  Modules
                  <ChevronDown
                    size={18}
                    className={cn(
                      "text-muted transition-transform duration-200",
                      modulesOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Accordion body */}
                {modulesOpen && (
                  <ul className="mb-2 ml-3 mt-1 border-l-2 border-border pl-4 space-y-0.5">
                    {MODULE_NAV_LINKS.map((link) => (
                      <li key={link.slug}>
                        <Link
                          href={link.href}
                          onClick={() => { setIsOpen(false); setModulesOpen(false); }}
                          className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[0.95rem] font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-blue-light">
                            <link.icon size={14} className="text-blue" />
                          </div>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Main nav links */}
              {[
                { label: "Home",         href: "/" },
                { label: "Pricing",      href: "/pricing" },
                { label: "Compare",      href: "/compare" },
                { label: "System Flow",  href: "/operational-proof" },
                { label: "Blog",         href: "/blog" },
                { label: "About",        href: "/about" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => { setIsOpen(false); setModulesOpen(false); }}
                    className="block rounded-xl px-3 py-3.5 text-[1.1rem] font-semibold tracking-[-0.01em] text-foreground transition-colors hover:bg-surface"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── CTA buttons ── */}
          <div className="flex flex-col gap-3 border-t border-border pt-6 mt-4">
            <Link href="/contact" onClick={() => { setIsOpen(false); setModulesOpen(false); }}>
              <Button variant="primary" className="h-12 w-full rounded-xl text-[0.95rem] font-semibold">
                Book a 20-min demo
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
