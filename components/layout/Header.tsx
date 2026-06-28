"use client";

import { useEffect, useState, useCallback, type ReactElement } from "react";
import Link from "next/link";
import { getSections, getBrotherFemi } from "@/lib/data";
import { SocialIcon, getSocialColor, SOCIAL_ORDER_NAV } from "@/components/ui/SocialIcon";
import SearchButton from "@/components/ui/SearchButton";
import type { Section } from "@/types";

const NAV_IDS = ["about", "word", "blog", "newlife", "contact"];

const NAV_ICONS: Record<string, ReactElement> = {
  about: (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="4" y1="5.5" x2="12" y2="5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  word: (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M8 13V4.5C7 3.5 5.5 3 4 3H2v9h2c1.5 0 3 .5 4 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 13V4.5c1-1 2.5-1.5 4-1.5h2v9h-2c-1.5 0-3 .5-4 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  blog: (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M11 2l3 3-7 7H4v-3l7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="2" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  newlife: (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M8 14C8 14 3 10.5 3 6.5C3 4 5 2 8 2C8 2 7 5 9 7C9 7 10 5.5 9.5 3.5C11.5 5 13 7 13 9C13 11.5 11 14 8 14Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  contact: (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="2" y="4" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 5.5l6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const ALL_OBSERVE_IDS = [
  "worship", "mission", "vision", "core-values", "heart-cry",
  "about", "mentors", "word", "blog", "hymns", "newlife", "contact",
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
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);
            // Keep URL in sync with visible section — no hash, no navigation
            const path = id === "worship" ? "/" : `/${id}`;
            window.history.replaceState(null, "", path);
          }
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

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setMenuOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

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
        <Link
          href="/"
          className="flex-shrink-0"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
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
              href={`/${s.id}`}
              onClick={(e) => handleNavClick(e, s.id)}
              className={`nav-link whitespace-nowrap flex items-center gap-1.5${activeId === s.id ? " is-active" : ""}`}
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {NAV_ICONS[s.id]}
              {s.menu}
            </a>
          ))}
        </nav>

        {/* Social icons + music player slot — desktop */}
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
          <span
            style={{
              display: "block",
              width: 1,
              height: 20,
              background: "rgba(201,168,76,0.2)",
              margin: "0 4px",
              flexShrink: 0,
            }}
          />
          {/* MusicPlayer portals inline content here on desktop */}
          <div id="music-player-header-slot" style={{ display: "flex", alignItems: "center" }} />
          <span
            style={{
              display: "block",
              width: 1,
              height: 20,
              background: "rgba(201,168,76,0.2)",
              margin: "0 4px",
              flexShrink: 0,
            }}
          />
          <SearchButton />
        </div>

        {/* Music player slot — mobile center */}
        <div
          id="music-player-mobile-slot"
          className="md:hidden flex-1 flex justify-center items-center"
        />

        {/* Mobile search + hamburger */}
        <div className="md:hidden flex items-center gap-1 flex-shrink-0">
          <SearchButton />
          <button
            className="p-2 flex flex-col justify-center gap-1.5"
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
              href={`/${s.id}`}
              onClick={(e) => handleNavClick(e, s.id)}
              className={`nav-link-mobile block px-6 py-4 border-b hover:bg-white/10 hover:pl-8${activeId === s.id ? " is-active" : ""}`}
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderColor: "rgba(255,255,255,0.06)",
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
                style={{ "--brand": getSocialColor(c.type) } as React.CSSProperties}
                className="social-icon social-icon--header"
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
