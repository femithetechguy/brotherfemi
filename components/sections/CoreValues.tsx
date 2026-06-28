"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Section, BrotherFemi } from "@/types";

interface Props {
  section: Section;
  coreValues: BrotherFemi["coreValues"];
}

function HeartIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21C12 21 3 14 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.7 3.8 12 4.5C12.3 3.8 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="40" height="44" viewBox="0 0 24 28" fill="none" aria-hidden="true">
      <path d="M12 1C12 1 4 9 4 17C4 21.4 7.6 26 12 26C16.4 26 20 21.4 20 17C20 9 12 1 12 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 13C12 13 9 16 9 19C9 20.7 10.3 22 12 22C13.7 22 15 20.7 15 19C15 16 12 13 12 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function CrossRaysIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="10.5" y="3" width="3" height="18" rx="1.5" fill="currentColor" opacity="0.9"/>
      <rect x="3" y="8" width="18" height="3" rx="1.5" fill="currentColor" opacity="0.9"/>
      <line x1="12" y1="0" x2="12" y2="2"   stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <line x1="12" y1="22" x2="12" y2="24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <line x1="0"  y1="12" x2="2"  y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <line x1="22" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <line x1="2.5"  y1="2.5"  x2="4"    y2="4"    stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
      <line x1="20"   y1="20"   x2="21.5"  y2="21.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
      <line x1="21.5" y1="2.5"  x2="20"    y2="4"    stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
      <line x1="4"    y1="20"   x2="2.5"   y2="21.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
    </svg>
  );
}

function HandsIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 14V8.5C6 7.7 6.7 7 7.5 7S9 7.7 9 8.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 12V7.5C9 6.7 9.7 6 10.5 6S12 6.7 12 7.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 12V8C12 7.2 12.7 6.5 13.5 6.5S15 7.2 15 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15 10.5V9.5C15 8.7 15.7 8 16.5 8S18 8.7 18 9.5V14C18 17.3 15.3 20 12 20C9.5 20 7.3 18.6 6.3 16.5L5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const ICON_MAP: Record<string, ReactNode> = {
  "Love & Unity":             <HeartIcon />,
  "Purity/Consecration":      <FlameIcon />,
  "Fear & Reverence for God": <CrossRaysIcon />,
  "Godly Humility":           <HandsIcon />,
};

export default function CoreValues({ section, coreValues }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll<HTMLElement>(".cv-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("cv-card--visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={section.id}
      className="py-24 px-4"
      style={{ background: "var(--color-navy)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label" style={{ color: "var(--color-sage)" }}>{section.title}</p>
          <h2 className="text-3xl leading-tight mb-0" style={{ fontFamily: "var(--font-display)", color: "var(--color-dark-text)" }}>
            What We Stand For
          </h2>
          <span className="gold-bar" style={{ margin: "1.25rem auto" }} />
        </div>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {coreValues.map((value, i) => (
            <div
              key={i}
              className="cv-card relative flex flex-col items-center text-center py-10 px-6 rounded-sm overflow-hidden"
              style={{ "--cv-delay": `${i * 0.1}s` } as React.CSSProperties}
            >
              {/* Decorative numeral watermark */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  fontFamily: "var(--font-display)",
                  fontSize: "7rem",
                  fontWeight: 700,
                  color: "rgba(201,168,76,0.06)",
                  bottom: "-1rem",
                  right: "0.5rem",
                  lineHeight: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Number badge */}
              <span
                className="mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  color: "var(--color-gold)",
                  opacity: 0.7,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div
                className="mb-6 flex items-center justify-center rounded-full"
                style={{
                  width: 72,
                  height: 72,
                  background: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.18)",
                  color: "var(--color-gold)",
                }}
              >
                {ICON_MAP[value] ?? <CrossRaysIcon />}
              </div>

              {/* Gold divider */}
              <div style={{ width: 28, height: 1, background: "var(--color-gold)", opacity: 0.4, marginBottom: "1.25rem" }} />

              {/* Value name */}
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--color-dark-text)",
                  lineHeight: 1.45,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
