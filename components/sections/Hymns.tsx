"use client";

import { useEffect, useRef } from "react";
import type { Section } from "@/types";
import BibleVerseLink from "@/components/ui/BibleVerseLink";

interface Props { section: Section }

export default function Hymns({ section }: Props) {
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

  const bodyText = Array.isArray(section.text) ? section.text[1] : "";

  return (
    <section
      id={section.id}
      className="py-24 px-4"
      style={{
        background: "var(--color-navy)",
        borderTop: "1px solid rgba(201,168,76,0.12)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Left: verse + description */}
        <div ref={leftRef} className="about-panel">
          <p className="section-label" style={{ color: "var(--color-dark-muted)" }}>Sacred Songs</p>
          <h2
            className="leading-tight mb-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem,4vw,2.6rem)",
              color: "var(--color-gold-lt)",
            }}
          >
            {`${section.title} & Worship`}
          </h2>
          <span className="gold-bar" />

          {section.bibleVerse && (
            <blockquote className="mb-6">
              <p
                className="leading-relaxed mb-2"
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: "var(--color-gold-lt)",
                  lineHeight: 1.8,
                }}
              >
                &ldquo;{section.bibleVerse}&rdquo;
              </p>
              {section.reference && (
                <BibleVerseLink
                  verse={section.bibleVerse!}
                  reference={section.reference}
                  bibleUrl={section.bible_url}
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-dark-muted)",
                  }}
                >
                  — {section.reference}
                </BibleVerseLink>
              )}
            </blockquote>
          )}

          {bodyText && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.97rem",
                color: "var(--color-dark-text)",
                lineHeight: 1.75,
              }}
            >
              {bodyText}
            </p>
          )}
        </div>

        {/* Right: now-playing panel */}
        <div
          ref={rightRef}
          className="about-panel about-panel--delayed flex flex-col justify-center rounded-sm"
          style={{
            background: "var(--color-cobalt)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderTop: "3px solid var(--color-gold)",
            padding: "2rem 1.75rem",
            minHeight: "220px",
          }}
        >
          {/* Musical note icon */}
          <div className="mb-5">
            <svg
              width="36" height="36" viewBox="0 0 24 24" fill="none"
              aria-hidden="true"
              style={{ color: "var(--color-gold)", opacity: 0.85 }}
            >
              <path
                d="M9 18V5l12-2v13"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              />
              <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              marginBottom: "0.4rem",
            }}
          >
            Now Playing
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.15rem",
              color: "var(--color-gold-lt)",
              marginBottom: "0.5rem",
            }}
          >
            Hymns Playlist
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: "0.88rem",
              color: "var(--color-dark-muted)",
              lineHeight: 1.6,
              marginBottom: "1.25rem",
            }}
          >
            A curated selection of classic and contemporary hymns — active in the player above.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              borderTop: "1px solid rgba(201,168,76,0.12)",
              paddingTop: "1rem",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ color: "var(--color-gold)", flexShrink: 0 }}>
              <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-sage)",
              }}
            >
              Player controls in the top bar
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
