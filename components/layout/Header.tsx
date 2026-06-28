"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getSections, getBrotherFemi } from "@/lib/data";
import { SocialIcon, getSocialColor, SOCIAL_ORDER_NAV } from "@/components/ui/SocialIcon";
import type { Section } from "@/types";

const NAV_IDS = ["about", "the-word", "blog", "hymns", "contact"];

const ALL_OBSERVE_IDS = [
  "worship", "mission", "vision", "core-values", "heart-cry",
  "about", "mentors", "the-word", "blog", "hymns", "newlife", "contact",
];

function buildNavSections(sections: Section[]) {
  return NAV_IDS
    .map((id) => sections.find((s) => s.id === id))
    .filter((s): s is Section => s !== undefined);
}


export default function Header() {
  const navSections = buildNavSections(getSections());
  const allContact = getBrotherFemi().contact;
  const contact = SOCIAL_ORDER_NAV
    .map((type) => allContact.find((c) => c.type === type))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const els = ALL_OBSERVE_IDS
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("mobile-nav-open", menuOpen);
    return () => document.documentElement.classList.remove("mobile-nav-open");
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(26,39,68,0.92)" : "var(--color-navy)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/svg/logo-main.svg"
            alt="Brother Femi"
            className="hidden md:block h-9 w-auto"
          />
          <img
            src="/svg/logo-icon.svg"
            alt="Brother Femi"
            className="block md:hidden h-9 w-9"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              className="transition-colors whitespace-nowrap"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: activeId === s.id ? "var(--color-gold)" : "var(--color-dark-muted)",
              }}
            >
              {s.menu}
            </a>
          ))}
        </nav>

        {/* Social icons — desktop */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {contact.map((c) => (
            <a
              key={c.type}
              href={c.url}
              target={c.url.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={c.type}
              style={{ color: getSocialColor(c.type) }}
              className="social-icon"
            >
              <SocialIcon type={c.type} />
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 flex flex-col justify-center gap-1.5 ml-auto"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 origin-center transition-transform duration-200`}
            style={{ background: "var(--color-gold-lt)", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "" }}
          />
          <span
            className={`block h-0.5 w-6 transition-opacity duration-200`}
            style={{ background: "var(--color-gold-lt)", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className={`block h-0.5 w-6 origin-center transition-transform duration-200`}
            style={{ background: "var(--color-dark-muted)", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "" }}
          />
        </button>
      </div>

      {/* Mobile dropdown — absolutely positioned to overlay page content */}
      {menuOpen && (
        <nav
          className="md:hidden border-t absolute left-0 right-0"
          style={{
            top: "100%",
            background: "rgba(26,39,68,0.82)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(201,168,76,0.15)",
          }}
          aria-label="Mobile navigation"
        >
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              onClick={closeMenu}
              className="block px-6 py-4 border-b transition-all hover:bg-white/10 hover:pl-8"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderColor: "rgba(255,255,255,0.06)",
                color: activeId === s.id ? "var(--color-gold)" : "var(--color-dark-muted)",
              }}
            >
              {s.menu}
            </a>
          ))}
          <div className="flex items-center gap-4 px-6 py-4">
            {contact.map((c) => (
              <a
                key={c.type}
                href={c.url}
                target={c.url.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={c.type}
                style={{ color: getSocialColor(c.type) }}
                className="social-icon"
              >
                <SocialIcon type={c.type} />
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
