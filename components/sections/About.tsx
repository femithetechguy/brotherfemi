"use client";

import { useEffect, useRef } from "react";
import type { Section, BrotherFemi } from "@/types";
import BibleVerseLink from "@/components/ui/BibleVerseLink";

interface Props {
  section: Section;
  brotherFemi: BrotherFemi;
}

export default function About({ section, brotherFemi }: Props) {
  const { testimony, anchor } = brotherFemi;
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [leftRef.current, rightRef.current].filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("about-visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={section.id}
      className="py-24 px-4"
      style={{ background: "var(--color-parchment)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Left: testimony text */}
        <div ref={leftRef} className="about-panel">
          <p className="section-label">{section.title}</p>
          <h2
            className="leading-tight mb-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem,4vw,2.8rem)",
              color: "var(--color-ink)",
            }}
          >
            A Life Changed by Grace
          </h2>
          <span className="gold-bar" />

          <div
            className="space-y-5 mb-8"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.97rem",
              lineHeight: 1.85,
              color: "var(--color-ink)",
            }}
          >
            {testimony.text.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <blockquote className="pl-5 border-l-4" style={{ borderColor: "var(--color-gold)" }}>
            <p
              className="mb-3 leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "0.97rem",
                color: "var(--color-ink)",
              }}
            >
              &ldquo;{anchor.bibleVerse}&rdquo;
            </p>
            <BibleVerseLink
              verse={anchor.bibleVerse}
              reference={anchor.reference}
              bibleUrl={anchor.bible_url}
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-cobalt)",
              }}
            >
              — {anchor.reference}
            </BibleVerseLink>
          </blockquote>
        </div>

        {/* Right: visual card */}
        <div
          ref={rightRef}
          className="about-panel about-panel--delayed relative rounded-sm overflow-hidden flex flex-col justify-end"
          style={{
            background: "var(--color-cobalt)",
            border: "1px solid rgba(201,168,76,0.15)",
            aspectRatio: "3/4",
          }}
        >
          {/* Cross watermark */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.06 }}
            viewBox="0 0 300 400"
            preserveAspectRatio="xMidYMid meet"
          >
            <rect x="138" y="60"  width="24"  height="280" fill="var(--color-gold)" />
            <rect x="60"  y="148" width="180" height="24"  fill="var(--color-gold)" />
          </svg>

          {/* "Where it began" top label */}
          <div
            className="absolute top-0 left-0 right-0 z-10 px-6 pt-5 pb-10"
            style={{ background: "linear-gradient(to bottom, rgba(26,39,68,0.92) 0%, transparent 100%)" }}
          >
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "0.2rem" }}>
              Where it began
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", color: "var(--color-dark-muted)", letterSpacing: "0.04em" }}>
              HOWJ Atlanta · June 22, 2025
            </p>
          </div>

          {/* Instagram embed */}
          <div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={{ paddingTop: "5.5rem", paddingBottom: "5rem" }}
          >
            <iframe
              src={testimony.iframe.src}
              className="w-full rounded-sm"
              style={{ maxWidth: "320px", height: "330px" }}
              frameBorder="0"
              scrolling="no"
              allowFullScreen
            />
          </div>

          {/* Name card at bottom */}
          <div
            className="relative z-10 px-6 py-5"
            style={{ background: "rgba(26,39,68,0.92)", borderTop: "1px solid rgba(201,168,76,0.12)" }}
          >
            <p
              className="leading-tight mb-1"
              style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-gold)" }}
            >
              Brother Femi
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-dark-muted)" }}>
              Bond Servant · Worshipper · Steward
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
