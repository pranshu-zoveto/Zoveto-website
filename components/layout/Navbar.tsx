"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
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
    <div
      id="site-navbar"
      className={cn(
        "navbar-wrapper fixed top-0 left-0 right-0 z-[100]"
      )}
    >
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
            isCompact ? "h-[54px] lg:h-[58px]" : "h-[56px] lg:h-[60px]"
          )}
        >
        <Link
          href="/"
          id="site-nav-brand-lockup"
          aria-label="Zoveto home"
          className="inline-flex items-center gap-2.5 shrink-0 mr-4 text-foreground whitespace-nowrap overflow-visible"
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
                activeDropdown === "modules" ? "text-foreground" : "text-muted hover:text-foreground"
              )}
            >
              Modules{" "}
              <ChevronDown
                size={14}
                className={cn("transition-transform", activeDropdown === "modules" && "rotate-180")}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === "modules" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[36rem] mt-1 p-4 bg-card border border-border rounded-xl shadow-lg grid grid-cols-2 gap-2"
                >
                  {MODULE_NAV_LINKS.map((link) => (
                    <Link
                      key={link.slug}
                      href={link.href}
                      className="group p-3 rounded-lg hover:bg-surface flex items-start gap-3 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-light flex items-center justify-center border border-border shrink-0">
                        <link.icon size={18} className="text-blue" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="text-sm font-semibold text-foreground leading-tight">{link.name}</div>
                        <div className="text-xs text-muted-2 leading-snug">{link.desc}</div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/pricing" className="inline-flex items-center h-9 whitespace-nowrap text-sm leading-none font-medium text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link
            href="/operational-proof"
            className="inline-flex items-center h-9 whitespace-nowrap text-sm leading-none font-medium text-muted hover:text-foreground transition-colors"
          >
            System Flow
          </Link>
          <Link href="/about" className="inline-flex items-center h-9 whitespace-nowrap text-sm leading-none font-medium text-muted hover:text-foreground transition-colors">
            About
          </Link>
        </div>

        <div className="hidden lg:flex items-center h-9 gap-3 self-center">
          <Link
            href="/contact"
            className="inline-flex items-center h-9 whitespace-nowrap text-sm leading-none font-medium text-muted hover:text-foreground transition-colors px-2.5"
          >
            Book demo
          </Link>
          <Link href="/signup">
            <Button
              variant="primary"
              size="sm"
              className="gap-2 rounded-xl border border-blue/80 px-5 text-sm leading-none shadow-[0_8px_24px_rgba(0,113,227,0.26)] hover:shadow-[0_10px_30px_rgba(0,113,227,0.32)] transition-shadow"
            >
              Request Access <ArrowRight size={14} className="shrink-0" />
            </Button>
          </Link>
        </div>

        <Link href="/signup" className="lg:hidden">
          <Button
            variant="primary"
            size="sm"
            className="min-h-[44px] rounded-lg px-3 text-[11px] font-semibold tracking-tight sm:px-3.5 sm:text-xs"
          >
            Request access
          </Button>
        </Link>

        <button
          type="button"
          className="lg:hidden p-2 rounded-lg text-foreground hover:bg-surface -mr-2 min-h-[44px] min-w-[44px] tap-active"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[rgba(255,255,255,0.97)] backdrop-blur-md z-[110] p-5 lg:hidden flex flex-col safe-top safe-bottom"
          >
            <div className="flex justify-between items-center mb-10 overflow-visible">
              <span className="inline-flex items-center gap-2.5 text-foreground">
                <BrandIcon className="h-7 w-7 shrink-0 rounded-md" priority />
                <NavbarWordmark />
              </span>
              <button type="button" className="p-2 rounded-lg hover:bg-surface" onClick={() => setIsOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto">
              <div className="space-y-3">
                <div className="text-xs font-semibold text-muted-2 uppercase tracking-wide">System layers</div>
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
                <div className="text-xs font-semibold text-muted-2 uppercase tracking-wide">Modules</div>
                <div className="grid grid-cols-2 gap-2">
                  {MODULE_NAV_LINKS.map((link) => (
                    <Link
                      key={link.slug}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium text-muted py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/pricing"
                onClick={() => setIsOpen(false)}
                className="block text-2xl font-semibold text-foreground"
              >
                Pricing
              </Link>
              <Link
                href="/operational-proof"
                onClick={() => setIsOpen(false)}
                className="block text-2xl font-semibold text-foreground"
              >
                System Flow
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="block text-2xl font-semibold text-foreground"
              >
                About
              </Link>
            </div>

            <div className="pt-8 border-t border-border flex flex-col gap-3">
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <Button
                  variant="primary"
                  className="w-full h-12 rounded-xl border border-blue/80 shadow-[0_8px_24px_rgba(0,113,227,0.26)] hover:shadow-[0_10px_30px_rgba(0,113,227,0.32)] transition-shadow"
                >
                  Request Access
                </Button>
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12"
                >
                  Book a demo
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
