"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getSections } from "@/lib/data";
import type { Section } from "@/types";

const NAV_ORDER = [
  "worship", "mission", "vision", "core-values", "heart-cry",
  "about", "mentors", "the-word", "blog", "hymns", "newlife", "contact",
];

function buildNavSections(sections: Section[]) {
  return NAV_ORDER
    .map((id) => sections.find((s) => s.id === id))
    .filter((s): s is Section => s !== undefined);
}

export default function Header() {
  const navSections = buildNavSections(getSections());
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const els = NAV_ORDER
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/svg/logo-main.svg"
            alt="Brother Femi"
            className="hidden md:block h-10 w-auto"
          />
          <img
            src="/svg/logo-icon.svg"
            alt="Brother Femi"
            className="block md:hidden h-10 w-10"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 overflow-x-auto" aria-label="Main navigation">
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              className={[
                "px-2 py-1 text-xs font-semibold tracking-wide rounded transition-colors whitespace-nowrap",
                activeId === s.id
                  ? "text-gold border-b-2 border-gold"
                  : "text-cream/80 hover:text-gold",
              ].join(" ")}
            >
              {s.menu}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 flex flex-col justify-center gap-1.5"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-cream origin-center transition-transform duration-200 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-cream transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-cream origin-center transition-transform duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          className="md:hidden bg-navy border-t border-gold/20"
          aria-label="Mobile navigation"
        >
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              onClick={closeMenu}
              className={[
                "block px-6 py-3 text-sm font-medium border-b border-white/5 transition-colors",
                activeId === s.id
                  ? "text-gold bg-white/5"
                  : "text-cream/80 hover:text-gold hover:bg-white/5",
              ].join(" ")}
            >
              {s.menu}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
