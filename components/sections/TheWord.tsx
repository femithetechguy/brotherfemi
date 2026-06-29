"use client";

import { useEffect, useRef } from "react";
import type { Section } from "@/types";
import BibleVerseLink from "@/components/ui/BibleVerseLink";

interface Props { section: Section }

export default function TheWord({ section }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const text = Array.isArray(section.text) ? section.text : section.text ? [section.text] : [];

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("word-visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={section.id}
      className="py-24 px-4 relative overflow-hidden"
      style={{
        background: "var(--color-cobalt)",
        borderTop: "1px solid rgba(201,168,76,0.12)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      {/* Open-book watermark */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.04 }}
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Left page */}
        <path d="M200,40 L60,65 L60,235 L200,215 Z" fill="var(--color-gold)" />
        {/* Right page */}
        <path d="M200,40 L340,65 L340,235 L200,215 Z" fill="var(--color-gold)" />
        {/* Spine */}
        <rect x="197" y="40" width="6" height="175" fill="var(--color-gold)" />
        {/* Left page lines */}
        <rect x="80"  y="105" width="95" height="5" rx="2" fill="var(--color-gold)" />
        <rect x="80"  y="125" width="95" height="5" rx="2" fill="var(--color-gold)" />
        <rect x="80"  y="145" width="75" height="5" rx="2" fill="var(--color-gold)" />
        {/* Right page lines */}
        <rect x="225" y="105" width="95" height="5" rx="2" fill="var(--color-gold)" />
        <rect x="225" y="125" width="95" height="5" rx="2" fill="var(--color-gold)" />
        <rect x="225" y="145" width="75" height="5" rx="2" fill="var(--color-gold)" />
      </svg>

      <div ref={panelRef} className="word-panel max-w-3xl mx-auto text-center relative">
        <p className="section-label" style={{ color: "var(--color-dark-muted)" }}>{section.title}</p>

        {section.bibleVerse && (
          <div className="mb-8">
            <p
              className="leading-relaxed mb-6"
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                color: "var(--color-gold-lt)",
                lineHeight: 1.8,
              }}
            >
              &ldquo;{section.bibleVerse}&rdquo;
            </p>
            <span className="verse-underline" />
            {section.reference && (
              <BibleVerseLink
                verse={section.bibleVerse!}
                reference={section.reference}
                bibleUrl={section.bible_url}
                className="inline-block mt-4"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-dark-muted)",
                }}
              >
                — {section.reference}
              </BibleVerseLink>
            )}
          </div>
        )}

        {text.slice(1).length > 0 && (
          <div
            className="space-y-3 mt-8 max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.97rem",
              lineHeight: 1.85,
              color: "var(--color-dark-text)",
            }}
          >
            {text.slice(1).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
