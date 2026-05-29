"use client";

import { business } from "@/data/business";
import { useVisitList } from "@/context/VisitListContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#plants", label: "Plants" },
  { href: "#stock-check", label: "Stock" },
  { href: "#project-help", label: "Project Help" },
  { href: "#gallery", label: "Gallery" },
  { href: "#visit-info", label: "Visit" },
];

const headerActionBtn =
  "h-9 min-h-9 rounded-full px-3.5 text-xs font-medium leading-none";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const listBtnRef = useRef<HTMLButtonElement>(null);
  const { openDrawer, count, mounted, listPulsing, registerListTarget } =
    useVisitList();

  useEffect(() => {
    registerListTarget(listBtnRef.current);
    return () => registerListTarget(null);
  }, [registerListTarget]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-header shadow-sm" : "bg-cream/85 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-2 overflow-hidden px-3 md:h-12 md:px-5">
        <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 md:gap-3">
          <span className="min-w-0 truncate text-[9px] text-charcoal/55 sm:shrink-0 sm:overflow-visible sm:whitespace-nowrap sm:text-[10px]">
            Demo website by Derek Ray
          </span>
          <span
            className="h-3 w-px shrink-0 bg-brown/20"
            aria-hidden
          />
          <a
            href="#home"
            className="flex min-w-0 items-baseline gap-1.5 leading-none"
            onClick={closeMenu}
          >
            <span className="truncate font-display text-base font-semibold text-olive-dark">
              {business.shortName}
            </span>
            <span className="hidden text-[10px] text-charcoal/60 sm:inline">
              {business.subtitle}
            </span>
          </a>
        </div>

        <nav
          className="hidden items-center gap-3 md:gap-4 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link-underline whitespace-nowrap text-xs font-medium text-charcoal/85 hover:text-olive"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <MagneticButton
            href="#stock-check"
            variant="primary"
            className={`hidden sm:inline-flex ${headerActionBtn} !h-9 !min-h-9 !px-3.5 !py-0 !text-xs`}
            magnetic
          >
            Check Stock
          </MagneticButton>
          <button
            ref={listBtnRef}
            type="button"
            onClick={openDrawer}
            className={`visit-list-target relative border border-brown/30 bg-tan text-charcoal hover:border-clay ${headerActionBtn} ${
              listPulsing ? "visit-list-target-pulse" : ""
            }`}
            aria-label={`Open visit list, ${count} items`}
          >
            List
            {mounted && count > 0 && (
              <span
                className={`absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta text-[10px] text-cream ${
                  listPulsing ? "visit-list-count-pop" : ""
                }`}
              >
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="rounded border border-brown/30 p-1 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg
              className="h-5 w-5 text-charcoal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden ${
          menuOpen ? "block border-t border-brown/20 bg-cream" : "hidden"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col px-3 py-2" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-brown/10 py-2 text-sm font-medium text-charcoal"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <MagneticButton
            href="#stock-check"
            variant="primary"
            className="mt-2 w-full py-2 text-xs"
            onClick={closeMenu}
          >
            Check Stock
          </MagneticButton>
        </nav>
      </div>
    </header>
  );
}
